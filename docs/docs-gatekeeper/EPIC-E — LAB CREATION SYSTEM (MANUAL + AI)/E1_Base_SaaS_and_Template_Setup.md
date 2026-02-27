FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E1 — Base SaaS and Template Setup
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Template Repositories / Repository API
  - Concept: Supported mechanisms to instantiate a repository from a template (UI "Use this template" vs REST API automation). Determines clone-time replacements and required token scopes.
  - Official source: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs cloning strategy, permissions, and supported metadata (topics, default branch, template files).
  - Decision it informs: whether to implement automation using the template API, to vendor a local scaffolder, or to add packages inside the monorepo.
  - What breaks without it: insecure or non-repeatable cloning; incorrect assumptions about token scopes or template features.

- Technology: pnpm (Workspaces)
  - Concept: Workspace package discovery and install semantics for cloned labs placed under `packages/`.
  - Official source: https://pnpm.io/
  - Exact version requirement: 10.4.x
  - Why required: Ensures cloned lab package is correctly discovered and installed in the monorepo.
  - Decision it informs: clone destination, required `package.json` fields, and workspace updates.
  - What breaks without it: clones not included in monorepo installs or CI builds.

- Technology: Turborepo (pipeline)
  - Concept: How cloned labs integrate with `turbo` pipelines, caching, and CI verification tasks.
  - Official source: https://turborepo.org/docs
  - Exact version requirement: 2.1.x
  - Why required: Integration Checker must know which tasks to run and how to add cloned packages into the dependency graph.
  - Decision it informs: CI wiring, `turbo.json` entries, and verification task names.
  - What breaks without it: CI will not validate cloned labs or will require manual pipeline edits.

- Technology: Node.js
  - Concept: Runtime version for build/test (engines/.nvmrc) in template.
  - Official source: https://nodejs.org/en/about/releases/
  - Exact version requirement: 20.x (>=20.11.0 <21.0.0)
  - Why required: Reproducible builds and compatibility with pnpm/turbo stacks.
  - Decision it informs: `.nvmrc`/`engines` and CI images.
  - What breaks without it: inconsistent dev environments and build failures.

- Technology: Git / CODEOWNERS (locking markers)
  - Concept: File-level ownership and branch protections used to mark immutable/locked surfaces in the template.
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
  - Exact version requirement: N/A (file format)
  - Why required: Enables enforceable ownership and review workflow for locked template areas.
  - Decision it informs: which files are automatically protected and require specific reviewers.
  - What breaks without it: accidental edits to locked surfaces and lack of an enforcement mechanism.

- Technology: GitHub Actions / CI
  - Concept: Reusable workflow templates or CI steps the Integration Checker will run to validate clones.
  - Official source: https://docs.github.com/en/actions
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED (action versions)
  - Why required: Defines canonical verification (install, lint, test, build) for cloned labs.
  - Decision it informs: whether clones embed workflows or use centralized reusable workflows.
  - What breaks without it: inconsistent CI across clones and missing verification gates.

- Technology: GitHub REST API / Token scopes
  - Concept: API endpoints and least-privilege token scopes required for programmatic cloning or repo creation.
  - Official source: https://docs.github.com/en/rest
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures automation uses least-privilege flows and predictable API behavior.
  - Decision it informs: automated cloning flow and secrets management.
  - What breaks without it: security exposure or broken automation.

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md
  - Coverage status: PARTIAL — contains orchestrator analysis, required agents, and user prompts but no concrete spec.
  - Exact gaps: missing directory layout, locked surfaces list, cloning checklist, and verification hooks.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md
  - Coverage status: PARTIAL — enumerates missing artifacts and risks.
  - Exact gaps: no scaffold, no CI integration details, no README for template.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI).md
  - Coverage status: PARTIAL — references `packages/lab-templates/**` but provides no implementation requirements.
  - Exact gaps: lacks required file list and cloning metadata.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-admin (UI)
  - Coverage status: PARTIAL — UI has a `Base Repository URL` placeholder, indicating expected UX but no template artifact.
  - Exact gaps: missing canonical template repo and README describing editable/locked surfaces.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - Coverage status: PARTIAL — registry contains many pinned toolchain entries but no EPIC-E / E1 registry entry.
  - Exact gaps: master registry does not reference required EPIC-E official docs described above.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL — contains pnpm/turbo/node entries but lacks GitHub template, CODEOWNERS, and cloning API entries required for E1.
  - Exact gaps: missing authoritative entries for repository templating and cloning automation.

DOCUMENTATION COVERAGE DECISION

- ❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED
  - Rationale: Orchestrator and code-scout identify the plan, but essential official-doc-backed internal docs and the template spec are absent. Implementers lack a canonical template spec, locked-surface policy, cloning API guidance, and CI verification docs.

