### FEATURE ANALYSIS

- Feature Type: code / infra
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define LabSession schema, DB linkages, and lifecycle state machine.
- Implementer — Implement LabSession creation API, link to user and lab IDs, and persist repo URL and status.
- QA / Tester — Validate DB constraints and concurrent session safety.
- Integration Checker — Exercise session creation and verify stored metadata.
- Documenter — Document LabSession schema and lifecycle states.

### NOT REQUIRED AGENTS

- Security Sentinel — Not needed for basic binding (must be consulted if sensitive PII stored).

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define LabSession fields (user_id, lab_id, repo_url, status, timestamps) and transitions (IN_PROGRESS, FAILED, COMPLETED).
- Step 2: Implementer — Implement API and DB model to create LabSession and link required fields atomically.
- Step 3: QA / Tester — Validate model constraints, concurrency, and idempotency for repeated creation calls.
- Step 4: Integration Checker — Create sessions via the full flow and confirm persistence and correct links.
- Step 5: Documenter — Publish schema and API docs.

### AGENT PROMPTS

- Planner:
  "Define the LabSession data model: required fields, indexes, lifecycle states, and expected invariants. Include rollback semantics if repo creation fails."

- Implementer:
  "Implement API to create a LabSession record linked to user ID and lab ID, store repository URL, and set status to IN_PROGRESS. Ensure atomicity and idempotency."

- QA / Tester:
  "Validate LabSession creation under concurrent requests, verify referential integrity, and test failure/rollback behavior when repo creation fails."

- Integration Checker:
  "Run the end-to-end flow that creates a repo and then the LabSession; verify stored metadata and status transitions."

- Documenter:
  "Document the LabSession schema, transitions, and example API calls for operators and implementers."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a shared `Session` agent for other lab-related session types to ensure consistent lifecycle handling.
