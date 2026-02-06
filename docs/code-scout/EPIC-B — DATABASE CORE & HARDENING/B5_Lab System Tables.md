### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B5 — Lab System Tables
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

33. Create `Lab` table
34. Add unique `slug` to Lab
35. Add difficulty field
36. Add estimated time field
37. Add JSON `config` column for lab definition
38. Add timestamps to Lab
39. Create `LabVersion` table
40. Store immutable lab config snapshot
41. Add version number to LabVersion
42. Link LabVersion to Lab

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `Lab` model present with fields: `id`, `title`, `epic`, `failureClass`, `sourceGithubIssueUrl`, `repoVersion`, `baseRepoUrl`, and `constraints` (type `Json`). Has relation `sessions LabSession[]` and `@@index([failureClass])`.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `LabSession` model exists and links to `Lab` via `labId` with `onDelete: Restrict`. `LabSession` includes `status` (enum `LabStatus`), `userForkUrl`, `previewUrl`, `startedAt`, and `lastActivityAt` timestamps.
- /forgea-monorepo/packages/schema/prisma/schema.prisma — `FailureClass` and `LabStatus` enums exist (values include `IN_PROGRESS`, `STUCK`, `VERIFIED_PASS`, `DEFERRED` for `LabStatus`).
- /forgea-monorepo/packages/schema/prisma/migrations/20260128113000_lab_session_lifecycle_guard/migration.sql — migration exists targeting LabSession lifecycle guards (indicates lifecycle-related DB changes have been applied).

---

### WHAT IS PARTIALLY IMPLEMENTED

- `/forgea-monorepo/packages/schema/prisma/schema.prisma` — JSON column exists as `constraints` on `Lab`, which may partially satisfy the requested `config` JSON column but differs in name and intended semantics.
- `LabSession` timestamps exist, but `Lab` model lacks explicit `createdAt`/`updatedAt` timestamp fields requested by the task list.
- `LabStatus` enum is present for session status; a `difficulty` enum for `Lab` is not present.

---

### WHAT IS MISSING

- Unique `slug` field on `Lab` (and corresponding uniqueness constraint).
- `difficulty` enum and a `difficulty` field on `Lab`.
- `estimated time` field on `Lab` (e.g., minutes or ISO duration).
- Explicit `config` JSON column named as such (existing `constraints` may be repurposed but needs confirmation).
- `createdAt` / `updatedAt` timestamps on `Lab`.
- `LabVersion` model/table to store immutable snapshots of lab configs (JSON), including a version number and relation to `Lab`.
- DB-level enforcement for `LabVersion` ordering (e.g., unique composite or sequence) and immutability triggers for snapshots.

---

### RISKS OR CONFLICTS

- Naming mismatch: existing `constraints` JSON field may be serving the same purpose as requested `config` — risk of duplicate/conflicting fields or semantic mismatch if both are introduced without migration/renaming plan.
- No `slug` or difficulty present: adding a unique `slug` later may require backfilling and conflict resolution for existing `title` values.
- Lack of `LabVersion` means current history/versioning is absent; introducing it requires decisions about snapshot generation and migration of any existing `repoVersion`/`baseRepoUrl` usage.

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B5 — Lab System Tables (EPIC-B). Use the code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B5_Lab System Tables.md as the source of truth. Produce the authoritative task document for Feature B5 under /docs/tasks/ following the repository's task document structure. Base the task document on EPIC-B tasks 33–42 and the existing Prisma schema: `Lab`, `LabSession`, `FailureClass`, and `LabStatus`. Do not write code. Your task document must:

- Reconcile existing fields (`constraints`, `repoVersion`, `baseRepoUrl`) with the requested `config` and `LabVersion` snapshot model.
- Specify exact schema changes (field names, types, enums, uniqueness constraints) required to reach compliance with tasks 33–42, including migration/backfill notes where applicable.
- Call out DB triggers or constraints needed to enforce immutability and version ordering for `LabVersion` snapshots.
- Provide a short acceptance checklist for implementer and test-plan author.

Do not implement the changes; produce only the task document. Reference this report explicitly in the task document and stop when the task doc is created.
