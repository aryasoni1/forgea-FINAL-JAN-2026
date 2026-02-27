# AWS SQS

- Category: Queue
- Epics: G, H
- Version / Requirement: Pin required
- Intent / Critical Decision: Durable ingestion and DLQ support for webhooks.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use durable queueing (SQS) as the primary ingestion buffer for webhook deliveries to provide resiliency, retries and DLQ semantics.
- Important points:
  - Enqueue raw webhook deliveries (or minimal envelope with `delivery_id` + compressed payload) and ensure consumers acknowledge only after successful idempotent processing.
  - Configure DLQ with alerting and retention for forensic inspection; document expected visibility timeout, retry policy and redrive rules for webhook-related message failures.
  - Provide example Terraform snippets for SQS + DLQ provisioning and IAM policies allowing only the webhook service to publish and the processor to consume.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use durable queues (SQS) as a supported ingestion buffer for audit/detection pipelines where replay and DLQ semantics suffice.
  - Important points:
    - Enqueue minimal envelopes with `delivery_id` + metadata to ensure idempotent downstream processing and append an audit record before acknowledging providers.
    - Configure DLQs and visibility timeouts consistent with detection/enforcement retry policies; document redrive and alerting procedures for DLQ spikes used in investigations.
    - Record integration choices in official docs (SQS vs Redis Streams vs Kafka) and the expected semantics for replay, ordering, and retention for forensic needs.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Durable ingestion buffer for webhook deliveries and snapshot build triggers; provide enrollment semantics and DLQ workflows.
- Important points:
  - Recommend enqueue-first ack patterns: persist message (or minimal envelope) before acknowledging provider to avoid data loss on failure.
  - Document visibility timeout, retry/redrive policies, and integration with idempotency/deduplication stores to avoid duplicate snapshot builds.
  - Include runbook for DLQ inspection, redrive, and alert criteria when DLQ rates exceed thresholds for snapshot-trigger related messages.
