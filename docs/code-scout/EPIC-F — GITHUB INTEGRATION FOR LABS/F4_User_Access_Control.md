## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F4_User_Access_Control
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md


### TASKS CHECKED

- Planner: Define collaborator permission model and verification steps (Execution Plan Step 1)
- Implementer: Implement collaborator invite flow with push-only permissions (Execution Plan Step 2)
- Security Sentinel: Confirm no admin privilege escalation path (Execution Plan Step 3)
- Integration Checker: Validate invites and permission enforcement (Execution Plan Step 4)
- Documenter: Publish onboarding and verification documentation (Execution Plan Step 5)


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md — Contains feature analysis, required agents, execution plan, agent prompts, and orchestrator improvement notes.


### WHAT IS PARTIALLY IMPLEMENTED

- Planning and requirements captured in the Agent Orchestrator output (see Source above): required agents, execution plan, and agent prompts are specified, but no implementation artifacts accompany these plans.


### WHAT IS MISSING

- Not found: Implementation code or automation for adding collaborators (no GitHub App code, scripts, or service components present in repository for this feature).
- Not found: API routes or backend services implementing collaborator invite flows and permission enforcement.
- Not found: Audit storage design or centralized collaborator audit logs for tracking IDs/timestamps as requested by the Implementer prompt.
- Not found: Integration tests or automation validating push-only access and prevention of admin grants.
- Not found: User-facing onboarding documentation or runbooks beyond the orchestrator prompt (the Documenter task remains unimplemented).


### RISKS OR CONFLICTS

- Based on the observed orchestrator output, risk level is listed as "Low." No conflicting code or docs were observed in the repository related to this feature.
- Orchestrator recommends an "audit-focused agent" in future — absence of centralized audit logs is a potential operational gap.


### QUESTIONS FOR CLARIFICATION

- Not strictly required to proceed from this report. If the next agent needs further scope constraints (e.g., which repos to target, allowed TTL values), request explicit values.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Planner agent. Use this report at docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F4_User_Access_Control.md as your source of truth.

Task: Define the collaborator permission model and verification criteria required to implement "F4_User_Access_Control".

Inputs you must use (do not invent additional deliverables):
- The Agent Orchestrator output summarized in this report (Source above).

Deliverables (explicit, factual, and limited to planning scope):
- Specify the exact required permission level for collaborators (must state "push-only" explicitly if that is the chosen level).
- State whether a TTL for collaborator access is required; if so, provide the TTL format (duration or expiry semantics) and any required renewal criteria.
- Define verification criteria that downstream implementers will use to validate push-only access (what API checks, audit fields, and evidence are required).
- List required audit fields (minimum: collaborator ID, inviter ID, repo identifier, timestamp) to store when invites are created.
- State any explicit constraints: e.g., forbid any programmatic grant of admin/owner role, or require manual approval if elevated permissions are ever requested.

Constraints: Do not implement code or prescribe specific implementation details (libraries, endpoints). Focus on an exact, testable specification that an Implementer agent can convert into code.

Reference this code-scout report in your deliverable and clearly label each item so the Implementer can act without further interpretation.
