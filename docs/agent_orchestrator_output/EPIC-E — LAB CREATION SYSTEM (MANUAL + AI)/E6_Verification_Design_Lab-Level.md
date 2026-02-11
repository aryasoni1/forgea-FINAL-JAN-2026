### FEATURE ANALYSIS

- Feature Type: Verification / Testing
- Risk Level: High
- Touches HARD LOCK: Yes (verification binds to lab immutability)

### REQUIRED AGENTS

- Planner/Architect — Define verification strategies, entry command, pass/fail criteria, and forbidden solution patterns.
- Implementer — Implement verification entrypoint, deterministic harness, and binding to commit SHA.
- QA/Tester — Build and run deterministic verification tests and ensure non-bypassability.
- Security Sentinel — Ensure verification cannot be exploited to exfiltrate secrets or run side effects.

### NOT REQUIRED AGENTS

- Documenter/Historian — Documentation after verification design stabilizes.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect drafts verification strategy, entry command, and explicit pass/fail criteria (sequential).
- Step 2: Implementer implements the verification harness and binds runs to commit SHA (sequential).
- Step 3 (parallel): QA/Tester executes determinism tests; Security Sentinel audits for unsafe operations (parallel).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Specify verification strategies (unit tests, runtime checks, diff-based), the verification entry command, clear pass/fail rules, and forbidden solution patterns. Define how to bind verification to a commit SHA."

- Implementer:
"Implement a verification entrypoint matching the design, make runs deterministic, and ensure the verifier fails loudly on forbidden patterns."

- QA/Tester:
"Run deterministic verification on sample labs, attempt bypasses, and report any nondeterminism or bypass paths."

- Security Sentinel:
"Audit the verification harness for commands that could access secrets, network exfiltration, or mutate persistent state."

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a verification sandbox runner and a small policy engine to reject forbidden solution patterns automatically.
