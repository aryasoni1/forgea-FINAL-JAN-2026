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
