## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C4_User_Provisioning_Logic
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below provide official source and version requirement.

- Technology: NextAuth
  - Concept: Authentication & provisioning flows, adapter semantics (createUser/updateUser), events
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines how and when user records are created/updated by the framework and which adapter hooks run.
  - Decision it informs: Whether the project can rely on implicit adapter creates/updates and which fields are writable by default.
  - What breaks without it: Incompatible NextAuth behavior could allow unexpected `user.update` calls or remove event guarantees.

- Technology: Prisma
  - Concept: ORM user create/upsert defaults and schema-driven defaults (e.g., `@default(USER)`)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0 (per registry)
  - Why required: Confirms how schema defaults are applied and adapter behavior when `create` omits fields.
  - Decision it informs: Whether relying on `@default(role)` is safe and whether defensive upserts are needed.
  - What breaks without it: Misunderstanding default application could lead to role-less users or accidental overwrites.

- Technology: GitHub OAuth (provider integration)
  - Concept: OAuth profile fields returned by provider and account linking behavior
  - Official source: https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
  - Exact version requirement: N/A (API docs); treat as VERSION UNKNOWN — PINNED GUIDELINES REQUIRED
  - Why required: Determines which profile fields might be surfaced into NextAuth's profile and potentially into user records.
  - Decision it informs: Which provider-sourced attributes are safe to persist and whether provider profile claims can map to role.
  - What breaks without it: Unexpected profile fields could be used to overwrite sensitive attributes like `role`.

- Technology: GDPR / Data Protection
  - Concept: PII retention and lawful basis for account creation
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: REGULATION (EU) 2016/679 (as referenced in registry)
  - Why required: Ensures provisioning behavior meets legal retention and consent requirements.
  - Decision it informs: Whether automatic account creation requires explicit consent or additional notices.
  - What breaks without it: Non-compliance risk and incorrect retention/audit rules.

- Technology: OWASP Logging Cheat Sheet
  - Concept: Audit logging best practices and PII redaction
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  - Exact version requirement: Living document (use current canonical)
  - Why required: Defines minimum audit fields and redaction/retention behavior for `createUser`/`signIn` events.
  - Decision it informs: Which fields must be logged vs redacted and retention bounds for audit entries.
  - What breaks without it: Audit logs may leak PII or fail to provide necessary provenance.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies code paths and gaps but does not define provisioning policy, upsert rules, or audit field requirements.

- /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator plan references Docs Gatekeeper but does not provide pinned official-doc references or enforcement rules.

- Code: `apps/forgea-labs/auth.config.ts` (codebase)
  - Coverage status: INSUFFICIENT (not an internal doc)
  - Exact gaps: Contains audit hooks but no enforcement rules or defensive upsert behavior; no documented correlation ids, retention, or exact audit schema.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-C/user-provisioning-policy.md` — MUST be added (see next section).
- `/docs/official-docs/EPIC-C/audit-log-guidelines.md` — Extend to include exact fields logged on `createUser`/`signIn`, retention, and correlation id format.
- `/docs/official-docs/EPIC-C/third-party-provider-guidelines.md` — Add guidance on which provider claims are safe to persist and mapping rules.

### STUDY GUIDE FOR HUMAN

- `NextAuth`: Why — framework handles auth flows and adapter lifecycle; Alternatives — custom auth or other frameworks; When NOT to use — when you need strict, server-only provisioning with manual upserts; Common mistakes — assuming adapter will never call `update` or that provider profile fields are normalized.

- `Prisma`: Why — schema defaults provide last-resort defaults; Alternatives — set defaults in application code or explicit upserts; When NOT to rely on schema defaults — if you expect idempotent upserts to preserve existing fields; Common mistakes — using empty `update: {}` upserts without protecting sensitive fields.

- `GitHub OAuth`: Why — provider profile can introduce unexpected attributes; Alternatives — limit provider-sourced fields and only copy vetted attributes; When NOT to use provider claims — never map unvetted provider claims to privilege-bearing fields like `role`; Common mistakes — trusting `profile` payload shape across providers.

- `GDPR / Data Protection`: Why — legal baseline for PII handling; Alternatives — stricter internal policies; When NOT to create auto-provisioned accounts — if consent or lawful basis is missing; Common mistakes — failing to tie audit logs to retention policies and consent records.

### INTERNAL DOCS TO ADD OR EXTEND

Only add these under `/docs/official-docs/EPIC-C/`.

- Path: /docs/official-docs/EPIC-C/user-provisioning-policy.md
  - Purpose: Canonical provisioning rules: when to `create`, what fields are written on first sign-in, which fields are immutable (e.g., `role`), and exact upsert semantics.
  - Exact knowledge to add:
    - Default role assignment rule (explicitly state `role` default and immutability policy).
    - Upsert templates for NextAuth adapter flows (email sign-up, OAuth sign-in, credentials flow) showing safe `create` and `update` shapes.
    - Tests required to validate role immutability and idempotent upserts.
  - Required version pin: `NextAuth: VERSION UNKNOWN — PIN BEFORE FINALIZING`, `Prisma: 7.3.0`

- Path: /docs/official-docs/EPIC-C/audit-log-guidelines.md
  - Purpose: Define audit events for `createUser` and `signIn` including fields, correlation ids, retention, redaction rules.
  - Exact knowledge to add:
    - Minimal audit schema (timestamp, actor, method, provider, correlation_id, user_id, non-PII profile snapshot)
    - Retention policy aligned with `/docs/official-docs/privacy-and-retention.md`.
    - Links to OWASP logging guidance and redaction rules.
  - Required version pin: OWASP Logging (current canonical)

- Path: /docs/official-docs/EPIC-C/third-party-provider-guidelines.md
  - Purpose: Document provider claim mapping, which claims may be persisted, and how to sanitize provider profiles.
  - Exact knowledge to add:
    - A whitelist of provider-sourced attributes safe to persist.
    - Rules for account linking and conflict handling (`allowDangerousEmailAccountLinking` implications).
  - Required version pin: N/A (provider API docs referenced per provider)

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- NextAuth version in use must be pinned; different NextAuth releases change adapter/event semantics. (BLOCKER)
- Confirm intended policy for default role immutability: should roles be immutable except through admin UI? (BLOCKER)
- Confirm audit log retention and correlation-id format (BLOCKER)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C4 — User Provisioning Logic
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C4_User_Provisioning_Logic.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for safe user provisioning.
