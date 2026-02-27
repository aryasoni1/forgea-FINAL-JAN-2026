# FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E5 — Step Based Lab Design (Optional)
- Source: Agent Orchestrator Output ([docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md](<docs/agent_orchestrator_output/EPIC-E%20—%20LAB%20CREATION%20SYSTEM%20(MANUAL%20+%20AI)/E5_Step_Based_Lab_Design_Optional.md>))

## TASKS CHECKED

- Step 1: Planner/Architect defines step model, allowed edits per step, and progression rules (sequential).
- Step 2: Implementer adds guardrails to enforce step order and prevent future-step edits (sequential).
- Step 3: QA/Tester verifies deterministic completion and prevents bypass (sequential).

## WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5_Step_Based_Lab_Design_Optional.md — Contains the feature analysis, required agents, execution plan (3 steps), copy-paste user prompts for Planner/Architect, Implementer, and QA/Tester, and an orchestrator improvement note recommending configurability.

## WHAT IS PARTIALLY IMPLEMENTED

- Not found: No planner/architect artifact (schema, model, or design doc) implementing a `step` model was observed in the repository.
- Not found: No enforcement implementation (CI rule, linter, pre-commit hook, server-side guard) that prevents edits to files belonging to future steps was observed.
- Not found: No QA/tests demonstrating deterministic step progression or prevention of future-step edits were observed.

(If these artifacts exist elsewhere, they were not found during this scan and should be referenced explicitly.)

## WHAT IS MISSING

- A formal step metadata schema or design document describing: step IDs, ordering rules, file-path bindings per step, progression conditions, and opt-in configuration per lab.
- Enforcement mechanisms (CI/linter/pre-commit or server-side checks) that block edits to files pledged to future steps and migration guidance for step changes.
- Automated tests or QA harness verifying sequential progression, non-bypassability, and deterministic completion detection.
- Documentation for how to opt a lab into the step-based workflow and how to change step bindings safely.

## RISKS OR CONFLICTS

- No code-level implementation of the feature was found in the repository; therefore there is no risk of conflicting enforcement being present.
- The orchestrator note to make enforcement configurable implies a requirement to avoid hard-coded rules; no implementation was present to confirm adherence to that constraint.

## QUESTIONS FOR CLARIFICATION

- None strictly required to proceed with the Planner/Architect task. If the Planner/Architect needs constraints (e.g., file-binding naming conventions, CI provider restrictions, or permitted languages), please supply them.

## NEXT AGENT HANDOFF PROMPT (MANDATORY)

Planner/Architect — copy-paste-ready prompt for the next agent:

"You are the Planner/Architect assigned to implement feature E5 (Step Based Lab Design - Optional). Use this repository report at docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E5\*Step_Based_Lab_Design_Optional.md as the authoritative findings.

Your task: Define a complete step model specification for labs that includes:

- Step metadata fields (IDs, titles, descriptions, required artifacts, optional metadata).
- Ordering rules and progression semantics (sequential requirements, conditional branching if allowed, completion criteria).
- File-path binding conventions (how files are pledged to steps, matching rules, and canonical locations).
- Constraints and invariants to prevent editing future-step files (what must be true for enforcement to act) and any migration rules for changing step bindings.
- Configurability options so the feature can be opt-in per lab (flags, toggles, or lab-level config fields).

Deliverables (machine-usable preferred):

- A JSON Schema or TypeScript interface describing the step metadata and lab config.
- Example mappings and a worked example for a 3-step lab (file bindings and progression flow) placed under a recommended path in the repo.
- A short list of required enforcement touchpoints (CI checks, pre-commit hooks, server-side validation points) but do NOT implement them — only list where they should integrate and what inputs they will need.

Constraints: Reference this code-scout report and do not implement code. Keep recommendations technology-agnostic where feasible and avoid prescribing specific CI vendors. Output the schema and examples in the repository-relative paths where you expect implementers to pick them up."

Handoff complete. Provide this report verbatim to the next agent.
