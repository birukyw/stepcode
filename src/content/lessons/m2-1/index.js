import b211 from './2.1.1.md?raw';
import b212 from './2.1.2.md?raw';
import b213 from './2.1.3.md?raw';
import b214 from './2.1.4.md?raw';
import b215 from './2.1.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;

export default {
  lessons: {
    '2.1.1': {
      body: b211,
      starter: {
        python: `def count_pairs(n):
    steps = 0
    for i in range(n):
        for j in range(i + 1, n):
            steps += 1
    return steps

for n in (10, 100, 1000):
    print(n, count_pairs(n))
`,
        java: javaClass(`    public static void main(String[] args) {
        for (int n : new int[] {10, 100, 1000}) {
            long steps = 0;
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    steps++;
                }
            }
            System.out.println(n + " " + steps);
        }
    }`),
      },
    },
    '2.1.2': {
      body: b212,
      starter: {
        python: `def simulate_appends(n):
    capacity = 1
    size = 0
    copies = 0
    for _ in range(n):
        if size == capacity:
            copies += size
            capacity *= 2
        size += 1
    return copies, capacity

print(simulate_appends(10))
print(simulate_appends(1000))
`,
        java: javaClass(`    public static void main(String[] args) {
        int capacity = 1, size = 0;
        long copies = 0;
        for (int i = 0; i < 1000; i++) {
            if (size == capacity) {
                copies += size;
                capacity *= 2;
            }
            size++;
        }
        System.out.println(copies + " " + capacity);
    }`),
      },
    },
    '2.1.3': {
      body: b213,
      starter: {
        python: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    steps = 0
    while left < right:
        steps += 1
        total = nums[left] + nums[right]
        if total == target:
            return (left, right), steps
        if total < target:
            left += 1
        else:
            right -= 1
    return None, steps

nums = [1, 3, 4, 6, 8, 11, 15, 19, 23, 30]
print(two_sum_sorted(nums, 34))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {1, 3, 4, 6, 8, 11, 15, 19, 23, 30};
        int left = 0, right = nums.length - 1, target = 34;
        while (left < right) {
            int total = nums[left] + nums[right];
            if (total == target) {
                System.out.println(left + " " + right);
                return;
            }
            if (total < target) left++; else right--;
        }
        System.out.println("none");
    }`),
      },
    },
    '2.1.4': {
      body: b214,
      starter: {
        python: `def best_window(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best

nums = [2, 1, 5, 1, 3, 2, 8, 1, 4, 6]
print(best_window(nums, 3))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {2, 1, 5, 1, 3, 2, 8, 1, 4, 6};
        int k = 3, window = 0;
        for (int i = 0; i < k; i++) window += nums[i];
        int best = window;
        for (int i = k; i < nums.length; i++) {
            window += nums[i] - nums[i - k];
            best = Math.max(best, window);
        }
        System.out.println(best);
    }`),
      },
    },
    '2.1.5': {
      body: b215,
      starter: {
        python: `from itertools import accumulate

nums = [3, 1, 4, 1, 5, 9, 2, 6]
prefix = [0] + list(accumulate(nums))
print(prefix)
print(prefix[5] - prefix[2])   # sum of nums[2:5]
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};
        int[] prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) prefix[i + 1] = prefix[i] + nums[i];
        System.out.println(prefix[5] - prefix[2]);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      {
        q: 'What is the Big-O of this code?',
        code: 'for i in range(n):\n    for j in range(n):\n        pass',
        options: ['O(n)', 'O(n²)', 'O(2n)', 'O(log n)'],
        answer: 1,
        explain: 'A loop inside a loop runs n * n times. Nested loops multiply.',
      },
      {
        q: 'Which statement about `3n + 7` is correct?',
        options: ['It is O(n)', 'It is O(3n)', 'It is O(n + 7)', 'It is O(1)'],
        answer: 0,
        explain: 'Big-O drops constants and smaller terms, keeping only the shape of the growth.',
      },
      {
        q: 'Binary search halves the remaining items each step. What is its Big-O?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        answer: 1,
        explain: 'Halving repeatedly takes about log₂(n) steps.',
      },
      {
        q: 'Why is `list.append` called O(1) amortized?',
        options: ['It never copies anything', 'Resizes are rare because capacity doubles, so the average cost per append is constant', 'Python caches the list', 'It runs in the background'],
        answer: 1,
        explain: 'The occasional O(n) resize is paid for by the many cheap appends between resizes.',
      },
      {
        q: 'Which operation on a list is O(n)?',
        options: ['items[5]', 'items.append(1)', 'items.insert(0, 1)', 'len(items)'],
        answer: 2,
        explain: 'Inserting at the front shifts every existing item one slot to the right.',
      },
      {
        q: 'Given a sorted list, which technique finds two numbers that add to a target in O(n)?',
        options: ['Check every pair', 'Two pointers moving inward from both ends', 'Sort the list again', 'Recursion'],
        answer: 1,
        explain: 'If the sum is too small, move the left pointer right. If too big, move the right pointer left.',
      },
      {
        q: 'In a fixed sliding window of size k, what do you do to move the window one step?',
        options: ['Recompute the whole sum', 'Add the new item and subtract the item that left', 'Sort the window', 'Double k'],
        answer: 1,
        explain: 'Only two items change, so the update is O(1).',
      },
      {
        q: 'What is `prefix` for `nums = [2, 3, 5]` if it starts with a leading 0?',
        options: ['[2, 3, 5]', '[0, 2, 5, 10]', '[2, 5, 10]', '[0, 2, 3, 5]'],
        answer: 1,
        explain: 'Each entry is the running total of the items before it, starting with 0.',
      },
      {
        q: 'With the same prefix list, how do you get the sum of `nums[i:j]`?',
        options: ['prefix[i] + prefix[j]', 'prefix[j] - prefix[i]', 'prefix[j]', 'prefix[i] - prefix[j]'],
        answer: 1,
        explain: 'The total up to j minus the total up to i leaves exactly the items in between.',
      },
      {
        q: 'You must add 5 to a long range of positions many times and read the result once. What helps most?',
        options: ['A nested loop', 'A difference array', 'A set', 'Recursion'],
        answer: 1,
        explain: 'A difference array records +5 at the start and -5 after the end, so each update is O(1).',
      },
    ],
  },

  project: {
    title: 'Array Toolkit',
    body: projectBody,
    starter: {
      python: `from itertools import accumulate


def max_window_sum(nums, k):
    pass


def longest_unique(text):
    pass


def two_sum_sorted(nums, target):
    pass


def range_sums(nums, queries):
    pass


def apply_updates(n, updates):
    pass


def count_subarrays(nums, k):
    pass


def merge_sorted(a, b):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same functions in Java if you like.\n    }'),
    },
    checks: `import random, time, itertools

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

check("max_window_sum", call("max_window_sum", [2, 1, 5, 1, 3, 2, 8, 1, 4, 6], 3) == 13 and call("max_window_sum", [4], 1) == 4 and call("max_window_sum", [-2, -1, -5], 2) == -3, "keep a running sum: add the new item, subtract the old one")
check("longest_unique", [call("longest_unique", t) for t in ("abcabcbb", "bbbbb", "pwwkew", "", "dvdf")] == [3, 1, 3, 0, 3], "grow right, shrink left while the new letter is already in the window")
check("two_sum_sorted finds a pair", call("two_sum_sorted", [1, 3, 4, 6, 8, 11, 15, 19, 23, 30], 34) == (5, 9) or (lambda r: isinstance(r, tuple) and [1, 3, 4, 6, 8, 11, 15, 19, 23, 30][r[0]] + [1, 3, 4, 6, 8, 11, 15, 19, 23, 30][r[1]] == 34 and r[0] < r[1])(call("two_sum_sorted", [1, 3, 4, 6, 8, 11, 15, 19, 23, 30], 34)), "move left up when the sum is too small, right down when too big")
check("two_sum_sorted with no pair", call("two_sum_sorted", [1, 2, 3], 100) is None, "return None when the pointers meet")
check("range_sums", call("range_sums", [3, 1, 4, 1, 5, 9, 2, 6], [(0, 8), (2, 5), (3, 4), (0, 0)]) == [31, 10, 1, 0], "prefix[j] - prefix[i], with a leading 0 in prefix")
check("apply_updates", call("apply_updates", 8, [(2, 4, 5), (3, 6, 3)]) == [0, 0, 5, 8, 8, 3, 3, 0], "diff[start] += amount, diff[end + 1] -= amount, then accumulate")
check("apply_updates reaching the last index", call("apply_updates", 3, [(0, 2, 1)]) == [1, 1, 1], "the difference list needs n + 1 slots")
check("count_subarrays with negatives", [call("count_subarrays", a, k) for a, k in (([1, 2, 3], 3), ([1, 1, 1], 2), ([3, 4, -3, 2, 1], 3), ([1, -1, 1, -1], 0))] == [2, 2, 3, 4], "prefix sums plus a dictionary of counts, starting with {0: 1}")
check("merge_sorted", call("merge_sorted", [1, 4, 9], [2, 3, 10, 11]) == [1, 2, 3, 4, 9, 10, 11] and call("merge_sorted", [], [1]) == [1] and call("merge_sorted", [2, 2], [2]) == [2, 2, 2], "two pointers, then extend with what is left")

rnd = random.Random(7)
big = [rnd.randint(-50, 50) for _ in range(200000)]
_k = 50000
_w = sum(big[:_k])
_best = _w
for _i in range(_k, len(big)):
    _w += big[_i] - big[_i - _k]
    if _w > _best:
        _best = _w
r, ok = timed("max_window_sum", big, _k)
check("max_window_sum is fast on 200,000 items", ok and r == _best, "O(n) only: do not re-add k numbers for every window")
txt = "".join(rnd.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(200000))
r, ok = timed("longest_unique", txt)
check("longest_unique is fast on 200,000 characters", ok and r is not None and 1 <= r <= 26, "one pass with a set: each character enters and leaves once")
srt = sorted(set(rnd.randint(0, 10**7) for _ in range(150000)))
r, ok = timed("two_sum_sorted", srt, srt[0] + srt[-1])
check("two_sum_sorted is fast on 150,000 items", ok and isinstance(r, tuple) and srt[r[0]] + srt[r[1]] == srt[0] + srt[-1], "two pointers, not two loops")
qs = [(rnd.randint(0, 100000), rnd.randint(100000, 200000)) for _ in range(100000)]
r, ok = timed("range_sums", big, qs)
check("range_sums answers 100,000 queries quickly", ok and isinstance(r, list) and len(r) == 100000 and r[0] == sum(big[qs[0][0]:qs[0][1]]), "build the prefix list once, then answer each query in O(1)")
ups = [(rnd.randint(0, 100000), 100000 + rnd.randint(0, 99999), rnd.randint(1, 5)) for _ in range(100000)]
r, ok = timed("apply_updates", 200000, ups)
check("apply_updates handles 100,000 updates quickly", ok and isinstance(r, list) and len(r) == 200000, "do not loop over each range, only mark its two ends")
r, ok = timed("count_subarrays", big, 10)
check("count_subarrays is fast on 200,000 items", ok and isinstance(r, int), "one pass with a prefix-sum dictionary")
a = sorted(rnd.randint(0, 10**6) for _ in range(150000))
b = sorted(rnd.randint(0, 10**6) for _ in range(150000))
r, ok = timed("merge_sorted", a, b)
check("merge_sorted is fast and correct", ok and r == sorted(a + b), "walk both lists once with two pointers")`,
  },
};
