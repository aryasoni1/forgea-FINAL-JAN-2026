# EPIC-K — Combined: REQUIRED OFFICIAL DOCUMENTATION

This file aggregates the "REQUIRED OFFICIAL DOCUMENTATION" sections extracted from each EPIC-K feature brief.

---

## K1_Session & Context Initialization — REQUIRED OFFICIAL DOCUMENTATION

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks
   - Concept: Webhook delivery semantics, headers, and HMAC signature verification
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs canonical delivery-id usage, signature verification, and retry semantics for mapping GitHub events to `LabSession` objects.
   - Decision it informs: Idempotency key selection and webhook handler retry/backoff strategy.
   - What breaks without it: Incorrect deduplication, replayed events causing duplicated session state, and potential security failures from signature mismatches.

2. Technology: Idempotency & HTTP Retry Semantics
   - Concept: RFC guidance for idempotency, retryable vs permanent errors, and idempotency key patterns.
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231 (or provider-specific extensions); VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how webhook handlers should classify errors and whether retries are safe; informs storage lifetime for idempotency records.
   - Decision it informs: Persistence lifetime, error codes mapping to DLQ vs retry, and safe concurrency semantics.
   - What breaks without it: Inconsistent retry behaviour, lost or duplicated work, and unreliable session association.

3. Technology: Durable Queues & DLQ Options
   - Concept: Durable ingestion, replay, and dead-letter handling for webhook events (e.g., AWS SQS, Redis Streams, DB-backed queues).
   - Official sources:
     - SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
     - Redis Streams: https://redis.io/docs/manual/streams/
     - Postgres job table pattern: https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines durable ingestion architecture, guarantees for enqueue-first semantics, and failure-handling strategies.
   - Decision it informs: Choice of queue tech, DLQ retention, and operational runbooks for replay and troubleshooting.
   - What breaks without it: Missing DLQ/replay semantics leading to lost events or unbounded retries.

4. Technology: JSON Schema (manifest for forgea.config.json)
   - Concept: Machine-readable schema for `forgea.config.json` manifest (lab template, injection validation, deterministic error codes).
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (e.g., 2020-12 or 2019-09)
   - Why required: Ensures deterministic validation, machine-readable error codes, and consistent template injection.
   - Decision it informs: Shape of `forgea.config.json`, validator tooling, and CI acceptance checks.
   - What breaks without it: Incompatible manifests, template injection failures, and fragile enforcement.

---

## K2_Virtual File System (FS Abstraction) — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below we list the official source, version requirement (or note), why it's required, what decision it informs, and what breaks without it.

- Technology: Git / Git provider repository tree API
  - Official source: https://docs.github.com/en/rest/reference/git#get-a-tree
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical APIs to enumerate repository trees, shallow vs recursive tree semantics, rate limits, and pagination.
  - Decision it informs: Whether server-side VFS should call provider APIs directly, what API shapes to support, and rate-limit/error handling.
  - What breaks without it: Implementers may use incorrect tree endpoints, cause unintended full-repo downloads, or misunderstand platform constraints leading to data exposure or rate-limit failures.

- Technology: Path traversal / directory traversal guidance (OWASP)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Canonical threat patterns and mitigations for path normalization, blacklists vs allowlists, and canonicalization pitfalls.
  - Decision it informs: Path-normalization strategy, allowed character sets, and failure modes (reject vs sanitize).
  - What breaks without it: Risk of directory traversal vulnerabilities allowing read of unexpected paths or secret files.

- Technology: POSIX filesystem semantics (symlink behavior)
  - Official source: The Open Group Base Specifications (POSIX) — https://pubs.opengroup.org/onlinepubs/9699919799/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies symlink resolution semantics, expected behavior for lstat/stat, and platform differences.
  - Decision it informs: Whether to support symlink traversal, how to canonicalize paths, and invariant enforcement (no symlink resolution).
  - What breaks without it: Inconsistent symlink handling could allow escapes from intended repo roots or inconsistent behavior across runtimes.

- Technology: URI syntax and normalization (RFC 3986 / WHATWG URL)
  - Official sources: https://datatracker.ietf.org/doc/html/rfc3986 and https://url.spec.whatwg.org/
  - Exact version requirement: RFC 3986 (VERIFIED), WHATWG URL (LIVING STANDARD — MUST BE PINNED)
  - Why required: Guides canonicalization of URL/path segments provided to VFS APIs and percent-encoding rules.
  - Decision it informs: How to validate and normalize incoming path parameters, and whether to accept encoded separators.
  - What breaks without it: Ambiguous input normalization leading to multiple representations of the same path and potential traversal bypass.


