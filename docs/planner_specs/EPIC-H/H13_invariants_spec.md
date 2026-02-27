---
id: EPIC-H.H13
title: H13 Safety & Invariants — verification-runner
version: 0.1
owner: HARD_LOCK:engineering-security
approved_by: HARD_LOCK:owner TODO (must be pinned before implementation)
---

# H13 Safety & Invariants — Planner Spec

Purpose: Provide a machine-readable invariants specification for the verification system, enumerate enforcement locations, failure semantics, test harness definitions for Integration-Checker, and override policy tied to the HARD LOCK owner.

1) Canonical invariants

- `verification-before-preview`: A lab preview may not be served to end-users unless a matching `VerificationResult` for the previewed commit SHA exists and is `PASS` (or allowed by an explicit HARD LOCK override).
- `one-active-job-per-session`: Only one active verification job may be queued or running for a given `lab_session_id` (duplicate job creation attempts are deduplicated or rejected).
- `commit-sha-single-source-of-truth`: All verification and preview flows must reference a single canonical `commit_sha` parameter; when present it must be authoritative for snapshot matching and gating.
- `idempotent-publish`: Runner result publication must be idempotent by `job_id` (retries must not produce duplicate results nor race to inconsistent state).
- `result-immutability`: Once a `VerificationResult` is published for a `job_id`, it is immutable except via an audited emergency override path.
- `retry-and-lock-rules`: Consumer services must implement optimistic concurrency / advisory locks for verification job claiming, with documented backoff and DLQ semantics.

2) Enforcement points & failure semantics

- `API Gateway / Middleware` (global enforcement)
  - File/impl point: `forgea-monorepo/services/gateway/src/middleware/enforceInvariants.ts`
  - Responsibilities: Validate incoming preview requests for `verification-before-preview` and `commit-sha-single-source-of-truth`, reject if guard fails.
  - Failure semantics: HTTP 412 Precondition Failed (when verification missing), HTTP 409 Conflict (when one-active-job-per-session violated), include machine-readable error body with `error_code` and `required_action`.

- `Preview Service` (preview-serving microservice)
  - File/impl point: `forgea-monorepo/services/preview-service/src/handlers/servePreview.ts`
  - Responsibilities: Double-check `VerificationResult` existence and `PASS` status before serving; fallback to 412 if not met.
  - Failure semantics: HTTP 412 Precondition Failed with `verification_required` error_code.

- `Verification Service / Runner API`
  - File/impl point: `forgea-monorepo/services/verification-service/src/jobs/createJob.ts` and `forgea-monorepo/services/verification-runner/src/publish.ts`
  - Responsibilities: Enforce `one-active-job-per-session` at enqueue time (atomic insert or dedupe), enforce `idempotent-publish` on result insertion, and ensure `result-immutability` by using write-once patterns.
  - Failure semantics: HTTP 409 Conflict on duplicate job creation; HTTP 409 or 423 Locked when publish races or attempts mutation.

- `Database` (defensive enforcement)
  - File/impl point: migrations and DB triggers: `forgea-monorepo/apps/schema/migrations/epic-h/*` (see H8 spec)
  - Responsibilities: Enforce uniqueness, prevent UPDATE/DELETE on protected tables, and log override attempts.
  - Failure semantics: SQL error (raise exception) surfaced as 500-level service error; services must map to 423 or 409 as appropriate.

- `Integration-Checker harness` (tests)
  - File/impl point: `tests/epic-h/invariants_spec.ts` and `docs/official-docs/EPIC-H/testing/invariants_test_harness.md`
  - Responsibilities: Execute defined test flows and assert invariants hold under normal and adversarial sequences.

3) Test harness specification (Integration-Checker)

Provide deterministic test flows (request sequences) and expected states. Each test must be automatable and runnable in CI against a test deployment or local environment.

