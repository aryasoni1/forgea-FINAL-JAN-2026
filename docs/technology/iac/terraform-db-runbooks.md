# Terraform DB Runbooks (Backup / Restore / Migrations)

- Category: IaC / Runbooks
- Epics: B
- Version / Requirement: Pin Terraform CLI & providers (required)
- Intent / Critical Decision: Provide operational runbooks for DB backups, restores, and safe migration execution.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B1, B2, B11)
- EPIC-B intent: Ensure reproducible, audited processes for backups, restores, and applying schema migrations with minimal downtime.
- Backup runbook (high level):
  1. Validate current DB health and replication lag.
  2. Trigger a logical or physical backup per RDS/provider guidance (snapshots for RDS, pg_basebackup for self-hosted).
  3. Verify snapshot integrity and store metadata in an immutable registry (S3 Object Lock-enabled bucket).
  4. Rotate KMS keys if scheduled and record key IDs used for the backup.
  5. Notify downstream systems and tag backup artifacts with run id, commit SHA, and operator.

- Restore runbook (high level):
  1. Identify required snapshot and validate provenance (checksums, operator, timestamp).
  2. Provision restore environment (isolated VPC / DB instance) using pinned Terraform modules.
  3. Restore snapshot and run integrity checks (row counts, checksum tests, smoke queries).
  4. If promoting to production, run a blue-green switchover plan and update DNS/connection strings with rollback steps.

- Migration runbook (safe schema changes):
  1. Create a migration branch and preview migration SQL using `prisma migrate dev --create-only` against a shadow DB.
  2. Run migration on a staging DB and execute a test suite including data-migration/backfill tasks.
  3. Schedule maintenance window if required; for non-blocking changes prefer additive migrations and background backfills.
  4. Apply migration via CI job that records the run id, operator, and migration artifact in audit logs (ECS event above).
  5. Monitor for errors and have a rollback plan (schema rollback or restore from snapshot) documented with exact commands.

- Important points:
  - Pin Terraform and provider versions in modules and CI to guarantee reproducible plan/apply behavior.
  - Automate verification steps and artifact recording to support audits (SOC2/SOC, PCI evidence).
  - Keep runbooks in version control and tag runbook runs with operator and CI metadata for traceability.

## EPIC-I — Notes

- Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- EPIC-I intent: Operational runbooks must include steps for storing audit evidence (snapshots, signed events) into immutable sinks and recording KMS keys used for signing.
- Important points:
  - Ensure backup/runbook steps include verification of snapshot integrity, signing metadata (JWS headers), and storing provenance in an S3 Object Lock-enabled bucket.
  - Record the KMS key id used during backup signing and rotate keys per policy while preserving the ability to verify historical evidence.
  - Include redrive and reprocessing steps for audit/event replays used by detection/validation pipelines.
