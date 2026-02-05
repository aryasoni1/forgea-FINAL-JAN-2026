### FEATURE ANALYSIS

- Feature Type: infra
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- docs-gatekeeper — Confirm whether official, versioned docs are required for repository structure and git conventions.
- forgea-code-scout — Identify existing repo structure, README, .gitignore, and any current boundary rules.
- planner-architect — Produce the authoritative task document for Feature A1.
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
You are the Docs Gatekeeper. Feature A1 is “Repository & Structure” in EPIC-A. Check /docs/official-docs-registry.md first. Determine whether any official, versioned documentation is required for: Git repository initialization, .gitignore defaults, monorepo folder conventions, and “no cross-app imports” policy. If no official docs are required, state that explicitly in “Approved Docs.” If any are required or version-ambiguous, request official, version-pinned links. Provide your response in the required output format.

**forgea-code-scout**
Task: Feature A1 — Repository & Structure (EPIC-A). Scan the repo for existing: apps/, packages/, services/ folders; root README.md; .gitignore; any ownership or boundary rules; any enforcement of “no cross-app imports.” Report what exists, what’s partial, and what’s missing. Use the required output format and stop as instructed.

**planner-architect**
Using the Docs Gatekeeper approval and Code Scout report, produce the task document for Feature A1 — Repository & Structure (EPIC-A). Follow the required task document structure and place it in /docs/tasks/ with the correct naming. Do not write code.

**implementer**
Implement the approved task document for Feature A1 — Repository & Structure (EPIC-A). Follow scope and invariants exactly. Create the mandatory test plan at /docs/tests/task-<ID>-tests.md. Do not run tests.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a dedicated “tooling-config reviewer” agent to validate monorepo boundaries without requiring QA.

### STOP CONDITION

Stop when the Implementer finishes and the required test plan is created; no further agents are required for this feature.
