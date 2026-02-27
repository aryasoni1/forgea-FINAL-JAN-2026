FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H2 — Job Queue & Scheduling
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below the implementer MUST pin an official spec or vendor doc before work begins. If a version or stable URL is not yet chosen, mark it `VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION`.

- Technology: Queue durability & DLQ options
  - Concept: Durable queue and DLQ behaviour
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs guarantees for message durability, replay, and DLQ handling used by job persistence and recovery.
  - What decision it informs: Whether the team uses an external queue, stream, or DB-backed job table and the DLQ semantics (redrive, retention, visibility timeout).
  - What breaks without it: Incorrect expectations about at-least-once vs exactly-once, DLQ handling, and retention leading to lost or duplicated verification runs.

- Technology: Locking & concurrency primitives (distributed locks)
  - Concept: Correct locking semantics and TTLs for single-active-job invariants
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines safe locking patterns (e.g., lease TTLs, renewal strategy, failure modes) to guarantee one active verification per LabSession.
  - What decision it informs: Lock choice and fallback when lock-store is partitioned or slow.
  - What breaks without it: Risk of parallel verification runs and conflicting state updates.

- Technology: Retry & idempotency guidance
  - Concept: Retry classification (transient vs permanent), idempotency key patterns
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To create a retry policy that avoids DoS/replay while allowing infra retries.
  - What decision it informs: Retry counts, backoff, idempotency key lifetime and storage.
  - What breaks without it: Infinite retries, duplicate recording of verification results, and abuse surface.

- Technology: HTTP & status-code semantics
  - Concept: Response codes that define retryability
  - Official source: RFC 7231 (or chosen HTTP guidance) — VERSION MUST BE PINNED
  - Exact version requirement: RFC 7231 (or equivalent) — PIN REQUIRED
  - Why required: Clear mapping of which status codes are treated as retryable by clients and queue workers.
  - What decision it informs: Job result classification and retry routing to DLQ vs retry.
  - What breaks without it: Misclassification of permanent failures as retryable.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - No formal, machine-readable Queue Contract (locking semantics, retry categories, idempotency key format).
    - No API surface for enqueue/dequeue/status/cancel/DLQ handling.
    - No persistence migration notes or schema for durable job storage.
    - No operational runbook or monitoring thresholds.

- Doc path: /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - Confirms missing implementation artifacts but provides no concrete contract or test-checklist.

---

**DOCUMENTATION COVERAGE DECISION**

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - `/docs/official-docs/EPIC-H/queue_contract.md` — must contain the authoritative Queue Contract (see below) and exact pinned references.
  - `/docs/official-docs/EPIC-H/verification_job_api.md` — API surface (endpoints/messages and schemas) and idempotency key format.
  - `/docs/official-docs/EPIC-H/queue_persistence_and_migrations.md` — DB schema/migration guidance for durable job storage.
  - `/docs/official-docs/EPIC-H/locking_and_invariants.md` — locking semantics, TTLs, renewal patterns, and failure modes.
  - `/docs/official-docs/EPIC-H/operational_runbook_queue.md` — monitoring, alerting, scaling/backpressure behavior, and migration checklist.

---

### QUEUE CONTRACT (AUTHORITATIVE)

This contract MUST be copied verbatim into `/docs/official-docs/EPIC-H/queue_contract.md` and pinned.

- Scope & purpose:
  - A job queue for verification runs for LabSessions. Jobs are verification attempts that run against a single LabSession.

- FIFO semantics:
  - FIFO ordering is guaranteed per `LabSession` only. Jobs for different LabSessions may be processed in any order.
  - Definition: For a given `LabSession.id`, jobs are dequeued and become visible to workers in the order they were enqueued.

- Single-active-job invariant (locking):
  - At most one job for a given `LabSession.id` may be actively processed at any time.
  - Lock semantics: Acquire a session-scoped exclusive lock prior to starting processing. The lock must have a lease TTL and support renewal by the active worker.
  - Lock failure behavior: If lock cannot be acquired within configurable timeout, worker must re-enqueue or abort per backpressure policy.
  - Lock ownership: Include `worker_id` and `lease_expiry` in lock metadata. Lock must be revocable by operator tools.

- Retry policy:
  - Classify errors into `INFRA_TRANSIENT` (retryable) and `PERMANENT` (non-retryable).
  - Retryable: network timeouts, transient storage errors, worker OOMs — implement exponential backoff with capped attempts.
  - Permanent: validation errors, deterministic test failures, malformed payloads — mark job terminal and do not retry.
  - Idempotency: Each job has an `idempotency_key` derived from `LabSession.id` + `attempt_nonce` (or explicit attempt counter). The system must deduplicate jobs with identical keys.
  - Max attempts before DLQ: Configurable (default N — to be pinned). After N retry attempts, job is moved to DLQ with failure reason.

