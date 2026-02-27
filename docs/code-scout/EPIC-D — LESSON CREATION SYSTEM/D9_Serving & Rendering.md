### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D9 — Serving & Rendering
- Source: docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md

### TASKS CHECKED

- From EPIC-D master tasks (feature D9):
  - 50. Expose lesson read API
  - 51. Enforce access control on lessons
  - 52. Render lessons in UI
  - 53. Support lesson navigation
  - 54. Enforce lesson → lab gating rules

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md — Orchestrator feature payload including:
  - Feature analysis (code / UX / integration, medium risk)
  - Required agent list (Planner/Architect, Implementer, Security Sentinel, QA, Integration Checker, Documenter)
  - Execution plan (architect → implementer → security → QA → documenter)
  - Orchestrator improvement notes recommending explicit caching/TTL and authored vs AI-edited rendering checklist
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC-D master task list containing feature D9 task items (50–54).

### WHAT IS PARTIALLY IMPLEMENTED

- EPIC task definitions for serving and rendering are present in the master tasks, and orchestrator lists required agents and an execution plan.
- No planner 'locked decisions' document for serving/rendering (API contract, pagination, gating rules) was found.

### WHAT IS MISSING

- Implementation code for lesson read API and UI renderer components under the owned paths (`apps/lessons/**`, `services/lessons/**`) — not found.
- Planner/architect deliverable specifying read API contract, response shapes, pagination/version retrieval semantics, and gating rules.
- Access control enforcement artifacts (ACL rules, middleware, tests) specific to lesson read endpoints.
- Caching strategy (TTL) decision artifacts or examples (recommended by orchestrator, not present).
- Integration reports validating lesson→lab gating and navigation behaviors.
- Documentation pages or API specs describing the read endpoints and UI rendering contracts beyond orchestrator notes.

### RISKS OR CONFLICTS

- Lack of a planner-architect locked-decisions doc increases risk of mismatched API contracts between backend implementers and frontend renderers.
- No visible ACL enforcement artifacts for lesson read endpoints; risk of accidental public exposure or gating bypass.
- Orchestrator suggests caching/TTL trade-offs but no decision found; inconsistent caching could cause stale lesson versions to be served.

### QUESTIONS FOR CLARIFICATION

- Not found: Preferred API surface for lesson reads (REST vs GraphQL vs RPC) and canonical URL namespace (e.g., `/api/lessons/:id` vs `/lessons/:id`).
- Not found: Expected pagination model for listing lessons or retrieving historical versions (cursor vs page number) and maximum page size.
- Not found: Exact gating rules and their mapping to auth roles/claims (how lesson→lab gating maps to ACLs).

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner / architect

Use this report at docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md as the truth source. Produce a planner task document that captures ONLY locked decisions required to start implementation. Deliverables must be a single planner task doc that includes:

- Read API contract: endpoint paths, HTTP methods, request parameters, response shapes, error cases, and example payloads. State the protocol (REST/GraphQL/RPC) choice explicitly.
- Pagination & version retrieval semantics: list API pagination model (cursor or page), parameters, and version access patterns (latest, specific version by id/tag), and limits.
- Access control & gating mapping: explicit ACL rules mapping lesson access to roles/claims, rules for lesson→lab gating, and token/session requirements for read endpoints.
- Caching policy: TTL guidance per endpoint, cache invalidation triggers when lessons are updated/locked, and freshness requirements.
- UI rendering contracts: minimal rendering expectations for front-end consumers (field-level rendering differences for authored vs AI-edited content, required metadata like review badges).
- References to EPIC tasks (D9 items 50–54) and to this code-scout report.

Constraints for the planner task doc:

- Reference this report verbatim for repository findings.
- Do not include implementation code — only locked decisions and concrete examples where helpful.
- Deliver the planner task doc under `docs/tasks/` following existing EPIC naming conventions and include a short changelog entry.

Reference files used by this report:

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
- docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
