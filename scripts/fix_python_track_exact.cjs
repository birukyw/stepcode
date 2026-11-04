const fs = require('fs');
const path = require('path');

const pyPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'pythonTrack.js');
let py = fs.readFileSync(pyPath, 'utf8');

// 1. Line 308 starter code
const old308 = `# Python Built-in Collections\\n\\n# 1. Lists (Ordered, mutable array of pointer references)\\nspells = [\\"Fireball\\", \\"Frost Nova\\", \\"Lightning Bolt\\"]\\nspells.append(\\"Teleport\\")\\n\\n# 2. Dictionaries (High-speed hash tables with O(1) average lookup)\\nstats = {\\"health\\": 100, \\"mana\\": 50, \\"armor\\": 25}\\nstats[\\"mana\\"] += 25\\n\\n# 3. Sets (Unique elements powered by hash tables)\\nequipped_items = {\\"Sword\\", \\"Shield\\", \\"Boots\\"}\\nequipped_items.add(\\"Sword\\")  # Duplicate ignored!\\n\\nprint(\\"Spells:\\", spells)\\nprint(\\"Stats:\\", stats)\\nprint(\\"Unique Items:\\", equipped_items)\\n`;
const new308 = `# Python Built-in Collections\\n\\n# 1. Lists (Ordered, mutable array of pointer references)\\nlanguages = [\\"Python\\", \\"TypeScript\\", \\"SQL\\"]\\nlanguages.append(\\"Go\\")\\n\\n# 2. Dictionaries (High-speed hash tables with O(1) average lookup)\\nserver_config = {\\"port\\": 8080, \\"timeout\\": 30, \\"workers\\": 4}\\nserver_config[\\"timeout\\"] += 15\\n\\n# 3. Sets (Unique elements powered by hash tables)\\nactive_tags = {\\"backend\\", \\"api\\", \\"database\\"}\\nactive_tags.add(\\"backend\\")  # Duplicate ignored!\\n\\nprint(\\"Languages:\\", languages)\\nprint(\\"Config:\\", server_config)\\nprint(\\"Unique Tags:\\", active_tags)\\n`;
py = py.replace(old308, new308);

// 2. Line 309 dictionary diagram
py = py.replace('{\\"hash\\": 1284, \\"key\\": \\"health\\", \\"value\\": 100}', '{\\"hash\\": 1284, \\"key\\": \\"port\\", \\"value\\": 8080}');
py = py.replace('{\\"hash\\": 9831, \\"key\\": \\"mana\\",   \\"value\\": 75}', '{\\"hash\\": 9831, \\"key\\": \\"timeout\\", \\"value\\": 45}');

// 3. Line 320 starter code
const old320 = `# Sets: Unordered collections of unique, hashable elements\\nparty_a = {\\"Astra\\", \\"Vex\\", \\"Kaelen\\"}\\nparty_b = {\\"Vex\\", \\"Rowan\\", \\"Lyra\\"}\\n\\n# Set Mathematical Operations\\nprint(\\"Union (All members):\\", party_a | party_b)\\nprint(\\"Intersection (Common):\\", party_a & party_b)\\nprint(\\"Difference (Only in A):\\", party_a - party_b)\\nprint(\\"Symmetric Difference:\\", party_a ^ party_b)\\n\\n# Fast Membership Testing: O(1) average time!\\nprint(\\"Is Astra in Party A?\\", \\"Astra\\" in party_a)\\n`;
const new320 = `# Sets: Unordered collections of unique, hashable elements\\nteam_a = {\\"Alice\\", \\"Bob\\", \\"Charlie\\"}\\nteam_b = {\\"Bob\\", \\"Diana\\", \\"Evan\\"}\\n\\n# Set Mathematical Operations\\nprint(\\"Union (All members):\\", team_a | team_b)\\nprint(\\"Intersection (Common):\\", team_a & team_b)\\nprint(\\"Difference (Only in A):\\", team_a - team_b)\\nprint(\\"Symmetric Difference:\\", team_a ^ team_b)\\n\\n# Fast Membership Testing: O(1) average time!\\nprint(\\"Is Alice in Team A?\\", \\"Alice\\" in team_a)\\n`;
py = py.replace(old320, new320);

// 4. Line 326 starter code
const old326 = `# Dictionary Comprehension: {key_expr: value_expr for item in iterable if condition}\\nheroes = [\\"Astra\\", \\"Vex\\", \\"Kaelen\\", \\"Lyra\\"]\\nlevels = [14, 28, 9, 35]\\n\\n# Pairing with zip()\\nhero_roster = {hero: lvl for hero, lvl in zip(heroes, levels)}\\nprint(\\"Roster:\\", hero_roster)\\n\\n# Filtering high-level champions\\nveterans = {hero: lvl for hero, lvl in hero_roster.items() if lvl >= 20}\\nprint(\\"Veterans (>=20):\\", veterans)\\n`;
const new326 = `# Dictionary Comprehension: {key_expr: value_expr for item in iterable if condition}\\nengineers = [\\"Alice\\", \\"Bob\\", \\"Charlie\\", \\"Diana\\"]\\nyears_exp = [2, 5, 1, 8]\\n\\n# Pairing with zip()\\nroster = {name: exp for name, exp in zip(engineers, years_exp)}\\nprint(\\"Roster:\\", roster)\\n\\n# Filtering senior engineers\\nseniors = {name: exp for name, exp in roster.items() if exp >= 5}\\nprint(\\"Seniors (>=5 yrs):\\", seniors)\\n`;
py = py.replace(old326, new326);

