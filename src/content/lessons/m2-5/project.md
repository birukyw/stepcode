# Project: Network Toolkit

Ten tools that put the whole graph module to work: islands, hops, floods, loops, ordering, shortest paths and cheapest wiring. This is the toolkit a maps app, a build system and a network planner all share. Every tool is also **timed on big inputs** (up to 100,000 nodes), so each one needs the right algorithm and a loop instead of deep recursion.

Graphs here are dictionaries. An **unweighted** graph maps a node to a list of neighbours: `{"A": ["B", "C"]}`. A **weighted** graph maps a node to `(neighbour, weight)` pairs: `{"A": [("B", 4)]}`. Edge lists are `(weight, a, b)` or `(a, b, weight)` as stated below.

## The functions

**1. `count_islands(grid)`** takes a list of strings of `"1"` (land) and `"0"` (water) and returns the number of islands. Land connects up, down, left and right.

**2. `shortest_hops(graph, a, b)`** returns the fewest edges from `a` to `b` in an unweighted graph, `0` if they are the same, and `-1` if unreachable.

**3. `nearest_zero(grid)`** takes a grid of numbers (`0` or `1`) and returns a grid of the same shape holding each cell's distance (up/down/left/right steps) to the nearest `0`. Use one BFS from all zeros together.

**4. `has_cycle_directed(graph)`** returns `True` if the directed graph contains a cycle (a self-loop counts). It must work on a path 100,001 nodes long.

**5. `topo_order(graph)`** returns a list of all nodes where every edge `a -> b` has `a` before `b`, or `None` if the graph has a cycle. An empty graph gives `[]`.

**6. `dijkstra(graph, start)`** returns a dictionary of the shortest distance to every **reachable** node in a weighted graph (non-negative weights). Unreachable nodes are not in the result.

**7. `bellman_ford(n, edges, src)`** takes nodes `0..n-1` and edges `(a, b, weight)` that **may be negative**. Return the list of `n` distances from `src` (use `float("inf")` for unreachable nodes), or `None` if a negative cycle is reachable.

**8. `class DSU(n)`** with `find(x)`, `union(a, b)` (returns `True` if it merged two groups, `False` if they were already connected) and `connected(a, b)`. It must survive 200,000 unions.

**9. `mst_cost(n, edges)`** takes `n` nodes and edges `(weight, a, b)` and returns the total weight of a minimum spanning tree, or `None` if the graph is not connected. One node alone costs `0`.

> **Tip:** Say the idea out loud before each function: flood fill, queue, all sources at once, three colours, in-degrees, min-heap, relax everything, parent pointers, sorted edges.

> **Watch out:** several checks run on **100,000-node** inputs. Python's recursion limit will stop any recursive DFS, and a list used as a queue (`pop(0)`) will be far too slow.

## Stretch goals

- Make `shortest_hops` also return the path itself.
- Write `network_delay(times, n, k)` with `dijkstra`.
- Add a `components` property to `DSU` that tracks the number of groups.

## Hints

+++ Searching hints
`count_islands`, `shortest_hops` and `nearest_zero` all keep a visited set or a distance table. For the last one, start with **every** zero already in the queue. Mark a cell when you enqueue it.
+++

+++ Ordering hints
`topo_order` and `has_cycle_directed` can share Kahn's algorithm: compute in-degrees, queue the zeros, pop and reduce. If fewer nodes come out than went in, there is a cycle. A self-loop gives a node an in-degree it can never lose.
+++

+++ Weighted-graph hints
`dijkstra`: a heap of `(distance, node)`, skip an entry when `d > dist[node]`. `bellman_ford`: `n - 1` rounds of "if `dist[a] + w < dist[b]`", then one more round to look for a negative cycle. Skip edges whose source is still infinite.
+++

+++ Full solution
```python
import heapq
from collections import deque


def count_islands(grid):
    rows, cols = len(grid), len(grid[0])
    seen = set()
    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1" or (r, c) in seen:
                continue
            count += 1
            seen.add((r, c))
            stack = [(r, c)]
            while stack:
                cr, cc = stack.pop()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1" and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        stack.append((nr, nc))
    return count


def shortest_hops(graph, a, b):
    if a == b:
        return 0
    dist = {a: 0}
    queue = deque([a])
    while queue:
        node = queue.popleft()
        for nxt in graph.get(node, []):
            if nxt not in dist:
                dist[nxt] = dist[node] + 1
                if nxt == b:
                    return dist[nxt]
                queue.append(nxt)
    return -1


def nearest_zero(grid):
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque()
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))
    while queue:
        r, c = queue.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    return dist


def topo_order(graph):
    indegree = {n: 0 for n in graph}
    for node in graph:
        for nxt in graph[node]:
            indegree[nxt] = indegree.get(nxt, 0) + 1
    queue = deque(n for n in indegree if indegree[n] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph.get(node, []):
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return order if len(order) == len(indegree) else None


def has_cycle_directed(graph):
    return topo_order(graph) is None


def dijkstra(graph, start):
    dist = {start: 0}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist.get(node, float("inf")):
            continue
        for nxt, w in graph.get(node, []):
            nd = d + w
            if nd < dist.get(nxt, float("inf")):
                dist[nxt] = nd
                heapq.heappush(heap, (nd, nxt))
    return dist


def bellman_ford(n, edges, src):
    dist = [float("inf")] * n
    dist[src] = 0
    for _ in range(n - 1):
        changed = False
        for a, b, w in edges:
            if dist[a] != float("inf") and dist[a] + w < dist[b]:
                dist[b] = dist[a] + w
                changed = True
        if not changed:
            break
    for a, b, w in edges:
        if dist[a] != float("inf") and dist[a] + w < dist[b]:
            return None
    return dist


class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)


def mst_cost(n, edges):
    dsu = DSU(n)
    total, used = 0, 0
    for w, a, b in sorted(edges):
        if dsu.union(a, b):
            total += w
            used += 1
    return total if used == n - 1 else None
```
+++
