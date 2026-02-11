### FEATURE ANALYSIS

- Feature Type: admin UI / telemetry / observability
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Produce a task doc defining dashboard data surfaces, privacy constraints, and read-only vs sensitive views.
- docs-gatekeeper — Verify documentation and master registry entries for data sources and telemetry.
- security-sentinel — Review data exposure risks and access controls for admin dashboard views.
- implementer — Implement UI, backend endpoints, and pagination as specified.
- qa-tester — Validate data accuracy, pagination, filtering, and safe rendering of previews.
- integration-checker — Final end-to-end approval.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- forgea-code-scout — Optional; not required for initial planning.

### MISSING AGENT

- None identified.

### EXECUTION PLAN

- Step 1: Planner/Architect — produce `/docs/tasks/task-N2-2026-02-10.md` (sequential)
- Step 2 (parallel): Docs Gatekeeper & Security Sentinel — validate docs and review data exposure (parallel)
- Step 3: Implementer — implement per approved task doc (sequential)
- Step 4: QA/Tester — validate UI correctness and data privacy (sequential)
- Step 5: Integration Checker — final APPROVE/BLOCK (sequential)
- Step 6: Documenter/Historian — update docs and registry (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Request that Planner include sample API contracts and a minimal data sensitivity matrix to accelerate Security Sentinel review.

### AGENT PROMPTS (copy-paste-ready)

- Planner/Architect:
Produce an approval-gated task document for FEATURE N2 — Admin Dashboard Foundation. Inputs: `/docs/tasks/master_tasks_V1/EPIC-N — ADMIN CORE CONSOLE.md`. Output: `/docs/tasks/task-N2-2026-02-10.md`. Include data sources, access control model, display counts, and pagination requirements.

- Docs Gatekeeper:
Validate documentation coverage for FEATURE N2 and produce `/docs/docs-gatekeeper/EPIC-N/N2_docs.md` with registry updates.

- Security Sentinel:
Assess data exposure risks for dashboard endpoints and preview links. Provide required fixes and acceptable mitigations.

- Implementer:
Implement exactly per `/docs/tasks/task-N2-2026-02-10.md`. Produce manual-checks and how-to guide artifacts.

- QA/Tester:
Validate dashboard data correctness, filtering, sorting, pagination, and safe rendering of previews. Produce `/docs/tests/task-N2-tests.md`.

- Integration Checker:
Verify end-to-end behavior and respond APPROVE or BLOCK.

- Documenter/Historian:
Record decisions and update the master docs registry entries as required.
