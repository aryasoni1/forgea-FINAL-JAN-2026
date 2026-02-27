### FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F1_GitHub_App_Setup
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-labs/app/api/webhooks/github/route.ts
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/.env
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/.env.example

---

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below: technology, concept, official source, exact version requirement, why required, decision informed, what breaks.

- Technology: GitHub Apps (creating and managing GitHub Apps)
  - Concept: GitHub Apps overview & lifecycle
  - Official source: https://docs.github.com/en/developers/apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical app model, install scopes, and lifecycle operations.
  - Decision informed: Whether to implement as GitHub App vs OAuth App; install footprint (org vs repo).
  - Breaks without it: Incorrect authentication model, incorrect expectations for installation tokens.

- Technology: GitHub App permissions & events
  - Concept: Permissions matrix & event names
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/setting-permissions-for-your-github-app
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps minimal scopes to each required capability.
  - Decision informed: Minimal-permission assignment and install-time prompts.
  - Breaks without it: Over-permissioned app or missing required API access at runtime.

- Technology: GitHub Webhooks (payloads & security)
  - Concept: Webhook event names, payload formats, and signature verification (`x-hub-signature-256`)
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Exact event names and signature semantics used by webhook handler.
  - Decision informed: Which events to subscribe to and HMAC verification implementation.
  - Breaks without it: Missed events, incorrect HMAC checks, false accept/reject of webhooks.

- Technology: Authenticating as a GitHub App (JWT & installation tokens)
  - Concept: JWT creation, installation tokens, token lifetimes, renewal flows
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Correct generation and exchange for installation tokens used to call REST APIs.
  - Decision informed: Token/rotation strategy and where to use installation tokens vs personal tokens.
  - Breaks without it: Invalid auth flows, inability to query repos or perform actions as app.

- Technology: HashiCorp Vault / Cloud KMS (secret storage)
  - Concept: Secure storage, access control, rotation, audit logging
  - Official source: https://www.vaultproject.io/docs (or cloud KMS provider docs as appropriate)
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Secure storage and rotation requirements for PEM private keys and webhook secrets.
  - Decision informed: Where to store PEMs, who may access, and audit requirements.
  - Breaks without it: Private keys leaked or unrotated, audit gaps, non-compliant secret handling.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md
  - Coverage status: PARTIAL
  - Exact gaps: No permission matrix, no canonical webhook event list, no secrets storage decisions, no runbook.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (private key storage, automation, permission matrix) but does not provide the permission matrix or runbook content.

- /Users/aryasoni/Desktop/Forgea/apps/forgea-labs/app/api/webhooks/github/route.ts
  - Coverage status: PARTIAL
  - Exact gaps: Implements `push` event handling and HMAC verification but lacks event routing for PRs/issues, no exhaustive security runbook, and no tests or contract docs for payload handling.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/.env and .env.example
  - Coverage status: INSUFFICIENT
  - Exact gaps: Secrets present in plaintext `.env`; no documented Vault/KMS integration or required secret policies.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs/EPIC-F/github-apps.md` — add pinned GitHub docs, auth flows, and install footprint rationale.
- `/docs/official-docs/EPIC-F/github-app-permissions-matrix.md` — add canonical permission matrix (tabular), minimal scopes, and rationale.
- `/docs/official-docs/EPIC-F/github-webhook-runbook.md` — add webhook events, payload contracts, HMAC verification snippet, delivery validation, retries.
- `/docs/official-docs/EPIC-F/github-secrets-storage.md` — describe required Vault/KMS objects, rotation cadence, ACLs, and audit expectations.

---

### STUDY GUIDE FOR HUMAN (PER CONCEPT)

- `GitHub Apps`: Why — app identity + scoped install tokens for server-to-server actions. Alternatives — OAuth App (user-scoped) or personal access tokens; use OAuth when actions must run in end-user context. When NOT to use — if app must act strictly as users (use OAuth). Common mistakes — granting repo write scopes unnecessarily; storing private key in repo.

- `Webhook security`: Why — verify source authenticity and protect public endpoints. Alternatives — IP allowlist (fragile) + HMAC. When NOT to use — internal-only endpoints behind VPN need fewer checks. Common mistakes — verifying wrong header (`x-hub-signature` vs `x-hub-signature-256`), using non-raw body for HMAC.

- `Auth (JWT & installation tokens)`: Why — short-lived tokens principle of least privilege. Alternatives — PATs (long-lived, risky). When NOT to use — debugging/one-off tasks (use throwaway PATs). Common mistakes — not refreshing installation tokens, miscomputing JWT `iat`/`exp`.

- `Secrets management (Vault/KMS)`: Why — centralized control, rotation, auditing. Alternatives — cloud provider secret managers. When NOT to use — local dev (use `.env` but flagged as dev-only). Common mistakes — checking keys into repo, insufficient ACLs, no rotation policy.

---

### INTERNAL DOCS TO ADD OR EXTEND (IF PARTIAL)

- Path: /docs/official-docs/EPIC-F/github-apps.md
  - Purpose: Canonical guide for creating the Forgea GitHub App, auth flows, install footprints, and links to pinned GitHub docs.
  - Exact knowledge to add: Step-by-step creation, required API endpoints, which REST endpoints will be used, sample JWT code, and recommended PKI handling.
  - Required version pin: GitHub docs link + `VERSION UNKNOWN — MUST BE PINNED`

- Path: /docs/official-docs/EPIC-F/github-app-permissions-matrix.md
  - Purpose: Machine-readable permission matrix (CSV/markdown table) mapping app capabilities to minimal permissions.
  - Exact knowledge to add: Table columns: `Capability | GitHub Permission | Level (read/write/admin) | Rationale` and entries for contents, pull_requests, webhooks, checks, issues.
  - Required version pin: GitHub permissions doc (VERSION UNKNOWN — MUST BE PINNED)

- Path: /docs/official-docs/EPIC-F/github-webhook-runbook.md
  - Purpose: Operational runbook for webhook onboarding, delivery verification, retries, and incident response.
  - Exact knowledge to add: Exact event list to subscribe to, verified sample payloads, HMAC verification code snippets, monitoring checks, replay procedure.
  - Required version pin: GitHub webhooks doc (VERSION UNKNOWN — MUST BE PINNED)

- Path: /docs/official-docs/EPIC-F/github-secrets-storage.md
  - Purpose: Secrets handling policy for private PEMs, webhook secrets, and installation tokens.
  - Exact knowledge to add: Vault path examples, ACL examples, rotation cadence (recommend 90 days for PEM, 8 hours for installation tokens), emergency rotation steps.
  - Required version pin: Vault/KMS docs (VERSION UNKNOWN — MUST BE PINNED)

---

### OPEN QUESTIONS / AMBIGUITIES

- Should the Forgea GitHub App be installed at organization level (recommended) or per-repo? (affects permission scoping and management)
- Which secret backend will be used in production (HashiCorp Vault vs AWS KMS/Secrets Manager vs GCP Secret Manager)?
- Exact permission decisions for automated workflows (does the app need `contents:write` or only `checks:write` and `pull_requests:write`?).
- Who owns the rotation and emergency-rotation workflow (team / role / on-call)?

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F1 — GitHub App Setup
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F1_GitHub_App_Setup.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for GitHub App setup.
```
