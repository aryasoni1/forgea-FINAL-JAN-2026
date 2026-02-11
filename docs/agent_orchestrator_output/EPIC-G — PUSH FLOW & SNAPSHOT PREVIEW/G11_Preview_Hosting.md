### FEATURE ANALYSIS

- Feature Type: hosting / security / infra
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define preview hosting contract: URL scheme, CSP, cookie restrictions, allowed headers, and GET-only requirement.
- implementer — Implement snapshot publish flow, URL generation, and enforce read-only serving rules in preview service.
- security-sentinel — Validate CSP, header hygiene, and attack surface for hosting static snapshots.
- integration-checker — Verify DNS, CDN, and origin configurations for preview domain and access controls.
- documenter-historian — Document preview URL patterns and hosting constraints.

### NOT REQUIRED AGENTS

- qa-tester — Not required unless Planner marks complex browser-compatibility or edge-case behaviors for testing.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: planner-architect specifies hosting contract (CSP, robots, GET-only, cookie policy) and preview URL format (sequential)
- Step 2: integration-checker validates CDN/DNS/ACL requirements and caching behavior (sequential)
- Step 3: implementer implements publish endpoint, URL creation, and hosting rules (sequential)
- Step 4: security-sentinel reviews headers and verifies no auth tokens or cookies are set (sequential)
- Step 5: documenter-historian records hosting constraints and troubleshooting notes (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a central preview-hosting checklist (DNS, TLS, robots, CSP, caching) to reduce rework across EPICs.
