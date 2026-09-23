// ─── Phase 7: The Final Boss — DevOps, Docker, CI/CD & Capstone Launch (Weeks 25–28) ───────────

export const phase7Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 25: Professional Git Workflows & Team Collaboration
  // ════════════════════════════════════════════════════════════════
  'week-25': {
    lessons: [
      {
        title: 'Git Internals & Feature Branch Workflows',
        language: 'html',
        starterCode: `<!-- Git Command Cheat Sheet -->\n<!--\n# Create and switch to a feature branch\ngit checkout -b feature/auth-jwt\n\n# Stage specific files\ngit add src/main/java/.../AuthController.java\n\n# Commit with conventional commit convention\ngit commit -m "feat(auth): implement JWT token verification filter"\n\n# Push branch to remote origin\ngit push -u origin feature/auth-jwt\n-->`,
        content: `
<h2>Git Internals: Snapshots, Not Diffs</h2>
<p>Unlike older version control systems that track line diffs, Git stores changes as a Directed Acyclic Graph (DAG) of complete directory snapshots (Trees, Blobs, and Commits).</p>

<h3>The Professional Feature Branch Flow</h3>
<ol>
  <li>Never commit directly to <code>main</code> or <code>master</code>.</li>
  <li>Cut a descriptive branch (e.g., <code>feature/user-auth</code> or <code>fix/cart-null-pointer</code>).</li>
  <li>Write atomic commits with <strong>Conventional Commits</strong> formatting (<code>feat:</code>, <code>fix:</code>, <code>test:</code>, <code>refactor:</code>).</li>
  <li>Open a <strong>Pull Request (PR)</strong> for peer code review before merging.</li>
</ol>
`,
      },
      {
        title: 'Interactive Rebasing & Resolving Merge Conflicts',
        language: 'html',
        starterCode: `<!-- Rebasing and Conflict Resolution -->\n<!--\n# Pull latest main and rebase feature branch on top of it\ngit fetch origin\ngit rebase origin/main\n\n# Interactive rebase to squash commits\ngit rebase -i HEAD~3\n\n# If conflict occurs: resolve markers, then:\ngit add <resolved-file>\ngit rebase --continue\n-->`,
        content: `
<h2>Merge vs Rebase</h2>
<ul>
  <li><strong>git merge:</strong> Creates a merge commit with two parents, preserving true history but creating tangled branch graphs.</li>
  <li><strong>git rebase:</strong> Replays your branch commits one-by-one on top of the latest target branch, maintaining a clean, perfectly linear project history.</li>
</ul>
<div class="teacher-callout teacher-callout--trap">
  <strong>Golden Rule of Rebasing:</strong> Never rebase commits that have already been pushed and shared on public/collaborative branches (like <code>main</code>).
</div>
`,
      }
    ],
    exercises: [
      {
        title: 'Conventional Commit Message Validator',
        language: 'javascript',
        starterCode: `function isValidCommit(msg) {\n    const regex = /^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .{1,80}$/;\n    return regex.test(msg);\n}\n\nconsole.log(isValidCommit("feat(auth): add JWT login filter"));\nconsole.log(isValidCommit("fixed some bugs"));`,
        expectedOutput: 'true\nfalse',
        description: `
<h2>Exercise: Conventional Commits</h2>
<p>Validate whether commit messages follow the professional Conventional Commits specification.</p>
`,
        hints: ['Conventional commits begin with a type like feat, fix, chore followed by an optional scope and description.'],
      }
    ],
    quiz: [
      {
        question: 'What is the Golden Rule of Git Rebasing?',
        options: ['Never rebase on a Monday', 'Never rebase public, shared commits on shared branches like main', 'Always rebase before git init', 'Rebase only works with GitHub Enterprise'],
        correctIndex: 1,
        explanation: 'Rebasing rewrites commit SHA hashes. Rebasing shared branches causes history divergence for all collaborators.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 26: Containerization with Docker & Multi-Container Compose
  // ════════════════════════════════════════════════════════════════
  'week-26': {
    lessons: [
      {
        title: 'Docker Architecture & Multi-Stage Dockerfiles',
        language: 'html',
        starterCode: `<!-- Production Multi-Stage Dockerfile for Spring Boot -->\n<!--\n# Stage 1: Build JAR\nFROM maven:3.9-eclipse-temurin-17 AS builder\nWORKDIR /build\nCOPY pom.xml .\nRUN mvn dependency:go-offline\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\n# Stage 2: Minimal Production JRE Runtime\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY --from=builder /build/target/*.jar app.jar\nEXPOSE 8080\nUSER 1001\nENTRYPOINT ["java", "-jar", "app.jar"]\n-->`,
        content: `
<h2>Why Multi-Stage Docker Builds?</h2>
<p>A standard build image with compilers, Maven, and JDK can weigh over 800MB. With <strong>Multi-Stage Builds</strong>:</p>
<ol>
  <li>The first stage uses a heavy image with build tools to compile the JAR.</li>
  <li>The final stage copies <em>only</em> the compiled JAR into a lightweight Alpine JRE image (~150MB).</li>
  <li>Zero build tools or source code remain in the production container, drastically minimizing vulnerabilities and attack surface.</li>
</ol>
`,
      },
      {
        title: 'Multi-Container Orchestration with Docker Compose',
        language: 'html',
        starterCode: `<!-- docker-compose.yml -->\n<!--\nversion: '3.8'\nservices:\n  postgres-db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_DB: questdb\n      POSTGRES_USER: quest\n      POSTGRES_PASSWORD: secret\n    ports:\n      - "5432:5432"\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\n  backend-api:\n    build: ./backend\n    ports:\n      - "8080:8080"\n    environment:\n      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres-db:5432/questdb\n    depends_on:\n      - postgres-db\n\nvolumes:\n  pgdata:\n-->`,
        content: `
<h2>Docker Compose: Micro-Environments</h2>
<p>Docker Compose allows you to spin up your complete multi-tier application (PostgreSQL + Spring Boot API + React frontend) with a single command:</p>
<pre><code>docker compose up --build -d</code></pre>
<p>Docker creates an isolated internal software bridge network where services communicate seamlessly using their service names (e.g., <code>postgres-db</code>) as domain names.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Docker Port Mapping Calculation',
        language: 'javascript',
        starterCode: `function parsePortMapping(mappingString) {\n    const [hostPort, containerPort] = mappingString.split(':');\n    return { hostPort: Number(hostPort), containerPort: Number(containerPort) };\n}\n\nconst ports = parsePortMapping("8080:80");\nconsole.log(\`Host Port: \${ports.hostPort}, Container Port: \${ports.containerPort}\`);`,
        expectedOutput: 'Host Port: 8080, Container Port: 80',
        description: `
<h2>Exercise: Docker Port Mapping</h2>
<p>Parse host-to-container port mapping syntax (HOST:CONTAINER).</p>
`,
        hints: ['Split the string by colon and map to host and container numbers.'],
      }
    ],
    quiz: [
      {
        question: 'What is the primary benefit of a Multi-Stage Dockerfile?',
        options: ['It builds Docker containers in parallel threads', 'It produces significantly smaller, secure production images containing only the runtime artifacts without build tool bloat', 'It allows containers to run without Docker installed', 'It eliminates the need for Docker Compose'],
        correctIndex: 1,
        explanation: 'Multi-stage builds leave behind compilers, caches, and SDKs, yielding lightweight, secure production images.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 27: CI/CD Automation with GitHub Actions & Cloud Deployment
  // ════════════════════════════════════════════════════════════════
  'week-27': {
    lessons: [
      {
        title: 'Automated Testing & GitHub Actions Pipelines',
        language: 'html',
        starterCode: `<!-- .github/workflows/ci.yml -->\n<!--\nname: Java & React CI Pipeline\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  backend-test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Set up JDK 17\n        uses: actions/setup-java@v3\n        with:\n          java-version: '17'\n          distribution: 'temurin'\n      - name: Run Maven Tests\n        run: mvn test\n-->`,
        content: `
<h2>Continuous Integration (CI) Philosophy</h2>
<p>Every commit pushed to GitHub triggers automated pipelines executing in ephemeral cloud VMs:</p>
<ol>
  <li>Lints code for syntax and style violations.</li>
  <li>Runs all unit tests (JUnit, Mockito, React testing library).</li>
  <li>Builds production release artifacts (JARs and minified bundles).</li>
  <li>Blocks PR merges automatically if any test fails!</li>
</ol>
`,
      },
      {
        title: 'Cloud Deployment Strategies (Render, Railway, AWS & Vercel)',
        language: 'html',
        starterCode: `<!-- Production Cloud Deployment -->\n<!--\n1. Database: Managed PostgreSQL (Supabase / Render / AWS RDS)\n2. Backend: Docker Container Web Service (Render / Railway / AWS ECS)\n3. Frontend: Edge CDN Static Deployment (Vercel / Netlify / Cloudflare)\n-->`,
        content: `
<h2>Deploying Full-Stack Systems</h2>
<p>Modern web engineering decouples deployment targets for maximum resilience and cost efficiency:</p>
<ul>
  <li><strong>Frontend:</strong> Hosted on global edge CDNs (Vercel, Netlify) with sub-50ms latency worldwide.</li>
  <li><strong>Backend:</strong> Hosted in auto-scaling container services (Render, Railway, AWS ECS).</li>
  <li><strong>Database:</strong> Hosted on managed PostgreSQL instances with automated backups and read-replicas.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'CI Exit Code Verification',
        language: 'javascript',
        starterCode: `function evaluatePipeline(testResults) {\n    const allPassed = testResults.every(test => test.status === 'PASS');\n    return allPassed ? 0 : 1; // 0 = success, 1 = failure in Unix/CI\n}\n\nconst suite = [\n    { name: 'UserAuthTest', status: 'PASS' },\n    { name: 'OrderServiceTest', status: 'PASS' },\n];\nconsole.log("CI Exit Code:", evaluatePipeline(suite));`,
        expectedOutput: 'CI Exit Code: 0',
        description: `
<h2>Exercise: CI Pipeline Status</h2>
<p>Evaluate whether an automated test suite produces a clean exit code 0.</p>
`,
        hints: ['Return 0 when all tests pass, or 1 if any test fails.'],
      }
    ],
    quiz: [
      {
        question: 'Why do CI/CD systems rely on standard Unix process exit codes (0 vs non-zero)?',
        options: ['Because non-zero exit codes signal to the CI runner that a step failed, immediately halting the pipeline', 'Because exit code 0 consumes less memory', 'Process exit codes are only used on Windows', 'Exit codes dictate the port number of the web server'],
        correctIndex: 0,
        explanation: 'In Unix shells and CI systems, exit code 0 indicates success, while any non-zero value signals an error, stopping subsequent build stages.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 28: Capstone Defense, System Architecture & Technical Interview Prep
  // ════════════════════════════════════════════════════════════════
  'week-28': {
    lessons: [
      {
        title: 'System Architecture: Scalability, Caching & Load Balancing',
        language: 'html',
        starterCode: `<!-- System Design Hierarchy -->\n<!--\nClient (Browser/Mobile)\n    ↓ (HTTPS / TLS)\nCloudflare CDN & Reverse Proxy / Load Balancer\n    ↓ (Distributes Traffic)\n[Spring Boot API Instance 1]   [Spring Boot API Instance 2]\n    ↓                                    ↓\n    ───────────── Redis Cache ───────────\n                        ↓ (Cache Miss)\n             PostgreSQL Primary (Writes)\n                 ↓ (Replication)\n             PostgreSQL Read-Replicas\n-->`,
        content: `
<h2>High-Level System Design</h2>
<p>When interviewers ask you to design a scalable full-stack system:</p>
<ol>
  <li><strong>Horizontal Scaling:</strong> Run multiple stateless instances behind a Reverse Proxy / Load Balancer (Nginx, AWS ALB).</li>
  <li><strong>Caching Strategy:</strong> Use an in-memory <strong>Redis Cache</strong> (Cache-Aside pattern) to serve hot reads in sub-millisecond time.</li>
  <li><strong>Database Read Replicas:</strong> Route write traffic (<code>INSERT</code>, <code>UPDATE</code>) to the primary database while routing read queries (<code>SELECT</code>) across read-replicas.</li>
</ol>
`,
      },
      {
        title: 'The Technical Interview Strategy: STAR Method & Algorithmic Defense',
        language: 'html',
        starterCode: `<!-- Behavioral STAR Method -->\n<!--\nSituation: Context and technical challenges you faced.\nTask: Your specific responsibilities and architectural requirements.\nAction: The concrete engineering decisions, patterns, and tools YOU implemented.\nResult: Quantifiable outcome (e.g., 40% reduction in query latency, 99.9% uptime).\n-->`,
        content: `
<h2>Cracking the Technical Interview</h2>
<h3>Behavioral Questions: The STAR Framework</h3>
<p>Structure every answer with <strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong>, and <strong>Result</strong>. Always highlight tradeoffs and why you chose one pattern over another.</p>

<h3>Live Coding & LeetCode Defense</h3>
<ol>
  <li><strong>Clarify Inputs & Edge Cases:</strong> Ask about nulls, negative numbers, duplicates, and memory constraints.</li>
  <li><strong>Propose & Analyze Brute Force:</strong> State the naive solution and its time/space complexity before coding.</li>
  <li><strong>Optimize with Known Patterns:</strong> (Two Pointers, Sliding Window, Monotonic Stack, BFS/DFS, DP).</li>
  <li><strong>Write Clean Code & Dry-Run:</strong> Trace execution manually with an example before declaring completion.</li>
</ol>
`,
      }
    ],
    exercises: [
      {
        title: 'Interview Metric Calculation',
        language: 'javascript',
        starterCode: `function calculateLatencyReduction(oldMs, newMs) {\n    const reductionPct = ((oldMs - newMs) / oldMs) * 100;\n    return Math.round(reductionPct);\n}\n\nconsole.log(\`Latency reduced by \${calculateLatencyReduction(250, 50)}%\`);`,
        expectedOutput: 'Latency reduced by 80%',
        description: `
<h2>Exercise: Quantifying Engineering Impact</h2>
<p>Compute the percentage performance improvement for an interview accomplishment statement.</p>
`,
        hints: ['((old - new) / old) * 100 gives the percentage reduction.'],
      }
    ],
    quiz: [
      {
        question: 'When answering behavioral interview questions, which part of the STAR method should receive the most focus and technical detail?',
        options: ['Situation', 'Task', 'Action (the specific engineering decisions, implementations, and tradeoffs YOU made)', 'Result'],
        correctIndex: 2,
        explanation: 'Interviewers evaluate your technical depth and problem-solving through the Actions you took to overcome hurdles.'
      }
    ],
    project: {
      title: 'The Grand Capstone Defense: Complete Full-Stack Portfolio Presentation',
      description: `
<h2>The Final Trial: Capstone Launch & Portfolio Defense</h2>
<p>Congratulations, Adventurer! You have completed the 7-Month CodeQuest journey. Your final project is to bundle your production Spring Boot API, PostgreSQL schema, and React frontend into a fully containerized, live-deployed capstone project with a complete architectural README and demo video for recruiters.</p>
`,
      language: 'javascript',
      starterCode: `console.log("🏆 CodeQuest 7-Month Master Curriculum Fully Completed! Ready for Technical Interviews!");`,
      requirements: [
        'Complete full-stack architecture with React client, Spring Boot REST API, and PostgreSQL database',
        'Containerized multi-service deployment with Docker and Docker Compose',
        'Continuous Integration pipeline in GitHub Actions with passing unit tests',
        'Comprehensive GitHub repository documentation with architectural diagrams and live demo link'
      ]
    }
  }
};
