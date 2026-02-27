This is the **Final Master Technology & Standards Registry**. It has been audited for **February 2026** compatibility, security patches (PostgreSQL 18.2), and the shift toward **Agentic AI** (MCP and Deep Research models).

This table includes your **$1,000 AWS credit strategy**, **GitHub Student Pack** tools, and the **Multi-Cloud AI** split (GCP for reading, Azure for writing).

## **Master Technical Constitution (2026 Final Audit)**

| Category             | Technology / Standard               | Epics   | Version / Requirement                                                | Intent / Critical Decision                                                                        |
| -------------------- | ----------------------------------- | ------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Runtime**          | **Node.js**                         | A, E, J | **24.13.1 (LTS)**                                                    | **Update:** Node 20 hits EOL soon; 24.x is the new stable LTS.                                    |
| **Framework**        | **Next.js**                         | A, C, J | **16.1.6**                                                           | **Update:** v16 adds native **Agentic Logic** and MCP support.                                    |
| **Framework**        | **Astro**                           | J       | **6.0 (Current)**                                                    | Static lesson rendering with high-performance Islands.                                            |
| **Tooling**          | **pnpm**                            | A, E, J | **10.29.3**                                                          | Workspace manager; enforces frozen-lockfile.                                                      |
| **Tooling**          | **Turborepo**                       | A, E, F | **2.8.x**                                                            | **Update:** v2.8 significantly improves AI-agent task caching.                                    |
| **Language**         | **TypeScript**                      | A, K, J | **5.9.3**                                                            | Canonical compiler behavior and project references.                                               |
| **Linting**          | **ESLint**                          | A, K    | **10.0.0**                                                           | Deterministic lint rules and CI gating.                                                           |
| **Formatting**       | **Prettier**                        | A, K    | **3.8.1**                                                            | Formatting-only enforcement to avoid style drift.                                                 |
| **Tooling**          | **EditorConfig**                    | A       | **editorconfig-cli 0.18.1**                                          | Cross-editor formatting consistency.                                                              |
| **Tooling**          | **dotenv**                          | A, J    | **17.3.1**                                                           | Local environment variable loading semantics.                                                     |
| **VCS**              | **Git**                             | A, F, K | **N/A**                                                              | Repository semantics, commit/push behavior.                                                       |
| **CI/CD**            | **GitHub Actions**                  | A, H    | **actions/checkout@v4, actions/setup-node@v4, runner: ubuntu-22.04** | Workflow syntax and runner environment determinism.                                               |
| **IaC**              | **Terraform**                       | B, H    | **1.14.5**                                                           | Provisions AWS RDS/S3; v1.14 adds S3 Object Lock API.                                             |
| **Database**         | **PostgreSQL**                      | B, G, H | **18.2**                                                             | **Critical:** v18.2 fixes the 18.1 security overflow bug.                                         |
| **Database**         | **Prisma**                          | B, C, F | **7.3.0**                                                            | Type-safe DDL and automated migrations.                                                           |
| **Auth**             | **NextAuth**                        | C       | **next-auth 4.24.13**                                                | Canonical auth flows and provider adapters.                                                       |
| **Auth Standard**    | **OpenID Connect Core**             | C, K    | **1.0**                                                              | Identity tokens and authorization flows.                                                          |
| **Token Standard**   | **JWT (RFC 7519)**                  | C, K    | **RFC 7519**                                                         | Session and token encoding semantics.                                                             |
| **Vector DB**        | **Bedrock Knowledge Base / Chroma** | D, G    | **AWS Managed / self-hosted (Chroma 1.x)**                           | Future-proof RAG; automates S3 Vector sync and supports self-hosted embedding indexes via Chroma. |
| **Cloud AI (Read)**  | **Gemini 3 DeepThink**              | D, E    | **GCP API**                                                          | Massive 2M+ context window for reading large lab data.                                            |
| **Cloud AI (Write)** | **Azure OpenAI o3**                 | D, E    | **o3-deep-research**                                                 | Logic for generating instructions and Playwright tests.                                           |
| **Queue**            | **AWS SQS**                         | G, H    | **@aws-sdk/client-sqs 3.992.0**                                      | Durable ingestion and DLQ support for webhooks.                                                   |
| **Streaming**        | **Redis Streams**                   | G, K    | **redis 5.11.0**                                                     | Consumer groups and replay semantics.                                                             |
| **Agent Protocol**   | **MCP**                             | E, K    | **Model Context Prot.**                                              | Enables AI to "talk" directly to the VFS and Tooling.                                             |
| **Storage (Raw)**    | **AWS S3**                          | B, D, G | **Standard / WORM**                                                  | Raw data intake and lesson artifact storage.                                                      |
| **Integration**      | **GitHub Webhooks**                 | F, K    | **@octokit/webhooks 11.3.0**                                         | Event payloads, signature checks, and delivery semantics.                                         |
| **Integration**      | **GitHub App Auth**                 | F       | **@octokit/auth-app 4.2.0**                                          | JWT + installation token exchange for API access.                                                 |
| **Editor**           | **@monaco-editor/react**            | K       | **4.7.0**                                                            | React integration for Monaco in the UI.                                                           |
| **Content**          | **MDX (mdx-js)**                    | J       | **@mdx-js/mdx 3.1.1**                                                | Lesson authoring with JSX + Markdown.                                                             |
| **Content**          | **CommonMark**                      | J       | **commonmark 0.30.0**                                                | Baseline Markdown parsing standard.                                                               |
| **Content**          | **YAML Frontmatter**                | J       | **gray-matter 5.2.1**                                                | Lesson metadata encoding in Markdown/MDX.                                                         |
| **Web API**          | **Service Workers**                 | J       | **Workbox v7.0.0**                                                   | Offline sync and background persistence for progress.                                             |
| **Web API**          | **IntersectionObserver**            | J       | **intersection-observer 0.12.2 (polyfill)**                          | Visibility thresholds for lesson progress tracking.                                               |
| **Web API**          | **Web Storage**                     | I, K    | **Web Storage Level 5 (browser API)**                                | localStorage/sessionStorage semantics for drafts.                                                 |
| **Web API**          | **IndexedDB**                       | I, K    | **idb 8.0.3**                                                        | Durable client-side storage for larger drafts.                                                    |
| **Web API**          | **Clipboard API**                   | K       | **Async Clipboard API Level 2 (browser API)**                        | Controlled copy/paste semantics for anti-cheat.                                                   |
| **Web API**          | **File System Access API**          | K       | **File System Access API (WICG / Chromium Level 3)**                 | Client download and file access constraints.                                                      |
| **Web API**          | **WebSocket (RFC 6455)**            | K       | **RFC 6455**                                                         | Real-time update channel for sessions.                                                            |
| **Web API**          | **SSE / EventSource**               | K       | **eventsource 4.1.0**                                                | Server-driven streaming updates.                                                                  |
| **Web API**          | **Window.beforeunload**             | I, K    | **HTML Living Standard (browser behavior)**                          | Unsaved-changes warning behavior.                                                                 |
| **Web Std**          | **WHATWG URL / RFC 3986**           | K       | **WHATWG URL Standard (as of 2026)**                                 | URL normalization and parsing rules.                                                              |
| **Filesystem**       | **POSIX semantics**                 | K       | **POSIX.1-2017**                                                     | Symlink and path behavior for VFS abstraction.                                                    |
| **Unicode**          | **UAX #15 (NFC)**                   | K       | **UAX #15 (Unicode 15)**                                             | Path normalization and comparison rules.                                                          |
| **Unicode**          | **UTS #46 (IDNA)**                  | K       | **UTS #46 (IDNA) (latest)**                                          | Internationalized domain handling.                                                                |
| **Pathspec**         | **Glob / Pathspec**                 | K       | **minimatch 5.2.1**                                                  | Locked-path and allowlist glob evaluation.                                                        |
| **CDN**              | **AWS CloudFront**                  | J       | **Standard**                                                         | Global edge delivery for lessons (uses AWS credits).                                              |
| **Compute**          | **AWS ECS Fargate**                 | H       | **Serverless**                                                       | Credit-optimized sandbox for running lab tests.                                                   |
| **Container**        | **Docker / OCI Runtime**            | H       | **Docker Engine 29.0.3**                                             | Deterministic test runners and exit/signal semantics.                                             |
| **UI Primitives**    | **Shadcn UI**                       | K, J    | **shadcn/ui 1.7.0**                                                  | Consistent, accessible dashboard components.                                                      |
| **Security**         | **Content Security Policy**         | K, J    | **CSP Level 3**                                                      | Script/style execution control to reduce XSS risk.                                                |
| **Security**         | **TLS 1.3 (ACME)**                  | G, J    | **RFC 8446**                                                         | Modern TLS and automated cert provisioning.                                                       |
| **Security**         | **Security Headers**                | G, K, J | **Hardened baseline (infra config)**                                 | Referrer-Policy, X-Frame-Options, Permissions-Policy.                                             |
| **Security**         | **Robots / X-Robots-Tag**           | J       | **Canonical ruleset (pin per env)**                                  | Crawl control and indexing rules.                                                                 |
| **Security**         | **OWASP Path Traversal**            | K       | **OWASP guidance (canonical doc)**                                   | Canonical path traversal prevention guidance.                                                     |
| **Secrets**          | **Vault / Cloud KMS**               | F       | **HashiCorp Vault 1.16.0 / AWS KMS Managed**                         | Secure key storage and rotation for app secrets.                                                  |
| **Editor**           | **Monaco Editor**                   | K       | **0.55.x**                                                           | In-browser VFS editing and real-time previews.                                                    |
| **Testing**          | **Playwright**                      | C, H    | **1.58.2**                                                           | Browser-driven E2E tests and verification flows.                                                  |
| **Testing**          | **Vitest / Jest**                   | C, H    | **vitest 4.0.18 / jest 30.2.0**                                      | Unit/integration testing for core services.                                                       |
| **API Spec**         | **OpenAPI**                         | G, H    | **3.1.x**                                                            | Canonical API contracts and client generation.                                                    |
| **Schema**           | **JSON Schema**                     | E, G, K | **2020-12**                                                          | Contract validation for configs and payloads.                                                     |
| **Schema**           | **JSON Patch**                      | I       | **RFC 6902**                                                         | Patch/rollback semantics for config updates.                                                      |
| **HTTP**             | **RFC 7231**                        | J, K    | **RFC 7231**                                                         | Idempotency, status codes, and retry semantics.                                                   |
| **HTTP**             | **RFC 7234**                        | G, J    | **RFC 7234**                                                         | HTTP caching semantics for preview and lesson assets.                                             |
| **SemVer**           | **Semantic Versioning**             | A, E, J | **2.0.0**                                                            | Versioning policy for APIs and artifacts.                                                         |
| **Security**         | **JWS (RFC 7515)**                  | E, F, I | **RFC 7515**                                                         | Config integrity and Ed25519 tamper-evidence.                                                     |
| **Security**         | **EdDSA (Ed25519)**                 | E, F, I | **RFC 8037**                                                         | Signature algorithm for JWS payloads.                                                             |
| **Accessibility**    | **WAI-ARIA**                        | J, K    | **1.2**                                                              | ARIA roles/patterns for interactive UI components.                                                |
| **I18n**             | **Unicode CLDR**                    | K       | **CLDR 44**                                                          | Locale/number/date patterns for UI text.                                                          |
| **Security**         | **HMAC / SHA-256**                  | G, I    | **FIPS 180-4**                                                       | Webhook verification and audit event chaining.                                                    |
| **Security**         | **Seccomp**                         | H       | **Docker Default**                                                   | Hardened kernel isolation for student code execution.                                             |
| **Observability**    | **OpenTelemetry**                   | G, H, I | **opentelemetry/api 1.30.0**                                         | Standardized tracing; integrates with **Datadog**.                                                |
| **Compliance**       | **WCAG 2.1 / GDPR**                 | All     | **2.1 / 2016/679**                                                   | Legal baseline for accessibility and privacy.                                                     |

