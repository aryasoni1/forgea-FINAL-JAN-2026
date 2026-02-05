FEATURE CONTEXT

Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION

Feature: A10 — Documentation & Architecture

Exact input files read:

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A10_Documentation & Architecture.md
- /Users/aryasoni/Desktop/Forgea/docs/official-docs/turborepo.md
- /Users/aryasoni/Desktop/Forgea/docs/official-docs/pnpm-workspaces.md
- /Users/aryasoni/Desktop/Forgea/docs/official-docs/typescript-project-references.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: pnpm (Workspaces)
   - Concept: Workspace discovery, install semantics, `packageManager` pinning, and CI install rules
   - Official source: https://pnpm.io/workspaces
   - Exact version requirement: 10.28.1 (already pinned in registry)
   - Why required: Ensures deterministic installs and CI parity; informs `packageManager` `pnpm@10.28.1` pin in `package.json` and Corepack usage.
   - What decision it informs: Workspace topology, CI `--frozen-lockfile` enforcement, and installer behavior across environments.
   - What breaks without it: Non-reproducible installs, lockfile drift, and inconsistent local vs CI dependency graphs.

2. Technology: Turborepo (task orchestration & caching)
   - Concept: Pipeline schema, caching semantics, and authoritative `turbo.json` configuration
   - Official sources:
     - Turborepo docs: https://turborepo.org/docs
     - Turborepo schema: https://turborepo.org/schema.json
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: `turbo` version affects pipeline behavior, cache hashing, and remote cache compatibility; pinning prevents subtle CI/remote-cache mismatches.
   - What decision it informs: The exact `turbo` package version to pin in `devDependencies`, remote cache protocol compatibility, and schema used for `turbo.json` validation.
   - What breaks without it: Cache corruption across versions, inconsistent task ordering, and unpredictable CI build behavior.

3. Technology: TypeScript (project references & compiler semantics)
   - Concept: Project references, `tsconfig` schema, and compiler behavior
   - Official source: https://www.typescriptlang.org/docs/handbook/project-references.html
   - Exact version requirement: 5.9.3 (already pinned in registry)
   - Why required: TypeScript version affects project references, emitted `.tsbuildinfo`, and module resolution behavior.
   - What decision it informs: Pinning `typescript` in `devDependencies`, root `tsconfig` expectations, and allowed compiler options.
   - What breaks without it: Incoherent builds, broken incremental compilation, and diverging diagnostics across environments.

EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/pnpm-workspaces.md
  - Coverage status: SUFFICIENT
  - Exact gaps: None relevant to pnpm pinning — file explicitly pins pnpm to 10.28.1 and documents CI commands.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/typescript-project-references.md
  - Coverage status: SUFFICIENT
  - Exact gaps: None — document prescribes project-references usage and version pinning guidance.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/turborepo.md
  - Coverage status: PARTIAL
  - Exact gaps: Missing an explicit, pinned `turbo` version (exact semver) and explicit schema versioning guidance; lacks explicit remote cache/provider recommendations and compatible `turbo` releases for the repo's CI patterns.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/turborepo.md` — Add explicit `turbo` semver to pin, reference the exact `schema.json` URL (include commit/date if possible), and document remote cache compatibility and CI image tags. Rationale: prevents cache/behavior drift and informs Planner which `turbo` version to pin.

STUDY GUIDE FOR HUMAN

- pnpm Workspaces:
  - Why this exists: Deterministic installs across mono-repo teams and CI.
  - Why alternatives exist: Yarn Workspaces / npm workspaces are alternatives; pnpm chosen for strictness and performance.
  - When NOT to use pnpm: Only when organizational constraints force another package manager; migration requires full policy updates.
  - Common mistakes: Not pinning `packageManager`, allowing mixed pnpm versions, or relying on global pnpm binaries.

- Turborepo:
  - Why this exists: Centralized, cacheable task orchestration for fast CI and reproducible builds.
  - Why alternatives exist: Nx, GitHub Actions matrix, or bespoke pipelines; Turborepo chosen for cache-first monorepo workflows.
  - When NOT to use Turborepo: Small repos where orchestration complexity outweighs benefit, or when using a CI-native caching strategy with conflicting semantics.
  - Common mistakes: Using `latest`, not pinning `turbo`, or failing to declare `outputs` causing cache corruption.

- TypeScript:
  - Why this exists: Enforces scalable, maintainable typed project graphs.
  - Why alternatives exist: Single `tsconfig` monoliths or Babel-only builds; project references needed for large monorepos.
  - When NOT to use project references: Very small projects or non-TypeScript packages.
  - Common mistakes: Mixed TypeScript versions, root `tsconfig` containing sources, or missing `composite: true` in referenced projects.

INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/turborepo.md (EXTEND)
  - Purpose: Pin authoritative `turbo` semver, link the exact `schema.json` (with date/commit if available), recommend remote cache provider(s), and provide CI image/tag recommendations.
  - Exact knowledge to add: `turbo` X.Y.Z (exact semver to be provided), compatible `node` range for that `turbo` version, schema.json link and expected fields, and recommended `turbo` CLI invocation patterns in CI.
  - Required version pin: MUST BE PROVIDED BEFORE IMPLEMENTATION (VERSION UNKNOWN currently).

OPEN QUESTIONS / AMBIGUITIES

- Which exact `turbo` semver should be pinned for the repo (preferred stable release)?
- Is there a preferred remote cache provider (Vercel remote cache, self-hosted, or third-party)?
- Are CI images managed centrally (should we pin a specific Docker image/tag for CI steps that use `turbo`)?

MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md`:

- Date: 2026-02-04
  - Epic / Feature: EPIC-A / A10 — Documentation & Architecture
  - Doc path: /docs/official-docs/turborepo.md
  - Status: REQUIRED (EXTEND)
  - Reason: Turborepo doc must include exact `turbo` semver, schema link, and remote-cache guidance before implementation.

---

Requested next action for the human/planner:

- Provide the preferred `turbo` semver and any remote-cache/CI image constraints, or authorize me to propose a conservative `turbo` LTS/stable semver and matching CI images.
