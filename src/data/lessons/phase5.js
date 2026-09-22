// ─── Phase 5: The Engine of Creation: Spring Boot 3 & Microservices ───────

export const phase5Content = {
  "week-17": {
    "lessons": [
      {
        "title": "Inversion of Control (IoC) & Constructor Dependency Injection",
        "language": "java",
        "starterCode": "// Loose coupling with Spring Dependency Injection\ninterface NotificationService {\n    void notifyUser(String message);\n}\n\nclass EmailService implements NotificationService {\n    public void notifyUser(String message) {\n        System.out.println(\"Email: \" + message);\n    }\n}\n\n// Spring manages and injects dependencies via constructor\nclass OrderProcessor {\n    private final NotificationService notifier;\n\n    public OrderProcessor(NotificationService notifier) {\n        this.notifier = notifier;\n    }\n\n    public void processOrder() {\n        notifier.notifyUser(\"Order placed successfully!\");\n    }\n}\n\npublic class SpringCoreDemo {\n    public static void main(String[] args) {\n        OrderProcessor op = new OrderProcessor(new EmailService());\n        op.processOrder();\n    }\n}",
        "content": "\n<h2>The Heart of Spring: IoC & DI</h2>\n<p>In traditional programming, Class A creates Class B with <code>new ClassB()</code>, binding them tightly together.</p>\n<p><strong>Inversion of Control (IoC)</strong> reverses this: classes declare what interfaces they require in their constructor, and the Spring IoC Container automatically instantiates and injects those dependencies (Beans) at startup.</p>\n\n<h3>Core Stereotype Annotations</h3>\n<ul>\n  <li><code>@Component</code>: Base annotation marking a class as a Spring-managed Bean.</li>\n  <li><code>@Service</code>: Specialization for business logic layers.</li>\n  <li><code>@Repository</code>: Specialization for database data-access layers with automated exception translation.</li>\n  <li><code>@Controller</code> / <code>@RestController</code>: Specialization for HTTP routing and REST endpoints.</li>\n</ul>\n"
      },
      {
        "title": "Spring Boot 3 Auto-Configuration & Application Profiles",
        "language": "java",
        "starterCode": "// application.yml example\n/*\nspring:\n  profiles:\n    active: dev\n---\nspring:\n  config:\n    activate:\n      on-profile: dev\n  datasource:\n    url: jdbc:h2:mem:testdb\n---\nspring:\n  config:\n    activate:\n      on-profile: prod\n  datasource:\n    url: jdbc:postgresql://db.prod:5432/questdb\n*/\n\npublic class ProfileDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Spring Boot profiles switch datasource configurations seamlessly!\");\n    }\n}",
        "content": "\n<h2>Spring Boot 3 Magic</h2>\n<p>Before Spring Boot, configuring a Java enterprise application required hundreds of lines of XML or verbose Java config.</p>\n<p>Spring Boot inspects the classpath (e.g., detecting PostgreSQL and Tomcat JARs) and activates <strong>Opinionated Auto-Configuration</strong>.</p>\n<h3>Environment Profiles</h3>\n<p>Using <code>application.yml</code> or <code>application.properties</code>, you can maintain isolated settings for <code>dev</code> (in-memory H2 database), <code>test</code>, and <code>prod</code> (production PostgreSQL cluster).</p>\n"
      },
      {
        "title": "Bean Scopes (@Scope: Singleton vs Prototype) & Lifecycle Hooks",
        "language": "java",
        "starterCode": "import jakarta.annotation.PostConstruct;\nimport jakarta.annotation.PreDestroy;\nimport org.springframework.context.annotation.Scope;\nimport org.springframework.stereotype.Component;\n\n@Component\n@Scope(\"singleton\") // Default: single instance per Spring IoC container\npublic class VaultConnectionManager {\n    @PostConstruct\n    public void init() {\n        System.out.println(\"⚡ VaultConnectionManager initialized!\");\n    }\n\n    @PreDestroy\n    public void cleanup() {\n        System.out.println(\"🛡️ Graceful shutdown: draining connections...\");\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Spring Bean Lifecycle & Scope Architectures</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>By default, all Spring beans are Singleton. Understand when to use Prototype, Request, and Session scopes, and how @PostConstruct and @PreDestroy hook into the lifecycle!</em>\n</div>\n"
      },
      {
        "title": "Spring AOP: Aspect-Oriented Logging & @Around Interceptors",
        "language": "java",
        "starterCode": "import org.aspectj.lang.ProceedingJoinPoint;\nimport org.aspectj.lang.annotation.Around;\nimport org.aspectj.lang.annotation.Aspect;\nimport org.springframework.stereotype.Component;\n\n@Aspect\n@Component\npublic class PerformanceAspect {\n    @Around(\"@annotation(org.springframework.web.bind.annotation.GetMapping)\")\n    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {\n        long start = System.currentTimeMillis();\n        Object proceed = joinPoint.proceed();\n        long duration = System.currentTimeMillis() - start;\n        System.out.println(\"Execution time of \" + joinPoint.getSignature() + \": \" + duration + \"ms\");\n        return proceed;\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Aspect-Oriented Programming (AOP)</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Cross-cutting concerns like logging, security, and performance metrics shouldn't pollute business code. AOP intercepts method invocations cleanly using dynamic proxies!</em>\n</div>\n"
      },
      {
        "title": "Externalized Configuration with @ConfigurationProperties",
        "language": "java",
        "starterCode": "import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.stereotype.Component;\n\n@Component\n@ConfigurationProperties(prefix = \"game.server\")\npublic class ServerSettings {\n    private String host;\n    private int port;\n    private boolean maintenanceMode;\n\n    // Getters and setters\n    public String getHost() { return host; }\n    public void setHost(String host) { this.host = host; }\n    public int getPort() { return port; }\n    public void setPort(int port) { this.port = port; }\n}",
        "content": "\n<h2>⚡ Chapter 5: Type-Safe Configuration Properties</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Stop scattering @Value annotations everywhere. Modern Spring Boot uses strongly typed @ConfigurationProperties mapped directly to application.yml!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "Constructor Injection Pattern",
        "language": "java",
        "starterCode": "public class DIExercise {\n    static class SpellService {\n        public String cast() { return \"Fireball!\"; }\n    }\n\n    static class Mage {\n        private final SpellService spells;\n        // Constructor Injection\n        public Mage(SpellService spells) {\n            this.spells = spells;\n        }\n        public String attack() {\n            return spells.cast();\n        }\n    }\n\n    public static void main(String[] args) {\n        Mage mage = new Mage(new SpellService());\n        System.out.println(mage.attack());\n    }\n}",
        "expectedOutput": "Fireball!",
        "description": "\n<h2>Exercise: Constructor Dependency Injection</h2>\n<p>Verify constructor dependency injection by instantiating a service and passing it into a consumer class.</p>\n",
        "hints": [
          "Accept the dependency as a constructor argument and store it in a private final field."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why is constructor injection preferred over field injection (@Autowired on private fields)?",
        "options": [
          "It allows fields to be final, facilitates unit testing without Spring, and prevents partial object instantiation",
          "It executes faster at bytecode runtime",
          "Field injection was deleted in Spring Boot 3",
          "Constructor injection disables garbage collection"
        ],
        "correctIndex": 0,
        "explanation": "Constructor injection allows dependencies to be immutable (final) and allows you to test the class simply by passing mock objects into the constructor."
      }
    ],
    "project": false
  },
  "week-18": {
    "lessons": [
      {
        "title": "REST Architecture, HTTP Status Codes & @RestController",
        "language": "java",
        "starterCode": "// Conceptual Spring Boot REST Controller\n/*\n@RestController\n@RequestMapping(\"/api/v1/heroes\")\npublic class HeroController {\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<HeroResponseDTO> getHero(@PathVariable Long id) {\n        return ResponseEntity.ok(new HeroResponseDTO(id, \"ShadowKnight\", 45));\n    }\n\n    @PostMapping\n    public ResponseEntity<HeroResponseDTO> createHero(@Valid @RequestBody CreateHeroDTO dto) {\n        return ResponseEntity.status(HttpStatus.CREATED).body(...);\n    }\n}\n*/\n\npublic class RestOverview {\n    public static void main(String[] args) {\n        System.out.println(\"200 OK | 201 Created | 400 Bad Request | 404 Not Found | 500 Server Error\");\n    }\n}",
        "content": "\n<h2>Designing RESTful APIs</h2>\n<p>RESTful systems expose resources via clean URIs with standard HTTP verbs:</p>\n<ul>\n  <li><code>GET /api/heroes</code>: Retrieve collection (200 OK).</li>\n  <li><code>GET /api/heroes/{id}</code>: Retrieve single entity (200 OK or 404 Not Found).</li>\n  <li><code>POST /api/heroes</code>: Create new entity (201 Created with Location header).</li>\n  <li><code>PUT /api/heroes/{id}</code>: Full replacement of entity.</li>\n  <li><code>PATCH /api/heroes/{id}</code>: Partial update of specific fields.</li>\n  <li><code>DELETE /api/heroes/{id}</code>: Remove entity (204 No Content).</li>\n</ul>\n"
      },
      {
        "title": "DTO Pattern & Global Exception Handling (@RestControllerAdvice)",
        "language": "java",
        "starterCode": "public class DTOArchitecture {\n    public static void main(String[] args) {\n        System.out.println(\"Never expose JPA @Entity directly over HTTP! Use DTOs and @RestControllerAdvice.\");\n    }\n}",
        "content": "\n<h2>The Data Transfer Object (DTO) Pattern</h2>\n<p>Never return your raw database entities (like JPA <code>@Entity</code>) over HTTP! Doing so introduces security vulnerabilities (over-posting / mass assignment attacks) and circular JSON reference loops.</p>\n<h3>Centralized Error Handling</h3>\n<p>Annotating a class with <code>@RestControllerAdvice</code> allows you to intercept exceptions globally and return unified error JSON objects (with timestamp, status code, and validation messages) across all controllers.</p>\n"
      },
      {
        "title": "Bean Validation: JSR-380 (@Valid, @NotNull, Custom Validators)",
        "language": "java",
        "starterCode": "import jakarta.validation.constraints.*;\n\npublic record CreateHeroRequest(\n    @NotBlank(message = \"Hero name cannot be empty\")\n    @Size(min = 3, max = 30, message = \"Name must be between 3 and 30 characters\")\n    String name,\n\n    @NotNull\n    @Min(value = 1, message = \"Level must be at least 1\")\n    Integer level,\n\n    @Email(message = \"Guild communications email must be valid\")\n    String guildEmail\n) {}",
        "content": "\n<h2>⚡ Chapter 3: Declarative Validation with JSR-380</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Annotate incoming DTOs with @Valid to reject bad inputs before your controller logic even executes!</em>\n</div>\n"
      },
      {
        "title": "Pagination & Sorting with Pageable & PagedModel",
        "language": "java",
        "starterCode": "import org.springframework.data.domain.Page;\nimport org.springframework.data.domain.Pageable;\nimport org.springframework.data.domain.Sort;\nimport org.springframework.data.web.PageableDefault;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping(\"/api/items\")\npublic class ItemController {\n    @GetMapping\n    public Page<ItemDto> getItems(\n        @PageableDefault(size = 20, sort = \"price\", direction = Sort.Direction.ASC) Pageable pageable\n    ) {\n        // Spring automatically resolves ?page=0&size=20&sort=price,asc\n        return itemService.findAll(pageable);\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Enterprise Pagination & Sorting</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Never return unpaginated collections of 100,000 records. Spring Data Pageable seamlessly coordinates LIMIT and OFFSET queries with client headers!</em>\n</div>\n"
      },
      {
        "title": "API Documentation with OpenAPI 3 & Swagger UI",
        "language": "java",
        "starterCode": "import io.swagger.v3.oas.annotations.Operation;\nimport io.swagger.v3.oas.annotations.tags.Tag;\nimport org.springframework.web.bind.annotation.*;\n\n@Tag(name = \"Hero Management\", description = \"Endpoints for recruiting and inspecting champions\")\n@RestController\n@RequestMapping(\"/api/heroes\")\npublic class HeroController {\n    @Operation(summary = \"Fetch hero by identifier\", description = \"Returns full stat sheet and armor loadout\")\n    @GetMapping(\"/{id}\")\n    public HeroDto getHero(@PathVariable Long id) {\n        return heroService.findById(id);\n    }\n}",
        "content": "\n<h2>⚡ Chapter 5: Interactive OpenAPI 3 & Swagger Documentation</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Export self-documenting interactive API portals accessible at /swagger-ui.html with zero manual JSON schema synchronization!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "API Response Formatting",
        "language": "java",
        "starterCode": "public class RestResponseFormat {\n    public static String formatSuccess(String resource, int id) {\n        return \"{\\\"status\\\":\\\"success\\\",\\\"resource\\\":\\\"\" + resource + \"\\\",\\\"id\\\":\" + id + \"}\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(formatSuccess(\"heroes\", 101));\n    }\n}",
        "expectedOutput": "{\"status\":\"success\",\"resource\":\"heroes\",\"id\":101}",
        "description": "\n<h2>Exercise: RESTful JSON Payload</h2>\n<p>Format a JSON string matching standard REST response structure.</p>\n",
        "hints": [
          "Escape quotes properly in Java string literals."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Which HTTP status code should be returned after successfully creating a new resource via POST?",
        "options": [
          "200 OK",
          "201 Created",
          "204 No Content",
          "302 Found"
        ],
        "correctIndex": 1,
        "explanation": "HTTP 201 Created is the specific REST standard indicating that a new resource was created."
      }
    ],
    "project": false
  },
  "week-19": {
    "lessons": [
      {
        "title": "JPA Entities & One-to-Many Relationships",
        "language": "java",
        "starterCode": "// Conceptual JPA Mapping\n/*\n@Entity\n@Table(name = \"guilds\")\npublic class Guild {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false, unique = true)\n    private String name;\n\n    @OneToMany(mappedBy = \"guild\", cascade = CascadeType.ALL, orphanRemoval = true)\n    private List<Adventurer> members = new ArrayList<>();\n}\n*/\n\npublic class JPADemo {\n    public static void main(String[] args) {\n        System.out.println(\"JPA maps relational rows into Java object graphs.\");\n    }\n}",
        "content": "\n<h2>Object-Relational Mapping (ORM) with Hibernate</h2>\n<p>JPA (Java Persistence API) is the specification; <strong>Hibernate</strong> is the underlying implementation.</p>\n<h3>Entity Relationships</h3>\n<ul>\n  <li><code>@OneToMany</code> & <code>@ManyToOne</code>: The most common relationship (e.g., One Guild has Many Adventurers).</li>\n  <li><strong>FetchType.LAZY:</strong> Loads child records only when accessed, preventing catastrophic memory bloat.</li>\n  <li><strong>The N+1 Problem:</strong> If you fetch 100 guilds and iterate through their members, Hibernate might execute 101 SQL queries! Solve this with <code>JOIN FETCH</code> in JPQL.</li>\n</ul>\n"
      },
      {
        "title": "Spring Data JpaRepository & Custom JPQL Queries",
        "language": "java",
        "starterCode": "public class SpringDataRepoDemo {\n    public static void main(String[] args) {\n        System.out.println(\"Spring Data generates SQL queries automatically from method signatures like findByEmail()!\");\n    }\n}",
        "content": "\n<h2>Spring Data Repositories</h2>\n<p>By extending <code>JpaRepository&lt;Entity, ID&gt;</code>, Spring automatically generates implementations for standard CRUD, pagination, and sorting.</p>\n<p>You can define custom queries simply by following method naming conventions (e.g., <code>findByStatusOrderByCreatedAtDesc()</code>) or using the <code>@Query</code> annotation for custom JPQL.</p>\n"
      },
      {
        "title": "Many-to-Many Relationships & Join Tables with Composite Keys",
        "language": "java",
        "starterCode": "import jakarta.persistence.*;\nimport java.util.HashSet;\nimport java.util.Set;\n\n@Entity\n@Table(name = \"heroes\")\npublic class Hero {\n    @Id @GeneratedValue\n    private Long id;\n\n    @ManyToMany\n    @JoinTable(\n        name = \"hero_skills\",\n        joinColumns = @JoinColumn(name = \"hero_id\"),\n        inverseJoinColumns = @JoinColumn(name = \"skill_id\")\n    )\n    private Set<Skill> skills = new HashSet<>();\n}",
        "content": "\n<h2>⚡ Chapter 3: Complex Many-to-Many Mappings & Join Tables</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Model cross-referenced entities using @JoinTable and @ManyToMany with Set collections to avoid Cartesian duplication!</em>\n</div>\n"
      },
      {
        "title": "The N+1 Query Problem: Solving with JOIN FETCH & EntityGraph",
        "language": "java",
        "starterCode": "import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.data.jpa.repository.Query;\nimport java.util.List;\n\npublic interface HeroRepository extends JpaRepository<Hero, Long> {\n    // Solves N+1 in a single query by fetching relations eagerly in JPQL\n    @Query(\"SELECT h FROM Hero h JOIN FETCH h.skills WHERE h.active = true\")\n    List<Hero> findAllWithSkillsEager();\n}",
        "content": "\n<h2>⚡ Chapter 4: Eliminating the Dreaded N+1 Query Disaster</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Iterating over 100 heroes triggers 101 separate SQL queries under lazy loading! Annihilate N+1 issues forever using JPQL JOIN FETCH or @EntityGraph!</em>\n</div>\n"
      },
      {
        "title": "JPA Auditing & Optimistic Locking with @Version",
        "language": "java",
        "starterCode": "import jakarta.persistence.*;\nimport org.springframework.data.annotation.CreatedDate;\nimport org.springframework.data.annotation.LastModifiedDate;\nimport org.springframework.data.jpa.domain.support.AuditingEntityListener;\nimport java.time.Instant;\n\n@Entity\n@EntityListeners(AuditingEntityListener.class)\npublic class BankAccount {\n    @Id @GeneratedValue\n    private Long id;\n\n    private Double balance;\n\n    @Version // Optimistic locking detects concurrent modifications!\n    private Long version;\n\n    @CreatedDate\n    private Instant createdAt;\n\n    @LastModifiedDate\n    private Instant updatedAt;\n}",
        "content": "\n<h2>⚡ Chapter 5: JPA Auditing & Concurrency with @Version</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Automatically stamp createdAt and updatedAt with @EntityListeners, and prevent lost updates in high-concurrency environments using @Version optimistic locks!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "Spring Data Derived Method Name Practice",
        "language": "java",
        "starterCode": "public class DerivedQueryExercise {\n    public static String getDerivedMethodName() {\n        return \"findByEmailAndActiveTrue\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(getDerivedMethodName());\n    }\n}",
        "expectedOutput": "findByEmailAndActiveTrue",
        "description": "\n<h2>Exercise: Spring Data Repository Queries</h2>\n<p>Confirm the standard method signature naming convention for querying by email where active is true.</p>\n",
        "hints": [
          "Spring Data parses method names like findBy...And..."
        ]
      }
    ],
    "quiz": [
      {
        "question": "What is the N+1 Query Problem in ORM/Hibernate?",
        "options": [
          "An index scan failure when tables exceed N rows",
          "Executing 1 query to fetch parent records, followed by N individual queries to fetch children of each parent",
          "A syntax error in JPQL where N and 1 are mismatched",
          "When database connection pools exceed maximum capacity by 1"
        ],
        "correctIndex": 1,
        "explanation": "When fetching N parent records with lazy relationships, accessing the children inside a loop triggers N additional database trips."
      }
    ],
    "project": false
  },
  "week-20": {
    "lessons": [
      {
        "title": "Spring Security & Stateless JWT Authentication",
        "language": "java",
        "starterCode": "public class JWTSecurityConcept {\n    public static void main(String[] args) {\n        System.out.println(\"JWT consists of Header.Payload.Signature and provides stateless authentication.\");\n    }\n}",
        "content": "\n<h2>Stateless Security with JWT</h2>\n<p>Traditional web applications store session IDs in server memory. In microservices and modern APIs, we use <strong>JSON Web Tokens (JWT)</strong>:</p>\n<ol>\n  <li>User sends login credentials (username + password).</li>\n  <li>Server validates credentials against BCrypt hashed database password.</li>\n  <li>Server signs a cryptographically secure JWT containing user claims and roles.</li>\n  <li>Client passes this token in the <code>Authorization: Bearer &lt;token&gt;</code> header on every subsequent HTTP request.</li>\n  <li>Server validates signature in a <code>OncePerRequestFilter</code> without needing a database session lookup.</li>\n</ol>\n"
      },
      {
        "title": "Testing in Spring Boot: MockMvc & @DataJpaTest",
        "language": "java",
        "starterCode": "public class TestingConcept {\n    public static void main(String[] args) {\n        System.out.println(\"@WebMvcTest tests controllers in isolation with MockMvc; @DataJpaTest tests repositories.\");\n    }\n}",
        "content": "\n<h2>Testing Strategies</h2>\n<ul>\n  <li><code>@WebMvcTest</code>: Loads only web controllers, allowing you to test HTTP routing, validation, and JSON serialization with <code>MockMvc</code> without booting the full application context.</li>\n  <li><code>@DataJpaTest</code>: Configures an in-memory database and tests repository queries and transactions in isolation.</li>\n  <li><code>@SpringBootTest</code>: Full integration test bringing up the entire application stack.</li>\n</ul>\n"
      },
      {
        "title": "Role-Based Access Control (RBAC) & Method Security (@PreAuthorize)",
        "language": "java",
        "starterCode": "import org.springframework.security.access.prepost.PreAuthorize;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping(\"/api/admin\")\npublic class AdminController {\n    @PreAuthorize(\"hasRole('ADMIN')\")\n    @DeleteMapping(\"/users/{id}\")\n    public void terminateAccount(@PathVariable Long id) {\n        adminService.deleteAccount(id);\n    }\n}",
        "content": "\n<h2>⚡ Chapter 3: Role-Based Access Control & Method Security</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Enable @EnableMethodSecurity to enforce fine-grained SpEL authorization checks directly on service and controller methods!</em>\n</div>\n"
      },
      {
        "title": "Integration Testing with Testcontainers & Real PostgreSQL",
        "language": "java",
        "starterCode": "import org.junit.jupiter.api.Test;\nimport org.springframework.boot.test.context.SpringBootTest;\nimport org.testcontainers.containers.PostgreSQLContainer;\nimport org.testcontainers.junit.jupiter.Container;\nimport org.testcontainers.junit.jupiter.Testcontainers;\n\n@SpringBootTest\n@Testcontainers\nclass HeroRepositoryTest {\n    @Container\n    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(\"postgres:16-alpine\");\n\n    @Test\n    void shouldPersistAndRetrieveHero() {\n        // Runs against real disposable Dockerized PostgreSQL container!\n    }\n}",
        "content": "\n<h2>⚡ Chapter 4: Integration Testing with Testcontainers</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>H2 in-memory databases hide PostgreSQL-specific syntax and concurrency bugs. Testcontainers boots real disposable Docker PostgreSQL instances for bulletproof CI/CD tests!</em>\n</div>\n"
      },
      {
        "title": "Production Actuator, Health Checks & Prometheus Metrics",
        "language": "java",
        "starterCode": "# application.yml Actuator configuration\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: \"health,info,metrics,prometheus\"\n  endpoint:\n    health:\n      show-details: always\n",
        "content": "\n<h2>⚡ Chapter 5: Spring Boot Actuator & Prometheus Metrics</h2>\n\n<div class=\"callout callout--quest\">\n  <strong>⚔️ SPRING ENGINE:</strong> <em>Expose production telemetry at /actuator/prometheus for Grafana dashboards, and configure Kubernetes liveness and readiness health probes!</em>\n</div>\n"
      }
    ],
    "exercises": [
      {
        "title": "Authorization Header Format Verification",
        "language": "java",
        "starterCode": "public class AuthHeaderExercise {\n    public static String buildAuthHeader(String token) {\n        return \"Bearer \" + token;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(buildAuthHeader(\"eyJhbGciOiJIUzI1NiJ9\"));\n    }\n}",
        "expectedOutput": "Bearer eyJhbGciOiJIUzI1NiJ9",
        "description": "\n<h2>Exercise: HTTP Authorization Header</h2>\n<p>Construct the standard HTTP Bearer token string.</p>\n",
        "hints": [
          "The standard prefix is \"Bearer \" followed by the raw token."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Why should passwords NEVER be stored using plain MD5 or SHA-256?",
        "options": [
          "They take up too many bytes in PostgreSQL",
          "MD5 and SHA-256 are fast hash functions vulnerable to GPU brute-forcing and rainbow tables; adaptive algorithms like BCrypt or Argon2 are required",
          "Spring Security only supports plaintext",
          "JSON cannot serialize SHA-256 hashes"
        ],
        "correctIndex": 1,
        "explanation": "BCrypt includes an adjustable work factor (salt + multiple rounds of key stretching) that makes GPU brute-forcing computationally prohibitive."
      }
    ],
    "project": {
      "title": "Production Spring Boot REST API for Hero Guilds",
      "description": "\n<h2>Project: Production Spring Boot REST Backend</h2>\n<p>Build a production-grade Spring Boot REST API featuring a layered architecture (Controller -> Service -> Repository), Spring Data JPA entity relationships, DTO validation, and global error handling with <code>@RestControllerAdvice</code>.</p>\n",
      "language": "java",
      "starterCode": "public class GuildBackendApplication {\n    public static void main(String[] args) {\n        System.out.println(\"⚔️ Spring Boot Enterprise Guild Backend online!\");\n    }\n}",
      "requirements": [
        "Expose CRUD REST endpoints for Guilds and Adventurers with proper HTTP status codes",
        "Map a One-to-Many relationship between Guild and Adventurers using JPA and Hibernate",
        "Validate incoming DTOs using @Valid (@NotBlank, @Min, @Size)",
        "Implement global exception handling using @RestControllerAdvice returning structured API error responses"
      ]
    }
  }
};
