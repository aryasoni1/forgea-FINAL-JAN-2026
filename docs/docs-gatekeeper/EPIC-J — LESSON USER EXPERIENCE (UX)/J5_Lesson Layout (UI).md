# FEATURE DOCS BRIEF: J5_Lesson Layout (UI)

## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J5_Lesson Layout (UI)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-J — LESSON USER EXPERIENCE (UX).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md

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

## EXISTING INTERNAL DOCS (VERIFIED)

For each internal doc relevant to J5, coverage is classified below.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-J — LESSON USER EXPERIENCE (UX).md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature-level scope and feature list, but lacks concrete component-level HTML/ARIA contracts, acceptance criteria, and wireframes.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies required agents and high-level constraints (server-side rendering, no-JS) but does not supply the component spec, wireframes, or pinned official references.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - Coverage status: PARTIAL
  - Exact gaps: Repo facts and missing-source observations present; lacks UX deliverables, accessibility acceptance criteria, and performance budgets.

No internal doc under `/docs/official-docs/EPIC-J/` exists that contains the component spec, accessibility acceptance criteria, or performance budgets for J5.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend:

- Extend `/docs/tasks/master_tasks_V1/EPIC-J — LESSON USER EXPERIENCE (UX).md` with a reference to the new component spec and acceptance criteria.
- Extend `/docs/agent_orchestrator_output/.../J5_Lesson Layout (UI).md` (agent output) by linking the produced component spec and wireframes.

New docs required (see next section) to make the feature implementable and verifiable.

## STUDY GUIDE FOR HUMAN

- `WCAG 2.1 (AA)`:
  - Why this exists: Provides measurable accessibility success criteria (contrast, focus visibility, headings).
  - Why alternatives exist: WCAG 2.2 and newer drafts add criteria; pin a baseline to avoid shifting targets.
  - When NOT to use: Only for non-public, internal-only tooling where alternate legal/regulatory standards apply (rare).
  - Common mistakes: Treating WCAG as optional, skipping keyboard flows, or only testing with a single screen reader.

- `WAI-ARIA Authoring Practices 1.2`:
  - Why this exists: Prescribes ARIA roles and keyboard patterns for complex widgets.
  - Why alternatives exist: Custom patterns sometimes emerge for bespoke widgets, but ARIA provides interoperability.
  - When NOT to use: Prefer native semantic elements whenever they provide the functionality.
  - Common mistakes: Adding ARIA roles without updating keyboard/focus handling; duplicate roles or incorrect aria-hidden usage.

- `HTML Living Standard`:
  - Why this exists: Semantic elements (`nav`, `aside`, `main`) are fundamental to no-JS, accessible rendering.
  - Why alternatives exist: None — prefer semantic HTML.
  - When NOT to use: Never; avoid polyfilling semantic behavior with JS-only solutions.
  - Common mistakes: Using non-semantic `<div>`s for navigation or relying on JS to create native affordances.

- `Core Web Vitals / Lighthouse`:
  - Why this exists: Gives measurable targets and toolchain for 3G performance verification.
  - Why alternatives exist: Other profilers exist but Lighthouse is standard for build acceptance.
  - When NOT to use: For purely backend services without UIs.
  - Common mistakes: Measuring in ideal (desktop) network conditions; ignoring font & image optimizations.

- `IntersectionObserver`:
  - Why this exists: Efficient read-tracking without polling.
  - Why alternatives exist: Fallbacks include scroll position heuristics or muted timers, but they are less reliable.
  - When NOT to use: When supporting very old browsers without polyfills and where server-only progress is required.
  - Common mistakes: Over-reliance on one viewport threshold without debouncing or fallback behavior.

## INTERNAL DOCS TO ADD OR EXTEND

Only include these if coverage is PARTIAL (it is). Add under `/docs/official-docs/EPIC-J/`:

- Path: /docs/official-docs/EPIC-J/J5_lesson_layout_spec.md
  - Purpose: Canonical one-page component spec and annotated HTML contracts for `LessonSidebar`, `LessonContent`, `ContextPanel`, `LessonPagination`, and `Callout`.
  - Exact knowledge to add: HTML structure examples, ARIA roles/attributes, keyboard interactions, focus order, expected CSS class hooks, and minimal client JS spots (if any).
  - Required version pin: reference WCAG 2.1 (AA) and WAI-ARIA 1.2.

- Path: /docs/official-docs/EPIC-J/J5_accessibility_acceptance.md
  - Purpose: Formal accessibility acceptance criteria and tests (contrast ratios, headings, tab-order, screen-reader checks, no-JS behavior validation).
  - Exact knowledge to add: Pass/fail checks, example test commands or tools, and required target (WCAG 2.1 AA).
  - Required version pin: WCAG 2.1 AA.

- Path: /docs/official-docs/EPIC-J/J5_performance_budget.md
  - Purpose: Performance budgets tuned for 3G: CSS/critical-path targets, allowed client JS bytes, font-loading strategy, and Lighthouse thresholds.
  - Exact knowledge to add: numeric budgets (e.g., critical CSS < 30KB, total JS < 50KB gzipped), target Lighthouse metrics, test harness commands.
  - Required version pin: Lighthouse / Core Web Vitals (pin tool versions used in CI).

- Path: /docs/official-docs/EPIC-J/J5_wireframes_and_annotations.md
  - Purpose: Wireframes at desktop/tablet/mobile with annotations (active highlight, completion indicators, scroll persistence rules).
  - Exact knowledge to add: SVG or PNG wireframes, breakpoint rules, hide/show behavior for context panel.
  - Required version pin: N/A (asset doc).

## OPEN QUESTIONS / AMBIGUITIES

- Should implementers restore missing source files (from a historical branch) or reimplement the components from scratch? This materially changes risk and schedule.
- Confirm acceptance baseline: use WCAG 2.1 AA as baseline, or require WCAG 2.2 AA?

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-J / J5 — Lesson Layout (UI)
  - Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md
  - Status: ADDED (EXTEND)

---

End of brief.
