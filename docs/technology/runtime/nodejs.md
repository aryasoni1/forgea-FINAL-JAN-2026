# Node.js

- Category: Runtime
- Epics: A, E, J
- Version / Requirement: 24.x (LTS)
- Intent / Critical Decision: Update: Node 20 hits EOL soon; 24.x is the new stable LTS.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Pin Node runtime for reproducible developer and CI environments (A9 recommends Node 20.11.1 or a specific LTS semver).
- Important points: Add `.nvmrc`/`engines` guidance, document preferred version manager (nvm/Volta), and ensure CI images match the pinned Node.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Ensure verification runners and template scaffolds use pinned Node versions for reproducible installs and Playwright-based verification runs.
- Important points:
  - Templates should include a `.nvmrc` / `engines` entry matching the org-supported Node LTS used by CI (documented in the lab template spec) to avoid runtime mismatches during verification.
  - Document Node version requirements for Playwright (if Playwright runs under Node) and provide pinned CI images for verification runners to guarantee deterministic behavior.
  - Provide a short compatibility note for template authors about supported Node APIs and whether native modules or platform-specific binaries are allowed in template artifacts.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Runtime guidance for webhook handlers and snapshot builder runners; ensure timing-safe primitives and raw-body access are documented for implementers.
- Important points:
  - Document `crypto.timingSafeEqual` and safe buffer handling for signature comparisons; include minimal examples for webhook handlers that compute and compare HMAC digests.
  - Clarify methods to retrieve raw request body in common runtimes (Node.js App/Edge/Serverless) and sample patterns for Next.js/Express/Fastify handlers.
  - Note recommended Node LTS versions for build reproducibility and for using modern `crypto` APIs in `G9_Snapshot_Build_Trigger` pipelines.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Project & Tooling Setup (J1)
- EPIC-J intent: Pin Node and package manager (pnpm) versions to ensure reproducible builds for `apps/lessons` and consistent local/CI behavior.
- Important points:
  - Publish pinned Node and `pnpm` versions in the project root (`.nvmrc`, `engines`, and CI images) and document preferred version managers.
  - Ensure build-time tooling (MDX transforms, bundlers, preprocessors) run against the same Node runtime in CI and local dev to avoid transpile/runtime mismatches.
  - Document any native module or platform-specific binary constraints for lesson scaffolds and verification runners.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2 Canonical Lesson Template, D6 Lesson Generation Engine)
- EPIC-D intent: Ensure a pinned Node runtime and CI images for generation pipelines, schema validation, and validator tooling (AJV or equivalent).
- Important points:
  - Pin Node major/minor used by generation pipelines and schema validators; document `.nvmrc`/`engines` and CI image mapping used by generation + validation jobs.
  - Describe runtime constraints for the lesson generation engine (server vs edge runtimes), and note any native dependency restrictions for prompt tooling or validator binaries.
  - Provide example CLI commands to run AJV/validator checks under the pinned Node image and include guidance for handling native build artifacts in CI.
