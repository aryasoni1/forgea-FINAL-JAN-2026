### Feature Summary

- EPIC-A / A3 — Turborepo Setup: Produce a minimal, authoritative task document and study guide describing the expected Turborepo configuration for the monorepo, and surface the exact repository facts the implementer must follow (no changes here; facts come from code-scout). Focus on deterministic tooling, pinned versions (where gatekeeper approves), and workspace consistency.

### Notebook Breakdown

- **Notebook: division_category/07-devops-ci-cd-infra-tooling.md**
  - Source Links (verbatim excerpts found in this notebook):
    - https://pnpm.io/
    - https://pnpm.io/workspaces
    - https://turbo.build/repo/docs
    - https://nodejs.org/

### Observed Repository Facts (from Code-Scout)

- `/forgea-monorepo/turbo.json` exists and defines `tasks`: `build` (dependsOn `^build`, outputs [".next/**","dist/**"]), `dev` (`cache: false`), and `lint` (empty object). File uses the official Turborepo schema.
- Root `/forgea-monorepo/package.json` scripts: `build`, `dev`, `lint` map to `turbo run build|dev|lint`. `packageManager` set to `pnpm@10.28.1`. `devDependencies` includes `turbo` set to `latest` and `typescript` set to `5.9.3`.
- `/forgea-monorepo/pnpm-workspace.yaml` lists `packages:` `- apps/*` and `- packages/*` but does NOT include `services/*` (mismatch with `package.json` `workspaces` which includes `services/*`).
- No explicit pinned `turbo` version found (uses `latest`). `turbo.json` `lint` task has no `outputs` or `dependsOn`.

### Targeted Questions (for NotebookLM review — all start with required phrase)

Beginner (Level 1)

1. Based on the provided documentation, which Turborepo config file (`turbo.json` vs `turbo.config.*`) should be considered canonical in this repo and why? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
2. Based on the provided documentation, what minimal `pnpm` and Node commands should a developer run to reproduce a fresh, CI-like install for Turborepo (`pnpm install --frozen-lockfile` and verification commands)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
3. Based on the provided documentation, what are the observable consequences of having `turbo` set to `latest` in `devDependencies` rather than a pinned version? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
4. Based on the provided documentation, what minimal entries must `pnpm-workspace.yaml` contain to ensure `services/*` packages participate in workspace linking and hoisting? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
5. Based on the provided documentation, what quick local checks can developers run to confirm `turbo run lint` will be executed by root scripts (commands and expected outputs)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

Intermediate (Level 2)

6. Based on the provided documentation, what Turborepo `tasks` fields are required for stable CI behavior (e.g., `outputs`, `dependsOn`, `cache`), and what should be added to the `lint` task to make it consistent with `build`/`dev` expectations? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
7. Based on the provided documentation, how should `turbo` be version-pinned in `devDependencies` and documented (where to record the pinned version once Docs Gatekeeper approves)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
8. Based on the provided documentation, how must `pnpm-workspace.yaml` and `package.json` `workspaces` be validated in CI to ensure they remain in sync (exact commands and job failure semantics)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
9. Based on the provided documentation, what Turborepo caching and remote cache configuration recommendations should be considered for this monorepo to speed CI while preserving correctness? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
10. Based on the provided documentation, what `turbo.json` fields (and example values) should the planner ask NotebookLM about when deciding whether to enable remote caching vs local only? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

Senior (Level 3)

11. Based on the provided documentation, what machine-checkable HARD-LOCK invariants should be recorded for Turborepo (e.g., pinned `turbo` version present, `pnpm-workspace.yaml` includes `services/*`, CI uses `--frozen-lockfile`) and where in the docs should these invariants be recorded? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
12. Based on the provided documentation, what exact acceptance criteria (files, `turbo.json` task fields, root scripts, and CI job names) must be present before the planner marks A3 complete? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
13. Based on the provided documentation, what rollback or emergency process should be defined if a `turbo` upgrade (when pinned) breaks CI (signals, notification payload, and minimum remediation steps)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
14. Based on the provided documentation, what compatibility matrix entries must be checked before pinning `turbo` (turbo vs Node vs pnpm vs TypeScript versions)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
15. Based on the provided documentation, what formal test plan location and test cases should be included to validate Turborepo setup (where to place tests and minimal sample tests)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### Manual Readiness Checklist

- Confirm current facts from Code-Scout: `turbo.json` tasks and root `package.json` contents; include those file paths in the planner task.
- Request Docs Gatekeeper to provide an approved pinned `turbo` version; do NOT pin until gatekeeper approves.
- Update `/docs/toolchain-versions.md` with `turbo` pinned version (once approved) and ensure `packageManager` `pnpm@10.28.1` is recorded.
- Ensure `/forgea-monorepo/pnpm-workspace.yaml` includes `services/*` to align with `package.json` `workspaces` (planner to decide canonical source-of-truth).
- Add CI job steps to validate workspace sync and a `turbo` smoke test that runs `turbo run build` and `turbo run lint` in a frozen-install environment.

---

Reference: Code-Scout report `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md` and Orchestrator output at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md`.
