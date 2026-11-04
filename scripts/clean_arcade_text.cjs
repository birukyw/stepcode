const fs = require('fs');
const path = require('path');

// 1. Clean roadmap.js
const roadmapPath = path.join(__dirname, '..', 'src', 'data', 'roadmap.js');
let roadmapContent = fs.readFileSync(roadmapPath, 'utf8');

const roadmapReplacements = [
  ['The Legend of Java: Quest for the Software Engineering Internship', 'StepCode: Computer Science & Software Engineering Curriculum'],
  ["title: 'The Awakening: Java Foundations'", "title: 'Java Language Foundations'"],
  ["subtitle: 'JVM Realms & Object Sorcery'", "subtitle: 'JVM Architecture, Memory & Object-Oriented Principles'"],
  ["title: 'The First Spell: JVM Architecture & Primitive Types'", "title: 'JVM Architecture, Bytecode & Primitive Types'"],
  ["title: 'Forging Objects: Classes, Encapsulation & Memory'", "title: 'Classes, Encapsulation & Object Memory Model'"],
  ["title: 'Bloodlines: Inheritance & Polymorphic Dispatch'", "title: 'Inheritance, Interfaces & Dynamic Dispatch'"],
  ["title: 'The Backpack: Collections Framework & Exceptions'", "title: 'Collections Framework, Generics & Exception Handling'"],
  ["title: 'The Trials of Algor I: LeetCode Core'", "title: 'Data Structures & Algorithms I: Core Problem Solving'"],
  ["subtitle: 'Two Pointers, Sliding Window & Stacks'", "subtitle: 'Two Pointers, Sliding Window & Linear Structures'"],
  ["title: 'The Trials of Algor II: LeetCode Advanced'", "title: 'Data Structures & Algorithms II: Advanced Patterns'"],
  ["subtitle: 'Trees, Heaps, Graphs & DP'", "subtitle: 'Trees, Heaps, Graphs & Dynamic Programming'"],
  ["title: 'The Vault of Data: SQL & PostgreSQL'", "title: 'Relational Databases & SQL'"],
  ["subtitle: 'Relational DBs, ACID & JDBC'", "subtitle: 'Schema Design, Normalization, ACID & JDBC'"],
  ["title: 'The Engine of Creation: Spring Boot 3'", "title: 'Backend Engineering with Spring Boot 3'"],
  ["subtitle: 'Enterprise Backend & REST APIs'", "subtitle: 'Dependency Injection, REST APIs, JPA & Security'"],
  ["title: 'The Realm of Users: Modern Frontend'", "title: 'Frontend Engineering: Web Standards & React'"],
  ["title: 'The Final Boss: DevOps & Capstone Launch'", "title: 'DevOps, Cloud Deployment & Capstone Architecture'"],
  ["title: 'The Git Forge: Branching & Rebasing'", "title: 'Distributed Version Control: Git Branching & Rebasing'"],
  ["title: 'Ascending to Cloud: GitHub Actions CI/CD'", "title: 'Continuous Integration & Deployment with GitHub Actions'"],
  ["title: 'The Capstone Trial & Interview Defense'", "title: 'Full-Stack Capstone Architecture & Code Review'"],
  ["title: 'JavaScript Engine, Scopes, Closures & DOM Sorcery'", "title: 'JavaScript Engine, Scopes, Closures & DOM Manipulation'"],
  ["subtitle: 'Virtual DOM, State Alchemy, TypeScript & SPA Routing'", "subtitle: 'Virtual DOM, State Management, TypeScript & SPA Routing'"],
  ["title: 'State Alchemy, Hooks & Side Effect Lifecycle'", "title: 'State Management, Hooks & Side Effect Lifecycle'"],
  ["title: 'TypeScript for Frontend Wizards'", "title: 'TypeScript for Modern Frontend Architecture'"],
  ["subtitle: 'PostgreSQL Relational Vaults, Node APIs, Auth & Docker'", "subtitle: 'PostgreSQL Relational Databases, Node APIs, Auth & Docker'"]
];

for (const [target, repl] of roadmapReplacements) {
  if (roadmapContent.includes(target)) {
    roadmapContent = roadmapContent.replace(target, repl);
  }
}
fs.writeFileSync(roadmapPath, roadmapContent, 'utf8');
console.log('roadmap.js titles updated successfully!');

