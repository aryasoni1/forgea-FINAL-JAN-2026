FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F1_GitHub_App_Setup
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md

TASKS CHECKED

- Planner / Architect: produce permission matrix, required webhook events, install footprint.
- Implementer: create GitHub App, generate private key, configure webhook secret, programmatic install flow.
- Security Sentinel: review permissions and secret storage approach (vault/KMS), validate webhook signing.
- Integration Checker: install app, verify webhook deliveries and repo-level permissions.
- Documenter / Historian: write operational and runbook docs for app lifecycle and permissions.

WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md — Orchestrator output for this feature (feature analysis, required agents, execution plan, agent prompts).
- apps/forgea-labs/app/api/webhooks/github/route.ts — GitHub webhook handler (HMAC verification using `x-hub-signature-256`, raw body parsing, processing `push` events, mapping to LabSession, audit logging). The compiled route appears under `.next` artifacts.
- forgea-monorepo/.env and forgea-monorepo/.env.example — Contain `GITHUB_WEBHOOK_SECRET` and `GITHUB_APP_ID` entries; `.env` contains values (`GITHUB_WEBHOOK_SECRET="1234566abdjhbjasd"`, `GITHUB_APP_ID="2730214"`).
- Related docs and gatekeeper references: multiple docs reference GitHub webhook handling and the webhook route (see docs/docs-gatekeeper and docs/code-scout findings referencing `apps/forgea-labs/app/api/webhooks/github/route.ts`).

WHAT IS PARTIALLY IMPLEMENTED

- Webhook receiver: `apps/forgea-labs/app/api/webhooks/github/route.ts` implements HMAC verification and payload handling for `push` events and maps them to internal `LabSession` records (partial realization of integration).
- Environment wiring: `.env` and `.env.example` include `GITHUB_WEBHOOK_SECRET` and `GITHUB_APP_ID`, indicating configuration points for webhook secret and app identifier.

WHAT IS MISSING

- GitHub App creation artifacts in repository: no evidence of the GitHub App private key (PEM) stored in repo, no programmatic private-key-generation script, and no repo-local automation for programmatic install flows (Not found).
- Secrets management integration: no documented Vault/KMS configuration or secrets-storage code for GitHub App private keys or installation tokens (Not found).
- Permission matrix / policy artifact: no dedicated repository file that enumerates the GitHub App permission matrix, minimal scopes, or rationale (Not found in code/docs).
- Operational runbook: no canonical runbook in repo detailing App creation steps, where secrets are stored, install/uninstall, key-rotation, or rollback steps (Not found).

RISKS OR CONFLICTS (observed from code/docs)

- Secrets in `.env`: `forgea-monorepo/.env` contains `GITHUB_WEBHOOK_SECRET` and `GITHUB_APP_ID` values in plaintext; repository shows HMAC verification implemented but no evidence of rotated/managed secrets storage.
- Public vs protected route policy: repo contains references calling webhooks public + HMAC-verified, but documentation lacks a single authoritative mapping of public vs authenticated API routes (possible policy gap noted in multiple code-scout docs).
- Missing permission matrix + proofs: without a documented permission matrix and installed-app verification steps, there's risk of granting excessive permissions or missing required scopes during install.

QUESTIONS FOR CLARIFICATION

- Confirm which agent should run next for this feature (Planner / Architect is expected per orchestrator output; confirm if another agent should go next).

NEXT AGENT HANDOFF PROMPT (for Planner / Architect)

Use this repository report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md) as the source of truth.

You are the Planner / Architect for Feature `F1_GitHub_App_Setup` (role defined by the Agent Orchestrator). Produce the following deliverables and constraints only (do not implement):
- A permission matrix for the Forgea GitHub App listing each required permission (e.g., repository contents, webhooks, pull requests, etc.), the minimal scope required, and a concise rationale for each permission.
- A concrete list of required webhook events (names exactly as GitHub uses) and the expected install footprint (organization vs repository installation).
- A short install/uninstall workflow describing manual and programmatic install options and how the app will be scoped at install time.
- A checklist of secrets that must be created/stored (private key, webhook secret, installation tokens), and the required properties for secret storage (rotation cadence, access controls, audit requirements). Reference existing repo evidence: `apps/forgea-labs/app/api/webhooks/github/route.ts` and `.env` entries.

Deliver outputs as machine-readable fragments when possible: permission matrix in tabular form, a bullet list of webhook events, and a one-page decision record listing outstanding unknowns that require implementer or security review.

Reference this code-scout report when answering: docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md

Handoff complete. Provide this report verbatim to the next agent.
