# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C6_RBAC_Authorization
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C6_RBAC_Authorization.md


### TASKS CHECKED

- Locate existing role definitions, middleware, and any RBAC helpers.
- Find all occurrences of role checks across the repository and classify whether values are hardcoded or read from DB/types.


### WHAT ALREADY EXISTS

- `packages/schema/prisma/schema.prisma` — definitive DB model `User` and `UserRole` enum (final enum values: `ADMIN`, `USER`, `RECRUITER`).

- `packages/schema/src/types.ts` — `SessionUser` TypeScript interface and RBAC primitives (`Capability`, `AdminPermission`, `SubscriptionTier`). Observed usages:
  - `SessionUser.role: UserRole` (server-side session claim type).

- `packages/config/src/permissions.ts` — central RBAC helper library (authoritative policy primitives and helpers):
  - `PERMISSIONS` matrix: `byRole`, `byTier`, `byAdminPermission`.
  - `ROUTE_RULES` and `ROUTES` (route-level allowlists and protected prefixes).
  - Helper functions: `parseSessionUser(input): SessionUser | null`, `canUserPerform(user, capability)`, `matchRouteRule(pathname)`, and `emitAuditEvent(event)`.
  - Evidence of role checks using the `UserRole` enum and capability evaluation logic (fail-closed semantics).

- `apps/forgea-labs/auth.config.ts` — NextAuth config and event hooks:
  - Audit hook reads DB user and checks `dbUser?.role === UserRole.ADMIN` to determine audit actor type (role read from DB via Prisma `db.user.findUnique`).

- `apps/forgea-labs/middleware.ts` — Edge middleware present but minimal:
  - Only checks for session cookie presence; explicitly avoids decoding/validating session or RBAC in the Edge runtime (commented guidance in file).

- Frontend/admin UI (built assets under `apps/forgea-admin/.next/...`) — role labels rendered/used client-side:
  - UI shows role strings `USER`, `MODERATOR`, `ADMIN` and uses client-side equality checks like `e.role === t` to style/drive UI and allow in-page role toggles.


### WHAT IS PARTIALLY IMPLEMENTED

- Central policy helpers exist (`parseSessionUser`, `canUserPerform`, `ROUTE_RULES`) but I found no server-side middleware or API enforcement code that consistently consumes these helpers for default-deny route enforcement across the app. The Edge middleware intentionally only checks cookie presence and defers RBAC to server routes.

- Role definitions exist in both DB (Prisma) and TypeScript, but there are mismatches in literal usage across code (see conflicts below).


### WHAT IS MISSING

- No single, exported `requireRole(user, role)` or `authorizeRoute(req)` middleware function was found that enforces `ROUTE_RULES`/`PERMISSIONS` centrally on server-side routes — enforcement appears to be decentralized or not implemented yet.

- The frontend contains role literals not present in the schema (e.g., `MODERATOR`) and client-side UI mutators that toggle role strings in state — I did not find server-side handlers that validate or persist those specific values in the repo search results.


### RISKS OR CONFLICTS (observed in source)

- Enum/value mismatch: `packages/config/src/permissions.ts` references `UserRole.CANDIDATE` in the `PERMISSIONS.byRole` mapping and elsewhere, while the Prisma enum in `packages/schema/prisma/schema.prisma` (final source) contains `USER` (migration earlier renamed `CANDIDATE` → `USER`). This creates a drift risk where server code references a non-existent enum value (`CANDIDATE`) or relies on outdated names.

- UI/Schema divergence: Frontend admin assets render and toggle `MODERATOR` as a role value, but `MODERATOR` is not defined in the Prisma `UserRole` enum. If client-originated role values are accepted by any server endpoints without strict validation, this could permit invalid role injection.

- Missing centralized enforcement: `packages/config/src/permissions.ts` provides robust helpers and a clear default-deny policy, but I did not find an enforcement layer that consumes those helpers for server APIs (the Edge `middleware.ts` only checks cookie presence). Without centralized enforcement, different routes may implement ad-hoc role checks risking inconsistent policy enforcement.


### QUESTIONS FOR CLARIFICATION

- Which role set is canonical? (Prisma `UserRole` enum in `packages/schema/prisma/schema.prisma` currently: `ADMIN`, `USER`, `RECRUITER`.)
- Is the frontend `MODERATOR` role intended to be a real persisted role, or a UI-only label? If persisted, confirm DB enum must include it.
- Should RBAC enforcement live in Edge middleware (requires smaller runtime-safe helpers) or be implemented server-side in a shared middleware layer that consumes `packages/config/src/permissions.ts`?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

(For Planner / Architect agent)

Use this code-scout report at: docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C6_RBAC_Authorization.md as the factual source of truth. Produce the canonical planner task `task-C6-rbac.md` under `/docs/tasks/` that defines exactly what the implementer should do next. Your task must strictly operate within your authority (design/migration spec) and must reference this report for evidence. Do NOT edit code directly in this step.

Required deliverables (explicit list):

- Canonical Role Enum: state the single, authoritative list of role values to live in the DB enum (explicitly name values). If you choose to rename values, list the exact migration steps required (SQL or Prisma migration commands) to safely rename/replace enum values including backward-compat notes and data-migration steps.

- DB Column Type & Defaults: specify the exact DB column definition for `User.role` (enum type, default value) and how to backfill existing records if needed.

- Enforcement Architecture: specify whether RBAC enforcement should run in Edge middleware (cookie-only / minimal checks) or server-side shared middleware. If server-side, specify the signature of the middleware (e.g., `authorizeRoute(req: Request, rule: RouteRule): Promise<void | Response>`) and how it consumes `packages/config/src/permissions.ts` helpers (`parseSessionUser`, `canUserPerform`, `matchRouteRule`).

- Authorization Helper API: list the exact helper functions to implement or centralize (names, parameters, short return types) such as `requireRole(user, allowedRoles)`, `requireCapability(user, capability)`, and `emitAuditEvent` usage contract for admin-gated decisions. Keep the API minimal and explicit.

- Migration & Backwards-Compatibility Notes: for any enum renames or role-value removals, detail the safe migration order (create new enum values, backfill rows, update code, drop old values), test steps, and rollback considerations.

- Acceptance Tests: provide 3–6 concrete acceptance test cases (path, session claim, expected result) that the implementer must pass to consider the task done (including negative/fail-closed tests and audit event emission checks for admin rule enforcement).

- Implementation Checklist: a short ordered list of steps the implementer should follow (no code), including where to add middleware, how to wire it into Next.js routing, and which files from this report must be updated or validated.

Context and constraints (use only what’s observed in this report):
- Evidence of role checks in `apps/forgea-labs/auth.config.ts` uses DB-read (`db.user.findUnique`) to derive admin actor type.
- Central permission helpers are implemented in `packages/config/src/permissions.ts` but not yet consumed by a central enforcement layer.
- Frontend contains role literals not present in DB enum (e.g., `MODERATOR`) and `packages/config` references `UserRole.CANDIDATE` which diverges from Prisma `USER`.

Do NOT write migration SQL in this handoff; instead provide precise migration steps and acceptance criteria that the implementer can follow. Reference file paths listed in this report for evidence.

Handoff complete. Provide this report verbatim to the next agent.