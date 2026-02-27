### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: FEATURE K6 — Step-Based Editing Rules
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - Coverage status: SUFFICIENT (describes feature intent and high-level orchestration)
  - Exact gaps: Not machine-readable; no schema, no persistence or API contract.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - Coverage status: SUFFICIENT (authoritative inventory of repository state and explicit missing items)
  - Exact gaps: Calls out missing artifacts but does not provide canonical schema or spec text.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - Coverage status: SUFFICIENT (feature scope and acceptance criteria listed)
  - Exact gaps: Does not define runtime invariants, API signatures, or persistence contracts.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: References `.forgea/steps.json` expectations but lacks a machine-readable steps schema and mapping artifacts.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: INSUFFICIENT
  - Exact gaps: No per-step persistence model (`StepVerification` / `LabAttempt` / `VerificationStep`) present; missing uniqueness/index constraints for per-commit+step enforcement.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs that must be extended:

- `/docs/official-docs/EPIC-K/steps_schema.md` — add canonical JSON Schema for `.forgea/steps.json` and validation rules.
- `/docs/official-docs/EPIC-K/step_persistence_model.md` — define Prisma model suggestion, required fields, indexes, FK relations, and uniqueness constraints.
- `/docs/official-docs/EPIC-F/step_mapping_and_event_contract.md` — document step-to-verification mapping and event contract for step-change notifications.

### STUDY GUIDE FOR HUMAN

- `JSON Schema (steps.json)`: Why — single source-of-truth for step metadata. Alternatives — ad-hoc YAML without schema (avoid). When NOT to use — tiny throwaway labs where strict validation is unnecessary. Mistakes — ambiguous optional fields, non-deterministic `editableGlobs` formats.
- `Glob / Pathspec`: Why — consistent lock semantics across components. Alternatives — explicit file lists (more verbose). When NOT to use — if exact file lists are always known. Mistakes — mixing gitignore semantics with minimatch leading to mismatches.
- `Per-step persistence (Prisma/Postgres)`: Why — atomicity, auditability, and uniqueness. Alternatives — ephemeral in-memory session store (not durable). When NOT to use — prototypes without multi-session concurrency. Mistakes — missing unique constraint on `(commitSha, stepName)` or missing FK to `LabSession`.
- `API contracts & Event contract`: Why — UI needs deterministic active-step lookup and notifications. Alternatives — UI polling (higher latency). When NOT to use — extremely low-traffic admin-only tools. Mistakes — unauthenticated endpoints, unclear error codes, or non-idempotent mark-complete endpoints.

### INTERNAL DOCS TO ADD OR EXTEND

Only included because coverage is PARTIAL.

1. Path: /docs/official-docs/EPIC-K/steps_schema.md
   - Purpose: Canonical JSON Schema for `.forgea/steps.json` and examples.
   - Exact knowledge to add: Full JSON Schema, semantics of `stepName`, `editableGlobs`, `readOnlyGlobs`, `order`, `metadata` fields, validation errors and migration guidance.
   - Required version pin: JSON Schema draft 2020-12

2. Path: /docs/official-docs/EPIC-K/step_persistence_model.md
   - Purpose: Persistence contract for per-step state.
   - Exact knowledge to add: Proposed Prisma model (`StepVerification`), fields (id, labSessionId FK, stepName, commitSha, status enum, startedAt, finishedAt, metadata JSON, createdAt), uniqueness `(commitSha, stepName)`, indexes, retention guidance, and migration notes referencing current `schema.prisma` where missing.
   - Required version pin: Prisma schema reference (pin Prisma CLI version used by repo).

3. Path: /docs/official-docs/EPIC-F/step_mapping_and_event_contract.md
   - Purpose: Step->verification mapping and event contract for active-step notifications.
   - Exact knowledge to add: Event name(s), payload shape, delivery semantics (SSE/Webhook/SNS), retry/idempotency expectations, auth and subscription model.
   - Required version pin: Event transport spec chosen (SSE / Webhook delivery semantics) — VERSION UNKNOWN until chosen.

### OPEN QUESTIONS / AMBIGUITIES

- Ownership: `apps/lab-ui` and `packages/virtual-fs` are referenced as owners but are absent in repo; who will own spec and implementation?
- Persistence model choice: extend `LabSession` vs dedicated `StepVerification` model — which pattern does Org prefer for auditability?
- Glob implementation: which glob/pathspec implementation will be pinned (gitignore semantics vs minimatch vs pathspec)?
- Event transport: prefer SSE, Webhook, or message-broker for active-step notifications?
- Retention windows: acceptable retention for per-step records and audit logs (30/90/365 days?)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K6 — Step-Based Editing Rules
- Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based_Editing_Rules.md
- Status: ADDED (EXTEND)
- Reason: Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates needed to implement step-based editing rules.

