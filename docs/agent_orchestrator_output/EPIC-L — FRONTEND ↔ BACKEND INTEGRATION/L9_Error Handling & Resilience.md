### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: Medium-High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define standard backend error response formats, retry semantics, and fail-closed behavior.
- forgea-code-scout — Enumerate current error handling patterns across APIs and frontend error surfaces.
- docs-gatekeeper — Verify that error-handling docs exist and are pinned to specific API contracts.
- implementer — Implement approved error-handling contracts and produce manuals/guides.
- qa-tester — Validate retry behavior, transient failure retries, and fail-closed cases.
- security-sentinel — Review ambiguous backend responses for information leakage or unsafe fallthroughs.
- integration-checker — Verify end-to-end resilience and failure semantics.
- documenter-historian — Record decisions and docs to update.

### NOT REQUIRED AGENTS

- None; most agents listed are necessary.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1 (parallel): `forgea-code-scout` and `docs-gatekeeper` gather factual patterns and doc coverage. (parallel)
- Step 2: `planner-architect` writes task doc defining canonical error response shapes, retry/backoff rules, and fail-closed expectations.
- Step 3: After approval, `implementer` implements the behavior and creates `/docs/manual-checks/task-L9-manual-checks.md` and `/docs/guides/task-L9-how-to.md`.
- Step 4 (parallel): `security-sentinel` and `qa-tester` validate behavior under adversarial and failure scenarios. (parallel)
- Step 5: `integration-checker` performs final verification; `documenter-historian` records outcomes.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
  Produce `/docs/tasks/task-L9-<YYYY-MM-DD>.md` defining canonical backend error responses, retry/backoff strategies, transient vs non-retryable errors, and fail-closed behaviors. Reference EPIC-L and this Orchestrator file. Stop and request user approval when complete.

- forgea-code-scout:
  Inspect `services/**` and `apps/**` for existing error shapes, HTTP codes, and retry logic. Produce `/docs/code-scout/EPIC-L/L9_Error Handling & Resilience.md` with factual findings.

- docs-gatekeeper:
  Confirm internal docs cover error shapes and retry semantics; update registries if missing.

- implementer:
  Implement exactly as specified and produce mandatory artifacts after Planner approval.

- qa-tester:
  Validate retries, backoff behavior, and fail-closed responses; include abuse cases and ambiguous-response handling.

- security-sentinel:
  Review ambiguous error responses for information leakage and recommend safe failing behavior.

- integration-checker:
  Verify end-to-end resilience and return APPROVE/BLOCK.

- documenter-historian:
  Record decisions, branch suggestions, and docs to update after final approval.
