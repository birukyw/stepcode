# 🚨 STRICT TOKEN & FILE IGNORE RULES (DO NOT VIOLATE)
1. NEVER read, cat, head, tail, or grep inside these giant legacy files:
   - `src/data/lessons/webTrack.js`
   - `src/data/lessons/pythonTrack.js`
   - `src/data/interactiveLessonsLibrary.js`
   - `new.css`, `indexbygemini.css`, `src/App.classic.jsx`
   - `node_modules/`, `package-lock.json`, `dist/`
2. Do NOT scan the repository folders to explore. Read `TASK_CONTEXT.md` for the complete repo map and widget summary.
3. Only read the specific 1–4 files you are actively editing in the current prompt.

---

# CODEQUEST / STEPCODE ARCHITECTURE & CODING MANIFESTO

## 1. What We Are Building
CodeQuest is an interactive Software Engineering and Computer Science learning platform modeled after Brilliant.org.
- **Pedagogical Rule:** Puzzle first, syntax second. No walls of text. Constrained visual manipulation before raw typing.
- **Visual Design:** Modern Brilliant.org style (crisp 1px borders `#e2e8f0`, slate text `#0f172a`, accent colors `#2563eb` and `#d97706`). Zero retro pixel-art CSS, zero arcade game fonts.

## 2. Curriculum Architecture (Pure SWE Focus — 4 Tracks, 22 Modules, 115 Lessons)
The Python syllabus is organized strictly in this sequence:
1. **Track 1: Beginner Python Foundations** (State, Memory References, Decision Trees, Loops, Slicing, Hash Maps)
2. **Track 2: Data Structures, Algorithms & Complexity** (Two Pointers, Linked Lists, Stacks/Queues, Trees, Heaps, Graphs, Dynamic Programming)
3. **Track 3: Applied Python & SWE Systems** (Generators, OOP Patterns, Concurrency/GIL/AsyncIO, SQLite Transactions, Unit Testing)
4. **Track 4: Machine Learning & Deep Learning** (NumPy Vectorization, Classical ML from Scratch, Autograd, CNNs, Transformers)

## 3. Widget Compatibility & Engines
- Reuse existing widgets in `src/components/widgets/*.jsx` and keep the `{ props, isSubmitted, onValidationChange }` widget contract.
- Map the 10 conceptual engines (`TimelineScrubber`, `MemoryPointerCanvas`, `LogicTrackSwitcher`, `SequenceGridHighlighter`, `TokenSlotBuilder`, `PipelineComposer`, `PerformanceRace`, `AdversarialBugHunter`, `ConcurrencyTimeline`, `GraphTreeVectorCanvas`) to our existing widgets first, and only add new widget components when needed.

## 4. Lesson Schema & 5-Screen Arc
Every lesson file in `src/content/python/` exports a lesson object with `screens` (an array of 5 sequential screen objects):
- **Screen 1 (`hook`):** Visual manipulation puzzle to discover the invariant (max 60 words).
- **Screen 2 (`mental_model`):** Name the invariant with a guided prediction check and targeted misconception feedback (max 75 words).
- **Screen 3 (`manipulation`):** Parameter tuning and token/code slotting.
- **Screen 4 (`bug_hunt`):** Identify the counterexample/edge case, then patch the flawed line.
- **Screen 5 (`boss_synthesis`):** Real Python coding challenge (`CodeChallengeWidget`) with 4 test cases and a 3-tier progressive hint array (`hints: [nudge, blueprint, walkthrough]`).

## 5. Tech Stack & Working Rules for Claude
- **Plain JavaScript / JSX only (`.js`, `.jsx`)** — do NOT use TypeScript.
- **Plain CSS in `src/index.css` only** — do NOT install Tailwind.
- Check `TASK_CONTEXT.md` before creating duplicate components.
- Store new Python course modules and lessons under `src/content/python/`.

# COMPLETE 4-TRACK PYTHON SWE SYLLABUS & WIDGET MAP (115 LESSONS)
Order: Track 1 (Foundations) -> Track 2 (DSA) -> Track 3 (Applied SWE) -> Track 4 (AI & ML)

