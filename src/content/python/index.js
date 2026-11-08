/**
 * src/content/python/index.js
 *
 * Master 4-Track, 22-Module, 115-Lesson Python SWE Curriculum Definition.
 * Order: Track 1 (Foundations) -> Track 2 (DSA) -> Track 3 (Applied SWE) -> Track 4 (AI & ML)
 */

import { m1_1_content } from './m1_1.js';

export const PYTHON_SYLLABUS_STATS = {
  tracks: 4,
  modules: 22,
  lessons: 115,
};

// Raw metadata definition of all 22 modules and 115 lessons
const RAW_MODULES = [
  // ─── TRACK 1: Beginner Python Foundations (6 Modules, 32 Lessons) ───────────
  {
    phaseId: 'phase-py-foundations',
    phaseTitle: 'Track 1: Beginner Python Foundations',
    phaseSubtitle: 'State, Memory References, Decision Trees, Loops, Slicing, Hash Maps',
    phaseIcon: '🐍',
    phaseColor: '#2563eb',
    phaseBadge: 'FOUNDATIONS',
    id: 'm1-1',
    number: 1,
    title: 'Thinking in Code — Expressions, State & Memory',
    subtitle: 'Top-to-bottom execution, name binding, modular arithmetic & types',
    lessons: [
      { id: '1.1.1', title: 'The Sequential Machine', subtitle: 'Top-to-bottom execution, expressions, print()', engine: 'Scrubber + SortOrder' },
      { id: '1.1.2', title: 'Variables Are Labels, Not Boxes', subtitle: 'Name binding, object id(), reassignment', engine: 'PyObjectMemory' },
      { id: '1.1.3', title: 'Arithmetic & Modular Clocks', subtitle: 'int, float, //, %, **', engine: 'CodeFill + Scrubber' },
      { id: '1.1.4', title: 'Strings & Pattern Assembly', subtitle: 'Literals, +, *, f-strings {}', engine: 'CodeFill' },
      { id: '1.1.5', title: 'Shape-Shifting Types & Input', subtitle: 'type(), int(), float(), str(), input()', engine: 'TypeCasting' },
    ]
  },
  {
    phaseId: 'phase-py-foundations',
    id: 'm1-2',
    number: 2,
    title: 'Logic Gates & Decision Trees',
    subtitle: 'Comparisons, branching if/elif/else, precedence & short-circuiting',
    lessons: [
      { id: '1.2.1', title: 'Truth, Lies & Comparisons', subtitle: 'bool, ==, !=, <, >=, chained intervals', engine: 'SequenceHighlighter' },
      { id: '1.2.2', title: 'Forking the Path', subtitle: 'if, else, indentation blocks, ternary', engine: 'BranchingTrack' },
      { id: '1.2.3', title: 'Multi-Way Decision Trees', subtitle: 'elif chains vs independent if, specificity order', engine: 'BugHunter' },
      { id: '1.2.4', title: 'Combining Logic Gates', subtitle: "and, or, not, precedence, De Morgan's laws", engine: 'LogicGate' },
      { id: '1.2.5', title: 'Short-Circuiting & Truthiness', subtitle: 'Truthy/falsy (0, "", [], None), lazy guards', engine: 'ShortCircuitGate' },
    ]
  },
  {
    phaseId: 'phase-py-foundations',
    id: 'm1-3',
    number: 3,
    title: 'Iteration, Patterns & Loop Mechanics',
    subtitle: 'State machines, ranges, accumulators & multi-dimensional grids',
    lessons: [
      { id: '1.3.1', title: 'State Machines & while Loops', subtitle: 'while, termination, infinite loop hazards', engine: 'Scrubber' },
      { id: '1.3.2', title: 'Counting with Sequences & range', subtitle: 'for, range(start, stop, step)', engine: 'Array/Grid' },
      { id: '1.3.3', title: 'The Accumulator Pattern', subtitle: 'Running sums, counters, -inf/+inf min/max', engine: 'Scrubber' },
      { id: '1.3.4', title: 'Loop Control: break, continue & else', subtitle: 'Early exit break, skip continue, loop else', engine: 'LoopControlJumper' },
      { id: '1.3.5', title: '2D Grids & Nested Loops', subtitle: 'Outer/inner cycles, (row, col), triangular loops', engine: 'GridHighlighter' },
    ]
  },
  {
    phaseId: 'phase-py-foundations',
    id: 'm1-4',
    number: 4,
    title: 'Ordered Collections — Sequences, Slicing & Mutability',
    subtitle: 'Indexing, slicing, in-place mutation, aliasing & immutable tuples',
    lessons: [
      { id: '1.4.1', title: 'Zero-Based Indexing & Negative Offsets', subtitle: 'list offsets 0..n-1 and -1..-n', engine: 'Array' },
      { id: '1.4.2', title: 'Surgical Slicing', subtitle: '[start:stop:step], fencepost cuts, [::-1]', engine: 'InteractiveStringSlicer' },
      { id: '1.4.3', title: 'Dynamic Lists & Mutation', subtitle: '.append, .pop, .insert, .sort() vs sorted()', engine: 'Scrubber' },
      { id: '1.4.4', title: 'The Aliasing Trap (Memory Deep Dive)', subtitle: 'Shared refs b=a, .copy() vs deepcopy', engine: 'PyObjectMemory' },
      { id: '1.4.5', title: 'Tuples & Structural Unpacking', subtitle: 'Immutable tuples, x, y = pt, *rest', engine: 'CodeFill' },
      { id: '1.4.6', title: 'Strings as Immutable Sequences', subtitle: '.split, .join, .strip, ord() & chr()', engine: 'CPythonPipeline' },
    ]
  },
  {
    phaseId: 'phase-py-foundations',
    id: 'm1-5',
    number: 5,
    title: 'Functional Abstraction — Scope, Contracts & Modularity',
    subtitle: 'Functions, signatures, return values, call stack & side effects',
    lessons: [
      { id: '1.5.1', title: 'Black Boxes & Signatures', subtitle: 'def, parameters vs arguments, DRY', engine: 'CodeFill' },
      { id: '1.5.2', title: 'return vs. print (The Classic Trap)', subtitle: 'Return values, implicit None, composition f(g(x))', engine: 'Pipeline' },
      { id: '1.5.3', title: 'The Call Stack & LEGB Scope', subtitle: 'Stack frames, Local/Enclosing/Global/Built-in', engine: 'Scrubber' },
      { id: '1.5.4', title: 'Flexible Interfaces & Mutable Default Traps', subtitle: 'Keyword args, defaults, def f(x=[]) bug', engine: 'BugHunter' },
      { id: '1.5.5', title: 'Pure Functions vs. Side Effects', subtitle: 'Referential transparency, avoiding input mutation', engine: 'BugHunter' },
    ]
  },
  {
    phaseId: 'phase-py-foundations',
    id: 'm1-6',
    number: 6,
    title: 'Associative Data — Hash Maps, Sets & Modeling',
    subtitle: 'Hash lookups, safe retrieval, sets, nested JSON & capstone indexer',
    lessons: [
      { id: '1.6.1', title: 'Why Lists Are Slow at Searching', subtitle: 'O(n) scan vs O(1) hash(key) lookup', engine: 'PerformanceRace' },
      { id: '1.6.2', title: 'Safe Lookups & Frequency Counting', subtitle: 'KeyError, .get(k, 0), .setdefault()', engine: 'CodeFill' },
      { id: '1.6.3', title: 'Iterating & Transforming Dictionaries', subtitle: '.keys(), .values(), .items(), dict merge', engine: 'Pipeline' },
      { id: '1.6.4', title: 'Sets: Uniqueness & Venn Algebra', subtitle: 'set deduplication, O(1) in, |, &, -, ^', engine: 'LogicGate' },
      { id: '1.6.5', title: 'Nested Data Modeling', subtitle: 'Trees of dicts/lists, defensive deep traversal', engine: 'SequenceHighlighter' },
      { id: '1.6.6', title: 'Track 1 Capstone: Mini Search Engine', subtitle: 'Tokenization, inverted set index, ranked scoring', engine: 'Pipeline + CodeChallenge' },
    ]
  },

  // ─── TRACK 2: Data Structures, Algorithms & Complexity (6 Modules, 31 Lessons)
  {
    phaseId: 'phase-py-dsa',
    phaseTitle: 'Track 2: Data Structures, Algorithms & Complexity in Python',
    phaseSubtitle: 'Two Pointers, Linked Lists, Stacks/Queues, Trees, Heaps, Graphs & DP',
    phaseIcon: '⚔️',
    phaseColor: '#059669',
    phaseBadge: 'ALGORITHMS & DSA',
    id: 'm2-1',
    number: 7,
    title: 'Algorithmic Complexity, Arrays & Two-Pointer Paradigms',
    subtitle: 'Big-O intuition, dynamic arrays, two pointers, sliding windows & prefix sums',
    lessons: [
      { id: '2.1.1', title: 'Asymptotic Analysis & Big-O Intuition', subtitle: 'Time/space complexity O(1) to O(2^n)', engine: 'PerformanceRace' },
      { id: '2.1.2', title: 'Dynamic Arrays & Amortized Analysis', subtitle: 'Over-allocation doubling vs O(n) insert(0, x)', engine: 'PyObjectMemory' },
      { id: '2.1.3', title: 'Converging & Parallel Two Pointers', subtitle: 'Left/right inward pointers, sorted 2-sum', engine: 'Array' },
      { id: '2.1.4', title: 'Fixed & Dynamic Sliding Windows', subtitle: 'Expanding R, contracting L, window invariants', engine: 'SequenceHighlighter' },
      { id: '2.1.5', title: 'Prefix Sums & Difference Arrays', subtitle: 'accumulate, O(1) range sum P[j+1]-P[i]', engine: 'Array' },
    ]
  },
  {
    phaseId: 'phase-py-dsa',
    id: 'm2-2',
    number: 8,
    title: 'Linear Structures — Linked Lists, Stacks, Queues & Monotonic Patterns',
    subtitle: 'Node pointers, Floyd cycle detection, LIFO call frames & collections.deque',
    lessons: [
      { id: '2.2.1', title: 'Singly & Doubly Linked Lists', subtitle: 'ListNode(val, next), dummy sentinel, reversal', engine: 'PyObjectMemory' },
      { id: '2.2.2', title: "Fast & Slow Pointers (Floyd's Cycle)", subtitle: 'Tortoise & hare pointers, cycle & middle node', engine: 'PyObjectMemory' },
      { id: '2.2.3', title: 'Stacks & Recursive Call Frames', subtitle: 'LIFO, balanced brackets, RPN evaluation', engine: 'Scrubber' },
      { id: '2.2.4', title: 'Queues, Ring Buffers & collections.deque', subtitle: 'FIFO, O(1) append and popleft', engine: 'PerformanceRace' },
      { id: '2.2.5', title: 'Monotonic Stacks & Monotonic Deques', subtitle: 'Next greater element, sliding window max O(n)', engine: 'Array' },
    ]
  },
  {
    phaseId: 'phase-py-dsa',
    id: 'm2-3',
    number: 9,
    title: 'Searching, Sorting, Hashing Internals & Bit Manipulation',
    subtitle: 'Binary search spaces, divide-and-conquer, hash buckets & bitmask algebra',
    lessons: [
      { id: '2.3.1', title: 'Binary Search on Arrays & Answer Spaces', subtitle: 'bisect, monotonic predicate search [F,F,T,T]', engine: 'Array' },
      { id: '2.3.2', title: 'Divide & Conquer Sorting: Merge, Quick & Timsort', subtitle: 'Two-finger merge, pivot partition, Quickselect', engine: 'Array' },
      { id: '2.3.3', title: 'Hash Tables Under the Hood', subtitle: 'Load factor N/M, open addressing probes, resizing', engine: 'PyObjectMemory' },
      { id: '2.3.4', title: 'Combining Hash Maps + Doubly Linked Lists (LRU Cache)', subtitle: 'O(1) get/put + MRU splice & LRU eviction', engine: 'PyObjectMemory' },
      { id: '2.3.5', title: 'Bitwise Algebra & Bitmasks', subtitle: '&, |, ^ (XOR), <<, >>, n & (n-1)', engine: 'LogicGate' },
    ]
  },
  {
    phaseId: 'phase-py-dsa',
    id: 'm2-4',
    number: 10,
    title: 'Hierarchical Data — Trees, BSTs, Heaps & Tries',
    subtitle: 'DFS/BFS traversals, binary search trees, heapq priority queues & tries',
    lessons: [
      { id: '2.4.1', title: 'Binary Trees & DFS Traversals', subtitle: 'Pre/in/post-order DFS, recursive height & diameter', engine: 'GraphTreeCanvas' },
      { id: '2.4.2', title: 'Level-Order BFS & Tree Serialization', subtitle: 'Queue-driven BFS by depth, serialize/deserialize', engine: 'GraphTreeCanvas' },
      { id: '2.4.3', title: 'Binary Search Trees (BST) & Balance', subtitle: 'BST range invariant (min_val, max_val), skew hazard', engine: 'BugHunter' },
      { id: '2.4.4', title: 'Binary Heaps & Priority Queues (heapq)', subtitle: 'Array-backed heap 2i+1, sift-up/down, Top-K, 2-heap median', engine: 'GraphTreeCanvas' },
      { id: '2.4.5', title: 'Prefix Trees (Tries) & Autocomplete', subtitle: 'TrieNode char maps, is_end, O(L) prefix match', engine: 'GraphTreeCanvas' },
    ]
  },
  {
    phaseId: 'phase-py-dsa',
    id: 'm2-5',
    number: 11,
    title: 'Graph Theory & Network Algorithms',
    subtitle: 'Adjacency graphs, cycle detection, topological sort, Dijkstra & Union-Find',
    lessons: [
      { id: '2.5.1', title: 'Graph Representations: Adjacency Lists & Matrices', subtitle: 'Directed/undirected, weighted, 2D grid graphs', engine: 'GraphTreeCanvas' },
      { id: '2.5.2', title: 'Graph DFS, Connected Components & Cycle Detection', subtitle: 'Visited sets, 3-color cycle detection, island flood-fill', engine: 'GraphTreeCanvas' },
      { id: '2.5.3', title: 'Shortest Paths on Unweighted Graphs (Multi-Source BFS)', subtitle: 'Wavefront expansion, shortest hop distance', engine: 'GraphTreeCanvas' },
      { id: '2.5.4', title: 'Topological Sort & DAG Dependency Resolution', subtitle: "In-degree counters, Kahn's BFS algorithm", engine: 'GraphTreeCanvas' },
      { id: '2.5.5', title: 'Weighted Shortest Paths (Dijkstra & Bellman-Ford)', subtitle: 'heapq greedy edge relaxation d + w < dist[v]', engine: 'GraphTreeCanvas' },
      { id: '2.5.6', title: 'Disjoint Set Union (Union-Find) & MST', subtitle: "Path compression, union by rank, Kruskal's MST", engine: 'GraphTreeCanvas' },
    ]
  },
  {
    phaseId: 'phase-py-dsa',
    id: 'm2-6',
    number: 12,
    title: 'Combinatorial Search, Greedy Paradigms & Dynamic Programming',
    subtitle: 'Backtracking, interval scheduling, 1D/2D dynamic programming & capstone',
    lessons: [
      { id: '2.6.1', title: 'Backtracking & State-Space Pruning', subtitle: 'Choose-Explore-Unchoose, N-Queens pruning', engine: 'GraphTreeCanvas' },
      { id: '2.6.2', title: 'Greedy Algorithms & Interval Scheduling', subtitle: 'Earliest-finish-time sorting vs counterexamples', engine: 'SequenceHighlighter' },
      { id: '2.6.3', title: '1D Dynamic Programming: Memoization vs. Tabulation', subtitle: '@cache top-down vs bottom-up O(n) array', engine: 'Array' },
      { id: '2.6.4', title: '2D Dynamic Programming: Knapsack, Grids & Edit Distance', subtitle: '0/1 Knapsack, LCS, Levenshtein matrix', engine: 'GridHighlighter' },
      { id: '2.6.5', title: 'Track 2 Capstone: High-Speed Route & Autocomplete Engine', subtitle: 'Prefix Trie + Weighted Dijkstra + LRU Cache', engine: 'GraphTreeCanvas + CodeChallenge' },
    ]
  },

  // ─── TRACK 3: Applied Python & SWE Systems (5 Modules, 27 Lessons) ───────────
  {
    phaseId: 'phase-py-applied-swe',
    phaseTitle: 'Track 3: Applied Python & Software Engineering Systems',
    phaseSubtitle: 'Generators, OOP Patterns, Concurrency, SQLite Transactions & Testing',
    phaseIcon: '⚙️',
    phaseColor: '#d97706',
    phaseBadge: 'APPLIED SWE & SYSTEMS',
    id: 'm3-1',
    number: 13,
    title: 'Pythonic Expressiveness — Comprehensions, Generators & Closures',
    subtitle: 'Declarative pipelines, first-class functions, yield streams & decorators',
    lessons: [
      { id: '3.1.1', title: 'Declarative Data Pipelines', subtitle: 'List/dict/set comprehensions, filtering, flattening', engine: 'CodeFill' },
      { id: '3.1.2', title: 'First-Class Functions & Lambdas', subtitle: 'Functions as objects, lambda, multi-criteria sort keys', engine: 'Array' },
      { id: '3.1.3', title: 'Iterators, Generators & Lazy Streams', subtitle: '__iter__, __next__, yield, O(1) RAM streams', engine: 'IteratorProtocol + PerformanceRace' },
      { id: '3.1.4', title: 'Advanced Iteration & itertools', subtitle: 'enumerate, zip, any/all, islice, chain, groupby', engine: 'Pipeline' },
      { id: '3.1.5', title: 'Closures & Function Decorators', subtitle: 'nonlocal cells, @decorator, functools.wraps', engine: 'Pipeline' },
    ]
  },
  {
    phaseId: 'phase-py-applied-swe',
    id: 'm3-2',
    number: 14,
    title: 'Object-Oriented Architecture, SOLID & Design Patterns',
    subtitle: 'Classes, encapsulation, dunder protocols, inheritance & patterns',
    lessons: [
      { id: '3.2.1', title: 'Blueprints, Instances & self Mechanics', subtitle: 'class, __init__, instance vs class attrs', engine: 'PyObjectMemory' },
      { id: '3.2.2', title: 'Encapsulation, Invariants & Descriptors', subtitle: '@property getters/setters, descriptor validation', engine: 'BranchingTrack' },
      { id: '3.2.3', title: 'The Python Data Model (Dunder Protocols)', subtitle: '__repr__, __eq__, __hash__, __len__, __getitem__, __add__', engine: 'CodeFill' },
      { id: '3.2.4', title: 'Inheritance, MRO & Composition', subtitle: 'super(), C3 MRO, abc.ABC, has-a composition', engine: 'Pipeline' },
      { id: '3.2.5', title: 'Modern Dataclasses & Structural Matching', subtitle: '@dataclass(frozen=True, slots=True), Enum, match/case', engine: 'CodeFill' },
      { id: '3.2.6', title: 'SWE Design Patterns in Python', subtitle: 'Strategy, Factory, Observer, Dependency Injection', engine: 'Pipeline' },
    ]
  },
  {
    phaseId: 'phase-py-applied-swe',
    id: 'm3-3',
    number: 15,
    title: 'Defensive Systems — Exceptions, Context Managers & Relational SQLite',
    subtitle: 'Exception hierarchies, resource safety, filesystem streams & ACID transactions',
    lessons: [
      { id: '3.3.1', title: 'Exception Hierarchies & Custom Errors', subtitle: 'try/except/else/finally, raise ... from, custom errors', engine: 'BranchingTrack' },
      { id: '3.3.2', title: 'Context Managers & Resource Safety', subtitle: 'with, __enter__/__exit__, @contextmanager', engine: 'Scrubber' },
      { id: '3.3.3', title: 'Filesystem Engineering & Serialization', subtitle: 'pathlib.Path, streaming CSV/JSONL, schema validation', engine: 'Pipeline' },
      { id: '3.3.4', title: 'Embedded Relational Persistence (sqlite3)', subtitle: 'Parameterized ? queries (anti-SQLi), ACID with conn:', engine: 'BugHunter' },
      { id: '3.3.5', title: 'Structured Logging & CLI Tools', subtitle: 'logging levels/handlers, argparse, POSIX exit codes', engine: 'CodeFill' },
    ]
  },
  {
    phaseId: 'phase-py-applied-swe',
    id: 'm3-4',
    number: 16,
    title: 'Concurrency, Parallelism & Asynchronous Systems',
    subtitle: 'GIL internals, threads & locks, multiprocessing, asyncio & event loop',
    lessons: [
      { id: '3.4.1', title: 'CPU-Bound vs. I/O-Bound & The GIL', subtitle: 'Global Interpreter Lock baton, context switching', engine: 'ConcurrencyTimeline' },
      { id: '3.4.2', title: 'Threads, Race Conditions & Synchronization', subtitle: 'ThreadPoolExecutor, bytecode interleaving, Lock, Queue', engine: 'ConcurrencyTimeline' },
      { id: '3.4.3', title: 'True Parallelism with multiprocessing', subtitle: 'ProcessPoolExecutor, multi-core saturation, pickle IPC', engine: 'PerformanceRace' },
      { id: '3.4.4', title: 'Cooperative Multitasking & The Event Loop', subtitle: 'async def, await suspension points, event loop wheel', engine: 'ConcurrencyTimeline' },
      { id: '3.4.5', title: 'Structured Async Concurrency', subtitle: 'asyncio.gather, TaskGroup, timeouts, Semaphore(10)', engine: 'ConcurrencyTimeline' },
    ]
  },
  {
    phaseId: 'phase-py-applied-swe',
    id: 'm3-5',
    number: 17,
    title: 'Software Craftsmanship — Static Typing, Testing & Internals',
    subtitle: 'Type hints, pytest fixtures, mocks, architecture & memory profiling',
    lessons: [
      { id: '3.5.1', title: 'Static Type Systems & Structural Protocols', subtitle: 'typing, TypeVar, Callable, Protocol duck-typing', engine: 'CodeFill' },
      { id: '3.5.2', title: 'Unit Testing, Fixtures & Parameterization', subtitle: 'Arrange-Act-Assert, boundary tests, mutant killing', engine: 'BugHunter' },
      { id: '3.5.3', title: 'Mocking, Stubbing & Dependency Isolation', subtitle: 'unittest.mock.patch, MagicMock, deterministic clocks', engine: 'Pipeline' },
      { id: '3.5.4', title: 'Packaging, Virtual Environments & Architecture', subtitle: 'pyproject.toml, layered imports, breaking circular imports', engine: 'Pipeline' },
      { id: '3.5.5', title: 'CPython Memory Internals & Profiling', subtitle: 'ob_refcnt, cyclic GC, __slots__, cProfile flamegraph', engine: 'PyObjectMemory' },
      { id: '3.5.6', title: 'Track 3 Capstone: Concurrent Task & Storage Engine', subtitle: 'Asyncio workers + sqlite3 persistence + mocked unit tests', engine: 'ConcurrencyTimeline + CodeChallenge' },
    ]
  },

  // ─── TRACK 4: Data Science, Machine Learning & Deep Learning (5 Modules, 25 Lessons)
  {
    phaseId: 'phase-py-ai-ml',
    phaseTitle: 'Track 4: Data Science, Machine Learning & Deep Learning',
    phaseSubtitle: 'NumPy Vectorization, Classical ML from Scratch, Autograd, CNNs & Transformers',
    phaseIcon: '🧠',
    phaseColor: '#7c3aed',
    phaseBadge: 'AI & DEEP LEARNING',
    id: 'm4-1',
    number: 18,
    title: 'Numerical Computing, Linear Algebra & Vectorization (NumPy)',
    subtitle: 'Contiguous memory, broadcasting, geometric dot products & gradient surfaces',
    lessons: [
      { id: '4.1.1', title: 'Why Python Loops Are Slow & Contiguous Tensors', subtitle: 'PyObject boxes vs contiguous SIMD ndarray, shape, strides', engine: 'PerformanceRace' },
      { id: '4.1.2', title: 'Broadcasting Rules & Boolean Masking', subtitle: 'Singleton dimension alignment, vectorized masks', engine: 'GridHighlighter' },
      { id: '4.1.3', title: 'Linear Algebra as Geometry: Dot Products & Projections', subtitle: 'Matrix mult @, cosine similarity, basis transformations', engine: 'VectorCanvas' },
      { id: '4.1.4', title: 'Probability Distributions, Sampling & Monte Carlo', subtitle: 'Gaussian/uniform sampling, expectation, Bayes simulation', engine: 'PerformanceRace' },
      { id: '4.1.5', title: 'Numerical Calculus & Gradient Landscapes', subtitle: 'Partial derivatives, gradient vectors, learning rate step', engine: 'VectorCanvas' },
    ]
  },
  {
    phaseId: 'phase-py-ai-ml',
    id: 'm4-2',
    number: 19,
    title: 'Data Engineering, Exploratory Analysis & Feature Pipelines',
    subtitle: 'Vectorized cleaning, joins & windowing, statistical signals & scaling',
    lessons: [
      { id: '4.2.1', title: 'Tabular Dataframes, Indexing & Vectorized Cleaning', subtitle: 'Boolean indexing, NaN imputation, type normalization', engine: 'GridHighlighter' },
      { id: '4.2.2', title: 'Relational Joins, Window Functions & GroupBy', subtitle: 'Split-Apply-Combine, inner/left joins, rolling windows', engine: 'Pipeline' },
      { id: '4.2.3', title: 'Statistical Signals, Outliers & Spurious Correlations', subtitle: 'Z-score/IQR clipping, correlation, Simpson\'s paradox', engine: 'VectorCanvas' },
      { id: '4.2.4', title: 'Feature Engineering: Scaling & Categorical Encoding', subtitle: 'Z-score standardization, Min-Max, One-Hot encoding', engine: 'Pipeline' },
      { id: '4.2.5', title: 'Train/Val/Test Splits & The Data Leakage Trap', subtitle: 'Train-only scaler fitting, stratified & temporal splits', engine: 'BugHunter' },
    ]
  },
  {
    phaseId: 'phase-py-ai-ml',
    id: 'm4-3',
    number: 20,
    title: 'Classical Machine Learning — Algorithms From Scratch',
    subtitle: 'Linear regression, logistic classifiers, k-NN/K-Means, trees & boosting',
    lessons: [
      { id: '4.3.1', title: 'Linear Regression & Gradient Descent From Scratch', subtitle: 'MSE loss, vectorized dw/db gradients in NumPy', engine: 'VectorCanvas' },
      { id: '4.3.2', title: 'Logistic Regression, Sigmoids & Cross-Entropy', subtitle: 'Sigmoid 1/(1+e^-z), binary cross-entropy log-loss', engine: 'VectorCanvas' },
      { id: '4.3.3', title: 'Distance Geometry: k-NN & K-Means Clustering', subtitle: 'Pairwise Euclidean distance, Voronoi EM centroid loop', engine: 'VectorCanvas' },
      { id: '4.3.4', title: 'Decision Trees, Entropy & Information Gain', subtitle: 'Shannon entropy, Gini impurity, greedy axis splits', engine: 'VectorCanvas' },
      { id: '4.3.5', title: 'Ensemble Power: Random Forests & Gradient Boosting', subtitle: 'Bagging bootstrap trees vs sequential residual boosting', engine: 'VectorCanvas' },
    ]
  },
  {
    phaseId: 'phase-py-ai-ml',
    id: 'm4-4',
    number: 21,
    title: 'Model Evaluation, Regularization & Production ML',
    subtitle: 'Bias-variance, imbalanced metrics, cross-validation, PCA & drift detection',
    lessons: [
      { id: '4.4.1', title: 'The Bias-Variance Trade-off & Regularization (L1/L2)', subtitle: 'Overfitting, Ridge L2 decay, Lasso L1 feature sparsity', engine: 'VectorCanvas' },
      { id: '4.4.2', title: 'Imbalanced Metrics: Precision, Recall, F1 & ROC-AUC', subtitle: '99% accuracy trap on 1% fraud, Confusion Matrix, threshold tuning', engine: 'SequenceHighlighter' },
      { id: '4.4.3', title: 'Cross-Validation & Hyperparameter Search', subtitle: 'Stratified K-Fold CV, grid/random search', engine: 'GridHighlighter' },
      { id: '4.4.4', title: 'Dimensionality Reduction: PCA & Embeddings', subtitle: 'Covariance matrix, SVD eigenvectors, explained variance', engine: 'VectorCanvas' },
      { id: '4.4.5', title: 'Reproducible ML Pipelines & Model Serialization', subtitle: 'Deterministic inference bundle, schema contract, drift detection', engine: 'Pipeline' },
    ]
  },
  {
    phaseId: 'phase-py-ai-ml',
    id: 'm4-5',
    number: 22,
    title: 'Neural Networks, Deep Learning & Modern AI Architectures',
    subtitle: 'Perceptrons, autograd reverse DAG, optimizers, convolutions & self-attention',
    lessons: [
      { id: '4.5.1', title: 'Perceptrons, Non-Linearity & The XOR Problem', subtitle: 'Hidden layers folding space, ReLU/GELU/Softmax', engine: 'VectorCanvas' },
      { id: '4.5.2', title: 'Computational Graphs & Backpropagation (Micro-Autograd)', subtitle: 'Forward DAG, chain rule backward pass, Value autograd class', engine: 'GraphTreeCanvas' },
      { id: '4.5.3', title: 'Training Deep Networks: Optimizers, BatchNorm & Dropout', subtitle: 'Vanishing/exploding gradients, He init, Momentum & Adam', engine: 'VectorCanvas' },
      { id: '4.5.4', title: 'Spatial & Sequential Inductors: Convolutions & Embeddings', subtitle: '2D sliding conv kernels, max-pooling, token embeddings', engine: 'GridHighlighter' },
      { id: '4.5.5', title: 'Self-Attention, Transformers & Track 4 Capstone', subtitle: 'Scaled dot-product attention softmax(QK^T/sqrt(d_k))V', engine: 'GridHighlighter + CodeChallenge' },
    ]
  },
];

