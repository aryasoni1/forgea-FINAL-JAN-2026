## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E9 — forgea.config.json Management
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md

### TASKS CHECKED

- Planner/Architect: Define required `forgea.config.json` fields, validation rules, and lock semantics.
- Implementer: Implement generation, validation, and enforcement (reject execution on mismatch).
- QA/Tester: Test validation and lock behavior across publish flows.
- Documenter/Historian: Document config fields and publish locking policy.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md — Agent Orchestrator output containing:
  - Feature analysis (Feature Type: Config Management / Policy; Risk Level: Medium)
  - Note: Touches HARD LOCK: Yes (forgea.config.json lock-after-publish)
  - Required agents list (Planner/Architect, Implementer, QA/Tester, Documenter/Historian)
  - Execution plan (sequential steps: spec -> implement -> test)
  - Copy-paste user prompts for each required agent
  - Improvement note recommending embedding a machine-readable signature in locked configs

### WHAT IS PARTIALLY IMPLEMENTED

- Not found: No schema files, validation code, generator scripts, or lock-enforcement artifacts are present in the orchestrator output. The orchestrator output is only a plan and does not include implementation artifacts.

### WHAT IS MISSING

- The authoritative `forgea.config.json` schema (JSON Schema or equivalent).
- Implementation artifacts: config generation scripts, runtime validation code, and lock-enforcement logic.
- CI/tests demonstrating validation failures, successful activation, and lock enforcement post-publish.
- Explicit repository path where the canonical `forgea.config.json` for a lab should live.
- Machine-readable signature or verification artifact for locked configs (only recommended, not provided).

### RISKS OR CONFLICTS

- The orchestrator explicitly marks this feature as touching HARD LOCK. Without a clear schema and safe lock semantics, there is risk of irreversible state or inability to patch configs after publish.
- Missing verification artifacts or signature schemes can make locks vulnerable to tampering or create operational friction when legitimate fixes are required.
- Lack of defined enforcement boundaries (which systems must reject execution) could lead to inconsistent behavior across runtime, CI, and tooling.

### QUESTIONS FOR CLARIFICATION

- Where should the canonical `forgea.config.json` live in the repo (repository/path) for published labs?
- After a config is locked post-publish, are administrative override flows expected (and if so, what approvals are required)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Planner/Architect

Please use this code-scout report as the authoritative source: docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md

Tasks (copy-paste-ready):
- Define a machine-readable `forgea.config.json` schema for labs. Specify required fields, types, allowed values, and example documents.
- Define validation rules that must be checked before activation/activation-time (list concrete checks, error messages, and whether checks are strict or advisory).
- Define lock lifecycle and semantics for `forgea.config.json` (states such as draft/published/locked), what operations are allowed in each state, and what triggers a transition to locked.
- Specify whether locked configs must include a machine-readable signature (yes/no) and, if yes, the expected signature format and verification prerequisites.
- Provide the canonical repository path or manifest location where the approved `forgea.config.json` for a lab will reside.

Required outputs:
- A schema file path and content (e.g., JSON Schema or equivalent) and two example `forgea.config.json` documents (one draft, one published/locked).
- A short validation checklist with exact checks and failure/error behavior for implementers to enforce.
- A clear lock lifecycle document describing states, transitions, triggers, and any required administrative override process.
- Any prerequisites or constraints the Implementer will need (e.g., supported signature algorithms, CI job names, or required runtime hooks).

Reference this report for context. Do not implement tooling — only define the authoritative schema, validation rules, lock lifecycle, and canonical repository location for the config.
