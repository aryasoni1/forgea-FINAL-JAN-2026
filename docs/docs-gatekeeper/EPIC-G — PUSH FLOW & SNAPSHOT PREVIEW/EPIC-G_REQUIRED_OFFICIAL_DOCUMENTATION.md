## EPIC-G — REQUIRED OFFICIAL DOCUMENTATION (Consolidated)

This file aggregates the "REQUIRED OFFICIAL DOCUMENTATION" sections from all EPIC-G feature briefs in this folder.

---

### Source: G1*Webhook_Intake*&\_Security.md

### REQUIRED OFFICIAL DOCUMENTATION

1. GitHub Webhooks — Events, Signature, Delivery Semantics

- Technology: GitHub Webhooks
- Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines `X-Hub-Signature-256`, `X-GitHub-Event`, `X-GitHub-Delivery`, payload formats, and provider retry/backoff semantics.
- Decision it informs: HMAC verification algorithm, deduplication key choice, replay-protection design, and retry handling.
- What breaks without it: Incorrect verification, replay vulnerabilities, incorrect deduplication and failed mapping of events to sessions.

2. HMAC / SHA-256 primitives

- Technology: HMAC (RFC 2104) / SHA-256 (FIPS/NIST)
- Official sources: https://datatracker.ietf.org/doc/html/rfc2104 and https://csrc.nist.gov/publications/detail/fips/180/4
- Exact version requirement: RFC 2104 (stable); FIPS 180-4 (stable)
- Why required: Authoritative description of HMAC construction and hash usage for signature generation.
- Decision it informs: Correct keyed-HMAC computation and canonicalization of payload bytes.
- What breaks without it: Interoperability failures and signature mismatch attack surface.

3. Timing-safe comparison guidance & runtime implementation

- Technology: Node.js `crypto.timingSafeEqual` / platform timing-safe compare
- Official source: https://nodejs.org/docs/latest
- Exact version requirement: Node.js 20.x (project-verified runtime)
- Why required: Ensures constant-time comparison to avoid timing attacks during signature checks.
- Decision it informs: Use of runtime-provided timing-safe primitives versus naive string compares.
- What breaks without it: Potential secret leakage via timing side-channels.

4. HTTP Retry & Idempotency patterns

- Technology: HTTP semantics / Idempotency patterns
- Official source: https://datatracker.ietf.org/doc/html/rfc7231 and provider-specific retry guidance (GitHub docs)
- Exact version requirement: RFC 7231 (stable); provider docs: VERSION UNKNOWN — MUST BE PINNED
- Why required: Informs interpretation of retry vs duplicate deliveries and which errors are retryable.
- Decision it informs: Idempotency key design, storage lifetime, classification of transient vs permanent failures.
- What breaks without it: Incorrect retries, duplicate processing, or permanent failures retried repeatedly.

5. Durable queue & DLQ choices

- Technology: AWS SQS, Redis Streams, Postgres job-table patterns
- Official sources: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html, https://redis.io/docs/manual/streams/, https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (for chosen infra)
- Why required: Authoritative details on enqueue semantics, ack/visibility timeouts, DLQ configuration and replay.
- Decision it informs: Whether to adopt enqueue-first ack semantics, DLQ thresholds, and deduplication lifetime.
- What breaks without it: Lossy acknowledgements, incorrect retry semantics, and insufficient DLQ behavior.

6. Next.js / Hosting raw-body passthrough behavior

- Technology: Next.js App Routes / hosting platform raw-body behavior
- Official sources: https://nextjs.org/docs and the chosen platform's docs (Vercel/GCP/Cloud Run/NGINX)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines how to obtain exact raw request bytes (required for correct HMAC over the canonical payload).
- Decision it informs: Handler implementation pattern (raw arrayBuffer / raw body passthrough) and LB/proxy header configuration.
- What breaks without it: Incorrect HMAC inputs leading to signature mismatches and blocked events.

7. Secrets storage & rotation guidance

- Technology: HashiCorp Vault / Cloud KMS guidance
- Official source: https://www.vaultproject.io/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Secure secret storage, rotation policy, and audit logging required for webhook secrets.
- Decision it informs: Where `GITHUB_WEBHOOK_SECRET` is stored and how rotation/rollover is performed safely.
- What breaks without it: Secret exposure, unrotatable credentials, and audit gaps.

---

