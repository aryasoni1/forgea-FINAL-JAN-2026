### FEATURE ANALYSIS

- Feature Type: code / security (hard constraints & invariants)
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Produce an approved task document listing hard constraints, enforcement boundaries, and forbidden file lists.
- implementer — Implement enforcement of sequential step completion, allowed file scopes, and job uniqueness.
- security-sentinel — Review hard constraints for bypass risks and DB-level enforcement.
- qa-tester — Validate DB constraints, API guards, and race-condition protections.
- documenter-historian — Record locked constraints and future change process.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Advisory only; not required for initial execution.

### MISSING AGENT (ONLY IF NEEDED)

None.

### EXECUTION PLAN

- Step 1: Planner-Architect writes an approved task document naming exact hard constraints and DB invariants (sequential).
- Step 2 (parallel): Security-Sentinel reviews for bypass and race conditions.
- Step 3: Implementer implements DB constraints and enforcement logic (sequential after approval).
- Step 4: QA-Tester validates invariants, concurrent execution, and failure modes.
- Step 5: Documenter-Historian captures final decisions and locking policy notes.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a mandatory `DB-schema-review` checkpoint to ensure hard constraints are expressed at the storage layer.
