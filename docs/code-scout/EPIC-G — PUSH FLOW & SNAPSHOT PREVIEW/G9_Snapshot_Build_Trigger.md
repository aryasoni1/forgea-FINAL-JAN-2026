FEATURE CONTEXT
- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G9 Snapshot Build Trigger
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md (Agent Orchestrator Output)

### TASKS CHECKED
- planner-architect: Define gating rules, build commands, and failure semantics (from orchestrator file)
- integration-checker: Validate runner/environment contract and artifact provenance requirements
- implementer: Implement snapshot build trigger and SHA fetching
- security-sentinel: Review build step for injection risks and sandboxing

### WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md — Orchestrator feature analysis listing required agents, execution plan, and note recommending a canonical, versioned build manifest format.
- docs/official-docs-registry.md (edited in workspace) — contains general CI/webhook/retry patterns references useful for implementing reliable triggers.

### WHAT IS PARTIALLY IMPLEMENTED
- Repository contains application build artifacts (compiled `.next` outputs) but there is no evidence of a dedicated snapshot-trigger implementation in source (no clear `.github/workflows/*` or CI trigger file discovered during scan).

### WHAT IS MISSING
- Snapshot build trigger implementation (webhook/CI job/workflow) to run reproducible snapshot builds on a specific commit SHA.
- Canonical, versioned build manifest format referenced by the orchestrator (absent in repo).
- Runner/environment contract and documented artifact provenance requirements (no runner validation artifacts found).
- Explicit command composition & sanitization rules or a sandboxing strategy for untrusted inputs.
- Audit/provenance traces for triggered builds and produced artifacts.
- Tests or integration-checks validating reproducibility of snapshot builds across environments.

### RISKS OR CONFLICTS
- Risk Level: High (as called out by the orchestrator). Key risks observed in repo context:
  - No discovered CI/trigger files increases risk of unimplemented or ad-hoc build processes.
  - Without a canonical build manifest and strict runner contract, repeatability and provenance cannot be guaranteed.
  - Accepting repository-provided inputs into build command composition risks command-injection or supply-chain manipulation if not sandboxed and reviewed by `security-sentinel`.

### QUESTIONS FOR CLARIFICATION
- Which environments/runners must be supported (self-hosted runners, cloud CI, ephemeral sandboxes)?
- Is there an existing artifact storage / signing / provenance system expected to be used, or should the planner specify one?

### NEXT AGENT HANDOFF PROMPT (MANDATORY)
Planner-Architect — please act on this report: docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G9_Snapshot_Build_Trigger.md

You are assigned to produce the planner deliverables required by the Orchestrator and referenced in this code-scout report. Do NOT implement code; provide a clear, authoritative specification document that includes only facts and acceptance criteria.

Deliverables (copy-pasteable checklist):
- **Gating Rules:** Formal criteria that must be verified before a snapshot build triggers (what constitutes PASS/FAIL). Include required checks (e.g., signature, repo owner, branch protection, lab metadata) and how failures should be reported.
- **Build Command & Manifest:** Define a canonical, versioned build manifest format (fields, schema versioning) and the exact build commands the implementer will run. Specify where the manifest lives (repo, artifact storage) and how to pin tool versions.
- **Exact SHA Fetching:** Specify the authoritative source and algorithm for resolving the commit SHA to build (webhook payload fields, provider APIs, fallbacks). Define idempotency keys and dedup behavior for repeated triggers.
- **Runner Contract & Environment Requirements:** List runner capabilities, required tooling, environment variables, resource limits, and reproducibility guarantees. Define minimum provenance metadata to capture per build.
- **Failure Semantics & Rollback:** Define deterministic failure categories (transient, permanent, misconfiguration), retry policies, alerting, and a rollback/mitigation checklist for bad snapshots.
- **Security Constraints:** Enumerate untrusted input handling rules and sandboxing requirements. Specify which inputs are allowed to influence command composition and the review process required for any deviation.
- **Artifact Provenance & Audit Fields:** Define required artifact metadata (commit SHA, manifest version, runner id, build timestamp, signature) and where these records must be stored.
- **Acceptance Criteria & Tests:** Provide concrete acceptance criteria for the integration-checker and implementer to validate (including at least one reproducibility test and one provenance validation).
- **Hand-off Notes for Implementer & Security-Sentinel:** Short bullet list of the exact files, APIs, or hooks the implementer will integrate with, and the exact threats the security-sentinel must verify.

Reference this code-scout report in your spec and keep the document narrowly prescriptive (no implementation code). When complete, attach the spec as a new planner document in `docs/planner_specs/EPIC-G/G9_snapshot_build_spec.md` and mark this feature ready for the `implementer` and `integration-checker` agents.

Handoff complete. Provide this report verbatim to the next agent.