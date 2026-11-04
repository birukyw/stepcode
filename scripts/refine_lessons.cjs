const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'data', 'interactiveLessonsLibrary.js');

const fileContent = `import { STEP_TYPES } from '../types/lesson.js';
import { binarySearchModule } from './binarySearchModule.js';

/**
 * Handcrafted Brilliant-style interactive lessons library.
 * Strict Pedagogy: "Teach First, Test Second".
 * - Step 1 is always visual, interactive exploration (mouse movement, slicing blade, nametags, sliders).
 * - Step 2+ introduces challenges, predictions, and live coding sandboxes.
 * - Every step features a rich concept briefing description before questions/puzzles.
 */
export const HANDCRAFTED_LESSONS = {
  // ═══════════════════════════════════════════════════════════════════════════
  // PYTHON TRACK: MODULE 1 — Hello World, Syntax & Primitive Types
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Lesson 1.0: Zen of Python & CPython Execution Pipeline ────────────────
  'py-week-1-0': [
    {
      id: 'py-w1-s1',
      stepNumber: 1,
      title: 'Explore the CPython Execution Pipeline',
      description: 'Before Python code runs on physical CPU hardware, it journeys through CPython’s multi-stage interpretation pipeline.\\n\\nUnlike compiled languages like C or Go that emit native machine binaries ahead of time, Python compiles human-readable source text into high-level bytecode instructions (.pyc) at runtime. These bytecodes are then evaluated by an internal stack-based Virtual Machine (VM).',
      prompt: 'Scrub through the 4 stages below to observe how human-readable source code transforms into bytecode opcodes inside the virtual machine:',
      type: STEP_TYPES.PIPELINE_FLOW,
      isTeachingStep: true,
      props: {},
      explanation: 'CPython first parses your source code into an Abstract Syntax Tree (AST), compiles that tree into stack-based bytecode (.pyc), and then runs that bytecode in its virtual machine evaluation loop!'
    },
    {
      id: 'py-w1-s2',
      stepNumber: 2,
      title: 'Order the CPython Pipeline',
      description: 'CPython follows a strict, sequential pipeline from script to machine execution:\\n\\n1. Source text (.py file) is read into memory.\\n2. The Lexer tokenizes text and the Parser structures tokens into an Abstract Syntax Tree (AST).\\n3. The Compiler transforms the AST into portable bytecode instructions (.pyc).\\n4. The CPython Virtual Machine loop executes bytecode opcodes on the runtime stack.',
      prompt: 'Arrange the stages in sequential execution order from raw script to machine execution:',
      type: STEP_TYPES.SORT_ORDER,
      props: {
        items: [
          { id: 'stage-2', text: 'Lexer & Parser builds Abstract Syntax Tree (AST)' },
          { id: 'stage-4', text: 'CPython Virtual Machine executes bytecode loop' },
          { id: 'stage-1', text: 'Source code text (.py file)' },
          { id: 'stage-3', text: 'Compiler generates Bytecode (.pyc)' }
        ],
        correctOrder: ['stage-1', 'stage-2', 'stage-3', 'stage-4']
      },
      explanation: 'CPython first tokenizes and parses source text into an AST, compiles it into portable bytecode (.pyc), and then evaluates opcodes on the runtime stack.'
    },
    {
      id: 'py-w1-s3',
      stepNumber: 3,
      title: 'The Core Philosophy of Python',
      description: 'In 1999, software engineer Tim Peters formulated PEP 20—The Zen of Python—a set of 19 guiding aphorisms shaping Python’s design.\\n\\nWhile languages like C++ or Perl often emphasize machine speed or multiple cryptic ways to solve a problem, Python’s foundational motto is that code is read far more often than it is written. Clear, expressive code prevents bugs and builds long-lasting software.',
      prompt: 'Which principle best summarizes the Zen of Python (PEP 20)?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Readability counts — code is read far more often than it is written.', isCorrect: true },
          { id: 'opt-2', text: 'Speed at all costs, even if syntax is cryptic and verbose.', isCorrect: false },
          { id: 'opt-3', text: 'Implicit magic is better than explicit instructions.', isCorrect: false },
          { id: 'opt-4', text: 'Everything must be wrapped in boilerplate classes and semicolons.', isCorrect: false }
        ]
      },
      explanation: 'PEP 20 explicitly declares: "Readability counts" and "Explicit is better than implicit." Clear, expressive code prevents bugs and builds long-lasting software.'
    },
    {
      id: 'py-w1-s4',
      stepNumber: 4,
      title: 'Writing Your First Python Output',
      description: 'Python includes standard built-in functions ready to use everywhere without importing external modules.\\n\\nTo display text, numbers, or calculated results to standard output (stdout / terminal), Python provides its core output function.',
      prompt: 'Place the correct built-in function chip to output the classic "Hello, World!" greeting to standard output:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: '{slot1}("Hello, World!")',
        chips: ['print', 'echo', 'console.log', 'System.out.println'],
        correctAnswer: 'print'
      },
      explanation: 'In Python, \`print()\` is the built-in function that formats arguments and writes them directly to the console stream.'
    },
    {
      id: 'py-w1-s5',
      stepNumber: 5,
      title: 'Hands-on Python Output Sandbox',
      description: 'Modern Python (PEP 498) uses f-strings (formatted string literals) prefixed with \`f"..."\`\\n\\nVariables and expressions placed inside \`{curly_braces}\` are evaluated and interpolated directly into the string, producing clean, readable output.',
      prompt: 'Run the Python code below to execute your first program and witness the Zen of Python output live:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`# Welcome to StepCode! 🐍
greeting = "Hello, World!"
language = "Python 3"

