import b321 from './3.2.1.md?raw';
import b322 from './3.2.2.md?raw';
import b323 from './3.2.3.md?raw';
import b324 from './3.2.4.md?raw';
import b325 from './3.2.5.md?raw';
import b326 from './3.2.6.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '3.2.1': {
      body: b321,
      starter: {
        python: `class Account:
    count = 0

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        Account.count += 1

    @classmethod
    def from_string(cls, text):
        owner, _, amount = text.partition(":")
        return cls(owner.strip(), int(amount))

    def deposit(self, amount):
        self.balance += amount
        return self.balance


a = Account("Ada", 100)
b = Account.from_string("Linus: 250")
a.deposit(50)
print(a.balance, b.owner, b.balance, Account.count)
print(vars(a))
`,
        java: javaClass(`    static class Account {
        static int count = 0;
        String owner;
        int balance;

        Account(String owner, int balance) {
            this.owner = owner;
            this.balance = balance;
            count++;
        }

        static Account fromString(String text) {
            String[] parts = text.split(":");
            return new Account(parts[0].trim(), Integer.parseInt(parts[1].trim()));
        }
    }

    public static void main(String[] args) {
        Account b = Account.fromString("Linus: 250");
        System.out.println(b.owner + " " + b.balance + " " + Account.count);
    }`),
      },
    },
    '3.2.2': {
      body: b322,
      starter: {
        python: `class Temperature:
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


t = Temperature(25)
print(t.celsius, t.fahrenheit)
try:
    t.celsius = -500
except ValueError as err:
    print("rejected:", err)
`,
        java: javaClass(`    static class Temperature {
        private double celsius;

        Temperature(double celsius) { setCelsius(celsius); }

        void setCelsius(double value) {
            if (value < -273.15) throw new IllegalArgumentException("below absolute zero");
            this.celsius = value;
        }

        double getFahrenheit() { return celsius * 9 / 5 + 32; }
    }

    public static void main(String[] args) {
        System.out.println(new Temperature(25).getFahrenheit());
    }`),
      },
    },
    '3.2.3': {
      body: b323,
      starter: {
        python: `class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    __rmul__ = __mul__

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __eq__(self, other):
        return isinstance(other, Vector) and (self.x, self.y) == (other.x, other.y)


a, b = Vector(1, 2), Vector(3, 4)
print(a + b, 3 * a, abs(b), a == Vector(1, 2))
`,
        java: javaClass(`    record Vector(int x, int y) {
        Vector plus(Vector o) { return new Vector(x + o.x, y + o.y); }
        Vector times(int k) { return new Vector(x * k, y * k); }
    }

    public static void main(String[] args) {
        Vector a = new Vector(1, 2), b = new Vector(3, 4);
        System.out.println(a.plus(b) + " " + a.times(3) + " " + a.equals(new Vector(1, 2)));
    }`),
      },
    },
    '3.2.4': {
      body: b324,
      starter: {
        python: `from abc import ABC, abstractmethod
import math


class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    def describe(self):
        return f"{type(self).__name__}: area {self.area():.1f}"


class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2


class Rect(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h

    def area(self):
        return self.w * self.h


for shape in [Circle(1), Rect(2, 3)]:
    print(shape.describe())
`,
        java: javaClass(`    static abstract class Shape {
        abstract double area();
        String describe() { return getClass().getSimpleName() + ": area " + String.format("%.1f", area()); }
    }

    static class Circle extends Shape {
        double r;
        Circle(double r) { this.r = r; }
        double area() { return Math.PI * r * r; }
    }

    public static void main(String[] args) {
        System.out.println(new Circle(1).describe());
    }`),
      },
    },
    '3.2.5': {
      body: b325,
      starter: {
        python: `from dataclasses import dataclass, field


@dataclass(frozen=True, order=True)
class Version:
    major: int
    minor: int = 0
    patch: int = 0


@dataclass
class Task:
    title: str
    priority: int = 3
    tags: list = field(default_factory=list)


def describe(command):
    match command:
        case ["go", direction]:
            return f"going {direction}"
        case ["say", *words]:
            return "saying " + " ".join(words)
        case _:
            return "unknown"


print(sorted([Version(1, 10), Version(1, 2, 3)]))
print(Task("write"))
print(describe(["go", "north"]), describe(["say", "hi", "there"]))
`,
        java: javaClass(`    record Version(int major, int minor, int patch) {}

    public static void main(String[] args) {
        Version v = new Version(1, 2, 3);
        System.out.println(v + " " + v.equals(new Version(1, 2, 3)));
        Object command = "go";
        String text = switch (command) {
            case String s when s.equals("go") -> "going";
            default -> "unknown";
        };
        System.out.println(text);
    }`),
      },
    },
    '3.2.6': {
      body: b326,
      starter: {
        python: `class EventBus:
    def __init__(self):
        self._handlers = {}

    def subscribe(self, event, handler):
        self._handlers.setdefault(event, []).append(handler)

    def publish(self, event, *args):
        for handler in list(self._handlers.get(event, [])):
            handler(*args)


log = []
bus = EventBus()
bus.subscribe("order", lambda order_id: log.append(f"email for {order_id}"))
bus.subscribe("order", lambda order_id: log.append(f"stock update for {order_id}"))
bus.publish("order", 42)
print(log)
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.List<java.util.function.Consumer<Integer>> handlers = new java.util.ArrayList<>();
        handlers.add(id -> System.out.println("email for " + id));
        handlers.add(id -> System.out.println("stock update for " + id));
        handlers.forEach(h -> h.accept(42));
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Where does an instance store its attributes?', ['In the class only', 'In its own __dict__', 'In global variables', 'In the module'], 1, '`self.x = 1` writes to the instance dictionary. The class holds shared data and the methods.'),
      q('Why is `items = []` in the class body a bug?', ['It is slow', 'One list is shared by every instance', 'Lists cannot be class attributes', 'It makes the class abstract'], 1, 'Create per-object mutable data in __init__ so each object gets its own list.'),
      q('What does a property with no setter give you?', ['A private attribute', 'A read-only attribute computed on access', 'A class attribute', 'A faster attribute'], 1, 'Assigning to it raises AttributeError, and it can never be out of sync with the data it is computed from.'),
      q('Which method makes `print(obj)` and f-strings show a friendly text?', ['__repr__ only', '__str__ (falling back to __repr__)', '__print__', '__text__'], 1, '__str__ is for users. __repr__ is for developers and is the fallback.'),
      q('If you define `__eq__`, what else should you define for set and dict use?', ['__len__', '__hash__ using the same fields', '__iter__', 'Nothing'], 1, 'Equal objects must have equal hashes, or sets and dictionaries break.'),
      q('What does `super()` mean in a method?', ['The root class', 'The next class in the method resolution order', 'The child class', 'The object itself'], 1, 'It follows the MRO, which is what makes cooperative multiple inheritance work.'),
      q('What does an abstract base class do when a subclass forgets an abstract method?', ['Nothing', 'Raises TypeError when you try to create an instance', 'Calls the parent version', 'Deletes the class'], 1, 'The contract is checked at creation time, not when the missing method is finally called.'),
      q('When is composition better than inheritance?', ['Never', 'When you only want to reuse behaviour and the relationship is "has a" not "is a"', 'When you need speed', 'When using dataclasses'], 1, 'Composition is more flexible and less coupled. Inherit only for a true specialised kind that honours the whole contract.'),
      q('What does `@dataclass(frozen=True)` give you?', ['Faster code', 'Immutable, hashable instances', 'Private fields', 'Abstract methods'], 1, 'Frozen instances cannot be changed after creation and can be used as dictionary keys.'),
      q('In `match`, what does the pattern `["go", direction]` do?', ['Compares to a literal list', 'Matches a two-item list starting with "go" and binds the second item to direction', 'Raises an error', 'Matches any list'], 1, 'Patterns match shapes and capture parts at the same time.'),
    ],
  },

  project: {
    title: 'Class Workshop',
    body: projectBody,
    starter: {
      python: `import json
import math
from abc import ABC, abstractmethod
from dataclasses import dataclass


class Vector2D:
    pass


class Temperature:
    pass


class Inventory:
    pass


class Shape(ABC):
    pass


class Circle:
    pass


class Rectangle:
    pass


class Square:
    pass


def total_area(shapes):
    pass


class Product:
    pass


class EventBus:
    pass


def register(name):
    pass


def create(name, *args):
    pass


def describe_command(command):
    pass


class JsonMixin:
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
    },
    checks: `import dataclasses, math, time

def attempt(fn, default="<error>"):
    try:
        return fn()
    except Exception as e:
        return default

def raises(fn):
    try:
        fn()
        return False
    except Exception:
        return True

V = ns.get("Vector2D")
if isinstance(V, type):
    a = attempt(lambda: V(1, 2)); b = attempt(lambda: V(3, 4))
    check("Vector2D repr", attempt(lambda: repr(a)) == "Vector2D(1, 2)", "return f'Vector2D({self.x}, {self.y})' from __repr__")
    check("Vector2D arithmetic", attempt(lambda: (a + b, a - b, -a, a * 3, 3 * a) == (V(4, 6), V(-2, -2), V(-1, -2), V(3, 6), V(3, 6))), "each operator returns a NEW vector. 3 * v needs __rmul__")
    check("Vector2D length, equality and hashing", attempt(lambda: abs(V(3, 4)) == 5 and V(1, 2) == V(1, 2) and V(1, 2) != V(2, 1) and len({V(1, 2), V(1, 2), V(0, 0)}) == 2), "__abs__, __eq__ and a __hash__ built from the same fields")
    check("Vector2D iteration and truthiness", attempt(lambda: (lambda x, y: (x, y))(*V(5, 6)) == (5, 6) and not V(0, 0) and bool(V(0, 1))), "__iter__ yields x then y. __bool__ is false only for (0, 0)")
    check("Vector2D equality with other types", attempt(lambda: V(1, 2) != "text" and not (V(1, 2) == 5)), "return NotImplemented for unrelated types, not an error")
else:
    check("Vector2D", False, "define class Vector2D")

T = ns.get("Temperature")
if isinstance(T, type):
    t = attempt(lambda: T(25))
    check("Temperature values", attempt(lambda: t.celsius == 25 and abs(t.fahrenheit - 77) < 1e-9), "fahrenheit is computed from celsius")
    def set_low():
        t.celsius = -300
    check("Temperature rejects values below absolute zero", raises(set_low) and attempt(lambda: T(-500)) == "<error>" and attempt(lambda: t.celsius) == 25, "validate in the setter, and assign self.celsius (not self._celsius) in __init__ so it validates too")
    def set_f():
        t.fahrenheit = 50
    r = None
    try:
        set_f()
        r = "assigned"
    except AttributeError:
        r = "read-only"
    except Exception:
        r = "other"
    check("Temperature.fahrenheit is read-only", r == "read-only", "a property without a setter raises AttributeError")
    check("Temperature.from_fahrenheit", attempt(lambda: abs(T.from_fahrenheit(212).celsius - 100) < 1e-9 and type(T.from_fahrenheit(32)) is T), "a @classmethod that calls cls(...)")
else:
    check("Temperature", False, "define class Temperature")

I = ns.get("Inventory")
if isinstance(I, type):
    inv = attempt(lambda: I())
    def fill():
        inv.add("pen", 3); inv.add("ink"); inv.add("pen", 2)
        return True
    attempt(fill)
    check("Inventory add, len, getitem, contains", attempt(lambda: len(inv) == 2 and inv["pen"] == 5 and inv["ink"] == 1 and inv["nothing"] == 0 and "pen" in inv and "cap" not in inv and inv.total() == 6), "keep a dict of quantities on self")
    check("Inventory iteration is sorted and repeatable", attempt(lambda: list(inv) == ["ink", "pen"] and list(inv) == ["ink", "pen"]), "return a fresh iterator each time: iter(sorted(...))")
    def rem():
        inv.remove("pen", 4)
        inv.remove("ink")
        return (len(inv), inv["pen"], "ink" in inv)
    check("Inventory remove", attempt(rem) == (1, 1, False), "removing everything of an item deletes the item")
    def rem_too_many():
        inv.remove("pen", 9)
    check("Inventory remove too many raises ValueError", raises(rem_too_many) and attempt(lambda: inv["pen"]) == 1, "check before changing anything")
    check("Inventories do not share data", attempt(lambda: (I().total() == 0 and len(I()) == 0)), "keep the dictionary on self, not on the class")
    big = attempt(lambda: I())
    start = time.perf_counter()
    def many():
        for i in range(100000):
            big.add(i % 500)
        return big.total()
    check("Inventory is fast", attempt(many) == 100000 and time.perf_counter() - start < 2.5, "dictionary updates are O(1)")
else:
    check("Inventory", False, "define class Inventory")

S, C, R, Q = ns.get("Shape"), ns.get("Circle"), ns.get("Rectangle"), ns.get("Square")
if all(isinstance(x, type) for x in (S, C, R, Q)):
    check("Shape is abstract", raises(lambda: S()) and bool(getattr(S, "__abstractmethods__", None)) and {"area", "perimeter"} <= set(S.__abstractmethods__), "class Shape(ABC) with @abstractmethod area and perimeter")
    check("Circle, Rectangle and Square numbers", attempt(lambda: abs(C(1).area() - math.pi) < 1e-9 and abs(C(2).perimeter() - 4 * math.pi) < 1e-9 and R(2, 3).area() == 6 and R(2, 3).perimeter() == 10 and Q(4).area() == 16 and Q(4).perimeter() == 16), "use math.pi")
    check("Square inherits from Rectangle", attempt(lambda: issubclass(Q, R) and isinstance(Q(2), R) and issubclass(R, S) and issubclass(C, S)), "class Square(Rectangle) with super().__init__(side, side)")
    check("Shapes sort by area and have a repr", attempt(lambda: sorted([R(2, 3), C(1), Q(1)]) and [repr(s) for s in sorted([R(2, 3), C(1), Q(1)])] == ["Square(1)", "Circle(1)", "Rectangle(2, 3)"] and C(1) < R(2, 3)), "define __lt__ on Shape using area(), and __repr__ on each class")
    f = ns.get("total_area")
    check("total_area", callable(f) and attempt(lambda: abs(f([R(2, 3), Q(2), C(1)]) - (6 + 4 + math.pi)) < 1e-9 and f([]) == 0), "sum the area() of each shape")
else:
    check("Shape classes", False, "define Shape, Circle, Rectangle and Square")

P = ns.get("Product")
if isinstance(P, type):
    p = attempt(lambda: P("pen", 2.5, 4))
    check("Product is a dataclass", dataclasses.is_dataclass(P) and attempt(lambda: repr(p)) == "Product(name='pen', price=2.5, quantity=4)" and attempt(lambda: P("x", 1).quantity) == 1, "@dataclass(frozen=True, order=True) with the three fields and a default quantity of 1")
    check("Product total", attempt(lambda: p.total == 10.0), "a read-only property")
    check("Product validates", raises(lambda: P("x", -1)) and raises(lambda: P("x", 1, -1)), "raise ValueError in __post_init__")
    def mutate():
        p.price = 9
    check("Product is frozen and hashable", raises(mutate) and attempt(lambda: len({P("a", 1), P("a", 1), P("b", 2)})) == 2, "frozen=True makes instances immutable and hashable")
    check("Product is ordered", attempt(lambda: [x.name for x in sorted([P("b", 1), P("a", 5), P("a", 2)])] == ["a", "a", "b"] and P("a", 1) < P("a", 2)), "order=True compares the fields in order")
else:
    check("Product", False, "define the Product dataclass")

E = ns.get("EventBus")
if isinstance(E, type):
    bus = attempt(lambda: E())
    log = []
    h1 = lambda x: log.append(("h1", x))
    h2 = lambda x: log.append(("h2", x))
    def go():
        bus.subscribe("a", h1); bus.subscribe("a", h2)
        return (bus.publish("a", 1), bus.publish("b", 2))
    check("EventBus publish", attempt(go) == (2, 0) and log == [("h1", 1), ("h2", 1)], "call the handlers in subscription order and return how many ran")
    def un():
        bus.unsubscribe("a", h1)
        bus.unsubscribe("a", h1)
        bus.unsubscribe("zzz", h1)
        return bus.publish("a", 3)
    check("EventBus unsubscribe", attempt(un) == 1 and log[-1] == ("h2", 3), "unsubscribing something that is not there does nothing")
    def reentrant():
        b = E()
        seen = []
        def once(x):
            seen.append("once")
            b.unsubscribe("e", once)
        b.subscribe("e", once)
        b.subscribe("e", lambda x: seen.append("always"))
        b.publish("e", 0); b.publish("e", 0)
        return seen
    check("EventBus is safe when a handler unsubscribes itself", attempt(reentrant) == ["once", "always", "always"], "loop over a copy: list(self._handlers.get(event, []))")
    check("EventBuses do not share handlers", attempt(lambda: E().publish("a", 1)) == 0, "keep the dictionary on self")
else:
    check("EventBus", False, "define class EventBus")

reg, cre = ns.get("register"), ns.get("create")
if callable(reg) and callable(cre):
    def regtest():
        @reg("circle2")
        class Circle2:
            def __init__(self, r): self.r = r
        @reg("plain")
        class Plain:
            pass
        return (type(cre("circle2", 3)).__name__, cre("circle2", 3).r, type(cre("plain")).__name__, Circle2.__name__)
    check("register and create", attempt(regtest) == ("Circle2", 3, "Plain", "Circle2"), "the decorator stores the class and returns it unchanged")
    check("create unknown name raises ValueError", raises(lambda: cre("nope")), "raise ValueError for names that were never registered")
else:
    check("register and create", False, "define register(name) and create(name, *args)")

dc = ns.get("describe_command")
cases = [([], "nothing"), (["quit"], "bye"), (["go", "north"], "going north"), (["take", "key"], "taking key"), (["say", "hello", "there"], "saying hello there"), (["say"], "saying "), ({"type": "click", "x": 3, "y": 4, "button": "left"}, "click at 3,4"), (["dance"], "unknown"), ({"type": "scroll"}, "unknown"), ("text", "unknown"), (["go"], "unknown")]
check("describe_command", callable(dc) and all(attempt(lambda c=c: dc(c)) == want for c, want in cases), "use match/case with sequence and mapping patterns, and a final case _")

M = ns.get("JsonMixin")
if isinstance(M, type):
    def mixtest():
        class User(M):
            def __init__(self, name, age):
                self.name, self.age = name, age
        u = User("Ada", 36)
        text = u.to_json()
        back = User.from_json(text)
        return (text, type(back).__name__, back.name, back.age)
    check("JsonMixin", attempt(mixtest) == ('{"age": 36, "name": "Ada"}', "User", "Ada", 36), "json.dumps(self.__dict__, sort_keys=True), and a @classmethod that returns cls(**json.loads(text))")
else:
    check("JsonMixin", False, "define class JsonMixin")`,
  },
};
