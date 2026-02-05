# Copilot / AI agent instructions for Forgea monorepo

Short, actionable guidance to help AI coding agents be productive in this repository.

1. Big picture

- Monorepo managed with `pnpm` workspaces and Turborepo. Root scripts use Turbo: `pnpm dev` runs `turbo run dev`, `pnpm build` → `turbo run build`.
- Three top-level groups: `apps/` (Next.js app-dir apps), `packages/` (shared libs/schema/config), and `services/` (backend services). Examples: `apps/forgea-labs`, `apps/forgea-admin`, `packages/schema`.
- Apps are Next.js (app-dir) with server and edge runtimes. Many auth/DB integrations rely on Prisma and NextAuth.

2. Key workflows / commands

- Install dependencies (from repo root): `pnpm install`.
- Run all apps in dev (root): `pnpm dev` (runs `turbo run dev`).
- Build everything (root): `pnpm build` (runs `turbo run build`).
- Lint (root): `pnpm lint` (runs `turbo run lint`).
- Prisma: migrations / seeds are configured under `packages/schema/prisma.config.mjs` — ensure `DATABASE_URL` is set in repository root `.env` before running Prisma commands.

3. Project-specific conventions and patterns

- Capability-based authorization (default-deny): see `packages/config/src/permissions.ts`.
  - Treat `/api/*` as default-deny unless explicitly whitelisted in `ROUTES.publicApiPathRegexes` or matched in `ROUTE_RULES`.
  - Permissions are non-hierarchical capability lists (no bitmasks). Use `canUserPerform()` semantics when implementing protected server APIs.
- Edge-safe middleware: `apps/*/middleware.ts` must not import server-only packages (Prisma, NextAuth adapters, heavy libs). Only check cookie presence and redirect — full session validation must happen in server components / API handlers.
  - Example: `apps/forgea-labs/middleware.ts` follows this pattern — copy it when adding new middleware logic.
- Auth: NextAuth + Prisma adapter lives in app code (see `apps/forgea-labs/auth.config.ts`). Use the existing event hooks for audit logging (AuditService + RequestContext). Do not block user flows on audit failures.
- Auditing: Audit hooks call `@forgea/audit` (abstracted service). Audit sink is configured via `FORGEA_AUDIT_SINK_URL` env var.

4. Architecture & integration points to inspect first

- `package.json` (root): workspace scripts and tooling (`pnpm`, `turbo`).
- `turbo.json`: caching and task wiring.
- `packages/schema/*`: canonical types/DB schema used across apps (`@forgea/schema`).
- `packages/config/src/permissions.ts`: canonical RBAC/capability model and route rules.
- `packages/schema/prisma.config.mjs`: Prisma datasource and migration/seed config (.env lookup at repo root).
- `apps/*/auth.config.ts` and `apps/*/middleware.ts`: authentication and edge-runtime patterns.

5. Coding-agent best practices for this repo

- Preserve fail-closed semantics: authorization and session parsing intentionally fail-closed. Avoid changes that widen implicit allow rules.
- Keep Edge code minimal: do not import Prisma, NextAuth adapters, or other server-only packages into middleware or edge functions.
- Follow existing import aliases and package names: shared libs are published as `@forgea/*` and often referenced with `workspace:*` in package.json.
- When modifying API routes, update `packages/config/src/permissions.ts` route rules if the endpoint requires special exposure.

6. Environment notes

- `.env` at repository root is used by Prisma (see `packages/schema/prisma.config.mjs`).
- Required env examples: `DATABASE_URL`, `GITHUB_ID`, `GITHUB_SECRET`, `FORGEA_AUDIT_SINK_URL`.

7. Where to add tests / lint fixes

- Root uses `turbo run lint` to run linters across workspaces. Add per-app ESLint rules in `apps/*` if needed.

8. Quick examples (copy-paste safe)

- Run dev for monorepo:

  ```bash
  pnpm install
  pnpm dev
  ```

- When adding a new protected API route ensure:
  - Add capability or role rule to `packages/config/src/permissions.ts`.
  - Keep middleware only checking cookie presence; validate session server-side.

9. Important files to review for changes

- [packages/config/src/permissions.ts] — RBAC & route rules
- [apps/forgea-labs/middleware.ts] — Edge middleware pattern
- [apps/forgea-labs/auth.config.ts] — NextAuth hooks & audit usage
- [packages/schema/prisma.config.mjs] — Prisma config and seed command

If any of these sections are unclear or you want more examples (e.g., sample API handler showing the correct permission check pattern), tell me which area to expand and I will iterate. 10) Hallucination & uncertainty rules (MANDATORY)

- If unsure about framework behavior, version compatibility, or API contracts, STOP and ask for documentation links before coding.
- Never invent Prisma fields, NextAuth callbacks, GitHub webhook payload fields, or permission rules.
- If a task references an external system (GitHub App, Stripe, Docker, Playwright), require an official docs link before implementation.

11. Day-1 execution constraints

- Prefer correctness over completeness.
- It is acceptable to ship TODOs, stubs, and ugly code if invariants hold.
- Do NOT refactor unrelated code.
