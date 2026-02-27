FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H12 — Audit & Observability
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Telemetry & Tracing (OpenTelemetry or equivalent)
  - Concept: Canonical tracing/span schema and SDK guidance
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Standardizes trace/span attributes, sampling semantics, and interoperability with observability backends.
  - What decision it informs: Trace attribute naming, sampling defaults, and vendor export formats.
  - What breaks without it: Inconsistent traces, broken correlation across services, and incorrect sampling leading to blindspots.

- Technology: Logging best-practices & structured logs
  - Concept: Structured log field guidance (timestamp format, severity, stable keys)
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures logs are machine-parseable and safe (no PII) and that cardinality is controlled.
  - What decision it informs: Canonical log fields and allowed field cardinality.
  - What breaks without it: High-cardinality logs, secrets in logs, and unusable log pipelines.

- Technology: Metrics naming & ingestion conventions
  - Concept: Metric name, unit, label cardinality, and histogram bucket guidance
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: To define counters/gauges/histograms used by alerts and dashboards consistently.
  - What decision it informs: Metric names, which labels are allowed, and aggregation expectations.
  - What breaks without it: Incompatible dashboards, noisy metrics with cardinality explosion.

- Technology: Data protection & logging PII guidance
  - Concept: Rules for preventing secrets/PII in telemetry
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Protects user data and ensures telemetry complies with privacy/legal requirements.
  - What decision it informs: Field redaction, sampling of sensitive traces, and access controls for logs.
  - What breaks without it: Regulatory exposure and secret/PII leakage in logs/traces.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - No canonical telemetry schema (logs/metrics/traces) present.
    - No required metric names/types or sampling guidance.
    - No test plan for verifying telemetry emission and correlations.
    - No dashboards, alert thresholds, or incident runbook.

- Doc path: /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - Identifies need for canonical telemetry schema but does not provide concrete fields or enforcement checklist.

---

**DOCUMENTATION COVERAGE DECISION**

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend/create:
  - `/docs/official-docs/EPIC-H/telemetry_schema.md` — canonical logs/metrics/traces schema and examples.
  - `/docs/official-docs/EPIC-H/observability_instrumentation_api.md` — API hooks and instrumentation best-practices for implementers.
  - `/docs/official-docs/EPIC-H/telemetry_alerts_and_dashboards.md` — dashboard templates and alert thresholds.
  - `/docs/official-docs/EPIC-H/telemetry_security.md` — security checklist preventing PII/secrets leakage.
  - `/docs/official-docs/EPIC-H/observability_runbook.md` — incident investigation and telemetry verification runbook.

---

### TELEMETRY SCHEMA (CANONICAL)

- Log fields (required):
  - `timestamp` (ISO8601)
  - `severity` (enum: DEBUG/INFO/WARN/ERROR)
  - `service` (string)
  - `component` (string)
  - `lab_session_id` (string, when applicable)
  - `verification_job_id` (string, when applicable)
  - `worker_id` (string)
  - `event` (string, short event name)
  - `message` (string)
  - `correlation_id` (string)
  - `trace_id` (string, optional)
  - `span_id` (string, optional)
  - `error_code` (string, optional)
  - `error_details` (object, optional — sanitized)
  - `infra` (boolean) — true when this is an infra-failure log
  - `sensitivity` (enum: LOW/MEDIUM/HIGH) — used by security tooling
  - `redaction_applied` (boolean)

- Log examples:
  - Verification started (INFO): includes `lab_session_id`, `verification_job_id`, `worker_id`, `event: verification.started`.
  - Verification completed (INFO): `event: verification.completed`, `duration_ms`, `outcome`.
  - Worker OOM / infra failure (ERROR): `infra: true`, error details sanitized.

- Metric names & types (required):
  - `verification.jobs.started` (counter) — increment per job started.
  - `verification.jobs.completed` (counter) — increment per job completed (label `outcome=PASS|FAIL|ERROR`).
  - `verification.job.duration_ms` (histogram) — duration distribution for successful jobs.
  - `verification.jobs.inflight` (gauge) — current active jobs.
  - `verification.queue.depth` (gauge) — current queue depth.
  - `verification.retry.count` (counter) — retry attempts.
  - `verification.dlq.count` (counter) — moved to DLQ.
  - `telemetry.traces.sample_rate` (gauge) — effective trace sampling rate.
  - `telemetry.log.redaction_rate` (gauge) — proportion of logs redacted.
  - `telemetry.lock.contention_count` (counter) — lock acquisition contention events.
  - `telemetry.artifact.truncation_rate` (counter) — truncation events.

- Metric cardinality & labeling guidance:
  - Labels allowed: `service`, `component`, `outcome` (low-cardinality), `region`.
  - Avoid using `lab_session_id` or other high-cardinality identifiers as metric labels; instead use in logs/traces only.
  - Required cardinality: system-wide counters must be low-cardinality; histograms may include `service`.

