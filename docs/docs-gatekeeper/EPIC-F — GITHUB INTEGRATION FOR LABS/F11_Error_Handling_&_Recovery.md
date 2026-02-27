FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F11 — Error Handling & Recovery
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md
  - apps/forgea-labs/app/api/webhooks/github/route.ts
  - packages/schema/prisma/schema.prisma
  - packages/schema/src/lab-session-lifecycle.ts
  - packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql
  - packages/audit/src/audit.service.ts

REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Webhooks (Delivery Semantics)
  - Concept: Webhook delivery guarantees, retry semantics, and recommended receiver behavior
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines event payload fields (e.g., `repository.id`), delivery retry behavior, and recommended HTTP response handling.
  - Decision it informs: Whether to ack (200) immediately, enqueue-first patterns, and how to detect duplicate deliveries.
  - What breaks without it: Misinterpreting retries, loss of events when returning 200 incorrectly, brittle session binding using `userForkUrl`.

- Technology: GitHub API Rate Limiting & Error Codes
  - Concept: Rate limits, abuse detection, transient 5xx behaviors, and best-practice retry headers
  - Official source: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines backoff and retry strategy for outbound API calls that create repos/templates and for idempotent retry policies.
  - Decision it informs: Retry/backoff parameters, stop criteria, and error classification (retryable vs permanent).
  - What breaks without it: Misconfigured retries causing throttling, hot loops, or undetected permanent failures.

- Technology: Message Queue / DLQ Patterns (SQS, Redis Streams, Postgres job-table)
  - Concept: Durable queues and dead-letter patterns for retryable and unrecoverable webhook payloads
  - Official sources:
    - AWS SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
    - Redis Streams: https://redis.io/docs/manual/streams/
    - Postgres job table patterns: https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Choice of DLQ/queue affects persistence, visibility, ordering, and replay semantics.
  - Decision it informs: Which DLQ technology to adopt and how to model retry/backoff and visibility timeouts.
  - What breaks without it: No durable place to inspect unrecoverable payloads; operator inability to replay events.

- Technology: Idempotency & Retry Patterns
  - Concept: Idempotency key patterns, idempotent API semantics, idempotency storage strategies
  - Official source: HTTP Semantics (RFC 7231) + provider patterns (e.g., Stripe idempotency guidance)
    - RFC 7231: https://datatracker.ietf.org/doc/html/rfc7231
    - Stripe idempotency guidance (example pattern): https://stripe.com/docs/api/idempotent_requests
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To specify the idempotency key format, storage lifetime, and expected behavior for retries.
  - Decision it informs: Where idempotency keys are stored (DB table/Redis) and how to handle concurrent deliveries.
  - What breaks without it: Duplicate transitions of `LabSession`, inconsistent state, and non-replayable failures.

- Technology: Security & Secrets Management (GitHub App private key handling)
  - Concept: Storing and rotating webhook secrets and GitHub App keys securely (KMS/Vault)
  - Official source: Provider docs (e.g., AWS KMS) and GitHub Apps auth docs: https://docs.github.com/en/developers/apps
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures private keys and webhook secrets are not leaked and support rotation.
  - Decision it informs: Secret storage backend, rotation policy, and operator playbooks.
  - What breaks without it: Exposed keys, inability to rotate credentials safely, and compliance failures.

EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing DLQ, idempotency model, retry orchestration, and mapping-table; does not provide schema-level models or decision pick-list.

- Doc path: apps/forgea-labs/app/api/webhooks/github/route.ts
  - Coverage status: PARTIAL
  - Exact gaps: Handler exists with HMAC verification and session mapping via `userForkUrl`, but lacks enqueue-first semantics, idempotency recording, and DLQ push.

- Doc path: packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: `LabSession` model exists, but no `VerificationAttempt`, `DeadLetterPayload`, or `GitHubRepoMapping` models present.

- Doc path: packages/schema/src/lab-session-lifecycle.ts
  - Coverage status: PARTIAL
  - Exact gaps: Strong transition guards exist; missing idempotency checks and hooks to reconcile partial operations after retries.

