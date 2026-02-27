### C1_Auth_Foundation — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Toolchain listing / allowed tools
   - Concept: Canonical tool inclusion and blocking rule
   - Official source: /docs/toolchain-versions.md
   - Exact version requirement: N/A (policy document) — MUST BE REFERENCED
   - Why required: Determines whether a technology (e.g., NextAuth or Auth.js) is allowed for planning/implementation.
   - What decision it informs: Whether to adopt or migrate to Auth.js or continue using next-auth.
   - What breaks without it: Uncoordinated tool adoption, CI/lockfile divergence, policy violations.

2. Technology: Official docs registry
   - Concept: Authoritative registry of pinned technologies and their allowed ranges
   - Official source: /docs/official-docs-registry.md
   - Exact version requirement: Entries must include explicit versions for any added technology; otherwise VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Enforces version pinning and verifies that a technology is accepted by policy.
   - What decision it informs: Whether planning can proceed with a chosen auth library.
   - What breaks without it: Docs Gatekeeper must block planning per registry rules.

3. Technology: Prisma
   - Concept: ORM and schema/migration compatibility
   - Official source: /docs/official-docs-registry.md (Prisma entry)
   - Exact version requirement: 7.3.0 (per registry)
   - Why required: Auth adapters rely on Prisma schema compatibility.
   - What decision it informs: Which adapter versions are compatible and whether DB migrations are acceptable.

4. Technology: Next.js (App Router)
   - Concept: Runtime, env var semantics (affects NEXTAUTH_URL/NEXTAUTH_SECRET handling)
   - Official source: /docs/official-docs-registry.md and /docs/toolchain-versions.md
   - Exact version requirement: 15.1.x (per toolchain)
   - Why required: Runtime semantics determine integration points for auth handlers and middleware.
   - What decision it informs: Middleware cookie handling and deployment runtime constraints.
   - What breaks without it: Middleware/cookie handling may be incompatible with runtime.

---

### C2_User_Identity_Readiness — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema definition & migrations (Prisma + migration semantics)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Informs schema syntax, enum migration semantics, and how Prisma maps enums and defaults to PostgreSQL.
  - Decision it informs: Whether current `schema.prisma` and generated migrations are valid and safe to apply.
  - What breaks without it: Wrong assumptions about enum renames, default behaviors, or column mappings could cause runtime errors or failed migrations.

- Technology: PostgreSQL
  - Concept: Enum types, constraints, and DDL semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Clarifies how enum renames, NOT NULL, UNIQUE, and CHECK constraints are enforced at DB level.
  - Decision it informs: Whether migration SQL correctly handles enum renames (e.g., `CANDIDATE` → `USER`) and nullable changes.
  - What breaks without it: Misapplied migrations could fail on production DBs or leave inconsistent enum values.

- Technology: NextAuth / NextAuth.js
  - Concept: Session model, adapter expectations, and canonical session store
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines which session model (e.g., `Session` vs `AuthSession`) the adapter expects and token uniqueness semantics.
  - Decision it informs: Which DB table is authoritative for user sessions and how to model session tokens safely.
  - What breaks without it: Wrong adapter/table choices can lead to duplicate session stores, race conditions, or lost sessions.

---

### C3_OAuth_Providers — REQUIRED OFFICIAL DOCUMENTATION

For safe implementation the following official specs/guides are required.

- Technology: OAuth 2.0
  - Concept: Authorization framework (Authorization Code, PKCE, token handling)
  - Official source: https://datatracker.ietf.org/doc/html/rfc6749
  - Exact version requirement: RFC 6749 (October 2012)
  - Why required: Defines core flows, redirect URI rules, and token semantics.
  - Decision it informs: choice of flow (Authorization Code + PKCE), token lifetime and refresh-token usage.
  - What breaks without it: insecure token handling, broken auth flows, CSRF/exfiltration risks.

- Technology: OpenID Connect (if identity tokens used)
  - Concept: ID token formats, claim validation, user info
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: OpenID Connect Core 1.0 (Final)
  - Why required: Validating ID tokens and user identity flow.
  - Decision it informs: whether to use OIDC vs plain OAuth
  - What breaks without it: incorrect identity validation and session establishment.

- Technology: GitHub OAuth (provider-specific integration)
  - Official source: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provider registration steps, redirect URI rules, and scope definitions.
  - Decision it informs: exact redirect URI registration and minimal scope selection for GitHub.

- Technology: Google OAuth 2.0 (provider-specific integration)
  - Official source: https://developers.google.com/identity/protocols/oauth2
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provider registration, consent screen, OAuth scopes for Google APIs.

- Technology: Secret management (HashiCorp Vault / Cloud Secret Managers)
  - Official sources (examples): https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html | https://cloud.google.com/secret-manager/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Secure storage, access control, rotation guidance for client secrets.

---

### C4_User_Provisioning_Logic — REQUIRED OFFICIAL DOCUMENTATION

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

---

