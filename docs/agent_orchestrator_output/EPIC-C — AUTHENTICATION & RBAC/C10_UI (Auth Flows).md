### FEATURE ANALYSIS

- Feature Type: UX + frontend + integration
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Create login/logout UI elements and wire OAuth buttons.
- Planner / Architect — Specify UX flows and redirects after login/logout.
- QA / Tester — Verify UI flows, error handling, and session clearing on logout.
- Documenter / Historian — Document auth UI components and usage.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for basic UI, but consult on logout behavior and cookie clearing.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect defines user journeys and post-login redirects.
- Step 2: Implementer builds login page with GitHub/Google buttons, hides email login by default, and implements logout button that clears session and redirects.
- Step 3: QA tests happy and error flows, and confirms friendly error messages.

### USER PROMPTS

- Implementer:
  "Build a login page with GitHub and Google buttons. Hide email/password option by default. Add a logout button that clears session and redirects to the marketing page. Ensure auth error messages are user-friendly."

- Planner / Architect:
  "Specify redirect targets after login and logout, and any allowed post-login landing pages based on role."

- QA / Tester:
  "Test UI login flows, provider button behavior, logout session clearing, and display of error messages for failed auth attempts."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a small set of reusable, styled auth UI components to keep the apps consistent.
