// ─── The Legend of Java: Quest for the Enterprise ────────────────────────
// Comprehensive Retro-RPG Curriculum: Modules 1–4 (Java Foundations)

export const phase1Content = {
  // ════════════════════════════════════════════════════════════════
  // MODULE 1: The First Spell — JVM Architecture & Primitive Runes
  // ════════════════════════════════════════════════════════════════
  'week-1': {
    lessons: [
      // ── Lesson 1 ──────────────────────────────────────────────
      {
        title: 'What is Java? JDK, JRE & The JVM Bytecode Engine',
        language: 'java',
        starterCode: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Entering the JVM Citadel...");\n    }\n}`,
        content: `
<h2>⚔️ Chapter 1: The Awakening in the JVM Citadel ☕</h2>

<div class="lesson-pixel-art">
  <img src="/images/pixel_java_mage.jpg" alt="Java Grand Mage casting Bytecode Runes" />
  <div class="pixel-caption">
    🧙‍♂️ SECTOR 01: THE ARCH-MAGE OF THE JVM CASTING 0xCAFEBABE RUNES
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome, young Code Mage. You stand before the towering gates of the JVM Citadel. Before you can forge enterprise microservices and conquer Spring fortresses, you must master the ancient sorcery of Java bytecode and understand the engine that powers 3 billion devices.</em>
</div>

<p>Created in 1995 by the legendary software wizard <strong>James Gosling</strong>, Java was forged with a sacred covenant known as <strong>Write Once, Run Anywhere (WORA)</strong>. While low-level tongues like C compile directly into rigid CPU-dependent machine instructions, Java compiles into mystical, platform-transcending <strong>Bytecode</strong>.</p>

<h3>The Holy Trinity of Java Engineering</h3>
<p>Every Java engineer must understand the distinction between the three layers of the Java realm:</p>

<ul>
  <li><strong>JDK (Java Development Kit)</strong> — The Grand Workshop. It contains the tools necessary to forge code: the compiler (<code>javac</code>), the documentation generator (<code>javadoc</code>), packaging tools (<code>jar</code>), and debuggers.</li>
  <li><strong>JRE (Java Runtime Environment)</strong> — The Sanctum of Execution. It provides the standard class libraries (<code>java.lang</code>, <code>java.util</code>) and the runtime environment required to run compiled Java applications without compilation tools.</li>
  <li><strong>JVM (Java Virtual Machine)</strong> — The Engine of the Realm. An abstract computing machine that loads compiled <code>.class</code> files, verifies memory safety, and translates bytecode into lightning-fast native CPU instructions via the <strong>Just-In-Time (JIT) Compiler</strong>.</li>
</ul>

<div class="callout callout--info">
  <strong>📜 Ancient Scroll of Wisdom:</strong> In modern Java (Java 11+), the standalone JRE was retired in favor of modular runtime images forged with <code>jlink</code>. When you install a modern OpenJDK (such as Eclipse Temurin or Amazon Corretto), you receive the full JDK.
</div>

<h3>The Two-Stage Execution Cycle</h3>
<pre class="ascii-diagram">
+--------------------+        +---------------------+        +--------------------+
|  HelloWorld.java   | -----> |   javac (Compiler)  | -----> |  HelloWorld.class  |
|   [Source Code]    |        |   Translates syntax |        |  [Magic Bytecode]  |
+--------------------+        +---------------------+        +--------------------+
                                                                       |
                                                                       v
+--------------------+        +---------------------+        +--------------------+
|  Native CPU Code   | <----- | JIT HotSpot Engine  | <----- |    JVM Runtime     |
| (x86_64, ARM64...) |        | (Compiles hot paths)|        | (Classloader & GC) |
+--------------------+        +---------------------+        +--------------------+
</pre>

<p>When you inspect the very first 4 bytes of any compiled <code>.class</code> file in hexadecimal, you will find the legendary magic number: <code>0xCAFEBABE</code>. This arcane marker tells the JVM classloader that the scroll is a genuine Java bytecode artifact.</p>

<h3>Decoding Your First Incantation</h3>
<p>Look at the code editor. Every Java spell requires precise structural architecture:</p>

<pre><code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>

<ul>
  <li><code>public class HelloWorld</code> — Defines an accessible blueprint. The class name <strong>must exactly match</strong> the file name (<code>HelloWorld.java</code>).</li>
  <li><code>public static void main(String[] args)</code> — The sacred portal of entry.
    <ul>
      <li><code>public</code>: Accessible by the JVM runtime from anywhere.</li>
      <li><code>static</code>: Can be invoked without instantiating an object of the class first.</li>
      <li><code>void</code>: Returns no value to the operating system upon normal termination.</li>
      <li><code>String[] args</code>: An array of command-line runes passed during invocation.</li>
    </ul>
  </li>
  <li><code>System.out.println(...)</code> — Accesses the standard output stream of the <code>System</code> class and prints a line of text terminated by a newline.</li>
</ul>

<div class="callout callout--tip">
  <strong>🗡️ Adventurer's Pro-Tip:</strong> Click <strong>▶ Run</strong> on the right to trigger the compiler, invoke the JVM, and watch your bytecode execute in the terminal!
</div>
`,
      },

      // ── Lesson 2 ──────────────────────────────────────────────
      {
        title: 'Memory Realms: Stack Frames vs The Heap',
        language: 'java',
        starterCode: `public class MemoryModel {\n    public static void main(String[] args) {\n        int playerLevel = 1;         // Stack variable\n        String heroName = "Aethelgard"; // Reference on Stack, Object on Heap\n\n        System.out.println("Hero: " + heroName + " | Level: " + playerLevel);\n    }\n}`,
        content: `
<h2>🏛️ Chapter 2: The Two Memory Realms — Stack vs Heap</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Every variable you declare consumes memory in one of two sacred dimensions: the fast, transient Stack or the vast, persistent Heap. Master this duality, and you will prevent the dreaded StackOverflowError and OutOfMemoryError curses.</em>
</div>

<p>The JVM partitions working memory into distinct administrative sectors during execution. Understanding where data lives is essential for writing high-performance enterprise applications.</p>

<h3>1. The Call Stack (Fast, Thread-Private)</h3>
<p>The <strong>Stack</strong> is where thread execution happens. Every time a thread calls a method, the JVM pushes a new <strong>Stack Frame</strong> onto that thread's stack:</p>
<ul>
  <li>Stores <strong>primitive variables</strong> (e.g., <code>int</code>, <code>double</code>, <code>boolean</code>) directly in the frame.</li>
  <li>Stores <strong>object reference handles</strong> (pointers that hold the memory address of an object living on the Heap).</li>
  <li>Follows a strict <strong>LIFO (Last-In, First-Out)</strong> order. When a method returns, its frame is instantly popped and destroyed — zero Garbage Collection overhead!</li>
</ul>

<h3>2. The Heap (Shared, Garbage-Collected)</h3>
<p>The <strong>Heap</strong> is the vast shared realm where all <strong>Objects</strong> and <strong>Arrays</strong> reside. Whenever you invoke <code>new Scanner()</code> or <code>new String()</code>, memory is allocated on the Heap:</p>
<ul>
  <li>Accessible by all threads in the application.</li>
  <li>Survives method execution until no active stack references point to it.</li>
  <li>Managed automatically by the <strong>Garbage Collector (GC)</strong>, which periodically sweeps unreachable objects into the void.</li>
</ul>

<pre class="ascii-diagram">
+-------------------------+                  +----------------------------------+
|      THE STACK          |                  |             THE HEAP             |
|  (Thread-Private Frame) |                  |      (Shared Object Space)       |
+-------------------------+                  +----------------------------------+
|                         |                  |                                  |
| [playerLevel = 1]       | (primitive value)|                                  |
|                         |                  |                                  |
| [heroName] 0x7F2A ----+ | (ref pointer)    |  0x7F2A: String Object           |
|                       | |                  |  +----------------------------+  |
+-----------------------|-+                  |  | value: ['A','e','t','h'...] |  |
                        +------------------> |  | hash: 0x48B1C2             |  |
                                             |  +----------------------------+  |
                                             +----------------------------------+
</pre>

<h3>The Metaspace (Native Memory)</h3>
<p>In addition to Stack and Heap, Java 8+ introduced the <strong>Metaspace</strong>, stored in native OS memory. It holds class metadata, method bytecode, runtime constant pools, and static variables. Unlike the old PermGen, it expands automatically up to available system RAM unless constrained by <code>-XX:MaxMetaspaceSize</code>.</p>

<div class="callout callout--warn">
  <strong>⚠️ Mimic Chest (Common Interview Trap):</strong> <em>"Is Java pass-by-reference or pass-by-value?"</em><br />
  <strong>Java is STRICTLY pass-by-value, always!</strong> When passing an object to a method, Java copies the <em>value of the reference pointer</em> on the stack. The copy points to the same object on the heap, but reassigning the parameter reference inside the method does not change the caller's reference!
</div>
`,
      },

      // ── Lesson 3 ──────────────────────────────────────────────
      {
        title: 'Primitive Types, 2\'s Complement & Overflow Runes',
        language: 'java',
        starterCode: `public class PrimitiveRunes {\n    public static void main(String[] args) {\n        // 8 Primitive Types\n        byte smallRune = 127;\n        short mana = 32000;\n        int goldCoins = 2_147_483_647; // Max signed 32-bit int\n        long galacticScore = 9_000_000_000L;\n\n        float spellSpeed = 3.14f;\n        double preciseCoordinates = 124.5678912;\n        char elementalGlyph = '⚡';\n        boolean isShieldActive = true;\n\n        System.out.println("Max Int: " + goldCoins);\n        // Overflow demon: adding 1 wraps to negative minimum!\n        System.out.println("Overflowed Int: " + (goldCoins + 1));\n    }\n}`,
        content: `
<h2>💎 Chapter 3: Primitive Runes & Binary Overflow Demons</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Java provides 8 sacred primitive runes etched directly into CPU registers and stack frames. Learn their exact bit-widths and understand 2's complement binary representation to guard against arithmetic overflow.</em>
</div>

<h3>The 8 Sacred Primitive Types</h3>
<p>Primitives are raw binary values, not objects. They have fixed sizes across all operating systems:</p>

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Bits</th>
      <th>Range / Precision</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>byte</code></td>
      <td>8</td>
      <td>-128 to 127</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>short</code></td>
      <td>16</td>
      <td>-32,768 to 32,767</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>int</code></td>
      <td>32</td>
      <td>-2,147,483,648 to 2,147,483,647 (~2.1 Billion)</td>
      <td>0</td>
    </tr>
    <tr>
      <td><code>long</code></td>
      <td>64</td>
      <td>-9 Quintillion to +9 Quintillion (suffix with <code>L</code>)</td>
      <td>0L</td>
    </tr>
    <tr>
      <td><code>float</code></td>
      <td>32</td>
      <td>IEEE 754 floating point (suffix with <code>f</code>)</td>
      <td>0.0f</td>
    </tr>
    <tr>
      <td><code>double</code></td>
      <td>64</td>
      <td>IEEE 754 high-precision decimal</td>
      <td>0.0d</td>
    </tr>
    <tr>
      <td><code>char</code></td>
      <td>16</td>
      <td>Unicode UTF-16 characters (<code>'A'</code>, <code>'\\u0041'</code>)</td>
      <td>'\\u0000'</td>
    </tr>
    <tr>
      <td><code>boolean</code></td>
      <td>1*</td>
      <td><code>true</code> or <code>false</code> (JVM uses 1-4 bytes internally)</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

<h3>Two's Complement & The Overflow Paradox</h3>
<p>Java signed integers use <strong>Two's Complement</strong> representation. The highest bit (Most Significant Bit, or MSB) serves as the sign bit: <code>0</code> for positive, <code>1</code> for negative.</p>

<p>When you add <code>1</code> to the maximum 32-bit signed integer (<code>01111111 11111111 11111111 11111111</code> = <code>2,147,483,647</code>), the binary carry rolls over into the sign bit:</p>

<pre class="ascii-diagram">
   01111111 11111111 11111111 11111111  (+2,147,483,647: Integer.MAX_VALUE)
 + 00000000 00000000 00000000 00000001
 --------------------------------------
   10000000 00000000 00000000 00000000  (-2,147,483,648: Integer.MIN_VALUE!)
</pre>

<div class="callout callout--warn">
  <strong>⚠️ Mimic Trap:</strong> Java does NOT throw an exception when integer overflow occurs! It silently wraps around. In enterprise financial software or binary search algorithms (<code>mid = (low + high) / 2</code>), this overflow bug can cause severe crashes. Always use <code>low + (high - low) / 2</code> or <code>Math.addExact()</code>.
</div>

<h3>Floating Point Precision Trap</h3>
<p>Never use <code>float</code> or <code>double</code> for currency or exact quantities! Floating point numbers cannot accurately represent fractional powers of 10 in binary (e.g. <code>0.1 + 0.2 == 0.30000000000000004</code>). For real monetary transactions, always use <code>java.math.BigDecimal</code> or integer cents.</p>
`,
      },

      // ── Lesson 4 ──────────────────────────────────────────────
      {
        title: 'Control Flow: If-Else Guardrails & Loop Mechanics',
        language: 'java',
        starterCode: `public class ControlFlow {\n    public static void main(String[] args) {\n        int bossHealth = 100;\n        int playerAttack = 25;\n        int round = 1;\n\n        while (bossHealth > 0) {\n            bossHealth -= playerAttack;\n            System.out.println("Round " + round + ": Boss HP left = " + bossHealth);\n            round++;\n        }\n\n        System.out.println("Victory! Boss vanquished in " + (round - 1) + " strikes.");\n    }\n}`,
        content: `
<h2>🛡️ Chapter 4: Control Flow Guardrails & Loop Mechanics</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>A program without branching is merely a scroll of linear steps. Master logical conditionals, short-circuit evaluation, enhanced loops, and modern pattern-matching switch statements to orchestrate complex combat encounters.</em>
</div>

<h3>1. Conditional Guardrails: If-Else & Short-Circuiting</h3>
<p>Java enforces strict boolean expressions. You cannot pass integers like <code>if (1)</code> as in C++:</p>

<pre><code>if (health &lt;= 0) {
    System.out.println("Hero has fallen.");
} else if (health &lt; 25) {
    System.out.println("Warning: Low health potion recommended!");
} else {
    System.out.println("Hero is battle ready.");
}</code></pre>

<p><strong>Short-Circuit Evaluation:</strong></p>
<ul>
  <li><code>&amp;&amp;</code> (Logical AND): If the left side evaluates to <code>false</code>, the right side is <strong>never executed</strong>.</li>
  <li><code>||</code> (Logical OR): If the left side evaluates to <code>true</code>, the right side is <strong>never executed</strong>.</li>
</ul>

<div class="callout callout--tip">
  <strong>🗡️ Safe Navigation Pattern:</strong> Use short-circuiting to prevent NullPointerExceptions:
  <code>if (sword != null &amp;&amp; sword.getDamage() &gt; 50) { ... }</code>
</div>

<h3>2. The Three Loop Incantations</h3>
<ul>
  <li><strong>For Loop</strong> — Known iteration bounds:
    <code>for (int i = 0; i &lt; 5; i++) { ... }</code>
  </li>
  <li><strong>Enhanced For-Each Loop</strong> — Iterating over arrays and Iterable collections without index clutter:
    <code>for (String item : inventory) { ... }</code>
  </li>
  <li><strong>While & Do-While</strong> — Condition-driven loops:
    <code>while (stamina &gt; 0) { strike(); }</code>
  </li>
</ul>

<h3>3. Modern Switch Expressions (Java 14+)</h3>
<p>Modern Java supports expression switches with the arrow <code>-&gt;</code> syntax, eliminating the dreaded missing <code>break;</code> fall-through bug and returning values directly:</p>

<pre><code>String difficulty = "HEROIC";
int rewardXP = switch (difficulty) {
    case "EASY" -> 100;
    case "NORMAL" -> 250;
    case "HEROIC", "LEGENDARY" -> 1000;
    default -> throw new IllegalArgumentException("Unknown difficulty: " + difficulty);
};</code></pre>
`,
      },
    ],

    // ── Exercises ────────────────────────────────────────────────
    exercises: [
      {
        title: 'Temperature Converter',
        language: 'java',
        starterCode: `public class TempConverter {\n    public static void main(String[] args) {\n        double celsius = 100.0;\n        // TODO: Convert celsius to fahrenheit\n        // Formula: F = (C × 9/5) + 32\n        double fahrenheit = 0; // Fix this!\n\n        System.out.println(celsius + "°C = " + fahrenheit + "°F");\n    }\n}`,
        expectedOutput: '100.0°C = 212.0°F',
        description: `
<h2>Convert Celsius to Fahrenheit</h2>
<p>Complete the temperature converter rune using the sacred thermodynamic formula:</p>
<pre><code>Fahrenheit = (Celsius × 9/5) + 32</code></pre>
<p>The program must convert <strong>100.0°C</strong> and output the exact formatted string shown below.</p>

<div class="callout callout--warn">
  <strong>⚠️ Beware Integer Truncation:</strong> In Java, <code>9 / 5</code> performs integer division and yields <code>1</code>! Use <code>9.0 / 5.0</code> or <code>(celsius * 9.0 / 5.0) + 32.0</code> to preserve decimal precision.
</div>
`,
        hints: ['Use 9.0 / 5.0 instead of 9 / 5 to avoid integer division truncation.'],
      },
      {
        title: 'Palindrome Number Checker',
        language: 'java',
        starterCode: `public class Palindrome {\n    public static void main(String[] args) {\n        int number = 12321;\n        int original = number;\n        int reversed = 0;\n\n        // TODO: Reverse the number using a while loop\n        // Hint: Use % 10 to get last digit, / 10 to remove it\n        while (number > 0) {\n            int digit = number % 10;\n            reversed = reversed * 10 + digit;\n            number = number / 10;\n        }\n\n        if (original == reversed) {\n            System.out.println(original + " is a palindrome");\n        } else {\n            System.out.println(original + " is not a palindrome");\n        }\n    }\n}`,
        expectedOutput: '12321 is a palindrome',
        description: `
<h2>Is it a Palindromic Number?</h2>
<p>A <strong>palindrome</strong> number reads identically forwards and backwards (e.g. 121, 12321, 9009).</p>
<p>Your quest: reverse the integer mathematically without converting it to a String, then verify if it matches the original value.</p>
`,
        hints: ['Extract digits with num % 10, shift reversed accumulator with reversed * 10, and truncate with num / 10.'],
      },
    ],
    quiz: [
      {
        question: 'What is the magic number found in the first 4 bytes of every compiled Java .class file?',
        options: ['0xDEADBEEF', '0xCAFEBABE', '0xJAVA2024', '0x00FF00FF'],
        correctIndex: 1,
        explanation: 'Every Java bytecode file begins with the 4-byte hexadecimal signature 0xCAFEBABE.'
      },
      {
        question: 'Where are primitive local variables stored in the Java memory model?',
        options: ['In the shared Heap', 'In thread-private Stack frames', 'In the Metaspace', 'Directly in the CPU L1 cache only'],
        correctIndex: 1,
        explanation: 'Local primitive variables live directly inside the active Stack Frame of the method execution thread.'
      },
      {
        question: 'What occurs when you add 1 to Integer.MAX_VALUE in Java?',
        options: ['An ArithmeticException is thrown', 'The value wraps around to Integer.MIN_VALUE (-2,147,483,648)', 'The variable converts to a Long automatically', 'The program crashes with StackOverflowError'],
        correctIndex: 1,
        explanation: 'Due to Two\'s Complement 32-bit arithmetic, adding 1 rolls over the sign bit, wrapping to the negative minimum.'
      }
    ],
    project: {
      title: 'Console Calculator & Number System Quest',
      description: `
<h2>Module 1 Capstone Project: Console Calculator</h2>
<p>Construct a robust interactive arithmetic engine combining variables, operations, and control flow.</p>
`,
      language: 'java',
      starterCode: `public class Calculator {\n    public static void main(String[] args) {\n        System.out.println("=== CODEX CALCULATOR ===");\n        int a = 20, b = 4;\n        System.out.println("Add: " + (a + b));\n        System.out.println("Sub: " + (a - b));\n        System.out.println("Mul: " + (a * b));\n        System.out.println("Div: " + (a / b));\n    }\n}`,
      requirements: [
        'Perform basic arithmetic: addition, subtraction, multiplication, division',
        'Check for division by zero before dividing',
        'Demonstrate floating-point vs integer division'
      ]
    }
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 2: Forging Objects — Classes, Encapsulation & Memory
  // ════════════════════════════════════════════════════════════════
  'week-2': {
    lessons: [
      {
        title: 'Object-Oriented Architecture & Heap Lifecycle',
        language: 'java',
        starterCode: `public class HeroDemo {\n    static class Hero {\n        String name;\n        int health;\n        \n        Hero(String name, int health) {\n            this.name = name;\n            this.health = health;\n        }\n    }\n\n    public static void main(String[] args) {\n        Hero h1 = new Hero("Valerius", 150);\n        Hero h2 = h1; // Copies the reference pointer!\n        h2.health = 80;\n\n        System.out.println(h1.name + " HP: " + h1.health); // Prints 80!\n    }\n}`,
        content: `
<h2>🏰 Chapter 1: Forging Objects on the Heap</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Classes are blueprints; Objects are living instances animated on the Heap. Understand how the 'new' keyword carves memory, how reference variables copy pointers, and how the Garbage Collector reclaims spent memory.</em>
</div>

<h3>The Object Anatomy in Heap Memory</h3>
<p>When you invoke <code>new Hero("Valerius", 150)</code>, the JVM executes a multi-step ceremony:</p>
<ol>
  <li><strong>Class Loading:</strong> Checks if <code>Hero.class</code> metadata is loaded in Metaspace.</li>
  <li><strong>Heap Space Allocation:</strong> Carves memory for the object header and instance fields.</li>
  <li><strong>Zero Initialization:</strong> Clears fields to their primitive defaults (<code>0</code>, <code>false</code>, <code>null</code>).</li>
  <li><strong>Constructor Execution:</strong> Runs field initializers and the constructor block.</li>
  <li><strong>Pointer Return:</strong> Returns the 64-bit (or 32-bit compressed oops) memory address to the stack variable.</li>
</ol>

<pre class="ascii-diagram">
HEAP OBJECT LAYOUT (64-bit JVM with Compressed OOPs)
+-------------------------------------------------------------+
| 1. Mark Word (8 bytes): Hashcode, GC age, Lock state        |
+-------------------------------------------------------------+
| 2. Klass Word (4 bytes): Pointer to Metaspace Hero.class    |
+-------------------------------------------------------------+
| 3. Fields: String name pointer (4B), int health (4B)        |
+-------------------------------------------------------------+
| 4. Padding (4 bytes): Aligns object to 8-byte boundary      |
+-------------------------------------------------------------+
Total Size = 24 bytes on the Heap
</pre>
`,
      },
      {
        title: 'Encapsulation, Access Modifiers & Defensive Copying',
        language: 'java',
        starterCode: `public class BankVault {\n    static class Account {\n        private double balance;\n\n        public Account(double initial) {\n            this.balance = Math.max(0, initial);\n        }\n\n        public void deposit(double amount) {\n            if (amount > 0) balance += amount;\n        }\n\n        public double getBalance() { return balance; }\n    }\n\n    public static void main(String[] args) {\n        Account acc = new Account(500.0);\n        acc.deposit(250.0);\n        System.out.println("Protected Balance: $" + acc.getBalance());\n    }\n}`,
        content: `
<h2>🛡️ Chapter 2: The Fortress of Encapsulation</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Never expose your raw internal fields to the hostile wild! Encapsulation bundles state with behavior and protects data integrity through access modifiers and defensive copying.</em>
</div>

<h3>The 4 Castle Ramparts (Access Modifiers)</h3>
<ul>
  <li><code>private</code> — Visible only within the exact enclosing class. Internal secret state.</li>
  <li><code>(package-private)</code> — Default when no modifier is specified. Visible to classes in the same package.</li>
  <li><code>protected</code> — Visible to the package plus subclasses in any package.</li>
  <li><code>public</code> — Visible everywhere across the realm.</li>
</ul>

<div class="callout callout--tip">
  <strong>🗡️ Golden Rule of Enterprise Design:</strong> Keep all instance fields <code>private</code>. Expose read-only accessors (<code>getters</code>) and validated mutators (<code>setters</code>) only when strictly necessary.
</div>
`,
      },
      {
        title: 'Constructors, Chaining (this()) & Immutable Records',
        language: 'java',
        starterCode: `public class ConstructorDemo {\n    record QuestItem(String name, int rarity, int power) {}\n\n    public static void main(String[] args) {\n        QuestItem sword = new QuestItem("Sunblade", 5, 120);\n        System.out.println(sword.name() + " | Power: " + sword.power());\n    }\n}`,
        content: `
<h2>📜 Chapter 3: Constructors & Modern Java Records</h2>

<p>Constructors initialize an object into a valid, consistent state upon creation. Java supports <strong>Constructor Chaining</strong> via <code>this(...)</code> to reuse initialization logic without duplicating code.</p>

<h3>Java 14+ Immutable Records</h3>
<p>When an object is purely a transparent carrier for immutable data, Java 14+ provides <strong>Records</strong>. A single line generates constructor, getters, <code>equals()</code>, <code>hashCode()</code>, and <code>toString()</code> automatically:</p>
<pre><code>public record PlayerStats(int level, int xp, int mana) {}</code></pre>
`,
      },
      {
        title: 'Static Members vs Instance State in Memory',
        language: 'java',
        starterCode: `public class StaticDemo {\n    static class WizardGuild {\n        static int totalWizards = 0;\n        String wizardName;\n\n        WizardGuild(String name) {\n            this.wizardName = name;\n            totalWizards++;\n        }\n    }\n\n    public static void main(String[] args) {\n        new WizardGuild("Merlin");\n        new WizardGuild("Gandalf");\n        System.out.println("Guild Size: " + WizardGuild.totalWizards);\n    }\n}`,
        content: `
<h2>⚡ Chapter 4: Static Class Runes vs Instance State</h2>
<p>Variables declared with <code>static</code> belong to the <strong>Class itself</strong> and reside in Metaspace/Heap class mirrors. Only one copy exists, shared across every instance in the application.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Hero Inventory Manager',
        language: 'java',
        starterCode: `public class HeroInventory {\n    static class Hero {\n        private String name;\n        private int hp;\n        private String weapon;\n        private int potions;\n\n        public Hero(String name, int hp, String weapon, int potions) {\n            this.name = name;\n            this.hp = hp;\n            this.weapon = weapon;\n            this.potions = potions;\n        }\n\n        public int getHp() { return hp; }\n        public String getWeapon() { return weapon; }\n        public int getPotions() { return potions; }\n    }\n\n    public static void main(String[] args) {\n        Hero h = new Hero("Knight", 100, "Iron Blade", 3);\n        System.out.println("Hero HP: " + h.getHp());\n        System.out.println("Sword equipped: " + h.getWeapon());\n        System.out.println("Potions: " + h.getPotions());\n    }\n}`,
        expectedOutput: "Hero HP: 100\nSword equipped: Iron Blade\nPotions: 3",
        description: `
<h2>Encapsulate the Hero State</h2>
<p>Create a properly encapsulated <code>Hero</code> class with private fields and public getter accessors.</p>
`,
        hints: ['Verify field names and getter return values match expected output.'],
      },
      {
        title: 'Bank Account Guard',
        language: 'java',
        starterCode: `public class BankAccount {\n    private double balance;\n\n    public BankAccount(double initial) {\n        this.balance = initial;\n    }\n\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n\n    public boolean withdraw(double amt) {\n        if (amt > 0 && balance >= amt) {\n            balance -= amt;\n            return true;\n        }\n        return false;\n    }\n\n    public double getBalance() { return balance; }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(1000.0);\n        System.out.println("Balance: $" + acc.getBalance());\n        acc.deposit(500.0);\n        System.out.println("Deposit: $500.0");\n        System.out.println("New Balance: $" + acc.getBalance());\n        if (!acc.withdraw(-50.0)) {\n            System.out.println("Withdrawal rejected: Invalid amount");\n        }\n    }\n}`,
        expectedOutput: "Balance: $1000.0\nDeposit: $500.0\nNew Balance: $1500.0\nWithdrawal rejected: Invalid amount",
        description: `
<h2>Enforce Account Invariants</h2>
<p>Implement validated deposit and withdrawal operations protecting the balance from negative input.</p>
`,
        hints: ['Reject negative and zero withdrawal amounts.'],
      }
    ],
    quiz: [
      {
        question: 'What access modifier makes a member accessible ONLY within its own enclosing class?',
        options: ['protected', 'private', 'package-private', 'static'],
        correctIndex: 1,
        explanation: 'The private modifier seals access exclusively to the declared class body.'
      }
    ],
    project: {
      title: 'RPG Battle Simulator: Character Object Hierarchy',
      description: 'Design a modular object-oriented character battle engine.',
      language: 'java',
      starterCode: `public class RPGSimulator {\n    public static void main(String[] args) {\n        System.out.println("RPG Battle Simulator Online");\n    }\n}`,
      requirements: ['Encapsulate character stats', 'Support attacking and healing behavior']
    }
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 3: Bloodlines — Inheritance & Polymorphic Dispatch
  // ════════════════════════════════════════════════════════════════
  'week-3': {
    lessons: [
      {
        title: 'Inheritance Hierarchies & Method Overriding',
        language: 'java',
        starterCode: `public class InheritanceDemo {\n    static class Entity {\n        String name;\n        Entity(String name) { this.name = name; }\n        void act() { System.out.println(name + " exists."); }\n    }\n\n    static class Monster extends Entity {\n        Monster(String name) { super(name); }\n        @Override\n        void act() { System.out.println(name + " roars and attacks!"); }\n    }\n\n    public static void main(String[] args) {\n        Entity e = new Monster("Gargoyle");\n        e.act();\n    }\n}`,
        content: `
<h2>🧬 Chapter 1: Bloodlines & Method Overriding</h2>
<p>Inheritance enables classes to inherit fields and behaviors from superclasses using <code>extends</code>. Subclasses can override methods using the <code>@Override</code> annotation to provide specialized behavior.</p>
`,
      },
      {
        title: 'Polymorphism & Virtual Method Tables (vtable)',
        language: 'java',
        starterCode: `public class VTableDemo {\n    static abstract class Mage {\n        abstract void cast();\n    }\n    static class FireMage extends Mage {\n        void cast() { System.out.println("Pyroblast!"); }\n    }\n    static class FrostMage extends Mage {\n        void cast() { System.out.println("Blizzard!"); }\n    }\n\n    public static void main(String[] args) {\n        Mage[] squad = { new FireMage(), new FrostMage() };\n        for (Mage m : squad) m.cast();\n    }\n}`,
        content: `
<h2>🎭 Chapter 2: Polymorphic Dispatch via the vtable</h2>
<p><strong>Polymorphism</strong> allows treating instances of different subclasses as their common supertype. At runtime, the JVM uses a <strong>Virtual Method Table (vtable)</strong> pointer to invoke the exact subclass implementation (<code>invokevirtual</code> dynamic dispatch).</p>
`,
      },
      {
        title: 'Abstract Classes vs Interfaces in Modern Java 21',
        language: 'java',
        starterCode: `public class InterfaceDemo {\n    interface Spellcaster {\n        void castSpell();\n        default void rechargeMana() {\n            System.out.println("Mana recharged to 100%");\n        }\n    }\n    static class Sorcerer implements Spellcaster {\n        public void castSpell() { System.out.println("Lightning Bolt!"); }\n    }\n\n    public static void main(String[] args) {\n        Sorcerer s = new Sorcerer();\n        s.castSpell();\n        s.rechargeMana();\n    }\n}`,
        content: `
<h2>📜 Chapter 3: Abstract Blueprints vs Contracts</h2>
<p>An <strong>Abstract Class</strong> is an incomplete class that can maintain state and constructors. An <strong>Interface</strong> defines a contract of behavior, supporting multiple inheritance and default methods in modern Java.</p>
`,
      },
      {
        title: 'Casting & instanceof Pattern Matching',
        language: 'java',
        starterCode: `public class PatternMatchDemo {\n    public static void inspect(Object obj) {\n        // Modern pattern matching instanceof (Java 16+)\n        if (obj instanceof String s) {\n            System.out.println("String of length: " + s.length());\n        } else if (obj instanceof Integer i) {\n            System.out.println("Integer value: " + i);\n        }\n    }\n\n    public static void main(String[] args) {\n        inspect("Excalibur");\n        inspect(9001);\n    }\n}`,
        content: `
<h2>🔍 Chapter 4: Type Inspection & Pattern Matching</h2>
<p>Modern Java eliminates ugly boilerplate type casting with <strong>Pattern Matching for <code>instanceof</code></strong> (Java 16+), binding the cast variable directly in the condition scope.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Polymorphic Spellcaster',
        language: 'java',
        starterCode: `public class SpellcasterDemo {\n    abstract static class Mage {\n        abstract void castSpell();\n    }\n    static class FireMage extends Mage {\n        void castSpell() {\n            System.out.println("Fire Mage casts: Pyroblast for 50 fire damage!");\n        }\n    }\n    static class IceMage extends Mage {\n        void castSpell() {\n            System.out.println("Ice Mage casts: Blizzard for 35 frost damage!");\n        }\n    }\n\n    public static void main(String[] args) {\n        Mage m1 = new FireMage();\n        Mage m2 = new IceMage();\n        m1.castSpell();\n        m2.castSpell();\n    }\n}`,
        expectedOutput: "Fire Mage casts: Pyroblast for 50 fire damage!\nIce Mage casts: Blizzard for 35 frost damage!",
        description: 'Demonstrate polymorphic dispatch with FireMage and IceMage.',
        hints: ['Instantiate both mages and call castSpell() sequentially.'],
      },
      {
        title: 'Animal Sanctuary Soundboard',
        language: 'java',
        starterCode: `public class AnimalSoundboard {\n    interface Animal {\n        String speak();\n    }\n    static class Wolf implements Animal {\n        public String speak() { return "Wolf: Howl!"; }\n    }\n    static class Eagle implements Animal {\n        public String speak() { return "Eagle: Screech!"; }\n    }\n    static class Bear implements Animal {\n        public String speak() { return "Bear: Roar!"; }\n    }\n\n    public static void main(String[] args) {\n        Animal[] sanctuary = { new Wolf(), new Eagle(), new Bear() };\n        for (Animal a : sanctuary) {\n            System.out.println(a.speak());\n        }\n    }\n}`,
        expectedOutput: "Wolf: Howl!\nEagle: Screech!\nBear: Roar!",
        description: 'Iterate over an Animal array and print their sound calls.',
        hints: ['Implement Animal interface on Wolf, Eagle, Bear.'],
      }
    ],
    quiz: [
      {
        question: 'Which JVM bytecode instruction performs dynamic method dispatch at runtime?',
        options: ['invokestatic', 'invokevirtual', 'invokespecial', 'goto'],
        correctIndex: 1,
        explanation: 'invokevirtual uses the object\'s vtable at runtime to dispatch to the overriding subclass implementation.'
      }
    ],
    project: {
      title: 'Vehicle Fleet Management System',
      description: 'Build an inheritance hierarchy for fleet management.',
      language: 'java',
      starterCode: `public class Fleet {\n    public static void main(String[] args) {\n        System.out.println("Fleet online.");\n    }\n}`,
      requirements: ['Base vehicle class', 'Derived truck and car classes']
    }
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 4: The Backpack — Collections Framework & Exceptions
  // ════════════════════════════════════════════════════════════════
  'week-4': {
    lessons: [
      {
        title: 'The Java Collections Framework: List, Set, Map & Queue',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class CollectionsOverview {\n    public static void main(String[] args) {\n        List<String> party = new ArrayList<>(List.of("Warrior", "Mage", "Rogue"));\n        Set<String> uniqueLoot = new HashSet<>(Set.of("Ruby", "Sapphire", "Ruby"));\n        Map<String, Integer> manaCosts = Map.of("Fireball", 30, "Heal", 20);\n\n        System.out.println("Party: " + party);\n        System.out.println("Unique gems: " + uniqueLoot.size());\n        System.out.println("Fireball Cost: " + manaCosts.get("Fireball"));\n    }\n}`,
        content: `
<h2>🎒 Chapter 1: The Grand Backpack of Collections</h2>
<p>The <strong>Java Collections Framework (JCF)</strong> provides unified data structure interfaces:</p>
<ul>
  <li><code>List</code> — Ordered sequences allowing duplicates (<code>ArrayList</code>, <code>LinkedList</code>).</li>
  <li><code>Set</code> — Mathematical sets guaranteeing uniqueness (<code>HashSet</code>, <code>TreeSet</code>).</li>
  <li><code>Map</code> — Key-value associations (<code>HashMap</code>, <code>TreeMap</code>).</li>
  <li><code>Queue / Deque</code> — LIFO and FIFO pipelines (<code>ArrayDeque</code>, <code>PriorityQueue</code>).</li>
</ul>
`,
      },
      {
        title: 'ArrayList vs LinkedList: CPU Cache Lines & Contiguous Memory',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class ListComparison {\n    public static void main(String[] args) {\n        List<Integer> arrayList = new ArrayList<>();\n        for (int i = 0; i < 5; i++) arrayList.add(i * 10);\n\n        System.out.println("Random Access O(1): " + arrayList.get(3));\n    }\n}`,
        content: `
<h2>⚡ Chapter 2: ArrayList vs LinkedList — The Cache Line Truth</h2>
<p>In modern computer architecture, <code>ArrayList</code> vastly outperforms <code>LinkedList</code> in 99% of real-world scenarios due to <strong>CPU cache locality</strong>. Contiguous array elements are pre-fetched into L1/L2 cache lines, while linked list nodes are scattered across the heap requiring costly pointer chasing.</p>
`,
      },
      {
        title: 'HashMap Internals: Hash Codes, Buckets & Red-Black Treeification',
        language: 'java',
        starterCode: `import java.util.HashMap;\n\npublic class MapInternals {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put("RuneOfFire", 500);\n        map.put("RuneOfIce", 450);\n\n        System.out.println("O(1) Lookup: " + map.get("RuneOfFire"));\n    }\n}`,
        content: `
<h2>🗄️ Chapter 3: HashMap Internals & Treeification</h2>
<p>A Java <code>HashMap</code> calculates <code>key.hashCode()</code> and maps it into an array of buckets. When collisions exceed 8 nodes in a bucket and table capacity is ≥ 64, Java converts that bucket from a linked list to a <strong>Red-Black Tree</strong>, improving worst-case search time from O(N) to O(log N).</p>
`,
      },
      {
        title: 'Exception Handling: Call-Stack Unwinding & try-with-resources',
        language: 'java',
        starterCode: `public class ExceptionDemo {\n    public static void castSpell(int mana) throws Exception {\n        if (mana < 10) {\n            throw new Exception("Insufficient Mana!");\n        }\n        System.out.println("Spell successfully cast!");\n    }\n\n    public static void main(String[] args) {\n        try {\n            castSpell(5);\n        } catch (Exception e) {\n            System.out.println("Spell intercepted: " + e.getMessage());\n        }\n    }\n}`,
        content: `
<h2>🛡️ Chapter 4: Exception Propagation & Call-Stack Unwinding</h2>
<p>Exceptions represent unexpected events during execution. Java separates them into <strong>Checked Exceptions</strong> (must be declared with <code>throws</code> or caught) and <strong>Unchecked Exceptions</strong> (subclasses of <code>RuntimeException</code> and <code>Error</code>).</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Unique Quest Tracker (HashSet & HashMap)',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class QuestTracker {\n    public static void main(String[] args) {\n        List<String> rawLoot = List.of("Ancient Rune", "Gold Coin", "Dragon Scale", "Gold Coin", "Ancient Rune");\n        Set<String> uniqueLoot = new TreeSet<>(rawLoot);\n\n        System.out.println("Active Quests: 3");\n        System.out.println("Unique Rewards: " + uniqueLoot);\n    }\n}`,
        expectedOutput: "Active Quests: 3\nUnique Rewards: [Ancient Rune, Dragon Scale, Gold Coin]",
        description: 'Deduplicate quest rewards using a Set.',
        hints: ['Use TreeSet to maintain sorted unique elements.'],
      },
      {
        title: 'Safe Potion Dispenser (Exception Handling)',
        language: 'java',
        starterCode: `public class PotionDispenser {\n    static class OutOfPotionsException extends Exception {\n        public OutOfPotionsException(String msg) { super(msg); }\n    }\n\n    public static void dispense(int count) throws OutOfPotionsException {\n        if (count <= 0) {\n            throw new OutOfPotionsException("Inventory empty");\n        }\n        System.out.println("Potion dispensed successfully: Healing Draught");\n    }\n\n    public static void main(String[] args) {\n        try {\n            dispense(1);\n            dispense(0);\n        } catch (OutOfPotionsException e) {\n            System.out.println("Error caught: OutOfPotionsException - " + e.getMessage());\n        }\n    }\n}`,
        expectedOutput: "Potion dispensed successfully: Healing Draught\nError caught: OutOfPotionsException - Inventory empty",
        description: 'Implement custom exception handling for potion dispensing.',
        hints: ['Call dispense(1) then dispense(0) to trigger and catch OutOfPotionsException.'],
      }
    ],
    quiz: [
      {
        question: 'When does a bucket in a Java 8+ HashMap treeify into a Red-Black Tree?',
        options: ['When it has 2 elements', 'When bucket elements exceed 8 and table capacity >= 64', 'Always on initial insertion', 'Only for String keys'],
        correctIndex: 1,
        explanation: 'Treeification occurs when a single bucket exceeds 8 entries and total capacity is at least 64.'
      }
    ],
    project: {
      title: 'Dungeon Inventory & Loot System',
      description: 'Build a comprehensive inventory management system using Collections.',
      language: 'java',
      starterCode: `public class DungeonInventory {\n    public static void main(String[] args) {\n        System.out.println("Dungeon Inventory Initialized");\n    }\n}`,
      requirements: ['Use Map for item quantities', 'Use Set for unique gear']
    }
  }
};
