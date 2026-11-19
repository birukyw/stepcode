# Final Project: Atlas

Welcome to the Track 2 finale. You are going to build the **engine of a pocket maps app**. Type `lib` into the search box and it suggests "Library". Ask for directions from `home` to `gym` and it answers with the cheapest route, in plain text, instantly. Ask the same question twice and the second answer comes from a cache.

Almost everything you learned in this track is in here: a **trie** for autocomplete (module 2.4), **Dijkstra** and **BFS** on a graph (2.5), a **union-find** powered cable planner (2.5), an **LRU cache** (2.3), a **bitmask DP** for the best delivery tour (2.3 and 2.6), and string handling for the output. It is the hardest project so far, and it is meant to feel like building something real.

## The map format

Maps arrive as text. One road per line, `place - place : kilometres`. Blank lines and lines starting with `#` are ignored. Place names may contain spaces and are case-sensitive.

```map
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
```

Roads are two-way. If the same pair appears twice, keep the **shorter** one. The graph is a dictionary: `{place: [(neighbour, km), ...]}`, with every place present as a key.

## The tools

**1. `parse_map(text)`** returns the graph described above. Distances are integers.

**2. `class PlaceIndex`** is the autocomplete.
- `add(name, popularity=1)` registers a place. Adding the same name again **adds** to its popularity.
- `suggest(prefix, limit=3)` returns up to `limit` place names that start with `prefix`, **ignoring case**, most popular first, ties broken alphabetically. An empty prefix matches everything. Return the names exactly as they were added.

**3. `route(graph, start, goal)`** returns `(distance, path)` for the **cheapest** route, with `path` a list of places from `start` to `goal`, or `None` if there is no route (or a place is unknown). `route(g, "A", "A")` is `(0, ["A"])`.

**4. `fewest_stops(graph, a, b)`** returns the minimum number of **roads** (ignoring distance) from `a` to `b`, or `-1`.

**5. `reachable_within(graph, start, budget)`** returns a list of `(place, km)` for every place whose cheapest distance from `start` is **at most** `budget`, including `start` itself at 0, sorted by distance and then name.

**6. `class RouteCache(graph, capacity)`** wraps `route` with an **LRU cache** keyed by `(start, goal)`.
- `get(start, goal)` returns the same as `route`, but remembers the answer. A cached answer is a **hit**, otherwise a **miss** (count `None` results too).
- It has attributes `hits` and `misses`. When more than `capacity` routes are cached, evict the **least recently used** one. Looking an answer up counts as using it.

**7. `tour_cost(graph, stops)`** returns the total cheapest distance of visiting `stops` **in the given order**, or `None` if any leg is unreachable. Fewer than two stops cost `0`.

**8. `best_tour(graph, start, stops)`** is the delivery planner. Visit every place in `stops` (in any order), starting at `start` and ending wherever you like. Return `(cost, order)` where `order` lists the stops in the cheapest visiting order, or `None` if some stop is unreachable. Up to 10 stops: use a **bitmask DP** over the cheapest distances between stops. A brute force over all orderings is too slow.

**9. `cable_cost(graph)`** returns the minimum total length of road that connects **every** place (a minimum spanning tree), or `None` if the map is not connected.

**10. `describe(graph, path)`** turns a route into text:

```route
Home -> Cafe (2 km) -> Park (2 km) | total 4 km
```

A single place is `Home | total 0 km`. Distances come from the graph.

**11. `class Atlas(map_text, popularity)`** ties it all together. `popularity` is a dictionary from place to popularity score. An `Atlas`:
- builds the graph with `parse_map` and an index with `PlaceIndex`, adding **every** place with its popularity (default 1),
- has a `RouteCache` in `self.cache` with capacity 100,
- `search(prefix, limit=3)` returns suggestions,
- `directions(a, b)` takes what the user typed (**prefixes**, any case), resolves each one to its **top suggestion**, and returns `describe` of the cheapest route. If a prefix matches nothing, return `Unknown place: <what they typed>`. If there is no route, return `No route`.

