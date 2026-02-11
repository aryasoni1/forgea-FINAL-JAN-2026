### FEATURE ANALYSIS

- Feature Type: Code / UX (routing + static rendering)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define canonical static routes, URL shape `/lessons/:domain/:lessonId`, and 404 handling rules.
- Implementer — Implement static route generation, pre-render all lessons at build time, and ensure pages render without JS.
- Integration Checker — Add CI job that pre-renders routes and validates 404s and no-JS rendering.
- QA / Tester — Verify route correctness, pre-render completeness, and no-JS behavior across sample lessons.
- Documenter / Historian — Document routing rules and developer guidance for adding lessons.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required at routing implementation stage; review later if endpoints expose sensitive content.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner / Architect — Specify route naming, localization rules (if any), and 404 behavior.
- Step 2: Implementer — Implement static route generation and pre-rendering; ensure build emits expected routes. (Depends on Step 1)
- Step 3: Integration Checker — Run pre-render in CI and verify route list matches expected output. (After Step 2)
- Step 4: QA / Tester — Confirm no-JS rendering and correct 404s with test cases. (Parallel with Documenter)
- Step 5: Documenter / Historian — Publish routing guidance and troubleshooting notes.

### AGENT PROMPTS

- Planner / Architect:
  You are Planner/Architect. Define the canonical static routing scheme for lessons (`/lessons/:domain/:lessonId`), edge cases (duplicate IDs, special chars), and 404 behavior. Output a short spec and example URL mappings.

- Implementer:
  You are Implementer. Implement static route generation and pre-render all lessons at build time in `apps/lessons`. Ensure pages render correctly with JS disabled. Provide a route manifest output for CI.

- Integration Checker:
  You are Integration Checker. Add CI steps to pre-render and compare generated routes against the manifest; fail if routes are missing or 404 handling is incorrect.

- QA / Tester:
  You are QA. Run tests validating pre-rendered routes, check no-JS rendering, and exercise invalid routes to confirm 404 behavior.

- Documenter / Historian:
  You are Documenter. Document the routing scheme, examples, and how to add new lessons so routes are generated consistently.
