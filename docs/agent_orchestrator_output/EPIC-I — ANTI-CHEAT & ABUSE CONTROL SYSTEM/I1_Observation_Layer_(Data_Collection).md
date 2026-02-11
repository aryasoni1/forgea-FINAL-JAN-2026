### FEATURE ANALYSIS

- Feature Type: code / infra (data ingestion & persistence)
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Create an approved, doc-anchored task specifying data model, retention, storage, and required events to record.
- implementer — Implement the data collection service and persistence for recorded signals under `services/anti-cheat/**`.
- security-sentinel — Review privacy, immutability, and replay-resistance of recorded events.
- qa-tester — Validate recorded events, timestamps, authorship, and attempt-count semantics.
- documenter-historian — Capture decisions, branch naming, and docs to update.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Not required for initial implementation; docs checks are advisory and can be consumed by the Planner.
- integration-checker — Implementation/QA will cover integration verification; no separate integration agent needed for this feature.

### MISSING AGENT (ONLY IF NEEDED)

None.

### EXECUTION PLAN

- Step 1: Planner-Architect produces an approved task document describing schema, events, retention, and invariants (sequential).
- Step 2 (parallel): Security-Sentinel reviews the task document; Documenter-Historian prepares decision log.
- Step 3: Implementer implements collection, writes code under `services/anti-cheat/`, and produces manual-checks and how-to guide (sequential after approval).
- Step 4: QA-Tester validates behaviors and produces a test verification doc (sequential after implementer).
- Step 5: Documenter-Historian finalizes decision log and notes docs to update (sequential).

### ORCHESTRATOR IMPROVEMENT NOTES

- Add explicit agent capability metadata for a `data-privacy` specialist agent to review retention/PII when handling recordings.
- Ensure Planner templates force a required `audit` and `retention` section for any feature that records telemetry.
