### FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A5 — ESLint (Minimal & Safe)
- Source: docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md

### TASKS CHECKED

- Scan repository for existing ESLint config files (.eslintrc.\*, eslintConfig), `.eslintignore`, and lint scripts in `package.json` (forgea-code-scout task).
- Record exact file locations and a factual inventory of what exists, partially exists, or is missing.

### WHAT ALREADY EXISTS

- [forgea-monorepo/package.json](forgea-monorepo/package.json#L1-L50): workspace root `scripts.lint` set to `turbo run lint`.
- [forgea-monorepo/apps/forgea-admin/package.json](forgea-monorepo/apps/forgea-admin/package.json#L1-L40): `scripts.lint` set to `eslint .`.
- [forgea-monorepo/apps/forgea-lessons/package.json](forgea-monorepo/apps/forgea-lessons/package.json#L1-L40): `scripts.lint` set to `eslint .`.
- [forgea-monorepo/packages/config/package.json](forgea-monorepo/packages/config/package.json#L1-L20): package exists and its `description` is "Shared TypeScript & ESLint config for Forgea".
- `.turbo` logs under apps show `> eslint .` executed and failing with `sh: eslint: command not found` (evidence lint is invoked but not installed in environment).

### WHAT IS PARTIALLY IMPLEMENTED

- `@forgea/config` package exists and is described as the shared TypeScript & ESLint config, but the package directory contains no exported ESLint configuration files (no .eslintrc\*, no index exporting an ESLint config).
- Lint scripts are present at the app level (`eslint .`) and at monorepo-level (`turbo run lint`), but no workspace-level pinned `eslint` dependency or shared config file was found to satisfy those scripts.

### WHAT IS MISSING

- No `.eslintrc.*` or `eslint.config.*` files discovered in the repository root, in `packages/config`, or in app/package folders.
- No `.eslintignore` file present anywhere in the scanned source tree.
- No explicit `eslint` package listed in `devDependencies` or `dependencies` of the root or app `package.json` files inspected (apps call `eslint .` but do not pin/install `eslint`).
- No `eslintConfig` field found in any `package.json`.
- No version-pinned official ESLint documentation link or pinned version found in `docs/official-docs-registry.md` by this scan (docs-gatekeeper is responsible for authoritative doc verification).

### RISKS OR CONFLICTS

- Running `pnpm install` then `pnpm run lint` (or CI lint step) will likely fail: apps invoke `eslint .` but `eslint` is not present in dependencies, causing CI/Dev breakage (evidence: `.turbo/*/turbo-lint.log` shows `eslint: command not found`).
- `packages/config` advertises a shared ESLint config but currently contains no exported ESLint configuration — this creates ambiguity about where the canonical shared config should live.
- Having unpinned or absent ESLint versions risks inconsistent developer environments and CI failures once `eslint` is added ad-hoc in different apps.

### QUESTIONS FOR CLARIFICATION

- Confirm the intended canonical location for the shared ESLint config: is `packages/config` the authoritative host for the shared ESLint config? (I did not find any config files there.)

### NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

Copy-paste-ready prompt for the next agent (planner-architect):

"You are the planner-architect. Use the code-scout report at `docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A5_ESLint (Minimal & Safe).md` and the docs-gatekeeper output (once available) to produce the authoritative task document for Feature A5 — ESLint (Minimal & Safe) in EPIC-A. Important factual findings you must incorporate (do not change facts):

- Root `package.json` has `"lint": "turbo run lint"`.
- Apps `forgea-admin` and `forgea-lessons` have `"lint": "eslint ."` but no `eslint` dependency pinned in their `package.json` files.
- `packages/config` exists with description "Shared TypeScript & ESLint config for Forgea" but contains no exported ESLint config files (.eslintrc*, `eslint.config.*`, or `eslint`-exporting index).
- `.turbo` logs indicate `eslint` was attempted but failed with `sh: eslint: command not found`.

Your output should be a task document placed at `/docs/tasks/` named `task-A5-ESLint-Minimal-Safe.md` (or follow existing task naming conventions), containing:

- Scope and invariants based only on the facts above and the docs-gatekeeper approval.
- A minimal, version-pinned requirement list (ESLint package and any shared config package references) but DO NOT install or implement these—only list them as tasks and constraints.
- Exact deliverables and acceptance criteria that the implementer will follow (where to place shared config, required files, CI lint step expectations, test plan location).

Do NOT write code; only author the task document using the scanned facts and docs-gatekeeper approval. Reference this code-scout report in the task document."

Handoff file: this report (save path). Stop here; planner-architect will consume this report and docs-gatekeeper output to author the task document.

Handoff complete. Provide this report verbatim to the next agent.
