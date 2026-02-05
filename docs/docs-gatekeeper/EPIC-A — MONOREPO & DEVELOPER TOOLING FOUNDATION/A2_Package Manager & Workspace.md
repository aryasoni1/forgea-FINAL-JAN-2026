### FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A2 — Package Manager & Workspace
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - /docs/tasks/master_tasks_V1/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION.MD
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: pnpm
  - Concept: Workspaces (workspace discovery, `pnpm-workspace.yaml`, `packageManager` field semantics)
  - Official source: https://pnpm.io/workspaces
  - Exact version requirement: 10.28.1
  - Why required: Defines canonical workspace membership, install and hoisting semantics, and how `pnpm-workspace.yaml` and `package.json` must be aligned for deterministic installs.
  - Decision it informs: Which file is authoritative for workspace membership, CI install rules (frozen lockfile), and the exact `packageManager` pin to require in `package.json`.
  - What can go wrong without it: Unpinned or mismatched pnpm versions cause workspace resolution differences, registry vs local package resolution, lockfile drift, and CI failures.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - Coverage status: PARTIAL
  - What is missing: Observational report only; does not declare canonical remediation steps or CI enforcement policy.

- /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - Coverage status: SUFFICIENT (for orchestration and agent handoff metadata)
  - What is missing: None for orchestration; not intended as policy.

- /docs/tasks/master_tasks_V1/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION.MD
  - Coverage status: SUFFICIENT (scope and acceptance criteria for A2 are present)

- /docs/official-docs/pnpm-workspaces.md
  - Coverage status: SUFFICIENT (covers pnpm version pinning, authoritative `pnpm-workspace.yaml`, CI frozen-lockfile requirement, discovery rules, common failures and remediation checklist)
  - What is missing: None required for safe implementation; may be extended with explicit remediation CLI snippets for common errors.

### STUDY GUIDE FOR HUMAN

- pnpm Workspaces:
  - Why it exists: Provide a single dependency graph and deterministic installs across a multi-package repo.
  - Why alternatives exist: Yarn/NPM workspaces and other monorepo tools (Rush, pnpm alternatives) differ in hoisting, store layout, and lockfile formats — choose based on performance and team familiarity.
  - When NOT to use it: Avoid switching package manager mid-epic or for repos that require per-package independent lockfiles.
  - Common mistakes: forgetting to include top-level globs in `pnpm-workspace.yaml`, relying on `package.json` workspaces as authoritative, leaving `packageManager` unpinned, and using inconsistent pnpm versions in CI vs local machines.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/pnpm-workspace-policy.md
  - Purpose: Canonical policy describing authoritative workspace membership, how to author `pnpm-workspace.yaml`, and the remediation steps when discovery mismatches occur.
  - Exact knowledge to capture: required globs for `apps/*`,`packages/*`,`services/*`; which file is authoritative; CI checks (frozen-lockfile); required `pnpm` pin and Corepack enforcement; example fix steps and verification commands.
  - Required version pin: pnpm 10.28.1

- Path: /docs/official-docs/pnpm-ci-guidelines.md
  - Purpose: CI-level guidance to enforce deterministic installs and prevent lockfile/drift issues.
  - Exact knowledge to capture: use of `pnpm install --frozen-lockfile`, Node/pnpm runtime checks, CI job examples (failure behavior), and remediation steps for lockfile mismatches.
  - Required version pin: pnpm 10.28.1

### OPEN QUESTIONS / AMBIGUITIES

- None blocking: registry contains pnpm v10.28.1 and internal `pnpm-workspaces.md` exists. Planner-architect must still decide whether `pnpm-workspace.yaml` or `package.json.workspaces` will be treated as the single canonical source in operational checklists (recommended: `pnpm-workspace.yaml` as authoritative, per internal doc).

### MASTER DOCS REGISTRY ACTION (MANDATORY)