## TRACK 1: Beginner Python Foundations (6 Modules, 32 Lessons)
### Module m1-1: Thinking in Code — Expressions, State & Memory
- 1.1.1 | The Sequential Machine | Top-to-bottom execution, expressions, print() | Engine: Scrubber + SortOrder (reorder robot movement & print cards)
- 1.1.2 | Variables Are Labels, Not Boxes | Name binding, object id(), reassignment | Engine: PyObjectMemory (stack labels score, bonus -> heap objects 10, 25)
- 1.1.3 | Arithmetic & Modular Clocks | int, float, //, %, ** | Engine: CodeFill + Slider (24-hr clock dial converting 197 mins via // and %)
- 1.1.4 | Strings & Pattern Assembly | Literals, +, *, f-strings {} | Engine: CodeFill (live boarding pass preview with "=" * 20 border)
- 1.1.5 | Shape-Shifting Types & Input | type(), int(), float(), str(), input() | Engine: TypeCasting (fix "15" + "20" -> "1520" checkout bug)

### Module m1-2: Logic Gates & Decision Trees
- 1.2.1 | Truth, Lies & Comparisons | bool, ==, !=, <, >=, chained intervals | Engine: SequenceHighlighter (light up half-open interval [30, 75) on number line)
- 1.2.2 | Forking the Path | if, else, indentation blocks, ternary | Engine: BranchingTrack (route weighted packages at conveyor junction)
- 1.2.3 | Multi-Way Decision Trees | elif chains vs independent if, specificity order | Engine: BugHunter (fix loot-tier classifier where >=50 shadows >=90)
- 1.2.4 | Combining Logic Gates | and, or, not, precedence, De Morgan's laws | Engine: LogicGate (wire 3 sensor toggles to match 8-row truth table)
- 1.2.5 | Short-Circuiting & Truthiness | Truthy/falsy (0, "", [], None), lazy guards | Engine: ShortCircuitGate (guard empty list [] before items[0] crashes)

### Module m1-3: Iteration, Patterns & Loop Mechanics
- 1.3.1 | State Machines & while Loops | while, termination, infinite loop hazards | Engine: Scrubber (rocket fuel trace + fix infinite loop update)
- 1.3.2 | Counting with Sequences & range | for, range(start, stop, step) | Engine: Array/Grid (dial start, stop, step to light up target bridge tiles)
- 1.3.3 | The Accumulator Pattern | Running sums, counters, -inf/+inf min/max | Engine: Scrubber (fix max_temp=0 bug on sub-zero arctic stream using -inf)
- 1.3.4 | Loop Control: break, continue & else | Early exit break, skip continue, loop else | Engine: LoopControlJumper (skip negative readings, break on match, else on miss)
- 1.3.5 | 2D Grids & Nested Loops | Outer/inner cycles, (row, col), triangular loops | Engine: GridHighlighter (5x5 LED matrix upper-triangular & diagonal patterns)

### Module m1-4: Ordered Collections — Sequences, Slicing & Mutability
- 1.4.1 | Zero-Based Indexing & Negative Offsets | list offsets 0..n-1 and -1..-n | Engine: Array (target tail cargo cars across variable-length trains)
- 1.4.2 | Surgical Slicing | [start:stop:step], fencepost cuts, [::-1] | Engine: InteractiveStringSlicer (extract cipher key every 3rd char in reverse [::-3])
- 1.4.3 | Dynamic Lists & Mutation | .append, .pop, .insert, .sort() vs sorted() | Engine: Scrubber (fix list.sort() returning None trap + sequence triage mutations)
- 1.4.4 | The Aliasing Trap (Memory Deep Dive) | Shared refs b=a, .copy() vs deepcopy | Engine: PyObjectMemory (sever shared inventory list reference between two players)
- 1.4.5 | Tuples & Structural Unpacking | Immutable tuples, x, y = pt, *rest | Engine: CodeFill (unpack telemetry ts, *coords, status and swap a, b = b, a)
- 1.4.6 | Strings as Immutable Sequences | .split, .join, .strip, ord() & chr() | Engine: CPythonPipeline (chain .strip().split(",") and "-".join() without += loops)

