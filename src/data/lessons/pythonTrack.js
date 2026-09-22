// ─── Chronicles of Python: Path of the Serpent Sage ───────────────────────
// Comprehensive Retro-RPG Curriculum: Modules 1–11
// Beginner Foundations (Modules 1–6) & Advanced Ecosystem Electives (Modules 7–11)

export const pythonTrackContent = {
  "py-week-1": {
    "lessons": [
      {
        "title": "Zen of Python & The CPython Execution Engine",
        "language": "python",
        "starterCode": "# Welcome to the Chronicles of Python! 🐍\n# The print() function invokes the CPython standard output stream.\n\nprint(\"Hello, World!\")\nprint(\"Awakening the Serpent Sage in the CPython Archives...\")\n\n# Python executes line by line from top to bottom.\n# Comments start with a hash (#) and are ignored by the compiler.\n",
        "content": "\n<h2>🐍 Chapter 1: The Awakening of the Serpent Sage</h2>\n\n<div class=\"lesson-pixel-art\">\n  <img src=\"/images/pixel_python_sage.jpg\" alt=\"Python Serpent Sage in glowing ancient archives\" />\n  <div class=\"pixel-caption\">\n    🐍 SECTOR 00: THE EMERALD SERPENT SAGE AWAKENS IN THE CPYTHON ARCHIVES\n  </div>\n</div>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome, initiate of the Serpent Order. You enter the glowing ancient archives where human thought translates directly into executable computation. Before you command machine learning dragons and forge high-speed web citadels, you must master the Serpent's Sacred Grammar and understand how the CPython virtual engine brings your code to life.</em>\n</div>\n\n<p>Conceived in 1989 by the legendary software architect <strong>Guido van Rossum</strong> (the benevolent dictator for life, or BDFL), Python was designed with an uncompromising philosophy: <em>code is read far more frequently than it is written</em>. Unlike verbose tongues requiring heaps of boilerplate classes and semi-colons, Python expresses algorithms in pure, clean executable pseudo-code.</p>\n\n<h3>The Zen of Python (PEP 20)</h3>\n<p>Deep within the Python interpreter lies an ancient philosophical manifesto. If you enter <code>import this</code> into any Python console, the Zen reveals its tenet runes:</p>\n\n<ul>\n  <li><strong>Beautiful is better than ugly.</strong> Code should be an aesthetic joy to read.</li>\n  <li><strong>Explicit is better than implicit.</strong> No hidden magic; express intent with crystal clarity.</li>\n  <li><strong>Simple is better than complex.</strong> Prefer straightforward solutions before applying complex machinery.</li>\n  <li><strong>Readability counts.</strong> Clean indentation and intuitive naming preserve software longevity.</li>\n  <li><strong>Errors should never pass silently.</strong> Unless explicitly silenced with deliberate intent.</li>\n</ul>\n\n<h3>How Python Actually Executes: The CPython Pipeline</h3>\n<p>Many novices mistakenly believe Python is a \"purely interpreted\" script language. In reality, the standard Python runtime (<strong>CPython</strong>, written in C) is a compiled bytecode engine:</p>\n\n<pre class=\"ascii-diagram\">\n+---------------------+        +--------------------+        +---------------------+\n|   script.py         | -----> |   Parser & AST     | -----> |  CPython Bytecode   |\n| [Source Text Runes] |        | (Syntax Tree)      |        | (.pyc in __pycache__|\n+---------------------+        +--------------------+        +---------------------+\n                                                                        |\n                                                                        v\n+---------------------+        +--------------------+        +---------------------+\n| Operating System    | <----- |  C Runtime & Libs  | <----- | CPython Virtual VM  |\n| (CPU, Memory, I/O)  |        | (Memory Allocator) |        | (Evaluation Loop)   |\n+---------------------+        +--------------------+        +---------------------+\n</pre>\n\n<ol>\n  <li><strong>Lexing & Parsing:</strong> Source code is converted into tokens and assembled into an <em>Abstract Syntax Tree (AST)</em>.</li>\n  <li><strong>Bytecode Compilation:</strong> CPython compiles the AST into stack-based bytecode instructions, cached on disk as <code>.pyc</code> files in the <code>__pycache__</code> directory.</li>\n  <li><strong>The Virtual Machine:</strong> The CPython Virtual Machine executes these bytecode instructions one by one inside its main evaluation loop (<code>ceval.c</code>), protected by the <strong>Global Interpreter Lock (GIL)</strong>.</li>\n</ol>\n\n<div class=\"callout callout--tip\">\n  <strong>🔮 Sage Advice:</strong> Click <strong>▶ Run</strong> on the right pane to invoke the interpreter and witness your first incantation echo through the console!\n</div>\n        "
      },
      {
        "title": "Numbers, Arithmetic & The PyObject Memory Model",
        "language": "python",
        "starterCode": "# Python Math & Numbers: Precision Arithmetic\n\n# 1. Arbitrary-Precision Integers (Whole numbers)\ngold = 150\nenemies_defeated = 12\n\n# 2. Double-Precision Floating Points (IEEE 754)\nhealth = 98.5\ncrit_multiplier = 1.75\n\n# 3. Arithmetic Operations\ntotal_damage = 25 * crit_multiplier\nxp_per_enemy = 125 // 3    # Floor division (drops remainder)\nremaining_xp = 125 % 3     # Modulo (remainder)\npower_level = 2 ** 8       # Exponentiation (2 to the power of 8)\n\nprint(\"Total Damage:\", total_damage)\nprint(\"XP per Enemy (Floor):\", xp_per_enemy)\nprint(\"Remainder XP:\", remaining_xp)\nprint(\"Power Level (2^8):\", power_level)\n",
        "content": "\n<h2>🔢 Numbers & The PyObject Memory Architecture</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>In the kingdom of C or Java, an integer is a simple 32-bit slot in memory that overflows if it crosses 2,147,483,647. In Python, numbers are celestial beings called PyObjects. Learn how Python handles numbers of infinite size and why floating-point decimals require respect.</em>\n</div>\n\n<h3>The Anatomy of a Python Integer (PyLongObject)</h3>\n<p>In Python, <strong>everything is an object allocated on the heap</strong>. Even a tiny number like <code>42</code> is a full C structure:</p>\n\n<pre class=\"ascii-diagram\">\n           PyLongObject Memory Layout for integer 42\n+-------------------------------------------------------------+\n| ob_refcnt : 8 bytes (Reference count for Garbage Collection)|\n| ob_type   : 8 bytes (Pointer to &PyLong_Type class object)   |\n| ob_size   : 8 bytes (Sign and number of digit chunks)       |\n| ob_digit  : 4 bytes (The actual value digits array: [42])   |\n+-------------------------------------------------------------+\nTotal: 28 bytes for a single integer! (Compared to 4 bytes in C)\n</pre>\n\n<p><strong>Arbitrary Precision:</strong> Because Python stores digits in dynamic arrays, integers <em>never overflow</em>! You can calculate <code>2 ** 10000</code> without crashing. The only limit is your machine's physical RAM.</p>\n\n<div class=\"callout callout--info\">\n  <strong>🧠 The Small Integer Cache (-5 to 256):</strong> To avoid churning memory, CPython pre-allocates an array of singleton integer objects for numbers between <code>-5</code> and <code>256</code> when the interpreter boots. Comparing <code>a = 100</code> and <code>b = 100</code> with <code>a is b</code> yields <code>True</code> because both names point to the exact same physical heap address!\n</div>\n\n<h3>Floating-Point Numbers (IEEE 754)</h3>\n<p>Floats in Python represent double-precision decimal numbers. Because computers represent decimals in base-2 binary, certain fractional numbers cannot be represented with exact precision:</p>\n\n<pre><code>0.1 + 0.2  # Returns 0.30000000000000004!</code></pre>\n\n<div class=\"callout callout--warn\">\n  <strong>⚠️ Financial Caution:</strong> Never use standard <code>float</code> types for banking or currency calculations! Instead, import the standard library's <code>from decimal import Decimal</code> module for exact base-10 arithmetic.\n</div>\n\n<h3>Arithmetic Operators Master Table</h3>\n<table class=\"lesson-table\">\n  <thead><tr><th>Operator</th><th>Operation</th><th>Mathematical Example</th><th>CPython Dunder Method</th></tr></thead>\n  <tbody>\n    <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 5 = 15</code></td><td><code>__add__</code></td></tr>\n    <tr><td><code>-</code></td><td>Subtraction</td><td><code>20 - 8 = 12</code></td><td><code>__sub__</code></td></tr>\n    <tr><td><code>*</code></td><td>Multiplication</td><td><code>4 * 7 = 28</code></td><td><code>__mul__</code></td></tr>\n    <tr><td><code>/</code></td><td>True Float Division</td><td><code>7 / 2 = 3.5</code></td><td><code>__truediv__</code></td></tr>\n    <tr><td><code>//</code></td><td>Floor Division (truncates toward -infinity)</td><td><code>7 // 2 = 3</code></td><td><code>__floordiv__</code></td></tr>\n    <tr><td><code>%</code></td><td>Modulo (Remainder)</td><td><code>7 % 2 = 1</code></td><td><code>__mod__</code></td></tr>\n    <tr><td><code>**</code></td><td>Exponentiation (Power)</td><td><code>2 ** 8 = 256</code></td><td><code>__pow__</code></td></tr>\n  </tbody>\n</table>\n        "
      },
      {
        "title": "Strings, Slicing & Modern Formatted F-Strings",
        "language": "python",
        "starterCode": "# Python Strings, Immutability & Slicing\n\nhero_name = \"Kaelen Shadowblade\"\nrealm = \"Eldoria\"\nlevel = 14\n\n# String Slicing: [start:stop:step]\nfirst_name = hero_name[:6]\nlast_name = hero_name[7:]\n\n# String Methods (Return brand-new string objects)\nshout = hero_name.upper()\nclean = \"   extra whitespace   \".strip()\n\n# Formatted F-Strings (PEP 498 - Fast, Readable Interpolation)\nstatus_card = f\"⚔️ Hero: {hero_name} | Realm: {realm} | Level: {level}\"\n\nprint(\"First Name:\", first_name)\nprint(\"Last Name:\", last_name)\nprint(\"Shout:\", shout)\nprint(\"Cleaned:\", clean)\nprint(status_card)\n",
        "content": "\n<h2>📜 Strings, Immutability & Advanced Slicing</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Text in Python is not a mere array of ASCII bytes. Strings are immutable Unicode arrays capable of expressing every human language, math symbol, and emoji in existence. Learn the master art of string slicing and f-string interpolation.</em>\n</div>\n\n<h3>Strings are Immutable (Cannot Be Mutated in Place)</h3>\n<p>In Python, once a <code>str</code> object is allocated in memory, its characters <strong>can never be changed</strong>. If you attempt <code>s = \"Python\"; s[0] = \"J\"</code>, Python raises a <code>TypeError: 'str' object does not support item assignment</code>.</p>\n\n<p>Every operation that transforms a string (like <code>.upper()</code>, <code>.strip()</code>, or <code>.replace()</code>) builds a <strong>brand new string object</strong> in heap memory and returns a reference to it.</p>\n\n<h3>The Power of String Slicing: <code>[start:stop:step]</code></h3>\n<p>Slicing is one of Python's most elegant features. It allows you to extract sub-sequences without writing manual loops:</p>\n\n<pre class=\"ascii-diagram\">\nString:    ' P   y   t   h   o   n '\nPositive:    0   1   2   3   4   5\nNegative:   -6  -5  -4  -3  -2  -1\n</pre>\n\n<ul>\n  <li><code>word[0:2]</code> — Index 0 up to (excluding) 2: <code>'Py'</code></li>\n  <li><code>word[:4]</code> — From the start up to index 4: <code>'Pyth'</code></li>\n  <li><code>word[2:]</code> — From index 2 to the very end: <code>'thon'</code></li>\n  <li><code>word[-3:]</code> — The last 3 characters: <code>'hon'</code></li>\n  <li><code>word[::2]</code> — Every second character: <code>'Pto'</code></li>\n  <li><code>word[::-1]</code> — Step backwards by 1: <code>'nohtyP'</code> (Reverse in O(N) time!)</li>\n</ul>\n\n<h3>Formatted F-Strings (PEP 498)</h3>\n<p>Introduced in Python 3.6, formatted string literals (f-strings) evaluate expressions directly inside string literals at runtime. They are significantly faster than older <code>%</code> formatting or <code>.format()</code> methods because the bytecode compiler optimizes the expression evaluations directly into opcode instructions:</p>\n\n<pre><code>mana = 75\nmax_mana = 100\n# Format with inline calculations and precision specifiers:\nprint(f\"Mana: {mana}/{max_mana} ({mana / max_mana:.1%})\")\n# Output: Mana: 75/100 (75.0%)</code></pre>\n        "
      },
      {
        "title": "Booleans, Dynamic Namespaces & Type Casting",
        "language": "python",
        "starterCode": "# Booleans & Dynamic Type Casting\n\nis_warrior = True\nhas_magic = False\n\n# type() inspection reveals the underlying class\nprint(\"Type of is_warrior:\", type(is_warrior))\nprint(\"Type of 42:\", type(42))\nprint(\"Type of 'Hello':\", type(\"Hello\"))\n\n# Type Casting (Invoking the type constructor)\nraw_input_age = \"25\"         # str\nage = int(raw_input_age)     # converted to int\npi_str = str(3.14)           # converted to str\nis_online = bool(1)          # converted to bool (True)\n\nprint(\"Age next year:\", age + 1)\nprint(\"Is Online:\", is_online)\n",
        "content": "\n<h2>⚖️ Booleans, Dynamic Typing & Namespaces</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python is strongly and dynamically typed. Variables are not memory boxes; they are nametags bound to heap objects. Understand how Python looks up types and safely convert data between forms.</em>\n</div>\n\n<h3>Variables as Nametags (References)</h3>\n<p>In languages like C or C++, declaring <code>int x = 5</code> allocates a dedicated 4-byte box in memory labeled <code>x</code>. In Python, variables are <strong>references (pointers)</strong> bound to objects in the heap:</p>\n\n<pre class=\"ascii-diagram\">\nNamespace (Name Table)                   Heap Memory\n+--------------------+              +------------------------+\n| hero               | -----------> | PyUnicodeObject        |\n|                    |              | Value: \"Astra\"         |\n+--------------------+              +------------------------+\n                                                ^\n+--------------------+                          |\n| player_one         | -------------------------+ (Points to same object!)\n+--------------------+\n</pre>\n\n<p>When you reassign <code>hero = 100</code>, the nametag <code>hero</code> simply detaches from <code>\"Astra\"</code> and attaches to the <code>PyLongObject</code> for <code>100</code>. Python is <strong>strongly typed</strong> because it refuses to silently perform illogical operations (e.g. <code>\"5\" + 5</code> raises a <code>TypeError</code> rather than coercing into <code>\"55\"</code> like JavaScript).</p>\n\n<h3>Explicit Type Constructors (Casting)</h3>\n<ul>\n  <li><code>int(\"100\")</code> — Parses base-10 string into an integer. (Pass base as second arg: <code>int(\"1010\", 2) == 10</code>).</li>\n  <li><code>float(\"3.14\")</code> — Parses decimal string into an IEEE float.</li>\n  <li><code>str(12345)</code> — Converts any object into its string representation via <code>__str__</code>.</li>\n  <li><code>bool(x)</code> — Evaluates the truthiness of <code>x</code>.</li>\n</ul>\n        "
      },
      {
        "title": "String Slicing, Immutability & Text Glyph Sorcery",
        "language": "python",
        "starterCode": "# String Slicing: [start:stop:step]\nhero_name = \"ShadowSerpent\"\n\n# Extracting sub-strings\nguild = hero_name[0:6]        # \"Shadow\"\ntitle = hero_name[6:]         # \"Serpent\"\nreversed_name = hero_name[::-1] # Step of -1 reverses string!\n\nprint(\"Guild:\", guild)\nprint(\"Title:\", title)\nprint(\"Reversed:\", reversed_name)\n\n# String Methods\nspell = \"   ancient fire rune   \"\nprint(\"Cleaned:\", spell.strip().upper())\nprint(\"Replaced:\", spell.replace(\"fire\", \"lightning\").strip())\n",
        "content": "\n<h2>🐍 Chapter 5: String Slicing & Glyph Manipulation</h2>\n<p>In Python, strings are <strong>immutable sequences of Unicode code points</strong>. Once a string is inscribed in memory, its characters cannot be altered in-place. Any mutation returns a fresh string object.</p>\n\n<h3>The Power of Sequence Slicing: <code>[start:stop:step]</code></h3>\n<p>Sequence slicing is one of Python's most expressive syntactic spells. It allows you to carve sub-sequences effortlessly:</p>\n<ul>\n  <li><code>text[0:5]</code> — Extracts indices 0 through 4 (the stop index 5 is excluded).</li>\n  <li><code>text[:4]</code> — Omitting start defaults to 0.</li>\n  <li><code>text[4:]</code> — Omitting stop slices to the very end of the string.</li>\n  <li><code>text[::2]</code> — Takes every 2nd character across the sequence.</li>\n  <li><code>text[::-1]</code> — A negative step walks backwards, reversing the sequence in $O(N)$ time!</li>\n</ul>\n\n<h3>Essential String Methods</h3>\n<p>Python strings come equipped with powerful built-in transformations:</p>\n<ul>\n  <li><code>.strip()</code>, <code>.lstrip()</code>, <code>.rstrip()</code> — Strips leading/trailing whitespace or characters.</li>\n  <li><code>.split(sep)</code> — Splits text into a list of strings by delimiter.</li>\n  <li><code>\", \".join(list)</code> — Joins an iterable of strings with a delimiter (much faster than repeated <code>+</code> concatenation).</li>\n  <li><code>.startswith(prefix)</code> & <code>.endswith(suffix)</code> — Boolean checks.</li>\n</ul>\n"
      }
    ],
    "exercises": [
      {
        "title": "Player Welcome Greeting Generator",
        "language": "python",
        "description": "\n<p>Write a function <code>format_player_card(username, level, class_name)</code> that returns an f-string formatted exactly as:</p>\n<pre><code>Player [USERNAME] | Level [LEVEL] [CLASS_NAME]</code></pre>\n<p>For example: <code>format_player_card(\"CyberKnight\", 10, \"Mage\")</code> must return <code>\"Player CyberKnight | Level 10 Mage\"</code>.</p>\n        ",
        "starterCode": "def format_player_card(username, level, class_name):\n    # Return formatted f-string: \"Player {username} | Level {level} {class_name}\"\n    return f\"Player {username} | Level {level} {class_name}\"\n\n# Test run\nprint(format_player_card(\"CyberKnight\", 10, \"Mage\"))\n",
        "expectedOutput": "Player CyberKnight | Level 10 Mage",
        "hints": [
          "Use f\"Player {username} | Level {level} {class_name}\""
        ]
      },
      {
        "title": "Calculate Bill with Tip & Tax",
        "language": "python",
        "description": "\n<p>Write a function <code>calculate_total(bill_amount, tip_percent, tax_percent)</code> that calculates the grand total:</p>\n<p>Formula: <code>bill_amount + (bill_amount * (tip_percent / 100)) + (bill_amount * (tax_percent / 100))</code>.</p>\n<p>Round the result to 2 decimal places using <code>round(total, 2)</code>.</p>\n        ",
        "starterCode": "def calculate_total(bill_amount, tip_percent, tax_percent):\n    tip = bill_amount * (tip_percent / 100)\n    tax = bill_amount * (tax_percent / 100)\n    total = bill_amount + tip + tax\n    return round(total, 2)\n\nprint(\"Total Bill:\", calculate_total(100.0, 15.0, 8.0))\n",
        "expectedOutput": "Total Bill: 123.0",
        "hints": [
          "Compute tip and tax separately, sum with bill_amount, and round to 2 decimal places."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which of the following is an invalid Python variable name?",
        "options": [
          "user_score",
          "_private_val",
          "2nd_player",
          "player2"
        ],
        "correctIndex": 2,
        "explanation": "Variable names in Python cannot start with a numerical digit."
      },
      {
        "question": "What is the output of 17 // 4 in Python?",
        "options": [
          "4.25",
          "4",
          "1",
          "5"
        ],
        "correctIndex": 1,
        "explanation": "// is floor division, which drops the fractional part and returns 4."
      },
      {
        "question": "Which syntax creates a formatted string interpolating variable score in Python 3.6+?",
        "options": [
          "f\"Your score is {score}\"",
          "\"Your score is %s\" % score",
          "str(\"Your score is \" + score)",
          "`Your score is ${score}`"
        ],
        "correctIndex": 0,
        "explanation": "f\"...\" (f-strings) provide the standard modern formatting in Python."
      }
    ]
  },
  "py-week-2": {
    "lessons": [
      {
        "title": "Comparison Operators & Short-Circuit Boolean Logic",
        "language": "python",
        "starterCode": "# Comparison & Logical Operators in Python\n\nplayer_level = 25\nhas_boss_key = True\nis_poisoned = False\n\n# Comparison Operators: ==, !=, <, >, <=, >=\ncan_challenge_dungeon = player_level >= 20\n\n# Logical Operators: and, or, not\n# Python evaluates logical operators with short-circuiting!\ncan_enter_boss_room = player_level >= 20 and has_boss_key\nneeds_cure = is_poisoned or player_level < 5\nis_healthy = not is_poisoned\n\nprint(\"Can challenge dungeon:\", can_challenge_dungeon)\nprint(\"Can enter boss room:\", can_enter_boss_room)\nprint(\"Needs cure potion:\", needs_cure)\nprint(\"Is healthy:\", is_healthy)\n",
        "content": "\n<h2>🔀 Chapter 2: The Crossroads of Fate — Logic & Operators</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Every great program is a labyrinth of decisions. In Python, control flow is driven by clean English conjunctions: and, or, and not. Learn how short-circuit evaluation saves CPU cycles and protects your software from null pointer exceptions.</em>\n</div>\n\n<h3>Short-Circuit Evaluation: The Shield of Safety</h3>\n<p>Python evaluates logical expressions from left to right and terminates evaluation as soon as the outcome is mathematically guaranteed:</p>\n\n<ul>\n  <li><code>A and B</code> — If <code>A</code> is falsy, Python immediately returns <code>A</code> without evaluating <code>B</code>.</li>\n  <li><code>A or B</code> — If <code>A</code> is truthy, Python immediately returns <code>A</code> without evaluating <code>B</code>.</li>\n</ul>\n\n<div class=\"callout callout--tip\">\n  <strong>🛡️ The Guard Pattern:</strong> Short-circuiting allows safe attribute or key checks without crashing:\n  <pre><code>user = None\n# This will NOT raise AttributeError because user is None stops at the first check!\nif user is not None and user.is_active:\n    print(\"Welcome back!\")</code></pre>\n</div>\n\n<h3>Truth Values of <code>and</code> and <code>or</code></h3>\n<p>Unlike languages that strictly return <code>true</code> or <code>false</code>, Python's <code>and</code> and <code>or</code> return the <strong>actual operand value</strong> that decided the outcome:</p>\n<pre><code>x = \"Hero\" or \"Default\"  # Returns \"Hero\" (first truthy value)\ny = \"\" or \"Default\"      # Returns \"Default\" (since \"\" is falsy)\nz = [1, 2] and \"Success\" # Returns \"Success\" (both are truthy)</code></pre>\n        "
      },
      {
        "title": "Conditional Branching: if, elif, else & Match-Case",
        "language": "python",
        "starterCode": "# Conditional Branching in Python\n\nscore = 85\n\nif score >= 90:\n    grade = \"A+ (Master)\"\nelif score >= 80:\n    grade = \"B (Proficient)\"\nelif score >= 70:\n    grade = \"C (Apprentice)\"\nelse:\n    grade = \"F (Novice - Needs Practice)\"\n\nprint(f\"Final Grade: {grade}\")\n\n# Python 3.10+ Structural Pattern Matching (match-case)\ncommand = \"TELEPORT NORTH\"\nmatch command.split():\n    case [\"TELEPORT\", destination]:\n        print(f\"Warping directly to {destination}...\")\n    case [\"ATTACK\", target]:\n        print(f\"Striking {target}!\")\n    case _:\n        print(\"Unknown incantation.\")\n",
        "content": "\n<h2>🌿 Conditional Branching & Structural Pattern Matching</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python eliminates messy brackets and braces using four spaces of indentation. Explore chained conditionals and discover Python 3.10's modern superpower: Structural Pattern Matching (match-case).</em>\n</div>\n\n<h3>Indentation as Syntax (The Off-Side Rule)</h3>\n<p>In Python, blocks of code are defined strictly by whitespace indentation (PEP 8 standard is <strong>4 spaces</strong> per indentation level). This forces every Python codebase in the world to maintain clean visual structure.</p>\n\n<pre class=\"ascii-diagram\">\nif score >= 90:\n    [4 spaces] grade = \"A+\"    <-- Branch A\nelif score >= 80:\n    [4 spaces] grade = \"B\"     <-- Branch B\nelse:\n    [4 spaces] grade = \"C\"     <-- Fallback\n</pre>\n\n<h3>Modern Python 3.10+: <code>match-case</code> (PEP 634)</h3>\n<p>Traditional languages use primitive <code>switch</code> statements limited to integers or strings. Python's <code>match-case</code> is a full <strong>Structural Pattern Matcher</strong> capable of destructuring sequences, dictionaries, and class instances simultaneously:</p>\n\n<pre><code>def process_event(event):\n    match event:\n        case {\"type\": \"CLICK\", \"x\": x, \"y\": y}:\n            return f\"Clicked coordinates ({x}, {y})\"\n        case {\"type\": \"KEYPRESS\", \"key\": key} if key == \"ESCAPE\":\n            return \"Menu opened\"\n        case [first, *rest]:\n            return f\"List with head {first} and {len(rest)} tail items\"\n        case _:\n            return \"Unmatched pattern\"</code></pre>\n        "
      },
      {
        "title": "Truthy & Falsy Evaluation Internals",
        "language": "python",
        "starterCode": "# Truthy and Falsy evaluation\n\n# Falsy values in Python:\n# 0, 0.0, \"\", [], {}, set(), None, False\n\ninventory = []\nusername = \"ByteKnight\"\nunread_messages = 0\n\nif not inventory:\n    print(\"Your inventory is currently empty!\")\n\nif username:\n    print(f\"Logged in as {username}\")\n\nif unread_messages:\n    print(f\"You have {unread_messages} new messages.\")\nelse:\n    print(\"Inbox is all caught up!\")\n",
        "content": "\n<h2>💡 Truthy & Falsy Evaluation Mechanics</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>In Python, you rarely write <code>if len(items) > 0:</code> or <code>if is_active == True:</code>. Python evaluates the inherent truth value of any object automatically. Learn the rules of truthiness.</em>\n</div>\n\n<h3>The Complete Falsy Checklist</h3>\n<p>In Python, every object is either Truthy or Falsy. There are exactly six categories of Falsy objects; <strong>everything else in Python is Truthy</strong>:</p>\n\n<table class=\"lesson-table\">\n  <thead><tr><th>Falsy Category</th><th>Examples</th><th>Why It Is Falsy</th></tr></thead>\n  <tbody>\n    <tr><td>Boolean False</td><td><code>False</code></td><td>Native falsy boolean literal</td></tr>\n    <tr><td>Null Reference</td><td><code>None</code></td><td>Absence of a value</td></tr>\n    <tr><td>Zero Numbers</td><td><code>0</code>, <code>0.0</code>, <code>0j</code>, <code>Decimal(0)</code></td><td>Zero numerical quantity</td></tr>\n    <tr><td>Empty Sequences</td><td><code>\"\"</code> (str), <code>[]</code> (list), <code>()</code> (tuple)</td><td>Length is 0</td></tr>\n    <tr><td>Empty Mappings</td><td><code>{}</code> (dict), <code>set()</code></td><td>No keys / items</td></tr>\n    <tr><td>Custom Objects</td><td>Objects defining <code>__bool__() == False</code> or <code>__len__() == 0</code></td><td>Protocol hook</td></tr>\n  </tbody>\n</table>\n\n<div class=\"callout callout--tip\">\n  <strong>🐍 Pythonic Idiom:</strong> Instead of writing <code>if len(my_list) == 0:</code>, simply write <code>if not my_list:</code>. It is cleaner, faster, and idiomatic Python.\n</div>\n        "
      },
      {
        "title": "The Ternary Operator & Short-Circuit Boolean Evaluation",
        "language": "python",
        "starterCode": "# Ternary Conditional Expression: [value_if_true] if [condition] else [value_if_false]\nplayer_hp = 45\nstatus = \"Alive\" if player_hp > 0 else \"Fallen\"\nprint(\"Player Status:\", status)\n\n# Short-Circuit Evaluation:\n# 'and' stops at the first Falsy value\n# 'or' stops at the first Truthy value\nconfigured_port = None\ndefault_port = 8080\nactive_port = configured_port or default_port\nprint(\"Active Port:\", active_port)\n",
        "content": "\n<h2>🐍 Chapter 4: Ternary Operators & Short-Circuiting</h2>\n<p>Python provides elegant syntax to make decisions in a single expression using conditional expressions (ternary operator) and boolean short-circuit mechanics.</p>\n\n<h3>The Pythonic Ternary Syntax</h3>\n<pre class=\"language-python\"><code>result = \"Critical\" if damage > 100 else \"Standard\"</code></pre>\n<p>Unlike languages using <code>condition ? a : b</code>, Python reads naturally like English: return <em>A</em> if <em>Condition</em> holds, else return <em>B</em>.</p>\n\n<h3>Short-Circuit Boolean Evaluation</h3>\n<p>Python evaluates logical expressions from left to right and terminates evaluation the exact millisecond the outcome is guaranteed:</p>\n<ul>\n  <li><code>A and B</code> — If <code>A</code> is falsy, Python returns <code>A</code> immediately without evaluating <code>B</code>.</li>\n  <li><code>A or B</code> — If <code>A</code> is truthy, Python returns <code>A</code> immediately without evaluating <code>B</code>.</li>\n</ul>\n<p>This allows safe defensive patterns like <code>user and user.get_profile()</code> without throwing <code>AttributeError</code> when <code>user</code> is <code>None</code>.</p>\n"
      },
      {
        "title": "Defensive Programming, Assertions & Intro to Type Hints",
        "language": "python",
        "starterCode": "# Type Hints (PEP 484) & Assertions\ndef calculate_defense(armor_rating: int, shield_active: bool) -> float:\n    assert armor_rating >= 0, \"Armor rating cannot be negative!\"\n    multiplier: float = 1.5 if shield_active else 1.0\n    return armor_rating * multiplier\n\nprint(\"Defense Rating:\", calculate_defense(40, True))\n",
        "content": "\n<h2>🐍 Chapter 5: Defensive Programming & Type Hinting</h2>\n<p>As applications scale, defending functions against invalid state and communicating expected data contracts becomes vital for enterprise engineering.</p>\n\n<h3>Type Hints (PEP 484)</h3>\n<p>Since Python 3.5+, type annotations communicate expected parameter and return types to developers, IDEs, and static analyzers (like <code>mypy</code>):</p>\n<pre class=\"language-python\"><code>def heal_target(target_name: str, heal_amount: int) -> bool:\n    return True</code></pre>\n<p><em>Note:</em> Python does not enforce type annotations at runtime by default, maintaining its dynamic flexibility while empowering static linters.</p>\n\n<h3>Assertions for Internal Invariants</h3>\n<p>The <code>assert</code> statement tests internal assumptions during development:</p>\n<pre class=\"language-python\"><code>assert item_count >= 0, \"Inventory cannot be negative\"</code></pre>\n<p>If the condition evaluates to <code>False</code>, an <code>AssertionError</code> is raised immediately, halting corrupted state propagation.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Movie Ticket Tier Classifier",
        "language": "python",
        "description": "\n<p>Write a function <code>ticket_price(age)</code> that returns the ticket price based on age:</p>\n<ul>\n  <li>Age under 12: <code>8</code></li>\n  <li>Age 12 to 64: <code>15</code></li>\n  <li>Age 65 and older: <code>10</code></li>\n  <li>Age 65 and older: <code>10</code></li>\n</ul>\n        ",
        "starterCode": "def ticket_price(age):\n    if age < 12:\n        return 8\n    elif age <= 64:\n        return 15\n    else:\n        return 10\n\nprint(\"Age 8:\", ticket_price(8))\nprint(\"Age 25:\", ticket_price(25))\nprint(\"Age 70:\", ticket_price(70))\n",
        "expectedOutput": "Age 8: 8\nAge 25: 15\nAge 70: 10",
        "hints": [
          "Use if age < 12, elif age <= 64, else."
        ]
      },
      {
        "title": "Leap Year Validator",
        "language": "python",
        "description": "\n<p>Write a function <code>is_leap_year(year)</code> that returns <code>True</code> if the year is a leap year, otherwise <code>False</code>.</p>\n<p>Rules: A year is a leap year if it is divisible by 4, EXCEPT century years (divisible by 100) which must also be divisible by 400.</p>\n        ",
        "starterCode": "def is_leap_year(year):\n    if (year % 400 == 0):\n        return True\n    if (year % 100 == 0):\n        return False\n    return year % 4 == 0\n\nprint(\"2000:\", is_leap_year(2000))\nprint(\"1900:\", is_leap_year(1900))\nprint(\"2024:\", is_leap_year(2024))\n",
        "expectedOutput": "2000: True\n1900: False\n2024: True",
        "hints": [
          "Check year % 400 == 0 first, then year % 100 == 0, then year % 4 == 0."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which of the following values evaluates to False in a Python if condition?",
        "options": [
          "\"False\"",
          "[-1]",
          "0",
          "1"
        ],
        "correctIndex": 2,
        "explanation": "0 is a numeric zero and evaluates to Falsy. Non-empty strings like \"False\" are Truthy."
      },
      {
        "question": "What keyword represents \"else if\" in Python?",
        "options": [
          "elseif",
          "elsif",
          "elif",
          "else if"
        ],
        "correctIndex": 2,
        "explanation": "Python uses elif for conditional chaining."
      }
    ]
  },
  "py-week-3": {
    "lessons": [
      {
        "title": "The while Loop & Loop Invariants",
        "language": "python",
        "starterCode": "# The while loop executes as long as a condition evaluates to True\n\ncountdown = 5\n\nwhile countdown > 0:\n    print(f\"Launching in {countdown}...\")\n    countdown -= 1  # Decrement to prevent infinite loop!\n\nprint(\"🚀 Blastoff!\")\n\n# The while-else clause (Executes ONLY if loop completes without break)\ntarget = 7\ncurrent = 1\nwhile current < 5:\n    if current == target:\n        print(f\"Found {target}!\")\n        break\n    current += 1\nelse:\n    print(f\"Target {target} was not reached in loop iterations.\")\n",
        "content": "\n<h2>🔄 Chapter 3: The Cycles of Eternity — Loops & Invariants</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Repetition is the engine of automation. Explore how while loops maintain computational invariants and unlock the rare secret of Python's while-else construct.</em>\n</div>\n\n<h3>The Anatomy of a While Loop</h3>\n<p>A <code>while</code> loop repeatedly evaluates a conditional predicate before every iteration. As long as the predicate remains truthy, the indented suite executes:</p>\n\n<pre class=\"ascii-diagram\">\n        +-------------------+\n        | Evaluate Predicate|\n        +-------------------+\n              |       |\n      [True]  |       | [False]\n              v       v\n      +------------+  +-----------------+\n      | Loop Body  |  | Exit / else:    |\n      +------------+  +-----------------+\n              |\n              +---- Re-evaluate\n</pre>\n\n<h3>The Secret of <code>while-else</code> / <code>for-else</code></h3>\n<p>Python features a syntax construct found in almost no other major programming language: an <code>else</code> block attached directly to a loop! The <code>else</code> block executes <strong>only if the loop terminated naturally</strong> without hitting a <code>break</code> statement:</p>\n\n<pre><code># Searching for a prime factor\nn = 17\nd = 2\nwhile d * d <= n:\n    if n % d == 0:\n        print(f\"{n} is composite ({d} * {n // d})\")\n        break\n    d += 1\nelse:\n    print(f\"{n} is a prime number!\")</code></pre>\n        "
      },
      {
        "title": "The for Loop, range() & The Iterator Protocol",
        "language": "python",
        "starterCode": "# The for loop iterates over sequences, generators & ranges\n\n# 1. range(stop) -> 0 to 4\nprint(\"Count to 5:\")\nfor i in range(5):\n    print(i, end=\" \")\nprint()\n\n# 2. range(start, stop, step) -> 10 to 30 stepping by 5\nprint(\"\nMultiples of 5:\")\nfor val in range(10, 31, 5):\n    print(val, end=\" \")\nprint()\n\n# 3. Iterating over a string sequence\nprint(\"\nSpell out:\")\nfor char in \"Python\":\n    print(char, end=\"-\")\nprint()\n",
        "content": "\n<h2>🎯 The for Loop & The Iterator Protocol</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>In C or Java, a for loop is an arithmetic index counter (for int i = 0; i &lt; n; i++). In Python, every for loop is a sophisticated iterator consumer. Discover how Python streams data element by element.</em>\n</div>\n\n<h3>How Python's <code>for</code> Loop Works Under the Hood</h3>\n<p>When you write <code>for item in collection:</code>, Python executes the <strong>Iterator Protocol</strong>:</p>\n\n<ol>\n  <li>Python calls <code>iter(collection)</code>, which invokes <code>collection.__iter__()</code> to obtain an iterator object.</li>\n  <li>On each iteration, Python calls <code>next(iterator)</code>, which invokes <code>iterator.__next__()</code>.</li>\n  <li>When elements are exhausted, the iterator raises a <code>StopIteration</code> exception, which the <code>for</code> loop catches internally to gracefully terminate!</li>\n</ol>\n\n<h3>The <code>range()</code> Generator</h3>\n<p>In Python 3, <code>range(1_000_000)</code> does <strong>not</strong> create a list of one million integers in memory! Instead, it is an immutable sequence object that computes each number on the fly in <code>O(1)</code> memory.</p>\n        "
      },
      {
        "title": "Loop Control Flow: break, continue, pass",
        "language": "python",
        "starterCode": "# Loop Control Keywords\n\n# 1. break: Immediately terminates the innermost enclosing loop\nprint(\"Search for first multiple of 7:\")\nfor n in range(1, 25):\n    if n % 7 == 0:\n        print(f\"Found {n}!\")\n        break\n\n# 2. continue: Skips remainder of current iteration\nprint(\"\nPrint only odd numbers under 10:\")\nfor n in range(10):\n    if n % 2 == 0:\n        continue\n    print(n, end=\" \")\nprint()\n\n# 3. pass: Syntactic no-op placeholder\nclass UnfinishedFeature:\n    pass\n",
        "content": "\n<h2>⏹️ Master Loop Control: break, continue & pass</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Interrupt cycles at will. Use break to abandon search loops, continue to bypass unwanted iterations, and pass to create flawless architectural stubs.</em>\n</div>\n\n<ul>\n  <li><code>break</code> — Immediately breaks out of the innermost loop. The loop's optional <code>else:</code> block will <strong>not</strong> execute.</li>\n  <li><code>continue</code> — Immediately aborts the remaining statements in the current iteration and jumps to the next cycle.</li>\n  <li><code>pass</code> — A complete syntactic no-op. Because Python relies on indentation, an empty block (like an empty class or function) is a syntax error without <code>pass</code>.</li>\n</ul>\n        "
      },
      {
        "title": "The Dual Iteration Runes: enumerate() & zip()",
        "language": "python",
        "starterCode": "# enumerate() provides index alongside element\nspells = [\"Fireball\", \"Frost Nova\", \"Thunderclap\"]\nfor idx, spell in enumerate(spells, start=1):\n    print(f\"Slot {idx}: {spell}\")\n\n# zip() iterates multiple collections in parallel\nheroes = [\"Astra\", \"Vex\", \"Kaelen\"]\nlevels = [14, 22, 18]\nfor hero, lvl in zip(heroes, levels):\n    print(f\"Hero {hero} is Level {lvl}\")\n",
        "content": "\n<h2>🐍 Chapter 4: Pythonic Dual Iteration: enumerate & zip</h2>\n<p>Writing manual index counters (<code>i = 0; while i < len(arr): ... i += 1</code>) is an anti-pattern in modern Python. Python provides specialized built-in iterators for parallel and indexed loops.</p>\n\n<h3>Index Tracking with <code>enumerate(iterable, start=0)</code></h3>\n<p><code>enumerate()</code> wraps any iterable in an iterator of tuples containing <code>(index, element)</code>, completely eliminating the need for manual counter variables.</p>\n\n<h3>Parallel Traversal with <code>zip(*iterables)</code></h3>\n<p><code>zip()</code> aggregates elements from each of the iterables in lockstep, yielding tuples. It stops as soon as the shortest iterable is exhausted (or use <code>itertools.zip_longest</code> to pad with <code>None</code>).</p>\n"
      },
      {
        "title": "Iterators, The Iterator Protocol & The yield Generator Spell",
        "language": "python",
        "starterCode": "# Generators: Producing values lazily on-demand\ndef quest_xp_stream(base_xp, stages):\n    for stage in range(1, stages + 1):\n        yield base_xp * stage  # Yield pauses execution and preserves state!\n\n# Consume stream with a loop\nfor xp in quest_xp_stream(100, 3):\n    print(\"Awarded XP:\", xp)\n\n# Or generate infinitely without crashing memory!\ndef infinite_mana():\n    mana = 10\n    while True:\n        yield mana\n        mana += 10\n",
        "content": "\n<h2>🐍 Chapter 5: Generators & The Iterator Protocol</h2>\n<p>When processing massive datasets (gigabytes of log files, endless database streams), storing every item in memory simultaneously crashes the server. Enter <strong>Generators</strong> and <strong>Lazy Evaluation</strong>.</p>\n\n<h3>The Iterator Protocol</h3>\n<p>Any object in Python is an iterable if it implements <code>__iter__()</code>. An iterator implements <code>__next__()</code>, which returns the next item or raises <code>StopIteration</code> when exhausted.</p>\n\n<h3>The <code>yield</code> Keyword</h3>\n<p>When a function contains <code>yield</code>, it becomes a <strong>Generator Function</strong>. Calling it returns a generator object without executing the body immediately. When <code>next()</code> is called:</p>\n<ol>\n  <li>The function runs until it encounters a <code>yield</code> statement.</li>\n  <li>It produces the yielded value and <strong>freezes its entire execution state</strong> (local variables, instruction pointer).</li>\n  <li>On the subsequent <code>next()</code> call, execution resumes seamlessly from where it paused!</li>\n</ol>\n<p>Generators enable $O(1)$ memory consumption regardless of stream size.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Sum of Even Numbers in Range",
        "language": "python",
        "description": "\n<p>Write a function <code>sum_of_evens(n)</code> that returns the sum of all even integers between <code>1</code> and <code>n</code> inclusive.</p>\n        ",
        "starterCode": "def sum_of_evens(n):\n    total = 0\n    for num in range(1, n + 1):\n        if num % 2 == 0:\n            total += num\n    return total\n\nprint(\"Sum evens up to 10:\", sum_of_evens(10))\nprint(\"Sum evens up to 20:\", sum_of_evens(20))\n",
        "expectedOutput": "Sum evens up to 10: 30\nSum evens up to 20: 110",
        "hints": [
          "Use for num in range(2, n + 1, 2) or check num % 2 == 0."
        ]
      },
      {
        "title": "FizzBuzz Classic",
        "language": "python",
        "description": "\n<p>Write a function <code>fizz_buzz(n)</code> that returns a list of strings from <code>1</code> to <code>n</code> where:</p>\n<ul>\n  <li>Multiples of both 3 and 5 are <code>\"FizzBuzz\"</code></li>\n  <li>Multiples of 3 are <code>\"Fizz\"</code></li>\n  <li>Multiples of 5 are <code>\"Buzz\"</code></li>\n  <li>Other numbers are converted to string <code>str(num)</code></li>\n</ul>\n        ",
        "starterCode": "def fizz_buzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append(\"FizzBuzz\")\n        elif i % 3 == 0:\n            result.append(\"Fizz\")\n        elif i % 5 == 0:\n            result.append(\"Buzz\")\n        else:\n            result.append(str(i))\n    return result\n\nprint(\"FizzBuzz 15:\", fizz_buzz(15))\n",
        "expectedOutput": "FizzBuzz 15: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']",
        "hints": [
          "Check i % 15 == 0 first!"
        ]
      }
    ],
    "quiz": [
      {
        "question": "What does range(2, 8, 2) produce when converted to a list?",
        "options": [
          "[2, 4, 6, 8]",
          "[2, 4, 6]",
          "[2, 3, 4, 5, 6, 7]",
          "[4, 6, 8]"
        ],
        "correctIndex": 1,
        "explanation": "range stops before the stop value 8, yielding 2, 4, and 6."
      }
    ]
  },
  "py-week-4": {
    "lessons": [
      {
        "title": "Function Invocations, Return Values & First-Class Citizens",
        "language": "python",
        "starterCode": "# Functions package reusable logic and are first-class citizens in Python\n\ndef calculate_xp(level, multiplier=1.0):\n    \"\"\"Calculates total required XP for a player level.\"\"\"\n    base_xp = level * 100\n    return int(base_xp * multiplier)\n\nxp1 = calculate_xp(5)\nxp2 = calculate_xp(5, 1.5)\n\nprint(\"Level 5 Normal XP:\", xp1)\nprint(\"Level 5 Boosted XP:\", xp2)\n\n# First-class citizens: Functions can be stored in variables or passed as args!\ncalculator_fn = calculate_xp\nprint(\"Invoked via variable:\", calculator_fn(3, 2.0))\n",
        "content": "\n<h2>📦 Chapter 4: The Tome of Functions — Scopes & Invocations</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Functions in Python are not just procedures; they are first-class citizens. They can be passed as arguments, returned from other functions, stored in dictionaries, and adorned with decorators. Learn how to wield functional power.</em>\n</div>\n\n<h3>The LEGB Scoping Rule</h3>\n<p>When a variable name is referenced inside a function, Python searches four concentric scope rings in a strict hierarchy known as <strong>LEGB</strong>:</p>\n\n<pre class=\"ascii-diagram\">\n+-------------------------------------------------------+\n|  B - Built-in Scope (len, range, print, sum, int...)  |\n|   +-----------------------------------------------+   |\n|   |  G - Global Scope (Module-level definitions)  |   |\n|   |   +---------------------------------------+   |   |\n|   |   |  E - Enclosing Scope (Outer function) |   |   |\n|   |   |   +-------------------------------+   |   |   |\n|   |   |   |  L - Local Scope (This func)  |   |   |   |\n|   |   |   +-------------------------------+   |   |   |\n|   |   +---------------------------------------+   |   |\n|   +-----------------------------------------------+   |\n+-------------------------------------------------------+\n</pre>\n\n<ol>\n  <li><strong>Local (L):</strong> Names assigned inside the current function body.</li>\n  <li><strong>Enclosing (E):</strong> Names in the local scope of any enclosing/outer functions (closures).</li>\n  <li><strong>Global (G):</strong> Names declared at the top module level.</li>\n  <li><strong>Built-in (B):</strong> Names built into the Python language runtime.</li>\n</ol>\n        "
      },
      {
        "title": "Flexible Arguments: *args, **kwargs & The Mutable Default Trap",
        "language": "python",
        "starterCode": "# Arbitrary Arguments with *args and **kwargs\n\n# *args gathers extra positional arguments into an immutable tuple\ndef sum_all(*numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total\n\n# **kwargs gathers extra keyword arguments into a dictionary\ndef print_profile(username, **attributes):\n    print(f\"User: {username}\")\n    for key, val in attributes.items():\n        print(f\"  {key}: {val}\")\n\nprint(\"Sum:\", sum_all(10, 20, 30, 40))\nprint_profile(\"Astra\", role=\"Engineer\", location=\"Orbit\", level=42)\n",
        "content": "\n<h2>🤹 Flexible Parameters & The Mutable Default Argument Trap</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python functions can accept dynamic configurations through *args and **kwargs. But beware the most notorious rookie bug in Python history: the mutable default parameter.</em>\n</div>\n\n<h3>Arbitrary Argument Gathering</h3>\n<ul>\n  <li><code>*args</code> — Packs arbitrary positional parameters into an <strong>immutable tuple</strong>.</li>\n  <li><code>**kwargs</code> — Packs arbitrary keyword arguments (e.g. <code>role=\"Warrior\", hp=100</code>) into a <strong>standard dictionary</strong>.</li>\n</ul>\n\n<div class=\"callout callout--warn\">\n  <strong>⚠️ The Dangerous Mutable Default Argument Trap:</strong>\n  In Python, default arguments are evaluated <strong>once when the function is defined</strong>, NOT each time the function is called!\n  <pre><code># BUGGY: The same list is shared across all function invocations!\ndef add_player(name, team=[]):\n    team.append(name)\n    return team\n\nprint(add_player(\"Alice\"))  # ['Alice']\nprint(add_player(\"Bob\"))    # ['Alice', 'Bob'] <-- BUG! Alice is still in team!</code></pre>\n\n  <strong>The Pythonic Solution: Use None as Sentinel Value:</strong>\n  <pre><code>def add_player(name, team=None):\n    if team is None:\n        team = []\n    team.append(name)\n    return team</code></pre>\n</div>\n        "
      },
      {
        "title": "Arbitrary Argument Alchemy: *args and **kwargs Demystified",
        "language": "python",
        "starterCode": "# *args collects positional arguments into a Tuple\n# **kwargs collects keyword arguments into a Dictionary\n\ndef forge_party_buff(buff_name, *recipients, **attributes):\n    print(f\"Casting {buff_name} on {len(recipients)} heroes: {recipients}\")\n    print(\"Buff Attributes:\")\n    for key, value in attributes.items():\n        print(f\"  - {key}: +{value}\")\n\nforge_party_buff(\"Haste Aura\", \"Astra\", \"Vex\", speed=25, duration=60)\n",
        "content": "\n<h2>🐍 Chapter 3: Flexible Signatures with *args & **kwargs</h2>\n<p>Enterprise APIs often require functions that accept variable numbers of parameters. Python achieves this through unpacking operators.</p>\n\n<h3>Positional Unpacking with <code>*args</code></h3>\n<p>Prefixing a parameter with a single asterisk (<code>*args</code>) captures any excess positional arguments into a <strong>tuple</strong>.</p>\n\n<h3>Keyword Unpacking with <code>**kwargs</code></h3>\n<p>Prefixing with double asterisks (<code>**kwargs</code>) captures any excess keyword arguments into a <strong>dictionary</strong>.</p>\n\n<h3>Forwarding Arguments</h3>\n<p>This pattern is central to decorators, subclassing, and middleware:</p>\n<pre class=\"language-python\"><code>def wrapper(*args, **kwargs):\n    log_call()\n    return target_func(*args, **kwargs) # Unpack and forward!</code></pre>\n"
      },
      {
        "title": "First-Class Functions, Anonymous Lambdas & Lexical Closures",
        "language": "python",
        "starterCode": "# Functions are First-Class Citizens (can be passed, stored, returned)\ndef create_multiplier(factor):\n    # Lexical Closure: inner function remembers 'factor' from enclosing scope!\n    def multiply(x):\n        return x * factor\n    return multiply\n\ndouble = create_multiplier(2)\ntriple = create_multiplier(3)\n\nprint(\"Double 15:\", double(15))\nprint(\"Triple 15:\", triple(15))\n\n# Anonymous Lambda: lambda arguments: expression\nsquare = lambda x: x ** 2\nprint(\"Square 6:\", square(6))\n",
        "content": "\n<h2>🐍 Chapter 4: First-Class Functions, Lambdas & Closures</h2>\n<p>In Python, functions are first-class objects. You can assign functions to variables, store them in data structures, pass them as arguments to other functions, and return them from functions.</p>\n\n<h3>Lexical Closures</h3>\n<p>A <strong>closure</strong> occurs when an inner function retains access to variables in its enclosing scope even after the outer function has finished executing and returned. Closures enable data encapsulation and function factories.</p>\n\n<h3>Anonymous Functions: <code>lambda</code></h3>\n<p>Lambda expressions define small, one-line functions without an explicit name: <code>lambda x, y: x + y</code>. They are commonly used as keys for sorting: <code>items.sort(key=lambda item: item['price'])</code>.</p>\n"
      },
      {
        "title": "Function Decorators: Wrapping Spells with Syntactic Sugar (@)",
        "language": "python",
        "starterCode": "# Decorators: Functions that modify or enhance other functions\nimport time\n\ndef timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f\"[TIMER] {func.__name__} completed in {elapsed:.6f} seconds\")\n        return result\n    return wrapper\n\n@timer_decorator\ndef cast_complex_spell():\n    total = sum(i ** 2 for i in range(100000))\n    return total\n\nprint(\"Result:\", cast_complex_spell())\n",
        "content": "\n<h2>🐍 Chapter 5: Function Decorators (@syntax)</h2>\n<p>Decorators are one of Python's most elegant architectural patterns. A decorator is a callable that takes a function as input, extends its behavior, and returns a modified function.</p>\n\n<h3>How the <code>@decorator</code> Syntax Works</h3>\n<pre class=\"language-python\"><code>@my_decorator\ndef greet():\n    pass\n\n# Is identical to:\ngreet = my_decorator(greet)</code></pre>\n\n<h3>Real-World Applications</h3>\n<ul>\n  <li><strong>Logging & Telemetry:</strong> Record function arguments and timing automatically.</li>\n  <li><strong>Authentication & Authorization:</strong> Verify user session tokens before allowing access to an endpoint.</li>\n  <li><strong>Caching (Memoization):</strong> Store results of expensive computations using <code>functools.lru_cache</code>.</li>\n</ul>\n"
      }
    ],
    "exercises": [
      {
        "title": "Temperature Converter (Celsius & Fahrenheit)",
        "language": "python",
        "description": "\n<p>Write a function <code>convert_temp(value, to_unit=\"F\")</code>:</p>\n<ul>\n  <li>If <code>to_unit == \"F\"</code>: Converts Celsius to Fahrenheit using formula <code>(value * 9/5) + 32</code>.</li>\n  <li>If <code>to_unit == \"C\"</code>: Converts Fahrenheit to Celsius using formula <code>(value - 32) * 5/9</code>.</li>\n</ul>\n<p>Round result to 1 decimal place.</p>\n        ",
        "starterCode": "def convert_temp(value, to_unit=\"F\"):\n    if to_unit.upper() == \"F\":\n        return round((value * 9/5) + 32, 1)\n    else:\n        return round((value - 32) * 5/9, 1)\n\nprint(\"0 C to F:\", convert_temp(0, \"F\"))\nprint(\"100 C to F:\", convert_temp(100, \"F\"))\nprint(\"212 F to C:\", convert_temp(212, \"C\"))\n",
        "expectedOutput": "0 C to F: 32.0\n100 C to F: 212.0\n212 F to C: 100.0",
        "hints": [
          "Check to_unit.upper() == \"F\"."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the type of *args inside a Python function?",
        "options": [
          "list",
          "dict",
          "tuple",
          "set"
        ],
        "correctIndex": 2,
        "explanation": "*args packs arbitrary positional arguments into an immutable tuple."
      }
    ]
  },
  "py-week-5": {
    "lessons": [
      {
        "title": "Lists, Tuples, Dictionaries & Sets: Internal Architecture",
        "language": "python",
        "starterCode": "# Python Built-in Collections\n\n# 1. Lists (Ordered, mutable array of pointer references)\nspells = [\"Fireball\", \"Frost Nova\", \"Lightning Bolt\"]\nspells.append(\"Teleport\")\n\n# 2. Dictionaries (High-speed hash tables with O(1) average lookup)\nstats = {\"health\": 100, \"mana\": 50, \"armor\": 25}\nstats[\"mana\"] += 25\n\n# 3. Sets (Unique elements powered by hash tables)\nequipped_items = {\"Sword\", \"Shield\", \"Boots\"}\nequipped_items.add(\"Sword\")  # Duplicate ignored!\n\nprint(\"Spells:\", spells)\nprint(\"Stats:\", stats)\nprint(\"Unique Items:\", equipped_items)\n",
        "content": "\n<h2>🎒 Chapter 5: The Vault of Collections — Data Structures</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python provides four foundational collection primitives built directly into CPython. Understand their memory layout, amortized time complexities, and hash table internals.</em>\n</div>\n\n<h3>The Four Great Collection Archetypes</h3>\n\n<ol>\n  <li><strong>List (<code>[item1, item2]</code>):</strong> Dynamic array of object references. Supports <code>O(1)</code> indexed access and <code>O(1)</code> amortized append. Pre-allocates extra memory to prevent resizing on every insertion.</li>\n  <li><strong>Tuple (<code>(item1, item2)</code>):</strong> Immutable sequence. Because tuples cannot change size or contents, CPython optimizes them with minimal memory overhead. Tuples containing only hashable objects are themselves hashable and can be used as dictionary keys!</li>\n  <li><strong>Dictionary (<code>{key: value}</code>):</strong> High-performance hash table. Starting in Python 3.6, Python uses a <strong>compact dictionary layout</strong>:\n    <pre class=\"ascii-diagram\">\nHash Indices:  [-1,  0, -1,  1, -1]  <-- Sparse table of small integer indices\nEntries Array: [                     <-- Dense array storing insertion order!\n  {\"hash\": 1284, \"key\": \"health\", \"value\": 100},\n  {\"hash\": 9831, \"key\": \"mana\",   \"value\": 75}\n]\n    </pre>\n    This revolutionary architecture reduced dictionary memory consumption by 25% while preserving insertion order!\n  </li>\n  <li><strong>Set (<code>{item1, item2}</code>):</strong> Unordered collection of unique items. Backed by a hash table with dummy values, providing blazing fast <code>O(1)</code> membership testing (<code>if item in my_set:</code>).</li>\n</ol>\n        "
      },
      {
        "title": "List, Dict & Set Comprehensions vs Lazy Generators",
        "language": "python",
        "starterCode": "# Pythonic Comprehensions & Generator Expressions\n\n# 1. List Comprehension: [expression for item in iterable if condition]\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8]\neven_squares = [x ** 2 for x in numbers if x % 2 == 0]\n\n# 2. Dict Comprehension\nplayers = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = {name: len(name) * 10 for name in players}\n\n# 3. Generator Expression (Lazy Memory Streaming)\n# Notice parentheses instead of brackets: computes values on-demand!\nlazy_squares = (x ** 2 for x in range(1_000_000))\n\nprint(\"Even Squares:\", even_squares)\nprint(\"Scores Dict:\", scores)\nprint(\"First lazy value:\", next(lazy_squares))\nprint(\"Second lazy value:\", next(lazy_squares))\n",
        "content": "\n<h2>⚡ Comprehensions & Generator Expressions</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Transform and filter collections in a single expressive line. Compare eager memory allocation with lazy generator streaming.</em>\n</div>\n\n<h3>List Comprehensions vs Traditional Loops</h3>\n<p>Comprehensions are not merely syntax sugar; they execute at C-speed inside the CPython evaluation loop because they bypass repeated method calls to <code>.append()</code>:</p>\n\n<pre><code># Traditional loop (4 lines, slower attribute lookup)\nsquares = []\nfor x in range(10):\n    if x % 2 == 0:\n        squares.append(x * x)\n\n# Pythonic comprehension (1 line, C-level loop)\nsquares = [x * x for x in range(10) if x % 2 == 0]</code></pre>\n\n<h3>The Memory Showdown: Lists vs Generators</h3>\n<ul>\n  <li><code>[x for x in range(10_000_000)]</code> — Allocates an eager list in RAM consuming <strong>~80 Megabytes</strong> of memory.</li>\n  <li><code>(x for x in range(10_000_000))</code> — Creates an iterator generator object consuming only <strong>112 bytes</strong> of memory, streaming values one at a time via <code>next()</code>!</li>\n</ul>\n        "
      },
      {
        "title": "Sets, Set Operations & O(1) Hash-Table Lookups",
        "language": "python",
        "starterCode": "# Sets: Unordered collections of unique, hashable elements\nparty_a = {\"Astra\", \"Vex\", \"Kaelen\"}\nparty_b = {\"Vex\", \"Rowan\", \"Lyra\"}\n\n# Set Mathematical Operations\nprint(\"Union (All members):\", party_a | party_b)\nprint(\"Intersection (Common):\", party_a & party_b)\nprint(\"Difference (Only in A):\", party_a - party_b)\nprint(\"Symmetric Difference:\", party_a ^ party_b)\n\n# Fast Membership Testing: O(1) average time!\nprint(\"Is Astra in Party A?\", \"Astra\" in party_a)\n",
        "content": "\n<h2>🐍 Chapter 3: Sets & Hash-Table Architecture</h2>\n<p>A <code>set</code> in Python is an unordered collection of unique elements implemented under the hood as a hash table with dummy values. Because it uses hashing, testing <code>x in my_set</code> runs in average <strong>$O(1)$ constant time</strong>, compared to $O(N)$ for lists.</p>\n\n<h3>Core Mathematical Set Operations</h3>\n<ul>\n  <li><strong>Union (<code>|</code>):</strong> Combines elements from both sets.</li>\n  <li><strong>Intersection (<code>&</code>):</strong> Finds elements present in both sets.</li>\n  <li><strong>Difference (<code>-</code>):</strong> Finds elements in the left set but not the right.</li>\n  <li><strong>Symmetric Difference (<code>^</code>):</strong> Elements in either set, but not both.</li>\n</ul>\n"
      },
      {
        "title": "Dictionary Comprehensions & Advanced Key Transformations",
        "language": "python",
        "starterCode": "# Dictionary Comprehension: {key_expr: value_expr for item in iterable if condition}\nheroes = [\"Astra\", \"Vex\", \"Kaelen\", \"Lyra\"]\nlevels = [14, 28, 9, 35]\n\n# Pairing with zip()\nhero_roster = {hero: lvl for hero, lvl in zip(heroes, levels)}\nprint(\"Roster:\", hero_roster)\n\n# Filtering high-level champions\nveterans = {hero: lvl for hero, lvl in hero_roster.items() if lvl >= 20}\nprint(\"Veterans (>=20):\", veterans)\n",
        "content": "\n<h2>🐍 Chapter 4: Dictionary Comprehensions</h2>\n<p>Just as list comprehensions build lists concisely, dictionary comprehensions construct mappings with declarative elegance:</p>\n<pre class=\"language-python\"><code>squares = {x: x**2 for x in range(1, 6)}\n# Result: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}</code></pre>\n\n<h3>Inverting Dictionaries</h3>\n<p>Comprehensions make key-value inversions trivial:</p>\n<pre class=\"language-python\"><code>code_to_name = {200: \"OK\", 404: \"Not Found\"}\nname_to_code = {v: k for k, v in code_to_name.items()}</code></pre>\n"
      },
      {
        "title": "The collections Module: defaultdict, Counter & deque",
        "language": "python",
        "starterCode": "from collections import defaultdict, Counter, deque\n\n# 1. Counter: Frequency counting in O(N)\nloot_drops = [\"ruby\", \"gold\", \"ruby\", \"iron\", \"ruby\", \"gold\"]\ncounts = Counter(loot_drops)\nprint(\"Most common:\", counts.most_common(1))\n\n# 2. defaultdict: Auto-initializes missing keys\nguild_members = defaultdict(list)\nguild_members[\"Mages\"].append(\"Astra\")\nguild_members[\"Knights\"].append(\"Vex\")\nprint(\"Guild Roster:\", dict(guild_members))\n\n# 3. deque: O(1) double-ended queue (faster than list.pop(0))\nqueue = deque([\"Quest1\", \"Quest2\"])\nqueue.append(\"Quest3\")\ncompleted = queue.popleft()\nprint(\"Processed:\", completed)\n",
        "content": "\n<h2>🐍 Chapter 5: Advanced Collections: Counter, defaultdict, deque</h2>\n<p>The standard <code>collections</code> module provides high-performance container datatypes extending Python's basic <code>dict</code>, <code>list</code>, and <code>tuple</code>.</p>\n\n<h3>1. <code>Counter</code></h3>\n<p>Subclass of <code>dict</code> for counting hashable objects. Provides <code>.most_common(n)</code> and mathematical operations between counts.</p>\n\n<h3>2. <code>defaultdict</code></h3>\n<p>Calls a factory function (like <code>list</code>, <code>int</code>, or <code>set</code>) whenever a non-existent key is accessed, eliminating ugly <code>if key not in d: d[key] = []</code> checks.</p>\n\n<h3>3. <code>deque</code></h3>\n<p>Double-ended queue with $O(1)$ appends and pops from both ends. In contrast, <code>list.pop(0)</code> requires $O(N)$ memory shifts.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Word Frequency Map",
        "language": "python",
        "description": "\n<p>Write a function <code>word_frequency(sentence)</code> that takes a sentence, splits it into lowercase words, and returns a dictionary counting the frequency of each word.</p>\n        ",
        "starterCode": "def word_frequency(sentence):\n    counts = {}\n    words = sentence.lower().split()\n    for w in words:\n        counts[w] = counts.get(w, 0) + 1\n    return counts\n\nprint(word_frequency(\"apple banana apple orange banana apple\"))\n",
        "expectedOutput": "{'apple': 3, 'banana': 2, 'orange': 1}",
        "hints": [
          "Use dict.get(key, 0) + 1."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which collection does NOT permit duplicate elements in Python?",
        "options": [
          "list",
          "tuple",
          "set",
          "dict values"
        ],
        "correctIndex": 2,
        "explanation": "Sets enforce uniqueness; duplicate entries are automatically discarded."
      }
    ]
  },
  "py-week-6": {
    "lessons": [
      {
        "title": "Classes, Objects, self & Instance Dictionaries",
        "language": "python",
        "starterCode": "# Object-Oriented Programming (OOP) in Python\n\nclass Hero:\n    # Class attribute (shared across all instances via class namespace)\n    universe = \"Arcadia\"\n\n    # Constructor method (__init__ initializes newly allocated instances)\n    def __init__(self, name, role, health=100):\n        # Instance attributes stored in instance __dict__\n        self.name = name\n        self.role = role\n        self.health = health\n\n    def take_damage(self, amount):\n        self.health = max(0, self.health - amount)\n        print(f\"{self.name} took {amount} damage! HP: {self.health}\")\n\n# Creating instances\nhero1 = Hero(\"Astra\", \"Warrior\", 120)\nhero2 = Hero(\"Zephyr\", \"Rogue\", 85)\n\nhero1.take_damage(30)\nprint(f\"{hero1.name} belongs to universe: {hero1.universe}\")\nprint(\"Instance dictionary (__dict__):\", hero1.__dict__)\n",
        "content": "\n<h2>🏰 Chapter 6: Forging Object Golems — Classes & Namespaces</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Object-Oriented Programming binds state and logic into reusable blueprints. Explore how Python creates objects, unpacks self, and manages class vs instance namespaces.</em>\n</div>\n\n<h3>The Architecture of a Python Class</h3>\n<p>In Python, classes are themselves objects created by the <code>type</code> metaclass. When you define attributes inside a class, they live in the class's dictionary. When you instantiate an object, an instance dictionary (<code>__dict__</code>) is attached to it:</p>\n\n<pre class=\"ascii-diagram\">\nClass Hero (Hero.__dict__)\n+------------------------------------+\n| universe: \"Arcadia\"                |\n| take_damage: &lt;function take_damage&gt;|\n+------------------------------------+\n              ^\n              | (Fallback attribute lookup)\n              |\nInstance hero1 (hero1.__dict__)\n+------------------------------------+\n| name: \"Astra\", role: \"Warrior\"     |\n| health: 90                         |\n+------------------------------------+\n</pre>\n\n<h3>What is <code>self</code>?</h3>\n<p>Unlike languages that secretly pass a hidden <code>this</code> pointer behind the scenes, Python follows its Zen: <em>Explicit is better than implicit</em>. When you invoke <code>hero1.take_damage(30)</code>, Python translates it directly into:</p>\n<pre><code>Hero.take_damage(hero1, 30)</code></pre>\n<p>The <code>self</code> argument simply binds the specific instance into the first parameter position!</p>\n        "
      },
      {
        "title": "Instance vs Class Attributes & The __dict__ Namespace",
        "language": "python",
        "starterCode": "class GuildMember:\n    # Class attribute: Shared across all instances!\n    guild_name = \"Shadow Order\"\n    total_members = 0\n\n    def __init__(self, name, rank):\n        # Instance attributes: Unique to each individual object\n        self.name = name\n        self.rank = rank\n        GuildMember.total_members += 1\n\nm1 = GuildMember(\"Astra\", \"Arch-Mage\")\nm2 = GuildMember(\"Vex\", \"Vanguard\")\n\nprint(f\"Guild: {GuildMember.guild_name} | Total: {GuildMember.total_members}\")\nprint(\"m1 dictionary namespace:\", m1.__dict__)\n",
        "content": "\n<h2>🐍 Chapter 2: Class vs Instance Attributes & Namespaces</h2>\n<p>In Python, classes and instances are distinct namespaces represented internally by dictionaries (<code>__dict__</code>).</p>\n\n<h3>Class Attributes</h3>\n<p>Variables declared directly inside the class body are <strong>class attributes</strong>. They are stored on the class object and shared across every instance created.</p>\n\n<h3>Instance Attributes</h3>\n<p>Variables bound to <code>self</code> inside methods (typically <code>__init__</code>) are <strong>instance attributes</strong>, unique to each individual instance.</p>\n"
      },
      {
        "title": "Inheritance, Method Overriding & super() Cooperations",
        "language": "python",
        "starterCode": "class Character:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n\n    def attack(self):\n        return f\"{self.name} attacks with basic strike!\"\n\nclass Mage(Character):\n    def __init__(self, name, hp, mana):\n        super().__init__(name, hp) # Invoke parent constructor!\n        self.mana = mana\n\n    def attack(self):\n        # Override parent method\n        return f\"{self.name} casts Arcane Missile costing 10 mana!\"\n\nwizard = Mage(\"Kaelen\", 80, 150)\nprint(wizard.attack())\nprint(f\"HP: {wizard.hp}, Mana: {wizard.mana}\")\n",
        "content": "\n<h2>🐍 Chapter 3: Inheritance & super()</h2>\n<p>Inheritance allows classes to inherit behavior and attributes from base classes, promoting DRY (Don't Repeat Yourself) architecture.</p>\n\n<h3>Calling <code>super()</code></h3>\n<p><code>super()</code> delegates method calls to a parent or sibling class according to the class's <strong>Method Resolution Order (MRO)</strong>. It ensures base class initialization logic runs cleanly before child logic executes.</p>\n"
      },
      {
        "title": "Encapsulation, @property Decorators & Managed Getters/Setters",
        "language": "python",
        "starterCode": "class PlayerAccount:\n    def __init__(self, username, balance):\n        self.username = username\n        self._balance = balance # Protected attribute convention\n\n    @property\n    def balance(self):\n        \"\"\"Getter property: access like an attribute, not a method!\"\"\"\n        return self._balance\n\n    @balance.setter\n    def balance(self, amount):\n        \"\"\"Setter property: validates input before assigning!\"\"\"\n        if amount < 0:\n            raise ValueError(\"Balance cannot be negative!\")\n        self._balance = amount\n\nacc = PlayerAccount(\"PixelKnight\", 100)\nprint(\"Current Balance:\", acc.balance) # Calls getter!\nacc.balance = 250                      # Calls setter with validation!\nprint(\"Updated Balance:\", acc.balance)\n",
        "content": "\n<h2>🐍 Chapter 4: Encapsulation & The @property Decorator</h2>\n<p>In languages like Java, engineers write boilerplate <code>getBalance()</code> and <code>setBalance()</code> methods. Python embraces the <code>@property</code> decorator to provide clean attribute access backed by validation logic.</p>\n\n<h3>The <code>@property</code> Paradigm</h3>\n<p>When you decorate a method with <code>@property</code>, users access it without parentheses (<code>user.balance</code>). When they assign to it (<code>user.balance = 50</code>), the corresponding <code>@balance.setter</code> runs automatically, preventing invalid state.</p>\n"
      },
      {
        "title": "Dunder Magic: __repr__, __str__, __len__, and __eq__",
        "language": "python",
        "starterCode": "class InventoryBag:\n    def __init__(self, owner, items=None):\n        self.owner = owner\n        self.items = items or []\n\n    def __len__(self):\n        return len(self.items)\n\n    def __repr__(self):\n        return f\"InventoryBag(owner='{self.owner}', items={self.items})\"\n\n    def __eq__(self, other):\n        if not isinstance(other, InventoryBag):\n            return False\n        return self.items == other.items\n\nbag1 = InventoryBag(\"Astra\", [\"Potion\", \"Scroll\"])\nbag2 = InventoryBag(\"Clone\", [\"Potion\", \"Scroll\"])\n\nprint(\"Bag representation:\", repr(bag1))\nprint(\"Bag length:\", len(bag1))\nprint(\"Are bags equal?\", bag1 == bag2)\n",
        "content": "\n<h2>🐍 Chapter 5: Python Dunder (Double Underscore) Magic</h2>\n<p>Special methods surrounded by double underscores are affectionately known as <strong>dunder methods</strong>. They define how your custom classes interact with Python's built-in operators and functions.</p>\n\n<h3>Essential Dunder Methods</h3>\n<ul>\n  <li><code>__str__(self)</code> — Human-readable representation for <code>print()</code> and <code>str()</code>.</li>\n  <li><code>__repr__(self)</code> — Unambiguous, formal representation for developers and debuggers.</li>\n  <li><code>__len__(self)</code> — Invoked by <code>len(obj)</code>.</li>\n  <li><code>__eq__(self, other)</code> — Invoked by the <code>==</code> comparison operator.</li>\n  <li><code>__getitem__(self, key)</code> — Enables square bracket indexing: <code>obj[key]</code>.</li>\n</ul>\n"
      }
    ],
    "exercises": [
      {
        "title": "Bank Account Class Implementation",
        "language": "python",
        "description": "\n<p>Create a class <code>BankAccount</code> with an <code>__init__(self, owner, balance=0)</code> method.</p>\n<p>Implement methods:</p>\n<ul>\n  <li><code>deposit(amount)</code>: Adds amount to balance.</li>\n  <li><code>withdraw(amount)</code>: Subtracts amount if balance is sufficient, otherwise leaves balance unchanged.</li>\n  <li><code>get_balance()</code>: Returns current balance.</li>\n</ul>\n        ",
        "starterCode": "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n        return self.balance\n\n    def get_balance(self):\n        return self.balance\n\nacct = BankAccount(\"Alice\", 100)\nacct.deposit(50)\nacct.withdraw(30)\nprint(\"Alice Balance:\", acct.get_balance())\n",
        "expectedOutput": "Alice Balance: 120",
        "hints": [
          "Track self.balance inside each method."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the role of self in a Python class method?",
        "options": [
          "It is a required keyword for import statements",
          "It represents the specific instance of the class executing the method",
          "It denotes a static method",
          "It refers to the base class"
        ],
        "correctIndex": 1,
        "explanation": "self refers to the instance currently invoking the method."
      }
    ],
    "project": {
      "title": "Text-Based Inventory & Hero Quest Simulator",
      "language": "python",
      "description": "\n<p>Implement an object-oriented Text Adventure inventory system:</p>\n<ul>\n  <li>Create an <code>Item(name, value, weight)</code> class.</li>\n  <li>Create an <code>Inventory(max_weight)</code> class with <code>add_item</code>, <code>remove_item</code>, and <code>total_value</code>.</li>\n</ul>\n      ",
      "starterCode": "class Item:\n    def __init__(self, name, value, weight):\n        self.name = name\n        self.value = value\n        self.weight = weight\n\nclass Inventory:\n    def __init__(self, max_weight):\n        self.max_weight = max_weight\n        self.items = []\n\n    def add_item(self, item):\n        current_weight = sum(i.weight for i in self.items)\n        if current_weight + item.weight <= self.max_weight:\n            self.items.append(item)\n            return True\n        return False\n\n    def get_total_value(self):\n        return sum(i.value for i in self.items)\n\n# Test\nbag = Inventory(20)\nbag.add_item(Item(\"Gold Ring\", 50, 1))\nbag.add_item(Item(\"Iron Sword\", 120, 10))\nprint(\"Inventory Total Value:\", bag.get_total_value())\n",
      "requirements": [
        "Item class stores name, value, and weight",
        "Inventory validates max_weight limit",
        "get_total_value computes cumulative value correctly"
      ]
    }
  },
  "py-mod-oop": {
    "lessons": [
      {
        "title": "Inheritance, Polymorphism & The MRO (Method Resolution Order)",
        "language": "python",
        "starterCode": "# Advanced OOP: Inheritance, Polymorphism & super()\n\nclass Character:\n    def __init__(self, name, health):\n        self.name = name\n        self.health = health\n\n    def attack(self):\n        return f\"{self.name} strikes with basic attack!\"\n\nclass Mage(Character):\n    def __init__(self, name, health, mana):\n        super().__init__(name, health)  # Delegate to parent constructor\n        self.mana = mana\n\n    def attack(self):\n        return f\"{self.name} casts Arcane Blast using {self.mana} mana!\"\n\nm = Mage(\"Merlin\", 80, 100)\nprint(m.attack())\nprint(\"Method Resolution Order (MRO):\", [cls.__name__ for cls in Mage.__mro__])\n",
        "content": "\n<h2>🧬 Chapter 7: The Master Architect — Advanced OOP & MRO</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Enter the advanced realm of object inheritance. Learn how Python resolves method calls in complex class hierarchies using the C3 Linearization algorithm and write clean, cooperative multiple inheritance.</em>\n</div>\n\n<h3>Method Resolution Order (MRO) with C3 Linearization</h3>\n<p>When a method is called on an instance, Python must determine which class in the inheritance chain provides the implementation. It traverses the class's <strong>MRO tuple</strong> (inspectable via <code>ClassName.__mro__</code>).</p>\n\n<p>Python utilizes the <strong>C3 Linearization algorithm</strong> (introduced in Python 2.3) to resolve the diamond inheritance problem, guaranteeing two fundamental properties:</p>\n<ol>\n  <li><strong>Subclasses come before parent classes.</strong></li>\n  <li><strong>Order of appearance in the inheritance tuple is strictly preserved.</strong></li>\n</ol>\n        "
      },
      {
        "title": "Magic Dunder Protocols & Operator Overloading",
        "language": "python",
        "starterCode": "# Magic / Dunder Methods: Hooking into Python's Operator Protocols\n\nclass Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    # String representation for end-users: print(v)\n    def __str__(self):\n        return f\"Vector({self.x}, {self.y})\"\n\n    # Formal unambiguous representation for debugging: repr(v)\n    def __repr__(self):\n        return f\"Vector2D(x={self.x}, y={self.y})\"\n\n    # Operator overloading: v1 + v2\n    def __add__(self, other):\n        return Vector2D(self.x + other.x, self.y + other.y)\n\n    # Equality comparison: v1 == v2\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\nv1 = Vector2D(3, 4)\nv2 = Vector2D(1, 2)\nv3 = v1 + v2\n\nprint(\"v1 + v2 =\", v3)\nprint(\"Is v1 == v2?\", v1 == v2)\n",
        "content": "\n<h2>🪄 Dunder Magic Protocols & Operator Overloading</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Double-underscore (dunder) methods allow custom classes to integrate seamlessly with Python's core operators and built-in functions. Turn your objects into native-feeling data types.</em>\n</div>\n\n<h3>Core Dunder Protocol Categories</h3>\n\n<ul>\n  <li><strong>String Representation:</strong>\n    <ul>\n      <li><code>__str__</code>: Human-readable text returned by <code>print()</code> and <code>str()</code>.</li>\n      <li><code>__repr__</code>: Detailed developer representation returned in the REPL and debugger. (Best practice: should look like valid Python code to recreate the object).</li>\n    </ul>\n  </li>\n  <li><strong>Arithmetic Protocols:</strong> <code>__add__</code> (+), <code>__sub__</code> (-), <code>__mul__</code> (*), <code>__truediv__</code> (/).</li>\n  <li><strong>Container Protocol:</strong> <code>__len__</code>, <code>__getitem__</code>, <code>__setitem__</code>, <code>__contains__</code> (enables <code>item in obj</code>!).</li>\n  <li><strong>Context Managers:</strong> <code>__enter__</code> and <code>__exit__</code> (enables <code>with obj:</code>).</li>\n</ul>\n        "
      },
      {
        "title": "Abstract Base Classes (abc) & Interface Enforcements",
        "language": "python",
        "starterCode": "from abc import ABC, abstractmethod\n\nclass PaymentProcessor(ABC):\n    @abstractmethod\n    def process_payment(self, amount: float) -> bool:\n        \"\"\"Subclasses MUST implement this method!\"\"\"\n        pass\n\nclass StripeProcessor(PaymentProcessor):\n    def process_payment(self, amount: float) -> bool:\n        print(f\"Processing ${amount} via Stripe Gateway...\")\n        return True\n\n# processor = PaymentProcessor() # Would raise TypeError: Cannot instantiate abstract class!\nstripe = StripeProcessor()\nstripe.process_payment(99.50)\n",
        "content": "\n<h2>⚡ Chapter 3: Abstract Base Classes (ABC)</h2>\n<p>Python provides the <code>abc</code> module to define formal interfaces and abstract contracts. By inheriting from <code>ABC</code> and annotating methods with <code>@abstractmethod</code>, you guarantee that concrete subclasses cannot be instantiated unless they provide implementations.</p>\n"
      },
      {
        "title": "Multiple Inheritance & Method Resolution Order (MRO)",
        "language": "python",
        "starterCode": "class A:\n    def greet(self):\n        return \"Greeting from A\"\n\nclass B(A):\n    def greet(self):\n        return \"Greeting from B\"\n\nclass C(A):\n    def greet(self):\n        return \"Greeting from C\"\n\nclass D(B, C):\n    pass\n\nd = D()\nprint(\"Resolved Greeting:\", d.greet())\nprint(\"MRO Lookup Chain:\", [cls.__name__ for cls in D.mro()])\n",
        "content": "\n<h2>⚡ Chapter 4: Multiple Inheritance & C3 Linearization (MRO)</h2>\n<p>Python supports multiple inheritance. When two parent classes share a common ancestor (the Diamond Problem), Python uses the <strong>C3 Linearization algorithm</strong> to produce a deterministic Method Resolution Order (<code>__mro__</code>).</p>\n"
      },
      {
        "title": "Metaclasses & Class Creation Mechanics in Python",
        "language": "python",
        "starterCode": "# In Python, classes themselves are instances of metaclasses!\n# 'type' is the default metaclass that creates classes.\n\n# Dynamic class creation using type(name, bases, dict)\nHero = type(\"Hero\", (), {\"power\": 100, \"attack\": lambda self: \"Attacking!\"})\n\nh = Hero()\nprint(\"Dynamically created class:\", type(h))\nprint(\"Power:\", h.power)\nprint(h.attack())\n",
        "content": "\n<h2>⚡ Chapter 5: Metaclasses — The Code That Writes Classes</h2>\n<p>Just as an object is an instance of a class, in Python, a class is an instance of a <strong>metaclass</strong>. By default, classes are created by <code>type</code>. Metaclasses let framework authors inspect, modify, or register classes at the moment they are declared.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Vector Magnitude and Dunder Methods",
        "language": "python",
        "description": "\n<p>Extend the <code>Vector2D</code> class to implement <code>__sub__(self, other)</code> which subtracts vectors: <code>Vector2D(self.x - other.x, self.y - other.y)</code>.</p>\n        ",
        "starterCode": "class Vector2D:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __sub__(self, other):\n        return Vector2D(self.x - other.x, self.y - other.y)\n\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\nv1 = Vector2D(10, 8)\nv2 = Vector2D(4, 3)\nprint(\"Subtraction:\", v1 - v2)\n",
        "expectedOutput": "Subtraction: (6, 5)",
        "hints": [
          "Implement def __sub__(self, other): return Vector2D(self.x - other.x, self.y - other.y)"
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which dunder method allows an object to define its length when len() is called?",
        "options": [
          "__size__",
          "__count__",
          "__len__",
          "__length__"
        ],
        "correctIndex": 2,
        "explanation": "__len__ is the standard protocol hooked by len()."
      }
    ]
  },
  "py-mod-files": {
    "lessons": [
      {
        "title": "File I/O with Context Managers & JSON Serialization",
        "language": "python",
        "starterCode": "# File Handling and JSON serialization\n\nimport json\n\n# Sample configuration dictionary\nconfig_data = {\n    \"app_name\": \"CyberQuest\",\n    \"version\": \"2.4.0\",\n    \"debug_mode\": True,\n    \"max_connections\": 100\n}\n\n# 1. Serializing dict to JSON string\njson_str = json.dumps(config_data, indent=2)\nprint(\"JSON Output:\")\nprint(json_str)\n\n# 2. Parsing JSON string back to Python dict\nparsed_data = json.loads(json_str)\nprint(\"\nParsed App Name:\", parsed_data[\"app_name\"])\n",
        "content": "\n<h2>📁 Chapter 8: The Arcane Scrolls of I/O & Serialization</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Persistent storage and data transmission require converting volatile in-memory objects into serialized byte streams. Master context managers and the standard JSON engine.</em>\n</div>\n\n<h3>Context Managers: The <code>with</code> Statement (PEP 343)</h3>\n<p>Opening files manually with <code>f = open(\"file.txt\")</code> creates file descriptor leaks if exceptions occur before <code>f.close()</code> is reached. The <code>with</code> statement encapsulates the <strong>RAII (Resource Acquisition Is Initialization)</strong> pattern:</p>\n\n<pre class=\"ascii-diagram\">\n+---------------------+\n| with open(...) as f:| ----> Calls f.__enter__() (Acquires file descriptor)\n+---------------------+\n           |\n           v\n+---------------------+\n|  Read/Write Data    | ----> Execute operations in protected block\n+---------------------+\n           |\n           v\n+---------------------+\n| Block Exits / Error | ----> Calls f.__exit__() (Guaranteed closure even on crash!)\n+---------------------+\n</pre>\n\n<h3>JSON vs Pickle: Security Considerations</h3>\n<ul>\n  <li><strong><code>json</code>:</strong> Human-readable, language-agnostic text serialization. Perfectly safe for untrusted network input.</li>\n  <li><strong><code>pickle</code>:</strong> Python-specific binary serialization. <span style=\"color:var(--pink);\">Never unpickle untrusted data!</span> Pickle can execute arbitrary malicious code via the <code>__reduce__</code> protocol during deserialization.</li>\n</ul>\n        "
      },
      {
        "title": "Context Managers & The Arcane with Statement Protocol",
        "language": "python",
        "starterCode": "# Custom Context Manager implementing __enter__ and __exit__\nclass DatabaseTransaction:\n    def __enter__(self):\n        print(\"[DB] Starting transaction...\")\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type:\n            print(f\"[DB] Error occurred: {exc_val}. Rolling back!\")\n        else:\n            print(\"[DB] Transaction committed successfully!\")\n        return False # Propagate exception if any\n\nwith DatabaseTransaction():\n    print(\"Executing query operations...\")\n",
        "content": "\n<h2>⚡ Chapter 2: Context Managers & The with Statement Protocol</h2>\n<p>The <code>with</code> statement guarantees cleanup of critical resources (file handles, database connections, locks) even if an unhandled exception crashes the block.</p>\n"
      },
      {
        "title": "Structured Data Serialization: CSV & JSON Alchemy",
        "language": "python",
        "starterCode": "import json\nimport csv\nimport io\n\n# JSON Serialization: dumps() and loads()\nplayer_data = {\"handle\": \"CyberMage\", \"level\": 12, \"inventory\": [\"Orb\", \"Staff\"]}\njson_str = json.dumps(player_data, indent=2)\nprint(\"Serialized JSON:\\n\", json_str)\n\n# Parsing JSON back to Python dictionary\nparsed = json.loads(json_str)\nprint(\"Decoded Handle:\", parsed[\"handle\"])\n",
        "content": "\n<h2>⚡ Chapter 3: JSON & CSV Serialization</h2>\n<p>Python's built-in <code>json</code> and <code>csv</code> modules convert in-memory objects to and from standardized text formats for storage, network APIs, and data interchange.</p>\n"
      },
      {
        "title": "Binary Streams, Bytes & Object Serialization with Pickle",
        "language": "python",
        "starterCode": "import pickle\n\n# Serializing complex Python objects into binary streams\nclass GameSave:\n    def __init__(self, checkpoint, score):\n        self.checkpoint = checkpoint\n        self.score = score\n\nsave = GameSave(\"Dungeon Floor 5\", 9400)\nserialized_bytes = pickle.dumps(save)\nprint(f\"Serialized to {len(serialized_bytes)} binary bytes\")\n\nrestored = pickle.loads(serialized_bytes)\nprint(f\"Restored Checkpoint: {restored.checkpoint}, Score: {restored.score}\")\n",
        "content": "\n<h2>⚡ Chapter 4: Binary Streams & Pickle Serialization</h2>\n<p>The <code>pickle</code> module serializes arbitrary Python objects into compact binary byte streams. Unlike JSON (which only supports primitive mappings), pickle serializes custom classes, functions, and object graphs.</p>\n"
      },
      {
        "title": "Modern Cross-Platform Path Handling with pathlib",
        "language": "python",
        "starterCode": "from pathlib import Path\n\n# Modern object-oriented path handling\nproject_dir = Path(\"codedex/src\")\nconfig_file = project_dir / \"config.json\" # Forward slash operator joins paths!\n\nprint(\"Path:\", config_file)\nprint(\"File Name:\", config_file.name)\nprint(\"File Suffix:\", config_file.suffix)\nprint(\"Parent Directory:\", config_file.parent)\n",
        "content": "\n<h2>⚡ Chapter 5: Modern Path Manipulation with pathlib</h2>\n<p>Introduced in Python 3.4, <code>pathlib.Path</code> replaces legacy <code>os.path</code> functions with an object-oriented API that works transparently across Windows, macOS, and Linux.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Parse and Filter JSON Payload",
        "language": "python",
        "description": "\n<p>Write a function <code>get_active_usernames(json_payload)</code> that accepts a JSON string containing a list of user dicts (with keys <code>\"username\"</code> and <code>\"active\"</code>) and returns a list of usernames whose <code>\"active\"</code> flag is <code>True</code>.</p>\n        ",
        "starterCode": "import json\n\ndef get_active_usernames(json_payload):\n    users = json.loads(json_payload)\n    return [u[\"username\"] for u in users if u.get(\"active\") is True]\n\npayload = '[{\"username\": \"alice\", \"active\": true}, {\"username\": \"bob\", \"active\": false}, {\"username\": \"carol\", \"active\": true}]'\nprint(\"Active Users:\", get_active_usernames(payload))\n",
        "expectedOutput": "Active Users: ['alice', 'carol']",
        "hints": [
          "Use json.loads(json_payload) and list comprehension."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is using \"with open(...) as f:\" preferred over manual f = open() in Python?",
        "options": [
          "It makes the file read twice as fast",
          "It automatically closes the file even if exceptions occur",
          "It enables binary mode by default",
          "It bypasses OS file permissions"
        ],
        "correctIndex": 1,
        "explanation": "Context managers guarantee cleanup and file closure even during runtime errors."
      }
    ]
  },
  "py-mod-api": {
    "lessons": [
      {
        "title": "HTTP Methods, REST Architecture & Requests",
        "language": "python",
        "starterCode": "# Consuming and Working with REST APIs in Python\n\nimport json\n\n# Simulating an API response from a REST endpoint\nsimulated_api_response = {\n    \"status\": 200,\n    \"data\": {\n        \"user_id\": 4042,\n        \"username\": \"NeoMatrix\",\n        \"rank\": \"Architect\",\n        \"badges\": [\"Python Pro\", \"FastAPI Pioneer\"]\n    }\n}\n\n# Parsing API data\nif simulated_api_response[\"status\"] == 200:\n    user = simulated_api_response[\"data\"]\n    print(f\"User #{user['user_id']}: {user['username']} ({user['rank']})\")\n    print(f\"Badges: {', '.join(user['badges'])}\")\nelse:\n    print(\"Failed to fetch API data.\")\n",
        "content": "\n<h2>🌐 Chapter 9: Astral Signals — Networking & Consuming REST APIs</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Modern software does not exist in isolation. Connect your Python programs to cloud web services, microservices, and external data feeds via REST protocols.</em>\n</div>\n\n<h3>HTTP Request/Response Architecture</h3>\n<pre class=\"ascii-diagram\">\nClient (Python script)                       REST API Server\n+-------------------------+                 +------------------------+\n| GET /api/v1/players/42  | --------------> | Validates Token & Auth |\n| Authorization: Bearer x |                 | Queries Database       |\n+-------------------------+                 +------------------------+\n                                                        |\n+-------------------------+                             v\n| 200 OK                  | &lt;-------------- | Serializes JSON        |\n| {\"id\": 42, \"xp\": 9500}  |                 | Returns HTTP Response  |\n+-------------------------+                 +------------------------+\n</pre>\n\n<h3>HTTP Status Code Families</h3>\n<ul>\n  <li><code>2xx (Success):</code> <code>200 OK</code>, <code>201 Created</code>, <code>204 No Content</code>.</li>\n  <li><code>3xx (Redirection):</code> <code>301 Moved Permanently</code>, <code>304 Not Modified</code>.</li>\n  <li><code>4xx (Client Error):</code> <code>400 Bad Request</code>, <code>401 Unauthorized</code>, <code>403 Forbidden</code>, <code>404 Not Found</code>, <code>429 Rate Limited</code>.</li>\n  <li><code>5xx (Server Error):</code> <code>500 Internal Server Error</code>, <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code>.</li>\n</ul>\n        "
      },
      {
        "title": "HTTP Anatomy: Verbs, Status Codes & Query Parameters",
        "language": "python",
        "starterCode": "# Understanding REST & HTTP Protocols in Python\n# GET: Retrieve data | POST: Create resource | PUT: Replace | DELETE: Remove\n\nclass MockHTTPResponse:\n    def __init__(self, status_code, body):\n        self.status_code = status_code\n        self.body = body\n\n    @property\n    def is_success(self):\n        return 200 <= self.status_code < 300\n\nres = MockHTTPResponse(201, {\"id\": 101, \"message\": \"Guild created\"})\nprint(f\"Status {res.status_code} Success? {res.is_success}\")\n",
        "content": "\n<h2>⚡ Chapter 2: The Anatomy of HTTP & REST Protocols</h2>\n<p>To connect Python applications to external cloud systems, you must speak HTTP. Every request includes a Method (GET, POST, PUT, DELETE), a URL path, query parameters, headers, and an optional body.</p>\n"
      },
      {
        "title": "Authentication Runes: Bearer Tokens, API Keys & Custom Headers",
        "language": "python",
        "starterCode": "# Structuring authenticated HTTP request headers\ndef build_auth_headers(api_key: str, token: str = None) -> dict:\n    headers = {\n        \"Accept\": \"application/json\",\n        \"X-API-Key\": api_key,\n    }\n    if token:\n        headers[\"Authorization\"] = f\"Bearer {token}\"\n    return headers\n\nheaders = build_auth_headers(\"secret_key_12345\", \"jwt_token_abc\")\nprint(\"Headers:\", headers)\n",
        "content": "\n<h2>⚡ Chapter 3: Authenticating API Requests</h2>\n<p>Production APIs require authentication to verify client identity. Learn how to pass API Keys in custom headers (<code>X-API-Key</code>) and Bearer Tokens in the standard <code>Authorization</code> header.</p>\n"
      },
      {
        "title": "Defensive Networking: Timeout Shields, Retries & Backoff",
        "language": "python",
        "starterCode": "import time\n\ndef resilient_fetch(attempt=1, max_retries=3):\n    try:\n        if attempt < 3:\n            raise ConnectionError(\"Network blip!\")\n        return {\"data\": \"Guild loot loaded!\"}\n    except ConnectionError as err:\n        if attempt <= max_retries:\n            delay = 2 ** (attempt - 1) # Exponential backoff: 1s, 2s, 4s...\n            print(f\"Attempt {attempt} failed ({err}). Retrying in {delay}s...\")\n            return resilient_fetch(attempt + 1, max_retries)\n        raise\n\nprint(\"Result:\", resilient_fetch())\n",
        "content": "\n<h2>⚡ Chapter 4: Defensive Networking & Exponential Backoff</h2>\n<p>In distributed cloud architectures, networks are inherently unreliable. Hardened software implements connection timeouts and exponential backoff retries to withstand transient failures.</p>\n"
      },
      {
        "title": "Asynchronous HTTP Concurrency with httpx & asyncio",
        "language": "python",
        "starterCode": "# Asynchronous network patterns\nimport asyncio\n\nasync def fetch_quest_data(quest_id):\n    print(f\"Starting fetch for quest {quest_id}...\")\n    await asyncio.sleep(0.1) # Simulate non-blocking I/O wait\n    return f\"Quest {quest_id} Data\"\n\nasync def main():\n    # Run multiple network requests concurrently!\n    results = await asyncio.gather(\n        fetch_quest_data(1),\n        fetch_quest_data(2),\n        fetch_quest_data(3)\n    )\n    print(\"All fetched:\", results)\n\nasyncio.run(main())\n",
        "content": "\n<h2>⚡ Chapter 5: Asynchronous HTTP Concurrency</h2>\n<p>Synchronous requests block the Python thread while waiting for the server to reply. With modern <code>asyncio</code> and libraries like <code>httpx</code> or <code>aiohttp</code>, you can fire hundreds of concurrent requests on a single thread.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Extract API Weather Summary",
        "language": "python",
        "description": "\n<p>Write a function <code>format_weather(api_dict)</code> that takes an API response dict with keys <code>\"city\"</code>, <code>\"temp_c\"</code>, and <code>\"condition\"</code> and returns string: <code>\"[city]: [temp_c]°C, [condition]\"</code>.</p>\n        ",
        "starterCode": "def format_weather(api_dict):\n    city = api_dict.get(\"city\", \"Unknown\")\n    temp = api_dict.get(\"temp_c\", 0)\n    cond = api_dict.get(\"condition\", \"Clear\")\n    return f\"{city}: {temp}°C, {cond}\"\n\ndata = {\"city\": \"Seattle\", \"temp_c\": 18.5, \"condition\": \"Rainy\"}\nprint(format_weather(data))\n",
        "expectedOutput": "Seattle: 18.5°C, Rainy",
        "hints": [
          "Use f\"{city}: {temp}°C, {cond}\""
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which HTTP status code signifies that a requested resource could not be found on the server?",
        "options": [
          "200",
          "301",
          "404",
          "500"
        ],
        "correctIndex": 2,
        "explanation": "404 is the standard HTTP response for Not Found."
      }
    ]
  },
  "py-mod-datasci": {
    "lessons": [
      {
        "title": "Vectorized Computing & Tabular Aggregations",
        "language": "python",
        "starterCode": "# Data Science in Python: Working with Tabular Records\n\n# Tabular dataset represented as list of dictionaries\nsales_data = [\n    {\"product\": \"Laptop\", \"category\": \"Tech\", \"price\": 1200, \"units\": 4},\n    {\"product\": \"Mouse\", \"category\": \"Tech\", \"price\": 25, \"units\": 20},\n    {\"product\": \"Desk Chair\", \"category\": \"Furniture\", \"price\": 250, \"units\": 3},\n    {\"product\": \"Monitor\", \"category\": \"Tech\", \"price\": 300, \"units\": 6},\n    {\"product\": \"Coffee Table\", \"category\": \"Furniture\", \"price\": 150, \"units\": 2},\n]\n\n# Total Revenue Calculation\ntotal_revenue = sum(row[\"price\"] * row[\"units\"] for row in sales_data)\n\n# Tech category revenue filter\ntech_revenue = sum(row[\"price\"] * row[\"units\"] for row in sales_data if row[\"category\"] == \"Tech\")\n\nprint(\"Total Revenue: $\" + str(total_revenue))\nprint(\"Tech Category Revenue: $\" + str(tech_revenue))\n",
        "content": "\n<h2>📊 Chapter 10: The Alchemical Laboratory — Data Science</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Python is the undisputed king of Data Science and Machine Learning. Discover why libraries like NumPy and Pandas process millions of records in milliseconds through C-level vectorization.</em>\n</div>\n\n<h3>Why Vectorization Beats Pure Python Loops</h3>\n<p>In standard Python, looping over a list of 10 million floats requires 10 million PyObject pointer lookups and type checks. In <strong>NumPy</strong>, numbers are stored in <strong>contiguous C memory buffers</strong>:</p>\n\n<pre class=\"ascii-diagram\">\nPython List: [Pointer] -> [PyObject: 1.5]\n             [Pointer] -> [PyObject: 2.5]   (Scattered in heap memory, cache misses)\n             [Pointer] -> [PyObject: 3.5]\n\nNumPy Array: | 1.5 | 2.5 | 3.5 | 4.5 | 5.5 | (Contiguous 64-bit IEEE floats, SIMD enabled)\n</pre>\n\n<p>By executing CPU <strong>SIMD (Single Instruction, Multiple Data)</strong> vector instructions, NumPy performs mathematical operations 50x to 100x faster than standard Python loops!</p>\n        "
      },
      {
        "title": "NumPy N-Dimensional Arrays & Vectorized Math",
        "language": "python",
        "starterCode": "# Vectorized Array Operations: Operating on entire arrays without loops!\nclass SimpleVector:\n    def __init__(self, data):\n        self.data = list(data)\n\n    def __mul__(self, scalar):\n        return SimpleVector([x * scalar for x in self.data])\n\n    def __repr__(self):\n        return f\"array({self.data})\"\n\nv = SimpleVector([10, 20, 30])\nprint(\"Scaled Vector:\", v * 2)\n",
        "content": "\n<h2>⚡ Chapter 2: NumPy & Vectorized Computation</h2>\n<p>NumPy is the bedrock of scientific Python. Instead of iterating through Python lists with slow interpreter overhead, NumPy stores contiguous C-level arrays and performs SIMD (Single Instruction, Multiple Data) vectorized calculations.</p>\n"
      },
      {
        "title": "Pandas Series & DataFrames: Slicing, Filtering & Indexing",
        "language": "python",
        "starterCode": "# Tabular Data Structures (Rows & Columns)\ndata = [\n    {\"player\": \"Astra\", \"class\": \"Mage\", \"score\": 95},\n    {\"player\": \"Vex\", \"class\": \"Warrior\", \"score\": 82},\n    {\"player\": \"Lyra\", \"class\": \"Rogue\", \"score\": 89},\n]\n\n# Querying and filtering data\nhigh_scorers = [row for row in data if row[\"score\"] > 85]\nprint(\"High Scorers:\", [p[\"player\"] for p in high_scorers])\n",
        "content": "\n<h2>⚡ Chapter 3: Pandas DataFrames & Filtering</h2>\n<p>A Pandas DataFrame is a two-dimensional, size-mutable tabular data structure with labeled axes (rows and columns). Learn how to slice rows, filter by boolean masks, and select specific columns.</p>\n"
      },
      {
        "title": "Data Cleansing: Handling Nulls, Duplicates & Type Conversions",
        "language": "python",
        "starterCode": "# Data Cleaning Patterns in Python\nraw_records = [\" 100 \", \"150\", None, \"200\", \"150\", \"INVALID\"]\n\ncleaned = []\nfor record in raw_records:\n    if record is None:\n        continue\n    try:\n        val = int(record.strip())\n        cleaned.append(val)\n    except ValueError:\n        pass # Discard corrupted entries\n\nunique_sorted = sorted(set(cleaned))\nprint(\"Cleaned Unique Values:\", unique_sorted)\n",
        "content": "\n<h2>⚡ Chapter 4: Data Cleansing & Normalization</h2>\n<p>Real-world data is dirty: missing values (<code>NaN</code>), erratic whitespace, duplicated entries, and incorrect datatypes. Discover professional techniques to clean, deduplicate, and impute data.</p>\n"
      },
      {
        "title": "Data Aggregations: GroupBy, Pivot Tables & Summary Metrics",
        "language": "python",
        "starterCode": "from collections import defaultdict\n\nplayers = [\n    {\"class\": \"Mage\", \"xp\": 1200},\n    {\"class\": \"Warrior\", \"xp\": 1500},\n    {\"class\": \"Mage\", \"xp\": 1800},\n    {\"class\": \"Warrior\", \"xp\": 900},\n]\n\n# GroupBy Aggregation: Compute mean XP per class\ngrouped = defaultdict(list)\nfor p in players:\n    grouped[p[\"class\"]].append(p[\"xp\"])\n\nfor role, scores in grouped.items():\n    avg = sum(scores) / len(scores)\n    print(f\"Class: {role} | Avg XP: {avg:.1f}\")\n",
        "content": "\n<h2>⚡ Chapter 5: GroupBy Aggregations & Statistical Metrics</h2>\n<p>Data science transforms raw rows into actionable intelligence. Master the Split-Apply-Combine strategy to aggregate metrics (mean, median, standard deviation) grouped by categorical dimensions.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Top Revenue Product Finder",
        "language": "python",
        "description": "\n<p>Write a function <code>top_product(items)</code> that receives a list of item dictionaries with keys <code>\"name\"</code> and <code>\"sales\"</code> and returns the <code>\"name\"</code> of the product with the highest sales value.</p>\n        ",
        "starterCode": "def top_product(items):\n    if not items:\n        return None\n    best = max(items, key=lambda x: x[\"sales\"])\n    return best[\"name\"]\n\nproducts = [\n    {\"name\": \"Widget A\", \"sales\": 4500},\n    {\"name\": \"Widget B\", \"sales\": 9200},\n    {\"name\": \"Widget C\", \"sales\": 3100}\n]\nprint(\"Top Product:\", top_product(products))\n",
        "expectedOutput": "Top Product: Widget B",
        "hints": [
          "Use max(items, key=lambda x: x[\"sales\"])[\"name\"]."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which Python library is the standard industry choice for DataFrame manipulation and tabular data analysis?",
        "options": [
          "Pandas",
          "Flask",
          "Requests",
          "Pygame"
        ],
        "correctIndex": 0,
        "explanation": "Pandas provides high-performance data structures and analytical tools."
      }
    ]
  },
  "py-mod-fastapi": {
    "lessons": [
      {
        "title": "Modern API Architecture with FastAPI & Pydantic",
        "language": "python",
        "starterCode": "# FastAPI Architecture: Modern, High-Performance Python Web APIs\n# FastAPI uses Python type hints for automatic validation & OpenAPI docs\n\nclass SimulatedFastAPI:\n    def __init__(self):\n        self.routes = {}\n\n    def get(self, path):\n        def decorator(func):\n            self.routes[(\"GET\", path)] = func\n            return func\n        return decorator\n\n    def post(self, path):\n        def decorator(func):\n            self.routes[(\"POST\", path)] = func\n            return func\n        return decorator\n\napp = SimulatedFastAPI()\n\n@app.get(\"/api/health\")\ndef health_check():\n    return {\"status\": \"healthy\", \"service\": \"CodeQuest Backend\"}\n\n@app.get(\"/api/items\")\ndef list_items():\n    return [{\"id\": 1, \"name\": \"Python Mastery\"}]\n\nprint(\"Registered Routes:\", list(app.routes.keys()))\nprint(\"Health Check Call:\", app.routes[(\"GET\", \"/api/health\")]())\n",
        "content": "\n<h2>⚡ Chapter 11: The High-Speed Citadel — FastAPI Web Services</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>FastAPI has become the modern gold standard for Python backend engineering. Built on ASGI (Asynchronous Server Gateway Interface) and powered by Pydantic validation, it delivers Node/Go-level throughput with automatic Swagger UI documentation.</em>\n</div>\n\n<h3>The Three Pillars of FastAPI</h3>\n\n<ol>\n  <li><strong>Blazing Fast Asynchronous Engine (Starlette):</strong> Unlike older WSGI frameworks (Django, Flask) that block a thread per request, FastAPI runs on ASGI (via <strong>Uvicorn</strong>) utilizing non-blocking <code>async</code> / <code>await</code> event loops.</li>\n  <li><strong>Type Safety & Validation (Pydantic):</strong> By simply annotating function signatures with Python types (<code>item: ItemSchema</code>), incoming JSON request bodies are automatically validated, coerced, and documented.</li>\n  <li><strong>Automatic Interactive OpenAPI Docs:</strong> Zero configuration required! Visiting <code>/docs</code> serves a live interactive Swagger UI where frontend teams can test endpoints directly.</li>\n</ol>\n\n<pre class=\"ascii-diagram\">\nHTTP Request --> Uvicorn (ASGI) --> FastAPI Router --> Pydantic Validator --> Route Handler\n                                                             |\n                                                     [Invalid? 422 Unprocessable Entity]\n                                                     [Valid? Process & return Response]\n</pre>\n        "
      },
      {
        "title": "Pydantic Models: Strong Request/Response Validation & Schemas",
        "language": "python",
        "starterCode": "# Data Validation with Schema Contracts\nclass ItemSchema:\n    def __init__(self, name: str, price: float, tags: list = None):\n        if not isinstance(name, str) or len(name) < 1:\n            raise ValueError(\"Name must be non-empty string\")\n        if not isinstance(price, (int, float)) or price <= 0:\n            raise ValueError(\"Price must be positive number\")\n        self.name = name\n        self.price = float(price)\n        self.tags = tags or []\n\nitem = ItemSchema(\"Obsidian Blade\", 450.0, [\"weapon\", \"rare\"])\nprint(f\"Validated Item: {item.name} (${item.price})\")\n",
        "content": "\n<h2>⚡ Chapter 2: Pydantic Data Validation Schemas</h2>\n<p>FastAPI leverages Pydantic for data parsing and validation. When clients submit JSON payloads, Pydantic parses them into strongly-typed models, verifying types and returning friendly <code>422 Unprocessable Entity</code> errors if input is malformed.</p>\n"
      },
      {
        "title": "Path, Query & Header Parameters with Type Coercion",
        "language": "python",
        "starterCode": "# Path and Query Parameters in Modern APIs\n# GET /items/{item_id}?limit=10&sort_by=price\n\ndef mock_endpoint(item_id: int, limit: int = 20, sort_by: str = \"date\"):\n    return {\n        \"item_id\": item_id,\n        \"limit\": limit,\n        \"sort_by\": sort_by,\n        \"status\": \"Queried successfully\"\n    }\n\nprint(mock_endpoint(42, limit=5, sort_by=\"xp\"))\n",
        "content": "\n<h2>⚡ Chapter 3: FastAPI Routing & Parameter Coercion</h2>\n<p>Learn how FastAPI differentiates between Path parameters (embedded directly in the URL route like <code>/users/{user_id}</code>) and Query parameters (appended after <code>?</code>), automatically coercing string inputs into integers, floats, or booleans.</p>\n"
      },
      {
        "title": "Dependency Injection Citadel (Depends) & Database Sessions",
        "language": "python",
        "starterCode": "# Dependency Injection Pattern\nclass DatabaseSession:\n    def __init__(self):\n        self.active = True\n    def close(self):\n        self.active = False\n\ndef get_db():\n    db = DatabaseSession()\n    try:\n        return db\n    finally:\n        db.close()\n\n# Endpoints declare what they need, and FastAPI injects it!\ndef get_user_profile(user_id: int, db=None):\n    db = db or get_db()\n    return f\"User {user_id} fetched using DB session (active={db.active})\"\n\nprint(get_user_profile(101))\n",
        "content": "\n<h2>⚡ Chapter 4: Dependency Injection with Depends</h2>\n<p>FastAPI features an extremely powerful Dependency Injection system. Dependencies allow endpoints to request database connections, authentication credentials, and security contexts declaratively with automatic cleanup.</p>\n"
      },
      {
        "title": "Architecting Production REST APIs with Routers & OpenAPI Docs",
        "language": "python",
        "starterCode": "# APIRouter architecture for modular enterprise code\nclass Router:\n    def __init__(self, prefix):\n        self.prefix = prefix\n        self.routes = []\n\n    def add_route(self, path, method):\n        self.routes.append(f\"{method} {self.prefix}{path}\")\n\nusers_router = Router(\"/api/v1/users\")\nusers_router.add_route(\"/\", \"GET\")\nusers_router.add_route(\"/{id}\", \"GET\")\nusers_router.add_route(\"/\", \"POST\")\n\nprint(\"Registered Routes:\")\nfor r in users_router.routes:\n    print(\" \", r)\n",
        "content": "\n<h2>⚡ Chapter 5: APIRouter Architecture & Interactive Swagger Docs</h2>\n<p>In production applications, keeping all routes in a single file creates a tangled monolith. Learn how to divide your API into modular <code>APIRouter</code> controllers and explore FastAPI's automatic interactive documentation generated via Swagger UI (<code>/docs</code>) and ReDoc (<code>/redoc</code>).</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Simulated API Dispatcher",
        "language": "python",
        "description": "\n<p>Write a function <code>handle_request(method, path)</code> that returns:</p>\n<ul>\n  <li><code>{\"status\": 200, \"message\": \"Welcome Home\"}</code> if method is <code>\"GET\"</code> and path is <code>\"/\"</code>.</li>\n  <li><code>{\"status\": 200, \"count\": 5}</code> if method is <code>\"GET\"</code> and path is <code>\"/users\"</code>.</li>\n  <li><code>{\"status\": 404, \"error\": \"Not Found\"}</code> for any other path.</li>\n</ul>\n        ",
        "starterCode": "def handle_request(method, path):\n    if method == \"GET\" and path == \"/\":\n        return {\"status\": 200, \"message\": \"Welcome Home\"}\n    elif method == \"GET\" and path == \"/users\":\n        return {\"status\": 200, \"count\": 5}\n    else:\n        return {\"status\": 404, \"error\": \"Not Found\"}\n\nprint(\"Home:\", handle_request(\"GET\", \"/\"))\nprint(\"Users:\", handle_request(\"GET\", \"/users\"))\nprint(\"Unknown:\", handle_request(\"POST\", \"/unknown\"))\n",
        "expectedOutput": "Home: {'status': 200, 'message': 'Welcome Home'}\nUsers: {'status': 200, 'count': 5}\nUnknown: {'status': 404, 'error': 'Not Found'}",
        "hints": [
          "Use standard if/elif/else checking method and path."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What URL does FastAPI serve interactive Swagger documentation on by default?",
        "options": [
          "/swagger",
          "/docs",
          "/api/help",
          "/documentation"
        ],
        "correctIndex": 1,
        "explanation": "FastAPI serves OpenAPI Swagger documentation at /docs by default."
      }
    ],
    "project": {
      "title": "Full-Stack Python Task API Service",
      "language": "python",
      "description": "\n<p>Build a modular in-memory REST API service for managing a developer task board with validation.</p>\n      ",
      "starterCode": "class TaskService:\n    def __init__(self):\n        self.tasks = []\n        self.next_id = 1\n\n    def create_task(self, title, priority=\"medium\"):\n        task = {\"id\": self.next_id, \"title\": title, \"priority\": priority, \"completed\": False}\n        self.tasks.append(task)\n        self.next_id += 1\n        return task\n\n    def complete_task(self, task_id):\n        for t in self.tasks:\n            if t[\"id\"] == task_id:\n                t[\"completed\"] = True\n                return t\n        return None\n\n    def get_pending(self):\n        return [t for t in self.tasks if not t[\"completed\"]]\n\nservice = TaskService()\nt1 = service.create_task(\"Learn Python Foundations\", \"high\")\nt2 = service.create_task(\"Build FastAPI Endpoint\", \"medium\")\nservice.complete_task(t1[\"id\"])\nprint(\"Pending Tasks Count:\", len(service.get_pending()))\n",
      "requirements": [
        "create_task assigns auto-incrementing id",
        "complete_task marks completed flag to True",
        "get_pending returns uncompleted tasks list"
      ]
    }
  }
};
