# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C1 — Auth Foundation
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C1_Auth_Foundation.md

### TASKS CHECKED

- Forgea Code Scout: scan repository for existing auth-related code (files, middleware, services, env keys, and package.json deps), list locations, call out potential conflicts with adding Auth.js or NextAuth.
- Docs Gatekeeper: (next agent) validate chosen auth approach against pinned toolchain/docs.
- Planner / Architect: (subsequent) produce the task spec for implementation.

### WHAT ALREADY EXISTS

- /forgea-monorepo/apps/forgea-labs/auth.ts
  - Exports NextAuth helpers: `export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);` (imports `next-auth`).

- /forgea-monorepo/apps/forgea-labs/auth.config.ts
  - Full `NextAuthOptions` configuration found. Uses `GitHub` and `Credentials` providers, `PrismaAdapter(db)`, `session.strategy = "database"`, and `events` hooks that call the audit service (`../../packages/audit/src/audit.service`).

- /forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - Route that re-exports NextAuth `handlers` from `/apps/forgea-labs/auth.ts` (GET/POST handlers present).

- /forgea-monorepo/apps/forgea-labs/lib/auth.ts
  - Server helper `getCurrentUser()` which dynamically imports `@/auth` and `@/lib/db` and reads session via `auth()`.

- /forgea-monorepo/apps/forgea-labs/middleware.ts
  - Edge-safe middleware that checks presence of NextAuth cookies (`__Secure-next-auth.session-token` and `next-auth.session-token`) and redirects unauthenticated requests for protected routes to `/login`.

- /forgea-monorepo/apps/forgea-labs/package.json
  - Declares auth-related packages:
    - `next-auth` @ ^4.24.13
    - `@auth/prisma-adapter` @ ^2.11.1
    - `@next-auth/prisma-adapter` @ ^1.0.7
    - `@prisma/client` @ ^7.3.0

- /forgea-monorepo/packages/schema/prisma/schema.prisma
  - Prisma schema includes `User`, `Account`, `Session`, `VerificationToken` and other models matching NextAuth adapter expectations (e.g., `accounts`, `sessions`). Fields include `githubId` on `User`.

- /forgea-monorepo/packages/schema/prisma/migrations/\*
  - Migration folders present (e.g., `20260124065750_init_trust_schema`, `20260124094856_add_auth_models`, `20260209120000_identity_auth_tables`, etc.).

- /forgea-monorepo/.env.example
  - Contains `DATABASE_URL`, `GITHUB_ID`, `GITHUB_SECRET`, and `GITHUB_WEBHOOK_SECRET` example entries.

- Build artifacts / config references
  - Several build/tsbuildinfo files reference `@auth/core` and `next-auth` types (evidence that both `next-auth` and `@auth/*` types/packages appear in the dependency graph or build cache).

### WHAT IS PARTIALLY IMPLEMENTED

- Env vars: `GITHUB_ID` and `GITHUB_SECRET` are present in `.env.example`, but there is no explicit `NEXTAUTH_SECRET` or `NEXTAUTH_URL` in the root `.env.example` (these may be supplied elsewhere at runtime).

- Prisma schema and migrations: Prisma models for auth exist and migrations are present, indicating DB schema is provisioned. What is not shown here is a runtime-verified migration state in deployed envs (outside repo).

- Adapters / packages: `@auth/prisma-adapter`, `@next-auth/prisma-adapter`, and `next-auth` are present in `/apps/forgea-labs/package.json`. The presence of `@auth/*` types in build metadata suggests partial/indirect references to Auth.js-related packages in the dependency graph (from other packages or transient deps), but the primary runtime integration in code is `next-auth`.

### WHAT IS MISSING (NOT FOUND)

- Centralized secret-management references: no repository-local canonical secret-store config was found (e.g., no `vault`/`secrets` manifest in repo root). (Agent Orchestrator suggested adding an agent to verify env-secret storage; not found here.)

- Explicit `NEXTAUTH_SECRET` / `NEXTAUTH_URL` in `.env.example` (not present in root example file).

- Any separate Auth.js (new `@auth/core` + adapters) usage in application code paths: code imports `next-auth` and `@next-auth/prisma-adapter` usage is explicit; there is no direct app source file that imports `@auth/core` handlers instead of `next-auth`.

