This file defines **all official documentation** relied upon for design, verification,
planning, and enforcement decisions.

## EPIC-I — Configuration & Policy (I8)

### JSON Patch (RFC 6902)

- **Technology:** JSON Patch
- **Version:** RFC 6902
- **Official source:** https://tools.ietf.org/html/rfc6902
- **Feature usage:** Migration playbooks, reverse-patch rollbacks, and audit-ready deltas for configuration changes used by EPIC-I.
- **Status:** VERIFIED

### Internal: I8 defaults and migrations (internal)

- **Technology:** Internal canonical defaults + migration playbook
- **Version:** VERSIONED INTERNAL DOC (pin when published)
- **Official source:** /docs/official-docs/epic-i-config/I8_defaults_and_migrations.md
- **Feature usage:** `defaults.json` example, migration playbooks, reverse-patch rollbacks, and acceptance tests for EPIC-I configuration.
- **Status:** REQUIRED

### Local Change Tracking (K8) — browser storage & unload semantics

### Window.beforeunload (navigation/unload semantics)

- **Technology:** Window.beforeunload / navigation unload behavior
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload
- **Feature usage:** Canonical behavior and cross-browser restrictions for navigation prompts used to warn users about unsaved changes.
- **Status:** REQUIRED

### Web Storage (localStorage) — WHATWG Web Storage

- **Technology:** Web Storage (localStorage / sessionStorage)
- **Version:** LIVING STANDARD — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://html.spec.whatwg.org/multipage/webstorage.html
- **Feature usage:** Client-side persistence semantics, quota, and synchronous behavior for ephemeral draft storage decisions in K8.
- **Status:** REQUIRED

### IndexedDB API

- **Technology:** IndexedDB (client-side structured storage)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- **Feature usage:** Durable, asynchronous client-side storage option for draft persistence when larger payloads or structured metadata are required.
- **Status:** REQUIRED

### Internal: I8 override semantics (internal)

- **Technology:** Internal override semantics doc
- **Version:** VERSIONED INTERNAL DOC (pin when published)
- **Official source:** /docs/official-docs/epic-i-config/I8_override_semantics.md
- **Feature usage:** Per-lab override precedence, storage options, access control, and audit fields.
- **Status:** REQUIRED

[EPIC-F registry additions pending]

## EPIC-F — Step-Based Lab Support (steps.json)

### `.forgea/steps.json` JSON Schema (canonical)

- **Technology:** JSON Schema
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-F/steps.schema.json
- **Feature usage:** Canonical validation for `.forgea/steps.json` artifacts authored in lab templates; used by CI, authoring tools, and UI loaders.
- **Status:** REQUIRED

### Internal: F10 Step-Based Lab Support (gatekeeper brief)

- **Technology:** Internal Markdown
- **Version:** VERSIONED INTERNAL DOC (pin when published)
- **Official source:** /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
- **Feature usage:** Authoring guidelines and mapping rules for step artifacts.
- **Status:** PARTIAL

## EPIC-K — Instructions & Step Panel (K7)

### Instruction API contract

- **Technology:** HTTP API (JSON)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-K/instruction_api_contract.md
- **Feature usage:** Server API contract for `GET /api/labs/:labId/steps` and related endpoints used by UI clients.
- **Status:** REQUIRED

### Internal: K7 Docs Gatekeeper Brief

- **Technology:** Internal Markdown
- **Version:** VERSIONED INTERNAL DOC (pin when published)
- **Official source:** /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md
- **Feature usage:** Identifies schema and API gaps; informs planner tasks.
- **Status:** VERIFIED

## EPIC-H — Verification Mapping

### Internal: Step→Verification mapping

- **Technology:** Internal JSON mapping
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-H/step_verification_mapping.md
- **Feature usage:** Binds `stepId` to verification checks executed by the verification engine.
- **Status:** REQUIRED

## EPIC-F — GitHub / Webhooks (added)

### GitHub Webhooks — Events & Security

- **Technology:** GitHub Webhooks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Event names, payload formats, and signature verification semantics (e.g., `x-hub-signature-256`) for webhook handling used by EPIC-F.
- **Status:** VERIFIED

### GitHub App authentication (JWT & installation tokens)

- **Technology:** GitHub App authentication
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
- **Feature usage:** JWT generation, installation token exchange and lifetimes — required for programmatic API access by EPIC-F.
- **Status:** VERIFIED

### Secrets storage guidance (Vault / KMS)

- **Technology:** HashiCorp Vault / Cloud KMS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.vaultproject.io/docs
- **Feature usage:** Secure storage, rotation, ACLs, and audit logging for private keys and webhook secrets used by EPIC-F.
- **Status:** VERIFIED

### GitHub App Permissions Matrix (internal)

- **Technology:** GitHub Apps permissions & scope matrix
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/apps
- **Feature usage:** Canonical permission mapping for EPIC-F automation (repo creation, branch protection, webhooks, repo administration).
- **Status:** REQUIRED

### Repository Lifecycle & Rollback Playbook (internal)

- **Technology:** Operational runbook & rollback playbook
- **Version:** VERSIONED INTERNAL RUNBOOK (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-F/repo-lifecycle-and-ownership.md`)
- **Feature usage:** Operator procedures for creation, rollback, and recovery of repositories created by lab automation.
- **Status:** REQUIRED

### Webhook Event Flow & Mapping (internal)

- **Technology:** Webhook event mapping & handler algorithm
- **Version:** VERSIONED INTERNAL DOC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-F/webhook-event-flow.md`)
- **Feature usage:** Defines canonical webhook-to-session lookup keys and fallback strategies (provider repo_id first, URL fallback).
- **Status:** REQUIRED

# ✅ Official Documentation Registry (Authoritative) — **CORRECTED**

---

## 📦 Lab Template & Injection (EPIC-F)

### Lab Template Manifest (JSON Schema)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Machine-readable schema for lab template payloads (files list, lockedGlobs, checksums, metadata)
- **Status:** REQUIRED

## EPIC-J — Lesson Routing & Rendering (J4)

### Next.js routing & app rendering

- **Technology:** Next.js (app router) routing + static rendering
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://nextjs.org/docs/app/building-your-application/routing
- **Feature usage:** Canonical route shape, `generateStaticParams`/SSG behaviors, and no-JS rendering constraints for lesson pages.
- **Status:** REQUIRED

### Next.js static & dynamic rendering (SSG/ISR/SSR)

- **Technology:** Next.js rendering semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://nextjs.org/docs/app/building-your-application/rendering
- **Feature usage:** Decision criteria for build-time prerendering vs per-request rendering for lessons.
- **Status:** REQUIRED

## EPIC-J — Project & Tooling (J1)

### Astro (scaffold + islands)

- **Technology:** Astro
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.astro.build/
- **Feature usage:** Project scaffold for `apps/lessons`, islands/partial hydration model, build-time prerender capabilities.
- **Status:** REQUIRED

### MDX (mdx-js)

- **Technology:** MDX (mdx-js)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://mdxjs.com/
- **Feature usage:** MDX parsing, frontmatter conventions, JSX usage rules inside lessons.
- **Status:** REQUIRED

## EPIC-J — Lesson Progress Tracking (J6)

### JSON Schema (progress payload)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical validation and versioning of lesson progress payloads exchanged between clients and the progress persistence API.
- **Status:** REQUIRED

### Service Workers (offline sync guidance)

- **Technology:** Service Workers
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.w3.org/TR/service-workers-1/
- **Feature usage:** Background sync and offline buffering guidance for reliable progress persistence in flaky networks.
- **Status:** REQUIRED

### Intersection Observer (visibility semantics)

- **Technology:** Intersection Observer (Web API)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Feature usage:** Defines thresholds and browser behavior for marking lesson sections as "viewed" (drives progress events).
- **Status:** REQUIRED

### HTTP semantics & Idempotency (status codes)

- **Technology:** HTTP / RFC 7231
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Feature usage:** Guides error classification, idempotency policies, and retry semantics for the progress API.
- **Status:** VERIFIED

### JWT (optional auth token spec)

- **Technology:** JSON Web Tokens (JWT)
- **Version:** RFC 7519
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7519
- **Feature usage:** If JWTs are used for user auth, pin required claims and verification rules for progress endpoints.
- **Status:** VERIFIED

### JSON Schema (frontmatter validator)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Validator contract for MDX frontmatter and CI validation output format.
- **Status:** VERIFIED

### Node.js / pnpm

- **Technology:** Node.js + pnpm
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://nodejs.org/ and https://pnpm.io/
- **Feature usage:** Build and CI runtime for `apps/lessons` and validator CLI.
- **Status:** REQUIRED

## EPIC-K — Monaco Editor Integration (K4)

### monaco-editor (core)

- **Technology:** monaco-editor
- **Version:** 0.55.1
- **Official source:** https://github.com/microsoft/monaco-editor
- **Feature usage:** Core runtime, language services, and worker-based features used by the in-browser editor in `apps/forgea-labs`.
- **Status:** VERIFIED

### @monaco-editor/react (React wrapper)

- **Technology:** @monaco-editor/react
- **Version:** 4.7.0
- **Official source:** https://github.com/suren-atoyan/monaco-react
- **Feature usage:** React integration patterns, lifecycle, `readOnly` prop guidance and cleanup recommendations for React apps.
- **Status:** VERIFIED

### Monaco worker & bundler integration guidance

- **Technology:** Monaco worker integration / bundler adapters
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://microsoft.github.io/monaco-editor/ and https://github.com/microsoft/monaco-editor-webpack-plugin
- **Feature usage:** Worker configuration and bundler-specific integration steps for webpack/Vite/Next.js to ensure runtime availability of Monaco language services.
- **Status:** REQUIRED

## EPIC-K — Virtual File System (K2)

### Git provider repository tree API (GitHub example)

- **Technology:** Git provider repository tree API (example: GitHub REST `GET /repos/{owner}/{repo}/git/trees`)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/reference/git#get-a-tree
- **Feature usage:** Defines canonical provider API shape for enumerating repository trees, recursive vs shallow tree semantics, pagination, blob lookups, and rate-limit behaviors used by the VFS implementation.
- **Status:** REQUIRED

### Path traversal guidance (OWASP)

- **Technology:** Path Traversal / Directory Traversal guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
- **Feature usage:** Canonical mitigations and canonicalization rules for rejecting/normalizing incoming path inputs to protect VFS from traversal attacks.
- **Status:** REQUIRED

### POSIX filesystem semantics (symlink behavior)

- **Technology:** POSIX — Filesystem behavior & symlink semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://pubs.opengroup.org/onlinepubs/9699919799/
- **Feature usage:** Clarifies symlink resolution expectations, `lstat`/`stat` differences, and platform behavior informing the decision to disallow symlink resolution in the VFS contract.
- **Status:** REQUIRED

### WHATWG URL Standard (normalization)

- **Technology:** WHATWG URL Standard
- **Version:** LIVING STANDARD — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://url.spec.whatwg.org/
- **Feature usage:** Guides client/server URL and path normalization, percent-encoding handling, and edge cases relevant to path parameter parsing for VFS APIs.
- **Status:** REQUIRED

### Monaco licensing

- **Technology:** monaco-editor license
- **Version:** N/A (license text)
- **Official source:** https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
- **Feature usage:** Ensure redistribution and attribution requirements are met for shipping Monaco as part of the web application.
- **Status:** VERIFIED

### Web Storage (localStorage)

- **Technology:** Web Storage API (localStorage)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **Feature usage:** Client-side ephemeral persistence for K8 dirty-state, unsaved counts, and quick recovery UX.
- **Status:** REQUIRED

### IndexedDB (client-side durable storage)

- **Technology:** IndexedDB
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- **Feature usage:** Durable, structured client-side draft storage option for K8 when `localStorage` is insufficient.
- **Status:** REQUIRED

### Page lifecycle / beforeunload

- **Technology:** Page lifecycle / `beforeunload` event
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
- **Feature usage:** Guidance for navigation/unload warnings used by K8 to prevent accidental data loss.
- **Status:** REQUIRED

### Server-Sent Events (SSE) / EventSource

- **Technology:** Server-Sent Events / EventSource
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/EventSource
- **Feature usage:** Real-time, server→client streaming option for verification progress used by K10 as an alternative to polling or WebSocket.
- **Status:** REQUIRED

### WebSocket (RFC 6455)

- **Technology:** WebSocket
- **Version:** RFC 6455
- **Official source:** https://datatracker.ietf.org/doc/html/rfc6455
- **Feature usage:** Bidirectional socket option for richer verification control and event streams (K10) if required.
- **Status:** REQUIRED

## EPIC-J — Anti-Cheat & Quality Controls (J9)

### OWASP Application Security Guidance

- **Technology:** OWASP Top Ten / API Security
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://owasp.org/
- **Feature usage:** Guidance for input validation, auth/enforcement, and API hardening used by anti-cheat controls.
- **Status:** REQUIRED

### Content Security Policy (CSP)

- **Technology:** Content Security Policy (CSP3)
- **Version:** CSP3
- **Official source:** https://www.w3.org/TR/CSP3/
- **Feature usage:** Canonical CSP directives for lesson previews and exported artifacts to mitigate XSS and data exfiltration.
- **Status:** REQUIRED

### Rate-limiting / Throttling Guidance

- **Technology:** Rate-limiting & throttling patterns (provider-specific)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Provider docs (Cloudflare / AWS / chosen infra) and HTTP semantics (RFC 7231)
- **Feature usage:** Defines per-IP / per-account limits, `Retry-After` semantics, and CI simulation expectations.
- **Status:** REQUIRED

### URI syntax / percent-encoding

- **Technology:** URI generic syntax (percent-encoding)
- **Version:** RFC 3986
- **Official source:** https://datatracker.ietf.org/doc/html/rfc3986
- **Feature usage:** Encoding rules for `:domain` and `:lessonId` path segments to avoid collisions.
- **Status:** VERIFIED

### WHATWG URL Standard

