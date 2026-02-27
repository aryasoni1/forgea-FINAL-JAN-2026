# Chroma

- Category: Vector DB
- Epics: D
- Version / Requirement: Pin required
- Intent / Critical Decision: Vector storage and retrieval for RAG workflows.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D4)
- EPIC-D intent: Use Chroma as the primary vector store for lesson knowledge, embeddings, and retrieval for RAG workflows.
- Important points:
  - Pin Chroma version and persistence backend (disk, S3, or managed) to ensure embedding dimension compatibility and query semantics.
  - Document collection design: metadata fields (lesson_id, section, chunk_id), TTLs, and freshening strategies during content updates.
  - Provide guidance for sharding/replication, backup, and reindexing procedures when prompt templates or embedding models change.