# FEATURE DOCS BRIEF — FEATURE K6: Step-Based Editing Rules

## FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: FEATURE K6 — Step-Based Editing Rules
- Exact input files read:
  - docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - forgea-monorepo/packages/schema/prisma/schema.prisma
  - docs/master_docs.md
  - docs/official-docs-registry.md

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below provide technology, concept, official source, exact version requirement (or pinning note), why required, what decision it informs, and what breaks without it.

- Technology: JSON Schema
  - Concept: Machine-readable schema for `.forgea/steps.json` (validation, contract between editors and backend)
  - Official source: https://json-schema.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical step file format, validation rules, and stable expectations for frontend and backend parsers.
  - What decision it informs: Schema fields, step naming, file-glob mapping, and validation flow used by UI and server.
  - What breaks without it: Divergent step formats, inability to reliably lock/unlock files, and verification mismatches across services.

- Technology: Prisma schema / database modelling guidance
  - Concept: Canonical data model for per-step persistence (`StepVerification`/`LabAttempt`), FK constraints, uniqueness and indexes
  - Official source: https://www.prisma.io/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures DB model choices (types, constraints, nullability) map correctly to runtime enforcement and queries.
  - What decision it informs: Whether to extend `LabSession` or add dedicated `StepVerification` model; index strategy for queries by `commitSha`+`stepName`.
  - What breaks without it: Incorrect migrations, runtime race conditions, and non-atomic verification state.

- Technology: Postgres constraint/indexing best practices
  - Concept: Unique constraints, partial indexes, transactional patterns for per-step state
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To design efficient lookups and prevent duplicate verification attempts for same `commitSha`+`stepName`.
  - What decision it informs: Index choice, uniqueness enforcement strategy, and retention/archival approaches.
  - What breaks without it: Poor performance, duplicate/contradictory verification records, and broken enforcement.

- Technology: REST / OpenAPI design
  - Concept: API contract style and error semantics for endpoints (fetch active step, list editable globs, mark completion)
  - Official source: https://spec.openapis.org/oas/latest.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To define consistent request/response shapes, auth patterns, and standard error codes used by UI and services.
  - What decision it informs: Endpoint shapes, auth middleware expectations, and client-side error handling.
  - What breaks without it: Inconsistent API shapes, client integration friction, and unclear auth/permission boundaries.

- Technology: Webhook / event delivery & notification patterns (if event-driven step-change updates chosen)
  - Concept: How backend signals UI about active-step changes (webhooks, SSE, WebSocket)
  - Official source: (varies by choice; e.g., W3C WebSocket / SSE specs) https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API and https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To decide push vs poll delivery and acceptable guarantees for UI update latency.
  - What decision it informs: Implementation approach for the frontend: polling frequency, socket lifetime, or event subscription.
  - What breaks without it: Non-deterministic UX, duplicated events, or missed step-change notifications.

## EXISTING INTERNAL DOCS (VERIFIED)

For each relevant internal doc present in the repo, coverage status and exact gaps.

- docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - Coverage status: SUFFICIENT
  - Exact gaps: N/A — this is the orchestration feature brief used as authoritative input for the task.

- docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based Editing Rules.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (schema, persistence model, APIs) but does not contain machine-readable schema or definitive persistence contract.

- docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - Coverage status: SUFFICIENT
  - Exact gaps: Task list enumerates feature items, but lacks the canonical schema and concrete API/persistence contracts.

- docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: References canonical `.forgea/steps.json` schema and expectations but does not ship machine-readable schema or pinned spec versions.

- forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: Prisma schema exists for `Lab`/`LabSession` models but lacks per-step verification model (`StepVerification`/`LabAttempt`) and indexing constraints required for FEATURE K6.

- docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry lists some related technologies but contains many `VERSION UNKNOWN` entries and does not yet include explicit entries for `JSON Schema` pinning or the per-feature usage for K6.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:

- `docs/official-docs/steps.schema.json` — MUST be added: canonical JSON Schema for `.forgea/steps.json` (machine-readable; used by frontend/backend validation).
- `forgea-monorepo/packages/schema/prisma/schema.prisma` — extend with `StepVerification` (or `LabAttempt`) model and document constraints/indexes in the official docs.
- `docs/official-docs/api-contracts/K6_step-api.md` — MUST be added: OpenAPI-style endpoint definitions for step-related APIs.
- `docs/official-docs/frontend-contracts/K6_frontend_signals.md` — MUST be added: frontend event/polling contract and UI states.

## STUDY GUIDE FOR HUMAN

For each required concept below, concise guidance to study and why.

