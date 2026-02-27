# FEATURE REPORT: F2 — Repository Lifecycle Management

### FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F2 — Repository Lifecycle Management
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md

---

### TASKS CHECKED
(Listed tasks are taken directly from the Agent Orchestrator output for this feature)
- Planner — Define repository naming convention, metadata to store, and rollback/cleanup conditions.
- Implementer — Implement create-repo API via GitHub App; enforce private visibility and org ownership.
- Security Sentinel — Verify prevention of public repo creation and permission boundaries.
- Integration Checker — Exercise create-repo flow and validate rollback/cleanup on failures.
- Documenter — Document repository lifecycle and rollback behavior for operators.

---

### WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md
  - Contains: Feature analysis, required agents list, execution plan steps, agent prompts, and an "Orchestrator Improvement Notes" entry suggesting a centralized "Repository Policy" agent.
- Execution plan and agent prompts are defined (Planner, Implementer, Security Sentinel, Integration Checker, Documenter).

---

### WHAT IS PARTIALLY IMPLEMENTED
- Execution-level planning artifacts exist (the orchestrator output defines responsibilities and an ordered execution plan). No concrete implementation artifacts were observed in the repository for this feature.

---

### WHAT IS MISSING
(Explicitly not found in the repository based on the orchestrator output and inspected context for this feature)
- No implementation code for a GitHub App or API that creates repositories under the Forgea org.
- No enforcement code or configuration that guarantees created repos are private or owned by the org.
- No rollback/cleanup implementation or test harness exercising rollback scenarios.
- No security-policy artifacts (e.g., organization-level policy enforcement code or IaC) tied to repo creation for labs.
- No automated integration tests or failure-mode simulations for the create-repo flow.
- No finalized naming convention, metadata schema, or deterministic error spec to support safe rollback.

---

### RISKS OR CONFLICTS
(Observed from the orchestrator output and absence of implementation)
- Lack of a centralized "Repository Policy" agent or policy artifacts increases risk of inconsistent naming, visibility, or ownership rules across implementations.
- Without a deterministic error model and rollback implementation, partial failures could leave orphaned repositories or resources.
- Absence of explicit enforcement makes accidental public repo creation possible unless GitHub org settings are constrained elsewhere.

---

### QUESTIONS FOR CLARIFICATION
(None strictly required by the scout; proceed if the Planner needs additional constraints such as naming prefixes, retention policy, or metadata schema.)

---

### NEXT AGENT HANDOFF PROMPT (FOR THE PLANNER AGENT)
Use this exact prompt when invoking the Planner agent. Reference this report file when you run the Planner.

"You are the Planner agent. Refer to the code-scout report at docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F2_Repository_Lifecycle_Management.md. Based on that report, produce the following definitive artifacts for the Implementer:

1) A repository naming convention for lab repositories (examples and allowed/forbidden characters). Include prefix/suffix rules and ownership tagging.
2) A metadata schema to be stored with each repo at creation time (fields, data types, and example values), and where that metadata should be persisted.
3) Required repository defaults and settings to enforce at creation (visibility, branch protection, issue templates, default labels), and which settings are mandatory vs. recommended.
4) Clear rollback and cleanup acceptance criteria: define deterministic error types, what constitutes recoverable vs. unrecoverable failures, and exact cleanup steps for each failure class.
5) Acceptance criteria and test cases the Implementer and Integration Checker must satisfy (including at least one failure-simulation scenario that leaves no orphaned resources).

Limit the output to those artifacts only (do not implement code). Attach concise examples and the minimal set of operational checks the Implementer will require to implement safe, repeatable create-repo flows." 

---

Handoff complete. Provide this report verbatim to the next agent.
