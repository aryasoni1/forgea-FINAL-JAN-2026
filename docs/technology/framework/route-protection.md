# Route Protection (Middleware)

- Category: Framework / Security
- Epics: C
- Version / Requirement: Framework-specific guidance (Next.js pin)
- Intent / Critical Decision: Best practices for protecting routes using middleware and edge runtimes.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC (C7)
- EPIC-C intent: Provide patterns for middleware-based auth checks, redirect flows, and per-route permission enforcement.
- Important points:
  - Middleware placement: Run authentication checks early in middleware to short-circuit unauthorized requests and avoid unnecessary upstream work.
  - Edge limitations: Document runtime limitations for Edge middleware (no blocking I/O, limited cookie APIs) and recommend server-side checks for heavy workloads.
  - Authorization granularity: Use route-level metadata to describe required permissions and map to RBAC checks (e.g., `requiredPermission: 'lesson.edit'`).
  - Performance: Cache identity/session lookups in request-scoped caches or signed cookies to reduce DB roundtrips.
  - Fallbacks: For API routes, prefer token-based auth (Bearer tokens) to avoid Cross-Site cookie reliance where appropriate.
