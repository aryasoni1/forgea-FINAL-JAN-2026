This comprehensive list of 50 questions is tailored based on the provided documentation regarding Turborepo, GitHub Actions, pnpm, and Terraform. They are categorized to challenge engineers at various stages of their career.

### Beginner Level (Foundational Concepts)

_Focus: Definitions, "How-to" basics, and understanding the core tools._

1. **What is a Monorepo?** Based on the Turborepo guides, how does it differ from a standard single-package repository?
2. **What is the purpose of a `turbo.json` file?**
3. **What is GitHub Actions?** Briefly explain the relationship between a workflow, a job, and a step.
4. **What is pnpm?** Why might a team choose it over npm or Yarn for managing dependencies?
5. **What is Infrastructure as Code (IaC)?** Use Terraform as an example to explain.
6. **How do you create a new repository on GitHub?** Mention the difference between creating from scratch vs. a template.
7. **What is a "Task Graph" in Turborepo?**
8. **What does the `uses` keyword do in a GitHub Actions workflow?**
9. **What is the `package.json` file?** Why is it essential for Node.js projects?
10. **What is a "Secret" in GitHub Actions?** Give one example of why you would use it.
11. **What is Terraform's "State"?** Why is it important to track?
12. **What is the purpose of a `.gitignore` file?**
13. **What is the difference between a Public and Private repository?**

### Junior Level (Implementation & Troubleshooting)

_Focus: Syntax, basic configuration, and following established workflows._

14. **How do you define task dependencies in Turborepo?** Explain the `^` (caret) symbol in the `dependsOn` array.
15. **How can you filter tasks in Turborepo?** Give a command example to run builds only for a specific package.
16. **What is the difference between a GitHub-hosted runner and a self-hosted runner?**
17. **How do you pass information between jobs in a GitHub Actions workflow?**
18. **In pnpm, what is the purpose of the `pnpm-workspace.yaml` file?**
19. **What are "Outputs" and "Inputs" in a Turborepo task definition?**
20. **How do you trigger a GitHub Actions workflow manually?** Which event is used?
21. **What is the Circuit Breaker pattern?** Based on the Martin Fowler article, what problem does it solve in distributed systems?
22. **Explain the `terraform plan` command.** What information does it provide the user?
23. **What is Git LFS (Large File Storage)?** When should an engineer decide to use it?
24. **How do you enable debug logging for a failing GitHub Actions workflow?**
25. **What is a "Ruleset" in GitHub?** How does it differ from traditional branch protection rules?

### Mid-Level (Optimization & Integration)

_Focus: Efficiency, security, and connecting different parts of the tech stack._

26. **How does Remote Caching work in Turborepo?** How does it improve CI/CD pipeline speeds?
27. **What is OIDC (OpenID Connect)?** Explain how it allows GitHub Actions to securely access cloud providers like AWS or Azure without long-lived secrets.
28. **Explain "Caching" vs. "Artifacts" in GitHub Actions.** When should you use one over the other?
29. **What is a "Composite Action"?** How does it help in reducing code duplication across multiple workflows?
30. **How do you handle environment variables in a monorepo?** Explain Turborepo's "Strict Mode" for environment variables.
31. **What is "Pruning" in the context of Turborepo and Docker?** Why is it necessary for efficient Docker builds?
32. **Explain how to use "Matrix Strategies" in GitHub Actions.** Provide a scenario where this is useful.
33. **What are pnpm "Catalogs"?** How do they help maintain dependency consistency across a large workspace?
34. **How do you manage Terraform providers?** Explain the `required_providers` block.
35. **What are "Deployment Environments" in GitHub?** How do they support features like "Required Reviewers"?
36. **Explain the concept of "Transit Nodes" in a Turborepo graph.**
37. **How does pnpm’s content-addressable storage save disk space?**
38. **In a Circuit Breaker implementation, what are the three states (Open, Closed, Half-Open)?** Describe the transition logic.

### Senior Level (Architecture, Strategy & Governance)

_Focus: Scalability, trade-offs, system reliability, and organizational standards._

