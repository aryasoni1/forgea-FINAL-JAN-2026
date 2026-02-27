## Official Docs Registry Additions — EPIC-F / F8 Push Tracking & Audit

This file contains registry entries to be appended to `/docs/official-docs-registry.md` for EPIC-F / F8. If automated edit of the main registry fails, merge these lines manually into the registry under an appropriate section.

### GitHub Webhooks — Webhook delivery semantics & headers

- **Technology:** GitHub Webhooks & Events
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Defines webhook delivery headers (including `X-GitHub-Delivery`), retry semantics, and recommended response handling used for event idempotency and deduplication.
- **Status:** REQUIRED

### GitHub Webhook Payload — Push event

- **Technology:** GitHub Webhook Event Payloads
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#push
- **Feature usage:** Authoritative JSON paths for `head_commit.id`, `commits[]`, and `added/modified/removed` lists used to populate `LabAttempt.changedFiles` and `commitSha`.
- **Status:** REQUIRED

### HTTP Retry Semantics (RFC 7231)

- **Technology:** HTTP/1.1 semantics and status codes
- **Version:** RFC 7231
- **Official source:** https://datatracker.ietf.org/doc/html/rfc7231
- **Feature usage:** Guides webhook response codes and retry handling decisions for idempotent processing.
- **Status:** VERIFIED

### Data Retention / Legal Policy

- **Technology:** Organization data retention & privacy policy
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** Internal legal policy (TO BE ADDED)
- **Feature usage:** Defines retention windows and allowed payload persistence for `LabAttempt` and related forensic data.
- **Status:** REQUIRED
