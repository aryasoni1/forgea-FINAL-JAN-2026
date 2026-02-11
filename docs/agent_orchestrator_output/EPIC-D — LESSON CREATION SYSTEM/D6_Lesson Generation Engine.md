### FEATURE ANALYSIS

- Feature Type: code / AI pipeline
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define generation workflow, section-level responsibilities, versioning, and review status lifecycle (DRAFT / REVIEW / LOCKED).
- implementer — Build generation engine that consumes prompts, RAG context, enforces schema validation, attaches lab intents, assigns versions, and stores content.
- qa-tester — Verify deterministic generation, partial section regeneration, schema enforcement, and review-state transitions.
- docs-gatekeeper — Ensure any referenced external docs or models are registered.
- documenter-historian — Record generation decisions and storage locations.
- security-sentinel — Verify that generated content enforces provenance and rejects unsafe content.

### NOT REQUIRED AGENTS

- integration-checker — Reason: Integration checks run after pipeline implemented and integrated end-to-end.

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner writes a detailed generation workflow: single-section generation contract, error/rollback behavior, versioning rules, and review-state transitions. (Sequential)
- Step 2: Implementer implements the engine in `services/lessons/generation/`, wiring prompt system, RAG retrieval, schema validation, version assignment, lab intents attachment, and persistence. (Sequential)
- Step 3: QA validates deterministic outputs, partial section regeneration, schema conformance, and state transitions; Security runs in parallel to evaluate provenance and injection risks. (Parallel)
- Step 4: Documenter records artifacts, locations, and migration notes. (Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a generator-state machine spec template to avoid ambiguous review-state transitions.

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Produce a task doc specifying the Lesson Generation Engine for EPIC-D FEATURE H6. Include: single-section generation contract, error/rollback rules, partial regeneration flow, review-state lifecycle (DRAFT/REVIEW/LOCKED) and required outputs for implementer."

- implementer:

"Implement the approved Lesson Generation Engine per planner doc. Deliver code under `services/lessons/generation/`, include schema validation hooks, section-level regeneration API, version assignment, review-state metadata, and manual-checks + how-to docs."

- qa-tester:

"Design tests covering deterministic generation, partial section regen, schema validation failures, and review-state transitions for FEATURE H6."

- security-sentinel:

"Assess provenance enforcement, injection and content-safety controls in the generation engine. Provide required mitigations."

- documenter-historian:

"Record the generation engine architecture, decision log, storage locations, and release notes referencing planner and implementer docs."
