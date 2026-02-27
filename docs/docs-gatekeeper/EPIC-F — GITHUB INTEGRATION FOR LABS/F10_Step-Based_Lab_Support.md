## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F10 — Step-Based Lab Support
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md


### REQUIRED OFFICIAL DOCUMENTATION

Below are the authoritative external documents that must be read and pinned (where applicable) before implementation. Each entry lists why the doc is required, the decision it informs, and the impact of missing it.

- Technology: JSON Schema
  - Concept: Machine-readable schema specification for `.forgea/steps.json` (types, keywords, validation semantics)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Provides canonical validation rules and semantic types for implementing a strict `steps.json` schema and validation logic.
  - Decision it informs: Field types, required/optional semantics, and schema validation libraries and behavior.
  - What breaks without it: Incompatible or ambiguous schema semantics leading to inconsistent validation across environments.

- Technology: Glob / Pathspec (file pattern semantics)
  - Concept: Canonical globbing/pathspec behavior used to map changed files to steps (e.g., gitignore-style globs)
  - Official source: VERSION TO BE PINNED — choose a canonical spec (e.g., gitignore minimatch or git pathspec docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Mapping rules require unambiguous interpretation of globs; mismatched glob semantics cause incorrect step mapping or false positives when blocking.
  - Decision it informs: Which glob library or engine to use, edge-case matching rules, and examples in the authoring guide.
  - What breaks without it: Different environments (local vs CI) may match different files; blocking may be bypassed unintentionally.

- Technology: Git Provider Webhooks & Push Event Payloads (GitHub example)
  - Concept: Webhook event semantics for push events, changed file lists, and metadata used to map pushes to steps
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks and https://docs.github.com/en/developers/webhooks-and-events/webhooks/event-payloads#push
  - Exact version requirement: REST/webhook docs as published — VERSION NOTE: stable but confirm any provider-specific payload differences
  - Why required: Defines how to extract changed files and commit metadata from push events for mapping and verification.
  - Decision it informs: Which webhook fields to trust, how to compute changed files for a push, and which edge cases exist (force-push, large pushes).
  - What breaks without it: Implementers cannot reliably reconstruct changed-file sets from push payloads; verification tests may be invalid.

- Technology: Git Provider Branch Protection & Checks API (blocking/merge gate)
  - Concept: How to require checks or use branch protection to prevent merges when steps are incomplete (e.g., GitHub Branch Protection + Checks API)
  - Official source: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches and https://docs.github.com/en/rest/checks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Needed to design enforcement surface: server-side gate (webhook + CI) vs provider-side blocking (required checks) and to document required check semantics.
  - Decision it informs: Whether blocking must be atomic per-push, how to signal failure to users (checks vs PR status), and required permissions for automation.
  - What breaks without it: Enforcement may be unenforceable at merge time, or inconsistent across repos and orgs.


### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level plan and agent prompts present; missing machine-readable schema, mapping heuristics, persistence contract, and acceptance checklist.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts, tests, and docs, but does not provide the definitive `.forgea/steps.json` schema or mapping rules.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend (minimum):
- `/docs/official-docs/EPIC-F/steps.json-schema.md` — formal schema and validation rules for `.forgea/steps.json` (include machine-readable JSON Schema file).
- `/docs/official-docs/EPIC-F/step-engine-mapping.md` — mapping heuristics, changed-file → step rules, and blocking criteria.
- `/docs/official-docs/EPIC-F/step-persistence-contract.md` — persistence contract describing LabSession metadata keys, types, and optional repo-side artifacts.


### STUDY GUIDE FOR HUMAN (FOR EACH REQUIRED CONCEPT)

- `JSON Schema (2020-12)`
  - Why this exists: Guarantees machine-validated `steps.json` with clear types and constraints.
  - Why alternatives exist: Lightweight ad-hoc validation (YAML only) is easier but error-prone; JSON Schema is preferred for tooling and editors.
  - When NOT to use it: Very small prototypes where formal validation isn't required.
  - Common engineering mistakes: Allowing ambiguous optional fields; not providing `id` or stable `key` fields for steps.

- `Glob / Pathspec`
  - Why this exists: Steps reference files via globs; canonical semantics avoid mismatches between local/dev and CI.
  - Why alternatives exist: Regex-based matching (more precise) — but glob is author-friendly.
  - When NOT to use it: When fine-grained content-awareness (AST-level) is required to map changes.
  - Common engineering mistakes: Relying on unpinned glob engines causing different match results across environments.

- `Git Provider Webhooks & Push Payloads`
  - Why this exists: Push events are the trigger for step mapping and blocking.
  - Why alternatives exist: Polling commit APIs (slower) or PR-only enforcement (missing direct pushes).
  - When NOT to use it: Repos where webhooks are not permitted; fallback to CI polling required.
  - Common engineering mistakes: Trusting incomplete payloads for large pushes; not handling force-pushes or rebases.

- `Branch Protection & Checks API`
  - Why this exists: Provides provider-level merge blocking and clearer UX via checks that surface reasons for failure.
  - Why alternatives exist: Server-side gate that reverts pushes (dangerous) or posts comments — less robust.
  - When NOT to use it: When org policies forbid adding required checks across many repos.
  - Common engineering mistakes: Misconfiguring checks so they are not required for target branches; assuming checks run immediately for very large PRs.


### INTERNAL DOCS TO ADD OR EXTEND

Create these files under `/docs/official-docs/EPIC-F/`.

- Path: /docs/official-docs/EPIC-F/steps.json-schema.md
  - Purpose: Provide the canonical JSON Schema for `.forgea/steps.json` and include a downloadable `steps.schema.json` machine-readable file.
  - Exact knowledge to add: Full schema (fields below), examples for common step types, validation rules, and editor/schema suggestions.
  - Required version pin: JSON Schema 2020-12

- Path: /docs/official-docs/EPIC-F/step-engine-mapping.md
  - Purpose: Describe mapping heuristics from changed files to steps, ambiguous-case heuristics, and blocking criteria (explicit rules).
  - Exact knowledge to add: Mapping algorithms, examples, edge-case handling (multi-file steps, rename detection), and sample webhook payload handling.
  - Required version pin: Reference chosen glob/pathspec doc.

- Path: /docs/official-docs/EPIC-F/step-persistence-contract.md
  - Purpose: Define LabSession metadata keys and types, optional repo-side artifact format (if used), and example persistence API payloads for Implementer.
  - Exact knowledge to add: Required fields (labSessionId, stepKey, completedAt, commitSha, actorId), types, TTL semantics (if any), and idempotency guarantees.
  - Required version pin: N/A (internal contract)


### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Persistence location: Confirm whether step completion state must be stored in LabSession metadata only, in the repository (commit-tagged artifact), or both.
- Enforcement surface: Confirm whether blocking is required at push time (webhook + force-reject pattern), PR/merge time (required checks/branch protection), or CI-time (checks run and block merge).
- TTL semantics: Should completed steps expire (e.g., transient student sessions)? If yes, provide TTL format and renewal criteria.
- Multi-repo workflows: Will steps ever span multiple repos? If so, describe orchestration and consistency requirements.


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F10 — Step-Based Lab Support
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for `.forgea/steps.json`, mapping rules, and blocking criteria.
```

MASTER REGISTRY CHANGES: The file `/docs/official-docs-registry.md` must be appended with JSON Schema and Git Provider webhook/checks entries (see registry update step).
