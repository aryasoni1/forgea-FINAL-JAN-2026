FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H7 — Artifact Collection
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For each concept below the implementer MUST pin an official spec or vendor doc before work begins. If a version or stable URL is not yet chosen, mark it `VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION`.

- Technology: Data retention & legal compliance
  - Concept: Retention windows, legal hold, and forensic preservation
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures artifact retention aligns with legal/forensic requirements and defines deletion/archival policies.
  - What decision it informs: Retention TTLs, immutable storage choices, and legal hold procedures.
  - What breaks without it: Non-compliant retention that could expose organization to legal risk.

- Technology: Cryptographic hashing & signing guidance
  - Concept: Algorithms and signature formats for artifact integrity
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Specifies which hash and signing algorithms are acceptable for forensic integrity and verification.
  - What decision it informs: Hash storage format, signature verification processes, and key management needs.
  - What breaks without it: Inconsistent integrity proofs and inability to validate artifacts during audits.

- Technology: Sensitive data redaction & PII handling
  - Concept: Redaction standards and required validators for secrets/PII
  - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines what must be redacted, acceptable masking strategies, and validation rules to prevent leakage.
  - What decision it informs: Collector validation, truncation rules, and DLQ/log handling.
  - What breaks without it: Leakage of PII/secrets in stored artifacts and audit failures.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - No formal Artifact Contract (types, retention TTLs, truncation rules, integrity policy).
    - No artifact-metadata JSON schema present.
    - No redaction/obfuscation rules or validators documented.
    - No operational retrieval/forensic runbook.

- Doc path: /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - Confirms missing implementation artifacts and recommends artifact-metadata schema and hashing/signing utility but contains no formal contract.

---

**DOCUMENTATION COVERAGE DECISION**

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend/create:
  - `/docs/official-docs/EPIC-H/artifact_contract.md` — authoritative Artifact Contract (see below).
  - `/docs/official-docs/EPIC-H/artifact_metadata_schema.md` — artifact-metadata JSON Schema and examples.
  - `/docs/official-docs/EPIC-H/artifact_collection_security.md` — redaction/PII rules and security checklist.
  - `/docs/official-docs/EPIC-H/artifact_operational_runbook.md` — retrieval, retention, legal hold, and audit procedures.

---

### ARTIFACT CONTRACT (AUTHORITATIVE)

This contract MUST be copied verbatim into `/docs/official-docs/EPIC-H/artifact_contract.md` and pinned.

- Scope & purpose:
  - Define what runtime and verification artifacts are captured, how they are stored, retained, verified for integrity, and sanitized for sensitive data.

- Artifact types (minimum set):
  - `runner_log` — full stdout/stderr from the runner process.
  - `test_report` — structured test or verification reports (machine-readable JSON where possible).
  - `file_diff` — diffs or snapshots of filesystem artifacts produced by the run.
  - `trace_snapshot` — optional richer traces, stack dumps, or environment snapshots.
  - `meta_record` — artifact metadata wrapper containing indexing fields and integrity proofs.

- Retention & TTL rules (per type):
  - `runner_log`: retain for `T_LOG` days (configurable). After `T_LOG` move to long-term archive or delete per legal hold.
  - `test_report`: retain for `T_REPORT` days (>= T_LOG) for auditability.
  - `file_diff`: retain for `T_DIFF` days; diffs deemed relevant for forensics must be kept longer or under legal hold.
  - `trace_snapshot`: retain for `T_TRACE` days; store only when explicitly enabled due to size/sensitivity.
  - `meta_record`: retain for the life of the artifact and keep integrity proofs until archival deletion.
  - Note: `T_*` values must be pinned in `/docs/official-docs/EPIC-H/artifact_operational_runbook.md` after legal review.

- Truncation semantics and marking:
  - Truncation allowed when artifacts exceed `MAX_SIZE_{type}`.
  - When truncation occurs:
    - Store the truncated artifact with a `truncated: true` flag in metadata.
    - Include `original_size`, `returned_size`, and `truncation_reason` fields.
    - Compute and store a hash of the original content prefix and of the final stored content; record both in metadata.
    - Do not attempt to reconstruct truncated content; provide clear UI/CLI markers indicating truncation.

- Integrity requirements (hashing & signing guidance):
  - Every stored artifact must have a cryptographic hash recorded in `meta_record` (algorithm to be pinned).
  - For forensic-critical artifacts, sign the `meta_record` with a verification key or equivalent signature mechanism; store signature metadata alongside artifact.
  - Hashes and signatures must be stored in an immutable metadata store separate from mutable artifact blobs.
  - Verification process must be documented (how to recompute hash and verify signature during audits).

