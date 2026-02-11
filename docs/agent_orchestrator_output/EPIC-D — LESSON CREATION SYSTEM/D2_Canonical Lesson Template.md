### FEATURE ANALYSIS

- Feature Type: code / schema
- Risk Level: High
- Touches HARD LOCK: No (SOFT LOCK declared for lesson schema v1)

### REQUIRED AGENTS

- planner-architect — Derive schema requirements, required vs optional fields, and invariants tied to docs.
- implementer — Implement the canonical JSON schema under `packages/lesson-schema/` and add schema validation tooling.
- qa-tester — Define validation tests and checks to exercise schema edge-cases and invariants.
- security-sentinel — Review schema for PII leakage, injection risks, and improper source attributions.
- documenter-historian — Record schema decisions, versioning rules, and release notes.
- docs-gatekeeper — Verify registry entries and official docs referenced by schema choices.

### NOT REQUIRED AGENTS

- integration-checker — Reason: Integration testing expected later post-implementation.
- forgea-code-scout — Reason: Useful but not strictly required for initial schema drafting.

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner defines canonical schema fields, enums, prerequisites structure, and lab linkage shape. (Sequential)
- Step 2: Implementer implements schema artifacts in `packages/lesson-schema/`, plus validation helpers and CI checks. (Sequential)
- Step 3: QA runs schema validation scenarios and reviews edge-cases, with Security running threat analysis. (Parallel: QA + Security)
- Step 4: Documenter records the schema v1, the fields editable by humans vs AI, and versioning policy. (Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Add an agent-level checklist template for schema changes to reduce ambiguity about REQUIRED artifacts (schema file, validation tests, manual-checks, guide).

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Produce a doc-anchored schema design brief for EPIC-D FEATURE H2 — Canonical Lesson Template. Inputs: `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`. Deliver: schema spec listing required/optional fields, difficulty enum, prerequisites structure, `lab_intents` linkage, fields flagged human-only vs AI-editable, validation invariants, and explicit locked decisions. Cite sources."

- implementer:

"Implement the approved Lesson JSON schema per planner spec under `packages/lesson-schema/lesson.v1.json`. Add CLI/Node validator, a JSON Schema draft version note, and CI lint/validate step. Produce `/docs/manual-checks/task-H2-manual-checks.md` and `/docs/guides/task-H2-how-to.md`."

- qa-tester:

"Design schema validation test cases for lesson schema v1: missing required fields, invalid enum values, malformed `lab_intents`, overly-large section contents, and concurrent versioning conflicts. Produce `/docs/tests/task-H2-tests.md` if QA is required."

- security-sentinel:

"Review the lesson schema for potential PII fields, unsafe HTML content, and provenance attribution requirements. Provide an Attack Surface and Required Fixes section."

- documenter-historian:

"Capture schema decisions, versioning plan, fields editable by humans vs AI, and a short decision log referencing planner and implementer artifacts."
