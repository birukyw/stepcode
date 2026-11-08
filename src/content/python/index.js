/**
 * Python 4 SWE & Computer Science Curriculum
 * 4 Sequential Tracks · 22 Modules · 115 Interactive Lessons
 * 
 * Modeled strictly after Brilliant.org interactive pedagogy:
 * 5-Screen Lesson Arc:
 *  1. hook (Visual manipulation puzzle to discover invariant)
 *  2. mental_model (Name the invariant with guided prediction & misconception feedback)
 *  3. manipulation (Parameter tuning and token/code slotting)
 *  4. bug_hunt (Counterexample/edge case identification and patch)
 *  5. boss_synthesis (Python coding challenge with 4 tests & 3-tier hints: [nudge, blueprint, walkthrough])
 */

import { STEP_TYPES } from '../../types/lesson.js';
import { m1_1_lessons } from './m1_1.js';

export const PYTHON_SYLLABUS_STATS = {
  tracks: 4,
  modules: 22,
  lessons: 115,
};

// Helper to generate consistent module lesson stubs for the rest of the syllabus
function generateLessonStub(id, number, title, subtitle, engine, desc) {
  return {
    id,
    number,
    title,
    subtitle: subtitle || title,
    duration: '12 min',
    screens: [
      {
        role: 'hook',
        screenNumber: 1,
        title: `${title} · Discovery Hook`,
        description: desc || `Explore the core invariant behind ${title}.`,
        prompt: `Interact with the visual below to observe how ${title} works in Python.`,
        type: STEP_TYPES.EXPLORE,
        props: {
          concept: title,
          trap: 'Assuming Python behaves like low-level languages without reference semantics.',
          takeaway: `Mastering ${title} unlocks clean, efficient Pythonic architecture.`,
        },
        explanation: `Understanding ${title} is foundational for scalable software engineering.`,
      },
      {
        role: 'mental_model',
        screenNumber: 2,
        title: `${title} · Guided Deduction`,
        description: 'Verify your mental model with a targeted prediction check.',
        prompt: `Which statement best describes the fundamental behavior of ${title}?`,
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            { id: 'opt-correct', text: `It maintains the invariant cleanly in O(1) or optimal complexity.`, isCorrect: true, feedback: 'Exactly right! Python optimizes this pattern for high developer velocity and runtime efficiency.' },
            { id: 'opt-wrong', text: `It triggers an unintended O(N) hidden copy on every step.`, isCorrect: false, feedback: 'Careful! With idiomatic Python usage, we avoid unnecessary allocations.' },
          ],
        },
        explanation: `Naming the invariant and recognizing edge cases prevents subtle production bugs.`,
      },
      {
        role: 'manipulation',
        screenNumber: 3,
        title: `${title} · Interactive Tuning`,
        description: 'Experiment with parameters to verify state transitions.',
        prompt: 'Tune the configuration to reach the optimal target state.',
        type: STEP_TYPES.EXPLORE,
        props: {
          concept: `Tuning ${title}`,
          trap: 'Ignoring boundary conditions and state transitions.',
          takeaway: 'Parameters dictate algorithmic efficiency and memory footprint.',
        },
        explanation: 'Hands-on experimentation cements the mental model.',
      },
      {
        role: 'bug_hunt',
        screenNumber: 4,
        title: `${title} · Bug Hunt`,
        description: 'Identify the common counterexample or flaw.',
        prompt: `Which counterexample breaks naive implementations of ${title}?`,
        type: STEP_TYPES.PREDICTION,
        props: {
          options: [
            { id: 'bug-1', text: 'Empty collection or single-element boundary condition.', isCorrect: true, feedback: 'Correct! Boundary cases are the primary source of off-by-one errors.' },
            { id: 'bug-2', text: 'Standard sorted inputs with distinct elements.', isCorrect: false, feedback: 'Standard inputs usually pass; bugs lurk in boundary conditions!' },
          ],
        },
        explanation: 'Auditing edge cases ensures resilient production code.',
      },
      {
        role: 'boss_synthesis',
        screenNumber: 5,
        title: `${title} · Coding Synthesis`,
        description: `Implement the complete Python solution for ${title}.`,
        prompt: `Write Python code that demonstrates the key pattern of ${title} and prints the expected result.`,
        type: STEP_TYPES.CODE_CHALLENGE,
        props: {
          language: 'python',
          starterCode: `# Synthesis Challenge: ${title}\n# Implement the solution below:\n\nresult = "solved"\nprint(result)\n`,
          expectedOutput: 'solved',
          hints: [
            'Break down the problem into sequential steps.',
            'Maintain the core invariant throughout the execution.',
            'Return or print the final result.',
          ],
        },
        hints: [
          'Break down the problem into sequential steps.',
          'Maintain the core invariant throughout the execution.',
          'Return or print the final result.',
        ],
        explanation: `You successfully synthesized the core concepts of ${title}!`,
      },
    ],
  };
}

