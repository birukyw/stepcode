// ─── Phase 4: The Vault of Data: SQL & PostgreSQL Mastery ──────────────────

export const phase4Content = {
  "week-13": {
    "lessons": [
      {
        "title": "Relational Model, Primary Keys & Foreign Key Constraints",
        "language": "sql",
        "starterCode": "-- DDL: Create Tables with Primary and Foreign Keys\nCREATE TABLE guilds (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL UNIQUE,\n    level INT DEFAULT 1\n);\n\nCREATE TABLE adventurers (\n    id SERIAL PRIMARY KEY,\n    username VARCHAR(50) NOT NULL UNIQUE,\n    class VARCHAR(30) NOT NULL,\n    guild_id INT REFERENCES guilds(id) ON DELETE SET NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
        "content": "\n<h2>The Relational Database Model</h2>\n<p>Relational databases structure data into <strong>Tables</strong> (relations) of rows and columns with strong mathematical set guarantees.</p>\n\n<h3>Integrity Constraints</h3>\n<ul>\n  <li><strong>PRIMARY KEY:</strong> Uniquely identifies each record. Automatically indexed with a unique B-Tree.</li>\n  <li><strong>FOREIGN KEY:</strong> Enforces <em>referential integrity</em> between tables (e.g., ensuring an adventurer cannot reference a non-existent guild).</li>\n  <li><strong>ON DELETE CASCADE / SET NULL:</strong> Dictates what happens to child records when the referenced parent record is deleted.</li>\n</ul>\n"
      },
      {
        "title": "Database Normalization (1NF, 2NF, 3NF)",
        "language": "sql",
        "starterCode": "-- Normalized Tables (3NF)\nCREATE TABLE customers (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) NOT NULL UNIQUE\n);\n\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_id INT REFERENCES customers(id),\n    order_date DATE NOT NULL\n);\n\nCREATE TABLE order_items (\n    order_id INT REFERENCES orders(id),\n    product_id INT NOT NULL,\n    quantity INT NOT NULL,\n    unit_price NUMERIC(10, 2) NOT NULL,\n    PRIMARY KEY (order_id, product_id)\n);",
        "content": "\n<h2>Database Normalization</h2>\n<p>Normalization organizes schema tables to reduce data redundancy and eliminate insert, update, and deletion anomalies.</p>\n<ul>\n  <li><strong>1NF (First Normal Form):</strong> All column values must be atomic (no comma-separated lists in a single cell).</li>\n  <li><strong>2NF (Second Normal Form):</strong> Must be in 1NF and all non-key columns must depend entirely on the whole primary key (no partial composite dependencies).</li>\n  <li><strong>3NF (Third Normal Form):</strong> Must be in 2NF and no non-key column may depend transitively on another non-key column.</li>\n</ul>\n"
      },
      {
        "title": "Data Types, Constraints (CHECK, UNIQUE, NOT NULL) & Schemas",
        "language": "sql",
        "starterCode": "-- PostgreSQL Strict Schema Design\nCREATE TABLE guild_members (\n    id BIGSERIAL PRIMARY KEY,\n    username VARCHAR(50) NOT NULL UNIQUE,\n    email VARCHAR(255) NOT NULL,\n    level INT NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 100),\n    is_active BOOLEAN NOT NULL DEFAULT TRUE,\n    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP\n);\n\nINSERT INTO guild_members (username, email, level)\nVALUES ('Valkyrie99', 'valk@valhalla.io', 5);\n",
        "content": "\n<h2>⚡ Chapter 3: Schema Constraints & Defensive Data Modeling</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Never trust application code to enforce data integrity alone. Enforce invariant constraints (CHECK, NOT NULL, UNIQUE, FOREIGN KEY) directly in the PostgreSQL engine!</em>\n</div>\n\n<p>Constraints ensure your database never stores corrupt or nonsensical rows, regardless of buggy microservices or concurrent race conditions.</p>\n"
      },
      {
        "title": "CRUD Operations: INSERT ON CONFLICT DO UPDATE (Upsert)",
        "language": "sql",
        "starterCode": "-- PostgreSQL High-Performance Upsert (Merge)\nINSERT INTO player_scores (player_id, score, last_updated)\nVALUES (101, 1500, CURRENT_TIMESTAMP)\nON CONFLICT (player_id) \nDO UPDATE SET \n    score = GREATEST(player_scores.score, EXCLUDED.score),\n    last_updated = EXCLUDED.last_updated;\n",
        "content": "\n<h2>⚡ Chapter 4: Atomic Upserts (INSERT ON CONFLICT)</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Checking if a row exists before inserting invites race conditions in distributed systems. Execute atomic Upsert mutations directly in single SQL queries!</em>\n</div>\n\n<p>PostgreSQL's <code>ON CONFLICT (...) DO UPDATE</code> guarantees atomic synchronization without manual row locks or multi-step transactions.</p>\n"
      },
      {
        "title": "Database Migrations with Flyway Versioning",
        "language": "sql",
        "starterCode": "-- V1__init_schema.sql\nCREATE TABLE accounts (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00\n);\n\n-- V2__add_currency_column.sql\nALTER TABLE accounts ADD COLUMN currency VARCHAR(3) NOT NULL DEFAULT 'USD';\n",
        "content": "\n<h2>⚡ Chapter 5: Schema Evolution & Flyway Migrations</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Production databases cannot be dropped and recreated. Learn how Flyway tracks incremental, versioned SQL migration scripts to reliably upgrade enterprise schemas!</em>\n</div>\n\n<p>Each migration script is executed once and recorded in the <code>flyway_schema_history</code> table with a cryptographic checksum to guarantee repeatability across development, staging, and production environments.</p>\n"
      }
    ],
    "exercises": [
      {
        "title": "Designing an E-Commerce Schema with Constraints",
        "language": "sql",
        "starterCode": "-- Create an products table with:\n-- id: SERIAL PRIMARY KEY\n-- name: VARCHAR(100) NOT NULL\n-- price: NUMERIC(10,2) CHECK (price >= 0)\n-- stock: INT DEFAULT 0\n\nCREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    price NUMERIC(10, 2) CHECK (price >= 0),\n    stock INT DEFAULT 0\n);\n\nINSERT INTO products (name, price, stock) VALUES ('Spellbook', 49.99, 10);\nSELECT name, price FROM products WHERE stock > 0;",
        "expectedOutput": "Spellbook | 49.99",
        "description": "\n<h2>Exercise: Schema Design with Constraints</h2>\n<p>Create a <code>products</code> table that guarantees non-negative pricing and positive stock via SQL constraints.</p>\n",
        "hints": [
          "Use CHECK (price >= 0) to prevent negative prices."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the primary benefit of Third Normal Form (3NF)?",
        "options": [
          "It eliminates transitive dependencies and reduces redundant data duplication",
          "It ensures queries run in O(1) time without joins",
          "It allows arrays to be stored directly in columns",
          "It disables foreign key checks for faster inserts"
        ],
        "correctIndex": 0,
        "explanation": "3NF removes transitive dependencies (non-key columns depending on other non-key columns), preventing data inconsistency."
      }
    ],
    "project": false
  },
  "week-14": {
    "lessons": [
      {
        "title": "Mastering SQL Joins: Visual Guide",
        "language": "sql",
        "starterCode": "-- INNER JOIN vs LEFT JOIN\nSELECT \n    u.username, \n    COALESCE(g.name, 'No Guild') AS guild_name\nFROM adventurers u\nLEFT JOIN guilds g ON u.guild_id = g.id;",
        "content": "\n<h2>The Four Join Types</h2>\n<ul>\n  <li><strong>INNER JOIN:</strong> Returns rows only when there is a match in <em>both</em> tables.</li>\n  <li><strong>LEFT JOIN:</strong> Returns all rows from the left table, plus matched values from the right table (or <code>NULL</code> if no match).</li>\n  <li><strong>RIGHT JOIN:</strong> Returns all rows from the right table, plus matched values from the left table.</li>\n  <li><strong>FULL OUTER JOIN:</strong> Returns all rows when there is a match in either table.</li>\n</ul>\n"
      },
      {
        "title": "Window Functions: ROW_NUMBER, RANK & PARTITION BY",
        "language": "sql",
        "starterCode": "-- Rank highest damage dealers per class\nSELECT \n    username, \n    class, \n    damage, \n    DENSE_RANK() OVER (PARTITION BY class ORDER BY damage DESC) as class_rank\nFROM adventurers;",
        "content": "\n<h2>SQL Window Functions</h2>\n<p>Window functions perform calculations across a set of table rows related to the current row <strong>without collapsing rows into a single summary like GROUP BY</strong>.</p>\n<ul>\n  <li><code>ROW_NUMBER()</code>: Assigns a unique sequential integer to each row in the partition.</li>\n  <li><code>RANK()</code>: Leaves gaps in ranking if there are ties (1, 2, 2, 4).</li>\n  <li><code>DENSE_RANK()</code>: Does not leave gaps for ties (1, 2, 2, 3).</li>\n  <li><code>PARTITION BY</code>: Divides query results into independent groups for ranking.</li>\n</ul>\n"
      },
      {
        "title": "Aggregate Functions & GROUP BY / HAVING Precision",
        "language": "sql",
        "starterCode": "-- Aggregate metrics by department\nSELECT \n    department_id,\n    COUNT(*) AS total_employees,\n    ROUND(AVG(salary), 2) AS avg_salary,\n    MAX(salary) AS top_salary\nFROM employees\nWHERE status = 'ACTIVE'\nGROUP BY department_id\nHAVING COUNT(*) >= 5\nORDER BY avg_salary DESC;\n",
        "content": "\n<h2>⚡ Chapter 3: Aggregations & The HAVING Clause</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Understand the precise execution order of SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. WHERE filters rows before aggregation; HAVING filters aggregated groups!</em>\n</div>\n"
      },
      {
        "title": "Common Table Expressions (CTEs) & Recursive Hierarchies",
        "language": "sql",
        "starterCode": "-- Recursive CTE: Traversing organizational reporting hierarchy\nWITH RECURSIVE OrgChart AS (\n    -- Anchor member: The CEO\n    SELECT id, name, manager_id, 1 AS depth\n    FROM employees\n    WHERE manager_id IS NULL\n\n    UNION ALL\n\n    -- Recursive member: direct reports\n    SELECT e.id, e.name, e.manager_id, o.depth + 1\n    FROM employees e\n    INNER JOIN OrgChart o ON e.manager_id = o.id\n)\nSELECT * FROM OrgChart ORDER BY depth, id;\n",
        "content": "\n<h2>⚡ Chapter 4: Common Table Expressions (CTEs) & Recursion</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Recursive CTEs unlock graph traversal directly inside PostgreSQL: org charts, category trees, and breadcrumb trails resolved in a single declarative query!</em>\n</div>\n"
      },
      {
        "title": "Subqueries: Correlated vs Non-Correlated & EXISTS vs IN",
        "language": "sql",
        "starterCode": "-- Using EXISTS for high-performance semi-joins\nSELECT c.id, c.company_name\nFROM customers c\nWHERE EXISTS (\n    SELECT 1 \n    FROM orders o \n    WHERE o.customer_id = c.id \n      AND o.total_amount > 10000\n);\n",
        "content": "\n<h2>⚡ Chapter 5: Correlated Subqueries & EXISTS Optimization</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Using IN with subqueries can choke the query planner. Learn why EXISTS short-circuits on the first matching tuple, maximizing index-assisted performance!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "Multi-Table Joins: Customer Orders",
        "language": "sql",
        "starterCode": "SELECT \n    c.name AS customer_name,\n    COUNT(o.id) AS total_orders,\n    COALESCE(SUM(o.total_amount), 0) AS total_spent\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name\nORDER BY total_spent DESC;",
        "expectedOutput": "Alice | 3 | 450.00\nBob | 1 | 120.00",
        "description": "\n<h2>Exercise: Aggregation with LEFT JOIN</h2>\n<p>Write a query returning each customer's name, total count of orders, and total amount spent, including customers with zero orders.</p>\n",
        "hints": [
          "Use LEFT JOIN and COALESCE(SUM(...), 0) so customers without orders show 0 instead of NULL."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the critical difference between GROUP BY and Window Functions (OVER / PARTITION BY)?",
        "options": [
          "GROUP BY collapses multiple rows into a single summary row, while window functions retain individual row identities",
          "Window functions can only run on integers",
          "GROUP BY is faster than indexes",
          "Window functions require full table scans"
        ],
        "correctIndex": 0,
        "explanation": "Window functions preserve individual row details while computing aggregates or rankings across an analytical partition."
      }
    ],
    "project": false
  },
  "week-15": {
    "lessons": [
      {
        "title": "B-Tree Indexes & EXPLAIN ANALYZE",
        "language": "sql",
        "starterCode": "-- Adding a composite B-Tree Index\nCREATE INDEX idx_orders_customer_status ON orders (customer_id, status);\n\n-- Inspect Execution Plan\nEXPLAIN ANALYZE \nSELECT * FROM orders \nWHERE customer_id = 42 AND status = 'COMPLETED';",
        "content": "\n<h2>B-Tree Indexing Under the Hood</h2>\n<p>Without an index, PostgreSQL must execute a <strong>Sequential Scan (Seq Scan)</strong>, reading every disk page (O(N) I/O operations).</p>\n<p>A <strong>B-Tree Index</strong> keeps keys sorted in a multi-level balanced tree, enabling lookups in <strong>O(log N)</strong> disk page reads.</p>\n<h3>Composite Index Leftmost Prefix Rule</h3>\n<p>An index on <code>(A, B)</code> can accelerate queries filtering by <code>A</code>, or <code>A AND B</code>, but CANNOT accelerate a query filtering solely by <code>B</code>!</p>\n"
      },
      {
        "title": "ACID Properties & Transaction Isolation Levels",
        "language": "sql",
        "starterCode": "BEGIN TRANSACTION;\n\n-- Deduct from sender\nUPDATE bank_accounts \nSET balance = balance - 100 \nWHERE id = 1 AND balance >= 100;\n\n-- Credit receiver\nUPDATE bank_accounts \nSET balance = balance + 100 \nWHERE id = 2;\n\nCOMMIT;",
        "content": "\n<h2>ACID Guarantees</h2>\n<ul>\n  <li><strong>Atomicity:</strong> All statements in the transaction succeed, or the entire transaction rolls back cleanly.</li>\n  <li><strong>Consistency:</strong> Invariants and constraints (foreign keys, CHECK) remain valid before and after.</li>\n  <li><strong>Isolation:</strong> Concurrent transactions execute without dirty interference.</li>\n  <li><strong>Durability:</strong> Once committed, data survives power failures via write-ahead logging (WAL).</li>\n</ul>\n"
      },
      {
        "title": "Composite Indexes & Covering Indexes (Index-Only Scans)",
        "language": "sql",
        "starterCode": "-- Composite Index respecting Leftmost Prefix Rule\nCREATE INDEX idx_users_dept_salary ON users (department_id, salary DESC);\n\n-- Covering Index using INCLUDE for Index-Only Scans\nCREATE INDEX idx_orders_customer_covering \nON orders (customer_id) INCLUDE (order_date, total_amount);\n",
        "content": "\n<h2>⚡ Chapter 3: Covering Indexes & Index-Only Scans</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>An index lookup normally requires fetching table pages from disk (Heap Fetch). A Covering Index fulfills the entire query directly from index pages!</em>\n</div>\n"
      },
      {
        "title": "Concurrency Control: Pessimistic vs Optimistic Locking",
        "language": "sql",
        "starterCode": "-- Pessimistic Row Locking\nBEGIN;\nSELECT balance FROM accounts WHERE id = 42 FOR UPDATE;\n-- Row is locked against concurrent updates\nUPDATE accounts SET balance = balance - 100 WHERE id = 42;\nCOMMIT;\n",
        "content": "\n<h2>⚡ Chapter 4: Concurrency: SELECT FOR UPDATE vs Versioning</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>When two users book the last concert seat simultaneously, who wins? Master SELECT FOR UPDATE (pessimistic) and @Version timestamp checking (optimistic)!</em>\n</div>\n"
      },
      {
        "title": "Deadlocks: Detection, Prevention & Retry Protocols",
        "language": "sql",
        "starterCode": "-- Ordered resource locking to prevent deadlocks\n-- Always acquire locks in deterministic ascending order of ID!\nBEGIN;\nSELECT * FROM accounts WHERE id IN (10, 20) ORDER BY id FOR UPDATE;\n-- Work performed safely without cyclic lock wait\nCOMMIT;\n",
        "content": "\n<h2>⚡ Chapter 5: Deadlock Avoidance & Deterministic Ordering</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Transaction A locks Row 1 and wants Row 2. Transaction B locks Row 2 and wants Row 1. Deadlock! Discover how PostgreSQL detects cycles and how deterministic locking prevents them.</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "ACID Compliant Fund Transfer Simulation",
        "language": "sql",
        "starterCode": "BEGIN;\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nUPDATE accounts SET balance = balance + 50 WHERE id = 2;\nCOMMIT;\nSELECT balance FROM accounts WHERE id IN (1, 2);",
        "expectedOutput": "50\n150",
        "description": "\n<h2>Exercise: Atomic Transaction</h2>\n<p>Simulate a transactional fund transfer between two bank accounts wrapped in <code>BEGIN</code> and <code>COMMIT</code>.</p>\n",
        "hints": [
          "Always execute balance decrements and balance increments within the same transaction block."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Under the Leftmost Prefix Rule, which query CANNOT use an index defined on (country, city)?",
        "options": [
          "WHERE country = \"Canada\"",
          "WHERE country = \"Canada\" AND city = \"Toronto\"",
          "WHERE city = \"Toronto\"",
          "WHERE country = \"Japan\" ORDER BY city"
        ],
        "correctIndex": 2,
        "explanation": "Because B-Tree composite keys are sorted by country first, searching by city alone without country cannot utilize the index root."
      }
    ],
    "project": false
  },
  "week-16": {
    "lessons": [
      {
        "title": "Preventing SQL Injection with PreparedStatement",
        "language": "java",
        "starterCode": "import java.sql.*;\n\npublic class SafeJDBC {\n    public static void main(String[] args) {\n        String url = \"jdbc:postgresql://localhost:5432/questdb\";\n        String sql = \"SELECT id, username, class FROM adventurers WHERE username = ?\";\n\n        // Try-with-resources closes connection & statement automatically\n        /*\n        try (Connection conn = DriverManager.getConnection(url, \"user\", \"pass\");\n             PreparedStatement stmt = conn.prepareStatement(sql)) {\n            stmt.setString(1, \"ShadowMage\");\n            ResultSet rs = stmt.executeQuery();\n            while (rs.next()) {\n                System.out.println(\"Hero: \" + rs.getString(\"username\"));\n            }\n        } catch (SQLException e) {\n            e.printStackTrace();\n        }\n        */\n        System.out.println(\"PreparedStatement compiles SQL before inserting parameters!\");\n    }\n}",
        "content": "\n<h2>Why Raw String Concatenation Kills Security</h2>\n<pre><code>// ❌ FATAL SQL INJECTION VULNERABILITY:\nString query = \"SELECT * FROM users WHERE user = '\" + input + \"'\";</code></pre>\n<p>If <code>input</code> is <code>admin' OR '1'='1</code>, the attacker bypasses authentication!</p>\n<h3>The PreparedStatement Remedy</h3>\n<p>A <code>PreparedStatement</code> sends the SQL command to the database engine to be <strong>pre-compiled</strong>. User inputs are sent separately as raw data parameters, making SQL injection mathematically impossible.</p>\n"
      },
      {
        "title": "Connection Pooling with HikariCP",
        "language": "java",
        "starterCode": "public class ConnectionPoolConcept {\n    public static void main(String[] args) {\n        System.out.println(\"HikariCP maintains a pool of pre-warmed TCP connections to eliminate handshake overhead.\");\n    }\n}",
        "content": "\n<h2>Why Connection Pooling?</h2>\n<p>Establishing a fresh database TCP socket involves TCP 3-way handshakes, TLS negotiation, authentication, and session memory allocation—taking 30ms to 100ms per query!</p>\n<p><strong>HikariCP</strong> pre-opens a pool of persistent connections. Java threads borrow a connection, run their query, and return it to the pool in &lt; 1ms.</p>\n"
      },
      {
        "title": "JDBC Batch Processing: Executing 100,000 Records Efficiently",
        "language": "java",
        "starterCode": "import java.sql.*;\n\npublic class BatchInsert {\n    public static void insertBatch(Connection conn) throws SQLException {\n        String sql = \"INSERT INTO telemetry (sensor_id, temp) VALUES (?, ?)\";\n        conn.setAutoCommit(false);\n        try (PreparedStatement ps = conn.prepareStatement(sql)) {\n            for (int i = 1; i <= 10000; i++) {\n                ps.setString(1, \"SENSOR-\" + i);\n                ps.setDouble(2, 20.0 + Math.random() * 10);\n                ps.addBatch();\n                if (i % 1000 == 0) ps.executeBatch(); // Send chunks of 1000\n            }\n            ps.executeBatch();\n            conn.commit();\n        }\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: High-Throughput JDBC Batch Updates</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>Sending 10,000 SQL statements individually causes 10,000 network round trips. JDBC Batching bundles statements into consolidated network packets!</em>\n</div>\n"
      },
      {
        "title": "Transactions in JDBC: Savepoints, Rollbacks & Auto-Commit",
        "language": "java",
        "starterCode": "import java.sql.*;\n\npublic class JDBCTransactions {\n    public static void transferFunds(Connection conn, int from, int to, double amt) throws SQLException {\n        conn.setAutoCommit(false); // Begin transaction block\n        try {\n            // Debit\n            // Credit\n            conn.commit(); // Atomic success\n        } catch (SQLException e) {\n            conn.rollback(); // Complete undo on failure\n            throw e;\n        }\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Manual JDBC Transaction Boundaries</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>By default, JDBC operates in auto-commit mode. Learn how to disable auto-commit to execute multi-table atomic operations safely with manual rollbacks!</em>\n</div>\n"
      },
      {
        "title": "Database Observability: Query Logging & Slow Query Traps",
        "language": "sql",
        "starterCode": "-- PostgreSQL slow query log threshold\nSET log_min_duration_statement = '250ms';\n\n-- Inspect active database locks and long-running transactions\nSELECT pid, now() - xact_start AS duration, query, state\nFROM pg_stat_activity\nWHERE state != 'idle'\nORDER BY duration DESC;\n",
        "content": "\n<h2>⚡ Chapter 5: Database Telemetry & Slow Query Diagnostics</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ VAULT OF DATA:</strong> <em>A high-performance production database requires real-time observability. Diagnose slow queries using pg_stat_activity and log_min_duration_statement!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "Safe DAO Query Implementation",
        "language": "java",
        "starterCode": "public class UserDAODemo {\n    public static String buildSafeQuery(String username) {\n        // In production, parameterized queries are passed with '?' placeholders\n        return \"SELECT id, email FROM users WHERE username = ? -- Prepared\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(buildSafeQuery(\"biruk\"));\n    }\n}",
        "expectedOutput": "SELECT id, email FROM users WHERE username = ? -- Prepared",
        "description": "\n<h2>Exercise: Parameterized SQL</h2>\n<p>Confirm the standard placeholder convention for safe SQL execution.</p>\n",
        "hints": [
          "SQL parameters are represented by ? placeholders in JDBC."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why does PreparedStatement prevent SQL injection?",
        "options": [
          "It escapes all single quotes in the string",
          "The database compiles the query structure first, treating parameter values strictly as literal data",
          "It uses encryption algorithms across the socket",
          "It forces all inputs to be numeric"
        ],
        "correctIndex": 1,
        "explanation": "Because the query execution plan is compiled prior to parameter binding, user inputs can never alter the syntax or structure of the SQL command."
      }
    ],
    "project": {
      "title": "Standalone Java + JDBC Guild Management System",
      "description": "\n<h2>Project: Java + JDBC Guild Data Access Layer</h2>\n<p>Build a production Data Access Object (DAO) pattern in Java with JDBC that performs CRUD operations on a PostgreSQL database using PreparedStatements, transactions, and HikariCP connection pooling.</p>\n",
      "language": "java",
      "starterCode": "public class GuildDatabaseApp {\n    public static void main(String[] args) {\n        System.out.println(\"⚔️ Guild Management DAO ready!\");\n    }\n}",
      "requirements": [
        "Implement an AdventurerDAO interface with create, findById, update, and delete methods",
        "Use PreparedStatement for all database interactions to prevent SQL injection",
        "Wrap multi-table operations (e.g., transferring an adventurer between guilds) in explicit ACID transactions",
        "Use HikariCP DataSource configuration for connection pooling"
      ]
    }
  }
};
