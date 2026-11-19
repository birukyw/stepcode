import b171 from './1.7.1.md?raw';
import b172 from './1.7.2.md?raw';
import b173 from './1.7.3.md?raw';
import b174 from './1.7.4.md?raw';
import b175 from './1.7.5.md?raw';
import b176 from './1.7.6.md?raw';
import b177 from './1.7.7.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '1.7.1': {
      body: b171,
      starter: {
        python: `def total_with_tax(prices, rate):
    total = 0
    for price in prices:
        total += price
        print("after adding", price, "total is", total)
        total * (1 + rate)
    return total


print(total_with_tax([10, 20, 30], 0.1))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        try {
            System.out.println(numbers[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }`),
      },
    },
    '1.7.2': {
      body: b172,
      starter: {
        python: `def to_int(text, default=0):
    try:
        return int(text)
    except ValueError:
        return default


print(to_int("42"), to_int("oops"), to_int("oops", default=-1))
`,
        java: javaClass(`    static int toInt(String text, int fallback) {
        try {
            return Integer.parseInt(text.trim());
        } catch (NumberFormatException e) {
            return fallback;
        }
    }

    public static void main(String[] args) {
        System.out.println(toInt("42", 0) + " " + toInt("oops", -1));
    }`),
      },
    },
    '1.7.3': {
      body: b173,
      starter: {
        python: `with open("notes.txt", "w") as f:
    f.write("Buy milk\\n")
    f.write("Learn Python\\n")

with open("notes.txt") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.strip())
`,
        java: javaClass(`    public static void main(String[] args) throws Exception {
        java.nio.file.Path path = java.nio.file.Path.of("notes.txt");
        java.nio.file.Files.writeString(path, "Buy milk\\nLearn Java\\n");
        System.out.println(java.nio.file.Files.readAllLines(path));
    }`),
      },
    },
    '1.7.4': {
      body: b174,
      starter: {
        python: `import json
import math
from collections import Counter

words = "the cat and the hat and the bat".split()
print(Counter(words).most_common(2))
print(math.hypot(3, 4))
print(json.dumps({"name": "Ada", "scores": [1, 2, 3]}))
`,
        java: javaClass(`    public static void main(String[] args) {
        System.out.println(Math.hypot(3, 4));
        System.out.println(java.time.LocalDate.of(2030, 1, 15).plusDays(30));
    }`),
      },
    },
    '1.7.5': {
      body: b175,
      starter: {
        python: `numbers = [1, 2, 3, 4, 5, 6]

print([n * n for n in numbers if n % 2 == 0])
print({n: n ** 3 for n in range(1, 4)})

names = ["Ada", "Linus", "Grace"]
scores = [95, 82, 99]
print(dict(zip(names, scores)))
print(max(zip(scores, names)))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.List<Integer> numbers = java.util.List.of(1, 2, 3, 4, 5, 6);
        var evenSquares = numbers.stream().filter(n -> n % 2 == 0).map(n -> n * n).toList();
        System.out.println(evenSquares);
    }`),
      },
    },
    '1.7.6': {
      body: b176,
      starter: {
        python: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("insufficient funds")
        self.balance -= amount

    def __str__(self):
        return self.owner + " has $" + str(self.balance)


acct = BankAccount("Ada", 100)
acct.deposit(50)
print(acct)
`,
        java: javaClass(`    static class BankAccount {
        String owner;
        int balance;

        BankAccount(String owner, int balance) {
            this.owner = owner;
            this.balance = balance;
        }

        void deposit(int amount) {
            if (amount <= 0) throw new IllegalArgumentException("deposit must be positive");
            balance += amount;
        }
    }

    public static void main(String[] args) {
        BankAccount acct = new BankAccount("Ada", 100);
        acct.deposit(50);
        System.out.println(acct.owner + " has $" + acct.balance);
    }`),
      },
    },
    '1.7.7': {
      body: b177,
      starter: {
        python: `import sys


def add(a, b):
    return a + b


def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0


test_add()
print("all tests passed")
print("python", sys.version_info.major)
`,
        java: javaClass(`    public static void main(String[] args) {
        System.out.println("Run Java from a terminal with: java Main.java");
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Which part of a traceback should you read first?', ['The first line', 'The last line: the error type and message', 'The middle', 'None of it'], 1, 'The last line says what went wrong. The lines above show where and how you got there.'),
      q('Which error does `int("12abc")` raise?', ['TypeError', 'ValueError', 'NameError', 'SyntaxError'], 1, 'It is a string (right type) with unusable content (wrong value).'),
      q('What is the first step of debugging a wrong answer that raises no error?', ['Rewrite the function', 'Reproduce it with the smallest input and check the values as it runs', 'Add more code', 'Restart the computer'], 1, 'You need a reliable example and a look at the actual values before you can find where reality departs from your expectation.'),
      q('What does the `else` block of try/except do?', ['Runs when an error happened', 'Runs only when the try block raised nothing', 'Always runs', 'Is not allowed'], 1, '`else` is for code that should run only on success. `finally` is the one that always runs.'),
      q('Why is a bare `except: pass` a bad habit?', ['It is slow', 'It silently hides real bugs, including typos', 'It is a syntax error', 'It deletes the file'], 1, 'Catch the specific errors you expect and do something useful with them.'),
      q('What does `open("data.txt", "w")` do if `data.txt` already exists?', ['Appends to it', 'Erases it and starts fresh', 'Raises an error', 'Reads it'], 1, 'Mode "w" truncates the file. Use "a" to append and "r" to read.'),
      q('Why use `with open(...) as f:`?', ['It is faster', 'The file is closed automatically, even if an error occurs', 'It reads the file twice', 'It encrypts the file'], 1, 'The with block guarantees cleanup so files are not left open or half-written.'),
      q('What does `[n * n for n in nums if n % 2 == 0]` build?', ['Squares of all numbers', 'Squares of the even numbers only', 'The even numbers', 'A dictionary'], 1, 'The trailing `if` filters which items are kept, and the front part is applied to those kept.'),
      q('In a class, what is `self`?', ['A keyword for the class', 'The particular object the method is working on', 'A global variable', 'The constructor'], 1, 'Python passes the object as the first argument, so `acct.deposit(5)` runs `deposit(acct, 5)`.'),
      q('Why should you never name your own file `random.py`?', ['It is illegal', 'Python would import your file instead of the standard module', 'It runs slower', 'It deletes the standard library'], 1, 'The folder of the running script is searched first, so your file shadows the real module.'),
    ],
  },

  project: {
    title: 'Resilient Toolkit',
    body: projectBody,
    starter: {
      python: `import json
from collections import Counter


class ConfigError(Exception):
    pass


class InsufficientFunds(Exception):
    pass


def safe_int(text, default=0):
    pass


def parse_config(text):
    pass


def load_scores(path):
    pass


def save_scores(path, scores):
    pass


def top_words(text, n=3):
    pass


def group_by_length(words):
    pass


class BankAccount:
    def __init__(self, owner, balance=0):
        pass

    def deposit(self, amount):
        pass

    def withdraw(self, amount):
        pass

    def __str__(self):
        pass


def to_json_text(data):
    pass


def from_json_text(text, default=None):
    pass


def describe_call(func, *args):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import os, tempfile, json

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

check("safe_int", [call("safe_int", t) for t in ("42", " 7 ", "abc", "", "3.5", None)] == [42, 7, 0, 0, 0, 0] and call("safe_int", "x", -1) == -1, "try int(text), and return the default on ValueError or TypeError")

CE = ns.get("ConfigError")
check("ConfigError is an exception class", isinstance(CE, type) and issubclass(CE, Exception), "class ConfigError(Exception)")
cfg = "# settings\\nname = Ada\\n\\n  mode=fast  \\nurl = http://x.io/a=b\\n"
r = call("parse_config", cfg)
check("parse_config", r == {"name": "Ada", "mode": "fast", "url": "http://x.io/a=b"}, "skip blank lines and # comments, split on the FIRST '=', and strip spaces")
check("parse_config: the last duplicate wins", call("parse_config", "a = 1\\na = 2") == {"a": "2"}, "a dictionary assignment overwrites")
f = ns.get("parse_config")
msg = None
try:
    f("ok = 1\\nthis line is bad\\n")
except Exception as e:
    msg = (type(e), str(e))
check("parse_config raises ConfigError with the line number", isinstance(CE, type) and msg is not None and msg[0] is CE and msg[1] == "line 2: expected key = value", "raise ConfigError('line 2: expected key = value'). Count lines from 1")
msg2 = None
try:
    f(" = nothing")
except Exception as e:
    msg2 = type(e)
check("parse_config rejects an empty key", msg2 is CE, "a missing key is also a ConfigError")

tmp = tempfile.mkdtemp()
path = os.path.join(tmp, "scores.csv")
with open(path, "w") as fh:
    fh.write("ada,90\\nlinus,75\\n\\nbad line\\ngrace,abc\\nada,96\\nlinus,80,extra\\nzed,10\\n")
r = call("load_scores", path)
check("load_scores skips bad lines and keeps the best score", r == {"ada": 96, "linus": 75, "zed": 10}, "skip blank lines, lines without exactly 'name,digits', and keep the highest score per name")
check("load_scores on a missing file", call("load_scores", os.path.join(tmp, "nope.csv")) == {}, "catch FileNotFoundError and return {}")

out = os.path.join(tmp, "out.csv")
n = call("save_scores", out, {"ada": 96, "linus": 75, "grace": 99, "bob": 75})
text = open(out).read() if os.path.exists(out) else ""
check("save_scores", n == 4 and text == "grace,99\\nada,96\\nbob,75\\nlinus,75\\n", "highest score first, ties by name, one 'name,score' per line, and return the number of lines")
check("save_scores and load_scores round trip", call("load_scores", out) == {"grace": 99, "ada": 96, "bob": 75, "linus": 75}, "what you save you must be able to load")

sample = "The cat and the hat. The BAT, the cat! And a rat's hat?"
check("top_words", call("top_words", sample, 3) == [("the", 4), ("and", 2), ("cat", 2)] and call("top_words", "", 3) == [] and call("top_words", "b a b a c", 2) == [("a", 2), ("b", 2)], "lowercase, treat non-letters as separators, Counter, and sort by count (high first) then word")
check("top_words default n is 3", len(call("top_words", "a b c d e f g")) == 3, "def top_words(text, n=3)")

check("group_by_length", call("group_by_length", ["tea", "cat", "dog", "bird", "cat", "a"]) == {3: ["cat", "dog", "tea"], 4: ["bird"], 1: ["a"]} and call("group_by_length", []) == {}, "a dictionary comprehension (or loop): length to a sorted list of unique words")

B = ns.get("BankAccount")
IF = ns.get("InsufficientFunds")
check("InsufficientFunds is an exception class", isinstance(IF, type) and issubclass(IF, Exception), "class InsufficientFunds(Exception)")
if callable(B):
    try:
        a = B("Ada", 100)
        a.deposit(50)
        a.withdraw(30)
        ok1 = a.balance == 120 and str(a) == "Ada: $120" and B("Bo").balance == 0
    except Exception:
        ok1 = False
    check("BankAccount deposit, withdraw and __str__", ok1, "self.balance changes, and __str__ returns 'Ada: $120'")
    outcomes = []
    for action, amount in (("deposit", 0), ("deposit", -5), ("withdraw", 500), ("withdraw", 0)):
        acct = B("Ada", 100)
        try:
            getattr(acct, action)(amount)
            outcomes.append(("none", acct.balance))
        except Exception as e:
            outcomes.append((type(e).__name__, acct.balance))
    check("BankAccount guards its balance", outcomes == [("ValueError", 100), ("ValueError", 100), ("InsufficientFunds", 100), ("ValueError", 100)], "deposits and withdrawals must be positive (ValueError). Withdrawing more than the balance raises InsufficientFunds. The balance must not change")
    try:
        B("Ada", -5)
        neg = "none"
    except Exception as e:
        neg = type(e).__name__
    check("BankAccount rejects a negative opening balance", neg == "ValueError", "raise ValueError in __init__")
    a1, a2 = B("A", 10), B("B", 10)
    a1.deposit(5)
    check("BankAccounts keep separate state", a1.balance == 15 and a2.balance == 10, "store data on self, not on the class")
else:
    check("BankAccount", False, "define class BankAccount")

data = {"b": [1, 2], "a": {"x": None, "y": True}}
t = call("to_json_text", data)
check("to_json_text", t == '{"a": {"x": null, "y": true}, "b": [1, 2]}', "json.dumps(data, sort_keys=True)")
check("from_json_text", call("from_json_text", t) == data and call("from_json_text", "{oops") is None and call("from_json_text", "{oops", {}) == {} and call("from_json_text", "[1, 2]") == [1, 2], "json.loads, and return the default if the text is not valid JSON (json.JSONDecodeError)")

check("describe_call", [call("describe_call", *a) for a in ((int, "12"), (int, "x"), (len, 5), (lambda d: d["k"], {}), (lambda x: 1 / x, 0))] == ["ok: 12", "ValueError: invalid literal for int() with base 10: 'x'", "TypeError: object of type 'int' has no len()", "KeyError: 'k'", "ZeroDivisionError: division by zero"], "try: return 'ok: ' + repr(result). except Exception as err: return type(err).__name__ + ': ' + str(err)")`,
  },
};
