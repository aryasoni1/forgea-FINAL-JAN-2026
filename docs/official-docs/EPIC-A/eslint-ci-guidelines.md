---
doc_id: eslint-ci-guidelines
tool: ESLint
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# ESLint — CI Enforcement Guidelines

## Purpose

Governs the configuration, execution, and failure conditions of ESLint within automated Continuous Integration (CI) pipelines, ensuring code quality standards are strictly enforcing.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v9.x)

## Scope

- Applies to: Automated linting workflows, CLI execution, exit code interpretation, and output formatting.
- Does NOT apply to: Editor integrations or interactive fixing (`--fix`) unless explicitly part of a formatted-check step.

## Official Sources (Binding)

- eslint-configure.md
- eslint.md
- eslint-integrate.md

## Evidence Coverage Matrix

| Policy Area           | Source URL          | Version Covered | Status  |
| --------------------- | ------------------- | --------------- | ------- |
| Exit Codes & Severity | eslint.md           | v9.39.2         | COVERED |
| Configuration Loading | eslint-configure.md | v9.39.2         | COVERED |
| Caching Behavior      | eslint-integrate.md | v9.39.2         | COVERED |
| Unused Directives     | eslint-configure.md | v9.39.2         | COVERED |
| Output/Formatters     | eslint.md           | v9.39.2         | COVERED |

## Version & Compatibility

- **Tool version:** v9.39.2
- **Runtime Requirement:** Node.js ^18.18.0, ^20.9.0, or >=21.1.0 built with SSL support.
- **Related tooling compatibility:**
  - **TypeScript Configs:** Native support requires `jiti` (unless Node.js >= 22.10.0 with flags).
  - **Package Managers:** `pnpm` requires `.npmrc` settings (`auto-install-peers=true`, `node-linker=hoisted`) for compatibility.

## Canonical Rules (Non-Negotiable)

- **Exit Code Determinism:**
  - Rules configured with `"error"` (severity 2) MUST trigger a non-zero exit code (1) upon violation.
  - Rules configured with `"warn"` (severity 1) do NOT trigger a non-zero exit code unless the `--max-warnings` flag is used,.
- **Configuration Precedence:**
  - In the absence of a specific flag, ESLint searches for `eslint.config.js`, `eslint.config.mjs`, or `eslint.config.cjs` (in that order of priority) starting from the current working directory and traversing up to the root.
  - If multiple configuration files exist, JavaScript files take precedence over TypeScript files.
- **Unused Directive Enforcement:**
  - Stale `eslint-disable` comments MUST be monitored. The default behavior is `"warn"`, but this can be escalated to `"error"` via `linterOptions.reportUnusedDisableDirectives` or the CLI flag `--report-unused-disable-directives`.
- **Cache Management:**
  - If caching is enabled (`options.cache` / `--cache`), the cache file (default `.eslintcache`) MUST be manually deleted/invalidated when ESLint plugins are upgraded, as ESLint does not automatically clear the cache in this scenario.
- **Pattern Matching Safety:**
  - By default (`errorOnUnmatchedPattern: true`), ESLint throws an error if provided patterns match no files. CI pipelines MUST expect this failure mode if file sets are dynamic.

## Prohibited Configurations

- ❌ **Global Installation:** ESLint SHOULD NOT be installed globally (`npm install eslint --global`); plugins and configs must be installed locally.
- ❌ **Ambiguous Ignore Patterns:** Do NOT rely on implicit ignore behavior. `options.warnIgnored` defaults to `true`, causing warnings when explicitly ignored files are passed to the CLI.
- ❌ **Inline Config in Strict Environments:** If `noInlineConfig` is set to `true`, developers MUST NOT use `/* eslint ... */` comments to modify rule severity.

## Enforcement

- **CLI Execution:**
  - Use `eslint [files]` to trigger linting.
  - Use `--config <file>` to bypass standard config lookup and enforce a specific file.
- **Strictness Flags:**
  - `--max-warnings <number>`: Forces exit code 1 if warnings exceed the threshold.
  - `--report-unused-disable-directives-severity error`: Escalates unused disable comments to hard failures.
- **Output Formatting:**
  - Default formatter is `stylish`.
  - Built-in machine-readable formatters: `json`, `html` (accessible via `--format`).

## Failure Modes

- **Violation Detection:** Severity 2 errors cause immediate pipeline failure (Exit 1).
- **Unmatched Patterns:** If a glob pattern finds no files (and `errorOnUnmatchedPattern` is not disabled), the process exits with an error.
- **Cache Stagnation:** Using a stale cache after plugin updates may result in false positives or negatives until the cache file is removed.
- **Circular Fixes:** Autofix logic may detect circular reference loops and abort.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Node.js version requirements)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- Map `severity: 2` to `EXIT_CODE=1`.
- Map `severity: 1` to `EXIT_CODE=0` (unless `max-warnings` set).
- If `pnpm` is used, verify `.npmrc` contains `public-hoist-pattern[]=*eslint*` or `node-linker=hoisted`.
- If `env.CI` is true, consider enforcing `--max-warnings=0`.

## Verification Checklist

- [ ] `eslint.config.js` exists in the project root.
- [ ] Pipeline script invokes `eslint` (not global).
- [ ] If caching is used, a step exists to invalidate it on `package.json` changes.
- [ ] `reportUnusedDisableDirectives` is configured (recommended).

## Non-Decisions

- This document does not mandate specific rule sets (e.g., Airbnb vs. Standard).
- This document does not define specific ignore patterns (e.g., `node_modules` is ignored by default, others are project-specific).

## Notes

- ESLint v9.0.0+ uses "Flat Config" by default; `eslintrc` is legacy.
- `eslint-plugin-` packages must be installed as peer dependencies.
- `eslint --init` can bootstrap configuration.
