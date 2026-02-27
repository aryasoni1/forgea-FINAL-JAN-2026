# Official Docs Registry Additions — EPIC-D Prompt System

Add these entries to `/docs/official-docs-registry.md` under a suitable EPIC-D section.

## Prompting & Tokenization (EPIC-D)

### LLM Provider Prompting & Token Limits (example: OpenAI)

- Technology: LLM provider prompting and request limits
- Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Official source: https://platform.openai.com/docs
- Used for: Token budget calculations, request/response shaping, and provider-specific prompt constraints used by the prompt manifest
- Internal doc: /docs/official-docs/EPIC-D/prompt-operational-guidelines.md (REQUIRED)
- Status: REQUIRED

### Tokenization / Token-counting (tiktoken or provider tokenizer)

- Technology: Tokenizer / token-counting rules
- Version: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Official source: https://github.com/openai/tiktoken (or provider tokenizer docs)
- Used for: Deterministic token counting in CI and runtime to enforce `max_tokens` in manifest templates
- Internal doc: /docs/official-docs/EPIC-D/prompt-operational-guidelines.md (REQUIRED)
- Status: REQUIRED

### Semantic Versioning (SemVer)

- Technology: Semantic Versioning
- Version: 2.0.0
- Official source: https://semver.org/spec/v2.0.0.html
- Used for: Prompt template versioning and compatibility decisions
- Internal doc: /docs/official-docs/EPIC-D/prompt-manifest.md (REQUIRED)
- Status: VERIFIED
