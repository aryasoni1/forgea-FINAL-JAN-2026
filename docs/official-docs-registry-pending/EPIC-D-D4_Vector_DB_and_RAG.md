# Pending registry additions for EPIC-D / D4 — Vector Database & RAG

The following entries are the exact additions that SHOULD be appended to `/docs/official-docs-registry.md` under the authoritative registry.

Please append the block below (preserve formatting) to the end of `/docs/official-docs-registry.md`.

---

## 🧩 Vector Search & Embeddings (EPIC-D)

### Chroma (vector database)

- **Technology:** Chroma
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.trychroma.com/docs
- **Used for:** Persistent vector storage, metadata indexing and query semantics for EPIC-D / D4
- **Internal docs:** /docs/official-docs/EPIC-D/chroma.md
- **Status:** REQUIRED

### Embedding Model API (provider-specific)

- **Technology:** Embedding model API (e.g., OpenAI, Cohere, Anthropic, local)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Provider docs (e.g., OpenAI Embeddings — https://platform.openai.com/docs/guides/embeddings)
- **Used for:** Generating embeddings (dimension, semantics, rate limits) consumed by EPIC-D ingestion and RAG
- **Internal docs:** /docs/official-docs/EPIC-D/embeddings_providers.md
- **Status:** REQUIRED

### JSON Schema (embedding metadata manifest)

- **Technology:** JSON Schema
- **Version:** 2020-12
- **Official source:** https://json-schema.org/specification.html
- **Used for:** Defining the canonical manifest schema for embedding metadata and enabling CI validation
- **Internal docs:** /docs/official-docs/EPIC-D/embeddings_manifest_schema.md
- **Status:** VERIFIED

### RAG Guidance & Retrieval Constraints

- **Technology:** Retrieval-Augmented Generation (RAG) guidance
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Provider/industry guides (pin exact guide; e.g., Pinecone RAG guide — https://www.pinecone.io/learn/rag/)
- **Used for:** Defining retrieval constraints, re-ranking rules, and grounding policy for EPIC-D RAG usage
- **Internal docs:** /docs/official-docs/EPIC-D/rag_constraints.md
- **Status:** REQUIRED

---

# End of pending additions
