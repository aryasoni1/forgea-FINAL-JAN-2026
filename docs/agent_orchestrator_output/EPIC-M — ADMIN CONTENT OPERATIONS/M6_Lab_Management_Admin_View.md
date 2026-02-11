### FEATURE ANALYSIS

- Feature Type: Admin UI + Data Model + Validation
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define admin views, APIs to surface `forgea.config.json`, and step listing contracts.
- docs-gatekeeper — Validate documentation requirements and registry updates.
- implementer — Implement admin lab listing, config viewing, and link/unlink flows.
- qa-tester — Verify correctness of lab metadata, view permissions, and contract validation.
- integration-checker — Final end-to-end approval.

### NOT REQUIRED AGENTS

- security-sentinel — Optional; include if viewing config exposes secrets.
- forgea-code-scout — Optional for repo facts only.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M6-<YYYY-MM-DD>.md` that lists required endpoints, UI views, and validation rules for `forgea.config.json` and step definitions.
- Step 2: Docs-Gatekeeper — Verify documentation coverage and registry updates. (sequential)
- Step 3: Implementer — Implement admin lab list, config viewer, and link/unlink actions; produce required artifacts. (sequential)
- Step 4: QA-Tester — Validate visibility, permissions, and contract consistency checks. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a shared JSON schema for `forgea.config.json` to avoid divergent parsing logic.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Produce `/docs/tasks/task-M6-<YYYY-MM-DD>.md` for EPIC-M Feature M6 (Lab Management). Include API specs to list labs with difficulty/status, an endpoint to fetch `forgea.config.json` safely for admin viewing, UI wireframes for step listing, and validation rules for link/unlink operations.

- Docs-Gatekeeper:

Validate referenced schemas and update `/docs/docs-gatekeeper/EPIC-M/M6_Docs_Brief.md`.

- Implementer:

Implement per approved task doc and produce `/docs/manual-checks/task-M6-manual-checks.md` and `/docs/guides/task-M6-how-to.md`.

- QA-Tester:

Verify admin-only access to lab configs, correct parsing/display of `forgea.config.json`, and that link/unlink operations update lesson bindings and emit audit events.

- Integration-Checker:

Verify end-to-end flow and approve or block.
