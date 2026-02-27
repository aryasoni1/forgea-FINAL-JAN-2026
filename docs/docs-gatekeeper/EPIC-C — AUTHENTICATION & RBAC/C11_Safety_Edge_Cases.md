## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C11_Safety_Edge_Cases
- Exact input files read:
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: NextAuth (Sessions)
  - Concept: Database-backed session semantics (`session.strategy: "database"`), `maxAge`, `updateAge`, adapter session lifecycle
  - Official source: https://next-auth.js.org/getting-started/introduction
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies sliding-refresh behavior, adapter APIs for `createSession`/`updateSession`/`deleteSession`, and how revocation and expiry are handled.
  - Decision it informs: Exact config values for `maxAge`/`updateAge`, and whether server-side revocation flows must call adapter methods directly.
  - What breaks without it: Misapplied session policies, unnoticed sliding-refresh behavior, or incorrect revocation semantics.

- Technology: Prisma (Schema & Migrations)
  - Concept: `Session` / `AuthSession` models, `ON DELETE` semantics, and migration-driven constraints
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0 (per registry)
  - Why required: Determines authoritative session model, FK behavior, and migration strategy to canonicalize models.
  - What breaks without it: Conflicting session tables, failed deletes due to FK constraints, and migration errors.

- Technology: OWASP Session Management Cheat Sheet
  - Concept: Session lifecycle best practices (creation, renewal, revocation, rotation, secure cookie flags)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
  - Exact version requirement: Living document — use canonical guidance
  - Why required: Informs session token entropy, rotation, forced-logout guidance, and server-side session revocation expectations.
  - What breaks without it: Weak token generation, session fixation, stale-privilege drift.

- Technology: GDPR / Data Protection
  - Concept: Retention and lawful-basis for session/audit data
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: REGULATION (EU) 2016/679
  - Why required: Defines retention/archival requirements for session or audit records.
  - What breaks without it: Non-compliance risk and incorrect retention policies.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md
  - Coverage status: PARTIAL
  - Exact gaps: Documents runtime evidence for DB sessions, adapter behavior, and missing cleanup/revocation APIs; does not define canonical model or operator APIs.

- Code references (not docs):
  - `apps/forgea-labs/auth.config.ts` — NextAuth config (session strategy)
  - `apps/forgea-labs/lib/auth.ts` — `getCurrentUser()` helper
  - `packages/schema/prisma/schema.prisma` — `Session` and `AuthSession` models
  - `apps/forgea-labs/.next/server/chunks/*` (compiled adapter artifacts) — runtime adapter behavior
  - Coverage status: INSUFFICIENT as documentation; useful evidence but not prescriptive.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Rationale: Repo contains evidence and runtime artifacts showing DB-backed sessions and adapter semantics, but lacks canonical policy, migration plan to canonicalize session model, operator revocation APIs, scheduled cleanup guidance, and acceptance tests.

### STUDY GUIDE FOR HUMAN

- `NextAuth Sessions`: Why — NextAuth provides DB session lifecycle (create/update/delete) and sliding-refresh semantics; Alternatives — JWT stateless sessions (simpler revocation tradeoffs); When NOT to rely solely on NextAuth defaults — when you require immediate forced-logout on permission changes; Common mistakes — assuming `deleteSession` runs automatically for all expired rows.

- `Prisma Session Models`: Why — authoritative schema determines where sessions live and FK semantics; Alternatives — unify on a single session table or move session storage to a dedicated store (Redis) for scale; When NOT to keep multiple session tables — avoids inconsistency and migration complexity; Common mistakes — deleting `User` rows without revoking sessions first (FK restrict errors).

- `OWASP Session Management`: Why — prescribes token entropy, rotation, and revocation patterns; Alternatives — homegrown policies (riskier); When NOT to skip rotation — on privilege elevation/de-escalation; Common mistakes — failing to rotate tokens on sign-in or failing to immediately revoke on permission change.

### INTERNAL DOCS TO ADD OR EXTEND

Add under `/docs/official-docs/EPIC-C/`.

- Path: /docs/official-docs/EPIC-C/session-lifecycle-policy.md
  - Purpose: Canonical session model and lifecycle policy (choose `Session` or `AuthSession`, `maxAge`, `updateAge`, idle vs absolute expiry, rotation rules).
  - Exact knowledge to add:
    - Decision: canonical session table and migration steps if canonicalization required.
    - Exact NextAuth config snippet to set in `apps/forgea-labs/auth.config.ts` (keys and values to apply).
    - Session rotation and token entropy requirements (reference OWASP guidance).
    - Acceptance tests for session behavior (listed below).

- Path: /docs/official-docs/EPIC-C/session-revocation-and-admin-api.md
  - Purpose: Design of operator and system revocation APIs (signature, auth checks, audit hooks) and expected behavior.
  - Exact knowledge to add:
    - Proposed API: `POST /api/admin/sessions/revoke` with body `{ userId, revokeAll?: boolean, sessionId?: string }` and required admin scope.
    - Audit requirements: call `AuditService.log(...)` with correlation id and actor for each revocation.
    - Error shapes and rollout guidance.

- Path: /docs/official-docs/EPIC-C/session-cleanup-cron.md
  - Purpose: Scheduled job spec to prune expired sessions and canonicalize `AuthSession` if needed.
  - Exact knowledge to add:
    - Cron cadence, safe batching sizes, DB indices to add, and rollback/monitoring steps.
    - One-off migration step for canonicalization.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Choose canonical session model: `Session` or `AuthSession`? (BLOCKER)
- Define concurrent-session policy (allow multiple sessions per user or limit to N / single session)? (BLOCKER)
- Decide immediate revocation policy on role/permission changes: force-logout vs allow until expiry? (BLOCKER)
- Confirm NextAuth version pinned to validate adapter behaviors (`maxAge`/`updateAge` defaults). (BLOCKER)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C11 — Safety & Session Edge Cases
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C11_Safety_Edge_Cases.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for session lifecycle, revocation, and cleanup.
