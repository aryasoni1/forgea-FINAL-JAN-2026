### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D9 — Serving & Rendering
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
  - /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: HTTP API Semantics (RFC 7231)
  - Concept: RESTful request/response semantics, status codes, caching headers
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Defines canonical HTTP behavior used by read API contracts (cache-control, conditional GETs, status codes).
  - Decision it informs: Endpoint status codes, caching headers, and error semantics.
  - What breaks without it: Inconsistent HTTP behaviors, cache-invalidations, and client-server mismatches.

- Technology: OpenAPI / API design guidance
  - Concept: API contract specification for discovered endpoints and example payloads
  - Official source: https://swagger.io/specification/
  - Exact version requirement: 3.0.x or 3.1.x (MUST BE PINNED BEFORE IMPLEMENTATION)
  - Why required: Enables machine-readable API docs, client generation, and integration-checker validation.
  - Decision it informs: Request/response shapes, error models, and example payloads.
  - What breaks without it: Divergent API implementations and missing integration tests.

- Technology: Next.js Rendering & Routing
  - Concept: App Router rendering model, server vs client components, streaming, ISR
  - Official source: https://nextjs.org/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides renderer decisions for `apps/lessons` and UI rendering contracts.
  - Decision it informs: SSR vs CSR selection, caching/ISR behavior, route patterns.
  - What breaks without it: Mismatched rendering assumptions and performance regressions.

- Technology: WCAG / Accessibility
  - Concept: Accessibility acceptance criteria for lesson rendering
  - Official source: https://www.w3.org/WAI/standards-guidelines/wcag/
  - Exact version requirement: WCAG 2.1 (MUST BE PINNED BEFORE IMPLEMENTATION)
  - Why required: Ensures lesson UI meets accessibility standards.
  - Decision it informs: UI metadata requirements, semantic markup, and review badges for authored vs AI content.
  - What breaks without it: Accessibility regressions and legal/compliance exposure.

- Technology: OAuth / Session & RBAC guidance
  - Concept: Token validation, session semantics, and claim mapping for ACLs
  - Official source: OAuth 2.0 (RFC 6749) / OpenID Connect
  - Exact version requirement: RFC 6749 / OpenID Connect Core 1.0
  - Why required: Defines how sessions/tokens map to roles/claims consumed by access-control rules.
  - Decision it informs: Token/session requirements for read endpoints and gating enforcement.
  - What breaks without it: Insecure gating, token misuse, or incorrect role mappings.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
  - Coverage status: PARTIAL
  - Exact gaps: Execution plan and agent list exist, but no locked API contract, pagination spec, ACL mapping, or caching policy.

- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists D9 tasks 50–54 but contains no locked decisions or API specs.

- /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing implementation and planner artifacts but provides no concrete locked decisions.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-D/lesson_read_api.md` — pin OpenAPI version and document the canonical read API contract.
- `/docs/official-docs/EPIC-D/lesson_access_control.md` — map roles/claims to lesson access and lesson→lab gating rules.
- `/docs/official-docs/EPIC-D/serving_rendering_contract.md` — rendering expectations, authored vs AI-edited field rules, and caching guidance.
- `/docs/official-docs/EPIC-D/caching_policy.md` — TTLs per endpoint, invalidation triggers, and ISR guidance.

### STUDY GUIDE FOR HUMAN

- **HTTP API Semantics (RFC 7231):** Why: authoritative HTTP semantics for caching and status codes. Alternatives: gRPC/HTTP2; When NOT to use: closed internal RPC-only surfaces. Common mistakes: misusing status codes, missing `ETag`/`Last-Modified` for caching.

- **OpenAPI:** Why: machine-readable API contracts and client generation. Alternatives: hand-written docs or GraphQL schema. When NOT to use: very small internal endpoints where overhead isn't justified. Common mistakes: drifting docs vs implementation.

- **Next.js Rendering:** Why: authoritative rendering/runtime behaviors. Alternatives: other frameworks (Remix, plain React). When NOT to use: non-Next frontends. Common mistakes: mixing SSR/CSR expectations and incorrect caching assumptions.

- **WCAG:** Why: accessibility compliance. Alternatives: internal accessibility checklists (not recommended). When NOT to use: none — always required for public UI. Common mistakes: skipping semantic markup, failing color-contrast checks.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-D/lesson_read_api.md
  - Purpose: Canonical OpenAPI spec for lesson read endpoints, example payloads, and error cases.
  - Exact knowledge to add: endpoint paths, HTTP methods, request params, response schemas, error models, example payloads.
  - Required version pin: OpenAPI 3.0.x or 3.1.x (PIN REQUIRED)

- Path: /docs/official-docs/EPIC-D/lesson_access_control.md
  - Purpose: Map lesson access to roles/claims and define lesson→lab gating rules.
  - Exact knowledge to add: ACL rule table, token/session requirements, mapping to RBAC roles in EPIC-C.
  - Required version pin: OAuth 2.0 / OpenID Connect references (RFC 6749 / OIDC Core 1.0)

- Path: /docs/official-docs/EPIC-D/serving_rendering_contract.md
  - Purpose: Front-end rendering contract: required fields, authored vs AI badges, pagination expectations for UI components.
  - Exact knowledge to add: field-level rendering rules, review badge rules, UI example payloads.
  - Required version pin: Next.js docs version — MUST BE PINNED

- Path: /docs/official-docs/EPIC-D/caching_policy.md
  - Purpose: Specify TTLs, Cache-Control headers, ISR and invalidation triggers when lessons are updated/locked.
  - Exact knowledge to add: numeric TTLs, invalidation hooks, recommended `Cache-Control` header values, and preview-mode exceptions.
  - Required version pin: RFC 7231 / Next.js ISR doc reference

### OPEN QUESTIONS / AMBIGUITIES

- Which API protocol is preferred (REST OpenAPI vs GraphQL vs RPC)? — blocker: affects contract format and client generation.
- What pagination model should be used for lesson lists and version history (cursor vs page)? — blocker: client and server pagination implementation.
- Which RBAC roles map to lesson read access and lesson→lab gating (exact role names/claims)? — blocker: enforces correct ACL mappings.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D9 — Serving & Rendering
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D9_Serving & Rendering.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for D9.