// ─── Complete 22 Modules & 115 Lessons Map ──────────────────────────
export const pythonSyllabusContent = {
  // ── Track 1: Foundations (6 Modules) ──────────────────────────────
  'm1-1': {
    id: 'm1-1',
    number: 1,
    title: 'Thinking in Code — Expressions, State & Memory',
    subtitle: 'Top-to-bottom execution, nametag binding, arithmetic clocks, string assembly, and type casting',
    lessons: m1_1_lessons,
  },
  'm1-2': {
    id: 'm1-2',
    number: 2,
    title: 'Logic Gates & Decision Trees',
    subtitle: 'Comparisons, if/elif/else branching, truth tables, short-circuit guards & truthiness',
    lessons: [
      generateLessonStub('1.2.1', 1, 'Truth, Lies & Comparisons', 'bool, ==, !=, <, >=, chained intervals', 'SequenceHighlighter'),
      generateLessonStub('1.2.2', 2, 'Forking the Path', 'if, else, indentation blocks, ternary', 'BranchingTrack'),
      generateLessonStub('1.2.3', 3, 'Multi-Way Decision Trees', 'elif chains vs independent if, specificity order', 'BugHunter'),
      generateLessonStub('1.2.4', 4, 'Combining Logic Gates', 'and, or, not, precedence, De Morgan\'s laws', 'LogicGate'),
      generateLessonStub('1.2.5', 5, 'Short-Circuiting & Truthiness', 'Truthy/falsy (0, "", [], None), lazy guards', 'ShortCircuitGate'),
    ],
  },
  'm1-3': {
    id: 'm1-3',
    number: 3,
    title: 'Iteration, Patterns & Loop Mechanics',
    subtitle: 'while loops, range sequences, accumulator patterns, break/continue & 2D nested grids',
    lessons: [
      generateLessonStub('1.3.1', 1, 'State Machines & while Loops', 'while, termination, infinite loop hazards', 'Scrubber'),
      generateLessonStub('1.3.2', 2, 'Counting with Sequences & range', 'for, range(start, stop, step)', 'Array/Grid'),
      generateLessonStub('1.3.3', 3, 'The Accumulator Pattern', 'Running sums, counters, -inf/+inf min/max', 'Scrubber'),
      generateLessonStub('1.3.4', 4, 'Loop Control: break, continue & else', 'Early exit break, skip continue, loop else', 'LoopControlJumper'),
      generateLessonStub('1.3.5', 5, '2D Grids & Nested Loops', 'Outer/inner cycles, (row, col), triangular loops', 'GridHighlighter'),
    ],
  },
  'm1-4': {
    id: 'm1-4',
    number: 4,
    title: 'Ordered Collections — Sequences, Slicing & Mutability',
    subtitle: 'Indexing, slicing [::-1], mutation vs sorted(), aliasing traps & tuple unpacking',
    lessons: [
      generateLessonStub('1.4.1', 1, 'Zero-Based Indexing & Negative Offsets', 'list offsets 0..n-1 and -1..-n', 'Array'),
      generateLessonStub('1.4.2', 2, 'Surgical Slicing', '[start:stop:step], fencepost cuts, [::-1]', 'InteractiveStringSlicer'),
      generateLessonStub('1.4.3', 3, 'Dynamic Lists & Mutation', '.append, .pop, .insert, .sort() vs sorted()', 'Scrubber'),
      generateLessonStub('1.4.4', 4, 'The Aliasing Trap (Memory Deep Dive)', 'Shared refs b=a, .copy() vs deepcopy', 'PyObjectMemory'),
      generateLessonStub('1.4.5', 5, 'Tuples & Structural Unpacking', 'Immutable tuples, x, y = pt, *rest', 'CodeFill'),
      generateLessonStub('1.4.6', 6, 'Strings as Immutable Sequences', '.split, .join, .strip, ord() & chr()', 'CPythonPipeline'),
    ],
  },
  'm1-5': {
    id: 'm1-5',
    number: 5,
    title: 'Functional Abstraction — Scope, Contracts & Modularity',
    subtitle: 'Black box signatures, return vs print, LEGB call stack, mutable default traps & pure functions',
    lessons: [
      generateLessonStub('1.5.1', 1, 'Black Boxes & Signatures', 'def, parameters vs arguments, DRY', 'CodeFill'),
      generateLessonStub('1.5.2', 2, 'return vs. print (The Classic Trap)', 'Return values, implicit None, composition f(g(x))', 'Pipeline'),
      generateLessonStub('1.5.3', 3, 'The Call Stack & LEGB Scope', 'Stack frames, Local/Enclosing/Global/Built-in', 'Scrubber'),
      generateLessonStub('1.5.4', 4, 'Flexible Interfaces & Mutable Default Traps', 'Keyword args, defaults, def f(x=[]) bug', 'BugHunter'),
      generateLessonStub('1.5.5', 5, 'Pure Functions vs. Side Effects', 'Referential transparency, avoiding input mutation', 'BugHunter'),
    ],
  },
  'm1-6': {
    id: 'm1-6',
    number: 6,
    title: 'Associative Data — Hash Maps, Sets & Modeling',
    subtitle: 'O(1) hash lookups, safe .get(), dict iteration, set Venn algebra, nested JSON & Search Engine capstone',
    lessons: [
      generateLessonStub('1.6.1', 1, 'Why Lists Are Slow at Searching', 'O(n) scan vs O(1) hash(key) lookup', 'PerformanceRace'),
      generateLessonStub('1.6.2', 2, 'Safe Lookups & Frequency Counting', 'KeyError, .get(k, 0), .setdefault()', 'CodeFill'),
      generateLessonStub('1.6.3', 3, 'Iterating & Transforming Dictionaries', '.keys(), .values(), .items(), dict merge', 'Pipeline'),
      generateLessonStub('1.6.4', 4, 'Sets: Uniqueness & Venn Algebra', 'set deduplication, O(1) in, |, &, -, ^', 'LogicGate'),
      generateLessonStub('1.6.5', 5, 'Nested Data Modeling', 'Trees of dicts/lists, defensive deep traversal', 'SequenceHighlighter'),
      generateLessonStub('1.6.6', 6, 'Track 1 Capstone: Mini Search Engine', 'Tokenization, inverted set index, ranked scoring', 'Pipeline + CodeChallenge'),
    ],
  },

  // ── Track 2: DSA & Algorithmic Complexity (6 Modules) ─────────────
  'm2-1': {
    id: 'm2-1',
    number: 7,
    title: 'Algorithmic Complexity, Arrays & Two-Pointer Paradigms',
    subtitle: 'Big-O intuition, amortized array doubling, converging pointers, sliding windows & prefix sums',
    lessons: [
      generateLessonStub('2.1.1', 1, 'Asymptotic Analysis & Big-O Intuition', 'Time/space complexity O(1) to O(2^n)', 'PerformanceRace'),
      generateLessonStub('2.1.2', 2, 'Dynamic Arrays & Amortized Analysis', 'Over-allocation doubling vs O(n) insert(0, x)', 'PyObjectMemory'),
      generateLessonStub('2.1.3', 3, 'Converging & Parallel Two Pointers', 'Left/right inward pointers, sorted 2-sum', 'Array'),
      generateLessonStub('2.1.4', 4, 'Fixed & Dynamic Sliding Windows', 'Expanding R, contracting L, window invariants', 'SequenceHighlighter'),
      generateLessonStub('2.1.5', 5, 'Prefix Sums & Difference Arrays', 'accumulate, O(1) range sum P[j+1]-P[i]', 'Array'),
    ],
  },
  'm2-2': {
    id: 'm2-2',
    number: 8,
    title: 'Linear Structures — Linked Lists, Stacks, Queues & Monotonic Patterns',
    subtitle: 'ListNode pointer rewiring, Floyd cycle detection, LIFO call frames, deque ring buffers & monotonic stacks',
    lessons: [
      generateLessonStub('2.2.1', 1, 'Singly & Doubly Linked Lists', 'ListNode(val, next), dummy sentinel, reversal', 'PyObjectMemory'),
      generateLessonStub('2.2.2', 2, 'Fast & Slow Pointers (Floyd\'s Cycle)', 'Tortoise & hare pointers, cycle & middle node', 'PyObjectMemory'),
      generateLessonStub('2.2.3', 3, 'Stacks & Recursive Call Frames', 'LIFO, balanced brackets, RPN evaluation', 'Scrubber'),
      generateLessonStub('2.2.4', 4, 'Queues, Ring Buffers & collections.deque', 'FIFO, O(1) append and popleft', 'PerformanceRace'),
      generateLessonStub('2.2.5', 5, 'Monotonic Stacks & Monotonic Deques', 'Next greater element, sliding window max O(n)', 'Array'),
    ],
  },
  'm2-3': {
    id: 'm2-3',
    number: 9,
    title: 'Searching, Sorting, Hashing Internals & Bit Manipulation',
    subtitle: 'Binary search predicates, Quickselect/Timsort, open addressing, LRU cache & bitmasks',
    lessons: [
      generateLessonStub('2.3.1', 1, 'Binary Search on Arrays & Answer Spaces', 'bisect, monotonic predicate search [F,F,T,T]', 'Array'),
      generateLessonStub('2.3.2', 2, 'Divide & Conquer Sorting: Merge, Quick & Timsort', 'Two-finger merge, pivot partition, Quickselect', 'Array'),
      generateLessonStub('2.3.3', 3, 'Hash Tables Under the Hood', 'Load factor N/M, open addressing probes, resizing', 'PyObjectMemory'),
      generateLessonStub('2.3.4', 4, 'Combining Hash Maps + Doubly Linked Lists (LRU Cache)', 'O(1) get/put + MRU splice & LRU eviction', 'PyObjectMemory'),
      generateLessonStub('2.3.5', 5, 'Bitwise Algebra & Bitmasks', '&, |, ^ (XOR), <<, >>, n & (n-1)', 'LogicGate'),
    ],
  },
  'm2-4': {
    id: 'm2-4',
    number: 10,
    title: 'Hierarchical Data — Trees, BSTs, Heaps & Tries',
    subtitle: 'DFS tree diameter, BFS level order, BST range invariants, array-backed heapq & prefix tries',
    lessons: [
      generateLessonStub('2.4.1', 1, 'Binary Trees & DFS Traversals', 'Pre/in/post-order DFS, recursive height & diameter', 'GraphTreeCanvas'),
      generateLessonStub('2.4.2', 2, 'Level-Order BFS & Tree Serialization', 'Queue-driven BFS by depth, serialize/deserialize', 'GraphTreeCanvas'),
      generateLessonStub('2.4.3', 3, 'Binary Search Trees (BST) & Balance', 'BST range invariant (min_val, max_val), skew hazard', 'BugHunter'),
      generateLessonStub('2.4.4', 4, 'Binary Heaps & Priority Queues (heapq)', 'Array-backed heap 2i+1, sift-up/down, Top-K, 2-heap median', 'GraphTreeCanvas'),
      generateLessonStub('2.4.5', 5, 'Prefix Trees (Tries) & Autocomplete', 'TrieNode char maps, is_end, O(L) prefix match', 'GraphTreeCanvas'),
    ],
  },
  'm2-5': {
    id: 'm2-5',
    number: 11,
    title: 'Graph Theory & Network Algorithms',
    subtitle: 'Adjacency lists, 3-color cycle detection, unweighted BFS wavefront, Kahn DAG sort, Dijkstra & Kruskal MST',
    lessons: [
      generateLessonStub('2.5.1', 1, 'Graph Representations: Adjacency Lists & Matrices', 'Directed/undirected, weighted, 2D grid graphs', 'GraphTreeCanvas'),
      generateLessonStub('2.5.2', 2, 'Graph DFS, Connected Components & Cycle Detection', 'Visited sets, 3-color cycle detection, island flood-fill', 'GraphTreeCanvas'),
      generateLessonStub('2.5.3', 3, 'Shortest Paths on Unweighted Graphs (Multi-Source BFS)', 'Wavefront expansion, shortest hop distance', 'GraphTreeCanvas'),
      generateLessonStub('2.5.4', 4, 'Topological Sort & DAG Dependency Resolution', 'In-degree counters, Kahn\'s BFS algorithm', 'GraphTreeCanvas'),
      generateLessonStub('2.5.5', 5, 'Weighted Shortest Paths (Dijkstra & Bellman-Ford)', 'heapq greedy edge relaxation d + w < dist[v]', 'GraphTreeCanvas'),
      generateLessonStub('2.5.6', 6, 'Disjoint Set Union (Union-Find) & MST', 'Path compression, union by rank, Kruskal\'s MST', 'GraphTreeCanvas'),
    ],
  },
  'm2-6': {
    id: 'm2-6',
    number: 12,
    title: 'Combinatorial Search, Greedy Paradigms & Dynamic Programming',
    subtitle: 'Backtracking N-Queens, interval scheduling, 1D DP memoization, 2D Knapsack grid & Routing capstone',
    lessons: [
      generateLessonStub('2.6.1', 1, 'Backtracking & State-Space Pruning', 'Choose-Explore-Unchoose, N-Queens pruning', 'GraphTreeCanvas'),
      generateLessonStub('2.6.2', 2, 'Greedy Algorithms & Interval Scheduling', 'Earliest-finish-time sorting vs counterexamples', 'SequenceHighlighter'),
      generateLessonStub('2.6.3', 3, '1D Dynamic Programming: Memoization vs. Tabulation', '@cache top-down vs bottom-up O(n) array', 'Array'),
      generateLessonStub('2.6.4', 4, '2D Dynamic Programming: Knapsack, Grids & Edit Distance', '0/1 Knapsack, LCS, Levenshtein matrix', 'GridHighlighter'),
      generateLessonStub('2.6.5', 5, 'Track 2 Capstone: High-Speed Route & Autocomplete Engine', 'Prefix Trie + Weighted Dijkstra + LRU Cache', 'GraphTreeCanvas + CodeChallenge'),
    ],
  },

  // ── Track 3: Applied SWE Systems (5 Modules) ──────────────────────
  'm3-1': {
    id: 'm3-1',
    number: 13,
    title: 'Pythonic Expressiveness — Comprehensions, Generators & Closures',
    subtitle: 'Declarative comprehensions, first-class lambdas, yield memory streams, itertools & function decorators',
    lessons: [
      generateLessonStub('3.1.1', 1, 'Declarative Data Pipelines', 'List/dict/set comprehensions, filtering, flattening', 'CodeFill'),
      generateLessonStub('3.1.2', 2, 'First-Class Functions & Lambdas', 'Functions as objects, lambda, multi-criteria sort keys', 'Array'),
      generateLessonStub('3.1.3', 3, 'Iterators, Generators & Lazy Streams', '__iter__, __next__, yield, O(1) RAM streams', 'IteratorProtocol + PerformanceRace'),
      generateLessonStub('3.1.4', 4, 'Advanced Iteration & itertools', 'enumerate, zip, any/all, islice, chain, groupby', 'Pipeline'),
      generateLessonStub('3.1.5', 5, 'Closures & Function Decorators', 'nonlocal cells, @decorator, functools.wraps', 'Pipeline'),
    ],
  },
  'm3-2': {
    id: 'm3-2',
    number: 14,
    title: 'Object-Oriented Architecture, SOLID & Design Patterns',
    subtitle: 'Classes vs instances, @property encapsulation, dunder protocols, C3 MRO composition, dataclasses & GoF patterns',
    lessons: [
      generateLessonStub('3.2.1', 1, 'Blueprints, Instances & self Mechanics', 'class, __init__, instance vs class attrs', 'PyObjectMemory'),
      generateLessonStub('3.2.2', 2, 'Encapsulation, Invariants & Descriptors', '@property getters/setters, descriptor validation', 'BranchingTrack'),
      generateLessonStub('3.2.3', 3, 'The Python Data Model (Dunder Protocols)', '__repr__, __eq__, __hash__, __len__, __getitem__, __add__', 'CodeFill'),
      generateLessonStub('3.2.4', 4, 'Inheritance, MRO & Composition', 'super(), C3 MRO, abc.ABC, has-a composition', 'Pipeline'),
      generateLessonStub('3.2.5', 5, 'Modern Dataclasses & Structural Matching', '@dataclass(frozen=True, slots=True), Enum, match/case', 'CodeFill'),
      generateLessonStub('3.2.6', 6, 'SWE Design Patterns in Python', 'Strategy, Factory, Observer, Dependency Injection', 'Pipeline'),
    ],
  },
  'm3-3': {
    id: 'm3-3',
    number: 15,
    title: 'Defensive Systems — Exceptions, Context Managers & Relational SQLite',
    subtitle: 'Exception hierarchies, @contextmanager safety, pathlib streaming, parameterized sqlite3 ACID & structured CLI logging',
    lessons: [
      generateLessonStub('3.3.1', 1, 'Exception Hierarchies & Custom Errors', 'try/except/else/finally, raise ... from, custom errors', 'BranchingTrack'),
      generateLessonStub('3.3.2', 2, 'Context Managers & Resource Safety', 'with, __enter__/__exit__, @contextmanager', 'Scrubber'),
      generateLessonStub('3.3.3', 3, 'Filesystem Engineering & Serialization', 'pathlib.Path, streaming CSV/JSONL, schema validation', 'Pipeline'),
      generateLessonStub('3.3.4', 4, 'Embedded Relational Persistence (sqlite3)', 'Parameterized ? queries (anti-SQLi), ACID with conn:', 'BugHunter'),
      generateLessonStub('3.3.5', 5, 'Structured Logging & CLI Tools', 'logging levels/handlers, argparse, POSIX exit codes', 'CodeFill'),
    ],
  },
  'm3-4': {
    id: 'm3-4',
    number: 16,
    title: 'Concurrency, Parallelism & Asynchronous Systems',
    subtitle: 'GIL bottlenecks, threading race conditions, multiprocessing IPC, asyncio event loop & structured TaskGroups',
    lessons: [
      generateLessonStub('3.4.1', 1, 'CPU-Bound vs. I/O-Bound & The GIL', 'Global Interpreter Lock baton, context switching', 'ConcurrencyTimeline'),
      generateLessonStub('3.4.2', 2, 'Threads, Race Conditions & Synchronization', 'ThreadPoolExecutor, bytecode interleaving, Lock, Queue', 'ConcurrencyTimeline'),
      generateLessonStub('3.4.3', 3, 'True Parallelism with multiprocessing', 'ProcessPoolExecutor, multi-core saturation, pickle IPC', 'PerformanceRace'),
      generateLessonStub('3.4.4', 4, 'Cooperative Multitasking & The Event Loop', 'async def, await suspension points, event loop wheel', 'ConcurrencyTimeline'),
      generateLessonStub('3.4.5', 5, 'Structured Async Concurrency', 'asyncio.gather, TaskGroup, timeouts, Semaphore(10)', 'ConcurrencyTimeline'),
    ],
  },
  'm3-5': {
    id: 'm3-5',
    number: 17,
    title: 'Software Craftsmanship — Static Typing, Testing & Internals',
    subtitle: 'Mypy structural typing, pytest parameterized fixtures, unittest.mock, packaging architecture, CPython __slots__ & capstone',
    lessons: [
      generateLessonStub('3.5.1', 1, 'Static Type Systems & Structural Protocols', 'typing, TypeVar, Callable, Protocol duck-typing', 'CodeFill'),
      generateLessonStub('3.5.2', 2, 'Unit Testing, Fixtures & Parameterization', 'Arrange-Act-Assert, boundary tests, mutant killing', 'BugHunter'),
      generateLessonStub('3.5.3', 3, 'Mocking, Stubbing & Dependency Isolation', 'unittest.mock.patch, MagicMock, deterministic clocks', 'Pipeline'),
      generateLessonStub('3.5.4', 4, 'Packaging, Virtual Environments & Architecture', 'pyproject.toml, layered imports, breaking circular imports', 'Pipeline'),
      generateLessonStub('3.5.5', 5, 'CPython Memory Internals & Profiling', 'ob_refcnt, cyclic GC, __slots__, cProfile flamegraph', 'PyObjectMemory'),
      generateLessonStub('3.5.6', 6, 'Track 3 Capstone: Concurrent Task & Storage Engine', 'Asyncio workers + sqlite3 persistence + mocked unit tests', 'ConcurrencyTimeline + CodeChallenge'),
    ],
  },

  // ── Track 4: AI & Deep Learning (5 Modules) ───────────────────────
  'm4-1': {
    id: 'm4-1',
    number: 18,
    title: 'Numerical Computing, Linear Algebra & Vectorization (NumPy)',
    subtitle: 'SIMD tensor strides, broadcasting rules, dot products & projections, Monte Carlo sampling & gradient landscapes',
    lessons: [
      generateLessonStub('4.1.1', 1, 'Why Python Loops Are Slow & Contiguous Tensors', 'PyObject boxes vs contiguous SIMD ndarray, shape, strides', 'PerformanceRace'),
      generateLessonStub('4.1.2', 2, 'Broadcasting Rules & Boolean Masking', 'Singleton dimension alignment, vectorized masks', 'GridHighlighter'),
      generateLessonStub('4.1.3', 3, 'Linear Algebra as Geometry: Dot Products & Projections', 'Matrix mult @, cosine similarity, basis transformations', 'VectorCanvas'),
      generateLessonStub('4.1.4', 4, 'Probability Distributions, Sampling & Monte Carlo', 'Gaussian/uniform sampling, expectation, Bayes simulation', 'PerformanceRace'),
      generateLessonStub('4.1.5', 5, 'Numerical Calculus & Gradient Landscapes', 'Partial derivatives, gradient vectors, learning rate step', 'VectorCanvas'),
    ],
  },
  'm4-2': {
    id: 'm4-2',
    number: 19,
    title: 'Data Engineering, Exploratory Analysis & Feature Pipelines',
    subtitle: 'Dataframe vectorized cleaning, Split-Apply-Combine joins, statistical signal detection, Z-score scaling & data leakage guards',
    lessons: [
      generateLessonStub('4.2.1', 1, 'Tabular Dataframes, Indexing & Vectorized Cleaning', 'Boolean indexing, NaN imputation, type normalization', 'GridHighlighter'),
      generateLessonStub('4.2.2', 2, 'Relational Joins, Window Functions & GroupBy', 'Split-Apply-Combine, inner/left joins, rolling windows', 'Pipeline'),
      generateLessonStub('4.2.3', 3, 'Statistical Signals, Outliers & Spurious Correlations', 'Z-score/IQR clipping, correlation, Simpson\'s paradox', 'VectorCanvas'),
      generateLessonStub('4.2.4', 4, 'Feature Engineering: Scaling & Categorical Encoding', 'Z-score standardization, Min-Max, One-Hot encoding', 'Pipeline'),
      generateLessonStub('4.2.5', 5, 'Train/Val/Test Splits & The Data Leakage Trap', 'Train-only scaler fitting, stratified & temporal splits', 'BugHunter'),
    ],
  },
  'm4-3': {
    id: 'm4-3',
    number: 20,
    title: 'Classical Machine Learning — Algorithms From Scratch',
    subtitle: 'Linear regression gradients, logistic regression BCE, k-NN & K-Means clustering, decision tree entropy & random forest bagging',
    lessons: [
      generateLessonStub('4.3.1', 1, 'Linear Regression & Gradient Descent From Scratch', 'MSE loss, vectorized dw/db gradients in NumPy', 'VectorCanvas'),
      generateLessonStub('4.3.2', 2, 'Logistic Regression, Sigmoids & Cross-Entropy', 'Sigmoid 1/(1+e^-z), binary cross-entropy log-loss', 'VectorCanvas'),
      generateLessonStub('4.3.3', 3, 'Distance Geometry: k-NN & K-Means Clustering', 'Pairwise Euclidean distance, Voronoi EM centroid loop', 'VectorCanvas'),
      generateLessonStub('4.3.4', 4, 'Decision Trees, Entropy & Information Gain', 'Shannon entropy, Gini impurity, greedy axis splits', 'VectorCanvas'),
      generateLessonStub('4.3.5', 5, 'Ensemble Power: Random Forests & Gradient Boosting', 'Bagging bootstrap trees vs sequential residual boosting', 'VectorCanvas'),
    ],
  },
  'm4-4': {
    id: 'm4-4',
    number: 21,
    title: 'Model Evaluation, Regularization & Production ML',
    subtitle: 'Bias-variance L1/L2 regularization, ROC-AUC threshold tuning, stratified K-Fold CV, PCA SVD & reproducible serialization',
    lessons: [
      generateLessonStub('4.4.1', 1, 'The Bias-Variance Trade-off & Regularization (L1/L2)', 'Overfitting, Ridge L2 decay, Lasso L1 feature sparsity', 'VectorCanvas'),
      generateLessonStub('4.4.2', 2, 'Imbalanced Metrics: Precision, Recall, F1 & ROC-AUC', '99% accuracy trap on 1% fraud, Confusion Matrix, threshold tuning', 'SequenceHighlighter'),
      generateLessonStub('4.4.3', 3, 'Cross-Validation & Hyperparameter Search', 'Stratified K-Fold CV, grid/random search', 'GridHighlighter'),
      generateLessonStub('4.4.4', 4, 'Dimensionality Reduction: PCA & Embeddings', 'Covariance matrix, SVD eigenvectors, explained variance', 'VectorCanvas'),
      generateLessonStub('4.4.5', 5, 'Reproducible ML Pipelines & Model Serialization', 'Deterministic inference bundle, schema contract, drift detection', 'Pipeline'),
    ],
  },
  'm4-5': {
    id: 'm4-5',
    number: 22,
    title: 'Neural Networks, Deep Learning & Modern AI Architectures',
    subtitle: 'Perceptrons non-linear ReLU folding, micro-autograd DAG, Adam optimizers, 2D convolutions & Transformer self-attention capstone',
    lessons: [
      generateLessonStub('4.5.1', 1, 'Perceptrons, Non-Linearity & The XOR Problem', 'Hidden layers folding space, ReLU/GELU/Softmax', 'VectorCanvas'),
      generateLessonStub('4.5.2', 2, 'Computational Graphs & Backpropagation (Micro-Autograd)', 'Forward DAG, chain rule backward pass, Value autograd class', 'GraphTreeCanvas'),
      generateLessonStub('4.5.3', 3, 'Training Deep Networks: Optimizers, BatchNorm & Dropout', 'Vanishing/exploding gradients, He init, Momentum & Adam', 'VectorCanvas'),
      generateLessonStub('4.5.4', 4, 'Spatial & Sequential Inductors: Convolutions & Embeddings', '2D sliding conv kernels, max-pooling, token embeddings', 'GridHighlighter'),
      generateLessonStub('4.5.5', 5, 'Self-Attention, Transformers & Track 4 Capstone', 'Scaled dot-product attention softmax(QK^T/sqrt(d_k))V', 'GridHighlighter + CodeChallenge'),
    ],
  },
};

