## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F4_User_Access_Control
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md


### REQUIRED OFFICIAL DOCUMENTATION

For the safe, auditable, and testable implementation of collaborator invite flows and push-only access, the following official external documents MUST be referenced and (where applicable) version-pinned before implementation.

- Technology: GitHub REST API (Collaborators endpoints)
  - Concept: Repository collaborator invitations and permission assignment
  - Official source: https://docs.github.com/en/rest/reference/collaborators
  - Exact version requirement: REST API v3 (documented surface used by `docs.github.com/en/rest`) — VERSION NOTE: REST API is stable; confirm API preview headers if using preview endpoints. If any preview headers are required, pin them explicitly.
  - Why required: Defines the exact API calls, request/response shapes, and error codes for creating collaborator invitations and assigning permissions (push/maintain/admin).
  - Decision it informs: How invites are created (invite vs add), required scopes, and verification checks (API fields to assert push-only).
  - What breaks without it: Implementers cannot reliably enforce push-only invites or detect elevation attempts; test criteria will be ambiguous.

- Technology: GitHub Apps (Authentication & Installation Tokens)
  - Concept: How a GitHub App authenticates and acts on behalf of an installation (JWTs, installation access tokens, and permission scoping)
  - Official source: https://docs.github.com/en/developers/apps
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Necessary to design automation that performs invite actions without using user tokens and to ensure least-privilege installation scopes are used.
  - Decision it informs: Whether to implement invites using a GitHub App, what installation scopes are required, and how to rotate/renew tokens.
  - What breaks without it: Automation may use overly-privileged credentials or an unsupported auth flow, opening privilege escalation or operational risk.

- Technology: GitHub Repository Permissions & Roles (Repository role model)
  - Concept: Canonical definitions of `pull`, `push`, `maintain`, and `admin` and their effective capabilities
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/repository-permissions-for-an-organization
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To map requested collaborator permission level (`push-only`) to the correct API value and to know which actions must be forbidden for push-only users.
  - Decision it informs: The exact permission string to apply (`push`) and which API checks prove the absence of higher privileges.
  - What breaks without it: Misapplied permissions that grant more than intended (e.g., maintain/admin), invalid test assertions about allowed actions.

- Technology: GitHub Audit Log & Organization Audit API (where available)
  - Concept: Audit event types and retrieval semantics for collaborator additions and permission changes
  - Official source: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/about-audit-logs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To design the audit-storage and evidence model: which events to ingest, required event fields, retention expectations, and API query semantics.
  - Decision it informs: Required audit fields, ingestion cadence, and evidence queries used by Integration Checker.
  - What breaks without it: Audit evidence may be incomplete or impossible to retrieve; compliance and forensic requirements cannot be satisfied.


### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis, required agents, and execution plan, but does not provide testable verification criteria, exact API endpoints/fields to assert push-only access, nor registry pinning of official docs.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md
  - Coverage status: PARTIAL
  - Exact gaps: Captures implementation gaps (no code, no audit design, no tests). Lacks concrete spec for TTL semantics, verification API checks, and audit field schema.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs/github/collaborator-invite-and-verification.md` — must be created/extended to include exact API endpoints, request/response fields used to assert `push` permission, example API queries to verify collaborator role, and test vectors.
- `/docs/official-docs/github/audit-and-evidence-spec.md` — must be created to define required audit fields, retention, ingestion guidance, and example audit queries for verifying collaborator invites and permission changes.
- `/docs/official-docs/EPIC-F/integration-operational-playbook.md` — must be extended to include operational runbooks for revocation, accidental elevation remediation, and emergency-owner contact flows.


### STUDY GUIDE FOR HUMAN (FOR EACH REQUIRED CONCEPT)

- `GitHub REST API (Collaborators)`
  - Why this exists: Defines how to programmatically add collaborators and set permissions.
  - Why alternatives exist: Manual UI invites or using user OAuth tokens; automation via GitHub App is preferred for least-privilege and auditability.
  - When NOT to use it: For one-off manual invites by repo owners (do not automate owner-level grants).
  - Common engineering mistakes: Assuming `invite` returns effective permissions immediately; not handling pending invitations; confusing `role` strings (use `push` not `write`).

- `GitHub Apps (Auth & Scopes)`
  - Why this exists: Allows server automation to act as an installation with scoped permissions.
  - Why alternatives exist: OAuth or PATs (less preferred due to user-scoped privileges and rotation problems).
  - When NOT to use it: When a human explicitly requests access via their personal account.
  - Common engineering mistakes: Granting the App `admin` scope by accident; failing to rotate installation tokens; storing long-lived PATs.

- `Repository Permissions & Roles`
  - Why this exists: Maps high-level role names to allowed repository actions.
  - Why alternatives exist: Custom ACLs maintained outside GitHub (not recommended for repo-level control).
  - When NOT to use it: For organization-level policy enforcement—use org policies instead.
  - Common engineering mistakes: Mistaking `maintain` for `push` or assuming `push` disallows branch-protection bypass.

- `Audit Log & Evidence`
  - Why this exists: Forensics, compliance, and verification of who/when invited or changed a collaborator.
  - Why alternatives exist: Local DB logs (complementary) but must be correlated with authoritative GitHub audit events.
  - When NOT to use it: For low-sensitivity repos without compliance needs (but still recommended).
  - Common engineering mistakes: Relying only on application logs and not persisting GitHub-provided event IDs/timestamps.


### INTERNAL DOCS TO ADD OR EXTEND

Only the exact files below should be created/extended under `/docs/official-docs/`.

- Path: /docs/official-docs/github/collaborator-invite-and-verification.md
  - Purpose: Canonical implementer spec describing exact API calls, request/response fields, sample curl calls, and automated verification checks to assert `push-only` access.
  - Exact knowledge to add: API endpoint paths, required headers, JSON fields to assert (`permissions`/`role`), example error cases, handling of pending invitations, and test vectors (create invite + verify `GET /repos/:owner/:repo/collaborators/:username/permission`).
  - Required version pin: Link to GitHub REST API v3 page and pin any preview headers if used.

- Path: /docs/official-docs/github/audit-and-evidence-spec.md
  - Purpose: Define required audit fields, ingestion model, retention, and sample queries for verifying collaborator invites and permission changes.
  - Exact knowledge to add: Minimum audit fields (collaborator ID, inviter ID, repo identifier, timestamp), additional fields (invitation status, grant source, GitHub event ID), retention policy, and example API queries against GitHub audit endpoints.
  - Required version pin: Organization audit log docs (pin exact Enterprise/Cloud doc URL used).

- Path: /docs/official-docs/EPIC-F/integration-operational-playbook.md
  - Purpose: Runbooks for onboarding, revocation, accidental elevation remediation, and emergency procedures.
  - Exact knowledge to add: Steps to revoke collaborator access, rollback checklist, contact list, and playbook for manual approval if elevated permissions are required.
  - Required version pin: N/A (internal playbook)


### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- TTL semantics: Is a Time-To-Live for collaborator access required? Planner must specify TTL format (duration or expiry) and renewal criteria before implementer work begins.
- Scope of repos: Will invites be limited to a curated set of repos or any repo under an org? Needed to design least-privilege App installation scopes.
- Audit sink: Where should audit events be persisted (internal DB / SIEM / third-party)? Confirm required retention and access controls.
- Admin grant policy: Confirm that any programmatic admin grants are explicitly forbidden and that manual approval is required if elevated access is requested.


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F4 — User Access Control
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for collaborator invite flows and push-only enforcement.
```

NO OTHER REGISTRY CHANGES REQUIRED HERE; the official docs registry will be updated with GitHub references in the registry update step.
