# Manual Checks — Task A2

## 1) Verify workspace membership globs

- Open [forgea-monorepo/pnpm-workspace.yaml](forgea-monorepo/pnpm-workspace.yaml).
- Confirm the packages list includes apps/_, packages/_, and services/\*.
- Result should show all three entries under packages.

## 2) Verify packageManager pin

- Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
- Confirm `packageManager` is set to pnpm@10.4.0.
- Result should match the toolchain policy pin.

## 3) Verify workspace policy source of truth

- Open [docs/official-docs/EPIC-A/pnpm-workspace-policy.md](docs/official-docs/EPIC-A/pnpm-workspace-policy.md).
- Confirm it states pnpm-workspace.yaml is authoritative and package.json.workspaces must match it.
- Confirm it states the pnpm pin must match docs/toolchain-versions.md.

## 4) Verify Corepack guidance is documented

- Open [docs/official-docs/EPIC-A/pnpm-ci-guidelines.md](docs/official-docs/EPIC-A/pnpm-ci-guidelines.md).
- Confirm it states developers must use Corepack locally and CI should use Corepack.
- Confirm it states CI wiring is handled in separate tasks.

## 5) Verify master docs registry entries exist

- Open [docs/master_docs.md](docs/master_docs.md).
- Confirm entries exist for:
  - /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - /docs/official-docs/pnpm-workspace-policy.md
  - /docs/official-docs/pnpm-ci-guidelines.md
