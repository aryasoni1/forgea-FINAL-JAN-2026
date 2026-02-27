## EPIC-A-A10: A10 — Documentation & Architecture

### [ ] Setup (Level 1)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact repository files and paths must exist to record architecture decisions, tooling pins, and onboarding (e.g., `/docs/architecture.md`, `/docs/official-docs/*`, `toolchain-versions.md`, root `README.md`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what minimal metadata fields should an `architecture.md` include to be machine-readable (suggest frontmatter keys like `epic`, `feature`, `pins`, `hard_lock`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what verification commands should a contributor run to confirm local toolchain alignment with `toolchain-versions.md` (exact shell commands)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, where should shared linter/formatter config be documented so editors and CI pick it up automatically (`packages/config`, `/docs/master_docs.md`)?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what supply-chain policy references must be included in the architecture doc (SLSA, artifact attestations)?

### [ ] Integration (Level 2)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI job(s) should exist to detect documentation drift (job names, commands to validate file presence and pin alignment)?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, how should the linter/formatter policy be validated across workspace packages in CI (workspace-aware invocation examples)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what reconciliation steps should be documented to keep service-level READMEs and the top-level architecture doc consistent?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what artifact attestation checks should be referenced in the architecture doc and CI to support SLSA goals?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what machine-checkable acceptance tests should be added to `/docs/tests/task-A10-tests.md` (commands and expected exit codes)?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants (tool pins, protected files) must be declared in the task and what CI behavior enforces fail-closed semantics?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what mandatory audit log fields and retention policies must be recorded when LOCKed architecture files are changed?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, who are the approver roles for LOCKed architecture changes and what emergency bypass flow must be documented?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what compatibility matrix must be produced before approving major tooling upgrades (matrix axes: tool ↔ Node ↔ TypeScript ↔ pnpm)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what acceptance criteria and rollback plan must be included before converting a recommended pin into a HARD LOCK?
