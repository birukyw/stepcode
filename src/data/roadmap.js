// ─── Phase & Week structure + content loader ────────────────────
import { phase1Content } from './lessons/phase1.js';
import { phase2Content } from './lessons/phase2.js';
import { phase3Content } from './lessons/phase3.js';
import { phase4Content } from './lessons/phase4.js';
import { phase5Content } from './lessons/phase5.js';
import { phase6Content } from './lessons/phase6.js';
import { phase7Content } from './lessons/phase7.js';
import { pythonTrackContent } from './lessons/pythonTrack.js';
import { systemsTrackContent } from './lessons/systemsTrack.js';

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
};

export function getWeekContent(weekId) {
  return contentMap[weekId] || null;
}

export const ROADMAP = {
  title: "The Legend of Java: Quest for the Software Engineering Internship",
  phases: [
    {
      id: 'phase-1', number: 1,
      title: 'The Awakening: Java Foundations',
      subtitle: 'Memory Model & OOP',
      icon: '🧙‍♂️', months: 'Month 1', weekRange: 'Weeks 1–4', color: '#00e5ff',
      weeks: [
        { id: 'week-1', number: 1, title: 'The First Spell: JVM & Types',
          lessons: [{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-2', number: 2, title: 'Forging Objects: Classes & Encapsulation',
          lessons: [{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-3', number: 3, title: 'Bloodlines: Inheritance & Polymorphism',
          lessons: [{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-4', number: 4, title: 'The Backpack: Collections & Exceptions',
          lessons: [{},{},{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-2', number: 2,
      title: 'The Trials of Data I: LeetCode Core',
      subtitle: 'Two Pointers, Sliding Window & Stacks',
      icon: '🧩', months: 'Month 2', weekRange: 'Weeks 5–8', color: '#00e676',
      weeks: [
        { id: 'week-5', number: 5, title: 'Big-O, Two Pointers & Sliding Window',
          lessons: [{},{},{},{}], exercises: [{},{},{}], quiz: [1], project: false },
        { id: 'week-6', number: 6, title: 'Linked Lists & Fast-Slow Pointers',
          lessons: [{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-7', number: 7, title: 'Stacks, Queues & Monotonic Stack',
          lessons: [{},{}], exercises: [{},{}], quiz: [1], project: true },
        { id: 'week-8', number: 8, title: 'Hash Tables, Anagrams & Binary Search',
          lessons: [{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-3', number: 3,
      title: 'The Trials of Data II: LeetCode Advanced',
      subtitle: 'Trees, Heaps, Graphs & DP',
      icon: '🧠', months: 'Month 3', weekRange: 'Weeks 9–12', color: '#ffea00',
      weeks: [
        { id: 'week-9', number: 9, title: 'Binary Trees & BST Traversals',
          lessons: [{},{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-10', number: 10, title: 'Heaps, Priority Queues & Top-K',
          lessons: [{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-11', number: 11, title: 'Graph Algorithms & Topological Sort',
          lessons: [{},{}], exercises: [{},{}], quiz: [1], project: false },
        { id: 'week-12', number: 12, title: 'Backtracking & Dynamic Programming',
          lessons: [{},{}], exercises: [{},{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-4', number: 4,
      title: 'The Vault of Data: SQL & PostgreSQL',
      subtitle: 'Relational DBs, ACID & JDBC',
      icon: '🗄️', months: 'Month 4', weekRange: 'Weeks 13–16', color: '#00e5ff',
      weeks: [
        { id: 'week-13', number: 13, title: 'Relational Databases & Schema Design',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-14', number: 14, title: 'SQL Joins, Aggregations & Window Functions',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-15', number: 15, title: 'Indexing Internals & ACID Transactions',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-16', number: 16, title: 'Connecting Java to DBs: JDBC & HikariCP',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-5', number: 5,
      title: 'The Engine of Creation: Spring Boot 3',
      subtitle: 'Enterprise Backend & REST APIs',
      icon: '⚙️', months: 'Month 5', weekRange: 'Weeks 17–20', color: '#00e676',
      weeks: [
        { id: 'week-17', number: 17, title: 'Spring Framework Core & IoC',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-18', number: 18, title: 'RESTful API Architecture & Validation',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-19', number: 19, title: 'Spring Data JPA & Hibernate Mapping',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-20', number: 20, title: 'Enterprise Security (JWT) & Testing',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-6', number: 6,
      title: 'The Realm of Users: Modern Frontend',
      subtitle: 'HTML5, CSS3, ES6+ JS & React',
      icon: '🎨', months: 'Month 6', weekRange: 'Weeks 21–24', color: '#ffea00',
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
      title: 'The Final Boss: DevOps & Capstone Launch',
      subtitle: 'Docker, CI/CD, Cloud & Interviews',
      icon: '🐉', months: 'Month 7', weekRange: 'Weeks 25–28', color: '#ff007f',
      weeks: [
        { id: 'week-25', number: 25, title: 'The Git Forge: Branching & Rebasing',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-26', number: 26, title: 'Containerization: Docker & Compose',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-27', number: 27, title: 'Ascending to Cloud: GitHub Actions CI/CD',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'week-28', number: 28, title: 'The Capstone Trial & Interview Defense',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: true },
      ],
    },
    {
      id: 'phase-py-1', number: 8,
      title: 'Python Core & Backend Foundations',
      subtitle: 'Pythonic OOP, Data Structures & REST APIs',
      icon: '🐍', months: 'Python Track', weekRange: 'Weeks 1–2', color: '#4fc3f7',
      weeks: [
        { id: 'py-week-1', number: 1, title: 'Python 3 Foundations & Data Structures',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
        { id: 'py-week-2', number: 2, title: 'Pythonic OOP & Magic Methods',
          lessons: [{}], exercises: [{}], quiz: [1], project: false },
      ],
    },
    {
      id: 'phase-sys-1', number: 9,
      title: 'C Memory Architecture & Low-Level Systems',
      subtitle: 'Direct Addressing, Pointers & Malloc',
      icon: '⚙️', months: 'Systems Track', weekRange: 'Week 1', color: '#ff80ab',
      weeks: [
        { id: 'sys-week-1', number: 1, title: 'Memory Model, Pointers & Dynamic Allocation',
          lessons: [{},{}], exercises: [{}], quiz: [1], project: false },
      ],
    },
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
