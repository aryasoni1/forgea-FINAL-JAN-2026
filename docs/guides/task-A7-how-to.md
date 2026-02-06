# Task A7 — How-To Guide (Beginner)

## Purpose

This guide explains how to carry out the approved steps in [docs/tasks/task-A7-2026-02-06.md](docs/tasks/task-A7-2026-02-06.md). It follows the same order as the task document and explains what to change, why it matters, how to do it manually, and how to confirm it looks correct.

---

## Step 1 — Update root scripts and pins in package.json

**What was done**
Add the root `test` script and ensure the `packageManager` and Turbo pin match the approved versions.

**Why it was necessary**
The task requires a canonical monorepo `pnpm test` entry that delegates to Turbo and locks tooling versions to pnpm 10.28.1 and Turborepo ^2.1.3.

**What problem it solves**
Gives contributors one consistent entry point for tests and removes ambiguity about tooling versions.

**How to do it manually**

1. Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
2. Set `packageManager` to `pnpm@10.28.1`.
3. Ensure `devDependencies.turbo` is `^2.1.3`.
4. Add a `test` script that runs `turbo run test` while keeping `build`, `dev`, and `lint` intact.

**How to know it is correct**

- The `scripts` block includes `build`, `dev`, `lint`, and `test`.
- The version pins read `pnpm@10.28.1` and `turbo` `^2.1.3`.

---

## Step 2 — Add Scripts & Commands to the README

**What was done**
Add a "Scripts & Commands" section that explains root commands and their Turbo delegation with pinned versions.

**Why it was necessary**
The task requires a contributor-facing README section that documents the canonical commands and tooling versions.

**What problem it solves**
New contributors can follow one consistent set of commands and understand that Turbo orchestrates them.

**How to do it manually**

1. Open [forgea-monorepo/README.md](forgea-monorepo/README.md).
2. Add a “Scripts & Commands” section listing `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint`, and `pnpm test`.
3. State that each command delegates to `turbo run <task>`.
4. Mention pnpm 10.28.1 and Turborepo ^2.1.3 as the pinned versions.

**How to know it is correct**

- The README includes the command list and states Turbo delegation.
- The versions in the README match the pins in [forgea-monorepo/package.json](forgea-monorepo/package.json).

---

## Step 3 — Document Turbo task mapping and script conventions

**What was done**
Add or update the official scripts documentation to describe how Turbo maps the root commands and how new scripts should be named.

**Why it was necessary**
The task requires a durable, official doc that mirrors the root scripts and version pins, ensuring future consistency.

**What problem it solves**
Prevents drift between scripts, Turbo tasks, and contributor guidance.

**How to do it manually**

1. Create or update [docs/official-docs/EPIC-A/A7_scripts_official.md](docs/official-docs/EPIC-A/A7_scripts_official.md).
2. List the canonical root commands and their `turbo run <task>` mapping.
3. Describe the naming convention: root scripts should match Turbo task names.
4. Include the pinned versions pnpm 10.28.1 and Turborepo ^2.1.3.

**How to know it is correct**

- The doc lists the same scripts as the README.
- The versions match [forgea-monorepo/package.json](forgea-monorepo/package.json).
- The doc references [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json) for task mapping.

---

## Step 4 — Ensure README is the canonical guide

**What was done**
Ensure the README is the primary contributor guide, with `.github/copilot-instructions.md` treated as supplemental.

**Why it was necessary**
The task requires a human-facing guide; AI instructions are not a replacement for a contributor README.

**What problem it solves**
Avoids confusion for contributors who do not see AI-specific guidance.

**How to do it manually**

1. Keep the “Scripts & Commands” section in [forgea-monorepo/README.md](forgea-monorepo/README.md) complete and up to date.
2. Do not rely on `.github/copilot-instructions.md` for the canonical script list.

**How to know it is correct**

- The README stands alone as a complete guide for scripts.

---

## Step 5 — Create the test plan

**What was done**
Write a verification checklist so QA can confirm scripts and version pins are consistent.

**Why it was necessary**
The task explicitly requires a test plan at [docs/tests/task-A7-tests.md](docs/tests/task-A7-tests.md).

**What problem it solves**
Ensures the team can verify the script delegation and version pins without guessing.

**How to do it manually**

1. Create [docs/tests/task-A7-tests.md](docs/tests/task-A7-tests.md).
2. List the commands to verify (`pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm test`).
3. Include the required version pins (pnpm 10.28.1, Turborepo ^2.1.3).

**How to know it is correct**

- The test plan references the same scripts and versions as the README and official doc.

---

## Completion Check

- The files edited match the list in the task document.
- All references to Turbo and pnpm versions are consistent across the manifest and docs.
