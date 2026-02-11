### FEATURE ANALYSIS

- Feature Type: Code + Admin UI + Data Model
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define APIs, data model changes, and publish/deprecate lifecycle.
- docs-gatekeeper — Validate documentation coverage and registry updates.
- implementer — Implement list/create/edit/link/preview/publish flows and immutability rules for published versions.
- qa-tester — Verify lifecycle transitions, access controls, and UI behaviors.
- integration-checker — Final end-to-end approval.

### NOT REQUIRED AGENTS

- security-sentinel — (Not mandatory for basic CRUD; include if sensitive data or privilege escalations are introduced.)
- forgea-code-scout — Optional.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M2-<YYYY-MM-DD>.md` specifying models, endpoints, UI contracts, and invariants (published versions immutable).
- Step 2: Docs-Gatekeeper — Ensure documentation and registry updated. (sequential)
- Step 3: Implementer — Implement changes and artifacts. (sequential)
- Step 4: QA-Tester — Validate transitions, immutability, and list/filter correctness. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a shared data-model snippet for lesson metadata to ensure consistency across services.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Create `/docs/tasks/task-M2-<YYYY-MM-DD>.md` for EPIC-M Feature M2 (Lesson Management). Include data model schema for lessons, API endpoints (list, create metadata, edit metadata, link/unlink labs), UI contracts for admin lists and preview, and explicit invariants: published versions must be immutable and deprecation is non-destructive.

- Docs-Gatekeeper:

After the planner doc exists, validate internal docs and update registries accordingly, producing `/docs/docs-gatekeeper/EPIC-M/M2_Docs_Brief.md`.

- Implementer:

Implement only the approved task doc. Produce `/docs/manual-checks/task-M2-manual-checks.md` and `/docs/guides/task-M2-how-to.md`.

- QA-Tester:

Validate lifecycle behavior (Draft→Published→Deprecated), immutability of published versions, and proper filtering/search behavior in admin UI.

- Integration-Checker:

Verify end-to-end and decide APPROVE/BLOCK, confirming docs and manual-check artifacts exist.
