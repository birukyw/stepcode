# Project: Safe Ledger

You are building the storage and tooling core of a small expense tracker. It has to be **safe**: bad input is rejected with clear errors, files are never left half-written, the database changes **all or nothing**, hostile text cannot break a query, and every part is easy to test. It uses everything in the module: an exception hierarchy, context managers, safe file writes, JSON, SQLite, logging and a command-line parser.

All money is stored in **cents** as integers, because floating-point numbers are not safe for money.

## The pieces

**1. The exception hierarchy.**
- `AppError(Exception)` is the base class of everything below.
- `ValidationError(field, problem)` derives from `AppError`. It stores `.field` and `.problem`, and `str(err)` is `"field: problem"`.
- `NotFoundError` and `StorageError` also derive from `AppError`.

**2. `working_directory(path)`** is a context manager (use `contextlib.contextmanager`) that changes the current directory to `path` inside the block, and **always restores the previous one**, even when the block raises.

**3. `atomic_write(path, text)`** writes `text` to `path` so that a failure can never leave a half-written file. Write to a temporary file in the **same folder** and swap it in with `os.replace`. If anything fails (for example `text` is not a string), the original file must be **unchanged** and **no temporary file** may remain in the folder.

**4. `save_json(path, data)` and `load_json(path, default=None)`.** `save_json` writes JSON atomically (with `atomic_write`). `load_json` returns `default` if the file is missing **or** contains invalid JSON.

**5. `class Ledger(path=":memory:")`** stores entries in SQLite. It has a table `entries(id, category, amount_cents, note)`, and:
- `add(category, amount_cents, note="")` inserts an entry and returns its new `id`. The category must be a non-empty string after stripping spaces, and the amount must be a non-zero `int` (not a `bool`). Otherwise raise `ValidationError` with the field name (`"category"` or `"amount_cents"`).
- `total(category=None)` is the sum of amounts, for one category or for all (`0` if there are none).
- `by_category()` returns a dictionary from category to total.
- `largest(n)` returns the `n` entries with the biggest absolute amount, as `(id, category, amount_cents, note)` tuples, ties by lowest `id`.
- `delete(entry_id)` removes an entry and raises `NotFoundError` if it does not exist.
- `add_many(entries)` takes a list of `(category, amount_cents)` or `(category, amount_cents, note)` tuples and inserts them **all or none**: if any one is invalid, raise `ValidationError` and add **nothing**. It returns the list of new ids.
- Use **parameterised queries** only, so a category such as `"x'); DROP TABLE entries;--"` is stored as plain text.
- It works as a context manager (`with Ledger(...) as ledger:`) that closes the connection, and data written to a **file** path is still there when a new `Ledger` opens the same file.

**6. `make_logger(name, stream, level="INFO")`** returns a logger that writes `LEVEL:message` lines to `stream`, shows only messages at or above `level`, and does **not** pass records to the root logger. Calling it twice with the same name must not duplicate output.

**7. `parse_command(argv)`** uses `argparse` and returns a dictionary:
- `["add", "food", "12.50", "--note", "lunch"]` gives `{"command": "add", "category": "food", "amount_cents": 1250, "note": "lunch"}` (the note defaults to `""`, and the amount is converted to cents).
- `["total"]` gives `{"command": "total", "category": None}`, and `["total", "--category", "food"]` sets the category.
- `["list"]` gives `{"command": "list", "n": 5}`, and `["list", "-n", "2"]` gives `n` of 2.
- A missing or unknown command, or a bad number, makes `argparse` exit (`SystemExit`).

> **Tip:** For `add_many`, use `with self.conn:` so that an error **rolls back** every insert in the block, or validate all the entries before inserting any.

> **Watch out:** `isinstance(True, int)` is `True` in Python. A boolean must **not** be accepted as an amount.

## Stretch goals

- Add `export_csv(path)` that writes all entries with the `csv` module, using `atomic_write`.
- Add a `monthly_summary` if you store a date per entry.
- Log every `add` and `delete` at INFO level inside `Ledger`.

## Hints

+++ Errors, files and context managers
`working_directory`: save `os.getcwd()`, `os.chdir(path)`, `yield` inside a `try`, and restore in `finally`. `atomic_write`: `tempfile.mkstemp(dir=folder)`, write through `os.fdopen`, `os.replace`, and in the `except` branch remove the temporary file and re-raise. `load_json` needs `except (FileNotFoundError, json.JSONDecodeError)`.
+++

+++ Ledger hints
Create the table with `CREATE TABLE IF NOT EXISTS`. Validate **before** touching the database. Use `cur.lastrowid` for the new id and `cur.rowcount` to detect a missing row in `delete`. `largest`: `ORDER BY abs(amount_cents) DESC, id ASC LIMIT ?`. Every write goes inside `with self.conn:`.
+++

