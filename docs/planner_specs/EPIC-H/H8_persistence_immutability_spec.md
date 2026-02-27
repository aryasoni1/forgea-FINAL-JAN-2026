---
id: EPIC-H.H8
title: H8 Persistence & Immutability — verification-runner
version: 0.1
owner: HARD_LOCK:engineering-security
approved_by: HARD_LOCK:owner TODO (must be pinned before implementation)
---

# H8 Persistence & Immutability — Planner Spec

Purpose: Define authoritative persistence model, append-only guarantees, access controls, and runbook requirements for verification-runner artifacts and provenance.

1. Scope & authoritative ownership

- Scope: verification job metadata, verification results, logs, snapshot provenance, and artifact blobs produced by `verification-runner`.
- HARD LOCK owner: `engineering-security` (explicit sign-off required for schema changes and destructive actions). Emergency rollback authority: a named-role list maintained by `engineering-security` (documented in runbook). Planner must obtain exact canonical owner list before implementation.

2. Target storage backends (recommended)

- Primary metadata store: Postgres (append-only tables + audit table). Justification: strong transactional guarantees, relational queries, and existing infra.
- Artifact blobs / large logs: S3-compatible object storage (e.g., AWS S3, MinIO) with immutable object versioning and bucket-level retention. Justification: scalable, inexpensive, immutable storage with object versioning and WORM/retention support.
- Hybrid pattern: store small logs & metadata in Postgres, large artifacts and full logs in S3; Postgres records hold canonical object keys and provenance metadata.

3. Data model & DB schema recommendations

- Canonical tables (example names & migration file paths):
  - `verification_jobs` — migration: `migrations/2026-02-14_0001_create_verification_jobs.sql`
    - columns: `id UUID PRIMARY KEY`, `lab_id UUID NOT NULL`, `job_type TEXT NOT NULL`, `created_at timestamptz NOT NULL DEFAULT now()`, `submitted_by UUID NULL`, `payload jsonb NOT NULL`, `status TEXT NOT NULL`, `result_id UUID NULL`.
    - Policy: INSERT-only (no UPDATE to historical rows). Updates to `status` should be modelled via append-only `verification_job_events` table instead of mutating `verification_jobs` except for a narrow, audited `finalized_at` field which is write-once.

  - `verification_job_events` — migration: `migrations/2026-02-14_0002_create_verification_job_events.sql`
    - columns: `id BIGSERIAL PRIMARY KEY`, `job_id UUID REFERENCES verification_jobs(id)`, `event_type TEXT NOT NULL`, `payload jsonb`, `emitted_by TEXT NOT NULL`, `emitted_at timestamptz NOT NULL DEFAULT now()`.
    - Policy: append-only; no DELETE nor UPDATE.

  - `verification_results` — migration: `migrations/2026-02-14_0003_create_verification_results.sql`
    - columns: `id UUID PRIMARY KEY`, `job_id UUID UNIQUE REFERENCES verification_jobs(id)`, `summary jsonb`, `artifact_s3_key TEXT`, `provenance jsonb`, `created_at timestamptz NOT NULL DEFAULT now()`.
    - Policy: write-once per `job_id` (enforce uniqueness and prevent later mutation).

  - `audit_logs` — migration: `migrations/2026-02-14_0004_create_audit_logs.sql`
    - columns: `id BIGSERIAL PRIMARY KEY`, `actor TEXT`, `action TEXT`, `target_type TEXT`, `target_id UUID`, `details jsonb`, `created_at timestamptz DEFAULT now()`.
    - Policy: append-only; retention and archival governed by runbook.

- DB-level enforcement patterns
  - Use DB constraints: `UNIQUE(job_id)` on `verification_results` to ensure write-once semantics.
  - Use triggers to prevent updates/deletes: deploy `AFTER UPDATE`/`BEFORE DELETE` triggers that RAISE EXCEPTION for protected tables unless a special override token present AND operation authenticated as emergency role.
  - Use role-based grants: create DB roles `verification_writer`, `verification_reader`, `verification_admin`. Only `verification_writer` can INSERT; only `verification_admin` may execute emergency override functions (logged to `audit_logs`).
  - Migration location: `forgea-monorepo/apps/schema/migrations/epic-h/` with filenames following `YYYY-MM-DD_NNNN_description.sql`.

4. Application-level enforcement

- Access control model
  - Principle: default-deny. Applications must assert identity with service tokens and map to DB roles.
  - Only the runner orchestration service may insert `verification_jobs` and `verification_job_events` via `verification_writer` role.
  - Result publication flow: runner uploads artifact to S3, then inserts `verification_results` row referencing S3 key in a single transaction (or via two-phase commit pattern with idempotency guard).

