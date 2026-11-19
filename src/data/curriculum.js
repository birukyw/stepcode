// Course outline (titles only). Lesson bodies live in src/content/lessons/.
// Two courses share one pool of tracks: Learn Python (beginner) and Speak Python (the extras).
const SECTIONS = [
  {
    "id": "phase-py-foundations",
    "title": "Track 1: Beginner Python Foundations",
    "subtitle": "Variables, Decisions, Loops, Lists, Functions, Dictionaries, Errors, Files & Classes",
    "modules": [
      {
        "id": "m1-1",
        "title": "Thinking in Code — Expressions, State & Memory",
        "lessons": [
          {
            "id": "1.1.1",
            "title": "The Sequential Machine"
          },
          {
            "id": "1.1.2",
            "title": "Variables Are Labels, Not Boxes"
          },
          {
            "id": "1.1.3",
            "title": "Arithmetic & Modular Clocks"
          },
          {
            "id": "1.1.4",
            "title": "Strings & Pattern Assembly"
          },
          {
            "id": "1.1.5",
            "title": "Shape-Shifting Types & Input"
          }
        ]
      },
      {
        "id": "m1-2",
        "title": "Logic Gates & Decision Trees",
        "lessons": [
          {
            "id": "1.2.1",
            "title": "Truth, Lies & Comparisons"
          },
          {
            "id": "1.2.2",
            "title": "Forking the Path"
          },
          {
            "id": "1.2.3",
            "title": "Multi-Way Decision Trees"
          },
          {
            "id": "1.2.4",
            "title": "Combining Logic Gates"
          },
          {
            "id": "1.2.5",
            "title": "Short-Circuiting & Truthiness"
          }
        ]
      },
      {
        "id": "m1-3",
        "title": "Iteration, Patterns & Loop Mechanics",
        "lessons": [
          {
            "id": "1.3.1",
            "title": "State Machines & while Loops"
          },
          {
            "id": "1.3.2",
            "title": "Counting with Sequences & range"
          },
          {
            "id": "1.3.3",
            "title": "The Accumulator Pattern"
          },
          {
            "id": "1.3.4",
            "title": "Loop Control: break, continue & else"
          },
          {
            "id": "1.3.5",
            "title": "2D Grids & Nested Loops"
          }
        ]
      },
      {
        "id": "m1-4",
        "title": "Ordered Collections — Sequences, Slicing & Mutability",
        "lessons": [
          {
            "id": "1.4.1",
            "title": "Zero-Based Indexing & Negative Offsets"
          },
          {
            "id": "1.4.2",
            "title": "Surgical Slicing"
          },
          {
            "id": "1.4.3",
            "title": "Dynamic Lists & Mutation"
          },
          {
            "id": "1.4.4",
            "title": "The Aliasing Trap (Memory Deep Dive)"
          },
          {
            "id": "1.4.5",
            "title": "Tuples & Structural Unpacking"
          },
          {
            "id": "1.4.6",
            "title": "Strings as Immutable Sequences"
          }
        ]
      },
      {
        "id": "m1-5",
        "title": "Functional Abstraction — Scope, Contracts & Modularity",
        "lessons": [
          {
            "id": "1.5.1",
            "title": "Black Boxes & Signatures"
          },
          {
            "id": "1.5.2",
            "title": "return vs. print (The Classic Trap)"
          },
          {
            "id": "1.5.3",
            "title": "The Call Stack & LEGB Scope"
          },
          {
            "id": "1.5.4",
            "title": "Flexible Interfaces & Mutable Default Traps"
          },
          {
            "id": "1.5.5",
            "title": "Pure Functions vs. Side Effects"
          }
        ]
      },
      {
        "id": "m1-6",
        "title": "Associative Data — Hash Maps, Sets & Modeling",
        "lessons": [
          {
            "id": "1.6.1",
            "title": "Why Lists Are Slow at Searching"
          },
          {
            "id": "1.6.2",
            "title": "Safe Lookups & Frequency Counting"
          },
          {
            "id": "1.6.3",
            "title": "Iterating & Transforming Dictionaries"
          },
          {
            "id": "1.6.4",
            "title": "Sets: Uniqueness & Venn Algebra"
          },
          {
            "id": "1.6.5",
            "title": "Nested Data Modeling"
          },
          {
            "id": "1.6.6",
            "title": "Guided Build: A Mini Search Engine"
          }
        ]
      },
      {
        "id": "m1-7",
        "title": "Real-World Python — Errors, Files, Modules & Classes",
        "lessons": [
          { "id": "1.7.1", "title": "Reading Errors & Debugging Like a Detective" },
          { "id": "1.7.2", "title": "Handling Exceptions with try/except" },
          { "id": "1.7.3", "title": "Reading & Writing Files" },
          { "id": "1.7.4", "title": "Modules & the Standard Library" },
          { "id": "1.7.5", "title": "Comprehensions & Handy Built-ins" },
          { "id": "1.7.6", "title": "Your First Class: Objects & Methods" },
          { "id": "1.7.7", "title": "Python Beyond the Browser: Scripts, pip & Virtual Environments" }
        ]
      }
    ]
  },
  {
    "id": "phase-py-dsa",
    "title": "Track 2: Data Structures, Algorithms & Complexity in Python",
    "subtitle": "Two Pointers, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs & Dynamic Programming",
    "modules": [
      {
        "id": "m2-1",
        "title": "Algorithmic Complexity, Arrays & Two-Pointer Paradigms",
        "lessons": [
          {
            "id": "2.1.1",
            "title": "Asymptotic Analysis & Big-O Intuition"
          },
          {
            "id": "2.1.2",
            "title": "Dynamic Arrays & Amortized Analysis"
          },
          {
            "id": "2.1.3",
            "title": "Converging & Parallel Two Pointers"
          },
          {
            "id": "2.1.4",
            "title": "Fixed & Dynamic Sliding Windows"
          },
          {
            "id": "2.1.5",
            "title": "Prefix Sums & Difference Arrays"
          }
        ]
      },
      {
        "id": "m2-2",
        "title": "Linear Structures — Linked Lists, Stacks, Queues & Monotonic Patterns",
        "lessons": [
          {
            "id": "2.2.1",
            "title": "Singly & Doubly Linked Lists"
          },
          {
            "id": "2.2.2",
            "title": "Fast & Slow Pointers (Floyd's Cycle)"
          },
          {
            "id": "2.2.3",
            "title": "Stacks & Recursive Call Frames"
          },
          {
            "id": "2.2.4",
            "title": "Queues, Ring Buffers & collections.deque"
          },
          {
            "id": "2.2.5",
            "title": "Monotonic Stacks & Monotonic Deques"
          }
        ]
      },
      {
        "id": "m2-3",
        "title": "Searching, Sorting, Hashing Internals & Bit Manipulation",
        "lessons": [
          {
            "id": "2.3.1",
            "title": "Binary Search on Arrays & Answer Spaces"
          },
          {
            "id": "2.3.2",
            "title": "Divide & Conquer Sorting: Merge, Quick & Timsort"
          },
          {
            "id": "2.3.3",
            "title": "Hash Tables Under the Hood"
          },
          {
            "id": "2.3.4",
            "title": "Combining Hash Maps + Doubly Linked Lists (LRU Cache)"
          },
          {
            "id": "2.3.5",
            "title": "Bitwise Algebra & Bitmasks"
          }
        ]
      },
      {
        "id": "m2-4",
        "title": "Hierarchical Data — Trees, BSTs, Heaps & Tries",
        "lessons": [
          {
            "id": "2.4.1",
            "title": "Binary Trees & DFS Traversals"
          },
          {
            "id": "2.4.2",
            "title": "Level-Order BFS & Tree Serialization"
          },
          {
            "id": "2.4.3",
            "title": "Binary Search Trees (BST) & Balance"
          },
          {
            "id": "2.4.4",
            "title": "Binary Heaps & Priority Queues (heapq)"
          },
          {
            "id": "2.4.5",
            "title": "Prefix Trees (Tries) & Autocomplete"
          }
        ]
      },
      {
        "id": "m2-5",
        "title": "Graph Theory & Network Algorithms",
        "lessons": [
          {
            "id": "2.5.1",
            "title": "Graph Representations: Adjacency Lists & Matrices"
          },
          {
            "id": "2.5.2",
            "title": "Graph DFS, Connected Components & Cycle Detection"
          },
          {
            "id": "2.5.3",
            "title": "Shortest Paths on Unweighted Graphs (Multi-Source BFS)"
          },
          {
            "id": "2.5.4",
            "title": "Topological Sort & DAG Dependency Resolution"
          },
          {
            "id": "2.5.5",
            "title": "Weighted Shortest Paths (Dijkstra & Bellman-Ford)"
          },
          {
            "id": "2.5.6",
            "title": "Disjoint Set Union (Union-Find) & MST"
          }
        ]
      },
      {
        "id": "m2-6",
        "title": "Combinatorial Search, Greedy Paradigms & Dynamic Programming",
        "lessons": [
          {
            "id": "2.6.1",
            "title": "Backtracking & State-Space Pruning"
          },
          {
            "id": "2.6.2",
            "title": "Greedy Algorithms & Interval Scheduling"
          },
          {
            "id": "2.6.3",
            "title": "1D Dynamic Programming: Memoization vs. Tabulation"
          },
          {
            "id": "2.6.4",
            "title": "2D Dynamic Programming: Knapsack, Grids & Edit Distance"
          }
        ]
      }
    ]
  },
  {
    "id": "phase-py-systems",
    "title": "Track 3: Applied Python & Software Engineering Systems",
    "subtitle": "Generators, OOP Patterns, Concurrency/GIL/AsyncIO, SQLite & Unit Testing",
    "modules": [
      {
        "id": "m3-1",
        "title": "Pythonic Expressiveness — Comprehensions, Generators & Closures",
        "lessons": [
          {
            "id": "3.1.1",
            "title": "Declarative Data Pipelines"
          },
          {
            "id": "3.1.2",
            "title": "First-Class Functions & Lambdas"
          },
          {
            "id": "3.1.3",
            "title": "Iterators, Generators & Lazy Streams"
          },
          {
            "id": "3.1.4",
            "title": "Advanced Iteration & itertools"
          },
          {
            "id": "3.1.5",
            "title": "Closures & Function Decorators"
          }
        ]
      },
      {
        "id": "m3-2",
        "title": "Object-Oriented Architecture, SOLID & Design Patterns",
        "lessons": [
          {
            "id": "3.2.1",
            "title": "Blueprints, Instances & self Mechanics"
          },
          {
            "id": "3.2.2",
            "title": "Encapsulation, Invariants & Descriptors"
          },
          {
            "id": "3.2.3",
            "title": "The Python Data Model (Dunder Protocols)"
          },
          {
            "id": "3.2.4",
            "title": "Inheritance, MRO & Composition"
          },
          {
            "id": "3.2.5",
            "title": "Modern Dataclasses & Structural Matching"
          },
          {
            "id": "3.2.6",
            "title": "SWE Design Patterns in Python"
          }
        ]
      },
      {
        "id": "m3-3",
        "title": "Defensive Systems — Exceptions, Context Managers & Relational SQLite",
        "lessons": [
          {
            "id": "3.3.1",
            "title": "Exception Hierarchies & Custom Errors"
          },
          {
            "id": "3.3.2",
            "title": "Context Managers & Resource Safety"
          },
          {
            "id": "3.3.3",
            "title": "Filesystem Engineering & Serialization"
          },
          {
            "id": "3.3.4",
            "title": "Embedded Relational Persistence (sqlite3)"
          },
          {
            "id": "3.3.5",
            "title": "Structured Logging & CLI Tools"
          }
        ]
      },
      {
        "id": "m3-4",
        "title": "Concurrency, Parallelism & Asynchronous Systems",
        "lessons": [
          {
            "id": "3.4.1",
            "title": "CPU-Bound vs. I/O-Bound & The GIL"
          },
          {
            "id": "3.4.2",
            "title": "Threads, Race Conditions & Synchronization"
          },
          {
            "id": "3.4.3",
            "title": "True Parallelism with multiprocessing"
          },
          {
            "id": "3.4.4",
            "title": "Cooperative Multitasking & The Event Loop"
          },
          {
            "id": "3.4.5",
            "title": "Structured Async Concurrency"
          }
        ]
      },
      {
        "id": "m3-5",
        "title": "Software Craftsmanship — Static Typing, Testing & Internals",
        "lessons": [
          {
            "id": "3.5.1",
            "title": "Static Type Systems & Structural Protocols"
          },
          {
            "id": "3.5.2",
            "title": "Unit Testing, Fixtures & Parameterization"
          },
          {
            "id": "3.5.3",
            "title": "Mocking, Stubbing & Dependency Isolation"
          },
          {
            "id": "3.5.4",
            "title": "Packaging, Virtual Environments & Architecture"
          },
          {
            "id": "3.5.5",
            "title": "CPython Memory Internals & Profiling"
          }
        ]
      }
    ]
  },
  {
    "id": "phase-py-aiml",
    "title": "Track 4: Data Science, Machine Learning & Deep Learning",
    "subtitle": "NumPy Vectorization, Classical ML from Scratch, Autograd, CNNs & Transformers",
    "modules": [
      {
        "id": "m4-1",
        "title": "Numerical Computing, Linear Algebra & Vectorization (NumPy)",
        "lessons": [
          {
            "id": "4.1.1",
            "title": "Why Python Loops Are Slow & Contiguous Tensors"
          },
          {
            "id": "4.1.2",
            "title": "Broadcasting Rules & Boolean Masking"
          },
          {
            "id": "4.1.3",
            "title": "Linear Algebra as Geometry: Dot Products & Projections"
          },
          {
            "id": "4.1.4",
            "title": "Probability Distributions, Sampling & Monte Carlo"
          },
          {
            "id": "4.1.5",
            "title": "Numerical Calculus & Gradient Landscapes"
          }
        ]
      },
      {
        "id": "m4-2",
        "title": "Data Engineering, Exploratory Analysis & Feature Pipelines",
        "lessons": [
          {
            "id": "4.2.1",
            "title": "Tabular Dataframes, Indexing & Vectorized Cleaning"
          },
          {
            "id": "4.2.2",
            "title": "Relational Joins, Window Functions & GroupBy"
          },
          {
            "id": "4.2.3",
            "title": "Statistical Signals, Outliers & Spurious Correlations"
          },
          {
            "id": "4.2.4",
            "title": "Feature Engineering: Scaling & Categorical Encoding"
          },
          {
            "id": "4.2.5",
            "title": "Train/Val/Test Splits & The Data Leakage Trap"
          }
        ]
      },
      {
        "id": "m4-3",
        "title": "Classical Machine Learning — Algorithms From Scratch",
        "lessons": [
          {
            "id": "4.3.1",
            "title": "Linear Regression & Gradient Descent From Scratch"
          },
          {
            "id": "4.3.2",
            "title": "Logistic Regression, Sigmoids & Cross-Entropy"
          },
          {
            "id": "4.3.3",
            "title": "Distance Geometry: k-NN & K-Means Clustering"
          },
          {
            "id": "4.3.4",
            "title": "Decision Trees, Entropy & Information Gain"
          },
          {
            "id": "4.3.5",
            "title": "Ensemble Power: Random Forests & Gradient Boosting"
          }
        ]
      },
      {
        "id": "m4-4",
        "title": "Model Evaluation, Regularization & Production ML",
        "lessons": [
          {
            "id": "4.4.1",
            "title": "The Bias-Variance Trade-off & Regularization (L1/L2)"
          },
          {
            "id": "4.4.2",
            "title": "Imbalanced Metrics: Precision, Recall, F1 & ROC-AUC"
          },
          {
            "id": "4.4.3",
            "title": "Cross-Validation & Hyperparameter Search"
          },
          {
            "id": "4.4.4",
            "title": "Dimensionality Reduction: PCA & Embeddings"
          },
          {
            "id": "4.4.5",
            "title": "Reproducible ML Pipelines & Model Serialization"
          }
        ]
      },
      {
        "id": "m4-5",
        "title": "Neural Networks, Deep Learning & Modern AI Architectures",
        "lessons": [
          {
            "id": "4.5.1",
            "title": "Perceptrons, Non-Linearity & The XOR Problem"
          },
          {
            "id": "4.5.2",
            "title": "Computational Graphs & Backpropagation (Micro-Autograd)"
          },
          {
            "id": "4.5.3",
            "title": "Training Deep Networks: Optimizers, BatchNorm & Dropout"
          },
          {
            "id": "4.5.4",
            "title": "Spatial & Sequential Inductors: Convolutions & Embeddings"
          },
          {
            "id": "4.5.5",
            "title": "Self-Attention & Transformers"
          }
        ]
      }
    ]
  }
];

