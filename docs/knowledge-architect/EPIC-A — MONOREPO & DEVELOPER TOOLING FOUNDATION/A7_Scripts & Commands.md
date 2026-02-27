### Feature Summary

- EPIC-A / A7 — Scripts & Commands: Produce a concise study guide and NotebookLM question set that captures the observed repo scripts facts and asks NotebookLM to validate conventions, CI expectations, and contributor documentation requirements. Do not change repository files; use Code-Scout facts only.

### Notebook Breakdown

- **Notebook: division_category/07-devops-ci-cd-infra-tooling.md**
  - Source Links (verbatim excerpts found in this notebook):
    - https://pnpm.io/
    - https://turbo.build/repo/docs
    - https://docs.github.com/en/actions

### Observed Repository Facts (from Code-Scout)

- Root `/forgea-monorepo/package.json` scripts:
  - `build`: "turbo run build"
  - `dev`: "turbo run dev"
  - `lint`: "turbo run lint"
  - `packageManager`: "pnpm@10.28.1" and `workspaces` include `apps/*`, `packages/*`, `services/*`.
- `/forgea-monorepo/.github/copilot-instructions.md` documents developer-facing commands (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`) but no conventional root `README.md` was found.
- No root `test` script mapping to `turbo run test` was observed; some apps define `test` locally.

### Targeted Questions (for NotebookLM review)

Beginner (Level 1)

1. Based on the provided documentation, what minimal root `package.json` script set should a monorepo include to provide consistent developer workflows (build, dev, lint, test) and where should those scripts delegate to Turborepo? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
2. Based on the provided documentation, what is the expected developer command sequence to set up and run the repo locally (`pnpm install`, `pnpm dev`), and what environment expectations should be documented in a repo `README.md`? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
3. Based on the provided documentation, what are the visibility and discoverability trade-offs of storing contributor commands in `.github/copilot-instructions.md` versus a root `README.md`? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
4. Based on the provided documentation, what quick checks can a contributor run to see if `turbo` delegation is wired correctly (commands and expected outputs)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
5. Based on the provided documentation, what minimal `pnpm` and `turbo` commands should CI run to validate scripts (install with frozen lockfile, run lint, run build), and what exit codes indicate success? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

Intermediate (Level 2)

6. Based on the provided documentation, should the monorepo add a root `test` script mapping to `turbo run test`, and what CI semantics and cache considerations would that imply? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
7. Based on the provided documentation, what is the recommended structure for documenting script conventions and per-package script naming to avoid collisions and ensure turbo orchestration works as intended? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
8. Based on the provided documentation, what automated PR checks should be added to ensure script changes (root `package.json`, per-package scripts, or `turbo.json`) include tests or CI smoke runs before merge? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
9. Based on the provided documentation, how should the planner document the expected behavior when a package-level `test` exists but no root `test` script is present (recommendation on aggregation or delegation)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
10. Based on the provided documentation, what are the minimal CI job names and steps to run `pnpm install --frozen-lockfile` and then `pnpm run lint` and `pnpm run build` reliably across runners? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

Senior (Level 3)

11. Based on the provided documentation, what machine-checkable invariants should be enforced for Scripts & Commands in a HARD-LOCK zone (e.g., presence of root scripts, frozen installs in CI, documented README), and how should CI assert them? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
12. Based on the provided documentation, what rollback or emergency process should be defined if a script change (e.g., changing `pnpm` lifecycle behavior) breaks developer workflows or CI (signals, notification fields, and remediation steps)? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
13. Based on the provided documentation, what acceptance criteria (exact files, CI job names, and sample command outputs) must be present before marking A7 complete? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
14. Based on the provided documentation, what documentation additions should be required (root `README.md` content, example `pnpm` commands, troubleshooting section) and where should they be recorded? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)
15. Based on the provided documentation, what governance and review steps must be required for approving changes to root scripts and `turbo.json` in a large monorepo? (Notebook: division_category/07-devops-ci-cd-infra-tooling.md)

### Manual Readiness Checklist

- Record observed facts from Code-Scout: root `package.json` scripts and `.github/copilot-instructions.md` path.
- Decide whether to add a root `test` script; document decision in planner task and add CI job if approved.
- Add a required README entry at repo root documenting `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`, and troubleshooting guidance.
- Add CI checks to run `pnpm install --frozen-lockfile`, `pnpm run lint`, and `pnpm run build` as part of pre-merge checks.

---

Reference: Code-Scout report `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md`.