> **Tip:** Build and test each tool on its own with the sample map before wiring up `Atlas`. Most of them are one idea from a lesson.

> **Watch out:** the checks run on **20,000-place** maps and **30,000-name** dictionaries, and `best_tour` with 10 stops. Slow shortcuts will time out.

## Stretch goals

- Add `avoid(graph, place)` that returns a copy of the map without a closed place.
- Make `suggest` forgive one typo using edit distance when nothing matches.
- Add `landmarks(graph, k)` returning the `k` places with the most roads.

## Hints

+++ Maps and search hints
`parse_map`: for each non-comment line, `roads, km = line.split(":")` then `a, b = roads.split(" - ")`, and strip spaces. Keep the minimum weight in a dictionary keyed by the sorted pair before converting to lists. For `PlaceIndex`, a trie where each node keeps a dict of children (keys lowercased) and the `names` that end there is enough. To suggest, walk to the prefix node, collect names below it, and sort by `(-popularity, name)`.
+++

+++ Routing hints
`route` is Dijkstra with a `parent` map. `reachable_within` is Dijkstra that ignores nodes farther than the budget. `fewest_stops` is BFS. For `RouteCache`, an `OrderedDict` with `move_to_end` makes the LRU easy. Store `None` results as well, using a sentinel to tell "not cached" from "cached as None".
+++

+++ Planning hints
`best_tour`: run Dijkstra from the start and from each stop to build a small distance table. Then `dp[mask][last]` = cheapest cost to have visited the stops in `mask`, ending at `last`. Start with `dp[1 << i][i] = dist(start, stop_i)`, extend by one unvisited stop at a time, and the answer is the minimum over `dp[full][last]`. Track the previous stop to rebuild the order. `cable_cost` is Kruskal with union-find.
+++

