FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I8 — Configuration & Policy
- Exact input files read:
  - /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8_Configuration*&\_Policy.md
  - /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8*Configuration*&\_Policy.md
  - /docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/task-I8-2026-02-14.md

---

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema (configuration validation)
   - Concept: Defining and validating configuration schema for defaults and per-lab overrides.
   - Official source: https://json-schema.org/
   - Exact version requirement: 2020-12
   - Why required: Provides a standard, machine-verifiable schema format for config files, automated validation, and generation of helpful error messages.
   - What decision it informs: Field types, allowed ranges, canonical validation rules, and migration compatibility checks.
   - What breaks without it: Incompatible or ambiguous validation rules, brittle parsing logic, inconsistent enforcement across services.

2. Technology: Semantic Versioning (schema & config versioning)
   - Concept: Versioning configuration schema and defaults for safe migrations and rollback.
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Establishes compatibility guarantees and upgrade rules for default/migration flows.
   - What decision it informs: When to treat a change as breaking (major) vs additive (minor/patch) and migration rollout procedures.
   - What breaks without it: Silent incompatible changes, inability to automate safe rollouts/rollbacks.

3. Technology: JSON Patch (RFC 6902) — migrations and diffs
   - Concept: Expressing migration steps and safe, replayable config updates.
   - Official source: https://tools.ietf.org/html/rfc6902
   - Exact version requirement: RFC 6902 (stable)
   - Why required: Provides a standard format for applying, auditing, and rolling back incremental config changes.
   - What decision it informs: How to structure migration payloads and rollback semantics.
   - What breaks without it: Custom ad-hoc migrations that are harder to audit and revert.

---

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8_Configuration*&\_Policy.md
  - Coverage status: PARTIAL
  - Exact gaps: No planner-approved schema; no `defaults.json` example; lacks migration guidance and acceptance criteria.

- /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8*Configuration*&\_Policy.md
  - Coverage status: PARTIAL
  - Exact gaps: Analysis and gaps enumerated, but no canonical config schema or override semantics; missing QA test cases.

- /docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/task-I8-2026-02-14.md
  - Coverage status: PARTIAL
  - Exact gaps: Task skeleton added but not approved; missing explicit sign-off requirements, audit fields, and repository paths.

---

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8_Configuration*&\_Policy.md — add planner-approved schema and migration guidance.
  - /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8*Configuration*&\_Policy.md — add verified `defaults.json` example and QA acceptance criteria.
  - /docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/task-I8-2026-02-14.md — add approvers list, audit requirements, and exact repository paths for artifacts.
  - Add a new official-doc under `/docs/official-docs/epic-i-config/` named `I8_defaults_and_migrations.md` containing `defaults.json` examples, migration playbooks, and rollback instructions.

---

STUDY GUIDE FOR HUMAN

- JSON Schema (2020-12):
  - Why this exists: Standard, widely supported format for describing valid configuration structure and constraints.
  - Why alternatives exist: Simpler ad-hoc validation or custom validators may be lighter-weight but lack tooling and ecosystem support.
  - When NOT to use it: Extremely small configs where schema overhead slows iteration; use only when config size/complexity justifies toolchain.
  - Common mistakes: Allowing overly permissive types, missing numeric limits, not anchoring required fields, and not versioning the schema.

- Semantic Versioning (2.0.0):
  - Why this exists: Clear contract for compatibility; defines when automated migration is required.
  - Why alternatives exist: Date-based or commit-hash versioning can be simpler for internal-only artifacts.
  - When NOT to use it: When schema changes are ephemeral and never released across deployments (rare).
  - Common mistakes: Treating minor changes as non-breaking when they add required fields, failing to increment major on breaking changes.

- JSON Patch (RFC 6902):
  - Why this exists: Expresses small, auditable deltas and supports replay/rollback.
  - Why alternatives exist: Full-file replacement for simplicity, but less auditability.
  - When NOT to use it: When migrations are simple full-file replaces with no per-field intent.
  - Common mistakes: Applying patches without validation, not keeping reverse patches for rollback.

---

INTERNAL DOCS TO ADD OR EXTEND

(These should be created under `/docs/official-docs/`)

1. /docs/official-docs/epic-i-config/I8_defaults_and_migrations.md
   - Purpose: Canonical `defaults.json` reference, migration playbooks, and rollback steps.
   - Exact knowledge to add:
     - `defaults.json` example matching the JSON Schema (full example with comments/annotations).
     - Migration playbook templates using JSON Patch and safe rollout steps.
     - Rollback procedure (reverse-patch) and verification checks.
   - Required version pin: JSON Schema 2020-12, SemVer 2.0.0

2. /docs/official-docs/epic-i-config/I8_override_semantics.md
   - Purpose: Per-lab override semantics, precedence, storage options (file, DB, admin UI), and security considerations.
   - Exact knowledge to add:
     - Where override files live (repo path and runtime path), sample API for admin UI overrides, DB schema for persisted overrides.
     - Precedence algorithm (system defaults < global org overrides < lab-level overrides < ephemeral session overrides).
     - Access control and audit logging requirements.
   - Required version pin: JSON Schema 2020-12

---

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Confirm which storage mechanism is canonical for per-lab overrides: git-backed repo, database (Postgres), or Admin UI (and whether it must be replicated to disk).
- Confirm who is the `planner-architect` approver and `security-sentinel` reviewer (names/roles) to list in sign-off section.
- Confirm whether `fail-closed` or `fail-open` should be default for each policy category (we recommend fail-closed for HARD LOCK policies; see acceptance criteria below).

---

MASTER DOCS REGISTRY ACTION

Append the following single entry to `/docs/master_docs.md`:

- EPIC-I — I8 Configuration & Policy: docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I8*Configuration*&\_Policy.md

---

This file is the gatekeeper brief for the feature. It identifies required official docs, which internal docs to extend, and the exact registry append entry.
