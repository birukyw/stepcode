const fs = require('fs');
const path = require('path');

const pyPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'pythonTrack.js');
let lines = fs.readFileSync(pyPath, 'utf8').split('\n');

// Line 308 (index 307)
lines[307] = '        "starterCode": "# Python Built-in Collections\\n\\n# 1. Lists (Ordered, mutable array of pointer references)\\nlanguages = [\\"Python\\", \\"TypeScript\\", \\"SQL\\"]\\nlanguages.append(\\"Go\\")\\n\\n# 2. Dictionaries (High-speed hash tables with O(1) average lookup)\\nserver_config = {\\"port\\": 8080, \\"timeout\\": 30, \\"workers\\": 4}\\nserver_config[\\"timeout\\"] += 15\\n\\n# 3. Sets (Unique elements powered by hash tables)\\nactive_tags = {\\"backend\\", \\"api\\", \\"database\\"}\\nactive_tags.add(\\"backend\\")  # Duplicate ignored!\\n\\nprint(\\"Languages:\\", languages)\\nprint(\\"Config:\\", server_config)\\nprint(\\"Unique Tags:\\", active_tags)\\n",';

// Line 309 (index 308) - compact dictionary diagram
lines[308] = lines[308]
  .replace('{\\"hash\\": 1284, \\"key\\": \\"health\\", \\"value\\": 100}', '{\\"hash\\": 1284, \\"key\\": \\"port\\", \\"value\\": 8080}')
  .replace('{\\"hash\\": 9831, \\"key\\": \\"mana\\",   \\"value\\": 75}', '{\\"hash\\": 9831, \\"key\\": \\"timeout\\", \\"value\\": 45}');

// Line 320 (index 319)
lines[319] = '        "starterCode": "# Sets: Unordered collections of unique, hashable elements\\nteam_a = {\\"Alice\\", \\"Bob\\", \\"Charlie\\"}\\nteam_b = {\\"Bob\\", \\"Diana\\", \\"Evan\\"}\\n\\n# Set Mathematical Operations\\nprint(\\"Union (All members):\\", team_a | team_b)\\nprint(\\"Intersection (Common):\\", team_a & team_b)\\nprint(\\"Difference (Only in A):\\", team_a - team_b)\\nprint(\\"Symmetric Difference:\\", team_a ^ team_b)\\n\\n# Fast Membership Testing: O(1) average time!\\nprint(\\"Is Alice in Team A?\\", \\"Alice\\" in team_a)\\n",';

// Line 326 (index 325)
lines[325] = '        "starterCode": "# Dictionary Comprehension: {key_expr: value_expr for item in iterable if condition}\\nengineers = [\\"Alice\\", \\"Bob\\", \\"Charlie\\", \\"Diana\\"]\\nyears_exp = [2, 5, 1, 8]\\n\\n# Pairing with zip()\\nroster = {name: exp for name, exp in zip(engineers, years_exp)}\\nprint(\\"Roster:\\", roster)\\n\\n# Filtering senior engineers\\nseniors = {name: exp for name, exp in roster.items() if exp >= 5}\\nprint(\\"Seniors (>=5 yrs):\\", seniors)\\n",';

// Line 379 (index 378)
lines[378] = '        "starterCode": "class Account:\\n    def __init__(self, owner, balance):\\n        self.owner = owner\\n        self.balance = balance\\n\\n    def summary(self):\\n        return f\\"{self.owner} has standard balance: ${self.balance}\\"\\n\\nclass PremiumAccount(Account):\\n    def __init__(self, owner, balance, bonus):\\n        super().__init__(owner, balance)  # Invoke parent constructor!\\n        self.bonus = bonus\\n\\n    def summary(self):\\n        # Override parent method\\n        return f\\"{self.owner} has premium balance: ${self.balance} (+${self.bonus} bonus)\\"\\n\\nacc = PremiumAccount(\\"Alex\\", 5000, 150)\\nprint(acc.summary())\\nprint(f\\"Balance: ${acc.balance}, Bonus: ${acc.bonus}\\")\\n",';

// Line 392 (index 391) - Dunder implementation in content
lines[391] = lines[391]
  .replace('class Spell:', 'class Product:')
  .replace('class Spell:\\n', 'class Product:\\n')
  .replace('Spell(name=', 'Product(name=')
  .replace('isinstance(other, Spell)', 'isinstance(other, Product)')
  .replaceAll('Spell', 'Product')
  .replaceAll('spell', 'product');

// Line 437 (index 436)
lines[436] = '        "starterCode": "# Advanced OOP: Inheritance, Polymorphism & super()\\n\\nclass PaymentProcessor:\\n    def __init__(self, merchant, fee_rate):\\n        self.merchant = merchant\\n        self.fee_rate = fee_rate\\n\\n    def process(self, amount):\\n        fee = amount * self.fee_rate\\n        return f\\"{self.merchant}: Processed ${amount} (Fee: ${fee:.2f})\\"\\n\\nclass CryptoPaymentProcessor(PaymentProcessor):\\n    def __init__(self, merchant, fee_rate, network):\\n        super().__init__(merchant, fee_rate)  # Delegate to parent constructor\\n        self.network = network\\n\\n    def process(self, amount):\\n        return f\\"{self.merchant}: Processed ${amount} via {self.network} network!\\"\\n\\nprocessor = CryptoPaymentProcessor(\\"TechStore\\", 0.015, \\"Layer2\\")\\nprint(processor.process(250.0))\\nprint(\\"Method Resolution Order (MRO):\\", [cls.__name__ for cls in CryptoPaymentProcessor.__mro__])\\n",';

fs.writeFileSync(pyPath, lines.join('\n'), 'utf8');
console.log('Successfully updated pythonTrack lines by index!');
