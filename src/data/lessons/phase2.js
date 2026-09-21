// ─── The Trials of Algor: LeetCode & DSA Mastery (Modules 1–4) ─────────────
// Part 1: Arena Foundations — Pointers, Windows, Lists, Stacks & Binary Search

export const phase2Content = {
  // ════════════════════════════════════════════════════════════════
  // MODULE 1: The Gates of Algor — Complexity, Two Pointers & Sliding Window
  // ════════════════════════════════════════════════════════════════
  'week-5': {
    lessons: [
      {
        title: 'Asymptotic Analysis & Big-O Battle Metrics',
        language: 'java',
        starterCode: `public class BigO {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // O(1) - Constant time\n        System.out.println("First element: " + arr[0]);\n\n        // O(N) - Linear time\n        for (int x : arr) {\n            System.out.print(x + " ");\n        }\n        System.out.println();\n\n        // O(N^2) - Quadratic time\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = 0; j < arr.length; j++) {\n                System.out.print("(" + arr[i] + "," + arr[j] + ") ");\n            }\n        }\n    }\n}`,
        content: `
<h2>⚔️ Chapter 1: The Gates of Algor — Big-O Battle Metrics</h2>

<div class="lesson-pixel-art">
  <img src="/images/pixel_algor_colosseum.jpg" alt="The Grand Colosseum of Algor" />
  <div class="pixel-caption">
    ⚔️ SECTOR 00: THE GATES OF ALGOR — ENTERING THE ARENA OF BIG-O BATTLES
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome to the Colosseum of Algor, Gladiator. Here, brute-force O(N²) code is torn to shreds by Big-O monsters. Only algorithms forged with mathematical precision can survive the trials of massive scale. Learn to measure time, space, and amortized efficiency.</em>
</div>

<p>In the arena of competitive algorithms and technical interviews, an algorithm's prowess is measured not by how fast it runs on a handful of test cases, but by its <strong>Asymptotic Growth Rate</strong> as the input size <code>N</code> scales toward infinity (<code>N → ∞</code>).</p>

<h3>The Hierarchy of Complexity (From Supreme to Lethal)</h3>

<pre class="ascii-diagram">
Runtime (T)
   ^
   |                                     / O(2^N) [Exponential Doom]
   |                                    /
   |                                   / O(N^2) [Quadratic - Brute Force]
   |                                  /
   |                                 / O(N log N) [Optimal Sorts]
   |                                /
   |                             --/ O(N) [Linear Scan]
   |                        ---/
   |                   ----/ O(log N) [Binary Search]
   |  ------------------- O(1) [Constant Lookups]
   +----------------------------------------------------> Input Size (N)
</pre>

<ul>
  <li><strong>O(1) Constant:</strong> Direct array indexing, HashMap lookups. Speed is entirely independent of input size.</li>
  <li><strong>O(log N) Logarithmic:</strong> Dividing the search space in half at every step (Binary Search, Balanced BST). Sifting through 1,000,000 items requires merely ~20 operations!</li>
  <li><strong>O(N) Linear:</strong> Single-pass scans (Two Pointers, Sliding Window, Monotonic Stacks). Traverses each element a bounded number of times.</li>
  <li><strong>O(N log N) Linearithmic:</strong> The theoretical mathematical lower bound for comparison-based sorting (MergeSort, QuickSort, TimSort).</li>
  <li><strong>O(N²) Quadratic:</strong> Nested loops over the collection. Acceptable when <code>N ≤ 1,000</code>, but catastrophic when <code>N ≥ 100,000</code>.</li>
  <li><strong>O(2^N) / O(N!) Exponential:</strong> Generating all permutations or subsets without memoization.</li>
</ul>

<h3>Amortized Time vs Worst-Case Guarantees</h3>
<p>Consider appending an element to a dynamic array (like Java's <code>ArrayList</code> or Python's <code>list</code>). When capacity is full, the array allocates a block twice as large and copies all <code>N</code> items across, taking <code>O(N)</code> time. However, this costly reallocation happens so rarely that spread across all operations, the <strong>amortized time per append is strictly O(1)</strong>.</p>
        `,
      },
      {
        title: 'The Two-Pointer Collision & Floyd Cycles',
        language: 'java',
        starterCode: `import java.util.Arrays;\n\npublic class TwoPointers {\n    public static boolean isPalindrome(String s) {\n        int left = 0;\n        int right = s.length() - 1;\n\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));\n        System.out.println(isPalindrome("race a car"));\n    }\n}`,
        content: `
<h2>🎯 Chapter 2: The Two-Pointer Collision Technique</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Why check every pair with nested O(N²) loops when two coordinated pointers can eliminate unnecessary comparisons in a single O(N) sweep? Master pointer convergence and cycle detection.</em>
</div>

<h3>The Inward Collision Pattern</h3>
<p>When searching for pairs in a <strong>sorted</strong> array or verifying symmetry (e.g. Palindromes), two pointers begin at opposite frontiers and step inward:</p>

<pre class="ascii-diagram">
Index:     0    1    2    3    4    5    6
Array:   [ 2,   7,  11,  15,  19,  24,  30 ]
           ^                                 ^
           |                                 |
       Left Pointer                    Right Pointer
       (left = 0)                     (right = 6)

Sum: nums[left] + nums[right] = 2 + 30 = 32
Target: 26 -> Sum too large! Decrement right pointer: right--
</pre>

<p>Because the array is sorted, if the current sum is greater than the target, no other pairing with <code>nums[right]</code> could possibly equal the target. We safely discard the entire right frontier in O(1) time!</p>

<h3>Floyd's Fast & Slow Pointers (Tortoise & Hare)</h3>
<p>Two pointers start at the head of a sequence. The <code>slow</code> pointer steps 1 position per cycle while <code>fast</code> steps 2 positions. If a cycle exists, <code>fast</code> is mathematically guaranteed to enter the loop first and lap <code>slow</code> within <code>O(N)</code> steps using <strong>O(1) auxiliary space</strong>.</p>
        `,
      },
      {
        title: 'The Sliding Window: Contiguous Subarrays',
        language: 'java',
        starterCode: `public class SlidingWindow {\n    // Fixed-size window of size k\n    public static int maxSubarraySum(int[] arr, int k) {\n        int windowSum = 0;\n        for (int i = 0; i < k; i++) {\n            windowSum += arr[i];\n        }\n        int maxSum = windowSum;\n\n        for (int i = k; i < arr.length; i++) {\n            windowSum += arr[i] - arr[i - k]; // Slide: add right, drop left\n            maxSum = Math.max(maxSum, windowSum);\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 1, 5, 1, 3, 2};\n        System.out.println("Max sum window of size 3: " + maxSubarraySum(nums, 3));\n    }\n}`,
        content: `
<h2>🪟 Chapter 3: The Sliding Window Dynamic Frame</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Contiguous subarrays often trigger O(N²) recalculations if analyzed naively. A sliding window maintains the state of a moving frame, updating boundary elements in O(1) time as it glides across the array.</em>
</div>

<h3>Fixed vs Dynamic Sliding Windows</h3>

<pre class="ascii-diagram">
Initial Window of size k=3:
[ 2,  1,  5 ], 1,  3,  2    --> sum = 8

Slide Right by 1:
  2, [ 1,  5,  1 ], 3,  2   --> sum = 8 - (dropped 2) + (added 1) = 7
       ^       ^
       L       R
</pre>

<ul>
  <li><strong>Fixed Window:</strong> The window width <code>k</code> is constant. You slide the window by adding the incoming element at <code>R</code> and subtracting the outgoing element at <code>L = R - k</code> in <code>O(1)</code> time.</li>
  <li><strong>Dynamic Window:</strong> Used when finding the <em>longest or shortest valid subarray</em> satisfying a constraint. Expand <code>R</code> until the window is valid, then contract <code>L</code> until the condition breaks.</li>
</ul>
        `,
      },
      {
        title: 'Prefix Sums & Range Query Acceleration',
        language: 'java',
        starterCode: `import java.util.Arrays;\n\npublic class PrefixSumDemo {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 4, 1, 5, 9};\n        int[] prefix = new int[nums.length + 1];\n\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n\n        System.out.println("Prefix Array: " + Arrays.toString(prefix));\n        // Range sum [2, 4] -> prefix[5] - prefix[2]\n        int sum = prefix[5] - prefix[2];\n        System.out.println("Sum of range [2, 4]: " + sum);\n    }\n}`,
        content: `
<h2>⚡ Chapter 4: Prefix Sums & Difference Arrays</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>When queries demand the sum of elements between arbitrary indices L and R, a naive loop takes O(N) per query. Precomputing a Prefix Sum array answers any range query in instant O(1) time!</em>
</div>

<p>A Prefix Sum array stores running cumulative totals:</p>
<pre><code>prefix[0] = 0
prefix[i + 1] = prefix[i] + nums[i]</code></pre>

<p>Any arbitrary range sum from index <code>L</code> to <code>R</code> inclusive is calculated with a single subtraction:</p>
<pre><code>sum(L, R) = prefix[R + 1] - prefix[L]</code></pre>
        `,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #1: Two Sum (HashMap One-Pass)',
        language: 'java',
        starterCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class TwoSum {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        int[] res = twoSum(nums, 9);\n        System.out.println(res[0] + " " + res[1]);\n    }\n}`,
        expectedOutput: '0 1',
        description: `
<h2>LeetCode #1: Two Sum</h2>
<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
<p>Use a <code>HashMap</code> to store values and their indices. In a single pass, check if <code>target - nums[i]</code> already exists in the map!</p>
`,
        hints: ['For each number, the required pair value is target - nums[i]. Check if this complement is already in your map.'],
      },
      {
        title: 'LeetCode #121: Best Time to Buy and Sell Stock',
        language: 'java',
        starterCode: `public class BuySellStock {\n    public static int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n\n        for (int price : prices) {\n            if (price < minPrice) {\n                minPrice = price;\n            } else if (price - minPrice > maxProfit) {\n                maxProfit = price - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n\n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        System.out.println("Max Profit: " + maxProfit(prices));\n    }\n}`,
        expectedOutput: 'Max Profit: 5',
        description: `
<h2>LeetCode #121: Best Time to Buy & Sell Stock</h2>
<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the stock price on the <code>i</code>-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.</p>
<p>Keep track of the minimum price observed so far, and calculate the profit if sold today.</p>
`,
        hints: ['Keep a running minPrice. For each day, profit = price - minPrice. Update maxProfit if profit is higher.'],
      },
      {
        title: 'LeetCode #209: Minimum Size Subarray Sum',
        language: 'java',
        starterCode: `public class MinSubArrayLen {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0;\n        int sum = 0;\n        int minLen = Integer.MAX_VALUE;\n\n        for (int right = 0; right < nums.length; right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println("Min length: " + minSubArrayLen(7, nums));\n    }\n}`,
        expectedOutput: 'Min length: 2',
        description: `
<h2>LeetCode #209: Minimum Size Subarray Sum</h2>
<p>Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return 0.</p>
<p>Use a dynamic sliding window: expand with <code>right</code>, and shrink with <code>left</code> whenever <code>sum >= target</code>.</p>
`,
        hints: ['Expand right pointer until sum >= target, then shrink left pointer as much as possible while maintaining sum >= target.'],
      }
    ],
    quiz: [
      {
        question: 'What is the time complexity of the optimal Two Sum solution using a HashMap?',
        options: ['O(N^2) time, O(1) space', 'O(N) time, O(N) space', 'O(N log N) time, O(1) space', 'O(1) time, O(N) space'],
        correctIndex: 1,
        explanation: 'By storing seen numbers in a HashMap, we check complement existence in O(1) time, giving O(N) total time and O(N) space complexity.'
      },
      {
        question: 'When should you choose a Dynamic Sliding Window over a Fixed Sliding Window?',
        options: ['When the target window size k is constant', 'When the problem asks for the minimum or maximum subarray length meeting a condition', 'When sorting is required before windowing', 'Only when using recursive backtracking'],
        correctIndex: 1,
        explanation: 'Dynamic sliding windows are used when window length varies and we must find the shortest or longest window satisfying a dynamic condition.'
      },
      {
        question: 'Given an array of size N, how fast can a Prefix Sum array answer a range sum query?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
        correctIndex: 2,
        explanation: 'Prefix sums precompute cumulative totals in O(N) time, enabling any subsequent range sum query to execute in O(1) instant subtraction.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 2: The Labyrinth of Pointers — Linked Lists & Fast-Slow Cycles
  // ════════════════════════════════════════════════════════════════
  'week-6': {
    lessons: [
      {
        title: 'Linked List Architecture & Heap Pointer Manipulation',
        language: 'java',
        starterCode: `class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\npublic class LinkedListBasics {\n    public static void main(String[] args) {\n        ListNode head = new ListNode(10);\n        head.next = new ListNode(20);\n        head.next.next = new ListNode(30);\n\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + (curr.next != null ? " -> " : "\\n"));\n            curr = curr.next;\n        }\n    }\n}`,
        content: `
<h2>🔗 Chapter 5: The Labyrinth of Pointers — Linked Lists</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Unlike contiguous arrays, linked lists are dynamic chains scattered across heap memory. Master pointer rewiring, sentinel dummy nodes, and in-place link reversal without losing references.</em>
</div>

<h3>Array vs Linked List Memory Model</h3>

<pre class="ascii-diagram">
Array Memory (Contiguous block):
[ Index 0: 10 ][ Index 1: 20 ][ Index 2: 30 ]  <-- Fast O(1) index, slow O(N) insert

Linked List Memory (Dispersed Nodes on Heap):
[ Node @0x04A ]       [ Node @0x8F1 ]       [ Node @0x12B ]
| val: 10     | ----> | val: 20     | ----> | val: 30     | ----> null
| next: 0x8F1 |       | next: 0x12B |       | next: null  |
</pre>
        `,
      },
      {
        title: 'Floyd\'s Cycle Detection (Tortoise & Hare)',
        language: 'java',
        starterCode: `public class CycleDetection {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true; // Cycle detected!\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        ListNode n1 = new ListNode(1);\n        ListNode n2 = new ListNode(2);\n        ListNode n3 = new ListNode(3);\n        n1.next = n2;\n        n2.next = n3;\n        n3.next = n2; // Loop\n\n        System.out.println("Has cycle: " + hasCycle(n1));\n    }\n}`,
        content: `
<h2>🐢 Chapter 6: Floyd's Cycle-Finding Algorithm</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>How can you detect an infinite loop in a linked list without allocating an auxiliary HashSet? Floyd's cycle detection uses relative velocities to catch loops in O(1) space.</em>
</div>

<p>Imagine two runners on a circular track. Even if one starts ahead, if runner B runs at twice the speed of runner A, runner B is mathematically guaranteed to lap runner A!</p>
        `,
      },
      {
        title: 'The Sentinel (Dummy Node) Architecture',
        language: 'java',
        starterCode: `public class DummyNodeDemo {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode removeElements(ListNode head, int val) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode curr = dummy;\n\n        while (curr.next != null) {\n            if (curr.next.val == val) {\n                curr.next = curr.next.next; // Bypass node\n            } else {\n                curr = curr.next;\n            }\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1);\n        h.next = new ListNode(2);\n        h.next.next = new ListNode(1);\n        ListNode res = removeElements(h, 1);\n        System.out.println("Filtered head: " + res.val);\n    }\n}`,
        content: `
<h2>🛡️ Chapter 7: The Sentinel Dummy Node Technique</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Modifying or deleting the head node is the number one source of NullPointerExceptions in coding interviews. A sentinel dummy node standardizes all operations so every node has a predecessor.</em>
</div>

<pre class="ascii-diagram">
Without Dummy:
[ Head ] -> [ Node 2 ] -> [ Node 3 ]
If Head must be deleted, you must rewrite 'head = head.next'.

With Dummy Node:
[ Dummy(-1) ] -> [ Head ] -> [ Node 2 ] -> [ Node 3 ]
                 ^
                 Target for removal!
Just execute: dummy.next = dummy.next.next! Return dummy.next at the end.
</pre>
        `,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #206: Reverse Linked List',
        language: 'java',
        starterCode: `public class ReverseList {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    public static void main(String[] args) {\n        ListNode a = new ListNode(1);\n        a.next = new ListNode(2);\n        a.next.next = new ListNode(3);\n        ListNode rev = reverseList(a);\n        System.out.println(rev.val + " -> " + rev.next.val + " -> " + rev.next.next.val);\n    }\n}`,
        expectedOutput: '3 -> 2 -> 1',
        description: `
<h2>LeetCode #206: Reverse Linked List</h2>
<p>Given the head of a singly linked list, reverse the list in-place and return the reversed list's new head.</p>
<p>Track three pointers: <code>prev</code>, <code>curr</code>, and <code>nextTemp</code>. Reverse the link at each step.</p>
`,
        hints: ['Save curr.next in a temporary pointer before re-pointing curr.next = prev. Advance prev and curr forward.'],
      },
      {
        title: 'LeetCode #21: Merge Two Sorted Lists',
        language: 'java',
        starterCode: `public class MergeSortedLists {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode curr = dummy;\n\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                curr.next = list1;\n                list1 = list1.next;\n            } else {\n                curr.next = list2;\n                list2 = list2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1);\n        l1.next = new ListNode(4);\n        ListNode l2 = new ListNode(2);\n        l2.next = new ListNode(3);\n\n        ListNode merged = mergeTwoLists(l1, l2);\n        System.out.println(merged.val + " " + merged.next.val + " " + merged.next.next.val + " " + merged.next.next.next.val);\n    }\n}`,
        expectedOutput: '1 2 3 4',
        description: `
<h2>LeetCode #21: Merge Two Sorted Lists</h2>
<p>Merge two sorted linked lists into one sorted list by splicing together the existing nodes.</p>
<p>Use a dummy head node. Compare the head values of both lists and advance the smaller node pointer.</p>
`,
        hints: ['Create a dummy node. Use while(l1 != null && l2 != null) to append the smaller node. Attach the non-null remainder after the loop.'],
      }
    ],
    quiz: [
      {
        question: 'What is the space complexity of Floyd\'s Cycle Detection Algorithm?',
        options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'],
        correctIndex: 1,
        explanation: 'Floyd\'s algorithm only uses two pointer references (slow and fast), achieving O(1) auxiliary space.'
      },
      {
        question: 'Why is a dummy (sentinel) node frequently used in linked list problems?',
        options: ['It accelerates traversal time by 50%', 'It avoids edge-case handling when inserting or deleting at the list head', 'It prevents garbage collection leaks in Java', 'It converts a singly linked list to doubly linked list'],
        correctIndex: 1,
        explanation: 'A dummy node points to the true head, eliminating special null-checking or re-assigning head pointers.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 3: The Iron Crucible — Stacks, Queues & Monotonic Stacks
  // ════════════════════════════════════════════════════════════════
  'week-7': {
    lessons: [
      {
        title: 'Stack & Queue Principles (LIFO vs FIFO)',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class StackQueueDemo {\n    public static void main(String[] args) {\n        // Preferred Stack implementation in modern Java\n        Deque<Integer> stack = new ArrayDeque<>();\n        stack.push(10);\n        stack.push(20);\n        System.out.println("Stack Pop: " + stack.pop()); // 20 (LIFO)\n\n        // Queue\n        Deque<Integer> queue = new ArrayDeque<>();\n        queue.offer(10);\n        queue.offer(20);\n        System.out.println("Queue Poll: " + queue.poll()); // 10 (FIFO)\n    }\n}`,
        content: `
<h2>🥞 Chapter 8: The Iron Crucible — Stacks & Queues</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Stacks (LIFO) and Queues (FIFO) govern function calls, undo buffers, expression parsing, and breadth-first search. In modern Java, never use the legacy java.util.Stack class; master ArrayDeque.</em>
</div>

<h3>Why java.util.Stack is Deprecated in Modern Engineering</h3>
<p>Java's original <code>Stack</code> class extends <code>Vector</code>, meaning every single method (<code>push</code>, <code>pop</code>, <code>peek</code>) is synchronized with expensive thread locks. <code>ArrayDeque</code> is unsynchronized, resizes dynamically without array copying overhead, and is significantly faster on modern hardware.</p>
        `,
      },
      {
        title: 'The Monotonic Stack Pattern & O(N) Lookups',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\npublic class MonotonicStack {\n    public static int[] nextGreaterElements(int[] nums) {\n        int[] result = new int[nums.length];\n        Arrays.fill(result, -1);\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < nums.length; i++) {\n            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n                int prevIndex = stack.pop();\n                result[prevIndex] = nums[i];\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {2, 1, 2, 4, 3};\n        System.out.println(Arrays.toString(nextGreaterElements(arr)));\n    }\n}`,
        content: `
<h2>🏔️ Chapter 9: The Monotonic Stack Pattern</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Finding the 'Next Greater Element' for every element in an array naively takes O(N²) quadratic time. A Monotonic Stack preserves elements in strictly increasing or decreasing order, solving this in pure O(N) linear time!</em>
</div>

<pre class="ascii-diagram">
Input: [ 2, 1, 2, 4, 3 ]
Stack stores INDICES whose "next greater" has not yet been discovered:

i=0 (val 2): Stack = [0]
i=1 (val 1): 1 &lt; 2, push 1. Stack = [0, 1]
i=2 (val 2): 2 &gt; 1! Pop index 1! nextGreater[1] = 2. Push 2. Stack = [0, 2]
i=3 (val 4): 4 &gt; 2! Pop 2 (nextGreater[2]=4). 4 &gt; 2! Pop 0 (nextGreater[0]=4).
            Push 3. Stack = [3]
i=4 (val 3): 3 &lt; 4, push 4. Stack = [3, 4]
</pre>
        `,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #20: Valid Parentheses',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid("()[]{}"));\n        System.out.println(isValid("([)]"));\n    }\n}`,
        expectedOutput: 'true\nfalse',
        description: `
<h2>LeetCode #20: Valid Parentheses</h2>
<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p>Every open bracket must be closed by the same type in the correct order. Use a stack to track matching closing brackets.</p>
`,
        hints: ['Push expected closing brackets onto the stack. When seeing a closing bracket, compare it with stack.pop().'],
      },
      {
        title: 'LeetCode #739: Daily Temperatures',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\npublic class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] answer = new int[n];\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prevIndex = stack.pop();\n                answer[prevIndex] = i - prevIndex;\n            }\n            stack.push(i);\n        }\n        return answer;\n    }\n\n    public static void main(String[] args) {\n        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};\n        System.out.println(Arrays.toString(dailyTemperatures(temps)));\n    }\n}`,
        expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]',
        description: `
<h2>LeetCode #739: Daily Temperatures</h2>
<p>Given an array of integers <code>temperatures</code>, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>-th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code>.</p>
<p>Solve this in O(N) using a Monotonic Decreasing Stack storing indices.</p>
`,
        hints: ['Store day indices on the stack. When the current temperature is warmer than temperatures[stack.peek()], pop and calculate days difference.'],
      }
    ],
    quiz: [
      {
        question: 'Why is java.util.ArrayDeque preferred over java.util.Stack for stack operations?',
        options: ['ArrayDeque is synchronized and thread-safe', 'Stack inherits from Vector, adding locking overhead and legacy architectural baggage', 'ArrayDeque has O(log N) operations while Stack has O(N)', 'Stack cannot store generic object references'],
        correctIndex: 1,
        explanation: 'Stack inherits from Vector, introducing unnecessary method synchronization. ArrayDeque provides faster, non-synchronized LIFO operations.'
      },
      {
        question: 'What is the overall time complexity of Daily Temperatures using a Monotonic Stack?',
        options: ['O(N^2)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'Each index is pushed onto the stack exactly once and popped at most once. Hence, total operations = 2N, which is O(N) linear time.'
      }
    ],
    project: {
      title: 'Shunting-Yard Math Expression Evaluator',
      description: `
<h2>Project: Shunting-Yard Math Expression Evaluator</h2>
<p>Build an arithmetic expression evaluator using Dijkstra's famous <strong>Shunting-Yard Algorithm</strong>.</p>
<p>Your program must parse infix mathematical expressions like <code>3 + 5 * (2 - 8)</code>, convert them into Postfix (Reverse Polish Notation) using an operator stack, and compute the integer result.</p>
`,
      language: 'java',
      starterCode: `import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ExpressionEvaluator {\n    public static int evaluate(String expression) {\n        // TODO: Implement Shunting-Yard evaluation\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Result: " + evaluate("3 + 5 * ( 2 - 8 )"));\n    }\n}`,
      requirements: [
        'Support integer operands and operators +, -, *, /',
        'Respect operator precedence (* and / before + and -)',
        'Support parentheses ( and ) to override normal precedence',
        'Throw an IllegalArgumentException on division by zero or malformed syntax'
      ]
    }
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 4: The Oracle's Vault — Hash Tables & Binary Search Invariants
  // ════════════════════════════════════════════════════════════════
  'week-8': {
    lessons: [
      {
        title: 'Hash Tables Internals: Collisions & Buckets',
        language: 'java',
        starterCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashMapInternals {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put("Hero", 100);\n        map.put("Mage", 80);\n        System.out.println("Hero HP: " + map.get("Hero"));\n    }\n}`,
        content: `
<h2>🔮 Chapter 10: The Oracle's Vault — Hash Tables</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Hash tables turn keys of arbitrary size into array indices in O(1) time. Explore hash collisions, load factors, and how Java 8's treeification prevents DoS attacks.</em>
</div>

<p>When two keys generate the same bucket index, Java stores them in a linked chain. If a bucket exceeds <strong>8 entries</strong> (TREEIFY_THRESHOLD) and map capacity is ≥ 64, Java converts that chain into a <strong>Red-Black Balanced BST</strong>, bounding lookup to <code>O(log N)</code>!</p>
        `,
      },
      {
        title: 'Binary Search: Boundaries & Rotated Arrays',
        language: 'java',
        starterCode: `public class BinarySearchInvariants {\n    public static int binarySearch(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n\n        while (left <= right) {\n            // Prevent integer overflow: left + (right - left) / 2\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {-1, 0, 3, 5, 9, 12};\n        System.out.println("Index of 9: " + binarySearch(sorted, 9));\n    }\n}`,
        content: `
<h2>🎯 Chapter 11: Binary Search Boundary Invariants</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Binary search sounds simple, yet 90% of engineers introduce boundary bugs or integer overflows. Master the midpoint calculation and rotated array invariants.</em>
</div>

<div class="callout callout--warn">
  <strong>⚠️ The Midpoint Integer Overflow Trap:</strong>
  In Java and C++, writing <code>(left + right) / 2</code> can cause 32-bit signed integer overflow if <code>left + right &gt; 2,147,483,647</code>! Always write:
  <pre><code>int mid = left + (right - left) / 2;</code></pre>
</div>
        `,
      }
    ],
    exercises: [
      {
        title: 'LeetCode #49: Group Anagrams',
        language: 'java',
        starterCode: `import java.util.*;\n\npublic class GroupAnagrams {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n\n    public static void main(String[] args) {\n        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};\n        List<List<String>> groups = groupAnagrams(words);\n        System.out.println("Number of groups: " + groups.size());\n    }\n}`,
        expectedOutput: 'Number of groups: 3',
        description: `
<h2>LeetCode #49: Group Anagrams</h2>
<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>
<p>Two strings are anagrams if sorting their characters yields the exact same canonical string key.</p>
`,
        hints: ['Sort the characters of each string to produce a canonical key. Group matching words under that key in a HashMap.'],
      },
      {
        title: 'LeetCode #33: Search in Rotated Sorted Array',
        language: 'java',
        starterCode: `public class RotatedBinarySearch {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n\n            // Left half is normally sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            } else { // Right half is normally sorted\n                if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {4, 5, 6, 7, 0, 1, 2};\n        System.out.println("Index of 0: " + search(nums, 0));\n    }\n}`,
        expectedOutput: 'Index of 0: 4',
        description: `
<h2>LeetCode #33: Search in Rotated Sorted Array</h2>
<p>Given an integer array <code>nums</code> sorted in ascending order (with distinct values) that was rotated at an unknown pivot index, find <code>target</code> in <strong>O(log N) time</strong>.</p>
<p>In any rotated sorted array, dividing at <code>mid</code> always leaves at least one half perfectly sorted.</p>
`,
        hints: ['Check if nums[left] <= nums[mid]. If so, the left half is sorted. Verify whether target lies within that sorted range.'],
      }
    ],
    quiz: [
      {
        question: 'What happens when a bucket in Java 8+ HashMap reaches 8 entries and map capacity >= 64?',
        options: ['It throws a HashCollisionException', 'It treeifies the bucket into a Red-Black tree to guarantee O(log N) lookup', 'It doubles the bucket array size without moving nodes', 'It drops the oldest entry like an LRU cache'],
        correctIndex: 1,
        explanation: 'To defend against hash collision attacks and performance degradation, Java 8 converts dense buckets into balanced Red-Black trees.'
      },
      {
        question: 'Why is mid calculated as `left + (right - left) / 2` instead of `(left + right) / 2`?',
        options: ['It executes faster on the CPU', 'It avoids 32-bit signed integer overflow when left + right exceeds 2^31 - 1', 'It automatically rounds up instead of down', 'It supports floating point indices'],
        correctIndex: 1,
        explanation: 'If left + right exceeds Integer.MAX_VALUE (2,147,483,647), it rolls over to a negative number, causing ArrayIndexOutOfBoundsException.'
      }
    ],
    project: {
      title: 'LeetCode Midterm Arena: 3 Timed Algorithmic Challenges',
      description: `
<h2>Project: LeetCode Midterm Contest</h2>
<p>Validate your Phase 2 algorithm mastery by building a benchmark runner that tests three core patterns: Two Pointers, Monotonic Stack, and Binary Search under strict memory and time bounds.</p>
`,
      language: 'java',
      starterCode: `public class AlgorithmicArena {\n    public static void main(String[] args) {\n        System.out.println("⚔️ Phase 2 DSA Midterm Arena Verified!");\n    }\n}`,
      requirements: [
        'Implement an O(N) Two Sum II solver',
        'Implement an O(N) Daily Temperatures monotonic stack solver',
        'Implement an O(log N) Rotated Sorted Array searcher',
        'Include unit test assertions verifying edge cases (empty inputs, single elements, negative values)'
      ]
    }
  }
};
