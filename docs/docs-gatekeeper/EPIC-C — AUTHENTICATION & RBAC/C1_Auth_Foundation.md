### FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C1 — Auth Foundation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C1_Auth_Foundation.md
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C1_Auth_Foundation.md
  - /docs/toolchain-versions.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/toolchain-versions.md — Coverage status: SUFFICIENT for enforcement of "tool listed = allowed / not listed = BLOCKED" rule. Exact gap: does not list NextAuth or Auth.js (so both are currently BLOCKED by policy).
- /docs/official-docs-registry.md — Coverage status: SUFFICIENT for existing pinned technologies (Node, Next.js, Prisma). Exact gap: no entries exist for `next-auth` or `@auth/core`/Auth.js adapters.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Files to extend and why:

- /docs/toolchain-versions.md — Add explicit entries for `next-auth` and/or `@auth/core` if either is to be allowed; include allowed ranges and enforcement rules.
- /docs/official-docs-registry.md — Add verified entries for `next-auth` and/or `@auth/core` plus the exact adapter packages used (`@next-auth/prisma-adapter` or `@auth/prisma-adapter`) with explicit pinned versions and official sources.

Rationale: Current policy states that unlisted tools are BLOCKED. The repo contains runtime usage of `next-auth` v4; to reconcile code and policy we must either add NextAuth into the registries (with pinned versions) or plan a migration and document it.

### STUDY GUIDE FOR HUMAN

- Concept: "Tool must be listed to be allowed"
  - Why this exists: Ensures reproducible builds, CI determinism, and security review before adopting new runtime libraries.
  - Why alternatives exist: Some teams prefer Auth.js (`@auth/core`) for handler portability; NextAuth v4 is current in repo and has established adapter expectations.
  - When NOT to use it: Do not proceed with a library that is not listed in `/docs/toolchain-versions.md` and `/docs/official-docs-registry.md`.
  - Common mistakes: Assuming repo code presence implies policy approval; forgetting to pin adapter package versions; failing to update middleware/cookie expectations.

### INTERNAL DOCS TO ADD OR EXTEND

Only required because coverage is PARTIAL.

- Canonical path: /docs/official-docs/EPIC-C/next-auth-official.md
  - Purpose: Provide official NextAuth stable source and recommended pinned version(s) for this repo.
  - Exact knowledge to add: Official NextAuth docs URL, recommended pinned version (e.g., next-auth@4.24.13 if chosen), recommended cookie naming and secret env vars (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`), adapter compatibility notes with Prisma 7.3.0.
  - Required version pin: exact version to be chosen by Platform/Architecture (e.g., 4.24.13) — MUST BE PINNED.

- Canonical path: /docs/official-docs/EPIC-C/authjs-official.md
  - Purpose: Provide official Auth.js (`@auth/core`) docs and adapter mapping if the team opts to migrate.
  - Exact knowledge to add: Official Auth.js source URL, recommended pinned versions for `@auth/core` and `@auth/prisma-adapter`, migration notes (API differences vs next-auth), cookie and event hook compatibility mapping.
  - Required version pin: exact versions for `@auth/core` and adapter — MUST BE PINNED.

### OPEN QUESTIONS / AMBIGUITIES

- Which library does the organization prefer going forward: `next-auth` v4 or Auth.js (`@auth/core`)? (Policy decision)
- If choosing `next-auth`, which exact patch/minor version should be pinned in `/docs/toolchain-versions.md` and `/docs/official-docs-registry.md`? The repo shows `^4.24.13` but policy requires exact pin.
- Are secret-management and rotation policies already documented for `NEXTAUTH_SECRET` and similar env vars? (Not found in analysed docs.)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C1_Auth_Foundation.md
```

### SHORT POLICY CHECKLIST

- Allowed per docs/toolchain-versions.md: NO — any unlisted auth library is BLOCKED. Reference: /docs/toolchain-versions.md (section "If a tool is not listed here, it is considered BLOCKED").
- Present in repo: `next-auth` present per code-scout. This is policy drift and must be reconciled by adding NextAuth to registries or migrating away.
- Required registry updates: Add `next-auth` and/or `@auth/core` + adapter packages to `/docs/official-docs-registry.md` with exact pinned versions.
- Files that must be coordinated if migration to Auth.js is chosen:
  - /apps/forgea-labs/auth.ts
  - /apps/forgea-labs/auth.config.ts
  - /apps/forgea-labs/middleware.ts
  - /apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - /packages/schema/prisma/schema.prisma
  - /apps/forgea-labs/package.json

END OF BRIEF
