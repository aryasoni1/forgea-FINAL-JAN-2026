# Manual Checks — Task A5 (ESLint Minimal & Safe)

## 1) Confirm shared ESLint config exists

- Open /forgea-monorepo/packages/config/eslint.config.js.
- Verify it contains the Flat Config array with `eslint-plugin-boundaries` and element rules.
- Check that `apps/`, `packages/`, and `services/` globs appear in the `files` section.

## 2) Confirm root config points to shared config

- Open /forgea-monorepo/eslint.config.js.
- Verify it imports from `./packages/config/eslint.config.js` and exports that config.

## 3) Confirm lint scripts reference shared config

- Open /forgea-monorepo/apps/forgea-labs/package.json.
- Verify a `lint` script exists and uses `--config ../../packages/config/eslint.config.js`.
- Open /forgea-monorepo/packages/audit/package.json.
- Verify a `lint` script exists and uses `--config ../config/eslint.config.js`.
- Open /forgea-monorepo/packages/schema/package.json.
- Verify a `lint` script exists and uses `--config ../config/eslint.config.js`.
- Open /forgea-monorepo/packages/config/package.json.
- Verify a `lint` script exists and uses `--config ./eslint.config.js`.

## 4) Confirm version pins in docs

- Open /docs/official-docs/EPIC-A/eslint-boundaries.md.
- Verify it lists ESLint 9.39.x and eslint-plugin-boundaries 4.2.x and the canonical config location.

## 5) Confirm CI guidance updates

- Open /docs/official-docs/EPIC-A/eslint-ci-guidelines.md.
- Verify it mentions `pnpm install --frozen-lockfile`, the root lint invocation path, and the remediation steps for `eslint: command not found`.

## 6) Confirm master docs registry entries

- Open /docs/master_docs.md.
- Verify the A5 entries exist for:
  - /docs/official-docs/EPIC-A/eslint-boundaries.md
  - /docs/official-docs/EPIC-A/eslint-ci-guidelines.md
