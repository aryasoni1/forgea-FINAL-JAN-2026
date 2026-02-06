# FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B2 — Prisma Setup & Migrations
- Source: /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B2_Prisma Setup & Migrations.md

## TASKS CHECKED

- Locate existing `prisma` directory and files for the project
- Inspect `schema.prisma` for datasource and generator configuration
- Enumerate `prisma` migrations present in the repo
- Identify Prisma config files (e.g. `prisma.config.mjs`) and seed scripts
- Find database connection config usage and `DATABASE_URL` occurrences

## WHAT ALREADY EXISTS

- `/forgea-monorepo/packages/schema/prisma/schema.prisma` — Prisma schema with models, enums, and `datasource db { provider = "postgresql" }` (provider present; `url` not declared inline in this file).
- `/forgea-monorepo/packages/schema/prisma/seed.ts` — Prisma seed script present.
- `/forgea-monorepo/packages/schema/prisma/migrations/` — Migration folder containing multiple timestamped migration subfolders and `migration_lock.toml` (several migration SQL files found, e.g. `20260124065750_init_trust_schema/migration.sql`, `20260124094856_add_auth_models/migration.sql`, etc.).
- `/forgea-monorepo/packages/schema/prisma.config.mjs` — Runtime Prisma config that loads `.env` and sets `datasource.url: env("DATABASE_URL")` and migration seed command.
- `/forgea-monorepo/packages/schema/package.json` — Contains `prisma:generate` script: `prisma generate --schema prisma/schema.prisma` and lists `@prisma/client` dependency (reported as `^7.3.0` in package.json; lockfile shows 7.3.0 resolved).
- `/forgea-monorepo/packages/schema/src/db.ts` — Code that reads `process.env.DATABASE_URL` and throws if missing (fail-closed runtime guard).
- Repo-level and app-level env files: `/forgea-monorepo/.env` and `/forgea-monorepo/apps/forgea-labs/.env.local` — both contain `DATABASE_URL="postgresql://aryasoni@localhost:5432/forgea_db"` (local connection string present in workspace files).

## WHAT IS PARTIALLY IMPLEMENTED

- `schema.prisma` does not contain an inline `url` entry in the `datasource` block; the project provides `datasource.url` via `/packages/schema/prisma.config.mjs` which loads the repo `.env`. This is a valid configuration but is a divergence from the common pattern of `url = env("DATABASE_URL")` inside `schema.prisma` and may confuse contributors unfamiliar with the `prisma.config.mjs` approach.
- Migrations exist and are present as SQL artifacts under `prisma/migrations/`; the repository contains a `migration_lock.toml`, indicating migration locking is in use.
- `@prisma/client` is declared in several packages (packages/schema, apps, packages/audit) and the lockfile shows `7.3.0` resolved — the codebase references the generated client in multiple places.

## WHAT IS MISSING (NOT FOUND)

- No dedicated infrastructure provisioning scripts for creating dev/prod Postgres instances were found in the scanned source (no docker-compose, Terraform modules, or DB provisioning scripts were located by this scan). (Note: this is outside Prisma config files; only repository sources were checked.)
- No repository-local, version-pinned official Prisma documentation was found under `docs/` for init, client generation, or migrations (this is the Docs Gatekeeper responsibility to verify/approve official links).

## RISKS OR CONFLICTS

- Sensitive env files present in repo: `/forgea-monorepo/.env` and app `.env.local` contain `DATABASE_URL` local connection strings — this is a potential exposure or onboarding confusion risk.
- Divergent config patterns: `schema.prisma` omits inline `url` while `prisma.config.mjs` provides it via a loaded `.env`. This can cause confusion about where the datasource is configured and may lead to inconsistent developer workflows if contributors expect `schema.prisma` to contain the `env()` call.
- Runtime safety checks exist (`packages/schema/src/db.ts` throws when `DATABASE_URL` is missing). This enforces fail-closed behavior but increases the chance of opaque startup failures for contributors if onboarding docs or `.env.example` files are missing.

## QUESTIONS FOR CLARIFICATION

- None required for the immediate Code-Scout output. If the Docs Gatekeeper needs a specific Prisma version to target, please state it in the next step.

## NEXT AGENT HANDOFF PROMPT (FOR `docs-gatekeeper`)

Use the following copy-paste-ready prompt for the Docs Gatekeeper agent. Reference this report when performing verification.

---

You are the Docs Gatekeeper. Please verify official, version-pinned Prisma documentation for initialization, schema configuration, client generation, and the `prisma migrate dev` workflow for Feature B2 — Prisma Setup & Migrations.

Context & findings (from the Code-Scout report):

- See `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B2_Prisma Setup & Migrations.md` (this report).
- Key repo facts you should use when validating docs:
  - Prisma schema: `/forgea-monorepo/packages/schema/prisma/schema.prisma` (provider present; `url` not declared inline).
  - Prisma runtime config: `/forgea-monorepo/packages/schema/prisma.config.mjs` (loads `.env`, sets `datasource.url: env("DATABASE_URL")`, and defines `migrations.seed`).
  - Migrations: `/forgea-monorepo/packages/schema/prisma/migrations/` (multiple SQL migrations and `migration_lock.toml`).
  - Seed script: `/forgea-monorepo/packages/schema/prisma/seed.ts`.
  - `prisma:generate` script present in `/forgea-monorepo/packages/schema/package.json`.
  - `DATABASE_URL` examples present in `/forgea-monorepo/.env` and `/forgea-monorepo/apps/forgea-labs/.env.local`.

Tasks for Docs Gatekeeper (explicit):

1. Check `/docs/official-docs-registry.md` first for any already-approved Prisma links. If approved links are present and version-pinned, mark them as accepted for: init, schema configuration, client generation, and `prisma migrate dev` workflow.
2. If the registry lacks the required, provide canonical Prisma docs links pinned to the Prisma version used in the repo (lockfile shows `prisma`/`@prisma/client` resolved at `7.3.0`). For each required doc area provide a single authoritative link with explicit version (e.g., Prisma docs URL with version path or release tag).
3. Produce a short verification output that lists each required doc (init, schema config, client generation, migrate dev) and a one-line verdict: `approved` or `missing` plus the exact link(s) you approve.

Output format (required):

- `init:` <link> — `approved|missing`
- `schema configuration:` <link> — `approved|missing`
- `client generation:` <link> — `approved|missing`
- `migrate dev workflow:` <link> — `approved|missing`

Reference this Code-Scout report in your response and attach any version notes. Do NOT modify repository files. End with: `Handoff complete. Provide this report verbatim to the next agent.`

---

Handoff prepared by Code-Scout.
