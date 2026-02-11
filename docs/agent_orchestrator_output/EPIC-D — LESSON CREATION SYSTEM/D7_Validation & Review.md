### FEATURE ANALYSIS

- Feature Type: process / QA
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define validation rules, automated quality checks, missing-section detection, partial regeneration policy, and human review gates.
- qa-tester — Implement and author the automated quality checks and tests for missing/weak sections.
- implementer — Integrate validation steps into generation pipeline and expose partial regeneration endpoints.
- documenter-historian — Log review decisions and finalization steps.
- security-sentinel — Ensure validation prevents unsafe or disallowed content from being approved.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Reason: Documentation verification already handled earlier; gatekeeper only required if new external docs referenced.

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner defines validation and review rules, QA coverage requirements, and acceptance criteria for LOCKED state. (Sequential)
- Step 2: QA authors automated quality checks and heuristics for detecting weak or missing sections. (Sequential)
- Step 3: Implementer integrates checks into pipeline and exposes partial regeneration APIs. (Sequential)
- Step 4: Security reviews checking for bypass paths; Documenter records review SOP. (Parallel)

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest a short checklist template for human reviewers to standardize LOCK decisions.

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Define validation and review requirements for EPIC-D FEATURE H7. Produce acceptance criteria for LOCKED lessons, rules for partial regeneration, and required QA coverage."

- qa-tester:

"Create automated quality checks for lesson content: completeness, sourcing, difficulty alignment, lab linkage presence, and length constraints. Provide test cases and expected detection heuristics."

- implementer:

"Integrate validation checks into the generation pipeline; implement partial-section regeneration APIs and the review-state transition endpoints. Provide manual-checks and how-to docs."

- security-sentinel:

"Review validation for bypass risks (direct DB writes, malformed payloads) and recommend controls."

- documenter-historian:

"Produce review SOP and decision log template for human reviewers."
