import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

import crypto from 'crypto';
import fs from 'fs';

app.use(cors());
app.use(express.json());

// ─── Database Setup ──────────────────────────────────────────────
const dbPath = join(__dirname, '..', 'codequest.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    avatar TEXT DEFAULT 'mascot',
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS user_stats_multi (
    user_id INTEGER PRIMARY KEY,
    total_xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_active_date TEXT
  );

  CREATE TABLE IF NOT EXISTS progress_multi (
    user_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL,
    completed INTEGER DEFAULT 1,
    xp_earned INTEGER DEFAULT 0,
    score INTEGER DEFAULT 0,
    code_snapshot TEXT,
    completed_at TEXT,
    PRIMARY KEY (user_id, item_id)
  );
`);

// Safe migrations for gamification stats (hearts & coins)
try {
  db.exec(`ALTER TABLE user_stats_multi ADD COLUMN hearts INTEGER DEFAULT 1;`);
} catch {}
try {
  db.exec(`ALTER TABLE user_stats_multi ADD COLUMN coins INTEGER DEFAULT 0;`);
} catch {}

// ─── Auth Helper Functions ───────────────────────────────────────
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return testHash === hash;
}

function getAuthUser(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  if (!token) return null;
  const session = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(token);
  if (!session) return null;
  return db.prepare('SELECT id, username, avatar, created_at FROM users WHERE id = ?').get(session.user_id);
}

// ─── Auth Routes ─────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password, initialXp, localProgress } = req.body;
    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters.' });
    }
    if (!password || typeof password !== 'string' || password.length < 4) {
      return res.status(400).json({ error: 'Passcode must be at least 4 characters.' });
    }

    const cleanUser = username.trim();
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(cleanUser);
    if (existing) {
      return res.status(400).json({ error: `Character "${cleanUser}" already exists! Switch to "Sign In" tab to log in.` });
    }

    const { hash, salt } = hashPassword(password);
    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO users (username, password_hash, salt, created_at)
      VALUES (?, ?, ?, ?)
    `).run(cleanUser, hash, salt, now);

    const userId = result.lastInsertRowid;

    // Initialize stats (migrate guest XP if provided, otherwise default to 0)
    const initXp = typeof initialXp === 'number' ? Math.max(0, initialXp) : 0;
    const initLevel = Math.max(1, Math.floor(initXp / 200) + 1);
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`
      INSERT INTO user_stats_multi (user_id, total_xp, level, current_streak, longest_streak, last_active_date)
      VALUES (?, ?, ?, 1, 1, ?)
    `).run(userId, initXp, initLevel, today);

    // Sync any local progress items immediately into database
    if (localProgress && typeof localProgress === 'object') {
      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO progress_multi (user_id, item_id, item_type, xp_earned, score, code_snapshot, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const [itemId, itemData] of Object.entries(localProgress)) {
        insertStmt.run(userId, itemId, itemData.type || 'lesson', itemData.xpEarned || 10, 0, null, itemData.completedAt || now);
      }
    }

    // Create session token
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)').run(token, userId, now);

    res.json({
      token,
      user: { id: userId, username: cleanUser, avatar: 'mascot' }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password, initialXp, localProgress } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and passcode required.' });
    }

    const cleanUser = username.trim();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(cleanUser);
    if (!user) {
      return res.status(404).json({ error: `Character "${cleanUser}" not found. Switch to "Create Character" tab above to register!` });
    }
    if (!verifyPassword(password, user.password_hash, user.salt)) {
      return res.status(401).json({ error: `Incorrect passcode for "${cleanUser}". Please try again or reset your passcode.` });
    }

    // Merge any guest XP if the guest had earned XP before logging in
    if (typeof initialXp === 'number' && initialXp > 0) {
      db.prepare(`
        UPDATE user_stats_multi
        SET total_xp = MAX(total_xp, ?), level = MAX(level, ?)
        WHERE user_id = ?
      `).run(initialXp, Math.max(1, Math.floor(initialXp / 200) + 1), user.id);
    }

    // Sync any local progress items immediately into database
    if (localProgress && typeof localProgress === 'object') {
      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO progress_multi (user_id, item_id, item_type, xp_earned, score, code_snapshot, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const now = new Date().toISOString();
      for (const [itemId, itemData] of Object.entries(localProgress)) {
        insertStmt.run(user.id, itemId, itemData.type || 'lesson', itemData.xpEarned || 10, 0, null, itemData.completedAt || now);
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)').run(token, user.id, new Date().toISOString());

    res.json({
      token,
      user: { id: user.id, username: user.username, avatar: user.avatar }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/reset — reset passcode for character handle
app.post('/api/auth/reset', (req, res) => {
  try {
    const { username, newPassword } = req.body;
    if (!username || !newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: 'Username and new passcode (min 4 characters) required.' });
    }

    const cleanUser = username.trim();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(cleanUser);
    if (!user) {
      return res.status(404).json({ error: `Character "${cleanUser}" not found. Switch to "Create Character" tab above to register.` });
    }

    const { hash, salt } = hashPassword(newPassword);
    db.prepare('UPDATE users SET password_hash = ?, salt = ? WHERE id = ?').run(hash, salt, user.id);

    // Create fresh session token
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)').run(token, user.id, new Date().toISOString());

    res.json({
      token,
      user: { id: user.id, username: user.username, avatar: user.avatar },
      message: 'Passcode updated successfully!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.slice(7).trim();
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }
  res.json({ ok: true });
});

// GET /api/auth/me
app.get('/api/auth/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated' });
  res.json({ user });
});

