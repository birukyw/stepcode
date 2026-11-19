import b241 from './2.4.1.md?raw';
import b242 from './2.4.2.md?raw';
import b243 from './2.4.3.md?raw';
import b244 from './2.4.4.md?raw';
import b245 from './2.4.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '2.4.1': {
      body: b241,
      starter: {
        python: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def inorder(n):
    return [] if n is None else inorder(n.left) + [n.val] + inorder(n.right)


def height(n):
    if n is None:
        return 0
    return 1 + max(height(n.left), height(n.right))


root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(inorder(root))
print(height(root))
`,
        java: javaClass(`    static class Node {
        int val; Node left, right;
        Node(int val, Node left, Node right) { this.val = val; this.left = left; this.right = right; }
    }

    static int height(Node n) {
        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));
    }

    public static void main(String[] args) {
        Node root = new Node(1, new Node(2, new Node(4, null, null), new Node(5, null, null)), new Node(3, null, null));
        System.out.println(height(root));
    }`),
      },
    },
    '2.4.2': {
      body: b242,
      starter: {
        python: `from collections import deque


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right


def levels(root):
    if root is None:
        return []
    out, queue = [], deque([root])
    while queue:
        row = []
        for _ in range(len(queue)):
            node = queue.popleft()
            row.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        out.append(row)
    return out