### RISKS OR CONFLICTS (observed in code)

- Co-existing adapter packages: repository lists both `@auth/prisma-adapter` and `@next-auth/prisma-adapter` in `/apps/forgea-labs/package.json`. This can create ambiguity about which adapter is intended at runtime or during a migration.

- Mixed auth packages in dependency graph: build cache references (`tsconfig.tsbuildinfo` / `.next`) include `@auth/core` type references in addition to `next-auth`. If a migration to Auth.js (Auth.js often uses `@auth/core`) were attempted without coordinated changes, there is a risk of duplicate/conflicting runtime behavior or incompatible handler APIs.

- Cookie and middleware coupling: `middleware.ts` checks the NextAuth cookie names (`__Secure-next-auth.session-token` and `next-auth.session-token`). Changing auth implementation (to Auth.js or different cookie naming) would require coordinated middleware updates to avoid breaking route protection.

- Auditing hooks tied to NextAuth flow: `auth.config.ts` registers `events` hooks that call the AuditService. Any change of auth handler semantics or provider events needs to preserve the same hooks or equivalent integration, otherwise audit coverage may be lost.

### QUESTIONS FOR CLARIFICATION

- Confirm which auth library is the target for the project going forward: continue with `next-auth` v4 (current) or migrate to Auth.js (`@auth/core`)?
- Should `NEXTAUTH_SECRET` and `NEXTAUTH_URL` be added to canonical `.env.example` and secret-store docs (Docs Gatekeeper to advise)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Docs Gatekeeper

Prompt (copy-paste-ready):

Please review the code-scout report at `docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C1_Auth_Foundation.md` (this file) and validate whether choosing Auth.js (`@auth/core` + adapters) or NextAuth (`next-auth` v4) conforms to the repository's pinned toolchain and official-docs policies.

Facts to use from the report:

- `/apps/forgea-labs/package.json` declares `next-auth` at `^4.24.13`, `@auth/prisma-adapter` `^2.11.1`, and `@next-auth/prisma-adapter` `^1.0.7`.
- App code imports and wires `next-auth` in `/apps/forgea-labs/auth.ts`, `/apps/forgea-labs/auth.config.ts`, and `app/api/auth/[...nextauth]/route.ts`.
- Prisma schema with `User`, `Account`, `Session` (matching NextAuth models) exists at `/packages/schema/prisma/schema.prisma` and migration folders exist under `/packages/schema/prisma/migrations`.
- `.env.example` contains `GITHUB_ID` / `GITHUB_SECRET` but does not include `NEXTAUTH_SECRET` or `NEXTAUTH_URL`.
- `middleware.ts` in `/apps/forgea-labs` checks NextAuth cookie names (`__Secure-next-auth.session-token`, `next-auth.session-token`).
- Build metadata contains references to `@auth/core` types in caches, indicating `@auth/*` is present somewhere in the dependency graph.

Requested checks (do not propose implementation changes):

- Confirm whether Auth.js or NextAuth is allowed per `docs/toolchain-versions.md` and `docs/official-docs-registry.md` pinned versions and policies. If either is disallowed, list the exact policy lines or pinned-version constraints that block it.
- If both are allowed, list required version pins that must be enforced in `package.json` and `docs/toolchain-versions.md` to avoid mixed-adapter conflicts (report only, do not change files).
- Flag any policy conflicts (e.g., security policy requiring secret rotation, cookie naming conventions, or adapter/version constraints) and reference the precise doc path/line(s) in `docs/` that cause the conflict.
- Verify whether adding Auth.js (if requested) would require updates to these repo files (list only filenames that would be impacted): `/apps/forgea-labs/auth.ts`, `/apps/forgea-labs/auth.config.ts`, `/apps/forgea-labs/middleware.ts`, `/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`, `/packages/schema/prisma/schema.prisma`, and `/apps/forgea-labs/package.json`.

Return a succinct checklist: allowed/disallowed per doc, policy lines cited, and a short list of files that must be coordinated if a migration is chosen. Do not implement changes; this is a documentation validation step only.

Handoff complete. Provide this report verbatim to the next agent.
