# CODEOWNERS

- Category: VCS / Governance
- Epics: A
- Version / Requirement: N/A
- Intent / Critical Decision: Define file and folder ownership to automate reviewer assignment and support protected-branch workflows.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A1 / repo structure)
- EPIC-A intent: Centralize ownership mapping so `CODEOWNERS` enforces who approves changes to apps, packages, and infra.
- Important points:
  - Place `CODEOWNERS` at the repository root (e.g., `/forgea-monorepo/CODEOWNERS`) so GitHub recognizes it automatically.
  - Map ownership by globs (example patterns):
    - `/apps/* @team-apps`
    - `/packages/* @team-core`
    - `/services/* @team-services`
  - Tie `CODEOWNERS` to branch protection rules for required reviews and CI gating.
  - Document the process to update ownership (who can change `CODEOWNERS`) and add guidance for temporary exceptions.
  - Include examples in the repo docs and link from the `repo-boundaries` policy.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use `CODEOWNERS` as part of the locked-surface enforcement for lab templates.
- Important points:
  - Provide recommended `CODEOWNERS` globs for template locked surfaces (e.g., `/tests/** @team-qa`, `/verifier/** @team-security`).
  - Document the approval flow for exceptions (who may temporarily approve edits to locked surfaces) and how to capture audit evidence when an exception is granted.
  - Tie `CODEOWNERS` updates to a review/case record so changes to ownership are auditable when template policies change.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use `CODEOWNERS` to enforce reviewer gates for app-driven template changes and to restrict who can approve changes to template-locked surfaces.
- Important points:
  - Provide `CODEOWNERS` snippets that map GitHub App-driven files (e.g., `/templates/**`, `/scaffolding/**`) to automation or owning teams and document how the GitHub App's service account participates in review flows.
  - Ensure branch-protection rules require `CODEOWNERS` approvals for protected branches and document how the app can request reviews or create PRs that follow the ownership flow.
  - Document emergency exception flows (signed approval ticket) when automation must modify locked surfaces and how to capture audit evidence for those exceptions.
