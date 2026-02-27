# Feature Docs Brief — F6_Lab_Session_Binding

## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F6_Lab_Session_Binding
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md
  - /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md
  - /forgea-monorepo/packages/schema/prisma/schema.prisma
  - /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - /forgea-monorepo/packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql
  - /forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts
  - /forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts

## REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks & Events

- Concept: Webhook payload fields and event semantics (push, repository)
- Official source: https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines canonical provider fields (`repository.id`, `repository.html_url`) used by webhook handlers to map pushes to sessions and validates payload stability.
- Decision it informs: Whether to rely on `repository.id` (numeric provider id) vs `repository.html_url` string for canonical mapping; informs webhook schema validation and retry/backoff handling.
- What breaks without it: Incorrect or brittle session binding, missed events, inability to safely build indexed lookups.

2. Technology: GitHub REST API (Repositories)

- Concept: Repo creation, template instantiation, repo metadata (repo_id type, html_url), authentication scopes.
- Official source: https://docs.github.com/en/rest/repos/repos#get-a-repository
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Guides atomic repo-creation semantics, idempotency key design, and which provider fields are stable and indexable.
- Decision it informs: API contract for creating forks/templates and rollback semantics when repo creation fails.
- What breaks without it: Ambiguous repo-id specification, inconsistent lookup keys, and fragile operational procedures.

3. Technology: Prisma (ORM)

- Concept: Schema, migrations, recommended migration patterns and constraints handling.
- Official source: https://www.prisma.io/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Confirms supported DDL, `ON DELETE` semantics, and transactional migration support required for backfill/migration plans.
- Decision it informs: How to implement `labVersionId` FK, add append-only `VerificationAttempt` rows, and safe migration ordering.
- What breaks without it: Risk of incompatible migration strategies or unsupported DDL in current Prisma version.

4. Technology: PostgreSQL (Triggers & Transactions)

- Concept: Trigger/function behavior, concurrency semantics, isolation levels, and advisory locks.
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Current DB-level lifecycle trigger exists; need to validate trigger semantics, safe backfill ordering, and transactional guarantees for mapping table creation.
- Decision it informs: Whether DB-level lifecycle guard must be temporarily relaxed or migrated during rollout.
- What breaks without it: Migration deadlocks, rejected updates, and inconsistent lifecycle enforcement across rollout phases.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md
  - Coverage status: PARTIAL
  - Exact gaps: Lacks canonical `LabVersion` model, append-only `VerificationAttempt` rows, and concrete `GitHubRepoMapping` design; missing explicit session-creation API contract and operational runbook.

- /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md
  - Coverage status: PARTIAL
  - Exact gaps: Accurately enumerates current schema and risks (string-based mapping) but does not provide canonical Prisma model snippets, migration checklist, or backfill strategy.

- /forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL (code exists but no canonical doc)
  - Exact gaps: `LabSession` lacks `labVersionId` FK; `VerificationLog` uniqueness prevents multi-attempts; no `GitHubRepoMapping` model present.

- /forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts
  - Coverage status: PARTIAL
  - Exact gaps: Lifecycle logic implemented but not surfaced as a formal state-machine doc mapping to DB trigger; missing preconditions and side-effect expectations for external systems.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:

- `/docs/official-docs/EPIC-F/lab-session-data-model.md` — Add canonical Prisma model revision (include `labVersionId`, `completedAt`, `labSession` indexes, `GitHubRepoMapping`), ON DELETE semantics, immutability guarantees for `completedAt`, and verification record constraints. Required to avoid ambiguous schema migrations.
- `/docs/official-docs/EPIC-F/lab-session-lifecycle.md` — Formalize `LabStatus` state machine, allowed transitions, preconditions, and mapping to DB trigger and `transitionLabSession(...)`. Required to align implementer and DB trigger expectations.
- `/docs/official-docs/EPIC-F/github-repo-mapping.md` — Define `GitHubRepoMapping` table, canonical lookup keys, indexing, and backfill strategy. Required before webhook resolution change.
- `/docs/official-docs/EPIC-F/session-creation-api.md` — API contract for atomic repo creation + session creation including idempotency, rollback semantics, and error codes.
- `/docs/official-docs/EPIC-F/migration-backfill-guidance.md` — Stepwise migration checklist and safety checks for backfilling mapping table and adding `labVersionId`.

## STUDY GUIDE FOR HUMAN

