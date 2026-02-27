## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G10 — Snapshot Artifact Handling
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G10_Snapshot_Artifact_Handling.md

---

## SNAPSHOT ID FORMAT

Canonical ID: snapshot-{tenant}.{YYYYMMDD}T{hhmmss}Z.{content-hash[:alg]}{.partNN}

- Syntax (ABNF-like):
  - tenant: 1..64 chars; allowed charset: [a-z0-9]([-._][a-z0-9])\* (lowercase DNS-style)
  - YYYYMMDD: 8 digits (UTC date)
  - hhmmss: 6 digits (UTC time)
  - content-hash: hex digest of canonical content (lowercase hex)
  - alg: short algorithm identifier (e.g., sha256) — required when not the default
  - partNN: optional part suffix for multi-part snapshots (part01, part02, ...)

- Example: snapshot-acme.20260214T153045Z.3b7f5e9c0a2d4f8e6a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3

Rules:

- IDs are ASCII, 0x20 disallowed; maximum length 255 characters.
- IDs must be stable and collision-resistant within a tenant.
- The `content-hash` must match the chosen canonical hashing rules below.

---

## CANONICAL HASHING RULES

Primary algorithm: SHA-256 (hex lowercase) — denoted `sha256`.

Canonicalization steps (apply deterministically before hashing):

- For directory snapshots: produce a deterministic manifest listing all files with paths sorted lexicographically (UTF-8 byte order), include file mode (e.g., regular/file/dir), file size, and a per-file content hash (sha256) computed over the raw file bytes. Use LF (\n) for manifest line endings.
- For archive snapshots (single-stream): the archive producer MUST produce a deterministic byte stream (e.g., canonical TAR with stable timestamps zeroed) before hashing. The hashing input is the raw bytes of that canonical stream.
- For multi-part snapshots: compute per-part sha256 digests and a top-level manifest containing parts in order and their sha256 digests; the snapshot `content-hash` is the sha256 of the concatenation of per-part binary streams in declared order (or of the manifest, if specified by policy).

Representation and algorithm migration:

- Always record algorithm identifier in metadata as `content_hash_alg` (e.g., `sha256`).
- New algorithms may be introduced; legacy consumers must continue to accept existing `sha256` entries. Migration requires a documented dual-write window: store both legacy and new-algo digests in metadata during migration.

---

## STORAGE NAMESPACE & PATH SCHEMA

Bucket / container naming (high-level):

- Bucket name: forgea-snapshots-{env} (or tenant-specific when isolation required). Bucket names follow provider rules.

Object key pattern:

- {tenant}/{year}/{month}/{day}/{snapshot-id}
- Example key: acme/2026/02/14/snapshot-acme.20260214T153045Z.3b7f5e9c...

Tenant/session scoping:

- The object key MUST include `tenant` as the first path component to allow per-tenant listing and ACL scoping.

Immutability contract (policy-only):

- Snapshots are write-once for the lifetime of the retention period. Once a snapshot object is successfully acknowledged as created (per implementer acceptance criteria), it MUST be treated as immutable.
- Storage provider requirements (policy expectations): support for object immutability or equivalent (object lock/write-once), or server-side versioning with retention/lock semantics.
- Providers must support strong read-after-write consistency for newly created snapshot objects.

---

## REQUIRED SNAPSHOT METADATA (FIELDS & TYPES)

- `snapshot_id` (string) — canonical ID defined above.
- `tenant_id` (string) — tenant namespace owner.
- `creator_id` (string) — principal that initiated snapshot (opaque internal user ID). Do NOT store email in this field.
- `created_at` (string, RFC3339 UTC timestamp)
- `source_session_id` (string, optional) — session or attempt that produced the snapshot.
- `content_hash` (string) — hex digest value matching `content_hash_alg`.
- `content_hash_alg` (string) — algorithm identifier, e.g., `sha256`.
- `size_bytes` (integer)
- `parts` (array of objects, optional) — for multi-part: [{"part_index": integer, "part_size": integer, "part_hash": string}]
- `retention_tag` (string) — policy tag (e.g., `default`, `short-term`, `legal-hold`)
- `legal_hold` (boolean)
- `storage_location` (string) — canonical object key or URL
- `manifest_blob` (string, optional) — object key to the manifest file (if separate)
- `signature` (string, optional) — opaque integrity signature if a higher-level signature is applied (policy allows but does not mandate format)

PII constraints:

- `creator_id` MUST be an opaque internal identifier; logs and metadata MUST NOT persist raw user email addresses or OAuth tokens.

---

## RETENTION, PURGE, & LEGAL-HOLD POLICIES (POLICY ONLY)

Retention windows (policy defaults):

- `default`: 365 days
- `short-term`: 90 days
- `legal-hold`: indefinite until explicit release

Purge triggers and approvals:

- Expiration: snapshots with `retention_tag` `default` or `short-term` may be purged after window expiry by automated job; purge MUST record evidence (snapshot_id, purge_timestamp, operator_id/system_job_id).
- Manual purge: requires dual-approval (operator + compliance) for snapshots older than 90 days that are not on `legal_hold`.
- Legal hold: `legal_hold=true` prevents automated purge and requires `legal_release` documented and approved.

---

## ROLLBACK & RECOVERY OUTLINE (POLICY)

High-level plan for accidental deletion:

- Roles: `operator-oncall`, `storage-admin`, `legal-contact`.
- Required artifacts to recover: `snapshot_id`, `storage_location`, `creation_evidence` (audit event ID and created_at), and provider object version ID if available.
- Steps (policy-level):
  1. Log incident and open recovery ticket referencing `snapshot_id` and evidence.

2.  Storage-admin reviews provider backups/versioning and attempts object restoration using provider recovery tools.
3.  If provider cannot restore, consult archival backups (cold storage) using recorded `storage_location` and `content_hash` to validate integrity after restore.
4.  Confirm integrity by recomputing canonical hash and comparing to recorded `content_hash`.

- Targets (policy): RTO: 24 hours; RPO: 1 hour for primary backup window. These are targets and require operational runbooks to meet.

---

End of G10 snapshot policy (definition-only).
