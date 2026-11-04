const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');

function processFile(filename, replacers) {
  const filePath = path.join(lessonsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Not found: ${filename}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [pattern, repl] of replacers) {
    if (typeof pattern === 'string') {
      content = content.split(pattern).join(repl);
    } else if (pattern instanceof RegExp) {
      content = content.replace(pattern, repl);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated: ${filename}`);
  } else {
    console.log(`No changes made to: ${filename}`);
  }
}

// 1. phase2.js
processFile('phase2.js', [
  [/gladiator of code/gi, 'software engineer'],
  [/gladiator/gi, 'engineer'],
  [/cast spells/gi, 'execute operations'],
  [/spell/gi, 'operation'],
  [/spells/gi, 'operations'],
  [/ancient runes/gi, 'syntax tokens'],
  [/runes/gi, 'tokens']
]);

// 2. phase3.js
processFile('phase3.js', [
  [/sacred tree/gi, 'binary tree'],
  [/sacred/gi, 'canonical'],
  [/warriors/gi, 'nodes'],
  [/warrior/gi, 'node'],
  [/Loot/g, 'Value'],
  [/loot/g, 'value'],
  [/Dungeon Loot Optimizer/g, 'Knapsack Optimization Engine'],
  [/dungeon loot/gi, 'knapsack item']
]);

// 3. phase4.js
processFile('phase4.js', [
  [/Sacred Normal Forms/gi, 'Core Normal Forms'],
  [/sacred/gi, 'foundational']
]);

// 4. phase5.js
processFile('phase5.js', [
  [/SpellService/g, 'NotificationService'],
  [/cast\(\)/g, 'notify()'],
  [/Cast spell/gi, 'Send notification'],
  [/spell/gi, 'notification']
]);

// 5. phase6.js
processFile('phase6.js', [
  [/quests/g, 'tasks'],
  [/quest/g, 'task'],
  [/Goblin Ambush/g, 'Database Migration'],
  [/Dragon Lair/g, 'Performance Profiling'],
  [/Potion Delivery/g, 'API Refactoring'],
  [/Health Potion/g, 'Monitor Stand'],
  [/Excalibur/g, 'Ergonomic Chair'],
  [/Dragon Armor/g, 'Mechanical Keyboard'],
  [/Archmage/g, 'Staff Engineer'],
  [/hero =/g, 'developer =']
]);

// 6. phase7.js
processFile('phase7.js', [
  [/quest-db/g, 'app-db'],
  [/quest_db/g, 'app_db'],
  [/quest/g, 'service']
]);

// 7. webTrack.js
processFile('webTrack.js', [
  [/const warrior = \{ id: 42, name: 'Kael', stats: \{ hp: 500, mp: 200 \} \};/g, "const user = { id: 42, name: 'Alex', metrics: { score: 500, tasks: 200 } };"],
  [/warrior\./g, 'user.'],
  [/warriors/gi, 'engineers'],
  [/warrior/gi, 'engineer'],
  [/Array Alchemy/g, 'Array Manipulation'],
  [/cast-spell/g, 'submit-btn'],
  [/cast spell/gi, 'submit form'],
  [/spell/gi, 'action'],
  [/quest-list/g, 'task-list'],
  [/quest-item/g, 'task-item'],
  [/questId/g, 'taskId'],
  [/dataset\.quest/g, 'dataset.task'],
  [/Clicked quest:/g, 'Clicked task:'],
  [/Dynamic Quest Log App/g, 'Dynamic Task Manager App'],
  [/dynamic interactive quest log/g, 'dynamic interactive task manager'],
  [/Quest Log Application/g, 'Task Manager Application'],
  [/Interactive Quest Master Dashboard/g, 'Interactive Project Dashboard'],
  [/React quest tracker/g, 'React project dashboard'],
  [/Quest Master Dashboard/g, 'Project Dashboard'],
  [/Fire Rune/g, 'Primary Dataset'],
  [/Invalid rune ID/g, 'Invalid record ID'],
  [/Runes fetched:/g, 'Records fetched:'],
  [/Failed to load runes:/g, 'Failed to load records:'],
  [/Armory Hub/g, 'Dashboard'],
  [/Quest Portal/g, 'Project Portal'],
  [/<Link to="\/">Armory<\/Link> \| <Link to="\/quests">Quests<\/Link>/g, '<Link to="/">Dashboard</Link> | <Link to="/projects">Projects</Link>'],
  [/path="\/quests"/g, 'path="/projects"'],
  [/function QuestDetail/g, 'function ProjectDetail'],
  [/Viewing Quest:/g, 'Viewing Project:'],
  [/heroes/g, 'users'],
  [/xp_reward/g, 'total_amount']
]);

// 8. pythonTrack.js
processFile('pythonTrack.js', [
  [/Welcome to the Chronicles of Python! 🐍/g, 'Welcome to Python Foundations! 🐍'],
  [/Awakening the Python Engineer in the CPython Archives\.\.\./g, 'Python: Intuitive, Readable, and Powerful...'],
  [/Kaelen Shadowblade/g, 'alex_chen'],
  [/Eldoria/g, 'Engineering'],
  [/⚔️ Hero: \{hero_name\} \| Realm: \{realm\}/g, '👤 User: {hero_name} | Dept: {realm}'],
  [/mana = 75/g, 'tasks_done = 75'],
  [/max_mana = 100/g, 'total_tasks = 100'],
  [/Mana: \{mana\}\/\{max_mana\} \(\{mana \/ max_mana:\.1%\}\)/g, 'Tasks: {tasks_done}/{total_tasks} ({tasks_done / total_tasks:.1%})'],
  [/ancient fire rune/g, 'clean input data'],
  [/Glyph Manipulation/g, 'Text Manipulation'],
  [/The Reverse Spell: \[::-1\]/g, 'Reversing Sequences: [::-1]'],
  [/syntactic spells/gi, 'syntactic patterns'],
  [/syntactic spell/gi, 'syntactic pattern'],
  [/CyberKnight/g, 'AlexChen'],
  [/Level 10 Mage/g, 'Level 10 Engineer'],
  [/player_level = 25/g, 'user_age = 25'],
  [/has_boss_key = True/g, 'has_api_key = True'],
  [/is_poisoned = False/g, 'is_admin = False'],
  [/in_dungeon = True/g, 'in_session = True'],
  [/The Arcane else Clause/g, 'The for...else Clause'],
  [/spells = \["Fireball", "Frost Nova", "Thunderclap", "Teleport"\]/g, 'languages = ["Python", "TypeScript", "SQL", "Docker"]'],
  [/Iterators, The Iterator Protocol & The yield Generator Spell/g, 'Iterators, The Iterator Protocol & Generator Functions (yield)'],
  [/quest_xp_stream/g, 'data_batch_stream'],
  [/Wrapping Spells with Syntactic Sugar/g, 'Modifying Functions with Syntactic Sugar'],
  [/party_a = \{"Astra", "Vex", "Kaelen", "Lyra"\}/g, 'team_a = {"Alice", "Bob", "Charlie", "Diana"}'],
  [/party_b = \{"Kaelen", "Lyra", "Rowan", "Finn"\}/g, 'team_b = {"Charlie", "Diana", "Evan", "Frank"}'],
  [/heroes = \{/g, 'users = {'],
  [/class Hero:/g, 'class UserAccount:'],
  [/Forging Object Golems/g, 'Object-Oriented Design'],
  [/class Character:\n/g, 'class Account:\n'],
  [/self\.hp = hp/g, 'self.balance = balance'],
  [/self\.hp/g, 'self.balance'],
  [/hp/g, 'balance'],
  [/Potion/g, 'Item'],
  [/Dunder Magic/g, 'Special Methods'],
  [/Magic Dunder/g, 'Special Dunder'],
  [/Hero Quest Simulator/g, 'Order Processing System'],
  [/GameSave/g, 'SessionState'],
  [/in_dungeon/g, 'in_session'],
  [/current_dungeon/g, 'current_workspace'],
  [/warrior/g, 'engineer'],
  [/Warrior/g, 'Engineer'],
  [/fetch_quest_data/g, 'fetch_record'],
  [/fetch_quest/g, 'fetch_record'],
  [/player_name/g, 'user_name'],
  [/{"player": "Astra", "class": "Warrior", "level": 12, "gold": 450}/g, '{"user": "Alice", "role": "Engineer", "level": 12, "score": 450}'],
  [/{"player": "Kaelen", "class": "Mage", "level": 14, "gold": 620}/g, '{"user": "Bob", "role": "Architect", "level": 14, "score": 620}'],
  [/{"player": "Lyra", "class": "Ranger", "level": 11, "gold": 380}/g, '{"user": "Charlie", "role": "Designer", "level": 11, "score": 380}'],
  [/{"player": "Finn", "class": "Warrior", "level": 15, "gold": 800}/g, '{"user": "Diana", "role": "Engineer", "level": 15, "score": 800}'],
  [/{"class": "Mage", "xp": 1200}/g, '{"role": "Architect", "score": 1200}'],
  [/{"class": "Warrior", "xp": 800}/g, '{"role": "Engineer", "score": 800}'],
  [/{"class": "Ranger", "xp": 950}/g, '{"role": "Designer", "score": 950}'],
  [/{"class": "Mage", "xp": 1100}/g, '{"role": "Architect", "score": 1100}'],
  [/{"class": "Warrior", "xp": 1400}/g, '{"role": "Engineer", "score": 1400}']
]);

console.log('All files processed!');
