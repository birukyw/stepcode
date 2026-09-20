// ─── CodeQuest Career Tracks Catalog ─────────────────────────────────────
import { ROADMAP } from './roadmap.js';

export const TRACKS = [
  {
    id: 'java-spring',
    title: 'Java & Enterprise Spring Boot',
    tagline: 'From JVM internals and OOP to production Spring Boot 3 microservices',
    icon: '☕',
    badge: 'CORE ENTERPRISE',
    color: 'var(--cyan)',
    difficulty: 'Beginner to Advanced',
    duration: '10 Weeks',
    modulesCount: 48,
    tags: ['Java 21', 'OOP', 'SQL & JDBC', 'Spring Boot 3', 'Hibernate', 'JWT Auth'],
    description: 'The premier enterprise engineering track. Start with Java syntax, object-oriented design patterns, memory model, and collections, transition into database persistence with PostgreSQL & JDBC, and build production-grade REST APIs with Spring Boot 3.',
    phases: [
      ROADMAP.phases[0], // Phase 1: Java Foundations (Weeks 1-4)
      ROADMAP.phases[3], // Phase 4: SQL & PostgreSQL (Weeks 13-16)
      ROADMAP.phases[4], // Phase 5: Spring Boot 3 (Weeks 17-20)
    ]
  },
  {
    id: 'web-fullstack',
    title: 'Web & Full-Stack Development',
    tagline: 'Modern responsive frontend, relational databases, and cloud-ready Node APIs',
    icon: '🌐',
    badge: 'HIGH DEMAND',
    color: 'var(--yellow)',
    difficulty: 'Beginner to Full-Stack',
    duration: '10 Weeks',
    modulesCount: 52,
    tags: ['HTML5 / CSS3', 'JavaScript ES6+', 'React', 'SQL & DBs', 'Node.js / Express', 'Docker'],
    description: 'Build complete web software from pixel to database. Master semantic HTML5, CSS Grid/Flexbox, modern React with Hooks, relational database schema design with SQL, and secure backend RESTful APIs with Node.js and Docker.',
    phases: [
      ROADMAP.phases[5], // Phase 6: Modern Frontend & React (Weeks 21-24)
      ROADMAP.phases[3], // Phase 4: Relational Databases & SQL (Weeks 13-16) - User request: include DB in fullstack!
      ROADMAP.phases[6], // Phase 7: DevOps, Docker & Capstone (Weeks 25-28)
    ]
  },
  {
    id: 'algorithms-dsa',
    title: 'LeetCode & Algorithms Mastery',
    tagline: 'Master high-yield algorithm patterns in Java, Python, C++, or JavaScript',
    icon: '🧩',
    badge: 'FAANG INTERVIEWS',
    color: 'var(--green-bright)',
    difficulty: 'Intermediate',
    duration: '8 Weeks',
    modulesCount: 44,
    tags: ['Big-O', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees', 'Graphs', 'DP'],
    description: 'Crack technical coding interviews with pattern-based problem solving. Solve algorithm challenges with interactive multi-language switching between Java, Python, C++, and JavaScript.',
    phases: [
      ROADMAP.phases[1], // Phase 2: LeetCode Core (Weeks 5-8)
      ROADMAP.phases[2], // Phase 3: LeetCode Advanced (Weeks 9-12)
    ]
  },
  {
    id: 'python-backend',
    title: 'Python & Backend Engineering',
    tagline: 'Write Pythonic code, design APIs with FastAPI & Django, and manage DBs',
    icon: '🐍',
    badge: 'MODERN BACKEND',
    color: '#4fc3f7',
    difficulty: 'Beginner to Advanced',
    duration: '8 Weeks',
    modulesCount: 36,
    tags: ['Python 3', 'OOP & Dunder', 'SQLAlchemy', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    description: 'Master the cleanest syntax in software engineering. Learn Python data structures, OOP magic methods, database ORM modeling with SQLAlchemy, and high-performance asynchronous API endpoints.',
    phases: [
      ROADMAP.phases[7], // Phase Python: Core & Backend Foundations
      ROADMAP.phases[3], // Phase 4: Database & SQL
    ]
  },
  {
    id: 'systems-c',
    title: 'Low-Level Systems & C/C++',
    tagline: 'Master direct memory management, pointers, stack vs heap, and CPU registers',
    icon: '⚙️',
    badge: 'SYSTEMS ARCHITECTURE',
    color: '#ff80ab',
    difficulty: 'Advanced',
    duration: '8 Weeks',
    modulesCount: 32,
    tags: ['C', 'C++ 17', 'Pointers', 'Stack & Heap', 'Memory Allocation', 'Assembly'],
    description: 'Understand what software is actually doing under the hood. Master pointer arithmetic, dynamic memory allocation with malloc and free, custom data structures from scratch, and C++ OOP abstractions.',
    phases: [
      ROADMAP.phases[8], // Phase Systems: C Memory Architecture & Systems
    ]
  }
];

export function getTrack(trackId) {
  return TRACKS.find(t => t.id === trackId) || TRACKS[0];
}