### REQUIRED OFFICIAL DOCUMENTATION

For each concept below we list the technology, official source, version requirement status, why it is required, what decision it informs, and what breaks without it.

- **Technology:** Git (repository tree semantics)
  - **Concept:** How Git represents trees/blobs and how to enumerate repository trees (git ls-tree, objects)
  - **Official source:** https://git-scm.com/docs
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Defines canonical behavior for listing, filtering, and resolving repository content.
  - **Decision it informs:** API contract for exposing tree listings, canonical path normalization, and caching semantics.
  - **What breaks without it:** Incorrect assumptions about paths, submodules, or packed objects may cause data corruption or information leakage.

- **Technology:** POSIX (symlink and path semantics)
  - **Concept:** Symlink resolution rules, canonicalization, and path traversal semantics
  - **Official source:** https://pubs.opengroup.org/onlinepubs/9699919799/
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Informs invariant: "no symlink resolution" must be implemented consistently across platforms.
  - **Decision it informs:** Server-side enforcement of symlink handling and path traversal rejection.
  - **What breaks without it:** Inconsistent symlink handling could allow bypass of path filters and data-exfiltration.

- **Technology:** HTTP API semantics (RFC 7231)
  - **Concept:** Request/response semantics, status codes, cache control, and safety/idempotency considerations
  - **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
  - **Exact version requirement:** RFC7231 (stable)
  - **Why required:** Ensures API error handling and caching are correct for tree-listing endpoints.
  - **Decision it informs:** Error codes for invalid paths, caching TTLs for repository trees.
  - **What breaks without it:** Wrong caching or error semantics leading to stale or insecure responses.

- **Technology:** Node.js `fs` and platform runtime docs
  - **Concept:** Platform fs behaviors and safe APIs for pathname operations
  - **Official source:** https://nodejs.org/docs/
  - **Exact version requirement:** 20.11.x (per /docs/toolchain-versions.md)
  - **Why required:** If implementation uses Node.js, runtime APIs determine canonical behaviors and available safeguards.
  - **Decision it informs:** Which APIs to use for path checks, atomic reads, and stream-safe operations.
  - **What breaks without it:** Platform-specific behavior mismatches and unsafe fs calls.

- **Technology:** OWASP guidance (path traversal and information leakage)
  - **Concept:** Class of vulnerabilities and mitigation patterns for filesystem and API exposure
  - **Official source:** https://owasp.org/www-project-top-ten/ and https://owasp.org/www-community/attacks/Path_Traversal
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Security controls and threat-modeling guidance for safe tree-listing APIs.
  - **Decision it informs:** Input validation, rejection of traversal attempts, logging and alerting requirements.
  - **What breaks without it:** Implementation may miss common exploitation patterns leading to severe data exposure.

---

## K3_File_Tree_UI — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: Monaco Editor (`monaco-editor` / `@monaco-editor/react`)
   - Official source: https://microsoft.github.io/monaco-editor/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs editor initialization, language modes, readonly APIs, and integration constraints used by K4/K3.
   - Decision it informs: How to safely enable/disable editing, configure language modes, and render overlays for read-only files.
   - What breaks without it: Misuse of editor APIs causing unsafe writes, inconsistent readOnly behavior, or large bundle regressions.

2) Technology: JSON Schema (payloads)
   - Official source: https://json-schema.org/specification.html (2020-12)
   - Exact version requirement: 2020-12
   - Why required: Standard for defining the file-tree API schema for backend → UI contract (tree nodes, metadata fields).
   - Decision it informs: Shape of tree responses, required/optional metadata keys, validation rules and tests.
   - What breaks without it: Mismatched backend/frontend contracts, fragile parsing, and spelling/field-name drift.

3) Technology: HTTP semantics / REST error classification
   - Official source: RFC 7231 — https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231
   - Why required: Classify transient vs permanent errors for tree fetch endpoints and error UX semantics.
   - Decision it informs: Which errors are retried client-side, which surface explicit messages, and which block the workspace.
   - What breaks without it: Inconsistent retry behavior and poor UX on partial failures.

---

## K5_Edit Permission Enforcement — REQUIRED OFFICIAL DOCUMENTATION

## REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable editor permission enforcement the following external docs are required.

