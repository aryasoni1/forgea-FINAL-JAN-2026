# Task A9 — Test Plan

## Scope

Verify the presence and correctness of developer experience guardrails and documentation introduced in Task A9.

## Happy Paths

- `.nvmrc` exists and contains `20.11.1`.
- `.editorconfig` exists and contains the agreed hygiene settings.
- `package.json` includes `engines.node` set to `>=20.11.0 <21`.
- README and CONTRIBUTING link to the guardrail docs and repo-level configs.
- `/docs/official-docs/node-version-policy.md` and `/docs/official-docs/editorconfig.md` exist and reference official sources.
- Docs Gatekeeper A9 brief shows completion/verification status.

## Failure Cases

- `.nvmrc` missing or contains a different Node version.
- `.editorconfig` missing or lacks required hygiene entries.
- `package.json` missing `engines.node` or uses a different range.
- README/CONTRIBUTING do not link to `.nvmrc`, `.editorconfig`, or the official docs.
- Official docs omit the required official source URLs.

## Abuse / Bypass Cases

- Attempt to use a Node version outside `>=20.11.0 <21`.
- Attempt to bypass `.editorconfig` by committing files with trailing whitespace or wrong indentation.

## Invariants

- No secrets are added to README/CONTRIBUTING.
- Files listed in `/.github/agents/implementer.md` remain untouched.
