### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H13_Safety & Invariants
- Source: Agent Orchestrator Output — docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H13_Safety & Invariants.md

### TASKS CHECKED

- Step 1: Planner-Architect lists explicit invariants and decision points where enforcement must occur.
- Step 2: Security-Sentinel audits for possible bypasses and suggests mitigation.
- Step 3: Implementer adds enforcement code and guards; Integration-Checker verifies cross-service enforcement.
- Step 4: Documenter-Historian records invariants and escalation paths for overrides.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H13_Safety & Invariants.md — Orchestrator output describing required agents, execution plan, and improvement notes.
- High-level invariant mentions within other docs (e.g., verification-before-preview, commit SHA as source of truth) appear across planning and gatekeeper docs and UI traces — indicating awareness of the invariant requirements.

### WHAT IS PARTIALLY IMPLEMENTED

- Policy awareness: The repository contains planner/gatekeeper-level documentation that enumerates invariants and indicates they are HARD LOCK sensitive, but these are not consolidated into a single enforcement spec or test harness.
- References: UI and config artifacts reference verification-runner behavior and preview gating, but authoritative enforcement locations (service-level guards, API contract checks) were not located as a single artifact.

### WHAT IS MISSING

- Not found: A formal, machine-readable invariants specification listing each invariant, enforcement points (service and API endpoints), and measurable acceptance tests.
- Not found: Implemented enforcement code or middleware that enforces core invariants such as `verification-before-preview`, `one active job per session`, `commit SHA as single source of truth`, and retry/lock rules.
- Not found: Integration-level test harness or invariants test suite for the Integration-Checker to validate invariants across LabSession, Runner, and Verification API.
- Not found: Security reviews targeting invariant bypass vectors and privilege escalation scenarios tied to overrides or emergency paths.
- Not found: A documented override/escalation process (who can bypass invariants, under what conditions, and audit requirements) with HARD LOCK owner explicitness.

### RISKS OR CONFLICTS

- The orchestrator marks the feature High risk and touching HARD LOCK; without formal invariant specs and enforcement, the system risks inconsistent behavior (e.g., previews allowed before verification) and potential irreversible state changes.
- Dispersed documentation and UI references increase the chance of misaligned implementations across services if a single authoritative invariants spec is not produced and enforced.

### QUESTIONS FOR CLARIFICATION

- Who is the explicit HARD LOCK owner (approval authority) for invariant overrides and emergency bypasses? This should be specified in the planner spec.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: See this code-scout report and the Agent Orchestrator output at docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H13_Safety & Invariants.md. The repository contains high-level mentions of invariants and UI/config references indicating the desired behaviors, but there is no authoritative, machine-readable invariants specification, enforcement checklist, or test harness for Integration-Checker.

Task: Produce a formal `invariants` specification artifact and acceptance checklist that lists each invariant, exact enforcement locations, and measurable tests for Integration-Checker. The spec must include, at minimum:
- A definitive list of invariants (e.g., `verification-before-preview`, `one active job per session`, `commit SHA as single source of truth`, retry/lock rules).
- Enforcement points: the specific services, endpoints, or middleware where each invariant must be enforced and the required failure semantics (HTTP error codes, idempotency responses).
- Test cases: an invariants test harness specification (request flows, expected states, failure simulations) for Integration-Checker to implement.
- Override policy: explicit HARD LOCK owner, allowed emergency bypass actions, required approvals, and audit logging fields to record overrides.
- Acceptance criteria: concrete checks that Implementer must satisfy (code locations, CI checks, and integration tests), and the files the Implementer should produce (middleware, test harness, CI test definitions).

Deliverable format: a machine-readable spec under `/docs/planner_specs/EPIC-H/` named `H13_invariants_spec.md` and an acceptance checklist mapping invariants to exact files and test names the Implementer must produce. Do NOT implement enforcement — produce the spec, test harness description, and acceptance checklist for the Integration-Checker and Implementer.

Reference: This report and the orchestrator output file referenced above.

Handoff complete. Provide this report verbatim to the next agent.