export const MODULES = SECTIONS.flatMap((s) => s.modules.map((m) => ({ ...m, sectionId: s.id })));
export const getModule = (id) => MODULES.find((m) => m.id === id);
export const ALL_LESSONS = MODULES.flatMap((m) => m.lessons.map((l, i) => ({ ...l, moduleId: m.id, index: i })));

// One hard capstone per track. Only the first has content so far.
export const FINALS = [
  { id: 'track-1', title: 'The Lost Terminal', tagline: 'Build the engine of a text adventure: parser, world, locked doors and a win condition.' },
  { id: 'track-2', title: 'Route & Autocomplete Engine', tagline: 'A mini maps app: trie autocomplete, Dijkstra shortest paths and an LRU cache.' },
  { id: 'track-3', title: 'Concurrent Task & Storage Engine', tagline: 'Async workers, SQLite persistence and a fully unit-tested job queue.' },
  { id: 'track-4', title: 'A Neural Network From Scratch', tagline: 'Write micro-autograd and train a classifier that really learns, with no frameworks.' },
];
FINALS.forEach((f, i) => { SECTIONS[i].final = f; });

// Track titles and levels. Titles say what you will be able to do, not what the topic is called.
const TRACK_META = [
  { title: 'Foundations', level: 'Beginner' },
  { title: 'Think Like an Engineer', level: 'Intermediate' },
  { title: 'Build Real Systems', level: 'Advanced' },
  { title: 'Teach a Machine', level: 'Expert' },
];
TRACK_META.forEach((m, i) => { SECTIONS[i].title = m.title; SECTIONS[i].level = m.level; });
export const TRACKS = SECTIONS;

export const COURSES = [
  {
    id: 'learn-python',
    slug: 'python',
    path: '/python',
    title: 'Learn Python',
    short: 'Learn Python',
    tagline: 'From zero to your first real program',
    description: 'Start with your first print() and finish by building a text adventure engine. Short lessons, a live editor beside every one, and a project at the end of each module.',
    level: 'Beginner',
    sections: [SECTIONS[0]],
  },
  {
    id: 'speak-python',
    slug: 'further',
    path: '/further',
    title: 'Speak Python',
    short: 'Speak Python',
    tagline: 'Further on Python: algorithms, systems and machine learning',
    description: 'For when the basics feel comfortable. Data structures and algorithms, real software systems, and a neural network from scratch, each track ending in a serious project.',
    level: 'Intermediate to advanced',
    sections: SECTIONS.slice(1),
  },
];
export const getCourse = (slug) => COURSES.find((c) => c.slug === slug);
export const courseOfModule = (moduleId) => COURSES.find((c) => c.sections.some((s) => s.modules.some((m) => m.id === moduleId)));