### Source: G2_Push_Event_Normalization.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub Webhooks
  - Concept: Webhook delivery semantics, headers, HMAC signature verification
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: JSON Schema
  - Concept: Formal machine-readable schema for normalized push events
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12 (recommended) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: HTTP Semantics & Idempotency Patterns
  - Concept: HTTP status expectations, retry semantics, idempotency guidance
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231

---

### Source: G3*Repo*→_Session_Binding.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: GitHub Repositories API
   - Official source: https://docs.github.com/en/rest/reference/repos
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Technology: HTTP Caching (RFC 7234)
   - Official source: https://datatracker.ietf.org/doc/html/rfc7234
   - Exact version requirement: RFC 7234

4. Technology: HTTP Semantics (RFC 7231)
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231

5. Technology: PostgreSQL Advisory Locks
   - Official source: https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### Source: G4-branch-history-policy.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: Git (core)
  - Official source: https://git-scm.com/docs/git-push and https://git-scm.com/docs/git-receive-pack
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: GitHub Branch Protection & Admin APIs
  - Official source: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: GitHub Webhooks & Events
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Audit & Security Logging Guidance (NIST)
  - Official source: NIST SP 800-92 (or equivalent)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### Source: G5*Lab_Attempt_Ledger*(Immutable).md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks

- Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: HTTP Semantics & Retry Patterns (RFC 7231)

- Official source: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231

3. Technology: Durable Queue Options (AWS SQS)

- Official source: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

4. Technology: Redis Streams

- Official source: https://redis.io/docs/manual/streams/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

5. Technology: Postgres job-table pattern

- Official source: https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### Source: G6_Audit_Logging.md

REQUIRED OFFICIAL DOCUMENTATION

1. JSON Schema for audit events (event contract)

- Official source: https://json-schema.org/
- Exact version requirement: JSON Schema Draft 2020-12 (must be pinned to this draft)

2. Database migration & immutable storage patterns (Prisma / Postgres guidance)

- Official sources: https://www.prisma.io/docs/concepts/components/prisma-migrate and https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Retention & archival policy (legal/compliance guidance + archival tech)

- Official sources: AWS S3/Glacier and org retention policy
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

4. Sink specification & onboarding

- Official source: Internal spec and external sink docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

5. Rejection / reason codes registry

- Official source: Internal canonical registry
- Exact version requirement: N/A (internal)

---

### Source: G7*Verification_Trigger*(Boundary_Only).md

REQUIRED OFFICIAL DOCUMENTATION

1. Queue technology guidance (choose and pin one)

- Official sources: AWS SQS, Redis Streams, Postgres docs (links in source)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Idempotency & HTTP semantics

- Official source: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231

3. Prisma schema & migrations guidance

- Official source: https://www.prisma.io/docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

4. Postgres transactional patterns and advisory locks

- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

---

### Source: G8_Verification_Result_Intake.md

REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (recommend 2020-12)

- Technology: HTTP Semantics (RFC 7231)
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231

---

### Source: G9_Snapshot_Build_Trigger.md

REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Actions / CI provider docs
   - Official source: provider docs (e.g., https://docs.github.com/en/actions)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2. Technology: Reproducible Builds Guidance / Build tool docs
   - Official source: tool-specific docs and reproducible build best-practices
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

3. Technology: Artifact Provenance / Signing standards
   - Official source: in-toto, Sigstore (pin exact spec)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

4. Technology: HTTP Semantics (RFC 7231)
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231

---

### Source: G10-implementer-checklist.md and G10-snapshot-policy.md

REQUIRED OFFICIAL DOCUMENTATION (extracted across both G10 files)

- Technology: Snapshot metadata schema (JSON Schema Draft 2020-12)
  - Official source: https://json-schema.org/
  - Exact version requirement: JSON Schema Draft 2020-12 (must be pinned)

- Technology: Storage backend decision & object-store guidance (S3-compatible or approved internal blobstore)
  - Official source: AWS S3 docs or chosen blobstore docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Retention & deletion compliance guidance (legal counsel / regional laws)
  - Official source: internal retention policy and applicable law
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: Migration & DB schema patterns for snapshot tables (Prisma / Postgres)
  - Official sources: Prisma docs and Postgres docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Technology: QA & CI test guidance for determinism and masking
  - Official source: internal CI policy and tooling docs
  - Exact version requirement: N/A (internal)

---

## Notes

- Many entries list `VERSION UNKNOWN` — these must be pinned before implementation. The consolidated list preserves the exact references from each feature brief to serve as the single-source-of-truth for the EPIC-G docs gatekeeper work.

---

Generated by Docs Gatekeeper consolidation on 2026-02-18.
