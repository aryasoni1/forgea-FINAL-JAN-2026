### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D2 — Canonical Lesson Template
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema
   - Concept: Canonical JSON Schema specification (draft selection)
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines schema vocabulary, $id, $ref semantics, and validation keywords used by the lesson schema.
   - Decision it informs: Choice of schema keywords, refs resolution strategy, and validator compatibility.
   - What breaks without it: Incompatible validator behavior, ambiguous keyword semantics, and broken CI validation.

2. Technology: AJV (or equivalent JSON Schema validator)
   - Concept: Node.js JSON Schema validator and CLI/usage guidance
   - Official source: https://ajv.js.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Implementation guidance for schema compilation, CLI usage, and Node compatibility.
   - Decision it informs: Validator API (compile vs. validate), supported schema draft, and CI invocation.
   - What breaks without it: Validator mismatches across environments and failing PR checks.

3. Technology: Node.js runtime policy
   - Concept: Node.js version and allowed range for CI and developer environments
   - Official source: https://nodejs.org/en/about/releases/
   - Exact version requirement: See `docs/official-docs/node-version-policy.md` (registry indicates Node.js 20.x)
   - Why required: Ensures validator/CLI compatibility and deterministic CI images.
   - Decision it informs: Supported validator versions and CI runner images.
   - What breaks without it: Divergent local vs CI behavior and unexpected runtime failures.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - Coverage status: PARTIAL
  - Exact gaps: Describes agents and execution plan but does not declare schema draft, validator choice, or provide schema artifact.

- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists D2 tasks and ownership but contains no schema artifact, CI steps, or decision log.

- /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (schema file, validator, CI, tests) but is not an authoritative spec.

- /docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Master registry lists many entries but has no entry for EPIC-D / D2 nor the lesson schema artifacts.

- /docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains Node.js and other runtime docs; missing canonical JSON Schema and validator (AJV) entries referenced by D2.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend: `/docs/official-docs/EPIC-D/lesson-schema.md` (new), `/docs/official-docs/EPIC-D/lesson-schema-ci.md` (new), and the registry entries under `/docs/official-docs-registry.md` must include JSON Schema and validator pins.

### STUDY GUIDE FOR HUMAN

- JSON Schema: Why — establishes canonical validation; Alternatives — different drafts (2019-09 / 2020-12 / 2024); When NOT to use — for inter-service API contracts prefer OpenAPI; Common mistakes — leaving draft unspecified, using unsupported keywords, unresolved $ref.
- Validator (AJV): Why — provides Node CLI and programmatic validation; Alternatives — other validators or language runtimes; When NOT to use — if runtime is non-Node or requires different draft; Common mistakes — not pinning plugin/format packages, ignoring `strict` modes.
- CI/Node policy: Why — deterministic CI validation; Alternatives — containerized runners with pinned images; When NOT to use — avoid unpinned tool versions in CI; Common mistakes — running validator with differing lockfiles or Node versions.

### INTERNAL DOCS TO ADD OR EXTEND

Place these under `/docs/official-docs/EPIC-D/`.

- Path: /docs/official-docs/EPIC-D/lesson-schema.md
  - Purpose: Canonical lesson schema spec, declared JSON Schema draft, `$id`, refs strategy, examples, and sanitization guidance.
  - Exact knowledge to add: Full `lesson.v1.json` reference excerpt, schema draft pin, `$id` namespace, `lab_intents` shape, difficulty enum, field editability annotations (human vs AI), and sample records.
  - Required version pin: JSON Schema draft — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Path: /docs/official-docs/EPIC-D/lesson-schema-ci.md
  - Purpose: CI step definition, validator CLI invocation, Node image pin, and failure semantics.
  - Exact knowledge to add: `ajv` CLI commands (or chosen validator), Node exact version, sample GitHub Actions step, and remediation guidance.
  - Required version pin: AJV/node pins — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Path: /docs/official-docs/EPIC-D/lesson-schema-decision-log.md
  - Purpose: YAML decision log showing human-editable vs AI-editable fields and locked decisions.
  - Exact knowledge to add: Field list with `editable: human|ai|locked`, schema v1 freeze date, and change process.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which JSON Schema draft should `lesson.v1.json` target? (required)
- Which Node/AJV versions will be supported in CI? (required)
- Which CI platform and runner images will run schema validation (GitHub Actions / self-hosted)? (required)
- Are raw HTML/Markdown sections allowed, or must content be sanitized / stored as sanitized AST? (security blocker)

### MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D2 — Canonical Lesson Template
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D2_Canonical Lesson Template.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and gaps for lesson schema v1.

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D2 — Canonical Lesson Template
  - Doc path: /docs/official-docs/EPIC-D/lesson-schema.md
  - Status: REQUIRED
  - Reason: Canonical lesson JSON Schema artifact and decision log must be published before implementation.

---

End of Docs Gatekeeper brief for EPIC-D / D2.
