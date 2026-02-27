FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E1 — Base SaaS and Template Setup
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md

TASKS CHECKED

- Planner/Architect: produce template spec, list editable/locked surfaces
- Implementer: scaffold base SaaS template and cloning mechanism
- Integration Checker: validate CI/build for template clones
- Documenter/Historian: create README describing editable vs locked surfaces

WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md — Orchestrator output file present. Contains feature analysis, required agents, execution plan, and copy-paste user prompts for required agents.
- docs/tasks/master_tasks_V1/MASTER EPICS MAP.MD — references `packages/lab-templates/**` in the master tasks map.
- docs/tasks/master_tasks_V1/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI).md — references `packages/lab-templates/**` in the EPIC-E task file.
- forgea-monorepo/apps/forgea-admin (UI files) — contains a form field placeholder labeled "Base Repository URL" with example `https://github.com/forgea/lab-template` (indicator that UI expects a base template repository).

WHAT IS PARTIALLY IMPLEMENTED

- The orchestrator output provides a complete execution plan and agent prompts (design-level artifacts), but no code or scaffold artifacts implementing the plan were found.
- Documentation references (`packages/lab-templates/**`) exist, but the actual `packages/lab-templates` package or template repository was not found in the workspace.

WHAT IS MISSING

- `packages/lab-templates/` directory containing a base SaaS lab template scaffold (not found).
- A cloning script or cloning mechanism (script/CLI) to create new labs from the template (not found).
- A minimal verification/entrypoint under the template (test or command to validate a cloned lab) (not found).
- CI/pipeline config and integration checks for template clones (no pipeline changes or validation steps observed).
- A README for the template describing editable vs locked surfaces and clone instructions (not found).
- Explicit markers or configuration files that define immutable/locked paths inside the template (not found).
- A template linter or enforcement tooling for editable/locked path rules (not found).

RISKS OR CONFLICTS

- Documentation and UI expect a base template repository (placeholder URL and docs references), but no actual template package or scaffold exists in the repo — risk of mismatch between docs and implementation.
- No code-level artifacts that declare immutable or locked surfaces were observed; without those, implementers may disagree on what must remain immutable.

QUESTIONS FOR CLARIFICATION

- None strictly required to continue; implementers will need the Planner/Architect output to proceed.

NEXT AGENT HANDOFF PROMPT (FOR PLANNER/ARCHITECT)

You are the Planner/Architect. Use this code-scout report at `docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E1_Base_SaaS_and_Template_Setup.md` as the factual source. Produce a concise design doc for the base SaaS lab template that includes all of the following as a bullet list and a technical checklist (no implementation):

- A proposed directory layout for the template (top-level paths and purpose for each).
- A precise list of paths that must be immutable/locked and the rationale for each.
- A precise list of allowed editable surfaces and examples of typical editable files.
- Minimal runtime and verification hooks required in the template (commands, tests, sample verification output format).
- A cloning strategy suitable for the monorepo (how to clone the template into `packages/` or create a new lab package, required metadata files, and clone-time replacements).
- Expected outputs the Implementer must produce (file list, scripts, README), and a short verification checklist the Integration Checker can run.

Reference the factual findings in the attached code-scout report and do not implement code. Return the design doc as a compact bullet list plus a one-line checklist of required deliverables for the Implementer.

“Handoff complete. Provide this report verbatim to the next agent.”
