### FEATURE ANALYSIS

- Feature Type: code
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- docs-gatekeeper — Confirm official guidance for storing third-party account mappings and privacy considerations.
- forgea-code-scout — Locate any `GitHubAccount` or `GitHubRepoMapping` models or related code.
- planner-architect — Produce the authoritative task document for Feature B8.
- implementer — Implement the approved task document and create the required test plan.

### NOT REQUIRED AGENTS

- qa-tester — No execution verification requested at this stage.
- security-sentinel — Security review deferred until mapping use-cases are implemented.
- integration-checker — No end-to-end integration changes yet.
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
You are the Docs Gatekeeper. Feature B8 is “GitHub Mapping Tables” in EPIC-B. Check /docs/official-docs-registry.md first. Confirm any official guidance for storing external account IDs, handling PII, and linking external repos to internal sessions. If missing, request official links with explicit versions; otherwise approve. Provide your response in the required output format.

**forgea-code-scout**
Task: Feature B8 — GitHub Mapping Tables (EPIC-B). Scan the repo for any `GitHubAccount`, `GitHubRepoMapping`, or related models, migrations, or service code. Report what exists, partials, and missing. Use the required output format and stop as instructed.

**planner-architect**
Using the Docs Gatekeeper approval and Code Scout report, produce the task document for Feature B8 — GitHub Mapping Tables (EPIC-B). Follow the required task document structure and place it in /docs/tasks/ with the correct naming. Do not write code.

**implementer**
Implement the approved task document for Feature B8 — GitHub Mapping Tables (EPIC-B). Follow scope and invariants exactly. Create the mandatory test plan at /docs/tests/task-<ID>-tests.md. Do not run tests.

### STOP CONDITION

Stop when the Implementer finishes and the required test plan is created; no further agents are required for this feature.
