# FEATURE DOCS BRIEF: J7 — Lesson → Lab Transition UX

## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J7 — Lesson → Lab Transition UX
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J7_Lesson → Lab Transition UX.md
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-admin (compiled assets /next traces)
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-lessons (compiled assets /next traces)
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md

---

1. Gate Conditions

- Required conditions (each must be true before server grants lab-entry):
  - Lesson Completion: `lesson_progress.completed == true` OR required checklist items satisfied. Enforcement: both client-side (UX) and server-side (authoritative check).
  - Minimum Review Time: optional `min_time_seconds` in frontmatter or lesson manifest (e.g., 60s). Enforcement: client-side soft timer + server-side tolerance check (server may require `client_reported_duration` and compare to threshold within tolerances).
  - Acknowledgement Attestation: user must submit required acknowledgement text and checkbox. Enforcement: server-side required (persisted event) and client-side gating UI.
  - Allowed Files Acknowledgement: user must confirm the listed allowed files for the lab. Enforcement: both; server-side verifies acknowledgement exists before allowing lab-entry.
  - No Pending Lockouts: user must not be in any hard lock or policy block. Enforcement: server-side only.

2. Transition Screen Layout & Content (wireframe — text)

- Header: "Ready to enter the lab?"
- Objective section: one-sentence lesson objective pulled from lesson `summary`.
- Required Checklist: bullet list of gate items (completion, time-on-page, allowed-files). Each item shows status (check/required).
- Allowed Files: collapsible list with file path patterns and size hints.
- Acknowledgement block:
  - Checkbox label (exact wording): "I confirm I have completed the lesson and understand the lab constraints and allowed files listed above."
  - Freeform acknowledgement textarea (optional) prefilled with required attestation text if product/legal requires it.
  - Primary action: `Enter Lab` (disabled until acknowledgement checked and server-side acknowledgement persisted).
- Accessibility: ensure proper heading hierarchy, ARIA labels for checklist and allowed-files list, keyboard focus on the acknowledgement checkbox, visible focus indicators, and color contrast >= WCAG AA.

3. Acknowledgement Event Schema (JSON Schema)

{
"$schema": "https://json-schema.org/draft/2020-12/schema",
"title": "LessonAcknowledgement",
"type": "object",
"required": ["user_id","lesson_id","lab_id","ack_text","timestamp","client_version","ack_hash"],
"properties": {
"user_id": {"type":"string","format":"uuid","description":"User UUID (auth identity)"},
"lesson_id": {"type":"string","description":"Lesson authoritative id (frontmatter `id`)"},
"lab_id": {"type":"string","description":"Target lab identifier"},
"ack_text": {"type":"string","maxLength":2000,"description":"Attestation text presented to user"},
"client_version": {"type":"string","description":"Client app version string"},
"ip_address": {"type":"string","format":"ipv4-or-ipv6","description":"Optional: captured IP address if policy allows"},
"timestamp": {"type":"string","format":"date-time","description":"ISO 8601 UTC when ack recorded"},
"ack_hash": {"type":"string","description":"Server-calculated SHA256 hex of canonical ack payload for immutability/proof"},
"signature": {"type":"string","description":"Optional: cryptographic signature of ack_hash if device-signed"}
}
}

Field notes: `ack_hash` is computed server-side as SHA256 of canonical fields (user_id, lesson_id, lab_id, ack_text, timestamp) to provide a compact proof stored immutably. `signature` is optional and used only if advanced proof is required.

4. Allowed Files List Schema (JSON Schema) + example

{
"$schema": "https://json-schema.org/draft/2020-12/schema",
"title": "AllowedFilesList",
"type": "object",
"required": ["lesson_id","allowed_files"],
"properties": {
"lesson_id":{"type":"string"},
"allowed_files":{
"type":"array",
"items":{
"type":"object",
"required":["path_glob","max_size_bytes","allowed_extensions"],
"properties":{
"path_glob":{"type":"string","description":"glob pattern relative to lab root"},
"max_size_bytes":{"type":"integer","minimum":0},
"allowed_extensions":{"type":"array","items":{"type":"string"}},
"note":{"type":"string"}
}
}
}
}
}

