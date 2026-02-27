---
doc_id: feature-flag-policy
tool: FeatureFlags
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Feature Flag Policy — EPIC-B

## Purpose

Defines the database schema, migration, and runtime semantics for every feature toggle that controls product behavior. Ensures toggles are audited, deterministic, and manageable via configuration changes without requiring deployments.

## Scope

- Applies to: `packages/schema/prisma/schema.prisma` (the `FeatureFlag` model), the Prisma migrations folder, `packages/feature-flags` (or equivalent shared service), and every application/service that asks `isFeatureEnabled()`.
- Does NOT apply to: infrastructure plumbing flags, secrets, or test-only toggles that never surface in user-visible behavior (these remain environment-only).

## Official Sources (Binding)

- Prisma 7.3.0 schema/migration guidance (`prisma.schema`, `prisma migrate`)
- PostgreSQL 18.1 (triggers, `pgcrypto` for `gen_random_uuid()`, JSONB storage)

## Evidence Coverage Matrix

| Policy Area           | Source Reference                              | Version | Status  |
| --------------------- | --------------------------------------------- | ------- | ------- |
| Schema modelling      | https://www.prisma.io/docs                    | 7.3.0   | COVERED |
| Migration & seeds     | https://www.prisma.io/docs/orm/prisma-migrate | 7.3.0   | COVERED |
| Postgres UUID & JSONB | https://www.postgresql.org/docs/18            | 18.1    | COVERED |

## Canonical Rules (Non-Negotiable)

- The `FeatureFlag` model is defined as:
  ```prisma
  model FeatureFlag {
    id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    key             String   @unique
    enabled         Boolean  @default(false)
    description     String?
    metadata        Json?
    createdById     String?  @db.Uuid
    createdBy       User?    @relation(fields: [createdById], references: [id], onDelete: SetNull)
    lastToggledById String?  @db.Uuid
    lastToggledBy   User?    @relation(fields: [lastToggledById], references: [id], onDelete: SetNull)
    createdAt       DateTime @default(now())
    updatedAt       DateTime @updatedAt
    @@index([enabled])
  }
  ```
- Every toggle operation must update `enabled`, `updatedAt`, `lastToggledById` (nullable) and emit an `AuditLog` entry that conforms to `/docs/official-docs/EPIC-B/audit-log-guidelines.md` so admins can trace who changed a flag.
- The database uses PostgreSQL 18.1 and relies on `pgcrypto` to generate `UUID`s; migrations must enable the extension before creating this table and must never assume another UUID generator.
- Only runtime behavior flags are synced to the DB; infrastructure, secret, or internal test-only flags keep their current environment-only configuration.
- The migration seeds a row for every key present in `FORGEA_FEATURE_FLAG_DEFAULTS` at migration time and leaves additional flags to be created manually later.
- Example runtime flags that MUST be migrated (non-exhaustive): `ENABLE_LABS`, `ENABLE_AI_AGENT`, `ENABLE_CERTIFICATES`, `ENABLE_WEBHOOK_PROCESSING`, `ENABLE_PREVIEW_BUILDS`.

## Migration & Backfill Guidance

- The migration is generated via `prisma migrate` (never hand-edit `migration_lock.toml` nor the generated SQL). It creates the `FeatureFlag` table with the schema above, adds the `pgcrypto` extension if missing, and seeds each key/value pair from `FORGEA_FEATURE_FLAG_DEFAULTS` (JSON) so the toggle state matches the current runtime defaults before enabling DB reads.
- Backfill scripts may read existing env-configured defaults to insert/update rows before flipping `FORGEA_FEATURE_FLAG_USE_DB`. Only keys present in the exported defaults are migrated; new toggles must be added explicitly to the defaults or manually seeded later.
- Rolling back the migration should drop the table but leave the defaults file untouched; reapplying re-seeds the flags from env defaults.

## Runtime Evaluation Semantics

- `packages/feature-flags` exposes `isFeatureEnabled(flagKey, context?)` and caches the entire flag set for `FORGEA_FEATURE_FLAG_REFRESH_SECONDS` (default: 30 seconds). The cache invalidates immediately if a fetched `updatedAt` timestamp post-dates the snapshot timestamp so toggles take effect within the TTL window.
- Deterministic resolution order:
  1. `FORGEA_FEATURE_FLAG_OVERRIDE_<FLAG>` env override (highest priority)
  2. If `FORGEA_FEATURE_FLAG_USE_DB=true`, read the DB row for `flagKey`
  3. Fallback to `FORGEA_FEATURE_FLAG_DEFAULTS` JSON
  4. If not found anywhere → return `false`
- `FORGEA_FEATURE_FLAG_USE_DB` is initially `false`; after the migration/backfill and hash+count verification, flip the gate to leverage the DB rows. The gate ensures feature toggles continue behaving while the schema change lands.
- Manual admin toggles should log to `AuditLog` and may publish a future cache-invalidation event; until that exists the service must respect the shortened TTL and forced refresh when `updatedAt` changes.

## Environment Variables

- `FORGEA_FEATURE_FLAG_DEFAULTS` — JSON map of `{ "flagKey": { "enabled": bool, "description": "" } }` representing the baseline state before the DB gate flips.
- `FORGEA_FEATURE_FLAG_USE_DB` — boolean gate that controls whether the service attempts to read from `FeatureFlag`.
- `FORGEA_FEATURE_FLAG_OVERRIDE_<FLAG>` — optional override per flag that bypasses DB/default evaluation (supports `true`/`false`).
- `FORGEA_FEATURE_FLAG_REFRESH_SECONDS` — TTL for cached flag sets (default 30). The service also refreshes if any `updatedAt` observed in the DB exceeds the cached snapshot timestamp.

## Invariants

- Only DB-backed runtime flags are part of the migration; infra/secrets/test toggles remain env-only and are not seeded.
- The service caches flags and never bypasses the TTL unless the DB `updatedAt` indicates fresher data.
- `metadata` remains a JSONB column so rollout rules can evolve without schema changes; avoid storing secrets or large blobs (keep metadata small).

## Verification Checklist

- [ ] `FeatureFlag` schema matches the defined model and uses `gen_random_uuid()` (Pgcrypto).
- [ ] Migration seeds exactly the keys in `FORGEA_FEATURE_FLAG_DEFAULTS` at migration time.
- [ ] Runtime service prioritizes overrides, respects the DB gate, and falls back to defaults or `false` when a key is missing.
- [ ] Cache TTL defaults to 30 seconds and forces a refresh if `updatedAt` in the DB is newer than the cached snapshot.
- [ ] Every toggle update writes `enabled`, `lastToggledById`, `updatedAt`, and logs to `AuditLog`.

## Non-Decisions

- This document does not prescribe admin UIs for toggling flags; CLI/database/scripts suffice for now.
- It does not cover gradual / percentage rollouts; those may be expressed via metadata values but require separate feature design.

## Notes

- Immutable audit records live in `/docs/official-docs/EPIC-B/audit-log-guidelines.md` and must contain the `feature_flag.toggle` events triggered here.
- When flipping `FORGEA_FEATURE_FLAG_USE_DB`, verify the migration seeds match expected defaults and that any manual overrides remain set in env config.
