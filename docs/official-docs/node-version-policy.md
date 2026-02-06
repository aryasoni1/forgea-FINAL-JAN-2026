---
doc_id: node-version-policy
tool: Node.js
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Node.js — Version Policy

## Purpose

Defines the canonical Node.js runtime for Forgea, how the version is pinned, and how contributors align their local environment.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (Node 20.11.1)

## Official Sources (Binding)

- Node.js Release Schedule: https://nodejs.org/en/about/releases/
- nvm (Node Version Manager): https://github.com/nvm-sh/nvm

## Policy

- **Required runtime:** Node.js 20.11.1.
- **Allowed range:** `>=20.11.0 <21.0.0`.
- **Local pin file:** `/forgea-monorepo/.nvmrc` MUST contain `20.11.1`.
- **Package engine:** `/forgea-monorepo/package.json` MUST declare `engines.node` as `>=20.11.0 <21`.

## Version Managers

- **Canonical:** `nvm` (reads `.nvmrc`).
- **Alternatives:** Volta or asdf MAY be used, but contributors MUST still align to 20.11.1 and the `engines.node` range.

## Rationale

- Matches `/docs/toolchain-versions.md` for the Node 20.11.x pin and the `>=20.11.0 <21` engine range.
- Ensures reproducible local development and CI/runtime parity.

## Enforcement (Non-Automated)

- Contributors should install the version from `.nvmrc`.
- CI enforcement is out of scope for this policy.

## References

- https://nodejs.org/en/about/releases/
- https://github.com/nvm-sh/nvm
