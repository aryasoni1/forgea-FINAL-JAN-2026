---
doc_id: turborepo-core-semantics
tool: Turborepo
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Turborepo — Core Semantics

## Purpose

Governs the configuration of the `turbo.json` file, task scheduling logic, caching behaviors (local and remote), and environment variable handling within the monorepo.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v2.x)

## Scope

- Applies to: `turbo.json` configuration, `turbo` CLI execution, caching strategies, and environment variable modes.
- Does NOT apply to: Package manager specific behaviors (npm/pnpm/yarn) or external CI provider configurations (GitHub Actions/CircleCI) beyond Turborepo integration points.

## Official Sources (Binding)

- turborepo-api-refrence.md
- turborepo-crafting-your-repository.md
- turborepo-schema.md
- turborepo.md

## Evidence Coverage Matrix

| Policy Area                         | Source URL                            | Version Covered | Status  |
| ----------------------------------- | ------------------------------------- | --------------- | ------- |
| Configuration Schema (`turbo.json`) | turborepo-api-refrence.md             | v2.x            | COVERED |
| Task Dependencies                   | turborepo-api-refrence.md             | v2.x            | COVERED |
| Caching Logic (Inputs/Outputs)      | turborepo-crafting-your-repository.md | v2.x            | COVERED |
| Environment Modes                   | turborepo-crafting-your-repository.md | v2.x            | COVERED |
| Package Configurations              | turborepo-api-refrence.md             | v2.x            | COVERED |

## Version & Compatibility

- **Tool version:** v2.x (Inferred from upgrade guides and schema versions defined in sources).
- **Related tooling compatibility:**
  - Supports `npm`, `yarn`, `pnpm`, and `bun`.
  - Requires `packageManager` field in root `package.json` for v2.0+.
  - JSON Schema versioning available via `https://v<version>.turborepo.dev/schema.json`.

## Canonical Rules (Non-Negotiable)

- **Root Configuration:** A `turbo.json` file MUST exist in the workspace root.
- **Task Mapping:** Keys in the `tasks` object MUST match the script names defined in `package.json` files to be executable.
- **Dependency Topology:**
  - **Topological Dependency (`^`):** A task prefixed with `^` (e.g., `"dependsOn": ["^build"]`) MUST wait for the same task in the package's dependencies to complete.
  - **Same-Package Dependency:** A task without a prefix (e.g., `"dependsOn": ["build"]`) MUST wait for the named task _within the same package_ to complete.
- **Caching Semantics:**
  - **Outputs Requirement:** Turborepo caches file outputs ONLY if the `outputs` key is defined. Logs are always cached.
  - **Default Inputs:** By default, all git-tracked files in a package are inputs. Specifying the `inputs` key opts OUT of this default unless `$TURBO_DEFAULT$` is included.
- **Environment Modes:**
  - **Strict Mode (Default):** Environment variables accessible to a task are RESTRICTED to those explicitly listed in `env` or `globalEnv`.
  - **Global Dependencies:** Files listed in `globalDependencies` (e.g., `.env`) affect the hash of ALL tasks.
- **Package Configuration:**
  - Package-level `turbo.json` files MUST use `"extends": ["//"]` to inherit from the root configuration.
  - Array fields in package configurations REPLACE root values by default unless `$TURBO_EXTENDS$` is used.

## Prohibited Configurations

- ❌ **Root Extension:** The root `turbo.json` MUST NOT use the `extends` key (it cannot extend from anything).
- ❌ **Workspace Syntax in Package Config:** Package Configurations MUST NOT use the `workspace#task` syntax (e.g., `app#build`) as task entries.
- ❌ **Mutable Runtime Environment Variables:** Environment variables created or mutated inline at runtime (e.g., `export VAR=1 && cmd`) are NOT hashed and MUST be avoided.
- ❌ **Global Override in Packages:** Package Configurations MUST NOT attempt to override `globalEnv` or `globalDependencies`.

## Enforcement

- **Schema Validation:** Editors and the CLI validate `turbo.json` against the JSON schema.
- **Task Graph Execution:** The CLI enforces `dependsOn` relationships, preventing downstream tasks from starting until dependencies are satisfied.
- **Strict Mode Filtering:** In Strict Mode, the runtime process for a task is stripped of all environment variables NOT declared in `turbo.json`.
- **Package Manager Check:** Turborepo v2.0+ enforces the presence of `packageManager` in `package.json` (disableable via `dangerouslyDisablePackageManagerCheck`).

## Failure Modes

- **Cache Poisoning (Missing Inputs):** If an external file or env var affects the build but is not in `inputs`/`env`, Turborepo will restore a stale cache.
- **Missing Artifacts:** If `outputs` is omitted or empty, tasks report "cache hit" but do not restore filesystem artifacts (e.g., `dist/` folders).
- **Runtime Crashes (Strict Mode):** Scripts relying on undeclared environment variables will fail in Strict Mode as those variables will be undefined.
- **Circular Dependencies:** Circular task dependencies defined in `turbo.json` will prevent execution.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/package-manager-policy.md` (Workspace structure relies on package manager definitions).

## Planner Extraction Hints (Non-Human)

- If `turbo.json` is missing -> BLOCKED.
- If `envMode` is NOT "loose", all env vars must be extracted from source and added to `env`.
- `dependsOn` `^` prefix implies topological sort requirement.
- `persistent: true` tasks MUST have `cache: false`.

## Verification Checklist

- [ ] Root `turbo.json` exists.
- [ ] Root `package.json` contains `packageManager` field.
- [ ] Task outputs (e.g., `dist/**`, `.next/**`) are explicitly listed in `outputs`.
- [ ] Environment variables used in build scripts are listed in `env` or `globalEnv`.
- [ ] Persistent tasks (dev servers) have `"cache": false`.

## Non-Decisions

- This document does not define the specific remote caching provider (e.g., Vercel vs. self-hosted).
- This document does not mandate a specific package manager (npm/yarn/pnpm/bun).

## Notes

- Turborepo automatically infers environment variables for common frameworks (Next.js, Vite, etc.) unless disabled.
- `turbo` is an alias for `turbo run`.
- Git worktrees automatically share the local cache unless `cacheDir` is explicitly set.
