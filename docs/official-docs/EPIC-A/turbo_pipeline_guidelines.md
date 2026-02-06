---
doc_id: turborepo-pipeline-guidelines
tool: Turborepo
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Turborepo — Pipeline Behavior & Guidelines

## Purpose

Governs the construction of the Task Graph, defining how tasks depend on one another, how concurrency is managed, and how caching inputs/outputs must be declared to ensure deterministic execution.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v2.x)

## Scope

- Applies to: `turbo.json` `tasks` configuration, `dependsOn` relationships, `inputs`/`outputs` definitions, and execution flags.
- Does NOT apply to: Internal script logic within `package.json` or remote cache provider architecture.

## Official Sources (Binding)

- turborepo-api-refrence.md
- turborepo-crafting-your-repository.md
- turborepo-schema.md

## Evidence Coverage Matrix

| Policy Area                        | Source URL                            | Version Covered | Status  |
| ---------------------------------- | ------------------------------------- | --------------- | ------- |
| Task Dependencies (`dependsOn`)    | turborepo-api-refrence.md             | v2.x            | COVERED |
| Topological vs. Arbitrary Rules    | turborepo-crafting-your-repository.md | v2.x            | COVERED |
| Caching Semantics (Inputs/Outputs) | turborepo-api-refrence.md             | v2.x            | COVERED |
| Persistent Tasks                   | turborepo-api-refrence.md             | v2.x            | COVERED |
| Transit Nodes                      | turborepo-crafting-your-repository.md | v2.x            | COVERED |

## Version & Compatibility

- **Tool version:** v2.x (Schema v2-5-7 referenced in editor integration).
- **Related tooling compatibility:**
  - **Package Manager:** Scripts defined in `package.json` are the executable units found by Turborepo pipelines.

## Canonical Rules (Non-Negotiable)

- **Task Mapping:** Keys in the `tasks` object MUST correspond to script names in `package.json` files to be executed.
- **Dependency Topology:**
  - **Upstream Dependency (`^`):** `dependsOn: ["^build"]` enforces that the `build` task in all _dependencies_ of the current package MUST complete before the current task starts.
  - **Local Dependency:** `dependsOn: ["build"]` (no prefix) enforces that the `build` task in the _same_ package MUST complete before the current task starts.
  - **Arbitrary Dependency:** `dependsOn: ["utils#build"]` enforces that the `build` task in the `utils` package MUST complete before the current task starts.
- **Cache Inputs:**
  - Default Behavior: All git-tracked files in a package are inputs.
  - Opt-Out: Defining the `inputs` key opts OUT of git-tracking/`.gitignore` respect.
  - Restoration: Use `$TURBO_DEFAULT$` within `inputs` to include standard git-tracked files alongside custom patterns.
- **Cache Outputs:**
  - File artifacts MUST be explicitly listed in `outputs` (globs relative to package root) to be restored on cache hits.
  - Logs are ALWAYS cached, regardless of `outputs` configuration.
- **Persistent Tasks:**
  - Tasks marked `persistent: true` (e.g., dev servers) MUST NOT be depended upon by other tasks; Turborepo will throw an error if a dependency exists.
  - Persistent tasks SHOULD usually set `"cache": false`.
- **Lint Task Policy:**
  - lint tasks MUST have no `outputs`.
  - lint tasks MUST NOT declare `dependsOn`.
  - lint tasks MUST set `cache: false`.
  - lint exists only to validate source state, not produce artifacts.
- **Root Tasks:** Tasks for the workspace root (e.g., global linting) MUST be registered in `turbo.json` using the `//#task` syntax (e.g., `//#lint:root`) or by defining a script in the root `package.json`.

## Prohibited Configurations

- ❌ **Circular Dependencies:** The Task Graph MUST NOT contain cycles (e.g., A depends on B, B depends on A).
- ❌ **Depending on Persistent Tasks:** A task MUST NOT list a persistent task in its `dependsOn` array.
- ❌ **Implicit Inputs in Strict Inputs Mode:** If `inputs` is defined without `$TURBO_DEFAULT$`, the task ignores all other file changes in the package (except `package.json` and lockfiles).
- ❌ **Missing Outputs for Artifacts:** Defining a build task without `outputs` results in "cache hits" that restore NO files, breaking downstream consumers.

## Enforcement

- **Graph Validation:** Turborepo CLI validates the acyclic nature of the graph at runtime.
- **Schema Validation:** `turbo.json` schema enforces type correctness (e.g., `dependsOn` must be an array of strings).
- **Persistence Checks:** The CLI throws a hard error if a persistent task is found in a `dependsOn` chain.
- **Strict Mode Inputs:** If `inputs` excludes source files, changes to those files will NOT invalidate the cache (unless they are `package.json`, `turbo.json`, or lockfiles).

## Failure Modes

- **Infinite Blocking:** If a task erroneously depends on a long-running task (that isn't marked persistent but behaves so), the pipeline hangs indefinitely.
- **Cache Poisoning (Under-fetching):** If `inputs` is restrictive and misses a source file, code changes will not trigger a rebuild.
- **Ghost Builds:** If `outputs` are missing, a `turbo build` reports success (cache hit) but `dist/` is empty, causing runtime errors in dependents.
- **Parallelism Bottlenecks:** Overuse of `dependsOn` without `^` (e.g., `check-types` depending on `check-types` instead of `^check-types` or a Transit Node) forces serial execution where parallel execution was possible.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-A/A3_turborepo_official.md` (Canonical Configuration)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `persistent: true` is set, `cache` SHOULD be `false`.
- To enable parallel execution of tasks that depend on updated dependencies but have no build artifacts (like `check-types`), use a **Transit Node** pattern (dummy task).
- `inputs` list strictly overrides default behavior; check for `$TURBO_DEFAULT$` availability.
- `dependsOn` entries starting with `^` imply topological sorting.

## Verification Checklist

- [ ] `outputs` configured for all tasks generating filesystem artifacts.
- [ ] `dependsOn` correctly uses `^` for library-consumer relationships.
- [ ] Persistent tasks (dev/watch) are roots of the dependency graph (no dependents).
- [ ] Root tasks use `//#` syntax if defined in `turbo.json`.

## Non-Decisions

- This document does not define specific globs for `outputs` (e.g., `dist/**` vs `build/**`).
- This document does not mandate a specific max `concurrency` value.

## Notes

- "Transit Nodes" are virtual tasks defined in `turbo.json` that do not exist in `package.json` scripts; they bridge dependency graphs to allow parallelism for non-building tasks.
- `inputs` always implicitly includes `package.json`, `turbo.json`, and lockfiles; these cannot be ignored.
- `sideEffects` in `package.json` are distinct from Turborepo `outputs`; Turborepo only respects `turbo.json` `outputs`.
