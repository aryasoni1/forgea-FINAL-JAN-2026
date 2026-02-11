### FEATURE ANALYSIS

- Feature Type: Security / Policy / UX
- Risk Level: High
- Touches HARD LOCK: Yes (content leakage controls)

### REQUIRED AGENTS

- Security Sentinel — Define anti-cheat rules, content watermarking, rate limiting, and API exposure boundaries.
- Planner / Architect — Define policies for disabling copy, watermarking, and human review flows before publish.
- Implementer — Implement watermarking, optional copy-disable measures, rate limiting, and hide lesson content from public APIs.
- Integration Checker — Add CI checks preventing published lessons without human review flag.
- QA / Tester — Validate watermarking, rate limits, and ensure disabled-copy UX is not harmful to accessibility.
- Documenter / Historian — Document content publishing workflows and review checklists.

### NOT REQUIRED AGENTS

- Visual QA Agent — Optional for watermark placement verification.

### MISSING AGENT (ONLY IF NEEDED)

- Content Review Workflow Agent (optional): Tooling to manage human review gating and sign-offs.

### EXECUTION PLAN

- Step 1: Security Sentinel — Define anti-cheat controls, rate limits, and API exposure rules. (High priority)
- Step 2: Planner / Architect — Define publish gating including required human review flag and watermarking expectations.
- Step 3: Implementer — Implement watermarking, rate limiting, API restrictions, and optional copy-disable UI layers. (Depends on Step 1/2)
- Step 4: Integration Checker — Enforce publish gating in CI and block publishing without review flag. (After Step 3)
- Step 5: QA / Tester — Validate watermarking visibility, API restrictions, and accessibility impacts.
- Step 6: Documenter / Historian — Publish policy and developer guides for review and publishing.

### AGENT PROMPTS

- Security Sentinel:
  You are Security Sentinel. Produce a set of anti-cheat controls for lesson content, including watermarking strategies, rate-limiting policies, and rules to hide lesson content from public APIs. Provide threat scenarios and mitigations.

- Planner / Architect:
  You are Planner. Define the publish workflow requiring human review, watermarking acceptance criteria, and what constitutes "solution leakage" requiring remediation.

- Implementer:
  You are Implementer. Implement watermarking, rate limiting, and API gating so that lessons cannot be fetched publicly without proper authorization and review. Provide deployment notes.

- Integration Checker:
  You are Integration Checker. Add checks that prevent publishing lessons in CI/CD unless a human-review flag is present and validator passes.

- QA / Tester:
  You are QA. Test watermarking, copy-disable options, rate limiting, and ensure accessibility is preserved.

- Documenter / Historian:
  You are Documenter. Write the publishing workflow doc, including how reviewers mark lessons as approved and how to remediate leaks.
