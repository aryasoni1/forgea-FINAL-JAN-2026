## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I1 Observation Layer (Data Collection)
- Source: Agent Orchestrator Output: docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1_Observation_Layer_(Data_Collection).md


### TASKS CHECKED

- Planner-Architect: produce approved task document specifying schema, retention, storage, and required events to record.
- Security-Sentinel: review privacy, immutability, and replay-resistance of recorded events.
- Implementer: implement data collection service and persistence under `services/anti-cheat/**`.
- QA-Tester: validate recorded events, timestamps, authorship, and attempt-count semantics.
- Documenter-Historian: capture decisions, branch naming, and docs to update.


### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1_Observation_Layer_(Data_Collection).md — Contains the feature analysis, required agents list, execution plan, and orchestrator improvement notes (the Orchestrator output for this feature).

- No code or service directory for an anti-cheat observation layer detected in the repository root paths searched (no `services/anti-cheat` or similarly named packages/folders found).


### WHAT IS PARTIALLY IMPLEMENTED

- Orchestrator-level planning: The Agent Orchestrator defines required agents and an execution plan (see Orchestrator output file). No engineering artifacts (schemas, tasks, or implementation) were found.


### WHAT IS MISSING

- Planner-approved task document describing:
  - concrete data model/schema for recorded events
  - retention and auditing policy
  - storage/backing technology choices (durable queue, DB schema, or stream)
  - required event list and invariants to record
  - placement and ownership (repo paths/teams) for implementation
- Implementation under `services/anti-cheat/**` or any equivalent service path.
- Security review artifacts (privacy, immutability, replay-resistance) beyond the orchestrator note.
- QA verification artifacts and test plans validating event semantics.
- Documenter outputs (decision logs, how-to guides, manual-checks) for operators.


### RISKS OR CONFLICTS

- The Orchestrator marks this feature as touching a HARD LOCK and Risk Level: Medium (from Orchestrator output). No mitigations, ownerships, or gating artifacts were found in the repo.
- Orchestrator improvement note: recommends adding a `data-privacy` specialist review for retention/PII; that role is not present in the required-agents list in repo artifacts.
- No implementation exists to confirm constraints such as immutable storage, signed events, or replay-resistance; therefore design/implementation must preserve these invariants when introduced.


### QUESTIONS FOR CLARIFICATION

- None strictly required by repository truth. If the Planner needs scope boundaries (PII policy, retention windows, or approved storage providers), request them from the product/security owners.


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Planner-Architect (next agent), use the findings in this code-scout report to produce the required, approved task document.

Copy-and-paste prompt for Planner-Architect:

You are the Planner-Architect for feature I1 — Observation Layer (Data Collection) in EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM. This report is available at: docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1_Observation_Layer_(Data_Collection).md and the Agent Orchestrator output for this feature is at: docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I1_Observation_Layer_(Data_Collection).md.

Your task (produce a single, approved task document):

- Define the concrete data model/schema for recorded observation events (field names, types, required vs optional, and indexing needs).
- Enumerate the required event types to be recorded and their semantics, including authorship, timestamping, and attempt-count semantics.
- Specify retention and audit requirements (retention windows, deletion policies, and audit logging requirements), and identify any PII considerations that require escalation to a data-privacy reviewer.
- Specify storage and durability requirements (DB/table/stream choices, idempotency/deduplication keys, durable queue / DLQ requirements, and replay-resistance expectations).
- Provide clear implementation acceptance criteria and required artifacts for the Implementer, Security-Sentinel, QA-Tester, and Documenter-Historian to act on (including file paths, interfaces, and expected tests).
- Note that the Orchestrator marks this feature as HARD LOCK and Risk Level: Medium; include who must approve the task and any gating checks needed before implementation.

Deliver the approved task document to: place it in `docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/` with filename prefixed by the task id (e.g., `task-I1-<date>.md`), and add a short checklist of downstream artifacts the Implementer must produce (implementation path, tests, and docs).

Do not implement code. Do not propose specific implementation details beyond what is necessary to define acceptance criteria and constraints. After producing the task document, notify Security-Sentinel to perform the parallel review called out in the Orchestrator output.


“Handoff complete. Provide this report verbatim to the next agent.”
