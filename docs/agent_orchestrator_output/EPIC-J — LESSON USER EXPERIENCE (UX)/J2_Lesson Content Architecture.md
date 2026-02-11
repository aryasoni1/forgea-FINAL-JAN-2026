### FEATURE ANALYSIS

- Feature Type: Content Architecture / Documentation
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Design directory-by-domain layout, single MDX-per-lesson rule, required frontmatter fields, versioning approach, and ban on storing raw HTML in the DB.
- Implementer — Implement repository layout, enforcement (pre-commit hooks / linters), and conversion tools if needed.
- Integration Checker — Enforce rules in CI for "one MDX per lesson" and reject commits that attempt to store raw HTML in DB payloads.
- Security Sentinel — Review storage constraints and ensure sensitive or solution content cannot be written to backend stores.
- Documenter / Historian — Produce canonical content architecture docs and migration guidance.

### NOT REQUIRED AGENTS

- QA / Tester — Not required for initial architecture design; will be required to validate migrations in later steps.

### MISSING AGENT (ONLY IF NEEDED)

- Content Linter Agent (optional): Enforce semantic checks specific to lesson content beyond generic linters.

### EXECUTION PLAN

- Step 1: Planner / Architect — Deliver canonical directory layout, frontmatter spec, and versioning policy.
- Step 2: Implementer — Create folder structure, add pre-commit hooks/linters enforcing one-file-per-lesson, and add checks to prevent raw-HTML storage.
- Step 3: Integration Checker — Add CI validations to reject non-conforming PRs. (Can start after Step 2 artifacts exist)
- Step 4: Security Sentinel — Review and sign off on storage rules and DB-safe policies.
- Step 5: Documenter / Historian — Publish content architecture and migration notes. (Parallel with Step 4)

### AGENT PROMPTS

- Planner / Architect:
  You are Planner/Architect. Provide a domain-based directory layout for lessons, a strict rule set (one MDX per lesson), required frontmatter keys, versioning scheme (semantic or date-based), and constraints preventing raw HTML in DB. Output a short YAML manifest and rationale.

- Implementer:
  You are Implementer. Implement the Planner layout in the repo, add pre-commit hooks or linters that enforce one MDX file per lesson and block raw-HTML payloads, and provide sample migration scripts if required.

- Integration Checker:
  You are Integration Checker. Create CI checks that validate repository structure and reject PRs that violate the "one MDX per lesson" rule or attempt to add raw HTML content to DB-bound files.

- Security Sentinel:
  You are Security Sentinel. Review storage and content rules and confirm they prevent solution leakage and unsafe HTML persistence. Provide remediation steps if gaps found.

- Documenter / Historian:
  You are Documenter. Produce the canonical guide for authors and maintainers explaining the directory layout, frontmatter fields, and versioning policy.
