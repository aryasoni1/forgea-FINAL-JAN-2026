FEATURE CONTEXT
- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F3 — Lab Template Injection
- Source: docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md

TASKS CHECKED
- Planner / Architect: define template payload, locked paths, validation rules (listed in orchestrator output)
- Implementer: implement template injection and post-injection integrity checks
- Security Sentinel: review injected artifacts for secrets and enforce locks
- Integration Checker: validate injection on sandbox repos and run integrity checks
- Documenter: publish template spec and validation steps

WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md — Orchestrator output for this feature (source of this report).
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md — Related orchestrator guidance referencing protected paths and branch protection.
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md — Related orchestrator guidance enumerating locked paths and forbidden-change detection.
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F10_Step-Based_Lab_Support.md — References usage of `.forgea/steps.json` (related template surface).
- docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E9_forgea.config.json_Management.md — Contains `forgea.config.json` management notes and a blocker about canonical repo path for `forgea.config.json`.
- docs/official-docs-registry.md — Contains references to `forgea.config.json` Schema and locked-path manifest expectations.
- apps/forgea-admin UI references — UI form fields referencing a `baseRepoUrl` for lab templates (found in built frontend artifacts), indicating UI-level support for a base template URL.

WHAT IS PARTIALLY IMPLEMENTED
- `forgea.config.json` docs and schema references exist in docs/official-docs-registry.md and docs/docs-gatekeeper E9, but the canonical repository path where `forgea.config.json` must live is marked BLOCKER in E9 (not specified).
- Orchestrator outputs for related F-epic features (F5, F9, F10) define desired policies and checks, but they are guidance artifacts (plans), not implemented code.

WHAT IS MISSING
- Not found: a concrete base lab template repository or package (e.g., `packages/lab-templates/` or a `lab-template` repo) in source.
- Not found: implementation code that performs repository template injection via the GitHub App (no definite handler/source implementing file copy + path protection detected in source files).
- Not found: a machine-readable, published template manifest/schema file for injection payloads (the orchestrator suggests such a schema but I did not find an authoritative JSON schema artifact under `docs/official-docs` or `packages`).
- Not found: deterministic error code spec for rollback behavior (Implementer step requests deterministic error codes; none located).

RISKS OR CONFLICTS
- Documentation blocker: `E9_forgea.config.json_Management.md` explicitly marks the canonical repo path for `forgea.config.json` as a BLOCKER — unresolved design decision required before injection implementation.
- Overlap risk: Multiple EPICs reference `forgea.config.json` lifecycle and locked paths (EPIC-E and EPIC-F). Without clear ownership and canonical paths, implementers risk inconsistent behavior across features.
- Visibility risk: UI fields reference a `baseRepoUrl` but there is no discovered canonical template repository; user-facing flows may surface paths that don't exist.

QUESTIONS FOR CLARIFICATION
- Which agent is next (Planner or Implementer)? The orchestrator lists both; the Planner is step 1 in the execution plan.
- Confirm the canonical repository path for published `forgea.config.json` (repo root vs `/labs/<lab-id>/forgea.config.json`). This is currently marked BLOCKER in E9.

NEXT AGENT HANDOFF PROMPT (MANDATORY)
You are the Planner / Architect. Use this code-scout report at `docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F3_Lab_Template_Injection.md` as the factual source.
Do NOT implement code. Using only the repository truths recorded in that report, produce the following (copy-paste-ready outputs for the Implementer agent):
- A precise list of files to include in the lab template payload (paths and short purpose for each file: e.g., README.md — student instructions; tests/ — autograder tests; forgea.config.json — lab metadata; .forgea/ — runtime metadata).
- A definitive glob list of locked paths that must be protected post-injection (exact globs, e.g., `tests/**`, `forgea.config.json`, `.forgea/**`) and a short rationale for each glob.
- Integrity validation rules and failure criteria expressed as boolean checks (e.g., SHA256 checksum presence, presence of required files, no secrets regex matches) and the deterministic error codes to return for common failure modes (e.g., MISSING_FILE=1001, CHECKSUM_MISMATCH=1002, SECRET_LEAK=1003).
- Explicit canonical repository path recommendation for `forgea.config.json` (one of: repo root, `/labs/<lab-id>/forgea.config.json`, or other). If you cannot decide, mark as BLOCKER and list exactly what information you need from stakeholders.
- A concise list of required audit/log entries the Implementer must emit after injection (file list, checksums, protected-branch status, timestamp, injector identity).

Reference: this report documents that a base template repo and injection implementation were not found, and that `E9_forgea.config.json_Management.md` marks the canonical path as a blocker. Your outputs should be strictly deterministic, atomic, and constrained to design decisions (no code or implementation).

Handoff complete. Provide this report verbatim to the next agent.