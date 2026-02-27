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
