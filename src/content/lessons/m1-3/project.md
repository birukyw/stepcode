# Project: Loop Lab

Five small experiments, each of which needs a different kind of loop. Together they exercise everything in this module: `while` loops with a changing state, `for` with `range`, accumulators, `break` and loop `else`, and nested loops.

The starter code names the variables the checks look for. Fill each one in with a loop. You may not hard-code the answers. Change the inputs and the results should follow.

## The five experiments

**1. Multiples.** Set `multiples_total` to the sum of every number **below 1000** that is divisible by 3 or by 5.

**2. Collatz.** Starting from `n = 27`, apply the Collatz rule until the value reaches 1: if the number is even, halve it with `//`, otherwise triple it and add 1. Record how many steps it takes in `collatz_steps`, and the largest value reached along the way in `collatz_peak`. Include the starting number when looking for the peak.

**3. Digit sum.** Set `digit_sum` to the sum of the digits of `2 ** 100`. Convert the number to a string and loop over its characters.

**4. Next prime.** Set `next_prime` to the smallest prime number greater than 1000. Use a `while` loop to try candidates and a `for`/`else` (or `break`) to test each one. Only test divisors up to the square root.

**5. Triangle.** Print a right triangle of stars with 5 rows, using nested loops, so the output is:

```text
*
**
***
****
*****
```

> **Tip:** Make the first experiment correct and run the checks before you move on. The checks tell you which experiments pass.

> **Watch out:** in experiment 2, the peak must account for the whole journey, including the starting value, and `collatz_steps` counts how many times you applied the rule, not how many numbers you visited.

## Stretch goals

- Print the Collatz path for `n = 6` as `6 3 10 5 16 8 4 2 1`.
- Find the number below 10,000 with the longest Collatz journey.
- Draw an upside-down pyramid with 4 rows.

## Hints

+++ Collatz hint
Keep three variables: the current value `n`, a step counter, and `collatz_peak`. After each update to `n`, compare it against the peak. Remember that `n` starts as 27, so the peak starts at 27 too.
+++

+++ Prime hint
A number `k` is prime when no `d` in `range(2, int(k ** 0.5) + 1)` divides it. Put that test in a `for` loop with a `break` when a divisor is found, and use the loop's `else` to mean "it is prime". Wrap the whole thing in a `while` that moves to the next candidate until one passes.
+++

+++ Full solution
```python
# 1. Multiples
multiples_total = 0
for n in range(1000):
    if n % 3 == 0 or n % 5 == 0:
        multiples_total += n

# 2. Collatz
n = 27
collatz_steps = 0
collatz_peak = n
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    collatz_steps += 1
    if n > collatz_peak:
        collatz_peak = n

# 3. Digit sum
digit_sum = 0
for ch in str(2 ** 100):
    digit_sum += int(ch)

# 4. Next prime
next_prime = 1001
while True:
    for d in range(2, int(next_prime ** 0.5) + 1):
        if next_prime % d == 0:
            break
    else:
        break
    next_prime += 1

# 5. Triangle
for row in range(1, 6):
    for col in range(row):
        print("*", end="")
    print()
```
+++
