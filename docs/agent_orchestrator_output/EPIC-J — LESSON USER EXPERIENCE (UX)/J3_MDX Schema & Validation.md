### FEATURE ANALYSIS

- Feature Type: Code / Validation / Security
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define canonical MDX frontmatter fields, fixed section order, and rejection rules (missing/extra sections, solution-like blocks, filenames).
- Implementer — Implement build-time validator (Node script/AST-based) and integrate into local hooks and CI.
- Integration Checker — Ensure CI invokes validator on PRs and releases; block publishing on failures.
- Security Sentinel — Validate rules target solution leakage and support redaction policies.
- QA / Tester — Provide test corpus (good/bad MDX examples) and verify validator correctness.
- Documenter / Historian — Document schema, error messages, and remediation steps for authors.

### NOT REQUIRED AGENTS

- None — this feature requires cross-functional involvement.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner / Architect — Define the exact frontmatter required fields, section ordering, and explicit rejection rules with examples.
- Step 2: Implementer — Build a validator (AST-based) usable locally and in CI; fail on missing/extra sections or solution-like content.
- Step 3: QA / Tester — Validate validator against a curated corpus and produce coverage report. (Parallel with Documenter)
- Step 4: Integration Checker — Add validator to CI and gate publishing. (Depends on Step 2)
- Step 5: Security Sentinel — Run a policy review on validator outcomes and false-positive risk.
- Step 6: Documenter / Historian — Publish schema and remediation guidance.

### AGENT PROMPTS

- Planner / Architect:
  You are Planner/Architect. Produce a precise MDX frontmatter schema (fields, types, required/optional), an allowed section sequence, and explicit patterns that count as "solution-like" content to reject. Provide 5 positive and 5 negative examples.

- Implementer:
  You are Implementer. Implement a build-time MDX validator (prefer AST-based) that enforces the Planner schema and rejection rules. Provide a CLI `validate-lessons` and instructions to run locally and in CI.

- Integration Checker:
  You are Integration Checker. Integrate the validator into CI to run on changed lesson files in PRs and block merges on validation failures. Provide CI YAML snippets.

- Security Sentinel:
  You are Security Sentinel. Review the validator rules to confirm they reliably prevent solution leakage and recommend additional checks (watermarking, copy restrictions) where needed.

- QA / Tester:
  You are QA. Run the validator against the provided corpus, report false positives/negatives, and suggest edge cases to add.

- Documenter / Historian:
  You are Documenter. Create clear author-facing docs describing the schema, validation errors, and steps to fix common failures.
