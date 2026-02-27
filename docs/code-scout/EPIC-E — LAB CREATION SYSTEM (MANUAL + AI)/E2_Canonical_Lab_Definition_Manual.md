### FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E2_Canonical_Lab_Definition_Manual (Canonical Lab Definition v1)
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md

### TASKS CHECKED

- Draft canonical Lab schema v1 (Planner/Architect)
- Produce JSON Schema + human-readable spec (Documenter/Historian)
- Security review for secrets and unsafe fields (Security Sentinel)
- Implement validator harness and tests (QA/Tester)

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md: Agent Orchestrator output describing the feature analysis, required agents, execution plan, copy-paste user prompts for each required agent, and orchestrator improvement notes (including HARD LOCK note and suggestion for approval gate and schema versioning policy).

### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level planning and role assignment: the orchestrator file contains a clear execution plan and specific user prompts for the required agents. No concrete schema artefacts or implementation files are present in the repository for this feature.

### WHAT IS MISSING

- Canonical Lab schema v1 document (technical specification listing all fields, types, constraints, and rationale).
- Machine-readable JSON Schema (or equivalent) for validation.
- Human-readable spec / documentation derived from the schema with examples.
- Example valid and invalid lab definitions demonstrating edge cases.
- Security Sentinel review document identifying forbidden fields, validations, and risks (secrets, executable injection, config modification vectors).
- QA/Tester validator harness (code) that validates sample lab definitions against the schema and rejects invalid inputs.
- Approval gate and audit trail artifacts/policy required by HARD LOCK.
- Schema versioning policy and migration guide.
- CI integration or test entries that run schema validation as part of pipeline.

### RISKS OR CONFLICTS

- HIGH RISK: This feature "touches HARD LOCK" per the orchestrator notes. Committing a schema without an approval gate and audit trail would violate the stated policy.
- Security risk: Without an explicit security review, schema fields could allow secrets, executable content, or configuration changes that enable test manipulation or code execution.
- Versioning/conflict risk: No repository location, file naming convention, or migration policy found — potential for divergent schema versions and breaking changes.
- Missing CI/tests: Without a validator harness and CI integration, invalid or unsafe lab definitions could be accepted into systems.

### QUESTIONS FOR CLARIFICATION

- Where should canonical schema artifacts (spec, JSON Schema, examples) be stored in the repository? Who owns the HARD LOCK approval gate for this artifact?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Planner/Architect (first required agent per orchestrator)

Copy-paste-ready prompt for the Planner/Architect:

"You are the Planner/Architect for EPIC-E feature E2 (see this code-scout report at docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E2_Canonical_Lab_Definition_Manual.md). Using the Orchestrator output referenced therein, draft a canonical Lab schema v1. Deliverables:
- A technical schema specification listing required and optional fields (at minimum: id, version, difficulty, estimated_time, primary_concept, failure_type, success_criteria, allowed_paths, forbidden_paths), with explicit types, constraints, cardinality, and rationale for each field.
- A statement of how the schema supports deterministic verification and explicit versioning semantics (how `version` is used and compatibility rules).
- A short file-path recommendation for where to place canonical artefacts in the repo and suggested file names for: the human-readable spec, machine-readable JSON Schema, and example lab definitions.
- A concise list of validation rules that downstream Security Sentinel and QA/Tester agents must check (do not perform the review yourself — list what they must verify).

Constraints: Do not alter repository files yourself. Stay within the scope of drafting the schema and metadata. Do not implement validators or security fixes — those are subsequent agents' responsibilities.

Output format: produce a single markdown file containing the schema spec, rationale, versioning notes, and the recommended repo paths for the artifacts listed above. Also include a short list of 5 representative example lab definitions (names only) that the Documenter/Historian and QA/Tester should expand into full examples.

Reference: This request is based on the Orchestrator output referenced in the code-scout report. The next agents (Documenter/Historian, Security Sentinel, QA/Tester) will consume your schema spec.
"

Handoff complete. Provide this report verbatim to the next agent.
