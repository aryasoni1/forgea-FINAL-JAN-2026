### FEATURE ANALYSIS

- Feature Type: code / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Specify template contents, locked paths, and validation rules.
- Implementer — Implement template injection (files, README, `forgea.config.json`, `.forgea/`), and post-injection integrity checks.
- Security Sentinel — Ensure injected content does not expose secrets and that locked files are applied with correct permissions.
- Integration Checker — Validate injection on created repos and run integrity checks.
- Documenter — Document template format and integrity verification steps.

### NOT REQUIRED AGENTS

- QA / Tester — Optional; bulk validation can be part of Integration Checker.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define the template payload, locked file list, and integrity validation criteria.
- Step 2: Implementer — Implement file injection via the GitHub App and add integrity validation post-injection.
- Step 3: Security Sentinel — Review injected artifacts for sensitive data leakage and ensure locking is enforced.
- Step 4: Integration Checker — Validate injection on a test repo and run integrity checks.
- Step 5: Documenter — Publish template spec, locked-paths list, and validation steps.

### AGENT PROMPTS

- Planner:
"Define the lab template payload: files to inject (README, tests, `forgea.config.json`, `.forgea/`), and list of locked paths. Provide integrity validation rules and failure criteria."

- Implementer:
"Implement repository template injection for a newly-created lab repo via the GitHub App: copy files, set protected paths, and run post-injection integrity validation. Return deterministic error codes for rollback."

- Security Sentinel:
"Review the template injection process for secret leakage and confirm locked test files cannot be modified by students."

- Integration Checker:
"Run end-to-end injection into a sandbox repo and validate all files are present, locked paths enforced, and integrity checks pass."

- Documenter:
"Document template file formats, locked-path rules, and how to validate template integrity after injection."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a reusable template schema (JSON Schema) and a Template Validator agent to standardize checks across epics.
