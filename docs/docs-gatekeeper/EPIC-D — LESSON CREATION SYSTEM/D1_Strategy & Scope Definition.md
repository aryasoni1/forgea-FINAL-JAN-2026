### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D1 — Strategy & Scope Definition
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D11_Explicitly Out of Scope.md

### REQUIRED OFFICIAL DOCUMENTATION

For each required concept below provide: technology, concept, official source, exact version requirement (or flag unknown), why required, decision it informs, what breaks without it.

- Technology: Markdown / CommonMark
  - Concept: Canonical markdown rendering and spec for lesson content
  - Official source: https://spec.commonmark.org
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Lessons will be authored, rendered, and diffed as markdown/MDX. A canonical spec prevents renderer mismatches and content drift.
  - Decision it informs: Choice of renderer, allowed syntax in lesson text, content sanitization rules.
  - What breaks without it: Inconsistent rendering across renderer implementations, broken lesson previews and CI checks.

- Technology: JSON Schema
  - Concept: Schema standard for the canonical Lesson JSON schema
  - Official source: https://json-schema.org
  - Exact version requirement: 2020-12 (PIN THIS BEFORE FREEZE) or VERSION UNKNOWN — MUST BE PINNED
  - Why required: Schema validation, tooling (codegen), and deterministic storage rely on a pinned JSON Schema version.
  - Decision it informs: Validator selection, schema features allowed (unevaluatedProperties, etc.).
  - What breaks without it: Invalid assumptions about schema capabilities, failing validators or silent data loss.

- Technology: Web Content Accessibility Guidelines (WCAG)
  - Concept: Accessibility requirements for lesson content and interactive lab links
  - Official source: https://www.w3.org/TR/WCAG21/ (or later)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Lessons must meet accessibility expectations for screen-readers, keyboard navigation, and color contrast.
  - Decision it informs: Content templates, media handling, UI acceptance criteria.
  - What breaks without it: Non-compliant content leading to exclusion, legal or UX risk.

- Technology: Content Licensing (Creative Commons guidance)
  - Concept: Licensing and rights for authored and AI-assisted lesson content
  - Official source: https://creativecommons.org/licenses/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines allowed reuse, attribution, and publication model (lessons vs blogs).
  - Decision it informs: Publication workflow, contributor agreements, and repo hosting rules.
  - What breaks without it: License conflicts, hidden legal exposure when publishing content.

