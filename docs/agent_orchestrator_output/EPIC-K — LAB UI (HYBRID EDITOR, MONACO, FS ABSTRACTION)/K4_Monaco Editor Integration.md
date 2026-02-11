### FEATURE ANALYSIS

- Feature Type: code / UX
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify editor capabilities/inhibitions (disable terminal, extensions, arbitrary FS writes).
- forgea-code-scout — Inventory current editor integrations and Monaco usage points.
- implementer — Implement integration per approved task doc.
- docs-gatekeeper — Ensure any external Monaco licensing/usage documentation is referenced if required.
- documenter-historian — Produce how-to and manual-checks for editor behavior.

### NOT REQUIRED AGENTS

- qa-tester — Conditional after implementation.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` inventory Monaco integration points.
- Step 2: `planner-architect` writes `/docs/tasks/task-K4-<YYYY-MM-DD>.md` with explicit allowed/forbidden editor capabilities.
- Step 3 (parallel): `docs-gatekeeper` validates licensing/docs; `security-sentinel` reviews for extension/terminal risk if planner flags it.
- Step 4: `implementer` implements; `documenter-historian` produces artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a short, reusable list of forbidden Monaco capabilities to speed planner decisions.
