**REQUIRED OFFICIAL DOCUMENTATION**

For each required concept below: Technology / Concept / Official source / Exact version requirement / Why required / Decision it informs / What breaks without it.

- **MDX (mdxjs)**
  - Concept: MDX authoring and runtime semantics (v2)
  - Official source: https://mdxjs.com/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Canonicalizes how JSX, imports, and MDX frontmatter are parsed/rounded by bundlers and runtimes used by the apps.
  - Decision it informs: Parser selection and AST expectations, allowed syntax in lessons, security boundaries for embedded JSX.
  - What breaks without it: Validator may mis-classify valid MDX or miss solution-like JSX; UI rendering may diverge from validation rules.

- **CommonMark (Markdown spec)**
  - Concept: Markdown parsing edge cases and normalization rules
  - Official source: https://spec.commonmark.org/
  - Exact version requirement: 0.30 (or pin) OR: VERSION UNKNOWN — MUST BE PINNED
  - Why required: Determines canonical AST shape for headings, paragraphs, code blocks and inline content.
  - Decision it informs: How AST-based validator tokenizes and normalizes author content prior to heuristics.
  - What breaks without it: False positives/negatives from differing parser behaviors.

- **JSON Schema (frontmatter validation)**
  - Concept: Machine-readable schema for frontmatter (validation and tooling)
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12 (recommended)
  - Why required: Formal language for specifying required fields, types, enums, and strictness used by tooling.
  - Decision it informs: Canonical frontmatter schema format and validator implementation choices (JSON Schema vs ad-hoc checks).
  - What breaks without it: Inconsistent schema implementations between validator and UI; authors receive unclear errors.

- **Unified / remark / rehype & mdast (AST tooling)**
  - Concept: AST formats and parser/plugin ecosystem for MDX/Markdown
  - Official sources: https://unifiedjs.com/ and https://github.com/syntax-tree/mdast
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs which AST nodes are available and stable, and which plugin APIs to rely on for traversal/analysis.
  - Decision it informs: Choice of AST parser, plugin versions, and node-handling for validator.
  - What breaks without it: AST node mismatches causing validator crashes or missed violations.

- **Frontmatter parsing (gray-matter or equivalent)**
  - Concept: YAML/TOML/JSON frontmatter extraction semantics and edge cases (multiline, anchors)
  - Official source: https://github.com/jonschlinkert/gray-matter
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines how raw frontmatter maps to validator input (strings, arrays, typed values).
  - Decision it informs: How to canonicalize/normalize fields before applying JSON Schema.
  - What breaks without it: Type mismatches, unexpected null/undefined behavior in frontmatter validation.
