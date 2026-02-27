# TypeScript

- Category: Language
- Epics: A, K, J
- Version / Requirement: 5.9.x
- Intent / Critical Decision: Canonical compiler behavior and project references.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Provide a pinned TypeScript baseline (5.9.3), canonical `tsconfig.base.json`, and project references for incremental builds.
- Important points: Document allowed per-package overrides, confirm `moduleResolution: "Bundler"` and `target: ES2022` compatibility with bundlers, and add CI type-check commands.
