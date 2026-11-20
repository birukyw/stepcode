# Project: Pipeline Lab

Eleven small tools that put the module to work: declarative pipelines, first-class functions, lazy generators, itertools-style iteration, closures and decorators. They are the building blocks of real data-processing code, and several are tested on **endless streams** and **very large inputs**, so a version that builds big lists will fail.

For each tool, decide which idea it needs: a function that returns a function, a generator that yields one item at a time, a closure that remembers a variable, or a decorator that wraps another function.

## The tools

**1. `pipeline(*funcs)`** returns a new function that passes its argument through each function in turn, left to right, and returns the final result. `pipeline()` with no functions returns its argument unchanged.

**2. `clean_rows(rows)`** takes lines such as `" linus ,75"` and returns a list of `(name, score)` tuples. A valid line has exactly two comma-separated parts, a non-empty name once stripped, and a score that is all digits once stripped. The name is converted with `.title()` and the score with `int`. Invalid lines are skipped.

**3. `take(n, iterable)`** returns a **list** of the first `n` items of any iterable, including endless ones.

**4. `fib()`** is an **endless generator** of Fibonacci numbers starting `0, 1, 1, 2, 3, 5, ...`. Each call starts a fresh sequence.

**5. `chunked(iterable, size)`** is a generator that yields **lists** of `size` items. The last list may be shorter. It must work on an endless iterable.

**6. `running_totals(iterable)`** is a generator that yields the running total after each item. It must work on an endless iterable.

**7. `run_length_encode(text)` and `run_length_decode(pairs)`.** Encode `"AAABBBCCAA"` as `[("A", 3), ("B", 3), ("C", 2), ("A", 2)]`, and decode it back. Both must handle long texts quickly.

**8. `make_counter(start=0, step=1)`** returns a function. Each call to that function adds `step` to a private total (beginning at `start`) and returns the new total. Two counters must not affect each other.

**9. `call_counter(func)`** is a decorator. The wrapped function works exactly as before, and has a `calls` attribute with the number of times it has been called. It must keep the original name and docstring.

**10. `memoize(func)`** is a decorator that caches results by their positional arguments, so each distinct set of arguments is computed once. It must keep the original name.

**11. `retry(times, exceptions=(Exception,))`** is a decorator **with arguments**. It calls the function up to `times` times, retrying only when one of `exceptions` is raised. If the last attempt still fails, raise that last exception. Other exceptions are not retried. It must keep the original name and docstring.

> **Tip:** Name the idea before you write each tool. Tools 3 to 6 are one idea (lazy iteration) with four different shapes, and tools 9 to 11 are the same decorator recipe with one more layer each time.

> **Watch out:** `take`, `chunked` and `running_totals` are tested with `itertools.count()`, which never ends. If you call `list(...)` on the input, the check will hang or run out of memory.

## Stretch goals

- Make `chunked` return tuples instead of lists when asked, using an optional argument.
- Add a `timeout` to `retry`, waiting a little between attempts with `time.sleep`.
- Write `unique_everseen(iterable)`: a generator that yields each item the first time it appears.

## Hints

+++ Generator hints
Each of `fib`, `chunked` and `running_totals` has a loop and a `yield`. For `chunked`, collect items in a list and yield it when it reaches `size`, then yield any leftover at the end. `take(n, it)` is one line with `itertools.islice`.
+++

+++ Decorator hints
The shape of `call_counter` is: define `wrapper(*args, **kwargs)` with `@wraps(func)`, set `wrapper.calls = 0`, and return `wrapper`. `memoize` keeps a dictionary in the closure. `retry` has three nested functions: `retry(times, exceptions)` returns `decorator(func)` which returns `wrapper(*args, **kwargs)`. Remember `raise last_error` after the loop.
+++

+++ Full solution
```python
import itertools
from functools import wraps, reduce


def pipeline(*funcs):
    def run(value):
        return reduce(lambda acc, f: f(acc), funcs, value)
    return run


def clean_rows(rows):
    out = []
    for row in rows:
        parts = row.split(",")
        if len(parts) != 2:
            continue
        name, score = parts[0].strip(), parts[1].strip()
        if name and score.isdigit():
            out.append((name.title(), int(score)))
    return out


def take(n, iterable):
    return list(itertools.islice(iterable, n))


def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def chunked(iterable, size):
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk


def running_totals(iterable):
    total = 0
    for item in iterable:
        total += item
        yield total


def run_length_encode(text):
    return [(char, sum(1 for _ in group)) for char, group in itertools.groupby(text)]


def run_length_decode(pairs):
    return "".join(char * count for char, count in pairs)


def make_counter(start=0, step=1):
    total = start

    def next_value():
        nonlocal total
        total += step
        return total

    return next_value


def call_counter(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)

    wrapper.calls = 0
    return wrapper


def memoize(func):
    cache = {}

    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]

    return wrapper


def retry(times, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except exceptions as err:
                    last = err
            raise last
        return wrapper
    return decorator
```
+++
