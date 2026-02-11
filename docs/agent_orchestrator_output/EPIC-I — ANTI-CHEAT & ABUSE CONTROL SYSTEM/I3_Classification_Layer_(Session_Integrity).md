### FEATURE ANALYSIS

- Feature Type: code / security (state machine & persistence)
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define integrity state model, transition rules, and audit requirements.
- implementer — Implement state machine, persistence, and immutability guarantees.
- security-sentinel — Review state transitions, immutability, and audit tamper resistance.
- qa-tester — Verify state transitions, escalation rules, and downgrade protections.
- documenter-historian — Record locked decisions and mapping of signals → states.

### NOT REQUIRED AGENTS

- forgea-code-scout — Not required for orchestration; code scouting can be requested later.

### MISSING AGENT (ONLY IF NEEDED)

None.

### EXECUTION PLAN

- Step 1: Planner-Architect prepares an approved task doc with explicit state machine and persistence invariants (sequential).
- Step 2 (parallel): Security-Sentinel reviews for immutability and audit requirements.
- Step 3: Implementer implements classification logic and durable state storage (sequential after approval).
- Step 4: QA-Tester validates transitions, downgrade protections, and audit logs.
- Step 5: Documenter-Historian records decision log and notes required follow-ups.

### ORCHESTRATOR IMPROVEMENT NOTES

- Introduce an agent role or checklist specifically for `audit-immutability` verification to reduce repeated security reviews.
