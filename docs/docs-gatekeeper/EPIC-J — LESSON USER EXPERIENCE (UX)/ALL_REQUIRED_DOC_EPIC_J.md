# ALL_REQUIRED_DOC_EPIC_J

This file consolidates the "REQUIRED OFFICIAL DOCUMENTATION" sections from all EPIC-J gatekeeper briefs (J1–J9).

---

## J1 — Project & Tooling Setup

1. Technology: Astro (project scaffold + Islands)
   - Official source: https://docs.astro.build/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines canonical project layout, islands/partial hydration patterns, build-time prerender hooks, and tooling compatibility.
   - Decision it informs: Whether `apps/lessons` uses Astro, the recommended islands approach, and build CLI semantics.
   - What breaks without it: Incorrect scaffold choices, incompatible islands usage, and broken pre-rendering expectations.

2. Technology: MDX (MDX spec / mdx-js)
   - Official source: https://mdxjs.com/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Frontmatter parsing, MDX transforms, allowed JSX in lessons, and toolchain integration.
   - Decision it informs: Frontmatter schema enforcement, allowed in-body features, and integration points for the frontmatter validator.
   - What breaks without it: Invalid MDX parsing, failing builds, and inconsistent frontmatter interpretation.

3. Technology: JSON Schema (2020-12)
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12
   - Why required: Canonical validator format for MDX frontmatter schema and CI validator contract.
   - Decision it informs: Validator inputs/outputs, error formats, and how CI interprets validation failures.
   - What breaks without it: Ambiguous validator formats and non-interoperable error reports.

4. Technology: Node.js / npm / pnpm toolchain
   - Official source: https://nodejs.org/ and https://pnpm.io/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Build-time environment, compatible package manager, and CI runtime versions for `apps/lessons` builds.
   - Decision it informs: CI job runner image, local dev setup, and supported Node APIs.
   - What breaks without it: Flaky builds and mismatched local/CI behavior.

---

## J2 — Lesson Content Architecture

- Technology: MDX
  - Concept: MDX authoring and runtime (embedding JSX in Markdown)
  - Official source: https://mdxjs.com/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines how interactive components and JSX are allowed in lesson content and how bundlers and renderers should parse MDX.
  - What decision it informs: Canonical parser/runtime (MDX v2 vs other tooling), tooling/linting (eslint/mdx plugins), and storage schema for serialized content.
  - What breaks without it: Incompatible renderer behavior across apps; inconsistent parsing of frontmatter and embedded JSX.

- Technology: CommonMark (Markdown spec)
  - Concept: Markdown baseline and whitespace/escaping behavior
  - Official source: https://spec.commonmark.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures consistent Markdown rendering and diffing across editors, static renderers and preview tooling.
  - What decision it informs: Parser options, diffs/preview fidelity, and transformations used by CI checks.
  - What breaks without it: Divergent render results between editors and production rendering.

- Technology: YAML (frontmatter)
  - Concept: YAML frontmatter structure and allowed types
  - Official source: https://yaml.org/spec/1.2/spec.html
  - Exact version requirement: YAML 1.2
  - Why required: Frontmatter is the canonical manifest for every lesson; schema validation relies on YAML parsing behavior.
  - What decision it informs: Schema validation rules and sanitization expectations for metadata fields.
  - What breaks without it: Inconsistent frontmatter parsing, broken CI validation, and incorrect metadata ingestion.

- Technology: OWASP XSS Prevention / HTML sanitization
  - Concept: Sanitizer rules and allowed HTML subset
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines safe handling of any HTML-like content within MDX and prevents solution leakage or XSS in lesson previews.
  - What decision it informs: Allowed HTML subset in MDX, server-side validators, and DB storage rules forbidding raw HTML payloads.
  - What breaks without it: Security regressions and possible exposure of solutions or malicious payloads to learners.

- Technology: Semantic Versioning
  - Concept: Versioning lessons and published releases
  - Official source: https://semver.org/
  - Exact version requirement: SemVer 2.0.0
  - Why required: Provides canonical rules for version strings, precedence and compatibility guarantees.
  - What decision it informs: How lesson version fields are formatted and compared in the DB and CI.
  - What breaks without it: Ambiguous version ordering and migration/versioning tooling disagreements.

---

## J3 — MDX Schema & Validation

- MDX (mdxjs)
  - Concept: MDX authoring and runtime semantics (v2)
  - Official source: https://mdxjs.com/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Canonicalizes how JSX, imports, and MDX frontmatter are parsed/rounded by bundlers and runtimes used by the apps.
  - Decision it informs: Parser selection and AST expectations, allowed syntax in lessons, security boundaries for embedded JSX.
  - What breaks without it: Validator may mis-classify valid MDX or miss solution-like JSX; UI rendering may diverge from validation rules.

