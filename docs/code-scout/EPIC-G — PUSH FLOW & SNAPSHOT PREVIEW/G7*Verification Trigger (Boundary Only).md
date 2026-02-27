## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G7 — Verification Trigger (Boundary Only)
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G7_Verification_Trigger_(Boundary_Only).md

### TASKS CHECKED

- planner-architect: define detection criteria for eligible `LabAttempt` and verification job contract
- implementer: implement creation of `VerificationJob` records and enqueueing (outside webhook handler)
- integration-checker: validate queueing contract with verification runner and idempotency guarantees
- security-sentinel: ensure job creation cannot be abused to trigger excessive work

### WHAT ALREADY EXISTS

- UI hooks and controls: `apps/forgea-labs/components/workspace/console.tsx`, `verification-overlay.tsx`, and `main-shell.tsx` include verification actions and UX for triggering verification.
- Verification artefacts and persistence: `packages/schema/prisma/schema.prisma` contains `VerificationLog` and `VerificationToken` models; migrations under `packages/schema/prisma/migrations/` create `VerificationLog` table and immutability triggers.
- Audit integration: `packages/audit/src/audit.service.ts` references `verificationLogId` fields used by audit flows.
- Verification runner presence: ESLint config references `service-verification-runner` and UI pages show `VERIFICATION_RUNNER` node/status (e.g., integrity page UI and `/app/integrity` traces), indicating an existing runner service in the monorepo.
- Onboarding and verification UX: numerous app pages and components expose verification-related flows and status streams (see `apps/forgea-labs/*` components and `.next` traces referencing verification streams).

### WHAT IS PARTIALLY IMPLEMENTED

- Persistent verification records: `VerificationLog` exists as an immutable record of verification results, including schema and DB migrations.
- Runner infrastructure: verification runner service is referenced in configs and UI but runner contract (queue/message schema, ack semantics) is not found as a single, authoritative artifact.

  Missing/unclear items observed:
  - No `VerificationJob` model/table found in the schema or migrations (search for "VerificationJob" returned no matches).
  - No central queue contract or message schema for `verification-runner` consumers (DLQ, retry/backoff, idempotency keys not located).
  - No documented detection criteria for when to create a verification job (what constitutes an eligible `LabAttempt` in code or docs).

### WHAT IS MISSING

- `VerificationJob` data model and migration (not found).
- Queue/message contract document for `verification-runner` (not found).
- Explicit eligibility/detection rules mapping `LabAttempt` states to job creation (not found).
- Rate-limiting and abuse-mitigation policies for job creation (not found).

### RISKS OR CONFLICTS

- Risk Level: Medium (as called out by orchestrator output).
- Creating verification jobs without clear eligibility or rate-limiting may enable resource exhaustion or abuse (triggering excessive runner load).
- Integration ambiguity: runner contract (queue technology, message format, idempotency keys, ack semantics) is not centrally documented — integration-checker must validate before implementer work.

### QUESTIONS FOR CLARIFICATION

- Confirm the canonical queue technology for verification jobs (SQS, Redis Streams, Postgres job table, etc.).
- Define throughput/SLA targets and expected burst sizes for verification jobs (events/sec and concurrency limits).
- Confirm whether job creation should be performed synchronously inside an API request, or via an enqueue-first (ack-after-enqueue) pattern.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are `planner-architect`. Use this code-scout report (this file) as the repository truth for the G7 Verification Trigger (Boundary Only) feature.

Produce a concise plan that includes only the following items (do not implement):
- Detection criteria: exact, machine-readable rules that determine when a `LabAttempt` or session becomes eligible for a verification job (enumerate fields, state transitions, and any required preconditions).
- Verification job schema: the exact fields for a `VerificationJob` record/message (names, types, idempotency key, TTL, priority), and the canonical storage location (`packages/schema/prisma/schema.prisma` path or queue/topic name).
- Integration checklist for `integration-checker`: required artifacts to validate (queue tech, message format example, DLQ config, consumer ack semantics, secrets/credentials locations, and required infra header behaviors).
- Required artifacts for `implementer`: file paths to modify or add (exact repo-relative paths), required env vars, unit/integration tests to create, and the minimal evidence `security-sentinel` will need to validate rate-limiting and abuse mitigations.
- Acceptance criteria for `security-sentinel`: explicit checks they must perform (rate limiting thresholds, abuse-case tests, idempotency verification, authentication/authorization checks, and monitoring/alerting points).
- A single YES/NO statement (and brief rationale constrained to facts in this report) answering whether `webhook-perf-auditor` or an equivalent `webhook-perf-auditor`/`verification-perf-auditor` agent must be added before implementation begins.

Constraints: Do NOT reorder agents, do NOT implement code, and do NOT create schema or queue artifacts. Return the plan as a concise checklist and a prioritized list of blocking preconditions derived from this report.

Handoff complete. Provide this report verbatim to the next agent.
