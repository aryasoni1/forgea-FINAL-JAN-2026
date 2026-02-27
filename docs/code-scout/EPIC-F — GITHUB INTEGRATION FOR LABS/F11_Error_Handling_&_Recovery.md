### FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F11 — Error Handling & Recovery
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md

### TASKS CHECKED

- Planner / Architect: define failure modes and recovery invariants (present in orchestrator output).
- Implementer: implement retries/backoff, idempotency, cleanup, dead-lettering (requested by orchestrator).
- QA / Tester: validate retry, idempotency, cleanup (requested by orchestrator).
- Integration Checker: staging simulations for rate limits and partial failures (requested by orchestrator).
- Documenter: operator runbooks and published recovery docs (requested by orchestrator).

### WHAT ALREADY EXISTS

- [apps/forgea-labs/app/api/webhooks/github/route.ts](apps/forgea-labs/app/api/webhooks/github/route.ts): webhook POST handler that verifies `x-hub-signature-256`, parses payloads, maps `push` events to a `LabSession` by `userForkUrl`, writes audit entries, and calls session lifecycle transitions. Comments show the handler sometimes returns HTTP 200 to stop GitHub retries.
- [packages/schema/prisma/schema.prisma](packages/schema/prisma/schema.prisma): `LabSession` model and related schema present (status, userForkUrl, timestamps).
- [packages/schema/src/lab-session-lifecycle.ts](packages/schema/src/lab-session-lifecycle.ts): `transitionLabSession(...)` and app-level lifecycle transition rules and concurrency guards used by webhook handler.
- [packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql](packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql): DB trigger + function enforcing allowed `LabSession` transitions.
- [packages/audit/src/audit.service.ts](packages/audit/src/audit.service.ts): audit logging utilities used by webhook handler to record events.
- docs and gatekeeper guidance referencing idempotency, mapping tables, and retry/backoff patterns (e.g., /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B8_GitHub Mapping Tables.md).

### WHAT IS PARTIALLY IMPLEMENTED

- Webhook receiver and HMAC verification: implemented and active; however, webhook error handling currently sometimes returns 200 to prevent retries (commented behavior in route.ts).
- Session lifecycle guards: strong app-level and DB-level guards exist to enforce state transitions, which partially supports safe retries but may block replays if not paired with idempotency metadata.
- Audit logging: present and records webhook-to-session activity, but audit entries do not model multiple verification attempts or a verification-attempt history table.

### WHAT IS MISSING

- Dead-letter queue (DLQ) or persistent retry queue for unrecoverable webhook payloads — no DLQ implementation found.
- Explicit idempotency model for GitHub API calls and webhook processing (no `VerificationAttempt` or `idempotency_key` model discovered).
- Retry/backoff orchestration for outbound GitHub API interactions (no central retry scheduler or queued retry worker found; only `retry` package present in lockfile).
- Canonical GitHub repo/provider mapping table (e.g., `GitHubRepoMapping`) — mapping currently relies on `userForkUrl` string matching, which is brittle.
- Parameters and operational policy: explicit retry counts, backoff algorithm, escalation thresholds, and monitoring/alerts are not documented in repo code.
- Dead-letter storage schema and operator runbook files for manual recovery.
- Secrets hardening: private keys and webhook secrets appear in `.env` files (no KMS/Vault usage enforced in codebase artifacts reviewed).

### RISKS OR CONFLICTS (observed)

- Returning HTTP 200 on server errors (to stop GitHub retries) can cause silent loss of events and hide transient failures from operators.
- Lack of idempotency metadata risks duplicate or missed state transitions when webhooks are retried or replayed.
- Reliance on mutable fields (`userForkUrl`) for binding webhooks to sessions is brittle; repo identity should use provider-stable IDs (`repository.id`).
- No DLQ means unrecoverable payloads have no durable place for later inspection/replay; combined with 200 responses this produces potential data loss.
- DB lifecycle guards may reject replays if idempotency data is not recorded, complicating recovery of partially-processed events.
- Secrets in plaintext `.env` increase risk of leakage and complicate key rotation for GitHub App private keys.

### QUESTIONS FOR CLARIFICATION

- Which persistent queue or DLQ technology is preferred (Postgres job table, Redis streams, SQS, Pub/Sub)?
- Are there existing monitoring/alerting channels and SLOs for webhook processing failures we must integrate with (PagerDuty, Slack, Prometheus)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Planner / Architect for Feature F11 — Error Handling & Recovery. Use this code-scout report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md) and the orchestrator output at docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md as the factual source.

Produce a definitive specification (do not implement) that includes all of the following, and nothing beyond factual gaps you can confirm from the repository:

- A complete enumeration of GitHub-related failure modes relevant to this codebase (including: webhook delivery failures, GitHub API rate limits and 5xx errors, partial repository/template injection failures, transient network errors, and authentication errors). Reference the files in this repo that are impacted by each failure mode (use the existing file paths).
- For each failure mode, a deterministic recovery action and the invariants that must hold after recovery (e.g., idempotency requirements, allowed state transitions for `LabSession`, audit trail requirements). Keep responses factual and grounded in the code references below.
- A minimal schema-level list of data models required to support retries, idempotency, and DLQ processing (for example: `VerificationAttempt`, `DeadLetterPayload`, `GitHubRepoMapping`) with the essential fields only — do NOT write migration code, only name required models and explain the critical fields each must include.
- Explicit decision points that the Implementer will need to resolve (pick one allowed option per decision) such as preferred DLQ technology among the options we can integrate with (Postgres job table, Redis, SQS), whether to treat webhook handler as synchronous or enqueue-first, and where idempotency keys are stored.
- A short list of concrete invariants that QA must test (e.g., replaying the same webhook must be safe; partial repo creation must be detectable and reversible; unrecoverable webhook payloads must land in DLQ with audit metadata).

Files of interest (use these as evidence in your answers):

- apps/forgea-labs/app/api/webhooks/github/route.ts
- packages/schema/prisma/schema.prisma
- packages/schema/src/lab-session-lifecycle.ts
- packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql
- packages/audit/src/audit.service.ts

Return the specification as a concise checklist and numbered items so the Implementer can act directly from your output.

Handoff complete. Provide this report verbatim to the next agent.
