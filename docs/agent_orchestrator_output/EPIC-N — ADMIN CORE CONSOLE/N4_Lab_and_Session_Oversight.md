### FEATURE ANALYSIS

- Feature Type: session oversight / admin controls
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify session listing, force-terminate, snapshot-preview, and audit constraints.
- docs-gatekeeper — Verify docs for session lifecycle and snapshot preview policies.
- security-sentinel — Review risks around force-terminate and snapshot access; validate authorization checks.
- implementer — Implement read-only previews, termination APIs, and session views per task doc.
- qa-tester — Validate session invariants, termination effects, and preview safety.
- integration-checker — Final integration approval.
- documenter-historian — Record decisions and docs updates.

### NOT REQUIRED AGENTS

- forgea-code-scout — Optional; not required for initial planning.

### MISSING AGENT

- None identified.

### EXECUTION PLAN

- Step 1: Planner/Architect — produce `/docs/tasks/task-N4-2026-02-10.md` (sequential)
- Step 2 (parallel): Docs Gatekeeper & Security Sentinel — validate docs and security review (parallel)
- Step 3: Implementer — implement per approved doc (sequential)
- Step 4: QA/Tester — validate termination, snapshot preview safety, and audit trails (sequential)
- Step 5: Integration Checker — final APPROVE/BLOCK (sequential)
- Step 6: Documenter/Historian — finalize documentation and registry updates (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Planner should provide exact semantics of 'force terminate' (sync vs async) and required rollback behavior to avoid ambiguity.

### AGENT PROMPTS (copy-paste-ready)

- Planner/Architect:
Produce an approval-gated task document for FEATURE N4 — Lab & Session Oversight. Inputs: `/docs/tasks/master_tasks_V1/EPIC-N — ADMIN CORE CONSOLE.md`. Output: `/docs/tasks/task-N4-2026-02-10.md`. Include session states, termination semantics, snapshot preview policy, and audit requirements.

- Docs Gatekeeper:
Validate documentation coverage and produce `/docs/docs-gatekeeper/EPIC-N/N4_docs.md` with registry updates.

- Security Sentinel:
Assess risks for force-terminate and snapshot access. Provide mitigations and required enforcement rules.

- Implementer:
Implement only per approved task doc and produce required artifacts (manual-checks, how-to guide).

- QA/Tester:
Validate termination behavior, preview safety, and audit logging. Produce `/docs/tests/task-N4-tests.md`.

- Integration Checker:
Verify end-to-end behavior and respond APPROVE or BLOCK.

- Documenter/Historian:
Record final decisions and update the docs registry.