+++ Logging and argparse hints
`make_logger`: `logger = logging.getLogger(name)`, `logger.handlers.clear()`, add one `StreamHandler(stream)` with `Formatter("%(levelname)s:%(message)s")`, set the level with `getattr(logging, level)`, and `logger.propagate = False`. `parse_command`: `add_subparsers(dest="command", required=True)`, and the amount as `type=float` then `round(value * 100)`.
+++

+++ Full solution
```python
import argparse
import contextlib
import json
import logging
import os
import sqlite3
import tempfile


class AppError(Exception):
    pass


class ValidationError(AppError):
    def __init__(self, field, problem):
        super().__init__(f"{field}: {problem}")
        self.field = field
        self.problem = problem


class NotFoundError(AppError):
    pass


class StorageError(AppError):
    pass


@contextlib.contextmanager
def working_directory(path):
    previous = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(previous)


def atomic_write(path, text):
    folder = os.path.dirname(os.path.abspath(path))
    fd, tmp = tempfile.mkstemp(dir=folder, suffix=".tmp")
    try:
        with os.fdopen(fd, "w") as f:
            f.write(text)
        os.replace(tmp, path)
    except BaseException:
        if os.path.exists(tmp):
            os.remove(tmp)
        raise


def save_json(path, data):
    atomic_write(path, json.dumps(data, indent=2))


def load_json(path, default=None):
    try:
        with open(path) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def _check(category, amount_cents):
    if not isinstance(category, str) or not category.strip():
        raise ValidationError("category", "must be a non-empty string")
    if isinstance(amount_cents, bool) or not isinstance(amount_cents, int) or amount_cents == 0:
        raise ValidationError("amount_cents", "must be a non-zero integer")
    return category.strip()


class Ledger:
    def __init__(self, path=":memory:"):
        self.conn = sqlite3.connect(path)
        with self.conn:
            self.conn.execute(
                "CREATE TABLE IF NOT EXISTS entries ("
                "id INTEGER PRIMARY KEY, category TEXT NOT NULL, "
                "amount_cents INTEGER NOT NULL CHECK (amount_cents != 0), note TEXT NOT NULL DEFAULT '')"
            )

    def add(self, category, amount_cents, note=""):
        category = _check(category, amount_cents)
        with self.conn:
            cur = self.conn.execute(
                "INSERT INTO entries (category, amount_cents, note) VALUES (?, ?, ?)",
                (category, amount_cents, note),
            )
        return cur.lastrowid

    def total(self, category=None):
        if category is None:
            row = self.conn.execute("SELECT coalesce(sum(amount_cents), 0) FROM entries").fetchone()
        else:
            row = self.conn.execute(
                "SELECT coalesce(sum(amount_cents), 0) FROM entries WHERE category = ?", (category,)
            ).fetchone()
        return row[0]

    def by_category(self):
        rows = self.conn.execute("SELECT category, sum(amount_cents) FROM entries GROUP BY category")
        return dict(rows.fetchall())

    def largest(self, n):
        return self.conn.execute(
            "SELECT id, category, amount_cents, note FROM entries "
            "ORDER BY abs(amount_cents) DESC, id ASC LIMIT ?",
            (n,),
        ).fetchall()

    def delete(self, entry_id):
        with self.conn:
            cur = self.conn.execute("DELETE FROM entries WHERE id = ?", (entry_id,))
        if cur.rowcount == 0:
            raise NotFoundError(entry_id)

    def add_many(self, entries):
        cleaned = []
        for entry in entries:
            category, amount = entry[0], entry[1]
            note = entry[2] if len(entry) > 2 else ""
            cleaned.append((_check(category, amount), amount, note))
        ids = []
        with self.conn:
            for category, amount, note in cleaned:
                cur = self.conn.execute(
                    "INSERT INTO entries (category, amount_cents, note) VALUES (?, ?, ?)",
                    (category, amount, note),
                )
                ids.append(cur.lastrowid)
        return ids

    def close(self):
        self.conn.close()

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()
        return False


def make_logger(name, stream, level="INFO"):
    logger = logging.getLogger(name)
    logger.handlers.clear()
    handler = logging.StreamHandler(stream)
    handler.setFormatter(logging.Formatter("%(levelname)s:%(message)s"))
    logger.addHandler(handler)
    logger.setLevel(getattr(logging, level))
    logger.propagate = False
    return logger


def parse_command(argv):
    parser = argparse.ArgumentParser(prog="ledger")
    sub = parser.add_subparsers(dest="command", required=True)

    add = sub.add_parser("add")
    add.add_argument("category")
    add.add_argument("amount", type=float)
    add.add_argument("--note", default="")

    total = sub.add_parser("total")
    total.add_argument("--category", default=None)

    listing = sub.add_parser("list")
    listing.add_argument("-n", type=int, default=5)

    args = parser.parse_args(argv)
    if args.command == "add":
        return {"command": "add", "category": args.category, "amount_cents": round(args.amount * 100), "note": args.note}
    if args.command == "total":
        return {"command": "total", "category": args.category}
    return {"command": "list", "n": args.n}
```
+++
