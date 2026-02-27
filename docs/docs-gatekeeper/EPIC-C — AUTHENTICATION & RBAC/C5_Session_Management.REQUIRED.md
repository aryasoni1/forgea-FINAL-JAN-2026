### REQUIRED OFFICIAL DOCUMENTATION

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