- **Technology:** WHATWG URL Standard
- **Version:** LIVING STANDARD — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://url.spec.whatwg.org/
- **Feature usage:** Browser/engine URL parsing & normalization guidance used to align server canonicalization.
- **Status:** REQUIRED

## EPIC-K — LAB UI (Editor Enforcement)

### OpenID Connect Core (session claims)

- **Technology:** OpenID Connect Core
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://openid.net/specs/openid-connect-core-1_0.html
- **Feature usage:** Canonical session claims, ID token validation and session lifetimes used by `parseSessionUser()` and server-side session validation for editor APIs.
- **Status:** REQUIRED

### Path canonicalization & traversal guidance (OWASP)

- **Technology:** OWASP Path Traversal guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
- **Feature usage:** Canonicalization and normalization rules for editor file path validation to prevent directory traversal and encoded-path bypasses.
- **Status:** REQUIRED

### Unicode Normalization (UAX#15)

- **Technology:** Unicode Normalization (NFC)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.unicode.org/reports/tr15/
- **Feature usage:** Canonical normalization form for IDs before percent-encoding to prevent collisions.
- **Status:** REQUIRED

### IDNA / UTS#46

- **Technology:** IDNA / Internationalized Domain Names (UTS#46)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://unicode.org/reports/tr46/
- **Feature usage:** Domain-label handling and Punycode conversion for `:domain` inputs.
- **Status:** REQUIRED

### Locked-Paths Manifest / Glob Semantics

- **Technology:** Glob / Pathspec (choose/pin a single implementation)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (select and pin: gitignore semantics / minimatch / pathspec)
- **Feature usage:** Canonical list and semantics for locked path globs used by injectors and enforcement hooks
- **Status:** REQUIRED

## EPIC-G — Lab Attempt Ledger (G5)

### GitHub Webhooks — Delivery ID (idempotency)

- **Technology:** GitHub Webhooks / delivery id
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks

## EPIC-B — Audit & Logging (AuditLog metadata + retention)

### GDPR / Regional Data Protection (legal)

- **Technology:** EU GDPR (Regulation)
- **Version:** Regulation (EU) 2016/679
- **Official source:** https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Feature usage:** Legal guidance for retention, deletion/backfill, and lawful processing of `AuditLog` containing personal data.
- **Status:** VERIFIED

### AWS S3 Object Lifecycle / Archival Guidance (vendor)

- **Technology:** AWS S3 Lifecycle Management
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
- **Feature usage:** Guides archival destination selection, lifecycle rules, and policy-as-code for automated archival of `AuditLog` records.
- **Status:** VERIFIED

### Internal: EPIC-B audit canonical docs (to be published)

- **Technology:** Internal canonical JSON Schema + retention + sink spec
- **Version:** VERSIONED INTERNAL DOC (pin when published)
- **Official source:** /docs/official-docs/EPIC-B/audit-log-guidelines.md
- **Feature usage:** Canonical `AuditLog.metadata` JSON Schema, event registry, producer examples, and scrub/redaction rules for implementers.
- **Status:** REQUIRED

- **Feature usage:** Source of canonical delivery id (`X-GitHub-Delivery`) used as idempotency key for `LabAttempt` ledger records.
- **Status:** VERIFIED

### Idempotency & Retry Patterns (HTTP)

- **Technology:** Idempotency & Retry Patterns (HTTP & provider guidance)
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Feature usage:** Defines status-code semantics and retry/backoff expectations for webhook handlers and idempotency contracts.
- **Status:** VERIFIED

### Durable Ingestion Options (SQS / Redis Streams / Postgres job table)

- **Technology:** AWS SQS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- **Feature usage:** Optional DLQ and durable queue for webhook persistence and replay for EPIC-G ingestion.
- **Status:** REQUIRED

## EPIC-G — Preview Hosting (G11)

### Content Security Policy (CSP)

- **Technology:** Content Security Policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.w3.org/TR/CSP3/
- **Feature usage:** Canonical CSP directives to be applied to preview responses to prevent script execution, frame embedding, and data exfiltration.
- **Status:** REQUIRED

### Robots / Indexing

- **Technology:** Robots & X-Robots-Tag
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.robotstxt.org/
- **Feature usage:** Prevent indexing or caching of preview URLs via robots.txt and `X-Robots-Tag` response headers.
- **Status:** REQUIRED

### Referrer-Policy / X-Frame-Options / Permissions-Policy

- **Technology:** Browser privacy headers
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** MDN / WHATWG / W3C (pin precise specs per header)
- **Feature usage:** Exact header values such as `Referrer-Policy: no-referrer`, `X-Frame-Options: DENY`, and `Permissions-Policy` entries to disable device APIs.
- **Status:** REQUIRED

### TLS / Certificate Management

- **Technology:** TLS 1.3 / Certificate provisioning (ACME)
- **Version:** RFC 8446 (TLS 1.3) recommended
- **Official source:** https://www.rfc-editor.org/rfc/rfc8446.html
- **Feature usage:** Guidance on TLS termination location, certificate automation, and compatibility expectations for preview domains.
- **Status:** VERIFIED

### CDN Provider Guidance (header injection, GET-only enforcement)

- **Technology:** CDN provider docs (Cloudflare / CloudFront / Fastly)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Provider-specific docs (pick and pin one)
- **Feature usage:** How to inject headers at edge, enforce method restrictions at CDN edge, configure cache rules and signed URLs for preview artifacts.
- **Status:** REQUIRED

- **Technology:** Redis Streams
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://redis.io/docs/manual/streams/
- **Feature usage:** Optional streaming consumer groups for durable processing and replay semantics for EPIC-G.
- **Status:** REQUIRED

- **Technology:** Postgres job table pattern
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
- **Feature usage:** DB-backed queue option; transactional enqueue/processing recommendations for EPIC-G ingestion.
- **Status:** REQUIRED

## API Specification — OpenAPI (session-creation)

- **Technology:** OpenAPI Specification
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://spec.openapis.org/oas/latest.html
- **Feature usage:** Formal API contract for atomic repo creation + session issuance endpoints (idempotency headers, response shapes, error codes) required by EPIC-K and EPIC-F.
- **Status:** REQUIRED

## EPIC-H — LAB TESTING & VERIFICATION ENGINE (H2)

### Queue Durability & DLQ Options

- **Technology:** Durable queue / DLQ (vendor choice)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Defines durable delivery, retry semantics, and DLQ redrive procedures used by H2 Job Queue & Scheduling.
- **Status:** REQUIRED

### Locking & Concurrency Primitives

- **Technology:** Distributed lock primitives (vendor or pattern)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Guidance for lease TTLs, renewal patterns, and failure handling to guarantee single-active-job per `LabSession`.
- **Status:** REQUIRED

## EPIC-H — LAB TESTING & VERIFICATION ENGINE (H7)

### Artifact Metadata Schema

- **Technology:** JSON Schema (artifact metadata)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for artifact metadata used for indexing, retention, and audit in H7 Artifact Collection.
- **Status:** REQUIRED

### Hashing & Signing Guidance

- **Technology:** Cryptographic hashing & signature guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Defines accepted hash algorithms, signature formats, and verification guidance for artifact integrity proofs.
- **Status:** REQUIRED

### Redaction & PII Handling Guidelines

- **Technology:** Redaction / PII handling standard
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Rules and patterns for detecting, redacting, and validating removal of secrets/PII from artifacts before storage.
- **Status:** REQUIRED

## EPIC-H — LAB TESTING & VERIFICATION ENGINE (H12)

### Telemetry & Tracing Standard

- **Technology:** OpenTelemetry (or equivalent tracing spec)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://opentelemetry.io/docs/ (pin specific spec/version)
- **Feature usage:** Canonical tracing/span format, propagation, and sampling guidance for verification jobs.
- **Status:** REQUIRED

### Structured Logging Standard

- **Technology:** Structured logging best-practices
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Canonical log fields, timestamp formats, severity values, and cardinality guidance.
- **Status:** REQUIRED

### Metrics Naming & Histogram Guidance

- **Technology:** Metrics naming conventions (counters/gauges/histograms)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Standard metric names and allowed labels for alerting and dashboards.
- **Status:** REQUIRED

### Retry & Idempotency Patterns

- **Technology:** Idempotency & Retry Patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Feature usage:** Classification of transient vs permanent failures, idempotency key formats, and retry/backoff defaults for verification jobs.
- **Status:** REQUIRED

### Template Injection Error Codes (internal policy)

- **Technology:** Error code registry (numeric mapping)
- **Version:** VERSIONED POLICY DOCUMENT (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-F/template-injection-error-codes.md`)
- **Feature usage:** Deterministic numeric mapping for failure modes returned by injectors (used by rollback automation and monitoring)

### Verification Result Intake (EPIC-G / G8)

- **Technology:** Verification result intake schema & persistent record
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created under `/docs/official-docs/EPIC-G/`) and JSON Schema spec: https://json-schema.org/specification.html
- **Feature usage:** Canonical machine-readable schema for verification intake payloads and persistent `VerificationAttempt` records used for audit, display, and reconciliation with `LabAttempt` ledger.
- **Status:** REQUIRED

- **Technology:** VerificationResult enum & status transitions
- **Version:** VERSIONED INTERNAL SPEC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-G/verification_result_enum.md` and `/docs/official-docs/EPIC-G/verification_status_transitions.md`)
- **Feature usage:** Defines canonical terminal results (e.g., `PASS`, `FAIL`), transient job states, allowed transitions, and handling on duplicates/retries.
- **Status:** REQUIRED

- **Technology:** Verification intake endpoint contract
- **Version:** VERSIONED INTERNAL SPEC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-G/verification_intake_endpoint.md`)
- **Feature usage:** Intake HTTP contract for verification results: headers, auth expectations, idempotency rules, expected responses, and example request/response pairs.
- **Status:** REQUIRED

- **Technology:** Verification log retention & sanitization policy
- **Version:** VERSIONED INTERNAL POLICY (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-G/verification_log_retention.md`)
- **Feature usage:** Rules for truncating/storing `logs Json`, TTL for detailed logs vs summaries, sanitization checklist for PII/secrets, and archival/export guidance.
- **Status:** REQUIRED
- **Status:** REQUIRED

## EPIC-H — Verification Job Model (H1)

### Prisma Schema & Migrations

- **Technology:** Prisma (schema + migrate)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.prisma.io/docs/concepts/components/prisma-schema
- **Feature usage:** Canonical Prisma `model` for `VerificationJob` and `LabAttempt`, migration generation, and safe migration recipes for production databases.
- **Status:** REQUIRED

### PostgreSQL DDL & Transaction Semantics

- **Technology:** PostgreSQL DDL / Transaction semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Guidance for unique constraints, concurrent index creation, foreign key semantics, and safe backfill strategies to enforce "one job per commit SHA".
- **Status:** REQUIRED

### Verification Intake JSON Schema

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for verification intake payloads, artifact metadata, and `logs` sanitization policy.
- **Status:** REQUIRED

## EPIC-H — Result Evaluation (H6)

### POSIX Exit & Signal Semantics

- **Technology:** POSIX / process exit and signal semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** The Open Group Base Specifications (POSIX): https://pubs.opengroup.org/onlinepubs/9699919799/
- **Feature usage:** Canonical interpretation of process exit codes, signal-terminated processes mapping, and cross-platform considerations used to deterministically map to PASS/FAIL/ERROR/INFRA-ERROR.
- **Status:** REQUIRED

### OCI Runtime & Container Exit Semantics

- **Technology:** OCI runtime specification / container exit behavior
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://github.com/opencontainers/runtime-spec
- **Feature usage:** How container runtimes surface exit codes, OOM, and runtime termination details to callers; used by `verification-runner` to classify infra errors.
- **Status:** REQUIRED

### Verification CLI Output Schema (JSON Schema)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical machine-readable output from `verify-lab` wrapper: `status`, `exitCode`, `signal`, `artifacts`, `logsSummary`, and metadata.
- **Status:** REQUIRED

### Language / Test Runner Conventions (reference)

- **Technology:** Test runner exit-code conventions (JUnit/pytest/Mocha/etc.)
- **Version:** VERSION UNKNOWN — MUST BE PINNED PER-RUNNER BEFORE IMPLEMENTATION

## EPIC-J — Lesson Content Architecture (J2)

### MDX (MDX.js)

- **Technology:** MDX
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://mdxjs.com/
- **Feature usage:** MDX authoring and runtime parsing rules for lessons containing JSX components and interactive widgets.
- **Status:** REQUIRED

### CommonMark (Markdown baseline)

- **Technology:** CommonMark
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://spec.commonmark.org/
- **Feature usage:** Canonical Markdown rendering rules used for diffs, previews, and parser configuration across authoring and production.
- **Status:** REQUIRED

### YAML frontmatter (YAML 1.2)

- **Technology:** YAML frontmatter
- **Version:** YAML 1.2
- **Official source:** https://yaml.org/spec/1.2/spec.html
- **Feature usage:** Canonical frontmatter parsing for lesson metadata and validation (ids, slugs, versions).
- **Status:** VERIFIED

## EPIC-J — Lesson → Lab Transition (J7)

### JSON Schema (acknowledgement event)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Machine-readable schema for `LessonAcknowledgement` and `AllowedFilesList` used by API validation and CI checks.
- **Status:** REQUIRED

### Audit & Immutability (Postgres append-only pattern)

- **Technology:** PostgreSQL DDL & append-only audit patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Schema patterns and transaction semantics for append-only acknowledgements and audit retention.
- **Status:** REQUIRED

### OWASP XSS Prevention / HTML Sanitization

- **Technology:** OWASP XSS Prevention / Sanitization guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html
- **Feature usage:** Sanitizer configuration and allowed HTML subset to prevent XSS and solution leakage in MDX rendering.
- **Status:** REQUIRED

### Semantic Versioning

- **Technology:** Semantic Versioning
- **Version:** SemVer 2.0.0
- **Official source:** https://semver.org/
- **Feature usage:** Formal versioning rules for lesson `version` fields and migration/versioning semantics.
- **Status:** VERIFIED

