# Pending registry additions for EPIC-D / D9 — Serving & Rendering

The following entries are the exact additions that SHOULD be appended to `/docs/official-docs-registry.md` under the authoritative registry.

Please append the block below (preserve formatting) to the end of `/docs/official-docs-registry.md`.

---

## 🖥️ Serving & Rendering (EPIC-D)

### OpenAPI (API contract)

- **Technology:** OpenAPI
- **Version:** 3.0.x or 3.1.x (MUST BE PINNED BEFORE IMPLEMENTATION)
- **Official source:** https://swagger.io/specification/
- **Used for:** Machine-readable API contracts for lesson read endpoints, error models, and client generation
- **Internal docs:** /docs/official-docs/EPIC-D/lesson_read_api.md
- **Status:** REQUIRED

### Next.js Rendering & Routing

- **Technology:** Next.js (App Router)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://nextjs.org/docs
- **Used for:** Rendering model, SSR/CSR decisions, ISR and caching semantics for UI
- **Internal docs:** /docs/official-docs/EPIC-D/serving_rendering_contract.md
- **Status:** REQUIRED

### WCAG (Accessibility)

- **Technology:** WCAG
- **Version:** 2.1 (MUST BE PINNED BEFORE IMPLEMENTATION)
- **Official source:** https://www.w3.org/WAI/standards-guidelines/wcag/
- **Used for:** Accessibility acceptance criteria for lesson UI rendering
- **Internal docs:** /docs/official-docs/EPIC-D/accessibility_guidelines.md
- **Status:** REQUIRED

### OAuth 2.0 / OpenID Connect (Auth & RBAC)

- **Technology:** OAuth 2.0 / OpenID Connect
- **Version:** RFC 6749 / OIDC Core 1.0
- **Official source:** https://datatracker.ietf.org/doc/html/rfc6749
- **Used for:** Token/session semantics and claim mapping for ACLs on read endpoints
- **Internal docs:** /docs/official-docs/EPIC-D/lesson_access_control.md
- **Status:** REQUIRED

---

# End of pending additions
