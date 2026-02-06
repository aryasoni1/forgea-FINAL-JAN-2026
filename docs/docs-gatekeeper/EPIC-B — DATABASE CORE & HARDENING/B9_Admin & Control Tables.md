# FEATURE DOCS BRIEF — B9: Admin & Control Tables

## FEATURE CONTEXT
- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B9 — Admin & Control Tables
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md

---

## REQUIRED OFFICIAL DOCUMENTATION
For each concept below I list the authoritative source and pinning requirement.

1) Technology: Prisma (schema & migrations)
- Concept: Prisma schema reference & Prisma Migrate migration patterns
- Official source: https://www.prisma.io/docs
- Exact version requirement: 7.3.0 (prisma/@prisma/client pin seen in registry)
- Why required: Defines canonical schema language, migration generation, and how `schema.prisma` maps to SQL (required for migration plan and safe DDL for immutable audit logs).
- What decision it informs: Migration ordering, safe `NOT NULL` additions, JSON storage mapping, and client usage for runtime feature checks.
- What breaks without it: Risky migration DDL, client/server mismatch, and unsafe schema evolution that could violate immutability triggers.

2) Technology: PostgreSQL (server semantics, triggers, JSONB behavior)
- Concept: PostgreSQL DDL, trigger behavior, JSON/JSONB storage semantics
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Immutability enforcement uses DB triggers; exact trigger/transaction semantics vary by Postgres version and extensions.
- What decision it informs: Trigger implementation details, extension availability (pgcrypto, uuid), and backfill transaction strategy.
- What breaks without it: Trigger incompatibilities, migration failures, unexpected JSONB behavior during backfill.

3) Technology: Audit / Logging guidance
- Concept: Logging and audit best practices (what to capture, retention, immutability and redaction guidance)
- Official source: OWASP Logging Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- Exact version requirement: NO FORMAL VERSION — review and accept before implementation
- Why required: Determines minimum fields, PII handling, retention and redaction policies for `AuditLog` metadata.
- What decision it informs: Fields to store, retention/archival policy, redaction rules, and compliance expectations.
- What breaks without it: Non-compliant logging, accidental PII exposure, or inconsistent audit records across producers.