// 2. Clean lesson files in src/data/lessons/
const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
const files = fs.readdirSync(lessonsDir);

const lessonReplacements = [
  // Remove pixel art containers
  [/<div class=\\"lesson-pixel-art\\">[\s\S]*?<\/div>\\n\\n?/g, ''],
  [/<div class="lesson-pixel-art">[\s\S]*?<\/div>\n\n?/g, ''],
  
  // Clean arcade phrases
  [/Entering the JVM Citadel\.\.\./g, 'Starting JVM runtime...'],
  [/the JVM Citadel/gi, 'the JVM runtime environment'],
  [/relational citadel/gi, 'relational database model'],
  [/FastAPI Citadels/gi, 'FastAPI services'],
  [/FastAPI web citadels/gi, 'FastAPI web services'],
  [/Citadel/g, 'Architecture'],
  [/citadels/g, 'systems'],
  
  [/The Awakening of the Serpent Sage/gi, 'Introduction to Python & Core Philosophy'],
  [/Serpent Sage/gi, 'Python Engineer'],
  [/Serpent's Sacred Grammar/gi, 'Python Core Syntax'],
  [/Serpent Order/gi, 'Python Community'],
  [/SERPENT CODEX/gi, 'CORE CONCEPT'],
  [/Ancient Glyphs of Python 3/gi, 'Fundamentals of Python 3'],
  [/ancient philosophical manifesto/gi, 'guiding philosophical design philosophy'],
  [/tenet runes/gi, 'core tenets'],
  [/Source Text Runes/gi, 'Source Code Text'],
  [/incantation echo through the console/gi, 'code output print directly to the console'],
  [/incantation/gi, 'code execution'],
  
  [/Colosseum of Algor/gi, 'Algorithms Studio'],
  [/Colosseum of Code/gi, 'Algorithms Lab'],
  [/Slay complexity monsters/gi, 'Master time and space complexity'],
  [/complexity monsters/gi, 'computational complexity'],
  [/trial chambers/gi, 'problem modules'],
  [/trial chamber/gi, 'problem module'],
  
  [/PrimitiveRunes/g, 'PrimitiveDataTypes'],
  [/Primitive Types, 2's Complement & Overflow Runes/g, "Primitive Types, 2's Complement & Numeric Overflow"],
  [/smallRune/g, 'smallNumber'],
  [/short mana = 32000;/g, 'short activeUsers = 32000;'],
  [/int goldCoins = 2_147_483_647;/g, 'int maxCounter = 2_147_483_647;'],
  [/Max Int: " \+ goldCoins/g, 'Max Int: " + maxCounter'],
  [/Overflow demon: adding 1 wraps to negative minimum!/g, 'Integer overflow: adding 1 wraps to negative minimum!'],
  [/goldCoins \+ 1/g, 'maxCounter + 1'],
  [/elementalGlyph/g, 'gradeSymbol'],
  
  [/bossHealth/g, 'remainingUnits'],
  [/playerAttack/g, 'decrementStep'],
  [/Boss HP left =/g, 'Remaining Units ='],
  [/Victory! Boss vanquished in/g, 'Process completed in'],
  [/strikes\./g, 'iterations.'],
  
  [/Object Sorcery/gi, 'Object-Oriented Design'],
  [/DOM Sorcery/gi, 'DOM Manipulation'],
  [/Frontend Wizards/gi, 'Frontend Engineers'],
  [/State Alchemy/gi, 'State Management'],
  [/Data Alchemy/gi, 'Data Processing'],
  [/Relational Vaults/gi, 'Relational Databases'],
  [/The Vault of Data/gi, 'Relational Databases'],
  [/The Backpack:/gi, 'Collections Framework:'],
  [/The Git Forge:/gi, 'Version Control:']
];

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const filePath = path.join(lessonsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalLen = content.length;

  for (const [pattern, repl] of lessonReplacements) {
    content = content.replace(pattern, repl);
  }

  if (content.length !== originalLen || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned arcade text from: ${file}`);
  }
}

console.log('All lesson files checked and cleaned!');
