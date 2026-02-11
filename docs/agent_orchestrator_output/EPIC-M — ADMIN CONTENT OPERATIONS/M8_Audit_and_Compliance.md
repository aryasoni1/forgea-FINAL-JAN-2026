### FEATURE ANALYSIS

- Feature Type: Audit Logging + Compliance + Data Retention
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define audit event model, retention, immutability requirements, and append-only storage expectations.
- docs-gatekeeper — Validate compliance docs and registry updates.
- implementer — Implement audit logging for create/publish/deprecate and lesson–lab binding changes; ensure immutability.
- security-sentinel — Review audit tamper-resistance and access to logs.
- qa-tester — Verify audit event coverage and immutability behavior.
- integration-checker — Final approval.

### NOT REQUIRED AGENTS

- forgea-code-scout — Optional.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M8-<YYYY-MM-DD>.md` specifying audit schema, storage (append-only), retention, access controls, and required event coverage (create/publish/deprecate/binding-changes).
- Step 2: Docs-Gatekeeper — Validate compliance documentation and registry updates. (sequential)
- Step 3: Implementer — Implement audit logging and immutable storage. (sequential)
- Step 4: Security-Sentinel — Review tamper-resistance and access controls. (parallel with QA)
- Step 5: QA-Tester — Validate audit completeness and immutability. (parallel with Security)
- Step 6: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend standardized audit-event naming and schema across epics to simplify compliance queries.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Produce `/docs/tasks/task-M8-<YYYY-MM-DD>.md` for EPIC-M Feature M8 (Audit & Compliance). Include event schema, storage/backing store choices, retention policy, access controls for audit data, and a mapping of which actions must emit which events.

- Docs-Gatekeeper:

Validate referenced compliance docs and update registries.

- Implementer:

Implement audit events and ensure append-only storage per the approved task doc; produce manual-checks and how-to guides.

- Security-Sentinel:

Review audit storage for tamper-resistance, access controls, and potential leak vectors.

- QA-Tester:

Validate event coverage for all admin actions and that audit records are immutable and queryable.

- Integration-Checker:

Verify end-to-end and approve or block.
