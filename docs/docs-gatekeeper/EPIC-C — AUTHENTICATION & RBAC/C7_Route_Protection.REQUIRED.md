### REQUIRED OFFICIAL DOCUMENTATION

For secure, auditable route protection the following official sources are required to make safe design decisions.

1. Technology: Next.js middleware & Edge runtime
   - Concept: Edge middleware semantics, import restrictions, and runtime constraints for App Router
   - Official source: https://nextjs.org/docs/app/building-your-application/routing/middleware (Next.js middleware docs)
   - Exact version requirement: Next.js 15.1.x (per /docs/toolchain-versions.md)
   - Why required: Defines what may/cannot be imported in `middleware.ts` (no server-only libs), and how redirects/rewrites behave at Edge.
   - What decision it informs: Whether to perform session decoding in Edge vs server, and safe middleware responsibilities.

2. Technology: RFC 6265 — HTTP State Management Mechanism
   - Concept: Cookie attribute semantics (`Secure`, `HttpOnly`, `SameSite`)
   - Official source: https://datatracker.ietf.org/doc/html/rfc6265
   - Exact version requirement: RFC 6265 (2011)
   - Why required: Authoritative guidance for cookie flags used by Edge middleware and server session issuance.
   - What breaks without it: Incorrect cookie attributes can break OAuth flows or cause insecure sessions.

3. Technology: OWASP Session Management Cheat Sheet
   - Concept: Session lifetime, rotation, secure cookie practices
   - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
   - Exact version requirement: Living document (cite URL)
   - Why required: Provides recommended idle/absolute timeouts and rotation strategies used in planner decisions.

4. Technology: Internal Permissions Source (Repo truth)
   - Concept: Canonical route lists and rule matrix used for enforcement
   - Official source: /forgea-monorepo/packages/config/src/permissions.ts
   - Exact requirement: This file is the source of truth for `ROUTES`, `publicApiPathRegexes`, `protectedPrefixes`, and `ROUTE_RULES`.
   - Why required: Enforcement must read and rely on these exact arrays/regexes to avoid divergence.
