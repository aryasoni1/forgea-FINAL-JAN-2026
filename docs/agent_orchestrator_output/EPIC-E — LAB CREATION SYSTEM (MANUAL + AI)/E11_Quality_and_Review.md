### FEATURE ANALYSIS

- Feature Type: Quality / Review
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- Planner/Architect — Define manual review checkpoints and quality criteria.
- QA/Tester — Validate solvability within estimated time and difficulty alignment.
- Documenter/Historian — Produce reviewer checklist and guidance.
- Security Sentinel — Ensure reviews guard against leaks and unsafe lab content.

### NOT REQUIRED AGENTS

- Integration Checker — Not required for review policy drafting.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect drafts review gates, criteria for solvability, difficulty checks, and clarity guidelines (sequential).
- Step 2: Documenter produces reviewer checklist and example reviews (sequential).
- Step 3 (parallel): QA/Tester runs solvability experiments; Security Sentinel audits for unsafe content (parallel).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define a manual review workflow for lab publish: required checkpoints, pass/fail criteria (solvability, estimated time accuracy, concept focus), and reviewer roles/permissions."

- Documenter/Historian:
"Create a concise reviewer checklist with examples of acceptable and rejected labs, and a template review report."

- QA/Tester:
"Validate a sample of labs against the review checklist by timing solves and verifying difficulty alignment. Report discrepancies."

- Security Sentinel:
"Audit the review checklist and sample labs for potential secrets, data-exfiltration vectors, or unsafe test modifications."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a required sign-off field to published lab metadata capturing reviewer identity and timestamp.
