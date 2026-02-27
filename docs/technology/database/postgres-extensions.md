# PostgreSQL Extensions HOWTO

- Category: Database
- Epics: B
- Version / Requirement: Extension availability depends on Postgres version (pin Postgres)
- Intent / Critical Decision: Document commonly-used Postgres extensions (pgcrypto, uuid-ossp, pg_trgm) and how to enable them in RDS and self-hosted.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING
- EPIC-B intent: Ensure migrations and schema use supported extensions and capture provider-specific enablement steps.
- Important points:
  - `pgcrypto`: Use for server-side UUID generation and cryptographic functions. On RDS/Aurora, enable via parameter group or extension creation if supported.
  - `uuid-ossp`: Alternative UUID functions; availability varies by provider—prefer `gen_random_uuid()` from `pgcrypto` on modern Postgres.
  - `pg_trgm`: Useful for fuzzy text search and indexing; create GIN indexes for `pg_trgm`-based searches.
  - Enabling extensions:
    - RDS: Some extensions are supported out-of-the-box; use `CREATE EXTENSION IF NOT EXISTS pgcrypto;` in migrations or via parameter groups where required.
    - Self-hosted: Install extension packages via OS package manager and run `CREATE EXTENSION` in the database role with proper privileges.
  - Migration notes: Ensure `prisma` migration SQL includes `CREATE EXTENSION` statements and that the CI infra has privileges to create extensions in shadow DBs.
