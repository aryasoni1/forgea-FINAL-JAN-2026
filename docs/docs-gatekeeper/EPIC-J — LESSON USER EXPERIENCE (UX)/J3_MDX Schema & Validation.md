# J3 — MDX Schema & Validation (Docs Gatekeeper Brief)

**FEATURE CONTEXT**

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J3 — MDX Schema & Validation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md
  - /docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

---

**REQUIRED OFFICIAL DOCUMENTATION**

For each required concept below: Technology / Concept / Official source / Exact version requirement / Why required / Decision it informs / What breaks without it.

- **MDX (mdxjs)**
  - Concept: MDX authoring and runtime semantics (v2)
  - Official source: https://mdxjs.com/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Canonicalizes how JSX, imports, and MDX frontmatter are parsed/rounded by bundlers and runtimes used by the apps.
  - Decision it informs: Parser selection and AST expectations, allowed syntax in lessons, security boundaries for embedded JSX.
  - What breaks without it: Validator may mis-classify valid MDX or miss solution-like JSX; UI rendering may diverge from validation rules.

- **CommonMark (Markdown spec)**
  - Concept: Markdown parsing edge cases and normalization rules
  - Official source: https://spec.commonmark.org/
  - Exact version requirement: 0.30 (or pin) OR: VERSION UNKNOWN — MUST BE PINNED
  - Why required: Determines canonical AST shape for headings, paragraphs, code blocks and inline content.
  - Decision it informs: How AST-based validator tokenizes and normalizes author content prior to heuristics.
  - What breaks without it: False positives/negatives from differing parser behaviors.

- **JSON Schema (frontmatter validation)**
  - Concept: Machine-readable schema for frontmatter (validation and tooling)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12 (recommended)
  - Why required: Formal language for specifying required fields, types, enums, and strictness used by tooling.
  - Decision it informs: Canonical frontmatter schema format and validator implementation choices (JSON Schema vs ad-hoc checks).
  - What breaks without it: Inconsistent schema implementations between validator and UI; authors receive unclear errors.

- **Unified / remark / rehype & mdast (AST tooling)**
  - Concept: AST formats and parser/plugin ecosystem for MDX/Markdown
  - Official sources: https://unifiedjs.com/ and https://github.com/syntax-tree/mdast
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs which AST nodes are available and stable, and which plugin APIs to rely on for traversal/analysis.
  - Decision it informs: Choice of AST parser, plugin versions, and node-handling for validator.
  - What breaks without it: AST node mismatches causing validator crashes or missed violations.

- **Frontmatter parsing (gray-matter or equivalent)**
  - Concept: YAML/TOML/JSON frontmatter extraction semantics and edge cases (multiline, anchors)
  - Official source: https://github.com/jonschlinkert/gray-matter
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines how raw frontmatter maps to validator input (strings, arrays, typed values).
  - Decision it informs: How to canonicalize/normalize fields before applying JSON Schema.
  - What breaks without it: Type mismatches, unexpected null/undefined behavior in frontmatter validation.

---

**EXISTING INTERNAL DOCS (VERIFIED)**

- /docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (schema, validator, CI integration, test corpus) but does not supply canonical schema or author docs.

- /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - Coverage status: PARTIAL
  - Exact gaps: Provides a canonical lesson template but lacks strict frontmatter field definitions, ordered section requirements, and rejection heuristics required by a validator.

- forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx (source)
  - Coverage status: INSUFFICIENT (code only)
  - Exact gaps: Implementation assumes content shape but does not document or enforce schema; not author-facing.

No internal doc currently provides the authoritative MDX frontmatter JSON Schema, an ordered-section contract, rejection rules, or an author-facing remediation guide.

---

**DOCUMENTATION COVERAGE DECISION**

❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

List of required new docs (brief):

- /docs/official-docs/EPIC-J/mdx_frontmatter_schema_v1.md (canonical JSON Schema + field rationale)
- /docs/official-docs/EPIC-J/mdx_validator_spec.md (rules, exit codes, error msg shapes — not implementation)
- /docs/official-docs/EPIC-J/mdx_ci_integration_requirements.md (CI gating contract and hook inputs)
- /docs/official-docs/EPIC-J/mdx_test_corpus_v1.md (curated positive/negative MDX examples and test vectors)
- /docs/official-docs/EPIC-J/mdx_author_guidelines.md (author-facing remediation and examples)

