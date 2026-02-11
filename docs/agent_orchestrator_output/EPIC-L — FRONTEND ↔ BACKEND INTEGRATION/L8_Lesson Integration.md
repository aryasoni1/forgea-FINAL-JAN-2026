### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define lesson metadata contract, progress sync rules, and gating between lessons and labs.
- forgea-code-scout — Locate lesson APIs, linkage code, and UI entry points.
- docs-gatekeeper — Verify documentation coverage for lesson ↔ lab linkage and gating policies.
- implementer — Implement approved task and produce required artifacts.
- qa-tester — Validate lesson metadata fetching, progress sync, and gating behaviors.
- integration-checker — End-to-end verification of lesson ↔ lab flows.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- security-sentinel — Optional; include if lessons affect privileges or grant artifacts.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` gather facts about lesson APIs and doc coverage. (parallel)
- Step 2: `planner-architect` writes task doc specifying metadata contracts, progress sync, and gating rules.
- Step 3: After approval, `implementer` implements required behavior and creates manuals/guides.
- Step 4 (parallel): `qa-tester` and `integration-checker` validate flows and return APPROVE/BLOCK. (parallel)
- Step 5: `documenter-historian` records decisions and suggests docs updates.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
  Produce `/docs/tasks/task-L8-<YYYY-MM-DD>.md` for FEATURE L8 (Lesson Integration). Define lesson metadata contracts, progress sync, gating rules for lab entry, and error handling. Reference EPIC-L and this Orchestrator file. Stop and request user approval when complete.

- forgea-code-scout:
  Inspect repo for lesson metadata endpoints, models, and UI consumers; produce `/docs/code-scout/EPIC-L/L8_Lesson Integration.md` with findings.

- docs-gatekeeper:
  Verify docs coverage for lesson linkage and gating; update registries as necessary.

- implementer:
  Implement exactly per approved task and produce `/docs/manual-checks/task-L8-manual-checks.md` and `/docs/guides/task-L8-how-to.md`.

- qa-tester:
  Validate correct fetching, progress sync, and gating behavior for lesson → lab transitions.

- integration-checker:
  Perform end-to-end verification and return APPROVE/BLOCK.

- documenter-historian:
  Record final decisions and docs to update after approval.
