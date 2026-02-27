## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I2*Detection_Layer*(Signal_Generation)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I2_Detection_Layer*(Signal_Generation).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I2*Detection_Layer*(Signal_Generation).md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below: technology, official source, version requirement (or note), why required, what decision it informs, and what breaks without it.

- Technology: OpenTelemetry (traces, metrics, and telemetry schema)
  - Official source: https://opentelemetry.io/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical telemetry/span/metric schema, propagation, and OTLP transport expected by collectors and observability backends.
  - Decision it informs: telemetry field names, sampling, propagation headers, and exporter choices for signal emission.
  - What breaks without it: inconsistent telemetry, poor correlation across services, incompatible collectors, and inability to build alerts/dashboards reliably.

- Technology: Audit Log Schema & Retention (project canonical)
  - Official source: /docs/official-docs/EPIC-B/audit-log-guidelines.md (internal)
  - Exact version requirement: VERSIONED INTERNAL DOC — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Specifies required audit fields, immutability requirements, and retention windows for triggered signals.
  - Decision it informs: which fields must be emitted when a signal fires (who, what, why, evidence), retention TTLs, and redaction rules.
  - What breaks without it: non-compliant audit trails, inability to investigate incidents, and legal/regulatory exposure.

- Technology: Rate-limiting & Safety-Guard Patterns (token-bucket, leaky-bucket, throttling)
  - Official source: Cloudflare Rate Limiting guide https://developers.cloudflare.com/rate-limits/ (example) — pin vendor or algorithm spec
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical algorithm, burst allowances, and throttling semantics used to protect the detection pipeline from DoS amplification.
  - Decision it informs: per-signal rate-limits, global pipeline backpressure strategies, and retry/drop policies for audit/alerts emission.
  - What breaks without it: detector-induced DoS, high-cost alert storms, and operational instability.

- Technology: Incident Response / Escalation (NIST SP 800-61 or equivalent)
  - Official source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf
  - Exact version requirement: NIST SP 800-61 r2 (recommended)
  - Why required: Standardizes escalation criteria, human-review thresholds, and playbook responsibilities when critical signals fire.
  - Decision it informs: when to escalate to humans vs automated enforcement, and what evidence to attach to an incident ticket.
  - What breaks without it: inconsistent escalation, missed investigations, and inadequate operator guidance.

- Technology: Data Protection & Regulatory (GDPR / PII handling)
  - Official source: EU GDPR (Regulation (EU) 2016/679) https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: 2016/679
  - Why required: Determines what telemetry/audit fields are permitted, storage retention windows, and required redaction for PII.
  - Decision it informs: field-level retention, encryption-at-rest requirements, and allowed query/access patterns for signals containing user data.
  - What breaks without it: potential regulatory non-compliance and required rework of telemetry retention.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I2_Detection_Layer*(Signal_Generation).md
  - Coverage status: PARTIAL
  - Exact gaps: contains high-level execution plan and agent roles but contains no enumerated signal definitions, thresholds, telemetry field lists, or approval signatures.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I2*Detection_Layer*(Signal_Generation).md
  - Coverage status: PARTIAL
  - Exact gaps: repository truth check and missing implementation artifacts noted; no planner-approved signal spec present.

- /docs/official-docs/EPIC-B/audit-log-guidelines.md (referenced in registry)
  - Coverage status: PARTIAL
  - Exact gaps: registry entry exists, but the concrete schema and examples for anti-cheat signals are not present (no `signal_type`, `severity`, `evidence` examples for this feature).

- Implementation code under `forgea-monorepo/services/anti-cheat/**`
  - Coverage status: INSUFFICIENT
  - Exact gaps: no service code or infra manifests discovered; nothing to verify emission or enforcement behavior.

- Planner-approved task doc enumerating signals
  - Coverage status: MISSING
  - Exact gaps: core deliverable required before implementer work: the per-signal spec described in the next section.

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs that must be extended before implementation:

- `/docs/official-docs/EPIC-B/audit-log-guidelines.md` — extend with `signal`-specific schema, examples, and retention entries for anti-cheat signals.
- Add a planner-approved `/docs/official-docs/EPIC-I/signal_definitions_v1.md` (see Internal Docs to Add section).
- Add `/docs/official-docs/EPIC-I/signal_security_review.md` (security-sentinel review and signed approvals).
- Add `/docs/official-docs/EPIC-I/signal_qa_tests.md` (QA positive/negative/adversarial test matrix and replay-resistance tests).

---

## STUDY GUIDE FOR HUMAN

For each required concept below: why it exists, alternatives, when NOT to use it, and common engineering mistakes.

