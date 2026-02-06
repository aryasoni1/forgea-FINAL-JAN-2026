# Task A8 — How-To Guide (Beginner)

This guide follows the approved task document at `/docs/tasks/task-A8-2026-02-06.md`.

## Step 1 — Confirm the env inventory and required vs optional

**What was done:** Identified all env variables referenced in source and confirmed only `DATABASE_URL` is required while the sink URLs are optional.

**Why it was necessary:** The task requires a complete manifest with required vs optional flags and a single canonical example file.

**What problem it solves:** Prevents confusion about which variables must exist for the system to start.

**How a beginner can do it manually:** Search for `process.env` usages across `apps/` and `packages/` and list the variable names. Mark `DATABASE_URL` as required and others as optional.

**How to know it’s correct:** The list matches the manifest in the Next.js env doc and the root `.env.example`.

## Step 2 — Draft the canonical root .env.example

**What was done:** Created `/forgea-monorepo/.env.example` with placeholders for all discovered variables and notes on required vs optional behavior.

**Why it was necessary:** The repo needed a single authoritative example file for onboarding.

**What problem it solves:** Provides a consistent, safe template without committing secrets.

**How a beginner can do it manually:** Create a new file named `.env.example` at the monorepo root and add each variable with safe placeholder values and comments.

**How to know it’s correct:** The file exists at the root and contains all variables in the manifest.

## Step 3 — Extend the Next.js env policy doc

**What was done:** Updated `/docs/official-docs/EPIC-A/nextjs-environment-variables.md` to pin Next.js to v15.1.0 and added the canonical Forgea env manifest.

**Why it was necessary:** The task requires alignment with Next.js 15.1.0 and a documented, authoritative manifest.

**What problem it solves:** Prevents client exposure mistakes and establishes a single place to review env requirements.

**How a beginner can do it manually:** Open the doc, update the version references to v15.1.0, and insert a table listing each env variable, required status, and scope.

**How to know it’s correct:** The doc shows v15.1.0 and the manifest table matches `.env.example`.

## Step 4 — Extend the dotenv policy doc

**What was done:** Updated `/docs/official-docs/EPIC-A/dotenv.md` to pin dotenv to v16.x (16.4.x primary) and reference the canonical env example.

**Why it was necessary:** The task requires dotenv semantics pinned to the toolchain version.

**What problem it solves:** Removes ambiguity about dotenv behavior across environments.

**How a beginner can do it manually:** Open the doc, set the version fields to 16.x/16.4.x, and add a short section referencing `.env.example` for onboarding.

**How to know it’s correct:** The doc shows v16.x and points to the root `.env.example`.

## Step 5 — Add a centralized env validation surface

**What was done:** Added `/forgea-monorepo/packages/config/src/env.ts` exporting `validateEnv()` that throws if `DATABASE_URL` is missing.

**Why it was necessary:** The task requires a centralized validation surface that other packages can call.

**What problem it solves:** Ensures fail-closed behavior is consistent and reusable.

**How a beginner can do it manually:** Create `env.ts` under `packages/config/src/`, define `validateEnv()` to check required variables, and throw a clear error if any are missing.

**How to know it’s correct:** Opening the file shows `validateEnv()` with a `DATABASE_URL` check that throws.

## Step 6 — Wire validation into an existing package and update gatekeeper

**What was done:** Updated `/forgea-monorepo/packages/schema/src/db.ts` to call `validateEnv()` before using `DATABASE_URL`, and recorded approval in the Docs Gatekeeper brief.

**Why it was necessary:** The task requires proof that the validation surface is used and that docs approval is recorded.

**What problem it solves:** Demonstrates the pattern and closes the documentation gap.

**How a beginner can do it manually:** Import `validateEnv()` into `db.ts` and call it before reading `process.env.DATABASE_URL`. Then update the A8 Docs Gatekeeper brief to mark approval granted.

**How to know it’s correct:** The schema DB file calls `validateEnv()`, and the gatekeeper brief shows approval granted.
