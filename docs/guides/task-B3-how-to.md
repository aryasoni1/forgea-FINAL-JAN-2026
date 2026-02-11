# Task B3 — Identity & Authentication Tables How-To (Beginner Guide)

This guide follows the approved plan in [docs/tasks/task-B3-2026-02-09.md](docs/tasks/task-B3-2026-02-09.md) step-by-step.

## Step 1 — Add additive auth models

**What was done:** Added new `AuthIdentity` and `AuthSession` models while keeping existing `Account` and `Session` tables.

**Why it was necessary:** The task requires additive changes to preserve existing auth data while introducing the required model names.

**What problem it solves:** It enables a safe migration path and keeps rollback options available.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
2. Confirm `AuthIdentity` and `AuthSession` models exist alongside `Account` and `Session`.

**How a beginner knows it is correct:**

- The schema includes the new models without removing the existing ones.

## Step 2 — Align `UserRole` enum values

**What was done:** Replaced `CANDIDATE` with `USER` in `UserRole` and updated the default role.

**Why it was necessary:** The approved decision requires `ADMIN`, `USER`, and `RECRUITER` only.

**What problem it solves:** It removes the legacy role value and aligns auth behavior with the required enum set.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
2. Confirm `UserRole` includes only `ADMIN`, `USER`, and `RECRUITER`.

**How a beginner knows it is correct:**

- The `UserRole` enum matches the approved list and the `User` role default is `USER`.

## Step 3 — Add `User` timestamps

**What was done:** Added `createdAt` and `updatedAt` fields to the `User` model.

**Why it was necessary:** The task requires explicit timestamps for identity records.

**What problem it solves:** It provides auditability for identity records and supports consistent ordering.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
2. Confirm `User` includes `createdAt` and `updatedAt` fields.

**How a beginner knows it is correct:**

- Both fields appear in the `User` model and `updatedAt` uses the Prisma update trigger.

## Step 4 — Introduce `AuthProvider`

**What was done:** Added the `AuthProvider` enum with `EMAIL`, `GOOGLE`, and `GITHUB` values and applied it to `AuthIdentity`.

**Why it was necessary:** The task requires a constrained provider enum for auth identity storage.

**What problem it solves:** It prevents inconsistent provider strings across identities.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
2. Confirm the `AuthProvider` enum values and the `provider` field on `AuthIdentity`.

**How a beginner knows it is correct:**

- `AuthProvider` values match the required list and `AuthIdentity.provider` uses the enum.

## Step 5 — Enforce auth uniqueness and session expiry

**What was done:** Added the unique constraint on `AuthIdentity` and ensured `AuthSession` includes `expires` and a unique `sessionToken`.

**Why it was necessary:** The task requires deterministic identity matching and session expiry tracking.

**What problem it solves:** It prevents duplicate identities and ensures session expiration is explicit.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
2. Confirm `AuthIdentity` has a unique constraint on `provider` and `providerUserId`.
3. Confirm `AuthSession` includes `expires` and `sessionToken` is unique.

**How a beginner knows it is correct:**

- The schema includes the constraint and required fields.

## Step 6 — Add a new migration

**What was done:** Added a new migration that creates `AuthIdentity` and `AuthSession`, updates `UserRole`, and adds timestamps.

**Why it was necessary:** The task requires all schema changes to be represented in a new migration without editing existing migrations.

**What problem it solves:** It keeps migration history deterministic and auditable.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql](forgea-monorepo/packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql).
2. Confirm it adds the new enum, tables, constraints, and `User` updates.

**How a beginner knows it is correct:**

- The migration file exists and contains only additive or safe change statements.

## Step 8 — Running migrations and backfill (recommended)

**What to run:**

From the Prisma folder:

```bash
cd forgea-monorepo/packages/schema/prisma
export DATABASE_URL="postgresql://user:pass@localhost:5432/forgea_dev?sslmode=require"
# In dev (creates shadow DB)
npx prisma migrate dev
npx prisma generate

# In production CI / deploy (non-interactive)
npx prisma migrate deploy
npx prisma generate
```

**Backfill (run after successful migration and backup):**

The repo contains a backfill script at `forgea-monorepo/packages/schema/prisma/backfill_auth.sql` which populates the new `AuthIdentity` and `AuthSession` tables from existing `Account` and `Session` rows. Run it with:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backfill_auth.sql
```

Always run in a maintenance window after taking a backup. See the safety notes in the Task B3 guide.

## Step 7 — Verification checks

**What was done:** Added a manual checklist for schema and migration verification.

**Why it was necessary:** The task requires a repeatable verification path for schema changes.

**What problem it solves:** It ensures the schema and migration changes can be checked without editing applied migrations.

**How a beginner can do it manually:**

1. Follow [docs/manual-checks/task-B3-manual-checks.md](docs/manual-checks/task-B3-manual-checks.md).

**How a beginner knows it is correct:**

- All checks can be completed using the referenced files.
