# FEATURE DOCS BRIEF: J2 — Lesson Content Architecture

## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J2 — Lesson Content Architecture
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-admin (compiled assets /build traces in .next)
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-lessons (compiled assets /build traces in .next)
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include the official source and pin requirement.

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

## EXISTING INTERNAL DOCS (VERIFIED)

For each relevant internal doc: path, coverage status, and exact gaps.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md
  - Coverage status: PARTIAL
  - Gaps: States Python-only ownership and isolation rules, but does not define lesson storage location, frontmatter schema, or CI enforcement expectations.

- /Users/aryasoni/Desktop/Forgea/apps/forgea-admin (build traces present in .next)
  - Coverage status: PARTIAL
  - Gaps: Indicates a Lesson Manager UI exists in compiled artifacts but no source canonical MDX folder or manifest is present in repo.

- /Users/aryasoni/Desktop/Forgea/apps/forgea-lessons (build traces present in .next)
  - Coverage status: PARTIAL
  - Gaps: Public lesson rendering exists in builds, but canonical authoring/source paths and storage ownership are not documented.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - Coverage status: PARTIAL
  - Gaps: Describes that lessons are MDX and need canonical spec but lacks exact frontmatter keys, storage path decisions, and enforcement artifacts.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md
  - Coverage status: PARTIAL
  - Gaps: Good repo scan and risk list, but requires Planner decisions about canonical storage, runtime ownership, and frontmatter schema.

---

## DOCUMENTATION COVERAGE DECISION

✅ **DOCUMENTATION PARTIAL — EXTENSION REQUIRED**

Documents to extend and why:

- Extend `/docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md` — add concrete storage decision, ownership, and sample migration plan.
- Add canonical frontmatter spec under `/docs/official-docs/lesson-frontmatter-spec.md` — required for schema validation and CI rules.
- Add storage & versioning policy under `/docs/official-docs/lesson-storage-and-versioning.md` — required to disambiguate Node vs Python ownership and DB vs filesystem layout.
- Add security/sanitization guidelines under `/docs/official-docs/lesson-sanitization-and-security.md` — required to enforce no-raw-HTML rules and sanitizers.

---

## STUDY GUIDE FOR HUMAN (CONCISE)

For each required concept below: why it exists, why alternatives exist, when NOT to use it, common engineering mistakes.

- MDX (authoring)
  - Why: Allows interactive components and JSX inside lesson content; many existing UI features expect MDX.
  - Alternatives: Pure Markdown (no JSX), a JSON-based rich document format. Use alternatives when interactivity is unnecessary or security risk is unacceptable.
  - When NOT to use: Small static text-only lessons or when a lightweight authoring workflow is required.
  - Common mistakes: Allowing un-sanitized HTML/JSX, ambiguous frontmatter, and mixing multiple MDX dialects across services.

- Frontmatter (YAML)
  - Why: Single canonical metadata block per lesson used for routing, IDs, tags, and publish status.
  - Alternatives: External YAML/JSON manifests or DB-only metadata. Use when editorial UX demands separate metadata workflow.
  - When NOT to use: When lessons are managed entirely via a CMS that already stores metadata separately.
  - Common mistakes: Loose typing, optional critical fields, and inconsistent keys across lessons.

- Versioning (SemVer)
  - Why: Unambiguous version ordering and compatibility meaning for lesson content changes.
  - Alternatives: Date-based versioning. Use date-based for audit-centric workflows where time-of-publish matters more than compatibility.
  - When NOT to use: When you only need immutable snapshots and prefer commit SHA references.
  - Common mistakes: Re-using version numbers for incompatible changes or failing to make published versions immutable.

- HTML sanitization & NO-RAW-HTML rule
  - Why: Prevent accidental solution leakage and XSS when content is previewed or persisted.
  - Alternatives: Allow raw HTML but run heavy server-side sanitization/transformation — higher maintenance and risk.
  - When NOT to use: Internal-only drafts that will never be rendered to learners (still not recommended).
  - Common mistakes: Lax validation, inconsistent sanitizer configuration between authoring and preview environments.

---

## CANONICAL SPECIFICATION (PLANNER DECISIONS)

1. Storage location (canonical decision)
   - Decision: Lessons source files MUST live in the monorepo filesystem under a single canonical folder: `/packages/content/lessons/` (git-tracked MDX files). Rationale: versioned with code, reviewable via PRs, CI-enforceable, and aligns with compiled admin and public apps.
   - Constraint: `services/content-engine/` remains Python-only per its README; do NOT add Node runtimes there. A new Node service `services/lessons/generation/` may be added under monorepo if Planner chooses Node ownership for generation.

