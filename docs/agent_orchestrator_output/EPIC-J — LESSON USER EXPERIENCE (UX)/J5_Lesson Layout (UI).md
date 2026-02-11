### FEATURE ANALYSIS

- Feature Type: UX / Code (layout and components)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- UX Designer / Planner — Define left sidebar, main content, and right context panel behaviors (including accessibility and 3G optimization constraints).
- Implementer — Implement layout components (section navigation, callouts, context panel) and ensure low-bandwidth rendering.
- QA / Tester — Validate readable typography, section navigation behavior, and no-JS usability.
- Documenter / Historian — Produce component usage docs and design rationale.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required at UI design stage.

### MISSING AGENT (ONLY IF NEEDED)

- Visual QA Agent (optional): Automated visual regression for typography and layout on constrained network profiles.

### EXECUTION PLAN

- Step 1: UX Designer / Planner — Deliver wireframes and component specs for sidebar, content, and context panel, including accessibility and performance constraints.
- Step 2: Implementer — Build reusable components (navigation, callouts) with server-side rendering only; minimize client JS and disable inline editors.
- Step 3: QA / Tester — Run accessibility checks, visual inspections on low-bandwidth emulation, and interaction tests for section completion and navigation.
- Step 4: Documenter / Historian — Publish UI component docs and authoring guidance. (Parallel with Step 3)

### AGENT PROMPTS

- UX Designer / Planner:
  You are UX Designer. Provide wireframes and a concise component spec for left section navigation (active highlight, per-section completion, scroll persistence), main content (readability, callouts), and right context panel (responsive hide rules). Include accessibility and 3G-friendly constraints.

- Implementer:
  You are Implementer. Implement the UX Designer's specs as server-rendered components for `apps/lessons`, avoid client-side routing, minimize JS payload, and ensure components work without JS. Provide sample components and usage docs.

- QA / Tester:
  You are QA. Validate component behavior on desktop and mobile, test section completion thresholds, and run checks with JS disabled and 3G-like network throttling.

- Documenter / Historian:
  You are Documenter. Create short component docs, usage examples, and authoring rules for callouts and content structure.
