# OAuth Providers (GitHub, Google, etc.)

- Category: Auth / Integration
- Epics: C
- Version / Requirement: Provider-specific pins required
- Intent / Critical Decision: Guidance for integrating external OAuth/OIDC providers and mapping provider attributes to internal identity models.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC (C3, C4)
- EPIC-C intent: Standardize provider integration patterns, webhook verification, and attribute mapping to `AuthIdentity` records.
- Important points:
  - Provider pins: Record provider API versions and SDK versions in the official docs registry; pin `oauth` libraries and adapters used by NextAuth.
  - Attribute mapping: Define canonical mapping for `sub`, `email`, `name`, `avatar`, and provider metadata; store raw provider payload for reconciliation/audit.
  - Webhooks & events: Verify webhook signatures, handle retries idempotently, and map events to audit logs and identity changes.
  - GDPR: Document consent, data minimization, and deletion flows tied to provider unlinking; provide user-initiated unlink actions.
  - Security: Use PKCE for public clients, rotate client secrets in Vault, and require least-privilege scopes for API tokens.
    Here is the comprehensive list of links extracted from the GitHub Apps documentation sidebar you provided. These are formatted with the absolute `https://docs.github.com` base URL, ready for use in NotebookLM.

### **GitHub Apps: General & Usage**

