// Verifies lesson code samples: each ```python block is run and, if followed by a ```text block,
// its output must match. "error" blocks must fail with the same error type.
// Also runs each project's full solution through its checks.
// Usage: node tools/check-lessons.mjs
import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawnSync } from 'child_process';
import { pathToFileURL } from 'url';

const root = path.resolve('src/content/lessons');
const FIX = process.argv.includes('--fix');
let failures = 0;
let ran = 0;

function run(code, input = '') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chk-'));
  fs.writeFileSync(path.join(dir, 'main.py'), code);
  const r = spawnSync('python3', ['main.py'], { cwd: dir, input, encoding: 'utf8', timeout: 10000 });
  fs.rmSync(dir, { recursive: true, force: true });
  return r;
}

function blocks(md) {
  const out = [];
  const re = /```(\w*)[ \t]*(\w*)\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(md))) out.push({ lang: m[1], flag: m[2], text: m[3].replace(/\n$/, '') });
  return out;
}

const norm = (s) => s.split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

for (const modDir of fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory())) {
  for (const file of fs.readdirSync(path.join(root, modDir)).filter((f) => f.endsWith('.md'))) {
    const md = fs.readFileSync(path.join(root, modDir, file), 'utf8');
    const bs = blocks(md);
    let patched = md;
    bs.forEach((b, i) => {
      if (b.lang !== 'python') return;
      if (/\binput\(/.test(b.text)) return;
      const next = bs[i + 1];
      const expected = next && next.lang === 'text' && file !== 'project.md' ? next.text : null;
      ran++;
      const r = run(b.text);
      const label = `${modDir}/${file} block ${i}`;
      if (b.flag === 'error') {
        if (r.status === 0) { failures++; console.log(`FAIL ${label}: expected an error, ran fine`); return; }
        if (expected) {
          const want = expected.trim().split('\n').pop();
          const got = r.stderr.trim().split('\n').pop();
          const wantType = want.split(':')[0];
          if (!got.startsWith(wantType)) { failures++; console.log(`FAIL ${label}: error type\n  want: ${want}\n  got:  ${got}`); }
        }
        return;
      }
      if (r.status !== 0) { failures++; console.log(`FAIL ${label}: raised\n${r.stderr.trim().split('\n').slice(-3).join('\n')}`); return; }
      if (expected !== null && norm(r.stdout) !== norm(expected)) {
        if (FIX) {
          // keep trailing spaces exactly as printed, trimmed of the final newline
          patched = patched.replace('```text\n' + next.text + '\n```', '```text\n' + r.stdout.replace(/\n$/, '') + '\n```');
          console.log(`fixed ${modDir}/${file} block ${i}`);
          return;
        }
        failures++;
        console.log(`FAIL ${label}: output differs\n--- doc\n${norm(expected)}\n--- real\n${norm(r.stdout)}`);
      }
    });
    if (FIX && patched !== md) fs.writeFileSync(path.join(root, modDir, file), patched);
  }
}

// Project solutions vs their checks
const { buildCheckScript } = await import(pathToFileURL(path.resolve('src/utils/checkHarness.js')).href);
for (const modDir of fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory())) {
  const mdPath = path.join(root, modDir, 'project.md');
  if (!fs.existsSync(mdPath)) continue;
  const md = fs.readFileSync(mdPath, 'utf8');
  const tail = md.split('+++ Full solution')[1] || '';
  const sol = (tail.match(/```python\n([\s\S]*?)```/) || [])[1];
  const raw = fs.readFileSync(path.join(root, modDir, 'index.js'), 'utf8');
  const checks = (raw.match(/checks: `([\s\S]*?)`,\n  \},/) || [])[1];
  const interactive = /interactive: true/.test(raw);
  if (!sol || !checks) { failures++; console.log(`FAIL ${modDir}: could not find solution or checks`); continue; }
  const script = buildCheckScript(sol, checks.replace(/\\\\n/g, '\\n'), { interactive });
  const r = run(script);
  const passed = /ALL CHECKS PASSED/.test(r.stdout);
  console.log(`${passed ? 'ok  ' : 'FAIL'} ${modDir} project solution vs checks`);
  if (!passed) { failures++; console.log(r.stdout.split('\n').filter((l) => !l.startsWith('PASS')).join('\n'), r.stderr.slice(-400)); }
  // a blank starter must NOT pass
  const starter = (raw.match(/python: `([\s\S]*?)`,\n      java/) || [])[1];
  if (starter) {
    const s = run(buildCheckScript(starter.replace(/\\\$/g, '$'), checks.replace(/\\\\n/g, '\\n'), { interactive }));
    const bad = /ALL CHECKS PASSED/.test(s.stdout);
    console.log(`${bad ? 'FAIL' : 'ok  '} ${modDir} starter does not pass checks`);
    if (bad) failures++;
  }
}

console.log(`\nran ${ran} snippets, ${failures} problem(s)`);
process.exit(failures ? 1 : 0);
