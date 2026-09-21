// ─── CodeQuest Career Tracks Catalog ─────────────────────────────────────
import { ROADMAP } from './roadmap.js';

export const TRACKS = [
  {
    id: 'java-spring',
    title: 'The Legend of Java: Quest for the Enterprise',
    shortTitle: 'Java',
    heroImage: '/images/custom_pixel_java_mage.png',
    heroBadge: 'BEGINNER · COURSE',
    heroDescription: "Master Java by exploring object-oriented programming and essential data structures, building skills to create efficient and scalable applications!",
    timeToComplete: '22h',
    tagline: 'From JVM Bytecode Runes & Memory Realms to Spring Boot 3 Citadels',
    icon: '🧙‍♂️',
    badge: 'ENTERPRISE QUEST',
    color: 'var(--cyan)',
    difficulty: 'Beginner to Advanced',
    duration: '10 Modules',
    modulesCount: 48,
    tags: ['Java 21', 'JVM Internals', 'OOP Sorcery', 'SQL & JDBC', 'Spring Boot 3', 'Microservices'],
    description: 'The premier enterprise engineering odyssey. Enter the JVM Citadel mastering memory runes, object-oriented architecture, and collections alchemy. Transition into relational vaults with PostgreSQL & JDBC, and forge production-grade microservices with Spring Boot 3.',
    phases: [
      ROADMAP.phases[0], // Phase 1: Java Foundations (Modules 1-4)
      ROADMAP.phases[3], // Phase 4: SQL & PostgreSQL (Modules 13-16)
      ROADMAP.phases[4], // Phase 5: Spring Boot 3 (Modules 17-20)
    ]
  },
  {
    id: 'web-fullstack',
    title: 'Web & Full-Stack Development: The Cyberpunk Web Foundry',
    shortTitle: 'Full-Stack Web',
    heroImage: '/images/retro_fullstack_bg.png',
    heroBadge: 'FULLSTACK · COURSE',
    heroDescription: 'Craft complete web applications in a neon cyberpunk metropolis: modern responsive frontend, relational databases, and cloud REST APIs!',
    timeToComplete: '40h',
    tagline: 'Modern responsive frontend, relational databases, and cloud-ready Node APIs',
    icon: '🌐',
    badge: 'HIGH DEMAND',
    color: 'var(--yellow)',
    difficulty: 'Beginner to Full-Stack',
    duration: '6 Modules',
    modulesCount: 6,
    tags: ['HTML5 / CSS3', 'JavaScript ES6+', 'React & TS', 'PostgreSQL', 'Node.js / Express', 'Docker & CI/CD'],
    description: 'Build production-grade web software from pixel to database. Master semantic HTML5 & modern CSS Grid, core JavaScript interactivity & V8 runtime, declarative React with TypeScript, relational database architecture with PostgreSQL, RESTful microservices with Node.js & Express, and containerized cloud deployment with Docker & GitHub Actions.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-web-fullstack') || ROADMAP.phases[10],
    ]
  },
  {
    id: 'algorithms-dsa',
    title: 'The Trials of Algor: LeetCode & DSA Mastery',
    shortTitle: 'DSA & LeetCode',
    heroImage: '/images/retro_dsa_bg.png',
    heroBadge: 'ADVANCED · ARENA',
    heroDescription: 'Enter the Colosseum of Algor. Slay complexity monsters with interactive multi-language code runs across high-yield LeetCode trial chambers!',
    timeToComplete: '36h',
    tagline: 'Enter the Colosseum of Code: Slay Complexity Monsters with Pointers, Stacks, Trees & DP',
    icon: '⚔️',
    badge: 'COLOSSEUM ARENA',
    color: 'var(--green-bright)',
    difficulty: 'Intermediate to Advanced',
    duration: '8 Modules',
    modulesCount: 44,
    tags: ['Big-O', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees', 'Graphs', 'DP'],
    description: 'Step into the Grand Arena of Algor. Conquer high-yield algorithmic trial chambers across Big-O battle metrics, two-pointer duels, linked list labyrinths, monotonic stacks, binary search trees, and dynamic programming spells with multi-language execution in Python 3, Java, C++, or JavaScript.',
    phases: [
      ROADMAP.phases[1], // Phase 2: LeetCode Core (Modules 1-4)
      ROADMAP.phases[2], // Phase 3: LeetCode Advanced (Modules 5-8)
    ]
  },
  {
    id: 'python-intro',
    alias: 'python-backend',
    title: 'Chronicles of Python: Path of the Serpent Sage',
    shortTitle: 'Python',
    heroImage: '/images/custom_pixel_python_sage.png',
    heroBadge: 'BEGINNER · COURSE',
    heroDescription: "Learn programming fundamentals such as variables, control flow, and loops with the world's most popular and versatile coding language — Python!",
    timeToComplete: '22h',
    tagline: 'Master the Ancient Glyphs of Python 3, Object Forging, Data Alchemy & FastAPI Citadels',
    icon: '🐍',
    badge: 'SERPENT CODEX',
    color: '#4fc3f7',
    difficulty: 'Beginner to Intermediate',
    duration: '11 Modules',
    modulesCount: 11,
    tags: ['Python 3', 'Syntax', 'Functions', 'OOP', 'File I/O', 'REST APIs', 'Data Science', 'FastAPI'],
    description: 'The ultimate zero-to-hero Python odyssey. Decode the Serpent\'s Sacred Grammar from Hello World to loops, functions, collections, and classes in Beginner Foundations. Then choose your mastery path in Advanced Ecosystem Electives: Advanced OOP, File Serialization, Networking/APIs, Data Analytics, and FastAPI Web Citadels.',
    levels: [
      {
        id: 'beginner',
        title: 'Beginner Foundations',
        subtitle: 'From Hello World to Loops, Functions, Collections & Classes',
        badge: 'FOUNDATIONS',
        icon: '🌱',
        modulesCount: 6,
        phases: [ROADMAP.phases[7]] // phase-py-beginner
      },
      {
        id: 'intermediate',
        title: 'Advanced Ecosystem Electives',
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
    shortTitle: 'Systems & C',
    heroImage: '/images/custom_pixel_systems_core.png',
    heroBadge: 'SYSTEMS · COURSE',
    heroDescription: 'Master direct memory management, pointer arithmetic, stack vs heap allocation, and bare-metal systems with C & C++!',
    timeToComplete: '32h',
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
