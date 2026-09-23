// ─── Phase 6: The Realm of Users — Modern Full-Stack Frontend & React (Weeks 21–24) ───────────

export const phase6Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 21: Semantic HTML5, Modern CSS Layouts & Responsive Design
  // ════════════════════════════════════════════════════════════════
  'week-21': {
    lessons: [
      {
        title: 'Semantic HTML5 & Accessibility (a11y)',
        language: 'html',
        starterCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>Adventurer Guild</title>\n</head>\n<body>\n    <header>\n        <nav>\n            <a href="/">Home</a>\n            <a href="/quests">Quests</a>\n        </nav>\n    </header>\n    <main>\n        <article>\n            <h1>Dragon Hunt Quest</h1>\n            <p>Reward: 500 Gold Coins</p>\n        </article>\n    </main>\n    <footer>&copy; 2026 Adventurer Guild</footer>\n</body>\n</html>`,
        content: `
<h2>Why Semantic HTML?</h2>
<p>Instead of wrapping everything in meaningless <code>&lt;div&gt;</code> tags, HTML5 provides semantic structural elements:</p>
<ul>
  <li><code>&lt;header&gt;</code> & <code>&lt;footer&gt;</code>: Top branding/nav and legal/bottom info.</li>
  <li><code>&lt;nav&gt;</code>: Main navigation menus (announced explicitly to screen readers).</li>
  <li><code>&lt;main&gt;</code>: The central, unique content of the page.</li>
  <li><code>&lt;article&gt;</code> & <code>&lt;section&gt;</code>: Self-contained syndicatable content vs themed groupings.</li>
</ul>
<p>Semantic tags dramatically improve <strong>Search Engine Optimization (SEO)</strong> and accessibility (WCAG compliance).</p>
`,
      },
      {
        title: 'CSS Flexbox & CSS Grid Mastery',
        language: 'css',
        starterCode: `/* 1D Layout: Flexbox */\n.nav-bar {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 16px;\n}\n\n/* 2D Layout: CSS Grid */\n.quest-board {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 20px;\n}`,
        content: `
<h2>Modern Layout Engines</h2>
<h3>Flexbox (1-Dimensional)</h3>
<p>Designed for laying out items along a single axis (either a row or a column). Essential for toolbars, centered cards, and navigation bars.</p>

<h3>CSS Grid (2-Dimensional)</h3>
<p>Designed for laying out elements in both rows and columns simultaneously. <code>grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))</code> creates an ultra-responsive responsive layout that adapts automatically without media queries!</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Responsive Layout Calculations',
        language: 'javascript',
        starterCode: `function calculateColumns(containerWidth, minColWidth) {\n    return Math.floor(containerWidth / minColWidth);\n}\n\nconsole.log("Columns on 1200px screen:", calculateColumns(1200, 300));\nconsole.log("Columns on 500px screen:", calculateColumns(500, 300));`,
        expectedOutput: 'Columns on 1200px screen: 4\nColumns on 500px screen: 1',
        description: `
<h2>Exercise: Responsive Column Calculation</h2>
<p>Write a helper function calculating how many grid columns of minimum width 300px can fit in a given viewport width.</p>
`,
        hints: ['Use Math.floor(containerWidth / minColWidth).'],
      }
    ],
    quiz: [
      {
        question: 'When should you choose CSS Grid over Flexbox?',
        options: ['When styling button hover states', 'When designing a 2D layout requiring control over both rows and columns simultaneously', 'When targeting older mobile browsers', 'Flexbox is completely deprecated by CSS Grid'],
        correctIndex: 1,
        explanation: 'Flexbox excels at 1D alignment (a row or a column), whereas CSS Grid is purpose-built for comprehensive 2D layouts.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 22: Modern JavaScript (ES6+), DOM Manipulation & Events
  // ════════════════════════════════════════════════════════════════
  'week-22': {
    lessons: [
      {
        title: 'Modern ES6+ Syntax: Destructuring, Spread & Arrow Functions',
        language: 'javascript',
        starterCode: `const hero = { id: 1, name: 'Biruk', role: 'Archmage', level: 60 };\n\n// Object destructuring\nconst { name, role } = hero;\n\n// Spread operator\nconst updatedHero = { ...hero, level: 61, spells: ['Meteor', 'Teleport'] };\n\n// Concise arrow function\nconst summarize = ({ name, role, level }) => \`Hero \${name} (\${role}) is Level \${level}\`;\n\nconsole.log(summarize(updatedHero));`,
        content: `
<h2>Modern JavaScript Standards</h2>
<ul>
  <li><code>const</code> & <code>let</code>: Block-scoped declarations (abandon legacy <code>var</code>).</li>
  <li><strong>Destructuring:</strong> Extracting properties from objects and arrays in a single line.</li>
  <li><strong>Spread / Rest Operator (<code>...</code>):</strong> Immutably copying objects, combining arrays, and gathering function parameters.</li>
  <li><strong>Arrow Functions:</strong> Concise syntax with lexical <code>this</code> binding.</li>
</ul>
`,
      },
      {
        title: 'Functional Array Methods: Map, Filter, Reduce',
        language: 'javascript',
        starterCode: `const quests = [\n    { title: 'Goblin Ambush', reward: 50, completed: true },\n    { title: 'Dragon Lair', reward: 500, completed: false },\n    { title: 'Lost Relic', reward: 150, completed: true },\n];\n\n// Filter completed quests\nconst doneQuests = quests.filter(q => q.completed);\n\n// Map titles\nconst titles = doneQuests.map(q => q.title);\n\n// Sum total reward with reduce\nconst totalGold = doneQuests.reduce((sum, q) => sum + q.reward, 0);\n\nconsole.log("Completed Quests:", titles.join(', '));\nconsole.log("Total Gold Earned:", totalGold);`,
        content: `
<h2>Declarative Data Transformations</h2>
<p>Modern frontend development avoids raw <code>for</code> loops in favor of pure, chained functional array methods:</p>
<ul>
  <li><code>array.map(fn)</code>: Transforms every element into a new shape (1-to-1 mapping).</li>
  <li><code>array.filter(predicate)</code>: Retains only elements returning true.</li>
  <li><code>array.reduce(accumulatorFn, initial)</code>: Aggregates elements into a single accumulated result (sum, lookup object, nested list).</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'Array Pipeline: High-Value Item Processing',
        language: 'javascript',
        starterCode: `const items = [\n    { name: 'Health Potion', price: 10 },\n    { name: 'Excalibur', price: 1000 },\n    { name: 'Wooden Shield', price: 25 },\n    { name: 'Dragon Armor', price: 800 },\n];\n\n// TODO: Filter items with price >= 100, then extract their names, then sort alphabetically\nconst luxuryNames = items\n    .filter(item => item.price >= 100)\n    .map(item => item.name)\n    .sort();\n\nconsole.log(luxuryNames.join(', '));`,
        expectedOutput: 'Dragon Armor, Excalibur',
        description: `
<h2>Exercise: Functional Pipeline</h2>
<p>Filter the inventory to items costing at least 100 gold, map to their names, and sort them alphabetically.</p>
`,
        hints: ['Chain .filter() followed by .map() and .sort().'],
      }
    ],
    quiz: [
      {
        question: 'What does the spread operator (...) do when applied to an object?',
        options: ['It deep clones nested objects recursively', 'It shallow copies all enumerable properties into a new object', 'It deletes the object from memory', 'It converts the object into an array of keys'],
        correctIndex: 1,
        explanation: 'The spread operator performs a shallow copy of own enumerable properties, allowing clean immutable state updates.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 23: Asynchronous JavaScript, Promises & Fetch API
  // ════════════════════════════════════════════════════════════════
  'week-23': {
    lessons: [
      {
        title: 'The JavaScript Event Loop & Promises',
        language: 'javascript',
        starterCode: `console.log("1: Synchronous start");\n\nsetTimeout(() => {\n    console.log("3: Macrotask timer");\n}, 0);\n\nPromise.resolve().then(() => {\n    console.log("2: Microtask promise");\n});\n\nconsole.log("4: Synchronous end");`,
        content: `
<h2>The Single-Threaded Event Loop</h2>
<p>JavaScript is single-threaded. Non-blocking I/O is achieved through the <strong>Event Loop</strong>:</p>
<ol>
  <li><strong>Call Stack:</strong> Executes synchronous code.</li>
  <li><strong>Microtask Queue:</strong> High-priority tasks (<code>Promise.then</code>, <code>await</code> resumption). Runs immediately when the Call Stack empties.</li>
  <li><strong>Macrotask Queue:</strong> Timers (<code>setTimeout</code>), I/O events, and UI rendering.</li>
</ol>
`,
      },
      {
        title: 'Async/Await & Fetching Data from REST Backends',
        language: 'javascript',
        starterCode: `async function fetchGuildData() {\n    try {\n        // Conceptual fetch request\n        /*\n        const response = await fetch('/api/v1/guilds/1', {\n            headers: { 'Accept': 'application/json' }\n        });\n        if (!response.ok) {\n            throw new Error(\`HTTP Error: \${response.status}\`);\n        }\n        const data = await response.json();\n        return data;\n        */\n        return { id: 1, name: 'DragonSlayers', members: 12 };\n    } catch (err) {\n        console.error("Fetch failed:", err.message);\n        return null;\n    }\n}\n\nfetchGuildData().then(guild => console.log("Fetched Guild:", guild.name));`,
        content: `
<h2>Async/Await & The Fetch API</h2>
<p><code>async/await</code> provides clean, synchronous-looking syntax on top of native Promises.</p>
<div class="teacher-callout teacher-callout--trap">
  <strong>Crucial Fetch Detail:</strong> <code>fetch()</code> does NOT reject on HTTP 404 or 500 errors! It only rejects on network failures. You must always check <code>if (!response.ok) throw new Error(...)</code>!
</div>
`,
      }
    ],
    exercises: [
      {
        title: 'Promise Chain Aggregation',
        language: 'javascript',
        starterCode: `async function computeStats(nums) {\n    return new Promise((resolve) => {\n        const sum = nums.reduce((a, b) => a + b, 0);\n        const avg = sum / nums.length;\n        resolve({ sum, avg });\n    });\n}\n\ncomputeStats([10, 20, 30]).then(stats => {\n    console.log(\`Sum: \${stats.sum}, Avg: \${stats.avg}\`);\n});`,
        expectedOutput: 'Sum: 60, Avg: 20',
        description: `
<h2>Exercise: Async Promise Calculation</h2>
<p>Compute the sum and average asynchronously using a Promise.</p>
`,
        hints: ['Resolve the Promise with an object containing { sum, avg }.'],
      }
    ],
    quiz: [
      {
        question: 'Under what condition does fetch() reject its Promise?',
        options: ['When the server returns HTTP 404 Not Found', 'When the server returns HTTP 500 Internal Server Error', 'Only on network disconnection, DNS failure, or CORS block preventing response completion', 'When the response body is empty'],
        correctIndex: 2,
        explanation: 'fetch() fulfills successfully on any HTTP status code (including 4xx/5xx). You must inspect response.ok manually.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 24: Modern React: Components, Hooks, State & API Integration
  // ════════════════════════════════════════════════════════════════
  'week-24': {
    lessons: [
      {
        title: 'React Fundamentals: JSX, Props & State',
        language: 'javascript',
        starterCode: `// React Functional Component Paradigm\n/*\nimport { useState } from 'react';\n\nexport function Counter() {\n    const [count, setCount] = useState(0);\n\n    return (\n        <div className="card">\n            <h2>Level: {count}</h2>\n            <button onClick={() => setCount(prev => prev + 1)}>Level Up!</button>\n        </div>\n    );\n}\n*/\nconsole.log("React declarative UI: View = f(State)");`,
        content: `
<h2>The React Paradigm</h2>
<p>React is a declarative, component-based library for building user interfaces.</p>
<ul>
  <li><strong>JSX:</strong> Syntax extension letting you write HTML-like structures inside JavaScript.</li>
  <li><strong>Props:</strong> Read-only data passed downward from parent to child components.</li>
  <li><strong>State (<code>useState</code>):</strong> Internal component data that triggers a UI re-render when mutated via its setter function.</li>
</ul>
`,
      },
      {
        title: 'Side Effects with useEffect & Spring Boot API Consumption',
        language: 'javascript',
        starterCode: `// React Backend Integration\n/*\nimport { useState, useEffect } from 'react';\n\nexport function GuildList() {\n    const [guilds, setGuilds] = useState([]);\n    const [loading, setLoading] = useState(true);\n\n    useEffect(() => {\n        fetch('/api/v1/guilds')\n            .then(res => res.json())\n            .then(data => {\n                setGuilds(data);\n                setLoading(false);\n            });\n    }, []); // Empty dependency array = runs once on mount\n\n    if (loading) return <p>Loading guilds...</p>;\n    return <ul>{guilds.map(g => <li key={g.id}>{g.name}</li>)}</ul>;\n}\n*/\nconsole.log("useEffect manages component lifecycle and API data fetching!");`,
        content: `
<h2>useEffect & The Component Lifecycle</h2>
<p><code>useEffect(callback, dependencies)</code> lets functional components perform side effects (fetching data, subscribing to WebSockets, interacting with browser APIs):</p>
<ul>
  <li><code>dependencies: []</code> (empty array): Runs <strong>once</strong> when the component mounts.</li>
  <li><code>dependencies: [userId]</code>: Re-runs whenever <code>userId</code> changes.</li>
  <li><strong>Cleanup Function:</strong> Return a function from <code>useEffect</code> to cancel subscriptions or pending network timers when the component unmounts.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'Simulating React State Reducer',
        language: 'javascript',
        starterCode: `function questReducer(state, action) {\n    switch (action.type) {\n        case 'ADD_XP':\n            return { ...state, xp: state.xp + action.payload };\n        case 'SET_TITLE':\n            return { ...state, title: action.payload };\n        default:\n            return state;\n    }\n}\n\nlet state = { xp: 100, title: 'Novice' };\nstate = questReducer(state, { type: 'ADD_XP', payload: 50 });\nstate = questReducer(state, { type: 'SET_TITLE', payload: 'Adept' });\n\nconsole.log(\`Hero is \${state.title} with \${state.xp} XP\`);`,
        expectedOutput: 'Hero is Adept with 150 XP',
        description: `
<h2>Exercise: Immutable State Transitions</h2>
<p>Implement a state reducer that handles actions immutably, exactly like React's <code>useReducer</code>.</p>
`,
        hints: ['Always return a new object with the spread operator (...state) and updated fields.'],
      }
    ],
    quiz: [
      {
        question: 'Why must the dependency array in useEffect be specified carefully?',
        options: ['Omitting it causes the effect to run after every single render, potentially causing infinite API fetch loops', 'React throws a fatal compilation error if it is missing', 'It controls the CSS styling of the component', 'It dictates whether the component can use TypeScript'],
        correctIndex: 0,
        explanation: 'If dependencies are omitted, any state update inside the effect triggers another render, which triggers the effect again, causing an infinite loop.'
      }
    ],
    project: {
      title: 'Full-Stack React Client for the Spring Boot Guild API',
      description: `
<h2>Project: Full-Stack React + Spring Boot Guild Manager</h2>
<p>Build an interactive, modular React application that communicates with your Spring Boot backend REST endpoints to display guilds, recruit adventurers, filter by class, and update levels in real-time.</p>
`,
      language: 'javascript',
      starterCode: `console.log("⚔️ React Full-Stack Guild Interface ready!");`,
      requirements: [
        'Create modular React components (Navbar, GuildCard, AdventurerList, RecruitmentModal)',
        'Fetch backend data using useEffect and async/await with loading and error states',
        'Implement dynamic search and filter controls using modern array methods',
        'Handle POST requests to create new adventurers with immediate optimistic UI updates'
      ]
    }
  }
};