- **Official source:** Runner-specific docs (e.g., pytest: https://docs.pytest.org/)
- **Feature usage:** Mapping common test-runner exit codes and conventions into canonical `FAIL` vs `ERROR` categories.
- **Status:** REQUIRED

## EPIC-H — Step-Based Verification (H11)

### Step Mapping JSON Schema

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for `.forgea/steps.json` and the verification mapping document that links step names to verification checks.
- **Status:** REQUIRED

### PostgreSQL DDL & Transaction Semantics (Step State)

- **Technology:** PostgreSQL DDL / Transaction semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Safe DDL recipes and transactional patterns for per-step state persistence, uniqueness constraints, and advisory lock usage to prevent race conditions.
- **Status:** REQUIRED

### HTTP Idempotency & Retry Guidance

- **Technology:** HTTP / Idempotency guidance (RFC)
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Feature usage:** Defines retry and idempotency semantics for intake/enqueue endpoints used by `LabAttempt` and `VerificationJob` creation.
- **Status:** REQUIRED

### Step-Based Lab Design (EPIC-E)

### JSON Schema (Step Metadata)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification-links.html
- **Feature usage:** Canonical schema for `StepMetadata` and `LabConfig` used by EPIC-E / E5
- **Status:** VERIFIED

### Semantic Versioning

- **Technology:** Semantic Versioning
- **Version:** 2.0.0
- **Official source:** https://semver.org/spec/v2.0.0.html
- **Feature usage:** Versioning policy for step schema and lab-config artifacts
- **Status:** VERIFIED

### Glob / Pathspec (file binding grammar)

- **Technology:** Glob / Pathspec
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (choose and pin one: gitignore / minimatch / bash glob) — PIN REQUIRED
- **Feature usage:** Defines file pattern semantics for mapping files to steps in enforcement hooks
- **Status:** REQUIRED

This file defines **all official documentation** relied upon for design, verification,
planning, and enforcement decisions.

---

## 🛡️ RBAC & Access Control (EPIC-C)

### OWASP Access Control Cheat Sheet

- **Technology:** Access Control / RBAC guidance
- **Version:** LIVING DOCUMENT
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html
- **Used for:** Guidance on default-deny patterns, enforcement placement, and audit logging
- **Internal docs:** `/docs/official-docs/EPIC-C/rbac_policy.md`
- **Status:** VERIFIED

### Project RBAC Policy (internal)

- **Technology:** Project RBAC policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-C/rbac_policy.md`)
- **Used for:** Canonical role list, capability mappings, and enforcement architecture for EPIC-C features
- **Status:** REQUIRED

---

### Next.js Middleware & Edge Runtime

- **Technology:** Next.js middleware (App Router) & Edge runtime notes
- **Version:** 15.1.x
- **Official source:** https://nextjs.org/docs/app/building-your-application/routing/middleware
- **Feature usage:** Guides what may be imported in `middleware.ts`, redirect/rewrites at Edge, and safe usage patterns for cookie checks vs server-side session decoding.
- **Status:** VERIFIED

### Role Enum Policy (internal)

- **Technology:** Role enum / storage policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-C/role_enum_policy.md`)
- **Used for:** Decision whether to store roles as Postgres enum vs lookup table and migration guidance
- **Status:** REQUIRED

## 🚨 RULES (NON-NEGOTIABLE)

- **Only official documentation is allowed**
- **Versions MUST be explicit**
- **Links MUST be stable**
- If a required doc is missing or unverified → **Docs Gatekeeper MUST BLOCK planning**
- Internal docs under `/docs/official-docs/` are authoritative **only when backed by entries here**

---

## 🧠 Runtime

### Node.js

- **Technology:** Node.js
- **Version:** 20.x LTS
  **Allowed range:** `>=20.11.0 <21.0.0`
- **Official source:** [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/)
- **Used for:** Runtime execution, CI images, pnpm/Turborepo compatibility
- **Internal doc:** `/docs/official-docs/EPIC-A/node-version-policy.md`
- **Status:** VERIFIED

## 🕷️ Crawl & Fetching

### Robots Exclusion Standard (robots.txt)

- **Technology:** robots.txt / crawl rules
- **Version:** LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.robotstxt.org/
- **Used for:** Canonical crawling etiquette, seed rules, and allowed/disallowed paths for ingestion.
- **Internal doc:** `/docs/official-docs/EPIC-D/ingestion-operational-guidelines.md` (REQUIRED)
- **Status:** REQUIRED

### HTTP Semantics (RFC 7231)

- **Technology:** HTTP/1.1 semantics and status codes
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Used for:** Retry/backoff rules, caching semantics, and redirect handling for fetches.
- **Internal doc:** `/docs/official-docs/EPIC-D/ingestion-operational-guidelines.md`
- **Status:** VERIFIED

## 🔁 Repo → Session Binding (EPIC-G additions)

### GitHub Repositories API — Repo identity & fork semantics

- **Technology:** GitHub Repositories API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/reference/repos
- **Feature usage:** Authoritative repository identity (`repository.id`), fork and transfer behavior, and fields used to canonicalize mappings.

## EPIC-E — Snapshot & Preview (G12 additions)

### Snapshot metadata JSON Schema

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for snapshot metadata including `schema_version`, `capture_seed`, `captured_at`, and `snapshot_class` used by snapshot producers and consumers.
- **Status:** REQUIRED

### Snapshot storage & retention

- **Technology:** S3-compatible object storage or approved internal blobstore
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** AWS S3 docs or chosen blobstore documentation
- **Feature usage:** Defines immutability semantics, object layout, encryption, and lifecycle rules for snapshots.
- **Status:** REQUIRED

### Snapshot deletion & audit runbook

- **Technology:** Operational runbook + audit event schema
- **Version:** VERSIONED INTERNAL RUNBOOK (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md`)
- **Feature usage:** Defines tamper-evident deletion semantics, required audit events, and scheduled purge job behavior.
- **Status:** REQUIRED

### Snapshot QA tests (determinism & masking)

- **Technology:** CI job definitions and test harness
- **Version:** VERSIONED INTERNAL DOC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-E/qa_snapshot_tests.md`)
- **Feature usage:** CI and nightly regression tests ensuring snapshot determinism and masking rules are enforced.
- **Status:** REQUIRED

### Snapshot schema registry

- **Technology:** Internal registry manifest (YAML/JSON)
- **Version:** VERSIONED INTERNAL DOC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-E/snapshot_registry.md`)
- **Feature usage:** Tracks `schema_version` to doc mapping and HARD LOCK owner for schema changes.
- **Status:** REQUIRED

## EPIC-B — Audit Infrastructure (G6 additions)

### Audit event JSON Schema (AuditLog.metadata)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Authoritative, versioned schema for audit event `metadata` payloads. Implementers must validate and include `schema_version` on all audit events.
- **Status:** VERIFIED

### Audit Immutable Storage — Safe DDL & Migration Patterns

- **Technology:** Prisma Migrate / PostgreSQL migration patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.prisma.io/docs/concepts/components/prisma-migrate and https://www.postgresql.org/docs/
- **Feature usage:** Required safe DDL recipe for append-only audit tables, deduplication indexes (delivery_id), and backfill strategy.
- **Status:** REQUIRED

### Audit Retention & Archival (Compliance)

- **Technology:** Data retention policy + S3/Glacier archival
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal retention policy (to be created) and https://aws.amazon.com/s3/ for archival mechanics
- **Feature usage:** Specifies retention windows per `AuditAction`, permitted redaction, archival format, and restore runbook.
- **Status:** REQUIRED

### Audit Sink Specification

- **Technology:** Internal sink onboarding spec
- **Version:** VERSIONED INTERNAL DOC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-B/audit_sink_spec.md`)
- **Feature usage:** Onboarding checklist and minimal payload contract for external sinks (SIEM, S3, etc.)
- **Status:** REQUIRED

### Audit Reason Codes Registry

- **Technology:** Internal reason-code registry (JSON/YAML)
- **Version:** VERSIONED INTERNAL DOC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-B/audit_reason_codes.md`)
- **Feature usage:** Canonical rejection and reason codes used across producers and consumers.
- **Status:** REQUIRED
- **Status:** REQUIRED

### HTTP Caching — Cache-Control & TTL semantics (RFC 7234)

- **Technology:** HTTP Caching (RFC 7234)
- **Version:** RFC 7234
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7234
- **Feature usage:** TTL guidance for mapping caches and safe cache-control semantics.
- **Status:** REQUIRED

### Artifact Provenance Standards (in-toto / Sigstore)

- **Technology:** in-toto / Sigstore
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://in-toto.io/ and https://sigstore.dev/
- **Feature usage:** Defines metadata and signing expectations for produced snapshot artifacts, and verification steps for implementers and integration-checkers.
- **Status:** REQUIRED

### PostgreSQL Advisory Locks — Locking primitives

- **Technology:** PostgreSQL Advisory Locks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS
- **Feature usage:** Coordination primitive for atomic accept/reject updates and to prevent race conditions during mapping changes.
- **Status:** REQUIRED

## 🗄️ Storage & Persistence (Ingestion)

### S3-compatible Object Storage

- **Technology:** S3-compatible object storage
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
- **Used for:** Raw reference blob storage, lifecycle/retention rules, multipart upload.
- **Internal doc:** `/docs/official-docs/EPIC-D/raw-reference-storage-spec.md` (REQUIRED)
- **Status:** REQUIRED

## 🛡️ Safety & Sanitization

### OWASP Input Validation / Sanitization

- **Technology:** Input validation and sanitization guidance
- **Version:** LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cheatsheetseries.owasp.org/
- **Used for:** Sanitization pipeline rules for fetched content and metadata.
- **Internal doc:** `/docs/official-docs/EPIC-D/security-ingestion-threat-model.md` (REQUIRED)
- **Status:** VERIFIED

## 🧠 Embeddings & Vector DB

### Chroma (Vector DB)

- **Technology:** Chroma vector database
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.trychroma.com/
- **Used for:** Storage and retrieval of embeddings; defines metadata contract for ingestion.
- **Internal doc:** `/docs/official-docs/EPIC-D/ingestion-metadata-schema.md` (REQUIRED)
- **Status:** REQUIRED

## 🗄️ Storage & Versioning (EPIC-D)

### PostgreSQL JSONB

- **Technology:** PostgreSQL JSONB
- **Version:** 18.1
- **Official source:** https://www.postgresql.org/docs/
- **Used for:** Storing lesson metadata, version tables, and JSON queries for content.
- **Internal doc:** `/docs/official-docs/EPIC-D/storage-model.md` (REQUIRED)
- **Status:** VERIFIED

### Backup & Restore Guidance

- **Technology:** Backup and restore best practices for DBs
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** PostgreSQL backup docs and pinned cloud-provider backup docs
- **Used for:** Ensuring recoverability for immutable versions and meeting retention SLAs
- **Internal doc:** `/docs/official-docs/EPIC-D/retention-and-backup.md` (REQUIRED)
- **Status:** REQUIRED

### Data Retention & Compliance

- **Technology:** Data retention & legal hold guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Organization legal policy and external standards (GDPR/CCPA) — PIN REQUIRED
- **Used for:** Defining retention windows, archival, and legal-hold processes
- **Internal doc:** `/docs/official-docs/EPIC-D/retention-and-backup.md` (REQUIRED)
- **Status:** REQUIRED

---

## 📁 Repo & Code Surface Rules (EPIC-E)

### Repository Boundaries (internal)

- **Technology:** Repository boundary policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/repo-boundaries.md
- **Feature usage:** Defines locked vs editable paths, ownership, and globs used by E4 enforcement rules
- **Status:** PARTIAL

### Central Path-Policy Manifest (proposed)

- **Technology:** Path-policy manifest / canonical globs
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-E/repo-code-surface-policy.md (TO BE ADDED)
- **Feature usage:** Single source of truth for forbidden-path globs, locked-path lists, and machine-readable manifest consumed by linters/CI
- **Status:** REQUIRED

### Hook Framework (pre-commit / server-side hooks)

- **Technology:** Git hook / pre-commit framework
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (examples: https://pre-commit.com/, https://github.com/typicode/husky) — choose and pin one
- **Feature usage:** Local and server-side enforcement of forbidden-edit rules to prevent bypass
- **Status:** REQUIRED

### Immutable Versioning Patterns

- **Technology:** Content-addressed storage / append-only versioning patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Content-addressed storage design docs / git-like models (pin specific references if used)
- **Used for:** Guarantees about immutability and rollback semantics
- **Internal doc:** `/docs/official-docs/EPIC-D/versioning-semantics.md` (REQUIRED)
- **Status:** REQUIRED

### Embedding Provider (e.g., OpenAI)

- **Technology:** Embedding provider API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Provider-specific docs (e.g., https://platform.openai.com/docs/guides/embeddings)
- **Used for:** Embedding generation semantics and rate-limit guidance.
- **Internal doc:** `/docs/official-docs/EPIC-D/ingestion-operational-guidelines.md` (REQUIRED)
- **Status:** REQUIRED

---

## 🔐 Config Management (EPIC-E)

### forgea.config.json Schema

- **Technology:** JSON Schema (2020-12)
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Used for:** Machine-readable validation of `forgea.config.json` before activation/publish
- **Internal doc:** /docs/official-docs/EPIC-E/forgea.config.schema.json (TO BE ADDED)
- **Status:** REQUIRED

### Config Signature Format

- **Technology:** JSON Web Signature (JWS) + Ed25519 (EdDSA)
- **Version:** RFC 7515 (JWS), RFC 8037 (EdDSA)
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7515 and https://datatracker.ietf.org/doc/html/rfc8037
- **Used for:** Tamper-evidence and provenance for locked `forgea.config.json` artifacts
- **Internal doc:** /docs/official-docs/EPIC-E/forgea-config-signature.md (TO BE ADDED)
- **Status:** REQUIRED

### Lock Lifecycle & Operational Playbook

- **Technology:** Operational policy for config locks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-E/forgea-config-locking.md (TO BE ADDED)
- **Used for:** Defines states (draft/published/locked), transitions, approval gates, and emergency overrides
- **Status:** REQUIRED

---

## 📦 Package Manager

### pnpm

- **Technology:** pnpm
- **Version:** 10.4.x
- **Official source:** [https://pnpm.io/](https://pnpm.io/)
- **Used for:** Workspace package discovery, deterministic installs, CI frozen-lockfile semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/pnpm-workspaces.md`
  - `/docs/official-docs/EPIC-A/pnpm-workspace-policy.md`
  - `/docs/official-docs/EPIC-A/pnpm-ci-guidelines.md`