// GET /api/leaderboard — bonus for friends!
app.get('/api/leaderboard', (req, res) => {
  const top = db.prepare(`
    SELECT u.username, u.avatar, s.total_xp, s.level, s.current_streak
    FROM users u
    JOIN user_stats_multi s ON u.id = s.user_id
    ORDER BY s.total_xp DESC
    LIMIT 20
  `).all();
  res.json({ leaderboard: top });
});

// ─── Stats & Progress Routes (User-Scoped) ───────────────────────

// GET /api/stats — load current user stats & progress
app.get('/api/stats', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    // Unauthenticated guest: return empty defaults (client will use local state/cache)
    return res.json({
      stats: { totalXp: 0, level: 1, currentStreak: 0, longestStreak: 0, lastActiveDate: null, hearts: 1, coins: 0 },
      progress: {},
      user: null,
    });
  }

  const userId = user.id;
  let stats = db.prepare('SELECT * FROM user_stats_multi WHERE user_id = ?').get(userId);
  if (!stats) {
    stats = { total_xp: 0, level: 1, current_streak: 1, longest_streak: 1, last_active_date: new Date().toISOString().split('T')[0], hearts: 1, coins: 0 };
  }

  const progressRows = db.prepare('SELECT * FROM progress_multi WHERE user_id = ?').all(userId);
  const progress = {};
  for (const row of progressRows) {
    progress[row.item_id] = {
      type: row.item_type,
      completedAt: row.completed_at,
      xpEarned: row.xp_earned,
      score: row.score,
    };
  }

  res.json({
    stats: {
      totalXp: stats.total_xp,
      level: stats.level,
      currentStreak: stats.current_streak,
      longestStreak: stats.longest_streak,
      lastActiveDate: stats.last_active_date,
      hearts: stats.hearts !== undefined && stats.hearts !== null ? stats.hearts : 1,
      coins: stats.coins !== undefined && stats.coins !== null ? stats.coins : 0,
    },
    progress,
    user,
  });
});

