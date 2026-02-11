### FEATURE ANALYSIS

- Feature Type: Operational Controls / Safety Mechanisms
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify allowed admin controls (abort, lock read-only, extend time, throttle attempts, reset snapshot preview), preconditions, and audit requirements.
- security-sentinel — Ensure controls cannot be abused to alter truth (no marking PASSED, no code mutation) and verify fail-closed behavior.
- implementer — Implement controls with enforced invariants and audit logging.
- qa-tester — Validate that controls behave as scoped, cannot mutate user artifacts, and are auditable.
- documenter-historian — Produce admin usage and required manual-check artifacts.

### NOT REQUIRED AGENTS

- integration-checker — Not required unless controls interact with external services far beyond session orchestration.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner defines exact behavior, preconditions, and forbidden actions for each control.
- Step 2: Security Sentinel reviews for abuse or privilege escalation. (Sequential)
- Step 3: Implementer implements controls and audit logging. (Sequential)
- Step 4: QA validates control scope, race-condition safety, and audit trails. (Sequential)
- Step 5: Documenter creates admin guides and manual checks. (Can run in parallel with QA)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Create a task doc for O7 — Admin Session Controls. For each control (abort, lock read-only, extend time, throttle verification attempts, reset snapshot preview), specify API, preconditions, required audit fields, and explicit prohibitions (no PASS marking, no code injection)."

- security-sentinel:
"Review Planner's O7 document for any path that could mutate user code, mark results, or bypass audits. Provide mitigations or block."

- implementer:
"Implement O7 exactly per the approved task doc and produce `/docs/manual-checks/task-O7-manual-checks.md` and `/docs/guides/task-O7-how-to.md`."

- qa-tester:
"Validate O7: ensure controls cannot change session truth, are race-safe, and are fully auditable."

### ORCHESTRATOR IMPROVEMENT NOTES

- Require Planner to include explicit error messages and rollback semantics for each control to aid implementer and QA.
