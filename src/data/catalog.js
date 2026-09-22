// ─── CodeQuest Career Tracks Catalog ─────────────────────────────────────
import { ROADMAP } from './roadmap.js';

export const TRACKS = [
  {
    id: 'python-intro',
    alias: 'python-backend',
    title: 'Introduction to Python',
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
        phases: [ROADMAP.phases.find(p => p.id === 'phase-py-beginner')]
      },
      {
        id: 'intermediate',
        title: 'Advanced Ecosystem Electives',
        subtitle: 'Pick & Choose: Advanced OOP, File I/O, REST APIs, Data Science & FastAPI',
        badge: 'ELECTIVES',
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
    title: 'Web and Fullstack Development',
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
    duration: '12 Modules',
    modulesCount: 12,
    tags: ['HTML5 / CSS3', 'JavaScript ES6+', 'React & TS', 'PostgreSQL', 'Node.js / Express', 'Docker & CI/CD'],
    description: 'Build production-grade web software from pixel to database. Master semantic HTML5 & modern CSS Grid, core JavaScript interactivity & V8 runtime, declarative React with TypeScript, relational database architecture with PostgreSQL, RESTful microservices with Node.js & Express, and containerized cloud deployment with Docker & GitHub Actions.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-web-foundations'),
      ROADMAP.phases.find(p => p.id === 'phase-web-react-ts'),
      ROADMAP.phases.find(p => p.id === 'phase-web-backend-cloud'),
    ]
  },
  {
    id: 'algorithms-dsa',
    title: 'DSA and Leetcode Mastery',
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
    modulesCount: 8,
    tags: ['Big-O', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees', 'Graphs', 'DP'],
    description: 'Step into the Grand Arena of Algor. Conquer high-yield algorithmic trial chambers across Big-O battle metrics, two-pointer duels, linked list labyrinths, monotonic stacks, binary search trees, and dynamic programming spells with multi-language execution in Python 3, Java, C++, or JavaScript.',
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
    heroImage: '/images/retro_ml_bg.png',
    heroBadge: 'AI ARCHITECT · TRACK',
    heroDescription: 'From Python Developer to Production AI Architect: Master matrix calculus, classical statistical learning, deep learning, Transformers, LLMs, RAG, autonomous agents, and high-throughput vLLM MLOps!',
    timeToComplete: '85h',
    tagline: 'From Python Developer to Production AI Architect: Math, Deep Learning, LLMs & MLOps',
    icon: '🧠',
    badge: 'MOST COMPREHENSIVE',
    color: '#b388ff',
    difficulty: 'Intermediate to Production Architect',
    duration: '18 Modules',
    modulesCount: 18,
    tags: ['Linear Algebra', 'PyTorch', 'CNNs & ResNets', 'Transformers', 'LoRA / QLoRA', 'RAG & Agents', 'vLLM', 'MLOps'],
    description: 'The definitive mathematical and architectural journey from Python developer to production AI engineer. Master foundational matrix calculus & Bayesian probability, scikit-learn statistical learning, PyTorch deep learning dynamics & vision architectures, modern Transformer internals, LLM pre-training & fine-tuning with LoRA/QLoRA, production RAG & multi-agent systems, and enterprise MLOps with vLLM continuous batching and observability.',
    levels: [
      {
        id: 'math-classical',
        title: 'Mathematical & Classical Foundations',
        subtitle: 'Matrix Calculus, Optimization, Probability, and Statistical Learning',
        badge: 'FOUNDATIONS',
        icon: '📐',
        modulesCount: 7,
        phases: [
          ROADMAP.phases.find(p => p.id === 'phase-ml-math'),
          ROADMAP.phases.find(p => p.id === 'phase-ml-classical'),
        ]
      },
      {
        id: 'deeplearning-genai',
        title: 'Deep Learning & Generative AI',
        subtitle: 'PyTorch Dynamics, CNNs, Transformers, LLMs, LoRA, RAG & Agents',
        badge: 'DEEP LEARNING & LLMs',
        icon: '✨',
        modulesCount: 8,
        phases: [
          ROADMAP.phases.find(p => p.id === 'phase-ml-deeplearning'),
          ROADMAP.phases.find(p => p.id === 'phase-ml-genai'),
        ]
      },
      {
        id: 'mlops-production',
        title: 'Production MLOps & Systems',
        subtitle: 'High-Performance vLLM Serving, Continuous Batching, CI/CD & Observability',
        badge: 'PRODUCTION ARCHITECT',
        icon: '🛡️',
        modulesCount: 3,
        phases: [
          ROADMAP.phases.find(p => p.id === 'phase-ml-mlops'),
        ]
      }
    ],
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-ml-math'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-classical'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-deeplearning'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-genai'),
      ROADMAP.phases.find(p => p.id === 'phase-ml-mlops'),
    ]
  },
  {
    id: 'java-spring',
    title: 'Java Enterprise Development',
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
    duration: '12 Modules',
    modulesCount: 12,
    tags: ['Java 21', 'JVM Internals', 'OOP Sorcery', 'SQL & JDBC', 'Spring Boot 3', 'Microservices'],
    description: 'The premier enterprise engineering odyssey. Enter the JVM Citadel mastering memory runes, object-oriented architecture, and collections alchemy. Transition into relational vaults with PostgreSQL & JDBC, and forge production-grade microservices with Spring Boot 3.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-1'),
      ROADMAP.phases.find(p => p.id === 'phase-4'),
      ROADMAP.phases.find(p => p.id === 'phase-5'),
    ]
  },
  {
    id: 'systems-c',
    title: 'Low Level and Systems Programs',
    shortTitle: 'C/C++ Systems',
    heroImage: '/images/custom_pixel_systems_core.png',
    heroBadge: 'SYSTEMS · COURSE',
    heroDescription: 'Master direct memory management, pointer arithmetic, stack vs heap allocation, and bare-metal systems with C & C++!',
    timeToComplete: '32h',
    tagline: 'Master direct memory management, pointers, stack vs heap, and CPU registers',
    icon: '⚙️',
    badge: 'SYSTEMS ARCHITECTURE',
    color: '#ff80ab',
    difficulty: 'Advanced',
    duration: '8 Modules',
    modulesCount: 8,
    tags: ['C', 'C++ 17', 'Pointers', 'Stack & Heap', 'Memory Allocation', 'Assembly'],
    description: 'Understand what software is actually doing under the hood. Master pointer arithmetic, dynamic memory allocation with malloc and free, custom data structures from scratch, and C++ OOP abstractions.',
    phases: [
      ROADMAP.phases.find(p => p.id === 'phase-sys-1'),
    ]
  }
];

export function getTrack(trackId) {
  return TRACKS.find(t => t.id === trackId || t.alias === trackId) || TRACKS[0];
}
