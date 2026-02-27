# Combined — REQUIRED OFFICIAL DOCUMENTATION

Epic: EPIC-F — GITHUB INTEGRATION FOR LABS

This file aggregates the "REQUIRED OFFICIAL DOCUMENTATION" sections extracted from each feature brief in this epic.

---

## F1_GitHub_App_Setup — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Apps (creating and managing GitHub Apps)
  - Concept: GitHub Apps overview & lifecycle
  - Official source: https://docs.github.com/en/developers/apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical app model, install scopes, and lifecycle operations.
  - Decision informed: Whether to implement as GitHub App vs OAuth App; install footprint (org vs repo).
  - What breaks without it: Incorrect authentication model, incorrect expectations for installation tokens.

- Technology: GitHub App permissions & events
  - Concept: Permissions matrix & event names
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/setting-permissions-for-your-github-app
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps minimal scopes to each required capability.
  - Decision informed: Minimal-permission assignment and install-time prompts.
  - What breaks without it: Over-permissioned app or missing required API access at runtime.

- Technology: GitHub Webhooks (payloads & security)
  - Concept: Webhook event names, payload formats, and signature verification (`x-hub-signature-256`)
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Exact event names and signature semantics used by webhook handler.
  - Decision informed: Which events to subscribe to and HMAC verification implementation.
  - What breaks without it: Missed events, incorrect HMAC checks, false accept/reject of webhooks.

- Technology: Authenticating as a GitHub App (JWT & installation tokens)
  - Concept: JWT creation, installation tokens, token lifetimes, renewal flows
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Correct generation and exchange for installation tokens used to call REST APIs.
  - Decision informed: Token/rotation strategy and where to use installation tokens vs personal tokens.
  - What breaks without it: Invalid auth flows, inability to query repos or perform actions as app.

- Technology: HashiCorp Vault / Cloud KMS (secret storage)
  - Concept: Secure storage, access control, rotation, audit logging
  - Official source: https://www.vaultproject.io/docs (or cloud KMS provider docs as appropriate)
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Secure storage and rotation requirements for PEM private keys and webhook secrets.
  - Decision informed: Where to store PEMs, who may access, and audit requirements.
  - What breaks without it: Private keys leaked or unrotated, audit gaps, non-compliant secret handling.

---

## F2_Repository_Lifecycle_Management — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub REST API
   - Concept: Create repository for an organization (deterministic HTTP responses, error codes)
   - Official source: https://docs.github.com/en/rest/repos/repos#create-a-repository-for-an-organization
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Implementation must call a stable API endpoint and map error codes to rollback classes.
   - What decision it informs: Retry/backoff strategy, deterministic error classification, required scopes/permissions.
   - What breaks without it: Risk of misinterpreting API errors, improper rollbacks, and orphaned repos.

2. Technology: GitHub Apps (Authentication & Installation model)
   - Concept: Authenticating as a GitHub App (JWT, installation tokens), permission model, webhook security
   - Official source: https://docs.github.com/en/apps
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Create-repo flows must authenticate as a GitHub App with correct installation permissions and limited scopes.
   - What decision it informs: Token lifecycle, signing requirements, least-privilege permissions, responsibility split between app and installation.
   - What breaks without it: Over-privileged tokens, broken auth flow, inability to revoke or audit actions.

3. Technology: GitHub Organization Repository Policies
   - Concept: Organization-level repo creation defaults and restrictions
   - Official source: https://docs.github.com/en/organizations/managing-organization-settings/repository-creation
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determine which enforcement can be delegated to org settings vs. must be enforced by the App/service.
   - What breaks without it: Inconsistent enforcement and potential accidental public repos.

4. Technology: Branch Protection API
   - Concept: Apply branch protection rules programmatically after repo creation
   - Official source: https://docs.github.com/en/rest/branches/branch-protection
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Needed to apply mandatory branch protection and default protected branch configuration on new repos.
   - What breaks without it: Repos may be created without required protections, violating policy.

5. Technology: GitHub REST API — Repository Topics / Labels / Templates
   - Concept: Default issue templates, labels, repo topics via API
   - Official source: https://docs.github.com/en/rest/repos
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To programmatically set metadata and templates at creation time.
   - What breaks without it: Missing automation for required templates/labels and inconsistent operator experience.

---

## F3_Lab_Template_Injection — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Template manifest / lab-template schema (machine-readable template payload schema)
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Validate template payload structure (`.forgea/steps.json` placement, required files, checksum fields) before injection.
- What decision it informs: Acceptance criteria for injected payloads and schema-driven validators.
- What breaks without it: Non-deterministic validation, inconsistent template formats, injection failures across implementers.

2. Technology: Glob / Pathspec (file binding grammar)

