## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J1 — Project & Tooling Setup
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md

---

### REQUIRED OFFICIAL DOCUMENTATION

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

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md
  - Coverage status: PARTIAL
  - Exact gaps: Good checklist and observed repo artifacts; lacks a Planner-produced YAML manifest and an implementer-facing scaffold spec.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level agent tasks present but no canonical MDX frontmatter schema or validator CLI contract.

- forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx
  - Coverage status: PARTIAL
  - Exact gaps: Example MDX usage components exist but no central MDX frontmatter schema or `apps/lessons` scaffold.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend:

- `/docs/official-docs/EPIC-J/lessons-scaffold-spec.md` — new: scaffold layout, MDX placement, islands policy.
- `/docs/official-docs/EPIC-J/mdx-frontmatter-schema.json` — new: JSON Schema for frontmatter (validator input).
- `/docs/official-docs/EPIC-J/prerender-ci.md` — extend: CI manifest format and validator contract.

---

### STUDY GUIDE FOR HUMAN

- `Astro + Islands`: Why — enables static pre-rendering with opt-in interactive islands. Alternatives — Next.js SSG or pure static sites. When not to use — when lesson content requires per-request authenticated rendering. Mistakes — enabling global hydration by default.

- `MDX frontmatter`: Why — structured metadata for lessons. Alternatives — external manifest files. Mistakes — allowing executable HTML or solution content in frontmatter.

- `JSON Schema validator`: Why — machine-readable contract for CI validation. Mistakes — returning opaque error formats; validator must return structured JSON with file, path, and message.

---

### INTERNAL DOCS TO ADD OR EXTEND

1. `/docs/official-docs/EPIC-J/lessons-scaffold-spec.md` (new)
   - Purpose: Definitive scaffold for `apps/lessons` (Astro) including folder layout, where `.mdx` files live, sample content expectations, and islands policy.
   - Exact knowledge to add: folder layout, `src/content/lessons` placement, sample `package.json` scripts (`dev`, `build`, `validate-lessons`), Node/pnpm versions to pin.
   - Required version pin: Astro + Node versions.

2. `/docs/official-docs/EPIC-J/mdx-frontmatter-schema.json` (new)
   - Purpose: JSON Schema for MDX frontmatter fields (title, slug, description, tags, difficulty, canonicalId, publishDate, draft flag).
   - Exact knowledge to add: field types, required fields, allowed value ranges, and explicit disallowed fields (e.g., `solution`, raw `html`).
   - Required version pin: JSON Schema 2020-12.

3. `/docs/official-docs/EPIC-J/prerender-ci.md` (extend)
   - Purpose: CI manifest format and validator contract; how Integration Checker will fail PRs.
   - Exact knowledge to add: `manifest.json` schema, validator CLI contract (`validate-lessons`), exit codes, sample error payloads.
   - Required version pin: Node + pnpm + Astro versions.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Should lesson source `.mdx` files be stored in-repo under `apps/lessons` or fetched from an external CMS? (blocks scaffold decisions)
- Which package manager should be canonical for `apps/lessons` in CI: `pnpm`, `npm`, or `yarn`? (affects `package.json` scripts)
- Exact Node.js and Astro versions to pin for CI reproducibility? (must be pinned before implementation)

---

### MASTER DOCS REGISTRY ACTION

Append the following exact entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-J / J1 — Project & Tooling Setup
- Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md
- Status: ADDED (EXTEND)
- Reason: Scaffold spec, MDX frontmatter schema, and CI validator contract required for safe pre-rendering and authoring.

---

End of gatekeeper brief for J1.
