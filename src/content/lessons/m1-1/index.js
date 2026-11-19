import b111 from './1.1.1.md?raw';
import b112 from './1.1.2.md?raw';
import b113 from './1.1.3.md?raw';
import b114 from './1.1.4.md?raw';
import b115 from './1.1.5.md?raw';
import projectBody from './project.md?raw';

const javaMain = (body) => `public class Main {
    public static void main(String[] args) {
${body.split('\n').map((l) => (l ? '        ' + l : l)).join('\n')}
    }
}
`;

export default {
  lessons: {
    '1.1.1': {
      body: b111,
      starter: {
        python: `# Predict the output before you press Run.
print("Boot sequence started")
print("Loading modules")
print("Ready")
`,
        java: javaMain(`System.out.println("Boot sequence started");
System.out.println("Loading modules");
System.out.println("Ready");`),
      },
    },
    '1.1.2': {
      body: b112,
      starter: {
        python: `score = 10
bonus = score
score = 25

print(score)
print(bonus)
`,
        java: javaMain(`int score = 10;
int bonus = score;
score = 25;

System.out.println(score);
System.out.println(bonus);`),
      },
    },
    '1.1.3': {
      body: b113,
      starter: {
        python: `total_minutes = 197

hours = total_minutes // 60
minutes = total_minutes % 60

print(hours, "hours and", minutes, "minutes")
`,
        java: javaMain(`int totalMinutes = 197;

int hours = totalMinutes / 60;
int minutes = totalMinutes % 60;

System.out.println(hours + " hours and " + minutes + " minutes");`),
      },
    },
    '1.1.4': {
      body: b114,
      starter: {
        python: `passenger = "Ada Lovelace"
flight = "PY101"
gate = 12

print("=" * 30)
print(f"Passenger: {passenger}")
print(f"Flight:    {flight}")
print(f"Gate:      {gate}")
print("=" * 30)
`,
        java: javaMain(`String passenger = "Ada Lovelace";
String flight = "PY101";
int gate = 12;

System.out.println("=".repeat(30));
System.out.println("Passenger: " + passenger);
System.out.println("Flight:    " + flight);
System.out.println("Gate:      " + gate);
System.out.println("=".repeat(30));`),
      },
    },
    '1.1.5': {
      body: b115,
      stdin: '15\n20\n',
      starter: {
        python: `# Put 15 and 20 (one per line) in the Input box under the terminal.
first = input("First number: ")
second = input("Second number: ")

print(first + second)
`,
        java: javaMain(`java.util.Scanner in = new java.util.Scanner(System.in);
System.out.print("First number: ");
int first = in.nextInt();
System.out.print("Second number: ");
int second = in.nextInt();

System.out.println(first + second);`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'What does this program print?',
        code: 'print("A")\nprint("B")\nprint("C")',
        options: ['A B C on one line', 'A, B and C on separate lines, in that order', 'C, B, A on separate lines', 'Nothing, because there is no variable'],
        answer: 1,
        explain: 'Python runs statements from top to bottom, and each print() ends with a new line.',
      },
      {
        q: 'After this code runs, what is printed?',
        code: 'a = 5\nb = a\na = 9\nprint(b)',
        options: ['9', '5', '14', 'An error'],
        answer: 1,
        explain: '`b = a` attaches a second name to the value 5. Moving `a` to 9 does not move `b`.',
      },
      {
        q: 'What is the value of `197 % 60`?',
        options: ['3', '17', '137', '3.28'],
        answer: 1,
        explain: '197 = 3 * 60 + 17, so `197 // 60` is 3 and `197 % 60` is the remainder, 17.',
      },
      {
        q: 'What does `print(10 / 2)` output?',
        options: ['5', '5.0', '5.00', '2'],
        answer: 1,
        explain: 'The `/` operator always returns a float, even when the result is a whole number.',
      },
      {
        q: 'What is `-7 // 2`?',
        options: ['-3', '-3.5', '-4', '3'],
        answer: 2,
        explain: '`//` rounds down toward negative infinity. The exact answer is -3.5, which rounds down to -4.',
      },
      {
        q: 'What does this print?',
        code: 'print("15" + "20")',
        options: ['35', '1520', '"15" + "20"', 'A TypeError'],
        answer: 1,
        explain: 'Both values are strings, so `+` joins them. Convert with `int()` first if you want to add numbers.',
      },
      {
        q: 'What does `f"{3.14159:.2f}"` produce?',
        options: ['3.14159', '3.1', '3.14', '3.15'],
        answer: 2,
        explain: '`.2f` formats a float with exactly two decimal places.',
      },
      {
        q: 'A user types `42` at `x = input("Number: ")`. What is `type(x)`?',
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
        answer: 2,
        explain: '`input()` always returns a string. Convert it with `int()` or `float()` before doing arithmetic.',
      },
      {
        q: 'Which line raises a NameError?',
        options: ['x = 10\nprint(x)', 'print(total)\ntotal = 10', 'total = 10\nprint(total)', 'name = "Ada"\nprint(name)'],
        answer: 1,
        explain: 'Python runs top to bottom, so `total` is used on line 1 before it exists.',
      },
      {
        q: 'What is `int(7.9)`?',
        options: ['8', '7', '7.9', '7.0'],
        answer: 1,
        explain: '`int()` cuts off the decimals. It truncates and does not round.',
      },
    ],
  },

  project: {
    title: 'Trip Receipt',
    body: projectBody,
    starter: {
      python: `trip_seconds = 98765      # time on the road
distance_km = 412.6
fuel_price = 1.84         # price per litre
consumption = 6.5         # litres used per 100 km
passengers = 3

# 1. Split trip_seconds into hours, minutes and seconds


# 2. Build the duration text, for example "27h 26m 05s"


# 3. Fuel used, fuel cost (2 decimals) and cost per passenger (2 decimals)


# 4. Print the receipt

`,
      java: javaMain('// Checks run on Python. Try the same receipt in Java if you like.'),
    },
    checks: `check("trip_seconds is still 98765", ns.get("trip_seconds") == 98765, "keep the starting data as it is")
check("hours is 27", ns.get("hours") == 27, "use // 3600")
check("minutes is 26", ns.get("minutes") == 26, "take the remainder after the hours, then // 60")
check("seconds is 5", ns.get("seconds") == 5, "trip_seconds % 60")
check("duration is '27h 26m 05s'", ns.get("duration") == "27h 26m 05s", "use {minutes:02d} to pad with zeros")
check("fuel_litres is about 26.819", close(ns.get("fuel_litres", 0), 26.819, 0.001), "distance_km * consumption / 100")
check("fuel_cost is 49.35", ns.get("fuel_cost") == 49.35, "round(fuel_litres * fuel_price, 2)")
check("cost_each is 16.45", ns.get("cost_each") == 16.45, "round(fuel_cost / passengers, 2)")
check("receipt has the title line", "TRIP RECEIPT\\n============\\n" in out, "print TRIP RECEIPT then 12 equals signs")
check("receipt duration line", "Duration : 27h 26m 05s" in out, "check spacing around the colon")
check("receipt distance line", "Distance : 412.6 km" in out, "")
check("receipt fuel line", "Fuel     : 26.82 L" in out, "two decimals")
check("receipt total line", "Total    : $49.35" in out, "")
check("receipt per-person line", "Each (3) : $16.45" in out, "")`,
  },
};
