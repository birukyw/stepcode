# Project: Class Workshop

Nine classes that put the module to work: the data model, properties, abstract base classes, dataclasses, patterns and structural matching. Each one has a small contract, and the checks are strict about the details that make classes pleasant to use: sensible `repr`s, working comparisons, error types, and objects that do **not** share state by accident.

Write them from scratch in the editor. The starter has empty stubs.

## The classes

**1. `Vector2D(x, y)`** behaves like a number-like value:
- `repr` is `Vector2D(1, 2)`.
- `+`, `-`, unary `-`, and multiplication by a number on **either side** (`v * 3` and `3 * v`) return new vectors.
- `abs(v)` is its length, `==` compares by value, and equal vectors have equal hashes (they work in sets).
- Iterating gives `x` then `y` (so `x, y = v` works), and `bool(v)` is `False` only for the zero vector.

**2. `Temperature(celsius)`** protects its invariant:
- `celsius` is a property. Setting a value below `-273.15` raises `ValueError`, **including in the constructor**.
- `fahrenheit` is a **read-only** computed property (assigning to it raises `AttributeError`).
- `Temperature.from_fahrenheit(f)` is an alternative constructor.

**3. `Inventory`** is a container of item names and quantities:
- `add(item, qty=1)` and `remove(item, qty=1)`. Removing more than is held raises `ValueError`, and removing everything of an item removes the item.
- `len(inv)` is the number of **distinct** items, `inv[item]` is the quantity (`0` if absent), and `item in inv` works.
- Iterating gives the item names **sorted**, and it can be iterated more than once.
- `total()` is the sum of all quantities.

**4. `Shape`, `Circle`, `Rectangle`, `Square`.** `Shape` is an **abstract base class** with abstract `area()` and `perimeter()`, and it cannot be instantiated. `Circle(r)` uses `math.pi`, `Rectangle(w, h)`, and `Square(side)` **inherits from `Rectangle`**. Shapes compare with `<` by area, so `sorted(shapes)` works, and each has a readable `repr` such as `Circle(1)`. Also write the function `total_area(shapes)`.

**5. `Product`** is a **frozen, ordered dataclass** with fields `name: str`, `price: float`, `quantity: int = 1`. Negative `price` or `quantity` raises `ValueError`. A read-only property `total` is `price * quantity`. Instances must be hashable, and trying to change one must fail.

**6. `EventBus`** is the observer pattern: `subscribe(event, handler)`, `unsubscribe(event, handler)` (quietly does nothing if the handler is not subscribed) and `publish(event, *args)`, which calls the handlers in the order they subscribed and **returns how many handlers ran**. Unsubscribing from inside a handler during a publish must be safe.

**7. `register(name)` and `create(name, *args)`** is the factory with a registry. `@register("circle")` stores a class under that name, and `create("circle", 2)` builds `Circle(2)`. An unknown name raises `ValueError`.

**8. `describe_command(command)`** uses `match`. Lists: `[]` gives `"nothing"`, `["quit"]` gives `"bye"`, `["go", d]` gives `"going d"`, `["take", item]` gives `"taking item"`, and `["say", *words]` gives `"saying "` followed by the words joined by spaces. A dictionary `{"type": "click", "x": x, "y": y}` gives `"click at x,y"`. Anything else gives `"unknown"`.

