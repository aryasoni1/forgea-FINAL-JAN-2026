### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define preview request contract, gating rules by verification status, and expiry handling.
- forgea-code-scout — Find existing preview generation endpoints, presigned URL flows, and access controls.
- docs-gatekeeper — Verify docs for preview generation, access, and expiry semantics.
- implementer — Implement approved task and create required artifacts.
- qa-tester — Validate preview gating, expiry, and error handling.
- integration-checker — End-to-end verification of preview request → access flow.
- documenter-historian — Record decisions and recommended docs updates.

### NOT REQUIRED AGENTS

- security-sentinel — Only required if previews expose sensitive data; include if docs/Code Scout flag sensitive content.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` gather facts and doc coverage. (parallel)
- Step 2: `planner-architect` writes task doc specifying preview URL semantics, gating by verification, and expiry handling.
- Step 3: After approval, `implementer` implements preview request/response flows and manuals/guides.
- Step 4 (parallel): `qa-tester` validates gating and expiry; `integration-checker` performs final checks. (parallel)
- Step 5: `documenter-historian` records decisions and registry updates.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
  Produce `/docs/tasks/task-L6-<YYYY-MM-DD>.md` for FEATURE L6 (Snapshot Preview Integration). Define request contract, verification gating, expiry semantics, and failure modes. Cite EPIC-L and this Orchestrator output. Stop and request user approval when complete.

- forgea-code-scout:
  Locate preview generation endpoints, presigned URL code, and any access-control checks across `apps/**` and `services/**`. Produce `/docs/code-scout/EPIC-L/L6_Snapshot Preview Integration.md` with factual findings.

- docs-gatekeeper:
  Verify internal docs cover preview generation, verification gating, and expiry policies; produce the docs brief and update registries as required.

- implementer:
  Implement only after Planner approval and create `/docs/manual-checks/task-L6-manual-checks.md` and `/docs/guides/task-L6-how-to.md`.

- qa-tester:
  Validate preview gating by verification status, expiry handling, and missing/expired previews scenarios.

- integration-checker:
  Verify end-to-end preview request → verification gating → access and return APPROVE/BLOCK.

- documenter-historian:
  Record decisions, suggested branch names, and docs to update after final approval.
