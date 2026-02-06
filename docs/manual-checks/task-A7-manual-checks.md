# Task A7 — Manual Checks

## Goal

Manually confirm the monorepo’s root scripts, Turbo configuration, and documentation align with the A7 requirements.

## Checks

1. Open [forgea-monorepo/package.json](forgea-monorepo/package.json) and confirm:
   - `packageManager` is `pnpm@10.28.1`.
   - `devDependencies.turbo` is `^2.1.3`.
   - `scripts` includes `build`, `dev`, `lint`, and `test`, each calling `turbo run <task>`.
2. Open [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json) and confirm tasks include `build`, `dev`, `lint`, and `test`.
3. Open [forgea-monorepo/README.md](forgea-monorepo/README.md) and find the “Scripts & Commands” section:
   - Confirm it lists `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm test`.
   - Confirm it states Turbo delegation and mentions pnpm 10.28.1 and Turborepo ^2.1.3.
4. Open [docs/official-docs/EPIC-A/A7_scripts_official.md](docs/official-docs/EPIC-A/A7_scripts_official.md) and confirm the same script list and version pins appear there.
5. Open [docs/tests/task-A7-tests.md](docs/tests/task-A7-tests.md) and verify the test plan references the same scripts and versions.

## Optional Commands (if you want to spot-check locally)

- Run `pnpm -v` to confirm pnpm reports 10.28.1.
- Run `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm test` to observe Turbo invocation behavior.
