# Feature Docs Brief — F12_Internal_Documentation

## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F12 — Internal Documentation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F12_Internal_Documentation.md
  - /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F12_Internal_Documentation.md

## REQUIRED OFFICIAL DOCUMENTATION

1) Technology: GitHub Apps & Permissions
- Concept: GitHub App permissions model, installation scopes, and least-privilege guidance
- Official source: https://docs.github.com/en/developers/apps
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines exact scopes required for repo creation, branch protection, webhook delivery, and automation tasks.
- Decision it informs: Permission matrix and least-privilege mapping for the GitHub App used by lab automation.
- What breaks without it: Over-privileged installations, failed API calls due to missing scopes, and unclear migration steps for scope changes.

2) Technology: GitHub REST API (Repositories & Apps)
- Concept: Repo creation, template instantiation, app installation endpoints, and webhook subscription.
- Official source: https://docs.github.com/en/rest
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Guides API contracts, idempotency, and error semantics used in operator playbooks and the session-creation API.
- What breaks without it: Incorrect rollback semantics and fragile automation.

3) Technology: Operational Runbooks / Incident Playbooks (best practices)
- Concept: Runbook structure for rollback, remediation, and escalations during repo or webhook failures.
- Official source: (project-specific; leverage SRE/incident guide templates)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides canonical layout for operator playbooks and ensures consistent remediation steps.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F12_Internal_Documentation.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator-level plan present but no published official docs implementing GitHub App permission matrix, lifecycle diagrams, webhook flows, rollback playbooks, or Security Sentinel checklist.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to create/extend (paths under `/docs/official-docs/EPIC-F`):

- `github-app-permissions.md`
  - Purpose: Permission matrix mapping specific GitHub App scopes to features (repo template creation, branch protection, webhooks, admin tasks) and least-privilege rationale.
  - Exact knowledge to add: Scope strings, migration plan for adding/removing scopes, required installation permissions, and sample JWT/token flows.
  - Required version pin: GitHub Apps docs (PIN REQUIRED)

- `repo-lifecycle-and-ownership.md`
  - Purpose: Diagram and textual flow describing repo creation (template or fork), ownership model, visibility, metadata capture, normal deletion, and rollback on partial failures.
  - Exact knowledge to add: State diagram, metadata fields captured at creation, retention expectations, and owner/maintainer responsibilities.

- `webhook-event-flow.md`
  - Purpose: Document which webhook events are used, payload fields of interest, retry semantics, and exact webhook-to-session resolution algorithm.
  - Exact knowledge to add: `repository.id` usage, fallback to URL, lookup order, and error-handling/resilience guidance.

- `rollback-and-operator-playbook.md`
  - Purpose: Stepwise remediation playbooks for failed repo creation, failed template instantiation, webhook mis-delivery, and permission issues.
  - Exact knowledge to add: Trigger conditions, exact CLI/API commands for remediation, required roles, and audit/log queries for verification.

- `security-sentinel-checklist.md`
  - Purpose: Checklist for Security Sentinel review: audit logging, token rotation, least-privilege checks, monitoring hooks, and acceptance criteria for publishing docs.
  - Exact knowledge to add: Required telemetry events, alert thresholds, and a short acceptance test list.

## STUDY GUIDE FOR HUMAN

- GitHub App Permissions:
  - Why: Ensures least-privilege automation and clear upgrade/migration paths for scopes.
  - Alternatives: Use PATs or org-level automation (not recommended for least-privilege).
  - Mistakes: Granting `admin` or `repo` wide scopes where finer scopes suffice; not documenting required scopes per feature.

- Webhook Event Flow:
  - Why: Webhook mapping is core to session binding and must be stable and indexed.
  - Alternatives: Polling (inefficient) or provider-side event filtering.
  - Mistakes: Relying on unstable string fields instead of provider `repository.id` or not handling retries.

## OPEN QUESTIONS / AMBIGUITIES

- Preferred doc format and diagram style (SVG/PlantUML/mermaid)?
- Exact GitHub App scope decisions (requires product/security sign-off).

## MASTER DOCS REGISTRY ACTION

Append to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F12 — Internal Documentation
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F12_Internal_Documentation.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required internal docs for GitHub App permissions, lifecycle diagrams, webhook flows, and rollback playbooks.

---

END OF BRIEF