### Module m1-5: Functional Abstraction — Scope, Contracts & Modularity
- 1.5.1 | Black Boxes & Signatures | def, parameters vs arguments, DRY | Engine: CodeFill (extract 3 repeated damage blocks into parameterized function)
- 1.5.2 | return vs. print (The Classic Trap) | Return values, implicit None, composition f(g(x)) | Engine: Pipeline (fix print() sending None into next function pipe)
- 1.5.3 | The Call Stack & LEGB Scope | Stack frames, Local/Enclosing/Global/Built-in | Engine: Scrubber (trace call stack tower frames and variable lifetime)
- 1.5.4 | Flexible Interfaces & Mutable Default Traps | Keyword args, defaults, def f(x=[]) bug | Engine: BugHunter (trigger shared default list bug across 2 calls, fix with None)
- 1.5.5 | Pure Functions vs. Side Effects | Referential transparency, avoiding input mutation | Engine: BugHunter (stop helper from mutating caller's master tournament list)

### Module m1-6: Associative Data — Hash Maps, Sets & Modeling
- 1.6.1 | Why Lists Are Slow at Searching | O(n) scan vs O(1) hash(key) lookup | Engine: PerformanceRace (10k item list scan vs dict hash jump + hashability)
- 1.6.2 | Safe Lookups & Frequency Counting | KeyError, .get(k, 0), .setdefault() | Engine: CodeFill (prevent KeyError on live token stream histogram)
- 1.6.3 | Iterating & Transforming Dictionaries | .keys(), .values(), .items(), dict merge | Engine: Pipeline (unpack .items() to invert map and merge configs with |)
- 1.6.4 | Sets: Uniqueness & Venn Algebra | set deduplication, O(1) in, |, &, -, ^ | Engine: LogicGate (3-circle Venn diagram cohort isolation)
- 1.6.5 | Nested Data Modeling | Trees of dicts/lists, defensive deep traversal | Engine: SequenceHighlighter (traverse collapsible JSON hierarchy safely)
- 1.6.6 | Track 1 Capstone: Mini Search Engine | Tokenization, inverted set index, ranked scoring | Engine: Pipeline + CodeChallenge (build multi-keyword search engine)

---

## TRACK 2: Data Structures, Algorithms & Complexity in Python (6 Modules, 31 Lessons)
### Module m2-1: Algorithmic Complexity, Arrays & Two-Pointer Paradigms
- 2.1.1 | Asymptotic Analysis & Big-O Intuition | Time/space complexity O(1) to O(2^n) | Engine: PerformanceRace (eliminate hidden O(n) inside loops to beat 100ms SLA)
- 2.1.2 | Dynamic Arrays & Amortized Analysis | Over-allocation doubling vs O(n) insert(0, x) | Engine: PyObjectMemory (compare 1,000 appends vs 1,000 front-inserts)
- 2.1.3 | Converging & Parallel Two Pointers | Left/right inward pointers, sorted 2-sum | Engine: Array (step L and R inward on sorted array in O(n) time)
- 2.1.4 | Fixed & Dynamic Sliding Windows | Expanding R, contracting L, window invariants | Engine: SequenceHighlighter (elastic window for longest unique substring)
- 2.1.5 | Prefix Sums & Difference Arrays | accumulate, O(1) range sum P[j+1]-P[i] | Engine: Array (dual-tape raw vs prefix array + prefix hash map subarray count)

### Module m2-2: Linear Structures — Linked Lists, Stacks, Queues & Monotonic Patterns
- 2.2.1 | Singly & Doubly Linked Lists | ListNode(val, next), dummy sentinel, reversal | Engine: PyObjectMemory (rewire prev, curr, nxt in-place without orphaning nodes)
- 2.2.2 | Fast & Slow Pointers (Floyd's Cycle) | Tortoise & hare pointers, cycle & middle node | Engine: PyObjectMemory (detect cycle entry in O(1) space)
- 2.2.3 | Stacks & Recursive Call Frames | LIFO, balanced brackets, RPN evaluation | Engine: Scrubber (spring-loaded LIFO stack for delimiter & AST parsing)
- 2.2.4 | Queues, Ring Buffers & collections.deque | FIFO, O(1) append and popleft | Engine: PerformanceRace (sliding timestamp rate limiter with deque vs list.pop(0))
- 2.2.5 | Monotonic Stacks & Monotonic Deques | Next greater element, sliding window max O(n) | Engine: Array (skyline bar chart auto-popping dominated shorter bars)

### Module m2-3: Searching, Sorting, Hashing Internals & Bit Manipulation
- 2.3.1 | Binary Search on Arrays & Answer Spaces | bisect, monotonic predicate search [F,F,T,T] | Engine: Array (halve monotonic feasibility range for capacity optimization)
- 2.3.2 | Divide & Conquer Sorting: Merge, Quick & Timsort | Two-finger merge, pivot partition, Quickselect | Engine: Array (recursion tree split/merge & Quickselect K-th largest)
- 2.3.3 | Hash Tables Under the Hood | Load factor N/M, open addressing probes, resizing | Engine: PyObjectMemory (8-slot bucket array collision & 2x resize at 0.66 load)
- 2.3.4 | Combining Hash Maps + Doubly Linked Lists (LRU Cache) | O(1) get/put + MRU splice & LRU eviction | Engine: PyObjectMemory (wire dict keys to doubly-linked nodes)
- 2.3.5 | Bitwise Algebra & Bitmasks | &, |, ^ (XOR), <<, >>, n & (n-1) | Engine: LogicGate (8-bit register switches + XOR unique number finder)

### Module m2-4: Hierarchical Data — Trees, BSTs, Heaps & Tries
- 2.4.1 | Binary Trees & DFS Traversals | Pre/in/post-order DFS, recursive height & diameter | Engine: GraphTreeCanvas (propagate subtree heights upward for diameter/LCA)
- 2.4.2 | Level-Order BFS & Tree Serialization | Queue-driven BFS by depth, serialize/deserialize | Engine: GraphTreeCanvas (horizontal level frontier + right-side view)
- 2.4.3 | Binary Search Trees (BST) & Balance | BST range invariant (min_val, max_val), skew hazard | Engine: BugHunter (break naive BST checker with deep grandchild, fix range bounds)
- 2.4.4 | Binary Heaps & Priority Queues (heapq) | Array-backed heap 2i+1, sift-up/down, Top-K, 2-heap median | Engine: GraphTreeCanvas (synced binary tree + flat array sift)
- 2.4.5 | Prefix Trees (Tries) & Autocomplete | TrieNode char maps, is_end, O(L) prefix match | Engine: GraphTreeCanvas (live prefix tree expanding on search input)

### Module m2-5: Graph Theory & Network Algorithms
- 2.5.1 | Graph Representations: Adjacency Lists & Matrices | Directed/undirected, weighted, 2D grid graphs | Engine: GraphTreeCanvas (synced node network, adj list dict, 2D matrix)
- 2.5.2 | Graph DFS, Connected Components & Cycle Detection | Visited sets, 3-color cycle detection, island flood-fill | Engine: GraphTreeCanvas (white/amber/green cycle & island counter)
- 2.5.3 | Shortest Paths on Unweighted Graphs (Multi-Source BFS) | Wavefront expansion, shortest hop distance | Engine: GraphTreeCanvas (concentric distance rings from multiple sources)
- 2.5.4 | Topological Sort & DAG Dependency Resolution | In-degree counters, Kahn's BFS algorithm | Engine: GraphTreeCanvas (peel zero-indegree course nodes for build order)
- 2.5.5 | Weighted Shortest Paths (Dijkstra & Bellman-Ford) | heapq greedy edge relaxation d + w < dist[v] | Engine: GraphTreeCanvas (step through Dijkstra + negative edge failure)
- 2.5.6 | Disjoint Set Union (Union-Find) & MST | Path compression, union by rank, Kruskal's MST | Engine: GraphTreeCanvas (flatten parent trees & connect city grid at min cost)

### Module m2-6: Combinatorial Search, Greedy Paradigms & Dynamic Programming
- 2.6.1 | Backtracking & State-Space Pruning | Choose-Explore-Unchoose, N-Queens pruning | Engine: GraphTreeCanvas (chessboard synced with pruned decision tree)
- 2.6.2 | Greedy Algorithms & Interval Scheduling | Earliest-finish-time sorting vs counterexamples | Engine: SequenceHighlighter (timeline meeting bar scheduler)
- 2.6.3 | 1D Dynamic Programming: Memoization vs. Tabulation | @cache top-down vs bottom-up O(n) array | Engine: Array (collapse recursion tree into 1D DP state transitions)
- 2.6.4 | 2D Dynamic Programming: Knapsack, Grids & Edit Distance | 0/1 Knapsack, LCS, Levenshtein matrix | Engine: GridHighlighter (2D DP cell dependency arrows + backtrace)
- 2.6.5 | Track 2 Capstone: High-Speed Route & Autocomplete Engine | Prefix Trie + Weighted Dijkstra + LRU Cache | Engine: GraphTreeCanvas + CodeChallenge

---

## TRACK 3: Applied Python & Software Engineering Systems (5 Modules, 27 Lessons)
### Module m3-1: Pythonic Expressiveness — Comprehensions, Generators & Closures
- 3.1.1 | Declarative Data Pipelines | List/dict/set comprehensions, filtering, flattening | Engine: CodeFill (compress imperative loops into comprehensions)
- 3.1.2 | First-Class Functions & Lambdas | Functions as objects, lambda, multi-criteria sort keys | Engine: Array (rank flight cards with shadow sort tuple lambda)
- 3.1.3 | Iterators, Generators & Lazy Streams | __iter__, __next__, yield, O(1) RAM streams | Engine: IteratorProtocol + PerformanceRace (process 10M rows under 16MB cap)
- 3.1.4 | Advanced Iteration & itertools | enumerate, zip, any/all, islice, chain, groupby | Engine: Pipeline (transpose grid with zip(*grid) & batch stream with islice)
- 3.1.5 | Closures & Function Decorators | nonlocal cells, @decorator, functools.wraps | Engine: Pipeline (build stateful @retry and @timer wrappers)

### Module m3-2: Object-Oriented Architecture, SOLID & Design Patterns
- 3.2.1 | Blueprints, Instances & self Mechanics | class, __init__, instance vs class attrs | Engine: PyObjectMemory (fix shared class attribute mutation bug on self)
- 3.2.2 | Encapsulation, Invariants & Descriptors | @property getters/setters, descriptor validation | Engine: BranchingTrack (guard reactor.temp invariants with @property)
- 3.2.3 | The Python Data Model (Dunder Protocols) | __repr__, __eq__, __hash__, __len__, __getitem__, __add__ | Engine: CodeFill (make custom Money class work in sets and +)
- 3.2.4 | Inheritance, MRO & Composition | super(), C3 MRO, abc.ABC, has-a composition | Engine: Pipeline (refactor brittle diamond inheritance into modular composition)
- 3.2.5 | Modern Dataclasses & Structural Matching | @dataclass(frozen=True, slots=True), Enum, match/case | Engine: CodeFill (route immutable payment events via structural match/case)
- 3.2.6 | SWE Design Patterns in Python | Strategy, Factory, Observer, Dependency Injection | Engine: Pipeline (decouple checkout engine with injected Strategy & Observer bus)

### Module m3-3: Defensive Systems — Exceptions, Context Managers & Relational SQLite
- 3.3.1 | Exception Hierarchies & Custom Errors | try/except/else/finally, raise ... from, custom errors | Engine: BranchingTrack (wire targeted exception recovery & chaining)
- 3.3.2 | Context Managers & Resource Safety | with, __enter__/__exit__, @contextmanager | Engine: Scrubber (prevent leaked DB locks on mid-function crash)
- 3.3.3 | Filesystem Engineering & Serialization | pathlib.Path, streaming CSV/JSONL, schema validation | Engine: Pipeline (sanitize paths and quarantine malformed JSONL rows)
- 3.3.4 | Embedded Relational Persistence (sqlite3) | Parameterized ? queries (anti-SQLi), ACID with conn: | Engine: BugHunter (exploit & patch SQL injection + atomic transfer rollback)
- 3.3.5 | Structured Logging & CLI Tools | logging levels/handlers, argparse, POSIX exit codes | Engine: CodeFill (configure CLI flags and structured JSON log routing)

### Module m3-4: Concurrency, Parallelism & Asynchronous Systems
- 3.4.1 | CPU-Bound vs. I/O-Bound & The GIL | Global Interpreter Lock baton, context switching | Engine: ConcurrencyTimeline (classify 4 SWE workloads to threads vs processes)
- 3.4.2 | Threads, Race Conditions & Synchronization | ThreadPoolExecutor, bytecode interleaving, Lock, Queue | Engine: ConcurrencyTimeline (force lost-update race condition, fix with Lock)
- 3.4.3 | True Parallelism with multiprocessing | ProcessPoolExecutor, multi-core saturation, pickle IPC | Engine: PerformanceRace (tune chunk size to beat IPC serialization overhead)
- 3.4.4 | Cooperative Multitasking & The Event Loop | async def, await suspension points, event loop wheel | Engine: ConcurrencyTimeline (replace blocking sleep with non-blocking await)
- 3.4.5 | Structured Async Concurrency | asyncio.gather, TaskGroup, timeouts, Semaphore(10) | Engine: ConcurrencyTimeline (throttle 200 requests with Semaphore to avoid HTTP 429)

### Module m3-5: Software Craftsmanship — Static Typing, Testing & Internals
- 3.5.1 | Static Type Systems & Structural Protocols | typing, TypeVar, Callable, Protocol duck-typing | Engine: CodeFill (resolve static type checker errors on Optional & Protocol)
- 3.5.2 | Unit Testing, Fixtures & Parameterization | Arrange-Act-Assert, boundary tests, mutant killing | Engine: BugHunter (write parameterized tests to catch 6 buggy invoice mutants)
- 3.5.3 | Mocking, Stubbing & Dependency Isolation | unittest.mock.patch, MagicMock, deterministic clocks | Engine: Pipeline (stub live payment gateway & freeze datetime in tests)
- 3.5.4 | Packaging, Virtual Environments & Architecture | pyproject.toml, layered imports, breaking circular imports | Engine: Pipeline (break circular import deadlock between services & models)
- 3.5.5 | CPython Memory Internals & Profiling | ob_refcnt, cyclic GC, __slots__, cProfile flamegraph | Engine: PyObjectMemory (sever cyclic leak & shrink RAM 60% with __slots__)
- 3.5.6 | Track 3 Capstone: Concurrent Task & Storage Engine | Asyncio workers + sqlite3 persistence + mocked unit tests | Engine: ConcurrencyTimeline + CodeChallenge

---

## TRACK 4: Data Science, Machine Learning & Deep Learning (5 Modules, 25 Lessons)
### Module m4-1: Numerical Computing, Linear Algebra & Vectorization (NumPy)
- 4.1.1 | Why Python Loops Are Slow & Contiguous Tensors | PyObject boxes vs contiguous SIMD ndarray, shape, strides | Engine: PerformanceRace (zero-copy stride views & 100x speedup over loops)
- 4.1.2 | Broadcasting Rules & Boolean Masking | Singleton dimension alignment, vectorized masks | Engine: GridHighlighter (mean-center batch matrix via broadcasting with zero loops)
- 4.1.3 | Linear Algebra as Geometry: Dot Products & Projections | Matrix mult @, cosine similarity, basis transformations | Engine: VectorCanvas (rank embeddings by cosine similarity & transform 2D grid)
- 4.1.4 | Probability Distributions, Sampling & Monte Carlo | Gaussian/uniform sampling, expectation, Bayes simulation | Engine: PerformanceRace (vectorized 1M-trial Monte Carlo posterior estimator)
- 4.1.5 | Numerical Calculus & Gradient Landscapes | Partial derivatives, gradient vectors, learning rate step | Engine: VectorCanvas (tune lr on 3D contour surface to reach minimum without diverging)

### Module m4-2: Data Engineering, Exploratory Analysis & Feature Pipelines
- 4.2.1 | Tabular Dataframes, Indexing & Vectorized Cleaning | Boolean indexing, NaN imputation, type normalization | Engine: GridHighlighter (sanitize corrupted healthcare matrix without loops)
- 4.2.2 | Relational Joins, Window Functions & GroupBy | Split-Apply-Combine, inner/left joins, rolling windows | Engine: Pipeline (join user logs & compute 7-day rolling cohort spend)
- 4.2.3 | Statistical Signals, Outliers & Spurious Correlations | Z-score/IQR clipping, correlation, Simpson's paradox | Engine: VectorCanvas (clip outliers & stratify by confounder to reveal trend reversal)
- 4.2.4 | Feature Engineering: Scaling & Categorical Encoding | Z-score standardization, Min-Max, One-Hot encoding | Engine: Pipeline (turn elliptical loss contours into round circles via Z-score scaling)
- 4.2.5 | Train/Val/Test Splits & The Data Leakage Trap | Train-only scaler fitting, stratified & temporal splits | Engine: BugHunter (audit & fix global-scaler leakage and time-travel stock leakage)

### Module m4-3: Classical Machine Learning — Algorithms From Scratch
- 4.3.1 | Linear Regression & Gradient Descent From Scratch | MSE loss, vectorized dw/db gradients in NumPy | Engine: VectorCanvas (snap regression line onto scatter plot via gradient descent)
- 4.3.2 | Logistic Regression, Sigmoids & Cross-Entropy | Sigmoid 1/(1+e^-z), binary cross-entropy log-loss | Engine: VectorCanvas (separate 2D classes with >95% accuracy in pure NumPy)
- 4.3.3 | Distance Geometry: k-NN & K-Means Clustering | Pairwise Euclidean distance, Voronoi EM centroid loop | Engine: VectorCanvas (alternate assign-points & update-centroids until convergence)
- 4.3.4 | Decision Trees, Entropy & Information Gain | Shannon entropy, Gini impurity, greedy axis splits | Engine: VectorCanvas (drag split lines & code recursive Information Gain splitter)
- 4.3.5 | Ensemble Power: Random Forests & Gradient Boosting | Bagging bootstrap trees vs sequential residual boosting | Engine: VectorCanvas (smooth overfit boundary via bagging & residual fitting)

### Module m4-4: Model Evaluation, Regularization & Production ML
- 4.4.1 | The Bias-Variance Trade-off & Regularization (L1/L2) | Overfitting, Ridge L2 decay, Lasso L1 feature sparsity | Engine: VectorCanvas (tame degree-12 polynomial with L2 and zero out noise with L1)
- 4.4.2 | Imbalanced Metrics: Precision, Recall, F1 & ROC-AUC | 99% accuracy trap on 1% fraud, Confusion Matrix, threshold tuning | Engine: SequenceHighlighter (tune probability threshold on fraud distributions)
- 4.4.3 | Cross-Validation & Hyperparameter Search | Stratified K-Fold CV, grid/random search | Engine: GridHighlighter (rotate validation fold across 5 runs to pick optimal hyperparams)
- 4.4.4 | Dimensionality Reduction: PCA & Embeddings | Covariance matrix, SVD eigenvectors, explained variance | Engine: VectorCanvas (project 64D digit vectors onto top 2 principal components)
- 4.4.5 | Reproducible ML Pipelines & Model Serialization | Deterministic inference bundle, schema contract, drift detection | Engine: Pipeline (package preprocessing + weights with drift alerts)

### Module m4-5: Neural Networks, Deep Learning & Modern AI Architectures
- 4.5.1 | Perceptrons, Non-Linearity & The XOR Problem | Hidden layers folding space, ReLU/GELU/Softmax | Engine: VectorCanvas (configure 2-neuron ReLU layer to separate XOR)
- 4.5.2 | Computational Graphs & Backpropagation (Micro-Autograd) | Forward DAG, chain rule backward pass, Value autograd class | Engine: GraphTreeCanvas (implement backward closures for loss.backward())
- 4.5.3 | Training Deep Networks: Optimizers, BatchNorm & Dropout | Vanishing/exploding gradients, He init, Momentum & Adam | Engine: VectorCanvas (stabilize 5-layer network activations & race Adam vs SGD)
- 4.5.4 | Spatial & Sequential Inductors: Convolutions & Embeddings | 2D sliding conv kernels, max-pooling, token embeddings | Engine: GridHighlighter (design Sobel edge kernels & 2D conv forward pass)
- 4.5.5 | Self-Attention, Transformers & Track 4 Capstone | Scaled dot-product attention softmax(QK^T/sqrt(d_k))V | Engine: GridHighlighter + CodeChallenge (build QKV attention & sequence classifier)