- Concept: Locked-path globs used by injection and protection enforcement
- Official source: (choose and pin one implementation: gitignore semantics / minimatch / pathspec) — URL depends on choice
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines exact semantics for locked-path matching across CI, GitHub branch protection, and server-side guards.
- What breaks without it: Inconsistent protection, bypassable locked paths, false positives/negatives in enforcement.

3. Technology: JSON Web Signature (JWS) + Ed25519 (EdDSA)

- Concept: Config signature format for `forgea.config.json` provenance and tamper-evidence
- Official source: https://datatracker.ietf.org/doc/html/rfc7515 and https://datatracker.ietf.org/doc/html/rfc8037
- Exact version requirement: RFC 7515 and RFC 8037
- Why required: Tamper-evidence for critical config that must be locked and enforced after injection.
- What breaks without it: Unverifiable config artifacts, inability to prove provenance for locked configs.

4. Technology: GitHub Branch Protection / Repository Protection

- Concept: Branch protection rules and API semantics used to enforce locked paths post-injection
- Official source: https://docs.github.com/en/rest/branches/branch-protection
- Exact version requirement: VERSION UNKNOWN — use GitHub REST API v3 semantics (pin at implementation time)
- Why required: Mechanism to enforce that locked files cannot be edited by maintainers/students via PRs.
- What breaks without it: Locked-path enforcement will be unreliable or require alternate lockdown mechanisms.

---

## F4_User_Access_Control — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub REST API (Collaborators endpoints)
  - Concept: Repository collaborator invitations and permission assignment
  - Official source: https://docs.github.com/en/rest/reference/collaborators
  - Exact version requirement: REST API v3 — VERSION NOTE: REST API is stable; confirm API preview headers if using preview endpoints.
  - Why required: Defines the exact API calls, request/response shapes, and error codes for creating collaborator invitations and assigning permissions.
  - Decision informed: How invites are created (invite vs add), required scopes, and verification checks (API fields to assert push-only).
  - What breaks without it: Implementers cannot reliably enforce push-only invites or detect elevation attempts.

- Technology: GitHub Apps (Authentication & Installation Tokens)
  - Concept: How a GitHub App authenticates and acts on behalf of an installation
  - Official source: https://docs.github.com/en/developers/apps
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Necessary to design automation that performs invite actions without using user tokens.
  - What breaks without it: Automation may use overly-privileged credentials or an unsupported auth flow.

- Technology: GitHub Repository Permissions & Roles
  - Concept: Canonical definitions of `pull`, `push`, `maintain`, and `admin`
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/repository-permissions-for-an-organization
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To map requested collaborator permission level (`push-only`) to the correct API value.
  - What breaks without it: Misapplied permissions that grant more than intended.

- Technology: GitHub Audit Log & Organization Audit API
  - Concept: Audit event types and retrieval semantics for collaborator additions and permission changes
  - Official source: https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/about-audit-logs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To design the audit-storage and evidence model.
  - What breaks without it: Audit evidence may be incomplete or impossible to retrieve.

---

## F5*Branch*&\_Repository_Protection — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub REST API — Branch Protection
  - Concept: Applying branch protection rules via API
  - Official source: https://docs.github.com/en/rest/branches/branch-protection
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Describes API endpoints, request/response shapes, required permissions, and behaviour differences.
  - What breaks without it: Risk of incorrect API usage, insufficient permissions, and incompatible requests against GH Enterprise variants.

- Technology: GitHub CODEOWNERS / protected path patterns
  - Concept: Using CODEOWNERS and repository mechanisms to enforce file-level ownership and review gating
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies how CODEOWNERS is evaluated, supported path patterns, and interplay with branch protection.
  - What breaks without it: Mis-assumptions about per-path enforcement; false sense of protection for sensitive files.

- Technology: GitHub Authentication / PAT & GitHub App Scopes
  - Concept: Required auth scopes and tokens for calling branch-protection APIs and repository administration
  - Official source: https://docs.github.com/en/authentication
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines minimal permissions for Implementer and least-privilege design.
  - What breaks without it: Over-privileged keys, failed API calls, or inability to automate protections.

- Technology: GitHub Enterprise Server compatibility notes
  - Concept: API surface and behaviour differences in GitHub Enterprise Server vs GitHub.com
  - Official source: https://docs.github.com/en/enterprise-server
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures implementation works against the target org's GitHub environment.
  - What breaks without it: API mismatches, unsupported features, or unexpected failures in enterprise deployments.

---

## F6_Lab_Session_Binding — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks & Events

- Concept: Webhook payload fields and event semantics (push, repository)
- Official source: https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines canonical provider fields (`repository.id`, `repository.html_url`) used by webhook handlers to map pushes to sessions.
- What breaks without it: Incorrect or brittle session binding, missed events, inability to safely build indexed lookups.

2. Technology: GitHub REST API (Repositories)