// 5. Line 379 starter code
const old379 = `class Character:\\n    def __init__(self, name, balance):\\n        self.name = name\\n        self.balance = balance\\n\\n    def attack(self):\\n        return f\\"{self.name} attacks with basic strike!\\"\\n\\nclass PremiumAccount(Account):\\n    def __init__(self, name, balance, mana):\\n        super().__init__(name, balance) # Invoke parent constructor!\\n        self.mana = mana\\n\\n    def attack(self):\\n        # Override parent method\\n        return f\\"{self.name} casts Arcane Missile costing 10 mana!\\"\\n\\nengineer = Mage(\\"Kaelen\\", 80, 150)\\nprint(engineer.attack())\\nprint(f\\"HP: {engineer.balance}, Mana: {engineer.mana}\\")\\n`;
const new379 = `class Account:\\n    def __init__(self, owner, balance):\\n        self.owner = owner\\n        self.balance = balance\\n\\n    def summary(self):\\n        return f\\"{self.owner} has standard balance: ${self.balance}\\"\\n\\nclass PremiumAccount(Account):\\n    def __init__(self, owner, balance, bonus):\\n        super().__init__(owner, balance)  # Invoke parent constructor!\\n        self.bonus = bonus\\n\\n    def summary(self):\\n        # Override parent method\\n        return f\\"{self.owner} has premium balance: ${self.balance} (+${self.bonus} bonus)\\"\\n\\nacc = PremiumAccount(\\"Alex\\", 5000, 150)\\nprint(acc.summary())\\nprint(f\\"Balance: ${acc.balance}, Bonus: ${acc.bonus}\\")\\n`;
py = py.replace(old379, new379);

// 6. Line 391 starter code
py = py.replace('InventoryBag(owner', 'ShoppingCart(owner');
py = py.replace('isinstance(other, InventoryBag)', 'isinstance(other, ShoppingCart)');
py = py.replace('bag1 = InventoryBag(\\"Astra\\", [\\"Item\\", \\"Scroll\\"])', 'cart1 = ShoppingCart(\\"Alice\\", [\\"Monitor\\", \\"Keyboard\\"])');
py = py.replace('bag2 = InventoryBag(\\"Clone\\", [\\"Item\\", \\"Scroll\\"])', 'cart2 = ShoppingCart(\\"Bob\\", [\\"Monitor\\", \\"Keyboard\\"])');
py = py.replace('print(\\"Bag representation:\\", repr(bag1))', 'print(\\"Cart representation:\\", repr(cart1))');
py = py.replace('print(\\"Bag length:\\", len(bag1))', 'print(\\"Cart length:\\", len(cart1))');
py = py.replace('print(\\"Are bags equal?\\", bag1 == bag2)', 'print(\\"Are carts equal?\\", cart1 == cart2)');

// 7. Line 437 starter code
const old437 = `# Advanced OOP: Inheritance, Polymorphism & super()\\n\\nclass Character:\\n    def __init__(self, name, health):\\n        self.name = name\\n        self.health = health\\n\\n    def attack(self):\\n        return f\\"{self.name} strikes with basic attack!\\"\\n\\nclass Mage(Character):\\n    def __init__(self, name, health, mana):\\n        super().__init__(name, health)  # Delegate to parent constructor\\n        self.mana = mana\\n\\n    def attack(self):\\n        return f\\"{self.name} casts Arcane Blast using {self.mana} mana!\\"\\n\\nm = Mage(\\"Merlin\\", 80, 100)\\nprint(m.attack())\\nprint(\\"Method Resolution Order (MRO):\\", [cls.__name__ for cls in Mage.__mro__])\\n`;
const new437 = `# Advanced OOP: Inheritance, Polymorphism & super()\\n\\nclass PaymentProcessor:\\n    def __init__(self, merchant, fee_rate):\\n        self.merchant = merchant\\n        self.fee_rate = fee_rate\\n\\n    def process(self, amount):\\n        fee = amount * self.fee_rate\\n        return f\\"{self.merchant}: Processed ${amount} (Fee: ${fee:.2f})\\"\\n\\nclass CryptoPaymentProcessor(PaymentProcessor):\\n    def __init__(self, merchant, fee_rate, network):\\n        super().__init__(merchant, fee_rate)  # Delegate to parent constructor\\n        self.network = network\\n\\n    def process(self, amount):\\n        return f\\"{self.merchant}: Processed ${amount} via {self.network} network!\\"\\n\\nprocessor = CryptoPaymentProcessor(\\"TechStore\\", 0.015, \\"Layer2\\")\\nprint(processor.process(250.0))\\nprint(\\"Method Resolution Order (MRO):\\", [cls.__name__ for cls in CryptoPaymentProcessor.__mro__])\\n`;
py = py.replace(old437, new437);

// 8. Line 438 diagram
py = py.replace('BaseEntity (Root)', 'PaymentProcessor (Root)');
py = py.replace('take_damage()', 'process()');
py = py.replace('Engineer (Child)', 'StripeProcessor');
py = py.replace('Mage (Child)', 'CryptoProcessor');
py = py.replace('Resolution Order: Engineer -> BaseEntity -> object', 'Resolution Order: CryptoProcessor -> PaymentProcessor -> object');
py = py.replace('Inspection: Engineer.mro() or Engineer.__mro__', 'Inspection: CryptoProcessor.mro()');

fs.writeFileSync(pyPath, py, 'utf8');
console.log('Finished updating pythonTrack.js!');
