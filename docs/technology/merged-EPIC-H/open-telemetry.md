# OpenTelemetry

- Category: Observability
- Epics: G, H, I
- Version / Requirement: 0.143.0
- Intent / Critical Decision: Standardized tracing; integrates with Datadog.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Define the exact telemetry fields and log attributes the verification harness must emit for symptom detection and debugging of lab failures.
- Important points:
  - Require canonical attributes in traces/logs such as `run.id`, `lab.id`, `commit`, `failure.type`, and `verifier.exit_code` to make aggregation and automatic failure classification reliable.
  - Define sampling and retention policies for verification traces and ensure traces are uploaded to an immutable audit store linked from verification reports.
  - Pin OpenTelemetry spec/version for agent libraries used in verifiers and document how tracestate/traceparent should be propagated by test harnesses.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Standardize telemetry (metrics/traces/logs) naming, sampling, and attributes for verification jobs and runners.
- Important points:
  - Define required metrics (`verification.jobs.started`, `verification.job.duration_ms`, `verification.queue.depth`, etc.) and low-cardinality label guidance.
  - Ensure traces propagate `lab_session_id`/`verification_job_id` and sample all ERROR/infra-failure traces while sampling successes at low rate.
  - Separate infra vs application telemetry and document retention/alert thresholds in EPIC-H runbooks.
