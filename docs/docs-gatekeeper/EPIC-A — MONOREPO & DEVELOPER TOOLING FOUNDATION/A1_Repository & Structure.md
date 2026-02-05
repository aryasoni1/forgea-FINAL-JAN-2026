# FEATURE DOCS BRIEF — A1_Repository & Structure

## FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A1 — Repository & Structure
- Inputs reviewed:
  - /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md
  - /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md
  - /docs/official-docs-registry.md
  - /docs/master_docs.md
  - /forgea-monorepo/package.json

## REQUIRED OFFICIAL DOCUMENTATION

For each item below: Technology • Concept • Official source • Exact version requirement • Why required • Decision it informs • What can go wrong without it.

- Technology: pnpm
  - Concept: Workspaces and package discovery
  - Official source: https://pnpm.io/workspaces
  - Exact version requirement: 10.28.1 (matches `packageManager` in repo)
  - Why required: Tools must agree on workspace discovery semantics to keep installs/builds deterministic.
  - Decision it informs: Whether to align `pnpm-workspace.yaml` with `package.json` `workspaces` and how CI installs run.
  - What can go wrong: Divergent workspace lists cause missing packages in CI, broken hoisting, and inconsistent builds.

- Technology: TypeScript
  - Concept: Project references, `tsconfig` `paths`, and `include` semantics
  - Official source: https://www.typescriptlang.org/docs/handbook/project-references.html
  - Exact version requirement: 5.9.3 (matches `devDependencies`)
  - Why required: Clarifies correct `tsconfig` layout for monorepo and path mappings.
  - Decision it informs: Whether `apps/` must be included in the root `tsconfig`, and how to structure references.
  - What can go wrong: Editor/compile inconsistencies, missing path mappings, or unexpected type-checking gaps.

- Technology: Turborepo
  - Concept: Pipeline definitions, caching, and `turbo.json` semantics
  - Official source: https://turborepo.org/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Repo currently uses `turbo: "latest"` in `devDependencies`; an explicit version is needed for reproducible pipeline behavior.
  - Decision it informs: Which `turbo` features and cache behaviors are available and safe to rely on.
  - What can go wrong: Different `turbo` releases change pipeline behavior causing CI/build regressions.

