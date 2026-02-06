# Task A10 — How-To Guide (Documentation & Architecture)

Date: 2026-02-06

This guide follows the approved task document at /docs/tasks/task-A10-2026-02-06.md and mirrors its step order.

## Step 1 — Review the Turborepo doc to locate gaps

**What was done:**
Reviewed /docs/official-docs/EPIC-A/turborepo.md to find where version, schema, and caching guidance should live.

**Why it was necessary:**
The task requires explicit coverage of the pinned `turbo` semver, schema URL, and caching/CI guidance to satisfy the gatekeeper findings.

**What problem it solves:**
Identifies the correct sections to extend without introducing conflicting or duplicate guidance.

**How a beginner can do it manually:**
Open /docs/official-docs/EPIC-A/turborepo.md and scan the “Version & Compatibility” section and any caching-related sections.

**How to know it is correct:**
You can see whether the version and schema are explicit, and whether caching and CI expectations are stated in a dedicated area.

## Step 2 — Extend the doc with version, schema, and caching guidance

**What was done:**
Updated the “Version & Compatibility” section to pin `turbo` to 2.1.3 and added the schema URL. Added a “Caching & CI Expectations” section describing local-only caching, optional remote cache, and strict mode reminders.

**Why it was necessary:**
The approved task requires the Turborepo doc to explicitly name the pinned version, schema URL, and caching behavior.

**What problem it solves:**
Removes ambiguity for implementers and aligns the doc with /docs/toolchain-versions.md and the gatekeeper requirements.

**How a beginner can do it manually:**
Edit /docs/official-docs/EPIC-A/turborepo.md:

- In “Version & Compatibility,” write that the pinned version is 2.1.x and include `https://turborepo.org/schema.json`.
- Add a “Caching & CI Expectations” section that states local-only cache is current, remote cache is optional and requires approval, and strict mode requires `outputs` and `env`/`globalEnv` to be declared.

**How to know it is correct:**
The doc explicitly mentions 2.1.3, includes the schema URL, and clearly states the local-only cache stance plus optional remote cache guidance.

## Step 3 — Document CI expectations

**What was done:**
Documented that CI uses Node.js 20.x and that no Turbo-specific Docker image is needed.

**Why it was necessary:**
The task requires CI image/tag expectations to be explicit and compatible with Turbo 2.1.x.

**What problem it solves:**
Prevents mismatched CI runtimes and avoids assumptions about Turbo-specific container images.

**How a beginner can do it manually:**
In /docs/official-docs/EPIC-A/turborepo.md, add a line stating that CI uses Node.js 20.x and no Turbo-specific image is required.

**How to know it is correct:**
The “Caching & CI Expectations” section includes the Node.js 20.x requirement and states that no Turbo-specific image is needed.

## Step 4 — Add the master docs registry entry

**What was done:**
Added a 2026-02-06 entry to /docs/master_docs.md for EPIC-A / A10 documenting the Turborepo doc extension.

**Why it was necessary:**
The task requires the master registry to reflect that the gating requirements were satisfied.

**What problem it solves:**
Provides traceability so downstream agents can see the doc extension was completed.

**How a beginner can do it manually:**
Open /docs/master_docs.md and add a dated entry that references /docs/official-docs/EPIC-A/turborepo.md and the A10 feature, including the reason for the extension.

**How to know it is correct:**
There is a 2026-02-06 entry that explicitly mentions the Turborepo doc extension and its reasons.

## Step 5 — Confirm consistency with tooling constraints

**What was done:**
Ensured the new text does not conflict with strict mode requirements or the toolchain policy (2.1.x pin).

**Why it was necessary:**
The task forbids contradictions with existing tooling constraints.

**What problem it solves:**
Prevents conflicting guidance that could block later implementation.

**How a beginner can do it manually:**
Re-read the updated /docs/official-docs/EPIC-A/turborepo.md and confirm it aligns with /docs/toolchain-versions.md and the strict mode rules already described in the doc.

**How to know it is correct:**
The version pin is 2.1.3, the schema URL is present, and strict mode guidance is consistent with existing rules.
