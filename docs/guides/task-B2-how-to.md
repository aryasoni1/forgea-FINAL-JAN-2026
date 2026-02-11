# Task B2 — Prisma Setup & Migrations How-To (Beginner Guide)

This guide follows the approved plan in [docs/tasks/task-B2-2026-02-09.md](docs/tasks/task-B2-2026-02-09.md) step-by-step.

## Step 1 — Update Prisma official docs

**What was done:** Updated Prisma official policy documentation to pin version 7.3.0 and define the repo’s datasource and client generation standards.

**Why it was necessary:** The task requires official, version-pinned guidance aligned to the repo’s Prisma configuration.

**What problem it solves:** It prevents conflicting setup patterns and ensures all contributors follow the same Prisma rules.

**How a beginner can do it manually:**

1. Open [docs/official-docs/EPIC-B/prisma_official.md](docs/official-docs/EPIC-B/prisma_official.md).
2. Confirm the version is pinned to 7.3.0 and the official links are listed.

**How a beginner knows it is correct:**

- The doc lists official Prisma 7.3.0 links and the datasource pattern used by this repo.

## Step 2 — Update Prisma migrations docs

**What was done:** Updated Prisma migration policy to pin version 7.3.0 and document dev vs prod migration workflows, shadow DB, and lock file rules.

**Why it was necessary:** The task requires deterministic migration processes and clear differences between dev and prod.

**What problem it solves:** It avoids accidental destructive commands in production and ensures migration history remains authoritative.

**How a beginner can do it manually:**

1. Open [docs/official-docs/EPIC-B/prisma_migrations.md](docs/official-docs/EPIC-B/prisma_migrations.md).
2. Confirm it describes `prisma migrate dev` for dev and `prisma migrate deploy` for prod.

**How a beginner knows it is correct:**

- The doc explicitly states the environment-specific commands and shadow DB requirement.

## Step 3 — Align repo files with the datasource decision

**What was done:** Updated the Prisma schema to use `env("DATABASE_URL")` and set the client output path, and ensured the config file does not override the datasource.

**Why it was necessary:** The approved decision requires a hybrid approach with schema-defined datasource and config-defined runtime settings.

**What problem it solves:** It removes ambiguity about which file controls the datasource and standardizes the generated client location.

**How a beginner can do it manually:**

1. Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma) and confirm `url = env("DATABASE_URL")`.
2. Confirm `generator client` includes `output = "../../node_modules/@prisma/client"`.
3. Open [forgea-monorepo/packages/schema/prisma.config.mjs](forgea-monorepo/packages/schema/prisma.config.mjs) and confirm no datasource URL is defined.

**How a beginner knows it is correct:**

- The schema contains a single datasource with `env("DATABASE_URL")`.
- The generator output path matches the required value.
- The config file only defines migrations/seed settings.

## Step 4 — Update master docs registry

**What was done:** Added the Docs Gatekeeper registry entry for B2.

**Why it was necessary:** The task requires registry alignment for the new policy docs.

**What problem it solves:** It ensures the Docs Gatekeeper record is discoverable and tracked.

**How a beginner can do it manually:**

1. Open [docs/master_docs.md](docs/master_docs.md).
2. Confirm the B2 entry exists under the 2026-02-06 section.

**How a beginner knows it is correct:**

- The B2 registry entry appears with status ADDED and the correct doc path.

## Step 5 — Verification checks

**What was done:** Defined manual checks for datasource, generator output, migration history, and lock file handling.

**Why it was necessary:** The task requires machine-checkable verification criteria.

**What problem it solves:** It creates a repeatable checklist for validating Prisma setup consistency.

**How a beginner can do it manually:**

1. Follow the checklist in [docs/manual-checks/task-B2-manual-checks.md](docs/manual-checks/task-B2-manual-checks.md).

**How a beginner knows it is correct:**

- All checks can be completed using the listed files without running destructive commands.
