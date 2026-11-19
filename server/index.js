// Minimal code runner for the in-browser IDE (Python + Java only).
// WARNING: runs code on this machine. Fine for local dev; sandbox it before deploying.
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: '200kb' }));

const MAX_OUTPUT = 64 * 1024;

function run(cmd, args, cwd, timeoutMs, stdin = '') {
  return new Promise((resolve) => {
    let out = '';
    let timedOut = false;
    const child = spawn(cmd, args, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
    child.stdin.on('error', () => {});
    child.stdin.end(stdin);
    const add = (d) => { if (out.length < MAX_OUTPUT) out += d.toString(); };
    child.stdout.on('data', add);
    child.stderr.on('data', add);
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeoutMs);
    child.on('error', (e) => { clearTimeout(timer); resolve({ out: `Could not start ${cmd}: ${e.message}`, code: 1 }); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (timedOut) out += `\n[Stopped: took longer than ${timeoutMs / 1000}s]`;
      resolve({ out, code });
    });
  });
}

app.post('/api/run', async (req, res) => {
  const { code, language, stdin } = req.body || {};
  const input = typeof stdin === 'string' ? stdin.slice(0, 10000) : '';
  if (typeof code !== 'string') return res.status(400).json({ error: 'Missing code.' });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stepcode-'));
  try {
    let result;
    if (language === 'python') {
      fs.writeFileSync(path.join(dir, 'main.py'), code);
      result = await run('python3', ['main.py'], dir, 8000, input);
    } else if (language === 'java') {
      const cls = (code.match(/public\s+class\s+(\w+)/) || [])[1] || 'Main';
      fs.writeFileSync(path.join(dir, `${cls}.java`), code);
      result = await run('java', [`${cls}.java`], dir, 20000, input);
    } else {
      return res.status(400).json({ error: 'Only Python and Java are supported.' });
    }
    res.json({ output: result.out || '(no output)', exitCode: result.code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    fs.rm(dir, { recursive: true, force: true }, () => {});
  }
});

const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => (req.path.startsWith('/api') ? next() : res.sendFile(path.join(distPath, 'index.html'))));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, '127.0.0.1', () => console.log(`Runner on http://127.0.0.1:${PORT}`));