- OpenTelemetry (telemetry & tracing)
  - Why: Provides portable, vendor-neutral telemetry fields and propagation to correlate events across services.
  - Alternatives: Custom JSON logging schema, direct vendor SDKs (Datadog, NewRelic).
  - When NOT to use: For transient lab-only scripts where overhead is unacceptable — but avoid for production detection.
  - Common mistakes: emitting high-cardinality labels, leaking PII in attributes, inconsistent field names across services.

- Audit Log Schema & Retention
  - Why: Immutable, queryable evidence trail required for investigations and legal compliance.
  - Alternatives: Ad-hoc logs or plain metrics (insufficient for post-incident forensics).
  - When NOT to use: short-lived debug-only events; use separate ephemeral debug logs.
  - Common mistakes: missing required context (actor id, session id, request id), insufficient retention, and non-atomic writes.

- Rate-limiting & Safety-Guards
  - Why: Prevents detection pipeline from being used to amplify load or trigger alert storms (DoS risk).
  - Alternatives: aggressive sampling or strict audit-only mode for early deployments.
  - When NOT to use: for critical-for-safety signals that must always be emitted without throttling (rare; require manual approval).
  - Common mistakes: global throttles that drop high-severity events, lack of per-signal vs global budgeting, and missing backpressure behavior.

- Incident Response / Escalation
  - Why: Standardizes human escalation and required evidence when automation cannot safely act.
  - Alternatives: informal Slack alerts (not suitable for production incident handling).
  - When NOT to use: low-severity informational signals that do not require human attention.
  - Common mistakes: unclear ownership, missing required evidence links, and no SLA/timer for human response.

- Data Protection & GDPR
  - Why: Ensures telemetry and audit data storage complies with regulatory constraints.
  - Alternatives: data minimization and pseudonymization.
  - When NOT to use: never — always consider privacy for telemetry that contains user identifiers.
  - Common mistakes: logging raw identifiers without consent, indefinite retention, and lack of redaction.

---

## INTERNAL DOCS TO ADD OR EXTEND

Create or extend the following files under `/docs/official-docs/`.

- Path: /docs/official-docs/EPIC-I/signal_definitions_v1.md
  - Purpose: Planner-approved authoritative list of every detection signal required for I2.
  - Exact knowledge to add: For each signal: `signal name`, `severity`, `exact numeric/rule thresholds`, `allowed automated/manual actions`, `required telemetry fields` (schema), `audit event examples`, `retention requirements`, and `approver signature lines`.
  - Required version pin: v1.0 (pin at approval)

- Path: /docs/official-docs/EPIC-I/signal_security_review.md
  - Purpose: Security-Sentinel review artifact and signed checklist evaluating false-positive risk, DoS surface, and tuning guidance.
  - Exact knowledge to add: threat analysis, rate-limit recommendations per signal, FPR tuning guidance, and acceptance criteria for moving to enforcement.
  - Required version pin: v1.0 (pin at review)

- Path: /docs/official-docs/EPIC-I/signal_qa_tests.md
  - Purpose: QA test matrix and harness requirements for positive/negative/adversarial tests and replay-resistance tests.
  - Exact knowledge to add: test cases, input fixtures, expected telemetry/audit outputs, fuzz/adversarial scenarios, and pass/fail criteria.
  - Required version pin: v1.0 (pin at QA acceptance)

- Path: /docs/official-docs/EPIC-I/telemetry_schema_signal_v1.md
  - Purpose: Concrete telemetry JSON/OTLP schema for anti-cheat signals, mapping to OpenTelemetry fields and allowed labels.
  - Exact knowledge to add: canonical field names, allowed enumerations for `signal_type` and `severity`, cardinality guidance, and PII redaction rules.
  - Required version pin: v1.0 (pin at schema approval)

- Path: /docs/official-docs/EPIC-B/audit-log-guidelines.md (extension)
  - Purpose: Extend with concrete `signal` examples, audit payloads, and retention buckets specific to EPIC-I.
  - Exact knowledge to add: sample audit events per signal and required evidence attachments (hashes, session refs).
  - Required version pin: update existing doc version when extended.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Who is the formal approver for the planner-approved signal document? (Planner-Architect delegate or Product Security?)
- Confirm the global retention windows and PII handling policy to apply to signals (audit vs telemetry vs metrics).
- Confirm allowed automated actions for `high` vs `critical` signals (throttle vs temporary block vs immediate account action).
- Decide whether the detection pipeline will use a shared collector (OTLP) or per-service exporters (affects schema and rate-limits).

---

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-I / I2 — Detection Layer (Signal Generation)
- Doc path: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I2*Detection_Layer*(Signal_Generation).md
- Status: ADDED (EXTEND)
- Reason: Planner-facing feature brief enumerating required official docs, missing internal docs, and specific doc artifacts required before implementer work.

---

Produced by: Docs Gatekeeper — review required by Planner-Architect and Security-Sentinel before implementation.
