### FEATURE ANALYSIS

- Feature Type: UX / Design (Optional)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner/Architect — Define step structure, order, dependencies, and file-path mappings.
- Implementer — Implement enforcement to prevent edits to future-step files.
- QA/Tester — Validate deterministic step progression and completion checks.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required unless steps introduce riskier failure surfaces.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines step model, allowed edits per step, and progression rules (sequential).
- Step 2: Implementer adds guardrails to enforce step order and prevent future-step edits (sequential).
- Step 3: QA/Tester verifies deterministic completion and prevents bypass (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define a step model for labs: step metadata, ordering rules, file-path binding per step, and constraints to prevent editing future steps. Provide examples for a 3-step lab."

- Implementer:
"Implement enforcement mechanisms (CI/linter/pre-commit) that block edits to files pledged to future steps and provide migration instructions for step changes."

- QA/Tester:
"Create tests demonstrating step progression, prevention of future-step edits, and deterministic step completion detection."

### ORCHESTRATOR IMPROVEMENT NOTES

- Make step enforcement configurable per-lab; avoid hard-coding to allow optional feature opt-in.
