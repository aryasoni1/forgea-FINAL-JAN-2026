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
