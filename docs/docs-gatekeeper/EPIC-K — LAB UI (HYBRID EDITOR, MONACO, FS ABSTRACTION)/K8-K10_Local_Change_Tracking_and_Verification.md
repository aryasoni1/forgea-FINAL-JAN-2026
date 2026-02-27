### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K8 — Local Change Tracking; K10 — Verification & Preview Status
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K10_Verification & Preview Status.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K10_Verification & Preview Status.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level task sequencing present; does not define persistence scope, autosave intervals, or unload UX contract.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - Coverage status: PARTIAL
  - Exact gaps: Finds code locations and missing hooks but does not define the dirty-state model, storage adapter choices, or tests.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K10_Verification & Preview Status.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies UI components and missing verification-job API and streaming contract; does not define payload schemas or polling/backoff rules.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K10_Verification & Preview Status.md
  - Coverage status: PARTIAL
  - Exact gaps: Lists affected files but lacks HTTP API surface, job lifecycle, and canonical status enums.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - Coverage status: PARTIAL
  - Exact gaps: Epic lists `K8` and `K10` as features but does not include contract-level detail required for safe implementation.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

List of docs to extend and why:
- `/docs/official-docs/EPIC-K/K8_Local_Change_Tracking.md` — Extend to include a pinned persistence decision (session-only vs durable), autosave semantics (debounce, interval), exact unload UX wording, and acceptance tests.
- `/docs/official-docs/EPIC-K/K10_Verification_API_Contract.md` — Add canonical HTTP API surface (start/status/cancel), JSON Schema payloads for `VerificationStatus`, job lifecycle, and polling/streaming guidance.
- `/docs/official-docs/epic-k-storage-guidance.md` — Add guidance comparing `localStorage` vs `IndexedDB` vs server drafts for the editor context.

### STUDY GUIDE FOR HUMAN

- LocalStorage / IndexedDB / Service Worker (K8)
  - Why this exists: Choose an appropriate client persistence surface for unsaved changes and recovery after crashes or accidental navigation.
  - Why alternatives exist: `localStorage` is simple but size-limited and synchronous; `IndexedDB` is durable and async; server drafts provide cross-device durability at higher cost.
  - When NOT to use it: Do NOT use `localStorage` for large diffs, binary content, or secrets; do NOT rely on `beforeunload` for guaranteed delivery.
  - Common engineering mistakes: Storing large blobs in `localStorage`, failing to handle quota errors, not providing migration/versioning for stored drafts.

- beforeunload / Navigation warnings (K8)
  - Why this exists: Prevent accidental data loss while aligning with browser policies.
  - Why alternatives exist: UX patterns like inline autosave reduce reliance on unload prompts.
  - When NOT to use it: Mobile browsers and some modern UX patterns suppress custom messages; avoid relying on it as the only safety net.
  - Common mistakes: Showing noisy prompts for trivial edits; failing to debounce warnings.

- Verification API & Streaming (K10)
  - Why this exists: Provide a deterministically verifiable job lifecycle so the UI can reflect actual backend verification state instead of local simulation.
  - Why alternatives exist: Polling is simple and firewall-friendly; SSE is unidirectional and easy to scale; WebSocket supports bidirectional control and richer events.
  - When NOT to use it: Avoid WebSocket if only server→client events are required and simple reconnection behavior is desired.
  - Common mistakes: Not versioning payload schemas; tying UI logic to implementation details of runner logs; leaking sensitive internals in client-visible diagnostics.

### INTERNAL DOCS TO ADD OR EXTEND (DETAILS)

Only include if coverage is PARTIAL or MISSING — required here.

- Canonical path: /docs/official-docs/EPIC-K/K8_Local_Change_Tracking.md
  - Purpose: Define dirty-state model, autosave semantics, unload UX contract, acceptance tests, and preferred implementation locations (`apps/forgea-labs/components/workspace/` + shared hooks under `packages/`).
  - Exact knowledge to add: Persistence scope decision, autosave debounce/interval values, unsaved-count UI rules, `beforeunload` behavior, tests and operator documentation.
  - Required version pin: N/A for internal doc — reference pinned web API docs inline.

- Canonical path: /docs/official-docs/EPIC-K/K10_Verification_API_Contract.md
  - Purpose: Define minimal verification-job HTTP API surface, JSON Schema for payloads, status enum mapping, polling cadence, and streaming alternatives (SSE/WebSocket) with reconnection rules.
  - Exact knowledge to add: API paths, request/response examples, error cases (401/403/404/429/5xx), idempotency guidance, and acceptance tests for UI gating.
  - Required version pin: JSON Schema 2020-12; RFC 7231 reference for HTTP semantics; RFC 6455 if WebSocket used.

- Canonical path: /docs/official-docs/EPIC-K/epic-k-storage-guidance.md
  - Purpose: Shortguide comparing localStorage/IndexedDB/server drafts with recommended patterns and migration notes.
  - Exact knowledge to add: quotas, serialization examples, retry/backoff recommendations, security considerations, and tests.
  - Required version pin: IndexedDB spec reference and localStorage guidance (MDN / WHATWG references) — mark as pinned to specific MDN pages.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Is there an existing verification streaming producer (SSE/WebSocket) in server code? — Not found in code-scout; if present, provide exact path or gate this doc until discovered.
- Persistence scope: Should K8 store drafts server-side for cross-session durability, or remain session-only? This is a product decision required to finalize the spec.
- If server-side persistence is chosen, confirm accepted privacy / PII policies for storing partial user edits.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K8-K10 — Local Change Tracking & Verification Contract
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8-K10_Local_Change_Tracking_and_Verification.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for editor persistence and verification API contracts.
  - Date: 2026-02-15
