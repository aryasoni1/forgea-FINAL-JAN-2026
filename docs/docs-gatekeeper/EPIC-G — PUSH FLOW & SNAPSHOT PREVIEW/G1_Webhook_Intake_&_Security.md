## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G1 — Webhook Intake & Security
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1_Webhook_Intake_&_Security.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1*Webhook Intake & Security.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

1) GitHub Webhooks — Events, Signature, Delivery Semantics
- Technology: GitHub Webhooks
- Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines `X-Hub-Signature-256`, `X-GitHub-Event`, `X-GitHub-Delivery`, payload formats, and provider retry/backoff semantics.
- Decision it informs: HMAC verification algorithm, deduplication key choice, replay-protection design, and retry handling.
- What breaks without it: Incorrect verification, replay vulnerabilities, incorrect deduplication and failed mapping of events to sessions.

2) HMAC / SHA-256 primitives
- Technology: HMAC (RFC 2104) / SHA-256 (FIPS/NIST)
- Official sources: https://datatracker.ietf.org/doc/html/rfc2104 and https://csrc.nist.gov/publications/detail/fips/180/4
- Exact version requirement: RFC 2104 (stable); FIPS 180-4 (stable)
- Why required: Authoritative description of HMAC construction and hash usage for signature generation.
- Decision it informs: Correct keyed-HMAC computation and canonicalization of payload bytes.
- What breaks without it: Interoperability failures and signature mismatch attack surface.

3) Timing-safe comparison guidance & runtime implementation
- Technology: Node.js `crypto.timingSafeEqual` / platform timing-safe compare
- Official source: https://nodejs.org/docs/latest
- Exact version requirement: Node.js 20.x (project-verified runtime)
- Why required: Ensures constant-time comparison to avoid timing attacks during signature checks.
- Decision it informs: Use of runtime-provided timing-safe primitives versus naive string compares.
- What breaks without it: Potential secret leakage via timing side-channels.

4) HTTP Retry & Idempotency patterns
- Technology: HTTP semantics / Idempotency patterns
- Official source: https://datatracker.ietf.org/doc/html/rfc7231 and provider-specific retry guidance (GitHub docs)
- Exact version requirement: RFC 7231 (stable); provider docs: VERSION UNKNOWN — MUST BE PINNED
- Why required: Informs interpretation of retry vs duplicate deliveries and which errors are retryable.
- Decision it informs: Idempotency key design, storage lifetime, classification of transient vs permanent failures.
- What breaks without it: Incorrect retries, duplicate processing, or permanent failures retried repeatedly.

5) Durable queue & DLQ choices
- Technology: AWS SQS, Redis Streams, Postgres job-table patterns
- Official sources: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html, https://redis.io/docs/manual/streams/, https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (for chosen infra)
- Why required: Authoritative details on enqueue semantics, ack/visibility timeouts, DLQ configuration and replay.
- Decision it informs: Whether to adopt enqueue-first ack semantics, DLQ thresholds, and deduplication lifetime.
- What breaks without it: Lossy acknowledgements, incorrect retry semantics, and insufficient DLQ behavior.

6) Next.js / Hosting raw-body passthrough behavior
- Technology: Next.js App Routes / hosting platform raw-body behavior
- Official sources: https://nextjs.org/docs and the chosen platform's docs (Vercel/GCP/Cloud Run/NGINX)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines how to obtain exact raw request bytes (required for correct HMAC over the canonical payload).
- Decision it informs: Handler implementation pattern (raw arrayBuffer / raw body passthrough) and LB/proxy header configuration.
- What breaks without it: Incorrect HMAC inputs leading to signature mismatches and blocked events.

