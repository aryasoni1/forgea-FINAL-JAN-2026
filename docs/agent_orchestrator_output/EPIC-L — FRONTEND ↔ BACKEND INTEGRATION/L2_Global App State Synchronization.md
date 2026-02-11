### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Produce task doc stating invariants: backend as source of truth, mutation rules, and reset flows.
- forgea-code-scout — Identify existing global state stores, middleware, and backend APIs used for user/session/role state.
- docs-gatekeeper — Confirm documentation coverage for state synchronization invariants.
- implementer — Implement approved task and required docs.
- qa-tester — Validate that frontend renders read-only backend state and that mutation flows are gated.
- integration-checker — Verify end-to-end state consistency across views.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- security-sentinel — Not required for base sync (only if sensitive session escalations introduced).

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` collect repo facts and doc coverage. (parallel)
- Step 2: `planner-architect` writes the task with explicit invariants and recovery rules.
- Step 3: After approval, `implementer` makes changes and produces manuals/guides.
- Step 4: `qa-tester` exercises UI flows and failure cases; `integration-checker` finalizes approval. (parallel)
- Step 5: `documenter-historian` updates records.

### ORCHESTRATOR IMPROVEMENT NOTES

- Add explicit checklist items to ensure frontend cannot mutate local state without backend confirmation.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
	Produce `/docs/tasks/task-L2-<YYYY-MM-DD>.md` for FEATURE L2. Use the EPIC task at `/docs/tasks/master_tasks_V1/EPIC-L — FRONTEND ↔ BACKEND INTEGRATION.md` and this Orchestrator output. Document invariants, allowed APIs, reset and termination rules, caching/invalidation strategy, and any preconditions. Include Locked Decisions with citations. Stop and request user approval when complete.

- forgea-code-scout:
	Inspect apps/web/**, apps/lab-ui/**, and services/api/** for global state stores, sync patterns, and existing middleware. Produce `/docs/code-scout/EPIC-L/L2_Global App State Synchronization.md` with factual findings and a concise handoff to Planner.

- docs-gatekeeper:
	Verify internal docs coverage for state synchronization rules and update registries if required. Produce the feature brief at `/docs/docs-gatekeeper/EPIC-L/L2_Global App State Synchronization.md`.

- implementer:
	Implement the approved task doc verbatim and create mandatory artifacts `/docs/manual-checks/task-L2-manual-checks.md` and `/docs/guides/task-L2-how-to.md`.

- qa-tester:
	Validate that frontend always reflects backend state and that mutation attempts are rejected unless backend confirms. Block on missing artifacts.

- integration-checker:
	Verify end-to-end state consistency across views and return APPROVE/BLOCK.

- documenter-historian:
	Record decisions, branch suggestions, and docs to update after final approval.