- Tracing & span conventions:
  - Root span: `verification.job` with attributes: `lab_session_id`, `verification_job_id`, `worker_id`, `attempt`, `queue_latency_ms`.
  - Child spans:
    - `runner.execute` — covers runner execution.
    - `artifact.ingest` — artifact storage and hashing.
    - `lock.acquire` / `lock.release` — lock operations with `acquire_latency_ms` and `owner`.
    - `queue.dequeue` — dequeue timing and visibility.
  - Traces MUST propagate `trace_id` and `correlation_id` to logs for easy correlation.
  - Sampling guidance: default low sampling (e.g., 1%) for success paths; sample all ERROR and infra-failure traces.

- Distinction: infra-failure vs application logs:
  - Infra-failure logs: set `infra: true`; include infrastructure metadata and sanitized error details.
  - Application logs: `infra: false` (or omitted); may contain domain events but must not include secrets.
  - Instrumentation must ensure infra logs are routed to separate index/retention settings and flagged in dashboards.

---

### IMPLEMENTER / QA / DOC / SECURITY TASK BREAKDOWN (PRIORITIZED)

1) Telemetry Schema doc (highest priority)
   - Deliverable: `/docs/official-docs/EPIC-H/telemetry_schema.md` containing canonical log fields, metric names/types, trace/span conventions, and examples.

2) Instrumentation API & hooks (implementer)
   - Deliverable: `/docs/official-docs/EPIC-H/observability_instrumentation_api.md`
   - Must include: `emitLog(fields)`, `incrementCounter(name, labels)`, `observeHistogram(name, value, labels)`, `startSpan(name, attrs)`, `endSpan()` signatures and required attributes.

3) Metric & alert definitions (implementer + doc-historian)
   - Deliverable: `/docs/official-docs/EPIC-H/telemetry_alerts_and_dashboards.md`
   - Must include: recommended dashboards, critical alerts (failure_rate, queue_depth, dlq_growth, lock_contention), and suggested thresholds (placeholder values to be pinned after baseline).

4) QA test plan (qa-tester)
   - Deliverable: `/docs/official-docs/EPIC-H/observability_qa_checks.md`
   - Tests:
     - Assert `verification.jobs.started` and `verification.jobs.completed` counters increment correctly for end-to-end jobs.
     - Verify `verification.job.duration_ms` histogram receives observations.
     - Confirm traces contain `lab_session_id` and correlation with logs by `trace_id`.
     - Ensure ERROR and infra-failure traces are always sampled.
     - Validate that metrics do not contain high-cardinality labels like `lab_session_id`.

5) Security review checklist (security-sentinel)
   - Deliverable: `/docs/official-docs/EPIC-H/telemetry_security.md`
   - Items:
     - Verify no secrets/PII fields are logged; confirm redaction tooling covers common patterns.
     - Validate trace/log sampling rules to avoid exposing sensitive data at scale.
     - Confirm RBAC for telemetry access and retention policies.

6) Observability runbook & incident playbooks (doc-historian)
   - Deliverable: `/docs/official-docs/EPIC-H/observability_runbook.md`
   - Must include: how to use telemetry to investigate slow/failing verifications, lock-contention debugging steps, and how to validate DLQ growth causes.

7) Implementation checklist & rollout
   - Implement telemetry instrumentation behind a feature flag; run QA checks in staging and verify dashboards before production rollout.

---

### OPERATIONAL NOTES (HIGH-LEVEL)

- Monitoring & alerts (examples):
  - Alert: `failure_rate > X%` over 5m → P1.
  - Alert: `queue_depth > Y` → scale workers or investigate enqueue storm.
  - Alert: `dlq_growth` sustained → immediate investigation.
  - Alert: `lock_contention_count` increase → possible lock-store issues.
- Dashboards:
  - Verification Health: success/fail counts, latency distribution, inflight jobs.
  - Queue Health: enqueue rate, depth, dequeue latency, DLQ.
  - Worker Health: active workers, OOMs, infra-failures.
  - Security: redaction rate, telemetry access logs.
- Expected baselines and sample thresholds must be established during staging runs and pinned in `/docs/official-docs/EPIC-H/telemetry_alerts_and_dashboards.md`.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Exact sampling rates (default and on-error) are not specified.
- Retention windows and storage tiers for logs, metrics, and traces are not pinned.
- Which telemetry vendor/export format will be chosen (affects SDK choices) is unspecified.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H12 — Audit & Observability
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md
- Status: ADDED (EXTEND)
- Reason: Gatekeeper brief defining telemetry schema, instrumentation API, QA checks, dashboards, and security requirements.

---

Reference: see `/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md` and `/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H12_Audit & Observability.md`.
