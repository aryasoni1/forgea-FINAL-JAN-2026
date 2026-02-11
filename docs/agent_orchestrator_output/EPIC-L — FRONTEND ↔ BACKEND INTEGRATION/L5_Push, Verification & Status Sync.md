### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define verification job semantics, polling, webhook handling, and UI gating rules.
- forgea-code-scout — Identify existing push/verification code paths, job runners, and webhook handlers.
- docs-gatekeeper — Confirm docs for verification lifecycle and webhook security.
- implementer — Implement polling, UI sync, and webhook reconciliation per approved task.
- qa-tester — Validate polling behavior, webhook reconciliation, duplicate/delayed webhook handling, and UI consistency.
- integration-checker — End-to-end verification of push → verification → UI state.
- documenter-historian — Record decisions and recommend docs updates.

### NOT REQUIRED AGENTS

- security-sentinel — Optional; include if webhooks or job inputs are untrusted.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` gather facts on existing verification systems. (parallel)
- Step 2: `planner-architect` documents polling/backoff, webhook reconciliation, and UI gating rules.
- Step 3: After approval, `implementer` implements changes and required artifacts.
- Step 4 (parallel): `qa-tester` and `integration-checker` validate behavior and provide final approval. (parallel)
- Step 5: `documenter-historian` records final state and registry changes.

### ORCHESTRATOR IMPROVEMENT NOTES

- Ensure planner specifies deterministic reconciliation behavior for duplicate or delayed webhooks.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
	Produce `/docs/tasks/task-L5-<YYYY-MM-DD>.md` defining verification job semantics, polling/backoff strategy, webhook reconciliation rules, UI gating, and failure modes. Reference EPIC-L tasks and this Orchestrator file. Include Locked Decisions and explicit reconciliation logic. Stop and request user approval.

- forgea-code-scout:
	Identify existing push/verification code paths, job runners, and webhook handlers; produce `/docs/code-scout/EPIC-L/L5_Push, Verification & Status Sync.md` with factual findings.

- docs-gatekeeper:
	Confirm documentation coverage for verification lifecycle and webhook security; update registries as required.

- implementer:
	Implement approved behavior exactly and create `/docs/manual-checks/task-L5-manual-checks.md` and `/docs/guides/task-L5-how-to.md`.

- qa-tester:
	Validate polling, webhook reconciliation, duplicate/delayed webhook handling, and UI consistency; block on missing artifacts.

- integration-checker:
	Verify end-to-end push → verification → UI flow and return APPROVE/BLOCK.

- documenter-historian:
	After final approval, record decisions and recommend registry updates.
