### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D6 — Lesson Generation Engine
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Schema version & validation standard for Lesson JSON
  - Official source: https://json-schema.org
  - Exact version requirement: 2020-12 (RECOMMENDED) — MUST BE PINNED BEFORE SCHEMA FREEZE
  - Why required: Validator semantics (unevaluatedProperties, regexPattern) determine schema features used by generator and validator libraries
  - Decision it informs: Validator choice, codegen, cross-language compatibility
  - What breaks without it: Incompatible validators, silent acceptance/rejection of malformed lessons

- Technology: Vector DB / RAG (Chroma)
  - Concept: Vector store behavior and retrieval guarantees used by generation RAG pipeline
  - Official source: https://www.trychroma.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Retrieval semantics and embedding metadata shape prompt construction and grounding guarantees
  - Decision it informs: Retrieval window, chunking rules, metadata filtering
  - What breaks without it: Non-deterministic context, hallucinations, inconsistent grounding

- Technology: Prompting & Model Safety Guidance
  - Concept: Best practices for prompt instruction, grounding, and provenance capture (external model provider docs)
  - Official source: Provider docs (e.g., OpenAI embeddings/guides) — https://platform.openai.com/docs/guides/embeddings
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED
  - Why required: Enforces rate limits, provenance capture, and mitigations for instruction injection
  - Decision it informs: Prompt templates, max token budgets, provenance metadata
  - What breaks without it: Unsafe prompting, missing provenance, unbounded request costs

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator lists agents and plan but does not define generation contract, APIs, or manifest paths.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists D6 tasks but lacks section-level contracts, error/rollback rules, and API surface.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md
  - Coverage status: PARTIAL
  - Exact gaps: Enumerates missing repo artifacts (packages/lesson-schema, services/lessons/generation) but does not provide the planner task doc.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend (minimum):

- Add `/docs/official-docs/EPIC-D/lesson_generation_api.md` — required API surface and state lifecycle documentation.
- Add `/docs/official-docs/EPIC-D/lesson_schema_guidelines.md` — canonical lesson schema guidance referencing pinned JSON Schema version.
- Add `/docs/official-docs/EPIC-D/prompt_manifest.md` — canonical prompt templates, versioning, and storage paths.

### STUDY GUIDE FOR HUMAN

- `JSON Schema`:
  - Why: Deterministic validation and codegen for generator and consumer systems.
  - Alternatives: TypeScript runtime-only checks (not recommended for multi-service systems).
  - When NOT to use: If the lesson format is ephemeral and never crosses service boundaries.
  - Common mistakes: Using unpinned draft features; not capturing validation errors for human review.

- `Vector DB (Chroma)`:
  - Why: RAG grounding requires a predictable retrieval layer.
  - Alternatives: Other vector DBs (Milvus, Pinecone) — choose one and pin it.
  - When NOT to use: For small static corpora where embedding lookups are unnecessary.
  - Common mistakes: Not storing provenance metadata with embeddings; relying on full-text only.

- `Prompt & Model Safety`:
  - Why: Prevents instruction injection and ensures provenance for auditability.
  - Alternatives: Heavy-weight human review gating for each generation (slower).
  - When NOT to use: Never skip model safety guidance for production pipelines.
  - Common mistakes: Not recording the RAG context or model outputs alongside lesson drafts.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-D/lesson_generation_api.md
  - Purpose: Define required endpoints, state transitions, and error semantics for generation engine.
  - Exact knowledge to add: API paths (create-section, regen-section, commit-lesson), request/response shape references to `packages/lesson-schema`, error codes, rollback semantics.
  - Required version pin: N/A (internal) — reference pinned JSON Schema version.

- Path: /docs/official-docs/EPIC-D/lesson_schema_guidelines.md
  - Purpose: Authoritative guidance for lesson schema, validation rules, and codegen expectations.
  - Exact knowledge to add: required fields, difficulty enum mapping, allowed HTML/MD, sanitization rules, pinned JSON Schema version.
  - Required version pin: JSON Schema 2020-12 (or pinned alternative).

- Path: /docs/official-docs/EPIC-D/prompt_manifest.md
  - Purpose: Store prompt templates, versioning rules, and path manifest used by `services/lessons/generation/`.
  - Exact knowledge to add: prompt IDs, file paths (prompts/section/\*.md), template variables, prompt budgets, and anti-hallucination constraints.
  - Required version pin: N/A (internal) — reference model/provider docs.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Canonical runtime/ownership unclear: both `services/lessons/generation/` (Node) and `forgea-monorepo/services/content-engine/` (Python) are mentioned — planner must lock runtime choice.
- `packages/lesson-schema/` package missing — must be created and pinned before schema freeze.
- Prompt manifest and prompt storage path are not present — implementer must agree on `prompts/section/` path.

### MASTER DOCS REGISTRY ACTION (exact entries to append to `/docs/master_docs.md`)

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D6 — Lesson Generation Engine
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D6_Lesson Generation Engine.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates necessary for Feature D6.

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D6 — Lesson Generation Engine
  - Doc path: /docs/official-docs/EPIC-D/lesson_generation_api.md
  - Status: REQUIRED
  - Reason: API surface and lifecycle docs required before implementer work can proceed safely.
