# v1 — Unkillable MVP Scope

## Non-Negotiable Constraints

- **Single Role Focus:** Frontend Engineer (React) ONLY.
- **No Learning Features:** No courses, videos, quizzes, or tutorials.
- **No Gamification:** No XP, leaderboards, streaks, or badges.
- **No B2B Tools:** No Recruiter Dashboards or Job Boards.
- **No Backend Verification:** Verification must be Browser-Only (Network Tab, Console, DOM) via Playwright.

## 1. The "Unkillable" Core (Must Ship)

- **Site A (App):**
  - Lab 001 (React Stale Closure) with "White Screen" reproduction gate.
  - "Jira-style" Ticket Dashboard (No course cards).
  - Browser-Only Verification Engine (Network/Console checks).
  - Resume Auto-Mapper (Hardcoded bullet generation).
  - Drop-Off Recovery (Stuck Detection > 12 mins).

- **Site B (Marketing):**
  - 1 Roadmap (Frontend).
  - 3-Layer Lesson Pages (Hook -> Confidence Trap -> Lab Link).
  - "Confidence Trap" Widget.

## 2. The "Stop State" (15-Day Target)

Exact success criteria to consider v1 complete:

- User lands on Site B, fails a "Confidence Trap".
- User transitions to Site A, authenticates via GitHub.
- User accepts "P0 Ticket" (Lab 001).
- User forks repo, reproduces bug (White Screen), fixes it locally.
- System verifies fix via Headless Browser (Pass/Fail).
- User receives 1 ATS-optimized resume bullet.

## 3. The "Kill List" (Explicit Non-Goals)

BANNED for v1:

- Backend Labs (Node.js/Docker crashes).
- Custom Lab Generation by AI Agents (Manual curation only).
- Payment Integration (Manual access/Free for v1).
- Enterprise SSO.
- Public Profiles (beyond simple Proof Page).

## 4. Technical Constraints

- Stack: Next.js (App), Astro (Marketing), Supabase/Postgres (DB).
- Repo: Monorepo (Turborepo).
- Verification: Deterministic (No LLM grading).
