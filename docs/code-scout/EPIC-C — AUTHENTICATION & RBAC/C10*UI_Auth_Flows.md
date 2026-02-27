# FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C10 — UI Auth Flows
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C10_UI_Auth_Flows.md

### TASKS CHECKED

- Forgea Code Scout Prompt: Find login pages/components and list where provider buttons would be wired. Report any existing email/password UI.

### WHAT ALREADY EXISTS

- apps/forgea-labs/auth.config.ts: NextAuth configuration using PrismaAdapter. Contains GitHub OAuth provider and a Credentials provider (email/password). Pages override sets signIn -> "/login". Event hooks log signIn/createUser to AuditService.

- apps/forgea-labs/auth.ts: Exposes NextAuth handler helpers and exports (handlers, auth, signIn, signOut) wired to the auth config.

- apps/forgea-labs/app/(auth)/login/page.tsx: Source-level sign-in page present in the app router. Current content is a minimal placeholder — no provider buttons or email form implemented yet.

- apps/forgea-labs/app/(auth)/signup/page.tsx: Signup page present; currently a minimal placeholder.

- apps/forgea-labs/app/api/auth/[...nextauth]/route.ts: NextAuth app-route entry (API) present and wired to auth.config.ts (build artifacts also show corresponding route bundle in .next).

- apps/forgea-labs/middleware.ts: Edge-safe middleware redirects unauthenticated requests for protected routes to `/login` by checking next-auth session cookies.

- forgea-monorepo/.env.example (exists): environment variables referenced by auth.config.ts (e.g., GITHUB_ID, GITHUB_SECRET) expected in environment.

### WHAT IS PARTIALLY IMPLEMENTED

- apps/forgea-labs/auth.config.ts: Credentials provider authorize() implements server-side verification (Prisma user lookup + bcrypt), so email/password auth backend exists, but there is no corresponding email/password form UI in the login page source.

- apps/forgea-labs/app/(auth)/login/page.tsx and signup/page.tsx: Pages exist but are placeholders. They are the correct locations to wire OAuth provider buttons and the optional email form.

### WHAT IS MISSING

- Provider UI wiring: The login page does not include OAuth provider buttons (GitHub button UI is missing). The physical place to add them is apps/forgea-labs/app/(auth)/login/page.tsx.

- Google provider configuration: No Google provider is present in auth.config.ts (only GitHub and Credentials). If Google is desired, provider config and env vars (GOOGLE_ID, GOOGLE_SECRET) are missing.

- Email/password UI: Although a Credentials provider exists server-side, there is no email/password form on the login page (so Credentials cannot be used from UI yet).

- Logout redirect policy: auth.config.ts sets pages.signIn and error, but no explicit signOut or post-signout redirect pages were found. Implementer will need a logout redirect target (spec not present).

- Hide-by-default behavior: UX requirement to hide email login by default (with explicit reveal) is not implemented; no UI element exists to implement this UX.

### RISKS OR CONFLICTS (observed in repo)

- Search noise from compiled outputs: Repository contains many .next build artifacts. Searches should be limited to source under apps/**/app and packages/** to avoid false positives.

- Event hooks and adapter are already wired (Prisma + AuditService). Any change to sign-in flow should preserve existing audit hooks in auth.config.ts.

### QUESTIONS FOR CLARIFICATION (only if needed)

- Should Google be added as a provider for this feature? (auth.config.ts currently lacks Google.)
- Preferred post-login default redirect: should it be previous-protected-page (callbackUrl) or a fixed route (e.g., `/dashboard`)?
- Preferred post-logout redirect target (e.g., `/login`)?

### NEXT AGENT HANDOFF PROMPT (for UX Designer / Planner)

Role: UX Designer / Planner
Reference: This Code Scout report at docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C10*UI_Auth_Flows.md

Using the findings in this report, produce `task-C10.md` that will guide the Implementer. The task must include:

- Exact UI placement: confirm `apps/forgea-labs/app/(auth)/login/page.tsx` as the page where provider buttons and hidden email form will be added.
- OAuth buttons: copy, icons, and primary/secondary styles for GitHub and Google (note: GitHub provider already configured; Google provider not configured per this report). Indicate button order and behavior.
- Email login: spec the hidden-by-default email/password reveal interaction (text, CTA label, keyboard focus behavior, validation messages).
- Redirect behavior: explicit post-login and post-logout redirect targets and rules (including use of `callbackUrl` when present). Define default target if none provided.
- Error & edge-state copy: exact copy for common NextAuth error keys (CredentialsSignin, OAuthAccountNotLinked, SessionRequired, EmailSignin, default fallback). Include where to surface errors on the login page.
- Acceptance criteria: actionable checks the Implementer and QA can run (e.g., "Click GitHub button -> OAuth flow starts -> returns to callbackUrl or /dashboard", "Reveal email form -> submit valid credentials -> session created and redirected").
- Accessibility notes: keyboard focus, aria labels for provider buttons, and visible error announcements.

Constraints: Do not change server-side wiring in auth.config.ts. The Implementer will use the produced `task-C10.md` to add UI and, if required, extend auth.config.ts for additional providers.

Deliverable: `task-C10.md` (markdown) placed in docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/ or another docs path you prefer. Reference the source paths in this report when describing implementation points.

Handoff complete. Provide this report verbatim to the next agent.