Example allowed-files payload:

{
"lesson_id": "a0f3c9e4-1b9a-4b2e-8f3c-7e2b9d7fa123",
"allowed_files": [
{"path_glob":"src/\*_/_.js","max_size_bytes":1048576,"allowed_extensions":[".js",".mjs"],"note":"Source files only"},
{"path_glob":"README.md","max_size_bytes":65536,"allowed_extensions":[".md"]}
]
}

5. API Contract (server-side)

- POST /api/lessons/{lesson_id}/acknowledgements
  - Auth: Bearer token (must map to `user_id`) and CSRF protection for browser clients.
  - Request body: `LessonAcknowledgement` (JSON) as defined above. `ip_address` may be omitted by client; server may populate from request.
  - Response: 201 Created
    - Body: {"status":"created","ack_id":"<uuid>","ack_hash":"<hex>","commit":"<db_commit_ref>"}
  - Errors: 400 (validation), 401 (unauthenticated), 403 (user not allowed), 409 (duplicate ack for same user/lesson/version), 429 (rate limit)

- GET /api/lessons/{lesson_id}/acknowledgements?user_id={user_id}
  - Auth: service-to-service or user-scoped token. Returns list of ack events for the user and lesson.

- Server-side enforcement rule: Lab-entry endpoints MUST require a server check that an acknowledgement record exists and is valid for the requested `lesson_id` and `lab_id`. If not present, return 403 Forbidden.

6. Persistence & Audit (DB table recommendations)

- Table: `lesson_acknowledgements`
  - Columns:
    - `id` UUID PRIMARY KEY
    - `user_id` UUID NOT NULL
    - `lesson_id` UUID NOT NULL
    - `lab_id` UUID NOT NULL
    - `ack_text` text NOT NULL
    - `ack_hash` varchar(64) NOT NULL
    - `signature` text NULL
    - `client_version` varchar(64)
    - `ip_address` inet NULL
    - `created_at` timestamptz NOT NULL DEFAULT now()
    - `created_by` varchar(64) NOT NULL -- service or actor
  - Constraints:
    - UNIQUE (`user_id`,`lesson_id`,`lab_id`,`ack_hash`) to avoid duplicates
  - Audit/immutability:
    - Records are append-only; updates are disallowed (soft-reverts via a new record with `revoked_by` metadata if needed).

- Ownership decision (planner guidance): prefer storing acknowledgements in the primary transactional DB owned by the service handling lab-entry (monorepo backend). `services/content-engine/` is Python-only per its README and should NOT be extended with Node logic. If persistence must be in `content-engine`, implementer must coordinate cross-runtime API contracts. Questions to decide ownership: who owns auth tokens for lab-entry, where is primary lab-entry business logic hosted, and which team owns DB migration privileges?

7. Security Requirements (checks & where to run)

- Authenticate & authorize: server must verify bearer token maps to `user_id` and that the user has permission to enter the lab. (Run server-side.)
- Rate-limit ack creation per `user_id` and IP (server-side).
- Validate request body against schema and reject unexpected fields (server-side).
- Prevent client-side bypass: lab-entry endpoint must check persisted ack record and not rely on client-sent flags (server-side).
- Tamper-evidence: store `ack_hash` and optionally `signature`. Use DB write-audit logs and append-only tables for immutability (server-side). Optionally mirror `ack_hash` to an append-only ledger or secure audit store.
- Sensitive data: avoid storing full IP unless policy allows; when stored, treat as PII and redact/expire per retention policy.

8. QA Acceptance Criteria