STUDY GUIDE FOR HUMAN (required concepts)

- GitHub Template Repositories / API:
  - Why this exists: Provides a reproducible, auditable way to instantiate repos from a canonical template.
  - Why alternatives exist: Local scaffolders or cookiecutter-like tools avoid external API dependencies and allow offline generation.
  - When NOT to use it: when clones must be private within the monorepo (prefer workspace packages) or when API rate/permission constraints exist.
  - Common mistakes: assuming template copies carry over hidden metadata (secrets), over-granting token scopes, or skipping branch protection setup.

- pnpm Workspaces:
  - Why: Ensures package discovery and deterministic installs.
  - Alternatives: independent repos with their own package installation; not recommended if you want single-monorepo builds.
  - When NOT to use: when clones are intended as standalone deployable apps outside monorepo scope.
  - Mistakes: forgetting to add cloned package to workspace globs or mismatching `packageManager` pins.

- Turborepo pipelines:
  - Why: Provides consistent CI tasks and caching semantics for validation.
  - Alternatives: per-repo CI or different orchestrators; adds complexity for cross-package caching.
  - When NOT to use: one-off labs that will never be built in CI (rare).
  - Mistakes: leaving `turbo` unpinned or not exposing verification task names in the template.

- Node.js runtime:
  - Why: Reproducible dev/build environment.
  - Alternatives: containerized builds (Docker) but still need Node pinning for local dev.
  - Mistakes: mismatched `.nvmrc`/CI image leading to subtle incompatibilities.

- CODEOWNERS / locking:
  - Why: Enforce immutable surfaces through review rules.
  - Alternatives: linters/enforcement scripts, pre-commit hooks; these complement CODEOWNERS.
  - Mistakes: marking too-large paths as locked or relying solely on CODEOWNERS without branch protection.

- GitHub Actions / CI:
  - Why: Automatable verification for clones.
  - Alternatives: centralized CI that discovers new repos; tradeoffs for discoverability and secrets.
  - Mistakes: embedding secrets in templates or not pinning action versions.

INTERNAL DOCS TO ADD OR EXTEND (required)

- /docs/official-docs/EPIC-E/lab-template-spec.md
  - Purpose: Canonical template directory layout, file-by-file purpose, and explicit list of immutable/locked surfaces.
  - Exact knowledge to add: Top-level paths, file examples, exact locked-surface rationale and enforcement mechanisms, `.nvmrc`/`engines`, required `package.json` fields.
  - Required version pin: Node 20.x, pnpm 10.4.x, turbo 2.1.x.

- /docs/official-docs/EPIC-E/clone-strategy.md
  - Purpose: Programmatic cloning strategy, repo-vs-package decision, required metadata files, and replacement rules.
  - Exact knowledge to add: use-case decision tree (monorepo package vs independent repo), required replacers (name, slug, package name), token scope list, recommended API calls or CLI script sample.
  - Required version pin: GitHub API guidance — PIN BEFORE IMPLEMENTATION.

- /docs/official-docs/EPIC-E/ci-guidelines.md
  - Purpose: Reusable verification steps for cloned labs (install, lint, test, build) and `turbo` task names.
  - Exact knowledge to add: required `workflow_call` templates, example job definitions, and expected verification output format.
  - Required version pin: Turborepo 2.1.x, pnpm 10.4.x.

- /docs/official-docs/EPIC-E/locked-surfaces-policy.md
  - Purpose: Enforcement plan for immutable files, CODEOWNERS templates, and linter rules.
  - Exact knowledge to add: explicit path list, required CODEOWNERS entries, branch protection recommendations, and enforcement scripts.
  - Required version pin: N/A for CODEOWNERS, but include pinning for any enforcement actions.

OPEN QUESTIONS / AMBIGUITIES (blockers)

- Should lab clones be created as independent GitHub repositories (template repos) or as packages within `packages/` inside this monorepo? This affects token scopes, CI, and release model.
- Who is the canonical owner for locked surfaces (team or service account)? CODEOWNERS and branch protection implications.
- Are clones expected to receive automatic CI/Release pipelines, or will teams wire their own? (affects `ci-guidelines` design)
- Exact GitHub API constraints for organisation-level templates and required token scopes — MUST BE PINNED.

MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md`:
  - Date: 2026-02-14
    - Epic / Feature: EPIC-E / E1 — Base SaaS and Template Setup
    - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md
    - Status: ADDED
    - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for the lab template and cloning strategy.

Handoff checklist (one-line): Implementer must produce `packages/lab-templates/` scaffold, `scripts/clone-lab.sh` (or equivalent), `README.md` describing locked vs editable surfaces, and a minimal `ci/verify.yml` workflow.

Handoff complete. Provide this report verbatim to the next agent.