- **Status:** VERIFIED

---

## 🏗️ Build & Orchestration

### Turborepo

- **Technology:** Turborepo
- **Version:** 2.1.x
- **Official sources:**
  - [https://turborepo.org/docs](https://turborepo.org/docs)
  - [https://turborepo.org/docs/reference/configuration](https://turborepo.org/docs/reference/configuration)
  - [https://turborepo.org/docs/features/caching](https://turborepo.org/docs/features/caching)
  - [https://turborepo.org/schema.json](https://turborepo.org/schema.json)

- **Used for:** Pipeline orchestration, task dependency graph, build caching & CI determinism
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A3_turborepo_official.md`
  - `/docs/official-docs/EPIC-A/turborepo.md`
  - `/docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md`

- **Status:** VERIFIED

---

## 🧹 Formatting

### Prettier

- **Technology:** Prettier
- **Version:** 3.2.x
- **Official source:** [https://prettier.io/docs/en/index.html](https://prettier.io/docs/en/index.html)
- **Used for:** Canonical formatting rules, CI formatting checks
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/prettier.md`
  - `/docs/official-docs/EPIC-A/prettier-ci-guidelines.md`

- **Status:** VERIFIED

---

## 🧪 Linting & Boundaries

### ESLint

- **Technology:** ESLint
- **Version:** 9.39.x
- **Official source:** [https://eslint.org/docs/latest](https://eslint.org/docs/latest)
- **Used for:** Static analysis, Flat Config–based enforcement
- **Internal doc:** `/docs/official-docs/EPIC-A/eslint-ci-guidelines.md`
- **Status:** VERIFIED

### eslint-plugin-boundaries

- **Technology:** eslint-plugin-boundaries
- **Version:** 4.2.x
- **Official source:** [https://github.com/bryanrsmith/eslint-plugin-boundaries](https://github.com/bryanrsmith/eslint-plugin-boundaries)
- **Used for:** Enforcing repository import boundaries
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/eslint-boundaries.md`
  - `/docs/official-docs/EPIC-A/repo-boundaries.md`

- **Status:** VERIFIED

---

## 🌍 Environment Handling

### dotenv

- **Technology:** dotenv
- **Version:** 16.4.x
- **Official source:** [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
- **Used for:** `.env` loading in non-Next runtimes
- **Internal doc:** `/docs/official-docs/EPIC-A/dotenv.md`
- **Status:** VERIFIED

### Next.js — Environment Variables

- **Technology:** Next.js (App Router)
- **Version:** 15.1.x
- **Official source:** [https://nextjs.org/docs/app/building-your-application/environment-variables](https://nextjs.org/docs/app/building-your-application/environment-variables)
- **Used for:** `.env.*` resolution rules, `NEXT_PUBLIC_` exposure semantics
- **Internal doc:** `/docs/official-docs/EPIC-A/nextjs-environment-variables.md`
- **Status:** VERIFIED

---

## 🧠 Language

### TypeScript

- **Technology:** TypeScript
- **Version:** 5.9.3
- **Official sources:**
  - [https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)
  - [https://www.typescriptlang.org/docs/handbook/project-references.html](https://www.typescriptlang.org/docs/handbook/project-references.html)

- **Used for:** Compiler behavior, project references, module resolution semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A4_typescript_official.md`
  - `/docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md`

- **Status:** VERIFIED

---

## 🗂️ Repository Governance

### Git & .gitignore

- **Technology:** Git
- **Version:** N/A
- **Official source:** [https://git-scm.com/docs](https://git-scm.com/docs)
- **Internal doc:** `/docs/official-docs/EPIC-A/git-and-gitignore.md`
- **Status:** VERIFIED

---

## 🔐 Authentication Frameworks

### NextAuth

- **Technology:** NextAuth
- **Version:** VERSION UNKNOWN — MUST BE PINNED
- **Official source:** https://next-auth.js.org/
- **Used for:** Authentication flows, adapters (PrismaAdapter), event hooks for `createUser`/`signIn`.
- **Internal docs:** `/docs/official-docs/EPIC-C/nextauth_guidelines.md` (REQUIRED)
- **Feature usage:** EPIC-C / C4 — User Provisioning Logic
- **Status:** REQUIRED

---

## 📝 Authentication Docs (EPIC-C)

- **Doc path:** /docs/official-docs/EPIC-C/auth-architecture-overview.md
- **Purpose:** High-level auth architecture overview (flow diagram, components)
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/session-model-and-schema.md
- **Purpose:** Prisma session and auth schema explanation and canonical model selection
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/provider-setup.md
- **Purpose:** Provider configuration and env var requirements
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/credentials-flow.md
- **Purpose:** Credentials `authorize()` server-side flow documentation and security notes
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/audit-and-compliance.md
- **Purpose:** AuditService behavior, scrub rules, retention guidance
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/middleware-and-protected-routes.md
- **Purpose:** Edge middleware responsibilities and RBAC enforcement guidance
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/operational-notes-and-env.md
- **Purpose:** Environment variables and operational notes
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/security-assumptions.md
- **Purpose:** Security assumptions, known limitations, and mitigations
- **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-C/acceptance-criteria.md
- **Purpose:** Testable acceptance criteria for auth subsystem
- **Status:** REQUIRED

### GitHub OAuth (provider docs)

- **Technology:** GitHub OAuth
- **Version:** N/A (refer to provider docs)
- **Official source:** https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
- **Used for:** Provider-specific profile fields and account linking semantics used by NextAuth's GitHub provider.
- **Internal docs:** `/docs/official-docs/EPIC-C/third-party-provider-guidelines.md` (REQUIRED)
- **Feature usage:** EPIC-C / C4 — User Provisioning Logic
- **Status:** REQUIRED

---

## 🛡️ CSRF & Request Forgery

### OWASP CSRF Prevention Cheat Sheet

## 🔐 Session Management

### OWASP Session Management Cheat Sheet

### EditorConfig

---

## 🗄️ Database / ORM

### Prisma

- **Technology:** Prisma
- **Version:** 7.3.0
- **Official source:** [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/prisma_official.md`
  - `/docs/official-docs/EPIC-B/prisma_migrations.md`

- **Status:** VERIFIED

---

## 🗃️ Database Engine

### PostgreSQL

- **Technology:** PostgreSQL
- **Version:** **18.1**
- **Allowed range:** `>=18.1 <19.0`
- **Official source:** [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- **Internal doc:** `/docs/official-docs/EPIC-B/postgresql.md`
- **Status:** VERIFIED

---

## 📚 Lesson Content & Pedagogy (EPIC-D)

### CommonMark (Markdown Spec)

- **Technology:** CommonMark / Markdown spec
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://spec.commonmark.org
- **Used for:** Canonical lesson content rendering, sanitization rules, markdown-to-html pipelines
- **Internal doc:** /docs/official-docs/EPIC-D/lesson_vs_blog_split.md (REQUIRED)
- **Status:** REQUIRED

### JSON Schema (Lesson Schema)

- **Technology:** JSON Schema
- **Version:** 2020-12 (RECOMMENDED — PIN BEFORE FREEZE) / VERSION UNKNOWN — MUST BE PINNED
- **Official source:** https://json-schema.org
- **Used for:** Canonical Lesson JSON schema, validation, and codegen for storage and APIs
- **Internal doc:** /docs/official-docs/EPIC-D/lesson_schema_guidelines.md (REQUIRED)
- **Status:** REQUIRED

### WCAG (Accessibility)

- **Technology:** Web Content Accessibility Guidelines
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.w3.org/TR/WCAG21/
- **Used for:** Accessibility acceptance criteria for lesson content and interactive lab links
- **Internal doc:** /docs/official-docs/EPIC-D/accessibility_guidelines.md (REQUIRED)
- **Status:** REQUIRED

### Content Licensing (Creative Commons)

- **Technology:** Content licensing guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://creativecommons.org/licenses/
- **Used for:** Publication model, attribution, and reuse policies for lessons and AI-assisted content
- **Internal doc:** /docs/official-docs/EPIC-D/content_licensing.md (REQUIRED)
- **Status:** REQUIRED

### Pedagogy Reference (Bloom's Taxonomy)

- **Technology:** Learning objectives & taxonomy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/
- **Used for:** Difficulty classification, objective framing, and inclusion gating
- **Internal doc:** /docs/official-docs/EPIC-D/lesson_philosophy.md (REQUIRED)
- **Status:** REQUIRED

---

## ⚙️ Lesson Generation & RAG (EPIC-D)

### Chroma (Vector DB)

- **Technology:** Chroma (vector database)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.trychroma.com/docs
- **Used for:** Storing embeddings and RAG retrieval used by lesson generation
- **Internal doc:** /docs/official-docs/EPIC-D/vector_db_guidelines.md (REQUIRED)
- **Status:** REQUIRED

### Prompting & Model Provider Guides

- **Technology:** Model provider prompting & embeddings guides
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** e.g., https://platform.openai.com/docs/guides/embeddings
- **Used for:** Prompt templates, embedding generation, cost & safety guidelines
- **Internal doc:** /docs/official-docs/EPIC-D/prompt_manifest.md (REQUIRED)
- **Status:** REQUIRED

---

## 📰 Blog System (EPIC-D)

### Blog Schema

- **Technology:** Blog content schema
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-D/blog_schema.md`)
- **Used for:** Canonical blog fields, storage layout, and validation for publishing
- **Internal doc:** /docs/official-docs/EPIC-D/blog_schema.md
- **Status:** REQUIRED

### Blog Publication Workflow

- **Technology:** Publication workflow & gating
- **Version:** N/A (internal)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-D/blog_publication_workflow.md`)
- **Used for:** Stages (generate → review → publish), editorial checks, license validation, and feature-flag guidance
- **Internal doc:** /docs/official-docs/EPIC-D/blog_publication_workflow.md
- **Status:** REQUIRED

### PostgreSQL Extensions (pgcrypto, uuid-ossp)

- **Version:** Bundled with PostgreSQL 18.1
- **Official sources:**
  - [https://www.postgresql.org/docs/current/pgcrypto.html](https://www.postgresql.org/docs/current/pgcrypto.html)
  - [https://www.postgresql.org/docs/current/uuid-ossp.html](https://www.postgresql.org/docs/current/uuid-ossp.html)

- **Internal doc:** `/docs/official-docs/EPIC-B/postgres-extensions.md`
- **Status:** VERIFIED

### Immutability Triggers

- **Version:** PostgreSQL 18.1
- **Official source:** [https://www.postgresql.org/docs/current/sql-createtrigger.html](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- **Internal doc:** `/docs/official-docs/EPIC-B/immutability-triggers.md`
- **Status:** VERIFIED

---

## 🔐 Authentication & OAuth (NEW)

### OAuth 2.0 (RFC 6749)

- **Technology:** OAuth 2.0
- **Version:** RFC 6749 (October 2012)
- **Official source:** https://datatracker.ietf.org/doc/html/rfc6749
- **Used for:** Authorization flows, redirect URI rules, token and refresh handling for external providers
- **Internal doc:** `/docs/official-docs/authentication/oauth2.md`
- **Status:** VERIFIED

### OpenID Connect Core

- **Technology:** OpenID Connect
- **Version:** Core 1.0 (Final)
- **Official source:** https://openid.net/specs/openid-connect-core-1_0.html
- **Used for:** ID token validation, user identity claims, and identity flow decisions
- **Internal doc:** `/docs/official-docs/authentication/openid-connect.md`
- **Status:** VERIFIED

### GitHub OAuth (provider)

- **Technology:** GitHub OAuth Apps
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
- **Used for:** Provider-specific registration and scope definitions for GitHub authentication
- **Internal doc:** `/docs/official-docs/authentication/provider-guides/github.md`
- **Status:** REQUIRED

---

## 🔖 Versioning & Immutability (EPIC-E)

### Semantic Versioning (SemVer)

- **Technology:** Semantic Versioning
- **Version:** 2.0.0
- **Official source:** https://semver.org/spec/v2.0.0.html
- **Used for:** Canonical versioning rules for published lab artifacts and schema changes
- **Internal doc:** `/docs/official-docs/EPIC-E/versioning_policy.md`
- **Status:** VERIFIED

### JSON Schema (Publish Records)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification-links.html
- **Used for:** Validation of publish payloads and version records
- **Internal doc:** `/docs/official-docs/EPIC-E/publish_api_schema.md`
- **Status:** VERIFIED

### JSON Web Signature (JWS)

- **Technology:** JSON Web Signature (JWS)
- **Version:** RFC 7515 (2015)

## EPIC-G — Verification Jobs & Queue Contract (G7)

### VerificationJob data model (internal)

- **Technology:** VerificationJob Prisma model / message schema
- **Version:** VERSIONED INTERNAL DOC (to be created)
- **Official source:** Internal (/docs/official-docs/EPIC-G/verification-job-contract.md)
- **Feature usage:** Canonical `VerificationJob` schema, idempotency key derivation, TTL, and priority semantics used by `verification-runner` consumers.
- **Status:** REQUIRED

### Queue technology (choose and pin)

- **Technology:** AWS SQS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- **Feature usage:** Visibility timeout, ack semantics, DLQ configuration, and replay behavior for verification jobs.
- **Status:** REQUIRED

- **Technology:** Redis Streams
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://redis.io/docs/manual/streams/
- **Feature usage:** Consumer groups and durable streaming semantics for verification job delivery and replay.
- **Status:** REQUIRED

- **Technology:** Postgres job-table patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Transactional enqueue patterns, uniqueness constraints, and DLQ semantics for verification jobs.
- **Status:** REQUIRED

### Prisma schema & migrations

- **Technology:** Prisma schema & migrations
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.prisma.io/docs
- **Feature usage:** Where `VerificationJob` model should be added (`packages/schema/prisma/schema.prisma`) and how to write migrations and rollbacks.
- **Status:** REQUIRED

### Postgres transactional patterns

- **Technology:** PostgreSQL transactions & advisory locks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Safe upsert, unique constraints, and advisory locks to prevent duplicate job creation under concurrency.
- **Status:** REQUIRED

## EPIC-G — Webhook Intake & Security (G1)

### GitHub Webhooks — Events, Signature, Delivery Semantics

- **Technology:** GitHub Webhooks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Event names, payload formats, `X-Hub-Signature-256`, `X-GitHub-Delivery`, and provider retry/backoff semantics — used for signature verification, deduplication, and delivery classification.
- **Status:** REQUIRED

### HMAC (RFC 2104) & SHA-256 (FIPS)

- **Technology:** HMAC (RFC 2104) / SHA-256 (FIPS 180)
- **Version:** RFC 2104 (stable) / FIPS 180-4
- **Official sources:** https://datatracker.ietf.org/doc/html/rfc2104 and https://csrc.nist.gov/publications/detail/fips/180/4
- **Feature usage:** Authoritative construction of keyed MACs and hash primitives used for webhook signature verification.
- **Status:** VERIFIED

### Timing-safe comparison (runtime)

- **Technology:** Node.js `crypto.timingSafeEqual` (or equivalent platform primitive)
- **Version:** Node.js 20.x (project runtime)
- **Official source:** https://nodejs.org/docs/latest
- **Feature usage:** Constant-time comparison for HMAC signatures to mitigate timing attacks.
- **Status:** VERIFIED

### HTTP Retry & Idempotency Patterns

- **Technology:** HTTP semantics & idempotency patterns
- **Version:** RFC 7231 (stable); provider retry guidance: VERSION UNKNOWN — MUST BE PINNED
- **Official sources:** https://datatracker.ietf.org/doc/html/rfc7231 and provider-specific docs (e.g., GitHub webhooks retry behavior)
- **Feature usage:** Guides retry/backoff classifications and idempotency key lifetime decisions.
- **Status:** REQUIRED

### Durable Queue & DLQ Options

- **Technology:** AWS SQS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- **Feature usage:** Durable enqueue semantics, visibility timeout, DLQ integration for webhook persistence.
- **Status:** REQUIRED

- **Technology:** Redis Streams
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://redis.io/docs/manual/streams/
- **Feature usage:** Streaming consumer groups and durable processing choices for high-throughput webhook intake.
- **Status:** REQUIRED

- **Technology:** Postgres job-table patterns
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** DB-backed queue patterns for transactional persistence and DLQ semantics.
- **Status:** REQUIRED

### Next.js / Hosting Raw-Body Passthrough

- **Technology:** Next.js App Routes and hosting platform raw-body behavior
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (pin Next.js and platform release)
- **Official sources:** https://nextjs.org/docs and platform-specific docs (Vercel/GCP/Cloud Run/ALB/NGINX)
- **Feature usage:** Correct raw-body access required to compute HMAC over exact bytes; informs LB/proxy header config.
- **Status:** REQUIRED

### Secrets Storage Guidance

- **Technology:** HashiCorp Vault / Cloud KMS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.vaultproject.io/docs
- **Feature usage:** Secure storage, rotation, and audit of webhook secrets used by handlers.
- **Status:** REQUIRED
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7515
- **Used for:** Signing publish attestations and immutability proofs
- **Internal doc:** `/docs/official-docs/EPIC-E/audit_and_signatures.md`
- **Status:** VERIFIED

### Content-Addressed Storage / CID

- **Technology:** Content-Addressed Storage (CID)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (e.g., multiformats CID spec) — PIN REQUIRED
- **Used for:** Immutable blob addressing for published lab snapshots and deduplication
- **Internal doc:** `/docs/official-docs/EPIC-E/content_addressing.md`
- **Status:** REQUIRED

### Google OAuth (provider)

- **Technology:** Google OAuth 2.0
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developers.google.com/identity/protocols/oauth2
- **Used for:** Provider-specific registration and scope guidance for Google accounts
- **Internal doc:** `/docs/official-docs/authentication/provider-guides/google.md`
- **Status:** REQUIRED

### Secret Management (Vault / Cloud Secret Managers)

- **Technology:** HashiCorp Vault / AWS Secrets Manager / GCP Secret Manager
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official sources:** https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html | https://cloud.google.com/secret-manager/docs
- **Used for:** Secure storage and rotation of OAuth client ids and secrets
- **Internal doc:** `/docs/official-docs/authentication/secret-management.md`
- **Status:** REQUIRED

### JSONB Standards

- **Version:** PostgreSQL 18.1
- **Official source:** [https://www.postgresql.org/docs/current/datatype-json.html](https://www.postgresql.org/docs/current/datatype-json.html)
- **Internal doc:** `/docs/official-docs/EPIC-B/jsonb-standards.md`
- **Status:** VERIFIED

---

## 🏗️ Infrastructure Provisioning (IaC)

### Terraform

- **Technology:** Terraform
- **Version:** **1.6.6**
- **Allowed range:** `>=1.6.0 <2.0.0`
- **Official source:** [https://developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/db-provisioning.md`
  - `/docs/official-docs/EPIC-B/terraform-language.md`
  - `/docs/official-docs/EPIC-B/terraform-modules.md`
  - `/docs/official-docs/EPIC-B/terraform-security.md`

- **Status:** VERIFIED

---

## 🐳 Local Runtime

### Docker Engine

- **Technology:** Docker Engine
- **Version:** 25.0.x
- **Official source:** [https://docs.docker.com/engine/](https://docs.docker.com/engine/)
- **Status:** VERIFIED

---

## 📦 Snapshot & Artifact Storage

### Immutable Snapshot / Artifact Storage (S3-like)

- **Technology:** Immutable artifact / snapshot storage (S3-compatible)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html (or equivalent provider)
- **Feature usage:** Durable, immutable storage for lab snapshots and prior attempts; defines write-once semantics and retrieval APIs used by regression safety workflows.
- **Internal docs:** `/docs/official-docs/EPIC-E/snapshot-storage.md` (REQUIRED)
- **Status:** REQUIRED

## ⚙️ CI / Workflow Orchestration

### GitHub Actions (Workflows & Triggers)

- **Technology:** GitHub Actions
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/actions
- **Feature usage:** Defines workflow trigger semantics, permissions, and recommended safe patterns for triggering verification and snapshot rebuilds on lab edits.
- **Internal docs:** `/docs/official-docs/EPIC-E/ci-workflows.md` (REQUIRED)
- **Status:** REQUIRED

### Docker Compose

- **Technology:** Docker Compose
- **Version:** v2.25.x
- **Compose Spec:** 3.9
- **Official source:** [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/docker-compose.md`
  - `/docs/official-docs/EPIC-B/docker-build-policy.md`
  - `/docs/official-docs/EPIC-B/docker-hardening.md`
  - `/docs/official-docs/EPIC-B/docker-secrets.md`

- **Status:** VERIFIED

---

## 🔗 External APIs

### GitHub REST API

- **Version:** 2022-11-28
- **Official source:** [https://docs.github.com/en/rest](https://docs.github.com/en/rest)
- **Internal docs:** `/docs/official-docs/EPIC-B/github_*.md`
- **Status:** VERIFIED

### GitHub Webhooks & Events

- **Technology:** GitHub Webhooks & Events
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Webhook payload fields (`repository.id`, `repository.html_url`) and event semantics used by `apps/forgea-labs/app/api/webhooks/github/route.ts` to map pushes to `LabSession`.
- **Status:** REQUIRED

---

## 🔒 Data Protection

### GDPR

- **Version:** REGULATION (EU) 2016/679
- **Official source:** [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- **Internal doc:** `/docs/official-docs/privacy-and-retention.md`
- **Status:** VERIFIED

---

## 💳 Billing

### Stripe API

- **Technology:** Stripe
- **Version:** **2023-10-16**
- **Official source:** [https://stripe.com/docs/api](https://stripe.com/docs/api)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/billing-provider.md`
  - `/docs/official-docs/EPIC-B/stripe-errors.md`
  - `/docs/official-docs/EPIC-B/stripe-idempotency.md`

- **Status:** VERIFIED

---

## 🔐 Audit & Logging

### OWASP Logging Cheat Sheet

- **Version:** Living document
- **Official source:** [https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md`
  - `/docs/official-docs/EPIC-B/audit-triggers.md`
  - `/docs/official-docs/EPIC-B/log-redaction.md`
  - `/docs/official-docs/EPIC-B/log-redaction.md`

---

## EPIC-H — Lab Testing & Verification Engine (H5 additions)

### POSIX Process Model & Signals

- **Technology:** POSIX process model & signals
- **Version:** POSIX.1-2017
- **Official source:** https://pubs.opengroup.org/onlinepubs/9699919799/
- **Feature usage:** Canonical exit-code and signal semantics used to map process termination to normalized verification results (PASS/FAIL/ERROR/INFRA-ERROR).
- **Status:** REQUIRED

### RFC 3339 — Timestamp Format

- **Technology:** RFC 3339 (timestamps)
- **Version:** RFC 3339
- **Official source:** https://datatracker.ietf.org/doc/html/rfc3339
- **Feature usage:** Canonical timestamp format for `started_at`, `stopped_at`, and recorded artifact timestamps in verification results.
- **Status:** REQUIRED

### OCI Runtime Specification

- **Technology:** OCI Runtime Specification
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://github.com/opencontainers/runtime-spec
- **Feature usage:** Defines container signal forwarding and exit semantics when runners are executed in containers.
- **Status:** REQUIRED

### EPIC-H — Internal docs to produce (required)

- **Doc path:** /docs/official-docs/EPIC-H/execution_contract.md
  - **Status:** REQUIRED
  - **Feature usage:** Formal execution contract (invocation, stdout/stderr capture, truncation, encoding, runtime envs, metadata required)

- **Doc path:** /docs/official-docs/EPIC-H/exit_code_mapping.md
  - **Status:** REQUIRED
  - **Feature usage:** Canonical exit-code and signal → normalized result mapping table used by `verification-runner` and H10 ingestion.

- **Doc path:** /docs/official-docs/EPIC-H/artifact_hashing.md
  - **Status:** REQUIRED
  - **Feature usage:** Canonical hashing algorithm (sha256 / FIPS 180-4), canonical serialization rules, and helper usage examples.

- **Doc path:** /docs/official-docs/EPIC-H/verification_result_schema.md
  - **Status:** REQUIRED
  - **Feature usage:** JSON Schema (2020-12) for persisted verification results and H10 API ingestion.

  - `/docs/official-docs/EPIC-B/Log-protection.md`

- **Status:** VERIFIED

## 🧪 Testing & Verification (EPIC-C)

### Playwright (E2E)

- **Technology:** Playwright
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://playwright.dev/
- **Used for:** Browser-driven E2E tests for auth/provider flows and UI flows requiring OAuth interactions
- **Internal docs:** `/docs/official-docs/EPIC-C/playwright_config_and_harness.md`
- **Status:** REQUIRED

### Test Runner (Vitest / Jest)

- **Technology:** Vitest or Jest
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://vitest.dev/ or https://jestjs.io/
- **Used for:** Unit and integration tests for auth logic and adapters
- **Internal docs:** `/docs/official-docs/EPIC-C/testing_policy.md`
- **Status:** REQUIRED

### CI Test Workflow (internal)

- **Technology:** GitHub Actions / Turborepo
- **Version:** Node.js 20.x
- **Official source:** https://docs.github.com/en/actions
- **Used for:** Running `verify-and-lint`, `build`, and newly required `test:e2e` steps in CI
- **Internal docs:** `/docs/official-docs/EPIC-C/ci_test_workflow.md`
- **Status:** REQUIRED

---

## 🛡️ Compliance References

### NIST SP 800-92

- **Version:** 2006
- **Official source:** [https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)
- **Status:** VERIFIED

### PCI DSS

- **Version:** 4.0
- **Official source:** [https://www.pcisecuritystandards.org](https://www.pcisecuritystandards.org)
- **Status:** VERIFIED

### SOC 2 (AICPA)

- **Version:** **Trust Services Criteria 2022**
- **Official source:** [https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html)
- **Status:** VERIFIED

### Elastic Common Schema (ECS)

- **Version:** **8.11**
- **Official source:** [https://www.elastic.co/guide/en/ecs/current/index.html](https://www.elastic.co/guide/en/ecs/current/index.html)
- **Status:** VERIFIED

---

## 🔎 Audit & Logging (EPIC-C)

### OWASP Logging Cheat Sheet

- **Technology:** Logging / Audit guidance
- **Version:** LIVING DOCUMENT
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- **Used for:** Guidance on legal-grade logging, redaction, and audit-event classification
- **Internal docs:** `/docs/official-docs/EPIC-C/audit_policy.md`
- **Status:** VERIFIED

### Audit Policy (internal)

- **Technology:** Audit logging policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-C/audit_policy.md`)
- **Used for:** Classifying which `AuditAction` values require immutable persistence, retention windows, and allowed redaction
- **Status:** REQUIRED

### Audit Retention & Archival (internal)

- **Technology:** Audit retention policy and runbook
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-C/audit_retention_and_archival.md`)
- **Used for:** Operational steps for archival jobs, recovery, and acceptance tests
- **Status:** REQUIRED

### Audit Sink Specification (internal)

- **Technology:** Audit sink schema and onboarding
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-C/audit_sink_spec.md`)
- **Used for:** Defining `FORGEA_AUDIT_SINK_URL` and `FORGEA_SECURITY_ALERT_SINK_URL` payloads, auth, and retries
- **Status:** REQUIRED

## 🔐 Session & Cookie Standards (Required for Auth)

### OWASP Session Management Cheat Sheet

- **Technology:** OWASP Session Management Cheat Sheet
- **Version:** Living document
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- **Feature usage:** Session cookie flag recommendations, session rotation, idle/absolute timeout guidance
- **Status:** VERIFIED

### RFC 6265 — HTTP State Management Mechanism

- **Technology:** RFC 6265
- **Version:** RFC 6265 (2011)
- **Official source:** https://datatracker.ietf.org/doc/html/rfc6265
- **Feature usage:** Authoritative cookie semantics (`Secure`, `HttpOnly`, `SameSite`) and cookie lifecycle semantics
- **Status:** VERIFIED

### NextAuth Runtime Guidance (Docs)

- **Technology:** next-auth (runtime docs)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://next-auth.js.org/
- **Feature usage:** Maps policy to `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, NextAuth `cookies` config, and `session.maxAge`
- **Status:** REQUIRED

---

## ✅ FINAL STATE (NOW TRUE)

- All tools **version-pinned**
- All internal docs **backed by official sources**
- No `VERSION UNKNOWN`
- No `REQUIRED`
- Docs Gatekeeper **UNBLOCKED**
- Planner can proceed **without ambiguity**

---

## 🔐 Authentication Libraries (NOT YET REGISTERED)

### NextAuth (next-auth)

- **Technology:** next-auth
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://next-auth.js.org/
- **Used for:** Application session management and OAuth providers (GitHub, Credentials) in `/apps/forgea-labs` implementation
- **Feature usage:** `apps/forgea-labs/auth.ts`, `apps/forgea-labs/auth.config.ts`, `apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`
- **Status:** REQUIRED

### Auth.js (@auth/core)

- **Technology:** @auth/core (Auth.js)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://authjs.dev/
- **Used for:** Alternative auth core library; may be used with `@auth/prisma-adapter` for Prisma integration.
- **Feature usage:** Potential migration target; adapters and handler API differ from next-auth v4.
- **Status:** REQUIRED

### Adapters

- **Technology:** @next-auth/prisma-adapter
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://github.com/nextauthjs/next-auth
- **Used for:** Prisma adapter for NextAuth v4
- **Status:** REQUIRED

- **Technology:** @auth/prisma-adapter
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://authjs.dev/plugins/prisma
- **Used for:** Prisma adapter for Auth.js
- **Status:** REQUIRED

---

---

## 📦 Repository Templating & Cloning (EPIC-E)

### GitHub Template Repositories

- **Technology:** GitHub Template Repositories
- **Version:** N/A (stable docs)
- **Official source:** https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
- **Feature usage:** Canonical guidance for instantiating new labs from a base template; informs whether to use UI templates or API automation for EPIC-E E1.
- **Status:** VERIFIED

### CODEOWNERS (Ownership + locking)

- **Technology:** GitHub CODEOWNERS
- **Version:** N/A (file format)
- **Official source:** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- **Feature usage:** Defines enforceable ownership for immutable/locked surfaces inside the lab template.
- **Status:** VERIFIED

### GitHub Actions (CI for clones)

- **Technology:** GitHub Actions
- **Version:** VERSION UNKNOWN — pin action versions as required
- **Official source:** https://docs.github.com/en/actions
- **Feature usage:** Reusable workflow templates and verification steps for cloned lab repositories or packages.
- **Status:** VERIFIED

### GitHub REST API (repo creation & templates)

- **Technology:** GitHub REST API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest
- **Feature usage:** Programmatic repo creation and template instantiation; token scope guidance for automation.
- **Status:** VERIFIED

### Internal docs required for EPIC-E

- **Doc path:** /docs/official-docs/EPIC-E/lab-template-spec.md
  - **Purpose:** Canonical file layout and locked-surface spec for the base SaaS template.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/clone-strategy.md
  - **Purpose:** Cloning strategy, token scopes, and clone-time replacements.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/ci-guidelines.md
  - **Purpose:** CI verification templates and expected verification output format.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/locked-surfaces-policy.md
  - **Purpose:** Enforcement plan for immutable surfaces, CODEOWNERS templates, and enforcement scripts.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/storage_model_v1.md
  - **Purpose:** Human-readable storage model for lab metadata and full lab JSON storage; includes table/collection designs and index recommendations.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/api_contracts_openapi_v1.yaml
  - **Purpose:** OpenAPI 3.1.0 contract for lab CRUD APIs, listing/pagination, and filtering semantics.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/migrations_and_ci.md
  - **Purpose:** Migration tooling conventions, file locations, and CI jobs to run migrations and smoke tests.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/indexing_and_search.md
  - **Purpose:** Postgres JSONB indexing recipes, GIN index patterns, and search integration notes.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/cache_and_retention.md
  - **Purpose:** Cache recommendations, snapshot retention policy, and purge workflows tied to legal retention.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/canonical_lab_schema_v1.md
  - **Purpose:** Human-readable canonical lab schema v1 (fields, rationale, compatibility rules).
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/canonical_lab_schema_v1.json
  - **Purpose:** Machine-readable JSON Schema (2020-12) for canonical lab definitions; used by validators and CI.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/examples/canonical_lab_examples.md
  - **Purpose:** Example valid and invalid lab definitions, edge cases, and test vectors for QA.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/security_review.md
  - **Purpose:** Security Sentinel findings, forbidden-fields, and CI-blocking rules for schema v1.
  - **Status:** REQUIRED

- **Doc path:** /docs/official-docs/EPIC-E/approval_gate.md
  - **Purpose:** HARD LOCK approval gate policy, named owners, and audit-trail requirements for publishing schema v1.
  - **Status:** REQUIRED

### Reproducible Builds / Deterministic Testing Guidance (EPIC-E)

- **Technology:** Reproducible Builds / Deterministic Testing Guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://reproducible-builds.org/
- **Feature usage:** Defines deterministic capture and hermetic runtime guidance for snapshot semantics and QA acceptance tests (EPIC-E / E7)
- **Status:** REQUIRED

### Data Protection & Retention (EPIC-E)

- **Technology:** Data Protection / Privacy Guidance (GDPR / CCPA)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Organization legal policy (pin exact guidance)
- **Feature usage:** Governs retention, access control, and purge policies for stored snapshots and previews (EPIC-E / E7)
- **Status:** REQUIRED

---

## 🔭 Observability & Telemetry

### OpenTelemetry Spec

- **Technology:** OpenTelemetry (tracing / metrics / logs semantic conventions)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://opentelemetry.io/specs/
- **Feature usage:** Canonical fields, span attributes, and log/metric naming used by lab harnesses to emit deterministic symptoms for failure types.
- **Internal docs:** `/docs/official-docs/observability/opentelemetry-guidelines.md` (REQUIRED)
- **Status:** REQUIRED

---

## 🧩 Schema & Validation

### JSON Schema (2020-12)

- **Technology:** JSON Schema (validation)
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification-links.html
- **Feature usage:** Canonical schema and validation semantics for generated lab artifacts, used by Implementer to enforce required/forbidden fields and rejection payloads.
- **Internal docs:** `/docs/official-docs/EPIC-E/schema-validation.md` (REQUIRED)
- **Status:** REQUIRED

## 🤖 Model Providers & AI Governance

### OpenAI / Model Provider API (example)

- **Technology:** Model provider API and policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://platform.openai.com/docs/
- **Feature usage:** Authoritative API docs and content policy guidance for AI-assisted generation pipelines.
- **Internal docs:** `/docs/official-docs/EPIC-E/ai-generation-policy.md` (REQUIRED)
- **Status:** REQUIRED

### Model Cards / Explainability Guidance

- **Technology:** Model cards / explainability best practices
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://modelcards.withgoogle.com/
- **Feature usage:** Defines required explainability metadata to record for reviewer evidence (prompts, deltas, model version, confidence).
- **Internal docs:** `/docs/official-docs/EPIC-E/ai-explainability.md` (REQUIRED)
- **Status:** REQUIRED

## 🛡️ Security Standards

### OWASP Application Security Verification Standard (ASVS)

- **Technology:** Application security verification (ASVS)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://owasp.org/www-project-application-security-verification-standard/
- **Feature usage:** Informs forbidden failure classes (secrets exposure, data integrity risks) and baseline security checks the Security Sentinel must verify.
- **Internal docs:** `/docs/official-docs/security/asvs-mapping.md` (REQUIRED)
- **Status:** REQUIRED

## 🧪 Reproducibility & Test Design

### Reproducible Builds / Deterministic Testing Guidance

- **Technology:** Deterministic testing & reproducible builds guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://reproducible-builds.org/
- **Feature usage:** Provides patterns for hermetic environments, fixed seeds, and environment pinning required by Planner/Architect spec.
- **Internal docs:** `/docs/official-docs/EPIC-E/failure-determinism.md` (REQUIRED)
- **Status:** REQUIRED

## 🔗 GitHub Integration (EPIC-F)

### GitHub REST API — Collaborators

- **Technology:** GitHub REST API (Collaborators endpoints)
- **Version:** REST API v3
- **Official source:** https://docs.github.com/en/rest/reference/collaborators
- **Feature usage:** Used to create collaborator invitations, assign `push` permission, and verify collaborator permission via API responses.
- **Status:** VERIFIED

### GitHub Apps (Authentication & Installation Tokens)

- **Technology:** GitHub Apps
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/apps
- **Feature usage:** Recommended authentication method for automation that issues invites and acts with least privilege via installation tokens.
- **Status:** REQUIRED

## 📚 Schema & Pattern Specs (EPIC-F)

### JSON Schema

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical validation for `.forgea/steps.json` schema used by Step-Based Lab Support (EPIC-F / F10)
- **Status:** VERIFIED

### Glob / Pathspec (file pattern semantics)

- **Technology:** Glob / Pathspec
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (choose and pin one: git pathspec docs / minimatch / other)
- **Feature usage:** Defines file-matching semantics for step definitions and mapping changed files to steps
- **Status:** REQUIRED

### Git Provider Webhooks & Push Payloads (example: GitHub)

- **Technology:** Git provider webhooks (push event)
- **Version:** VERSION NOTE: provider docs as published — confirm provider differences
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks and https://docs.github.com/en/developers/webhooks-and-events/webhooks/event-payloads#push
- **Feature usage:** Source of changed-file lists and commit metadata used by mapping logic
- **Status:** VERIFIED

### Branch Protection & Checks API

- **Technology:** Branch protection and checks (merge gating)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches and https://docs.github.com/en/rest/checks
- **Feature usage:** Defines enforcement surface for blocking PR merges when steps are incomplete; indicates how to surface failures to developers.
- **Status:** REQUIRED

### Repository Permissions & Roles

- **Technology:** GitHub repository permission model
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/repository-permissions-for-an-organization
- **Feature usage:** Canonical mapping of `push` / `maintain` / `admin` and their allowed actions; used to define verification checks.
- **Status:** REQUIRED

### GitHub Audit Log / Organization Audit API

- **Technology:** GitHub Audit Log / Audit API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/about-audit-logs
- **Feature usage:** Source of truth for collaborator addition/change events; used to populate required audit fields for evidence and verification.
- **Status:** REQUIRED

### GitHub Branch Protection API

- **Technology:** GitHub Branch Protection API
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest/branches/branch-protection
- **Feature usage:** Programmatic branch protection (disable force-push, block deletion, require status checks/PR reviews); used by Implementer to apply canonical protection templates to created repos.
- **Status:** VERIFIED

### GitHub CODEOWNERS

- **Technology:** GitHub CODEOWNERS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
- **Feature usage:** Per-path reviewer ownership; used to route required reviews for protected paths and complement branch protection rules.
- **Status:** VERIFIED

### GitHub Authentication & Token Scopes

- **Technology:** GitHub Authentication / Token scopes (PATs & GitHub Apps)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/authentication
- **Feature usage:** Defines required PAT or App permissions (e.g., `repo`, `administration`, installation permissions) to perform protection and repository administration tasks.
- **Status:** VERIFIED

## 🔁 Webhooks & Retry Patterns (EPIC-F)

### GitHub Webhooks

- **Technology:** GitHub Webhooks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Webhook delivery semantics, retry behavior, and payload fields such as `X-GitHub-Delivery` and `repository.id` used for deduplication and mapping.
- **Status:** VERIFIED

### Retry & Idempotency Patterns

- **Technology:** Idempotency & Retry Patterns (HTTP & provider guidance)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official sources:** https://datatracker.ietf.org/doc/html/rfc7231 and provider-specific guidance (e.g., Stripe idempotency docs)
- **Feature usage:** Defines idempotency key formats, storage lifetime, and handling of retryable vs permanent errors.
- **Status:** REQUIRED

### Durable Queues & DLQ Options

- **Technology:** AWS SQS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- **Feature usage:** Optional DLQ and durable queue option for webhook persistence and replay.
- **Status:** REQUIRED

- **Technology:** Redis Streams
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://redis.io/docs/manual/streams/
- **Feature usage:** Optional streaming consumer groups for durable processing and replay semantics.
- **Status:** REQUIRED

- **Technology:** Postgres job table patterns (DB-backed queue)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
- **Feature usage:** Option to persist webhook events in the primary DB for transactional coupling and DLQ semantics.
- **Status:** REQUIRED

## 🔒 Rate Limiting & Abuse Protection (EPIC-I)

- **Technology:** HTTP Retry semantics (RFC 7231)
- **Version:** RFC 7231 (June 2014)
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.3
- **Feature usage:** Canonical `Retry-After` and status code semantics for rate-limit responses.
- **Status:** VERIFIED

- **Technology:** Token-bucket algorithm (rate-limiting semantics)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (vendor algorithm docs or canonical spec to be chosen)
- **Feature usage:** Defines burst/refill semantics and token bucket parameters used across enforcement points.
- **Status:** REQUIRED

- **Technology:** Envoy rate-limit filter / NGINX limit_req
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ratelimit_filter and https://nginx.org/en/docs/http/ngx_http_limit_req_module.html
- **Feature usage:** Implementation patterns for service-side enforcement and integration points.
- **Status:** REQUIRED

- **Technology:** CDN/Edge rate-limiting (Cloudflare)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developers.cloudflare.com/rate-limiting/
- **Feature usage:** Edge-level blocking to reduce origin load.
- **Status:** REQUIRED

- **Technology:** OpenTelemetry (metrics & logs)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://opentelemetry.io/docs/specs/
- **Feature usage:** Telemetry schema and required fields for rate-limit events.
- **Status:** REQUIRED

- **Technology:** OWASP DoS guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service.html
- **Feature usage:** Threat patterns and mitigation guidance for safe throttling.
- **Status:** REQUIRED

## EPIC-G — Push Flow & Snapshot Preview (G2 additions)

## EPIC-H — Runner Isolation (added)

### Linux Seccomp / BPF

- **Technology:** Linux seccomp / BPF filtering
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.kernel.org/doc/html/latest/userspace-api/seccomp_filter.html
- **Feature usage:** Defines syscall filtering semantics and kernel-level profile behavior used by the runner's sandbox enforcement.
- **Status:** REQUIRED

### cgroups v2 (resource control)

- **Technology:** cgroups v2
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html
- **Feature usage:** Canonical reference for CPU, memory, and ephemeral-storage controls and accounting.
- **Status:** REQUIRED

### OCI Runtime Specification

- **Technology:** OCI Runtime Specification
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://github.com/opencontainers/runtime-spec
- **Feature usage:** Runtime manifest shape (mounts, capabilities, seccomp profile placement) used to express the planner-spec runtime templates.
- **Status:** REQUIRED

### Container runtime security (containerd / runc)

- **Technology:** containerd / runc runtime docs
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** (pick runtime used in infra, e.g., https://github.com/containerd/containerd)
- **Feature usage:** Runtime-specific implementation notes for applying seccomp and cgroup settings.
- **Status:** REQUIRED

### AppArmor / SELinux (LSM guidance)

- **Technology:** AppArmor / SELinux
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://gitlab.com/apparmor/apparmor/-/wikis/Home and https://selinuxproject.org/page/Main_Page
- **Feature usage:** LSM profile authoring and enforcement guidance where used as complementary confinement.
- **Status:** REQUIRED

### KVM / QEMU (if VM isolation chosen)

- **Technology:** KVM / QEMU virtualization
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.kernel.org/doc/html/latest/virt/index.html and QEMU project docs
- **Feature usage:** Hypervisor-level isolation guidance for VM-based runner variants.
- **Status:** REQUIRED

### JSON Schema (runner API)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for runner job messages and intake contracts.
- **Status:** REQUIRED

### Normalized Push Event JSON Schema

- **Technology:** JSON Schema (normalized push event)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (recommend 2020-12)
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical, machine-readable schema for normalized push event payloads used by implementers and CI validation for EPIC-G G2.
- **Status:** REQUIRED

### Delivery ID Deduplication Policy

- **Technology:** Delivery ID deduplication policy (internal)
- **Version:** VERSIONED INTERNAL POLICY (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-G/G2_Deduplication_and_Idempotency_Policy.md`)
- **Feature usage:** Declares primary idempotency key (`X-GitHub-Delivery`), fallback derivation, persisted TTL, and duplicate behaviour expectations for webhook handlers.
- **Status:** REQUIRED

### Idempotency Preconditions Spec

- **Technology:** Preconditions & verification spec (internal)
- **Version:** VERSIONED INTERNAL SPEC (pin at first release)
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-G/G2_Idempotency_Preconditions_Spec.md`)
- **Feature usage:** Enumerates required incoming headers (e.g., `X-Hub-Signature-256`, `X-GitHub-Event`, `X-GitHub-Delivery`), HMAC verification expectations, raw body availability, and fallback key derivation rules.
- **Status:** REQUIRED

## 📌 Branch & History Validation (EPIC-G)

- **Technology:** Git (core)
  - **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** https://git-scm.com/docs/git-push and https://git-scm.com/docs/git-receive-pack
  - **Feature usage:** Canonical definition of non-fast-forward (history-rewrite) semantics, ref update behavior, and protocol-level evidence for enforcement.
  - **Status:** REQUIRED

- **Technology:** GitHub Branch Protection API
  - **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** https://docs.github.com/en/rest/branches/branch-protection
  - **Feature usage:** Mapping of platform-level protection fields (required checks, required reviewers, push restrictions) to policy enforcement decisions.
  - **Status:** REQUIRED

- **Technology:** Audit Logging Guidance (NIST/Industry)
  - **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** https://csrc.nist.gov/publications/detail/sp/800-92/rev-1 (or equivalent canonical guidance)
  - **Feature usage:** Defines required audit fields, retention recommendations, and PII handling conventions for history-rewrite events.
  - **Status:** REQUIRED

## 🗂 Snapshot & Artifact Storage (EPIC-G)

- **Technology:** Immutable Object Storage (S3/GCS-like)
  - **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** Provider-specific docs (e.g., AWS S3 Object Lock, GCS Object Versioning)
  - **Feature usage:** Write-once immutability, versioning, retention and recovery semantics required by G10 snapshot policy.
  - **Status:** REQUIRED

  ## EPIC-H — Verification API & Schemas (H10 additions)

  ### OpenAPI 3.1.0
  - **Technology:** OpenAPI
  - **Version:** 3.1.0
  - **Official source:** https://spec.openapis.org/oas/v3.1.0
  - **Feature usage:** Machine-readable API contract for H10 endpoints (paths, methods, components, securitySchemes).
  - **Status:** REQUIRED

  ### Problem Details (RFC 7807)
  - **Technology:** Problem Details for HTTP APIs
  - **Version:** RFC 7807
  - **Official source:** https://datatracker.ietf.org/doc/html/rfc7807
  - **Feature usage:** Canonical error payload shape and redaction guidance for API error responses.
  - **Status:** REQUIRED

  ### RFC 6750 Bearer Tokens
  - **Technology:** RFC 6750 (Bearer Token Usage)
  - **Version:** RFC 6750
  - **Official source:** https://datatracker.ietf.org/doc/html/rfc6750
  - **Feature usage:** Guidance for Authorization header bearer token semantics used by H10 endpoints.
  - **Status:** REQUIRED

  ### H10 — Internal spec placeholders
  - **Doc path:** /docs/official-docs/EPIC-H/H10_verification_result_schema.json
    - **Status:** REQUIRED
    - **Reason:** Canonical JSON Schema for `VerificationResult` used by H10 ingestion and persistence.

  - **Doc path:** /docs/specs/EPIC-H/H10_openapi_fragment.yaml
    - **Status:** REQUIRED
    - **Reason:** Machine-readable OpenAPI fragment for H10 API surface.

- **Technology:** Content Hashing & Canonicalization
  - **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** SHA-2 family specs (e.g., FIPS 180-4) and canonical archive format guidance
  - **Feature usage:** Defines canonical hashing algorithm (`sha256`), canonicalization steps, and migration notes for digest algorithms.
  - **Status:** REQUIRED

## EPIC-H — Code Checkout & Verification (H4 additions)

### Git (core)

- **Technology:** Git
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://git-scm.com/docs
- **Feature usage:** SHA resolution semantics, refspecs, clone/fetch options and canonical git plumbing for pinned checkouts.
- **Status:** REQUIRED

### Git Signed Commits & Tags

- **Technology:** Git signed commits/tags
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://git-scm.com/docs/git-commit and https://git-scm.com/docs/git-tag
- **Feature usage:** How to generate and verify commit/tag signatures; ordering of verification steps (commit vs tag).
- **Status:** REQUIRED

### OpenPGP (RFC 4880)

- **Technology:** OpenPGP
- **Version:** RFC 4880
- **Official source:** https://www.rfc-editor.org/rfc/rfc4880
- **Feature usage:** Signature formats and canonical verification behavior for GPG/OpenPGP-signed Git objects.
- **Status:** VERIFIED

### GitHub Branch Protection (provider enforcement)

- **Technology:** GitHub Branch Protection API & protected-branch semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/repositories/configuring-branches-and-merges/about-protected-branches
- **Feature usage:** Provider-side enforcement options (signed commits required, required checks) that affect where enforcement runs.
- **Status:** REQUIRED

### KMS / Vault (key custody)

- **Technology:** HashiCorp Vault / Cloud KMS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.vaultproject.io/docs and provider KMS docs (AWS KMS, GCP KMS)
- **Feature usage:** Key custody, signing APIs, audit/rotation guidance for signing keys used in automated verification.
- **Status:** REQUIRED

## EPIC-H — Failure & Abuse Handling (H9 additions)

### NIST SP 800-92 — Audit Logging

- **Technology:** NIST SP 800-92
- **Version:** SP 800-92 Rev-1
- **Official source:** https://csrc.nist.gov/publications/detail/sp/800-92/rev-1
- **Feature usage:** Canonical guidance for audit-log contents, retention, and handling of evidentiary records.
- **Status:** VERIFIED

### OpenTelemetry (metrics/traces/logs)

- **Technology:** OpenTelemetry
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://opentelemetry.io/specs/
- **Feature usage:** Telemetry signal naming, histogram buckets, and exporter expectations for resource-exhaustion and anomaly detection.
- **Status:** REQUIRED

### Linux Audit (auditd) / OS Audit APIs

- **Technology:** Linux Audit / OS audit APIs
- **Version:** VERSION UNKNOWN — MUST BE PINNED PER RUNNER OS
- **Official source:** platform manpages and https://linux.die.net/man/8/auditd
- **Feature usage:** Kernel-level syscall auditing and syscall evidence required for forbidden-syscall detection.
- **Status:** REQUIRED

### JSON Schema (audit record manifests)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Schema for abuse-signal manifests and immutable audit records ingested by the verification system.
- **Status:** REQUIRED

## EPIC-H — Testing & Validation (H14 additions)

### JSON Schema (test artifact & result manifests)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for test matrices, fixture manifests, expected outputs, and result records used by QA and the Integration-Checker.
- **Status:** REQUIRED

### Test Matrix Template (internal)

- **Technology:** Test matrix template (YAML/Markdown)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal (to be created at `/docs/official-docs/EPIC-H/test-matrix-template.md`)
- **Feature usage:** Standardized template mapping test cases to EPIC-H completion criteria and CI matrix examples.
- **Status:** REQUIRED

### CI Runner / Workflow docs (example: GitHub Actions)

- **Technology:** CI Runner / Workflow syntax
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- **Feature usage:** Defines runner environment, matrix semantics, and reproducible CI images for deterministic tests.
- **Status:** REQUIRED

### Privacy / Pseudonymization Guidance (jurisdictional)

- **Technology:** Privacy & pseudonymization guidance (e.g., ICO/GDPR)
- **Version:** VERSION UNKNOWN — MUST BE PINNED PER LEGAL DOMAIN
- **Official source:** https://ico.org.uk/for-organisations/ (or jurisdiction equivalent)
- **Feature usage:** Rules for redaction, pseudonymization, retention, and lawful access for audit evidence.
- **Status:** REQUIRED

### OS immutable flags (chattr / chflags)

- **Technology:** Filesystem immutability primitives
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Platform manpages (e.g., `man chflags` on macOS, `man chattr` on Linux)
- **Feature usage:** OS-level enforcement options to prevent mutation of locked files by runners.
- **Status:** REQUIRED

### CI Runner Isolation & Permissions (example: GitHub Actions)

- **Technology:** GitHub Actions runner isolation and permissions
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- **Feature usage:** Runner capabilities, token scoping, and workspace isolation constraints needed to choose enforcement mechanisms.
- **Status:** REQUIRED

## EPIC-I — Audit & Logging (I6 additions)

### Audit Event Schema (JSON Schema)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical `AuditEvent` schema for audit ingestion, validation, and cross-service exports.
- **Status:** REQUIRED

### Immutable object storage / WORM (S3 Object Lock)

- **Technology:** AWS S3 Object Lock (WORM)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- **Feature usage:** Tamper-resistant retention and legal-hold capabilities for preserved audit evidence.
- **Status:** REQUIRED

### PostgreSQL DDL & transaction semantics (audit tables)

- **Technology:** PostgreSQL
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Schema patterns for append-only audit tables, unique constraints, and transactional writes.
- **Status:** REQUIRED

### Privacy / Pseudonymization Guidance (jurisdictional)

- **Technology:** Privacy & pseudonymization guidance (e.g., ICO/GDPR)
- **Version:** VERSION UNKNOWN — MUST BE PINNED PER LEGAL DOMAIN
- **Official source:** https://ico.org.uk/for-organisations/ (or jurisdiction equivalent)
- **Feature usage:** Rules for redaction, pseudonymization, retention, and lawful access for audit evidence.
- **Status:** REQUIRED

### OS immutable flags (chattr / chflags)

- **Technology:** Filesystem immutability primitives
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Platform manpages (e.g., `man chflags` on macOS, `man chattr` on Linux)
- **Feature usage:** OS-level enforcement options to prevent mutation of locked files and forensic artifacts.
- **Status:** REQUIRED

## EPIC-I — Observation Layer (I1 additions)

### Timestamp standard (RFC 3339)

## EPIC-I — Session Integrity (I3 additions)

## EPIC-I — Rule Enforcement (I5)

### PostgreSQL DDL & Transaction Semantics

- **Technology:** PostgreSQL DDL / transaction semantics
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Authoritative semantics for constraints, isolation levels, transactional safety, concurrent DDL, and advisory locks used to implement DB-level invariants for rule enforcement.
- **Status:** REQUIRED

### Prisma Schema & Migrations

- **Technology:** Prisma schema & migrate
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.prisma.io/docs/concepts/components/prisma-schema
- **Feature usage:** Migration generation and schema mapping used by the application to produce DDL and manage schema drift for enforcement-related models.
- **Status:** REQUIRED

### Glob / Pathspec semantics (Locked-path matching)

- **Technology:** Glob / Pathspec (choose and pin implementation)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Example: https://git-scm.com/docs/gitignore (or chosen library docs such as minimatch/pathspec)
- **Feature usage:** Canonical matching semantics for forbidden-file manifests and locked-path enforcement.
- **Status:** REQUIRED

### JSON Schema (manifest validation)

- **Technology:** JSON Schema
- **Version:** 2020-12 (PIN REQUIRED) — VERSION UNKNOWN if not pinned
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Validation schema for forbidden-path manifests, rule definitions, and CI manifest checks.
- **Status:** REQUIRED

### Idempotency & Retry Patterns (RFC)

- **Technology:** HTTP idempotency & retry guidance
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Feature usage:** Idempotency key and retry semantics that inform job-uniqueness and de-duplication for enforcement triggers.
- **Status:** REQUIRED

### Advisory Locks / Distributed Locking Guidance

- **Technology:** PostgreSQL advisory locks / Redis distributed locks guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS and https://redis.io/docs/manual/streams/
- **Feature usage:** Patterns and trade-offs for achieving single-active enforcement and preventing race conditions when enforcing sequential invariants.
- **Status:** REQUIRED

### Log Management (NIST SP 800-92)

- **Technology:** NIST SP 800-92 — Computer Security Log Management
- **Version:** 2006
- **Official source:** https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
- **Feature usage:** Canonical guidance for audit log collection, retention windows, integrity, and forensic readiness used by the Session Integrity / AuditEvent design.
- **Status:** VERIFIED

### JSON Web Signature (JWS)

- **Technology:** JSON Web Signature (JWS)
- **Version:** RFC 7515
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7515
- **Feature usage:** Standard signature format for signing canonical audit event payloads and storing/verifying signatures across rotations.
- **Status:** VERIFIED

### SHA-2 (FIPS 180-4)

- **Technology:** FIPS 180-4 (SHA family)
- **Version:** FIPS 180-4
- **Official source:** https://csrc.nist.gov/publications/detail/fips/180/4/final
- **Feature usage:** Standardized hash algorithm (SHA-256) used to compute `sha256_of_event` and chain hashes for tamper evidence.
- **Status:** VERIFIED

### WORM / Object Lock (vendor docs)

- **Technology:** AWS S3 Object Lock (example WORM sink)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- **Feature usage:** Example vendor documentation for configuring write-once-read-many (WORM) retention for archived audit chains.
- **Status:** REQUIRED

## EPIC-I — Validation & Testing (I9)

### JSON Schema (Test payloads)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Canonical schema for test-matrix artifacts, verification intake payloads, and QA artifact validation used by I9.
- **Status:** VERIFIED

### POSIX process exit & signal semantics

- **Technology:** POSIX (process exit / signal semantics)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://pubs.opengroup.org/onlinepubs/9699919799/
- **Feature usage:** Canonical mapping of runner exit codes and signals to PASS/FAIL/INFRA used by verification classification.
- **Status:** REQUIRED

### Git reference & behavior

- **Technology:** Git reference manual
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://git-scm.com/docs
- **Feature usage:** Authoritative behavior for commit SHA semantics, force-push, reflog, and history-rewrite scenarios used in simulation fixtures.
- **Status:** REQUIRED

### OpenTelemetry (Tracing)

- **Technology:** OpenTelemetry
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://opentelemetry.io/docs/
- **Feature usage:** Trace propagation and required attributes for correlating QA runs, signals, and enforcement actions in test runs.
- **Status:** REQUIRED

### Runner & test framework docs (pytest / JUnit / mocha)

- **Technology:** Test-runner exit semantics & conventions
- **Version:** VERSION UNKNOWN — MUST BE PINNED PER-RUNNER BEFORE IMPLEMENTATION
- **Official source:** Runner-specific docs (e.g., https://docs.pytest.org/, https://junit.org/)
- **Feature usage:** Mapping of runner exit codes and output formats to canonical verification results used by the I9 harness.
- **Status:** REQUIRED

### Key Management / KMS (vendor docs)

- **Technology:** AWS KMS (or equivalent KMS/HSM vendor)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/kms/latest/developerguide/overview.html
- **Feature usage:** Key creation, signing, rotation, and policy requirements for signing audit events and verifying signatures.
- **Status:** REQUIRED

- **Technology:** RFC 3339 / ISO 8601 timestamps
- **Version:** RFC 3339
- **Official source:** https://www.ietf.org/rfc/rfc3339.txt
- **Feature usage:** Canonical timestamp format for recorded events, ordering, and TTL/retention calculations in EPIC-I observation layer.
- **Status:** REQUIRED

### JSON Web Signature (JWS) — event signing

- **Technology:** JSON Web Signature (JWS)
- **Version:** RFC 7515
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7515
- **Feature usage:** Standardized signing format for event authorship and tamper-evidence in recorded observation events.
- **Status:** REQUIRED

### Durable ingestion / stream guidance (Kafka / Kinesis / Redis Streams)

- **Technology:** Apache Kafka (or selected stream provider)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://kafka.apache.org/documentation/
- **Feature usage:** Durable ingestion, consumer groups, ordering, and replay semantics for the observation layer.
- **Status:** REQUIRED

- **Technology:** AWS Kinesis (alternative)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/kinesis/

---

## EPIC-J — MDX & Lesson Content (J3)

### MDX (mdxjs) — Authoring & Runtime

- **Technology:** MDX (mdxjs)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://mdxjs.com/
- **Feature usage:** Canonical MDX syntax, imports, and frontmatter parsing expectations for lesson rendering and build-time validation.
- **Status:** REQUIRED

### Unified / remark / mdast — AST & Parser

- **Technology:** Unified / remark / mdast
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://unifiedjs.com/ and https://github.com/syntax-tree/mdast
- **Feature usage:** AST node definitions, parser behavior, and plugin APIs required by AST-based validators and transformation steps.
- **Status:** REQUIRED

### Frontmatter parsing (gray-matter)

- **Technology:** Gray-matter (frontmatter parser)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://github.com/jonschlinkert/gray-matter
- **Feature usage:** Canonical extraction/normalization of YAML/TOML/JSON frontmatter so JSON Schema validation receives typed fields.
- **Status:** REQUIRED

### JSON Schema (frontmatter contract)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Feature usage:** Machine-readable schema for frontmatter validation, used by validator and UI to ensure field parity.
- **Status:** VERIFIED

### CommonMark (Markdown normalization)

- **Technology:** CommonMark
- **Version:** 0.30 (pin recommended) — or VERSION UNKNOWN — MUST BE PINNED
- **Official source:** https://spec.commonmark.org/
- **Feature usage:** Canonical markdown parsing semantics to reduce AST divergence across parsers.
- **Status:** REQUIRED

## EPIC-J — Performance & 3G Optimization (J8)

### Lighthouse (measurement & emulation guidance)

- **Technology:** Lighthouse / Lighthouse CI
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developers.google.com/web/tools/lighthouse
- **Feature usage:** Measurement harness for Regular 3G emulation and CI gating of lesson pages' performance.
- **Status:** REQUIRED

### Image formats & transforms (AVIF / WebP guidance)

- **Technology:** AVIF / WebP encoding guides
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://w3c.github.io/webp/ and https://aomediacodec.github.io/av1-avif/
- **Feature usage:** Canonical image formats recommended for lesson assets to meet 3G budgets.
- **Status:** REQUIRED

### Font delivery & subsetting

- **Technology:** WOFF2 / font subsetting guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.w3.org/TR/WOFF2/
- **Feature usage:** Guide for subsetting and `font-display` behavior to reduce FOIT and payload size.
- **Status:** REQUIRED

## EPIC-I — Detection Layer (Signal Generation)

### Rate-Limiting & Safety-Guard Patterns

- **Technology:** Rate-limiting algorithms (token-bucket / leaky-bucket) and vendor guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Vendor or algorithm-specific docs (e.g., Cloudflare Rate Limiting: https://developers.cloudflare.com/rate-limits/) — choose and pin before implementation
- **Feature usage:** Defines per-signal and global throttling semantics, burst allowances, and backpressure strategies to protect the detection pipeline from DoS and alert storms.
- **Status:** REQUIRED

### Incident Response / Escalation Playbook

- **Technology:** Incident response playbook (NIST SP 800-61 recommended)
- **Version:** NIST SP 800-61 r2
- **Official source:** https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf
- **Feature usage:** Standardizes escalation thresholds, evidence requirements, and human-review responsibilities for critical signals.
- **Status:** REQUIRED

## EPIC-J — Lesson UX (J5)

### Web Content Accessibility Guidelines (WCAG)

- **Technology:** WCAG
- **Version:** 2.1 (Level AA)
- **Official source:** https://www.w3.org/TR/WCAG21/
- **Feature usage:** Contrast, heading structure, focus management, and keyboard navigation acceptance criteria for lesson layout.
- **Status:** REQUIRED

### WAI-ARIA Authoring Practices

- **Technology:** WAI-ARIA Authoring Practices
- **Version:** 1.2
- **Official source:** https://www.w3.org/TR/wai-aria-practices-1.2/
- **Feature usage:** ARIA roles and keyboard patterns for navigation widgets (sidebar, pagination, accordions) used by lesson UI.
- **Status:** REQUIRED

### HTML Living Standard (semantics)

- **Technology:** HTML Living Standard
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://html.spec.whatwg.org/
- **Feature usage:** Canonical semantics for `nav`, `aside`, `main`, headings and native focus behavior relied upon for no-JS rendering.
- **Status:** REQUIRED

## EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)

### Monaco Editor (Embedding & API)

- **Technology:** Monaco Editor (`monaco-editor` / `@monaco-editor/react`)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://microsoft.github.io/monaco-editor/
- **Feature usage:** Editor embedding, model lifecycle, language mode configuration, readonly model support, and editor commands used by EPIC-K (K3/K4).
- **Status:** REQUIRED

### Internal: File-Tree API Schema (canonical)

- **Technology:** File-tree JSON Schema (internal)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** /docs/official-docs/EPIC-K/file-tree-api-schema.md
- **Feature usage:** Canonical schema for `/api/files/tree` responses and `GET /api/files/:path` metadata used by UI and verification services.
- **Status:** REQUIRED

### Core Web Vitals / Lighthouse

- **Technology:** Core Web Vitals / Lighthouse
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://web.dev/vitals/ and https://developers.google.com/web/tools/lighthouse
- **Feature usage:** Performance budgets and measurement guidance to meet 3G performance acceptance criteria for lessons.
- **Status:** REQUIRED

### Internationalization / Localization (i18n)

- **Technology:** Unicode CLDR (Common Locale Data Repository)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://cldr.unicode.org/
- **Feature usage:** Locale data (date/time formats, plural rules, currency formats) and canonical locale identifiers used for UI message formatting and translation guidelines.
- **Status:** REQUIRED

- **Technology:** ICU MessageFormat (pluralization & formatting)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://unicode-org.github.io/icu/userguide/format_parse/messages/
- **Feature usage:** Message formatting and pluralization rules to ensure translations render correct plurals and variable replacements across locales.
- **Status:** REQUIRED

## Additions for EPIC-K — UI-Level Security & Anti-Cheat (K11)

- **Technology:** monaco-editor
  - **Exact version:** VERSION UNKNOWN — MUST BE PINNED
  - **Official source:** https://microsoft.github.io/monaco-editor/
  - **Feature usage:** EPIC-K / K11 — client editor integration, copy/export gating
  - **Status:** REQUIRED

- **Technology:** Browser Clipboard API
  - **Exact version:** VERSION UNKNOWN — MUST PIN BROWSER MATRIX
  - **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  - **Feature usage:** EPIC-K / K11 — clipboard access semantics and UI-level prevention signals
  - **Status:** REQUIRED

- **Technology:** File System Access API / client download semantics
  - **Exact version:** VERSION UNKNOWN — MUST BE PINNED
  - **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
  - **Feature usage:** EPIC-K / K11 — client-side export handling and permission model
  - **Status:** REQUIRED

- **Technology:** HTTP 429 semantics / Rate Limiting
  - **Exact version:** RFC 6585 (stable) / OWASP guidance VERSION UNKNOWN
  - **Official source:** https://datatracker.ietf.org/doc/html/rfc6585 ; https://cheatsheetseries.owasp.org/cheatsheets/Rate_Limiting_Cheat_Sheet.html
  - **Feature usage:** EPIC-K / K11 — throttle behaviour and client-visible retry semantics
  - **Status:** REQUIRED

- **Technology:** Audit Logging (NIST)
  - **Exact version:** NIST SP 800-92 (2006)
  - **Official source:** https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
  - **Feature usage:** EPIC-K / K11 — canonical audit field requirements and retention guidance
  - **Status:** REQUIRED

- **Technology:** JSON Schema (AuditEvent contract)
  - **Exact version:** VERSION UNKNOWN — MUST PIN SPEC DRAFT (eg. 2020-12)
  - **Official source:** https://json-schema.org/
  - **Feature usage:** EPIC-K / K11 — machine-validated AuditEvent payloads
  - **Status:** REQUIRED

### IntersectionObserver API

- **Technology:** IntersectionObserver (browser API)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Feature usage:** Visibility-based section progress tracking and graceful degradation strategies.
- **Status:** REQUIRED

### Data Protection & Regulatory (GDPR)

- **Technology:** GDPR / data protection regulation
- **Version:** 2016/679
- **Official source:** https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Feature usage:** Determines allowed telemetry/audit fields, retention windows, and required redaction/pseudonymization rules for signals that include user data.
- **Status:** REQUIRED
- **Feature usage:** Managed streaming option for durable ingestion and ordered partitioning.
- **Status:** REQUIRED

- **Technology:** Redis Streams (alternative)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://redis.io/docs/manual/streams/
- **Feature usage:** Lightweight streaming consumer groups and replay semantics for observation ingestion.
- **Status:** REQUIRED

### PostgreSQL DDL & transaction semantics

- **Technology:** PostgreSQL
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Feature usage:** Schema design, unique constraints for deduplication, transactional persistence for audit records.
- **Status:** REQUIRED

### Immutable object storage (S3 Object Lock / WORM)

- **Technology:** AWS S3 Object Lock (WORM)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- **Feature usage:** Tamper-resistant object retention and legal-hold for preserved audit evidence.
- **Status:** REQUIRED
