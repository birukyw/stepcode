import b151 from './1.5.1.md?raw';
import b152 from './1.5.2.md?raw';
import b153 from './1.5.3.md?raw';
import b154 from './1.5.4.md?raw';
import b155 from './1.5.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;

export default {
  lessons: {
    '1.5.1': {
      body: b151,
      starter: {
        python: `def damage(power):
    """Return the damage for a weapon with the given power."""
    return power * 2 + 5

print("Sword hit:", damage(12))
print("Axe hit:", damage(15))
print("Bow hit:", damage(9))
`,
        java: javaClass(`    static int damage(int power) {
        return power * 2 + 5;
    }

    public static void main(String[] args) {
        System.out.println("Sword hit: " + damage(12));
        System.out.println("Axe hit: " + damage(15));
        System.out.println("Bow hit: " + damage(9));
    }`),
      },
    },
    '1.5.2': {
      body: b152,
      starter: {
        python: `def add_print(a, b):
    print(a + b)

def add_return(a, b):
    return a + b

result = add_return(2, 3)
print(result * 10)

broken = add_print(2, 3)
print(broken)
`,
        java: javaClass(`    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int result = add(2, 3);
        System.out.println(result * 10);
    }`),
      },
    },
    '1.5.3': {
      body: b153,
      starter: {
        python: `x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()
    print(x)

outer()
print(x)
`,
        java: javaClass(`    static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
    }`),
      },
    },
    '1.5.4': {
      body: b154,
      starter: {
        python: `def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))
print(add_item("banana"))   # surprise! fix it with items=None
`,
        java: javaClass(`    static String greet(String name) {
        return greet(name, "Hello");
    }

    static String greet(String name, String greeting) {
        return greeting + ", " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(greet("Ada"));
        System.out.println(greet("Ada", "Welcome back"));
    }`),
      },
    },
    '1.5.5': {
      body: b155,
      starter: {
        python: `def top_three(scores):
    scores.sort(reverse=True)
    return scores[:3]

tournament = [52, 91, 77, 64, 88]
best = top_three(tournament)

print(best)
print(tournament)   # was the original changed? make top_three pure
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.List<Integer> tournament = new java.util.ArrayList<>(java.util.List.of(52, 91, 77, 64, 88));
        java.util.List<Integer> sorted = new java.util.ArrayList<>(tournament);
        sorted.sort(java.util.Collections.reverseOrder());
        System.out.println(sorted.subList(0, 3));
        System.out.println(tournament);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'In `def area(width, height):`, what are `width` and `height`?',
        options: ['Arguments', 'Parameters', 'Return values', 'Global variables'],
        answer: 1,
        explain: 'Names in the definition are parameters. The values passed in a call, such as `area(3, 4)`, are arguments.',
      },
      {
        q: 'What does this print?',
        code: 'def f():\n    x = 5\n\nprint(f())',
        options: ['5', 'None', 'x', 'An error'],
        answer: 1,
        explain: 'The function has no `return`, so it returns `None`.',
      },
      {
        q: 'What does this print?',
        code: 'def add(a, b):\n    print(a + b)\n\nresult = add(2, 3)\nprint(result)',
        options: ['5 then 5', '5 then None', 'None then 5', 'Only 5'],
        answer: 1,
        explain: 'The function prints 5, then returns None, which is what `result` holds.',
      },
      {
        q: 'What does `double(add_one(3))` return if `double(n)` returns `n * 2` and `add_one(n)` returns `n + 1`?',
        options: ['7', '8', '6', '4'],
        answer: 1,
        explain: 'The inner call runs first: add_one(3) is 4, then double(4) is 8.',
      },
      {
        q: 'What happens when this runs?',
        code: 'count = 0\n\ndef increment():\n    count = count + 1\n\nincrement()',
        options: ['count becomes 1', 'UnboundLocalError', 'NameError', 'Nothing'],
        answer: 1,
        explain: 'Assigning to `count` inside the function makes it local everywhere in that function, so the right-hand side reads it before it has a value.',
      },
      {
        q: 'In what order does Python look up a name?',
        options: ['Global, Local, Built-in, Enclosing', 'Local, Enclosing, Global, Built-in', 'Built-in, Global, Enclosing, Local', 'Local, Global only'],
        answer: 1,
        explain: 'LEGB: Local, then Enclosing, then Global, then Built-in. The first match wins.',
      },
      {
        q: 'What is printed by the second call?',
        code: 'def add_item(item, items=[]):\n    items.append(item)\n    return items\n\nadd_item("a")\nprint(add_item("b"))',
        options: ["['b']", "['a', 'b']", "['a']", 'An error'],
        answer: 1,
        explain: 'The default list is created once and shared between calls. Use `items=None` and create the list inside.',
      },
      {
        q: 'Which signature makes `currency` keyword-only?',
        options: ['def f(amount, currency="$")', 'def f(amount, *, currency="$")', 'def f(*amount, currency)', 'def f(currency="$", amount)'],
        answer: 1,
        explain: 'Everything after a bare `*` must be passed by name.',
      },
      {
        q: 'What does `def total(*numbers)` receive when called as `total(1, 2, 3)`?',
        options: ['A list [1, 2, 3]', 'A tuple (1, 2, 3)', 'Three separate variables', 'A dictionary'],
        answer: 1,
        explain: '`*args` collects extra positional arguments into a tuple.',
      },
      {
        q: 'Which function is pure?',
        options: [
          'def f(xs): xs.sort(); return xs',
          'def f(xs): return sorted(xs)',
          'def f(xs): print(xs)',
          'def f(xs): global total; total += 1',
        ],
        answer: 1,
        explain: '`sorted` returns a new list and changes nothing else. The others mutate the argument, print, or change a global.',
      },
    ],
  },

  project: {
    title: 'Function Toolkit',
    body: projectBody,
    starter: {
      python: `def clamp(value, low, high):
    pass


def average(numbers):
    pass


def is_palindrome(text):
    pass


def fizzbuzz(n):
    pass


def top_n(scores, n=3):
    pass


def add_tag(tag, tags=None):
    pass


def format_money(amount, *, currency="$"):
    pass


# Try your functions here
print(clamp(15, 0, 10))
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same functions in Java if you like.\n    }'),
    },
    checks: `def call(name, *a, **k):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a, **k)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

check("clamp keeps values in range", call("clamp", 5, 0, 10) == 5 and call("clamp", -3, 0, 10) == 0 and call("clamp", 42, 0, 10) == 10, "return low, high or the value itself")
check("clamp at the boundaries", call("clamp", 0, 0, 10) == 0 and call("clamp", 10, 0, 10) == 10, "")
check("average of a list", call("average", [2, 4, 9]) == 5.0, "sum(numbers) / len(numbers)")
check("average of an empty list is 0.0", call("average", []) == 0.0, "return 0.0 early when the list is empty")
check("palindrome with punctuation", call("is_palindrome", "A man, a plan, a canal: Panama") is True, "keep only letters, lowercase, compare with the reverse")
check("non-palindrome", call("is_palindrome", "python") is False, "")
check("fizzbuzz", [call("fizzbuzz", n) for n in (3, 5, 15, 7, 30, 1)] == ["Fizz", "Buzz", "FizzBuzz", "7", "FizzBuzz", "1"], "test 15 first, and return str(n) otherwise")
data = [52, 91, 77, 64, 88]
check("top_n default of 3", call("top_n", data) == [91, 88, 77], "sorted(scores, reverse=True)[:n]")
check("top_n with n=2", call("top_n", [5, 1, 9], 2) == [9, 5], "")
check("top_n leaves the input alone", data == [52, 91, 77, 64, 88], "do not call .sort() on the argument")
first = call("add_tag", "a")
second = call("add_tag", "b")
check("add_tag starts fresh each call", first == ["a"] and second == ["b"], "use tags=None, not tags=[]")
mine = ["x"]
result = call("add_tag", "y", mine)
check("add_tag with a list returns a new list", result == ["x", "y"] and mine == ["x"], "return tags + [tag]")
check("format_money default", call("format_money", 1234.5) == "$1,234.50", "f'{currency}{amount:,.2f}'")
check("format_money with currency", call("format_money", 3, currency="EUR ") == "EUR 3.00", "")
check("currency is keyword-only", str(call("format_money", 3, "EUR ")).startswith("<TypeError"), "put a bare * before currency")`,
  },
};
