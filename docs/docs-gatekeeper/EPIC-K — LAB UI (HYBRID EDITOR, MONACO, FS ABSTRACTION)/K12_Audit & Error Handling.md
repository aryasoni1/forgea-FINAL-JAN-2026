FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K12 — Audit & Error Handling
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include: Technology, Concept, Official source (stable URL), Exact version requirement OR: "VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION", Why required, What decision it informs, What breaks without it.

- Technology: JSON Schema
  - Concept: Canonical JSON Schema for `AuditLog.metadata` (audit metadata contract)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Defines a machine-readable, versioned contract enforcing field names, types, size limits, and redaction rules across producers and consumers.
  - What decision it informs: Producer validation, CI schema checks, size/truncation semantics, and scrub/redaction expectations.
  - What breaks without it: Divergent producer payloads, PII leakage, inconsistent consumers, and brittle migration handling.

- Technology: Data Protection Regulation (legal)
  - Concept: EU GDPR (and regional privacy laws as applicable) for retention/redaction requirements
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: Regulation (EU) 2016/679
  - Why required: Determines lawful retention windows, rights-to-erasure considerations, and legal controls for audit storage and archival.
  - What decision it informs: Hot DB retention duration, archival destinations, access controls, and deletion/backfill policy for personal data.
  - What breaks without it: Non-compliant retention policies, legal risk, and unclear deletion requirements.

- Technology: Cloud Storage Lifecycle (vendor)
  - Concept: S3 object lifecycle / cold-storage archival patterns and access controls
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides practical archival destination selection (S3 Glacier / BigQuery export), lifecycle rules, and policy-as-code for retention automation.
  - What decision it informs: Where audit data is archived, retrieval SLA, and access controls for cold storage.
  - What breaks without it: Unclear archival automation, costly retrievals, and operator uncertainty.

- Technology: HTTP/Webhook best-practices
  - Concept: Webhook delivery, retry/backoff, auth, idempotency, and error semantics
  - Official source: GitHub Webhooks docs (example): https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs `FORGEA_SECURITY_ALERT_SINK_URL` contract: payload shape, auth method, retry/backoff expectations, and SLA.
  - What decision it informs: Alert sink payload format, auth mode, retry/backoff, and fallback channels.
  - What breaks without it: Lost alerts, misinterpreted payloads, and non-actionable security notifications.

- Technology: HTTP semantics / status codes
  - Concept: RFC 7231 (HTTP) for classifying retries and idempotency
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Guides retry/backoff and idempotency design for alert sink calls and audit exports.
  - What decision it informs: Which status codes are permanent vs transient and how to implement exponential backoff.
  - What breaks without it: Incorrect retry behavior and potentially duplicate or lost alerts.

