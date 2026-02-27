### REQUIRED OFFICIAL DOCUMENTATION

- Technology: NextAuth
  - Concept: Provider/config lifecycle, `Credentials` provider `authorize()`, session strategy (`database`)
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Prisma
  - Concept: Schema models for auth (User, Account, Session, AuthSession), migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: GitHub OAuth
  - Concept: OAuth profile fields and provider configuration
  - Official source: https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
  - Exact version requirement: N/A (provider docs)

- Technology: OWASP Logging & Session best-practices
  - Concept: Audit logging, PII redaction, session management guidance
  - Official source: https://cheatsheetseries.owasp.org/
  - Exact version requirement: Living documents (use canonical)
