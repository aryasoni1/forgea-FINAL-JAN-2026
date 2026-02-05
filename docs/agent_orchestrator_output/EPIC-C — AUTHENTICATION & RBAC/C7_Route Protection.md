### FEATURE ANALYSIS

- Feature Type: code (middleware/routes)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Add authentication middleware and protect specified routes.
- Planner / Architect — Define route protection matrix (which routes require which roles).
- QA / Tester — Verify protected routes return correct status codes for unauthorized users.
- Security Sentinel — Validate middleware error handling (no info leakage).

### NOT REQUIRED AGENTS

- Documenter / Historian — Document after implementation.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect specifies route protection rules (e.g., `/workspace/*` authenticated, `/admin/*` ADMIN only).
- Step 2: Implementer creates `middleware/auth.ts` guard, applies it to server routes and API handlers.
- Step 3: QA tests access patterns for public, authenticated, admin, and recruiter roles.
- Step 4: Security Sentinel reviews error handling and ensures no sensitive data in responses.

(Parallel: QA and Security reviews can run concurrently after Step 2.)

### USER PROMPTS

- Implementer:
  "Implement `middleware/auth.ts` that validates session and enforces role checks. Protect `/workspace/*` and `/admin/*` routes according to the Architect's matrix. Ensure public marketing pages remain accessible."

- Planner / Architect:
  "Provide the route protection matrix and any exceptions (e.g., specific endpoints under `/workspace` that must be public)."

- QA / Tester:
  "Verify that protected routes return `401`/`403` as appropriate and that ADMIN-only endpoints are enforced. Test recruiter read-only access."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a small middleware testing checklist to QA agent contract for consistent route protection validation.
