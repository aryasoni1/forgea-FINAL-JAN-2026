FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F10 — Step-Based Lab Support
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md

TASKS CHECKED
- Planner: Define `.forgea/steps.json` schema, mapping rules, and blocking criteria.
- Implementer: Load step definitions, map changed files to active steps, block progress on incorrect modifications, persist step completion state.
- QA / Tester: Validate mapping heuristics and progression/rollback behavior.
- Integration Checker: Run end-to-end flows to ensure steps persist and progress is recorded.
- Documenter: Publish authoring guidelines for `.forgea/steps.json`.

WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md — Contains feature analysis, required agents, execution plan, per-agent prompts, and orchestrator improvement note (suggesting a reusable Step Engine agent).

WHAT IS PARTIALLY IMPLEMENTED
- Not found: No repository artifacts implementing the Step Engine or `.forgea/steps.json` schema were observed in the orchestrator output. The agent prompts and execution plan are present but there are no loader/mapping services, tests, or docs in source files referenced by the orchestrator output.

WHAT IS MISSING
- Schema: A canonical `.forgea/steps.json` schema (machine-readable JSON/YAML) defining steps, file-glob mappings, ordering, and blocking rules.
- Implementer artifacts: runtime loader, changed-file → step mapper, validation logic, and persistence for per-LabSession completion state.
- Tests: QA test suites for correct-step and out-of-order pushes, idempotency, and rollback behavior.
- Integration flows: end-to-end staging scenarios and automation to validate step persistence across pushes.
- Documentation: authoring guide, examples, and troubleshooting for `.forgea/steps.json` authors.

RISKS OR CONFLICTS
- Risk level: Medium (as stated in orchestrator output).
- Hard lock: No (the orchestrator notes "Touches HARD LOCK: No").
- Ambiguity observed: storage location and format for step completion state (LabSession metadata vs repository state) is unspecified; blocking enforcement location (server-side gate vs GitHub-side protections) is not defined.

QUESTIONS FOR CLARIFICATION
- Where should step completion state be persisted: in LabSession metadata, in the repository, or both?
- Should blocking of out-of-order changes be enforced server-side (CI/webhook) or via repository protections/tooling? Clarify expected enforcement surface.

NEXT AGENT HANDOFF PROMPT (MANDATORY)
This prompt is for the next agent: Planner. Use the findings in this code-scout report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md) as the source of truth.

Planner prompt (copy-paste-ready):

You are the Planner / Architect for Feature F10 — Step-Based Lab Support. Based on the attached code-scout report (docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md), produce a definitive specification (do not implement) that includes all of the following:

- A complete `.forgea/steps.json` schema: fields, types, ordering, how steps reference files (glob patterns), examples for common step types, and validation rules.
- Mapping rules: how changed files from a push map to an active step (single-step vs multi-file changes), and heuristics for ambiguous mappings.
- Blocking criteria: explicit rules describing when a push should be blocked (out-of-order changes), and exact conditions for allowing/denying progress.
- Persistence contract: where and how step completion state is stored (LabSession metadata keys and data types, repo-side artifacts if any), including required fields for the Implementer to record.
- Required outputs for the Implementer: a machine-readable schema file (JSON/YAML example), a clear list of API/webhook permissions or scopes required, and a concise acceptance checklist for QA/Integration Checker to validate step flows.
- Acceptance checklist: specific verification steps for QA and Integration Checker (examples: simulate correct-step and out-of-order pushes, verify state persistence across pushes, verify idempotency of marking a step complete).
- Constraints and notes: any limitations (e.g., handling large file sets, performance concerns, Git provider limitations), and whether blocking must be atomic per-push.

Reference: This code-scout report found no existing implementation artifacts in the repo and flagged missing schema, implementation code, tests, integration flows, and authoring docs. Provide the schema and mapping rules as machine-readable templates where possible.

Handoff complete. Provide this report verbatim to the next agent.