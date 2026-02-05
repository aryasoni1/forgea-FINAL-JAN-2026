# Contributing

## Scope and Safety

- Do not change application logic or runtime behavior when working on repository structure tasks.
- Do not modify infra/ or schema migration files unless a task explicitly allows it.

## Repository Structure Rules

- apps/ contains Next.js applications.
- packages/ contains shared libraries.
- services/ contains backend services.

## Workspace Configuration

- pnpm-workspace.yaml is the source of truth for workspace membership.
- apps/*, packages/*, and services/* must be included.

## TypeScript Configuration

- The root tsconfig.json only includes packages/ and services/.
- Each app must define its own tsconfig that extends packages/config/tsconfig.base.json.

## Import Boundary Policy

- apps → packages only
- services → packages only
- no cross-app imports
- no app ↔ service imports
- packages must not import apps or services

Any exception must be explicit, minimal, and documented with the reason and scope.

## Adding a New App, Service, or Package

1. Create the directory under apps/, services/, or packages/.
2. Ensure local tsconfig usage aligns with the shared base.
3. Update eslint.config.js to include a new element rule for the new app or service.
4. Update .github/CODEOWNERS to add explicit ownership.
5. Keep pnpm-workspace.yaml aligned with workspace membership.

