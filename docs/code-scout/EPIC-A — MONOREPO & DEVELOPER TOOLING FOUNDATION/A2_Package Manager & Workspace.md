FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A2 — Package Manager & Workspace
- Source: /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md

TASKS CHECKED

- Scan for existing pnpm-workspace.yaml
- Inspect root `package.json` for `packageManager` field and `workspaces` array
- Inspect `scripts` section in root `package.json`
- Identify workspace topology / resolution mismatches (packages listed in workspaces but missing from pnpm-workspace.yaml)

WHAT ALREADY EXISTS

- /forgea-monorepo/package.json
  - Description: Root monorepo package.json present and readable.
  - Key facts observed:
    - `packageManager`: "pnpm@10.28.1" (version-pinned)
    - `workspaces`: ["apps/*","packages/*","services/*"]
    - `scripts`: `build`, `dev`, `lint` (respectively "turbo run build", "turbo run dev", "turbo run lint")

- /forgea-monorepo/pnpm-workspace.yaml
  - Description: pnpm workspace file present.
  - Key facts observed:
    - `packages` entries: `apps/*`, `packages/*`
    - Note: `services/*` is NOT present here (see discrepancy below).

- /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md
  - Description: Agent Orchestrator output for Feature A2 (task definitions and required agents).

WHAT IS PARTIALLY IMPLEMENTED

- pnpm workspace configuration is present but inconsistent:
  - Root `package.json` lists `services/*` in its `workspaces` array, but `pnpm-workspace.yaml` does not include `services/*` under `packages:`. This suggests the monorepo may not be consistently configured for pnpm workspace resolution.

- `packageManager` is correctly pinned in root `package.json` to `pnpm@10.28.1` (present and versioned).

WHAT IS MISSING

- `services/*` entry in `/forgea-monorepo/pnpm-workspace.yaml` (explicitly not found).
- Docs Gatekeeper approval artifact: no gatekeeper output file found for official pnpm docs validation (docs-gatekeeper step not executed yet).

RISKS OR CONFLICTS

- Workspaces mismatch: Because `package.json` includes `services/*` but `pnpm-workspace.yaml` does not, pnpm may fail to include packages under `services/` in workspace operations (install, link, top-level hoisting rules, turbo runs). This is an observable configuration conflict.

- Inconsistent workspace definitions across `package.json` and `pnpm-workspace.yaml` may lead to CI/build flakes or missing package resolution for services packages.

QUESTIONS FOR CLARIFICATION

- None required for the scout pass; planner-architect may request policy-level decisions (e.g., canonical source of workspace declarations) when producing the task document.

NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

Use this report (docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md) as your factual source. Your role: produce the authoritative task document for Feature A2 — "Package Manager & Workspace".

Facts to use (do not modify or interpret beyond these facts):

- Root `package.json` at `/forgea-monorepo/package.json` contains `packageManager: pnpm@10.28.1`, `workspaces: ["apps/*","packages/*","services/*"]`, and scripts `build`, `dev`, `lint`.
- `/forgea-monorepo/pnpm-workspace.yaml` lists `packages: - apps/* - packages/*` and is missing `services/*`.
- The Agent Orchestrator output for A2 exists at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A2_Package Manager & Workspace.md` and requires: docs-gatekeeper verification and planner-architect task document creation.

Deliverable requirements (from orchestrator):

- Produce a task document for Feature A2 and place it under `/docs/tasks/` with an appropriate name referencing A2.
- Do NOT write code; only author the task document following orchestrator structure and scope.
- The task document must reference the Docs Gatekeeper approval (ensure you include a placeholder for gatekeeper output if not present).

Please reference this code-scout report file when you start and do not modify repo files as part of planning.

-- End of report --
