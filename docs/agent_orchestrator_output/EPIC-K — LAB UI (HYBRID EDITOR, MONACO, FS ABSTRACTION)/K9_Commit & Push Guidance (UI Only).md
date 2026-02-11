### FEATURE ANALYSIS

- Feature Type: UX / docs
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define exact guidance content and explicit prohibition language for in-browser Git actions.
- forgea-code-scout — Identify existing UI locations where commit/push guidance should be shown.
- implementer — Implement display-only guidance per approved task doc.
- documenter-historian — Produce manual-checks and how-to.

### NOT REQUIRED AGENTS

- security-sentinel — Not required; guidance is non-executing UI copy.
- qa-tester — Conditional post-implementation.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` finds candidate UI surfaces for guidance placement.
- Step 2: `planner-architect` writes `/docs/tasks/task-K9-<YYYY-MM-DD>.md` containing exact guidance copy and expected CTAs.
- Step 3: `implementer` implements; `documenter-historian` produces artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest a short FAQ snippet for common commit/push confusion to include in the guidance content.
