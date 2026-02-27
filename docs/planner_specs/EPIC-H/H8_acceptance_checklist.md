# H8 Acceptance Checklist — Implementer & Security-Sentinel

Paths and artifacts the Implementer MUST produce for reviewer acceptance.

Implementer deliverables (exact paths):

- Migrations (SQL):
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0001_create_verification_jobs.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0002_create_verification_job_events.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0003_create_verification_results.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0004_create_audit_logs.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0005_emergency_override_function.sql`

- Runner code & handlers:
  - `forgea-monorepo/services/verification-runner/src/publish.ts` — upload + result publish with idempotency guard.
  - `forgea-monorepo/services/verification-runner/src/upload.ts` — S3 upload helper with server-side-encryption and checksum.

- Infra/DB role provisioning:
  - `infra/db/roles/verification_roles.sql`

- Runbooks & policies:
  - `/docs/official-docs/EPIC-H/runbooks/runner_persistence_runbook.md`
  - `/docs/official-docs/EPIC-H/policy/immutability_policy.md`

- Tests & CI jobs:
  - `tests/epic-h/append_only_spec.ts`
  - `tests/epic-h/integration_publish_spec.ts`
  - `.github/workflows/epic-h-protect.yml` — CI job enforcing SQL lint and append-only checks.

Security-Sentinel deliverables (exact paths):

- Threat model & review artifacts:
  - `/docs/official-docs/EPIC-H/security/immutability_threat_model.md`
  - `/docs/official-docs/EPIC-H/security/privilege_matrix.md`

- CI checks & test plans:
  - `/docs/official-docs/EPIC-H/testing/append_only_tests.md`
  - `/docs/official-docs/EPIC-H/testing/audit_integrity_tests.md`

Acceptance criteria (mapped checks):

- Migrations present and apply cleanly in ephemeral test DB.
- Protected tables (`verification_job_events`, `verification_results`, `audit_logs`) reject `UPDATE` and `DELETE` from non-admin roles; verified by `tests/epic-h/append_only_spec.ts`.
- Runner integration test `tests/epic-h/integration_publish_spec.ts` demonstrates: artifact upload to S3 (versioned), idempotent result insertion, and `verification_results` row created exactly once per `job_id`.
- Emergency override function exists and when executed records previous state to `verification_result_revisions` and an `audit_logs` entry; Security-Sentinel verifies the approval workflow.
- CI job `.github/workflows/epic-h-protect.yml` runs on PRs and fails if SQL files contain `DELETE`/`UPDATE` statements targeting protected tables (except approved migration file with `emergency_override_function`).
- Security-Sentinel signs off on `/docs/official-docs/EPIC-H/security/immutability_threat_model.md` and CI passes for the PR.

Notes:
- All paths above are exact; PRs must include these files in these locations for acceptance.
- Any deviation requires pre-approval from `engineering-security` and must be recorded in `audit_logs`.
