# Git

- Category: VCS
- Epics: A, F, K
- Version / Requirement: N/A
- Intent / Critical Decision: Repository semantics, commit/push behavior.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Define canonical `.gitignore`, `CODEOWNERS`, and repo hygiene for monorepo scale.
- Important points: Add `.gitignore` templates, CODEOWNERS guidance, and pre-commit hook recommendations; document large-file handling (Git LFS) if required.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Define repository template semantics and locking conventions for cloned labs, including which paths are editable vs locked in the template.
- Important points:
  - Templates must document locked surfaces (e.g., test harness, verification scripts, canonical fixtures) and recommend `CODEOWNERS`/branch-protection entries to enforce review gating.
  - Provide a repository-level README for template authors with exact clone/instantiate steps and required metadata (lab id, display name, package name) to ensure cloned repos are discoverable by the Integration Checker.
  - Document `forgea.config.json` placement and conventions (location, required fields) so tools can discover config files deterministically.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Define repository lifecycle and branch-protection semantics required when the Forgea GitHub App creates or modifies template repositories.
- Important points:
  - Document recommended branch-protection rules for template repositories (require status checks, require CODEOWNERS approvals, restrict who may push directly) and how the GitHub App should interact with those protections (create PRs, request reviews) rather than pushing directly.
  - Provide a repo-lifecycle guide for template repositories (draft template repo → published template → archived) and specify required metadata and permissions at each stage.
  - Include guidance for app installation footprints (org vs per-repo) and how repo-level protections affect installation-level permissions and automation workflows.
