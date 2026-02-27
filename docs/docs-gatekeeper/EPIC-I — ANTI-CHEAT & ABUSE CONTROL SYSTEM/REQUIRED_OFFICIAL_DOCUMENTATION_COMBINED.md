## EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM

Combined "REQUIRED OFFICIAL DOCUMENTATION" sections extracted from the EPIC-I docs-gatekeeper briefs.

Source files:

- I1*Observation_Layer*(Data_Collection).md
- I2*Detection_Layer*(Signal_Generation).md
- I3*Classification_Layer*(Session_Integrity).md
- I4*Enforcement_Layer*(Actions).md
- I5*Rule_Enforcement*(Hard_Constraints).md
- I6*Audit*&\_Logging.md
- I7*Rate_Limiting*&\_Abuse_Protection.md
- I8*Configuration*&\_Policy.md
- I9*Validation*&\_Testing.md

---

### From: I1*Observation_Layer*(Data_Collection).md

### REQUIRED OFFICIAL DOCUMENTATION

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

---

### From: I2*Detection_Layer*(Signal_Generation).md

### REQUIRED OFFICIAL DOCUMENTATION

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

### From: I3*Classification_Layer*(Session_Integrity).md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: Audit Logging & Management
  - Concept: Audit log design, append-only semantics, retention
  - Official source: NIST Special Publication 800-92 (Computer Security Log Management)
  - Exact version requirement: NIST SP 800-92 (2006)
  - Why required: Provides authoritative guidance on log collection, retention, and forensic readiness.
  - Decision informed: Audit schema, retention windows, sink selection.
  - What breaks without it: Poor retention and forensic gaps; inconsistent log handling.

- Technology: JSON Web Signatures (signing audit payloads)
  - Concept: Cryptographic signature format and verification
  - Official source: RFC 7515 — JSON Web Signature (JWS)
  - Exact version requirement: RFC 7515
  - Why required: Standardizes signing format used for tamper-evidence across services.
  - Decision informed: Event signature format and verification routines.
  - What breaks without it: Non-interoperable signature schemes; harder verification.

- Technology: SHA-2 family (hash algorithm)
  - Concept: Hash algorithm for chaining events
  - Official source: FIPS 180-4 (SHA-2)
  - Exact version requirement: FIPS 180-4
  - Why required: Standardized, FIPS-approved hash for tamper-evident chains.
  - Decision informed: Hash selection and compliance.
  - What breaks without it: Non-compliant hashing; weaker tamper evidence.

