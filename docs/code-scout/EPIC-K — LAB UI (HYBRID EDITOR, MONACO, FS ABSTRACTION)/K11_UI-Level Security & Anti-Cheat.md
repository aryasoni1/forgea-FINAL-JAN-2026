# FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K11_UI-Level Security & Anti-Cheat
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K11_UI-Level Security & Anti-Cheat.md (Agent Orchestrator Output)


### TASKS CHECKED

- Inventory client and server code paths that could enable bulk downloads, hidden-file search, clipboard leaks, or require throttling/anti-cheat measures.


### WHAT ALREADY EXISTS

- `packages/config/src/permissions.ts` — Central RBAC/capability model and helpers (`parseSessionUser()`, `canUserPerform()`, `ROUTE_RULES`, `emitAuditEvent()`). Useful for server-side gating of sensitive operations.

- `packages/schema/src/types.ts` — Defines `Capability`, `SessionUser`, and `AuditEvent` types referenced by permission helpers.

- `apps/forgea-labs/middleware.ts` — Edge middleware that checks for session cookie presence only and explicitly defers RBAC to server components / API routes.

- `pnpm-lock.yaml` and package manifests indicate `monaco-editor`/`@monaco-editor/react` is present in the workspace (client editor surface available).


### WHAT IS PARTIALLY IMPLEMENTED

- Capability and audit helpers exist and are Edge-safe where necessary; they can be used by server APIs for auditable decisions.

- Editor dependency (`monaco-editor`) is present, implying a client-side editor surface that could expose copy/export actions, but no source-level editor logic for copy/export was found in top-level source files during this scan.


### WHAT IS MISSING

- No explicit server-side endpoints or API handlers were found that implement or gate bulk-download, export-all, hidden-file search, clipboard-capture prevention, or throttling for lab content (no identified `downloadAll`, `export`, `bulkDownload`, or `zip` handlers in source files).

- No evidence of server-side rate-limiter or throttling middleware tailored for editor actions or copy/export endpoints.

- No explicit UI-level restrictions or telemetry hooks discovered that would limit clipboard actions or bulk reads (client-side code paths for `navigator.clipboard` or `execCommand('copy')` were not found in repository source; compiled `.next` bundles contain generic clipboard-related code but not a clear app-level implementation).

- No audit invocations (`emitAuditEvent`) around potential anti-cheat decisions in discovered source files.

- No documented anti-cheat checklist, throttling config, or task-level specification in `docs/tasks` related to UI-level anti-cheat for K11.


### RISKS OR CONFLICTS

- Presence of `monaco-editor` implies a rich client editor surface. Without server-side gating or throttles, client-side actions (copy/paste, multi-file exports) may enable data exfiltration or bulk-downloads if an export API exists or is later added without RBAC.

- Relying on Edge middleware alone is insufficient — it only validates cookie presence and is explicitly not authoritative for RBAC decisions.

- Lack of audit calls around editor-sensitive actions risks blind spots for investigations or anti-cheat telemetry.


### QUESTIONS FOR CLARIFICATION

- Are lab content files stored/accessed via a separate service (e.g., `content-engine`) not scanned here? If so, provide its path or repo for scanning.

- Is there an intended server-side export/download API already planned (even if not implemented)? If yes, where should it be located (which service/app)?


### NEXT AGENT HANDOFF PROMPT (FOR planner-architect)

Planner-architect, use this code-scout report at `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K11_UI-Level Security & Anti-Cheat.md` as the factual source for creating the planning task `/docs/tasks/task-K11-<YYYY-MM-DD>.md`.

Reference the following observed facts (do NOT invent other facts):
- `packages/config/src/permissions.ts` and `packages/schema/src/types.ts` provide capability-based RBAC helpers and audit types.
- `apps/forgea-labs/middleware.ts` performs cookie presence checks only and defers RBAC to server components/API routes.
- `monaco-editor` and `@monaco-editor/react` are present in the workspace, indicating a client editor surface exists.
- No server-side endpoints or exported handlers for bulk download/export/throttles were found in this repository scan.

Planner requirements for the task doc (exact items to include; do NOT design code):
- Enumerate precise enforcement points for anti-cheat: at minimum, "bulk-download/export", "hidden-file search", "clipboard/copy prevention signals", and "save/open rate-throttling". For each enforcement point provide:
  - Exact server-side location(s) where the check must run (API route path, app/service, or server component). If multiple acceptable locations exist, list them and state trade-offs (server API vs in-process server component).
  - Exact capability checks using `Capability` enum values from `packages/schema/src/types.ts` and guidance whether role-based checks (`UserRole`) are acceptable.
  - Input validation rules for any export or listing endpoints (allowed path prefixes, canonicalization rules, directory-traversal protections).
  - Exact HTTP response status codes, machine-friendly error codes/strings, and user-visible messages for denials.
  - Audit requirements: which decisions must call `emitAuditEvent()` and the minimal `AuditEvent` fields required.
  - Throttling rules: explicit thresholds (requests/minute or requests/hour), scope (per-user, per-IP, per-lab), and fallback behaviour when limits are hit.
  - UI guidance: what the client should disable or show when the server indicates export/copy is disallowed (including example response bodies the UI can consume to disable features gracefully).
- Provide a concise list of failure modes and a "fail-closed" policy statement for each enforcement point.
- Deliverable: `/docs/tasks/task-K11-<YYYY-MM-DD>.md` containing the above, with example request/response payloads and clear acceptance criteria the implementer can follow.

Do NOT propose implementation code in the planner doc — only exact checks, messages, thresholds, and acceptance criteria.

Handoff complete. Provide this report verbatim to the next agent.