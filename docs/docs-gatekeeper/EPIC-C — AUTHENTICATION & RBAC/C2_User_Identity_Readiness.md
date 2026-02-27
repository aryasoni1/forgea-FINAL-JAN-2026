## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C2_User_Identity_Readiness
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md
  - Coverage status: PARTIAL
  - Exact gaps: Inventories schema and migrations but does not state policy-required constraints (length limits, CHECK constraints, nullable policy) nor pin official references.

- /docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry exists but contains no EPIC-C / C2 entry; master registry must list this brief once added.

- /docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Prisma and PostgreSQL are verified, but NextAuth (and NextAuth adapter) are not present and must be added/pinned before planning migrations.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Rationale: Prisma and PostgreSQL official docs are present/verified (prisma 7.3.0, postgres 18.1) and cover core ORM/DB semantics, but adapter/runtime docs (NextAuth) are not version-pinned or registered. Internal EPIC-C official-docs are missing and need extension to capture policy-level constraints (e.g., whether `name`/`image` must exist, column length limits, and authoritative session table).

### STUDY GUIDE FOR HUMAN

- `Prisma` — Why: canonical mapping from Prisma types to DB; Alternatives: other ORMs (TypeORM, Sequelize) — not used here; When NOT to use: only when direct SQL migrations are required; Common mistakes: assuming enum renames are no-op, missing generated SQL differences.
- `PostgreSQL` — Why: DB-level enforcement of enums/constraints; Alternatives: other DB engines — not applicable; When NOT to use: none; Common mistakes: renaming enum values without verifying existing data or cross-env consistency.
- `NextAuth` — Why: adapter controls session model choice; Alternatives: custom session store or JWT-based sessions; When NOT to use: when using stateless JWT only; Common mistakes: leaving adapter version unpinned and having duplicate/concurrent session tables.

### INTERNAL DOCS TO ADD OR EXTEND

Only include if coverage is PARTIAL (it is):

- Path: /docs/official-docs/EPIC-C/nextauth_official.md
  - Purpose: Pin NextAuth version and document adapter expectations (Prisma adapter session model, tokens, and canonical table names).
  - Exact knowledge to add: NextAuth version, adapter behavior, table mapping (`Session` vs `AuthSession`), token uniqueness semantics.
  - Required version pin: VERSION MUST BE PROVIDED (e.g., `next-auth@4.x` or exact semver).

- Path: /docs/official-docs/EPIC-C/user-data-model-policy.md
  - Purpose: Project data-model policy for `User` (required vs optional fields, length limits, image URL rules, and constraints)
  - Exact knowledge to add: For fields `id`, `email`, `name`, `image`, `role`, `createdAt`, `updatedAt` — required NULL/NOT NULL, UNIQUE, formats, and any CHECKs.
  - Required version pin: references to Prisma 7.3.0 and PostgreSQL 18.1 in doc header.

### OPEN QUESTIONS / AMBIGUITIES

- Are `name` and `image` required by project policy or optional (docs/code-scout shows they are missing in schema)? This blocks pinning NOT NULL constraints.
- Which session table is canonical for NextAuth in this repo: `Session` or `AuthSession`? Both exist in schema and migrations.
- Are there deployed DBs that predate the enum rename (`CANDIDATE` → `USER`)? If so, migrations may fail without coordinated rollout.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C2 — User Identity Readiness
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for user identity schema and session model.

---

End of brief.
