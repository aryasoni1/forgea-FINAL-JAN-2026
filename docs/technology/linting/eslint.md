# ESLint

- Category: Linting
- Epics: A, K
- Version / Requirement: Pin required
- Intent / Critical Decision: Deterministic lint rules and CI gating.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Enforce minimal, safe linting and architectural import boundaries across the monorepo.
- Important points: Pin `eslint` and `eslint-plugin-boundaries` (or chosen equivalent), decide Flat vs legacy config format, host shared config (e.g., `packages/config`) and document CI lint gating.
