## FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F8 — Push Tracking & Audit
- Exact input files read:
  - /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md
  - /apps/forgea-labs/app/api/webhooks/github/route.ts
  - /packages/audit/src/audit.service.ts
  - /packages/schema/prisma/schema.prisma

---

## REQUIRED OFFICIAL DOCUMENTATION

1) Technology: GitHub Webhooks & Events
   - Concept: Webhook delivery semantics, headers (including `X-GitHub-Delivery`), event payload shapes (push event)
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines idempotency key, header names, payload JSON paths used to extract `commitSha` and changed files.
   - What decision it informs: Which header is authoritative for deduplication; required fields to record; retry semantics.
   - What breaks without it: Risk of using the wrong idempotency key, mis-parsing payloads, and unsafe deduplication.

2) Technology: GitHub Webhook Event Payload — Push
   - Concept: Exact push event payload structure (commits array, head_commit id, added/modified/removed lists)
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Precise JSON paths for `commitSha` and changed-files lists to persist per-push attempt.
   - What decision it informs: Data extraction rules and which fields are optional vs required.
   - What breaks without it: Incorrect file lists, missing commit SHAs, or inconsistent forensic records.

3) Technology: HTTP Semantics & Retry (RFC 7231 / Retry-After semantics)
   - Concept: Proper handling of webhook retries, status codes, and idempotent response behavior
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231
   - Why required: Guides deterministic responses to webhook deliveries (when to 2xx vs 5xx) and retry expectations.
   - What decision it informs: Whether to ack immediately, requeue, or return a failure to trigger provider retry.
   - What breaks without it: Non-deterministic retries leading to duplicate processing or lost events.

4) Technology: Data Retention / Privacy Guidance (Org legal)
   - Concept: Retention and archival constraints for event logs and forensic data
   - Official source: Organization legal policy (TO BE PINNED)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how long `LabAttempt` and detailed push payloads can be retained and whether full payload storage is permissible.
   - What decision it informs: TTLs, archival targets, and whether to store full payload vs. curated subset.
   - What breaks without it: Non-compliance with legal/regulatory obligations.

## EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing `LabAttempt` model, delivery-id usage, and retention policy but does not provide deterministic schema or migration notes.

- Doc path: /apps/forgea-labs/app/api/webhooks/github/route.ts
  - Coverage status: PARTIAL
  - Exact gaps: Handler verifies HMAC and logs audit entries, but does not read `X-GitHub-Delivery`, parse changed files, or persist `LabAttempt` records.

- Doc path: /packages/audit/src/audit.service.ts
  - Coverage status: SUFFICIENT (for audit write primitives)
  - Exact gaps: Service exists and enforces append-only audit writes; lacks documented metadata contract for `LabAttempt` lifecycle events (emit shapes are known in code but need canonical doc).

- Doc path: /packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: Contains `VerificationLog` and `AuditLog` but no `LabAttempt` model nor indexes for delivery-id deduplication.

## DOCUMENTATION COVERAGE DECISION

- ⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED
  - Required extensions:
    - Add a pinned internal doc describing `LabAttempt` Prisma model and migration guidance.
    - Add a canonical webhook idempotency doc under `/docs/official-docs/github/` describing header usage and retry behavior.
    - Add retention policy doc (legal pin required) for event/attempt storage.

## STUDY GUIDE FOR HUMAN

- GitHub Webhooks: Why — provides authoritative delivery id and payload structure; Alternatives — polling the API (higher latency); When NOT to use — if you cannot guarantee webhook secret verification; Common mistakes — not storing `X-GitHub-Delivery`, assuming `head_commit` always present.

- Idempotency: Why — prevents duplicate LabAttempt records on retries; Alternatives — application-level dedupe via signature of payload (less reliable); When NOT to use header-only dedupe — if proxies strip headers; Common mistakes — creating non-unique DB constraints that block legitimate distinct deliveries.

- Audit vs Attempt storage: Why — `AuditLog` is append-only for forensic trails; `LabAttempt` is structured event storage for operational workflows; Alternatives — storing whole payload only in audit; When NOT to store full payload in `LabAttempt` — when legal/privacy prohibits it; Common mistakes — relying on audit for application deduplication.

## INTERNAL DOCS TO ADD OR EXTEND

1) Path: /docs/official-docs/github/labattempt-prisma.md
   - Purpose: Provide exact Prisma `model LabAttempt` to add to `packages/schema/prisma/schema.prisma`, example migration, and index definitions.
   - Exact knowledge to add: Full model, `@@index` lines (by `sessionId`, `deliveryId`), recommended constraints, and backward-compatible migration notes.
   - Required version pin: N/A (internal)

2) Path: /docs/official-docs/github/webhook-idempotency.md
   - Purpose: Canonical idempotency strategy for GitHub webhook deliveries (use `X-GitHub-Delivery`), handling duplicate deliveries, and recommended HTTP responses.
   - Exact knowledge to add: Idempotency semantics, behavior on duplicate `deliveryId` (return existing record), and how to handle concurrent deliveries.
   - Required version pin: N/A (internal)

3) Path: /docs/official-docs/github/labattempt-retention.md
   - Purpose: Retention and archival policy for `LabAttempt` and mapping to archival targets (cold storage / object store) and deletion procedures.
   - Exact knowledge to add: TTL values, archival job cadence, scrub rules for payloads, and linkage to legal retention doc.
   - Required version pin: Must reference pinned legal policy doc.

4) Path: /docs/official-docs/github/audit-metadata.md
   - Purpose: Document the exact audit event shapes the webhook handler must emit (event names, required metadata keys, correlationId usage).
   - Exact knowledge to add: Example `AuditService.log` calls for `EVENT_RECEIVED`, `SESSION_MATCHED`, `LAB_ATTEMPT_CREATED`, `DUPLICATE_DELIVERY_DETECTED`, and failure events.
   - Required version pin: N/A (internal)

## OPEN QUESTIONS / AMBIGUITIES

- Confirm canonical idempotency key: use `X-GitHub-Delivery` header? (recommended by scout)
- Confirm retention durations for `LabAttempt` (suggest 90 days archive / 365 days delete) and whether full payloads may be stored.
- Decide whether `deliveryId` uniqueness should be enforced at DB-level (unique index) or only at application level.
- Confirm whether `changedFiles` should store union of added/modified/removed or full commit diffs.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F8 — Push Tracking & Audit
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for push tracking, idempotency, and audit.
