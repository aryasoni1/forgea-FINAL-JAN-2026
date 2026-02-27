FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F8 — Push Tracking & Audit
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md

TASKS CHECKED
- Planner / Architect: define LabAttempt and AuditLog schemas and retention policies (requested by orchestrator).
- Implementer: persist LabAttempt per push event, link to LabSession, write AuditLog entries (requested by orchestrator).
- QA / Tester: validate correctness and concurrency behavior (requested by orchestrator).
- Integration Checker: verify records are created on real webhook deliveries (requested by orchestrator).
- Security Sentinel: ensure audit logs are tamper-evident and access-controlled (requested by orchestrator).
- Documenter: publish schema and query examples (requested by orchestrator).

WHAT ALREADY EXISTS
- apps/forgea-labs/app/api/webhooks/github/route.ts — Push webhook handler.
  - Verifies HMAC using `GITHUB_WEBHOOK_SECRET` and only processes `push` events.
  - Parses `payload.after` as commit SHA and `payload.repository.html_url` as repository URL.
  - Looks up an active `LabSession` by `userForkUrl` and verifies status (IN_PROGRESS / STUCK).
  - Calls `AuditService.log(...)` with `AuditAction.LAB_VERIFY_ATTEMPT` (so audit writes are invoked).
  - Calls `transitionLabSession(...)` to bump `lastActivityAt` and set status to IN_PROGRESS.
  - Does not currently parse changed files, does not read GitHub delivery id header, and does not persist a per-push LabAttempt record.

- packages/audit/src/audit.service.ts — `AuditService.log` implementation.
  - Implements append-only audit writes to `db.auditLog.create`.
  - Scrubs obvious secret keys from metadata, enforces a max metadata size, and never throws (logs on failure).
  - Emits security alerts for HIGH severity actions using `FORGEA_SECURITY_ALERT_SINK_URL` if set.
  - Defines typed metadata shapes for actions including `LAB_VERIFY_ATTEMPT`, `LAB_VERIFY_SUCCESS`, `LAB_VERIFY_FAIL`, and `LAB_STATUS_TRANSITION`.

- packages/schema/prisma/schema.prisma — Prisma schema.
  - Defines `AuditLog` model (append-only) with fields: `id, userId, actorId, action, metadata, createdAt`.
  - Defines `LabSession`, `VerificationLog` (immutable CI verification record), and `Lab` models.
  - `VerificationLog` stores `commitSha`, `ciOutput`, and `sessionId` (unique) — used for CI verification results, not per-push attempts.

- packages/schema/prisma/migrations/* — DB-level immutability enforcement.
  - Migrations exist that add triggers/functions to make `AuditLog` append-only at the DB level (raise exception on UPDATE/DELETE).

WHAT IS PARTIALLY IMPLEMENTED
- Audit record writing: `AuditService.log` exists and is called by the webhook handler for `LAB_VERIFY_ATTEMPT` — this provides an audit trail for verification attempts.
- Verification results persistence: `VerificationLog` exists for immutable CI verification records; this partially covers post-verification storage but not raw push attempts.

WHAT IS MISSING
- `LabAttempt` persistence: No Prisma model or DB table for recording individual push attempts (fields requested by orchestrator: labSession link, commit SHA, changed_files, timestamp, GitHub delivery ID, delivery metadata).
- Delivery ID handling: Webhook handler does not read the GitHub delivery ID (`X-GitHub-Delivery` header) nor use it as an idempotency key.
- Changed-files extraction: Webhook handler does not parse or persist the list of changed files from the push payload.
- Idempotency/duplicate handling: No storage or checks exist to deduplicate events by delivery ID.
- Retention / archival rules: No policy documents or DB-level retention/archival rules for LabAttempt records or AuditLog beyond TODO comments in `AuditService`.
- Explicit schema for LabAttempt and indexes for common queries (by sessionId, commitSha, deliveryId) are not present.
- Tests and integration checks: No explicit unit/integration tests located that assert LabAttempt creation on webhook deliveries.

RISKS OR CONFLICTS
- Missing idempotency: Without reading and storing GitHub delivery IDs, duplicate webhook deliveries or retries cannot be deduplicated, risking duplicate LabAttempt records if implemented without idempotency.
- Incomplete forensics: Because changed-files are not currently recorded, later analysis (for step-based progress, locked-path detection, or forbidden-change detection) will lack per-push file lists.
- Partial coverage overlap: `VerificationLog` exists for CI verification results; introducing `LabAttempt` must be reconciled with how/when `VerificationLog` is created to avoid duplicate responsibilities.
- Audit immutability: `AuditLog` is already append-only at DB-level (migrations/triggers). Any Integrator/Implementer should respect this and use `AuditService.log` for audit writes.

QUESTIONS FOR CLARIFICATION
- Confirm the canonical idempotency key: should the system use `X-GitHub-Delivery` header as the authoritative idempotency key for webhook deliveries?
- Confirm the retention policy for push attempts and audit logs (e.g., AuditLog: append-only indefinite; LabAttempt: TTL 90 days then archive?).
- Should `LabAttempt` store the full `push` payload, or only a curated subset (commitSha, changed_files, pusher id, delivery id)?

NEXT AGENT HANDOFF PROMPT (MANDATORY)
You are the Planner / Architect. Use this code-scout report at `docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md` as the factual source.
Do NOT implement code. Using only the repository truths recorded in that report, produce the following definitive design artifacts for the Implementer agent (copy-paste-ready):
- A precise Prisma `model LabAttempt { ... }` to add to `packages/schema/prisma/schema.prisma` with required fields and types. The model MUST include at minimum: `id`, `sessionId` (FK to `LabSession`), `commitSha`, `changedFiles` (JSON or text), `deliveryId` (string), `attemptedAt` (timestamp), and any other fields you require. Indicate `@@index` lines for queries expected by the webhook (by `sessionId`, by `deliveryId`).
- Migration notes: whether DB constraints (uniqueness on `deliveryId`) or idempotency tokens should be enforced at DB-level vs application level. If a DB uniqueness constraint is required, state the exact constraint.
- Idempotency strategy: explicit guidance on which GitHub header to use as the idempotency key and the exact behavior (e.g., on duplicate `deliveryId`: return existing LabAttempt id and skip re-processing). Keep this deterministic and explicit.
- Required fields to capture from the push payload (explicit list), including exact JSON paths inside the webhook payload where to find `commitSha`, `changed files` (list of added/modified/removed paths), and `delivery id` header name. If some fields are optional, mark them optional.
- Suggested retention and archival policy for `LabAttempt` and `AuditLog` (explicit durations and archival target recommendations), and whether `AuditLog` must remain append-only forever.
- A minimal set of audit entries the Implementer must emit on webhook handling: event received, lab session matched or not, LabAttempt created (id), duplicate delivery detected (deliveryId), and any failures — include required metadata fields for each audit entry (actorId, action, resource id, and correlationId usage).
- A list of integration tests the Implementer must provide (concise bullet list) to validate correctness and idempotency: e.g., webhook retry with same `deliveryId` should not create duplicate LabAttempt; push with changed_files present should record them; concurrent deliveries for same session should create discrete LabAttempts unless `deliveryId` duplicates.

Reference: this report documents that `AuditLog` and `AuditService` already exist and are append-only, that the webhook handler exists and calls `AuditService.log(...)` for verify attempts, but that no `LabAttempt` model or delivery-id idempotency handling is present. Your outputs should be deterministic, precise, and constrained to design/schema decisions only (no implementation code).

Handoff complete. Provide this report verbatim to the next agent.