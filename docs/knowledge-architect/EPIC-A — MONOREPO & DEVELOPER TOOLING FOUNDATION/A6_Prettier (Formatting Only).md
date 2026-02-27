Feature Summary:

- A6 — Prettier (Formatting Only) ensures a single, version-pinned Prettier configuration and CI enforcement across the monorepo to guarantee consistent formatting and reduce churn.
- This study guide lists the NotebookLM sources, targeted Notebook questions (junior/mid/senior) required for Planner-led decisions, and a manual readiness checklist for implementers.

Notebook Breakdown:

- **DevOps, CI/CD & Infra Tooling**
  - Source Links:
    - https://docs.github.com/en/actions
    - https://pnpm.io/cli/dlx
    - https://turbo.build/docs/guides/ci-vendors/github-actions
  - Targeted Questions (mapped to this notebook):
    - Based on the provided documentation in 07-devops-ci-cd-infra-tooling.md: What exact CI commands and workflow steps should be used to reliably `check` Prettier formatting and fail CI on format drift? (Beginner/Intermediate)
    - Based on the provided documentation in 07-devops-ci-cd-infra-tooling.md: How should caching and workspace-aware invocation (`pnpm -w dlx` vs pinned workspace dependency) be configured to keep CI fast and reproducible? (Intermediate)
    - Based on the provided documentation in 07-devops-ci-cd-infra-tooling.md: What fail-closed remediation steps should the CI present to contributors (e.g., suggested commands, auto-format commit options)? (Intermediate)
    - Based on the provided documentation in 07-devops-ci-cd-infra-tooling.md: For HARD-LOCKed formatting invariants, what logs and audit traces must be retained and where should they be surfaced for forensics? (Senior)
    - Based on the provided documentation in 07-devops-ci-cd-infra-tooling.md: How should the Planner express Prettier version pinning requirements in CI manifests and master docs to ensure enforceability? (Senior)

- **Code / Language Tooling & Linters**
  - Source Links:
    - https://prettier.io/docs/
    - https://prettier.io/docs/sharing-configurations
    - https://prettier.io/docs/integrating-with-linters
    - https://eslint.org/docs/latest/use/configure/
  - Targeted Questions (mapped to this notebook):
    - Based on the provided documentation in 08-code-language-tooling-linters.md: Which repository file paths and names constitute the canonical Prettier policy for this monorepo (root `.prettierrc`, optional `packages/*/.prettierrc`, and `.prettierignore`), and what precedence rules apply? (Beginner)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: How does pinning Prettier as a root `devDependency` differ from invoking it via `pnpm -w dlx prettier` on contributor machines and CI, in terms of reproducibility and security? (Beginner)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: What minimal root `.prettierrc` example should Planner recommend (lineWidth, tabWidth, singleQuote, trailingComma) and where should that example be recorded in `/docs/official-docs/prettier.md`? (Junior)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: What is the recommended ordering and config to harmonize Prettier with ESLint (e.g., use `eslint-config-prettier`, `eslint-plugin-prettier`, and autofix ordering) to avoid circular fixes? (Mid)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: What step-by-step migration plan should be used to introduce a pinned Prettier version into a large monorepo with minimal churn (staged formatting, lockfile pinning, CI checks, and rollouts)? (Mid)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: What policy should govern Prettier version bumps (approval workflow, compatibility tests, and rollback plan) for senior maintainers? (Senior)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: For HARD LOCK invariants concerning formatting, what machine-checkable invariants and audit hooks must the Planner include (e.g., CI exit code non-zero on format drift, PR-level enforcement, and retention of format-check logs)? (Senior)
    - Based on the provided documentation in 08-code-language-tooling-linters.md: How should the Planner decide between a single root config versus per-package overrides to balance consistency and package autonomy, and what measurable checks will validate the chosen approach? (Senior)

Manual Readiness Checklist:

- **Docs:** Create `/docs/official-docs/prettier.md` capturing the pinned Prettier version (exact semver), recommended `.prettierrc` values, and editor integration notes.
- **Docs CI:** Create `/docs/official-docs/prettier-ci-guidelines.md` with exact CI commands to `check` and (optionally) auto-format, plus caching guidance.
- **Repo Config:** Add canonical `.prettierrc` at repo root and a `.prettierignore` capturing build artifacts and generated files.
- **Dependency:** Pin Prettier version in root `devDependencies` or document `pnpm -w dlx` usage in CI and developer onboarding.
- **ESLint Harmony:** Verify and include `eslint-config-prettier` and/or `eslint-plugin-prettier` guidance in the Planner document to prevent circular fixes.
- **CI Enforcement:** Add a CI workflow job to run the chosen Prettier `--check` command and fail PRs on drift.
- **Approval Artifact:** Include a Docs Gatekeeper approval link (this guide) and add required master docs registry entries as specified by Gatekeeper.
