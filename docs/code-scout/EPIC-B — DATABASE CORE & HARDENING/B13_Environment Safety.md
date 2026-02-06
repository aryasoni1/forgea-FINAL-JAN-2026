## FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B13_Environment Safety
- Source: docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B13_Environment Safety.md

### TASKS CHECKED

- forgea-code-scout — Identify current env var usage and `DATABASE_URL` locations.
- docs-gatekeeper — Verify external secrets-management guidance (pending).
- planner-architect — Produce task doc enforcing env separation and validation (pending).

### WHAT ALREADY EXISTS

- `/forgea-monorepo/.env` — Repo-level env file present and contains `DATABASE_URL="postgresql://aryasoni@localhost:5432/forgea_db"` (local DB connection string committed in workspace).
- `/forgea-monorepo/apps/forgea-labs/.env.local` — App-level env file present and contains the same `DATABASE_URL` value.
- `/forgea-monorepo/packages/schema/prisma.config.mjs` — Prisma CLI/runtime config loads `../../.env` and sets `datasource.url: env("DATABASE_URL")`.
- `/forgea-monorepo/packages/schema/src/db.ts` — Runtime guard: reads `process.env.DATABASE_URL` and `throw new Error("DATABASE_URL is not set")` when missing (fail-closed behavior).
- `/forgea-monorepo/.github/copilot-instructions.md` and various docs reference `DATABASE_URL` as a required env; several internal docs mention `DATABASE_URL` examples and expected env keys.

### WHAT IS PARTIALLY IMPLEMENTED

- Runtime validation: `packages/schema/src/db.ts` enforces presence of `DATABASE_URL` at startup (fail-closed), which prevents accidental DB connections without a configured URL.
- Documentation: scattered references to `DATABASE_URL` exist in `.github` and `docs/RAW FILES BY USER`, but no single authoritative `env` manifest or `.env.example` was found in the inspected sources.

### WHAT IS MISSING

- Centralized secrets management: No evidence of an approved secrets store integration (Vault, AWS Secrets Manager, GCP Secret Manager) in source-level scans.
- `.env.example` or a manifest listing required env keys and their safe defaults is not present in the workspace (contributors lack a canonical sample for onboarding).
- CI/infra references: No explicit CI secret usage or encrypted secret references were located in inspected files — CI/infrastructure configurations may exist out-of-band or not yet configured to use secret stores.
- Secrets scanning and removal: The repo contains `DATABASE_URL` in committed `.env` files — a remediation/rotations plan and commit scrubber logs are not found.

### RISKS OR CONFLICTS

- Sensitive credentials committed: `DATABASE_URL` with a local connection string exists in `/.env` and `/apps/forgea-labs/.env.local` inside the repo workspace — this increases the risk of accidental exposure and can cause onboarding confusion.
- Fail-closed runtime guard: `packages/schema/src/db.ts` will throw if `DATABASE_URL` is missing; without onboarding docs or `.env.example`, contributors may encounter opaque errors and attempt to commit credentials into repo to proceed.
- Inconsistent env expectations: Multiple places reference different env keys (audit sinks, security sinks, DB creds) without a single manifest listing required vs optional variables.

### QUESTIONS FOR CLARIFICATION

- None strictly required for Code-Scout; planner and Docs-Gatekeeper will define exact remediation steps and required registry entries.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Docs Gatekeeper. Use this Code-Scout report at `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B13_Environment Safety.md` as input. Confirm and provide version-pinned, authoritative documentation links (or mark `missing`) for each item below. Do NOT propose remediation steps — only confirm official docs and their presence/absence.

For each line, respond in this exact format:
- `item:` <link> — `approved|missing`

Items to verify:
- `secrets-management` — official docs for a recommended secrets management solution (e.g., HashiCorp Vault, AWS Secrets Manager) and recommended integration patterns for Node.js/Next.js projects.
- `env-manifest` — guidance or template for distributing safe sample env files and `.env.example` practices (pinned to an authoritative source/version).
- `credential-rotation` — official guidance on credential rotation and revocation best practices for DB credentials.

Reference this Code-Scout report in your response. End with the exact final line:

Handoff complete. Provide this report verbatim to the next agent.