- Given no acknowledgement for user+lesson, request to lab-entry endpoint returns 403.
- After successful POST acknowledgement, lab-entry request for same user+lesson returns 200.
- POST ack with invalid schema returns 400 and no DB record is created.
- Duplicate identical ack attempts within short window are deduplicated (409 or idempotent OK) and do not create multiple records.
- A change to published lesson that requires new ack rejects old ack (versioned ack enforcement).

9. Implementation Artifacts for Implementer (enumerated)

- UI: `apps/forgea-lessons/app/lessons/[lesson]/transition/page.tsx` (transition screen rendering and client-side checks)
- Admin: `apps/forgea-admin/components/lesson-ack-config.tsx` (configure min_time_seconds, allowed_files list)
- API: `services/lessons-api/src/routes/acknowledgements.ts` (POST/GET endpoints)
- DB migration: `infra/postgres/migrations/xxxx_create_lesson_acknowledgements.sql` (DDL for `lesson_acknowledgements` table)
- Tests: `apps/forgea-lessons/tests/transition.spec.ts` and `services/lessons-api/tests/acknowledgements.spec.ts`
- CI: `ci/checks/acknowledgement-schema-validation.yml` (schema validation step)
- Docs: `/docs/official-docs/EPIC-J/lesson-acknowledgements.md` (API contract + schemas)

10. Minimal Example Payloads

- Example acknowledgement POST body:

{
"user_id":"d3b07384-d9d1-4b1a-8e1c-1234567890ab",
"lesson_id":"a0f3c9e4-1b9a-4b2e-8f3c-7e2b9d7fa123",
"lab_id":"f1e2d3c4-5678-90ab-cdef-111111111111",
"ack_text":"I confirm I completed the lesson and will not share solutions.",
"client_version":"forgea-lessons@1.2.3",
"timestamp":"2026-02-14T12:00:00Z"
}

- Example allowed-files JSON (see schema above):

{
"lesson_id":"a0f3c9e4-1b9a-4b2e-8f3c-7e2b9d7fa123",
"allowed_files":[{"path_glob":"src/\*_/_.py","max_size_bytes":524288,"allowed_extensions":[".py"],"note":"Starter files only."}]
}

---

References used from repo context:

- Presence of `apps/forgea-admin` lesson manager (compiled traces) — surface for admin config.
- Presence of `apps/forgea-lessons` public lesson UI (compiled traces) — place to add transition screen.
- `forgea-monorepo/services/content-engine/README.md` — Python-only constraint; do not add Node runtime there without coordination.

Decision rationales (3–5 bullets each):

- Server-side enforcement rationale:
  - Prevents client-side bypass; authoritative checks live with lab-entry API.
  - Allows consistent access control, rate-limiting, and audit logging.
  - Server can enforce versioned ack semantics and tie to DB transactionality.

- Persistence location rationale:
  - Primary transactional DB is recommended for atomic checks with lab-entry and for auditability.
  - `content-engine/` is Python-only and isolated; using it would create cross-runtime coordination unless content-engine already owns lab-entry logic.
  - Git-based storage is insufficient for acknowledgement events which require per-user append-only records and searchability.

- Auditability rationale:
  - Append-only records with `ack_hash` provide tamper-evidence and easy reconciliation.
  - Unique constraints and immutability rules reduce duplication and provide clear provenance.
  - Mirroring critical proofs to a secure audit store reduces risk of DB tampering.

Open decisions for Product / Security / Legal (must be answered before implementation):

- Exact ack wording required for legal compliance (copy to show on screen).
- Is capturing/storing `ip_address` allowed under privacy policy and which retention period applies?
- Which team owns the DB and migration privileges for the `lesson_acknowledgements` table (content-engine vs lessons service vs central infra)?

---

MASTER DOCS REGISTRY ACTION

Append to `/docs/master_docs.md`:

- docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J7_Lesson → Lab Transition UX.md — Planner spec: gate conditions, API contract, schemas, persistence and audit recommendations.

End of brief.
