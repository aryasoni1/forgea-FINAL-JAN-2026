---
doc_id: stripe-expansion-policy
tool: Stripe
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Stripe — Response Expansion Policy

## Purpose

Governs the use of the `expand` request parameter to optimize data ingestion by hydrating related objects in a single API round-trip, minimizing "N+1" query patterns while adhering to strict depth and performance limits.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API 2026-01-28.clover)

## Scope

- Applies to: All Stripe API operations (List, Create, Retrieve, Update) where related object hydration is required.
- Does NOT apply to: Webhook payloads (which have fixed structures and cannot be expanded dynamically).

## Official Sources (Binding)

- [Stripe API Reference: Expanding Responses](https://docs.stripe.com/api/expanding_objects)
- [Stripe API Reference: Versioning](https://docs.stripe.com/api/versioning)

## Evidence Coverage Matrix

| Policy Area                        | Source Reference    | Version Covered | Status  |
| ---------------------------------- | ------------------- | --------------- | ------- |
| Expansion Syntax (`expand`)        | Expanding Responses | General         | COVERED |
| Recursive Expansion (Dot Notation) | Expanding Responses | General         | COVERED |
| List Expansion (`data.*`)          | Expanding Responses | General         | COVERED |
| Depth Limits (4 levels)            | Expanding Responses | General         | COVERED |
| Performance Implications           | Expanding Responses | General         | COVERED |

## Version & Compatibility

- **API Version:** 2026-01-28.clover (Current).
- **Endpoint Compatibility:** The `expand` parameter is available on all API requests (List, Create, Update, Retrieve) and applies only to the response of that specific request,.

## Canonical Rules (Non-Negotiable)

- **Single-Request Hydration:**
  - To avoid multiple API calls, related objects (referenced by ID) MUST be requested using the `expand` parameter.
  - _Example:_ Instead of fetching a Charge and then separately fetching the Customer, request the Charge with `expand[]=customer`.
- **Recursive Syntax:**
  - Nested objects MUST be expanded using **dot notation** (`parent.child`).
  - _Example:_ `payment_intent.customer` expands the `payment_intent` object, and then expands the `customer` object within it,,.
- **List Expansion Scope:**
  - When expanding responses from "List" endpoints, the expansion path MUST be prefixed with `data.`.
  - _Example:_ To expand customers when listing charges, use `data.customer` (or `data.payment_intent.customer`),,.
- **Depth Constraint:**
  - Expansions MUST NOT exceed a maximum depth of **four levels**.
  - _Example of Maximum Depth:_ `data.payment_intent.customer.default_source`,,.
- **Hidden Fields Access:**
  - Certain sensitive or heavy fields (e.g., `number` and `cvc` on Issuing Card objects) are excluded by default and MUST be explicitly requested via `expand` to be visible,,.

## Prohibited Configurations

- ❌ **Excessive Depth:** Requests specifying an expansion depth greater than 4 levels are PROHIBITED and will be rejected or truncated by the API,.
- ❌ **Unbounded List Expansions:** Performing deep expansions (multiple levels) on "List" requests with high `limit` values is PROHIBITED due to the risk of significant latency and processing timeouts,,.
- ❌ **Webhook Expansion:** Do NOT attempt to use `expand` parameters on Webhook endpoints; webhooks send fixed snapshots.

## Enforcement

- **API Validation:**
  - The API enforces the 4-level depth limit.
- **Client Configuration:**
  - Client libraries (Node, Python, Ruby, etc.) must pass `expand` as an array of strings,,.
  - _Curl Example:_ `-d "expand[]=customer" -d "expand[]=payment_intent.customer"`.

## Failure Modes

- **Latency Spikes:** Deep expansions on list endpoints can cause the API response time to degrade significantly, potentially triggering timeouts in the ingestion service.
- **Missing Data:** Failing to prefix list expansions with `data.` results in the API ignoring the expansion request for the items within the list.
- **Incomplete Objects:** If an ID field is not expanded, the response contains only the string ID (e.g., `"cus_123"`) instead of the full object (`{"id": "cus_123", "object": "customer", ...}`).

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/stripe-api-standards.md` (Authentication and Base URL).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `request.method` == "GET" AND `request.is_list` == true -> PREPEND `data.` to expansion paths.
- `MAX_EXPANSION_DEPTH` = 4.
- `EXPANSION_SEPARATOR` = ".".
- Use `expand` array for all foreign key hydration.

## Verification Checklist

- [ ] Ingestion jobs use `expand` for foreign keys (Customer, PaymentIntent).
- [ ] List endpoint expansions start with `data.`.
- [ ] No expansion path exceeds 4 segments.
- [ ] High-volume list requests monitor latency when using deep expansion.

## Non-Decisions

- This document does not define which specific fields are expandable for every object type; developers must check the "Expandable" label in the API reference.

## Notes

- Expanding multiple objects simultaneously is supported by passing the `expand` array multiple times (or as a list in SDKs),.
- Expansions work recursively: expanding `payment_intent` automatically includes the ID of `customer`, but expanding `payment_intent.customer` is required to get the full Customer object.
