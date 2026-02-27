## REQUIRED OFFICIAL DOCUMENTATION

For safe, verifiable implementation of the lesson layout the following authoritative references are required.

- Technology: Accessibility (contrast, semantics, keyboard navigation)
  - Concept: WCAG 2.1 — Level AA (baseline)
  - Official source: https://www.w3.org/TR/WCAG21/
  - Exact version requirement: 2.1 (Level AA)
  - Why required: Defines contrast, heading semantics, focus order, and keyboard requirements needed for acceptance criteria.
  - Decision it informs: Accessibility acceptance criteria, keyboard interaction specification, and no-JS fallbacks.
  - What breaks without it: Ambiguous accessibility targets; inconsistent keyboard/contrast requirements leading to failed audits.

- Technology: WAI-ARIA Authoring Practices
  - Concept: ARIA patterns and keyboard interaction guidance
  - Official source: https://www.w3.org/TR/wai-aria-practices-1.2/
  - Exact version requirement: 1.2
  - Why required: Authoritative keyboard and role patterns for navigation widgets like sidebars, accordions, and pagination.
  - Decision it informs: ARIA roles/attributes, focus management, and expected keyboard mappings.
  - What breaks without it: Inaccessible interactive patterns and inconsistent ARIA usage.

- Technology: HTML semantics (authoring baseline)
  - Concept: HTML Living Standard (semantic elements, native focus behavior)
  - Official source: https://html.spec.whatwg.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines semantics for `aside`, `nav`, `main`, headings and native keyboard/focus affordances used for no-JS rendering.
  - Decision it informs: Choice of semantic markup and progressive enhancement strategy.
  - What breaks without it: Risk of using non-semantic markup that degrades screen-reader and no-JS behavior.

- Technology: Performance & UX on constrained networks
  - Concept: Core Web Vitals / Lighthouse guidance (performance budgets, render path)
  - Official source: https://web.dev/vitals/ and https://developers.google.com/web/tools/lighthouse
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines measurable performance targets (LCP, FID/INP, CLS) and tooling to validate 3G behavior.
  - Decision it informs: JS/CSS byte budgets, font-loading strategy, and server-rendered-critical-path decisions.
  - What breaks without it: Unclear performance targets leading to regressions on 3G profiles.

- Technology: IntersectionObserver (visibility tracking)
  - Concept: IntersectionObserver API (read tracking without heavy JS)
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines reliable browser semantics for determining section visibility used by progress tracking.
  - Decision it informs: Read-threshold implementation and graceful-degradation plan when the API is unavailable.
  - What breaks without it: Divergent read-tracking implementations and fragile client-only fallbacks.
