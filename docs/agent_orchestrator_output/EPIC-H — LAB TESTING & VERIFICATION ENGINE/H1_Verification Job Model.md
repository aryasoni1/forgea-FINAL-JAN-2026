### FEATURE ANALYSIS

- Feature Type: code
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Produce an authoritative, docs-linked task document defining the schema, invariants, and decisions.
- implementer — Implement DB schema + migration and produce required deliverables per implementer contract.
- security-sentinel — Review invariants and data immutability from an attacker perspective (truth engine hard-lock).
- documenter-historian — Record design decisions and update official docs.

### NOT REQUIRED AGENTS

- qa-tester — Reason: Schema definition task itself does not require QA test plans at this stage; tests are part of later feature H14.
- docs-gatekeeper — Reason: Advisory only; Planner will consult docs registry instead.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none
- Responsibility: n/a
- Why existing agents are insufficient: n/a

### EXECUTION PLAN

- Step 1: Planner-Architect drafts task document referencing `/docs/official-docs-registry.md`, EPIC-H, and required invariants (one job per commit SHA, immutable results).
- Step 2: Security-Sentinel reviews the planned schema for abuse/race conditions and blocks if unresolved security risks remain.
- Step 3: Implementer produces schema migration, model code, and migration plan; stop if Planner/Docs constraints missing.
- Step 4: Documenter-Historian publishes design notes and updates official docs.

(Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a small agent checklist template for HARD-LOCK features to standardize security gating.
- Consider a schema-stub generator agent to reduce friction between Planner and Implementer.
