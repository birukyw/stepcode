// ─── StepCode Career Tracks & Course Catalog (Brilliant.org Educational Model) ───
import { ROADMAP } from './roadmap.js';

export const TRACKS = [
  {
    id: 'python-intro',
    alias: 'python-backend',
    title: 'Introduction to Python',
    shortTitle: 'Python',
    heroImage: null,
    heroBadge: 'BEGINNER · COURSE',
    heroDescription: "Learn programming fundamentals such as variables, control flow, functions, and data structures with the world's most versatile language — Python.",
    timeToComplete: '22h',
    tagline: 'Master Python 3 fundamentals, object-oriented design, data processing, and FastAPI backends',
    icon: '🐍',
    badge: 'FOUNDATIONS',
    color: '#2563eb',
    difficulty: 'Beginner to Intermediate',
    duration: '11 Modules',
    modulesCount: 11,
    tags: ['Python 3', 'Syntax', 'Functions', 'OOP', 'File I/O', 'REST APIs', 'Data Science', 'FastAPI'],
    description: 'A comprehensive, intuition-first Python curriculum. Build strong foundational problem-solving skills from variables, loops, and functions, to object-oriented architecture, file handling, and modern FastAPI web services.',
    levels: [
      {
        id: 'beginner',
        title: 'Beginner Foundations',
        subtitle: 'From Hello World to Loops, Functions, Collections & Classes',
        badge: 'FOUNDATIONS',
        icon: '🌱',
        modulesCount: 6,
        phases: [ROADMAP.phases.find(p => p.id === 'phase-py-beginner')]
      },
      {
        id: 'intermediate',
        title: 'Applied Python Ecosystem',
        subtitle: 'Advanced OOP, File I/O, REST APIs, Data Science & FastAPI',
        badge: 'APPLIED',
        icon: '⚡',
        modulesCount: 5,
        phases: [ROADMAP.phases.find(p => p.id === 'phase-py-intermediate')]
      }
    ],
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-py-beginner'),
      ROADMAP.phases.find(p => p.id === 'phase-py-intermediate'),
    ]
  },
  {
    id: 'web-fullstack',
    title: 'Web and Fullstack Engineering',
    shortTitle: 'Full-Stack Web',
    heroImage: null,
    heroBadge: 'FULLSTACK · COURSE',
    heroDescription: 'Build complete, modern web applications: responsive component frontends, relational databases, and production-grade REST APIs.',
    timeToComplete: '40h',
    tagline: 'Modern responsive frontend, relational databases, and cloud-ready Node APIs',
    icon: '🌐',
    badge: 'FULL-STACK',
    color: '#0284c7',
    difficulty: 'Beginner to Full-Stack',
    duration: '12 Modules',
    modulesCount: 12,
    tags: ['HTML5 / CSS3', 'JavaScript ES6+', 'React & TS', 'PostgreSQL', 'Node.js / Express', 'Docker & CI/CD'],
    description: 'Build production-grade web software from front to back. Master semantic HTML5 & modern CSS Grid, core JavaScript interactivity & V8 runtime, declarative React with TypeScript, relational database architecture with PostgreSQL, and containerized deployment.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-web-foundations'),
      ROADMAP.phases.find(p => p.id === 'phase-web-react-ts'),
      ROADMAP.phases.find(p => p.id === 'phase-web-backend-cloud'),
    ]
  },
  {
    id: 'algorithms-dsa',
    title: 'Data Structures & Algorithms',
    shortTitle: 'Algorithms & DSA',
    heroImage: null,
    heroBadge: 'COMPUTER SCIENCE · CORE',
    heroDescription: 'Develop deep algorithmic intuition across high-yield problem solving patterns: two pointers, sliding window, trees, graphs, and dynamic programming.',
    timeToComplete: '36h',
    tagline: 'Develop algorithmic intuition: Master two-pointers, sliding window, trees, graphs, and dynamic programming',
    icon: '🧠',
    badge: 'CORE ALGORITHMS',
    color: '#10b981',
    difficulty: 'Intermediate to Advanced',
    duration: '8 Modules',
    modulesCount: 8,
    tags: ['Big-O', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees', 'Graphs', 'DP'],
    description: 'Build deep conceptual intuition for solving complex computational problems. Analyze time and space complexity with Big-O, master fundamental data structures (arrays, linked lists, stacks, trees, graphs), and solve challenges across Python, Java, C++, or JavaScript.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-2'),
      ROADMAP.phases.find(p => p.id === 'phase-3'),
    ]
  },
  {
    id: 'ml-ai',
    alias: 'machine-learning',
    title: 'Machine Learning & AI Engineering',
    shortTitle: 'ML & AI',
    heroImage: null,
    heroBadge: 'APPLIED AI · TRACK',
    heroDescription: 'From mathematical intuition to production AI: Master matrix calculus, classical statistical learning, deep learning, Transformers, and LLM systems.',
    timeToComplete: '48h',
    tagline: 'From mathematical intuition to production LLMs, vector search, and high-throughput model serving',
    icon: '🤖',
    badge: 'MACHINE LEARNING',
    color: '#8b5cf6',
    difficulty: 'Advanced',
    duration: '18 Modules',
    modulesCount: 18,
    tags: ['Math Foundations', 'Scikit-Learn', 'PyTorch', 'Transformers', 'LLMs & RAG', 'MLOps & vLLM'],
    description: 'A rigorous, hands-on path through modern artificial intelligence. Master matrix calculus and gradient descent, classical ML models, deep neural networks, Transformers, RAG systems, and production MLOps.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-ml-classical'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-deeplearning'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-genai'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-mlops'),
    ]
  },
  {
    id: 'java-spring',
    title: 'Java & Enterprise Architecture',
    shortTitle: 'Java & Spring',
    heroImage: null,
    heroBadge: 'SYSTEMS · COURSE',
    heroDescription: "Master modern Java and enterprise software engineering: object-oriented design, JVM internals, relational databases, and Spring Boot microservices.",
    timeToComplete: '22h',
    tagline: 'From JVM internals and object-oriented design to relational SQL and Spring Boot microservices',
    icon: '☕',
    badge: 'ENTERPRISE SYSTEMS',
    color: '#2563eb',
    difficulty: 'Beginner to Advanced',
    duration: '12 Modules',
    modulesCount: 12,
    tags: ['Java 21', 'JVM Internals', 'OOP Design', 'SQL & JDBC', 'Spring Boot 3', 'Microservices'],
    description: 'Master enterprise software engineering with modern Java. Understand JVM memory management, object-oriented design patterns, collections, relational databases with PostgreSQL & JDBC, and production microservices with Spring Boot 3.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-1'),
      ROADMAP.phases.find(p => p.id === 'phase-4'),
      ROADMAP.phases.find(p => p.id === 'phase-5'),
    ]
  },
  {
    id: 'systems-c',
    title: 'Computer Systems & C/C++',
    shortTitle: 'Systems & C/C++',
    heroImage: null,
    heroBadge: 'SYSTEMS · COURSE',
    heroDescription: 'Master direct memory management, pointer arithmetic, stack vs heap allocation, and CPU architectures with C & C++.',
    timeToComplete: '32h',
    tagline: 'Master direct memory management, pointers, stack vs heap, and CPU registers',
    icon: '⚙️',
    badge: 'SYSTEMS PROGRAMMING',
    color: '#ea580c',
    difficulty: 'Advanced',
    duration: '8 Modules',
    modulesCount: 8,
    tags: ['C', 'C++ 17', 'Pointers', 'Stack & Heap', 'Memory Allocation', 'Assembly'],
    description: 'Understand how computers actually work beneath high-level abstractions. Explore memory layout, pointers, manual heap allocation with malloc/free, data structures from scratch, and C++ systems programming.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-sys-1'),
    ]
  }
];

export function getTrack(trackId) {
  return TRACKS.find(t => t.id === trackId || t.alias === trackId) || TRACKS[0];
}
