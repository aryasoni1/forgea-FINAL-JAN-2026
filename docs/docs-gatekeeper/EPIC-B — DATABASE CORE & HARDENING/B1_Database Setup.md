```markdown
## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B1 — Database Setup
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md
  - /docs/tasks/master_tasks_V1/EPIC-B — DATABASE CORE & HARDENING.MD
  - /packages/schema/prisma/schema.prisma
  - /packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - /packages/schema/prisma/migrations/20260124070452_add_immutability_triggers/migration.sql
  - /forgea-monorepo/.env
  - /docs/official-docs-registry.md
  - /docs/master_docs.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable Database Setup we require authoritative, version-pinned official docs for the technologies below. Where a version is unknown, implementation must pause until the version is pinned.

- Technology: PostgreSQL
  - Concept: Server provisioning, CREATE DATABASE, timezone configuration, extensions management (CREATE EXTENSION)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Correct SQL syntax and supported extension names differ between server major versions; timezone behavior and extension packaging vary across Postgres releases.
  - What decision it informs: Which extension to enable (`pgcrypto` vs `uuid-ossp`), SQL to set `timezone = 'UTC'`, and supported features for triggers and functions.
  - What breaks without it: Migrations may fail, extensions may be unavailable, and timezone semantics may differ leading to production data errors.

- Technology: Prisma (migrations & schema)
  - Concept: Prisma Migrate, schema.prisma semantics, migration SQL generation
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0 (repo dependency: `prisma` ^7.3.0 / `@prisma/client` ^7.3.0)
  - Why required: Planner needs exact Prisma behavior to author migration steps and to coordinate shadow DB creation and migration ordering.
  - What decision it informs: Migration strategy (SQL-first vs Prisma migrate), how to represent extensions or external pointers in schema, and how to generate safe DDL.
  - What breaks without it: Generated SQL may be incompatible with the DB server or with repo CI migration choreography.

- Technology: PostgreSQL extension docs (pgcrypto / uuid-ossp)
  - Concept: Server-side UUID generation and cryptographic functions
  - Official source: https://www.postgresql.org/docs/current/pgcrypto.html and https://www.postgresql.org/docs/current/uuid-ossp.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED TO THE POSTGRES MAJOR RELEASE CHOSEN
  - Why required: Planner must know extension names and function availability to write `CREATE EXTENSION` steps in migrations or provisioning.
  - What decision it informs: Whether to rely on DB-side UUID generation vs client-side, and whether migration scripts must include `CREATE EXTENSION`.
  - What breaks without it: Migration failure or runtime errors when calling unavailable extension functions.

- Technology: Infrastructure provisioning (Terraform / Docker Compose)
  - Concept: Infrastructure-as-code for creating Postgres instances and DBs (dev/prod), securing credentials
  - Official sources:
    - Terraform: https://www.terraform.io/docs
    - Docker Compose: https://docs.docker.com/compose/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Planner must prescribe reproducible provisioning steps and CI-run provisioning constraints.
  - What decision it informs: Whether to add a Terraform module, Docker Compose dev DB, or managed cloud DB operator; also influences secrets handling.
  - What breaks without it: Non-repeatable provisioning, drift between environments, and insecure secrets handling.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies presence of `DATABASE_URL`, Prisma schema, and missing provisioning scripts; does not provide the authoritative official docs or pinned Postgres version.

- /packages/schema/prisma/schema.prisma
  - Coverage status: SUFFICIENT (for model definitions)
  - Exact gaps: Does not include explicit column for external artifact pointers and does not include `CREATE EXTENSION` SQL; schema alone cannot declare server-level extensions or timezone defaults.

- /packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - Coverage status: SUFFICIENT (for table DDL)
  - Exact gaps: Creates tables and indexes but does not enable UUID extensions; assumes client-side UUID generation or pre-provisioned extensions.

- /packages/schema/prisma/migrations/20260124070452_add_immutability_triggers/migration.sql
  - Coverage status: SUFFICIENT (for immutability trigger patterns)
  - Exact gaps: Uses trigger semantics that depend on Postgres features; planner must confirm the target Postgres major version supports expected function behavior.

- /forgea-monorepo/.env
  - Coverage status: PARTIAL
  - Exact gaps: Contains `DATABASE_URL` local example which is sensitive and not suitable as an authoritative provisioning artifact; must be rotated and documented with secrets guidance.

- /docs/official-docs-registry.md
  - Coverage status: INSUFFICIENT (for PostgreSQL)
  - Exact gaps: Registry does not currently contain a pinned PostgreSQL entry or pinned extension docs — docs-gatekeeper must add or request pinned official docs.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend or add:

- `/docs/official-docs/EPIC-B/postgresql.md` — pin PostgreSQL major version and include links to timezone configuration and extension management for that exact version.
- `/docs/official-docs/EPIC-B/prisma-migrations.md` — pin Prisma `7.3.0` and document migration workflow used by this repo (shadow DB behavior, migration SQL review steps).
- `/docs/official-docs/EPIC-B/db-provisioning.md` — include Terraform/Docker Compose patterns approved for dev/prod and exact pins for tooling.

Reason: Internal artifacts exist (Prisma schema + migrations), but authoritative official references for Postgres and extension behavior are missing or unpinned. Planner cannot safely author create-extension or timezone enforcement steps until versions are pinned.

---

### STUDY GUIDE FOR HUMAN (concise)

- PostgreSQL timezone configuration:
  - Why this exists: Ensures consistent time semantics across services and audit rows.
  - Alternatives: Application-level UTC normalization (acceptable but less safe than DB-level enforcement for audit tables).
  - When NOT to use DB-level enforcement: If app needs legacy local-time behavior (rare); prefer explicit app normalization.
  - Common mistakes: Relying on session-level `SET TIME ZONE` in middleware (misses background jobs); forgetting `timestamp with time zone` vs `timestamp without time zone` semantics.

- UUID extension vs client-generated UUIDs:
  - Why this exists: Server-side UUID ensures consistent ID generation during server-side transactions and avoids client clock/entropy issues.
  - Alternatives: Use `uuid()` client libraries or Prisma defaults — acceptable if CI and migration steps account for behavior.
  - When NOT to use extension: Managed DBs that disallow certain extensions; if so, use client-generated UUIDs.
  - Common mistakes: Failing to `CREATE EXTENSION` before applying migrations that reference extension functions.

- Prisma migrations:
  - Why this exists: Deterministic DDL generation and single source-of-truth for schema.
  - Alternatives: Hand-written SQL migrations (gives finer control) — use when using DB features unsupported by Prisma.
  - When NOT to use Prisma migrate: When migration must run privileged server-side provisioning (e.g., `CREATE EXTENSION` not supported via Prisma) — then include SQL migration steps in infra provisioning.
  - Common mistakes: Running `prisma migrate deploy` without a pinned Prisma version or without a shadow DB configured.

---

### INTERNAL DOCS TO ADD OR EXTEND (required)

Only include these if coverage is PARTIAL or MISSING (it is).

- Path: /docs/official-docs/EPIC-B/postgresql.md
  - Purpose: Authoritative Postgres guidance for EPIC-B tasks: pin major version, include `CREATE EXTENSION` examples, timezone enforcement, and trigger semantics for that version.
  - Exact knowledge to add: Exact `CREATE EXTENSION` commands, sample `postgresql.conf` or `ALTER DATABASE ... SET timezone = 'UTC'`, and notes about managed DBs (RDS/Azure) differences.
  - Required version pin: VERSION REQUIRED — choose a minor/major (e.g., 15.x or 18.x) before planning.

- Path: /docs/official-docs/EPIC-B/prisma-migrations.md
  - Purpose: Document the repo's Prisma version (`7.3.0`) and the migration workflow (shadow DB, generate SQL review, apply order), and how to include raw SQL `CREATE EXTENSION` steps where needed.
  - Exact knowledge to add: `prisma migrate` commands, `schema.prisma` patterns for raw SQL migrations, and CI checks for migrations.
  - Required version pin: 7.3.0

- Path: /docs/official-docs/EPIC-B/db-provisioning.md
  - Purpose: Provide approved IaC patterns for dev/prod DB provisioning (Terraform module examples and Docker Compose dev setup), and secrets handling guidance.
  - Exact knowledge to add: sample Terraform module usage, required cloud provider IAM roles, dev `docker-compose.yml` snippet, and vault/secret rotation guidance.
  - Required version pin: VERSION UNKNOWN — MUST PIN Terraform and Docker Compose tool versions.

---

### OPEN QUESTIONS / AMBIGUITIES (blockers)

1. Which PostgreSQL major/minor version should the project pin for production? (Blocking — required before writing `CREATE EXTENSION` steps.)
2. Does the organization allow `pgcrypto` / `uuid-ossp` on the managed DB product chosen, or must UUIDs be client-generated?
3. Who owns infra provisioning (this repo vs separate infra repo)? Planner must confirm to determine whether to add Terraform modules under this repo.
4. Are there regulatory retention minima that alter timezone or timestamp storage semantics? (e.g., legal requirements to preserve local timezone)

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (new Docs Gatekeeper brief for Feature B1):

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B1 — Database Setup
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B1_Database Setup.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to verify official Postgres docs, Prisma migration pin, and internal doc gaps for DB provisioning and UUID extension.

If registry append is not acceptable automatically, return this exact block to the integrator to append.

---
```
