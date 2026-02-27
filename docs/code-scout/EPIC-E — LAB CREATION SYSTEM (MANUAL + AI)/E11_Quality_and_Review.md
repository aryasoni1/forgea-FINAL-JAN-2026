FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E11 — Quality and Review
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md

TASKS CHECKED

- Planner/Architect — Define manual review checkpoints and quality criteria
- QA/Tester — Validate solvability and difficulty alignment
- Documenter/Historian — Produce reviewer checklist and guidance
- Security Sentinel — Audit reviews for unsafe content

WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md — Orchestrator output with feature analysis, required agents, execution plan, and copy-paste prompts.
- Documentation references across the repo indicating review needs and gaps:
  - docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md — calls out missing reviewer SOP and reviewer checklist.
  - docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A1_Repository & Structure.md — mentions file/folder ownership and automatic reviewer assignment concepts.
  - Various docs/guides mention reviewer checks and reviewer needs (examples in `docs/guides/*`).

WHAT IS PARTIALLY IMPLEMENTED

- Policy-level intent and references exist in documentation (requests for reviewer SOP, reviewer checklist, and required sign-off metadata), but no authoritative reviewer SOP or checklist files are present.
- UI/workflow placeholders in `apps/forgea-admin` show publishing actions and history events (e.g., `LAB_PUBLISHED`, `VERIFICATION_FAILED`) indicating a publishing flow, but no explicit reviewer sign-off field or enforced review gate implementation was found.

WHAT IS MISSING

- A `reviewer-sop.md` or equivalent reviewer Standard Operating Procedure (not found).
- A concise reviewer checklist or `reviewer-checklist.md` with examples of accepted/rejected labs (not found).
- CI or publishing pipeline enforcement that requires reviewer sign-off or metadata on publish (no gating seen in workflows for manual review sign-off).
- Lab metadata fields capturing reviewer identity and timestamp (e.g., `reviewed_by`, `reviewed_at`, `review_notes`) in schema or sample lab metadata (not found).
- Sample solvability experiments or QA test runs validating difficulty/time-on-task estimates (not found).
- Security review artefacts or guidance specific to reviewer responsibilities for detecting secrets or exfiltration vectors in labs (not found).

RISKS OR CONFLICTS

- High risk: this feature touches HARD LOCK (lab immutability and publish gating). Without formal reviewer SOP and enforced sign-off, published labs may bypass critical checks, causing content quality or security issues.
- Documentation indicates required reviewer artifacts but repo lacks authoritative files; risk of docs drifting from implementation and reviewers lacking a consistent process.
- Absence of reviewer identity capture increases auditability risk and complicates blame/rollback after problematic publishes.

QUESTIONS FOR CLARIFICATION

- None strictly required to draft the Planner/Architect design; implementers will rely on the Planner for specifics.

NEXT AGENT HANDOFF PROMPT (FOR PLANNER/ARCHITECT)

You are the Planner/Architect. Use this code-scout report at `docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md` as the factual source. Produce a concise design doc (bullet list + short technical checklist) that includes all of the following (do not implement):

- The manual review workflow for lab publishing: required checkpoints, reviewer roles and permissions, and gate points where manual review is mandatory.
- Pass/fail criteria for reviews: solvability, estimated time accuracy, concept focus, clarity, and forbidden content types.
- A reviewer checklist template with examples of acceptable and rejected lab characteristics and a short review report template.
- Required lab metadata additions (fields and formats) to capture reviewer identity, timestamp, and signed-off revision.
- QA validation strategy: how to run solvability experiments, measure time-on-task, and report discrepancies.
- Security reviewer responsibilities and guidance to detect secrets, exfiltration vectors, or unsafe fixtures.
- Expected deliverables for Implementer and Documenter (files to create, metadata schema changes, UI hooks) and a one-line checklist of required reviewer artifacts to be committed.

Reference only the factual findings in this report. Do not implement code or modify pipelines. Return the design doc as a compact bullet list and a one-line checklist enumerating required deliverables for Implementer/Documenter.

“Handoff complete. Provide this report verbatim to the next agent.”
