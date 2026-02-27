FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F6_Lab_Session_Binding
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md

TASKS CHECKED

- Planner / Architect — Define LabSession schema, DB linkages, and lifecycle state machine.
- Implementer — Implement LabSession creation API, link to user and lab IDs, and persist repo URL and status.
- QA / Tester — Validate DB constraints and concurrent session safety.
- Integration Checker — Exercise session creation and verify stored metadata.
- Documenter — Document LabSession schema and lifecycle states.

WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `LabSession` model exists with fields including `id`, `userId`, `labId`, `status` (enum `LabStatus`), `userForkUrl`, `previewUrl`, `startedAt`, and `lastActivityAt`. It relates to `User` and `Lab` with `onDelete: Restrict`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql — DDL creating `LabSession` table and foreign keys linking to `User` and `Lab`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql — Database trigger/function enforcing allowed LabSession lifecycle transitions.
- /forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts — Application-level lifecycle rules and `transitionLabSession(...)` function implementing allowed transitions and concurrency guards.
- /forgea-monorepo/packages/schema/prisma/seed.ts — Seed script creates `LabSession` test rows and calls `transitionLabSession(...)`.
- /forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts — Webhook handler locates active `LabSession` by matching `repository.html_url` to `LabSession.userForkUrl`, writes audit entries and updates session status via `transitionLabSession(...)`.
- /forgea-monorepo/packages/audit/src/audit.service.ts — Audit service includes `labSessionId` metadata support used by webhook and lifecycle code.

WHAT IS PARTIALLY IMPLEMENTED

- Lifecycle enforcement: Both DB-level trigger and application-level `transitionLabSession` exist, enforcing allowed state transitions and guarding concurrent updates.
- Webhook → session binding: The GitHub webhook handler resolves a `LabSession` by `userForkUrl` (string match) and updates session state on push events; this provides runtime binding but relies on string matching rather than an explicit repo-mapping table.
- Seed & tests: `seed.ts` exercises session creation and transitions, but CI/test assertions are not full coverage (seed exercises behavior but tests referencing this are sparse).

WHAT IS MISSING

- Formal `LabVersion` linkage: Repository evidence shows `LabSession` links to `Lab` but not to a `LabVersion` model; tasks and docs recommend adding `LabVersion` and a `labVersionId` FK (Not found).
- `VerificationAttempt` multi-row model: Current schema has `VerificationLog` with a unique `sessionId` preventing multiple attempts; a multi-attempt `VerificationAttempt` model is not present (Not found / partial per docs).
- Explicit `GitHubRepoMapping` table: No dedicated table mapping provider repo IDs to `LabSession` exists; webhook handler uses `userForkUrl` string matching instead (Not found).
- API for LabSession creation: While seed scripts and lifecycle helpers exist, there isn't a single documented API endpoint in the repo explicitly labeled as the session-creation API for the GitHub integration (Not found as a named API route).
- Operational docs/runbook: No single operational document describing creating sessions, rollback semantics when repo creation fails, or how to atomically create LabSession + repo (Not found).

RISKS OR CONFLICTS

- String-based session mapping: Using `userForkUrl` string equality to bind pushes to `LabSession` risks brittle matching (URL formatting differences, trailing slashes), and lacks canonical provider `repo_id` indexing for fast lookups.
- Missing `LabVersion` and multi-attempt verification: Without `LabVersion` and append-only `VerificationAttempt` rows, reproducibility and immutable audit trails are incomplete.
- DB-level triggers + application expectations: Migration enforces lifecycle transitions; implementers must coordinate schema changes carefully to avoid deadlocks or rejected updates during parallel rollout.

QUESTIONS FOR CLARIFICATION

- Should `LabSession` retain `labId` while adding `labVersionId` (docs/tasks recommend yes) or replace it? If retaining, confirm DB-enforced equality guard is desired.
- Is a strict `GitHubRepoMapping` table required before changing webhook resolution logic, or can mapping be introduced in a phased backfill?

NEXT AGENT HANDOFF PROMPT (for Planner / Architect)

Reference this report at docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F6_Lab_Session_Binding.md.

You are the Planner / Architect for Feature `F6_Lab_Session_Binding`. Produce the following artifacts (do not implement):
- Canonical `LabSession` data model revision: list fields to keep, add (e.g., `labVersionId`, `completedAt`), types, indexes, and FK behavior. Specify `ON DELETE` semantics and immutability constraints required for `completedAt` and verification records.
- Lifecycle state machine: enumerate `LabStatus` values, allowed transitions, terminal states, and preconditions for transitions. Reference existing `transitionLabSession(...)` and DB trigger when describing gaps.
- Repo-to-session mapping design: choose (and document) whether to introduce a `GitHubRepoMapping` table with `providerRepoId` (BigInt) + `repoUrl` + `labSessionId` and the backfill strategy using existing `LabSession.userForkUrl` and `Lab.baseRepoUrl` fields. Provide the exact lookup keys webhook handlers should use.
- Session creation API contract: define the API surface (route, request/response shapes), idempotency keys, and atomicity requirements for creating a repo and LabSession together. Include rollback semantics when repo creation fails.
- Migration & backfill guidance: step-by-step migration plan to add `labVersionId`, `VerificationAttempt`, and `GitHubRepoMapping` without breaking running webhooks or inflight sessions; describe verification steps and safety checks.

Deliver outputs as machine-readable fragments where possible: updated Prisma model snippets, lifecycle transition table, and a short migration checklist. Reference application artifacts: `packages/schema/prisma/schema.prisma`, `packages/schema/src/lab-session-lifecycle.ts`, `apps/forgea-labs/app/api/webhooks/github/route.ts`, and `packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql`.

Handoff complete. Provide this report verbatim to the next agent.
