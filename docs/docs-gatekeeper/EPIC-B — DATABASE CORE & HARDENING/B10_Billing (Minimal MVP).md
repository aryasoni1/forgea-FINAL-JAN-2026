### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B10 — Billing (Minimal MVP)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/config/src/permissions.ts
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/src/types.ts
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe implementation, the following official sources must be read and pinned.

- Technology: PostgreSQL
  - Concept: Enum/Type migrations, transaction-safe DDL, backfill strategies
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implements enum changes and data backfills required when moving `tier` from `User` to a new `Subscription` table; informs migration strategy and downtime risk.
  - Decision it informs: Safe migration steps, whether to use Postgres enum type or text-backed canonical values, and lock / downtime expectations.
  - What breaks without it: Risk of non-atomic enum changes, broken migrations in production, accidental data loss.

- Technology: Prisma (ORM & Migrations)
  - Concept: Schema modelling, enum mapping, migration SQL artifacts and backfill patterns
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Must coordinate Prisma schema changes, generate safe migrations, and understand how Prisma represents enums vs DB enums.
  - Decision it informs: Whether to change Prisma enum values vs mapping approach, and how to ship backfill SQL.
  - What breaks without it: Invalid client code, broken generated types, failed migrations.

- Technology: Billing Provider API (e.g., Stripe)
  - Concept: Subscription objects, webhook payloads, idempotency, reconciliation flows
  - Official source: https://stripe.com/docs/api
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Webhook formats and reconciliation guidance determine what provider metadata to store and how to respond to events.
  - Decision it informs: Storage schema for provider IDs (e.g., `stripeSubscriptionId`), webhook handler shape, audit event hooks.
  - What breaks without it: Incorrect webhook handling, reconciliation errors, billing outages or double-charges.

- Technology: Data Protection / Privacy Regs (GDPR)
  - Concept: Retention rules for PII and external account metadata
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: N/A (regulation)
  - Why required: Determines what provider metadata may be stored, retention durations, and deletion policy.
  - Decision it informs: Metadata retention fields, purge flows, and audit requirements.
  - What breaks without it: Non-compliance risk.

---

### EXISTING INTERNAL DOCS (VERIFIED)

For each internal doc that relates to this feature, coverage status and gaps are listed.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md
  - Coverage status: PARTIAL
  - Exact gaps: Lays out what exists and missing pieces but does not choose canonical plan enum; lacks migration/backfill plan; lacks webhook/handler and audit wiring specifics.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md
  - Coverage status: PARTIAL
  - Exact gaps: High-level requirements present, but does not pin official provider docs or migration version pins.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: `SubscriptionTier` enum exists (`FREE, PRO, ENTERPRISE`) but no `Subscription` model; no migration guidance for moving `tier` off `User`.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - Coverage status: PARTIAL
  - Exact gaps: Shows `tier` column and enum type present historically; lacks backfill migration for new `Subscription` table.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts
  - Coverage status: PARTIAL
  - Exact gaps: Audit events reference subscription actions and `stripeEventId` but no concrete webhook/audit contract documented.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs/EPIC-B/prisma_migrations.md` — add enum-change patterns, Prisma-to-DB enum mapping guidance, and safe backfill SQL templates.
- `/docs/official-docs/EPIC-B/postgresql.md` — pin supported Postgres version and include guidance for altering enums and zero-downtime strategies.
- `/docs/official-docs/billing-provider.md` — new doc to pin provider (e.g., Stripe) API version, webhook shape, and reconciliation guidance.

---

### STUDY GUIDE FOR HUMAN

For each required concept below: why it exists, alternatives, when NOT to use, common mistakes.

- Postgres enum / migration guidance
  - Why: Changing enum values or moving storage requires DB-level changes that can lock tables; knowing recommended patterns prevents outages.
  - Alternatives: Use text/varchar with application-level canonicalization to avoid DB enums; use lookup table instead of Postgres enum for easier migrations.
  - When NOT to use DB enum: If enums change frequently or require cross-service compatibility; prefer lookup table.
  - Common mistakes: Attempting `ALTER TYPE ... ADD VALUE` in the middle of heavy traffic without backfill; failing to backfill existing rows before switching FK.

- Prisma schema enum decisions
  - Why: Prisma maps enums to DB constructs; changing them affects generated types and runtime code.
  - Alternatives: Represent plan as string in Prisma and validate in app layer; maintain mapping functions for provider tiers.
  - When NOT to use Prisma enum: When enum values must be extended frequently without migration friction.
  - Common mistakes: Renaming enum values in Prisma without a migration strategy; leaving older code expecting old enum names.

- Billing provider webhooks & reconciliation
  - Why: Provider events (create/update/invoice.payment_failed) drive subscription state transitions and accounting; webhooks are the authoritative source.
  - Alternatives: Poll provider API for changes (higher latency, higher API cost) — acceptable only for short-term reconciliation.
  - When NOT to rely solely on webhooks: If webhooks are unreliable in your infra; add reconciliation jobs.
  - Common mistakes: Not using idempotency keys, not verifying webhook signatures, storing only provider IDs without reconciliation timestamps.

---

### INTERNAL DOCS TO ADD OR EXTEND

Only include when coverage is PARTIAL (see above).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/prisma_migrations.md
  - Purpose: Document Prisma enum migration patterns, examples of adding/removing enum values, how to generate migration SQL, and backfill templates.
  - Exact knowledge to add: Example SQL for creating a `Subscription` table, backfill SQL from `User.tier`, transaction-safe steps, rollback guidance.
  - Required version pin: Prisma CLI & Client version used in repo (VERSION MUST BE PINNED).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/postgresql.md
  - Purpose: Pin Postgres minor version and document DDL behavior, enum recommendations, and zero-downtime patterns.
  - Exact knowledge to add: `ALTER TYPE` behavior, using new table + FK swap pattern, trigger-based gradual migration.
  - Required version pin: PostgreSQL minor version in infra (VERSION MUST BE PINNED).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/billing-provider.md
  - Purpose: Pin provider (Stripe) API version, webhook spec, idempotency expectations, and recommended reconciliation flows.
  - Exact knowledge to add: Provider API base URL, required webhook signature verification steps, example event types to handle, and retention guidance for provider metadata.
  - Required version pin: Provider API version (VERSION MUST BE PINNED).

---

### OPEN QUESTIONS / AMBIGUITIES

- Canonical plan enum: Use existing repo `SubscriptionTier` (`FREE, PRO, ENTERPRISE`) or EPIC-B requested `FREE, PAID`? This choice affects migrations and permission checks. (BLOCKER: must decide.)
- Where is `tier` currently authoritative — on `User` rows in production? Confirm via DB inspection. (BLOCKER for backfill plan.)
- Which billing provider will be used (Stripe recommended)? Pin API version and webhook semantics. (BLOCKER for provider doc pin.)
- Pin Postgres and Prisma minor versions used in production/staging. (BLOCKER for migration SQL compatibility.)

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B10 — Billing (Minimal MVP)
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B10_Billing (Minimal MVP).md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs, internal docs to extend, and blockers for safe implementation.
