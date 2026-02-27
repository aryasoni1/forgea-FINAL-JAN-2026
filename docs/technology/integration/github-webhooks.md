# GitHub Webhooks

- Category: Integration
- Epics: F, K
- Version / Requirement: Pin required
- Intent / Critical Decision: Event payloads, signature checks, and delivery semantics.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B8 GitHub Mapping Tables)
- EPIC-B intent: Use GitHub webhooks and API mappings to populate GitHub mapping tables reliably; ensure signature verification and idempotent processing.
- Important points:
  - Pin GitHub API usage to stable REST endpoints and document webhook signature verification and retry semantics.
  - Document schema for GitHub mapping tables in Prisma and how to reconcile events with eventual consistency and retry/backoff patterns.
  - Consider rate-limiting and webhook deduplication strategies to avoid duplicate mapping inserts.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Define webhook contracts, idempotency semantics, replay-protection and audit requirements for lab-related events (push, pull_request, workflow_run).
- Important points:
  - Use `X-GitHub-Delivery` as the canonical deduplication key and record delivery IDs in a short-term dedupe store (Redis) plus append an audit record for forensic traceability.
  - Require raw-body HMAC verification using `X-Hub-Signature-256`; verify using keys stored in Vault and provide runbooks for rotation and dual-secret acceptance windows.
  - Provide standardized response semantics: 200 for accepted/enqueued, 202 for accepted/no-op, 401 for signature failures, and 400 for unsupported events.
  - Document idempotency fallback keys and dedupe TTL (recommended 72 hours) and ensure handlers are designed to be idempotent and safe for retries.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Canonicalize webhook intake for snapshot build triggers, preview generation, and repo→session binding; secure ingestion contract for push-triggered flows.
- Important points:
  - Require raw-body HMAC verification (`X-Hub-Signature-256`) and provide canonical verification steps and example code for Node.js handlers that must obtain exact raw bytes before parsing.
  - Define canonical idempotency keys (primary: `X-GitHub-Delivery`, fallbacks) and document TTLs, storage location (durable queue vs dedupe DB), and DLQ behavior for enqueued deliveries.
  - Include runbook links for secret rotation, replay handling, and metrics/alerts on high signature-failure or duplicate rates.
  - Enumerate hosting preconditions (Next.js raw-body passthrough or reverse-proxy headers) required to compute correct HMAC inputs.
