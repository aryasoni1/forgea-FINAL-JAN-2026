## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E4 — Repo and Code Surface Rules
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E4_Repo_and_Code_Surface_Rules.md

### TASKS CHECKED

- Planner/Architect: Define base lab repository source and locked vs editable paths.
- Security Sentinel: Review path rules to prevent core IP exposure and forbidden edits.
- Implementer: Add enforcement tooling (lint, pre-commit, CI checks) to block forbidden edits.
- Integration Checker: Validate enforcement across monorepo workflows (scaffolding, CI pipelines).

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E4_Repo_and_Code_Surface_Rules.md — Agent Orchestrator output containing:
  - Feature analysis (Feature Type: Security / Repo Governance; Risk Level: High)
  - Required agents list (Planner/Architect, Security Sentinel, Implementer, Integration Checker)
  - Execution plan (sequential steps and parallel validation step)
  - Copy-paste user prompts for each required agent
  - Orchestrator improvement note recommending centralized path-policy service or shared linter plugin

### WHAT IS PARTIALLY IMPLEMENTED

- Not found: No implementation artifacts referenced in the orchestrator output were observed in this report. (No paths or files for lint rules, pre-commit hooks, CI job configs, or a central policy service were included in the orchestrator output.)

### WHAT IS MISSING

- Explicit location of the base lab repository/template (not specified in the orchestrator output).
- Implemented enforcement tooling: lint rule(s), pre-commit hook(s), and CI checks that fail on forbidden edits.
- A shared/centralized path-policy service or a shared linter plugin (only suggested in improvement notes).
- Validation results or integration test artifacts demonstrating enforcement across monorepo operations.

### RISKS OR CONFLICTS

- High-level risk noted in orchestrator output: repository governance for lab content is high-risk for exposing core IP if not enforced.
- Potential for divergence across packages if enforcement is implemented per-package rather than centrally (noted in orchestrator improvement notes).
- Orchestrator output does not include any concrete enforcement files or CI config, leaving a gap that could allow bypass routes (e.g., edits via tests, scaffolding scripts, or CI job configs) unless explicitly covered by the implementer.

### QUESTIONS FOR CLARIFICATION

- Which repository or path is the canonical base lab repo/template? (Required by Planner/Architect.)
- Are there existing CI pipelines or repo-level hook frameworks that must be used (e.g., an established monorepo CI job template or centralized hook runner)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Planner/Architect

Please act using this code-scout report as the authoritative source: docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E4_Repo_and_Code_Surface_Rules.md

Tasks (copy-paste-ready):
- Specify the absolute repository path or location of the base lab repository/template to be used as the canonical source for lab content.
- Produce a clear list of locked (non-editable) paths and editable user-surface paths for the lab repository. Use glob patterns where appropriate and indicate whether these rules apply per-package or repository-wide.
- Provide a forbidden-path policy expressed as globs (explicit examples), including patterns to forbid edits to core IP, test harnesses, CI/config files, and scaffolding scripts.
- Include explicit rules that distinguish core IP files from editable user surfaces (e.g., by file extension, directory, filename patterns, or special manifest markers).

Required outputs:
- A small manifest or policy document (file path and content) that lists the locked vs editable paths and forbidden globs.
- A short list of constraints or prerequisites the Implementer will need (e.g., required hook framework, expected CI job names, or repository maintenance contacts).

Reference this report for context and do not proceed beyond defining the repository source and path rules. Do not implement tooling — only specify the authoritative policy and its repository location.