- `LabVersion` model:
  - Why: Provides immutable reference to a published lab version for reproducible sessions.
  - Alternatives: Retain `labId` only (simpler) vs add `labVersionId` (recommended for reproducibility).
  - When NOT to use: Highly dynamic labs that never publish immutable versions (rare).
  - Mistakes: Replacing `labId` with `labVersionId` and losing link to `Lab` ownership; not enforcing equality guards when both exist.

- `VerificationAttempt` append-only rows:
  - Why: Maintain immutable audit of multiple verification attempts per session.
  - Alternatives: Single `VerificationLog` row (current, but prevents multi-attempts).
  - When NOT to use: If verification is atomic and always single-shot (not our case).
  - Mistakes: Using unique `sessionId` on verification table; overwriting previous attempts.

- `GitHubRepoMapping` table:
  - Why: Canonical, indexed mapping from provider `repo_id` (BigInt) to `labSessionId` for robust webhook resolution.
  - Alternatives: Keep string-based `userForkUrl` match (brittle).
  - When NOT to use: Prototype/demo only; use mapping for production.
  - Mistakes: Using `repoUrl` as primary lookup key (string variations) instead of provider `repo_id`.

- Lifecycle state machine:
  - Why: Ensures DB trigger and app-level `transitionLabSession(...)` agree on allowed moves and preconditions.
  - Alternatives: Soft state with application-only enforcement (we currently have DB trigger; keep it).
  - Mistakes: Mismatch between trigger and application logic; not documenting terminal states.

## INTERNAL DOCS TO ADD OR EXTEND

Only those below are required to move forward (paths under `/docs/official-docs/`):

- `/docs/official-docs/EPIC-F/lab-session-data-model.md`
  - Purpose: Canonical Prisma `LabSession`, `LabVersion`, `VerificationAttempt`, `GitHubRepoMapping` model snippets, indexes, and FK `ON DELETE` semantics.
  - Exact knowledge to add: Prisma model snippets, SQL index recommendations, immutability constraints for `completedAt` and verification rows, and recommended `ON DELETE` behaviors.
  - Required version pin: Prisma version used by repo (PIN REQUIRED)

- `/docs/official-docs/EPIC-F/lab-session-lifecycle.md`
  - Purpose: Formal state machine document mapping `LabStatus` values to DB trigger rules and `transitionLabSession(...)` API.
  - Exact knowledge to add: Transition table, allowed preconditions, terminal states, and concurrency guards.
  - Required version pin: PostgreSQL version used by repo (PIN REQUIRED)

- `/docs/official-docs/EPIC-F/github-repo-mapping.md`
  - Purpose: Design for `GitHubRepoMapping` table, lookup keys, index strategy, and webhook lookup algorithm.
  - Exact knowledge to add: Backfill SQL, idempotent insert patterns, recommended indices on `providerRepoId` (BigInt), and lookup fallback to `userForkUrl` while backfill runs.
  - Required version pin: GitHub REST API/Webhooks (PIN REQUIRED)

- `/docs/official-docs/EPIC-F/session-creation-api.md`
  - Purpose: API contract for creating LabSession + provider repo together.
  - Exact knowledge to add: Route, request/response JSON shapes, idempotency keys, error codes, and expected retries/rollback semantics.
  - Required version pin: GitHub REST API (PIN REQUIRED)

- `/docs/official-docs/EPIC-F/migration-backfill-guidance.md`
  - Purpose: Step-by-step migration and backfill plan for adding `labVersionId`, `VerificationAttempt`, and `GitHubRepoMapping` without breaking webhooks or inflight sessions.
  - Exact knowledge to add: SQL migration order, safe backfill windows, verification queries, feature-flag gating, and rollback steps.
  - Required version pin: PostgreSQL and Prisma versions (PIN REQUIRED)

## OPEN QUESTIONS / AMBIGUITIES

- Should `LabSession` retain `labId` in addition to adding `labVersionId`, or replace it? (Architect decision; recommend retain both and enforce equality guard.)
- Is a strict `GitHubRepoMapping` table required before switching webhook resolution logic, or can mapping be introduced in a phased backfill with fallback to `userForkUrl`? (Recommend phased backfill.)
- What exact Prisma and PostgreSQL versions are pinned for this repo? (Required to finalize migration SQL and locking strategies.)

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F6 — Lab Session Binding
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for lab session binding, repo mapping, lifecycle, and migration guidance.

---

END OF BRIEF
