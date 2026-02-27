### FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F7 — Webhook Handling
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-labs/app/api/webhooks/github/route.ts

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Webhooks
  - Concept: webhook event names, payload formats, signature verification
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: GitHub Apps authentication
  - Concept: JWT and installation tokens
  - Official source: https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Secrets management (Vault / Cloud KMS)
  - Concept: secret storage, rotation, ACLs, audit
  - Official source: https://www.vaultproject.io/docs (or cloud provider KMS docs)
  - Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - Coverage status: PARTIAL — orchestration and role prompts present; no contract.

- /docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - Coverage status: PARTIAL — lists missing implementation artifacts and tests.

- /apps/forgea-labs/app/api/webhooks/github/route.ts
  - Coverage status: PARTIAL — existing `push` HMAC handling referenced elsewhere; not present for F7 in code-scout findings.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Extend these internal docs (short list):
- `/docs/official-docs/EPIC-F/github-webhook-runbook.md` — webhook contract, HMAC verification, replay protection.
- `/docs/official-docs/EPIC-F/github-webhook-idempotency.md` — deduplication keys, persistence, retention.
- `/docs/official-docs/EPIC-F/github-secrets-storage.md` — where PEM/webhook secrets live and rotation policy.

---

### PLANNER DELIVERABLES (WEBHOOK CONTRACT & SPEC)

1) Webhook contract (machine-friendly)

- Accepted events (exact GitHub names):
  - push
  - pull_request
  - pull_request_review (optional; include if review-driven actions required)
  - workflow_run (optional; CI-related triggers)

- Minimal payload fields to extract (per event):
  - push: `head_commit.id` (SHA), `ref`, `repository.full_name`, `pusher.name`, `head_commit.modified|added|removed` (files)
  - pull_request: `action`, `number`, `pull_request.head.sha`, `pull_request.base.ref`, `repository.full_name`, `sender.login`

- Expected responses:
  - Supported event & accepted: HTTP 200 OK (or 204 No Content)
  - Supported event & intentionally ignored (no-op): HTTP 202 Accepted
  - Unsupported event: HTTP 400 Bad Request with JSON {"error":"unsupported_event"}
  - Signature verification failure: HTTP 401 Unauthorized

2) Signature verification & replay-protection spec

- Required headers: `X-Hub-Signature-256`, `X-GitHub-Event`, `X-GitHub-Delivery`, `X-GitHub-Hook-ID` (optional)
- Algorithm: HMAC SHA-256 using the webhook secret; verify against `sha256=` prefix
- Raw-body requirement: Use the exact raw request body bytes (no JSON re-serialization) for HMAC
- Acceptable clock skew: Not required for HMAC; for timestamp-based protection (if used) accept ±5 minutes
- Replay protection:
  - Record `X-GitHub-Delivery` (UUID) per incoming delivery and reject duplicates within retention window (recommended 72 hours)
  - If `X-GitHub-Delivery` missing, derive dedupe key using `event-type:sha256(body)` and short-circuit duplicates
- Secret rotation: store secret in Vault/KMS; rotation cadence: 90 days for webhook secret; support dual-secret validation window during rotation (accept current + previous secret for 5 minutes)

3) Idempotency and retry-handling requirements

- Deduplication key (preferred order):
  1. `X-GitHub-Delivery` (UUID) — primary
  2. `<event>-<repo>-<resource-id>-<action>-<sha>` (deterministic composite key) — fallback
- Storage for dedupe keys: short-lived cache (Redis) with TTL = 72 hours; persistent audit store for analytics
- Processing semantics:
  - On first delivery: validate signature → enqueue job → respond 200 after enqueue (or 202)
  - On duplicate delivery: respond 200 immediately; do not re-enqueue processing job
- Idempotent handlers: design handlers to be safe for repeated processing (use DB uniqueness constraints where state changes occur)

4) Audit and minimal persistence requirements

- Minimum audit record per delivery (persist to audit table / event log):
  - `delivery_id` (`X-GitHub-Delivery`)
  - `received_at` (ISO8601)
  - `event` (`X-GitHub-Event`)
  - `repo` (`repository.full_name`)
  - `actor` (`sender.login` or `pusher.name`)
  - `signature_valid` (bool)
  - `dedupe_key` (string)
  - `status` (`accepted`|`ignored`|`rejected`)
  - `handler_result` (short code / message)
- Retention guidance: keep audit records 90 days hot, archive 2 years, purge per policy

5) Acceptance criteria & test cases (Implementer / QA)

- Positive tests:
  - Signed `push` event with valid HMAC → 200, audit record created, job enqueued
  - Signed `pull_request` opened event → 200, relevant fields extracted

- Failure simulations:
  1. Unsigned payload (invalid signature): send payload with wrong `X-Hub-Signature-256` → expect 401 Unauthorized and audit record with `signature_valid=false`
  2. Replayed payload: send same `X-GitHub-Delivery` twice → first returns 200 and enqueues, second returns 200 and does not re-enqueue; audit shows duplicate detection

---

### STUDY GUIDE FOR HUMAN (SUMMARY)

- Why this exists: ensure webhook endpoint is secure, authenticated, replay-safe, and idempotent to match GitHub delivery semantics.
- Alternatives: IP allowlisting (fragile), mutual TLS (complex). Use HMAC as primary; add IP checks as optional defense-in-depth.
- When NOT to use this pattern: internal-only systems behind corporate VPNs where network protections suffice.
- Common engineering mistakes: computing HMAC over parsed JSON (not raw body); not storing `X-GitHub-Delivery`; assuming single delivery and mutating state without idempotency.

---

### INTERNAL DOCS TO ADD OR EXTEND

- `/docs/official-docs/EPIC-F/github-webhook-runbook.md` — include webhook contract, sample payloads, HMAC snippet, delivery verification steps, monitoring queries.
- `/docs/official-docs/EPIC-F/github-webhook-idempotency.md` — dedupe strategy, Redis key formats, DB uniqueness guidance.
- `/docs/official-docs/EPIC-F/github-secrets-storage.md` — secret paths in Vault, ACL recommendations, rotation playbook.

---

### OPEN QUESTIONS / AMBIGUITIES

- Should replay dedupe TTL be shorter than 72 hours for privacy/retention reasons? (default: 72h)
- Which team/role owns emergency rotation and runbook execution?
- Does the app require `pull_request_review` and `workflow_run` events, or only `push` and `pull_request`?

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
- Date: 2026-02-14
  - Epic / Feature: EPIC-F / F7 — Webhook Handling
  - Doc path: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and missing runner/implementation artifacts for webhook handling.
```
