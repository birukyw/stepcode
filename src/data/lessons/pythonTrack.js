// ─── Chronicles of Python: Path of the Serpent Sage ───────────────────────
// Comprehensive Retro-RPG Curriculum: Modules 1–11
// Beginner Foundations (Modules 1–6) & Advanced Ecosystem Electives (Modules 7–11)

export const pythonTrackContent = {
  // ════════════════════════════════════════════════════════════════
  // BEGINNER FOUNDATIONS (Modules 1–6)
  // ════════════════════════════════════════════════════════════════

  // Module 1: The Awakening of the Serpent Sage — Syntax, CPython & Primitives
  'py-week-1': {
    lessons: [
      {
        title: 'Zen of Python & The CPython Execution Engine',
        language: 'python',
        starterCode: `# Welcome to the Chronicles of Python! 🐍
# The print() function invokes the CPython standard output stream.

print("Hello, World!")
print("Awakening the Serpent Sage in the CPython Archives...")

# Python executes line by line from top to bottom.
# Comments start with a hash (#) and are ignored by the compiler.
`,
        content: `
<h2>🐍 Chapter 1: The Awakening of the Serpent Sage</h2>

<div class="lesson-pixel-art">
  <img src="/images/pixel_python_sage.jpg" alt="Python Serpent Sage in glowing ancient archives" />
  <div class="pixel-caption">
    🐍 SECTOR 00: THE EMERALD SERPENT SAGE AWAKENS IN THE CPYTHON ARCHIVES
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome, initiate of the Serpent Order. You enter the glowing ancient archives where human thought translates directly into executable computation. Before you command machine learning dragons and forge high-speed web citadels, you must master the Serpent's Sacred Grammar and understand how the CPython virtual engine brings your code to life.</em>
</div>

<p>Conceived in 1989 by the legendary software architect <strong>Guido van Rossum</strong> (the benevolent dictator for life, or BDFL), Python was designed with an uncompromising philosophy: <em>code is read far more frequently than it is written</em>. Unlike verbose tongues requiring heaps of boilerplate classes and semi-colons, Python expresses algorithms in pure, clean executable pseudo-code.</p>

<h3>The Zen of Python (PEP 20)</h3>
<p>Deep within the Python interpreter lies an ancient philosophical manifesto. If you enter <code>import this</code> into any Python console, the Zen reveals its tenet runes:</p>

<ul>
  <li><strong>Beautiful is better than ugly.</strong> Code should be an aesthetic joy to read.</li>
  <li><strong>Explicit is better than implicit.</strong> No hidden magic; express intent with crystal clarity.</li>
  <li><strong>Simple is better than complex.</strong> Prefer straightforward solutions before applying complex machinery.</li>
  <li><strong>Readability counts.</strong> Clean indentation and intuitive naming preserve software longevity.</li>
  <li><strong>Errors should never pass silently.</strong> Unless explicitly silenced with deliberate intent.</li>
</ul>

<h3>How Python Actually Executes: The CPython Pipeline</h3>
<p>Many novices mistakenly believe Python is a "purely interpreted" script language. In reality, the standard Python runtime (<strong>CPython</strong>, written in C) is a compiled bytecode engine:</p>

<pre class="ascii-diagram">
+---------------------+        +--------------------+        +---------------------+
|   script.py         | -----> |   Parser & AST     | -----> |  CPython Bytecode   |
| [Source Text Runes] |        | (Syntax Tree)      |        | (.pyc in __pycache__|
+---------------------+        +--------------------+        +---------------------+
                                                                        |
                                                                        v
+---------------------+        +--------------------+        +---------------------+
| Operating System    | <----- |  C Runtime & Libs  | <----- | CPython Virtual VM  |
| (CPU, Memory, I/O)  |        | (Memory Allocator) |        | (Evaluation Loop)   |
+---------------------+        +--------------------+        +---------------------+
</pre>

<ol>
  <li><strong>Lexing & Parsing:</strong> Source code is converted into tokens and assembled into an <em>Abstract Syntax Tree (AST)</em>.</li>
  <li><strong>Bytecode Compilation:</strong> CPython compiles the AST into stack-based bytecode instructions, cached on disk as <code>.pyc</code> files in the <code>__pycache__</code> directory.</li>
  <li><strong>The Virtual Machine:</strong> The CPython Virtual Machine executes these bytecode instructions one by one inside its main evaluation loop (<code>ceval.c</code>), protected by the <strong>Global Interpreter Lock (GIL)</strong>.</li>
</ol>

<div class="callout callout--tip">
  <strong>🔮 Sage Advice:</strong> Click <strong>▶ Run</strong> on the right pane to invoke the interpreter and witness your first incantation echo through the console!
</div>
        `,
      },
      {
        title: 'Numbers, Arithmetic & The PyObject Memory Model',
        language: 'python',
        starterCode: `# Python Math & Numbers: Precision Arithmetic

# 1. Arbitrary-Precision Integers (Whole numbers)
gold = 150
enemies_defeated = 12

# 2. Double-Precision Floating Points (IEEE 754)
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
<h2>🔢 Numbers & The PyObject Memory Architecture</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>In the kingdom of C or Java, an integer is a simple 32-bit slot in memory that overflows if it crosses 2,147,483,647. In Python, numbers are celestial beings called PyObjects. Learn how Python handles numbers of infinite size and why floating-point decimals require respect.</em>
</div>

<h3>The Anatomy of a Python Integer (PyLongObject)</h3>
<p>In Python, <strong>everything is an object allocated on the heap</strong>. Even a tiny number like <code>42</code> is a full C structure:</p>

<pre class="ascii-diagram">
           PyLongObject Memory Layout for integer 42
+-------------------------------------------------------------+
| ob_refcnt : 8 bytes (Reference count for Garbage Collection)|
| ob_type   : 8 bytes (Pointer to &PyLong_Type class object)   |
| ob_size   : 8 bytes (Sign and number of digit chunks)       |
| ob_digit  : 4 bytes (The actual value digits array: [42])   |
+-------------------------------------------------------------+
Total: 28 bytes for a single integer! (Compared to 4 bytes in C)
</pre>

<p><strong>Arbitrary Precision:</strong> Because Python stores digits in dynamic arrays, integers <em>never overflow</em>! You can calculate <code>2 ** 10000</code> without crashing. The only limit is your machine's physical RAM.</p>

<div class="callout callout--info">
  <strong>🧠 The Small Integer Cache (-5 to 256):</strong> To avoid churning memory, CPython pre-allocates an array of singleton integer objects for numbers between <code>-5</code> and <code>256</code> when the interpreter boots. Comparing <code>a = 100</code> and <code>b = 100</code> with <code>a is b</code> yields <code>True</code> because both names point to the exact same physical heap address!
</div>

<h3>Floating-Point Numbers (IEEE 754)</h3>
<p>Floats in Python represent double-precision decimal numbers. Because computers represent decimals in base-2 binary, certain fractional numbers cannot be represented with exact precision:</p>

<pre><code>0.1 + 0.2  # Returns 0.30000000000000004!</code></pre>

<div class="callout callout--warn">
  <strong>⚠️ Financial Caution:</strong> Never use standard <code>float</code> types for banking or currency calculations! Instead, import the standard library's <code>from decimal import Decimal</code> module for exact base-10 arithmetic.
</div>

<h3>Arithmetic Operators Master Table</h3>
<table class="lesson-table">
  <thead><tr><th>Operator</th><th>Operation</th><th>Mathematical Example</th><th>CPython Dunder Method</th></tr></thead>
  <tbody>
    <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 5 = 15</code></td><td><code>__add__</code></td></tr>
    <tr><td><code>-</code></td><td>Subtraction</td><td><code>20 - 8 = 12</code></td><td><code>__sub__</code></td></tr>
    <tr><td><code>*</code></td><td>Multiplication</td><td><code>4 * 7 = 28</code></td><td><code>__mul__</code></td></tr>
    <tr><td><code>/</code></td><td>True Float Division</td><td><code>7 / 2 = 3.5</code></td><td><code>__truediv__</code></td></tr>
    <tr><td><code>//</code></td><td>Floor Division (truncates toward -infinity)</td><td><code>7 // 2 = 3</code></td><td><code>__floordiv__</code></td></tr>
    <tr><td><code>%</code></td><td>Modulo (Remainder)</td><td><code>7 % 2 = 1</code></td><td><code>__mod__</code></td></tr>
    <tr><td><code>**</code></td><td>Exponentiation (Power)</td><td><code>2 ** 8 = 256</code></td><td><code>__pow__</code></td></tr>
  </tbody>
</table>
        `,
      },
      {
        title: 'Strings, Slicing & Modern Formatted F-Strings',
        language: 'python',
        starterCode: `# Python Strings, Immutability & Slicing

hero_name = "Kaelen Shadowblade"
realm = "Eldoria"
level = 14

# String Slicing: [start:stop:step]
first_name = hero_name[:6]
last_name = hero_name[7:]

# String Methods (Return brand-new string objects)
shout = hero_name.upper()
clean = "   extra whitespace   ".strip()

# Formatted F-Strings (PEP 498 - Fast, Readable Interpolation)
status_card = f"⚔️ Hero: {hero_name} | Realm: {realm} | Level: {level}"

print("First Name:", first_name)
print("Last Name:", last_name)
print("Shout:", shout)
print("Cleaned:", clean)
print(status_card)
`,
        content: `
<h2>📜 Strings, Immutability & Advanced Slicing</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Text in Python is not a mere array of ASCII bytes. Strings are immutable Unicode arrays capable of expressing every human language, math symbol, and emoji in existence. Learn the master art of string slicing and f-string interpolation.</em>
</div>

<h3>Strings are Immutable (Cannot Be Mutated in Place)</h3>
<p>In Python, once a <code>str</code> object is allocated in memory, its characters <strong>can never be changed</strong>. If you attempt <code>s = "Python"; s[0] = "J"</code>, Python raises a <code>TypeError: 'str' object does not support item assignment</code>.</p>

<p>Every operation that transforms a string (like <code>.upper()</code>, <code>.strip()</code>, or <code>.replace()</code>) builds a <strong>brand new string object</strong> in heap memory and returns a reference to it.</p>

<h3>The Power of String Slicing: <code>[start:stop:step]</code></h3>
<p>Slicing is one of Python's most elegant features. It allows you to extract sub-sequences without writing manual loops:</p>

<pre class="ascii-diagram">
String:    ' P   y   t   h   o   n '
Positive:    0   1   2   3   4   5
Negative:   -6  -5  -4  -3  -2  -1
</pre>

<ul>
  <li><code>word[0:2]</code> — Index 0 up to (excluding) 2: <code>'Py'</code></li>
  <li><code>word[:4]</code> — From the start up to index 4: <code>'Pyth'</code></li>
  <li><code>word[2:]</code> — From index 2 to the very end: <code>'thon'</code></li>
  <li><code>word[-3:]</code> — The last 3 characters: <code>'hon'</code></li>
  <li><code>word[::2]</code> — Every second character: <code>'Pto'</code></li>
  <li><code>word[::-1]</code> — Step backwards by 1: <code>'nohtyP'</code> (Reverse in O(N) time!)</li>
</ul>

<h3>Formatted F-Strings (PEP 498)</h3>
<p>Introduced in Python 3.6, formatted string literals (f-strings) evaluate expressions directly inside string literals at runtime. They are significantly faster than older <code>%</code> formatting or <code>.format()</code> methods because the bytecode compiler optimizes the expression evaluations directly into opcode instructions:</p>

<pre><code>mana = 75
max_mana = 100
# Format with inline calculations and precision specifiers:
print(f"Mana: {mana}/{max_mana} ({mana / max_mana:.1%})")
# Output: Mana: 75/100 (75.0%)</code></pre>
        `,
      },
      {
        title: 'Booleans, Dynamic Namespaces & Type Casting',
        language: 'python',
        starterCode: `# Booleans & Dynamic Type Casting

is_warrior = True
has_magic = False

# type() inspection reveals the underlying class
print("Type of is_warrior:", type(is_warrior))
print("Type of 42:", type(42))
print("Type of 'Hello':", type("Hello"))

# Type Casting (Invoking the type constructor)
raw_input_age = "25"         # str
age = int(raw_input_age)     # converted to int
pi_str = str(3.14)           # converted to str
is_online = bool(1)          # converted to bool (True)

print("Age next year:", age + 1)
print("Is Online:", is_online)
`,
        content: `
<h2>⚖️ Booleans, Dynamic Typing & Namespaces</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python is strongly and dynamically typed. Variables are not memory boxes; they are nametags bound to heap objects. Understand how Python looks up types and safely convert data between forms.</em>
</div>

<h3>Variables as Nametags (References)</h3>
<p>In languages like C or C++, declaring <code>int x = 5</code> allocates a dedicated 4-byte box in memory labeled <code>x</code>. In Python, variables are <strong>references (pointers)</strong> bound to objects in the heap:</p>

<pre class="ascii-diagram">
Namespace (Name Table)                   Heap Memory
+--------------------+              +------------------------+
| hero               | -----------> | PyUnicodeObject        |
|                    |              | Value: "Astra"         |
+--------------------+              +------------------------+
                                                ^
+--------------------+                          |
| player_one         | -------------------------+ (Points to same object!)
+--------------------+
</pre>

<p>When you reassign <code>hero = 100</code>, the nametag <code>hero</code> simply detaches from <code>"Astra"</code> and attaches to the <code>PyLongObject</code> for <code>100</code>. Python is <strong>strongly typed</strong> because it refuses to silently perform illogical operations (e.g. <code>"5" + 5</code> raises a <code>TypeError</code> rather than coercing into <code>"55"</code> like JavaScript).</p>

<h3>Explicit Type Constructors (Casting)</h3>
<ul>
  <li><code>int("100")</code> — Parses base-10 string into an integer. (Pass base as second arg: <code>int("1010", 2) == 10</code>).</li>
  <li><code>float("3.14")</code> — Parses decimal string into an IEEE float.</li>
  <li><code>str(12345)</code> — Converts any object into its string representation via <code>__str__</code>.</li>
  <li><code>bool(x)</code> — Evaluates the truthiness of <code>x</code>.</li>
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

  // Module 2: Control Flow, Logic & Decision Making
  'py-week-2': {
    lessons: [
      {
        title: 'Comparison Operators & Short-Circuit Boolean Logic',
        language: 'python',
        starterCode: `# Comparison & Logical Operators in Python

player_level = 25
has_boss_key = True
is_poisoned = False

# Comparison Operators: ==, !=, <, >, <=, >=
can_challenge_dungeon = player_level >= 20

# Logical Operators: and, or, not
# Python evaluates logical operators with short-circuiting!
can_enter_boss_room = player_level >= 20 and has_boss_key
needs_cure = is_poisoned or player_level < 5
is_healthy = not is_poisoned

print("Can challenge dungeon:", can_challenge_dungeon)
print("Can enter boss room:", can_enter_boss_room)
print("Needs cure potion:", needs_cure)
print("Is healthy:", is_healthy)
`,
        content: `
<h2>🔀 Chapter 2: The Crossroads of Fate — Logic & Operators</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Every great program is a labyrinth of decisions. In Python, control flow is driven by clean English conjunctions: and, or, and not. Learn how short-circuit evaluation saves CPU cycles and protects your software from null pointer exceptions.</em>
</div>

<h3>Short-Circuit Evaluation: The Shield of Safety</h3>
<p>Python evaluates logical expressions from left to right and terminates evaluation as soon as the outcome is mathematically guaranteed:</p>

<ul>
  <li><code>A and B</code> — If <code>A</code> is falsy, Python immediately returns <code>A</code> without evaluating <code>B</code>.</li>
  <li><code>A or B</code> — If <code>A</code> is truthy, Python immediately returns <code>A</code> without evaluating <code>B</code>.</li>
</ul>

<div class="callout callout--tip">
  <strong>🛡️ The Guard Pattern:</strong> Short-circuiting allows safe attribute or key checks without crashing:
  <pre><code>user = None
# This will NOT raise AttributeError because user is None stops at the first check!
if user is not None and user.is_active:
    print("Welcome back!")</code></pre>
</div>

<h3>Truth Values of <code>and</code> and <code>or</code></h3>
<p>Unlike languages that strictly return <code>true</code> or <code>false</code>, Python's <code>and</code> and <code>or</code> return the <strong>actual operand value</strong> that decided the outcome:</p>
<pre><code>x = "Hero" or "Default"  # Returns "Hero" (first truthy value)
y = "" or "Default"      # Returns "Default" (since "" is falsy)
z = [1, 2] and "Success" # Returns "Success" (both are truthy)</code></pre>
        `,
      },
      {
        title: 'Conditional Branching: if, elif, else & Match-Case',
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

# Python 3.10+ Structural Pattern Matching (match-case)
command = "TELEPORT NORTH"
match command.split():
    case ["TELEPORT", destination]:
        print(f"Warping directly to {destination}...")
    case ["ATTACK", target]:
        print(f"Striking {target}!")
    case _:
        print("Unknown incantation.")
`,
        content: `
<h2>🌿 Conditional Branching & Structural Pattern Matching</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python eliminates messy brackets and braces using four spaces of indentation. Explore chained conditionals and discover Python 3.10's modern superpower: Structural Pattern Matching (match-case).</em>
</div>

<h3>Indentation as Syntax (The Off-Side Rule)</h3>
<p>In Python, blocks of code are defined strictly by whitespace indentation (PEP 8 standard is <strong>4 spaces</strong> per indentation level). This forces every Python codebase in the world to maintain clean visual structure.</p>

<pre class="ascii-diagram">
if score >= 90:
    [4 spaces] grade = "A+"    <-- Branch A
elif score >= 80:
    [4 spaces] grade = "B"     <-- Branch B
else:
    [4 spaces] grade = "C"     <-- Fallback
</pre>

<h3>Modern Python 3.10+: <code>match-case</code> (PEP 634)</h3>
<p>Traditional languages use primitive <code>switch</code> statements limited to integers or strings. Python's <code>match-case</code> is a full <strong>Structural Pattern Matcher</strong> capable of destructuring sequences, dictionaries, and class instances simultaneously:</p>

<pre><code>def process_event(event):
    match event:
        case {"type": "CLICK", "x": x, "y": y}:
            return f"Clicked coordinates ({x}, {y})"
        case {"type": "KEYPRESS", "key": key} if key == "ESCAPE":
            return "Menu opened"
        case [first, *rest]:
            return f"List with head {first} and {len(rest)} tail items"
        case _:
            return "Unmatched pattern"</code></pre>
        `,
      },
      {
        title: 'Truthy & Falsy Evaluation Internals',
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
<h2>💡 Truthy & Falsy Evaluation Mechanics</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>In Python, you rarely write <code>if len(items) > 0:</code> or <code>if is_active == True:</code>. Python evaluates the inherent truth value of any object automatically. Learn the rules of truthiness.</em>
</div>

<h3>The Complete Falsy Checklist</h3>
<p>In Python, every object is either Truthy or Falsy. There are exactly six categories of Falsy objects; <strong>everything else in Python is Truthy</strong>:</p>

<table class="lesson-table">
  <thead><tr><th>Falsy Category</th><th>Examples</th><th>Why It Is Falsy</th></tr></thead>
  <tbody>
    <tr><td>Boolean False</td><td><code>False</code></td><td>Native falsy boolean literal</td></tr>
    <tr><td>Null Reference</td><td><code>None</code></td><td>Absence of a value</td></tr>
    <tr><td>Zero Numbers</td><td><code>0</code>, <code>0.0</code>, <code>0j</code>, <code>Decimal(0)</code></td><td>Zero numerical quantity</td></tr>
    <tr><td>Empty Sequences</td><td><code>""</code> (str), <code>[]</code> (list), <code>()</code> (tuple)</td><td>Length is 0</td></tr>
    <tr><td>Empty Mappings</td><td><code>{}</code> (dict), <code>set()</code></td><td>No keys / items</td></tr>
    <tr><td>Custom Objects</td><td>Objects defining <code>__bool__() == False</code> or <code>__len__() == 0</code></td><td>Protocol hook</td></tr>
  </tbody>
</table>

<div class="callout callout--tip">
  <strong>🐍 Pythonic Idiom:</strong> Instead of writing <code>if len(my_list) == 0:</code>, simply write <code>if not my_list:</code>. It is cleaner, faster, and idiomatic Python.
</div>
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

  // Module 3: Loops & Iteration Patterns
  'py-week-3': {
    lessons: [
      {
        title: 'The while Loop & Loop Invariants',
        language: 'python',
        starterCode: `# The while loop executes as long as a condition evaluates to True

countdown = 5

while countdown > 0:
    print(f"Launching in {countdown}...")
    countdown -= 1  # Decrement to prevent infinite loop!

print("🚀 Blastoff!")

# The while-else clause (Executes ONLY if loop completes without break)
target = 7
current = 1
while current < 5:
    if current == target:
        print(f"Found {target}!")
        break
    current += 1
else:
    print(f"Target {target} was not reached in loop iterations.")
`,
        content: `
<h2>🔄 Chapter 3: The Cycles of Eternity — Loops & Invariants</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Repetition is the engine of automation. Explore how while loops maintain computational invariants and unlock the rare secret of Python's while-else construct.</em>
</div>

<h3>The Anatomy of a While Loop</h3>
<p>A <code>while</code> loop repeatedly evaluates a conditional predicate before every iteration. As long as the predicate remains truthy, the indented suite executes:</p>

<pre class="ascii-diagram">
        +-------------------+
        | Evaluate Predicate|
        +-------------------+
              |       |
      [True]  |       | [False]
              v       v
      +------------+  +-----------------+
      | Loop Body  |  | Exit / else:    |
      +------------+  +-----------------+
              |
              +---- Re-evaluate
</pre>

<h3>The Secret of <code>while-else</code> / <code>for-else</code></h3>
<p>Python features a syntax construct found in almost no other major programming language: an <code>else</code> block attached directly to a loop! The <code>else</code> block executes <strong>only if the loop terminated naturally</strong> without hitting a <code>break</code> statement:</p>

<pre><code># Searching for a prime factor
n = 17
d = 2
while d * d <= n:
    if n % d == 0:
        print(f"{n} is composite ({d} * {n // d})")
        break
    d += 1
else:
    print(f"{n} is a prime number!")</code></pre>
        `,
      },
      {
        title: 'The for Loop, range() & The Iterator Protocol',
        language: 'python',
        starterCode: `# The for loop iterates over sequences, generators & ranges

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

# 3. Iterating over a string sequence
print("\nSpell out:")
for char in "Python":
    print(char, end="-")
print()
`,
        content: `
<h2>🎯 The for Loop & The Iterator Protocol</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>In C or Java, a for loop is an arithmetic index counter (for int i = 0; i &lt; n; i++). In Python, every for loop is a sophisticated iterator consumer. Discover how Python streams data element by element.</em>
</div>

<h3>How Python's <code>for</code> Loop Works Under the Hood</h3>
<p>When you write <code>for item in collection:</code>, Python executes the <strong>Iterator Protocol</strong>:</p>

<ol>
  <li>Python calls <code>iter(collection)</code>, which invokes <code>collection.__iter__()</code> to obtain an iterator object.</li>
  <li>On each iteration, Python calls <code>next(iterator)</code>, which invokes <code>iterator.__next__()</code>.</li>
  <li>When elements are exhausted, the iterator raises a <code>StopIteration</code> exception, which the <code>for</code> loop catches internally to gracefully terminate!</li>
</ol>

<h3>The <code>range()</code> Generator</h3>
<p>In Python 3, <code>range(1_000_000)</code> does <strong>not</strong> create a list of one million integers in memory! Instead, it is an immutable sequence object that computes each number on the fly in <code>O(1)</code> memory.</p>
        `,
      },
      {
        title: 'Loop Control Flow: break, continue, pass',
        language: 'python',
        starterCode: `# Loop Control Keywords

# 1. break: Immediately terminates the innermost enclosing loop
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

# 3. pass: Syntactic no-op placeholder
class UnfinishedFeature:
    pass
`,
        content: `
<h2>⏹️ Master Loop Control: break, continue & pass</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Interrupt cycles at will. Use break to abandon search loops, continue to bypass unwanted iterations, and pass to create flawless architectural stubs.</em>
</div>

<ul>
  <li><code>break</code> — Immediately breaks out of the innermost loop. The loop's optional <code>else:</code> block will <strong>not</strong> execute.</li>
  <li><code>continue</code> — Immediately aborts the remaining statements in the current iteration and jumps to the next cycle.</li>
  <li><code>pass</code> — A complete syntactic no-op. Because Python relies on indentation, an empty block (like an empty class or function) is a syntax error without <code>pass</code>.</li>
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

  // Module 4: Functions, Scopes & Parameter Protocols
  'py-week-4': {
    lessons: [
      {
        title: 'Function Invocations, Return Values & First-Class Citizens',
        language: 'python',
        starterCode: `# Functions package reusable logic and are first-class citizens in Python

def calculate_xp(level, multiplier=1.0):
    """Calculates total required XP for a player level."""
    base_xp = level * 100
    return int(base_xp * multiplier)

xp1 = calculate_xp(5)
xp2 = calculate_xp(5, 1.5)

print("Level 5 Normal XP:", xp1)
print("Level 5 Boosted XP:", xp2)

# First-class citizens: Functions can be stored in variables or passed as args!
calculator_fn = calculate_xp
print("Invoked via variable:", calculator_fn(3, 2.0))
`,
        content: `
<h2>📦 Chapter 4: The Tome of Functions — Scopes & Invocations</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Functions in Python are not just procedures; they are first-class citizens. They can be passed as arguments, returned from other functions, stored in dictionaries, and adorned with decorators. Learn how to wield functional power.</em>
</div>

<h3>The LEGB Scoping Rule</h3>
<p>When a variable name is referenced inside a function, Python searches four concentric scope rings in a strict hierarchy known as <strong>LEGB</strong>:</p>

<pre class="ascii-diagram">
+-------------------------------------------------------+
|  B - Built-in Scope (len, range, print, sum, int...)  |
|   +-----------------------------------------------+   |
|   |  G - Global Scope (Module-level definitions)  |   |
|   |   +---------------------------------------+   |   |
|   |   |  E - Enclosing Scope (Outer function) |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   |   |  L - Local Scope (This func)  |   |   |   |
|   |   |   +-------------------------------+   |   |   |
|   |   +---------------------------------------+   |   |
|   +-----------------------------------------------+   |
+-------------------------------------------------------+
</pre>

<ol>
  <li><strong>Local (L):</strong> Names assigned inside the current function body.</li>
  <li><strong>Enclosing (E):</strong> Names in the local scope of any enclosing/outer functions (closures).</li>
  <li><strong>Global (G):</strong> Names declared at the top module level.</li>
  <li><strong>Built-in (B):</strong> Names built into the Python language runtime.</li>
</ol>
        `,
      },
      {
        title: 'Flexible Arguments: *args, **kwargs & The Mutable Default Trap',
        language: 'python',
        starterCode: `# Arbitrary Arguments with *args and **kwargs

# *args gathers extra positional arguments into an immutable tuple
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
<h2>🤹 Flexible Parameters & The Mutable Default Argument Trap</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python functions can accept dynamic configurations through *args and **kwargs. But beware the most notorious rookie bug in Python history: the mutable default parameter.</em>
</div>

<h3>Arbitrary Argument Gathering</h3>
<ul>
  <li><code>*args</code> — Packs arbitrary positional parameters into an <strong>immutable tuple</strong>.</li>
  <li><code>**kwargs</code> — Packs arbitrary keyword arguments (e.g. <code>role="Warrior", hp=100</code>) into a <strong>standard dictionary</strong>.</li>
</ul>

<div class="callout callout--warn">
  <strong>⚠️ The Dangerous Mutable Default Argument Trap:</strong>
  In Python, default arguments are evaluated <strong>once when the function is defined</strong>, NOT each time the function is called!
  <pre><code># BUGGY: The same list is shared across all function invocations!
def add_player(name, team=[]):
    team.append(name)
    return team

print(add_player("Alice"))  # ['Alice']
print(add_player("Bob"))    # ['Alice', 'Bob'] <-- BUG! Alice is still in team!</code></pre>

  <strong>The Pythonic Solution: Use None as Sentinel Value:</strong>
  <pre><code>def add_player(name, team=None):
    if team is None:
        team = []
    team.append(name)
    return team</code></pre>
</div>
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
        title: 'Lists, Tuples, Dictionaries & Sets: Internal Architecture',
        language: 'python',
        starterCode: `# Python Built-in Collections

# 1. Lists (Ordered, mutable array of pointer references)
spells = ["Fireball", "Frost Nova", "Lightning Bolt"]
spells.append("Teleport")

# 2. Dictionaries (High-speed hash tables with O(1) average lookup)
stats = {"health": 100, "mana": 50, "armor": 25}
stats["mana"] += 25

# 3. Sets (Unique elements powered by hash tables)
equipped_items = {"Sword", "Shield", "Boots"}
equipped_items.add("Sword")  # Duplicate ignored!

print("Spells:", spells)
print("Stats:", stats)
print("Unique Items:", equipped_items)
`,
        content: `
<h2>🎒 Chapter 5: The Vault of Collections — Data Structures</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python provides four foundational collection primitives built directly into CPython. Understand their memory layout, amortized time complexities, and hash table internals.</em>
</div>

<h3>The Four Great Collection Archetypes</h3>

<ol>
  <li><strong>List (<code>[item1, item2]</code>):</strong> Dynamic array of object references. Supports <code>O(1)</code> indexed access and <code>O(1)</code> amortized append. Pre-allocates extra memory to prevent resizing on every insertion.</li>
  <li><strong>Tuple (<code>(item1, item2)</code>):</strong> Immutable sequence. Because tuples cannot change size or contents, CPython optimizes them with minimal memory overhead. Tuples containing only hashable objects are themselves hashable and can be used as dictionary keys!</li>
  <li><strong>Dictionary (<code>{key: value}</code>):</strong> High-performance hash table. Starting in Python 3.6, Python uses a <strong>compact dictionary layout</strong>:
    <pre class="ascii-diagram">
Hash Indices:  [-1,  0, -1,  1, -1]  <-- Sparse table of small integer indices
Entries Array: [                     <-- Dense array storing insertion order!
  {"hash": 1284, "key": "health", "value": 100},
  {"hash": 9831, "key": "mana",   "value": 75}
]
    </pre>
    This revolutionary architecture reduced dictionary memory consumption by 25% while preserving insertion order!
  </li>
  <li><strong>Set (<code>{item1, item2}</code>):</strong> Unordered collection of unique items. Backed by a hash table with dummy values, providing blazing fast <code>O(1)</code> membership testing (<code>if item in my_set:</code>).</li>
</ol>
        `,
      },
      {
        title: 'List, Dict & Set Comprehensions vs Lazy Generators',
        language: 'python',
        starterCode: `# Pythonic Comprehensions & Generator Expressions

# 1. List Comprehension: [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
even_squares = [x ** 2 for x in numbers if x % 2 == 0]

# 2. Dict Comprehension
players = ["Alice", "Bob", "Charlie"]
scores = {name: len(name) * 10 for name in players}

# 3. Generator Expression (Lazy Memory Streaming)
# Notice parentheses instead of brackets: computes values on-demand!
lazy_squares = (x ** 2 for x in range(1_000_000))

print("Even Squares:", even_squares)
print("Scores Dict:", scores)
print("First lazy value:", next(lazy_squares))
print("Second lazy value:", next(lazy_squares))
`,
        content: `
<h2>⚡ Comprehensions & Generator Expressions</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Transform and filter collections in a single expressive line. Compare eager memory allocation with lazy generator streaming.</em>
</div>

<h3>List Comprehensions vs Traditional Loops</h3>
<p>Comprehensions are not merely syntax sugar; they execute at C-speed inside the CPython evaluation loop because they bypass repeated method calls to <code>.append()</code>:</p>

<pre><code># Traditional loop (4 lines, slower attribute lookup)
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x * x)

# Pythonic comprehension (1 line, C-level loop)
squares = [x * x for x in range(10) if x % 2 == 0]</code></pre>

<h3>The Memory Showdown: Lists vs Generators</h3>
<ul>
  <li><code>[x for x in range(10_000_000)]</code> — Allocates an eager list in RAM consuming <strong>~80 Megabytes</strong> of memory.</li>
  <li><code>(x for x in range(10_000_000))</code> — Creates an iterator generator object consuming only <strong>112 bytes</strong> of memory, streaming values one at a time via <code>next()</code>!</li>
</ul>
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
        title: 'Classes, Objects, self & Instance Dictionaries',
        language: 'python',
        starterCode: `# Object-Oriented Programming (OOP) in Python

class Hero:
    # Class attribute (shared across all instances via class namespace)
    universe = "Arcadia"

    # Constructor method (__init__ initializes newly allocated instances)
    def __init__(self, name, role, health=100):
        # Instance attributes stored in instance __dict__
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
print("Instance dictionary (__dict__):", hero1.__dict__)
`,
        content: `
<h2>🏰 Chapter 6: Forging Object Golems — Classes & Namespaces</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Object-Oriented Programming binds state and logic into reusable blueprints. Explore how Python creates objects, unpacks self, and manages class vs instance namespaces.</em>
</div>

<h3>The Architecture of a Python Class</h3>
<p>In Python, classes are themselves objects created by the <code>type</code> metaclass. When you define attributes inside a class, they live in the class's dictionary. When you instantiate an object, an instance dictionary (<code>__dict__</code>) is attached to it:</p>

<pre class="ascii-diagram">
Class Hero (Hero.__dict__)
+------------------------------------+
| universe: "Arcadia"                |
| take_damage: &lt;function take_damage&gt;|
+------------------------------------+
              ^
              | (Fallback attribute lookup)
              |
Instance hero1 (hero1.__dict__)
+------------------------------------+
| name: "Astra", role: "Warrior"     |
| health: 90                         |
+------------------------------------+
</pre>

<h3>What is <code>self</code>?</h3>
<p>Unlike languages that secretly pass a hidden <code>this</code> pointer behind the scenes, Python follows its Zen: <em>Explicit is better than implicit</em>. When you invoke <code>hero1.take_damage(30)</code>, Python translates it directly into:</p>
<pre><code>Hero.take_damage(hero1, 30)</code></pre>
<p>The <code>self</code> argument simply binds the specific instance into the first parameter position!</p>
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
  <li><code>withdraw(amount)</code>: Subtracts amount if balance is sufficient, otherwise leaves balance unchanged.</li>
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
  // ADVANCED ECOSYSTEM ELECTIVES (Modules 7–11)
  // ════════════════════════════════════════════════════════════════

  // Module 7: Advanced OOP, Magic Methods & Metaprogramming
  'py-mod-oop': {
    lessons: [
      {
        title: 'Inheritance, Polymorphism & The MRO (Method Resolution Order)',
        language: 'python',
        starterCode: `# Advanced OOP: Inheritance, Polymorphism & super()

class Character:
    def __init__(self, name, health):
        self.name = name
        self.health = health

    def attack(self):
        return f"{self.name} strikes with basic attack!"

class Mage(Character):
    def __init__(self, name, health, mana):
        super().__init__(name, health)  # Delegate to parent constructor
        self.mana = mana

    def attack(self):
        return f"{self.name} casts Arcane Blast using {self.mana} mana!"

m = Mage("Merlin", 80, 100)
print(m.attack())
print("Method Resolution Order (MRO):", [cls.__name__ for cls in Mage.__mro__])
`,
        content: `
<h2>🧬 Chapter 7: The Master Architect — Advanced OOP & MRO</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Enter the advanced realm of object inheritance. Learn how Python resolves method calls in complex class hierarchies using the C3 Linearization algorithm and write clean, cooperative multiple inheritance.</em>
</div>

<h3>Method Resolution Order (MRO) with C3 Linearization</h3>
<p>When a method is called on an instance, Python must determine which class in the inheritance chain provides the implementation. It traverses the class's <strong>MRO tuple</strong> (inspectable via <code>ClassName.__mro__</code>).</p>

<p>Python utilizes the <strong>C3 Linearization algorithm</strong> (introduced in Python 2.3) to resolve the diamond inheritance problem, guaranteeing two fundamental properties:</p>
<ol>
  <li><strong>Subclasses come before parent classes.</strong></li>
  <li><strong>Order of appearance in the inheritance tuple is strictly preserved.</strong></li>
</ol>
        `,
      },
      {
        title: 'Magic Dunder Protocols & Operator Overloading',
        language: 'python',
        starterCode: `# Magic / Dunder Methods: Hooking into Python's Operator Protocols

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # String representation for end-users: print(v)
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    # Formal unambiguous representation for debugging: repr(v)
    def __repr__(self):
        return f"Vector2D(x={self.x}, y={self.y})"

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
<h2>🪄 Dunder Magic Protocols & Operator Overloading</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Double-underscore (dunder) methods allow custom classes to integrate seamlessly with Python's core operators and built-in functions. Turn your objects into native-feeling data types.</em>
</div>

<h3>Core Dunder Protocol Categories</h3>

<ul>
  <li><strong>String Representation:</strong>
    <ul>
      <li><code>__str__</code>: Human-readable text returned by <code>print()</code> and <code>str()</code>.</li>
      <li><code>__repr__</code>: Detailed developer representation returned in the REPL and debugger. (Best practice: should look like valid Python code to recreate the object).</li>
    </ul>
  </li>
  <li><strong>Arithmetic Protocols:</strong> <code>__add__</code> (+), <code>__sub__</code> (-), <code>__mul__</code> (*), <code>__truediv__</code> (/).</li>
  <li><strong>Container Protocol:</strong> <code>__len__</code>, <code>__getitem__</code>, <code>__setitem__</code>, <code>__contains__</code> (enables <code>item in obj</code>!).</li>
  <li><strong>Context Managers:</strong> <code>__enter__</code> and <code>__exit__</code> (enables <code>with obj:</code>).</li>
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

  // Module 8: File Handling, Serialization & Context Managers
  'py-mod-files': {
    lessons: [
      {
        title: 'File I/O with Context Managers & JSON Serialization',
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
<h2>📁 Chapter 8: The Arcane Scrolls of I/O & Serialization</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Persistent storage and data transmission require converting volatile in-memory objects into serialized byte streams. Master context managers and the standard JSON engine.</em>
</div>

<h3>Context Managers: The <code>with</code> Statement (PEP 343)</h3>
<p>Opening files manually with <code>f = open("file.txt")</code> creates file descriptor leaks if exceptions occur before <code>f.close()</code> is reached. The <code>with</code> statement encapsulates the <strong>RAII (Resource Acquisition Is Initialization)</strong> pattern:</p>

<pre class="ascii-diagram">
+---------------------+
| with open(...) as f:| ----> Calls f.__enter__() (Acquires file descriptor)
+---------------------+
           |
           v
+---------------------+
|  Read/Write Data    | ----> Execute operations in protected block
+---------------------+
           |
           v
+---------------------+
| Block Exits / Error | ----> Calls f.__exit__() (Guaranteed closure even on crash!)
+---------------------+
</pre>

<h3>JSON vs Pickle: Security Considerations</h3>
<ul>
  <li><strong><code>json</code>:</strong> Human-readable, language-agnostic text serialization. Perfectly safe for untrusted network input.</li>
  <li><strong><code>pickle</code>:</strong> Python-specific binary serialization. <span style="color:var(--pink);">Never unpickle untrusted data!</span> Pickle can execute arbitrary malicious code via the <code>__reduce__</code> protocol during deserialization.</li>
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
<h2>🌐 Chapter 9: Astral Signals — Networking & Consuming REST APIs</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Modern software does not exist in isolation. Connect your Python programs to cloud web services, microservices, and external data feeds via REST protocols.</em>
</div>

<h3>HTTP Request/Response Architecture</h3>
<pre class="ascii-diagram">
Client (Python script)                       REST API Server
+-------------------------+                 +------------------------+
| GET /api/v1/players/42  | --------------> | Validates Token & Auth |
| Authorization: Bearer x |                 | Queries Database       |
+-------------------------+                 +------------------------+
                                                        |
+-------------------------+                             v
| 200 OK                  | &lt;-------------- | Serializes JSON        |
| {"id": 42, "xp": 9500}  |                 | Returns HTTP Response  |
+-------------------------+                 +------------------------+
</pre>

<h3>HTTP Status Code Families</h3>
<ul>
  <li><code>2xx (Success):</code> <code>200 OK</code>, <code>201 Created</code>, <code>204 No Content</code>.</li>
  <li><code>3xx (Redirection):</code> <code>301 Moved Permanently</code>, <code>304 Not Modified</code>.</li>
  <li><code>4xx (Client Error):</code> <code>400 Bad Request</code>, <code>401 Unauthorized</code>, <code>403 Forbidden</code>, <code>404 Not Found</code>, <code>429 Rate Limited</code>.</li>
  <li><code>5xx (Server Error):</code> <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>.</li>
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
        title: 'Vectorized Computing & Tabular Aggregations',
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
<h2>📊 Chapter 10: The Alchemical Laboratory — Data Science</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python is the undisputed king of Data Science and Machine Learning. Discover why libraries like NumPy and Pandas process millions of records in milliseconds through C-level vectorization.</em>
</div>

<h3>Why Vectorization Beats Pure Python Loops</h3>
<p>In standard Python, looping over a list of 10 million floats requires 10 million PyObject pointer lookups and type checks. In <strong>NumPy</strong>, numbers are stored in <strong>contiguous C memory buffers</strong>:</p>

<pre class="ascii-diagram">
Python List: [Pointer] -> [PyObject: 1.5]
             [Pointer] -> [PyObject: 2.5]   (Scattered in heap memory, cache misses)
             [Pointer] -> [PyObject: 3.5]

NumPy Array: | 1.5 | 2.5 | 3.5 | 4.5 | 5.5 | (Contiguous 64-bit IEEE floats, SIMD enabled)
</pre>

<p>By executing CPU <strong>SIMD (Single Instruction, Multiple Data)</strong> vector instructions, NumPy performs mathematical operations 50x to 100x faster than standard Python loops!</p>
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
        title: 'Modern API Architecture with FastAPI & Pydantic',
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
<h2>⚡ Chapter 11: The High-Speed Citadel — FastAPI Web Services</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>FastAPI has become the modern gold standard for Python backend engineering. Built on ASGI (Asynchronous Server Gateway Interface) and powered by Pydantic validation, it delivers Node/Go-level throughput with automatic Swagger UI documentation.</em>
</div>

<h3>The Three Pillars of FastAPI</h3>

<ol>
  <li><strong>Blazing Fast Asynchronous Engine (Starlette):</strong> Unlike older WSGI frameworks (Django, Flask) that block a thread per request, FastAPI runs on ASGI (via <strong>Uvicorn</strong>) utilizing non-blocking <code>async</code> / <code>await</code> event loops.</li>
  <li><strong>Type Safety & Validation (Pydantic):</strong> By simply annotating function signatures with Python types (<code>item: ItemSchema</code>), incoming JSON request bodies are automatically validated, coerced, and documented.</li>
  <li><strong>Automatic Interactive OpenAPI Docs:</strong> Zero configuration required! Visiting <code>/docs</code> serves a live interactive Swagger UI where frontend teams can test endpoints directly.</li>
</ol>

<pre class="ascii-diagram">
HTTP Request --> Uvicorn (ASGI) --> FastAPI Router --> Pydantic Validator --> Route Handler
                                                             |
                                                     [Invalid? 422 Unprocessable Entity]
                                                     [Valid? Process & return Response]
</pre>
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
