const fs = require('fs');
const path = require('path');

const files = [
  'phase1.js',
  'phase2.js',
  'phase3.js',
  'phase4.js',
  'phase5.js',
  'phase6.js',
  'phase7.js',
  'webTrack.js',
  'pythonTrack.js'
];

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
const regex = /\b(quest|quests|mana|spell|spells|warrior|warriors|rune|runes|dragon|dragons|gladiator|gladiators|colosseum|chronicles|kaelen|eldoria|shadowserpent|cyberknight|slaying|sorcery|enchanted|mystical|sacred|dungeon|loot|goblin|excalibur|potion|archmage|spellcaster|castspell)\b/i;

files.forEach(file => {
  const p = path.join(lessonsDir, file);
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  const lines = content.split('\n');
  const fileMatches = [];
  lines.forEach((l, idx) => {
    const m = l.match(regex);
    if (m) {
      fileMatches.push({ line: idx + 1, term: m[0], text: l.trim() });
    }
  });
  if (fileMatches.length > 0) {
    console.log(`=== ${file} (${fileMatches.length} matches) ===`);
    fileMatches.forEach(m => console.log(`  L${m.line} [${m.term}]: ${m.text.slice(0, 110)}`));
  }
});
