FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H4_Code Checkout & Preparation
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md

### TASKS CHECKED

- Not found in the provided Agent Orchestrator output for this feature.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md : Contains the feature analysis and orchestration-level instructions. Specifically records:
  - Feature Type: code / infra
  - Risk Level: High
  - Touches HARD LOCK: Yes
  - REQUIRED AGENTS: `planner-architect`, `implementer`, `security-sentinel`
  - EXECUTION PLAN: high-level sequential steps (Planner → Security review → Implementer → optional Documenter)
  - ORCHESTRATOR IMPROVEMENT NOTES recommending a reusable safe checkout-by-SHA library and an implementer checklist.

### WHAT IS PARTIALLY IMPLEMENTED

- Not found: No concrete specification, scripts, or config files for checkout-by-SHA, commit integrity verification, or locked-file enforcement are present in the orchestrator output. (Orchestrator lists these as required but provides no implementation artifacts.)

### WHAT IS MISSING

- Exact checkout specification by commit SHA (pinning rules, allowed refs).
- Commit integrity verification artifacts (hashing scripts, verification hooks, canonical locations for immutable references).
- Locked-file protection enforcement code/config (mechanism to prevent mutation by runner).
- Sandbox/staging library or utilities for atomic, auditable checkouts (or a reference to an existing library to reuse).
- An implementer checklist that marks checkout as atomic and auditable (the orchestrator recommends this but it is not present as an artifact).

### RISKS OR CONFLICTS

- The orchestrator explicitly marks the feature as High risk and as touching a HARD LOCK; this elevates the need for tamper-resistant verification and careful rollout.
- No implementation artifacts were provided in the orchestrator output; absence of a formal spec increases risk of inconsistent or insecure implementations.

### QUESTIONS FOR CLARIFICATION

- None strictly required to produce this report. If the Planner needs constraints (e.g., supported VCS providers, allowed signing algorithms, or existing HSM/KMS usage), provide those as separate inputs.

### NEXT AGENT HANDOFF PROMPT (FOR `planner-architect`) - COPY-PASTE READY

You are `planner-architect`. Use this code-scout report: /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H4_Code Checkout & Preparation.md as the authoritative factual summary.

Task: Produce a precise, implementation-ready specification (no implementation) for the `implementer` that includes only what is requested below. Do NOT implement code — produce the spec and acceptance criteria.

Include all of the following in the specification document:
- Exact checkout rules: how to reference and pin commits (SHA rules), allowed ref formats, and any branch/tag policies required for reproducible checkouts.
- Commit integrity verification: exact hash/signature checks to run, canonical verification order, deterministic inputs for hashing, and where to store immutable verification references.
- Locked-file protections: explicit file-level protections to prevent mutation by runners, the enforcement mechanism (OS-level, git config, or CI gate), and rollback/blocking behavior on detection.
- Audit & atomicity checklist: a step-by-step checklist the `implementer` must follow to mark the checkout as atomic and auditable, plus minimum logs/records required for post-mortem.
- Threat considerations to address: tampering, replay attacks, and attacker-injected refs; list minimal mitigation expectations and what to validate in code review.
- Acceptance criteria: precise pass/fail conditions the `security-sentinel` and `implementer` will use to verify compliance.

Deliverables (for the `planner-architect` output):
- One specification document (Markdown) with the items above.
- A short file manifest naming where verification artifacts must be placed by the `implementer` (file paths only).
- A prioritized checklist for `security-sentinel` to validate tamper resistance.

Reference this code-scout report in the spec header and do not add implementation code. Stay within your role of planning/specification only.

Handoff complete. Provide this report verbatim to the next agent.
