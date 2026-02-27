## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F9_Forbidden_Change_Detection
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md


### TASKS CHECKED

- Planner: Enumerate locked paths and define violation semantics (Execution Plan Step 1)
- Implementer: Detect deletions/modifications of locked files and force-push attempts (Execution Plan Step 2)
- Security Sentinel: Review detection rules to reduce false positives (Execution Plan Step 3)
- QA / Tester: Create tests that modify locked paths and verify deterministic failure handling (Execution Plan Step 4)
- Integration Checker: Validate detection on real pushes and edge cases (Execution Plan Step 5)
- Documenter: Publish violation rules and remediation steps (Execution Plan Step 6)


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md — Contains feature analysis, required agents, execution plan, agent prompts, and orchestrator improvement notes.


### WHAT IS PARTIALLY IMPLEMENTED

- High-level execution plan and agent responsibilities are documented in the orchestrator output (see Source above). Detection requirements and test scenarios are specified conceptually but remain unimplemented.


### WHAT IS MISSING

- Not found: Implementation code or automation to perform forbidden-change detection during webhook push processing (no scanner, webhook handler, or enforcement code present).
- Not found: Concrete list of locked/forbidden paths in source (the orchestrator suggests examples like tests, `forgea.config.json`, and `.forgea/`, but no canonical file enumerating them was discovered).
- Not found: Audit records or storage design for recording violations and evidence.
- Not found: Integration tests or CI automation that simulate deletions, modifications, renames, and force-push scenarios.
- Not found: Operational remediation/runbooks for operators to follow after a violation is detected.


### RISKS OR CONFLICTS

- The feature is marked High risk in the orchestrator output. Without implementation, there's a risk that critical locked files might be modified inadvertently or maliciously.
- No conflicting implementations or rules were found in the repository; however, absence of a centralized "Violation Engine" may lead to duplicated or inconsistent detection logic across services.


### QUESTIONS FOR CLARIFICATION

- Not found: A canonical, repo-scoped list of locked paths to enforce. If the Planner agent needs this list, request explicit enumeration of paths and target repositories.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the Planner agent. Use this report at docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md as your source of truth.

Task: Define the forbidden paths and precise violation semantics required to implement "F9_Forbidden_Change_Detection".

Inputs you must use (do not invent additional deliverables):
- The Agent Orchestrator output summarized in this report (Source above).

Deliverables (explicit, factual, and limited to planning scope):
- Provide an exact, repo-scoped list of forbidden/locked paths (explicit file paths and directory patterns). If multiple repos are in-scope, list per-repo.
- Define violation semantics: what constitutes a violation (deletion, modification, rename, force-push), severity levels, and whether violations cause immediate LabSession FAILURE.
- Specify edge-case handling: renames, subtree moves, path case changes, binary vs text diffs, and how to treat large ref changes (force-pushes) deterministically.
- Define required evidence to record on violation (minimum: affected path(s), commit SHAs before/after, actor ID, push metadata, timestamp) and where this evidence must be stored.
- State test scenarios the Implementer and QA must cover (explicit push permutations and expected outcomes for each).

Constraints: Do not implement code or prescribe specific libraries or endpoints. Produce a deterministic, testable specification that an Implementer agent can convert into enforcement code and tests.

Reference this code-scout report in your deliverable and clearly label each item so the Implementer can act without further interpretation.
