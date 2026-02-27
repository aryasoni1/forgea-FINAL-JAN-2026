## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include the official source and pin requirement.

- Technology: MDX
  - Concept: MDX authoring and runtime (embedding JSX in Markdown)
  - Official source: https://mdxjs.com/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines how interactive components and JSX are allowed in lesson content and how bundlers and renderers should parse MDX.
  - What decision it informs: Canonical parser/runtime (MDX v2 vs other tooling), tooling/linting (eslint/mdx plugins), and storage schema for serialized content.
  - What breaks without it: Incompatible renderer behavior across apps; inconsistent parsing of frontmatter and embedded JSX.

- Technology: CommonMark (Markdown spec)
  - Concept: Markdown baseline and whitespace/escaping behavior
  - Official source: https://spec.commonmark.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures consistent Markdown rendering and diffing across editors, static renderers and preview tooling.
  - What decision it informs: Parser options, diffs/preview fidelity, and transformations used by CI checks.
  - What breaks without it: Divergent render results between editors and production rendering.

- Technology: YAML (frontmatter)
  - Concept: YAML frontmatter structure and allowed types
  - Official source: https://yaml.org/spec/1.2/spec.html
  - Exact version requirement: YAML 1.2
  - Why required: Frontmatter is the canonical manifest for every lesson; schema validation relies on YAML parsing behavior.
  - What decision it informs: Schema validation rules and sanitization expectations for metadata fields.
  - What breaks without it: Inconsistent frontmatter parsing, broken CI validation, and incorrect metadata ingestion.

- Technology: OWASP XSS Prevention / HTML sanitization
  - Concept: Sanitizer rules and allowed HTML subset
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/XSS_Prevention_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines safe handling of any HTML-like content within MDX and prevents solution leakage or XSS in lesson previews.
  - What decision it informs: Allowed HTML subset in MDX, server-side validators, and DB storage rules forbidding raw HTML payloads.
  - What breaks without it: Security regressions and possible exposure of solutions or malicious payloads to learners.

- Technology: Semantic Versioning
  - Concept: Versioning lessons and published releases
  - Official source: https://semver.org/
  - Exact version requirement: SemVer 2.0.0
  - Why required: Provides canonical rules for version strings, precedence and compatibility guarantees.
  - What decision it informs: How lesson version fields are formatted and compared in the DB and CI.
  - What breaks without it: Ambiguous version ordering and migration/versioning tooling disagreements.
