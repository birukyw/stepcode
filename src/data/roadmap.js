// ─── Phase & Module structure + content loader ────────────────────
import { phase1Content } from './lessons/phase1.js';
import { phase2Content } from './lessons/phase2.js';
import { phase3Content } from './lessons/phase3.js';
import { phase4Content } from './lessons/phase4.js';
import { phase5Content } from './lessons/phase5.js';
import { phase6Content } from './lessons/phase6.js';
import { phase7Content } from './lessons/phase7.js';
import { pythonTrackContent } from './lessons/pythonTrack.js';
import { systemsTrackContent } from './lessons/systemsTrack.js';
import { webTrackContent } from './lessons/webTrack.js';
import { mlTrackContent } from './lessons/mlTrack.js';
import { pythonSyllabusContent, PYTHON_PHASES } from '../content/python/index.js';

const contentMap = {
  ...phase1Content,
  ...phase2Content,
  ...phase3Content,
  ...phase4Content,
  ...phase5Content,
  ...phase6Content,
  ...phase7Content,
  ...pythonTrackContent,
  ...systemsTrackContent,
  ...webTrackContent,
  ...mlTrackContent,
  // New Python SWE syllabus takes precedence for its module ids.
  ...pythonSyllabusContent,
};

export function getWeekContent(weekId) {
  return contentMap[weekId] || null;
}

