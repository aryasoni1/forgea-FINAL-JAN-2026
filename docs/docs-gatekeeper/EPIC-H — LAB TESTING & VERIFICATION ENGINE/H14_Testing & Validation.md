FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H14_Testing & Validation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H14_Testing & Validation.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H14_Testing & Validation.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema
   - Concept: Test-matrix and test-result manifest schemas
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12
   - Why required: Machine-readable test definitions, deterministic result validation, and schema evolution rules.
   - Decision it informs: Test artifact layout, required/optional fields, and ingestion validation gates.
   - What breaks without it: Divergent test outputs and failed automated validation.

2. Technology: xUnit-style test conventions
   - Concept: Canonical test-case result shapes and exit-code semantics
   - Official source: Language/framework-specific docs (e.g., JUnit / pytest / TAP)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER chosen framework
   - Why required: Establishes PASS/FAIL/ERROR/skip semantics and standard result parsing.
   - Decision it informs: Which runner adapters to implement and how to classify outcomes.
   - What breaks without it: Misinterpreted test outcomes and inconsistent gating.

3. Technology: CI Runner / Workflow docs (example: GitHub Actions)
   - Concept: Runner environment, workflow matrix semantics, available toolchains
   - Official source: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED TO chosen CI images
   - Why required: Defines test environment capabilities and reproducible runner images for deterministic tests.
   - Decision it informs: Which fixtures are feasible on managed runners and indentation for matrix runs.
   - What breaks without it: Tests that rely on unavailable OS features or mismatched toolchain versions.

4. Technology: OpenTelemetry (optional for telemetry-backed tests)
   - Concept: Metric and trace naming, histogram buckets and exporter expectations
   - Official source: https://opentelemetry.io/specs/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED IF USED
   - Why required: Standardized telemetry for performance and flakiness detection in test matrices.
   - Decision it informs: Metric names and sampling windows used by flaky-test detection.
   - What breaks without it: Inconsistent telemetry and inability to automate flakiness detection.

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H14_Testing & Validation.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level plan and agent roles present but missing concrete test-matrix template, test vectors, fixture manifests, and result storage paths.

- /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H14_Testing & Validation.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing test artifacts and templates but lacks canonical test case definitions and integration-run expectations.

- `/docs/official-docs/EPIC-H/` (directory currently absent or lacking H14 docs)
  - Coverage status: INSUFFICIENT
  - Exact gaps: No `test-matrix` spec, no fixture manifest, and no test-result ingestion schema.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Required new/extended docs before implementer work:
- `/docs/official-docs/EPIC-H/test-matrix-template.md` — canonical template and YAML example for QA.
- `/docs/official-docs/EPIC-H/test-artifact-schema.md` — JSON Schema (2020-12) for test fixtures, expected outputs, and result manifests.
- `/docs/official-docs/EPIC-H/test-fixtures-manifest.md` — canonical fixture locations, determinism constraints, and mock hooks.

STUDY GUIDE FOR HUMAN (CONCISE)

- `JSON Schema`:
  - Why: Validates test definitions and results programmatically.
  - Alternatives: Ad-hoc parsers — fragile.
  - When NOT to use: Temporary developer-only prototypes.
  - Common mistakes: Not versioning schema; adding non-deterministic fields without guidance.

- `xUnit conventions`:
  - Why: Uniform PASS/FAIL/ERROR semantics across languages.
  - Alternatives: Custom exit codes — increases integration work.
  - When NOT to use: Very small scripts where full runner integration is unnecessary.
  - Common mistakes: Treating non-zero exit codes as only errors (some frameworks use codes for skips).

- `CI Runner docs`:
  - Why: Ensures tests run in reproducible environments identical to CI.
  - Alternatives: Local-only runner specs — not acceptable for CI gating.
  - Common mistakes: Assuming the same OS features across hosted runners.

INTERNAL DOCS TO ADD OR EXTEND (DETAILS)

1. Path: `/docs/official-docs/EPIC-H/test-matrix-template.md`
   - Purpose: Provide the canonical QA test-matrix template (YAML/Markdown) mapping test-cases to EPIC-H completion criteria.
   - Exact knowledge to add: Template fields, example matrices for PASS/FAIL/ERROR/timeout/immutability/artifact persistence, and CI matrix usage patterns.
   - Required version pin: JSON Schema 2020-12 for embedded manifest fragments.

2. Path: `/docs/official-docs/EPIC-H/test-artifact-schema.md`
   - Purpose: JSON Schema (2020-12) describing fixture manifests, expected outputs, and result-report shapes.
   - Exact knowledge to add: Schema for `test_case_id`, `fixture_path`, `expected_exit_code`, `expected_artifacts`, `immutability_proof_path`, `run_timeout_ms`, and `result_summary`.
   - Required version pin: JSON Schema 2020-12

3. Path: `/docs/official-docs/EPIC-H/test-fixtures-manifest.md`
   - Purpose: Canonical locations for deterministic fixtures, mock endpoints, and test hooks required by implementer.
   - Exact knowledge to add: Fixture layout under `/.forgea/tests/fixtures/`, mocking guidance, and invariants for determinism.
   - Required version pin: CI runner image versions (to be chosen).

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which test runner(s) and languages must be supported (pytest, jest, JUnit)?
- Which CI images and toolchain versions are canonical for determinism?
- Where should large test fixtures be stored (repo vs artifact store)?

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-H / H14 — Testing & Validation
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H14_Testing & Validation.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying required official docs, internal doc gaps, and registry updates for the EPIC-H testing matrix and fixture manifests.
