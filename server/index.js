// Code runner for the in-browser IDE.
// Python runs in the browser (Pyodide), so this server exists mainly for Java.
//
// SECURITY: this executes code submitted by anyone who can reach it. Run it only inside a
// disposable container (see server/Dockerfile and render.yaml), keep secrets out of its
// environment, and keep the limits below. Never expose it on a machine you care about.
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROD = process.env.NODE_ENV === 'production';

// Which languages this server will run. Production default: Java only (Python runs in the browser).
const LANGUAGES = new Set((process.env.RUNNER_LANGUAGES || (PROD ? 'java' : 'python,java')).split(',').map((s) => s.trim()).filter(Boolean));
const ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
const MAX_OUTPUT = 64 * 1024;
const MAX_CONCURRENT = Number(process.env.MAX_CONCURRENT || 3);
const RATE_PER_MIN = Number(process.env.RATE_PER_MIN || 30);
const TIMEOUTS = { python: 8000, java: 20000 };

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(cors({
  origin(origin, cb) {
    // No Origin header: curl, health checks. In dev everything is allowed. In production only listed sites.
    if (!origin || !PROD || ORIGINS.includes('*') || ORIGINS.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(express.json({ limit: '100kb' }));

// Tiny in-memory rate limiter: RATE_PER_MIN runs per IP per minute.
const hits = new Map();
setInterval(() => hits.clear(), 60 * 1000).unref();
function rateLimit(req, res, next) {
  const ip = req.ip || 'unknown';
  const n = (hits.get(ip) || 0) + 1;
  hits.set(ip, n);
  if (n > RATE_PER_MIN) return res.status(429).json({ error: 'Too many runs. Wait a minute and try again.' });
  return next();
}

let running = 0;

function run(cmd, args, cwd, timeoutMs, stdin = '') {
  return new Promise((resolve) => {
    let out = '';
    let timedOut = false;
    // A clean environment: nothing from the host (tokens, keys) is visible to submitted code.
    const env = { PATH: process.env.PATH, HOME: cwd, TMPDIR: cwd, LANG: 'C.UTF-8' };
    const child = spawn(cmd, args, { cwd, env, stdio: ['pipe', 'pipe', 'pipe'], detached: true });
    child.stdin.on('error', () => {});
    child.stdin.end(stdin);
    const add = (d) => { if (out.length < MAX_OUTPUT) out += d.toString(); };
    child.stdout.on('data', add);
    child.stderr.on('data', add);
    const killTree = () => { try { process.kill(-child.pid, 'SIGKILL'); } catch { child.kill('SIGKILL'); } };
    const timer = setTimeout(() => { timedOut = true; killTree(); }, timeoutMs);
    child.on('error', (e) => { clearTimeout(timer); resolve({ out: `Could not start ${cmd}: ${e.message}`, code: 1 }); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (out.length >= MAX_OUTPUT) out += '\n[Output cut off]';
      if (timedOut) out += `\n[Stopped: took longer than ${timeoutMs / 1000}s]`;
      resolve({ out, code });
    });
  });
}

app.get('/healthz', (req, res) => res.json({ ok: true, languages: [...LANGUAGES] }));

app.post('/api/run', rateLimit, async (req, res) => {
  const { code, language, stdin } = req.body || {};
  if (typeof code !== 'string' || code.length > 50000) return res.status(400).json({ error: 'Missing or oversized code.' });
  if (!LANGUAGES.has(language)) return res.status(400).json({ error: `${language === 'python' ? 'Python runs in your browser, not on the server.' : 'That language is not enabled on this server.'}` });
  if (running >= MAX_CONCURRENT) return res.status(503).json({ error: 'The code runner is busy. Try again in a few seconds.' });
  const input = typeof stdin === 'string' ? stdin.slice(0, 10000) : '';
  running += 1;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stepcode-'));
  try {
    let result;
    if (language === 'python') {
      fs.writeFileSync(path.join(dir, 'main.py'), code);
      result = await run('python3', ['main.py'], dir, TIMEOUTS.python, input);
    } else {
      const cls = (code.match(/public\s+class\s+(\w+)/) || [])[1] || 'Main';
      fs.writeFileSync(path.join(dir, `${cls}.java`), code);
      result = await run('java', ['-Xmx128m', '-Xss512k', '-XX:+UseSerialGC', '-XX:TieredStopAtLevel=1', `${cls}.java`], dir, TIMEOUTS.java, input);
    }
    res.json({ output: result.out || '(no output)', exitCode: result.code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    running -= 1;
    fs.rm(dir, { recursive: true, force: true }, () => {});
  }
});

// Local convenience: serve a built site from the same process (not used on Vercel).
const distPath = path.join(__dirname, '..', 'dist');
if (!PROD && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => (req.path.startsWith('/api') ? next() : res.sendFile(path.join(distPath, 'index.html'))));
}

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || (PROD ? '0.0.0.0' : '127.0.0.1');
app.listen(PORT, HOST, () => console.log(`Runner on http://${HOST}:${PORT} (${[...LANGUAGES].join(', ')})`));
