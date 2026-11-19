import b231 from './2.3.1.md?raw';
import b232 from './2.3.2.md?raw';
import b233 from './2.3.3.md?raw';
import b234 from './2.3.4.md?raw';
import b235 from './2.3.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '2.3.1': {
      body: b231,
      starter: {
        python: `def first_at_least(items, target):
    lo, hi = 0, len(items)
    while lo < hi:
        mid = (lo + hi) // 2
        if items[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo


nums = [1, 3, 3, 3, 7, 9]
print(first_at_least(nums, 3))
print(first_at_least(nums, 8))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {1, 3, 3, 3, 7, 9};
        int target = 3;
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        System.out.println(lo);
    }`),
      },
    },
    '2.3.2': {
      body: b232,
      starter: {
        python: `def merge(left, right):
    out = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + left[i:] + right[j:]


def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    return merge(merge_sort(items[:mid]), merge_sort(items[mid:]))


print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {38, 27, 43, 3, 9, 82, 10};
        java.util.Arrays.sort(nums);
        System.out.println(java.util.Arrays.toString(nums));
    }`),
      },
    },
    '2.3.3': {
      body: b233,
      starter: {
        python: `class ChainedMap:
    def __init__(self, size=8):
        self.buckets = [[] for _ in range(size)]

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key, default=None):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return default


m = ChainedMap()
m.put("ada", 36)
m.put("linus", 28)
print(m.get("ada"), m.get("grace", "missing"))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.Map<String, Integer> ages = new java.util.HashMap<>();
        ages.put("ada", 36);
        ages.put("linus", 28);
        System.out.println(ages.get("ada") + " " + ages.getOrDefault("grace", -1));
    }`),
      },
    },
    '2.3.4': {
      body: b234,
      starter: {
        python: `from collections import OrderedDict


class LRU:
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


cache = LRU(2)
cache.put("a", 1)
cache.put("b", 2)
cache.get("a")
cache.put("c", 3)
print(list(cache.data))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.LinkedHashMap<String, Integer> cache = new java.util.LinkedHashMap<>(16, 0.75f, true) {
            protected boolean removeEldestEntry(java.util.Map.Entry<String, Integer> e) {
                return size() > 2;
            }
        };
        cache.put("a", 1);
        cache.put("b", 2);
        cache.get("a");
        cache.put("c", 3);
        System.out.println(cache.keySet());
    }`),
      },
    },
    '2.3.5': {
      body: b235,
      starter: {
        python: `def is_power_of_two(n):
    return n > 0 and n & (n - 1) == 0


def count_bits(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count


print([is_power_of_two(x) for x in (1, 2, 6, 64, 100)])
print(count_bits(0b10110111))
`,
        java: javaClass(`    public static void main(String[] args) {
        int n = 0b10110111;
        System.out.println(Integer.bitCount(n));
        System.out.println((64 & 63) == 0);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('What must be true about a list before binary search works?', ['It has no duplicates', 'It is sorted', 'It has an even length', 'It contains only integers'], 1, 'Each comparison discards half the list only because the order tells you which half.'),
      q('Roughly how many steps does binary search need for 1,000,000 sorted items?', ['About 20', 'About 1,000', 'About 500,000', 'About 1,000,000'], 0, 'Each step halves the range, and 2^20 is about a million.'),
      q('What does `bisect_left([1, 3, 3, 3, 7], 3)` return?', ['0', '1', '3', '4'], 1, 'It returns the first position where 3 fits, which is index 1.'),
      q('What does "binary search on the answer" require?', ['A sorted array', 'A yes/no test that flips from False to True once', 'A hash table', 'Recursion'], 1, 'If the test is monotonic, you can search the range of possible answers.'),
      q('Which statement about merge sort is true?', ['It is O(n^2) in the worst case', 'It is stable and always O(n log n)', 'It sorts in place with no extra memory', 'It only works on integers'], 1, 'Splitting gives log n levels and each level does O(n) merging. Using `<=` keeps equal items in order.'),
      q('When does quicksort degrade to O(n^2)?', ['When the list is random', 'When pivots are consistently the smallest or largest item', 'When the list has duplicates', 'Never'], 1, 'A bad pivot leaves one side almost the whole list, so the recursion becomes n levels deep.'),
      q('What happens when two keys land in the same hash bucket?', ['The second key is rejected', 'A collision, handled by chaining or probing', 'The table crashes', 'The first key is deleted'], 1, 'Collisions are unavoidable. Chaining keeps a list per bucket and open addressing probes for a free slot.'),
      q('Why must dictionary keys be immutable?', ['To save memory', 'A changed key would change its hash and get lost in the wrong bucket', 'Python is old', 'Mutable objects have no type'], 1, 'The table finds an item by recomputing the hash, so the hash must never change.'),
      q('In an LRU cache, why combine a hash map with a doubly linked list?', ['To make the cache bigger', 'The map finds a node in O(1) and the list reorders in O(1)', 'Lists are faster than dictionaries', 'To avoid using memory'], 1, 'Neither structure alone can both find a key and move it to the front in O(1).'),
      q('What does `n & (n - 1)` do?', ['Doubles n', 'Clears the lowest set bit', 'Flips every bit', 'Returns the highest bit'], 1, 'Subtracting 1 flips the lowest 1 and the zeros below it, so ANDing removes that 1.'),
    ],
  },

  project: {
    title: 'Speed Toolkit',
    body: projectBody,
    starter: {
      python: `from collections import OrderedDict


def lower_bound(nums, target):
    pass


def min_capacity(weights, max_days):
    pass


def merge_sort(items):
    pass


def count_inversions(nums):
    pass


class MyHashMap:
    # implement put, get and remove WITHOUT using dict or set
    def put(self, key, value):
        pass

    def get(self, key):
        pass

    def remove(self, key):
        pass


class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass


def is_power_of_two(n):
    pass


def single_number(nums):
    pass


def two_singles(nums):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same functions in Java if you like.\n    }'),
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

def lb_ref(nums, t):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < t:
            lo = mid + 1
        else:
            hi = mid
    return lo

cases = [([1, 3, 3, 3, 7, 9], 3), ([1, 3, 3, 3, 7, 9], 8), ([1, 3, 3, 3, 7, 9], 0), ([1, 3, 3, 3, 7, 9], 100), ([], 5), ([4], 4)]
check("lower_bound", [call("lower_bound", n, t) for n, t in cases] == [lb_ref(n, t) for n, t in cases], "first index whose value is >= target: while lo < hi, hi = mid or lo = mid + 1")
big = sorted(random.Random(1).randint(0, 10**9) for _ in range(300000))
probes = [random.Random(2).randint(0, 10**9) for _ in range(200)]
start = time.perf_counter()
got = [call("lower_bound", big, p) for p in probes]
check("lower_bound on 300,000 items is fast", got == [lb_ref(big, p) for p in probes] and time.perf_counter() - start < 1.0, "binary search, not a loop over the list, and do not slice the list")

check("min_capacity", [call("min_capacity", w, d) for w, d in (([3, 2, 2, 4, 1, 4], 3), ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5), ([1, 2, 3, 1, 1], 4), ([7], 1))] == [6, 15, 3, 7], "binary search the capacity between max(weights) and sum(weights)")
w = [random.Random(4).randint(1, 500) for _ in range(100000)]
r, ok = timed("min_capacity", w, 7)
check("min_capacity on 100,000 packages", ok and isinstance(r, int) and r >= max(w), "only about 25 simulations are needed")

rnd = random.Random(5)
samples = [[], [1], [2, 1], [5, 2, 4, 6, 1, 3], [3, 3, 3], [rnd.randint(0, 50) for _ in range(300)]]
check("merge_sort", [call("merge_sort", list(s)) for s in samples] == [sorted(s) for s in samples], "split in halves, sort each, merge")
check("merge_sort returns the sorted list", call("merge_sort", [3, 1, 2]) == [1, 2, 3], "return the result, do not only sort a copy")
big = [rnd.randint(0, 10**6) for _ in range(100000)]
r, ok = timed("merge_sort", big)
check("merge_sort on 100,000 items", ok and r == sorted(big), "O(n log n): do not use insertion sort")

def inv_ref(a):
    return sum(1 for i in range(len(a)) for j in range(i + 1, len(a)) if a[i] > a[j])

small = [[], [1], [2, 4, 1, 3, 5], [5, 4, 3, 2, 1], [1, 1, 1], [rnd.randint(0, 20) for _ in range(60)]]
check("count_inversions", [call("count_inversions", list(s)) for s in small] == [inv_ref(s) for s in small], "count pairs i < j with a[i] > a[j]: do it while merging")
big = list(range(100000, 0, -1))
r, ok = timed("count_inversions", big)
check("count_inversions on 100,000 items", ok and r == 100000 * 99999 // 2, "a reversed list has n(n-1)/2 inversions, and a nested loop is far too slow")

M = ns.get("MyHashMap")
if callable(M):
    try:
        m = M()
        m.put("a", 1); m.put("b", 2); m.put("a", 10)
        ok1 = m.get("a") == 10 and m.get("b") == 2 and m.get("zzz") in (None, -1)
        m.remove("a")
        ok2 = m.get("a") in (None, -1) and m.get("b") == 2
        m.remove("not there")
        ok3 = True
    except Exception as e:
        ok1 = ok2 = ok3 = False
    check("MyHashMap put, update, get", ok1, "bucket = hash(key) % size, then look through the bucket")
    check("MyHashMap remove", ok2 and ok3, "delete the pair from its bucket, and ignore missing keys")
    start = time.perf_counter()
    try:
        m = M()
        for i in range(60000):
            m.put(i, i * 2)
        good = all(m.get(i) == i * 2 for i in range(0, 60000, 7))
        for i in range(0, 60000, 2):
            m.remove(i)
        good = good and m.get(2) in (None, -1) and m.get(3) == 6
    except Exception:
        good = False
    check("MyHashMap with 60,000 keys", good and time.perf_counter() - start < 2.5, "resize (double the buckets) when chains get long")
else:
    check("MyHashMap", False, "define class MyHashMap")

L = ns.get("LRUCache")
if callable(L):
    try:
        c = L(2)
        c.put(1, 1); c.put(2, 2)
        a = c.get(1)
        c.put(3, 3)
        b = c.get(2)
        c.put(4, 4)
        r = [a, b, c.get(1), c.get(3), c.get(4)]
    except Exception:
        r = None
    check("LRUCache eviction order", r == [1, -1, -1, 3, 4], "get and put both count as a use. Evict the least recently used")
    try:
        c = L(2)
        c.put("a", 1); c.put("a", 5)
        c.put("b", 2); c.put("c", 3)
        r2 = [c.get("a"), c.get("b"), c.get("c")]
    except Exception:
        r2 = None
    check("LRUCache updating a key", r2 == [-1, 2, 3], "updating a key makes it the most recent, and does not add a second entry")
    start = time.perf_counter()
    try:
        c = L(1000)
        for i in range(150000):
            c.put(i, i)
            c.get(i - 5)
        good = c.get(149999) == 149999 and c.get(0) == -1
    except Exception:
        good = False
    check("LRUCache with 150,000 operations", good and time.perf_counter() - start < 2.5, "each operation must be O(1): a dict plus a doubly linked list, or an OrderedDict")
else:
    check("LRUCache", False, "define class LRUCache")

check("is_power_of_two", [call("is_power_of_two", n) for n in (1, 2, 3, 64, 100, 0, -4, 2**40)] == [True, True, False, True, False, False, False, True], "n > 0 and n & (n - 1) == 0")
check("single_number", [call("single_number", n) for n in ([4, 1, 2, 1, 2], [7], [5, 5, 9, 9, 3])] == [4, 7, 3], "XOR everything: equal pairs cancel")
vals = list(range(1, 100001)) * 2 + [424242]
r, ok = timed("single_number", vals)
check("single_number on 200,001 items", ok and r == 424242, "one pass with XOR")
check("two_singles", [call("two_singles", n) for n in ([1, 2, 3, 2, 1, 4], [5, 7], [10, 3, 10, 6])] == [[3, 4], [5, 7], [3, 6]], "XOR all to get x ^ y, then split the numbers by the lowest set bit. Return them sorted")`,
  },
};