- Backpressure strategy & overload behavior:
  - Primary strategy: apply controlled delay + scale. Under overload, prefer delaying (rate-limit enqueue acceptance) and signal upstream clients with `429`/`503` per HTTP semantics.
  - Drop policy: Only allowed for non-critical, low-priority jobs after explicit operator decision. Never drop jobs for active user-facing verification without DLQ capture.
  - Operator scaling: Document autoscale signals (queue-depth, processing-latency, lock-contention) and thresholds in runbook.

- Dead Letter Queue (DLQ) semantics:
  - Jobs that exhaust retry attempts or are explicitly marked PERMANENT move to DLQ with full failure metadata and original payload.
  - DLQ retention, visibility, and redrive procedures must be documented in operational runbook.

- Idempotency key guidance:
  - Format: `labSession:{LabSession.id}:attempt:{attempt_id}` or explicit UUID supplied by caller.
  - Lifetime: Stored at least for the sum of max retry window + safety margin. Exact TTL must be pinned in `/docs/official-docs/EPIC-H/verification_job_api.md`.

---

### IMPLEMENTER + INTEGRATION-CHECKER TASK BREAKDOWN (PRIORITIZED)

1. Queue Contract doc (high priority)
   - Deliverable: `/docs/official-docs/EPIC-H/queue_contract.md` (authoritative text from this brief).

2. API surface for queue service (high priority)
   - Deliverable: `/docs/official-docs/EPIC-H/verification_job_api.md`
   - Must include: `enqueue`, `dequeue` (worker), `ack`, `nack`, `status`, `cancel`, `dlq/retry` endpoints or message formats; request/response schema examples; auth expectations; idempotency header format; example error codes.

3. Persistence & migration tasks (high priority)
   - Deliverable: `/docs/official-docs/EPIC-H/queue_persistence_and_migrations.md`
   - Must include: job table schema, indexes for querying by `LabSession.id` and status, retention policy, and migration steps for adding job tables and DLQ storage.

4. Locking enforcement approach (high priority)
   - Deliverable: `/docs/official-docs/EPIC-H/locking_and_invariants.md`
   - Must include: lock acquisition sequence, TTL/renewal, lease-expiry handling, failure/retry rules, and required invariants for tests.

5. Integration test checklist (high priority)
   - Deliverable: Integration tests defined in `/docs/official-docs/EPIC-H/integration_test_checklist.md`
   - Tests required:
     - Single-active-job invariant: concurrent enqueue + workers must produce exactly one active worker per `LabSession.id`.
     - FIFO per-session: enqueue multiple jobs for same `LabSession` and verify processing order.
     - Retry classification: simulate transient vs permanent errors and confirm routing to DLQ after configured attempts.
     - Idempotency: duplicate enqueue with same idempotency key is deduplicated.
     - Lock expiry/renewal: simulate worker death and confirm next worker can acquire lock after lease expiry and job isn't lost.
     - Backpressure: simulate overload and validate enqueue rejection or delay behavior.

6. Security-Sentinel handoff checklist
   - Deliverable: Security review notes in `/docs/official-docs/EPIC-H/security_hand_off.md`
   - Items:
     - Replay and DoS mitigation (rate limits, per-session quotas).
     - Idempotency key storage security and TTL policies.
     - Authorization for enqueue and worker endpoints.
     - Sensitive payload handling in DLQ and logs (sanitization rules).

---

### OPERATIONAL NOTES OUTLINE (HIGH-LEVEL)

- Migration: steps to create job table and backfill any in-flight runs; feature-flag rollout plan.
- Monitoring & Alerts: queue-depth, processing-latency, retry-rate, DLQ growth, lock-contention alerts.
- Runbook: how to inspect DLQ entries, redrive jobs, and revoke stuck locks.
- Scaling: autoscale signals and safe concurrency limits for workers.
- Security: monitor unusual enqueue patterns per `LabSession` and global rate limits.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Official vendor/spec choices for durability and locking (SQS vs Redis Streams vs DB-backed) are not pinned.
- Exact retry attempt count and backoff parameters are not specified.
- Idempotency key TTL and storage mechanics are not specified.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H2 — Job Queue & Scheduling
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md
- Status: ADDED (EXTEND)
- Reason: Gatekeeper brief defining required docs and gaps for queue contract, API surface, persistence, locking, and operational runbook.

---

Reference: see `/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md` and `/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md`.
