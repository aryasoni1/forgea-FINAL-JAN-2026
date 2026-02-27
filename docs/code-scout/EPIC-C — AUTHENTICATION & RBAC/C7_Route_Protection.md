# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C7_Route_Protection
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C7_Route_Protection.md


### TASKS CHECKED

- Locate existing middleware files and routing layers.
- Enumerate app route handler entrypoints and frameworks used.


### WHAT ALREADY EXISTS

- Frameworks in repo:
  - Next.js (app router + app route handlers) is the primary web framework used across `apps/forgea-labs` and `apps/forgea-admin`.

- Edge / middleware files:
  - `apps/forgea-labs/middleware.ts` — Edge-safe middleware that checks for session cookie presence and short-circuits in dev for `/ticket` routes. It intentionally avoids decoding sessions in the Edge runtime.
  - Compiled middleware artifacts appear under `apps/*/.next/server/middleware.js` (build output).

- App route handlers (app-router route files):
  - `apps/forgea-labs/app/api/auth/[...nextauth]/route.ts` — NextAuth route handler (app-route) for authentication.
  - `apps/forgea-labs/app/api/webhooks/github/route.ts` — Webhook route handler (app-route) for GitHub webhooks.

- Server vs Edge guidance present in code comments: Edge middleware must be minimal and should not import server-only packages (NextAuth, Prisma). Policy comments live in `apps/forgea-labs/middleware.ts` and build artifacts.


### WHAT IS PARTIALLY IMPLEMENTED

- Edge middleware exists but only performs a cookie presence check; it does not perform session validation or RBAC enforcement. The policy (default-deny) is implemented at a helper level in `packages/config/src/permissions.ts` but not yet enforced centrally by middleware.

- App route handlers are implemented as Next.js app routes; they can run server-side and therefore can perform full RBAC checks, but enforcement patterns are decentralized (no single shared route middleware discovered).


### WHAT IS MISSING

- No centralized server-side middleware or shared Next.js server-layer that consumes `packages/config/src/permissions.ts` was found. The Edge `middleware.ts` intentionally avoids this and defers RBAC to server components.

- No uniform insertion points documented in repo for protecting server-side app routes (examples of where to place shared authorization wrappers are not present).


### RISKS OR CONFLICTS

- Inconsistency risk: Edge middleware allows only cookie presence checks while server routes must implement RBAC individually — this increases the chance of missing protections on some routes.

- Developer confusion: Comments explicitly warn against importing Prisma/NextAuth in Edge middleware; implementers may need a small, documented pattern for how to validate sessions safely in middleware or server layer.


### QUESTIONS FOR CLARIFICATION

- Is centralized server-side middleware desired (shared `authorizeRoute` wrapper for app routes), or should RBAC remain enforced per-handler using the helpers in `packages/config/src/permissions.ts`?
- If centralized enforcement is desired, should the Edge middleware remain cookie-only and only redirect unauthenticated requests, with full RBAC checks running in server handlers?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

(For Planner / Architect agent)

Use this code-scout report at: docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C7_Route_Protection.md as the factual source of truth. Produce the planner task `task-C7-route-protection.md` under `/docs/tasks/` that specifies exactly where and how RBAC enforcement should be applied across the repo. The task must be a design/spec (no code changes). Required deliverables:

- Enforcement Architecture Decision: choose either (A) Edge middleware minimal + server-side shared middleware for RBAC, or (B) full Edge enforcement using only Edge-safe claims. State the choice and reasoning based only on repo evidence in this report.

- Middleware Entrypoints: list exact file paths where the chosen enforcement layer must be placed or imported (e.g., `apps/forgea-labs/middleware.ts` for Edge, and a server wrapper to be consumed by `app` route handlers). Do not implement — just specify paths.

- Route Allowlist / Denylist: produce the canonical list of protected prefixes and public paths (use `packages/config/src/permissions.ts` `ROUTES` and expand if planner decides). Reference file paths from this report.

- Integration Points: list which app route files (from this report) must be updated to call the shared middleware/wrapper and where to load session claims for checks (e.g., `apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`, `apps/forgea-labs/app/api/webhooks/github/route.ts`).

- Acceptance Tests: provide 4–6 test cases (path, session claim, expected HTTP result) demonstrating default-deny and admin-gated audit emission.

Do not change code in this step — produce only the planner task document. Reference file paths in this report for evidence.

Handoff complete. Provide this report verbatim to the next agent.