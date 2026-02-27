# Redis Streams

- Category: Streaming
- Epics: G, K
- Version / Requirement: Pin required
- Intent / Critical Decision: Consumer groups and replay semantics.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Consider Redis Streams as an alternative durable ingestion mechanism for low-latency replay and consumer-group semantics for snapshot processing.
- Important points:
  - Document tradeoffs vs SQS (latency, operational overhead, replay guarantees) and recommend Redis Streams for high-throughput ephemeral ingestion where strict ordering or consumer groups are required.
  - Describe how to coordinate idempotency and consumer acknowledgements with Redis consumer-group offsets to prevent duplicate snapshot builds.
  - Provide guidance for retention and stream trimming and an operational runbook for reprocessing messages during backfills.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Consider Redis Streams as an alternative durable ingestion mechanism for detection signals and replayable audit ingestion when ordering or low-latency replay is required.
  - Important points:
    - Document trade-offs vs other durable stores (Kafka, Kinesis, SQS) regarding ordering, consumer groups, retention, and replay semantics for forensic reprocessing.
    - Provide guidance for coordinating idempotency keys, acknowledgement semantics, and backpressure so detection/alerting pipelines are resilient to replay and spikes.
    - Include runbooks for trimming, backfills, and stream replay used during incident investigations.
