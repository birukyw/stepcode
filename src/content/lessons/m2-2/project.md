# Project: Pointer Toolkit

Nine functions that put the whole module to work: linked lists, fast and slow pointers, stacks, queues and monotonic structures. The linked list tools must handle **100,000-node lists**, so recursion is out (Python would hit its recursion limit) and so are solutions that copy everything into a Python list.

The starter already includes the `ListNode` class and two helpers, `build(values)` and `to_list(head)`.

## The functions

**1. `reverse_list(head)`** reverses a linked list in place and returns the new head. It must work for an empty list.

**2. `has_cycle(head)`** returns `True` if some node's `next` leads back to an earlier node, using only O(1) extra memory.

**3. `middle_value(head)`** returns the value of the middle node. For an even number of nodes, return the **second** of the two middle nodes.

**4. `remove_nth_from_end(head, n)`** removes the `n`-th node from the end (1 is the last node) in a **single pass** and returns the head. Use a dummy node so removing the first node works.

**5. `balanced(text)`** returns `True` if every `()`, `[]` and `{}` in `text` is correctly closed and nested. Ignore all other characters.

**6. `eval_rpn(tokens)`** evaluates a list of Reverse Polish tokens such as `["2", "1", "+", "3", "*"]` with `+`, `-`, `*` and `/`, and returns the result as a number. Division is ordinary `/`.

**7. `next_greater(nums)`** returns a list where each item is the first larger number to its right, or `-1`.

**8. `sliding_max(nums, k)`** returns the maximum of every window of `k` consecutive numbers.

**9. `round_robin(tasks, slice_len)`** takes a list of `(name, time_needed)` tasks and returns the order in which time slices run, as a list of `(name, time_run)` tuples. Each turn runs for at most `slice_len`, and an unfinished task goes to the back of the line.

> **Tip:** Name the data structure before you start each function: a dummy node, two pointers, a stack, a deque. Then the code nearly writes itself.

> **Watch out:** `next_greater` and `sliding_max` are tested on 200,000 items with a time limit of about a second and a half. A nested loop will not pass.

## Stretch goals

- Add `cycle_start(head)` returning the node where a cycle begins.
- Make `eval_rpn` raise a clear error for a malformed expression.
- Write `is_palindrome_list(head)` using the middle and a reverse.

## Hints

+++ Linked list hints
`reverse_list` needs `prev`, `curr` and a saved `nxt`. `has_cycle` and `middle_value` both use a slow and a fast pointer, and the loop condition is `while fast and fast.next`. For `remove_nth_from_end`, advance a lead pointer `n + 1` steps from the dummy, then move both until the lead falls off.
+++

+++ Stack and queue hints
`balanced` pushes openers and pops on closers, comparing with a dictionary of pairs. `eval_rpn` pops the **second** operand first. `next_greater` keeps a stack of indexes still waiting. `sliding_max` keeps a deque of indexes whose values decrease.
+++

+++ Full solution
```python
from collections import deque


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
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev


def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False


def middle_value(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val


def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    lead = follow = dummy
    for _ in range(n + 1):
        lead = lead.next
    while lead:
        lead = lead.next
        follow = follow.next
    follow.next = follow.next.next
    return dummy.next


def balanced(text):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in text:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack


def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(a / b)
        else:
            stack.append(float(t))
    return stack[0]


def next_greater(nums):
    result = [-1] * len(nums)
    waiting = []
    for i, value in enumerate(nums):
        while waiting and nums[waiting[-1]] < value:
            result[waiting.pop()] = value
        waiting.append(i)
    return result


def sliding_max(nums, k):
    dq = deque()
    out = []
    for i, value in enumerate(nums):
        while dq and nums[dq[-1]] <= value:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out


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
```
+++