- [https://docs.github.com/en/apps/overview](https://docs.github.com/en/apps/overview)
- [https://docs.github.com/en/apps/using-github-apps/about-using-github-apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps)
- [https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-personal-account](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-personal-account)
- [https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-organizations](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-github-marketplace-for-your-organizations)
- [https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party)
- [https://docs.github.com/en/apps/using-github-apps/installing-your-own-github-app](https://docs.github.com/en/apps/using-github-apps/installing-your-own-github-app)
- [https://docs.github.com/en/apps/using-github-apps/requesting-a-github-app-from-your-organization-owner](https://docs.github.com/en/apps/using-github-apps/requesting-a-github-app-from-your-organization-owner)
- [https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps](https://docs.github.com/en/apps/using-github-apps/authorizing-github-apps)
- [https://docs.github.com/en/apps/using-github-apps/approving-updated-permissions-for-a-github-app](https://docs.github.com/en/apps/using-github-apps/approving-updated-permissions-for-a-github-app)
- [https://docs.github.com/en/apps/using-github-apps/reviewing-and-revoking-authorization-of-github-apps](https://docs.github.com/en/apps/using-github-apps/reviewing-and-revoking-authorization-of-github-apps)
- [https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps)
- [https://docs.github.com/en/apps/using-github-apps/privileged-github-apps](https://docs.github.com/en/apps/using-github-apps/privileged-github-apps)

### **Creating & Registering Apps**

- [https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps)
- [https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/migrating-oauth-apps-to-github-apps](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/migrating-oauth-apps-to-github-apps)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/about-the-user-authorization-callback-url](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/about-the-user-authorization-callback-url)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/about-the-setup-url](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/about-the-setup-url)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/rate-limits-for-github-apps](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/rate-limits-for-github-apps)
- [https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/creating-a-custom-badge-for-your-github-app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/creating-a-custom-badge-for-your-github-app)

### **Authentication & Development**

- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens)
- [https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/making-authenticated-api-requests-with-a-github-app-in-a-github-actions-workflow](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/making-authenticated-api-requests-with-a-github-app-in-a-github-actions-workflow)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/about-writing-code-for-a-github-app](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/about-writing-code-for-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/quickstart](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/quickstart)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-login-with-github-button-with-a-github-app](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-login-with-github-button-with-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-cli-with-a-github-app](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-cli-with-a-github-app)
- [https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-ci-checks-with-a-github-app](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-ci-checks-with-a-github-app)

### **Sharing & Maintenance**

- [https://docs.github.com/en/apps/sharing-github-apps/sharing-your-github-app](https://docs.github.com/en/apps/sharing-github-apps/sharing-your-github-app)
- [https://docs.github.com/en/apps/sharing-github-apps/making-your-github-app-available-for-github-enterprise-server](https://docs.github.com/en/apps/sharing-github-apps/making-your-github-app-available-for-github-enterprise-server)
- [https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-from-a-manifest](https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-from-a-manifest)
- [https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-using-url-parameters](https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-using-url-parameters)
- [https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration](https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration)
- [https://docs.github.com/en/apps/maintaining-github-apps/activating-optional-features-for-github-apps](https://docs.github.com/en/apps/maintaining-github-apps/activating-optional-features-for-github-apps)
- [https://docs.github.com/en/apps/maintaining-github-apps/about-github-app-managers](https://docs.github.com/en/apps/maintaining-github-apps/about-github-app-managers)
- [https://docs.github.com/en/apps/maintaining-github-apps/managing-allowed-ip-addresses-for-a-github-app](https://docs.github.com/en/apps/maintaining-github-apps/managing-allowed-ip-addresses-for-a-github-app)
- [https://docs.github.com/en/apps/maintaining-github-apps/suspending-a-github-app-installation](https://docs.github.com/en/apps/maintaining-github-apps/suspending-a-github-app-installation)
- [https://docs.github.com/en/apps/maintaining-github-apps/transferring-ownership-of-a-github-app](https://docs.github.com/en/apps/maintaining-github-apps/transferring-ownership-of-a-github-app)
- [https://docs.github.com/en/apps/maintaining-github-apps/deleting-a-github-app](https://docs.github.com/en/apps/maintaining-github-apps/deleting-a-github-app)

### **GitHub Marketplace**

- [https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps](https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-github-marketplace-for-apps)
- [https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-marketplace-badges](https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/about-marketplace-badges)
- [https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/applying-for-publisher-verification-for-your-organization](https://docs.github.com/en/apps/github-marketplace/github-marketplace-overview/applying-for-publisher-verification-for-your-organization)
- [https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/requirements-for-listing-an-app)
- [https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/security-best-practices-for-apps-on-github-marketplace](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/security-best-practices-for-apps-on-github-marketplace)
- [https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/customer-experience-best-practices-for-apps](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/customer-experience-best-practices-for-apps)
- [https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/viewing-metrics-for-your-listing](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/viewing-metrics-for-your-listing)
- [https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/viewing-transactions-for-your-listing](https://docs.github.com/en/apps/github-marketplace/creating-apps-for-github-marketplace/viewing-transactions-for-your-listing)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/rest-endpoints-for-the-github-marketplace-api](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/rest-endpoints-for-the-github-marketplace-api)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/webhook-events-for-the-github-marketplace-api](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/webhook-events-for-the-github-marketplace-api)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/testing-your-app](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/testing-your-app)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-new-purchases-and-free-trials](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-new-purchases-and-free-trials)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-changes](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-changes)
- [https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-cancellations](https://docs.github.com/en/apps/github-marketplace/using-the-github-marketplace-api-in-your-app/handling-plan-cancellations)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/drafting-a-listing-for-your-app](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/drafting-a-listing-for-your-app)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/writing-a-listing-description-for-your-app](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/writing-a-listing-description-for-your-app)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/setting-pricing-plans-for-your-listing](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/setting-pricing-plans-for-your-listing)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/configuring-a-webhook-to-notify-you-of-plan-changes](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/configuring-a-webhook-to-notify-you-of-plan-changes)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/submitting-your-listing-for-publication](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/submitting-your-listing-for-publication)
- [https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/deleting-your-app-listing-from-github-marketplace](https://docs.github.com/en/apps/github-marketplace/listing-an-app-on-github-marketplace/deleting-your-app-listing-from-github-marketplace)
- [https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/pricing-plans-for-github-marketplace-apps](https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/pricing-plans-for-github-marketplace-apps)
- [https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/billing-customers](https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/billing-customers)
- [https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/receiving-payment-for-app-purchases](https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/receiving-payment-for-app-purchases)

### **OAuth Apps**

- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/installing-an-oauth-app-in-your-personal-account](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/installing-an-oauth-app-in-your-personal-account)
- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/installing-an-oauth-app-in-your-organization](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/installing-an-oauth-app-in-your-organization)
- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/reviewing-your-authorized-oauth-apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/reviewing-your-authorized-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/connecting-with-third-party-applications](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/connecting-with-third-party-applications)
- [https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/privileged-oauth-apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/privileged-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/rate-limits-for-oauth-apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/rate-limits-for-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-a-custom-badge-for-your-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-a-custom-badge-for-your-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/modifying-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/modifying-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/activating-optional-features-for-oauth-apps](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/activating-optional-features-for-oauth-apps)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/transferring-ownership-of-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/transferring-ownership-of-an-oauth-app)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-authorization-request-errors](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-authorization-request-errors)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/troubleshooting-oauth-app-access-token-request-errors)
- [https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/deleting-an-oauth-app](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/deleting-an-oauth-app)

---

Would you like me to help you summarize the key differences between GitHub Apps and OAuth apps to help focus your NotebookLM research?
Here is the full list of links extracted from the Google Identity documentation sidebar. I've converted all relative paths into absolute URLs (`https://developers.google.com`) so you can jump straight to them.

### **Core Sign in with Google**

- **Overview:** [https://developers.google.com/identity/siwg](https://developers.google.com/identity/siwg)
- **Case Studies:** [https://developers.google.com/identity/sign-in/case-studies](https://developers.google.com/identity/sign-in/case-studies)
- **Security Bundle:** [https://developers.google.com/identity/siwg/security-bundle](https://developers.google.com/identity/siwg/security-bundle)
- **Cross-Account Protection:** [https://developers.google.com/identity/protocols/oauth2/native-app#cross-account-protection](https://www.google.com/search?q=https://developers.google.com/identity/protocols/oauth2/native-app%23cross-account-protection)
- **OAuth 2.0 Policies:** [https://developers.google.com/identity/protocols/oauth2/policies](https://developers.google.com/identity/protocols/oauth2/policies)
- **Best Practices:** [https://developers.google.com/identity/siwg/best-practices](https://developers.google.com/identity/siwg/best-practices)

### **Codelabs (Hands-on Tutorials)**

- **Android Implementation:** [https://codelabs.developers.google.com/sign-in-with-google-android#0](https://codelabs.developers.google.com/sign-in-with-google-android#0)
- **Web Button Integration:** [https://codelabs.developers.google.com/codelabs/sign-in-with-google-button#0](https://codelabs.developers.google.com/codelabs/sign-in-with-google-button#0)
- **One Tap Prompt for Web:** [https://codelabs.developers.google.com/codelabs/google-one-tap#0](https://codelabs.developers.google.com/codelabs/google-one-tap#0)
- **iOS Implementation:** [https://codelabs.developers.google.com/codelabs/sign-in-with-google-ios#0](https://codelabs.developers.google.com/codelabs/sign-in-with-google-ios#0)

### **Protocols & Standards**

- **OpenID Connect (OIDC):** [https://developers.google.com/identity/openid-connect/openid-connect](https://developers.google.com/identity/openid-connect/openid-connect)
- **Account Authorization (OAuth 2.0):** [https://developers.google.com/identity/protocols/oauth2](https://developers.google.com/identity/protocols/oauth2)
- **Cross-Account Protection (RISC):** [https://developers.google.com/identity/protocols/risc](https://developers.google.com/identity/protocols/risc)

### **Supported Platforms**

- **Android (Credential Manager):** [https://developer.android.com/identity/sign-in/credential-manager-siwg](https://developer.android.com/identity/sign-in/credential-manager-siwg)
- **iOS Integration:** [https://developers.google.com/identity/sign-in/ios/start-integrating](https://developers.google.com/identity/sign-in/ios/start-integrating)
- **Web (Client ID Setup):** [https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
- **Chrome / Web Docs:** [https://developer.chrome.com/docs/identity](https://developer.chrome.com/docs/identity)

### **Authorization & Account Linking**

- **App Verification & Compliance:** [https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance)
- **Account Linking Guide:** [https://developers.google.com/identity/account-linking](https://developers.google.com/identity/account-linking)
- **OAuth Resources & Best Practices:** [https://developers.google.com/identity/protocols/oauth2/resources/best-practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)

### **Advanced & Early Access**

- **Passkeys:** [https://developers.google.com/identity/passkeys](https://developers.google.com/identity/passkeys)
- **Credential Sharing:** [https://developers.google.com/identity/credential-sharing](https://developers.google.com/identity/credential-sharing)
- **Samples Gallery:** [https://developers.google.com/identity/samples](https://developers.google.com/identity/samples)
- **Security Bundle (Beta/EAP):** [https://developers.google.com/identity/siwg/eap](https://www.google.com/search?q=https://developers.google.com/identity/siwg/eap)

---

**Would you like me to organize these into a specific structure for your NotebookLM source titles?**
Here is the full list of links extracted from the GitHub Webhooks documentation sidebar you provided. I have converted them to absolute URLs using the `https://docs.github.com` base for easy use in NotebookLM.

### **Fundamentals**

- [https://docs.github.com/en/webhooks/about-webhooks](https://docs.github.com/en/webhooks/about-webhooks)
- [https://docs.github.com/en/webhooks/types-of-webhooks](https://docs.github.com/en/webhooks/types-of-webhooks)
- [https://docs.github.com/en/webhooks/webhook-events-and-payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)

### **Using Webhooks**

- [https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks)
- [https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries)
- [https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [https://docs.github.com/en/webhooks/using-webhooks/delivering-webhooks-to-private-systems](https://docs.github.com/en/webhooks/using-webhooks/delivering-webhooks-to-private-systems)
- [https://docs.github.com/en/webhooks/using-webhooks/editing-webhooks](https://docs.github.com/en/webhooks/using-webhooks/editing-webhooks)
- [https://docs.github.com/en/webhooks/using-webhooks/disabling-webhooks](https://docs.github.com/en/webhooks/using-webhooks/disabling-webhooks)
- [https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)

### **Error Handling & Redelivery**

- [https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)
- [https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-a-repository-webhook](https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-a-repository-webhook)
- [https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-an-organization-webhook](https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-an-organization-webhook)
- [https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-a-github-app-webhook](https://docs.github.com/en/webhooks/using-webhooks/automatically-redelivering-failed-deliveries-for-a-github-app-webhook)

### **Testing & Troubleshooting**

- [https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/viewing-webhook-deliveries)
- [https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks)
- [https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks)
- [https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/troubleshooting-webhooks](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/troubleshooting-webhooks)
- [https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/using-the-github-cli-to-forward-webhooks-for-testing](https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/using-the-github-cli-to-forward-webhooks-for-testing)

---

**Would you like me to help you create a specific "Validation & Security" summary based on these links for your internal policy docs?**
