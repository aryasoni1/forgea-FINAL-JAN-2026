# EPIC-F — Official Docs Additions (GitHub App)

These entries are intended to be appended to `/docs/official-docs-registry.md` for EPIC-F.

### GitHub Apps — Developer Docs

- **Technology:** GitHub Apps
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/apps
- **Feature usage:** Canonical app model, installation lifecycle, and app-level authentication used by EPIC-F GitHub integration.
- **Status:** VERIFIED

### GitHub Webhooks — Events & Security

- **Technology:** GitHub Webhooks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
- **Feature usage:** Event names, payload formats, and signature verification semantics (e.g., `x-hub-signature-256`) for webhook handling.
- **Status:** VERIFIED

### Authenticating with GitHub Apps (JWT & Installation Tokens)

- **Technology:** GitHub App authentication
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps
- **Feature usage:** JWT generation, installation token exchange and lifetimes — required for programmatic API access.
- **Status:** VERIFIED

### GitHub REST API — Apps & Installations

- **Technology:** GitHub REST API (Apps endpoints)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/rest
- **Feature usage:** Endpoints used to list installations, create installation tokens, and query repository metadata.
- **Status:** VERIFIED

### Vault / KMS (Secrets Storage) — Guidance

- **Technology:** HashiCorp Vault / Cloud KMS
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.vaultproject.io/docs (or provider-specific KMS docs)
- **Feature usage:** Secure storage, rotation, ACLs, and audit logging for private keys and webhook secrets used by EPIC-F.
- **Status:** VERIFIED
