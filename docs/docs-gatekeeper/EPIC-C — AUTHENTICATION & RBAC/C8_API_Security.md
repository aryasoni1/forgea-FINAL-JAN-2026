## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C8_API_Security
- Exact input files read:
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing CSRF protections, inconsistent auth patterns, and undocumented public vs protected route mapping; does not prescribe enforcement patterns.

- Code: `forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts`
  - Coverage status: INSUFFICIENT (not a doc)
  - Exact gaps: NextAuth endpoints are mounted but no repo-level CSRF or API guard patterns documented.

- Code: `forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Implements HMAC but lacks documented mapping to internal webhook policy and required env variables visibility in `.env.example`.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Required doc additions or extensions:

- `/docs/official-docs/EPIC-C/csrf-and-session-guidelines.md` — REQUIRED
  - Purpose: Prescribe CSRF enforcement pattern for browser-facing state-changing APIs, session validation method for server handlers, and example enforcement checklist.
  - Exact knowledge to add:
    - Recommended CSRF pattern (preferred, alternatives, and tradeoffs). Example: enforce `SameSite=Strict` for sensitive cookies, use double-submit cookie/token pattern for XHR/Fetch POSTs, and require Origin/Referer checks for form posts.
    - Exact token issuance and verification points (where tokens are created, how long they live, verification failure semantics).
    - Mapping to NextAuth flows: which NextAuth endpoints must be exempted/guarded and explicit guidance for session endpoints.
  - Required version pin: OWASP CSRF Prevention Cheat Sheet (canonical)

- `/docs/official-docs/EPIC-C/api-auth-patterns.md` — REQUIRED
  - Purpose: Define `getServerUserFromSession(req)`-style helper contract, `withAuth(handler, { roles })` wrapper signature, and error-response shapes.
  - Exact knowledge to add:
    - Helper behavior: DB-backed session validation (lookup via NextAuth session ID), returned user claims contract, and error cases.
    - Wrapper signature and expected status codes / JSON error body.
    - Example list of protected routes and recommended role checks.
  - Required version pin: Reference to OWASP API Security guidance

- `/docs/official-docs/EPIC-C/webhook-guidelines.md` — REQUIRED
  - Purpose: Document webhook verification steps, env variables required (`GITHUB_WEBHOOK_SECRET`), and allowed public routes list.
  - Exact knowledge to add:
    - Exact headers to verify and canonical verification algorithm (HMAC SHA-256) and failure handling.
    - Audit logging expectations for webhook events and idempotency guidance.
  - Required version pin: GitHub webhook docs (canonical)

### STUDY GUIDE FOR HUMAN

- CSRF patterns: Why — protects browser-initiated state changes; Alternatives — rely on SameSite-only for cookies or use double-submit tokens; When NOT to use double-submit — purely API-to-API webhook flows; Common mistakes — missing Origin/Referer checks on legacy form posts.

- Session validation: Why — server handlers must convert cookies into authoritative user claims; Alternatives — JWT stateless sessions (tradeoffs: revocation, rotation); When NOT to use JWTs — when you need server-side session revocation; Common mistakes — trusting NextAuth session cookie without server-side DB/session verification for sensitive actions.

- Webhooks: Why — external systems need authenticated delivery; Alternatives — IP allowlists (fragile) or mutual TLS; When NOT to accept unsigned webhooks — never; Common mistakes — using string equality on signature headers instead of constant-time HMAC checks.

### INTERNAL DOCS TO ADD OR EXTEND

Only add under `/docs/official-docs/EPIC-C/`.

- Path: /docs/official-docs/EPIC-C/csrf-and-session-guidelines.md
  - Purpose: Central CSRF and session enforcement guide for app routes.
  - Exact knowledge to add: See section above.

- Path: /docs/official-docs/EPIC-C/api-auth-patterns.md
  - Purpose: Define helper contract, wrapper signature, and error formats.
  - Exact knowledge to add: See section above.

- Path: /docs/official-docs/EPIC-C/webhook-guidelines.md
  - Purpose: Document webhook verification and public-route mapping.
  - Exact knowledge to add: See section above.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Confirm canonical CSRF pattern to use across the app (SameSite + double-submit token vs origin-only). (BLOCKER)
- Confirm whether NextAuth is the single canonical session validation mechanism for server handlers, or if a separate DB-backed helper must be used. (BLOCKER)
- Clarify which routes are considered public (webhooks) vs session-protected; maintainers should provide the authoritative list. (BLOCKER)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C8 — API Security
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for API CSRF and session-validation.
