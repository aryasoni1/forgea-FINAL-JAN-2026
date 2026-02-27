# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C9_Audit_Logging
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md


### TASKS CHECKED

- Inventory audit logging code, DB model, and external sinks.
- Locate places where audit events are emitted.


### WHAT ALREADY EXISTS

- `packages/audit/src/audit.service.ts` — Central `AuditService` implementation (authoritative):
  - Append-only design; writes to DB via `db.auditLog.create(...)`.
  - Public API: `AuditService.log(actor, action, resource, metadata)`.
  - Scrubs sensitive keys, enforces metadata size limits, attaches server-side correlationId via `RequestContext`.
  - On `HIGH` severity actions calls `emitSecurityAlert(...)` which POSTs to `process.env.FORGEA_SECURITY_ALERT_SINK_URL` if set.
  - Writes never throw (errors are logged to console) and are intentionally non-blocking.
  - File: [packages/audit/src/audit.service.ts](packages/audit/src/audit.service.ts#L1-L400).

- `packages/schema/prisma/schema.prisma` — `AuditLog` DB model exists:
  - Fields: `id` (UUID PK), `userId` (nullable), `actorId`, `action`, `metadata` (Json), `createdAt` (timestamp default now).
  - File: [packages/schema/prisma/schema.prisma](packages/schema/prisma/schema.prisma#L1-L200) (see `AuditLog` model).

- `packages/schema/src/audit-actions.ts` — Strict `AuditAction`, `AuditActorType`, `AuditResourceType`, and `AuditSeverity` enums. System enforces fixed actions (legal-grade). File: [packages/schema/src/audit-actions.ts](packages/schema/src/audit-actions.ts#L1-L200).

- Emitters in app code:
  - `apps/forgea-labs/auth.config.ts` — NextAuth event hooks call `AuditService.log(...)` on sign-in and user creation. (Seen at lines where `AuditService.log` is awaited.) File: [apps/forgea-labs/auth.config.ts](apps/forgea-labs/auth.config.ts#L1-L200).
  - `apps/forgea-labs/app/api/webhooks/github/route.ts` — Webhook handler logs `AuditAction.LAB_VERIFY_ATTEMPT` via `AuditService.log(...)`. File: [apps/forgea-labs/app/api/webhooks/github/route.ts](apps/forgea-labs/app/api/webhooks/github/route.ts#L1-L220).

- Edge/telemetry helper: `packages/config/src/permissions.ts` exposes `emitAuditEvent(event)` which sends a compact audit event to `process.env.FORGEA_AUDIT_SINK_URL` with `keepalive` and falls back to `console.info` if unset. This is an Edge-safe telemetry hook (no DB writes). File: [packages/config/src/permissions.ts](packages/config/src/permissions.ts#L1-L240).

- Correlation context: `packages/audit/src/audit.service.ts` provides `RequestContext` (AsyncLocalStorage) to propagate a server-generated correlationId for audit rows.

- DB migration evidence: migrations create `AuditLog` table and add immutability triggers in some migrations (see migrations under `packages/schema/prisma/migrations/*` referencing immutability triggers and audit-related changes).


### WHAT IS PARTIALLY IMPLEMENTED

- External sinks: Two environment-driven hooks exist but are not centrally configured in code: `FORGEA_AUDIT_SINK_URL` (permissions telemetry) and `FORGEA_SECURITY_ALERT_SINK_URL` (high-severity alerts). Presence of env vars is respected but there's no repo-level documentation listing configured sink endpoints or expected formats.

- Audit retention/archival: `AuditService` TODO comments reference archiving (`Archive AuditLogs > 12 months to cold storage`) but no automated archival jobs or retention policies are present in the codebase.

- Immutability enforcement: `AuditService` documentation states append-only and migrations indicate immutability triggers exist, but I did not find a centralized policy document enumerating access controls, retention periods, or approved deletion/archival procedures.


### WHAT IS MISSING

- No Security/Compliance policy document stating retention windows, access controls, and immutability guarantees for `AuditLog` rows (aside from TODO comments and docs references in `/docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md`).

- No operational runbook or automated archival/retention job (e.g., scheduled job to move >12 month logs to cold storage).

- No explicit guarantee or tests verifying DB-level immutability (e.g., triggers verified, tests asserting audit rows cannot be updated/deleted).

- No centralized configuration file documenting expected external audit sink schema or authentication for `FORGEA_AUDIT_SINK_URL` and `FORGEA_SECURITY_ALERT_SINK_URL`.


### RISKS OR CONFLICTS (observed)

- Telemetry vs legal-grade audit separation: `emitAuditEvent` in `packages/config` sends Edge-safe audit telemetry to `FORGEA_AUDIT_SINK_URL` (best-effort, fallbacks). This telemetry path is useful for UI-level audit but is not the same as immutable DB `AuditLog` writes; mixing the two without clear boundaries can cause compliance gaps.

- Missing retention docs: Without explicit retention/archival policies implemented, `AuditLog` table may grow without operational controls, causing cost and performance risks.

- Silent failures: `AuditService.log` catches and logs failures to console; since writes are non-blocking and errors are swallowed, silent log-loss is possible if the DB is unreachable and there is no guaranteed sink or retry/backup path.


### QUESTIONS FOR CLARIFICATION

- Which audit events require legal-grade persistence (immutable DB rows) vs. which can be telemetry-only to external sinks?
- What retention and access-control policies must we enforce for `AuditLog` (e.g., 12 months hot, 3 years cold, role-based access)?
- Are `FORGEA_AUDIT_SINK_URL` and `FORGEA_SECURITY_ALERT_SINK_URL` already managed by infra (expected payload schema, auth), or do we need a spec and onboarding steps for them?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

(For Security/Compliance and Planner / Architect agents)

Please review this report: [docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md](docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md).

Security/Compliance (role):
- Using the findings above, produce a concise policy document that specifies:
  - Which audit actions (reference `packages/schema/src/audit-actions.ts`) are legal-grade and must be stored immutable in the DB.
  - Retention windows (hot/cold), access controls (roles that can read/export), and allowed redaction/anonymization rules for each action class.
  - Immutability guarantees required (DB-level triggers, audit-only DB roles, logging of any admin reads/exports) and compliance acceptance criteria.

Planner / Architect (role):
- Using this report and the Security/Compliance output, produce a design task (no code) that lists exact implementation steps needed: DB-level immutability verification, archival job design (how to move >12mo rows), sink onboarding steps for `FORGEA_AUDIT_SINK_URL` and `FORGEA_SECURITY_ALERT_SINK_URL`, and acceptance tests (e.g., unable to update/delete audit rows, archived rows recoverable).

Deliverables (both agents):
- Short summary (1 line) referencing this report.
- Exact file paths to inspect/update (examples from this report):
  - `packages/audit/src/audit.service.ts` (implementation)
  - `packages/schema/prisma/schema.prisma` (AuditLog model)
  - `packages/schema/prisma/migrations/*` (migration verification)
  - `apps/forgea-labs/auth.config.ts` and `apps/forgea-labs/app/api/webhooks/github/route.ts` (emitters to be instrumented)
  - `packages/config/src/permissions.ts` (Edge telemetry hook)
- For Security/Compliance: a one-paragraph statement of required retention + immutability rules.
- For Planner / Architect: a task list with acceptance tests and a safe rollout plan (no SQL in this handoff; list steps only).

Reference: this code-scout report is at [docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md](docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md).

Handoff complete. Provide this report verbatim to the next agent.