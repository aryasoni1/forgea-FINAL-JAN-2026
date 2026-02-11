### FEATURE ANALYSIS

- Feature Type: Developer Experience + Tooling + Admin UX
- Risk Level: Low-Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define admin preview URLs, search/filter contracts, and content health indicators.
- docs-gatekeeper — Validate docs and registry updates.
- implementer — Implement preview URLs, search/filter, and health UI.
- qa-tester — Validate search accuracy, preview security, and health metrics.
- integration-checker — Final approval.

### NOT REQUIRED AGENTS

- security-sentinel — Only if preview URLs expose unpublished content to non-admins.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M10-<YYYY-MM-DD>.md` defining admin preview URL behavior, search and filter APIs, and content health indicators/metrics.
- Step 2: Docs-Gatekeeper — Validate documentation coverage. (sequential)
- Step 3: Implementer — Implement preview endpoints, search/filter UI, and health indicators; produce required artifacts. (sequential)
- Step 4: QA-Tester — Validate preview access controls, search relevance, and health metrics accuracy. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a simple preview token mechanism to avoid accidental public exposure of drafts.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Create `/docs/tasks/task-M10-<YYYY-MM-DD>.md` for EPIC-M Feature M10 (Internal Tooling & DX). Define preview URL semantics (who can access, expiration), search/filter API specs, and health indicators to display in admin dashboard.

- Docs-Gatekeeper:

Validate preview URL security guidance and update registries.

- Implementer:

Implement per approved task doc and produce manual-checks and how-to guides.

- QA-Tester:

Validate preview access control, search/filter behavior, and that health indicators reflect real validation/quality states.

- Integration-Checker:

Verify end-to-end and approve or block.