- Technology: OpenID Connect Core
  - Concept: Session claims, ID token validation, session lifetimes
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical session claim semantics consumed by `parseSessionUser()` and session validation in server APIs.
  - Decision informed: Which session claims are authoritative for RBAC and session lifetime checks.
  - Breaks without it: Inconsistent claim handling across services causing auth bypass or denial.

- Technology: OWASP Path Traversal guidance
  - Concept: Path canonicalization, traversal prevention, encoded-path bypasses
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Establishes canonicalization and normalization rules for editor file path validation.
  - Decision informed: Allowed path prefixes, normalization, and rejection criteria for traversal attempts.
  - Breaks without it: Directory-traversal vulnerabilities allowing unauthorized file access.

- Technology: Unicode Normalization (UAX#15)
  - Concept: NFC normalization to avoid canonical-equivalence collisions
  - Official source: https://www.unicode.org/reports/tr15/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Prevents attacker-controlled filename collisions via unicode variants.
  - Decision informed: Normalization applied before path canonicalization and glob matching.
  - Breaks without it: Confusing duplicates, bypasses of locked-paths, audit ambiguity.

- Technology: WHATWG URL Standard / RFC 3986
  - Concept: URL parsing and percent-encoding rules for path segments
  - Official source: https://url.spec.whatwg.org/ and https://datatracker.ietf.org/doc/html/rfc3986
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures server and client canonicalization of `path` and `:lessonId` segments match.
  - Decision informed: Percent-encoding handling, allowed characters, canonical path form.
  - Breaks without it: Mismatched parsing allowing bypass via alternate encodings.

- Technology: Locked-Paths Manifest / Glob semantics
  - Concept: Canonical locked-path glob semantics used to enforce write restrictions
  - Official source: (pick and pin: minimatch / pathspec / gitignore semantics) — VERSION UNKNOWN
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Specifies how lockedGlobs are matched against normalized canonical paths.
  - Decision informed: Which implementations and flags to use for glob matching and precedence.
  - Breaks without it: Inconsistent enforcement across services and editors.

---

## K6_Step-Based_Editing_Rules — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Canonical `.forgea/steps.json` machine-readable schema
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12 (JSON Schema draft)
- Why required: Validates step definitions consumed by UI, backend, and verification services.
- What decision it informs: File-glob matching, step ordering, step metadata fields, and validation at ingestion.
- What breaks without it: Divergent step formats across services, broken UI mapping, and untestable verifier contracts.

2. Technology: Glob / Pathspec semantics

- Concept: Locked/editable path glob semantics for step-scoped file lists
- Official source: choose & pin implementation (examples: gitignore docs https://git-scm.com/docs/gitignore or pathspec https://github.com/cs01/pathspec)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures consistent interpretation of editable file globs across server, client, and enforcement services.
- What decision it informs: Which files are editable/locked for a step and enforcement boundary behavior.
- What breaks without it: Inconsistent locking, UI/engine mismatch, incorrect enforcement.

3. Technology: Prisma / Postgres data modeling guidance

- Concept: Persistence contract for per-step state (schema guidance for `StepVerification` / `LabAttempt` / extension to `LabSession`)
- Official source: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Database schema conventions, FK constraints, indexing, and migration guidance for step-state.
- What decision it informs: Choice between extending `LabSession` vs dedicated per-step model, uniqueness constraints, and retention indexing.
- What breaks without it: Race conditions, non-atomic step state, inability to audit or enforce one-attempt-per-commit guarantees.

---

## K7_Instructions & Step Panel — REQUIRED OFFICIAL DOCUMENTATION

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below, the official source, exact version requirement (or note), reason it's required, which decision it informs, and what will break without it.

- Technology: JSON Schema for `.forgea/steps.json`
  - Official source: /docs/official-docs/EPIC-F/steps.schema.json
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides a single canonical, machine-readable schema for step artifacts used by CI, authoring tools, and the UI loader.
  - Decision it informs: Canonical artifact shape, CI validation rules, and UI payload parsing.
  - What breaks without it: Divergent authoring, CI false-positives/negatives, inconsistent UI rendering and verification mismatches.

- Technology: API contract for instruction payloads
  - Official source: (to be published) /docs/official-docs/EPIC-K/instruction_api_contract.md
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: UI implementers need a stable HTTP contract (paths, auth, caching) to fetch step payloads safely.
  - Decision it informs: Server vs client loading approach, caching strategy, auth requirements for preview vs student sessions.
  - What breaks without it: Fragmented fetch implementations, runtime auth failures, cache mismatch bugs.

- Technology: Step↔Verification mapping spec
  - Official source: /docs/official-docs/EPIC-H/step_verification_mapping.md
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps step IDs to verification checks so UI and verification engine agree on expectations.
  - Decision it informs: Which verification hooks are required per step and gating rules for lab progress.
  - What breaks without it: Incorrect pass/fail mappings, broken acceptance tests, confusing UX.

---

## K8-K10_Local_Change_Tracking_and_Verification — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

For safe specification and implementation the following official sources are required.

- Technology: Web Storage (localStorage)
  - Concept: Client-side ephemeral persistence for small key/value state and quick recovery
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (guidance: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  - Why required: Informs whether `localStorage` is an acceptable persistence surface for K8 session-only dirty-state and simple unsaved-counts.
  - Decision informed: Persistence scope (session-only vs durable), serialization constraints, size limits and privacy tradeoffs.
  - What breaks without it: Unclear size/consistency expectations and potential cross-browser incompatibilities; implementers may choose unsafe persistence approaches.

- Technology: IndexedDB
  - Concept: Durable browser-side storage for larger or structured draft data and offline resilience
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (guidance: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  - Why required: Required when drafts are larger than localStorage or when structured transactions / durability guarantees are needed.
  - Decision informed: Whether to implement session-only vs durable draft storage, schema design for draft records, and migration strategy.
  - What breaks without it: Risk of underestimating storage needs and choosing an insufficient persistence model.

- Technology: Page lifecycle / beforeunload handling
  - Concept: Browser navigation/unload warning semantics and allowed UX patterns
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (guidance: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
  - Why required: Defines safe usage of navigation warnings and browser behavior differences (user prompts, suppressions on mobile).
  - Decision informed: Whether and how to surface unload warnings for unsaved changes and what text/behavior is permitted.
  - What breaks without it: Implementers may introduce unreliable/unportable unload prompts or miss platform-specific suppression rules.

- Technology: Server-Sent Events (SSE) / EventSource
  - Concept: Unidirectional streaming from server → client to report job progress
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (W3C / MDN EventSource docs: https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  - Why required: Alternative to polling for real-time verification progress; informs reconnection and heartbeat behavior.
  - Decision informed: Whether to use SSE, WebSocket, or polling for verification streams (K10).
  - What breaks without it: Inconsistent streaming contract choices, or missing reconnection/backoff semantics.

- Technology: WebSocket (RFC 6455)
  - Concept: Bidirectional socket suitable for richer runner → UI event streams and control messages
  - Official source: RFC 6455 — https://datatracker.ietf.org/doc/html/rfc6455
  - Why required: If verification runners or orchestrators require bidirectional control/ack semantics, WebSocket spec informs message framing and close semantics.
  - Decision informed: Use-case fit: SSE vs WebSocket vs HTTP polling.
  - What breaks without it: Incorrect assumptions about delivery guarantees, close/reconnect semantics, and message framing.

- Technology: HTTP semantics / polling & idempotency
  - Concept: Polling cadence, status codes, idempotency and backoff guidance
  - Official source: RFC 7231 — https://datatracker.ietf.org/doc/html/rfc7231
  - Why required: Informs error classification, retry/backoff strategies, and idempotent GET semantics for `GET /verification/:jobId`.
  - Decision informed: Polling cadence, retry rules and safe error-handling in K10.
  - What breaks without it: Poor retry choices causing excessive load or incorrect client-side error handling.

- Technology: JSON Schema / API payload validation
  - Concept: Canonical schema for verification-status payloads and request/response contracts
  - Official source: JSON Schema (2020-12) — https://json-schema.org/specification.html
  - Why required: Produces machine-verifiable contracts for start/status API payloads and reduces ambiguity.
  - Decision informed: Exact required fields, enums, optional diagnostics and versioning strategy.
  - What breaks without it: Divergent implementations and brittle client parsing.

---

## K8_Local Change Tracking — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: monaco-editor
  - Concept: In-browser editor embedding, model change events, and lifecycle cleanup
  - Official source: https://github.com/microsoft/monaco-editor (and https://microsoft.github.io/monaco-editor/)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implementation must follow supported embedding APIs and worker/bundler guidance to safely host an interactive editor.
  - Decision informed: Editor integration approach (embed vs. lightweight viewer), event hooks for dirty tracking.
  - What breaks without it: Incorrect worker configuration, memory leaks, broken language services and unreliable change events.

- Technology: @monaco-editor/react
  - Concept: React integration patterns and lifecycle hooks for Monaco in React apps
  - Official source: https://github.com/suren-atoyan/monaco-react
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines recommended usage patterns (props, disposal) and avoids common React/Monaco lifecycle bugs.
  - Decision informed: Which wrapper patterns and cleanup semantics to adopt for autosave and event wiring.
  - What breaks without it: Memory/worker leaks, double-event handlers, incorrect readOnly toggles.

- Technology: Window.beforeunload (navigation unload semantics)
  - Concept: Browser unload/navigation warning behavior and permitted handler semantics
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides reliable cross-browser UX for navigation warnings and allowed user prompts.
  - Decision informed: Whether to use `beforeunload` or in-app routing guards and exact message behavior.
  - What breaks without it: Inconsistent navigation warnings leading to unexpected data loss.

- Technology: Web Storage / localStorage (WHATWG HTML Web Storage)
  - Concept: Client-side persistence semantics for session vs durable storage
  - Official source: https://html.spec.whatwg.org/multipage/webstorage.html
  - Exact version requirement: LIVING STANDARD — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines durability guarantees, quota, string-only values, and synchronous behaviour.
  - Decision informed: Whether localStorage is acceptable for draft persistence or if IndexedDB is required.
  - What breaks without it: Incorrect assumptions about persistence across tabs or large payload storage.

- Technology: IndexedDB API
  - Concept: Durable, asynchronous client-side storage for larger draft persistence and structured data
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Required if drafts must be durable across sessions and support larger payloads or structured metadata.
  - Decision informed: Persistence adapter selection (localStorage vs IndexedDB vs server sync).
  - What breaks without it: Poor offline durability or data loss when localStorage quotas are exceeded.

---

## K9_Commit & Push Guidance (UI Only) — REQUIRED OFFICIAL DOCUMENTATION

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include official source and version requirement.

- Technology: Git (user-facing commit/push semantics)
  - Concept: Local vs remote commit/push behavior
  - Official source: https://git-scm.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures UI copy correctly distinguishes local changes, commits, and push semantics; avoids misleading users about remote delivery guarantees.
  - Decision it informs: Precise prohibition language and expected user mental model for `Submit Proof` and guidance copy.
  - What breaks without it: Misleading guidance causing audit/verification mismatches and user confusion about proof submission.

- Technology: WCAG (accessibility acceptance)
  - Concept: Accessible banners, buttons, focus management, and ARIA semantics
  - Official source: https://www.w3.org/TR/WCAG21/
  - Exact version requirement: 2.1
  - Why required: Accessibility acceptance criteria are mandatory for UI guidance and CTA exposure.
  - Decision it informs: Keyboard focus behavior, screen-reader copy, contrast and sizing constraints for banners and modals.
  - What breaks without it: Non-compliant UI, failed accessibility audits, and potential legal/UX regressions.

- Technology: Unicode CLDR / i18n best practices
  - Concept: Internationalization, pluralization, and message extraction
  - Official source: https://cldr.unicode.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guidance copy must be i18n-ready (variables, placeholders, length-safe messages).
  - Decision it informs: Copy structure (avoid embedded punctuation/HTML), translation notes, and stable keys for translations.
  - What breaks without it: Broken translations, UI truncation, and incorrect localized messaging.

---

## K11_UI-Level Security & Anti-Cheat — REQUIRED OFFICIAL DOCUMENTATION

### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: `monaco-editor`
   - Concept: Secure client integration and editor-surface export/copy controls
   - Official source: https://microsoft.github.io/monaco-editor/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines client-side API surface that can enable bulk-copy, programmatic exports, and clipboard interactions.
   - What decision it informs: Where the client must gate copy/export UI and which editor APIs must be restricted or instrumented.
   - What breaks without it: Incorrect assumptions about available client hooks, unforeseen data-exfil vectors, and brittle mitigations.

2) Technology: Browser Clipboard API
   - Concept: Clipboard access and user-consent/security model
   - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED (browser matrix) BEFORE IMPLEMENTATION
   - Why required: Clarifies when `navigator.clipboard` is allowed, user gesture requirements, and compatibility caveats.
   - What decision it informs: UI-level copy prevention signals and fallback behaviour for older browsers.
   - What breaks without it: Misapplied client restrictions that either block legitimate flows or fail to stop programmatic clipboard reads.

3) Technology: File System Access API (client) / File download semantics (HTTP)
   - Concept: Safe client exports and server-side content-disposition handling
   - Official source: https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines how exports may be offered to users and client-side permission expectations.
   - What decision it informs: Whether to offer client-side zipped exports, use server-side streaming, or block bulk-downloads.
   - What breaks without it: Unsound export UX or server-side APIs that leak files unexpectedly.

4) Technology: HTTP error semantics / Rate limiting guidance
   - Concept: `429 Too Many Requests` semantics and best-practice rate-limiting strategies
   - Official source: IETF RFC 6585 (429) — https://datatracker.ietf.org/doc/html/rfc6585 ; OWASP Rate Limiting Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Rate_Limiting_Cheat_Sheet.html
   - Exact version requirement: RFC 6585 (stable); OWASP page VERSION UNKNOWN — ACK PIN
   - Why required: Standardizes response codes, headers (`Retry-After`), and client-visible behavior when throttles are hit.
   - What decision it informs: Precise throttling thresholds, scope (per-user/IP/lab), and fallback UX.
   - What breaks without it: Inconsistent client handling of throttling, ambiguous retry semantics, or accidental DoS risk.

5) Technology: Audit & logging best practices
   - Concept: Audit event schema and retention guidance
   - Official source: NIST SP 800-92 Guide to Computer Security Log Management — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
   - Exact version requirement: 2006 (NIST SP 800-92)
   - Why required: Defines minimal audit fields, retention and tamper-evidence expectations for anti-cheat investigations.
   - What decision it informs: Minimal `AuditEvent` fields, storage/retention, and redaction requirements.
   - What breaks without it: Forensic gaps, non-compliant retention or evidence-poor audit trails.

6) Technology: JSON Schema (AuditEvent payload contract)
   - Concept: Canonical machine-validated schema for `AuditEvent` payloads
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST PIN DRAFT (eg. 2020-12) BEFORE IMPLEMENTATION
   - Why required: Ensures consistent machine-parsable audit events across services and export sinks.
   - What decision it informs: Which fields are mandatory, validation rules, and downstream sink compatibility.
   - What breaks without it: Inconsistent event shapes, failed ingest into audit sinks, alerting gaps.

---

## K12_Audit & Error Handling — REQUIRED OFFICIAL DOCUMENTATION

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include: Technology, Concept, Official source (stable URL), Exact version requirement OR: "VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION", Why required, What decision it informs, What breaks without it.

- Technology: JSON Schema
  - Concept: Canonical JSON Schema for `AuditLog.metadata` (audit metadata contract)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Defines a machine-readable, versioned contract enforcing field names, types, size limits, and redaction rules across producers and consumers.
  - What decision it informs: Producer validation, CI schema checks, size/truncation semantics, and scrub/redaction expectations.
  - What breaks without it: Divergent producer payloads, PII leakage, inconsistent consumers, and brittle migration handling.

- Technology: Data Protection Regulation (legal)
  - Concept: EU GDPR (and regional privacy laws as applicable) for retention/redaction requirements
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: Regulation (EU) 2016/679
  - Why required: Determines lawful retention windows, rights-to-erasure considerations, and legal controls for audit storage and archival.
  - What decision it informs: Hot DB retention duration, archival destinations, access controls, and deletion/backfill policy for personal data.
  - What breaks without it: Non-compliant retention policies, legal risk, and unclear deletion requirements.

- Technology: Cloud Storage Lifecycle (vendor)
  - Concept: S3 object lifecycle / cold-storage archival patterns and access controls
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides practical archival destination selection (S3 Glacier / BigQuery export), lifecycle rules, and policy-as-code for retention automation.
  - What decision it informs: Where audit data is archived, retrieval SLA, and access controls for cold storage.
  - What breaks without it: Unclear archival automation, costly retrievals, and operator uncertainty.

- Technology: HTTP/Webhook best-practices
  - Concept: Webhook delivery, retry/backoff, auth, idempotency, and error semantics
  - Official source: GitHub Webhooks docs (example): https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs `FORGEA_SECURITY_ALERT_SINK_URL` contract: payload shape, auth method, retry/backoff expectations, and SLA.
  - What decision it informs: Alert sink payload format, auth mode, retry/backoff, and fallback channels.
  - What breaks without it: Lost alerts, misinterpreted payloads, and non-actionable security notifications.

- Technology: HTTP semantics / status codes
  - Concept: RFC 7231 (HTTP) for classifying retries and idempotency
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Guides retry/backoff and idempotency design for alert sink calls and audit exports.
  - What decision it informs: Which status codes are permanent vs transient and how to implement exponential backoff.
  - What breaks without it: Incorrect retry behavior and potentially duplicate or lost alerts.
