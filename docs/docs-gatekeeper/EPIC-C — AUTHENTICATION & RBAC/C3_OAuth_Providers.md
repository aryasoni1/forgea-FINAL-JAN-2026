## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C3 — OAuth Providers
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C3_OAuth_Providers.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C3\*OAuth_Providers.md
  - /Users/aryasoni/Desktop/Forgea/docs/GLOBAL-POLICY.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For safe implementation the following official specs/guides are required.

- Technology: OAuth 2.0
  - Concept: Authorization framework (Authorization Code, PKCE, token handling)
  - Official source: https://datatracker.ietf.org/doc/html/rfc6749
  - Exact version requirement: RFC 6749 (October 2012)
  - Why required: Defines core flows, redirect URI rules, and token semantics.
  - Decision it informs: choice of flow (Authorization Code + PKCE), token lifetime and refresh-token usage.
  - What breaks without it: insecure token handling, broken auth flows, CSRF/exfiltration risks.

- Technology: OpenID Connect (if identity tokens used)
  - Concept: ID token formats, claim validation, user info
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: OpenID Connect Core 1.0 (Final)
  - Why required: Validating ID tokens and user identity flow.
  - Decision it informs: whether to use OIDC vs plain OAuth
  - What breaks without it: incorrect identity validation and session establishment.

- Technology: GitHub OAuth (provider-specific integration)
  - Official source: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provider registration steps, redirect URI rules, and scope definitions.
  - Decision it informs: exact redirect URI registration and minimal scope selection for GitHub.

- Technology: Google OAuth 2.0 (provider-specific integration)
  - Official source: https://developers.google.com/identity/protocols/oauth2
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provider registration, consent screen, OAuth scopes for Google APIs.

- Technology: Secret management (HashiCorp Vault / Cloud Secret Managers)
  - Official sources (examples): https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html | https://cloud.google.com/secret-manager/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Secure storage, access control, rotation guidance for client secrets.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C3_OAuth_Providers.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis and agent plan but no concrete repo locations, env var names, or redirect URIs.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C3\*OAuth_Providers.md
  - Coverage status: PARTIAL
  - Exact gaps: Notes missing repo scan; does not list file paths, env var names, or redirect URIs.

- /Users/aryasoni/Desktop/Forgea/docs/GLOBAL-POLICY.md
  - Coverage status: INSUFFICIENT
  - Exact gaps: Only runtime/versioning rules present; no guidance on secret storage, naming, rotation, or OAuth-specific handling.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry currently lacks canonical entries for OAuth 2.0, OpenID Connect, provider-specific guides, and secret-management references required by this feature.

---

## DOCUMENTATION COVERAGE DECISION

❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

Required new internal docs (minimum):

- `/docs/official-docs/authentication/oauth2.md` — Canonical OAuth2 guidance (pin RFC 6749), flows to use (Auth Code + PKCE), redirect URI rules, recommended token lifetimes.
- `/docs/official-docs/authentication/openid-connect.md` — If OIDC is used, pin OIDC Core 1.0 and document ID token validation.
- `/docs/official-docs/authentication/secret-management.md` — Secret storage policy: approved backends (Vault, AWS/GCP Secret Manager), naming conventions, rotation cadence, and minimal exposure rules.
- `/docs/official-docs/authentication/provider-guides/github.md` — Minimal required scopes, registration checklists, redirect URI patterns.
- `/docs/official-docs/authentication/provider-guides/google.md` — Consent screen, required OAuth scopes, redirect URI registration checklist.

Justification: current internal docs and registries do not provide the authoritative, version-pinned guidance implementers need to register providers, name secrets, and verify least-privilege scopes.

---

## STUDY GUIDE FOR HUMAN

- OAuth 2.0 (RFC 6749): Why — core protocol for delegated authorization. Alternatives — SAML or proprietary SSO (use only if required). When NOT to use — do not use implicit flow for server apps. Common mistakes — storing client secrets in source, forgetting PKCE for public clients, registering wildcard redirect URIs.

- OpenID Connect: Why — standardized identity on top of OAuth. Alternatives — custom identity endpoints. When NOT to use — avoid requesting unnecessary claims/scopes. Common mistakes — failing to validate ID token signature/nonce.

- Provider docs (GitHub/Google): Why — provider-specific constraints (scopes, redirect rules). Alternatives — generic OAuth only if provider supports required APIs. When NOT to use — do not assume identical scopes across providers. Common mistakes — over-scoping and missing required redirect URI formats.

- Secret management: Why — avoid secret leakage and enable rotation. Alternatives — platform env vars (acceptable only when managed by a secret backend). When NOT to use — never commit secrets to repo or plain text config. Common mistakes — storing long-lived secrets without rotation, using shared accounts for app credentials.

---

## INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/authentication/oauth2.md
  - Purpose: Prescribe OAuth2 flows (Authorization Code + PKCE), token lifetimes, redirect URI validation rules, and client types.
  - Exact knowledge to add: Pin RFC 6749, example Authorization Code flow, minimal server-side validation checklist, recommended token expiry values.
  - Required version pin: RFC 6749 (October 2012)

- Path: /docs/official-docs/authentication/secret-management.md
  - Purpose: Canonical secret storage and naming conventions for app credentials.
  - Exact knowledge to add: Approved backends (Vault, AWS/GCP Secret Manager), naming convention `forgea/<env>/oauth/<provider>/<client-id|client-secret>`, access control roles, rotation cadence (e.g., 90 days) and emergency rotation steps.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED (platform-specific docs)

- Path: /docs/official-docs/authentication/provider-guides/github.md
  - Purpose: Implementation checklist for GitHub OAuth Apps
  - Exact knowledge to add: Required minimal scopes, example redirect URIs, env var names to use, and verification steps.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED

---

## OPEN QUESTIONS / AMBIGUITIES

- Has a full repository scan been performed to locate any hidden provider configs or committed secrets? (Needed — blocker.)
- Which OAuth providers are required for MVP (GitHub, Google, others)?
- What is the canonical secret storage platform for Forgea (Vault, AWS, GCP, or platform env only)?
- What are the deployment URLs to register as redirect URIs for each environment (dev/stage/prod)?

---

## MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C3 — OAuth Providers
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C3_OAuth_Providers.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for OAuth provider integration and secret handling.

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C3 — OAuth Providers
  - Doc path: /docs/official-docs/authentication/oauth2.md
  - Status: REQUIRED
  - Reason: Canonical OAuth2 spec and pinned guidance must be present before Planner can produce safe provider registration tasks.

---

END OF BRIEF
