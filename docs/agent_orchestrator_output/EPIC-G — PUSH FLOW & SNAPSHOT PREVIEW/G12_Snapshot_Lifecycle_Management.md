### FEATURE ANALYSIS

- Feature Type: data lifecycle / policy
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define snapshot metadata schema, retention policy, and deletion safety rules.
- implementer — Implement snapshot metadata persistence, retention enforcement, and safe deletion procedures.
- integration-checker — Verify storage lifecycle APIs and scheduled job requirements for retention enforcement.
- security-sentinel — Ensure deletion audits are tamper-evident and handle orphaned-preview cleanup safely.
- documenter-historian — Document retention policy, deletion process, and audit fields.

### NOT REQUIRED AGENTS

- qa-tester — Optional; Planner may require QA for retention and deletion edge-case validation.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: planner-architect defines metadata schema, retention rules, and deletion safety (sequential)
- Step 2: implementer implements metadata storage, retention job, and safe deletion mechanism (sequential)
- Step 3: integration-checker validates storage lifecycle APIs and scheduled job infra (sequential)
- Step 4: security-sentinel reviews deletion auditability and orphan cleanup plan (sequential)
- Step 5: documenter-historian records lifecycle policy and operator steps (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a shared retention-policy utility across EPICs to centralize TTL configuration and reduce drift.
