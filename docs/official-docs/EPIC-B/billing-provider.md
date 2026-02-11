---
doc_id: billing-provider-policy
tool: Stripe API
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Stripe — Authentication & Security Policy

## Purpose
Governs the management of Stripe API keys, ensuring strict separation of test/live environments via prefix enforcement, mandatory transport security (HTTPS), and the application of granular permissions using Restricted API Keys.

## Status
- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API Version 2026-01-28.clover)

## Scope
- Applies to: All backend services integrating with the Stripe API, API key storage, and client-side tokenization.
- Does NOT apply to: Stripe Dashboard user access or non-API operations.

## Official Sources (Binding)
- [Stripe API Reference: Authentication](https://stripe.com/docs/api/authentication)
- [Stripe Documentation: API Keys](https://stripe.com/docs/keys)
- [Stripe API Reference: Versioning](https://stripe.com/docs/api/versioning)
- [Stripe Documentation: Error Handling](https://stripe.com/docs/error-handling)

## Evidence Coverage Matrix

| Policy Area | Source Reference | Version Covered | Status |
|------------|------------------|-----------------|--------|
| HTTPS Enforcement | Authentication | General | COVERED |
| Key Prefixes (`sk_live_`, `sk_test_`) | Authentication, API keys | General | COVERED |
| Restricted Keys (`rk_`) |,, API keys | General | COVERED |
| Organization Keys Headers |, Organization API keys | General | COVERED |
| Client-side Publishable Keys |, API keys | General | COVERED |

## Version & Compatibility
- **Tool version:** Stripe API `2026-01-28.clover`.
- **Key Format:**
    - Live Secret: `sk_live_...`
    - Test Secret: `sk_test_...`
    - Restricted: `rk_...`
    - Publishable: `pk_...`
    - Organization: `sk_org_...`

## Canonical Rules (Non-Negotiable)

- **Transport Security:**
    - All API requests MUST be made over **HTTPS**. Calls made over plain HTTP will fail.
- **Key Type Usage:**
    - **Secret Keys (`sk_`):** MUST be stored securely on the server-side (e.g., environment variables, secret manager). They MUST NOT be exposed in client-side code, mobile apps, or public repositories.
    - **Publishable Keys (`pk_`):** MAY be used in client-side code (e.g., `checkout.js`, mobile apps) to securely collect payment information.
    - **Restricted Keys (`rk_`):** Server-side integrations SHOULD use Restricted API Keys to limit permissions (Read/Write/None) to specific resources, minimizing blast radius if compromised,.
- **Environment Isolation:**
    - **Test Mode:** Requests using `sk_test_` or `pk_test_` interact with the Sandbox environment. Payments are not processed,.
    - **Live Mode:** Requests using `sk_live_` or `pk_live_` interact with the Live environment. These keys perform real transactions,.
    - Objects created in one mode are **not accessible** in the other.
- **Organization Key Headers:**
    - If using Organization-level keys (`sk_org_`), requests MUST include the `Stripe-Context` header (identifying the target account) and the `Stripe-Version` header,.

## Prohibited Configurations

- ❌ **Client-Side Secrets:** Exposing `sk_` or `rk_` keys in client-side code (HTML, JS, mobile binaries) is STRICTLY PROHIBITED,.
- ❌ **Plain HTTP:** Attempting API calls over non-secure HTTP connections.
- ❌ **Version Floating:** Failing to pin the API version. (For Org keys, `Stripe-Version` is mandatory; for standard keys, versioning is pinned at the account or request level).
- ❌ **Unauthenticated Requests:** API requests without a valid key will fail.

## Enforcement

- **Runtime Rejection:**
    - Stripe returns HTTP `401 Unauthorized` if no valid key is provided.
    - Stripe returns HTTP `403 Forbidden` (`Stripe::PermissionError`) if the key lacks necessary permissions,.
    - Stripe immediately drops plain HTTP requests.
- **Dashboard Controls:**
    - Live mode secret keys are shown **only once** upon creation. If lost, they must be rolled,.

## Failure Modes

- **Authentication Error:** Using an expired, revoked, or malformed key results in a `401` error.
- **Permission Error:** Using a Restricted Key (`rk_`) for a resource it does not have "Write" or "Read" access to results in a `403` error.
- **Environment Mismatch:** Attempting to retrieve a Live mode object (e.g., `pi_...`) using a Test mode key (`sk_test_`) will result in a `404 Not Found` (as objects do not exist across environments).

## Cross-Doc Dependencies
- Depends on:
    - `/docs/official-docs/EPIC-B/stripe-webhooks.md` (Signature verification uses a separate `whsec_` secret).
- Conflicts with:
    - NONE

## Planner Extraction Hints (Non-Human)
- If `environment` == "production", `key_prefix` MUST BE "sk_live_" OR "rk_live_".
- If `environment` == "development", `key_prefix` MUST BE "sk_test_" OR "rk_test_".
- If `key_type` == "secret", `location` MUST BE "SERVER_SIDE".
- If `key_type` == "restricted", `permissions` MUST BE DEFINED.

## Verification Checklist
- [ ] API Base URL is `https://api.stripe.com`.
- [ ] Secret keys are not committed to git.
- [ ] Production configuration uses `sk_live_` or `rk_live_`.
- [ ] CI/CD pipelines use `sk_test_` or `rk_test_`.
- [ ] If acting as a Platform/Org, `Stripe-Context` header is present.

## Non-Decisions
- This document does not define the specific retry logic for `429 Too Many Requests` (Rate Limits), though 429s are acknowledged as a failure mode.
- This document does not specify the method of secret rotation, only that rotation is possible via the Dashboard.

## Notes
- Live mode secret keys cannot be retrieved after the initial reveal; they must be rotated if lost.
- Organization keys do not have a publishable equivalent; they are strictly secret.