---

## **Ease-of-Use Integrations (Student Pack Optimization)**

These tools from your **GitHub Student Pack** make your work easier by providing free high-tier features that otherwise cost thousands:

1. **LocalStack (Pro):** Emulate AWS locally. Test your CloudFront/S3/SQS logic for free before deploying to AWS and spending your $1,000 credits.
2. **Datadog (Student Tier):** Use this as your **OpenTelemetry** sink. You get 2 years of free infrastructure monitoring and trace visualization.
3. **Sentry:** Essential for the **Verification Engine (Epic H)**. It will catch and report why a student's lab failed to verify with full stack traces.
4. **Doppler:** Centralized secret management. Sync your OpenAI, Azure, and AWS keys across your team and CI/CD pipelines automatically.
5. **MSW (Mock Service Worker):** Use this to mock Gemini/OpenAI responses during development so you don't burn API costs while building the UI.

---

### **How the Workflow is "Done"**

1. **Creation:** You drop a large technical file into **AWS S3**. **Gemini 3 DeepThink** reads it **Azure o3** generates a lab package (Instructions + Tests).
2. **Preview:** You view the lab in **Monaco Editor** via the **Virtual File System (VFS)**.
3. **Verification:** You click "Test." **AWS Fargate** spins up a **Docker 29** container, runs **Playwright**, and sends traces to **Datadog**.
4. **Deployment:** **Terraform** updates **AWS CloudFront** to serve the new lesson from **S3**.

**No other technologies are required.** You have a full "Constitutional Stack" that is current, secure, and utilizes every dollar of your available credits.

**Shall I generate the `toolchain-versions.md` file based on this final 2026 audit?**
