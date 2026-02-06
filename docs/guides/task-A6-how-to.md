# How-To Guide — Task A6 (Prettier Formatting Only)

This guide follows the approved task document: /docs/tasks/task-A6-2026-02-06.md.

## Step 1 — Add Prettier dependency and scripts

**What was done:** Added `prettier@3.2.0` to the root devDependencies and added `prettier:check`/`prettier:write` scripts that run `pnpm -w exec prettier`.

**Why it was necessary:** The task requires a pinned Prettier version and deterministic invocation from the root-installed binary.

**What problem it solves:** It prevents formatting drift across machines and CI by guaranteeing the same Prettier binary runs everywhere.

**How to do it manually:**

1. Open the root package file at [forgea-monorepo/package.json](forgea-monorepo/package.json).
2. Under `devDependencies`, add `"prettier": "3.2.0"`.
3. Under `scripts`, add:
   - `prettier:check`: `pnpm -w exec prettier --check "**/*.{js,ts,tsx,jsx,json,md,css,scss,html}"`
   - `prettier:write`: `pnpm -w exec prettier --write "**/*.{js,ts,tsx,jsx,json,md,css,scss,html}"`

**How to know it is correct:** The file shows the new dependency and both scripts exactly as specified in the task document.

## Step 2 — Add canonical config and ignore files

**What was done:** Created the root `.prettierrc` and `.prettierignore` with the canonical values listed in the task.

**Why it was necessary:** Prettier must be configured once at the repo root to keep formatting consistent and prevent formatting of generated outputs.

**What problem it solves:** It ensures consistent formatting rules and avoids reformatting build artifacts and caches.

**How to do it manually:**

1. Create [forgea-monorepo/.prettierrc](forgea-monorepo/.prettierrc) with the JSON settings from the task document.
2. Create [forgea-monorepo/.prettierignore](forgea-monorepo/.prettierignore) with the canonical ignore list from the task document.

**How to know it is correct:** The files exist at the repo root and match the task’s canonical content.

## Step 3 — Add Prettier policy documentation

**What was done:** Added /docs/official-docs/prettier.md describing the pinned version, canonical config files, editor integration, and ESLint alignment.

**Why it was necessary:** The Docs Gatekeeper requires internal docs that record the chosen version and how formatting is controlled.

**What problem it solves:** It gives contributors a single source of truth for formatting rules and setup expectations.

**How to do it manually:**

1. Create [docs/official-docs/prettier.md](docs/official-docs/prettier.md).
2. Add the content specified in the task document under “Documentation Snippets to Add”.

**How to know it is correct:** The doc mentions Prettier 3.2.x, points to the root `.prettierrc`/`.prettierignore`, and includes editor guidance.

## Step 4 — Add Prettier CI guidelines

**What was done:** Added /docs/official-docs/prettier-ci-guidelines.md documenting the CI command and remediation steps.

**Why it was necessary:** CI must run the pinned Prettier binary deterministically and instruct contributors how to fix formatting drift.

**What problem it solves:** It standardizes the CI formatting check and provides a clear path for fixing failures locally.

**How to do it manually:**

1. Create [docs/official-docs/prettier-ci-guidelines.md](docs/official-docs/prettier-ci-guidelines.md).
2. Add the CI command and remediation steps specified in the task document.

**How to know it is correct:** The doc includes `pnpm install --frozen-lockfile`, `pnpm -w exec prettier --check`, and remediation steps with `prettier --write`.

## Step 5 — Update the master docs registry

**What was done:** Added A6 entries to /docs/master_docs.md for the gatekeeper brief and the two Prettier docs.

**Why it was necessary:** The registry must reflect new documentation deliverables for auditability.

**What problem it solves:** It records that the required Prettier docs are now present and tracked.

**How to do it manually:**

1. Open [docs/master_docs.md](docs/master_docs.md).
2. Append the three A6 entries for:
   - the gatekeeper brief,
   - /docs/official-docs/prettier.md,
   - /docs/official-docs/prettier-ci-guidelines.md.

**How to know it is correct:** The A6 entries are present with the correct date and paths.

## Step 6 — Verify completeness

**What was done:** Defined manual verification checks to confirm the dependency, config files, docs, and registry updates.

**Why it was necessary:** The task explicitly requires verification checks.

**What problem it solves:** It ensures a reviewer can confirm the work without running automation.

**How to do it manually:**

1. Follow the checklist in [docs/manual-checks/task-A6-manual-checks.md](docs/manual-checks/task-A6-manual-checks.md).

**How to know it is correct:** Every checklist item can be verified by opening the referenced files and confirming the content.
