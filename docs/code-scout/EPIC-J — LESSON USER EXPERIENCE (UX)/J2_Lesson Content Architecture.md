# FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J2 — Lesson Content Architecture
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md

---

## TASKS CHECKED

- Provide a domain-based directory layout for lessons (Planner / Architect)
- Define the strict rule: one MDX per lesson (Planner / Architect)
- Specify required frontmatter keys for lesson MDX (Planner / Architect)
- Define versioning scheme for lessons (semantic or date-based) (Planner / Architect)
- Prohibit storing raw HTML in DB payloads (Planner / Architect)
- Implement repository layout and enforcement (Implementer)
- Add pre-commit hooks / linters enforcing one-file-per-lesson and blocking raw-HTML (Implementer)
- Create CI checks rejecting non-conforming PRs (Integration Checker)
- Security review of storage rules to prevent solution leakage (Security Sentinel)
- Produce canonical content architecture docs and migration guidance (Documenter / Historian)

---

## WHAT ALREADY EXISTS

- [forgea-monorepo/services/content-engine/README.md](forgea-monorepo/services/content-engine/README.md)
  - A Python-only service for AI agents and vector DB logic. Explicit rules: keep isolated from Node workspace; use `requirements.txt`/`pyproject.toml`.

- `apps/forgea-admin` — Lesson Manager UI (client/server build artifacts present)
  - Built assets reference a Lesson Manager and an MDX file explorer (e.g., closures.mdx, callbacks.mdx) visible in compiled bundles under `apps/forgea-admin/.next/...` indicating a UI for MDX lesson management exists in the admin app.
  - Source-level references to lesson-related components exist in the admin app (UI tree, lesson manager, lab-authoring-form paths appear in build metadata).

- `apps/forgea-lessons` — Public lessons app (built artifacts present)
  - The lessons application and a `lesson-sidebar`/file-tree component are included in build traces under `apps/forgea-lessons` (compiled `.next` traces and components indicate a sidebar and page for lessons).

- Docs referencing lesson architecture and missing items:
  - [docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md](docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D1_Strategy & Scope Definition.md) — notes that lessons will be authored, rendered, and diffed as markdown/MDX and that a canonical spec is required.
  - Several docs under `docs/docs-gatekeeper` and `docs/code-scout/EPIC-D` reference missing schemas, storage, and generation engine artifacts (e.g., `services/lessons/generation/` is referenced but not present).

- ESLint/config entries referencing `apps/forgea-lessons` exist in `packages/config/eslint.config.js` (entry `app-lessons`), indicating linting scope includes lessons app.

---

## WHAT IS PARTIALLY IMPLEMENTED

- Lesson management UI (admin) and public lessons app appear implemented at the application layer (compiled outputs present), but the canonical source of truth for lesson MDX files is not found in repository source trees (no raw `.mdx` files discovered in repository root-level source paths).

- Content runtime ambiguity: orchestration/docs reference both `services/lessons/generation/` (Node) and `services/content-engine/` (Python). `services/content-engine/README.md` enforces Python-only; the planner must pick canonical runtime/ownership before implementer work.

- Documentation scaffolding exists describing required policies and that lessons must be MDX, but concrete artifacts are missing: a canonical frontmatter schema, explicit `lessons` DB schema, `lesson_versions` tables, and migration scripts are not present in the repo docs or code.

---

## WHAT IS MISSING

- No canonical `lessons` source folder with MDX files in repository source (no `**/*.mdx` in source roots discovered).

- No `services/lessons/generation/` Node runtime implementation (referenced in docs/orchestrator but not found).

- No explicit lesson DB schema or migration files (`lessons`, `lesson_versions`) discovered under infra or services.

- No pre-commit hooks, linters, or CI validation scripts that enforce "one MDX per lesson" or that block raw HTML payloads from being persisted.

- No enforcement tooling or CI rules for preventing raw HTML in DB-bound content seen in repo.

- No canonical YAML manifest or frontmatter spec file describing required keys for lessons.

---

## RISKS OR CONFLICTS (observed from repo)

- Runtime/ownership conflict: docs and implementer prompts reference `services/lessons/generation/` (Node) while `services/content-engine` is Python-only per its README. This is a clear integration/ownership ambiguity for Planner to resolve.

- Evidence of MDX filenames in compiled admin assets suggests lessons may currently be stored in a separate content store, external repo, or DB; without a discovered canonical source, migrations and enforcement will be blocked until the storage location is confirmed.

- Absence of DB schema artifacts or migrations for lessons/versioning increases risk that different teams will implement incompatible storage shapes.

---

## QUESTIONS FOR CLARIFICATION

- Where are canonical lesson MDX files currently stored (monorepo filesystem, separate content repo, or DB)?
- Which runtime should own generation and storage: `services/lessons/generation/` (Node) or `services/content-engine/` (Python)? The content-engine README forbids adding Node components there.
- Is there an existing DB schema/migration plan managed externally that the implementer should reference?

(Answering these will unlock implementer and CI work.)

---

**NEXT AGENT HANDOFF PROMPT (MANDATORY)**

You are the Planner / Architect. Use this repository report to produce the canonical lesson content architecture specification. Reference this report at `docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J2_Lesson Content Architecture.md`.

Scope (do not implement):
- Decide canonical storage location for lesson sources (filesystem in repo vs content DB vs separate content repo). Note any constraints from `services/content-engine/README.md` about Python-only services.
- Produce a domain-based directory layout for lessons (example top-level path if files will live in the monorepo), and state ownership/permissions.
- Define the strict rule set: "one MDX per lesson" and how this maps to lesson IDs, slugs, and file names.
- Specify required frontmatter keys for each lesson MDX (exact keys, types, and validation rules), and provide a short YAML manifest example.
- Choose a versioning scheme for lessons (semantic or date-based), and describe where versions are stored (DB table or git tags) and immutability rules for published versions.
- State constraints forbidding raw HTML storage in DB payloads and any sanitizer/validation expectations for HTML-like content appearing in MDX.
- List concrete artifacts the Implementer will produce (folder creation, linter/pre-commit rules, CI checks, sample migration script references). Do NOT implement them — only provide the spec and manifest needed for implementation.

Deliverables (copy-paste-ready):
- A canonical directory layout (text + example paths).
- A short YAML manifest showing required frontmatter keys and an example lesson frontmatter block.
- A concise rationale (3–5 bullets) for each major decision (storage location, versioning choice, and HTML constraints).

Reference files and findings: include links to these repo artifacts in your response: `forgea-monorepo/services/content-engine/README.md`, `apps/forgea-admin` build traces showing lesson manager, `apps/forgea-lessons` build traces, and docs under `docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/` that describe missing DB/schema artifacts.

Do not propose implementation code or CI scripts in this prompt — only produce the architecture specification and manifest the Implementer will follow.

---

Handoff complete. Provide this report verbatim to the next agent.