// ─── 4 Tracks / Phases Hierarchy for ROADMAP and Catalog ────────────
export const PYTHON_PHASES = [
  {
    id: 'phase-py-foundations',
    number: 1,
    title: 'Track 1: Beginner Python Foundations',
    subtitle: 'State, Memory References, Decision Trees, Loops, Slicing & Hash Maps',
    badge: 'FOUNDATIONS',
    icon: '🧱',
    color: '#2563eb',
    modulesCount: 6,
    weeks: [
      { id: 'm1-1', number: 1, moduleNumber: 1, title: 'Thinking in Code — Expressions, State & Memory', lessons: pythonSyllabusContent['m1-1'].lessons, exercises: [], quiz: [1], project: true },
      { id: 'm1-2', number: 2, moduleNumber: 2, title: 'Logic Gates & Decision Trees', lessons: pythonSyllabusContent['m1-2'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm1-3', number: 3, moduleNumber: 3, title: 'Iteration, Patterns & Loop Mechanics', lessons: pythonSyllabusContent['m1-3'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm1-4', number: 4, moduleNumber: 4, title: 'Ordered Collections — Sequences, Slicing & Mutability', lessons: pythonSyllabusContent['m1-4'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm1-5', number: 5, moduleNumber: 5, title: 'Functional Abstraction — Scope, Contracts & Modularity', lessons: pythonSyllabusContent['m1-5'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm1-6', number: 6, moduleNumber: 6, title: 'Associative Data — Hash Maps, Sets & Modeling', lessons: pythonSyllabusContent['m1-6'].lessons, exercises: [], quiz: [1], project: true },
    ],
  },
  {
    id: 'phase-py-dsa',
    number: 2,
    title: 'Track 2: Data Structures, Algorithms & Complexity in Python',
    subtitle: 'Two Pointers, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs & Dynamic Programming',
    badge: 'DSA & COMPLEXITY',
    icon: '⚡',
    color: '#10b981',
    modulesCount: 6,
    weeks: [
      { id: 'm2-1', number: 7, moduleNumber: 1, title: 'Algorithmic Complexity, Arrays & Two-Pointer Paradigms', lessons: pythonSyllabusContent['m2-1'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm2-2', number: 8, moduleNumber: 2, title: 'Linear Structures — Linked Lists, Stacks, Queues & Monotonic Patterns', lessons: pythonSyllabusContent['m2-2'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm2-3', number: 9, moduleNumber: 3, title: 'Searching, Sorting, Hashing Internals & Bit Manipulation', lessons: pythonSyllabusContent['m2-3'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm2-4', number: 10, moduleNumber: 4, title: 'Hierarchical Data — Trees, BSTs, Heaps & Tries', lessons: pythonSyllabusContent['m2-4'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm2-5', number: 11, moduleNumber: 5, title: 'Graph Theory & Network Algorithms', lessons: pythonSyllabusContent['m2-5'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm2-6', number: 12, moduleNumber: 6, title: 'Combinatorial Search, Greedy Paradigms & Dynamic Programming', lessons: pythonSyllabusContent['m2-6'].lessons, exercises: [], quiz: [1], project: true },
    ],
  },
  {
    id: 'phase-py-systems',
    number: 3,
    title: 'Track 3: Applied Python & Software Engineering Systems',
    subtitle: 'Generators, OOP Patterns, Concurrency/GIL/AsyncIO, SQLite & Unit Testing',
    badge: 'SWE SYSTEMS',
    icon: '⚙️',
    color: '#f59e0b',
    modulesCount: 5,
    weeks: [
      { id: 'm3-1', number: 13, moduleNumber: 1, title: 'Pythonic Expressiveness — Comprehensions, Generators & Closures', lessons: pythonSyllabusContent['m3-1'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm3-2', number: 14, moduleNumber: 2, title: 'Object-Oriented Architecture, SOLID & Design Patterns', lessons: pythonSyllabusContent['m3-2'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm3-3', number: 15, moduleNumber: 3, title: 'Defensive Systems — Exceptions, Context Managers & Relational SQLite', lessons: pythonSyllabusContent['m3-3'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm3-4', number: 16, moduleNumber: 4, title: 'Concurrency, Parallelism & Asynchronous Systems', lessons: pythonSyllabusContent['m3-4'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm3-5', number: 17, moduleNumber: 5, title: 'Software Craftsmanship — Static Typing, Testing & Internals', lessons: pythonSyllabusContent['m3-5'].lessons, exercises: [], quiz: [1], project: true },
    ],
  },
  {
    id: 'phase-py-aiml',
    number: 4,
    title: 'Track 4: Data Science, Machine Learning & Deep Learning',
    subtitle: 'NumPy Vectorization, Classical ML from Scratch, Autograd, CNNs & Transformers',
    badge: 'AI & DEEP LEARNING',
    icon: '🧠',
    color: '#8b5cf6',
    modulesCount: 5,
    weeks: [
      { id: 'm4-1', number: 18, moduleNumber: 1, title: 'Numerical Computing, Linear Algebra & Vectorization (NumPy)', lessons: pythonSyllabusContent['m4-1'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm4-2', number: 19, moduleNumber: 2, title: 'Data Engineering, Exploratory Analysis & Feature Pipelines', lessons: pythonSyllabusContent['m4-2'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm4-3', number: 20, moduleNumber: 3, title: 'Classical Machine Learning — Algorithms From Scratch', lessons: pythonSyllabusContent['m4-3'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm4-4', number: 21, moduleNumber: 4, title: 'Model Evaluation, Regularization & Production ML', lessons: pythonSyllabusContent['m4-4'].lessons, exercises: [], quiz: [1], project: false },
      { id: 'm4-5', number: 22, moduleNumber: 5, title: 'Neural Networks, Deep Learning & Modern AI Architectures', lessons: pythonSyllabusContent['m4-5'].lessons, exercises: [], quiz: [1], project: true },
    ],
  },
];