7) Secrets storage & rotation guidance
- Technology: HashiCorp Vault / Cloud KMS guidance
- Official source: https://www.vaultproject.io/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Secure secret storage, rotation policy, and audit logging required for webhook secrets.
- Decision it informs: Where `GITHUB_WEBHOOK_SECRET` is stored and how rotation/rollover is performed safely.
- What breaks without it: Secret exposure, unrotatable credentials, and audit gaps.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Coverage status: SUFFICIENT for high-level scope and feature list.
  - Exact gaps: Does not prescribe implementation preconditions (version pins) or authoritative external references — acceptable as scope authority only.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1*Webhook Intake & Security.md
  - Coverage status: PARTIAL
  - Exact gaps: Lists repo truth and missing agents but lacks pinned external references, exact infra checklist, and runbook artifacts.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry contains GitHub Webhooks entries but many version pins are `VERSION UNKNOWN` and must be pinned before secure implementation; several durable-queue options are referenced but not pinned.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/official-docs-registry.md` — Add pinned versions and stable links for: GitHub Webhooks, provider retry semantics, chosen durable queue (SQS/Redis/Postgres) and Next.js/raw-body hosting guidance.
- `/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1*Webhook Intake & Security.md` — Add authoritative reference URLs (RFCs, Node.js crypto docs), infra checklist, and runbook pointers.

### STUDY GUIDE FOR HUMAN

- GitHub Webhooks: Why — authoritative event and signature format; Alternatives — provider-specific webhooks (GitLab/Bitbucket) only if multi-provider; When NOT to use — if using GitHub App push-only event bus; Common mistakes — computing HMAC over parsed/modified body instead of exact raw bytes.
- HMAC & SHA-256: Why — canonical keyed MAC construction; Alternatives — HMAC-SHA1 (legacy) — avoid; When NOT to use — never use non-keyed hashes for verification; Common mistakes — canonicalization differences and character-encoding errors.
- Timing-safe compare: Why — prevents secret leakage via timing; Alternatives — library-provided secure compare; When NOT to use — naive string equality for secrets; Common mistakes — using high-level string compare or comparing hex strings without fixed-length buffers.
- Retry & Idempotency: Why — webhook providers retry on transient failures; Alternatives — accept duplicates and make downstream idempotent; When NOT to use — treat all failures as permanent; Common mistakes — returning 200 on failures and losing visibility into errors.
- Durable queue & DLQ: Why — absorb bursts and ensure ack-after-enqueue; Alternatives — synchronous processing (bad for scale); When NOT to use — ultra-low-volume dev-only endpoints; Common mistakes — acking before persisting to durable store.
- Raw-body passthrough: Why — HMAC must be computed over raw bytes; Alternatives — provider side canonicalized signatures (rare); When NOT to use — when framework guarantees raw-body access; Common mistakes — relying on parsed JSON body for HMAC.

### INTERNAL DOCS TO ADD OR EXTEND

Only required because coverage is PARTIAL:

- Path: /docs/official-docs/EPIC-G/webhook-intake-runbook.md
  - Purpose: Operator playbook for webhook retry handling, DLQ operations, secret rotation, and emergency rollbacks.
  - Exact knowledge to add: DLQ thresholds, alerting on duplicate rate, secret rotation steps, and rollback steps for mass-failures.
  - Required version pin: N/A (runbook is internal); must reference pinned external docs.

- Path: /docs/official-docs/EPIC-G/webhook-infra-checklist.md
  - Purpose: Minimal infra checklist for LB/proxy headers, raw-body passthrough, request size limits, and TLS settings.
  - Exact knowledge to add: Platform-specific instructions for Vercel/Cloud Run/NGINX/ALB and required header passthrough examples.
  - Required version pin: Must include hosting platform release/snapshot used in production.

### OPEN QUESTIONS / AMBIGUITIES

- Which webhook providers must be supported beyond GitHub? (Blocking for multi-provider signature choices).
- What are required throughput targets (events/sec and burst sizes)? (Blocking for durable queue choice and perf auditor scope).
- Which hosting platform will run the webhook handler (Vercel, Cloud Run, ALB, NGINX)? (Blocking for raw-body passthrough checklist).
- Who will own secret rotation (platform ops vs application) and where will secrets be stored (Vault vs cloud KMS)?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G1 — Webhook Intake & Security
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1_Webhook_Intake_&_Security.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs, infra checklist, and preconditions for secure webhook intake.

---

This brief is intended to be handed to `planner-architect` implementer and `security-sentinel` exactly as-is; it enumerates preconditions and authoritative references required before safe implementation.
