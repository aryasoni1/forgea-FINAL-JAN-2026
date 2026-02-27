# FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J4_Routing & Rendering
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md

### TASKS CHECKED

- Planner / Architect — Define canonical static routes, URL shape `/lessons/:domain/:lessonId`, and 404 handling rules.
- Implementer — Implement static route generation, pre-render all lessons at build time, ensure pages render without JS.
- Integration Checker — Add CI job that pre-renders routes and validates 404s and no-JS rendering.
- QA / Tester — Verify route correctness, pre-render completeness, and no-JS behavior across sample lessons.
- Documenter / Historian — Document routing rules and developer guidance for adding lessons.

### WHAT ALREADY EXISTS

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-lessons/ — Application folder present in repository root. Observed contents are build artifacts and metadata (e.g., `.next/`, `.turbo/`, `node_modules/`, `tsconfig.tsbuildinfo`). No source-level `app/` or `pages/` directory or route source files were found in this folder (only build outputs).

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx — A client-side React component providing MDX lesson sidebar / lab guide UI. This indicates lesson-related UI components exist in `forgea-labs`.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-labs/app/(public)/layout.tsx — Contains a TODO comment: "Read-only trust rendering (no mutations)", indicating awareness of read-only/no-JS rendering constraints in the labs app.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/config/eslint.config.js — ESLint boundaries include a pattern for `apps/forgea-lessons/**`, signifying a designated lessons app in the monorepo layout.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/src/types.ts — Schema types include an `AuditEvent` with a `route: string` field, showing routing appears in telemetry/audit models.

- Build-time prerender artifacts present for `forgea-lessons` under `apps/forgea-lessons/.next/` (prerender and next-server artifacts exist), indicating prior builds produced prerendered pages, but those are generated outputs, not source.

### WHAT IS PARTIALLY IMPLEMENTED

- `apps/forgea-lessons` is present but only as build outputs; the canonical source files for route generation (e.g., `app/`, `pages/`, or `generateStaticParams`/`getStaticPaths` implementations) are not present in source form in the repository.

- Lesson-related UI/components exist inside `apps/forgea-labs`, suggesting some rendering responsibilities or shared components live there instead of or alongside a dedicated `forgea-lessons` source app.

- There are Next build artifacts indicating prerendering has run historically, but no source-level route manifest, route generator, or CI job (in source) dedicated to pre-rendering lessons was found.

### WHAT IS MISSING

- Planner/Architect specification file (canonical routing spec) in source: a definitive spec (route normalization, encoding rules for special characters, duplicate-ID policy, localization rules, and 404 semantics) was not found.

- Implementer code for static route generation: no source implementations of `generateStaticParams`, `getStaticPaths`, or equivalent SSG route generators for lessons were found in source. No route manifest generator or sample route manifest for CI was found in source (only generated `.next` artifacts).

- CI Integration steps: no pipeline job or workflow in repository source was found that runs a pre-render step specifically for lessons and validates the route list / 404 behavior.

- QA tests: no automated tests or test fixtures were found that validate pre-render completeness, no-JS rendering, or 404 handling for lesson routes.

- Documentation: no developer-facing docs (in `docs/` or `forgea-monorepo/README.md`) containing a routing guide or instructions for adding lessons to the pre-render set were found.

### RISKS OR CONFLICTS (observed from code)

- Missing source for `apps/forgea-lessons`: The presence of only build artifacts under `apps/forgea-lessons` suggests the source may be missing from the repository, generated elsewhere, or accidentally excluded. This blocks any Implementer work that requires editing the lessons app.

- Ambiguous app boundaries: Lesson UI components exist in `forgea-labs`, while a `forgea-lessons` app exists (build outputs). Unclear ownership between `forgea-labs` and `forgea-lessons` could cause duplication or integration issues when adding static route generation.

- Middleware and access control: `forgea-labs` includes middleware protecting routes (e.g., `/dashboard`, `/lab`). Pre-rendering flows that require accessing protected data or user-scoped content may be impacted if prerendering assumes public access.

- Reliance on generated artifacts: Some evidence of pre-rendering exists only in `.next/` artifacts. Relying on artifacts instead of source increases risk of divergence and makes auditing route generation logic impossible without locating source.

### QUESTIONS FOR CLARIFICATION

- Is the `apps/forgea-lessons` source intentionally absent from the monorepo (source kept elsewhere), or should it exist here? If source is external, where should Implementer work (repo/location)?

- Which app is the canonical renderer for lessons at runtime (`forgea-lessons` or `forgea-labs`)?

### NEXT AGENT HANDOFF PROMPT (FOR THE PLANNER / ARCHITECT)

Copy-paste-ready prompt for the Planner / Architect agent (the next agent):

---

You are the Planner / Architect for feature J4_Routing & Rendering. Use the repository code-scout report at `docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md` as your factual source about the current repo state.

Facts you must accept from the report (do not change):

- `apps/forgea-lessons` exists but only contains build artifacts; source-level route generators are not present in the repository.
- Lesson-related UI components exist under `apps/forgea-labs` (e.g., `components/workspace/mdx-sidebar.tsx`).
- ESLint config references `apps/forgea-lessons/**`; schema includes routing in `packages/schema/src/types.ts`.
- There are `.next` prerender artifacts for `forgea-lessons`, indicating prior prerender runs, but no source-level CI or route manifest in repo.

Your task (strict, within your role):

- Produce a concise canonical routing specification for lessons that can be handed immediately to the Implementer. The spec must include:
  - The canonical URL shape (base path and parameter names), and concrete example mappings.
  - Encoding and normalization rules for special characters and Unicode in `:domain` and `:lessonId` (explicit escaping rules; collisions handling).
  - Duplicate ID policy (how collisions are detected and resolved; ordering or canonicalization rules) — specify only the policy, not implementation steps.
  - 404 and not-found semantics (when to return 404 vs redirect vs soft-fallback), including behavior for JS-disabled clients.
  - Localization considerations (if any) and how locale should appear in URLs (explicit decision: include/exclude locales in path).
  - Requirements for no-JS rendering (critical page-level constraints: no client-side-only data, SSR-safe content only) as acceptance criteria.

Constraints and required references:

- Do not propose or implement code. Provide a short spec and example URL mappings only.
- Reference this code-scout report for repository facts and note the missing source for `apps/forgea-lessons` as an input constraint.
- Keep the spec minimal and actionable: the Implementer must be able to implement static route generation from your spec.

Deliverable format (copyable):

- A short YAML or bullet list spec (max ~40–80 lines) that includes the items above and 6 example URLs mapping to canonical params.

---

Return only the spec and example mappings (no discussion). Reference the report path in the spec header.

---

Handoff complete. Provide this report verbatim to the next agent.
