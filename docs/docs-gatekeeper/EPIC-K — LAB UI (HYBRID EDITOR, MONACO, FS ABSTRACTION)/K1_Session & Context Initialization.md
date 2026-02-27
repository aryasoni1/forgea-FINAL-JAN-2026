FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K1 — Session & Context Initialization
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md
  - /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md
  - forgea-monorepo/apps/forgea-labs/middleware.ts
  - forgea-monorepo/apps/forgea-labs/auth.config.ts
  - forgea-monorepo/apps/forgea-labs/lib/auth.ts
  - forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts
  - forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts
  - forgea-monorepo/packages/schema/src/types.ts
  - forgea-monorepo/packages/schema/prisma/schema.prisma
  - forgea-monorepo/.github/copilot-instructions.md
  - docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS (related notes)

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

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md
  - Coverage status: PARTIAL
  - Exact gaps: Documents runtime surfaces and missing canonical `forgea.config.json` path, no machine-readable manifest/schema, and no session-creation API contract.

- /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator observations present; lacks final approval decisions for canonical manifest location and DLQ/queue selection.

- /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS (related docs)
  - Coverage status: PARTIAL
  - Exact gaps: Discusses `forgea.config.json` management but marks canonical path as BLOCKER; webhook idempotency and DLQ patterns referenced but not specified.

- forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts and packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: Server-side session lifecycle and DB model exist, but there is no published API contract documenting an atomic repo+session creation endpoint with idempotency guarantees.

- forgea-monorepo/apps/forgea-labs/middleware.ts and auth config files
  - Coverage status: PARTIAL
  - Exact gaps: Edge-safe middleware guidance present; does not include the session-creation API or manifest validation rules.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

List of docs to extend (minimum):

- docs/docs-gatekeeper/EPIC-F — extend to record canonical `forgea.config.json` path decision and manifest schema reference.
- /docs/official-docs/EPIC-K/session-creation-api-contract.md — new doc (see below) required to publish atomic API contract with idempotency semantics.
- /docs/official-docs/EPIC-F/webhook-idempotency-and-dlq.md — new doc required to specify idempotency key format, storage lifetime, DLQ behavior, and test cases.

STUDY GUIDE FOR HUMAN

- GitHub Webhooks:
  - Why: Source of external events; must be authenticated and deduplicated.
  - Alternatives: Polling (not recommended for real-time flows) or GitHub Apps with Jobs (requires installation tokens).
  - When NOT to use: When event volume is extremely low and manual polling is acceptable.
  - Common mistakes: Using `userForkUrl` as primary key (brittle), not verifying signatures, assuming exactly-once delivery.

- Idempotency & Retry:
  - Why: Protects against duplicate processing and safely distinguishes retryable vs permanent failures.
  - Alternatives: Best-effort dedup in handler (insufficient at scale) or synchronous blocking (bad UX and failure modes).
  - When NOT to use: N/A — idempotency is required for webhooks.
  - Common mistakes: Short idempotency key TTL, not persisting keys, tying keys to mutable fields.

- Durable Queues & DLQ:
  - Why: Provide persistent, replayable ingestion and failure isolation.
  - Alternatives: In-memory queues (not durable), direct DB-only processing without DLQ (lossy), or serverless immediate processing (no replay).
  - When NOT to use: If event volume is tiny and simplicity outweighs operational guarantees.
  - Common mistakes: Not provisioning DLQ retention, coupling enqueue with non-transactional side-effects, or relying on provider defaults.

INTERNAL DOCS TO ADD OR EXTEND

Only include if coverage is PARTIAL (see above).

1. Canonical manifest doc
   - Path: /docs/official-docs/EPIC-K/forgea.config.json-manifest.md
   - Purpose: Define canonical repository path for `forgea.config.json`, machine-readable JSON Schema, validator CLI, deterministic error codes, and sample manifests.
   - Exact knowledge to add: canonical path decision (repo root vs per-lab subdirectory), full JSON Schema (pinned version), validator usage, error-code mapping, and CI acceptance tests.
   - Required version pin: JSON Schema version — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Session-creation API contract (atomic repo + session creation)
   - Path: /docs/official-docs/EPIC-K/session-creation-api-contract.md
   - Purpose: Publish OpenAPI-compatible spec for endpoint that creates repo (if needed) and issues `LabSession` atomically, including idempotency key handling and exact response shapes.
   - Exact knowledge to add: OpenAPI spec, idempotency header names, error mapping (retryable vs permanent), and acceptance tests.
   - Required version pin: OpenAPI version — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Webhook idempotency & DLQ guidance
   - Path: /docs/official-docs/EPIC-F/webhook-idempotency-and-dlq.md
   - Purpose: Define idempotency key format, storage lifetime, enqueue-first semantics, DLQ behavior and operator runbooks for replay.
   - Exact knowledge to add: recommended queue tech, retention, DLQ redrive steps, monitoring signals, and test cases.
   - Required version pin: Provider docs referenced (SQS/Redis/Postgres) — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Canonical `forgea.config.json` repository path: repo root vs /labs/<lab-id>/forgea.config.json — DECISION REQUIRED (stakeholders: Platform Infra, EPIC-F owner, EPIC-K owner, Security).
- Manifest schema version: which JSON Schema draft to pin (e.g., 2020-12) — DECISION REQUIRED.
- Queue technology choice for durable webhook ingestion and DLQ (SQS vs Redis Streams vs Postgres job table) — infra + cost + SLA tradeoff needed.
- Approval required for webhook mapping key (prefer `repository.id` over `userForkUrl`) — security and product confirmation required.

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K1 — Session & Context Initialization
- Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md
- Status: ADDED (EXTEND)
- Reason: Docs Gatekeeper brief enumerating required official docs (webhooks, idempotency, durable queues, JSON Schema), internal gaps (canonical manifest path, session API contract, webhook DLQ/idempotency) and required stakeholder approvals.
