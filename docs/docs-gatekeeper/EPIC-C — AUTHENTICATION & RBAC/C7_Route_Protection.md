### FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C7 — Route Protection
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C7_Route_Protection.md
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C7_Route_Protection.md
  - /forgea-monorepo/packages/config/src/permissions.ts
  - /docs/toolchain-versions.md
  - /docs/official-docs-registry.md
  - /docs/GLOBAL-POLICY.md

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

### EXISTING INTERNAL DOCS (VERIFIED)

- `/forgea-monorepo/packages/config/src/permissions.ts` — Coverage status: SUFFICIENT as code-level source-of-truth for route lists and rules.
- `/docs/toolchain-versions.md` — Coverage status: SUFFICIENT for Next.js runtime pinning requirement (15.1.x) which constrains middleware semantics.
- `/docs/official-docs-registry.md` — Coverage status: PARTIAL for auth/session primitives (RFC/OWASP entries added earlier); Exact gap: no dedicated internal doc mapping Next.js middleware guidance to repo-safe patterns.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Which docs to extend:

- `/docs/official-docs/EPIC-C/route-protection.md` — Required: map `ROUTES` and `ROUTE_RULES` to implementation patterns, show where to place server-side wrappers, and document Edge vs server import rules.
- `/docs/official-docs/EPIC-A/nextjs-middleware-guidance.md` — Required: capture App Router middleware constraints (Next.js 15.1.x) with do/don'ts for this monorepo.

Rationale: The code contains an Edge middleware that intentionally avoids server imports and a rich permission matrix in `permissions.ts`. Policy requires a clear doc mapping these two so implementers do not violate Edge import constraints or fracture enforcement.

### STUDY GUIDE FOR HUMAN

- Why this exists: Prevent inconsistent enforcement by centralizing route rules and keeping Edge middleware minimal and safe.
- Why alternatives exist: Full Edge enforcement reduces latency but increases complexity and limits available libraries; repository evidence favors server-side RBAC due to imports like NextAuth and Prisma.
- When NOT to use full Edge enforcement: when server-only libs (database, NextAuth) are required for session decoding — use server-side wrappers instead.
- Common engineering mistakes: importing Prisma/NextAuth in `middleware.ts`; duplicating route lists across code; forgetting to mark public API regexes; failing to emit audit events for admin decisions.

### INTERNAL DOCS TO ADD OR EXTEND

Only required because coverage is PARTIAL.

- Path: `/docs/official-docs/EPIC-C/route-protection.md`
  - Purpose: Prescriptive mapping from `packages/config/src/permissions.ts` to runtime enforcement patterns (Edge vs Server), examples for `authorizeRoute` wrapper, and audit emission guidelines.
  - Exact knowledge to add: copy of canonical `ROUTES`, `ROUTE_RULES`, wrapper signatures, example call sites for app-route handlers and server components, and a migration checklist.
  - Required version pin: Next.js 15.1.x reference and note about Node 20.x runtime.

- Path: `/docs/official-docs/EPIC-A/nextjs-middleware-guidance.md` (extend existing Next.js doc)
  - Purpose: Document concrete do/don't list for `middleware.ts` in this monorepo, emphasise no server-only imports and how to coordinate with server-side `authorizeRoute`.
  - Exact knowledge to add: examples of safe Edge code (cookie presence checks), recommended redirect patterns, and pointer to `emitAuditEvent` for Edge-safe telemetry.
  - Required version pin: Next.js 15.1.x.

### OPEN QUESTIONS / AMBIGUITIES

- Should centralized server-side wrappers live under `packages/auth` or `packages/security`? (Implementer decision; preference: `packages/auth` for auth-specific code.)
- Confirm whether webhooks (e.g., `apps/forgea-labs/app/api/webhooks/github/route.ts`) should be treated as public + HMAC-verified (recommended) or be protected by RBAC.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C7_Route_Protection.md
```

---

END OF BRIEF
