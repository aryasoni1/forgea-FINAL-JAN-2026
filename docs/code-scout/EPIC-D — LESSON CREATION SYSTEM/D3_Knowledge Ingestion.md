++```markdown
### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D3 — Knowledge Ingestion
- Source: /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md and /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD

### TASKS CHECKED

- Curate trusted source list
- Build constrained documentation scraper
- Normalize scraped content
- Attach metadata to scraped sources
- Store raw reference data separately

### WHAT ALREADY EXISTS

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md — orchestration brief: feature analysis, required agents, execution plan, and copy-paste prompts for agents.
- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD — EPIC master tasks listing D3 items (15–19).
- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md — related E2E check requirements (ingestion → embeddings → Chroma) and references to downstream constraints.
- /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md — existing code-scout report for D4 (related feature).
- Several official guidance documents exist that are relevant to ingestion (e.g., audit/logging and rate-limit guidance under /docs/official-docs/EPIC-B), which supply ingestion-related constraints and expectations.

### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level design and role assignments exist (required agents, execution plan, and copy-paste prompts) but are declarative only.
- EPIC metadata references the expected code locations (`services/lessons/ingestion/` and `packages/lesson-schema/`) and desired deliverables, but those implementation directories/files are not present in the repository (no concrete scraper, normalizer, or schema files found).

### WHAT IS MISSING

- Implementation code for the constrained documentation scraper (expected path: `services/lessons/ingestion/`).
- Normalization pipeline code and test fixtures for scraped content.
- A formal metadata schema artifact for scraped sources (e.g., under `packages/lesson-schema/` or a dedicated schema file).
- A documented storage location and spec for raw references (object store vs database, retention, retention/archival policy, and cost model).
- Trusted Sources registry or whitelist under `/docs/official-docs/` (or equivalent) — not found.
- Security analysis artifacts (threat model, sanitization rules, scanning requirements) tied to the ingestion feature.
- Integration adapter/interface contract between ingestion output and embedding/chunking pipeline (contracts for fields, chunking hints, and provenance metadata).
- Manual-checks and beginner how-to docs for operating the ingestion pipeline.

### RISKS OR CONFLICTS

- Orchestrator marks this feature as High Risk; repository contains no implemented ingestion code or security assessment to mitigate that risk.
- Naming/label inconsistency observed in orchestration prompts (reference to "H3" vs EPIC-D `D3`) — user confirmed to treat as `D3`.
- Missing invariants for storage and handoff (no explicit contract observed for embedding metadata, chunking expectations, or vector DB ingestion format).
- Potential cross-feature dependency: D4 (Vector DB & RAG) references E2E checks and expects Chroma; ingestion must satisfy D4's metadata and chunking requirements before integration.

### QUESTIONS FOR CLARIFICATION

- Confirm where raw reference blobs should be persisted (object store such as S3-compatible vs database column in Postgres) and any preferred retention/archival policy to reference in the planner deliverable.

### NEXT AGENT HANDOFF PROMPT (planner-architect)

Copy-paste-ready prompt for the `planner-architect` (use this report as input):

"You are `planner-architect` for EPIC-D FEATURE D3 — Knowledge Ingestion. Input: this code-scout report (`/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md`), the EPIC master tasks (`/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`), and the orchestrator brief (`/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md`). Using only the facts in these files, produce the following deliverables (structured, copy-paste-ready):

- A Trusted Sources whitelist (file path where it should live under `/docs/official-docs/`), including acceptance criteria for sources to be added.
- Scraping constraints and operational rules (rate limits, backoff strategy, allowed domains, seed rules, frequency, and respecting robots.txt and API rate limits).
- Normalization rules (target canonical text format, headings/preservation rules, code block handling, deduplication, and minimum chunking hints) — do not implement code.
- A metadata schema to attach to each raw reference (fields required for provenance: source URL, fetch timestamp, HTTP headers, checksum, inferred content type, crawler-version, and optional tags).
- A concrete storage spec describing where raw reference blobs live (object store vs DB), retention/archival policy, cost-tagging requirements, and any required access controls.
- Preconditions and acceptance criteria for the implementer (security checks required, sample payload shapes, tests to validate normalization correctness, and required adapters for D4 embedding ingestion).

Return artifacts as: a short decision log (YAML) plus a one-page human-readable checklist. Do not implement code; remain within planner authority. Reference this code-scout report in your response."

Handoff complete. Provide this report verbatim to the next agent.

++```