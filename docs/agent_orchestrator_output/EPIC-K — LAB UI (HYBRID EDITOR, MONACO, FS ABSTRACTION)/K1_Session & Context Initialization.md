### FEATURE ANALYSIS

- Feature Type: code
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- forgea-code-scout — Gather repository facts (existing session APIs, auth flows, config locations).
- planner-architect — Produce an approval-gated task document for implementation.
- docs-gatekeeper — Verify required official/internal documentation and registry entries.
- security-sentinel — Threat-model and review sensitive session handling decisions.
- implementer — Implement the approved task document.
- documenter-historian — Produce manual-checks and how-to guides.

### NOT REQUIRED AGENTS

- qa-tester — Not required at this orchestrator stage; QA is conditional post-implementation.
- integration-checker — Not required for this feature's planning selection.

### MISSING AGENT

- Name: NONE
- Responsibility: N/A
- Why existing agents are sufficient: The listed agents cover discovery, planning, security review, implementation, and documentation.

### EXECUTION PLAN

- Step 1: Run `forgea-code-scout` to produce a code inventory for session-related modules and `forgea.config.json` locations.
- Step 2 (sequential): `planner-architect` consumes the code-scout output and the epic file `/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md` to produce `/docs/tasks/task-K1-<YYYY-MM-DD>.md`.
- Step 3 (parallel): `docs-gatekeeper` reviews authoritative docs and `security-sentinel` performs a threat review based on the planner draft.
- Step 4: After planner approval, `implementer` implements exactly per approved task document.
- Step 5: `documenter-historian` produces `/docs/manual-checks/task-K1-manual-checks.md` and `/docs/guides/task-K1-how-to.md` as implementation artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest adding a standard code-scout checklist for session/auth surfaces to speed discovery.
- Recommend planner include explicit approval gates for session expiry and token handling decisions.
