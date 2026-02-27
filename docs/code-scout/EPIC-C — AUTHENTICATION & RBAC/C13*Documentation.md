# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C13 — Documentation
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C13_Documentation.md

### TASKS CHECKED

- Forgea Code Scout Prompt: Provide a list of files and code snippets that should be referenced in the auth docs (config, middleware, models, migrations). Output full paths.

### WHAT ALREADY EXISTS

- /forgea-monorepo/apps/forgea-labs/auth.config.ts
  - NextAuth configuration (providers: GitHub, Credentials), PrismaAdapter(db), session strategy: "database", pages override signIn -> "/login", and event hooks for `signIn` and `createUser` which call `AuditService.log`.
  - Snippet (providers section):

    ```ts
    providers: [
      GitHub({ clientId: process.env.GITHUB_ID ?? "", clientSecret: process.env.GITHUB_SECRET ?? "", ... }),
      Credentials({ name: "credentials", credentials: {...}, async authorize(...) { /* bcrypt + accounts lookup */ }}),
    ],
    ```

- /forgea-monorepo/apps/forgea-labs/auth.ts
  - Exports NextAuth handlers and helpers: `export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)`.

- /forgea-monorepo/apps/forgea-labs/app/(auth)/login/page.tsx
  - App-router sign-in page exists; currently a minimal placeholder (no provider buttons or email/password form).

- /forgea-monorepo/apps/forgea-labs/app/(auth)/signup/page.tsx
  - Signup page placeholder.

- /forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - App-route entrypoint that re-exports `handlers` from `auth.ts` (NextAuth API surface).

- /forgea-monorepo/apps/forgea-labs/middleware.ts
  - Edge-safe middleware that checks presence of next-auth session cookies and redirects unauthenticated requests to `/login` for protected routes (`/dashboard`, `/lab`, `/ticket`, `/admin`).

- /forgea-monorepo/packages/schema/prisma/schema.prisma
  - Prisma schema with `User`, `Account`, `Session`, `AuthIdentity`, `AuthSession`, `VerificationToken`, `AuditLog` and enums `UserRole`, `AuthProvider`, etc.
  - Snippet (User model & key enums):

    ```prisma
    enum UserRole { ADMIN USER RECRUITER }

    model User {
      id String @id @default(uuid()) @db.Uuid
      email String @unique
      githubId String? @unique
      role UserRole @default(USER)
      accounts Account[]
      sessions Session[]
      auditLogs AuditLog[]
    }
    ```

