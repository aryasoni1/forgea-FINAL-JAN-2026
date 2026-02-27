### FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C10 — UI Auth Flows
- Exact input files read:
  - /docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C10\*UI_Auth_Flows.md
  - /forgea-monorepo/apps/forgea-labs/auth.config.ts
  - /forgea-monorepo/apps/forgea-labs/auth.ts
  - /forgea-monorepo/apps/forgea-labs/app/(auth)/login/page.tsx
  - /forgea-monorepo/apps/forgea-labs/app/(auth)/signup/page.tsx
  - /forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - /forgea-monorepo/apps/forgea-labs/middleware.ts
  - /forgea-monorepo/.env.example

### REQUIRED OFFICIAL DOCUMENTATION

1. NextAuth UI integration guidance
   - Official source: https://next-auth.js.org/getting-started/introduction
   - Why: Maps provider button behavior, callbackUrl semantics, and pages.override settings to UI actions.

2. OAuth 2.0 / Provider docs
   - Official sources: GitHub OAuth docs (present), Google OAuth docs (if adding Google)
   - Why: Provider-specific consent, scopes, and redirect URI rules affect UI copy and button flows.

3. Accessibility guidance
   - Official source: WCAG / ARIA button best-practices
   - Why: Provider buttons and error announcements must be accessible.

### EXISTING INTERNAL DOCS (VERIFIED)

- `apps/forgea-labs/auth.config.ts` — NextAuth configured with GitHub + Credentials provider; signIn page set to `/login` and event hooks call AuditService.
- `apps/forgea-labs/app/(auth)/login/page.tsx` — placeholder sign-in page (correct placement for provider buttons and email form).
- `apps/forgea-labs/app/(auth)/signup/page.tsx` — placeholder signup page.
- `apps/forgea-labs/app/api/auth/[...nextauth]/route.ts` — NextAuth app-route entry (wired).
- `.env.example` — contains `GITHUB_ID`/`GITHUB_SECRET` but lacks `NEXTAUTH_SECRET`/`NEXTAUTH_URL` and Google env vars.

### DOCUMENTATION COVERAGE DECISION

⚠️ PARTIAL — EXTENSION REQUIRED

Gaps to address before implementation proceeds:

- Add UI guidance mapping NextAuth pages to `apps/forgea-labs/app/(auth)/login/page.tsx` (provider button markup, order, and aria labels).
- Add `.env.example` entries for `NEXTAUTH_SECRET` and `NEXTAUTH_URL` and, if chosen, `GOOGLE_ID`/`GOOGLE_SECRET`.
- Document UX choices: post-login redirect (callbackUrl vs fixed), post-logout redirect, and hidden-by-default email form behavior.

### RECOMMENDED INTERNAL DOCS TO ADD

- `/docs/official-docs/EPIC-C/auth-ui-guidelines.md`
  - Purpose: Exact provider button markup (GitHub, Google), primary/secondary styles, icons, aria labels, error copy mapping for NextAuth error keys, and acceptance criteria.
  - Include: `apps/forgea-labs/app/(auth)/login/page.tsx` code examples (no server changes).

- `/docs/official-docs/EPIC-C/auth-env.md`
  - Purpose: Canonical `.env.example` lines for runtime auth (NEXTAUTH_SECRET, NEXTAUTH_URL, provider IDs/secrets) and secret-store guidance.

### IMPLEMENTATION NOTES (for Implementer)

- Exact UI placement: `apps/forgea-labs/app/(auth)/login/page.tsx` (primary) and `apps/forgea-labs/app/(auth)/signup/page.tsx` (signup flow).
- Provider buttons (order & behavior):
  1. GitHub (primary) — start OAuth flow via NextAuth signIn('github', { callbackUrl })
  2. Google (secondary) — only add if `GOOGLE_ID`/`GOOGLE_SECRET` configured; otherwise omit
  - Buttons must include accessible labels (e.g., `Sign in with GitHub`) and icons.

- Email/password UI: Add hidden-by-default reveal with clear CTA `Use email instead` and keyboard focus set to email input on reveal. Validate client-side then POST to NextAuth Credentials flow.

- Redirect behavior:
  - On successful sign-in: use `callbackUrl` if present, otherwise redirect to `/dashboard`.
  - On sign-out: redirect to `/login`.

- Error & edge-state copy (exact):
  - `CredentialsSignin`: "Incorrect email or password. Please try again."
  - `OAuthAccountNotLinked`: "This account is linked to a different sign-in method. Use the original provider or contact support."
  - `SessionRequired`: "Please sign in to continue."
  - `EmailSignin`: "Check your email for the sign-in link."
  - Default fallback: "Sign-in failed. Please try again or contact support."

### SECURITY & AUDIT

- Preserve `auth.config.ts` event hooks (signIn/createUser) to continue calling AuditService. UI changes must not remove these server hooks.
- Ensure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are documented and added to `.env.example`.

### SHORT ACTION CHECKLIST (copy-paste-ready)

- Add provider buttons to `apps/forgea-labs/app/(auth)/login/page.tsx` (GitHub primary; Google optional).
- Implement hidden-by-default email/password form with reveal CTA and keyboard focus.
- Add `.env.example` lines:
  - `NEXTAUTH_SECRET=changeme-REPLACE-WITH-SECURE-RANDOM`
  - `NEXTAUTH_URL=https://app.example.com`
  - (Optional) `GOOGLE_ID=`, `GOOGLE_SECRET=` if Google is chosen
- Ensure post-login redirect uses `callbackUrl` when present, fallback `/dashboard`.
- Keep server event hooks in `apps/forgea-labs/auth.config.ts` intact.

### OPEN QUESTIONS

- Add Google provider now? (Requires provider config and env vars.)
- Post-login default: use `callbackUrl` or fixed `/dashboard`? Recommend `callbackUrl` fallback `/dashboard`.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

```
docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C10_UI_Auth_Flows.md
```

END OF BRIEF
