Context Summary

This artifact maps deterministic, domain-isolated NotebookLM prompts for FEATURE A1 — Repository & Structure (EPIC-A). Prompts are experience-layered (Beginner → Senior), each targets a single division_category notebook file under /docs/technology/docs-tech-notebooklm/division_category, and produce narrowly scoped outputs suitable for NotebookLM execution.

Identified Domains

- Monorepo workspace & package manager (pnpm, workspaces)
- TypeScript configuration and path mapping (tsconfig, editor UX)
- Import-boundary enforcement (ESLint/TS rules, CI gating)
- Repository documentation & ownership (README, CONTRIBUTING, CODEOWNERS)
- Turborepo / CI & task orchestration (turbo.json, CI scaling)
- Testing & failure-mode checks for workspace divergence

Execution-Mapped Prompt List

---

## Prompt ID: monorepo-workspace-config

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/07-devops-ci-cd-infra-tooling.md

Why This Notebook:
Workspace and package-manager behavior is an infrastructure/CI concern; this division covers repository-level tooling and workspace semantics.

Experience Level Focus:
Junior

Required Output Structure:
Configuration + Verification Format

Prompt To Run:
"""
You are given the repository documents in this Notebook (only use these files). Produce a focused Configuration + Verification guide that addresses the repository workspace inconsistency found in the Code-Scout report for FEATURE A1 — Repository & Structure. Inputs you must use from the Notebook: the Code-Scout report at /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md and the orchestrator output at /docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md. Use the division-category notebook specified above as context for tooling best-practices.

Scope (narrow): decide whether `services/*` should be included in `pnpm-workspace.yaml` to match `package.json`, and whether `apps/*` should be included in the root `tsconfig.json` `include`. For each decision, produce:

- Short recommendation (accept/reject) with 1-sentence rationale.
- Exact file edits (paths only) that must be made to align workspaces (no code content, just file paths and the minimal semantic change e.g., add `services/*` to `pnpm-workspace.yaml`).
- A machine-checkable verification plan (shell commands or `node`/`pnpm` commands) that confirms workspace consistency (list workspaces, ensure same set from `pnpm` and from `package.json`), and that TypeScript `baseUrl`/`paths` behave as expected in editors.

IMPORTANT: Use ONLY the documents uploaded to this Notebook. If required information is missing:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK

Define all versions explicitly. If a version is not specified in the source:
VERSION NOT SPECIFIED IN SOURCE
"""

---

## Prompt ID: tsconfig-paths

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/08-code-language-tooling-linters-part-2.md

Why This Notebook:
TypeScript project references, `tsconfig` layout, and editor language service behavior belong to language tooling and linters secondary guidance.

Experience Level Focus:
Mid

Required Output Structure:
Specification + Verification Format

Prompt To Run:
"""
Using ONLY the Notebook documents (the Code-Scout report and orchestrator output for FEATURE A1), create a Specification + Verification document that:

- Describes the intended `tsconfig.json` structure for a monorepo with `apps/`, `packages/`, and `services/` (project references vs single root config), and the tradeoffs for including `apps` in the root `tsconfig` `include`.
- Provides a concrete `tsconfig` snippet example (show the exact JSON keys and values) for the recommended approach, with explicit version notes. If source does not state a TypeScript version, include the note `VERSION NOT SPECIFIED IN SOURCE`.
- Lists editor/IDE verification steps (commands, tsserver checks, or quick `tsc --showConfig`) and automated CI checks to ensure path mappings and references are correct.

If the Notebook lacks needed info, output the single line:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK

Define all versions explicitly. If a version is not specified: VERSION NOT SPECIFIED IN SOURCE
"""

---

## Prompt ID: import-boundary-lint

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/08-code-language-tooling-linters.md

Why This Notebook:
ESLint/TS enforcement rules fall under code-language tooling and linter policy guidance.

Experience Level Focus:
Mid

Required Output Structure:
Enforcement Rule Specification

Prompt To Run:
"""
Using ONLY the Notebook documents (A1 Code-Scout + orchestrator outputs and the division-category file above), produce an Enforcement Rule Specification for preventing accidental cross-app imports in the monorepo.

Output must include:

- A short policy statement (one paragraph) that will become the repository invariant (e.g., "No cross-app imports unless explicitly allowed via a public package").
- One recommended ESLint rule/plugin configuration (exact config snippet) or TypeScript-only alternative (project references / composite builds), with pros/cons for each.
- A minimal CI gating plan (how to fail CI when rule is violated) with commands to run the lint check.
- Backwards-compatibility considerations and an incremental rollout strategy (e.g., baseline only warns then enforced).

If required source documents are missing, output:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK

If version of ESLint or other tooling is not specified in source, include: VERSION NOT SPECIFIED IN SOURCE
"""

