### FEATURE ANALYSIS

- Feature Type: Audit & Forensics
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define audit event schema, required fields (admin identity, action, reason, timestamp), retention, and immutability guarantees.
- security-sentinel — Review audit storage, tamper-evidence, and access controls.
- implementer — Implement audit emission, storage, and read-only access patterns.
- qa-tester — Verify that every admin action emits an audit event and that logs are preserved immutably.
- documenter-historian — Produce how-to for forensic investigation and export procedures.

### NOT REQUIRED AGENTS

- integration-checker — Not required unless audits include cross-service traces that need correlation.

### MISSING AGENT (ONLY IF NEEDED)

- audit-keeper (advisory): For cryptographic signing and long-term WORM retention enforcement.

### EXECUTION PLAN

- Step 1: Planner specifies audit schema, required admin fields, retention, and export needs.
- Step 2: Security Sentinel reviews for tamper risks and access control settings. (Sequential)
- Step 3: Implementer implements audit emission and immutable storage. (Sequential)
- Step 4: QA validates that all admin actions produce audit entries and that logs are tamper-evident. (Sequential)
- Step 5: Documenter prepares forensic guidance and manual checks. (Parallel with QA)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Create a task doc for O9 — Audit & Forensics. Define audit event schema (admin identity, action, reason, timestamp), retention policy, export format, and immutability requirements. Specify who can access audit logs and under what conditions."

- security-sentinel:
"Review O9 for any audit tampering risks, access-control weaknesses, and recommend signing or WORM storage if necessary."

- implementer:
"Implement O9 per the approved task doc and produce `/docs/manual-checks/task-O9-manual-checks.md` and `/docs/guides/task-O9-how-to.md`."

- qa-tester:
"Validate that every admin action emits an audit event and that logs are preserved; attempt tampering and report results."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider standardizing audit schema across features to simplify ingestion and forensic workflows.
