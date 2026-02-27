## FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: FEATURE H11 — Step-Based Verification Support
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma

## REQUIRED OFFICIAL DOCUMENTATION

The following authoritative references must be pinned before implementation.

- Technology: JSON Schema (Step manifest)
  - Concept: `.forgea/steps.json` schema and mapping format
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Canonical format for step definitions and mapping to verification checks.
  - What breaks without it: Divergent step definitions across runner, UI, and verification logic.

- Technology: PostgreSQL DDL & Transaction semantics
  - Concept: Safe DDL, uniqueness constraints, advisory locks and transactional upserts
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Enforce "one verification attempt per step per commit SHA" and transactional persistence for step-state.
  - What breaks without it: Race conditions, duplicate/verging step-state, and inconsistent enforcement.

- Technology: Pathspec / Glob semantics
  - Concept: File-to-step mapping semantics (locked paths, step file globs)
  - Official source: Choose implementation (gitignore / minimatch / pathspec) and pin
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Deterministic mapping from changed files to affected steps for triggering verification.

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md
  - Coverage status: SUFFICIENT
  - Notes: Orchestrator analysis and required agents for H11.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md
  - Coverage status: SUFFICIENT
  - Notes: Master task list enumerating H11 tasks (mapping, sequential enforcement, step persistence).

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: Describes `.forgea/steps.json` but lacks verification-specific mapping format and API contracts.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: No `VerificationStep`/`StepVerification` or `LabAttempt` models present to persist per-step state.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Reason: Multiple docs reference step-based design, but verification-specific mapping, state-machine, DB contract, and API surface are missing. Implementation must not proceed without these artifacts to avoid divergence and security risk.

## STUDY GUIDE FOR HUMAN

- Why step-level verification exists: Enforce granular, ordered verification tied to named lab steps to prevent bypass and to provide actionable feedback.
  - Alternatives: Per-session-only verification (coarser, less helpful).
  - When NOT to use: Very small labs where steps are unnecessary.
  - Common mistakes: Storing per-step state only in-memory or on session object without atomicity; allowing out-of-order marking.

- Why a ledger/unique constraint is required: To guarantee idempotency and one-record-per-step-per-commit semantics, preventing replay/duplicate checks.
  - Mistakes: Relying solely on application-level locks; not pinning uniqueness keys to commit SHA + step name.

## INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/step_verification_mapping.md
  - Purpose: Define the JSON mapping format linking `.forgea/steps.json` step names to verification checks (IDs), with sample mapping JSON.
  - Exact knowledge to add: sample mapping, schema, and versioning rules.
  - Required version pin: JSON Schema 2020-12.

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/step_verification_state_model.md
  - Purpose: Persistence contract for per-step verification state; model(s) to add to `forgea-monorepo/packages/schema/prisma/schema.prisma`.
  - Exact knowledge to add: Proposed Prisma model `StepVerification` (fields, types, nullability, indexes, FKs), uniqueness constraints (`commitSha`, `stepName`, `attemptId`), and retention guidance.
  - Required version pin: PostgreSQL DDL guidance.

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-H/step_api_contracts.md
  - Purpose: API surface for marking step verification requests, reporting results, querying step-level state, and rejecting out-of-order attempts.
  - Exact knowledge to add: endpoint shapes, idempotency keys, auth scopes, and example payloads.

## OPEN QUESTIONS / AMBIGUITIES

- Should per-step state be stored on `LabAttempt` or a dedicated `StepVerification` table? (affects uniqueness/indexing and retention)
- Exact idempotency key composition for step verification requests (commitSha+stepName+sessionId vs deliveryId).
- Retention policy for per-step artifacts and logs.

## MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md` (new):

- Epic / Feature: EPIC-H / H11 — Step-Based Verification Support
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for step-based verification.
