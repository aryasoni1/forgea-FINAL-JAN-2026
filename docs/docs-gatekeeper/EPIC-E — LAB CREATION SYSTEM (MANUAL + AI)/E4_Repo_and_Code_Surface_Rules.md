## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E4 — Repo and Code Surface Rules
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E4_Repo_and_Code_Surface_Rules.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For each required concept below: technology, concept, official source, exact version requirement, why required, decision it informs, and what breaks without it.

- **Technology:** Repository Boundaries
  - **Concept:** Canonical repo & package boundary policy (ownership, locked vs editable paths)
  - **Official source:** /docs/official-docs/repo-boundaries.md (internal)
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Defines which paths are considered core IP vs user-editable surface; needed to author forbidden-path globs.
  - **Decision it informs:** What to lock in templates, enforcement scope, package-level vs repo-wide rules.
  - **What breaks without it:** Inconsistent enforcement, accidental exposure or edits to core IP.

- **Technology:** Build & Orchestration (Turborepo)
  - **Concept:** Pipeline conventions and CI job names influencing enforcement placement
  - **Official source:** https://turborepo.org/docs (referenced in registry)
  - **Exact version requirement:** 2.1.x (registry lists Turborepo 2.1.x)
  - **Why required:** CI job names and pipeline layout inform where checks run (pre-merge, post-merge), and where scaffolders execute.
  - **Decision it informs:** CI enforcement placement and how scaffolding scripts must be constrained.
  - **What breaks without it:** Enforcement may be bypassed by CI or scaffolding tasks.

- **Technology:** Package Manager (pnpm)
  - **Concept:** Workspace discovery and install semantics
  - **Official source:** https://pnpm.io/
  - **Exact version requirement:** 10.4.x (registry)
  - **Why required:** Determines workspace-scoped enforcement tooling installation and canonical hook execution points.
  - **Decision it informs:** Whether rules apply per-package or repo-wide and how to run checks in CI.
  - **What breaks without it:** Non-deterministic installs or missing enforcement in some workspaces.

- **Technology:** Linting / Import Boundaries (ESLint + plugin)
  - **Concept:** Enforce import and edit boundaries using lint rules
  - **Official source:** https://eslint.org/ and https://github.com/bryanrsmith/eslint-plugin-boundaries
  - **Exact version requirement:** ESLint 9.39.x; eslint-plugin-boundaries 4.2.x (registry)
  - **Why required:** Lint rules are a primary enforcement mechanism preventing forbidden edits and cross-package leakage.
  - **Decision it informs:** Choice of enforcement (lint vs hooks vs CI vs central service).
  - **What breaks without it:** No reliable static prevention of imports or edits; more runtime or review-time failures.

- **Technology:** Git & CI Hooking
  - **Concept:** Pre-commit / pre-receive / CI hook framework (how to block forbidden edits at commit/push/merge)
  - **Official source:** VERSION UNKNOWN — MUST BE PINNED (examples: pre-commit, lint-staged, server-side hooks)
  - **Exact version requirement:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Needed to implement actionable enforcement (local + server) that cannot be bypassed by simple edits.
  - **Decision it informs:** Which hook framework to require and how implementers will integrate checks.
  - **What breaks without it:** Enforcement will be advisory only, easily bypassed.

### EXISTING INTERNAL DOCS (VERIFIED)

For each relevant internal doc: path, coverage status, exact gaps.

- Doc path: /docs/official-docs/repo-boundaries.md
  - Coverage status: PARTIAL
  - Exact gaps: Version pin missing; does not list locked vs editable globs or canonical base lab repo template location.

- Doc path: /docs/official-docs/EPIC-A/turborepo.md
  - Coverage status: SUFFICIENT (for Turborepo version & pipeline conventions)
  - Exact gaps: None critical for E4; pipelines referenced but CI job names for lab scaffolding not explicitly enumerated.

- Doc path: /docs/official-docs/EPIC-A/pnpm-workspace-policy.md
  - Coverage status: PARTIAL
  - Exact gaps: Workspace hook recommendations and per-package enforcement guidance missing.

