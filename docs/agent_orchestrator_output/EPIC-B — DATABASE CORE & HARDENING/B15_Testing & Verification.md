### FEATURE ANALYSIS

- Feature Type: testing / verification / QA
- Risk Level: Low→Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- forgea-code-scout — Identify areas that require verification and existing test harnesses
- planner-architect — Produce a task doc specifying verification goals and required test assets
- implementer — Produce required test plans as part of implementation tasks (per implementer contract)
- qa-tester — Execute verification design (spec-only for this agent) and create QA verification checklist
- documenter-historian — Record what was tested and what remains

### NOT REQUIRED AGENTS

- security-sentinel — Reason: include only if tests reveal security gaps
- integration-checker — Reason: runs after QA produces results and artifacts

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Code scout to map verification targets and existing tests.
- Step 2: Planner writes task doc binding verification scope, test types (unit, integration, manual SQL checks), and success criteria.
- Step 3: Implementer produces `/docs/tests/task-B15-tests.md` (mandatory) alongside any required test scaffolding.
- Step 4: QA produces detailed test checklist covering immutable triggers, retention, env-safety, and audit writes.
- Step 5: Integration checker approves end-to-end once QA artifacts exist.

### USER PROMPTS

- forgea-code-scout:
  "Task: FEATURE B15 — Testing & Verification
  Scan repo for existing test harnesses, DB test fixtures, and any scripts used to validate DB constraints or triggers. Provide file paths and any gaps. End with: 'Handoff complete. Provide this report verbatim to the next agent.'"

- planner-architect:
  "Produce `/docs/tasks/task-B15-<YYYY-MM-DD>.md` (DRAFT). Define verification goals, required test categories (SQL-trigger tests, API integration, concurrency/abuse tests), test data preconditions, and acceptance criteria."

- implementer:
  "On approved B15 task doc, produce `/docs/tests/task-B15-tests.md` with explicit test cases, preconditions, and expected outcomes. Note: Implementer must not claim verification."

- qa-tester:
  "Using `/docs/tests/task-B15-tests.md`, produce a QA checklist and identify any ambiguous or missing tests. Block and escalate on ambiguity."

- documenter-historian:
  "Record what was tested, what remains, and suggested follow-ups after verification artifacts are produced."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a shared test template in `/docs/tests/templates` to standardize test docs across EPICs.

### STOP CONDITION

Stop after prompts and task doc requests are generated; do not attempt verification without approved test docs and implementer artifacts.
