# FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K5_Edit Permission Enforcement
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md (Agent Orchestrator Output)


### TASKS CHECKED

- Inventory current permission enforcement locations and server-side APIs for edit/open/save operations (as requested by the orchestrator entry for K5).


### WHAT ALREADY EXISTS

- /forgea-monorepo/packages/config/src/permissions.ts — Canonical RBAC/capability model and helpers: `ROUTES`, `ROUTE_RULES`, `PERMISSIONS`, `parseSessionUser()`, `canUserPerform()`, `matchRouteRule()`, and `emitAuditEvent()`. This file centralizes capability evaluation and route rule definitions.

- /forgea-monorepo/packages/schema/src/types.ts — RBAC primitives and types: `Capability`, `SubscriptionTier`, `AdminPermission`, `SessionUser`, and `AuditEvent` interface. Defines the expected session claim shape and audit payload.

- /forgea-monorepo/apps/forgea-labs/middleware.ts — Edge middleware that checks for presence of session cookies and redirects unauthenticated users; explicitly documents that full session parsing and RBAC must occur in server components or API routes (Edge-safe middleware only checks cookie presence).

- .github/copilot-instructions.md — Contains guidance pointing to `packages/config/src/permissions.ts` and advising to use `parseSessionUser()` and `canUserPerform()` in server-side checks.


### WHAT IS PARTIALLY IMPLEMENTED

- Capability model and helper functions (`parseSessionUser`, `canUserPerform`) are implemented and available for server-side enforcement.

- Route-level rules exist in `ROUTE_RULES` which define capability checks for certain API prefixes (e.g., `/api/senior-context`, `/api/resume/generate`, `/api/labs/generate`).

- Edge middleware exists but intentionally performs only cookie presence checks; it does not perform capability or fine-grained edit permission checks (by design).


### WHAT IS MISSING

- No explicit server-side API handlers or source files were found that implement edit/open/save permission enforcement for the lab editor (no identified endpoints that validate `parseSessionUser()` + `canUserPerform()` for editor file operations such as open/save/patch or path validation).

- No discovered wiring between the capability helpers and editor-specific APIs (open/save handlers, filesystem abstraction, or Monaco integration) for step-scoped or path-scoped access control.

- No evidence of audit-hook invocation (`emitAuditEvent`) around editor edit decisions in existing source files.

- No tests or task-level docs that specify the exact enforcement points, error codes/messages, and behaviour on denial for editor actions.


### RISKS OR CONFLICTS

- Edge middleware only checks cookie presence and explicitly defers RBAC to server components; if implementers assume middleware enforces RBAC, authorization may be bypassed.

- If editor APIs are implemented without using `parseSessionUser()`/`canUserPerform()` or without server-side validation of session claims, unauthorized edits could be possible.

- `parseSessionUser()` enforces admin permission consistency (non-admins cannot carry adminPermissions) which mitigates privilege injection risks, but the absence of server-side enforcement endpoints leaves a gap.


### QUESTIONS FOR CLARIFICATION

- Are editor open/save APIs implemented outside this repository (e.g., a different service or private package)? If so, provide the repo or service path to scan.


### NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

Planner-architect, please use this code-scout report located at `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md` as the factual source. Based on the findings below, produce the task document `/docs/tasks/task-K5-<YYYY-MM-DD>.md` that precisely defines the enforcement requirements for K5. DO NOT design implementation code in this task—only define exact checks and messages.

Findings to reference (facts only):
- `packages/config/src/permissions.ts` exists and provides `parseSessionUser()`, `canUserPerform()`, `ROUTE_RULES`, and `emitAuditEvent()`.
- `packages/schema/src/types.ts` defines `Capability`, `SessionUser`, and `AuditEvent` shapes.
- `apps/forgea-labs/middleware.ts` only validates session cookie presence and explicitly instructs that RBAC belongs in server components/API routes.
- No editor-specific open/save API endpoints were found in this repository that call `parseSessionUser()`/`canUserPerform()`.

Requirements for the planner task doc (exact items to include):
- Enumerate the enforcement points required for the lab editor feature: at minimum, checks "on open", "on save", "path validation" and "step-scoped access". For each enforcement point include:
  - The exact server-side location(s) where the check must run (API route or server component path). If multiple options exist, list all acceptable locations and explain trade-offs (server component vs API route).
  - The exact capability or capability set to evaluate using `canUserPerform()` (use `Capability` enum values). If role checks are required instead, list the exact `UserRole` values.
  - Input validation requirements (allowed path prefixes, directory traversal prevention, canonicalization rules).
  - Exact HTTP status codes, response payload shapes, and user-visible error messages when denial occurs (e.g., 401 vs 403, JSON body fields). Include machine-friendly error codes/strings for telemetry.
  - Audit requirements: when to call `emitAuditEvent()` (which decisions must be auditable), minimal audit payload fields required, and where the audit should be emitted (Edge-safe sink vs server-side sink).
  - Step-scoped access semantics: define "step" boundaries, whether permissions apply per-file, per-step, or per-lab, and how to handle in-flight changes (save conflict semantics are out of scope—only permission gating required).
  - Safety guardrails for the Edge middleware guidance: explicitly note that middleware may only gate cookie presence and must not be treated as authoritative for capability decisions.
- Provide a concise list of failure modes and acceptable fallback behaviour (e.g., fail-closed; client should receive 403 with specific error code; UI should disable save button when server returns specific capability-missing response).
- Provide exact error message text, telemetry keys, and example server response bodies for both UI consumption and automated retry logic.
- Identify any additional environment variables or config flags required for enforcement or audit (e.g., `FORGEA_AUDIT_SINK_URL` already present) and state whether they must be present in staging/prod.
- Deliverables: a single task doc `/docs/tasks/task-K5-<YYYY-MM-DD>.md` that the implementer agent can follow to implement enforcement; include sample request/response examples and clear acceptance criteria.

Reference this code-scout report and list only the factual gaps observed here. Do NOT propose implementation code in the planner doc—only exact checks, messages, and acceptance criteria for the implementer.

Handoff complete. Provide this report verbatim to the next agent.