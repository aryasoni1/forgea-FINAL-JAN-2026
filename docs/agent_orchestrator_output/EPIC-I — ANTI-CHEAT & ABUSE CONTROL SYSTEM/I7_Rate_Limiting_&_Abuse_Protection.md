### FEATURE ANALYSIS

- Feature Type: infra / security (rate limiting & throttling)
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define rate limits, cooldown policies, and throttling boundaries.
- implementer — Implement throttles at service and job-creation boundaries, and snapshot preview limits.
- security-sentinel — Review for bypass and DoS amplification risks.
- qa-tester — Validate throttling behavior under load and edge cases.
- documenter-historian — Record policies and thresholds.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Advisory only.

### MISSING AGENT (ONLY IF NEEDED)

None.

### EXECUTION PLAN

- Step 1: Planner-Architect writes an approved task doc with specific rate-limit values and cooldown rules (sequential).
- Step 2 (parallel): Security-Sentinel reviews for abuse amplification.
- Step 3: Implementer implements throttling and cooldowns (sequential after approval).
- Step 4: QA-Tester validates behavior under simulated load.
- Step 5: Documenter-Historian finalizes notes.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend adding a `rate-limit-simulation` requirement to Planner templates to ensure QA can reproduce load scenarios.
