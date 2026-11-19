# Project: Tree Workshop

Ten tools that put the whole module to work: binary trees, traversals, serialization, search trees, heaps and tries. The tree tools must survive a **100,000-node chain**, so recursion is out there. The heap and trie tools are timed on tens of thousands of items.

The starter gives you a `TreeNode` class (`val`, `left`, `right`). Keep it: the checks build their trees with it.

## The functions

**1. `height(root)`** returns the number of levels in the tree (0 for an empty tree, 1 for a single node). It must handle a 100,000-node chain, so use a loop.

**2. `level_order(root)`** returns a list of lists, one per level, left to right. Use a queue.

**3. `inorder_iter(root)`** returns the inorder values with an explicit stack and no recursion.

**4. `is_valid_bst(root)`** returns `True` if the tree is a valid binary search tree with strictly increasing inorder values. Pass an allowed range down: checking only parent and child is not enough.

**5. `serialize(root)` and `deserialize(text)`** turn a tree into a string and back. `deserialize(serialize(t))` must have the same shape and values as `t`, and two different trees must never give the same string. Values are integers.

**6. `top_k_frequent(words, k)`** returns the `k` most frequent words, most frequent first, breaking ties alphabetically.

**7. `merge_k_sorted(lists)`** merges `k` sorted lists into one sorted list in O(n log k). Empty lists are allowed.

**8. `class Trie`** with `insert(word)`, `contains(word)`, `starts_with(prefix)` (true for the empty prefix) and `complete(prefix, limit=5)`, which returns up to `limit` words that start with `prefix`, in alphabetical order.

**9. `class MedianFinder`** with `add(x)` and `median()`. The median of an even count is the average of the two middle values. Each `add` must be O(log n).

> **Tip:** Before each function, name the structure: a queue, a stack, a range, a marker, a heap, a trie node. Then the code nearly writes itself.

> **Watch out:** `height` and `inorder_iter` are tested on a chain 100,000 nodes deep. Python's recursion limit will stop a recursive version.

## Stretch goals

- Add `delete(word)` to the `Trie`.
- Write `lowest_common_ancestor(root, p, q)` for a general binary tree.
- Make `MedianFinder.median()` raise a clear error when it is empty.

## Hints

+++ Tree hints
`height` and `level_order` are the same loop: process one level of the queue per round. `inorder_iter`: `while cur or stack`, push left children until `None`, pop, record, then move to the right child. For `is_valid_bst`, use an explicit stack of `(node, low, high)` too.
+++

+++ Serialization hints
Use level-order with a queue, writing `#` for each missing child, joined by commas. To read it back, take tokens in the same order: each real node consumes the next two tokens as its left and right children. Trim trailing `#` markers if you like.
+++

+++ Heap and trie hints
`top_k_frequent`: `Counter`, then `heapq.nsmallest(k, counts, key=lambda w: (-counts[w], w))`. `MedianFinder`: keep a max-heap (negated values) for the lower half and a min-heap for the upper half, with sizes differing by at most one. `Trie.complete`: walk to the prefix node, then DFS through `sorted(node.children)`.
+++

+++ Full solution
```python
import heapq
from collections import Counter, deque


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def height(root):
    if root is None:
        return 0
    levels, queue = 0, deque([root])
    while queue:
        levels += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return levels


def level_order(root):
    out, queue = [], deque([root] if root else [])
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


def inorder_iter(root):
    out, stack, cur = [], [], root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        out.append(cur.val)
        cur = cur.right
    return out


def is_valid_bst(root):
    stack = [(root, float("-inf"), float("inf"))] if root else []
    while stack:
        node, low, high = stack.pop()
        if not low < node.val < high:
            return False
        if node.left:
            stack.append((node.left, low, node.val))
        if node.right:
            stack.append((node.right, node.val, high))
    return True


def serialize(root):
    out, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        if node is None:
            out.append("#")
            continue
        out.append(str(node.val))
        queue.append(node.left)
        queue.append(node.right)
    while out and out[-1] == "#":
        out.pop()
    return ",".join(out)


def deserialize(text):
    if not text:
        return None
    parts = text.split(",")
    root = TreeNode(int(parts[0]))
    queue, i = deque([root]), 1
    while queue and i < len(parts):
        node = queue.popleft()
        if i < len(parts) and parts[i] != "#":
            node.left = TreeNode(int(parts[i]))
            queue.append(node.left)
        i += 1
        if i < len(parts) and parts[i] != "#":
            node.right = TreeNode(int(parts[i]))
            queue.append(node.right)
        i += 1
    return root


def top_k_frequent(words, k):
    counts = Counter(words)
    return heapq.nsmallest(k, counts, key=lambda w: (-counts[w], w))


def merge_k_sorted(lists):
    heap = [(l[0], i, 0) for i, l in enumerate(lists) if l]
    heapq.heapify(heap)
    out = []
    while heap:
        value, i, pos = heapq.heappop(heap)
        out.append(value)
        if pos + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][pos + 1], i, pos + 1))
    return out


class _Node:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = _Node()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, _Node())
        node.is_word = True

    def _walk(self, text):
        node = self.root
        for ch in text:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def contains(self, word):
        node = self._walk(word)
        return node is not None and node.is_word

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def complete(self, prefix, limit=5):
        node = self._walk(prefix)
        out = []
        if node is None:
            return out

        def collect(n, path):
            if len(out) >= limit:
                return
            if n.is_word:
                out.append(prefix + path)
            for ch in sorted(n.children):
                collect(n.children[ch], path + ch)

        collect(node, "")
        return out


class MedianFinder:
    def __init__(self):
        self.low = []
        self.high = []

    def add(self, x):
        heapq.heappush(self.low, -x)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2
```
+++
