---
doc_id: repo-boundaries-ownership
tool: GitHub
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# GitHub — Repository Boundaries & Ownership

## Purpose

Governs the definition of code ownership, review requirements, and boundary enforcement within repositories using `CODEOWNERS` files and branch protection rules.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: `CODEOWNERS` file syntax, location, precedence logic, and integration with Pull Request review workflows.
- Does NOT apply to: General git permissions or organization-level roles unless bridged by ownership rules.

## Official Sources (Binding)

- github-codeowners-pattern-matching.md

## Evidence Coverage Matrix

| Policy Area                   | Source URL                            | Version Covered | Status  |
| ----------------------------- | ------------------------------------- | --------------- | ------- |
| File Location & Priority      | github-codeowners-pattern-matching.md | N/A             | COVERED |
| Syntax & Pattern Matching     | github-codeowners-pattern-matching.md | N/A             | COVERED |
| Ownership Assignment          | github-codeowners-pattern-matching.md | N/A             | COVERED |
| Branch Protection Integration | github-codeowners-pattern-matching.md | N/A             | COVERED |
| Limitations (Size/Syntax)     | github-codeowners-pattern-matching.md | N/A             | COVERED |

## Version & Compatibility

- **Tool version:** GitHub SaaS / Enterprise.
- **Plan Availability:**
  - **Public Repos:** Available on Free, Pro, Team, Enterprise.
  - **Private Repos:** Available on Pro, Team, Enterprise.

## Canonical Rules (Non-Negotiable)

- **File Location Precedence:** GitHub searches for the `CODEOWNERS` file in the following order, using the **first** one found:
  1. `.github/CODEOWNERS`
  2. `CODEOWNERS` (root)
  3. `docs/CODEOWNERS`.
- **Owner Permissions:** Users and teams listed as code owners MUST have explicit **write permissions** to the repository,.
- **Branch Specificity:** Each `CODEOWNERS` file applies only to the branch where it resides. Different branches may have different owners.
- **Precedence Logic:**
  - Rules are processed from top to bottom.
  - The **last matching pattern** determines the owner.
  - Inline comments (`#`) are supported.
- **Syntax constraints:**
  - Patterns follow `gitignore` rules generally, with specific exceptions.
  - Paths are **case-sensitive**.
  - Owners on the same line MUST be separated by spaces. If owners are split across lines for the same pattern, only the last line applies.
- **File Size Limit:** The `CODEOWNERS` file MUST be under **3 MB**. Files exceeding this limit are not loaded.

## Prohibited Configurations

- ❌ **Negation Patterns:** The use of `!` to negate a pattern is prohibited and does not work.
- ❌ **Character Ranges:** The use of `[ ]` to define character ranges is prohibited and does not work.
- ❌ **Escaping Comments:** Using `\` to escape a `#` (treating it as a pattern) is prohibited and does not work.
- ❌ **Managed User Emails:** You cannot use email addresses to refer to Managed User Accounts.
- ❌ **Implicit Team Access:** Teams MUST NOT be listed as owners if they do not have "visible" status and explicit write permissions.

## Enforcement

- **Review Requests:**
  - When a Pull Request modifies files with a defined owner, that owner is automatically requested for review.
  - Draft Pull Requests do NOT trigger automatic review requests.
- **Branch Protection:**
  - "Require review from Code Owners" enforces that at least one code owner MUST approve the PR before merging,.
  - Approval from _any_ of the listed owners for a file satisfies the requirement.
- **Syntax Validation:** Lines with invalid syntax are skipped silently during processing, though errors are highlighted in the UI or API.

## Failure Modes

- **Size Exceeded:** If the file exceeds 3 MB, **NO** code owner information is loaded; no reviews will be requested.
- **Invalid Owner:** If a listed user/team does not exist or lacks write access, no owner is assigned for that line.
- **Syntax Error:** Invalid lines are skipped; the file is processed as if those lines do not exist.
- **Fork Disconnect:** PRs from forks use the `CODEOWNERS` file from the _base_ branch (upstream). PRs where the base is within the fork use the fork's file, but notifications only trigger if owners have write access to the fork.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/git-and-gitignore.md` (Pattern syntax references `gitignore` rules).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `CODEOWNERS` path priority: `.github/` > `/` > `docs/`.
- If `file_size` > 3MB -> STATUS = INVALID.
- Pattern matching logic: `Last Match Wins`.
- If `syntax` contains `!` or `[` -> STATUS = INVALID (Ignored).
- `*` matches files in directory; `**` matches recursively,.

## Verification Checklist

- [ ] `CODEOWNERS` exists in a valid location (`.github/`, root, or `docs/`).
- [ ] All listed teams/users have `write` access.
- [ ] File size is under 3 MB.
- [ ] No negation (`!`) or range (`[]`) syntax is used.
- [ ] Critical paths (e.g., `.github/`) have assigned owners to prevent tampering.

## Non-Decisions

- This document does not define the specific team structure (e.g., `@org/frontend` vs `@org/backend`).
- This document does not mandate specific branch protection rules (e.g., "Require linear history").

## Notes

- To protect the `CODEOWNERS` file itself, define an owner for `.github/` or the file explicitly.
- Email addresses can be used for users if associated with their account, but not for Enterprise Managed Users.
- Renaming a file updates ownership only if the new path matches a pattern in the file.
