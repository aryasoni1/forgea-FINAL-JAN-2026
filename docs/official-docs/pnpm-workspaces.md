# pnpm Workspace Configuration

## Overview

This document describes the pnpm workspace configuration for the Forgea monorepo and how to verify workspace alignment.

## Configuration

The Forgea monorepo is configured as a pnpm workspace with three top-level package directories:

- `apps/*` — User-facing applications (4 apps)
- `packages/*` — Shared libraries and services (6 packages)
- `services/*` — Backend microservices (3 services)

## pnpm Workspace YAML

The workspace structure is defined in `/forgea-monorepo/pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
  - services/*
```

**Important:** pnpm relies exclusively on `pnpm-workspace.yaml` for workspace discovery. The `workspaces` array in `package.json` is used by other package managers (npm, yarn, bun) but is ignored by pnpm.

To maintain consistency, the `workspaces` array in root `package.json` should mirror the `packages` array in `pnpm-workspace.yaml`.

## Verification Commands

### Verify pnpm Package Discovery

```bash
pnpm ls -r --depth -1
```

This command lists all packages discovered by pnpm. For Forgea, this should return 13 packages total:
- 1 root package (forgea-monorepo)
- 4 apps (forgea-admin, forgea-labs, forgea-learn, forgea-lessons)
- 6 packages (@forgea/audit, @forgea/config, @forgea/design, @forgea/markdown, @forgea/schema, @forgea/ui)
- 3 services (@forgea/api-core, @forgea/content-engine, @forgea/verification-runner)

### Verify Turborepo Package Graph

```bash
turbo ls
```

This command validates that Turborepo can construct a valid package graph from the workspace. Both commands should exit with code 0 (success).

## CI/CD Requirements

### Frozen Lockfile

In CI environments, pnpm enforces `--frozen-lockfile` mode automatically when the `CI` environment variable is set. This ensures that the `pnpm-lock.yaml` file matches the workspace manifests exactly.

If the lockfile is out of sync, `pnpm install` will fail with exit code 1, preventing deployment of misaligned dependencies.

### Package Manager Pinning

The root `package.json` must include a `packageManager` field with an exact pnpm version:

```json
{
  "packageManager": "pnpm@10.28.1"
}
```

CI must verify that the pnpm version matches this pinned version. Turborepo will fail if the installed pnpm version drifts from this specification.

## Workspace Strictness Settings

For production environments, the following strictness settings are recommended in pnpm configuration (`.npmrc` or `pnpm-workspace.yaml`):

- `packageManagerStrictVersion=true` — Fail CI if pnpm version drifts from pinned version
- `disallowWorkspaceCycles=true` — Reject circular dependencies between workspace packages
- `strictPeerDependencies=true` — Fail if any peer dependencies are missing or invalid

These settings are documented for future CI pipeline implementation.

## Troubleshooting

### Package Not Discovered

If a package is not appearing in `pnpm ls -r --depth -1` output:

1. Verify the package directory matches a pattern in `pnpm-workspace.yaml`
2. Verify the package has a valid `package.json` file
3. Run `pnpm install` to regenerate workspace symlinks
4. Check `.pnpmfile.cjs` or other pnpm config files for exclusion rules

### Lockfile Out of Sync

If `pnpm install` fails with a lockfile error:

1. Run `rm pnpm-lock.yaml`
2. Run `pnpm install` to regenerate the lockfile
3. Review changes to the lockfile (should align with manifest changes)
4. Commit the updated lockfile to version control

## References

- [pnpm Workspaces Documentation](https://pnpm.io/workspaces)
- [pnpm CLI Reference](https://pnpm.io/pnpm-cli)
- Turborepo integration relies on pnpm workspace structure
