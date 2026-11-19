# Project: Optimizer Lab

Nine optimizers, one per big idea of the module: **backtracking**, **greedy**, **dynamic programming**. Some problems have a brute-force version that works for ten items and dies at fifty, so the checks include larger cases that only the right technique survives. For each function, decide first: do I need to *try everything with pruning*, *make one safe choice and sweep*, or *remember sub-answers*?

## The functions

**1. `combo_sum_once(nums, target)`** returns every unique combination of numbers from `nums` that adds up to `target`, using each list item **at most once**. The input may contain duplicates, but the output must have no duplicate combinations. Each combination is a sorted list, and the whole result is sorted. The empty target `0` gives `[[]]`.

**2. `n_queens_count(n)`** returns the number of ways to place `n` queens on an `n x n` board so none attack each other. It is tested up to `n = 9`.

**3. `solve_sudoku(grid)`** takes a 9 x 9 list of lists with `0` for empty cells, solves it, and **returns the solved grid**. If the puzzle has no solution, return `None`.

**4. `max_meetings(intervals)`** returns the largest number of non-overlapping `(start, end)` intervals you can pick. An interval that starts exactly when another ends does **not** overlap with it.

**5. `min_rooms(intervals)`** returns how many rooms are needed so that every meeting has a room. A meeting that starts exactly when another ends can reuse its room.

**6. `coin_change(coins, amount)`** returns the fewest coins that sum to `amount`, or `-1` if impossible. Coins can be reused. The coin values are arbitrary, so greedy will fail.

**7. `knapsack(weights, values, capacity)`** returns the maximum total value, taking each item at most once.

**8. `edit_distance(a, b)`** returns the fewest insertions, deletions and replacements to turn `a` into `b`.

**9. `lis_length(nums)`** returns the length of the longest strictly increasing subsequence in **O(n log n)**.

> **Tip:** Write one sentence defining the DP state before you code it: `best[a]` is the fewest coins for amount `a`. If you cannot say it, you are not ready to type it.

> **Watch out:** `lis_length` is tested on 100,000 numbers, so an O(n²) table is far too slow. `n_queens_count(9)` is slow without sets for the columns and diagonals.

## Stretch goals

- Make `solve_sudoku` faster by always filling the cell with the fewest candidates.
- Return the actual items chosen by `knapsack`, not just the value.
- Write `count_ways(coins, amount)`: the number of combinations that make the amount.

## Hints

+++ Backtracking hints
`combo_sum_once`: sort, then `explore(start, remaining)`. In the loop, `break` when `nums[i] > remaining`, and `continue` when `i > start and nums[i] == nums[i - 1]`. Recurse with `i + 1` so every item is used at most once. For `n_queens_count`, a queen at `(row, col)` uses column `col`, diagonal `row - col` and anti-diagonal `row + col`. For sudoku, the base case is "no empty cell is left".
+++

+++ Greedy hints
Both interval problems start with a sort. `max_meetings`: by **end** time, take each interval whose start is `>=` the last chosen end. `min_rooms`: turn every interval into two events, `(start, +1)` and `(end, -1)`, sort them (so that `-1` sorts before `+1` at the same time), and track the running total's maximum.
+++

+++ DP hints
`coin_change`: `best = [0] + [inf] * amount`, then for each amount try every coin. `knapsack`: loop the capacity **backwards** over a single row. `edit_distance`: base row `dp[0][j] = j`, base column `dp[i][0] = i`. `lis_length`: `tails` plus `bisect_left`. Replace the element at that position, or append when it is past the end.
+++

+++ Full solution
```python
from bisect import bisect_left


def combo_sum_once(nums, target):
    nums = sorted(nums)
    result, current = [], []

    def explore(start, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        for i in range(start, len(nums)):
            if nums[i] > remaining:
                break
            if i > start and nums[i] == nums[i - 1]:
                continue
            current.append(nums[i])
            explore(i + 1, remaining - nums[i])
            current.pop()

    explore(0, target)
    return result


def n_queens_count(n):
    cols, d1, d2 = set(), set(), set()

    def explore(row):
        if row == n:
            return 1
        total = 0
        for col in range(n):
            if col in cols or (row - col) in d1 or (row + col) in d2:
                continue
            cols.add(col)
            d1.add(row - col)
            d2.add(row + col)
            total += explore(row + 1)
            cols.remove(col)
            d1.remove(row - col)
            d2.remove(row + col)
        return total

    return explore(0)


def solve_sudoku(grid):
    def ok(r, c, d):
        for i in range(9):
            if grid[r][i] == d or grid[i][c] == d:
                return False
        br, bc = r // 3 * 3, c // 3 * 3
        for i in range(3):
            for j in range(3):
                if grid[br + i][bc + j] == d:
                    return False
        return True

    def solve():
        for r in range(9):
            for c in range(9):
                if grid[r][c] == 0:
                    for d in range(1, 10):
                        if ok(r, c, d):
                            grid[r][c] = d
                            if solve():
                                return True
                            grid[r][c] = 0
                    return False
        return True

    return grid if solve() else None


def max_meetings(intervals):
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count


def min_rooms(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))
        events.append((end, -1))
    events.sort()
    rooms = best = 0
    for _, delta in events:
        rooms += delta
        best = max(best, rooms)
    return best


def coin_change(coins, amount):
    INF = float("inf")
    best = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and best[a - c] + 1 < best[a]:
                best[a] = best[a - c] + 1
    return best[amount] if best[amount] != INF else -1


def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for wt, val in zip(weights, values):
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)
    return dp[capacity]


def edit_distance(a, b):
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                cur[j] = prev[j - 1]
            else:
                cur[j] = 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[-1]


def lis_length(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)
```
+++
