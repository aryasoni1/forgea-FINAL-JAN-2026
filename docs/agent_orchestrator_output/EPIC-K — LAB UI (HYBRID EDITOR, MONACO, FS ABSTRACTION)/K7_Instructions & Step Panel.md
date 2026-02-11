### FEATURE ANALYSIS

- Feature Type: UX / documentation
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify instruction sync semantics, content sources, and failure modes.
- forgea-code-scout — Identify where step instructions are stored and APIs to fetch them.
- implementer — Implement UI panel and sync behavior per approved task doc.
- documenter-historian — Produce manual-checks and how-to.

### NOT REQUIRED AGENTS

- security-sentinel — Not required unless planner flags sensitive content concerns.
- qa-tester — Conditional post-implementation.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` locates instruction sources and formats.
- Step 2: `planner-architect` writes `/docs/tasks/task-K7-<YYYY-MM-DD>.md` with UX and sync invariants.
- Step 3: `implementer` implements per-approved task doc; `documenter-historian` creates artifacts.

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a standard markdown-to-HTML rendering guideline for instructions to keep formatting consistent.
