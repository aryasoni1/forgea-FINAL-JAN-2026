# Session & Cookie Standards

- Category: Auth / Security
- Epics: C
- Version / Requirement: Standards-based (RFCs + framework pins)
- Intent / Critical Decision: Define secure session and cookie handling patterns for web and API clients.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC (C5)
- EPIC-C intent: Standardize cookie flags, session lifetimes, and refresh/rotation strategies to reduce session-related risks.
- Important points:
  - Cookie settings: Recommend `HttpOnly`, `Secure`, `SameSite=Lax/Strict` based on use-case, `SameSite=None` only when cross-site cookies are required with Secure.
  - Session lifetime: Short-lived access tokens (minutes/hours), refresh tokens if used with rotation; session cookies for browser sessions with reasonable expiry and idle timeouts.
  - Token storage: Prefer HttpOnly cookies for browser sessions; avoid storing secrets in localStorage. For SPAs with token flows, use Authorization header and secure refresh flows.
  - CSRF protection: Use double-submit cookies, SameSite, or anti-CSRF tokens for state-changing POSTs when relying on cookies.
  - Revocation: Implement server-side session blacklists or store session state in DB for immediate revocation, and record revocations in audit logs.
  - Edge vs server runtimes: Document differences in cookie handling on Edge (limitations on `Set-Cookie` in middleware) and recommended patterns.
