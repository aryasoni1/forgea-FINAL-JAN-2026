### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B9 — Admin & Control Tables
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

65. Create `AuditLog` table
66. Store actor ID, action, entity, metadata
67. Add created timestamp to `AuditLog`
68. Create `FeatureFlag` table
69. Add unique key for feature flag
70. Add enabled / disabled state

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `AuditLog` model exists with fields: `id`, `userId`, `actorId`, `action`, `metadata` (Json?), and `createdAt` DateTime @default(now()). It relates to `User` via `userId`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql — initial migration creates `AuditLog` table and a foreign key to `User`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260124070452_add_immutability_triggers/migration.sql and /20260124170000_add_auditlog_immutability_trigger/migration.sql — database-level immutability triggers for `AuditLog` are present to prevent UPDATE/DELETE.
- /forgea-monorepo/packages/audit/src/audit.service.ts — package-level audit service writes to `AuditLog` (multiple call sites exist; the audit service contains TODOs about archiving older logs).

---

### WHAT IS PARTIALLY IMPLEMENTED

- `AuditLog` model and immutability enforcement exist (tasks 65–67 satisfied).
- `actorId` column was added via a migration (see `/migrations/20260126160143_auditlog_actor_support/migration.sql`), indicating post-creation schema evolution; migration notes warn about adding NOT NULL to non-empty tables.
- `metadata` is present as `Json?` in the Prisma model; storage and event schema appear to be used, but there is no single enforced event schema across producers (audit service TODOs reference standardization). 
- `FeatureFlag` model/table is not present; no migrations or code referencing `FeatureFlag` were found.

---

### WHAT IS MISSING

- `FeatureFlag` model/table with fields: `key` (unique), `enabled` (boolean), optional `description`, and timestamps.
- Migrations and seed data for feature flags.
- A documented event schema for `AuditLog` producers and any validation/enforcement mechanism.
- Retention and archival policy implementation (service TODOs exist but no automated archival pipeline).

---

### RISKS OR CONFLICTS

- Immutability triggers on `AuditLog` mean schema changes that alter or drop columns require careful migration strategies to avoid violating triggers or losing audit integrity.
- Adding `FeatureFlag` later may require coordination with runtime feature check implementations and rollout strategies; absence of a centralized feature flag table means feature toggles may be implemented ad-hoc in code.
- The migration that added `actorId` warns about NOT NULL addition on populated tables — future column additions must consider migration ordering and defaulting strategies.

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B9 — Admin & Control Tables (EPIC-B). Use this code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md as the source of truth. Produce the authoritative task document for Feature B9 under /docs/tasks/ following the repository's task document structure. Base the task document on EPIC-B tasks 65–70 and the existing repository artifacts: `AuditLog` model, migrations, and `packages/audit` service.

The task document must:
- Define an exact `FeatureFlag` schema (fields, types, uniqueness, FK behavior if any) and a migration plan.
- Specify runtime integration points for feature flag checks in code and any required environment flags or config.
- Provide migration/backfill notes and a rollout strategy for enabling/disabling flags without service disruption.
- Include acceptance criteria and tests the implementer should create.

Do not implement changes — produce only the task document and stop when the task doc is created.