export const ROADMAP = {
  title: "StepCode: Computer Science & Software Engineering Curriculum",
  phases: [
    {
      id: 'phase-1', number: 1,
      title: 'Java Language Foundations',
      subtitle: 'JVM Architecture, Memory & Object-Oriented Principles',
      icon: '🧙‍♂️', months: 'Java Foundations', weekRange: 'Modules 1–4', color: '#00e5ff',
      weeks: [
        { id: 'week-1', number: 1, moduleNumber: 1, title: 'JVM Architecture, Bytecode & Primitive Types',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-2', number: 2, moduleNumber: 2, title: 'Classes, Encapsulation & Object Memory Model',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-3', number: 3, moduleNumber: 3, title: 'Inheritance, Interfaces & Dynamic Dispatch',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-4', number: 4, moduleNumber: 4, title: 'Collections Framework, Generics & Exception Handling',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-2', number: 2,
      title: 'Data Structures & Algorithms I: Core Problem Solving',
      subtitle: 'Two Pointers, Sliding Window & Linear Structures',
      icon: '⚔️', months: 'DSA Core', weekRange: 'Modules 1–4', color: '#00e676',
      weeks: [
        { id: 'week-5', number: 5, moduleNumber: 1, title: 'Complexity Analysis, Two Pointers & Sliding Window',
          lessons: [{},{},{},{},{}], exercises: [{},{},{}], quiz: [1], project: false },
        { id: 'week-6', number: 6, moduleNumber: 2, title: 'Linked Lists & Fast-Slow Pointers',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-7', number: 7, moduleNumber: 3, title: 'Stacks, Queues & Monotonic Stack',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-8', number: 8, moduleNumber: 4, title: 'Hash Tables, Anagrams & Binary Search',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-3', number: 3,
      title: 'Data Structures & Algorithms II: Advanced Patterns',
      subtitle: 'Trees, Heaps, Graphs & Dynamic Programming',
      icon: '🧠', months: 'DSA Advanced', weekRange: 'Modules 5–8', color: '#ffea00',
      weeks: [
        { id: 'week-9', number: 9, moduleNumber: 5, title: 'Binary Trees & BST Traversals',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-10', number: 10, moduleNumber: 6, title: 'Heaps, Priority Queues & Top-K',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-11', number: 11, moduleNumber: 7, title: 'Graph Algorithms & Topological Sort',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-12', number: 12, moduleNumber: 8, title: 'Backtracking & Dynamic Programming',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-4', number: 4,
      title: 'Relational Databases & SQL',
      subtitle: 'Schema Design, Normalization, ACID & JDBC',
      icon: '🗄️', months: 'Month 4', weekRange: 'Modules 5–8', color: '#00e5ff',
      weeks: [
        { id: 'week-13', number: 13, moduleNumber: 5, title: 'Relational Databases & Schema Design',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-14', number: 14, moduleNumber: 6, title: 'SQL Joins, Aggregations & Window Functions',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-15', number: 15, moduleNumber: 7, title: 'Indexing Internals & ACID Transactions',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-16', number: 16, moduleNumber: 8, title: 'Connecting Java to DBs: JDBC & HikariCP',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-5', number: 5,
      title: 'Backend Engineering with Spring Boot 3',
      subtitle: 'Dependency Injection, REST APIs, JPA & Security',
      icon: '⚙️', months: 'Month 5', weekRange: 'Modules 9–12', color: '#00e676',
      weeks: [
        { id: 'week-17', number: 17, moduleNumber: 9, title: 'Spring Framework Core & IoC',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-18', number: 18, moduleNumber: 10, title: 'RESTful API Architecture & Validation',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-19', number: 19, moduleNumber: 11, title: 'Spring Data JPA & Hibernate Mapping',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-20', number: 20, moduleNumber: 12, title: 'Enterprise Security (JWT) & Testing',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-6', number: 6,
      title: 'Frontend Engineering: Web Standards & React',
      subtitle: 'HTML5, CSS3, ES6+ JS & React',
      icon: '🎨', months: 'Month 6', weekRange: 'Modules 21–24', color: '#ffea00',
      weeks: [
        { id: 'week-21', number: 21, title: 'Semantic HTML5 & Responsive CSS Layouts',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-22', number: 22, title: 'Modern JavaScript (ES6+) & DOM Engine',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-23', number: 23, title: 'Asynchronous JavaScript & Fetch API',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-24', number: 24, title: 'Modern React: Components, Hooks & State',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-7', number: 7,
      title: 'DevOps, Cloud Deployment & Capstone Architecture',
      subtitle: 'Docker, CI/CD, Cloud & Interviews',
      icon: '🐉', months: 'Month 7', weekRange: 'Modules 25–28', color: '#ff007f',
      weeks: [
        { id: 'week-25', number: 25, title: 'Distributed Version Control: Git Branching & Rebasing',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-26', number: 26, title: 'Containerization: Docker & Compose',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-27', number: 27, title: 'Continuous Integration & Deployment with GitHub Actions',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-28', number: 28, title: 'Full-Stack Capstone Architecture & Code Review',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-py-beginner', number: 8,
      title: 'Python Foundations (Beginner)',
      subtitle: 'Syntax, Control Flow, Loops, Functions, Collections & OOP',
      icon: '🌱', months: 'Beginner Foundations', weekRange: 'Modules 1–6', color: '#4fc3f7',
      weeks: [
        { id: 'py-week-1', number: 1, moduleNumber: 1, title: 'Hello World, Syntax & Primitive Types',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2,3], project: false },
        { id: 'py-week-2', number: 2, moduleNumber: 2, title: 'Control Flow, Logic & Decision Making',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: false },
        { id: 'py-week-3', number: 3, moduleNumber: 3, title: 'Loops & Iteration Patterns',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'py-week-4', number: 4, moduleNumber: 4, title: 'Functions, Signatures & Scope',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-week-5', number: 5, moduleNumber: 5, title: 'Built-in Collections & Comprehensions',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-week-6', number: 6, moduleNumber: 6, title: 'Classes & Object-Oriented Basics',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-py-intermediate', number: 9,
      title: 'Applied Python (Advanced Ecosystem Electives)',
      subtitle: 'Advanced OOP, Files, REST APIs, Data Science & FastAPI',
      icon: '⚡', months: 'Advanced Electives', weekRange: 'Modules 7–11', color: '#00e5ff',
      weeks: [
        { id: 'py-mod-oop', number: 7, moduleNumber: 7, title: 'Advanced OOP & Magic Methods',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-mod-files', number: 8, moduleNumber: 8, title: 'File Handling, JSON & Error Handling',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-mod-api', number: 9, moduleNumber: 9, title: 'Networking & Consuming REST APIs',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-mod-datasci', number: 10, moduleNumber: 10, title: 'Python for Data Science (Analytics)',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-mod-fastapi', number: 11, moduleNumber: 11, title: 'Web & API Engineering with FastAPI',
          lessons: [{},{},{},{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-sys-1', number: 10,
      title: 'C Memory Architecture & Low-Level Systems',
      subtitle: 'Direct Addressing, Pointers & Malloc',
      icon: '⚙️', months: 'Systems Track', weekRange: 'Module 1', color: '#ff80ab',
      weeks: [
        { id: 'sys-week-1', number: 1, title: 'Memory Model, Pointers & Dynamic Allocation',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
      ],
    },
    {
      id: 'phase-web-foundations', number: 11,
      title: 'Foundations of the Modern Web',
      subtitle: 'Semantic HTML5, CSS3 Grid/Flexbox, JS Engine & Async',
      icon: '🌐', months: 'Web Foundations', weekRange: 'Modules 1–4', color: '#ffea00',
      weeks: [
        { id: 'web-week-1', number: 1, moduleNumber: 1, title: 'The Canvas of the Web: HTML5 Architecture & Modern CSS3',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-2', number: 2, moduleNumber: 2, title: 'Modern CSS3, Flexbox & CSS Grid Mastery',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-3', number: 3, moduleNumber: 3, title: 'JavaScript Engine, Scopes, Closures & DOM Manipulation',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-4', number: 4, moduleNumber: 4, title: 'Asynchronous JavaScript, Promises & Network Protocols',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-web-react-ts', number: 12,
      title: 'Frontend Engineering with React & TypeScript',
      subtitle: 'Virtual DOM, State Management, TypeScript & SPA Routing',
      icon: '⚛️', months: 'Frontend Systems', weekRange: 'Modules 5–8', color: '#00e5ff',
      weeks: [
        { id: 'web-week-5', number: 5, moduleNumber: 5, title: 'React Architecture, JSX & Pure Component Trees',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-6', number: 6, moduleNumber: 6, title: 'State Management, Hooks & Side Effect Lifecycle',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-7', number: 7, moduleNumber: 7, title: 'TypeScript for Modern Frontend Architecture',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-8', number: 8, moduleNumber: 8, title: 'Single-Page Application (SPA) Routing & Global State',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-web-backend-cloud', number: 13,
      title: 'Backend Engines, Relational Data & Cloud Deployment',
      subtitle: 'PostgreSQL Relational Databases, Node APIs, Auth & Docker',
      icon: '🚀', months: 'Backend & Cloud', weekRange: 'Modules 9–12', color: '#00e676',
      weeks: [
        { id: 'web-week-9', number: 9, moduleNumber: 9, title: 'Relational Databases & PostgreSQL Mastery',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-10', number: 10, moduleNumber: 10, title: 'Server-Side Runtime: Node.js & Express RESTful APIs',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-11', number: 11, moduleNumber: 11, title: 'Full-Stack Integration, JWT Authentication & Security',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'web-week-12', number: 12, moduleNumber: 12, title: 'Production DevOps, Containerization with Docker & Cloud Launch',
          lessons: [{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-ml-math', number: 14,
      title: 'Mathematical Foundations for Machine Learning',
      subtitle: 'Linear Algebra, Matrix Calculus & Bayesian Statistics',
      icon: '📐', months: 'Mathematical Foundations', weekRange: 'Modules 1–3', color: '#b388ff',
      weeks: [
        { id: 'ml-week-1', number: 1, moduleNumber: 1, title: 'Linear Algebra & Matrix Calculus for Deep Learning',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2,3], project: true },
        { id: 'ml-week-2', number: 2, moduleNumber: 2, title: 'Multivariable Calculus, Gradients & Numerical Optimization',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2,3], project: true },
        { id: 'ml-week-3', number: 3, moduleNumber: 3, title: 'Probability, Information Theory & Bayesian Inference',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2,3], project: true },
      ],
    },
    {
      id: 'phase-ml-classical', number: 15,
      title: 'Classical Machine Learning & Statistical Learning',
      subtitle: 'Supervised Models, Ensembles, Unsupervised & Validation Systems',
      icon: '🌲', months: 'Statistical Learning', weekRange: 'Modules 4–7', color: '#7c4dff',
      weeks: [
        { id: 'ml-week-4', number: 4, moduleNumber: 4, title: 'Supervised Learning I: Linear & Logistic Models',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-5', number: 5, moduleNumber: 5, title: 'Supervised Learning II: Trees, Ensembles & Boosting',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-6', number: 6, moduleNumber: 6, title: 'Unsupervised Learning & Dimensionality Reduction',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-7', number: 7, moduleNumber: 7, title: 'ML Systems: Feature Engineering & Model Validation',
          lessons: [{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-ml-deeplearning', number: 16,
      title: 'Deep Learning Foundations & Architectures',
      subtitle: 'Neural Networks, Backpropagation, CNNs & Sequence Modeling',
      icon: '🧠', months: 'Deep Learning', weekRange: 'Modules 8–11', color: '#e040fb',
      weeks: [
        { id: 'ml-week-8', number: 8, moduleNumber: 8, title: 'Neural Network Architecture & Backpropagation',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-9', number: 9, moduleNumber: 9, title: 'Deep Learning Optimization & Training Dynamics',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-10', number: 10, moduleNumber: 10, title: 'Computer Vision & Convolutional Architectures',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-11', number: 11, moduleNumber: 11, title: 'Sequence Modeling: RNNs to Self-Attention',
          lessons: [{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-ml-genai', number: 17,
      title: 'Modern Generative AI, Transformers, and LLMs',
      subtitle: 'Transformers, Pre-training, LoRA/QLoRA, RAG & Autonomous Agents',
      icon: '✨', months: 'Generative AI & LLMs', weekRange: 'Modules 12–15', color: '#00e5ff',
      weeks: [
        { id: 'ml-week-12', number: 12, moduleNumber: 12, title: 'The Transformer Architecture in Depth',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-13', number: 13, moduleNumber: 13, title: 'LLM Training, Fine-Tuning & Alignment (LoRA/RLHF)',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-14', number: 14, moduleNumber: 14, title: 'Retrieval-Augmented Generation (RAG) Systems',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-15', number: 15, moduleNumber: 15, title: 'Autonomous AI Agents & Tool Calling',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    {
      id: 'phase-ml-mlops', number: 18,
      title: 'Production MLOps, Serving & Systems',
      subtitle: 'vLLM Serving, Pipelines, CI/CD, Observability & Guardrails',
      icon: '🛡️', months: 'Production MLOps', weekRange: 'Modules 16–18', color: '#ff4081',
      weeks: [
        { id: 'ml-week-16', number: 16, moduleNumber: 16, title: 'High-Performance Inference & Serving',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-17', number: 17, moduleNumber: 17, title: 'Pipelines, Experimentation & Artifact Tracking',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
        { id: 'ml-week-18', number: 18, moduleNumber: 18, title: 'Production Monitoring, Security & Governance',
          lessons: [{},{},{},{},{},{},{},{}], exercises: [{},{}], quiz: [1,2], project: true },
      ],
    },
    // Python SWE syllabus — 4 tracks · 22 modules · 115 lessons
    ...PYTHON_PHASES,
  ],
};

export function findWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    for (const week of phase.weeks) {
      if (week.id === weekId) return week;
    }
  }
  return null;
}

export function findPhaseForWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    if (phase.weeks.some(w => w.id === weekId)) return phase;
  }
  return ROADMAP.phases[0];
}
