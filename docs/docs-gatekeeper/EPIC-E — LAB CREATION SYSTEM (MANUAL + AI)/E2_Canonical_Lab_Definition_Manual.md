### FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E2_Canonical_Lab_Definition_Manual (Canonical Lab Definition v1)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI).md


### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: JSON Schema (machine-readable schema specification)
   - Concept: Structural validation and machine-readable contract for lab definitions
   - Official source: https://json-schema.org/specification-links.html#2020-12
   - Exact version requirement: 2020-12
   - Why required: Provides canonical rules for validating lab definitions (types, required fields, formats, allowed values).
   - Decision it informs: Validator implementation (QA/Tester), schema drafting (Planner/Architect), AI-output acceptance rules (E8).
   - What breaks without it: Ambiguous validation behavior, incompatible validators across services, inability to automtically reject unsafe/invalid lab definitions.

2) Technology: Semantic Versioning
   - Concept: `version` field semantics and compatibility rules for lab definitions
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Defines how `version` increments relate to compatibility and migration policy.
   - Decision it informs: Versioning policy, compatibility rules for verification harness, migration guidance.
   - What breaks without it: Inconsistent version bumps, accidental breaking changes labeled as compatible, migration confusion.

3) Technology: OWASP Top Ten / Input Validation guidance
   - Concept: Security guidance for input validation, injection, and secret handling
   - Official source: https://owasp.org/www-project-top-ten/
   - Exact version requirement: OWASP Top Ten 2021 (or later pinned) — VERSION MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Identifies classes of risky fields (injection, secrets) and informs forbidden-field policies.
   - Decision it informs: Security Sentinel review, forbidden-fields list, CI checks to reject secrets/executable payloads.
   - What breaks without it: Increased risk of secret leakage, code-execution vectors in lab definitions, unsafe AI-generated content.


### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains orchestrator analysis and agent prompts but does not include the canonical schema, JSON Schema artifact, examples, or security review.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI).md
  - Coverage status: PARTIAL
  - Exact gaps: Provides scope and feature list for EPIC-E but lacks the technical schema specification and artifact locations.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md
  - Coverage status: PARTIAL
  - Exact gaps: (if present) Code-scout notes and missing explicit schema and validation harness artifacts.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Documents to extend:
  - `/docs/official-docs/EPIC-E/canonical_lab_schema_v1.md` — extend to include full technical schema spec and rationale.
  - `/docs/official-docs/EPIC-E/canonical_lab_schema_v1.json` — add machine-readable JSON Schema (2020-12) artifact.
  - `/docs/official-docs/EPIC-E/examples/` — add at least 5 full example lab definitions (valid + invalid) and edge cases.
  - `/docs/official-docs/EPIC-E/security_review.md` — Security Sentinel findings, forbidden fields, and CI blocking rules.
  - `/docs/official-docs/EPIC-E/qa_validator_harness.md` — QA harness spec and CI integration instructions.
  - `/docs/official-docs/EPIC-E/approval_gate.md` — HARD LOCK approval gate policy and audit-trail requirements.

Reason: Orchestrator output and EPIC task file provide scope and planner prompts but do not contain the canonical schema artifacts, examples, security reviews, or CI/approval policy required to safely freeze schema v1.


### STUDY GUIDE FOR HUMAN

- JSON Schema (2020-12): Why — canonical, machine-validated contract for lab definitions. Alternatives — custom validation or other schema languages (e.g., protobufs); use JSON Schema when JSON-based artifacts and wide validator ecosystem are needed. When NOT to use — if binary formats or strongly typed language bindings are required. Common mistakes — leaving `additionalProperties` open for untrusted input, not constraining string formats, not using `const`/`enum` for critical fields.

- Semantic Versioning (SemVer 2.0.0): Why — standardizes `version` semantics and compatibility claims. Alternatives — calendar versioning (CalVer) or opaque version IDs. When NOT to use — when versions represent non-semantic build IDs only. Common mistakes — bumping patch for breaking changes or using `version` to mean `id`.

- OWASP Top Ten / Input Validation: Why — identifies injection and secret leakage risks. Alternatives — internal threat models alone are insufficient. When NOT to use — non-web contexts still need local equivalent; always consult corresponding guidance. Common mistakes — relying solely on input validation without output encoding or not treating AI outputs as untrusted.


### INTERNAL DOCS TO ADD OR EXTEND

(Under `/docs/official-docs/EPIC-E/`)

- Path: canonical_lab_schema_v1.md
  - Purpose: Human-readable technical schema spec listing required/optional fields, types, constraints, cardinality, and rationale.
  - Exact knowledge to add: Full field list, rationales, compatibility guarantees, deterministic verification mapping, and sample usage.
  - Required version pin: N/A (internal)

- Path: canonical_lab_schema_v1.json
  - Purpose: Machine-readable JSON Schema (2020-12) artifact.
  - Exact knowledge to add: Full JSON Schema using draft 2020-12 constructs, `additionalProperties: false`, formats for `id`, enumerations for `difficulty` and `failure_type`.
  - Required version pin: JSON Schema 2020-12

- Path: examples/ (folder)
  - Purpose: Provide 5+ example lab definitions (valid + invalid) and edge-case variants.
  - Exact knowledge to add: At least 5 named examples (valid and invalid) with short explanations.
  - Required version pin: N/A

- Path: security_review.md
  - Purpose: Security Sentinel review detailing forbidden fields, validation rules, and CI blocking checks.
  - Exact knowledge to add: Forbidden-fields list (secrets, arbitrary shell commands, test modification), regex-based validators, and example attack vectors.
  - Required version pin: OWASP Top Ten 2021 (pinned in registry)

- Path: qa_validator_harness.md
  - Purpose: Description of QA harness, test cases, CI integration points, and example validator script.
  - Exact knowledge to add: CLI invocation, sample test vectors, integration with CI failure semantics.
  - Required version pin: JSON Schema 2020-12

- Path: approval_gate.md
  - Purpose: HARD LOCK approval gate policy, owner, approval checklist, and audit-trail requirements.
  - Exact knowledge to add: Owner assigned, required reviewers, audit log retention, merge/commit gating semantics.
  - Required version pin: N/A


### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Who is the approval gate owner for HARD LOCKed artifacts (schema v1)? This must be named explicitly before committing schema artifacts.
- Exact registry location and filename conventions for published schema JSON and examples (confirmed path recommended below, but needs ownership).
- Which JSON Schema draft should the runtime validators adopt fleet-wide (2020-12 recommended, confirm compatibility with validator libraries used in services)?
- CI enforcement: which pipeline(s) will run schema validation and reject merges?


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E2 — Canonical Lab Definition (Manual)
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for canonical lab schema v1 and approval gating.


---

```
