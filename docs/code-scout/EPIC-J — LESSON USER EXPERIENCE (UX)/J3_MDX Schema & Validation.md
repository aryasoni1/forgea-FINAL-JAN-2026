FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J3 — MDX Schema & Validation
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md


TASKS CHECKED

- Planner / Architect: Define canonical MDX frontmatter fields, fixed section order, and rejection rules.
- Implementer: Build a build-time validator (AST-based) and CLI `validate-lessons`.
- Integration Checker: CI integration and gating on PRs/releases.
- Security Sentinel: Policy review for solution leakage and redaction.
- QA / Tester: Provide test corpus (good/bad MDX examples) and verify validator.
- Documenter / Historian: Documentation for schema and remediation guidance.


WHAT ALREADY EXISTS

- forgea-monorepo/apps/forgea-admin/.next/server/app/page.js — Compiled frontend bundle contains a "Lesson Manager" UI and references to MDX filenames (e.g., `closures.mdx`, `scope-chain.mdx`, `async-await.mdx`). This indicates a frontend feature that expects MDX lesson content.
- forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx — Source component `MDXLessonSidebar` exists and is imported by workspace UI components (e.g., `main-shell.tsx`). This is a UI surface that interacts with MDX lesson data.
- forgea-monorepo/apps/forgea-admin/.next/static/chunks/... — Several compiled assets reference MDX and lesson manager strings; these are build artifacts showing MDX is part of the product surface.


WHAT IS PARTIALLY IMPLEMENTED

- UI integration: The admin and labs frontends include UI components (sidebar, lesson manager) that assume MDX lesson content and file management exist, but those components are not the validator and do not enforce schema rules.


WHAT IS MISSING

- Build-time MDX schema definition: No canonical frontmatter schema file (JSON/YAML/TS) defining required fields, types, and ordered sections was found.
- Validator implementation: No AST-based validator script or CLI `validate-lessons` was found in the repository.
- CI integration: No CI workflow or YAML snippets were found that run an MDX validator on changed lesson files or block publishing on failures.
- Test corpus: No curated set of positive/negative MDX examples for validator QA was found.
- Documentation: No author-facing docs describing frontmatter schema, error messaging, or remediation steps specifically for MDX lesson validation were found.


RISKS OR CONFLICTS

- Solution leakage risk: Product surfaces (compiled bundles) reveal MDX filenames and the presence of lesson content; without a validator that rejects solution-like content, publishing may leak solutions to learners.
- Divergence risk: UI components expect MDX lesson content; without a canonical schema and validator, authors may produce inconsistent frontmatter and sections that break the UI or downstream tooling.
- CI gap: Absence of CI enforcement increases the chance invalid or sensitive content is merged and published.


QUESTIONS FOR CLARIFICATION

- Not strictly required to proceed: Confirm which agent is next (Planner / Architect is recommended as first step per orchestrator output). If a different next agent has been selected by the Orchestrator, provide that identity.


NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are Planner / Architect. Use this code-scout report at docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J3_MDX Schema & Validation.md as the factual repository state. Do NOT implement code or propose specific implementations. Your authority: produce a precise, implementation-ready specification only.

Please produce the following artifacts in your response:

1) A canonical MDX frontmatter schema: list all fields with names, types, allowed values, which are required vs optional, and any field-level validation rules (formats, length limits, enums).
2) An allowed section sequence for lesson MDX (ordered list of sections that must appear in every lesson), including which sections are mandatory vs optional and whether each allows subsections.
3) Explicit rejection rules (patterns and heuristics) that should cause an automated validator to fail a file. Include examples of what to reject (e.g., solution code blocks, direct answer statements, filenames listed as steps, attachments containing solutions). Do NOT provide validator code—only the rules the Implementer will enforce.
4) Five positive (valid) MDX examples and five negative (invalid) MDX examples illustrating frontmatter and body content. Keep examples minimal but precise and include the frontmatter and a short body snippet for each.
5) A short list of edge cases the Implementer must consider when building an AST-based validator (e.g., inline code that looks like a solution, code block language tags, escaped characters, computed frontmatter fields).
6) Any metadata the Implementer and Integration Checker will need (CLI exit codes to use to indicate failure categories, minimal error message structure for authors, and whether fixes are auto-fixable).

Reference this report and do not add implementation steps or CI snippets. Stop after producing the specification artifacts above.



Handoff complete. Provide this report verbatim to the next agent.