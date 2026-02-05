# Forgea Monorepo

Forgea is a work simulator + proof engine. This repository is a pnpm + Turborepo monorepo containing apps, shared packages, and backend services.

## Repository Structure

- apps/ — Next.js app-router apps
- packages/ — shared libraries
- services/ — backend services
- infra/ — infrastructure (Terraform, Docker images)

## Tooling Baseline

- Node.js: 20.x (LTS)
- pnpm: 10.x
- TypeScript: 5.9.3
- ESLint: 9.x (Flat Config)

## Workspace Membership

Workspace discovery is defined in pnpm-workspace.yaml and includes:

- apps/*
- packages/*
- services/*

## TypeScript Configuration

The root tsconfig.json intentionally includes only packages/ and services/. Each app uses its own tsconfig that extends the shared base in packages/config.

## Import Boundary Policy

Import boundaries are enforced by eslint.config.js:

- apps may import packages only
- services may import packages only
- no cross-app imports
- no app ↔ service imports
- packages must not import apps or services

Exceptions are intentionally minimal and must be documented alongside any rule change.

## Ownership

CODEOWNERS is located at .github/CODEOWNERS and defines ownership for top-level directories.

## Adding a New App or Service

1. Create the app or service directory under apps/ or services/.
2. Ensure its local tsconfig extends the shared base in packages/config.
3. Update eslint.config.js to add the new app/service element type.
4. Update .github/CODEOWNERS to add explicit ownership.
5. Ensure pnpm-workspace.yaml includes the top-level directory.

