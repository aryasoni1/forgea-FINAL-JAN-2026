FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K12 — Audit & Error Handling
- Source: /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md


TASKS CHECKED

- Step 1: locate existing logging/audit surfaces and error handling patterns (forgea-code-scout)
- Step 2: planner-architect to produce task doc (not performed here)
- Step 3: security-sentinel/doc gates (not performed here)
- Step 4: implementer/documenter tasks (not performed here)


WHAT ALREADY EXISTS

- forgea-monorepo/packages/audit/src/audit.service.ts — Server-side `AuditService` implementation. Implements:
  - `RequestContext` using `AsyncLocalStorage` for correlation IDs.
  - Typed `AuditMetadataMap` and `AuditAction`/`AuditActorType`/`AuditResourceType` enums usage.
  - Recursive scrub of explicitly forbidden keys (password, token-like keys) by normalized key match.
  - Metadata size enforcement (12KB max) and truncation behavior.
  - Severity mapping per action and a call to `db.auditLog.create(...)` for append-only writes.
  - Emits high-severity alerts via `FORGEA_SECURITY_ALERT_SINK_URL` (one-shot `fetch`) and swallows errors (never throws).
  - Comments/TODOs referencing archival (>12 months) and eslint/code-review enforcement.

- forgea-monorepo/packages/schema/prisma/schema.prisma — `AuditLog` model present.
- forgea-monorepo/packages/schema/prisma/migrations/* — DB migrations and SQL show append-only immutability triggers and constraints (triggers prevent UPDATE/DELETE on AuditLog).

- apps/forgea-labs/auth.config.ts — Imports and calls `AuditService.log(...)` in NextAuth event hooks (signIn/createUser).
- apps/forgea-labs/app/api/webhooks/github/route.ts — Calls `AuditService.log(...)` for webhook events.
- packages/schema/src/lab-session-lifecycle.ts — Writes to `tx.auditLog.create(...)` in lifecycle code paths.

- docs references:
  - Multiple docs/gatekeeper files reference `packages/audit/src/audit.service.ts` and identify documentation gaps (canonical JSON Schema, retention, archival, producer guidance). See docs/docs-gatekeeper and docs/master_docs.md entries.

- Repo wiring:
  - `tsconfig` path alias exposes `@forgea/audit` to apps (used by `apps/forgea-labs`).


WHAT IS PARTIALLY IMPLEMENTED

- Audit producer primitives: `AuditService.log(...)` exists, is typed, and used by server producers (auth hooks, webhooks, lifecycle code). Missing is an exported, versioned JSON Schema / canonical event contract for `AuditLog.metadata` to enforce cross-service consistency.

- Immutability: DB-level immutability triggers exist (migrations), enforcing append-only behavior; however there is no documented backfill/migration policy or acceptance tests visible in repo docs.

- Security alerting: a high-severity alert sink call exists, but it is fire-and-forget via `fetch` with no retry/backoff or documented backup path.

- UI error handling: Next/React ErrorBoundary usage is present in the app (Next runtime and app layouts use ErrorBoundary), but there is no evidence in source files of a client-side error reporting integration (e.g. Sentry or custom client-to-audit sink) that forwards UI errors into the audit pipeline or a separate safe error telemetry store.


WHAT IS MISSING

- Canonical, versioned JSON Schema for `AuditLog.metadata` (single source-of-truth file and docs). Repo references this as required but not present.

- Documented retention and archival policy for `AuditLog` (exact retention duration, cold-storage destination, access controls, and legal/compliance inputs).

- A published list of canonical audit event names, required top-level fields, severity classification, and producer examples (the code has `AuditMetadataMap` but no cross-service enforcement or registered schema file).

- Client-side (browser) error telemetry integration and mapping to audit events, plus guidance on what client errors should / should not be recorded in `AuditLog`.

- Enforcement rules (eslint or CI checks) ensuring critical code paths call `AuditService.log(...)` where required.

- Formal alerting contract for `FORGEA_SECURITY_ALERT_SINK_URL` (format, retries, auth, SLA) and documented retry/backup strategy.

- Explicit documented user-facing error messaging constraints (UI must not leak internal paths/stack traces). There are orchestrator notes requiring this, but no source-level policy file implementing or enforcing it.

- Tests or acceptance criteria validating immutability triggers and audit-lineage reconstruction (no tests found in repo referencing audit acceptance tests).


RISKS OR CONFLICTS (OBSERVED IN CODE)

- PII/secret leakage risk: `AuditService.scrubMetadata` only removes metadata keys that match a small set of forbidden normalized names. Arbitrary PII stored under other keys would not be removed by this rule; canonical redaction rules/schema are missing.

- Alerting reliability: `emitSecurityAlert` posts once to an env-specified sink with no retry; alerts could be lost if the sink is unavailable.

- App vs docs mismatch: Many docs reference the need for canonical JSON Schema and retention rules; code implements write primitives but the authoritative schema and retention policy are not present in repo docs.

- Good control: DB-level immutability triggers exist and migrations have been added to enforce append-only behavior.


QUESTIONS FOR CLARIFICATION

- None strictly required to continue from a repo-truth scout perspective. If planner-architect requires legal retention inputs or compliance policy (e.g., SOC2, PCI), list the required authority/contact in the task doc.


NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-architect — use this report at docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md as the factual repo truth. Produce the task artifact requested by the orchestrator and include the following, strictly as a specification (do not implement):

- Create `/docs/tasks/task-K12-<YYYY-MM-DD>.md` containing:
  - An explicit, versioned list of canonical audit event names required for K12 (include examples: USER_LOGIN, USER_REGISTER, LAB_START, LAB_VERIFY_ATTEMPT, LAB_VERIFY_SUCCESS, LAB_VERIFY_FAIL, LAB_STATUS_TRANSITION, RESUME_GENERATED, SUBSCRIPTION_UPDATE, ADMIN_OVERRIDE). For each event, specify required top-level `metadata` fields and types.
  - A versioned JSON Schema file (or exact schema block) for `AuditLog.metadata` (top-level required fields, allowed additional fields policy, max sizes per field, and sample canonical payloads). State the `schema_version` and update process.
  - Retention and archival policy: exact retention period(s) (hot DB retention and archival timeframe), archival destination(s) (S3 / BigQuery / cold storage), access controls, and deletion/backfill rules for schema migrations.
  - Security alert contract: expected alert payload shape, authentication requirements for `FORGEA_SECURITY_ALERT_SINK_URL`, expected success criteria/SLA, and fallback/retry behavior (if sink unavailable).
  - Safe user-facing error messaging constraints for the UI: exact rules disallowing internal path, stack trace, DB IDs, or sensitive tokens in messages; canonical user-facing error templates for common failure classes.
  - Acceptance criteria and enforcement: CI/lint rules to ensure producers call `AuditService.log` for critical events, tests or checks to validate immutability triggers, and publishing requirements for schema changes (doc review + security-sentinel signoff).
  - A minimal rollout plan and required reviewers (security-sentinel, docs-gatekeeper, implementer) and checklist for implementer work.

Reference facts from this code-scout report (file path above) when writing the task doc. Do NOT implement code in this step; produce only the task specification and exact schemas/policies needed for implementer to proceed. Keep the task doc authoritative and actionable for implementers and reviewers.


File references consulted (repo-truth):
- /forgea-monorepo/packages/audit/src/audit.service.ts
- /forgea-monorepo/packages/schema/prisma/schema.prisma
- /forgea-monorepo/packages/schema/prisma/migrations/* (immutability triggers)
- /forgea-monorepo/apps/forgea-labs/auth.config.ts
- /forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts
- /forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts
- /docs/docs-gatekeeper/** (multiple briefs referencing audit gaps)

Handoff complete. Provide this report verbatim to the next agent.