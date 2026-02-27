## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C13 — Documentation
- Exact input files read:
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C13\*Documentation.md
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C13_Documentation.md
  - /forgea-monorepo/apps/forgea-labs/auth.config.ts
  - /forgea-monorepo/apps/forgea-labs/auth.ts
  - /forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - /forgea-monorepo/apps/forgea-labs/middleware.ts
  - /forgea-monorepo/packages/schema/prisma/schema.prisma
  - /forgea-monorepo/packages/audit/src/audit.service.ts

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: NextAuth
  - Concept: Provider/config lifecycle, `Credentials` provider `authorize()`, session strategy (`database`)
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Prisma
  - Concept: Schema models for auth (User, Account, Session, AuthSession), migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: GitHub OAuth
  - Concept: OAuth profile fields and provider configuration
  - Official source: https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
  - Exact version requirement: N/A (provider docs)

- Technology: OWASP Logging & Session best-practices
  - Concept: Audit logging, PII redaction, session management guidance
  - Official source: https://cheatsheetseries.owasp.org/
  - Exact version requirement: Living documents (use canonical)

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C13*Documentation.md`
  - Coverage status: PARTIAL
  - Exact gaps: Lists source files and snippets but no authored docs exist under `/docs/official-docs/EPIC-C/`.

- Code references (not documentation):
  - `apps/forgea-labs/auth.config.ts` — NextAuth configuration (providers, events)
  - `apps/forgea-labs/auth.ts` — NextAuth exports
  - `apps/forgea-labs/middleware.ts` — Edge middleware
  - `packages/schema/prisma/schema.prisma` and migrations — models and DDL
  - `packages/audit/src/audit.service.ts` — append-only audit behavior

### DOCUMENTATION COVERAGE DECISION

❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

Rationale: The repository contains source and code-snippets but no formal auth documentation under `/docs/official-docs/EPIC-C/`. The orchestrator requested a set of deliverables; these must be authored before planning or rollouts proceed.

### STUDY GUIDE FOR HUMAN

- Auth Architecture: Understand `NextAuth` as the auth surface, `PrismaAdapter` for persistence, and `apps/forgea-labs/auth.ts` as the app entrypoint for NextAuth handlers.
- Session Model: Know that Prisma models (`Session`, `AuthSession`) exist — pick a canonical model and document migration implications.
- Providers: GitHub and Credentials are configured; document env vars and how `Credentials.authorize()` uses `accounts.access_token` + bcrypt.
- Audit: `AuditService.log()` is invoked on sign-in/createUser events; document scrub/retention expectations and required compliance alignment.

### INTERNAL DOCS TO ADD (deliverables)

Create these files under `/docs/official-docs/EPIC-C/`.

- Path: /docs/official-docs/EPIC-C/auth-architecture-overview.md
  - Purpose: High-level flow diagram and component responsibilities. Reference source files: `apps/forgea-labs/auth.config.ts`, `apps/forgea-labs/auth.ts`, `apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`, `apps/forgea-labs/middleware.ts`.

- Path: /docs/official-docs/EPIC-C/session-model-and-schema.md
  - Purpose: Explain Prisma models (`User`, `Account`, `Session`, `AuthIdentity`, `AuthSession`, `VerificationToken`) and session strategy (`database`). Reference: `packages/schema/prisma/schema.prisma` and `/packages/schema/prisma/migrations/`.

- Path: /docs/official-docs/EPIC-C/provider-setup.md
  - Purpose: List configured providers (GitHub, Credentials), required env vars, and steps to add Google or others.

- Path: /docs/official-docs/EPIC-C/credentials-flow.md
  - Purpose: Document `Credentials.authorize()` logic (validation schema, user lookup, `accounts` usage, bcrypt check). Reference `apps/forgea-labs/auth.config.ts` snippets.

- Path: /docs/official-docs/EPIC-C/audit-and-compliance.md
  - Purpose: Describe `AuditService.log()` behavior, append-only model, scrub rules, correlation context, and relevant migrations.

- Path: /docs/official-docs/EPIC-C/middleware-and-protected-routes.md
  - Purpose: Explain edge middleware responsibilities and where RBAC checks must be enforced (server vs edge).

- Path: /docs/official-docs/EPIC-C/operational-notes-and-env.md
  - Purpose: List required env vars and operational guidance (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GITHUB_ID`, `GITHUB_SECRET`, `DATABASE_URL`, `GITHUB_WEBHOOK_SECRET`).

- Path: /docs/official-docs/EPIC-C/security-assumptions.md
  - Purpose: Document Credentials storage pattern, audit non-blocking behavior, known limitations (missing Google provider, missing UI), and recommended mitigations.

- Path: /docs/official-docs/EPIC-C/acceptance-criteria.md
  - Purpose: Testable checks: NextAuth endpoints respond, migrations applied, audit entries on sign-in/createUser, middleware redirects protected routes to `/login`, provider flows succeed.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Should the docs include guidance for adding Google and which identity providers are approved? (BLOCKER)
- What are canonical post-login and post-logout redirect targets? (BLOCKER)
- Confirm whether `accounts.access_token` storage for credentials is acceptable or needs refactor/documentation. (BLOCKER)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C13 — Documentation
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C13_Documentation.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to request canonical auth documentation under `/docs/official-docs/EPIC-C/`.
