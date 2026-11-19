import b261 from './2.6.1.md?raw';
import b262 from './2.6.2.md?raw';
import b263 from './2.6.3.md?raw';
import b264 from './2.6.4.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '2.6.1': {
      body: b261,
      starter: {
        python: `def subsets(items):
    result = []
    current = []

    def explore(i):
        if i == len(items):
            result.append(current[:])
            return
        explore(i + 1)
        current.append(items[i])
        explore(i + 1)
        current.pop()

    explore(0)
    return result


print(subsets([1, 2, 3]))
`,
        java: javaClass(`    static void explore(int[] items, int i, java.util.List<Integer> current) {
        if (i == items.length) {
            System.out.println(current);
            return;
        }
        explore(items, i + 1, current);
        current.add(items[i]);
        explore(items, i + 1, current);
        current.remove(current.size() - 1);
    }

    public static void main(String[] args) {
        explore(new int[]{1, 2, 3}, 0, new java.util.ArrayList<>());
    }`),
      },
    },
    '2.6.2': {
      body: b262,
      starter: {
        python: `def max_meetings(intervals):
    chosen = []
    last_end = float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):
        if start >= last_end:
            chosen.append((start, end))
            last_end = end
    return chosen


meetings = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11)]
print(max_meetings(meetings))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[][] meetings = {{1, 4}, {3, 5}, {0, 6}, {5, 7}};
        java.util.Arrays.sort(meetings, (a, b) -> a[1] - b[1]);
        int lastEnd = Integer.MIN_VALUE, count = 0;
        for (int[] m : meetings) {
            if (m[0] >= lastEnd) { count++; lastEnd = m[1]; }
        }
        System.out.println(count);
    }`),
      },
    },
    '2.6.3': {
      body: b263,
      starter: {
        python: `from functools import lru_cache


@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


def coin_change(coins, amount):
    INF = float("inf")
    best = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and best[a - c] + 1 < best[a]:
                best[a] = best[a - c] + 1
    return best[amount] if best[amount] != INF else -1


print(fib(80))
print(coin_change([4, 3, 1], 6))
`,
        java: javaClass(`    public static void main(String[] args) {
        long[] fib = new long[81];
        fib[1] = 1;
        for (int i = 2; i <= 80; i++) fib[i] = fib[i - 1] + fib[i - 2];
        System.out.println(fib[80]);
    }`),
      },
    },
    '2.6.4': {
      body: b264,
      starter: {
        python: `def edit_distance(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(len(a) + 1):
        dp[i][0] = i
    for j in range(len(b) + 1):
        dp[0][j] = j
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[-1][-1]


print(edit_distance("kitten", "sitting"))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] weights = {1, 3, 4, 5};
        int[] values = {1, 4, 5, 7};
        int capacity = 7;
        int[] dp = new int[capacity + 1];
        for (int i = 0; i < weights.length; i++)
            for (int w = capacity; w >= weights[i]; w--)
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        System.out.println(dp[capacity]);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('What are the three beats of backtracking?', ['Sort, merge, return', 'Choose, explore, un-choose', 'Push, pop, peek', 'Read, write, close'], 1, 'Make a choice, recurse, then undo the choice so the next option starts clean.'),
      q('Why save `current[:]` instead of `current` when a solution is found?', ['It is faster', '`current` keeps changing, so you need a snapshot copy', 'Python requires slices', 'It avoids recursion'], 1, 'Otherwise every saved result points at the same list, which ends up empty.'),
      q('What is pruning?', ['Sorting the input', 'Abandoning a branch as soon as it cannot lead to a valid answer', 'Removing duplicates at the end', 'Caching results'], 1, 'Checking constraints early cuts huge parts of the search tree.'),
      q('Which key do you sort by for maximum non-overlapping interval scheduling?', ['Start time', 'End time', 'Length', 'Alphabetical order'], 1, 'Taking the interval that ends earliest leaves the most room for the rest.'),
      q('Greedy fails for coins [4, 3, 1] and amount 6 because:', ['Greedy is always wrong', 'The locally best coin (4) is not part of the best answer (3 + 3)', 'There is no solution', 'Coins must be sorted'], 1, 'Greedy picks 4 + 1 + 1 (three coins), but 3 + 3 uses two.'),
      q('What problem does dynamic programming solve that plain recursion has?', ['Stack overflow only', 'Repeated work: the same subproblem is computed many times', 'Sorting', 'Reading input'], 1, 'DP answers each distinct subproblem once and stores the result.'),
      q('What is the difference between memoization and tabulation?', ['They solve different problems', 'Memoization is top-down recursion with a cache, tabulation fills a table bottom-up', 'Tabulation uses recursion, memoization does not', 'There is none'], 1, 'Both store subproblem answers. They differ in direction and in how they are written.'),
      q('In 1D 0/1 knapsack, why iterate the capacity backwards?', ['It is faster', 'So each item is used at most once', 'To sort the items', 'Python requires it'], 1, 'Going forwards would let the same item be reused within one pass.'),
      q('What does `dp[i][j]` mean in edit distance?', ['The i-th and j-th characters', 'The edits needed to turn the first i characters of a into the first j of b', 'The longest common substring', 'The number of matches'], 1, 'The table holds answers for every pair of prefixes.'),
      q('What is the time complexity of the LCS table for strings of length n and m?', ['O(n + m)', 'O(n * m)', 'O(2^n)', 'O(log n)'], 1, 'There are (n + 1) * (m + 1) cells, each filled in constant time.'),
    ],
  },

  project: {
    title: 'Optimizer Lab',
    body: projectBody,
    starter: {
      python: `def combo_sum_once(nums, target):
    pass


def n_queens_count(n):
    pass


def solve_sudoku(grid):
    pass


def max_meetings(intervals):
    pass


def min_rooms(intervals):
    pass


def coin_change(coins, amount):
    pass


def knapsack(weights, values, capacity):
    pass


def edit_distance(a, b):
    pass


def lis_length(nums):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import random, time

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

def timed(name, *a, limit=2.5):
    f = ns.get(name)
    if not callable(f):
        return None, False
    start = time.perf_counter()
    try:
        result = f(*a)
    except Exception:
        return None, True
    return result, (time.perf_counter() - start) <= limit

rnd = random.Random(21)

check("combo_sum_once", [call("combo_sum_once", n, t) for n, t in (([10, 1, 2, 7, 6, 1, 5], 8), ([2, 5, 2, 1, 2], 5), ([2], 1), ([], 0))] == [[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]], [[1, 2, 2], [5]], [], [[]]], "sort, use each index once, skip equal siblings, return the combinations in sorted order")
r, ok = timed("combo_sum_once", [1] * 14 + [2] * 6 + [3, 5, 8], 15)
check("combo_sum_once prunes", ok and isinstance(r, list) and len(r) == len(set(map(tuple, r))), "stop the loop as soon as a number is bigger than what remains")

check("n_queens_count", [call("n_queens_count", n) for n in range(1, 9)] == [1, 0, 0, 2, 10, 4, 40, 92], "track columns and both diagonals in sets")
r, ok = timed("n_queens_count", 9)
check("n_queens_count(9)", ok and r == 352, "O(1) conflict checks with sets, not a loop over the board")

puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9],
]
import copy
g = copy.deepcopy(puzzle)
r, ok = timed("solve_sudoku", g)
def good_sudoku(s):
    if not isinstance(s, list) or len(s) != 9:
        return False
    rows = all(sorted(row) == list(range(1, 10)) for row in s)
    cols = all(sorted(s[r][c] for r in range(9)) == list(range(1, 10)) for c in range(9))
    boxes = all(sorted(s[br + i][bc + j] for i in range(3) for j in range(3)) == list(range(1, 10)) for br in (0, 3, 6) for bc in (0, 3, 6))
    fixed = all(puzzle[r][c] in (0, s[r][c]) for r in range(9) for c in range(9))
    return rows and cols and boxes and fixed
