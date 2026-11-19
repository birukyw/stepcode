# Project: Resilient Toolkit

Real programs meet messy input: a user types "abc" for an age, a file is missing, a config line is malformed, a withdrawal is more than the balance. Programs that survive that are **resilient**. In this project you build a toolkit of functions and classes that handle trouble gracefully, using everything from the module: exceptions, files, the standard library, comprehensions and classes.

The checks feed your code good input, bad input, missing files and edge cases, so each function has to decide what *should* happen when things go wrong.

## The tools

**1. `safe_int(text, default=0)`** converts text to an integer, and returns `default` if that fails for any reason (`"abc"`, `""`, `"3.5"`, even `None`).

**2. `ConfigError` and `parse_config(text)`.** Define `class ConfigError(Exception)`. Then parse a settings file given as text, one `key = value` per line, into a dictionary of strings.
- Blank lines and lines starting with `#` are ignored.
- Split on the **first** `=` only, and strip spaces from the key and the value.
- If a line has no `=` or an empty key, raise `ConfigError` with the message `line N: expected key = value` (lines are counted from 1, including blank and comment lines).
- If a key appears twice, the last value wins.

**3. `load_scores(path)`** reads a file of `name,score` lines into a dictionary of `name -> int`. Skip blank lines and any line that is not exactly a name and a whole number. If a name appears more than once, keep its **highest** score. A missing file gives `{}`.

**4. `save_scores(path, scores)`** writes `name,score` lines, **highest score first** (ties by name), and returns the number of lines written. Loading what you saved must give back the same scores.

**5. `top_words(text, n=3)`** returns the `n` most common words as `(word, count)` tuples. Compare in lowercase, treat anything that is not a letter as a separator, and sort by count (highest first) then alphabetically.

**6. `group_by_length(words)`** returns a dictionary from word length to the **sorted list of unique** words of that length.

**7. `InsufficientFunds` and `class BankAccount(owner, balance=0)`.** Define `class InsufficientFunds(Exception)`. Then build the account:
- an opening balance below 0 raises `ValueError`,
- `deposit(amount)` and `withdraw(amount)` raise `ValueError` for an amount of 0 or less,
- `withdraw` raises `InsufficientFunds` if the amount is more than the balance,
- a failed operation must not change the balance,
- `str(account)` is `Ada: $120`.

**8. `to_json_text(data)` and `from_json_text(text, default=None)`.** The first returns JSON text with **sorted keys**. The second parses JSON, and returns `default` if the text is not valid JSON.

**9. `describe_call(func, *args)`** calls `func(*args)`. If it works, return `"ok: "` followed by the `repr` of the result. If it raises, return the error type name, a colon, a space and the error message, for example `"ValueError: invalid literal for int() with base 10: 'x'"`.

> **Tip:** Make the `try` block as small as you can, and catch **specific** errors. For `describe_call`, catching `Exception` is right, because reporting any failure is its whole job.

> **Watch out:** `BankAccount` objects must not share state. Keep the balance on `self`.

## Stretch goals

- Add a `history` list to `BankAccount` and a method that returns the transaction log.
- Make `parse_config` convert values that look like numbers or `true`/`false` into real Python values.
- Add a `transfer(other, amount)` method to `BankAccount`.

## Hints

+++ Errors and files hints
`safe_int`: `except (ValueError, TypeError)`. `parse_config`: loop with `enumerate(text.splitlines(), start=1)`, and use `line.partition("=")` to split on the first `=`. For `load_scores`, open the file inside `try`, loop over its lines, and use `line.strip().split(",")`: a valid line has exactly 2 parts and a `isdigit()` score.
+++

+++ Standard library and comprehension hints
`top_words`: `re.findall("[a-z]+", text.lower())` is the easy way, or replace non-letters with spaces. Then `Counter(words)` and `sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:n]`. `group_by_length`: `{n: sorted({w for w in words if len(w) == n}) for n in {len(w) for w in words}}`.
+++

+++ Full solution
```python
import json
import re
from collections import Counter


class ConfigError(Exception):
    pass


class InsufficientFunds(Exception):
    pass


def safe_int(text, default=0):
    try:
        return int(text)
    except (ValueError, TypeError):
        return default


def parse_config(text):
    config = {}
    for number, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        key, sep, value = stripped.partition("=")
        key = key.strip()
        if not sep or not key:
            raise ConfigError("line " + str(number) + ": expected key = value")
        config[key] = value.strip()
    return config


def load_scores(path):
    scores = {}
    try:
        with open(path) as f:
            for line in f:
                parts = line.strip().split(",")
                if len(parts) != 2:
                    continue
                name, value = parts
                if not name or not value.isdigit():
                    continue
                scores[name] = max(scores.get(name, 0), int(value))
    except FileNotFoundError:
        return {}
    return scores


def save_scores(path, scores):
    ordered = sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))
    with open(path, "w") as f:
        for name, value in ordered:
            f.write(name + "," + str(value) + "\n")
    return len(ordered)


def top_words(text, n=3):
    words = re.findall("[a-z]+", text.lower())
    counts = Counter(words)
    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:n]


def group_by_length(words):
    return {size: sorted({w for w in words if len(w) == size}) for size in {len(w) for w in words}}


class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise ValueError("opening balance cannot be negative")
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("deposit must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("withdrawal must be positive")
        if amount > self.balance:
            raise InsufficientFunds("need " + str(amount - self.balance) + " more")
        self.balance -= amount

    def __str__(self):
        return self.owner + ": $" + str(self.balance)


def to_json_text(data):
    return json.dumps(data, sort_keys=True)


def from_json_text(text, default=None):
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return default


def describe_call(func, *args):
    try:
        return "ok: " + repr(func(*args))
    except Exception as err:
        return type(err).__name__ + ": " + str(err)
```
+++
