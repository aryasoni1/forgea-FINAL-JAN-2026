### FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A3 — Turborepo Setup
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/turbo.json
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json

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

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/turborepo.md
  - Coverage status: PARTIAL
  - What is missing: Explicit pinned Turborepo version, canonical official-schema links, and a concrete mapping from the repo's `turbo.json` to the recommended pipeline conventions.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/turbo.json
  - Coverage status: VERIFIED (as source-of-truth config present)
  - Notes: `turbo.json` exists and defines `build`, `dev`, and `lint`. `build` uses `dependsOn: ["^build"]` and outputs are declared; `dev.cache` is disabled.

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json
  - Coverage status: PARTIAL
  - What is missing: `devDependencies` uses `"turbo": "latest"` (un-pinned); this repository-level truth must be pinned to a specific semver.

### STUDY GUIDE FOR HUMAN (MANDATORY)

- `turbo.json` schema: Why it exists — centralizes pipeline; Alternatives — per-package scripts only (no orchestration); When NOT to use — small single-package repos; Common mistakes — forgetting `outputs`, assuming CLI flags change graph semantics.
- Pipeline `dependsOn`: Why it exists — expresses task ordering across packages; Alternatives — ad-hoc scripts; When NOT to use — for ephemeral dev-only tasks; Common mistakes — circular dependencies and missing caret (`^`) propagation semantics.
- Caching: Why it exists — avoid recompute and shorten CI; Alternatives — no cache (slower CI); When NOT to use — non-deterministic tasks; Common mistakes — not declaring outputs or missing env inputs in hash.
- Version pinning: Why it exists — API and cache format changes across releases; When NOT to use — never use `latest` in monorepo infra; Common mistakes — mixing global vs workspace-installed turbo versions.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_turborepo_official.md
   - Purpose: Capture the exact Turborepo version chosen, canonical `turbo.json` examples used by this repo, caching policy, remote cache guidance (provider + access), and CI invocation practices.
   - Exact knowledge to capture: pinned `turbo` semver, authoritative schema URL, mapping of `turbo.json` keys to repo conventions, examples for `dependsOn` and `outputs`, remote cache compatibility notes.
   - Required version pin: MUST PIN an exact `turbo` semver BEFORE implementation.

2. Path: /docs/official-docs/pnpm-workspace_policy.md (if not already aligned)
   - Purpose: Ensure `packageManager` and workspace glob conventions are enforced for task-graph determinism.
   - Exact knowledge to capture: `pnpm` version (10.28.1), workspace glob rules, CI frozen-lock instructions.
   - Required version pin: pnpm@10.28.1 (already present in repo)

### OPEN QUESTIONS / AMBIGUITIES

- Which exact `turbo` version (semver) should be used and tested in CI? (BLOCKER)
- Will we enable a remote cache (and which provider or URL)? If yes, what auth model is required? (BLOCKER)
- Are there any existing CI/agent images that include a different `turbo` binary that would conflict with an enforced workspace version?
- Should package-level pipeline extensions be allowed, or must all tasks only be defined at root `turbo.json`?

### MASTER DOCS REGISTRY ACTION (MANDATORY)

Append the following to `/docs/master_docs.md`:

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A3 — Turborepo Setup
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs, pinned-version requirements, and internal docs to add.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A3 — Turborepo Setup
  - Doc path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_turborepo_official.md
  - Status: REQUIRED
  - Reason: Must pin `turbo` version and document pipeline conventions used by this monorepo.

## FEATURE CONTEXT

- **Epic:** EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- **Feature:** A3 — Turborepo Setup
- **Inputs reviewed:**
  - **Agent Orchestrator output:** /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md
  - **Repo files inspected:** /Users/aryasoni/Desktop/Forgea/forgea-monorepo/turbo.json, /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json, /Users/aryasoni/Desktop/Forgea/forgea-monorepo/pnpm-workspace.yaml
  - **Master docs registry:** /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - **Code-scout output:** MISSING — no dedicated A3 code-scout file found under /Users/aryasoni/Desktop/Forgea/docs/code-scout/ (A2/A6/A8 present)

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