- CommonMark (Markdown spec)
  - Concept: Markdown parsing edge cases and normalization rules
  - Official source: https://spec.commonmark.org/
  - Exact version requirement: 0.30 (or pin) OR: VERSION UNKNOWN — MUST BE PINNED
  - Why required: Determines canonical AST shape for headings, paragraphs, code blocks and inline content.
  - Decision it informs: How AST-based validator tokenizes and normalizes author content prior to heuristics.
  - What breaks without it: False positives/negatives from differing parser behaviors.

- JSON Schema (frontmatter validation)
  - Concept: Machine-readable schema for frontmatter (validation and tooling)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12 (recommended)
  - Why required: Formal language for specifying required fields, types, enums, and strictness used by tooling.
  - Decision it informs: Canonical frontmatter schema format and validator implementation choices (JSON Schema vs ad-hoc checks).
  - What breaks without it: Inconsistent schema implementations between validator and UI; authors receive unclear errors.

- Unified / remark / rehype & mdast (AST tooling)
  - Concept: AST formats and parser/plugin ecosystem for MDX/Markdown
  - Official sources: https://unifiedjs.com/ and https://github.com/syntax-tree/mdast
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs which AST nodes are available and stable, and which plugin APIs to rely on for traversal/analysis.
  - Decision it informs: Choice of AST parser, plugin versions, and node-handling for validator.
  - What breaks without it: AST node mismatches causing validator crashes or missed violations.

- Frontmatter parsing (gray-matter or equivalent)
  - Concept: YAML/TOML/JSON frontmatter extraction semantics and edge cases (multiline, anchors)
  - Official source: https://github.com/jonschlinkert/gray-matter
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines how raw frontmatter maps to validator input (strings, arrays, typed values).
  - Decision it informs: How to canonicalize/normalize fields before applying JSON Schema.
  - What breaks without it: Type mismatches, unexpected null/undefined behavior in frontmatter validation.

---

## J4 — Routing & Rendering

1. Technology: Next.js routing & rendering (app router + SSG)
   - Official source: https://nextjs.org/docs/app/building-your-application/routing
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs canonical URL shape, `generateStaticParams`/pre-render semantics, and no-JS static rendering constraints.
   - Decision it informs: How to implement static route generation, prerender behavior, and build-time validation.
   - What breaks without it: Incorrect SSG behavior, missing prerender hooks, inconsistent 404 semantics across builds.

2. Technology: Next.js static & dynamic rendering (SSG/ISR/SSR)
   - Official source: https://nextjs.org/docs/app/building-your-application/rendering
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines when pages can be fully pre-rendered and constraints for no-JS rendering.
   - Decision it informs: Whether lessons must be prerendered at build and acceptable data-fetch patterns.
   - What breaks without it: Broken expectations for clientless rendering, stale/incomplete pages in production.

3. Technology: URI syntax / percent-encoding
   - Official source: RFC 3986 — https://datatracker.ietf.org/doc/html/rfc3986
   - Exact version requirement: RFC 3986
   - Why required: Canonical rules for percent-encoding path segments and reserved characters in URLs.
   - Decision it informs: Encoding rules for `:domain` and `:lessonId` path segments, collision semantics.
   - What breaks without it: Ambiguous encodings, route collisions, or invalid URLs.

4. Technology: WHATWG URL Standard
   - Official source: https://url.spec.whatwg.org/
   - Exact version requirement: LIVING STANDARD — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Browser/engine URL parsing quirks and host/path normalization behavior.
   - Decision it informs: How runtime parsers will interpret encoded paths and when normalization occurs.
   - What breaks without it: Divergence between server canonicalization and client navigation.

