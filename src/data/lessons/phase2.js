// ─── Phase 2: Data Structures & Algorithms Part 1 — LeetCode Core (Weeks 5–8) ───────────

export const phase2Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 5: Complexity Analysis, Two Pointers & Sliding Window
  // ════════════════════════════════════════════════════════════════
  'week-5': {
    lessons: [
      {
        title: 'Asymptotic Analysis & Big-O Notation',
        language: 'java',
        starterCode: `public class BigO {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n\n        // O(1) - Constant time\n        System.out.println("First element: " + arr[0]);\n\n        // O(N) - Linear time\n        for (int x : arr) {\n            System.out.print(x + " ");\n        }\n        System.out.println();\n\n        // O(N^2) - Quadratic time\n        for (int i = 0; i < arr.length; i++) {\n            for (int j = 0; j < arr.length; j++) {\n                System.out.print("(" + arr[i] + "," + arr[j] + ") ");\n            }\n        }\n    }\n}`,
        content: `
<h2>Complexity Analysis & Big-O Notation</h2>
<p>Big-O notation describes the <strong>upper bound (worst-case scenario)</strong> of an algorithm's runtime and memory usage as the input size <code>N</code> scales towards infinity.</p>

<h3>Core Time Complexities (From Fastest to Slowest)</h3>
<ul>
  <li><strong>O(1) Constant Time:</strong> Direct hash lookups, array index access.</li>
  <li><strong>O(log N) Logarithmic Time:</strong> Halving search spaces (Binary Search, balanced tree lookups).</li>
  <li><strong>O(N) Linear Time:</strong> Iterating through a collection once (Two Pointers, Sliding Window).</li>
  <li><strong>O(N log N) Linearithmic Time:</strong> Optimal comparison sorts (Merge Sort, Quick Sort).</li>
  <li><strong>O(N^2) Quadratic Time:</strong> Nested loops over the input (Bubble Sort, brute force pair checks).</li>
  <li><strong>O(2^N) Exponential Time:</strong> Recursive branching without memoization (Generating all subsets).</li>
</ul>

<h3>Space Complexity & Amortized Time</h3>
<p>Space complexity measures extra memory allocated beyond input storage. For instance, resizing a Java <code>ArrayList</code> takes O(N) when copying to a larger array, but happens so infrequently that its <em>amortized</em> insertion time remains O(1).</p>
`,
      },
      {
        title: 'The Two-Pointer Technique',
        language: 'java',
        starterCode: `import java.util.Arrays;\n\npublic class TwoPointers {\n    public static boolean isPalindrome(String s) {\n        int left = 0;\n        int right = s.length() - 1;\n\n        while (left < right) {\n            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));\n        System.out.println(isPalindrome("race a car"));\n    }\n}`,
        content: `
<h2>The Two-Pointer Technique</h2>
<p>The Two-Pointer technique uses two references traversing a linear structure simultaneously. It eliminates nested O(N^2) loops by exploiting structural properties (such as sorting or symmetry).</p>

<h3>The Two Main Variants</h3>
<ol>
  <li><strong>Opposite Ends (Collision):</strong> One pointer starts at index 0, the other at <code>length - 1</code>. They step towards each other based on comparison conditions (e.g., Two Sum II in sorted arrays, Palindrome checks, Container With Most Water).</li>
  <li><strong>Fast & Slow (Floyd's Cycle):</strong> Pointers start together, but one advances at twice the speed of the other (e.g., Finding the middle node of a Linked List, Cycle detection).</li>
</ol>
`,
      },
      {
        title: 'The Sliding Window Pattern',
        language: 'java',
        starterCode: `public class SlidingWindow {\n    // Fixed-size window of size k\n    public static int maxSubarraySum(int[] arr, int k) {\n        int windowSum = 0;\n        for (int i = 0; i < k; i++) {\n            windowSum += arr[i];\n        }\n        int maxSum = windowSum;\n\n        for (int i = k; i < arr.length; i++) {\n            windowSum += arr[i] - arr[i - k]; // Slide: add right, drop left\n            maxSum = Math.max(maxSum, windowSum);\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 1, 5, 1, 3, 2};\n        System.out.println("Max sum window of size 3: " + maxSubarraySum(nums, 3));\n    }\n}`,
        content: `
<h2>The Sliding Window Pattern</h2>
<p>The Sliding Window pattern is used for finding optimal contiguous subarrays or substrings without redundant recalculations.</p>

<h3>Types of Sliding Windows</h3>
<ul>
  <li><strong>Fixed Size:</strong> The window length <code>k</code> remains constant. Slide by adding the new incoming element and subtracting the outgoing left element in O(1) time.</li>
  <li><strong>Dynamic / Variable Size:</strong> Expand the right pointer <code>R</code> to satisfy a condition, then shrink the left pointer <code>L</code> to find the minimal valid window (or maximize when invalid).</li>
</ul>
<div class="callout callout--tip">
  <strong>LeetCode Rule of Thumb:</strong> When a question asks for "longest contiguous substring with constraint X" or "minimum subarray sum ≥ target", think <strong>Sliding Window</strong> immediately.
</div>
`,
      },
      {
        title: 'Prefix Sums & Difference Arrays',
        language: 'java',
        starterCode: `import java.util.Arrays;\n\npublic class PrefixSumDemo {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 4, 1, 5, 9};\n        int[] prefix = new int[nums.length + 1];\n\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n\n        System.out.println("Prefix Array: " + Arrays.toString(prefix));\n        // Range sum [2, 4] -> prefix[5] - prefix[2]\n        int sum = prefix[5] - prefix[2];\n        System.out.println("Sum of range [2, 4]: " + sum);\n    }\n}`,
        content: `
<h2>Prefix Sum Technique</h2>
<p>A prefix sum precomputes cumulative totals in O(N) time so that any range sum query <code>sum(L...R)</code> can be computed in <strong>O(1) constant time</strong> using:</p>
<pre><code>sum(L, R) = prefix[R + 1] - prefix[L]</code></pre>
<p>Combined with a <code>HashMap</code>, Prefix Sum solves problems like LeetCode #560: <em>Subarray Sum Equals K</em> in O(N) linear time!</p>
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
  // WEEK 6: Singly/Doubly Linked Lists & Fast-Slow Pointers
  // ════════════════════════════════════════════════════════════════
  'week-6': {
    lessons: [
      {
        title: 'Linked List Architecture & Pointer Manipulation',
        language: 'java',
        starterCode: `class ListNode {\n    int val;\n    ListNode next;\n    ListNode(int val) { this.val = val; }\n}\n\npublic class LinkedListBasics {\n    public static void main(String[] args) {\n        ListNode head = new ListNode(10);\n        head.next = new ListNode(20);\n        head.next.next = new ListNode(30);\n\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + (curr.next != null ? " -> " : "\\n"));\n            curr = curr.next;\n        }\n    }\n}`,
        content: `
<h2>Linked Lists: Non-Contiguous Memory</h2>
<p>Unlike arrays, linked lists store elements as independent heap objects called <strong>Nodes</strong>. Each node holds data and a reference to the next node.</p>

<h3>Key Tradeoffs: Array vs Linked List</h3>
<table style="width:100%; font-size:13px; border-collapse:collapse; margin-top:12px;">
  <tr style="border-bottom:1px solid var(--border);">
    <th style="text-align:left; padding:6px;">Operation</th>
    <th style="text-align:left; padding:6px;">Array</th>
    <th style="text-align:left; padding:6px;">Singly Linked List</th>
  </tr>
  <tr><td style="padding:6px;">Index Access (k-th)</td><td style="padding:6px;">O(1)</td><td style="padding:6px;">O(N)</td></tr>
  <tr><td style="padding:6px;">Prepend (Head Insert)</td><td style="padding:6px;">O(N)</td><td style="padding:6px;">O(1)</td></tr>
  <tr><td style="padding:6px;">Append (Tail with pointer)</td><td style="padding:6px;">O(1) amortized</td><td style="padding:6px;">O(1)</td></tr>
  <tr><td style="padding:6px;">Mid-List Insertion (given node)</td><td style="padding:6px;">O(N) (shifting)</td><td style="padding:6px;">O(1)</td></tr>
</table>
`,
      },
      {
        title: 'Floyd\'s Cycle Detection (Tortoise & Hare)',
        language: 'java',
        starterCode: `public class CycleDetection {\n    static class ListNode {\n        int val;\n        ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head;\n        ListNode fast = head;\n\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true; // Cycle detected!\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        ListNode n1 = new ListNode(1);\n        ListNode n2 = new ListNode(2);\n        ListNode n3 = new ListNode(3);\n        n1.next = n2;\n        n2.next = n3;\n        n3.next = n2; // Loop\n\n        System.out.println("Has cycle: " + hasCycle(n1));\n    }\n}`,
        content: `
<h2>Floyd's Cycle-Finding Algorithm</h2>
<p>To detect a loop in a linked list without allocating O(N) memory in a <code>HashSet</code>, use two pointers moving at different speeds:</p>
<ul>
  <li><code>slow</code> moves 1 step per iteration.</li>
  <li><code>fast</code> moves 2 steps per iteration.</li>
</ul>
<p>If there is a cycle, <code>fast</code> is guaranteed to lap and collide with <code>slow</code> inside the loop in O(N) time with <strong>O(1) auxiliary space</strong>.</p>
`,
      },
      {
        title: 'The Sentinel (Dummy Node) Technique',
        language: 'java',
        starterCode: `public class DummyNodeDemo {\n    static class ListNode {\n        int val; ListNode next;\n        ListNode(int val) { this.val = val; }\n    }\n\n    public static ListNode removeElements(ListNode head, int val) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode curr = dummy;\n\n        while (curr.next != null) {\n            if (curr.next.val == val) {\n                curr.next = curr.next.next; // Bypass node\n            } else {\n                curr = curr.next;\n            }\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) {\n        ListNode h = new ListNode(1);\n        h.next = new ListNode(2);\n        h.next.next = new ListNode(1);\n        ListNode res = removeElements(h, 1);\n        System.out.println("Filtered head: " + res.val);\n    }\n}`,
        content: `
<h2>Why Dummy (Sentinel) Nodes?</h2>
<p>When deleting or inserting nodes, the <strong>head node</strong> is often a troublesome special case because it has no predecessor. Creating a temporary <code>dummy</code> node where <code>dummy.next = head</code> unifies your pointer logic so every real node is treated identically.</p>
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
  // WEEK 7: Stacks, Queues & The Monotonic Stack Pattern
  // ════════════════════════════════════════════════════════════════
  'week-7': {
    lessons: [
      {
        title: 'Stack & Queue Principles (LIFO vs FIFO)',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Deque;\n\npublic class StackQueueDemo {\n    public static void main(String[] args) {\n        // Preferred Stack implementation in modern Java\n        Deque<Integer> stack = new ArrayDeque<>();\n        stack.push(10);\n        stack.push(20);\n        System.out.println("Stack Pop: " + stack.pop()); // 20 (LIFO)\n\n        // Queue\n        Deque<Integer> queue = new ArrayDeque<>();\n        queue.offer(10);\n        queue.offer(20);\n        System.out.println("Queue Poll: " + queue.poll()); // 10 (FIFO)\n    }\n}`,
        content: `
<h2>Stacks and Queues</h2>
<p><strong>Stack (LIFO - Last-In, First-Out):</strong> Like a stack of plates. <code>push()</code> and <code>pop()</code> execute at the top in O(1) time. In modern Java, always use <code>ArrayDeque</code> rather than legacy <code>java.util.Stack</code>.</p>
<p><strong>Queue (FIFO - First-In, First-Out):</strong> Like a supermarket line. Elements are added at the rear (<code>offer()</code>) and removed from the front (<code>poll()</code>) in O(1) time.</p>
`,
      },
      {
        title: 'The Monotonic Stack Pattern',
        language: 'java',
        starterCode: `import java.util.ArrayDeque;\nimport java.util.Arrays;\nimport java.util.Deque;\n\npublic class MonotonicStack {\n    public static int[] nextGreaterElements(int[] nums) {\n        int[] result = new int[nums.length];\n        Arrays.fill(result, -1);\n        Deque<Integer> stack = new ArrayDeque<>(); // stores indices\n\n        for (int i = 0; i < nums.length; i++) {\n            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {\n                int prevIndex = stack.pop();\n                result[prevIndex] = nums[i];\n            }\n            stack.push(i);\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {2, 1, 2, 4, 3};\n        System.out.println(Arrays.toString(nextGreaterElements(arr)));\n    }\n}`,
        content: `
<h2>The Monotonic Stack Pattern</h2>
<p>A <strong>Monotonic Stack</strong> maintains elements in strictly increasing or decreasing order. Whenever a new element violates the monotonicity, elements are popped until the invariant holds.</p>
<p><strong>Key Use Case:</strong> Finding the <em>Next Greater Element</em> or <em>Next Smaller Element</em> for every position in an array in <strong>O(N) linear time</strong> instead of O(N^2).</p>
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
  // WEEK 8: Hash Tables, String Hashing & Binary Search Mastery
  // ════════════════════════════════════════════════════════════════
  'week-8': {
    lessons: [
      {
        title: 'Hash Tables Internals: Collisions & Buckets',
        language: 'java',
        starterCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class HashMapInternals {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        map.put("Hero", 100);\n        map.put("Mage", 80);\n        System.out.println("Hero HP: " + map.get("Hero"));\n    }\n}`,
        content: `
<h2>How Java HashMap Works Under the Hood</h2>
<p>A Java <code>HashMap</code> maintains an array of Node buckets:</p>
<ol>
  <li><strong>Hash Calculation:</strong> Computes <code>key.hashCode()</code> and runs a bit-shift mixer to distribute hashes across bucket indices.</li>
  <li><strong>Collision Resolution:</strong> When two keys hash to the same bucket index, Java initially stores them as a <strong>LinkedList</strong>.</li>
  <li><strong>Treeification:</strong> If a bucket exceeds 8 entries (TREEIFY_THRESHOLD) and the map capacity is ≥ 64, Java converts that bucket into a <strong>Red-Black Balanced Tree</strong>, reducing collision lookup from O(N) down to O(log N).</li>
</ol>
`,
      },
      {
        title: 'Binary Search: Invariants & Boundary Precision',
        language: 'java',
        starterCode: `public class BinarySearchInvariants {\n    public static int binarySearch(int[] nums, int target) {\n        int left = 0;\n        int right = nums.length - 1;\n\n        while (left <= right) {\n            // Prevent integer overflow: left + (right - left) / 2\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {-1, 0, 3, 5, 9, 12};\n        System.out.println("Index of 9: " + binarySearch(sorted, 9));\n    }\n}`,
        content: `
<h2>Mastering Binary Search</h2>
<p>Binary Search eliminates 50% of the remaining search space at every step, delivering <strong>O(log N)</strong> time complexity.</p>

<h3>Critical Invariants</h3>
<ul>
  <li><strong>Midpoint Calculation:</strong> Never use <code>(left + right) / 2</code> in production because it can cause 32-bit signed integer overflow. Always write <code>left + (right - left) / 2</code>.</li>
  <li><strong>Loop Condition:</strong> <code>while (left <= right)</code> searches the closed range <code>[left, right]</code>.</li>
</ul>
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
