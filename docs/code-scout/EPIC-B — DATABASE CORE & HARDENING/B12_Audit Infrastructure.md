# FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B12 — Audit Infrastructure
- Source: /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md

---

### TASKS CHECKED

- Step 1 (parallel): Code scout to enumerate existing audit writes; Docs gatekeeper to validate standards.
- Step 2: Planner crafts task doc specifying event schema, API, and required writes.
- Step 3: Implementer adds `packages/audit` utility and integrates calls where specified.
- Step 4: QA validates event emission and format; Documenter records formats and migration notes.

---

### WHAT ALREADY EXISTS

- `packages/audit/src/audit.service.ts` — Audit service implementation present; contains calls to `db.auditLog.create`, metadata serialization/truncation logic, and explicit error logging (`[AUDIT_LOG_WRITE_FAILED]`). (observed: lines with `db.auditLog.create` and a TODO about archive).
- `packages/schema/src/audit-actions.ts` — Enum/types for `AuditAction`, `AuditActorType`, `AuditResourceType`, `AuditSeverity` referenced by services.
- `apps/forgea-labs/app/api/webhooks/github/route.ts` — Calls audit service `.log` for `LAB_VERIFY_ATTEMPT` etc and catches/logs failed writes (`[AUDIT_LOG_WRITE_FAILED]`).
- `apps/forgea-labs/auth.config.ts` — Imports from `../../packages/audit/src/audit.service` and uses audit hooks for login/register flows.
- `tsconfig.json` path mappings include `@forgea/audit` -> `packages/audit/src/audit.service.ts` (indicates internal path aliasing to the source file).
- Compiled Next artifacts (.next/server/\*) contain the same audit write code paths (evidence of runtime usage), but primary sources are listed above.

---

### WHAT IS PARTIALLY IMPLEMENTED

- `packages/audit` provides a working write path into `AuditLog` (Prisma `db.auditLog.create`) and helper logic (truncation, severity handling), but:
  - No repository-level, machine-readable audit event JSON Schema or single source-of-truth schema file was found ("Not found").
  - No dedicated `/docs/tasks/task-B12-<date>.md` task doc exists yet (DRAFT task doc missing).
  - No central registry entry in `/docs/official-docs-registry.md` referencing an external audit format or regulatory standard for audit events (no audit-related external standard listed).
  - Tests or QA artifacts specifically validating that all critical actions emit standardized audit events were not found (no `task-B12-tests.md` or equivalent).

---

### WHAT IS MISSING

- Explicit, versioned JSON Schema (or equivalent) for audit event shape (single source-of-truth file under `packages/audit` or `/docs`).
- A planner/architect draft task doc at `/docs/tasks/task-B12-<YYYY-MM-DD>.md` that defines event schema, required producers, batching/async considerations, and persistence rules.
- An entry in `/docs/official-docs-registry.md` listing any external audit format or regulatory spec (none present).
- End-to-end QA tests documenting expected event emissions and format checks (no tests found).
- A documented migration plan for existing ad-hoc writes to conform to the standardized schema.

---

### RISKS OR CONFLICTS (observed)

- Metadata truncation logic exists in `packages/audit/src/audit.service.ts` (serializes and truncates > 12288 bytes). Without schema + clear guidance, important fields may be lost during truncation.
- Audit writes are already present across services (auth hooks, webhooks). Without a standardized schema and rollout plan, services may diverge or produce incompatible metadata shapes.
- The code references `packages/audit` by direct source path via `tsconfig` mapping; there is no evidence of a published package API surface or a JSON Schema export for cross-service validation.

---

### QUESTIONS FOR CLARIFICATION

- None strictly required for the docs-gatekeeper step; planner will likely request policy choices (e.g., required fields, retention, truncation behavior).

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Agent role: docs-gatekeeper

Please run the checks described below using this report as the source-of-truth (this file). Do not implement changes — only verify and list missing external references.

1. Confirm whether any external/official audit event format or regulatory specification (e.g., SOC2 event formats, OPA/CIS recommendations, or industry JSON schemas) that we should adopt is present in `/docs/official-docs-registry.md`. If not present, produce a bullet list of the exact external documents (with stable links and version pins) that should be added to the registry for planning.

2. Specifically check for the following canonical references; if any are missing, list the authoritative link and recommended version:
   - JSON Schema or canonical spec for audit/event logs suitable for DB-backed AuditLog.
   - Any regulatory standards the product must obey (e.g., SOC2, PCI-DSS auditing requirements) that prescribe audit formats or retention.

3. Verify whether internal docs already reference an audit event schema (search `/docs` and `/packages/audit`); if you find one, include exact file paths and version notes.

4. Report back in a concise list: (a) found external specs (with links + version), (b) internal docs to add or update (exact file paths), and (c) a short blocking flag if required official references are missing.

Reference this code-scout report file when you reply: `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md`

---

Handoff complete. Provide this report verbatim to the next agent.
