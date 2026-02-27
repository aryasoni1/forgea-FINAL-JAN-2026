FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F5 — Branch & Repository Protection
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub REST API — Branch Protection
  - Concept: Applying branch protection rules via API (prevent force-push, prevent deletion, require PR checks/reviews)
  - Official source: https://docs.github.com/en/rest/branches/branch-protection
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Describes API endpoints, request/response shapes, required permissions, and behaviour differences (org vs repo, enterprise).
  - Decision informed: Implementation approach and exact API calls, error handling, and supported options.
  - What breaks without it: Risk of incorrect API usage, insufficient permissions, and incompatible requests against GH Enterprise variants.

- Technology: GitHub CODEOWNERS / protected path patterns
  - Concept: Using CODEOWNERS and repository mechanisms to enforce file-level ownership and review gating
  - Official source: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Clarifies how CODEOWNERS is evaluated, supported path patterns, and interplay with branch protection.
  - Decision informed: Whether path-locking is achievable via CODEOWNERS + branch protection or requires additional mechanisms.
  - What breaks without it: Mis-assumptions about per-path enforcement; false sense of protection for sensitive files.

- Technology: GitHub Authentication / PAT & GitHub App Scopes
  - Concept: Required auth scopes and tokens for calling branch-protection APIs and repository administration
  - Official source: https://docs.github.com/en/authentication
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines minimal permissions for Implementer (e.g., `repo`, `admin:repo_hook`, or app permissions) and least-privilege design.
  - Decision informed: Credential provisioning, CI secrets configuration, and auditable access controls.
  - What breaks without it: Over-privileged keys, failed API calls, or inability to automate protections.

- Technology: GitHub Enterprise Server compatibility notes
  - Concept: API surface and behaviour differences in GitHub Enterprise Server vs GitHub.com
  - Official source: https://docs.github.com/en/enterprise-server
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures implementation works against the target org's GitHub environment.
  - What breaks without it: API mismatches, unsupported features, or unexpected failures in enterprise deployments.

EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis and agent prompts but no implementation artifacts, templates, or acceptance criteria. Missing concrete policy template (JSON/YAML), permission scoping, LabSession metadata schema, and test cases.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scout identifies missing implementer artifacts, protected-path enforcement mechanism, tests, and published policy pages.

DOCUMENTATION COVERAGE DECISION

- ⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED
  - Docs to extend: `/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md` and `/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md`
  - Reason: Both contain analysis and plans but lack the concrete, machine-readable policy template, required API permissions list, LabSession metadata schema, and an acceptance checklist with non-destructive test cases.

STUDY GUIDE FOR HUMAN

- GitHub Branch Protection API:
  - Why this exists: To programmatically lock branches (prevent force-push, deletions, require PR checks) at scale.
  - Why alternatives exist: UI is manual; enterprise automation prefers API-driven reproducible enforcement.
  - When NOT to use: For ad-hoc single-repo edits where manual UI is sufficient or when the org uses alternative enforcement tooling.
  - Common mistakes: Assuming per-file path protection is supported natively; missing required token scopes; not handling branch-protection preconditions (e.g., required status checks must exist).

- CODEOWNERS and path-level enforcement:
  - Why this exists: Assigns required reviewers/owners for path patterns to gate reviews.
  - Why alternatives exist: Server-side hooks or CI blockers can provide stricter, auditable enforcement.
  - When NOT to use: When true write-blocking for paths is required (CODEOWNERS only routes reviews, doesn't block pushes by itself).
  - Common mistakes: Expecting CODEOWNERS to prevent direct pushes; mis-specified globs leading to unprotected files.

- GitHub Auth Scopes & Apps:
  - Why this exists: Ensures automated agents have least privilege while allowing administrative operations.
  - Why alternatives exist: GitHub Apps offer finer-grained permissions over PATs for long-lived automation.
  - When NOT to use: Avoid long-lived PATs with broad `repo` scope when a GitHub App can be used.
  - Common mistakes: Granting repository-level admin unnecessarily; storing tokens insecurely in CI variables.

INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-F/branch-protection-policy.md
  - Purpose: Canonical, human-readable branch protection policy for the org (default-branch rules, protected paths list, recoveries).
  - Exact knowledge to add: The default branch rule set, protected path globs, escalation/remediation steps, and change approval flow.
  - Required version pin: N/A (internal doc) — reference pinned GitHub API docs.

- Path: /docs/official-docs/EPIC-F/branch-protection-template.yaml
  - Purpose: Machine-readable policy template (YAML + JSON example) that Implementer will push to repos.
  - Exact knowledge to add: Example branch-protection JSON payloads, CODEOWNERS examples, and per-path enforcement notes.
  - Required version pin: Reference pinned GitHub API doc version.

- Path: /docs/official-docs/EPIC-F/branch-protection-testing.md
  - Purpose: Acceptance checklist and non-destructive test cases for Security Sentinel / Integration Checker.
  - Exact knowledge to add: Test steps, expected API responses, sample curl/gh commands, and LabSession metadata keys to assert.
  - Required version pin: N/A

OPEN QUESTIONS / AMBIGUITIES

- Target scope: Which GitHub organization(s) and repository name patterns should protections be applied to?
- Credentials: Will a GitHub App (recommended) or a PAT with admin scopes be provided? Where are these credentials stored and audited?
- GitHub environment: Is GitHub Enterprise Server in use (and if so, which version)?
- Per-path locking: Should enforcement be implemented using CODEOWNERS + branch-protection rules, server-side hooks, or an agent that reverts unauthorized changes?

MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md`:

  - Epic / Feature: EPIC-F / F5 — Branch & Repository Protection
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md
  - Status: ADDED (EXTEND)
  - Reason: Gatekeeper brief enumerating required official docs, internal gaps, and registry updates for branch protection.
