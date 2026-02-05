### FEATURE ANALYSIS

- Feature Type: infra
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- docs-gatekeeper — Confirm official, version-pinned documentation requirements for Turbo cache behavior or lint/build tooling if any.
- forgea-code-scout — Identify existing verification scripts, CI-like checks, or documentation about quality gates.
- planner-architect — Produce the authoritative task document for Feature A11.
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
You are the Docs Gatekeeper. Feature A11 is “Verification & Quality Gates” in EPIC-A. Check /docs/official-docs-registry.md first. Confirm whether any official, version-pinned documentation is required for Turbo caching guarantees, lint/build/test command behavior, or monorepo verification practices. If required and missing, request official links with explicit versions; otherwise approve. Provide your response in the required output format.

**forgea-code-scout**
Task: Feature A11 — Verification & Quality Gates (EPIC-A). Scan for existing verification scripts, CI configs, lint/build/test pipelines, and any docs on quality gates. Report what exists, partials, and missing. Use the required output format and stop as instructed.

**planner-architect**
Using the Docs Gatekeeper approval and Code Scout report, produce the task document for Feature A11 — Verification & Quality Gates (EPIC-A). Follow the required task document structure and place it in /docs/tasks/ with the correct naming. Do not write code.

**implementer**
Implement the approved task document for Feature A11 — Verification & Quality Gates (EPIC-A). Follow scope and invariants exactly. Create the mandatory test plan at /docs/tests/task-<ID>-tests.md. Do not run tests.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a “quality-gate auditor” agent to verify cache correctness and gating consistency.

### STOP CONDITION

Stop when the Implementer finishes and the required test plan is created; no further agents are required for this feature.
