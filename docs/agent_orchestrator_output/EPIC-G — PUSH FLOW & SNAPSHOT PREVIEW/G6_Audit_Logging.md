### FEATURE ANALYSIS

- Feature Type: observability / compliance
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define audit schema, retention, and immutable storage requirements.
- implementer — Implement accepted/rejected logging, reason codes, and immutable append-only writes.
- security-sentinel — Review audit for sensitive data leakage and tamper-resistance.
- documenter-historian — Ensure audit schema and retention are recorded for future investigators.

### NOT REQUIRED AGENTS

- qa-tester — Not required unless Planner marks complex invariants needing formal tests.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: planner-architect specifies audit schema, reason codes, retention (sequential)
- Step 2: implementer implements logging hooks and immutable storage writes (sequential)
- Step 3: security-sentinel reviews for PII and tamper risks (sequential)
- Step 4: documenter-historian documents audit schema and usage (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a shared central registry for rejection reason codes across EPICs to ease cross-service analytics.
