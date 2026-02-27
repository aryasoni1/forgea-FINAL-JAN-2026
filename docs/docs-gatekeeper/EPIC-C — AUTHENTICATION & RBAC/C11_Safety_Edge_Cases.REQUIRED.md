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
