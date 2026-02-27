## EPIC-A-A11: A11 — Verification & Quality Gates

### [ ] Setup (Level 1)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, where should CI workflow files be placed in the repo for GitHub Actions and what minimal workflows must exist to run `verify`, `lint`, and `build`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact CI runner image tags should be recommended to match `toolchain-versions.md` and `.nvmrc` when executing verification tasks?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what minimal secrets or environment variables must CI provide to allow verification artifacts to be persisted (DB URL, API token, artifact storage key)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, where should the CI store verification artifacts (artifact store vs DB) and what access controls must be applied?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what minimal example commands should a CI workflow run to exercise the `verify-and-lint` step reproducibly?

### [ ] Integration (Level 2)

- Based on the provided documentation in `14-testing-qa.md`: Based on the provided documentation, how should unit/integration/e2e test outputs be packaged and uploaded so verification logs can reference them (formats: junit XML, coverage, screenshots)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should `turbo` tasks be invoked in CI to ensure workspace-aware execution and correct caching across runs?
- Based on the provided documentation in `14-testing-qa.md`: Based on the provided documentation, what acceptance thresholds (pass rates, no new failures) should be used to mark verification success?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what supply-chain attestation steps (optional) should be referenced when producing verification artifacts for production releases?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what notification and annotation strategy should CI use to surface verification failures in PRs and issue trackers?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants should the planner require before enabling blocking verification checks (workflow location, check names, protected branches)?
- Based on the provided documentation in `14-testing-qa.md`: Based on the provided documentation, what retention policy and audit fields must be recorded for verification artifacts to satisfy forensics and compliance?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what emergency bypass and sign-off procedures must be documented for cases where verification gates must be temporarily disabled?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what machine-checkable acceptance criteria should appear in `/docs/tests/task-A11-tests.md` to validate CI wiring and artifact persistence?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what governance steps and role approvals are required to convert a recommended verification workflow into a HARD-LOCKed gate?
