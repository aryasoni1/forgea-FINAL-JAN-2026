# GitHub Actions

- Category: CI/CD
- Epics: A, H
- Version / Requirement: Pin required
- Intent / Critical Decision: Workflow syntax and runner environment determinism.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Provide reusable `workflow_call` verification templates and pinned action versions to validate cloned labs (install, lint, verify, build, snapshot upload).
- Important points:
  - Offer a reusable `verify-lab` workflow that accept `lab-package` and `sha` inputs and produces deterministic JSON verification reports and artifact uploads.
  - Pin actions and runner images, and document required token scopes for artifact uploads and template instantiation.
  - Recommend workflow trigger semantics (PRs -> verification; `workflow_dispatch` for manual re-run) and safe permissions (least-privilege tokens, no broad repository write perms).

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Provide canonical Actions workflows for webhook-driven processing (on webhook enqueue → ack/enqueue/processing) and safe app-install automation workflows.
- Important points:
  - Offer a reusable `on: workflow_dispatch` and `on: repository_dispatch` workflow for replaying and reprocessing webhook deliveries in staging for debugging.
  - Pin GitHub Actions used by webhook handlers (checkout, setup-node, etc.), document required `permissions` scopes for minimal operation (e.g., `contents: read`, `checks: write`), and ensure workflows run with least privilege.
  - Document safe runner permissions when the GitHub App performs repo operations (instantiation from templates, setting CODEOWNERS) and provide guidance for using ephemeral installation tokens fetched from Vault in workflows.
