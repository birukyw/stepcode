// ─── Web & Full-Stack Development: The Cyberpunk Web Foundry ─────────────────────
// Comprehensive Retro-RPG Curriculum: Modules 1–12 (3 Phases, 60 Lessons)
// Full-Stack Architecture, Frontend React/TS, Databases, Backend APIs & DevOps

export const webTrackContent = {
  "web-week-1": {
    "lessons": [
      {
        "title": "Anatomy of the Modern Web: Clients, Servers & The Rendering Pipeline",
        "language": "javascript",
        "starterCode": "// The Anatomy of an HTTP Request / Response Cycle\nconsole.log(\"🌐 Initiating DNS Lookup for 'https://cyberquest.dev'...\");\nconst simulatedDns = { domain: 'cyberquest.dev', ip: '198.51.100.42' };\nconsole.log(`Resolved IP: ${simulatedDns.ip}`);\n\n// TCP 3-Way Handshake -> TLS Handshake -> HTTP GET /\nconsole.log(\"Client sends: GET / HTTP/2 -> Server returns: HTML Payload (200 OK)\");\nconsole.log(\"Browser parsing: HTML Tokens -> DOM Tree -> CSSOM -> Layout -> Paint\");\n",
        "content": "<h2>🌐 Chapter 1: Anatomy of the Modern Web</h2>\n<div class=\"lesson-pixel-art\">\n  <img src=\"/images/retro_fullstack_bg.png\" alt=\"Cyberpunk Fullstack Web Foundry\" />\n  <div class=\"pixel-caption\">SECTOR 01: THE DIGITAL ETHER — HOW PACKETS BECOME INTERACTIVE PIXELS</div>\n</div>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome to the Cyberpunk Web Foundry, initiate architect! Before assembling massive client-side applications, you must understand what actually happens when a user types a URL and how packets become interactive pixels.</em>\n</div>\n<h3>The Holy Trinity of the Web</h3>\n<ul>\n  <li><strong>HTML5 (Structure):</strong> The skeletal blueprint: headings, paragraphs, buttons, navigation links, and forms.</li>\n  <li><strong>CSS3 (Presentation):</strong> Visual armor and aesthetics: typography, colors, animations, and responsive layouts.</li>\n  <li><strong>JavaScript (Behavior):</strong> The neural engine: dynamic interactivity, state mutation, and network requests.</li>\n</ul>\n<h3>The Critical Rendering Path</h3>\n<ol>\n  <li><strong>DOM Construction:</strong> Bytes &rarr; Characters &rarr; Tokens &rarr; DOM Nodes &rarr; DOM Tree.</li>\n  <li><strong>CSSOM Construction:</strong> Stylesheets parsed into the CSS Object Model.</li>\n  <li><strong>Render Tree:</strong> Visible DOM nodes paired with matching CSS rules.</li>\n  <li><strong>Layout (Reflow):</strong> Computing exact element coordinates and bounding boxes.</li>\n  <li><strong>Paint & Composite:</strong> Pixels rasterized to layers and composited onto the screen.</li>\n</ol>"
      },
      {
        "title": "The Structural Skeleton: Semantic HTML5 & Document Outlines",
        "language": "html",
        "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head><meta charset=\"UTF-8\"><title>Cyber Portal</title></head>\n<body>\n  <header>\n    <nav><a href=\"#home\">Home</a> | <a href=\"#vault\">Vault</a></nav>\n  </header>\n  <main>\n    <article>\n      <h1>Net Runner Protocol</h1>\n      <p>Decentralized nodes activated in Sector 9.</p>\n    </article>\n  </main>\n  <footer><p>&copy; 2088 Cyber Foundry</p></footer>\n</body>\n</html>\n",
        "content": "<h2>🌐 Chapter 2: Semantic HTML5 & Clean Architecture</h2>\n<p>Ditch the <code>&lt;div&gt;</code> soup! Semantic tags give your page meaning for search engines (SEO) and screen readers:</p>\n<ul>\n  <li><code>&lt;header&gt;</code>: Top banner, branding, primary navigation.</li>\n  <li><code>&lt;nav&gt;</code>: Navigation link collections.</li>\n  <li><code>&lt;main&gt;</code>: Sole central topic of the page (strictly unique per document).</li>\n  <li><code>&lt;article&gt;</code>: Standalone, redistributable card or story.</li>\n  <li><code>&lt;section&gt;</code>: Thematic content block with its own heading.</li>\n  <li><code>&lt;footer&gt;</code>: Page metadata, legal copyright, and secondary links.</li>\n</ul>"
      },
      {
        "title": "Interactive Forms, Validations & User Input Controls",
        "language": "html",
        "starterCode": "<form action=\"/api/register\" method=\"POST\">\n  <fieldset>\n    <legend>Gladiator Registration</legend>\n    <label for=\"handle\">Net Runner Codename:</label>\n    <input type=\"text\" id=\"handle\" name=\"handle\" required minlength=\"3\" maxlength=\"20\">\n\n    <label for=\"email\">Neural Comms Email:</label>\n    <input type=\"email\" id=\"email\" name=\"email\" required>\n\n    <button type=\"submit\">Jack In</button>\n  </fieldset>\n</form>\n",
        "content": "<h2>🌐 Chapter 3: Form Architecture & Native Validation</h2>\n<p>Forms are the primary interaction portal on the web. Native HTML5 constraints provide instant feedback before network submission:</p>\n<ul>\n  <li><code>required</code>: Blocks submission until filled.</li>\n  <li><code>type=\"email\"</code>: Enforces valid email syntax patterns.</li>\n  <li><code>minlength</code> / <code>maxlength</code>: Bounds string lengths at the browser level.</li>\n  <li><code>&lt;label for=\"id\"&gt;</code>: Connects descriptive text directly to the input target for accessibility.</li>\n</ul>"
      },
      {
        "title": "Multimedia, Modern Asset Delivery & The Picture Element",
        "language": "html",
        "starterCode": "<picture>\n  <source srcset=\"/images/hero.avif\" type=\"image/avif\">\n  <source srcset=\"/images/hero.webp\" type=\"image/webp\">\n  <img src=\"/images/hero.jpg\" alt=\"Cyberpunk City Skyline\" loading=\"lazy\" width=\"800\" height=\"450\">\n</picture>\n",
        "content": "<h2>🌐 Chapter 4: Modern Image Optimization & The Picture Element</h2>\n<p>Serving modern image formats cuts payload sizes by over 50% without quality loss:</p>\n<ul>\n  <li><strong>AVIF & WebP:</strong> High-compression modern formats supported across evergreen browsers.</li>\n  <li><code>&lt;picture&gt;</code>: Negotiates image formats and responsive viewports automatically.</li>\n  <li><code>loading=\"lazy\"</code>: Postpones downloading offscreen images until scrolled near viewport.</li>\n</ul>"
      },
      {
        "title": "Web Accessibility (a11y), ARIA Roles & Screen Reader Semantics",
        "language": "html",
        "starterCode": "<div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" class=\"cyber-modal\">\n  <h2 id=\"modal-title\">Overclock Confirmation</h2>\n  <p>Are you sure you want to engage maximum overclock?</p>\n  <button type=\"button\" aria-label=\"Confirm overclock\">Engage</button>\n</div>\n",
        "content": "<h2>🌐 Chapter 5: Web Accessibility (a11y) & Inclusive Engineering</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ACCESSIBILITY MANDATE:</strong> <em>The web must be universally operable by everyone, including users relying on keyboard navigation and screen readers.</em>\n</div>\n<p>Follow the Golden Rule: <strong>Never use ARIA when a native semantic HTML element exists.</strong> When building custom dialogs, use <code>role=\"dialog\"</code> and <code>aria-modal=\"true\"</code> to trap assistive focus correctly.</p>"
      }
    ],
    "exercises": [
      {
        "title": "Semantic Document Outlining",
        "instructions": "Construct a semantic HTML5 page using header, nav, main, article, and footer tags.",
        "starterCode": "<!-- Build your semantic layout here -->",
        "solution": "<header><nav><a href=\"/\">Home</a></nav></header><main><article><h1>Cyberpunk</h1></article></main><footer>&copy; 2088</footer>",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed semantic checks"
          }
        ]
      },
      {
        "title": "Accessible Form with Native Validations",
        "instructions": "Create a registration form containing email, password, and a submit button.",
        "starterCode": "<form></form>",
        "solution": "<form><input type=\"email\" required><input type=\"password\" required minlength=\"8\"><button type=\"submit\">Submit</button></form>",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed form checks"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 1 Mastery Quiz: HTML5 & Web Anatomy",
      "questions": [
        {
          "question": "What is the First Rule of ARIA?",
          "options": [
            "Always add aria-label to every element",
            "Do not use ARIA if a native HTML element already exists with the required semantics",
            "ARIA is only for mobile applications",
            "ARIA replaces HTML tags"
          ],
          "correct": 1,
          "explanation": "Native HTML elements have built-in accessibility features; ARIA is only for custom widgets."
        },
        {
          "question": "Which step in the browser rendering pipeline calculates element coordinates and sizes?",
          "options": [
            "DOM Construction",
            "CSSOM Parsing",
            "Layout (Reflow)",
            "Compositing"
          ],
          "correct": 2,
          "explanation": "Layout (Reflow) computes the exact geometric positions and dimensions of all render tree boxes."
        }
      ]
    },
    "project": {
      "title": "Cyberpunk Net Terminal Portal",
      "scenario": "Construct an accessible, fully semantic HTML5 headquarters page for the Net Runner Guild with navigation, picture hero, and registration terminal.",
      "starterCode": "<!DOCTYPE html>\n<html lang=\"en\">\n<head><meta charset=\"UTF-8\"><title>Net Terminal</title></head>\n<body>\n  <!-- Build semantic portal -->\n</body>\n</html>",
      "requirements": [
        "Include header with accessible nav",
        "Use main with at least two article cards",
        "Provide a picture element with WebP and fallback",
        "Include an interactive form with labels and validation"
      ]
    }
  },
  "web-week-2": {
    "lessons": [
      {
        "title": "The Box Model Alchemy & CSS Custom Properties (Variables)",
        "language": "css",
        "starterCode": ":root {\n  --neon-cyan: #00f0ff;\n  --neon-pink: #ff0055;\n  --bg-dark: #0a0b10;\n  --font-mono: 'JetBrains Mono', monospace;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.card {\n  background-color: var(--bg-dark);\n  border: 1px solid var(--neon-cyan);\n  padding: 1.5rem;\n  color: #fff;\n}\n",
        "content": "<h2>🎨 Chapter 1: The Box Model & CSS Variables</h2>\n<p>Every element in CSS is a rectangular box. By default, <code>content-box</code> adds padding and border to the declared width, causing overflow bugs. The modern industry standard is <code>box-sizing: border-box</code>:</p>\n<pre class=\"ascii-diagram\">\n+------------------------------------+\n|  Margin (Transparent spacing)       |\n|  +------------------------------+  |\n|  |  Border (Outline stroke)     |  |\n|  |  +------------------------+  |  |\n|  |  |  Padding (Inner space) |  |  |\n|  |  |  +------------------+  |  |  |\n|  |  |  |  Content (Width) |  |  |  |\n|  |  |  +------------------+  |  |  |\n|  |  +------------------------+  |  |\n|  +------------------------------+  |\n+------------------------------------+\n</pre>\n<p>CSS Custom Properties (Variables) defined under <code>:root</code> enable dynamic theme toggling, maintainable design systems, and rapid responsive adjustments.</p>"
      },
      {
        "title": "Responsive Design, Media Queries & Mobile-First Philosophy",
        "language": "css",
        "starterCode": "/* Mobile-first base styles (default for all screens) */\n.grid-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n/* Tablet breakpoint */\n@media (min-width: 768px) {\n  .grid-container {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Desktop breakpoint */\n@media (min-width: 1024px) {\n  .grid-container {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n",
        "content": "<h2>🎨 Chapter 2: Responsive Design & Mobile-First Media Queries</h2>\n<p>Over 55% of global web traffic originates from mobile devices. The <strong>Mobile-First</strong> strategy writes base CSS for small screens first, then uses <code>min-width</code> media queries to progressively enhance the experience as screen width expands.</p>"
      },
      {
        "title": "Flexbox Layouts: Alignment, Flex-Grow & Fluid Interfaces",
        "language": "css",
        "starterCode": ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n}\n\n.nav-links {\n  display: flex;\n  gap: 1.5rem;\n  list-style: none;\n}\n\n.hero-badge {\n  flex-shrink: 0;\n}\n",
        "content": "<h2>🎨 Chapter 3: One-Dimensional Layouts with Flexbox</h2>\n<p>Flexbox manages distribution along a single axis (either row or column). Key properties:</p>\n<ul>\n  <li><code>justify-content</code>: Aligns children along the Main Axis (e.g. <code>space-between</code>, <code>center</code>).</li>\n  <li><code>align-items</code>: Aligns children along the Cross Axis (e.g. <code>center</code>, <code>stretch</code>).</li>\n  <li><code>flex-grow</code>, <code>flex-shrink</code>, <code>flex-basis</code>: Dictates how items expand or compress to fill available space.</li>\n</ul>"
      },
      {
        "title": "Two-Dimensional Mastery: CSS Grid, Template Areas & Subgrid",
        "language": "css",
        "starterCode": ".dashboard {\n  display: grid;\n  grid-template-columns: 260px 1fr;\n  grid-template-rows: 70px 1fr 50px;\n  grid-template-areas:\n    \"sidebar header\"\n    \"sidebar main\"\n    \"sidebar footer\";\n  min-height: 100vh;\n}\n\n.sidebar { grid-area: sidebar; }\n.header  { grid-area: header; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n",
        "content": "<h2>🎨 Chapter 4: Two-Dimensional Grid Architecture</h2>\n<p>CSS Grid handles both rows AND columns simultaneously. With <code>grid-template-areas</code>, you can visually map layout zones with semantic ASCII-like names, producing self-documenting stylesheets.</p>"
      },
      {
        "title": "Modern CSS Transitions, Keyframe Animations & Micro-Interactions",
        "language": "css",
        "starterCode": ".cyber-btn {\n  background: #00f0ff;\n  color: #000;\n  border: none;\n  padding: 0.8rem 1.6rem;\n  font-weight: 700;\n  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;\n}\n\n.cyber-btn:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 0 15px rgba(0, 240, 255, 0.6);\n}\n\n@keyframes pulseGlow {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.4; }\n}\n.status-led {\n  animation: pulseGlow 2s infinite ease-in-out;\n}\n",
        "content": "<h2>🎨 Chapter 5: CSS Animations & Tactile Micro-Interactions</h2>\n<p>Smooth transitions give an interface a living, tactile personality. Always animate <strong>composite-friendly properties</strong> (<code>transform</code> and <code>opacity</code>) to leverage GPU hardware acceleration and avoid triggering CPU layout reflows!</p>"
      }
    ],
    "exercises": [
      {
        "title": "Responsive Flexbox Navigation Bar",
        "instructions": "Build a navbar using display: flex with space-between alignment and a gap between items.",
        "starterCode": ".nav { /* Your styles */ }",
        "solution": ".nav { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed flex checks"
          }
        ]
      },
      {
        "title": "CSS Grid Dashboard Layout",
        "instructions": "Define a 3-column auto-fitting responsive grid using repeat(auto-fit, minmax(250px, 1fr)).",
        "starterCode": ".grid { /* Your styles */ }",
        "solution": ".grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed grid checks"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 2 Mastery Quiz: CSS3, Flexbox & Grid",
      "questions": [
        {
          "question": "Which CSS property allows padding and border to be included in an element's total width and height?",
          "options": [
            "box-sizing: border-box",
            "box-sizing: content-box",
            "display: flex",
            "overflow: hidden"
          ],
          "correct": 0,
          "explanation": "border-box includes padding and border within the declared width, preventing layout overflow."
        },
        {
          "question": "Which CSS properties can the browser animate on the GPU without triggering layout or repaint?",
          "options": [
            "width and height",
            "transform and opacity",
            "margin and padding",
            "top and left"
          ],
          "correct": 1,
          "explanation": "transform and opacity are composite-only properties processed directly by the GPU."
        }
      ]
    },
    "project": {
      "title": "Responsive Cyberpunk Dashboard",
      "scenario": "Assemble a responsive grid dashboard layout with CSS custom property theming, flexbox header, and hover micro-animations.",
      "starterCode": ".dashboard { /* assemble dashboard */ }",
      "requirements": [
        "Use CSS variables for theme palette",
        "Implement box-sizing: border-box globally",
        "Build responsive grid with minmax()",
        "Add smooth GPU-accelerated hover transitions"
      ]
    }
  },
  "web-week-3": {
    "lessons": [
      {
        "title": "The JavaScript Runtime: V8 Engine, Execution Context & Call Stack",
        "language": "javascript",
        "starterCode": "// Call Stack and Execution Context\nfunction first() {\n  console.log(\"Entering first()\");\n  second();\n  console.log(\"Exiting first()\");\n}\n\nfunction second() {\n  console.log(\"Inside second()\");\n}\n\nfirst();\n",
        "content": "<h2>⚡ Chapter 1: The JavaScript Runtime & Execution Context</h2>\n<p>JavaScript is a single-threaded language powered by an engine (like Google Chrome's V8). When code executes:</p>\n<ol>\n  <li><strong>Creation Phase:</strong> Allocates memory for variables and functions (Hoisting).</li>\n  <li><strong>Execution Phase:</strong> Executes code line by line, pushing and popping frames onto the Call Stack.</li>\n</ol>"
      },
      {
        "title": "Scopes, Lexical Environments & Closure Enchantments",
        "language": "javascript",
        "starterCode": "function createCounter(initial = 0) {\n  let count = initial; // Encapsulated in lexical scope\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    getCount: () => count\n  };\n}\n\nconst playerXP = createCounter(100);\nconsole.log(playerXP.increment()); // 101\nconsole.log(playerXP.getCount());  // 101\n",
        "content": "<h2>⚡ Chapter 2: Scopes & Closures</h2>\n<p>A <strong>Closure</strong> is the combination of a function bundled with references to its surrounding state (lexical environment). Closures let inner functions access outer variables even after the outer function has returned, providing true data privacy.</p>"
      },
      {
        "title": "Modern ES6+ Syntax: Destructuring, Spread, Rest & Array Alchemy",
        "language": "javascript",
        "starterCode": "const warrior = { id: 42, name: 'Kael', stats: { hp: 500, mp: 200 } };\nconst { name, stats: { hp } } = warrior;\n\nconst inventory = ['Sword', 'Shield', 'Potion'];\nconst [primary, ...rest] = inventory;\nconst newInventory = [...inventory, 'Elixir'];\n\nconst doubleValues = [1, 2, 3].map(n => n * 2); // [2, 4, 6]\n",
        "content": "<h2>⚡ Chapter 3: ES6+ Syntax: Destructuring, Spread & Functional Arrays</h2>\n<p>Modern JavaScript prioritizes declarative patterns: destructuring unlocks properties cleanly, the spread operator (<code>...</code>) clones data immutably, and array methods (<code>map</code>, <code>filter</code>, <code>reduce</code>) process data without imperative loops.</p>"
      },
      {
        "title": "Awakening the DOM: Selecting, Modifying & Manipulating Nodes",
        "language": "javascript",
        "starterCode": "// Modern DOM Selection and Mutation\nconst card = document.querySelector('.player-card');\ncard.classList.add('active');\n\nconst title = document.createElement('h3');\ntitle.textContent = 'Cyber Champion';\ncard.appendChild(title);\n",
        "content": "<h2>⚡ Chapter 4: DOM Manipulation & Clean Tree Mutation</h2>\n<p>The Document Object Model (DOM) is the programmatic representation of your HTML document. Use <code>document.querySelector</code> to find elements, <code>classList</code> to toggle CSS states, and <code>document.createElement</code> to dynamically assemble UI.</p>"
      },
      {
        "title": "Event Architecture: Bubbling, Capturing & Delegation",
        "language": "javascript",
        "starterCode": "// Event Delegation on parent container\nconst list = document.querySelector('#quest-list');\n\nlist.addEventListener('click', (event) => {\n  const target = event.target.closest('.quest-item');\n  if (!target) return;\n  console.log(\"Clicked quest:\", target.dataset.questId);\n});\n",
        "content": "<h2>⚡ Chapter 5: Event Delegation & Event Bubbling</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ EVENT PROPAGATION:</strong> <em>Events flow down the tree during Capturing, trigger on the target, and bubble back up through ancestors.</em>\n</div>\n<p>Instead of attaching 10,000 click listeners to 10,000 table rows, attach a <strong>single event listener</strong> to the parent element and inspect <code>event.target</code> via <strong>Event Delegation</strong>.</p>"
      }
    ],
    "exercises": [
      {
        "title": "Closure State Factory",
        "instructions": "Write a function createScoreKeeper that encapsulates score and returns addPoints and getScore methods.",
        "starterCode": "function createScoreKeeper() {}",
        "solution": "function createScoreKeeper() { let s = 0; return { addPoints: (p) => s += p, getScore: () => s }; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed closure test"
          }
        ]
      },
      {
        "title": "Event Delegation Handler",
        "instructions": "Attach a click event listener to a container that handles button clicks via event.target.matches(\"button\").",
        "starterCode": "function setupDelegation(el) {}",
        "solution": "function setupDelegation(el) { el.addEventListener(\"click\", e => { if (e.target.matches(\"button\")) e.target.classList.add(\"clicked\"); }); }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed delegation test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 3 Mastery Quiz: JS Engine & DOM",
      "questions": [
        {
          "question": "What is a Closure in JavaScript?",
          "options": [
            "A function that has no return statement",
            "A function bundled with references to its surrounding lexical state",
            "A method to close browser tabs",
            "A synchronous while loop"
          ],
          "correct": 1,
          "explanation": "Closures allow a function to retain access to variables in its enclosing scope even after that scope has closed."
        },
        {
          "question": "Why is Event Delegation preferred for dynamic lists of items?",
          "options": [
            "It prevents all CSS styles from loading",
            "It attaches one listener to a common ancestor, saving memory and handling future elements automatically",
            "It disables the browser event loop",
            "It converts synchronous events into promises"
          ],
          "correct": 1,
          "explanation": "Event delegation handles clicks on existing and newly added children via a single parent listener."
        }
      ]
    },
    "project": {
      "title": "Dynamic Quest Log App",
      "scenario": "Build a dynamic interactive quest log in pure JavaScript that utilizes closures for score tracking and event delegation for task completion.",
      "starterCode": "// Quest Log Application",
      "requirements": [
        "Use closures to encapsulate quest progression state",
        "Implement event delegation for checking off quests",
        "Use modern ES6 array methods to filter completed quests",
        "Manipulate DOM nodes dynamically with createElement and appendChild"
      ]
    }
  },
  "web-week-4": {
    "lessons": [
      {
        "title": "The Asynchronous Pulse: Event Loop, Microtasks & Macrotasks",
        "language": "javascript",
        "starterCode": "console.log(\"1. Synchronous Code\");\n\nsetTimeout(() => console.log(\"4. Macrotask (setTimeout)\"), 0);\n\nPromise.resolve().then(() => console.log(\"3. Microtask (Promise)\"));\n\nconsole.log(\"2. Synchronous Code End\");\n",
        "content": "<h2>⚡ Chapter 1: The Event Loop & Microtask Priority</h2>\n<p>JavaScript is single-threaded, yet non-blocking. The <strong>Event Loop</strong> coordinates synchronous execution, the <strong>Microtask Queue</strong> (Promises, <code>queueMicrotask</code>), and the <strong>Macrotask Queue</strong> (<code>setTimeout</code>, DOM events). Microtasks always drain completely before the next macrotask runs!</p>"
      },
      {
        "title": "Promises: Chaining, Error Handling & Combinators",
        "language": "javascript",
        "starterCode": "const fetchRune = (id) => new Promise((resolve, reject) => {\n  if (id > 0) resolve({ id, name: 'Fire Rune' });\n  else reject(new Error('Invalid rune ID'));\n});\n\n// Promise.all: Fails fast if any promise rejects\nPromise.all([fetchRune(1), fetchRune(2)])\n  .then(([r1, r2]) => console.log(\"Runes fetched:\", r1, r2))\n  .catch(err => console.error(\"Failed to load runes:\", err));\n",
        "content": "<h2>⚡ Chapter 2: Promises & Combinators (Promise.all vs allSettled)</h2>\n<p>Promises represent future values with three states: <em>Pending</em>, <em>Fulfilled</em>, or <em>Rejected</em>. Combinators:</p>\n<ul>\n  <li><code>Promise.all</code>: Resolves when all succeed; fails fast if any reject.</li>\n  <li><code>Promise.allSettled</code>: Waits for all to finish, returning status objects for each.</li>\n  <li><code>Promise.race</code>: Resolves or rejects with the earliest settled promise.</li>\n</ul>"
      },
      {
        "title": "Async / Await: Writing Clean Synchronous-Looking Async Code",
        "language": "javascript",
        "starterCode": "async function loadPlayerData(playerId) {\n  try {\n    console.log(\"Fetching player profile...\");\n    const res = await fetch(`/api/players/${playerId}`);\n    if (!res.ok) throw new Error(`HTTP error ${res.status}`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(\"Failed to load player:\", err.message);\n    throw err;\n  }\n}\n",
        "content": "<h2>⚡ Chapter 3: Async/Await & Robust Error Handling</h2>\n<p>Syntactic sugar built over Promises. <code>async</code> functions always return a Promise, and <code>await</code> pauses function execution until the promise settles, without freezing the browser thread!</p>"
      },
      {
        "title": "The Fetch API, Headers, Request / Response Streams & HTTP Statuses",
        "language": "javascript",
        "starterCode": "async function postScore(scoreData) {\n  const response = await fetch('/api/leaderboard', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer token_abc123'\n    },\n    body: JSON.stringify(scoreData)\n  });\n  return response.json();\n}\n",
        "content": "<h2>⚡ Chapter 4: Modern Fetch API & HTTP Protocol Fundamentals</h2>\n<p>Understanding HTTP status codes is essential for client-server communication:</p>\n<ul>\n  <li><code>200 OK</code> / <code>201 Created</code>: Success.</li>\n  <li><code>400 Bad Request</code> / <code>401 Unauthorized</code> / <code>403 Forbidden</code> / <code>404 Not Found</code>: Client error.</li>\n  <li><code>500 Internal Server Error</code>: Server crashed during processing.</li>\n</ul>"
      },
      {
        "title": "Browser Storage: LocalStorage, SessionStorage & IndexedDB",
        "language": "javascript",
        "starterCode": "// Persisting client settings\nconst settings = { theme: 'cyber-dark', sound: false };\nlocalStorage.setItem('user_settings', JSON.stringify(settings));\n\n// Retrieving\nconst saved = JSON.parse(localStorage.getItem('user_settings') || '{}');\nconsole.log(\"Loaded theme:\", saved.theme);\n",
        "content": "<h2>⚡ Chapter 5: Client-Side Storage Mechanisms</h2>\n<ul>\n  <li><strong>LocalStorage:</strong> Synchronous key-value storage persisted across browser restarts (5-10MB).</li>\n  <li><strong>SessionStorage:</strong> Cleared when the browser tab closes.</li>\n  <li><strong>Cookies:</strong> Small tokens (4KB) sent with every HTTP request, ideal for session IDs.</li>\n  <li><strong>IndexedDB:</strong> Transactional NoSQL database in the browser for complex offline data.</li>\n</ul>"
      }
    ],
    "exercises": [
      {
        "title": "Async Data Fetcher with Error Handling",
        "instructions": "Write an async function fetchUserData(url) that fetches JSON and throws an error if response.ok is false.",
        "starterCode": "async function fetchUserData(url) {}",
        "solution": "async function fetchUserData(url) { const r = await fetch(url); if (!r.ok) throw new Error(\"HTTP error\"); return r.json(); }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed async test"
          }
        ]
      },
      {
        "title": "Safe LocalStorage Cache Helper",
        "instructions": "Implement saveCache(key, obj) and loadCache(key) using JSON serialization.",
        "starterCode": "function saveCache(k, v) {} function loadCache(k) {}",
        "solution": "function saveCache(k, v) { localStorage.setItem(k, JSON.stringify(v)); } function loadCache(k) { return JSON.parse(localStorage.getItem(k) || \"null\"); }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed cache test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 4 Mastery Quiz: Async JS & Protocols",
      "questions": [
        {
          "question": "Which executes first when the call stack clears: a resolved Promise .then callback or a setTimeout(..., 0)?",
          "options": [
            "setTimeout callback (Macrotask)",
            "Promise .then callback (Microtask)",
            "They run in random order",
            "Both run simultaneously on multiple threads"
          ],
          "correct": 1,
          "explanation": "Microtasks (Promises) always run to completion before the next Macrotask (setTimeout) is processed."
        },
        {
          "question": "Which Promise combinator waits for all promises to settle and never rejects early?",
          "options": [
            "Promise.all",
            "Promise.race",
            "Promise.allSettled",
            "Promise.any"
          ],
          "correct": 2,
          "explanation": "Promise.allSettled waits for all inputs to either resolve or reject, returning individual status summaries."
        }
      ]
    },
    "project": {
      "title": "Real-Time Telemetry Dashboard Client",
      "scenario": "Create an asynchronous weather/telemetry dashboard that queries a mock REST endpoint using fetch, handles errors with fallbacks, and caches settings in LocalStorage.",
      "starterCode": "// Asynchronous Telemetry Client",
      "requirements": [
        "Use async/await with try/catch blocks",
        "Implement Promise.all to fetch multiple endpoints in parallel",
        "Persist user dashboard layout in LocalStorage",
        "Display error notifications when requests fail"
      ]
    }
  },
  "web-week-5": {
    "lessons": [
      {
        "title": "The 3-Tier Web Universe & The Case for Declarative UI",
        "language": "javascript",
        "starterCode": "// Declarative UI: Describe what the UI should look like for a given state\nfunction HeroBanner({ heroName, level }) {\n  return (\n    <div className=\"hero-banner\">\n      <h2>{heroName}</h2>\n      <span className=\"badge\">Level {level}</span>\n    </div>\n  );\n}\n",
        "content": "<h2>⚛️ Chapter 1: Declarative UI & The React Paradigm</h2>\n<p>In imperative UI (vanilla DOM), you manually add, remove, and update DOM nodes. In <strong>Declarative UI</strong>, you declare what the interface should look like given the current data state: <code>UI = f(state)</code>.</p>"
      },
      {
        "title": "The Virtual DOM, Reconciliation Engine & Diffing Algorithms",
        "language": "javascript",
        "starterCode": "// React Elements are lightweight plain JavaScript objects\nconst element = {\n  type: 'h1',\n  props: {\n    className: 'title',\n    children: 'Cyberpunk Foundry'\n  }\n};\nconsole.log(\"Virtual DOM node:\", element);\n",
        "content": "<h2>⚛️ Chapter 2: Virtual DOM & The Diffing Algorithm</h2>\n<p>Direct real DOM updates are computationally expensive. React keeps an in-memory <strong>Virtual DOM</strong> representation. When state changes, React diffs the new Virtual DOM against the snapshot and calculates the minimal set of mutations needed on the real DOM.</p>"
      },
      {
        "title": "JSX Under the Hood: React Elements vs HTML",
        "language": "javascript",
        "starterCode": "// What you write:\nconst card = <div className=\"card\"><h1>Hero</h1></div>;\n\n// What the compiler outputs:\nconst compiled = React.createElement(\n  'div',\n  { className: 'card' },\n  React.createElement('h1', null, 'Hero')\n);\n",
        "content": "<h2>⚛️ Chapter 3: JSX Compilation & React.createElement</h2>\n<p>JSX is not HTML; it is syntactic sugar for <code>React.createElement</code> function calls that return virtual node descriptions.</p>"
      },
      {
        "title": "Component Trees, Props & One-Way Data Flow",
        "language": "javascript",
        "starterCode": "function CharacterCard({ name, rank, isLeader }) {\n  return (\n    <div className={`card ${isLeader ? 'leader' : ''}`}>\n      <h3>{name}</h3>\n      <p>Rank: {rank}</p>\n    </div>\n  );\n}\n\n// Usage:\n// <CharacterCard name=\"Valkyrie\" rank=\"Commander\" isLeader={true} />\n",
        "content": "<h2>⚛️ Chapter 4: Props & One-Way Data Flow</h2>\n<p>Data in React flows strictly downward from parent to child via <strong>Props</strong>. Props are read-only and immutable; a child component must never mutate the props passed to it.</p>"
      },
      {
        "title": "Conditional Rendering, Lists & Key Stability Invariants",
        "language": "javascript",
        "starterCode": "function InventoryList({ items }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>\n          {item.name} {item.isEquipped && <span>🛡️</span>}\n        </li>\n      ))}\n    </ul>\n  );\n}\n",
        "content": "<h2>⚛️ Chapter 5: List Rendering & The Critical Importance of Keys</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ KEY INVARIANT:</strong> <em>Never use array indexes as keys if the list can be filtered, reordered, or deleted! Use stable, unique IDs so React's reconciler tracks element identity across renders.</em>\n</div>"
      }
    ],
    "exercises": [
      {
        "title": "Component Prop Validation",
        "instructions": "Create a Badge component that renders a span with className and label props.",
        "starterCode": "function Badge(props) {}",
        "solution": "function Badge({ label, type = \"info\" }) { return <span className={`badge ${type}`}>{label}</span>; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed component test"
          }
        ]
      },
      {
        "title": "Conditional List Rendering",
        "instructions": "Render an unordered list of tasks using task.id as key and show a checkmark if completed.",
        "starterCode": "function TaskList({ tasks }) {}",
        "solution": "function TaskList({ tasks }) { return <ul>{tasks.map(t => <li key={t.id}>{t.title} {t.completed && \"✓\"}</li>)}</ul>; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed list test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 5 Mastery Quiz: React Architecture & JSX",
      "questions": [
        {
          "question": "Why does React require a unique \"key\" prop on elements rendered in a list?",
          "options": [
            "To style elements with CSS",
            "To help the reconciliation diffing algorithm identify which items changed, were added, or removed",
            "To bind event listeners to the DOM",
            "To serialize data into JSON"
          ],
          "correct": 1,
          "explanation": "Keys provide stable identity across renders, allowing React to reuse existing DOM nodes efficiently."
        },
        {
          "question": "What is JSX compiled into before running in the browser?",
          "options": [
            "Plain HTML string templates",
            "React.createElement function calls",
            "Assembly instructions",
            "CSSOM rules"
          ],
          "correct": 1,
          "explanation": "JSX tags compile into React.createElement function calls that return plain JavaScript objects."
        }
      ]
    },
    "project": {
      "title": "Cyberpunk Character Roster Component",
      "scenario": "Build a reusable React component library for a character roster with cards, badges, and dynamic list rendering.",
      "starterCode": "// Character Roster Component",
      "requirements": [
        "Define modular functional components",
        "Pass data via typed props with defaults",
        "Render dynamic items with stable unique keys",
        "Implement conditional rendering for leader badges"
      ]
    }
  },
  "web-week-6": {
    "lessons": [
      {
        "title": "The Reactive Heart: State Mechanics with useState",
        "language": "javascript",
        "starterCode": "import { useState } from 'react';\n\nfunction CombatCounter() {\n  const [health, setHealth] = useState(100);\n\n  // Functional update ensures accuracy during batching\n  const takeDamage = (amount) => {\n    setHealth(prev => Math.max(0, prev - amount));\n  };\n\n  return (\n    <div>\n      <h3>Health: {health}</h3>\n      <button onClick={() => takeDamage(15)}>Take 15 Damage</button>\n    </div>\n  );\n}\n",
        "content": "<h2>⚛️ Chapter 1: useState & Asynchronous Batching</h2>\n<p>State in React represents values that change over time and trigger component re-renders. Always use the <strong>functional updater form</strong> (<code>setVal(prev =&gt; prev + 1)</code>) when new state depends on previous state to prevent race conditions during React batching.</p>"
      },
      {
        "title": "Lifecycle Management & Side Effects with useEffect",
        "language": "javascript",
        "starterCode": "import { useEffect, useState } from 'react';\n\nfunction OnlineStatusIndicator() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n\n  useEffect(() => {\n    const handleOnline = () => setIsOnline(true);\n    const handleOffline = () => setIsOnline(false);\n\n    window.addEventListener('online', handleOnline);\n    window.addEventListener('offline', handleOffline);\n\n    // CRITICAL: Cleanup function prevents memory leaks!\n    return () => {\n      window.removeEventListener('online', handleOnline);\n      window.removeEventListener('offline', handleOffline);\n    };\n  }, []); // Empty dependency array: runs once on mount\n\n  return <span>{isOnline ? '🟢 Connected' : '🔴 Offline'}</span>;\n}\n",
        "content": "<h2>⚛️ Chapter 2: useEffect & Cleanup Functions</h2>\n<p><code>useEffect</code> synchronizes your component with external systems (timers, subscriptions, DOM APIs). Always provide a <strong>cleanup return function</strong> to detach event listeners and cancel timers when components unmount.</p>"
      },
      {
        "title": "Controlled vs Uncontrolled Forms & Input Management",
        "language": "javascript",
        "starterCode": "import { useState } from 'react';\n\nfunction RegistrationForm() {\n  const [formData, setFormData] = useState({ handle: '', email: '' });\n\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setFormData(prev => ({ ...prev, [name]: value }));\n  };\n\n  return (\n    <form onSubmit={(e) => { e.preventDefault(); console.log(formData); }}>\n      <input name=\"handle\" value={formData.handle} onChange={handleChange} />\n      <input name=\"email\" value={formData.email} onChange={handleChange} />\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}\n",
        "content": "<h2>⚛️ Chapter 3: Controlled Components</h2>\n<p>In a <strong>Controlled Component</strong>, the form input's value is driven strictly by React state. Changes invoke <code>onChange</code> handlers that update state, making inputs single sources of truth.</p>"
      },
      {
        "title": "Performance Optimization: useMemo, useCallback & React.memo",
        "language": "javascript",
        "starterCode": "import { useMemo, useCallback, useState } from 'react';\n\nfunction DataViewer({ rawItems }) {\n  const [search, setSearch] = useState('');\n\n  // Memorize costly computation\n  const filteredItems = useMemo(() => {\n    return rawItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));\n  }, [rawItems, search]);\n\n  // Preserve function identity across renders\n  const handleSelect = useCallback((id) => {\n    console.log(\"Selected item:\", id);\n  }, []);\n\n  return <div>{/* render UI */}</div>;\n}\n",
        "content": "<h2>⚛️ Chapter 4: React Performance Optimization</h2>\n<ul>\n  <li><code>useMemo</code>: Caches the result of an expensive calculation between renders.</li>\n  <li><code>useCallback</code>: Caches a function definition between renders so child components don't re-render needlessly.</li>\n  <li><code>React.memo</code>: Skips re-rendering a component if its props have not changed.</li>\n</ul>"
      },
      {
        "title": "Custom Hooks: Extracting Reusable Business Logic",
        "language": "javascript",
        "starterCode": "import { useState, useEffect } from 'react';\n\n// Custom Hook for Window Dimensions\nfunction useWindowSize() {\n  const [size, setSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight\n  });\n\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}\n",
        "content": "<h2>⚛️ Chapter 5: Custom Hooks Architecture</h2>\n<p>Custom hooks are JavaScript functions prefixed with <code>use</code> that can call other React hooks. They allow you to extract and share stateful business logic across multiple components without altering component hierarchy.</p>"
      }
    ],
    "exercises": [
      {
        "title": "Counter with Boundaries Hook",
        "instructions": "Create a custom hook useCounter(initial, min, max) that bounds values.",
        "starterCode": "function useCounter(initial, min, max) {}",
        "solution": "function useCounter(i, min, max) { const [c, setC] = useState(i); return { c, inc: () => setC(p => Math.min(max, p+1)), dec: () => setC(p => Math.max(min, p-1)) }; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed hook test"
          }
        ]
      },
      {
        "title": "Controlled Search Filter",
        "instructions": "Implement a controlled text input that filters a list of names.",
        "starterCode": "function SearchBox({ list }) {}",
        "solution": "function SearchBox({ list }) { const [q, setQ] = useState(\"\"); const filtered = list.filter(x => x.includes(q)); return <input value={q} onChange={e => setQ(e.target.value)} />; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed search test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 6 Mastery Quiz: State & Hooks",
      "questions": [
        {
          "question": "What is the purpose of returning a function from inside useEffect?",
          "options": [
            "To re-trigger the effect immediately",
            "To perform cleanup when the component unmounts or before the effect re-runs",
            "To return JSX to the DOM",
            "To log errors to the console"
          ],
          "correct": 1,
          "explanation": "The return function cleans up subscriptions, event listeners, and timers to prevent memory leaks."
        },
        {
          "question": "When should you pass a function to the state setter (e.g. setCount(prev => prev + 1))?",
          "options": [
            "Only on initial component mount",
            "Whenever the new state depends on the previous state value",
            "Only when handling string inputs",
            "Never; direct values are preferred"
          ],
          "correct": 1,
          "explanation": "Functional state updates guarantee accurate calculations during React state batching."
        }
      ]
    },
    "project": {
      "title": "Interactive Quest Master Dashboard",
      "scenario": "Build a fully controlled React quest tracker featuring customized hooks, debounced search filters, and persistent state.",
      "starterCode": "// Quest Master Dashboard",
      "requirements": [
        "Manage multi-field form state with controlled components",
        "Implement useEffect with event listener cleanups",
        "Build a reusable custom hook for local storage persistence",
        "Optimize filtered search performance using useMemo"
      ]
    }
  },
  "web-week-7": {
    "lessons": [
      {
        "title": "The TypeScript Crucible: Why Static Types Prevent Production Crashes",
        "language": "typescript",
        "starterCode": "// Static Type Verification\ninterface Hero {\n  id: number;\n  name: string;\n  powerLevel?: number; // Optional property\n}\n\nfunction deployHero(hero: Hero): string {\n  return `Deploying ${hero.name} (Level: ${hero.powerLevel ?? 1})`;\n}\n\n// deployHero({ id: 1 }); // Compile error: 'name' is missing!\n",
        "content": "<h2>🔷 Chapter 1: Why TypeScript?</h2>\n<p>JavaScript is dynamically typed: errors manifest only at runtime when users click buttons. TypeScript layers a compile-time static type system over JavaScript, catching bugs before code ever deploys.</p>"
      },
      {
        "title": "Primitive Types, Type Inference & Union / Intersection Types",
        "language": "typescript",
        "starterCode": "// Union types: One of several allowed values\ntype Status = 'idle' | 'loading' | 'success' | 'error';\n\n// Discriminated Unions: Powerful pattern for state machines\ntype State =\n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'success'; data: string[] }\n  | { status: 'error'; error: Error };\n\nfunction renderState(s: State) {\n  if (s.status === 'success') console.log(\"Items:\", s.data.length);\n  else if (s.status === 'error') console.error(s.error.message);\n}\n",
        "content": "<h2>🔷 Chapter 2: Discriminated Unions & Exhaustive Checks</h2>\n<p>Discriminated unions pair a literal discriminant property (like <code>status</code>) with payload data, enabling the compiler to narrow types with absolute mathematical certainty inside conditional branches.</p>"
      },
      {
        "title": "Interfaces vs Type Aliases: Designing Component Prop Contracts",
        "language": "typescript",
        "starterCode": "interface CardProps {\n  title: string;\n  onClick: (id: string) => void;\n  children: React.ReactNode;\n}\n\n// Extending interfaces\ninterface PremiumCardProps extends CardProps {\n  badgeColor: string;\n}\n",
        "content": "<h2>🔷 Chapter 3: Interfaces vs Type Aliases in React</h2>\n<p>Use <code>interface</code> when designing object contracts that can be extended, and <code>type</code> when creating unions, primitives, tuples, or complex mapped types.</p>"
      },
      {
        "title": "Generics: Forging Flexible, Reusable UI Components & State",
        "language": "typescript",
        "starterCode": "// Generic API response container\ninterface ApiResponse<T> {\n  status: number;\n  data: T;\n  timestamp: number;\n}\n\ninterface UserProfile {\n  username: string;\n  guild: string;\n}\n\nfunction handleResponse(res: ApiResponse<UserProfile>) {\n  console.log(\"Welcome,\", res.data.username);\n}\n",
        "content": "<h2>🔷 Chapter 4: Generics (Type Parameters)</h2>\n<p>Generics let you write components, functions, and interfaces that work over a variety of types rather than a single one, preserving full type safety without resorting to <code>any</code>.</p>"
      },
      {
        "title": "TypeScript with React: Typing Events, Refs & API Responses",
        "language": "typescript",
        "starterCode": "import React, { useRef } from 'react';\n\ninterface InputProps {\n  onTextChange: (text: string) => void;\n}\n\nexport const SafeInput: React.FC<InputProps> = ({ onTextChange }) => {\n  const inputRef = useRef<HTMLInputElement>(null);\n\n  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    onTextChange(e.target.value);\n  };\n\n  return <input ref={inputRef} onChange={handleChange} />;\n};\n",
        "content": "<h2>🔷 Chapter 5: React + TypeScript Integration</h2>\n<p>Master typing common React patterns: <code>React.MouseEvent</code>, <code>React.ChangeEvent</code>, <code>React.FC</code>, and generic hooks like <code>useRef&lt;HTMLInputElement&gt;(null)</code>.</p>"
      }
    ],
    "exercises": [
      {
        "title": "Discriminated Union State Handler",
        "instructions": "Define an ApiResponse<T> type union with Success and Error variants.",
        "starterCode": "type ApiResponse<T> = /* define union */;",
        "solution": "type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed type test"
          }
        ]
      },
      {
        "title": "Typed React Props Contract",
        "instructions": "Write an interface ButtonProps with label, disabled optional boolean, and onClick callback.",
        "starterCode": "interface ButtonProps {}",
        "solution": "interface ButtonProps { label: string; disabled?: boolean; onClick: () => void; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed interface test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 7 Mastery Quiz: TypeScript Engineering",
      "questions": [
        {
          "question": "What is the key benefit of a Discriminated Union in TypeScript?",
          "options": [
            "It speeds up JavaScript execution in V8",
            "It enables type narrowing based on a shared literal property",
            "It converts objects into binary format",
            "It replaces SQL database migrations"
          ],
          "correct": 1,
          "explanation": "Discriminated unions allow TypeScript to narrow complex union states with zero casting."
        },
        {
          "question": "What is the type of an input change event in React?",
          "options": [
            "Event",
            "React.ChangeEvent<HTMLInputElement>",
            "CustomEvent",
            "InputEvent"
          ],
          "correct": 1,
          "explanation": "React provides the synthetic event wrapper React.ChangeEvent<HTMLInputElement> for input changes."
        }
      ]
    },
    "project": {
      "title": "Bulletproof Cyberdeck Component Library",
      "scenario": "Develop a strongly typed React UI component library with buttons, cards, modals, and generic data tables with zero any types.",
      "starterCode": "// TypeScript Component Library",
      "requirements": [
        "Define strict interfaces for all component props",
        "Use discriminated unions for component variants",
        "Build a generic table component with TableProps<T>",
        "Eliminate any and unknown type escapes"
      ]
    }
  },
  "web-week-8": {
    "lessons": [
      {
        "title": "Client-Side Routing: Browser History API vs React Router",
        "language": "javascript",
        "starterCode": "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to=\"/\">Armory</Link> | <Link to=\"/quests\">Quests</Link>\n      </nav>\n      <Routes>\n        <Route path=\"/\" element={<h2>Armory Hub</h2>} />\n        <Route path=\"/quests\" element={<h2>Quest Portal</h2>} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n",
        "content": "<h2>🧭 Chapter 1: Single-Page Architecture & Client-Side Routing</h2>\n<p>Traditional multi-page sites cause a full browser reload on every link click. SPAs intercept link clicks using the HTML5 <strong>History API</strong> (<code>pushState</code>) to swap views dynamically with zero page reloads!</p>"
      },
      {
        "title": "Dynamic Routes, Nested Layouts & Route Loaders",
        "language": "javascript",
        "starterCode": "import { useParams } from 'react-router-dom';\n\nfunction QuestDetail() {\n  // Extracts :questId from route \"/quests/:questId\"\n  const { questId } = useParams();\n  return <div>Viewing Quest: #{questId}</div>;\n}\n",
        "content": "<h2>🧭 Chapter 2: URL Parameters & Dynamic Routes</h2>\n<p>Dynamic segment paths (<code>/users/:id</code>) allow single components to render data for thousands of unique records by extracting params via <code>useParams</code>.</p>"
      },
      {
        "title": "Context API: Prop-Drilling Elimination & Theme / Auth State",
        "language": "javascript",
        "starterCode": "import { createContext, useContext, useState } from 'react';\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState({ name: 'Valkyrie', authenticated: true });\n  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;\n}\n\nexport const useAuth = () => useContext(AuthContext);\n",
        "content": "<h2>🧭 Chapter 3: React Context API</h2>\n<p>Avoid passing props through 10 layers of components (<strong>Prop Drilling</strong>). Context provides global data broadcasting for theme, locale, and authentication state.</p>"
      },
      {
        "title": "Global State Architectures: Zustand vs Redux Toolkit Principles",
        "language": "javascript",
        "starterCode": "// Lightweight global state with Zustand\nimport { create } from 'zustand';\n\nexport const useInventoryStore = create((set) => ({\n  credits: 500,\n  items: [],\n  addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),\n  addItem: (item) => set((state) => ({ items: [...state.items, item] }))\n}));\n",
        "content": "<h2>🧭 Chapter 4: Modern Global State Management</h2>\n<p>While Redux pioneered unidirectional data flow, modern tools like <strong>Zustand</strong> deliver minimal boilerplate, hook-based stores, and fine-grained selector re-renders.</p>"
      },
      {
        "title": "Server State & Data Caching: TanStack Query (React Query)",
        "language": "javascript",
        "starterCode": "import { useQuery } from '@tanstack/react-query';\n\nfunction GuildMembers() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['guild-members'],\n    queryFn: () => fetch('/api/guild').then(res => res.json()),\n    staleTime: 60 * 1000 // Cache fresh for 1 minute\n  });\n\n  if (isLoading) return <div>Loading roster...</div>;\n  return <ul>{data?.map(m => <li key={m.id}>{m.name}</li>)}</ul>;\n}\n",
        "content": "<h2>🧭 Chapter 5: Server State vs Client State</h2>\n<p>Do not store remote server responses in global client stores. <strong>TanStack Query</strong> automatically manages caching, background re-fetching, deduplication, and stale data synchronization!</p>"
      }
    ],
    "exercises": [
      {
        "title": "Context Authentication Provider",
        "instructions": "Create an AuthContext and custom hook useAuth that exposes user and login function.",
        "starterCode": "const AuthContext = createContext();",
        "solution": "const AuthContext = createContext(); function AuthProvider({ children }) { const [u, setU] = useState(null); return <AuthContext.Provider value={{ u, login: setU }}>{children}</AuthContext.Provider>; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed context test"
          }
        ]
      },
      {
        "title": "Zustand Global Cart Store",
        "instructions": "Define a Zustand store with cart array and addToCart action.",
        "starterCode": "const useCart = create((set) => ({}));",
        "solution": "const useCart = create((set) => ({ cart: [], addToCart: (i) => set(s => ({ cart: [...s.cart, i] })) }));",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed zustand test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 8 Mastery Quiz: SPA Routing & Global State",
      "questions": [
        {
          "question": "What is the main difference between Server State and Client State?",
          "options": [
            "Server state is written in SQL, client state in CSS",
            "Server state is remotely persisted and can become stale asynchronously, while client state is local UI state",
            "Client state never changes",
            "There is no difference"
          ],
          "correct": 1,
          "explanation": "Server state belongs to remote databases and requires caching/refetching mechanisms (like TanStack Query)."
        },
        {
          "question": "What React Hook extracts route parameters like :id in React Router?",
          "options": [
            "useRoute()",
            "useParams()",
            "useLocation()",
            "useHistory()"
          ],
          "correct": 1,
          "explanation": "useParams() returns an object of key/value pairs of dynamic URL parameters."
        }
      ]
    },
    "project": {
      "title": "Full-Scale SPA Cyberpunk Guild Headquarters",
      "scenario": "Assemble a complete Single Page Application featuring React Router navigation, authentication context, and Zustand-backed inventory store.",
      "starterCode": "// SPA Guild Headquarters",
      "requirements": [
        "Configure BrowserRouter with nested routes",
        "Implement protected routes guarded by AuthContext",
        "Store dynamic character equipment in a Zustand store",
        "Display dynamic detail views using useParams"
      ]
    }
  },
  "web-week-9": {
    "lessons": [
      {
        "title": "The Database Divide: Relational Tables vs Document Stores",
        "language": "sql",
        "starterCode": "-- Relational Structure: Structured Schema with Typed Columns\nCREATE TABLE pilots (\n    id SERIAL PRIMARY KEY,\n    callsign VARCHAR(50) NOT NULL UNIQUE,\n    credits NUMERIC(12, 2) NOT NULL DEFAULT 0.00,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n",
        "content": "<h2>🐘 Chapter 1: Relational vs Document Databases</h2>\n<p>Relational databases (PostgreSQL) enforce strong mathematical schemas, relational foreign key constraints, and ACID transactions. In contrast, Document stores (MongoDB) provide schemaless JSON flexibility at the expense of automated relational integrity.</p>"
      },
      {
        "title": "Forging the Schema: PostgreSQL Data Types, Constraints & Keys",
        "language": "sql",
        "starterCode": "CREATE TABLE mechs (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    pilot_id INT NOT NULL REFERENCES pilots(id) ON DELETE CASCADE,\n    model VARCHAR(100) NOT NULL,\n    tier INT NOT NULL CHECK (tier BETWEEN 1 AND 10),\n    is_operational BOOLEAN NOT NULL DEFAULT TRUE\n);\n",
        "content": "<h2>🐘 Chapter 2: Schema Constraints & Integrity Runes</h2>\n<p>Use constraints (<code>CHECK</code>, <code>UNIQUE</code>, <code>NOT NULL</code>, <code>FOREIGN KEY</code>) to guarantee data validity directly in the database engine, guarding against bugs in application code.</p>"
      },
      {
        "title": "The Language of Queries: SQL CRUD, Filtering & Multi-Table JOINs",
        "language": "sql",
        "starterCode": "-- Multi-Table INNER JOIN\nSELECT \n    p.callsign,\n    m.model,\n    m.tier\nFROM pilots p\nINNER JOIN mechs m ON p.id = m.pilot_id\nWHERE m.is_operational = TRUE\nORDER BY m.tier DESC;\n",
        "content": "<h2>🐘 Chapter 3: SQL CRUD & Joins</h2>\n<p>Master the four primary join types: <code>INNER JOIN</code> (intersection), <code>LEFT JOIN</code> (all left rows + matching right), <code>RIGHT JOIN</code>, and <code>FULL OUTER JOIN</code>.</p>"
      },
      {
        "title": "Relational Integrity: Foreign Key Cascades & Referential Invariants",
        "language": "sql",
        "starterCode": "-- Cascading Deletions: When a pilot is deleted, their mechs are pruned automatically\nALTER TABLE mechs\nDROP CONSTRAINT mechs_pilot_id_fkey,\nADD CONSTRAINT mechs_pilot_id_fkey\n    FOREIGN KEY (pilot_id) REFERENCES pilots(id)\n    ON DELETE CASCADE;\n",
        "content": "<h2>🐘 Chapter 4: Foreign Key Invariants & Cascades</h2>\n<p>Foreign keys prevent orphaned records. With <code>ON DELETE CASCADE</code>, removing a parent record automatically prunes associated child records.</p>"
      },
      {
        "title": "Indexing Internals (B-Trees), EXPLAIN ANALYZE & ACID Transactions",
        "language": "sql",
        "starterCode": "-- Indexing high-frequency search column\nCREATE INDEX idx_mechs_tier ON mechs (tier);\n\n-- Inspecting the PostgreSQL Query Plan\nEXPLAIN ANALYZE\nSELECT * FROM mechs WHERE tier >= 8;\n",
        "content": "<h2>🐘 Chapter 5: B-Tree Indexes & ACID Transactions</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ ACID GUARANTEES:</strong> <em>Atomicity (all or nothing), Consistency (valid state transitions), Isolation (independent concurrent execution), and Durability (persisted to disk).</em>\n</div>\n<p>Indexes transform full-table sequential scans (<code>O(N)</code>) into lightning-fast logarithmic B-Tree searches (<code>O(log N)</code>).</p>"
      }
    ],
    "exercises": [
      {
        "title": "Relational Schema Definition",
        "instructions": "Create a table guilds with id, name unique varchar(100), and created_at timestamp.",
        "starterCode": "CREATE TABLE guilds ();",
        "solution": "CREATE TABLE guilds ( id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() );",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed DDL test"
          }
        ]
      },
      {
        "title": "Multi-Table SQL Join",
        "instructions": "Select user name and guild name using an INNER JOIN between users and guilds.",
        "starterCode": "SELECT /* query */;",
        "solution": "SELECT u.name, g.name AS guild FROM users u INNER JOIN guilds g ON u.guild_id = g.id;",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed join test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 9 Mastery Quiz: PostgreSQL Mastery",
      "questions": [
        {
          "question": "What does ACID stand for in database systems?",
          "options": [
            "Async, Concurrent, Indexed, Distributed",
            "Atomicity, Consistency, Isolation, Durability",
            "Array, Character, Integer, Decimal",
            "Authentication, Cryptography, Identity, Directory"
          ],
          "correct": 1,
          "explanation": "ACID guarantees reliable transactions even during hardware crashes or concurrent operations."
        },
        {
          "question": "What SQL command displays the execution plan and actual runtime of a query in PostgreSQL?",
          "options": [
            "SHOW PLAN",
            "EXPLAIN ANALYZE",
            "DEBUG QUERY",
            "TRACE EXECUTION"
          ],
          "correct": 1,
          "explanation": "EXPLAIN ANALYZE executes the query and prints planning time, execution time, and index usage."
        }
      ]
    },
    "project": {
      "title": "PostgreSQL Guild Armory Schema",
      "scenario": "Design and write a complete production-grade PostgreSQL relational schema for an online armory with users, equipment, transactions, and foreign key cascades.",
      "starterCode": "-- PostgreSQL Armory Schema",
      "requirements": [
        "Define primary and foreign keys with cascading deletes",
        "Apply CHECK and UNIQUE constraints on vital columns",
        "Create B-Tree indexes on frequent search fields",
        "Write multi-table aggregate queries with GROUP BY"
      ]
    }
  },
  "web-week-10": {
    "lessons": [
      {
        "title": "The Server Runtime: Node.js, V8 Engine & Non-Blocking I/O",
        "language": "javascript",
        "starterCode": "// Inspecting process and environment variables in Node.js\nconsole.log(\"⚡ Server OS:\", process.platform);\nconsole.log(\"⚡ Node Version:\", process.version);\nconsole.log(\"⚡ Port:\", process.env.PORT || 3000);\n",
        "content": "<h2>🟢 Chapter 1: Node.js Runtime & Non-Blocking I/O</h2>\n<p>Node.js takes Chrome's V8 JavaScript engine out of the browser and embeds it into a server runtime powered by <strong>libuv</strong>. All filesystem, network, and timer operations are asynchronously offloaded, allowing a single thread to handle tens of thousands of concurrent client connections!</p>"
      },
      {
        "title": "The Rules of the Web: HTTP Protocols, Status Codes & REST Conventions",
        "language": "javascript",
        "starterCode": "// RESTful Resource Routing Convention\n// GET    /api/mechs        -> List all mechs\n// POST   /api/mechs        -> Create new mech\n// GET    /api/mechs/:id    -> Retrieve specific mech\n// PUT    /api/mechs/:id    -> Replace mech\n// DELETE /api/mechs/:id    -> Delete mech\n",
        "content": "<h2>🟢 Chapter 2: RESTful Architecture & HTTP Semantics</h2>\n<p>Representational State Transfer (REST) maps CRUD operations onto standard HTTP verbs (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>), utilizing stateless URI endpoints and descriptive status codes.</p>"
      },
      {
        "title": "The Express Foundry: Routing Pipelines, Middleware & Request Lifecycle",
        "language": "javascript",
        "starterCode": "import express from 'express';\nconst app = express();\n\n// Global JSON parsing middleware\napp.use(express.json());\n\n// Custom Logger Middleware\napp.use((req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);\n  next(); // Pass control to next handler in pipeline!\n});\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'HEALTHY', uptime: process.uptime() });\n});\n\napp.listen(3000, () => console.log(\"Server online at port 3000\"));\n",
        "content": "<h2>🟢 Chapter 3: Express Middleware & The Request Pipeline</h2>\n<p>An Express application is essentially a stack of middleware functions. Each function receives <code>req</code>, <code>res</code>, and <code>next</code>, and can mutate requests, send responses, or invoke the next handler in line.</p>"
      },
      {
        "title": "Payload Validation, Error Handling Middleware & Input Sanitization",
        "language": "javascript",
        "starterCode": "// Centralized Global Error Handling Middleware (4 arguments!)\napp.use((err, req, res, next) => {\n  console.error(\"🔥 Unhandled Server Error:\", err.stack);\n  const statusCode = err.statusCode || 500;\n  res.status(statusCode).json({\n    error: true,\n    message: err.message || 'Internal Server Error'\n  });\n});\n",
        "content": "<h2>🟢 Chapter 4: Defensive Error Handling & Input Validation</h2>\n<p>Never let unhandled Promise rejections crash your Node process. Modern Express APIs use centralized 4-parameter error middleware to catch and serialize errors predictably.</p>"
      },
      {
        "title": "File Uploads, Streaming Responses & Rate Limiting Guardrails",
        "language": "javascript",
        "starterCode": "import rateLimit from 'express-rate-limit';\n\n// Prevent brute-force DDoS attacks\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // Limit each IP to 100 requests per window\n  message: { error: 'Too many requests, try again later.' }\n});\n\napp.use('/api/', limiter);\n",
        "content": "<h2>🟢 Chapter 5: API Security & Rate Limiting Guardrails</h2>\n<p>Protect public APIs against abuse by introducing IP-based rate limiting, request payload size boundaries, and compression.</p>"
      }
    ],
    "exercises": [
      {
        "title": "Express Route Handler",
        "instructions": "Create a GET /api/stats endpoint that returns { online: true, players: 42 } with status 200.",
        "starterCode": "const app = express();",
        "solution": "app.get(\"/api/stats\", (req, res) => res.status(200).json({ online: true, players: 42 }));",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed route test"
          }
        ]
      },
      {
        "title": "Centralized Error Middleware",
        "instructions": "Write an Express error-handling middleware function with (err, req, res, next).",
        "starterCode": "function errorHandler(err, req, res, next) {}",
        "solution": "function errorHandler(err, req, res, next) { res.status(err.status || 500).json({ error: err.message }); }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed error middleware test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 10 Mastery Quiz: Node.js & Express",
      "questions": [
        {
          "question": "What is the signature of an Express error-handling middleware?",
          "options": [
            "(req, res) => {}",
            "(req, res, next) => {}",
            "(err, req, res, next) => {}",
            "(err, req, res) => {}"
          ],
          "correct": 2,
          "explanation": "Express distinguishes error handlers by their 4-parameter signature: (err, req, res, next)."
        },
        {
          "question": "What library powers Node.js asynchronous I/O and thread pooling?",
          "options": [
            "React",
            "libuv",
            "Webpack",
            "Babel"
          ],
          "correct": 1,
          "explanation": "libuv is the multi-platform C library that powers the Node.js event loop and asynchronous I/O."
        }
      ]
    },
    "project": {
      "title": "Cyberpunk RESTful Microservice",
      "scenario": "Build a complete Express RESTful microservice with logging middleware, input validation, rate limiting, and centralized error handling.",
      "starterCode": "// Express Microservice",
      "requirements": [
        "Configure global JSON body parser",
        "Implement REST routes for full CRUD lifecycle",
        "Apply rate limiting to prevent endpoint abuse",
        "Use 4-parameter centralized error handling"
      ]
    }
  },
  "web-week-11": {
    "lessons": [
      {
        "title": "Bridging Backend & Database: Node.js Connection Pools & SQL Queries",
        "language": "javascript",
        "starterCode": "import pg from 'pg';\nconst { Pool } = pg;\n\n// Connection pool reuses database connections efficiently\nexport const pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 20, // Max 20 concurrent connections\n  idleTimeoutMillis: 30000\n});\n\nexport async function getPlayer(id) {\n  // Parameterized query prevents SQL Injection!\n  const { rows } = await pool.query('SELECT * FROM players WHERE id = $1', [id]);\n  return rows[0];\n}\n",
        "content": "<h2>🔒 Chapter 1: Node.js + PostgreSQL Connection Pooling</h2>\n<p>Opening a database connection requires a costly network handshake. A <strong>Connection Pool</strong> maintains a pool of warm connections ready for instant query execution.</p>"
      },
      {
        "title": "Password Cryptography: Salted Hashes with Argon2 / Bcrypt",
        "language": "javascript",
        "starterCode": "import bcrypt from 'bcrypt';\n\nconst SALT_ROUNDS = 12;\n\nexport async function hashPassword(plainPassword) {\n  const salt = await bcrypt.genSalt(SALT_ROUNDS);\n  return bcrypt.hash(plainPassword, salt);\n}\n\nexport async function verifyPassword(plain, hash) {\n  return bcrypt.compare(plain, hash);\n}\n",
        "content": "<h2>🔒 Chapter 2: Salted Password Hashing</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SECURITY MANDATE:</strong> <em>NEVER store plaintext passwords. Always hash passwords with an adaptive slow-hashing algorithm (Argon2 or bcrypt) using unique cryptographically secure salts.</em>\n</div>"
      },
      {
        "title": "Stateless Session Management: JSON Web Tokens (JWT) & Refresh Tokens",
        "language": "javascript",
        "starterCode": "import jwt from 'jsonwebtoken';\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'cyber_vault_secret';\n\nexport function generateAccessToken(user) {\n  return jwt.sign(\n    { id: user.id, role: user.role },\n    JWT_SECRET,\n    { expiresIn: '15m' } // Short-lived access token\n  );\n}\n",
        "content": "<h2>🔒 Chapter 3: Stateless JWT Authentication</h2>\n<p>A <strong>JSON Web Token (JWT)</strong> contains a Base64-encoded Header, Payload, and cryptographic Signature. The server verifies tokens mathematically without storing session state in memory.</p>"
      },
      {
        "title": "Role-Based Access Control (RBAC) & Protected API Middleware",
        "language": "javascript",
        "starterCode": "export function requireRole(allowedRole) {\n  return (req, res, next) => {\n    const authHeader = req.headers.authorization;\n    if (!authHeader?.startsWith('Bearer ')) {\n      return res.status(401).json({ error: 'Missing or malformed token' });\n    }\n    const token = authHeader.split(' ')[1];\n    try {\n      const decoded = jwt.verify(token, JWT_SECRET);\n      if (decoded.role !== allowedRole) {\n        return res.status(403).json({ error: 'Forbidden: Insufficient clearance' });\n      }\n      req.user = decoded;\n      next();\n    } catch (err) {\n      res.status(401).json({ error: 'Invalid or expired token' });\n    }\n  };\n}\n",
        "content": "<h2>🔒 Chapter 4: Role-Based Authorization Guardrails</h2>\n<p>Guard sensitive endpoints with middleware that verifies the JWT signature and checks user authorization roles (<code>Admin</code>, <code>Player</code>, <code>Spectator</code>).</p>"
      },
      {
        "title": "Web Security Fortress: CORS, CSRF, XSS Prevention & Helmet",
        "language": "javascript",
        "starterCode": "import helmet from 'helmet';\nimport cors from 'cors';\n\n// Attach essential HTTP security headers\napp.use(helmet());\n\n// Restrict cross-origin access to trusted domains\napp.use(cors({\n  origin: 'https://cyberquest.dev',\n  credentials: true\n}));\n",
        "content": "<h2>🔒 Chapter 5: Hardening the Full-Stack Fortress</h2>\n<ul>\n  <li><strong>Helmet:</strong> Sets secure headers (<code>Content-Security-Policy</code>, <code>X-Frame-Options</code>).</li>\n  <li><strong>CORS:</strong> Prevents unauthorized external sites from reading your API responses.</li>\n  <li><strong>XSS & CSRF:</strong> Sanitize user HTML output and use <code>SameSite=Strict</code> cookie attributes.</li>\n</ul>"
      }
    ],
    "exercises": [
      {
        "title": "Parameterized Query Guard",
        "instructions": "Write a function findUserByEmail(pool, email) that uses parameterized $1 query syntax.",
        "starterCode": "async function findUserByEmail(pool, email) {}",
        "solution": "async function findUserByEmail(pool, email) { return (await pool.query(\"SELECT * FROM users WHERE email = $1\", [email])).rows[0]; }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed query test"
          }
        ]
      },
      {
        "title": "JWT Token Verification Middleware",
        "instructions": "Create an Express middleware that checks Authorization header for Bearer token.",
        "starterCode": "function authMiddleware(req, res, next) {}",
        "solution": "function authMiddleware(req, res, next) { const t = req.headers.authorization?.split(\" \")[1]; if (!t) return res.status(401).send(); req.user = jwt.verify(t, \"secret\"); next(); }",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed auth middleware test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 11 Mastery Quiz: Auth & Security",
      "questions": [
        {
          "question": "How do Parameterized Queries prevent SQL Injection?",
          "options": [
            "By encrypting the entire database table",
            "By treating user inputs strictly as literal data rather than executable SQL code",
            "By running queries in a sandbox thread",
            "By converting SQL into JavaScript"
          ],
          "correct": 1,
          "explanation": "Parameterized queries pass user data separately from the SQL statement template, preventing malicious syntax injections."
        },
        {
          "question": "Why should passwords be hashed with bcrypt rather than standard SHA-256?",
          "options": [
            "SHA-256 is deprecated in web development",
            "bcrypt includes automatic salt generation and configurable work factors that resist GPU cracking",
            "bcrypt generates shorter hashes",
            "bcrypt is written in Python"
          ],
          "correct": 1,
          "explanation": "Fast hashes like SHA-256 can be brute-forced at billions of attempts per second; bcrypt is deliberately slow."
        }
      ]
    },
    "project": {
      "title": "Secure Full-Stack Authentication Gateway",
      "scenario": "Assemble a production-ready authentication subsystem with registration, bcrypt hashing, JWT issuance, and RBAC protected routes.",
      "starterCode": "// Authentication Gateway",
      "requirements": [
        "Connect to PostgreSQL with connection pooling and parameterized queries",
        "Hash passwords with bcrypt (12 salt rounds)",
        "Generate signed JWT tokens with expiration",
        "Enforce role-based access control with Express middleware"
      ]
    }
  },
  "web-week-12": {
    "lessons": [
      {
        "title": "The Version Control Citadel: Advanced Git Branching & Rebasing Workflows",
        "language": "bash",
        "starterCode": "# Interactive rebase to squash commits cleanly before merging\ngit checkout -b feature/quantum-telemetry\ngit add .\ngit commit -m \"feat: add telemetry hooks\"\n\n# Rebase onto main with zero merge bubbles\ngit fetch origin\ngit rebase origin/main\n",
        "content": "<h2>🚀 Chapter 1: Advanced Git Branching & Clean Rebasing</h2>\n<p>Professional engineering teams maintain clean, linear commit histories using interactive rebasing (<code>git rebase -i</code>) and Trunk-Based Development, eliminating messy merge bubbles.</p>"
      },
      {
        "title": "Encapsulating Applications: Docker Containerization & Multi-Stage Builds",
        "language": "dockerfile",
        "starterCode": "# Multi-Stage Dockerfile for Minimal Production Image\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production runner: only ships runtime artifacts!\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD [\"node\", \"dist/server.js\"]\n",
        "content": "<h2>🚀 Chapter 2: Multi-Stage Docker Builds</h2>\n<p>Containers package your code and all system dependencies into an immutable image that runs identically anywhere. <strong>Multi-stage builds</strong> compile code in a heavy build container, then copy only production binaries into a lightweight runner image, slashing image sizes by up to 80%!</p>"
      },
      {
        "title": "Multi-Container Orchestration: Docker Compose (App + PostgreSQL + Redis)",
        "language": "yaml",
        "starterCode": "version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - DATABASE_URL=postgres://postgres:secret@db:5432/cyber_db\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: cyber_db\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:\n",
        "content": "<h2>🚀 Chapter 3: Local Orchestration with Docker Compose</h2>\n<p>Spin up your entire distributed architecture (frontend, Node.js API, PostgreSQL database, and Redis cache) with a single command: <code>docker compose up -d</code>!</p>"
      },
      {
        "title": "Automated Continuous Integration & Deployment (CI/CD) with GitHub Actions",
        "language": "yaml",
        "starterCode": "name: CI/CD Pipeline\non: [push]\njobs:\n  test-and-build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build\n",
        "content": "<h2>🚀 Chapter 4: GitHub Actions & Automated Pipelines</h2>\n<p>Continuous Integration (CI) automatically runs tests and linters on every pull request, ensuring broken code can never be merged into production branches.</p>"
      },
      {
        "title": "The Production Ascent: Cloud Hosting, Reverse Proxies (Nginx), SSL & Domain Launch",
        "language": "nginx",
        "starterCode": "# Nginx Reverse Proxy Configuration\nserver {\n    listen 80;\n    server_name api.cyberquest.dev;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name api.cyberquest.dev;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}\n",
        "content": "<h2>🚀 Chapter 5: Reverse Proxies, SSL & Cloud Deployment</h2>\n<div class=\"callout callout--quest\">\n  <strong>⚔️ CAPSTONE LAUNCH:</strong> <em>Deploy your containerized full-stack application behind an Nginx reverse proxy with automated Let's Encrypt SSL certificates to the global cloud!</em>\n</div>"
      }
    ],
    "exercises": [
      {
        "title": "Docker Compose Service Definition",
        "instructions": "Define a PostgreSQL service inside a docker-compose.yml mapping port 5432.",
        "starterCode": "services:\n  postgres:\n",
        "solution": "services:\n  postgres:\n    image: postgres:16-alpine\n    ports:\n      - \"5432:5432\"\n    environment:\n      POSTGRES_PASSWORD: pass",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed compose test"
          }
        ]
      },
      {
        "title": "GitHub Actions Workflow",
        "instructions": "Define a step that runs npm test using actions/setup-node.",
        "starterCode": "steps:\n",
        "solution": "steps:\n  - uses: actions/checkout@v4\n  - uses: actions/setup-node@v4\n  - run: npm test",
        "testCases": [
          {
            "input": "",
            "expectedOutput": "Passed workflow test"
          }
        ]
      }
    ],
    "quiz": {
      "title": "Module 12 Mastery Quiz: DevOps & Cloud Launch",
      "questions": [
        {
          "question": "What is the primary benefit of a Multi-Stage Dockerfile build?",
          "options": [
            "It allows Docker to run without a Linux kernel",
            "It drastically reduces final image size by discarding compilers and build tools from the runtime image",
            "It eliminates the need for Git",
            "It makes database migrations instant"
          ],
          "correct": 1,
          "explanation": "Multi-stage builds leave behind compilers, build dependencies, and source files, shipping only minimal runtime artifacts."
        },
        {
          "question": "What role does Nginx commonly serve when deployed in front of a Node.js API?",
          "options": [
            "It executes JavaScript faster than V8",
            "It acts as a reverse proxy, handling SSL termination, rate limiting, and static file caching",
            "It replaces the database",
            "It compiles TypeScript"
          ],
          "correct": 1,
          "explanation": "Nginx acts as a high-performance reverse proxy for SSL termination, load balancing, and request routing."
        }
      ]
    },
    "project": {
      "title": "Production Cloud Launch & Capstone Defense",
      "scenario": "Package your entire full-stack application with a multi-stage Dockerfile, Docker Compose stack, GitHub Actions CI pipeline, and Nginx configuration.",
      "starterCode": "# Production Capstone Deployment",
      "requirements": [
        "Write an optimized multi-stage Dockerfile",
        "Orchestrate web service and PostgreSQL with Docker Compose",
        "Configure GitHub Actions workflow for linting and testing",
        "Provide an Nginx reverse proxy configuration with SSL forwarding"
      ]
    }
  }
};