// PUT /api/stats — update user stats (authenticated only, with XP protection)
app.put('/api/stats', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    // Unauthenticated guest stats are maintained in localStorage on the client
    return res.json({ ok: true });
  }

  const userId = user.id;
  const { totalXp, level, currentStreak, longestStreak, lastActiveDate, hearts, coins } = req.body;

  // Protect XP: NEVER downgrade or zero-out existing user XP
  db.prepare(`
    INSERT INTO user_stats_multi (user_id, total_xp, level, current_streak, longest_streak, last_active_date, hearts, coins)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      total_xp = MAX(user_stats_multi.total_xp, excluded.total_xp),
      level = MAX(user_stats_multi.level, excluded.level),
      current_streak = excluded.current_streak,
      longest_streak = MAX(user_stats_multi.longest_streak, excluded.longest_streak),
      last_active_date = excluded.last_active_date,
      hearts = excluded.hearts,
      coins = excluded.coins
  `).run(
    userId,
    totalXp || 0,
    level || 1,
    currentStreak || 0,
    longestStreak || 0,
    lastActiveDate || null,
    hearts !== undefined ? Math.min(5, Math.max(0, hearts)) : 1,
    coins !== undefined ? Math.max(0, coins) : 0
  );

  res.json({ ok: true });
});

// POST /api/progress — save progress item (authenticated only)
app.post('/api/progress', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.json({ ok: true });
  }

  const userId = user.id;
  const { itemId, type, xp, score, codeSnapshot } = req.body;

  db.prepare(`
    INSERT OR REPLACE INTO progress_multi (user_id, item_id, item_type, xp_earned, score, code_snapshot, completed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(userId, itemId, type || 'lesson', xp || 0, score || 0, codeSnapshot || null, new Date().toISOString());

  res.json({ ok: true });
});

// POST /api/run — run code via JDoodle (Java) or locally (JS)
app.post('/api/run', async (req, res) => {
  try {
    const { code, language } = req.body;
    console.log(`[run] language=${language}, code length=${(code||'').length}`);

    if (language === 'javascript') {
      try {
        const logs = [];
        const fakeConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        };
        const fn = new Function('console', code);
        fn(fakeConsole);
        return res.json({ output: logs.join('\n') || '(no output)' });
      } catch (err) {
        return res.json({ error: err.message });
      }
    }

    // For Java/other languages — use JDoodle API
    const JDOODLE_CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
    const JDOODLE_CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;

    if (!JDOODLE_CLIENT_ID || !JDOODLE_CLIENT_SECRET) {
      console.log('[run] JDoodle credentials missing');
      return res.json({
        output: '[JDoodle API not configured]\n\nTo enable Java code execution:\n1. Sign up at https://www.jdoodle.com/compiler-api\n2. Create a .env file with:\n   JDOODLE_CLIENT_ID=your_id\n   JDOODLE_CLIENT_SECRET=your_secret',
      });
    }

    const langMap = {
      java: { language: 'java', versionIndex: '4' },
      sql: { language: 'sql', versionIndex: '3' },
      python: { language: 'python3', versionIndex: '4' },
      python3: { language: 'python3', versionIndex: '4' },
      cpp: { language: 'cpp17', versionIndex: '1' },
      c: { language: 'c', versionIndex: '5' },
      csharp: { language: 'csharp', versionIndex: '4' },
      javascript: { language: 'nodejs', versionIndex: '4' },
    };
    const config = langMap[language] || langMap.java;

    console.log(`[run] calling JDoodle: lang=${config.language}, version=${config.versionIndex}`);

    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
        script: code,
        language: config.language,
        versionIndex: config.versionIndex,
      }),
    });

    const data = await response.json();
    console.log('[run] JDoodle response:', JSON.stringify(data).slice(0, 200));

    if (data.error) {
      return res.json({ output: `Error: ${data.error}` });
    }
    return res.json({ output: data.output || '(no output)' });
  } catch (err) {
    console.error('[run] Server error:', err);
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

// Serve production static frontend if built
const distPath = join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(join(distPath, 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[error]', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ───────────────────────────────────────────────────────
const LISTEN_PORT = process.env.PORT || PORT;
app.listen(LISTEN_PORT, () => {
  console.log(`⚔️  CodeQuest running on http://localhost:${LISTEN_PORT}`);
});
