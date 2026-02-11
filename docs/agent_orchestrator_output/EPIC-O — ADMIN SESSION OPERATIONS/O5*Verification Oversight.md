### FEATURE ANALYSIS

- Feature Type: Monitoring / Job oversight
- Risk Level: Medium-High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define verification job observability surface, error summaries, correlation keys, and detection heuristics for stuck/long-running jobs.
- integration-checker — Ensure verification job metadata is consistently propagated across services for correlation.
- implementer — Implement status endpoints, job correlation, and long-running detection hooks.
- qa-tester — Validate detection heuristics, error summaries, and correct correlation of attempts with verification jobs.
- security-sentinel — Review for any paths that could allow admins to interfere with job outcomes or inject misleading status.

### NOT REQUIRED AGENTS

- documenter-historian — Not required at initial implementation; include if admin-facing guides are requested later.
- forgea-code-scout — Not required for orchestrator selection.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner specifies observability contract: job states, required fields, error summary format, and detection thresholds for stuck/long jobs.
- Step 2: Integration Checker verifies cross-service propagation of job IDs and telemetry. (Sequential)
- Step 3: Implementer implements the oversight UI endpoints and background detectors. (Sequential)
- Step 4: Security Sentinel reviews for injection/misreporting risks. (Parallel with QA)
- Step 5: QA validates correlation of attempts and jobs, error summaries, and detection behavior. (Sequential)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Create a task document for O5 — Verification Oversight. Include required job status fields, correlation keys to attempts, error-summary formatting, and detection rules for stuck or long-running jobs. Define thresholds and observable metrics."

- integration-checker:
"Confirm that verification job IDs, statuses, and timestamps are propagated reliably between verification service and admin-session service. Report any missing fields or race conditions."

- implementer:
"Implement O5 per the approved task doc, adding status endpoints, job-correlations, and detectors. Provide `/docs/manual-checks/task-O5-manual-checks.md` and `/docs/guides/task-O5-how-to.md` if requested."

- security-sentinel:
"Review O5 implementation plan for any paths allowing admins to alter job outcomes or inject false job statuses. Flag and block if found."

- qa-tester:
"Validate O5: error summary clarity, correct job-attempt correlation, and reliable detection of stuck jobs under simulated conditions."

### ORCHESTRATOR IMPROVEMENT NOTES

- Require Planner to include example payloads for each verification job state to speed up implementer/QA work.