// ─── Build pythonSyllabusContent map for getWeekContent(weekId) ───────────────
export const pythonSyllabusContent = {};

// Register module m1-1 from hand-crafted 5-screen lesson file
pythonSyllabusContent['m1-1'] = m1_1_content;

// Populate remaining modules with structured lesson metadata
RAW_MODULES.forEach((mod) => {
  if (mod.id === 'm1-1') return; // already registered above

  pythonSyllabusContent[mod.id] = {
    id: mod.id,
    title: mod.title,
    subtitle: mod.subtitle,
    lessons: mod.lessons.map((les) => ({
      id: les.id,
      moduleId: mod.id,
      title: les.title,
      subtitle: les.subtitle,
      engine: les.engine,
      duration: '12 min',
      description: `<p><strong>${les.title}</strong>: Master ${les.subtitle.toLowerCase()}.</p>`,
      starterCode: `# ${les.title}\n# Concept: ${les.subtitle}\nprint("Exploring ${les.title}")\n`,
    })),
  };
});

// ─── Group into 4 Career Phases for Catalog & Roadmap ─────────────────────────
const phaseGroups = [
  {
    id: 'phase-py-foundations',
    number: 1,
    title: 'Track 1: Beginner Python Foundations',
    subtitle: 'State, Memory References, Decision Trees, Loops, Slicing, Hash Maps',
    icon: '🐍',
    months: 'Python Foundations',
    weekRange: 'Modules 1–6 (32 Lessons)',
    color: '#2563eb',
    badge: 'FOUNDATIONS',
    modulesCount: 6,
    lessonsCount: 32,
  },
  {
    id: 'phase-py-dsa',
    number: 2,
    title: 'Track 2: Data Structures, Algorithms & Complexity in Python',
    subtitle: 'Two Pointers, Linked Lists, Stacks/Queues, Trees, Heaps, Graphs & DP',
    icon: '⚔️',
    months: 'DSA & Complexity',
    weekRange: 'Modules 7–12 (31 Lessons)',
    color: '#059669',
    badge: 'ALGORITHMS & DSA',
    modulesCount: 6,
    lessonsCount: 31,
  },
  {
    id: 'phase-py-applied-swe',
    number: 3,
    title: 'Track 3: Applied Python & Software Engineering Systems',
    subtitle: 'Generators, OOP Patterns, Concurrency, SQLite Transactions & Testing',
    icon: '⚙️',
    months: 'Applied SWE & Systems',
    weekRange: 'Modules 13–17 (27 Lessons)',
    color: '#d97706',
    badge: 'APPLIED SWE & SYSTEMS',
    modulesCount: 5,
    lessonsCount: 27,
  },
  {
    id: 'phase-py-ai-ml',
    number: 4,
    title: 'Track 4: Data Science, Machine Learning & Deep Learning',
    subtitle: 'NumPy Vectorization, Classical ML from Scratch, Autograd, CNNs & Transformers',
    icon: '🧠',
    months: 'AI & Deep Learning',
    weekRange: 'Modules 18–22 (25 Lessons)',
    color: '#7c3aed',
    badge: 'AI & DEEP LEARNING',
    modulesCount: 5,
    lessonsCount: 25,
  },
];

export const PYTHON_PHASES = phaseGroups.map((group) => {
  const phaseModules = RAW_MODULES.filter((m) => m.phaseId === group.id);
  return {
    ...group,
    weeks: phaseModules.map((m, idx) => {
      const content = pythonSyllabusContent[m.id];
      return {
        id: m.id,
        number: m.number,
        moduleNumber: idx + 1,
        title: m.title,
        subtitle: m.subtitle,
        lessons: content?.lessons || m.lessons,
        exercises: [],
        quiz: [],
        project: false,
      };
    }),
  };
});
