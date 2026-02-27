### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H10 — Verification API Surface
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md


### TASKS CHECKED

- Planner-Architect: specify API surface (endpoints, payloads, polling, rate limits, info-hiding)
- Implementer: implement API endpoints, auth, normalized result payloads
- Integration-Checker: validate API contracts with LabSession and consumers
- Security-Sentinel: ensure rate limits, auth, and information-hiding conform to policy
- Documenter-Historian: publish API documentation and example payloads for integrators


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md — Contains feature analysis, required agents, execution plan (steps: planner-architect → security-sentinel → implementer → integration-checker + documenter), and orchestrator improvement notes recommending an OpenAPI-lite template and a single source-of-truth for normalized result payloads.


### WHAT IS PARTIALLY IMPLEMENTED

- High-level plan: The orchestrator output defines responsibilities, sequencing, and security review, but only at a conceptual level.
- Suggested improvements: the orchestrator notes suggest an OpenAPI-lite template and a single source-of-truth, but no concrete template or canonical schema is present in the repository.


### WHAT IS MISSING

- Concrete API contract document (endpoints, request/response shapes, auth scopes, error normalization, polling semantics, rate limits, and information-hiding rules).
- OpenAPI-lite or equivalent machine-readable contract template to accelerate implementation and integration checks.
- Implemented API endpoints, authentication integration, and normalized result payloads in source code.
- Integration tests or consumer validation artifacts demonstrating LabSession and client compatibility with the API.
- Security review artefacts demonstrating the rate-limiting model, auth scopes, and redaction rules for internal error details.
- Single source-of-truth schema for normalized result payloads (a canonical JSON Schema/OpenAPI component or similar).
- Published API documentation and example payloads for integrators (post-implementation docs are absent).


### RISKS OR CONFLICTS

- Risk Level: High (as recorded in orchestrator output).
- Touches HARD LOCK: Yes (requires elevated change-control and approvals prior to modifying contract or implementation).
- Divergence risk: Without a canonical contract/schema, implementers may diverge causing incompatible payloads and consumer breakage.
- Data exposure risk: Missing explicit information-hiding rules and normalized error redaction increases risk of leaking internal diagnostics to consumers.


### QUESTIONS FOR CLARIFICATION

- None strictly required to proceed with the planner-architect; the orchestrator output frames the scope and next steps.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: Use this code-scout report and the orchestrator output file at [docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md](docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md) as the authoritative scope source for this task.

Deliverable (what to produce):
- A formal API contract document (markdown + machine-readable spec) that defines, at minimum:
  - Public endpoints and their HTTP methods and paths.
  - Authentication scopes and token semantics required to call each endpoint.
  - Request and response payload shapes (JSON Schema or OpenAPI components) for normalized verification results.
  - Error normalization and redaction rules (what internal details are never exposed), including example error payloads.
  - Polling semantics and recommended backoff behavior for clients, including long-poll vs webhook tradeoffs.
  - Rate-limiting policy and expected client-level limits; how to surface rate-limit headers and retry guidance.
  - Expected fields required for consumer integration (IDs, timestamps, runner metadata), and which fields are optional or sensitive.
  - A minimal OpenAPI-lite template or equivalent machine-readable artifact to serve as the single source-of-truth for implementers and integration-checker.

Constraints & notes:
- This feature is HIGH RISK and touches HARD LOCK; the contract must document change-control expectations and approval gates for future modifications.
- The Security-Sentinel will perform a follow-up review; enumerate observable signals and minimal trust assumptions but do not claim security guarantees.
- Keep the deliverable implementation-agnostic: produce specification and schemas only, not code.

Acceptance criteria for the planner-architect deliverable (what downstream agents will expect):
- A single canonical markdown document placed in the repo (suggested location: `docs/specs/` or the documented repo docs area) containing the human-readable API contract and links to the machine-readable spec.
- A machine-readable OpenAPI-lite (or OpenAPI fragment) file checked in alongside the markdown that defines endpoints and schemas.
- A canonical JSON Schema or OpenAPI component representing the normalized verification result payload usable by implementer and integration-checker.
- A short checklist for Security-Sentinel (auth scopes, rate limits, redaction rules) and for Integration-Checker (consumer fields, polling semantics, header usage) to validate against.

Reference: this code-scout report and the orchestrator output file above.
