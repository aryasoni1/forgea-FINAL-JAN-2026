### FEATURE ANALYSIS

- Feature Type: code / documentation / infra
- Risk Level: Medium
- Touches HARD LOCK: No (supports locked artifacts)

### REQUIRED AGENTS

- forgea-code-scout — Inventory current audit usages and AuditLog writes
- docs-gatekeeper — Verify any external audit format standards referenced
- planner-architect — Produce task doc that standardizes audit event format and integration points
- implementer — Implement `packages/audit` and wiring to AuditLog
- qa-tester — Ensure audit events are emitted across critical actions
- documenter-historian — Record format and integration decisions

### NOT REQUIRED AGENTS

- security-sentinel — Reason: include only if planner flags security concerns

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1 (parallel): Code scout to enumerate existing audit writes; Docs gatekeeper to validate standards. (parallel)
- Step 2: Planner crafts task doc specifying event schema, API, and required writes.
- Step 3: Implementer adds `packages/audit` utility and integrates calls where specified.
- Step 4: QA validates event emission and format; Documenter records formats and migration notes.
- Step 5: Integration checker verifies end-to-end consistency.

### USER PROMPTS

- forgea-code-scout:
  "Task: FEATURE B12 — Audit Infrastructure
  Scan repo for all places writing to `AuditLog` (SQL inserts, services, packages). Provide file paths and indicate missing standardized event schema usage. End with: 'Handoff complete. Provide this report verbatim to the next agent.'"

- docs-gatekeeper:
  "Task: FEATURE B12 — Audit Infrastructure
  Confirm any external audit format or regulatory docs needed for standardization are present in `/docs/official-docs-registry.md`. If missing, list exact links and versions required."

- planner-architect:
  "Produce `/docs/tasks/task-B12-<YYYY-MM-DD>.md` (DRAFT). Define the audit event schema, where events must be produced, batching/async considerations, and how to persist to `AuditLog`. Include enforcement and verification criteria."

- implementer:
  "On approved B12 task doc, implement `packages/audit` utility, add standardized event emission to listed services, and provide migrated code paths. Produce `/docs/tests/task-B12-tests.md`."

- qa-tester:
  "Validate that all critical actions emit well-formed audit events; include direct DB insert bypass tests to ensure format invariants. Block if gaps exist."

- documenter-historian:
  "Record the final audit event schema, integration points, and suggested commits/branch names after implementation."

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a small JSON Schema file in repo for audit events to serve as single source-of-truth.

### STOP CONDITION

Stop after agent prompts and plan are generated; do not implement without planner approval.
