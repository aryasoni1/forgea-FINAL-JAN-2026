### FEATURE ANALYSIS

- Feature Type: code / policy
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define deterministic exit-code to result mapping, ambiguity rules, and immutable final-state policy.
- implementer — Implement mapping logic in runner and verification service; enforce immutability of final job state.
- security-sentinel — Review mapping for attack vectors (exit-code spoofing, race conditions) and block ambiguous mappings.
- documenter-historian — Capture the mapping rules and rationale for audit and future reviewers.

### NOT REQUIRED AGENTS

- qa-tester — Reason: Formal test scenarios are scheduled under H14; this feature defines mapping and enforcement only.
- docs-gatekeeper — Reason: Advisory; Planner will reference official docs directly.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none

### EXECUTION PLAN

- Step 1: Planner-Architect author a ruleset: canonical exit codes, explicit PASS/FAIL/ERROR categories, and handling of non-standard exits.
- Step 2: Security-Sentinel reviews for spoofing/replay/race conditions; require mitigations if found.
- Step 3: Implementer implements the mapping, enforces immutability after finalization, and emits structured events for audit.
- Step 4: Documenter-Historian records the final, approved mapping and links to EPIC-H invariants.

(Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a canonical, numeric exit-code table template to reduce ambiguity across implementers.
- Consider an automated linter that validates new exit-code mappings against the canonical table.
