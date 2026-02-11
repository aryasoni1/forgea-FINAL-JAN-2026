---
doc_id: stripe-idempotency-consistency
tool: Stripe API
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Stripe — Idempotency & Consistency Policy

## Purpose

Governs the mandatory implementation of idempotency keys for all state-mutating API requests (Charges, Subscriptions, Refunds) to ensure transactional consistency and prevent duplicate financial operations during network retries.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API v1 / 2026-01-28.clover)

## Scope

- Applies to: All `POST` requests to the Stripe API.
- Does NOT apply to: `GET` or `DELETE` requests (idempotent by definition), or read-only reporting endpoints.

## Official Sources (Binding)

- [Stripe API Reference: Idempotent Requests] (Source,)
- [Stripe API Reference: Errors] (Source,)
- [Stripe API Reference: Versioning] (Source)

## Evidence Coverage Matrix

| Policy Area           | Source Reference     | Version Covered | Status  |
| --------------------- | -------------------- | --------------- | ------- |
| Header Requirement    | Idempotent requests, | v1              | COVERED |
| Key Generation (UUID) | Idempotent requests, | v1              | COVERED |
| Expiration (24h)      | Idempotent requests, | v1              | COVERED |
| Parameter Validation  | Idempotent requests, | v1              | COVERED |
| Concurrent Conflict   | Idempotent requests, | v1              | COVERED |

## Version & Compatibility

- **Tool version:** Stripe API `2026-01-28.clover` (Current major version).
- **Header:** `Idempotency-Key`.

## Canonical Rules (Non-Negotiable)

- **Mandatory Idempotency Keys:**
  - All `POST` requests MUST include the `Idempotency-Key` header,.
  - This allows safe retries of requests after connection errors without duplicating the operation.
- **Key Generation:**
  - Keys MUST be unique V4 UUIDs or random strings with sufficient entropy to avoid collisions.
  - Key length MUST NOT exceed 255 characters.
- **Persistence Lifecycle:**
  - The idempotency layer caches the resulting status code and response body of the _first_ request.
  - Keys expire and are removed from the system after **24 hours**.
- **Parameter Consistency:**
  - Subsequent requests using the same `Idempotency-Key` MUST use **identical** parameters to the original request.
  - The idempotency layer compares incoming parameters; if they differ, the request fails.

## Prohibited Configurations

- ❌ **Reusing Keys for Different Operations:** Providing an existing `Idempotency-Key` with different request parameters is PROHIBITED. This triggers an `idempotency_error`,.
- ❌ **Sending Keys on Read Operations:** Do NOT send `Idempotency-Key` on `GET` or `DELETE` requests; it has no effect.
- ❌ **Assuming Infinite Persistence:** Do NOT rely on idempotency for requests older than 24 hours. A key reused after 24 hours is treated as a new request.
- ❌ **Zero-Tolerance Timestamp:** When verifying webhooks, using a tolerance of `0` is PROHIBITED as it disables recency checks entirely.

## Enforcement

- **Runtime Behavior:**
  - **Success:** Replayed requests return the original HTTP status and body (even if the original failed with a 500 error).
  - **Error (400/409):** If parameters mismatch, Stripe returns `type: "idempotency_error"`,.
  - **Concurrent Execution:** If a request conflicts with another executing concurrently with the same key, the result is _not_ saved, and the request fails. These requests MAY be retried.

## Failure Modes

- **Atomic Failure:** If a request fails validation (e.g., missing parameter) _before_ execution begins, the result is NOT saved. The `Idempotency-Key` is not consumed.
- **Expired Key Replay:** If a system retries a transaction after 24 hours using the same key, Stripe executes a **duplicate** transaction.
- **Connection Error:** `Stripe::APIConnectionError` indicates network failure. The client MUST retry with the _same_ `Idempotency-Key` to ensure the original operation is recovered or completed.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/stripe-api-integration.md` (Authentication).
- Conflicts with:
  - NONE.

## Planner Extraction Hints (Non-Human)

- If `method` == "POST" -> `headers["Idempotency-Key"]` = `UUID_V4()`.
- If `error.type` == "idempotency_error" -> STOP. DO NOT RETRY without new key.
- If `error.type` == "api_connection_error" -> RETRY with SAME key.

## Verification Checklist

- [ ] All `POST` mutations generate a V4 UUID.
- [ ] Retry logic preserves the original `Idempotency-Key`.
- [ ] Idempotency keys are not reused across different logical operations.
- [ ] Keys are distinct per environment (Test vs Live).

## Non-Decisions

- This document does not define the storage mechanism for tracking used keys on the client side.
- This document does not define specific backoff intervals (see Rate Limits policy).

## Notes

- Stripe's idempotency layer saves the result regardless of success or failure (including 500s).
- `Idempotency-Key` is case-sensitive (standard HTTP header behavior).