print(f"{greeting} from {language}!")
print("Readability counts.")
\`,
        expectedOutput: 'Hello, World! from Python 3!',
        hints: ['Click "▶ Run Code" to execute.']
      },
      explanation: 'Your code compiled to bytecode and executed inside the CPython runtime cleanly!'
    }
  ],

  // ─── Lesson 1.1: Numbers & Memory Architecture ──────────────────────────────
  'py-week-1-1': [
    {
      id: 'py-num-1',
      stepNumber: 1,
      title: 'Variables are Nametags, Not Boxes',
      description: 'In languages like C or C++, a variable is a memory box holding a value at a fixed address. In Python, variables are lightweight "nametags" bound to objects living on the heap.\\n\\nWhen you write \`x = 42\`, Python creates an integer PyObject for 42 in memory and pins the label \`x\` to it. Python also optimizes performance by pre-allocating a small integer cache for numbers between -5 and 256 as permanent singletons.',
      prompt: 'Click the 3 preset buttons below to see how pointers redirect and how CPython reuses small integers:',
      type: STEP_TYPES.MEMORY_MODEL,
      isTeachingStep: true,
      props: {},
      explanation: 'In Python, variables are references. When you write x = 42; y = x, both nametags point to the EXACT same memory address. Python also caches small integers from -5 to 256 as permanent singletons!'
    },
    {
      id: 'py-num-2',
      stepNumber: 2,
      title: 'Arbitrary Precision Integers',
      description: 'Traditional computer architectures restrict integers to 32 bits (max value 2,147,483,647) or 64 bits. In C or Java, computing astronomical values causes integer overflow, flipping values into negative numbers or crashing.\\n\\nPython handles integers using \`PyLongObject\` structs, which dynamically allocate memory blocks as numbers grow. They possess arbitrary precision—limited solely by available system RAM.',
      prompt: 'In C or Java, a 32-bit integer overflows if it exceeds 2,147,483,647. What happens in Python if you calculate 2 ** 1000?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Python calculates the exact 300+ digit integer without overflowing', isCorrect: true },
          { id: 'opt-2', text: 'It overflows and becomes a negative number', isCorrect: false },
          { id: 'opt-3', text: 'Python throws an IntegerOverflowError', isCorrect: false },
          { id: 'opt-4', text: 'It rounds to Infinity', isCorrect: false }
        ]
      },
      explanation: 'In Python, integers are PyLongObject structures that dynamically allocate memory chunks. They have arbitrary precision—they never overflow, limited only by your physical RAM!'
    },
    {
      id: 'py-num-3',
      stepNumber: 3,
      title: 'The Floating-Point Binary Gotcha',
      description: 'Computers store floating-point numbers in hardware registers using the binary IEEE-754 standard (base 2).\\n\\nWhile 0.1 and 0.2 appear simple in decimal (base 10), they are infinite repeating fractions in binary—much like 1/3 = 0.3333... in decimal. This creates minute rounding approximations in binary arithmetic (0.30000000000000004).',
      prompt: 'What does 0.1 + 0.2 evaluate to in standard Python IEEE-754 floating-point arithmetic?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: '0.30000000000000004 (due to binary base-2 representation)', isCorrect: true },
          { id: 'opt-2', text: 'Exactly 0.30000000000000000', isCorrect: false },
          { id: 'opt-3', text: '0.3333333333333333', isCorrect: false }
        ]
      },
      explanation: 'Because computers represent numbers in base-2 binary, 0.1 and 0.2 are infinite repeating binary fractions, creating a tiny rounding difference. For financial systems, always use \`decimal.Decimal\`!'
    },
    {
      id: 'py-num-4',
      stepNumber: 4,
      title: 'Floor Division & Modulo',
      description: 'When dividing quantities (such as allocating items into packing boxes, pagination, or calculating grid coordinates), we frequently need integer results without decimal fractions.\\n\\nPython provides floor division (\`//\`) to drop fractional remainders, and modulo (\`%\`) to capture the remaining remainder.',
      prompt: 'Complete the code to calculate floor division (dropping any decimal remainder):',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'items = 17\\nbox_capacity = 4\\nfull_boxes = items {slot1} box_capacity  # Result: 4',
        chips: ['//', '/', '%', '**'],
        correctAnswer: '//'
      },
      explanation: '\`//\` is the Python floor division operator. \`17 // 4\` yields \`4\`, whereas \`/\` yields \`4.25\` and \`%\` yields the remainder \`1\`.'
    },
    {
      id: 'py-num-5',
      stepNumber: 5,
      title: 'Live Precision Arithmetic Sandbox',
      description: 'Test Python’s arbitrary precision integer math and division operators live.\\n\\nNotice how Python computes astronomical 2**64 numbers instantly and cleanly separates whole quotients from remainders.',
      prompt: 'Run the code below to test arbitrary precision integer math and modulo operations:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`# Astronomical Python Integer Precision
huge_number = 2 ** 64
print("2 ** 64 =", huge_number)

