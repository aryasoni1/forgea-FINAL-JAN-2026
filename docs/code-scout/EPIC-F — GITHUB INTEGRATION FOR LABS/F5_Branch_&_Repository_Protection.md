FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F5 — Branch & Repository Protection
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md

TASKS CHECKED
- Planner: Define branch protection policy and protected paths.
- Implementer: Apply protections via GitHub API (disable force-push, block deletion, lock paths).
- Security Sentinel: Verify protections and attempt controlled bypass checks.
- Integration Checker: Validate enforcement on created repos (non-destructive tests).
- Documenter: Document policy and remediation steps.

WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md — Contains the feature analysis, required agents, execution plan, agent prompts, and orchestrator notes (risk level, execution steps).

WHAT IS PARTIALLY IMPLEMENTED
- Not found: No implementation code, scripts, or CI workflows for applying branch protections were observed in the orchestrator output. (No repo-side artifacts referenced in the source file.)

WHAT IS MISSING
- Implementer artifacts: scripts/services that call the GitHub API to apply branch protection policies.
- Enforcement templates: a canonical protection policy template (JSON/YAML) for reuse.
- Protected-path enforcement: mechanism to lock specific file paths (tests directories, `forgea.config.json`) and record enforcement metadata.
- Tests & integration checks: non-destructive validation tests and automation to confirm protections on newly-created repos.
- Documentation: a published policy page and recovery/remediation steps in official docs.

RISKS OR CONFLICTS
- Risk level: Medium (as noted in the orchestrator output).
- Hard lock: Not required (the orchestrator notes "Touches HARD LOCK: No").
- Observed ambiguity: the orchestrator file specifies required agents and steps but no concrete target org/repos or existing GitHub App/credentials are referenced in the source document.

QUESTIONS FOR CLARIFICATION
- Confirm the target GitHub organization(s) and repository name patterns for applying protections.
- Confirm whether an existing GitHub App or PAT with required repo.admin scopes will be available to the Implementer.

NEXT AGENT HANDOFF PROMPT (MANDATORY)
This prompt is for the next agent: Planner. Use the findings in this code-scout report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md) as the source of truth.

Planner prompt (copy-paste-ready):

You are the Planner for Feature F5 — Branch & Repository Protection. Based on the attached code-scout report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md), produce a definitive branch protection policy specification that includes all of the following (do not implement; only define the policy and lists):

- The default-branch protection rules: explicitly state whether to disable force-push, disallow branch deletion, prevent history rewrite, and require status checks or PR reviews.
- A concrete list of protected file paths and directories that must be locked (include `forgea.config.json` and test directories); enumerate path patterns and examples.
- The outputs the Implementer will need: a policy template (JSON/YAML), required GitHub API permissions (scopes), and metadata fields to record in LabSession (what keys/values to store to indicate protections applied).
- Any prerequisites or constraints (e.g., GitHub plan limitations, whether branch-protection per-path is supported or requires CODEOWNERS / other mechanisms).
- A short acceptance checklist the Security Sentinel and Integration Checker can use to verify success.

Reference: This report found no existing implementation artifacts in the repo and flagged missing items (implementation scripts, enforcement templates, tests, and docs). Provide the policy spec and the protected-path list as machine-readable templates where possible.

Handoff complete. Provide this report verbatim to the next agent.