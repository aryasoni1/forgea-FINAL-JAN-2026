# FEATURE DOCS BRIEF — G5: Lab Attempt Ledger (Immutable)

**FEATURE CONTEXT**

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G5 — Lab Attempt Ledger (Immutable)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger*(Immutable).md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below, the gatekeeper lists the canonical source, required pinning, why it's needed, decisions it informs, and what breaks without it.

1. Technology: GitHub Webhooks

- Concept: Webhook delivery semantics, headers, retry behavior (`X-GitHub-Delivery`) and signature verification
- Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines idempotency key candidate (`X-GitHub-Delivery`), retry timing, and payload schema used to create `LabAttempt` records reliably.
- Decision it informs: Which header/value to persist as idempotency key and how to handle retries vs duplicates.
- What breaks without it: Risk of incorrect deduplication, duplicate `LabAttempt` rows, and mismatched retry handling.

2. Technology: HTTP Semantics & Retry Patterns

- Concept: Idempotency and retry semantics (RFC 7231 + provider best-practices)
- Official source: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231 (stable)
- Why required: Provides canonical retry semantics and status-code meaning used when designing idempotency contract and webhook responses.
- Decision it informs: Whether to return 2xx for already-seen deliveries, or 4xx/5xx to force retries; backoff expectations.
- What breaks without it: Inconsistent retry behavior leading to lost or duplicated processing.

3. Technology: Durable Queue Options (AWS SQS)

- Concept: Durable queue + DLQ for webhook persistence and replay
- Official source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Optional architecture for decoupling webhook intake from DB writes and for replaying failed deliveries.
- Decision it informs: Whether implementer uses SQS as ingestion buffer and DLQ policy.
- What breaks without it: Higher coupling and risk of lost events during infra incidents.

4. Technology: Redis Streams

- Concept: Stream-based durable processing for webhook events
- Official source: https://redis.io/docs/manual/streams/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Alternative ingestion and replay semantics; affects idempotency window and dedup strategies.
- Decision it informs: Use of consumer groups and offset semantics vs DB-backed job table.
- What breaks without it: Missing guidance for stream-based replay semantics and consumer group handling.

5. Technology: Postgres job-table pattern

- Concept: DB-backed queue patterns (transactional enqueue + work) and uniqueness constraints
- Official source: https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: If opting for DB-backed ingestion, this documents safe enqueue/dequeue and transactional patterns.
- Decision it informs: Whether to persist raw webhook payloads and process them transactionally with `LabAttempt` writes.
- What breaks without it: Risk of non-transactional writes and potential duplicate or lost events.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger*(Immutable).md
  - Coverage status: SUFFICIENT for agent orchestration (execution plan)
  - Gaps: Does not specify schema fields, DB constraints, idempotency header choice, or retention placeholders.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Coverage status: SUFFICIENT for task scope but NOT a source of technical contract
  - Gaps: Lists tasks (26–34) but lacks schema and constraints required by implementer.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md
  - Coverage status: PARTIAL
  - Exact gaps: Notes missing `LabAttempt` model and idempotency; lacks schema proposal, constraint SQL, and retention guidance.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains entries for GitHub Webhooks and related technologies but several entries lack exact version pins and an explicit idempotency pattern reference for EPIC-G.

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - `/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md` — add the planner-architect schema contract and invariants.
  - `/docs/official-docs/EPIC-G/` (new) — add an authoritative `labattempt-ledger.md` covering schema, constraints, idempotency contract, and retention placeholders.
  - `/docs/official-docs-registry.md` — pin versions for GitHub Webhooks, HTTP/RFC docs, and chosen durable queue technology.

---

## STUDY GUIDE FOR HUMAN (KEY CONCEPTS)

- GitHub Webhooks: Why — provides `X-GitHub-Delivery` as a stable delivery id; Alternatives — provider-specific delivery IDs; When NOT to use — if webhook source is untrusted or mutated; Common mistakes — relying on timestamp alone for idempotency.

- Idempotency & Retry (RFC 7231): Why — defines whether to retry and how status codes propagate; Alternatives — application-level idempotency tokens; When NOT to use — when implementing synchronous guaranteed processing (use queue instead); Mistakes — treating 2xx as always-successful without checking dedup store.

- Durable Queues vs DB-backed queues: Why — decouples ingestion from processing; Alternatives — Redis Streams, Postgres job-table; When NOT to use — when latency-sensitive synchronous writes are required; Mistakes — assuming queue guarantees deduplication without explicit idempotency key persistence.

- Append-only ledger invariants: Why — forensic traceability and snapshot reproducibility; Alternatives — soft-delete plus audit log; When NOT to use — when storage cost prohibits long retention; Mistakes — allowing UPDATE/DELETE via ORM without DB constraints.

---

## INTERNAL DOCS TO ADD OR EXTEND (canonical paths)

Only include these if coverage is PARTIAL or MISSING.

1. Path: /docs/official-docs/EPIC-G/labattempt-ledger.md

- Purpose: Planner-architect canonical schema and invariants for `LabAttempt` (authoritative for implementer/security-sentinel)
- Exact knowledge to add:
  - Prisma `model LabAttempt` text snippet
  - DB unique/index requirements and example SQL
  - Append-only enforcement recommendations (DB-level + service-layer)
  - Idempotency contract (header names, TTL, and expected duplicate behavior)
  - Retention & archival placeholders (durations and sinks)
  - Queries implementer must support and minimal integration-test matrix
- Required version pin: n/a (internal doc) — reference pinned official sources listed above.

2. Path: /docs/official-docs/EPIC-G/webhook-ingestion-contract.md

- Purpose: Document webhook header mapping, raw payload persistence rules, and mapping to `LabSession`
- Exact knowledge to add: which headers to trust (`X-GitHub-Delivery`, `X-GitHub-Event`, `X-Hub-Signature-256`), payload retention TTL, and HMAC verification parameter pin.
- Required version pin: match GitHub Webhook doc pin.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which durable ingestion pattern will be chosen (SQS vs Redis Streams vs DB job table)? This choice affects TTLs and idempotency storage placement.
- Organizational retention/PII policies (legal/GDPR) — required to pin retention windows.
- Ownership decision between `VerificationLog` and `LabAttempt` responsibilities — must reconcile to avoid duplicated storage of verification results.

---

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G5 — Lab Attempt Ledger (Immutable)
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, schema contract needs, and registry updates for LabAttempt ledger.

---

## NEXT (for planner-architect output expected by implementer)

Planner-architect must produce a deterministic schema artifact (YAML/MD or Prisma snippet) containing:

- `LabAttempt` fields and types (id, sessionId FK, commitSha, author metadata, branch, changedFiles JSONB, attemptedAt timestamp, deliveryId idempotency key, createdAt)
- DB indexes & unique constraint to enforce uniqueness on (`sessionId`, `commitSha`) and unique index on `deliveryId`
- Append-only invariants and enforcement locations (DB constraint + deny UPDATE/DELETE roles + service-layer prohibitions)
- Idempotency contract (use `X-GitHub-Delivery` as primary idempotency key; on duplicate: return existing record, skip downstream processing, log duplicate in `AuditLog`)
- Retention placeholders and archival target recommendations (cold S3 after 365 days; audit retention 3–7 years per legal)
- Deliverables list for `implementer` (Prisma `model` snippet, migration notes, example SQL, example queries, minimal tests to validate idempotency and append-only behavior)

Reference: this brief and `/Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md`.

---

End of gatekeeper brief.
