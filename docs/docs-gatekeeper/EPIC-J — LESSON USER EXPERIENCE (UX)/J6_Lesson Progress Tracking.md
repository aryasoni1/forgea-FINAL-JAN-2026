FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J6 — Lesson Progress Tracking
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md
  - /docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md
  - /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

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

EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md
  - Coverage status: SUFFICIENT
  - Notes: Provides the authoritative feature analysis, agent roles, and execution plan required by Docs Gatekeeper.

- Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - Coverage status: PARTIAL
  - Exact gaps: Describes semantic markup and visibility semantics but does not supply a machine-readable progress JSON schema, backend API contract, offline sync guidance, or tests.

- Doc path: /docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md
  - Coverage status: PARTIAL
  - Exact gaps: Investigative findings / implementer handoff exist but lack canonical schema, API endpoint paths, and authoritative backend location for persistence.

- Other internal docs searched: `/docs/official-docs/EPIC-J/*` and `/docs/docs-gatekeeper/EPIC-J/*`
  - Coverage status: INSUFFICIENT
  - Exact gaps: No existing `lesson-progress` JSON schema, no API contract doc, no offline sync doc, and no integration-test guidance.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - `/docs/docs-gatekeeper/EPIC-J/J5_Lesson Layout (UI).md` — add explicit visibility-to-progress mapping and recommended IntersectionObserver thresholds.
  - `/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md` — convert implementer handoff into canonical API and schema artifacts.

If not addressed, implementers will produce diverging progress implementations across apps and risk privacy/consistency issues.

STUDY GUIDE FOR HUMAN

- JSON Schema (progress payload)
  - Why this exists: Single source of truth for payload validation and migration.
  - Why alternatives exist: Ad-hoc payloads are faster initially but break cross-app compatibility.
  - When NOT to use: Avoid using ad-hoc forms when multiple clients consume/produce progress.
  - Common engineering mistakes: Omitting a `version` field; using non-idempotent keys; coupling UI-only fields into persisted payloads.

- Service Worker / Offline Sync
  - Why this exists: To reliably surface buffered progress during flaky connectivity and to reduce data loss.
  - Why alternatives exist: App-layer buffering (localStorage) is simpler but lacks background sync guarantees.
  - When NOT to use: When the target browsers do not support Service Workers or background-sync, or where server-side persistence is not required.
  - Common engineering mistakes: Relying on unreliable background sync in browsers that throttle service workers; storing sensitive user data unencrypted in persistent caches.

- IntersectionObserver
  - Why this exists: Provides performant visibility detection for marking sections as "viewed".
  - Why alternatives exist: Scroll event heuristics or manual timers; these are less efficient and more error-prone.
  - When NOT to use: Very old browser targets without polyfills or in server-only rendering contexts.
  - Common engineering mistakes: Using too-low thresholds, not debouncing events, and creating duplicate observers on the same DOM nodes.

- HTTP semantics & Idempotency
  - Why this exists: Prevent duplicate writes and clarify transient vs permanent failure handling.
  - Why alternatives exist: Fire-and-forget client-only saves, which risk data loss.
  - When NOT to use: When progress is purely ephemeral and not persisted server-side.
  - Common engineering mistakes: Returning ambiguous status codes (e.g., 200 for failed saves) and lacking idempotency keys for retried requests.

- Authentication & Authorization
  - Why this exists: Ensures per-user progress maps to owning identity and limits read/write scope.
  - Why alternatives exist: Anonymous progress is simpler but compromises cross-session resume.
  - When NOT to use: Public demo flows where privacy is intentionally not enforced.
  - Common engineering mistakes: Storing progress with insufficient owner linkage, exposing other users' progress via lax ACLs.

INTERNAL DOCS TO ADD OR EXTEND
(required because coverage is PARTIAL)

- Path: /docs/official-docs/EPIC-J/lesson_progress_schema_v1.md
  - Purpose: Provide the canonical JSON Schema (2020-12) for progress payloads, examples, and versioning rules.
  - Exact knowledge to add: Full JSON Schema with `version`, `userId` (server-validated), `lessonId`, `sections[]` with `id`,`viewedPct`,`lastSeenAt`, and migration guidance.
  - Required version pin: JSON Schema 2020-12

- Path: /docs/official-docs/EPIC-J/lesson_progress_api.md
  - Purpose: API contract for saving/retrieving per-user per-lesson progress.
  - Exact knowledge to add: Endpoint URIs (e.g., `/api/lessons/:lessonId/progress`), methods (`GET`, `PUT/POST`), auth expectations, idempotency key guidance, example requests/responses, rate-limit recommendations, and error codes mapping to RFC 7231 semantics.
  - Required version pin: RFC 7231 for status-code semantics; JWT (RFC 7519) if JWT is used for auth.

- Path: /docs/official-docs/EPIC-J/offline_sync_and_service_worker.md
  - Purpose: Design guidance for offline buffering, localStorage vs IndexedDB trade-offs, and Service Worker background-sync recommendations.
  - Exact knowledge to add: Recommended storage (IndexedDB), sync/backoff policy, privacy considerations, and browser compatibility matrix.
  - Required version pin: Service Worker spec (pin before implementation)

- Path: /docs/docs-gatekeeper/EPIC-J/J6_Implementer_Checklist.md
  - Purpose: Checklist for implementers (where to add hooks, files to modify, tests to add) and references to the above official docs.
  - Exact knowledge to add: File-level touchpoints (e.g., `apps/forgea-lessons/components/lesson-renderer.tsx`), test placement, and sample integration test cases.
  - Required version pin: N/A (internal)

OPEN QUESTIONS / AMBIGUITIES

- Which app owns persistence: `apps/forgea-lessons`, `apps/forgea-labs`, or a central `services/` API? This is a blocker for endpoint placement.
- Is progress intended to be authenticated per-user only (server-side) or optionally anonymous (client-only)? Impacts auth and data retention.
- Retention & privacy: how long to retain progress records and whether to allow export/deletion per user request.

MASTER DOCS REGISTRY ACTION

- Append entry to `/docs/master_docs.md`:
  - Epic / Feature: EPIC-J / J6 — Lesson Progress Tracking
  - Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and required implementer artifacts (schema, API contract, offline sync guidance).
