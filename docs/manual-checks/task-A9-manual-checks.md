# Task A9 — Manual Checks

Date: 2026-02-06

## Checks

1. Open `/forgea-monorepo/.nvmrc` and confirm it contains `20.11.1`.
2. Open `/forgea-monorepo/package.json` and confirm `engines.node` is `>=20.11.0 <21`.
3. Open `/forgea-monorepo/.editorconfig` and confirm it includes:
   - `root = true`
   - `charset = utf-8`
   - `end_of_line = lf`
   - `insert_final_newline = true`
   - `trim_trailing_whitespace = true`
   - 2-space indentation for JS/TS/JSON/MD/YAML
4. Open `/forgea-monorepo/README.md` and confirm it links to `.nvmrc`, `.editorconfig`, and CONTRIBUTING.
5. Open `/forgea-monorepo/CONTRIBUTING.md` and confirm it references guardrails and points to the official docs.
6. Open `/docs/official-docs/node-version-policy.md` and confirm it references:
   - https://nodejs.org/en/about/releases/
   - https://github.com/nvm-sh/nvm
7. Open `/docs/official-docs/editorconfig.md` and confirm it references https://editorconfig.org.
8. Open `/docs/docs-gatekeeper/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A9_Developer Experience & Guardrails.md` and confirm it reflects completion/verification.
