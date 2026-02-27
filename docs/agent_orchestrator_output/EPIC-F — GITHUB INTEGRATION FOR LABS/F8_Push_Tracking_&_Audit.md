### FEATURE ANALYSIS

- Feature Type: integration / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define LabAttempt and AuditLog schemas and retention policies.
- Implementer — Create LabAttempt records per push, link to LabSession, store commit SHA, changed files, timestamp, and delivery ID; write to AuditLog.
- QA / Tester — Validate correctness of recorded fields and concurrency behavior.
- Integration Checker — Verify records are created on real webhook deliveries.
- Security Sentinel — Ensure audit logs are tamper-evident and access-controlled.
- Documenter — Document audit schema and query examples.

### NOT REQUIRED AGENTS

- None.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define LabAttempt schema, link to LabSession, required fields (SHA, changed_files, timestamp, delivery_id) and retention/archival policies.
- Step 2: Implementer — Persist LabAttempt and AuditLog entries on webhook processing; ensure idempotency using delivery_id.
- Step 3: Security Sentinel — Validate that audit logs are write-once or append-only and protected from tampering.
- Step 4: QA / Tester — Validate record creation under load and webhook retries.
- Step 5: Integration Checker — Verify real pushes create LabAttempt and AuditLog records.
- Step 6: Documenter — Publish schema and access instructions.

### AGENT PROMPTS

- Planner:
  "Design the LabAttempt and AuditLog schemas: fields, indexes, retention policy, and idempotency keys (e.g., GitHub delivery ID)."

- Implementer:
  "Implement storage of LabAttempt records for each push event: link to LabSession, store commit SHA, changed file list, push timestamp, and GitHub delivery ID. Write an AuditLog entry and ensure idempotent handling of retries."

- Security Sentinel:
  "Confirm audit logs are protected, access-controlled, and that delivery IDs are used to prevent duplicate records. Recommend tamper-detection measures."

- QA / Tester:
  "Simulate webhook retries and concurrent push events; validate LabAttempt/AuditLog correctness and no duplicates."

- Integration Checker:
  "Trigger real pushes and confirm corresponding LabAttempt and AuditLog records are present and correct."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a cross-epic Audit agent to centralize append-only audit implementations and retention rules.
