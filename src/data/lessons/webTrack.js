// ─── Web & Full-Stack Development: The Cyberpunk Web Foundry ─────────────────────
// Comprehensive Retro-RPG Curriculum: Modules 1–6
// Full-Stack Architecture, Frontend, Databases, Backend APIs & DevOps

export const webTrackContent = {
  // ════════════════════════════════════════════════════════════════
  // MODULE 1: The Canvas of the Web: HTML5 Architecture & Modern CSS3
  // ════════════════════════════════════════════════════════════════
  'web-week-1': {
    lessons: [
      {
        title: 'Anatomy of the Modern Web: Clients, Servers & The Rendering Pipeline',
        language: 'javascript',
        starterCode: `// The Anatomy of an HTTP Request / Response Cycle
console.log("🌐 Initiating DNS Lookup for 'https://cyberquest.dev'...");
const simulatedDns = { domain: 'cyberquest.dev', ip: '198.51.100.42' };
console.log(\`Resolved IP: \${simulatedDns.ip}\`);

// TCP 3-Way Handshake -> TLS Handshake -> HTTP GET /
console.log("Client sends: GET / HTTP/2 -> Server returns: HTML Payload (200 OK)");
console.log("Browser parsing: HTML Tokens -> DOM Tree -> CSSOM -> Layout -> Paint");
`,
        content: `
<h2>🌐 Chapter 1: Anatomy of the Modern Web</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="Cyberpunk Fullstack Web Foundry" />
  <div class="pixel-caption">
    SECTOR 01: THE DIGITAL ETHER — HOW PACKETS BECOME INTERACTIVE PIXELS
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Welcome to the Cyberpunk Web Foundry, initiate architect! Before you assemble massive client-side applications, construct relational database vaults, or orchestrate cloud servers, you must understand the bedrock physics of the Internet: what actually happens when a human enters a URL into their browser, and what fundamental components comprise every single website on earth.</em>
</div>

<h3>The Holy Trinity of the Web</h3>
<p>Every website you have ever visited—from a humble personal blog to massive platforms like YouTube or GitHub—is forged from three elemental technologies running in the user's browser (the client):</p>

<ul>
  <li><strong>HTML5 (Structure):</strong> The skeletal blueprint. Defines what content exists on the page: headings, paragraphs, buttons, navigation links, forms, and images.</li>
  <li><strong>CSS3 (Presentation):</strong> The visual armor and skin. Dictates typography, color palettes, spacing, animations, responsive grid layouts, and visual hierarchy.</li>
  <li><strong>JavaScript (Behavior):</strong> The neural engine. Powers dynamic interactivity, user clicks, real-time data fetching from remote servers, and client-side application state.</li>
</ul>

<h3>The Client-Server Dance: From URL to Pixels</h3>
<p>When you type <code>https://codequest.dev</code> into your address bar and press Enter, a lightning-fast sequence of network events unfolds:</p>

<pre class="ascii-diagram">
[ Browser Client ]                                     [ Origin Server / CDN ]
       |                                                         |
       | --- 1. DNS Query (What is the IP of codequest.dev?) --> | [DNS Resolver]
       | <-- Returns IP: 104.21.55.2 --------------------------- |
       |                                                         |
       | --- 2. TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) ---> |
       | --- 3. TLS / SSL Handshake (Cryptographic Keys) ------> |
       |                                                         |
       | --- 4. HTTP GET / HTTP/2 Request ---------------------> |
       | <-- 5. HTTP 200 OK + Raw HTML Byte Stream ------------- | [Web Server]
       |                                                         |
</pre>

<h3>The Critical Rendering Path: How Browsers Paint Pixels</h3>
<p>Once raw bytes arrive over the wire, the browser's rendering engine (such as Blink in Chrome/Edge, Gecko in Firefox, or WebKit in Safari) executes the <strong>Critical Rendering Path</strong>:</p>

<ol>
  <li><strong>DOM Tree Construction:</strong> Bytes are decoded into characters, tokenized into HTML tags, and assembled into a parent-child tree structure called the <strong>Document Object Model (DOM)</strong>.</li>
  <li><strong>CSSOM Construction:</strong> External stylesheets and <code>&lt;style&gt;</code> blocks are parsed into the <strong>CSS Object Model (CSSOM)</strong>.</li>
  <li><strong>Render Tree Synthesis:</strong> The DOM and CSSOM are merged into the <em>Render Tree</em>, discarding hidden elements like <code>&lt;head&gt;</code> or elements styled with <code>display: none</code>.</li>
  <li><strong>Layout (Reflow):</strong> The browser computes the exact geometric coordinates and pixel dimensions of every visible box on the viewport screen.</li>
  <li><strong>Painting & Compositing:</strong> Pixels are drawn into layers and rasterized onto the GPU display buffer.</li>
</ol>

<div class="callout callout--tip">
  <strong>🔮 Senior Architect Insight:</strong> Modern web performance is won or lost during the Critical Rendering Path! Minimizing render-blocking stylesheets and unoptimized JavaScript allows browsers to achieve instantaneous First Contentful Paint (FCP).
</div>
`,
      },
      {
        title: 'The Structural Skeleton: Semantic HTML5 & Accessibility Runes',
        language: 'html',
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neon Citadel Guild</title>
</head>
<body>
    <header>
        <nav aria-label="Main Navigation">
            <a href="#quests">Active Quests</a>
            <a href="#armory">Cyber Armory</a>
        </nav>
    </header>

    <main>
        <article>
            <h1>Contract: Rogue AI Elimination</h1>
            <p>Level Requirement: Adept (Lvl 15+)</p>
            <button type="button">Accept Bounty</button>
        </article>
    </main>

    <footer>
        <p>&copy; 2026 Neon Citadel Syndicate. All rights reserved.</p>
    </footer>
</body>
</html>`,
        content: `
<h2>🏛️ Semantic HTML5 & Accessible Architecture</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Before CSS adds neon glimmers or JavaScript adds interactivity, your document must stand solid on semantic foundations. Learn why wrapping everything in generic &lt;div&gt; tags is an architectural sin, and how semantic HTML5 guarantees SEO dominance and universal accessibility.</em>
</div>

<h3>Why Semantic Elements Matter</h3>
<p>In the dark ages of the early web, developers structured entire pages using generic division tags: <code>&lt;div id="header"&gt;</code>, <code>&lt;div class="nav"&gt;</code>, <code>&lt;div class="footer"&gt;</code>. These tags convey zero semantic meaning to search engines, screen readers, or browser parsing engines.</p>

<p>HTML5 introduced dedicated semantic landmark tags that state their purpose directly:</p>

<table class="lesson-table">
  <thead><tr><th>Semantic Tag</th><th>Architectural Purpose</th><th>Accessibility Landmark</th></tr></thead>
  <tbody>
    <tr><td><code>&lt;header&gt;</code></td><td>Introductory branding, logo, search bars, or top banners</td><td><code>banner</code></td></tr>
    <tr><td><code>&lt;nav&gt;</code></td><td>High-level navigation menu links</td><td><code>navigation</code></td></tr>
    <tr><td><code>&lt;main&gt;</code></td><td>The single, central, non-repeating core content of the document</td><td><code>main</code></td></tr>
    <tr><td><code>&lt;article&gt;</code></td><td>Self-contained content suitable for independent syndication (blog post, product card)</td><td><code>article</code></td></tr>
    <tr><td><code>&lt;section&gt;</code></td><td>Thematic grouping of content, typically introduced with a heading tag (<code>&lt;h2&gt;</code>)</td><td><code>region</code></td></tr>
    <tr><td><code>&lt;aside&gt;</code></td><td>Secondary or tangentially related content (sidebars, related quests, ads)</td><td><code>complementary</code></td></tr>
    <tr><td><code>&lt;footer&gt;</code></td><td>Closing metadata, copyright, legal terms, and site-map links</td><td><code>contentinfo</code></td></tr>
  </tbody>
</table>

<h3>Accessible Forms (a11y) & Input Architecture</h3>
<p>Forms are how users submit data back to servers. Accessible form inputs <em>must</em> be paired with explicit <code>&lt;label&gt;</code> elements connected via the <code>for</code> and <code>id</code> attributes:</p>

<pre><code>&lt;!-- Proper accessible form binding --&gt;
&lt;form action="/api/v1/auth/login" method="POST"&gt;
    &lt;div class="form-group"&gt;
        &lt;label for="pilot-email"&gt;Pilot Call-Sign Email:&lt;/label&gt;
        &lt;input 
            type="email" 
            id="pilot-email" 
            name="email" 
            required 
            placeholder="cyph3r@matrix.io" 
            autocomplete="email"
        /&gt;
    &lt;/div&gt;
    &lt;button type="submit"&gt;Engage Uplink&lt;/button&gt;
&lt;/form&gt;</code></pre>

<div class="callout callout--warn">
  <strong>⚠️ Accessibility Law:</strong> Never replace a native <code>&lt;button&gt;</code> with a <code>&lt;div onClick="..."&gt;</code>! Native buttons provide automatic keyboard focus via Tab, respond to the Enter and Space keys, and announce their role to screen-reading assistive technologies out of the box.
</div>
`,
      },
      {
        title: 'The Box Model Alchemy & Modern CSS Variables',
        language: 'css',
        starterCode: `/* Modern CSS Box Model & Design Tokens */
:root {
    --color-bg: #0d1117;
    --color-neon-cyan: #00e5ff;
    --color-neon-pink: #ff007f;
    --font-cyber: 'Space Grotesk', system-ui, sans-serif;
    --border-radius-sm: 6px;
    --spacing-unit: 8px;
}

/* Universal box-sizing reset: Border-box is essential! */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.quest-card {
    background: var(--color-bg);
    color: #ffffff;
    border: 2px solid var(--color-neon-cyan);
    border-radius: var(--border-radius-sm);
    padding: calc(var(--spacing-unit) * 3); /* 24px */
    margin-bottom: calc(var(--spacing-unit) * 2);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
}`,
        content: `
<h2>📦 The CSS Box Model & Modern Styling Tokens</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Every element on a web page is an invisible rectangular box. If you do not master how margin, border, padding, and content dimensions calculate, your layouts will shatter across screens. Learn the universal border-box reset and harness CSS Custom Properties (CSS Variables) to forge clean design systems.</em>
</div>

<h3>The 4 Layers of the Box Model</h3>
<p>From inside out, every rendered HTML element comprises four concentric rectangular regions:</p>

<pre class="ascii-diagram">
+---------------------------------------------------------+
| MARGIN (Transparent spacing pushing away siblings)     |
|   +-------------------------------------------------+   |
|   | BORDER (Visible outline stroke around element)  |   |
|   |   +-----------------------------------------+   |   |
|   |   | PADDING (Inner breathing space)         |   |   |
|   |   |   +---------------------------------+   |   |   |
|   |   |   | CONTENT (Text, images, widgets) |   |   |   |
|   |   |   +---------------------------------+   |   |   |
|   |   +-----------------------------------------+   |   |
|   +-------------------------------------------------+   |
+---------------------------------------------------------+
</pre>

<h3>The Critical Difference: Content-Box vs Border-Box</h3>
<p>By default, browser stylesheets apply <code>box-sizing: content-box</code>. In this archaic mode, if you specify <code>width: 300px; padding: 20px; border: 5px solid cyan;</code>, the actual computed width on screen becomes:</p>
<pre><code>300px (content) + 40px (left/right padding) + 10px (left/right border) = 350px!</code></pre>

<p>This causes containers to unexpectedly overflow and break grid alignments! The modern standard applied to 100% of commercial applications is <code>box-sizing: border-box</code>:</p>

<pre><code>*, *::before, *::after {
    box-sizing: border-box; /* Width includes content, padding, and border! */
}</code></pre>

<h3>CSS Specificity Wars</h3>
<p>When multiple rules target the same element, browsers resolve conflicts using <strong>Specificity Weight</strong>:</p>
<ol>
  <li><strong>Inline styles (<code>style="..."</code>):</strong> Weight = (1, 0, 0, 0) — Highest priority!</li>
  <li><strong>IDs (<code>#hero-banner</code>):</strong> Weight = (0, 1, 0, 0)</li>
  <li><strong>Classes, attributes & pseudo-classes (<code>.active</code>, <code>[type="text"]</code>, <code>:hover</code>):</strong> Weight = (0, 0, 1, 0)</li>
  <li><strong>Element tags & pseudo-elements (<code>h1</code>, <code>p</code>, <code>::before</code>):</strong> Weight = (0, 0, 0, 1)</li>
</ol>

<h3>CSS Custom Properties (Variables)</h3>
<p>Declare reusable variables inside the <code>:root</code> pseudo-class. They cascade through the entire DOM tree and can be dynamically updated via JavaScript at runtime:</p>

<pre><code>:root {
    --accent-glow: #00e5ff;
}

.button--primary {
    background-color: var(--accent-glow);
    border: 1px solid var(--accent-glow);
}</code></pre>
`,
      },
      {
        title: 'Architecting Fluid Layouts: Flexbox & CSS Grid Mastery',
        language: 'css',
        starterCode: `/* 1D Alignment: Flexbox for Navigation Bar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 2rem;
}

/* 2D Responsive Dashboard: CSS Grid */
.dashboard-grid {
    display: grid;
    /* Auto-fit responsive columns without media queries! */
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
}

/* Media Query for Mobile Viewports */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
    }
}`,
        content: `
<h2>📐 Modern Layout Engines: Flexbox & CSS Grid</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Gone are the days of float hacks and HTML table layouts. Today, two layout engines dominate all web design: Flexbox (for 1-dimensional item distribution) and CSS Grid (for 2-dimensional page architecture). Master when and how to wield both.</em>
</div>

<h3>Flexbox: The 1-Dimensional Powerhouse</h3>
<p>Flexbox calculates spacing and alignment along a <strong>single axis</strong> (either horizontally as a row, or vertically as a column):</p>

<ul>
  <li><code>display: flex</code>: Activates the flex formatting context on child elements.</li>
  <li><code>flex-direction: row | column</code>: Defines the Main Axis direction.</li>
  <li><code>justify-content</code>: Aligns children along the <strong>Main Axis</strong> (<code>flex-start</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>).</li>
  <li><code>align-items</code>: Aligns children along the <strong>Cross Axis</strong> (<code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code>).</li>
  <li><code>gap: 16px</code>: Provides consistent spacing between items without needing margin hacks.</li>
</ul>

<h3>CSS Grid: The 2-Dimensional Blueprint</h3>
<p>CSS Grid controls both <strong>rows and columns simultaneously</strong>. It is the ultimate tool for dashboards, card lists, and full-page layouts:</p>

<pre><code>.guild-armory-grid {
    display: grid;
    /* Magic responsive formula:
       - repeat(auto-fit, ...): Creates as many columns as fit the screen
       - minmax(280px, 1fr): Each card is at least 280px, expanding evenly to fill space
    */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}</code></pre>

<h3>The Rule of Thumb: When to Use Which?</h3>
<table class="lesson-table">
  <thead><tr><th>Scenario</th><th>Best Choice</th><th>Why?</th></tr></thead>
  <tbody>
    <tr><td>Navigation bar / breadcrumbs</td><td><strong>Flexbox</strong></td><td>1-dimensional row where items distribute space based on their content size.</td></tr>
    <tr><td>Product catalog / photo gallery</td><td><strong>CSS Grid</strong></td><td>2-dimensional matrix where columns and rows must align perfectly across items.</td></tr>
    <tr><td>Centered modal dialog</td><td><strong>Flexbox or Grid</strong></td><td>Both achieve <code>place-items: center</code> or <code>margin: auto</code> with 2 lines of CSS!</td></tr>
  </tbody>
</table>
`,
      },
    ],
    exercises: [
      {
        title: 'DOM Dimension Calculator & Box Model Sizing',
        language: 'javascript',
        description: `
<p>Write a function <code>computeBoxWidth(contentWidth, paddingLeft, paddingRight, borderLeft, borderRight, boxSizing)</code> that calculates the total rendered element width on screen in pixels.</p>
<ul>
  <li>If <code>boxSizing === 'content-box'</code>: Total width = content + padding + border.</li>
  <li>If <code>boxSizing === 'border-box'</code>: Total width is clamped strictly to <code>contentWidth</code> (as padding and border fit inside).</li>
</ul>
        `,
        starterCode: `function computeBoxWidth(contentWidth, paddingLeft, paddingRight, borderLeft, borderRight, boxSizing) {
    if (boxSizing === 'border-box') {
        return contentWidth;
    }
    return contentWidth + paddingLeft + paddingRight + borderLeft + borderRight;
}

// Test runs
console.log("Content-box width:", computeBoxWidth(300, 20, 20, 5, 5, 'content-box'));
console.log("Border-box width:", computeBoxWidth(300, 20, 20, 5, 5, 'border-box'));
`,
        expectedOutput: `Content-box width: 350\nBorder-box width: 300`,
        hints: ['Remember that border-box absorbs padding and border into the specified content width!'],
      },
      {
        title: 'Flexbox Layout Space Distribution Engine',
        language: 'javascript',
        description: `
<p>Write a function <code>calculateFlexGap(containerWidth, itemCount, itemWidth)</code> that calculates the remaining free space divided evenly as gaps between items (equivalent to <code>justify-content: space-between</code>).</p>
<p>Formula: <code>(containerWidth - (itemCount * itemWidth)) / (itemCount - 1)</code>. Return the rounded integer gap.</p>
        `,
        starterCode: `function calculateFlexGap(containerWidth, itemCount, itemWidth) {
    const totalItemWidth = itemCount * itemWidth;
    const freeSpace = containerWidth - totalItemWidth;
    const gapCount = itemCount - 1;
    return Math.floor(freeSpace / gapCount);
}

console.log("Gap on 1000px container with 4 items of 200px:", calculateFlexGap(1000, 4, 200));
console.log("Gap on 800px container with 3 items of 200px:", calculateFlexGap(800, 3, 200));
`,
        expectedOutput: `Gap on 1000px container with 4 items of 200px: 66\nGap on 800px container with 3 items of 200px: 100`,
        hints: ['Subtract the sum of all item widths from container width, then divide by (itemCount - 1).'],
      },
    ],
    quiz: [
      {
        question: 'What is the primary benefit of setting box-sizing: border-box on all elements?',
        options: [
          'It automatically converts all block elements into flex items',
          'Padding and borders are included within the declared element width, preventing unexpected layout overflow',
          'It makes all elements load asynchronously without blocking the DOM parser',
          'It forces search engines to index CSS variables with higher priority'
        ],
        correctIndex: 1,
        explanation: 'Under border-box, padding and border do not increase the total rendered width beyond the declared width, eliminating horizontal scrollbars and layout breaks.',
      },
      {
        question: 'Which of the following HTML5 elements provides an accessible landmark for the primary, unique content of a document?',
        options: ['<section>', '<main>', '<content>', '<div id="main">'],
        correctIndex: 1,
        explanation: '<main> is the official HTML5 semantic element that conveys the primary unique content of the page and acts as the "main" landmark for screen readers.',
      },
      {
        question: 'How do you create an auto-wrapping responsive grid of cards that adapts to screen width without any media queries?',
        options: [
          'display: flex; flex-direction: auto-fit;',
          'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));',
          'columns: 3 auto;',
          'grid-template-rows: auto-fill 100%;'
        ],
        correctIndex: 1,
        explanation: 'repeat(auto-fit, minmax(280px, 1fr)) automatically calculates how many columns of at least 280px fit in the available width, wrapping smoothly across all screens.',
      },
    ],
    project: {
      title: 'Neon Guild Hall Landing Page & Design Token Architecture',
      description: `
<h2>Project: Neon Guild Hall Landing Page</h2>
<p>Construct a fully responsive, semantic HTML5 and modern CSS3 landing page for the <em>Neon Citadel Guild</em>. The application must feature structured semantic tags, a design token system via CSS variables, a responsive navigation header, and a card grid showcasing active mercenary contracts.</p>
`,
      language: 'html',
      starterCode: `<!-- Neon Guild Hall Master Template -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neon Citadel Syndicate</title>
</head>
<body>
    <!-- TODO: Build semantic header with nav, main contract showcase grid, and accessible footer -->
    <header class="guild-header">
        <h1>Neon Citadel Syndicate</h1>
    </header>
</body>
</html>`,
      requirements: [
        'Utilize semantic HTML5 structural elements: <header>, <nav>, <main>, <article>, <section>, <footer>',
        'Implement universal box-sizing: border-box reset with zeroed default margins',
        'Define a CSS custom property design system (:root) with at least 4 color, spacing, and typography tokens',
        'Build a responsive 2D CSS Grid for quest contracts using repeat(auto-fit, minmax(...))',
        'Ensure all interactive elements have accessible labels and hover focus states'
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 2: The Neural Engine: Core JavaScript & Dynamic Interactivity
  // ════════════════════════════════════════════════════════════════
  'web-week-2': {
    lessons: [
      {
        title: 'The JavaScript Runtime: V8 Engine, Execution Context & Closures',
        language: 'javascript',
        starterCode: `// Execution Context, Lexical Scope & Closures
function createBankVault(initialBalance) {
    let secretBalance = initialBalance; // Enclosed in closure memory!

    return {
        deposit(amount) {
            secretBalance += amount;
            return \`Deposited \${amount}. Vault Balance: \${secretBalance}\`;
        },
        getBalance() {
            return secretBalance;
        }
    };
}

const myVault = createBankVault(500);
console.log(myVault.deposit(250));
console.log("Current Vault Credits:", myVault.getBalance());
// Note: secretBalance cannot be directly accessed or modified from outside!
`,
        content: `
<h2>🧠 Chapter 2: The JavaScript Runtime & Memory Model</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="JavaScript Neural Engine" />
  <div class="pixel-caption">
    SECTOR 02: THE V8 ENGINE — EXECUTION STACKS, SCOPE CHAINS & CLOSURE VAULTS
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>JavaScript is the undisputed lingua franca of the web. To write robust, bug-free applications, you must look inside the engine: understand how V8 executes instructions on the Call Stack, manages variables on the Heap, resolves lexical scope chains, and encapsulates private data with closures.</em>
</div>

<h3>The V8 Engine: Stack vs Heap</h3>
<p>When JavaScript executes, memory is partitioned into two core structures:</p>

<ul>
  <li><strong>The Call Stack:</strong> A synchronous Last-In, First-Out (LIFO) stack that tracks the currently running function execution contexts. Primitives (numbers, booleans, small strings) are stored directly on stack frames.</li>
  <li><strong>The Memory Heap:</strong> A large, unstructured region of physical RAM where complex objects, arrays, and functions reside. Variables on the stack hold reference pointers to these heap memory addresses.</li>
</ul>

<h3>Variables: const vs let vs var</h3>
<table class="lesson-table">
  <thead><tr><th>Keyword</th><th>Scope</th><th>Hoisting Behavior</th><th>Reassignable?</th></tr></thead>
  <tbody>
    <tr><td><code>const</code></td><td>Block (<code>{ ... }</code>)</td><td>Hoisted to Temporal Dead Zone (TDZ) — Cannot access before line of declaration</td><td>No (Reference is locked)</td></tr>
    <tr><td><code>let</code></td><td>Block (<code>{ ... }</code>)</td><td>Hoisted to Temporal Dead Zone (TDZ)</td><td>Yes</td></tr>
    <tr><td><code>var</code></td><td>Function / Global</td><td>Hoisted with initial value of <code>undefined</code> (Causes subtle bugs)</td><td>Yes (Legacy — avoid in modern code!)</td></tr>
  </tbody>
</table>

<h3>Closures: The Superpower of Lexical Scope</h3>
<p>A <strong>closure</strong> occurs when an inner function retains access to variables declared in its outer enclosing lexical scope, even after that outer function has finished executing and returned!</p>

<pre><code>function createCounter() {
    let count = 0; // Private state variable
    return function increment() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>

<p>Closures form the theoretical foundation for React hooks (like <code>useState</code>), module patterns, and private object encapsulation in JavaScript.</p>
`,
      },
      {
        title: 'Awakening the DOM: Dynamic Nodes, Mutation & Event Delegation',
        language: 'javascript',
        starterCode: `// DOM Node Querying & Event Delegation Pattern
/*
// HTML Context:
// <ul id="quest-list">
//   <li data-id="1" class="quest-item">Slay Goblin <button class="complete-btn">Done</button></li>
// </ul>
*/

function handleListClick(event) {
    // Event Delegation: One listener on parent handles all child clicks!
    const target = event.target;
    if (target.classList.contains('complete-btn')) {
        const parentItem = target.closest('.quest-item');
        const questId = parentItem.dataset.id;
        console.log(\`Completed Quest ID: \${questId}\`);
    }
}

console.log("Event delegation registered on parent container!");
`,
        content: `
<h2>⚡ Manipulating the DOM & Event Delegation</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>The DOM is not a static text file; it is an active object graph living in memory. Learn how to query elements, mutate attributes and styles, handle user clicks, and use the powerful Event Delegation pattern to manage hundreds of interactive elements with zero memory leaks.</em>
</div>

<h3>Querying and Mutating the DOM</h3>
<p>Modern browsers provide fast, CSS-selector-based querying methods:</p>

<ul>
  <li><code>document.querySelector('.card')</code>: Returns the first matching Element node.</li>
  <li><code>document.querySelectorAll('.card')</code>: Returns a static <code>NodeList</code> of all matching elements.</li>
  <li><code>element.classList.add('active')</code> / <code>element.classList.toggle('active')</code>: Modifies CSS classes without overwriting existing ones.</li>
  <li><code>element.setAttribute('aria-expanded', 'true')</code>: Modifies accessibility and custom data attributes.</li>
</ul>

<h3>The Event Flow: Bubbling & Capturing</h3>
<p>When an event (like a click) fires on a deeply nested button, it travels through three phases:</p>
<ol>
  <li><strong>Capture Phase:</strong> The event descends from the <code>window</code> object down through ancestors to the target.</li>
  <li><strong>Target Phase:</strong> The event arrives at the clicked element (<code>e.target</code>).</li>
  <li><strong>Bubbling Phase:</strong> The event bubbles back upwards through parent elements all the way to <code>window</code>.</li>
</ol>

<h3>Event Delegation: The Professional Pattern</h3>
<p>Instead of attaching 500 individual event listeners to 500 list items (which burns memory and breaks when new items are added dynamically), you attach <strong>one single listener</strong> to the parent list container and intercept bubbling events:</p>

<pre><code>const questList = document.getElementById('quest-list');

questList.addEventListener('click', (event) => {
    // Check if the actual clicked element matches the button
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        const item = deleteBtn.closest('.quest-item');
        item.remove(); // Safely removes element from DOM
    }
});</code></pre>
`,
      },
      {
        title: 'The Modern ES6+ Spellbook: Destructuring, Spread & Array Alchemy',
        language: 'javascript',
        starterCode: `// ES6+ Array Methods & Functional Transformations
const adventurers = [
    { name: 'Kaelen', role: 'Mage', level: 18, active: true },
    { name: 'Lyra', role: 'Rogue', level: 14, active: false },
    { name: 'Thorin', role: 'Warrior', level: 22, active: true },
    { name: 'Seraphina', role: 'Healer', level: 16, active: true }
];

// 1. Filter: Extract only active adventurers
const activeParty = adventurers.filter(a => a.active);

// 2. Map: Extract names and upgrade levels
const rosterCards = activeParty.map(({ name, role, level }) => ({
    title: \`[\${role.toUpperCase()}] \${name}\`,
    powerScore: level * 10
}));

// 3. Reduce: Calculate total party power score
const totalPower = rosterCards.reduce((sum, hero) => sum + hero.powerScore, 0);

console.log("Roster Cards:", JSON.stringify(rosterCards));
console.log("Total Party Power:", totalPower);
`,
        content: `
<h2>✨ Functional ES6+ Alchemy: Immutable Transformations</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Modern JavaScript is deeply functional. Instead of writing cumbersome imperative for-loops that mutate shared arrays, professional engineers wield immutable higher-order array methods (map, filter, reduce) and destructuring patterns.</em>
</div>

<h3>Higher-Order Array Methods</h3>
<table class="lesson-table">
  <thead><tr><th>Method</th><th>Behavior</th><th>Returns</th><th>Mutates Original?</th></tr></thead>
  <tbody>
    <tr><td><code>.map(fn)</code></td><td>Transforms every element according to the callback function</td><td>A brand-new array of equal length</td><td>No</td></tr>
    <tr><td><code>.filter(fn)</code></td><td>Tests each element; retains only elements returning <code>true</code></td><td>A new array with matching elements</td><td>No</td></tr>
    <tr><td><code>.reduce(fn, init)</code></td><td>Accumulates array values into a single result (number, object, group)</td><td>A single aggregated value</td><td>No</td></tr>
    <tr><td><code>.find(fn)</code></td><td>Locates the first item matching the predicate</td><td>The element, or <code>undefined</code></td><td>No</td></tr>
    <tr><td><code>.some(fn)</code> / <code>.every(fn)</code></td><td>Tests if at least one or all items meet a condition</td><td>Boolean (<code>true</code> / <code>false</code>)</td><td>No</td></tr>
  </tbody>
</table>

<h3>Destructuring & Spread Operator (<code>...</code>)</h3>
<p>Destructuring lets you unpack properties from objects and elements from arrays into distinct variables cleanly:</p>

<pre><code>const player = { username: 'Cypher', rank: 'Grandmaster', stats: { hp: 100, mp: 80 } };

// Object Destructuring with nested aliasing:
const { username, stats: { hp } } = player;

// Immutable Object Clone & Update via Spread:
const upgradedPlayer = {
    ...player,
    rank: 'Overlord',
    stats: { ...player.stats, hp: 120 }
};</code></pre>
`,
      },
      {
        title: 'The Asynchronous Pulse: Event Loop, Promises & Fetching Runes',
        language: 'javascript',
        starterCode: `// Asynchronous JavaScript: Promises & Async/Await
async function fetchMercenaryData(mercenaryId) {
    console.log(\`[1] Initiating network request for ID: \${mercenaryId}...\`);
    
    // Simulate async HTTP request using a Promise
    const simulatedNetworkResponse = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mercenaryId > 0) {
                resolve({ id: mercenaryId, codename: 'Valkyrie-7', status: 'Online' });
            } else {
                reject(new Error('Invalid Mercenary ID'));
            }
        }, 100);
    });

    console.log("[2] Response packet received from satellite uplink!");
    return simulatedNetworkResponse;
}

// Invoke async function
fetchMercenaryData(42)
    .then(data => console.log("[3] Processed Data:", JSON.stringify(data)))
    .catch(err => console.error("Error:", err.message));
`,
        content: `
<h2>⏱️ The Asynchronous Event Loop & The Fetch API</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>JavaScript is single-threaded: it has only one Call Stack and can execute only one line of code at any given microsecond. How then does a browser download megabytes of images, stream real-time audio, and query remote APIs without freezing the user interface? Enter the Asynchronous Event Loop.</em>
</div>

<h3>The Event Loop Mechanics</h3>
<p>When an asynchronous operation (like <code>fetch()</code> or <code>setTimeout()</code>) is invoked:</p>
<ol>
  <li>The call is handed off to browser <strong>Web APIs</strong> (running on background C++ threads).</li>
  <li>The JavaScript main thread continues executing subsequent code on the Call Stack without blocking.</li>
  <li>When the background operation completes, its callback is placed into the <strong>Task Queue (Macrotasks)</strong> or <strong>Microtask Queue</strong> (Promises).</li>
  <li>The <strong>Event Loop</strong> continuously checks: <em>"Is the Call Stack empty?"</em> As soon as the stack clears, it pulls tasks from the Microtask queue first, then the Task queue, executing them.</li>
</ol>

<h3>Promises vs Modern async / await</h3>
<p>A <strong>Promise</strong> represents a value that is not yet known but will be resolved in the future (in <code>pending</code>, <code>fulfilled</code>, or <code>rejected</code> state). While <code>.then()</code> and <code>.catch()</code> chains work, modern JavaScript prefers <code>async / await</code> for synchronous-looking readability:</p>

<pre><code>async function loadUserProfile(userId) {
    try {
        const response = await fetch(\`https://api.cyberquest.dev/users/\${userId}\`);
        if (!response.ok) {
            throw new Error(\`HTTP Error! Status: \${response.status}\`);
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Failed to load user profile:", error.message);
        throw error; // Re-throw or handle gracefully
    }
}</code></pre>
`,
      },
    ],
    exercises: [
      {
        title: 'Immutable Inventory Transformation with Map & Filter',
        language: 'javascript',
        description: `
<p>Write a function <code>filterAndBuffWeapons(inventory, minDamage, buffPercent)</code> that takes an array of weapon objects: <code>{ name: string, damage: number, broken: boolean }</code>.</p>
<ul>
  <li>Filter out all items where <code>broken === true</code>.</li>
  <li>Filter out all items where <code>damage < minDamage</code>.</li>
  <li>Map over remaining weapons to increase their damage by <code>buffPercent</code> (rounded down using <code>Math.floor</code>).</li>
  <li>Return an array of formatted strings: <code>"\${name}: \${buffedDamage} DMG"</code>.</li>
</ul>
        `,
        starterCode: `function filterAndBuffWeapons(inventory, minDamage, buffPercent) {
    return inventory
        .filter(item => !item.broken && item.damage >= minDamage)
        .map(item => {
            const buffed = Math.floor(item.damage * (1 + buffPercent / 100));
            return \`\${item.name}: \${buffed} DMG\`;
        });
}

const items = [
    { name: 'Plasma Katana', damage: 80, broken: false },
    { name: 'Rusty Pipe', damage: 15, broken: true },
    { name: 'Pulse Rifle', damage: 120, broken: false },
    { name: 'Wooden Club', damage: 25, broken: false }
];

console.log(filterAndBuffWeapons(items, 50, 20).join(', '));
`,
        expectedOutput: `Plasma Katana: 96 DMG, Pulse Rifle: 144 DMG`,
        hints: ['Chain .filter() to discard broken items and items below minDamage, then chain .map() to calculate the buff.'],
      },
      {
        title: 'Asynchronous Response Formatter & Status Parser',
        language: 'javascript',
        description: `
<p>Write a function <code>formatApiResponse(responsePacket)</code> that processes the resolved payload of an asynchronous HTTP request.</p>
<ul>
  <li>If <code>responsePacket.status !== 200</code>, return <code>"Error: Network Request Failed (\${responsePacket.status})"</code>.</li>
  <li>If successful (status 200), return <code>"User \${responsePacket.data.username} (ID: \${responsePacket.data.id}) belongs to guild [\${responsePacket.data.guildTag}]"</code>.</li>
</ul>
        `,
        starterCode: `function formatApiResponse(responsePacket) {
    if (responsePacket.status !== 200) {
        return \`Error: Network Request Failed (\${responsePacket.status})\`;
    }
    const { id, username, guildTag } = responsePacket.data;
    return \`User \${username} (ID: \${id}) belongs to guild [\${guildTag}]\`;
}

const successPacket = {
    status: 200,
    data: { id: 101, username: 'NovaGhost', guildTag: 'CYBER-ELITE' }
};

console.log(formatApiResponse(successPacket));
`,
        expectedOutput: `User NovaGhost (ID: 101) belongs to guild [CYBER-ELITE]`,
        hints: ['Check that status equals 200, unpack data fields, and format the string.'],
      },
    ],
    quiz: [
      {
        question: 'What is a JavaScript closure?',
        options: [
          'A mechanism to lock the browser window to prevent user navigation',
          'A function combined with references to its surrounding lexical scope that persists even after the outer function returns',
          'A method to terminate the Event Loop when an uncaught error occurs',
          'A special syntax used only within React class components'
        ],
        correctIndex: 1,
        explanation: 'A closure gives a function access to its outer scope variables from an inner function, preserving private state in memory.',
      },
      {
        question: 'Why is Event Delegation considered a best practice for managing dynamic lists?',
        options: [
          'It forces events to be processed synchronously on the main thread',
          'Attaching a single listener to a parent container consumes less memory and automatically handles dynamically inserted child elements',
          'It bypasses the browser CSSOM rendering pipeline',
          'It prevents cross-site scripting (XSS) attacks'
        ],
        correctIndex: 1,
        explanation: 'By taking advantage of event bubbling, a single listener on a parent handles clicks for all current and future child elements efficiently.',
      },
      {
        question: 'Which queue in the Event Loop has higher priority and executes before any Macrotasks (like setTimeout)?',
        options: ['Render Queue', 'Microtask Queue (Promises)', 'Call Stack Queue', 'I/O Polling Queue'],
        correctIndex: 1,
        explanation: 'Microtasks (Promise callbacks, queueMicrotask) are drained completely at the end of each execution turn before any Macrotasks (setTimeout, setInterval) can run.',
      },
    ],
    project: {
      title: 'Interactive Cyberpunk Quest Log & Real-Time Event Board',
      description: `
<h2>Project: Cyberpunk Quest Log & Event Board</h2>
<p>Construct a dynamic, browser-based quest management board. The application must feature real-time item creation, category filtering using functional array methods, event delegation on the task list, and simulated asynchronous server syncing.</p>
`,
      language: 'javascript',
      starterCode: `// Cyberpunk Quest Log Application Architecture
class QuestManager {
    constructor() {
        this.quests = [];
    }

    addQuest(title, difficulty, bounty) {
        const newQuest = {
            id: Date.now(),
            title,
            difficulty,
            bounty,
            completed: false
        };
        this.quests = [...this.quests, newQuest]; // Immutable update
        return newQuest;
    }

    toggleComplete(id) {
        this.quests = this.quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q);
    }
}

console.log("⚡ Quest Manager Engine initialized!");
`,
      requirements: [
        'Maintain application state immutably using modern ES6+ object and array spread patterns',
        'Implement dynamic DOM rendering using document.createElement and template literals',
        'Use Event Delegation on the container element to handle quest completions and deletions',
        'Include functional filter controls (All, Active, Completed, High Bounty) using .filter()',
        'Handle simulated asynchronous data persistence with Promises and loading states'
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 3: The Component Citadel: React & TypeScript Modern Architecture
  // ════════════════════════════════════════════════════════════════
  'web-week-3': {
    lessons: [
      {
        title: 'The 3-Tier Web Universe: Frontend, Backend & Database Demystified',
        language: 'javascript',
        starterCode: `// Architecture Representation: 3-Tier Enterprise Web Application
const threeTierArchitecture = {
    tier1_Presentation: {
        name: "Frontend Client (React + TypeScript)",
        runtime: "Web Browser / V8 Engine",
        role: "Renders visual UI, handles user input, manages local state, executes animations."
    },
    tier2_Application: {
        name: "Backend Server (Node.js + Express)",
        runtime: "Server-side Cloud Environment / Container",
        role: "Authenticates users, enforces business rules, processes payments, coordinates transactions."
    },
    tier3_Persistence: {
        name: "Database Vault (PostgreSQL)",
        runtime: "Relational Database Server / Disk Engine",
        role: "Guarantees long-term ACID persistence, enforces schema relations, performs indexed queries."
    }
};

console.log("3-Tier Architecture System Map:");
console.log(JSON.stringify(threeTierArchitecture, null, 2));
`,
        content: `
<h2>🏛️ Chapter 3: The 3-Tier Web Architecture Demystified</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="3-Tier Architecture Citadel" />
  <div class="pixel-caption">
    SECTOR 03: THE CITADEL OF TIERS — CLIENTS, APPLICATION SERVERS & PERSISTENT VAULTS
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Before mastering React or TypeScript, you must understand the grand topology of modern software engineering. A professional web application is not just a single script; it is a distributed system comprising three specialized tiers that communicate over secure network protocols.</em>
</div>

<h3>The 3-Tier Architecture Paradigm</h3>
<p>Modern commercial software cleanly separates concerns into three distinct layers:</p>

<pre class="ascii-diagram">
+--------------------------------------------------------------------+
| TIER 1: FRONTEND (PRESENTATION LAYER)                              |
| Tech: React, TypeScript, Modern CSS, Next.js                       |
| Environment: User's Web Browser or Mobile Device                  |
| Responsibility: UI components, input forms, state, accessibility  |
+--------------------------------------------------------------------+
                                 |
                     JSON via HTTPS / REST / GraphQL
                                 v
+--------------------------------------------------------------------+
| TIER 2: BACKEND (APPLICATION BUSINESS LOGIC LAYER)                 |
| Tech: Node.js, Express, Python/FastAPI, Java/Spring Boot           |
| Environment: Cloud Containers (Docker), Linux Servers              |
| Responsibility: Authentication, authorization, business rules, APIs|
+--------------------------------------------------------------------+
                                 |
                      SQL TCP Connection Pool (Port 5432)
                                 v
+--------------------------------------------------------------------+
| TIER 3: DATABASE (PERSISTENCE LAYER)                               |
| Tech: PostgreSQL, SQLite, MySQL, Redis (Cache)                     |
| Environment: Dedicated Database Cluster, Persistent SSD Disks       |
| Responsibility: Long-term data integrity, ACID transactions, JOINs |
+--------------------------------------------------------------------+
</pre>

<h3>Why Can't the Frontend Talk Directly to the Database?</h3>
<p>Novice developers often ask: <em>"Why can't my React app connect directly to PostgreSQL?"</em></p>
<ul>
  <li><strong>Security Catastrophe:</strong> Any database password or credentials embedded in frontend code are publicly readable by anyone who opens their browser's DevTools Network tab!</li>
  <li><strong>Business Rule Enforcement:</strong> The client cannot be trusted. If the frontend checked <code>if (user.isAdmin)</code>, a malicious user could tamper with the JavaScript and grant themselves administrator rights. The backend server must independently verify every request.</li>
  <li><strong>Resource Exhaustion:</strong> Opening 50,000 direct database TCP connections from 50,000 mobile phones would immediately crash any database server. The backend uses a <em>Connection Pool</em> to multiplex requests efficiently.</li>
</ul>
`,
      },
      {
        title: 'Why Frameworks? React, Virtual DOM & Declarative JSX',
        language: 'javascript',
        starterCode: `// React Declarative Paradigm Simulation
// Instead of manual DOM manipulation:
// const el = document.createElement('div'); el.innerText = ...; parent.appendChild(el);

// In React, UI is a Pure Function of State: UI = f(State)
function renderQuestBadge({ title, rank, isCompleted }) {
    return {
        type: 'div',
        props: {
            className: \`quest-badge quest-badge--\${rank.toLowerCase()}\`,
            children: [
                { type: 'h3', props: { children: title } },
                { type: 'span', props: { children: isCompleted ? '✅ CLEARED' : '⏳ ACTIVE' } }
            ]
        }
    };
}

const vdomNode = renderQuestBadge({ title: 'Neon Dragon Bounty', rank: 'S-Class', isCompleted: true });
console.log("Virtual DOM Tree Node:", JSON.stringify(vdomNode, null, 2));
`,
        content: `
<h2>⚛️ Why React? Declarative UI & The Virtual DOM</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>As web applications grow to include thousands of interactive buttons, live chat feeds, and complex shopping carts, updating the DOM manually using document.querySelector becomes an unmaintainable nightmare known as "Spaghetti Code". Discover how React conquered the web through Declarative Programming and the Virtual DOM.</em>
</div>

<h3>Imperative vs Declarative Programming</h3>
<ul>
  <li><strong>Imperative (Vanilla JS):</strong> You instruct the browser <em>step-by-step how</em> to change the DOM: find element #card, remove class 'hidden', create a span, append it to child #3, update innerText. If one step gets out of sync, your UI corrupts.</li>
  <li><strong>Declarative (React):</strong> You describe <em>what</em> the UI should look like for any given state: <code>return &lt;Card user={user} /&gt;</code>. When state changes, React handles all the low-level DOM mutations behind the scenes.</li>
</ul>

<h3>The Virtual DOM & Reconciliation Engine</h3>
<p>Direct DOM updates in the browser are slow because they trigger expensive Reflow (Layout) and Repaint cycles. React solves this with an in-memory representation called the <strong>Virtual DOM</strong>:</p>

<ol>
  <li>When a component's state updates, React creates a new lightweight Virtual DOM object tree.</li>
  <li>React runs a lightning-fast <strong>Diffing Algorithm</strong> comparing the new tree with the previous Virtual DOM snapshot.</li>
  <li>React calculates the minimal set of changes (the "patch") and updates only the altered DOM elements in a single batched operation. This process is called <strong>Reconciliation</strong>.</li>
</ol>

<h3>What is JSX? (JavaScript XML)</h3>
<p>JSX is a syntax extension that allows developers to write HTML-like structures directly inside JavaScript files:</p>

<pre><code>function HeroCard({ name, level, role }) {
    return (
        &lt;div className="hero-card"&gt;
            &lt;h2&gt;{name}&lt;/h2&gt;
            &lt;p&gt;Level {level} {role}&lt;/p&gt;
        &lt;/div&gt;
    );
}</code></pre>
<p>A compiler like Babel or Vite transpiles this JSX into standard JavaScript function calls: <code>React.createElement('div', { className: 'hero-card' }, ...)</code>.</p>
`,
      },
      {
        title: 'The Reactive Heart: State Management with useState & useEffect Hooks',
        language: 'javascript',
        starterCode: `// Simulating React Hooks State Architecture
function createComponentHookEngine() {
    let stateMemory = [];
    let stateCursor = 0;

    function useState(initialValue) {
        const cursorIndex = stateCursor;
        if (stateMemory[cursorIndex] === undefined) {
            stateMemory[cursorIndex] = initialValue;
        }

        const setState = (newValue) => {
            stateMemory[cursorIndex] = newValue;
            console.log(\`[Trigger Render] State updated at index \${cursorIndex}: \${newValue}\`);
        };

        stateCursor++;
        return [stateMemory[cursorIndex], setState];
    }

    function resetCursor() {
        stateCursor = 0;
    }

    return { useState, resetCursor };
}

const engine = createComponentHookEngine();
const [health, setHealth] = engine.useState(100);
console.log("Initial Health State:", health);
setHealth(85);
`,
        content: `
<h2>🪝 Mastering React Hooks: useState & useEffect</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Hooks are the heartbeat of modern functional React. Learn how useState manages dynamic local memory that triggers UI re-renders, and how useEffect synchronizes your components with external side effects like HTTP network requests and browser event listeners.</em>
</div>

<h3>Managing Local State: useState</h3>
<p>When a standard variable in a function changes, the UI does not update. <code>useState</code> declares a state variable preserved by React across renders:</p>

<pre><code>import { useState } from 'react';

function CharacterInventory() {
    const [gold, setGold] = useState(100);
    const [items, setItems] = useState(['Laser Dagger', 'Medkit']);

    const purchaseItem = (itemName, cost) => {
        if (gold >= cost) {
            setGold(prevGold => prevGold - cost);
            setItems(prevItems => [...prevItems, itemName]); // Always update immutably!
        }
    };

    return (
        &lt;div&gt;
            &lt;p&gt;Gold Balance: {gold}&lt;/p&gt;
            &lt;button onClick={() => purchaseItem('EMP Grenade', 50)}&gt;Buy EMP Grenade&lt;/button&gt;
        &lt;/div&gt;
    );
}</code></pre>

<h3>Handling Side Effects: useEffect</h3>
<p>Components must frequently perform side effects: fetching data from an API, subscribing to WebSockets, or setting document titles. <code>useEffect(callback, dependencies)</code> manages these operations safely:</p>

<table class="lesson-table">
  <thead><tr><th>Dependency Array</th><th>Execution Behavior</th><th>Common Use Case</th></tr></thead>
  <tbody>
    <tr><td><code>useEffect(fn)</code> (No array)</td><td>Runs on initial mount <strong>and after every single re-render</strong></td><td>Debugging (Caution: Avoid API calls here!)</td></tr>
    <tr><td><code>useEffect(fn, [])</code> (Empty array)</td><td>Runs <strong>once</strong> when component mounts onto the screen</td><td>Initial data fetching, starting timers</td></tr>
    <tr><td><code>useEffect(fn, [userId])</code></td><td>Runs on mount, and <strong>re-runs whenever userId changes</strong></td><td>Fetching new data when route parameter changes</td></tr>
    <tr><td>Return cleanup function: <code>return () => {...}</code></td><td>Runs right before component unmounts or before re-running effect</td><td>Clearing intervals, aborting fetch requests</td></tr>
  </tbody>
</table>
`,
      },
      {
        title: 'Fortifying with TypeScript: Static Types, Interfaces & Bulletproof Props',
        language: 'javascript',
        starterCode: `// TypeScript Static Type System Simulation
// In TypeScript:
/*
interface Adventurer {
    id: number;
    name: string;
    level: number;
    role: 'Mage' | 'Warrior' | 'Rogue' | 'Healer'; // Union literal type!
    isAlive?: boolean; // Optional property
}

type PartyList = Adventurer[];
*/

function validateAdventurer(hero) {
    const allowedRoles = ['Mage', 'Warrior', 'Rogue', 'Healer'];
    if (typeof hero.id !== 'number') throw new TypeError("ID must be a number!");
    if (typeof hero.name !== 'string') throw new TypeError("Name must be a string!");
    if (!allowedRoles.includes(hero.role)) throw new TypeError(\`Invalid role: \${hero.role}\`);
    return \`Adventurer \${hero.name} [\${hero.role}] is type-safe!\`;
}

console.log(validateAdventurer({ id: 1, name: 'Lyra', level: 12, role: 'Rogue' }));
`,
        content: `
<h2>🛡️ Fortifying the Frontend: TypeScript Architecture</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>JavaScript is dynamically typed: you can pass a string into a function expecting a number, and the error will not surface until a real user's browser crashes in production with: "Uncaught TypeError: undefined is not a function". TypeScript adds compile-time static type analysis, catching bugs instantly before your code ever leaves your code editor.</em>
</div>

<h3>What is TypeScript?</h3>
<p>TypeScript is a syntactic superset of JavaScript developed by Microsoft. Every valid JavaScript line is valid TypeScript, but TypeScript introduces a powerful static type engine:</p>

<ul>
  <li><strong>Compile-Time Verification:</strong> Code is checked as you type. If you mistype <code>user.namme</code> instead of <code>user.name</code>, the compiler flags the typo instantly with red squiggly lines.</li>
  <li><strong>Self-Documenting Code:</strong> Hovering over any variable, function, or API response reveals its exact shape, parameters, and return types.</li>
  <li><strong>Refactoring Confidence:</strong> Renaming a database column or component prop automatically updates or warns every affected file across a massive repository.</li>
</ul>

<h3>Defining Interfaces & Types</h3>
<p>Use <code>interface</code> to model object shapes and component props:</p>

<pre><code>// Define the shape of data returned from our backend REST API
interface QuestItem {
    id: number;
    title: string;
    bountyCredits: number;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'NIGHTMARE'; // Strict Union Type
    tags?: string[]; // Optional array of strings
}

// Typing React Component Props with TypeScript:
interface QuestCardProps {
    quest: QuestItem;
    onAccept: (questId: number) => void; // Typed callback function!
}

export function QuestCard({ quest, onAccept }: QuestCardProps) {
    return (
        &lt;div className="quest-card"&gt;
            &lt;h3&gt;{quest.title}&lt;/h3&gt;
            &lt;p&gt;Reward: {quest.bountyCredits} Credits&lt;/p&gt;
            &lt;button onClick={() => onAccept(quest.id)}&gt;Accept Bounty&lt;/button&gt;
        &lt;/div&gt;
    );
}</code></pre>
`,
      },
    ],
    exercises: [
      {
        title: 'Simulating React State Hook & Dispatch Action',
        language: 'javascript',
        description: `
<p>Write a reducer function <code>questRosterReducer(state, action)</code> that models React state transitions immutably.</p>
<ul>
  <li>Action <code>{ type: 'ADD_HERO', payload: { id, name, level } }</code>: Returns a new state object with the hero appended to the <code>heroes</code> array.</li>
  <li>Action <code>{ type: 'REMOVE_HERO', payload: id }</code>: Returns a new state object with the hero of that ID filtered out.</li>
  <li>Action <code>{ type: 'CLEAR' }</code>: Returns state with <code>heroes: []</code>.</li>
</ul>
        `,
        starterCode: `function questRosterReducer(state, action) {
    switch (action.type) {
        case 'ADD_HERO':
            return { ...state, heroes: [...state.heroes, action.payload] };
        case 'REMOVE_HERO':
            return { ...state, heroes: state.heroes.filter(h => h.id !== action.payload) };
        case 'CLEAR':
            return { ...state, heroes: [] };
        default:
            return state;
    }
}

let state = { heroes: [] };
state = questRosterReducer(state, { type: 'ADD_HERO', payload: { id: 1, name: 'Astra', level: 10 } });
state = questRosterReducer(state, { type: 'ADD_HERO', payload: { id: 2, name: 'Jax', level: 15 } });
state = questRosterReducer(state, { type: 'REMOVE_HERO', payload: 1 });

console.log("Roster Count:", state.heroes.length);
console.log("Remaining Hero:", state.heroes[0].name);
`,
        expectedOutput: `Roster Count: 1\nRemaining Hero: Jax`,
        hints: ['Always return a new state object using spread syntax (...state) and return a new array.'],
      },
      {
        title: 'TypeScript Interface & Type Guard Validator',
        language: 'javascript',
        description: `
<p>Write a type guard function <code>isApiSuccess(response)</code> that validates if an API response matches the shape: <code>{ status: 'success', data: Array }</code>.</p>
<p>Return <code>true</code> if <code>response.status === 'success'</code> and <code>Array.isArray(response.data)</code>, otherwise return <code>false</code>.</p>
        `,
        starterCode: `function isApiSuccess(response) {
    if (!response || typeof response !== 'object') return false;
    return response.status === 'success' && Array.isArray(response.data);
}

console.log("Valid Payload:", isApiSuccess({ status: 'success', data: [1, 2, 3] }));
console.log("Invalid Payload:", isApiSuccess({ status: 'error', message: 'Unauthorized' }));
console.log("Malformed Payload:", isApiSuccess({ status: 'success', data: 'not-an-array' }));
`,
        expectedOutput: `Valid Payload: true\nInvalid Payload: false\nMalformed Payload: false`,
        hints: ['Check that response is an object, status equals "success", and Array.isArray(response.data) is true.'],
      },
    ],
    quiz: [
      {
        question: 'What is the fundamental role of the Backend (Tier 2) in a 3-Tier Architecture?',
        options: [
          'To render high-speed HTML5 canvas graphics and CSS Grid layouts',
          'To securely authenticate users, enforce business logic, and broker safe access to the database',
          'To replace the browser V8 JavaScript engine with a native C++ compiler',
          'To store CSS variables in local browser storage'
        ],
        correctIndex: 1,
        explanation: 'The backend serves as the trusted gatekeeper that protects database credentials, validates requests, enforces business rules, and serves structured JSON to clients.',
      },
      {
        question: 'Why does React require that state updates be performed immutably?',
        options: [
          'Direct mutations prevent React from detecting that values changed, breaking shallow reference equality checks and stopping re-renders',
          'JavaScript throws a fatal memory syntax error when modifying object keys',
          'Immutability is required only when deploying applications inside Docker containers',
          'Mutable objects cannot be converted into JSON strings'
        ],
        correctIndex: 0,
        explanation: 'React relies on shallow object reference equality (prevProps !== nextProps) to determine if a component needs to re-render. Mutating an object in place keeps the same memory address, preventing updates.',
      },
      {
        question: 'What is the key advantage of TypeScript union literal types (e.g. type Status = "pending" | "success" | "failed")?',
        options: [
          'They compress string sizes in physical memory by 50%',
          'They restrict values strictly to the allowed strings at compile time, eliminating invalid state typos',
          'They automatically translate English strings into foreign languages',
          'They convert strings into relational SQL primary keys'
        ],
        correctIndex: 1,
        explanation: 'Union types ensure that only valid, intended values can be assigned, eliminating typos and invalid state transitions across the codebase.',
      },
    ],
    project: {
      title: 'Full-Stack React & TypeScript Adventurer Portal',
      description: `
<h2>Project: React + TypeScript Adventurer Portal</h2>
<p>Build a production-grade React client component tree configured with TypeScript interfaces. The application must feature strongly typed props, a state-driven inventory manager using <code>useState</code>, and asynchronous API integration using <code>useEffect</code> with loading and error boundaries.</p>
`,
      language: 'javascript',
      starterCode: `// React + TypeScript Adventurer Portal Architecture
/*
interface AdventurerProfile {
    id: string;
    callsign: string;
    classType: 'Netrunner' | 'Solo' | 'Techie';
    cyberwareInstalled: string[];
    credits: number;
}
*/

console.log("🛡️ React + TypeScript Component Citadel configured!");
`,
      requirements: [
        'Define explicit TypeScript interfaces for all data models, component props, and API response envelopes',
        'Create modular functional components: NavigationBar, ProfileCard, InventoryGrid, and RecruiterForm',
        'Manage interactive local state immutably using the useState hook',
        'Handle asynchronous data synchronization with useEffect, including cleanup and error boundaries',
        'Enforce strict union types for user classifications and contract status badges'
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 4: The Vault of Persistence: Relational Databases & PostgreSQL Mastery
  // ════════════════════════════════════════════════════════════════
  'web-week-4': {
    lessons: [
      {
        title: 'The Database Divide: Relational Tables vs Document JSON Stores',
        language: 'javascript',
        starterCode: `// Relational (SQL) vs Document (NoSQL) Schema Paradigm
// 1. Relational Paradigm (PostgreSQL): Strict Normalized Tables with Foreign Key Integrity
const relationalModel = {
    users_table: [
        { id: 1, username: 'cypher_zero', email: 'cypher@nexus.net' }
    ],
    orders_table: [
        { id: 101, user_id: 1, total_amount: 450.00, created_at: '2026-03-15' }
    ]
};

// 2. Document Paradigm (MongoDB): Denormalized Nested JSON Trees
const documentModel = {
    user_document: {
        _id: '64a9f1...',
        username: 'cypher_zero',
        orders: [
            { orderId: 101, total_amount: 450.00, items: ['Plasma Rifle'] }
        ]
    }
};

console.log("Relational: Normalized rows connected by foreign keys (PostgreSQL)");
console.log("Document: Self-contained nested JSON documents (MongoDB)");
`,
        content: `
<h2>🗄️ Chapter 4: Relational Databases & PostgreSQL Mastery</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="PostgreSQL Relational Vault" />
  <div class="pixel-caption">
    SECTOR 04: THE VAULT OF PERSISTENCE — SCHEMAS, CONSTRAINTS & ACID ASSURANCE
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>RAM is ephemeral: the moment a server restarts or crashes, every variable stored in JavaScript memory vanishes instantly. To build durable software, you must store data in a persistent database. Learn why relational databases (specifically PostgreSQL) are the industry standard for full-stack engineering, and how relational schemas protect data integrity.</em>
</div>

<h3>Relational (SQL) vs Document (NoSQL)</h3>
<p>When selecting a database for your application, software architects evaluate two fundamental data paradigms:</p>

<table class="lesson-table">
  <thead><tr><th>Feature</th><th>Relational Databases (PostgreSQL, MySQL)</th><th>Document Databases (MongoDB)</th></tr></thead>
  <tbody>
    <tr><td><strong>Data Model</strong></td><td>Structured tables with defined rows and typed columns</td><td>Hierarchical, flexible JSON-like documents</td></tr>
    <tr><td><strong>Schema Enforcement</strong></td><td><strong>Strict:</strong> Database rejects data violating data types or constraints</td><td><strong>Loose:</strong> Different documents in the same collection can have different keys</td></tr>
    <tr><td><strong>Relationships</strong></td><td><strong>First-class:</strong> Foreign keys and multi-table <code>JOIN</code> operations</td><td>Denormalization / duplicated data embedded in documents</td></tr>
    <tr><td><strong>Data Integrity</strong></td><td><strong>ACID:</strong> Guaranteed transactional atomicity and mathematical consistency</td><td>Often sacrifices consistency for distributed write speed (BASE)</td></tr>
    <tr><td><strong>Best Used For</strong></td><td>E-commerce, fintech, social networks, SaaS, any relational business data</td><td>Unstructured logs, real-time sensor streams, rapid prototyping</td></tr>
  </tbody>
</table>

<h3>Why PostgreSQL is the Gold Standard</h3>
<p><strong>PostgreSQL</strong> (often simply called Postgres) is widely regarded by senior engineers as the most advanced, reliable open-source database engine in the world. It provides:</p>
<ul>
  <li><strong>Uncompromising ACID Compliance:</strong> Financial-grade data safety.</li>
  <li><strong>Rich Type Ecosystem:</strong> Native support for UUIDs, Geolocation (PostGIS), Arrays, and native <code>JSONB</code> (combining the power of SQL and NoSQL in one engine!).</li>
  <li><strong>Extensibility & Concurrency:</strong> Multi-Version Concurrency Control (MVCC) allows thousands of concurrent users to read and write without locking tables.</li>
</ul>
`,
      },
      {
        title: 'Forging the Schema: PostgreSQL Data Types, Constraints & Keys',
        language: 'javascript',
        starterCode: `// PostgreSQL DDL (Data Definition Language) Blueprint
const createUsersTableSQL = \`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    reputation_score INTEGER DEFAULT 100 CHECK (reputation_score >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`;

console.log("PostgreSQL Table Schema Blueprint:");
console.log(createUsersTableSQL);
`,
        content: `
<h2>🔨 Forging Schemas: Tables, Primary Keys & Constraints</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>A database is only as strong as its schema constraints. If your tables allow null emails, duplicate usernames, or negative account balances, your software will inevitably corrupt. Learn how to craft bulletproof PostgreSQL tables with strict keys and validation constraints.</em>
</div>

<h3>Essential PostgreSQL Data Types</h3>
<ul>
  <li><code>SERIAL</code> / <code>BIGSERIAL</code>: Auto-incrementing integer (ideal for primary keys).</li>
  <li><code>UUID</code>: 128-bit Universally Unique Identifier (e.g. <code>a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11</code>). Highly recommended for distributed systems.</li>
  <li><code>VARCHAR(n)</code>: Variable-length string with a maximum character limit (e.g. <code>VARCHAR(100)</code>).</li>
  <li><code>TEXT</code>: Unlimited-length text field (for blog posts, bios, messages).</li>
  <li><code>NUMERIC(precision, scale)</code>: Exact fixed-point decimal numbers (essential for currency, e.g. <code>NUMERIC(10, 2)</code>). Never use floating points for money!</li>
  <li><code>BOOLEAN</code>: Logical <code>TRUE</code> or <code>FALSE</code>.</li>
  <li><code>TIMESTAMP WITH TIME ZONE</code> (or <code>TIMESTAMPTZ</code>): Date and time including UTC offset. Always use timezone-aware timestamps in production!</li>
</ul>

<h3>Database Constraints: Your First Line of Defense</h3>
<p>Constraints are rules enforced directly by the database engine, rejecting invalid write operations at the hardware level:</p>

<pre><code>CREATE TABLE guild_contracts (
    id SERIAL PRIMARY KEY,                          -- Uniquely identifies each row
    title VARCHAR(120) NOT NULL,                    -- Field cannot be NULL
    bounty_credits NUMERIC(12, 2) NOT NULL,
    danger_level VARCHAR(20) DEFAULT 'MODERATE',   -- Default value if omitted
    min_level INTEGER CHECK (min_level >= 1),       -- Rejects invalid level numbers!
    created_at TIMESTAMPTZ DEFAULT NOW()
);</code></pre>
`,
      },
      {
        title: 'The Language of Queries: SQL CRUD, Filtering & Multi-Table JOINs',
        language: 'javascript',
        starterCode: `// SQL Query Simulation: Multi-Table INNER JOIN
const users = [
    { id: 1, name: 'Kaelen', role: 'Mage' },
    { id: 2, name: 'Lyra', role: 'Rogue' }
];

const quests = [
    { id: 101, user_id: 1, title: 'Harvest Mana Crystals', reward: 300 },
    { id: 102, user_id: 1, title: 'Banish Shade Wyrm', reward: 850 },
    { id: 103, user_id: 2, title: 'Infiltrate Cyber Vault', reward: 1200 }
];

// Equivalent to:
// SELECT users.name, quests.title, quests.reward
// FROM users
// INNER JOIN quests ON users.id = quests.user_id;
const joinResult = quests.map(q => {
    const user = users.find(u => u.id === q.user_id);
    return { adventurer: user.name, quest: q.title, reward: q.reward };
});

console.log("SQL INNER JOIN Result Rows:");
console.table(joinResult);
`,
        content: `
<h2>🔍 The Declarative Language: SQL CRUD & Relational JOINs</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Structured Query Language (SQL) is declarative: you describe what data you want, and PostgreSQL's Query Planner determines the mathematically optimal way to retrieve it from disk. Master the four CRUD operations, filtering predicates, aggregations, and multi-table relational JOINs.</em>
</div>

<h3>The Four CRUD Operations</h3>
<ol>
  <li><strong>Create (INSERT):</strong>
    <pre><code>INSERT INTO users (username, email, password_hash)
VALUES ('cypher', 'cypher@matrix.io', '$2b$10$e8...')
RETURNING id, created_at; -- Returns newly generated primary key!</code></pre>
  </li>
  <li><strong>Read (SELECT):</strong>
    <pre><code>SELECT id, username, email FROM users
WHERE is_active = TRUE AND reputation_score > 50
ORDER BY created_at DESC
LIMIT 10 OFFSET 0; -- Pagination!</code></pre>
  </li>
  <li><strong>Update (UPDATE):</strong>
    <pre><code>UPDATE users
SET reputation_score = reputation_score + 25
WHERE id = 42;</code></pre>
  </li>
  <li><strong>Delete (DELETE):</strong>
    <pre><code>DELETE FROM users WHERE id = 42;</code></pre>
  </li>
</ol>

<h3>Relational JOINs: Connecting the Dots</h3>
<p>Real-world data is normalized into separate tables to eliminate redundancy. We connect tables on primary and foreign keys using <strong>JOINs</strong>:</p>

<ul>
  <li><code>INNER JOIN</code>: Returns only rows where there is a match in <strong>both</strong> tables.</li>
  <li><code>LEFT JOIN</code>: Returns <strong>all</strong> rows from the left table, plus matched records from the right table (unmatched fields become <code>NULL</code>).</li>
  <li><code>GROUP BY & Aggregations</code>: Summarizes data using functions like <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>:
    <pre><code>SELECT users.username, COUNT(orders.id) AS total_orders, SUM(orders.total_amount) AS lifetime_value
FROM users
INNER JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.username
HAVING COUNT(orders.id) >= 5;</code></pre>
  </li>
</ul>
`,
      },
      {
        title: 'Relational Integrity: Foreign Key Cascades, Indexing & ACID Transactions',
        language: 'javascript',
        starterCode: `// ACID Transaction Emulation (Bank Transfer)
function executeTransfer(sender, receiver, amount) {
    console.log("BEGIN TRANSACTION;");
    
    try {
        if (sender.balance < amount) {
            throw new Error("Insufficient funds!");
        }

        sender.balance -= amount;
        console.log(\`UPDATE accounts SET balance = balance - \${amount} WHERE id = \${sender.id};\`);

        receiver.balance += amount;
        console.log(\`UPDATE accounts SET balance = balance + \${amount} WHERE id = \${receiver.id};\`);

        console.log("COMMIT; -- All changes permanently persisted!");
        return true;
    } catch (err) {
        console.log("ROLLBACK; -- Error encountered, reverting all changes!");
        return false;
    }
}

const alice = { id: 1, balance: 100 };
const bob = { id: 2, balance: 50 };
executeTransfer(alice, bob, 40);
`,
        content: `
<h2>💎 Data Integrity: Foreign Keys, Indexes & ACID Transactions</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>What happens if your server crashes in the exact millisecond between deducting money from Account A and adding it to Account B? Without ACID transactions, that money vanishes into the void! Master Foreign Key cascading rules, B-Tree indexes for lightning query speed, and ACID transaction boundaries.</em>
</div>

<h3>Foreign Keys & Referential Integrity</h3>
<p>A <strong>Foreign Key</strong> links a column in one table to the Primary Key of another table, guaranteeing that orphaned records cannot exist:</p>

<pre><code>CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL
);</code></pre>
<ul>
  <li><code>ON DELETE CASCADE</code>: If a user account is deleted, all their associated orders are automatically deleted.</li>
  <li><code>ON DELETE RESTRICT</code>: Rejects the user deletion if any orders still reference that user ID!</li>
</ul>

<h3>B-Tree Indexes: Instant Query Speed</h3>
<p>Without an index, searching for <code>WHERE email = 'user@nexus.io'</code> requires PostgreSQL to scan every single row on disk (a <strong>Sequential Scan</strong>, O(N) complexity). On a table with 10 million users, this takes seconds!</p>

<p>A <strong>B-Tree Index</strong> creates a sorted, balanced tree on disk, reducing lookup complexity to <strong>O(log N)</strong>:</p>
<pre><code>CREATE INDEX idx_users_email ON users(email);</code></pre>

<div class="callout callout--warn">
  <strong>⚠️ Indexing Trade-Off:</strong> Indexes make <code>SELECT</code> queries blazing fast, but slightly slow down <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> operations because the index tree must be updated on every write. Only index columns frequently used in <code>WHERE</code> clauses and <code>JOIN</code> conditions!
</div>

<h3>ACID: The Four Pillars of Transactions</h3>
<ul>
  <li><strong>Atomicity (All-or-Nothing):</strong> Every statement inside a <code>BEGIN ... COMMIT</code> block succeeds together, or the entire block is undone via <code>ROLLBACK</code>.</li>
  <li><strong>Consistency:</strong> The database transitions only between valid states conforming to all schema constraints.</li>
  <li><strong>Isolation:</strong> Concurrent transactions executing at the same time cannot see each other's half-finished modifications.</li>
  <li><strong>Durability:</strong> Once committed, data is written to the Write-Ahead Log (WAL) on physical disk, surviving power outages and crashes.</li>
</ul>
`,
      },
    ],
    exercises: [
      {
        title: 'Relational Query Filter & Sort Engine',
        language: 'javascript',
        description: `
<p>Write a function <code>filterAndSortUsers(usersTable, minScore, requiredRole)</code> that simulates a SQL query: <code>SELECT username, score FROM users WHERE role = ? AND score >= ? ORDER BY score DESC</code>.</p>
<p>Return an array of formatted strings: <code>"\${username} (\${score} pts)"</code>.</p>
        `,
        starterCode: `function filterAndSortUsers(usersTable, minScore, requiredRole) {
    return usersTable
        .filter(u => u.role === requiredRole && u.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .map(u => \`\${u.username} (\${u.score} pts)\`);
}

const users = [
    { username: 'Neo', role: 'Hacker', score: 95 },
    { username: 'Trinity', role: 'Hacker', score: 110 },
    { username: 'Morpheus', role: 'Captain', score: 130 },
    { username: 'Cypher', role: 'Hacker', score: 70 }
];

console.log(filterAndSortUsers(users, 80, 'Hacker').join(', '));
`,
        expectedOutput: `Trinity (110 pts), Neo (95 pts)`,
        hints: ['Filter by role and minScore, sort descending by score (b.score - a.score), and format strings.'],
      },
      {
        title: 'SQL Multi-Table Inner Join Simulator',
        language: 'javascript',
        description: `
<p>Write a function <code>simulateInnerJoin(users, orders)</code> that mimics an <code>INNER JOIN orders ON users.id = orders.user_id</code>.</p>
<p>Return formatted strings: <code>"[USERNAME] -> Order #[ORDER_ID] ($[AMOUNT])"</code>, sorted ascending by order ID.</p>
        `,
        starterCode: `function simulateInnerJoin(users, orders) {
    const results = [];
    orders.forEach(order => {
        const user = users.find(u => u.id === order.user_id);
        if (user) {
            results.push(\`\${user.username} -> Order #\${order.id} ($\${order.amount})\`);
        }
    });
    return results;
}

const users = [
    { id: 1, username: 'Astra' },
    { id: 2, username: 'Kael' }
];

const orders = [
    { id: 501, user_id: 1, amount: 250 },
    { id: 502, user_id: 2, amount: 90 },
    { id: 503, user_id: 1, amount: 120 }
];

console.log(simulateInnerJoin(users, orders).join('\\n'));
`,
        expectedOutput: `Astra -> Order #501 ($250)\nKael -> Order #502 ($90)\nAstra -> Order #503 ($120)`,
        hints: ['Iterate through orders, match user by user_id, and format each result.'],
      },
    ],
    quiz: [
      {
        question: 'Why is PostgreSQL preferred over flat files or in-memory storage for business data?',
        options: [
          'PostgreSQL automatically writes frontend CSS files for your website',
          'PostgreSQL guarantees ACID compliance, relational integrity, disk persistence, and indexed multi-user concurrency',
          'Flat files cannot be opened on Linux operating systems',
          'PostgreSQL does not require any CPU or RAM to operate'
        ],
        correctIndex: 1,
        explanation: 'PostgreSQL provides mathematical guarantees of data consistency, multi-user concurrency without file corruption, indexes for fast lookups, and durable persistence.',
      },
      {
        question: 'What is the purpose of an INNER JOIN in SQL?',
        options: [
          'To permanently merge two physical tables into a single table on disk',
          'To query rows from two tables where there is a matching value in both tables based on a join condition',
          'To delete duplicate records across different database servers',
          'To encrypt user passwords using bcrypt'
        ],
        correctIndex: 1,
        explanation: 'An INNER JOIN combines records from two tables whenever the specified ON condition (typically primary key = foreign key) evaluates to true.',
      },
      {
        question: 'What happens when a database transaction encounters an error before reaching COMMIT?',
        options: [
          'The database reboots automatically and discards all tables',
          'The entire transaction is reverted via ROLLBACK, ensuring no partial or corrupted data is saved',
          'Half the query executes and the remaining queries are skipped',
          'The error is ignored and the transaction commits anyway'
        ],
        correctIndex: 1,
        explanation: 'Atomicity (the A in ACID) guarantees that if any part of a transaction fails, a ROLLBACK restores the database to the exact state it was in before the transaction began.',
      },
    ],
    project: {
      title: 'The Guild Relational Database Schema & Query Blueprint',
      description: `
<h2>Project: PostgreSQL Relational Schema Architecture</h2>
<p>Design and write a complete PostgreSQL schema script for an enterprise mercenary guild management platform. You will define tables for Users, Mercenary Classes, Contracts, and Bounties, enforcing primary keys, foreign key cascading integrity, check constraints, and B-Tree indexes.</p>
`,
      language: 'javascript',
      starterCode: `// PostgreSQL Enterprise Guild Schema Blueprint
/*
-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Guild Contracts Table with Foreign Key
CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    contract_code VARCHAR(30) UNIQUE NOT NULL,
    client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bounty_amount NUMERIC(12, 2) NOT NULL CHECK (bounty_amount > 0),
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLAIMED', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. B-Tree Indexes for Performance Optimization
CREATE INDEX idx_contracts_client ON contracts(client_id);
CREATE INDEX idx_contracts_status ON contracts(status);
*/

console.log("🗄️ PostgreSQL Relational Schema Blueprint verified!");
`,
      requirements: [
        'Design at least 4 interconnected relational tables with proper primary and foreign keys',
        'Enforce data integrity using NOT NULL, UNIQUE, DEFAULT, and CHECK constraints',
        'Configure appropriate foreign key cascading policies (ON DELETE CASCADE or ON DELETE RESTRICT)',
        'Add B-Tree indexes to optimize columns frequently filtered in WHERE or JOIN operations',
        'Write complex multi-table SQL queries utilizing INNER JOIN, LEFT JOIN, and GROUP BY aggregations'
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 5: The Server Forge: Node.js, Express & Database Integration
  // ════════════════════════════════════════════════════════════════
  'web-week-5': {
    lessons: [
      {
        title: 'The Server Runtime: Node.js, V8 Engine & Non-Blocking I/O',
        language: 'javascript',
        starterCode: `// Node.js Server Environment Inspection
console.log("⚡ Node.js Server Runtime initialized!");
console.log(\`Node Version: \${process.version}\`);
console.log(\`Process Platform: \${process.platform} (\${process.arch})\`);
console.log(\`Process PID: \${process.pid}\`);

// Environment Variables via process.env
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(\`Server configured for port \${PORT} in \${NODE_ENV} mode.\`);
`,
        content: `
<h2>⚙️ Chapter 5: The Server Forge — Node.js & REST APIs</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="Node.js Server Foundry" />
  <div class="pixel-caption">
    SECTOR 05: THE SERVER FORGE — NON-BLOCKING I/O, REST PROTOCOLS & DATABASE POOLS
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Until 2009, JavaScript was confined exclusively inside web browsers. Ryan Dahl revolutionized computing by extracting Google Chrome's V8 engine and pairing it with a C-based event-driven I/O library called libuv: creating Node.js. Learn how Node.js powers millions of scalable backend microservices worldwide.</em>
</div>

<h3>What Makes Node.js Unique? Non-Blocking I/O</h3>
<p>Traditional servers (like Apache running PHP or old Java thread-per-request servers) assign a heavy operating system thread to every incoming HTTP connection. If 10,000 clients connect and wait for slow database queries, the server runs out of RAM and crashes.</p>

<p>Node.js uses a <strong>Single-Threaded Event Loop with Non-Blocking Asynchronous I/O</strong>:</p>
<ul>
  <li>When an HTTP request arrives asking for data from PostgreSQL, Node dispatches the query to libuv's background threadpool and immediately frees the main thread to accept more connections!</li>
  <li>When PostgreSQL finishes reading data from disk, an event signals the main thread to resume, serialize the result to JSON, and send the HTTP response.</li>
  <li>This enables a single lightweight Node.js process to handle tens of thousands of concurrent connections with minimal RAM overhead.</li>
</ul>

<h3>Node Modules: CommonJS vs ES Modules</h3>
<ul>
  <li><strong>CommonJS (Legacy standard):</strong> Uses <code>const express = require('express');</code> and <code>module.exports = app;</code>.</li>
  <li><strong>ES Modules (Modern industry standard):</strong> Uses <code>import express from 'express';</code> and <code>export default app;</code> (configured by setting <code>"type": "module"</code> in <code>package.json</code>).</li>
</ul>
`,
      },
      {
        title: 'The Rules of the Web: HTTP Protocols, Status Codes & REST Conventions',
        language: 'javascript',
        starterCode: `// REST API Endpoint & HTTP Status Code Matrix
const restApiSpec = [
    { method: 'GET', path: '/api/v1/heroes', status: 200, action: 'Retrieve list of all heroes' },
    { method: 'GET', path: '/api/v1/heroes/:id', status: 200, action: 'Retrieve single hero by ID (404 if missing)' },
    { method: 'POST', path: '/api/v1/heroes', status: 201, action: 'Create new hero from JSON body' },
    { method: 'PUT', path: '/api/v1/heroes/:id', status: 200, action: 'Replace entire hero record' },
    { method: 'PATCH', path: '/api/v1/heroes/:id', status: 200, action: 'Partially update hero fields' },
    { method: 'DELETE', path: '/api/v1/heroes/:id', status: 204, action: 'Delete hero (No Content returned)' }
];

console.log("RESTful API Endpoint Conventions:");
console.table(restApiSpec);
`,
        content: `
<h2>📡 The Rules of the Web: HTTP & RESTful Architecture</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>HTTP is the language of the Internet. Representational State Transfer (REST) is the architectural pattern that governs how web servers expose data resources to frontend clients. Learn the HTTP methods, headers, and status codes required to design professional, standardized APIs.</em>
</div>

<h3>The Anatomy of an HTTP Request & Response</h3>
<pre class="ascii-diagram">
CLIENT REQUEST:
POST /api/v1/guilds HTTP/1.1
Host: api.cyberquest.dev
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{ "guildName": "Shadow Syndicate", "realm": "Neon City" }

SERVER RESPONSE:
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/guilds/42

{ "id": 42, "guildName": "Shadow Syndicate", "created_at": "2026-03-21T18:00:00Z" }
</pre>

<h3>The 5 HTTP Status Code Families</h3>
<table class="lesson-table">
  <thead><tr><th>Range</th><th>Category</th><th>Key Examples</th></tr></thead>
  <tbody>
    <tr><td><code>2xx</code></td><td><strong>Success</strong></td><td><code>200 OK</code> (Standard fetch/update), <code>201 Created</code> (Resource created via POST), <code>204 No Content</code> (Successful DELETE)</td></tr>
    <tr><td><code>3xx</code></td><td><strong>Redirection</strong></td><td><code>301 Moved Permanently</code>, <code>304 Not Modified</code> (Cached content)</td></tr>
    <tr><td><code>4xx</code></td><td><strong>Client Error</strong></td><td><code>400 Bad Request</code> (Validation failed), <code>401 Unauthorized</code> (Missing or invalid token), <code>403 Forbidden</code> (Authenticated but lacks permissions), <code>404 Not Found</code></td></tr>
    <tr><td><code>5xx</code></td><td><strong>Server Error</strong></td><td><code>500 Internal Server Error</code> (Unhandled server crash/bug), <code>502 Bad Gateway</code>, <code>503 Service Unavailable</code></td></tr>
  </tbody>
</table>

<h3>RESTful Design Principles</h3>
<ol>
  <li><strong>Resource-Oriented URIs:</strong> Use plural nouns for resources (e.g. <code>/api/v1/contracts</code>, NOT <code>/api/v1/getContracts</code>).</li>
  <li><strong>Use Proper Verbs:</strong> Never use <code>GET</code> to modify or delete data! <code>GET</code> requests must be safe and idempotent.</li>
  <li><strong>Statelessness:</strong> The server does not remember user sessions in RAM between requests; every request must supply its own authentication credentials (such as a JWT token in the <code>Authorization</code> header).</li>
</ol>
`,
      },
      {
        title: 'The Express Foundry: Routing Pipelines, Middleware & Request Lifecycle',
        language: 'javascript',
        starterCode: `// Express Middleware Pipeline Simulation
function createExpressApp() {
    const middlewareStack = [];

    function use(fn) {
        middlewareStack.push(fn);
    }

    function handleRequest(req, res) {
        let index = 0;
        function next() {
            if (index < middlewareStack.length) {
                const currentMiddleware = middlewareStack[index++];
                currentMiddleware(req, res, next);
            }
        }
        next();
    }

    return { use, handleRequest };
}

const app = createExpressApp();

// 1. Logger Middleware
app.use((req, res, next) => {
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
    next(); // Pass control to next middleware!
});

// 2. Auth Middleware
app.use((req, res, next) => {
    if (!req.headers['authorization']) {
        console.log("Middleware check: Anonymous user detected");
    }
    next();
});

// Simulate incoming request
app.handleRequest({ method: 'GET', url: '/api/v1/adventurers', headers: {} }, {});
`,
        content: `
<h2>🚂 The Express Foundry: Middleware & Routing</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Express.js is the most popular, time-tested backend web framework for Node.js. Its elegance lies in the Middleware Pipeline: an assembly line through which every HTTP request passes, getting validated, parsed, logged, authenticated, and routed to its destination handler.</em>
</div>

<h3>What is Middleware?</h3>
<p>An Express middleware is a function with the signature <code>(req, res, next) =&gt; void</code> that has access to:</p>
<ul>
  <li><code>req</code>: The incoming Request object (headers, parameters, query strings, body).</li>
  <li><code>res</code>: The outgoing Response object (methods to set headers and send JSON).</li>
  <li><code>next</code>: A function that passes execution control to the next middleware in the chain.</li>
</ul>

<h3>Essential Middleware Built into Modern Express</h3>
<pre><code>import express from 'express';
import cors from 'cors';

const app = express();

// Enable Cross-Origin Resource Sharing (allows frontend to call API)
app.use(cors());

// Body-Parser: Parses incoming JSON request payloads onto req.body
app.use(express.json());

// Modular Route Handlers
app.get('/api/v1/heroes/:id', (req, res) => {
    const heroId = parseInt(req.params.id, 10);
    res.json({ id: heroId, name: 'CyberKnight' });
});

// Centralized Error-Handling Middleware (Must have 4 arguments!)
app.use((err, req, res, next) => {
    console.error("Server Crash Caught:", err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});</code></pre>
`,
      },
      {
        title: 'Bridging Backend & Database: Node.js Connection Pools & SQL Queries',
        language: 'javascript',
        starterCode: `// Node.js PostgreSQL Integration (pg library simulation)
class MockPgPool {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    async query(sql, params = []) {
        console.log(\`[DB Query]: \${sql}\`);
        console.log(\`[DB Params]: \${JSON.stringify(params)}\`);
        
        // Simulating parameterized query execution
        if (sql.includes('SELECT') && params[0] === 42) {
            return { rows: [{ id: 42, username: 'cypher_zero', role: 'Netrunner' }] };
        }
        return { rows: [] };
    }
}

const pool = new MockPgPool('postgresql://admin:secret@localhost:5432/guild_db');

async function getHeroById(id) {
    // PARAMETERIZED QUERY PREVENTS SQL INJECTION!
    const queryText = 'SELECT id, username, role FROM users WHERE id = $1';
    const result = await pool.query(queryText, [id]);
    return result.rows[0];
}

getHeroById(42).then(hero => console.log("Retrieved Hero from DB:", hero));
`,
        content: `
<h2>🔌 Bridging Node.js to PostgreSQL: Connection Pools & Security</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Your Express server and your PostgreSQL database are two separate running processes. To make them communicate, Node uses database client libraries like 'pg' (node-postgres). Learn why connection pooling is essential, and how parameterized queries prevent catastrophic SQL Injection vulnerabilities.</em>
</div>

<h3>Connection Pools vs Single Connections</h3>
<p>Opening a new TCP connection to PostgreSQL takes 20–50 milliseconds (handshakes, authentication, allocating process memory). If your API handles 500 requests per second, creating a new connection for every request will overwhelm your database server.</p>

<p>A <strong>Connection Pool (<code>new Pool()</code>)</strong> maintains a pre-allocated cache of reusable database connections:</p>
<pre><code>import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum 20 simultaneous open connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});</code></pre>

<h3>Preventing SQL Injection Attacks ($1, $2 Parameters)</h3>
<p>Never, under any circumstances, concatenate unsanitized user input into an SQL query string:</p>

<pre><code>// ❌ VULNERABLE TO SQL INJECTION:
const query = "SELECT * FROM users WHERE username = '" + req.body.username + "';";
// If a hacker submits: "' OR '1'='1" -> The query returns every user and password hash in the database!

// ✅ SAFE PARAMETERIZED QUERY:
const safeQuery = "SELECT id, username, email FROM users WHERE username = $1;";
const result = await pool.query(safeQuery, [req.body.username]);
// PostgreSQL treats $1 strictly as literal string data, never as executable SQL code!</code></pre>
`,
      },
    ],
    exercises: [
      {
        title: 'HTTP RESTful Route Dispatcher & Parameter Parser',
        language: 'javascript',
        description: `
<p>Write a function <code>routeDispatcher(method, path)</code> that simulates a backend router matching incoming endpoints.</p>
<ul>
  <li>If <code>method === 'GET' && path === '/api/v1/health'</code>, return <code>{ status: 200, body: 'OK' }</code>.</li>
  <li>If <code>method === 'GET' && path.startsWith('/api/v1/users/')</code>, extract the ID and return <code>{ status: 200, body: { userId: Number(path.split('/')[4]) } }</code>.</li>
  <li>Otherwise, return <code>{ status: 404, body: 'Route Not Found' }</code>.</li>
</ul>
        `,
        starterCode: `function routeDispatcher(method, path) {
    if (method === 'GET' && path === '/api/v1/health') {
        return { status: 200, body: 'OK' };
    }
    if (method === 'GET' && path.startsWith('/api/v1/users/')) {
        const parts = path.split('/');
        const id = parseInt(parts[4], 10);
        return { status: 200, body: { userId: id } };
    }
    return { status: 404, body: 'Route Not Found' };
}

console.log("Health Route:", JSON.stringify(routeDispatcher('GET', '/api/v1/health')));
console.log("User Route:", JSON.stringify(routeDispatcher('GET', '/api/v1/users/88')));
console.log("Unknown Route:", JSON.stringify(routeDispatcher('POST', '/api/v1/unknown')));
`,
        expectedOutput: `Health Route: {"status":200,"body":"OK"}\nUser Route: {"status":200,"body":{"userId":88}}\nUnknown Route: {"status":404,"body":"Route Not Found"}`,
        hints: ['Check method and exact path or prefix, extract the ID with split, and return status and body.'],
      },
      {
        title: 'Express Middleware Chain & Authentication Interceptor',
        language: 'javascript',
        description: `
<p>Write an authentication middleware function <code>authGuard(req)</code> that validates request headers.</p>
<p>If <code>req.headers.authorization === 'Bearer secret-token'</code>, set <code>req.user = { id: 1, role: 'admin' }</code> and return <code>{ authorized: true }</code>. Otherwise, return <code>{ authorized: false, status: 401 }</code>.</p>
        `,
        starterCode: `function authGuard(req) {
    const authHeader = req.headers ? req.headers.authorization : null;
    if (authHeader === 'Bearer secret-token') {
        req.user = { id: 1, role: 'admin' };
        return { authorized: true };
    }
    return { authorized: false, status: 401 };
}

const req1 = { headers: { authorization: 'Bearer secret-token' } };
const req2 = { headers: {} };

console.log("Valid Auth:", authGuard(req1).authorized);
console.log("Missing Auth:", authGuard(req2).status);
`,
        expectedOutput: `Valid Auth: true\nMissing Auth: 401`,
        hints: ['Inspect the authorization header string and compare against "Bearer secret-token".'],
      },
    ],
    quiz: [
      {
        question: 'Why does Node.js achieve high concurrency despite running on a single JavaScript execution thread?',
        options: [
          'It automatically duplicates CPU cores using quantum computing',
          'It delegates slow I/O operations (network, disk, DB queries) to background libuv threads and handles completions via the Event Loop without blocking',
          'It recompiles all JavaScript into Java bytecode before execution',
          'It runs exclusively inside Docker containers'
        ],
        correctIndex: 1,
        explanation: 'Node.js is asynchronous and event-driven. Non-blocking I/O operations are offloaded to background threads, leaving the main thread free to handle new requests.',
      },
      {
        question: 'What HTTP status code should be returned when a client successfully creates a new database record via POST?',
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctIndex: 1,
        explanation: '201 Created is the official HTTP REST status code indicating that the request succeeded and led to the creation of a new resource.',
      },
      {
        question: 'How do parameterized queries ($1, $2 in node-postgres) prevent SQL Injection attacks?',
        options: [
          'They encrypt the database hard drive',
          'They ensure user input is sent separately from the SQL command, treating input strictly as literal data that can never be executed as code',
          'They convert SQL queries into CSS selectors',
          'They restrict database access to localhost only'
        ],
        correctIndex: 1,
        explanation: 'Parameterized queries separate the query structure from the data parameters. The database engine compiles the SQL first, then binds the parameters, preventing malicious SQL code injection.',
      },
    ],
    project: {
      title: 'Production RESTful API Gateway for PostgreSQL',
      description: `
<h2>Project: Production Express REST API Gateway</h2>
<p>Build a robust Express.js REST API gateway connected to PostgreSQL. Implement CRUD endpoints for mercenary contracts, request validation middleware, JWT-based route authentication guards, and a PostgreSQL connection pool with parameterized queries.</p>
`,
      language: 'javascript',
      starterCode: `// Express REST API Gateway Entrypoint
import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'HEALTHY', uptime: process.uptime() });
});

console.log("⚡ Express Server Gateway online!");
`,
      requirements: [
        'Implement standardized RESTful endpoints following pluralized resource naming conventions',
        'Use Express middleware for request logging, CORS, body-parsing, and centralized error handling',
        'Connect to PostgreSQL using a connection pool (Pool) with environment variable configurations',
        'Enforce parameterized SQL queries ($1, $2) across all CRUD controller endpoints',
        'Return proper HTTP status codes (200, 201, 400, 401, 404, 500) with descriptive JSON envelopes'
      ],
    },
  },

  // ════════════════════════════════════════════════════════════════
  // MODULE 6: The Production Ascent: DevOps, Docker & Capstone Launch
  // ════════════════════════════════════════════════════════════════
  'web-week-6': {
    lessons: [
      {
        title: 'The Version Control Citadel: Advanced Git Workflows & Collaboration',
        language: 'javascript',
        starterCode: `// Git Branching & Merge Conflict Resolution Simulation
const gitRepository = {
    branch: 'main',
    commits: [
        { hash: 'a1b2c3d', message: 'feat: initialize full-stack repository architecture' }
    ],
    createFeatureBranch(branchName) {
        console.log(\`git checkout -b \${branchName}\`);
        return \`Switched to new branch '\${branchName}'\`;
    },
    mergeBranch(branchName) {
        console.log(\`git merge \${branchName} --no-ff\`);
        return \`Branch '\${branchName}' merged into \${this.branch}\`;
    }
};

console.log(gitRepository.createFeatureBranch('feature/postgresql-pool'));
console.log(gitRepository.mergeBranch('feature/postgresql-pool'));
`,
        content: `
<h2>🚀 Chapter 6: The Production Ascent — DevOps & Capstone Launch</h2>

<div class="lesson-pixel-art">
  <img src="/images/retro_fullstack_bg.png" alt="DevOps Production Ascent" />
  <div class="pixel-caption">
    SECTOR 06: THE PRODUCTION ASCENT — GIT WORKFLOWS, DOCKER CONTAINERS & CI/CD PIPELINES
  </div>
</div>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>Writing code on your laptop is only half the battle. Professional software engineering requires shipping code reliably to production servers around the world. Master Git branching strategies, Docker containerization, and automated CI/CD deployment pipelines.</em>
</div>

<h3>Professional Git Workflows (Trunk-Based vs GitFlow)</h3>
<p>Modern engineering teams collaborate using feature branches and Pull Requests (PRs):</p>
<ol>
  <li><strong>Create a Branch:</strong> Never commit directly to <code>main</code>! Branch off: <code>git checkout -b feat/user-authentication</code>.</li>
  <li><strong>Conventional Commits:</strong> Write clear, standardized commit messages:
    <ul>
      <li><code>feat: add JWT authentication middleware</code></li>
      <li><code>fix: resolve connection pool leak in order controller</code></li>
      <li><code>refactor: extract database query service into separate module</code></li>
    </ul>
  </li>
  <li><strong>Rebase vs Merge:</strong>
    <ul>
      <li><code>git merge</code>: Preserves history with a visible merge commit.</li>
      <li><code>git rebase main</code>: Re-applies your commits cleanly on top of the latest <code>main</code> commit, creating a linear history.</li>
    </ul>
  </li>
  <li><strong>Pull Request & Code Review:</strong> Teammates review code, automated CI tests run, and upon approval, the branch merges into <code>main</code>.</li>
</ol>
`,
      },
      {
        title: 'Encapsulating the Monolith: Docker Containerization & Multi-Stage Builds',
        language: 'javascript',
        starterCode: `// Dockerfile Multi-Stage Build Blueprint
const dockerfile = \`
# Stage 1: Build the React TypeScript Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Server Environment
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=frontend-builder /app/frontend/dist ./public
COPY server/ ./server
EXPOSE 3001
CMD ["node", "server/index.js"]
\`;

console.log("Production Dockerfile Blueprint:");
console.log(dockerfile);
`,
        content: `
<h2>🐳 Encapsulating Applications with Docker</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>"It works on my machine!" has been the curse of software developers for decades. What if your laptop has Node 20 on macOS, but the production server has Node 16 on Ubuntu Linux? Docker solves this forever by packaging your application, runtime, libraries, and dependencies into an immutable, portable Container.</em>
</div>

<h3>Containers vs Virtual Machines</h3>
<ul>
  <li><strong>Virtual Machines (VMs):</strong> Heavyweight. Each VM bundles a full guest operating system (several gigabytes in size) running on a hypervisor. Takes minutes to boot.</li>
  <li><strong>Docker Containers:</strong> Lightweight. Containers share the host Linux kernel while isolating processes in their own user-space namespaces. They boot in milliseconds and consume only megabytes of RAM!</li>
</ul>

<h3>The Multi-Stage Build Pattern</h3>
<p>In production, you do not want your 2GB development dependencies (TypeScript compilers, linters, test suites) sitting inside your deployed image. <strong>Multi-stage builds</strong> use temporary builder stages and copy only the compiled production artifacts into the final lean image:</p>

<pre><code># Multi-stage build keeps production image under 100MB!
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]</code></pre>
`,
      },
      {
        title: 'Orchestration & Automation: Docker Compose & GitHub Actions CI/CD',
        language: 'javascript',
        starterCode: `// Docker Compose Multi-Container Orchestration Blueprint
const dockerComposeYaml = \`
version: '3.8'

services:
  database:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: guild_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret_password
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api-server:
    build: .
    restart: always
    environment:
      DATABASE_URL: postgres://postgres:secret_password@database:5432/guild_db
      PORT: 3001
    ports:
      - "3001:3001"
    depends_on:
      - database

volumes:
  pgdata:
\`;

console.log("Docker Compose Multi-Container Network Configuration:");
console.log(dockerComposeYaml);
`,
        content: `
<h2>🔄 Orchestration with Docker Compose & GitHub Actions CI/CD</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>A real full-stack web application is not just one process: it has an API server and a PostgreSQL database communicating on an internal network. Docker Compose coordinates both with a single command. Meanwhile, GitHub Actions automates testing and deployment on every git push.</em>
</div>

<h3>Docker Compose: The Local Multi-Container Cloud</h3>
<p>Instead of manually starting Postgres and setting up environment variables, <code>docker-compose up -d</code> launches your entire multi-service stack:</p>
<ul>
  <li>Creates an isolated internal virtual network where containers communicate using service names (e.g. <code>postgres://database:5432/...</code>).</li>
  <li>Mounts persistent <strong>Named Volumes</strong> so database data survives container restarts.</li>
  <li>Guarantees identical local development environments for every developer on the team.</li>
</ul>

<h3>Continuous Integration & Continuous Deployment (CI/CD)</h3>
<p>CI/CD eliminates manual, error-prone FTP deployments. A <strong>GitHub Actions</strong> workflow executes in the cloud on every pull request:</p>

<pre><code>name: Full-Stack CI/CD Pipeline
on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build</code></pre>
`,
      },
      {
        title: 'The Full-Stack Capstone Ascent: Production Launch & System Architecture',
        language: 'javascript',
        starterCode: `// Full-Stack System Health Check Emulator
const fullStackSystemStatus = {
    frontend: { status: 'ONLINE', framework: 'React 18 + TypeScript', bundler: 'Vite' },
    backend: { status: 'ONLINE', runtime: 'Node.js 20', framework: 'Express' },
    database: { status: 'CONNECTED', engine: 'PostgreSQL 16', poolActive: true },
    devops: { containerized: true, ci_cd_pipeline: 'PASSING' }
};

console.log("Full-Stack Capstone System Status Verification:");
console.log(JSON.stringify(fullStackSystemStatus, null, 2));
`,
        content: `
<h2>🏆 The Capstone Ascent: Full-Stack Synthesis & Launch</h2>

<div class="callout callout--quest">
  <strong>⚔️ QUEST BRIEFING:</strong> <em>You have traversed all sectors of modern web engineering: from the atomic physics of HTML5 and CSS3, through the neural logic of JavaScript and React with TypeScript, across relational database schemas in PostgreSQL, into the server fires of Node.js and Express, and up the mountain of DevOps. Now comes the ultimate trial: architecting and launching your end-to-end full-stack capstone application.</em>
</div>

<h3>The Complete End-to-End Flow</h3>
<p>Trace the lifecycle of a user action across your newly mastered stack:</p>

<ol>
  <li><strong>User Interaction (Frontend):</strong> A user enters their email and password into a typed React component and clicks "Login".</li>
  <li><strong>Validation & HTTP Request:</strong> React validates the form, sets a loading spinner via <code>useState</code>, and invokes <code>fetch('/api/v1/auth/login')</code> with a JSON payload.</li>
  <li><strong>Server Middleware (Backend):</strong> Express intercepts the request, runs CORS checks, parses the JSON body with <code>express.json()</code>, and logs the request.</li>
  <li><strong>Database Query (Persistence):</strong> The controller borrows a client from the PostgreSQL connection pool and executes a parameterized SQL query: <code>SELECT * FROM users WHERE email = $1</code>.</li>
  <li><strong>Password Verification & JWT:</strong> Node verifies the password hash using <code>bcrypt</code>, signs a JSON Web Token (JWT), and returns a <code>200 OK</code> response with the token.</li>
  <li><strong>Client State Update:</strong> React stores the JWT token, updates global user state, and navigates the user to their private dashboard!</li>
</ol>
`,
      },
    ],
    exercises: [
      {
        title: 'Docker Compose Service Dependency Resolver',
        language: 'javascript',
        description: `
<p>Write a function <code>resolveServiceStartupOrder(services)</code> that determines the startup order of containerized services based on their <code>depends_on</code> field.</p>
<p>For example, if API depends on DB, DB must start first. Return an array of service names in order.</p>
        `,
        starterCode: `function resolveServiceStartupOrder(services) {
    // Services without dependencies start first, followed by dependent services
    const independent = services.filter(s => !s.dependsOn).map(s => s.name);
    const dependent = services.filter(s => s.dependsOn).map(s => s.name);
    return [...independent, ...dependent];
}

const config = [
    { name: 'api-gateway', dependsOn: 'database' },
    { name: 'database', dependsOn: null },
    { name: 'cache-redis', dependsOn: null }
];

console.log("Startup Order:", resolveServiceStartupOrder(config).join(' -> '));
`,
        expectedOutput: `Startup Order: database -> cache-redis -> api-gateway`,
        hints: ['Separate services with no dependencies and start them before services that have dependencies.'],
      },
      {
        title: 'CI/CD Pipeline Validation & Health Check Emulator',
        language: 'javascript',
        description: `
<p>Write a function <code>runCiPipeline(steps)</code> that iterates through an array of build steps <code>[{ name, pass }]</code>.</p>
<p>If all pass, return <code>"CI/CD Pipeline Passed: Deployed to Production"</code>. If any fail, return <code>"CI/CD Failed at step: [STEP_NAME]"</code>.</p>
        `,
        starterCode: `function runCiPipeline(steps) {
    for (const step of steps) {
        if (!step.pass) {
            return \`CI/CD Failed at step: \${step.name}\`;
        }
    }
    return "CI/CD Pipeline Passed: Deployed to Production";
}

const passingBuild = [
    { name: 'lint', pass: true },
    { name: 'test', pass: true },
    { name: 'build', pass: true }
];

const failingBuild = [
    { name: 'lint', pass: true },
    { name: 'test', pass: false },
    { name: 'build', pass: true }
];

console.log(runCiPipeline(passingBuild));
console.log(runCiPipeline(failingBuild));
`,
        expectedOutput: `CI/CD Pipeline Passed: Deployed to Production\nCI/CD Failed at step: test`,
        hints: ['Check each step in sequence; halt and return immediately if any step has pass: false.'],
      },
    ],
    quiz: [
      {
        question: 'What is the primary advantage of Docker containerization in modern web deployment?',
        options: [
          'It replaces all backend databases with static JSON text files',
          'It packages code and all its dependencies into an immutable container that behaves identically in development, testing, and production environments',
          'It speeds up JavaScript execution by replacing the V8 engine with machine code',
          'It allows web pages to be viewed without an internet connection'
        ],
        correctIndex: 1,
        explanation: 'Docker eliminates environmental differences between developer laptops and production servers by bundling the operating system userland, libraries, and application into a single portable container.',
      },
      {
        question: 'Why are multi-stage Docker builds recommended for production web applications?',
        options: [
          'They allow containers to run across multiple physical cloud providers at the same time',
          'They separate the build environment from the runtime environment, resulting in dramatically smaller and more secure production images',
          'They eliminate the need to write unit tests',
          'They automatically format frontend CSS stylesheets'
        ],
        correctIndex: 1,
        explanation: 'Multi-stage builds allow you to use heavy compilation tools (TypeScript compiler, test runners) in the build stage, copying only production bundles into the final minimal image.',
      },
      {
        question: 'What is the role of Continuous Integration (CI) in a software development workflow?',
        options: [
          'To automatically charge client credit cards on a monthly schedule',
          'To automatically build, lint, and test code on every commit or pull request, catching bugs before code reaches production',
          'To generate fake marketing reviews for mobile apps',
          'To compress database tables into zip archives'
        ],
        correctIndex: 1,
        explanation: 'CI systems (like GitHub Actions) automate quality checks on every push, ensuring broken code or failing tests are caught immediately before merging.',
      },
    ],
    project: {
      title: 'The Grand Cyberpunk Full-Stack Production Capstone',
      description: `
<h2>Capstone Project: The End-to-End Cyberpunk Full-Stack Citadel</h2>
<p>Architect, build, and deploy an end-to-end full-stack web application. Your system will feature a modern React + TypeScript frontend, a PostgreSQL relational database with parameterized queries, an Express REST API with authentication middleware, and Docker container orchestration.</p>
`,
      language: 'javascript',
      starterCode: `// Grand Full-Stack Production Capstone Manifesto
console.log("🌟 Full-Stack Capstone Citadel initialized!");
console.log("Frontend: React + TypeScript (Vite)");
console.log("Backend: Node.js + Express (REST API)");
console.log("Database: PostgreSQL 16 (ACID Persistence)");
console.log("DevOps: Docker Compose & GitHub Actions");
`,
      requirements: [
        'Build a responsive, accessible React frontend with TypeScript type safety and reactive state hooks',
        'Design a normalized PostgreSQL database schema with constraints, foreign keys, and indexes',
        'Develop an Express.js REST API with route handlers, body validation, and error-handling middleware',
        'Connect Express to PostgreSQL using connection pooling and parameterized SQL queries',
        'Create a docker-compose.yml file orchestrating the web client, API server, and database container',
        'Configure a GitHub Actions CI workflow that runs linter and automated test suites on push'
      ],
    },
  },
};
