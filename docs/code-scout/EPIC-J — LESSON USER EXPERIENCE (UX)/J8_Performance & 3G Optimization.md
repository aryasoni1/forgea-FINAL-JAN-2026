FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J8 — Performance & 3G Optimization
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J8_Performance & 3G Optimization.md


TASKS CHECKED

- Planner / Architect: Define JS payload budgets, font-hosting policy, image/media optimization standards, and Lighthouse KPI targets.
- Implementer: Implement self-hosted fonts, image optimization pipeline, minimize client JS, and enforce server-side rendering.
- Integration Checker: Add CI performance checks (Lighthouse on 3G profile) and fail builds that exceed budgets.
- QA / Tester: Validate pages under 3G throttling and report regressions.
- Documenter / Historian: Document performance budgets and how to measure locally and in CI.


WHAT ALREADY EXISTS

- docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md — Notes mention acceptance criteria tuned for 3G and a documented requirement for minimal client JS; also documents a "BAILOUT_TO_CLIENT_SIDE_RENDERING" occurrence in built HTML.
- forgea-monorepo/apps/forgea-lessons/ and apps/forgea-learn/ — Multiple apps are present; `next-env.d.ts` files exist for Next Image types in `forgea-lessons` and `forgea-admin`, indicating Next.js image usage is expected.
- forgea-monorepo/apps/forgea-learn/src/layouts/Layout.astro — An Astro layout exists, showing a mixed-technology surface (Next.js + Astro) that will affect uniform performance policy.
- .next build artifacts (apps/forgea-lessons/.next/static/chunks/...) — Compiled JS chunks show substantial client JS and font/utility code embedded; built artifacts reference client-side bailout and large compiled style/theme code, implying current bundles may be large.


WHAT IS PARTIALLY IMPLEMENTED

- Server-side rendering: Some pages/components appear to be SSR-capable, but build artifacts and code comments indicate client-side bailout occurs for lesson UI, contradicting a strict SSR-first requirement.
- Image handling: `next/image` types are referenced, suggesting image components may be used, but no canonical image optimization pipeline or configuration (e.g., device-aware formats, responsive sizes) was discovered in source.
- Styling: Large compiled chunks include Tailwind/Twind-like utilities; the presence of utility CSS generation could be optimized, but no explicit critical CSS extraction or size budget enforcement was found.


WHAT IS MISSING

- Performance budgets: No repository-level, implementation-ready performance budgets (max JS per page, critical CSS size, fonts budget, image budgets) were found.
- Font-hosting policy: No documented decision or assets indicating self-hosted fonts, subsetting, or `font-display` strategies.
- Image/media optimization standards: No image pipeline, automatic resizing, responsive srcsets, or AVIF/WebP fallback policy located.
- Lighthouse KPI targets and CI checks: No Lighthouse configuration, Lighthouse CI, or CI workflow enforcing 3G emulation thresholds was found.
- Measurement harness and sample reports: No baseline Lighthouse/telemetry reports or sample measurements for lesson pages under 3G were found.
- Cross-framework policy: No documented policy for consistent performance controls across Next.js and Astro apps.


RISKS OR CONFLICTS

- Client-bailout vs SSR mandate: Build artifacts show client-side bailouts; this conflicts with the Implementer requirement to server-render all lessons and minimize client JS. Without resolving this, page payloads may remain high.
- Multi-framework complexity: Mixed Next.js and Astro apps increase friction for a single performance strategy (fonts, image pipeline, SSR behavior), risking duplicated effort or inconsistent UX on low-bandwidth connections.
- Hidden bundle size: Large compiled chunks in `.next` indicate potential JS and CSS bloat; without budgets and CI enforcement, regressions may be merged.
- No CI enforcement: Absence of automated Lighthouse checks increases the chance performance regressions reach production.


QUESTIONS FOR CLARIFICATION

- Target scope: Which apps/pages must meet the 3G budgets (e.g., `forgea-lessons`, `forgea-admin`, mobile landing pages)?
- 3G profile: Use "Regular 3G" or "Slow 3G" emulation for KPI targets (specify latency, download/upload speeds)?
- Interactivity allowance: Are interactive lesson features allowed to load lazily after initial SSR (hydration budget), or must pages be fully functional without hydration?
- Acceptable JS budget: Is there an existing company-wide JS per-page limit (if so, provide), otherwise should Planner propose values?


NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are Planner / Architect. Use this code-scout report at docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J8_Performance & 3G Optimization.md as the factual repository state. Do NOT implement code. Your authority: produce a precise specification and measurable budgets.

Please produce the following artifacts in your response:

1) A concrete performance budget for lesson pages targeting 3G (provide exact numeric budgets):
   - Max total JS bytes (first-load and hydrated separately)
   - Max critical CSS bytes
   - Max font bytes (per-family and total)
   - Image budget rules (max image bytes per viewport, recommended responsive srcset breakpoints)
   - Allowed number and total size of third-party scripts

2) Font hosting policy:
   - Recommend whether to self-host or use CDN (state required assets/paths), subsetting strategy, `font-display` fallback, and preload rules to meet 3G goals.

3) Image & media optimization standards:
   - Required formats (AVIF/WebP fallback), responsive sizes, lazy-loading policy, and automated pipeline expectations (build-time resizing vs on-the-fly CDN transforms).

4) SSR & hydration policy:
   - Exact rules for which components may hydrate on the client, acceptable hydration budgets, and when client-side bailouts are allowed.

5) Lighthouse KPI targets (3G profile):
   - Numeric thresholds for First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time To Interactive (TTI) or Interaction to Next Paint, Total Blocking Time (TBT), Cumulative Layout Shift (CLS), and Performance score thresholds.

6) Minimal measurement plan for Implementer and Integration Checker:
   - Which pages to test, how to run Lighthouse locally and in CI (emulation settings), and pass/fail thresholds per metric.

7) Deliverables for Integration Checker and QA:
   - CI gating rules (e.g., fail PRs if LCP > X ms on Regular 3G) and a prioritized checklist for QA to validate on physical devices.

Reference this report and do not add implementation steps or CI snippets. Stop after producing the specification artifacts above.

Handoff complete. Provide this report verbatim to the next agent.