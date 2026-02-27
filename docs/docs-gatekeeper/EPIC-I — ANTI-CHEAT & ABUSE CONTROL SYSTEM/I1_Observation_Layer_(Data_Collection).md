## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I1 Observation Layer (Data Collection)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1_Observation_Layer*(Data_Collection).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1*Observation_Layer*(Data_Collection).md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For safe implementation the following external/official documents must be referenced and pinned. Where a precise version is unknown it is marked VERSION UNKNOWN and must be pinned before implementation.

- Technology: JSON Schema
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Defines machine-readable event schema and validation used by ingestion and downstream consumers.
  - Decision it informs: Event shape, required fields, and indexing choices.
  - What breaks without it: Incompatible schemas between producers and consumers; ambiguous validation and migration.

- Technology: Timestamp standards (RFC 3339 / ISO 8601)
  - Official source: https://www.ietf.org/rfc/rfc3339.txt
  - Exact version requirement: RFC 3339
  - Why required: Canonical timestamp format and timezone handling for event ordering and replay-resistance.
  - Decision it informs: Timestamp field format, monotonicity expectations, and client/server clock reconciliation rules.
  - What breaks without it: Inconsistent timestamp formats and incorrect ordering/TTL calculations.

- Technology: JSON Web Signature (JWS) / RFC 7515 (for signing events)
  - Official source: https://datatracker.ietf.org/doc/html/rfc7515
  - Exact version requirement: RFC 7515
  - Why required: Provides canonical signature format for authorship and tamper-evidence of recorded events.
  - Decision it informs: Signing algorithm choices, header fields, verification requirements.
  - What breaks without it: Lack of interoperable signed-event format; weaker tamper detection.

- Technology: Durable queue / stream guidance (e.g., Apache Kafka / AWS Kinesis / Redis Streams)
  - Official sources: https://kafka.apache.org/documentation/ , https://docs.aws.amazon.com/kinesis/ , https://redis.io/docs/manual/streams/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Persistence, retention, ordering, and replay semantics for ingestion.
  - Decision it informs: Choice of durable sink, consumer group semantics, retention/compaction policies.
  - What breaks without it: Unknown replay semantics, risk of data loss or incorrect ordering assumptions.

- Technology: PostgreSQL (or chosen OLTP) durability & DDL guidance
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Database schema design, unique constraints for deduplication, transactional semantics for auditability.
  - Decision it informs: Schema indexes, idempotency keys, and safe migration patterns.
  - What breaks without it: Risky migrations, incorrect deduplication, or inconsistent audit records.

- Technology: Cloud provider immutable storage / WORM (e.g., AWS S3 Object Lock)
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Tamper-resistant retention and legal hold capabilities for audit evidence.
  - Decision it informs: Retention enforcement location and legal compliance controls.
  - What breaks without it: Weak immutability guarantees and audit disputes.

### EXISTING INTERNAL DOCS (VERIFIED)

- No canonical internal docs were found under `/docs/official-docs/EPIC-I/` covering observation schema, retention policy, signing, or immutable sinks.
  - Coverage status: INSUFFICIENT
  - Exact gaps: Missing schema contract, retention/audit policy, approved storage options, signing/verifiability guidance, and implementer acceptance criteria.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend or add:

- `/docs/official-docs/EPIC-I/observation_schema.md` — Canonical JSON Schema for recorded events (required).
- `/docs/official-docs/EPIC-I/retention_and_privacy.md` — Retention windows, deletion policies, PII handling, and required data-privacy review.
- `/docs/official-docs/EPIC-I/storage_and_durability.md` — Approved durable sinks, DLQ patterns, replay-resistance guidance, and immutable-storage options.
- `/docs/official-docs/EPIC-I/signing_and_authorship.md` — Event signing format (JWS), key rotation, verification procedures, and operational runbook.

### STUDY GUIDE FOR HUMAN (KEY CONCEPTS)

