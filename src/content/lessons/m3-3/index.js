import b331 from './3.3.1.md?raw';
import b332 from './3.3.2.md?raw';
import b333 from './3.3.3.md?raw';
import b334 from './3.3.4.md?raw';
import b335 from './3.3.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '3.3.1': {
      body: b331,
      starter: {
        python: `class AppError(Exception):
    """Base class for every error this application raises on purpose."""


class NotFoundError(AppError):
    pass


class ConfigError(AppError):
    pass


def load_port(text):
    try:
        return int(text)
    except ValueError as err:
        raise ConfigError(f"invalid port {text!r}") from err


try:
    load_port("eighty")
except AppError as err:
    print(type(err).__name__, "-", err)
    print("caused by:", type(err.__cause__).__name__)
`,
        java: javaClass(`    static class AppException extends Exception {
        AppException(String message, Throwable cause) { super(message, cause); }
    }

    static int loadPort(String text) throws AppException {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            throw new AppException("invalid port " + text, e);
        }
    }

    public static void main(String[] args) {
        try {
            loadPort("eighty");
        } catch (AppException e) {
            System.out.println(e.getMessage() + " | cause: " + e.getCause().getClass().getSimpleName());
        }
    }`),
      },
    },
    '3.3.2': {
      body: b332,
      starter: {
        python: `from contextlib import contextmanager


@contextmanager
def announce(name):
    print("start", name)
    try:
        yield name.upper()
    finally:
        print("end", name)


with announce("job") as label:
    print("working on", label)

try:
    with announce("bad"):
        raise RuntimeError("fail")
except RuntimeError:
    print("error propagated")
`,
        java: javaClass(`    static class Resource implements AutoCloseable {
        Resource() { System.out.println("open"); }
        public void close() { System.out.println("close"); }
    }

    public static void main(String[] args) {
        try (Resource r = new Resource()) {
            System.out.println("using");
            throw new RuntimeException("fail");
        } catch (RuntimeException e) {
            System.out.println("caught " + e.getMessage());
        }
    }`),
      },
    },
    '3.3.3': {
      body: b333,
      starter: {
        python: `import json
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp)
    folder = root / "reports" / "2030"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "q1.txt").write_text("revenue: 100\\n")
    (folder / "data.json").write_text(json.dumps({"count": 7}))

    print(sorted(p.name for p in folder.iterdir()))
    print(json.loads((folder / "data.json").read_text()))
    print((folder / "q1.txt").read_text().strip())
`,
        java: javaClass(`    public static void main(String[] args) throws Exception {
        java.nio.file.Path dir = java.nio.file.Files.createTempDirectory("demo");
        java.nio.file.Path file = dir.resolve("q1.txt");
        java.nio.file.Files.writeString(file, "revenue: 100\\n");
        System.out.println(java.nio.file.Files.readString(file).trim());
    }`),
      },
    },
    '3.3.4': {
      body: b334,
      starter: {
        python: `import sqlite3

conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE accounts (name TEXT PRIMARY KEY, balance INTEGER CHECK (balance >= 0))")
conn.executemany("INSERT INTO accounts VALUES (?, ?)", [("alice", 100), ("bob", 50)])
conn.commit()


def transfer(source, target, amount):
    with conn:
        conn.execute("UPDATE accounts SET balance = balance - ? WHERE name = ?", (amount, source))
        conn.execute("UPDATE accounts SET balance = balance + ? WHERE name = ?", (amount, target))


transfer("alice", "bob", 30)
print(conn.execute("SELECT * FROM accounts ORDER BY name").fetchall())
try:
    transfer("alice", "bob", 500)
except sqlite3.IntegrityError:
    print("rejected")
print(conn.execute("SELECT * FROM accounts ORDER BY name").fetchall())
`,
        java: javaClass(`    public static void main(String[] args) {
        // JDBC needs a driver on the classpath, so here is the SQL idea in plain Java.
        java.util.Map<String, Integer> accounts = new java.util.TreeMap<>(java.util.Map.of("alice", 100, "bob", 50));
        accounts.merge("alice", -30, Integer::sum);
        accounts.merge("bob", 30, Integer::sum);
        System.out.println(accounts);
    }`),
      },
    },
    '3.3.5': {
      body: b335,
      starter: {
        python: `import argparse
import io


def main(argv=None, out=None):
    out = out if out is not None else io.StringIO()
    parser = argparse.ArgumentParser(prog="calc")
    parser.add_argument("a", type=float)
    parser.add_argument("op", choices=["add", "mul"])
    parser.add_argument("b", type=float)
    args = parser.parse_args(argv)
    result = args.a + args.b if args.op == "add" else args.a * args.b
    print(result, file=out)
    return 0


buffer = io.StringIO()
code = main(["6", "mul", "7"], buffer)
print(code, buffer.getvalue().strip())
`,
        java: javaClass(`    public static void main(String[] args) {
        System.out.println("args: " + args.length);
        System.exit(0);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Why should you not write `except BaseException:` or a bare `except:`?', ['It is slow', 'It would also catch Ctrl+C and exit requests', 'It is a syntax error', 'It hides the traceback'], 1, 'KeyboardInterrupt and SystemExit derive from BaseException so ordinary `except Exception` handlers leave them alone.'),
      q('What does `raise NewError(...) from err` do?', ['Deletes err', 'Keeps the original error as __cause__', 'Retries the code', 'Re-raises err'], 1, 'The chain shows both the low-level cause and the high-level consequence.'),
      q('Why give an application one base exception class?', ['It is required by Python', 'Callers can catch every error of the app in one clause without hiding real bugs', 'It makes errors faster', 'It stops the program'], 1, 'A single AppError base lets a top-level handler catch all intended failures while genuine bugs like TypeError still surface.'),
      q('What does `__exit__` returning True mean?', ['Cleanup succeeded', 'The exception, if any, is swallowed', 'The block ran twice', 'Nothing'], 1, 'Return True only for errors you deliberately want to ignore.'),
      q('Why use try/finally inside a @contextmanager generator?', ['To make it faster', 'So the cleanup still runs when the with block raises', 'To catch the exception', 'It is required syntax'], 1, 'The exception is thrown into the generator at the yield. Without finally the cleanup code after it would be skipped.'),
      q('What makes an atomic file write safe?', ['Writing twice', 'Writing a temporary file in the same folder, then swapping it in with os.replace', 'Using a bigger buffer', 'Closing the file'], 1, 'Readers see the complete old file or the complete new one, never a half-written one.'),
      q('Which is the safest way to include a user-supplied name in a SQL query?', ['An f-string with quotes', 'String concatenation', 'A ? placeholder with a parameter tuple', 'Escaping quotes by hand'], 2, 'Placeholders keep the value as pure data, so it can never change the query. That prevents SQL injection.'),
      q('What does `with conn:` do for a SQLite connection?', ['Closes the connection', 'Commits on success and rolls back if an error escapes', 'Opens a new database', 'Locks the file forever'], 1, 'It is the transaction context manager: all of the changes in the block happen, or none of them do.'),
      q('Why call `logger.info("order %s placed", order_id)` instead of using an f-string?', ['It looks nicer', 'The message is only built if it will actually be shown', 'f-strings are not allowed', 'It adds a timestamp'], 1, 'Lazy formatting makes disabled log levels almost free.'),
      q('What exit code means success for a command-line program?', ['1', '0', '-1', '255'], 1, 'Zero means success. Non-zero means failure, which scripts rely on.'),
    ],
  },

  project: {
    title: 'Safe Ledger',
    body: projectBody,
    starter: {
      python: `import argparse
import contextlib
import json
import logging
import os
import sqlite3
import tempfile


class AppError(Exception):
    pass


class ValidationError(AppError):
    pass


class NotFoundError(AppError):
    pass


class StorageError(AppError):
    pass


@contextlib.contextmanager
def working_directory(path):
    yield


def atomic_write(path, text):
    pass


def save_json(path, data):
    pass


def load_json(path, default=None):
    pass


class Ledger:
    def __init__(self, path=":memory:"):
        pass

    def add(self, category, amount_cents, note=""):
        pass

    def total(self, category=None):
        pass

    def by_category(self):
        pass

    def largest(self, n):
        pass

    def delete(self, entry_id):
        pass

    def add_many(self, entries):
        pass

    def close(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
        return False


def make_logger(name, stream, level="INFO"):
    pass


def parse_command(argv):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import io, json, logging, os, tempfile

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

AE, VE, NF, SE = ns.get("AppError"), ns.get("ValidationError"), ns.get("NotFoundError"), ns.get("StorageError")
check("Error hierarchy", all(isinstance(c, type) for c in (AE, VE, NF, SE)) and issubclass(AE, Exception) and all(issubclass(c, AE) for c in (VE, NF, SE)), "AppError(Exception), and the other three derive from AppError")
def ve():
    e = VE("amount", "must not be zero")
    return (e.field, e.problem, str(e))
check("ValidationError carries its field and problem", attempt(ve) == ("amount", "must not be zero", "amount: must not be zero"), "def __init__(self, field, problem): super().__init__(f'{field}: {problem}')")

wd = ns.get("working_directory")
tmp = tempfile.mkdtemp()
if callable(wd):
    before = os.getcwd()
    def inside():
        with wd(tmp):
            return os.path.realpath(os.getcwd()) == os.path.realpath(tmp)
    ok_inside = attempt(inside)
    ok_after = os.getcwd() == before
    def boom():
        with wd(tmp):
            raise RuntimeError("x")
    boom_raised = raises(boom, RuntimeError)
    check("working_directory changes and restores", ok_inside is True and ok_after, "os.chdir(path), then restore the old directory afterwards")
    check("working_directory restores even after an error", boom_raised and os.getcwd() == before, "restore in a finally block")
else:
    check("working_directory", False, "define working_directory(path)")

aw = ns.get("atomic_write")
target = os.path.join(tmp, "data.txt")
if callable(aw):
    attempt(lambda: aw(target, "first"))
    ok1 = open(target).read() == "first" if os.path.exists(target) else False
    attempt(lambda: aw(target, "second"))
    ok2 = open(target).read() == "second"
    check("atomic_write writes the file", ok1 and ok2, "write a temp file in the same folder, then os.replace it over the target")
    failed = raises(lambda: aw(target, 12345))
    check("atomic_write keeps the old file when the write fails", failed and open(target).read() == "second", "do not touch the real file until the new content is complete")
    leftovers = [n for n in os.listdir(tmp) if n != "data.txt"]
    check("atomic_write leaves no temporary files", leftovers == [], "remove the temp file in the failure path")
    newfile = os.path.join(tmp, "brand-new.txt")
    attempt(lambda: aw(newfile, "hi"))
    check("atomic_write creates new files", os.path.exists(newfile) and open(newfile).read() == "hi", "os.replace works whether or not the target exists")
else:
    check("atomic_write", False, "define atomic_write(path, text)")

sj, lj = ns.get("save_json"), ns.get("load_json")
jpath = os.path.join(tmp, "state.json")
if callable(sj) and callable(lj):
    attempt(lambda: sj(jpath, {"b": [1, 2], "a": None}))
    check("save_json and load_json round trip", attempt(lambda: lj(jpath)) == {"b": [1, 2], "a": None}, "json.dumps then atomic_write, and json.load to read")
    check("load_json defaults", attempt(lambda: lj(os.path.join(tmp, "missing.json"), {"d": 1})) == {"d": 1} and attempt(lambda: lj(os.path.join(tmp, "missing.json"))) is None, "return the default for a missing file")
    bad = os.path.join(tmp, "bad.json")
    open(bad, "w").write("{ not json")
    check("load_json survives damaged files", attempt(lambda: lj(bad, "fallback")) == "fallback", "catch json.JSONDecodeError as well")
else:
    check("save_json and load_json", False, "define both functions")

L = ns.get("Ledger")
if isinstance(L, type):
    led = attempt(lambda: L())
    ids = []
    def fill():
        ids.append(led.add("food", -1250, "lunch"))
        ids.append(led.add("rent", -80000))
        ids.append(led.add("food", -450))
        ids.append(led.add("salary", 250000, "march"))
        return ids
    check("Ledger.add returns ids", attempt(fill) == [1, 2, 3, 4], "use cursor.lastrowid")
    check("Ledger.total", attempt(lambda: (led.total(), led.total("food"), led.total("nothing"))) == (168300, -1700, 0), "SUM in SQL, and 0 when there are no rows (coalesce)")
    check("Ledger.by_category", attempt(lambda: led.by_category()) == {"food": -1700, "rent": -80000, "salary": 250000}, "GROUP BY category")
    check("Ledger.largest", attempt(lambda: led.largest(2)) == [(4, "salary", 250000, "march"), (2, "rent", -80000, "")], "ORDER BY abs(amount_cents) DESC, id ASC LIMIT ?")
    def bad_inputs():
        out = []
        for args in (("", 5), ("  ", 5), (None, 5), ("x", 0), ("x", 1.5), ("x", "5"), ("x", True)):
            try:
                led.add(*args)
                out.append("accepted")
            except Exception as e:
                out.append(type(e).__name__)
        return out
    r = attempt(bad_inputs)
    check("Ledger.add validates", r == ["ValidationError"] * 7, "raise ValidationError for an empty category and for a non-int, zero or boolean amount")
    def field_names():
        names = []
        for args in (("", 5), ("x", 0)):
            try:
                led.add(*args)
            except VE as e:
                names.append(e.field)
        return names
    check("Ledger validation errors name the field", attempt(field_names) == ["category", "amount_cents"], "ValidationError('category', ...) and ValidationError('amount_cents', ...)")
    check("Ledger.add strips the category", attempt(lambda: (led.add("  gifts ", -100), "gifts" in led.by_category())) [1] is True, "store category.strip()")
    attack = "x'); DROP TABLE entries;--"
    def inject():
        led.add(attack, -1)
        return attack in led.by_category() and led.total() != 0
    check("Ledger is safe from SQL injection", attempt(inject) is True, "use ? placeholders for every value")
    def delete_test():
        led.delete(1)
        return led.total("food")
    check("Ledger.delete", attempt(delete_test) == -450, "DELETE ... WHERE id = ?")
    check("Ledger.delete a missing id raises NotFoundError", raises(lambda: led.delete(9999), NF), "check cursor.rowcount")
    def many_ok():
        start = led.total()
        new = led.add_many([("misc", -10), ("misc", -20, "two")])
        return (len(new), led.total() - start)
    check("Ledger.add_many inserts all", attempt(many_ok) == (2, -30), "return the list of new ids")
    def many_bad():
        before = (led.total(), len(led.largest(1000)))
        raised = False
        try:
            led.add_many([("ok", -5), ("ok", -6), ("", -7)])
        except VE:
            raised = True
        return raised, before == (led.total(), len(led.largest(1000)))
    check("Ledger.add_many is all or nothing", attempt(many_bad) == (True, True), "validate everything first, or use 'with self.conn:' so an error rolls everything back")
    def closes():
        with L() as l:
            l.add("a", 1)
            c = l.conn
        try:
            c.execute("select 1")
            return False
        except Exception:
            return True
    check("Ledger works as a context manager", attempt(closes) is True, "__enter__ returns self and __exit__ closes the connection")
    dbfile = os.path.join(tmp, "ledger.db")
    def persists():
        with L(dbfile) as l:
            l.add("keep", 42, "saved")
        with L(dbfile) as l2:
            return l2.total("keep"), l2.largest(1)
    check("Ledger persists to a file", attempt(persists) == (42, [(1, "keep", 42, "saved")]), "sqlite3.connect(path) and commit your changes")
    def separate():
        a, b = L(), L()
        a.add("x", 5)
        return b.total()
    check("Ledgers do not share data", attempt(separate) == 0, "every Ledger opens its own connection")
else:
    check("Ledger", False, "define class Ledger")

ml = ns.get("make_logger")
if callable(ml):
    def logtest():
        s = io.StringIO()
        lg = ml("proj.ledger", s, "WARNING")
        lg.info("hidden"); lg.warning("careful"); lg.error("bad")
        lg2 = ml("proj.ledger", s, "WARNING")
        lg2.warning("once")
        return s.getvalue().splitlines()
    check("make_logger levels and format", attempt(logtest) == ["WARNING:careful", "ERROR:bad", "WARNING:once"], "a StreamHandler with Formatter('%(levelname)s:%(message)s'), and clear old handlers so output is not duplicated")
    def noprop():
        s = io.StringIO()
        lg = ml("proj.noprop", s)
        return lg.propagate is False and lg.level == logging.INFO
    check("make_logger does not propagate", attempt(noprop) is True, "logger.propagate = False, and set the level from the string")
else:
    check("make_logger", False, "define make_logger(name, stream, level='INFO')")

pc = ns.get("parse_command")
if callable(pc):
    cases = [
        (["add", "food", "12.50", "--note", "lunch"], {"command": "add", "category": "food", "amount_cents": 1250, "note": "lunch"}),
        (["add", "fun", "-3"], {"command": "add", "category": "fun", "amount_cents": -300, "note": ""}),
        (["total"], {"command": "total", "category": None}),
        (["total", "--category", "food"], {"command": "total", "category": "food"}),
        (["list"], {"command": "list", "n": 5}),
        (["list", "-n", "2"], {"command": "list", "n": 2}),
    ]
    check("parse_command", all(attempt(lambda a=a: pc(a)) == want for a, want in cases), "argparse subparsers, and amount_cents = round(float(amount) * 100)")
    import contextlib as _cl
    def exits(argv):
        with _cl.redirect_stderr(io.StringIO()):
            try:
                pc(argv)
                return False
            except SystemExit:
                return True
    check("parse_command rejects bad input", exits([]) and exits(["explode"]) and exits(["add", "food", "abc"]) and exits(["add"]) and exits(["list", "-n", "x"]), "argparse exits with SystemExit on a missing command, an unknown command, or a bad number")
else:
    check("parse_command", False, "define parse_command(argv)")`,
  },
};
