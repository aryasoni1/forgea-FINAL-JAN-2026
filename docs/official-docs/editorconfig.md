---
doc_id: editorconfig
tool: EditorConfig
version_pinned: true
change_sensitivity: MEDIUM
lifecycle: ACTIVE
---

# EditorConfig — Formatting Baseline

## Purpose

Defines the canonical `.editorconfig` used by Forgea to normalize editor defaults (charset, line endings, whitespace).

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official specification
- Version status: SPEC REFERENCE (https://editorconfig.org)

## Official Sources (Binding)

- https://editorconfig.org

## Canonical Configuration

The repository root contains `/forgea-monorepo/.editorconfig` with the following minimum baseline:

- `root = true`
- `charset = utf-8`
- `end_of_line = lf`
- `insert_final_newline = true`
- `trim_trailing_whitespace = true`
- `indent_style = space` and `indent_size = 2` for JS/TS/JSON/MD/YAML

## Scope

- Applies to all contributors and supported editors.
- This does not replace Prettier or ESLint; it only defines editor defaults.

## References

- https://editorconfig.org
