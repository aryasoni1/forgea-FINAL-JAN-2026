### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D7 — Validation & Review
- Source: docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md

### TASKS CHECKED

- From EPIC-D master tasks (feature D7):
  - 39. Validate lesson against schema
  - 40. Run automated quality checks
  - 41. Detect missing or weak sections
  - 42. Support partial regeneration of sections
  - 43. Human review and approval
  - 44. Lock approved lesson versions

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md — Orchestrator feature payload including:
  - Feature analysis (process / QA, medium risk)
  - Required agents list (planner-architect, qa-tester, implementer, documenter-historian, security-sentinel)
  - Execution plan (planner → QA → implementer → security+documenter)
  - Copy-paste prompts for each required agent
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC-D master task list containing D7 task items (39–44).

### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level process and agent responsibilities are documented; the feature execution plan and agent prompts exist in the orchestrator file.

### WHAT IS MISSING

- Planner/architect deliverable that locks validation rules, acceptance criteria for LOCKED lessons, partial regeneration policy, and required QA coverage (not found).
- Implementation artifacts integrating automated quality checks into the generation pipeline (CI jobs, test code, validation services) — not found.
- Partial regeneration endpoints or API contracts for section-level regeneration — not found.
- Human reviewer checklist template and review SOP (or documenter outputs) — not found.
- Security review outputs assessing bypass risks for approval gates (security-sentinel artifacts) — not found.

### RISKS OR CONFLICTS

- Without a locked planner spec, QA and implementers may implement inconsistent validation checks, risking false approvals or blocking good content.
- Missing partial-regeneration API contracts increase integration risk between generation and review UIs.
- No visible security review artifacts for validation bypass paths (direct DB writes, malformed payloads) — risk of approval bypass.

### QUESTIONS FOR CLARIFICATION

- Not found: Where should the planner task doc be stored and what naming convention should it follow for EPIC-D planner artifacts?
- Not found: Are there mandatory tooling or test frameworks to use for automated quality checks (e.g., Jest, Playwright, custom linters)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Use this report at docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md as the repository truth. Produce a single planner task document that captures ONLY locked decisions required to start implementation. Deliverables must include:

- Validation rules: explicit, machine-checkable rules for schema validation, completeness checks, source grounding, difficulty alignment, and lab linkage presence. Express rules as short invariants (no implementation code).
- Acceptance criteria for LOCKED lessons: concrete, testable criteria that determine when a lesson may transition to LOCKED (e.g., minimum sections present, source coverage %, no high-severity QA flags).
- Partial regeneration policy: when partial section regeneration is allowed, required inputs/outputs for regeneration, and invariants to preserve (metadata, review flags).
- QA coverage requirements: list of required automated checks, minimum test cases, and CI gating expectations to consider the feature ready for implementers.
- Mapping to EPIC tasks (D7 items 39–44) and this code-scout report.

Planner constraints:

- Reference this report verbatim for repository findings.
- Do not include implementation code — only locked decisions, invariants, and example acceptance criteria.
- Deliver the planner task doc under `docs/tasks/` following EPIC naming conventions and include a one-line changelog entry.

Reference files used by this report:

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
