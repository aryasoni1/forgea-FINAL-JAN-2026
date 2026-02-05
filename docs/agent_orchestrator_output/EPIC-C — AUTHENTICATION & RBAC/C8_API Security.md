### FEATURE ANALYSIS

- Feature Type: code + security
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Wrap protected API routes with auth checks and validate session and role server-side.
- Security Sentinel — Ensure CSRF protection and robust session validation for API endpoints.
- QA / Tester — Test API authorization failures and edge cases.
- Integration Checker — Run later for end-to-end API tests.

### NOT REQUIRED AGENTS

- Documenter / Historian — Document after implementation.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Implementer adds server-side middleware to validate active session and enforce role checks for API handlers.
- Step 2: Security Sentinel mandates CSRF protection for auth routes and reviews token handling.
- Step 3: QA verifies unauthorized requests are correctly rejected and that role checks are enforced.

### USER PROMPTS

- Implementer:
  "Apply auth checks to protected API routes. Validate session exists and is active, and check role authorization per endpoint. Return appropriate `401`/`403` codes."

- Security Sentinel:
  "Review API auth: require CSRF protection on auth endpoints, ensure tokens/cookies are validated server-side, and provide mitigations for replay attacks."

- QA / Tester:
  "Create tests that simulate expired sessions, invalid tokens, missing CSRF tokens, and insufficient-role attempts."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a reusable API-auth middleware template to avoid duplication across services.
