# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C2_User_Identity_Readiness
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md

### TASKS CHECKED

- Inventory `User` table definitions (migrations, Prisma schema) and report whether `id` is PK, `email` unique, and presence of `name`, `image`, `role`, and timestamps.

### WHAT ALREADY EXISTS

- [packages/schema/prisma/schema.prisma](packages/schema/prisma/schema.prisma#L1-L200) — Prisma schema containing `model User`:
  - `id` is `String @id @default(uuid()) @db.Uuid` (primary key).
  - `email` is `String @unique`.
  - `githubId` is `String? @unique`.
  - `role` is `UserRole` with `@default(USER)`.
  - `icprScore` present with default `0`.
  - `createdAt` (`DateTime @default(now())`) and `updatedAt` (`DateTime @updatedAt`) exist.
  - Relations: `accounts`, `sessions`, `authIdentities`, `authSessions`, `labSessions`, `auditLogs` are declared.

- [packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql](packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql#L1-L200) — initial SQL migration that created `User` table and enums. Notes:
  - Created `UserRole` enum initially containing `CANDIDATE, ADMIN, RECRUITER`.
  - Created `User` with `githubId` and `email` (both NOT NULL in initial migration) and `icprScore`, no timestamps at creation.
  - Added unique indexes for `User_githubId_key` and `User_email_key`.

- [packages/schema/prisma/migrations/20260124094856_add_auth_models/migration.sql](packages/schema/prisma/migrations/20260124094856_add_auth_models/migration.sql#L1-L200) — migration that:
  - Dropped `tier` column on `User` (with explicit warning in migration file).
  - Altered `githubId` to be nullable.
  - Set `role` default to `CANDIDATE` at that migration step.
  - Created `Account`, `Session`, `VerificationToken` tables and unique indexes for session/account tokens.

- [packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql](packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql#L1-L200) — migration that:
  - Created `AuthProvider` enum (`EMAIL, GOOGLE, GITHUB`).
  - Renamed `UserRole` value `CANDIDATE` → `USER`.
  - Added `createdAt` and `updatedAt` to `User` and set `role` default to `USER`.
  - Created `AuthIdentity` and `AuthSession` tables with unique indexes.

- [packages/schema/prisma/seed.ts](packages/schema/prisma/seed.ts) — seed script present (references test user and sessions; exercises identity/auth paths).

- [apps/forgea-labs/auth.config.ts](apps/forgea-labs/auth.config.ts) — application-level auth config (NextAuth + Prisma adapter referenced in repo docs and code comments).

### WHAT IS PARTIALLY IMPLEMENTED

- `name`: Not present on `User` model in `schema.prisma` (no `name` column found). Some app code may expect a display name; not found in schema.
- `image`: Not present on `User` model in `schema.prisma` (no `image`/avatar column found).
- Enums/history: `UserRole` transitioned from `CANDIDATE` → `USER` across migrations. Current Prisma enum in `schema.prisma` is `ADMIN, USER, RECRUITER` (matches the final migration), but earlier migration artifacts reference `CANDIDATE`.
- Both `Session` and `AuthSession` models exist (as separate tables). Both have `sessionToken` unique indexes. This duplication is present in schema and migrations and may reflect different adapter/usage paths.

### WHAT IS MISSING (explicitly not found)

- No `name` column on `User` in Prisma schema or migrations.
- No `image` (avatar URL) column on `User` in Prisma schema or migrations.
- No explicit database-level `CHECK` constraints or explicit non-null constraints for `email` beyond the Prisma `@unique` (Prisma creates NOT NULL for `email` unless declared optional) — note: `email` is non-nullable per schema.

### RISKS OR CONFLICTS (observed in code/migrations)

- Enum value rename: `UserRole` originally included `CANDIDATE`; later migration renames `CANDIDATE` → `USER`. If any deployed DBs are out-of-sync with migrations, enum mismatches could break runtime code or queries.
- Data-loss migration: `20260124094856_add_auth_models/migration.sql` contains a comment warning that dropping the `tier` column will lose data. The migration file indicates a conscious destructive change occurred.
- Migration ordering/semantics: The repo has several incremental migrations that change `User` columns (nullable change for `githubId`, addition of timestamps). Environments that haven't run all migrations could observe inconsistent schema (e.g., missing timestamps, different role defaults).
- Duplicate session models: Presence of both `Session` and `AuthSession` may be intentional, but it is a potential source of confusion for Docs Gatekeeper / planners (which table is authoritative for auth flows?).

### QUESTIONS FOR CLARIFICATION

- Should `name` and `image` be required fields on `User` per official data-model policy, or are they optional/managed elsewhere? (Docs Gatekeeper will need this to validate constraints.)
- Which session table is the canonical session store for NextAuth in this repo: `Session` or `AuthSession`? (Both exist in schema.)

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

(For the Docs Gatekeeper agent)

Please review the code-scout findings in this report: [docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md](docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md).

Tasks (scope strictly limited to schema verification against official data-model policy):

- Verify whether the `User` model fields meet the project's official data-model policy. Specifically confirm required constraints (NOT NULL, UNIQUE, length limits, formats) for these fields: `id`, `email`, `name`, `image`, `role`, `createdAt`, `updatedAt`.
- For each field listed above, produce a single-line status: `Compliant` or `Non-compliant` plus a one-line reason referencing the exact file and line-range from this report where the evidence is found.
- Validate enums: confirm `UserRole` values are acceptable (`ADMIN`, `USER`, `RECRUITER`) and note the observed migration rename (`CANDIDATE` → `USER`) as a potential policy mismatch if policy expects a different name.
- Check auth-related tables present in schema (`Account`, `Session`, `AuthIdentity`, `AuthSession`, `VerificationToken`) and state whether the policy requires merging/renaming or special constraints (e.g., which session table is authoritative).
- For each non-compliance, list the exact constraint(s) or policy text that the schema does not satisfy. Do NOT propose SQL or migration steps — only reference policy lines and the exact schema locations that fail them.

Deliverable format (structured):

- Short summary (1–2 lines)
- Field-by-field compliance table (one bullet per field)
- Enum concordance note (one bullet)
- Auth tables check (1–3 bullets)
- Explicit list of policy items that require attention (each bullet references policy doc + schema file path)

Do not modify code or write migrations. Your output will be used by the Planner / Architect agent to create migration tasks.

Reference: this code-scout report is at [docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md](docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md).

Handoff complete. Provide this report verbatim to the next agent.
