---
doc_id: prettier-ci-guidelines
tool: Prettier
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Prettier — CI Enforcement Guidelines

## Purpose

Governs the configuration, execution, and failure conditions for automated code formatting checks in Continuous Integration (CI) environments.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v3.x)

## Scope

- Applies to: CI pipeline steps, CLI execution flags (`--check`, `--list-different`), exit code interpretation, and version pinning.
- Does NOT apply to: Editor integrations, IDE-specific settings, or specific formatting option choices (e.g., tabs vs spaces).

## Official Sources (Binding)

- prettier-usage.md
- prettier.md
- prettier-configure.md

## Evidence Coverage Matrix

| Policy Area              | Source URL        | Version Covered | Status  |
| ------------------------ | ----------------- | --------------- | ------- |
| CI Execution Flags       | prettier-usage.md | v3.x            | COVERED |
| Exit Codes               | prettier-usage.md | v3.x            | COVERED |
| Version Pinning          | prettier-usage.md | v3.x            | COVERED |
| Ignore Logic             | prettier-usage.md | v3.x            | COVERED |
| Configuration Precedence | prettier-usage.md | v3.x            | COVERED |

## Version & Compatibility

- **Tool version:** v3.x (Context implies v3.0.0+ behavior, e.g., trailing comma defaults and removal of custom parser API),.
- **Related tooling compatibility:**
  - **Node.js:** v22.6.0+ required for native TypeScript configuration files.
  - **Package Manager:** `npm`, `yarn`, `pnpm`, or `bun` supported.

## Canonical Rules (Non-Negotiable)

- **Exact Version Pinning:** Projects MUST install an exact version of Prettier locally (via `save-exact`). Relying on `npx` without a local install is prohibited as it may download the latest version, causing inconsistent formatting across environments,.
- **CI Check Mode:** CI pipelines MUST use `--check` (or `--list-different`) to verify formatting without modifying files.
  - `prettier . --check` outputs human-friendly messages.
  - `prettier . --list-different` outputs only filenames.
- **Exit Code Determinism:**
  - **0:** Everything formatted properly.
  - **1:** Code style issues found (CI failure).
  - **2:** Runtime error (invalid config, syntax error, etc.).
- **Ignore Logic:**
  - Prettier respects `.prettierignore` in the project root.
  - Prettier respects `.gitignore` **if** it exists in the same directory where Prettier is run,.
  - Default ignores include `.git`, `.svn`, `.hg`, and `node_modules` (unless `--with-node-modules` is used).
- **Configuration Precedence:**
  - CLI options override configuration files by default (`--config-precedence cli-override`).
  - Configuration files are resolved starting from the file path and searching up the tree.

## Prohibited Configurations

- ❌ **Mutable Execution in CI:** Do NOT use `--write` in strict CI check steps (unless part of a specific auto-fix workflow like `git-format-staged`).
- ❌ **Ephemeral Execution:** Do NOT use `npx prettier` without a `package.json` dependency; this risks downloading newer, incompatible versions.
- ❌ **Debug Check Compatibility:** Do NOT combine `--write` with `--debug-check`.

## Enforcement

- **CLI Execution:**
  - `prettier . --check` triggers failure on unformatted code.
  - `prettier --check "app/**/*.test.js"` scopes the check to specific globs.
- **Pre-commit Hooks:**
  - `lint-staged` or `husky` MAY be used to enforce formatting before commit, reducing CI failures,.
- **Output:**
  - `--check` prints "[warn]" for unformatted files.
  - `--list-different` prints raw paths of unformatted files.

## Failure Modes

- **Formatting Violation:** If files are not formatted, the process exits with code **1**.
- **Invalid Syntax:** If the parser encounters a syntax error, the whole buffer/process may fail (Exit code 2),.
- **Config Not Found:** If `--config` is passed but the file does not exist, Prettier errors out.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Runtime versions)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `env.CI` is true, command MUST contain `--check` or `--list-different`.
- If `exit_code` == 1, action required is `prettier --write`.
- If `exit_code` == 2, action required is debug configuration/syntax.
- If `.prettierignore` is missing, verify `.gitignore` presence.

## Verification Checklist

- [ ] Prettier is listed in `devDependencies` with an exact version.
- [ ] CI pipeline script executes `prettier --check` (or equivalent).
- [ ] `.prettierignore` or `.gitignore` exists to prevent scanning build artifacts.
- [ ] `node_modules` is implicitly or explicitly ignored.

## Non-Decisions

- This document does not mandate specific formatting options (e.g., `semi`, `singleQuote`); those belong in the configuration file policy.
- This document does not select a specific pre-commit tool (Husky vs. simple-git-hooks).

## Notes

- `--debug-check` verifies that Prettier does not change the correctness of the code (AST comparison).
- `prettier --find-config-path <file>` helps debug which config file is being applied.
- `prettier --no-config` forces default settings, ignoring any config files.
