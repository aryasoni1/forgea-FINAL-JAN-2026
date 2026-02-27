# Turborepo

- Category: Tooling
- Epics: A, E, F
- Version / Requirement: 2.8.x
- Intent / Critical Decision: Update: v2.8 significantly improves AI-agent task caching.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Orchestrate monorepo tasks, pipeline definitions and caching; avoid using `turbo: "latest"` — pin an exact semver.
- Important points: Pin `turbo` version before implementation; document `turbo.json` schema, declared `outputs`, remote cache strategy, and CI invocation patterns.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Integrate cloned labs into the `turbo` dependency graph so verification tasks run automatically and cache behaves predictably.
- Important points:
  - Document how template packages should declare `build`/`verify` tasks and expected `outputs` so `turbo` can detect and run verification tasks (`turbo run verify-lab --filter=...`).
  - Recommend pinning `turbo` in templates' devDependencies and include a short `turbo.json` example for template authors that declares `pipeline.verify` and `pipeline.test` tasks used by the Integration Checker.
  - Include guidance for CI cache keys and remote cache configuration so verification artifacts from earlier runs are reused where appropriate without leaking sensitive test fixtures.
