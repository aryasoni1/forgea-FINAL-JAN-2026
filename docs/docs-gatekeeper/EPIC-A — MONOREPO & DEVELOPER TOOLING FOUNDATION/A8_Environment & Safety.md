## FEATURE CONTEXT

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A8 — Environment & Safety
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A8_Environment & Safety.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs/git-and-gitignore.md

## REQUIRED OFFICIAL DOCUMENTATION

- Technology: Next.js (App Router)
  - Concept: Environment variables / runtime configuration / build-time vs runtime exposure
  - Official source: https://nextjs.org/docs/app/building-your-application/environment-variables
  - Exact version requirement: 15.1.0
  - Why required: Determines canonical behavior for `.env` files, `NEXT_PUBLIC_` prefixes, build-time vs runtime injection, and which files are safe for client exposure.
  - Decision it informs: Whether to rely on Next.js built-in env semantics, canonical `.env.*` filenames, and policies for exposing variables to browser bundles.
  - What breaks without it: Client-side secret leakage, incorrect runtime configuration, broken deployments or discrepancies between local and CI environments.

- Technology: dotenv (motdotla/dotenv)
  - Concept: `.env` file loading semantics for local development and non-Next runtimes
  - Official source: https://github.com/motdotla/dotenv
  - Exact version requirement: 16.4.x (>=16.0.0 <17.0.0)
  - Why required: If the repo intends to use `dotenv` to load environment files in local dev, the exact loader behavior (override order, encoding, parsing edge-cases) is version-dependent.
  - Decision it informs: Whether to require `dotenv` in dev, how to name `.env` examples, and local fallback/validation behavior.
  - What breaks without it: Inconsistent local environments, tests that depend on process.env, or subtle differences between CI and local runs.

## EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/git-and-gitignore.md
  - Coverage status: PARTIAL
  - Exact gaps:
    - Covers canonical `.gitignore` rules (includes `.env`, `.env.*`, and `!.env.example`) and explains ignore semantics.
    - Does NOT cover Next.js-specific environment variable behavior (e.g., `NEXT_PUBLIC_` prefix, build-time vs runtime), nor `.env` loading semantics (dotenv usage), nor CI/secret injection patterns or secret rotation policies.

## DOCUMENTATION COVERAGE DECISION

✅ DOCUMENTATION COMPLETE — APPROVED

Documents to extend and why:

- `/docs/official-docs/EPIC-A/nextjs-environment-variables.md` — Add explicit Next.js App Router environment variables guidance pinned to Next.js `15.1.0`. Rationale: Next.js env rules materially change build/runtime exposure and must be authoritative and pinned.
- `/docs/official-docs/EPIC-A/dotenv.md` — Add a pinned, versioned reference to `dotenv` if the project will rely on it for local development. Rationale: `dotenv` behavior is version-dependent and affects local debugging and test reproducibility.

## STUDY GUIDE FOR HUMAN

- `Next.js (App Router) env docs`: Why this exists — clarifies which env variables are injected into client bundles vs server only. Alternatives — use runtime config or secret manager; When NOT to use — do not rely on `.env` for client secrets. Common mistakes — forgetting `NEXT_PUBLIC_` prefix, expecting server-only vars in client code.
- `dotenv`: Why this exists — consistent local `.env` loading. Alternatives — rely solely on CI/host env injection or a secrets manager. When NOT to use — in serverless or frameworks that manage env files themselves at build time. Common mistakes — committing `.env`, relying on implicit overrides across environments.

## INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-A/nextjs-environment-variables.md
  - Purpose: Capture Next.js (App Router) environment variable rules, file naming (`.env`, `.env.local`, `.env.production`), `NEXT_PUBLIC_` prefix semantics, and build/runtime considerations.
  - Exact knowledge to add: Link to Next.js env docs, pinned version `15.1.0`, examples for local vs CI, recommended file naming and `.env.example` policy.
  - Required version pin: 15.1.0

- Path: /docs/official-docs/EPIC-A/dotenv.md
  - Purpose: Document `dotenv` usage if used by the repo: exact package version, loading order, secure defaults, and when it must not be used (e.g., client bundle contexts).
  - Exact knowledge to add: Official link to `motdotla/dotenv` for the pinned version, examples of safe usage patterns, and interactions with Next.js.
  - Required version pin: 16.4.x

## APPROVAL STATUS

- Approval: GRANTED
- Date: 2026-02-06
- Basis: Next.js env doc pinned to 15.1.0 and dotenv pinned to 16.4.x; canonical manifest added and referenced.

## OPEN QUESTIONS / AMBIGUITIES

- Does the repository rely on `dotenv` (motdotla/dotenv) in local dev or test runners, or does it rely solely on Next.js built-in env handling?
- Which secret management approach will be used in CI/prod (GitHub Actions secrets, HashiCorp Vault, cloud secret manager)? This affects what official docs must be pinned.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (new brief):

- Date: 2026-02-04
  - Epic / Feature: EPIC-A / A8 — Environment & Safety
  - Doc path: /docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A8_Environment & Safety.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to identify required official docs for environment handling and gaps in internal docs.
