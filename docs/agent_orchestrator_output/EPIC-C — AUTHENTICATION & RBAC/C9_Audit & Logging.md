### FEATURE ANALYSIS

- Feature Type: infra + code + compliance
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Add audit events for login, logout, failed attempts, provider info, and role changes.
- Planner / Architect — Define audit retention, immutability requirements, and storage location.
- Security Sentinel — Ensure logs are tamper-evident and access-controlled.
- QA / Tester — Validate audit events fire and contain expected fields.

### NOT REQUIRED AGENTS

- Integration Checker — Optional for later end-to-end verification.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect defines audit schema and retention/immutability rules.
- Step 2: Implementer logs events for successful/failed logins, logouts, provider metadata, and role changes.
- Step 3: Security Sentinel verifies integrity and access controls for audit storage.
- Step 4: QA verifies event contents and immutability behavior.

(Parallel: Security review can run while Implementer instruments events.)

### USER PROMPTS

- Implementer:
  "Instrument audit logging: record successful and failed logins, logout events, provider info, and role changes. Store events in an append-only store or table and make them queryable for audits."

- Planner / Architect:
  "Specify retention, required fields for each event type, and immutability constraints. Clarify where audit data will be stored (DB, external log store, or WORM storage)."

- Security Sentinel:
  "Review the audit pipeline for tamper-evidence, access controls, and whether logs must be immutable. Recommend storage and rotation policies."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider providing a standard audit-event schema and helper library to implementers.
