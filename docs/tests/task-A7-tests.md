# Task A7 — Tests

## Scope

Verify the monorepo’s root scripts and documentation align with the A7 task requirements, including Turbo delegation and tooling pins.

## References

- Task document: [docs/tasks/task-A7-2026-02-06.md](docs/tasks/task-A7-2026-02-06.md)
- Root manifest: [forgea-monorepo/package.json](forgea-monorepo/package.json)
- Turbo configuration: [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json)
- Root README: [forgea-monorepo/README.md](forgea-monorepo/README.md)
- Official scripts doc: [docs/official-docs/EPIC-A/A7_scripts_official.md](docs/official-docs/EPIC-A/A7_scripts_official.md)

## Happy Path Checks

- Confirm `package.json` includes root scripts `build`, `dev`, `lint`, `test` and each maps to `turbo run <task>`.
- Confirm `package.json` pins `packageManager` to pnpm 10.28.1 and `turbo` to `^2.1.3`.
- Confirm `turbo.json` defines tasks for `build`, `dev`, `lint`, and `test`.
- Confirm README lists `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm test` with Turbo delegation and pinned versions.
- Confirm the official scripts doc repeats the same script list and tooling pins.

## Failure Cases

- Remove `test` from root scripts and confirm the documentation no longer matches the manifest (expected mismatch, not allowed).
- Change the Turbo pin away from `^2.1.3` in any manifest or doc and confirm version consistency fails.

## Abuse / Bypass Cases

- Attempt to add a new root script without a matching Turbo task definition; verify the inconsistency is detectable by comparing `package.json` to `turbo.json`.
- Attempt to document a root script that does not exist in `package.json`; verify the mismatch is detectable via README/doc checks.

## Invariants to Verify

- Root scripts retain Turbo delegation for `build`, `dev`, and `lint` while adding `test`.
- Tooling pins remain pnpm 10.28.1 and Turborepo `^2.1.3` across all references.
- README remains the canonical contributor-facing guide for scripts.
