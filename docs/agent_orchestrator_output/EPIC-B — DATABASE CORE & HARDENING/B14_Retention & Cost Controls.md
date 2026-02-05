### FEATURE ANALYSIS

- Feature Type: infra / data-management / monitoring
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- forgea-code-scout — Find existing archival or retention logic and proof artifact storage paths
- planner-architect — Produce task doc specifying retention rules, archival process, and cost metadata
- implementer — Implement archival pipeline, cold storage move, and cost tracking triggers
- qa-tester — Verify archival correctness and cost accounting triggers
- documenter-historian — Record retention policy, archival process, and migration notes
- integration-checker — Verify end-to-end retention and archival behavior

### NOT REQUIRED AGENTS

- security-sentinel — Reason: include only if planner highlights sensitive data-in-transit risks

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Code scout to enumerate existing artifact storage, indexes, and proof-hash references.
- Step 2: Planner writes task doc defining retention durations, archival destination, proof-hash preservation, and cost-tracking triggers.
- Step 3: Implementer implements archival move, preserves proof-hash in main DB, and adds cost-tracking trigger.
- Step 4: QA validates archival integrity, proof-hash presence, and cost accounting triggers; Integration checker approves.
- Step 5: Documenter records policy and operational runbooks.

### USER PROMPTS

- forgea-code-scout:
  "Task: FEATURE B14 — Retention & Cost Controls
  List paths and mechanisms for existing proof artifact storage, any current retention logic, and where cost-related metadata might be stored. End with: 'Handoff complete. Provide this report verbatim to the next agent.'"

- planner-architect:
  "Produce `/docs/tasks/task-B14-<YYYY-MM-DD>.md` (DRAFT). Define retention rules, archival pipeline design (cold storage destination and access patterns), proof-hash preservation in primary DB, cost tracking column and triggers, and verification criteria."

- implementer:
  "On approved B14 task doc, implement archival move, ensure proof-hash remains in DB, add cost-tracking trigger, and produce `/docs/tests/task-B14-tests.md`."

- qa-tester:
  "Validate archival correctness (artifact recoverability check), verify proof-hash persistence, and confirm cost calculations via triggers under representative loads."

- integration-checker:
  "Inspect implemented archival flow, verify triggers and cost metadata are present, and produce APPROVE/BLOCK decision with follow-ups."

- documenter-historian:
  "Record retention policy, operational runbook for archival, and suggested commit messages after implementation."

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a small CSV/JSON manifest format for archived batches to ease recovery and audits.

### STOP CONDITION

Stop after agent prompts and plan generation; archival data moves require explicit approvals and dry-run validation.
