# Task A1 — Beginner Execution & Explanation Guide

This guide explains what was changed for Task A1, why it was necessary, and how a beginner can perform each step manually.

## Step 1: Align pnpm workspace membership

What was done:
- Added services/* to forgea-monorepo/pnpm-workspace.yaml to match package.json.

Why this was necessary:
- pnpm-workspace.yaml is the authoritative workspace definition. Missing services/* causes pnpm to ignore service packages, leading to inconsistent installs and tooling behavior.

What problem it solves:
- Ensures apps, packages, and services are all discovered consistently by pnpm.

How a beginner can do it manually:
1. Open forgea-monorepo/pnpm-workspace.yaml.
2. Add a new line under packages: for services/*.
3. Save the file.

How to tell it was done correctly:
- The file lists apps/*, packages/*, and services/* under packages:.

## Step 2: Preserve root TypeScript include decision

What was done:
- Verified the root tsconfig.json includes packages/**/* and services/**/* only, keeping apps/ excluded.

Why this was necessary:
- The decision for Task A1 requires apps to use their own tsconfig while the root config stays focused on packages/services.

What problem it solves:
- Prevents accidental global type-checking of apps and keeps app compilation isolated.

How a beginner can do it manually:
1. Open forgea-monorepo/tsconfig.json.
2. Ensure include is exactly packages/**/* and services/**/* (or equivalent).
3. Confirm no apps/ path is present.

How to tell it was done correctly:
- apps/ is not listed in the root include list.

## Step 3: Add repository README

What was done:
- Created forgea-monorepo/README.md with structure, workspace, TS, boundary, and ownership guidance.

Why this was necessary:
- A repository entry document prevents confusion about monorepo layout and core rules.

What problem it solves:
- Establishes a single, visible source for structure and policy.

How a beginner can do it manually:
1. Create forgea-monorepo/README.md.
2. Describe apps/, packages/, services/ and workspace membership.
3. Note the TypeScript and import boundary rules.
4. Save the file.

How to tell it was done correctly:
- README exists and includes those sections in plain language.

## Step 4: Add contributing guidance

What was done:
- Created forgea-monorepo/CONTRIBUTING.md describing structure rules, workspace rules, TS rules, and boundary rules.

Why this was necessary:
- Contributors need clear rules to avoid breaking workspace alignment or boundaries.

What problem it solves:
- Reduces accidental cross-app/service coupling and prevents workspace drift.

How a beginner can do it manually:
1. Create forgea-monorepo/CONTRIBUTING.md.
2. Document the same rules as the README, plus steps for adding new apps/services/packages.
3. Save the file.

How to tell it was done correctly:
- CONTRIBUTING exists and includes boundary and workspace rules.

## Step 5: Add ESLint boundary enforcement

What was done:
- Added ESLint Flat Config at forgea-monorepo/eslint.config.js with boundary rules enforcing:
  - apps → packages only
  - services → packages only
  - no cross-app imports
  - no app ↔ service imports
  - packages → packages only

Why this was necessary:
- Static boundary enforcement prevents architectural drift and accidental coupling.

What problem it solves:
- Blocks cross-boundary imports at lint time.

How a beginner can do it manually:
1. Create forgea-monorepo/eslint.config.js.
2. Define boundary elements for each app, each service, and packages.
3. Set the rules to allow only the approved import paths.
4. Save the file.

How to tell it was done correctly:
- The config lists each app/service as a separate element type and restricts imports to packages only.

## Step 6: Add repository-level dependencies for linting

What was done:
- Added eslint and eslint-plugin-boundaries to devDependencies in forgea-monorepo/package.json.

Why this was necessary:
- The boundary rules require the ESLint runtime and the boundaries plugin to be installed.

What problem it solves:
- Ensures linting runs consistently across machines and CI.

How a beginner can do it manually:
1. Open forgea-monorepo/package.json.
2. Add devDependencies for eslint and eslint-plugin-boundaries using the pinned versions.
3. Save the file.

How to tell it was done correctly:
- package.json includes eslint and eslint-plugin-boundaries under devDependencies.

## Step 7: Add CODEOWNERS file

What was done:
- Created forgea-monorepo/.github/CODEOWNERS with explicit owners for each top-level directory.

Why this is necessary:
- CODEOWNERS enforces review ownership and makes responsibilities explicit.

What problem it solves:
- Prevents unowned changes to critical parts of the repo.

How a beginner can do it manually:
1. Create forgea-monorepo/.github/CODEOWNERS.
2. Add patterns for .github/, apps/, packages/, services/, infra/, docs/.
3. Assign owners using @org/team or @username (currently @aryasoni for all top-level paths).
4. Save the file.

How to tell it was done correctly:
- The file exists at .github/CODEOWNERS and lists explicit owners for each top-level path.
