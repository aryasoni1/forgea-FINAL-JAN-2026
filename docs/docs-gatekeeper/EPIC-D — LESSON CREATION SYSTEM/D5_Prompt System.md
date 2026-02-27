### FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: H5 — Prompt System
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md
  - /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md
  - /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

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

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains orchestrator-level plan and agent prompts but no canonical `prompts/` manifest schema or storage path; does not pin provider/tokenizer versions.

- Doc path: /docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md
  - Coverage status: PARTIAL
  - Exact gaps: Good repo survey and risk notes; missing manifest files, migrations, QA tests, and canonical storage location decision.

- Doc path: /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD
  - Coverage status: SUFFICIENT
  - Exact gaps: Defines D5 in scope and acceptance criteria; does not specify manifest fields or storage paths (not expected to).

- Doc path: forgea-monorepo/services/content-engine/README.md
  - Coverage status: INSUFFICIENT
  - Exact gaps: Service README states Python isolation; no prompt manifest, enforcement, or integration guidance.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend (minimum):
- `/docs/official-docs/EPIC-D/prompt-manifest.md` — required: canonical manifest schema, example templates, and storage path.
- `/docs/official-docs/EPIC-D/prompt-operational-guidelines.md` — required: token-budgeting rules, grounding policy, failure modes, and QA validation checklist.

Rationale: Orchestrator + code-scout provide intent and risk analysis, and the EPIC task file defines scope; however a canonical manifest schema and pinned external references are required before implementers can safely produce code.

### STUDY GUIDE FOR HUMAN

- LLM Provider Prompting & Token Limits:
  - Why: Grounds template `max_tokens` to real provider limits.
  - Alternatives: Use a single internal budget heuristic (less accurate); provider docs are preferred.
  - When NOT to use: When using an offline deterministic model where tokenization differs (pin provider/tokenizer instead).
  - Common mistakes: Assuming characters ~= tokens; not accounting for tokenizer differences across models.

- Tokenization (tiktoken):
  - Why: Deterministic token counts for CI and runtime checks.
  - Alternatives: Conservative character-based caps (coarse, wasteful).
  - When NOT to use: When provider supplies a different tokenizer — instead pin provider tokenizer.
  - Common mistakes: Using inconsistent tokenizer versions between CI and runtime.

- JSON Schema (manifest):
  - Why: Machine-validate prompt templates and enable codegen.
  - Alternatives: Ad-hoc YAML/MD manifests (error-prone).
  - When NOT to use: Never — use a schema for production manifests.
  - Common mistakes: Overly permissive schemas that fail to catch missing grounding flags.

- SemVer:
  - Why: Signal breaking vs non-breaking template changes.
  - Alternatives: Date-based versions (less informative about compatibility).
  - When NOT to use: Throwaway prototypes — but adopt SemVer once templates are consumed.
  - Common mistakes: Bumping major versions for vendor-only wording changes.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-D/prompt-manifest.md
  - Purpose: Canonical prompt manifest schema and examples.
  - Exact knowledge to add:
    - JSON Schema v2020-12 for prompt entries
    - Required fields: `id`, `version` (semver), `section`, `max_tokens`, `grounding_required`, `source_policy`, `anti_hallucination_rules`
    - Storage path recommendation: `services/lessons/generation/prompts/` (or document canonical alternative)
    - Example manifest with 3 section templates
  - Required version pin: JSON Schema 2020-12

- Path: /docs/official-docs/EPIC-D/prompt-operational-guidelines.md
  - Purpose: Enforcement and QA policy for prompt templates
  - Exact knowledge to add:
    - Token budgeting and tokenizer reference (explicit provider + tokenizer version)
    - Grounding policy and required citation format
    - Failure modes (what to do when grounding absent) and whitelist policy
    - QA tests: length checks, grounding presence, hallucination detection heuristics
  - Required version pin: Provider docs + tokenizer docs (MUST be pinned inside this doc)

### OPEN QUESTIONS / AMBIGUITIES

- Canonical storage location: `services/lessons/generation/` (monorepo Node) vs `services/content-engine/` (Python). Decision required before implementer work.
- Primary LLM provider and tokenizer to target (OpenAI, Anthropic, local Llama variant) — pin provider and tokenizer versions before templating.
- Grounding source format: expected citation metadata format (URL + anchor + excerpt) — recommend standardizing in manifest.

### MASTER DOCS REGISTRY ACTION

Append entries to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-D / D5 — Prompt System
  - Doc path: /docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/H5_Prompt System.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for prompt templates and operational guidance.

Append required internal-doc entry to `/docs/master_docs.md`:

  - Date: 2026-02-14
    - Epic / Feature: EPIC-D / D5 — Prompt System
    - Doc path: /docs/official-docs/EPIC-D/prompt-manifest.md
    - Status: REQUIRED
    - Reason: Canonical prompt manifest schema and examples required before implementer work.

---

END OF BRIEF
