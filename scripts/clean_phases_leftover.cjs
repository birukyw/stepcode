const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');

// 1. phase1.js
const p1Path = path.join(lessonsDir, 'phase1.js');
let p1 = fs.readFileSync(p1Path, 'utf8');

p1 = p1
  .replaceAll('CastSpell', 'ProcessPayment')
  .replaceAll('castSpell', 'processPayment')
  .replaceAll('Spellcaster', 'PaymentProcessor')
  .replaceAll('CombatAction', 'TransactionAction')
  .replaceAll('CombatResolver', 'TransactionResolver')
  .replaceAll('runeName', 'token')
  .replaceAll('manaCost', 'fee')
  .replaceAll('mana', 'balance')
  .replaceAll('OutOfPotionsException', 'OutOfStockException')
  .replaceAll('Healing Draught', 'Standard Unit')
  .replaceAll('Ancient Rune', 'Backend')
  .replaceAll('Dragon Scale', 'Frontend')
  .replaceAll('Gold Coin', 'Database')
  .replaceAll('Dungeon Inventory Initialized', 'Warehouse Inventory Initialized')
  .replaceAll('List.of("Warrior", "Mage", "Rogue")', 'List.of("Engineering", "Product", "Design")')
  .replaceAll('Set.of("Ruby", "Sapphire", "Ruby")', 'Set.of("US-East", "EU-West", "US-East")')
  .replaceAll('Map.of("Fireball", 30, "Heal", 20)', 'Map.of("API", 30, "Database", 20)')
  .replaceAll('Unique gems:', 'Unique regions:')
  .replaceAll('Fireball Cost:', 'API Cost:');

fs.writeFileSync(p1Path, p1, 'utf8');

// 2. phase2.js
const p2Path = path.join(lessonsDir, 'phase2.js');
let p2 = fs.readFileSync(p2Path, 'utf8');
p2 = p2
  .replaceAll('current rune', 'current token')
  .replaceAll('the rune mismatches', 'the token mismatches')
  .replaceAll('Battle Strategy & Arena Invariants', 'Algorithmic Invariants & Best Practices');
fs.writeFileSync(p2Path, p2, 'utf8');

// 3. phase6.js
const p6Path = path.join(lessonsDir, 'phase6.js');
let p6 = fs.readFileSync(p6Path, 'utf8');
p6 = p6
  .replaceAll('>Quests<', '>Tasks<')
  .replaceAll('Dragon Hunt Quest', 'Q3 Security Audit')
  .replaceAll('500 Gold Coins', '500 Points')
  .replaceAll('Adventurer Guild', 'Engineering Org')
  .replaceAll("spells: ['Meteor', 'Teleport']", "skills: ['TypeScript', 'GraphQL']")
  .replaceAll('updatedHero', 'updatedUser')
  .replaceAll('Hero ${name}', 'User ${name}')
  .replaceAll('Lost Relic', 'Code Review')
  .replaceAll('doneQuests', 'doneTasks')
  .replaceAll('totalGold', 'totalPoints')
  .replaceAll('Completed Quests:', 'Completed Tasks:')
  .replaceAll('Total Gold Earned:', 'Total Points Earned:');
fs.writeFileSync(p6Path, p6, 'utf8');

console.log('Cleaned phase1, phase2, phase6');
