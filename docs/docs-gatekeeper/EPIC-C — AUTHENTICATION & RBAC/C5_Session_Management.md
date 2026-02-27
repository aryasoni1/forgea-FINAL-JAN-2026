### FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C5 — Session Management
- Exact input files read:
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C5_Session_Management.md
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C5_Session_Management.md
  - /docs/toolchain-versions.md
  - /docs/official-docs-registry.md
  - /docs/GLOBAL-POLICY.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/toolchain-versions.md — Coverage status: SUFFICIENT for blocking/unlisted-tool rule; Exact gap: does not list NextAuth session guidance or session management-specific constraints.
- /docs/official-docs-registry.md — Coverage status: PARTIAL for audit and logging; Exact gap: missing explicit session/cookie spec entries (RFC 6265 / OWASP Session Management not yet present).

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Reason: The repo lacks a canonical session/cookie policy mapping to code. Additions required: (1) register RFC 6265 and OWASP Session Management in the official docs registry, (2) add NextAuth-specific guidance and pinned versions to the registry, and (3) document required `.env` entries for runtime secrets.

### STUDY GUIDE FOR HUMAN

- Cookie flags (`HttpOnly`, `Secure`, `SameSite`) — Why: prevent XSS/CSRF and ensure transport security. Alternatives: `SameSite=None; Secure` for third-party cookies (rare). When NOT to use `SameSite=Strict`: breaks OAuth redirect flows. Common mistakes: omitting `Secure` in production, failing to set `HttpOnly` for session cookies.
- Idle vs Absolute timeouts — Why both: idle protects against unattended sessions, absolute limits exposure from persistent sessions. Alternatives: token refresh vs short-lived sessions. When NOT to use long idle timeouts: hostile shared devices.
- NEXTAUTH env vars — Why: NextAuth requires `NEXTAUTH_SECRET` to sign cookies and `NEXTAUTH_URL` for provider callbacks. Alternatives: runtime secrets manager; still required in deployment. Common mistakes: leaving them out of `.env.example` or reusing weak secrets.

### INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /docs/official-docs/EPIC-C/session-management.md
  - Purpose: Map OWASP/RFC guidance to concrete NextAuth config keys and code snippets for production.
  - Exact knowledge to add: recommended cookie flags, suggested `session.maxAge` and idle/absolute timeout numbers, guidance for cookie rotation, instructions to add `NEXTAUTH_SECRET`/`NEXTAUTH_URL` to `.env.example`, and notes about adapter compatibility with Prisma schema.
  - Required version pin: NextAuth exact version (e.g., `next-auth@4.24.13` if chosen) — MUST BE PINNED.

### OPEN QUESTIONS / AMBIGUITIES

- Are both `Session` and `AuthSession` intended to be active? Clarify canonical DB model to avoid duplicate session tables.
- Confirm canonical adapter choice: NextAuth (`next-auth` + `@next-auth/prisma-adapter`) vs Auth.js (`@auth/core` + `@auth/prisma-adapter`). Current repo code uses NextAuth; policy must confirm.
- Confirm preferred `SameSite` trade-off for OAuth flows (recommended: `Lax`, exception for cross-site embedded flows requiring `None`).

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C5_Session_Management.md
```

### SHORT POLICY CHECKLIST (copy-paste-ready)

- Cookie flags to enforce in production:
  - `HttpOnly`: true
  - `Secure`: true (TLS-only)
  - `SameSite`: `Lax` (use `None; Secure` only if third-party cookies are strictly required)
- Session timeouts (recommended defaults):
  - Idle timeout (inactivity): 30 minutes (1800 seconds)
  - Absolute timeout (maximum session lifetime): 7 days (604800 seconds)
  - In NextAuth: set `session.maxAge` to absolute timeout (seconds) and implement idle timeout by updating session expiry on activity or using short `maxAge` with refresh strategy.
- Env vars to add to canonical `.env.example`:
  - `NEXTAUTH_SECRET=changeme-REPLACE-WITH-SECURE-RANDOM`
  - `NEXTAUTH_URL=https://app.example.com`
- Adapter decision (one-line):
  - Approve `next-auth` v4 with `@next-auth/prisma-adapter` pinned to exact versions (e.g., `next-auth@4.24.13`, `@next-auth/prisma-adapter@1.0.7`); treat `@auth/*` packages as NOT APPROVED until added to the registry and pinned.

END OF BRIEF
