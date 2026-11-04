const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');

function replaceInFile(fileName, pairs) {
  const filePath = path.join(lessonsDir, fileName);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  for (const [search, replace] of pairs) {
    if (typeof search === 'string') {
      if (content.includes(search)) {
        content = content.replaceAll(search, replace);
        count++;
      }
    } else {
      if (search.test(content)) {
        content = content.replace(search, replace);
        count++;
      }
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Replaced ${count} items in ${fileName}`);
}

// 1. phase1.js
replaceInFile('phase1.js', [
  ['Numeric Overflow Runes', 'Numeric Overflow Boundaries'],
  ['temperature converter rune', 'temperature converter program'],
  ['WizardGuild', 'DeveloperTeam'],
  ['totalWizards', 'totalDevelopers'],
  ['wizardCount', 'devCount'],
  ['Wizard', 'Developer'],
  ['CombatRune', 'PaymentRecord'],
  ['FireMage', 'CreditPayment'],
  ['IceMage', 'DebitPayment'],
  ['QuestTracker', 'TaskTracker'],
  ['Active Quests: 3\\nUnique Rewards: [Ancient Rune, Dragon Scale, Gold Coin]', 'Active Tasks: 3\\nUnique Categories: [Backend, Database, Frontend]'],
  ['Active Quests', 'Active Tasks'],
  ['Ancient Rune, Dragon Scale, Gold Coin', 'Backend, Database, Frontend'],
  ['goldCoins', 'totalAmount'],
  ['smallRune', 'smallValue'],
  ['elementalGlyph', 'statusChar']
]);

// 2. phase2.js
replaceInFile('phase2.js', [
  ['The Gates of Algor — Big-O Battle Metrics', 'Foundations of Complexity — Big-O Runtime & Space Analysis'],
  ['Gates of Algor', 'Algorithmic Foundations'],
  ['Big-O Battle Metrics', 'Big-O Runtime Analysis'],
  ['battle metrics', 'runtime metrics'],
  ['gladiator of code', 'software engineer'],
  ['gladiator', 'engineer'],
  ['complexity monsters', 'exponential complexities'],
  ['monster', 'edge-case problem'],
  ['Colosseum', 'Algorithm Studio'],
  ['two-pointer duels', 'two-pointer algorithms']
]);

// 3. pythonTrack.js
replaceInFile('pythonTrack.js', [
  ['String Slicing, Immutability & Text Glyph Sorcery', 'String Slicing, Immutability & Formatting Techniques'],
  ['Text Glyph Sorcery', 'String Processing Techniques'],
  ['Glyph Sorcery', 'String Operations'],
  ['hero_name = "ShadowSerpent"', 'username = "dev_alex"'],
  ['ShadowSerpent', 'dev_alex'],
  ['The Dual Iteration Runes: enumerate() & zip()', 'Iterating Efficiently: enumerate() & zip()'],
  ['Dual Iteration Runes', 'Iteration Patterns'],
  ['Authentication Runes: Bearer Tokens, API Keys & Custom Headers', 'API Security: Bearer Tokens, API Keys & Headers'],
  ['Authentication Runes', 'API Authentication Patterns'],
  ['class Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp', 'class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance'],
  ['self.hp', 'self.balance'],
  ['Wizard', 'Engineer'],
  ['wizard', 'engineer'],
  ['Serpent', 'Python'],
  ['serpent', 'python']
]);

// 4. webTrack.js
replaceInFile('webTrack.js', [
  ['<legend>Gladiator Registration</legend>', '<legend>Account Registration</legend>'],
  ['Gladiator Registration', 'Account Registration'],
  ['Gladiator', 'User Profile'],
  ['gladiator', 'user'],
  ['const fetchRune =', 'const fetchData ='],
  ['fetchRune', 'fetchData']
]);

console.log('Deep clean completed successfully!');
