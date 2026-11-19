# Project: Array Toolkit

Seven functions that each solve a classic problem, and each one has to be **fast**. The checks run your code on inputs with hundreds of thousands of items under a time limit, so a nested-loop solution that works on small data will fail here. That is the point: you now know the patterns that make these linear.

You will use everything in module 2.1: two pointers, sliding windows, prefix sums and difference arrays.

## The functions

**1. `max_window_sum(nums, k)`** returns the largest sum of any `k` consecutive numbers. `k` is at most `len(nums)`.

**2. `longest_unique(text)`** returns the length of the longest stretch of `text` with no repeated character.

**3. `two_sum_sorted(nums, target)`** takes a **sorted** list and returns a tuple `(i, j)` with `i < j` and `nums[i] + nums[j] == target`, or `None` if there is no such pair.

**4. `range_sums(nums, queries)`** takes a list of `(i, j)` queries and returns a list with the sum of `nums[i:j]` for each one (so `j` is excluded).

**5. `apply_updates(n, updates)`** starts from a list of `n` zeros. Each update is `(start, end, amount)`, meaning add `amount` to every position from `start` to `end` **inclusive**. Return the final list.

**6. `count_subarrays(nums, k)`** returns how many contiguous subarrays have a sum of exactly `k`. The list may contain negative numbers.

**7. `merge_sorted(a, b)`** merges two sorted lists into one sorted list, without calling `sorted()`.

> **Tip:** Say the time you are aiming for before you write each function. Everything here is O(n), apart from the queries and updates, which are O(1) each after preparation.

> **Watch out:** the speed checks have a time limit of about a second and a half per function. `sum(nums[i:i + k])` inside a loop is O(n · k), and it will not pass.

## Stretch goals

- Make `two_sum_sorted` also work when there are duplicate numbers.
- Write `shortest_run(nums, target)`: the shortest stretch of positive numbers with sum at least `target`.
- Add a 2D version of `range_sums` for a rectangle in a grid.

## Hints

+++ Window and prefix hints
For the window, keep a running sum: add `nums[i]`, subtract `nums[i - k]`. For range sums, build `prefix = [0]` then add each number, and answer with `prefix[j] - prefix[i]`.
+++

+++ Subarray hint
Keep a dictionary of how many times each prefix sum has appeared, starting with `{0: 1}`. At each step add `counts.get(total - k, 0)` to the answer, then record the new total.
+++

+++ Full solution
```python
from itertools import accumulate


def max_window_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best


def longest_unique(text):
    seen = set()
    left = 0
    best = 0
    for right, ch in enumerate(text):
        while ch in seen:
            seen.remove(text[left])
            left += 1
        seen.add(ch)
        best = max(best, right - left + 1)
    return best


def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return (left, right)
        if total < target:
            left += 1
        else:
            right -= 1
    return None


def range_sums(nums, queries):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return [prefix[j] - prefix[i] for i, j in queries]


def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for start, end, amount in updates:
        diff[start] += amount
        diff[end + 1] -= amount
    return list(accumulate(diff))[:n]


def count_subarrays(nums, k):
    counts = {0: 1}
    total = 0
    result = 0
    for x in nums:
        total += x
        result += counts.get(total - k, 0)
        counts[total] = counts.get(total, 0) + 1
    return result


def merge_sorted(a, b):
    i = j = 0
    result = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result
```
+++
