# Project: Function Toolkit

Professional code is built from small, well-named functions that each do one job. In this project you write seven of them. Each one practises something from this module: parameters and return values, early returns, defaults, keyword-only arguments, the mutable default trap, and pure functions that leave their inputs alone.

The checks call your functions with many inputs, so each function must **return** its result. Printing is not enough.

## The functions

**1. `clamp(value, low, high)`** returns `low` if `value` is below it, `high` if it is above, and `value` otherwise.

**2. `average(numbers)`** returns the mean of a list of numbers. For an empty list it returns `0.0` instead of crashing.

**3. `is_palindrome(text)`** returns `True` if the text reads the same both ways, ignoring case and anything that is not a letter. `"A man, a plan, a canal: Panama"` is a palindrome.

**4. `fizzbuzz(n)`** returns `"FizzBuzz"` if `n` is divisible by 15, `"Fizz"` if by 3, `"Buzz"` if by 5, and otherwise the number as a string, such as `"7"`.

**5. `top_n(scores, n=3)`** returns the `n` highest scores, largest first. It must **not** change the list it is given.

**6. `add_tag(tag, tags=None)`** returns a list with `tag` appended. Called without `tags`, it starts a fresh list every time. Called with a list, it returns a **new** list and leaves the original alone.

**7. `format_money(amount, *, currency="$")`** returns the amount with thousands separators and two decimals: `format_money(1234.5)` is `"$1,234.50"` and `format_money(3, currency="EUR ")` is `"EUR 3.00"`. `currency` must be keyword-only.

> **Tip:** Write one function, test it with a couple of `print` calls at the bottom of the file, then press **Run checks**. The checks report each function separately.

> **Watch out:** in `top_n` and `add_tag`, the obvious approach mutates the caller's list. The checks call each function and then look at the list they passed in.

## Stretch goals

- Add docstrings to every function.
- Write your own `assert` tests for `clamp` and `fizzbuzz`.
- Make `average` accept any number of arguments with `*numbers` as an alternative version.

## Hints

+++ Palindrome hint
Build a cleaned string: loop over `text.lower()` and keep only characters where `ch.isalpha()` is true. Then compare it with its reverse, `cleaned[::-1]`.
+++

+++ top_n and add_tag hint
`sorted(scores, reverse=True)[:n]` returns a new list. For `add_tag`, use `None` as the default, and build the result with `tags + [tag]` or `list(tags)` followed by `append`, so the caller's list never changes.
+++

+++ Full solution
```python
def clamp(value, low, high):
    if value < low:
        return low
    if value > high:
        return high
    return value


def average(numbers):
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)


def is_palindrome(text):
    cleaned = ""
    for ch in text.lower():
        if ch.isalpha():
            cleaned += ch
    return cleaned == cleaned[::-1]


def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)


def top_n(scores, n=3):
    return sorted(scores, reverse=True)[:n]


def add_tag(tag, tags=None):
    if tags is None:
        return [tag]
    return tags + [tag]


def format_money(amount, *, currency="$"):
    return f"{currency}{amount:,.2f}"
```
+++
