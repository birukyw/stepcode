// ─── Phase 4: The Vault of Data — SQL, PostgreSQL, Data Modeling & JDBC (Weeks 13–16) ───────────

export const phase4Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 13: Relational Databases, PostgreSQL & Schema Design
  // ════════════════════════════════════════════════════════════════
  'week-13': {
    lessons: [
      {
        title: 'Relational Model, Primary Keys & Foreign Key Constraints',
        language: 'sql',
        starterCode: `-- DDL: Create Tables with Primary and Foreign Keys\nCREATE TABLE guilds (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL UNIQUE,\n    level INT DEFAULT 1\n);\n\nCREATE TABLE adventurers (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) NOT NULL UNIQUE,\n    class VARCHAR(30) NOT NULL,\n    guild_id INT REFERENCES guilds(id) ON DELETE SET NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`,
        content: `
<h2>The Relational Database Model</h2>
<p>Relational databases structure data into <strong>Tables</strong> (relations) of rows and columns with strong mathematical set guarantees.</p>

<h3>Integrity Constraints</h3>
<ul>
  <li><strong>PRIMARY KEY:</strong> Uniquely identifies each record. Automatically indexed with a unique B-Tree.</li>
  <li><strong>FOREIGN KEY:</strong> Enforces <em>referential integrity</em> between tables (e.g., ensuring an adventurer cannot reference a non-existent guild).</li>
  <li><strong>ON DELETE CASCADE / SET NULL:</strong> Dictates what happens to child records when the referenced parent record is deleted.</li>
</ul>
`,
      },
      {
        title: 'Database Normalization (1NF, 2NF, 3NF)',
        language: 'sql',
        starterCode: `-- Normalized Tables (3NF)\nCREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id),\n    order_date DATE NOT NULL\n);\n\nCREATE TABLE order_items (\n    order_id INT REFERENCES orders(id),\n    product_id INT NOT NULL,\n    quantity INT NOT NULL,\n    unit_price NUMERIC(10, 2) NOT NULL,\n    PRIMARY KEY (order_id, product_id)\n);`,
        content: `
<h2>Database Normalization</h2>
<p>Normalization organizes schema tables to reduce data redundancy and eliminate insert, update, and deletion anomalies.</p>
<ul>
  <li><strong>1NF (First Normal Form):</strong> All column values must be atomic (no comma-separated lists in a single cell).</li>
  <li><strong>2NF (Second Normal Form):</strong> Must be in 1NF and all non-key columns must depend entirely on the whole primary key (no partial composite dependencies).</li>
  <li><strong>3NF (Third Normal Form):</strong> Must be in 2NF and no non-key column may depend transitively on another non-key column.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'Designing an E-Commerce Schema with Constraints',
        language: 'sql',
        starterCode: `-- Create an products table with:\n-- id: SERIAL PRIMARY KEY\n-- name: VARCHAR(100) NOT NULL\n-- price: NUMERIC(10,2) CHECK (price >= 0)\n-- stock: INT DEFAULT 0\n\nCREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    price NUMERIC(10, 2) CHECK (price >= 0),\n    stock INT DEFAULT 0\n);\n\nINSERT INTO products (name, price, stock) VALUES ('Spellbook', 49.99, 10);\nSELECT name, price FROM products WHERE stock > 0;`,
        expectedOutput: 'Spellbook | 49.99',
        description: `
<h2>Exercise: Schema Design with Constraints</h2>
<p>Create a <code>products</code> table that guarantees non-negative pricing and positive stock via SQL constraints.</p>
`,
        hints: ['Use CHECK (price >= 0) to prevent negative prices.'],
      }
    ],
    quiz: [
      {
        question: 'What is the primary benefit of Third Normal Form (3NF)?',
        options: ['It eliminates transitive dependencies and reduces redundant data duplication', 'It ensures queries run in O(1) time without joins', 'It allows arrays to be stored directly in columns', 'It disables foreign key checks for faster inserts'],
        correctIndex: 0,
        explanation: '3NF removes transitive dependencies (non-key columns depending on other non-key columns), preventing data inconsistency.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 14: Complex SQL Queries, Joins, Aggregations & Window Functions
  // ════════════════════════════════════════════════════════════════
  'week-14': {
    lessons: [
      {
        title: 'Mastering SQL Joins: Visual Guide',
        language: 'sql',
        starterCode: `-- INNER JOIN vs LEFT JOIN\nSELECT \n    u.username, \n    COALESCE(g.name, 'No Guild') AS guild_name\nFROM adventurers u\nLEFT JOIN guilds g ON u.guild_id = g.id;`,
        content: `
<h2>The Four Join Types</h2>
<ul>
  <li><strong>INNER JOIN:</strong> Returns rows only when there is a match in <em>both</em> tables.</li>
  <li><strong>LEFT JOIN:</strong> Returns all rows from the left table, plus matched values from the right table (or <code>NULL</code> if no match).</li>
  <li><strong>RIGHT JOIN:</strong> Returns all rows from the right table, plus matched values from the left table.</li>
  <li><strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in either table.</li>
</ul>
`,
      },
      {
        title: 'Window Functions: ROW_NUMBER, RANK & PARTITION BY',
        language: 'sql',
        starterCode: `-- Rank highest damage dealers per class\nSELECT \n    username, \n    class, \n    damage, \n    DENSE_RANK() OVER (PARTITION BY class ORDER BY damage DESC) as class_rank\nFROM adventurers;`,
        content: `
<h2>SQL Window Functions</h2>
<p>Window functions perform calculations across a set of table rows related to the current row <strong>without collapsing rows into a single summary like GROUP BY</strong>.</p>
<ul>
  <li><code>ROW_NUMBER()</code>: Assigns a unique sequential integer to each row in the partition.</li>
  <li><code>RANK()</code>: Leaves gaps in ranking if there are ties (1, 2, 2, 4).</li>
  <li><code>DENSE_RANK()</code>: Does not leave gaps for ties (1, 2, 2, 3).</li>
  <li><code>PARTITION BY</code>: Divides query results into independent groups for ranking.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'Multi-Table Joins: Customer Orders',
        language: 'sql',
        starterCode: `SELECT \n    c.name AS customer_name,\n    COUNT(o.id) AS total_orders,\n    COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name\nORDER BY total_spent DESC;`,
        expectedOutput: 'Alice | 3 | 450.00\nBob | 1 | 120.00',
        description: `
<h2>Exercise: Aggregation with LEFT JOIN</h2>
<p>Write a query returning each customer's name, total count of orders, and total amount spent, including customers with zero orders.</p>
`,
        hints: ['Use LEFT JOIN and COALESCE(SUM(...), 0) so customers without orders show 0 instead of NULL.'],
      }
    ],
    quiz: [
      {
        question: 'What is the critical difference between GROUP BY and Window Functions (OVER / PARTITION BY)?',
        options: ['GROUP BY collapses multiple rows into a single summary row, while window functions retain individual row identities', 'Window functions can only run on integers', 'GROUP BY is faster than indexes', 'Window functions require full table scans'],
        correctIndex: 0,
        explanation: 'Window functions preserve individual row details while computing aggregates or rankings across an analytical partition.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 15: Indexing Internals, Query Optimization & ACID Transactions
  // ════════════════════════════════════════════════════════════════
  'week-15': {
    lessons: [
      {
        title: 'B-Tree Indexes & EXPLAIN ANALYZE',
        language: 'sql',
        starterCode: `-- Adding a composite B-Tree Index\nCREATE INDEX idx_orders_customer_status ON orders (customer_id, status);\n\n-- Inspect Execution Plan\nEXPLAIN ANALYZE \nSELECT * FROM orders \nWHERE customer_id = 42 AND status = 'COMPLETED';`,
        content: `
<h2>B-Tree Indexing Under the Hood</h2>
<p>Without an index, PostgreSQL must execute a <strong>Sequential Scan (Seq Scan)</strong>, reading every disk page (O(N) I/O operations).</p>
<p>A <strong>B-Tree Index</strong> keeps keys sorted in a multi-level balanced tree, enabling lookups in <strong>O(log N)</strong> disk page reads.</p>
<h3>Composite Index Leftmost Prefix Rule</h3>
<p>An index on <code>(A, B)</code> can accelerate queries filtering by <code>A</code>, or <code>A AND B</code>, but CANNOT accelerate a query filtering solely by <code>B</code>!</p>
`,
      },
      {
        title: 'ACID Properties & Transaction Isolation Levels',
        language: 'sql',
        starterCode: `BEGIN TRANSACTION;\n\n-- Deduct from sender\nUPDATE bank_accounts \nSET balance = balance - 100 \nWHERE id = 1 AND balance >= 100;\n\n-- Credit receiver\nUPDATE bank_accounts \nSET balance = balance + 100 \nWHERE id = 2;\n\nCOMMIT;`,
        content: `
<h2>ACID Guarantees</h2>
<ul>
  <li><strong>Atomicity:</strong> All statements in the transaction succeed, or the entire transaction rolls back cleanly.</li>
  <li><strong>Consistency:</strong> Invariants and constraints (foreign keys, CHECK) remain valid before and after.</li>
  <li><strong>Isolation:</strong> Concurrent transactions execute without dirty interference.</li>
  <li><strong>Durability:</strong> Once committed, data survives power failures via write-ahead logging (WAL).</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'ACID Compliant Fund Transfer Simulation',
        language: 'sql',
        starterCode: `BEGIN;\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nUPDATE accounts SET balance = balance + 50 WHERE id = 2;\nCOMMIT;\nSELECT balance FROM accounts WHERE id IN (1, 2);`,
        expectedOutput: '50\n150',
        description: `
<h2>Exercise: Atomic Transaction</h2>
<p>Simulate a transactional fund transfer between two bank accounts wrapped in <code>BEGIN</code> and <code>COMMIT</code>.</p>
`,
        hints: ['Always execute balance decrements and balance increments within the same transaction block.'],
      }
    ],
    quiz: [
      {
        question: 'Under the Leftmost Prefix Rule, which query CANNOT use an index defined on (country, city)?',
        options: ['WHERE country = "Canada"', 'WHERE country = "Canada" AND city = "Toronto"', 'WHERE city = "Toronto"', 'WHERE country = "Japan" ORDER BY city'],
        correctIndex: 2,
        explanation: 'Because B-Tree composite keys are sorted by country first, searching by city alone without country cannot utilize the index root.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 16: Java Database Connectivity (JDBC) & Connection Pooling
  // ════════════════════════════════════════════════════════════════
  'week-16': {
    lessons: [
      {
        title: 'Preventing SQL Injection with PreparedStatement',
        language: 'java',
        starterCode: `import java.sql.*;\n\npublic class SafeJDBC {\n    public static void main(String[] args) {\n        String url = "jdbc:postgresql://localhost:5432/questdb";\n        String sql = "SELECT id, username, class FROM adventurers WHERE username = ?";\n\n        // Try-with-resources closes connection & statement automatically\n        /*\n        try (Connection conn = DriverManager.getConnection(url, "user", "pass");\n             PreparedStatement stmt = conn.prepareStatement(sql)) {\n            stmt.setString(1, "ShadowMage");\n            ResultSet rs = stmt.executeQuery();\n            while (rs.next()) {\n                System.out.println("Hero: " + rs.getString("username"));\n            }\n        } catch (SQLException e) {\n            e.printStackTrace();\n        }\n        */\n        System.out.println("PreparedStatement compiles SQL before inserting parameters!");\n    }\n}`,
        content: `
<h2>Why Raw String Concatenation Kills Security</h2>
<pre><code>// ❌ FATAL SQL INJECTION VULNERABILITY:\nString query = "SELECT * FROM users WHERE user = '" + input + "'";</code></pre>
<p>If <code>input</code> is <code>admin' OR '1'='1</code>, the attacker bypasses authentication!</p>
<h3>The PreparedStatement Remedy</h3>
<p>A <code>PreparedStatement</code> sends the SQL command to the database engine to be <strong>pre-compiled</strong>. User inputs are sent separately as raw data parameters, making SQL injection mathematically impossible.</p>
`,
      },
      {
        title: 'Connection Pooling with HikariCP',
        language: 'java',
        starterCode: `public class ConnectionPoolConcept {\n    public static void main(String[] args) {\n        System.out.println("HikariCP maintains a pool of pre-warmed TCP connections to eliminate handshake overhead.");\n    }\n}`,
        content: `
<h2>Why Connection Pooling?</h2>
<p>Establishing a fresh database TCP socket involves TCP 3-way handshakes, TLS negotiation, authentication, and session memory allocation—taking 30ms to 100ms per query!</p>
<p><strong>HikariCP</strong> pre-opens a pool of persistent connections. Java threads borrow a connection, run their query, and return it to the pool in &lt; 1ms.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Safe DAO Query Implementation',
        language: 'java',
        starterCode: `public class UserDAODemo {\n    public static String buildSafeQuery(String username) {\n        // In production, parameterized queries are passed with '?' placeholders\n        return "SELECT id, email FROM users WHERE username = ? -- Prepared";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(buildSafeQuery("biruk"));\n    }\n}`,
        expectedOutput: 'SELECT id, email FROM users WHERE username = ? -- Prepared',
        description: `
<h2>Exercise: Parameterized SQL</h2>
<p>Confirm the standard placeholder convention for safe SQL execution.</p>
`,
        hints: ['SQL parameters are represented by ? placeholders in JDBC.'],
      }
    ],
    quiz: [
      {
        question: 'Why does PreparedStatement prevent SQL injection?',
        options: ['It escapes all single quotes in the string', 'The database compiles the query structure first, treating parameter values strictly as literal data', 'It uses encryption algorithms across the socket', 'It forces all inputs to be numeric'],
        correctIndex: 1,
        explanation: 'Because the query execution plan is compiled prior to parameter binding, user inputs can never alter the syntax or structure of the SQL command.'
      }
    ],
    project: {
      title: 'Standalone Java + JDBC Guild Management System',
      description: `
<h2>Project: Java + JDBC Guild Data Access Layer</h2>
<p>Build a production Data Access Object (DAO) pattern in Java with JDBC that performs CRUD operations on a PostgreSQL database using PreparedStatements, transactions, and HikariCP connection pooling.</p>
`,
      language: 'java',
      starterCode: `public class GuildDatabaseApp {\n    public static void main(String[] args) {\n        System.out.println("⚔️ Guild Management DAO ready!");\n    }\n}`,
      requirements: [
        'Implement an AdventurerDAO interface with create, findById, update, and delete methods',
        'Use PreparedStatement for all database interactions to prevent SQL injection',
        'Wrap multi-table operations (e.g., transferring an adventurer between guilds) in explicit ACID transactions',
        'Use HikariCP DataSource configuration for connection pooling'
      ]
    }
  }
};
