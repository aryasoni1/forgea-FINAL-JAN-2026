### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D3 — Knowledge Ingestion
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For safe implementation the following external sources must be referenced and version-pinned. If a version is not known it MUST be pinned before implementation.

- Technology: Robots Exclusion / Crawl rules
  - Concept: robots.txt / crawl etiquette
  - Official source: https://www.robotstxt.org/
  - Exact version requirement: LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines what domains/pages may be crawled and how to respect site owners.
  - Decision informed: Allowed domain list, seed rules, and crawler behavior.
  - What breaks without it: Risk of illegal or disallowed scraping, IP blocks, and legal exposure.

- Technology: HTTP fetch semantics
  - Concept: HTTP status handling, caching, and headers
  - Official source: RFC 7231 (HTTP/1.1 Semantics) — https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Correctly detect redirects, rate-limit responses, and idempotency for retries.
  - Decision informed: Backoff, retry strategy, and provenance header capture.
  - What breaks without it: Incorrect retry/backoff, poor provenance, corrupted ingests.

- Technology: Object storage API (if chosen)
  - Concept: S3-compatible object storage semantics
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Storage format, multipart upload limits, and authorization model.
  - Decision informed: Raw blob storage choice, retention/archival policy, and cost estimates.
  - What breaks without it: Misconfigured storage, data loss, or excessive costs.

- Technology: OWASP Input Validation / Sanitization
  - Concept: Input sanitization and content safety guidance
  - Official source: https://cheatsheetseries.owasp.org/
  - Exact version requirement: LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Rules for sanitizing fetched HTML, attachments, and metadata.
  - Decision informed: Sanitization pipeline, threat model mitigations, and allowed transformations.
  - What breaks without it: Vulnerabilities to XSS, malicious payloads, or unsafe downstream embeddings.

- Technology: Chroma (Vector DB) & Embedding provider guidance
  - Concept: Embedding metadata contract and ingestion invariants
  - Official source: Chroma docs (https://www.trychroma.com/) and embedding provider docs (e.g., OpenAI)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Downstream contract for chunk metadata, provenance fields, and storage format.
  - Decision informed: Normalizer output format and adapter contract for D4.
  - What breaks without it: Failed integration with D4 (vector DB), lost provenance, or incorrect retrieval.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md
  - Coverage status: PARTIAL
  - Exact gaps: Provides orchestration and agent prompts but no pinned external doc versions or storage spec.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists required tasks and code locations, no implementation or schema artifacts.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B (audit/logging, rate-limit guidance)
  - Coverage status: PARTIAL
  - Exact gaps: Useful constraints (rate-limits/audit) but lacks a trusted-source registry, metadata schema, and storage spec for D3.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scout identifies missing implementation and security artifacts but is not authoritative guidance.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-D/trusted_sources.md` — add whitelist, acceptance criteria, and governance.
- `/docs/official-docs/EPIC-D/ingestion-operational-guidelines.md` — add crawling constraints, rate-limit/backoff rules, robots.txt handling, and allowed domains.
- `/docs/official-docs/EPIC-D/ingestion-metadata-schema.md` — add exact provenance fields, checksum rules, and crawler-version pin.
- `/docs/official-docs/EPIC-D/raw-reference-storage-spec.md` — storage choice (S3 vs DB), retention policy, access controls, and cost model.
- `/docs/official-docs/EPIC-D/security-ingestion-threat-model.md` — threat model, sanitization rules, scanning requirements.

### STUDY GUIDE FOR HUMAN

- `Robots.txt`: Why — defines allowed crawl scope. Alternatives — manual API integration when available. When NOT to use — don't ignore robots.txt. Common mistake — treating robots.txt as a legal safe-harbor (it’s an etiquette/contract; legalities may differ).
- `HTTP fetch & retry semantics`: Why — avoid duplicate/partial fetches and respect server load. Alternatives — provider APIs or feeds. When NOT to use — low-latency API endpoints where polling is forbidden. Common mistake — aggressive retry causing rate-limit bans.
- `Object storage vs DB`: Why — object stores are cheaper for large blobs; DBs easier for small, transactional storage. Alternatives — hybrid (store blobs in object store, metadata in DB). When NOT to use — storing large raw blobs in relational DB. Common mistake — ignoring cost of egress and archival.
- `Sanitization (OWASP)`: Why — fetched content may contain scripts or payloads. Alternatives — rely on HTML-to-text pipelines with strict whitelists. When NOT to use — trusting upstream sanitized HTML. Common mistake — removing provenance headers or losing source fidelity during sanitization.
- `Chroma & embeddings contracts`: Why — informs chunk metadata and retrieval fidelity. Alternatives — other vector DBs (Pinecone, Milvus). When NOT to use — ad-hoc metadata shapes; standardize fields. Common mistake — omitting source URL/checksum/provenance from embedding metadata.

### INTERNAL DOCS TO ADD OR EXTEND

(under `/docs/official-docs/EPIC-D/`)

- `/docs/official-docs/EPIC-D/trusted_sources.md`
  - Purpose: Canonical whitelist + acceptance criteria for adding sources
  - Exact knowledge to add: allowed domains, editorial review process, evidence requirements, revocation policy
  - Required version pin: N/A (internal)

- `/docs/official-docs/EPIC-D/ingestion-operational-guidelines.md`
  - Purpose: Rules for crawler (rate-limits, backoff, robots.txt, headers, user-agent)
  - Exact knowledge to add: default rate-limits, exponential backoff policy, seed rules, allowed content types
  - Required version pin: N/A (internal)

- `/docs/official-docs/EPIC-D/ingestion-metadata-schema.md`
  - Purpose: Formal metadata schema for raw references
  - Exact knowledge to add: `source_url`, `fetch_timestamp`(ISO8601), `http_headers`, `checksum`(sha256), `inferred_content_type`, `crawler_version`, `tags`, `provenance_id`
  - Required version pin: schema v1

- `/docs/official-docs/EPIC-D/raw-reference-storage-spec.md`
  - Purpose: Storage choice, retention, archival policy, cost model, access controls
  - Exact knowledge to add: chosen backend (S3-compatible vs Postgres JSONB), lifecycle rules, encryption-at-rest and access IAM roles
  - Required version pin: N/A (internal)

- `/docs/official-docs/EPIC-D/security-ingestion-threat-model.md`
  - Purpose: Threat model and sanitization rules
  - Exact knowledge to add: inputs that must be scanned, sanitization whitelist, antivirus pipeline, allowed binaries, CI steps for sample payloads
  - Required version pin: N/A (internal)

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Where should raw reference blobs be persisted: object store (S3-compatible) vs database column? (Needed to finalize storage-spec and cost model.)
- Which embedding provider and Chroma version will D4 target? Exact versions required to pin adapter contract.
- Which legal/jurisdiction constraints apply to crawling third-party documentation (DMCA or regional data rules)?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D3 — Knowledge Ingestion
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D3_Knowledge Ingestion.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief produced to enumerate required official docs and internal doc gaps for ingestion.

---

End of brief.
