### FEATURE ANALYSIS

- Feature Type: UX / Infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner/Architect — Define snapshot semantics for broken/fixed states and determinism requirements.
- Implementer — Implement snapshot capture/restore and preview generation that masks secrets/backend.
- QA/Tester — Validate snapshots reflect user changes and do not leak data.

### NOT REQUIRED AGENTS

- Security Sentinel — Consulted specifically on masking secrets if needed.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines snapshot behaviors and privacy constraints (sequential).
- Step 2: Implementer builds snapshot/preview mechanics and masking layers (sequential).
- Step 3: QA/Tester validates determinism and privacy (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define snapshot semantics for broken and fixed lab states, determinism guarantees, and rules to ensure previews cannot expose secrets or backend services."

- Implementer:
"Implement snapshot capture/restore for lab runs and a preview rendering that excludes secrets and backend endpoints. Provide minimal integration instructions."

- QA/Tester:
"Validate snapshots for determinism across runs and confirm previews do not contain secrets or remote backend information."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding an automated preview sanitizer that runs as part of snapshot generation.
