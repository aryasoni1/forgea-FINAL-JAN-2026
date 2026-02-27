# GitHub App Auth

- Category: Integration
- Epics: F
- Version / Requirement: Pin required
- Intent / Critical Decision: JWT + installation token exchange for API access.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC (OAuth Providers / GitHub integration)
- EPIC-C intent: Use GitHub App authentication for provider-backed identity linking and minimal-scope tokens for mapping GitHub identities to local users.
- Important points:
  - Document JWT creation and installation token rotation; pin Octokit / SDK versions and verify signature validation.
  - Map GitHub identities to internal `AuthIdentity` records, handle account unlinking, and record provider metadata for audits.
  - Ensure webhook and API credentials live in Vault and are not embedded in code or logs.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use GitHub App authentication flows for lab lifecycle operations and automated repository actions.
- Important points:
  - Document exact JWT generation parameters and installation token exchange flow used by the Forgea GitHub App; pin Octokit or GitHub SDK versions used in CI.
  - Provide a runbook for safe private-key storage, rotation, and emergency revocation; ensure verifiers and CI use ephemeral installation tokens retrieved from Vault.
  - Recommend implementing fine-grained rate-limit handling and token-scoped retry semantics when performing repository operations (create repository from template, push scaffolding, set CODEOWNERS).
