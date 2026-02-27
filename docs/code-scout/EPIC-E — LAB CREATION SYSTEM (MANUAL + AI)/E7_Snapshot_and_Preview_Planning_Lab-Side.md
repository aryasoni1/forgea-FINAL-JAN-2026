### FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E7_Snapshot_and_Preview_Planning_Lab-Side (Snapshot & Preview Planning — Lab Side)
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md

### TASKS CHECKED

- Define snapshot semantics for broken/fixed states and determinism requirements (Planner/Architect)
- Implement snapshot capture/restore and preview generation with masking (Implementer)
- Validate snapshots reflect changes and do not leak data (QA/Tester)

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md: Agent Orchestrator output describing feature analysis, required agents, execution plan, copy-paste user prompts, and an orchestrator improvement note suggesting an automated preview sanitizer.

### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level planning: The orchestrator file defines required agents and a sequential execution plan. No concrete specification, implementation code, or tests are present in the repository for this feature.

### WHAT IS MISSING

- Planner/Architect deliverable: definitive snapshot semantics document covering broken vs fixed states, determinism guarantees, and privacy constraints.
- Implementer deliverables: snapshot capture/restore implementation, preview rendering code that masks secrets/backend endpoints, and integration instructions.
- QA/Tester deliverables: validation harness and tests confirming determinism across runs and that previews do not leak secrets or remote backend details.
- Preview sanitizer design/artifact and policy for what must be redacted or masked.
- Example snapshots and preview outputs (both masked and unmasked test cases) for verification.
- CI integration or pipeline checks that run snapshot/preview validation and sanitizer checks.
- Ownership and operational runbook for snapshot storage, retention, and access controls.

### RISKS OR CONFLICTS

- Medium risk: snapshots and previews may leak sensitive data (credentials, backend URLs, tokens) if masking/sanitization is incomplete.
- Determinism risk: without explicit determinism semantics and test harnesses, snapshot comparisons across runs may be unreliable.
- Privacy/PII risk: snapshots could contain user data requiring retention policies and access controls.
- Integration risk: lack of integration docs and CI checks increases chance of divergence between implemented snapshots and expected semantics.

### QUESTIONS FOR CLARIFICATION

- Where should snapshot artefacts and preview sanitizer code live in the repository? Who owns retention and access policies for stored snapshots?
- Are there existing masking/sanitization libraries or standards the team must use or avoid?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: Planner/Architect (first required agent per orchestrator)

Copy-paste-ready prompt for the Planner/Architect:

"You are the Planner/Architect for EPIC-E feature E7 (see this code-scout report at docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md). Using the Orchestrator output referenced therein, produce the snapshot semantics and privacy constraints for lab-side snapshot and preview functionality. Deliverables:
- A concise specification defining snapshot semantics for 'broken' and 'fixed' lab states and precise determinism guarantees expected from snapshot capture/restore.
- A list of fields and data classes that must always be masked or redacted in previews (examples: secrets, backend URLs, tokens), and guidance on acceptable masking strategies (do not implement — list only).
- Recommended file paths and artifact names for where the Implementer should place snapshot capture code, preview rendering, sanitizer, and example snapshots in the repository.
- Acceptance criteria for QA/Tester tests covering determinism, masking correctness, and privacy checks.

Constraints: Do not implement code. Produce a markdown specification file with version metadata and clear acceptance criteria so Implementer and QA/Tester agents can proceed.

Output format: single markdown file containing semantics, masking rules, examples of edge cases, recommended repo paths, and acceptance criteria.

Reference: This request is based on the Orchestrator output referenced in the code-scout report. Downstream agents (Implementer, QA/Tester, and optionally Security Sentinel) will consume your spec."

Handoff complete. Provide this report verbatim to the next agent.