**9. `JsonMixin`** adds `to_json()` (JSON text of the instance's attributes with **sorted keys**) and the class method `from_json(text)` that builds a new instance with `cls(**data)`. Check it on a class that mixes it in.

> **Tip:** Think about which dunder or decorator each requirement needs before you type. For example, "works in sets" means `__hash__`, "`3 * v`" means `__rmul__`, and "read-only property" means a property without a setter.

> **Watch out:** Two `Inventory` objects, or two `EventBus` objects, must never share data. Keep their dictionaries on `self`, not on the class.

## Stretch goals

- Give `Vector2D` a `dot(other)` method and `__matmul__` using the `@` operator.
- Make `Inventory` support `inv[item] = qty` and `del inv[item]`.
- Add `Triangle(a, b, c)` (Heron's formula) and register it, without changing any existing class.

## Hints

+++ Data model hints
`Vector2D`: write `__eq__` and `__hash__` using `(self.x, self.y)`, set `__rmul__ = __mul__`, and make `__iter__` a generator that yields `self.x` then `self.y`. `Inventory`: keep a dictionary of quantities, and `__iter__` can be `iter(sorted(self._items))`. A fresh iterator each time is what makes it reusable.
+++

+++ Properties, ABCs and dataclasses hints
`Temperature`: the setter validates, and the constructor assigns `self.celsius = celsius` (not `self._celsius`) so it validates too. `Shape(ABC)` with `@abstractmethod`. `Square.__init__` can call `super().__init__(side, side)`. For `Product`, use `@dataclass(frozen=True, order=True)` and `__post_init__`.
+++

+++ Patterns and matching hints
`EventBus.publish`: loop over `list(self._handlers.get(event, []))` (a copy), so handlers can unsubscribe while it runs. `register` is a decorator factory that returns the class unchanged. For `describe_command`, put the dictionary pattern in its own `case {...}` and finish with `case _:`.
+++

+++ Full solution
```python
import json
import math
from abc import ABC, abstractmethod
from dataclasses import dataclass


class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector2D({self.x}, {self.y})"

    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector2D(self.x - other.x, self.y - other.y)

    def __neg__(self):
        return Vector2D(-self.x, -self.y)

    def __mul__(self, scalar):
        return Vector2D(self.x * scalar, self.y * scalar)

    __rmul__ = __mul__

    def __abs__(self):
        return math.hypot(self.x, self.y)

    def __eq__(self, other):
        if not isinstance(other, Vector2D):
            return NotImplemented
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

    def __iter__(self):
        yield self.x
        yield self.y

    def __bool__(self):
        return bool(self.x or self.y)


class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

    @classmethod
    def from_fahrenheit(cls, f):
        return cls((f - 32) * 5 / 9)


class Inventory:
    def __init__(self):
        self._items = {}

    def add(self, item, qty=1):
        self._items[item] = self._items.get(item, 0) + qty

    def remove(self, item, qty=1):
        have = self._items.get(item, 0)
        if qty > have:
            raise ValueError("not enough " + str(item))
        if qty == have:
            del self._items[item]
        else:
            self._items[item] = have - qty

    def __len__(self):
        return len(self._items)

    def __getitem__(self, item):
        return self._items.get(item, 0)

    def __contains__(self, item):
        return item in self._items

    def __iter__(self):
        return iter(sorted(self._items))

    def total(self):
        return sum(self._items.values())


class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    @abstractmethod
    def perimeter(self):
        ...

    def __lt__(self, other):
        return self.area() < other.area()


class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2

    def perimeter(self):
        return 2 * math.pi * self.r

    def __repr__(self):
        return f"Circle({self.r})"


class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

    def perimeter(self):
        return 2 * (self.w + self.h)

    def __repr__(self):
        return f"Rectangle({self.w}, {self.h})"


class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)

    def __repr__(self):
        return f"Square({self.w})"


def total_area(shapes):
    return sum(s.area() for s in shapes)


@dataclass(frozen=True, order=True)
class Product:
    name: str
    price: float
    quantity: int = 1

    def __post_init__(self):
        if self.price < 0 or self.quantity < 0:
            raise ValueError("price and quantity must not be negative")

    @property
    def total(self):
        return self.price * self.quantity


class EventBus:
    def __init__(self):
        self._handlers = {}

    def subscribe(self, event, handler):
        self._handlers.setdefault(event, []).append(handler)

    def unsubscribe(self, event, handler):
        handlers = self._handlers.get(event, [])
        if handler in handlers:
            handlers.remove(handler)

    def publish(self, event, *args):
        count = 0
        for handler in list(self._handlers.get(event, [])):
            handler(*args)
            count += 1
        return count


_REGISTRY = {}


def register(name):
    def decorator(cls):
        _REGISTRY[name] = cls
        return cls
    return decorator


def create(name, *args):
    try:
        cls = _REGISTRY[name]
    except KeyError:
        raise ValueError("unknown plugin: " + str(name)) from None
    return cls(*args)


def describe_command(command):
    match command:
        case []:
            return "nothing"
        case ["quit"]:
            return "bye"
        case ["go", direction]:
            return f"going {direction}"
        case ["take", item]:
            return f"taking {item}"
        case ["say", *words]:
            return "saying " + " ".join(words)
        case {"type": "click", "x": x, "y": y}:
            return f"click at {x},{y}"
        case _:
            return "unknown"


class JsonMixin:
    def to_json(self):
        return json.dumps(self.__dict__, sort_keys=True)

    @classmethod
    def from_json(cls, text):
        return cls(**json.loads(text))
```
+++
