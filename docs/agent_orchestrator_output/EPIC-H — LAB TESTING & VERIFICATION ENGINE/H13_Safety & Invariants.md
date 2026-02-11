### FEATURE ANALYSIS

- Feature Type: policy / code
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify invariants: verification-before-preview, one active job per session, commit SHA as single source of truth, and retry/lock rules.
- implementer — Enforce invariants in code paths, add guards, and block preview flows until PASS.
- security-sentinel — Review invariants for bypass paths and privilege escalation risks.
- integration-checker — Validate invariants hold across services (LabSession, Runner, Verification API).

### NOT REQUIRED AGENTS

- qa-tester — Reason: Validation tests included in H14.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none

### EXECUTION PLAN

- Step 1: Planner-Architect lists explicit invariants and decision points where enforcement must occur.
- Step 2: Security-Sentinel audits for possible bypasses and suggests mitigation.
- Step 3: Implementer adds enforcement code and guards; Integration-Checker verifies cross-service enforcement.
- Step 4: Documenter-Historian records invariants and escalation paths for overrides.

(Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Add an invariants test harness template for Integration-Checker to exercise common invariant conditions.
