FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K1 — Session & Context Initialization
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md (Agent Orchestrator output)


TASKS CHECKED

- Produce a code inventory for session-related modules and locate `forgea.config.json` management notes / canonical locations (per Orchestrator Step 1).


WHAT ALREADY EXISTS

- forgea-monorepo/apps/forgea-labs/middleware.ts — Edge-safe middleware; checks for `__Secure-next-auth.session-token` and `next-auth.session-token` cookie presence and redirects unauthenticated requests for protected prefixes to `/login`.
- forgea-monorepo/apps/forgea-labs/auth.config.ts — NextAuth configuration (session options, jwt/database strategy present in compiled server code).
- forgea-monorepo/apps/forgea-labs/lib/auth.ts — server helper that calls into `auth()` to obtain the current session and gate server handlers.
- forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts — GitHub webhook handler that verifies HMAC, resolves a `LabSession` via `userForkUrl`, and updates `LabSession` status (returns 200 on no-match to avoid retries).
- forgea-monorepo/apps/forgea-lessons/components/lab-session-button.tsx (and page components) — UI entry points that trigger lab initialization flows.
- forgea-monorepo/packages/schema/src/lab-session-lifecycle.ts — Server-side lab session lifecycle and transition helper (`transitionLabSession` usage observed).
- forgea-monorepo/packages/schema/src/types.ts — Session claim types and explicit security requirements documented (immutable claims, rotation on permission change).
- forgea-monorepo/packages/schema/prisma/schema.prisma and migrations — `Session` model present; migrations for identity/auth tables and unique `sessionToken` constraints exist.
- forgea-monorepo/.github/copilot-instructions.md — Project-level guidance: Edge middleware must remain Edge-safe and session parsing + RBAC must be server-side (fail-closed semantics emphasized).
- docs/docs-gatekeeper/EPIC-F and related docs — Multiple docs reference `forgea.config.json` management, note canonical path is unresolved / BLOCKER, and enumerate validation/manifest expectations.


WHAT IS PARTIALLY IMPLEMENTED

- `forgea.config.json` management notes exist in documentation (docs-gatekeeper / EPIC-F E9), but no canonical repository path or machine-readable schema/manifest has been finalized — currently marked BLOCKER in docs.
- GitHub webhook -> `LabSession` mapping exists (handler verifies HMAC and uses `userForkUrl`), but the implementation and docs indicate missing idempotency recording, enqueue-first semantics, and DLQ handling (per docs/gatekeeper notes).
- Session issuance and lifecycle are implemented via NextAuth (database and JWT strategies evident in compiled chunks). Edge middleware purposely only checks cookie presence; full session parsing and RBAC occur server-side. Audit/event hooks and session update logic are present but spread across NextAuth config and server handlers.


WHAT IS MISSING

- Canonical repository path for `forgea.config.json` (explicit single value) — not found; docs mark as BLOCKER for template injection and manifest validation.
- Machine-readable `forgea.config.json` manifest/schema and validator tooling (schema + deterministic error codes) — referenced but not present as a canonical artifact.
- Formal, documented session-creation API contract for lab sessions (atomic repo creation + session creation with idempotency guarantees) — not found in codebase.
- Robust webhook idempotency and DLQ/enqueue-first support for GitHub webhook -> `LabSession` mapping — handler exists but lacks persistence/idempotency and DLQ mechanisms as required by docs.


RISKS OR CONFLICTS

- Session mapping via `userForkUrl` is brittle (docs recommend considering `repository.id`) — potential for missed or mis-bound sessions.
- Missing canonical `forgea.config.json` path is a blocker for reliable template injection, validation, and provenance; continuing without a canonical path risks inconsistent template handling.
- Edge middleware must remain Edge-safe; any future change that imports server-only libs into `apps/*/middleware.ts` would violate project rules and create runtime failures on the Edge.
- Multiple scattered session-handling code paths (NextAuth hooks, server helpers, lifecycle functions) increase surface area for incorrect assumptions about where session validation, rotation, and RBAC are enforced.


QUESTIONS FOR CLARIFICATION

- Confirm canonical repository path choice for `forgea.config.json` (repo root vs `/labs/<lab-id>/forgea.config.json`) so the planner can make a deterministic task doc. (If you prefer, state that this remains a blocker and list required stakeholders.)


NEXT AGENT HANDOFF PROMPT (for planner-architect)

Planner-architect — consume this code-scout report at `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md` plus the Orchestrator output referenced in `docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K1_Session & Context Initialization.md`.

Using only the facts documented in this report (do not propose designs), produce an approval-gated task document named `/docs/tasks/task-K1-<YYYY-MM-DD>.md` that:
- Lists the implementation tasks required to satisfy "Session & Context Initialization" for EPIC-K.
- References the exact files found here that must be changed or inspected (e.g., `apps/forgea-labs/middleware.ts`, `apps/forgea-labs/auth.config.ts`, `packages/schema/src/lab-session-lifecycle.ts`, webhook handler path, and `packages/schema/prisma/schema.prisma`).
- Calls out the explicit BLOCKERS noted here (canonical `forgea.config.json` path, schema, idempotency/DLQ for webhooks) and requires explicit stakeholder approvals for those BLOCKERS before implementation can proceed.
- Produces a minimal acceptance criteria checklist (security/gating items): canonical `forgea.config.json` path decided, session-creation API contract published, webhook idempotency + DLQ behavior specified and tested, and Edge middleware constraints preserved.

Do not implement, do not change code — only produce the approved task document with clear acceptance gates and stakeholder sign-off points.


---

Report generated by `forgea-code-scout` run: scanned repository for session/context surfaces and `forgea.config.json` references. See above for exact file paths and factual findings.

