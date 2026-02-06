# How-To Guide — Task A5 (ESLint Minimal & Safe)

This guide follows the approved task document at /docs/tasks/task-A5-2026-02-06.md.

## Step 1 — Extend eslint-boundaries documentation

**What was done**

- Updated /docs/official-docs/EPIC-A/eslint-boundaries.md to pin ESLint 9.39.x and eslint-plugin-boundaries 4.2.x.
- Documented the canonical Flat Config location at /forgea-monorepo/packages/config/eslint.config.js.

**Why it was necessary**

- The task requires version pinning and a single, canonical config location.

**What problem it solves**

- Prevents version drift and ensures all linting uses a shared, deterministic config.

**How a beginner can do it manually**

1. Open /docs/official-docs/EPIC-A/eslint-boundaries.md.
2. Add a version pin section for ESLint 9.39.x and eslint-plugin-boundaries 4.2.x.
3. Add a policy note that the shared Flat Config lives at /forgea-monorepo/packages/config/eslint.config.js.

**How to know it is correct**

- The doc explicitly lists the pinned versions and the canonical config location.

## Step 2 — Extend eslint CI guidelines

**What was done**

- Updated /docs/official-docs/EPIC-A/eslint-ci-guidelines.md to require `pnpm install --frozen-lockfile` before linting.
- Documented the lint invocation path (`pnpm run lint`) and remediation for `eslint: command not found`.

**Why it was necessary**

- The task mandates CI guidance that prevents missing ESLint errors.

**What problem it solves**

- Avoids CI failures caused by skipped devDependencies or missing installs.

**How a beginner can do it manually**

1. Open /docs/official-docs/EPIC-A/eslint-ci-guidelines.md.
2. Add a rule stating that CI runs `pnpm install --frozen-lockfile` before lint.
3. Add a note that lint is invoked with `pnpm run lint` from the repo root.
4. Add remediation steps for `eslint: command not found`.

**How to know it is correct**

- The document includes the install command, lint command, and remediation steps.

## Step 3 — Define the shared ESLint config

**What was done**

- Created /forgea-monorepo/packages/config/eslint.config.js as the canonical Flat Config file.
- Centralized the boundary rules and glob scoping in that file.

**Why it was necessary**

- The task requires a single shared config that all workspaces reference.

**What problem it solves**

- Eliminates config duplication and ensures consistent boundary enforcement.

**How a beginner can do it manually**

1. Create /forgea-monorepo/packages/config/eslint.config.js.
2. Copy the Flat Config array into that file (ignores + boundary settings).
3. Ensure the `boundaries/elements` list matches the workspace structure.

**How to know it is correct**

- The file exists, exports an array, and includes `eslint-plugin-boundaries` settings.

## Step 4 — Align lint scripts to the shared config

**What was done**

- Added `lint` scripts in app/package `package.json` files to call ESLint with `--config` pointing to the shared config.

**Why it was necessary**

- The task requires apps and packages to reference the shared config in a consistent manner.

**What problem it solves**

- Prevents local configs and enforces the canonical settings everywhere.

**How a beginner can do it manually**

1. Open /forgea-monorepo/apps/forgea-labs/package.json.
2. Add a `lint` script: `eslint --config ../../packages/config/eslint.config.js .`
3. Open /forgea-monorepo/packages/audit/package.json and add: `eslint --config ../config/eslint.config.js .`
4. Open /forgea-monorepo/packages/schema/package.json and add: `eslint --config ../config/eslint.config.js .`
5. Open /forgea-monorepo/packages/config/package.json and add: `eslint --config ./eslint.config.js .`

**How to know it is correct**

- Each listed package has a `lint` script that points to the shared config path.

## Step 5 — Update master docs registry

**What was done**

- Appended A5 entries in /docs/master_docs.md for the ESLint boundary and CI guidance documents.

**Why it was necessary**

- Docs Gatekeeper requires master registry updates for A5.

**What problem it solves**

- Keeps the documentation index aligned with required internal docs.

**How a beginner can do it manually**

1. Open /docs/master_docs.md.
2. Add two entries dated 2026-02-06 for:
   - /docs/official-docs/EPIC-A/eslint-boundaries.md
   - /docs/official-docs/EPIC-A/eslint-ci-guidelines.md
3. Include a short reason for each entry.

**How to know it is correct**

- The two new A5 entries appear at the end of the registry with the correct paths.

## Step 6 — Define verification checks

**What was done**

- Added manual verification steps in /docs/manual-checks/task-A5-manual-checks.md.

**Why it was necessary**

- The task requires verification checks for version pinning, config presence, and lint script consistency.

**What problem it solves**

- Provides clear, repeatable checks for reviewers and CI operators.

**How a beginner can do it manually**

1. Open /docs/manual-checks/task-A5-manual-checks.md.
2. Follow each checklist item to verify files and commands.

**How to know it is correct**

- The manual checklist covers config presence, version pins, and lint script alignment.
