Feature Summary:

- This feature ensures a reproducible developer environment and clear repository guardrails for EPIC-A by adding authoritative Node pinning and a canonical EditorConfig plus a top-level onboarding/CONTRIBUTING surface.

Notebook Breakdown:

1) Notebook: DevOps, CI/CD & Infra Tooling

- Source Links (verbatim from division_category/07-devops-ci-cd-infra-tooling.md):

https://docs.github.com/en/actions
https://docs.github.com/en/actions/get-started/quickstart
https://docs.github.com/en/actions/get-started/understand-github-actions
https://docs.github.com/en/actions/get-started/continuous-integration
https://docs.github.com/en/actions/get-started/continuous-deployment
https://docs.github.com/en/actions/get-started/actions-vs-apps
https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows
https://docs.github.com/en/actions/concepts/workflows-and-actions/variables
https://docs.github.com/en/actions/concepts/workflows-and-actions/contexts
https://docs.github.com/en/actions/concepts/workflows-and-actions/expressions
https://docs.github.com/en/actions/concepts/workflows-and-actions/reusing-workflow-configurations
https://docs.github.com/en/actions/concepts/workflows-and-actions/custom-actions
https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments
https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency
https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
https://docs.github.com/en/actions/concepts/workflows-and-actions/dependency-caching
https://docs.github.com/en/actions/concepts/workflows-and-actions/notifications-for-workflow-runs
https://docs.github.com/en/actions/concepts/runners/github-hosted-runners
https://docs.github.com/en/actions/concepts/runners/larger-runners
https://docs.github.com/en/actions/concepts/runners/self-hosted-runners
https://docs.github.com/en/actions/concepts/runners/runner-groups
https://docs.github.com/en/actions/concepts/runners/runner-scale-sets
https://docs.github.com/en/actions/concepts/runners/actions-runner-controller
https://docs.github.com/en/actions/concepts/runners/support-for-arc
https://docs.github.com/en/actions/concepts/security/secrets
https://docs.github.com/en/actions/concepts/security/github_token
https://docs.github.com/en/actions/concepts/security/openid-connect
https://docs.github.com/en/actions/concepts/security/artifact-attestations
https://docs.github.com/en/actions/concepts/security/script-injections
https://docs.github.com/en/actions/concepts/security/compromised-runners
https://docs.github.com/en/actions/concepts/security/kubernetes-admissions-controller
https://docs.github.com/en/actions/concepts/metrics
https://docs.github.com/en/actions/concepts/billing-and-usage
https://docs.github.com/en/actions/how-tos/write-workflows/use-workflow-templates

2) Notebook: Code / Language Tooling & Linters

- Source Links (verbatim from division_category/08-code-language-tooling-linters.md):

https://www.typescriptlang.org/docs/
https://zod.dev/
https://eslint.org/docs/latest/use/
https://prettier.io/docs/
https://editorconfig.org/

Targeted Questions (5 per seniority level per notebook). Each question begins with required phrase and indicates the notebook it targets.

DevOps, CI/CD & Infra Tooling — Beginner
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact local commands must a contributor run to verify the pinned Node version is active (`nvm`, `node -v`) and to confirm CI images use the same version?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, where should `.nvmrc` and Docker/CI image tags be recorded so CI and local environments are consistent?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI command should fail PRs when the runtime does not match the pinned Node semver, and what is the expected exit behavior?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what minimal CI job should verify `package.json` `engines.node` matches `.nvmrc` and `/docs/official-docs/node-version-policy.md`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what logs or error messages indicate a Node mismatch during install/build steps?

DevOps, CI/CD & Infra Tooling — Mid
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should the repo enforce Node pinning across CI, Docker images, and developer machines when multiple version managers exist (nvm/Volta/asdf)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what machine-checkable invariant should the task include to assert `package.json` `engines.node` is within the allowed range in `/docs/official-docs/node-version-policy.md`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what rollback behavior should CI implement if a pinned tooling upgrade causes CI-wide failures?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should the planner record canonical Node semver in `master_docs.md` and `toolchain-versions.md` to avoid conflicts?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, when a tool shows `VERSION UNKNOWN`, what exact NotebookLM question must be asked to validate an industry-standard pin?

DevOps, CI/CD & Infra Tooling — Senior
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants must the planner declare for runtime/tool pins (Node, pnpm, turbo) to ensure fail-closed behavior and what audit logs are required on violation?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, which files and CI signals must be added so Node mismatches are detected at PR time (file names and job names)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should CODEOWNERS and branch protections enforce reviewer approval for changes to `toolchain-versions.md`, `.nvmrc`, or `package.json` `engines`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what forensic traces (fields and retention) must be collected when a developer bypasses pinned tooling?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what governance roles must sign-off before converting a recommended Node pin into a HARD LOCK?

Code / Language Tooling & Linters — Beginner
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what minimal `.editorconfig` entries must exist to stabilize `end_of_line`, `charset`, `indent_style`, and `trim_trailing_whitespace` across the monorepo?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, where should a canonical `.editorconfig` live and how should CI validate it exists and matches `/docs/official-docs/editorconfig.md`?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what local editor steps (plugins/settings) are recommended to ensure EditorConfig is honored?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, how should Prettier and EditorConfig interact to avoid conflicts?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what merge conflicts are commonly prevented by a canonical `.editorconfig`?

Code / Language Tooling & Linters — Mid
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what CI checks should be added to fail PRs if `.editorconfig` is missing or differs from the canonical template?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, which Prettier keys must align with EditorConfig to avoid circular fixes and how should that harmonization be documented?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, how should formatting drift be measured and what thresholds trigger a repo-wide reformat?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what invariant should ensure the root `README.md` documents EditorConfig and Node pin clearly?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, how should service-level READMEs be reconciled with a new top-level `README.md` to avoid duplication?

Code / Language Tooling & Linters — Senior
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what acceptance criteria and audit hooks must exist before enabling a HARD LOCK on `.editorconfig` enforcement (CI job names, exit codes, and log retention)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what rollout plan minimizes churn when introducing a canonical EditorConfig to a large monorepo?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, which editor integrations or CI linters should be debugged first when formatting-only PRs fail?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what governance steps escalate EditorConfig or Node pin disputes to architecture owners?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what specific test cases must appear in `/docs/tests/task-A9-tests.md` to validate node/editor pins and onboarding documentation?

Manual Readiness Checklist:
- **Repository Node Pin:** Confirm `/forgea-monorepo/.nvmrc` exists and `package.json` `engines.node` matches the approved semver.
- **EditorConfig:** Confirm `/forgea-monorepo/.editorconfig` exists and CI has a failing check if mismatched.
- **Top-level Onboarding:** Confirm `/forgea-monorepo/README.md` or `/forgea-monorepo/CONTRIBUTING.md` documents setup and links to `/docs/official-docs/node-version-policy.md` and `/docs/official-docs/editorconfig.md`.
- **CI Enforcement:** Confirm CI job names `node-pin-check` and `editorconfig-check` are defined and fail PRs on mismatch.
- **Test Plan Location:** Confirm `/docs/tests/task-A9-tests.md` will contain the measurable acceptance tests.
