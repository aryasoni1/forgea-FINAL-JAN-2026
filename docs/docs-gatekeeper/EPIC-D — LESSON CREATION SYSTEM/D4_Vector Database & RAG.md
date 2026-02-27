### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D4 — Vector Database & RAG
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
  - /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For each required concept below the official source and pinning requirements are listed.

- Technology: Chroma (vector database)
  - Concept: Vector storage, persistence, query API, and metadata indexing
  - Official source: https://www.trychroma.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Chroma's docs determine supported persistence backends, collection configuration, metadata field constraints, and query semantics.
  - Decision it informs: Storage architecture, durability settings, sharding/replication choices, metadata indexing strategy.
  - What breaks without it: Misconfigured store, incompatible metadata layout, unsupported API usage, security misconfigurations.

- Technology: Embedding model API (provider-specific)
  - Concept: Model names, embedding dimension, tokenization, rate limits, and API parameters
  - Official source: Provider docs (e.g., OpenAI Embeddings — https://platform.openai.com/docs/guides/embeddings) OR chosen provider's official docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Model/documentation determines embedding dimensionality, semantic behavior, and cost/latency trade-offs.
  - Decision it informs: Allowed models, minimum model versions, embedding dimension compatibility with Chroma collections.
  - What breaks without it: Dimension mismatches, unexpected semantic shifts, unpinned cost/rate limits causing outages.

- Technology: JSON Schema (embedding metadata manifest)
  - Concept: Schema for embedding metadata manifests and validation rules
  - Official source: https://json-schema.org/specification.html (recommend pin: 2020-12)
  - Exact version requirement: 2020-12
  - Why required: Provides authoritative validation language for manifests used by ingestion, CI, and integration-checker.
  - Decision it informs: Field types, required keys, stable key names and validation tooling.
  - What breaks without it: Divergent manifest formats, unreliable indexing, CI validation gaps.

- Technology: Retrieval-Augmented Generation (RAG) design guidance
  - Concept: Retrieval constraints, re-ranking heuristics, grounding policies to avoid hallucination
  - Official source: Provider and industry guides (e.g., Pinecone RAG guide — https://www.pinecone.io/learn/rag/; LangChain retrieval docs — https://langchain.readthedocs.io/) — chosen guide must be pinned
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines acceptable max retrieved tokens, re-ranking rules, and source-grounding policies used by planner and integration-checker.
  - Decision it informs: Retrieval limits, re-ranking algorithms, grounding policy for generated content.
  - What breaks without it: Hallucinations, unbounded context sizes, inconsistent grounding across consumers.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level execution plan and agent prompts exist, but no locked planner decisions (chunking, model versions, metadata manifest) and no manifest schema examples.

- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists tasks D4.20–D4.25 but contains no locked decisions, no model pins, and no schema artifacts.

- /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
  - Coverage status: PARTIAL
  - Exact gaps: Correctly identifies missing implementation and planner artifacts but does not provide locked decisions or a manifest schema.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-D/chroma.md` — pin Chroma version and enumerate supported persistence/configuration options.
- `/docs/official-docs/EPIC-D/embeddings_providers.md` — list approved embedding providers and pinned model names/versions.
- `/docs/official-docs/EPIC-D/embeddings_manifest_schema.md` — provide a JSON Schema (2020-12) for embedding metadata manifests and example skeletons.
- `/docs/official-docs/EPIC-D/rag_constraints.md` — pin the chosen RAG guidance doc and extract exact retrieval constraints.

### STUDY GUIDE FOR HUMAN

- **Chroma:** Why this exists: authoritative reference for how to persist and query vectors. Alternatives: Pinecone, Milvus, FAISS. When NOT to use: if provider-managed vector DB (Pinecone) is preferred for multi-tenant hosting. Common mistakes: not pinning collection schema, ignoring persistence/backing-store choices.

- **Embedding Model API:** Why: defines embedding semantics and dimensions. Alternatives: OpenAI, Cohere, Anthropic, local models (sentence-transformers). When NOT to use: avoid unpinned experimental models for production. Common mistakes: failing to pin model versions or assuming stable embedding dimensions.

- **JSON Schema (manifest):** Why: enables CI validation and stable interoperability between ingestion and retrieval. Alternatives: ad-hoc validation code (discouraged). When NOT to use: only for throwaway prototypes. Common mistakes: lax optional fields, unstable key names.

- **RAG Guidance:** Why: to bound retrieval and reduce hallucination. Alternatives: strict source quoting or retrievalless generation (less accurate). When NOT to use: small deterministic knowledge bases where retrieval is unnecessary. Common mistakes: unbounded retrieval sets, missing grounding rules.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-D/chroma.md
  - Purpose: Pin Chroma official docs and list allowed configuration and persistence patterns used by Forgea.
  - Exact knowledge to add: recommended Chroma version, collection creation options, metadata field limits, persistence/backing-store guidance, security considerations.
  - Required version pin: Chroma VERSION — MUST BE PINNED

- Path: /docs/official-docs/EPIC-D/embeddings_providers.md
  - Purpose: List approved embedding providers and pinned acceptable models with minimum versions.
  - Exact knowledge to add: provider docs links, allowed model names, minimum versions, dimensionality expectations, cost/latency notes.
  - Required version pin: Each provider's model version — MUST BE PINNED

- Path: /docs/official-docs/EPIC-D/embeddings_manifest_schema.md
  - Purpose: Publish a JSON Schema (2020-12) for embedding metadata manifests and provide example skeletons.
  - Exact knowledge to add: full schema, required vs optional fields, types, example manifest, CI validation snippets.
  - Required version pin: JSON Schema 2020-12

- Path: /docs/official-docs/EPIC-D/rag_constraints.md
  - Purpose: Pin RAG guidance and list the exact retrieval constraints (max retrieved tokens, re-ranking rules, grounding policy).
  - Exact knowledge to add: chosen upstream guide URL, extracted numeric constraints, re-ranking algorithm description, and acceptable trade-offs.
  - Required version pin: Source guide version — MUST BE PINNED

### OPEN QUESTIONS / AMBIGUITIES

- Which embedding provider and exact model(s) are approved for production (OpenAI / Anthropic / Cohere / local)? — blocker: required for dimension and cost planning.
- What Chroma version and persistence/backing-store configuration should be used for hosted vs local deployments? — blocker: affects on-disk format and migration planning.
- Is there an org-standard manifest field set (stable key names) required for downstream analytics and security tagging? — blocker: metadata interoperability.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D4 — Vector Database & RAG
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D4_Vector Database & RAG.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for D4.
