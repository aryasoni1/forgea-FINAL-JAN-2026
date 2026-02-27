## FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D6 — Lesson Generation Engine
- Source: docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md

### TASKS CHECKED

From `docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD` — tasks belonging to FEATURE D6:
- 32. Generate lessons from canonical template
- 33. Populate sections using prompt system
- 34. Enforce schema validation on output
- 35. Attach lab intents to lessons
- 36. Assign lesson version
- 37. Assign review status (DRAFT / REVIEW / LOCKED)
- 38. Store generated lesson content

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md — Orchestrator output describing required agents, execution plan, and copy-paste prompts for planner, implementer, QA, security, and documenter.
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — Master tasks file enumerating FEATURE D6 tasks (items 32–38) and related feature requirements.
- Multiple EPIC-D code-scout reports referencing expected ownership paths (e.g., `services/lessons/**`, `packages/lesson-schema/**`) and noting current absence of implementations.

### WHAT IS PARTIALLY IMPLEMENTED

- `forgea-monorepo/services/content-engine/` exists (Python AI agent service) but contains no lesson generation engine implementations or Node-based `services/lessons/generation/` artifacts.
- Orchestrator provides planner/implementer prompts and an execution plan, but the implementer-targeted path `services/lessons/generation/` is not present in the repository.

### WHAT IS MISSING

- The runtime implementation for the Lesson Generation Engine at `services/lessons/generation/` (no matching directory or code found).
- A canonical lesson schema artifact under `packages/lesson-schema/` (no such package present).
- Persistence/migration artifacts for lesson versioning and review-state metadata.
- Section-level prompt storage/manifest (`prompts/` manifest) and enforcement code expected by the implementer prompt.
- Partial-section regeneration API endpoints and schema validation hooks.
- Automated QA tests validating deterministic generation, partial regeneration, and review-state transitions.
- Security review artifacts enforcing provenance and injection mitigations.

### RISKS OR CONFLICTS

- Ownership mismatch: orchestrator expects Node/monorepo placement under `services/lessons/`, yet an isolated Python `content-engine` service exists — unclear canonical runtime for generation engine.
- Missing schema and storage artifacts risk divergent implementations and inconsistent versioning/review semantics.
- Lack of partial-regeneration endpoints and validation tests increases risk of unsafe or non-deterministic lesson outputs when multiple implementers proceed independently.

### QUESTIONS FOR CLARIFICATION

- Confirm the canonical runtime and ownership for the generation engine: should implementers target `services/lessons/generation/` (Node) or `services/content-engine/` (Python)?
- Confirm the preferred storage location and schema package name for the canonical lesson schema (expected `packages/lesson-schema/`).

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Use this exact prompt (copy-paste) for the next agent: planner-architect. Reference this code-scout report when running.

"You are the `planner-architect` agent. Reference this code-scout report: `docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md`.

Task: Produce a task doc specifying the Lesson Generation Engine for EPIC-D FEATURE H6 (D6). Include:
- Single-section generation contract (what a section input and output MUST contain).
- Error and rollback behavior for generation failures.
- Partial-section regeneration flow and required APIs.
- Review-state lifecycle and transitions (DRAFT → REVIEW → LOCKED) and required metadata per state.
- Required manifest/paths for prompt templates and lesson schema (path-only, not implementation).

Inputs you MUST use: the orchestrator output at `docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md` and the master tasks file `docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`. Do NOT modify repository files.

Deliverables (strict):
- A single task document (markdown) with clear acceptance criteria for implementer consumption.
- A short list of mandatory API endpoints the implementer must expose (path + verb only).
- An assumptions list noting any missing repo artifacts that affect plan (for example, missing `packages/lesson-schema/`).

Constraints: Do NOT implement code. Keep the task doc concise (≤ 800 words). Do NOT assume missing artifacts; explicitly state them as assumptions.
"

Handoff complete. Provide this report verbatim to the next agent.