- Concept: Repo creation, template instantiation, repo metadata (repo_id type, html_url), authentication scopes.
- Official source: https://docs.github.com/en/rest/repos/repos#get-a-repository
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Guides atomic repo-creation semantics, idempotency key design, and which provider fields are stable and indexable.
- What breaks without it: Ambiguous repo-id specification, inconsistent lookup keys, and fragile operational procedures.

3. Technology: Prisma (ORM)

- Concept: Schema, migrations, recommended migration patterns and constraints handling.
- Official source: https://www.prisma.io/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Confirms supported DDL, `ON DELETE` semantics, and transactional migration support required for backfill/migration plans.
- What breaks without it: Risk of incompatible migration strategies or unsupported DDL in current Prisma version.

4. Technology: PostgreSQL (Triggers & Transactions)

- Concept: Trigger/function behavior, concurrency semantics, isolation levels, and advisory locks.
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Current DB-level lifecycle trigger exists; need to validate trigger semantics, safe backfill ordering, and transactional guarantees.
- What breaks without it: Migration deadlocks, rejected updates, and inconsistent lifecycle enforcement across rollout phases.

---

## F7_Webhook_Handling — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Webhooks
  - Concept: webhook event names, payload formats, signature verification
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: GitHub Apps authentication
  - Concept: JWT and installation tokens
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Secrets management (Vault / Cloud KMS)
  - Concept: secret storage, rotation, ACLs, audit
  - Official source: https://www.vaultproject.io/docs (or cloud provider KMS docs)
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## F8*Push_Tracking*&\_Audit — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks & Events
   - Concept: Webhook delivery semantics, headers (including `X-GitHub-Delivery`), event payload shapes (push event)
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: GitHub Webhook Event Payload — Push
   - Concept: Exact push event payload structure
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Technology: HTTP Semantics & Retry (RFC 7231)
   - Concept: Proper handling of webhook retries, status codes, and idempotent response behavior
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231

4. Technology: Data Retention / Privacy Guidance (Org legal)
   - Concept: Retention and archival constraints for event logs and forensic data
   - Official source: Organization legal policy (TO BE PINNED)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## F9_Forbidden_Change_Detection — REQUIRED OFFICIAL DOCUMENTATION

(Feature-specific deliverable; primary authoritative input was the code-scout report.)

- Reference source: docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md

(The feature defines repo-scoped locked-path globs and deterministic violation rules; no additional external official docs were required beyond Git provider webhooks/REST docs already listed elsewhere in this combined set.)

---

## F10_Step-Based_Lab_Support — REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Machine-readable schema specification for `.forgea/steps.json`
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12

- Technology: Glob / Pathspec (file pattern semantics)
  - Concept: Canonical globbing/pathspec behavior used to map changed files to steps
  - Official source: VERSION TO BE PINNED — choose a canonical spec (e.g., gitignore minimatch or git pathspec docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Git Provider Webhooks & Push Event Payloads (GitHub example)
  - Concept: Webhook event semantics for push events, changed file lists, and metadata
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: REST/webhook docs as published — VERSION NOTE: stable but confirm any provider-specific payload differences

- Technology: Git Provider Branch Protection & Checks API
  - Concept: How to require checks or use branch protection to prevent merges when steps are incomplete
  - Official source: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches and https://docs.github.com/en/rest/checks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## F11*Error_Handling*&\_Recovery — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Webhooks (Delivery Semantics)
  - Concept: Webhook delivery guarantees, retry semantics, and recommended receiver behavior
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: GitHub API Rate Limiting & Error Codes
  - Concept: Rate limits, abuse detection, transient 5xx behaviors, and best-practice retry headers
  - Official source: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Message Queue / DLQ Patterns (SQS, Redis Streams, Postgres job-table)
  - Concept: Durable queues and dead-letter patterns for retryable and unrecoverable webhook payloads
  - Official sources: AWS SQS, Redis Streams, Postgres job-table docs (see code brief)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Idempotency & Retry Patterns
  - Concept: Idempotency key patterns and storage strategies
  - Official source: RFC 7231 + provider patterns (e.g., Stripe idempotency guidance)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Security & Secrets Management (GitHub App private key handling)
  - Concept: Storing and rotating webhook secrets and GitHub App keys securely
  - Official source: Provider docs (e.g., AWS KMS) and GitHub Apps auth docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

## F12_Internal_Documentation — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Apps & Permissions

- Concept: GitHub App permissions model, installation scopes, and least-privilege guidance
- Official source: https://docs.github.com/en/developers/apps
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: GitHub REST API (Repositories & Apps)

- Concept: Repo creation, template instantiation, app installation endpoints, and webhook subscription.
- Official source: https://docs.github.com/en/rest
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Technology: Operational Runbooks / Incident Playbooks (best practices)

- Concept: Runbook structure for rollback, remediation, and escalations during repo or webhook failures.
- Official source: (project-specific; leverage SRE/incident guide templates)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

End of combined extraction.
