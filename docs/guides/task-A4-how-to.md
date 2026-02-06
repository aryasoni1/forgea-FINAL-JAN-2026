# How To — Task A4 (TypeScript Base Configuration)

This guide follows the approved task in [docs/tasks/task-A4-2026-02-06.md](docs/tasks/task-A4-2026-02-06.md).

## Step 1 — Pin TypeScript docs to 5.9.3

**What was done:** The internal TypeScript docs were updated to mark version 5.9.3 as pinned.

**Why it was necessary:** The toolchain policy is the single source of truth for TypeScript versions.

**What problem it solves:** Prevents ambiguous guidance based on unpinned or mixed-version behavior.

**How to do it manually:**

- Open [docs/official-docs/EPIC-A/A4_typescript_official.md](docs/official-docs/EPIC-A/A4_typescript_official.md) and set version_pinned to true and version status to 5.9.3.
- Open [docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md](docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md) and do the same.

**How to know it is correct:** Both docs explicitly reference TypeScript 5.9.3 and are no longer marked BLOCKED.

## Step 2 — Document the canonical base location

**What was done:** The docs now state the base config lives at packages/config/tsconfig.base.json and must not be moved.

**Why it was necessary:** The base location is a governance decision that prevents churn.

**What problem it solves:** Eliminates ambiguity about where the base config lives.

**How to do it manually:**

- Add the Canonical Base Location rule in [docs/official-docs/EPIC-A/A4_typescript_official.md](docs/official-docs/EPIC-A/A4_typescript_official.md).
- Mirror the same rule in [docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md](docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md).

**How to know it is correct:** Both docs explicitly reference forgea-monorepo/packages/config/tsconfig.base.json.

## Step 3 — Document allowed overrides policy

**What was done:** The allowed and forbidden override lists were added to the docs.

**Why it was necessary:** It preserves consistent compiler semantics across the monorepo.

**What problem it solves:** Prevents per-project drift in core compiler settings.

**How to do it manually:**

- Add the Allowed Overrides policy to [docs/official-docs/EPIC-A/A4_typescript_official.md](docs/official-docs/EPIC-A/A4_typescript_official.md).
- Add the same policy to [docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md](docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md).

**How to know it is correct:** The documents list both the forbidden and allowed override sets.

## Step 4 — Enforce moduleResolution casing

**What was done:** The docs now require moduleResolution to be set to "Bundler" and configs comply.

**Why it was necessary:** Consistent casing avoids tooling inconsistencies.

**What problem it solves:** Prevents subtle mismatches across editors or tooling.

**How to do it manually:**

- Ensure [forgea-monorepo/packages/config/tsconfig.base.json](forgea-monorepo/packages/config/tsconfig.base.json) uses "Bundler".
- Remove any other casing from app or package tsconfig files.
- Document the requirement in the official TypeScript docs.

**How to know it is correct:** Only "Bundler" appears in the tsconfig files and docs.

## Step 5 — Align app configs with override policy

**What was done:** Disallowed overrides were removed from app tsconfig files.

**Why it was necessary:** The policy forbids overriding core compiler semantics.

**What problem it solves:** Ensures consistent TypeScript behavior across the monorepo.

**How to do it manually:**

- Open each app tsconfig (for example [forgea-monorepo/apps/forgea-labs/tsconfig.json](forgea-monorepo/apps/forgea-labs/tsconfig.json)).
- Remove any forbidden compiler options and keep only allowed overrides.

**How to know it is correct:** App configs only include allowed overrides and extend the base config.

## Step 6 — Define verification checks

**What was done:** A manual checklist was created for the A4 changes.

**Why it was necessary:** Reviewers need clear, repeatable checks without automation.

**What problem it solves:** Makes validation straightforward for anyone reviewing the changes.

**How to do it manually:**

- Follow [docs/manual-checks/task-A4-manual-checks.md](docs/manual-checks/task-A4-manual-checks.md).

**How to know it is correct:** Each check can be completed and matches the updated files.
