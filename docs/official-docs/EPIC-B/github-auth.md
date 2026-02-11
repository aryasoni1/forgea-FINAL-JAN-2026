---
doc_id: github-app-auth
tool: GitHub
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# GitHub — App Authentication & Token Policy

## Purpose

Governs the authentication lifecycle for GitHub Apps, strictly enforcing the generation of JSON Web Tokens (JWT) for internal app identity and the exchange of these JWTs for short-lived Installation Access Tokens to perform resource operations.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (API 2022-11-28)

## Scope

- Applies to: All backend services acting as a GitHub App (`forgea-labs`), JWT generation, Installation Access Token exchange, and Webhook signature validation.
- Does NOT apply to: OAuth App flows or Personal Access Token (PAT) usage.

## Official Sources (Binding)

- API Versions
- About authentication with a GitHub App
- Generating a JSON Web Token (JWT) for a GitHub App
- Generating an installation access token for a GitHub App
- Rate limits for the REST API
- Validating webhook deliveries

## Evidence Coverage Matrix

| Policy Area            | Source URL                              | Version Covered | Status  |
| ---------------------- | --------------------------------------- | --------------- | ------- |
| API Version Header     | API Versions                            | 2022-11-28      | COVERED |
| JWT Claims & Signing   | Generating a JWT                        | General         | COVERED |
| Token Exchange Flow    | Generating an installation access token | General         | COVERED |
| Token Expiration (TTL) | Generating an installation access token | General         | COVERED |
| Webhook Validation     | Validating webhook deliveries           | General         | COVERED |

## Version & Compatibility

- **API Version:** `2022-11-28` MUST be specified in the `X-GitHub-Api-Version` header for all requests.
- **Signing Algorithm:** `RS256` (RSA Signature with SHA-256) is the ONLY supported algorithm for JWTs.

## Canonical Rules (Non-Negotiable)

- **JWT Generation (App Identity):**
  - **Usage:** The JWT MUST be used _only_ to authenticate as the App itself (e.g., to fetch installation IDs) or to request an Installation Access Token.
  - **Signing:** The JWT MUST be signed using the App's private key and the `RS256` algorithm.
  - **Mandatory Claims:**
    - `iat` (Issued At): MUST be set to 60 seconds in the _past_ to account for clock drift.
    - `exp` (Expires At): MUST be no more than 10 minutes into the future.
    - `iss` (Issuer): MUST be the GitHub App's Client ID (or App ID).
- **Installation Access Token (Resource Access):**
  - **Usage:** API requests to access repositories, issues, or organization data MUST use the Installation Access Token, not the JWT.
  - **Exchange:** To obtain this token, make a `POST` request to `/app/installations/INSTALLATION_ID/access_tokens` with the JWT in the `Authorization: Bearer` header.
  - **Lifecycle:** Installation access tokens expire after **1 hour**. The service MUST implement a refresh mechanism.
- **Webhook Security:**
  - **Signature Validation:** The service MUST validate the `X-Hub-Signature-256` header against the payload using the configured Webhook Secret.
  - **Algorithm:** Validation MUST use a constant-time string comparison of the HMAC-SHA256 digest.
  - **Payload:** The payload MUST be treated as UTF-8.

## Prohibited Configurations

- ❌ **JWT for Resource Access:** Do NOT use the JWT to access repository data directly; it will result in a 401 or 403 error. It is valid only for app-management endpoints.
- ❌ **Legacy Webhook Signatures:** Relying on `X-Hub-Signature` (SHA-1) is PROHIBITED. Use `X-Hub-Signature-256`.
- ❌ **Long-Lived JWTs:** Setting `exp` > 10 minutes will cause the request to fail.
- ❌ **Insecure Comparisons:** Using standard equality operators (`==`) for signature validation is PROHIBITED to prevent timing attacks.

## Enforcement

- **API Behavior:**
  - Requests without the `X-GitHub-Api-Version` header currently default to `2022-11-28` but generate a warning; explicit headers are enforced.
  - Using an expired Installation Token results in a `401 Unauthorized` response.
- **Rate Limiting:**
  - **Installation Token:** 5,000 requests per hour (minimum). Limits scale with the number of repositories (>20) and users (>20) in the installation, up to 12,500 requests per hour.
  - **Enterprise Cloud:** If installed on an Enterprise Cloud organization, the limit is 15,000 requests per hour.

## Failure Modes

- **Clock Skew:** If the system clock is ahead of GitHub's servers, a JWT with `iat` set to "now" may be rejected as "not yet valid." Always subtract 60 seconds from `iat`.
- **Token Expiry:** Long-running backfill jobs (> 1 hour) will fail if they do not refresh the Installation Access Token mid-stream.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/github-api-standards.md` (API Versioning).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `JWT_ALGORITHM` = `RS256`
- `JWT_EXPIRATION_MAX_SECONDS` = `600`
- `INSTALLATION_TOKEN_TTL_SECONDS` = `3600`
- `API_VERSION_HEADER` = `X-GitHub-Api-Version: 2022-11-28`
- `WEBHOOK_SIGNATURE_HEADER` = `X-Hub-Signature-256`

## Verification Checklist

- [ ] JWT generation sets `iat` to `now - 60s`.
- [ ] JWT generation sets `exp` to `now + 600s` (or less).
- [ ] API client handles `401` by refreshing the Installation Token.
- [ ] All API requests include `X-GitHub-Api-Version: 2022-11-28`.
- [ ] Webhook handler verifies `X-Hub-Signature-256`.

## Non-Decisions

- This document does not specify the storage mechanism for the App Private Key (e.g., Vault, AWS Secrets Manager), only that it is required for signing.

## Notes

- The Installation Access Token response includes the `expires_at` timestamp, which should be used to schedule proactive refreshes.
- Scoping permissions (`repository_ids`, `permissions`) during token exchange is supported but not mandatory for authentication.
