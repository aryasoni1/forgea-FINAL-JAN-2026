# A7 — Scripts & Commands (Official)

## Purpose

This document defines the canonical root commands for the Forgea monorepo and how Turborepo orchestrates them. It is the authoritative reference for contributor-facing scripts and their delegation.

## Version Pins

- pnpm: 10.28.1
- Turborepo: ^2.1.3

These versions must be used wherever tooling pins are referenced in [forgea-monorepo/package.json](forgea-monorepo/package.json), [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json), and [forgea-monorepo/README.md](forgea-monorepo/README.md).

## Canonical Root Scripts

Root scripts are defined in [forgea-monorepo/package.json](forgea-monorepo/package.json) and delegate to Turbo tasks:

- `pnpm dev` → `turbo run dev`
- `pnpm build` → `turbo run build`
- `pnpm lint` → `turbo run lint`
- `pnpm test` → `turbo run test`

## Turbo Task Mapping

The Turbo task graph is defined in [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json). Root script names must match Turbo task names exactly (`dev`, `build`, `lint`, `test`).

## Script Naming Conventions

- Root scripts should be simple verbs (e.g., `dev`, `build`, `lint`, `test`).
- New root scripts must delegate to Turbo tasks using `turbo run <task>`.
- If a new script is added, it must be documented in [forgea-monorepo/README.md](forgea-monorepo/README.md) and mirrored in the Turbo task configuration.

## Adding a New Root Script (Summary)

1. Add the script entry to [forgea-monorepo/package.json](forgea-monorepo/package.json).
2. Ensure a matching task exists in [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json).
3. Document the command in [forgea-monorepo/README.md](forgea-monorepo/README.md).
4. Confirm the tooling pins remain pnpm 10.28.1 and Turborepo ^2.1.3.
