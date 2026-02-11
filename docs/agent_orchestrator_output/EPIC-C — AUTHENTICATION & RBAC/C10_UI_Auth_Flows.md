### FEATURE ANALYSIS

- Feature Type: frontend + UX
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Locate existing auth UI components and pages.
- UX Designer / Planner — Define safe defaults (hide email login, redirect behavior).
- QA — Verify flows across providers and logout behavior.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — locate auth UI locations and components.
- Step 2: UX Designer / Planner — produce page mockups and acceptance criteria.
- Step 3: Implementer — add UI buttons (GitHub, Google), hide email login by default, and implement logout redirect.

### USER PROMPTS

- Forgea Code Scout Prompt:
  Find login pages/components and list where provider buttons would be wired. Report any existing email/password UI.

- UX Designer / Planner Prompt:
  Produce `task-C10.md` that defines UI elements, copy for error messages, and default redirect behavior post-login/logout.
