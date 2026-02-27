### D1_Strategy & Scope Definition — REQUIRED OFFICIAL DOCUMENTATION

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

---

### D2_Canonical Lesson Template — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema
   - Concept: Canonical JSON Schema specification (draft selection)
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines schema vocabulary, $id, $ref semantics, and validation keywords used by the lesson schema.
   - Decision it informs: Choice of schema keywords, refs resolution strategy, and validator compatibility.
   - What breaks without it: Incompatible validator behavior, ambiguous keyword semantics, and broken CI validation.

2. Technology: AJV (or equivalent JSON Schema validator)
   - Concept: Node.js JSON Schema validator and CLI/usage guidance
   - Official source: https://ajv.js.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Implementation guidance for schema compilation, CLI usage, and Node compatibility.
   - Decision it informs: Validator API (compile vs. validate), supported schema draft, and CI invocation.
   - What breaks without it: Validator mismatches across environments and failing PR checks.

3. Technology: Node.js runtime policy
   - Concept: Node.js version and allowed range for CI and developer environments
   - Official source: https://nodejs.org/en/about/releases/
   - Exact version requirement: See `docs/official-docs/node-version-policy.md` (registry indicates Node.js 20.x)
   - Why required: Ensures validator/CLI compatibility and deterministic CI images.
   - Decision it informs: Supported validator versions and CI runner images.
   - What breaks without it: Divergent local vs CI behavior and unexpected runtime failures.

---

### D3_Knowledge Ingestion — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Robots Exclusion / Crawl rules
  - Concept: robots.txt / crawl etiquette
  - Official source: https://www.robotstxt.org/
  - Exact version requirement: LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines what domains/pages may be crawled and how to respect site owners.
  - Decision informed: Allowed domain list, seed rules, and crawler behavior.
  - What breaks without it: Risk of illegal or disallowed scraping, IP blocks, and legal exposure.

- Technology: HTTP fetch semantics
  - Concept: HTTP status handling, caching, and headers
  - Official source: RFC 7231 (HTTP/1.1 Semantics) — https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Correctly detect redirects, rate-limit responses, and idempotency for retries.
  - Decision informed: Backoff, retry strategy, and provenance header capture.
  - What breaks without it: Incorrect retry/backoff, poor provenance, corrupted ingests.

- Technology: Object storage API (if chosen)
  - Concept: S3-compatible object storage semantics
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Storage format, multipart upload limits, and authorization model.
  - Decision informed: Raw blob storage choice, retention/archival policy, and cost estimates.
  - What breaks without it: Misconfigured storage, data loss, or excessive costs.

- Technology: OWASP Input Validation / Sanitization
  - Concept: Input sanitization and content safety guidance
  - Official source: https://cheatsheetseries.owasp.org/
  - Exact version requirement: LIVING DOCUMENT — VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Rules for sanitizing fetched HTML, attachments, and metadata.
  - Decision informed: Sanitization pipeline, threat model mitigations, and allowed transformations.
  - What breaks without it: Vulnerabilities to XSS, malicious payloads, or unsafe downstream embeddings.

