### FEATURE ANALYSIS

- Feature Type: code / infra
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify exact checkout rules, commit integrity verification steps, and locked-file protections.
- implementer — Implement checkout logic (exact commit SHA), working directory preparation, and injection of verification config.
- security-sentinel — Ensure commit integrity verification is robust against tampering and ensure locked files cannot be mutated by the runner.

### NOT REQUIRED AGENTS

- qa-tester — Reason: Test scenarios are encompassed in later validation feature H14.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none

### EXECUTION PLAN

- Step 1: Planner-Architect writes the precise checkout and integrity verification specification (including hash checks and where to store immutable references).
- Step 2: Security-Sentinel reviews checks for tamper resistance and replay attacks.
- Step 3: Implementer implements checkout logic, sets up working directory, injects verification config, and enforces locked-file protection.
- Step 4: Documenter-Historian (optional) captures the operational steps for debugging and audit.

(Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a standard small library for safe checkout-by-SHA (checks + sandbox staging) to be reused across verification features.
- Add a short checklist that Implementer must follow to mark checkout as atomic and auditable.
