### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Enum mapping, migrations, and schema defaults
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Authoritative behavior of Prisma enum generation and migration SQL; needed to design safe enum renames and backfills.
  - Decision it informs: Migration order and whether Prisma will generate `CREATE TYPE` / `ALTER TYPE` semantics compatible with Postgres.
  - What breaks without it: Incorrect migration assumptions can produce runtime errors or broken enum values in deployed DBs.

- Technology: PostgreSQL
  - Concept: Enum types, DDL semantics, transactional ALTERs, and CHECK constraints
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Clarifies safe patterns for renaming enum labels, adding/removing values, and atomic backfills.
  - Decision it informs: Safe migration order (create new value → backfill rows → update app → drop old value).
  - What breaks without it: Enum operations may fail or leave incompatible enum labels across environments.

- Technology: OWASP — Access Control Guidance
  - Concept: Access-control design patterns, least-privilege, and audit logging
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html
  - Exact version requirement: LIVING DOCUMENT — REVIEW BEFORE IMPLEMENTATION
  - Why required: Governs recommended enforcement semantics (default-deny, server-side checks, audit hooks) and common pitfalls to avoid.
  - Decision it informs: Whether enforcement is safe in Edge middleware or must live server-side and which audit hooks to require.
  - What breaks without it: Inconsistent enforcement and privilege escalation risks.
