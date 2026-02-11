### FEATURE ANALYSIS

- Feature Type: Code / Infra (project scaffold + build)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define project layout, MDX integration, build-time validation contract.
- Implementer — Scaffold `apps/lessons` Astro project, enable MDX, configure SSG and partial hydration.
- Integration Checker — Add CI step for build-time lesson validation and pre-render checks.
- QA / Tester — Run build, smoke test pre-rendered routes and no-JS rendering.
- Documenter / Historian — Record scaffold, conventions, and developer onboarding notes.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for initial scaffold; security review later during hardening.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner / Architect — Produce scaffold spec, MDX frontmatter contract, and CI validation requirements.
- Step 2: Implementer — Scaffold `apps/lessons`, install MDX, configure Astro for SSG, disable global JS, enable islands. (Depends on Step 1)
- Step 3: Integration Checker — Add CI build job to pre-render lessons and run validation. (Can start after Step 2 artifact available)
- Step 4: QA / Tester — Run smoke tests (pre-rendered pages, no-JS rendering) and report regressions. (Parallel with Documenter)
- Step 5: Documenter / Historian — Publish developer onboarding and build-time validation docs. (Parallel with QA)

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a dedicated "Static Site Performance Auditor" agent to enforce 3G payload budgets during CI.
- Ensure the Implementer has access to canonical MDX schema produced by Planner to avoid rework.

### AGENT PROMPTS

- Planner / Architect:
	You are Planner/Architect. Produce an actionable spec for `apps/lessons` (Astro) including folder layout, MDX frontmatter schema summary, SSG config, disabled-global-JS default, partial hydration strategy (islands), and build-time validation requirements. Output a YAML manifest and a checklist of deliverables for Implementer and Integration Checker.

- Implementer:
	You are Implementer. Using the Planner spec, scaffold `apps/lessons` with Astro + MDX, configure SSG and islands, disable global JS by default, and add a build-time frontmatter validator hook. Commit to a feature branch and provide `dev` and `build` commands.

- Integration Checker:
	You are Integration Checker. Create CI workflow(s) that pre-render lessons at PR time, invoke the build-time frontmatter validator, and fail PRs with schema errors. Provide a minimal CI YAML and requirements (node version, env vars).

- QA / Tester:
	You are QA. Run the scaffolded build and verify that sample lessons pre-render and render correctly with JS disabled. Produce a concise test checklist and report any failures.

- Documenter / Historian:
	You are Documenter. Write developer onboarding docs summarizing scaffold layout, MDX encoding rules, local dev commands, and CI validation expectations.
