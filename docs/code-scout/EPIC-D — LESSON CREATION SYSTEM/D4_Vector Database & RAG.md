### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D4 — Vector Database & RAG
- Source: docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md

### TASKS CHECKED

- From EPIC-D master tasks (feature D4):
  - 20. Choose vector database (Chroma)
  - 21. Define content chunking rules
  - 22. Generate embeddings with metadata
  - 23. Store embeddings in vector DB
  - 24. Define RAG retrieval constraints
  - 25. Build context inspection tool

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md — Orchestrator feature payload including:
  - Feature analysis (infra/integration, high risk)
  - Required agent list (planner-architect, implementer, integration-checker, security-sentinel, qa-tester, documenter-historian)
  - Execution plan (planner → implementer → QA+security → integration-checker)
  - Copy-paste prompts for each required agent (including a planner-architect prompt referencing the master tasks file)
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC-D master task list containing feature D4 task items (20–25).

### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level decisions and agent responsibilities are documented in the orchestrator file and master tasks, but no planner 'locked decisions' document was found for D4.

### WHAT IS MISSING

- Implementation code under the referenced path `services/lessons/embeddings/` (not found).
- A planner task document capturing locked decisions for chunking, embedding model versions, metadata schema, and retrieval constraints (planner artifact not found).
- A standardized embedding metadata manifest format (or manifest files) — recommended by orchestrator but not present.
- CI validation steps, tests, and manual-check guides for the embedding pipeline (not found).
- Context inspection tooling and an integration report (integration-checker outputs not found).

### RISKS OR CONFLICTS

- Single source-of-truth exists only at orchestrator and master tasks; there is no corresponding implementation or planner-lock artifact — risk of drift between plan and implementation.
- Orchestrator recommends a manifest format but no manifest examples or schemas were found in the repo.

### QUESTIONS FOR CLARIFICATION

- Not found: Is there an approved planner task doc location or naming convention for planner deliverables? (orchestrator references `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD` but no planner-lock artifact for D4 was located.)

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Use this report at docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md as the truth source. Produce a planner task document that captures ONLY locked decisions required to start implementation. Deliverables must be a single planner task doc that includes:

- Chunking rules (file types, chunk size limits, overlap rules, special handling for code/markdown).  State invariants; do not implement.
- Acceptable embedding model versions (explicit model names and minimum versions).  State allowed versions only.
- Embedding metadata schema (fields, required vs optional, types, and stable key names).  Include example metadata manifest skeleton (no implementation code).
- RAG retrieval constraints (max retrieved tokens, re-ranking rules, source grounding policy).  State constraints only.
- Exact references to EPIC tasks (D4 items 20–25) and to this code-scout report.

Constraints for the planner task doc:

- Reference this report verbatim for repository findings.
- Do not prescribe implementation details beyond the required locked decisions above.
- Deliver the planner task doc under `docs/tasks/` following existing EPIC naming conventions and include a short changelog entry.

Reference files used by this report:

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