- Doc path: /docs/official-docs/EPIC-A/eslint-boundaries.md
  - Coverage status: PARTIAL
  - Exact gaps: Lacks concrete rule examples for forbidding edits to CI, test harnesses, scaffolding scripts, and does not include glob examples.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- /docs/official-docs/repo-boundaries.md — must include canonical base lab repo location, explicit locked vs editable globs, and whether rules are per-package or repo-wide.
- /docs/official-docs/EPIC-A/pnpm-workspace-policy.md — add hook integration guidance and CI invocation patterns for enforcement.
- /docs/official-docs/EPIC-A/eslint-boundaries.md — include forbidden-path lint rule examples and sample globs for core IP, CI, test harnesses, and scaffolding.

### STUDY GUIDE FOR HUMAN

- **Repo Boundaries:** Why — to separate core IP from user-editable surfaces. Alternatives — per-package vs repo-wide enforcement. When NOT to use — small one-off repos where team trust is sufficient. Mistakes — relying solely on reviews instead of automated checks.

- **Central Path-Policy Service:** Why — single source of truth for globs and enforcement. Alternatives — per-package lint configs or monorepo shared config. When NOT to use — when overhead outweighs benefits for tiny repos. Mistakes — not versioning the policy or not exposing machine-readable manifest.

- **Lint vs Hooks vs CI:** Why — lint is good for static prevention, hooks for local blocking, CI for authoritative enforcement. Alternatives — server-side pre-receive hooks. When NOT to use a single mechanism — when that mechanism can be bypassed. Mistakes — implementing only client-side hooks without server/CI backups.

- **Forbidden-Path Globs:** Why — precise blocking to protect core IP. Alternatives — file markers (e.g., LOCKED: true in manifest). When NOT to use globs — when content is dynamic and requires semantic checks. Mistakes — overly-broad globs that block user surfaces or too-narrow globs that miss edge cases.

### INTERNAL DOCS TO ADD OR EXTEND

Only include where coverage is PARTIAL or MISSING.

- Canonical path: /docs/official-docs/EPIC-E/repo-code-surface-policy.md
  - Purpose: The canonical manifest listing the base lab repo template location, locked vs editable globs, forbidden-path examples, and sample enforcement rule snippets (ESLint rule JSON, pre-commit samples, CI job examples).
  - Exact knowledge to add: absolute base repo path, explicit glob list for locked paths, example deny globs for CI/config/test/scaffold, manifest format, how per-package vs repo-wide rules apply, recommended hook frameworks and CI job names.
  - Required version pin: N/A (document must include pinned versions for referenced tools such as Turborepo/pnpm/ESLint/hook frameworks)

- Extend: /docs/official-docs/repo-boundaries.md
  - Purpose: Add the E4-specific locked vs editable examples, glob patterns, and decision table for per-package vs repo-wide rules.
  - Exact knowledge to add: concrete globs, examples for package layouts in this monorepo.
  - Required version pin: N/A

- Extend: /docs/official-docs/EPIC-A/eslint-boundaries.md
  - Purpose: Add example ESLint rule configurations to forbid edits (with `no-restricted-syntax` or custom rules) and sample `eslint-plugin-boundaries` configs to enforce import boundaries.
  - Exact knowledge to add: rule JSON snippets, CI invocation snippet, false-positive avoidance notes.
  - Required version pin: reference ESLint 9.39.x and eslint-plugin-boundaries 4.2.x

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- What is the canonical base lab repository/template path? (Required — Planner/Architect) — BLOCKER
- Which CI job names and workflows run scaffolding or lab-push operations that must be covered? (Required) — BLOCKER
- Which hook framework do implementers prefer (server-side pre-receive, `pre-commit` + `pre-push`, or CI-only enforcement)? (Required for implementer constraints)

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E4 — Repo and Code Surface Rules
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E4_Repo_and_Code_Surface_Rules.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for repo path policies and enforcement.
