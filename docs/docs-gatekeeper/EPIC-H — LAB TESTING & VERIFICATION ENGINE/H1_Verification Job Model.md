## FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H1 — Verification Job Model
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7*Verification_Trigger*(Boundary_Only).md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

## REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable implementation the following external/authoritative docs must be referenced and pinned before implementation.

- Technology: Prisma (schema & migrate)
  - Concept: Schema modelling, migrations, safe DDL patterns with Prisma Migrate
  - Official source: https://www.prisma.io/docs/concepts/components/prisma-schema
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical schema syntax, migration generation, and recommended safe migration steps for production DBs.
  - Decision informed: Exact Prisma model shape and migration plan (up/down) for `VerificationJob` and `LabAttempt`.
  - Breaks without it: Risky migrations, incompatible Prisma types, and incorrect migration rollbacks.

- Technology: PostgreSQL DDL & Transaction semantics
  - Concept: Unique constraints, transactional DDL, index creation, concurrent index build, FK semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines how to enforce "one job per commit SHA" safely and how to perform non-blocking schema changes.
  - Decision informed: Uniqueness constraints, index types (btree vs hash), and backfill strategy.
  - Breaks without it: Data corruption or downtime from unsafe DDL; inability to guarantee uniqueness atomically.

- Technology: JSON Schema
  - Concept: Verification intake / artifact metadata schema
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Canonical format for persistent verification artifact metadata and intake payloads.
  - Decision informed: Field validation, sanitization, and storage format for `logs Json` and artifact metadata.
  - Breaks without it: Inconsistent artifact records and difficulties in cross-service validation.

- Technology: HTTP & Idempotency / Retry Patterns
  - Concept: Idempotency semantics and retry behavior for intake/enqueue endpoints
  - Official source: RFC 7231 (HTTP/1.1 Semantics)
  - Exact version requirement: RFC 7231
  - Why required: Defines retry semantics and expected safe handling of retries and idempotency keys.
  - Decision informed: How to derive idempotency keys (commit SHA vs delivery id) and how to respond to retries.
  - Breaks without it: Duplicate jobs, inconsistent deduplication behavior across clients.

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - Coverage status: SUFFICIENT
  - Notes: Contains orchestration-level analysis and required agents; informs gating and agent responsibilities.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - Coverage status: SUFFICIENT
  - Notes: Master task list enumerating H1 tasks (schema, linkage, invariants).

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing Prisma model and migrations; does not contain authoritative Prisma model contract nor migration recipes.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: `VerificationLog` exists but no `VerificationJob` or `LabAttempt` models; uniqueness constraints currently on `sessionId` not `commitSha`.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7*Verification_Trigger*(Boundary_Only).md
  - Coverage status: PARTIAL
  - Exact gaps: References VerificationJob contract at a high level; lacks model-level DDL and transactional enqueue guidance.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Mentions where `VerificationJob` should be added and related technologies, but many versions are `VERSION UNKNOWN` and required DB docs are not pinned.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

The code-orchestrator and master-task inputs provide sufficient high-level scope, but internal docs and the official-registry lack pinned external references and do not provide the required authoritative Prisma model, migration recipes, nor a LabAttempt ledger contract. To proceed safely, the internal docs listed below must be created or extended.

## STUDY GUIDE FOR HUMAN

For each required concept below: why it exists, alternatives, when NOT to use, and common mistakes.

- `VerificationJob` model (why): Represents queued / running verification with status and commit SHA deduplication.
  - Alternatives: Using only `VerificationLog` (immutable) — not suitable for queueing/status updates.
  - When NOT to use: Do not use `VerificationJob` as long-term immutable audit record; use `VerificationLog` or `VerificationResult` snapshots for that.
  - Common mistakes: Making commit SHA mutable; relying on non-unique indexes for deduplication; not separating transient job state from immutable results.

- `LabAttempt` ledger (why): Canonical ledger of user attempts (idempotency, retention, mapping to sessions/commits).
  - Alternatives: Reusing `LabSession` for attempt lineage — may conflate session state with attempt lifecycle.
  - When NOT to use: Avoid collapsing multiple attempts into a single session record where auditability is required.
  - Common mistakes: Not storing an idempotency key, or using attacker-controlled fields as sole dedup key without verification.

- Uniqueness by `commitSha` (why): Enforce single job per commit to prevent duplicate work and inconsistent results.
  - Alternatives: Use a stronger idempotency key (provider delivery id) or a combined (sessionId, commitSha) unique index.
  - When NOT to use: If multiple independent attempts per commit are intentionally allowed (explicit business decision).
  - Common mistakes: Relying only on application-level checks without DB constraint or transactional enqueue pattern.

## INTERNAL DOCS TO ADD OR EXTEND

(Required because coverage is PARTIAL)

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_job_schema.md
  - Purpose: Provide the authoritative Prisma model contract for `VerificationJob` (fields, types, nullability, indexes, enum values) and placement in `forgea-monorepo/packages/schema/prisma/schema.prisma`.
  - Exact knowledge to add:
    - Full Prisma `model VerificationJob { ... }` contract with field-level types and indexes.
    - Enum definition for job status and allowed transitions.
    - Example queries (enqueue transaction) demonstrating safe uniqueness enforcement.
    - Required Prisma Migrate hints and notes about non-blocking index builds.
  - Required version pin: Prisma docs pinned (VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION)

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/lab_attempt_ledger.md
  - Purpose: Define `LabAttempt` ledger contract, idempotency keys, retention policy, and mapping to sessions and verification jobs.
  - Exact knowledge to add:
    - Model contract for `LabAttempt` (fields: id, sessionId, commitSha, attemptNumber, sourceDeliveryId, createdAt, metadata).
    - Idempotency guidance (derive from webhook delivery id or commit+actor pair) and TTL for retention.
  - Required version pin: RFC 7231 or chosen idempotency guidance (RFC 7231)

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_migration_plan.md
  - Purpose: Migration up/down plan, backfill steps, and compatibility notes impacting `VerificationLog`.
  - Exact knowledge to add:
    - Up/down SQL snippets, expected lock characteristics, index build options, estimated durations, and rollback steps.
    - Backfill strategy for existing sessions and how to migrate `VerificationLog` uniqueness axis if needed.
  - Required version pin: PostgreSQL DDL guidance (VERSION UNKNOWN — MUST BE PINNED)

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/verification_security_checklist.md
  - Purpose: Short security checklist for `security-sentinel` covering race conditions, idempotency, attacker-controlled fields, and immutability enforcement.
  - Exact knowledge to add:
    - Threat models for commit SHA and intake endpoints, transactional enqueue patterns, and required audit logs.
  - Required version pin: N/A (internal checklist)

## OPEN QUESTIONS / AMBIGUITIES

- Exact idempotency key source: use `commitSha` alone, `commitSha+repoId`, or provider delivery id? (affects uniqueness index design)
- Required retention period for `LabAttempt` and verification artifacts.
- Whether `VerificationJob` should live in same DB schema as `VerificationLog` or a separate schema/service for isolation.

## MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md` (new):

- Epic / Feature: EPIC-H / H1 — Verification Job Model
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H1_Verification Job Model.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, schema gaps, and registry updates for the VerificationJob and LabAttempt ledger.
