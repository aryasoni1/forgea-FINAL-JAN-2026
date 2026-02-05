### FEATURE ANALYSIS

- Feature Type: infra / security / admin
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- forgea-code-scout — Identify current env var usage and DATABASE_URL locations
- docs-gatekeeper — Verify any external secrets-management guidance referenced
- planner-architect — Produce task doc specifying environment separation and validation rules
- implementer — Implement env validation and secrets scoping changes
- security-sentinel — Review for credential exposure and access controls
- qa-tester — Validate environment separation and config validation
- documenter-historian — Capture deployment and ops notes

### NOT REQUIRED AGENTS

- integration-checker — Reason: run only after implementation & QA

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1 (parallel): Code scout and Docs gatekeeper gather environment facts and required official guidance. (parallel)
- Step 2: Planner writes task doc enforcing dev/prod separation, required access controls, and validation rules.
- Step 3: Security sentinel reviews plan.
- Step 4: Implementer makes changes (env validation, restricted prod credentials handling).
- Step 5: QA validates and Documenter records ops guidance.

### USER PROMPTS

- forgea-code-scout:
  "Task: FEATURE B13 — Environment Safety
  List all occurrences of `DATABASE_URL` and other DB credentials in the repo, CI, infra, and deployment configs. Identify any hardcoded secrets or ambiguous usage. End with: 'Handoff complete. Provide this report verbatim to the next agent.'"

- docs-gatekeeper:
  "Task: FEATURE B13 — Environment Safety
  Verify required official docs for secrets management/DB credential best practices are present in `/docs/official-docs-registry.md`. If missing, list links and version info required."

- planner-architect:
  "Produce `/docs/tasks/task-B13-<YYYY-MM-DD>.md` (DRAFT). Define separation requirements, what constitutes restricted prod credentials, validation rules for `DATABASE_URL`, and CI/CD handling."

- security-sentinel:
  "Review planner draft for credential exposure and access controls; provide mandatory mitigations before implementation."

- implementer:
  "On approved B13 task doc, implement env validation, update infra/CI references to use secrets stores, and document migration steps. Produce `/docs/tests/task-B13-tests.md`."

- qa-tester:
  "Validate environment separation, ensure prod credentials cannot be used in dev, and test env validation behavior when `DATABASE_URL` is missing/invalid."

- documenter-historian:
  "Document ops steps, required infra changes, and suggested branch/commit messages post-implementation."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a short checklist template for env-safety tasks to speed planning and QA.

### STOP CONDITION

Stop after agent prompts and plan are generated; do not change prod credentials without explicit approvals.
