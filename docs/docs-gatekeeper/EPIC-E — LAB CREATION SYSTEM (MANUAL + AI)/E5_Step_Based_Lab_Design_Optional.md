# FEATURE DOCS BRIEF — E5: Step Based Lab Design (Optional)

## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E5 — Step Based Lab Design (Optional)
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md
  - /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5*Step_Based_Lab_Design_Optional.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

## REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema
   - Concept: Schema for `step` metadata and lab config
   - Official source: https://json-schema.org/specification-links.html
   - Exact version requirement: 2020-12
   - Why required: Defines machine-usable contract for step metadata (IDs, titles, file bindings, progression rules) that implementers will validate programmatically.
   - Decision it informs: Validation, codegen (TypeScript/JSON Schema), CI enforcement inputs.
   - What breaks without it: Interoperability across services, validator ambiguity, and mismatched enforcement behavior.

2. Technology: Semantic Versioning
   - Concept: Versioning rules for step-schema and lab-config artifacts
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Establishes how breaking/non-breaking changes to step definitions are signalled and migrated.
   - Decision it informs: Migration rules, deploy gating, and rollback semantics.
   - What breaks without it: Unclear upgrade/migration policy risking runtime incompatibility.

3. Technology: Glob / Pathspec semantics
   - Concept: File-path binding pattern syntax used to pledge files to steps (matching rules)
   - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Enforcement (CI/linter/hook) needs an exact pattern grammar (e.g., gitignore vs minimatch vs bash glob) to deterministically map files to steps.
   - Decision it informs: Canonical matching engine used in enforcement hooks.
   - What breaks without it: Divergent matching implementations causing false positives/negatives in enforcement.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis and orchestrator prompts but does not provide a machine-usable step metadata schema, file-binding conventions, or enforcement touchpoint mapping.

- /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5*Step_Based_Lab_Design_Optional.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scout correctly identifies missing artifacts (schema, enforcement, tests) but does not supply the required JSON Schema or example mappings.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs requiring extension:
- `/docs/official-docs/EPIC-E/step_based_lab_schema.md` — add JSON Schema + migration guidance.
- `/docs/official-docs/EPIC-E/enforcement_integration.md` — list CI/hook touchpoints and required inputs.

## STUDY GUIDE FOR HUMAN

- JSON Schema (2020-12): Why — provides authoritative, machine-usable schema; Alternatives — Protobuf/OpenAPI (not ideal for ad-hoc file binding); When NOT to use — if consumers require binary schemas or RPC-only; Common mistakes — underspecified `patternProperties` for file globs, no `additionalProperties` policy.
- Semantic Versioning (2.0.0): Why — explicit upgrade rules; Alternatives — calendar versioning (CalVer) (less useful for API/schema compatibility); When NOT to use — experimental drafts where breaking changes are frequent; Common mistakes — bumping major for non-breaking metadata tweaks.
- Glob / Pathspec semantics: Why — deterministically map files to steps; Alternatives — explicit file lists (works but heavy); When NOT to use — if labs must pledge individual files only; Common mistakes — mixing gitignore-style patterns with minimatch leading to mismatches.

## INTERNAL DOCS TO ADD OR EXTEND

Only add these if implementing teams agree to enable step-based labs.

1. Path: /docs/official-docs/EPIC-E/step_based_lab_schema.md
   - Purpose: Provide the canonical JSON Schema (2020-12) for `StepMetadata` and `LabConfig`.
   - Exact knowledge to add: Full JSON Schema, TypeScript interface examples, example 3-step lab mapping, required validation semantics (required fields, enums), and SemVer policy for schema changes.
   - Required version pin: JSON Schema 2020-12; SemVer 2.0.0.

2. Path: /docs/official-docs/EPIC-E/step_examples/3_step_worked_example.md
   - Purpose: Concrete worked example showing file-path bindings and sequential progression for a sample 3-step lab.
   - Exact knowledge to add: Example files layout, sample `lab.config.json` using the schema, and expected CI validation outputs per step.
   - Required version pin: JSON Schema 2020-12.

3. Path: /docs/official-docs/EPIC-E/enforcement_integration.md
   - Purpose: Describe enforcement touchpoints (pre-commit, CI lint job, server-side validation) and the inputs they require.
   - Exact knowledge to add: Hook invocation signatures, expected artifact locations, config flags for opt-in labs, and migration guidance for step changes.
   - Required version pin: Glob/pathspec grammar (MUST BE PINNED).

## OPEN QUESTIONS / AMBIGUITIES

- Which exact glob/pathspec grammar will implementers standardize on? (gitignore vs minimatch vs custom) — required to pin before enforcement implementation.
- Are step bindings repository-wide conventions or per-lab overrides? Need decision for enforcement scope.
- Which CI providers and hook runtimes must be supported? (affects example hook code and recommended integrations).

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E5 — Step Based Lab Design (Optional)
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for step-based lab design.

---

End of brief.