- `JSON Schema for .forgea/steps.json`
  - Why this exists: To define a single source of truth for step definitions and file-glob mappings used by all services.
  - Why alternatives exist: Simpler ad-hoc formats reduce upfront work but increase divergence risk.
  - When NOT to use it: For ephemeral or experiment-only step formats where strict validation isn't required.
  - Common mistakes: Leaving schema unpinned to a draft; exposing implementation-only fields; not validating on ingest.

- `Prisma / DB modelling`
  - Why this exists: Durable per-step state with uniqueness guarantees and auditability.
  - Why alternatives exist: Using a transaction log or external verification service can be okay for low-volume systems.
  - When NOT to use it: When step state is purely client-side or transient with no audit requirements.
  - Common mistakes: Failing to enforce unique `commitSha`+`stepName`, using nullable fields without reason, or missing indexes for lookups.

- `API contract (OpenAPI/REST)`
  - Why this exists: Clear, language-agnostic integration points between UI and backend.
  - Why alternatives exist: GraphQL or RPC can work but require different client contracts.
  - When NOT to use it: Internal-only experiments where tight coupling is acceptable.
  - Common mistakes: Over-broad response shapes, unclear error semantics, and lacking auth/permission details.

- `Frontend event/polling contract`
  - Why this exists: To ensure UI updates step-change reliably and to present consistent lock states.
  - Why alternatives exist: Polling is simpler; WebSockets provide lower latency but more infra complexity.
  - When NOT to use it: Low-traffic environments where eventual consistency is acceptable.
  - Common mistakes: Not debouncing events, allowing stale caches to override server state, or failing to show explicit UX messages for locked files.

- `Retention & audit guidance`
  - Why this exists: For forensics, user support, and compliance.
  - Why alternatives exist: Keep minimal logs for privacy-sensitive contexts.
  - When NOT to use it: For ephemeral training labs that should not retain user data.
  - Common mistakes: Infinite retention by default, lack of archival policy, and missing access controls on logs.

## INTERNAL DOCS TO ADD OR EXTEND

Only include if coverage is PARTIAL or MISSING.

- Path: docs/official-docs/steps.schema.json
  - Purpose: Canonical JSON Schema for `.forgea/steps.json` (validation and contract).
  - Exact knowledge to add: Full JSON Schema, examples, field semantics (`stepName`, `editableGlobs`, `lockedGlobs`, `verificationId`, ordering), and version pin (JSON Schema draft used).
  - Required version pin: JSON Schema draft — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION.

- Path: docs/official-docs/prisma/step-verification-model.md
  - Purpose: Describe the proposed Prisma model addition and migration notes.
  - Exact knowledge to add: Model with fields (id, labSessionId, stepName, commitSha, status, startedAt, finishedAt, metadata JSON, verificationAttemptId), uniqueness constraint (`commitSha` + `stepName` + maybe `labSessionId`), indexes, FK relations, and example queries.
  - Required version pin: Prisma client/CLI version used in repo — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION.

- Path: docs/official-docs/api-contracts/K6_step-api.md
  - Purpose: OpenAPI-style spec for endpoints: `GET /sessions/{id}/active-step`, `GET /sessions/{id}/steps/{stepName}/editable-globs`, `POST /sessions/{id}/steps/{stepName}/complete`.
  - Exact knowledge to add: Request/response shapes, auth scopes, error codes, rate limits, and example responses.
  - Required version pin: OpenAPI version — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION.

- Path: docs/official-docs/frontend-contracts/K6_frontend_signals.md
  - Purpose: Describe UI states, event names, polling vs push semantics, UX copy for locked edits.
  - Exact knowledge to add: Event names (e.g., `step:changed`, `step:locked`), payload shapes, client reconnection rules, and accessibility notes.
  - Required version pin: N/A (internal spec), but reference to web socket/SSE draft if used.

- Path: docs/official-docs/retention/step-verification-retention.md
  - Purpose: Retention, archival, and deletion policy for step-state and verification logs.
  - Exact knowledge to add: Retention period (e.g., 90 days/1 year), archival flow, GDPR/PD considerations, and access controls.
  - Required version pin: N/A (policy doc) but align with org retention policy in `docs/GLOBAL-POLICY.md`.

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which JSON Schema draft should be the canonical pin for `.forgea/steps.json`? (Draft-07 / 2019-09 / 2020-12)
- Which persistence model is preferred: extend `LabSession` or add dedicated `StepVerification` / `LabAttempt` model?
- Who owns the implementation when `apps/lab-ui` and `packages/virtual-fs` trees are missing from the repo?
- Desired retention period for per-step records and audit logs (privacy/compliance constraints).
- Event delivery choice for UI updates: polling, SSE, or WebSocket? This affects infra and docs.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K6_Step-Based_Editing_Rules.md — Gatekeeper brief and required-docs checklist for FEATURE K6 (Step-Based Editing Rules).