- /forgea-monorepo/packages/schema/prisma/migrations/**
  - Migration files present (e.g., `20260124094856_add_auth_models/migration.sql`, `20260209120000_identity_auth_tables/migration.sql`) that create auth-related tables and audit triggers. See packages/schema/prisma/migrations/*.sql.

- /forgea-monorepo/packages/audit/src/audit.service.ts
  - Append-only AuditService with `log()` helper, scrub/size enforcement, correlation context, and write to `db.auditLog.create(...)`.

### WHAT IS PARTIALLY IMPLEMENTED

- Credentials provider backend: `auth.config.ts` `Credentials.authorize()` performs Prisma `user` lookup and bcrypt comparison against an `accounts` record (credentials stored in `access_token`). Server-side flow is implemented, but no client-side form exists yet.

- Audit hooks: `events.signIn` and `events.createUser` run `AuditService.log` with contextual headers (ip, userAgent, correlationId). Hooks are present and wired.

- API route handlers: NextAuth app-route exists and is wired to `auth.config.ts` via `auth.ts` and `app/api/auth/[...nextauth]/route.ts`.

### WHAT IS MISSING

- UI wiring for providers: `app/(auth)/login/page.tsx` is a placeholder — no OAuth provider buttons (GitHub already configured) or email/password form are present.

- Google provider: `auth.config.ts` includes GitHub and Credentials only. No Google provider config or environment variables (GOOGLE_ID/GOOGLE_SECRET) found.

- Logout redirect specification: `auth.config.ts` sets `pages.signIn` and `pages.error`, but there is no documented or explicit `signOut` page or centralized logout-redirect policy in source.

- Documentation artifacts: No authored auth architecture docs found under `/docs/official-docs/EPIC-C/` (expected in orchestrator plan).

### RISKS OR CONFLICTS

- Build artifact noise: Repo contains many `.next` build artifacts; search and references must use source paths (apps/**, packages/**, not .next) to avoid confusion.

- Audit dependency: Audit hooks are integrated into auth events; any changes to sign-in/user creation flows must preserve AuditService calls and the append-only assumptions expressed in `audit.service.ts` and DB migrations.

- Credentials storage pattern: The Credentials provider compares password with `accounts.access_token`. Review and document this design decision (security assumptions) before changing storage semantics.

### QUESTIONS FOR CLARIFICATION

- Should documentation include guidance for adding Google (and which identity providers) as part of this feature? (No Google provider exists by default.)
- What is the canonical post-login redirect target when no `callbackUrl` present? (common choices: previous protected page or `/dashboard`)
- What is the canonical post-logout redirect target? (common choice: `/login`)

### NEXT AGENT HANDOFF PROMPT (for Documenter / Historian)

Role: Documenter / Historian
Reference: This Code Scout report at docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C13*Documentation.md

Task: Produce documentation for the authentication subsystem into `/docs/official-docs/EPIC-C/` covering the items below. Use the file paths and snippets listed in this report for exact references.

Deliverables (markdown):
- **Auth Architecture Overview**: high-level flow diagram plus component responsibilities. Reference: `/apps/forgea-labs/auth.config.ts`, `/apps/forgea-labs/auth.ts`, `/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`, `/apps/forgea-labs/middleware.ts`.
- **Session Model & Schema**: explain Prisma models (`User`, `Account`, `Session`, `AuthIdentity`, `AuthSession`, `VerificationToken`) and session strategy (`database`). Reference: `/packages/schema/prisma/schema.prisma` and migrations under `/packages/schema/prisma/migrations/`.
- **Provider Setup**: list configured providers (GitHub, Credentials). Note missing providers (e.g., Google) and required env vars (`GITHUB_ID`, `GITHUB_SECRET`, and if added `GOOGLE_ID`, `GOOGLE_SECRET`). Reference: `/apps/forgea-labs/auth.config.ts`.
- **Credentials Flow**: document server-side `authorize()` logic in `Credentials` provider (validation schema, user lookup, `accounts` usage, bcrypt check). Reference code snippet in `/apps/forgea-labs/auth.config.ts`.
- **Audit & Compliance**: describe `AuditService.log()` behavior, append-only model, scrub rules, correlation context, and migrations that enforce immutability. Reference: `/packages/audit/src/audit.service.ts`, `/packages/schema/prisma/migrations/*` and `AuditLog` model in schema.
- **Middleware & Protected Routes**: explain edge-safe middleware limits (cookie presence only) and responsibilities for RBAC validation in server components. Reference: `/apps/forgea-labs/middleware.ts`.
- **Operational Notes & Env**: list required env vars (NEXTAUTH_SECRET/AUTH_SECRET, NEXTAUTH_URL, GITHUB_ID/GITHUB_SECRET, DATABASE_URL). Reference `.env.example` if present and `auth.config.ts` usage.
- **Security Assumptions & Known Limitations**: explicitly document the Credentials storage pattern (passwords hashed and stored on `accounts.access_token`), audit non-blocking behavior, and any pending items (Google provider, login UI wiring).
- **Acceptance Criteria**: provide testable checks (API routes respond, migrations applied, audit entries created on sign-in/createUser, middleware redirects protected routes to `/login`).

Constraints: Do not modify source code in the documentation task. Include file links to the source paths above and paste small, read-only code snippets for clarity (use the snippets already captured in this report).

Place the final markdown under `/docs/official-docs/EPIC-C/` and update `docs/official-docs-registry.md` to reference the new docs pages.

Handoff complete. Provide this report verbatim to the next agent.