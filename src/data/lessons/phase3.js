// ─── Phase 3: Data Structures & Algorithms Part 2 — LeetCode Advanced (Weeks 9–12) ───────────

export const phase3Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 9: Binary Trees, Binary Search Trees & Tree Traversals
  // ════════════════════════════════════════════════════════════════
  'week-9': {
    lessons: [
      {
        title: 'Binary Tree Representation & Pointer Topologies',
        language: 'java',
        starterCode: `class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int val) { this.val = val; }\n}\n\npublic class TreeDemo {\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(3);\n        System.out.println("Root: " + root.val + ", Left: " + root.left.val + ", Right: " + root.right.val);\n    }\n}`,
        content: `
<h2>Hierarchical Structures: Binary Trees</h2>
<p>A <strong>Binary Tree</strong> is a non-linear data structure where each node has at most two children: <code>left</code> and <code>right</code>.</p>

<h3>Core Terminology</h3>
<ul>
  <li><strong>Root:</strong> The topmost node with no parent.</li>
  <li><strong>Leaf:</strong> A node with no children (<code>left == null && right == null</code>).</li>
  <li><strong>Height / Depth:</strong> The length of the longest path from the node down to a leaf.</li>
  <li><strong>Balanced Tree:</strong> For every node, height differences between left and right subtrees do not exceed 1 (e.g., AVL, Red-Black Trees).</li>
</ul>
`,
      },
      {
        title: 'Tree Traversals: DFS (Pre, In, Post) vs BFS (Level-Order)',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class TreeTraversals {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    // DFS - Inorder (Left, Root, Right)\n    public static void inOrder(TreeNode root) {\n        if (root == null) return;\n        inOrder(root.left);\n        System.out.print(root.val + " ");\n        inOrder(root.right);\n    }\n\n    // BFS - Level Order\n    public static void levelOrder(TreeNode root) {\n        if (root == null) return;\n        Queue<TreeNode> queue = new ArrayDeque<>();\n        queue.offer(root);\n        while (!queue.isEmpty()) {\n            TreeNode curr = queue.poll();\n            System.out.print(curr.val + " ");\n            if (curr.left != null) queue.offer(curr.left);\n            if (curr.right != null) queue.offer(curr.right);\n        }\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(1);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(3);\n        System.out.print("Inorder: "); inOrder(root); System.out.println();\n        System.out.print("Level-Order: "); levelOrder(root); System.out.println();\n    }\n}`,
        content: `
<h2>Tree Traversals: DFS vs BFS</h2>
<h3>Depth-First Search (DFS)</h3>
<ul>
  <li><strong>Pre-order (Root, Left, Right):</strong> Used to clone/serialize trees.</li>
  <li><strong>In-order (Left, Root, Right):</strong> In a Binary Search Tree (BST), this visits nodes in <em>strictly ascending sorted order</em>!</li>
  <li><strong>Post-order (Left, Right, Root):</strong> Used for bottom-up computation (e.g., calculating subtree size or deleting nodes).</li>
</ul>

<h3>Breadth-First Search (BFS / Level-Order)</h3>
<p>Visits nodes level-by-level using a FIFO <code>Queue</code>. Essential for finding the shortest path or grouping nodes by depth.</p>
`,
      },
      {
        title: 'Binary Search Tree (BST) Properties & Validation',
        language: 'java',
        starterCode: `public class BSTDemo {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static boolean isValidBST(TreeNode root, Long min, Long max) {\n        if (root == null) return true;\n        if (root.val <= min || root.val >= max) return false;\n        return isValidBST(root.left, min, (long)root.val) && \n               isValidBST(root.right, (long)root.val, max);\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(5);\n        root.left = new TreeNode(3);\n        root.right = new TreeNode(7);\n        System.out.println("Is Valid BST: " + isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE));\n    }\n}`,
        content: `
<h2>The BST Invariant</h2>
<p>For any node with value <code>V</code>:</p>
<ul>
  <li>Every node in its left subtree must have value <strong>&lt; V</strong>.</li>
  <li>Every node in its right subtree must have value <strong>&gt; V</strong>.</li>
</ul>
<div class="callout callout--warn">
  <strong>Common Interview Trap:</strong> Validating a BST is NOT just checking <code>node.left.val &lt; node.val &amp;&amp; node.right.val &gt; node.val</code>. Every node deep in the left subtree must also be strictly less than all ancestor values! You must pass down allowable <code>[min, max]</code> bounds during recursion.
</div>
`,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #104: Maximum Depth of Binary Tree',
        language: 'java',
        starterCode: `public class MaxDepthTree {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(3);\n        root.left = new TreeNode(9);\n        root.right = new TreeNode(20);\n        root.right.left = new TreeNode(15);\n        root.right.right = new TreeNode(7);\n        System.out.println("Max Depth: " + maxDepth(root));\n    }\n}`,
        expectedOutput: 'Max Depth: 3',
        description: `
<h2>LeetCode #104: Maximum Depth of Binary Tree</h2>
<p>Given the root of a binary tree, return its maximum depth.</p>
<p>Use simple recursion: if the node is null, depth is 0; otherwise, depth is <code>1 + max(depth(left), depth(right))</code>.</p>
`,
        hints: ['Base case: if root is null, return 0. Recursive step: 1 + Math.max(maxDepth(root.left), maxDepth(root.right)).'],
      },
      {
        title: 'LeetCode #226: Invert Binary Tree',
        language: 'java',
        starterCode: `public class InvertTree {\n    static class TreeNode {\n        int val; TreeNode left, right;\n        TreeNode(int v) { val = v; }\n    }\n\n    public static TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n\n    public static void main(String[] args) {\n        TreeNode root = new TreeNode(4);\n        root.left = new TreeNode(2);\n        root.right = new TreeNode(7);\n        invertTree(root);\n        System.out.println("Root left: " + root.left.val + ", Root right: " + root.right.val);\n    }\n}`,
        expectedOutput: 'Root left: 7, Root right: 2',
        description: `
<h2>LeetCode #226: Invert Binary Tree</h2>
<p>Invert a binary tree (mirror it left to right) and return its root.</p>
<p>At each node, recursively invert the left and right subtrees, then swap the node's left and right child pointers.</p>
`,
        hints: ['Store root.left in a temporary variable, assign root.left = invertTree(root.right), and assign root.right = invertTree(temp).'],
      }
    ],
    quiz: [
      {
        question: 'Which traversal of a Binary Search Tree (BST) produces nodes in ascending sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctIndex: 1,
        explanation: 'In-order traversal visits Left Subtree -> Root -> Right Subtree, which mirrors the BST invariant of left < root < right.'
      },
      {
        question: 'What is the time complexity of searching in a balanced BST vs a skewed BST?',
        options: ['O(log N) for both', 'O(1) balanced, O(N) skewed', 'O(log N) balanced, O(N) skewed', 'O(N) balanced, O(log N) skewed'],
        correctIndex: 2,
        explanation: 'A balanced BST halves the search space at each node (O(log N)), but a completely skewed tree degrades into a linked list (O(N)).'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 10: Heaps, Priority Queues & Top-K Patterns
  // ════════════════════════════════════════════════════════════════
  'week-10': {
    lessons: [
      {
        title: 'Binary Heap Mechanics: Array Representation',
        language: 'java',
        starterCode: `public class HeapIndexing {\n    public static void main(String[] args) {\n        // Complete binary tree stored in 0-indexed array\n        int[] heap = {10, 15, 30, 40, 50, 100, 40};\n        int i = 1; // Element 15\n        int parent = (i - 1) / 2;\n        int leftChild = 2 * i + 1;\n        int rightChild = 2 * i + 2;\n        System.out.println("Node: " + heap[i] + ", Parent: " + heap[parent] + ", Left: " + heap[leftChild] + ", Right: " + heap[rightChild]);\n    }\n}`,
        content: `
<h2>Heaps: Complete Binary Trees in Arrays</h2>
<p>A <strong>Binary Heap</strong> is a complete binary tree satisfying the <em>Heap Property</em>:</p>
<ul>
  <li><strong>Min-Heap:</strong> <code>parent &lt;= children</code> (smallest item always at root).</li>
  <li><strong>Max-Heap:</strong> <code>parent &gt;= children</code> (largest item always at root).</li>
</ul>
<h3>Array Indexing Formulas</h3>
<p>For any node at index <code>i</code> in a 0-indexed array:</p>
<ul>
  <li><code>parent(i) = (i - 1) / 2</code></li>
  <li><code>left(i) = 2 * i + 1</code></li>
  <li><code>right(i) = 2 * i + 2</code></li>
</ul>
`,
      },
      {
        title: 'The Top-K Elements Pattern',
        language: 'java',
        starterCode: `import java.util.PriorityQueue;\n\npublic class TopKDemo {\n    public static int findKthLargest(int[] nums, int k) {\n        // Min-Heap to maintain the k largest elements\n        PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n        for (int num : nums) {\n            minHeap.offer(num);\n            if (minHeap.size() > k) {\n                minHeap.poll(); // Evict smallest of the top candidates\n            }\n        }\n        return minHeap.peek();\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {3, 2, 1, 5, 6, 4};\n        System.out.println("3rd Largest: " + findKthLargest(nums, 3));\n    }\n}`,
        content: `
<h2>The Top-K Elements Pattern</h2>
<p>When searching for the <strong>K largest elements</strong> in a stream of N elements:</p>
<p>Do NOT sort in O(N log N) time! Instead, maintain a <strong>Min-Heap of size K</strong>:</p>
<ol>
  <li>Insert each element into the min-heap.</li>
  <li>Whenever heap size exceeds K, <code>poll()</code> the smallest element.</li>
  <li>After processing all N elements, the heap contains the K largest elements, and the root is the <em>K-th largest</em>!</li>
  <li><strong>Time Complexity: O(N log K)</strong> — much faster than sorting when K &lt;&lt; N!</li>
</ol>
`,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #215: Kth Largest Element in an Array',
        language: 'java',
        starterCode: `import java.util.PriorityQueue;\n\npublic class KthLargest {\n    public static int findKthLargest(int[] nums, int k) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int val : nums) {\n            pq.offer(val);\n            if (pq.size() > k) {\n                pq.poll();\n            }\n        }\n        return pq.peek();\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {3, 2, 3, 1, 2, 4, 5, 5, 6};\n        System.out.println("4th Largest: " + findKthLargest(arr, 4));\n    }\n}`,
        expectedOutput: '4th Largest: 4',
        description: `
<h2>LeetCode #215: Kth Largest Element</h2>
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code>-th largest element in the array.</p>
<p>Solve this in O(N log K) time using a Min-Heap of capacity K.</p>
`,
        hints: ['Use a Min-Heap (PriorityQueue). Push each number. If size > k, poll(). The top of the heap is the answer.'],
      },
      {
        title: 'LeetCode #347: Top K Frequent Elements',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class TopKFrequent {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n\n        PriorityQueue<Integer> heap = new PriorityQueue<>(\n            (a, b) -> count.get(a) - count.get(b)\n        );\n\n        for (int n : count.keySet()) {\n            heap.offer(n);\n            if (heap.size() > k) heap.poll();\n        }\n\n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = heap.poll();\n        return res;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 1, 1, 2, 2, 3};\n        int[] res = topKFrequent(nums, 2);\n        System.out.println("Top 2: " + res[0] + " and " + res[1]);\n    }\n}`,
        expectedOutput: 'Top 2: 2 and 1',
        description: `
<h2>LeetCode #347: Top K Frequent Elements</h2>
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements in any order.</p>
<p>Build a frequency map, then use a Min-Heap ordered by frequency <code>(a, b) -> count.get(a) - count.get(b)</code> maintaining size K.</p>
`,
        hints: ['Count frequencies in a map. Use a PriorityQueue of size k comparing map frequencies.'],
      }
    ],
    quiz: [
      {
        question: 'Why does finding the K largest elements use a Min-Heap rather than a Max-Heap?',
        options: ['Because Max-Heaps are not supported in Java', 'Because a Min-Heap of size K lets us evict the smallest candidate in O(log K) time, keeping the top K intact', 'Because Min-Heaps use less memory than Max-Heaps', 'Because PriorityQueue defaults to Max-Heap'],
        correctIndex: 1,
        explanation: 'In a Min-Heap of size K, the root is the smallest of the top K items. Whenever a new number is larger than the root, we evict the root in O(log K) time.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 11: Graph Algorithms: BFS, DFS, Topological Sort & Dijkstra
  // ════════════════════════════════════════════════════════════════
  'week-11': {
    lessons: [
      {
        title: 'Graph Representations & Traversal Patterns',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class GraphBasics {\n    public static void main(String[] args) {\n        // Adjacency List: Map<Integer, List<Integer>>\n        Map<Integer, List<Integer>> graph = new HashMap<>();\n        graph.put(0, Arrays.asList(1, 2));\n        graph.put(1, Arrays.asList(2));\n        graph.put(2, Arrays.asList(0, 3));\n        graph.put(3, Arrays.asList(3));\n\n        System.out.println("Neighbors of Node 0: " + graph.get(0));\n    }\n}`,
        content: `
<h2>Graph Representations</h2>
<ul>
  <li><strong>Adjacency Matrix:</strong> 2D array <code>matrix[u][v] = 1</code>. Fast O(1) edge checks, but O(V^2) memory footprint.</li>
  <li><strong>Adjacency List:</strong> <code>Map&lt;Node, List&lt;Neighbor&gt;&gt;</code>. Ideal for sparse graphs with O(V + E) space.</li>
</ul>

<h3>Graph Traversal Rules</h3>
<p>Unlike trees, graphs can contain <strong>cycles</strong>! You must always track a <code>boolean[] visited</code> or <code>Set&lt;Node&gt;</code> to prevent infinite loops.</p>
`,
      },
      {
        title: 'Topological Sort (Kahn\'s In-Degree Algorithm)',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class KahnAlgo {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> queue = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (inDegree[i] == 0) queue.offer(i);\n        }\n\n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n            for (int neighbor : adj.get(curr)) {\n                if (--inDegree[neighbor] == 0) queue.offer(neighbor);\n            }\n        }\n        return count == numCourses;\n    }\n\n    public static void main(String[] args) {\n        int[][] prereqs = {{1, 0}};\n        System.out.println("Can finish 2 courses: " + canFinish(2, prereqs));\n    }\n}`,
        content: `
<h2>Topological Sort: Dependency Resolution</h2>
<p>Topological sorting linearizes a <strong>Directed Acyclic Graph (DAG)</strong> such that for every directed edge <code>u -> v</code>, vertex <code>u</code> comes before <code>v</code>.</p>
<h3>Kahn's Algorithm</h3>
<ol>
  <li>Calculate the in-degree (number of incoming prerequisites) for every node.</li>
  <li>Enqueue all nodes with in-degree 0 into a Queue.</li>
  <li>Repeatedly poll a node, append to output, and decrement neighbors' in-degrees.</li>
  <li>If a neighbor's in-degree drops to 0, enqueue it.</li>
  <li>If total processed nodes &lt; total vertices, a <strong>cycle exists</strong>!</li>
</ol>
`,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #200: Number of Islands (2D Grid DFS)',
        language: 'java',
        starterCode: `public class NumberOfIslands {\n    public static int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') {\n                    count++;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n        return count;\n    }\n\n    private static void dfs(char[][] grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;\n        grid[r][c] = '0'; // Sink island\n        dfs(grid, r + 1, c);\n        dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1);\n        dfs(grid, r, c - 1);\n    }\n\n    public static void main(String[] args) {\n        char[][] map = {\n            {'1','1','0','0'},\n            {'1','1','0','0'},\n            {'0','0','1','0'},\n            {'0','0','0','1'}\n        };\n        System.out.println("Total Islands: " + numIslands(map));\n    }\n}`,
        expectedOutput: 'Total Islands: 3',
        description: `
<h2>LeetCode #200: Number of Islands</h2>
<p>Given an <code>m x n</code> 2D binary grid representing a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return the number of islands.</p>
<p>Iterate through the grid. When encountering <code>'1'</code>, increment the island count and trigger a DFS flood-fill that "sinks" the connected land to <code>'0'</code>.</p>
`,
        hints: ['Sink visited land by modifying grid[r][c] = 0 during DFS exploration in the 4 cardinal directions.'],
      },
      {
        title: 'LeetCode #207: Course Schedule (Cycle Detection)',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class CourseSchedule {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n\n        for (int[] p : prerequisites) {\n            adj.get(p[1]).add(p[0]);\n            inDegree[p[0]]++;\n        }\n\n        Queue<Integer> q = new ArrayDeque<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n\n        int completed = 0;\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            completed++;\n            for (int next : adj.get(curr)) {\n                if (--inDegree[next] == 0) q.offer(next);\n            }\n        }\n        return completed == numCourses;\n    }\n\n    public static void main(String[] args) {\n        int[][] prereqs = {{1, 0}, {0, 1}}; // Cycle\n        System.out.println("Can finish with circular dependency: " + canFinish(2, prereqs));\n    }\n}`,
        expectedOutput: 'Can finish with circular dependency: false',
        description: `
<h2>LeetCode #207: Course Schedule</h2>
<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. Some courses have prerequisites.</p>
<p>Determine if it is possible for you to finish all courses using Kahn's topological sort cycle-detection algorithm.</p>
`,
        hints: ['Track in-degree count of each course. If Kahn algorithm cannot process all courses, a directed cycle exists.'],
      }
    ],
    quiz: [
      {
        question: 'What is the time complexity of BFS or DFS on a graph with V vertices and E edges using an Adjacency List?',
        options: ['O(V^2)', 'O(V + E)', 'O(E log V)', 'O(V * E)'],
        correctIndex: 1,
        explanation: 'Every vertex is visited once and each edge is examined once from its origin node, resulting in O(V + E) linear time.'
      },
      {
        question: 'What does it mean if Kahn\'s Algorithm terminates before all vertices are enqueued?',
        options: ['The graph is disconnected', 'The graph contains at least one directed cycle', 'The graph is an undirected tree', 'The graph has negative edge weights'],
        correctIndex: 1,
        explanation: 'Nodes inside a directed cycle have non-zero in-degrees that can never reach 0, meaning they will never be added to the queue.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 12: Backtracking & Dynamic Programming (1D & 2D)
  // ════════════════════════════════════════════════════════════════
  'week-12': {
    lessons: [
      {
        title: 'Backtracking Framework: Choose, Explore, Unchoose',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class SubsetsDemo {\n    public static List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), result);\n        return result;\n    }\n\n    private static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n        result.add(new ArrayList<>(current));\n        for (int i = start; i < nums.length; i++) {\n            current.add(nums[i]);                  // 1. Choose\n            backtrack(nums, i + 1, current, result); // 2. Explore\n            current.remove(current.size() - 1);    // 3. Unchoose (Backtrack)\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2};\n        System.out.println("Subsets: " + subsets(arr));\n    }\n}`,
        content: `
<h2>The Universal Backtracking Template</h2>
<p>Backtracking explores potential solution paths in a decision tree. When a path reaches a dead end or valid leaf, we <strong>unchoose</strong> the step to restore prior state and explore alternate branches.</p>
<pre><code>void backtrack(state) {
    if (isValid(state)) { record(state); return; }
    for (choice : possibleChoices) {
        makeChoice(choice);
        backtrack(state);
        undoChoice(choice); // Crucial!
    }
}</code></pre>
`,
      },
      {
        title: 'Dynamic Programming: Overlapping Subproblems & Tabulation',
        language: 'java',
        starterCode: `public class DPFibonacci {\n    // Top-Down with Memoization: O(N) time, O(N) space\n    public static int fibMemo(int n, int[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    }\n\n    // Bottom-Up Tabulation with Space Optimization: O(N) time, O(1) space\n    public static int fibTab(int n) {\n        if (n <= 1) return n;\n        int prev2 = 0, prev1 = 1;\n        for (int i = 2; i <= n; i++) {\n            int curr = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Fib(10) Tabulation: " + fibTab(10));\n    }\n}`,
        content: `
<h2>The Two Hallmarks of Dynamic Programming</h2>
<ol>
  <li><strong>Optimal Substructure:</strong> An optimal solution to the problem can be constructed from optimal solutions of its subproblems.</li>
  <li><strong>Overlapping Subproblems:</strong> The same subproblems are solved repeatedly in a naive recursion tree.</li>
</ol>

<h3>Memoization vs Tabulation</h3>
<ul>
  <li><strong>Memoization (Top-Down):</strong> Natural recursion supplemented by a lookup cache (array or HashMap).</li>
  <li><strong>Tabulation (Bottom-Up):</strong> Iteratively fills an array from base cases up to the target answer, avoiding recursion call-stack overhead.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #70: Climbing Stairs',
        language: 'java',
        starterCode: `public class ClimbStairs {\n    public static int climbStairs(int n) {\n        if (n <= 2) return n;\n        int oneStepBefore = 2;\n        int twoStepsBefore = 1;\n        int allWays = 0;\n\n        for (int i = 3; i <= n; i++) {\n            allWays = oneStepBefore + twoStepsBefore;\n            twoStepsBefore = oneStepBefore;\n            oneStepBefore = allWays;\n        }\n        return allWays;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Ways to climb 4 steps: " + climbStairs(4));\n    }\n}`,
        expectedOutput: 'Ways to climb 4 steps: 5',
        description: `
<h2>LeetCode #70: Climbing Stairs</h2>
<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?</p>
<p>State equation: <code>dp[i] = dp[i - 1] + dp[i - 2]</code>.</p>
`,
        hints: ['Base cases: dp[1] = 1, dp[2] = 2. Use two rolling variables to achieve O(1) space.'],
      },
      {
        title: 'LeetCode #322: Coin Change',
        language: 'java',
        starterCode: `import java.util.Arrays;\n\npublic class CoinChange {\n    public static int coinChange(int[] coins, int amount) {\n        int max = amount + 1;\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, max);\n        dp[0] = 0;\n\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n\n    public static void main(String[] args) {\n        int[] coins = {1, 2, 5};\n        System.out.println("Fewest coins for 11: " + coinChange(coins, 11));\n    }\n}`,
        expectedOutput: 'Fewest coins for 11: 3',
        description: `
<h2>LeetCode #322: Coin Change</h2>
<p>You are given an integer array <code>coins</code> representing coins of different denominations and an integer <code>amount</code>. Return the fewest number of coins that you need to make up that amount.</p>
<p>Fill <code>dp[i]</code> bottom-up where <code>dp[i] = min(dp[i], dp[i - coin] + 1)</code>.</p>
`,
        hints: ['Initialize dp array of size amount + 1 with amount + 1. dp[0] = 0. Iterate through all amounts and coins.'],
      }
    ],
    quiz: [
      {
        question: 'What is the primary advantage of Bottom-Up Tabulation over Top-Down Memoization?',
        options: ['Tabulation avoids recursion call-stack overhead and enables O(1) rolling variable space optimization', 'Tabulation always solves in O(log N) time', 'Tabulation does not require identifying state variables', 'Memoization is deprecated in modern Java'],
        correctIndex: 0,
        explanation: 'Tabulation runs iteratively in standard loops, preventing StackOverflowErrors and allowing space to be squeezed to O(1) when only prior steps are needed.'
      }
    ],
    project: {
      title: 'Dungeon Loot Optimizer: 0/1 Knapsack & Quest Combinatorics',
      description: `
<h2>Project: 0/1 Knapsack Dungeon Loot Optimizer</h2>
<p>Implement the classic <strong>0/1 Knapsack Algorithm</strong> in Java. Given an adventurer's backpack capacity and a list of treasures (each with a weight and gold value), calculate the maximum gold value that can be transported without exceeding the weight limit.</p>
`,
      language: 'java',
      starterCode: `public class KnapsackOptimizer {\n    public static int maxLoot(int capacity, int[] weights, int[] values) {\n        int n = weights.length;\n        int[][] dp = new int[n + 1][capacity + 1];\n\n        for (int i = 1; i <= n; i++) {\n            for (int w = 0; w <= capacity; w++) {\n                if (weights[i - 1] <= w) {\n                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n                } else {\n                    dp[i][w] = dp[i - 1][w];\n                }\n            }\n        }\n        return dp[n][capacity];\n    }\n\n    public static void main(String[] args) {\n        int[] weights = {2, 3, 4, 5};\n        int[] values = {3, 4, 5, 6};\n        System.out.println("Maximum Loot: " + maxLoot(5, weights, values));\n    }\n}`,
      requirements: [
        'Compute 0/1 Knapsack maximum value using a 2D DP matrix or 1D reverse-running array',
        'Demonstrate that items can only be chosen once (unlike Unbounded Knapsack)',
        'Print which specific items were included in the optimal haul',
        'Handle edge cases (0 capacity, zero weight items)'
      ]
    }
  }
};
