### FEATURE ANALYSIS

- Feature Type: Signals / Analytics / Risk Detection
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define exact signals, thresholds, data sources, and permitted admin UI exposures; specify retention and privacy constraints.
- security-sentinel — Review signal definitions for false-positive/negative impacts and for potential deanonymization/PII leakage.
- implementer — Implement signal aggregation, detection pipelines, and expose safe summaries to admin UI.
- qa-tester — Validate detection accuracy, robustness to noise, and resistance to manipulation.
- integration-checker — Ensure signals derived from multiple services are consistently correlated.

### NOT REQUIRED AGENTS

- documenter-historian — Not required at initial orchestration; include if admin-facing investigation guides are requested.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner defines each risk signal (excessive retries, abnormal speed-to-pass, identical diff repeats, force-push detection) with data sources and thresholds.
- Step 2: Integration Checker validates cross-service telemetry and correlation keys. (Sequential)
- Step 3: Implementer builds detection pipelines and admin-facing summaries. (Sequential)
- Step 4: Security Sentinel reviews for manipulation and privacy risks. (Parallel with QA)
- Step 5: QA validates signal quality and adversarial robustness. (Sequential)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Produce a task doc for O6 — Abuse & Risk Signal Surfacing. For each signal (excessive retries, speed-to-pass, repeated diffs, force-pushes), define data sources, exact detection heuristics, thresholds, retention, and allowed admin exposures. Include PII/privacy considerations."

- integration-checker:
"Confirm required telemetry fields exist across services to compute O6 signals and list any missing fields or race conditions."

- implementer:
"Implement O6 per the approved task doc and provide `/docs/manual-checks/task-O6-manual-checks.md` and `/docs/guides/task-O6-how-to.md` if requested."

- security-sentinel:
"Review O6 for deanonymization, manipulation, and signal poisoning risks and recommend mitigations."

- qa-tester:
"Validate O6 detection quality, false-positive rates, and adversarial resistance using provided example datasets."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a shared `signals` library and standardized signal schema in official docs to reduce duplication.