items = 25
group_size = 4
print("Full groups:", items // group_size)
print("Remainder:", items % group_size)
\`,
        expectedOutput: 'Full groups: 6',
        hints: ['Run the code to see Python handle 64-bit numbers effortlessly.']
      },
      explanation: 'Python seamlessly handles numbers far beyond standard CPU 64-bit word limits!'
    }
  ],

  // ─── Lesson 1.2: Strings, Slicing & F-Strings ────────────────────────────────
  'py-week-1-2': [
    {
      id: 'py-str-1',
      stepNumber: 1,
      title: 'Interactive String Slicing Blade',
      description: 'Strings in Python are zero-indexed sequences of Unicode characters. Slicing with \`word[start:stop]\` allows you to extract sub-sequences cleanly using half-open intervals \`[start, stop)\`.\\n\\nPython includes the character at \`start\`, and cuts off just before \`stop\`. The resulting slice length is always \`stop - start\`.',
      prompt: 'Glide your cursor across the letters below! Watch the slicing blade cut between characters. Notice how Python includes the start index, but stops BEFORE the stop index—and excluded letters are crossed out in real-time:',
      type: STEP_TYPES.STRING_SLICER,
      isTeachingStep: true,
      props: {
        word: 'PYTHON',
        initialStart: 0,
        initialStop: 3
      },
      explanation: 'In Python, slice [start:stop] follows the half-open interval rule: it includes the character at start, and cuts off immediately before stop! The length of the slice is always stop - start.'
    },
    {
      id: 'py-str-2',
      stepNumber: 2,
      title: 'Precision Slicing Challenge',
      description: 'To extract a target substring, count the zero-based index of the first character you want to include (start), and the index directly following the last character you want (stop).\\n\\nFor example, to slice letters at indices 2, 3, 4, 5 from "PYTHON", you set \`start = 2\` and \`stop = 6\` to capture "THON".',
      prompt: 'Now put your slicing intuition to work! Drag your cursor or use the [-] [+] boundary buttons to slice out exactly "THON" from "PYTHON":',
      type: STEP_TYPES.STRING_SLICER,
      props: {
        word: 'PYTHON',
        targetSlice: 'THON',
        initialStart: 0,
        initialStop: 2
      },
      explanation: 'Index 2 holds "T", and stopping at index 6 takes through the end: word[2:6] extracts "THON"!'
    },
    {
      id: 'py-str-3',
      stepNumber: 3,
      title: 'String Immutability',
      description: 'In Python, strings (\`str\`) are completely immutable objects. Once allocated in memory, individual characters inside a string cannot be reassigned or mutated in place.\\n\\nMethods like \`.replace()\`, \`.upper()\`, or slicing never modify the original string—they always return a brand-new string object.',
      prompt: 'If you have \`word = "PYTHON"\` and attempt \`word[0] = "J"\`, what happens?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'TypeError: \\'str\\' object does not support item assignment', isCorrect: true },
          { id: 'opt-2', text: 'The string mutates to "JYTHON"', isCorrect: false },
          { id: 'opt-3', text: 'Python silently creates a new variable without error', isCorrect: false }
        ]
      },
      explanation: 'Strings in Python are immutable! Once allocated in memory, their characters can never be changed in-place. Methods like \`.replace()\` or \`.upper()\` return brand-new string objects.'
    },
    {
      id: 'py-str-4',
      stepNumber: 4,
      title: 'Reversing Sequences with Slicing',
      description: 'The slice notation supports an optional third argument: \`word[start:stop:step]\`. The \`step\` parameter dictates how many characters to stride forward on each iteration.\\n\\nProviding a negative step (like \`-1\`) tells Python’s internal iterator to walk backwards from right to left.',
      prompt: 'What is the most pythonic, single-expression way to reverse a string in O(N) time using slicing [start:stop:step]?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'word[::-1]', isCorrect: true },
          { id: 'opt-2', text: 'word.reverse()', isCorrect: false },
          { id: 'opt-3', text: 'word[-1:0]', isCorrect: false },
          { id: 'opt-4', text: 'reversed(word).join()', isCorrect: false }
        ]
      },
      explanation: '\`word[::-1]\` instructs Python: "Slice the entire string with a step of -1 (walk backwards)!" It is concise, fast, and idiomatic.'
    },
    {
      id: 'py-str-5',
      stepNumber: 5,
      title: 'Interactive String Slicing Playground',
      description: 'Slicing omitting \`start\` defaults to 0 (\`text[:4]\`), omitting \`stop\` defaults to the end of the string (\`text[4:]\`), and omitting both with \`::-1\` reverses the entire sequence in C-speed bytecode.',
      prompt: 'Run the code below to test slicing substrings, stepping backwards, and formatted output:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`text = "StepCode"

print("First 4 chars:", text[:4])
print("Last 4 chars:", text[4:])
print("Reversed:", text[::-1])
\`,
        expectedOutput: 'Reversed: edoCpetS',
        hints: ['Run the code to see Python slicing in action.']
      },
      explanation: 'String slicing provides powerful sub-sequence manipulation without needing manual loops!'
    }
  ],

  // ─── Lesson 1.3: Booleans, Dynamic Namespaces & Type Casting ────────────────
  'py-week-1-3': [
    {
      id: 'py-bool-1',
      stepNumber: 1,
      title: 'Explore Python’s Type Casting Matrix',
      description: 'Python is dynamically typed (types belong to objects, not variable names) and strongly typed (Python will not silently coerce incompatible types behind your back).\\n\\nWhen converting between data types, you use constructor functions like \`int()\`, \`float()\`, \`str()\`, and \`bool()\`. If a string cannot be parsed into the requested type, Python raises a \`ValueError\`.',
      prompt: 'In Python, variables aren’t fixed boxes—they are nametags bound to dynamically-typed objects. Click between constructor functions \`int()\`, \`float()\`, \`str()\`, and \`bool()\` to see how Python converts data types and why \`int("3.14")\` raises a \`ValueError\`!',
      type: STEP_TYPES.TYPE_CASTING,
      isTeachingStep: true,
      props: {},
      explanation: 'Python is strongly typed: it refuses silent coercion. To turn string "3.14" into an int, you must explicitly parse it with float first: int(float("3.14"))!'
    },
    {
      id: 'py-bool-2',
      stepNumber: 2,
      title: 'Evaluating bool("False")',
      description: 'When Python evaluates \`bool(x)\`, it checks truthiness rather than semantic text meaning. Python queries the object’s truth value protocol: "Are you non-empty or non-zero?"\\n\\nBecause the string \`"False"\` contains 5 characters (length > 0), Python evaluates it as truthy!',
      prompt: 'What does \`bool("False")\` evaluate to in Python?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'True — because "False" is a non-empty string with 5 characters!', isCorrect: true },
          { id: 'opt-2', text: 'False — because the word says False', isCorrect: false },
          { id: 'opt-3', text: 'TypeError: string cannot be boolean', isCorrect: false }
        ]
      },
      explanation: 'Classic Python gotcha! \`bool(x)\` checks truthiness, not semantics. Any non-empty string has length > 0, so it is always True! Only empty string \`bool("")\` is False.'
    },
    {
      id: 'py-bool-3',
      stepNumber: 3,
      title: 'Safe Numerical Conversion',
      description: 'Data coming from HTTP requests, input prompts, JSON payloads, or text files always arrives as strings.\\n\\nAttempting arithmetic like \`"150" + 25\` produces a \`TypeError: can only concatenate str to str\`. Explicitly casting with \`int()\` parses the digit characters into an integer.',
      prompt: 'Convert the raw user input string "150" into a real integer before adding bonus points:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'raw_score = "150"\\ntotal = {slot1}(raw_score) + 25  # Result: 175',
        chips: ['int', 'str', 'float', 'bool'],
        correctAnswer: 'int'
      },
      explanation: 'Calling \`int("150")\` parses base-10 digits into a PyLongObject integer, enabling arithmetic addition.'
    },
    {
      id: 'py-bool-4',
      stepNumber: 4,
      title: 'Dynamic Type Inspection Sandbox',
      description: 'The built-in \`type()\` function inspects the internal \`ob_type\` pointer of any PyObject, revealing its class identity (\`<class \\'int\\'>\`, \`<class \\'str\\'>\`, \`<class \\'bool\\'>\`).',
      prompt: 'Execute the code below to inspect the dynamic types of variables using \`type()\`:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`val1 = 42
val2 = "42"
val3 = bool(0)
val4 = bool("0")

print("Type of val1:", type(val1))
print("Type of val2:", type(val2))
print("bool(0):", val3)
print("bool('0'):", val4)
\`,
        expectedOutput: "bool('0'): True",
        hints: ['Run the code to see the difference between numerical 0 and string "0".']
      },
      explanation: 'Python dynamically associates types with objects in memory, not variable names!'
    }
  ],

  // ─── Lesson 1.4: Advanced Slicing & Text Manipulation ───────────────────────
  'py-week-1-4': [
    {
      id: 'py-advstr-1',
      stepNumber: 1,
      title: 'Advanced Slicing: Stepping & Negative Bounds',
      description: 'Python supports negative indexing: index \`-1\` represents the last character in the string, \`-2\` the second to last, and so on.\\n\\nCombining negative bounds with custom steps allows sophisticated sequence processing without writing manual loops.',
      prompt: 'Glide your cursor across the 14-character string below! Notice how negative indices count backwards from the end (-1 is the last letter), and step sizes skip characters or reverse sequences:',
      type: STEP_TYPES.STRING_SLICER,
      isTeachingStep: true,
      props: {
        word: 'DATASTRUCTURES',
        initialStart: 0,
        initialStop: 4
      },
      explanation: 'Slicing syntax [start:stop:step] provides high-performance C-level sub-sequence slicing without manual loops.'
    },
    {
      id: 'py-advstr-2',
      stepNumber: 2,
      title: 'Extracting Prefix Substring',
      description: 'Extracting leading prefixes from data records or tokens starts at index 0. In Python, \`word[:k]\` or \`word[0:k]\` extracts the first \`k\` characters cleanly.',
      prompt: 'Slice out the prefix "DATA" using the blade or the boundary steppers:',
      type: STEP_TYPES.STRING_SLICER,
      props: {
        word: 'DATASTRUCTURES',
        targetSlice: 'DATA',
        initialStart: 0,
        initialStop: 2
      },
      explanation: 'word[0:4] starts at index 0 and extracts through index 3, yielding "DATA"!'
    },
    {
      id: 'py-advstr-3',
      stepNumber: 3,
      title: 'Reversing Words with Step -1',
      description: 'In algorithmic problems, palindrome verification and sequence inversion are frequent tasks.\\n\\nSlicing with \`[::-1]\` allocates a new reversed string in O(N) time with minimal memory overhead.',
      prompt: 'What does \`"stressed"[::-1]\` evaluate to in Python?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: '"desserts"', isCorrect: true },
          { id: 'opt-2', text: '"stressed"', isCorrect: false },
          { id: 'opt-3', text: 'TypeError: step cannot be negative', isCorrect: false }
        ]
      },
      explanation: '"stressed" reversed character by character is "desserts"! Slicing with \`::-1\` is the standard Pythonic idiom to reverse sequences.'
    },
    {
      id: 'py-advstr-4',
      stepNumber: 4,
      title: 'Sanitizing Strings with .strip()',
      description: 'Real-world data ingestion frequently suffers from stray whitespace, carriage returns (\`\\\\r\`), and tabs (\`\\\\t\`).\\n\\nPython’s \`.strip()\` method removes all leading and trailing whitespace characters from both ends of a string without touching inner spaces.',
      prompt: 'Complete the code to clean leading and trailing whitespace from the username:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'raw_user = "   alex_chen   "\\nclean_user = raw_user.{slot1}()',
        chips: ['strip', 'trim', 'clean', 'pop'],
        correctAnswer: 'strip'
      },
      explanation: 'In Python, \`.strip()\` strips leading and trailing whitespace, returning a brand new string object.'
    },
    {
      id: 'py-advstr-5',
      stepNumber: 5,
      title: 'Advanced Formatting Sandbox',
      description: 'Modern Python f-strings support powerful format specifiers directly inside the replacement field.\\n\\nFor example, \`{percentage:.1%}\` formats a decimal float as a percentage with one decimal place automatically, eliminating manual multiplication by 100.',
      prompt: 'Run the code below to test string methods and modern formatted f-strings:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`name = "alex"
tasks_done = 75
total_tasks = 100

percentage = tasks_done / total_tasks
print(f"User {name.upper()}: {tasks_done}/{total_tasks} ({percentage:.1%})")
\`,
        expectedOutput: 'User ALEX: 75/100 (75.0%)',
        hints: ['Run the code to see f-string percent specifiers in action.']
      },
      explanation: 'Python’s f-string format specifiers like \`:.1%\` eliminate manual multiplication by 100!'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PYTHON TRACK: MODULE 2 — Control Flow, Logic & Decision Making
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Lesson 2.0: Comparison Operators & Short-Circuit Logic ─────────────────
  'py-week-2-0': [
    {
      id: 'py-sc-1',
      stepNumber: 1,
      title: 'The Short-Circuit Electrical Gate',
      description: 'Short-circuit evaluation is a performance and safety optimization in Boolean logic: Python evaluates expressions from left to right and stops the instant the outcome is determined.\\n\\nIn \`A and B\`, if A is \`False\`, the expression can never be True—so B is never evaluated. In \`A or B\`, if A is \`True\`, the expression is already True—so B is skipped.',
      prompt: 'Python evaluates logical expressions with short-circuiting! Toggle switches A and B below to watch current flow. Notice how \`False and ...\` terminates immediately at switch A without ever evaluating B, protecting your code from crashes:',
      type: STEP_TYPES.SHORT_CIRCUIT,
      isTeachingStep: true,
      props: {},
      explanation: 'Short-circuit evaluation means Python stops evaluating as soon as the outcome is guaranteed. In \`A and B\`, if A is False, B is never run. In \`A or B\`, if A is True, B is never run!'
    },
    {
      id: 'py-sc-2',
      stepNumber: 2,
      title: 'The Defensive Guard Pattern',
      description: 'In production software, accessing an attribute on a \`None\` object triggers a fatal \`AttributeError\`.\\n\\nDevelopers use short-circuiting as a defensive shield: \`if user is not None and user.is_active:\`. If \`user\` is None, the left condition fails immediately and Python never touches \`user.is_active\`.',
      prompt: 'Given \`user = None\`, why does \`if user is not None and user.is_active:\` NOT crash with an AttributeError?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Because \`user is not None\` evaluates to False, so Python terminates early and never evaluates \`user.is_active\`', isCorrect: true },
          { id: 'opt-2', text: 'Because Python automatically converts None to an empty User object', isCorrect: false },
          { id: 'opt-3', text: 'Because logical operators always evaluate from right to left', isCorrect: false }
        ]
      },
      explanation: 'Short-circuit evaluation acts as a protective shield! The right side \`user.is_active\` is only reached if the left guard passes.'
    },
    {
      id: 'py-sc-3',
      stepNumber: 3,
      title: 'Operands Returned by or',
      description: 'Unlike languages where logical operators strictly return boolean \`true\` or \`false\`, Python’s \`or\` and \`and\` operators return the actual operand that determined the truthiness!\\n\\n\`A or B\` returns \`A\` if \`A\` is truthy, otherwise it evaluates and returns \`B\`.',
      prompt: 'In Python, what is the evaluated result of \`"" or "Default"\`?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: '"Default" — because \`or\` returns the first truthy operand', isCorrect: true },
          { id: 'opt-2', text: 'True — a boolean literal', isCorrect: false },
          { id: 'opt-3', text: '"" — the empty string', isCorrect: false }
        ]
      },
      explanation: 'Python’s \`or\` returns the operand that determined the outcome! Since \`""\` is falsy, it falls back to \`"Default"\`.'
    },
    {
      id: 'py-sc-4',
      stepNumber: 4,
      title: 'Combining Conditions with and',
      description: 'When writing business rules or validation gates, multiple criteria must often hold concurrently.\\n\\nThe \`and\` operator guarantees that every prerequisite is met simultaneously.',
      prompt: 'Complete the statement to verify that the user is of adult age AND possesses an active ticket:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'can_enter = (age >= 18) {slot1} has_ticket',
        chips: ['and', 'or', 'not', 'is'],
        correctAnswer: 'and'
      },
      explanation: 'The \`and\` conjunction requires both truth conditions to hold simultaneously.'
    },
    {
      id: 'py-sc-5',
      stepNumber: 5,
      title: 'Short-Circuit Guard Sandbox',
      description: 'Explore the canonical fallback pattern: \`active_timeout = configured_timeout or default_timeout\`.\\n\\nIf the user provided \`None\`, Python smoothly defaults to 30 without throwing errors.',
      prompt: 'Run the program below to observe short-circuit guard execution:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`configured_timeout = None
default_timeout = 30

active_timeout = configured_timeout or default_timeout
print("Active Timeout:", active_timeout)

user = None
if user is not None and user.is_active:
    print("Welcome!")
else:
    print("Shield active: Null pointer avoided cleanly!")
\`,
        expectedOutput: 'Active Timeout: 30',
        hints: ['Run the code to verify short-circuiting.']
      },
      explanation: 'Short-circuit evaluation is one of the most widely used idioms in professional Python services!'
    }
  ],

  // ─── Lesson 2.1: Conditional Branching & Match-Case ─────────────────────────
  'py-week-2-1': [
    {
      id: 'py-branch-1',
      stepNumber: 1,
      title: 'Interactive Branching Switcher',
      description: 'Branching allows programs to make decisions and execute different code paths.\\n\\nPython uses strict 4-space indentation to define blocks, evaluating \`if\`, \`elif\`, and \`else\` conditions sequentially from top to bottom. The first condition that evaluates to True executes its block, and all remaining branches are bypassed.',
      prompt: 'Move the score slider below to watch execution branch along \`if\`, \`elif\`, and \`else\` tracks. Python evaluates from top to bottom and takes the first matching branch, skipping all others:',
      type: STEP_TYPES.BRANCHING,
      isTeachingStep: true,
      props: {},
      explanation: 'In Python, code blocks are defined strictly by 4 spaces of indentation. The first condition that evaluates to True claims execution and skips all subsequent branches!'
    },
    {
      id: 'py-branch-2',
      stepNumber: 2,
      title: 'Python 3.10+ Pattern Matching',
      description: 'Python 3.10 introduced Structural Pattern Matching (\`match-case\`, PEP 634).\\n\\nBeyond simple value comparisons like a traditional switch statement, \`match-case\` can deconstruct data structures, unpack tuples, and bind variables. The wildcard \`case _:\` acts as the default catch-all fallback.',
      prompt: 'In Python 3.10+, what is the purpose of \`case _:\` in a match-case construct?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'It acts as the wildcard default fallback if no previous pattern matches', isCorrect: true },
          { id: 'opt-2', text: 'It terminates the program immediately', isCorrect: false },
          { id: 'opt-3', text: 'It only matches private variables with underscores', isCorrect: false }
        ]
      },
      explanation: '\`case _:\` is the wildcard pattern in Python structural pattern matching, equivalent to \`default:\` in other languages.'
    },
    {
      id: 'py-branch-3',
      stepNumber: 3,
      title: 'Chaining Branches with elif',
      description: 'To test mutually exclusive categories without deeply nesting multiple \`if\` statements, Python uses \`elif\` (short for "else if").\\n\\nThis keeps code flat, readable, and compliant with PEP 8.',
      prompt: 'Complete the second branch condition using Python’s else-if keyword:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'if score >= 90:\\n    grade = "A"\\n{slot1} score >= 80:\\n    grade = "B"',
        chips: ['elif', 'else if', 'elseif', 'then'],
        correctAnswer: 'elif'
      },
      explanation: 'Python uses \`elif\` (a contraction of else-if) to chain multiple alternative conditions.'
    },
    {
      id: 'py-branch-4',
      stepNumber: 4,
      title: 'Conditional Branching Sandbox',
      description: 'Run the grade classification logic live.\\n\\nNotice how clean conditional branches handle range boundaries without overlapping.',
      prompt: 'Run the conditional branch below to determine the grade based on score:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`score = 85

if score >= 90:
    grade = "A+ (Master)"
elif score >= 80:
    grade = "B (Proficient)"
else:
    grade = "C (Needs Review)"

print(f"Final Grade: {grade}")
\`,
        expectedOutput: 'Final Grade: B (Proficient)',
        hints: ['Run the code to see Python evaluate the elif branch.']
      },
      explanation: 'Clean sequential branches keep business decision logic easy to audit and test.'
    }
  ],

  // ─── Lesson 2.2: Truthy & Falsy Evaluation Internals ────────────────────────
  'py-week-2-2': [
    {
      id: 'py-tf-1',
      stepNumber: 1,
      title: 'The Truthiness Balance Scale',
      description: 'Every Python object has an intrinsic truth value when evaluated in a boolean context (\`if\`, \`while\`, \`bool()\`). Python classifies objects into Truthy and Falsy.\\n\\nIn standard Python, exactly six categories are Falsy: \`False\`, \`None\`, zero numbers (\`0\`, \`0.0\`), empty strings (\`""\`), empty collections (\`[]\`, \`{}\`, \`set()\`), and custom objects where \`__bool__()\` returns False. Everything else is Truthy!',
      prompt: 'Every object in Python is either Truthy or Falsy! Click each chip above to place it on the scale. Watch how the scale tilts and observe the famous traps like \`"0"\` and \`[0]\` being Truthy:',
      type: STEP_TYPES.TRUTHINESS_SCALE,
      isTeachingStep: true,
      props: {},
      explanation: 'There are only 6 Falsy categories: False, None, zero numbers (0, 0.0), empty strings (""), empty collections ([], {}), and objects with __bool__ == False. Everything else is Truthy!'
    },
    {
      id: 'py-tf-2',
      stepNumber: 2,
      title: 'Identifying Falsy Objects',
      description: 'A common pitfall is confusing a container holding zero (\`[0]\`) or a string containing zero (\`"0"\`) with a falsy value.\\n\\nAn empty list \`[]\` has length 0 and is Falsy. But \`[0]\` is a list containing one element (length 1), making it Truthy!',
      prompt: 'Which of the following objects evaluates to FALSY in Python?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: '[] (an empty list with 0 elements)', isCorrect: true },
          { id: 'opt-2', text: '[0] (a list containing 0)', isCorrect: false },
          { id: 'opt-3', text: '"0" (a string containing "0")', isCorrect: false },
          { id: 'opt-4', text: '"False" (a string with 5 characters)', isCorrect: false }
        ]
      },
      explanation: 'An empty list \`[]\` has length 0, so it is Falsy. But \`[0]\` has length 1, so it is Truthy!'
    },
    {
      id: 'py-tf-3',
      stepNumber: 3,
      title: 'Pythonic Collection Emptiness Check',
      description: 'PEP 8 (the official Python Style Guide) explicitly recommends testing for empty sequences using their natural truthiness: \`if not items:\` instead of \`if len(items) == 0:\`.\\n\\nIt is cleaner, faster, and more pythonic.',
      prompt: 'What is the most pythonic, recommended (PEP 8) way to test if a list \`items\` contains data?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'if items: (leveraging natural truthiness)', isCorrect: true },
          { id: 'opt-2', text: 'if len(items) > 0:', isCorrect: false },
          { id: 'opt-3', text: 'if items == True:', isCorrect: false }
        ]
      },
      explanation: 'PEP 8 recommends \`if items:\` because Python evaluates non-empty collections as truthy directly without calling \`len()\`. '
    },
    {
      id: 'py-tf-4',
      stepNumber: 4,
      title: 'Truthiness Sandbox',
      description: 'Verify Python’s natural truthiness checks with lists and strings.\\n\\nWriting \`if not inventory:\` reads like fluent English while remaining high-performance.',
      prompt: 'Run the program below to verify truthiness checks in action:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`inventory = []
username = "ByteKnight"

if not inventory:
    print("Inventory is empty!")

if username:
    print(f"User '{username}' is logged in.")
\`,
        expectedOutput: 'Inventory is empty!',
        hints: ['Run the code to see truthiness in action.']
      },
      explanation: 'Using \`if not inventory:\` makes Python code read like fluent English!'
    }
  ],

  // ─── Lesson 2.3: Ternary Operator & Short-Circuit Boolean Evaluation ────────
  'py-week-2-3': [
    {
      id: 'py-tern-1',
      stepNumber: 1,
      title: 'Pythonic Conditional Expressions',
      description: 'Python supports conditional expressions (often called ternary operators, PEP 308): \`value_if_true if condition else value_if_false\`.\\n\\nUnlike a full \`if-else\` statement which cannot be assigned to a variable inline, a conditional expression evaluates to a single value that can be assigned, returned, or passed as a function argument.',
      prompt: 'Explore how Python’s ternary expression reads like natural English: \`value_if_true if condition else value_if_false\`. Click through the insight tabs below:',
      type: STEP_TYPES.EXPLORE,
      isTeachingStep: true,
      props: {
        insights: [
          {
            title: 'Natural English Syntax',
            icon: '💬',
            tag: 'Readability',
            summary: 'Unlike languages using \`cond ? a : b\`, Python uses: \`status = "Adult" if age >= 18 else "Minor"\`. It puts the primary return value first!'
          },
          {
            title: 'Expression vs Statement',
            icon: '⚡',
            tag: 'Semantics',
            summary: 'A standard if-else block is a statement that cannot be assigned. A ternary is an expression, allowing inline assignment and dictionary keys.'
          },
          {
            title: 'Avoid Nested Ternaries',
            icon: '⚠️',
            tag: 'Best Practice',
            summary: 'Never nest multiple ternary expressions together (\`a if x else b if y else c\`). Nesting ruins readability; use clear if-elif-else blocks instead!'
          }
        ]
      },
      explanation: 'Ternary expressions compress clean two-way conditional assignments into a single expressive line.'
    },
    {
      id: 'py-tern-2',
      stepNumber: 2,
      title: 'Ternary Syntax Slot',
      description: 'The syntax structure puts the primary expected value first, followed by the condition keyword:\\n\\n\`[result_if_true] if [condition] else [result_if_false]\`.',
      prompt: 'Place the keyword chip to complete the conditional expression:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'status = "Alive" {slot1} health > 0 else "Fallen"',
        chips: ['if', 'when', 'then', 'case'],
        correctAnswer: 'if'
      },
      explanation: 'The syntax is \`[true_val] if [condition] else [false_val]\`.'
    },
    {
      id: 'py-tern-3',
      stepNumber: 3,
      title: 'Evaluating Default Fallbacks with or',
      description: 'In configuration handlers, developers frequently use \`setting = user_value or default_value\`.\\n\\nWhen \`user_value\` is \`None\` or \`""\` (falsy), the expression seamlessly falls back to the default value.',
      prompt: 'Given \`port = configured_port or 8080\`, what is \`port\` when \`configured_port = None\`?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: '8080 — because None is falsy, or falls back to 8080', isCorrect: true },
          { id: 'opt-2', text: 'None', isCorrect: false },
          { id: 'opt-3', text: 'True', isCorrect: false }
        ]
      },
      explanation: 'The \`val or fallback\` pattern is ubiquitous in Python for setting fallback defaults.'
    },
    {
      id: 'py-tern-4',
      stepNumber: 4,
      title: 'Ternary Expressions Sandbox',
      description: 'Run the conditional expression and fallback operator in a live environment to see inline evaluation in practice.',
      prompt: 'Run the program below to test ternary expressions and fallback operators:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`player_balance = 45
status = "Alive" if player_balance > 0 else "Fallen"
print("Player Status:", status)

configured_port = None
default_port = 8080
active_port = configured_port or default_port
print("Active Port:", active_port)
\`,
        expectedOutput: 'Player Status: Alive',
        hints: ['Run the code to verify ternary execution.']
      },
      explanation: 'You verified both ternary conditional expressions and fallback \`or\` operators!'
    }
  ],

  // ─── Lesson 2.4: Defensive Programming, Assertions & Type Hints ─────────────
  'py-week-2-4': [
    {
      id: 'py-def-1',
      stepNumber: 1,
      title: 'Defensive Guardrails & Static Type Hints',
      description: 'Defensive programming enforces contracts at function boundaries using \`assert\` statements and type annotations.\\n\\nAssertions verify internal preconditions during development, halting execution immediately (fail-fast) if an impossible state occurs.',
      prompt: 'Explore how assertions enforce preconditions and how modern Python 3.10+ type hints (\`amount: int\`, \`name: str | None\`) allow static analyzers to catch bugs before execution:',
      type: STEP_TYPES.EXPLORE,
      isTeachingStep: true,
      props: {
        insights: [
          {
            title: 'Fail-Fast with Assertions',
            icon: '🛡️',
            tag: 'Contracts',
            summary: 'Assertions enforce internal programmer contracts: \`assert armor_rating >= 0, "Cannot be negative"\`. If violated, it raises an AssertionError immediately.'
          },
          {
            title: 'The Production -O Flag Trap',
            icon: '⚠️',
            tag: 'Critical Caution',
            summary: 'Running Python with \`python -O script.py\` strips all assert statements completely! Never use assert for security checks or user authentication.'
          },
          {
            title: 'Zero Runtime Penalty Type Hints',
            icon: '🚀',
            tag: 'Performance',
            summary: 'Type hints in Python have ZERO runtime performance penalty. They are stored in \`__annotations__\` for tools like mypy to verify before runtime.'
          }
        ]
      },
      explanation: 'Defensive programming ensures bugs are caught immediately at the boundary rather than corrupting state later.'
    },
    {
      id: 'py-def-2',
      stepNumber: 2,
      title: 'The Production Assertion Pitfall',
      description: 'Python provides an optimization flag: running \`python -O script.py\` tells the bytecode compiler to strip out all \`assert\` statements entirely to maximize execution speed.\\n\\nBecause of this, \`assert\` must NEVER be used for security checks, permissions, or user authentication in production code.',
      prompt: 'Why should you NEVER use \`assert\` statements to validate user authorization or database permissions in production?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Running Python with the -O (optimize) flag strips out all assert statements completely!', isCorrect: true },
          { id: 'opt-2', text: 'Assertions cause severe memory leaks', isCorrect: false },
          { id: 'opt-3', text: 'Assertions only work in debug versions of Linux', isCorrect: false }
        ]
      },
      explanation: 'PEP 205 explicitly notes that python -O removes assertions at bytecode compilation. Use explicit \`if not authorized: raise PermissionError()\` for security!'
    },
    {
      id: 'py-def-3',
      stepNumber: 3,
      title: 'Enforcing Non-Negative Balance',
      description: 'An assertion statement takes the syntax \`assert condition, "Optional Error Message"\`.\\n\\nIf the condition evaluates to \`False\`, Python immediately raises an \`AssertionError\` with your message.',
      prompt: 'Complete the assertion statement to guarantee account balance is never negative:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: '{slot1} balance >= 0, "Balance cannot be negative!"',
        chips: ['assert', 'check', 'verify', 'require'],
        correctAnswer: 'assert'
      },
      explanation: '\`assert condition, error_message\` validates internal assumptions during development.'
    },
    {
      id: 'py-def-4',
      stepNumber: 4,
      title: 'Type Hints & Contracts Sandbox',
      description: 'Python 3.5+ type annotations (\`x: int -> float\`) provide self-documenting signatures and enable static type checkers like mypy to catch bugs before runtime, with zero performance penalty at execution.',
      prompt: 'Run the program below to verify type-annotated functions and defensive assertions:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`def calculate_defense(armor_rating: int, shield_active: bool) -> float:
    assert armor_rating >= 0, "Armor rating cannot be negative!"
    multiplier: float = 1.5 if shield_active else 1.0
    return armor_rating * multiplier

defense = calculate_defense(40, True)
print("Defense Rating:", defense)
\`,
        expectedOutput: 'Defense Rating: 60.0',
        hints: ['Run the code to see type-hinted execution.']
      },
      explanation: 'Defensive assertions and type hints make code self-documenting and resilient!'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PYTHON TRACK: MODULE 3 — Loops & Iteration Patterns (Up to half of Mod 3)
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Lesson 3.0: For Loops, Sequences & The Iterable Protocol ───────────────
  'py-week-3-0': [
    {
      id: 'py-iter-1',
      stepNumber: 1,
      title: 'How Python’s For Loop Works Under the Hood',
      description: 'In languages like C or Java, loops often manage integer index counters (\`for (int i=0; i<len; i++)\`). Python loops are fundamentally different: they operate via the Iterable Protocol.\\n\\nWhen you write \`for item in sequence:\`, Python calls \`iter(sequence)\` to obtain an iterator, then repeatedly calls \`next(iterator)\` until the iterator raises a \`StopIteration\` exception, which Python silently catches to terminate the loop.',
      prompt: 'Click \`next(iterator) ➔\` below to step through sequence elements. Watch the internal pointer advance until \`StopIteration\` is raised and caught by Python to cleanly terminate the loop:',
      type: STEP_TYPES.ITERATOR_PROTOCOL,
      isTeachingStep: true,
      props: {
        items: ['Python', 'Django', 'FastAPI', 'PyTorch']
      },
      explanation: 'Python loops don’t manage C-style index counters. When you write \`for item in items:\`, Python invokes \`iter(items)\` and repeatedly calls \`next()\` until \`StopIteration\` is caught!'
    },
    {
      id: 'py-iter-2',
      stepNumber: 2,
      title: 'The Mechanics of Iteration',
      description: 'Any Python object that implements the \`__iter__()\` and \`__next__()\` dunder methods can be iterated over.\\n\\nThis unified protocol powers lists, tuples, sets, dictionaries, file streams, and generator functions.',
      prompt: 'What actually happens under the hood when Python executes \`for x in [1, 2, 3]:\`?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Python calls iter() on the list and repeatedly calls next() until StopIteration is raised', isCorrect: true },
          { id: 'opt-2', text: 'Python creates an i = 0 counter and indexes with i++', isCorrect: false },
          { id: 'opt-3', text: 'Python executes all iterations in parallel simultaneously', isCorrect: false }
        ]
      },
      explanation: 'Python’s iteration protocol is universal: any custom object that implements \`__iter__()\` and \`__next__()\` can be looped over seamlessly.'
    },
    {
      id: 'py-iter-3',
      stepNumber: 3,
      title: 'Generating Number Sequences with range()',
      description: 'The built-in \`range(stop)\` type represents an immutable arithmetic sequence of integers.\\n\\nCrucially, \`range(1000000)\` does not allocate a million numbers in RAM; it computes numbers on-the-fly in O(1) constant memory space.',
      prompt: 'Complete the loop to generate numbers 0, 1, 2, 3, 4:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'for i in {slot1}(5):\\n    print(i)',
        chips: ['range', 'list', 'sequence', 'counter'],
        correctAnswer: 'range'
      },
      explanation: '\`range(5)\` is an immutable sequence type that computes numbers on demand in O(1) memory without creating an entire list in RAM.'
    },
    {
      id: 'py-iter-4',
      stepNumber: 4,
      title: 'For-Loop Iteration Sandbox',
      description: 'Iterate directly over sequence items and accumulate the total string length using the built-in \`len()\` function.\\n\\nNotice how clean Python loops are compared to manual counter indexing.',
      prompt: 'Run the program below to iterate over a list and compute total sum:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`languages = ["Python", "JavaScript", "Rust", "Go"]
total_letters = 0

for lang in languages:
    total_letters += len(lang)

print("Total letters in languages:", total_letters)
\`,
        expectedOutput: 'Total letters in languages: 22',
        hints: ['Run the code to see sequential iteration in action. (6+10+4+2 = 22 letters)']
      },
      explanation: 'The loop processed every item smoothly using Python’s iterable protocol!'
    }
  ],

  // ─── Lesson 3.1: While Loops, Loop Invariants & Halting Problems ─────────────
  'py-week-3-1': [
    {
      id: 'py-while-1',
      stepNumber: 1,
      title: 'While Loop Invariant Explorer',
      description: 'A \`while\` loop continuously executes its block as long as its boolean condition remains \`True\`.\\n\\nEvery robust while loop must maintain a progress invariant: within the body, some variable must advance closer to making the condition \`False\`. Without this progress, the loop executes infinitely (the Halting Problem).',
      prompt: 'Drag the iteration target slider below to observe how the condition \`count < target\` dictates termination. If the loop variable never updates, a loop will run forever (the Halting problem)!',
      type: STEP_TYPES.SLIDER,
      isTeachingStep: true,
      props: {
        min: 1,
        max: 20,
        step: 1,
        initial: 5,
        label: 'Loop Target Cycles',
        unit: 'cycles'
      },
      explanation: 'A while loop repeats its body as long as its boolean condition holds True. Every while loop must have a progress invariant that moves state toward False!'
    },
    {
      id: 'py-while-2',
      stepNumber: 2,
      title: 'Causes of an Infinite Loop',
      description: 'An infinite loop occurs when the loop condition’s dependencies never change within the loop body.\\n\\nFor instance, if you check \`while counter < 10:\` but forget to increment \`counter\`, the condition remains permanently True, freezing the thread.',
      prompt: 'What causes an infinite loop in a \`while\` loop construct?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'The condition never evaluates to False because the state variable is not modified inside the body', isCorrect: true },
          { id: 'opt-2', text: 'The computer runs out of physical memory', isCorrect: false },
          { id: 'opt-3', text: 'The loop runs faster than the CPU clock speed', isCorrect: false }
        ]
      },
      explanation: 'Without updating the state variable, the while condition stays permanently True, freezing the thread.'
    },
    {
      id: 'py-while-3',
      stepNumber: 3,
      title: 'Progress Invariant Increment',
      description: 'The augmented assignment operator \`+=\` modifies a variable in place (\`count += 1\` is shorthand for \`count = count + 1\`), advancing the state towards the loop exit condition.',
      prompt: 'Complete the countdown loop by incrementing the counter variable:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'count = 0\\nwhile count < 5:\\n    print(count)\\n    count {slot1} 1',
        chips: ['+=', '-=', '*=', '='],
        correctAnswer: '+='
      },
      explanation: '\`count += 1\` increments count in every cycle, ensuring the loop reaches 5 and terminates cleanly.'
    },
    {
      id: 'py-while-4',
      stepNumber: 4,
      title: 'While Loop Execution Sandbox',
      description: 'Observe a countdown while loop that decrements energy by 25 on each round until energy drops to 20 or below.\\n\\nNotice how the condition is checked prior to every iteration.',
      prompt: 'Run the countdown while loop below:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`energy = 100
rounds = 0

while energy > 20:
    energy -= 25
    rounds += 1

print(f"Rounds fought: {rounds} | Remaining Energy: {energy}")
\`,
        expectedOutput: 'Rounds fought: 4 | Remaining Energy: 0',
        hints: ['Run the code to see while loop termination.']
      },
      explanation: 'The loop completed 4 cycles and cleanly exited when energy dropped below 20!'
    }
  ],

  // ─── Lesson 3.2: Break, Continue, Else & Loop Control Flow ───────────────────
  'py-week-3-2': [
    {
      id: 'py-ctrl-1',
      stepNumber: 1,
      title: 'Visualizing Loop Jumps: break vs continue',
      description: 'Loop control statements alter the normal execution sequence.\\n\\n\`continue\` immediately aborts the current iteration and jumps to the next cycle. \`break\` immediately terminates the loop entirely, exiting to the first statement following the loop.',
      prompt: 'Click \`Step Loop ➔\` below to watch execution traverse an array of numbers. Watch \`continue\` jump over negative numbers, and \`break\` immediately shatter the loop when \`99\` is reached!',
      type: STEP_TYPES.LOOP_CONTROL,
      isTeachingStep: true,
      props: {},
      explanation: '\`continue\` aborts the current cycle and skips directly to the next iteration. \`break\` shatters the entire loop structure immediately, jumping to the first statement outside!'
    },
    {
      id: 'py-ctrl-2',
      stepNumber: 2,
      title: 'The Special for-else Block in Python',
      description: 'One of Python’s most distinctive and misunderstood features is the \`else\` clause attached to a loop.\\n\\nA \`for-else\` or \`while-else\` block executes ONLY if the loop completes all iterations naturally WITHOUT encountering a \`break\`. If the loop is terminated early by \`break\`, the \`else\` block is completely skipped.',
      prompt: 'What does the \`else\` block attached directly to a \`for\` loop do in Python?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'It executes ONLY if the loop completes normally WITHOUT hitting a \`break\`', isCorrect: true },
          { id: 'opt-2', text: 'It executes on every single loop iteration', isCorrect: false },
          { id: 'opt-3', text: 'It is a syntax error in Python', isCorrect: false }
        ]
      },
      explanation: 'One of Python’s most unique features! A \`for-else\` block runs only if the loop exhausts all elements without encountering a \`break\`. It is ideal for search algorithms.'
    },
    {
      id: 'py-ctrl-3',
      stepNumber: 3,
      title: 'Terminating Early with break',
      description: 'When searching for an element in an unsorted list, continuing to scan after the element is found wastes CPU cycles.\\n\\nCalling \`break\` exits the loop as soon as the target is acquired.',
      prompt: 'Place the keyword chip to abort scanning as soon as the target is found:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'for item in inventory:\\n    if item == "Holy Grail":\\n        found = True\\n        {slot1}  # Stop scanning immediately!',
        chips: ['break', 'continue', 'pass', 'return'],
        correctAnswer: 'break'
      },
      explanation: '\`break\` terminates the loop immediately, saving wasted iterations once your target is acquired.'
    },
    {
      id: 'py-ctrl-4',
      stepNumber: 4,
      title: 'For-Else Search Sandbox',
      description: 'Run the search algorithm below.\\n\\nBecause \`bob\` is found, the loop executes \`break\`, which suppresses the \`else\` block. If you changed the target to an absent user, the loop would exhaust all items and trigger the \`else\` block!',
      prompt: 'Run the program below demonstrating \`break\` and Python’s unique \`for-else\` construct:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`users = ["alice", "bob", "charlie"]
target = "bob"

for user in users:
    if user == target:
        print(f"Found {target}!")
        break
else:
    print("User was not found in the list.")
\`,
        expectedOutput: 'Found bob!',
        hints: ['Run the code to see break prevent the else block from executing.']
      },
      explanation: 'Because \`break\` was triggered, the \`else\` block was bypassed. If you change target to "david", the else block will execute!'
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // DSA TRACK: COMPLEXITY & ALGORITHMS (Preserved)
  // ═══════════════════════════════════════════════════════════════════════════
  'week-5-0': [
    {
      id: 'dsa-bigo-1',
      stepNumber: 1,
      title: 'Interactive Complexity Explorer',
      description: 'Algorithmic efficiency measures how resource consumption (time or memory) scales as input size N grows toward infinity.\\n\\nWhile hardware gets faster, an inefficient algorithm (O(N²)) will quickly become intractable on large datasets compared to an optimal logarithmic algorithm (O(log N)).',
      prompt: 'Before answering questions, build intuition for scale. Drag the dataset size slider below to observe how O(1), O(log N), O(N), and O(N²) operations diverge as input size N grows:',
      type: STEP_TYPES.SLIDER,
      isTeachingStep: true,
      props: {
        min: 5,
        max: 100,
        step: 5,
        initial: 25,
        label: 'Dataset Size N',
        unit: 'Records'
      },
      explanation: 'Notice how O(N²) explodes rapidly toward 10,000 operations, whereas O(log N) stays virtually flat. At scale, algorithmic efficiency matters far more than faster hardware.'
    },
    {
      id: 'dsa-bigo-2',
      stepNumber: 2,
      title: 'The Growth of Scale',
      description: 'Binary Search repeatedly cuts the remaining search space in half. Mathematically, the number of steps required to find an item among N sorted elements is given by ceil(log₂ N).\\n\\nFor 1,000,000 items, log₂(1,000,000) ≈ 19.93 comparisons.',
      prompt: 'Imagine an algorithm that checks 1,000,000 user records. Brute force tests every pair (N²), while Binary Search halves the space (log N). How many operations does Binary Search take?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Approximately 20 operations (log₂ 1,000,000 ≈ 20)', isCorrect: true },
          { id: 'opt-2', text: '500,000 operations (half the input size)', isCorrect: false },
          { id: 'opt-3', text: '1,000 operations (square root of N)', isCorrect: false },
          { id: 'opt-4', text: '1,000,000 operations (one check per item)', isCorrect: false }
        ]
      },
      explanation: 'Because log₂(1,000,000) ≈ 19.93, binary search needs only 20 comparisons to find ANY item among 1 million records! Halving search space is one of the most powerful ideas in computing.'
    },
    {
      id: 'dsa-bigo-3',
      stepNumber: 3,
      title: 'Classifying Loop Structures',
      description: 'Big-O notation classifies operations by their dominant term. A single loop running from 0 to N-1 doing constant O(1) work per iteration runs in strictly linear O(N) time.\\n\\nNesting another inner loop would immediately degrade performance to quadratic O(N²).',
      prompt: 'Complete the loop structure below so that it executes in strictly O(N) linear time:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'for i in range(len(arr)):\\n    # Process single element in O(1)\\n    {slot1}',
        chips: ['total += arr[i]', 'for j in range(len(arr)): total += arr[j]', 'total += sum(arr)'],
        correctAnswer: 'total += arr[i]'
      },
      explanation: 'A single loop that does constant O(1) work per element runs in strictly O(N) linear time. Nesting another loop would immediately degrade complexity to O(N²).'
    },
    {
      id: 'dsa-bigo-4',
      stepNumber: 4,
      title: 'Hands-on Big-O Code Sandbox',
      description: 'Run a benchmark comparing linear scan operations (N) against binary search comparisons (log₂ N) on 1,000 records.',
      prompt: 'Run the program below to observe the operation count difference between Linear Scan and Binary Search on 1,000 elements:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`# Comparing O(N) vs O(log2 N) on 1000 items
import math

n = 1000
linear_ops = n
binary_ops = math.ceil(math.log2(n))

print(f"Linear Search operations: {linear_ops}")
print(f"Binary Search operations: {binary_ops}")
print(f"Speedup Factor: {linear_ops // binary_ops}x faster!")
\`,
        expectedOutput: 'Speedup Factor: 100x faster!',
        hints: ['Click "▶ Run Code" to execute the benchmark.']
      },
      explanation: 'Binary Search is 100 times faster on just 1,000 elements—and on 1 billion elements, it is over 30,000,000 times faster!'
    }
  ],

  'week-5-1': [
    {
      id: 'dsa-2ptr-1',
      stepNumber: 1,
      title: 'The Inward Convergence',
      description: 'The Two Pointers technique solves target sum and interval problems on sorted arrays in O(N) linear time by avoiding O(N²) nested loops.\\n\\nBy placing one pointer at the start (smallest value) and one at the end (largest value), we can deterministically adjust the sum: if the sum is too small, advance left; if too large, decrement right.',
      prompt: 'In a sorted array [2, 7, 11, 15] with Target = 18, our left pointer is at 2 (idx 0) and right is at 15 (idx 3). Their sum is 17. Since 17 < 18, how should the pointers move?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Advance left pointer to the right (left += 1) to increase the sum', isCorrect: true },
          { id: 'opt-2', text: 'Move right pointer to the left (right -= 1) to increase the sum', isCorrect: false },
          { id: 'opt-3', text: 'Move both pointers simultaneously', isCorrect: false }
        ]
      },
      explanation: 'Because the array is sorted, values increase as you move right. Since our current sum 17 is too small, advancing left to a larger value is the only way to reach 18.'
    },
    {
      id: 'dsa-2ptr-2',
      stepNumber: 2,
      title: 'Interactive Pointer Inspection',
      description: 'With array [2, 7, 11, 15], our right pointer is at index 2 (value 11). To hit the target sum 18, we need the complement value: 18 - 11 = 7.',
      prompt: 'Tap the target cell where the left pointer should move to find a sum that equals 18 with 11 (at index 2):',
      type: STEP_TYPES.ARRAY,
      props: {
        initialArray: [2, 7, 11, 15],
        targetIndex: 1,
        targetValue: 7,
        targetLabel: 'Complement (18 - 11)'
      },
      explanation: 'Index 1 holds value 7! When combined with 11 (index 2), 7 + 11 = 18! Both pointers converge in strictly O(N) time without nested loops.'
    },
    {
      id: 'dsa-2ptr-3',
      stepNumber: 3,
      title: 'Pointer Invariant Code Slot',
      description: 'Opposite-direction two-pointer traversals must maintain the invariant that pointers do not cross or examine the same index twice: \`while left < right\`.',
      prompt: 'Complete the while loop condition that guarantees opposite-direction pointers never cross over:',
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'left = 0\\nright = len(nums) - 1\\nwhile {slot1}:\\n    current_sum = nums[left] + nums[right]',
        chips: ['left < right', 'left <= len(nums)', 'left != right', 'right > 0'],
        correctAnswer: 'left < right'
      },
      explanation: 'Using \`while left < right\` guarantees we only inspect distinct pairs and terminate cleanly when pointers meet in the middle.'
    },
    {
      id: 'dsa-2ptr-4',
      stepNumber: 4,
      title: 'Hands-on Two Pointers Runner',
      description: 'Execute the complete two-pointer algorithm live to observe single-pass O(N) pair matching without nested loops.',
      prompt: 'Run the two-pointer solution below to find the target sum pair in O(N) single-pass time:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: 'python',
        starterCode: \`nums = [2, 7, 11, 15]
target = 18

left = 0
right = len(nums) - 1

while left < right:
    s = nums[left] + nums[right]
    if s == target:
        print(f"Found pair: nums[{left}]={nums[left]} + nums[{right}]={nums[right]} == {target}")
        break
    elif s < target:
        left += 1
    else:
        right -= 1
\`,
        expectedOutput: 'Found pair: nums[1]=7 + nums[2]=11 == 18',
        hints: ['Click "▶ Run Code" to execute.']
      },
      explanation: 'Two pointers eliminated the need for an O(N²) nested loop!'
    }
  ],

  'week-8-4': binarySearchModule.steps
};

/**
 * Lookup handcrafted steps for a given week & lesson index.
 */
export function getHandcraftedSteps(weekId, lessonIndex) {
  const key = \`\${weekId}-\${lessonIndex}\`;
  return HANDCRAFTED_LESSONS[key] || null;
}
`;

fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully refined interactiveLessonsLibrary.js with rich descriptions and question fixes!');
