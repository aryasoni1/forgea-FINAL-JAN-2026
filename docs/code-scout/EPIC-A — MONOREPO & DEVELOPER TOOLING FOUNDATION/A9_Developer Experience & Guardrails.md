FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A9 — Developer Experience & Guardrails
- Source: Agent Orchestrator Output (docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A9_Developer Experience & Guardrails.md)

TASKS CHECKED

- Identify an existing Node version file (`.nvmrc` or equivalent like `.node-version`).
- Identify an `.editorconfig` file or other editor formatting guardrails.
- Locate onboarding docs or contributor-facing developer guides.
- Locate any repository "DO NOT TOUCH" infra notes or explicit guardrails.

WHAT ALREADY EXISTS

- /forgea-monorepo/package.json — Root `package.json` exists; it does not include an `engines` field and contains `packageManager: "pnpm@10.28.1"`.
- /.github/agents/implementer.md — Contains an explicit implementer policy including a rule: "Do NOT touch files listed under **Files to NOT Touch**" (repository-level implementer guidance present).
- /forgea-monorepo/apps/forgea-labs/components/forgea-onboarding.tsx — UI component implementing an onboarding flow (steps: auth, role, skills, github, resume, plan).
- /forgea-monorepo/apps/forgea-labs/app/onboarding/page.tsx and /forgea-monorepo/apps/forgea-labs/app/(app)/onboarding/setup/page.tsx — Onboarding pages wired into the Next.js app.
- /forgea-monorepo/services/content-engine/README.md — Service-level README exists for `services/content-engine`.
- /docs/tasks/master_tasks_V1/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION.MD — Contains a line item: "Add Node version file (`.nvmrc` or equivalent)" (task backlog acknowledges the need).

WHAT IS PARTIALLY IMPLEMENTED

- Onboarding UI exists in `apps/forgea-labs` but there is no centralized, repository-level "Developer Onboarding" or contributor-facing `README.md` at the repository root.

WHAT IS MISSING

- No `.nvmrc`, `.node-version`, or equivalent Node version file found at the repository root or workspace root.
- No `.editorconfig` file found in the workspace.
- No top-level `README.md` or `CONTRIBUTING.md` documenting developer setup, Node version requirement, editor settings, or repository guardrails for new contributors (only service-level READMEs and an AI-agent instructions file exist).
- No `engines` field in root `package.json` to declare supported Node versions.

RISKS OR CONFLICTS

- Missing Node version file or `engines` declaration risks contributors using incompatible Node versions, producing inconsistent local builds and test results.
- Absence of `.editorconfig` increases risk of inconsistent editor formatting across contributors.
- Onboarding flow exists but is app-scoped (`apps/forgea-labs`) rather than being a repository-level developer onboarding doc; contributors may miss repository conventions.
- Existing repo governance doc (`.github/agents/implementer.md`) enforces "Files to NOT Touch" rules; task designers and implementers must respect those file lists to avoid policy violations.
- (Related observed conflicts elsewhere in repo): `pnpm-workspace.yaml` omits `services/*` while `package.json` `workspaces` includes it; `turbo` is present in `devDependencies` as `latest` — these repository inconsistencies impact onboarding and should be considered by the planner (observed facts).

QUESTIONS FOR CLARIFICATION

- Should a single canonical developer-facing `README.md` be created at the repository root as the source-of-truth for onboarding and guardrails, or is `.github/copilot-instructions.md` intended to serve that role? (Required to determine deliverables.)
- Is there a mandated Node version (or policy to pin `turbo`/tooling versions) that the planner should require be recorded in `.nvmrc`/`engines`? If yes, provide the exact version string.

NEXT AGENT HANDOFF PROMPT (for planner-architect)

- Role: `planner-architect` (produce the authoritative task document for Feature A9 — Developer Experience & Guardrails)
- Reference: This code-scout report located at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A9_Developer Experience & Guardrails.md` and the Agent Orchestrator output at `/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A9_Developer Experience & Guardrails.md`.

Copy-paste-ready prompt (START):

You are the `planner-architect`. Using the findings in the code-scout report located at `/docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A9_Developer Experience & Guardrails.md` and any Docs Gatekeeper approval, produce the authoritative task document for Feature A9 — "Developer Experience & Guardrails" in EPIC-A.

Constraints for the task document (facts-only, do not implement):

- Confirm scope as listed in the Orchestrator output.
- Base acceptance criteria on repository truths from the code-scout report (e.g., no `.nvmrc` or `.editorconfig` present; onboarding UI exists only in `apps/forgea-labs`; root `package.json` lacks `engines`).
- Specify exact file paths the Implementer will update (file paths only). Possible targets to list: `/forgea-monorepo/.nvmrc` or `/forgea-monorepo/.node-version`, `/forgea-monorepo/.editorconfig`, `/forgea-monorepo/README.md` or `/forgea-monorepo/CONTRIBUTING.md`, and `/forgea-monorepo/package.json` (for `engines`), but do NOT modify them yourself.
- If the Docs Gatekeeper requires a version-pinned Node or EditorConfig spec, require the Implementer to use that exact version string or config.
- Do not propose implementation details or code; enumerate stepwise tasks, prerequisites, acceptance checks, and the path for the mandatory test plan.

Deliverable: A single task document placed under `/docs/tasks/` named `A9_Developer Experience & Guardrails.md` containing: scope, prerequisites, stepwise tasks, acceptance criteria (measurable), file paths to be changed, and the required test plan location `/docs/tests/task-<ID>-tests.md`.

Copy-paste-ready prompt (END)

Handoff complete. Provide this report verbatim to the next agent.
