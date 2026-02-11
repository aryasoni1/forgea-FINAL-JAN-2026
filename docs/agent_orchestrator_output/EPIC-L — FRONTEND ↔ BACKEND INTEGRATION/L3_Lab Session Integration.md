### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium-High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define lab session lifecycle, creation semantics, and invalid/expired handling.
- forgea-code-scout — Locate current lab session APIs, DB models, and UI entry points.
- docs-gatekeeper — Verify any required docs for session lifecycle and retention.
- implementer — Implement session creation flow and UI gating as per approved task.
- security-sentinel — Review session creation and termination for privilege escalation and replay risks.
- qa-tester — Validate session lifecycle, expiry handling, and UI locking behavior.
- integration-checker — End-to-end verification of session flows.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- None obvious; all listed play defined roles.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` gather facts and doc state. (parallel)
- Step 2: `planner-architect` writes task doc with explicit lifecycle and locking invariants.
- Step 3: After approval, `implementer` implements creation, fetch, expiry, and UI lock behaviors.
- Step 4 (parallel): `security-sentinel` and `qa-tester` review implementation and test artifacts. (parallel)
- Step 5: `integration-checker` final approval.
- Step 6: `documenter-historian` records final artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Ensure the planner includes explicit rollback/cleanup behavior for aborted session creation.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
	Produce `/docs/tasks/task-L3-<YYYY-MM-DD>.md` defining the Lab Session lifecycle for FEATURE L3. Reference `/docs/tasks/master_tasks_V1/EPIC-L — FRONTEND ↔ BACKEND INTEGRATION.md` and this Orchestrator file. Include creation semantics, fetch contract, expiry rules, UI lock behavior, and cleanup/rollback rules. Cite docs that inform locked decisions. Stop and request user approval when done.

- forgea-code-scout:
	Scan repository for lab session APIs, DB models, and UI entry points. Produce `/docs/code-scout/EPIC-L/L3_Lab Session Integration.md` with WHAT EXISTS, PARTIAL, MISSING, and RISKS.

- docs-gatekeeper:
	Verify documentation coverage for session lifecycle, retention, and error handling. Produce the docs brief and registry updates as needed.

- implementer:
	After Planner approval, implement per task doc and create `/docs/manual-checks/task-L3-manual-checks.md` and `/docs/guides/task-L3-how-to.md`.

- security-sentinel:
	Review session creation/termination for privilege escalation, replay, and termination race conditions.

- qa-tester:
	Validate session lifecycle, expiry handling, UI locking, and concurrent/session race cases.

- integration-checker:
	Perform end-to-end verification and return APPROVE/BLOCK.

- documenter-historian:
	Capture decisions, commit message suggestions, and docs to update post-approval.
