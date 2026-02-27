# FEATURE DOCS BRIEF — E10: Versioning and Immutability

## FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E10 — Versioning and Immutability
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E10_Versioning_and_Immutability.md
  - /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E10*Versioning_and_Immutability.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

## REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Semantic Versioning
   - Concept: Version assignment rules and compatibility semantics for published lab artifacts
   - Official source: https://semver.org/spec/v2.0.0.html
   - Exact version requirement: 2.0.0
   - Why required: Defines how to signal breaking vs non-breaking changes in lab schema/published artifacts and drives migration policies.
   - What decision it informs: Version numbering, publish gating, migration workflows, and client compatibility checks.
   - What breaks without it: Risk of incompatible changes, unclear migration expectations, and accidental breaking deployments.

2. Technology: JSON Schema
   - Concept: Schema for publish metadata and version records (machine-validation)
   - Official source: https://json-schema.org/specification-links.html
   - Exact version requirement: 2020-12
   - Why required: Provides precise validation contract for publish records, preventing divergent interpretations across services.
   - What decision it informs: API payload validation, DB schema mapping, and CI enforcement inputs.
   - What breaks without it: Inconsistent record formats and validation gaps across implementers.

3. Technology: JSON Web Signature (JWS)
   - Concept: Immutable-claim signatures for publish proofs / immutability attestations
   - Official source: RFC 7515 (JWS) — https://datatracker.ietf.org/doc/html/rfc7515
   - Exact version requirement: RFC 7515 (2015)
   - Why required: Standard, interoperable method to cryptographically sign publish records or version snapshots.
   - What decision it informs: Choice of signature format and verification flow for immutability proofs.
   - What breaks without it: No standard proof format; harder cross-system verification and weaker auditability.

4. Technology: Content-Addressed Storage / CID semantics
   - Concept: How immutable blobs are referenced by content hash (for lab snapshots and artifacts)
   - Official source: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (e.g., multiformats CID spec)
   - Why required: Guarantees immutable addressing semantics and deduplication behavior for snapshot storage.
   - What decision it informs: Storage layout, deduplication policy, and retrieval/garbage-collection semantics.
   - What breaks without it: Non-deterministic addressing, risk of silent mutations, and storage/GC ambiguity.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E10_Versioning_and_Immutability.md
  - Coverage status: PARTIAL
  - Exact gaps: Analysis and orchestrator prompts present; missing machine-usable schemas, publish API contract, and audit/signature guidance.

- /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E10*Versioning_and_Immutability.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts (policy doc, publish endpoint, tests) but does not provide the JSON Schema or signature example.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs/EPIC-E/versioning_policy.md` — formal versioning rules and SemVer mapping.
- `/docs/official-docs/EPIC-E/publish_api_schema.md` — JSON Schema + TypeScript interfaces for publish payloads and version records.
- `/docs/official-docs/EPIC-E/audit_and_signatures.md` — JWS signing guide, storage of signatures, and verification steps.
- `/docs/official-docs/EPIC-E/content_addressing.md` — chosen CID/glob/pathspec guidance and storage implications (MUST PIN grammar/spec).

## STUDY GUIDE FOR HUMAN

- SemVer 2.0.0: Why — formalizes breaking vs non-breaking changes; Alternatives — CalVer (not ideal for API compatibility); Common mistakes — not aligning schema changes to SemVer expectations.
- JSON Schema 2020-12: Why — machine validation of publish metadata; Alternatives — Protobuf/OpenAPI (may be heavier); Common mistakes — leaving `additionalProperties` open or not pinning schema version.
- JWS (RFC 7515): Why — standard signed attestations; Alternatives — OpenPGP, raw hash + detached signatures; Common mistakes — signing mutable fields or not versioning keys.
- Content-addressing: Why — immutable storage referencing by content digest; Alternatives — opaque object ids (less deterministic); Common mistakes — mixing content-addressed and mutable paths without clear mapping.

## INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-E/versioning_policy.md
   - Purpose: Formal version assignment rules, uniqueness guarantees, and migration expectations.
   - Exact knowledge to add: SemVer mapping for schema vs content changes, policy for hotfixes and deprecation windows, and suggested retention/compatibility windows.
   - Required version pin: SemVer 2.0.0.

2. Path: /docs/official-docs/EPIC-E/publish_api_schema.md
   - Purpose: Machine-usable JSON Schema (2020-12) and TypeScript interfaces for publish API and version records.
   - Exact knowledge to add: Full schema, example payloads, error responses, and the `publish` endpoint contract.
   - Required version pin: JSON Schema 2020-12.

3. Path: /docs/official-docs/EPIC-E/audit_and_signatures.md
   - Purpose: Signing/verification guidance for immutability proofs and required audit fields to store.
   - Exact knowledge to add: JWS usage recommendations, key rotation guidance, storage of signed claims, and verification examples.
   - Required version pin: RFC 7515 (JWS).

4. Path: /docs/official-docs/EPIC-E/content_addressing.md
   - Purpose: Capture chosen content-addressing spec (CID version, hash algorithm) and mapping to storage backend.
   - Exact knowledge to add: Exact CID/version, canonical hashing algorithm, and GC/retention implications.
   - Required version pin: CID/CAS spec (MUST BE PINNED).

## OPEN QUESTIONS / AMBIGUITIES

- Which signature scheme do implementers prefer for immutability proofs? (JWS chosen as recommended, confirm acceptance.)
- Which content-addressed scheme (CID v1 / multiformats) or storage backend will be used? MUST PIN.
- Retention and legal-hold windows for published versions — who sets policy (legal/product)?

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E10 — Versioning and Immutability
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E10_Versioning_and_Immutability.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for versioning, publish workflow, and immutability proofs.

End of brief.