Append the following entries to `/docs/master_docs.md` (one-per-line block):

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief verifying official pnpm docs and listing required internal policy docs.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Doc path: /docs/official-docs/pnpm-workspace-policy.md
  - Status: REQUIRED
  - Reason: Canonical workspace policy to resolve discovered workspace glob mismatch.

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Doc path: /docs/official-docs/pnpm-ci-guidelines.md
  - Status: REQUIRED
  - Reason: CI guidance to enforce `packageManager` pinning and frozen installs.
    FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A2 — Package Manager & Workspace
- Inputs reviewed:
  - /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - /forgea-monorepo/package.json
  - /forgea-monorepo/pnpm-workspace.yaml
  - /docs/official-docs/pnpm-workspaces.md
  - /docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: pnpm
   - Concept: Workspaces activation and `pnpm-workspace.yaml` semantics (workspace membership, glob rules, inclusion/exclusion)
   - Official source: https://pnpm.io/workspaces (pnpm official docs)
   - Exact version requirement: 10.28.1 (must match `packageManager` in repository root `package.json`)
   - Why required: Determines which folders are treated as local workspace packages and how pnpm links and hoists dependencies. Correct workspace discovery is critical before making changes to workspace topology.
   - Decision it informs: Whether to add `services/*` to `pnpm-workspace.yaml` or remove it from `package.json.workspaces`; how CI and local installs must be configured.
   - What can go wrong without it: Packages may be resolved from the registry instead of linked locally, producing different dependency graphs locally vs CI, duplicate installs, and build/runtime mismatches.