- Metadata schema (artifact-metadata JSON schema) — required fields:
  - `artifact_id` (UUID)
  - `lab_session_id` (string)
  - `artifact_type` (enum: runner_log, test_report, file_diff, trace_snapshot, meta_record)
  - `created_at` (ISO8601)
  - `created_by` (worker_id or service)
  - `size_bytes` (integer)
  - `original_size_bytes` (integer, optional, if truncated)
  - `truncated` (boolean)
  - `truncation_reason` (string, optional)
  - `hash` (object: {algorithm, value})
  - `signature` (object: {algorithm, key_id, value}, optional)
  - `retention_expires_at` (ISO8601)
  - `sensitivity_score` (enum/score used for redaction/visibility)
  - `redaction_applied` (boolean)
  - `redaction_summary` (string, optional)
  - `storage_location` (URI or pointer)
  - `indexing_tags` (object)

- Redaction/obfuscation requirements:
  - All artifacts must be scanned for secrets/PII prior to persistent storage.
  - Where secrets/PII are detected, either redact in-band (masking) or strip and store a redaction-summary plus a hash of the original if required by audit.
  - Redaction operations must be deterministic and reversible only to authorized personnel per legal hold procedures.
  - The redaction algorithm and patterns must be documented and validated by Security-Sentinel before rollout.

---

### IMPLEMENTER + SECURITY-SENTINEL + DOC-HISTORIAN TASK BREAKDOWN (PRIORITIZED)

1) Artifact Contract doc (highest priority)
   - Deliverable: `/docs/official-docs/EPIC-H/artifact_contract.md` (authoritative copy of the above contract)

2) Artifact-metadata JSON Schema & examples
   - Deliverable: `/docs/official-docs/EPIC-H/artifact_metadata_schema.md`
   - Must include canonical JSON Schema, example records for each `artifact_type`, and index migration notes.

3) Collector adapter API surface & persistence tasks
   - Deliverable: design doc listing collector interfaces and persistence API: `ingestArtifact(meta, content)`, `getArtifact(artifact_id)`, `listArtifactsBySession(lab_session_id)`, `deleteArtifact(artifact_id)` (with legal-hold checks).
   - Persistence notes: recommended indexes, blob store pointer scheme, and required immutability guarantees.

4) Truncation utility spec & validation checks
   - Deliverable: `/docs/official-docs/EPIC-H/truncation_spec.md`
   - Must define `MAX_SIZE_{type}`, markers for truncated artifacts, and unit/integration checks to validate truncation metadata correctness.

5) Hashing & signing utility spec
   - Deliverable: `/docs/official-docs/EPIC-H/hashing_signing_spec.md`
   - Must define required fields to record, the canonical format for storing hash/signature metadata, verification steps, and how to handle algorithm deprecation.

6) Security review checklist (Security-Sentinel)
   - Deliverable: `/docs/official-docs/EPIC-H/artifact_collection_security.md`
   - Items:
     - Validate redaction rules and false-positive/negative rates
     - Confirm storage access controls and key management for signatures
     - Ensure DLQ/archival paths do not leak secrets
     - Approve retention TTLs and legal-hold flows

7) Documentation & retrieval runbook (Documenter-Historian)
   - Deliverable: `/docs/official-docs/EPIC-H/artifact_operational_runbook.md`
   - Must include: retrieval commands, audit verification steps (hash/signature checks), redaction override procedures, and legal-hold retrieval flows.

8) Integration tests & QA checklist
   - Deliverable: `/docs/official-docs/EPIC-H/integration_test_checklist.md`
   - Tests required:
     - Artifact ingestion + metadata correctness
     - Truncation flagged and metadata fields populated
     - Hash/signature verification end-to-end
     - Redaction rules applied and validated against sample PII/secret patterns
     - Forensic retrieval and legal-hold preservation

---

### OPERATIONAL NOTES OUTLINE (HIGH-LEVEL)

- Migration: create artifact metadata table, blob store pointers, and backfill minimal meta for any existing logs. Plan phased rollout behind feature flag.
- Monitoring & Alerts: growth of artifact storage, truncation-rate spike, redaction-fail rates, signature verification failures, and legal-hold expirations.
- Audits: periodic verification that stored hashes/signatures validate; scheduled forensic export process.
- Retention/Legal-hold: how to place artifacts on legal-hold and override deletion; who can authorize redaction reversal.
- Access control: RBAC for who may view raw artifacts vs redacted summaries.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Exact `T_*` retention values and `MAX_SIZE_{type}` are not specified; legal review required to pin these.
- Choice of hash and signature algorithms (and key management) is not pinned.
- Deterministic redaction rules and approval thresholds for reversible redaction are unspecified.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H7 — Artifact Collection
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md
- Status: ADDED (EXTEND)
- Reason: Gatekeeper brief defining artifact contract, metadata schema, truncation & integrity requirements, and operational runbook needs.

---

Reference: see `/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md` and `/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H7_Artifact Collection.md`.
