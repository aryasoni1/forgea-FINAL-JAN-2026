FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J1 — Project & Tooling Setup
- Source: Agent Orchestrator output: [docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md](docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md)

TASKS CHECKED

- Planner / Architect: produce scaffold spec, MDX frontmatter contract, CI validation requirements
- Implementer: scaffold `apps/lessons` (Astro + MDX), configure SSG & islands, disable global JS, add build-time frontmatter validator
- Integration Checker: add CI workflow to pre-render lessons and run validator
- QA / Tester: run build and smoke tests for pre-rendered pages and no-JS rendering
- Documenter / Historian: publish onboarding and validation docs

WHAT ALREADY EXISTS

- [docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md](docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md) — Agent Orchestrator output describing required agents, execution plan, and agent prompts for this feature.
- [docs/tasks/master_tasks_V1/EPIC-J — LESSON USER EXPERIENCE (UX).md](docs/tasks/master_tasks_V1/EPIC-J — LESSON USER EXPERIENCE (UX).md) — Master task file listing Feature J tasks including "Create `apps/lessons` Astro project", "Enable MDX integration", and schema/validation items (J2, J3 references).
- forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx — Client React component (`MDXLessonSidebar`) used in workspace UI; contains static lesson/guide copy and demonstrates MDX/lesson UI integration points.
- forgea-monorepo/apps/forgea-admin — Admin UI contains a Lesson Manager UI (compiled artifacts reference MDX entries like `closures.mdx`, `scope-chain.mdx`). Admin code references MDX-based lesson management features.

WHAT IS PARTIALLY IMPLEMENTED

- MDX-related UI components and a Lesson Manager UI exist in `apps/forgea-admin` and `apps/forgea-labs` (UI-level integration points are present).
- Orchestrator and task documents define MDX schema/validation requirements (see J2, J3 and EPIC-M tasks), but a canonical Planner YAML manifest and a single agreed-on MDX frontmatter schema file are not present in source.

WHAT IS MISSING

- `apps/lessons` Astro project scaffold (no `apps/lessons` directory found in repository root).
- Planner-produced YAML manifest or canonical spec for `apps/lessons` including MDX frontmatter schema and SSG/islands config.
- Implementer artifacts: build-time frontmatter validator, local `validate-lessons` CLI, `dev` and `build` commands for `apps/lessons`.
- CI workflow(s) to pre-render lessons at PR time and invoke frontmatter validation to fail PRs with schema errors.
- Source `.mdx` lesson files in a repo directory for `apps/lessons` (search did not find `.mdx` source files under repository paths).

RISKS OR CONFLICTS

- Compiled server assets (Next/.next) reference MDX files (example: closures.mdx, scope-chain.mdx) but repository search did not locate source `.mdx` files. This suggests content may live outside the repo (CMS, remote store) or is generated — causing ambiguity about where canonical lesson sources must be authored and validated.
- Multiple EPICs and agent outputs reference MDX schema and validation (EPIC-J J2/J3, EPIC-M M3, EPIC-D storage guidance). Without a single canonical manifest owner there is risk of overlapping or conflicting validation rules.

QUESTIONS FOR CLARIFICATION

- Should lesson source `.mdx` files be stored in-repo under `apps/lessons` (preferred for SSG), or is content served from an external CMS? Please confirm canonical source location.
- Where should the Planner YAML manifest and canonical MDX frontmatter spec be authored and stored (docs repo under `/docs`, or inside `forgea-monorepo/packages/config`)?

NEXT AGENT HANDOFF PROMPT (FOR PLANNER / ARCHITECT)

Use the following prompt verbatim when invoking the Planner / Architect agent. This report is available at: [docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md](docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md)

--- BEGIN PROMPT ---
You are Planner / Architect for Feature J1 — Project & Tooling Setup. Reference the code-scout report at [docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md](docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J1_Project & Tooling Setup.md) which lists observed repository state and gaps.

Your task (strict): Produce an actionable spec document and YAML manifest only. Do not implement or scaffold code. The spec must include:

- Folder layout for `apps/lessons` (Astro) including where `.mdx` source files will live and any staging/sample content expectations.
- Canonical MDX frontmatter schema summary (fields, types, required/optional) and a short note on allowed/disallowed in-body content (no solutions, no raw HTML for DB storage).
- SSG configuration constraints and default settings required for pre-rendering (e.g., all lesson routes pre-renderable at build time).
- Default JS policy: `disabled-global-JS` with partial hydration/islands strategy described at a high level (where interactive islands are allowed and how they are detected).
- Build-time validation contract: exact validator inputs/outputs, CLI name (`validate-lessons`), exit codes for CI, and example error formats the Integration Checker should expect.
- A YAML manifest that lists the deliverables for the Implementer and Integration Checker (file paths, expected commands, CI job names, Node version constraints), and a concise checklist of artifacts to produce.

Constraints: stay within the Planner role (spec + YAML + checklist). Do not scaffold the project, modify repo, or produce CI configs. The Implementer and Integration Checker will act on the manifest you produce.

Deliverables (strict):

1. A single YAML manifest file content (paste-ready) describing scaffold layout, MDX schema reference, validator contract, and CI job names.
2. A one-page checklist (bullet list) of concrete deliverables for Implementer and Integration Checker.

--- END PROMPT ---

Handoff complete. Provide this report verbatim to the next agent.
