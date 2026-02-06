# Task A9 — How-To Guide (Beginner)

This guide follows the approved task document at `/docs/tasks/task-A9-2026-02-06.md`.

## Step 1 — Confirm Node range and document version policy

**What was done:** Set the Node pin to 20.11.1 in `.nvmrc` and documented the `>=20.11.0 <21` engine range in the Node version policy doc.

**Why it was necessary:** The task requires a canonical runtime pin and documented policy aligned to `/docs/toolchain-versions.md`.

**What problem it solves:** Prevents contributors from using incompatible Node versions.

**How a beginner can do it manually:** Create `.nvmrc` at the repo root with `20.11.1` and add a policy doc that cites the official Node.js release schedule and nvm docs.

**How to know it’s correct:** `.nvmrc` shows `20.11.1` and the policy doc lists the official source URLs and the allowed range.

## Step 2 — Add and document EditorConfig

**What was done:** Added `.editorconfig` with the minimal hygiene settings and documented it in `/docs/official-docs/editorconfig.md`.

**Why it was necessary:** The task requires consistent editor defaults and a canonical spec reference.

**What problem it solves:** Reduces whitespace churn and formatting inconsistencies across editors.

**How a beginner can do it manually:** Create `.editorconfig` in the repo root with the required settings and write a doc referencing https://editorconfig.org.

**How to know it’s correct:** `.editorconfig` includes the required keys and the doc references the official spec.

## Step 3 — Update README for onboarding

**What was done:** Updated the repo README to serve as the onboarding entry point with Node/pnpm/Turbo/env pointers and links to `.nvmrc`, `.editorconfig`, and CONTRIBUTING.

**Why it was necessary:** The task requires repository-level onboarding separate from app UI.

**What problem it solves:** Gives contributors a single starting point for setup requirements.

**How a beginner can do it manually:** Edit README to add a short onboarding section, include the key tool versions, and link to guardrail docs.

**How to know it’s correct:** README includes links to `.nvmrc`, `.editorconfig`, and CONTRIBUTING.

## Step 4 — Update CONTRIBUTING for guardrails

**What was done:** Expanded CONTRIBUTING with guardrails, files-to-avoid, and review expectations, referencing `.nvmrc`/`.editorconfig` and the official docs.

**Why it was necessary:** The task requires clear contributor guardrails and a reference to implementer restrictions.

**What problem it solves:** Prevents accidental policy violations and unreviewed changes.

**How a beginner can do it manually:** Add a guardrails section to CONTRIBUTING, link to `/.github/agents/implementer.md`, and list the official docs.

**How to know it’s correct:** CONTRIBUTING explicitly references the guardrail doc and the official policy docs.

## Step 5 — Author official docs

**What was done:** Created `/docs/official-docs/node-version-policy.md` and `/docs/official-docs/editorconfig.md` with official sources and the chosen policies.

**Why it was necessary:** The task requires official documentation for Node and EditorConfig policies.

**What problem it solves:** Establishes a single, authoritative reference for runtime and editor defaults.

**How a beginner can do it manually:** Create each doc, include the official URLs, and record the policy values.

**How to know it’s correct:** Both docs exist and mention the official sources.

## Step 6 — Update Docs Gatekeeper brief

**What was done:** Updated the A9 Docs Gatekeeper brief to reflect that the required docs now exist and are verified.

**Why it was necessary:** The task requires gatekeeper approval status to be recorded.

**What problem it solves:** Confirms documentation gaps are closed.

**How a beginner can do it manually:** Edit the A9 brief to mark documentation as complete and list the new docs.

**How to know it’s correct:** The brief shows completion/verification status and references the docs.

## Step 7 — Provide a test plan

**What was done:** Created `/docs/tests/task-A9-tests.md` describing how to verify the new files and docs.

**Why it was necessary:** The task explicitly requires a deterministic QA checklist.

**What problem it solves:** Ensures QA can validate the changes without guesswork.

**How a beginner can do it manually:** Write a short test plan listing scope, happy paths, failure cases, abuse cases, and invariants.

**How to know it’s correct:** The test plan covers those sections and references the new files.