- `Event Schema (JSON Schema)`:
  - Why: Ensures consistent producer/consumer contracts.
  - Alternatives: Avro/Protobuf (binary + schema registry) — choose when throughput and strict typing are required.
  - When NOT to use: Small ad-hoc telemetry where schema overhead is unnecessary.
  - Common mistakes: Omitting indexing hints, not versioning `schema_version`, mixing optional/required semantics.

- `Timestamps (RFC3339)`:
  - Why: Deterministic ordering and TTL calculations.
  - Alternatives: UNIX epoch millis (works, but lose human-readable form).
  - When NOT to use: Systems requiring sub-ms monotonic counters (use sequence numbers in addition).
  - Common mistakes: Relying on local clocks without drift compensation; missing timezone normalization.

- `Signing (JWS)`:
  - Why: Authorship and tamper evidence for events.
  - Alternatives: HMAC with shared secrets (simpler), PKI-based JWS (recommended for cross-service verification).
  - When NOT to use: Internal ephemeral telemetry where cryptographic guarantees are unnecessary.
  - Common mistakes: Not including canonical serialization before signing; weak key management/rotation.

- `Durable Queues & Replay`:
  - Why: Ensures durable ingestion and consumer replay for analytics and auditing.
  - Alternatives: DB-backed job tables (transactional coupling) vs streaming store (high-throughput replay).
  - When NOT to use: Extremely low-volume, eventually-consistent signals where direct DB writes suffice.
  - Common mistakes: Not defining idempotency/dedup keys; assuming ordering without compaction settings.

- `Retention & PII`:
  - Why: Legal/compliance and privacy obligations require pinned retention and redaction rules.
  - Alternatives: Short TTL + aggregated summaries to avoid storing PII.
  - When NOT to use: When recording explicit PII is unavoidable, escalate to Data-Privacy reviewer.
  - Common mistakes: Ambiguous retention windows and no deletion verification or audit trail.

### INTERNAL DOCS TO ADD OR EXTEND (DETAILS)

Only include these if coverage is PARTIAL (this is required):

- Path: `/docs/official-docs/EPIC-I/observation_schema.md`
  - Purpose: Provide the JSON Schema v2020-12 for all recorded event types, examples, and index hints.
  - Exact knowledge to add: Field definitions, required vs optional, `schema_version` handling, indexing recommendations.
  - Required version pin: JSON Schema 2020-12

- Path: `/docs/official-docs/EPIC-I/retention_and_privacy.md`
  - Purpose: Retention windows, deletion/expunge procedure, privacy escalation checklist, and data-privacy signoff requirements.
  - Exact knowledge to add: Retention durations by event type, legal hold workflows, PII redaction rules, audit log requirements.
  - Required version pin: N/A (but reference GDPR/CCPA guidance if applicable)

- Path: `/docs/official-docs/EPIC-I/storage_and_durability.md`
  - Purpose: Approve durable sinks (Kafka/Kinesis/Redis/Postgres), DLQ behavior, replay patterns, and immutable-storage options.
  - Exact knowledge to add: Supported provider choices, retention/compaction defaults, idempotency key format, DLQ redrive runbook.
  - Required version pin: Provider docs must be pinned per selected provider.

- Path: `/docs/official-docs/EPIC-I/signing_and_authorship.md`
  - Purpose: Define canonical signing (JWS) usage, key rotation, verification endpoints, and operator checks.
  - Exact knowledge to add: JWS header usage, required claims, verification procedure, and key rotation cadence.
  - Required version pin: RFC 7515

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Who is the HARD-LOCK approver for EPIC-I features (required before implementation)?
- Approved storage provider(s) and whether a managed streaming platform (Kafka/Kinesis) is acceptable.
- Organization policy for retention windows / whether PII is permitted in raw events (data-privacy signoff required).

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (exact text below):

- Date: 2026-02-14
  - Epic / Feature: EPIC-I / I1 — Observation Layer (Data Collection)
  - Doc path: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1*Observation_Layer*(Data_Collection).md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for the observation layer.

---

End of docs-gatekeeper brief for feature I1.
