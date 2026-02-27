# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C11_Safety_Edge_Cases
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md


### TASKS CHECKED

- Locate code that issues, refreshes, or validates sessions.
- Report any scheduled background jobs / session-cleanup tasks.
- Find where deleted-user actions touch session data and how session revocation is handled.


### WHAT ALREADY EXISTS

- `apps/forgea-labs/auth.config.ts` — NextAuth configuration:
  - `session: { strategy: "database" }` (database-backed sessions). Evidence: [apps/forgea-labs/auth.config.ts](apps/forgea-labs/auth.config.ts#L1-L200).
  - NextAuth event hooks (`signIn`, `createUser`) are present and call `AuditService.log(...)` but do not implement session revocation logic.

- `apps/forgea-labs/auth.ts` — Exports NextAuth helpers: `handlers, auth, signIn, signOut` (server-side helpers). Evidence: [apps/forgea-labs/auth.ts](apps/forgea-labs/auth.ts#L1-L40).

- `apps/forgea-labs/lib/auth.ts` — `getCurrentUser()` helper uses `auth()` to load session and then queries DB for user by `session.user.id`. If user missing, returns `null` (silently treats missing user as unauthenticated). Evidence: [apps/forgea-labs/lib/auth.ts](apps/forgea-labs/lib/auth.ts#L1-L60).

- Prisma schema: `packages/schema/prisma/schema.prisma` — contains both `Session` and `AuthSession` models:
  - `Session` model: `id`, `sessionToken` (unique), `userId`, `expires`, relation to `User`.
  - `AuthSession` model also present with similar columns. Evidence: [packages/schema/prisma/schema.prisma](packages/schema/prisma/schema.prisma#L1-L200).

- NextAuth adapter runtime evidence (compiled server code): adapter provides these functions: `getSessionAndUser(sessionToken)`, `createSession`, `updateSession`, `deleteSession`. The runtime logic shows:
  - On session retrieval, if `session.expires < now` then `deleteSession(sessionToken)` is invoked (expired sessions are removed).
  - If session exists and remaining lifetime is small (below `updateAge`), `updateSession({ sessionToken, expires })` is called to extend expiry (session sliding refresh semantics / `updateAge` behavior).
  - `signOut` path calls adapter `deleteSession(sessionToken)` to revoke session on sign out.
  Evidence found in compiled chunks under `apps/forgea-labs/.next/server/chunks/75.js` where adapter methods `getSessionAndUser`, `updateSession`, and `deleteSession` are used.

- Session token lifecycle constants visible in compiled code (NextAuth defaults): `session.maxAge` = 2592000 seconds (30 days), `session.updateAge` = 86400 seconds (1 day) are present in runtime. These indicate default maxAge and updateAge semantics are in use unless overridden in config.

- Sign-out behavior: `signOut()` calls adapter `deleteSession` which removes the DB session row and clears cookies.


### WHAT IS PARTIALLY IMPLEMENTED

- Expiry & sliding refresh: The NextAuth runtime (adapter) implements expiry checks and conditional `updateSession` calls (sliding/refresh logic) — present in runtime artifacts — but I found no explicit configuration overrides in `auth.config.ts` for `maxAge` or `updateAge`. Thus default NextAuth semantics apply unless configured elsewhere.

- Session storage tables: Both `Session` and `AuthSession` exist in the Prisma schema. The runtime adapter appears to use the `Session` model (adapter functions reference `session`), but the presence of `AuthSession` may indicate legacy or alternate flows; no code documents which is canonical.

- Deleted-user handling: `getCurrentUser()` treats missing DB user as unauthenticated (returns `null`), but there is no global automatic session revocation when a user is deleted. The DB foreign key on `Session.userId` is `ON DELETE RESTRICT` in migrations (seen in migration SQL), so deleting a `User` without manual session cleanup will fail unless sessions are removed first.


### WHAT IS MISSING

- No scheduled session-cleanup or background job found in repository. I did not find cron/scheduled tasks or DB jobs to prune expired sessions or to archive stale sessions.

- No centralized session-revocation API for administrative forced-logout (no documented endpoint or helper to delete sessions by `userId` or revoke all active sessions for a user).

- No explicit documentation or code enforcing concurrent session policy (allowed number of simultaneous sessions per user), nor a server-side policy for session rotation on permission changes.

- No automation for forced logout when a `User` is deleted or disabled; migrations use `ON DELETE RESTRICT`, so deleting a user requires manual deletion of sessions/accounts first.


### RISKS OR CONFLICTS (observed)

- Stale sessions risk: Without scheduled cleanup, `Session` table may accumulate expired rows if adapter `deleteSession` is only invoked on access or sign-out. Expired sessions are removed when accessed, but never-accessed expired sessions will remain until targeted cleanup.

- Orphaned-user constraint: `ON DELETE RESTRICT` prevents deleting `User` rows while sessions exist; if operators attempt to force-delete users without session cleanup the DB will block the operation.

- Dual session models: Having both `Session` and `AuthSession` models can cause confusion about which table is authoritative. If different runtime paths use different tables, revocation and cleanup must handle both.

- Privilege-change drift: No session rotation policy on role/admin-permission changes was found — users can retain sessions with stale claims unless sessions are revoked on permission changes.


### QUESTIONS FOR CLARIFICATION

- Which session model should be authoritative: `Session` or `AuthSession`? Confirm single canonical model to use for revocation/cleanup.
- What is the desired concurrent-session policy (e.g., allow multiple sessions, limit to N, or single-session-per-user)?
- When a user's role or admin permissions change, should existing sessions be invalidated immediately (force-logout) or allowed to live until expiry?
- What is the required retention / archival policy (if any) for expired sessions or for session audit records?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

(For Planner / Architect and Security Sentinel agents)

Please review this code-scout report at: docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md.

Planner / Architect (role):
- Produce the task document `task-C11-session-lifecycle.md` under `/docs/tasks/` that specifies exact implementation steps (no code) to satisfy the orchestrator requirements:
  - Define canonical session model (choose `Session` or `AuthSession`) and list DB changes if canonicalization required.
  - Specify session lifetime policy: `maxAge`, `updateAge`, idle vs absolute expiry semantics, and how NextAuth config should be set in `apps/forgea-labs/auth.config.ts` (exact config keys and values to apply).
  - Design a session-revocation API for operators and for system events (signature: e.g., `POST /api/admin/sessions/revoke` with body `{ userId, revokeAll?: boolean, sessionId?: string }`) and list required auth checks/audit hooks (reference `AuditService` for auditing revocations).
  - Specify a scheduled cleanup job (cron) to prune expired sessions and to backfill/cleanup `AuthSession` if both models remain; include required DB indices and safe batching sizes for production-scale pruning.
  - List acceptance tests: (1) expired session removed on access/cleanup, (2) `signOut()` deletes session row and clears cookie, (3) revocation endpoint invalidates active sessions immediately, (4) deleting a `User` fails if sessions remain (unless revoke-first), and (5) permission-change triggers optional session revocation.
  - Rollout plan: config apply -> run migration/one-off to canonicalize sessions -> enable scheduled job in non-peak -> monitor.

Security Sentinel (role):
- Review Planner's task and produce a short security review that identifies exploitable flows and required mitigations:
  - Confirm session fixation protections (session token generation entropy and rotation), require `generateSessionToken` strengh check.
  - Recommend immediate revocation on admin-permission changes (or very brief TTL) to avoid stale-privilege drift.
  - Require admin-only access + audit logging for any revocation API, and confirm `AuditService.log` is called for each forced-logout.
  - Recommend testing for race conditions (concurrent revocation + session refresh) and specify mitigations (transactional delete + cookie clearing; token revocation with a short client-side grace period).

Deliverables (both agents):
- A single-line summary referencing this report.
- Precise file paths to update or inspect (examples from this report):
  - `apps/forgea-labs/auth.config.ts` (NextAuth config)
  - `apps/forgea-labs/auth.ts` (NextAuth exports: `auth`, `signOut`)
  - `apps/forgea-labs/lib/auth.ts` (current `getCurrentUser` helper)
  - `packages/schema/prisma/schema.prisma` (Session / AuthSession models)
  - `packages/schema/prisma/migrations/*` (verify `ON DELETE` semantics and existing triggers)
- Planner: produce `task-C11-session-lifecycle.md` with exact implementation checklist and acceptance tests.
- Security: produce a short review file `task-C11-security-review.md` listing attack scenarios and mitigations.

Context constraints: use only evidence in this report (session DB models, NextAuth default semantics, lack of scheduled cleanup). Do NOT write SQL or code in this handoff; list steps and acceptance criteria only.

Handoff complete. Provide this report verbatim to the next agent.