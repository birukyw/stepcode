const fs = require('fs');
const path = require('path');

const pyPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'pythonTrack.js');
let py = fs.readFileSync(pyPath, 'utf8');

py = py.replace(
  'class Mage(Character):\\n    def __init__(self, name: str, health: int, mana: int):\\n        super().__init__(name, health) # Delegates to Character.__init__!\\n        self.mana = mana',
  'class PremiumAccount(Account):\\n    def __init__(self, name: str, balance: float, credit_limit: float):\\n        super().__init__(name, balance) # Delegates to Account.__init__!\\n        self.credit_limit = credit_limit'
);
py = py.replace(
  'class Mage(Character):',
  'class PremiumAccount(Account):'
);
py = py.replace(
  'issubclass(Mage, Character)',
  'issubclass(PremiumAccount, Account)'
);
py = py.replace(
  'DUNDER IMPLEMENTATION:\\nclass Spell:\\n    def __init__(self, name: str, cost: int):\\n        self.name = name\\n        self.cost = cost\\n\\n    def __repr__(self) -> str:\\n        return f"Spell(name=\'{self.name}\', cost={self.cost})"\\n\\n    def __eq__(self, other: object) -> bool:\\n        if not isinstance(other, Spell): return False\\n        return self.name == other.name and self.cost == other.cost',
  'DUNDER IMPLEMENTATION:\\nclass Product:\\n    def __init__(self, name: str, price: float):\\n        self.name = name\\n        self.price = price\\n\\n    def __repr__(self) -> str:\\n        return f"Product(name=\'{self.name}\', price={self.price})"\\n\\n    def __eq__(self, other: object) -> bool:\\n        if not isinstance(other, Product): return False\\n        return self.name == other.name and self.price == other.price'
);
py = py.replace(
  '# Advanced OOP: Inheritance, Polymorphism & super()\\n\\nclass Character:\\n    def __init__(self, name, health):\\n        self.name = name\\n        self.health = health\\n\\n    def attack(self):\\n        return f"{self.name} strikes with basic attack!"\\n\\nclass Mage(Character):\\n    def __init__(self, name, health, mana):\\n        super().__init__(name, health)  # Delegate to parent constructor\\n        self.mana = mana\\n\\n    def attack(self):\\n        return f"{self.name} casts Arcane Blast using {self.mana} mana!"\\n\\nm = Mage("Merlin", 80, 100)\\nprint(m.attack())\\nprint("Method Resolution Order (MRO):", [cls.__name__ for cls in Mage.__mro__])\\n',
  '# Advanced OOP: Inheritance, Polymorphism & super()\\n\\nclass Account:\\n    def __init__(self, name, balance):\\n        self.name = name\\n        self.balance = balance\\n\\n    def describe(self):\\n        return f"{self.name} has standard balance ${self.balance}"\\n\\nclass PremiumAccount(Account):\\n    def __init__(self, name, balance, cashback):\\n        super().__init__(name, balance)  # Delegate to parent constructor\\n        self.cashback = cashback\\n\\n    def describe(self):\\n        return f"{self.name} has premium balance ${self.balance} with {self.cashback}% cashback!"\\n\\nacc = PremiumAccount("Alex", 5000, 2.5)\\nprint(acc.describe())\\nprint("Method Resolution Order (MRO):", [cls.__name__ for cls in PremiumAccount.__mro__])\\n'
);
py = py.replace('Dungeon Floor 5', 'Production Cluster US-East');
py = py.replace('Guild loot loaded!', 'Server dataset loaded!');
py = py.replace('Starting fetch for quest {quest_id}...', 'Starting fetch for record {record_id}...');
py = py.replace('Quest {quest_id} Data', 'Record {record_id} Data');

fs.writeFileSync(pyPath, py, 'utf8');
console.log('Cleaned pythonTrack.js final items');

const webPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'webTrack.js');
let web = fs.readFileSync(webPath, 'utf8');
web = web.replace(
  "const { name, stats: { hp } } = engineer;\\n\\nconst inventory = ['Sword', 'Shield', 'Potion'];\\nconst [primary, ...rest] = inventory;\\nconst newInventory = [...inventory, 'Elixir'];",
  "const { name, metrics: { score } } = user;\\n\\nconst inventory = ['Monitor', 'Keyboard', 'Mouse'];\\nconst [primary, ...rest] = inventory;\\nconst newInventory = [...inventory, 'Headphones'];"
);
web = web.replace(
  '<Link to=\\"/\\">Armory</Link> | <Link to=\\"/quests\\">Quests</Link>',
  '<Link to=\\"/\\">Home</Link> | <Link to=\\"/projects\\">Projects</Link>'
);
web = web.replace(
  'path=\\"/quests\\"',
  'path=\\"/projects\\"'
);
web = web.replace(
  'route \\"/quests/:taskId\\"',
  'route \\"/projects/:taskId\\"'
);

fs.writeFileSync(webPath, web, 'utf8');
console.log('Cleaned webTrack.js final items');
