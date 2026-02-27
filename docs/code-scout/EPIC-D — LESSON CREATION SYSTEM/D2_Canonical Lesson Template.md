++```markdown
### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D2 — Canonical Lesson Template
- Source: /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md and /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD

### TASKS CHECKED

- Design canonical Lesson JSON schema (Task 6)
- Define required lesson fields (Task 7)
- Define optional lesson fields (Task 8)
- Define lesson difficulty enum (Task 9)
- Define lesson prerequisites structure (Task 10)
- Define lab linkage structure (`lab_intents`) (Task 11)
- Freeze Lesson schema v1 (Task 12)
- Mark human-only editable fields (Task 13)
- Mark AI-editable fields (Task 14)

### WHAT ALREADY EXISTS

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md — orchestrator brief describing required agents, execution plan, and copy-paste prompts for implementer/planner/QA/security/documenter.
- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC master tasks listing D2 responsibilities (6–14) and ownership notes (`packages/lesson-schema/**`).
- References across EPIC-D orchestrator outputs that expect `packages/lesson-schema/lesson.v1.json` and validation tooling (e.g., D6, D7 integration points).

### WHAT IS PARTIALLY IMPLEMENTED

- The orchestrator provides detailed role assignments and implementation directives (paths and expected artifacts), but the repository lacks the concrete schema artifact (`packages/lesson-schema/lesson.v1.json`) and validator tooling referenced in the brief.
- There are references to schema-driven workflows (generation, validation, CI checks) but no implemented CI validation step or test cases specific to the lesson schema.

### WHAT IS MISSING

- The canonical Lesson JSON Schema file (expected location: `packages/lesson-schema/lesson.v1.json`).
- CLI/Node validator tooling for linting and validating lesson documents against schema.
- CI integration steps to run schema validation during PRs and merges.
- Test cases and QA artifacts exercising schema edge-cases (missing required fields, invalid enums, malformed `lab_intents`, large section content).
- A documented decision log indicating which fields are human-only editable vs AI-editable (artifact for `documenter-historian`).
- Security review of schema fields for PII exposure and sanitization guidance.

### RISKS OR CONFLICTS

- High risk: schema changes are marked SOFT LOCK and will affect many downstream systems (generation, ingestion, embeddings). No schema artifact or validation pipeline exists to enforce invariants.
- Cross-feature dependency risk: ingestion (D3), generation (D6), and storage/versioning (D8) depend on a stable schema — lack of schema increases integration friction and potential data loss or incompatible formats.

### QUESTIONS FOR CLARIFICATION

- Confirm the JSON Schema draft/version target (e.g., Draft-07, Draft-2019-09) to use for `lesson.v1.json` and validator compatibility.

### NEXT AGENT HANDOFF PROMPT (planner-architect)

Copy-paste-ready prompt for the `planner-architect` (use this report as input):

"You are `planner-architect` for EPIC-D FEATURE D2 — Canonical Lesson Template. Input: this code-scout report (`/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md`), the EPIC master tasks (`/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`), and the orchestrator brief (`/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md`). Using only the facts in these files, produce the following deliverables (structured, copy-paste-ready):

- A canonical `lesson.v1.json` JSON Schema artifact (schema version declared) listing required and optional fields, enums (including difficulty), `lab_intents` structure, and clear examples for valid records.
- A short validator spec describing the recommended CLI/Node validator, required Node versions, and CI step to run on PRs.
- A decision log (YAML) marking which fields are human-editable vs AI-editable and any locked decisions.
- QA test case list covering schema edge-cases and sample fixtures for implementers/QA.

Return artifacts as a ZIP-compatible list of files and a one-page checklist. Do not implement code; remain within planner authority. Reference this code-scout report in your response."

Handoff complete. Provide this report verbatim to the next agent.

++```