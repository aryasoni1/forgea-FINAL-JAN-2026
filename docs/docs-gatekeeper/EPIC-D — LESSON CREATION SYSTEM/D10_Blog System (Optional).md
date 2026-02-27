### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: D10 — Blog System (Optional)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: CommonMark / Markdown spec
  - Concept: Canonical markdown rendering for blog content
  - Official source: https://spec.commonmark.org
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Consistent rendering and sanitization across preview, editorial UI, and public site
  - Decision it informs: Renderer choice (markdown vs MDX), allowed in-body components, sanitization rules
  - What breaks without it: Rendering inconsistencies, broken public posts, security exposure from unsanitized HTML

- Technology: Content Licensing (Creative Commons guidance)
  - Concept: Licensing and attribution requirements for authored and AI-assisted blog posts
  - Official source: https://creativecommons.org/licenses/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines publish/republish rights and contributor obligations
  - Decision it informs: Publication workflow, contributor agreements, legal gating
  - What breaks without it: Legal exposure and unclear reuse policies

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator defines agents and high-level plan but no schema, pipeline, or publishing rules.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - Coverage status: PARTIAL
  - Exact gaps: Notes missing schema, publishing pipeline, tests, and feature-flagging guidance.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md
  - Coverage status: PARTIAL
  - Exact gaps: Service README exists but contains no blog pipeline, schema references, or publishing instructions.

### WHAT IS MISSING

- Blog schema and data model files (no `blog` schema or manifest located).
- A blog generation and publishing pipeline (no `services/blog*` or blog pipeline implementation found).
- Tests and QA artifacts validating blog generation and publication.
- Documentation/how-to files implementing orchestrator deliverables for blog publishing.
- Feature-flagging/rollout controls for an optional blog subsystem.

### RISKS OR CONFLICTS

- Integration surface mismatch: `content-engine` (Python) exists while monorepo services are Node-based — no canonical placement for blog pipeline.
- Without a canonical manifest, implementers may diverge on schema and publishing workflow.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend (minimum):

- Add `/docs/official-docs/EPIC-D/blog_schema.md` — canonical blog schema and storage location.
- Add `/docs/official-docs/EPIC-D/blog_publication_workflow.md` — stages, gating, and feature-flag guidance.
- Extend `forgea-monorepo/services/content-engine/README.md` or decide canonical runtime (`services/lessons/generation/` vs `services/content-engine/`).

### STUDY GUIDE FOR HUMAN

- `Blog Schema`:
  - Why: Ensures consistent fields (title, slug, body, summary, tags, author, publish_date)
  - Alternatives: Reuse lesson schema (not recommended; lessons are structured and lab-linked)
  - When NOT to use: When content must be canonical lesson material with lab intents
  - Common mistakes: Mixing lesson-only fields into blog posts (lab_intents, difficulty)

- `Publication Workflow`:
  - Why: Keeps blogs separate from lessons and clarifies review/gating
  - Alternatives: Single pipeline for lessons and blogs — increases coupling
  - Common mistakes: Publishing without license or attribution checks; no feature-flag for optional rollout

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-D/blog_schema.md
  - Purpose: Define blog fields and types; suggested storage path
  - Exact knowledge to add: field list (title:string, slug:string, summary:string, body:markdown, author:id, tags:array[string], status:enum[draft,review,published], published_at:datetime), storage suggestion: `services/blogs/models/` or `packages/blog-schema/`.

- Path: /docs/official-docs/EPIC-D/blog_publication_workflow.md
  - Purpose: Define publish stages and gating
  - Exact knowledge to add: stages (generate → review → publish), required checks (license, editorial review), feature-flag guidance for rollout.

- Path: /docs/official-docs/EPIC-D/blog_feature_flagging.md
  - Purpose: Feature-flag rollout guidance and suggested feature flag names/targets.

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Canonical runtime/ownership unclear: should the blog pipeline live in `services/content-engine/` (Python) or in the monorepo under `services/blogs/` (Node)?
- Master tasks file exists at `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD` but was not used by the code-scout report — planner may verify if additional master tasks are required.

### MASTER DOCS REGISTRY ACTION (exact entries to append to `/docs/master_docs.md`)

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D10 — Blog System (Optional)
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D10_Blog System (Optional).md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for Feature D10.

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D10 — Blog System (Optional)
  - Doc path: /docs/official-docs/EPIC-D/blog_schema.md
  - Status: REQUIRED
  - Reason: Canonical blog schema required before implementer work begins.
