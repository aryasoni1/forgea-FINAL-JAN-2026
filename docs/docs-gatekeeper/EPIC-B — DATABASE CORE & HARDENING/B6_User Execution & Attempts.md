### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B6 — User Execution & Attempts
- Exact input files read:
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B6_User Execution & Attempts.md
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B6_User Execution & Attempts.md

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Relations, uniqueness constraints, JSON storage and migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Guides safe schema changes (adding `LabVersion`, changing uniqueness), migration-safe patterns for renames vs additive changes, and appropriate JSON column usage.
  - Decision it informs: Whether to extend `VerificationLog` or create `VerificationAttempt`, how to remove unique constraints safely, and migration/backfill steps.
  - What breaks without it: Risky schema changes that break production invariants or generated client compatibility.

- Technology: PostgreSQL
  - Concept: JSONB vs Text for logs, indexing, and immutability enforcement via triggers
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Choosing JSONB for structured logs and indexing decisions depends on Postgres version and features.
  - What breaks without it: Incorrect assumptions about JSON functions, index availability, or performance characteristics.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B6_User Execution & Attempts.md` — Coverage: PARTIAL. It maps existing `LabSession`, `VerificationLog`, migrations, and gaps versus requested models.

Exact gaps:

- No planner task doc prescribing whether to rename or extend `VerificationLog`, or how to add `LabVersion` and link `LabSession` to it while coordinating with immutability triggers.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B6-<YYYY-MM-DD>.md` — Planner must author task doc detailing schema changes, migration steps, and acceptance criteria.

---

### STUDY GUIDE FOR HUMAN

- Why reconcile `VerificationLog` vs `VerificationAttempt`: Current `VerificationLog` enforces a 1:1 relationship with `LabSession`; EPIC requires multiple attempts per session. Options: remove uniqueness and add `result` field, or create a new `VerificationAttempt` and retire/convert `VerificationLog`.
- Why add `LabVersion` and link to `LabSession`: Ensures sessions are tied to immutable lab snapshots for reproducible verification. Backfill may use `repoVersion` or `baseRepoUrl` where available.
- JSON vs Text logs: JSONB preferred for structured logs and queryability; Text acceptable for opaque blobs. Planner must choose based on expected query patterns.
- Common mistakes: Dropping uniqueness constraints without migrating data; failing to coordinate with immutability triggers; not preserving historical `VerificationLog` entries.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B6-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc prescribing exact schema changes and migration strategy.
  - Exact knowledge to add:
    - Option A (extend): Remove unique constraint on `VerificationLog.sessionId`, add `result` enum (`PASS`, `FAIL`), add `createdAt` and optional `attemptNumber`, and retain table name.
    - Option B (new model): Create `VerificationAttempt` (id, sessionId FK, commitSha, result enum, logs Json/ Text, createdAt), migrate existing `VerificationLog` rows into attempts, and either retire or keep `VerificationLog` as an audit table.
    - Add `LabVersion` model and `labVersionId` FK on `LabSession`, with backfill guidance using `repoVersion`/`baseRepoUrl` mapping.
    - Migration safety notes: coordinate with immutability triggers (existing migrations add immutability), perform copy-backups, run migration in a maintenance window if required, and provide rollback SQL.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0; Postgres version pin (TBD).

---

### OPEN QUESTIONS / AMBIGUITIES

- Confirm whether to extend `VerificationLog` or create `VerificationAttempt` (planner decision).
- Confirm desired `result` values and whether `PENDING` state is needed.
- Confirm acceptable downtime or maintenance windows for migration operations that alter uniqueness constraints.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (pending append file updated):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B6 — User Execution & Attempts
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B6_User Execution & Attempts.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to request planner task doc and registry update.

---

Handoff complete. Provide this brief verbatim to the planner-architect agent.
