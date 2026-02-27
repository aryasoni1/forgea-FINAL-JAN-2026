# FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G4 — Branch & History Validation
- Source: Agent Orchestrator Output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch_&_History_Validation.md


### TASKS CHECKED

- planner-architect: Define branch-allowlist, protected-branch rules, and force-push detection semantics.
- implementer: Implement detection, rejection, and audit logging for history rewrite attempts.
- security-sentinel: Review rejection logic to ensure no bypass and that logging does not leak PII.
- qa-tester (optional): Create tests for history-rewrite invariants if planner requires them.
- Orchestrator note: Suggest standardized rejection reason codes across EPIC-G for cross-feature auditing.


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch_&_History_Validation.md — Contains the feature analysis: feature type (code / policy enforcement), risk level (High), required agents, execution plan steps, and an orchestrator improvement note recommending standardized rejection codes.
- Related orchestrator/task references found elsewhere in repository: multiple EPIC-F orchestrator docs describe branch protection and force-push disabling semantics (see EPIC-F F5_Branch_&_Repository_Protection.md and F9_Forbidden_Change_Detection.md). The official-docs-registry also includes GitHub-protection sources and usage notes.


### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level planning: The EPIC-G orchestrator file defines roles and high-level execution steps (planner → security review → implementer). However, the concrete policy artifacts and implementation code are not present in the repository under EPIC-G.
- Cross-EPIC references: EPIC-F contains concrete protection guidance (disable force-push, block deletion, lock paths) which is relevant and partially overlaps with G4 goals; however, these are in EPIC-F, not implemented as G4-specific policy/code.


### WHAT IS MISSING

- Policy artifacts for G4 (explicit `branch-allowlist`, `protected-branch` rule document, and exact `force-push`/history-rewrite semantics and rejection reason codes) — Not found for EPIC-G.
- Implementation code for detection and enforcement (no service/webhook/middleware in EPIC-G implementing detection, rejection, and audit logging for history rewrites was found).
- Audit-log schema and retention rules for history-rewrite events (no artifact defining how to log, what fields are required, and PII handling was found for this feature).
- Security review artifacts from `security-sentinel` for G4 (no review docs or signoff found).
- Tests and QA scenarios specific to G4 (no test plans or harness for push/force-push scenarios specific to G4 were found).


### RISKS OR CONFLICTS

- Risk Level: The orchestrator marks this feature as High risk.
- Overlap with EPIC-F: EPIC-F already prescribes repository/branch protection behaviors (disable force-push, block deletion, lock paths). Without explicit coordination, implementers may duplicate or conflict with EPIC-F templates.
- Missing rejection-code standardization: Orchestrator suggests standardized rejection codes; absence of a canonical list risks inconsistent audit and automated handling across EPIC-G and EPIC-F.
- Audit/PII exposure: No PII/privacy guidance for audit logs was found for G4; logs may inadvertently include user-identifying data unless reviewed by `security-sentinel`.


### QUESTIONS FOR CLARIFICATION

- Confirm the intended primary agent to act next: `planner-architect` (as listed) — proceed? (If not, specify the next agent.)
- Should G4 re-use EPIC-F branch-protection templates, or must G4 produce separate, distinct policy documents?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Use this report: docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch_&_History_Validation.md

Prompt:

You are the `planner-architect` assigned as the next agent for G4 — Branch & History Validation. Based on the attached code-scout report and the Agent Orchestrator output (docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch_&_History_Validation.md), please produce the following artifacts and return them as discrete documents:

- A canonical policy document named `G4-branch-history-policy.md` that DEFINES ONLY (no implementation):
  - The exact `branch-allowlist` semantics and data model.
  - The `protected-branch` rules, including explicit fields (e.g., which branches, required checks, PR review requirements).
  - Precise force-push / history-rewrite detection semantics: what qualifies as a history rewrite and which events are considered enforcement triggers.
  - A list of standardized rejection reason codes (short machine-readable keys and human-readable messages) to be used across EPIC-G.
  - Audit log field specification (required fields, types, retention guidance, and PII exposure constraints) for history-rewrite events.

- A short task checklist for `implementer` describing the exact inputs and outputs they require to implement detection, rejection, and audit logging (file names, API endpoints, expected return codes, and the standardized rejection codes you defined).

Constraints: Do not implement or change code. Do not propose specific implementation libraries or code snippets. Focus strictly on precise policy definitions, rejection codes, audit field schemas, and the exact acceptance criteria the `implementer` will need.

Reference this code-scout report when producing the artifacts. Return the two documents and a single-line confirmation when complete.


Handoff complete. Provide this report verbatim to the next agent.