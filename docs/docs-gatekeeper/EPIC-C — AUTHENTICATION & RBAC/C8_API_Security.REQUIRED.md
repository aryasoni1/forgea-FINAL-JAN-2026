### REQUIRED OFFICIAL DOCUMENTATION

- Technology: OWASP CSRF Prevention Cheat Sheet
  - Concept: CSRF mitigations and recommended enforcement patterns (double-submit, SameSite, origin checks)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
  - Exact version requirement: Living document — use current canonical
  - Why required: Defines minimum-acceptable CSRF protections for browser-initiated state-changing APIs.
  - What decision it informs: Choice of CSRF enforcement pattern for app routes (SameSite + token, origin checks, or framework-native)
  - What breaks without it: Browser-driven state changes may be vulnerable to CSRF attacks.

- Technology: NextAuth
  - Concept: Authentication endpoints, session semantics, adapter lifecycle
  - Official source: https://next-auth.js.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies which endpoints NextAuth protects and which session validation behaviors can be relied on.
  - What breaks without it: Misapplied CSRF/session expectations and incorrect session validation decisions.

- Technology: OWASP API Security Top 10 (relevant items)
  - Concept: API auth/authorization best practices and session handling
  - Official source: https://owasp.org/www-project-api-security/
  - Exact version requirement: Current canonical
  - Why required: Guides design of session-validation patterns and error shapes for APIs.
  - What breaks without it: Inconsistent API authentication patterns and missing standard error semantics.

- Technology: GitHub Webhook docs
  - Concept: HMAC verification headers and webhook security
  - Official source: https://docs.github.com/en/webhooks-and-events/webhooks/securing-your-webhooks
  - Exact version requirement: N/A (provider docs)
  - Why required: Specifies exact headers (e.g., `x-hub-signature-256`) and verification steps for webhook handlers.
  - What breaks without it: Incorrect webhook verification allowing spoofed events.
