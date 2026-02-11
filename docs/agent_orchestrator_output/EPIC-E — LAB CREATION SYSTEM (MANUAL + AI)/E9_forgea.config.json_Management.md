### FEATURE ANALYSIS

- Feature Type: Config Management / Policy
- Risk Level: Medium
- Touches HARD LOCK: Yes (forgea.config.json lock-after-publish)

### REQUIRED AGENTS

- Planner/Architect — Define required `forgea.config.json` fields, validation rules, and lock semantics.
- Implementer — Implement generation, validation, and enforcement (reject execution on mismatch).
- QA/Tester — Test validation and lock behavior across publish flows.
- Documenter/Historian — Explain config fields and publish locking policy.

### NOT REQUIRED AGENTS

- Security Sentinel — Only if configs enable privileged ops.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect specifies the `forgea.config.json` schema, validation checks, and lock lifecycle (sequential).
- Step 2: Implementer implements generation and validation; enforce lock post-publish (sequential).
- Step 3: QA/Tester validates enforcement and rejection on mismatch (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define `forgea.config.json` schema for labs, which fields are required, validation rules before activation, and lock semantics after publish."

- Implementer:
"Implement config generation and pre-activation validation. Ensure runtime rejects lab execution when config mismatches or when published and locked."

- QA/Tester:
"Create tests that demonstrate validation failures, successful activation, and lock enforcement post-publish."

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend embedding a machine-readable signature in locked configs to simplify verification and prevent tampering.
