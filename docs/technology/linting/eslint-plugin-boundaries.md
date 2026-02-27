# eslint-plugin-boundaries

- Category: Linting / Architecture
- Epics: A
- Version / Requirement: Pin required
- Intent / Critical Decision: Provide deterministic architectural import-boundary enforcement across the monorepo (no-cross-app imports).

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A5 — ESLint)
- EPIC-A intent: Use a pinned boundary enforcement plugin (example: `eslint-plugin-boundaries`) to encode and enforce repository import zones and allowed exceptions.
- Important points:
  - Pin both `eslint` and the boundary plugin versions in `devDependencies` to ensure deterministic rule behavior in CI and local dev.
  - Decide on a canonical config format (Flat config vs legacy `.eslintrc.*`) and host the shared config in `packages/config`.
  - Provide example zone definitions and include a CI lint job that fails on boundary violations.
  - Document migration/testing steps for rule changes and an exception process for allowed cross-zone imports.
