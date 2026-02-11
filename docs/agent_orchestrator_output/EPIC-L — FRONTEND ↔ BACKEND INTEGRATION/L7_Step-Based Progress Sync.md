### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify step progress model, authoritative backend-only updates, and UI rendering rules.
- forgea-code-scout — Identify current step progress APIs, models, and UI bindings.
- docs-gatekeeper — Verify docs for progress model and invariants.
- implementer — Implement approved task exactly and produce guides/manual-checks.
- qa-tester — Validate that frontend renders backend step state and rejects frontend-driven completion.
- integration-checker — End-to-end verification across views and state transitions.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- security-sentinel — Optional; engage if step transitions involve privilege changes.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` collect repository facts and doc coverage. (parallel)
- Step 2: `planner-architect` writes task doc defining backend-only progression rules, rendering contracts, and reset behavior.
- Step 3: After approval, `implementer` implements per task doc and creates `/docs/manual-checks/task-L7-manual-checks.md` and `/docs/guides/task-L7-how-to.md`.
- Step 4 (parallel): `qa-tester` and `integration-checker` validate invariants and end-to-end flows. (parallel)
- Step 5: `documenter-historian` records outcomes and suggests registry updates.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
  Produce `/docs/tasks/task-L7-<YYYY-MM-DD>.md` for FEATURE L7. Define progress model, backend-only update rules, cache invalidation, and UI rendering semantics. Reference EPIC-L and this Orchestrator output. Stop and request user approval when done.

- forgea-code-scout:
  Inspect `apps/**` and `services/**` for existing step progress storage, APIs, and UI components. Produce `/docs/code-scout/EPIC-L/L7_Step-Based Progress Sync.md` with factual findings.

- docs-gatekeeper:
  Verify internal docs cover progress model invariants and update registries if needed.

- implementer:
  Implement exactly as specified after Planner approval and produce mandatory artifacts.

- qa-tester:
  Validate that frontend cannot mark steps complete without backend confirmation and that UI updates only after verification.

- integration-checker:
  Verify end-to-end consistency of step progress across views and return APPROVE/BLOCK.

- documenter-historian:
  Record decisions and docs to update post-approval.