### C5_Session_Management — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Session & Cookie Standards
   - Concept: HTTP cookie attributes and SameSite semantics
   - Official source: RFC 6265 — HTTP State Management Mechanism
   - Exact version requirement: RFC 6265 (2011) — stable spec
   - Why required: Defines authoritative cookie attribute semantics used to reason about `Secure`, `HttpOnly`, and `SameSite` behavior.
   - What decision it informs: Cookie attribute enforcement and cross-site/CSRF trade-offs.

2. Technology: Session Management Best Practices
   - Concept: Session cookie handling, idle/absolute timeouts, secure issuance
   - Official source: OWASP Session Management Cheat Sheet
   - Exact version requirement: Living document — cite URL and guidance (treat as VERIFIED guidance)
   - Why required: Provides recommended session timeout patterns and cookie configuration for secure production deployments.
   - What decision it informs: Recommended idle timeout, absolute session lifetime, session rotation, and cookie flags.

3. Technology: NextAuth Runtime & Env Guidance
   - Concept: NextAuth runtime configuration (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`), cookie config, and `session.maxAge` behaviour
   - Official source: https://next-auth.js.org/ (NextAuth docs)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: NextAuth-specific settings control cookie attributes and session lifetime semantics; required to map policy to code changes.
   - What decision it informs: Which NextAuth config keys to set and recommended numeric values (seconds) for `session.maxAge`.

---

### C6_RBAC_Authorization — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Enum mapping, migrations, and schema defaults
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Authoritative behavior of Prisma enum generation and migration SQL; needed to design safe enum renames and backfills.
  - Decision it informs: Migration order and whether Prisma will generate `CREATE TYPE` / `ALTER TYPE` semantics compatible with Postgres.
  - What breaks without it: Incorrect migration assumptions can produce runtime errors or broken enum values in deployed DBs.

---

### C7_Route_Protection — REQUIRED OFFICIAL DOCUMENTATION

For secure, auditable route protection the following official sources are required to make safe design decisions.

1. Technology: Next.js middleware & Edge runtime
   - Concept: Edge middleware semantics, import restrictions, and runtime constraints for App Router
   - Official source: https://nextjs.org/docs/app/building-your-application/routing/middleware (Next.js middleware docs)
   - Exact version requirement: Next.js 15.1.x (per /docs/toolchain-versions.md)
   - Why required: Defines what may/cannot be imported in `middleware.ts` (no server-only libs), and how redirects/rewrites behave at Edge.
   - What decision it informs: Whether to perform session decoding in Edge vs server, and safe middleware responsibilities.

---

### C8_API_Security — REQUIRED OFFICIAL DOCUMENTATION

- Technology: OWASP CSRF Prevention Cheat Sheet
  - Concept: CSRF mitigations and recommended enforcement patterns (double-submit, SameSite, origin checks)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
  - Exact version requirement: Living document — use current canonical
  - Why required: Defines minimum-acceptable CSRF protections for browser-initiated state-changing APIs.
  - What decision it informs: Choice of CSRF enforcement pattern for app routes (SameSite + token, origin checks, or framework-native)
  - What breaks without it: Browser-driven state changes may be vulnerable to CSRF attacks.

---

### C9_Audit_Logging — REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL
  - Concept: Append-only table patterns, immutability triggers, transactional DDL
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Defines DB-level guarantees for immutability triggers, safe migration and archival patterns.
  - Decision it informs: How to implement and verify immutable `AuditLog` rows and safe archival.
  - What breaks without it: Misapplied triggers or non-transactional operations may allow updates/deletes or break migrations.

---

### C10_UI_Auth_Flows — REQUIRED OFFICIAL DOCUMENTATION

1. NextAuth UI integration guidance
   - Official source: https://next-auth.js.org/getting-started/introduction
   - Why: Maps provider button behavior, callbackUrl semantics, and pages.override settings to UI actions.

---

### C11_Safety_Edge_Cases — REQUIRED OFFICIAL DOCUMENTATION

- Technology: NextAuth (Sessions)
  - Concept: Database-backed session semantics (`session.strategy: "database"`), `maxAge`, `updateAge`, adapter session lifecycle
  - Official source: https://next-auth.js.org/getting-started/introduction
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies sliding-refresh behavior, adapter APIs for `createSession`/`updateSession`/`deleteSession`, and how revocation and expiry are handled.
  - Decision it informs: Exact config values for `maxAge`/`updateAge`, and whether server-side revocation flows must call adapter methods directly.

---

### C12_Testing_Verification — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Playwright
  - Concept: E2E browser testing for auth/provider flows
  - Official source: https://playwright.dev/
  - Exact version requirement: VERSION UNKNOWN — PRESENT IN `pnpm-lock.yaml` BUT MUST BE PINNED (e.g., Playwright X.Y.Z)
  - Why required: Defines how to simulate provider logins, intercept network, and run headless browser tests in CI.

---

### C13_Documentation — REQUIRED OFFICIAL DOCUMENTATION

- Technology: NextAuth
  - Concept: Provider/config lifecycle, `Credentials` provider `authorize()`, session strategy (`database`)
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
