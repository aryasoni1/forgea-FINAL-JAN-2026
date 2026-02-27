# Code Scout Report — C8: API Security

## FEATURE CONTEXT
- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C8_API_Security
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md

## TASKS CHECKED
- Forgea Code Scout: list API route files and how they read session/user info
- Forgea Code Scout: call out endpoints lacking auth checks
- Security Sentinel: (handoff) review CSRF and API session validation strategy

## WHAT ALREADY EXISTS
- forgea-monorepo/apps/forgea-labs/app/api/auth/[...nextauth]/route.ts
  - Re-exports NextAuth `handlers` (`GET`/`POST`) via `apps/forgea-labs/auth.ts` and `auth.config.ts` config. This route provides the standard NextAuth endpoints (sign-in, callback, sign-out, session endpoints).
  - Observed behavior: NextAuth is mounted here; no repository-level CSRF middleware found around this route.

- forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts
  - GitHub webhook POST handler. Observed behavior: verifies HMAC `x-hub-signature-256` using `GITHUB_WEBHOOK_SECRET`, parses raw body, locates `LabSession` by `userForkUrl`, logs audit entry, and updates session state.
  - Does not use or require a user session cookie; uses HMAC verification as its auth mechanism.

- Repo-level: `apps/forgea-labs/auth.config.ts`, `apps/forgea-labs/auth.ts`, and `apps/forgea-labs/middleware.ts` are the primary auth integration points referenced by APIs and pages.

## WHAT IS PARTIALLY IMPLEMENTED
- Auth checks in APIs:
  - `webhooks/github/route.ts`: implements HMAC verification (present and explicit).
  - `auth/[...nextauth]/route.ts`: NextAuth handler present (NextAuth internally manages its auth flows). No extra repo-level wrapper observed around NextAuth endpoints.
- CSRF protections: No explicit CSRF middleware, token issuance, or origin-checking code found for app API routes in the repository source files scanned.

## WHAT IS MISSING
- Global API guard/wrapper: No shared `withAuth(handler, { roles })` wrapper or standardized API guard pattern found for app-route handlers.
- Explicit CSRF protections: No CSRF middleware or explicit anti-CSRF tokens observed for API endpoints (outside of NextAuth internals, which are not audited here).
- Central session validation in APIs: Aside from NextAuth's mounted endpoints and the Edge middleware cookie-presence check, there's no shared server-side helper used across app routes to validate DB-backed sessions and load user claims for RBAC.
- API documentation mapping: No authoritative list mapping which API routes must be protected and which may be public (webhooks are public with HMAC but this is not documented in repo docs).

## RISKS OR CONFLICTS (observed from code)
- CSRF gap: Absence of explicit CSRF protections for non-NextAuth API routes could leave endpoints vulnerable if they accept state-changing requests from browsers without anti-CSRF controls.
- Inconsistent auth patterns: Some handlers use secret-based HMAC (webhooks), NextAuth provides its own flows (auth route), and middleware checks cookie presence only — lack of a unified pattern increases risk of mistakes when adding new API routes.
- Missing env docs: `GITHUB_WEBHOOK_SECRET` appears in `.env.example`, but other critical runtime secrets for API/auth operations (e.g., `NEXTAUTH_SECRET`) are not present in the canonical `.env.example`.

## QUESTIONS FOR CLARIFICATION
- Which API routes should be considered public (HMAC/webhook-style) versus authenticated (session-based)? Is there a maintained mapping or policy document?
- Does the org expect NextAuth to be the canonical auth provider for all API routes, or should APIs rely on a shared session-validation helper independent of NextAuth internals?

## NEXT AGENT HANDOFF PROMPT (for Security Sentinel)
Please review the repository's API surface and recommend CSRF and session-validation controls.

Context (this report): docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C8_API_Security.md

Tasks:
- Enumerate CSRF protections required for browser-facing state-changing APIs; provide exact enforcement patterns (e.g., same-site + double-submit token, origin check + cookie, or framework-native pattern) that align with `GLOBAL-POLICY.md`.
- Recommend a standard API session-validation pattern for server/app-route handlers: DB-backed session validation (NextAuth DB session lookup) vs JWT verification. State required runtime calls or helper signatures (e.g., `getServerUserFromSession(req)`), but do NOT implement — only specify the expected behavior and inputs/outputs.
- Provide a suggested `withAuth(handler, { roles })` wrapper signature and error shapes (status codes and JSON error format) for use by Planner/Architect.
- Identify any API routes that must remain public (e.g., webhooks) and list the exact verification steps (headers to check and env variables required).

Output required (copy-paste-ready):
- A concise checklist of CSRF protections and session-validation approach.
- A one-paragraph recommendation (no code) describing the `withAuth` wrapper signature and error responses.
- A list of API routes discovered in this repo and their current auth/verification method (one-line per route).

Return format: plain text checklist and short paragraphs.

Handoff complete. Provide this report verbatim to the next agent.