39. **How would you design a CI/CD pipeline for a high-traffic monorepo?** Balance speed, cost, and safety using the tools mentioned.
40. **Evaluate the trade-offs of using "Internal Packages" (Just-in-Time) vs. "Compiled Packages" in a monorepo.**
41. **How do you enforce organization-wide workflow standards?** Mention GitHub "Workflow Templates" or shared actions.
42. **What is the security risk of a "Compromised Runner"?** What architectural steps can you take to mitigate this risk?
43. **Describe a strategy for "Phased Terraform Adoption" in a large enterprise.** How do you move from manual infra to fully automated IaC?
44. **How would you implement "SLSA Level 3" security?** Explain the role of "Artifact Attestations" in the software supply chain.
45. **What are "Deployment Protection Rules"?** How can you create a _custom_ rule using a GitHub App?
46. **How do you handle "State Locking" in a team environment using Terraform?**
47. **Explain the "Package Graph" vs. the "Task Graph".** How does an error in the package graph affect the performance of the task graph?
48. **When should you favor Branching over Forking for collaboration?** Justify based on repository management best practices.
49. **How do you manage "Concurrency" in deployments?** Why is it dangerous to have multiple deployment jobs running for the same environment simultaneously?
50. **What is the impact of a "Cascading Failure" in microservices?** How does the implementation of a Circuit Breaker prevent this at the infrastructure level?
    Beyond the conceptual and tool-specific questions already provided, the **`master_tasks_V1`** folder contains a highly detailed roadmap of a project's architecture, security protocols, and operational workflows.

Asking questions about this specific "notebook" of tasks will help you understand how a professional engineering team transitions from "using tools" to "building a secure, scalable product."

---

### Security & Compliance (Supply Chain & Beyond)

These questions focus on the advanced security features mentioned in the documentation for GitHub and the project epics.

1. **What is a Software Bill of Materials (SBOM)?** Based on the `docker scout` and GitHub Action docs, why is generating an SBOM critical for modern security compliance?
2. **How do "Artifact Attestations" protect against supply chain attacks?** Explain how they verify that the code running in production is exactly what was built in your CI pipeline.
3. **What is a "Kubernetes Admission Controller"?** How can it be used to block the deployment of any container image that doesn't have a verified attestation?
4. **Explain "Push Protection" in GitHub.** How does it prevent developers from accidentally committing secrets to a repository?
5. **How does "Secret Scanning" differ for public vs. private repositories?**

### Operational Strategy & Scalability

Focus on the "Day 2" operations—how to keep the system running and growing.

6. **What is "Configuration Drift"?** Based on the Terraform docs, how does HCP Terraform's automated drift detection help maintain infrastructure reliability?
7. **Compare "Horizontal" vs. "Vertical" scaling in the context of GitHub Runners.** When would you choose a "Larger Runner" over just adding more standard runners?
8. **What is the purpose of "Runner Groups"?** How do they help an organization manage which repositories have access to high-resource or secure self-hosted runners?
9. **How do you optimize "Task Launch Time" in Amazon ECS?** Mention strategies like image pull through caches or Fargate capacity providers.
10. **What are "Raft Consensus" principles in Docker Swarm mode?** Why is an odd number of manager nodes required for a healthy cluster?

### Project Governance (The "EPIC" Files)

The files in your `master_tasks_V1` directory outline a specific application lifecycle. These questions drill into that logic.

