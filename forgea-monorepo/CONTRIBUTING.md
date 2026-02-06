# Contributing

## Guardrails (Read Before Changing Files)

- Follow the implementer guardrail in [.github/agents/implementer.md](../.github/agents/implementer.md). Do not edit files listed there unless a task explicitly allows it.
- Do not include secrets or real credentials in documentation or example files.
- Keep onboarding content in [README.md](README.md) and guardrails here to avoid duplication.

## Runtime & Editor Policy

- Node.js pin and engine range are documented in [docs/official-docs/node-version-policy.md](../docs/official-docs/node-version-policy.md).
- Editor defaults are defined in [.editorconfig](.editorconfig) and documented in [docs/official-docs/editorconfig.md](../docs/official-docs/editorconfig.md).

## Review Expectations

- Changes that affect repository structure or guardrails require review by repo owners.
- Keep diffs minimal and avoid unrelated formatting changes.

## Scope and Safety

- Do not change application logic or runtime behavior when working on repository structure tasks.
- Do not modify infra/ or schema migration files unless a task explicitly allows it.

## Repository Structure Rules

- apps/ contains Next.js applications.
- packages/ contains shared libraries.
- services/ contains backend services.

## Workspace Configuration

- pnpm-workspace.yaml is the source of truth for workspace membership.
- apps/_, packages/_, and services/\* must be included.

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
