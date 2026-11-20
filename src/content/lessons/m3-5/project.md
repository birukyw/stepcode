# Project: Quality Lab

Software craftsmanship is not one skill, it is a set of habits: describe your intent with **types**, prove behaviour with **tests**, isolate dependencies so tests are **deterministic**, organise code in **packages**, and **measure** before you optimise. This project makes you practise all of them, and it has an unusual twist: **you write tests, and the checks test your tests.** Your test cases must pass on a correct implementation and **catch** several deliberately buggy ones. That is exactly the quality bar of a good test suite.

## The tools

**1. `clamp(value: float, low: float, high: float) -> float`** returns `value` limited to the range from `low` to `high`. If `low` is greater than `high`, raise `ValueError`. It must carry exactly these type hints.

**2. `first_or_none(items)`** returns the first item of a sequence, or `None` if it is empty. Make it **generic** with a `TypeVar`: the parameter is `Sequence[T]` and the return type is `T | None`.

**3. `SupportsArea` and `total_area(shapes)`.** Define `SupportsArea` as a `Protocol` with a method `area(self) -> float`, decorated with `@runtime_checkable`. `total_area(shapes: Iterable[SupportsArea]) -> float` adds up the areas of any objects that have an `area()` method, with no inheritance required.

**4. `UserRecord` and `validate_user(data)`.** Define `UserRecord` as a `TypedDict` with `name: str` and `age: int`. `validate_user(data) -> UserRecord`:
- raises `TypeError` if `data` is not a dictionary,
- raises `ValueError` for a missing `name` or `age`, a `name` that is not a string or is empty after stripping spaces, an `age` that is not an `int` (a `bool` does not count) or is outside 0 to 150,
- returns a new dictionary with only `name` (stripped) and `age`. Extra keys are ignored.

**5. `leap_year_cases()` and `slugify_cases()`.** Each returns a **list of test cases**, as tuples. `leap_year_cases()` returns `(year, expected_bool)` pairs for the leap-year rule, and `slugify_cases()` returns `(text, expected_slug)` pairs for `slugify`, which lowercases the text, turns every run of non-alphanumeric characters into a single `-`, and strips `-` from both ends. Your cases must **all be correct**, and together they must **catch every one of the buggy versions** the checks try (they forget the century rule, the 400 rule, lowercasing, trimming, collapsing repeated separators...). Think about boundaries and special rules.

**6. `send_reminders(tasks, sender, clock)`** sends reminders for tasks that are not done and due soon. `tasks` is a list of dictionaries with `"title"`, `"due"` (a number, in seconds) and optional `"done"` (`True` means skip). Call `clock()` **once** to get `now`. For each task with `0 <= due - now <= 3600`, call `sender("Reminder: <title>")`. If `sender` raises an `Exception` for a task, skip it and carry on. Return the number of reminders sent successfully. Both `sender` and `clock` are injected, so the function is easy to test with fakes and mocks.

**7. `make_package(root, name, files)` and `load_package(root, name)`.** `make_package` creates a folder `root/name`, writes every `{filename: source}` in `files`, and makes sure an `__init__.py` exists (empty if you were not given one). It returns the package folder as a `Path`. `load_package` makes the package importable by temporarily adding `root` to `sys.path`, imports it (call `importlib.invalidate_caches()` first), **restores** `sys.path` exactly (even on error), and returns the imported module.

**8. `peak_memory(func)` and `best_time(func, repeat=5)`.** `peak_memory` runs `func()` under `tracemalloc` and returns the **peak** number of bytes allocated (an `int`). If `tracemalloc` was already running, leave it running. `best_time` runs `func()` `repeat` times and returns the **smallest** duration in seconds, measured with `time.perf_counter()`.

> **Tip:** For the test-case tools, ask "what mistakes would a lazy programmer make?" and include one case that exposes each. The century years 1900 and 2000 are the heart of the leap-year rule, and `"  Hello,   World!  "` exercises trimming, collapsing and punctuation at once.

> **Watch out:** `bool` is a subclass of `int` in Python, so `isinstance(True, int)` is `True`. The age check must reject it.

## Stretch goals

- Add `@runtime_checkable` checks in `total_area` that raise `TypeError` for objects without `area`.
- Write a `unittest` class for `validate_user` and run it with `unittest.TextTestRunner`.
- Make `peak_memory` also return the `(current, peak)` pair, or add `best_time` statistics (mean and spread).

