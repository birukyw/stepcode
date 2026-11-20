import b311 from './3.1.1.md?raw';
import b312 from './3.1.2.md?raw';
import b313 from './3.1.3.md?raw';
import b314 from './3.1.4.md?raw';
import b315 from './3.1.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '3.1.1': {
      body: b311,
      starter: {
        python: `orders = [
    {"customer": "ada", "total": 120.0, "status": "paid"},
    {"customer": "linus", "total": 35.5, "status": "paid"},
    {"customer": "ada", "total": 80.0, "status": "refunded"},
    {"customer": "grace", "total": 230.0, "status": "paid"},
]

paid = [o for o in orders if o["status"] == "paid"]
print(sum(o["total"] for o in paid))
print(sorted({o["customer"] for o in paid}))
`,
        java: javaClass(`    record Order(String customer, double total, String status) {}

    public static void main(String[] args) {
        var orders = java.util.List.of(new Order("ada", 120.0, "paid"), new Order("linus", 35.5, "paid"), new Order("ada", 80.0, "refunded"));
        double revenue = orders.stream().filter(o -> o.status().equals("paid")).mapToDouble(Order::total).sum();
        System.out.println(revenue);
    }`),
      },
    },
    '3.1.2': {
      body: b312,
      starter: {
        python: `from functools import partial


def power(base, exponent):
    return base ** exponent


square = partial(power, exponent=2)
print(square(9))

OPERATIONS = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}
print(OPERATIONS["*"](6, 7))
print(sorted(["pear", "Fig", "banana"], key=str.lower))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.function.Function<Integer, Integer> triple = n -> n * 3;
        java.util.function.BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        System.out.println(triple.apply(7) + " " + add.apply(2, 3));
    }`),
      },
    },
    '3.1.3': {
      body: b313,
      starter: {
        python: `from itertools import islice


def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


print(list(islice(fibonacci(), 10)))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.stream.Stream.iterate(new long[]{0, 1}, f -> new long[]{f[1], f[0] + f[1]})
            .limit(10).forEach(f -> System.out.print(f[0] + " "));
        System.out.println();
    }`),
      },
    },
    '3.1.4': {
      body: b314,
      starter: {
        python: `from itertools import accumulate, groupby, islice, count

print(list(accumulate([1, 2, 3, 4, 5])))
print([(char, len(list(group))) for char, group in groupby("AAABBBCCAA")])
print(list(islice(count(10, 5), 4)))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] values = {1, 2, 3, 4, 5};
        int running = 0;
        for (int v : values) {
            running += v;
            System.out.print(running + " ");
        }
        System.out.println();
    }`),
      },
    },
    '3.1.5': {
      body: b315,
      starter: {
        python: `from functools import wraps


def count_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0
    return wrapper


@count_calls
def greet(name):
    return "hi " + name


greet("a")
greet("b")
print(greet.calls, greet.__name__)
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] calls = {0};
        java.util.function.Function<String, String> greet = name -> {
            calls[0]++;
            return "hi " + name;
        };
        greet.apply("a");
        greet.apply("b");
        System.out.println(calls[0]);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('What does it mean that functions are "first-class" in Python?', ['They run faster', 'They are objects you can store, pass to functions and return', 'They cannot be changed', 'They must have a name'], 1, 'A function is a value like any other. You can put it in a list, pass it as an argument or return it.'),
      q('What is wrong with `sorted(words, key=len())`?', ['Nothing', 'It calls `len` with no argument instead of passing the function', 'sorted has no key', 'len is not a function'], 1, 'Write `key=len`. Parentheses call the function immediately instead of handing it over.'),
      q('Which tool turns a long comprehension into something readable?', ['A bigger one-liner', 'Small named functions chained as stages', 'Global variables', 'try/except'], 1, 'Named stages (parse, validate, convert) can be read and tested one by one.'),
      q('What does `next(it)` do when an iterator has no items left?', ['Returns None', 'Returns 0', 'Raises StopIteration', 'Restarts'], 2, 'The for loop catches StopIteration silently, which is how it knows to stop.'),
      q('What happens when you call a generator function like `countdown(3)`?', ['The body runs fully', 'It returns a generator object and the body has not run yet', 'It returns a list', 'It raises an error'], 1, 'The body runs a piece at a time as you call next(), pausing at each yield.'),
      q('Why is `sum(x * x for x in data)` better than `sum([x * x for x in data])` for huge data?', ['It is shorter', 'It builds no intermediate list, so memory stays tiny', 'It is more accurate', 'There is no difference'], 1, 'The generator expression produces one value at a time.'),
      q('What must you do before `itertools.groupby` if you want all equal keys together?', ['Nothing', 'Sort the data by that key', 'Convert to a set', 'Reverse it'], 1, 'groupby only merges consecutive items with the same key.'),
      q('What does `accumulate([1, 2, 3, 4])` produce?', ['10', '[1, 2, 3, 4]', '[1, 3, 6, 10]', '[24]'], 2, 'It yields every running total, not only the final one.'),
      q('Why do these lambdas all return 2? `[lambda: i for i in range(3)]`', ['A bug in Python', 'They share the variable i, which is 2 by the time they run (late binding)', 'range starts at 2', 'lambdas cannot see i'], 1, 'Closures capture the variable, not its value. Capture it with a default argument: `lambda i=i: i`.'),
      q('What does `@functools.wraps(func)` do inside a decorator?', ['Makes the function faster', 'Copies the original name and docstring onto the wrapper', 'Caches results', 'Runs the function twice'], 1, 'Without it the decorated function is named "wrapper" and loses its docstring.'),
    ],
  },

  project: {
    title: 'Pipeline Lab',
    body: projectBody,
    starter: {
      python: `import itertools
from functools import wraps


def pipeline(*funcs):
    pass


def clean_rows(rows):
    pass


def take(n, iterable):
    pass


def fib():
    pass


def chunked(iterable, size):
    pass


def running_totals(iterable):
    pass


def run_length_encode(text):
    pass


def run_length_decode(pairs):
    pass


def make_counter(start=0, step=1):
    pass


def call_counter(func):
    pass


def memoize(func):
    pass


def retry(times, exceptions=(Exception,)):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import inspect, itertools, random, time

def timed(fn, *a, limit=2.5):
    start = time.perf_counter()
    try:
        r = fn(*a)
    except Exception:
        return None, False
    return r, (time.perf_counter() - start) <= limit

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

P = ns.get("pipeline")
if callable(P):
    try:
        clean = P(str.strip, str.lower, len)
        ok1 = clean("  AbC ") == 3
        ok2 = P()(5) == 5
        ok3 = P(lambda n: n + 1, lambda n: n * 2)(5) == 12 and P(lambda n: n * 2, lambda n: n + 1)(5) == 11
        ok4 = P(str.upper)("a") == "A" and P(str.upper)("b") == "B"
    except Exception:
        ok1 = ok2 = ok3 = ok4 = False
    check("pipeline runs functions left to right", ok1 and ok3, "feed each function's result into the next: functools.reduce or a loop inside")
    check("pipeline with no functions returns the input", ok2, "an empty pipeline does nothing")
    check("pipeline can be reused", ok4, "the returned function must not keep state between calls")
else:
    check("pipeline", False, "define pipeline(*funcs)")

rows = ["ada, 90", " linus ,75", "oops", ",12", "bad,x", "grace , 88", "a,b,c", "zed,", "  ,  ", "KIM,100"]
check("clean_rows", call("clean_rows", rows) == [("Ada", 90), ("Linus", 75), ("Grace", 88), ("Kim", 100)], "exactly 'name,score', both stripped, a non-empty name and a digits-only score. Return (name.title(), int(score)) tuples")
check("clean_rows on nothing", call("clean_rows", []) == [], "an empty input gives an empty list")
big = ["user%d, %d" % (i, i % 100) if i % 7 else "broken line" for i in range(200000)]
r, ok = timed(ns.get("clean_rows"), big) if callable(ns.get("clean_rows")) else (None, False)
check("clean_rows on 200,000 rows", ok and isinstance(r, list) and len(r) == 200000 - len(range(0, 200000, 7)), "one pass, with no repeated work per row")

T = ns.get("take")
check("take", [call("take", 3, [1, 2, 3, 4, 5]), call("take", 10, "abc"), call("take", 0, [1, 2]), call("take", 2, iter(range(100)))] == [[1, 2, 3], ["a", "b", "c"], [], [0, 1]], "use itertools.islice and return a list")
check("take works on an endless stream", call("take", 3, itertools.count(5)) == [5, 6, 7], "never try to read the whole iterable")

F = ns.get("fib")
if callable(F):
    try:
        g = F()
        is_gen = inspect.isgenerator(g)
        first = [next(g) for _ in range(12)]
        h = F()
        second = [next(h) for _ in range(3)]
        far = next(itertools.islice(F(), 1000, 1001))
    except Exception:
        is_gen = False; first = second = far = None
    check("fib is a generator", is_gen, "use yield inside a loop that never ends")
    check("fib values", first == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] and second == [0, 1, 1], "start at 0, 1 and keep adding. Each call starts a fresh sequence")
    check("fib is lazy and fast", far is not None and len(str(far)) == 209, "the 1000th Fibonacci number has 209 digits")
else:
    check("fib", False, "define fib()")

C = ns.get("chunked")
if callable(C):
    try:
        isg = inspect.isgenerator(C([1, 2, 3], 2))
        a = list(C(range(7), 3))
        b = list(C([], 3))
        c = list(C("abcd", 1))
        endless = list(itertools.islice(C(itertools.count(), 3), 2))
    except Exception:
        isg = False; a = b = c = endless = None
    check("chunked is a generator", isg, "yield each chunk as a list as soon as it is full")
    check("chunked values", a == [[0, 1, 2], [3, 4, 5], [6]] and b == [] and c == [["a"], ["b"], ["c"], ["d"]], "the last chunk may be shorter, and an empty input gives nothing")
    check("chunked works on an endless stream", endless == [[0, 1, 2], [3, 4, 5]], "do not read the whole iterable before yielding")
else:
    check("chunked", False, "define chunked(iterable, size)")

R = ns.get("running_totals")
if callable(R):
    try:
        isg = inspect.isgenerator(R([1, 2]))
        a = list(R([1, 2, 3, 4]))
        b = list(R([]))
        endless = list(itertools.islice(R(itertools.count(1)), 5))
    except Exception:
        isg = False; a = b = endless = None
    check("running_totals is a generator", isg, "yield the running total after each item")
    check("running_totals values", a == [1, 3, 6, 10] and b == [], "[1, 2, 3, 4] gives [1, 3, 6, 10]")
    check("running_totals works on an endless stream", endless == [1, 3, 6, 10, 15], "stay lazy: one item in, one total out")
else:
    check("running_totals", False, "define running_totals(iterable)")

check("run_length_encode", call("run_length_encode", "AAABBBCCAA") == [("A", 3), ("B", 3), ("C", 2), ("A", 2)] and call("run_length_encode", "") == [] and call("run_length_encode", "x") == [("x", 1)], "itertools.groupby merges runs of neighbours")
check("run_length_decode", call("run_length_decode", [("A", 3), ("B", 2)]) == "AAABB" and call("run_length_decode", []) == "", "repeat each character by its count")
rnd = random.Random(8)
text = "".join(rnd.choice("ab") * rnd.randint(1, 5) for _ in range(60000))
enc, ok = timed(ns.get("run_length_encode"), text) if callable(ns.get("run_length_encode")) else (None, False)
check("run length round trip on a long text", ok and call("run_length_decode", enc) == text, "decode(encode(text)) must give the text back")

MC = ns.get("make_counter")
if callable(MC):
    try:
        a = MC(); b = MC(100, 10)
        r1 = [a(), a(), a()]
        r2 = [b(), b()]
        r3 = [a(), b()]
    except Exception:
        r1 = r2 = r3 = None
    check("make_counter", r1 == [1, 2, 3] and r2 == [110, 120], "an inner function with nonlocal, returning the new total after each call")
    check("make_counter counters are independent", r3 == [4, 130], "every call to make_counter gets its own remembered count")
else:
    check("make_counter", False, "define make_counter(start=0, step=1)")

CC = ns.get("call_counter")
if callable(CC):
    try:
        @CC
        def greet(name, punct="!"):
            """Say hi."""
            return "hi " + name + punct
        r = [greet("a"), greet("b", punct="?")]
        meta = (greet.__name__, greet.__doc__)
        calls = greet.calls
    except Exception:
        r = meta = calls = None
    check("call_counter keeps working", r == ["hi a!", "hi b?"], "pass *args and **kwargs through, and return the result")
    check("call_counter counts in .calls", calls == 2, "set wrapper.calls = 0 and add one per call")
    check("call_counter keeps the name and docstring", meta == ("greet", "Say hi."), "use functools.wraps(func)")
else:
    check("call_counter", False, "define call_counter(func)")

MZ = ns.get("memoize")
if callable(MZ):
    try:
        seen = []
        @MZ
        def add(a, b):
            seen.append((a, b))
            return a + b
        r = [add(1, 2), add(1, 2), add(2, 1), add(1, 2)]
        n_calls = len(seen)
        meta = add.__name__
        @MZ
        def fibm(n):
            return n if n < 2 else fibm(n - 1) + fibm(n - 2)
        start = time.perf_counter()
        big = fibm(300)
        fast = time.perf_counter() - start < 1.0
    except Exception:
        r = n_calls = meta = big = fast = None
    check("memoize results", r == [3, 3, 3, 3], "return the stored result for repeated arguments")
    check("memoize calls the function once per argument set", n_calls == 2, "(1, 2) and (2, 1) are different keys. Use args as the dictionary key")
    check("memoize fixes slow recursion", big == 222232244629420445529739893461909967206666939096499764990979600 and fast, "fib(300) is instant when each value is computed once")
    check("memoize keeps the name", meta == "add", "use functools.wraps(func)")
else:
    check("memoize", False, "define memoize(func)")

RT = ns.get("retry")
if callable(RT):
    state = {"n": 0}
    try:
        @RT(3, exceptions=(ConnectionError,))
        def flaky():
            state["n"] += 1
            if state["n"] < 3:
                raise ConnectionError("down")
            return "ok"
        r = flaky()
        tries = state["n"]
    except Exception:
        r = tries = None
    check("retry succeeds after failures", r == "ok" and tries == 3, "try again until the call works, up to the limit")
    try:
        cnt = {"n": 0}
        @RT(3)
        def never():
            cnt["n"] += 1
            raise ValueError("bad " + str(cnt["n"]))
        try:
            never()
            msg = "no error"
        except ValueError as e:
            msg = str(e)
        total = cnt["n"]
    except Exception:
        msg = total = None
    check("retry re-raises the last error", msg == "bad 3" and total == 3, "after the final attempt, raise the exception from that attempt")
    try:
        cnt2 = {"n": 0}
        @RT(5, exceptions=(KeyError,))
        def wrong_type():
            cnt2["n"] += 1
            raise ValueError("not retried")
        try:
            wrong_type()
        except ValueError:
            pass
        only_once = cnt2["n"] == 1
    except Exception:
        only_once = False
    check("retry only retries the listed exceptions", only_once, "catch only the exceptions you were given. Others pass straight through")
    try:
        @RT(2)
        def named():
            """doc"""
            return 1
        meta = (named.__name__, named.__doc__, named())
    except Exception:
        meta = None
    check("retry keeps the name and docstring", meta == ("named", "doc", 1), "three layers: retry(times), decorator(func), wrapper(...). Use functools.wraps")
else:
    check("retry", False, "define retry(times, exceptions=(Exception,))")`,
  },
};
