### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B3 — Identity & Authentication Tables
- Exact input files read:
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B3_Identity & Authentication Tables.md
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B3_Identity & Authentication Tables.md

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling (enums, unique constraints, relations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Ensures model definitions (enums, unique constraints, FK behavior) are implemented according to Prisma semantics; informs migration SQL generation.
  - Decision it informs: Whether to accept existing `Account`/`Session` naming vs the requested `AuthIdentity`/`AuthSession` naming and how to apply migrations safely.
  - What breaks without it: Misapplied migrations, duplicate tables, or broken auth flows.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B3_Identity & Authentication Tables.md` — Coverage: PARTIAL. It documents what exists in `schema.prisma` and migrations but does not prescribe the reconciliation approach.

Exact gaps:

- No task doc exists that instructs whether to rename existing `Account`/`Session` models or to add new `AuthIdentity`/`AuthSession` models and migrate data.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend:

- `/docs/tasks/task-B3-<YYYY-MM-DD>.md` (planner) — Define required schema changes, migration strategy, and acceptance criteria.

---

### STUDY GUIDE FOR HUMAN

- Why reconcile names: The repo currently uses NextAuth-style `Account`/`Session` models; EPIC-B requires explicit `AuthIdentity`/`AuthSession` naming and an `authProvider` enum. Choose rename vs additive approach based on downtime tolerance and migration complexity.
- Alternatives: Keep `Account`/`Session` and map EPIC-B naming in application code (low-risk), or migrate DB models to new names with data copy+swap (higher risk, but cleaner).
- When NOT to rename: If production traffic cannot tolerate data migrations or if multiple upstream integrations already rely on existing table names.
- Common mistakes: Dropping constraints before copying data, forgetting unique indexes on provider+providerUserId, and not adding timestamps to `User`.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B3-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc that prescribes exactly how to adapt `schema.prisma` to meet EPIC-B requirements (enum values, models, constraints), the migration steps (copy, backfill, swap, retire), and verification criteria.
  - Exact knowledge to add:
    - Decision: rename vs additive migration strategy with step-by-step SQL/Prisma migration guidance.
    - Required schema changes: Add `authProvider` enum (`EMAIL, GOOGLE, GITHUB`), ensure `UserRole` includes `USER` (rename `CANDIDATE`→`USER` if approved), add `createdAt`/`updatedAt` to `User`.
    - Migration safety: Preserve `Account`/`Session` data until new models are verified; provide rollback steps.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0.

---

### OPEN QUESTIONS / AMBIGUITIES

- Confirm whether `CANDIDATE` should be renamed to `USER` or whether `USER` should be added as an alias; planner must decide.
- Confirm downtime tolerance and whether additive migration (coexistence of old/new models) is acceptable.

---

### MASTER DOCS REGISTRY ACTION

Add the following to `/docs/master_docs.md` (pending append):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B3 — Identity & Authentication Tables
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B3_Identity & Authentication Tables.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to define required PLANNER task and registry update.

---

Handoff complete. Provide this brief verbatim to the planner-architect agent.
