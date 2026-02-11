### FEATURE ANALYSIS

- Feature Type: code / policy enforcement
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define branch-allowlist, protected-branch rules, and force-push detection semantics.
- implementer — Implement detection, rejection, and audit logging for history rewrite attempts.
- security-sentinel — Review rejection logic to ensure no bypass and that logging does not leak PII.

### NOT REQUIRED AGENTS

- qa-tester — Optional unless Planner documents complex history-rewrite invariants requiring formal tests.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: planner-architect defines policy and exact rejection codes (sequential)
- Step 2: security-sentinel reviews policy for bypass scenarios (sequential)
- Step 3: implementer implements detection and audit logging (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest standardized rejection reason codes across EPIC-G to simplify cross-feature auditing.
