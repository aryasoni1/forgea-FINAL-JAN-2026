---
doc_id: pnpm-ci-policy
tool: pnpm
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# pnpm — Continuous Integration (CI) Guidelines

## Purpose

Governs the behavior, configuration, and failure conditions of pnpm when executing in automated testing and deployment environments (CI/CD).

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v10.x)

## Scope

- Applies to: Automated pipelines, non-interactive shell executions, and `pnpm install` behavior when the `CI` environment variable is detected.
- Does NOT apply to: Local development environments (unless explicitly simulating CI flags).

## Official Sources (Binding)

- pnpm-install.md
- pnpm-configuration.md
- pnpm-usage.md
- pnpm.md

## Evidence Coverage Matrix

| Policy Area          | Source URL            | Version Covered | Status  |
| -------------------- | --------------------- | --------------- | ------- |
| CI Detection         | pnpm-install.md       | v10.x           | COVERED |
| Immutable Installs   | pnpm-install.md       | v10.x           | COVERED |
| Global Virtual Store | pnpm-configuration.md | v10.x           | COVERED |
| Output/Logging       | pnpm-install.md       | v10.x           | COVERED |
| Caching              | pnpm-configuration.md | v10.x           | COVERED |

## Version & Compatibility

- **Tool version:** v10.x
- **Runtime Requirement:** Node.js v18.12+ (unless using standalone executable).
- **Related tooling compatibility:**
  - **Corepack:** Supported (requires `corepack enable pnpm`).
  - **Changesets:** Supported for CI release workflows.

## Canonical Rules (Non-Negotiable)

- **Automatic Environment Detection:** pnpm automatically detects CI environments via standard environment variables (e.g., `CI`, `CONTINUOUS_INTEGRATION`, `BUILD_NUMBER`, `RUN_ID`, `gitlab-ci`, `TRAVIS`, etc.).
- **Immutable Lockfiles:** In a detected CI environment, `pnpm install` DEFAULTS to `--frozen-lockfile`.
  - If a lockfile is present but out of sync with `package.json`, installation MUST fail,.
  - If no lockfile is present, pnpm generates one (unless `--frozen-lockfile` is explicitly forced).
- **Global Virtual Store Disablement:** The `enableGlobalVirtualStore` setting is automatically DISABLED in CI environments to prevent reliance on machine-local caches that may not persist.
- **Workspace Recursion:** Inside a workspace, `pnpm install` installs dependencies for ALL projects by default.
- **Output Formatting:** For non-TTY standard output (common in CI logs), the reporter defaults to `append-only` to prevent cursor control characters from corrupting logs.
- **Side Effects Caching:** By default (`sideEffectsCache: true`), pnpm caches the results of `postinstall` scripts to speed up future installs.

## Prohibited Configurations

- ❌ **Use of Deprecated Store Server:** `useRunningStoreServer` is deprecated and MUST NOT be used,.
- ❌ **Mutable Installs in CI:** Explicitly setting `--no-frozen-lockfile` in CI pipelines defeats the purpose of deterministic builds and is prohibited unless debugging.
- ❌ **Global Store in CI:** Forcing `enableGlobalVirtualStore: true` in CI environments where caches are absent is explicitly discouraged as it may slow down installation.

## Enforcement

- **Implicit Flags:**
  - `CI=true` → implies `--frozen-lockfile`.
  - `CI=true` → implies `enableGlobalVirtualStore=false`.
- **Exit Codes:**
  - `pnpm install` exits with a non-zero code if the lockfile needs updates in a CI environment.
  - `pnpm` exits with non-zero code if `engineStrict` is enabled and Node version mismatches,.

## Failure Modes

- **Lockfile Mismatch:** If `pnpm-lock.yaml` does not match `package.json` constraints, the build fails immediately.
- **Store Integrity Violation:** If `verifyStoreIntegrity` is true (default), modified files in the store cause validation errors before linking.
- **Network Timeout:** `fetchTimeout` defaults to 60000ms (1 minute); slow CI networks may require override.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/pnpm-workspace-policy.md` (Workspace definition)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `env.CI` is present, treat `frozen-lockfile` as `true`.
- If `env.CI` is present, `enableGlobalVirtualStore` is forced to `false`.
- Store path resolution order: `$PNPM_HOME/store` > `$XDG_DATA_HOME/pnpm/store` > OS Default.
- Log reporter MUST be `append-only` if `stdout` is not TTY.

## Verification Checklist

- [ ] `pnpm-lock.yaml` is committed to the repository.
- [ ] Pipeline defines `CI=true` (or equivalent supported var).
- [ ] Node.js version matches `engines` field (if `engineStrict` is set).
- [ ] Caching strategy accounts for `store-dir`.

## Non-Decisions

- This document does not define the specific CI provider (GitHub Actions, GitLab, Jenkins).
- This document does not mandate specific caching keys/paths for the CI provider.

## Notes

- To debug installation issues in CI, use `pnpm install --reporter=ndjson` for verbose, machine-readable logs.
- `pnpm install --offline` can be used in air-gapped CI environments if the store is pre-populated.
- `pnpm prune` removes extraneous packages automatically; it does not accept arguments to select specific packages.
