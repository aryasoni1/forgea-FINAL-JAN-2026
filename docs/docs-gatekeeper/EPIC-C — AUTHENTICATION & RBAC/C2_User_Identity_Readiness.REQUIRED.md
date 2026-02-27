### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema definition & migrations (Prisma + migration semantics)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Informs schema syntax, enum migration semantics, and how Prisma maps enums and defaults to PostgreSQL.
  - Decision it informs: Whether current `schema.prisma` and generated migrations are valid and safe to apply.
  - What breaks without it: Wrong assumptions about enum renames, default behaviors, or column mappings could cause runtime errors or failed migrations.

- Technology: PostgreSQL
  - Concept: Enum types, constraints, and DDL semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Clarifies how enum renames, NOT NULL, UNIQUE, and CHECK constraints are enforced at DB level.
  - Decision it informs: Whether migration SQL correctly handles enum renames (e.g., `CANDIDATE` → `USER`) and nullable changes.
  - What breaks without it: Misapplied migrations could fail on production DBs or leave inconsistent enum values.

- Technology: NextAuth / NextAuth.js
  - Concept: Session model, adapter expectations, and canonical session store
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines which session model (e.g., `Session` vs `AuthSession`) the adapter expects and token uniqueness semantics.
  - Decision it informs: Which DB table is authoritative for user sessions and how to model session tokens safely.
  - What breaks without it: Wrong adapter/table choices can lead to duplicate session stores, race conditions, or lost sessions.
