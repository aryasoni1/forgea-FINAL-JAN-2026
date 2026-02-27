### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K10_Verification & Preview Status
- Source: Agent Orchestrator Output (docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K10_Verification & Preview Status.md)

### TASKS CHECKED

- Discover verification endpoints and status payload formats (forgea-code-scout responsibility per orchestrator Step 1)

### WHAT ALREADY EXISTS

- apps/forgea-labs/components/workspace/verification-overlay.tsx — UI overlay component shown while verification runs (spinner + "Verifying code integrity" text).
- apps/forgea-labs/components/workspace/action-bar.tsx — Action bar with `Verify Now`, `Reset Instance`, and `Submit Proof` buttons; `Verify Now` is disabled while `isVerifying` is true.
- apps/forgea-labs/components/workspace/main-shell.tsx — Workspace composition, client-side `WorkspaceState` and `handleVerifyNow()` flow. Current `handleVerifyNow` simulates verification using `setTimeout` and appends console log entries; locks editor via `isVerifying` and shows `VerificationOverlay` while active.
- apps/forgea-labs/components/workspace/console.tsx — `TruthMachineConsole` renders verifier logs with color-coded types (`scanning`, `complete`, `error`) and autoscroll behavior.
- apps/forgea-labs/app/(workspace)/ticket/[labId]/verify/page.tsx — Verify page placeholder present and mapped in routes manifest. (UI route exists for ticket verify.)
- apps/forgea-labs/app/api/webhooks/github/route.ts — GitHub webhook route (server). Observed behavior:
  - Accepts `push` events only and verifies `x-hub-signature-256` using `GITHUB_WEBHOOK_SECRET`.
  - Parses payload.repository.html_url and payload.after (commit SHA).
  - Finds a matching `labSession` (Prisma) with `userForkUrl` equal to repository URL and status IN_PROGRESS or STUCK.
  - Logs an audit entry via `AuditService.log` for `LAB_VERIFY_ATTEMPT` (audit failures are logged but do not block flow).
  - Calls `transitionLabSession` to update session state and `lastActivityAt`.
  - Returns 200/Success for matched sessions; returns 200 for non-matching sessions and returns 401 on HMAC failure or missing webhook secret.
- apps/forgea-labs/app/integrity/page.* (server bundle artifacts) — UI that displays verification runner statuses and a `VERIFICATION_STREAM` area in the app; shows labels such as `RUNNING`, `HEALTHY`, and named nodes like `VERIFICATION_RUNNER_NODE_A` in compiled output.
- Audit & lab session primitives present in server code (use of `AuditAction`, `transitionLabSession`, `db.labSession`, `LabStatus`), indicating server-side session state management and audit trail integration.

### WHAT IS PARTIALLY IMPLEMENTED

- Client-side verification UI exists and is wired to lock UI during a verification run, but the main verification flow in `main-shell.tsx` is a local simulation (timed `setTimeout`) rather than integrated with a backend verification job API.
- There is a GitHub webhook that advances lab session state on push events, but no discovered public server API endpoint in the repository for: submitting a verification job, polling verification job status, or receiving structured verification status callbacks (beyond the webhook handling push events).
- The `VERIFICATION_STREAM` UI (integrity page) displays runner health/status in compiled artifacts, but there is no clearly documented websocket/streaming endpoint or server stream handler source file discovered in the repo search results (source-level stream producer not found in scanned source files; compiled artifacts reference it).

### WHAT IS MISSING

- A documented, discoverable verification-job API (start job, job id response) that the UI can call to start a real verification run instead of local simulation (not found in repo source).
- A canonical verification status payload schema (fields, status enum values, timestamps, optional diagnostics) for server→client status updates or callbacks — not found in repo docs or source.
- A polling or websocket/streaming public endpoint and its contract for the UI to receive verification progress updates and final results (no source-level stream route found; compiled UI references it but producer not located).
- Mapping of verification statuses to UI states and gating rules (e.g., which statuses should lock the editor, which allow progression, which show failure modal). This mapping is referenced in orchestrator notes but is not codified in the repo.
- A documented polling cadence or client-side retry/backoff strategy for the verification status (no such setting located in source or docs).

### RISKS OR CONFLICTS

- Information exposure risk: verification logs and stream lines (console logs, runner messages, commit SHAs) surface internal details and could leak sensitive build or repo data if sent to unauthenticated clients — code shows commit SHA is logged and audit events store labId + commitSha.
- Partial server/client mismatch: UI currently simulates verification locally while server-side webhook advances `labSession`; without a verification-job API, the UI cannot reflect real backend verification state, creating possible UX inconsistencies.
- Silent failures: the GitHub webhook intentionally returns 200 on processing errors to avoid retries; this prevents upstream retries but may hide transient server failures unless operators monitor logs/audit trails.

### QUESTIONS FOR CLARIFICATION

- Should the UI drive verification via an explicit "start verification" API call (recommended), or should verification be driven exclusively by external events (GitHub pushes / webhooks)?
- Do verification runners publish progress events via a streaming endpoint (websocket / SSE) today, and if so where is that source (not found during scan)?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: This code-scout report documents existing verification UI components and the GitHub webhook that advances `labSession`. It also lists missing server→client verification API endpoints and the absent canonical status payload schema. See this report for exact file references and observed behaviors.

Task: Produce `/docs/tasks/task-K10-<YYYY-MM-DD>.md` that specifies the UI ↔ backend verification contract and UI states for K10.

Required inputs (use repository sources referenced in this report):
- `apps/forgea-labs/components/workspace/main-shell.tsx` — client flow currently simulates verification.
- `apps/forgea-labs/components/workspace/verification-overlay.tsx` — overlay shown during verification.
- `apps/forgea-labs/components/workspace/console.tsx` — log UI expecting `scanning|complete|error` types.
- `apps/forgea-labs/app/api/webhooks/github/route.ts` — existing webhook behavior for `push` events and `labSession` transitions.

Deliverable (exact requirements for planner-architect):
- Define a minimal verification-job API surface (HTTP) with paths, methods, request/response schemas, and error cases for: start verification, get verification status (by job id or session id), and cancel (optional).
- Define the verification-status payload schema (status enum values, timestamps, progress percent, optional diagnostics/messages, commitSha, jobId, finalVerdict, signer/proof references).
- Map status enum values to UI states and precise gating rules: which UI controls become disabled, which overlays/modals appear, and what progression actions are allowed after each status.
- Propose a client polling cadence (or SSE/websocket alternative) and retry/backoff rules suitable for the UI (include guidance for network errors and stale job handling).
- Reference the exact files from this report that will need to be updated by implementer(s) when the contract is implemented.

Constraints:
- Do not implement code. Produce the task doc only.
- Avoid prescriptive implementation details beyond API surface, payload schema, and UX-state mapping. Focus on clear, testable contracts that the implementer can follow.

Reference this code-scout report when writing the task doc; do not assume other sources. Stop and ask if any server capability referenced here (streaming endpoint, runner node) actually exists and is discoverable in a specific path — otherwise mark it as "Not found" in the task doc.

Handoff complete. Provide this report verbatim to the next agent.
