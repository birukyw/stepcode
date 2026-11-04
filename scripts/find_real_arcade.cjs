const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data');

const regex = /\b(quest|quests|mana|spell|spells|warrior|warriors|rune|runes|dragon|dragons|gladiator|gladiators|colosseum|chronicles|kaelen|eldoria|shadowserpent|cyberknight|slaying|sorcery|enchanted|mystical|sacred|dungeon|loot|goblin|excalibur|potion|archmage|spellcaster|castspell)\b/i;

const matches = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, idx) => {
        const m = l.match(regex);
        if (m) {
          matches.push({
            file: path.relative(path.join(__dirname, '..'), p).replace(/\\/g, '/'),
            line: idx + 1,
            term: m[0],
            text: l.trim()
          });
        }
      });
    }
  }
}
walk(dir);
console.log('Total matches:', matches.length);
matches.forEach(m => console.log(`${m.file}:${m.line} [${m.term}] => ${m.text}`));
