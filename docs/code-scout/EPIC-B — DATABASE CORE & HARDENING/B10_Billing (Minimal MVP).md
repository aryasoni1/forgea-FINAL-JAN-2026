### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B10 — Billing (Minimal MVP)
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

71. Create `Subscription` table
72. Link `Subscription` to `User`
73. Add plan enum (FREE, PAID)
74. Add subscription status
75. Add created timestamp

---

### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/schema/prisma/schema.prisma — `SubscriptionTier` enum exists with values `FREE`, `PRO`, `ENTERPRISE`.
- /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql — `SubscriptionTier` Postgres enum type and a `tier` column are present in an initial migration (likely previously part of `User` schema evolution).
- /forgea-monorepo/packages/config and /packages/schema — code references `SubscriptionTier` in permission checks and types (e.g., `packages/config/src/permissions.ts`, `packages/schema/src/types.ts`).
- /forgea-monorepo/packages/audit/src/audit.service.ts — audit actions include `SUBSCRIPTION_UPDATE` and the audit service references `stripeEventId` in subscription-related audits.

---

### WHAT IS PARTIALLY IMPLEMENTED

- `SubscriptionTier` enum exists but differs from EPIC-B expected `plan` values (`FREE, PAID`). The repo uses `FREE, PRO, ENTERPRISE`.
- There is no dedicated `Subscription` model/table in the Prisma schema file; instead, a `tier` column appears to have been used (migration shows a `tier` column created at init). No explicit `Subscription` table with `userId` FK, `status`, or `createdAt` was found.
- Billing integration placeholders exist (audit references and decisions note payment integration), but no concrete payment provider integration (e.g., Stripe service) or subscription management code is present.

---

### WHAT IS MISSING

- A `Subscription` model/table linking to `User` with fields: `id`, `userId` FK, `tier`/`plan`, `status` (ACTIVE, PAST_DUE, CANCELLED, TRIAL), `createdAt`, `updatedAt`, and provider-specific metadata (e.g., `stripeSubscriptionId`).
- Migrations to introduce the `Subscription` table and migration/backfill steps if `tier` currently lives on `User`.
- Clear plan enum mapping between `SubscriptionTier` used in code (`FREE, PRO, ENTERPRISE`) and EPIC-B requirement (`FREE, PAID`) — planner must decide canonical enum.
- Payment provider integration (if required), webhooks handling, and reconciliation flows (currently absent).

---

### RISKS OR CONFLICTS

- Enum mismatch: repository currently uses `PRO`/`ENTERPRISE` tiers; EPIC-B requests `PAID` plan value. Changing enums is breaking and requires migration and coordinated code updates across `packages/config`, `packages/schema`, and any usages.
- If `tier` is currently stored on `User` (historical), moving to a dedicated `Subscription` table will require careful backfill and possible downtime considerations under the HARD LOCK policy.
- No existing payment provider code; implementing billing will require Docs Gatekeeper approval for official provider docs (e.g., Stripe) and secret handling.

---

### QUESTIONS FOR CLARIFICATION

- Should the canonical plan enum be `FREE, PRO, ENTERPRISE` (current repo) or `FREE, PAID` per EPIC-B? This will determine migration shape.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B10 — Billing (Minimal MVP) (EPIC-B). Use this code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md as the source of truth. Produce the authoritative task document for Feature B10 under /docs/tasks/ following the repository's task document structure. Base the task document on EPIC-B tasks 71–75 and the existing repository artifacts: `SubscriptionTier` enum, migrations that reference `tier`, and audit placeholders.

The task document must:

- Specify the canonical plan enum and map current `SubscriptionTier` values to the chosen plan set.
- Define a `Subscription` schema (fields, types, FK constraints, status enum) and a migration/backfill plan for existing `tier` data.
- Call out required webhook handlers, audit events, and where provider metadata (e.g., `stripeSubscriptionId`) should be stored.
- Include an acceptance checklist for implementer and test-plan author.

Do not implement changes — produce only the task document and stop when the task doc is created.
