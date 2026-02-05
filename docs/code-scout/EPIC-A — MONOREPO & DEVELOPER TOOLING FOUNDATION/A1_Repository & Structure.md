FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: FEATURE A1 — Repository & Structure
- Source: /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md


TASKS CHECKED

- Verify presence of monorepo workspace and package configuration
- Locate `apps/`, `packages/`, and `services/` directories
- Check for repository-level docs (`README.md`, CONTRIBUTING)
- Inspect `.gitignore` and workspace files (`pnpm-workspace.yaml`, `package.json`, `tsconfig.json`, `turbo.json`)
- Search for ownership or boundary artifacts (CODEOWNERS, ownership docs)
- Search for enforcement mechanisms for "no cross-app imports" (lint rules, tsconfig path isolation, tooling)


WHAT ALREADY EXISTS

- /forgea-monorepo/package.json: monorepo `workspaces` include `apps/*`, `packages/*`, and `services/*` (workspace config present).
- /forgea-monorepo/pnpm-workspace.yaml: lists `apps/*` and `packages/*` as workspace packages.
- /forgea-monorepo/apps/: contains four apps: `forgea-admin`, `forgea-labs`, `forgea-learn`, `forgea-lessons`.
- /forgea-monorepo/packages/: contains `audit`, `config`, `design`, `markdown`, `schema`, `ui` packages.
- /forgea-monorepo/services/: contains `api-core`, `content-engine`, `verification-runner` services.
- /forgea-monorepo/tsconfig.json: extends `packages/config/tsconfig.base.json`, sets `baseUrl` and `paths` for internal packages, and `include` is `packages/**/*`, `services/**/*`.
- /forgea-monorepo/.gitignore: comprehensive ignore for Node, Turborepo, builds, env files.
- /forgea-monorepo/turbo.json: turborepo task definitions present.
- Several TODOs and comments indicating desired repository policies, e.g. TODO in `packages/audit/src/audit.service.ts` to add eslint/code-review enforcement to call `AuditService.log`.
- Migrations and DB-level enforcement exist under `packages/schema/prisma/migrations/` (e.g., immutability triggers and lifecycle guards), indicating active infra work in repo.


WHAT IS PARTIALLY IMPLEMENTED

- Workspace definition mismatch: `pnpm-workspace.yaml` lists only `apps/*` and `packages/*`, while `/forgea-monorepo/package.json` `workspaces` includes `services/*` as well. This is a divergence between pnpm workspace file and package.json.
- `tsconfig.json` `include` covers `packages` and `services`, but not `apps`. TypeScript project references/paths exist for packages but apps are not included in the tsconfig `include` (possible deliberate, but notable).
- No repository-level `README.md` or CONTRIBUTING guide found at `/forgea-monorepo/README.md` (not present).
- No `CODEOWNERS` or explicit ownership docs located.
- No explicit enforcement mechanism for "no cross-app imports" discovered: no repository ESLint rule set or config file that enforces import boundaries was found in the scan results (there are TODOs referencing enforcement, but no implemented rule).


WHAT IS MISSING

- Root monorepo README or contributing documentation at `/forgea-monorepo/README.md` (Not found).
- `pnpm-workspace.yaml` does not include `services/*` while `package.json` workspaces include it — missing alignment.
- Explicit ownership / CODEOWNERS file (Not found).
- Explicit lint rule / tooling that enforces "no cross-app imports" (Not found). There is a TODO suggesting such enforcement should be added for audit writes, but no implemented rule.
- A central document describing repository boundaries, ownership, and the intended policy for cross-app imports.


RISKS OR CONFLICTS

- Workspace config divergence: `pnpm-workspace.yaml` vs `package.json` `workspaces` may cause inconsistent package discovery in tools that rely on one or the other (pnpm vs other tools), causing unexpected installation/build behavior.
- `tsconfig.json` excluding `apps` could lead to inconsistent TypeScript behavior, editor language service differences, or missing path mappings for app code.
- Missing `CODEOWNERS` and missing ownership docs increase the risk of unclear ownership and accidental cross-app changes.
- No automated import-boundary enforcement increases chance of accidental cross-app imports and coupling.
- Several TODOs in code (e.g., `AuditService.log` enforcement) indicate desired repo policies that are not yet enforced; this creates auditability gaps until enforcement is implemented.


QUESTIONS FOR CLARIFICATION

1. Should `services/*` be included in `pnpm-workspace.yaml` to match `package.json` `workspaces`, or is the divergence intentional?
2. Are the `apps/` intentionally excluded from `tsconfig.json` `include` (separate TS configs per app), or should they be added to enable unified path mapping and editor experience?
3. Is there an existing authoritative place you want repository-level docs (README, CONTRIBUTING, CODEOWNERS), or should they be created under `/forgea-monorepo/`?


NEXT AGENT HANDOFF PROMPT (for `planner-architect`) — COPY/PASTE READY

"Using the attached Code-Scout report: `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md`, please produce the draft task document `/docs/tasks/task-A1-<YYYY-MM-DD>.md` (DRAFT) for FEATURE A1 — Repository & Structure.

Inputs: this Code-Scout report (facts and gaps), and the orchestrator output at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md`.

Required in the task doc:
- Goal, in-scope and out-of-scope items
- Preconditions and explicit assumptions (e.g., intended workspace layout, TypeScript inclusion semantics)
- Invariants (e.g., no cross-app imports unless explicitly allowed)
- Step-by-step plan (non-code) that addresses: align `pnpm-workspace.yaml` vs `package.json`, decide on `tsconfig` coverage for `apps`, add repository README and CODEOWNERS, and specify enforcement tooling for import boundaries (eslint/TS/monorepo tooling)
- Files expected to modify and files not to touch (e.g., existing migrations under `packages/schema/prisma` are LOCKED)
- Verification criteria that are machine-checkable (workspace consistency, presence of README, CODEOWNERS, a lint rule that fails on cross-app imports)

Do NOT implement code. Stop and present the draft task document for explicit approval before proceeding."

Handoff complete. Provide this report verbatim to the next agent.