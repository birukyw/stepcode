import b251 from './2.5.1.md?raw';
import b252 from './2.5.2.md?raw';
import b253 from './2.5.3.md?raw';
import b254 from './2.5.4.md?raw';
import b255 from './2.5.5.md?raw';
import b256 from './2.5.6.md?raw';
import projectBody from './project.md?raw';

const javaClass = (body) => `public class Main {
${body}
}
`;
const q = (qq, options, answer, explain, code) => ({ q: qq, options, answer, explain, ...(code ? { code } : {}) });

export default {
  lessons: {
    '2.5.1': {
      body: b251,
      starter: {
        python: `from collections import defaultdict

edges = [("A", "B"), ("A", "C"), ("B", "D"), ("C", "D"), ("D", "E")]

graph = defaultdict(list)
for a, b in edges:
    graph[a].append(b)
    graph[b].append(a)

print(dict(graph))
print({node: len(nbrs) for node, nbrs in graph.items()})
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.Map<String, java.util.List<String>> graph = new java.util.HashMap<>();
        String[][] edges = {{"A", "B"}, {"A", "C"}, {"B", "D"}};
        for (String[] e : edges) {
            graph.computeIfAbsent(e[0], k -> new java.util.ArrayList<>()).add(e[1]);
            graph.computeIfAbsent(e[1], k -> new java.util.ArrayList<>()).add(e[0]);
        }
        System.out.println(graph);
    }`),
      },
    },
    '2.5.2': {
      body: b252,
      starter: {
        python: `def components(graph):
    seen, result = set(), []
    for start in graph:
        if start in seen:
            continue
        comp, stack = [], [start]
        seen.add(start)
        while stack:
            node = stack.pop()
            comp.append(node)
            for nxt in graph[node]:
                if nxt not in seen:
                    seen.add(nxt)
                    stack.append(nxt)
        result.append(sorted(comp))
    return result


graph = {1: [2], 2: [1, 3], 3: [2], 4: [5], 5: [4], 6: []}
print(components(graph))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[][] edges = {{1, 2}, {2, 3}, {4, 5}};
        int[] parent = new int[7];
        for (int i = 0; i < 7; i++) parent[i] = i;
        for (int[] e : edges) parent[find(parent, e[0])] = find(parent, e[1]);
        System.out.println(find(parent, 1) == find(parent, 3));
    }

    static int find(int[] p, int x) {
        while (p[x] != x) x = p[x];
        return x;
    }`),
      },
    },
    '2.5.3': {
      body: b253,
      starter: {
        python: `from collections import deque

graph = {
    "A": ["B", "C"], "B": ["A", "D"], "C": ["A", "D", "E"],
    "D": ["B", "C", "F"], "E": ["C", "F"], "F": ["D", "E"],
}


def distances(start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for nxt in graph[node]:
            if nxt not in dist:
                dist[nxt] = dist[node] + 1
                queue.append(nxt)
    return dist


print(distances("A"))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.Deque<Integer> queue = new java.util.ArrayDeque<>();
        int[][] graph = {{1, 2}, {0, 3}, {0, 3}, {1, 2}};
        int[] dist = new int[4];
        java.util.Arrays.fill(dist, -1);
        dist[0] = 0;
        queue.add(0);
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int next : graph[node]) {
                if (dist[next] == -1) { dist[next] = dist[node] + 1; queue.add(next); }
            }
        }
        System.out.println(java.util.Arrays.toString(dist));
    }`),
      },
    },
    '2.5.4': {
      body: b254,
      starter: {
        python: `from collections import deque


def topo_sort(graph):
    indegree = {n: 0 for n in graph}
    for node in graph:
        for nxt in graph[node]:
            indegree[nxt] += 1
    queue = deque(sorted(n for n in graph if indegree[n] == 0))
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in sorted(graph[node]):
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return order if len(order) == len(graph) else None


deps = {"eggs": ["batter"], "flour": ["batter"], "batter": ["bake"], "bake": []}
print(topo_sort(deps))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[][] edges = {{0, 2}, {1, 2}, {2, 3}};
        int[] indegree = new int[4];
        for (int[] e : edges) indegree[e[1]]++;
        System.out.println(java.util.Arrays.toString(indegree));
    }`),
      },
    },
    '2.5.5': {
      body: b255,
      starter: {
        python: `import heapq


def dijkstra(graph, start):
    dist = {start: 0}
    heap = [(0, start)]
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist.get(node, float("inf")):
            continue
        for nxt, w in graph[node]:
            nd = d + w
            if nd < dist.get(nxt, float("inf")):
                dist[nxt] = nd
                heapq.heappush(heap, (nd, nxt))
    return dist


graph = {
    "A": [("B", 4), ("C", 1)],
    "B": [("D", 1)],
    "C": [("B", 2), ("D", 5)],
    "D": [],
}
print(dijkstra(graph, "A"))
`,
        java: javaClass(`    public static void main(String[] args) {
        java.util.PriorityQueue<int[]> heap = new java.util.PriorityQueue<>((a, b) -> a[0] - b[0]);
        heap.add(new int[]{5, 1});
        heap.add(new int[]{2, 0});
        System.out.println(heap.poll()[0]);
    }`),
      },
    },
    '2.5.6': {
      body: b256,
      starter: {
        python: `class DSU:
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


def kruskal(n, edges):
    d = DSU(n)
    total = 0
    for w, a, b in sorted(edges):
        if d.union(a, b):
            total += w
    return total


print(kruskal(5, [(4, 0, 1), (8, 0, 2), (2, 1, 2), (6, 1, 3), (3, 2, 3), (9, 2, 4), (5, 3, 4)]))
`,
        java: javaClass(`    public static void main(String[] args) {
        int[] parent = {0, 1, 2, 3};
        parent[1] = 0;
        parent[3] = 2;
        System.out.println(parent[1] + " " + parent[3]);
    }`),
      },
    },
  },

  quiz: {
    pass: 0.7,
    questions: [
      q('Which representation uses O(V + E) memory?', ['Adjacency matrix', 'Adjacency list', 'Neither', 'Both'], 1, 'An adjacency list stores one entry per node plus one per edge end. A matrix always uses V squared cells.'),
      q('What does `[[0] * n] * n` create?', ['n independent rows', 'n references to the same row', 'An error', 'A 1D list'], 1, 'The multiplication copies the reference, so changing one row changes all of them.'),
      q('Why does graph DFS need a visited set?', ['To save memory', 'To avoid looping forever on cycles', 'To sort the nodes', 'Python requires it'], 1, 'Without it the search re-enters nodes on a cycle indefinitely.'),
      q('How do you count connected components?', ['Count the edges', 'Start a search from each unseen node and count the searches', 'Sort the nodes', 'Count the leaves'], 1, 'Each new search discovers one entire island.'),
      q('Which gives the fewest-edge path in an unweighted graph?', ['DFS', 'BFS', 'Sorting', 'Heap sort'], 1, 'BFS reaches nodes in order of distance, so the first arrival is by a shortest path.'),
      q('What is the trick for multi-source BFS?', ['Run BFS once per source', 'Put all sources in the queue at distance 0 first', 'Use a stack', 'Sort sources'], 1, 'The ripple then spreads from every source at the same time, in a single pass.'),
      q('If Kahn\'s algorithm returns fewer nodes than the graph has, what does that mean?', ['The graph is empty', 'There is a cycle', 'Some nodes are duplicates', 'The graph is undirected'], 1, 'Nodes on a cycle never reach in-degree zero.'),
      q('When does Dijkstra give wrong answers?', ['On large graphs', 'When some edge weights are negative', 'On directed graphs', 'On sparse graphs'], 1, 'It assumes a finalized node can never be improved later, which negative edges break.'),
      q('How many rounds of relaxing every edge does Bellman-Ford need?', ['1', 'V - 1', 'E', 'log V'], 1, 'A shortest path has at most V - 1 edges, so V - 1 rounds are enough.'),
      q('What does `union` returning False tell you in Kruskal\'s algorithm?', ['The edge is the heaviest', 'The two nodes are already connected, so the edge would make a cycle', 'The graph is empty', 'The tree is complete'], 1, 'Skip that edge: both ends are in the same group already.'),
    ],
  },

  project: {
    title: 'Network Toolkit',
    body: projectBody,
    starter: {
      python: `import heapq
from collections import deque


def count_islands(grid):
    pass


def shortest_hops(graph, a, b):
    pass


def nearest_zero(grid):
    pass


def has_cycle_directed(graph):
    pass


def topo_order(graph):
    pass


def dijkstra(graph, start):
    pass


def bellman_ford(n, edges, src):
    pass


class DSU:
    def __init__(self, n):
        pass

    def find(self, x):
        pass

    def union(self, a, b):
        pass

    def connected(self, a, b):
        pass


def mst_cost(n, edges):
    pass
`,
      java: javaClass('    public static void main(String[] args) {\n        // Checks run on Python. Try the same ideas in Java if you like.\n    }'),
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

rnd = random.Random(11)

check("count_islands", [call("count_islands", g) for g in (["11000", "11000", "00100", "00011"], ["000"], ["111", "101", "111"], ["1"])] == [3, 0, 1, 1], "each unseen land cell starts one flood fill")
big = ["".join("1" if rnd.random() < 0.55 else "0" for _ in range(300)) for _ in range(300)]
def isl(g):
    R, C = len(g), len(g[0]); seen = set(); n = 0
    for r in range(R):
        for c in range(C):
            if g[r][c] == "1" and (r, c) not in seen:
                n += 1; st = [(r, c)]; seen.add((r, c))
                while st:
                    a, b = st.pop()
                    for da, db in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        x, y = a + da, b + db
                        if 0 <= x < R and 0 <= y < C and g[x][y] == "1" and (x, y) not in seen:
                            seen.add((x, y)); st.append((x, y))
    return n
r, ok = timed("count_islands", big)
check("count_islands on a 300 x 300 map", ok and r == isl(big), "use a stack, not recursion, and a visited set")

G = {"A": ["B", "C"], "B": ["A", "D"], "C": ["A", "D", "E"], "D": ["B", "C", "F"], "E": ["C", "F"], "F": ["D", "E"], "X": []}
check("shortest_hops", [call("shortest_hops", G, a, b) for a, b in (("A", "F"), ("A", "A"), ("A", "X"), ("B", "E"))] == [3, 0, -1, 3], "BFS with a queue, and -1 when unreachable")
chain = {i: [i + 1, i - 1] if 0 < i < 99999 else ([1] if i == 0 else [i - 1]) for i in range(100000)}
r, ok = timed("shortest_hops", chain, 0, 99999)
check("shortest_hops on 100,000 nodes", ok and r == 99999, "deque.popleft(), and mark nodes when you enqueue them")

check("nearest_zero", call("nearest_zero", [[0, 1, 1], [1, 1, 1], [1, 1, 0]]) == [[0, 1, 2], [1, 2, 1], [2, 1, 0]] and call("nearest_zero", [[0]]) == [[0]], "put every zero in the queue at distance 0 first")
side = 300
grid = [[0 if rnd.random() < 0.001 else 1 for _ in range(side)] for _ in range(side)]
grid[0][0] = 0
r, ok = timed("nearest_zero", grid)
def nz(g):
    R, C = len(g), len(g[0]); d = [[-1] * C for _ in range(R)]; q = deque()
    for i in range(R):
        for j in range(C):
            if g[i][j] == 0:
                d[i][j] = 0; q.append((i, j))
    while q:
        a, b = q.popleft()
        for da, db in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            x, y = a + da, b + db
            if 0 <= x < R and 0 <= y < C and d[x][y] == -1:
                d[x][y] = d[a][b] + 1; q.append((x, y))
    return d
from collections import deque
check("nearest_zero on a 300 x 300 grid", ok and r == nz(grid), "one BFS from all zeros, not one per cell")

check("has_cycle_directed", [call("has_cycle_directed", g) for g in ({"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}, {"a": ["b"], "b": ["c"], "c": ["a"]}, {"a": ["a"]}, {}, {"a": ["b"], "b": [], "c": ["b"]})] == [False, True, True, False, False], "reaching a node already finished in another branch is fine. A node still on the current path is a cycle")
long_dag = {i: [i + 1] for i in range(100000)}
long_dag[100000] = []
r, ok = timed("has_cycle_directed", long_dag)
check("has_cycle_directed on a path of 100,001 nodes", ok and r is False, "recursion is too deep: use Kahn's algorithm or an explicit stack")

def valid_topo(order, g):
    if not isinstance(order, list) or sorted(map(str, order)) != sorted(map(str, g)):
        return False
    pos = {n: i for i, n in enumerate(order)}
    return all(pos[a] < pos[b] for a in g for b in g[a])
dg = {"eggs": ["batter"], "flour": ["batter"], "bowl": ["batter"], "batter": ["bake"], "oven": ["bake"], "bake": ["serve"], "serve": []}
check("topo_order gives a valid order", valid_topo(call("topo_order", dg), dg), "every arrow must point forward in the result")
check("topo_order returns None on a cycle", call("topo_order", {"a": ["b"], "b": ["c"], "c": ["a"], "d": []}) is None and call("topo_order", {}) == [], "if fewer nodes come out than went in, there is a cycle")
r, ok = timed("topo_order", long_dag)
check("topo_order on 100,001 nodes", ok and valid_topo(r, long_dag), "Kahn's algorithm with a deque")

W = {"A": [("B", 4), ("C", 1)], "B": [("D", 1)], "C": [("B", 2), ("D", 5)], "D": [], "Z": []}
r = call("dijkstra", W, "A")
check("dijkstra", isinstance(r, dict) and r.get("A") == 0 and r.get("B") == 3 and r.get("C") == 1 and r.get("D") == 4 and "Z" not in r, "unreachable nodes are left out. Use a min-heap of (distance, node)")
n = 30000
wg = {i: [] for i in range(n)}
for i in range(n - 1):
    wg[i].append((i + 1, rnd.randint(1, 20)))
    wg[i + 1].append((i, rnd.randint(1, 20)))
for _ in range(60000):
    a, b = rnd.randrange(n), rnd.randrange(n)
    w = rnd.randint(1, 100)
    wg[a].append((b, w)); wg[b].append((a, w))
def dj(g, s):
    dist = {s: 0}; h = [(0, s)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist[u]:
            continue
        for v, w in g[u]:
            if d + w < dist.get(v, 10**18):
                dist[v] = d + w; heapq.heappush(h, (d + w, v))
    return dist
import heapq
r, ok = timed("dijkstra", wg, 0)
check("dijkstra on 30,000 nodes and 120,000 edges", ok and r == dj(wg, 0), "a heap makes it O((V + E) log V). Skip stale entries")

edges = [(0, 1, 4), (0, 2, 5), (1, 2, -3), (2, 3, 2)]
check("bellman_ford with negative edges", call("bellman_ford", 4, edges, 0) == [0, 4, 1, 3], "relax every edge n - 1 times")
r = call("bellman_ford", 3, [(0, 1, 1), (1, 2, -2), (2, 0, -1)], 0)
check("bellman_ford finds a negative cycle", r is None, "if one more round still improves a distance, return None")
r = call("bellman_ford", 4, [(0, 1, 2)], 0)
check("bellman_ford unreachable nodes", r == [0, 2, float("inf"), float("inf")], "unreached distances stay infinite (float('inf'))")

D = ns.get("DSU")
if callable(D):
    try:
        d = D(6)
        a = d.union(0, 1); b = d.union(1, 2); c = d.union(0, 2)
        r1 = [a, b, c, d.connected(0, 2), d.connected(0, 4)]
    except Exception:
        r1 = None
    check("DSU union and connected", r1 == [True, True, False, True, False], "union returns False if they were already connected")
    start = time.perf_counter()
    try:
        d = D(200000)
        for i in range(199999):
            d.union(i, i + 1)
        good = d.connected(0, 199999) and time.perf_counter() - start < 2.5
    except Exception:
        good = False
    check("DSU with 200,000 unions", good, "path compression and union by size")
else:
    check("DSU", False, "define class DSU")

check("mst_cost", [call("mst_cost", n, e) for n, e in ((5, [(4, 0, 1), (8, 0, 2), (2, 1, 2), (6, 1, 3), (3, 2, 3), (9, 2, 4), (5, 3, 4)]), (4, [(1, 0, 1), (2, 1, 2), (3, 2, 3), (10, 0, 3)]), (4, [(1, 0, 1), (2, 2, 3)]), (1, []))] == [14, 6, None, 0], "Kruskal: sort edges, union, skip cycles. Return None if the graph is not connected")
m = 50000
medges = [(rnd.randint(1, 10**6), rnd.randrange(m), rnd.randrange(m)) for _ in range(150000)]
medges += [(10**6 + 1, i, i + 1) for i in range(m - 1)]
def kr(n, e):
    p = list(range(n))
    def f(x):
        while p[x] != x:
            p[x] = p[p[x]]; x = p[x]
        return x
    t = 0
    for w, a, b in sorted(e):
        ra, rb = f(a), f(b)
        if ra != rb:
            p[ra] = rb; t += w
    return t
r, ok = timed("mst_cost", m, medges)
check("mst_cost on 200,000 edges", ok and r == kr(m, medges), "sorting plus near-constant union-find")`,
  },
};