## Hints

+++ Typing hints
Use `typing.TypeVar("T")`, and annotate with `Sequence[T]` and `T | None`. The Protocol class body is just `def area(self) -> float: ...`. For `TypedDict`, `class UserRecord(TypedDict): name: str; age: int` (one field per line).
+++

+++ Test-case hints
For leap years include at least: an ordinary leap year (2024), an ordinary non-leap year (2023), a century that is **not** a leap year (1900), and a century that **is** (2000). For slugify include uppercase letters, punctuation, repeated separators and leading/trailing separators, and digits.
+++

+++ Mocking, packaging and measurement hints
`send_reminders`: call `clock()` before the loop, and wrap each `sender(...)` call in `try`/`except Exception`. `make_package`: `Path.mkdir(parents=True, exist_ok=True)` and `write_text`. `load_package`: `sys.path.insert(0, str(root))` in a `try`, and `sys.path.remove(...)` in the `finally`. `peak_memory`: check `tracemalloc.is_tracing()` first, and use `reset_peak()` to measure only your call.
+++

+++ Full solution
```python
import importlib
import re
import sys
import time
import tracemalloc
from collections.abc import Iterable, Sequence
from pathlib import Path
from typing import Protocol, TypedDict, TypeVar, runtime_checkable

T = TypeVar("T")


def clamp(value: float, low: float, high: float) -> float:
    if low > high:
        raise ValueError("low must not be greater than high")
    return max(low, min(value, high))


def first_or_none(items: Sequence[T]) -> T | None:
    return items[0] if len(items) else None


@runtime_checkable
class SupportsArea(Protocol):
    def area(self) -> float: ...


def total_area(shapes: Iterable[SupportsArea]) -> float:
    return sum(shape.area() for shape in shapes)


class UserRecord(TypedDict):
    name: str
    age: int


def validate_user(data) -> UserRecord:
    if not isinstance(data, dict):
        raise TypeError("data must be a dictionary")
    for field in ("name", "age"):
        if field not in data:
            raise ValueError(f"missing field: {field}")
    name, age = data["name"], data["age"]
    if not isinstance(name, str) or not name.strip():
        raise ValueError("name must be a non-empty string")
    if isinstance(age, bool) or not isinstance(age, int) or not 0 <= age <= 150:
        raise ValueError("age must be an integer from 0 to 150")
    return {"name": name.strip(), "age": age}


def leap_year_cases():
    return [(2024, True), (2023, False), (1900, False), (2000, True), (2100, False), (1600, True), (4, True), (1, False)]


def slugify_cases():
    return [
        ("Hello", "hello"),
        ("hello big world", "hello-big-world"),
        ("Hello, World!", "hello-world"),
        ("a  --  b", "a-b"),
        ("  Hi!  ", "hi"),
        ("Python 3.12 rocks", "python-3-12-rocks"),
        ("!!!", ""),
        ("snake_case name", "snake-case-name"),
    ]


def send_reminders(tasks, sender, clock):
    now = clock()
    sent = 0
    for task in tasks:
        if task.get("done"):
            continue
        if 0 <= task["due"] - now <= 3600:
            try:
                sender("Reminder: " + task["title"])
            except Exception:
                continue
            sent += 1
    return sent


def make_package(root, name, files):
    folder = Path(root) / name
    folder.mkdir(parents=True, exist_ok=True)
    for filename, source in files.items():
        (folder / filename).write_text(source)
    init = folder / "__init__.py"
    if not init.exists():
        init.write_text("")
    return folder


def load_package(root, name):
    sys.path.insert(0, str(root))
    try:
        importlib.invalidate_caches()
        return importlib.import_module(name)
    finally:
        sys.path.remove(str(root))


def peak_memory(func):
    started_here = not tracemalloc.is_tracing()
    if started_here:
        tracemalloc.start()
    tracemalloc.reset_peak()
    base, _ = tracemalloc.get_traced_memory()
    try:
        func()
        _, peak = tracemalloc.get_traced_memory()
    finally:
        if started_here:
            tracemalloc.stop()
    return max(0, peak - base)


def best_time(func, repeat=5):
    best = None
    for _ in range(repeat):
        start = time.perf_counter()
        func()
        elapsed = time.perf_counter() - start
        best = elapsed if best is None else min(best, elapsed)
    return best
```
+++
