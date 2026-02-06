### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B4 — Lesson System Tables
- Exact input files read:
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B4_Lesson System Tables.md
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B4_Lesson System Tables.md

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling (JSON fields, enums, relations, migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Guides correct modelling of JSON columns, enums, relations and migration-safe patterns for versioned content.
  - Decision it informs: Data modelling choices for `Lesson`/`LessonVersion`, whether to store immutable snapshots as JSONB, and how to enforce ordering.
  - What breaks without it: Misuse of JSON fields, incorrect migration SQL, or incompatible generated client behavior.

- Technology: PostgreSQL
  - Concept: JSONB column semantics and indexing
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implementation choices (JSON vs JSONB, GIN indexes) depend on Postgres features and version; informs storage and query patterns.
  - What breaks without it: Suboptimal performance or invalid assumptions about JSON operator availability.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B4_Lesson System Tables.md` — Coverage: PARTIAL (lists missing models and migrations).

Exact gaps:

- No planner task doc exists specifying schema shape, versioning strategy, or migration approach.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B4-<YYYY-MM-DD>.md` — Planner must author the task doc defining schema, enums, migration strategy, and verification criteria.

---

### STUDY GUIDE FOR HUMAN

- Why store lesson content as JSON: Flexibility for rich, nested content and snapshotting. Alternatives: normalized tables for blocks (more structure). When NOT to use JSON: when you need relational querying over content fields.
- Version snapshots: Store immutable `LessonVersion` JSON snapshots to preserve historical state; use a separate `LessonVersion` table for ordering and immutability.
- Enums: Use Prisma enums for `difficulty` and `status` (DRAFT, PUBLISHED) to enable compile-time checks and migration clarity.
- Common mistakes: Storing large blobs in JSON without indexing, not enforcing unique `slug`, not adding timestamps for publication/audit.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B4-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc to define `Lesson` and `LessonVersion` schema, enums, indexing (JSONB/Gin), migration steps, and acceptance criteria.
  - Exact knowledge to add:
    - Concrete Prisma model definitions for `Lesson` and `LessonVersion` (fields, enums, relations).
    - Indexing recommendations for `slug` uniqueness and JSONB query patterns.
    - Migration strategy: create new models, backfill existing data if any, and verify ordering and immutability invariants.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0 and Postgres version pin (TBD).

---

### OPEN QUESTIONS / AMBIGUITIES

- Which Postgres version will be targeted in production (affects JSONB features and indexing)? This must be pinned before implementation.
- Should `LessonVersion` store diff deltas or full immutable JSON snapshots? Planner decision.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (pending append file updated):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B4 — Lesson System Tables
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B4_Lesson System Tables.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to request planner task doc and registry update.

---

Handoff complete. Provide this brief verbatim to the planner-architect agent.
