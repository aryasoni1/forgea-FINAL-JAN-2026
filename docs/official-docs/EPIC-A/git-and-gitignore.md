---
doc_id: git-gitignore-policy
tool: Git
version_pinned: false
change_sensitivity: LOW
lifecycle: ACTIVE
---

# Git — Ignore Policy (.gitignore)

## Purpose

Governs the exclusion of files from version control to prevent the leakage of secrets, build artifacts, dependencies, and local environment configurations.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: Repository-level `.gitignore` files, local exclude files (`.git/info/exclude`), and global user configurations (`~/.config/git/ignore`).
- Does NOT apply to: Branching strategies or commit message conventions.

## Official Sources (Binding)

- gitignore.md

## Evidence Coverage Matrix

| Policy Area              | Source URL   | Version Covered | Status  |
| ------------------------ | ------------ | --------------- | ------- |
| Ignore Mechanics         | gitignore.md | General         | COVERED |
| Node.js / Turbo Template | gitignore.md | Undefined       | COVERED |
| API Retrieval            | gitignore.md | API v2022-11-28 | COVERED |
| Removal of Tracked Files | gitignore.md | General         | COVERED |

## Version & Compatibility

- **Tool version:** BLOCKED – SOURCE AMBIGUOUS (Source specifies GitHub API versions, not Git binary versions).
- **Related tooling compatibility:**
  - **GitHub API:** `2022-11-28` supported for fetching templates.

## Canonical Rules (Non-Negotiable)

- **Root Configuration:** The primary ignore file MUST be named `.gitignore` and located in the repository root.
- **Shared vs. Local Rules:**
  - Rules intended for all collaborators MUST be committed in `.gitignore`.
  - Rules intended ONLY for the local machine (not shared) MUST be placed in `.git/info/exclude` inside the repository OR `~/.config/git/ignore` for all repositories on the computer.
- **Retroactive Ignore:** If a file is already tracked, adding it to `.gitignore` is insufficient. The file MUST be explicitly untracked using `git rm --cached FILENAME` and the change committed.
- **Node.js Ecosystem Constraints:**
  - **Dependencies:** `node_modules/`, `jspm_packages/`, and `web_modules/` MUST be ignored.
  - **Build Artifacts:** `dist`, `out`, `build/Release`, `.next`, `.nuxt`, `.vuepress/dist`, and `.docusaurus` MUST be ignored.
  - **Logs:** `*.log`, `npm-debug.log*`, `yarn-debug.log*`, `lerna-debug.log*` MUST be ignored.
  - **Runtime/Coverage:** `pids`, `*.pid`, `coverage`, `.nyc_output` MUST be ignored.
  - **Caches:** `.npm`, `.eslintcache`, `.stylelintcache`, `*.tsbuildinfo`, `.cache`, `.parcel-cache` MUST be ignored.
- **Monorepo/Tooling Constraints:**
  - **Turborepo:** `.turbo` (task cache) MUST be ignored.
  - **Yarn v2:** `.yarn/cache`, `.yarn/unplugged`, `.yarn/build-state.yml`, `.yarn/install-state.gz`, and `.pnp.*` MUST be ignored.
- **Environment Secrets:** `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, and `.env.production.local` MUST be ignored.

## Prohibited Configurations

- ❌ **Committing Environment Files:** `.env` and `*.local` variant files are strictly prohibited in version control.
- ❌ **Committing Dependencies:** `node_modules` folders are prohibited.
- ❌ **Committing Build Outputs:** Directories like `.next` (Next.js) or `dist` are prohibited.
- ❌ **Committing Editor Metadata:** `.vscode-test` and `.tern-port` are prohibited.

## Enforcement

- **Git Behavior:**
  - Files matching patterns in `.gitignore` are excluded from `git status` and `git add`.
  - `git check-ignore -v <file>` verifies if a file is ignored.
- **API Template Generation:**
  - Templates can be retrieved via `GET /gitignore/templates/{name}` (e.g., `Node`, `Turbo`).
  - API requests accept `application/vnd.github+json` or `application/vnd.github.raw+json`.

## Failure Modes

- **Tracked Ignored Files:** If a file was committed _before_ being added to `.gitignore`, Git continues to track changes to it until explicitly removed from the index.
- **Sensitive Data Leak:** Failure to ignore `.env` files results in secrets being committed to history, requiring immediate credential rotation and history rewriting.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-version-policy.md` (Implies Node environment context).
  - `/docs/official-docs/turborepo.md` (Implies Turbo caching context).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `file` == `node_modules`, `status` = IGNORED.
- If `file` == `.env`, `status` = IGNORED.
- If `file` == `.turbo`, `status` = IGNORED.
- If `file` == `package-lock.json`, `status` = TRACKED (Not listed in ignore sources).

## Verification Checklist

- [ ] `.gitignore` exists in repo root.
- [ ] `node_modules/` is present in `.gitignore`.
- [ ] `.env` is present in `.gitignore`.
- [ ] `.turbo` is present in `.gitignore`.
- [ ] No build artifacts (`dist`, `.next`) are present in the remote repository.

## Non-Decisions

- This document does not define ignore rules for languages other than Node.js, C, C++, or general OS templates mentioned in the source.

## Notes

- The provided source contains a specific composite template for "Node" and "Turbo" generated via `gitignore.io` (Toptal).
- Next.js build output includes `.next` and `out`.
