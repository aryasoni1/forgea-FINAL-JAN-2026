# Manual Checks — Task A6 (Prettier Formatting Only)

## 1) Confirm Prettier dependency and scripts

- Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
- Verify `devDependencies` includes `prettier` pinned to `3.2.0`.
- Verify the `scripts` section includes `prettier:check` and `prettier:write` using `pnpm -w exec` and the shared glob.

## 2) Confirm canonical config and ignore files

- Check that [forgea-monorepo/.prettierrc](forgea-monorepo/.prettierrc) exists and matches the canonical settings from the task.
- Check that [forgea-monorepo/.prettierignore](forgea-monorepo/.prettierignore) exists and includes the required build output, cache, and generated artifact ignores.

## 3) Confirm Prettier documentation

- Open [docs/official-docs/prettier.md](docs/official-docs/prettier.md).
- Verify it mentions the pinned version (3.2.x), references the root config/ignore files, and notes editor integration.

## 4) Confirm CI guidance and remediation steps

- Open [docs/official-docs/prettier-ci-guidelines.md](docs/official-docs/prettier-ci-guidelines.md).
- Verify it documents the CI command using `pnpm install --frozen-lockfile` and `pnpm -w exec prettier --check`.
- Verify it includes remediation steps for running `prettier --write` locally.

## 5) Confirm master registry entries

- Open [docs/master_docs.md](docs/master_docs.md).
- Verify the A6 entries exist for:
  - the gatekeeper brief,
  - the Prettier policy doc,
  - and the Prettier CI guidelines doc.