5. Technology: Unicode normalization (NFC / UAX#15)
   - Official source: Unicode Standard Annex #15 — https://www.unicode.org/reports/tr15/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Specifies Unicode normalization forms to prevent visually identical but binary-different IDs.
   - Decision it informs: Canonical pre-normalization step for `:domain` and `:lessonId` before encoding.
   - What breaks without it: Duplicate resource collisions from differently-normalized Unicode strings.

6. Technology: IDNA / Internationalized Domain Names (UTS #46)
   - Official source: https://unicode.org/reports/tr46/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Domain-label handling and Punycode rules for any domain-like input used in lesson routes.
   - Decision it informs: When to apply IDNA normalization vs percent-encoding; valid label character sets.
   - What breaks without it: Invalid hostnames, certificate mismatches, or unexpected redirects.

---

## J5 — Lesson Layout (UI)

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

---

## J6 — Lesson Progress Tracking

- Technology: JSON Schema
  - Concept: Canonical progress payload schema (machine-readable)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Defines the canonical shape, validation, and versioning for progress payloads persisted and exchanged between clients and server.
  - Decision it informs: API contract, DB schema, test fixtures, and migration strategy.
  - What breaks without it: Divergent client/server payloads, brittle migrations, and incompatibilities across apps (`forgea-lessons` vs `forgea-labs`).

- Technology: Service Workers (Offline Sync)
  - Concept: Offline-first syncing and retry-on-connect guidance
  - Official source: https://www.w3.org/TR/service-workers-1/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs safe use of background sync, network fallback, and storage lifecycle for buffered progress events.
  - Decision it informs: Whether to rely on Service Worker background-sync vs. app-layer retry, and storage durability guarantees.
  - What breaks without it: Unsafe retry semantics, lost progress during disconnects, inconsistent UX across browsers.

- Technology: Intersection Observer (Web API)
  - Concept: Visibility thresholds and section-observer semantics used to drive progress events
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines browser behavior for visibility thresholds and cross-browser differences that affect when a section is considered "viewed".
  - Decision it informs: Threshold values, debounce timings, and fallback strategy for legacy browsers.
  - What breaks without it: Incorrect progress marks, duplicated observers, and poor performance.

- Technology: HTTP semantics & Idempotency
  - Concept: Retry/backoff and status-code guidance for progress endpoint behavior
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Guides idempotent endpoint design, appropriate response codes for clients, and retry policies.
  - Decision it informs: Whether progress save is retried, how to signal transient vs permanent failures, idempotency key design.
  - What breaks without it: Client retry storms, duplicate writes, and unclear failure semantics.

- Technology: Authentication (JWT / App auth)
  - Concept: Auth scopes and token usage for per-user progress persistence
  - Official source: https://datatracker.ietf.org/doc/html/rfc7519 (JWT) and canonical OAuth2 docs as applicable
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures progress endpoints enforce per-user ownership and proper auth scopes for write/read operations.
  - Decision it informs: Endpoint placement (internal service vs app route), token validation approach, and rate-limiting per-identity.
  - What breaks without it: Unauthorized writes, privacy violations, and incorrect user-scoped data.

---

## J7 — Lesson → Lab Transition UX

NO DISTINCT "REQUIRED OFFICIAL DOCUMENTATION" SECTION FOUND in the original J7 source.

(Original file contains detailed gate conditions, API schemas, and QA acceptance criteria, but not a dedicated "REQUIRED OFFICIAL DOCUMENTATION" block.)

---

## J8 — Performance & 3G Optimization

NO DISTINCT "REQUIRED OFFICIAL DOCUMENTATION" SECTION FOUND in the original J8 source.

(Original file provides budgets, Lighthouse targets, and measurement plans rather than a formal required-official-docs list.)

---

## J9 — Anti-Cheat & Quality Controls (Lesson Level)

1. Technology: OWASP Application Security Guidance (Top Ten + API Security)
   - Official source: https://owasp.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Guidance for input validation, API hardening, and anti-abuse controls that inform rate-limiting and redaction rules.
   - Decision it informs: Minimum acceptable server-side sanitization and API exposure rules.
   - What breaks without it: Incomplete threat coverage and inconsistent anti-abuse controls.

2. Technology: Content Security Policy (CSP3)
   - Official source: https://www.w3.org/TR/CSP3/
   - Exact version requirement: CSP3
   - Why required: Browser-side mitigation for content embedding, script execution and preventing exfiltration in previews/exports.
   - Decision it informs: CSP header templates for lesson previews and exported artifacts.
   - What breaks without it: Increased XSS/iframe risks in previews and exports.

3. Technology: Rate-limiting & throttling patterns
   - Official sources: Provider docs (Cloudflare/AWS) and general guidance (RFC 7231 for semantics) — pin provider chosen for deployment
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines accepted rate-limit header semantics, retry-after behavior, and idempotency expectations for verification endpoints.
   - Decision it informs: Per-IP / per-account limits, burst policies, and CI test semantics.
   - What breaks without it: Undefined throttling behavior and unreliable anti-scraping measures.

4. Technology: Data protection / export redaction guidance (legal/regulatory)
   - Official source: Organization-specific legal guidance (pin required) or GDPR reference: https://gdpr.eu/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs what PII/solution content must be redacted from public exports and previews.
   - Decision it informs: API redaction rules and publish gating metadata.
   - What breaks without it: Potential regulatory exposure and data leaks.

---

End of consolidated REQUIRED OFFICIAL DOCUMENTATION for EPIC-J.
