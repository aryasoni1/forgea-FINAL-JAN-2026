### FEATURE ANALYSIS

- Feature Type: middleware + routing
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Find routing layer (server/edge/middleware) and current auth middleware.
- Planner / Architect — Specify middleware entrypoints, protected paths, and allowed public routes.
- QA — Verify route protection after implementation.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — list all route handlers and frameworks used (Next.js, Express, etc.).
- Step 2: Planner / Architect — define middleware behavior and protected route lists (`/workspace/*`, `/admin/*`).
- Step 3: Implementer — add middleware and tests.

### USER PROMPTS

- Forgea Code Scout Prompt:
  Locate any existing middleware and route definitions. For each framework, show how to insert auth middleware and provide example file paths.

- Planner / Architect Prompt:
  Produce `task-C7.md` describing middleware signature, route allowlist/denylist, and behavior for admin vs recruiter vs public.
