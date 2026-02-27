FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H12 — Audit & Observability
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md

### TASKS CHECKED

- Step 1: Planner-Architect defines required logs, metrics, and trace spans and their required cardinality.
- Step 2: Security-Sentinel reviews for sensitive data leakage in logs and metrics.
- Step 3: Implementer instruments the system with logs, metrics, and tracing; emits separate infra-failure logs.
- Step 4: QA-Tester (in H14) defines tests that verify metrics emission and log contents.
- Step 5: Documenter-Historian publishes observability guide and dashboard templates.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md — Contains feature analysis identifying required agents (planner-architect, implementer, qa-tester, documenter-historian, security-sentinel), execution plan (Steps 1–5), risk level (Medium), HARD LOCK annotation, and an orchestrator note recommending a canonical telemetry schema.

### WHAT IS PARTIALLY IMPLEMENTED

- Not found — The orchestrator output defines responsibilities and an execution plan but does not include any concrete telemetry schema, log/metric/span definitions, instrumentation code, test cases, or dashboard templates.

### WHAT IS MISSING

- A canonical telemetry schema (log fields, metric names, trace-span conventions) standardized for verification jobs.
- A prioritized list of lifecycle events to log and metrics to emit, with required cardinality and sampling expectations.
- Trace span boundaries and suggested tracing attributes for correlating verification jobs, LabSession, and Runner activities.
- Instrumentation implementation tasks and API hooks for emitting observability data.
- QA test cases and validation harnesses (to be created in H14) to assert metrics, logs, and traces are emitted correctly.
- Documentation artifacts: logs/metrics schema, dashboard templates, and runbook for incident investigation.
- Security review notes: explicit guidance for preventing sensitive data leakage in logs and metrics.

### RISKS OR CONFLICTS

- HARD LOCK: Observability changes touch a HARD LOCK and may be release-blocking if omitted or implemented incorrectly.
- Sensitive data leakage: Without explicit guidance, logs/traces may include secrets or PII.
- Incomplete telemetry: Missing cardinality and sampling rules could create blind spots or excessive cost.

### QUESTIONS FOR CLARIFICATION

- Not required / none.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Reference: This report (docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md) and the original orchestrator output at docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md

You are the planner-architect. Using only the facts recorded in this report and the orchestrator output, produce the following artifacts (no implementation):

- A canonical "Telemetry Schema" document that specifies:
  - Required log fields and examples for verification lifecycle events
  - Metric names, types (counter/gauge/histogram), and required cardinality/sampling guidance
  - Trace/span conventions and key attributes to correlate verification jobs with LabSession and Runner activity
  - Distinction between infra-failure logs and application-level logs and how they should be flagged

- A prioritized task breakdown for implementer, qa-tester, documenter-historian, and security-sentinel including deliverables:
  - Instrumentation tasks and API hooks for emitting logs, metrics, and traces
  - QA test plan items (to be executed in H14) that verify metric emission, trace correlations, and log content
  - Documentation tasks: logs/metrics schema, dashboard templates, and incident investigation runbook
  - Security review checklist to ensure logs/metrics/traces do not leak secrets or PII

- Operational notes outline (high-level bullets only) covering monitoring, alerting thresholds, and expected dashboards for verification job health and infra failures.

Constraints: Do not implement code or pick concrete libraries. Do not propose solutions beyond the scope of producing precise, implementable artifacts. Place outputs under `docs/tasks` or `docs/specs` and reference this code-scout report in the header.