+++ Full solution
```python
import heapq
from collections import OrderedDict, deque


def parse_map(text):
    best = {}
    places = set()
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        roads, km = line.split(":")
        a, b = (p.strip() for p in roads.split(" - "))
        km = int(km)
        places.update((a, b))
        key = tuple(sorted((a, b)))
        if key not in best or km < best[key]:
            best[key] = km
    graph = {p: [] for p in places}
    for (a, b), km in best.items():
        graph[a].append((b, km))
        graph[b].append((a, km))
    return graph


class _Node:
    def __init__(self):
        self.children = {}
        self.names = []


class PlaceIndex:
    def __init__(self):
        self.root = _Node()
        self.popularity = {}

    def add(self, name, popularity=1):
        if name in self.popularity:
            self.popularity[name] += popularity
            return
        self.popularity[name] = popularity
        node = self.root
        for ch in name.lower():
            node = node.children.setdefault(ch, _Node())
        node.names.append(name)

    def suggest(self, prefix, limit=3):
        node = self.root
        for ch in prefix.lower():
            node = node.children.get(ch)
            if node is None:
                return []
        found, stack = [], [node]
        while stack:
            n = stack.pop()
            found.extend(n.names)
            stack.extend(n.children.values())
        found.sort(key=lambda name: (-self.popularity[name], name))
        return found[:limit]


def route(graph, start, goal):
    if start not in graph or goal not in graph:
        return None
    dist = {start: 0}
    parent = {start: None}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if node == goal:
            path = []
            while node is not None:
                path.append(node)
                node = parent[node]
            return d, path[::-1]
        if d > dist[node]:
            continue
        for nxt, km in graph[node]:
            nd = d + km
            if nd < dist.get(nxt, float("inf")):
                dist[nxt] = nd
                parent[nxt] = node
                heapq.heappush(heap, (nd, nxt))
    return None


def fewest_stops(graph, a, b):
    if a not in graph or b not in graph:
        return -1
    if a == b:
        return 0
    seen = {a: 0}
    queue = deque([a])
    while queue:
        node = queue.popleft()
        for nxt, _ in graph[node]:
            if nxt not in seen:
                seen[nxt] = seen[node] + 1
                if nxt == b:
                    return seen[nxt]
                queue.append(nxt)
    return -1


def _distances(graph, start, budget=float("inf")):
    dist = {start: 0}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]:
            continue
        for nxt, km in graph[node]:
            nd = d + km
            if nd <= budget and nd < dist.get(nxt, float("inf")):
                dist[nxt] = nd
                heapq.heappush(heap, (nd, nxt))
    return dist


def reachable_within(graph, start, budget):
    if start not in graph:
        return []
    dist = _distances(graph, start, budget)
    return sorted(dist.items(), key=lambda kv: (kv[1], kv[0]))


class RouteCache:
    _MISSING = object()

    def __init__(self, graph, capacity):
        self.graph = graph
        self.capacity = capacity
        self.data = OrderedDict()
        self.hits = 0
        self.misses = 0

    def get(self, start, goal):
        key = (start, goal)
        cached = self.data.get(key, self._MISSING)
        if cached is not self._MISSING:
            self.hits += 1
            self.data.move_to_end(key)
            return cached
        self.misses += 1
        result = route(self.graph, start, goal)
        self.data[key] = result
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)
        return result


def tour_cost(graph, stops):
    total = 0
    for a, b in zip(stops, stops[1:]):
        r = route(graph, a, b)
        if r is None:
            return None
        total += r[0]
    return total


def best_tour(graph, start, stops):
    stops = list(dict.fromkeys(stops))
    if start not in graph or any(s not in graph for s in stops):
        return None
    if not stops:
        return 0, []
    n = len(stops)
    from_start = _distances(graph, start)
    between = [_distances(graph, s) for s in stops]
    INF = float("inf")
    if any(s not in from_start for s in stops):
        return None
    dp = [[INF] * n for _ in range(1 << n)]
    prev = [[-1] * n for _ in range(1 << n)]
    for i in range(n):
        dp[1 << i][i] = from_start[stops[i]]
    for mask in range(1 << n):
        for last in range(n):
            cur = dp[mask][last]
            if cur == INF:
                continue
            for nxt in range(n):
                if mask & (1 << nxt):
                    continue
                cost = cur + between[last][stops[nxt]]
                nm = mask | (1 << nxt)
                if cost < dp[nm][nxt]:
                    dp[nm][nxt] = cost
                    prev[nm][nxt] = last
    full = (1 << n) - 1
    last = min(range(n), key=lambda i: dp[full][i])
    best = dp[full][last]
    order, mask = [], full
    while last != -1:
        order.append(stops[last])
        before = prev[mask][last]
        mask ^= 1 << last
        last = before
    return best, order[::-1]


def cable_cost(graph):
    if not graph:
        return 0
    index = {p: i for i, p in enumerate(graph)}
    parent = list(range(len(index)))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    edges = sorted((km, index[a], index[b]) for a in graph for b, km in graph[a] if index[a] < index[b])
    total, used = 0, 0
    for km, a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            total += km
            used += 1
    return total if used == len(index) - 1 else None


def describe(graph, path):
    weight = {}
    for a in graph:
        for b, km in graph[a]:
            weight[(a, b)] = km
    text = path[0]
    total = 0
    for a, b in zip(path, path[1:]):
        km = weight[(a, b)]
        total += km
        text += " -> " + b + " (" + str(km) + " km)"
    return text + " | total " + str(total) + " km"


class Atlas:
    def __init__(self, map_text, popularity):
        self.graph = parse_map(map_text)
        self.index = PlaceIndex()
        for place in self.graph:
            self.index.add(place, popularity.get(place, 1))
        self.cache = RouteCache(self.graph, 100)

    def search(self, prefix, limit=3):
        return self.index.suggest(prefix, limit)

    def directions(self, a, b):
        found = []
        for typed in (a, b):
            options = self.index.suggest(typed, 1)
            if not options:
                return "Unknown place: " + typed
            found.append(options[0])
        result = self.cache.get(found[0], found[1])
        if result is None:
            return "No route"
        return describe(self.graph, result[1])
```
+++
