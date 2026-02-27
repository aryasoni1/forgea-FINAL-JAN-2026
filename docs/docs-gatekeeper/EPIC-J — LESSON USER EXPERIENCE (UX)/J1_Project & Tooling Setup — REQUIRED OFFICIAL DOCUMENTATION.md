### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: Astro (project scaffold + Islands)
   - Official source: https://docs.astro.build/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines canonical project layout, islands/partial hydration patterns, build-time prerender hooks, and tooling compatibility.
   - Decision it informs: Whether `apps/lessons` uses Astro, the recommended islands approach, and build CLI semantics.
   - What breaks without it: Incorrect scaffold choices, incompatible islands usage, and broken pre-rendering expectations.

2. Technology: MDX (MDX spec / mdx-js)
   - Official source: https://mdxjs.com/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Frontmatter parsing, MDX transforms, allowed JSX in lessons, and toolchain integration.
   - Decision it informs: Frontmatter schema enforcement, allowed in-body features, and integration points for the frontmatter validator.
   - What breaks without it: Invalid MDX parsing, failing builds, and inconsistent frontmatter interpretation.

3. Technology: JSON Schema (2020-12)
   - Official source: https://json-schema.org/specification.html
   - Exact version requirement: 2020-12
   - Why required: Canonical validator format for MDX frontmatter schema and CI validator contract.
   - Decision it informs: Validator inputs/outputs, error formats, and how CI interprets validation failures.
   - What breaks without it: Ambiguous validator formats and non-interoperable error reports.

4. Technology: Node.js / npm / pnpm toolchain
   - Official source: https://nodejs.org/ and https://pnpm.io/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Build-time environment, compatible package manager, and CI runtime versions for `apps/lessons` builds.
   - Decision it informs: CI job runner image, local dev setup, and supported Node APIs.
   - What breaks without it: Flaky builds and mismatched local/CI behavior.