solved = r if isinstance(r, list) else g
check("solve_sudoku", ok and good_sudoku(solved), "backtrack: find an empty cell, try 1 to 9, undo on failure. Return the solved grid")
bad = copy.deepcopy(puzzle)
bad[0][2] = 5
r = call("solve_sudoku", bad)
check("solve_sudoku with no solution", r is None, "return None when no digit fits")

check("max_meetings", [call("max_meetings", iv) for iv in ([(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)], [(1, 2), (2, 3), (3, 4), (1, 3)], [], [(1, 5)])] == [4, 3, 0, 1], "sort by END time and take every interval that starts at or after the last end")
big = []
for _ in range(100000):
    s = rnd.randint(0, 10**6)
    big.append((s, s + rnd.randint(1, 50)))
def mm(iv):
    c, last = 0, -1
    for s, e in sorted(iv, key=lambda x: x[1]):
        if s >= last:
            c += 1; last = e
    return c
r, ok = timed("max_meetings", big)
check("max_meetings on 100,000 intervals", ok and r == mm(big), "one sort and one sweep")

check("min_rooms", [call("min_rooms", iv) for iv in ([(0, 30), (5, 10), (15, 20)], [(7, 10), (2, 4)], [(1, 5), (5, 8)], [(1, 5), (2, 6), (3, 7)], [])] == [2, 1, 1, 3, 0], "sweep over start (+1) and end (-1) events. An end at the same time as a start frees the room first")
r, ok = timed("min_rooms", big)
def mr(iv):
    ev = sorted([(s, 1) for s, e in iv] + [(e, -1) for s, e in iv])
    cur = best = 0
    for _, d in ev:
        cur += d; best = max(best, cur)
    return best
