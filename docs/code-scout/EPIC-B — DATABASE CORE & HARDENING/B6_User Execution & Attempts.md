### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B6 — User Execution & Attempts
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

43. Create `LabSession` table
44. Link `LabSession` to `User`
45. Link `LabSession` to `LabVersion`
46. Add status enum (IN_PROGRESS, VERIFIED_PASS, FAILED)
47. Add start and completion timestamps
48. Create `VerificationAttempt` table
49. Link `VerificationAttempt` to `LabSession`
50. Store commit SHA for each attempt
51. Store verification result (PASS, FAIL)
52. Store logs as JSON
53. Add created timestamp

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `LabSession` model exists with fields: `id`, `userId`, `labId`, `status` (enum `LabStatus`), `userForkUrl`, `previewUrl`, `startedAt`, and `lastActivityAt`. It relates to `User` and `Lab` (`onDelete: Restrict`).
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `VerificationLog` model exists (commented as immutable record) with fields: `id`, `sessionId` (unique), `commitSha`, `prDiff` (Text), `ciOutput` (Text), and `verifiedAt` (DateTime @default(now())). It references `LabSession` via `sessionId`.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `ResumeBullet` model exists similarly linked to `LabSession`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql — migration addressing LabSession lifecycle guards is present.
- /forgea-monorepo/packages/schema/prisma/migrations/*immutability*_*/migration.sql — immutability trigger migrations exist elsewhere in the migrations folder (e.g., `add_immutability_triggers`, `add_auditlog_immutability_trigger`), indicating immutability policy is in use for certain tables.

---

### WHAT IS PARTIALLY IMPLEMENTED

- `LabSession` exists and is linked to `User` (tasks 43 and 44 satisfied). However, it links to `Lab` by `labId` not to a `LabVersion` (task 45 not satisfied).
- Status enum: `LabStatus` exists but its values are (`IN_PROGRESS`, `STUCK`, `VERIFIED_PASS`, `DEFERRED`) and do not exactly match the requested set (`IN_PROGRESS`, `VERIFIED_PASS`, `FAILED`). (task 46 partially satisfied).
- Start timestamp exists as `startedAt`; a dedicated completion timestamp (e.g., `completedAt`) is not present. `lastActivityAt` exists but does not substitute for an explicit completion timestamp (task 47 partially satisfied).
- `VerificationLog` appears to implement several verification-tracking responsibilities (commit SHA, diff, CI output, verified timestamp), overlapping with the requested `VerificationAttempt` concept (tasks 48–52 partially implemented). Notably:
  - `commitSha` is present (task 50 satisfied).
  - `prDiff` and `ciOutput` are stored as `Text`, not JSON; storing logs as JSON is not implemented exactly as requested (task 52 partially satisfied).
  - There is no explicit `result` or `status` field (PASS/FAIL) on `VerificationLog` (task 51 missing).
  - `VerificationLog.sessionId` is unique, implying a 1:1 relationship between session and verification record rather than supporting multiple attempts per session (task 49 partially satisfied/contradicted by uniqueness constraint).
  - `verifiedAt` exists but there is no separate `createdAt` field; `verifiedAt` likely acts as the event timestamp but differs from the requested `created` timestamp (task 53 partially satisfied).

---

### WHAT IS MISSING

- `LabVersion` model/table and a `labVersionId` relation on `LabSession` linking sessions to a specific `LabVersion` snapshot (task 45).
- Explicit `completedAt` (or `finishedAt`) timestamp on `LabSession` to record completion time separate from `lastActivityAt` (task 47).
- A `VerificationAttempt` model (or renaming/extension of existing `VerificationLog`) that supports multiple attempts per `LabSession` (task 48 & 49). Current `VerificationLog.sessionId` is unique, preventing multiple attempts per session.
- A `result`/`status` enum or field (e.g., PASS/FAIL) on the verification record (task 51).
- Structured JSON storage for logs where requested (task 52) — current `prDiff` and `ciOutput` are `Text`; JSON column(s) are not present.
- A distinct `createdAt` timestamp on verification attempts if `verifiedAt` is insufficient (task 53).

---

### RISKS OR CONFLICTS

- Naming/semantics mismatch: repo uses `VerificationLog` (immutable, 1:1 with session) while EPIC expects `VerificationAttempt` (multiple attempts per session). Introducing a new model will require migration or reconciliation with existing `VerificationLog` data.
- Uniqueness constraint on `VerificationLog.sessionId` prevents storing multiple attempts per session — changing this requires careful migration and data-backfill.
- Immutability triggers already exist in migrations; adding or altering verification records requires coordinating with immutability policies and migration triggers to avoid conflicts with the HARD LOCK policy.
- `LabSession` currently references `Lab` not `LabVersion`; adding a `labVersionId` may require backfilling from existing `repoVersion`/`baseRepoUrl` fields and deciding the canonical source of truth for session -> lab snapshot mapping.

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B6 — User Execution & Attempts (EPIC-B). Use this code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B6_User Execution & Attempts.md as the source of truth. Produce the authoritative task document for Feature B6 under /docs/tasks/ following the repository's task document structure. Base the task document on EPIC-B tasks 43–53 and the existing Prisma schema (`LabSession`, `VerificationLog`, `ResumeBullet`, migrations). Your task document must:

- Reconcile `VerificationLog` with the requested `VerificationAttempt` concept: either extend/rename the existing model or create a new model. Specify exact schema changes (field names, types, enums, uniqueness constraints) needed to support multiple attempts per session and a `result` field.
- Specify adding `LabVersion` and linking `LabSession` to `LabVersion` (field name, type, FK behavior), and backfill/migration guidance using existing `repoVersion`/`baseRepoUrl` where applicable.
- Define required timestamp fields (`completedAt`, `createdAt`) and the exact semantics for each.
- Specify whether verification logs should be stored as `Text` or `Json` and where; include migration/backfill notes for existing `prDiff`/`ciOutput` data.
- Identify DB-level constraints and immutability triggers that must be added or updated (e.g., remove unique constraint on `sessionId` if supporting multiple attempts, immutability for verification snapshots), and include explicit migration safety notes referencing existing immutability triggers in migrations.
- Provide an acceptance checklist for implementer and test-plan author.

Reference this report explicitly in the task document. Do not implement any schema changes — produce only the task document and stop when the task doc is created.
