### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify API contracts for file tree, file content, and persistence endpoints plus error semantics.
- forgea-code-scout — Enumerate existing file APIs, editor components, and access control checks.
- docs-gatekeeper — Verify required docs for file access patterns and editor guarantees.
- implementer — Implement API hooks, persistence, and error handling per approved task.
- qa-tester — Validate file access, persistence, rejection handling, and sync behavior.
- integration-checker — Verify end-to-end editor ↔ backend integration.
- documenter-historian — Capture decisions and docs to update.

### NOT REQUIRED AGENTS

- security-sentinel — Only required if file access exposes sensitive data; otherwise optional.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` collect facts and doc coverage. (parallel)
- Step 2: `planner-architect` writes the task with explicit API contracts and error semantics.
- Step 3: After approval, `implementer` implements endpoints and editor wiring, producing manuals/guides.
- Step 4: `qa-tester` and optionally `security-sentinel` review the implementation. (parallel)
- Step 5: `integration-checker` final approval; `documenter-historian` records outputs.

### ORCHESTRATOR IMPROVEMENT NOTES

- Require the planner to include explicit API error codes and retry guidance to ensure deterministic frontend behavior.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
	Produce `/docs/tasks/task-L4-<YYYY-MM-DD>.md` specifying API contracts for file tree, file content retrieval, persistence endpoints, access control, and error semantics. Reference this Orchestrator output and EPIC-L tasks. Include Locked Decisions and exact expected error codes and retry guidance. Stop and request user approval.

- forgea-code-scout:
	Enumerate existing file APIs, editor components, and access control checks in the repo and produce `/docs/code-scout/EPIC-L/L4_Lab File & Editor Integration.md`.

- docs-gatekeeper:
	Verify that internal docs cover file access patterns and editor guarantees; produce the docs brief and registry updates if required.

- implementer:
	Implement the approved task document exactly and create `/docs/manual-checks/task-L4-manual-checks.md` and `/docs/guides/task-L4-how-to.md`.

- qa-tester:
	Validate file access controls, persistence, backend rejections, and sync behavior across editor sessions.

- integration-checker:
	Verify end-to-end editor ↔ backend integration and return APPROVE/BLOCK.

- documenter-historian:
	Capture decisions, branch/commit suggestions, and docs to update after approval.
