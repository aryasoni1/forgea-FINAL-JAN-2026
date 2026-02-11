### FEATURE ANALYSIS

- Feature Type: Design / Security
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner/Architect — Define allowed/forbidden failure types and mapping to symptoms.
- Security Sentinel — Ensure failures cannot leak secrets or create unsafe states.
- QA/Tester — Create deterministic reproduction steps and validation harness.

### NOT REQUIRED AGENTS

- Documenter/Historian — Not required in first pass; add documentation after patterns are stable.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines allowed failure types, forbidden types, mapping to symptoms, and constraints to ensure determinism (sequential).
- Step 2: Security Sentinel reviews failure designs to prevent unsafe or multi-root-cause failures (sequential).
- Step 3: QA/Tester implements reproducible harness and verifies failure observability (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Produce a concise specification of allowed failure types (e.g., config misconfiguration, logic bug, missing dependency), forbidden failure types (e.g., data loss, secrets exposure), mapping from failure type to observable symptoms, and rules to ensure deterministic single-root-cause reproduction."

- Security Sentinel:
"Review the failure specification and flag any failure types that could expose secrets, create persistence side-effects, or require unsafe test fixtures."

- QA/Tester:
"Create reproducible test cases that deterministically reproduce each allowed failure type and demonstrate that forbidden failure types are not produced by the harness."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a checklist to reject multi-root-cause designs and to require a single clearly observable symptom per lab.
