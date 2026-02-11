---
doc_id: github-webhook-policy
tool: GitHub
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# GitHub — Webhook Security & Mapping Policy

## Purpose

Governs the cryptographic verification of incoming webhook events, the enforcement of response timeouts (asynchronous processing), and the schema mapping of immutable provider identifiers (`repository.id`, `sender.id`) to internal database records.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: All HTTP endpoints receiving webhooks from GitHub (e.g., `/api/webhooks/github`), payload validation logic, and ingress gateways.
- Does NOT apply to: Outbound API requests _to_ GitHub (governed by separate API versioning policy).

## Official Sources (Binding)

- [Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)
- [Handling webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries)

## Evidence Coverage Matrix

| Policy Area                                  | Source URL                    | Version Covered | Status  |
| -------------------------------------------- | ----------------------------- | --------------- | ------- |
| Signature Validation (`X-Hub-Signature-256`) | Validating webhook deliveries | N/A             | COVERED |
| Response Timeout (10s)                       | Handling webhook deliveries   | N/A             | COVERED |
| ID Mapping (`repository.id`, `sender.id`)    | Webhook events and payloads   | N/A             | COVERED |
| Header Requirements                          | Webhook events and payloads   | N/A             | COVERED |

## Version & Compatibility

- **API Version:** Webhook payloads correspond to the API version active for the GitHub App or webhook configuration.
- **Hashing Algorithm:** `HMAC-SHA256` is the mandatory standard for security headers.

## Canonical Rules (Non-Negotiable)

- **Cryptographic Verification:**
  - All incoming requests MUST be validated against the `X-Hub-Signature-256` header.
  - The signature MUST be calculated using the `HMAC-SHA256` algorithm and the pre-shared `secret` token.
  - The signature format MUST strictly match `sha256=<hex_digest>`.
  - Validation comparisons MUST use a **constant-time** string comparison function (e.g., `crypto.timingSafeEqual`) to prevent timing attacks.
- **Response Timeout Constraints:**
  - The webhook handler MUST return a `2XX` HTTP status code within **10 seconds** of receiving the delivery.
  - Long-running processing logic MUST be handled asynchronously (e.g., queued) after the response is sent.
- **Identifier Schema:**
  - `repository.id` MUST be treated as the immutable, unique integer identifier for the repository.
  - `sender.id` MUST be treated as the immutable, unique integer identifier for the acting user.
  - `X-GitHub-Delivery` MUST be logged as the globally unique identifier (GUID) for the event to enable idempotency checks.

## Prohibited Configurations

- ❌ **Legacy Signature Verification:** Using `X-Hub-Signature` (HMAC-SHA1) is PROHIBITED for new integrations; `X-Hub-Signature-256` is required.
- ❌ **Insecure Comparison:** Using standard equality operators (e.g., `==`) for signature validation is PROHIBITED due to timing attack vulnerability.
- ❌ **Synchronous Processing:** Execution of business logic exceeding 10 seconds within the webhook request-response cycle is PROHIBITED.
- ❌ **Hardcoded Secrets:** Storing the webhook secret in codebase or repositories is PROHIBITED.

## Enforcement

- **GitHub Connection Termination:**
  - If the server takes longer than 10 seconds to respond, GitHub terminates the connection and marks the delivery as a failure.
- **Payload Cap:**
  - Payloads exceeding **25 MB** are not delivered by GitHub.
- **Missing Secrets:**
  - The `X-Hub-Signature-256` header will NOT be present if a secret is not configured in the webhook settings.

## Failure Modes

- **Delivery Failure:** Exceeding the 10-second timeout results in a delivery failure recorded in the GitHub App/Webhook logs.
- **Authentication Failure:** Mismatched signatures result in the request being treated as untrusted/malicious and MUST be rejected with HTTP 401 or 403.
- **Payload Truncation:** Large events (e.g., pushing >5000 branches) may result in dropped payloads due to the 25 MB cap.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql.md` (Schema definitions for `BigInt` storage of IDs).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `header` == `X-Hub-Signature-256` -> `algorithm` = `HMAC-SHA256`.
- If `processing_time` > 10s -> `strategy` = `ASYNC_QUEUE`.
- `repository.id` -> Map to `INTEGER` or `BIGINT`.
- `sender.id` -> Map to `INTEGER` or `BIGINT`.

## Verification Checklist

- [ ] Ingress middleware validates `X-Hub-Signature-256` using constant-time comparison.
- [ ] Webhook handler returns HTTP 202 (Accepted) immediately after queuing work.
- [ ] Database schema uses integer types for `repository_id` and `sender_id`.
- [ ] `X-GitHub-Delivery` GUID is logged for tracing.

## Non-Decisions

- This document does not define the specific queueing technology (Redis, RabbitMQ, etc.).
- This document does not define the retry policy for failed internal processing after the 202 Accepted response.

## Notes

- `X-GitHub-Event` header indicates the event type (e.g., `issues`, `push`).
- `User-Agent` will always start with `GitHub-Hookshot/`.
