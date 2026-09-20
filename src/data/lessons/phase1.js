// ─── Phase 1: Java Foundations (Weeks 1–4) ────────────────────────
// Full detailed lesson content for every week.

export const phase1Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 1: Java Architecture, JVM, Types & Control Flow
  // ════════════════════════════════════════════════════════════════
  'week-1': {
    lessons: [
      // ── Lesson 1 ──────────────────────────────────────────────
      {
        title: 'What is Java? JDK, JRE & JVM',
        language: 'java',
        starterCode: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("I am learning Java!");\n    }\n}`,
        content: `
<h2>Chapter 1: The Awakening ☕</h2>
<div class="lesson-pixel-art">
  <img src="/images/pixel_coffee_coder.jpg" alt="Pixel Coffee Coders" />
  <div class="pixel-caption">☕ FUELED BY JAVA: 3 BILLION DEVICES & COUNTING</div>
</div>
<div class="callout callout--info" style="background: rgba(255,214,0,0.1); border-color: var(--yellow); color: var(--white);">
  <strong>System Message:</strong> <em>Welcome, young Developer. You have arrived at the gates of the Code Kingdom. Your ultimate quest? To secure the legendary <strong>Software Engineering Internship</strong>. But first, you must master the ancient magic of Java.</em>
</div>

<p>Java is the powerful incantation that built this world. Created by the Grand Mage <strong>James Gosling</strong> in 1995, it powers everything from pocket-sized Android artifacts to massive enterprise banking fortresses.</p>

<p>Java's core magic is <em>"Write Once, Run Anywhere" (WORA)</em>. A spell cast on a Windows scroll can be executed on a Mac or Linux device, so long as they possess the Java Virtual Machine (JVM).</p>

<h3>The Java Toolchain: JDK, JRE, JVM</h3>
<p>These three acronyms are the foundation of how Java works:</p>

<ul>
  <li><strong>JDK (Java Development Kit)</strong> — The full toolkit for developers. It includes the compiler (<code>javac</code>), debugger, and all development tools. <em>This is what you install to write Java.</em></li>
  <li><strong>JRE (Java Runtime Environment)</strong> — The environment needed to <em>run</em> Java programs. It includes the JVM and core libraries but no compiler.</li>
  <li><strong>JVM (Java Virtual Machine)</strong> — The engine that actually executes your code. It reads compiled bytecode and translates it to machine instructions for your specific OS.</li>
</ul>

<div class="callout callout--info">
  <strong>Think of it like this:</strong> JDK = kitchen (full tools to cook). JRE = dining room (just what you need to eat). JVM = your stomach (actually processes the food).
</div>

<h3>How Java Code Runs</h3>
<p>Unlike Python or JavaScript which are interpreted directly, Java uses a <strong>two-step process</strong>:</p>

<pre><code>1. You write:     HelloWorld.java    (source code)
2. Compiler runs: javac HelloWorld.java
3. Produces:      HelloWorld.class   (bytecode)
4. JVM executes:  java HelloWorld     (runs on any OS)</code></pre>

<p>The <code>.class</code> file contains <strong>bytecode</strong> — a platform-independent instruction set. The JVM's <strong>JIT (Just-In-Time) compiler</strong> then converts this bytecode into native machine code at runtime, which is why Java is fast despite being "interpreted".</p>

<h3>Your First Program</h3>
<p>Look at the code editor on the right. Every Java program starts with a <strong>class</strong> and a <strong>main method</strong>:</p>

<pre><code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>

<ul>
  <li><code>public class HelloWorld</code> — Declares a class. The filename must match the class name.</li>
  <li><code>public static void main(String[] args)</code> — The entry point. JVM looks for this exact signature.</li>
  <li><code>System.out.println()</code> — Prints text to the console.</li>
</ul>

<div class="callout callout--tip">
  <strong>Try it!</strong> Modify the message in the editor and hit Run to see your output.
</div>
`,
      },

      // ── Lesson 2 ──────────────────────────────────────────────
      {
        title: 'Primitive Types & Variables',
        language: 'java',
        starterCode: `public class Types {\n    public static void main(String[] args) {\n        // Integer types\n        byte smallNum = 127;        // 8-bit: -128 to 127\n        short medNum = 32000;       // 16-bit\n        int number = 2_000_000;     // 32-bit (most common)\n        long bigNum = 9_000_000_000L; // 64-bit (note the L)\n\n        // Decimal types\n        float pi = 3.14f;           // 32-bit (note the f)\n        double precise = 3.14159265; // 64-bit (default decimal)\n\n        // Other types\n        char letter = 'A';          // Single character\n        boolean isJavaFun = true;   // true or false\n\n        System.out.println("int: " + number);\n        System.out.println("double: " + precise);\n        System.out.println("char: " + letter);\n        System.out.println("boolean: " + isJavaFun);\n    }\n}`,
        content: `
<h2>Primitive Types: The Building Blocks</h2>
<p>Java is a <strong>statically-typed</strong> language. That means every variable must declare its type before you can use it. Unlike Python where <code>x = 5</code> just works, in Java you write <code>int x = 5;</code>.</p>

<p>Java has <strong>8 primitive types</strong> — basic data types built into the language:</p>

<h3>Integer Types (whole numbers)</h3>
<table style="width:100%; font-size:13px; border-collapse:collapse;">
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>byte</code></td><td>8 bits</td><td>-128 to 127</td>
  </tr>
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>short</code></td><td>16 bits</td><td>-32,768 to 32,767</td>
  </tr>
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>int</code></td><td>32 bits</td><td>~-2.1 billion to 2.1 billion</td>
  </tr>
  <tr>
    <td style="padding:8px;"><code>long</code></td><td>64 bits</td><td>Huge range (suffix with <code>L</code>)</td>
  </tr>
</table>

<h3>Decimal Types (floating-point numbers)</h3>
<ul>
  <li><code>float</code> — 32-bit, ~7 decimal digits precision (suffix with <code>f</code>)</li>
  <li><code>double</code> — 64-bit, ~15 decimal digits precision (default for decimals)</li>
</ul>

<h3>Other Types</h3>
<ul>
  <li><code>char</code> — A single Unicode character, enclosed in single quotes: <code>'A'</code></li>
  <li><code>boolean</code> — Only <code>true</code> or <code>false</code></li>
</ul>

<div class="callout callout--warn">
  <strong>Common trap:</strong> <code>int</code> vs <code>Integer</code> — lowercase <code>int</code> is a primitive. Uppercase <code>Integer</code> is a wrapper class (an object). You'll learn about this distinction later.
</div>

<h3>Variable Declaration & Assignment</h3>
<pre><code>// Declaration + initialization
int age = 21;

// Declaration first, assign later
String name;
name = "Biruk";

// Constants (cannot be changed)
final double PI = 3.14159;
// PI = 3.0;  ← This would cause a compile error!</code></pre>

<h3>Type Casting</h3>
<p><strong>Widening</strong> (automatic, safe): smaller type → larger type</p>
<pre><code>int x = 100;
double y = x;  // int → double, automatic</code></pre>

<p><strong>Narrowing</strong> (manual, risky): larger type → smaller type</p>
<pre><code>double price = 9.99;
int rounded = (int) price;  // Explicitly cast, loses .99</code></pre>
`,
      },

      // ── Lesson 3 ──────────────────────────────────────────────
      {
        title: 'Stack vs Heap Memory',
        language: 'java',
        starterCode: `public class MemoryDemo {\n    public static void main(String[] args) {\n        // Primitives live on the STACK\n        int a = 10;\n        int b = a;  // b gets a COPY of a's value\n        b = 20;\n        System.out.println("a = " + a);  // Still 10!\n        System.out.println("b = " + b);  // 20\n\n        // Objects live on the HEAP\n        int[] arr1 = {1, 2, 3};\n        int[] arr2 = arr1;  // arr2 points to SAME object!\n        arr2[0] = 99;\n        System.out.println("arr1[0] = " + arr1[0]);  // 99!\n        System.out.println("arr2[0] = " + arr2[0]);  // 99\n    }\n}`,
        content: `
<h2>How Java Manages Memory</h2>
<p>Understanding where your data lives in memory is one of the most important concepts in Java. It explains why some variables behave independently and others seem "linked."</p>

<h3>The Stack</h3>
<p>The <strong>stack</strong> is like a stack of sticky notes. Each time a method is called, a new <strong>stack frame</strong> is pushed on top:</p>
<ul>
  <li>Stores <strong>local variables</strong> (primitives and reference pointers)</li>
  <li>Stores <strong>method call information</strong> (which method called which)</li>
  <li><strong>Fast</strong> access — Last In, First Out (LIFO)</li>
  <li>Automatically cleaned up when a method returns</li>
</ul>

<h3>The Heap</h3>
<p>The <strong>heap</strong> is like a big warehouse. All <strong>objects</strong> and <strong>arrays</strong> live here:</p>
<ul>
  <li>Stores all objects created with <code>new</code></li>
  <li><strong>Shared</strong> — multiple variables can point to the same object</li>
  <li>Managed by the <strong>Garbage Collector</strong> (GC) — automatically frees unused objects</li>
  <li>Slower than stack, but much larger</li>
</ul>

<h3>The Key Difference: Value vs Reference</h3>
<pre><code>// PRIMITIVES: Stack stores the actual value
int a = 10;
int b = a;     // b gets a COPY of 10
b = 20;        // Only b changes. a is still 10.

// OBJECTS: Stack stores a reference (pointer) to the heap
int[] arr1 = {1, 2, 3};  // Array object on heap
int[] arr2 = arr1;         // arr2 points to SAME array!
arr2[0] = 99;              // BOTH see the change!</code></pre>

<div class="callout callout--info">
  <strong>Visualization:</strong><br>
  Stack: <code>[a=10] [b=20] [arr1→0x100] [arr2→0x100]</code><br>
  Heap:  <code>0x100: [99, 2, 3]</code><br>
  Both arr1 and arr2 point to the same address (0x100) on the heap!
</div>

<h3>Garbage Collection</h3>
<p>When no variable references an object anymore, the <strong>Garbage Collector (GC)</strong> automatically frees that memory. You never need to manually free memory in Java (unlike C/C++).</p>

<pre><code>String s = new String("hello");
s = null;  // The "hello" object is now unreachable
// GC will eventually clean it up</code></pre>

<div class="callout callout--tip">
  <strong>Try it!</strong> Run the code to see how primitives get copied but arrays share the same reference.
</div>
`,
      },

      // ── Lesson 4 ──────────────────────────────────────────────
      {
        title: 'Control Flow: Conditionals & Loops',
        language: 'java',
        starterCode: `public class ControlFlow {\n    public static void main(String[] args) {\n        // If-else\n        int score = 85;\n        if (score >= 90) {\n            System.out.println("Grade: A");\n        } else if (score >= 80) {\n            System.out.println("Grade: B");\n        } else if (score >= 70) {\n            System.out.println("Grade: C");\n        } else {\n            System.out.println("Grade: F");\n        }\n\n        // Switch (modern arrow syntax)\n        String day = "Monday";\n        String type = switch (day) {\n            case "Saturday", "Sunday" -> "Weekend";\n            default -> "Weekday";\n        };\n        System.out.println(day + " is a " + type);\n\n        // For loop\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + " ");\n        }\n        System.out.println();\n\n        // While loop\n        int count = 3;\n        while (count > 0) {\n            System.out.println("Countdown: " + count);\n            count--;\n        }\n    }\n}`,
        content: `
<h2>Making Decisions & Repeating Actions</h2>
<p>Programs are boring if they only run top-to-bottom. <strong>Control flow</strong> lets your code make decisions and repeat actions.</p>

<h3>If / Else If / Else</h3>
<p>The most basic decision-making structure:</p>
<pre><code>if (condition) {
    // runs if condition is true
} else if (anotherCondition) {
    // runs if first was false, this is true
} else {
    // runs if all above were false
}</code></pre>

<p>Comparison operators: <code>==</code> (equal), <code>!=</code> (not equal), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></p>
<p>Logical operators: <code>&&</code> (AND), <code>||</code> (OR), <code>!</code> (NOT)</p>

<h3>Switch Statements</h3>
<p>When you're checking one variable against many values, switch is cleaner than a long if-else chain:</p>
<pre><code>// Classic switch
switch (dayNumber) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Other");
}

// Modern arrow syntax (Java 14+) — no break needed!
String result = switch (dayNumber) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    default -> "Other";
};</code></pre>

<h3>Loops</h3>

<p><strong>For loop</strong> — when you know how many times to repeat:</p>
<pre><code>for (int i = 0; i < 10; i++) {
    System.out.println(i);
}</code></pre>

<p><strong>While loop</strong> — when you repeat until a condition is false:</p>
<pre><code>while (condition) {
    // keep going
}</code></pre>

<p><strong>Do-while loop</strong> — always runs at least once:</p>
<pre><code>do {
    // runs at least once
} while (condition);</code></pre>

<h3>Loop Control</h3>
<ul>
  <li><code>break;</code> — exits the loop immediately</li>
  <li><code>continue;</code> — skips to the next iteration</li>
</ul>

<div class="callout callout--warn">
  <strong>Infinite loop alert!</strong> Always make sure your loop condition will eventually become false. <code>while(true)</code> without a <code>break</code> will hang your program forever.
</div>
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
<p>Your task: complete the temperature converter using the formula:</p>
<pre><code>Fahrenheit = (Celsius × 9/5) + 32</code></pre>
<p>The program should convert <strong>100°C</strong> and print the result in the format shown in the expected output.</p>

<div class="callout callout--tip">
  <strong>Watch out:</strong> Integer division! <code>9/5</code> in Java gives <code>1</code> (integer division), not <code>1.8</code>. Use <code>9.0/5</code> or <code>9/5.0</code> to get decimal results.
</div>
`,
        hints: ['Use 9.0/5 instead of 9/5 to avoid integer division truncation.'],
      },
      {
        title: 'Palindrome Number Checker',
        language: 'java',
        starterCode: `public class Palindrome {\n    public static void main(String[] args) {\n        int number = 12321;\n        int original = number;\n        int reversed = 0;\n\n        // TODO: Reverse the number using a while loop\n        // Hint: Use % 10 to get last digit, / 10 to remove it\n        while (number > 0) {\n            // Your code here\n        }\n\n        if (original == reversed) {\n            System.out.println(original + " is a palindrome");\n        } else {\n            System.out.println(original + " is not a palindrome");\n        }\n    }\n}`,
        expectedOutput: '12321 is a palindrome',
        description: `
<h2>Is it a Palindrome?</h2>
<p>A <strong>palindrome</strong> number reads the same forward and backward. Examples: 121, 12321, 1001.</p>
<p>Your task: <strong>reverse the number</strong> using a while loop, then check if it matches the original.</p>

<h3>Algorithm</h3>
<ol>
  <li>Extract the last digit: <code>lastDigit = number % 10</code></li>
  <li>Build reversed number: <code>reversed = reversed * 10 + lastDigit</code></li>
  <li>Remove last digit from original: <code>number = number / 10</code></li>
  <li>Repeat until number becomes 0</li>
</ol>
`,
        hints: ['Inside the loop: reversed = reversed * 10 + (number % 10); then number = number / 10;'],
      },
    ],

    // ── Quiz ─────────────────────────────────────────────────────
    quiz: [
      {
        question: 'What does JVM stand for?',
        options: ['Java Version Manager', 'Java Virtual Machine', 'Java Variable Method', 'Java Verified Module'],
        correctIndex: 1,
        explanation: 'JVM = Java Virtual Machine. It executes compiled bytecode (.class files) on any platform.',
      },
      {
        question: 'Which of these is NOT a Java primitive type?',
        options: ['int', 'boolean', 'String', 'char'],
        correctIndex: 2,
        explanation: 'String is a class (reference type), not a primitive. The 8 primitives are: byte, short, int, long, float, double, boolean, char.',
      },
      {
        question: 'What is the output of this code?',
        code: 'int a = 10;\nint b = a;\nb = 20;\nSystem.out.println(a);',
        options: ['10', '20', '0', 'Compilation error'],
        correctIndex: 0,
        explanation: 'Primitives are copied by value. Changing b does not affect a.',
      },
      {
        question: 'What does the `final` keyword do when applied to a variable?',
        options: ['Makes it private', 'Makes it static', 'Makes it a constant (cannot be reassigned)', 'Deletes it from memory'],
        correctIndex: 2,
        explanation: 'final makes a variable a constant — once assigned, its value cannot be changed.',
      },
      {
        question: 'What will happen if you write: int x = 9/5;',
        options: ['x = 1.8', 'x = 2', 'x = 1', 'Compilation error'],
        correctIndex: 2,
        explanation: 'Integer division in Java truncates the decimal. 9/5 = 1 (not 1.8). To get 1.8, use 9.0/5.',
      },
      {
        question: 'Where are objects stored in Java memory?',
        options: ['Stack', 'Heap', 'Register', 'Cache'],
        correctIndex: 1,
        explanation: 'All objects and arrays are stored on the Heap. The Stack stores local primitives and reference pointers.',
      },
    ],

    // ── Project ──────────────────────────────────────────────────
    project: {
      title: 'Multi-Function Calculator',
      language: 'java',
      starterCode: `import java.util.Scanner;\n\npublic class Calculator {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        System.out.println("=== Java Calculator ===\");\n        System.out.println(\"1. Addition\");\n        System.out.println(\"2. Subtraction\");\n        System.out.println(\"3. Multiplication\");\n        System.out.println(\"4. Division\");\n        System.out.println(\"5. Modulus\");\n        System.out.print(\"Choose operation (1-5): \");\n\n        // TODO: Read user choice\n        // TODO: Read two numbers\n        // TODO: Perform the operation using switch\n        // TODO: Handle division by zero!\n        // TODO: Display the result\n    }\n}`,
      description: `
<p>Build a <strong>multi-function calculator</strong> that takes user input from the console. This project combines everything from Week 1: variables, types, control flow, and user input handling.</p>
`,
      requirements: [
        'Display a menu of operations (Add, Subtract, Multiply, Divide, Modulus)',
        'Read the user\'s operation choice using Scanner',
        'Read two numbers from the user',
        'Use a switch statement to perform the correct operation',
        'Handle division by zero with an error message',
        'Display the result with a descriptive message',
        'Use appropriate types (double for decimal operations)',
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 2: Classes, Objects & Encapsulation
  // ════════════════════════════════════════════════════════════════
  'week-2': {
    lessons: [
      {
        title: 'What is a Class? What is an Object?',
        language: 'java',
        starterCode: `public class Dog {\n    // Fields (state)\n    String name;\n    String breed;\n    int age;\n\n    // Method (behavior)\n    void bark() {\n        System.out.println(name + " says: Woof!");\n    }\n\n    void info() {\n        System.out.println(name + " | " + breed + " | " + age + " years old");\n    }\n\n    public static void main(String[] args) {\n        Dog dog1 = new Dog();\n        dog1.name = "Max";\n        dog1.breed = "Labrador";\n        dog1.age = 3;\n\n        Dog dog2 = new Dog();\n        dog2.name = "Bella";\n        dog2.breed = "Poodle";\n        dog2.age = 5;\n\n        dog1.bark();\n        dog2.bark();\n        dog1.info();\n        dog2.info();\n    }\n}`,
        content: `
<h2>Classes: Blueprints for Objects</h2>
<p>A <strong>class</strong> is a blueprint that defines what data (fields) and behavior (methods) an object will have. An <strong>object</strong> is a specific instance created from that blueprint.</p>

<div class="callout callout--info">
  <strong>Analogy:</strong> A class is like an architectural blueprint. An object is an actual house built from that blueprint. You can build many houses from one blueprint, each with different colors and furniture.
</div>

<h3>Anatomy of a Class</h3>
<pre><code>public class ClassName {
    // Fields (state/data)
    String name;
    int age;

    // Methods (behavior/actions)
    void doSomething() {
        System.out.println("Doing it!");
    }
}</code></pre>

<h3>Creating Objects</h3>
<p>Use the <code>new</code> keyword to create an object (instance) from a class:</p>
<pre><code>Dog myDog = new Dog();  // Creates a new Dog object on the heap
myDog.name = "Max";     // Set field values
myDog.bark();           // Call methods</code></pre>

<p><strong>Fields</strong> store the object's state. <strong>Methods</strong> define what the object can do.</p>

<h3>Multiple Objects from One Class</h3>
<p>Each object has its own copy of the fields. Changing one object's name doesn't affect another:</p>
<pre><code>Dog dog1 = new Dog();
dog1.name = "Max";

Dog dog2 = new Dog();
dog2.name = "Bella";

// dog1.name is "Max", dog2.name is "Bella" — independent!</code></pre>

<div class="callout callout--tip">
  <strong>Try it!</strong> Create a third dog in the editor and make it bark.
</div>
`,
      },
      {
        title: 'Constructors & the this Keyword',
        language: 'java',
        starterCode: `public class BankAccount {\n    private String owner;\n    private double balance;\n    private String accountId;\n\n    // Constructor\n    public BankAccount(String owner, double initialBalance) {\n        this.owner = owner;\n        this.balance = initialBalance;\n        this.accountId = "ACC-" + (int)(Math.random() * 10000);\n    }\n\n    // Overloaded constructor (no initial balance)\n    public BankAccount(String owner) {\n        this(owner, 0.0);  // Constructor chaining!\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            this.balance += amount;\n            System.out.println("Deposited $" + amount);\n        }\n    }\n\n    public void showInfo() {\n        System.out.println(accountId + " | " + owner + " | Balance: $" + balance);\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc1 = new BankAccount("Biruk", 500.0);\n        BankAccount acc2 = new BankAccount("Alice");\n\n        acc1.deposit(150.0);\n        acc1.showInfo();\n        acc2.showInfo();\n    }\n}`,
        content: `
<h2>Constructors: Building Objects Properly</h2>
<p>A <strong>constructor</strong> is a special method that runs when you create a new object with <code>new</code>. It initializes the object's fields.</p>

<h3>Default Constructor</h3>
<p>If you don't write any constructor, Java gives you an invisible <strong>default constructor</strong> with no parameters. But once you define any constructor, the default disappears.</p>

<h3>Parameterized Constructor</h3>
<pre><code>public class Person {
    String name;
    int age;

    // Constructor
    public Person(String name, int age) {
        this.name = name;  // 'this' refers to the current object
        this.age = age;
    }
}

// Usage:
Person p = new Person("Biruk", 21);</code></pre>

<h3>The <code>this</code> Keyword</h3>
<p><code>this</code> refers to the <strong>current object</strong>. It's used when parameter names shadow field names:</p>
<pre><code>public Person(String name, int age) {
    this.name = name;  // this.name = the field, name = the parameter
    this.age = age;
}</code></pre>

<h3>Constructor Chaining</h3>
<p>One constructor can call another using <code>this(...)</code>:</p>
<pre><code>public BankAccount(String owner) {
    this(owner, 0.0);  // Calls the 2-parameter constructor
}</code></pre>

<div class="callout callout--warn">
  <strong>Rule:</strong> <code>this()</code> must be the <strong>first statement</strong> in the constructor. You can't put any code before it.
</div>
`,
      },
      {
        title: 'Access Modifiers & Encapsulation',
        language: 'java',
        starterCode: `public class Student {\n    // Private fields — hidden from outside\n    private String name;\n    private int grade;\n    private final String id;  // Cannot be changed after creation\n\n    public Student(String name, int grade) {\n        this.name = name;\n        this.setGrade(grade);  // Use setter for validation\n        this.id = "STU-" + (int)(Math.random() * 10000);\n    }\n\n    // Getter — read access\n    public String getName() {\n        return name;\n    }\n\n    // Setter — write access WITH validation\n    public void setGrade(int grade) {\n        if (grade < 0 || grade > 100) {\n            System.out.println("Invalid grade! Must be 0-100.");\n            return;\n        }\n        this.grade = grade;\n    }\n\n    public int getGrade() { return grade; }\n    public String getId() { return id; }\n\n    public String toString() {\n        return id + " | " + name + " | Grade: " + grade;\n    }\n\n    public static void main(String[] args) {\n        Student s = new Student("Biruk", 95);\n        System.out.println(s);\n\n        s.setGrade(150);  // Will print error\n        s.setGrade(88);   // Valid\n        System.out.println(s);\n    }\n}`,
        content: `
<h2>Encapsulation: Protecting Your Data</h2>
<p><strong>Encapsulation</strong> is the practice of hiding internal data and controlling access through methods. It's the most fundamental OOP principle.</p>

<h3>Access Modifiers</h3>
<table style="width:100%; font-size:13px; border-collapse:collapse;">
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>private</code></td><td>Only accessible within the same class</td>
  </tr>
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>default</code> (no keyword)</td><td>Accessible within the same package</td>
  </tr>
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><code>protected</code></td><td>Same package + subclasses</td>
  </tr>
  <tr>
    <td style="padding:8px;"><code>public</code></td><td>Accessible from anywhere</td>
  </tr>
</table>

<h3>The Encapsulation Pattern</h3>
<ol>
  <li>Make fields <code>private</code></li>
  <li>Provide <code>public</code> getters (for reading)</li>
  <li>Provide <code>public</code> setters (for writing) <strong>with validation</strong></li>
</ol>

<pre><code>private int age;

public int getAge() { return age; }

public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age");
    }
    this.age = age;
}</code></pre>

<div class="callout callout--tip">
  <strong>Why bother?</strong> Without encapsulation, anyone could write <code>student.grade = -500</code>. With a setter, you can validate and reject bad data.
</div>

<h3>The <code>final</code> Keyword</h3>
<p>A <code>final</code> field can only be assigned once (in the constructor). After that, it's immutable:</p>
<pre><code>private final String id = "ABC-123";
// id = "XYZ-789";  ← COMPILE ERROR</code></pre>
`,
      },
      {
        title: 'Static vs Instance Members',
        language: 'java',
        starterCode: `public class Counter {\n    // Static field — shared by ALL objects\n    private static int totalCount = 0;\n\n    // Instance field — unique to each object\n    private String label;\n    private int myCount;\n\n    public Counter(String label) {\n        this.label = label;\n        this.myCount = 0;\n        totalCount++;  // Shared counter goes up\n    }\n\n    public void increment() {\n        this.myCount++;\n    }\n\n    // Static method — belongs to the CLASS, not an object\n    public static int getTotalCount() {\n        return totalCount;\n    }\n\n    public void show() {\n        System.out.println(label + ": myCount=" + myCount + ", totalObjects=" + totalCount);\n    }\n\n    public static void main(String[] args) {\n        Counter c1 = new Counter("Alpha");\n        Counter c2 = new Counter("Beta");\n        Counter c3 = new Counter("Gamma");\n\n        c1.increment();\n        c1.increment();\n        c2.increment();\n\n        c1.show();\n        c2.show();\n        c3.show();\n\n        System.out.println("Total objects created: " + Counter.getTotalCount());\n    }\n}`,
        content: `
<h2>Static: Shared Across All Objects</h2>
<p>The <code>static</code> keyword means something belongs to the <strong>class itself</strong>, not to any particular object.</p>

<h3>Instance vs Static</h3>
<table style="width:100%; font-size:13px; border-collapse:collapse;">
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><strong>Instance</strong></td><td>Each object gets its own copy</td><td><code>this.name</code></td>
  </tr>
  <tr>
    <td style="padding:8px;"><strong>Static</strong></td><td>One copy shared by all objects</td><td><code>ClassName.field</code></td>
  </tr>
</table>

<h3>Static Fields</h3>
<pre><code>private static int count = 0;  // Shared by ALL instances</code></pre>
<p>If you have 100 objects, there's still only ONE <code>count</code> variable.</p>

<h3>Static Methods</h3>
<pre><code>public static int getCount() {
    return count;
}

// Called on the CLASS, not an object:
Counter.getCount();</code></pre>

<div class="callout callout--warn">
  <strong>Key rule:</strong> Static methods <strong>cannot</strong> access instance fields or use <code>this</code>. They don't know which object you mean — they belong to the class.
</div>

<h3>Common Uses of Static</h3>
<ul>
  <li><strong>Counters</strong> — track how many objects were created</li>
  <li><strong>Utility methods</strong> — <code>Math.sqrt()</code>, <code>Arrays.sort()</code></li>
  <li><strong>Constants</strong> — <code>static final double PI = 3.14159</code></li>
  <li><strong>Factory methods</strong> — <code>LocalDate.now()</code></li>
</ul>
`,
      },
    ],
    exercises: [
      {
        title: 'Build a BankAccount Class',
        language: 'java',
        starterCode: `public class BankAccount {\n    // TODO: Add private fields: owner (String), balance (double)\n\n    // TODO: Add a constructor that takes owner and initialBalance\n\n    // TODO: Add deposit(double amount) method — reject negative amounts\n\n    // TODO: Add withdraw(double amount) method — reject if insufficient funds\n\n    // TODO: Add getBalance() getter\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount("Biruk", 1000.0);\n        acc.deposit(500.0);\n        acc.withdraw(200.0);\n        acc.withdraw(2000.0);  // Should print error\n        System.out.println("Final balance: $" + acc.getBalance());\n    }\n}`,
        expectedOutput: '',
        description: `
<h2>Build a BankAccount Class</h2>
<p>Create a properly encapsulated <code>BankAccount</code> class with:</p>
<ul>
  <li>Private fields: <code>owner</code> and <code>balance</code></li>
  <li>A constructor that initializes both fields</li>
  <li><code>deposit()</code> — adds money (reject negative amounts)</li>
  <li><code>withdraw()</code> — removes money (reject if balance too low)</li>
  <li><code>getBalance()</code> — returns the current balance</li>
</ul>
<p>The program should print the final balance after all operations.</p>
`,
        hints: ['Remember to use this.field = parameter in the constructor. For withdraw, check if amount <= balance before subtracting.'],
      },
      {
        title: 'Static Counter Challenge',
        language: 'java',
        starterCode: `public class Player {\n    // TODO: Add a static field to count total players\n    // TODO: Add instance fields: name, score\n\n    // TODO: Constructor that increments the total count\n\n    // TODO: Static method to get total player count\n\n    public static void main(String[] args) {\n        Player p1 = new Player("Alice");\n        Player p2 = new Player("Bob");\n        Player p3 = new Player("Charlie");\n        System.out.println("Total players: " + Player.getPlayerCount());\n    }\n}`,
        expectedOutput: 'Total players: 3',
        description: `
<h2>Track Players with Static</h2>
<p>Create a <code>Player</code> class that tracks how many player objects have been created using a <strong>static counter</strong>.</p>
<ul>
  <li>Add a <code>static int playerCount</code> field</li>
  <li>Increment it in the constructor</li>
  <li>Add a <code>static getPlayerCount()</code> method</li>
</ul>
`,
        hints: ['Declare: private static int playerCount = 0; Then in the constructor: playerCount++;'],
      },
    ],
    quiz: [
      {
        question: 'What is the purpose of a constructor?',
        options: ['To destroy an object', 'To initialize an object when it is created', 'To declare a variable', 'To import a library'],
        correctIndex: 1,
        explanation: 'A constructor is called when you use "new" to create an object. It initializes the object\'s state.',
      },
      {
        question: 'What does "this" refer to inside a method?',
        options: ['The class itself', 'The current object', 'The parent class', 'The main method'],
        correctIndex: 1,
        explanation: '"this" is a reference to the current object — the specific instance the method was called on.',
      },
      {
        question: 'Which access modifier makes a field visible only within its own class?',
        options: ['public', 'protected', 'private', 'default'],
        correctIndex: 2,
        explanation: 'private restricts access to the class itself. External code cannot read or modify private fields directly.',
      },
      {
        question: 'What happens if you define a constructor but NOT a default (no-args) constructor?',
        code: 'public class Foo {\n    public Foo(int x) { }\n}\n// Then:\nFoo f = new Foo();  // What happens?',
        options: ['Works fine', 'Compilation error', 'Runs but crashes', 'Creates an empty object'],
        correctIndex: 1,
        explanation: 'Once you define any constructor, Java removes the implicit default. Foo() no longer exists, so new Foo() won\'t compile.',
      },
      {
        question: 'A static method can access instance fields directly. True or false?',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Static methods belong to the class, not an instance. They cannot use "this" or access instance fields without an object reference.',
      },
    ],
    project: {
      title: 'Console Bank Account Simulation',
      language: 'java',
      starterCode: `import java.util.Scanner;\nimport java.util.ArrayList;\n\npublic class BankSimulation {\n    // TODO: Implement full simulation\n    // See requirements checklist\n\n    public static void main(String[] args) {\n        System.out.println("=== Bank Account Simulator ===\");\n        // Your code here\n    }\n}`,
      description: `<p>Build a <strong>console-based bank simulation</strong> where users can create accounts, deposit, withdraw, and transfer money between accounts.</p>`,
      requirements: [
        'Create a BankAccount class with encapsulated fields (owner, balance, accountId)',
        'Auto-generate unique account IDs using a static counter',
        'Implement deposit() with validation (reject negative amounts)',
        'Implement withdraw() with validation (reject if insufficient funds)',
        'Implement transfer() between two accounts',
        'Create a menu-driven console interface using Scanner',
        'Store multiple accounts in an ArrayList',
        'Display all accounts with their balances',
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 3: Inheritance, Polymorphism & Interfaces
  // ════════════════════════════════════════════════════════════════
  'week-3': {
    lessons: [
      {
        title: 'Inheritance: extends & super',
        language: 'java',
        starterCode: `class Animal {\n    String name;\n    int age;\n\n    Animal(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    void speak() {\n        System.out.println(name + " makes a sound");\n    }\n\n    public String toString() {\n        return name + " (age " + age + ")";\n    }\n}\n\nclass Dog extends Animal {\n    String breed;\n\n    Dog(String name, int age, String breed) {\n        super(name, age);  // Call parent constructor\n        this.breed = breed;\n    }\n\n    @Override\n    void speak() {\n        System.out.println(name + " says: Woof! Woof!");\n    }\n}\n\nclass Cat extends Animal {\n    Cat(String name, int age) {\n        super(name, age);\n    }\n\n    @Override\n    void speak() {\n        System.out.println(name + " says: Meow!");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog("Max", 3, "Labrador");\n        Animal b = new Cat("Whiskers", 5);\n\n        a.speak();  // Woof!\n        b.speak();  // Meow!\n        System.out.println(a);\n    }\n}`,
        content: `
<h2>Inheritance: Building on What Exists</h2>
<p><strong>Inheritance</strong> lets a class (child/subclass) inherit fields and methods from another class (parent/superclass). It models the <em>"is-a"</em> relationship.</p>

<pre><code>class Dog extends Animal {
    // Dog inherits all of Animal's fields and methods
    // Dog can add new fields/methods
    // Dog can override parent methods
}</code></pre>

<h3>The <code>super</code> Keyword</h3>
<ul>
  <li><code>super(args)</code> — calls the parent's constructor (must be first line!)</li>
  <li><code>super.methodName()</code> — calls the parent's version of an overridden method</li>
</ul>

<h3>Method Overriding with @Override</h3>
<p>A subclass can <strong>override</strong> a parent's method to provide its own implementation:</p>
<pre><code>@Override
void speak() {
    System.out.println(name + " says: Woof!");
}</code></pre>

<div class="callout callout--tip">
  <strong>@Override</strong> is optional but recommended. It tells the compiler "I intend to override." If you misspell the method name, the compiler will catch it.
</div>

<h3>The Object Superclass</h3>
<p>Every class in Java implicitly extends <code>Object</code>. That's why every object has <code>toString()</code>, <code>equals()</code>, and <code>hashCode()</code> methods.</p>
`,
      },
      {
        title: 'Polymorphism: One Interface, Many Forms',
        language: 'java',
        starterCode: `class Shape {\n    double area() { return 0; }\n}\n\nclass Circle extends Shape {\n    double radius;\n    Circle(double r) { this.radius = r; }\n\n    @Override\n    double area() { return Math.PI * radius * radius; }\n}\n\nclass Rectangle extends Shape {\n    double w, h;\n    Rectangle(double w, double h) { this.w = w; this.h = h; }\n\n    @Override\n    double area() { return w * h; }\n}\n\npublic class Main {\n    public static void printArea(Shape s) {\n        System.out.printf("Area: %.2f%n", s.area());\n    }\n\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(5), new Rectangle(4, 6), new Circle(3) };\n\n        for (Shape s : shapes) {\n            printArea(s);  // Calls the correct area() method!\n        }\n    }\n}`,
        content: `
<h2>Polymorphism: The Power of "Many Forms"</h2>
<p><strong>Polymorphism</strong> means a single method call can behave differently depending on the actual object type. It's what makes OOP truly powerful.</p>

<h3>Compile-Time Polymorphism (Overloading)</h3>
<p>Same method name, different parameters:</p>
<pre><code>int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }</code></pre>

<h3>Runtime Polymorphism (Overriding)</h3>
<p>Parent reference, child object. The <strong>actual object type</strong> determines which method runs:</p>
<pre><code>Shape s = new Circle(5);
s.area();  // Calls Circle's area(), not Shape's!</code></pre>

<p>This is called <strong>dynamic method dispatch</strong> — the JVM decides at runtime which version to call.</p>

<div class="callout callout--info">
  <strong>Why is this useful?</strong> You can write code that works with the <em>parent type</em> and it automatically works with all child types. Add a new Shape subclass? Your existing code still works!
</div>
`,
      },
      {
        title: 'Abstract Classes vs Interfaces',
        language: 'java',
        starterCode: `// Abstract class — cannot be instantiated\nabstract class Vehicle {\n    String name;\n\n    Vehicle(String name) { this.name = name; }\n\n    // Abstract method — subclasses MUST implement\n    abstract double fuelEfficiency();\n\n    // Concrete method — inherited as-is\n    void honk() { System.out.println(name + ": Beep!"); }\n}\n\n// Interface — a "contract" of capabilities\ninterface Electric {\n    void charge();  // implicitly public abstract\n\n    // Default method (Java 8+)\n    default void batteryStatus() {\n        System.out.println("Battery OK");\n    }\n}\n\nclass Tesla extends Vehicle implements Electric {\n    Tesla(String name) { super(name); }\n\n    @Override\n    double fuelEfficiency() { return 0; }  // Electric!\n\n    @Override\n    public void charge() {\n        System.out.println(name + " charging at Supercharger...");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Tesla t = new Tesla("Model 3");\n        t.honk();\n        t.charge();\n        t.batteryStatus();\n        System.out.println("Fuel: " + t.fuelEfficiency() + " mpg");\n    }\n}`,
        content: `
<h2>Abstract Classes & Interfaces</h2>

<h3>Abstract Classes</h3>
<p>An <strong>abstract class</strong> is a class that <em>cannot be instantiated</em> directly. It can have both abstract methods (no body) and concrete methods (with body).</p>
<pre><code>abstract class Animal {
    abstract void speak();  // Subclasses MUST implement
    void breathe() { }       // Concrete — inherited as-is
}</code></pre>

<h3>Interfaces</h3>
<p>An <strong>interface</strong> is a pure contract. It defines <em>what</em> a class can do, not <em>how</em>.</p>
<pre><code>interface Flyable {
    void fly();  // implicitly public abstract
}

class Bird implements Flyable {
    @Override
    public void fly() { System.out.println("Flapping wings"); }
}</code></pre>

<h3>When to Use Which?</h3>
<table style="width:100%; font-size:13px; border-collapse:collapse;">
  <tr style="border-bottom:1px solid rgba(0,229,255,0.1);">
    <td style="padding:8px;"><strong>Abstract class</strong></td><td>"is-a" relationship + shared code</td><td>Dog <em>is a</em> Animal</td>
  </tr>
  <tr>
    <td style="padding:8px;"><strong>Interface</strong></td><td>"can-do" capability contract</td><td>Dog <em>can</em> Fetch</td>
  </tr>
</table>

<div class="callout callout--info">
  <strong>Key rule:</strong> A class can extend only <strong>ONE</strong> abstract class, but can implement <strong>MANY</strong> interfaces.
</div>
`,
      },
      {
        title: 'Java 8+ Interface Features',
        language: 'java',
        starterCode: `interface Greetable {\n    // Abstract method\n    String greet(String name);\n\n    // Default method — provides a body\n    default String shout(String name) {\n        return greet(name).toUpperCase() + "!!!";\n    }\n\n    // Static method — utility on the interface itself\n    static String wave() {\n        return "👋";\n    }\n}\n\nclass FriendlyGreeter implements Greetable {\n    @Override\n    public String greet(String name) {\n        return "Hey " + name + "! How are you?";\n    }\n}\n\nclass FormalGreeter implements Greetable {\n    @Override\n    public String greet(String name) {\n        return "Good day, " + name + ".";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Greetable g1 = new FriendlyGreeter();\n        Greetable g2 = new FormalGreeter();\n\n        System.out.println(g1.greet("Biruk"));\n        System.out.println(g1.shout("Biruk"));\n        System.out.println(g2.greet("Professor"));\n        System.out.println(Greetable.wave());\n    }\n}`,
        content: `
<h2>Modern Interface Features (Java 8+)</h2>
<p>Since Java 8, interfaces are more powerful than ever. They can now contain:</p>

<h3>1. Default Methods</h3>
<p>Methods with a body that implementing classes inherit automatically:</p>
<pre><code>interface Sortable {
    default void sort() {
        System.out.println("Default sorting...");
    }
}</code></pre>
<p>Classes can override default methods or just use them as-is.</p>

<h3>2. Static Methods</h3>
<p>Utility methods on the interface itself:</p>
<pre><code>interface MathUtils {
    static int max(int a, int b) {
        return a > b ? a : b;
    }
}
// Usage: MathUtils.max(5, 10);</code></pre>

<h3>Why This Matters</h3>
<p>Default methods let you add new functionality to interfaces without breaking existing implementations. This was crucial for adding features like <code>.stream()</code> and <code>.forEach()</code> to the Collections framework in Java 8.</p>

<div class="callout callout--tip">
  <strong>Design tip:</strong> Use interfaces with default methods to create flexible "mixins" — reusable capabilities that classes can pick and choose from.
</div>
`,
      },
    ],
    exercises: [
      {
        title: 'Employee Hierarchy',
        language: 'java',
        starterCode: `// TODO: Create an abstract class Employee with:\n//   - fields: name, baseSalary\n//   - abstract method: calculatePay()\n//   - concrete method: display()\n\n// TODO: Create Manager extends Employee\n//   - extra field: bonus\n//   - calculatePay() returns baseSalary + bonus\n\n// TODO: Create Developer extends Employee\n//   - extra field: overtimeHours\n//   - calculatePay() returns baseSalary + (overtimeHours * 50)\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Create a Manager and Developer, call display() on each\n    }\n}`,
        expectedOutput: '',
        description: `<h2>Polymorphic Payroll</h2><p>Create an <code>Employee</code> hierarchy using abstract classes and polymorphism. Each employee type calculates pay differently.</p>`,
        hints: ['Start with: abstract class Employee { String name; double baseSalary; abstract double calculatePay(); }'],
      },
      {
        title: 'Payment Processor Interface',
        language: 'java',
        starterCode: `// TODO: Create interface PaymentProcessor with method: processPayment(double amount)\n// TODO: Create CreditCardProcessor implements PaymentProcessor\n// TODO: Create PayPalProcessor implements PaymentProcessor\n// TODO: Create a method that accepts PaymentProcessor and processes $100\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Test with different processors\n    }\n}`,
        expectedOutput: '',
        description: `<h2>Payment Gateway</h2><p>Design a <code>PaymentProcessor</code> interface and implement it with multiple payment methods. Use polymorphism to process payments without knowing the specific processor type.</p>`,
        hints: ['interface PaymentProcessor { void processPayment(double amount); }'],
      },
    ],
    quiz: [
      { question: 'What keyword is used for inheritance in Java?', options: ['implements', 'extends', 'inherits', 'derives'], correctIndex: 1, explanation: '"extends" creates an inheritance relationship between classes.' },
      { question: 'Can a class extend multiple classes in Java?', options: ['Yes', 'No'], correctIndex: 1, explanation: 'Java does NOT support multiple inheritance of classes. A class can extend only ONE class but implement multiple interfaces.' },
      { question: 'What is the difference between overloading and overriding?', options: ['Overloading: same name different params. Overriding: subclass replaces parent method.', 'They are the same thing', 'Overloading replaces, Overriding adds', 'Neither exists in Java'], correctIndex: 0, explanation: 'Overloading = same method name, different parameter list (compile-time). Overriding = subclass provides its own implementation of a parent method (runtime).' },
      { question: 'What does @Override do?', options: ['Forces the method to be static', 'Tells the compiler you intend to override a parent method', 'Makes the method private', 'Deletes the parent method'], correctIndex: 1, explanation: '@Override is an annotation that helps catch errors. If the method signature doesn\'t match a parent method, the compiler will flag it.' },
      { question: 'An abstract class can be instantiated directly.', options: ['True', 'False'], correctIndex: 1, explanation: 'You cannot do new AbstractClass(). You must create a concrete subclass that implements all abstract methods.' },
    ],
    project: {
      title: 'RPG Battle Arena',
      language: 'java',
      starterCode: `// Build your RPG Battle Arena here!\npublic class BattleArena {\n    public static void main(String[] args) {\n        System.out.println("⚔️ Welcome to the Battle Arena!");\n        // Your code here\n    }\n}`,
      description: `<p>Build a <strong>polymorphic RPG Battle Arena</strong> where different character types fight each other using unique abilities.</p>`,
      requirements: [
        'Create an abstract class Character with: name, hp, attackPower, and abstract attack() method',
        'Create at least 3 subclasses: Warrior (high hp), Mage (high attack), Rogue (critical hit chance)',
        'Each subclass overrides attack() with unique behavior',
        'Implement a Healable interface with a heal() method for characters that can heal',
        'Create a battle() method that makes two characters fight until one reaches 0 hp',
        'Use polymorphism — the battle method should accept Character type, not specific subclasses',
        'Display turn-by-turn combat log with damage dealt and remaining hp',
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 4: Collections, Generics & Exception Handling
  // ════════════════════════════════════════════════════════════════
  'week-4': {
    lessons: [
      {
        title: 'Java Collections Framework',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class CollectionsDemo {\n    public static void main(String[] args) {\n        // ArrayList — ordered, allows duplicates\n        List<String> names = new ArrayList<>();\n        names.add("Alice");\n        names.add("Bob");\n        names.add("Alice");  // Duplicates OK\n        System.out.println("List: " + names);\n\n        // HashSet — unordered, NO duplicates\n        Set<String> unique = new HashSet<>(names);\n        System.out.println("Set: " + unique);\n\n        // HashMap — key-value pairs\n        Map<String, Integer> ages = new HashMap<>();\n        ages.put("Alice", 25);\n        ages.put("Bob", 30);\n        System.out.println("Map: " + ages);\n        System.out.println("Alice's age: " + ages.get("Alice"));\n\n        // Iterating\n        for (String name : names) {\n            System.out.println("Hello, " + name);\n        }\n\n        // Sorting\n        Collections.sort(names);\n        System.out.println("Sorted: " + names);\n    }\n}`,
        content: `
<h2>The Collections Framework</h2>
<p>Java's Collections Framework gives you powerful, ready-to-use data structures. Here are the big three:</p>

<h3>List (ArrayList, LinkedList)</h3>
<ul>
  <li><strong>Ordered</strong> — elements maintain insertion order</li>
  <li><strong>Indexed</strong> — access by position: <code>list.get(0)</code></li>
  <li><strong>Allows duplicates</strong></li>
  <li><code>ArrayList</code> — backed by array, fast random access</li>
  <li><code>LinkedList</code> — backed by nodes, fast insert/delete at ends</li>
</ul>

<h3>Set (HashSet, TreeSet)</h3>
<ul>
  <li><strong>No duplicates</strong> — adding a duplicate is silently ignored</li>
  <li><code>HashSet</code> — unordered, O(1) lookup</li>
  <li><code>TreeSet</code> — sorted order, O(log n) operations</li>
</ul>

<h3>Map (HashMap, TreeMap)</h3>
<ul>
  <li><strong>Key-value pairs</strong> — like a dictionary</li>
  <li>Keys must be unique</li>
  <li><code>HashMap</code> — unordered, O(1) operations</li>
  <li><code>TreeMap</code> — sorted by keys</li>
</ul>

<div class="callout callout--tip">
  <strong>Rule of thumb:</strong> Need ordered items? → <code>ArrayList</code>. Need uniqueness? → <code>HashSet</code>. Need key-value lookup? → <code>HashMap</code>.
</div>
`,
      },
      {
        title: 'Generics: Type-Safe Collections',
        language: 'java',
        starterCode: `// Generic class — works with any type!\nclass Box<T> {\n    private T item;\n\n    public Box(T item) {\n        this.item = item;\n    }\n\n    public T getItem() { return item; }\n\n    public void setItem(T item) { this.item = item; }\n\n    public String toString() {\n        return "Box[" + item + "]";\n    }\n}\n\n// Generic method\nclass Utils {\n    static <T> void printArray(T[] arr) {\n        for (T item : arr) {\n            System.out.print(item + " ");\n        }\n        System.out.println();\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> nameBox = new Box<>("Hello");\n        Box<Integer> numBox = new Box<>(42);\n\n        System.out.println(nameBox);\n        System.out.println(numBox);\n\n        String[] words = {"Java", "is", "awesome"};\n        Integer[] nums = {1, 2, 3, 4, 5};\n        Utils.printArray(words);\n        Utils.printArray(nums);\n    }\n}`,
        content: `
<h2>Generics: Type Parameters</h2>
<p><strong>Generics</strong> let you write classes and methods that work with any type while maintaining type safety at compile time.</p>

<h3>Without Generics (Unsafe)</h3>
<pre><code>List list = new ArrayList();
list.add("hello");
list.add(42);  // Mixing types — runtime crash waiting to happen!
String s = (String) list.get(1);  // ClassCastException!</code></pre>

<h3>With Generics (Safe)</h3>
<pre><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("hello");
// list.add(42);  ← COMPILE ERROR! Type safety enforced.</code></pre>

<h3>Generic Classes</h3>
<pre><code>class Box&lt;T&gt; {
    private T item;
    public T getItem() { return item; }
}</code></pre>
<p><code>T</code> is a <strong>type parameter</strong>. When you create <code>Box&lt;String&gt;</code>, every <code>T</code> becomes <code>String</code>.</p>

<h3>Common Type Parameter Names</h3>
<ul>
  <li><code>T</code> — Type</li>
  <li><code>E</code> — Element</li>
  <li><code>K, V</code> — Key, Value</li>
  <li><code>N</code> — Number</li>
</ul>

<div class="callout callout--info">
  <strong>Type Erasure:</strong> Generics are a compile-time feature. At runtime, <code>Box&lt;String&gt;</code> and <code>Box&lt;Integer&gt;</code> are both just <code>Box</code>. The JVM doesn't know about generic types.
</div>
`,
      },
      {
        title: 'Exception Handling',
        language: 'java',
        starterCode: `import java.io.*;\n\npublic class ExceptionDemo {\n    public static void main(String[] args) {\n        // Basic try-catch\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Cannot divide by zero: " + e.getMessage());\n        }\n\n        // Multiple catches\n        try {\n            String s = null;\n            System.out.println(s.length());\n        } catch (NullPointerException e) {\n            System.out.println("Null pointer: " + e.getMessage());\n        } catch (Exception e) {\n            System.out.println("Something went wrong");\n        } finally {\n            System.out.println("Finally block always runs!");\n        }\n\n        // Custom exception\n        try {\n            validateAge(-5);\n        } catch (IllegalArgumentException e) {\n            System.out.println("Validation error: " + e.getMessage());\n        }\n\n        System.out.println("Program continues after exceptions!");\n    }\n\n    static void validateAge(int age) {\n        if (age < 0 || age > 150) {\n            throw new IllegalArgumentException("Age must be between 0 and 150");\n        }\n        System.out.println("Valid age: " + age);\n    }\n}`,
        content: `
<h2>Exception Handling: Graceful Error Recovery</h2>
<p>Exceptions are Java's way of handling errors at runtime. Instead of crashing, you can <strong>catch</strong> errors and respond gracefully.</p>

<h3>The Exception Hierarchy</h3>
<pre><code>Throwable
├── Error (don't catch these — OutOfMemoryError, StackOverflowError)
└── Exception
    ├── Checked (IOException, SQLException — MUST be handled)
    └── RuntimeException (unchecked — NullPointerException, ArrayIndexOutOfBounds)</code></pre>

<h3>try-catch-finally</h3>
<pre><code>try {
    // Risky code
} catch (SpecificException e) {
    // Handle specific error
} catch (Exception e) {
    // Handle general errors
} finally {
    // ALWAYS runs — cleanup code (close files, etc.)
}</code></pre>

<h3>Throwing Exceptions</h3>
<pre><code>if (amount < 0) {
    throw new IllegalArgumentException("Amount cannot be negative");
}</code></pre>

<h3>Custom Exceptions</h3>
<pre><code>class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) {
        super(msg);
    }
}</code></pre>

<div class="callout callout--warn">
  <strong>Don't catch and ignore!</strong> <code>catch (Exception e) { }</code> silently swallows errors and makes debugging impossible. Always log or handle the error.
</div>
`,
      },
      {
        title: 'Comparable, Comparator & Sorting',
        language: 'java',
        starterCode: `import java.util.*;\n\nclass Student implements Comparable<Student> {\n    String name;\n    double gpa;\n\n    Student(String name, double gpa) {\n        this.name = name;\n        this.gpa = gpa;\n    }\n\n    // Natural ordering: by GPA descending\n    @Override\n    public int compareTo(Student other) {\n        return Double.compare(other.gpa, this.gpa);  // Descending\n    }\n\n    public String toString() {\n        return name + " (GPA: " + gpa + ")";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Student> students = new ArrayList<>(List.of(\n            new Student("Alice", 3.8),\n            new Student("Bob", 3.5),\n            new Student("Charlie", 3.9),\n            new Student("Diana", 3.7)\n        ));\n\n        // Sort by natural order (GPA descending)\n        Collections.sort(students);\n        System.out.println("By GPA (desc): " + students);\n\n        // Sort by name using Comparator\n        students.sort(Comparator.comparing(s -> s.name));\n        System.out.println("By Name:       " + students);\n    }\n}`,
        content: `
<h2>Sorting Custom Objects</h2>
<p>How do you sort a list of Students or Products? Java provides two ways:</p>

<h3>Comparable (Natural Ordering)</h3>
<p>Implement <code>Comparable&lt;T&gt;</code> to define a class's default sort order:</p>
<pre><code>class Student implements Comparable&lt;Student&gt; {
    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name); // Alphabetical
    }
}</code></pre>
<p>Return negative (this &lt; other), zero (equal), or positive (this &gt; other).</p>

<h3>Comparator (Custom Ordering)</h3>
<p>Use <code>Comparator</code> for alternate sort orders without modifying the class:</p>
<pre><code>// Sort by GPA
students.sort(Comparator.comparingDouble(s -> s.gpa));

// Sort by name, then by GPA
students.sort(Comparator.comparing((Student s) -> s.name)
                         .thenComparingDouble(s -> s.gpa));</code></pre>

<div class="callout callout--tip">
  <strong>Rule of thumb:</strong> Use <code>Comparable</code> for the one "natural" ordering (e.g., alphabetical for names). Use <code>Comparator</code> for alternative orderings (by date, by price, etc.).
</div>
`,
      },
    ],
    exercises: [
      {
        title: 'Generic Storage Container',
        language: 'java',
        starterCode: `// TODO: Create a generic class Storage<T> that:\n// - Has an internal ArrayList<T>\n// - Has add(T item), get(int index), size() methods\n// - Has a contains(T item) method\n// - Overrides toString()\n\npublic class Main {\n    public static void main(String[] args) {\n        // Test with Strings\n        // Test with Integers\n    }\n}`,
        expectedOutput: '',
        description: `<h2>Generic Storage</h2><p>Build a <code>Storage&lt;T&gt;</code> class that wraps an ArrayList and provides type-safe add, get, contains, and size methods.</p>`,
        hints: ['class Storage<T> { private ArrayList<T> items = new ArrayList<>(); ... }'],
      },
      {
        title: 'Custom Exception: Student Not Found',
        language: 'java',
        starterCode: `// TODO: Create StudentNotFoundException extends Exception\n// TODO: Create a StudentRegistry class with:\n//   - ArrayList of student names\n//   - addStudent(String name)\n//   - findStudent(String name) throws StudentNotFoundException\n\npublic class Main {\n    public static void main(String[] args) {\n        // Add students, then try to find one that doesn't exist\n    }\n}`,
        expectedOutput: '',
        description: `<h2>Custom Exception</h2><p>Create a <code>StudentNotFoundException</code> and a registry that throws it when searching for a non-existent student.</p>`,
        hints: ['class StudentNotFoundException extends Exception { public StudentNotFoundException(String msg) { super(msg); } }'],
      },
    ],
    quiz: [
      { question: 'Which collection does NOT allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'], correctIndex: 2, explanation: 'Sets do not allow duplicates. HashSet, TreeSet, and LinkedHashSet all enforce uniqueness.' },
      { question: 'What does HashMap.get(key) return if the key doesn\'t exist?', options: ['0', 'Empty string', 'null', 'Throws an exception'], correctIndex: 2, explanation: 'HashMap returns null for missing keys. Use containsKey() to check first, or getOrDefault() for a fallback value.' },
      { question: 'What is type erasure?', options: ['Deleting types at compile time', 'Generic type info is removed at runtime', 'Converting types to Object', 'A security feature'], correctIndex: 1, explanation: 'Java generics are a compile-time check only. At runtime, List<String> becomes just List — the type parameter is "erased."' },
      { question: 'The finally block runs...', options: ['Only if an exception occurs', 'Only if no exception occurs', 'Always, whether or not an exception occurs', 'Only with checked exceptions'], correctIndex: 2, explanation: 'finally always runs — after try (if no exception) or after catch (if there was one). It\'s used for cleanup like closing files.' },
      { question: 'Which is the correct way to throw an exception?', code: '// Which one?', options: ['throw new Exception("msg")', 'throws new Exception("msg")', 'raise Exception("msg")', 'Exception.throw("msg")'], correctIndex: 0, explanation: '"throw" creates and throws an exception. "throws" is used in method signatures to declare what exceptions a method might throw.' },
    ],
    project: {
      title: 'CLI Student Management System',
      language: 'java',
      starterCode: `import java.util.*;\n\npublic class StudentManager {\n    public static void main(String[] args) {\n        System.out.println("=== Student Management System ===\");\n        // Your code here\n    }\n}`,
      description: `<p>Build a complete <strong>CLI Student Management System</strong> that demonstrates your mastery of collections, generics, and exception handling.</p>`,
      requirements: [
        'Create a Student class with: id, name, grades (List<Double>)',
        'Implement Comparable<Student> to sort by GPA',
        'Create a StudentRegistry using a HashMap<String, Student> (id → student)',
        'CRUD operations: Add, Remove, Update grade, View all students',
        'Custom exceptions: StudentNotFoundException, DuplicateEnrollmentException',
        'Calculate and display GPA for each student',
        'Sort and display students by GPA (Comparable) or by name (Comparator)',
        'Menu-driven console interface with proper error handling',
      ],
    },
  },
};
