### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define which backend audit events must be surfaced read-only to the UI, correlation IDs, and logging expectations.
- forgea-code-scout — Locate existing audit logs, request IDs propagation, and observability hooks.
- docs-gatekeeper — Verify documentation coverage for audit and observability requirements and retention policies.
- implementer — Implement read-only surfaces and correlation propagation as specified.
- qa-tester — Validate correlation between frontend actions and backend request IDs, and audit visibility.
- security-sentinel — Review for sensitive data exposure in audit surfaces.
- integration-checker — Verify end-to-end observability and audit surfacing.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- None; the listed agents cover required responsibilities.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` collect facts about existing audit logs and doc coverage. (parallel)
- Step 2: `planner-architect` writes task doc specifying audit events to surface, correlation ID propagation, and retention/visibility constraints.
- Step 3: After approval, `implementer` implements read-only UI surfaces, logging propagation, and manuals/guides.
- Step 4 (parallel): `security-sentinel` and `qa-tester` validate for sensitive data leakage and correlation correctness. (parallel)
- Step 5: `integration-checker` performs final verification and `documenter-historian` records outputs.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
  Produce `/docs/tasks/task-L10-<YYYY-MM-DD>.md` for FEATURE L10 defining audit events to surface, correlation ID requirements, retention constraints, and visibility rules. Reference EPIC-L and this Orchestrator output. Stop and request user approval when complete.

- forgea-code-scout:
  Inspect `services/**` and `apps/**` for logging, request ID propagation, and existing audit events. Produce `/docs/code-scout/EPIC-L/L10_Audit & Observability Hooks.md` with factual findings.

- docs-gatekeeper:
  Verify whether internal docs cover audit retention, sensitive data redaction, and observability patterns; update registries as required.

- implementer:
  Implement exactly per Planner approval and produce `/docs/manual-checks/task-L10-manual-checks.md` and `/docs/guides/task-L10-how-to.md`.

- qa-tester:
  Validate correlation IDs surfaced in UI, audit visibility, and ensure read-only behavior for audit events.

- security-sentinel:
  Review audit surfaces for sensitive data leakage and recommend redaction if needed.

- integration-checker:
  Verify end-to-end observability and return APPROVE/BLOCK.

- documenter-historian:
  Record decisions, branch suggestions, and docs to update after final approval.
