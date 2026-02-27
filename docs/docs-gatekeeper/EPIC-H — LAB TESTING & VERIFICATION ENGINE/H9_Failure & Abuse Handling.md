FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H9_Failure & Abuse Handling
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H9_Failure & Abuse Handling.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H9_Failure & Abuse Handling.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: NIST SP 800-92 (Computer Security Incident Handling Guide)
   - Concept: Audit logging guidance and recommended fields/retention
   - Official source: https://csrc.nist.gov/publications/detail/sp/800-92/rev-1
   - Exact version requirement: SP 800-92 Rev-1
   - Why required: Provides canonical guidance for audit-log field sets, retention, and evidence handling.
   - Decision it informs: Audit schema, retention windows, tamper-evidence expectations, and log integrity controls.
   - What breaks without it: Incomplete or non-compliant audit records; ambiguous retention and evidence policies.

2. Technology: OpenTelemetry (metrics/traces/logs)
   - Concept: Telemetry signal naming, semantic conventions, and exporter expectations
   - Official source: https://opentelemetry.io/specs/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Standardizes metric and trace names used for resource-exhaustion detection and sampling.
   - Decision it informs: Metric names, histogram buckets, sampling windows, and exporter config.
   - What breaks without it: Incompatible telemetry across runners and inability to correlate signals.

3. Technology: Linux Audit (auditd) / OS Audit APIs
   - Concept: Kernel-level syscall auditing and audit event formats
   - Official source: https://linux.die.net/man/8/auditd and platform manpages
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER RUNNER OS
   - Why required: Defines how to detect forbidden syscalls and low-level abuse signals at the OS boundary.
   - Decision it informs: Which signals are detected at kernel vs process level and required privileges for collection.
   - What breaks without it: Blind spots for syscall-level abuse; over-reliance on in-process heuristics.

4. Technology: OpenPGP / KMS signing guidance
   - Concept: Signing of immutable evidence and audit bundles with verifiable keys
   - Official source: RFC 4880 (OpenPGP) and chosen KMS docs (e.g., AWS KMS)
   - Exact version requirement: RFC 4880 for OpenPGP; KMS vendor docs — VERSION UNKNOWN
   - Why required: Ensures tamper-evident evidence bundles and a canonical signing workflow.
   - Decision it informs: How to sign audit artifacts, key rotation requirements, and verification order.
   - What breaks without it: Unverifiable evidence, weak non-auditable logs.

5. Technology: JSON Schema (manifests & audit record schema)
   - Concept: Machine-readable schema for abuse-signal manifests and audit records
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12
   - Why required: Ensures deterministic parsing, validation, and evolution of recorded abuse artifacts.
   - Decision it informs: Field names, required vs optional fields, and validation gates for ingestion.
   - What breaks without it: Divergent record formats and failed integrations.

6. Technology: Privacy / Pseudonymization Guidance (GDPR ICO guidance)
   - Concept: Pseudonymization and minimization rules for audit logs containing user data
   - Official source: https://ico.org.uk/for-organisations/ (choose applicable jurisdiction guidance)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER LEGAL DOMAIN
   - Why required: Guides which fields must be redacted/pseudonymized and retention limits to protect user privacy.
   - Decision it informs: Redaction rules, access controls, and retention windows.
   - What breaks without it: Privacy violations or excessive data retention exposing PII.

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H9_Failure & Abuse Handling.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level plan and agent roles present but missing canonical signals, thresholds, schemas, and file manifests.

- /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H9_Failure & Abuse Handling.md
  - Coverage status: PARTIAL
  - Exact gaps: Enumerates missing artifacts and risks but lacks schema, concrete thresholds, and integration test vectors.

- /docs/official-docs/EPIC-H/ (directory currently absent)
  - Coverage status: INSUFFICIENT
  - Exact gaps: No canonical abuse-signal registry, audit schema, or pseudonymization policy.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

The following internal docs MUST be added or extended before implementer work:
- `/docs/official-docs/EPIC-H/abuse_signals_registry.md`
- `/docs/official-docs/EPIC-H/abuse_audit_schema.md`
- `/docs/official-docs/EPIC-H/abuse_retention_and_privacy.md`

STUDY GUIDE FOR HUMAN (CONCISE)

- `NIST SP 800-92`:
  - Why: Ground truth for audit logging and retention.
  - Alternatives: Vendor logging guidance (partial), but NIST gives broad, accepted practices.
  - When NOT to use: When regulator requires different local rules — follow jurisdictional law instead.
  - Common mistakes: Treating NIST as prescriptive for retention windows without legal review.

- `OpenTelemetry`:
  - Why: Standardized telemetry naming and exporters for signal correlation.
  - Alternatives: Proprietary metrics schemas — reduces portability.
  - When NOT to use: Extremely constrained runners without OTLP support (use lightweight exporters).
  - Common mistakes: Using ad-hoc metric names that collide across services.

- `Linux Audit / OS audit APIs`:
  - Why: Kernel-level evidence for forbidden syscalls and process behavior.
  - Alternatives: In-process syscall interception (incomplete, bypassable).
  - When NOT to use: Managed runners lacking kernel-level access.
  - Common mistakes: Expecting auditd on all runner images without verifying privileges.

- `JSON Schema for audit records`:
  - Why: Deterministic validation and schema evolution.
  - Alternatives: Ad-hoc CSV/TSV logs — fragile.
  - When NOT to use: Transient debug logs (use structured debug logging instead).
  - Common mistakes: Not versioning schema; adding PII fields without redaction guidance.

INTERNAL DOCS TO ADD OR EXTEND (DETAILS)

1. Path: `/docs/official-docs/EPIC-H/abuse_signals_registry.md`
   - Purpose: Canonical list of abuse-signal names, definitions, severity levels, detection heuristics, and sampling windows.
   - Exact knowledge to add: Signal name, description, severity (low/medium/high), detection metric (e.g., CPU% > 90%), numeric threshold, measurement window, sampling method, false-positive tolerance, and example trigger vectors.
   - Required version pin: OpenTelemetry spec version and supported OS audit versions.

2. Path: `/docs/official-docs/EPIC-H/abuse_audit_schema.md`
   - Purpose: JSON Schema (2020-12) for immutable audit records and evidence bundles.
   - Exact knowledge to add: Schema with required fields (event_id, occurred_at, signal_name, severity, observed_values, job_id, signed_evidence_path, verifier_fingerprint), signing requirements, storage path conventions (`/.forgea/audit/`), and verification procedure.
   - Required version pin: JSON Schema 2020-12; signing workflow (OpenPGP/KMS) version per vendor.

3. Path: `/docs/official-docs/EPIC-H/abuse_retention_and_privacy.md`
   - Purpose: Pseudonymization, retention windows, access controls, and redaction rules for audit records.
   - Exact knowledge to add: Which fields are PII and must be pseudonymized, retention durations per severity, access control lists for audit stores, and approved redaction algorithms.
   - Required version pin: Jurisdictional privacy guidance (e.g., ICO/GDPR) as applicable.

OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which legal jurisdiction's privacy rules apply (affects retention/pseudonymization)?
- Which runner OS families and privilege levels are in scope for kernel-level audit collection?
- What is the canonical audit storage backend (S3/internal blobstore/DB) and encryption-at-rest requirements?
- Who owns signing keys for immutable evidence (KMS, Vault, or local admin)?

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-H / H9 — Failure & Abuse Handling
  - Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H9_Failure & Abuse Handling.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying required official docs, internal doc gaps, and registry updates for canonical abuse-signal detection and audit.
