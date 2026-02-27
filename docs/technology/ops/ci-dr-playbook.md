# CI / DR Playbook (DB-focused)

- Category: Ops / Runbooks
- Epics: B
- Version / Requirement: Varies by provider
- Intent / Critical Decision: Consolidated CI and disaster-recovery playbooks for database operations and verification.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B11 / B12)
- EPIC-B intent: Provide step-by-step playbooks for CI-driven migrations, backup verification, and disaster recovery drills.
- CI Playbook (migration pipeline):
  - Pre-check: Run schema linter, type-checks, and `prisma migrate status` in CI.
  - Shadow DB: Execute migration against shadow DB and run integration tests.
  - Approval: Require manual approval if migration is non-additive; record approver and CI job metadata.
  - Deploy: Apply migration via CI job with audit logging and ECS event emission.

- DR Playbook (drill):
  1. Announce drill and isolate test environment.
  2. Restore latest snapshot to an isolated environment using terraform-db-runbooks steps.
  3. Run integrity checks and smoke tests; verify application behaves as expected.
  4. Time the drill and capture metrics; document failures and remediation steps.

- Important points:
  - Automate as much verification as possible and store run artifacts and logs in an immutable store for post-mortem and auditor review.
  - Record operator, CI job id, commit SHA, and timestamps for each run to support evidence collection.