---

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md
  - Coverage status: PARTIAL
  - Exact gaps: No canonical, versioned JSON Schema; no retention/archival policy; no formal alert sink contract; missing client-side telemetry guidance; no enforcement/CI rules; missing acceptance tests.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md
  - Coverage status: PARTIAL
  - Exact gaps: Task-level plan requested but no concrete schema, event list, or retention durations pinned.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry references required internal docs (e.g., `/docs/official-docs/EPIC-B/audit-log-guidelines.md`) but those canonical docs are not present.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md` — add versioned JSON Schema block, event registry, and producer examples.
  - `/docs/official-docs/EPIC-B/audit_retention_and_archival.md` — add explicit retention durations, archival destinations, access control matrix, and legal mapping (GDPR/regionals).
  - `/docs/official-docs/EPIC-B/audit_sink_spec.md` — define `FORGEA_SECURITY_ALERT_SINK_URL` payload, auth, retries, and SLA.
  - `/docs/official-docs/EPIC-B/audit_client_telemetry.md` — client-side error telemetry guidance and mapping to audit vs telemetry stores.

STUDY GUIDE FOR HUMAN

- `JSON Schema (Audit metadata)`:
  - Why this exists: Single source-of-truth for audit payload validation and producer/consumer compatibility.
  - Why alternatives exist: Protobuf/Avro could be used for compactness; JSON Schema chosen for human readability and CI tooling.
  - When NOT to use it: High-throughput binary telemetry pipelines where protobuf is required.
  - Common engineering mistakes: Failing to pin a schema version; allowing arbitrary unvalidated free-form fields that leak PII; not enforcing max sizes.

- `Retention & Archival (Legal)`:
  - Why this exists: Align retention with legal/regulatory requirements and operational cost.
  - Why alternatives exist: Varying regional legal requirements may require different retention for different accounts.
  - When NOT to use it: When ephemeral debug traces are acceptable (short-lived sandbox data).
  - Common engineering mistakes: Hardcoding retention without documenting GDPR/legal rationale; failing to identify PII fields in schema.

- `Alert Sink Contract`:
  - Why this exists: Ensure security alerts are delivered reliably and are actionable.
  - Why alternatives exist: Use of external SIEMs vs internal webhook sinks — either requires pinned auth and retry semantics.
  - When NOT to use it: Local development where alerting is stubbed to logs only.
  - Common engineering mistakes: One-shot fire-and-forget calls; missing idempotency keys; no authentication or replay protection.

INTERNAL DOCS TO ADD OR EXTEND

Include only the docs required to close gaps (paths under `/docs/official-docs/`):

- Path: `/docs/official-docs/EPIC-B/audit-log-guidelines.md`
  - Purpose: Canonical, versioned JSON Schema for `AuditLog.metadata`, event registry (names, severity), producer examples, and scrub/redaction rules.
  - Exact knowledge to add: Full JSON Schema block (schema_version 2026-01-01+v1), field-level max sizes, required top-level fields, allowed additionalProperties policy, example payloads for each event type, and redaction rules mapping.
  - Required version pin: `schema_version: 2026-01-01.v1` (planner to confirm with legal/security).

- Path: `/docs/official-docs/EPIC-B/audit_retention_and_archival.md`
  - Purpose: Retention and archival policy for `AuditLog` records.
  - Exact knowledge to add: Hot DB retention (e.g., 12 months default), archival destination(s) (S3 Glacier or BigQuery), retrieval SLA, access control list for archived data, deletion/backfill process, and legal mapping (GDPR/CCPA) with owner contacts.
  - Required version pin: `retention_policy_v1` — legal signoff required.

- Path: `/docs/official-docs/EPIC-B/audit_sink_spec.md`
  - Purpose: Contract for `FORGEA_SECURITY_ALERT_SINK_URL` and any alerting endpoints.
  - Exact knowledge to add: Alert payload shape, example HMAC or bearer token auth method, expected HTTP status semantics, retry/backoff strategy, idempotency keys, and fallback channels (email/SIEM ingestion) with SLAs.
  - Required version pin: `alert_sink_v1` — security-sentinel signoff required.

- Path: `/docs/official-docs/EPIC-B/audit_client_telemetry.md`
  - Purpose: Guidance for client-side error telemetry vs audit recording and safe masking rules for user-facing messages.
  - Exact knowledge to add: Which client errors qualify for audit events, sampling rules, PII masking rules, and integration pattern (Sentry vs custom telemetry) with mapping examples.
  - Required version pin: `client_telemetry_v1` — implementer review required.

OPEN QUESTIONS / AMBIGUITIES

- Exact hot-DB retention window and archival SLA (ask Legal and Security): GDPR/legal inputs required per region.
- Desired schema_version string and release process for `AuditLog.metadata` (planner must set `schema_version` format and review policy).
- Authentication method and credentials for `FORGEA_SECURITY_ALERT_SINK_URL` (security-sentinel to propose HMAC or bearer token and rotation policy).

MASTER DOCS REGISTRY ACTION

Append the following exact entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K12 — Audit & Error Handling
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K12_Audit & Error Handling.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for canonical audit schema, retention, and alerting contracts.
  - Date: 2026-02-15
