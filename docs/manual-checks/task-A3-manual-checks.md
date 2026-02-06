# Manual Checks — Task A3

## 1) Verify Turborepo version pin

- Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
- Confirm `devDependencies.turbo` is set to 2.1.x.
- Result should show the pinned version, not `latest`.

## 2) Verify lint task policy in turbo.json

- Open [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json).
- Confirm `lint` has `cache: false` and does not include `outputs` or `dependsOn`.
- Result should match the lint task policy.

## 3) Verify remote cache policy in official docs

- Open [docs/official-docs/EPIC-A/A3_turborepo_official.md](docs/official-docs/EPIC-A/A3_turborepo_official.md).
- Confirm it states remote caching is optional, local caching is used, and remote cache is deferred.

## 4) Verify lint task policy in pipeline guidelines

- Open [docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md](docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md).
- Confirm it states lint tasks must have no outputs, no dependsOn, and cache disabled.

## 5) Verify schema validity reference

- Open [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json).
- Confirm the `$schema` points to the official Turborepo schema URL.