---

## Prompt ID: repo-docs-ownership

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/03-security-supply-chain-standards.md

Why This Notebook:
Repository-level ownership, CODEOWNERS, and supply-chain hygiene are security/governance topics.

Experience Level Focus:
Beginner

Required Output Structure:
Checklist Format

Prompt To Run:
"""
Using ONLY the Notebook documents provided for FEATURE A1, produce a concise Checklist that a non-expert maintainer can follow to create required repository-level docs and ownership artifacts. The checklist should cover:

- Root `README.md` and `CONTRIBUTING.md` minimal contents (3 bullet points each).
- `CODEOWNERS` placement and a sample owner entry (path-level rules only, no email obfuscation needed).
- A short 'where to file ownership disputes' instruction.

For each checklist item include a machine-checkable verification command (e.g., `test -f <path>` or `git ls-files | grep <path>`).

If something is not present in the Notebook sources, write exactly:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK
"""

---

## Prompt ID: turborepo-ci

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/07-devops-ci-cd-infra-tooling.md

Why This Notebook:
Turbo/task orchestration and CI-related scaling guidelines belong in the devops/CI tooling domain.

Experience Level Focus:
Senior

Required Output Structure:
CI Validation Plan

Prompt To Run:
"""
Using ONLY the Notebook documents for FEATURE A1, produce a CI Validation Plan that verifies turborepo and `turbo.json` task definitions are correct and resilient to workspace divergence. The plan must:

- List specific machine-checkable CI steps that assert caches, task outputs, and workspace package discovery behave consistently (include `pnpm` and `turbo` commands).
- Describe failure/invariant scenarios at scale (e.g., large workspace with many apps causing stale cache misses) and mitigation steps.
- Provide a short rollback plan for CI configuration changes.

If necessary source files are missing, output:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK

If the source lacks tooling versions, include: VERSION NOT SPECIFIED IN SOURCE
"""

---

## Prompt ID: failure-modes-testing

Target Notebook File:
docs/technology/docs-tech-notebooklm/division_category/14-testing-qa.md

Why This Notebook:
Testing and QA guidance is the right place to catalog failure modes and automated checks.

Experience Level Focus:
Senior

Required Output Structure:
Failure Mode Catalog

Prompt To Run:
"""
Using ONLY the Notebook documents for FEATURE A1, produce a Failure Mode Catalog that enumerates plausible problems arising from the missing items in the Code-Scout report (workspace divergence, missing README/CODEOWNERS, missing import enforcement). For each failure mode include:

- Short description of the failure.
- Likely root causes.
- Concrete, machine-checkable detection steps (commands, scripts, or assertions).
- Immediate mitigation steps and long-term fixes.

If any required Notebook docs are missing, output:
MISSING SOURCE — OFFICIAL DOC NOT PRESENT IN NOTEBOOK

If versions are unspecified in the sources, include: VERSION NOT SPECIFIED IN SOURCE
"""

---

Required Coverage Notes

Across these prompts we collectively cover:
SECTION 0 — Beginner Mental Model (covered in `repo-docs-ownership` checklist)
SECTION 1 — Architectural Invariants (covered in `import-boundary-lint` enforcement policy)
SECTION 2 — Specification & Configuration (covered in `tsconfig-paths` and `monorepo-workspace-config`)
SECTION 3 — Security & Hygiene (covered in `repo-docs-ownership` and `import-boundary-lint`)
SECTION 4 — Versioning & Toolchain Discipline (covered in `turborepo-ci` and prompts include explicit version-notes)
SECTION 5 — Edge Cases & Failure Modes (covered in `failure-modes-testing`)
SECTION 6 — Infrastructure Constraints (covered by `turborepo-ci` plan)
SECTION 7 — Manual Setup Checklist (covered in `repo-docs-ownership`)

No sections are marked NOT APPLICABLE.

Execution Notes

- Each prompt is deliberately narrow and targets exactly one division_category notebook file as specified above.
- Prompts instruct NotebookLM to rely only on the Notebook files supplied in this repo and to emit clear missing-source markers when needed.

End of artifact.