11. **How would you implement RBAC (Role-Based Access Control) in the "Authentication & RBAC" Epic?** What is the difference between an "Admin Session" and a standard user session in this architecture?
12. **Describe the "Push Flow" for a Lab Creation system.** Based on the Epics, how does the system move a lab from a "manual draft" to a "verified snapshot"?
13. **What is an "Anti-Cheat & Abuse Control System" in a lab environment?** What kind of heuristics or monitoring (CloudWatch/Logs) would you need to prevent users from mining crypto or attacking other systems?
14. **How does the "Hybrid Editor" abstraction work?** If the project uses Monaco (VS Code's editor), how do you sync the file system abstraction (`FS Abstraction`) with the backend storage?
15. **What is the role of a "Verification Engine" in educational labs?** How does the backend Integration Epic suggest we verify that a user has successfully completed a task?

### Advanced Tooling Integration

16. **How does an "API Gateway" integrate with OIDC?** Why is it safer to authenticate a frontend via a gateway than calling backend services directly?
17. **What is the "Dependency Lock File" in Terraform?** Why is it important to commit `.terraform.lock.hcl` to source control?
18. **Explain the transition from "Loose Mode" to "Strict Mode" in Turborepo.** What are the risks of staying in "Loose Mode" regarding environment variables?
19. **What is "Content Trust" in Docker?** How does setting `DOCKER_CONTENT_TRUST=1` change the way a junior engineer interacts with the CLI?
20. **How do "Custom Deployment Protection Rules" work?** Give a scenario where a GitHub App would be used to "gate" a deployment based on an external metrics check (like Datadog or Sentry).

---

### Which area should we explore next?

Would you like me to **deep-dive into one of these Epics** (like the Verification Engine) or **explain the technical implementation** of Artifact Attestations for your project?

## EPIC-A-A1: Repository & Structure

### [ ] Setup (Level 1)

-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Should `pnpm-workspace.yaml` include `services/*` when `package.json` `workspaces` already lists `services/*`? Please state the observable behaviors and recommended alignment steps.
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What exact `pnpm` CLI commands and `pnpm-workspace.yaml` schema validations should an engineer run to confirm workspace discovery is consistent across tools? (List commands and expected outputs.)
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Where should repository-level docs (`README.md`, `CONTRIBUTING.md`, `CODEOWNERS`) be placed in a monorepo to maximize discoverability and enforceability? Cite canonical locations.
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Which version of `pnpm` should be considered authoritative for workspace behavior when `packageManager` is already set in `package.json`? (If unspecified, request guidance.)
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What minimal verification checks should be added to CI to assert presence of repository README and CODEOWNERS? (e.g., file existence checks)

### [ ] Integration (Level 2)

-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: How should a CI job be structured to detect divergence between `pnpm-workspace.yaml` and `package.json` `workspaces`, and what remediation steps (automated PR or fail) are recommended?
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: When pinning Turborepo, which `turbo.json` fields and pipeline behaviors must be documented to avoid silent breaking changes during upgrades? Provide exact fields to lock or validate.
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What is the recommended layout and content for `/docs/official-docs/pnpm-workspaces.md` to support maintainers in diagnosing workspace resolution issues?
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: How should `tsconfig` inclusion decisions (root includes `apps/` vs per-app `tsconfig`) be validated for editor and CI consistency? (List verification steps.)
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Which automated checks should be added to CI to enforce that migrations and lockfile-sensitive directories (e.g., `packages/schema/prisma/migrations/`) are not modified without explicit approval? (Integration with CODEOWNERS or PR labels)

### [ ] Constraints (Level 3)

-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What fail-closed CI/branch-protection patterns are recommended to prevent workspace drift and enforce pinned tooling versions across developers? Include required policy triggers.
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: For HARD LOCK files and directories, what audit logs and immutable markers must be present to satisfy forensics and auditability requirements?
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What exact machine-checkable invariant definitions should the planner include in the task doc (e.g., `pnpm-workspace.yaml` equals `package.json` workspaces, `CODEOWNERS` present, `README.md` present, ESLint boundary rule exists and fails on cross-app import)?
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: When a toolchain version is listed as `VERSION UNKNOWN`, what question must be asked to the NotebookLM: "What is the industry-standard version/approach for [tool] when used with [pnpm/TypeScript/Turbo] in a monorepo?" — and how should answers be validated before pinning?
-- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What governance steps are required to declare a LOCK and who must sign off on changes to locked files (list roles and review types)?

## EPIC-A-A2: A2 — Package Manager & Workspace

### [ ] Setup (Level 1)

- Based on the provided documentation, what exact minimal file changes are required so that `pnpm-workspace.yaml` and root `package.json` `workspaces` are consistent (include example `pnpm-workspace.yaml` snippet that adds `services/*`)?
- Based on the provided documentation, what `pnpm` CLI commands should a developer run locally to verify workspace discovery and installed workspace packages, and what exact outputs indicate success? (e.g., `pnpm -v`, `pnpm -w recursive exec -- pnpm ls --depth 0`)
- Based on the provided documentation, what must be recorded in `/docs/toolchain-versions.md` to make `pnpm@10.28.1` effective across contributors (format and required fields)?
- Based on the provided documentation, what minimal `engines` or `packageManager` entries should be present in `package.json` to enforce environment constraints for CI and local development?
- Based on the provided documentation, what quick checklist can detect workspace drift before opening a PR (commands and expected exit codes)?

### [ ] Integration (Level 2)

- Based on the provided documentation, how should CI validate and fail on mismatches between `pnpm-workspace.yaml` and `package.json` `workspaces` (exact commands, job step names, and failure semantics)?
- Based on the provided documentation, what Turborepo settings and CI caching flags are recommended to ensure `turbo run` uses the same workspace graph as local runs (specific `turbo.json` fields and `pnpm` flags)?
- Based on the provided documentation, how should `services/*` be integrated with `tsconfig` project references and turbo pipeline definitions to avoid resolution errors? (List concrete file changes.)
- Based on the provided documentation, what packaging or release guidance should the planner include to avoid accidental hoisting or duplicate dependency installs across workspaces? (Minimal rules to follow.)
- Based on the provided documentation, what automated PR checks should exist to validate changes to workspace globs and lockfile-sensitive directories (exact checks and sample failure messages)?

### [ ] Constraints (Level 3)

- Based on the provided documentation, which HARD-LOCK invariants must be enforced for workspace correctness (e.g., `pnpm-workspace.yaml` matches `package.json` `workspaces`, `pnpm` version pinned, CI using `--frozen-lockfile`) and how should these be expressed as machine-checkable tests?
- Based on the provided documentation, what CI signals (exit codes and log artifacts) should trigger an emergency rollback process and whom should the system notify? (List minimum fields in notification payload.)
- Based on the provided documentation, what audit logs and immutable markers must be present for forensics when workspace changes impact build integrity (fields, retention guidance)?
- Based on the provided documentation, what compatibility validation must be performed before pinning a toolchain version labeled `VERSION UNKNOWN` (matrix entries and acceptance checks)?
- Based on the provided documentation, what roles and approval flows should be listed in the planner task to allow exceptions or emergency bypasses for workspace lock violations?

## EPIC-A-A3: A3 — Turborepo Setup

### [ ] Setup (Level 1)

- Based on the provided documentation, which exact `turbo.json` task fields currently present in `/forgea-monorepo/turbo.json` must be preserved by an implementer (list `build`, `dev`, `lint` and their observed properties) and where should the planner ask to document any changes? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what minimal `pnpm` and Node verification commands should be run in CI to reproduce a developer's environment for Turborepo runs (include `pnpm install --frozen-lockfile` and verification commands)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what are the risks of keeping `turbo` set to `latest` in `devDependencies` and what guidance should the planner include about pinning strategy? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what minimal `pnpm-workspace.yaml` change is necessary to include `services/*` in workspace discovery and what consequences should be documented? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what quick smoke tests (commands and expected outcomes) should be added to the test plan to validate that `turbo` tasks run correctly after workspace fixes? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### [ ] Integration (Level 2)

- Based on the provided documentation, what `turbo` caching and `outputs` conventions should be enforced across tasks to make remote caching safe and reliable in CI? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, how should CI validate `turbo` and `pnpm` versions (exact commands and failure semantics) before running `turbo run` steps? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what `turbo.json` adjustments (if any) should be suggested to make `lint` reproducible and cache-compatible (e.g., add `outputs` or `dependsOn`)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what documentation updates are required (files-to-change list) when pinning `turbo` and reconciling workspace globs? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what validation checks should be added to PRs that change `turbo.json` or `pnpm-workspace.yaml`? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### [ ] Constraints (Level 3)

- Based on the provided documentation, what HARD-LOCK invariants must be recorded for Turborepo (e.g., pinned `turbo` version, `pnpm-workspace.yaml` includes `services/*`, CI `--frozen-lockfile`) and how should these be expressed as machine-checkable tests? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what rollback and emergency-notification signals should CI produce if a `turbo` upgrade or workspace change breaks builds (exit codes, log artifacts, notification fields)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what audit logs and retention guidance should be implemented for Turborepo task failures impacting release pipelines? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what compatibility matrix must be checked before a `turbo` pin is chosen (mapping `turbo` ↔ Node ↔ pnpm ↔ TypeScript)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what formal acceptance criteria (files present, pinned versions recorded, CI jobs passing) must exist before enabling any HARD-LOCK enforcement for Turborepo? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

## EPIC-A-A7: A7 — Scripts & Commands

### [ ] Setup (Level 1)

- Based on the provided documentation, what exact root `package.json` scripts should exist to provide consistent developer workflows (build, dev, lint, test) and what should each delegate to (`turbo run ...` or per-package scripts)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, where should contributor-facing developer commands be documented (root `README.md` vs `.github/copilot-instructions.md`) and what minimal sections should the README include? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what minimal CI commands should be run to validate scripts (e.g., `pnpm install --frozen-lockfile`, `pnpm run lint`, `pnpm run build`) and what exit codes indicate success? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what quick checks should a contributor run locally to verify `turbo` delegation is wired correctly (commands and expected output examples)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, should a root `test` script be added mapping to `turbo run test` and what would be the advantages and caveats? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### [ ] Integration (Level 2)

- Based on the provided documentation, what PR checks should be added to validate changes to root scripts, per-package scripts, or `turbo.json` (exact checks and sample failure messages)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, how should per-package `test` scripts be aggregated by a root `test` command (if added) to provide sensible CI parallelism and caching behavior? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what documentation updates should be required when changing developer-facing scripts (files-to-change list)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what is the recommended CI job naming convention and stage order for install → lint → build → test? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, how should script-related failures be surfaced in CI to help contributors quickly triage (log excerpts, annotations, and links to the contributor docs)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### [ ] Constraints (Level 3)

- Based on the provided documentation, which HARD-LOCK invariants must be enforced for scripts and commands (e.g., root README present, CI uses `--frozen-lockfile`, root scripts delegate to turbo) and how should these be asserted automatically? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what emergency rollback process should be defined if a change to root scripts breaks the developer experience or CI (signals, notification payloads, and minimal remediation steps)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what audit logs and retention should be required for changes to root scripts and `turbo.json` in the repository? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what acceptance criteria (exact files, CI job names, and sample outputs) must be present before marking A7 complete? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
- Based on the provided documentation, what governance flow should be used to approve changes to root scripts and `turbo.json` (roles and review types)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

## EPIC-A-A8: A8 — Environment & Safety

### [ ] Setup (Level 1)

- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What minimal `.env` handling files should exist at repository root (e.g., `.env.example`, `.env.local.example`) and what exact variables must be documented to allow safe local development?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What exact steps should a developer run to verify environment variable coverage for CI vs local (commands to check and expected outputs)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Which environment variables are considered HARD LOCK (e.g., DATABASE_URL, SECRET_KEY) and how should their absence be detected and reported during local startup?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What is the recommended location and format for documenting environment safety practices (README section, `docs/` page, or `.github` guidance)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What minimal CI checks should be added to fail-fast on missing required env vars before running integration tests?

### [ ] Integration (Level 2)

- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: How should CI and local env var schemas be kept in sync (exact file names, validation commands, and tooling suggestions such as `dotenv-linter` or JSON schema validation)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What patterns should be used to inject secrets into GitHub Actions (OIDC vs secrets store) for the project, and what verification steps ensure no long-lived credentials are present?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: How should the repository detect accidental commits of env files or secrets (pre-commit hooks, GitHub push protection, or policy checks)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What are the operational steps to rotate critical secrets with minimal downtime and how should these be encoded in runbooks?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: How should environment-specific configuration (dev/staging/prod) be represented in the monorepo to avoid accidental cross-environment usage?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What HARD-LOCK invariants must be enforced around secrets and environment files (e.g., `.env` never committed, `.env.example` required, CI refuses to run if specific secrets missing) and how should these be expressed as machine-checkable tests?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What audit logs and retention policies must be present for secret access and rotation events to satisfy forensics requirements?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: What fail-closed behaviors should be implemented when an environment safety invariant is violated in CI or production (e.g., block deploy, trigger incident workflow)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: When a toolchain component reports `VERSION UNKNOWN` for an env-related tool (like dotenv-linter), what questions should be asked to NotebookLM to validate a recommended pin (compatibility matrix and validation steps)?
- Based on the provided documentation in `division_category/07-devops-ci-cd-infra-tooling.md`: Which roles must approve changes to environment and secrets handling (list approver roles and emergency bypass flow)?
## EPIC-A-A9: A9 — Developer Experience & Guardrails

### [ ] Setup (Level 1)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, which exact files must exist at repository root to declare runtime and editor guardrails (list `.nvmrc` or `.node-version`, `.editorconfig`, root `README.md`/`CONTRIBUTING.md`, and `package.json` `engines`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact Node semver should be placed in `.nvmrc` and `package.json` `engines` given `/docs/official-docs/node-version-policy.md` recommendations (request explicit semver if missing)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact Node semver should be placed in `.nvmrc` and `package.json` `engines` given `/docs/official-docs/node-version-policy.md` recommendations (request explicit semver if missing)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact entry should be added to the root `README.md` to onboard a new contributor (required commands and links to the node/editor docs)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, which files are explicitly protected by `.github/agents/implementer.md` and must not be changed by implementers without CODEOWNERS approval?

### [ ] Integration (Level 2)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI job(s) should be implemented to verify `.nvmrc` vs `node -v` in the runner and to fail PRs on mismatch (include job name suggestions and expected exit codes)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should Docker base images, CI images, and any `node:` tags be aligned with `.nvmrc` and `/docs/official-docs/node-version-policy.md`?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should service-level README instructions be reconciled with the new top-level onboarding doc to avoid contradicting developer steps?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should service-level README instructions be reconciled with the new top-level onboarding doc to avoid contradicting developer steps?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, how should machine-checkable invariants (exact commands and pass/fail criteria) be expressed in `/docs/tests/task-A9-tests.md`?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants must be declared (pinned Node range, pinned pnpm, turbo pin) and what CI behavior constitutes fail-closed enforcement?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what audit log fields (actor, file, old_value, new_value, timestamp, PR id) must be retained when a protected file is modified and what retention policy applies?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what emergency bypass procedure and sign-off roles must be documented for emergency changes to HARD-LOCKed files?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, when a `VERSION UNKNOWN` entry exists in `toolchain-versions.md`, what exact NotebookLM validation question should be used to determine an industry-standard pin for compatibility testing?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what formal acceptance criteria (file presence, CI job names, example PR that fails on mismatch) should be required before converting any recommendation into a HARD LOCK?
## EPIC-A-A10: A10 — Documentation & Architecture

### [ ] Setup (Level 1)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what exact repository files and paths must exist to record architecture decisions, tooling pins, and onboarding (e.g., `/docs/architecture.md`, `/docs/official-docs/*`, `toolchain-versions.md`, root `README.md`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what minimal metadata fields should an `architecture.md` include to be machine-readable (suggest frontmatter keys like `epic`, `feature`, `pins`, `hard_lock`)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what verification commands should a contributor run to confirm local toolchain alignment with `toolchain-versions.md` (exact shell commands)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what verification commands should a contributor run to confirm local toolchain alignment with `toolchain-versions.md` (exact shell commands)?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what supply-chain policy references must be included in the architecture doc (SLSA, artifact attestations)?

### [ ] Integration (Level 2)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI job(s) should exist to detect documentation drift (job names, commands to validate file presence and pin alignment)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what CI job(s) should exist to detect documentation drift (job names, commands to validate file presence and pin alignment)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what reconciliation steps should be documented to keep service-level READMEs and the top-level architecture doc consistent?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what artifact attestation checks should be referenced in the architecture doc and CI to support SLSA goals?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what machine-checkable acceptance tests should be added to `/docs/tests/task-A10-tests.md` (commands and expected exit codes)?

### [ ] Constraints (Level 3)

- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants (tool pins, protected files) must be declared in the task and what CI behavior enforces fail-closed semantics?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what HARD-LOCK invariants (tool pins, protected files) must be declared in the task and what CI behavior enforces fail-closed semantics?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, who are the approver roles for LOCKed architecture changes and what emergency bypass flow must be documented?
- Based on the provided documentation in `08-code-language-tooling-linters.md`: Based on the provided documentation, what compatibility matrix must be produced before approving major tooling upgrades (matrix axes: tool ↔ Node ↔ TypeScript ↔ pnpm)?
- Based on the provided documentation in `07-devops-ci-cd-infra-tooling.md`: Based on the provided documentation, what acceptance criteria and rollback plan must be included before converting a recommended pin into a HARD LOCK?
