---
doc_id: github-permissions-policy
tool: GitHub
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# GitHub — App Permissions & Scope Policy

## Purpose

Governs the classification and selection of GitHub App permissions (Repository, Organization, and Account) to enforce the Principle of Least Privilege, minimizing the security footprint of the application integration.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: GitHub App registration manifests, installation access tokens, and user access tokens.
- Does NOT apply to: OAuth App scopes (legacy) or Personal Access Tokens (PATs) unless used as a fallback.

## Official Sources (Binding)

- [Choosing permissions for a GitHub App](https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/choosing-permissions-for-a-github-app)
- [Permissions required for GitHub Apps](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps)
- [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)

## Evidence Coverage Matrix

| Policy Area               | Source URL                            | Version Covered | Status  |
| ------------------------- | ------------------------------------- | --------------- | ------- |
| Permission Classification | Choosing permissions for a GitHub App | N/A             | COVERED |
| Implicit Public Access    | Choosing permissions for a GitHub App | N/A             | COVERED |
| Webhook Scope Binding     | Choosing permissions for a GitHub App | N/A             | COVERED |
| Permission Modification   | Choosing permissions for a GitHub App | N/A             | COVERED |
| Endpoint Requirements     | Permissions required for GitHub Apps  | N/A             | COVERED |

## Version & Compatibility

- **Tool version:** GitHub REST API (Version independent for permission definitions).
- **Token Type:** Permissions apply to specific Access Token types (User-to-Server `UAT`, Server-to-Server `IAT`).

## Canonical Rules (Non-Negotiable)

- **Permission Classification:**
  - **Repository Permissions:** MUST be used for accessing resources within repositories (e.g., contents, issues, pull requests).
  - **Organization Permissions:** MUST be used for accessing organization-level resources (e.g., members, projects, teams).
  - **Account Permissions:** MUST be used for accessing user-specific resources (e.g., email addresses, gpg keys).
- **Zero-Trust Default:** GitHub Apps have **zero** permissions by default. All access MUST be explicitly requested in the app manifest.
- **Implicit Public Read:** Apps authorized by a user possess _implicit_ permissions to read public resources. Do NOT request explicit permissions for public data access unless acting as an installation without user context.
- **Webhook Scope Binding:**
  - Subscribing to a webhook event REQUIRES the corresponding permission.
  - _Example:_ Subscribing to `team` events requires "Members" organization permission.
  - _Example:_ Subscribing to `push` events requires "Contents" repository permission.
- **Metadata Scope:** The "Metadata" repository permission provides read-only access to basic repository details, collaborators, and statistics. This is often the minimum baseline.

## Prohibited Configurations

- ❌ **Unjustified "Administration" Access:** Requesting "Administration" permissions is PROHIBITED unless the app explicitly requires managing repository settings or branch protection rules. This permission generates high friction during installation.
- ❌ **Broad Write Access:** Requesting `write` permission when `read` is sufficient is PROHIBITED.
- ❌ **Speculative Scoping:** Requesting permissions for "future features" is PROHIBITED. Permissions must map 1:1 to active app functionality.

## Enforcement

- **Installation Prompt:** Users are presented with a list of requested permissions during installation.
- **Re-Authorization Lock:** Modifying the permissions of a registered GitHub App triggers a prompt for the owner of every installation to approve the new permissions.
  - Until approved, the installation continues to function with the **OLD** permissions.
- **Header Validation:** The API response header `X-Accepted-GitHub-Permissions` MUST be used to verify which permissions were accepted and required for a given endpoint.

## Failure Modes

- **403 Forbidden:** Occurs if the app attempts an API request without the specific permission required.
- **401 Unauthorized:** Occurs if the user authorizes the app but lacks the permission themselves (User Access Token context).
- **Missing Webhooks:** If permissions are removed or insufficient, the associated webhook events will disappear from the app registration options and stop firing.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/github_api.md` (Webhooks require specific permissions).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `resource` == "code", `permission` = "Contents".
- If `resource` == "issues", `permission` = "Issues".
- If `resource` == "users", `permission` = "Account".
- If `event` is subscribed, corresponding `permission` MUST be present in manifest.

## Verification Checklist

- [ ] App manifest requests only strictly necessary permissions.
- [ ] "Administration" permission is NOT requested without exemption.
- [ ] Webhook subscriptions align with requested permissions.
- [ ] Public read access relies on implicit permissions where possible.

## Non-Decisions

- This document does not define the specific list of permissions for the EPIC-B app, only the rules for selecting them.
- This document does not cover fine-grained Personal Access Tokens (PATs).

## Notes

- "Repository" permissions allow access to resources owned by the account where the app is installed.
- User Access Token success depends on the intersection of the App's permissions AND the User's permissions.
