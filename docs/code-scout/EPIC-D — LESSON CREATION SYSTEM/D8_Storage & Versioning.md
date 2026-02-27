++```markdown
### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D8 — Storage & Versioning
- Source: /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md and /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD

### TASKS CHECKED

- Store lesson metadata in database (Task 45)
- Store lesson content as JSON or MDX (Task 46)
- Version lesson content immutably (Task 47)
- Preserve old lesson versions (Task 48)
- Link lessons to labs and tracks (Task 49)

### WHAT ALREADY EXISTS

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md — orchestrator brief containing feature analysis, required agents, execution plan, and improvement notes.
- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC master task list enumerating D8 tasks (45–49).
- Related code-scoped outputs and requirements for adjacent features (D2, D3, D4) exist in `/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/` and `/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/` that reference storage and linking expectations.

### WHAT IS PARTIALLY IMPLEMENTED

- The orchestrator provides a clear execution plan and agent responsibilities but only at a design level; no concrete storage model, schema artifacts, migration patterns, or storage adapters were found in the repository.
- References exist indicating `packages/lesson-schema/` and `services/lessons/**` as owners, but `packages/lesson-schema/` lacks a finalized lesson storage schema artifact tied specifically to immutable versioning (no `lesson.v1.json` or similar found).

### WHAT IS MISSING

- Canonical storage model and data model definitions for lessons (DB schema, content store shape).
- Concrete implementation of immutable versioning semantics (append-only or content-addressed ids) and APIs for read/version access.
- Migration patterns and repository conventions for managing immutable content versions.
- Integration tests and QA artifacts validating versioning, rollback, and link preservation across versions.
- Security and compliance specifics for storage: encryption-at-rest, ACLs, backup/retention policy, and key management guidance.
- Documented API contracts for other features to read lesson content (read APIs, pagination, version retrieval endpoints).
- Decision on primary storage medium for lesson content (Postgres JSONB vs object store + metadata in DB) and cost/retention model.

### RISKS OR CONFLICTS

- Medium risk: feature touches content immutability and must preserve links to labs/tracks across versions; no implementation or test coverage seen to ensure this invariant.
- Cross-feature dependency risk: ingestion (D3) and embeddings/RAG (D4) have expectations about content shape and metadata—no explicit handoff contracts found.
- Potential policy gap: retention and compliance may require a dedicated Data Retention & Compliance Agent as noted; current agent list may not cover legal obligations.

### QUESTIONS FOR CLARIFICATION

- Should lesson content be stored primarily in a DB (e.g., Postgres JSONB) or as blobs in an object store with metadata in a DB? Please confirm preferred storage medium and any cost/retention constraints.

### NEXT AGENT HANDOFF PROMPT (planner-architect)

Copy-paste-ready prompt for the `planner-architect` (use this report as input):

"You are `planner-architect` for EPIC-D FEATURE D8 — Storage & Versioning. Input: this code-scout report (`/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md`), the EPIC master tasks (`/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`), and the orchestrator brief (`/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md`). Using only facts from these files, produce the following deliverables (structured, copy-paste-ready):

- A canonical storage model (DB schema and content-store shape) with field definitions and example records.
- Versioning semantics and API contracts: how versions are created, immutably stored, addressed, retrieved, and linked to labs/tracks (include API endpoints and request/response shapes).
- Migration and repository pattern recommendations for immutable content (append-only vs content-addressed IDs), including CI checks and expected migration steps.
- Security and compliance requirements for storage (ACL model, encryption-at-rest expectations, backup/retention policy, and whether a Data Retention & Compliance Agent is required).
- A short decision log (YAML) documenting the chosen storage medium and trade-offs, plus a one-page human-readable rollout checklist for implementers and QA.

Return artifacts as files and a one-page checklist. Remain within planner authority — do not implement code. Reference this code-scout report in your response."

Handoff complete. Provide this report verbatim to the next agent.

++```