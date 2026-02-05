---
doc_id: pnpm-workspace-policy
tool: pnpm
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# pnpm — Workspace Policy

## Purpose

Governs the configuration, dependency resolution protocols, and structure of multi-package repositories (monorepos) using pnpm v10.x.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v10.x)

## Scope

- Applies to: Repositories containing a `pnpm-workspace.yaml` file, usage of the `workspace:` protocol, dependency injection, and catalog configurations.
- Does NOT apply to: Single-package repositories (unless explicitly using workspace features), or external versioning tools (e.g., Changesets, Rush) beyond compatibility statements.

## Official Sources (Binding)

- pnpm-workspaces.md
- pnpm-configuration.md
- pnpm-install.md
- pnpm-usage.md
- pnpm.md

## Evidence Coverage Matrix

| Policy Area             | Source URL            | Version Covered | Status  |
| ----------------------- | --------------------- | --------------- | ------- |
| Workspace Definition    | pnpm-workspaces.md    | v10.x           | COVERED |
| Protocol (`workspace:`) | pnpm-workspaces.md    | v10.x           | COVERED |
| Dependency Injection    | pnpm-configuration.md | v10.x           | COVERED |
| Filtering Syntax        | pnpm-usage.md         | v10.x           | COVERED |
| Cycle Management        | pnpm-workspaces.md    | v10.x           | COVERED |
| Catalogs                | pnpm-workspace.md     | v10.x           | COVERED |

## Version & Compatibility

- **Tool version:** v10.x (Explicitly cited in headers),,.
- **Runtime Requirement:** Node.js v18.12+ is required for operation unless using the standalone executable.
- **Related Tooling:**
  - **Changesets / Rush:** Explicitly supported for versioning,.
  - **Bit:** Uses pnpm under the hood.

## Canonical Rules (Non-Negotiable)

- **Workspace Root:** A workspace MUST be defined by a `pnpm-workspace.yaml` file in the repository root containing a `packages` glob list.
- **Protocol Enforcement:** Internal dependencies MUST use the `workspace:` protocol (e.g., `workspace:*`, `workspace:~`).
  - Usage of this protocol strictly enforces local resolution; if the package is not found in the workspace, installation MUST fail.
- **Publishing Transformation:** During `pack` or `publish`, `workspace:` dependencies are dynamically replaced by the corresponding version (for `workspace:*`) or semver range from the target package.
- **Dependency Injection:** To resolve conflicting peer dependencies for the same package across different consumers, the dependency MUST be marked as `injected: true` in `dependenciesMeta`. This creates a hard-linked copy instead of a symlink,.
- **Shared Lockfile:** By default (`sharedWorkspaceLockfile: true`), a single `pnpm-lock.yaml` is generated at the workspace root, creating a unified dependency graph.
- **Catalog Usage:** Shared dependency versions MAY be defined in `catalogs` within `pnpm-workspace.yaml` to enforce consistency across packages.
- **Recursive Behavior:** Running `pnpm install` inside a workspace installs dependencies for ALL projects unless `recursive-install` is disabled.

## Prohibited Configurations

- ❌ **Implicit Resolution (Default):** `linkWorkspacePackages` defaults to `false`. Relying on auto-linking without the `workspace:` protocol is prohibited as it causes packages to be resolved from the registry if versions mismatch,.
- ❌ **Cyclic Dependencies (Strict):** If `disallowWorkspaceCycles` is set to `true`, the presence of cycles causes installation failure.
- ❌ **Exotic Transitive Dependencies (Strict):** If `blockExoticSubdeps` is set to `true`, transitive dependencies MUST NOT use git/URL sources.

## Enforcement

- **Configuration File:** `pnpm-workspace.yaml` dictates workspace membership.
- **Strictness Settings:**
  - `engineStrict`: Prevents installation of packages incompatible with the current Node version.
  - `packageManagerStrict`: Enforces the exact package manager version defined in `package.json`.
- **Filtering:**
  - Scope commands using `--filter <selector>` (e.g., `--filter ...foo` for foo and its dependents).
  - Exclusion using `!rule`.

## Failure Modes

- **Protocol Mismatch:** `workspace:2.0.0` fails if the local package is version `1.0.0`.
- **Cycle Detection:** Warnings are produced for cyclic dependencies; becomes a hard error if `disallowWorkspaceCycles` is enabled.
- **Injected Staleness:** Injected dependencies (hard links) do not auto-update when source files change; they require a rebuild/reinstall or `pnpm-sync` tooling.
- **CI Lockfile:** In CI environments, `pnpm install` defaults to `--frozen-lockfile` and fails if the lockfile is out of sync,.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Runtime version requirements)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `pnpm-workspace.yaml` is present -> Mode = Workspace.
- If `dependenciesMeta[pkg].injected` == true -> Strategy = HardLink.
- If `workspace:` protocol is used -> Source = Local (Fail on missing).
- `recursive-install` defaults to `true` in workspaces.

## Verification Checklist

- [ ] `pnpm-workspace.yaml` exists in root.
- [ ] `workspace:` protocol used for all internal package references.
- [ ] `sharedWorkspaceLockfile` is `true` (default).
- [ ] CI pipeline handles `frozen-lockfile` behavior correctly.

## Non-Decisions

- This document does not mandate a specific release workflow tool (Changesets vs Rush).
- This document does not define specific catalog entries.

## Notes

- `pnpm install --prod` on a workspace without a lockfile will still resolve dev dependencies to ensure consistency.
- `workspace:` aliases are supported (e.g., `"bar": "workspace:foo@*"` resolves to `npm:foo@<version>` on publish).
- `catalogs` feature allows grouping versions (e.g., `react17`, `react18`) in `pnpm-workspace.yaml`.