- Test A: verification-before-preview (happy path)
  - Steps:
    1. Create a `lab_session` and push commit SHA `shaA`.
    2. Enqueue verification job for `shaA` and simulate runner publishing `PASS` for `job_id`.
    3. Request preview for same `lab_session` and `shaA`.
  - Assertions: preview request returns 200 and content; middleware allowed request because `VerificationResult` exists and is `PASS`.

- Test B: verification-before-preview (blocked path)
  - Steps:
    1. Create `lab_session` with `shaB` without enqueuing or finishing verification.
    2. Request preview for `shaB`.
  - Assertions: preview request returns 412 Precondition Failed with `verification_required` error_code.

- Test C: one-active-job-per-session (concurrency)
  - Steps:
    1. Concurrently send two create-job requests for same `lab_session`.
  - Assertions: exactly one job is accepted/created; second request returns 409 Conflict or is deduped (client-visible idempotency token returned).

- Test D: idempotent-publish (retries)
  - Steps:
    1. Simulate runner uploading artifact and calling publish endpoint twice with same `job_id` (network retry).
  - Assertions: publish endpoint returns success on first call and idempotent success/200 on retry without creating duplicate `verification_results` rows.

- Test E: override auditing
  - Steps:
    1. As `verification_admin` execute emergency override function to change a result.
  - Assertions: override succeeds only with `verification_admin` role, previous state recorded in `verification_result_revisions`, and `audit_logs` contains approver and reason fields.

4) Override policy (HARD LOCK owner & process)

- HARD LOCK owner: `engineering-security` — only this team may update approved override authority list.
- Emergency bypass authority: `verification_admin` role (service account or human-operated role). Individuals must be approved by `engineering-security` and recorded in runbook.
- Override workflow: Submit signed request (JIRA/ticket or signed email) with reason & approver; execute `emergency_modify_verification_result` DB function (or orchestration API) that requires `approver` parameter and records full context in `audit_logs`.
- Audit fields required for overrides: `actor`, `approver`, `approver_signature` (or ticket id), `timestamp`, `job_id`, `old_value_checksum`, `new_value_checksum`, `reason`, `workflow_id`.

5) Acceptance criteria & required files (Implementer)

- Middleware & service handlers (exact paths):
  - `forgea-monorepo/services/gateway/src/middleware/enforceInvariants.ts` — checks `verification-before-preview` and `commit-sha-single-source-of-truth`.
  - `forgea-monorepo/services/preview-service/src/handlers/servePreview.ts` — double-checks verification before serving.
  - `forgea-monorepo/services/verification-service/src/jobs/createJob.ts` — idempotent enqueue with `one-active-job-per-session` enforcement.
  - `forgea-monorepo/services/verification-runner/src/publish.ts` — idempotent publish and detection of conflicting publishes.

- Test harness & CI (exact paths):
  - `tests/epic-h/invariants_spec.ts` — integration test implementing Test A–E above.
  - `docs/official-docs/EPIC-H/testing/invariants_test_harness.md` — test harness run instructions and environment setup.
  - `.github/workflows/epic-h-invariants.yml` — CI workflow that runs invariants tests on PRs.

6) Acceptance criteria (checks)

- Middleware present and wired into gateway; unit tests cover guard logic.
- Preview service rejects unverified previews (412) and logs reason with `commit_sha` and `job_id` where applicable.
- Verification enqueue rejects concurrent duplicates or dedupes; demonstrated via `tests/epic-h/invariants_spec.ts` Test C.
- Publish idempotency validated via Test D; DB shows single `verification_results` row per `job_id`.
- Emergency override path implemented and audited as per fields above; Security-Sentinel must sign off.

7) Open questions / blockers

- Confirm canonical HARD LOCK owner contact and list of approvers.
- Confirm exact HTTP error mapping policy (412 vs 409 vs 423) to align with other services.
- Confirm names and locations of gateway and preview service repositories to place middleware.

---

End of H13 invariants spec v0.1
