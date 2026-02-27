# Bedrock Knowledge Base

- Category: Vector DB
- Epics: D, G
- Version / Requirement: AWS Managed
- Intent / Critical Decision: Future-proof RAG; automates S3 Vector sync.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D4)
- EPIC-D intent: Use Bedrock-managed vector knowledge storage for cloud-native RAG deployments where available.
- Important points:
  - Document provider capabilities, embedding compatibility, and indexing constraints; pin provider SDK versions.
  - Define sync patterns from canonical lesson storage to vector collections and how to handle updates/re-indexing.
  - Include cost and latency considerations versus self-hosted Chroma for large-scale workloads.
