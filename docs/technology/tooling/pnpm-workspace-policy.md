# pnpm Workspace Policy

- Category: Tooling
- Epics: A
- Version / Requirement: pnpm 10.28.1
- Intent / Critical Decision: Canonical policy for workspace discovery and CI install semantics for the monorepo.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A1 / A2)
- EPIC-A intent: Treat `pnpm-workspace.yaml` as the authoritative workspace manifest, pin `pnpm` to `10.28.1`, and enforce deterministic installs in CI.
- Important points:
  - Authoritative manifest: Use `pnpm-workspace.yaml` (root) to list workspace globs. Recommended globs: `apps/*`, `packages/*`, `services/*`.
  - Version pin: `package.json` should include `packageManager: "pnpm@10.28.1"` and CI should enable Corepack or install the pinned pnpm.
  - CI enforcement: Use `pnpm install --frozen-lockfile` in CI to prevent lockfile drift and ensure reproducible installs.
  - Checks: Add a lightweight CI check that validates `pnpm-workspace.yaml` contains the expected globs and matches `package.json.workspaces` (or explicitly documents any divergence).
  - Troubleshooting: Document common failure modes (missing workspace packages, hoisting surprises) and remediation steps (sync manifests, clear pnpm store, re-run `pnpm install`).
  - Docs: Reference this policy from `/docs/master_docs.md`, and include examples and CLI snippets for developers (Corepack enablement, `pnpm -w` commands).
