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

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: pnpm
  - Concept: Workspaces (workspace discovery, `pnpm-workspace.yaml`, `packageManager` field semantics)
  - Official source: https://pnpm.io/workspaces
  - Exact version requirement: 10.28.1
  - Why required: Defines canonical workspace membership, install and hoisting semantics, and how `pnpm-workspace.yaml` and `package.json` must be aligned for deterministic installs.
  - Decision it informs: Which file is authoritative for workspace membership, CI install rules (frozen lockfile), and the exact `packageManager` pin to require in `package.json`.
  - What can go wrong without it: Unpinned or mismatched pnpm versions cause workspace resolution differences, registry vs local package resolution, lockfile drift, and CI failures.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/pnpm-workspace-policy.md
  - Purpose: Canonical policy describing authoritative workspace membership, how to author `pnpm-workspace.yaml`, and the remediation steps when discovery mismatches occur.
  - Exact knowledge to capture: required globs for `apps/*`,`packages/*`,`services/*`; which file is authoritative; CI checks (frozen-lockfile); required `pnpm` pin and Corepack enforcement; example fix steps and verification commands.
  - Required version pin: pnpm 10.28.1

- Path: /docs/official-docs/pnpm-ci-guidelines.md
  - Purpose: CI-level guidance to enforce deterministic installs and prevent lockfile/drift issues.
  - Exact knowledge to capture: use of `pnpm install --frozen-lockfile`, Node/pnpm runtime checks, CI job examples (failure behavior), and remediation steps for lockfile mismatches.
  - Required version pin: pnpm 10.28.1

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: pnpm
   - Concept: Workspaces activation and `pnpm-workspace.yaml` semantics (workspace membership, glob rules, inclusion/exclusion)
   - Official source: https://pnpm.io/workspaces (pnpm official docs)
   - Exact version requirement: 10.28.1 (must match `packageManager` in repository root `package.json`)
   - Why required: Determines which folders are treated as local workspace packages and how pnpm links and hoists dependencies. Correct workspace discovery is critical before making changes to workspace topology.
   - Decision it informs: Whether to add `services/*` to `pnpm-workspace.yaml` or remove it from `package.json.workspaces`; how CI and local installs must be configured.
   - What can go wrong without it: Packages may be resolved from the registry instead of linked locally, producing different dependency graphs locally vs CI, duplicate installs, and build/runtime mismatches.