- Doc path: packages/audit/src/audit.service.ts
  - Coverage status: PARTIAL
  - Exact gaps: Audit logging exists but does not model verification-attempt history or DLQ entry events in a structured table.

DOCUMENTATION COVERAGE DECISION

- ⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED
  - Docs to extend: `/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md`, `/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md`, and in-repo handler and schema files listed above.
  - Reason: Analysis exists, but implementer-facing specification (failure-mode recovery actions, minimal data-model list, and explicit decision points) is missing.

STUDY GUIDE FOR HUMAN

- GitHub Webhooks (Delivery):
  - Why this exists: GitHub retries delivery on non-2xx responses and includes `X-GitHub-Delivery` for deduplication.
  - Why alternatives exist: Enqueue-first vs sync processing tradeoffs — enqueue-first provides durability; sync is lower-latency but brittle.
  - When NOT to use enqueue-first: When ultra-low latency is required and occasional manual recovery is acceptable.
  - Common mistakes: Returning 200 on server errors to avoid retries (causes silent loss); binding sessions to mutable fields (`userForkUrl`) instead of `repository.id`.

- DLQ / Queue Technology choices:
  - Why this exists: To persist unrecoverable payloads and provide replay/inspection.
  - Alternatives: AWS SQS (managed, DLQ built-in), Redis Streams (fast, complex consumer groups), Postgres job table (single-technology stack, simple queries).
  - When NOT to use SQS: If org policy forbids AWS or cross-account infra; when strict transactional coupling to DB is required.
  - Common mistakes: Not recording full payload + metadata in DLQ; losing correlation to `LabSession` and audit records.

- Idempotency Keys & Storage:
  - Why this exists: To make retry-safe operations (create repo, transition sessions) idempotent.
  - Alternatives: Store idempotency result in DB table keyed by `X-GitHub-Delivery` or a generated `idempotency_key` per operation; use Redis for TTL-based caching.
  - When NOT to store in Redis: When you need durable, long-term history for audits and replay.
  - Common mistakes: Using ephemeral in-memory caches; failing to record response/result metadata (status, resource id).

INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-F/error-handling-and-recovery.md
  - Purpose: Canonical operator/playbook for webhook error handling, DLQ operation, and recovery steps.
  - Exact knowledge to add: Failure-mode table, playbook for DLQ replay, escalation runbooks, and SLOs/alert thresholds.
  - Required version pin: Reference pinned GitHub Webhooks docs and chosen DLQ tech.

- Path: /docs/official-docs/EPIC-F/webhook-processing-manifest.yaml
  - Purpose: Machine-readable manifest describing enqueue-first behavior, idempotency key strategy, and retry/backoff parameters.
  - Exact knowledge to add: `enqueue: true|false`, `idempotency_store: postgres|redis`, `retry_policy: {max_attempts, backoff_ms}`, and DLQ target.
  - Required version pin: Reference pinned queue tech docs.

- Path: /docs/official-docs/EPIC-F/error-data-models.md
  - Purpose: Schema definitions for `VerificationAttempt`, `DeadLetterPayload`, and `GitHubRepoMapping` (minimal fields only).
  - Exact knowledge to add: Field lists, retention/TTL guidance, indexing recommendations for dedupe and lookup.
  - Required version pin: N/A

OPEN QUESTIONS / AMBIGUITIES

- Preferred DLQ technology: Postgres job table, Redis Streams, or AWS SQS?
- Monitoring & SLOs: Which alerting channels and SLO thresholds must Integration Checker and Security Sentinel use (PagerDuty/Slack/Prometheus)?
- Credential storage: Where will GitHub App private keys and webhook secrets be stored (KMS/Vault/CI secrets)?
- Session binding key: Should webhook -> `LabSession` mapping use `repository.id` instead of `userForkUrl`?
- Handler architecture: Synchronous handler vs enqueue-first (should webhook handler ack after enqueue only?).

MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md`:

  - Epic / Feature: EPIC-F / F11 — Error Handling & Recovery
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F11_Error_Handling_&_Recovery.md
  - Status: ADDED (EXTEND)
  - Reason: Gatekeeper brief enumerating required official docs, internal doc gaps, and required data-models for webhook error handling.

