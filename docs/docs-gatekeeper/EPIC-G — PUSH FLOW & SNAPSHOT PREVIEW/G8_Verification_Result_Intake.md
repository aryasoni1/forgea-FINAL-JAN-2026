FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G8 — Verification Result Intake
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G8_Verification_Result_Intake.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/task-B6-2026-02-13.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Machine-readable schema for verification intake and persistent records
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (recommend 2020-12)
  - Why required: Provides a canonical payload contract and persistent-record contract for implementers and CI.
  - Decision informed: Field types, required/optional fields, and validation rules.
  - What breaks without it: Divergent ingestion shapes and incompatible consumers.

- Technology: HTTP Semantics (RFC 7231)
  - Concept: Expected response codes and retry semantics
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Determines duplicate handling behavior and when to surface retries vs permanent failures.
  - Decision informed: Whether to return 2xx on duplicates or 5xx to trigger retries.

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md
  - Coverage status: PARTIAL
  - Exact gaps: Notes `VerificationLog` exists and must be reconciled with `LabAttempt` ledger; lacks canonical persistent schema.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md
  - Coverage status: PARTIAL
  - Exact gaps: References `VerificationLog` fields but lacks intake contract and retention/truncation rules.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/task-B6-2026-02-13.md
  - Coverage status: PARTIAL
  - Exact gaps: Proposes `VerificationAttempt` schema suggestions but not canonicalized or machine-readable.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:

- `/docs/schemas/verification_result_intake.schema.json` — add formal JSON Schema and example payload; required for implementer validation and CI contracts.
- `/docs/official-docs/EPIC-G/verification_attempt.md` — canonical persistent record (`VerificationAttempt`) schema, immutability notes, and indexes.
- `/docs/official-docs/EPIC-G/verification_result_enum.md` — canonical `VerificationResult` enum and semantics.
- `/docs/official-docs/EPIC-G/verification_status_transitions.md` — state transition table distinguishing transient vs persisted states and allowed transitions.
- `/docs/official-docs/EPIC-G/verification_intake_endpoint.md` — intake endpoint contract (headers, auth, idempotency, duplicate handling, example requests/responses).
- `/docs/official-docs/EPIC-G/verification_log_retention.md` — retention, truncation, sanitization, and archival rules for verification logs.

STUDY GUIDE FOR HUMAN (concise)

- VerificationAttempt persistent model:
  - Why: Provides append-only audit trail of verification attempts for `LabAttempt` reconciliation and observability.
  - Alternatives: Store results only on job queue — insufficient for audit and historical display.
  - When NOT to use: High-volume ephemeral checks where storing full logs is cost-prohibitive; prefer truncated summaries.
  - Common mistakes: Omitting index on `[sessionId, createdAt]`, not truncating logs, and allowing non-immutable updates.

- VerificationResult enum:
  - Why: Avoids drift across services and provides explicit semantics for PASS/FAIL and potential other terminal states.
  - Alternatives: Freeform status strings (leads to mismatches).
  - Common mistakes: Using transient job states as persisted terminals.

- Intake endpoint contract:
  - Why: Ensures idempotency, authentication, and predictable behavior on retries/duplicates.
  - Common mistakes: Not providing idempotency or failing to verify payload authenticity before persisting logs.

INTERNAL DOCS TO ADD OR EXTEND (detailed)

- Path: /docs/schemas/verification_result_intake.schema.json
  - Purpose: JSON Schema for intake payload and example payload
  - Exact knowledge to add: fields (sessionId, commitSha, verifierId, result, startedAt, finishedAt, logs, metadata), required/optional, and examples.
  - Required version pin: JSON Schema spec (2020-12 recommended)

- Path: /docs/official-docs/EPIC-G/verification_attempt.md
  - Purpose: Persistent `VerificationAttempt` record schema (DDL/Prisma-style), immutability rules (append-only), indexes (sessionId+createdAt), and audit fields.
  - Exact knowledge to add: `id UUID PK`, `sessionId UUID`, `commitSha text`, `result enum`, `logs jsonb`, `createdAt timestamptz`, `durationMs int`, `verifierId`, indexes and retention guidance.

- Path: /docs/official-docs/EPIC-G/verification_result_enum.md
  - Purpose: Canonical enum listing allowed values and semantics (e.g., `PASS`, `FAIL`, `SKIPPED`, `CANCELLED` if applicable) and mapping to UI labels.
  - Exact knowledge to add: Value definitions and recommended canonical location for imports/shared types.

- Path: /docs/official-docs/EPIC-G/verification_status_transitions.md
  - Purpose: State transition diagram/table for transient vs persisted states and retry handling.
  - Exact knowledge to add: allowed transitions, duplicate handling, and idempotency expectations.

- Path: /docs/official-docs/EPIC-G/verification_intake_endpoint.md
  - Purpose: Intake endpoint contract: route, expected headers/auth, HMAC/broker auth requirement, idempotency key rules, responses on duplicate.
  - Exact knowledge to add: required headers (`X-Request-Id`/`X-Verification-Id` fallback), auth expectations, 200-on-duplicate policy, and example request/response.

- Path: /docs/official-docs/EPIC-G/verification_log_retention.md
  - Purpose: Define truncation rules for `logs` (size cutoffs, sensitive-data sanitization), TTLs for detailed logs vs summary (e.g., 30d/365d), archival rules, and export formats.
  - Exact knowledge to add: sanitization checklist, truncation algorithm, TTL values (policy decision), and export channels.

OPEN QUESTIONS / AMBIGUITIES

- TTL values and archival windows are not specified (policy decision required: e.g., 30 days detailed logs, 3 years summary).
- Whether non-PASS/FAIL terminal values are required (e.g., `SKIPPED`, `CANCELLED`) — task notes defaulted to PASS/FAIL.

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G8 — Verification Result Intake
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G8_Verification_Result_Intake.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required schema artifacts, enum, state transitions, intake contract, and retention policies for G8.
