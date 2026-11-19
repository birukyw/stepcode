# Project: Speed Toolkit

Ten tools that put the module to work: searching, sorting, hashing, caching and bit tricks. Every tool has a **speed requirement**, and the checks use inputs large enough that the obvious slow approach fails. The goal is not just correct answers but the **right algorithm** for each one.

## The functions

**1. `lower_bound(nums, target)`** returns the first index `i` where `nums[i] >= target` in a sorted list, or `len(nums)` if there is none. Use binary search, and do not use the `bisect` module.

**2. `min_capacity(weights, max_days)`** returns the smallest ship capacity that moves all packages, **in order**, within `max_days` days. A day carries packages until the next would exceed the capacity. Binary search the answer.

**3. `merge_sort(items)`** returns a new sorted list. Write your own merge sort and do not call `sorted` or `.sort()`.

**4. `count_inversions(nums)`** returns how many pairs `i < j` have `nums[i] > nums[j]`, in O(n log n). The merge step does the counting.

**5. `class MyHashMap`** with `put(key, value)`, `get(key)` (return `-1` or `None` if missing) and `remove(key)`. Build it from a list of buckets and **do not use `dict` or `set`**. It must **resize** so that 60,000 keys stay fast.

**6. `class LRUCache(capacity)`** with `get(key)` (return `-1` if missing) and `put(key, value)`. Both must be O(1), and both count as a use. When over capacity, evict the least recently used key.

**7. `is_power_of_two(n)`** with one bit expression, and `False` for zero and negatives.

**8. `single_number(nums)`** returns the value that appears once when every other value appears twice, in O(1) extra memory.

**9. `two_singles(nums)`** returns the two values that appear once when every other value appears twice, as a sorted list.

> **Tip:** Name the idea before you code each one: halve the range, split and merge, bucket by hash, map plus linked list, XOR.

> **Watch out:** the checks time several functions on 100,000+ items. A nested loop, `list.pop(0)` or a linear search will not finish in time.

## Stretch goals

- Make `MyHashMap` use open addressing instead of chaining.
- Add `peek(key)` to `LRUCache` that reads a value **without** marking it as used.
- Write `kth_smallest_sorted_matrix(matrix, k)` using binary search on the answer.

## Hints

+++ Searching and sorting hints
`lower_bound` and `min_capacity` share one loop shape: `while lo < hi`, `hi = mid` when the test passes, `lo = mid + 1` when it fails. For `count_inversions`, write a merge sort that returns `(sorted_list, count)`, and add `len(left) - i` whenever a right item is placed before the remaining left items.
+++

+++ Hashing and caching hints
Keep `buckets = [[] for _ in range(size)]` and a `count`. When `count > 2 * len(buckets)`, build a table twice as big and reinsert every pair. For the cache, use `collections.OrderedDict` with `move_to_end` and `popitem(last=False)`, or build your own doubly linked list with sentinels.
+++

+++ Bit hints
`n & (n - 1)` is zero exactly when `n` has at most one set bit. For `two_singles`, XOR everything to get `x ^ y`, take `low = total & -total`, and XOR only the numbers that have that bit set.
+++

+++ Full solution
```python
from collections import OrderedDict


def lower_bound(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo


def min_capacity(weights, max_days):
    def days_needed(capacity):
        days, load = 1, 0
        for w in weights:
            if load + w > capacity:
                days += 1
                load = 0
            load += w
        return days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if days_needed(mid) <= max_days:
            hi = mid
        else:
            lo = mid + 1
    return lo


def merge_sort(items):
    if len(items) <= 1:
        return list(items)
    mid = len(items) // 2
    left, right = merge_sort(items[:mid]), merge_sort(items[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out


def count_inversions(nums):
    def sort_count(items):
        if len(items) <= 1:
            return list(items), 0
        mid = len(items) // 2
        left, a = sort_count(items[:mid])
        right, b = sort_count(items[mid:])
        out, cross = [], 0
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                out.append(left[i])
                i += 1
            else:
                out.append(right[j])
                cross += len(left) - i
                j += 1
        out.extend(left[i:])
        out.extend(right[j:])
        return out, a + b + cross

    return sort_count(list(nums))[1]


class MyHashMap:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.count = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        self.count += 1
        if self.count > 2 * len(self.buckets):
            old = [pair for b in self.buckets for pair in b]
            self.buckets = [[] for _ in range(len(self.buckets) * 2)]
            self.count = 0
            for k, v in old:
                self.put(k, v)

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return -1

    def remove(self, key):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.count -= 1
                return


class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.data = OrderedDict()

    def get(self, key):
        if key not in self.data:
            return -1
        self.data.move_to_end(key)
        return self.data[key]

    def put(self, key, value):
        self.data[key] = value
        self.data.move_to_end(key)
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)


def is_power_of_two(n):
    return n > 0 and n & (n - 1) == 0


def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result


def two_singles(nums):
    total = 0
    for n in nums:
        total ^= n
    low = total & -total
    x = 0
    for n in nums:
        if n & low:
            x ^= n
    return sorted([x, total ^ x])
```
+++
