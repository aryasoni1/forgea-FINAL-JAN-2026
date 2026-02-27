### Feature Summary

- EPIC-A / A5 — ESLint (Minimal & Safe): Create a minimal, pinned, shareable ESLint setup for the monorepo that enforces architectural boundaries and provides deterministic CI behavior. Deliver a precise task list for implementers and a NotebookLM question set for knowledge verification.

### Notebook Breakdown

- **Notebook: division_category/08-code-language-tooling-linters.md**
  - Source Links (verbatim excerpts found in this notebook):
    - https://eslint.org/docs/latest/use/
    - https://eslint.org/docs/latest/use/getting-started
    - https://eslint.org/docs/latest/use/configure/
    - https://eslint.org/docs/latest/use/configure/ignore
    - https://github.com/javierbrea/eslint-plugin-boundaries

### Targeted Questions (for NotebookLM review)

Beginner (Level 1) — aims at local setup and smoke checks (target notebook listed per question):

1. Based on the provided documentation, what is the minimal set of `pnpm` and `eslint` install commands and exact package names (including distinction between `eslint` vs. plugins) required to run `pnpm run lint` at workspace root? (Notebook: 08-code-language-tooling-linters.md)
2. Based on the provided documentation, which configuration format should be used for a shared config in this repo — Flat Config (`eslint.config.*`) or legacy `.eslintrc.*` — and what are the developer-visible tradeoffs? (Notebook: ESLint-Documentation.md)
3. Based on the provided documentation, what is the minimal `.eslintignore` content needed to avoid linting build outputs and node_modules in this monorepo? (Notebook: 08-code-language-tooling-linters.md)
4. Based on the provided documentation, how should `packages/config` expose a shareable ESLint config (file or package export) so `apps/*` can consume it via `extends`? (Notebook: 08-code-language-tooling-linters.md)
5. Based on the provided documentation, what quick CLI command can a developer run locally to reproduce the CI lint failure (`eslint: command not found`) and what common root causes should they check first? (Notebook: ESLint-Documentation.md)

Intermediate (Level 2) — integration, CI and packaging:

6. Based on the provided documentation, what exact `eslint` and `eslint-plugin-boundaries` installation/version-check questions must we ask NotebookLM to determine industry-compatible pins for TypeScript 5.9 and pnpm workspaces? (Notebook: 08-code-language-tooling-linters.md)
7. Based on the provided documentation, how must `tsconfig.json` `paths` and ESLint resolver settings be coordinated so editor linting and CI linting resolve modules identically across `apps/*` and `packages/*`? (Notebook: 08-code-language-tooling-linters.md)
8. Based on the provided documentation, what is the minimal workspace-level CI lint job (commands, frozen-install flags, expected exit codes) to enforce fail-fast behavior for lint errors? (Notebook: ESLint-Documentation.md)
9. Based on the provided documentation, how should `packages/config` be versioned and referenced (e.g., `@forgea/config` shareable config) so that consuming packages receive consistent rules without duplicating plugin installs? (Notebook: 08-code-language-tooling-linters.md)
10. Based on the provided documentation, what are the recommended steps to test `eslint-plugin-boundaries` rules locally (command sequence and sample pattern) to validate no-cross-app imports? (Notebook: 08-code-language-tooling-linters.md)

Senior (Level 3) — invariants, fail-closed and auditability:

11. Based on the provided documentation, what machine-checkable HARD-LOCK invariants must be enforced for this feature (e.g., `eslint` exit non-zero on boundary violations, audit logging of rule violations, CI gating), and where in the docs should those invariants be recorded? (Notebook: ESLint-Documentation.md)
12. Based on the provided documentation, what precise auditing and retention hooks (log format, required fields, retention period) should accompany attempts to bypass ESLint rules so infra can forensically trace policy violations? (Notebook: 08-code-language-tooling-linters.md)
13. Based on the provided documentation, what compatibility matrix questions must we ask to ensure chosen plugin versions do not break when TypeScript or Node versions are upgraded (what matrix entries are mandatory)? (Notebook: 08-code-language-tooling-linters.md)
14. Based on the provided documentation, what migration checklist must be prepared if the repo decides to move from legacy config to Flat Config (config files to change, CI adjustments, editor integration, and rollback steps)? (Notebook: ESLint-Documentation.md)
15. Based on the provided documentation, what acceptance criteria (exact files, CI job names, and exit codes) must be present before this feature is considered implemented and safe for HARD-LOCK enforcement? (Notebook: 08-code-language-tooling-linters.md)

### Manual Readiness Checklist

- Confirm `pnpm` and Node versions used by the repo and pin them in `/docs/toolchain-versions.md`.
- Ask NotebookLM (or docs-gatekeeper) to provide exact stable version pins for `eslint` and `eslint-plugin-boundaries` and record them in `/docs/official-docs/eslint-boundaries.md`.
- Create or extend `/packages/config` to export a shareable ESLint config (Flat or legacy) and add README with consumption example.
- Add a workspace-level `devDependency` pin for `eslint` (or ensure CI installs it at workspace level) and a `.eslintignore` at repo root.
- Add CI lint job that runs `pnpm install --frozen-lockfile` then `pnpm turbo run lint` and fails on non-zero exit.

---

Reference: This study guide consolidates the Code Scout report and Docs Gatekeeper brief for A5 — ESLint (Minimal & Safe).
