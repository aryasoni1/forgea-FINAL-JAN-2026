### FEATURE ANALYSIS

- Feature Type: infra
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- docs-gatekeeper — Verify official, version-pinned TypeScript documentation for tsconfig options.
- forgea-code-scout — Identify existing tsconfig.base.json and per-app tsconfig usage.
- planner-architect — Produce the authoritative task document for Feature A4.
- implementer — Implement the approved task document and create the required test plan.

### NOT REQUIRED AGENTS

- qa-tester — No execution verification requested at this stage.
- security-sentinel — No security-sensitive logic or threat surface change.
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
You are the Docs Gatekeeper. Feature A4 is “TypeScript Base Configuration” in EPIC-A. Check /docs/official-docs-registry.md first. You must confirm official, version-pinned TypeScript documentation covering: tsconfig base settings, strict options, target ES2022, and module resolution. If missing, request official links with explicit versions; otherwise approve. Provide your response in the required output format.

**forgea-code-scout**
Task: Feature A4 — TypeScript Base Configuration (EPIC-A). Scan for existing tsconfig.base.json, root tsconfig, and per-app tsconfig.json files that extend base. Report what exists, partials, and missing. Use the required output format and stop as instructed.

**planner-architect**
Using the Docs Gatekeeper approval and Code Scout report, produce the task document for Feature A4 — TypeScript Base Configuration (EPIC-A). Follow the required task document structure and place it in /docs/tasks/ with the correct naming. Do not write code.

**implementer**
Implement the approved task document for Feature A4 — TypeScript Base Configuration (EPIC-A). Follow scope and invariants exactly. Create the mandatory test plan at /docs/tests/task-<ID>-tests.md. Do not run tests.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a shared “tsconfig reviewer” checklist for base config changes.

### STOP CONDITION

Stop when the Implementer finishes and the required test plan is created; no further agents are required for this feature.
