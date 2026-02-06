# How To — Task A2 (Package Manager & Workspace)

This guide follows the approved task in [docs/tasks/task-A2-2026-02-06.md](docs/tasks/task-A2-2026-02-06.md).

## Step 1 — Declare the authoritative workspace definition file

**What was done:** The workspace policy was updated to state that pnpm-workspace.yaml is the source of truth and package.json.workspaces must match it.

**Why it was necessary:** pnpm uses pnpm-workspace.yaml to define workspace membership, so a single source of truth prevents mismatched installs.

**What problem it solves:** Eliminates ambiguity about which file controls workspace membership.

**How to do it manually:**

- Open [docs/official-docs/EPIC-A/pnpm-workspace-policy.md](docs/official-docs/EPIC-A/pnpm-workspace-policy.md).
- Add a rule that pnpm-workspace.yaml is authoritative and package.json.workspaces must match it.

**How to know it is correct:** The policy explicitly states the authoritative file and the required alignment rule.

## Step 2 — Align workspace membership globs

**What was done:** Workspace membership includes apps/_, packages/_, and services/\* in pnpm-workspace.yaml, matching the package.json workspaces list.

**Why it was necessary:** pnpm only discovers workspace packages listed in pnpm-workspace.yaml, so missing globs can exclude services.

**What problem it solves:** Prevents services packages from being ignored during pnpm installs and workspace operations.

**How to do it manually:**

- Open [forgea-monorepo/pnpm-workspace.yaml](forgea-monorepo/pnpm-workspace.yaml).
- Ensure the packages list includes apps/_, packages/_, and services/\*.
- Open [forgea-monorepo/package.json](forgea-monorepo/package.json) and confirm workspaces matches the same list.

**How to know it is correct:** Both files list the same workspace globs, and pnpm-workspace.yaml includes services/\*.

## Step 3 — Align pnpm version pin with toolchain authority

**What was done:** The packageManager pin in the repository was set to pnpm@10.4.0 to match the toolchain authority.

**Why it was necessary:** docs/toolchain-versions.md is the single source of truth for tool versions.

**What problem it solves:** Prevents version drift between repo configuration and official toolchain policy.

**How to do it manually:**

- Open [docs/toolchain-versions.md](docs/toolchain-versions.md) and note the pnpm pin.
- Open [forgea-monorepo/package.json](forgea-monorepo/package.json).
- Set packageManager to the toolchain pin.

**How to know it is correct:** packageManager matches the pin described in docs/toolchain-versions.md.

## Step 4 — Document Corepack guidance (no CI changes)

**What was done:** CI guidance now states developers must use Corepack locally and CI should use Corepack, while noting that CI wiring is deferred to later tasks.

**Why it was necessary:** Ensures the pinned pnpm version is used consistently without changing CI in this task.

**What problem it solves:** Avoids inconsistent pnpm versions across machines while respecting the task’s out-of-scope CI changes rule.

**How to do it manually:**

- Open [docs/official-docs/EPIC-A/pnpm-ci-guidelines.md](docs/official-docs/EPIC-A/pnpm-ci-guidelines.md).
- Add a Corepack policy section stating the local requirement and CI recommendation.

**How to know it is correct:** The document explicitly states the Corepack guidance and mentions that CI wiring is handled elsewhere.

## Step 5 — Update the master docs registry

**What was done:** The master docs registry already contains the required A2 entries.

**Why it was necessary:** The registry must list required internal docs and gatekeeper briefs for traceability.

**What problem it solves:** Ensures documentation dependencies are discoverable and auditable.

**How to do it manually:**

- Open [docs/master_docs.md](docs/master_docs.md).
- Add entries for the A2 gatekeeper brief and required pnpm policy docs if they are missing.

**How to know it is correct:** The A2 entries are present in the registry.

## Step 6 — Define verification checks

**What was done:** A manual checklist was created for confirming alignment and policy updates.

**Why it was necessary:** Manual verification provides clear, repeatable checks without automation.

**What problem it solves:** Helps reviewers confirm the exact changes required by the task.

**How to do it manually:**

- Follow [docs/manual-checks/task-A2-manual-checks.md](docs/manual-checks/task-A2-manual-checks.md).

**How to know it is correct:** Each check can be completed and matches the updated files.
