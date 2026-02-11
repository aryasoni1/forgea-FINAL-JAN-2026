### FEATURE ANALYSIS

- Feature Type: Safety / Enforcement Constraints
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define hard enforcement rules: prevent admins from marking sessions PASSED, modifying user code, or injecting commits; specify preservation of session state after enforcement.
- security-sentinel — Rigorously review enforcement paths, ensure fail-closed semantics, and check for covert mutation channels.
- implementer — Implement enforcement guards, policy checks, and immutable audit recording.
- qa-tester — Validate enforcement cannot be bypassed (UI, API, DB) and that session state is preserved.
- documenter-historian — Produce manual-checks and guidance for incident handling and enforcement audit review.

### NOT REQUIRED AGENTS

- integration-checker — Not required unless enforcement involves other services for state mutation.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner publishes explicit enforcement rules and forbidden actions, with DB-level constraints where applicable.
- Step 2: Security Sentinel reviews for covert mutation or approval bypass. (Sequential)
- Step 3: Implementer applies enforcement checks and audit logging. (Sequential)
- Step 4: QA performs negative tests attempting to bypass enforcement via all channels. (Sequential)
- Step 5: Documenter records incident response steps and manual checks. (Can run in parallel with final QA)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Produce a task document for O8 — Enforcement & Safety. Enumerate hard enforcement invariants preventing admins from marking sessions PASSED, modifying user code, or injecting commits. Specify DB constraints, API checks, and audit fields."

- security-sentinel:
"Review O8 for any paths that could lead to evidence tampering or state mutation by admins. Recommend cryptographic or DB-level safeguards."

- implementer:
"Implement O8 per the approved task doc and produce `/docs/manual-checks/task-O8-manual-checks.md` and `/docs/guides/task-O8-how-to.md`."

- qa-tester:
"Attempt to bypass enforcement using UI, API, and direct DB approaches and report any successful bypasses."

### ORCHESTRATOR IMPROVEMENT NOTES

- Mandate Planner to include which DB tables must be treated as WORM or have restricted DML for audit-critical state.
