## G10 Implementer Checklist

Purpose: Exact inputs/outputs, schemas, and acceptance criteria required to implement snapshot upload, immutability, hosting constraints, and audit recording. Schema-level only — no implementation libraries.

INPUTS / API CONTRACTS

1. Create snapshot

- Endpoint: `POST /api/v1/snapshots`
- Request (application/json or multipart envelope):
  - `metadata` (object) — following policy metadata fields:
    - `tenant_id` (string, required)
    - `creator_id` (string, required)
    - `created_at` (string, RFC3339 UTC, required)
    - `source_session_id` (string, optional)
    - `content_hash` (string, required) — hex digest
    - `content_hash_alg` (string, required)
    - `size_bytes` (integer, required)
    - `parts` (array, optional as defined in policy)
    - `retention_tag` (string, required)
    - `legal_hold` (boolean, required)
  - `payload` — binary stream or reference to uploaded binary (implementation choice). If `payload` is streamed, `content_hash` MUST be validated server-side.

- Response:
  - 201 Created: { "snapshot_id": string, "storage_location": string }
  - 400 Bad Request: invalid metadata (missing required fields) — return standard error body with `code` (see below) and `message`.
  - 409 Conflict: duplicate content (snapshot with identical `content_hash` and tenant already exists) — include existing `snapshot_id` in response when available.
  - 422 Unprocessable Entity: content hash mismatch (computed != provided).
  - 503 Service Unavailable: storage provider errors.

2. Read snapshot metadata

- Endpoint: `GET /api/v1/snapshots/{snapshot_id}`
- Response 200: metadata object (fields from policy), 404 if not found, 403 if tenant access denied.

3. List snapshots (schema-level)

- Endpoint: `GET /api/v1/snapshots?tenant_id={tenant}&from={date}&to={date}`
- Response 200: array of metadata summaries.

ERROR / REJECTION CODES (machine-readable)

- `SNAPSHOT_OK` — success; used in audit events for successful creation.
- `SNAPSHOT_INVALID_METADATA` — missing/invalid metadata (maps to HTTP 400).
- `SNAPSHOT_HASH_MISMATCH` — provided content hash does not match computed hash (maps to HTTP 422).
- `SNAPSHOT_DUPLICATE` — identical snapshot already exists (maps to HTTP 409).
- `SNAPSHOT_STORAGE_UNAVAILABLE` — temporary storage failure (maps to HTTP 503).
- `SNAPSHOT_PERMISSION_DENIED` — tenant or principal not authorized (maps to HTTP 403).
- `SNAPSHOT_RETENTION_VIOLATION` — requested retention tag not allowed for tenant (maps to HTTP 400/403).

STORAGE PROVIDER CAPABILITIES (required / acceptable fallbacks)

Required capabilities:

- Write-once immutability or object lock (policy requires write-once semantics during retention window).
- Object versioning (to support recovery and audit evidence).
- Server-side encryption at rest.
- Strong read-after-write consistency.
- Ability to return object version IDs or equivalent opaque identifiers.

Acceptable fallbacks (policy constraints):

- If provider lacks object lock, implementer MUST enable versioning and apply application-side retention enforcement with documented compensating controls; this fallback requires `security-sentinel` signoff.

AUDIT / METADATA RECORD SCHEMA (system DB)

Store one record per snapshot creation attempt with these fields and types (exact names):

- `id` (uuid) — internal event id
- `snapshot_id` (string)
- `tenant_id` (string)
- `creator_id` (string)
- `created_at` (timestamp)
- `request_received_at` (timestamp)
- `storage_location` (string)
- `content_hash` (string)
- `content_hash_alg` (string)
- `size_bytes` (integer)
- `parts` (jsonb, optional)
- `retention_tag` (string)
- `legal_hold` (boolean)
- `status` (string) — one of: `pending`, `completed`, `failed`
- `status_code` (string) — one of the standardized codes above (e.g., `SNAPSHOT_OK`, `SNAPSHOT_HASH_MISMATCH`).
- `error_message` (string, optional)
- `storage_provider_version_id` (string, optional)

Audit event codes to log:

- `SNAPSHOT_CREATE_REQUESTED` — when request received
- `SNAPSHOT_CREATE_VALIDATED` — metadata validated
- `SNAPSHOT_CONTENT_VALIDATED` — content hash verified
- `SNAPSHOT_STORED` — storage acknowledged (include `storage_provider_version_id`)
- `SNAPSHOT_CREATE_FAILED` — final failure (include `status_code`)

INTEGRATION-CHECKER INPUTS & PASS/FAIL CRITERIA

Inputs for the checker (implementer supplies to the integration tool):

- Provider endpoints (e.g., S3 endpoint or storage API base URL)
- Auth method & credential material descriptor (type: e.g., IAM role, service account) — do not submit secrets in docs
- Required permission set to verify (API operations):
  - PutObject/WriteObject
  - GetObject/ReadObject
  - ListObjects
  - DeleteObject (for admin tests only)
  - GetObjectVersion / Versioning APIs
  - ObjectLock/GetRetention (if supported)

Pass/fail criteria:

- PASS if all required capabilities respond as expected and a write-read-validate cycle succeeds: create object, read object, verify content hash, and obtain version ID.
- FAIL if provider does not return stable version identifiers, does not support server-side encryption, or strong read-after-write cannot be demonstrated.
- WARNING if provider lacks object lock but supports versioning — acceptable only with documented compensating controls and `security-sentinel` approval.

IMPLEMENTER ACCEPTANCE CRITERIA (end-to-end)

- Automated test: POST a snapshot with metadata and payload; the API must return 201 and a `snapshot_id` whose object exists at `storage_location` and whose computed hash matches recorded `content_hash`.
- Audit record exists in system DB with `status=completed` and `status_code=SNAPSHOT_OK`.
- If duplicate `content_hash` exists for same tenant, API returns 409 and references existing `snapshot_id` and audit record shows `SNAPSHOT_DUPLICATE`.
- Provider integration-checker must PASS per criteria above.

End of implementer checklist.
