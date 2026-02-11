### FEATURE ANALYSIS

- Feature Type: authorization logic + policy
- Risk Level: High
- Touches HARD LOCK: No (role model soft-locked post-completion)

### REQUIRED AGENTS

- Forgea Code Scout — Locate existing role definitions, middleware, and any RBAC helpers.
- Security Sentinel — Review role design for privilege escalation risks.
- Planner / Architect — Define canonical role enum and DB storage approach.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory role usage and any dynamic role checks.
- Step 2: Planner / Architect — pick canonical enum and storage strategy (DB-backed), produce migration/task.
- Step 3: Security Sentinel — review proposed enum and default-deny behavior.
- Step 4: Implementer — add centralized authorization helper and inject role into sessions.

### USER PROMPTS

- Forgea Code Scout Prompt:
  Find all occurrences of role checks across the repo; list files and patterns (e.g., `if (user.role === 'ADMIN')`). Report whether role values are hardcoded or read from DB.

- Planner / Architect Prompt:
  Produce `task-C6.md` that defines the role enum (`FREE`, `PAID`, `ADMIN`, `RECRUITER`), DB column type, default role assignment policy, and authorization helper API (e.g., `requireRole(user, 'ADMIN')`). Include acceptance tests.

- Security Sentinel Prompt:
  Analyze the proposed RBAC helper for bypass risks and recommend mitigations (least privilege, default deny, audit hooks).
