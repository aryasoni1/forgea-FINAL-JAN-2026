---
doc_id: turborepo-canonical-config
tool: Turborepo
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Turborepo — Canonical Configuration

## Purpose

Governs the configuration of the `turbo.json` file, task scheduling topology, caching behaviors, and environment variable constraints within the monorepo build system.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v2.x)

## Scope

- Applies to: Root and package-level `turbo.json` files, task execution logic, cache artifact definitions, and environment mode settings.
- Does NOT apply to: Internal script logic within `package.json` (e.g., specific bundler configurations) or remote caching provider selection.

## Official Sources (Binding)

- turborepo-api-refrence.md
- turborepo-crafting-your-repository.md
- turborepo.md
- turborepo-schema.md

## Evidence Coverage Matrix

| Policy Area                         | Source URL                            | Version Covered | Status  |
| ----------------------------------- | ------------------------------------- | --------------- | ------- |
| Configuration Schema (`turbo.json`) | turborepo-api-refrence.md             | v2.x            | COVERED |
| Environment Modes (Strict)          | turborepo-crafting-your-repository.md | v2.x            | COVERED |
| Package Configurations              | turborepo-api-refrence.md             | v2.x            | COVERED |
| Caching Logic (Inputs/Outputs)      | turborepo-crafting-your-repository.md | v2.x            | COVERED |
| Migration/Versioning                | turborepo.md                          | v2.0            | COVERED |

## Version & Compatibility

- **Tool version:** v2.x (Explicitly referenced in upgrade guides).
- **Related tooling compatibility:**
  - **Package Manager:** The root `package.json` **MUST** define a `packageManager` field to ensure deterministic behavior.
  - **Schema:** Versioned schemas available via `https://v<version>.turborepo.dev/schema.json`.

## Canonical Rules (Non-Negotiable)

- **Root Configuration:** A `turbo.json` file MUST exist in the workspace root.
- **Task Mapping:** Keys in the `tasks` object MUST match the script names defined in `package.json` files to be executable.
- **Dependency Topology:**
  - **Topological (`^`):** A task dependency prefixed with `^` (e.g., `"dependsOn": ["^build"]`) MUST wait for the same task in the package's dependencies to complete.
  - **Same-Package:** A task dependency without a prefix MUST wait for the named task _within the same package_ to complete.
- **Strict Mode Default:** Turborepo v2.0+ defaults to `envMode: "strict"`. Environment variables accessible to a task are RESTRICTED to those explicitly listed in `env` or `globalEnv`.
- **Caching Semantics:**
  - **Outputs Requirement:** Turborepo caches file outputs ONLY if the `outputs` key is defined.
  - **Logs:** Terminal logs are always cached regardless of `outputs` configuration.
  - **Input Whitelisting:** Defining the `inputs` key opts OUT of default git-tracking; the special string `$TURBO_DEFAULT$` MUST be used to include default tracked files,.
- **Package Configuration Inheritance:**
  - Package-level `turbo.json` files MUST start the `extends` array with `["//"]`,.
  - Array fields in Package Configurations REPLACE root values by default. Use `$TURBO_EXTENDS$` as the first element to append instead,.
- **Global Dependencies:** Files listed in `globalDependencies` (e.g., `.env`) affect the hash of ALL tasks.

## Prohibited Configurations

- ❌ **Root Extension:** The root `turbo.json` MUST NOT use the `extends` key,.
- ❌ **Workspace Syntax in Package Configs:** Package Configurations MUST NOT use `package#task` syntax (e.g., `app#build`) as task entries.
- ❌ **Global Override in Packages:** Package Configurations MUST NOT attempt to override `globalEnv` or `globalDependencies`.
- ❌ **Runtime Env Mutation:** Environment variables created or mutated inline at runtime (e.g., `export VAR=1 && cmd`) are NOT hashed and MUST be avoided.
- ❌ **Circular Dependencies:** Task dependencies MUST NOT create a cycle (e.g., A depends on B, B depends on A).

## Enforcement

- **Schema Validation:** `turbo.json` is validated against the JSON schema; invalid keys cause validation errors.
- **Process Isolation (Strict Mode):** The runtime process for a task is stripped of all environment variables NOT declared in `turbo.json` (unless `passThroughEnv` is used),.
- **CLI Gatekeeping:** The CLI enforces the presence of `packageManager` in `package.json` (unless explicitly disabled via `--dangerously-disable-package-manager-check`).
- **Task Graph Execution:** The CLI prevents downstream tasks from starting until all `dependsOn` requirements are satisfied.

## Failure Modes

- **Cache Poisoning (Missing Env):** If an environment variable changes but is not listed in `env`, the task hash remains the same, causing a stale cache restore.
- **Missing Artifacts:** If `outputs` is omitted, `turbo` reports a "cache hit" but restores no files, causing downstream build failures.
- **Runtime Crashes (Strict Mode):** Scripts relying on undeclared environment variables will fail in Strict Mode as those variables will be undefined in the process environment.
- **Cache Misses (Global Inputs):** Modifying files listed in `globalDependencies` (like `.env` or `tsconfig.json`) invalidates the cache for ALL tasks,.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/package-manager-policy.md` (Required for `packageManager` field compliance).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `envMode` is undefined, treat as "strict" (v2.0 default).
- `persistent: true` tasks implies `cache: false` is recommended/required for interactive tasks.
- If `outputs` is empty array `[]` or undefined, NO files are restored on cache hit.
- `globalEnv` variables affect EVERY task hash; `env` variables affect ONLY the specific task hash.

## Verification Checklist

- [ ] Root `turbo.json` exists.
- [ ] `packageManager` field is defined in the root `package.json`.
- [ ] All environment variables used in build scripts are listed in `env` or `globalEnv`.
- [ ] Package configurations explicitly extend `["//"]`.
- [ ] Tasks producing filesystem artifacts have valid `outputs` globs.

## Non-Decisions

- This document does not define the specific remote caching provider (e.g., Vercel vs. self-hosted).
- This document does not mandate specific package manager (npm/pnpm/yarn) choices, only that one is selected.

## Notes

- `turbo` is an alias for `turbo run`.
- Git worktrees automatically share the local cache unless `cacheDir` is explicitly set.
- `globalDependencies` automatically includes the root `package.json` and lockfile; these cannot be ignored.
