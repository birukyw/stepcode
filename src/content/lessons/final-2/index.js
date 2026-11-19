import b from './project.md?raw';

export default {
  moduleId: 'm2-6',
  project: {
    title: 'Atlas',
    body: b,
    starter: {
      python: `import heapq
from collections import OrderedDict, deque

SAMPLE_MAP = """
# a tiny town
Home - Cafe : 2
Home - Park : 5
Cafe - Park : 2
Cafe - Old Town : 7
Park - Old Town : 3
Park - Gym : 4
Old Town - Gym : 1
Gym - Office : 6
Old Town - Office : 8
"""


def parse_map(text):
    pass


class PlaceIndex:
    def add(self, name, popularity=1):
        pass

    def suggest(self, prefix, limit=3):
        pass


def route(graph, start, goal):
    pass


def fewest_stops(graph, a, b):
    pass


def reachable_within(graph, start, budget):
    pass


class RouteCache:
    def __init__(self, graph, capacity):
        self.hits = 0
        self.misses = 0

    def get(self, start, goal):
        pass


def tour_cost(graph, stops):
    pass


def best_tour(graph, start, stops):
    pass


def cable_cost(graph):
    pass


def describe(graph, path):
    pass


class Atlas:
    def __init__(self, map_text, popularity):
        pass

    def search(self, prefix, limit=3):
        pass

    def directions(self, a, b):
        pass


# Try it out
# graph = parse_map(SAMPLE_MAP)
# print(route(graph, "Home", "Office"))
`,
      java: 'public class Main {\n    public static void main(String[] args) {\n        // Checks run on Python. Try the same engine in Java if you like.\n    }\n}\n',
    },
    checks: `import random, time, heapq, itertools
from collections import deque

def call(name, *a):
    f = ns.get(name)
    if not callable(f):
        return "<missing>"
    try:
        return f(*a)
    except Exception as e:
        return "<" + type(e).__name__ + ">"

def timed(fn, *a, limit=2.5):
    start = time.perf_counter()
    try:
        r = fn(*a)
    except Exception:
        return None, False
    return r, (time.perf_counter() - start) <= limit

MAP = """
# a tiny town
Home - Cafe : 2
Home - Park : 5
Cafe - Park : 2

Cafe - Old Town : 7
Park - Old Town : 3
Park - Gym : 4
Old Town - Gym : 1
Gym - Office : 6
Old Town - Office : 8
Home - Cafe : 9
Island - Rock : 1
"""

def norm(g):
    return {k: sorted(v) for k, v in g.items()} if isinstance(g, dict) else g

# Reference graph built independently of the learner code
REF = {}
for a, b, w in [("Home", "Cafe", 2), ("Home", "Park", 5), ("Cafe", "Park", 2), ("Cafe", "Old Town", 7), ("Park", "Old Town", 3), ("Park", "Gym", 4), ("Old Town", "Gym", 1), ("Gym", "Office", 6), ("Old Town", "Office", 8), ("Island", "Rock", 1)]:
    REF.setdefault(a, []).append((b, w))
    REF.setdefault(b, []).append((a, w))

def ref_dist(g, s):
    d = {s: 0}; h = [(0, s)]
    while h:
        x, u = heapq.heappop(h)
        if x > d[u]:
            continue
        for v, w in g[u]:
            if x + w < d.get(v, 10**18):
                d[v] = x + w; heapq.heappush(h, (x + w, v))
    return d

def valid_route(g, res, a, b):
    if not (isinstance(res, tuple) and len(res) == 2):
        return False
    dist, path = res
    if not path or path[0] != a or path[-1] != b:
        return False
    total = 0
    for x, y in zip(path, path[1:]):
        ws = [w for n, w in g[x] if n == y]
        if not ws:
            return False
        total += min(ws)
    return total == dist == ref_dist(g, a).get(b)

# 1. parse_map
G = call("parse_map", MAP)
ok = isinstance(G, dict) and norm(G) == {k: sorted(v) for k, v in REF.items()}
check("parse_map builds the graph", ok, "split each line on ':' then ' - ', strip spaces, and add both directions")
check("parse_map keeps the shorter duplicate road, skips comments and blanks", isinstance(G, dict) and ("Cafe", 2) in G.get("Home", []) and ("Cafe", 9) not in G.get("Home", []) and "# a tiny town" not in G, "keep min(km) for repeated pairs")
if not isinstance(G, dict):
    G = REF

# 2. PlaceIndex
PI = ns.get("PlaceIndex")
if callable(PI):
    try:
        idx = PI()
        idx.add("Library", 5); idx.add("Lighthouse", 9); idx.add("Lib Cafe", 5); idx.add("Park", 2); idx.add("Library", 1); idx.add("lab", 3)
        r1 = idx.suggest("li")
        r2 = idx.suggest("LIB")
        r3 = idx.suggest("l", 2)
        r4 = idx.suggest("zz")
        r5 = idx.suggest("", 10)
    except Exception:
        r1 = r2 = r3 = r4 = r5 = None
    check("PlaceIndex.suggest ranks by popularity, then name", r1 == ["Lighthouse", "Library", "Lib Cafe"], "adding a name twice adds popularity (Library is 6). Sort by (-popularity, name)")
    check("PlaceIndex ignores case and respects limit", r2 == ["Library", "Lib Cafe"] and r3 == ["Lighthouse", "Library"] and r4 == [] and r5 == ["Lighthouse", "Library", "Lib Cafe", "lab", "Park"], "lowercase while walking the trie, but return the original name")
    rnd = random.Random(31)
    names = list({"".join(rnd.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(rnd.randint(4, 9))) for _ in range(30000)})
    start = time.perf_counter()
    try:
        idx = PI()
        pops = {}
        for n in names:
            p = rnd.randint(1, 1000)
            pops[n] = p
            idx.add(n, p)
        prefixes = ["".join(rnd.choice("abcdefghijklmnopqrstuvwxyz") for _ in range(3)) for _ in range(150)]
        good = True
        for pre in prefixes:
            exp = sorted((n for n in names if n.startswith(pre)), key=lambda n: (-pops[n], n))[:3]
            if idx.suggest(pre) != exp:
                good = False
                break
        good = good and time.perf_counter() - start < 2.5
    except Exception:
        good = False
    check("PlaceIndex with 30,000 names", good, "a trie: walk down the prefix, then collect only that subtree")
else:
    check("PlaceIndex", False, "define class PlaceIndex")

# 3. route
cases = [("Home", "Office"), ("Home", "Gym"), ("Cafe", "Old Town"), ("Office", "Home"), ("Park", "Park")]
check("route finds the cheapest path", all(valid_route(G, call("route", G, a, b), a, b) for a, b in cases), "Dijkstra with a heap, and a parent map to rebuild the path")
check("route returns (0, [place]) for the same place", call("route", G, "Gym", "Gym") == (0, ["Gym"]), "distance 0, path of one place")
check("route returns None when unreachable or unknown", call("route", G, "Home", "Rock") is None and call("route", G, "Home", "Mars") is None and call("route", G, "Mars", "Home") is None, "no route, or a place that is not on the map")

rnd = random.Random(5)
N = 20000
BIG = {i: [] for i in range(N)}
for i in range(N - 1):
    w = rnd.randint(1, 30)
    BIG[i].append((i + 1, w)); BIG[i + 1].append((i, w))
for _ in range(50000):
    a, b = rnd.randrange(N), rnd.randrange(N)
    w = rnd.randint(1, 200)
    BIG[a].append((b, w)); BIG[b].append((a, w))
f = ns.get("route")
r, ok = timed(f, BIG, 0, N - 1) if callable(f) else (None, False)
check("route on a 20,000-place map", ok and valid_route(BIG, r, 0, N - 1), "a heap keeps Dijkstra at O((V + E) log V)")

# 4. fewest_stops
check("fewest_stops", [call("fewest_stops", G, a, b) for a, b in (("Home", "Office"), ("Home", "Home"), ("Home", "Rock"), ("Cafe", "Gym"), ("Home", "Mars"))] == [3, 0, -1, 2, -1], "BFS counts roads, not kilometres")
chain = {i: [(i + 1, 1)] + ([(i - 1, 1)] if i else []) for i in range(100000)}
chain[99999] = [(99998, 1)]
r, ok = timed(ns.get("fewest_stops"), chain, 0, 99999) if callable(ns.get("fewest_stops")) else (None, False)
check("fewest_stops on a 100,000-place chain", ok and r == 99999, "use a deque and no recursion")

# 5. reachable_within
expected = sorted(((k, v) for k, v in ref_dist(REF, "Home").items() if v <= 9), key=lambda kv: (kv[1], kv[0]))
check("reachable_within", call("reachable_within", G, "Home", 9) == expected and call("reachable_within", G, "Home", 0) == [("Home", 0)] and call("reachable_within", G, "Mars", 5) == [], "Dijkstra, but skip anything over the budget. Sort by distance then name")
r, ok = timed(ns.get("reachable_within"), BIG, 0, 300) if callable(ns.get("reachable_within")) else (None, False)
rd = ref_dist(BIG, 0)
check("reachable_within on a 20,000-place map", ok and r == sorted(((k, v) for k, v in rd.items() if v <= 300), key=lambda kv: (kv[1], kv[0])), "stop expanding once the budget is exceeded")

# 6. RouteCache
RC = ns.get("RouteCache")
if callable(RC):
    try:
        c = RC(G, 2)
        a1 = c.get("Home", "Office")
        a2 = c.get("Home", "Office")
        c.get("Cafe", "Gym")
        c.get("Home", "Office")      # use it: Cafe->Gym is now the oldest
        c.get("Park", "Office")      # evicts Cafe->Gym
        m_before = c.misses
        c.get("Cafe", "Gym")         # miss again
        m_after = c.misses
        ok1 = a1 == a2 and valid_route(G, a1, "Home", "Office")
        ok2 = c.hits == 2 and m_before == 3 and m_after == 4
        c2 = RC(G, 3)
        c2.get("Home", "Rock"); c2.get("Home", "Rock")
        ok3 = c2.hits == 1 and c2.misses == 1 and c2.get("Home", "Rock") is None
    except Exception:
        ok1 = ok2 = ok3 = False
    check("RouteCache returns correct routes", ok1, "on a miss call route and store the answer")
    check("RouteCache counts hits and misses and evicts the least recently used", ok2, "a lookup counts as a use: use OrderedDict.move_to_end")
    check("RouteCache caches unreachable results too", ok3, "store None as a valid cached answer")
    start = time.perf_counter()
    try:
        c = RC(BIG, 50)
        for i in range(2000):
            c.get(i % 10, 19999 - (i % 10))
        good = c.hits == 1990 and c.misses == 10 and time.perf_counter() - start < 2.5
    except Exception:
        good = False
    check("RouteCache turns repeated questions into hits", good, "10 different routes asked 200 times each: 10 misses, 1,990 hits")
else:
    check("RouteCache", False, "define class RouteCache")

# 7. tour_cost
check("tour_cost", [call("tour_cost", G, s) for s in (["Home", "Gym", "Office"], ["Home"], [], ["Office", "Home"], ["Home", "Rock"])] == [ref_dist(REF, "Home")["Gym"] + ref_dist(REF, "Gym")["Office"], 0, 0, ref_dist(REF, "Office")["Home"], None], "add the cheapest distance of each leg, in order")

# 8. best_tour
def ref_best(g, start, stops):
    best = None
    d0 = ref_dist(g, start)
    dd = {s: ref_dist(g, s) for s in stops}
    for perm in itertools.permutations(stops):
        cost = d0[perm[0]] + sum(dd[a][b] for a, b in zip(perm, perm[1:]))
        if best is None or cost < best:
            best = cost
    return best

def good_tour(g, start, stops, res):
    if not (isinstance(res, tuple) and len(res) == 2):
        return False
    cost, order = res
    if sorted(order) != sorted(stops):
        return False
    d = ref_dist(g, start)
    total = d[order[0]]
    for a, b in zip(order, order[1:]):
        total += ref_dist(g, a)[b]
    return total == cost == ref_best(g, start, stops)

check("best_tour (small)", good_tour(G, "Home", ["Gym", "Office", "Cafe"], call("best_tour", G, "Home", ["Gym", "Office", "Cafe"])) and good_tour(G, "Gym", ["Home"], call("best_tour", G, "Gym", ["Home"])), "try every order with a bitmask DP: dp[mask][last]")
check("best_tour edge cases", call("best_tour", G, "Home", []) == (0, []) and call("best_tour", G, "Home", ["Gym", "Rock"]) is None, "no stops cost 0. An unreachable stop gives None")
side = 6
GRID = {}
for r_ in range(side):
    for c_ in range(side):
        GRID[(r_, c_)] = []
for r_ in range(side):
    for c_ in range(side):
        for dr, dc in ((1, 0), (0, 1)):
            nr, nc = r_ + dr, c_ + dc
            if nr < side and nc < side:
                w = random.Random(r_ * 7 + c_ * 13 + dr).randint(1, 9)
                GRID[(r_, c_)].append(((nr, nc), w)); GRID[(nr, nc)].append(((r_, c_), w))
stops = [(0, 5), (5, 0), (5, 5), (2, 3), (3, 1), (1, 1), (4, 4), (0, 3)]
r, ok = timed(ns.get("best_tour"), GRID, (0, 0), stops) if callable(ns.get("best_tour")) else (None, False)
check("best_tour with 8 stops on a grid", ok and good_tour(GRID, (0, 0), stops, r), "dp over subsets: O(2^k * k^2), far faster than k! orderings")
stops10 = stops + [(3, 5), (5, 2)]
r, ok = timed(ns.get("best_tour"), GRID, (0, 0), stops10, limit=3.0) if callable(ns.get("best_tour")) else (None, False)
check("best_tour with 10 stops", ok and isinstance(r, tuple) and sorted(r[1]) == sorted(stops10), "3,628,800 orderings is too many. Use the bitmask DP")

# 9. cable_cost
check("cable_cost", call("cable_cost", {"A": [("B", 2)], "B": [("A", 2), ("C", 3)], "C": [("B", 3)]}) == 5 and call("cable_cost", {"A": []}) == 0, "a minimum spanning tree: Kruskal with union-find")
check("cable_cost is None for a disconnected map", call("cable_cost", G) is None, "the town and the island are separate: fewer than n - 1 edges")
town = {k: v for k, v in G.items() if k not in ("Island", "Rock")}
check("cable_cost on the town", call("cable_cost", town) == 14, "Home-Cafe 2, Cafe-Park 2, Park-Old Town 3, Old Town-Gym 1, Gym-Office 6 = 14")
start = time.perf_counter()
res = call("cable_cost", BIG)
def kr(g):
    idx = {p: i for i, p in enumerate(g)}; par = list(range(len(idx)))
    def f_(x):
        while par[x] != x:
            par[x] = par[par[x]]; x = par[x]
        return x
    t = 0
    for w, a, b in sorted((w, idx[a], idx[b]) for a in g for b, w in g[a] if idx[a] < idx[b]):
        ra, rb = f_(a), f_(b)
        if ra != rb:
            par[ra] = rb; t += w
    return t
check("cable_cost on 20,000 places", res == kr(BIG) and time.perf_counter() - start < 3.0, "sort the edges once, then union-find")

# 10. describe
check("describe", call("describe", G, ["Home", "Cafe", "Park"]) == "Home -> Cafe (2 km) -> Park (2 km) | total 4 km" and call("describe", G, ["Gym"]) == "Gym | total 0 km", "format: place -> place (km) ... | total N km")

# 11. Atlas
A = ns.get("Atlas")
if callable(A):
    try:
        pop = {"Home": 9, "Cafe": 4, "Park": 6, "Old Town": 5, "Gym": 7, "Office": 8, "Island": 1, "Rock": 1}
        atlas = A(MAP, pop)
        s1 = atlas.search("o")
        s2 = atlas.search("")
        d1 = atlas.directions("hom", "off")
        d2 = atlas.directions("home", "gym")
        d3 = atlas.directions("nowhere", "gym")
        d4 = atlas.directions("home", "rock")
        d5 = atlas.directions("hom", "off")
        hits = atlas.cache.hits
        s6 = atlas.directions("p", "o")
    except Exception as e:
        s1 = s2 = d1 = d2 = d3 = d4 = d5 = s6 = hits = None
    check("Atlas.search", s1 == ["Office", "Old Town"] and s2 == ["Home", "Office", "Gym"], "an index with every place and its popularity")
    ref_home_off = ref_dist(REF, "Home")["Office"]
    check("Atlas.directions", isinstance(d1, str) and d1.startswith("Home -> ") and d1.endswith("| total " + str(ref_home_off) + " km") and d1 == d5 and isinstance(d2, str) and d2.startswith("Home -> "), "resolve each prefix to its top suggestion, then route and describe")
    check("Atlas.directions handles unknown places and missing routes", d3 == "Unknown place: nowhere" and d4 == "No route", "return 'Unknown place: <typed>' or 'No route'")
    check("Atlas uses its route cache", hits == 1 and s6 is not None, "asking the same directions twice is one hit")
else:
    check("Atlas", False, "define class Atlas")`,
  },
};
