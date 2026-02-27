# Object Storage (S3 / Azure Blob)

- Category: Storage
- Epics: B
- Version / Requirement: Provider-specific (pin required)
- Intent / Critical Decision: Guidance for storing evidence, immutable payloads, and backups using S3 or Azure Blob semantics.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B7 Proof & Evidence Storage, B11 Immutability)
- EPIC-B intent: Use provider object-storage features (S3 Object Lock, Azure immutable blobs) and encryption to meet immutability and retention requirements.
- Important points:
  - Immutability: For AWS S3, use Object Lock in Governance/Compliance modes and configure retention periods; for Azure, use immutable storage policies/containers.
  - Encryption: Use server-side encryption with KMS-managed keys (SSE-KMS) and consider envelope encryption for added control; manage keys in Vault or cloud KMS.
  - Access & logging: Enable access logging and object-level auditing; route access logs to an immutable audit store and integrate with ECS mapping for audit pipelines.
  - Lifecycle & retention: Define lifecycle rules, versioning, and retention to support retention/expiry policies required by compliance.
  - Terraform examples: Provide Terraform snippets for bucket/container creation with Object Lock / immutability policies and IAM policies for least-privilege access.
  - Backup/restore: Document restore playbooks and verify object integrity (checksums) and provenance metadata for evidence chain-of-custody.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use object storage as the canonical store for immutable snapshots, verification artifacts, and preview captures.
- Important points:
  - For snapshot and verification artifacts, require content-addressed keys (CID or SHA256) and append manifest metadata including `lab_id`, `commit`, `verifier_run_id`, and checksums so artifacts are tamper-evident.
  - Use provider immutability features (S3 Object Lock or Azure immutable blob containers) for published snapshots and configure lifecycle/retention per legal requirements.
  - Ensure access controls and logging are enabled so artifact retrievals are auditable; store verification JSON reports alongside traces and screenshots.
