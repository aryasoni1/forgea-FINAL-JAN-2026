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
