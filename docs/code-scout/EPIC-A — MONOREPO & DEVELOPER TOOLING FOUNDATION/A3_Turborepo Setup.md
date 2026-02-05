FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A3 — Turborepo Setup
- Source: Agent Orchestrator Output (docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md)

TASKS CHECKED

- Locate existing Turbo configuration file(s) (e.g., `turbo.json`).
- Identify Turborepo devDependencies and whether they are version-pinned.
- Extract pipeline/task definitions (build/dev/lint/test) from Turbo config.
- Determine caching configuration in Turbo tasks.
- Find root-level scripts that invoke Turbo (e.g., `turbo run ...`).

WHAT ALREADY EXISTS

- /forgea-monorepo/turbo.json — Contains Turbo config with `tasks`:
  - `build`: dependsOn `^build`, outputs [".next/**", "dist/**"]
  - `dev`: `cache: false`
  - `lint`: empty object
    (This file uses the official schema: `https://turborepo.org/schema.json`.)

- /forgea-monorepo/package.json — Root package manifest:
  - `scripts`:
    - `build`: "turbo run build"
    - `dev`: "turbo run dev"
    - `lint`: "turbo run lint"
  - `packageManager`: "pnpm@10.28.1"
  - `workspaces`: ["apps/*", "packages/*", "services/*"]
  - `devDependencies` includes `turbo": "latest"` (not pinned to a specific version) and `typescript": "5.9.3"`.

- /forgea-monorepo/pnpm-workspace.yaml — workspace package globs:
  - `packages:` `- apps/*` `- packages/*`
    (Note: `services/*` is not listed here.)

- /forgea-monorepo/.github/copilot-instructions.md — Documents that the monorepo is managed with `pnpm` workspaces and Turborepo and restates that root scripts map `pnpm dev` -> `turbo run dev`, etc.

WHAT IS PARTIALLY IMPLEMENTED

- `/forgea-monorepo/turbo.json` defines `build`, `dev`, and `lint` tasks, but:
  - `lint` has no explicit `outputs` or `dependsOn` defined.
  - `dev` explicitly disables caching (`cache: false`) — this is present but may be expected; the file does not show any explicit caching config for other tasks beyond `outputs` for `build`.

- Root `package.json` exposes Turbo scripts and `turbo` in `devDependencies`, but the `turbo` dependency is set to `latest` (not pinned to a specific version), which is a partial implementation relative to a version-pinned requirement.

WHAT IS MISSING

- No pinned `turbo` version found in `devDependencies` (value is `latest`).
- `pnpm-workspace.yaml` does not include the `services/*` workspace that is present in `package.json` `workspaces` (inconsistency between manifests).
- No explicit `test` task is present in `turbo.json` tasks.
- No global or per-task cache configuration beyond `dev: cache: false` and `build.outputs` is present (no `cache`/`remote` cache settings or pipeline-level `cache` attributes found).
- No examples of advanced `dependsOn` chains beyond `build: ^build` for cross-package build ordering.

RISKS OR CONFLICTS (observed in repository files)

- Workspace mismatch: `package.json` lists `services/*` in `workspaces`, but `pnpm-workspace.yaml` lists only `apps/*` and `packages/*`. This is a conflicting truth about workspace membership and can cause pnpm to not include `services/*` packages during installs or workspace operations.
- Versioning policy: `turbo` dependency is set to `latest` rather than a fixed, version-pinned value; this conflicts with a requirement for official, version-pinned Turborepo docs (as noted by the orchestrator). Using `latest` risks non-reproducible builds.
- `turbo.json` `lint` task is empty; absent `outputs` or dependencies could lead to inconsistent lint runs across packages.

QUESTIONS FOR CLARIFICATION

- Should `pnpm-workspace.yaml` be the source-of-truth for workspace package globs, or should `package.json` `workspaces` be authoritative? (I found them inconsistent.)
- Is there an expected pinned `turbo` version to use for this repo? (Current `devDependencies` uses `latest`.)

NEXT AGENT HANDOFF PROMPT (for planner-architect)

- Role: `planner-architect` (produce authoritative task document for Feature A3 — Turborepo Setup)
- Reference: This code-scout report at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md` and the Agent Orchestrator output at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md`.

Copy-paste-ready prompt (START):

You are the `planner-architect`. Using the findings in the code-scout report located at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A3_Turborepo Setup.md` and the Docs Gatekeeper approval (when available), produce the authoritative task document for Feature A3 — "Turborepo Setup" in EPIC-A.

Work from facts only (do not invent or implement changes):

- Confirm the feature scope listed in the Orchestrator output.
- Include explicit acceptance criteria that reference the existing repo truths found by the code-scout (e.g., `turbo.json` tasks: `build`, `dev`, `lint`; root scripts invoking `turbo run ...`; `turbo` currently in `devDependencies` as `latest`, and `pnpm-workspace.yaml` vs `package.json` workspace mismatch).
- List the exact files to be updated by the implementer (file paths only), but do not change them yourself.
- If the Docs Gatekeeper approves an official, version-pinned Turborepo doc/version, require the implementer to use that exact version string in `devDependencies` and in any documentation updates.
- Do not propose technical fixes within the task document — only state required outcomes and acceptance checks that the implementer must meet.

Deliverable: A single task document placed under `/docs/tasks/` named `A3_Turborepo Setup.md` containing scope, prerequisites, step-wise tasks, acceptance criteria, files-to-change (paths), and required test plan location. Reference this code-scout report for repository truths.

Copy-paste-ready prompt (END)

Handoff notes:

- Key repo truths: `/forgea-monorepo/turbo.json` exists with limited tasks; root `package.json` contains `turbo` as `latest` and scripts to run turbo; `pnpm-workspace.yaml` does not include `services/*` while `package.json` does. Planner should rely on these facts and the Docs Gatekeeper output for version pinning policy.

Handoff complete. Provide this report verbatim to the next agent.
