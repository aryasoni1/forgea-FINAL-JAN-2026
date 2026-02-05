### FEATURE ANALYSIS

- Feature Type: code
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- docs-gatekeeper — Verify official, version-pinned Prisma schema and PostgreSQL constraint documentation as needed.
- forgea-code-scout — Identify existing user/auth tables or schema definitions.
- planner-architect — Produce the authoritative task document for Feature B3.
- implementer — Implement the approved task document and create the required test plan.

### NOT REQUIRED AGENTS

- qa-tester — No execution verification requested at this stage.
- security-sentinel — Security review deferred until auth flows are implemented.
- integration-checker — No end-to-end integration changes.
- documenter-historian — Post-implementation documentation not requested yet.

### MISSING AGENT (ONLY IF NEEDED)

- Name: N/A
- Responsibility: N/A
- Why existing agents are insufficient: N/A

### EXECUTION PLAN

- Step 1 (Parallel): docs-gatekeeper + forgea-code-scout
- Step 2: planner-architect (uses gatekeeper + scout outputs)
- Step 3: User approval of the task document
- Step 4: implementer (executes approved task + writes test plan)

### USER PROMPTS

**docs-gatekeeper**
You are the Docs Gatekeeper. Feature B3 is “Identity & Authentication Tables” in EPIC-B. Check /docs/official-docs-registry.md first. Confirm official, version-pinned Prisma schema documentation and PostgreSQL constraint docs for enums, unique constraints, and foreign keys. If missing, request official links with explicit versions; otherwise approve. Provide your response in the required output format.

**forgea-code-scout**
Task: Feature B3 — Identity & Authentication Tables (EPIC-B). Scan for existing Prisma models/tables for User, AuthSession, AuthIdentity, enums, or related constraints. Report what exists, partials, and missing. Use the required output format and stop as instructed.

**planner-architect**
Using the Docs Gatekeeper approval and Code Scout report, produce the task document for Feature B3 — Identity & Authentication Tables (EPIC-B). Follow the required task document structure and place it in /docs/tasks/ with the correct naming. Do not write code.

**implementer**
Implement the approved task document for Feature B3 — Identity & Authentication Tables (EPIC-B). Follow scope and invariants exactly. Create the mandatory test plan at /docs/tests/task-<ID>-tests.md. Do not run tests.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a schema-consistency reviewer for auth tables and uniqueness constraints.

### STOP CONDITION

Stop when the Implementer finishes and the required test plan is created; no further agents are required for this feature.
