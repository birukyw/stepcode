// ─── Phase 5: The Engine of Creation — Spring Boot & Enterprise Backend (Weeks 17–20) ───────────

export const phase5Content = {
  // ════════════════════════════════════════════════════════════════
  // WEEK 17: Spring Core, Inversion of Control & Spring Boot 3
  // ════════════════════════════════════════════════════════════════
  'week-17': {
    lessons: [
      {
        title: 'Inversion of Control (IoC) & Constructor Dependency Injection',
        language: 'java',
        starterCode: `// Loose coupling with Spring Dependency Injection\ninterface NotificationService {\n    void notifyUser(String message);\n}\n\nclass EmailService implements NotificationService {\n    public void notifyUser(String message) {\n        System.out.println("Email: " + message);\n    }\n}\n\n// Spring manages and injects dependencies via constructor\nclass OrderProcessor {\n    private final NotificationService notifier;\n\n    public OrderProcessor(NotificationService notifier) {\n        this.notifier = notifier;\n    }\n\n    public void processOrder() {\n        notifier.notifyUser("Order placed successfully!");\n    }\n}\n\npublic class SpringCoreDemo {\n    public static void main(String[] args) {\n        OrderProcessor op = new OrderProcessor(new EmailService());\n        op.processOrder();\n    }\n}`,
        content: `
<h2>The Heart of Spring: IoC & DI</h2>
<p>In traditional programming, Class A creates Class B with <code>new ClassB()</code>, binding them tightly together.</p>
<p><strong>Inversion of Control (IoC)</strong> reverses this: classes declare what interfaces they require in their constructor, and the Spring IoC Container automatically instantiates and injects those dependencies (Beans) at startup.</p>

<h3>Core Stereotype Annotations</h3>
<ul>
  <li><code>@Component</code>: Base annotation marking a class as a Spring-managed Bean.</li>
  <li><code>@Service</code>: Specialization for business logic layers.</li>
  <li><code>@Repository</code>: Specialization for database data-access layers with automated exception translation.</li>
  <li><code>@Controller</code> / <code>@RestController</code>: Specialization for HTTP routing and REST endpoints.</li>
</ul>
`,
      },
      {
        title: 'Spring Boot 3 Auto-Configuration & Application Profiles',
        language: 'java',
        starterCode: `// application.yml example\n/*\nspring:\n  profiles:\n    active: dev\n---\nspring:\n  config:\n    activate:\n      on-profile: dev\n  datasource:\n    url: jdbc:h2:mem:testdb\n---\nspring:\n  config:\n    activate:\n      on-profile: prod\n  datasource:\n    url: jdbc:postgresql://db.prod:5432/questdb\n*/\n\npublic class ProfileDemo {\n    public static void main(String[] args) {\n        System.out.println("Spring Boot profiles switch datasource configurations seamlessly!");\n    }\n}`,
        content: `
<h2>Spring Boot 3 Magic</h2>
<p>Before Spring Boot, configuring a Java enterprise application required hundreds of lines of XML or verbose Java config.</p>
<p>Spring Boot inspects the classpath (e.g., detecting PostgreSQL and Tomcat JARs) and activates <strong>Opinionated Auto-Configuration</strong>.</p>
<h3>Environment Profiles</h3>
<p>Using <code>application.yml</code> or <code>application.properties</code>, you can maintain isolated settings for <code>dev</code> (in-memory H2 database), <code>test</code>, and <code>prod</code> (production PostgreSQL cluster).</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Constructor Injection Pattern',
        language: 'java',
        starterCode: `public class DIExercise {\n    static class SpellService {\n        public String cast() { return "Fireball!"; }\n    }\n\n    static class Mage {\n        private final SpellService spells;\n        // Constructor Injection\n        public Mage(SpellService spells) {\n            this.spells = spells;\n        }\n        public String attack() {\n            return spells.cast();\n        }\n    }\n\n    public static void main(String[] args) {\n        Mage mage = new Mage(new SpellService());\n        System.out.println(mage.attack());\n    }\n}`,
        expectedOutput: 'Fireball!',
        description: `
<h2>Exercise: Constructor Dependency Injection</h2>
<p>Verify constructor dependency injection by instantiating a service and passing it into a consumer class.</p>
`,
        hints: ['Accept the dependency as a constructor argument and store it in a private final field.'],
      }
    ],
    quiz: [
      {
        question: 'Why is constructor injection preferred over field injection (@Autowired on private fields)?',
        options: ['It allows fields to be final, facilitates unit testing without Spring, and prevents partial object instantiation', 'It executes faster at bytecode runtime', 'Field injection was deleted in Spring Boot 3', 'Constructor injection disables garbage collection'],
        correctIndex: 0,
        explanation: 'Constructor injection allows dependencies to be immutable (final) and allows you to test the class simply by passing mock objects into the constructor.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 18: RESTful API Architecture, DTOs & Validation
  // ════════════════════════════════════════════════════════════════
  'week-18': {
    lessons: [
      {
        title: 'REST Architecture, HTTP Status Codes & @RestController',
        language: 'java',
        starterCode: `// Conceptual Spring Boot REST Controller\n/*\n@RestController\n@RequestMapping("/api/v1/heroes")\npublic class HeroController {\n\n    @GetMapping("/{id}")\n    public ResponseEntity<HeroResponseDTO> getHero(@PathVariable Long id) {\n        return ResponseEntity.ok(new HeroResponseDTO(id, "ShadowKnight", 45));\n    }\n\n    @PostMapping\n    public ResponseEntity<HeroResponseDTO> createHero(@Valid @RequestBody CreateHeroDTO dto) {\n        return ResponseEntity.status(HttpStatus.CREATED).body(...);\n    }\n}\n*/\n\npublic class RestOverview {\n    public static void main(String[] args) {\n        System.out.println("200 OK | 201 Created | 400 Bad Request | 404 Not Found | 500 Server Error");\n    }\n}`,
        content: `
<h2>Designing RESTful APIs</h2>
<p>RESTful systems expose resources via clean URIs with standard HTTP verbs:</p>
<ul>
  <li><code>GET /api/heroes</code>: Retrieve collection (200 OK).</li>
  <li><code>GET /api/heroes/{id}</code>: Retrieve single entity (200 OK or 404 Not Found).</li>
  <li><code>POST /api/heroes</code>: Create new entity (201 Created with Location header).</li>
  <li><code>PUT /api/heroes/{id}</code>: Full replacement of entity.</li>
  <li><code>PATCH /api/heroes/{id}</code>: Partial update of specific fields.</li>
  <li><code>DELETE /api/heroes/{id}</code>: Remove entity (204 No Content).</li>
</ul>
`,
      },
      {
        title: 'DTO Pattern & Global Exception Handling (@RestControllerAdvice)',
        language: 'java',
        starterCode: `public class DTOArchitecture {\n    public static void main(String[] args) {\n        System.out.println("Never expose JPA @Entity directly over HTTP! Use DTOs and @RestControllerAdvice.");\n    }\n}`,
        content: `
<h2>The Data Transfer Object (DTO) Pattern</h2>
<p>Never return your raw database entities (like JPA <code>@Entity</code>) over HTTP! Doing so introduces security vulnerabilities (over-posting / mass assignment attacks) and circular JSON reference loops.</p>
<h3>Centralized Error Handling</h3>
<p>Annotating a class with <code>@RestControllerAdvice</code> allows you to intercept exceptions globally and return unified error JSON objects (with timestamp, status code, and validation messages) across all controllers.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'API Response Formatting',
        language: 'java',
        starterCode: `public class RestResponseFormat {\n    public static String formatSuccess(String resource, int id) {\n        return "{\\"status\\":\\"success\\",\\"resource\\":\\"" + resource + "\\",\\"id\\":" + id + "}";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(formatSuccess("heroes", 101));\n    }\n}`,
        expectedOutput: '{"status":"success","resource":"heroes","id":101}',
        description: `
<h2>Exercise: RESTful JSON Payload</h2>
<p>Format a JSON string matching standard REST response structure.</p>
`,
        hints: ['Escape quotes properly in Java string literals.'],
      }
    ],
    quiz: [
      {
        question: 'Which HTTP status code should be returned after successfully creating a new resource via POST?',
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctIndex: 1,
        explanation: 'HTTP 201 Created is the specific REST standard indicating that a new resource was created.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 19: Spring Data JPA, Hibernate & Entity Relationships
  // ════════════════════════════════════════════════════════════════
  'week-19': {
    lessons: [
      {
        title: 'JPA Entities & One-to-Many Relationships',
        language: 'java',
        starterCode: `// Conceptual JPA Mapping\n/*\n@Entity\n@Table(name = "guilds")\npublic class Guild {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false, unique = true)\n    private String name;\n\n    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL, orphanRemoval = true)\n    private List<Adventurer> members = new ArrayList<>();\n}\n*/\n\npublic class JPADemo {\n    public static void main(String[] args) {\n        System.out.println("JPA maps relational rows into Java object graphs.");\n    }\n}`,
        content: `
<h2>Object-Relational Mapping (ORM) with Hibernate</h2>
<p>JPA (Java Persistence API) is the specification; <strong>Hibernate</strong> is the underlying implementation.</p>
<h3>Entity Relationships</h3>
<ul>
  <li><code>@OneToMany</code> & <code>@ManyToOne</code>: The most common relationship (e.g., One Guild has Many Adventurers).</li>
  <li><strong>FetchType.LAZY:</strong> Loads child records only when accessed, preventing catastrophic memory bloat.</li>
  <li><strong>The N+1 Problem:</strong> If you fetch 100 guilds and iterate through their members, Hibernate might execute 101 SQL queries! Solve this with <code>JOIN FETCH</code> in JPQL.</li>
</ul>
`,
      },
      {
        title: 'Spring Data JpaRepository & Custom JPQL Queries',
        language: 'java',
        starterCode: `public class SpringDataRepoDemo {\n    public static void main(String[] args) {\n        System.out.println("Spring Data generates SQL queries automatically from method signatures like findByEmail()!");\n    }\n}`,
        content: `
<h2>Spring Data Repositories</h2>
<p>By extending <code>JpaRepository&lt;Entity, ID&gt;</code>, Spring automatically generates implementations for standard CRUD, pagination, and sorting.</p>
<p>You can define custom queries simply by following method naming conventions (e.g., <code>findByStatusOrderByCreatedAtDesc()</code>) or using the <code>@Query</code> annotation for custom JPQL.</p>
`,
      }
    ],
    exercises: [
      {
        title: 'Spring Data Derived Method Name Practice',
        language: 'java',
        starterCode: `public class DerivedQueryExercise {\n    public static String getDerivedMethodName() {\n        return "findByEmailAndActiveTrue";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(getDerivedMethodName());\n    }\n}`,
        expectedOutput: 'findByEmailAndActiveTrue',
        description: `
<h2>Exercise: Spring Data Repository Queries</h2>
<p>Confirm the standard method signature naming convention for querying by email where active is true.</p>
`,
        hints: ['Spring Data parses method names like findBy...And...'],
      }
    ],
    quiz: [
      {
        question: 'What is the N+1 Query Problem in ORM/Hibernate?',
        options: ['An index scan failure when tables exceed N rows', 'Executing 1 query to fetch parent records, followed by N individual queries to fetch children of each parent', 'A syntax error in JPQL where N and 1 are mismatched', 'When database connection pools exceed maximum capacity by 1'],
        correctIndex: 1,
        explanation: 'When fetching N parent records with lazy relationships, accessing the children inside a loop triggers N additional database trips.'
      }
    ],
    project: false,
  },

  // ════════════════════════════════════════════════════════════════
  // WEEK 20: Enterprise Security (JWT), Testing & Production Readiness
  // ════════════════════════════════════════════════════════════════
  'week-20': {
    lessons: [
      {
        title: 'Spring Security & Stateless JWT Authentication',
        language: 'java',
        starterCode: `public class JWTSecurityConcept {\n    public static void main(String[] args) {\n        System.out.println("JWT consists of Header.Payload.Signature and provides stateless authentication.");\n    }\n}`,
        content: `
<h2>Stateless Security with JWT</h2>
<p>Traditional web applications store session IDs in server memory. In microservices and modern APIs, we use <strong>JSON Web Tokens (JWT)</strong>:</p>
<ol>
  <li>User sends login credentials (username + password).</li>
  <li>Server validates credentials against BCrypt hashed database password.</li>
  <li>Server signs a cryptographically secure JWT containing user claims and roles.</li>
  <li>Client passes this token in the <code>Authorization: Bearer &lt;token&gt;</code> header on every subsequent HTTP request.</li>
  <li>Server validates signature in a <code>OncePerRequestFilter</code> without needing a database session lookup.</li>
</ol>
`,
      },
      {
        title: 'Testing in Spring Boot: MockMvc & @DataJpaTest',
        language: 'java',
        starterCode: `public class TestingConcept {\n    public static void main(String[] args) {\n        System.out.println("@WebMvcTest tests controllers in isolation with MockMvc; @DataJpaTest tests repositories.");\n    }\n}`,
        content: `
<h2>Testing Strategies</h2>
<ul>
  <li><code>@WebMvcTest</code>: Loads only web controllers, allowing you to test HTTP routing, validation, and JSON serialization with <code>MockMvc</code> without booting the full application context.</li>
  <li><code>@DataJpaTest</code>: Configures an in-memory database and tests repository queries and transactions in isolation.</li>
  <li><code>@SpringBootTest</code>: Full integration test bringing up the entire application stack.</li>
</ul>
`,
      }
    ],
    exercises: [
      {
        title: 'Authorization Header Format Verification',
        language: 'java',
        starterCode: `public class AuthHeaderExercise {\n    public static String buildAuthHeader(String token) {\n        return "Bearer " + token;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(buildAuthHeader("eyJhbGciOiJIUzI1NiJ9"));\n    }\n}`,
        expectedOutput: 'Bearer eyJhbGciOiJIUzI1NiJ9',
        description: `
<h2>Exercise: HTTP Authorization Header</h2>
<p>Construct the standard HTTP Bearer token string.</p>
`,
        hints: ['The standard prefix is "Bearer " followed by the raw token.'],
      }
    ],
    quiz: [
      {
        question: 'Why should passwords NEVER be stored using plain MD5 or SHA-256?',
        options: ['They take up too many bytes in PostgreSQL', 'MD5 and SHA-256 are fast hash functions vulnerable to GPU brute-forcing and rainbow tables; adaptive algorithms like BCrypt or Argon2 are required', 'Spring Security only supports plaintext', 'JSON cannot serialize SHA-256 hashes'],
        correctIndex: 1,
        explanation: 'BCrypt includes an adjustable work factor (salt + multiple rounds of key stretching) that makes GPU brute-forcing computationally prohibitive.'
      }
    ],
    project: {
      title: 'Production Spring Boot REST API for Hero Guilds',
      description: `
<h2>Project: Production Spring Boot REST Backend</h2>
<p>Build a production-grade Spring Boot REST API featuring a layered architecture (Controller -> Service -> Repository), Spring Data JPA entity relationships, DTO validation, and global error handling with <code>@RestControllerAdvice</code>.</p>
`,
      language: 'java',
      starterCode: `public class GuildBackendApplication {\n    public static void main(String[] args) {\n        System.out.println("⚔️ Spring Boot Enterprise Guild Backend online!");\n    }\n}`,
      requirements: [
        'Expose CRUD REST endpoints for Guilds and Adventurers with proper HTTP status codes',
        'Map a One-to-Many relationship between Guild and Adventurers using JPA and Hibernate',
        'Validate incoming DTOs using @Valid (@NotBlank, @Min, @Size)',
        'Implement global exception handling using @RestControllerAdvice returning structured API error responses'
      ]
    }
  }
};
