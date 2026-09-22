// ─── The Trials of Algor: LeetCode & DSA Mastery (Modules 1–4) ─────────────
// Part 1: Arena Foundations — Pointers, Windows, Lists, Stacks & Binary Search

export const phase2Content = {
  "week-5": {
    "lessons": [
      {
        "title": "Asymptotic Analysis & Big-O Battle Metrics",
        "language": "java",
        "starterCode": "public class BigO {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // O(1) - Constant time\n        System.out.println(\"First element: \" + arr[0]);\n\n        // O(N) - Linear time\n        for (int x : arr) {\n            System.out.print(x + \" \");\n        }\n        System.out.println();\n\n        // O(N^2) - Quadratic time\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = 0; j < arr.length; j++) {\n                System.out.print(\"(\" + arr[i] + \",\" + arr[j] + \") \");\n            }\n        }\n    }\n}",
        "content": "\n<h2>⚔️ Chapter 1: The Gates of Algor — Big-O Battle Metrics</h2>\n\n<div class=\"lesson-pixel-art\">\n  <img src=\"/images/pixel_algor_colosseum.jpg\" alt=\"The Grand Colosseum of Algor\" />\n  <div class=\"pixel-caption\">\n    ⚔️ SECTOR 00: THE GATES OF ALGOR — ENTERING THE ARENA OF BIG-O BATTLES\n  </div>\n</div>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome to the Colosseum of Algor, Gladiator. Here, brute-force O(N²) code is torn to shreds by Big-O monsters. Only algorithms forged with mathematical precision can survive the trials of massive scale. Learn to measure time, space, and amortized efficiency.</em>\n</div>\n\n<p>In the arena of competitive algorithms and technical interviews, an algorithm's prowess is measured not by how fast it runs on a handful of test cases, but by its <strong>Asymptotic Growth Rate</strong> as the input size <code>N</code> scales toward infinity (<code>N → ∞</code>).</p>\n\n<h3>The Hierarchy of Complexity (From Supreme to Lethal)</h3>\n\n<pre class=\"ascii-diagram\">\nRuntime (T)\n   ^\n   |                                     / O(2^N) [Exponential Doom]\n   |                                    /\n   |                                   / O(N^2) [Quadratic - Brute Force]\n   |                                  /\n   |                                 / O(N log N) [Optimal Sorts]\n   |                                /\n   |                             --/ O(N) [Linear Scan]\n   |                        ---/\n   |                   ----/ O(log N) [Binary Search]\n   |  ------------------- O(1) [Constant Lookups]\n   +----------------------------------------------------> Input Size (N)\n</pre>\n\n<ul>\n  <li><strong>O(1) Constant:</strong> Direct array indexing, HashMap lookups. Speed is entirely independent of input size.</li>\n  <li><strong>O(log N) Logarithmic:</strong> Dividing the search space in half at every step (Binary Search, Balanced BST). Sifting through 1,000,000 items requires merely ~20 operations!</li>\n  <li><strong>O(N) Linear:</strong> Single-pass scans (Two Pointers, Sliding Window, Monotonic Stacks). Traverses each element a bounded number of times.</li>\n  <li><strong>O(N log N) Linearithmic:</strong> The theoretical mathematical lower bound for comparison-based sorting (MergeSort, QuickSort, TimSort).</li>\n  <li><strong>O(N²) Quadratic:</strong> Nested loops over the collection. Acceptable when <code>N ≤ 1,000</code>, but catastrophic when <code>N ≥ 100,000</code>.</li>\n  <li><strong>O(2^N) / O(N!) Exponential:</strong> Generating all permutations or subsets without memoization.</li>\n</ul>\n\n<h3>Amortized Time vs Worst-Case Guarantees</h3>\n<p>Consider appending an element to a dynamic array (like Java's <code>ArrayList</code> or Python's <code>list</code>). When capacity is full, the array allocates a block twice as large and copies all <code>N</code> items across, taking <code>O(N)</code> time. However, this costly reallocation happens so rarely that spread across all operations, the <strong>amortized time per append is strictly O(1)</strong>.</p>\n        "
      },
      {
        "title": "The Two-Pointer Collision & Floyd Cycles",
        "language": "java",
        "starterCode": "import java.util.Arrays;\n\npublic class TwoPointers {\n    public static boolean isPalindrome(String s) {\n        int left = 0;\n        int right = s.length() - 1;\n\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n        System.out.println(isPalindrome(\"race a car\"));\n    }\n}",
        "content": "\n<h2>🎯 Chapter 2: The Two-Pointer Collision Technique</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Why check every pair with nested O(N²) loops when two coordinated pointers can eliminate unnecessary comparisons in a single O(N) sweep? Master pointer convergence and cycle detection.</em>\n</div>\n\n<h3>The Inward Collision Pattern</h3>\n<p>When searching for pairs in a <strong>sorted</strong> array or verifying symmetry (e.g. Palindromes), two pointers begin at opposite frontiers and step inward:</p>\n\n<pre class=\"ascii-diagram\">\nIndex:     0    1    2    3    4    5    6\nArray:   [ 2,   7,  11,  15,  19,  24,  30 ]\n           ^                                 ^\n           |                                 |\n       Left Pointer                    Right Pointer\n       (left = 0)                     (right = 6)\n\nSum: nums[left] + nums[right] = 2 + 30 = 32\nTarget: 26 -> Sum too large! Decrement right pointer: right--\n</pre>\n\n<p>Because the array is sorted, if the current sum is greater than the target, no other pairing with <code>nums[right]</code> could possibly equal the target. We safely discard the entire right frontier in O(1) time!</p>\n\n<h3>Floyd's Fast & Slow Pointers (Tortoise & Hare)</h3>\n<p>Two pointers start at the head of a sequence. The <code>slow</code> pointer steps 1 position per cycle while <code>fast</code> steps 2 positions. If a cycle exists, <code>fast</code> is mathematically guaranteed to enter the loop first and lap <code>slow</code> within <code>O(N)</code> steps using <strong>O(1) auxiliary space</strong>.</p>\n        "
      },
      {
        "title": "The Sliding Window: Contiguous Subarrays",
        "language": "java",
        "starterCode": "public class SlidingWindow {\n    // Fixed-size window of size k\n    public static int maxSubarraySum(int[] arr, int k) {\n        int windowSum = 0;\n        for (int i = 0; i < k; i++) {\n            windowSum += arr[i];\n        }\n        int maxSum = windowSum;\n\n        for (int i = k; i < arr.length; i++) {\n            windowSum += arr[i] - arr[i - k]; // Slide: add right, drop left\n            maxSum = Math.max(maxSum, windowSum);\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 1, 5, 1, 3, 2};\n        System.out.println(\"Max sum window of size 3: \" + maxSubarraySum(nums, 3));\n    }\n}",
        "content": "\n<h2>🪟 Chapter 3: The Sliding Window Dynamic Frame</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Contiguous subarrays often trigger O(N²) recalculations if analyzed naively. A sliding window maintains the state of a moving frame, updating boundary elements in O(1) time as it glides across the array.</em>\n</div>\n\n<h3>Fixed vs Dynamic Sliding Windows</h3>\n\n<pre class=\"ascii-diagram\">\nInitial Window of size k=3:\n[ 2,  1,  5 ], 1,  3,  2    --> sum = 8\n\nSlide Right by 1:\n  2, [ 1,  5,  1 ], 3,  2   --> sum = 8 - (dropped 2) + (added 1) = 7\n       ^       ^\n       L       R\n</pre>\n\n<ul>\n  <li><strong>Fixed Window:</strong> The window width <code>k</code> is constant. You slide the window by adding the incoming element at <code>R</code> and subtracting the outgoing element at <code>L = R - k</code> in <code>O(1)</code> time.</li>\n  <li><strong>Dynamic Window:</strong> Used when finding the <em>longest or shortest valid subarray</em> satisfying a constraint. Expand <code>R</code> until the window is valid, then contract <code>L</code> until the condition breaks.</li>\n</ul>\n        "
      },
      {
        "title": "Prefix Sums & Range Query Acceleration",
        "language": "java",
        "starterCode": "import java.util.Arrays;\n\npublic class PrefixSumDemo {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 4, 1, 5, 9};\n        int[] prefix = new int[nums.length + 1];\n\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n\n        System.out.println(\"Prefix Array: \" + Arrays.toString(prefix));\n        // Range sum [2, 4] -> prefix[5] - prefix[2]\n        int sum = prefix[5] - prefix[2];\n        System.out.println(\"Sum of range [2, 4]: \" + sum);\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Prefix Sums & Difference Arrays</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>When queries demand the sum of elements between arbitrary indices L and R, a naive loop takes O(N) per query. Precomputing a Prefix Sum array answers any range query in instant O(1) time!</em>\n</div>\n\n<p>A Prefix Sum array stores running cumulative totals:</p>\n<pre><code>prefix[0] = 0\nprefix[i + 1] = prefix[i] + nums[i]</code></pre>\n\n<p>Any arbitrary range sum from index <code>L</code> to <code>R</code> inclusive is calculated with a single subtraction:</p>\n<pre><code>sum(L, R) = prefix[R + 1] - prefix[L]</code></pre>\n        "
      },
      {
        "title": "Difference Arrays & Coordinate Compression: Batch Interval Updates",
        "language": "java",
        "starterCode": "public class DifferenceArray {\n    private int[] diff;\n\n    public DifferenceArray(int[] nums) {\n        diff = new int[nums.length];\n        diff[0] = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            diff[i] = nums[i] - nums[i - 1];\n        }\n    }\n\n    // O(1) interval update: add val to [i, j]\n    public void update(int i, int j, int val) {\n        diff[i] += val;\n        if (j + 1 < diff.length) {\n            diff[j + 1] -= val;\n        }\n    }\n\n    // O(N) reconstruct the final array\n    public int[] result() {\n        int[] res = new int[diff.length];\n        res[0] = diff[0];\n        for (int i = 1; i < diff.length; i++) {\n            res[i] = res[i - 1] + diff[i];\n        }\n        return res;\n    }\n\n    public static void main(String[] args) {\n        int[] initial = {0, 0, 0, 0, 0};\n        DifferenceArray da = new DifferenceArray(initial);\n        da.update(1, 3, 5); // Add 5 to index 1..3\n        da.update(2, 4, 3); // Add 3 to index 2..4\n        int[] finalArr = da.result();\n        for (int val : finalArr) {\n            System.out.print(val + \" \"); // Output: 0 5 8 8 3\n        }\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Difference Arrays & Range Mutation Mastery</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>When thousands of spells modify continuous segments of the battlefield simultaneously, a naive nested loop collapses into O(Q × N) latency. A true Algorithmic Gladiator executes range additions in O(1) time using the Difference Array technique!</em>\n</div>\n\n<p>A <strong>Difference Array</strong> <code>diff</code> is defined such that <code>diff[i] = nums[i] - nums[i - 1]</code>. Its mathematical superpower is converting a range increment over <code>[L, R]</code> into two single-point mutations:</p>\n\n<pre class=\"ascii-diagram\">\nOriginal: [0,  0,  0,  0,  0]\nAdd +5 to [1, 3]:\ndiff[1] += 5\ndiff[3 + 1] -= 5\ndiff:     [0, +5,  0,  0, -5]\nPrefix Sum:\nres[0] = 0\nres[1] = 0 + 5 = 5\nres[2] = 5 + 0 = 5\nres[3] = 5 + 0 = 5\nres[4] = 5 + (-5) = 0\nReconstructed: [0, 5, 5, 5, 0]  <-- Exactly interval [1, 3] received +5!\n</pre>\n\n<h3>Key Advantages & Interview Applications</h3>\n<ul>\n  <li><strong>O(1) updates:</strong> Apply <code>Q</code> range updates in <code>O(Q)</code> total time instead of <code>O(Q × N)</code>.</li>\n  <li><strong>O(N) recovery:</strong> Compute a standard running prefix sum once at the end to retrieve all values.</li>\n  <li><strong>Classic Problems:</strong> Corporate Flight Bookings (LeetCode 1109), Range Addition (LeetCode 370), Car Pooling (LeetCode 1094).</li>\n</ul>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #1: Two Sum (HashMap One-Pass)",
        "language": "java",
        "starterCode": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class TwoSum {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        int[] res = twoSum(nums, 9);\n        System.out.println(res[0] + \" \" + res[1]);\n    }\n}",
        "expectedOutput": "0 1",
        "description": "\n<h2>LeetCode #1: Two Sum</h2>\n<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>\n<p>Use a <code>HashMap</code> to store values and their indices. In a single pass, check if <code>target - nums[i]</code> already exists in the map!</p>\n",
        "hints": [
          "For each number, the required pair value is target - nums[i]. Check if this complement is already in your map."
        ]
      },
      {
        "title": "LeetCode #121: Best Time to Buy and Sell Stock",
        "language": "java",
        "starterCode": "public class BuySellStock {\n    public static int maxProfit(int[] prices) {\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n\n        for (int price : prices) {\n            if (price < minPrice) {\n                minPrice = price;\n            } else if (price - minPrice > maxProfit) {\n                maxProfit = price - minPrice;\n            }\n        }\n        return maxProfit;\n    }\n\n    public static void main(String[] args) {\n        int[] prices = {7, 1, 5, 3, 6, 4};\n        System.out.println(\"Max Profit: \" + maxProfit(prices));\n    }\n}",
        "expectedOutput": "Max Profit: 5",
        "description": "\n<h2>LeetCode #121: Best Time to Buy & Sell Stock</h2>\n<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the stock price on the <code>i</code>-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.</p>\n<p>Keep track of the minimum price observed so far, and calculate the profit if sold today.</p>\n",
        "hints": [
          "Keep a running minPrice. For each day, profit = price - minPrice. Update maxProfit if profit is higher."
        ]
      },
      {
        "title": "LeetCode #209: Minimum Size Subarray Sum",
        "language": "java",
        "starterCode": "public class MinSubArrayLen {\n    public static int minSubArrayLen(int target, int[] nums) {\n        int left = 0;\n        int sum = 0;\n        int minLen = Integer.MAX_VALUE;\n\n        for (int right = 0; right < nums.length; right++) {\n            sum += nums[right];\n            while (sum >= target) {\n                minLen = Math.min(minLen, right - left + 1);\n                sum -= nums[left++];\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? 0 : minLen;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, 1, 2, 4, 3};\n        System.out.println(\"Min length: \" + minSubArrayLen(7, nums));\n    }\n}",
        "expectedOutput": "Min length: 2",
        "description": "\n<h2>LeetCode #209: Minimum Size Subarray Sum</h2>\n<p>Given an array of positive integers <code>nums</code> and a positive integer <code>target</code>, return the minimal length of a contiguous subarray whose sum is greater than or equal to <code>target</code>. If there is no such subarray, return 0.</p>\n<p>Use a dynamic sliding window: expand with <code>right</code>, and shrink with <code>left</code> whenever <code>sum >= target</code>.</p>\n",
        "hints": [
          "Expand right pointer until sum >= target, then shrink left pointer as much as possible while maintaining sum >= target."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the time complexity of the optimal Two Sum solution using a HashMap?",
        "options": [
          "O(N^2) time, O(1) space",
          "O(N) time, O(N) space",
          "O(N log N) time, O(1) space",
          "O(1) time, O(N) space"
        ],
        "correctIndex": 1,
        "explanation": "By storing seen numbers in a HashMap, we check complement existence in O(1) time, giving O(N) total time and O(N) space complexity."
      },
      {
        "question": "When should you choose a Dynamic Sliding Window over a Fixed Sliding Window?",
        "options": [
          "When the target window size k is constant",
          "When the problem asks for the minimum or maximum subarray length meeting a condition",
          "When sorting is required before windowing",
          "Only when using recursive backtracking"
        ],
        "correctIndex": 1,
        "explanation": "Dynamic sliding windows are used when window length varies and we must find the shortest or longest window satisfying a dynamic condition."
      },
      {
        "question": "Given an array of size N, how fast can a Prefix Sum array answer a range sum query?",
        "options": [
          "O(N)",
          "O(log N)",
          "O(1)",
          "O(N log N)"
        ],
        "correctIndex": 2,
        "explanation": "Prefix sums precompute cumulative totals in O(N) time, enabling any subsequent range sum query to execute in O(1) instant subtraction."
      }
    ],
    "project": false
  },
  "week-6": {
    "lessons": [
      {
        "title": "Linked List Architecture & Heap Pointer Manipulation",
        "language": "java",
        "starterCode": "class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\npublic class LinkedListBasics {\n    public static void main(String[] args) {\n        ListNode head = new ListNode(10);\n        head.next = new ListNode(20);\n        head.next.next = new ListNode(30);\n\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + (curr.next != null ? \" -> \" : \"\\n\"));\n            curr = curr.next;\n        }\n    }\n}",
        "content": "\n<h2>🔗 Chapter 5: The Labyrinth of Pointers — Linked Lists</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Unlike contiguous arrays, linked lists are dynamic chains scattered across heap memory. Master pointer rewiring, sentinel dummy nodes, and in-place link reversal without losing references.</em>\n</div>\n\n<h3>Array vs Linked List Memory Model</h3>\n\n<pre class=\"ascii-diagram\">\nArray Memory (Contiguous block):\n[ Index 0: 10 ][ Index 1: 20 ][ Index 2: 30 ]  <-- Fast O(1) index, slow O(N) insert\n\nLinked List Memory (Dispersed Nodes on Heap):\n[ Node @0x04A ]       [ Node @0x8F1 ]       [ Node @0x12B ]\n| val: 10     | ----> | val: 20     | ----> | val: 30     | ----> null\n| next: 0x8F1 |       | next: 0x12B |       | next: null  |\n</pre>\n        "
      },
      {
        "title": "Floyd's Cycle Detection (Tortoise & Hare)",
        "language": "java",
        "starterCode": "public class CycleDetection {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true; // Cycle detected!\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        ListNode n1 = new ListNode(1);\n        ListNode n2 = new ListNode(2);\n        ListNode n3 = new ListNode(3);\n        n1.next = n2;\n        n2.next = n3;\n        n3.next = n2; // Loop\n\n        System.out.println(\"Has cycle: \" + hasCycle(n1));\n    }\n}",
        "content": "\n<h2>🐢 Chapter 6: Floyd's Cycle-Finding Algorithm</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>How can you detect an infinite loop in a linked list without allocating an auxiliary HashSet? Floyd's cycle detection uses relative velocities to catch loops in O(1) space.</em>\n</div>\n\n<p>Imagine two runners on a circular track. Even if one starts ahead, if runner B runs at twice the speed of runner A, runner B is mathematically guaranteed to lap runner A!</p>\n        "
      },
      {
        "title": "The Sentinel (Dummy Node) Architecture",
        "language": "java",
        "starterCode": "public class DummyNodeDemo {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode removeElements(ListNode head, int val) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode curr = dummy;\n\n        while (curr.next != null) {\n            if (curr.next.val == val) {\n                curr.next = curr.next.next; // Bypass node\n            } else {\n                curr = curr.next;\n            }\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1);\n        h.next = new ListNode(2);\n        h.next.next = new ListNode(1);\n        ListNode res = removeElements(h, 1);\n        System.out.println(\"Filtered head: \" + res.val);\n    }\n}",
        "content": "\n<h2>🛡️ Chapter 7: The Sentinel Dummy Node Technique</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Modifying or deleting the head node is the number one source of NullPointerExceptions in coding interviews. A sentinel dummy node standardizes all operations so every node has a predecessor.</em>\n</div>\n\n<pre class=\"ascii-diagram\">\nWithout Dummy:\n[ Head ] -> [ Node 2 ] -> [ Node 3 ]\nIf Head must be deleted, you must rewrite 'head = head.next'.\n\nWith Dummy Node:\n[ Dummy(-1) ] -> [ Head ] -> [ Node 2 ] -> [ Node 3 ]\n                 ^\n                 Target for removal!\nJust execute: dummy.next = dummy.next.next! Return dummy.next at the end.\n</pre>\n        "
      },
      {
        "title": "Reversing Sublists & K-Group Node Manipulation",
        "language": "java",
        "starterCode": "class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\npublic class ReverseKGroup {\n    public static ListNode reverseKGroup(ListNode head, int k) {\n        ListNode curr = head;\n        int count = 0;\n        while (curr != null && count < k) {\n            curr = curr.next;\n            count++;\n        }\n        if (count == k) {\n            ListNode reversedHead = reverseKGroup(curr, k);\n            while (count-- > 0) {\n                ListNode temp = head.next;\n                head.next = reversedHead;\n                reversedHead = head;\n                head = temp;\n            }\n            head = reversedHead;\n        }\n        return head;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Sublist Inversion & K-Group Manipulation</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Reversing an entire linked list is child's play. The true gladiatorial test is reversing nodes in chunks of K while leaving leftovers intact, with O(1) auxiliary space and zero node allocations!</em>\n</div>\n\n<p>In-place pointer reversal requires meticulously maintaining three references: <code>prev</code>, <code>curr</code>, and <code>next</code>. When manipulating subsegments:</p>\n<pre class=\"ascii-diagram\">\nBefore: [Dummy] -> [Node 1] -> [Node 2] -> [Node 3] -> [Node 4] -> NULL\nReverse K=2 chunks:\nChunk 1: [2] -> [1]\nChunk 2: [4] -> [3]\nAfter:  [Dummy] -> [Node 2] -> [Node 1] -> [Node 4] -> [Node 3] -> NULL\n</pre>\n<h3>Crucial Edge Cases</h3>\n<ul>\n  <li><code>k = 1</code>: Sublist remains unchanged.</li>\n  <li>Remaining nodes <code>&lt; k</code>: Must be preserved in their original sequence.</li>\n  <li>Stitching boundaries: Connecting the tail of the previous group to the new head of the reversed group.</li>\n</ul>\n"
      },
      {
        "title": "Merging & Sorting Lists: The MergeSort Linked List Odyssey",
        "language": "java",
        "starterCode": "public class SortList {\n    public static ListNode sortList(ListNode head) {\n        if (head == null || head.next == null) return head;\n\n        // 1. Split list using Fast & Slow pointers\n        ListNode prev = null, slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            prev = slow;\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        prev.next = null; // Sever the list into two halves\n\n        // 2. Recursively sort halves\n        ListNode l1 = sortList(head);\n        ListNode l2 = sortList(slow);\n\n        // 3. Merge two sorted lists\n        return merge(l1, l2);\n    }\n\n    private static ListNode merge(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0), tail = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val < l2.val) { tail.next = l1; l1 = l1.next; }\n            else { tail.next = l2; l2 = l2.next; }\n            tail = tail.next;\n        }\n        tail.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: MergeSort on Linked Lists — O(N log N) Guarantee</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>QuickSort degrades to O(N²) on adversarial inputs, and arrays require O(N) extra space to merge. But for linked lists, MergeSort achieves strictly O(N log N) runtime with O(1) auxiliary pointer manipulation!</em>\n</div>\n\n<p>Sorting a singly linked list in <code>O(N log N)</code> time without allocating auxiliary memory arrays is an interview favorite (LeetCode 148):</p>\n<ol>\n  <li><strong>Find Midpoint:</strong> Use the Tortoise & Hare technique (slow/fast pointers) to locate the midpoint in <code>O(N)</code>.</li>\n  <li><strong>Sever Connection:</strong> Set <code>prev.next = null</code> to break the list into two independent chains.</li>\n  <li><strong>Conquer & Merge:</strong> Recursively sort both chains, then zip them back together using a Sentinel node in <code>O(N)</code>.</li>\n</ol>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #206: Reverse Linked List",
        "language": "java",
        "starterCode": "public class ReverseList {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    public static void main(String[] args) {\n        ListNode a = new ListNode(1);\n        a.next = new ListNode(2);\n        a.next.next = new ListNode(3);\n        ListNode rev = reverseList(a);\n        System.out.println(rev.val + \" -> \" + rev.next.val + \" -> \" + rev.next.next.val);\n    }\n}",
        "expectedOutput": "3 -> 2 -> 1",
        "description": "\n<h2>LeetCode #206: Reverse Linked List</h2>\n<p>Given the head of a singly linked list, reverse the list in-place and return the reversed list's new head.</p>\n<p>Track three pointers: <code>prev</code>, <code>curr</code>, and <code>nextTemp</code>. Reverse the link at each step.</p>\n",
        "hints": [
          "Save curr.next in a temporary pointer before re-pointing curr.next = prev. Advance prev and curr forward."
        ]
      },
      {
        "title": "LeetCode #21: Merge Two Sorted Lists",
        "language": "java",
        "starterCode": "public class MergeSortedLists {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(-1);\n        ListNode curr = dummy;\n\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                curr.next = list1;\n                list1 = list1.next;\n            } else {\n                curr.next = list2;\n                list2 = list2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode l1 = new ListNode(1);\n        l1.next = new ListNode(4);\n        ListNode l2 = new ListNode(2);\n        l2.next = new ListNode(3);\n\n        ListNode merged = mergeTwoLists(l1, l2);\n        System.out.println(merged.val + \" \" + merged.next.val + \" \" + merged.next.next.val + \" \" + merged.next.next.next.val);\n    }\n}",
        "expectedOutput": "1 2 3 4",
        "description": "\n<h2>LeetCode #21: Merge Two Sorted Lists</h2>\n<p>Merge two sorted linked lists into one sorted list by splicing together the existing nodes.</p>\n<p>Use a dummy head node. Compare the head values of both lists and advance the smaller node pointer.</p>\n",
        "hints": [
          "Create a dummy node. Use while(l1 != null && l2 != null) to append the smaller node. Attach the non-null remainder after the loop."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the space complexity of Floyd's Cycle Detection Algorithm?",
        "options": [
          "O(N)",
          "O(1)",
          "O(log N)",
          "O(N^2)"
        ],
        "correctIndex": 1,
        "explanation": "Floyd's algorithm only uses two pointer references (slow and fast), achieving O(1) auxiliary space."
      },
      {
        "question": "Why is a dummy (sentinel) node frequently used in linked list problems?",
        "options": [
          "It accelerates traversal time by 50%",
          "It avoids edge-case handling when inserting or deleting at the list head",
          "It prevents garbage collection leaks in Java",
          "It converts a singly linked list to doubly linked list"
        ],
        "correctIndex": 1,
        "explanation": "A dummy node points to the true head, eliminating special null-checking or re-assigning head pointers."
      }
    ],
    "project": false
  },
  "week-7": {
    "lessons": [
      {
        "title": "Stack & Queue Principles (LIFO vs FIFO)",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class StackQueueDemo {\n    public static void main(String[] args) {\n        // Preferred Stack implementation in modern Java\n        Deque<Integer> stack = new ArrayDeque<>();\n        stack.push(10);\n        stack.push(20);\n        System.out.println(\"Stack Pop: \" + stack.pop()); // 20 (LIFO)\n\n        // Queue\n        Deque<Integer> queue = new ArrayDeque<>();\n        queue.offer(10);\n        queue.offer(20);\n        System.out.println(\"Queue Poll: \" + queue.poll()); // 10 (FIFO)\n    }\n}",
        "content": "\n<h2>🥞 Chapter 8: The Iron Crucible — Stacks & Queues</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Stacks (LIFO) and Queues (FIFO) govern function calls, undo buffers, expression parsing, and breadth-first search. In modern Java, never use the legacy java.util.Stack class; master ArrayDeque.</em>\n</div>\n\n<h3>Why java.util.Stack is Deprecated in Modern Engineering</h3>\n<p>Java's original <code>Stack</code> class extends <code>Vector</code>, meaning every single method (<code>push</code>, <code>pop</code>, <code>peek</code>) is synchronized with expensive thread locks. <code>ArrayDeque</code> is unsynchronized, resizes dynamically without array copying overhead, and is significantly faster on modern hardware.</p>\n        "
      },
      {
        "title": "The Monotonic Stack Pattern & O(N) Lookups",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\npublic class MonotonicStack {\n    public static int[] nextGreaterElements(int[] nums) {\n        int[] result = new int[nums.length];\n        Arrays.fill(result, -1);\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < nums.length; i++) {\n            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n                int prevIndex = stack.pop();\n                result[prevIndex] = nums[i];\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {2, 1, 2, 4, 3};\n        System.out.println(Arrays.toString(nextGreaterElements(arr)));\n    }\n}",
        "content": "\n<h2>🏔️ Chapter 9: The Monotonic Stack Pattern</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Finding the 'Next Greater Element' for every element in an array naively takes O(N²) quadratic time. A Monotonic Stack preserves elements in strictly increasing or decreasing order, solving this in pure O(N) linear time!</em>\n</div>\n\n<pre class=\"ascii-diagram\">\nInput: [ 2, 1, 2, 4, 3 ]\nStack stores INDICES whose \"next greater\" has not yet been discovered:\n\ni=0 (val 2): Stack = [0]\ni=1 (val 1): 1 &lt; 2, push 1. Stack = [0, 1]\ni=2 (val 2): 2 &gt; 1! Pop index 1! nextGreater[1] = 2. Push 2. Stack = [0, 2]\ni=3 (val 4): 4 &gt; 2! Pop 2 (nextGreater[2]=4). 4 &gt; 2! Pop 0 (nextGreater[0]=4).\n            Push 3. Stack = [3]\ni=4 (val 3): 3 &lt; 4, push 4. Stack = [3, 4]\n</pre>\n        "
      },
      {
        "title": "Balanced Parentheses, Parsing & Expression Syntax Trees",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid(\"{[()]}\")); // true\n        System.out.println(isValid(\"{[(])}\")); // false\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Balanced Parentheses & Parser Engineering</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Compilers, math evaluators, and JSON parsers all share one primal core: the LIFO Call Stack. Learn how matching brackets decode deeply nested grammatical structures.</em>\n</div>\n\n<p>The <strong>Stack Pattern</strong> for matching syntax ensures that the most recently opened bracket must be the earliest closed:</p>\n<pre class=\"ascii-diagram\">\nString: \" { [ ( ) ] } \"\nRead '{' -> Push '}'\nRead '[' -> Push ']'\nRead '(' -> Push ')'\nRead ')' -> Pop ')' matches!\nRead ']' -> Pop ']' matches!\nRead '}' -> Pop '}' matches!\nStack is empty -> SYNTAX VALID!\n</pre>\n"
      },
      {
        "title": "Min-Stack & Max-Queue with O(1) Auxiliary Guarantees",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class MinStack {\n    private Deque<Integer> stack = new ArrayDeque<>();\n    private Deque<Integer> minStack = new ArrayDeque<>();\n\n    public void push(int val) {\n        stack.push(val);\n        if (minStack.isEmpty() || val <= minStack.peek()) {\n            minStack.push(val);\n        }\n    }\n\n    public void pop() {\n        if (stack.pop().equals(minStack.peek())) {\n            minStack.pop();\n        }\n    }\n\n    public int top() { return stack.peek(); }\n    public int getMin() { return minStack.peek(); }\n}",
        "content": "\n<h2>⚡ Chapter 4: Min-Stack & Constant-Time Invariant Tracking</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>How can you retrieve the minimum element of a dynamic stack in strictly O(1) time while items are pushed and popped arbitrarily? Discover the Dual-Stack state invariant!</em>\n</div>\n\n<p>By pairing each element with the historical minimum at that point in time—or maintaining a dedicated synchronized <code>minStack</code>—we achieve guaranteed <code>O(1)</code> time for <code>push</code>, <code>pop</code>, <code>top</code>, and <code>getMin</code>.</p>\n"
      },
      {
        "title": "Monotonic Deque & The Sliding Window Maximum Titan",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class SlidingWindowMax {\n    public static int[] maxSlidingWindow(int[] nums, int k) {\n        int n = nums.length;\n        int[] result = new int[n - k + 1];\n        Deque<Integer> deque = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            // 1. Remove indices that fell out of window [i - k + 1, i]\n            if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {\n                deque.pollFirst();\n            }\n            // 2. Remove smaller elements from back (they can never be max)\n            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {\n                deque.pollLast();\n            }\n            deque.offerLast(i);\n            // 3. Window is full; record max\n            if (i >= k - 1) {\n                result[i - k + 1] = nums[deque.peekFirst()];\n            }\n        }\n        return result;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Monotonic Deque & The Sliding Window Maximum</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Given an array of size 100,000 and a window K of 10,000, calculating the maximum in each window naively takes O(N × K) = 1,000,000,000 operations. The Monotonic Deque slashes this to strictly O(N) linear time!</em>\n</div>\n\n<p>The <strong>Monotonic Deque</strong> maintains indices in monotonically decreasing order of their array values. Elements smaller than the new arrival can never become the maximum in any subsequent window and are ejected from the back immediately.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #20: Valid Parentheses",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ValidParentheses {\n    public static boolean isValid(String s) {\n        Deque<Character> stack = new ArrayDeque<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()[]{}\"));\n        System.out.println(isValid(\"([)]\"));\n    }\n}",
        "expectedOutput": "true\nfalse",
        "description": "\n<h2>LeetCode #20: Valid Parentheses</h2>\n<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>\n<p>Every open bracket must be closed by the same type in the correct order. Use a stack to track matching closing brackets.</p>\n",
        "hints": [
          "Push expected closing brackets onto the stack. When seeing a closing bracket, compare it with stack.pop()."
        ]
      },
      {
        "title": "LeetCode #739: Daily Temperatures",
        "language": "java",
        "starterCode": "import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\npublic class DailyTemperatures {\n    public static int[] dailyTemperatures(int[] temperatures) {\n        int n = temperatures.length;\n        int[] answer = new int[n];\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < n; i++) {\n            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {\n                int prevIndex = stack.pop();\n                answer[prevIndex] = i - prevIndex;\n            }\n            stack.push(i);\n        }\n        return answer;\n    }\n\n    public static void main(String[] args) {\n        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};\n        System.out.println(Arrays.toString(dailyTemperatures(temps)));\n    }\n}",
        "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "description": "\n<h2>LeetCode #739: Daily Temperatures</h2>\n<p>Given an array of integers <code>temperatures</code>, return an array <code>answer</code> such that <code>answer[i]</code> is the number of days you have to wait after the <code>i</code>-th day to get a warmer temperature. If there is no future day for which this is possible, keep <code>answer[i] == 0</code>.</p>\n<p>Solve this in O(N) using a Monotonic Decreasing Stack storing indices.</p>\n",
        "hints": [
          "Store day indices on the stack. When the current temperature is warmer than temperatures[stack.peek()], pop and calculate days difference."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is java.util.ArrayDeque preferred over java.util.Stack for stack operations?",
        "options": [
          "ArrayDeque is synchronized and thread-safe",
          "Stack inherits from Vector, adding locking overhead and legacy architectural baggage",
          "ArrayDeque has O(log N) operations while Stack has O(N)",
          "Stack cannot store generic object references"
        ],
        "correctIndex": 1,
        "explanation": "Stack inherits from Vector, introducing unnecessary method synchronization. ArrayDeque provides faster, non-synchronized LIFO operations."
      },
      {
        "question": "What is the overall time complexity of Daily Temperatures using a Monotonic Stack?",
        "options": [
          "O(N^2)",
          "O(N log N)",
          "O(N)",
          "O(2^N)"
        ],
        "correctIndex": 2,
        "explanation": "Each index is pushed onto the stack exactly once and popped at most once. Hence, total operations = 2N, which is O(N) linear time."
      }
    ],
    "project": {
      "title": "Shunting-Yard Math Expression Evaluator",
      "description": "\n<h2>Project: Shunting-Yard Math Expression Evaluator</h2>\n<p>Build an arithmetic expression evaluator using Dijkstra's famous <strong>Shunting-Yard Algorithm</strong>.</p>\n<p>Your program must parse infix mathematical expressions like <code>3 + 5 * (2 - 8)</code>, convert them into Postfix (Reverse Polish Notation) using an operator stack, and compute the integer result.</p>\n",
      "language": "java",
      "starterCode": "import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class ExpressionEvaluator {\n    public static int evaluate(String expression) {\n        // TODO: Implement Shunting-Yard evaluation\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Result: \" + evaluate(\"3 + 5 * ( 2 - 8 )\"));\n    }\n}",
      "requirements": [
        "Support integer operands and operators +, -, *, /",
        "Respect operator precedence (* and / before + and -)",
        "Support parentheses ( and ) to override normal precedence",
        "Throw an IllegalArgumentException on division by zero or malformed syntax"
      ]
    }
  },
  "week-8": {
    "lessons": [
      {
        "title": "Hash Tables Internals: Collisions & Buckets",
        "language": "java",
        "starterCode": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashMapInternals {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put(\"Hero\", 100);\n        map.put(\"Mage\", 80);\n        System.out.println(\"Hero HP: \" + map.get(\"Hero\"));\n    }\n}",
        "content": "\n<h2>🔮 Chapter 10: The Oracle's Vault — Hash Tables</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Hash tables turn keys of arbitrary size into array indices in O(1) time. Explore hash collisions, load factors, and how Java 8's treeification prevents DoS attacks.</em>\n</div>\n\n<p>When two keys generate the same bucket index, Java stores them in a linked chain. If a bucket exceeds <strong>8 entries</strong> (TREEIFY_THRESHOLD) and map capacity is ≥ 64, Java converts that chain into a <strong>Red-Black Balanced BST</strong>, bounding lookup to <code>O(log N)</code>!</p>\n        "
      },
      {
        "title": "Binary Search: Boundaries & Rotated Arrays",
        "language": "java",
        "starterCode": "public class BinarySearchInvariants {\n    public static int binarySearch(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n\n        while (left <= right) {\n            // Prevent integer overflow: left + (right - left) / 2\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {-1, 0, 3, 5, 9, 12};\n        System.out.println(\"Index of 9: \" + binarySearch(sorted, 9));\n    }\n}",
        "content": "\n<h2>🎯 Chapter 11: Binary Search Boundary Invariants</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Binary search sounds simple, yet 90% of engineers introduce boundary bugs or integer overflows. Master the midpoint calculation and rotated array invariants.</em>\n</div>\n\n<div class=\"callout callout--warn\">\n  <strong>⚠️ The Midpoint Integer Overflow Trap:</strong>\n  In Java and C++, writing <code>(left + right) / 2</code> can cause 32-bit signed integer overflow if <code>left + right &gt; 2,147,483,647</code>! Always write:\n  <pre><code>int mid = left + (right - left) / 2;</code></pre>\n</div>\n        "
      },
      {
        "title": "Group Anagrams & Frequency Hash Signatures",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class GroupAnagrams {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            // Character frequency hash signature\n            int[] count = new int[26];\n            for (char c : s.toCharArray()) count[c - 'a']++;\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < 26; i++) {\n                sb.append('#').append(count[i]);\n            }\n            String key = sb.toString();\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Anagram Clustering & Character Frequency Signatures</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>Sorting every string takes O(K log K) where K is string length. When processing 10,000,000 strings, an O(K) 26-element character count signature prevents sorting overhead and groups anagrams in linear time!</em>\n</div>\n\n<p>Two strings are anagrams if and only if their character histograms are identical. Generating an immutable string signature like <code>#1#0#2...</code> allows constant-time hash lookups in a <code>HashMap</code>.</p>\n"
      },
      {
        "title": "Search in Rotated Sorted Array & Pivot Deduction",
        "language": "java",
        "starterCode": "public class RotatedBinarySearch {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n\n            // Determine which half is strictly sorted\n            if (nums[left] <= nums[mid]) { // Left half is sorted\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } else { // Right half is sorted\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        return -1;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Search in Rotated Sorted Arrays (O(log N))</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>An array sorted in ascending order has been rotated at an unknown pivot. Can you still locate any value in logarithmic O(log N) time without scanning linearly?</em>\n</div>\n\n<p>The rotational invariant states that at least one half of the array (either <code>[left, mid]</code> or <code>[mid, right]</code>) is always strictly ordered. By checking if the target resides inside the ordered half, we discard half the search space on every iteration!</p>\n"
      },
      {
        "title": "Binary Search on Answer Range: The Allocation Problem",
        "language": "java",
        "starterCode": "public class KokoBananas {\n    public static int minEatingSpeed(int[] piles, int h) {\n        int left = 1, right = 0;\n        for (int p : piles) right = Math.max(right, p);\n\n        int ans = right;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (canFinish(piles, mid, h)) {\n                ans = mid;         // Feasible; try smaller speed\n                right = mid - 1;\n            } else {\n                left = mid + 1;    // Infeasible; increase speed\n            }\n        }\n        return ans;\n    }\n\n    private static boolean canFinish(int[] piles, int speed, int h) {\n        int hours = 0;\n        for (int p : piles) {\n            hours += (p + speed - 1) / speed; // Ceiling division\n        }\n        return hours <= h;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Binary Search on the Answer Space (Feasibility Invariant)</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ARENA TRIAL:</strong> <em>When the problem asks for the \"minimum possible maximum\" or \"optimal allocation threshold\", do not search the input array. Binary search over the range of potential answers!</em>\n</div>\n\n<p>If a condition <code>f(x)</code> is monotonic (e.g., if speed <code>x</code> can finish in <code>H</code> hours, any speed <code>y &gt; x</code> can also finish), then the answer space forms a monotonic Boolean function: <code>[False, False, ..., True, True]</code>. Binary search finds the exact transition boundary in <code>O(N log(Max - Min))</code> time.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "LeetCode #49: Group Anagrams",
        "language": "java",
        "starterCode": "import java.util.*;\n\npublic class GroupAnagrams {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n\n    public static void main(String[] args) {\n        String[] words = {\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"};\n        List<List<String>> groups = groupAnagrams(words);\n        System.out.println(\"Number of groups: \" + groups.size());\n    }\n}",
        "expectedOutput": "Number of groups: 3",
        "description": "\n<h2>LeetCode #49: Group Anagrams</h2>\n<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>\n<p>Two strings are anagrams if sorting their characters yields the exact same canonical string key.</p>\n",
        "hints": [
          "Sort the characters of each string to produce a canonical key. Group matching words under that key in a HashMap."
        ]
      },
      {
        "title": "LeetCode #33: Search in Rotated Sorted Array",
        "language": "java",
        "starterCode": "public class RotatedBinarySearch {\n    public static int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n\n            // Left half is normally sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n                else left = mid + 1;\n            } else { // Right half is normally sorted\n                if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n                else right = mid - 1;\n            }\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {4, 5, 6, 7, 0, 1, 2};\n        System.out.println(\"Index of 0: \" + search(nums, 0));\n    }\n}",
        "expectedOutput": "Index of 0: 4",
        "description": "\n<h2>LeetCode #33: Search in Rotated Sorted Array</h2>\n<p>Given an integer array <code>nums</code> sorted in ascending order (with distinct values) that was rotated at an unknown pivot index, find <code>target</code> in <strong>O(log N) time</strong>.</p>\n<p>In any rotated sorted array, dividing at <code>mid</code> always leaves at least one half perfectly sorted.</p>\n",
        "hints": [
          "Check if nums[left] <= nums[mid]. If so, the left half is sorted. Verify whether target lies within that sorted range."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What happens when a bucket in Java 8+ HashMap reaches 8 entries and map capacity >= 64?",
        "options": [
          "It throws a HashCollisionException",
          "It treeifies the bucket into a Red-Black tree to guarantee O(log N) lookup",
          "It doubles the bucket array size without moving nodes",
          "It drops the oldest entry like an LRU cache"
        ],
        "correctIndex": 1,
        "explanation": "To defend against hash collision attacks and performance degradation, Java 8 converts dense buckets into balanced Red-Black trees."
      },
      {
        "question": "Why is mid calculated as `left + (right - left) / 2` instead of `(left + right) / 2`?",
        "options": [
          "It executes faster on the CPU",
          "It avoids 32-bit signed integer overflow when left + right exceeds 2^31 - 1",
          "It automatically rounds up instead of down",
          "It supports floating point indices"
        ],
        "correctIndex": 1,
        "explanation": "If left + right exceeds Integer.MAX_VALUE (2,147,483,647), it rolls over to a negative number, causing ArrayIndexOutOfBoundsException."
      }
    ],
    "project": {
      "title": "LeetCode Midterm Arena: 3 Timed Algorithmic Challenges",
      "description": "\n<h2>Project: LeetCode Midterm Contest</h2>\n<p>Validate your Phase 2 algorithm mastery by building a benchmark runner that tests three core patterns: Two Pointers, Monotonic Stack, and Binary Search under strict memory and time bounds.</p>\n",
      "language": "java",
      "starterCode": "public class AlgorithmicArena {\n    public static void main(String[] args) {\n        System.out.println(\"⚔️ Phase 2 DSA Midterm Arena Verified!\");\n    }\n}",
      "requirements": [
        "Implement an O(N) Two Sum II solver",
        "Implement an O(N) Daily Temperatures monotonic stack solver",
        "Implement an O(log N) Rotated Sorted Array searcher",
        "Include unit test assertions verifying edge cases (empty inputs, single elements, negative values)"
      ]
    }
  }
};
