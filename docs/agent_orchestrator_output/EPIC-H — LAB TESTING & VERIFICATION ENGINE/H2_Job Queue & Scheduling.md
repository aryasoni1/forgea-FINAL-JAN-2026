### FEATURE ANALYSIS

- Feature Type: code / integration
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define queuing semantics, FIFO per lab session, retry policy, and backpressure guarantees in a task doc.
- implementer — Implement queue service, persistence hooks, and enforcement of one active job per session.
- integration-checker — Verify interfaces with LabSession and Runner services; validate no parallel verification for same session.
- security-sentinel — Validate retry rules and abuse surfaces (retries only on infra failure).

### NOT REQUIRED AGENTS

- qa-tester — Reason: Integration test planning will be requested later under H14.
- documenter-historian — Reason: Implementation has higher priority; Planner should include doc tasks.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none
- Responsibility: n/a

### EXECUTION PLAN

- Step 1: Planner-Architect defines queue contract: FIFO per session, locking mechanism, backpressure strategy, and retry policy.
- Step 2: Security-Sentinel reviews contract for possible replay/DoS abuse.
- Step 3: Implementer builds queue + persistence + locking to prevent parallel verification of same session.
- Step 4 (parallel): Integration-Checker runs interface verification with LabSession and Runner mock endpoints while Implementer produces API hooks.
- Step 5: Planner/Implementer add migration/operational notes.

(Explicit parallel: Step 4 runs parallel to final implementation verification tasks.)

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a standard queue-contract template (locking semantics + backpressure) for Implementers to adopt.
- Add an Integration-Checker checklist row for verifying single-active-job invariants.