root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(levels(root))
`,
        java: javaClass(`    public static void main(String[] args) {
        // Level-order needs a queue: java.util.ArrayDeque works well.
        java.util.Deque<Integer> queue = new java.util.ArrayDeque<>();
        queue.add(1);
        queue.add(2);
        System.out.println(queue.poll() + " " + queue.peek());
    }`),
      },
    },
    '2.4.3': {
      body: b243,
      starter: {
        python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root


def inorder(n):
    return [] if n is None else inorder(n.left) + [n.key] + inorder(n.right)


root = None
for k in [50, 30, 70, 20, 40, 60, 80]:
    root = insert(root, k)
print(inorder(root))
`,
        java: javaClass(`    static java.util.TreeMap<Integer, String> tree = new java.util.TreeMap<>();

    public static void main(String[] args) {
        tree.put(50, "a"); tree.put(30, "b"); tree.put(70, "c");
        System.out.println(tree.firstKey() + " " + tree.ceilingKey(40));
    }`),
      },
    },
    '2.4.4': {
      body: b244,
      starter: {
        python: `import heapq

tasks = []
heapq.heappush(tasks, (2, "write report"))
heapq.heappush(tasks, (1, "fix outage"))
heapq.heappush(tasks, (3, "plan lunch"))

while tasks:
    priority, name = heapq.heappop(tasks)
    print(priority, name)
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.PriorityQueue<Integer> pq = new java.util.PriorityQueue<>();
        pq.add(5); pq.add(1); pq.add(3);
        while (!pq.isEmpty()) System.out.println(pq.poll());
    }`),
      },
    },
    '2.4.5': {
      body: b245,
      starter: {
        python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.is_word = True

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            node = node.children.get(ch)
            if node is None:
                return False
        return True


t = Trie()
for w in ["car", "card", "dog"]:
    t.insert(w)
print(t.starts_with("ca"), t.starts_with("cat"))
`,
        java: javaClass(`    static class Trie {
        java.util.Map<Character, Trie> next = new java.util.HashMap<>();
        boolean word;
    }

    public static void main(String[] args) {
        Trie root = new Trie();
        Trie node = root;
        for (char c : "car".toCharArray()) {
            node.next.putIfAbsent(c, new Trie());
            node = node.next.get(c);
        }
        node.word = true;
        System.out.println(root.next.containsKey('c'));
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Which node has no children?', ['The root', 'A leaf', 'The parent', 'The sibling'], 1, 'A node with no children is a leaf.'),
      q('What is the base case of most recursive tree functions?', ['A node with two children', 'node is None', 'The root', 'A leaf with value 0'], 1, 'The empty tree is the smallest case, and everything else combines the answers of the left and right subtrees.'),
      q('Which traversal visits a node between its left and right subtrees?', ['Preorder', 'Inorder', 'Postorder', 'Level-order'], 1, 'Inorder goes left, node, right.'),
      q('Which structure drives level-order (breadth-first) traversal?', ['A stack', 'A queue', 'A heap', 'A set'], 1, 'First in, first out finishes a whole level before the next one begins.'),
      q('In a level-order loop, why read `len(queue)` before processing the level?', ['To avoid an error', 'It is the number of nodes in the current level', 'It is the tree height', 'The queue is always full'], 1, 'Children are added while you work, so the size must be frozen first.'),
      q('Why does serialization record `#` for missing children?', ['To make the text longer', 'Without it, different tree shapes could produce the same text', 'Python requires it', 'To sort the nodes'], 1, 'The markers keep enough information to rebuild the exact shape.'),
      q('What does inorder traversal of a binary search tree produce?', ['Random order', 'Keys in ascending order', 'Keys in descending order', 'Only the leaves'], 1, 'Left is smaller, right is larger, so left-node-right is sorted.'),
      q('What happens to a BST if you insert 1, 2, 3, ... n in order?', ['It stays balanced', 'It becomes a chain with height n', 'It rejects duplicates', 'It sorts itself'], 1, 'Every new key goes to the right, so the tree degenerates into a linked list and operations cost O(n).'),
      q('Which item does `heapq` return first from `heappop`?', ['The largest', 'The smallest', 'The newest', 'The oldest'], 1, '`heapq` is a min-heap. Negate values to get a max-heap.'),
      q('What does a trie let you do quickly that a set of words does not?', ['Exact lookups', 'Find all words that start with a prefix', 'Sort numbers', 'Count characters'], 1, 'Walking to the prefix node costs only the prefix length, and everything below it shares that prefix.'),
    ],
  },

  project: {
    title: 'Tree Workshop',
    body: projectBody,
    starter: {
      python: `import heapq
from collections import deque


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def height(root):
    pass


def level_order(root):
    pass


def inorder_iter(root):
    pass


def is_valid_bst(root):
    pass


def serialize(root):
    pass


def deserialize(text):
    pass


def top_k_frequent(words, k):
    pass


def merge_k_sorted(lists):
    pass


class Trie:
    def insert(self, word):
        pass

    def contains(self, word):
        pass

    def starts_with(self, prefix):
        pass

    def complete(self, prefix, limit=5):
        pass


class MedianFinder:
    def add(self, x):
        pass

    def median(self):
        pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import random, time

def timed(fn, *a, limit=2.5):
    if not callable(fn):
        return None, False
    start = time.perf_counter()
    try:
        result = fn(*a)
    except Exception:
        return None, True
    return result, (time.perf_counter() - start) <= limit

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

TN = ns.get("TreeNode")
check("TreeNode is still defined", callable(TN), "keep the starter class")

def build(vals):
    # level-order list with None for missing children
    if not vals or vals[0] is None:
        return None
    root = TN(vals[0])
    q = deque([root])
    i = 1
    while q and i < len(vals):
        node = q.popleft()
        if i < len(vals) and vals[i] is not None:
            node.left = TN(vals[i]); q.append(node.left)
        i += 1
        if i < len(vals) and vals[i] is not None:
            node.right = TN(vals[i]); q.append(node.right)
        i += 1
    return root

def levels_ref(root):
    out, q = [], deque([root] if root else [])
    while q:
        row = []
        for _ in range(len(q)):
            n = q.popleft(); row.append(n.val)
            q.extend(c for c in (n.left, n.right) if c)
        out.append(row)
    return out

def shape(root):
    if root is None:
        return None
    return (root.val, shape(root.left), shape(root.right))

from collections import deque

if callable(TN):
    trees = [[], [1], [3, 9, 20, None, None, 15, 7], [1, 2, 3, 4, 5, None, None, 6]]
    check("height", [call("height", build(t)) for t in trees] == [0, 1, 3, 4], "1 + the larger child height, and 0 for an empty tree")
    check("level_order", [call("level_order", build(t)) for t in trees] == [levels_ref(build(t)) for t in trees], "a queue, and read len(queue) at the start of each level")
    check("inorder_iter", [call("inorder_iter", build(t)) for t in ([4, 2, 6, 1, 3, 5, 7], [2, 1, 3], [1])] == [[1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1]], "go left as far as you can, pop, then go right. Use a stack, not recursion")
    check("is_valid_bst", [call("is_valid_bst", build(t)) for t in ([2, 1, 3], [5, 1, 4, None, None, 3, 6], [10, 5, 15, None, None, 6, 20], [], [1])] == [True, False, False, True, True], "pass the allowed (low, high) range down to each child")
    chain = None
    for i in range(100000):
        chain = TN(i, chain)
    r, ok = timed(ns.get("height"), chain)
    check("height handles a 100,000-node chain", ok and r == 100000, "recursion is too deep here: use a loop with a stack or a queue")
    r, ok = timed(ns.get("inorder_iter"), chain)
    check("inorder_iter handles a 100,000-node chain", ok and isinstance(r, list) and len(r) == 100000, "no recursion allowed")
    big = build(list(range(1, 60001)))
    r, ok = timed(ns.get("level_order"), big)
    check("level_order on 60,000 nodes", ok and r == levels_ref(big), "use deque.popleft(), not list.pop(0)")

    ser, de = ns.get("serialize"), ns.get("deserialize")
    ok_all = callable(ser) and callable(de)
    if ok_all:
        good = True
        try:
            for t in trees + [[5, 3, 8, 1, 4, 7, 9], [1, None, 2, None, 3]]:
                root = build(t)
                text = ser(root)
                back = de(text)
                if not isinstance(text, str) or shape(back) != shape(root):
                    good = False
        except Exception:
            good = False
        check("serialize and deserialize round trip", good, "write missing children as a marker such as #, and read the tokens in the same order")
        try:
            a = ser(build([1, 2, None, 3]))
            b = ser(build([1, None, 2, 3]))
            check("different trees give different text", a != b, "the marker for a missing child keeps the shape")
        except Exception:
            check("different trees give different text", False, "serialize must return a string")
    else:
        check("serialize and deserialize round trip", False, "define both serialize and deserialize")

words = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"]
check("top_k_frequent", [call("top_k_frequent", words, 2), call("top_k_frequent", ["b", "a", "b", "a", "c"], 2), call("top_k_frequent", ["x"], 1)] == [["the", "is"], ["a", "b"], ["x"]], "count with Counter, then a heap. Sort ties alphabetically")
rnd = random.Random(7)
many = [str(rnd.randint(0, 5000)) for _ in range(200000)]
r, ok = timed(ns.get("top_k_frequent"), many, 5)
from collections import Counter
cnt = Counter(many)
exp = [w for w, c in sorted(cnt.items(), key=lambda kv: (-kv[1], kv[0]))[:5]]
check("top_k_frequent on 200,000 words", ok and r == exp, "Counter plus heapq, not a full sort per word")

check("merge_k_sorted", [call("merge_k_sorted", ls) for ls in ([[1, 4, 5], [1, 3, 4], [2, 6]], [], [[]], [[], [1], []], [[5], [1], [3]])] == [[1, 1, 2, 3, 4, 4, 5, 6], [], [], [1], [1, 3, 5]], "a heap holding (value, list index, position)")
lists = [sorted(rnd.randint(0, 10**6) for _ in range(2000)) for _ in range(50)]
r, ok = timed(ns.get("merge_k_sorted"), lists)
flat = sorted(x for l in lists for x in l)
check("merge_k_sorted on 100,000 items", ok and r == flat, "heapq.merge or your own heap: O(n log k)")

T = ns.get("Trie")
if callable(T):
    try:
        t = T()
        for w in ["car", "card", "care", "dog", "do"]:
            t.insert(w)
        a = [t.contains("car"), t.contains("ca"), t.contains("do"), t.contains("dot")]
        b = [t.starts_with("ca"), t.starts_with("cat"), t.starts_with("d"), t.starts_with("")]
        c1 = t.complete("car")
        c2 = t.complete("d")
        c3 = t.complete("x")
        c4 = t.complete("c", 2)
    except Exception:
        a = b = c1 = c2 = c3 = c4 = None
    check("Trie contains", a == [True, False, True, False], "mark the node where a word ends")
    check("Trie starts_with", b == [True, False, True, True], "a prefix only needs the path to exist")
    check("Trie complete", c1 == ["car", "card", "care"] and c2 == ["do", "dog"] and c3 == [] and c4 == ["car", "card"], "walk to the prefix, then DFS in alphabetical order and stop at limit")
    try:
        t = T()
        words2 = ["w" + str(i) + "x" * (i % 5) for i in range(40000)]
        start = time.perf_counter()
        for w in words2:
            t.insert(w)
        good = all(t.contains(w) for w in words2[::97]) and t.starts_with("w39999") and not t.starts_with("zz")
        good = good and time.perf_counter() - start < 2.5
    except Exception:
        good = False
    check("Trie with 40,000 words", good, "each node holds a dict of children")
else:
    check("Trie", False, "define class Trie")

MF = ns.get("MedianFinder")
if callable(MF):
    try:
        m = MF()
        got = []
        for x in [5, 15, 1, 3]:
            m.add(x)
            got.append(m.median())
    except Exception:
        got = None
    check("MedianFinder", got == [5, 10.0, 5, 4.0], "a max-heap for the smaller half and a min-heap for the larger half")
    start = time.perf_counter()
    try:
        m = MF()
        data = [rnd.randint(0, 10**6) for _ in range(60000)]
        for x in data:
            m.add(x)
        s = sorted(data)
        good = m.median() == (s[29999] + s[30000]) / 2 and time.perf_counter() - start < 2.5
    except Exception:
        good = False
    check("MedianFinder with 60,000 numbers", good, "O(log n) per add. Do not re-sort every time")
else:
    check("MedianFinder", False, "define class MedianFinder")`,
  },
};
