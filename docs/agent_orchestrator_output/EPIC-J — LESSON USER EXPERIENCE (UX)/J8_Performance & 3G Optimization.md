### FEATURE ANALYSIS

- Feature Type: Performance / Infra / UX
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define JS payload budgets, font-hosting policy, image/media optimization standards, and Lighthouse KPI targets.
- Implementer — Implement self-hosted fonts, image optimization pipeline, minimize client JS, and enforce server-side rendering.
- Integration Checker — Add CI performance checks (Lighthouse on 3G profile) and fail builds that exceed budgets.
- QA / Tester — Validate pages under 3G throttling and report regressions.
- Documenter / Historian — Document performance budgets and how to measure locally and in CI.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for performance implementation but consult for CDN and hosting security.

### MISSING AGENT (ONLY IF NEEDED)

- Performance Auditor Agent (optional): Continuous performance monitoring in staging to enforce budgets over time.

### EXECUTION PLAN

- Step 1: Planner / Architect — Define budgets (JS size per page), font and image optimization rules, and Lighthouse targets for 3G.
- Step 2: Implementer — Implement self-hosting fonts, optimize images, reduce JS, and server-render all lessons. (Depends on Step 1)
- Step 3: Integration Checker — Add Lighthouse (3G profile) checks in CI and enforce budgets. (After Step 2)
- Step 4: QA / Tester — Validate on-device or emulated 3G connections and produce remediation steps for violations.
- Step 5: Documenter / Historian — Publish budget rules and local reproduction steps.

### AGENT PROMPTS

- Planner / Architect:
  You are Planner. Produce a performance budget for lesson pages (max JS, fonts, image sizes), recommend font self-hosting approach, and define Lighthouse KPI targets for 3G.

- Implementer:
  You are Implementer. Apply the Planner's performance rules: self-host fonts, implement optimized image delivery, eliminate unnecessary JS, and ensure SSR. Provide evidence (bundle sizes, Lighthouse report) for sample lessons.

- Integration Checker:
  You are Integration Checker. Integrate Lighthouse checks into CI using a 3G profile, configure failure thresholds, and provide sample CI steps.

- QA / Tester:
  You are QA. Validate performance on 3G emulation, collect Lighthouse reports, and highlight remediation steps.

- Documenter / Historian:
  You are Documenter. Write concise performance guidelines and commands to run Lighthouse locally and in CI.
