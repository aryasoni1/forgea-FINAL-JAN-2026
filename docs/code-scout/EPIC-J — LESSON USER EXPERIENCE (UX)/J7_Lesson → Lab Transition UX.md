# FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J7 — Lesson → Lab Transition UX
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J7_Lesson → Lab Transition UX.md

---

## TASKS CHECKED

- Define lesson completion gate conditions, required summaries, and acknowledgement flows (Planner / Architect)
- Design transition screen layout and content (Planner / Architect)
- Specify allowed file lists and acknowledgement semantics (Planner / Architect)
- Implement transition UI, gating logic, and enforcement to block lab entry until gate cleared (Implementer)
- Validate gate behavior and persistence (QA / Tester)
- Review gate security to prevent bypass (Security Sentinel)
- Document developer integration points (Documenter / Historian)

---

## WHAT ALREADY EXISTS

- `apps/forgea-admin` (admin UI) — compiled assets and server bundles reference a Lesson Manager and authoring workflows. The admin app includes components for lesson authoring and a file-tree/MDX explorer (compiled `.next` assets contain MDX filenames and lesson UI references).

- `apps/forgea-lessons` (public lessons app) — compiled traces and components indicate a lessons sidebar and pages; the app renders lesson content and a lesson navigation UI.

- Docs / orchestrator artifacts describing required agents and gating UX: the Agent Orchestrator output for this feature (docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J7_Lesson → Lab Transition UX.md) enumerates required agents and execution plan for Planner, Implementer, QA, Security Sentinel, and Documenter.

- No explicit Python/Node ownership conflict found for this UX feature; UI apps are Next.js (monorepo) and the `content-engine` is Python-only (note from other EPIC docs), which may influence backend placement for acknowledgement persistence.

---

## WHAT IS PARTIALLY IMPLEMENTED

- Lesson UI and public lesson pages are present at the application layer (compiled outputs exist), suggesting a place to surface the transition screen. However, compiled artifacts do not reveal implementation details of a transition/gate component or its APIs.

- Routing/navigation infrastructure (Next.js app router) is present in both admin and lessons apps, providing a natural place to add a transition screen, but no source-level transition page/component or server endpoints for gating were discovered in repository source artifacts during scanning.

---

## WHAT IS MISSING

- No source file or component explicitly named for a "lesson-to-lab transition" screen was found in repository source trees.

- No JSON schema or DB schema for acknowledgement events or persistence (e.g., `lesson_acknowledgements` table, event payloads) was discovered.

- No backend API endpoints or server routes that enforce gate conditions (prevent lab entry) were found in scanned artifacts.

- No tests, QA scripts, or CI checks validating gate enforcement or acknowledgement persistence discovered.

- No documented JSON schema for "allowed files" lists or for acknowledgement events linking user, lesson, lab, timestamp, and attestation fields.

---

## RISKS OR CONFLICTS (observed from repo)

- Hard-lock risk: This feature touches a HARD LOCK (lesson-to-lab gate influences lab access flow). Missing authoritative gate enforcement (server-side) risks client-side bypass if implementers only add a client UI.

- Ownership ambiguity: `services/content-engine/README.md` marks that service as Python-only. If acknowledgement persistence is placed under that service, implementers must ensure cross-runtime integration with Next.js apps. Planner must confirm where to persist acknowledgements (primary DB vs. content-engine vs. lessons service).

- No evidence of immutability or audit logging for acknowledgements; without this, acceptance proofs may be non-repudiable.

---

## QUESTIONS FOR CLARIFICATION

- Where must acknowledgements be persisted (main transactional DB, content-engine, or another service)?
- Should gate enforcement be performed server-side (required) and which service/team owns that API?
- What exact attributes must be recorded on acknowledgement events (user_id, lesson_id, lab_id, timestamp, client_version, IP, attestation text, proof reference)?
- Are there existing legal/product constraints (e.g., explicit opt-in wording) that must appear on the transition screen?

---

**NEXT AGENT HANDOFF PROMPT (MANDATORY)**

You are the Planner / Architect. Use this repository report at `docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J7_Lesson → Lab Transition UX.md` as the truth source.

Do NOT implement code — produce the canonical specification only. Your deliverable must include the following, copy-paste-ready for Implementer and Security Sentinel work:

1) Gate Conditions: a precise list of conditions that must be satisfied before a user may enter a lab from a lesson (e.g., lesson completion metrics, required checklist items, time-on-page minima). For each condition, state whether it is enforced client-side, server-side, or both.

2) Transition Screen Layout & Content: a short wireframe (text) describing UI sections (objective, constraints, allowed files list, acknowledgement checkbox with exact wording), and required accessibility considerations.

3) Acknowledgement Event Schema: JSON Schema for the acknowledgement event with exact fields, types, and validation rules. Include field descriptions for `user_id`, `lesson_id`, `lab_id`, `ack_text`, `client_version`, `ip_address` (if collected), `timestamp`, and any cryptographic proof or signature fields if required.

4) Allowed Files List Schema: JSON Schema describing how allowed files are listed and validated (file path patterns, size limits, allowed extensions). Include an example payload.

5) API Contract (server-side): A minimal REST/GRPC contract for the acknowledgement endpoint(s) (endpoint path, method, request body schema, authentication/authorization requirements, expected responses, and status codes). Explicitly state that gate enforcement must be performed server-side before returning success for lab-entry requests.

6) Persistence & Audit: Recommended DB table(s) schema for acknowledgements and a short note on audit/immutability (append-only, created_at, who/what wrote it). State whether the `content-engine` (Python) or monorepo services should own storage; if neither is acceptable, list the questions needed to decide ownership.

7) Security Requirements: List the minimum security checks (rate-limiting, signature verification if any, who can write acknowledgements, and how to prevent client-side bypass). Do NOT propose implementation code—only explicit checks and where they must run.

8) QA Acceptance Criteria: A concise list of testable acceptance criteria that QA will use to validate gate behavior (e.g., "Given an unacknowledged user, lab entry API returns 403; after acknowledgement is persisted, lab entry returns 200").

9) Implementation Artifacts for Implementer (enumerated): exact files/components the Implementer must add (e.g., `apps/forgea-lessons/app/transition.tsx` page, server API `POST /api/lessons/:id/acknowledge`, DB migration `create_lesson_acknowledgements.sql`, CI test checklist). Do NOT implement them — just list them.

10) Minimal Example Payloads: Provide one example acknowledgement JSON and one allowed-files JSON that the Implementer can use as fixtures.

Reference this Code-Scout report and these repo facts in your spec: presence of `apps/forgea-admin` lesson manager, `apps/forgea-lessons` lesson UI traces, and `services/content-engine/README.md` Python-only constraint. If any decision requires answers from product/security (ownership, legal wording), list those decisions explicitly and do not proceed with assumptions.

Deliverables: a single document (Markdown) containing the above sections, plus a short 3–5 bullet rationale for each major decision (server-side enforcement, persistence location, and required auditability).

---

Handoff complete. Provide this report verbatim to the next agent.