### FEATURE ANALYSIS

- Feature Type: UX / code
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define UI invariants (hidden/read-only markers, disable selection rules).
- forgea-code-scout — Inventory current UI components and file-tree implementations.
- implementer — Implement UI per approved task doc.
- documenter-historian — Produce user-facing how-to and manual checks for UI behavior.

### NOT REQUIRED AGENTS

- security-sentinel — Not required for UI-only rendering decisions (but available if planner flags specific risks).
- qa-tester — Not required at orchestration stage.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` inventory of existing file-tree components and relevant packages.
- Step 2: `planner-architect` produces `/docs/tasks/task-K3-<YYYY-MM-DD>.md` with explicit UX invariants and failure modes.
- Step 3: `implementer` implements per approved task doc; `documenter-historian` prepares manual-checks and how-to.

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a short UX acceptance checklist template to reduce back-and-forth between planner and implementer.
