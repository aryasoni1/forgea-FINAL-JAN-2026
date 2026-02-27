## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J4_Routing & Rendering
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md

---

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

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains high-level tasks and code-scout findings but lacks the canonical routing specification (encoding rules, duplicate-ID policy, normalization rules, and sample mapping required by Implementer).

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md
  - Coverage status: PARTIAL
  - Exact gaps: Good repo-level facts (missing `apps/forgea-lessons` source, presence of `.next` artifacts) but no implementer-facing spec or CI job description.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry exists; no entry yet describing canonical routing spec or required internal docs under `/docs/official-docs/EPIC-J/`.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry lists many technologies but lacks explicit Next.js routing / URL-normalization entries for EPIC-J references.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md` — add a concise canonical routing spec and example mappings.
- `/docs/official-docs/EPIC-J/routing-spec.md` — new implementer-facing spec required (see Internal Docs to Add below).
- `/docs/official-docs-registry.md` — add authoritative official external docs (Next.js routing + RFC/Unicode references) and mark versions.

---

### STUDY GUIDE FOR HUMAN

- `Next.js routing & SSG`: Why — dictates how to produce static pages at build time. Alternatives — server-side rendering or client-side hydration; when not to use — when content is user-private or requires per-request auth. Common mistakes — relying on client-only data, assuming Node and browser URL parsing match.

- `URI / WHATWG URL`: Why — ensures percent-encoding and path normalization are interoperable. Alternatives — custom slug schemes (avoid). When not to use — never replace standard percent-encoding for transport. Common mistakes — double-encoding, misunderstanding reserved characters.

- `Unicode normalization (NFC)`: Why — prevents visually identical strings from mapping to different resources. Alternatives — forbid non-ASCII (restrictive). When not to use — only if you intentionally want distinct codepoint sequences. Mistakes — normalizing after encoding (order matters).

- `IDNA / UTS#46`: Why — required if lesson `:domain` contains internationalized domain labels. Alternatives — disallow domain-like inputs. Mistakes — treating domain labels like path segments.

- `No-JS static rendering requirements`: Why — acceptance criteria for static prerendering. Alternatives — SSR with caching. Mistakes — embedding client-only components that break when JS disabled.

---

### INTERNAL DOCS TO ADD OR EXTEND

Only add these if coverage is PARTIAL (as above):

1. Canonical routing spec (new)
   - Path: /docs/official-docs/EPIC-J/routing-spec.md
   - Purpose: Definitive implementer-facing routing spec (URL shape, encoding, normalization, duplicate-ID policy, 404 semantics, no-JS constraints, sample mappings).
   - Exact knowledge to add: Normalization order (Unicode NFC → percent-encode per RFC3986), collision detection policy, explicit examples, acceptance criteria for no-JS rendering, and CI manifest shape.
   - Required version pin: Next.js version used by repo (VERSION MUST BE PINNED).

2. CI pre-render checklist & manifest format (new)
   - Path: /docs/official-docs/EPIC-J/prerender-ci.md
   - Purpose: Describe CI job, manifest format (list of canonical routes), and 404/no-JS validation steps.
   - Exact knowledge to add: `manifest.json` schema, sample workflow steps, required Node/Next versions, required environment variables for build.
   - Required version pin: Next.js build toolchain version.

3. Developer guide: adding lessons (extend)
   - Path: /docs/official-docs/EPIC-J/adding-lessons.md
   - Purpose: Step-by-step guide for authors to add lessons that will be prerendered.
   - Exact knowledge to add: path naming rules, normalization rules, testing checklist, and the CI manifest update process.
   - Required version pin: None (internal), but reference pinned Next.js version.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Is `apps/forgea-lessons` source intentionally missing from the monorepo, or stored externally? (blocks implementer work)
- Which app is the canonical runtime renderer for lessons: `forgea-lessons` or `forgea-labs`? (affects where to implement `generateStaticParams`)
- What exact Next.js version is used to pin behavior for `generateStaticParams`, SSG, and route matching? (must be pinned before implementation)

---

### MASTER DOCS REGISTRY ACTION

Append the following exact entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-J / J4 — Routing & Rendering
- Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J4_Routing & Rendering.md
- Status: ADDED (EXTEND)
- Reason: Canonical routing spec and registry updates required for safe static prerendering and no-JS rendering verification.

---

End of gatekeeper brief.
