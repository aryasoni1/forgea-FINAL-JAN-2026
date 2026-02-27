# FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J9_Anti-Cheat & Quality Controls (Lesson Level)
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md


### TASKS CHECKED

- Security Sentinel — Define anti-cheat rules, content watermarking, rate limiting, and API exposure boundaries.
- Planner / Architect — Define publish gating, human review flows, and watermarking acceptance criteria.
- Implementer — Implement watermarking, rate limiting, and API gating.
- Integration Checker — Add CI checks preventing publishing without human review flag.
- QA / Tester — Validate watermarking, rate limits, and accessibility impacts.
- Documenter / Historian — Publish policy and developer guide for publish/workflow.


### WHAT ALREADY EXISTS

- `/forgea-monorepo/services/content-engine/README.md` — A Python service placeholder for AI agents and vector DB logic. README enforces isolation and Python packaging rules, but no implementation for watermarking or content gating was found in source.

- `/forgea-monorepo/services/verification-runner/` — Present but empty (`.gitkeep`), indicating a planned verification runner service with no implementation in repo.

- `/forgea-monorepo/packages/schema/prisma/schema.prisma` — Prisma models for `Lab`, `LabSession`, `VerificationLog`, and an `AuditLog` model. No explicit `Lesson` model or explicit `published`/`review` boolean fields were observed for lesson objects in the schema.

- `/forgea-monorepo/packages/schema/src/audit-actions.ts` — Audit actions include lab-related events (e.g., `LAB_VERIFY_ATTEMPT`, `LAB_VERIFY_SUCCESS`, `LAB_STATUS_TRANSITION`) which suggest an audit trail design exists for verification/publish events.

- Admin UI build artifacts (`apps/forgea-admin/.next/...`) — Compiled HTML/JS assets contain UI strings and badges reflecting `PUBLISHED`, `APPROVED`, and an "Appeal Inbox" UI, indicating a UI concept for publish states and review flows existed at build time.

- Cross-references in docs: multiple EPIC docs mention rate-limiting and anti-abuse policy needs (EPIC-I, EPIC-H, EPIC-G), showing organizational awareness of rate limits and abuse controls, but these are documentation references rather than feature-level implementations.


### WHAT IS PARTIALLY IMPLEMENTED

- Admin UX artifacts: Build outputs show a publish/status UI and an appeals interface, but the source application code for `forgea-admin` is not present in source form (only `.next` outputs), so the runtime UI behavior cannot be traced to source files here.

- Audit model presence: Audit primitives and action enums exist, but there is no evidence of enforcement hooks (server middleware, services) that automatically log or block publish operations based on anti-cheat criteria.

- Service placeholders: `content-engine` README and `verification-runner` placeholder indicate intended responsibilities (AI-driven workflows, verification), but no concrete implementations for watermarking, content gating, or rate-limiting exist yet.


### WHAT IS MISSING

- Watermarking implementation (server-side or render-time): No source-level code for adding visible or embedded watermarks to lesson content or authored artifacts was found.

- Rate-limiting / throttling middleware: No service-level rate-limit or abuse-protection middleware was located in `services/` or `apps/` source; only documentation references exist.

- Publish gating and human-review enforcement: No CI job, workflow, or server-side checks were found that prevent publishing lessons without a human-review flag or approval.

- Content exposure boundaries: No explicit rules or code were found that redact or hide lesson content from public APIs or unauthenticated consumers.

- Tests and QA artifacts: No automated tests or fixtures validating watermarking, rate-limits, or publish-gating behavior.

- Developer documentation: No developer-facing guide describing the publish review process, watermarking expectations, or how to mark lessons as reviewed/approved.


### RISKS OR CONFLICTS

- Missing source artifacts: Several features (admin UI, lessons app, and some prerender artifacts) appear only as build outputs in `.next/`; source absence prevents direct code inspection or modification and blocks implementer work until sources are located.