- Idempotency & mutation rules
  - `verification_results` must be idempotent by `job_id` — callers must present an idempotency key equal to `job_id` and the insertion must succeed only once.
  - Any attempt to modify or delete rows triggers alerting and requires HARD LOCK owner approval.

- Emergency override path
  - Implement `provisioned` DB function `emergency_modify_verification_result(job_id, payload, approver)` only callable by `verification_admin` role. This function writes an audited entry to `audit_logs` and stores prior state in `verification_result_revisions` table before applying change. All emergency actions must be logged and require out-of-band approvals as described in runbook.

5. Artifact storage & S3 considerations

- S3 buckets: `forgea-verification-artifacts-{env}` with server-side encryption, object versioning enabled, and bucket-level retention/WORM where supported.
- Object key format: `epic-h/{job_id}/{artifact_type}/{sha256}-{timestamp}.gz`
- Upload flow: runner uploads artifact with `x-amz-server-side-encryption` and sets ACL to private. Post-upload, runner records S3 key in `verification_results.provenance.artifact_key` and adds checksum and size.

6. Audit logging schema & provenance linkage

- `audit_logs.details` MUST include canonical provenance fields: `commit_sha`, `job_id`, `runner_id`, `node_id`, `artifact_s3_key`, `actor` and `reason` for action.
- Retention: keep `audit_logs` in Postgres for N days (configurable); export older logs to immutable S3 archive with signed manifest. Default retention: 365 days for detailed logs, 7 years for summaries (subject to legal review).

7. Retention, archival, and deletion policy

- Deletion is forbidden by default (HARD LOCK). Any deletion/expunge requires documented approval from `engineering-security` and must follow runbook steps (signed request, time-window, audit trail).
- Archival: periodic job exports older-than-90-days detailed artifacts to S3 archive location `forgea-verification-archive-{env}` with immutability settings; store manifest in `archive_manifests/YYYY-MM-DD.json` and record manifest id in `audit_logs`.

8. CI & test harness requirements

- Implement tests for append-only behaviour: attempts to UPDATE or DELETE protected tables must fail under normal identity.
- Integration tests: simulate runner upload + result insert flow with idempotent retries and DLQ behaviour.

9. Required deliverables (Implementer)

- Migrations:
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0001_create_verification_jobs.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0002_create_verification_job_events.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0003_create_verification_results.sql`
  - `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0004_create_audit_logs.sql`

- Application code patterns:
  - Runner upload + result publish handler with idempotency guard: `forgea-monorepo/services/verification-runner/src/publish.ts`
  - DB role provisioning scripts: `infra/db/roles/verification_roles.sql`
  - Emergency override function: `forgea-monorepo/apps/schema/migrations/epic-h/2026-02-14_0005_emergency_override_function.sql`

- Runbooks & docs:
  - `/docs/official-docs/EPIC-H/runbooks/runner_persistence_runbook.md`
  - `/docs/official-docs/EPIC-H/policy/immutability_policy.md`

- Tests & CI:
  - `/docs/official-docs/EPIC-H/testing/append_only_tests.md`
  - `tests/epic-h/append_only_spec.ts`

10. Required deliverables (Security-Sentinel)

- Adversarial review doc: `/docs/official-docs/EPIC-H/security/immutability_threat_model.md` — includes privilege analysis and emergency override acceptance criteria.
- CI checks: static analyzer / SQL lint and a CI job ensuring no DELETE/UPDATE statements on protected tables except via approved functions: `.github/workflows/epic-h-protect.yml`.
- Acceptance tests for audit chain: `/docs/official-docs/EPIC-H/testing/audit_integrity_tests.md` and CI job `tests/epic-h/audit_integrity_spec.ts`.

11. Acceptance criteria (summary)

- All migrations present in `forgea-monorepo/apps/schema/migrations/epic-h/` and runnable without destructive operations.
- DB enforces append-only via constraints/triggers; verified by automated tests that attempt forbidden updates/deletes and assert failure.
- Runner publishes artifacts to S3 with versioning and records provenance in `verification_results`; integration test demonstrates idempotent retries.
- Emergency override path exists, audited, and gated by `verification_admin` role with out-of-band approval recorded in `audit_logs`.
- Security-Sentinel sign-off: `immutability_threat_model.md` completed and CI checks pass in PR pipeline.

---

End of planner spec v0.1
