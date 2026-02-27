# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C3 — OAuth Providers
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C3_OAuth_Providers.md

---

## TASKS CHECKED

- Find existing OAuth provider usage (GitHub, Google, etc.), env var names, and where secrets are read.
- List endpoints and redirect URIs currently in code/config.

(Tasks above taken from the Agent Orchestrator feature file for this feature.)

---

## WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C3_OAuth_Providers.md — Orchestrator feature analysis including:
  - Feature analysis (type, risk level)
  - Required agents list and execution plan
  - User prompts for Forgea Code Scout, Docs Gatekeeper, and Planner/Architect
- docs/GLOBAL-POLICY.md — Global policy file referenced by the orchestrator (present in repository top-level `docs`).

No other explicit OAuth provider configuration files or code references were identified from the Agent Orchestrator file alone.

---

## WHAT IS PARTIALLY IMPLEMENTED

- The Orchestrator file includes prompts and an execution plan for this feature, but it does not contain actual repository locations, code snippets, env var names, or redirect URIs.

---

## WHAT IS MISSING

- Not found (in the Orchestrator output):
  - Provider configuration files (e.g., `providers.ts`, `oauth-config.*`, or similar).
  - Concrete env var names used to store OAuth client IDs / secrets.
  - Code locations that read OAuth secrets from environment or secret store.
  - Registered redirect URIs or endpoints in code/config.

These items need a repo scan to locate; they were not present in the orchestrator feature file.

---

## RISKS OR CONFLICTS

- The Orchestrator marks this feature as `Risk Level: High`.
- No evidence in the Orchestrator file that OAuth secrets and provider setup have been validated against `docs/GLOBAL-POLICY.md`.

---

## QUESTIONS FOR CLARIFICATION

- Should the Forgea Code Scout now perform an automated repository scan to locate OAuth provider usage, env var names, and any redirect URIs, then update this report? (Recommended next step if you want concrete file locations.)

---

## NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Docs Gatekeeper

Context: This report (Code Scout findings) is at: docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C3*OAuth_Providers.md

Prompt (copy-paste-ready):

"You are the Docs Gatekeeper. Using the Code Scout report located at `docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C3*OAuth_Providers.md`, validate that any OAuth provider setup (GitHub, Google, etc.) complies with the project's `docs/GLOBAL-POLICY.md` for secret handling and minimal scope. Specifically:

- Confirm whether OAuth client IDs/secrets are referenced in repository config or code (the Code Scout reported none found). If you find references, list exact file paths and environment variable names.
- Verify that secrets are expected to be stored in an approved location (per `docs/GLOBAL-POLICY.md`) and flag any occurrences of secrets committed to source or stored in plaintext config.
- Check that suggested secret naming conventions and storage locations align with project policy; if policy requires names or vault usage, list the recommended secret names and the recommended storage target (e.g., platform env, Vault) — do not propose implementation details beyond naming and storage destination.
- Confirm whether OAuth scopes implied by provider prompts meet the principle of least privilege; if scope info is missing in code/config, list which scopes the implementer should confirm during registration.

Deliverable: A short, factual validation report stating: (1) files and env var names found (or `Not found`), (2) whether current findings comply with `docs/GLOBAL-POLICY.md`, and (3) explicit secret names and storage locations for implementers to use. Reference this Code Scout report in your response."

---

Handoff notes:
- The Orchestrator expects sequence: Forgea Code Scout → Docs Gatekeeper → Planner/Architect.
- The Code Scout step has not yet performed a repository scan; Docs Gatekeeper may either request that scan or proceed if it can locate provider references itself.

