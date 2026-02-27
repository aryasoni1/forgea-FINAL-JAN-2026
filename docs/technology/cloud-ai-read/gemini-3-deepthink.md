# Gemini 3 DeepThink

- Category: Cloud AI (Read)
- Epics: D, E
- Version / Requirement: GCP API
- Intent / Critical Decision: Massive 2M+ context window for reading large lab data.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D3 Knowledge Ingestion, D4 Vector Database & RAG)
- EPIC-D intent: Use large-context read models (e.g., Gemini 3) for ingest-time summarization, long-form document understanding, and building context windows for lesson generation.
- Important points:
  - Document cost and latency tradeoffs for large-context reads versus chunked embedding + retrieval flows.
  - Provide guidance on chunking strategy, context window usage, and when to prefer retrieval vs direct long-context prompting.
  - Ensure privacy/data residency constraints are followed when sending user or internal content to external LLM providers.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: For ingestion-time summarization or read-time diagnostics, require pinned provider APIs and documented data residency/PII rules for any content sent to external models.
- Important points:
  - Document acceptable content types for model reads (e.g., non-PII, sanitized artifacts) and require a sanitizer step that validates and redacts forbidden fields before sending to external LLMs.
  - Record and store minimal explainability metadata for reads (model, model_version, prompt/context window) when reads are used to build RAG indices or summaries that feed generation flows.
  - Pin API versions and include fallback strategies (local embedding + retrieval) where sending large or sensitive documents to external providers is not permitted.
