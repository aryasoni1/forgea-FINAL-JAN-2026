FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I3 Classification Layer (Session Integrity)
- Exact input files read:
  - /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I3_Classification_Layer*(Session_Integrity).md
  - /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I3*Classification_Layer*(Session_Integrity).md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

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

EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I3_Classification_Layer*(Session_Integrity).md
  - Coverage status: PARTIAL
  - Exact gaps: Recommends `audit-immutability` checklist and needs approved planner task doc; lacks state machine specification and invariants.

- /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I3*Classification_Layer*(Session_Integrity).md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (task doc, state machine, persistence, tests), but contains no task doc link.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to extend:
  - /docs/official-docs/EPIC-I/session_integrity_spec.md — add canonical state machine, JSON Schema for `AuditEvent`, retention and sink choices, and pinned versions for cryptography and WORM storage.
  - /docs/official-docs/EPIC-B/audit_immutable_storage.md — extend with KMS signing requirements and verifier tooling contract.

STUDY GUIDE FOR HUMAN

- Audit Logging (NIST SP 800-92): Why exists — forensic readiness; alternatives — centralized SIEM; When NOT to use — transient debug logs; Common mistakes — mutable audit records, missing sequence numbers.
- Cryptographic signing (RFC 7515): Why exists — non-repudiation; alternatives — proprietary HMACs (less flexible); When NOT to use — internal-only ephemeral logs; Common mistakes — failing to pin verification keys and rotation metadata.
- WORM sinks: Why exists — enforce retention and tamper-resistance; alternatives — replicated DB + backups (weaker evidence); When NOT to use — very short-lived debug traces; Common mistakes — relying only on DB backups for immutability.

INTERNAL DOCS TO ADD OR EXTEND

- /docs/official-docs/EPIC-I/session_integrity_spec.md
  - Purpose: Canonical state machine, JSON Schema for `SessionIntegrity` and `AuditEvent`, guards, and escalation flows.
  - Exact knowledge to add: full state diagram, allowed transitions, JSON Schemas, example audit payloads, verifier CLI contract, operator playbook.
  - Required version pin: Include pinned RFCs and NIST doc references (see Required Official Documentation).

- /docs/official-docs/EPIC-B/audit_immutable_storage.md (EXTEND)
  - Purpose: Define storage sinks, export pipeline, WORM configuration, and KMS signing approach.
  - Exact knowledge to add: S3 Object Lock policy examples, KMS key policy requirements, export validation steps.
  - Required version pin: Vendor docs pinned before implementation.

OPEN QUESTIONS / AMBIGUITIES

- Exact retention windows (hot vs cold vs WORM) and legal retention requirements — blocker.
- Approved KMS/HSM vendor and key rotation cadence — blocker for implementation.
- Whether the archive sink must be multi-region and independently auditable (ledger export) — clarification needed.

MASTER DOCS REGISTRY ACTION

- Append the following entry to `/docs/master_docs.md`:

  Date: 2026-02-14
  - Epic / Feature: EPIC-I / I3 — Classification Layer (Session Integrity)
  - Doc path: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I3*Classification_Layer*(Session_Integrity).md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and required additions for session integrity.
