# GitHub App Integration

- Category: Integration
- Epics: F
- Version / Requirement: Pin required (GitHub Apps docs)
- Intent / Critical Decision: Canonical guidance for building and operating the Forgea GitHub App

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS (F1)
- EPIC-F intent: Implement a GitHub App for template instantiation, repository lifecycle operations, and event-driven hooks with least-privilege installation tokens.
- Important points:
  - Recommend GitHub App over OAuth App for server-to-server operations; document org vs repo installation tradeoffs.
  - Authentication: generate a JWT signed by the App's private key (PEM) to request short-lived installation tokens; document `iat`/`exp` windows and token refresh flow.
  - Permissions: maintain a permissions matrix mapping capabilities to minimal scopes (create issues vs write contents vs checks). Publish the matrix in `/docs/official-docs/EPIC-F/github-app-permissions-matrix.md`.
  - Webhooks: subscribe to the minimal necessary events (push, pull_request, workflow_run) and forward to the webhook handler; ensure HMAC verification and replay protection.
  - Secrets: store the App private key and webhook secret in Vault or cloud KMS; do not store in repo `.env` files; provide rotation playbook.
  - Rate limits & retries: document Octokit/SDK best practices for retry/backoff and handle 403/429 gracefully.
  - Local dev: provide a testing harness using `smee.io` or GitHub App test installations and a `dev` PEM kept out of source control.

## Implementation hints

- Provide a `scripts/ghapp-setup.sh` and `README.md` demonstrating creation steps, required permissions, and install steps for org owners.
- Provide example JWT creation snippet (Node.js / Python) and a sample function to exchange for an installation token.