2. Technology: pnpm / Corepack / packageManager field
   - Concept: `packageManager` field in `package.json` and Corepack enforcement for reproducible installs
   - Official sources: pnpm docs referencing Corepack (https://pnpm.io) and Node.js Corepack documentation (https://nodejs.org/api/corepack.html)
   - Exact version requirement: `pnpm@10.28.1` (must be enforced via `packageManager` and Corepack in CI/developer envs)
   - Why required: Ensures everyone uses the same pnpm resolver and lockfile format; Corepack uses `packageManager` to select the correct pnpm binary.
   - Decision it informs: Pinning policy for pnpm in CI, dev machines, and any automation (e.g., GitHub Actions). Requirement to use `pnpm install --frozen-lockfile` in CI.
   - What can go wrong without it: Lockfile drift, non-reproducible installs, CI failures, and subtle dependency resolution differences across machines.

3. Technology: package.json `workspaces` vs pnpm-workspace.yaml (policy)
   - Concept: Authoritative workspace declaration and how CI/packagers interpret workspace lists
   - Official source: pnpm workspaces docs (https://pnpm.io/workspaces)
   - Exact version requirement: Refer to pnpm@10.28.1
   - Why required: Clarifies that `pnpm-workspace.yaml` is authoritative and that `package.json.workspaces` must not contradict it.
   - Decision it informs: Which manifest is the source-of-truth and how to correct the observed mismatch.
   - What can go wrong without it: Divergent workspace definitions, missing packages in the workspace graph, or unexpected registry fetches.

Notes about missing versioned docs:

- Node / Corepack version used by contributors is not present in the repository (no `.nvmrc` / `.node-version` detected). Node/Corepack version requirements are therefore VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION. Pin the Node version (e.g., `.nvmrc` or `engines`) before making irreversible CI/tooling changes.

INTERNAL DOCS TO ADD OR EXTEND

- Doc path: /docs/official-docs/pnpm-workspace-policy.md
  - Purpose: Authoritative org policy that states: (1) `pnpm-workspace.yaml` is the source-of-truth, (2) required globs for `apps/`, `packages/`, and `services/`, (3) CI install commands and `--frozen-lockfile` requirement, and (4) remediation steps when a mismatch is detected.
  - Must capture: exact pinned `pnpm` version (`10.28.1`), explicit example CI snippet to enable Corepack and run `pnpm install --frozen-lockfile`, and a prescriptive decision (add `services/*` to `pnpm-workspace.yaml` OR remove it from `package.json.workspaces`).

- Doc path: /docs/official-docs/pnpm-ci-guidelines.md
  - Purpose: Step-by-step CI configuration for enforcing `packageManager` pinning via Corepack, using `pnpm install --frozen-lockfile`, and validating that `pnpm-workspace.yaml` contains expected globs.
  - Must capture: GitHub Actions examples (or CI used by repo), commands to check workspace membership, and automated checks (lint step) that fail the build on mismatch.

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Turborepo — turbo.json schema
   - Concept: `turbo.json` schema and config reference
   - Official source: https://turborepo.org/schema.json
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Ensures `turbo.json` uses supported schema fields and $schema validation; prevents incompatible config fields.
   - Decision it informs: Which `turbo.json` keys are allowed (e.g., `tasks`, `dependsOn`, `outputs`, `cache`).
   - What can go wrong: Using unsupported/removed keys leads to broken pipelines or silent misbehavior.

2. Technology: Turborepo — pipeline configuration
   - Concept: Pipeline/task definitions, `dependsOn`, cross-package propagation
   - Official source: https://turborepo.org/docs/reference/configuration
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Authoritative behaviour for `dependsOn`, `outputs`, and package-level overrides.
   - Decision it informs: How to author canonical root pipelines and permitted package extensions.
   - What can go wrong: Incorrect `dependsOn` semantics can produce incorrect build ordering, flaky artifacts.

3. Technology: Turborepo — caching & cache policies
   - Concept: Local and remote caching, declared outputs, cache inputs, and remote cache compatibilities
   - Official source: https://turborepo.org/docs/core-concepts/caching
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Cache hash semantics and remote cache compatibility are version-sensitive.
   - Decision it informs: Whether remote cache can be shared across CI agents and how to declare outputs/inputs.
   - What can go wrong: Undeclared outputs or mismatched cache formats cause silent cache corruption or missing artifacts.

4. Technology: PNPM Workspaces (context)
   - Concept: Workspace discovery, `packageManager` pin, install/lockfile semantics
   - Official source: https://pnpm.io/workspaces
   - Exact version requirement: 10.28.1 (repo `packageManager` pinned)
   - Why required: Turborepo integration relies on consistent workspace resolution and binary invocation.
   - Decision it informs: How to run `turbo` from workspace root and enforce `packageManager` compatibility in CI.
   - What can go wrong: Mismatched pnpm versions or workspace globs cause differing package graphs and invalid task graphs.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_turborepo_official.md
   - Purpose: Capture the exact Turborepo version chosen, canonical `turbo.json` examples used by this repo, caching policy, remote cache guidance (provider + access), and CI invocation practices.
   - Exact knowledge to capture: pinned `turbo` semver, authoritative schema URL, mapping of `turbo.json` keys to repo conventions, examples for `dependsOn` and `outputs`, remote cache compatibility notes.
   - Required version pin: MUST PIN an exact `turbo` semver BEFORE implementation.

2. Path: /docs/official-docs/pnpm-workspace_policy.md (if not already aligned)
   - Purpose: Ensure `packageManager` and workspace glob conventions are enforced for task-graph determinism.
   - Exact knowledge to capture: `pnpm` version (10.28.1), workspace glob rules, CI frozen-lock instructions.
   - Required version pin: pnpm@10.28.1 (already present in repo)

## REQUIRED OFFICIAL DOCUMENTATION

- **Technology:** Turborepo (Turbo)
  - **Official source:** https://turborepo.org/docs/ and https://turborepo.org/schema.json
  - **Exact version requirement:** VERSION UNKNOWN — `turbo` is listed as `"latest"` in package.json; MUST BE PINNED BEFORE IMPLEMENTATION
  - **Why required:** Pipeline configuration, `dependsOn` semantics, caching behavior, and `outputs` patterns directly affect build correctness and cache safety.
  - **Decision it informs:** Which Turbo release to adopt, pipeline cache rules, and whether pipeline features used are stable/backwards-compatible.
  - **What can go wrong:** Incompatible Turbo releases change pipeline semantics or cache keys and will silently corrupt CI caching or cause incorrect build ordering.

- **Technology:** pnpm Workspaces
  - **Official source:** https://pnpm.io/
  - **Exact version requirement:** pnpm@10.28.1 (pinned in repo root `package.json` via `packageManager` field)
  - **Why required:** Workspace resolution and `pnpm-workspace.yaml` semantics (globs vs package.json workspaces) determine package discovery and linking behavior.
  - **Decision it informs:** Whether to rely on `pnpm-workspace.yaml` or `package.json` `workspaces` as canonical source of truth; hoisting and install reproducibility.
  - **What can go wrong:** Workspace-glob mismatches (e.g., `services/*` present in package.json but missing in pnpm-workspace.yaml) lead to missing packages at install time, CI failures, or surprising dependency duplication.

- **Technology / Concept:** package.json Workspaces (npm / workspace spec)
  - **Official source:** https://docs.npmjs.com/cli/v9/using-npm/workspaces (pin to the npm/Node toolchain used in CI)
  - **Exact version requirement:** VERSION UNKNOWN — Node/npm versions are not pinned in repo; MUST BE SPECIFIED WITH CI target
  - **Why required:** To decide canonical workspace field precedence and to ensure consistent behavior across pnpm and npm clients.
  - **What can go wrong:** Different clients interpret workspaces differently; accidental reliance on a client-specific behavior.

- **Technology:** Next.js build outputs (when `outputs: [".next/**","dist/**"]` are used in pipeline)
  - **Official source:** https://nextjs.org/docs (pin Next.js version used by apps)
  - **Exact version requirement:** VERSION UNKNOWN — Next.js versions must be matched to `outputs` patterns and build artifacts.
  - **Why required:** `outputs` patterns influence Turbo cache behavior; they must reflect actual generated artifact directories.
  - **What can go wrong:** Wrong `outputs` patterns cause cache misses or cache contamination (stale or overly-broad caching).

> Note: If the repository's `turbo` and Node/npm versions cannot be determined from package.json/CI configs, those versions MUST be pinned before making pipeline or policy decisions.

## INTERNAL DOCS TO ADD OR EXTEND

- **/docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_turborepo_official.md**
  - Purpose: Capture pinned `turbo` version, supported Turbo features, pipeline conventions (naming, `dependsOn` rules), and canonical examples used in this monorepo.
  - Must capture: exact `turbo` version to pin, schema.json reference, sample `turbo.json` with explanations of `cache`, `dependsOn`, and `outputs` choices.

- **/docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/pnpm_workspace_policy.md**
  - Purpose: Canonicalize whether `pnpm-workspace.yaml` or `package.json` `workspaces` is the source of truth; document globs and examples including `services/*`.
  - Must capture: recommended workspace layout, how to add new packages, and CI checks to validate workspace globs.

- **/docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/turbo_pipeline_guidelines.md**
  - Purpose: Best-practice conventions for pipeline tasks (build, dev, lint), recommended `outputs` patterns for Next.js and Node packages, and cache invalidation guidance.
  - Must capture: per-app `outputs` examples (.next/** for Next apps, dist/** for libraries), `cache: false` guidance for dev tasks, and how to test pipeline correctness locally.

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: TypeScript — `tsconfig` reference
   - Concept: Root `tsconfig.json` and `tsconfig.base.json` canonical options and schema
   - Official source: https://www.typescriptlang.org/tsconfig
   - Exact version requirement: 5.9.3
   - Why required: Definitive source for compiler options used in the monorepo (e.g., `target`, `module`, `moduleResolution`, `strict`).
   - Decision it informs: Which compiler options are supported and their semantics when choosing `ES2022`, `Bundler` resolution, and `strict` flags.
   - What can go wrong: Misinterpreting option semantics leads to non-deterministic builds, incorrect emitted code, or type-check gaps.

2. Technology: TypeScript — `compilerOptions` & `moduleResolution`
   - Concept: Detailed meanings for `strict`, `noImplicitAny`, `isolatedModules`, `moduleResolution`, and `target`.
   - Official source: https://www.typescriptlang.org/tsconfig#compilerOptions and https://www.typescriptlang.org/tsconfig#moduleResolution
   - Exact version requirement: 5.9.3
   - Why required: To validate that `moduleResolution: "Bundler"` and `target: "ES2022"` behave as assumed for toolchain and bundlers.
   - Decision it informs: Whether `Bundler` resolution is appropriate, and how `isolatedModules`/`jsx` interact with framework build tooling.
   - What can go wrong: Choosing an unsupported `moduleResolution` for target bundler creates runtime import errors or mismatches between build and type-check.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A4_typescript_official.md
   - Purpose: Record pinned TypeScript version (5.9.3), canonical `tsconfig.base.json` rationale, allowed per-package overrides, and migration guidance.
   - Exact knowledge it must capture: pinned TypeScript semver, rationale for `target: ES2022` and `moduleResolution: Bundler`, list of allowed per-package exceptions, CI type-check commands, and recommended `tsserver` settings for editors.
   - Required version pin: TypeScript 5.9.3

2. Path: /docs/official-docs/typescript-tsconfig-guidelines.md
   - Purpose: Quick-reference mapping of `compilerOptions` to engineering decisions (performance, compatibility, and ergonomics).
   - Exact knowledge it must capture: `strict` family implications, `isolatedModules` interactions, `skipLibCheck` trade-offs, `noEmit` usage in apps, and expected interactions with Next.js and bundlers.
   - Required version pin: TypeScript 5.9.3

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

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/eslint-boundaries.md
  - Purpose: Extend existing document to include exact pinned versions for `eslint` and `eslint-plugin-boundaries`, CI examples, and a sample root `eslint.config.*` (or `eslint.config.js`) for this repo.
  - Exact knowledge to capture: pinned versions, which config format to use (Flat vs legacy), how to host shared config in `packages/config`, and CI job examples using `pnpm install --frozen-lockfile` + `pnpm turbo run lint`.
  - Required version pin: ESLint — VERSION UNKNOWN; eslint-plugin-boundaries — VERSION UNKNOWN (both MUST be pinned before implementation).

- Path: /docs/official-docs/eslint-ci-guidelines.md
  - Purpose: CI-level lint enforcement: fail-fast on lint errors, use `pnpm install --frozen-lockfile`, and ensure `eslint` is installed at workspace root or via shared `@forgea/config` package.
  - Exact knowledge to capture: CI commands, failure semantics, caching considerations, and remediation steps for `eslint: command not found` scenarios.
  - Required version pin: ESLint — VERSION UNKNOWN

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prettier
  - Concept: Configuration (`.prettierrc`), ignore rules (`.prettierignore`), and CLI usage
  - Official source: https://prettier.io/docs/en/index.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Authoritative reference for supported configuration options, ignore semantics, and integration points with ESLint; needed to ensure consistent formatting across developer machines and CI.
  - Decision it informs: Which Prettier version to pin, which config options to adopt (line width, trailingComma, etc.), and how to resolve ESLint/Prettier harmonization.
  - What can go wrong without it: Differing Prettier versions produce inconsistent formatting, CI mismatches, and lint/format conflicts.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/prettier.md
  - Purpose: Canonical internal guidance for Prettier version pin, recommended config values, and project `.prettierrc` example.
  - Exact knowledge to capture: pinned Prettier version, recommended settings (lineWidth, tabWidth, singleQuote, trailingComma), example `.prettierrc`, and editor integration notes.
  - Required version pin: Prettier — VERSION UNKNOWN (MUST BE PINNED BEFORE IMPLEMENTATION).

- Path: /docs/official-docs/prettier-ci-guidelines.md
  - Purpose: CI guidance to verify formatting and fail CI on format drift.
  - Exact knowledge to capture: recommended CI commands (e.g., `pnpm -w dlx prettier --check`), workflow snippets, remediation steps, and caching considerations.
  - Required version pin: Prettier — VERSION UNKNOWN.

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: PNPM — scripts & CLI
   - Concept: `pnpm` script invocation and `pnpm run` semantics (workspace script propagation)
   - Official source: https://pnpm.io/cli/run
   - Exact version requirement: 10.28.1
   - Why required: Repository uses `pnpm@10.28.1` as the `packageManager`; authoritative behavior for `pnpm run` and workspace script resolution is version-dependent.
   - Decision it informs: How root `scripts` (e.g., `build`, `dev`, `lint`) delegate to `turbo`, and CI invocation patterns.
   - What can go wrong: Differences in script propagation or `pnpm` CLI behavior across versions can break task discovery or script delegation.

2. Technology: Turborepo — script delegation and recommended invocation
   - Concept: How `turbo run <task>` behaves when invoked from root scripts and how it filters/forwards tasks to workspace packages
   - Official source: https://turborepo.org/docs (specific config docs marked in registry)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Task delegation semantics and cache/on-demand execution depend on Turborepo version.
   - Decision it informs: Whether root scripts should call `turbo` directly or use wrapper scripts, and how to author CI commands.
   - What can go wrong: Using an unpinned Turbo may cause different behavior in CI vs local dev and inconsistent cache behavior.

3. Technology: npm scripts (context)
   - Concept: `npm run` and generic `package.json` script conventions
   - Official source: https://docs.npmjs.com/cli/v10/commands/npm-run-script
   - Exact version requirement: VERSION UNKNOWN — OPTIONAL (pnpm is authoritative for this repo)
   - Why required: For developers using `npm` locally; repository standard is `pnpm` but `npm` docs provide reference semantics.
   - What can go wrong: Relying on `npm`-specific behavior when the repo uses `pnpm` can create confusion; prefer pnpm docs for authoritative guidance.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_scripts_official.md
   - Purpose: Capture recommended root script patterns, CI invocation examples, and exact `pnpm` + `turbo` commands the repo supports.
   - Exact knowledge to capture: pinned `pnpm` version (10.28.1), pinned `turbo` semver (MUST PIN), examples of `pnpm run build` vs `turbo run build`, CI examples, and a script-consistency checklist.
   - Required version pin: pnpm@10.28.1 (already present), turbo — MUST PIN exact semver BEFORE implementation.

## REQUIRED OFFICIAL DOCUMENTATION

- Technology: Next.js (App Router)
  - Concept: Environment variables / runtime configuration / build-time vs runtime exposure
  - Official source: https://nextjs.org/docs/app/building-your-application/environment-variables
  - Exact version requirement: 15.1.0
  - Why required: Determines canonical behavior for `.env` files, `NEXT_PUBLIC_` prefixes, build-time vs runtime injection, and which files are safe for client exposure.
  - Decision it informs: Whether to rely on Next.js built-in env semantics, canonical `.env.*` filenames, and policies for exposing variables to browser bundles.
  - What breaks without it: Client-side secret leakage, incorrect runtime configuration, broken deployments or discrepancies between local and CI environments.

- Technology: dotenv (motdotla/dotenv)
  - Concept: `.env` file loading semantics for local development and non-Next runtimes
  - Official source: https://github.com/motdotla/dotenv
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: If the repo intends to use `dotenv` to load environment files in local dev, the exact loader behavior (override order, encoding, parsing edge-cases) is version-dependent.
  - Decision it informs: Whether to require `dotenv` in dev, how to name `.env` examples, and local fallback/validation behavior.
  - What breaks without it: Inconsistent local environments, tests that depend on process.env, or subtle differences between CI and local runs.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend and why:

- `/docs/official-docs/nextjs-environment-variables.md` — Add explicit Next.js App Router environment variables guidance pinned to Next.js `15.1.0`. Rationale: Next.js env rules materially change build/runtime exposure and must be authoritative and pinned.
- `/docs/official-docs/dotenv.md` — Add a pinned, versioned reference to `dotenv` if the project will rely on it for local development. Rationale: `dotenv` behavior is version-dependent and affects local debugging and test reproducibility.

## INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/nextjs-environment-variables.md
  - Purpose: Capture Next.js (App Router) environment variable rules, file naming (`.env`, `.env.local`, `.env.production`), `NEXT_PUBLIC_` prefix semantics, and build/runtime considerations.
  - Exact knowledge to add: Link to Next.js env docs, pinned version `15.1.0`, examples for local vs CI, recommended file naming and `.env.example` policy.
  - Required version pin: 15.1.0

- Path: /docs/official-docs/dotenv.md
  - Purpose: Document `dotenv` usage if used by the repo: exact package version, loading order, secure defaults, and when it must not be used (e.g., client bundle contexts).
  - Exact knowledge to add: Official link to `motdotla/dotenv` for the pinned version, examples of safe usage patterns, and interactions with Next.js.
  - Required version pin: VERSION MUST BE PROVIDED BEFORE IMPLEMENTATION

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Node.js runtime & .nvmrc usage
   - Concept: Pinning runtime versions and authoritative guidance for tooling that reads `.nvmrc` (nvm / Volta / CI images)
   - Official source(s):
     - Node.js Release Schedule: https://nodejs.org/en/about/releases/
     - nvm (Node Version Manager) README: https://github.com/nvm-sh/nvm
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines the exact Node LTS/Active version to place in `.nvmrc`, `package.json` `engines`, Docker base images, and CI images.
   - What decision it informs: Which Node version to enforce in developer environments, CI, and runtime; whether to prefer `nvm`, `Volta`, or containerized enforcement.
   - What breaks without it: Non-reproducible developer setups, CI/build discrepancies, runtime incompatibilities and hard-to-debug failures.

2. Technology: EditorConfig (.editorconfig)
   - Concept: Canonical editor settings spec to ensure consistent whitespace, EOL, charset, and trimming behavior across editors and IDEs.
   - Official source(s):
     - EditorConfig.org specification and docs: https://editorconfig.org
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (EditorConfig core spec does not always expose a simple semver; pin the canonical spec reference URL and preferred parser implementations if necessary)
   - Why required: Establishes a minimal, repository-wide `.editorconfig` that all contributors and CI tooling can rely on to avoid trivial diffs and whitespace churn.
   - What decision it informs: Which `.editorconfig` entries to include (indent style/size, end_of_line, charset, trim_trailing_whitespace), and whether CI should run editorconfig checks.
   - What breaks without it: Inconsistent formatting, merge conflicts from whitespace changes, and developer friction from editor-specific defaults.

List of required new docs:

- /docs/official-docs/node-version-policy.md — Required: authoritatively pin Node runtime, describe `.nvmrc` usage, CI image tags, and preferred version manager (nvm / Volta / asdf) with exact versions.
- /docs/official-docs/editorconfig.md — Required: canonical `.editorconfig` content, rationale, and any editor/IDE plugin recommendations.

INTERNAL DOCS TO ADD OR EXTEND

Only required because coverage is missing.

- Path: /docs/official-docs/node-version-policy.md
  - Purpose: Prescribe the Node.js runtime version (exact semver), `.nvmrc` content, CI image tags, and recommended version manager (with pinned version of that manager).
  - Exact knowledge to add: Preferred Node semver (e.g., `18.20.0` or `20.5.0`), CI Docker base images (e.g., `node:18.20.0-bullseye`), recommended manager (e.g., `nvm` v0.39.6 or `volta` v1.0.6) with links.
  - Required version pin: Node.js exact LTS/active release (MUST BE PROVIDED BEFORE IMPLEMENTATION).

- Path: /docs/official-docs/editorconfig.md
  - Purpose: Provide a canonical `.editorconfig` template and guidance for IDE/editor plugins to ensure consistent behavior.
  - Exact knowledge to add: Canonical file contents, examples for common filetypes, and recommended plugin versions if applicable.
  - Required version pin: EditorConfig spec reference URL (pin the commit or date if the spec evolves), or state `SPEC STABLE` if acceptable.

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: pnpm (Workspaces)
   - Concept: Workspace discovery, install semantics, `packageManager` pinning, and CI install rules
   - Official source: https://pnpm.io/workspaces
   - Exact version requirement: 10.28.1 (already pinned in registry)
   - Why required: Ensures deterministic installs and CI parity; informs `packageManager` `pnpm@10.28.1` pin in `package.json` and Corepack usage.
   - What decision it informs: Workspace topology, CI `--frozen-lockfile` enforcement, and installer behavior across environments.
   - What breaks without it: Non-reproducible installs, lockfile drift, and inconsistent local vs CI dependency graphs.

2. Technology: Turborepo (task orchestration & caching)
   - Concept: Pipeline schema, caching semantics, and authoritative `turbo.json` configuration
   - Official sources:
     - Turborepo docs: https://turborepo.org/docs
     - Turborepo schema: https://turborepo.org/schema.json
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: `turbo` version affects pipeline behavior, cache hashing, and remote cache compatibility; pinning prevents subtle CI/remote-cache mismatches.
   - What decision it informs: The exact `turbo` package version to pin in `devDependencies`, remote cache protocol compatibility, and schema used for `turbo.json` validation.
   - What breaks without it: Cache corruption across versions, inconsistent task ordering, and unpredictable CI build behavior.

3. Technology: TypeScript (project references & compiler semantics)
   - Concept: Project references, `tsconfig` schema, and compiler behavior
   - Official source: https://www.typescriptlang.org/docs/handbook/project-references.html
   - Exact version requirement: 5.9.3 (already pinned in registry)
   - Why required: TypeScript version affects project references, emitted `.tsbuildinfo`, and module resolution behavior.
   - What decision it informs: Pinning `typescript` in `devDependencies`, root `tsconfig` expectations, and allowed compiler options.
   - What breaks without it: Incoherent builds, broken incremental compilation, and diverging diagnostics across environments.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/turborepo.md` — Add explicit `turbo` semver to pin, reference the exact `schema.json` URL (include commit/date if possible), and document remote cache compatibility and CI image tags. Rationale: prevents cache/behavior drift and informs Planner which `turbo` version to pin.

INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/turborepo.md (EXTEND)
  - Purpose: Pin authoritative `turbo` semver, link the exact `schema.json` (with date/commit if available), recommend remote cache provider(s), and provide CI image/tag recommendations.
  - Exact knowledge to add: `turbo` X.Y.Z (exact semver to be provided), compatible `node` range for that `turbo` version, schema.json link and expected fields, and recommended `turbo` CLI invocation patterns in CI.
  - Required version pin: MUST BE PROVIDED BEFORE IMPLEMENTATION (VERSION UNKNOWN currently).

REQUIRED OFFICIAL DOCUMENTATION

- Technology: Turborepo
  - Concept: Caching guarantees / cache key semantics / remote cache compatibility
  - Official source: https://turborepo.org/docs/features/caching
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Cache correctness and restore guarantees are version-sensitive and affect CI determinism and incremental build safety.
  - Decision it informs: Remote cache policy, declared `outputs`, and safe cache invalidation strategies.
  - What breaks without it: Silent cache corruption, incorrect cache restores, non-reproducible CI builds.

- Technology: Turborepo
  - Concept: `turbo.json` schema / pipeline semantics
  - Official source: https://turborepo.org/docs/reference/configuration
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: `dependsOn`, `outputs`, and pipeline semantics can change; affects verification gate design.
  - Decision it informs: How to design verification steps to be cache-aware and deterministic.
  - What breaks without it: Incorrect pipeline assumptions, broken dependsOn chains.

- Technology: ESLint
  - Concept: Lint rules / CI linting behavior
  - Official source: https://eslint.org/docs/latest
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: CLI exit codes, rule formats, and config schema change across versions; affects gating.
  - Decision it informs: Which CLI flags to run in CI, config schema (flat vs legacy), and failure handling.
  - What breaks without it: Lint gates may pass locally but fail in CI or vice versa.

- Technology: eslint-plugin-boundaries (or chosen equivalent)
  - Concept: Import boundary enforcement for repository ownership and no-cross-app imports
  - Official source: https://github.com/bryanrsmith/eslint-plugin-boundaries
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Plugin rule definitions and configuration options vary by version; needed to implement automated boundary checks.
  - Decision it informs: How to programmatically enforce repo boundaries as a quality gate.
  - What breaks without it: Cross-app imports may go undetected or rules may be misconfigured.

- Technology: Prettier
  - Concept: Formatting gate behavior in CI (check-only vs format-and-commit)
  - Official source: https://prettier.io/docs/en/index.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Formatting rules and CLI flags affect check-only flows in CI.
  - Decision it informs: Whether CI should run `prettier --check` vs `prettier --write` and how to fail the pipeline.
  - What breaks without it: Formatting drift and inconsistent gating behavior.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- /docs/official-docs/turborepo.md — Add exact `turbo` version, remote cache guidance, and explicit cache-compatibility notes; include schema.json link and recommended CI remote cache settings.
- /docs/official-docs/eslint-boundaries.md — Pin `eslint` and chosen boundary plugin versions; add CI invocation examples and failure semantics.
- /docs/official-docs/prettier.md — Pin `prettier` version; add CI check-only examples and project `.prettierrc` expectations.

INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/turborepo.md
  - Purpose: Add authoritative Turborepo caching and pipeline versioning guidance for this repo
  - Exact knowledge to add: Concrete `turbo` version to pin, recommended remote cache provider configuration (e.g., Vercel/third-party), schema.json link, and migration notes for cache-breaking versions.
  - Required version pin: MUST BE SUPPLIED BEFORE IMPLEMENTATION (e.g., `turbo@X.Y.Z`).

- Path: /docs/official-docs/eslint-ci-guidelines.md
  - Purpose: CI-level ESLint invocation and failure handling reference
  - Exact knowledge to add: Exact `eslint` version, boundary plugin version, CLI flags for CI, exit-code expectations, sample CI job snippets.
  - Required version pin: MUST BE SUPPLIED BEFORE IMPLEMENTATION (e.g., `eslint@X.Y.Z`).

- Path: /docs/official-docs/prettier-ci-guidelines.md
  - Purpose: CI Prettier checks reference
  - Exact knowledge to add: Exact `prettier` version, `--check` examples, integration with format-on-commit flows, CI job snippets.
  - Required version pin: MUST BE SUPPLIED BEFORE IMPLEMENTATION (e.g., `prettier@X.Y.Z`).