4) Technology: Feature Flag / Toggle Patterns
- Concept: Canonical feature toggle patterns (release toggles, ops toggles, permission toggles) and rollout strategies
- Official source: Martin Fowler — Feature Toggles (https://martinfowler.com/articles/feature-toggles.html) and LaunchDarkly patterns (https://docs.launchdarkly.com/)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines runtime semantics for flags (boolean vs gradual), expected evaluation latency, and SDK vs DB-backed patterns.
- What decision it informs: Whether to implement a DB-backed `FeatureFlag` table vs adopt an external system, rollout strategies, and SDK integration points.
- What breaks without it: Confusion over semantics (per-user vs global), brittle rollouts, and inconsistent behavior across services.

---

## EXISTING INTERNAL DOCS (VERIFIED)
For each internal artifact relevant to B9, coverage status and gaps.

- /forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: `AuditLog` model present; `FeatureFlag` model missing. No canonical event schema enforced; `metadata` is Json? with no validator.

- /forgea-monorepo/packages/schema/prisma/migrations/*
  - Coverage status: PARTIAL
  - Exact gaps: Migrations create `AuditLog` and immutability triggers; no migrations or seed for `FeatureFlag`; migration notes warn about NOT NULL on populated tables.

- /forgea-monorepo/packages/audit/src/audit.service.ts
  - Coverage status: PARTIAL
  - Exact gaps: Service writes audit events but lacks standardized event schema validation and no archival/retention automation is implemented (TODOs exist).

- /docs/official-docs/EPIC-B/prisma_official.md and /docs/official-docs/EPIC-B/prisma_migrations.md
  - Coverage status: PARTIAL
  - Exact gaps: Cover Prisma basics but do not define cross-service audit event schemas, FeatureFlag schema, nor migration/backfill guidance for immutable tables.

---

## DOCUMENTATION COVERAGE DECISION
⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED
- Reason: Core canonical inputs (Prisma docs) exist, but internal docs and registry lack pinned Postgres version, a formal Feature Flag policy, a documented AuditLog event schema and retention policy, and a migration/backfill plan for immutable audit tables.
- Docs to extend: `/docs/official-docs/EPIC-B/prisma_migrations.md` (add immutable table & backfill patterns), add `/docs/official-docs/EPIC-B/feature-flags.md`, and `/docs/official-docs/EPIC-B/audit-log-guidelines.md`.

---

## STUDY GUIDE FOR HUMAN (Per required concept)
1) `Prisma` schema & migrations
- Why this exists: Single source for DB schema + deterministic client generation.
- Alternatives: Hand-written SQL migrations only (more control, more risk) or another ORM.
- When NOT to use Prisma features: If DB-level triggers/immutability require bespoke SQL not representable by Prisma Migrate.
- Common mistakes: Adding `NOT NULL` to populated columns without backfill; relying on `prisma migrate` to alter trigger code safely.

2) `PostgreSQL` triggers & JSONB
- Why this exists: DB-level immutability and efficient JSONB storage for event metadata.
- Alternatives: Store event blobs in object store + index in DB (more complex searches).
- When NOT to use DB triggers: If migrations must be frequently altered or if sharding/cross-DB replication unsupported by triggers.
- Common mistakes: Assuming trigger semantics are identical across Postgres versions; forgetting extension availability.

3) `Audit / Logging guidance`
- Why: Ensures legal/compliance and operational usefulness of logs.
- Alternatives: Minimal logs without schema (bad for audits).
- When NOT to capture raw PII: Never store raw PII in audit `metadata` without redaction.
- Common mistakes: Over-logging PII and not planning retention/archival.

4) `Feature Toggle Patterns`
- Why: Safe rollout and runtime gating of features.
- Alternatives: Branch-based releases (slower) or config-file toggles (no runtime control).
- When NOT to use DB-backed flags: If you need low-latency per-request evaluation at extreme scale (use SDK + CDN/LD instead).
- Common mistakes: Using boolean flags for multi-dimensional rollouts, embedding logic differently across services.

---

## INTERNAL DOCS TO ADD OR EXTEND (required items)
Only include these if coverage is PARTIAL or MISSING.

1) Path: /docs/official-docs/EPIC-B/feature-flags.md
- Purpose: Canonical Feature Flag policy for EPIC-B and consumers.
- Exact knowledge to add:
  - `FeatureFlag` schema (see task doc spec) and migration plan
  - Runtime evaluation semantics (global boolean, per-actor targeting, gradual rollout)
  - Recommendation on external solution vs DB-backed flags
  - SDK integration points and environment config keys
  - Rollout and rollback guidance
- Required version pin: `Postgres` version (see registry) and `Prisma 7.3.0`

2) Path: /docs/official-docs/EPIC-B/audit-log-guidelines.md
- Purpose: Standardize event schema, retention, redaction, and archival.
- Exact knowledge to add:
  - Canonical audit event JSON schema (top-level keys, size limits)
  - Redaction rules for PII
  - Retention and archival pipeline (how/where to archive older records)
  - Interaction with DB immutability triggers and restrictions for future migrations
- Required version pin: `Postgres` version, `Prisma 7.3.0`

3) Path: /docs/official-docs/EPIC-B/prisma_migrations.md (extend)
- Purpose: Add explicit guidance for modifications to immutable audit tables, safe backfills, and trigger-aware migrations.
- Exact knowledge to add:
  - Safe pattern for adding non-nullable columns (create nullable, backfill in batches, set NOT NULL)
  - How to alter triggers safely and migration ordering
  - Downgrade strategies
- Required version pin: `Prisma 7.3.0`, and pinned `Postgres` version.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)
- Which PostgreSQL major/minor version will be used in production? (Required — affects trigger semantics and extensions.)
- Does the org prefer an external feature-flag provider (LaunchDarkly / Unleash) or a DB-backed `FeatureFlag` table? (Decision required.)
- Retention policy: exact retention period and archival destination for `AuditLog` (legal/compliance input required).
- Event schema authority: who owns the canonical audit event schema across services?

---

## MASTER DOCS REGISTRY ACTION
Append the following entry to `/docs/master_docs.md` (new docs-gatekeeper brief):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B9 — Admin & Control Tables
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B9_Admin & Control Tables.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for admin & control tables (FeatureFlag, AuditLog retention, and migration patterns).

---

End of brief.
