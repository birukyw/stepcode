const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'data');
const regex = /(rune|sorcery|gladiator|warrior|mana|spell|eldoria|archives|initiate|sacred|ancient|glowing|chronicles|quest|enchanted|mystical|colosseum|dragon|shadowserpent|kaelen)/i;

function walk(d) {
  const files = fs.readdirSync(d);
  for (const f of files) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js') || p.endsWith('.json')) {
      const content = fs.readFileSync(p, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (regex.test(line)) {
          const rel = path.relative(path.join(__dirname, '..'), p).replace(/\\/g, '/');
          console.log(`${rel}:${idx + 1}: ${line.trim().slice(0, 100)}`);
        }
      });
    }
  }
}
walk(dir);
