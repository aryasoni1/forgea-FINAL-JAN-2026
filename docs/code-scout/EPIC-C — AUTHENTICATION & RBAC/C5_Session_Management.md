# Code Scout Report — C5: Session Management

## FEATURE CONTEXT
- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C5_Session_Management
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C5_Session_Management.md

## TASKS CHECKED
- Forgea Code Scout: inventory session handling and models
- Docs Gatekeeper: validate cookie flags and timeout policy (hand-off)
- Planner / Architect: prepare migration/config tasks (hand-off)

## WHAT ALREADY EXISTS
- forgea-monorepo/apps/forgea-labs/auth.config.ts
  - NextAuth options present; `session.strategy = "database"`; `adapter: PrismaAdapter(db)`; providers: GitHub and Credentials; event hooks for signIn/createUser.
- forgea-monorepo/apps/forgea-labs/auth.ts
  - NextAuth entry exporting `handlers, auth, signIn, signOut`.
- forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - API route re-exports NextAuth `GET`/`POST` handlers.
- forgea-monorepo/apps/forgea-labs/middleware.ts
  - Edge-safe middleware checks presence of `__Secure-next-auth.session-token` and `next-auth.session-token` cookies and redirects unauthenticated requests to `/login` for protected routes.
- forgea-monorepo/packages/schema/prisma/schema.prisma
  - Contains `model Session` and `model AuthSession` (both with `sessionToken`, `userId`, `expires`) and `User` model relations.
- forgea-monorepo/packages/schema/prisma/migrations/
  - Migration folders include `20260124094856_add_auth_models/` and `20260209120000_identity_auth_tables/` (auth/session models present in migration history).
- forgea-monorepo/apps/forgea-labs/package.json
  - Declares `next-auth`@^4.24.13, `@next-auth/prisma-adapter`, `@auth/prisma-adapter`, and `@prisma/client` among dependencies.

## WHAT IS PARTIALLY IMPLEMENTED
- Cookie policy flags: No explicit cookie `HttpOnly`, `Secure`, or `SameSite` settings are present in `auth.config.ts` (no explicit `cookies` or `session.maxAge`/`cookie` configuration found in the NextAuth options).
- Session expiry settings: `auth.config.ts` sets `strategy: "database"` but does not declare `session.maxAge` or idle/absolute timeout values in the NextAuth config.
- Middleware scope: Edge middleware only checks cookie presence (boolean) and intentionally does not validate or decode sessions — server-side validation is delegated elsewhere.
- Environment documentation: `.env.example` lacks `NEXTAUTH_SECRET` and `NEXTAUTH_URL` entries (runtime secrets/URL are not documented in the canonical example).

## WHAT IS MISSING
- Explicit cookie flag configuration in codebase for production (no `cookies` object or cookie attributes in NextAuth config observed).
- Explicit session timeout configuration (idle and absolute timeout values not found in NextAuth config or elsewhere).
- Single canonical session model: repository contains both `Session` and `AuthSession` models in Prisma schema (both look like DB-backed session tables) — no README or inline comment explaining the reason for both.
- Clear runtime env entries for NextAuth (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`) in `.env.example`.
- Confirmation whether `@auth/prisma-adapter` vs `@next-auth/prisma-adapter` duplication is intended (both present in package.json).

## RISKS OR CONFLICTS (observed from code)
- Adapter ambiguity: both `@next-auth/prisma-adapter` and `@auth/prisma-adapter` are present in `apps/forgea-labs/package.json` — potential version/adapter mismatch risk.
- Duplicate session models: presence of `Session` and `AuthSession` models may cause confusion or migration complexity if both are used or partially migrated.
- Cookie enforcement gap: middleware only checks cookie presence and does not enforce cookie attributes; if cookies are issued without `Secure`/`HttpOnly`/`SameSite` the runtime may be non-compliant with security policy.
- Missing documented secrets: absence of `NEXTAUTH_SECRET` and `NEXTAUTH_URL` in `.env.example` risks misconfiguration in deployments.

## QUESTIONS FOR CLARIFICATION
- Is the `AuthSession` model intended as a replacement for `Session`, or are both active and used for distinct purposes?
- Which adapter (Auth.js `@auth/*` or NextAuth `next-auth` + `@next-auth/prisma-adapter`) is the canonical/approved adapter per org policy?

## NEXT AGENT HANDOFF PROMPT (for Docs Gatekeeper)
Please validate session cookie policy and required runtime configuration for the repository described in this report.

Context (this report): docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C5_Session_Management.md

Tasks:
- Confirm required cookie flags for production: `HttpOnly`, `Secure`, and the recommended `SameSite` value per GLOBAL-POLICY.md.
- Confirm recommended idle and absolute session timeout defaults (values and units) that must be enforced in NextAuth config for production.
- Validate whether `NEXTAUTH_SECRET` and `NEXTAUTH_URL` must be added to the canonical `.env.example` and provide the exact env variable names and guidance to document them.
- Review package usage and confirm whether the org policy permits `@auth/*` packages or requires `next-auth` v4 and `@next-auth/prisma-adapter` only; state the canonical adapter and version pinning guidance.

Output required (copy-paste-ready):
- A short policy checklist with exact cookie flag values and timeout numbers to apply in code and infra.
- A short statement on which adapter is approved and any version constraints.
- Suggested exact `.env.example` lines to add for NextAuth runtime configuration.

Return format: plain text checklist and one-line adapter decision.

Handoff complete. Provide this report verbatim to the next agent.