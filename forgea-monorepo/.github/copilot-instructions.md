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

````instructions
# Copilot / AI agent instructions for Forgea monorepo

Short, actionable guidance to help AI coding agents be productive in this repository.

1) Big picture

- Workspace: `pnpm` workspaces + Turborepo. Root workspace lives in the `forgea-monorepo` directory.
- Top-level layout: `apps/` (Next.js app-dir apps with server/edge runtimes), `packages/` (shared libs: `@forgea/*`), `services/` (standalone backends).
- Auth & DB: NextAuth (app-level) + Prisma (canonical schema under `packages/schema`). Authorization is capability-based (see `packages/config/src/permissions.ts`).

2) Essential developer workflows

- Install: `pnpm install` (run at repo root `forgea-monorepo`).
- Dev: `pnpm dev` -> runs `turbo run dev` across workspaces.
- Build: `pnpm build` -> `turbo run build`.
- Lint/test: `pnpm lint`, `pnpm test` (all use `turbo`).
- Prisma: config at `packages/schema/prisma.config.mjs` reads the repo-root `.env`. Ensure `DATABASE_URL` exists before running migrations/seeds. Seed command is defined in that file (`prisma/seed.ts` via ts-node/esm).

3) Key repo conventions (do not break these)

- Authorization: capability-based, default-deny for `/api/*`. Update `packages/config/src/permissions.ts` when adding routes/capabilities. Use `parseSessionUser()` and `canUserPerform()` helpers from that file for server-side checks.
- Edge middleware: `apps/*/middleware.ts` must remain Edge-safe — do NOT import Prisma, NextAuth adapters or other server-only packages. Middleware should only check cookie presence and redirect; full session parsing + RBAC belongs in server components or API handlers.
- Auditing: audit hooks log via `packages/audit` and send to `FORGEA_AUDIT_SINK_URL`. Never block user flows on audit failures (events swallow errors in hooks).
- Packaging: shared code uses `@forgea/*` aliases and workspace packages; prefer reusing `packages/schema` types and `packages/config` helpers instead of duplicating logic.

4) Integration points and examples to inspect first

- `packages/config/src/permissions.ts` — route rules, `ROUTES.publicApiPathRegexes`, `ROUTE_RULES`, `parseSessionUser()`, `canUserPerform()` and `emitAuditEvent()`.
- `apps/forgea-labs/middleware.ts` — canonical Edge-safe middleware; checks cookie names `__Secure-next-auth.session-token` and `next-auth.session-token` and redirects to `/login` for protected prefixes.
- `apps/forgea-labs/auth.config.ts` — NextAuth configuration using `PrismaAdapter(db)` and audit hooks (`events.signIn`, `events.createUser`) that call `AuditService.log` inside a `RequestContext`.
- `packages/schema/prisma.config.mjs` — shows `.env` lookup and seed command used by Prisma.
- `package.json` & `turbo.json` at repo root — workspace scripts, Node/pnpm engine constraints and Turbo caching rules.

5) Concrete examples agents should follow

- Middleware pattern (minimal, Edge-safe): check cookie presence only — copy from `apps/forgea-labs/middleware.ts` when adding new matchers.
- Auth event hooks: wrap audit calls in a `try/catch` and never block the user flow on audit failures (see `apps/forgea-labs/auth.config.ts`).
- Adding an API route that exposes functionality: add/verify a `ROUTE_RULES` entry in `packages/config/src/permissions.ts` and document which capability it requires.

6) Environment & runtime notes

- Node & pnpm: repo `package.json` requires Node >=20.11 and `pnpm@10.28.1`.
- Prisma reads `.env` at the repository root (see `packages/schema/prisma.config.mjs` which loads `../../.env`).
- Important env vars: `DATABASE_URL`, `GITHUB_ID`, `GITHUB_SECRET`, `FORGEA_AUDIT_SINK_URL`.

7) Hallucination & uncertainty rules (MANDATORY)

- If unsure about framework behavior, version compatibility, or external API contracts, STOP and ask for a link to official docs or a human confirmation.
- Never invent DB schema fields, Prisma models, NextAuth callback signatures, GitHub webhook payload shapes, or permission names — check `packages/schema` and `packages/config` first.

8) Quick copy-paste commands

```bash
# from repo root (forgea-monorepo)
pnpm install
pnpm dev
pnpm build

# prisma (ensure repo-root .env contains DATABASE_URL)
# run from packages/schema or use pnpm exec targeting the package
pnpm -w exec prisma migrate dev
```

9) Files to review for most changes

- [packages/config/src/permissions.ts] — RBAC & route rules
- [apps/forgea-labs/middleware.ts] — Edge middleware pattern
- [apps/forgea-labs/auth.config.ts] — NextAuth hooks & audit usage
- [packages/schema/prisma.config.mjs] — Prisma config and seed command

If anything here is unclear or you want the agent to expand a short example (for example, a correct server-side API handler showing `parseSessionUser()` + `canUserPerform()`), tell me which area to expand and I will iterate.

````
