### FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A7 — Scripts & Commands
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: PNPM — scripts & CLI
   - Concept: `pnpm` script invocation and `pnpm run` semantics (workspace script propagation)
   - Official source: https://pnpm.io/cli/run
   - Exact version requirement: 10.28.1
   - Why required: Repository uses `pnpm@10.28.1` as the `packageManager`; authoritative behavior for `pnpm run` and workspace script resolution is version-dependent.
   - Decision it informs: How root `scripts` (e.g., `build`, `dev`, `lint`) delegate to `turbo`, and CI invocation patterns.
   - What can go wrong: Differences in script propagation or `pnpm` CLI behavior across versions can break task discovery or script delegation.

2. Technology: Turborepo — script delegation and recommended invocation
   - Concept: How `turbo run <task>` behaves when invoked from root scripts and how it filters/forwards tasks to workspace packages
   - Official source: https://turborepo.org/docs (specific config docs marked in registry)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Task delegation semantics and cache/on-demand execution depend on Turborepo version.
   - Decision it informs: Whether root scripts should call `turbo` directly or use wrapper scripts, and how to author CI commands.
   - What can go wrong: Using an unpinned Turbo may cause different behavior in CI vs local dev and inconsistent cache behavior.

3. Technology: npm scripts (context)
   - Concept: `npm run` and generic `package.json` script conventions
   - Official source: https://docs.npmjs.com/cli/v10/commands/npm-run-script
   - Exact version requirement: VERSION UNKNOWN — OPTIONAL (pnpm is authoritative for this repo)
   - Why required: For developers using `npm` locally; repository standard is `pnpm` but `npm` docs provide reference semantics.
   - What can go wrong: Relying on `npm`-specific behavior when the repo uses `pnpm` can create confusion; prefer pnpm docs for authoritative guidance.

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json
  - Coverage status: VERIFIED
  - Notes: Root `scripts` present: `build`, `dev`, `lint`, each delegating to `turbo run <task>`.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - What is missing: `pnpm` scripts CLI entry (versioned) and pinned Turborepo version for script-delegation guidance.

### STUDY GUIDE FOR HUMAN

- Root scripts: Why they exist — provide single entrypoints for dev/CI that delegate to `turbo run`.
- Why pin `pnpm` docs: `pnpm` workspace behaviour is version-specific and the repo uses `pnpm@10.28.1`.
- Why pin Turborepo: Delegation semantics and caching are version-sensitive; avoid `turbo: "latest"` in `devDependencies`.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_scripts_official.md
   - Purpose: Capture recommended root script patterns, CI invocation examples, and exact `pnpm` + `turbo` commands the repo supports.
   - Exact knowledge to capture: pinned `pnpm` version (10.28.1), pinned `turbo` semver (MUST PIN), examples of `pnpm run build` vs `turbo run build`, CI examples, and a script-consistency checklist.
   - Required version pin: pnpm@10.28.1 (already present), turbo — MUST PIN exact semver BEFORE implementation.

### OPEN QUESTIONS / BLOCKERS

- Do you want to support `npm` invocations officially, or treat `pnpm` as the single supported package manager? (Decision required)
- Which exact `turbo` semver should be pinned for CI and dev? (BLOCKER)

### MASTER DOCS REGISTRY ACTION

Append the following to `/docs/master_docs.md`:

- Date: 2026-02-02
  - Epic / Feature: EPIC-A / A7 — Scripts & Commands
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to confirm pnpm and Turbo script delegation references and gaps.
