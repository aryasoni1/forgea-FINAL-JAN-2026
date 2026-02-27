### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D7 — Validation & Review
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema (validation)
   - Concept: Schema-driven validation for structural correctness
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Machine-checkable invariants referenced by validation rules.
   - Decision it informs: Which validation keywords are available to QA checks.
   - What breaks without it: Inconsistent validation and differing validator behaviors.

2. Technology: Test frameworks (unit + E2E)
   - Concept: Recommended testing runtimes and E2E tooling
   - Official sources: https://vitest.dev/ or https://jestjs.io/ and https://playwright.dev/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how automated quality checks and E2E review flows will be executed in CI.
   - Decision it informs: Test harness choices for QA checks and CI gating.
   - What breaks without it: Non-deterministic test results and CI incompatibilities.

3. Technology: CI platform guidance
   - Concept: GitHub Actions / Turborepo CI runner pins and Node images
   - Official source: https://docs.github.com/en/actions
   - Exact version requirement: Node.js 20.x (see registry) and pinned action runners — MUST BE PINNED
   - Why required: Ensures QA checks run identically in PRs.
   - What breaks without it: Flaky CI and mismatched local/CI behavior.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - Coverage status: PARTIAL
  - Exact gaps: Describes agents and execution plan but lacks locked validation rules, acceptance criteria, and review SOP.

- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists D7 tasks (39–44) but contains no machine-checkable invariants or QA scope.

- /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing planner deliverables and integration artifacts but is not a locked spec.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to add/extend: `/docs/official-docs/EPIC-D/validation-and-review.md` (new), `/docs/official-docs/EPIC-D/validation-ci.md` (new), and `/docs/official-docs/EPIC-D/reviewer-sop.md` (new).

### STUDY GUIDE FOR HUMAN

- Validation rules: Why — enforce minimum structural and semantic quality; Alternatives — runtime heuristics only (weaker); When NOT to use — for exploratory drafts without lock; Common mistakes — allowing empty sections, ignoring source grounding.
- Acceptance criteria: Why — deterministic gate for LOCKED state; Alternatives — subjective human-only checks; When NOT to use — early drafts; Common mistakes — overly permissive thresholds or missing source coverage checks.
- Partial regeneration: Why — reduce rework and preserve approvals; Alternatives — full regen; When NOT to use — when metadata or review flags would be lost; Common mistakes — losing provenance or resetting review flags.

### INTERNAL DOCS TO ADD OR EXTEND

Place these under `/docs/official-docs/EPIC-D/`.

- Path: /docs/official-docs/EPIC-D/validation-and-review.md
  - Purpose: Locked validation rules, invariants, acceptance criteria for LOCKED lessons, and mapping to EPIC tasks D7 (39–44).
  - Exact knowledge to add: Machine-checkable invariants (completeness, difficulty enum alignment, lab linkage presence, source grounding %), acceptance criteria thresholds, and example pass/fail cases.
  - Required version pin: Test framework / Node / JSON Schema — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Path: /docs/official-docs/EPIC-D/validation-ci.md
  - Purpose: CI steps to run validation and QA checks on PRs, including sample GitHub Actions steps, failure semantics, and remediation guidance.
  - Exact knowledge to add: Commands for `ajv`/test runner execution, Node image pin, and gating criteria for PR merges.
  - Required version pin: CI runner / Node / test runner versions — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Path: /docs/official-docs/EPIC-D/reviewer-sop.md
  - Purpose: Human reviewer Standard Operating Procedure and short checklist template for LOCK decisions.
  - Exact knowledge to add: One-page checklist, example annotations, and change-log entry format for documenter-historian.
  - Required version pin: n/a

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- What are the exact machine-checkable thresholds for acceptance (e.g., minimum sections, minimum grounded sources %, max missing-section count)? (required)
- Which test frameworks and Node image will CI use (Vitest/Jest/Playwright, Node 20.x)? (required)
- Is partial regeneration allowed to re-run schema-level enrichment that may change IDs or versioning? (policy blocker)
- Are review approvals stored with lessons in DB and preserved across partial regenerations? (integration blocker)

### MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D7 — Validation & Review
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief listing required official docs, missing planner deliverables, and registry actions for validation & review.

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D7 — Validation & Review
  - Doc path: /docs/official-docs/EPIC-D/validation-and-review.md
  - Status: REQUIRED
  - Reason: Locked validation rules and acceptance criteria must be published before implementation.

---

End of Docs Gatekeeper brief for EPIC-D / D7.
