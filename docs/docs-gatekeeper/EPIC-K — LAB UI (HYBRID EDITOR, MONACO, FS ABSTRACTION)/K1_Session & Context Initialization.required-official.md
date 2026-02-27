REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks
   - Concept: Webhook delivery semantics, headers, and HMAC signature verification
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs canonical delivery-id usage, signature verification, and retry semantics for mapping GitHub events to `LabSession` objects.
   - Decision it informs: Idempotency key selection and webhook handler retry/backoff strategy.
   - What breaks without it: Incorrect deduplication, replayed events causing duplicated session state, and potential security failures from signature mismatches.

2. Technology: Idempotency & HTTP Retry Semantics
   - Concept: RFC guidance for idempotency, retryable vs permanent errors, and idempotency key patterns.
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231 (or provider-specific extensions); VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how webhook handlers should classify errors and whether retries are safe; informs storage lifetime for idempotency records.
   - Decision it informs: Persistence lifetime, error codes mapping to DLQ vs retry, and safe concurrency semantics.
   - What breaks without it: Inconsistent retry behaviour, lost or duplicated work, and unreliable session association.

3. Technology: Durable Queues & DLQ Options
   - Concept: Durable ingestion, replay, and dead-letter handling for webhook events (e.g., AWS SQS, Redis Streams, DB-backed queues).
   - Official sources:
     - SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
     - Redis Streams: https://redis.io/docs/manual/streams/
     - Postgres job table pattern: https://www.crunchydata.com/blog/using-postgresql-as-a-job-queue
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines durable ingestion architecture, guarantees for enqueue-first semantics, and failure-handling strategies.
   - Decision it informs: Choice of queue tech, DLQ retention, and operational runbooks for replay and troubleshooting.
   - What breaks without it: Missing DLQ/replay semantics leading to lost events or unbounded retries.

4. Technology: JSON Schema (manifest for forgea.config.json)
   - Concept: Machine-readable schema for `forgea.config.json` manifest (lab template, injection validation, deterministic error codes).
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (e.g., 2020-12 or 2019-09)
   - Why required: Ensures deterministic validation, machine-readable error codes, and consistent template injection.
   - Decision it informs: Shape of `forgea.config.json`, validator tooling, and CI acceptance checks.
   - What breaks without it: Incompatible manifests, template injection failures, and fragile enforcement.