check("min_rooms on 100,000 intervals", ok and r == mr(big), "sort the events, do not compare every pair")

check("coin_change", [call("coin_change", c, a) for c, a in (([4, 3, 1], 6), ([1, 2, 5], 11), ([2], 3), ([1, 5, 10, 25], 99), ([5], 0))] == [2, 3, -1, 9, 0], "best[a] = 1 + min(best[a - coin]). Return -1 if impossible")
r, ok = timed("coin_change", [186, 419, 83, 408], 6249)
check("coin_change on a large amount", ok and r == 20, "tabulate: O(amount * coins), do not recurse without memo")

check("knapsack", [call("knapsack", w, v, c) for w, v, c in (([1, 3, 4, 5], [1, 4, 5, 7], 7), ([10, 20, 30], [60, 100, 120], 50), ([5], [10], 4), ([], [], 10))] == [9, 220, 0, 0], "skip or take, and each item at most once")
ws = [rnd.randint(1, 60) for _ in range(150)]
vs = [rnd.randint(1, 200) for _ in range(150)]
def ks(w, v, c):
    dp = [0] * (c + 1)
    for a, b in zip(w, v):
        for x in range(c, a - 1, -1):
            dp[x] = max(dp[x], dp[x - a] + b)
    return dp[c]
r, ok = timed("knapsack", ws, vs, 3000)
check("knapsack with 150 items and capacity 3,000", ok and r == ks(ws, vs, 3000), "a table of items by capacity: O(n * W)")

check("edit_distance", [call("edit_distance", a, b) for a, b in (("kitten", "sitting"), ("horse", "ros"), ("", "abc"), ("same", "same"), ("intention", "execution"))] == [3, 3, 3, 0, 5], "insert, delete or replace. Match costs nothing")
a1 = "".join(rnd.choice("abcd") for _ in range(500))
b1 = "".join(rnd.choice("abcd") for _ in range(500))
def ed(a, b):
    prev = list(range(len(b) + 1))
    for i in range(1, len(a) + 1):
        cur = [i] + [0] * len(b)
        for j in range(1, len(b) + 1):
            cur[j] = prev[j - 1] if a[i - 1] == b[j - 1] else 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[-1]
r, ok = timed("edit_distance", a1, b1)
check("edit_distance on two 500-letter strings", ok and r == ed(a1, b1), "a table of prefix pairs: O(n * m)")

check("lis_length", [call("lis_length", n) for n in ([10, 9, 2, 5, 3, 7, 101, 18], [], [5], [3, 2, 1], [1, 2, 3, 4], [0, 1, 0, 3, 2, 3])] == [4, 0, 1, 1, 4, 4], "strictly increasing, not necessarily adjacent")
data = [rnd.randint(0, 10**6) for _ in range(100000)]
from bisect import bisect_left
def lisf(nums):
    t = []
    for x in nums:
        i = bisect_left(t, x)
        if i == len(t):
            t.append(x)
        else:
            t[i] = x
    return len(t)
r, ok = timed("lis_length", data)
check("lis_length on 100,000 numbers", ok and r == lisf(data), "O(n log n): keep a list of the smallest tail for each length and use bisect")`,
  },
};
