### FEATURE ANALYSIS

- Feature Type: Access control / Authorization
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Produce an approved, doc-anchored task document specifying exact access checks, role mappings, and backend enforcement points.
- security-sentinel — Review plan and designs with attacker mindset to ensure no privilege escalation or bypass.
- implementer — Implement the approved task document exactly, producing required docs/artifacts.
- qa-tester — Validate enforced role checks, audit logging, and attempt-based rejection behaviors.
- documenter-historian — Produce the admin-facing how-to and manual-check artifacts and ensure audit preservation guidance.

### NOT REQUIRED AGENTS

- integration-checker — Not required: this feature focuses on internal authorization, not cross-system integration.
- forgea-code-scout — Not required: code facts are useful but not required for orchestrator planning.
- agent orchestrator — Not required: orchestration already producing these files.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner derives and publishes an approved task document with explicit backend role checks, allowed admin actions, and audit requirements.
- Step 2: Security Sentinel reviews the planner output and either approves or marks blocking issues. (Sequential)
- Step 3: Implementer implements per the approved task document; produce `/docs/manual-checks/` and `/docs/guides/`. (After plan approval)
- Step 4: QA runs validation against the implementation and manual checks; report blockers. (Sequential)
- Step 5: Documenter finalizes user-facing guides and preserves audit guidance. (Can run in parallel with QA once implementation artifacts exist)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Produce a task document for Feature O1 — Access & Permissions. Scope: backend-only enforcement for ADMIN/OPERATOR roles, deny any admin path that can mark sessions PASSED or mutate user code. Include explicit API endpoints, middleware insertion points, DB-level invariants, required audit fields, and required manual-checks and guides. Cite `/docs/official-docs-registry.md` and `EPIC-O — ADMIN SESSION OPERATIONS` as sources. List open questions and blocked decisions."

- security-sentinel:
"Review the Planner's O1 task doc for privilege escalation, bypass, replay, and audit tampering risks. Produce an attack-surface summary and required mitigations. Block if any invariant allowing admin mutation or unverifiable audit exists."

- implementer:
"Implement the approved O1 task doc exactly. Deliver code changes only as specified and create `/docs/manual-checks/task-O1-manual-checks.md` and `/docs/guides/task-O1-how-to.md`. Do not expand scope."

- qa-tester:
"Validate the O1 implementation against the task doc and manual checks. Produce a QA report covering access control enforcement, negative tests, replay/forgery attempts, and audit immutability checks. Block on any bypass."

- documenter-historian:
"Create the final admin-facing guide and an immutable log retention guidance doc for O1. Ensure audit-write patterns and storage locations are captured and preserved."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a small agent-contract for a dedicated `audit-keeper` agent if immutable storage patterns require specialized handling (S3/Timestamping/KMS signing).
- Require Planner to always attach which files are HARD-LOCKED to the task doc.
