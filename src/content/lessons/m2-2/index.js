import b221 from './2.2.1.md?raw';
import b222 from './2.2.2.md?raw';
import b223 from './2.2.3.md?raw';
import b224 from './2.2.4.md?raw';
import b225 from './2.2.5.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '2.2.1': {
      body: b221,
      starter: {
        python: `class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def build(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def reverse(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev


print(to_list(reverse(build([1, 2, 3, 4, 5]))))
`,
        java: javaClass(`    static class Node {
        int val;
        Node next;
        Node(int val, Node next) { this.val = val; this.next = next; }
    }

    public static void main(String[] args) {
        Node head = new Node(1, new Node(2, new Node(3, null)));
        Node prev = null;
        while (head != null) {
            Node nxt = head.next;
            head.next = prev;
            prev = head;
            head = nxt;
        }
        for (Node n = prev; n != null; n = n.next) System.out.print(n.val + " ");
        System.out.println();
    }`),
      },
    },
    '2.2.2': {
      body: b222,
      starter: {
        python: `class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def build(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val


print(middle(build([1, 2, 3, 4, 5])))
print(middle(build([1, 2, 3, 4, 5, 6])))
`,
        java: javaClass(`    public static void main(String[] args) {
        // Two runners: the fast one moves twice as far.
        int slow = 0, fast = 0, length = 9;
        while (fast + 1 < length) {
            slow += 1;
            fast += 2;
        }
        System.out.println("middle index: " + slow);
    }`),
      },
    },
    '2.2.3': {
      body: b223,
      starter: {
        python: `def balanced(text):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack


for s in ["([]{})", "([)]", "((", "", "}"]:
    print(repr(s), balanced(s))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.Deque<Character> stack = new java.util.ArrayDeque<>();
        String text = "([]{})";
        boolean ok = true;
        for (char ch : text.toCharArray()) {
            if ("([{".indexOf(ch) >= 0) stack.push(ch);
            else {
                if (stack.isEmpty()) { ok = false; break; }
                char open = stack.pop();
                if ("([{".indexOf(open) != ")]}".indexOf(ch)) { ok = false; break; }
            }
        }
        System.out.println(ok && stack.isEmpty());
    }`),
      },
    },
    '2.2.4': {
      body: b224,
      starter: {
        python: `from collections import deque


def round_robin(tasks, slice_len):
    queue = deque(tasks)
    order = []
    while queue:
        name, remaining = queue.popleft()
        run = min(slice_len, remaining)
        order.append((name, run))
        if remaining > run:
            queue.append((name, remaining - run))
    return order


print(round_robin([("A", 5), ("B", 2), ("C", 4)], 2))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.Deque<String> queue = new java.util.ArrayDeque<>();
        queue.addLast("Ada");
        queue.addLast("Linus");
        queue.addLast("Grace");
        System.out.println(queue.pollFirst());
        System.out.println(queue);
    }`),
      },
    },
    '2.2.5': {
      body: b225,
      starter: {
        python: `def next_greater(nums):
    result = [-1] * len(nums)
    waiting = []
    for i, value in enumerate(nums):
        while waiting and nums[waiting[-1]] < value:
            result[waiting.pop()] = value
        waiting.append(i)
    return result


print(next_greater([4, 5, 2, 25, 7, 8]))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] nums = {4, 5, 2, 25, 7, 8};
        int[] result = new int[nums.length];
        java.util.Arrays.fill(result, -1);
        java.util.Deque<Integer> waiting = new java.util.ArrayDeque<>();
        for (int i = 0; i < nums.length; i++) {
            while (!waiting.isEmpty() && nums[waiting.peek()] < nums[i]) {
                result[waiting.pop()] = nums[i];
            }
            waiting.push(i);
        }
        System.out.println(java.util.Arrays.toString(result));
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('What does `node.next` hold in a linked list?', ['The previous node', 'A reference to the next node, or None at the end', 'The length of the list', 'A copy of the value'], 1, 'Each node points at the next one. The last node\'s `next` is None.'),
      q('What is the cost of reaching the 500th item of a singly linked list?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 2, 'There is no indexing: you must follow 499 pointers from the head.'),
      q('Why use a dummy node before the head?', ['It makes the list faster', 'It removes the special case for changing or deleting the head', 'It stores the length', 'Python requires it'], 1, 'With a node before the head, every real node has a predecessor to rewire.'),
      q('In Floyd\'s algorithm, how do the pointers move?', ['Both move 1 step', 'slow moves 1 step and fast moves 2', 'slow moves 2 steps and fast moves 1', 'Both move randomly'], 1, 'If there is a cycle, the fast pointer gains one step per iteration and must meet the slow one.'),
      q('When `fast` reaches the end of a list, where is `slow`?', ['At the head', 'At the middle', 'At the end', 'One past the end'], 1, 'Slow has moved half as far as fast.'),
      q('Which end of a Python list should a stack use for push and pop?', ['The front', 'The end', 'The middle', 'Either, it makes no difference'], 1, '`append` and `pop()` at the end are O(1). The front is O(n).'),
      q('What does this print?', ['True', 'False'], 1, 'The brackets close in the wrong order, so the stack top does not match.', 'stack = []\nfor ch in "([)]":\n    if ch in "([":\n        stack.append(ch)\n    else:\n        top = stack.pop()\n        print(top + ch in ("()", "[]"))\n        break'),
      q('Why is `list.pop(0)` a poor queue?', ['It returns the wrong item', 'It shifts every remaining item, so it is O(n)', 'It is not allowed', 'It deletes the list'], 1, '`collections.deque.popleft()` does the same job in O(1).'),
      q('What does `deque(maxlen=3)` do when a fourth item is appended?', ['Raises an error', 'Grows to 4', 'Drops the oldest item', 'Ignores the new item'], 2, 'It is a ring buffer: the oldest item is pushed out the other end.'),
      q('Why is the monotonic stack `next_greater` O(n) despite its nested `while`?', ['Python optimizes it', 'Each index is pushed once and popped at most once', 'The inner loop never runs', 'The list is sorted'], 1, 'The total number of pops can never exceed the total number of pushes.'),
    ],
  },

  project: {
    title: 'Pointer Toolkit',
    body: projectBody,
    starter: {
      python: `from collections import deque


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


def build(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def reverse_list(head):
    pass


def has_cycle(head):
    pass


def middle_value(head):
    pass


def remove_nth_from_end(head, n):
    pass


def balanced(text):
    pass


def eval_rpn(tokens):
    pass


def next_greater(nums):
    pass


def sliding_max(nums, k):
    pass


def round_robin(tasks, slice_len):
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

B = ns.get("build")
T = ns.get("to_list")
ok_helpers = callable(B) and callable(T) and callable(ns.get("ListNode"))
check("ListNode, build and to_list are still defined", ok_helpers, "keep the starter helpers")

if ok_helpers:
    check("reverse_list", T(call("reverse_list", B([1, 2, 3, 4, 5]))) == [5, 4, 3, 2, 1] and T(call("reverse_list", B([1]))) == [1] and call("reverse_list", None) is None, "flip each pointer: save next, point back, step forward")
    h = B([1, 2, 3, 4, 5])
    t = h
    while t.next:
        t = t.next
    t.next = h.next.next
    check("has_cycle sees a cycle", call("has_cycle", h) is True, "slow moves 1, fast moves 2, compare with 'is'")
    check("has_cycle without a cycle", call("has_cycle", B([1, 2, 3, 4])) is False and call("has_cycle", None) is False and call("has_cycle", B([1])) is False, "loop while fast and fast.next")
    check("middle_value", [call("middle_value", B(v)) for v in ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6], [9], [1, 2])] == [3, 4, 9, 2], "when fast reaches the end, slow is in the middle")
    check("remove_nth_from_end", [T(call("remove_nth_from_end", B(v), n)) for v, n in (([1, 2, 3, 4, 5], 2), ([1, 2, 3], 3), ([1, 2], 1), ([1], 1))] == [[1, 2, 3, 5], [2, 3], [1], []], "a dummy node, and a lead pointer n + 1 steps ahead")
    big_list = B(list(range(100000)))
    r, ok = timed("reverse_list", big_list)
    check("reverse_list handles 100,000 nodes", ok and r is not None and r.val == 99999, "use a loop, not recursion")
    long_cycle = B(list(range(100000)))
    tail = long_cycle
    while tail.next:
        tail = tail.next
    tail.next = long_cycle
    r, ok = timed("has_cycle", long_cycle)
    check("has_cycle on a 100,000-node cycle", ok and r is True, "O(1) memory: two pointers")

check("balanced", [call("balanced", s) for s in ("([]{})", "([)]", "((", "", "}", "f(a[0]) + {b}")] == [True, False, False, True, False, True], "push openers, pop on closers and compare, and the stack must be empty at the end")
check("eval_rpn", [call("eval_rpn", t) for t in (["3", "4", "+"], ["2", "1", "+", "3", "*"], ["10", "2", "8", "*", "+", "3", "-"], ["8", "2", "/"], ["5", "1", "-"])] == [7, 9, 23, 4, 4], "pop the second operand first")
check("next_greater", [call("next_greater", v) for v in ([4, 5, 2, 25, 7, 8], [], [3, 2, 1], [2, 1, 2, 4, 3])] == [[5, 25, 25, -1, 8, -1], [], [-1, -1, -1], [4, 2, 4, -1, -1]], "a stack of indexes still waiting for a bigger value")
check("sliding_max", [call("sliding_max", v, k) for v, k in (([1, 3, -1, -3, 5, 3, 6, 7], 3), ([4, 2], 1), ([9, 8, 7], 3))] == [[3, 3, 5, 5, 6, 7], [4, 2], [9]], "a deque of indexes with decreasing values")
check("round_robin", call("round_robin", [("A", 5), ("B", 2), ("C", 4)], 2) == [("A", 2), ("B", 2), ("C", 2), ("A", 2), ("C", 2), ("A", 1)], "popleft, run, then append the leftover to the back")

rnd = random.Random(3)
nums = [rnd.randint(0, 10**6) for _ in range(200000)]
r, ok = timed("next_greater", nums)
exp = [-1] * len(nums)
st = []
for i, v in enumerate(nums):
    while st and nums[st[-1]] < v:
        exp[st.pop()] = v
    st.append(i)
check("next_greater on 200,000 items", ok and r == exp, "one pass with a stack, not a nested loop")
r, ok = timed("sliding_max", nums, 50000)
check("sliding_max on 200,000 items with k = 50,000", ok and isinstance(r, list) and len(r) == 150001 and r[0] == max(nums[:50000]) and r[-1] == max(nums[-50000:]), "a monotonic deque: O(n), not O(n * k)")
r, ok = timed("balanced", "(" * 100000 + ")" * 100000)
check("balanced on 200,000 characters", ok and r is True, "a plain loop with a list as the stack")`,
  },
};
