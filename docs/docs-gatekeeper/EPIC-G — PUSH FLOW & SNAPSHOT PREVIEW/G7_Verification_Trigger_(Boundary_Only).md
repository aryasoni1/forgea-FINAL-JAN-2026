## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G7 — Verification Trigger (Boundary Only)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7*Verification Trigger (Boundary Only).md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md
  - /Users/aryasoni/Desktop/Forgea/packages/schema/prisma/schema.prisma

### REQUIRED OFFICIAL DOCUMENTATION

1) Queue technology guidance (choose and pin one)
- Technology: AWS SQS / Redis Streams / Postgres job-table
- Official sources: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html, https://redis.io/docs/manual/streams/, https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (pick the chosen infra and pin)
- Why required: Defines message schema limits, visibility/ack semantics, DLQ configuration, and replay behavior.
- Decision it informs: Canonical queue contract, ack/visibility semantics, DLQ thresholds, and idempotency TTL.
- What breaks without it: Misconfigured ack semantics, duplicate processing, and inability to guarantee once-only verification job dispatch.

2) Idempotency & HTTP semantics
- Technology: HTTP semantics (RFC 7231) and idempotency patterns
- Official sources: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231 (stable)
- Why required: Guides idempotency key design, error classification, and retry expectations for upstream callers or internal enqueuers.
- Decision it informs: Idempotency key format, TTL, and which errors are retried vs marked permanent.
- What breaks without it: Reprocessing duplicates or misclassifying transient errors.

3) Prisma schema & migrations guidance
- Technology: Prisma schema / migrations
- Official source: https://www.prisma.io/docs
- Exact version requirement: Pin Prisma client/migration versions used by mono-repo (VERSION UNKNOWN — MUST BE PINNED)
- Why required: Canonical location for `VerificationJob` model, migration patterns, and rollback guidance.
- Decision it informs: Model naming, types, constraints, and migration practices.
- What breaks without it: Incompatible schema changes, migration drift, and migration rollback ambiguity.

4) Postgres transactional patterns and advisory locks
- Technology: PostgreSQL transactions & advisory locks
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: Must match production Postgres major version (VERSION UNKNOWN — MUST BE PINNED)
- Why required: To implement safe enqueue-first patterns and prevent race-conditions when creating deduplicated `VerificationJob` records.
- Decision it informs: Use of unique constraints, upserts, and advisory locks for idempotent job creation.
- What breaks without it: Duplicate jobs, race conditions, and inconsistent job state.

### EXISTING INTERNAL DOCS (VERIFIED)

- `packages/schema/prisma/schema.prisma`
  - Coverage status: PARTIAL
  - Exact gaps: `VerificationLog` and `VerificationToken` exist, but `VerificationJob` model and migrations are missing.

- `packages/audit/src/audit.service.ts`
  - Coverage status: PARTIAL
  - Exact gaps: References `verificationLogId` but no contract for `VerificationJob` linkage and audit lifecycle for queued jobs.

- UI components under `apps/forgea-labs/*` (verification overlays and runner UX)
  - Coverage status: SUFFICIENT for UX hooks, but no machine-readable job contract.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs/EPIC-G/verification-job-contract.md` — Add canonical `VerificationJob` schema and message examples.
- `/docs/official-docs/EPIC-G/verification-queue-contract.md` — Specify queue technology, DLQ behavior, idempotency key format, and consumer ack semantics.

### STUDY GUIDE FOR HUMAN

- Detection criteria: Must be deterministic and machine-readable — include `labSessionId`, `labAttemptId`, `commitSha`, `sessionState==IN_PROGRESS`, `attemptState==READY_FOR_VERIFICATION`, and timestamp bounds. Avoid heuristics; use explicit enum states.
- Verification job schema essentials: `id (uuid)`, `labSessionId (uuid)`, `labAttemptId (uuid)`, `commitSha (text)`, `priority (int)`, `idempotencyKey (text)`, `createdAt (timestamp)`, `availableAt (timestamp)`, `ttlSeconds (int)`, `attempts (int)`.
- Idempotency: Use `idempotencyKey` derived from `labAttemptId` + `commitSha` and enforce unique constraint with TTL/expiry handled by queue or DB.
- Enqueue-first vs sync: Prefer enqueue-first (ack after durable persistence) to avoid long sync work in request path; require DLQ for failures.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-G/verification-job-contract.md
  - Purpose: Canonical `VerificationJob` Prisma model and external queue message schema with sample JSON payloads.
  - Exact knowledge to add: Field list (names/types), idempotency key derivation, TTL defaults, priority semantics, and consumer expectations.
  - Required version pin: Reference pinned Prisma/Postgres versions.

- Path: /docs/official-docs/EPIC-G/verification-queue-contract.md
  - Purpose: Integration checklist for queue tech (SQS/Redis Streams/Postgres) and DLQ configuration.
  - Exact knowledge to add: Visibility timeout recommendations, DLQ thresholds, retry/backoff policy, and sample consumer ack semantics.
  - Required version pin: Pin chosen queue infra docs.

- Path: /docs/official-docs/EPIC-G/verification-eligibility-rules.md
  - Purpose: Machine-readable detection rules that map `LabAttempt` and session fields to `eligible` boolean.
  - Exact knowledge to add: Enum state list, required field values, timestamp windows, and forbidden conditions.
  - Required version pin: N/A (internal), reference schema version.

### OPEN QUESTIONS / AMBIGUITIES

- Which queue technology is canonical for `verification-runner` consumers? (SQS/Redis/Postgres) — blocks schema and consumer contract.
- What are throughput/SLA targets and burst sizes for verification jobs? — blocks DLQ, concurrency, and capacity planning.
- Should job creation be synchronous in the API path or enqueue-first (ack-after-enqueue)? (affects latency and error handling)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G7 — Verification Trigger (Boundary Only)
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating detection criteria, job schema, integration checklist, and blocking preconditions for verification job creation.

---

This brief is intended for `planner-architect`, `implementer`, `integration-checker`, and `security-sentinel` to proceed with a safe, documented verification-job design.
