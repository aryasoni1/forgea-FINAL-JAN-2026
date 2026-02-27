FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K7 — Instructions & Step Panel
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below, the official source, exact version requirement (or note), reason it's required, which decision it informs, and what will break without it.

- Technology: JSON Schema for `.forgea/steps.json`
  - Official source: /docs/official-docs/EPIC-F/steps.schema.json
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides a single canonical, machine-readable schema for step artifacts used by CI, authoring tools, and the UI loader.
  - Decision it informs: Canonical artifact shape, CI validation rules, and UI payload parsing.
  - What breaks without it: Divergent authoring, CI false-positives/negatives, inconsistent UI rendering and verification mismatches.

- Technology: API contract for instruction payloads
  - Official source: (to be published) /docs/official-docs/EPIC-K/instruction_api_contract.md
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: UI implementers need a stable HTTP contract (paths, auth, caching) to fetch step payloads safely.
  - Decision it informs: Server vs client loading approach, caching strategy, auth requirements for preview vs student sessions.
  - What breaks without it: Fragmented fetch implementations, runtime auth failures, cache mismatch bugs.

- Technology: Step↔Verification mapping spec
  - Official source: /docs/official-docs/EPIC-H/step_verification_mapping.md
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps step IDs to verification checks so UI and verification engine agree on expectations.
  - Decision it informs: Which verification hooks are required per step and gating rules for lab progress.
  - What breaks without it: Incorrect pass/fail mappings, broken acceptance tests, confusing UX.

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: References `.forgea/steps.json` semantics but does not publish the canonical `steps.schema.json` or a loader/service contract.

- /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md
  - Coverage status: PARTIAL
  - Exact gaps: Authoring rules present in prose; missing machine-readable examples and CI validator guidance.

- /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md
  - Coverage status: PARTIAL
  - Exact gaps: QA checklist exists but lacks example step JSON and validation scripts.

- /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H11_Step-Based Verification Support.md
  - Coverage status: PARTIAL
  - Exact gaps: References step→verification mapping but lacks a published mapping artifact and version pin.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

List of docs to extend and why:

- Extend `/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md` to include canonical artifact path and link to `steps.schema.json`.
- Add `/docs/official-docs/EPIC-F/steps.schema.json` (the machine-readable JSON Schema) and pin schema version.
- Add `/docs/official-docs/EPIC-K/instruction_api_contract.md` defining the server API contract.
- Extend `/docs/official-docs/EPIC-H/step_verification_mapping.md` with a versioned mapping file and examples.

STUDY GUIDE FOR HUMAN

- `steps.schema.json` (Why): Centralizes the step payload shape so authoring tools, CI, and the UI parse the same contract.
  - Alternatives: Loose MD/README-based instructions (human readable only). Use when lab instructions are informal and don't require verification.
  - When NOT to use: Small one-off exercises where no programmatic verification or loader is required.
  - Common mistakes: Leaving optional fields ambiguous; inconsistent step IDs; omitting `verification` linkage.

- Instruction API contract (Why): Ensures clients fetch consistent payloads with clear auth and caching rules.
  - Alternatives: Loading `.forgea/steps.json` directly from repo at runtime (client-side). Use when offline-first or simple static hosts suffice.
  - When NOT to use: When server-side access control or merged/normalized payloads are required.
  - Common mistakes: Not specifying cache headers, inconsistent auth between preview and student sessions.

- Step→Verification mapping (Why): Binds UI steps to verification logic, enabling reliable pass/fail signals.
  - Alternatives: Ad-hoc mapping in verification engine code (hidden). Avoid because it creates drift.
  - When NOT to use: Labs without automated verification.
  - Common mistakes: Using non-unique step IDs; failing to version mappings with schema changes.

INTERNAL DOCS TO ADD OR EXTEND

Only include these if coverage is PARTIAL or MISSING (applies here):

- Canonical schema
  - Canonical path: /docs/official-docs/EPIC-F/steps.schema.json
  - Purpose: Publish the machine-readable JSON Schema (and small examples) used by CI validators and authoring tools.
  - Exact knowledge to add: Full JSON Schema, examples for `instruction`, `hint`, `verification` fields, and a `schema_version` field.
  - Required version pin: JSON Schema spec version (e.g., 2020-12) and `schema_version` value.

- Instruction API contract
  - Canonical path: /docs/official-docs/EPIC-K/instruction_api_contract.md
  - Purpose: Define `GET /api/labs/:labId/steps`, request/response shape, auth rules, and caching expectations.
  - Exact knowledge to add: Request params, response JSON schema, auth scopes for preview vs student, TTL/caching headers, error codes.
  - Required version pin: API contract version (semantic versioning) and retention of previous versions in registry.

- Step→Verification mapping
  - Canonical path: /docs/official-docs/EPIC-H/step_verification_mapping.md
  - Purpose: Versioned artifact mapping `stepId -> verificationId` and verification metadata.
  - Exact knowledge to add: Example mapping JSON, verification payload shape, and gating rules.
  - Required version pin: Mapping schema version.

OPEN QUESTIONS / AMBIGUITIES

- Which canonical location should receive step artifacts in lab repos: repo-root `.forgea/steps.json` (recommended) or per-lab path? This is a blocking decision for deterministic loader behavior.
- Should the UI fetch instructions via a server API (`/api/labs/:labId/steps`) or load the `.forgea/steps.json` directly from the repository at runtime? (Planner decision — security, caching, and auth tradeoffs.)
- Who are the sign-off stakeholders for the schema and API decisions? (Suggested: EPIC-F owner, EPIC-K UI owner, EPIC-H verification owner.)

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K7 — Instructions & Step Panel
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K7_Instructions & Step Panel.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying missing canonical schema, API contract, and verification mapping required before implementation.
  - Date: 2026-02-15

END
