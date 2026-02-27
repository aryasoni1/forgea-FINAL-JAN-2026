FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E13 Regression Safety
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md


TASKS CHECKED

- Implementer: add hooks to re-run verification and rebuild snapshots on edits.
- QA/Tester: validate regression checks and ensure old attempts remain valid.
- Integration Checker: ensure active user sessions are not broken by lab updates.


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md — Orchestrator output containing feature analysis (Regression Safety / Reliability), Risk Level (Medium), Touches HARD LOCK (No), required agents (Implementer, QA/Tester, Integration Checker), an execution plan with three sequential steps, copy-paste user prompts for each agent, and an orchestrator improvement note recommending a staging channel for lab updates.


WHAT IS PARTIALLY IMPLEMENTED

- The orchestrator output provides a clear execution plan and required agent roles.
- No implementation artifacts were observed in the orchestrator output: there are no workflow hooks, code, tests, or integration-check artifacts present in the reviewed source for this feature.


WHAT IS MISSING

- Implementer deliverables: code or workflow hooks that trigger verification re-runs and snapshot rebuilds on lab edits; APIs or event handlers to initiate these actions; instrumentation to verify previous attempts remain retrievable.
- QA/Test harness: deterministic tests demonstrating that edits trigger verification and snapshot rebuilds, and tests proving old attempts and proofs remain valid after updates.
- Integration Checker artifacts: validation scripts or runbooks showing that active user sessions are preserved during updates, staging/rollout procedures, and rollback behaviors.
- Any repository code, CI jobs, or automation that implements staging channel behavior for lab updates (not found in the orchestrator output reviewed here).


RISKS OR CONFLICTS

- Medium risk is explicitly declared in the orchestrator output.
- Potential for user disruption: without staging and careful rollout, live user sessions could be impacted by lab updates.
- Lack of implementation and tests present process risk: regression checks might be absent or incomplete until Implementer and QA deliverables exist.


QUESTIONS FOR CLARIFICATION

- None strictly required from repository truth. If desired, confirm which agent should start next (Implementer is the first step per execution plan).


NEXT AGENT HANDOFF PROMPT (MANDATORY)

Implementer (copy-paste-ready prompt):

"You are the Implementer assigned to EPIC-E feature E13 (Regression Safety). Use the repository code-scout report at docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13*Regression_Safety.md as the source of truth for context.

Implement a workflow that meets the following acceptance criteria (deliverables only):
- Triggering: edits to a lab must automatically trigger a verification re-run and a snapshot rebuild for that lab. Provide the code/hooks or workflow definition that performs these triggers.
- Preservation: previous attempts, proofs, and snapshots must remain retrievable and unmodified. Provide tests or a small verification script that demonstrates retrieval of prior attempts after an edit.
- Deterministic tests: include QA-facing tests that show edits reliably trigger verification and snapshot rebuilds (CI-friendly, deterministic).
- Integration concerns: describe any required coordination or API changes needed for the Integration Checker to verify live sessions are preserved; include any safe staging/rollout hooks (e.g., staging channel, feature-flagged rollout), and the minimal rollback behavior required if regressions are detected.
- Artifacts: submit the workflow code, the test files, and a short README describing how to run the tests and verify the coverage.

Do NOT run production migrations or modify published data during your implementation without explicit approval. Only implement the workflow and tests in code and describe any environment prerequisites in the README." 

[End of report]