- Technology: ESLint (Boundary enforcement plugin)
  - Concept: Enforcing import boundaries (e.g., no cross-app imports)
  - Official source: (plugin docs to be chosen by Planner; example: https://github.com/bryanrsmith/eslint-plugin-boundaries)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Import-boundary enforcement must be sourced from a specific plugin/version to write deterministic rules and tests.
  - Decision it informs: Which rule set to adopt (plugin vs custom rule), how to configure ignores and allowed exceptions.
  - What can go wrong: Installing different plugin versions or using ad-hoc rules leads to rule drift and inconsistent enforcement.

- Technology: Git / .gitignore
  - Concept: Recommended repository initialization and `.gitignore` templates for Node/Turbo/IDE files
  - Official source: https://git-scm.com/docs and https://www.toptal.com/developers/gitignore (or gitignore.io)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides canonical guidance for ignore patterns and repository hygiene.
  - Decision it informs: `.gitignore` content and any repository-level Git hooks or attributes.
  - What can go wrong: Missing or incorrect ignores leak secrets or large artifacts into commits or caches.

- Technology: GitHub CODEOWNERS
  - Concept: File/folder ownership and automatic reviewer assignment
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/about-code-owners
  - Exact version requirement: N/A
  - Why required: To map ownership and enable branch protection rules and required reviewers.
  - Decision it informs: Where and how to place `CODEOWNERS` and which teams/users to assign.
  - What can go wrong: Undefined ownership leads to accidental changes without proper review.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/official-docs-registry.md — pnpm entry (10.28.1) — SUFFICIENT (pnpm pinned).
- /docs/official-docs-registry.md — TypeScript 5.9.3 entry — SUFFICIENT.
- /docs/official-docs-registry.md — Turborepo entry exists but marked VERSION UNKNOWN — INSUFFICIENT (must pin exact version).
- /docs/official-docs-registry.md — ESLint boundary enforcement plugin referenced but VERSION UNKNOWN — INSUFFICIENT.
- No repo-level internal doc describing repository boundaries, CODEOWNERS, or canonical `.gitignore` located — MISSING / INSUFFICIENT.

## STUDY GUIDE FOR HUMAN

- `pnpm` Workspaces:
  - Why it exists: Deterministic package install and hoisting across monorepos.
  - Alternatives: Yarn Workspaces, npm workspaces — reasons to prefer pnpm: disk efficiency and strictness.
  - When NOT to use: Small single-package repos where workspace overhead adds complexity.
  - Common mistakes: Mismatched workspace lists between `pnpm-workspace.yaml` and `package.json`.

- TypeScript Project References:
  - Why: Scales type-checking across multiple packages and enables incremental builds.
  - Alternatives: Single root `tsconfig` with `paths`; local bundling without references.
  - When NOT to use: Small repos where build complexity outweighs benefits.
  - Common mistakes: Forgetting to include all projects in `references` or mixing incompatible TS versions.

- Turborepo:
  - Why: Orchestrates pipeline tasks and provides remote/local caching for fast CI.
  - Alternatives: Nx, custom CI scripts. Choose Turborepo when caching and task pipelining matter.
  - When NOT to use: Very small repos or when custom CI integrates tightly and caching isn't beneficial.
  - Common mistakes: Using `latest` in deps (causes drift); not pinning versions; relying on features absent in pinned version.

- ESLint Boundary Enforcement:
  - Why: Automated enforcement of import boundaries reduces accidental coupling.
  - Alternatives: Custom TypeScript compiler checks, review process, or tooling like `depcruise`.
  - When NOT to use: When teams prefer runtime-module isolation validated by CI instead of static rules.
  - Common mistakes: Overbroad rules that block legitimate shared utility imports; not adding explicit allowed exceptions.

- CODEOWNERS:
  - Why: Automates reviewer assignment and supports protected-branch workflows.
  - Alternatives: Manual reviewer assignment via PR templates.
  - When NOT to use: Very small teams; but still recommended for scaling.
  - Common mistakes: Overly granular patterns that exclude files unintentionally; missing team aliases.

## INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/pnpm-workspaces.md
  - Purpose: Capture pnpm@10.28.1 workspace discovery, `pnpm-workspace.yaml` vs `package.json` behavior, and CI install recommendations.
  - Must capture: exact CLI commands, `pnpm-workspace.yaml` schema, and troubleshooting when workspace lists diverge.

- Path: /docs/official-docs/turborepo.md
  - Purpose: Pin the Turborepo version and document `turbo.json` features used by this repo.
  - Must capture: pinned `turbo` version, caching semantics, `pipeline` definitions used, and upgrade guidance.

- Path: /docs/official-docs/eslint-boundaries.md
  - Purpose: Select and pin an ESLint plugin for boundary enforcement and document rule configuration.
  - Must capture: chosen plugin name + version, recommended rule config, allowed exceptions, and how to test rules locally/CI.

- Path: /docs/official-docs/git-and-gitignore.md
  - Purpose: Document Git init best practices and canonical `.gitignore` templates for this monorepo.
  - Must capture: recommended patterns, Git LFS guidance (if applicable), and pre-commit hook recommendations.

- Path: /docs/official-docs/repo-boundaries.md
  - Purpose: Central policy doc defining "no cross-app imports", ownership, and enforcement mapping to tooling.
  - Must capture: policy statement, allowed exceptions, mapping to ESLint rules, CODEOWNERS guidance, and verification checks.

## OPEN QUESTIONS / AMBIGUITIES

- Should `services/*` be added to `/forgea-monorepo/pnpm-workspace.yaml` to match `package.json` `workspaces` (code-scout found a divergence)?
- Are `apps/` intentionally excluded from the root `tsconfig.json` `include`, or should they be added for unified path mapping?
- Desired location/format for repository-level `README.md`, `CONTRIBUTING.md`, and `CODEOWNERS` (root `/forgea-monorepo/` recommended).
- Which specific ESLint boundary plugin (and exact version) should be adopted — Planner must select and pin.

## MASTER DOCS REGISTRY ACTION

Add the following entries to `/docs/master_docs.md` (required/added):

- /docs/official-docs/turborepo.md — Status: REQUIRED — Epic/Feature: EPIC-A / A1 — Reason: Pin Turborepo version; repo uses `turbo: "latest"`.
- /docs/official-docs/eslint-boundaries.md — Status: REQUIRED — Epic/Feature: EPIC-A / A1 — Reason: Define and pin ESLint boundary plugin + config to enforce no-cross-app imports.
- /docs/official-docs/repo-boundaries.md — Status: REQUIRED — Epic/Feature: EPIC-A / A1 — Reason: Central policy for repository boundaries and ownership.

---

End of Docs Gatekeeper brief for Feature A1.
