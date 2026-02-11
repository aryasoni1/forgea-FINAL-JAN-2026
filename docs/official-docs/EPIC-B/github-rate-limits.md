---
doc_id: github-rate-limits
tool: GitHub
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# GitHub — API Rate Limit & Ingestion Policy

## Purpose

Defines the mandatory back-off and retry logic for GitHub API interactions, specifically for high-volume operations like audit log ingestion and metadata backfilling, to prevent service suspension due to rate limit violations.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API version 2022-11-28)

## Scope

- Applies to: All REST API requests, specifically handling of `X-RateLimit` headers, `403`/`429` response codes, and concurrency controls.
- Does NOT apply to: GraphQL point calculation specifics (unless affecting shared limits).

## Official Sources (Binding)

- Rate limits for the REST API - GitHub Docs
- Best practices for using the REST API - GitHub Docs
- API Versions - GitHub Docs

## Evidence Coverage Matrix

| Policy Area               | Source URL                            | Version Covered | Status  |
| ------------------------- | ------------------------------------- | --------------- | ------- |
| Primary Limit Headers     | Rate limits for the REST API          | 2022-11-28      | COVERED |
| Secondary Limits (Bursts) | Rate limits for the REST API          | 2022-11-28      | COVERED |
| Retry/Back-off Logic      | Best practices for using the REST API | 2022-11-28      | COVERED |
| Mutative Request Pacing   | Best practices for using the REST API | 2022-11-28      | COVERED |

## Version & Compatibility

- **Tool version:** REST API `2022-11-28`.
- **Authentication:** Primary rate limits vary by authentication type (User vs. App Installation vs. Enterprise),.

## Canonical Rules (Non-Negotiable)

- **Header Monitoring:**
  - Every API response MUST be inspected for `x-ratelimit-remaining` and `x-ratelimit-reset` headers.
- **Primary Limit Exhaustion:**
  - If `x-ratelimit-remaining` is `0`, the client MUST STOP making requests immediately.
  - Requests MUST NOT resume until the time specified by `x-ratelimit-reset` (UTC epoch seconds).
- **Secondary Rate Limits (Abuse Detection):**
  - **Concurrency:** No more than **100 concurrent requests** are allowed. This limit is shared across REST and GraphQL.
  - **CPU Limit:** No more than 90 seconds of CPU time per 60 seconds of real time is allowed.
  - **Content Creation:** No more than 80 content-generating requests (POST, PUT, PATCH, DELETE) per minute are allowed.
- **Back-off and Retry Logic:**
  - If a `403` or `429` response is received:
    - **With `retry-after` header:** The client MUST wait for the number of seconds specified in the header before retrying,.
    - **Without `retry-after` header:** The client MUST wait for at least **one minute** before retrying.
    - **Persistent Failure:** If requests continue to fail, the client MUST implement an exponentially increasing wait time.
- **Mutative Request Pacing:**
  - For `POST`, `PATCH`, `PUT`, or `DELETE` requests, the client MUST wait at least **one second** between each request to avoid triggering secondary limits.

## Prohibited Configurations

- ❌ **Ignoring `retry-after`:** Retrying a request before the `retry-after` period has elapsed is strictly prohibited.
- ❌ **Concurrent Bursting:** Exceeding 100 concurrent requests is prohibited.
- ❌ **Polling:** Polling the API for data is prohibited; Webhooks MUST be used instead.
- ❌ **Ignoring Errors:** Intentionally ignoring repeated `4xx` or `5xx` validation errors is prohibited and may lead to suspension.
- ❌ **Manual URL Parsing:** Parsing URL values from response bodies (e.g., pagination links) is prohibited; use Link headers or specific fields (e.g., `number`) instead,.

## Enforcement

- **Runtime Behavior:**
  - GitHub returns HTTP `403` (Forbidden) or `429` (Too Many Requests) when limits are exceeded,.
  - `x-ratelimit-remaining` drops to `0`.
- **Service Suspension:**
  - Continuing to make requests while rate-limited or ignoring validation errors results in the **banning of the integration**,,.

## Failure Modes

- **Integration Ban:** The application is blocked from accessing the API entirely due to abuse detection mechanisms.
- **Ingestion Lag:** Audit logs or metadata backfills pause until the `reset` time or `retry-after` period expires.
- **Data Gaps:** If pagination is mishandled during a rate limit event, data pages may be skipped.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/github-app-auth.md` (Authentication method determines the specific primary limit bucket,).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `header.x-ratelimit-remaining` == 0 -> ACTION: SLEEP( `header.x-ratelimit-reset` - NOW ).
- If `response.status` == 403 OR 429 -> CHECK `header.retry-after`.
- If `request.method` IN [POST, PUT, PATCH, DELETE] -> ACTION: SLEEP(1000ms) after request.
- `concurrency_limit` = 100.

## Verification Checklist

- [ ] Ingestion service observes `retry-after` header.
- [ ] Ingestion service respects `x-ratelimit-reset`.
- [ ] Mutative requests are serialized with 1-second delays.
- [ ] Concurrency is explicitly capped at 100 threads/processes.

## Non-Decisions

- This document does not specify the datastore for the request queue (e.g., Redis vs. Memory).
- This document does not define the exact logic for distributing limits across multiple installations.

## Notes

- Unauthenticated requests are limited to 60 per hour.
- Authenticated requests (GitHub App in Enterprise) are limited to 15,000 per hour.
- Search endpoints have their own separate, more restrictive limits.
