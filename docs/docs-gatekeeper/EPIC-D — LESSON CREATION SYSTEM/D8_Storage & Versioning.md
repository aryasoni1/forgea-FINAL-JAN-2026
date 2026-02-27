### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D8 — Storage & Versioning
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

For safe implementation the following external sources must be referenced and version-pinned. If a version is unknown it MUST be pinned before implementation.

- Technology: PostgreSQL (JSONB semantics)
  - Concept: JSONB storage, indexing, and JSON operators
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: PostgreSQL 18.1 (per registry)
  - Why required: Defines storage primitives for lesson metadata, indexing strategies, and migration patterns.
  - Decision informed: Choice between JSONB-first vs object-store-first designs, index strategy, and query performance trade-offs.
  - What breaks without it: Poorly performing queries or incompatible schema decisions.

- Technology: Object storage API (S3-compatible)
  - Concept: Blob storage semantics, lifecycle, multipart uploads
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: If using object store for content, informs lifecycle and retention implementation.
  - What breaks without it: Incorrect storage setup, unexpected costs, or data loss on large uploads.

- Technology: Backup & Restore best practices
  - Concept: Backup frequency, point-in-time recovery, and restore testing
  - Official source: PostgreSQL backup docs and cloud provider guidance (pin specific provider docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures ability to recover immutable versions and meet retention requirements.
  - What breaks without it: Data loss, inability to rollback, or failed compliance audits.

- Technology: Data Retention & Compliance (legal guidance)
  - Concept: Retention windows, deletion/archival procedures, and legal holds
  - Official source: Organization legal policy or external compliance standards (GDPR, CCPA) — PIN REQUIRED
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Dictates retention, archival, and deletion behavior for lesson content.
  - What breaks without it: Non-compliance, legal risk, or conflicting retention behaviors.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md
  - Coverage status: PARTIAL
  - Exact gaps: Execution plan and agents present, but no pinned storage decisions or schema artifacts.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Lists tasks 45–49 but no implementation details or acceptance criteria.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing storage model, versioning semantics, migration patterns, and security specifics.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-D/storage-model.md` — canonical storage model, DB schema examples, and content-store shape.
- `/docs/official-docs/EPIC-D/versioning-semantics.md` — explicit rules for creating versions, addressing, and retrieval APIs.
- `/docs/official-docs/EPIC-D/migration-patterns.md` — repository and migration conventions for immutable content and CI checks.
- `/docs/official-docs/EPIC-D/retention-and-backup.md` — backup strategy, retention windows, archival, legal-holds, and restore testing.
- `/docs/official-docs/EPIC-D/security-storage.md` — encryption-at-rest, ACLs, KMS usage, and access roles.

### STUDY GUIDE FOR HUMAN

- `DB-first (Postgres JSONB)`: Why — strong query capabilities and transactional guarantees; Alternatives — object-store-first for large binary content. When NOT to use — very large binary blobs or extreme retention costing. Common mistake — storing large binary payloads in JSONB causing bloat.
- `Object-store-first`: Why — cost-effective for large content and efficient lifecycle rules; Alternatives — hybrid (store blobs in object store, metadata in DB). When NOT to use — when frequent small updates require transactional consistency. Common mistake — losing strong consistency guarantees for version metadata.
- `Immutable versioning patterns`: Why — preserve history and allow deterministic rollbacks. Alternatives — soft-deletes or version tables. When NOT to use — when storage costs are prohibitive without archival. Common mistake — failing to version references (links to labs/tracks) causing broken links on rollbacks.
- `Migration & CI checks`: Why — ensure schema evolution is safe for append-only data. Alternatives — strict freeze + migration windows. Common mistake — naive destructive migrations on versioned content.
- `Backup & Restore`: Why — must validate restores regularly. Alternatives — rely on provider snapshots (verify periodically). Common mistake — assuming backups exist without restore tests.

### INTERNAL DOCS TO ADD OR EXTEND

(under `/docs/official-docs/EPIC-D/`)

- `/docs/official-docs/EPIC-D/storage-model.md`
  - Purpose: Canonical DB schema and content-store shape with example records
  - Exact knowledge to add: `lessons` table schema, `lesson_versions` table, example JSONB shape, indexing strategy, and example queries
  - Required version pin: storage model v1

- `/docs/official-docs/EPIC-D/versioning-semantics.md`
  - Purpose: Rules for version creation, addressing (UUID vs content-addressed), and read APIs
  - Exact knowledge to add: API endpoints (GET /lessons/:id, GET /lessons/:id/versions/:vid), versioning guarantees, immutability rules
  - Required version pin: v1

- `/docs/official-docs/EPIC-D/migration-patterns.md`
  - Purpose: Repository and CI migration conventions for immutable content
  - Exact knowledge to add: Migration steps, non-destructive patterns, CI checks, canary migrations, and rollback steps
  - Required version pin: v1

- `/docs/official-docs/EPIC-D/retention-and-backup.md`
  - Purpose: Retention, archival, backup schedules, and restore tests
  - Exact knowledge to add: Retention windows, archival to cold storage, restore runbooks, and legal-hold procedures
  - Required version pin: v1

- `/docs/official-docs/EPIC-D/security-storage.md`
  - Purpose: Access controls, encryption, KMS usage, and ACL roles for storage
  - Exact knowledge to add: IAM roles, CMK policies, who can delete/retire versions, and audit logging requirements
  - Required version pin: v1

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Primary storage medium: Postgres JSONB vs object store (S3-compatible)? Decision required to finalize storage-model and retention cost model.
- Retention policy specifics: required retention windows and legal-hold behavior (GDPR/CCPA considerations).
- Who will own Data Retention & Compliance responsibilities (agent exists or new owner needed)?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D8 — Storage & Versioning
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D8_Storage & Versioning.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief produced to enumerate required official docs and internal doc gaps for storage and versioning.

---

End of brief.