- Technology: Pedagogy guidance (Bloom's Taxonomy or equivalent)
  - Concept: Learning objective framing and difficulty classification
  - Official source: e.g., https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/ (reference)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs lesson difficulty, objective phrasing, and inclusion criteria
  - Decision it informs: Difficulty enums, assessment alignment, lab intent design
  - What breaks without it: Incoherent learning objectives, mismatched assessments, poor UX.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator payload defines agents and prompts but lacks a planner task doc, scope statement, selected tracks, inclusion criteria, rationale, and locked decisions.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: PARTIAL
  - Exact gaps: Enumerates D1 bullets but does not provide the required scope statement, inclusion criteria, track shortlist, or prerequisites.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - Coverage status: PARTIAL
  - Exact gaps: Defines a blog pipeline but does not specify the lessons-vs-blogs split, boundary examples, or cross-publishing rules.

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D11_Explicitly Out of Scope.md
  - Coverage status: PARTIAL
  - Exact gaps: Lists excluded features (adaptive learning, user-generated lessons, ratings/comments, AI-decided difficulty) but provides no rationale or consumption strategy.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing planner output and specific doc gaps; does not itself provide the planner task document required by the orchestrator.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend (minimum):

- Extend `/Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D11_Explicitly Out of Scope.md` with rationale and consumption strategy for each exclusion.
- Extend `/Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md` to include explicit lessons-vs-blogs boundary examples and cross-publish rules.
- Add planner task doc `/docs/tasks/task-H1-<YYYY-MM-DD>.md` (planner responsibility) that authoritatively declares scope, three high-ROI tracks, inclusion criteria, prerequisites, and locked decisions.

### STUDY GUIDE FOR HUMAN

- `CommonMark`:
  - Why: Ensures consistent rendering of lesson text across preview, CI, and production.
  - Alternatives: MDX with a pinned MDX parser; choose CommonMark if only markdown features are required.
  - When NOT to use: If lessons require custom React components in-body — prefer MDX.
  - Common mistakes: Not pinning parser versions; allowing arbitrary HTML without sanitization.

- `JSON Schema`:
  - Why: Deterministic schema validation and codegen for lesson storage.
  - Alternatives: TypeScript-only runtime checks; avoid for cross-language tooling.
  - When NOT to use: If schema will be tightly coupled to TypeScript-only runtime and never consumed by other services.
  - Common mistakes: Using unpinned schema draft features; relying on validators that behave differently across languages.

- `WCAG / Accessibility`:
  - Why: Lessons are instructional and must be accessible.
  - Alternatives: Internal accessibility checklist (but still reference WCAG).
  - When NOT to use: Never — always consult WCAG for public-facing content.
  - Common mistakes: Treating accessibility as an afterthought; missing keyboard or screen-reader flows for lab links.

- `Content Licensing`:
  - Why: Prevents legal exposure when publishing and reusing AI-assisted content.
  - Alternatives: Company-specific CLA and contributor terms, but still map to CC terms.
  - When NOT to use: N/A — legal must review.
  - Common mistakes: Implicitly assuming content is public domain; missing attributions.

### INTERNAL DOCS TO ADD OR EXTEND (if PARTIAL)

- Path: /docs/official-docs/EPIC-D/lesson_philosophy.md
  - Purpose: Define Forgea lesson philosophy, quality criteria, and high-level 'why' for lessons vs blogs.
  - Exact knowledge to add: statement of purpose, target personas, minimal quality checklist, examples (good vs bad), reference to pedagogy standard (Bloom).
  - Required version pin: N/A (internal). Cite Bloom's source in doc and pin external pedagogy references.

- Path: /docs/official-docs/EPIC-D/lesson_inclusion_criteria.md
  - Purpose: Authoritative inclusion rules (audience, depth, lab coupling, approval gates).
  - Exact knowledge to add: audience tiers, expected depth (time-on-task), required lab coverage, reviewer roles, approval workflow.
  - Required version pin: N/A (internal).

- Path: /docs/official-docs/EPIC-D/lesson_vs_blog_split.md
  - Purpose: Canonical boundary rules between lessons and blogs with concrete examples.
  - Exact knowledge to add: criteria matrix (depth, reproducibility, permanence, lab coupling), cross-post rules, publishing destinations.
  - Required version pin: N/A (internal).

- Path: /docs/official-docs/EPIC-D/initial_high_roi_tracks.md
  - Purpose: List and justify the first three high-ROI learning tracks for launch.
  - Exact knowledge to add: track name, short rationale, assumed metrics (impact proxy), stakeholders/SMEs to consult, example lessons.
  - Required version pin: N/A (internal).

- Path: /docs/official-docs/EPIC-D/prerequisites.md
  - Purpose: Implementation prerequisites and dependencies before work begins.
  - Exact knowledge to add: required schemas, vector DB readiness, lab metadata contract, content source whitelist, tooling readiness checklist.
  - Required version pin: N/A (internal).

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- No planner task doc (`/docs/tasks/task-H1-<YYYY-MM-DD>.md`) exists — MUST be produced by planner-architect before implementation decisions proceed.
- No stakeholder list or metrics defined for selecting the first 3 high-ROI tracks — planner must request SME input or define proxy metrics.
- External standards are not pinned (CommonMark, JSON Schema draft version, WCAG, licensing) — these MUST be pinned before schema freeze or publishing decisions.

### MASTER DOCS REGISTRY ACTION (exact entries to append to `/docs/master_docs.md`)

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D1 — Strategy & Scope Definition
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates necessary for Feature D1.

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D1 — Strategy & Scope Definition
  - Doc path: /docs/official-docs/EPIC-D/lesson_philosophy.md
  - Status: REQUIRED
  - Reason: Canonical lesson philosophy required to ground lesson generation and lessons-vs-blogs split.
