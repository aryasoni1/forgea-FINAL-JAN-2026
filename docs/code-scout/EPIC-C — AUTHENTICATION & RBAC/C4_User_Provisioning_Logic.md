# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C4_User_Provisioning_Logic
- Source: Agent Orchestrator output: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md

### TASKS CHECKED

- Locate code paths that create or update `User` records on auth events.
- Report any existing upsert logic.
- Determine whether roles can be overwritten by auth flows.

### WHAT ALREADY EXISTS

- apps/forgea-labs/auth.config.ts — NextAuth configuration using `PrismaAdapter(db)`.
  - Defines `providers` (GitHub + Credentials) and `events` hooks `signIn` and `createUser` used only for audit logging.
  - No explicit user role assignment or upsert logic in the event handlers — they only record audit events.
- packages/schema/prisma/schema.prisma — Prisma schema.
  - `User` model contains `role UserRole @default(USER)` (default role is `USER`).
- packages/schema/prisma/seed.ts — seed script.
  - Uses `db.user.upsert({ where: { email }, update: {}, create: { email } })` to ensure a test user exists. The `update` is empty (no role changes).
- NextAuth adapter (via `PrismaAdapter(db)`) — adapter uses Prisma `user.create` and `user.update` under the hood (seen in compiled adapter artifacts). NextAuth flows call `createUser` or `updateUser` depending on provider flow (email/oauth/credentials).
- Edge middleware (/apps/forgea-labs/.next/server/middleware.js.map) protects admin routes by checking session cookie presence (no RBAC checks performed at Edge).

### WHAT IS PARTIALLY IMPLEMENTED

- User provisioning pipeline exists via NextAuth + PrismaAdapter: adapter will create users automatically when signing up (implicitly relying on Prisma defaults).
- Audit logging hooks exist for `signIn` and `createUser` events; they do not mutate user records.

### WHAT IS MISSING

- No explicit, centralized provisioning rules (e.g., a documented upsert policy) that specify which fields are written on first sign-in vs subsequent sign-ins.
- No code-level protections that explicitly prevent role overwrites during auth upserts (reliance is on Prisma default role and absence of updates in current code paths).
- No explicit tests or enforcement ensuring third-party provider profile fields cannot influence `role` or overwrite existing role values.
- No documentation in repo linking provisioning behavior to privacy / data-handling policies (Docs Gatekeeper task required).
- No planner-specified task describing default-role assignment, idempotent upsert rules, or role immutability guarantees.

### RISKS OR CONFLICTS

- Implicit defaulting: system relies on Prisma `@default(USER)` for default role; this is implicit and not enforced in auth handlers. Future code that upserts users without care could overwrite `role` inadvertently.
- Adapter behavior: NextAuth adapter will call `createUser` and `updateUser` as part of normal flows (email verification, OAuth linking). Without an explicit upsert policy, unexpected field changes are possible if other code introduces updates that include `role`.
- Account linking / email conflicts: NextAuth flow enforces `allowDangerousEmailAccountLinking: false` for GitHub provider and throws AccountNotLinked errors on conflicts, but this logic affects account linking rather than role mutation — need policy alignment.
- Audit hooks are non-blocking and only log; they do not validate or enforce provisioning rules.

### QUESTIONS FOR CLARIFICATION

- None strictly required to produce this report. (If you want the scout to also list all API routes that might call `db.user.update` indirectly, I can run a deeper search including ignored files.)

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Docs Gatekeeper

Copy-paste-ready prompt for the Docs Gatekeeper agent (do not modify):

"Please review the code-scout report at docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md and validate that the repository's automatic user provisioning behavior complies with privacy and role policies.

Specifically:

- Confirm whether reliance on Prisma's `User.role @default(USER)` and implicit NextAuth `createUser` behavior satisfies the project's policy for default role assignment and consent.
- Verify that audit logging in `apps/forgea-labs/auth.config.ts` meets documentation requirements for recording provenance of account creation (fields logged, retention, correlation ids).
- Confirm whether any privacy policy or data-handling documentation (e.g., PII retention, third-party provider profile usage) is missing or conflicts with the observed provisioning behavior.
- List any policy gaps or required documentation updates that must be produced before provisioning behavior is changed or exposed in production.

Reference: this code-scout report (above) which notes that provisioning currently relies on Prisma defaults and NextAuth + PrismaAdapter; there are no explicit role-protection or upsert rules in the codebase."

Handoff complete. Provide this report verbatim to the next agent.
