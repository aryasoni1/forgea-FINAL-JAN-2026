### FEATURE ANALYSIS

- Feature Type: code / UX
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define mapping from verification checks to lab steps, ordering rules, and invariants for sequential enforcement.
- implementer — Implement step-level verification state, persistence, and enforcement of out-of-order rejection.
- integration-checker — Validate that step-level APIs integrate with LabSession and Runner behavior.
- security-sentinel — Ensure step mapping cannot be abused to bypass verification ordering.

### NOT REQUIRED AGENTS

- qa-tester — Reason: Formal test plans deferred to H14.
- documenter-historian — Reason: Documentation produced after final mapping approved.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none

### EXECUTION PLAN

- Step 1: Planner-Architect specifies step-to-check mapping, ordering rules, and allowed transitions.
- Step 2: Security-Sentinel reviews mapping for abuse and race conditions.
- Step 3: Implementer implements step-level state, enforcement of sequential completion, and persistence.
- Step 4 (parallel): Integration-Checker verifies APIs interact correctly with LabSession and Runner.

(Parallel: Step 4 alongside late-stage implementation tests.)

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a short template for step-state transitions to ensure consistent implementations across labs.