2. Directory layout (domain-based)
   - Top-level example paths:
     - `/packages/content/lessons/{domain}/{category}/{lesson-slug}.mdx`
     - Example: `/packages/content/lessons/javascript/closures/closures.mdx`
   - Ownership: Content team (write access); reviewers: docs + engineering. Publishing write access limited to CI and release automation.

3. One MDX per lesson rule
   - Strict rule: Exactly one MDX file represents one canonical lesson. File name MUST equal the lesson `slug` with `.mdx` extension.
   - Mapping: lesson ID = canonical generated UUID in frontmatter `id`, slug = file basename, and filename must be kebab-case matching `slug`.

4. Required frontmatter keys (exact keys, types, validation)
   - Required keys and types (YAML):
     - `id` (string, UUID v4) — authoritative immutable identifier for the lesson
     - `slug` (string, regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`) — matches filename
     - `title` (string)
     - `version` (string, SemVer 2.0.0) — increment for non-breaking vs breaking content
     - `published` (boolean) — whether the lesson is public
     - `created_at` (string, ISO 8601 date)
     - `authors` (array of strings — contributor handles or ids)
     - `tags` (array of strings)
     - `domain` (string) — one of allowed domains (e.g., `javascript`, `python`, `devops`)
   - Optional keys:
     - `summary` (string)
     - `difficulty` (enum: `beginner|intermediate|advanced`)
     - `related_lessons` (array of slugs)
   - Validation rules:
     - `id` and `slug` immutable once `published: true` (updates must create new `version`).
     - `slug` must equal the filename basename.
     - `version` must follow SemVer and must be unique per `id` in the versions registry.

5. Example YAML manifest (frontmatter) — copy-paste ready

---

id: "a0f3c9e4-1b9a-4b2e-8f3c-7e2b9d7fa123"
slug: "closures"
title: "Understanding Closures"
version: "1.0.0"
published: false
created_at: "2026-02-14T12:34:56Z"
authors:

- "alice"
  tags:
- "javascript"
- "functions"
  domain: "javascript"
  summary: "Explains closure behavior and lexical scoping."
  difficulty: "intermediate"

---

6. Versioning scheme and storage
   - Decision: Use SemVer 2.0.0 for lesson `version` in frontmatter. Treat `major` increments as breaking API/content changes, `minor` for additive content, `patch` for typo/metadata fixes.
   - Storage of versions: Primary storage is git history (each published version must be accompanied by a Git tag of the form `lesson/{slug}/v{version}`) and a small DB table `lesson_versions` that records immutable snapshots (id, slug, version, commit_sha, published_at, author).
   - Immutability: Published lesson-version records are immutable; edits produce a new `version` and a new commit/tag.

7. NO-RAW-HTML constraint & sanitizer expectations
   - Rule: Raw HTML MUST NOT be persisted into DB payload fields intended for learner rendering. MDX files may contain HTML only in allowed, sanitized forms.
   - Enforcement: Linter and pre-commit must block MDX files with disallowed raw HTML usage (configurable allowed whitelist). CI must run the same sanitizer used in production to verify rendered output contains no disallowed constructs.
   - Sanitizer expectation: Adopt a well-known sanitizer (recommendation: an OWASP-audited sanitizer library) and publish exact sanitizer config in `/docs/official-docs/lesson-sanitization-and-security.md`.

---

## IMPLEMENTER ARTIFACTS (WHAT TO PRODUCE — DO NOT IMPLEMENT HERE)

- Create folder: `/packages/content/lessons/` and domain subfolders.
- Add `docs/official-docs/lesson-frontmatter-spec.md` containing the schema and example validations (YAML schema + JSON schema for CI).
- Add `docs/official-docs/lesson-storage-and-versioning.md` that describes `lesson_versions` table DDL and migration references.
- Add `docs/official-docs/lesson-sanitization-and-security.md` describing sanitizer selection and exact rules.
- Add pre-commit hook and ESLint/mdx plugin config that enforces `one-mdx-per-lesson`, `slug`/filename parity, and blocks raw HTML.
- Add CI check that validates frontmatter, runs sanitizer on rendered HTML, and rejects PRs that modify published versions without creating a new version.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Where are canonical lesson MDX files currently stored (monorepo filesystem, separate content repo, or DB)?
- Which runtime should own generation and storage: `services/lessons/generation/` (Node) or `services/content-engine/` (Python)? Note `content-engine/README.md` enforces Python-only.
- Is there an existing `lessons` DB schema/migration plan managed externally that Implementer must target for `lesson_versions`?

---

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md — Planner spec: canonical lesson content architecture, frontmatter schema, storage and versioning decisions.

---

End of brief.
