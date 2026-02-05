FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A7 — Scripts & Commands
- Source: Agent Orchestrator Output (docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md)

TASKS CHECKED

- Locate root `package.json` and list top-level `scripts`.
- Find evidence of Turborepo delegation from root scripts and documentation.
- Search for repo README or docs that document root scripts and developer commands.

WHAT ALREADY EXISTS

- /forgea-monorepo/package.json — Root `package.json` contains `scripts`:
  - `build`: "turbo run build"
  - `dev`: "turbo run dev"
  - `lint`: "turbo run lint"
    (Root `packageManager` is `pnpm@10.28.1` and `workspaces` include `apps/*`, `packages/*`, `services/*`.)

- /forgea-monorepo/.github/copilot-instructions.md — Explicitly documents root dev commands and confirms Turbo delegation:
  - `pnpm install`
  - `pnpm dev` (runs `turbo run dev`)
  - `pnpm build` (runs `turbo run build`)
  - `pnpm lint` (runs `turbo run lint`)

- Package-level `package.json` files under `apps/*` include their own `scripts` (e.g., `dev`, `build`, `test`) as typical per-app commands (found in `apps/forgea-labs/package.json`, `apps/forgea-admin/package.json`, etc.).

WHAT IS PARTIALLY IMPLEMENTED

- Root `package.json` scripts delegate to Turbo as expected, but there is no root-level `test` script documented or defined to run tests across the monorepo via Turbo (i.e., no `turbo run test` mapping in root `scripts`). Some apps define `test` locally.
- The `.github/copilot-instructions.md` documents `pnpm dev`/`pnpm build` usage but is an AI-instructions doc rather than an end-user `README.md`. A dedicated `README.md` documenting scripts for contributors is not found at the repo root (no `README.md` in the monorepo root was observed).

WHAT IS MISSING

- No root `test` script that runs `turbo run test` found in `/forgea-monorepo/package.json`.
- No top-level `README.md` that documents common scripts and workflow for contributors (the `.github/copilot-instructions.md` exists but is not a conventional contributor-facing README).
- No explicit guidance in `turbo.json` or other docs about script conventions (e.g., naming conventions for per-package scripts, lifecycle scripts, or how to add scripts that Turbo should orchestrate).

RISKS OR CONFLICTS (observed in repository files)

- The `.github/copilot-instructions.md` is authoritative for AI agents but may not be visible to typical contributors; missing `README.md` could cause confusion for human contributors about standard scripts and commands.
- No monorepo-wide `test` pipeline could lead to inconsistent test execution if contributors run per-app tests rather than a unified `pnpm test` workflow.

QUESTIONS FOR CLARIFICATION

- Should the monorepo include a root-level `test` script that maps to `turbo run test` to standardize test execution across workspaces?
- Is `.github/copilot-instructions.md` intended to be the canonical developer guide, or should a standard `README.md` be created/maintained at the repo root?

NEXT AGENT HANDOFF PROMPT (for planner-architect)

- Role: `planner-architect` (produce authoritative task document for Feature A7 — Scripts & Commands)
- Reference: This code-scout report at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md` and the Agent Orchestrator output at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md`.

Copy-paste-ready prompt (START):

You are the `planner-architect`. Using the findings in the code-scout report located at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A7_Scripts & Commands.md` and the Docs Gatekeeper approval (when available), produce the authoritative task document for Feature A7 — "Scripts & Commands" in EPIC-A.

Work from facts only (do not invent or implement changes):

- Confirm the feature scope listed in the Orchestrator output.
- Include explicit acceptance criteria that reference the existing repo truths found by the code-scout (e.g., root `package.json` scripts delegating to Turbo; `.github/copilot-instructions.md` documents `pnpm dev`/`pnpm build` delegation; per-app `package.json` scripts exist).
- Specify required deliverables and exact file paths to be updated by the implementer (file paths only). Possible targets include the root `package.json`, repo `README.md`, and `turbo.json` — list them but do not modify them yourself.
- If the Docs Gatekeeper requires pinned documentation or tooling versions, require the implementer to use that exact version string in `package.json` and task docs.
- Do not propose technical fixes; only state required outcomes and acceptance checks for the implementer.

Deliverable: A single task document placed under `/docs/tasks/` named `A7_Scripts & Commands.md` containing scope, prerequisites, step-wise tasks, acceptance criteria, files-to-change (paths), and required test plan location. Reference this code-scout report for repository truths.

Copy-paste-ready prompt (END)

Handoff notes:

- Key repo truths: root scripts delegate to Turbo (`turbo run build`, `turbo run dev`, `turbo run lint`), `.github/copilot-instructions.md` documents developer commands, and there is no root `test` script or root `README.md` found. Planner should rely on these facts and the Docs Gatekeeper output for any version pinning or doc requirements.

Handoff complete. Provide this report verbatim to the next agent.