- Technology: WORM / Object Lock storage (archive sink)
  - Concept: Write-once-read-many storage for archived audit chains
  - Official source: AWS S3 Object Lock docs (or equivalent vendor docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures archived chains are not deleted or mutated for retention window.
  - Decision informed: Archive sink selection, retention enforcement.
  - What breaks without it: Archives subject to deletion or modification; weak forensic guarantees.

- Technology: KMS / HSM key management
  - Concept: Key management, signing, and rotation
  - Official source: AWS KMS docs (or vendor-specific KMS/HSM docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Secure key storage and rotation for event signatures.
  - Decision informed: Signing architecture and rotation policy.
  - What breaks without it: Keys stored insecurely; signatures not verifiable over rotations.

---

### From: I4*Enforcement_Layer*(Actions).md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: OpenTelemetry (traces/metrics/logs)
   - Official source: https://opentelemetry.io/specs/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why: Standardizes telemetry fields, span attributes, and exporter expectations for audit, alerting, and post-incident analysis.
   - Decision it informs: Event naming, required fields for enforcement audit events, and sampling/retention integration.
   - Breaks without it: Inconsistent telemetry, incomplete audit trails, and inability to correlate enforcement events across services.

2. Technology: JSON Schema (audit / event schemas)
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12 (recommended) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why: Provides machine-readable contract for audit events and evidence artifacts.
   - Decision it informs: Shape of `AuditEvent` payloads, `schema_version` bump process, and ingestion validation.
   - Breaks without it: Divergent event shapes, validation failures, and unreliable downstream sinks.

3. Technology: RFC 3339 (timestamps)
   - Official source: https://datatracker.ietf.org/doc/html/rfc3339
   - Exact version requirement: RFC 3339
   - Why: Canonical timestamp format required for ordering, retention windows, and legal evidence.
   - Decision it informs: `captured_at` / `enforced_at` fields, sort semantics, and cross-service correlation.
   - Breaks without it: Ambiguous ordering and interoperability problems between services and auditors.

4. Technology: NIST SP 800-92 (Audit Logging guidance)
   - Official source: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
   - Exact version requirement: 2006 (Rev-1 if applicable) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why: Industry guidance on log content, retention, and evidentiary handling.
   - Decision it informs: Minimum audit fields, tamper-evident storage recommendations, and retention windows.
   - Breaks without it: Non-compliant audit artifacts and risk in legal/forensic review.

5. Technology: GDPR / Data protection guidance (jurisdiction-specific)
   - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
   - Exact version requirement: REGULATION (EU) 2016/679
   - Why: Enforcement actions may include user-affecting data; legal constraints and retention must be observed.
   - Decision it informs: Retention, redaction, appeal/rights-to-erasure processes, and where irreversible actions are allowed.
   - Breaks without it: Legal exposure and non-compliant retention/erasure handling.

---

### From: I5*Rule_Enforcement*(Hard_Constraints).md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: PostgreSQL — Concept: DDL & transaction semantics

- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Informs unique constraints, foreign keys, transactional isolation, `CREATE INDEX CONCURRENTLY`, advisory locks, and safe migration patterns required to enforce DB-level invariants.
- Decision it informs: Whether hard constraints are expressible and enforceable at the storage layer, safe concurrent DDL recipes, and lock strategies.
- What breaks without it: Race conditions, lost uniqueness, unrecoverable migrations, and enforcement that can be bypassed by concurrent writes.

2. Technology: Prisma (if used) — Concept: schema & migrations

- Official source: https://www.prisma.io/docs/concepts/components/prisma-schema
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Maps application model to DDL and defines migration generation and drift handling used in CI/CD migration review.
- Decision it informs: Migration strategy, generated client expectations, and whether application-layer checks suffice.
- What breaks without it: Divergent schema drift, failed migrations, and incorrect client assumptions about constraints.

3. Technology: Glob / Pathspec semantics — Concept: locked-path / forbidden-file matching

- Official source: gitignore semantics / chosen pathspec implementation (e.g., https://git-scm.com/docs/gitignore or chosen library docs)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines exact matching semantics for forbidden file lists and locked-path manifests used by enforcement logic.
- Decision it informs: How to canonicalize and match forbidden paths in DB records and enforcement checks.
- What breaks without it: False positives/negatives in enforcement and inconsistent blocking across tools.

4. Technology: JSON Schema — Concept: rule/manifest schema (if rule manifests are JSON)

- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12 (recommended) or PIN — VERSION UNKNOWN — MUST BE PINNED
- Why required: Standardizes rule manifest shape (forbidden globs, step sequences, invariants) and CI validation.
- Decision it informs: Validation, storage format, and client/runtime parsing expectations.
- What breaks without it: Unvalidated manifests, runtime parsing errors, and incompatible rule versions.

5. Technology: Idempotency & Retry Patterns (HTTP/RPC)

- Official source: RFC 7231 — https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC as cited — PIN if implementation-specific libraries are used
- Why required: Guides de-duplication and job-uniqueness behavior when enforcement hooks are triggered by external events.
- Decision it informs: Idempotency-key format, TTL, and retry-handling for enforcement triggers.
- What breaks without it: Duplicate job creation, weak uniqueness guarantees, and inconsistent enforcement state.

6. Technology: Distributed locking guidance / advisory locks

- Official source: PostgreSQL advisory locks docs + chosen distributed-lock pattern docs (e.g., Redis Streams / Redlock guidance)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides authoritative guidance for preventing races when enforcing sequential constraints (single-active job per subject).
- Decision it informs: Use of DB advisory locks vs external lock service and lock TTL/renewal policies.
- What breaks without it: Lost exclusivity, double-enforcement, and incorrect sequencing under concurrency.

---

### From: I6*Audit*&\_Logging.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Canonical audit event schema and machine-validation for ingestion, indexing, and exports.
  - Decision it informs: Event contract, required fields, schema versioning and migration strategy.
  - What breaks without it: Incompatible event consumers, ambiguous validation, and migration risk.

- Technology: Immutable object/WORM storage guidance (e.g., S3 Object Lock)
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Legal hold and tamper-resistant retention for preserved audit evidence.
  - Decision it informs: Where immutability is enforced and retention enforcement location.
  - What breaks without it: Weak tamper guarantees and legal non-compliance risk.

- Technology: PostgreSQL DDL & transactional semantics
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Schema design for append-only audit tables, unique constraints, and safe migration patterns.
  - Decision it informs: Indexing, deduplication keys, and transactionally-consistent writes.
  - What breaks without it: Inconsistent ordering, gaps in audit sequencing, and risky migrations.

- Technology: Timestamp standard (RFC 3339)
  - Official source: https://www.ietf.org/rfc/rfc3339.txt
  - Exact version requirement: RFC 3339
  - Why required: Canonical timestamp formats for ordering, TTL, and cross-system correlation.
  - Decision it informs: Timestamp fields, timezone normalization, and event ordering guarantees.
  - What breaks without it: Inconsistent timestamps, mis-ordered audit records, TTL errors.

- Technology: Privacy / pseudonymization guidance (GDPR/ICO or jurisdictional equivalent)
  - Official source: https://ico.org.uk/for-organisations/ (or jurisdiction equivalent)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER LEGAL DOMAIN
  - Why required: Defines PII handling, redaction rules, lawful basis, and escalation for data-privacy review.
  - Decision it informs: Which fields are allowed, retention windows, redaction/obfuscation requirements.
  - What breaks without it: Regulatory non-compliance and exposure to data-subject risk.

- Technology: OS immutability primitives (chattr / chflags)
  - Official source: Platform manpages (e.g., `man chflags`, `man chattr`)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guidance for OS-level append-only flags on on-host stores and forensic artifacts.
  - Decision it informs: Runtime procedures for locking files, operator runbook steps.
  - What breaks without it: Weak on-host immutability and operator confusion.

---

### From: I7*Rate_Limiting*&\_Abuse_Protection.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: HTTP semantics — Retry and rate-related headers

- Concept: `Retry-After`, status codes for throttling (429)
- Official source: https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.3
- Exact version requirement: RFC 7231 (June 2014)
- Why required: Standardizes client-visible retry guidance and canonical status codes used by enforcement layers.
- Decision it informs: Response codes and headers emitted by edge and service middleware when limits are enforced.
- What breaks without it: Inconsistent client behavior and incompatible retry/backoff semantics across integrations.

2. Technology: Rate-limiting algorithm specification

- Concept: Token-bucket / leaky-bucket behavior and parameter definitions (burst, refill)
- Official source: VERSION UNKNOWN — authoritative algorithm descriptions must be pinned (e.g., vendor alg docs or RFC if available)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines how enforcement behaves under burst vs steady load and how refill intervals map to numeric limits.
- Decision it informs: Burst allowances, refill intervals, and enforcement fidelity at scale.
- What breaks without it: Divergent implementations causing inconsistent user experience and possible DoS amplification.

3. Technology: Edge / CDN rate-limiting (example implementations)

- Concept: Enforcement at CDN/edge to reduce upstream load (Cloudflare, Fastly, AWS WAF rate limiting guidance)
- Official source: https://developers.cloudflare.com/rate-limiting/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Informs where to apply coarse-grained enforcement and what constraints are available at the edge.
- Decision it informs: Whether to block at CDN vs service, and how to cascade enforcement.
- What breaks without it: Overloading origin services or duplicate/conflicting enforcement rules.

4. Technology: Service-side rate limit middleware (Envoy / NGINX / ALB)

- Concept: Config patterns for per-IP/per-account limits and integration with external rate-limit services
- Official source: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ratelimit_filter and https://nginx.org/en/docs/http/ngx_http_limit_req_module.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides canonical implementation patterns for enforcing limits at the service mesh or ingress.
- Decision it informs: Enforcement location choices and telemetry integration points.
- What breaks without it: Mismatched enforcement semantics causing bypass or inconsistent throttling.

5. Technology: Telemetry & audit schema

- Concept: Metrics and audit events required for approaching/exceeding limits (OpenTelemetry recommended)
- Official source: https://opentelemetry.io/docs/specs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures consistent observability, retention, and alerting for abuse and operational thresholds.
- Decision it informs: What events/fields to emit, retention, and alert thresholds.
- What breaks without it: Insufficient signal to detect or investigate abuse; missed alerts.

6. Technology: DoS amplification and mitigation guidance

- Concept: Threat analysis and mitigations for amplification vectors (OWASP guidance)
- Official source: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Identifies attack vectors that naive rate-limits can amplify (e.g., CPU-heavy validation under small request load).
- Decision it informs: Safe enforcement patterns and hardening requirements.
- What breaks without it: Deploying throttles that inadvertently increase attack surface.

7. Technology: Load & simulation tooling

- Concept: Standardized load-test scenarios and tooling (k6, locust, or equivalent)
- Official source: https://k6.io/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides canonical test harness and patterns for QA `rate-limit-simulation` deliverable.
- Decision it informs: Test scripts and acceptance criteria for QA and security validation.
- What breaks without it: Inability to reproduce edge-case behaviors and validate thresholds under adversarial load.

---

### From: I8*Configuration*&\_Policy.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema (configuration validation)
   - Official source: https://json-schema.org/
   - Exact version requirement: 2020-12
   - Why required: Provides a standard, machine-verifiable schema format for config files, automated validation, and generation of helpful error messages.
   - What decision it informs: Field types, allowed ranges, canonical validation rules, and migration compatibility checks.
   - What breaks without it: Incompatible or ambiguous validation rules, brittle parsing logic, inconsistent enforcement across services.

2. Technology: Semantic Versioning (schema & config versioning)
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Establishes compatibility guarantees and upgrade rules for default/migration flows.
   - What decision it informs: When to treat a change as breaking (major) vs additive (minor/patch) and migration rollout procedures.
   - What breaks without it: Silent incompatible changes, inability to automate safe rollouts/rollbacks.

3. Technology: JSON Patch (RFC 6902) — migrations and diffs
   - Official source: https://tools.ietf.org/html/rfc6902
   - Exact version requirement: RFC 6902 (stable)
   - Why required: Provides a standard format for applying, auditing, and rolling back incremental config changes.
   - What decision it informs: How to structure migration payloads and rollback semantics.
   - What breaks without it: Custom ad-hoc migrations that are harder to audit and revert.

---

### From: I9*Validation*&\_Testing.md

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Machine-readable schema for test payloads, verification intake, and test-matrix artifacts
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Defines a canonical, versioned schema for producing and validating test vectors and verification intake payloads used by QA and verification tooling.
- Decision it informs: Schema compatibility, ingestion validation, and CI acceptance tests.
- What breaks without it: Non-deterministic test payload interpretation, incompatible runner inputs, and flaky CI validation.

2. Technology: POSIX process exit semantics

- Concept: Canonical interpretation of exit codes and signal termination for verification runners
- Official source: https://pubs.opengroup.org/onlinepubs/9699919799/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Needed to deterministically map runner outcomes to PASS/FAIL/INFRA-ERROR in validation scenarios.
- Decision it informs: Classification of verification results and acceptable failure modes.
- What breaks without it: Misclassification of infra vs test failures and inconsistent enforcement triggers.

3. Technology: Git reference manual

- Concept: Authoritative git behavior (commit, push, reflog, SHA semantics) used to craft realistic commit/flooding/diff-reuse scenarios
- Official source: https://git-scm.com/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Simulations rely on precise Git semantics (SHA reuse, force-push, reflog visibility) to be realistic and reproducible.
- Decision it informs: Test harness design, fixture capture, and expected repository state transitions.
- What breaks without it: Tests may miss edgecases or produce non-representative artifacts.

4. Technology: OpenTelemetry (Tracing)

- Concept: Standard tracing format and propagation used to correlate validation runs and signals across services
- Official source: https://opentelemetry.io/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Correlating signals, QA runs, and enforcement actions across microservices requires a pinned tracing contract.
- Decision it informs: Telemetry fields included in audit and test artifacts.
- What breaks without it: Loss of traceability between test scenarios and observed signals in production-like runs.

5. Technology: Test-runner / language runner conventions (pytest / JUnit / mocha)

- Concept: Runner-specific exit code semantics and output formats used by verification harnesses
- Official sources: Runner docs (e.g., https://docs.pytest.org/, https://junit.org/)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED PER-RUNNER BEFORE IMPLEMENTATION
- Why required: Tasks require mapping runner behavior to canonical verification results and designing harness adapters.
- Decision it informs: How CI harness interprets runner failures vs infra issues.
- What breaks without it: Flaky CI, inconsistent PASS/FAIL mapping, mis-triggered enforcement.

---

End of combined extraction.
