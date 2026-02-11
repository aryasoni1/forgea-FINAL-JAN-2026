### FEATURE ANALYSIS

- Feature Type: code / UX
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define exact step-scoped access rules, locking semantics, and UI update triggers.
- forgea-code-scout — Inventory current step/state APIs and any step-metadata storage.
- implementer — Implement the approved task document.
- security-sentinel — Review for bypass scenarios where future-step files could be modified.
- documenter-historian — Produce manual-checks and how-to guides.

### NOT REQUIRED AGENTS

- qa-tester — Conditional post-implementation.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` finds step-state APIs and metadata locations.
- Step 2: `planner-architect` produces `/docs/tasks/task-K6-<YYYY-MM-DD>.md` with explicit runtime invariants and UI signals.
- Step 3 (parallel): `security-sentinel` reviews the planner draft; `docs-gatekeeper` verifies documentation expectations.
- Step 4: `implementer` implements per-approved task doc; `documenter-historian` produces artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend an event contract for step-change notifications to avoid ad-hoc polling across components.
