import { STEP_TYPES } from '../../types/lesson.js';

/**
 * Module m1-1: Thinking in Code — Expressions, State & Memory
 * Lessons 1.1.1 to 1.1.5 built on the Brilliant.org 5-screen arc:
 * - Screen 1: Hook (Visual manipulation / discovery)
 * - Screen 2: Mental Model (Invariant named + prediction)
 * - Screen 3: Manipulation (Parameter tuning / token slotting)
 * - Screen 4: Bug Hunt (Edge-case / counterexample patch)
 * - Screen 5: Boss Synthesis (Real Python code challenge + 3-tier progressive hints)
 */

export const m1_1_lessons = [
  // ─── 1.1.1: The Sequential Machine ───────────────────────────────────────────
  {
    id: '1.1.1',
    moduleId: 'm1-1',
    title: 'The Sequential Machine',
    subtitle: 'Top-to-bottom execution, expressions & print()',
    duration: '10 min',
    starterCode: `# Reorder statements to compute total cost with shipping\nitem_cost = 45\nshipping = 10\ntotal = item_cost + shipping\nprint(f"Total: \${total}")`,
    screens: [
      {
        role: 'hook',
        title: 'Step by Step Execution',
        prompt: 'Python executes code strictly one line at a time from top to bottom. Scrub the timeline slider forward to watch the instruction pointer execute each statement in sequence.',
        type: STEP_TYPES.SCRUBBER,
        props: {
          codeLines: [
            'x = 10',
            'y = 20',
            'total = x + y',
            'print(total)'
          ],
          steps: [
            { line: 0, vars: {}, output: '', desc: 'Instruction pointer ready at line 1' },
            { line: 0, vars: { x: 10 }, output: '', desc: 'Line 1: Evaluates 10 and binds name x' },
            { line: 1, vars: { x: 10, y: 20 }, output: '', desc: 'Line 2: Evaluates 20 and binds name y' },
            { line: 2, vars: { x: 10, y: 20, total: 30 }, output: '', desc: 'Line 3: Computes 10 + 20 -> binds total = 30' },
            { line: 3, vars: { x: 10, y: 20, total: 30 }, output: '30', desc: 'Line 4: Sends 30 to standard output' },
          ]
        },
        explanation: 'The sequential machine never skips ahead or peeks into the future. Each expression evaluates using only names defined earlier.'
      },
      {
        role: 'mental_model',
        title: 'Name Before Definition Trap',
        prompt: 'What happens if a program tries to evaluate an expression using a variable name before that variable has been assigned on a prior line?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'err',
              text: 'Python halts immediately with a NameError crash.',
              isCorrect: true,
              feedback: 'Exact! Python looks up names at runtime in the active namespace. If unbound, it raises NameError.'
            },
            {
              id: 'zero',
              text: 'Python assumes the variable defaults to 0 or None.',
              isCorrect: false,
              feedback: 'Python does not use default dummy values for unbound variables.'
            },
            {
              id: 'hoist',
              text: 'Python scans the entire file first and hoists assignments.',
              isCorrect: false,
              feedback: 'Python does not hoist variable assignments like JavaScript var declarations.'
            }
          ]
        },
        explanation: 'Sequential ordering is an absolute invariant: names must be bound before they can be read in an expression.'
      },
      {
        role: 'manipulation',
        title: 'Restore the Flight Sequence',
        prompt: 'Drag the drone flight instructions into the correct sequence so coordinates are computed before the telemetry report is printed.',
        type: STEP_TYPES.SORT_ORDER,
        props: {
          items: [
            { id: 'step_init', text: 'altitude = 120' },
            { id: 'step_boost', text: 'boost = 30' },
            { id: 'step_calc', text: 'current_alt = altitude + boost' },
            { id: 'step_print', text: 'print("Cruising at:", current_alt)' }
          ],
          correctOrder: ['step_init', 'step_boost', 'step_calc', 'step_print']
        },
        explanation: 'Computing `current_alt` depends on both `altitude` and `boost`. The print statement must come last.'
      },
      {
        role: 'bug_hunt',
        title: 'The Premature Print Bug',
        prompt: 'A junior engineer wrote this checkout sequence, but running it causes a fatal crash. What is the fundamental bug?',
        type: STEP_TYPES.PREDICTION,
        props: {
          code: 'print(f"Receipt total: {final_total}")\nsubtotal = 50\ntax = 4\nfinal_total = subtotal + tax',
          options: [
            {
              id: 'line1',
              text: 'Line 1 reads final_total before line 4 defines it.',
              isCorrect: true,
              feedback: 'Spot on! Moving line 1 after line 4 resolves the crash.'
            },
            {
              id: 'fstr',
              text: 'f-strings cannot compute variables containing underscores.',
              isCorrect: false,
              feedback: 'Variable names with underscores are completely valid inside f-string brackets.'
            },
            {
              id: 'tax',
              text: 'Tax cannot be an integer literal.',
              isCorrect: false,
              feedback: '4 is a valid integer literal.'
            }
          ]
        },
        explanation: 'Moving the print call below the definition of `final_total` aligns the code with Python top-to-bottom execution order.'
      },
      {
        role: 'boss_synthesis',
        title: 'Sequential Telemetry Pipeline',
        prompt: 'Given base price `base = 80` and discount `coupon = 15`, calculate `discounted_price`, add `shipping = 10`, and print the final invoice in the exact format: `Payable: $75`',
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `base = 80\ncoupon = 15\nshipping = 10\n\n# 1. Compute discounted price (base minus coupon)\n\n# 2. Add shipping to find final total\n\n# 3. Print in exact format "Payable: $<total>"\n`,
          expectedOutput: 'Payable: $75',
          hints: [
            'Subtract coupon from base first, then add shipping to the result.',
            'Use an f-string or string concatenation: f"Payable: ${total}".',
            'Final solution structure:\ndiscounted = base - coupon\ntotal = discounted + shipping\nprint(f"Payable: ${total}")'
          ]
        },
        explanation: 'You successfully structured an end-to-end sequential pipeline where each expression builds directly upon prior variables!'
      }
    ]
  },

  // ─── 1.1.2: Variables Are Labels, Not Boxes ──────────────────────────────────
  {
    id: '1.1.2',
    moduleId: 'm1-1',
    title: 'Variables Are Labels, Not Boxes',
    subtitle: 'Name binding, object id() & reassignment',
    duration: '12 min',
    starterCode: `score = 10\nbonus = score\nscore = score + 5\nprint(f"score: {score}, bonus: {bonus}")`,
    screens: [
      {
        role: 'hook',
        title: 'Stack Labels vs Heap Objects',
        prompt: 'In C or Java, variables are often imagined as boxes holding numbers. In Python, variables are lightweight label tags pointing to heap objects. Click the buttons to observe how bindings move.',
        type: STEP_TYPES.MEMORY_MODEL,
        props: {
          target: 'bind_both'
        },
        explanation: 'Notice how both `score` and `bonus` can point to the exact same immutable integer object `10` in memory simultaneously.'
      },
      {
        role: 'mental_model',
        title: 'Reassignment Invariant',
        prompt: 'If `a = [1, 2]` and `b = a`, then we reassign `a = [9, 9]`. What does `b` point to now?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'orig',
              text: 'b still points to the original [1, 2] list object.',
              isCorrect: true,
              feedback: 'Exactly! Reassigning "a" moves the "a" tag to a new object. It does not overwrite the object "b" points to.'
            },
            {
              id: 'both',
              text: 'b also changes to [9, 9] because b was bound to a.',
              isCorrect: false,
              feedback: 'Variables point to objects, not to other variables. Reassigning "a" leaves "b" undisturbed.'
            },
            {
              id: 'err',
              text: 'Python throws an UnboundRef error.',
              isCorrect: false,
              feedback: 'Python permits reassigning names freely.'
            }
          ]
        },
        explanation: 'Variables point to objects, never to other variables. When you write `a = new_val`, you move the label `a`, leaving `b` still pointing to the original object.'
      },
      {
        role: 'manipulation',
        title: 'Targeted Label Binding',
        prompt: 'Manipulate the memory bindings until `x` points to 20 and `y` points to 10.',
        type: STEP_TYPES.MEMORY_MODEL,
        props: {
          target: 'reassign_x'
        },
        explanation: 'Reassigning a label creates a new pointer in the stack frame without destroying the old heap object.'
      },
      {
        role: 'bug_hunt',
        title: 'The Shared Reference Trap',
        prompt: 'Look closely at this snippet:\n```python\nplayer1 = {"gems": 5}\nplayer2 = player1\nplayer2["gems"] = 99\n```\nWhy did `player1["gems"]` also become 99?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'alias',
              text: 'player1 and player2 both label the exact same dictionary object in heap memory.',
              isCorrect: true,
              feedback: 'Spot on! This is aliasing. Mutating the object through player2 reflects when read via player1.'
            },
            {
              id: 'global',
              text: 'Dictionaries are always globally shared across threads.',
              isCorrect: false,
              feedback: 'This is standard single-threaded object aliasing.'
            },
            {
              id: 'leak',
              text: 'Python garbage collection failed to duplicate the values.',
              isCorrect: false,
              feedback: 'Assignment (=) never clones objects in Python; it only binds names.'
            }
          ]
        },
        explanation: 'Assignment binds an existing object to a new name. To create an independent duplicate, use `player1.copy()`.'
      },
      {
        role: 'boss_synthesis',
        title: 'Swap Labels Without Clones',
        prompt: 'Given two variables `alpha = "data"` and `beta = "model"`, swap their bindings so `alpha` is `"model"` and `beta` is `"data"`. Print them on one line separated by a space.',
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `alpha = "data"\nbeta = "model"\n\n# Swap the variable bindings\n\n\n# Print alpha and beta separated by space\nprint(f"{alpha} {beta}")`,
          expectedOutput: 'model data',
          hints: [
            'In Python, you can swap in one line using tuple unpacking: a, b = b, a.',
            'Alternatively, use a temporary reference: temp = alpha; alpha = beta; beta = temp.',
            'Ensure the final print statement outputs: model data'
          ]
        },
        explanation: 'Python elegant `a, b = b, a` swaps label pointers atomically via tuple packing and unpacking without temporary variables!'
      }
    ]
  },

  // ─── 1.1.3: Arithmetic & Modular Clocks ──────────────────────────────────────
  {
    id: '1.1.3',
    moduleId: 'm1-1',
    title: 'Arithmetic & Modular Clocks',
    subtitle: 'int, float, //, %, and ** operations',
    duration: '10 min',
    starterCode: `total_minutes = 197\nhours = total_minutes // 60\nmins = total_minutes % 60\nprint(f"{hours}h {mins}m")`,
    screens: [
      {
        role: 'hook',
        title: 'True Division vs Floor Division',
        prompt: 'In Python, `/` always yields a float (e.g. 7 / 2 -> 3.5), whereas `//` truncates down to the nearest integer floor (7 // 2 -> 3). Scrub through the mathematical clock below.',
        type: STEP_TYPES.SCRUBBER,
        props: {
          codeLines: [
            'total_seconds = 3675',
            'hours = total_seconds // 3600',
            'rem_seconds = total_seconds % 3600',
            'minutes = rem_seconds // 60',
            'seconds = rem_seconds % 60'
          ],
          steps: [
            { line: 0, vars: { total_seconds: 3675 }, desc: 'Total seconds to partition' },
            { line: 1, vars: { total_seconds: 3675, hours: 1 }, desc: '3675 // 3600 -> 1 full hour' },
            { line: 2, vars: { total_seconds: 3675, hours: 1, rem_seconds: 75 }, desc: '3675 % 3600 -> 75 seconds left' },
            { line: 3, vars: { total_seconds: 3675, hours: 1, rem_seconds: 75, minutes: 1 }, desc: '75 // 60 -> 1 minute' },
            { line: 4, vars: { total_seconds: 3675, hours: 1, rem_seconds: 75, minutes: 1, seconds: 15 }, desc: '75 % 60 -> 15 seconds' },
          ]
        },
        explanation: 'The integer division `//` and modulus `%` pair forms the mathematical basis for all cyclic systems and radix conversions.'
      },
      {
        role: 'mental_model',
        title: 'Negative Modulo Invariant',
        prompt: 'What is `-1 % 24` in Python? (Hint: in Python, the result of % always takes the sign of the divisor).',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: '23',
              text: '23',
              isCorrect: true,
              feedback: 'Brilliant! Python defines modulo using floor division: r = a - b * (a // b). -1 // 24 = -1, so -1 - 24*(-1) = 23.'
            },
            {
              id: 'neg1',
              text: '-1',
              isCorrect: false,
              feedback: 'In C/Java -1 % 24 is -1, but Python wraps cyclically around positive divisors to 23.'
            },
            {
              id: 'err',
              text: 'ZeroDivisionError or ValueError.',
              isCorrect: false,
              feedback: 'Modulo with positive integers is completely valid.'
            }
          ]
        },
        explanation: 'Python mathematical choice for `%` makes it wrap around seamlessly on cyclic dials (like a 24-hour clock stepping 1 hour back).'
      },
      {
        role: 'manipulation',
        title: 'Modular Clock Arithmetic',
        prompt: 'Fill in the operator slot so `197 {slot1} 60` calculates the leftover minutes (17).',
        type: STEP_TYPES.CODE_FILL,
        props: {
          template: 'minutes = 197 {slot1} 60',
          correctAnswer: '%',
          chips: ['%', '//', '/', '**']
        },
        explanation: 'The modulus operator `%` returns the remainder after integer division.'
      },
      {
        role: 'bug_hunt',
        title: 'The Float Precision Leak',
        prompt: 'Why does `0.1 + 0.2 == 0.3` evaluate to `False` in Python?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'ieee',
              text: 'IEEE 754 binary floating point cannot represent 0.1 and 0.2 exactly in base 2.',
              isCorrect: true,
              feedback: 'Exact! 0.1 + 0.2 results in 0.30000000000000004 in 64-bit IEEE float format.'
            },
            {
              id: 'bug',
              text: 'Python arithmetic parser has an integer truncation bug.',
              isCorrect: false,
              feedback: 'This is fundamental computer hardware architecture, not a Python bug.'
            },
            {
              id: 'str',
              text: 'Floats must be cast to string before equality checks.',
              isCorrect: false,
              feedback: 'Use math.isclose(a, b) for safe floating point comparison.'
            }
          ]
        },
        explanation: 'Always use `math.isclose()` or `decimal.Decimal` when comparing floating point calculations.'
      },
      {
        role: 'boss_synthesis',
        title: 'Cyclic Time Converter',
        prompt: 'Given `total_seconds = 7384`, compute the corresponding `hours`, `minutes`, and remaining `seconds`. Print the formatted time string as `02:03:04`.',
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `total_seconds = 7384\n\nhours = total_seconds // 3600\nrem = total_seconds % 3600\nminutes = rem // 60\nseconds = rem % 60\n\n# Format with 2-digit zero padding: {:02d}\nresult = f"{hours:02d}:{minutes:02d}:{seconds:02d}"\nprint(result)`,
          expectedOutput: '02:03:04',
          hints: [
            '3600 seconds in an hour, 60 seconds in a minute.',
            'Use rem = total_seconds % 3600 to find the leftover seconds after taking hours.',
            'Use f"{hours:02d}:{minutes:02d}:{seconds:02d}" for zero-padded two-digit formatting.'
          ]
        },
        explanation: 'Mastering integer division and modulus is essential for time arithmetic, pagination, and hash buckets.'
      }
    ]
  },

  // ─── 1.1.4: Strings & Pattern Assembly ────────────────────────────────────────
  {
    id: '1.1.4',
    moduleId: 'm1-1',
    title: 'Strings & Pattern Assembly',
    subtitle: 'Literals, concatenation, repetition & f-strings',
    duration: '10 min',
    starterCode: `user = "Alex"\nrole = "Admin"\nbadge = f"[{role.upper()}] {user}"\nprint(badge)`,
    screens: [
      {
        role: 'hook',
        title: 'String Multipliers and Borders',
        prompt: 'In Python, multiplying a string by an integer repeats it: `"=" * 10` produces `"=========="`. Choose the correct expression to assemble a header banner.',
        type: STEP_TYPES.CODE_FILL,
        props: {
          template: 'banner = "#" {slot1} 8',
          correctAnswer: '*',
          chips: ['*', '+', '**', '//']
        },
        explanation: 'String multiplication is an idiomatic Python mechanism for generating repeating delimiters, padded tables, and ASCII borders.'
      },
      {
        role: 'mental_model',
        title: 'f-String Expressions Invariant',
        prompt: 'What can be placed inside an f-string replacement field `{...}`?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'expr',
              text: 'Any valid Python expression, including function calls, arithmetic, and attribute access.',
              isCorrect: true,
              feedback: 'Correct! f"{x * 2}" and f"{name.strip().upper()}" are evaluated at runtime.'
            },
            {
              id: 'varonly',
              text: 'Only simple variable names.',
              isCorrect: false,
              feedback: 'f-strings support full Python expressions, not just names.'
            },
            {
              id: 'nostr',
              text: 'Expressions that evaluate to numbers only.',
              isCorrect: false,
              feedback: 'Any object that implements __format__ or __str__ works.'
            }
          ]
        },
        explanation: 'f-strings evaluate expressions inside `{...}` directly at runtime and format the result into the string.'
      },
      {
        role: 'manipulation',
        title: 'Format Specifiers',
        prompt: 'Slot the correct format token to display float `pi = 3.14159` rounded to exactly 2 decimal places.',
        type: STEP_TYPES.CODE_FILL,
        props: {
          template: 'formatted = f"{pi:{slot1}}"',
          correctAnswer: '.2f',
          chips: ['.2f', '2d', '%2', 'round']
        },
        explanation: 'The format specifier `:.2f` instructs Python to render a floating-point number with 2 digits after the decimal point.'
      },
      {
        role: 'bug_hunt',
        title: 'The Accidental Tuple Bug',
        prompt: 'Look at this code:\n```python\nheader = "Invoice #1042",\nprint(type(header))\n```\nWhy is `type(header)` a `tuple` rather than `str`?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'comma',
              text: 'The trailing comma creates a 1-element tuple in Python.',
              isCorrect: true,
              feedback: 'Spot on! In Python, commas create tuples, not parentheses.'
            },
            {
              id: 'hash',
              text: 'The # symbol inside the string opened an internal comment.',
              isCorrect: false,
              feedback: 'Characters inside string literals are never interpreted as comments.'
            },
            {
              id: 'key',
              text: 'Invoice is a reserved keyword in Python 3.',
              isCorrect: false,
              feedback: 'Invoice is an ordinary word; the trailing comma is the culprit.'
            }
          ]
        },
        explanation: 'In Python, it is the comma `,` that creates tuples. Removing the trailing comma leaves `header` as a pure string.'
      },
      {
        role: 'boss_synthesis',
        title: 'Flight Boarding Pass Generator',
        prompt: 'Generate an ASCII flight ticket card using string replication and f-strings. Given `gate = "B12"`, `seat = "14A"`, and `passenger = "Ada Lovelace"`, produce the exact output:\n```\n=== BOARDING PASS ===\nPASSENGER: ADA LOVELACE\nGATE: B12 | SEAT: 14A\n=====================\n```',
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `gate = "B12"\nseat = "14A"\npassenger = "Ada Lovelace"\n\n# Construct and print the 4-line boarding pass\n`,
          expectedOutput: '=== BOARDING PASS ===\nPASSENGER: ADA LOVELACE\nGATE: B12 | SEAT: 14A\n=====================',
          hints: [
            'Use passenger.upper() to convert name to uppercase.',
            'Line 4 has 21 "=" characters: "=" * 21.',
            'Print all 4 lines or assemble them with \\n in one string.'
          ]
        },
        explanation: 'You synthesized string repetition, methods (.upper()), and multi-line f-strings into a clean production formatter!'
      }
    ]
  },

  // ─── 1.1.5: Shape-Shifting Types & Input ─────────────────────────────────────
  {
    id: '1.1.5',
    moduleId: 'm1-1',
    title: 'Shape-Shifting Types & Input',
    subtitle: 'type(), int(), float(), str(), and type conversion',
    duration: '12 min',
    starterCode: `raw_price = "49.99"\nquantity = "3"\ntotal = float(raw_price) * int(quantity)\nprint(f"Total: \${total:.2f}")`,
    screens: [
      {
        role: 'hook',
        title: 'The Concatenation Bug',
        prompt: 'In web forms and input streams, numeric values arrive as strings. If you add `"15" + "20"`, Python concatenates them into `"1520"` instead of `35`! Test type casting below.',
        type: STEP_TYPES.TYPE_CASTING,
        props: {
          inputs: ['"15"', '"20"', '"42"', '0', '3.14', '""'],
          targetOutput: '35',
          defaultTargetType: 'int'
        },
        explanation: 'Explicit type conversion converts strings into numeric primitives before mathematical operations.'
      },
      {
        role: 'mental_model',
        title: 'int("3.14") ValueError Invariant',
        prompt: 'What happens when you run `int("3.14")` directly in Python?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'err',
              text: 'Python raises a ValueError because "3.14" contains a decimal point.',
              isCorrect: true,
              feedback: 'Exactly! int() on a string requires a valid integer string representation. To parse "3.14" to int 3, you must write int(float("3.14")).'
            },
            {
              id: 'trunc',
              text: 'Python automatically truncates it to integer 3.',
              isCorrect: false,
              feedback: 'int(3.14) truncates to 3, but int("3.14") raises ValueError!'
            },
            {
              id: 'round',
              text: 'Python rounds it up to integer 4.',
              isCorrect: false,
              feedback: 'Python does not silently round string values.'
            }
          ]
        },
        explanation: '`int()` can truncate a float number (`int(3.14) -> 3`), but cannot parse a decimal string directly (`int("3.14")` -> `ValueError`).'
      },
      {
        role: 'manipulation',
        title: 'Two-Stage Conversion',
        prompt: 'Convert the string `"89.75"` into an integer representing whole dollars ($89). Choose the correct nested cast expression.',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'nest',
              text: 'int(float("89.75"))',
              isCorrect: true,
              feedback: 'Perfect! First float() parses the decimal string into 89.75, then int() truncates to 89.'
            },
            {
              id: 'direct',
              text: 'int("89.75")',
              isCorrect: false,
              feedback: 'This raises ValueError in Python.'
            },
            {
              id: 'str',
              text: 'str(int(89.75))',
              isCorrect: false,
              feedback: 'This converts a float to a string "89", not an integer.'
            }
          ]
        },
        explanation: 'Two-stage casting `int(float(s))` safely converts decimal string inputs into whole integer units.'
      },
      {
        role: 'bug_hunt',
        title: 'The input() Calculation Trap',
        prompt: 'An order script computes tax on subtotal: `subtotal = "100"`; `tax = subtotal * 0.08`. What error occurs when this executes?',
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            {
              id: 'typeerr',
              text: 'TypeError: can\'t multiply sequence by non-int of type "float"',
              isCorrect: true,
              feedback: 'Exact! You cannot multiply a string by a float in Python. subtotal must be cast to float(subtotal).'
            },
            {
              id: 'zero',
              text: 'tax evaluates to 0.0 without error.',
              isCorrect: false,
              feedback: 'Python is strictly typed and will not perform implicit coercion.'
            },
            {
              id: 'none',
              text: 'tax becomes None.',
              isCorrect: false,
              feedback: 'Python throws TypeError immediately.'
            }
          ]
        },
        explanation: 'Python never implicitly converts strings to numbers. Explicitly cast: `tax = float(subtotal) * 0.08`.'
      },
      {
        role: 'boss_synthesis',
        title: 'E-Commerce Cart Ingestion',
        prompt: 'You receive three string values from an API payload: `item_price = "24.50"`, `tax_rate = "0.08"`, and `units = "2"`. Compute the final total as `(price * units) + (price * units * tax_rate)`. Print the result formatted as `Total: $52.92`.',
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `item_price = "24.50"\ntax_rate = "0.08"\nunits = "2"\n\n# 1. Cast strings to appropriate numeric types\n\n# 2. Compute final total\n\n# 3. Print formatted output "Total: $52.92"\n`,
          expectedOutput: 'Total: $52.92',
          hints: [
            'Cast item_price to float, tax_rate to float, and units to int.',
            'subtotal = price * units; total = subtotal * (1 + tax_rate).',
            'Format with: f"Total: ${total:.2f}"'
          ]
        },
        explanation: 'You successfully defended against input type errors, parsed numeric strings, and formatted currency outputs!'
      }
    ]
  }
];

export const m1_1_content = {
  id: 'm1-1',
  title: 'Thinking in Code — Expressions, State & Memory',
  subtitle: 'Top-to-bottom execution, expressions, name binding & type casting',
  lessons: m1_1_lessons
};
