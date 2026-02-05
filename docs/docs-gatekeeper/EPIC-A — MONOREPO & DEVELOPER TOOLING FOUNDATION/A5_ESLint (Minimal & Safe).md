### FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A5 — ESLint (Minimal & Safe)
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md
  - /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md
  - /docs/tasks/master_tasks_V1/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION.MD
  - /docs/master_docs.md
  - /docs/official-docs-registry.md
  - /docs/official-docs/eslint-boundaries.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: ESLint (core)
  - Concept: Base configuration, rule semantics, and ignore files
  - Official source: https://eslint.org/docs/latest
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Authoritative reference for rule names, configuration formats (Flat vs legacy), and ignore-file behavior; needed to produce a stable, reproducible linting setup across developer machines and CI.
  - Decision it informs: Which ESLint major/minor to target, whether to use flat config or legacy `.eslintrc.*`, and exact rule availability/semantics.
  - What can go wrong without it: Incompatible config formats, mismatched rule behavior across environments, and unrepeatable CI runs.

- Technology: eslint-plugin-boundaries (architectural enforcement)
  - Concept: Import/boundary enforcement rules (no-cross-app imports)
  - Official source: https://github.com/bryanrsmith/eslint-plugin-boundaries
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Plugin provides the guarded rules to enforce repo-level import boundaries; version pinning required to ensure rule behavior is stable.
  - Decision it informs: Which plugin version to adopt and how to author the root ESLint config to enforce architectural boundaries.
  - What can go wrong without it: Rule drift, inconsistent enforcement, and potential accidental cross-app imports escaping review.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md
  - Coverage status: PARTIAL
  - What is missing: Observational findings only (missing canonical remediation steps, version pins, and where the shared config will be hosted).

- /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md
  - Coverage status: SUFFICIENT (orchestration metadata for agent handoff)

- /docs/official-docs/eslint-boundaries.md
  - Coverage status: PARTIAL
  - What is missing: External version pins for `eslint` and `eslint-plugin-boundaries`; CI checklist snippets and explicit examples for shared config packaging.

- /docs/tasks/master_tasks_V1/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION.MD
  - Coverage status: SUFFICIENT (task list and acceptance criteria reference ESLint tasks)

### NO NEW DOCS REQUIRED

- Not applicable — some internal docs exist but need extension with pinned versions and CI guidance.

### STUDY GUIDE FOR HUMAN

- ESLint core:
  - Why it exists: Finds syntactic and stylistic problems early and enforces project conventions.
  - Alternatives: TypeScript compiler checks, standalone static analysis tools — they do not replace ESLint's rule ecosystem for import/architecture enforcement.
  - When NOT to use it: Do not rely solely on ESLint for runtime or security checks; use it for author-time enforcement.
  - Common mistakes: Leaving `eslint` unpinned, mixing Flat Config and legacy `.eslintrc.*` formats, and installing `eslint` only in subpackages (causes CI inconsistencies).

- eslint-plugin-boundaries:
  - Why it exists: Enforces architectural import boundaries programmatically.
  - Alternatives: `eslint-plugin-import` (import correctness only) or TypeScript path checks; plugin-boundaries is preferred for architecture rules.
  - When NOT to use it: If you prefer policy enforcement through code review only (riskier). Avoid if team cannot maintain plugin configuration.
  - Common mistakes: Not pinning plugin versions, unclear zone definitions, or placing config in multiple places causing conflicts.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/eslint-boundaries.md
  - Purpose: Extend existing document to include exact pinned versions for `eslint` and `eslint-plugin-boundaries`, CI examples, and a sample root `eslint.config.*` (or `eslint.config.js`) for this repo.
  - Exact knowledge to capture: pinned versions, which config format to use (Flat vs legacy), how to host shared config in `packages/config`, and CI job examples using `pnpm install --frozen-lockfile` + `pnpm turbo run lint`.
  - Required version pin: ESLint — VERSION UNKNOWN; eslint-plugin-boundaries — VERSION UNKNOWN (both MUST be pinned before implementation).

- Path: /docs/official-docs/eslint-ci-guidelines.md
  - Purpose: CI-level lint enforcement: fail-fast on lint errors, use `pnpm install --frozen-lockfile`, and ensure `eslint` is installed at workspace root or via shared `@forgea/config` package.
  - Exact knowledge to capture: CI commands, failure semantics, caching considerations, and remediation steps for `eslint: command not found` scenarios.
  - Required version pin: ESLint — VERSION UNKNOWN

### OPEN QUESTIONS / AMBIGUITIES

- Confirm canonical host for shared ESLint config: `packages/config` is advertised but currently contains no exported ESLint config — Planner must confirm.
- Confirm whether repo will adopt ESLint Flat Config or legacy `.eslintrc.*` format (impacts how shared config is authored).
- Exact version pins for `eslint` and `eslint-plugin-boundaries` are missing and MUST be chosen before implementation.

### MASTER DOCS REGISTRY ACTION (MANDATORY)

Append the following entries to `/docs/master_docs.md`:

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A5 — ESLint (Minimal & Safe)
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief verifying required ESLint docs and listing required internal doc extensions.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A5 — ESLint (Minimal & Safe)
  - Doc path: /docs/official-docs/eslint-ci-guidelines.md
  - Status: REQUIRED
  - Reason: CI guidance required to avoid `eslint: command not found` and enforce frozen installs for lint jobs.