- Ownership ambiguity: Lesson assets and admin UI artifacts appear across `forgea-admin`, `forgea-labs`, and a separate `forgea-lessons` app (build outputs). Unclear ownership increases risk of duplicated or inconsistent anti-cheat controls.

- Content leakage: Without watermarking and API gating, lesson content may be accidentally exposed via public endpoints, static renders, or exports.

- Abuse surface: Lack of rate-limiting allows high-volume scraping or automated attacks against lesson content or verification job endpoints (if present), risking service exhaustion or data leaks.


### QUESTIONS FOR CLARIFICATION

- Where is the canonical source for lesson content (authoring storage): should Implementer assume `forgea-lessons` or `forgea-labs` is authoritative, or is source stored externally?

- Is `services/content-engine` intended to implement watermarking and content-redaction, or should watermarking be part of the lesson rendering pipeline in the web apps?

- Is there an existing human-review flag or approval field stored in a DB model (and if so, where)? If not, which team should own the review gating schema changes?


### NEXT AGENT HANDOFF PROMPT (FOR THE SECURITY SENTINEL)

Copy-paste-ready prompt for the Security Sentinel agent (the next agent):

---
You are the Security Sentinel for feature J9_Anti-Cheat & Quality Controls (Lesson Level). Use the repository code-scout report at `docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md` as your factual source about the current repo state and constraints.

Facts you must accept from the report (do not change):
- `services/content-engine` exists as a Python service placeholder (README only). `services/verification-runner` is present but empty.
- Prisma schema includes `Lab` and `AuditLog` models, but no explicit `Lesson` model or `published`/`review` fields were found in source schema.
- Admin UI build artifacts contain `PUBLISHED`/`APPROVED` UI strings and an "Appeal Inbox", but the admin/source apps are missing in source form (only `.next/` outputs present).
- No source-level watermarking, rate-limiting, or CI publish-gating implementations were found in the repository.

Your task (strict, within your role):
- Produce a prioritized set of anti-cheat controls for lesson content that covers:
  - Watermarking strategies (visible and/or invisible), placement rules, and acceptance criteria for rendered artifacts and exports.
  - Rate-limiting and abuse-mitigation policies (per-IP, per-account, burst limits, cooldowns) for any endpoints that serve lesson content, verification jobs, or exports.
  - API exposure and redaction rules: what content must never appear in unauthenticated/public API responses and how to gate access to lesson content programmatically.
  - Publish gating rules: what metadata/flags must exist before a lesson can be published (human-review stamp, approver id, audit log entry), and required preconditions for CI to permit publishing.
  - Threat scenarios and mitigations: enumerate realistic threats (scraping, replay, mass-download, insider leaks) and map each to mitigations you require the Implementer to enforce.

Deliverables (required):
- A concise policy document (bullet list or YAML) that includes for each control:
  - The rationale and the exact acceptance criteria (what evidence proves the control is satisfied).
  - Files/locations the Implementer will need to modify (repo-relative paths) or add (if source is missing, list the expected targets, e.g., apps/forgea-lessons/app/*, services/content-engine/*, CI workflow file paths). Do not implement code—list targets only.
  - Required tests or validation steps the Integration Checker must add to CI to verify the control (e.g., sample pre-render check, watermark verification step, rate-limit simulation test, CI gate for review flag).

Constraints and notes you must respect:
- Do not invent repository files. If a required source file is missing (e.g., `apps/forgea-lessons` source), list that as a blocker and include exact repo-relative placeholders where Implementer should add work.
- Keep recommendations actionable and scoped to security responsibilities — do not design UI UX or write implementation code.
- Provide a prioritized list (High / Medium / Low) for controls and a minimal set that must ship before lessons go public.

Return format:
- A single Markdown file content (<= 200 lines) suitable to be added to `docs/security-policies/` or referenced by Implementer. Include a short checklist of required repo changes and CI validation steps.

Reference: `docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md`

---

Handoff complete. Provide this report verbatim to the next agent.