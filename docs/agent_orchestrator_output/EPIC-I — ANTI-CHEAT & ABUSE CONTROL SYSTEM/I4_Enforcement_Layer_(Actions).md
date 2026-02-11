### FEATURE ANALYSIS

- Feature Type: code / security / policy (enforcement & gating)
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify enforcement actions, user UX effects, and rollback policies.
- implementer — Implement enforcement mechanisms, gating checks, and preservation of attempts.
- security-sentinel — Evaluate enforcement for safety, irreversibility, and audit trails.
- qa-tester — Verify enforcement actions, UX gating, and that attempts are preserved post-enforcement.
- documenter-historian — Record policy choices and enforcement rationale.

### NOT REQUIRED AGENTS

- integration-checker — Not required as enforcement is internal to anti-cheat services.

### MISSING AGENT (ONLY IF NEEDED)

None.

### EXECUTION PLAN

- Step 1: Planner-Architect creates an approved task document that enumerates exact enforcement actions and required invariants (sequential).
- Step 2 (parallel): Security-Sentinel reviews irreversible enforcement paths and required audits.
- Step 3: Implementer implements enforcement and emits audit events (sequential after approval).
- Step 4: QA-Tester validates enforcement correctness and preserves attempt artifacts.
- Step 5: Documenter-Historian finalizes logs and update notes.

### ORCHESTRATOR IMPROVEMENT NOTES

- Require Planner to include an explicit `rollback` and `appeal` path for enforcement actions to reduce risk of irreversible mistakes.
