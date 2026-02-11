### FEATURE ANALYSIS

- Feature Type: Versioning / Governance
- Risk Level: Medium
- Touches HARD LOCK: Yes (published lab immutability)

### REQUIRED AGENTS

- Planner/Architect — Define versioning policy, publish workflow, and immutability guarantees.
- Implementer — Implement publish action that assigns version and freezes definitions.
- QA/Tester — Validate immutability, duplication for new versions, and preservation of old attempts.
- Documenter/Historian — Document versioning and migration rules.

### NOT REQUIRED AGENTS

- Security Sentinel — Not directly required unless immutability mechanism impacts secrets.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines versioning semantics, publish flow, and duplication-only updates (sequential).
- Step 2: Implementer implements publish/lock mechanics and storage of lab attempts (sequential).
- Step 3: QA/Tester verifies immutability and version creation workflow (sequential).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define the lab versioning policy: how versions are assigned, rules for freezing published labs, allowed operations post-publish, and duplication workflow for new versions."

- Implementer:
"Implement the publish endpoint/command that assigns a version, freezes the lab definition, and blocks mutations; allow new versions only via duplication."

- QA/Tester:
"Test that published labs cannot be mutated, that new versions require duplication, and that old attempts remain intact and addressable."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add an audit log and immutability proofs (signatures) for published lab definitions to aid later forensic or compliance work.
