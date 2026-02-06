# Task A11 — How-To Guide (Verification & Quality Gates)

Date: 2026-02-06

This guide follows /docs/tasks/task-A11-2026-02-06.md and mirrors its step order.

## Step 1 — Update docs with pinned versions and cache posture

**What was done:**
Updated the relevant docs to explicitly cite Turbo 2.1.3, ESLint 9.39.x with eslint-plugin-boundaries 4.2.x, Prettier 3.2.x, and the local-only cache stance.

**Why it was necessary:**
The gatekeeper requires explicit version pins and cache guidance before verification gates can be implemented.

**What problem it solves:**
Eliminates ambiguity about which tool versions and cache behaviors apply to CI.

**How a beginner can do it manually:**
Open the Turborepo, ESLint boundaries, and Prettier docs and add explicit version lines plus the local-only cache stance.

**How to know it is correct:**
Each doc clearly lists the pinned version and describes the local-only cache posture.

## Step 2 — Define the CI workflow

**What was done:**
Created /forgea-monorepo/.github/workflows/verification-and-quality-gates.yml to run the required Turbo tasks on Node.js 20.x.

**Why it was necessary:**
The repository had no verification gates; this workflow provides the blocking checks for lint and build.

**What problem it solves:**
Ensures verification and lint run in CI and block merges on failure.

**How a beginner can do it manually:**
Create the workflow file and add steps to check out the repo, set up Node.js 20.x, install dependencies with `pnpm install --frozen-lockfile`, then run `pnpm turbo run verify-and-lint` and `pnpm turbo run build`.

**How to know it is correct:**
The workflow contains those steps and runs on pull requests and protected branch pushes.

## Step 3 — Extend Turborepo doc with CI requirements

**What was done:**
Added CI package manager guidance and the workflow path to /docs/official-docs/EPIC-A/turborepo.md.

**Why it was necessary:**
The task requires explicit CI expectations and alignment with the workflow.

**What problem it solves:**
Prevents mismatches between documented policy and the CI implementation.

**How a beginner can do it manually:**
Edit the Turborepo doc to mention the CI workflow path, pnpm usage, and the frozen-lockfile install requirement.

**How to know it is correct:**
The Caching & CI Expectations section includes the workflow path and pnpm install requirement.

## Step 4 — Extend ESLint boundaries doc with CI invocation

**What was done:**
Added a CI section describing the lint command, pinned versions, and failure behavior.

**Why it was necessary:**
The gatekeeper requires explicit ESLint versioning and CI failure semantics.

**What problem it solves:**
Clarifies how lint is enforced and prevents under-specified CI behavior.

**How a beginner can do it manually:**
Add a CI section to /docs/official-docs/EPIC-A/eslint-boundaries.md that calls out `pnpm turbo run verify-and-lint`, ESLint 9.39.x, eslint-plugin-boundaries 4.2.x, and blocking failures.

**How to know it is correct:**
The doc clearly spells out the command and pinned versions along with failure behavior.

## Step 5 — Extend Prettier doc with check-only behavior

**What was done:**
Pinned Prettier to 3.2.x and documented check-only CI behavior in /docs/official-docs/EPIC-A/prettier.md.

**Why it was necessary:**
The task requires explicit Prettier versioning and check-only CI guidance.

**What problem it solves:**
Prevents formatting drift and ensures CI fails on formatting violations.

**How a beginner can do it manually:**
Update the Prettier doc to state the 3.2.x pin and add a CI section that uses `pnpm prettier:check` and fails on formatting issues.

**How to know it is correct:**
The Prettier doc includes the pinned version and the check-only CI instructions.

## Step 6 — Record registry updates and test plan

**What was done:**
Added A11 entries to /docs/master_docs.md and created /docs/tests/task-A11-tests.md with the test plan for verification gates.

**Why it was necessary:**
The task requires traceability in the master registry and a formal test plan.

**What problem it solves:**
Gives downstream agents a clear record of the workflow and doc changes, plus a plan to validate the gates.

**How a beginner can do it manually:**
Add dated A11 entries in /docs/master_docs.md and write a test plan file describing how to run the same commands locally.

**How to know it is correct:**
The master registry lists the workflow and doc extensions, and the test plan describes the commands and expected behaviors.

## Step 7 — Validate doc/workflow consistency

**What was done:**
Ensured the workflow commands match the documented tool versions and CI behaviors.

**Why it was necessary:**
The task requires consistency between the workflow and documentation.

**What problem it solves:**
Avoids mismatched CI instructions that would block implementation.

**How a beginner can do it manually:**
Cross-check the workflow steps against the Turborepo, ESLint, and Prettier docs to confirm the same commands and versions are referenced.

**How to know it is correct:**
The workflow uses the same commands and the docs explicitly list the pinned versions and CI failure semantics.