Rationale: The codebase contains UI surfaces that expect MDX lessons but there is no authoritative source-of-truth schema or validator. Planner work cannot proceed safely without pinned external specs (MDX, Unified) and these internal docs.

---

**STUDY GUIDE FOR HUMAN**

For each required concept, why it exists, alternatives, when NOT to use it, and common engineering mistakes.

- **MDX frontmatter schema (why)**: Ensures all lessons present consistent metadata (id, title, difficulty, tags, canonical slug). Alternatives: ad-hoc checks or ad-hoc conventions — avoid those for cross-tooling consistency. When NOT to use: small experimental drafts; use only for published lessons. Common mistakes: allowing free-form text in fields that are expected to be enums (e.g., `difficulty`).

- **AST-based validation (why)**: Robustly detects solution-like content inside code blocks, inline code, or JSX. Alternatives: regex-only checks (fragile). When NOT to use: trivial metadata-only checks. Common mistakes: failing to normalize parser output, and ignoring fenced-code-language tags.

- **JSON Schema (why)**: Machine-checkable frontmatter contract shared between validator and UI. Alternatives: TypeScript types (good for code, not for runtime validation). When NOT to use: ephemeral probes; prefer JSON Schema for CI. Common mistakes: missing `additionalProperties: false` leading to silent typos.

- **Author remediation docs (why)**: Authors need concrete examples and minimal diffs to fix validation failures. Alternatives: ad-hoc PR comments (inefficient). Common mistakes: unclear error messages that don't cite field context or sample fixes.

---

**INTERNAL DOCS TO ADD OR EXTEND**

Only required because coverage is missing; canonical paths and exact knowledge to add:

- /docs/official-docs/EPIC-J/mdx_frontmatter_schema_v1.md
  - Purpose: Publish canonical JSON Schema for frontmatter plus field-level rationale and examples.
  - Exact knowledge to add: Full field list, types, enums, regex formats, `additionalProperties` policy, sample valid/invalid frontmatter blocks.
  - Required version pin: JSON Schema 2020-12; reference pinned MDX / remark versions.

- /docs/official-docs/EPIC-J/mdx_validator_spec.md
  - Purpose: Human-readable validator contract (what must be rejected and why) used by Implementer and Integration Checker.
  - Exact knowledge to add: Rejection heuristics, error categories, CLI exit code mapping, minimal error message structure, auto-fixable vs non-auto-fixable guidance.
  - Required version pin: Unified/remark version; mdast node shape.

- /docs/official-docs/EPIC-J/mdx_test_corpus_v1.md
  - Purpose: Curated corpus of 50+ positive/negative MDX examples used by QA and CI.
  - Exact knowledge to add: Test filenames, expected validator outcomes, and rationale for each negative example.
  - Required version pin: None (corpus is versioned internally).

- /docs/official-docs/EPIC-J/mdx_author_guidelines.md
  - Purpose: Author-facing remediation steps for all validator errors, minimal examples, and a FAQ about common failures.
  - Exact knowledge to add: Typical fixes, pre-commit command, examples of disallowed 'solution' patterns and how to rephrase.

---

**OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)**

- Which team will OWN the HARD-LOCK policy for frontmatter schema and version pinning (who approves schema bumps)?
- Exact MDX / Unified / remark version pins to use for validator and UI parity.
- Allowed degree of auto-fixing: may the validator rewrite frontmatter (e.g., normalizing tag arrays) or only surface errors?
- Definitive definition of what counts as a 'solution' (heuristic thresholds, false-positive tolerance).

---

**MASTER DOCS REGISTRY ACTION**

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-J / J3 — MDX Schema & Validation
- Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md
- Status: ADDED (MISSING OFFICIAL DOCS)
- Reason: Docs Gatekeeper brief identifies missing official external specs and internal docs required to safely design and implement a build-time MDX validator and author guidance.
- Date: 2026-02-14

---

**END**
