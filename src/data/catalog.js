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
    title: 'DSA and Leetcode Mastery',
    tagline: 'Master high-yield algorithm patterns in Python, Java, C++, or JavaScript',
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
    id: 'python-intro',
    alias: 'python-backend',
    title: 'Introduction to Python',
    tagline: 'From Hello World & clean syntax to OOP, REST APIs, Data Science & FastAPI',
    icon: '🐍',
    badge: 'STARTER TO PRO',
    color: '#4fc3f7',
    difficulty: 'Beginner to Intermediate',
    duration: '11 Modules',
    modulesCount: 11,
    tags: ['Python 3', 'Syntax', 'Functions', 'OOP', 'File I/O', 'REST APIs', 'Data Science', 'FastAPI'],
    description: 'The ultimate zero-to-hero Python masterclass. Start from Hello World and master loops, functions, collections, and classes in Level 1. Then pick and choose standalone applied electives in Level 2: Advanced OOP, File Serialization, Networking/APIs, Data Analytics, and FastAPI Web Development.',
    levels: [
      {
        id: 'beginner',
        title: 'Level 1: Beginner Foundations',
        subtitle: 'From Hello World to Loops, Functions, Collections & Classes',
        badge: 'FOUNDATIONS',
        icon: '🌱',
        modulesCount: 6,
        phases: [ROADMAP.phases[7]] // phase-py-beginner
      },
      {
        id: 'intermediate',
        title: 'Level 2: Intermediate Ecosystem Electives',
        subtitle: 'Pick & Choose: Advanced OOP, File I/O, REST APIs, Data Science & FastAPI',
        badge: 'ELECTIVES',
        icon: '⚡',
        modulesCount: 5,
        phases: [ROADMAP.phases[8]] // phase-py-intermediate
      }
    ],
    phases: [
      ROADMAP.phases[7], // Phase Python Beginner (Modules 1-6)
      ROADMAP.phases[8], // Phase Python Intermediate Electives (Modules 7-11)
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
      ROADMAP.phases[9], // Phase Systems: C Memory Architecture & Systems
    ]
  }
];

export function getTrack(trackId) {
  return TRACKS.find(t => t.id === trackId || t.alias === trackId) || TRACKS[0];
}
