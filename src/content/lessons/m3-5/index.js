import b351 from './3.5.1.md?raw';
import b352 from './3.5.2.md?raw';
import b353 from './3.5.3.md?raw';
import b354 from './3.5.4.md?raw';
import b355 from './3.5.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '3.5.1': {
      body: b351,
      starter: {
        python: `from collections.abc import Sequence
from typing import Protocol, TypeVar

T = TypeVar("T")


def first(items: Sequence[T]) -> T | None:
    return items[0] if items else None


class Speaker(Protocol):
    def speak(self) -> str: ...


class Dog:
    def speak(self) -> str:
        return "Woof"


def announce(thing: Speaker) -> str:
    return thing.speak()


print(first([10, 20]), first([]), announce(Dog()))
print(first.__annotations__)
`,
        java: javaClass(`    static <T> T first(java.util.List<T> items) {
        return items.isEmpty() ? null : items.get(0);
    }

    public static void main(String[] args) {
        Integer n = first(java.util.List.of(10, 20));
        String s = first(java.util.List.of("a"));
        System.out.println(n + " " + s);
    }`),
      },
    },
    '3.5.2': {
      body: b352,
      starter: {
        python: `import io
import unittest


def is_leap_year(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)


class TestLeapYear(unittest.TestCase):
    def test_known_years(self):
        for year, expected in [(2024, True), (2023, False), (1900, False), (2000, True)]:
            with self.subTest(year=year):
                self.assertEqual(is_leap_year(year), expected)


result = unittest.TextTestRunner(stream=io.StringIO()).run(unittest.defaultTestLoader.loadTestsFromTestCase(TestLeapYear))
print(result.testsRun, result.wasSuccessful())
`,
        java: javaClass(`    static boolean isLeapYear(int year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    public static void main(String[] args) {
        int[][] cases = {{2024, 1}, {2023, 0}, {1900, 0}, {2000, 1}};
        for (int[] c : cases) {
            System.out.println(c[0] + " " + (isLeapYear(c[0]) == (c[1] == 1) ? "ok" : "FAIL"));
        }
    }`),
      },
    },
    '3.5.3': {
      body: b353,
      starter: {
        python: `from unittest.mock import Mock


def charge_with_retry(gateway, amount, attempts=3):
    for attempt in range(1, attempts + 1):
        try:
            return gateway.charge(amount)
        except ConnectionError:
            if attempt == attempts:
                raise


gateway = Mock()
gateway.charge.side_effect = [ConnectionError(), ConnectionError(), "paid"]
print(charge_with_retry(gateway, 50), gateway.charge.call_count)
gateway.charge.assert_called_with(50)
`,
        java: javaClass(`    interface Gateway { String charge(int amount); }

    public static void main(String[] args) {
        int[] calls = {0};
        Gateway fake = amount -> {
            calls[0]++;
            return calls[0] < 3 ? "fail" : "paid";
        };
        String result = "";
        for (int i = 0; i < 3; i++) result = fake.charge(50);
        System.out.println(result + " after " + calls[0] + " calls");
    }`),
      },
    },
    '3.5.4': {
      body: b354,
      starter: {
        python: `import os


def load_config(env=None):
    env = os.environ if env is None else env
    return {
        "debug": env.get("APP_DEBUG", "0") == "1",
        "port": int(env.get("APP_PORT", "8000")),
    }


def parse(version):
    return tuple(int(part) for part in version.split("."))


print(load_config({}))
print(load_config({"APP_DEBUG": "1", "APP_PORT": "9000"}))
print(parse("1.10.0") > parse("1.9.0"))
`,
        java: javaClass(`    public static void main(String[] args) {
        String port = System.getenv().getOrDefault("APP_PORT", "8000");
        System.out.println("port " + port);
    }`),
      },
    },
    '3.5.5': {
      body: b355,
      starter: {
        python: `import sys
import tracemalloc


class Plain:
    def __init__(self, x, y):
        self.x, self.y = x, y


class Slotted:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y


def memory_of(cls, n=20_000):
    tracemalloc.start()
    objects = [cls(i, i) for i in range(n)]
    current, _ = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return current


print("slotted uses less:", memory_of(Slotted) < memory_of(Plain))
obj = object()
print(sys.getrefcount(obj) >= 2)
`,
        java: javaClass(`    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        long before = rt.totalMemory() - rt.freeMemory();
        int[] data = new int[1_000_000];
        long after = rt.totalMemory() - rt.freeMemory();
        System.out.println(data.length + " ints allocated: " + (after >= before));
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('What does Python do with type hints when it runs your program?', ['Enforces them and raises errors', 'Ignores them. A separate tool such as mypy checks them', 'Converts values to the hinted type', 'Refuses to start if they are wrong'], 1, 'Hints are metadata. Checkers, editors and some libraries (pydantic, FastAPI) read them.'),
      q('What does `int | None` tell a type checker?', ['The value is always an int', 'The value is an int or None, so you must handle None before using it as an int', 'The value is a string', 'The function is slow'], 1, 'After an `is None` check the checker narrows the type to int.'),
      q('What is a typing.Protocol?', ['A network protocol', 'A description of the methods an object must have, satisfied by shape without inheritance', 'A kind of dataclass', 'A decorator'], 1, 'Structural typing: any class with the right methods qualifies.'),
      q('In a unittest TestCase, what does `setUp` do?', ['Runs once at the start of the program', 'Runs before each test to build a fresh state', 'Skips tests', 'Installs packages'], 1, 'A fresh state per test keeps tests independent of each other and of their order.'),
      q('Why is `assertEqual(0.1 + 0.2, 0.3)` a bad test?', ['It is too short', 'Floating-point sums are not exact, so use assertAlmostEqual', 'assertEqual only takes strings', 'It always passes'], 1, 'Binary floating point cannot represent 0.1 exactly, so the sum is slightly off.'),
      q('What is the best way to make a function that reads the clock testable?', ['Wait until the right time', 'Pass the clock in as a parameter and give tests a fake one', 'Delete the test', 'Use a global variable'], 1, 'Dependency injection makes time deterministic.'),
      q('What does `Mock(spec=Mailer)` protect you from?', ['Slow tests', 'Typos and calls to attributes the real class does not have', 'Network errors', 'Memory leaks'], 1, 'A plain Mock accepts anything, so typos pass silently. spec limits it to the real shape.'),
      q('Where should you patch a name that module `app` imported with `from time import time`?', ['`time.time`', '`app.time`, the name where it is used', 'Anywhere', 'You cannot patch it'], 1, 'The importing module holds its own reference, so patch it there.'),
      q('How does CPython free an object whose reference count reaches zero?', ['At the next garbage collection', 'Immediately', 'At program exit only', 'Never'], 1, 'Reference counting frees most objects the instant they become unreachable. The cyclic collector handles cycles.'),
      q('What is the right order of work when a program is too slow?', ['Guess and rewrite', 'Measure with a profiler, fix the hot spot (usually the algorithm), measure again', 'Add threads', 'Buy a bigger computer'], 1, 'Programmers are bad at guessing where time goes. Profile first.'),
    ],
  },

  project: {
    title: 'Quality Lab',
    body: projectBody,
    starter: {
      python: `import importlib
import re
import sys
import time
import tracemalloc
from collections.abc import Iterable, Sequence
from pathlib import Path
from typing import Protocol, TypedDict, TypeVar, runtime_checkable


def clamp(value, low, high):
    pass


def first_or_none(items):
    pass


class SupportsArea:
    pass


def total_area(shapes):
    pass


class UserRecord:
    pass


def validate_user(data):
    pass


def leap_year_cases():
    pass


def slugify_cases():
    pass


def send_reminders(tasks, sender, clock):
    pass


def make_package(root, name, files):
    pass


def load_package(root, name):
    pass


def peak_memory(func):
    pass


def best_time(func, repeat=5):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import re as _re
import sys as _sys
import tempfile
import typing
from pathlib import Path as _Path
from unittest.mock import Mock

def attempt(fn, default="<error>"):
    try:
        return fn()
    except Exception:
        return default

def raises(fn, kind=Exception):
    try:
        fn()
        return False
    except kind:
        return True
    except Exception:
        return False

cl = ns.get("clamp")
if callable(cl):
    check("clamp works", attempt(lambda: [cl(5, 0, 10), cl(-3, 0, 10), cl(99, 0, 10), cl(0, 0, 10), cl(10, 0, 10), cl(2.5, 1, 2)]) == [5, 0, 10, 0, 10, 2], "max(low, min(value, high))")
    check("clamp rejects an inverted range", raises(lambda: cl(1, 10, 0), ValueError), "raise ValueError when low > high")
    check("clamp has the right type hints", attempt(lambda: typing.get_type_hints(cl)) == {"value": float, "low": float, "high": float, "return": float}, "def clamp(value: float, low: float, high: float) -> float")
else:
    check("clamp", False, "define clamp")

fo = ns.get("first_or_none")
if callable(fo):
    check("first_or_none works", attempt(lambda: (fo([3, 4]), fo([]), fo("abc"), fo(""), fo((None, 1)))) == (3, None, "a", None, None), "return items[0] if the sequence has items, else None")
    def hints():
        h = typing.get_type_hints(fo)
        ret_args = typing.get_args(h["return"])
        param_origin = typing.get_origin(h["items"])
        return (type(None) in ret_args, any(isinstance(a, typing.TypeVar) for a in ret_args), param_origin is not None and param_origin.__name__ == "Sequence", any(isinstance(a, typing.TypeVar) for a in typing.get_args(h["items"])))
    check("first_or_none is generic", attempt(hints) == (True, True, True, True), "items: Sequence[T] and -> T | None, with T = TypeVar('T')")
else:
    check("first_or_none", False, "define first_or_none")

SA, ta = ns.get("SupportsArea"), ns.get("total_area")
if isinstance(SA, type) and callable(ta):
    class Sq:
        def __init__(self, s): self.s = s
        def area(self): return self.s * self.s
    class Rock:
        pass
    check("SupportsArea is a runtime-checkable Protocol", attempt(lambda: isinstance(Sq(2), SA) and not isinstance(Rock(), SA) and getattr(SA, "_is_protocol", False)) is True, "class SupportsArea(Protocol) with @runtime_checkable and an area method")
    check("total_area sums any objects with area()", attempt(lambda: (ta([Sq(2), Sq(3)]), ta([]), ta(x for x in [Sq(1)]))) == (13, 0, 1), "no inheritance needed: duck typing made official")
    check("total_area has type hints", attempt(lambda: typing.get_type_hints(ta)["return"]) is float, "-> float")
else:
    check("SupportsArea and total_area", False, "define SupportsArea(Protocol) and total_area")

UR, vu = ns.get("UserRecord"), ns.get("validate_user")
if UR is not None and callable(vu):
    check("UserRecord is a TypedDict", attempt(lambda: typing.is_typeddict(UR) and UR.__annotations__ == {"name": str, "age": int}) is True, "class UserRecord(TypedDict): name: str, age: int")
    check("validate_user accepts good data", attempt(lambda: (vu({"name": "  Ada ", "age": 36, "extra": 1}), vu({"name": "Bo", "age": 0}), vu({"name": "Old", "age": 150}))) == ({"name": "Ada", "age": 36}, {"name": "Bo", "age": 0}, {"name": "Old", "age": 150}), "return a new dict with only name (stripped) and age")
    bad = [{"age": 3}, {"name": "x"}, {"name": "", "age": 3}, {"name": "  ", "age": 3}, {"name": 5, "age": 3}, {"name": "x", "age": "3"}, {"name": "x", "age": 3.5}, {"name": "x", "age": True}, {"name": "x", "age": -1}, {"name": "x", "age": 151}]
    check("validate_user rejects bad data with ValueError", all(raises(lambda d=d: vu(d), ValueError) for d in bad), "missing fields, empty names, non-int ages (including True) and ages outside 0 to 150")
    check("validate_user rejects non-dictionaries with TypeError", all(raises(lambda d=d: vu(d), TypeError) for d in ([], "x", None, 5)), "isinstance(data, dict) first")
else:
    check("UserRecord and validate_user", False, "define UserRecord and validate_user")

def leap_good(y): return (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
leap_bugs = {
    "forgot the century rule": lambda y: y % 4 == 0,
    "forgot that every 400th year is a leap year": lambda y: y % 4 == 0 and y % 100 != 0,
    "treated every 400th year as a non-leap year": lambda y: y % 4 == 0 and y % 400 != 0,
}
lc = ns.get("leap_year_cases")
cases = attempt(lambda: lc())
well_formed = isinstance(cases, list) and len(cases) >= 4 and all(isinstance(c, tuple) and len(c) == 2 and isinstance(c[0], int) and isinstance(c[1], bool) for c in cases)
check("leap_year_cases is a list of (year, bool) pairs", well_formed, "return [(2024, True), ...]")
if well_formed:
    check("leap_year_cases are all correct", all(leap_good(y) == e for y, e in cases), "check each expected value against the real rule")
    for label, bug in leap_bugs.items():
        check("leap_year_cases catches a bug: " + label, any(bug(y) != e for y, e in cases), "add a case where this bug gives the wrong answer")

import re as _slug_re
def slug_good(t): return _slug_re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
slug_bugs = {
    "forgot to lowercase": lambda t: _slug_re.sub(r"[^a-zA-Z0-9]+", "-", t).strip("-"),
    "forgot to trim the ends": lambda t: _slug_re.sub(r"[^a-z0-9]+", "-", t.lower()),
    "forgot to collapse repeated separators": lambda t: _slug_re.sub(r"[^a-z0-9]", "-", t.lower()).strip("-"),
    "kept punctuation and only replaced spaces": lambda t: t.lower().strip().replace(" ", "-"),
    "treated digits as separators": lambda t: _slug_re.sub(r"[^a-z]+", "-", t.lower()).strip("-"),
}
sc = ns.get("slugify_cases")
scases = attempt(lambda: sc())
swell = isinstance(scases, list) and len(scases) >= 4 and all(isinstance(c, tuple) and len(c) == 2 and all(isinstance(x, str) for x in c) for c in scases)
check("slugify_cases is a list of (text, slug) pairs", swell, "return [('Hello', 'hello'), ...]")
if swell:
    check("slugify_cases are all correct", all(slug_good(t) == e for t, e in scases), "compute each expected slug carefully")
    for label, bug in slug_bugs.items():
        check("slugify_cases catches a bug: " + label, any(bug(t) != e for t, e in scases), "add a case where this bug gives the wrong answer")

sr = ns.get("send_reminders")
if callable(sr):
    tasks = [
        {"title": "soon", "due": 1500},
        {"title": "later", "due": 5000},
        {"title": "overdue", "due": 900},
        {"title": "edge", "due": 4600},
        {"title": "done", "due": 1200, "done": True},
        {"title": "now", "due": 1000},
    ]
    def basic():
        sender, clock = Mock(), Mock(return_value=1000)
        n = sr(tasks, sender, clock)
        return n, [c.args[0] for c in sender.call_args_list], clock.call_count
    check("send_reminders", attempt(basic) == (3, ["Reminder: soon", "Reminder: edge", "Reminder: now"], 1), "now = clock() once, send when 0 <= due - now <= 3600, skip done tasks")
    def failing():
        calls = []
        def sender(msg):
            calls.append(msg)
            if "soon" in msg:
                raise ConnectionError("down")
        n = sr(tasks, sender, lambda: 1000)
        return n, calls
    check("send_reminders skips failures and carries on", attempt(failing) == (2, ["Reminder: soon", "Reminder: edge", "Reminder: now"]), "catch Exception around sender and do not count it")
    check("send_reminders with no tasks", attempt(lambda: sr([], Mock(), lambda: 0)) == 0, "an empty list sends nothing")
else:
    check("send_reminders", False, "define send_reminders(tasks, sender, clock)")

mp, lp = ns.get("make_package"), ns.get("load_package")
if callable(mp) and callable(lp):
    root = tempfile.mkdtemp()
    def build():
        folder = mp(root, "qualpkg_one", {"__init__.py": "from .tools import double\\n__all__ = ['double']\\n", "tools.py": "def double(n):\\n    return n * 2\\n"})
        return isinstance(folder, _Path) and folder.name == "qualpkg_one" and (folder / "tools.py").exists()
    check("make_package writes the files", attempt(build) is True, "mkdir the folder, then write each file")
    def default_init():
        folder = mp(root, "qualpkg_two", {"mod.py": "VALUE = 7\\n"})
        return (folder / "__init__.py").exists() and (folder / "__init__.py").read_text() == ""
    check("make_package adds an empty __init__.py when missing", attempt(default_init) is True, "create __init__.py if it was not provided")
    before = list(_sys.path)
    def loaded():
        m = lp(root, "qualpkg_one")
        return m.double(21), list(m.__all__)
    check("load_package imports the package", attempt(loaded) == (42, ["double"]), "put root on sys.path, import_module, take it off again")
    check("load_package restores sys.path", list(_sys.path) == before, "remove what you added, in a finally block")
    def sub():
        m = lp(root, "qualpkg_two")
        import importlib as _il
        return _il.import_module("qualpkg_two.mod").VALUE
    check("a loaded package can import its submodules", attempt(sub) == 7, "the package carries its own search path")
    def missing():
        before_inner = list(_sys.path)
        try:
            lp(root, "qualpkg_does_not_exist")
        except ImportError:
            return list(_sys.path) == before_inner
    check("load_package restores sys.path even when the import fails", attempt(missing) is True, "use try / finally")
else:
    check("make_package and load_package", False, "define both functions")

pm, bt = ns.get("peak_memory"), ns.get("best_time")
if callable(pm):
    small = attempt(lambda: pm(lambda: None))
    big = attempt(lambda: pm(lambda: [0] * 300000))
    check("peak_memory measures allocations", isinstance(small, int) and isinstance(big, int) and big > 1_000_000 and small < 100_000, "run func() under tracemalloc and read get_traced_memory()'s peak")
    import tracemalloc as _tm
    _tm.start()
    attempt(lambda: pm(lambda: [0] * 1000))
    still = _tm.is_tracing()
    _tm.stop()
    check("peak_memory leaves tracemalloc running if it was already on", still, "only stop tracemalloc if you started it")
else:
    check("peak_memory", False, "define peak_memory(func)")
if callable(bt):
    calls = []
    check("best_time runs the function repeat times", attempt(lambda: (bt(lambda: calls.append(1), repeat=4), len(calls))[1]) == 4, "loop repeat times")
    light = attempt(lambda: bt(lambda: sum(range(100)), repeat=5))
    heavy = attempt(lambda: bt(lambda: sum(range(2_000_000)), repeat=3))
    check("best_time returns the smallest duration", isinstance(light, float) and isinstance(heavy, float) and 0 <= light < heavy, "min() of the measured durations, using time.perf_counter()")
else:
    check("best_time", False, "define best_time(func, repeat=5)")`,
  },
};
