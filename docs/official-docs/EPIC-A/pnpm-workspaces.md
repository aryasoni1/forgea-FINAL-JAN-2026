---
doc_id: pnpm-workspaces
tool: pnpm
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# pnpm — Workspaces Policy

## Purpose

Governs the configuration, dependency resolution protocols, and structure of multi-package repositories (monorepos) using pnpm.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v10.x)

## Scope

- Applies to: Repositories containing a `pnpm-workspace.yaml` file, usage of the `workspace:` protocol, and recursive command execution.
- Does NOT apply to: Single-package repositories or versioning strategies (e.g., Changesets/Rush) unless explicitly integrated.

## Official Sources (Binding)

- pnpm-workspaces.md
- pnpm-configuration.md
- pnpm-install.md
- pnpm-usage.md

## Evidence Coverage Matrix

| Policy Area             | Source URL            | Version Covered | Status  |
| ----------------------- | --------------------- | --------------- | ------- |
| Workspace Definition    | pnpm-workspaces.md    | v10.x           | COVERED |
| Protocol (`workspace:`) | pnpm-workspaces.md    | v10.x           | COVERED |
| Dependency Injection    | pnpm-configuration.md | v10.x           | COVERED |
| Filtering Syntax        | pnpm-usage.md         | v10.x           | COVERED |
| Cycle Management        | pnpm-workspaces.md    | v10.x           | COVERED |

## Version & Compatibility

- Tool version: 10.x
- Related tooling compatibility:
  - **Changesets:** Supported for versioning.
  - **Rush:** Supported for repository management.
  - **Bit:** Uses pnpm under the hood.

## Canonical Rules (Non-Negotiable)

- **Workspace Root Definition:** A workspace MUST have a `pnpm-workspace.yaml` file in its root.
- **Protocol Enforcement:** The `workspace:` protocol (e.g., `workspace:*`, `workspace:~`) MUST be used to enforce resolution to a local package.
  - If the requested version is not present in the workspace, installation MUST fail.
- **Publishing Transformation:** When packing or publishing, pnpm dynamically replaces `workspace:` dependencies with the corresponding semver range or version from the target package.
- **Default Linking Behavior:** Unless `linkWorkspacePackages` is set to `true`, pnpm downloads packages from the registry by default; local linking occurs ONLY when the `workspace:` protocol is used.
- **Single Lockfile:** By default (`sharedWorkspaceLockfile: true`), a single `pnpm-lock.yaml` is created in the workspace root, enforcing singleton dependencies where possible.
- **Dependency Injection:** To resolve conflicting peer dependencies for the same package in different consumers, the dependency MUST be marked as `injected: true` in `dependenciesMeta`, creating a hard-linked copy instead of a symlink,.

## Prohibited Configurations

- ❌ **Ambiguous Local Resolution:** Relying on implicit local linking without `linkWorkspacePackages: true` or the `workspace:` protocol is invalid; pnpm will resolve from the registry,.
- ❌ **Circular Dependencies (Strict Mode):** If `disallowWorkspaceCycles` is set to `true`, installation fails upon detecting cycles.

## Enforcement

- **Configuration File:** `pnpm-workspace.yaml` defines the root and inclusion/exclusion globs via the `packages` list.
- **Installation Scope:**
  - `pnpm install` inside a workspace installs dependencies for ALL projects by default.
  - Recursive execution is controlled via `-r` (recursive) or implicit workspace context.
- **Protocol Validation:** `pnpm` refuses to resolve `workspace:` ranges to anything other than a local workspace package.
- **Catalogs:** `catalogs` defined in `pnpm-workspace.yaml` enforce shared version ranges across the workspace,.

## Failure Modes

- **Protocol Mismatch:** `workspace:2.0.0` fails if the local package is version `1.0.0`.
- **Cycle Detection:** Warnings are produced for cyclic dependencies; this becomes a hard error if `disallowWorkspaceCycles` is enabled,.
- **Missing Root File:** Without `pnpm-workspace.yaml`, the directory is not treated as a workspace, and recursive filtering will not function as expected.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/pnpm-configuration.md` (for `dependenciesMeta` and `package.json` rules)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `pnpm-workspace.yaml` is present, `recursive-install` defaults to `true`.
- `workspace:` protocol implies `source=local`.
- `injected` dependencies result in physical copies (hard links), not symlinks.
- Filtering syntax: `--filter <package_name>...` includes dependencies; `--filter ...<package_name>` includes dependents,.

## Verification Checklist

- [ ] `pnpm-workspace.yaml` exists in the repository root.
- [ ] Internal dependencies use `workspace:` protocol OR `linkWorkspacePackages` is explicitly `true`.
- [ ] `sharedWorkspaceLockfile` is configured (default `true`).
- [ ] Cycles are either resolved or `ignoreWorkspaceCycles` is explicitly set.

## Non-Decisions

- This document does not mandate a specific versioning tool (e.g., Changesets vs. Rush).
- This document does not define specific `catalog` entries, only that they are supported.

## Notes

- `pnpm install --prod` on a workspace without a lockfile will still resolve dev dependencies to ensure consistency.
- Aliases are supported in the workspace protocol: `"bar": "workspace:foo@*"`.
- `workspace:` protocol replacements occur dynamically during `pack` or `publish`.
