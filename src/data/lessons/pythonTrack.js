// ─── Introduction to Python: Comprehensive 2-Level Curriculum ─────────────
// Level 1: Beginner Level (Modules 1-6)
// Level 2: Intermediate Elective Modules (OOP, File I/O, REST APIs, Data Science, FastAPI)

export const pythonTrackContent = {
  // ════════════════════════════════════════════════════════════════
  // LEVEL 1: BEGINNER FOUNDATIONS
  // ════════════════════════════════════════════════════════════════

  // Module 1: Hello World, Syntax & Primitive Data Types
  'py-week-1': {
    lessons: [
      {
        title: 'Zen of Python & The First Script',
        language: 'python',
        starterCode: `# Welcome to Introduction to Python! 🐍
# The print() function displays text or values in your terminal.

print("Hello, World!")
print("Welcome to CodeQuest: Introduction to Python!")

# Python executes line by line from top to bottom.
# Comments start with a hash (#) and are ignored by Python.
`,
        content: `
<h2>Welcome to Python: The Language of Clarity & Power 🐍</h2>
<p>Python was created by <strong>Guido van Rossum</strong> with a single guiding principle: <em>code is read much more often than it is written</em>. Python's clean syntax feels like readable English pseudo-code, making it the top choice for software engineering, web backend services, artificial intelligence, and data science.</p>

<h3>The Zen of Python</h3>
<p>Python embodies clear design tenets:</p>
<ul>
  <li><strong>Beautiful is better than ugly.</strong></li>
  <li><strong>Explicit is better than implicit.</strong></li>
  <li><strong>Simple is better than complex.</strong></li>
  <li><strong>Readability counts.</strong></li>
</ul>

<h3>Printing Output</h3>
<p>In Python, you do not need classes or main method boilerplate to print output. You simply call the built-in <code>print()</code> function:</p>
<pre><code>print("Hello, World!")
print("Learning Python at CodeQuest")</code></pre>
        `,
      },
      {
        title: 'Numbers & Mathematical Arithmetic',
        language: 'python',
        starterCode: `# Python Math & Numbers

# 1. Integers (whole numbers)
gold = 150
enemies_defeated = 12

# 2. Floats (decimal numbers)
health = 98.5
crit_multiplier = 1.75

# 3. Arithmetic Operations
total_damage = 25 * crit_multiplier
xp_per_enemy = 125 // 3    # Floor division (drops remainder)
remaining_xp = 125 % 3     # Modulo (remainder)
power_level = 2 ** 8       # Exponentiation (2 to the power of 8)

print("Total Damage:", total_damage)
print("XP per Enemy (Floor):", xp_per_enemy)
print("Remainder XP:", remaining_xp)
print("Power Level (2^8):", power_level)
`,
        content: `
<h2>Numbers in Python: Integers and Floats 🔢</h2>
<p>Python features two primary numeric types:</p>
<ol>
  <li><strong><code>int</code>:</strong> Whole numbers of arbitrary precision (e.g. <code>42</code>, <code>-10</code>, <code>1000000000000</code>). Unlike Java or C, Python integers never overflow.</li>
  <li><strong><code>float</code>:</strong> Double-precision floating-point numbers with decimal points (e.g. <code>3.14159</code>, <code>-0.05</code>).</li>
</ol>

<h3>Arithmetic Operators</h3>
<table class="lesson-table">
  <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 5 = 15</code></td></tr>
    <tr><td><code>-</code></td><td>Subtraction</td><td><code>20 - 8 = 12</code></td></tr>
    <tr><td><code>*</code></td><td>Multiplication</td><td><code>4 * 7 = 28</code></td></tr>
    <tr><td><code>/</code></td><td>Float Division</td><td><code>7 / 2 = 3.5</code></td></tr>
    <tr><td><code>//</code></td><td>Floor Division (truncates decimal)</td><td><code>7 // 2 = 3</code></td></tr>
    <tr><td><code>%</code></td><td>Modulo (Remainder)</td><td><code>7 % 2 = 1</code></td></tr>
    <tr><td><code>**</code></td><td>Exponentiation (Power)</td><td><code>3 ** 3 = 27</code></td></tr>
  </tbody>
</table>
        `,
      },
      {
        title: 'Strings, Slicing & Formatted F-Strings',
        language: 'python',
        starterCode: `# Python Strings and Formatting

hero_name = "Kaelen Shadowblade"
realm = "Eldoria"
level = 14

# String Slicing: [start:stop:step]
first_name = hero_name[:6]
last_name = hero_name[7:]

# String Methods
shout = hero_name.upper()
clean = "   extra whitespace   ".strip()

# Formatted F-Strings (Python 3.6+)
status_card = f"⚔️ Hero: {hero_name} | Realm: {realm} | Level: {level}"

print("First Name:", first_name)
print("Last Name:", last_name)
print("Shout:", shout)
print("Cleaned:", clean)
print(status_card)
`,
        content: `
<h2>Strings & Modern String Formatting 📜</h2>
<p>Strings in Python (<code>str</code>) are immutable sequences of Unicode characters enclosed in single quotes (<code>'text'</code>) or double quotes (<code>"text"</code>).</p>

<h3>String Slicing (<code>[start:stop:step]</code>)</h3>
<p>You can extract sub-strings using index slices (0-indexed):</p>
<pre><code>word = "Python"
word[0]      # 'P'
word[0:2]    # 'Py' (from index 0 up to, but not including, index 2)
word[:4]     # 'Pyth' (from start up to index 4)
word[2:]     # 'thon' (from index 2 to end)
word[::-1]   # 'nohtyP' (reversed string!)</code></pre>

<h3>F-Strings: The Gold Standard for Formatting</h3>
<p>Prefixing a string with <code>f</code> allows you to interpolate Python expressions directly inside curly braces <code>{expression}</code>:</p>
<pre><code>name = "Astra"
hp = 100
print(f"Hero {name} has {hp} HP. In 10 turns: {hp + 50} HP.")</code></pre>
        `,
      },
      {
        title: 'Booleans, Type Inspection & Casting',
        language: 'python',
        starterCode: `# Booleans & Type Casting

is_warrior = True
has_magic = False

# type() inspection
print("Type of is_warrior:", type(is_warrior))
print("Type of 42:", type(42))
print("Type of 'Hello':", type("Hello"))

# Type Casting (Converting types)
raw_input_age = "25"         # str
age = int(raw_input_age)     # converted to int
pi_str = str(3.14)           # converted to str
is_online = bool(1)          # converted to bool (True)

print("Age next year:", age + 1)
print("Is Online:", is_online)
`,
        content: `
<h2>Booleans & Type Casting ⚖️</h2>
<p>A boolean (<code>bool</code>) represents truth values: <code>True</code> and <code>False</code> (note the capital T and F).</p>

<h3>Type Inspection & Type Casting</h3>
<p>Python is dynamically typed, meaning variables can change types. You can inspect an object's type with <code>type(obj)</code>.</p>
<p>To convert from one type to another, call the type constructor:</p>
<ul>
  <li><code>int("100")</code> converts the string <code>"100"</code> to integer <code>100</code>.</li>
  <li><code>float(5)</code> converts integer <code>5</code> to float <code>5.0</code>.</li>
  <li><code>str(42)</code> converts integer <code>42</code> to string <code>"42"</code>.</li>
  <li><code>bool(0)</code> converts to <code>False</code>, while <code>bool(1)</code> converts to <code>True</code>.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Player Welcome Greeting Generator',
        language: 'python',
        description: `
<p>Write a function <code>format_player_card(username, level, class_name)</code> that returns an f-string formatted exactly as:</p>
<pre><code>Player [USERNAME] | Level [LEVEL] [CLASS_NAME]</code></pre>
<p>For example: <code>format_player_card("CyberKnight", 10, "Mage")</code> must return <code>"Player CyberKnight | Level 10 Mage"</code>.</p>
        `,
        starterCode: `def format_player_card(username, level, class_name):\n    # Return formatted f-string: "Player {username} | Level {level} {class_name}"\n    return f"Player {username} | Level {level} {class_name}"\n\n# Test run\nprint(format_player_card("CyberKnight", 10, "Mage"))\n`,
        expectedOutput: `Player CyberKnight | Level 10 Mage`,
        hints: [`Use f"Player {username} | Level {level} {class_name}"`],
      },
      {
        title: 'Calculate Bill with Tip & Tax',
        language: 'python',
        description: `
<p>Write a function <code>calculate_total(bill_amount, tip_percent, tax_percent)</code> that calculates the grand total:</p>
<p>Formula: <code>bill_amount + (bill_amount * (tip_percent / 100)) + (bill_amount * (tax_percent / 100))</code>.</p>
<p>Round the result to 2 decimal places using <code>round(total, 2)</code>.</p>
        `,
        starterCode: `def calculate_total(bill_amount, tip_percent, tax_percent):\n    tip = bill_amount * (tip_percent / 100)\n    tax = bill_amount * (tax_percent / 100)\n    total = bill_amount + tip + tax\n    return round(total, 2)\n\nprint("Total Bill:", calculate_total(100.0, 15.0, 8.0))\n`,
        expectedOutput: `Total Bill: 123.0`,
        hints: [`Compute tip and tax separately, sum with bill_amount, and round to 2 decimal places.`],
      },
    ],
    quiz: [
      {
        question: 'Which of the following is an invalid Python variable name?',
        options: ['user_score', '_private_val', '2nd_player', 'player2'],
        correctIndex: 2,
        explanation: 'Variable names in Python cannot start with a numerical digit.',
      },
      {
        question: 'What is the output of 17 // 4 in Python?',
        options: ['4.25', '4', '1', '5'],
        correctIndex: 1,
        explanation: '// is floor division, which drops the fractional part and returns 4.',
      },
      {
        question: 'Which syntax creates a formatted string interpolating variable score in Python 3.6+?',
        options: ['f"Your score is {score}"', '"Your score is %s" % score', 'str("Your score is " + score)', '`Your score is ${score}`'],
        correctIndex: 0,
        explanation: 'f"..." (f-strings) provide the standard modern formatting in Python.',
      },
    ],
  },

  // Module 2: Control Flow & Decision Making
  'py-week-2': {
    lessons: [
      {
        title: 'Comparison & Logical Operators',
        language: 'python',
        starterCode: `# Comparison & Logical Operators

player_level = 25
has_boss_key = True
is_poisoned = False

# Comparison Operators: ==, !=, <, >, <=, >=
can_challenge_dungeon = player_level >= 20

# Logical Operators: and, or, not
can_enter_boss_room = player_level >= 20 and has_boss_key
needs_cure = is_poisoned or player_level < 5
is_healthy = not is_poisoned

print("Can challenge dungeon:", can_challenge_dungeon)
print("Can enter boss room:", can_enter_boss_room)
print("Needs cure potion:", needs_cure)
print("Is healthy:", is_healthy)
`,
        content: `
<h2>Comparison & Logical Operators 🔀</h2>
<p>Decision making allows your programs to execute different code depending on runtime conditions.</p>

<h3>Comparison Operators</h3>
<ul>
  <li><code>==</code> (equal to), <code>!=</code> (not equal to)</li>
  <li><code>&lt;</code> (less than), <code>&gt;</code> (greater than)</li>
  <li><code>&lt;=</code> (less than or equal), <code>&gt;=</code> (greater than or equal)</li>
</ul>

<h3>Logical Operators</h3>
<p>Python uses plain English words rather than symbols (unlike Java's <code>&&</code>, <code>||</code>, <code>!</code>):</p>
<ul>
  <li><code>and</code>: Returns <code>True</code> only if both operands are true.</li>
  <li><code>or</code>: Returns <code>True</code> if at least one operand is true.</li>
  <li><code>not</code>: Inverts the boolean value.</li>
</ul>
        `,
      },
      {
        title: 'Conditional Statements: if, elif, and else',
        language: 'python',
        starterCode: `# Conditional Branching in Python

score = 85

if score >= 90:
    grade = "A+ (Master)"
elif score >= 80:
    grade = "B (Proficient)"
elif score >= 70:
    grade = "C (Apprentice)"
else:
    grade = "F (Novice - Needs Practice)"

print(f"Final Grade: {grade}")
`,
        content: `
<h2>Branching: if, elif, and else 🌿</h2>
<p>Python uses <strong>indentation (4 spaces)</strong> to define code blocks, eliminating curly braces <code>{}</code>.</p>

<h3>Syntax Structure:</h3>
<pre><code>if condition1:
    # Runs when condition1 is True
elif condition2:
    # Runs when condition1 is False and condition2 is True
else:
    # Runs when all preceding conditions are False</code></pre>

<div class="callout callout--info">
  <strong>Indentation Rule:</strong> In Python, whitespace is syntax! Always indent blocks with consistent 4 spaces.
</div>
        `,
      },
      {
        title: 'Truthy & Falsy Values',
        language: 'python',
        starterCode: `# Truthy and Falsy evaluation

# Falsy values in Python:
# 0, 0.0, "", [], {}, set(), None, False

inventory = []
username = "ByteKnight"
unread_messages = 0

if not inventory:
    print("Your inventory is currently empty!")

if username:
    print(f"Logged in as {username}")

if unread_messages:
    print(f"You have {unread_messages} new messages.")
else:
    print("Inbox is all caught up!")
`,
        content: `
<h2>Truthy & Falsy Values 💡</h2>
<p>In Python, every object has an inherent boolean truth value when evaluated in an <code>if</code> statement:</p>

<h3>Falsy Values:</h3>
<ul>
  <li><code>False</code></li>
  <li><code>None</code></li>
  <li>Zero of any numeric type: <code>0</code>, <code>0.0</code></li>
  <li>Empty sequences and collections: <code>""</code> (empty string), <code>[]</code> (empty list), <code>{}</code> (empty dict), <code>set()</code></li>
</ul>
<p><strong>Everything else is Truthy!</strong> Any non-empty string, non-zero number, or populated list evaluates to <code>True</code>.</p>
        `,
      },
    ],
    exercises: [
      {
        title: 'Movie Ticket Tier Classifier',
        language: 'python',
        description: `
<p>Write a function <code>ticket_price(age)</code> that returns the ticket price based on age:</p>
<ul>
  <li>Age under 12: <code>8</code></li>
  <li>Age 12 to 64: <code>15</code></li>
  <li>Age 65 and older: <code>10</code></li>
</ul>
        `,
        starterCode: `def ticket_price(age):\n    if age < 12:\n        return 8\n    elif age <= 64:\n        return 15\n    else:\n        return 10\n\nprint("Age 8:", ticket_price(8))\nprint("Age 25:", ticket_price(25))\nprint("Age 70:", ticket_price(70))\n`,
        expectedOutput: `Age 8: 8\nAge 25: 15\nAge 70: 10`,
        hints: [`Use if age < 12, elif age <= 64, else.`],
      },
      {
        title: 'Leap Year Validator',
        language: 'python',
        description: `
<p>Write a function <code>is_leap_year(year)</code> that returns <code>True</code> if the year is a leap year, otherwise <code>False</code>.</p>
<p>Rules: A year is a leap year if it is divisible by 4, EXCEPT century years (divisible by 100) which must also be divisible by 400.</p>
        `,
        starterCode: `def is_leap_year(year):\n    if (year % 400 == 0):\n        return True\n    if (year % 100 == 0):\n        return False\n    return year % 4 == 0\n\nprint("2000:", is_leap_year(2000))\nprint("1900:", is_leap_year(1900))\nprint("2024:", is_leap_year(2024))\n`,
        expectedOutput: `2000: True\n1900: False\n2024: True`,
        hints: [`Check year % 400 == 0 first, then year % 100 == 0, then year % 4 == 0.`],
      },
    ],
    quiz: [
      {
        question: 'Which of the following values evaluates to False in a Python if condition?',
        options: ['"False"', '[-1]', '0', '1'],
        correctIndex: 2,
        explanation: '0 is a numeric zero and evaluates to Falsy. Non-empty strings like "False" are Truthy.',
      },
      {
        question: 'What keyword represents "else if" in Python?',
        options: ['elseif', 'elsif', 'elif', 'else if'],
        correctIndex: 2,
        explanation: 'Python uses elif for conditional chaining.',
      },
    ],
  },

  // Module 3: Loops & Iteration
  'py-week-3': {
    lessons: [
      {
        title: 'The while Loop & Infinite Loop Guards',
        language: 'python',
        starterCode: `# The while loop executes as long as a condition evaluates to True

countdown = 5

while countdown > 0:
    print(f"Launching in {countdown}...")
    countdown -= 1  # Decrement to prevent infinite loop!

print("🚀 Blastoff!")
`,
        content: `
<h2>The while Loop 🔄</h2>
<p>A <code>while</code> loop repeatedly executes a block of code as long as its condition remains <code>True</code>.</p>
<pre><code>count = 0
while count < 3:
    print(count)
    count += 1</code></pre>
<div class="callout callout--warning">
  <strong>Infinite Loop Hazard:</strong> Always ensure the loop's body modifies variables involved in the condition so that the loop eventually terminates.
</div>
        `,
      },
      {
        title: 'The for Loop with range()',
        language: 'python',
        starterCode: `# The for loop iterates over sequences or ranges

# 1. range(stop) -> 0 to 4
print("Count to 5:")
for i in range(5):
    print(i, end=" ")
print()

# 2. range(start, stop, step) -> 10 to 30 stepping by 5
print("\nMultiples of 5:")
for val in range(10, 31, 5):
    print(val, end=" ")
print()

# 3. Iterating over a string
print("\nSpell out:")
for char in "Python":
    print(char, end="-")
print()
`,
        content: `
<h2>The for Loop & range() 🎯</h2>
<p>In Python, <code>for</code> loops iterate over iterable objects (lists, strings, tuples, dictionaries, and ranges).</p>

<h3>The range() Function:</h3>
<ul>
  <li><code>range(n)</code>: Generates numbers from <code>0</code> up to <code>n - 1</code>.</li>
  <li><code>range(start, stop)</code>: Generates numbers from <code>start</code> up to <code>stop - 1</code>.</li>
  <li><code>range(start, stop, step)</code>: Increments by <code>step</code> each iteration.</li>
</ul>
        `,
      },
      {
        title: 'Loop Control: break, continue, and pass',
        language: 'python',
        starterCode: `# Loop Control Keywords

# 1. break: Immediately exits the loop
print("Search for first multiple of 7:")
for n in range(1, 25):
    if n % 7 == 0:
        print(f"Found {n}!")
        break

# 2. continue: Skips remainder of current iteration
print("\nPrint only odd numbers under 10:")
for n in range(10):
    if n % 2 == 0:
        continue
    print(n, end=" ")
print()
`,
        content: `
<h2>Loop Control: break, continue, pass ⏹️</h2>
<ul>
  <li><strong><code>break</code>:</strong> Exits the current loop immediately.</li>
  <li><strong><code>continue</code>:</strong> Skips the rest of the current iteration and jumps to the next iteration.</li>
  <li><strong><code>pass</code>:</strong> A null statement used as a placeholder where syntax requires code but no action is needed.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Sum of Even Numbers in Range',
        language: 'python',
        description: `
<p>Write a function <code>sum_of_evens(n)</code> that returns the sum of all even integers between <code>1</code> and <code>n</code> inclusive.</p>
        `,
        starterCode: `def sum_of_evens(n):\n    total = 0\n    for num in range(1, n + 1):\n        if num % 2 == 0:\n            total += num\n    return total\n\nprint("Sum evens up to 10:", sum_of_evens(10))\nprint("Sum evens up to 20:", sum_of_evens(20))\n`,
        expectedOutput: `Sum evens up to 10: 30\nSum evens up to 20: 110`,
        hints: [`Use for num in range(2, n + 1, 2) or check num % 2 == 0.`],
      },
      {
        title: 'FizzBuzz Classic',
        language: 'python',
        description: `
<p>Write a function <code>fizz_buzz(n)</code> that returns a list of strings from <code>1</code> to <code>n</code> where:</p>
<ul>
  <li>Multiples of both 3 and 5 are <code>"FizzBuzz"</code></li>
  <li>Multiples of 3 are <code>"Fizz"</code></li>
  <li>Multiples of 5 are <code>"Buzz"</code></li>
  <li>Other numbers are converted to string <code>str(num)</code></li>
</ul>
        `,
        starterCode: `def fizz_buzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append("FizzBuzz")\n        elif i % 3 == 0:\n            result.append("Fizz")\n        elif i % 5 == 0:\n            result.append("Buzz")\n        else:\n            result.append(str(i))\n    return result\n\nprint("FizzBuzz 15:", fizz_buzz(15))\n`,
        expectedOutput: `FizzBuzz 15: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']`,
        hints: [`Check i % 15 == 0 first!`],
      },
    ],
    quiz: [
      {
        question: 'What does range(2, 8, 2) produce when converted to a list?',
        options: ['[2, 4, 6, 8]', '[2, 4, 6]', '[2, 3, 4, 5, 6, 7]', '[4, 6, 8]'],
        correctIndex: 1,
        explanation: 'range stops before the stop value 8, yielding 2, 4, and 6.',
      },
    ],
  },

  // Module 4: Functions & Variable Scope
  'py-week-4': {
    lessons: [
      {
        title: 'Defining Functions, Parameters & Return',
        language: 'python',
        starterCode: `# Functions package reusable logic

def calculate_xp(level, multiplier=1.0):
    """Calculates total required XP for a player level."""
    base_xp = level * 100
    return int(base_xp * multiplier)

xp1 = calculate_xp(5)
xp2 = calculate_xp(5, 1.5)

print("Level 5 Normal XP:", xp1)
print("Level 5 Boosted XP:", xp2)
`,
        content: `
<h2>Functions in Python 📦</h2>
<p>Functions are defined using the <code>def</code> keyword, followed by the function name, parentheses for arguments, and a colon:</p>
<pre><code>def greet(name):
    return f"Hello, {name}!"</code></pre>
<p>Functions return values using the <code>return</code> statement. If no return statement is reached, Python implicitly returns <code>None</code>.</p>
        `,
      },
      {
        title: 'Flexible Arguments: *args and **kwargs',
        language: 'python',
        starterCode: `# Arbitrary Arguments with *args and **kwargs

# *args gathers extra positional arguments into a tuple
def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

# **kwargs gathers extra keyword arguments into a dictionary
def print_profile(username, **attributes):
    print(f"User: {username}")
    for key, val in attributes.items():
        print(f"  {key}: {val}")

print("Sum:", sum_all(10, 20, 30, 40))
print_profile("Astra", role="Engineer", location="Orbit", level=42)
`,
        content: `
<h2>*args and **kwargs: True Flexibility 🤹</h2>
<ul>
  <li><code>*args</code>: Collects extra positional arguments into a <strong>tuple</strong>.</li>
  <li><code>**kwargs</code>: Collects extra keyword arguments into a <strong>dictionary</strong>.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Temperature Converter (Celsius & Fahrenheit)',
        language: 'python',
        description: `
<p>Write a function <code>convert_temp(value, to_unit="F")</code>:</p>
<ul>
  <li>If <code>to_unit == "F"</code>: Converts Celsius to Fahrenheit using formula <code>(value * 9/5) + 32</code>.</li>
  <li>If <code>to_unit == "C"</code>: Converts Fahrenheit to Celsius using formula <code>(value - 32) * 5/9</code>.</li>
</ul>
<p>Round result to 1 decimal place.</p>
        `,
        starterCode: `def convert_temp(value, to_unit="F"):\n    if to_unit.upper() == "F":\n        return round((value * 9/5) + 32, 1)\n    else:\n        return round((value - 32) * 5/9, 1)\n\nprint("0 C to F:", convert_temp(0, "F"))\nprint("100 C to F:", convert_temp(100, "F"))\nprint("212 F to C:", convert_temp(212, "C"))\n`,
        expectedOutput: `0 C to F: 32.0\n100 C to F: 212.0\n212 F to C: 100.0`,
        hints: [`Check to_unit.upper() == "F".`],
      },
    ],
    quiz: [
      {
        question: 'What is the type of *args inside a Python function?',
        options: ['list', 'dict', 'tuple', 'set'],
        correctIndex: 2,
        explanation: '*args packs arbitrary positional arguments into an immutable tuple.',
      },
    ],
  },

  // Module 5: Built-in Data Structures & Collections
  'py-week-5': {
    lessons: [
      {
        title: 'Lists, Tuples, Dictionaries & Sets',
        language: 'python',
        starterCode: `# Python Built-in Collections

# 1. Lists (Ordered, mutable)
spells = ["Fireball", "Frost Nova", "Lightning Bolt"]
spells.append("Teleport")

# 2. Dictionaries (Key-Value hash maps)
stats = {"health": 100, "mana": 50, "armor": 25}
stats["mana"] += 25

# 3. Sets (Unique elements)
equipped_items = {"Sword", "Shield", "Boots"}
equipped_items.add("Sword")  # Ignored, duplicate!

print("Spells:", spells)
print("Stats:", stats)
print("Unique Items:", equipped_items)
`,
        content: `
<h2>Python Collections 🎒</h2>
<ol>
  <li><strong>Lists (<code>[]</code>):</strong> Ordered, mutable arrays with O(1) amortized appends.</li>
  <li><strong>Tuples (<code>()</code>):</strong> Immutable sequences. Perfect for fixed records.</li>
  <li><strong>Dictionaries (<code>{}</code>):</strong> O(1) key-value hash maps.</li>
  <li><strong>Sets (<code>set()</code>):</strong> Unordered collections of unique items with O(1) membership testing.</li>
</ol>
        `,
      },
      {
        title: 'List & Dictionary Comprehensions',
        language: 'python',
        starterCode: `# Pythonic Comprehensions

# 1. List Comprehension: [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
even_squares = [x ** 2 for x in numbers if x % 2 == 0]

# 2. Dict Comprehension
players = ["Alice", "Bob", "Charlie"]
scores = {name: len(name) * 10 for name in players}

print("Even Squares:", even_squares)
print("Scores Dict:", scores)
`,
        content: `
<h2>Comprehensions: Pythonic Elegance ⚡</h2>
<p>Comprehensions allow you to transform and filter collections in a single expressive line:</p>
<pre><code># Traditional loop (4 lines)
result = []
for x in range(10):
    if x % 2 == 0:
        result.append(x * 2)

# Pythonic comprehension (1 line)
result = [x * 2 for x in range(10) if x % 2 == 0]</code></pre>
        `,
      },
    ],
    exercises: [
      {
        title: 'Word Frequency Map',
        language: 'python',
        description: `
<p>Write a function <code>word_frequency(sentence)</code> that takes a sentence, splits it into lowercase words, and returns a dictionary counting the frequency of each word.</p>
        `,
        starterCode: `def word_frequency(sentence):\n    counts = {}\n    words = sentence.lower().split()\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n\nprint(word_frequency("apple banana apple orange banana apple"))\n`,
        expectedOutput: `{'apple': 3, 'banana': 2, 'orange': 1}`,
        hints: [`Use dict.get(key, 0) + 1.`],
      },
    ],
    quiz: [
      {
        question: 'Which collection does NOT permit duplicate elements in Python?',
        options: ['list', 'tuple', 'set', 'dict values'],
        correctIndex: 2,
        explanation: 'Sets enforce uniqueness; duplicate entries are automatically discarded.',
      },
    ],
  },

  // Module 6: Classes & Object-Oriented Basics
  'py-week-6': {
    lessons: [
      {
        title: 'Classes, Objects, and the self Keyword',
        language: 'python',
        starterCode: `# Object-Oriented Programming (OOP) in Python

class Hero:
    # Class attribute (shared by all instances)
    universe = "Arcadia"

    # Constructor method
    def __init__(self, name, role, health=100):
        # Instance attributes (unique to each instance)
        self.name = name
        self.role = role
        self.health = health

    def take_damage(self, amount):
        self.health = max(0, self.health - amount)
        print(f"{self.name} took {amount} damage! HP: {self.health}")

# Creating instances
hero1 = Hero("Astra", "Warrior", 120)
hero2 = Hero("Zephyr", "Rogue", 85)

hero1.take_damage(30)
print(f"{hero1.name} belongs to universe: {hero1.universe}")
`,
        content: `
<h2>Classes & Objects: Introduction to OOP 🏰</h2>
<p>Classes are blueprints for creating objects. An object bundles state (attributes) and behavior (methods) together.</p>

<h3>The __init__ Constructor and self</h3>
<ul>
  <li><code>__init__</code>: Special initialization method called automatically when creating a new instance.</li>
  <li><code>self</code>: Reference to the current instance of the class. It must be the first parameter of any instance method.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Bank Account Class Implementation',
        language: 'python',
        description: `
<p>Create a class <code>BankAccount</code> with an <code>__init__(self, owner, balance=0)</code> method.</p>
<p>Implement methods:</p>
<ul>
  <li><code>deposit(amount)</code>: Adds amount to balance.</li>
  <li><code>withdraw(amount)</code>: Subtracts amount if balance is sufficient, otherwise prints "Insufficient funds".</li>
  <li><code>get_balance()</code>: Returns current balance.</li>
</ul>
        `,
        starterCode: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n        return self.balance\n\n    def get_balance(self):\n        return self.balance\n\nacct = BankAccount("Alice", 100)\nacct.deposit(50)\nacct.withdraw(30)\nprint("Alice Balance:", acct.get_balance())\n`,
        expectedOutput: `Alice Balance: 120`,
        hints: [`Track self.balance inside each method.`],
      },
    ],
    quiz: [
      {
        question: 'What is the role of self in a Python class method?',
        options: [
          'It is a required keyword for import statements',
          'It represents the specific instance of the class executing the method',
          'It denotes a static method',
          'It refers to the base class',
        ],
        correctIndex: 1,
        explanation: 'self refers to the instance currently invoking the method.',
      },
    ],
    project: {
      title: 'Text-Based Inventory & Hero Quest Simulator',
      language: 'python',
      description: `
<p>Implement an object-oriented Text Adventure inventory system:</p>
<ul>
  <li>Create an <code>Item(name, value, weight)</code> class.</li>
  <li>Create an <code>Inventory(max_weight)</code> class with <code>add_item</code>, <code>remove_item</code>, and <code>total_value</code>.</li>
</ul>
      `,
      starterCode: `class Item:\n    def __init__(self, name, value, weight):\n        self.name = name\n        self.value = value\n        self.weight = weight\n\nclass Inventory:\n    def __init__(self, max_weight):\n        self.max_weight = max_weight\n        self.items = []\n\n    def add_item(self, item):\n        current_weight = sum(i.weight for i in self.items)\n        if current_weight + item.weight <= self.max_weight:\n            self.items.append(item)\n            return True\n        return False\n\n    def get_total_value(self):\n        return sum(i.value for i in self.items)\n\n# Test\nbag = Inventory(20)\nbag.add_item(Item("Gold Ring", 50, 1))\nbag.add_item(Item("Iron Sword", 120, 10))\nprint("Inventory Total Value:", bag.get_total_value())\n`,
      requirements: [
        'Item class stores name, value, and weight',
        'Inventory validates max_weight limit',
        'get_total_value computes cumulative value correctly',
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // LEVEL 2: INTERMEDIATE ELECTIVE MODULES (ECOSYSTEM & APPLIED)
  // ════════════════════════════════════════════════════════════════

  // Module 7: Advanced OOP & Magic Methods
  'py-mod-oop': {
    lessons: [
      {
        title: 'Inheritance, Polymorphism & super()',
        language: 'python',
        starterCode: `# Advanced OOP: Inheritance & Polymorphism

class Character:
    def __init__(self, name, health):
        self.name = name
        self.health = health

    def attack(self):
        return f"{self.name} strikes with basic attack!"

class Mage(Character):
    def __init__(self, name, health, mana):
        super().__init__(name, health)  # Call parent constructor
        self.mana = mana

    def attack(self):
        return f"{self.name} casts Arcane Blast using {self.mana} mana!"

m = Mage("Merlin", 80, 100)
print(m.attack())
`,
        content: `
<h2>Inheritance and Polymorphism in Python 🧬</h2>
<p>Inheritance allows a child class to inherit methods and attributes from a parent class. Call <code>super().__init__(...)</code> to execute the parent constructor.</p>
<p><strong>Polymorphism</strong> allows child classes to override parent methods while sharing a unified interface.</p>
        `,
      },
      {
        title: 'Magic (Dunder) Methods & Operator Overloading',
        language: 'python',
        starterCode: `# Magic / Dunder Methods: Hooking into Python's Operator Protocols

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # String representation: print(v)
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    # Operator overloading: v1 + v2
    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    # Equality comparison: v1 == v2
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2

print("v1 + v2 =", v3)
print("Is v1 == v2?", v1 == v2)
`,
        content: `
<h2>Dunder (Double-Underscore) Magic Methods 🪄</h2>
<p>Python classes customize behavior by overriding special methods:</p>
<ul>
  <li><code>__str__</code>: Human-readable string for <code>print()</code>.</li>
  <li><code>__repr__</code>: Detailed unambiguous representation for debugging.</li>
  <li><code>__add__</code>: Implements the <code>+</code> operator.</li>
  <li><code>__len__</code>: Implements <code>len(object)</code>.</li>
  <li><code>__eq__</code>: Implements <code>==</code> equality.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Vector Magnitude and Dunder Methods',
        language: 'python',
        description: `
<p>Extend the <code>Vector2D</code> class to implement <code>__sub__(self, other)</code> which subtracts vectors: <code>Vector2D(self.x - other.x, self.y - other.y)</code>.</p>
        `,
        starterCode: `class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __sub__(self, other):\n        return Vector2D(self.x - other.x, self.y - other.y)\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nv1 = Vector2D(10, 8)\nv2 = Vector2D(4, 3)\nprint("Subtraction:", v1 - v2)\n`,
        expectedOutput: `Subtraction: (6, 5)`,
        hints: [`Implement def __sub__(self, other): return Vector2D(self.x - other.x, self.y - other.y)`],
      },
    ],
    quiz: [
      {
        question: 'Which dunder method allows an object to define its length when len() is called?',
        options: ['__size__', '__count__', '__len__', '__length__'],
        correctIndex: 2,
        explanation: '__len__ is the standard protocol hooked by len().',
      },
    ],
  },

  // Module 8: File Handling & Serialization
  'py-mod-files': {
    lessons: [
      {
        title: 'File I/O with Context Managers & JSON',
        language: 'python',
        starterCode: `# File Handling and JSON serialization

import json

# Sample configuration dictionary
config_data = {
    "app_name": "CyberQuest",
    "version": "2.4.0",
    "debug_mode": True,
    "max_connections": 100
}

# 1. Serializing dict to JSON string
json_str = json.dumps(config_data, indent=2)
print("JSON Output:")
print(json_str)

# 2. Parsing JSON string back to Python dict
parsed_data = json.loads(json_str)
print("\nParsed App Name:", parsed_data["app_name"])
`,
        content: `
<h2>File I/O and JSON in Python 📁</h2>
<p>Working with persistent data and configuration is a cornerstone of backend engineering.</p>

<h3>Context Managers (<code>with open</code>)</h3>
<pre><code>with open("log.txt", "w") as f:
    f.write("Server initialized.\\n")</code></pre>
<p>The <code>with</code> statement guarantees the file is automatically closed when execution finishes or if an error occurs.</p>

<h3>The <code>json</code> Module</h3>
<ul>
  <li><code>json.dumps(obj)</code>: Serializes a Python object into a JSON formatted string.</li>
  <li><code>json.loads(str)</code>: Parses a JSON string into Python dictionaries and lists.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Parse and Filter JSON Payload',
        language: 'python',
        description: `
<p>Write a function <code>get_active_usernames(json_payload)</code> that accepts a JSON string containing a list of user dicts (with keys <code>"username"</code> and <code>"active"</code>) and returns a list of usernames whose <code>"active"</code> flag is <code>True</code>.</p>
        `,
        starterCode: `import json\n\ndef get_active_usernames(json_payload):\n    users = json.loads(json_payload)\n    return [u["username"] for u in users if u.get("active") is True]\n\npayload = '[{"username": "alice", "active": true}, {"username": "bob", "active": false}, {"username": "carol", "active": true}]'\nprint("Active Users:", get_active_usernames(payload))\n`,
        expectedOutput: `Active Users: ['alice', 'carol']`,
        hints: [`Use json.loads(json_payload) and list comprehension.`],
      },
    ],
    quiz: [
      {
        question: 'Why is using "with open(...) as f:" preferred over manual f = open() in Python?',
        options: [
          'It makes the file read twice as fast',
          'It automatically closes the file even if exceptions occur',
          'It enables binary mode by default',
          'It bypasses OS file permissions',
        ],
        correctIndex: 1,
        explanation: 'Context managers guarantee cleanup and file closure even during runtime errors.',
      },
    ],
  },

  // Module 9: Networking & Working with APIs
  'py-mod-api': {
    lessons: [
      {
        title: 'HTTP Methods, REST Architecture & Requests',
        language: 'python',
        starterCode: `# Consuming and Working with REST APIs in Python

import json

# Simulating an API response from a REST endpoint
simulated_api_response = {
    "status": 200,
    "data": {
        "user_id": 4042,
        "username": "NeoMatrix",
        "rank": "Architect",
        "badges": ["Python Pro", "FastAPI Pioneer"]
    }
}

# Parsing API data
if simulated_api_response["status"] == 200:
    user = simulated_api_response["data"]
    print(f"User #{user['user_id']}: {user['username']} ({user['rank']})")
    print(f"Badges: {', '.join(user['badges'])}")
else:
    print("Failed to fetch API data.")
`,
        content: `
<h2>REST APIs and HTTP in Python 🌐</h2>
<p>REST (Representational State Transfer) is the standard architectural protocol of modern web and cloud APIs.</p>

<h3>Key HTTP Methods:</h3>
<ul>
  <li><code>GET</code>: Retrieve data from a server without modifying state.</li>
  <li><code>POST</code>: Send data to the server to create a new resource.</li>
  <li><code>PUT</code> / <code>PATCH</code>: Update an existing resource.</li>
  <li><code>DELETE</code>: Remove a resource.</li>
</ul>

<h3>Status Codes:</h3>
<ul>
  <li><code>200 OK</code>, <code>201 Created</code>: Success!</li>
  <li><code>400 Bad Request</code>, <code>401 Unauthorized</code>, <code>404 Not Found</code>: Client errors.</li>
  <li><code>500 Internal Server Error</code>: Backend server malfunction.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Extract API Weather Summary',
        language: 'python',
        description: `
<p>Write a function <code>format_weather(api_dict)</code> that takes an API response dict with keys <code>"city"</code>, <code>"temp_c"</code>, and <code>"condition"</code> and returns string: <code>"[city]: [temp_c]°C, [condition]"</code>.</p>
        `,
        starterCode: `def format_weather(api_dict):\n    city = api_dict.get("city", "Unknown")\n    temp = api_dict.get("temp_c", 0)\n    cond = api_dict.get("condition", "Clear")\n    return f"{city}: {temp}°C, {cond}"\n\ndata = {"city": "Seattle", "temp_c": 18.5, "condition": "Rainy"}\nprint(format_weather(data))\n`,
        expectedOutput: `Seattle: 18.5°C, Rainy`,
        hints: [`Use f"{city}: {temp}°C, {cond}"`],
      },
    ],
    quiz: [
      {
        question: 'Which HTTP status code signifies that a requested resource could not be found on the server?',
        options: ['200', '301', '404', '500'],
        correctIndex: 2,
        explanation: '404 is the standard HTTP response for Not Found.',
      },
    ],
  },

  // Module 10: Python for Data Science
  'py-mod-datasci': {
    lessons: [
      {
        title: 'Tabular Data, Vectors & Aggregations',
        language: 'python',
        starterCode: `# Data Science in Python: Working with Tabular Records

# Tabular dataset represented as list of dictionaries
sales_data = [
    {"product": "Laptop", "category": "Tech", "price": 1200, "units": 4},
    {"product": "Mouse", "category": "Tech", "price": 25, "units": 20},
    {"product": "Desk Chair", "category": "Furniture", "price": 250, "units": 3},
    {"product": "Monitor", "category": "Tech", "price": 300, "units": 6},
    {"product": "Coffee Table", "category": "Furniture", "price": 150, "units": 2},
]

# Total Revenue Calculation
total_revenue = sum(row["price"] * row["units"] for row in sales_data)

# Tech category revenue filter
tech_revenue = sum(row["price"] * row["units"] for row in sales_data if row["category"] == "Tech")

print("Total Revenue: $" + str(total_revenue))
print("Tech Category Revenue: $" + str(tech_revenue))
`,
        content: `
<h2>Python for Data Science 📊</h2>
<p>Python is the #1 language for data analysis, business intelligence, and machine learning thanks to libraries like <strong>NumPy</strong> and <strong>Pandas</strong>.</p>

<h3>Core Data Science Concepts:</h3>
<ul>
  <li><strong>Tabular Data:</strong> Rows (observations) and columns (features/attributes).</li>
  <li><strong>Aggregations:</strong> Computing summary metrics (sum, mean, median, standard deviation).</li>
  <li><strong>Filtering & Masking:</strong> Selecting subsets of data based on criteria.</li>
  <li><strong>Grouping:</strong> Partitioning records by categorical fields to analyze patterns.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Top Revenue Product Finder',
        language: 'python',
        description: `
<p>Write a function <code>top_product(items)</code> that receives a list of item dictionaries with keys <code>"name"</code> and <code>"sales"</code> and returns the <code>"name"</code> of the product with the highest sales value.</p>
        `,
        starterCode: `def top_product(items):\n    if not items:\n        return None\n    best = max(items, key=lambda x: x["sales"])\n    return best["name"]\n\nproducts = [\n    {"name": "Widget A", "sales": 4500},\n    {"name": "Widget B", "sales": 9200},\n    {"name": "Widget C", "sales": 3100}\n]\nprint("Top Product:", top_product(products))\n`,
        expectedOutput: `Top Product: Widget B`,
        hints: [`Use max(items, key=lambda x: x["sales"])["name"].`],
      },
    ],
    quiz: [
      {
        question: 'Which Python library is the standard industry choice for DataFrame manipulation and tabular data analysis?',
        options: ['Pandas', 'Flask', 'Requests', 'Pygame'],
        correctIndex: 0,
        explanation: 'Pandas provides high-performance data structures and analytical tools.',
      },
    ],
  },

  // Module 11: Web Development with FastAPI
  'py-mod-fastapi': {
    lessons: [
      {
        title: 'Modern API Architecture with FastAPI',
        language: 'python',
        starterCode: `# FastAPI Architecture: Modern, High-Performance Python Web APIs
# FastAPI uses Python type hints for automatic validation & OpenAPI docs

class SimulatedFastAPI:
    def __init__(self):
        self.routes = {}

    def get(self, path):
        def decorator(func):
            self.routes[("GET", path)] = func
            return func
        return decorator

    def post(self, path):
        def decorator(func):
            self.routes[("POST", path)] = func
            return func
        return decorator

app = SimulatedFastAPI()

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CodeQuest Backend"}

@app.get("/api/items")
def list_items():
    return [{"id": 1, "name": "Python Mastery"}]

print("Registered Routes:", list(app.routes.keys()))
print("Health Check Call:", app.routes[("GET", "/api/health")]())
`,
        content: `
<h2>Web Development with FastAPI ⚡</h2>
<p>While Django is a full-featured "batteries included" framework and Flask is a microframework, <strong>FastAPI</strong> has become the modern gold standard for API engineering in Python.</p>

<h3>Why FastAPI?</h3>
<ul>
  <li><strong>Blazing Fast:</strong> Built on top of Starlette and Pydantic with asynchronous (<code>async</code>/<code>await</code>) performance comparable to Node.js and Go.</li>
  <li><strong>Automatic Docs:</strong> Generates interactive Swagger UI documentation at <code>/docs</code> with zero configuration.</li>
  <li><strong>Data Validation:</strong> Leverages standard Python 3.10+ type hints to automatically validate incoming JSON request payloads.</li>
</ul>
        `,
      },
    ],
    exercises: [
      {
        title: 'Simulated API Dispatcher',
        language: 'python',
        description: `
<p>Write a function <code>handle_request(method, path)</code> that returns:</p>
<ul>
  <li><code>{"status": 200, "message": "Welcome Home"}</code> if method is <code>"GET"</code> and path is <code>"/"</code>.</li>
  <li><code>{"status": 200, "count": 5}</code> if method is <code>"GET"</code> and path is <code>"/users"</code>.</li>
  <li><code>{"status": 404, "error": "Not Found"}</code> for any other path.</li>
</ul>
        `,
        starterCode: `def handle_request(method, path):\n    if method == "GET" and path == "/":\n        return {"status": 200, "message": "Welcome Home"}\n    elif method == "GET" and path == "/users":\n        return {"status": 200, "count": 5}\n    else:\n        return {"status": 404, "error": "Not Found"}\n\nprint("Home:", handle_request("GET", "/"))\nprint("Users:", handle_request("GET", "/users"))\nprint("Unknown:", handle_request("POST", "/unknown"))\n`,
        expectedOutput: `Home: {'status': 200, 'message': 'Welcome Home'}\nUsers: {'status': 200, 'count': 5}\nUnknown: {'status': 404, 'error': 'Not Found'}`,
        hints: [`Use standard if/elif/else checking method and path.`],
      },
    ],
    quiz: [
      {
        question: 'What URL does FastAPI serve interactive Swagger documentation on by default?',
        options: ['/swagger', '/docs', '/api/help', '/documentation'],
        correctIndex: 1,
        explanation: 'FastAPI serves OpenAPI Swagger documentation at /docs by default.',
      },
    ],
    project: {
      title: 'Full-Stack Python Task API Service',
      language: 'python',
      description: `
<p>Build a modular in-memory REST API service for managing a developer task board with validation.</p>
      `,
      starterCode: `class TaskService:\n    def __init__(self):\n        self.tasks = []\n        self.next_id = 1\n\n    def create_task(self, title, priority="medium"):\n        task = {"id": self.next_id, "title": title, "priority": priority, "completed": False}\n        self.tasks.append(task)\n        self.next_id += 1\n        return task\n\n    def complete_task(self, task_id):\n        for t in self.tasks:\n            if t["id"] == task_id:\n                t["completed"] = True\n                return t\n        return None\n\n    def get_pending(self):\n        return [t for t in self.tasks if not t["completed"]]\n\nservice = TaskService()\nt1 = service.create_task("Learn Python Foundations", "high")\nt2 = service.create_task("Build FastAPI Endpoint", "medium")\nservice.complete_task(t1["id"])\nprint("Pending Tasks Count:", len(service.get_pending()))\n`,
      requirements: [
        'create_task assigns auto-incrementing id',
        'complete_task marks completed flag to True',
        'get_pending returns uncompleted tasks list',
      ],
    },
  },
};
