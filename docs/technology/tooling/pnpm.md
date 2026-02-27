# pnpm

- Category: Tooling
- Epics: A, E, J
- Version / Requirement: 10.29.x
- Intent / Critical Decision: Workspace manager; enforces frozen-lockfile.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Canonical workspace manager for the monorepo (pin to pnpm@10.28.1), deterministic installs, and CI `--frozen-lockfile` enforcement.
- Important points: Ensure `pnpm-workspace.yaml` aligns with `package.json.workspaces`; document CI commands and Corepack usage; add `pnpm` entry to master docs.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Ensure cloned lab packages are discovered by the monorepo and installed deterministically in verification and CI runs.
- Important points:
  - Require cloned labs include a valid `package.json` with `name` and `version`, and ensure `pnpm-workspace.yaml` globs cover `packages/lab-templates/**` or the target clone destination used by the Integration Checker.
  - Document CI install semantics (`pnpm install --frozen-lockfile`) for verification runners and provide guidance for adding newly-cloned packages to the workspace during CI (automation scripts or workspace manifest updates).
  - Recommend publishing a short `pnpm` compatibility note for template authors (required `packageManager` field, peer deps, supported Node versions) to avoid install or link-time surprises.
