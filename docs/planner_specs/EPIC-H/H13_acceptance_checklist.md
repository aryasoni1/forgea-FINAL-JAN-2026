# H13 Acceptance Checklist — Implementer & Integration-Checker

Exact files and tests the Implementer and Integration-Checker MUST produce for acceptance.

Implementer deliverables (exact paths):

- Middleware & handlers:
  - `forgea-monorepo/services/gateway/src/middleware/enforceInvariants.ts`
  - `forgea-monorepo/services/preview-service/src/handlers/servePreview.ts`
  - `forgea-monorepo/services/verification-service/src/jobs/createJob.ts`
  - `forgea-monorepo/services/verification-runner/src/publish.ts`

- Tests & CI:
  - `tests/epic-h/invariants_spec.ts` — implements Test A–E from spec.
  - `.github/workflows/epic-h-invariants.yml` — CI job executing invariants tests on PRs.

- Docs & harness:
  - `docs/official-docs/EPIC-H/testing/invariants_test_harness.md` — harness setup and runbook for Integration-Checker.

Integration-Checker deliverables (exact paths):

- Test implementation:
  - `tests/epic-h/invariants_spec.ts` — must be authored by Implementer but verified and extended by Integration-Checker.
  - `docs/official-docs/EPIC-H/testing/invariants_test_harness.md` — includes scripts, env vars, and sample fixtures.

Acceptance checks (mapped to tests):

- `verification-before-preview`: Verified by `tests/epic-h/invariants_spec.ts::Test A` (happy path) and `::Test B` (blocked path). Gate: preview requests must return 412 when verification missing.
- `one-active-job-per-session`: Verified by `::Test C`. Gate: concurrent creates result in single accepted job and 409/dedup response for second.
- `idempotent-publish` and `result-immutability`: Verified by `::Test D` and DB inspection; gate: single `verification_results` row per `job_id` and immutable except via override.
- `override auditing`: Verified by `::Test E`; gate: `audit_logs` contains `approver`, `reason`, and `workflow_id` entries for overrides.

CI policy:

- PRs touching files in `services/gateway`, `services/preview-service`, `services/verification-service`, or `services/verification-runner` must run `.github/workflows/epic-h-invariants.yml` and pass.

Notes:

- All file paths are exact; acceptance reviewers will look for these files in the PR. Any deviation requires pre-approval from `engineering-security`.
