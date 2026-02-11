### FEATURE ANALYSIS

- Feature Type: API guards + CSRF
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Enumerate API routes and current CSRF protections.
- Security Sentinel — Recommend CSRF, input validation, and session validation patterns.
- Planner / Architect — Define API guard wrappers and error shapes.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory API handlers and how auth is currently verified.
- Step 2: Planner / Architect — design a wrapper (e.g., `withAuth(handler, {roles})`) and standard error responses.
- Step 3: Security Sentinel — validate CSRF approach and token refresh behavior.
- Step 4: Implementer — wrap protected APIs and add tests.

### USER PROMPTS

- Forgea Code Scout Prompt:
  List API route files and how they currently read session/user info. Call out any endpoints that lack auth checks.

- Security Sentinel Prompt:
  Recommend CSRF protection for auth routes and a strategy for API session validation (DB-backed session vs JWT verification).
