### FEATURE ANALYSIS

- Feature Type: Documentation / Schema
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- Planner/Architect — Draft canonical lab schema v1 and required fields.
- Documenter/Historian — Produce machine-readable schema and human docs.
- Security Sentinel — Review schema fields for secrets or unsafe patterns.
- QA/Tester — Validate determinism and validation tooling.

### NOT REQUIRED AGENTS

- Integration Checker — Not required for schema authoring; required when schema used in systems.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect drafts the canonical schema and field definitions (sequential).
- Step 2: Documenter generates JSON Schema + human docs; Security Sentinel reviews (parallel).
- Step 3: QA/Tester creates validation tests and schema validator integration (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define a canonical Lab schema v1. Include required fields (id, version, difficulty, estimated_time, primary_concept, failure_type, success_criteria, allowed_paths, forbidden_paths), types, constraints, and rationale for each field. Ensure the schema supports deterministic verification and versioning."

- Documenter/Historian:
"Produce JSON Schema and a short human-readable spec from the planner draft. Include example valid and invalid lab definitions."

- Security Sentinel:
"Review the proposed schema for fields that could allow secrets, executable injection, or tests/config modification. Recommend forbidden fields and validations."

- QA/Tester:
"Implement a small harness that validates sample lab definitions against the schema and demonstrates rejection of invalid fields."

### ORCHESTRATOR IMPROVEMENT NOTES

- Since this touches HARD LOCK, require an approval gate and audit trail before committing schema v1.
- Consider adding a schema versioning policy and migration guide.
