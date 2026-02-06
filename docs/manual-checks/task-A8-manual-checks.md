# Task A8 — Manual Checks

Date: 2026-02-06

## Checks

1. Open `/forgea-monorepo/.env.example` and confirm it lists:
   - `DATABASE_URL`
   - `FORGEA_AUDIT_SINK_URL`
   - `FORGEA_SECURITY_ALERT_SINK_URL`
   - `GITHUB_ID`
   - `GITHUB_SECRET`
   - `GITHUB_WEBHOOK_SECRET`
   - `NODE_ENV`

2. Open `/docs/official-docs/EPIC-A/nextjs-environment-variables.md` and confirm:
   - Version is pinned to **v15.1.0**.
   - The Forgea environment manifest table matches the variables in `.env.example`.
   - It states that no client-exposed env vars are currently defined.

3. Open `/docs/official-docs/EPIC-A/dotenv.md` and confirm:
   - Version is pinned to **v16.x** with a **16.4.x** primary pin.
   - It references the canonical `.env.example` for onboarding.

4. Open `/forgea-monorepo/packages/config/src/env.ts` and confirm `validateEnv()` throws when `DATABASE_URL` is missing.

5. Open `/forgea-monorepo/packages/schema/src/db.ts` and confirm it calls `validateEnv()` before using `process.env.DATABASE_URL`.

6. Open `/docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A8_Environment & Safety.md` and confirm approval is recorded.
