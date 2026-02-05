# Task A1 — Manual Verification Checklist

Use this checklist to verify the repository structure updates for Task A1.

## Workspace Alignment

- Open forgea-monorepo/pnpm-workspace.yaml and confirm it includes apps/*, packages/*, and services/*.
- Open forgea-monorepo/package.json and confirm the workspaces list includes apps/*, packages/*, and services/*.

## TypeScript Coverage Decision

- Open forgea-monorepo/tsconfig.json and confirm the include list covers packages/**/* and services/**/* only.
- Confirm no apps/ paths are included in the root tsconfig include list.

## Repository Entry Docs

- Confirm forgea-monorepo/README.md exists and includes a section describing:
  - Repository structure (apps/, packages/, services/)
  - Workspace membership
  - Import boundary policy
- Confirm forgea-monorepo/CONTRIBUTING.md exists and includes:
  - Workspace configuration rules
  - Import boundary policy
  - Guidance for adding apps/services/packages

## CODEOWNERS Location and Validity

- Confirm forgea-monorepo/.github/CODEOWNERS exists.
- Open the CODEOWNERS file and confirm:
  - No use of ! or [] syntax
  - Explicit ownership for apps/, packages/, services/, infra/, docs/, and .github/

## Boundary Enforcement Config

- Confirm forgea-monorepo/eslint.config.js exists.
- Review the boundaries configuration and confirm:
  - apps may import packages only
  - services may import packages only
  - no cross-app imports
  - no app ↔ service imports
  - packages do not import apps or services

## Optional Local Validation (No Results Needed)

- From forgea-monorepo, run pnpm -r lint to ensure ESLint runs with the new boundary rules.
