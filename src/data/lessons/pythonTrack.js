// ─── Python & Backend Engineering Track ──────────────────────────────────

export const pythonTrackContent = {
  'py-week-1': {
    lessons: [
      {
        title: 'Python Core & Dynamic Typing',
        language: 'python',
        starterCode: `# Python 3 Foundations: Variables & Clean Syntax\nname = "Cyber Knight"\nlevel = 1\nxp = 150.5\nis_active = True\n\n# Formatted f-strings\nprint(f"Player: {name} | Level: {level} | XP: {xp}")\n\n# Dynamic type inspection\nprint("Types:", type(name), type(level), type(is_active))\n`,
        content: `
<h2>Python 3: The Language of Simplicity and Power 🐍</h2>
<p>Python is a high-level, dynamically-typed interpreted language designed for readability and developer velocity. Unlike Java or C++, you do not need boilerplate class definitions or static type declarations to get started.</p>

<h3>Core Data Types in Python</h3>
<ul>
  <li><code>int</code>, <code>float</code>: Arbitrary-precision integers and double-precision floats.</li>
  <li><code>str</code>: Unicode text sequences with powerful f-string interpolation.</li>
  <li><code>bool</code>: <code>True</code> and <code>False</code> (subclasses of integer).</li>
  <li><code>None</code>: The singleton representing absence of a value (equivalent to <code>null</code>).</li>
</ul>
        `,
      },
      {
        title: 'Lists, Tuples, Dictionaries & Sets',
        language: 'python',
        starterCode: `# Python Built-in Data Structures\n\n# 1. Lists (Ordered, mutable)\ninventory = ["Sword", "Potion", "Shield"]\ninventory.append("Phoenix Feather")\n\n# 2. Dictionaries (Hash maps, O(1) key lookups)\nstats = {\n    "health": 100,\n    "mana": 50,\n    "defense": 25\n}\nstats["mana"] += 20\n\n# 3. List Comprehensions (Pythonic elegance)\npower_levels = [x * 10 for x in range(1, 6)]\n\nprint("Inventory:", inventory)\nprint("Player Stats:", stats)\nprint("Power Levels:", power_levels)\n`,
        content: `
<h2>Pythonic Collections & Comprehensions 🎒</h2>
<p>Python comes with four rich built-in data structures that form the backbone of all backend development:</p>
<ol>
  <li><strong>Lists (<code>[]</code>):</strong> Dynamic resizable arrays with O(1) amortized appends.</li>
  <li><strong>Dictionaries (<code>{}</code>):</strong> High-performance hash maps with O(1) average key lookup and insertion.</li>
  <li><strong>Tuples (<code>()</code>):</strong> Immutable sequences, often used as dictionary keys or for multiple return values.</li>
  <li><strong>Sets (<code>set()</code>):</strong> Hash-based collections containing only unique elements with O(1) membership testing (<code>in</code>).</li>
</ol>
        `,
      },
    ],
    exercises: [
      {
        title: 'Calculate Character Power Rating',
        language: 'python',
        description: `
<p>Write a function <code>calculate_power(stats)</code> that accepts a dictionary with keys <code>"attack"</code>, <code>"defense"</code>, and <code>"speed"</code>.</p>
<p>Return the total weighted power score calculated as: <code>(attack * 1.5) + defense + (speed * 0.5)</code>.</p>
        `,
        starterCode: `def calculate_power(stats):\n    # Calculate weighted power: (attack * 1.5) + defense + (speed * 0.5)\n    attack = stats.get("attack", 0)\n    defense = stats.get("defense", 0)\n    speed = stats.get("speed", 0)\n    return (attack * 1.5) + defense + (speed * 0.5)\n\n# Test run\nplayer = {"attack": 40, "defense": 30, "speed": 20}\nprint("Total Power:", calculate_power(player))\n`,
        expectedOutput: `Total Power: 100.0`,
        hints: [`Use dictionary.get(key, default) or bracket access stats['attack'].`],
      },
    ],
    quiz: [
      {
        question: 'Which of the following Python data structures is IMMUTABLE?',
        options: ['list', 'dict', 'tuple', 'set'],
        correctIndex: 2,
        explanation: 'Tuples are immutable sequences in Python; once created, their elements cannot be modified, added, or removed.',
      },
    ],
  },

  'py-week-2': {
    lessons: [
      {
        title: 'Pythonic OOP & Magic (Dunder) Methods',
        language: 'python',
        starterCode: `class Hero:\n    def __init__(self, name: str, health: int):\n        self.name = name\n        self.health = health\n\n    # String representation\n    def __str__(self):\n        return f"⚔️ Hero({self.name}, HP: {self.health})"\n\n    # Operator overloading: hero1 + hero2\n    def __add__(self, other):\n        return Hero(f"{self.name}&{other.name}", self.health + other.health)\n\nh1 = Hero("Nova", 100)\nh2 = Hero("Astra", 120)\nh3 = h1 + h2\n\nprint(h1)\nprint(h2)\nprint("Combined Force:", h3)\n`,
        content: `
<h2>Object-Oriented Python & Dunder Methods 🧙‍♂️</h2>
<p>Python classes leverage <strong>double-underscore ("dunder") methods</strong> to hook into Python's native operator protocols:</p>
<ul>
  <li><code>__init__</code>: Class constructor/initializer.</li>
  <li><code>__str__</code>: Human-readable string representation (used by <code>print()</code>).</li>
  <li><code>__repr__</code>: Unambiguous representation used for debugging.</li>
  <li><code>__len__</code>, <code>__getitem__</code>: Enables <code>len(obj)</code> and indexing <code>obj[key]</code>.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Build a Quest Queue with Methods',
        language: 'python',
        description: `<p>Create a class <code>QuestLog</code> that maintains an internal list of quests with methods <code>add_quest(title)</code> and <code>get_active_count()</code>.</p>`,
        starterCode: `class QuestLog:\n    def __init__(self):\n        self.quests = []\n\n    def add_quest(self, title):\n        self.quests.append(title)\n\n    def get_active_count(self):\n        return len(self.quests)\n\nlog = QuestLog()\nlog.add_quest("Defeat Dragon")\nlog.add_quest("Rescue Princess")\nprint("Active Quests:", log.get_active_count())\n`,
        expectedOutput: `Active Quests: 2`,
        hints: [`Maintain a self.quests list in __init__.`],
      },
    ],
    quiz: [
      {
        question: 'What is the purpose of the self parameter in Python class methods?',
        options: [
          'It is a global keyword required by the interpreter',
          'It represents the instance of the class on which the method is called',
          'It refers to the parent superclass',
          'It makes the method static',
        ],
        correctIndex: 1,
        explanation: 'self refers to the specific instance of the class that invoked the method.',
      },
    ],
  },
};
