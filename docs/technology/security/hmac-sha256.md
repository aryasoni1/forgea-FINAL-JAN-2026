# HMAC / SHA-256

- Category: Security
- Epics: G, I
- Version / Requirement: FIPS 180-4
- Intent / Critical Decision: Webhook verification and audit event chaining.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use HMAC SHA-256 as the canonical webhook signature algorithm for GitHub deliveries and internal webhook consumers.
- Important points:
  - Require raw-body HMAC verification using `sha256` header semantics (`X-Hub-Signature-256`) and ensure implementations compute HMAC over raw bytes (no reserialization).
  - Document dual-secret acceptance windows for key rotation (accept previous + current secret for a short window) and provide example verification snippets for Node/Python.
  - Tie HMAC verification failures to audit events and monitoring (increment metrics, emit alert when failure rate exceeds threshold).

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Provide authoritative guidance for webhook signature verification used by webhook intake, normalization, and snapshot triggers.
- Important points:
  - Emphasize computing HMAC over exact raw request bytes (no reserialization) and provide canonical examples for Node.js and serverless runtimes.
  - Recommend dual-secret acceptance windows for key rotation and show safe windows, audit entries, and rotation runbook pointers.
  - Tie HMAC validation failures to alerting thresholds for `G1_Webhook_Intake_&_Security` and include guidance for logging minimal safe metadata for forensics.
