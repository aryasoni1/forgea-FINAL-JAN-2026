### FEATURE ANALYSIS

- Feature Type: code / UX / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define `.forgea/steps.json` schema and mapping rules from changed files to active steps.
- Implementer — Load step definitions, map changed files to steps, block progress on incorrect modifications, and mark step completion on valid pushes.
- QA / Tester — Validate step mapping heuristics and progression/rollback behavior.
- Integration Checker — Run end-to-end flows to ensure steps persist and progress is recorded.
- Documenter — Document step schema and authoring guidelines.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required unless steps include sensitive data.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Specify `.forgea/steps.json` schema, mapping rules between files and steps, and rules for blocking progress.
- Step 2: Implementer — Implement loader and mapper that identifies which step a push targets, validate changes, and persist step completion state.
- Step 3: QA / Tester — Test correct and incorrect-step pushes, ensure blocking behavior works and completions are idempotent.
- Step 4: Integration Checker — Validate in staging using real pushes and sample step definitions.
- Step 5: Documenter — Publish authoring guidelines for `.forgea/steps.json` and examples.

### AGENT PROMPTS

- Planner:
  "Define the `steps.json` schema: how steps reference files (globs), step ordering, and rules for when a push unlocks the next step. Specify blocking criteria for out-of-order changes."

- Implementer:
  "Implement loading of `.forgea/steps.json`, map changed files to the current active step, block progress if changes don't match the active step, and mark steps completed when valid. Persist completion state per LabSession."

- QA / Tester:
  "Test step-based flows including correct-step pushes, out-of-order modifications, and repeated completions. Verify state persistence and idempotency."

- Integration Checker:
  "Run end-to-end scenarios in staging to validate step mapping, blocking, and state persistence across pushes."

- Documenter:
  "Document `steps.json` schema, how to author steps, examples, and troubleshooting steps for blocked progress."

### ORCHESTRATOR IMPROVEMENT NOTES

- Create a reusable Step Engine agent for other interactive lab systems to standardize step mapping and state persistence.
