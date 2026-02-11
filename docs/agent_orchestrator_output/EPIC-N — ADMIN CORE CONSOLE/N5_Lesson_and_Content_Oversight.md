### FEATURE ANALYSIS

- Feature Type: content oversight / admin UI
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define listing, metadata views, deprecation workflow, and invariants.
- docs-gatekeeper — Validate docs covering content versioning and deprecation policy.
- implementer — Implement listing, metadata APIs, and deprecation actions per approved task doc.
- qa-tester — Validate listing accuracy, version metadata, and deprecation safety.
- integration-checker — Final end-to-end approval.
- documenter-historian — Record decisions and docs updates.

### NOT REQUIRED AGENTS

- security-sentinel — Not required for read-only metadata; include if deprecation adds destructive workflows.
- forgea-code-scout — Optional; not required for planning.

### MISSING AGENT

- None identified.

### EXECUTION PLAN

- Step 1: Planner/Architect — produce `/docs/tasks/task-N5-2026-02-10.md` (sequential)
- Step 2 (parallel): Docs Gatekeeper — validate docs (parallel)
- Step 3: Implementer — implement per approved doc (sequential)
- Step 4: QA/Tester — validate metadata and deprecation path (sequential)
- Step 5: Integration Checker — final APPROVE/BLOCK (sequential)
- Step 6: Documenter/Historian — update docs and registry (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- If deprecation is destructive, treat as HIGH risk and include Security Sentinel in required agents.

### AGENT PROMPTS (copy-paste-ready)

- Planner/Architect:
Produce an approval-gated task document for FEATURE N5 — Lesson & Content Oversight. Inputs: `/docs/tasks/master_tasks_V1/EPIC-N — ADMIN CORE CONSOLE.md`. Output: `/docs/tasks/task-N5-2026-02-10.md`. Include versioning model, deprecation rules, and required invariants.

- Docs Gatekeeper:
Validate documentation coverage and produce `/docs/docs-gatekeeper/EPIC-N/N5_docs.md` with registry updates.

- Implementer:
Implement only per approved task doc and produce manual-checks and how-to guide artifacts.

- QA/Tester:
Validate metadata accuracy, linked labs listing, and safe deprecation behavior. Produce `/docs/tests/task-N5-tests.md` if QA is required.

- Integration Checker:
Verify workflows and respond APPROVE or BLOCK.

- Documenter/Historian:
Record decisions and update the master docs registry.
