const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'lessons');

const linesFound = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, idx) => {
        if (/quest/i.test(l)) {
          linesFound.push({ file: path.relative(dir, p).replace(/\\/g, '/'), line: idx + 1, text: l.trim() });
        }
      });
    }
  }
}
walk(dir);
console.log('Total quest lines:', linesFound.length);
console.log('Sample of 20:');
linesFound.slice(0, 25).forEach(item => {
  console.log(`${item.file}:${item.line}: ${item.text.slice(0, 100)}`);
});
