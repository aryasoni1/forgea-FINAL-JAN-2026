## EPIC-A-A9: A9 — Developer Experience & Guardrails

### [ ] Setup (Level 1)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, which exact files must exist at repository root to declare runtime and editor guardrails (list `.nvmrc` or `.node-version`, `.editorconfig`, root `README.md`/`CONTRIBUTING.md`, and `package.json` `engines`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact Node semver should be placed in `.nvmrc` and `package.json` `engines` given `/docs/official-docs/node-version-policy.md` recommendations (request explicit semver if missing)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what minimal `.editorconfig` keys must be present to stabilize cross-platform commits (`end_of_line`, `charset`, `indent_style`, `indent_size`, `trim_trailing_whitespace`, `insert_final_newline`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact entry should be added to the root `README.md` to onboard a new contributor (required commands and links to the node/editor docs)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, which files are explicitly protected by `.github/agents/implementer.md` and must not be changed by implementers without CODEOWNERS approval?

### [ ] Integration (Level 2)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI job(s) should be implemented to verify `.nvmrc` vs `node -v` in the runner and to fail PRs on mismatch (include job name suggestions and expected exit codes)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should Docker base images, CI images, and any `node:` tags be aligned with `.nvmrc` and `/docs/official-docs/node-version-policy.md`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should service-level README instructions be reconciled with the new top-level onboarding doc to avoid contradicting developer steps?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what CI checks should be added to fail PRs if `.editorconfig` is missing or differs from the canonical template?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should machine-checkable invariants (exact commands and pass/fail criteria) be expressed in `/docs/tests/task-A9-tests.md`?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants must be declared (pinned Node range, pinned pnpm, turbo pin) and what CI behavior constitutes fail-closed enforcement?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what audit log fields (actor, file, old_value, new_value, timestamp, PR id) must be retained when a protected file is modified and what retention policy applies?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what emergency bypass procedure and sign-off roles must be documented for emergency changes to HARD-LOCKed files?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, when a `VERSION UNKNOWN` entry exists in `toolchain-versions.md`, what exact NotebookLM validation question should be used to determine an industry-standard pin for compatibility testing?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what formal acceptance criteria (file presence, CI job names, example PR that fails on mismatch) should be required before converting any recommendation into a HARD LOCK?
