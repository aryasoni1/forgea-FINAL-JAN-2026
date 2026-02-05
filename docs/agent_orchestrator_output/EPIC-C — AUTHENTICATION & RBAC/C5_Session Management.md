### FEATURE ANALYSIS

- Feature Type: code + infra + security
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Implement DB-backed session strategy, ensure `Session` table and FK to `User`.
- Security Sentinel — Approve cookie settings (`HttpOnly`, `Secure`, `SameSite`) and session expiry policies.
- Planner / Architect — Define idle timeout, absolute expiry, and concurrent session behavior.
- QA / Tester — Test session creation, expiry, idle timeout, and logout flows.

### NOT REQUIRED AGENTS

- Documenter / Historian — Documented after implementation; not required to make design decisions.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect chooses DB-backed sessions (Prisma-based) and defines idle/absolute timeouts.
- Step 2: Implementer ensures `Session` table exists and links to `User` with FK; implements session creation and revocation APIs.
- Step 3: Security Sentinel reviews cookie policies and session storage security.
- Step 4: QA validates session expiry, prevents infinite sessions, and confirms logout clears session.

(Parallel: Security review can be concurrent with implementation once schema is defined.)

### USER PROMPTS

- Implementer:
  "Add DB-backed sessions: ensure `Session` model exists and references `User`. Implement session create/read/delete APIs and wire them into auth flow. Ensure cookies are set `HttpOnly` and follow env-driven `Secure` behavior."

- Security Sentinel:
  "Review session cookie and storage settings: recommend `SameSite=Lax` or stricter in prod, set reasonable idle and absolute timeouts, and recommend session revocation and rotation policy."

- Planner / Architect:
  "Define idle timeout (e.g., 30m), absolute expiry (e.g., 30 days), and whether multiple concurrent sessions are allowed. State expected behavior on password reset or account deletion."

- QA / Tester:
  "Test session persistence, idle expiry, absolute expiry, logout flow, and behavior after user deletion."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a standard session-security checklist to the Security Sentinel agent contract for consistent reviews.
