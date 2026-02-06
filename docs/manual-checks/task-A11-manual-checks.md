# Task A11 — Manual Checks (Verification & Quality Gates)

Date: 2026-02-06

## Manual Verification Checklist

1. Open the workflow file at /forgea-monorepo/.github/workflows/verification-and-quality-gates.yml.
   - Confirm it runs on pull requests and pushes to main/master.
   - Confirm it uses Node.js 20.x.
   - Confirm it runs `pnpm install --frozen-lockfile`, `pnpm turbo run verify-and-lint`, and `pnpm turbo run build`.

2. Open /docs/official-docs/EPIC-A/turborepo.md.
   - Confirm it mentions the workflow path `.github/workflows/verification-and-quality-gates.yml`.
   - Confirm it states the CI package manager is pnpm and uses `pnpm install --frozen-lockfile`.

3. Open /docs/official-docs/EPIC-A/eslint-boundaries.md.
   - Confirm it lists ESLint 9.39.x and eslint-plugin-boundaries 4.2.x.
   - Confirm it documents CI invocation via `pnpm turbo run verify-and-lint` and that failures block the workflow.

4. Open /docs/official-docs/EPIC-A/prettier.md.
   - Confirm it lists Prettier 3.2.x.
   - Confirm it documents CI check-only mode and that failures block the workflow.

5. Open /docs/master_docs.md.
   - Confirm there are 2026-02-06 entries for A11 covering the workflow and the Turborepo/ESLint/Prettier doc extensions.