- Technology: Chroma (Vector DB) & Embedding provider guidance
  - Concept: Embedding metadata contract and ingestion invariants
  - Official source: Chroma docs (https://www.trychroma.com/) and embedding provider docs (e.g., OpenAI)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Downstream contract for chunk metadata, provenance fields, and storage format.
  - Decision informed: Normalizer output format and adapter contract for D4.
  - What breaks without it: Failed integration with D4 (vector DB), lost provenance, or incorrect retrieval.

---

### D4_Vector Database & RAG — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Chroma (vector database)
  - Concept: Vector storage, persistence, query API, and metadata indexing
  - Official source: https://www.trychroma.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Chroma's docs determine supported persistence backends, collection configuration, metadata field constraints, and query semantics.
  - Decision it informs: Storage architecture, durability settings, sharding/replication choices, metadata indexing strategy.
  - What breaks without it: Misconfigured store, incompatible metadata layout, unsupported API usage, security misconfigurations.

- Technology: Embedding model API (provider-specific)
  - Concept: Model names, embedding dimension, tokenization, rate limits, and API parameters
  - Official source: Provider docs (e.g., OpenAI Embeddings — https://platform.openai.com/docs/guides/embeddings) OR chosen provider's official docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Model/documentation determines embedding dimensionality, semantic behavior, and cost/latency trade-offs.
  - Decision it informs: Allowed models, minimum model versions, embedding dimension compatibility with Chroma collections.
  - What breaks without it: Dimension mismatches, unexpected semantic shifts, unpinned cost/rate limits causing outages.

- Technology: JSON Schema (embedding metadata manifest)
  - Concept: Schema for embedding metadata manifests and validation rules
  - Official source: https://json-schema.org/specification.html (recommend pin: 2020-12)
  - Exact version requirement: 2020-12
  - Why required: Provides authoritative validation language for manifests used by ingestion, CI, and integration-checker.
  - Decision it informs: Field types, required keys, stable key names and validation tooling.
  - What breaks without it: Divergent manifest formats, unreliable indexing, CI validation gaps.

- Technology: Retrieval-Augmented Generation (RAG) design guidance
  - Concept: Retrieval constraints, re-ranking heuristics, grounding policies to avoid hallucination
  - Official source: Provider and industry guides (e.g., Pinecone RAG guide — https://www.pinecone.io/learn/rag/; LangChain retrieval docs — https://langchain.readthedocs.io/) — chosen guide must be pinned
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines acceptable max retrieved tokens, re-ranking rules, and source-grounding policies used by planner and integration-checker.
  - Decision it informs: Retrieval limits, re-ranking algorithms, grounding policy for generated content.
  - What breaks without it: Hallucinations, unbounded context sizes, inconsistent grounding across consumers.

---

### D5_Prompt System — REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Manifest and prompt-template schema for prompt storage and validation
  - Official source: https://json-schema.org
  - Exact version requirement: 2020-12
  - Why required: Defines the canonical schema used to validate prompt manifests and generated outputs
  - Decision it informs: Schema design, validation, and codegen for manifest consumers
  - What breaks without it: Incompatible manifests, divergent enforcement, unsafe/ambiguous validation

- Technology: LLM Provider Prompting & Token Limits (example: OpenAI)
  - Concept: Provider-specific prompt formatting, max token semantics, and response shaping
  - Official source: https://platform.openai.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines `max_tokens` calculations, token-counting behavior, and safe request shapes
  - Decision it informs: Token caps in templates, truncation/priority rules, provider fallbacks
  - What breaks without it: Incorrect token caps, unexpected truncation, over-budget requests

- Technology: Tokenization / Token-counting (tiktoken or provider tokenizer)
  - Concept: Accurate tokenization rules for measuring prompt and response size
  - Official source: https://github.com/openai/tiktoken (or provider-specific tokenizer docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps `max_tokens` manifest fields to deterministic byte/token budgets
  - Decision it informs: Per-template `max_tokens` and offline validation tooling
  - What breaks without it: Mismatched budgets, CI false-positives/negatives on length checks

- Technology: Semantic Versioning (SemVer)
  - Concept: Prompt template versioning policy
  - Official source: https://semver.org/spec/v2.0.0.html
  - Exact version requirement: 2.0.0
  - Why required: Consistent versioning for template upgrades and migration policies
  - Decision it informs: Backwards-compatibility rules, rollout, and regeneration decisions
  - What breaks without it: Unclear upgrade semantics and accidental breaking changes

---

### D6_Lesson Generation Engine — REQUIRED OFFICIAL DOCUMENTATION

- Technology: JSON Schema
  - Concept: Schema version & validation standard for Lesson JSON
  - Official source: https://json-schema.org
  - Exact version requirement: 2020-12 (RECOMMENDED) — MUST BE PINNED BEFORE SCHEMA FREEZE
  - Why required: Validator semantics (unevaluatedProperties, regexPattern) determine schema features used by generator and validator libraries
  - Decision it informs: Validator choice, codegen, cross-language compatibility
  - What breaks without it: Incompatible validators, silent acceptance/rejection of malformed lessons

- Technology: Vector DB / RAG (Chroma)
  - Concept: Vector store behavior and retrieval guarantees used by generation RAG pipeline
  - Official source: https://www.trychroma.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Retrieval semantics and embedding metadata shape prompt construction and grounding guarantees
  - Decision it informs: Retrieval window, chunking rules, metadata filtering
  - What breaks without it: Non-deterministic context, hallucinations, inconsistent grounding

- Technology: Prompting & Model Safety Guidance
  - Concept: Best practices for prompt instruction, grounding, and provenance capture (external model provider docs)
  - Official source: Provider docs (e.g., OpenAI embeddings/guides) — https://platform.openai.com/docs/guides/embeddings
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED
  - Why required: Enforces rate limits, provenance capture, and mitigations for instruction injection
  - Decision it informs: Prompt templates, max token budgets, provenance metadata
  - What breaks without it: Unsafe prompting, missing provenance, unbounded request costs

---

### D7_Validation & Review — REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema (validation)
   - Concept: Schema-driven validation for structural correctness
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Machine-checkable invariants referenced by validation rules.
   - Decision it informs: Which validation keywords are available to QA checks.
   - What breaks without it: Inconsistent validation and differing validator behaviors.

2. Technology: Test frameworks (unit + E2E)
   - Concept: Recommended testing runtimes and E2E tooling
   - Official sources: https://vitest.dev/ or https://jestjs.io/ and https://playwright.dev/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines how automated quality checks and E2E review flows will be executed in CI.
   - Decision it informs: Test harness choices for QA checks and CI gating.
   - What breaks without it: Non-deterministic test results and CI incompatibilities.

3. Technology: CI platform guidance
   - Concept: GitHub Actions / Turborepo CI runner pins and Node images
   - Official source: https://docs.github.com/en/actions
   - Exact version requirement: Node.js 20.x (see registry) and pinned action runners — MUST BE PINNED
   - Why required: Ensures QA checks run identically in PRs.
   - What breaks without it: Flaky CI and mismatched local/CI behavior.

---

### D8_Storage & Versioning — REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL (JSONB semantics)
  - Concept: JSONB storage, indexing, and JSON operators
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: PostgreSQL 18.1 (per registry)
  - Why required: Defines storage primitives for lesson metadata, indexing strategies, and migration patterns.
  - Decision informed: Choice between JSONB-first vs object-store-first designs, index strategy, and query performance trade-offs.
  - What breaks without it: Poorly performing queries or incompatible schema decisions.

- Technology: Object storage API (S3-compatible)
  - Concept: Blob storage semantics, lifecycle, multipart uploads
  - Official source: https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: If using object store for content, informs lifecycle and retention implementation.
  - What breaks without it: Incorrect storage setup, unexpected costs, or data loss on large uploads.

- Technology: Backup & Restore best practices
  - Concept: Backup frequency, point-in-time recovery, and restore testing
  - Official source: PostgreSQL backup docs and cloud provider guidance (pin specific provider docs)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures ability to recover immutable versions and meet retention requirements.
  - What breaks without it: Data loss, inability to rollback, or failed compliance audits.

- Technology: Data Retention & Compliance (legal guidance)
  - Concept: Retention windows, deletion/archival procedures, and legal holds
  - Official source: Organization legal policy or external compliance standards (GDPR, CCPA) — PIN REQUIRED
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Dictates retention, archival, and deletion behavior for lesson content.
  - What breaks without it: Non-compliance, legal risk, or conflicting retention behaviors.

---

### D9_Serving & Rendering — REQUIRED OFFICIAL DOCUMENTATION

- Technology: HTTP API Semantics (RFC 7231)
  - Concept: RESTful request/response semantics, status codes, caching headers
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Defines canonical HTTP behavior used by read API contracts (cache-control, conditional GETs, status codes).
  - Decision it informs: Endpoint status codes, caching headers, and error semantics.
  - What breaks without it: Inconsistent HTTP behaviors, cache-invalidations, and client-server mismatches.

- Technology: OpenAPI / API design guidance
  - Concept: API contract specification for discovered endpoints and example payloads
  - Official source: https://swagger.io/specification/
  - Exact version requirement: 3.0.x or 3.1.x (MUST BE PINNED BEFORE IMPLEMENTATION)
  - Why required: Enables machine-readable API docs, client generation, and integration-checker validation.
  - Decision it informs: Request/response shapes, error models, and example payloads.
  - What breaks without it: Divergent API implementations and missing integration tests.

- Technology: Next.js Rendering & Routing
  - Concept: App Router rendering model, server vs client components, streaming, ISR
  - Official source: https://nextjs.org/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides renderer decisions for `apps/lessons` and UI rendering contracts.
  - Decision it informs: SSR vs CSR selection, caching/ISR behavior, route patterns.
  - What breaks without it: Mismatched rendering assumptions and performance regressions.

- Technology: WCAG / Accessibility
  - Concept: Accessibility acceptance criteria for lesson rendering
  - Official source: https://www.w3.org/WAI/standards-guidelines/wcag/
  - Exact version requirement: WCAG 2.1 (MUST BE PINNED BEFORE IMPLEMENTATION)
  - Why required: Ensures lesson UI meets accessibility standards.
  - Decision it informs: UI metadata requirements, semantic markup, and review badges for authored vs AI content.
  - What breaks without it: Accessibility regressions and legal/compliance exposure.

- Technology: OAuth / Session & RBAC guidance
  - Concept: Token validation, session semantics, and claim mapping for ACLs
  - Official source: OAuth 2.0 (RFC 6749) / OpenID Connect
  - Exact version requirement: RFC 6749 / OpenID Connect Core 1.0
  - Why required: Defines how sessions/tokens map to roles/claims consumed by access-control rules.
  - Decision it informs: Token/session requirements for read endpoints and gating enforcement.
  - What breaks without it: Insecure gating, token misuse, or incorrect role mappings.

---

### D10_Blog System (Optional) — REQUIRED OFFICIAL DOCUMENTATION

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

---

### D11_Explicitly Out of Scope — REQUIRED OFFICIAL DOCUMENTATION

No external official documentation is required to support this "out of scope" decision. The orchestrator explicitly declares these capabilities excluded and no implementation, schema, or operational artifacts are needed while the decision stands.

