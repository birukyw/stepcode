import b121 from './1.2.1.md?raw';
import b122 from './1.2.2.md?raw';
import b123 from './1.2.3.md?raw';
import b124 from './1.2.4.md?raw';
import b125 from './1.2.5.md?raw';
import projectBody from './project.md?raw';

const javaMain = (body) => `public class Main {
    public static void main(String[] args) {
${body.split('\n').map((l) => (l ? '        ' + l : l)).join('\n')}
    }
}
`;

export default {
  lessons: {
    '1.2.1': {
      body: b121,
      starter: {
        python: `x = 50

print(x > 30)
print(x == 50)
print(30 <= x < 75)
print(x != 50)
`,
        java: javaMain(`int x = 50;

System.out.println(x > 30);
System.out.println(x == 50);
System.out.println(30 <= x && x < 75);
System.out.println(x != 50);`),
      },
    },
    '1.2.2': {
      body: b122,
      stdin: 'open sesame\n',
      starter: {
        python: `# Type a password in the Input box, then press Run.
password = input("Password: ")

if password == "open sesame":
    print("Access granted")
else:
    print("Access denied")
`,
        java: javaMain(`java.util.Scanner in = new java.util.Scanner(System.in);
System.out.print("Password: ");
String password = in.nextLine();

if (password.equals("open sesame")) {
    System.out.println("Access granted");
} else {
    System.out.println("Access denied");
}`),
      },
    },
    '1.2.3': {
      body: b123,
      starter: {
        python: `roll = 95

if roll >= 50:
    tier = "rare"
elif roll >= 90:
    tier = "legendary"
else:
    tier = "common"

print(tier)   # should be "legendary". Find the bug.
`,
        java: javaMain(`int roll = 95;
String tier;

if (roll >= 50) {
    tier = "rare";
} else if (roll >= 90) {
    tier = "legendary";
} else {
    tier = "common";
}

System.out.println(tier);   // should be "legendary". Find the bug.`),
      },
    },
    '1.2.4': {
      body: b124,
      starter: {
        python: `year = 2024

is_leap = year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)
print(year, "is a leap year:", is_leap)
`,
        java: javaMain(`int year = 2024;

boolean isLeap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
System.out.println(year + " is a leap year: " + isLeap);`),
      },
    },
    '1.2.5': {
      body: b125,
      stdin: '\n',
      starter: {
        python: `# Leave the Input box empty, then type a name and run again.
name = input("Name: ")

print("Hello,", name or "stranger")
`,
        java: javaMain(`java.util.Scanner in = new java.util.Scanner(System.in);
System.out.print("Name: ");
String name = in.hasNextLine() ? in.nextLine() : "";

System.out.println("Hello, " + (name.isEmpty() ? "stranger" : name));`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'What does this print?',
        code: 'print(30 <= 75 < 90)',
        options: ['True', 'False', 'A SyntaxError', '75'],
        answer: 0,
        explain: 'Chained comparisons work like maths: it is true when both 30 <= 75 and 75 < 90 hold.',
      },
      {
        q: 'What does `"10" == 10` evaluate to?',
        options: ['True', 'False', 'A TypeError', '10'],
        answer: 1,
        explain: 'A string and an integer are never equal, even if they look the same. `==` does not raise an error here, it simply returns False.',
      },
      {
        q: 'Which expression is true for x = 30 and false for x = 75, matching the half-open interval [30, 75)?',
        options: ['30 < x <= 75', '30 <= x < 75', '30 <= x <= 75', '30 < x < 75'],
        answer: 1,
        explain: 'A half-open interval includes the lower bound and excludes the upper bound.',
      },
      {
        q: 'What does `0.1 + 0.2 == 0.3` evaluate to?',
        options: ['True', 'False', 'None', 'It raises an error'],
        answer: 1,
        explain: 'Floats are stored in binary, so 0.1 + 0.2 is 0.30000000000000004. Use `math.isclose` to compare floats.',
      },
      {
        q: 'What is printed?',
        code: 'roll = 95\nif roll >= 50:\n    print("rare")\nelif roll >= 90:\n    print("legendary")\nelse:\n    print("common")',
        options: ['legendary', 'rare', 'rare and legendary', 'common'],
        answer: 1,
        explain: 'The first true condition wins and the rest of the chain is skipped. The broader test hides the narrower one.',
      },
      {
        q: 'What is printed?',
        code: 't = 35\nif t > 30:\n    print("hot")\nif t > 20:\n    print("warm")',
        options: ['hot', 'warm', 'hot then warm', 'Nothing'],
        answer: 2,
        explain: 'These are two independent `if` statements, so both conditions are checked and both blocks run. With `elif` only the first would.',
      },
      {
        q: "Which expression is equivalent to `not (a and b)` according to De Morgan's laws?",
        options: ['not a and not b', '(not a) or (not b)', 'a or b', 'not a or b'],
        answer: 1,
        explain: 'Negating an `and` flips it to `or` and negates each part.',
      },
      {
        q: 'What is `bool("0")`?',
        options: ['False, because 0 is falsy', 'True, because the string is not empty', 'It raises a ValueError', 'None'],
        answer: 1,
        explain: 'Only an empty string is falsy. `"0"` has a character in it, so it is truthy.',
      },
      {
        q: 'What does this print?',
        code: 'nickname = ""\nprint(nickname or "guest")',
        options: ['""', 'guest', 'True', 'Nothing'],
        answer: 1,
        explain: '`a or b` returns the first truthy operand. An empty string is falsy, so the fallback is returned.',
      },
      {
        q: 'What does this print?',
        code: 'd = 0\nprint(d != 0 and 10 / d > 1)',
        options: ['True', 'ZeroDivisionError', 'False', '0'],
        answer: 2,
        explain: '`d != 0` is False, so `and` short-circuits and `10 / d` is never evaluated.',
      },
      {
        q: 'Why is `if x == 1 or 2:` a bug?',
        options: [
          'It is a syntax error',
          '`2` is always truthy, so the condition is always true',
          '`or` cannot be used with numbers',
          'It checks x against 2 only',
        ],
        answer: 1,
        explain: 'It is read as `(x == 1) or 2`. Write `x == 1 or x == 2`, or `x in (1, 2)`.',
      },
    ],
  },

  project: {
    title: 'Ticket Pricing Engine',
    body: projectBody,
    interactive: true,
    stdin: '30\nyes\nweekday\n',
    starter: {
      python: `# Ticket pricing engine
# Put sample answers in the Input box (age, student, day), one per line.
age = int(input("Age: "))
student = input("Student (yes/no): ")
day = input("Day (weekday/weekend): ")

# 1. Decide category and base price from age


# 2. Apply the student discount


# 3. Apply the weekend surcharge


print("Category:", category)
print(f"Price: \${price:.2f}")
`,
      java: javaMain('// Checks run on Python. Try the same engine in Java if you like.'),
    },
    checks: `cases = [
    (["3", "no", "weekday"], "infant", "0.00"),
    (["3", "yes", "weekend"], "infant", "0.00"),
    (["4", "no", "weekday"], "infant", "0.00"),
    (["5", "no", "weekday"], "child", "8.00"),
    (["10", "no", "weekday"], "child", "8.00"),
    (["10", "yes", "weekend"], "child", "9.40"),
    (["12", "no", "weekday"], "child", "8.00"),
    (["13", "no", "weekday"], "adult", "15.00"),
    (["30", "yes", "weekday"], "adult", "12.00"),
    (["30", "no", "weekend"], "adult", "18.00"),
    (["64", "no", "weekday"], "adult", "15.00"),
    (["65", "no", "weekday"], "senior", "10.00"),
    (["70", "yes", "weekend"], "senior", "11.00"),
]
for vals, cat, price in cases:
    o = run_with_inputs(vals)
    ok = ("Category: " + cat) in o and ("Price: $" + price) in o
    label = "age " + vals[0] + ", student " + vals[1] + ", " + vals[2] + " -> " + cat + " $" + price
    tail = o.strip().replace(chr(10), " | ")[-70:]
    check(label, ok, "your output ended with: " + tail)`,
  },
};
