// ─── The Trials of Algor: LeetCode & DSA Mastery (Modules 5–8) ─────────────
// Part 2: Advanced Trials — Trees, Heaps, Graphs, Backtracking & DP

export const phase3Content = {
  "week-9": {
    "lessons": [
      {
        "title": "Binary Tree Topologies & Call-Stack Recursion",
        "language": "java",
        "starterCode": "class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) { this.val = val; }\n}\n\npublic class TreeDemo {\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(3);\n        System.out.println(\"Root: \" + root.val + \", Left: \" + root.left.val + \", Right: \" + root.right.val);\n    }\n}",
        "content": "\n<h2>🌳 Chapter 12: The Tree of Nodes — Binary Trees</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Ascend from linear sequences into hierarchical branching structures. Binary trees govern file systems, database indices, compilers (ASTs), and game AI. Learn how recursive call-stacks navigate bifurcating trees.</em>\n</div>\n\n<h3>Binary Tree Topology in Heap Memory</h3>\n\n<pre class=\"ascii-diagram\">\n                       [ Root Node: 1 ]\n                      /                \\\n                     v                  v\n             [ Left Child: 2 ]    [ Right Child: 3 ]\n             /               \\\n            v                 v\n      [ Leaf: 4 ]       [ Leaf: 5 ]\n</pre>\n\n<p>Every node contains a payload value and two pointers: <code>left</code> and <code>right</code>. A node with both pointers set to <code>null</code> is a <strong>Leaf</strong>.</p>\n        "
      },
      {
        "title": "Tree Traversals: DFS (Pre, In, Post) vs BFS (Level-Order)",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class TreeTraversals {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    // DFS - Inorder (Left, Root, Right)\n    public static void inOrder(TreeNode root) {\n        if (root == null) return;\n        inOrder(root.left);\n        System.out.print(root.val + \" \");\n        inOrder(root.right);\n    }\n\n    // BFS - Level Order\n    public static void levelOrder(TreeNode root) {\n        if (root == null) return;\n        Queue<TreeNode> queue = new ArrayDeque<>();\n        queue.offer(root);\n        while (!queue.isEmpty()) {\n            TreeNode curr = queue.poll();\n            System.out.print(curr.val + \" \");\n            if (curr.left != null) queue.offer(curr.left);\n            if (curr.right != null) queue.offer(curr.right);\n        }\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(3);\n        System.out.print(\"Inorder: \"); inOrder(root); System.out.println();\n        System.out.print(\"Level-Order: \"); levelOrder(root); System.out.println();\n    }\n}",
        "content": "\n<h2>🧭 Chapter 13: Traversing the Branches — DFS vs BFS</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Traversing non-linear trees requires systematic visitation orders. Compare Depth-First Search (DFS) using the recursion call-stack with Breadth-First Search (BFS) using a FIFO queue.</em>\n</div>\n\n<h3>The Three Sacred DFS Traversals</h3>\n<ul>\n  <li><strong>Pre-order (Root → Left → Right):</strong> Visits parents before children. Used to clone or serialize trees to disk.</li>\n  <li><strong>In-order (Left → Root → Right):</strong> For Binary Search Trees (BST), in-order traversal yields nodes in <strong>strictly ascending sorted order</strong>!</li>\n  <li><strong>Post-order (Left → Right → Root):</strong> Computes child dependencies first before processing the parent (e.g. calculating subtree depth or freeing memory).</li>\n</ul>\n        "
      },
      {
        "title": "Binary Search Tree (BST) Invariants & Validation",
        "language": "java",
        "starterCode": "public class BSTDemo {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static boolean isValidBST(TreeNode root, Long min, Long max) {\n        if (root == null) return true;\n        if (root.val <= min || root.val >= max) return false;\n        return isValidBST(root.left, min, (long)root.val) && \n               isValidBST(root.right, (long)root.val, max);\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(5);\n        root.left = new TreeNode(3);\n        root.right = new TreeNode(7);\n        System.out.println(\"Is Valid BST: \" + isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE));\n    }\n}",
        "content": "\n<h2>⚖️ Chapter 14: The BST Invariant & Ancestral Bounds</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>A Binary Search Tree preserves O(log N) lookup time only if every single node in the left subtree is strictly less than its ancestor, and every node in the right subtree is strictly greater.</em>\n</div>\n\n<div class=\"callout callout--warn\">\n  <strong>⚠️ The Classic BST Interview Trap:</strong>\n  Checking only <code>node.left.val &lt; node.val</code> is insufficient! Consider:\n  <pre class=\"ascii-diagram\">\n        5\n       / \\\n      3   7\n         /\n        4  <-- BUG! 4 &lt; 7 is locally valid, but 4 is in 5's right subtree (4 &lt; 5)!\n  </pre>\n  You must thread <strong>ancestral [min, max] ranges</strong> down every recursive call frame.\n</div>\n        "
      },
      {
        "title": "Lowest Common Ancestor (LCA) in BST & Binary Trees",
        "language": "java",
        "starterCode": "class TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class LCA {\n    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        if (root == null || root == p || root == q) return root;\n        TreeNode left = lowestCommonAncestor(root.left, p, q);\n        TreeNode right = lowestCommonAncestor(root.right, p, q);\n        if (left != null && right != null) return root; // p and q are in different subtrees\n        return (left != null) ? left : right;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Lowest Common Ancestor & Post-Order Bubble-Up</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Two combatants are scattered deep within the branches of the world tree. Find the lowest ancestral node that commands both warriors!</em>\n</div>\n\n<p>In general binary trees, post-order traversal bubbles up search results from leaves to root. If a node discovers <code>p</code> in one branch and <code>q</code> in the other, it is unmistakably the Lowest Common Ancestor (LeetCode 236).</p>\n"
      },
      {
        "title": "Tree Path Sums, Diameter & Tree Dynamic Programming",
        "language": "java",
        "starterCode": "public class MaxPathSum {\n    private int maxSum = Integer.MIN_VALUE;\n\n    public int maxPathSum(TreeNode root) {\n        maxGain(root);\n        return maxSum;\n    }\n\n    private int maxGain(TreeNode node) {\n        if (node == null) return 0;\n        int leftGain = Math.max(maxGain(node.left), 0);\n        int rightGain = Math.max(maxGain(node.right), 0);\n        int currentTurn = node.val + leftGain + rightGain;\n        maxSum = Math.max(maxSum, currentTurn);\n        return node.val + Math.max(leftGain, rightGain);\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Binary Tree Path Sums & Turning Point Optimization</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Find the maximum path sum between ANY two nodes in a tree (LeetCode 124 Hard). A path may turn once at an apex node, but can only propagate one branch upward to its ancestor!</em>\n</div>\n\n<p>This is the quintessential <strong>Tree Dynamic Programming</strong> pattern: at each node, we compute the local turning path <code>leftGain + node.val + rightGain</code> to update the global champion, while returning <code>node.val + max(leftGain, rightGain)</code> to the caller.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #104: Maximum Depth of Binary Tree",
        "language": "java",
        "starterCode": "public class MaxDepthTree {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        root.right.left = new TreeNode(15);\n        root.right.right = new TreeNode(7);\n        System.out.println(\"Max Depth: \" + maxDepth(root));\n    }\n}",
        "expectedOutput": "Max Depth: 3",
        "description": "\n<h2>LeetCode #104: Maximum Depth of Binary Tree</h2>\n<p>Given the root of a binary tree, return its maximum depth.</p>\n<p>Use simple recursion: if the node is null, depth is 0; otherwise, depth is <code>1 + max(depth(left), depth(right))</code>.</p>\n",
        "hints": [
          "Base case: if root is null, return 0. Recursive step: 1 + Math.max(maxDepth(root.left), maxDepth(root.right))."
        ]
      },
      {
        "title": "LeetCode #226: Invert Binary Tree",
        "language": "java",
        "starterCode": "public class InvertTree {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(4);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(7);\n        invertTree(root);\n        System.out.println(\"Root left: \" + root.left.val + \", Root right: \" + root.right.val);\n    }\n}",
        "expectedOutput": "Root left: 7, Root right: 2",
        "description": "\n<h2>LeetCode #226: Invert Binary Tree</h2>\n<p>Invert a binary tree (mirror it left to right) and return its root.</p>\n<p>At each node, recursively invert the left and right subtrees, then swap the node's left and right child pointers.</p>\n",
        "hints": [
          "Store root.left in a temporary variable, assign root.left = invertTree(root.right), and assign root.right = invertTree(temp)."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which traversal of a Binary Search Tree (BST) produces nodes in ascending sorted order?",
        "options": [
          "Pre-order",
          "In-order",
          "Post-order",
          "Level-order"
        ],
        "correctIndex": 1,
        "explanation": "In-order traversal visits Left Subtree -> Root -> Right Subtree, which mirrors the BST invariant of left < root < right."
      },
      {
        "question": "What is the time complexity of searching in a balanced BST vs a skewed BST?",
        "options": [
          "O(log N) for both",
          "O(1) balanced, O(N) skewed",
          "O(log N) balanced, O(N) skewed",
          "O(N) balanced, O(log N) skewed"
        ],
        "correctIndex": 2,
        "explanation": "A balanced BST halves the search space at each node (O(log N)), but a completely skewed tree degrades into a linked list (O(N))."
      }
    ],
    "project": false
  },
  "week-10": {
    "lessons": [
      {
        "title": "Binary Heap Mechanics: Array Representation",
        "language": "java",
        "starterCode": "public class HeapIndexing {\n    public static void main(String[] args) {\n        // Complete binary tree stored in 0-indexed array\n        int[] heap = {10, 15, 30, 40, 50, 100, 40};\n        int i = 1; // Element 15\n        int parent = (i - 1) / 2;\n        int leftChild = 2 * i + 1;\n        int rightChild = 2 * i + 2;\n        System.out.println(\"Node: \" + heap[i] + \", Parent: \" + heap[parent] + \", Left: \" + heap[leftChild] + \", Right: \" + heap[rightChild]);\n    }\n}",
        "content": "\n<h2>🏔️ Chapter 15: The Mountain of Heaps — Complete Trees</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Heaps allow constant O(1) access to extreme values (min or max) while supporting O(log N) insertions. And astonishingly, they require ZERO pointers, packing entirely into flat arrays!</em>\n</div>\n\n<h3>Array Arithmetic for Complete Trees</h3>\n<p>For any node at index <code>i</code> in a 0-indexed array:</p>\n<pre class=\"ascii-diagram\">\nParent Index:      parent = (i - 1) / 2\nLeft Child Index:  left   = 2 * i + 1\nRight Child Index: right  = 2 * i + 2\n</pre>\n        "
      },
      {
        "title": "The Top-K Elements Pattern & Min-Heap Eviction",
        "language": "java",
        "starterCode": "import java.util.PriorityQueue;\n\npublic class TopKDemo {\n    public static int findKthLargest(int[] nums, int k) {\n        // Min-Heap to maintain the k largest elements\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int num : nums) {\n            minHeap.offer(num);\n            if (minHeap.size() > k) {\n                minHeap.poll(); // Evict smallest of the top candidates\n            }\n        }\n        return minHeap.peek();\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {3, 2, 1, 5, 6, 4};\n        System.out.println(\"3rd Largest: \" + findKthLargest(nums, 3));\n    }\n}",
        "content": "\n<h2>👑 Chapter 16: The Top-K Elements Pattern</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Finding the K largest elements in a stream of N items by sorting takes O(N log N). Maintaining a bounded Min-Heap of size K does it in O(N log K) time!</em>\n</div>\n\n<p>By keeping only <code>k</code> elements in a Min-Heap, the smallest element among the current top contenders sits at the root (<code>peek()</code>). When a new element arrives, if it is larger than the root, we evict the root in <code>O(log K)</code> time.</p>\n        "
      },
      {
        "title": "Merge K Sorted Lists via Min-Heap Priority Queue",
        "language": "java",
        "starterCode": "import java.util.PriorityQueue;\n\npublic class MergeKLists {\n    public static ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode node : lists) {\n            if (node != null) pq.offer(node);\n        }\n        ListNode dummy = new ListNode(0), tail = dummy;\n        while (!pq.isEmpty()) {\n            ListNode minNode = pq.poll();\n            tail.next = minNode;\n            tail = tail.next;\n            if (minNode.next != null) pq.offer(minNode.next);\n        }\n        return dummy.next;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Merging K Sorted Streams via Min-Heap</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Zipping 1,000 sorted telemetry feeds naively takes O(K × N) time. A Min-Heap with capacity K tracks the global minimum across all active stream heads in O(N log K) time!</em>\n</div>\n\n<p>Every extraction removes the smallest current node across all <code>K</code> lists, and enqueues that node's successor. The heap size never exceeds <code>K</code>, guaranteeing optimal logarithmic steps per node.</p>\n"
      },
      {
        "title": "Two-Heaps Architecture: Finding Median from Data Stream",
        "language": "java",
        "starterCode": "import java.util.Collections;\nimport java.util.PriorityQueue;\n\npublic class MedianFinder {\n    private PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // Small half\n    private PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Large half\n\n    public void addNum(int num) {\n        maxHeap.offer(num);\n        minHeap.offer(maxHeap.poll());\n        if (maxHeap.size() < minHeap.size()) {\n            maxHeap.offer(minHeap.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();\n        return (maxHeap.peek() + minHeap.peek()) / 2.0;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: The Dual-Heap Dynamic Median Filter</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Values stream into your system continuously from high-frequency sensors. How can you report the exact median in O(1) time after each incoming number?</em>\n</div>\n\n<p>The <strong>Two-Heaps Pattern</strong> balances two heaps against each other:</p>\n<pre class=\"ascii-diagram\">\n      [MAX-HEAP]                 [MIN-HEAP]\n (Stores lower half)        (Stores upper half)\n  [ 5,  4,  2,  1 ]          [ 8,  9, 12, 15 ]\n          ^                         ^\n      peek(): 5                 peek(): 8\nMedian is (5 + 8) / 2 = 6.5!\n</pre>\n"
      },
      {
        "title": "Task Scheduler & Greedy Heap Strategies",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class TaskScheduler {\n    public static int leastInterval(char[] tasks, int n) {\n        int[] counts = new int[26];\n        int maxCount = 0, maxCountTasks = 0;\n        for (char c : tasks) {\n            counts[c - 'A']++;\n            if (counts[c - 'A'] > maxCount) {\n                maxCount = counts[c - 'A'];\n                maxCountTasks = 1;\n            } else if (counts[c - 'A'] == maxCount) {\n                maxCountTasks++;\n            }\n        }\n        int partCount = maxCount - 1;\n        int partLength = n - (maxCountTasks - 1);\n        int emptySlots = partCount * partLength;\n        int availableTasks = tasks.length - maxCount * maxCountTasks;\n        int idles = Math.max(0, emptySlots - availableTasks);\n        return tasks.length + idles;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Greedy Scheduling & Cooldown Queue Mechanics</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>CPU tasks require a cooldown of N ticks between identical task types. Minimize total execution cycles and idle slots using greedy frequency scheduling!</em>\n</div>\n\n<p>The task with the highest frequency dictates the minimum frame size. We schedule the most constrained elements first and fill the intermediate cooling slots with secondary tasks or CPU idle ticks.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #215: Kth Largest Element in an Array",
        "language": "java",
        "starterCode": "import java.util.PriorityQueue;\n\npublic class KthLargest {\n    public static int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int val : nums) {\n            pq.offer(val);\n            if (pq.size() > k) {\n                pq.poll();\n            }\n        }\n        return pq.peek();\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {3, 2, 3, 1, 2, 4, 5, 5, 6};\n        System.out.println(\"4th Largest: \" + findKthLargest(arr, 4));\n    }\n}",
        "expectedOutput": "4th Largest: 4",
        "description": "\n<h2>LeetCode #215: Kth Largest Element</h2>\n<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>-th largest element in the array.</p>\n<p>Solve this in O(N log K) time using a Min-Heap of capacity K.</p>\n",
        "hints": [
          "Use a Min-Heap (PriorityQueue). Push each number. If size > k, poll(). The top of the heap is the answer."
        ]
      },
      {
        "title": "LeetCode #347: Top K Frequent Elements",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n\n        PriorityQueue<Integer> heap = new PriorityQueue<>(\n            (a, b) -> count.get(a) - count.get(b)\n        );\n\n        for (int n : count.keySet()) {\n            heap.offer(n);\n            if (heap.size() > k) heap.poll();\n        }\n\n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = heap.poll();\n        return res;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 1, 1, 2, 2, 3};\n        int[] res = topKFrequent(nums, 2);\n        System.out.println(\"Top 2: \" + res[0] + \" and \" + res[1]);\n    }\n}",
        "expectedOutput": "Top 2: 2 and 1",
        "description": "\n<h2>LeetCode #347: Top K Frequent Elements</h2>\n<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements in any order.</p>\n<p>Build a frequency map, then use a Min-Heap ordered by frequency <code>(a, b) -> count.get(a) - count.get(b)</code> maintaining size K.</p>\n",
        "hints": [
          "Count frequencies in a map. Use a PriorityQueue of size k comparing map frequencies."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why does finding the K largest elements use a Min-Heap rather than a Max-Heap?",
        "options": [
          "Because Max-Heaps are not supported in Java",
          "Because a Min-Heap of size K lets us evict the smallest candidate in O(log K) time, keeping the top K intact",
          "Because Min-Heaps use less memory than Max-Heaps",
          "Because PriorityQueue defaults to Max-Heap"
        ],
        "correctIndex": 1,
        "explanation": "In a Min-Heap of size K, the root is the smallest of the top K items. Whenever a new number is larger than the root, we evict the root in O(log K) time."
      }
    ],
    "project": false
  },
  "week-11": {
    "lessons": [
      {
        "title": "Graph Topologies & Adjacency Representations",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class GraphBasics {\n    public static void main(String[] args) {\n        // Adjacency List: Map<Integer, List<Integer>>\n        Map<Integer, List<Integer>> graph = new HashMap<>();\n        graph.put(0, Arrays.asList(1, 2));\n        graph.put(1, Arrays.asList(2));\n        graph.put(2, Arrays.asList(0, 3));\n        graph.put(3, Arrays.asList(3));\n\n        System.out.println(\"Neighbors of Node 0: \" + graph.get(0));\n    }\n}",
        "content": "\n<h2>🕸️ Chapter 17: The Realm of Graphs — Networks & Edges</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Graphs model social networks, city street grids, compiler dependencies, and internet routing. Unlike trees, graphs can contain cycles. Master adjacency representations and visited guards.</em>\n</div>\n\n<h3>Adjacency List vs Adjacency Matrix</h3>\n<table class=\"lesson-table\">\n  <thead><tr><th>Feature</th><th>Adjacency Matrix (V x V)</th><th>Adjacency List (V + E)</th></tr></thead>\n  <tbody>\n    <tr><td>Memory Footprint</td><td>O(V²) — Severe for sparse graphs</td><td>O(V + E) — Optimal memory</td></tr>\n    <tr><td>Edge Lookup (u → v)</td><td>O(1) instant lookup</td><td>O(degree(u)) search through neighbors</td></tr>\n    <tr><td>Iterate Neighbors</td><td>O(V) scan across entire row</td><td>O(degree(u)) direct neighbor iteration</td></tr>\n  </tbody>\n</table>\n        "
      },
      {
        "title": "Topological Sort: Kahn's In-Degree Algorithm",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class KahnAlgo {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.offer(i);\n        }\n\n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n            for (int neighbor : adj.get(curr)) {\n                if (--inDegree[neighbor] == 0) queue.offer(neighbor);\n            }\n        }\n        return count == numCourses;\n    }\n\n    public static void main(String[] args) {\n        int[][] prereqs = {{1, 0}};\n        System.out.println(\"Can finish 2 courses: \" + canFinish(2, prereqs));\n    }\n}",
        "content": "\n<h2>⛓️ Chapter 18: Topological Sort & Kahn's In-Degree Algorithm</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>When tasks have prerequisites (like university courses or build systems like Maven/Gradle), we must linearize tasks in valid execution order. If a circular dependency exists (A requires B which requires A), Kahn's algorithm catches it!</em>\n</div>\n\n<pre class=\"ascii-diagram\">\nDAG (Directed Acyclic Graph):\nCourse 0 (In-degree 0) ---> Course 1 (In-degree 1) ---> Course 2 (In-degree 1)\n\nKahn Algorithm Execution:\n1. Enqueue nodes with in-degree == 0: Queue = [0]\n2. Poll 0. Decrement Course 1 in-degree: 1 - 1 = 0! Enqueue 1.\n3. Poll 1. Decrement Course 2 in-degree: 1 - 1 = 0! Enqueue 2.\n4. Total processed = 3 == totalCourses. Valid topological sequence!\n</pre>\n        "
      },
      {
        "title": "Breadth-First Search: Shortest Path in Unweighted Mazes",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class ShortestPathBFS {\n    private static final int[][] DIRS = {{0,1},{1,0},{0,-1},{-1,0}};\n\n    public static int shortestPath(int[][] grid) {\n        int m = grid.length, n = grid[0].length;\n        if (grid[0][0] == 1 || grid[m-1][n-1] == 1) return -1;\n        Queue<int[]> q = new ArrayDeque<>();\n        q.offer(new int[]{0, 0, 1}); // [row, col, distance]\n        grid[0][0] = 1; // Mark visited\n\n        while (!q.isEmpty()) {\n            int[] curr = q.poll();\n            int r = curr[0], c = curr[1], dist = curr[2];\n            if (r == m - 1 && c == n - 1) return dist;\n            for (int[] d : DIRS) {\n                int nr = r + d[0], nc = c + d[1];\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 0) {\n                    grid[nr][nc] = 1; // Mark visited immediately upon enqueue\n                    q.offer(new int[]{nr, nc, dist + 1});\n                }\n            }\n        }\n        return -1;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Radial BFS & Shortest Paths in Unweighted Graphs</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>In unweighted grid mazes, DFS wanders blindly down dead ends. BFS expands radially layer by layer, mathematically guaranteeing that the first time the destination is reached, the path is minimal!</em>\n</div>\n\n<p>Always mark grid cells as <strong>visited at the moment of enqueuing</strong> rather than dequeuing to prevent redundant duplicate nodes from flooding memory.</p>\n"
      },
      {
        "title": "Dijkstra's Algorithm: Shortest Paths in Weighted Networks",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class Dijkstra {\n    public static int networkDelayTime(int[][] times, int n, int k) {\n        Map<Integer, List<int[]>> graph = new HashMap<>();\n        for (int[] edge : times) {\n            graph.computeIfAbsent(edge[0], x -> new ArrayList<>()).add(new int[]{edge[1], edge[2]});\n        }\n        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // [node, dist]\n        pq.offer(new int[]{k, 0});\n        Map<Integer, Integer> dist = new HashMap<>();\n\n        while (!pq.isEmpty()) {\n            int[] curr = pq.poll();\n            int u = curr[0], d = curr[1];\n            if (dist.containsKey(u)) continue;\n            dist.put(u, d);\n            if (graph.containsKey(u)) {\n                for (int[] neighbor : graph.get(u)) {\n                    int v = neighbor[0], weight = neighbor[1];\n                    if (!dist.containsKey(v)) {\n                        pq.offer(new int[]{v, d + weight});\n                    }\n                }\n            }\n        }\n        if (dist.size() < n) return -1;\n        int maxTime = 0;\n        for (int d : dist.values()) maxTime = Math.max(maxTime, d);\n        return maxTime;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Dijkstra's Non-Negative Shortest Path Engine</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Edges have costs, latencies, and fuel requirements. Greedy relaxation with a Min-PriorityQueue finds the shortest path through weighted networks in O((V + E) log V) time!</em>\n</div>\n\n<p>Dijkstra's algorithm greedily finalizes the shortest distance to the closest unvisited node. Because all edge weights are non-negative, once a node is popped from the priority queue, its computed distance is optimal and immutable.</p>\n"
      },
      {
        "title": "Disjoint Set Union (Union-Find) & Kruskal's MST",
        "language": "java",
        "starterCode": "public class DSU {\n    private int[] parent, rank;\n\n    public DSU(int n) {\n        parent = new int[n];\n        rank = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n    }\n\n    // Path Compression: O(α(N)) amortized nearly O(1)!\n    public int find(int i) {\n        if (parent[i] != i) {\n            parent[i] = find(parent[i]);\n        }\n        return parent[i];\n    }\n\n    // Union by Rank\n    public boolean union(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI == rootJ) return false; // Cycle detected!\n        if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;\n        else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;\n        else { parent[rootJ] = rootI; rank[rootI]++; }\n        return true;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Disjoint Set Union (Union-Find) & Cycle Detection</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Determine if two nodes belong to the same connected component or detect cycles in undirected networks in virtually O(1) time using Path Compression and Union by Rank!</em>\n</div>\n\n<p>With both optimizations applied, the amortized time per operation is <code>O(α(N))</code> where <code>α</code> is the inverse Ackermann function, which is strictly less than 5 for all physically conceivable universe sizes!</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #200: Number of Islands (2D Grid DFS)",
        "language": "java",
        "starterCode": "public class NumberOfIslands {\n    public static int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n        return count;\n    }\n\n    private static void dfs(char[][] grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;\n        grid[r][c] = '0'; // Sink island\n        dfs(grid, r + 1, c);\n        dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1);\n        dfs(grid, r, c - 1);\n    }\n\n    public static void main(String[] args) {\n        char[][] map = {\n            {'1','1','0','0'},\n            {'1','1','0','0'},\n            {'0','0','1','0'},\n            {'0','0','0','1'}\n        };\n        System.out.println(\"Total Islands: \" + numIslands(map));\n    }\n}",
        "expectedOutput": "Total Islands: 3",
        "description": "\n<h2>LeetCode #200: Number of Islands</h2>\n<p>Given an <code>m x n</code> 2D binary grid representing a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the number of islands.</p>\n<p>Iterate through the grid. When encountering <code>'1'</code>, increment the island count and trigger a DFS flood-fill that \"sinks\" the connected land to <code>'0'</code>.</p>\n",
        "hints": [
          "Sink visited land by modifying grid[r][c] = 0 during DFS exploration in the 4 cardinal directions."
        ]
      },
      {
        "title": "LeetCode #207: Course Schedule (Cycle Detection)",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class CourseSchedule {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n\n        int completed = 0;\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            completed++;\n            for (int next : adj.get(curr)) {\n                if (--inDegree[next] == 0) q.offer(next);\n            }\n        }\n        return completed == numCourses;\n    }\n\n    public static void main(String[] args) {\n        int[][] prereqs = {{1, 0}, {0, 1}}; // Cycle\n        System.out.println(\"Can finish with circular dependency: \" + canFinish(2, prereqs));\n    }\n}",
        "expectedOutput": "Can finish with circular dependency: false",
        "description": "\n<h2>LeetCode #207: Course Schedule</h2>\n<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. Some courses have prerequisites.</p>\n<p>Determine if it is possible for you to finish all courses using Kahn's topological sort cycle-detection algorithm.</p>\n",
        "hints": [
          "Track in-degree count of each course. If Kahn algorithm cannot process all courses, a directed cycle exists."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the time complexity of BFS or DFS on a graph with V vertices and E edges using an Adjacency List?",
        "options": [
          "O(V^2)",
          "O(V + E)",
          "O(E log V)",
          "O(V * E)"
        ],
        "correctIndex": 1,
        "explanation": "Every vertex is visited once and each edge is examined once from its origin node, resulting in O(V + E) linear time."
      },
      {
        "question": "What does it mean if Kahn's Algorithm terminates before all vertices are enqueued?",
        "options": [
          "The graph is disconnected",
          "The graph contains at least one directed cycle",
          "The graph is an undirected tree",
          "The graph has negative edge weights"
        ],
        "correctIndex": 1,
        "explanation": "Nodes inside a directed cycle have non-zero in-degrees that can never reach 0, meaning they will never be added to the queue."
      }
    ],
    "project": false
  },
  "week-12": {
    "lessons": [
      {
        "title": "The Backtracking Triad: Choose, Explore, Unchoose",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class SubsetsDemo {\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n        result.add(new ArrayList<>(current));\n        for (int i = start; i < nums.length; i++) {\n            current.add(nums[i]);                  // 1. Choose\n            backtrack(nums, i + 1, current, result); // 2. Explore\n            current.remove(current.size() - 1);    // 3. Unchoose (Backtrack)\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2};\n        System.out.println(\"Subsets: \" + subsets(arr));\n    }\n}",
        "content": "\n<h2>♟️ Chapter 19: The Backtracking Triad — State Space Trees</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>When problems demand finding all combinations, permutations, or valid board configurations (like Sudoku or N-Queens), Backtracking explores the state tree, methodically undoing choices to explore alternate futures.</em>\n</div>\n\n<h3>The Universal Backtracking Pattern</h3>\n<pre><code>void backtrack(state) {\n    if (isValid(state)) { record(state); }\n    for (choice : possibleChoices) {\n        makeChoice(choice);      // 1. CHOOSE\n        backtrack(state);        // 2. EXPLORE (Recurse)\n        undoChoice(choice);      // 3. UNCHOOSE (Restore state for next sibling!)\n    }\n}</code></pre>\n        "
      },
      {
        "title": "Dynamic Programming: Memoization vs Tabulation",
        "language": "java",
        "starterCode": "public class DPFibonacci {\n    // Top-Down with Memoization: O(N) time, O(N) space\n    public static int fibMemo(int n, int[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    }\n\n    // Bottom-Up Tabulation with Space Optimization: O(N) time, O(1) space\n    public static int fibTab(int n) {\n        if (n <= 1) return n;\n        int prev2 = 0, prev1 = 1;\n        for (int i = 2; i <= n; i++) {\n            int curr = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Fib(10) Tabulation: \" + fibTab(10));\n    }\n}",
        "content": "\n<h2>🏆 Chapter 20: The Crown of Algorithms — Dynamic Programming</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Dynamic Programming is the pinnacle of algorithmic elegance. Transform exponential O(2^N) brute-force recursion into blazing O(N) or O(N²) polynomial speed by storing solutions to overlapping subproblems.</em>\n</div>\n\n<h3>The Two Pillars of DP</h3>\n<ol>\n  <li><strong>Overlapping Subproblems:</strong> The naive recursive tree recalculates identical function inputs repeatedly (e.g. Fib(5) recalculates Fib(3) multiple times).</li>\n  <li><strong>Optimal Substructure:</strong> The globally optimal answer can be composed directly from optimal answers to smaller sub-problems.</li>\n</ol>\n\n<pre class=\"ascii-diagram\">\nTop-Down Memoization:  Recursion Tree + Cache Map (Top down to base cases)\nBottom-Up Tabulation:  Base cases (dp[0], dp[1]) --> Loop forward to dp[n]!\n</pre>\n        "
      },
      {
        "title": "The 0/1 Knapsack Problem: Bounded Choice Tabulation",
        "language": "java",
        "starterCode": "public class Knapsack {\n    public static int knapsack(int[] weights, int[] values, int capacity) {\n        int[] dp = new int[capacity + 1];\n        // Rolling 1D array backwards to avoid using same item twice!\n        for (int i = 0; i < weights.length; i++) {\n            for (int w = capacity; w >= weights[i]; w--) {\n                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);\n            }\n        }\n        return dp[capacity];\n    }\n\n    public static void main(String[] args) {\n        int[] weights = {2, 3, 4, 5};\n        int[] values = {3, 4, 5, 6};\n        System.out.println(\"Max Loot: \" + knapsack(weights, values, 5)); // Output: 7\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: The 0/1 Knapsack & Rolling Tabulation</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Your backpack has limited capacity. Each ancient relic has a weight and value. You must either take the item or leave it. Solve the 0/1 Knapsack with a space-optimized 1D rolling array!</em>\n</div>\n\n<p>The state transition: <code>dp[w] = max(dp[w], dp[w - weight[i]] + value[i])</code>. Iterating <strong>backwards</strong> through capacities ensures each item is evaluated at most once, compressing space from <code>O(N × W)</code> to strictly <code>O(W)</code>.</p>\n"
      },
      {
        "title": "Longest Common Subsequence (LCS) & String DP Alignments",
        "language": "java",
        "starterCode": "public class LCS {\n    public static int longestCommonSubsequence(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                    dp[i][j] = 1 + dp[i - 1][j - 1];\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n        return dp[m][n];\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Longest Common Subsequence & 2D Matrix Alignment</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Diff engines (git diff), DNA sequence alignment, and autocompletion rely on string alignment matrices. Master 2D state transitions across string prefixes!</em>\n</div>\n\n<p>When characters match: <code>dp[i][j] = 1 + dp[i-1][j-1]</code>. When characters diverge, we branch into the best outcome of omitting a character from either string: <code>max(dp[i-1][j], dp[i][j-1])</code>.</p>\n"
      },
      {
        "title": "Interval Scheduling & Dynamic Programming on Partitions",
        "language": "java",
        "starterCode": "import java.util.Arrays;\n\npublic class LIS {\n    public static int lengthOfLIS(int[] nums) {\n        int[] tails = new int[nums.length];\n        int size = 0;\n        for (int x : nums) {\n            int i = 0, j = size;\n            while (i != j) {\n                int mid = (i + j) / 2;\n                if (tails[mid] < x) i = mid + 1;\n                else j = mid;\n            }\n            tails[i] = x;\n            if (i == size) size++;\n        }\n        return size;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Patience Sorting & O(N log N) Longest Increasing Subsequence</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>A naive DP calculates LIS in O(N²) quadratic time. Learn the legendary Patience Sorting algorithm that pairs binary search with dynamic array tails to achieve blazing O(N log N) speed!</em>\n</div>\n\n<p>The <code>tails</code> array maintains the smallest tail of all increasing subsequences of length <code>i + 1</code> found so far. Because <code>tails</code> is always sorted, we use binary search to update or extend the sequence in <code>O(log N)</code> per element.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #70: Climbing Stairs",
        "language": "java",
        "starterCode": "public class ClimbStairs {\n    public static int climbStairs(int n) {\n        if (n <= 2) return n;\n        int oneStepBefore = 2;\n        int twoStepsBefore = 1;\n        int allWays = 0;\n\n        for (int i = 3; i <= n; i++) {\n            allWays = oneStepBefore + twoStepsBefore;\n            twoStepsBefore = oneStepBefore;\n            oneStepBefore = allWays;\n        }\n        return allWays;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Ways to climb 4 steps: \" + climbStairs(4));\n    }\n}",
        "expectedOutput": "Ways to climb 4 steps: 5",
        "description": "\n<h2>LeetCode #70: Climbing Stairs</h2>\n<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?</p>\n<p>State equation: <code>dp[i] = dp[i - 1] + dp[i - 2]</code>.</p>\n",
        "hints": [
          "Base cases: dp[1] = 1, dp[2] = 2. Use two rolling variables to achieve O(1) space."
        ]
      },
      {
        "title": "LeetCode #322: Coin Change",
        "language": "java",
        "starterCode": "import java.util.Arrays;\n\npublic class CoinChange {\n    public static int coinChange(int[] coins, int amount) {\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n\n    public static void main(String[] args) {\n        int[] coins = {1, 2, 5};\n        System.out.println(\"Fewest coins for 11: \" + coinChange(coins, 11));\n    }\n}",
        "expectedOutput": "Fewest coins for 11: 3",
        "description": "\n<h2>LeetCode #322: Coin Change</h2>\n<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code>. Return the fewest number of coins that you need to make up that amount.</p>\n<p>Fill <code>dp[i]</code> bottom-up where <code>dp[i] = min(dp[i], dp[i - coin] + 1)</code>.</p>\n",
        "hints": [
          "Initialize dp array of size amount + 1 with amount + 1. dp[0] = 0. Iterate through all amounts and coins."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary advantage of Bottom-Up Tabulation over Top-Down Memoization?",
        "options": [
          "Tabulation avoids recursion call-stack overhead and enables O(1) rolling variable space optimization",
          "Tabulation always solves in O(log N) time",
          "Tabulation does not require identifying state variables",
          "Memoization is deprecated in modern Java"
        ],
        "correctIndex": 0,
        "explanation": "Tabulation runs iteratively in standard loops, preventing StackOverflowErrors and allowing space to be squeezed to O(1) when only prior steps are needed."
      }
    ],
    "project": {
      "title": "Dungeon Loot Optimizer: 0/1 Knapsack & Quest Combinatorics",
      "description": "\n<h2>Project: 0/1 Knapsack Dungeon Loot Optimizer</h2>\n<p>Implement the classic <strong>0/1 Knapsack Algorithm</strong> in Java. Given an adventurer's backpack capacity and a list of treasures (each with a weight and gold value), calculate the maximum gold value that can be transported without exceeding the weight limit.</p>\n",
      "language": "java",
      "starterCode": "public class KnapsackOptimizer {\n    public static int maxLoot(int capacity, int[] weights, int[] values) {\n        int n = weights.length;\n        int[][] dp = new int[n + 1][capacity + 1];\n\n        for (int i = 1; i <= n; i++) {\n            for (int w = 0; w <= capacity; w++) {\n                if (weights[i - 1] <= w) {\n                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n                } else {\n                    dp[i][w] = dp[i - 1][w];\n                }\n            }\n        }\n        return dp[n][capacity];\n    }\n\n    public static void main(String[] args) {\n        int[] weights = {2, 3, 4, 5};\n        int[] values = {3, 4, 5, 6};\n        System.out.println(\"Maximum Loot: \" + maxLoot(5, weights, values));\n    }\n}",
      "requirements": [
        "Compute 0/1 Knapsack maximum value using a 2D DP matrix or 1D reverse-running array",
        "Demonstrate that items can only be chosen once (unlike Unbounded Knapsack)",
        "Print which specific items were included in the optimal haul",
        "Handle edge cases (0 capacity, zero weight items)"
      ]
    }
  }
};
