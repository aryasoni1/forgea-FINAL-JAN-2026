# Terraform

- Category: IaC
- Epics: B, H
- Version / Requirement: 1.14.5
- Intent / Critical Decision: Provisions AWS RDS/S3; v1.14 adds S3 Object Lock API.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING
- EPIC-B intent: Provision and manage DB infra (RDS, networking, backups) and storage for evidence/immutable data.
- Important points:
  - Pin Terraform provider versions and Terraform CLI versions for reproducible plans and state behavior.
  - Document recommended RDS parameter groups, backup/retention policies, and S3 Object Lock configuration for immutability (B11/B12).
  - Include examples for local dev using Docker Compose vs CI infra provisioning flows.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Provide Terraform examples for snapshot artifact storage, S3 Object Lock configuration, and IAM roles for verification runners and artifact uploaders.
- Important points:
  - Add Terraform snippets that create S3 buckets with Object Lock enabled, lifecycle/retention rules, and minimal IAM policies for ephemeral uploader tokens used by verifiers.
  - Document how to provision isolated runner environments (ECS tasks / ephemeral VMs) with least-privilege access to artifact storage and signing key retrieval via Vault.
  - Pin provider versions and document recommended locking strategy for Terraform state to avoid accidental drift when publishing templates.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use Terraform examples and modules to provision immutable evidence storage (S3 Object Lock), KMS-backed encryption, and DB instances used for audit and enforcement pipelines.
  - Important points:
    - Provide example Terraform that enables S3 Object Lock, configures lifecycle/retention for audit evidence, and records KMS key IDs used for signing and encryption.
    - Document minimal IAM policies for ingestion and verification runners (least privilege) and how to provision KMS keys with rotation policies suitable for signed audit chains.
    - Pin provider and module versions to guarantee reproducible state for forensic artifacts and legal holds.
