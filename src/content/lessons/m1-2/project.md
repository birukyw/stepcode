# Project: Ticket Pricing Engine

A theme park needs a pricing engine. Visitors tell the kiosk three things, and the kiosk prints their ticket category and price. The rules are fixed and a little fiddly, which makes this a good test of everything in this module: comparisons, `if` / `elif` / `else`, and combined conditions.

## Input

Your program reads three lines with `input()`:

1. The visitor's **age**, as a whole number.
2. Whether they are a **student**: `yes` or `no`.
3. The **day**: `weekday` or `weekend`.

## Pricing rules

Apply these in order.

**1. Category and base price** by age:

| Age | Category | Base price |
|---|---|---|
| under 5 | `infant` | 0 |
| 5 to 12 | `child` | 8 |
| 13 to 64 | `adult` | 15 |
| 65 or over | `senior` | 10 |

**2. Student discount.** Students get 20% off the base price. Free tickets stay free.

**3. Weekend surcharge.** On `weekend` add 3.00 to the price after the discount. Free tickets stay free, so an infant never pays a surcharge.

## Output

Print exactly two lines, with the price formatted to two decimals:

```text
Category: adult
Price: $12.00
```

## Examples

| Age | Student | Day | Category | Price |
|---|---|---|---|---|
| 3 | no | weekday | infant | 0.00 |
| 3 | yes | weekend | infant | 0.00 |
| 10 | yes | weekend | child | 9.40 |
| 30 | yes | weekday | adult | 12.00 |
| 30 | no | weekend | adult | 18.00 |
| 70 | yes | weekend | senior | 11.00 |

> **Tip:** Work out the category and base price first and make that part correct on its own. Then add the discount. Then add the surcharge. Run the checks after each step. They report which scenarios fail.

> **Watch out:** the boundaries are where bugs live. Make sure ages 4, 5, 12, 13, 64 and 65 land in the right category. The checks test them.

## Stretch goals

- Reject an age below 0 by printing `Invalid age` and nothing else.
- Accept `Yes`, `YES` and `yes` as the same answer.
- Allow only `weekday` and `weekend` for the day. Anything else prints `Invalid day`.

## Hints

+++ Structure hint
Start with an `if` / `elif` / `else` chain on `age` that sets both `category` and `price`. Write it as upper bounds: `age < 5`, then `age < 13`, then `age < 65`, then `else`.
+++

+++ Discount and surcharge hint
Use two separate `if` statements after the chain. The discount applies when `student == "yes" and price > 0`. The surcharge applies when `day == "weekend" and price > 0`. Do the discount first.
+++

+++ Full solution
```python
age = int(input("Age: "))
student = input("Student (yes/no): ")
day = input("Day (weekday/weekend): ")

if age < 5:
    category = "infant"
    price = 0
elif age < 13:
    category = "child"
    price = 8
elif age < 65:
    category = "adult"
    price = 15
else:
    category = "senior"
    price = 10

if student == "yes" and price > 0:
    price = price * 0.8

if day == "weekend" and price > 0:
    price = price + 3

print("Category:", category)
print(f"Price: ${price:.2f}")
```
+++
