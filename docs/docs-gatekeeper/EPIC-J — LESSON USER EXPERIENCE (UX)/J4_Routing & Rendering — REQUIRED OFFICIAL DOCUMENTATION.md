### REQUIRED OFFICIAL DOCUMENTATION

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
