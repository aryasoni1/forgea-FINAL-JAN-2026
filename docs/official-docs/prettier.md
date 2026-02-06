# Prettier — Repository Formatting Authority

**Canonical version:** `3.2.x` (pin exact patch per toolchain policy; repository uses `prettier@3.2.0`).

## Purpose

Prettier is the single formatting authority for the Forgea monorepo. Its configuration and ignored paths are canonical at the repository root.

## Files

- `/forgea-monorepo/.prettierrc` — canonical formatting settings (JSON).
- `/forgea-monorepo/.prettierignore` — files and folders excluded from formatting.

## Key settings (summary)

- printWidth: 100
- tabWidth: 2
- singleQuote: true
- trailingComma: all
- endOfLine: lf

(See `/forgea-monorepo/.prettierrc` for full options.)

## Editor integration

- Recommend installing the Prettier extension for VS Code and enabling "Format on Save".
- Set editor to use project Prettier: the VS Code Prettier extension auto-detects the workspace Prettier binary when the repo has `prettier` in devDependencies.

## Conflicts with ESLint

- Prettier is the sole formatting tool. ESLint should not contain conflicting stylistic rules (see ESLint docs in `/docs/official-docs/eslint-ci-guidelines.md`).
