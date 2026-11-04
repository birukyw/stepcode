const fs = require('fs');
const path = require('path');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');

function updateFile(fileName, replacements) {
  const filePath = path.join(lessonsDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let count = 0;

  for (const [target, replacement] of replacements) {
    if (typeof target === 'string') {
      if (content.includes(target)) {
        content = content.replaceAll(target, replacement);
        count++;
      }
    } else if (target instanceof RegExp) {
      if (target.test(content)) {
        content = content.replace(target, replacement);
        count++;
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${fileName} with ${count} replacement rule matches.`);
  } else {
    console.log(`No changes made to ${fileName}.`);
  }
}

// ─── 1. pythonTrack.js ────────────────────────────────────────────────────────
updateFile('pythonTrack.js', [
  [
    `# Welcome to the Chronicles of Python! 🐍\n# The print() function invokes the CPython standard output stream.\n\nprint("Hello, World!")\nprint("Awakening the Python Engineer in the CPython Archives...")\n\n# Python executes line by line from top to bottom.\n# Comments start with a hash (#) and are ignored by the compiler.\n`,
    `# Welcome to Python Foundations! 🐍\n# The print() function invokes the CPython standard output stream.\n\nprint("Hello, World!")\nprint("Python: Intuitive, Readable, and Powerful...")\n\n# Python executes line by line from top to bottom.\n# Comments start with a hash (#) and are ignored by the compiler.\n`
  ],
  [
    `Welcome, initiate of the Python Community. You enter the glowing ancient archives where human thought translates directly into executable computation. Before you command machine learning dragons and forge high-speed web systems, you must master the Python Core Syntax and understand how the CPython virtual engine brings your code to life.`,
    `Welcome to the Python curriculum. In this module, you will build foundational mental models for how code translates directly into executable instructions. Before designing machine learning pipelines and distributed web systems, you will master Python core syntax and understand how CPython brings your logic to life.`
  ],
  [
    `# Python Math & Numbers: Precision Arithmetic\n\n# 1. Arbitrary-Precision Integers (Whole numbers)\ngold = 150\nenemies_defeated = 12\n\n# 2. Double-Precision Floating Points (IEEE 754)\nhealth = 98.5\ncrit_multiplier = 1.75\n\n# 3. Arithmetic Operations\ntotal_damage = 25 * crit_multiplier\nxp_per_enemy = 125 // 3    # Floor division (drops remainder)\nremaining_xp = 125 % 3     # Modulo (remainder)\npower_level = 2 ** 8       # Exponentiation (2 to the power of 8)\n\nprint("Total Damage:", total_damage)\nprint("XP per Enemy (Floor):", xp_per_enemy)\nprint("Remainder XP:", remaining_xp)\nprint("Power Level (2^8):", power_level)\n`,
    `# Python Math & Numbers: Precision Arithmetic\n\n# 1. Arbitrary-Precision Integers (Whole numbers)\nitems_in_stock = 150\norders_completed = 12\n\n# 2. Double-Precision Floating Points (IEEE 754)\nunit_price = 98.5\ntax_multiplier = 1.08\n\n# 3. Arithmetic Operations\ntotal_price = 25 * tax_multiplier\nitems_per_box = 125 // 3    # Floor division (drops remainder)\nremaining_items = 125 % 3   # Modulo (remainder)\ncombinations = 2 ** 8       # Exponentiation (2 to the power of 8)\n\nprint("Total Price:", round(total_price, 2))\nprint("Items per Box (Floor):", items_per_box)\nprint("Remainder Items:", remaining_items)\nprint("Combinations (2^8):", combinations)\n`
  ],
  [
    `hero_name = "Kaelen Shadowblade"\nrealm = "Eldoria"\nlevel = 14\n\n# String Slicing: [start:stop:step]\nfirst_name = hero_name[:6]\nlast_name = hero_name[7:]\n\n# String Methods (Return brand-new string objects)\nshout = hero_name.upper()\nclean = "   extra whitespace   ".strip()\n\n# Formatted F-Strings (PEP 498 - Fast, Readable Interpolation)\nstatus_card = f"⚔️ Hero: {hero_name} | Realm: {realm} | Level: {level}"`,
    `username = "alex_chen"\ndepartment = "Engineering"\nteam_id = 14\n\n# String Slicing: [start:stop:step]\nfirst_name = username[:4]\nlast_name = username[5:]\n\n# String Methods (Return brand-new string objects)\nshout = username.upper()\nclean = "   extra whitespace   ".strip()\n\n# Formatted F-Strings (PEP 498 - Fast, Readable Interpolation)\nstatus_card = f"👤 User: {username} | Dept: {department} | Team: {team_id}"`
  ],
  [
    `mana = 75\nmax_mana = 100\n# Format with inline calculations and precision specifiers:\nprint(f"Mana: {mana}/{max_mana} ({mana / max_mana:.1%})")\n# Output: Mana: 75/100 (75.0%)`,
    `completed_tasks = 75\ntotal_tasks = 100\n# Format with inline calculations and precision specifiers:\nprint(f"Tasks: {completed_tasks}/{total_tasks} ({completed_tasks / total_tasks:.1%})")\n# Output: Tasks: 75/100 (75.0%)`
  ],
  [
    `is_warrior = True\nhas_magic = False`,
    `is_authenticated = True\nhas_permission = False`
  ],
  [
    `print("Type of is_warrior:", type(is_warrior))`,
    `print("Type of is_authenticated:", type(is_authenticated))`
  ],
  [
    `# String Slicing: [start:stop:step]\nhero_name = "dev_alex"\n\n# Extracting sub-strings\nguild = hero_name[0:6]        # "Shadow"\ntitle = hero_name[6:]         # "Python"\nreversed_name = hero_name[::-1] # Step of -1 reverses string!\n\nprint("Guild:", guild)\nprint("Title:", title)\nprint("Reversed:", reversed_name)\n\n# String Methods\nspell = "   ancient fire rune   "\nprint("Cleaned:", spell.strip().upper())\nprint("Replaced:", spell.replace("fire", "lightning").strip())\n`,
    `# String Slicing: [start:stop:step]\nusername = "dev_alexander"\n\n# Extracting sub-strings\nprefix = username[0:3]          # "dev"\nname_part = username[4:]        # "alexander"\nreversed_name = username[::-1]  # Step of -1 reverses string!\n\nprint("Prefix:", prefix)\nprint("Name Part:", name_part)\nprint("Reversed:", reversed_name)\n\n# String Methods\nsample_text = "   data normalization query   "\nprint("Cleaned:", sample_text.strip().upper())\nprint("Replaced:", sample_text.replace("normalization", "processing").strip())\n`
  ],
  [
    `<h2>🐍 Chapter 5: String Slicing & Glyph Manipulation</h2>`,
    `<h2>🐍 Chapter 5: String Slicing & Text Manipulation</h2>`
  ],
  [
    `⭐ The Reverse Spell: [::-1]`,
    `⭐ Reversing Sequences with Slicing: [::-1]`
  ],
  [
    `Sequence slicing is one of Python's most expressive syntactic spells.`,
    `Sequence slicing is one of Python's most expressive syntactic features.`
  ],
  [
    `format_player_card(username, level, class_name)`,
    `format_user_badge(username, level, role)`
  ],
  [
    `Player [USERNAME] | Level [LEVEL] [CLASS_NAME]`,
    `User [USERNAME] | Level [LEVEL] [ROLE]`
  ],
  [
    `format_player_card("CyberKnight", 10, "Mage")`,
    `format_user_badge("AlexChen", 10, "Engineer")`
  ],
  [
    `"Player CyberKnight | Level 10 Mage"`,
    `"User AlexChen | Level 10 Engineer"`
  ],
  [
    `Player CyberKnight | Level 10 Mage`,
    `User AlexChen | Level 10 Engineer`
  ],
  [
    `def format_player_card(username, level, class_name):\n    # Return formatted f-string: "Player {username} | Level {level} {class_name}"\n    return f"Player {username} | Level {level} {class_name}"\n\n# Test run\nprint(format_player_card("CyberKnight", 10, "Mage"))`,
    `def format_user_badge(username, level, role):\n    # Return formatted f-string: "User {username} | Level {level} {role}"\n    return f"User {username} | Level {level} {role}"\n\n# Test run\nprint(format_user_badge("AlexChen", 10, "Engineer"))`
  ],
  [
    `Use f"Player {username} | Level {level} {class_name}"`,
    `Use f"User {username} | Level {level} {role}"`
  ],
  [
    `player_level = 25\nhas_boss_key = True\nis_stealthed = False\nin_dungeon = True`,
    `user_age = 25\nhas_api_key = True\nis_admin = False\nin_session = True`
  ],
  [
    `The Arcane else Clause`,
    `The for...else Clause`
  ],
  [
    `spells = ["Fireball", "Frostbolt", "Lightning", "Teleport"]`,
    `skills = ["Python", "TypeScript", "SQL", "Docker"]`
  ],
  [
    `title: "Iterators, The Iterator Protocol & The yield Generator Spell"`,
    `title: "Iterators, The Iterator Protocol & Generator Functions (yield)"`
  ],
  [
    `def quest_xp_stream(base_xp, stages):`,
    `def data_batch_stream(batch_size, total_batches):`
  ],
  [
    `title: "Function Decorators: Wrapping Spells with Syntactic Sugar (@)"`,
    `title: "Function Decorators: Modifying Behavior with Syntactic Sugar (@)"`
  ],
  [
    `<h2>🐍 Function Decorators: Wrapping Spells with Syntactic Sugar (@)</h2>`,
    `<h2>🐍 Function Decorators: Modifying Behavior with Syntactic Sugar (@)</h2>`
  ],
  [
    `<h2>🎒 Chapter 5: The Vault of Collections — Data Structures</h2>`,
    `<h2>🎒 Chapter 5: Built-in Data Structures & Collections</h2>`
  ],
  [
    `party_a = {"Astra", "Kaelen", "Lyra", "Rowan"}`,
    `team_a = {"Alice", "Bob", "Charlie", "Diana"}`
  ],
  [
    `party_b = {"Kaelen", "Rowan", "Finn", "Orion"}`,
    `team_b = {"Charlie", "Diana", "Evan", "Frank"}`
  ],
  [
    `<h2>🏰 Chapter 6: Forging Object Golems — Classes & Namespaces</h2>`,
    `<h2>🏰 Chapter 6: Object-Oriented Programming — Classes & Namespaces</h2>`
  ],
  [
    `class Hero:\n    # Class attribute`,
    `class BankAccount:\n    # Class attribute`
  ],
  [
    `class Character:\n    def __init__(self, name, hp):`,
    `class Account:\n    def __init__(self, name, balance):`
  ],
  [
    `class InventoryBag:`,
    `class ShoppingCart:`
  ],
  [
    `<h2>🐍 Dunder Magic: __repr__, __str__, __len__ and __eq__</h2>`,
    `<h2>🐍 Special Methods: __repr__, __str__, __len__ and __eq__</h2>`
  ],
  [
    `title: "Text-Based Inventory & Hero Quest Simulator"`,
    `title: "Interactive Inventory & Order Processing System"`
  ],
  [
    `<h2>🐍 Magic Dunder Protocols & Operator Overloading</h2>`,
    `<h2>🐍 Protocol Methods & Operator Overloading</h2>`
  ],
  [
    `async def fetch_quest_data(quest_id):`,
    `async def fetch_record(record_id):`
  ],
  [
    `data = [\n    {"player": "Astra", "class": "Warrior", "level": 12, "gold": 450},`,
    `data = [\n    {"user": "Alice", "role": "Engineer", "level": 12, "salary": 4500},`
  ]
]);

// ─── 2. phase1.js ────────────────────────────────────────────────────────────
updateFile('phase1.js', [
  [
    `Console Calculator & Number System Quest`,
    `Console Calculator & Number Systems`
  ],
  [
    `Unique Quest Tracker (HashSet & HashMap)`,
    `Task Tracker (HashSet & HashMap)`
  ],
  [
    `Deduplicate quest rewards using a Set.`,
    `Deduplicate task categories using a Set.`
  ],
  [
    `Safe Potion Dispenser (Exception Handling)`,
    `Safe Inventory Dispenser (Exception Handling)`
  ],
  [
    `public class PotionDispenser`,
    `public class InventoryDispenser`
  ],
  [
    `static class OutOfPotionsException extends Exception`,
    `static class OutOfStockException extends Exception`
  ],
  [
    `Potion dispensed successfully: Healing Draught\nError caught: OutOfPotionsException`,
    `Item dispensed successfully: Standard Unit\nError caught: OutOfStockException`
  ],
  [
    `Implement custom exception handling for potion dispensing.`,
    `Implement custom exception handling for inventory item dispensing.`
  ],
  [
    `Dungeon Inventory & Loot System`,
    `Warehouse Inventory & Order System`
  ],
  [
    `public class DungeonInventory`,
    `public class WarehouseInventory`
  ],
  [
    `interface Spellcaster {\n        void castSpell();\n    }`,
    `interface PaymentProcessor {\n        void processPayment();\n    }`
  ],
  [
    `title: "Polymorphic Spellcaster"`,
    `title: "Polymorphic Payment Processor"`
  ],
  [
    `public class SpellcasterDemo`,
    `public class PaymentProcessorDemo`
  ],
  [
    `public static void castSpell(int mana)`,
    `public static void processTransaction(int amount)`
  ],
  [
    `instantiate both mages and call castSpell() sequentially.`,
    `instantiate both processors and call processPayment() sequentially.`
  ]
]);

// ─── 3. phase2.js ────────────────────────────────────────────────────────────
updateFile('phase2.js', [
  [
    `gladiator of code`,
    `software engineer`
  ],
  [
    `Gladiator of code`,
    `Software engineer`
  ],
  [
    `spells`,
    `operations`
  ]
]);

// ─── 4. phase3.js ────────────────────────────────────────────────────────────
updateFile('phase3.js', [
  [
    `Dungeon Loot Optimizer: 0/1 Knapsack & Quest Combinatorics`,
    `0/1 Knapsack Problem & Optimization`
  ],
  [
    `Project: 0/1 Knapsack Dungeon Loot Optimizer`,
    `Project: 0/1 Knapsack Combinatorial Optimization`
  ],
  [
    `maxLoot`,
    `maxValue`
  ]
]);

// ─── 5. phase6.js ────────────────────────────────────────────────────────────
updateFile('phase6.js', [
  [
    `<title>Adventurer Guild</title>`,
    `<title>Analytics Portal</title>`
  ],
  [
    `const hero = { id: 1, name: 'Biruk', role: 'Archmage', level: 60 };`,
    `const user = { id: 1, name: 'Alex', role: 'Staff Engineer', level: 60 };`
  ],
  [
    `const quests = [\n    { title: 'Goblin Ambush', reward: 50, completed: true },\n    { title: 'Dragon Lair', reward: 500, completed: false },\n    { title: 'Potion Delivery', reward: 25, completed: true }\n];`,
    `const tasks = [\n    { title: 'Database Migration', reward: 50, completed: true },\n    { title: 'Security Audit', reward: 500, completed: false },\n    { title: 'API Integration', reward: 25, completed: true }\n];`
  ],
  [
    `const items = [\n    { name: 'Health Potion', price: 10 },\n    { name: 'Excalibur', price: 1000 },\n    { name: 'Dragon Armor', price: 500 }\n];`,
    `const items = [\n    { name: 'Monitor Stand', price: 10 },\n    { name: 'Ergonomic Chair', price: 1000 },\n    { name: 'Mechanical Keyboard', price: 500 }\n];`
  ],
  [
    `Dragon Armor, Excalibur`,
    `Ergonomic Chair, Mechanical Keyboard`
  ]
]);

// ─── 6. webTrack.js ──────────────────────────────────────────────────────────
updateFile('webTrack.js', [
  [
    `const warrior = { id: 42, name: 'Kael', stats: { hp: 500, mp: 200 } };`,
    `const user = { id: 42, name: 'Alex', metrics: { score: 500, tasks: 200 } };`
  ],
  [
    `title: "Dynamic Quest Log App"`,
    `title: "Dynamic Task Manager App"`
  ],
  [
    `scenario: "Build a dynamic interactive quest log in pure JavaScript that utilizes closures for score tracking and event delegation for task completion."`,
    `scenario: "Build a dynamic interactive task manager in pure JavaScript that utilizes closures for state tracking and event delegation for item completion."`
  ],
  [
    `// Quest Log Application`,
    `// Task Manager Application`
  ],
  [
    `Use closures to encapsulate quest progression state`,
    `Use closures to encapsulate task completion state`
  ],
  [
    `Implement event delegation for checking off quests`,
    `Implement event delegation for checking off tasks`
  ],
  [
    `Use modern ES6 array methods to filter completed quests`,
    `Use modern ES6 array methods to filter completed tasks`
  ],
  [
    `title: "Interactive Quest Master Dashboard"`,
    `title: "Interactive Project Management Dashboard"`
  ],
  [
    `scenario: "Build a fully controlled React quest tracker featuring customized hooks, debounced search filters, and persistent state."`,
    `scenario: "Build a fully controlled React project dashboard featuring customized hooks, debounced search filters, and persistent state."`
  ],
  [
    `// Quest Master Dashboard`,
    `// Project Management Dashboard`
  ],
  [
    `<Link to="/">Armory</Link> | <Link to="/quests">Quests</Link>`,
    `<Link to="/">Dashboard</Link> | <Link to="/projects">Projects</Link>`
  ],
  [
    `<Route path="/" element={<h2>Armory Hub</h2>} />\n        <Route path="/quests" element={<h2>Quest Portal</h2>} />`,
    `<Route path="/" element={<h2>Main Dashboard</h2>} />\n        <Route path="/projects" element={<h2>Project Directory</h2>} />`
  ],
  [
    `function QuestDetail() {\n  // Extracts :questId from route "/quests/:questId"\n  const { questId } = useParams();\n  return <div>Viewing Quest: #{questId}</div>;\n}`,
    `function ProjectDetail() {\n  // Extracts :projectId from route "/projects/:projectId"\n  const { projectId } = useParams();\n  return <div>Viewing Project: #{projectId}</div>;\n}`
  ],
  [
    `TABLE: heroes                           TABLE: quests`,
    `TABLE: users                            TABLE: orders`
  ],
  [
    `| name    | guild | quest_id | xp_reward |`,
    `| name    | team  | order_id | total_amount |`
  ],
  [
    `const fetchData = (id) => new Promise((resolve, reject) => {\n  if (id > 0) resolve({ id, name: 'Fire Rune' });\n  else reject(new Error('Invalid rune ID'));\n});`,
    `const fetchData = (id) => new Promise((resolve, reject) => {\n  if (id > 0) resolve({ id, name: 'Primary Dataset' });\n  else reject(new Error('Invalid record ID'));\n});`
  ],
  [
    `console.log("Runes fetched:", r1, r2)`,
    `console.log("Records fetched:", r1, r2)`
  ],
  [
    `console.error("Failed to load runes:", err)`,
    `console.error("Failed to load records:", err)`
  ]
]);

console.log('All files processed in comprehensive cleanup!');
