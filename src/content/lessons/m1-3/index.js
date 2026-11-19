import b131 from './1.3.1.md?raw';
import b132 from './1.3.2.md?raw';
import b133 from './1.3.3.md?raw';
import b134 from './1.3.4.md?raw';
import b135 from './1.3.5.md?raw';
import projectBody from './project.md?raw';

const javaMain = (body) => `public class Main {
    public static void main(String[] args) {
${body.split('\n').map((l) => (l ? '        ' + l : l)).join('\n')}
    }
}
`;

export default {
  lessons: {
    '1.3.1': {
      body: b131,
      starter: {
        python: `countdown = 5

while countdown > 0:
    print(countdown)
    countdown -= 1

print("Liftoff")
`,
        java: javaMain(`int countdown = 5;

while (countdown > 0) {
    System.out.println(countdown);
    countdown--;
}

System.out.println("Liftoff");`),
      },
    },
    '1.3.2': {
      body: b132,
      starter: {
        python: `for i in range(0, 10, 3):
    print(i, end=" ")
print()

for i in range(5, 0, -1):
    print(i, end=" ")
print()
`,
        java: javaMain(`for (int i = 0; i < 10; i += 3) {
    System.out.print(i + " ");
}
System.out.println();

for (int i = 5; i > 0; i--) {
    System.out.print(i + " ");
}
System.out.println();`),
      },
    },
    '1.3.3': {
      body: b133,
      starter: {
        python: `readings = "-4,-9,-2,-7"
highest = 0   # the bug is here: try float("-inf")

for token in readings.split(","):
    value = int(token)
    if value > highest:
        highest = value

print(highest)
`,
        java: javaMain(`int[] readings = {-4, -9, -2, -7};
int highest = 0;   // the bug is here

for (int value : readings) {
    if (value > highest) {
        highest = value;
    }
}

System.out.println(highest);`),
      },
    },
    '1.3.4': {
      body: b134,
      starter: {
        python: `n = 29

for d in range(2, n):
    if n % d == 0:
        print(n, "is not prime, divisible by", d)
        break
else:
    print(n, "is prime")
`,
        java: javaMain(`int n = 29;
boolean prime = true;

for (int d = 2; d < n; d++) {
    if (n % d == 0) {
        System.out.println(n + " is not prime, divisible by " + d);
        prime = false;
        break;
    }
}
if (prime) {
    System.out.println(n + " is prime");
}`),
      },
    },
    '1.3.5': {
      body: b135,
      starter: {
        python: `n = 5

for row in range(1, n + 1):
    for col in range(row):
        print("*", end="")
    print()
`,
        java: javaMain(`int n = 5;

for (int row = 1; row <= n; row++) {
    for (int col = 0; col < row; col++) {
        System.out.print("*");
    }
    System.out.println();
}`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'How many times does the body run?',
        code: 'i = 3\nwhile i > 0:\n    print(i)\n    i -= 1',
        options: ['2', '3', '4', 'Forever'],
        answer: 1,
        explain: 'i takes the values 3, 2, 1. When it reaches 0 the condition `i > 0` is false and the loop ends.',
      },
      {
        q: 'Why does this loop never end?',
        code: 'n = 10\nwhile n > 0:\n    print(n)',
        options: ['`print` is not allowed in a while loop', 'n is never updated, so the condition stays true', 'The condition is written wrongly', 'It does end after 10 iterations'],
        answer: 1,
        explain: 'Nothing changes `n` inside the body, so `n > 0` stays true forever.',
      },
      {
        q: 'What does `list(range(2, 10, 3))` produce?',
        options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 3, 4, 5, 6, 7, 8, 9]'],
        answer: 0,
        explain: 'It starts at 2 and adds 3 each time: 2, 5, 8. The next value, 11, is past the stop value 10.',
      },
      {
        q: 'Which call counts down 5, 4, 3, 2, 1?',
        options: ['range(5, 0)', 'range(5, 0, -1)', 'range(5, 1, -1)', 'range(1, 5, -1)'],
        answer: 1,
        explain: 'A negative step counts down, and the stop value 0 is excluded. `range(5, 1, -1)` would stop before 1.',
      },
      {
        q: 'What is printed?',
        code: 'total = 0\nfor n in range(1, 5):\n    total += n\nprint(total)',
        options: ['10', '15', '4', '5'],
        answer: 0,
        explain: '`range(1, 5)` is 1, 2, 3, 4, and they sum to 10. The stop value 5 is excluded.',
      },
      {
        q: 'This code reports the maximum of some negative readings. What is wrong?',
        code: 'highest = 0\nfor v in [-4, -9, -2]:\n    if v > highest:\n        highest = v\nprint(highest)',
        options: ['It prints -2, which is correct', 'It prints 0 because the starting value is larger than every reading', 'It raises a TypeError', 'It prints -9'],
        answer: 1,
        explain: 'No reading is greater than 0, so the initial value is never replaced. Start at `float("-inf")` instead.',
      },
      {
        q: 'What is printed?',
        code: 'for n in range(5):\n    if n == 3:\n        break\n    print(n, end=" ")\nelse:\n    print("done")',
        options: ['0 1 2 done', '0 1 2', '0 1 2 3', '0 1 2 3 4 done'],
        answer: 1,
        explain: 'The `break` at n == 3 ends the loop, so the `else` block is skipped.',
      },
      {
        q: 'What does `continue` do?',
        options: ['Ends the loop entirely', 'Skips the rest of this iteration and moves to the next', 'Restarts the loop from the beginning', 'Does nothing'],
        answer: 1,
        explain: '`continue` jumps to the next iteration. `break` is the one that ends the loop.',
      },
      {
        q: 'How many times does the innermost body run?',
        code: 'for i in range(3):\n    for j in range(2):\n        print(i, j)',
        options: ['5', '6', '3', '2'],
        answer: 1,
        explain: 'The inner loop runs 2 times for each of the 3 outer iterations: 3 * 2 = 6.',
      },
      {
        q: 'What does this pattern print for `n = 3`?',
        code: 'for row in range(1, n + 1):\n    print("*" * row)',
        options: ['***, ***, ***', '*, **, ***', '***, **, *', '*, *, *'],
        answer: 1,
        explain: 'Row 1 prints one star, row 2 two and row 3 three, so the triangle grows downward.',
      },
    ],
  },

  project: {
    title: 'Loop Lab',
    body: projectBody,
    starter: {
      python: `# 1. Sum of every number below 1000 divisible by 3 or 5
multiples_total = 0


# 2. Collatz journey starting from 27
collatz_steps = 0
collatz_peak = 27


# 3. Sum of the digits of 2 ** 100
digit_sum = 0


# 4. The smallest prime greater than 1000
next_prime = 0


# 5. Print a 5-row triangle of stars with nested loops

`,
      java: javaMain('// Checks run on Python. Try the same experiments in Java if you like.'),
    },
    checks: `check("multiples_total is 233168", ns.get("multiples_total") == 233168, "sum every n below 1000 where n % 3 == 0 or n % 5 == 0")
check("collatz_steps is 111", ns.get("collatz_steps") == 111, "count each time you apply the rule until n reaches 1")
check("collatz_peak is 9232", ns.get("collatz_peak") == 9232, "track the largest n after every update")
check("digit_sum is 115", ns.get("digit_sum") == 115, "loop over str(2 ** 100) and add int(ch)")
check("next_prime is 1009", ns.get("next_prime") == 1009, "try 1001, 1002, ... until one has no divisor up to its square root")
check("triangle is printed", "*" + chr(10) + "**" + chr(10) + "***" + chr(10) + "****" + chr(10) + "*****" in out, "print 1, 2, 3, 4, then 5 stars on separate lines")`,
  },
};
