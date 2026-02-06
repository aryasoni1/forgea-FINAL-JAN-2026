### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B5 — Lab System Tables
- Exact input files read:
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B5_Lab System Tables.md
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B5_Lab System Tables.md

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling, relations, enums, and migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Authoritative guidance for model design, migration-safe patterns (rename vs additive), and generated client compatibility.
  - Decision it informs: Whether to repurpose `constraints` -> `config`, how to add `LabVersion` snapshots safely, and migration strategies.
  - What breaks without it: Incorrect migrations, duplicate tables, or runtime client mismatches.

- Technology: PostgreSQL
  - Concept: JSONB storage, indexing, and constraints
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Decisions about JSONB vs JSON, GIN indexing, and performance characteristics depend on Postgres version.
  - What breaks without it: Suboptimal queries or use of unavailable JSON features.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B5_Lab System Tables.md` — Coverage: PARTIAL (lists existing `Lab` model and gaps such as missing `slug`, `difficulty`, `estimatedTime`, `LabVersion`).

Exact gaps:

- No planner task doc prescribing the reconciliation of `constraints` vs requested `config` and the `LabVersion` snapshot model.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B5-<YYYY-MM-DD>.md` — Planner must author the task doc defining exact schema changes, migration/backfill steps, triggers for immutability, and verification criteria.

---

### STUDY GUIDE FOR HUMAN

- Why reconcile `constraints` vs `config`: Naming matters for clarity and future tooling; repurpose when semantics match, otherwise create `config` and plan a backfill.
- `LabVersion` rationale: Store immutable JSON snapshots of lab config to support reproducibility and rollbacks; prefer full snapshots over diffs unless storage cost is a concern.
- Indexing: Add unique `slug` index and consider GIN index on JSONB `config` for query patterns.
- Common mistakes: Adding `slug` without backfill conflict plan, forgetting timestamps on `Lab`, and not enforcing immutability on `LabVersion` rows.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B5-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc that prescribes exact Prisma model changes, migrations, backfill strategy, and acceptance tests.
  - Exact knowledge to add:
    - Concrete Prisma model updates (field names, types, enums, uniqueness constraints) including `slug`, `difficulty`, `estimatedTime`, `config: Json`, `createdAt`/`updatedAt`.
    - `LabVersion` model definition (id, labId FK, versionNumber, snapshot Json, createdAt) and constraints for ordering/uniqueness.
    - Migration/backfill steps: create new columns/models, backfill `slug` and `difficulty`, copy `constraints`->`config` if chosen, validate, then remove legacy artifacts if applicable.
    - DB triggers or constraints to enforce immutability of `LabVersion` (e.g., trigger preventing UPDATE/DELETE) and ordering (unique composite on `(labId, versionNumber)`).
  - Required version pin: `prisma`/`@prisma/client` 7.3.0; Postgres version pin (TBD).

---

### OPEN QUESTIONS / AMBIGUITIES

- Confirm whether `constraints` should be repurposed as `config` or kept and a new `config` added.
- Confirm desired unit for `estimatedTime` (minutes, seconds, ISO duration).
- Confirm Postgres version for index/JSONB features.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (pending append file updated):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B5 — Lab System Tables
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B5_Lab System Tables.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to request planner task doc and registry update.

---

Handoff complete. Provide this brief verbatim to the planner-architect agent.
