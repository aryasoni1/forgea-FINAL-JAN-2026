# EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION

> Scope: **Foundation only**. No business logic, no auth, no DB, no labs.
> This epic is **parallel-safe** and should be completed first.

---

## EPIC METADATA

- Epic ID: EPIC-A
- Parallel Group: MONOREPO_CORE
- File Ownership:
  - repo root
  - apps/\*\*
  - packages/\*\*
  - services/\*\*
  - config files

- Lock Policy: HARD LOCK after completion
- Blast Radius: SYSTEM (during execution), NONE after lock

---

## FEATURE A1 — Repository & Structure

1. Initialize Git repository
2. Create root folders: `apps/`, `packages/`, `services/`
3. Define ownership rules for each root folder
4. Add root `README.md` explaining repo structure
5. Add `.gitignore` (Node + OS defaults)
6. Remove any dead / unused code from repo
7. Enforce “no cross-app imports” convention
8. Verify folder boundaries are respected

---

## FEATURE A2 — Package Manager & Workspace

9. Install pnpm globally
10. Create `pnpm-workspace.yaml`
11. Configure workspace paths:
    - `apps/*`
    - `packages/*`
    - `services/*`

12. Create root `package.json`
13. Set `"private": true`
14. Lock pnpm version using `packageManager` field
15. Add placeholder scripts section
16. Run `pnpm install` to validate workspace
17. Fix any workspace resolution errors

---

## FEATURE A3 — Turborepo Setup

18. Install Turborepo as dev dependency
19. Initialize Turborepo config
20. Create `turbo.json`
21. Define pipeline: `build`
22. Define pipeline: `dev`
23. Define pipeline: `lint`
24. Define pipeline: `test`
25. Enable local caching
26. Ensure dependency-aware task execution
27. Verify Turbo runs tasks in correct order
28. Run Turbo from root successfully

---

## FEATURE A4 — TypeScript Base Configuration

29. Create `tsconfig.base.json` at root
30. Enable `strict: true`
31. Enable `strictNullChecks`
32. Enable `noImplicitAny`
33. Disable `allowJs`
34. Set target to `ES2022`
35. Configure consistent module resolution
36. Add comments explaining major tsconfig options
37. Create per-app `tsconfig.json` extending base
38. Validate TypeScript builds successfully

---

## FEATURE A5 — ESLint (Minimal & Safe)

39. Install ESLint
40. Create base ESLint config at root
41. Enable rule: unused variables
42. Enable rule: undefined variables
43. Enable async-error detection rules
44. Disable style-only / opinionated rules
45. Create `.eslintignore`
46. Verify lint runs without blocking development

---

## FEATURE A6 — Prettier (Formatting Only)

47. Install Prettier
48. Create `.prettierrc`
49. Configure line width
50. Configure quotes
51. Configure trailing commas
52. Create `.prettierignore`
53. Ensure Prettier does not conflict with ESLint
54. Run Prettier successfully on repo

---

## FEATURE A7 — Scripts & Commands

55. Add root script: `dev`
56. Add root script: `build`
57. Add root script: `lint`
58. Add root script: `test`
59. Ensure scripts delegate to Turborepo
60. Verify scripts run only from root
61. Document scripts in README

---

## FEATURE A8 — Environment & Safety

62. Create `.env.example`
63. Add `.env` to `.gitignore`
64. Document required environment variables
65. Add placeholder env validation logic
66. Verify no secrets are committed
67. Separate dev vs prod environment assumptions

---

## FEATURE A9 — Developer Experience & Guardrails

68. Add Node version file (`.nvmrc` or equivalent)
69. Add `.editorconfig`
70. Document “How to start the repo” steps
71. Add “DO NOT TOUCH” note for infra files
72. Ensure clean clone → install → dev works
73. Perform cold-start test on fresh clone

---

## FEATURE A10 — Documentation & Architecture

74. Add architecture notes document
75. Document monorepo invariants
76. Document tooling decisions (pnpm, Turbo, TS)
77. Document folder conventions clearly

---

## FEATURE A11 — Verification & Quality Gates

78. Verify monorepo boots on new machine
79. Verify no circular dependencies
80. Verify workspace isolation
81. Verify lint + build pass together
82. Verify Turbo cache correctness

---

## EPIC-A COMPLETION CRITERIA

- All 82 tasks completed
- Monorepo boots cleanly from fresh clone
- No cross-app imports possible
- Tooling configs frozen and locked

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-A is marked DONE, the following are **LOCKED**:

- Root configuration files
- Workspace configuration
- Tooling configs (Turbo, TS, ESLint, Prettier)

Any future modification requires explicit lock override approval.

---

# END OF EPIC-A
