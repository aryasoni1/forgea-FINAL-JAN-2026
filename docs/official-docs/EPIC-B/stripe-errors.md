---
doc_id: stripe-errors
tool: Stripe API
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Stripe — Error Handling Policy

## Purpose

Governs the handling of Stripe API errors, enforcing specific behaviors for failed charges (`card_error`), server-side issues (`api_error`), and idempotent replay protection (`idempotency_error`) to ensure data consistency and appropriate user messaging.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API 2026-01-28)

## Scope

- Applies to: All backend integration logic handling Stripe API responses, exception catching, and retry strategies.
- Does NOT apply to: Client-side UI styling (Stripe Elements) or frontend-only validation, unless consuming API error messages.

## Official Sources (Binding)

- [Stripe Documentation: Error handling](https://docs.stripe.com/error-handling)
- [Stripe API Reference: Errors](https://docs.stripe.com/api/errors)
- [Stripe API Reference: Idempotent requests](https://docs.stripe.com/api/idempotency)

## Evidence Coverage Matrix

| Policy Area                     | Source URL          | Version Covered | Status  |
| ------------------------------- | ------------------- | --------------- | ------- |
| HTTP Status Codes               | Errors              | 2026-01-28      | COVERED |
| Card Error Logic (`card_error`) | Error handling      | 2026-01-28      | COVERED |
| Idempotency Rules               | Idempotent requests | 2026-01-28      | COVERED |
| API Error Logic (`api_error`)   | Error handling      | 2026-01-28      | COVERED |
| Exception Types                 | Error handling      | 2026-01-28      | COVERED |

## Version & Compatibility

- **API Version:** 2026-01-28.clover (Current).
- **Library Behavior:** Official Stripe libraries automatically translate non-200 HTTP responses into exceptions,.

## Canonical Rules (Non-Negotiable)

- **HTTP Status Code Interpretation:**
  - **2xx:** Success.
  - **400 (Bad Request):** Missing parameter; MUST NOT retry without modification.
  - **401 (Unauthorized):** Invalid API key; MUST alert engineering (configuration error).
  - **402 (Request Failed):** Valid parameters but failed request (e.g., insufficient funds).
  - **403 (Forbidden):** Permissions insufficient; MUST alert engineering.
  - **409 (Conflict):** Conflict with another request, often due to idempotency key reuse.
  - **429 (Too Many Requests):** Rate limit exceeded; MUST implement exponential backoff.
  - **5xx (Server Errors):** Stripe-side error; safe to retry if idempotent.
- **Exception Handling Strategies:**
  - **Card Errors (`Stripe::CardError`):**
    - MUST be caught explicitly.
    - The `message` attribute MUST be displayed to the user (it is human-readable),.
    - Code Logic: Check `decline_code` (for issuer reasons) and `code` (e.g., `card_declined`, `expired_card`) to determine flow,.
  - **Idempotency Errors (`Stripe::IdempotencyError`):**
    - Occurs when an `Idempotency-Key` is reused with _different_ parameters.
    - MUST NOT retry the request with the same key and new parameters,.
  - **API Errors (`Stripe::APIError`):**
    - Treat result as indeterminate. Do NOT assume success or failure.
    - MUST verify status via `retrieve` or Webhook,.
- **Idempotency Enforcement:**
  - All `POST` requests MUST include an `Idempotency-Key` header.
  - Keys MUST be unique (V4 UUIDs recommended) and are valid for 24 hours.
  - Keys MUST NOT be sent on `GET` or `DELETE` requests,.

## Prohibited Configurations

- ❌ **Swallowing Exceptions:** Catching generic errors without logging the `request_id` (from `Stripe-Request-Id` header or exception object) is PROHIBITED,.
- ❌ **Blind Retries on 4xx:** Retrying 400, 401, 403, or 404 errors is PROHIBITED; they indicate permanent logic/config faults,.
- ❌ **Reusing Idempotency Keys:** Sending a request with an existing key but modified parameters is PROHIBITED and will trigger `409 Conflict` or `IdempotencyError`,.
- ❌ **Logging Sensitive Data:** Error objects may contain `payment_method` details; logs MUST be scrubbed of PII/PCI data.

## Enforcement

- **Runtime:**
  - Stripe returns `400` family errors immediately for invalid requests.
  - Stripe returns `429` if rate limits are exceeded.
- **Idempotency Layer:**
  - If a key is reused for an identical request, Stripe returns the _original_ saved response (status code and body) without re-executing processing,.

## Failure Modes

- **Rate Limiting:** Failing to handle `429` causes dropped transactions during high traffic.
- **Ghost Charges:** Treating `APIConnectionError` or `APIError` as a hard failure without verification may result in double-charging if the original request actually succeeded at Stripe.
- **Integration Lockout:** Repeated `401`/`403` errors due to bad keys/permissions may trigger protective blocking.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/stripe-api-standards.md` (Authentication and Versioning).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `error.type` == `card_error` -> ACTION: `SHOW_USER_MESSAGE`.
- If `request.method` == `POST` -> REQUIRE: `Idempotency-Key`.
- If `response.status` == `429` -> ACTION: `EXPONENTIAL_BACKOFF`.
- If `error.type` == `idempotency_error` -> ACTION: `GENERATE_NEW_KEY` (if intentional new request).

## Verification Checklist

- [ ] Global exception handler catches `Stripe::CardError`.
- [ ] User UI displays `e.message` for card errors.
- [ ] `Idempotency-Key` is present on all POST requests.
- [ ] Logs capture `request_id` (starts with `req_`) for support triage.

## Non-Decisions

- This document does not specify the exact exponential backoff parameters (base/jitter).
- This document does not define the text for generic fallback error messages (when not a `CardError`).

## Notes

- `request_id` is critical for contacting Stripe support regarding specific failures.
- `decline_code` provides granular detail (e.g., `insufficient_funds`, `stolen_card`) useful for programmatic handling.
