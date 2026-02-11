### FEATURE ANALYSIS

- Feature Type: security / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define branch protection policies and protected paths (including `forgea.config.json` and test dirs).
- Implementer — Apply branch protection via GitHub API, disable force-push and branch deletion, and enforce protected file paths.
- Security Sentinel — Validate that protections are applied strictly and cannot be bypassed.
- Integration Checker — Verify protection settings on created repos and attempt safe tests (non-destructive) to confirm enforcement.
- Documenter — Document protection policy and recovery steps.

### NOT REQUIRED AGENTS

- QA / Tester — Additional e2e testing optional; basic checks covered by Integration Checker.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define branch protection policy and list of locked file paths.
- Step 2: Implementer — Implement protection APIs: protect default branch, disable force-push, block deletion, and lock file paths.
- Step 3: Security Sentinel — Verify protections and attempt controlled bypass checks.
- Step 4: Integration Checker — Validate enforcement on sample repos and report any gaps.
- Step 5: Documenter — Publish policy and remediation steps.

### AGENT PROMPTS

- Planner:
"Define the default-branch protection policy: disable force-push, disallow branch deletion, prevent history rewrite, and enumerate file paths that must be locked (tests, `forgea.config.json`)."

- Implementer:
"Implement GitHub API calls to apply branch protection per the Planner's spec. Ensure protected file path enforcement and record applied policies in LabSession metadata."

- Security Sentinel:
"Review applied branch protections and perform controlled checks to ensure no write paths remain for protected files."

- Integration Checker:
"Confirm branch protection is active on newly-created lab repos and that attempts to modify locked paths are rejected."

- Documenter:
"Document branch protection rules, how to audit them, and steps to recover from accidental misconfiguration."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a reusable protection policy template agent for other epics that require guarded repo setups.