## EXISTING INTERNAL DOCS (VERIFIED)

- **/Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md**: PRESENT — PARTIAL (orchestrator directions and desired outcomes exist, but lacks pinned-version requirements and concrete canonical workspace decision).
- **/Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md**: PRESENT — PARTIAL (captures pnpm facts and workspace mismatch; useful input).
- **/Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A6_Prettier (Formatting Only).md**: PRESENT — PARTIAL (formatting policy missing canonical placement).
- **/Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A8_Environment & Safety.md**: PRESENT — PARTIAL (runtime env policy captured; not directly about Turbo but informs outputs and secrets handling).

Files not found / insufficient:

- **A3 code-scout report:** MISSING — create `/Users/aryasoni/Desktop/Forgea/docs/code-scout/.../A3_Turborepo Setup.md` before implementation to capture concrete local findings and exact file snippets.

## STUDY GUIDE FOR HUMAN

- **Turborepo (Turbo)**
  - Why it exists: fast, incremental monorepo task runner with remote/local caching and pipeline orchestration.
  - Why alternatives exist: Nx, Bazel, plain npm scripts — alternatives trade developer ergonomics vs feature surface (caching, remote execution).
  - When NOT to use: very small repos where complexity of a task runner isn't justified.
  - Common mistakes: leaving `turbo` as `latest` (breaking changes), mis-declaring `outputs` (overbroad globs), and misusing `dependsOn` vs `pipeline` semantics.

- **pnpm Workspaces / pnpm-workspace.yaml**
  - Why it exists: deterministic installs, fast linking, monorepo workspace control.
  - Why alternatives exist: npm/yarn workspaces (different resolution and hoisting behavior).
  - When NOT to use: when a team standard is strictly npm or yarn and migration costs outweigh benefits.
  - Common mistakes: duplicating workspace globs between `package.json` and `pnpm-workspace.yaml` without choosing canonical source; forgetting to include new top-level package globs (e.g., `services/*`).

- **Turbo pipeline caching & `outputs` patterns**
  - Why it exists: controls cache keys and incremental rebuild correctness.
  - Why alternatives exist: disabling cache for dev or using per-package build scripts without turborepo caching.
  - When NOT to rely on caching: when builds produce non-deterministic artifacts or when side-effects are stored outside declared outputs.
  - Common mistakes: not including all build artifacts in `outputs` (leads to cache misses) or including transient files (leads to cache pollution).

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

## OPEN QUESTIONS / AMBIGUITIES

- Which exact `turbo` version should we pin (semantic-minor line)? Currently `turbo` is `latest` in devDependencies — recommend selecting a stable semver (e.g., 1.x or 2.x) and pin it.
- Which file is canonical for workspace globs: `package.json` `workspaces` or `pnpm-workspace.yaml`? (Repo currently has mismatch: `services/*` present in package.json but absent from pnpm-workspace.yaml.)
- Which Node.js / npm client versions are the CI targets? These affect workspaces and package resolution behavior.
- Confirm `outputs` patterns for all apps (Next.js `.next/**` and any serverless build outputs) to avoid cache scope mistakes.

## MASTER DOCS REGISTRY ACTION

Append the following entries to /Users/aryasoni/Desktop/Forgea/docs/master_docs.md:

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A3 — Turborepo Setup
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs, pinned-version requirements, and internal docs to add.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A3 — Turborepo Setup
  - Doc path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_turborepo_official.md
  - Status: REQUIRED
  - Reason: Must pin `turbo` version and document pipeline conventions used by this monorepo.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A3 — Turborepo Setup
  - Doc path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/pnpm_workspace_policy.md
  - Status: REQUIRED
  - Reason: Resolve workspace-glob mismatch (package.json vs pnpm-workspace.yaml) and document canonical workspace policy.
