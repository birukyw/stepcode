# Project: Trip Receipt

You are writing the receipt generator for a road-trip app. The trip data is already in the starter code. Your job is to turn those raw numbers into a clean, correct receipt, using only what you learned in this module: variables, arithmetic, `//` and `%`, rounding, strings and f-strings.

## The data

```python
trip_seconds = 98765      # time on the road
distance_km = 412.6
fuel_price = 1.84         # price per litre
consumption = 6.5         # litres used per 100 km
passengers = 3
```

## What to build

Work through these in order. Each step uses the results of the one before.

1. **Duration.** Split `trip_seconds` into whole `hours`, remaining `minutes` and remaining `seconds`.
2. **Duration text.** Build a string called `duration` formatted like `27h 26m 05s`. Seconds and minutes use two digits.
3. **Fuel.** Compute `fuel_litres` from the distance and the consumption.
4. **Cost.** Compute `fuel_cost`, which is `fuel_litres * fuel_price` rounded to 2 decimals, then `cost_each`, which is the cost divided across `passengers`, also rounded to 2 decimals.
5. **Receipt.** Print exactly this layout, using your variables:

```text
TRIP RECEIPT
============
Duration : 27h 26m 05s
Distance : 412.6 km
Fuel     : 26.82 L
Total    : $49.35
Each (3) : $16.45
```

> **Tip:** Build it in small steps and print as you go. Once step 1 works, move on. Press **Run checks** whenever you want feedback. It tells you which requirements pass and which do not.

> **Watch out:** the receipt must come from your variables. If you type `27h 26m 05s` directly, the checks may still pass, but you will have missed the point. Change `trip_seconds` yourself and make sure the receipt follows.

## Stretch goals

- Print a line `Per km   : $0.12` showing the fuel cost per kilometre.
- Change `passengers` to `4` and confirm the numbers still make sense.

## Hints

+++ Duration hint
There are 3600 seconds in an hour. After taking the hours with `//`, the remainder is `trip_seconds % 3600`. Divide that by 60 with `//` to get minutes. Seconds are `trip_seconds % 60`.
+++

+++ Formatting hint
Use `{minutes:02d}` inside an f-string to pad a number to two digits with a leading zero. Use `{fuel_litres:.2f}` for two decimals.
+++

+++ Full solution
```python
trip_seconds = 98765
distance_km = 412.6
fuel_price = 1.84
consumption = 6.5
passengers = 3

hours = trip_seconds // 3600
minutes = (trip_seconds % 3600) // 60
seconds = trip_seconds % 60
duration = f"{hours}h {minutes:02d}m {seconds:02d}s"

fuel_litres = distance_km * consumption / 100
fuel_cost = round(fuel_litres * fuel_price, 2)
cost_each = round(fuel_cost / passengers, 2)

print("TRIP RECEIPT")
print("=" * 12)
print(f"Duration : {duration}")
print(f"Distance : {distance_km} km")
print(f"Fuel     : {fuel_litres:.2f} L")
print(f"Total    : ${fuel_cost:.2f}")
print(f"Each ({passengers}) : ${cost_each:.2f}")
```
+++
