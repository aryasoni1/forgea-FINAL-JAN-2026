## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F2 — Repository Lifecycle Management
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

1) Technology: GitHub REST API
   - Concept: Create repository for an organization (deterministic HTTP responses, error codes)
   - Official source: https://docs.github.com/en/rest/repos/repos#create-a-repository-for-an-organization
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Implementation must call a stable API endpoint and map error codes to rollback classes.
   - What decision it informs: Retry/backoff strategy, deterministic error classification, required scopes/permissions.
   - What breaks without it: Risk of misinterpreting API errors, improper rollbacks, and orphaned repos.

2) Technology: GitHub Apps (Authentication & Installation model)
   - Concept: Authenticating as a GitHub App (JWT, installation tokens), permission model, webhook security
   - Official source: https://docs.github.com/en/apps
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Create-repo flows must authenticate as a GitHub App with correct installation permissions and limited scopes.
   - What decision it informs: Token lifecycle, signing requirements, least-privilege permissions, responsibility split between app and installation.
   - What breaks without it: Over-privileged tokens, broken auth flow, inability to revoke or audit actions.

3) Technology: GitHub Organization Repository Policies
   - Concept: Organization-level repo creation defaults and restrictions (prevent public repo creation, required ownership)
   - Official source: https://docs.github.com/en/organizations/managing-organization-settings/repository-creation
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determine which enforcement can be delegated to org settings vs. must be enforced by the App/service.
   - What decision it informs: Whether service must block public visibility at creation or rely on org enforced defaults.
   - What breaks without it: Inconsistent enforcement and potential accidental public repos.

4) Technology: Branch Protection API
   - Concept: Apply branch protection rules programmatically after repo creation
   - Official source: https://docs.github.com/en/rest/branches/branch-protection
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Needed to apply mandatory branch protection and default protected branch configuration on new repos.
   - What decision it informs: Post-create configuration sequence; whether branch protection must be a transactional step in creation flow.
   - What breaks without it: Repos may be created without required protections, violating policy.

5) Technology: GitHub REST API — Repository Topics / Labels / Templates
   - Concept: Default issue templates, labels, repo topics via API (management of metadata)
   - Official source: https://docs.github.com/en/rest/repos
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To programmatically set metadata and templates at creation time.
   - What decision it informs: Where to persist operational metadata vs. GitHub topics, and ordering of config steps.
   - What breaks without it: Missing automation for required templates/labels and inconsistent operator experience.

## EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis and agent plan but lacks naming convention, metadata schema, deterministic error model, and rollback playbook.

- Doc path: /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - Coverage status: PARTIAL
  - Exact gaps: Scouted risks and missing artifacts are enumerated, but no implementation spec or pinned official docs are present.

- Doc path: /docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry exists but has no pinned GitHub API entries or feature-specific official-doc claims for repository lifecycle.

- Doc path: /docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: The canonical registry does not yet list GitHub API/Apps/org-policy documents required by this feature.

## DOCUMENTATION COVERAGE DECISION

- ⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED
  - Required extensions:
    - Add pinned official-doc entries for GitHub REST API, GitHub Apps auth, Org repository policy, and Branch Protection API to `/docs/official-docs-registry.md`.
    - Add internal canonical guides under `/docs/official-docs/github/` (see list below).

## STUDY GUIDE FOR HUMAN

- GitHub REST API — Why: provides exact request/response semantics for create-repo; Alternatives: GraphQL (more flexible but different error model); When NOT to use: avoid GraphQL for simple create + deterministic status checks; Common mistakes: not mapping 422/403/422 to rollback classes, missing rate-limit handling.

- GitHub Apps (Auth) — Why: App model enables scoped, auditable actions; Alternatives: personal access tokens (do NOT use for server automation); When NOT to use: never use org owner PATs for automated provisioning; Common mistakes: failing to refresh installation tokens, storing JWTs insecurely, requesting overbroad app permissions.

- Organization Repo Policies — Why: org settings can enforce visibility defaults and reduce service complexity; Alternatives: service-side enforcement (still required for metadata); When NOT to use: if org policy already forbids creation, avoid duplicate enforcement; Common mistakes: assuming org defaults override API calls in all cases.

- Branch Protection API — Why: programmatic hardening of default branches; Alternatives: org templates/repo templates (may not cover all cases); When NOT to use: don't rely only on manual protection at operator step; Common mistakes: applying protection before default branch exists, ignoring required contexts.

## INTERNAL DOCS TO ADD OR EXTEND

Include the following canonical internal docs under `/docs/official-docs/github/` (required before implementation):

1) Path: /docs/official-docs/github/create-repo-api.md
   - Purpose: Pin the exact REST endpoint, sample requests/responses, and error codes to be mapped to rollback classes.
   - Exact knowledge to add: Required fields, allowed values, rate-limit guidance, sample error payloads for recoverable vs unrecoverable failures.
   - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2) Path: /docs/official-docs/github/apps-auth.md
   - Purpose: Authoritative guide for GitHub App authentication, signing, installation tokens, and least-privilege permissions required for repo creation and configuration.
   - Exact knowledge to add: JWT lifecycle, installation token TTL, required scopes, webhook signing verification, and principal-of-action mapping.
   - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3) Path: /docs/official-docs/github/org-repo-policies.md
   - Purpose: Canonical list of org-level repository defaults and enforcement knobs (e.g., default visibility, allowed repo creation sources).
   - Exact knowledge to add: Which org settings are relied upon vs. which must be enforced by the service, admin permission requirements to query/change settings.
   - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

4) Path: /docs/official-docs/github/rollback-playbook.md
   - Purpose: Deterministic rollback and cleanup playbook mapping API error classes to exact cleanup steps and acceptance criteria.
   - Exact knowledge to add: Error taxonomy, ordered cleanup steps, idempotent cleanup operations, required audit logs, and integration test cases.
   - Required version pin: N/A (internal playbook)

## OPEN QUESTIONS / AMBIGUITIES

- Naming convention specifics (prefixes, forbidden chars, max length) — Planner must provide definitive rule-set.
- Metadata persistence location (GitHub topics vs. internal DB vs. both) — decide durable canonical store.
- Required admin privileges for the GitHub App vs. installation-level tokens — confirm least-privilege model with Org admins.
- Retention and archival policy for created repos (when are repos deleted vs archived) — needed for rollback and cleanup acceptance criteria.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F2 — Repository Lifecycle Management
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for GitHub repo lifecycle, rollback, and policy enforcement.
