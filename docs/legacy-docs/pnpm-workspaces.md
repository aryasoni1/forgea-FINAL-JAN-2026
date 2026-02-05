# pnpm — Workspaces & pnpm-workspace.yaml

## 1. Purpose

pnpm workspaces provide deterministic, single-repo dependency management across multiple packages in this monorepo. They define which directories are treated as first-class packages, how those packages are linked, and how dependency resolution is centralized. This prevents duplicated installs, version drift between internal packages, and ambiguous dependency resolution.

This monorepo relies on pnpm workspaces to enforce a **single dependency graph**, a **single lockfile**, and **explicit package boundaries**.

---

## 2. Version Pinning Policy

- **pnpm version:** **10.28.1 (EXACT — pinned)**
- **Node.js:** `>=18.12`
- **Package manager control:** Corepack only

pnpm **MUST** be pinned to **exactly 10.28.1**.
Using `10.x`, `^10`, `~10`, or `latest` is **strictly forbidden**.

Pinning is mandatory because:

- Workspace discovery and linking semantics can change across minor releases
- Lockfile format and resolution behavior are version-sensitive
- Deterministic installs require identical resolver behavior across all environments

The pnpm version **must** be declared via the `packageManager` field in the root `package.json` and enforced using Corepack.
System-installed pnpm binaries must not be used.

---

## 3. Workspace Discovery Rules

- A pnpm workspace is activated **only** if a `pnpm-workspace.yaml` file exists at the repository root
- Workspace membership is determined **only** by glob rules defined in `pnpm-workspace.yaml`
- Glob patterns define inclusion explicitly
- Exclusion rules (`!pattern`) are applied after inclusion rules
- Directories that do not match any inclusion rule are **not** workspace packages
- There is **no implicit package discovery**

All workspace packages share:

- A single dependency graph
- A single `pnpm-lock.yaml`
- A single pnpm virtual store

---

## 4. pnpm-workspace.yaml vs package.json workspaces

**Authoritative file for workspace membership:**

- `pnpm-workspace.yaml`

`package.json` `workspaces` entries (if present) **must not** contradict `pnpm-workspace.yaml`.

### Required policy

- `pnpm-workspace.yaml` defines the workspace boundaries
- Any workspace configuration in `package.json` must remain aligned
- Mismatches are considered invalid and must be corrected immediately

### Why mismatches are dangerous

- Packages excluded from the workspace are resolved from the registry instead of locally
- CI may install different dependency graphs than local environments
- Duplicate dependencies and runtime mismatches can occur silently

---

## 5. Canonical Directory Layout

This monorepo recognizes the following top-level workspace directories:

### `apps/`

- End-user applications
- Deployable artifacts
- Must not be imported directly by other apps

### `packages/`

- Shared libraries and utilities
- May be imported by apps or other packages
- Must not depend on apps

### `services/` (optional)

- Long-running services or workers
- Must follow the same workspace rules as packages
- Must not import from apps

### Forbidden

- Implicit package directories
- Ad-hoc `libs/` or undocumented roots
- Nested workspaces
- Per-package lockfiles

Any new top-level workspace directory requires an explicit policy update.

---

## 6. Required pnpm Commands

Only the following commands are approved for workspace operations:

- `pnpm install`
  Used for local development to resolve and install the full workspace dependency graph.

- `pnpm install --frozen-lockfile`
  **Mandatory in CI.**
  CI must fail if the lockfile does not match `package.json` declarations.

No other commands may modify workspace dependency state.

---

## 7. Common Failure Modes

- **Package not detected**
  - Cause: Missing or incorrect glob in `pnpm-workspace.yaml`
  - Impact: Package resolved from registry instead of local workspace

- **Unexpected dependency versions**
  - Cause: Package excluded from workspace
  - Impact: Duplicate installs and runtime incompatibility

- **Lockfile drift**
  - Cause: Mixed pnpm versions or unpinned installs
  - Impact: Non-reproducible builds across environments

- **Workspace graph instability**
  - Cause: Circular dependencies between workspace packages
  - Impact: Unpredictable script execution order

---

## 8. Troubleshooting Checklist

1. Verify `pnpm-workspace.yaml` exists at the repository root
2. Confirm the package path matches an inclusion glob
3. Ensure no exclusion glob matches the package path
4. Confirm `packageManager` pins pnpm to **10.28.1**
5. Ensure exactly one `pnpm-lock.yaml` exists at the root
6. Run `pnpm install` from the workspace root
7. Stop immediately if any step fails and correct the configuration

---

## 9. What This Doc Does NOT Cover

- Dependency versioning strategies
- Publishing workspace packages
- Release tooling (changesets, Rush, etc.)
- CI configuration beyond install commands
- Performance tuning
- Non-pnpm package managers
- `workspace:` protocol usage details
