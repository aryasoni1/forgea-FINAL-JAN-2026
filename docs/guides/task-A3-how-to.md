# How To — Task A3 (Turborepo Setup)

This guide follows the approved task in [docs/tasks/task-A3-2026-02-06.md](docs/tasks/task-A3-2026-02-06.md).

## Step 1 — Pin the Turborepo version

**What was done:** The root `devDependencies.turbo` was pinned to 2.1.x.

**Why it was necessary:** The toolchain policy is the single source of truth, and `latest` is non-deterministic.

**What problem it solves:** Prevents version drift that changes pipeline semantics and cache behavior.

**How to do it manually:**

- Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
- Change `devDependencies.turbo` to `2.1.x`.

**How to know it is correct:** The value matches the toolchain pin and is not `latest`.

## Step 2 — Update the canonical Turborepo policy

**What was done:** The canonical Turborepo doc now states the pinned version and the remote cache policy.

**Why it was necessary:** Documentation must reflect the enforced version and caching stance.

**What problem it solves:** Avoids ambiguity about which Turbo version is required and whether remote caching is configured.

**How to do it manually:**

- Open [docs/official-docs/EPIC-A/A3_turborepo_official.md](docs/official-docs/EPIC-A/A3_turborepo_official.md).
- Update the version line to v2.1.x.
- Add the Remote Cache Policy statement under Canonical Rules.

**How to know it is correct:** The doc explicitly lists v2.1.x and states local caching only.

## Step 3 — Document lint task policy

**What was done:** The pipeline guidelines now state the lint task policy (no outputs, no dependsOn, cache disabled).

**Why it was necessary:** Lint produces no durable artifacts and should not be cached.

**What problem it solves:** Prevents stale lint results and makes task graph expectations explicit.

**How to do it manually:**

- Open [docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md](docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md).
- Add the Lint Task Policy section under Canonical Rules.

**How to know it is correct:** The section lists all required lint constraints.

## Step 4 — Align turbo.json with lint policy

**What was done:** The `lint` task now has `cache: false` and no outputs/dependsOn.

**Why it was necessary:** The configuration must match the documented policy.

**What problem it solves:** Ensures lint is execution-only and not cached.

**How to do it manually:**

- Open [forgea-monorepo/turbo.json](forgea-monorepo/turbo.json).
- Set `lint.cache` to false and keep `lint` without `outputs` or `dependsOn`.

**How to know it is correct:** The lint task is minimal and explicitly non-cached.

## Step 5 — Define verification checks

**What was done:** A manual checklist was created for the A3 changes.

**Why it was necessary:** Reviewers need clear, repeatable checks without automation.

**What problem it solves:** Makes validation straightforward for anyone reviewing the changes.

**How to do it manually:**

- Follow [docs/manual-checks/task-A3-manual-checks.md](docs/manual-checks/task-A3-manual-checks.md).

**How to know it is correct:** Each check can be completed and matches the updated files.
