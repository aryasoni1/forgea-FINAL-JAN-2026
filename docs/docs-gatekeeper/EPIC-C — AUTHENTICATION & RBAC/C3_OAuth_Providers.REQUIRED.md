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
