REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Canonical progress payload schema (machine-readable)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Defines the canonical shape, validation, and versioning for progress payloads persisted and exchanged between clients and server.
  - Decision it informs: API contract, DB schema, test fixtures, and migration strategy.
  - What breaks without it: Divergent client/server payloads, brittle migrations, and incompatibilities across apps (`forgea-lessons` vs `forgea-labs`).

- Technology: Service Workers (Offline Sync)
  - Concept: Offline-first syncing and retry-on-connect guidance
  - Official source: https://www.w3.org/TR/service-workers-1/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs safe use of background sync, network fallback, and storage lifecycle for buffered progress events.
  - Decision it informs: Whether to rely on Service Worker background-sync vs. app-layer retry, and storage durability guarantees.
  - What breaks without it: Unsafe retry semantics, lost progress during disconnects, inconsistent UX across browsers.

- Technology: Intersection Observer (Web API)
  - Concept: Visibility thresholds and section-observer semantics used to drive progress events
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines browser behavior for visibility thresholds and cross-browser differences that affect when a section is considered "viewed".
  - Decision it informs: Threshold values, debounce timings, and fallback strategy for legacy browsers.
  - What breaks without it: Incorrect progress marks, duplicated observers, and poor performance.

- Technology: HTTP semantics & Idempotency
  - Concept: Retry/backoff and status-code guidance for progress endpoint behavior
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Guides idempotent endpoint design, appropriate response codes for clients, and retry policies.
  - Decision it informs: Whether progress save is retried, how to signal transient vs permanent failures, idempotency key design.
  - What breaks without it: Client retry storms, duplicate writes, and unclear failure semantics.

- Technology: Authentication (JWT / App auth)
  - Concept: Auth scopes and token usage for per-user progress persistence
  - Official source: https://datatracker.ietf.org/doc/html/rfc7519 (JWT) and canonical OAuth2 docs as applicable
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures progress endpoints enforce per-user ownership and proper auth scopes for write/read operations.
  - Decision it informs: Endpoint placement (internal service vs app route), token validation approach, and rate-limiting per-identity.
  - What breaks without it: Unauthorized writes, privacy violations, and incorrect user-scoped data.
