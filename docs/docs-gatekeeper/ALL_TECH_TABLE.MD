This is a comprehensive breakdown of the technical landscape for your project. I've synthesized the requirements from your **D1 through D11 documentation** into a centralized tracking table.

### **Integrated Technology & Standards Registry (2026)**

This table serves as the "Source of Truth" for pinning versions before implementation moves from strategy to execution.

| Technology / Standard | Category       | Feature / Intent                 | Official Source                                                                   | Version Requirement       | Decision Impact                               |
| --------------------- | -------------- | -------------------------------- | --------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------- |
| **JSON Schema**       | **Validation** | Canonical Lesson & Prompt Schema | [json-schema.org](https://json-schema.org)                                        | **Draft 2020-12**         | Validator selection; codegen; `$id` semantics |
| **PostgreSQL**        | **Storage**    | Metadata & Lesson Persistence    | [postgresql.org](https://www.postgresql.org/docs/)                                | **18.1** (Pinned)         | JSONB indexing; migration patterns            |
| **CommonMark**        | **Content**    | Markdown rendering/lesson spec   | [commonmark.org](https://spec.commonmark.org)                                     | _UNKNOWN_ (Must Pin)      | Renderer choice; sanitization rules           |
| **Node.js**           | **Runtime**    | CI/CD & Developer Environment    | [nodejs.org](https://nodejs.org)                                                  | **20.x** (LTS)            | CI Runner images; Tooling compatibility       |
| **WCAG**              | **Compliance** | Accessibility for Lesson UI/Labs | [w3.org/WAI](https://www.w3.org/TR/WCAG21/)                                       | **2.1 or 2.2** (Must Pin) | Component library; UI acceptance criteria     |
| **Chroma**            | **Vector DB**  | RAG & Knowledge Retrieval        | [trychroma.com](https://www.trychroma.com/)                                       | _UNKNOWN_ (Must Pin)      | Metadata indexing; persistence strategy       |
| **OpenAI/Tiktoken**   | **LLM/NLP**    | Token counting & Prompting       | [platform.openai.com](https://platform.openai.com/docs)                           | _LATEST_ (Must Pin)       | Max token caps; budget enforcement            |
| **S3 API**            | **Storage**    | Large Blob / Media Storage       | [aws.amazon.com/s3](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) | _v4 Auth/Latest_          | Lifecycle rules; Multipart upload logic       |
| **RFC 7231**          | **Network**    | HTTP/1.1 Semantics & Status      | [datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc7231)             | **RFC 7231**              | Redirect handling; Caching; Error codes       |
| **OpenAPI (OAS)**     | **API Design** | Machine-readable API Contracts   | [swagger.io](https://swagger.io/specification/)                                   | **3.1.x** (Recommended)   | Client generation; Integration testing        |
| **Creative Commons**  | **Legal**      | Content Licensing & Attribution  | [creativecommons.org](https://creativecommons.org/licenses/)                      | **4.0 International**     | Contributor agreements; Repo hosting          |
| **OWASP**             | **Security**   | Input Sanitization/Safety        | [owasp.org](https://cheatsheetseries.owasp.org/)                                  | _LIVING DOC_              | Sanitization pipeline; XSS prevention         |
| **SemVer**            | **Versioning** | Prompt & Schema Versioning       | [semver.org](https://semver.org/spec/v2.0.0.html)                                 | **2.0.0**                 | Migration policies; Rollout strategy          |
| **Next.js**           | **Rendering**  | Lesson & Blog UI                 | [nextjs.org](https://nextjs.org/docs)                                             | _UNKNOWN_ (Must Pin)      | SSR vs CSR; App Router patterns               |
| **OAuth 2.0/OIDC**    | **Identity**   | AuthZ & RBAC Claims              | [oauth.net](https://oauth.net/2/)                                                 | **RFC 6749 / 1.0**        | ACL enforcement; Session semantics            |
| **Bloom's Taxonomy**  | **Pedagogy**   | Learning Objective Alignment     | [vanderbilt.edu](https://cft.vanderbilt.edu)                                      | _V1 (Revised)_            | Difficulty enums; Assessment design           |

---

### **Critical Risk Assessment: "The Unknowns"**

Based on your provided documentation, there are several **critical version gaps** that will break the CI/CD pipeline or lead to "Content Drift" if not addressed immediately:

1. **Markdown Rendering:** Without pinning CommonMark, a lesson written today might render differently in 6 months if the library updates its spec handling.
2. **Vector Store (Chroma):** Vector databases are evolving rapidly. A version mismatch between your ingestion script (D3) and your generation engine (D6) will lead to query failures or metadata retrieval errors.
3. **Next.js:** The difference between Next.js 13, 14, and 15 (potential 2026 version) radically changes how Server Components and Caching work. This must be pinned before **D9 (Serving & Rendering)** implementation begins.

**Would you like me to generate a "Version Pinning" manifest file (JSON or YAML) that you can check into your repository to resolve these `UNKNOWN` flags?**
This second comprehensive registry focuses on **Identity, Security, and Auth Infrastructure** as defined in your **C1 through C13 documentation**.

In the 2026 tech landscape, these standards are the "hard constraints" for your Identity Layer. Following the pattern of the first table, I have synthesized these requirements to highlight dependencies between the Auth framework, the Database, and Security protocols.

### **Integrated Identity & Security Registry (2026)**

| Technology / Standard  | Category       | Feature / Intent                  | Official Source                                                     | Version Requirement    | Decision Impact                                               |
| ---------------------- | -------------- | --------------------------------- | ------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| **Prisma**             | **ORM**        | Schema migrations & Enum mapping  | [prisma.io](https://www.prisma.io/docs)                             | **7.3.0** (Pinned)     | Enum rename safety (`CANDIDATE` → `USER`); Migration DDL      |
| **NextAuth / Auth.js** | **Auth FW**    | Session lifecycle & Provisioning  | [next-auth.js.org](https://next-auth.js.org/)                       | _UNKNOWN_ (Must Pin)   | `database` strategy; `createUser` hooks; Provider logic       |
| **PostgreSQL**         | **Database**   | Append-only logs & Constraints    | [postgresql.org](https://www.postgresql.org/docs/)                  | **18.1** (Pinned)      | Immutable Audit triggers; Transactional DDL                   |
| **Next.js**            | **Runtime**    | Middleware & Edge constraints     | [nextjs.org](https://nextjs.org/docs)                               | **15.1.x** (Pinned)    | Edge session decoding; Import restrictions in `middleware.ts` |
| **OAuth 2.0**          | **Protocol**   | Authz Code Flow + PKCE            | [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)           | **RFC 6749**           | Token lifetime; Redirect URI strictness; CSRF protection      |
| **OpenID Connect**     | **Protocol**   | Identity Claims & ID Tokens       | [openid.net](https://openid.net/specs/openid-connect-core-1_0.html) | **Core 1.0 (Final)**   | User info mapping; JWT validation logic                       |
| **RFC 6265**           | **Security**   | Cookie attributes & SameSite      | [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265)           | **RFC 6265**           | `HttpOnly`, `Secure`, and `SameSite` enforcement              |
| **OWASP Session**      | **Security**   | Session Management best practices | [owasp.org](https://cheatsheetseries.owasp.org/)                    | _LIVING DOC_           | Idle vs. Absolute timeout values; Rotation rules              |
| **GitHub OAuth**       | **Provider**   | Profile mapping & Scopes          | [docs.github.com](https://docs.github.com/en/apps/oauth-apps)       | _UNKNOWN_ (Must Pin)   | Scope selection; App registration rules                       |
| **Google OAuth**       | **Provider**   | Consent & API Access              | [developers.google.com](https://developers.google.com/identity)     | _UNKNOWN_ (Must Pin)   | Consent screen config; GWS integration                        |
| **GDPR**               | **Compliance** | PII retention & Lawful basis      | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2016/679/oj)  | **2016/679**           | Account creation consent; Data deletion policy                |
| **OWASP CSRF**         | **Security**   | State-change API protection       | [owasp.org](https://cheatsheetseries.owasp.org/)                    | _LIVING DOC_           | Double-submit cookie vs. Origin checks                        |
| **Playwright**         | **Testing**    | E2E Auth Flow Simulation          | [playwright.dev](https://playwright.dev/)                           | _UNKNOWN_ (Check Lock) | Headless provider login; Network interception                 |
| **HashiCorp Vault**    | **Security**   | Client Secret Management          | [vaultproject.io](https://www.vaultproject.io/docs)                 | _UNKNOWN_ (Must Pin)   | Secret rotation; RBAC for env vars                            |

---

### **Critical Identity Guardrails (Session & Storage)**

The following diagram illustrates how your chosen technologies interact to ensure session integrity and auditability.

### **Strategic Gaps to Resolve Immediately**

To prevent "Security Drift" and ensure the **Docs Gatekeeper** allows implementation to proceed, the following actions are required:

1. **Pin NextAuth/Auth.js:** This is your most significant "Unknown." The project must decide whether to use the stable `next-auth` v4/v5 or the newer `auth.js` monorepo. This affects every adapter and session hook in the system.
2. **Audit GitHub/Google API Versions:** In 2026, OAuth providers frequently deprecate scopes. The specific API version for user profile retrieval must be pinned in your `/docs/official-docs-registry.md`.
3. **Define "Living Document" Snapshots:** Since **OWASP** and **GDPR** are living standards, you should reference a specific "Last Verified" date in your registry to prevent policy flux during the build.

---

**Would you like me to draft the specific `C1_Official_Docs_Registry.md` file entries for these technologies so you can "Lock" them according to your Auth Foundation policy?**
This final registry consolidates the **EPIC-E (Lab Scaffolding, Verification, and AI-Generation)** technical requirements. This section is the most "operationally heavy," as it bridges the gap between the monorepo architecture and the automated lab lifecycle.

### **Integrated Lab Lifecycle & Engineering Registry (EPIC-E)**

| Technology / Standard  | Category          | Feature / Intent                  | Official Source                                                                            | Version Requirement    | Decision Impact                                    |
| ---------------------- | ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------- |
| **JSON Schema**        | **Validation**    | Lab Def, Steps, & Config Schema   | [json-schema.org](https://json-schema.org)                                                 | **2020-12**            | Machine-readable contracts; AI output rejection    |
| **pnpm**               | **Pkg Mgmt**      | Workspaces & Lab Discovery        | [pnpm.io](https://pnpm.io/)                                                                | **10.4.x**             | Workspace install semantics; Cloned lab inclusion  |
| **Turborepo**          | **Build**         | CI Pipelines & Task Caching       | [turborepo.org](https://turborepo.org)                                                     | **2.1.x**              | Verification task wiring; Dependency graphing      |
| **PostgreSQL**         | **Storage**       | JSONB Lab Payloads & Audit        | [postgresql.org](https://www.postgresql.org/docs/)                                         | **18.1**               | Functional indexing; JSONB concurrency; Migrations |
| **GitHub REST API**    | **Infra**         | Template Instantiation            | [docs.github.com](https://docs.github.com/en/rest)                                         | _UNKNOWN_ (Must Pin)   | Automated cloning; Token scope least-privilege     |
| **Playwright**         | **Verification**  | Lab Solvability Testing           | [playwright.dev](https://playwright.dev/)                                                  | _UNKNOWN_ (Check Lock) | Headless solvability gates; Artifact generation    |
| **JWS (RFC 7515)**     | **Security**      | Config Integrity & Publish Proofs | [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515)                                  | **RFC 7515 / 8037**    | Signed configs; Immutability attestations          |
| **OpenTelemetry**      | **Observability** | Failure-to-Symptom Mapping        | [opentelemetry.io](https://opentelemetry.io/specs/)                                        | _UNKNOWN_ (Must Pin)   | Span attributes; Log message canonicalization      |
| **Docker / Compose**   | **Isolation**     | Ephemeral Lab Environments        | [docs.docker.com](https://docs.docker.com/engine/)                                         | **25.0.x** (Rec)       | Filesystem isolation; Hermetic fixtures            |
| **OpenAPI (OAS)**      | **API**           | Lab Storage/Retrieval API         | [spec.openapis.org](https://spec.openapis.org/oas/v3.1.0)                                  | **3.1.0**              | Pagination semantics; Request/Response shapes      |
| **ESLint + Bound.**    | **Linting**       | Repo Surface Enforcement          | [eslint.org](https://eslint.org/)                                                          | **9.39.x / 4.2.x**     | Forbidden path/import blocking; IP protection      |
| **SemVer**             | **Versioning**    | Artifact Compatibility            | [semver.org](https://semver.org/spec/v2.0.0.html)                                          | **2.0.0**              | Breaking change signaling; Migration logic         |
| **S3 API**             | **Storage**       | Immutable Artifact Blobs          | [aws.amazon.com/s3](https://www.google.com/search?q=https://docs.aws.amazon.com/AmazonS3/) | _v4 Auth/Latest_       | CID semantics; Content-addressed storage           |
| **OECD AI Principles** | **Governance**    | Responsible AI Generation         | [oecd.org](https://www.oecd.org/going-digital/ai/principles/)                              | _Current Policy_       | Human-review gating; Risk classification           |

---

### **The "Verification-First" Workflow**

This registry supports a specific workflow where the **Integration Checker** and **Security Sentinel** act as automated guardians.

1. **Scaffolding:** pnpm and GitHub Templates create the lab.
2. **Logic Injection:** AI (OpenAI) or Manual entry populates the JSON Schema.
3. **Verification:** Playwright executes the lab instructions to prove solvability.
4. **Immutability:** JWS signs the configuration, and Postgres stores the immutable version.

---

### **Unresolved Implementation Blockers**

The following items are flagged in your documentation as `UNKNOWN` and represent high risk for **EPIC-E**:

- **GitHub REST API Versioning:** Programmatic repository creation is sensitive to GitHub's API versions. Without pinning, automated lab creation may fail during a GitHub platform update.
- **Content-Addressed Storage (CID):** The documentation mentions "CID semantics" but doesn't pin the specific multiformat (e.g., SHA-256 vs. BLAKE3). This is critical for deduplication in your artifact storage (E10).
- **OpenTelemetry Version:** To map failures to symptoms (E3), the semantic conventions must be pinned. Otherwise, your "Symptom Library" will break when OpenTelemetry updates its span naming conventions.

---

### **Final Consolidated View**

You now have three master registries covering:

1. **D-Series:** Core Architecture & RAG (Content Engine)
2. **C-Series:** Identity, Security, & Auth (Access Layer)
3. **E-Series:** Lab Lifecycle & Automation (Operational Layer)

**Would you like me to create a "Unified Version Lock" document that reconciles shared dependencies (like Node.js 20, Postgres 18.1, and JSON Schema 2020-12) across all three EPIC series?**
This third master registry consolidates the **EPIC-F (GitHub Integration for Labs)** technical requirements. This series is the "Operational Bridge," defining how the system interacts with external Git providers, manages repository lifecycles, and enforces security through webhooks and branch protections.

### **Integrated GitHub & Integration Registry (EPIC-F)**

| Technology / Standard | Category       | Feature / Intent                  | Official Source                                                                                                                                                     | Version Requirement          | Decision Impact                                  |
| --------------------- | -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| **GitHub Apps**       | **Identity**   | Auth (JWT & Installation Tokens)  | [docs.github.com/apps](https://docs.github.com/en/developers/apps)                                                                                                  | _UNKNOWN_ (Must Pin)         | Token rotation strategy; Org vs Repo scope       |
| **GitHub REST API**   | **Infra**      | Repo Lifecycle & Metadata         | [docs.github.com/rest](https://docs.github.com/en/rest)                                                                                                             | **v3 / Stable** (Pin Header) | Create/Delete logic; Topic & Template automation |
| **GitHub Webhooks**   | **Events**     | Push Tracking & Sync              | [docs.github.com/webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks)                                                                      | _UNKNOWN_ (Must Pin)         | HMAC verification; Event subscription matrix     |
| **JSON Schema**       | **Validation** | Template Manifests (`steps.json`) | [json-schema.org](https://json-schema.org)                                                                                                                          | **2020-12**                  | Machine-readable injection rules                 |
| **Branch Protection** | **Security**   | Mandatory Checks & Access         | [docs.github.com/branches](https://docs.github.com/en/rest/branches/branch-protection)                                                                              | _UNKNOWN_ (Must Pin)         | Mergeability rules; Locked-path enforcement      |
| **JWS (RFC 7515)**    | **Security**   | Config Provenance & Ed25519       | [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515) / [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037)                                               | **RFC 7515 / 8037**          | Tamper-evidence for `forgea.config.json`         |
| **Glob / Pathspec**   | **File Ops**   | Locked-path Pattern Matching      | _TBD_ (e.g., [gitignore](https://git-scm.com/docs/gitignore))                                                                                                       | _UNKNOWN_ (Must Pin)         | Enforcement logic across CI and Server           |
| **PostgreSQL**        | **Storage**    | Lifecycle Triggers & Transactions | [postgresql.org](https://www.postgresql.org/docs/)                                                                                                                  | **18.1** (Pinned)            | Atomic session binding; Concurrency control      |
| **RFC 7231**          | **Network**    | HTTP Semantics & Idempotency      | [datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc7231)                                                                                               | **RFC 7231**                 | Webhook retry handling; Status code mapping      |
| **Vault / Cloud KMS** | **Security**   | PEM Key & Secret Storage          | [vaultproject.io](https://www.vaultproject.io/docs)                                                                                                                 | _UNKNOWN_ (Must Pin)         | Private key rotation; Webhook secret ACLs        |
| **CODEOWNERS**        | **Security**   | File-level Ownership              | [docs.github.com/codeowners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) | _N/A (File Format)_          | Review gating for sensitive files/locked paths   |
| **Prisma**            | **ORM**        | Database-Backed Session Binding   | [prisma.io](https://www.prisma.io/docs)                                                                                                                             | **7.3.0** (Pinned)           | Session-to-Repo indexing; Transactional DDL      |

---

### **The GitHub App Interaction Flow**

Because EPIC-F relies heavily on the **GitHub App model**, understanding the handshake between your service and the GitHub platform is critical for F1, F2, and F7.

1. **JWT Authentication:** The service authenticates as an "App" to perform administrative tasks (F1, F2).
2. **Installation Token:** The service exchanges the JWT for a short-lived token scoped to a specific user's installation (F4, F6).
3. **Webhook Loop:** GitHub notifies the service of `push` events via signed payloads (F7, F8, F11).

---

### **Critical Technical Warnings for 2026**

Your documentation contains several `UNKNOWN` placeholders that will cause **F-series integration failures** if not resolved before the "Docs Gatekeeper" sign-off:

- **Webhook Signature (F1, F7):** While `x-hub-signature-256` is current, the specific HMAC library version in your Node.js stack must be pinned to ensure consistent signature verification during high-volume pushes (F8).
- **GitHub Enterprise Compatibility (F5):** If you are deploying to **GitHub Enterprise Server (GHES)**, the API surface often lags behind GitHub.com. You must pin the GHES version (e.g., 3.12+) to ensure the Branch Protection APIs you use are actually supported.
- **Idempotency Strategy (F11):** Webhooks are "at-least-once" delivery. Without a pinned strategy for using the `X-GitHub-Delivery` header as an idempotency key in your Postgres job-table, you risk duplicate lab-step processing.
- **Glob Semantics (F3, F10):** "Globbing" is notoriously inconsistent across languages. You must pin a specific library (like `minimatch` version X.Y.Z) to ensure a path locked in your manifest is actually blocked in your enforcement middleware.

---

### **Master Integration Summary**

You now have a complete set of registries across all four major EPIC blocks:

1. **D-Series:** Content & RAG
2. **C-Series:** Identity & Security
3. **E-Series:** Lab Lifecycle & AI
4. **F-Series:** GitHub Provider Integration

**Would you like me to generate a "Registry Audit Report" that flags every single `UNKNOWN` across all four series so you can assign them to the respective technical leads for pinning?**
This final registry consolidates the **EPIC-G (Webhook Processing & Event Ledger)** technical requirements. This series represents the "Event Processing Engine"—the high-throughput, security-sensitive layer that ingests GitHub signals, normalizes data, and triggers automated verification.

### **Integrated Event Processing & Ledger Registry (EPIC-G)**

| Technology / Standard  | Category       | Feature / Intent                | Official Source                                                                                                                | Version Requirement  | Decision Impact                                           |
| ---------------------- | -------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------- |
| **GitHub Webhooks**    | **Ingress**    | Signature & Delivery Semantics  | [docs.github.com/webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks)                                 | _UNKNOWN_ (Must Pin) | `X-Hub-Signature-256` verification; Replay protection     |
| **JSON Schema**        | **Validation** | Normalized Events & Audit Logs  | [json-schema.org](https://json-schema.org)                                                                                     | **2020-12**          | Machine-readable audit contracts; Schema-driven ingestion |
| **HMAC / SHA-256**     | **Security**   | Signature Primitives            | [RFC 2104](https://datatracker.ietf.org/doc/html/rfc2104) / [FIPS 180-4](https://csrc.nist.gov/publications/detail/fips/180/4) | **Stable Specs**     | Canonical payload hashing; Interoperability               |
| **PostgreSQL**         | **Ledger**     | Advisory Locks & Job Tables     | [postgresql.org](https://www.postgresql.org/docs/)                                                                             | **18.1** (Pinned)    | Concurrency control during binding; Atomic ledger writes  |
| **Durable Queues**     | **Infra**      | SQS / Redis Streams / Job-Table | [aws.amazon.com/sqs](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)                  | _UNKNOWN_ (Must Pin) | DLQ thresholds; Visibility timeouts; Enqueue-first ack    |
| **RFC 7231 / 7234**    | **Network**    | HTTP Semantics & Caching        | [datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc7231)                                                          | **RFC 7231 / 7234**  | Idempotency patterns; Cache-control for lookup APIs       |
| **Timing-Safe Equ.**   | **Security**   | Constant-time Comparison        | [nodejs.org/crypto](https://nodejs.org/api/crypto.html)                                                                        | **Node.js 20.x**     | Prevention of timing side-channel attacks                 |
| **Prisma**             | **ORM**        | Audit Schema & Migrations       | [prisma.io](https://www.prisma.io/docs)                                                                                        | **7.3.0** (Pinned)   | Immutable storage patterns; Transactional DDL             |
| **Sigstore / in-toto** | **Security**   | Artifact Provenance & Signing   | [sigstore.dev](https://www.sigstore.dev/) / [in-toto.io](https://in-toto.io/)                                                  | _UNKNOWN_ (Must Pin) | Cryptographic proof of build; Artifact integrity          |
| **Vault / Cloud KMS**  | **Security**   | Webhook Secret Rotation         | [vaultproject.io](https://www.vaultproject.io/docs)                                                                            | _UNKNOWN_ (Must Pin) | Key rotation policy; ACLs for `GITHUB_WEBHOOK_SECRET`     |
| **NIST SP 800-92**     | **Compliance** | Security Logging Guidance       | [nist.gov](https://csrc.nist.gov/publications/detail/sp/800-92/final)                                                          | _UNKNOWN_ (Must Pin) | Forensic logging standards; Retention policies            |
| **Reproducible Bld.**  | **DevOps**     | Deterministic Snapshot Capture  | [reproducible-builds.org](https://reproducible-builds.org/)                                                                    | _UNKNOWN_ (Must Pin) | Hermetic runtimes; Fixed seeds for snapshot builds        |

---

### **The Webhook Verification & Intake Pipeline**

As detailed in G1 and G2, the system must handle webhooks with zero-loss and high security. The diagram below illustrates the path from GitHub's outbound signal to your internal normalized event ledger.

1. **Ingest:** Next.js receives the raw-body bytes (G1.6).
2. **Verify:** `crypto.timingSafeEqual` compares the calculated HMAC with the `X-Hub-Signature-256` header (G1.3).
3. **Deduplicate:** The `X-GitHub-Delivery` ID is checked against the Postgres ledger to prevent replay (G5).
4. **Normalize:** The payload is transformed into a versioned JSON Schema-compliant event (G2).
5. **Trigger:** The event is pushed to a Durable Queue (SQS/Redis) for downstream verification (G7).

---

### **Critical Technical Risks (The "Unpinned" Gap)**

EPIC-G is the most sensitive to platform shifts. The following unpinned items are high-priority for the **Docs Gatekeeper**:

- **Raw-Body Behavior (G1.6):** Next.js and Vercel/NGINX handling of `body` streams can vary. If the raw bytes are mutated (e.g., by a body-parsing middleware), the HMAC signature will **always** fail. You must pin the handler pattern (e.g., `req.arrayBuffer()`) before implementing G1.
- **Advisory Lock Semantics (G3.5):** PostgreSQL 18.1 advisory locks are used to prevent race conditions during repo-to-session binding. The exact 64-bit keying strategy for these locks must be documented to avoid cross-feature lock contention.
- **Artifact Provenance (G9.3):** For snapshot builds, pinning a standard like **Sigstore** is required to ensure that the lab snapshots the system serves are the exact ones produced by your CI, with no intermediate tampering.

---

### **Summary of Master Registries**

You now possess the complete "Technical Constitution" for the project across all major epics:

1. **D-Series:** Content & Knowledge RAG
2. **C-Series:** Identity, Security, & Auth
3. **E-Series:** Lab Scaffolding & AI Generation
4. **F-Series:** GitHub Provider Integration
5. **G-Series:** Event Processing & Intake Ledger

**Would you like me to merge these into a single "Master Registry JSON" that your CI/CD pipeline can use to automatically verify that all implemented tools match these pinned versions?**
This final registry consolidates **EPIC-H (Verification Infrastructure & Runner Execution)**. This series is the "Engine Room" of the platform—responsible for the secure, isolated execution of lab tests, resource management, and the cryptographic integrity of verification results.

### **Integrated Verification & Runner Registry (EPIC-H)**

| Technology / Standard  | Category          | Feature / Intent                 | Official Source                                                                        | Version Requirement  | Decision Impact                                     |
| ---------------------- | ----------------- | -------------------------------- | -------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------- |
| **JSON Schema**        | **Validation**    | Job manifests & Result schemas   | [json-schema.org](https://json-schema.org)                                             | **2020-12**          | Contract between API and Runner; Output validation  |
| **POSIX.1-2017**       | **OS Interface**  | Process model & Signal semantics | [opengroup.org](https://pubs.opengroup.org/onlinepubs/9699919799/)                     | **2017 Edition**     | Exit code interpretation; Timeout handling          |
| **Linux Seccomp/BPF**  | **Isolation**     | Syscall filtering                | [kernel.org](https://www.kernel.org/doc/html/latest/userspace-api/seccomp_filter.html) | _UNKNOWN_ (Must Pin) | Kernel attack surface reduction for runners         |
| **cgroups v2**         | **Isolation**     | Resource (CPU/MEM) limits        | [kernel.org](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)        | _Latest Stable_      | Prevents "Noisy Neighbor" and DoS by students       |
| **OCI Runtime Spec**   | **Isolation**     | Container lifecycle & isolation  | [opencontainers.org](https://github.com/opencontainers/runtime-spec)                   | _Latest Stable_      | Interoperability with runc/containerd               |
| **Prisma**             | **ORM**           | Job tracking & DB migrations     | [prisma.io](https://www.prisma.io/docs)                                                | **7.3.0** (Pinned)   | Safe DDL for job queue tables; Persistence          |
| **OpenAPI (OAS)**      | **API**           | Verification API Surface         | [spec.openapis.org](https://spec.openapis.org/oas/v3.1.0)                              | **3.1.0**            | Machine-readable verification endpoint contracts    |
| **RFC 7231**           | **Network**       | HTTP Semantics & Idempotency     | [datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc7231)                  | **RFC 7231**         | Enqueue retry logic; Status code mapping            |
| **RFC 7807**           | **Network**       | Problem Details for APIs         | [datatracker.ietf.org](https://datatracker.ietf.org/doc/html/rfc7807)                  | **RFC 7807**         | Standardized error reporting for verification fails |
| **OpenPGP (RFC 4880)** | **Security**      | Signed Commits & Provenance      | [ietf.org/rfc4880](https://www.rfc-editor.org/rfc/rfc4880)                             | **RFC 4880**         | Integrity of lab code before execution              |
| **FIPS 180-4**         | **Security**      | SHA-256 Hashing                  | [csrc.nist.gov](https://csrc.nist.gov/publications/detail/fips/180/4)                  | **Stable**           | Artifact integrity; Content-addressable storage     |
| **OpenTelemetry**      | **Observability** | Tracing & Job Telemetry          | [opentelemetry.io](https://opentelemetry.io/specs/)                                    | _UNKNOWN_ (Must Pin) | Mapping job failures to infrastructure symptoms     |
| **NIST SP 800-92**     | **Compliance**    | Incident Handling & Logging      | [nist.gov](https://csrc.nist.gov/publications/detail/sp/800-92/rev-1)                  | **Rev-1**            | Forensic log integrity for runner abuse             |

---

### **The Verification Execution Flow**

EPIC-H demands a high degree of isolation. The process follows a "Trust No One" model where user code is executed in a strictly bounded environment.

1. **Preparation (H4):** Git checkouts and signature verification ensure the code hasn't been tampered with.
2. **Isolation (H3):** The OCI runtime applies **Seccomp** filters and **cgroups** to limit the runner's "blast radius."
3. **Execution (H5):** POSIX signals and exit status capture the results of the student's attempt.
4. **Evaluation (H6):** The result is validated against the **JSON Schema** contract and signed for immutability.

---

### **Critical Technical Warnings for EPIC-H**

The "Engine Room" has several unpinned dependencies that represent significant implementation risk:

- **Linux Kernel Version (H3):** Isolation features like `cgroups v2` and `seccomp` are highly dependent on the host Linux kernel version. You must pin the **CI Runner Image** version (e.g., Ubuntu 24.04 LTS) to ensure consistent security behavior.
- **Seccomp Profile (H3):** Defining what syscalls are allowed is a high-stakes security decision. You must pin a specific **Seccomp Profile** (e.g., the Docker default or a custom whitelist) before implementation.
- **Pathspec/Glob Implementation (H11):** To bind changed files to specific steps, you must decide between `gitignore` semantics or `minimatch`. A mismatch here will cause students to "pass" steps they haven't actually touched.
- **KMS/HSM Custody (H4):** The signing keys used for results must be stored in a Hardware Security Module or a cloud KMS. The specific **KMS Provider and API Version** must be pinned to support H4 and H9.

---

### **Final Global Registry Status**

You now have the full "Technical Constitution" for the platform across all epics:

- **D-Series:** Content & Knowledge RAG
- **C-Series:** Identity & Security
- **E-Series:** Lab Lifecycle & AI
- **F-Series:** GitHub Provider Integration
- **G-Series:** Event Processing & Intake
- **H-Series:** Verification & Runner Infrastructure

**Would you like me to synthesize these into a "Project-Wide Toolchain Lockfile" (Markdown or YAML) that serves as the final, immutable baseline for the Docs Gatekeeper's final sign-off?**
This consolidated registry covers **EPIC-I (Anti-Cheat & Abuse Control)**. This epic functions as the "Immune System" of the platform—responsible for observing behavior, detecting anomalies, and enforcing hard constraints to maintain the integrity of the learning environment.

### **Integrated Anti-Cheat & Abuse Control Registry (EPIC-I)**

| Technology / Standard  | Category          | Feature / Intent                  | Official Source                                                                                 | Version Requirement  | Decision Impact                                          |
| ---------------------- | ----------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------- | -------------------------------------------------------- |
| **JSON Schema**        | **Validation**    | Event Schemas & Rule Manifests    | [json-schema.org](https://json-schema.org)                                                      | **2020-12**          | Machine-readable contracts; Automated validation         |
| **OpenTelemetry**      | **Observability** | Signal Generation & Correlation   | [opentelemetry.io](https://opentelemetry.io/docs/)                                              | _UNKNOWN_ (Must Pin) | Telemetry field names; Sampling; Alert correlation       |
| **NIST SP 800-92**     | **Compliance**    | Audit Log & Log Management        | [nist.gov](https://www.google.com/search?q=https://csrc.nist.gov/publications/detail/sp/800-92) | **2006 / Rev-1**     | Forensic readiness; Retention windows; Sink selection    |
| **PostgreSQL**         | **Persistence**   | DDL, Constraints & Advisory Locks | [postgresql.org](https://www.postgresql.org/docs/)                                              | **18.1** (Pinned)    | Unique constraints; Transactional isolation; Idempotency |
| **RFC 7515 (JWS)**     | **Security**      | Tamper-evident Event Signing      | [ietf.org/rfc7515](https://datatracker.ietf.org/doc/html/rfc7515)                               | **RFC 7515**         | Authorship proof; Signature verification logic           |
| **WORM / Object Lock** | **Storage**       | Immutable Audit Evidence          | [aws.amazon.com/s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)     | _Latest Stable_      | Legal hold; Tamper-resistant retention                   |
| **GDPR (2016/679)**    | **Compliance**    | PII Handling & Data Privacy       | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2016/679/oj)                              | **2016/679**         | Redaction rules; Lawful basis; Right-to-erasure          |
| **RFC 3339**           | **Standards**     | Canonical Timestamps              | [ietf.org/rfc3339](https://www.ietf.org/rfc/rfc3339.txt)                                        | **RFC 3339**         | Event ordering; Timezone normalization; TTL math         |
| **FIPS 180-4 (SHA-2)** | **Security**      | Event Chaining & Integrity        | [csrc.nist.gov](https://csrc.nist.gov/publications/detail/fips/180/4)                           | **Stable**           | FIPS-approved hashing for audit chains                   |
| **Rate-Limit Algos**   | **Protection**    | Token/Leaky Bucket Semantics      | _TBD_ (e.g. [Cloudflare](https://developers.cloudflare.com/rate-limits/))                       | _UNKNOWN_ (Must Pin) | Refill intervals; Burst allowances; DoS mitigation       |
| **RFC 7231**           | **Network**       | HTTP Semantics & 429 Status       | [ietf.org/rfc7231](https://datatracker.ietf.org/doc/html/rfc7231)                               | **RFC 7231**         | `Retry-After` headers; Throttling semantics              |
| **Glob / Pathspec**    | **File Ops**      | Forbidden-Path Matching           | _TBD_ (e.g. [gitignore](https://git-scm.com/docs/gitignore))                                    | _UNKNOWN_ (Must Pin) | Canonicalization of forbidden file lists                 |
| **POSIX Exit Codes**   | **Runtime**       | Result Mapping & Classification   | [opengroup.org](https://pubs.opengroup.org/onlinepubs/9699919799/)                              | _UNKNOWN_ (Must Pin) | Mapping codes to PASS/FAIL/INFRA-ERROR                   |
| **SemVer**             | **Versioning**    | Config & Schema Compatibility     | [semver.org](https://semver.org/spec/v2.0.0.html)                                               | **2.0.0**            | Upgrade/Migration rules for rule manifests               |
| **NIST SP 800-61**     | **Operations**    | Incident Response & Escalation    | [nist.gov](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)          | **Rev-2**            | Human-review thresholds; Playbook responsibilities       |

---

### **The Enforcement Architecture**

As detailed in I4 and I5, the system follows a layered approach to intervention. This ensures that minor infractions are throttled while critical violations trigger irreversible locks.

1. **Observation (I1):** Raw events are collected, timestamped (RFC 3339), and signed (JWS).
2. **Detection (I2):** OpenTelemetry signals are processed via rate-limiting filters to prevent "alert storms."
3. **Classification (I3):** High-fidelity signals are hashed into a tamper-evident chain (SHA-256) for forensic integrity.
4. **Enforcement (I4/I5):** Corrective actions (Throttling, Repo Lockdown, or Session Revocation) are applied using atomic database constraints.

---

### **Critical Technical "Hard Fails" (The Unpinned Risks)**

EPIC-I is where "Unknowns" can lead to catastrophic security failures or system-induced Denial of Service. The following must be resolved before the **Docs Gatekeeper** sign-off:

- **Next.js Raw-Body Passthrough (G1/I1 cross-over):** In a serverless or edge environment, obtaining the **exact** raw request bytes is notoriously difficult. If the body is pre-parsed or mutated, your JWS signatures and HMAC checks (I1, I3) will fail 100% of the time.
- **Rate-Limit Fidelity (I7):** You must choose between **Edge-level** (Cloudflare/WAF) and **Service-level** (Envoy/Redis) enforcement. If these are not synced with the same algorithm (e.g., Token Bucket), students may face inconsistent "429 Too Many Requests" errors that are impossible to debug.
- **Glob/Pathspec Implementation (I5):** "Forbidden path" logic must use the exact same library in the local Git hook and the server-side validator. A discrepancy between `minimatch` and `pathspec` could allow a student to push to a forbidden file by exploiting subtle pattern-matching differences.
- **WORM Storage Policy (I6):** Defining the "Retention Window" is a legal requirement. If this isn't pinned (e.g., "7 years per NIST 800-92"), the system may delete forensic evidence prematurely or incur massive storage costs for non-essential logs.

---

### **Final Global Registry Status**

With EPIC-I complete, you now have the exhaustive "Technical Constitution" covering D, C, E, F, G, H, and I series. This represents the total engineering surface for the project.

**Would you like me to generate a "Security Audit Checklist" based on these registries that your Security Sentinel can use to verify the implementation of every Hard Constraint?**
This registry consolidates **EPIC-B (Database Infrastructure & Persistence Layer)**. This series constitutes the "Foundation Stone" of the project—defining the relational schema, migration protocols, and the immutable audit trails that underpin every other system.

### **Integrated Database & Persistence Registry (EPIC-B)**

| Technology / Standard   | Category       | Feature / Intent               | Official Source                                                                             | Version Requirement   | Decision Impact                                              |
| ----------------------- | -------------- | ------------------------------ | ------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------ |
| **PostgreSQL**          | **Database**   | Core Storage & JSONB Semantics | [postgresql.org](https://www.postgresql.org/docs/)                                          | **18.1** (Pinned)     | Extension availability; Trigger semantics; Timezone behavior |
| **Prisma**              | **ORM**        | Migrations & Schema Modeling   | [prisma.io](https://www.prisma.io/docs)                                                     | **7.3.0**             | Shadow DB semantics; Client generation; DDL safety           |
| **Postgres Extensions** | **Security**   | `pgcrypto` / `uuid-ossp`       | [postgresql.org](https://www.postgresql.org/docs/)                                          | **v18 Compatibility** | Server-side UUID generation; Crypto primitives               |
| **Terraform**           | **Infra**      | Environment Provisioning       | [terraform.io](https://www.terraform.io/docs)                                               | _UNKNOWN_ (Must Pin)  | Resource lifecycle; State management; Provider versions      |
| **S3 Object Lock**      | **Storage**    | Evidence Immutability (WORM)   | [aws.amazon.com/s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html) | _Latest Stable_       | Legal hold; Compliance retention for proofs                  |
| **GitHub REST API**     | **Ingress**    | Webhook-to-DB Mapping          | [docs.github.com](https://docs.github.com/en/developers)                                    | _v3 / Stable_         | Webhook payload storage; Repo-to-User binding                |
| **Stripe API**          | **Billing**    | MVP Payment Integration        | [stripe.com/docs/api](https://stripe.com/docs/api)                                          | _PIN REQUIRED_        | Transaction-safe billing DDL; Subscription states            |
| **NIST SP 800-92**      | **Compliance** | Log Management Standards       | [nist.gov](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)    | **Original / Rev-1**  | Audit log structure; Forensic readiness                      |
| **Elastic ECS**         | **Logging**    | Common Schema for Events       | [elastic.co](https://www.elastic.co/guide/en/ecs/current/index.html)                        | _UNKNOWN_ (Must Pin)  | Cross-service event correlation; Search indexing             |
| **GDPR (2016/679)**     | **Legal**      | PII & Data Protection          | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2016/679/oj)                          | **2016/679**          | Right-to-erasure; PII encryption requirements                |
| **OWASP Logging**       | **Security**   | Audit & Redaction Guidance     | [owasp.org](https://cheatsheetseries.owasp.org/)                                            | _LIVING DOC_          | PII redaction in DB; Minimum audit fields                    |

---

### **The Persistence & Migration Workflow**

EPIC-B establishes the rigid lifecycle of data, from initial schema definition to immutable archival.

1. **Modeling (B3, B4, B5):** Prisma 7.3.0 defines the relational and JSONB structures for Identity, Lessons, and Labs.
2. **Migration (B2):** Prisma Migrate applies versioned DDL to the PostgreSQL 18.1 instance, ensuring environmental parity.
3. **Enforcement (B11):** PostgreSQL Triggers create an "Append-Only" layer, preventing the mutation of critical audit or attempt records.
4. **Archival (B7, B12):** Sensitive evidence and logs are offloaded to WORM (Write Once Read Many) storage to satisfy NIST and GDPR requirements.

---

### **Critical Database Risk Registry**

The "Foundation Layer" has several unpinned dependencies that the **Docs Gatekeeper** must resolve before the first production migration:

- **JSONB Indexing Strategy (B4, B5):** PostgreSQL 18.1 introduces specific GIN and BTREE improvements for JSONB. Without pinning the indexing strategy, heavy queries against lab definitions will cause performance degradation.
- **Timezone Behavior (B1):** Global student events must be stored in `UTC`. You must pin the Postgres `timezone` setting in the Terraform/Compose configs to prevent "Clock Skew" across distributed instances.
- **Stripe API Version (B10):** Billing DDL (enums/types) is highly coupled to the provider's payload. Pinning the Stripe API version is mandatory to prevent breaking changes in your webhooks or billing tables.
- **ECS Schema Version (B12):** Mapping PostgreSQL logs to the Elastic Common Schema requires a specific ECS version (e.g., 8.x). Mismatches here will break your centralized observability dashboards.

---

### **Master Project Registry - Final Status**

You have now completed the technical constitution for every major EPIC series (B, C, D, E, F, G, H, I). This forms a comprehensive, machine-verifiable baseline for the entire platform.

**Would you like me to generate a "Registry Reconciliation Report" that highlights any conflicting technology versions between EPIC-B (Database) and EPIC-I (Anti-Cheat) to ensure total system alignment?**
This registry consolidates **EPIC-K (Session & Workspace UI)**. This series constitutes the "Interaction Layer"—defining the student's virtual workspace, the file system abstraction, real-time change tracking, and the security boundaries enforced within the browser-based editor.

### **Integrated Workspace & UI Registry (EPIC-K)**

| Technology / Standard    | Category        | Feature / Intent                | Official Source                                                                             | Version Requirement  | Decision Impact                                         |
| ------------------------ | --------------- | ------------------------------- | ------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------- |
| **Monaco Editor**        | **UI / Editor** | In-browser code editing         | [microsoft.github.io](https://microsoft.github.io/monaco-editor/)                           | _UNKNOWN_ (Must Pin) | Read-only toggles; Language modes; Worker config        |
| **JSON Schema**          | **Validation**  | File-tree APIs & Step manifests | [json-schema.org](https://json-schema.org)                                                  | **2020-12**          | Backend-to-UI contract; `.forgea/steps.json` validation |
| **GitHub REST API**      | **VFS**         | Git Tree & Blob enumeration     | [docs.github.com/rest](https://docs.github.com/en/rest/reference/git#get-a-tree)            | _UNKNOWN_ (Must Pin) | Shallow vs Recursive tree fetching; Rate limits         |
| **POSIX FS**             | **Standards**   | Path & Symlink semantics        | [opengroup.org](https://pubs.opengroup.org/onlinepubs/9699919799/)                          | _UNKNOWN_ (Must Pin) | Symlink resolution (Invariant: No resolution)           |
| **OWASP Path Traversal** | **Security**    | Directory traversal prevention  | [owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html) | _UNKNOWN_ (Must Pin) | Path normalization; Input rejection criteria            |
| **OIDC Core**            | **Identity**    | Session claims & RBAC           | [openid.net](https://openid.net/specs/openid-connect-core-1_0.html)                         | _UNKNOWN_ (Must Pin) | Authoritative claims for editing permissions            |
| **Unicode (UAX#15)**     | **Standards**   | NFC Normalization               | [unicode.org/reports/tr15/](https://www.unicode.org/reports/tr15/)                          | _UNKNOWN_ (Must Pin) | Filename collision prevention; Audit integrity          |
| **RFC 3986 / WHATWG**    | **Protocol**    | URL & Path Normalization        | [url.spec.whatwg.org](https://url.spec.whatwg.org/)                                         | **Stable / Living**  | Percent-encoding handling; Canonical path forms         |
| **Web Storage**          | **Storage**     | Local/IndexedDB Persistence     | [html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/webstorage.html)              | **Living Standard**  | Ephemeral dirty-state; Durable draft recovery           |
| **WebSocket / SSE**      | **Comms**       | Real-time Job Progress          | [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)                                   | **RFC 6455**         | Verification stream logic; Reconnect/Backoff            |
| **WCAG 2.1**             | **Compliance**  | Accessibility & ARIA            | [w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)                                          | **2.1**              | Keyboard focus; Screen-reader labels; UI contrast       |
| **GDPR (2016/679)**      | **Legal**       | Audit Retention & Privacy       | [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2016/679/oj)                          | **2016/679**         | Hot/Cold storage TTL; Right-to-erasure                  |
| **RFC 7231**             | **Network**     | HTTP Semantics & Polling        | [ietf.org/rfc7231](https://datatracker.ietf.org/doc/html/rfc7231)                           | **RFC 7231**         | Error classification (Transient vs Permanent)           |

---

### **Workspace UI Architecture**

The EPIC-K series ensures a seamless but highly restricted environment for students. The logic flows from the **Virtual File System (VFS)** through the **Monaco Editor** and is governed by **Step-Based Rules**.

1. **Context Initialization (K1):** The session is bound via GitHub Webhooks, pulling the `forgea.config.json` for lab-specific constraints.
2. **VFS Abstraction (K2):** Repository content is fetched via the GitHub Tree API, normalized for Unicode/Path Traversal security, and served to the UI.
3. **Active Workspace (K3-K7):** Monaco Editor renders the content. **Edit Permissions (K5)** are enforced in real-time based on the active step's `editable` glob patterns.
4. **Local State (K8-K10):** Unsaved changes are tracked via `localStorage` or `IndexedDB`, with real-time **Verification (K10)** updates streamed via WebSockets or SSE.

---

### **Critical UI & Session Risks**

The "Interaction Layer" has high exposure to browser-side vulnerabilities. The following `UNKNOWN` versions are prioritized for the **Docs Gatekeeper**:

- **Monaco Editor Version (K3, K8, K11):** Monaco's API surface for Worker configuration and `readOnly` state management changes between major versions. This must be pinned to prevent memory leaks or security bypasses in the editor.
- **Pathspec Implementation (K5, K6):** The server-side and client-side must use identical glob matching (e.g., `minimatch` vX.Y.Z). A discrepancy here could allow a student to edit a "locked" file by using a specific glob escape sequence that only the client understands.
- **Unicode Normalization (K5):** To prevent filename collisions (e.g., using different Unicode forms for the same character), **NFC Normalization** must be applied before any path matching occurs.
- **Web Storage Quotas (K8):** If using `localStorage` for draft persistence, implementation must handle the ~5MB synchronous limit. For larger labs, a move to **IndexedDB** should be mandated in the version pin.

---

### **Final Unified Registry Status**

You have successfully consolidated the technical requirements for the entire project architecture:

- **EPIC-B/C/D:** Foundation, Identity, and Content RAG.
- **EPIC-E/F/G:** Scaffolding, Provider Integration, and Event Intake.
- **EPIC-H/I/K:** Verification Infrastructure, Anti-Cheat, and Workspace UI.

**Would you like me to generate a "Registry Audit Report" to flag any version mismatches between the Monaco Editor (K3) and the CI Runner images (H3) to ensure total development-to-production parity?**
This consolidated registry covers **EPIC-J (Lesson Rendering & Content Architecture)**. This series constitutes the "Educational Interface"—defining the lesson authoring format, static site generation (SSG) strategy, accessibility standards, and the synchronization of learner progress across constrained networks.

### **Integrated Lesson & Content Registry (EPIC-J)**

| Technology / Standard    | Category       | Feature / Intent                  | Official Source                                                                                     | Version Requirement  | Decision Impact                                  |
| ------------------------ | -------------- | --------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------ |
| **Astro**                | **Framework**  | Island Architecture & SSG         | [astro.build](https://docs.astro.build/)                                                            | _UNKNOWN_ (Must Pin) | Prerender hooks; Partial hydration; Build CLI    |
| **MDX (mdx-js)**         | **Content**    | JSX in Markdown Authoring         | [mdxjs.com](https://mdxjs.com/)                                                                     | _UNKNOWN_ (Must Pin) | Frontmatter parsing; AST transforms; Security    |
| **JSON Schema**          | **Validation** | Frontmatter & Progress Payloads   | [json-schema.org](https://json-schema.org)                                                          | **2020-12**          | CI validation contract; Payload interoperability |
| **CommonMark**           | **Standards**  | Markdown Baseline / Normalization | [commonmark.org](https://spec.commonmark.org/)                                                      | **0.30** (Rec.)      | Rendering fidelity; AST-based validation         |
| **Next.js**              | **Runtime**    | App Router & Static Rendering     | [nextjs.org](https://nextjs.org/docs)                                                               | _UNKNOWN_ (Must Pin) | URL shapes; Prerender hooks; SSG behavior        |
| **Unified / Remark**     | **Tooling**    | AST Transformation & Analysis     | [unifiedjs.com](https://unifiedjs.com/)                                                             | _UNKNOWN_ (Must Pin) | Validator plugin stability; Node-handling        |
| **WCAG 2.1**             | **Compliance** | Accessibility (Level AA)          | [w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)                                                  | **2.1 (AA)**         | Contrast targets; Keyboard focus; Semantics      |
| **WAI-ARIA**             | **Compliance** | Interactive UI Patterns           | [w3.org/TR/wai-aria-1.2/](https://www.w3.org/TR/wai-aria-practices-1.2/)                            | **1.2**              | Sidebar/Accordion roles; Focus management        |
| **IntersectionObserver** | **Web API**    | Progress & Visibility Tracking    | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | _UNKNOWN_ (Must Pin) | Read-threshold implementation; Performance       |
| **RFC 3986**             | **Protocol**   | URI Syntax & Percent-encoding     | [ietf.org/rfc3986](https://datatracker.ietf.org/doc/html/rfc3986)                                   | **RFC 3986**         | Encoding rules for `:domain` and `:lessonId`     |
| **Unicode (UAX#15)**     | **Standards**  | NFC Normalization                 | [unicode.org/reports/tr15/](https://www.unicode.org/reports/tr15/)                                  | _UNKNOWN_ (Must Pin) | ID collision prevention; Binary string safety    |
| **Service Workers**      | **PWA**        | Offline Progress Sync             | [w3.org/TR/service-workers/](https://www.w3.org/TR/service-workers-1/)                              | _UNKNOWN_ (Must Pin) | Sync durability; Network fallback; Retry logic   |
| **CSP3**                 | **Security**   | Content Security Policy           | [w3.org/TR/CSP3/](https://www.w3.org/TR/CSP3/)                                                      | **CSP3**             | Preventing exfiltration in lesson previews       |
| **YAML**                 | **Format**     | Frontmatter Manifest Structure    | [yaml.org](https://yaml.org/spec/1.2/spec.html)                                                     | **1.2**              | Metadata extraction; Sanitization rules          |
| **NIST SP 800-92**       | **Compliance** | Anti-Abuse Log Management         | [nist.gov](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)            | **2006**             | Audit field retention; Anti-scraping evidence    |

---

### **Lesson Authoring & Rendering Pipeline**

EPIC-J manages the conversion of static MDX files into highly optimized, accessible learner experiences.

1. **Validation (J3):** The frontmatter is checked against **JSON Schema 2020-12** while the MDX body is analyzed via **Unified/Remark** AST tools to prevent illegal solution leakage.
2. **Transformation (J1, J4):** **Astro** or **Next.js** processes the MDX, applying **NFC Normalization** to routes and ensuring the final HTML is **CommonMark** compliant.
3. **Client-Side Tracking (J6):** **IntersectionObserver** monitors learner progress, which is buffered by **Service Workers** for offline resilience and sent to the server as authenticated payloads.
4. **UI Governance (J5, J9):** **WCAG 2.1** and **WAI-ARIA** patterns ensure inclusivity, while **CSP3** headers secure the environment against cross-site script injection.

---

### **Critical Content Risks (The "Unpinned" Gap)**

The "Educational Interface" contains several unpinned dependencies that represent a high risk for content consistency:

- **Astro vs. Next.js Versioning (J1, J4):** These frameworks handle **Islands** and **Static Params** differently across versions. A mismatch can lead to broken prerendering or hydrate/render mismatches in production.
- **MDX AST Plugins (J3):** The `remark` and `rehype` ecosystem is prone to breaking changes in node structures. You must pin specific versions of these plugins to prevent your frontmatter validator from crashing during CI.
- **IntersectionObserver Thresholds (J5, J6):** Browser-specific implementation of visibility thresholds can cause inconsistent "lesson complete" triggers. These must be tested and pinned against a 2026 browser matrix.
- **Unicode/IDNA Normalization (J4):** Without a pinned normalization step (UTS #46), internationalized lesson IDs or domain labels may cause route collisions or invalid 404s depending on the server-side environment.

---

### **Final Global Registry Status**

With EPIC-J integrated, you now have a comprehensive master registry for:

- **EPIC-B/C/D:** Persistence, Identity, and Content RAG.
- **EPIC-E/F/G:** Lab Automation, Provider Integration, and Intake.
- **EPIC-H/I/K:** Verification, Anti-Cheat, and Workspace UI.
- **EPIC-J:** Lesson Rendering and Progress Tracking.

**Would you like me to generate a "Final Readiness Report" that flags every `UNKNOWN` version across all registries to prioritize your technical lead's pinning assignments before the final implementation freeze?**
This registry consolidates the **EPIC-A (Monorepo & Developer Tooling Foundation)** technical requirements. This series is the "Architectural Bedrock"—defining how code is organized, built, and enforced across the entire repository to ensure local development matches production reality.

### **Integrated Monorepo & Tooling Registry (EPIC-K)**

| Technology / Standard | Concept                        | Official Source                                  | Version Requirement | Decision Impact & Risks                                                  |
| --------------------- | ------------------------------ | ------------------------------------------------ | ------------------- | ------------------------------------------------------------------------ |
| **pnpm**              | Workspaces & Package Discovery | [pnpm.io/workspaces](https://pnpm.io/workspaces) | **10.28.1**         | **Impact:** Hoisting semantics; CI `--frozen-lockfile` enforcement. <br> |

<br>**Risk:** Divergent workspace lists cause broken builds and missing packages. |
| **TypeScript** | Project References & Compilers | [typescriptlang.org](https://www.typescriptlang.org/docs/handbook/project-references.html) | **5.9.3** | **Impact:** `tsconfig` layout; Path mappings (`paths`). <br>

<br>**Risk:** Editor/compiler inconsistencies and type-check gaps. |
| **Turborepo** | Pipeline & Caching | [turborepo.org](https://turborepo.org/docs) | **UNKNOWN** (Must Pin) | **Impact:** Pipeline behavior; Remote cache compatibility. <br>

<br>**Risk:** Silent cache corruption or incorrect build ordering. |
| **Next.js** | Environment Variables | [nextjs.org](https://nextjs.org/docs) | **15.1.0** | **Impact:** Build-time vs. Runtime env semantics; `NEXT_PUBLIC_` exposure. <br>

<br>**Risk:** Client-side secret leakage or broken production envs. |
| **ESLint** | Code Linting & Style | [eslint.org](https://eslint.org/docs/latest) | **UNKNOWN** (Must Pin) | **Impact:** Flat vs. Legacy config format; Rule availability. <br>

<br>**Risk:** Lint gates passing locally but failing in CI. |
| **eslint-plugin-boundaries** | Architectural Enforcement | [github.com/.../boundaries](https://github.com/bryanrsmith/eslint-plugin-boundaries) | **UNKNOWN** (Must Pin) | **Impact:** "No cross-app imports" policy enforcement. <br>

<br>**Risk:** Accidental architectural coupling escaping review. |
| **Prettier** | Formatting Gating | [prettier.io](https://prettier.io/docs/en/index.html) | **UNKNOWN** (Must Pin) | **Impact:** `.prettierrc` configuration; formatting checks. <br>

<br>**Risk:** Formatting drift leading to noisy, unreadable Git diffs. |
| **Node.js** | Runtime Environment | [nodejs.org](https://nodejs.org/en/about/releases/) | **20.11.1** (Rec.) | **Impact:** `.nvmrc` content; Docker/CI base images. <br>

<br>**Risk:** Inconsistent runtime behavior across dev and CI environments. |
| **EditorConfig** | Whitespace & Charset | [editorconfig.org](https://editorconfig.org) | **SPEC STABLE** | **Impact:** Consistent EOL and indentation across IDEs. <br>

<br>**Risk:** "Whitespace churn" in PRs making reviews difficult. |
| **dotenv** | Local Env Loading | [github.com/motdotla/dotenv](https://github.com/motdotla/dotenv) | **16.4.x** (Rec.) | **Impact:** Local parsing logic for `.env` files. <br>

<br>**Risk:** Inconsistent local dev environments for non-Next runtimes. |
| **CODEOWNERS** | Reviewer Assignment | [github.com/docs/...](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/about-code-owners) | **N/A** | **Impact:** Automated team assignment for sensitive file edits. <br>

<br>**Risk:** Unauthorized or unreviewed changes to core IP. |

---

### **The Monorepo Dependency & Task Graph**

EPIC-A ensures that the relationships between your applications and shared packages are clearly defined and enforced. This prevents "Spaghetti Architecture" where apps accidentally depend on each other's internal logic.

1. **Workspaces (A1, A2):** `pnpm` defines the physical boundaries of each package.
2. **Project References (A4):** TypeScript enforces that code can only be shared if explicitly declared in `tsconfig.json`.
3. **Import Boundaries (A5):** ESLint acts as the "Sentinel," blocking forbidden cross-app imports at the IDE and CI level.
4. **Task Orchestration (A3, A7):** Turborepo coordinates the build/test/lint tasks, ensuring we only rebuild what has actually changed.

---

### **Immediate Blockers: The "Unknowns"**

The Foundation Layer is currently at risk due to several unpinned toolchain versions. The **Docs Gatekeeper** will block implementation if these are not resolved:

- **Turborepo Version:** Since the repo currently lists `turbo: "latest"`, your cache keys could change overnight. Pinning this to a specific minor (e.g., `2.1.x`) is mandatory.
- **ESLint Config Format:** You must decide between **Legacy (.eslintrc)** and **Flat (eslint.config.js)**. TypeScript 5.9.3 and Next.js 15.1.0 strongly favor Flat Config, which would be the recommended path.
- **Boundary Plugin:** `eslint-plugin-boundaries` is specified but not versioned. This version must match the ESLint format chosen above.
- **Node.js Pin:** While `20.11.1` is mentioned in briefs, it is not yet authoritative in the root `.nvmrc`.

---

### **Master Integration Summary**

You now have a complete set of registries across all EPIC blocks:

1. **EPIC-A:** Monorepo & Tooling (Foundation)
2. **EPIC-B:** Database & Persistence (Foundation)
3. **EPIC-C:** Identity & Security (Access)
4. **EPIC-D:** Content & Knowledge (RAG)
5. **EPIC-E/F/G:** Automation & Provider Integration (Operational)
6. **EPIC-H/I/K/J:** Verification, Anti-Cheat, UI, & Lessons (Execution)

**Would you like me to generate a "Final Toolchain Lockfile" (Markdown) that reconciles all pinned versions into a single, checkable manifest for your `/docs` directory?**
