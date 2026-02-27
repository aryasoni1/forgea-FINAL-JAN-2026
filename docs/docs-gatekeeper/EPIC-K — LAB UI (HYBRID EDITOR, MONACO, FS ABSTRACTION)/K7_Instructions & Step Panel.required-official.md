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
