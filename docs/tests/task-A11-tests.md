# Task A11 — Test Plan (Verification & Quality Gates)

Date: 2026-02-06

## Scope

- Validate the repository CI workflow defined in `.github/workflows/verification-and-quality-gates.yml`.
- Ensure the workflow runs `turbo run verify-and-lint` and `turbo run build` on Node.js 20.x.
- Confirm failure behavior for lint/verification and formatting checks aligns with the documented tool versions.

## Happy Paths

1. Run the same commands locally from the repo root:
   - `pnpm install --frozen-lockfile`
   - `pnpm turbo run verify-and-lint`
   - `pnpm turbo run build`
     Expected: commands exit with code 0 when the repo is clean and passes lint/verification/build.

2. Validate Prettier check mode locally:
   - `pnpm prettier:check`
     Expected: command exits with code 0 when formatting is compliant.

## Failure Cases

1. Introduce a lint violation in a known linted file.
   - Run `pnpm turbo run verify-and-lint`.
     Expected: command exits non-zero and would fail the CI workflow.

2. Introduce a formatting violation in a formatted file.
   - Run `pnpm prettier:check`.
     Expected: command exits non-zero and would fail the CI workflow.

3. Break a build prerequisite (e.g., syntax error in a build target).
   - Run `pnpm turbo run build`.
     Expected: command exits non-zero and would fail the CI workflow.

## Abuse / Bypass Cases

1. Attempt to bypass lint by running only `pnpm turbo run build`.
   Expected: the CI workflow still runs `verify-and-lint` and fails if lint errors exist.

2. Attempt to format via `--write` in CI.
   Expected: CI uses check-only mode and does not rewrite files.

## Invariants

- Node.js 20.x is the runtime used for verification gates.
- Turborepo is pinned to 2.1.3 and runs the same tasks in CI as locally.
- ESLint 9.39.x with eslint-plugin-boundaries 4.2.x is enforced.
- Prettier 3.2.x runs in `--check` mode and fails the workflow on violations.
- Remote cache is not required; local-only caching is the default.
