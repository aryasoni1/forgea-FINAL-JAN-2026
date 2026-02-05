---
doc_id: prettier-policy
tool: Prettier
version_pinned: true
change_sensitivity: LOW
lifecycle: ACTIVE
---

# Prettier — Formatting Policy

## Purpose

Governs the automated code formatting rules, configuration resolution logic, and ignore patterns to enforce consistent code style across the codebase without debate.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v3.x)

## Scope

- Applies to: Source code formatting for supported languages (JS, TS, CSS, HTML, JSON, Markdown, etc.), configuration files, and CI enforcement checks.
- Does NOT apply to: Logical code transformations, AST modifications (except strictly reversible formatting), or linter rules (code quality).

## Official Sources (Binding)

- prettier-configure.md
- prettier-usage.md
- prettier.md
- prettier-editor.md

## Evidence Coverage Matrix

| Policy Area                      | Source URL            | Version Covered | Status  |
| -------------------------------- | --------------------- | --------------- | ------- |
| Configuration Resolution         | prettier-configure.md | v3.x            | COVERED |
| Ignore Logic (`.prettierignore`) | prettier-usage.md     | v3.x            | COVERED |
| CI Enforcement (`--check`)       | prettier-usage.md     | v3.x            | COVERED |
| EditorConfig Integration         | prettier-configure.md | v3.x            | COVERED |
| Linter Integration               | prettier.md           | v3.x            | COVERED |

## Version & Compatibility

- **Tool version:** v3.x (Source references removal of APIs in v3.0.0 and v3.x specific features),.
- **Runtime Requirement:** Node.js (Version dependent on Prettier release; v3.x generally requires modern Node).
- **Related tooling compatibility:**
  - **ESLint:** Requires `eslint-config-prettier` to disable conflicting formatting rules.
  - **EditorConfig:** Supported, but overridden by Prettier config files.

## Canonical Rules (Non-Negotiable)

- **Configuration File Precedence:**
  - Prettier looks for configuration in the following order: `package.json` key, `.prettierrc` (JSON/YAML), `.prettierrc.js`/`.mjs`/`.cjs`, `prettier.config.js` variants, `.prettierrc.toml`.
  - Resolution searches up the directory tree from the file being formatted.
  - **NO Global Configuration:** Prettier intentionally does not support global configuration; projects must define their own config.
- **Option Freezing:** The set of formatting options is frozen; requests for new options are not accepted.
- **Ignore Logic:**
  - `.prettierignore` files use gitignore syntax.
  - Prettier follows `.gitignore` rules IF the file exists in the same directory where Prettier is run.
  - Default ignores: `.git`, `.svn`, `.hg`, and `node_modules` (unless `--with-node-modules` is specified).
- **Parser Inference:**
  - The `parser` option is automatically inferred from file paths.
  - `parser` MUST NOT be defined at the top level of the configuration; it is permitted ONLY within `overrides`.
- **Print Width Semantics:** `printWidth` is a guideline for preferred line length, NOT a hard upper limit (unlike linters' `max-len`).
- **CI Enforcement:** Continuous Integration pipelines MUST use the `--check` flag to verify formatting without modifying files,.

## Prohibited Configurations

- ❌ **Top-Level Parser Definition:** Defining `parser` at the root of the config disables automatic file extension inference for all files.
- ❌ **Global Config:** Reliance on user-specific or machine-global configuration is explicitly unsupported.
- ❌ **Linter Formatting Rules:** Linters (e.g., ESLint) MUST NOT enforce formatting rules (like `max-len`, `semi`) that conflict with Prettier; these must be disabled via `eslint-config-prettier`,.
- ❌ **Mixed Global/Local CLI Options:** CLI options override configuration files by default (`--config-precedence cli-override`).

## Enforcement

- **CI Behavior:**
  - `prettier . --check` outputs a list of unformatted files and exits with code **1** if any issues are found,.
  - Exit code **0** indicates all files are formatted correctly.
  - Exit code **2** indicates a runtime error.
- **CLI Behavior:**
  - `prettier --write .` rewrites files in place.
  - `--list-different` prints filenames of unformatted files and errors out, similar to `--check` but without the summary.
- **EditorConfig:**
  - If `.editorconfig` exists, Prettier parses `indent_style`, `indent_size`/`tab_width`, `end_of_line`, and `max_line_length` unless overridden by Prettier config,.

## Failure Modes

- **Unformatted Code in CI:** Pipeline fails (Exit 1) if code violates the configured style.
- **Syntax Errors:** Prettier fails to parse invalid code and aborts formatting for that file; it does not fix syntax errors.
- **Cache Invalidation:** If using `--cache`, the cache MUST be manually deleted when plugins are updated, as Prettier does not track plugin versions in cache keys.
- **Machine-Generated Files:** `package.json` and lockfiles are formatted using `JSON.stringify` rules, distinct from standard Prettier JSON formatting.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Node execution environment)
  - `/docs/official-docs/eslint-ci-guidelines.md` (Integration via `eslint-config-prettier`)
- Conflicts with:
  - Any linter policy enforcing stylistic rules (e.g., semicolons, quotes, indentation).

## Planner Extraction Hints (Non-Human)

- If `env.CI` is true -> COMMAND MUST CONTAIN `--check` or `--list-different`.
- If `parser` key exists in root config object -> INVALID CONFIGURATION.
- `printWidth` != `max_line_length` (Do not treat as strict limit).
- If `node_modules` is being formatted -> CHECK for `--with-node-modules` flag.

## Verification Checklist

- [ ] `.prettierrc` (or valid config variant) exists in project root.
- [ ] `.prettierignore` exists to exclude artifacts/coverage.
- [ ] CI pipeline executes `prettier --check`.
- [ ] `eslint-config-prettier` is installed if ESLint is used.
- [ ] No formatting-related rules exist in ESLint config.

## Non-Decisions

- This document does not mandate specific values for options (e.g., `semi: true` vs `false`); these are project-specific choices.
- This document does not define specific `overrides` for file types.

## Notes

- Prettier options are "frozen" and no new formatting options will be added.
- `prettier-ignore` comments can exclude specific blocks from formatting.
- Git hooks (via `husky` or `lint-staged`) are the recommended mechanism for preventing unformatted commits.