2. Technology: pnpm / Corepack / packageManager field
   - Concept: `packageManager` field in `package.json` and Corepack enforcement for reproducible installs
   - Official sources: pnpm docs referencing Corepack (https://pnpm.io) and Node.js Corepack documentation (https://nodejs.org/api/corepack.html)
   - Exact version requirement: `pnpm@10.28.1` (must be enforced via `packageManager` and Corepack in CI/developer envs)
   - Why required: Ensures everyone uses the same pnpm resolver and lockfile format; Corepack uses `packageManager` to select the correct pnpm binary.
   - Decision it informs: Pinning policy for pnpm in CI, dev machines, and any automation (e.g., GitHub Actions). Requirement to use `pnpm install --frozen-lockfile` in CI.
   - What can go wrong without it: Lockfile drift, non-reproducible installs, CI failures, and subtle dependency resolution differences across machines.

3. Technology: package.json `workspaces` vs pnpm-workspace.yaml (policy)
   - Concept: Authoritative workspace declaration and how CI/packagers interpret workspace lists
   - Official source: pnpm workspaces docs (https://pnpm.io/workspaces)
   - Exact version requirement: Refer to pnpm@10.28.1
   - Why required: Clarifies that `pnpm-workspace.yaml` is authoritative and that `package.json.workspaces` must not contradict it.
   - Decision it informs: Which manifest is the source-of-truth and how to correct the observed mismatch.
   - What can go wrong without it: Divergent workspace definitions, missing packages in the workspace graph, or unexpected registry fetches.

Notes about missing versioned docs:

- Node / Corepack version used by contributors is not present in the repository (no `.nvmrc` / `.node-version` detected). Node/Corepack version requirements are therefore VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION. Pin the Node version (e.g., `.nvmrc` or `engines`) before making irreversible CI/tooling changes.

EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/official-docs/pnpm-workspaces.md` — SUFFICIENT
  - Rationale: Internal guidance explicitly pins pnpm to `10.28.1`, documents that `pnpm-workspace.yaml` is authoritative, and enumerates CI commands (e.g., `pnpm install --frozen-lockfile`). This doc matches the repository truth and covers the required concepts.

- `/docs/official-docs-registry.md` — VERIFIED (pnpm entry)
  - Rationale: Contains a registry entry that records `pnpm` version `10.28.1` and links to the canonical pnpm docs; serves as a stable pointer for gating decisions.

- `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md` — PARTIAL
  - Rationale: Repository-specific findings (workspace mismatch) are recorded here, but this is not an official policy document.

STUDY GUIDE FOR HUMAN

- Topic: pnpm Workspaces
  - Why it exists: To declare which directories are local packages so pnpm links them locally and maintains a single dependency graph.
  - Why alternatives exist: `yarn` and `npm` provide workspace primitives; organizations choose based on features like disk efficiency, speed, and lockfile behavior.
  - When NOT to use: When a project is a single package or when another package manager is mandated by policy.
  - Common mistakes: Mismatched globs, forgetting to include new top-level folders, relying on `package.json.workspaces` when `pnpm-workspace.yaml` is authoritative.

- Topic: `packageManager` field & Corepack
  - Why it exists: Guarantees a consistent package manager binary version across machines via Corepack; makes installs reproducible.
  - Why alternatives exist: Tools like asdf or system package installers can manage pnpm, but Corepack provides an automated, per-repo configuration.
  - When NOT to use: In environments where Corepack cannot be enforced (very rare for modern CI); still, a fallback policy must exist.
  - Common mistakes: Setting `packageManager` to `latest`, which prevents reproducible installs; not enabling Corepack in CI.

- Topic: Workspace topology policy
  - Why it exists: Topology determines allowed package interactions and how CI should build and test components.
  - Why alternatives exist: Some orgs prefer explicit per-package manifests and custom CI to avoid workspace complexity.
  - When NOT to use: Extremely small repos where workspace semantics add overhead.
  - Common mistakes: Failing to update `pnpm-workspace.yaml` when adding `services/` or other top-level groups; mixing workspace boundaries across manifests.

INTERNAL DOCS TO ADD OR EXTEND

- Doc path: /docs/official-docs/pnpm-workspace-policy.md
  - Purpose: Authoritative org policy that states: (1) `pnpm-workspace.yaml` is the source-of-truth, (2) required globs for `apps/`, `packages/`, and `services/`, (3) CI install commands and `--frozen-lockfile` requirement, and (4) remediation steps when a mismatch is detected.
  - Must capture: exact pinned `pnpm` version (`10.28.1`), explicit example CI snippet to enable Corepack and run `pnpm install --frozen-lockfile`, and a prescriptive decision (add `services/*` to `pnpm-workspace.yaml` OR remove it from `package.json.workspaces`).

- Doc path: /docs/official-docs/pnpm-ci-guidelines.md
  - Purpose: Step-by-step CI configuration for enforcing `packageManager` pinning via Corepack, using `pnpm install --frozen-lockfile`, and validating that `pnpm-workspace.yaml` contains expected globs.
  - Must capture: GitHub Actions examples (or CI used by repo), commands to check workspace membership, and automated checks (lint step) that fail the build on mismatch.

OPEN QUESTIONS / AMBIGUITIES

- Which manifest should be treated as authoritative for the repository: should `pnpm-workspace.yaml` be updated to include `services/*`, or should `package.json.workspaces` be edited to remove `services/*`? Planner must decide.
- Node and Corepack versions are not pinned in the repo (no `.nvmrc` / `.node-version` found). Which Node version should be required? This must be pinned before enforcing Corepack-driven pnpm usage.
- Is the CI already configured to enable Corepack and use `pnpm install --frozen-lockfile`? If not, adding CI steps will be required as part of implementation.

MASTER DOCS REGISTRY ACTION (MANDATORY)

You MUST append the following entries to `/docs/master_docs.md`:

- Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - Status: ADDED
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Reason: Docs Gatekeeper brief created to verify official pnpm docs and capture required internal doc additions to resolve workspace mismatches.

- Doc path: /docs/official-docs/pnpm-workspace-policy.md
  - Status: REQUIRED
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Reason: Required authoritative policy for workspace topology, CI enforcement, and remediation steps for mismatches.

- Doc path: /docs/official-docs/pnpm-ci-guidelines.md
  - Status: REQUIRED
  - Epic / Feature: EPIC-A / A2 — Package Manager & Workspace
  - Reason: Required CI guidance to enforce `packageManager` pinning and frozen installs.
