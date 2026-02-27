# dotenv

- Category: Tooling
- Epics: A, J
- Version / Requirement: Pin required
- Intent / Critical Decision: Local environment variable loading semantics.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A8 Environment & Safety)
- EPIC-A intent: Standardize local `.env` loading behavior for developer workflows; recommend pinned `dotenv` (16.4.x) if used.
- Important points: Document loading order, `.env.example` policy, and ensure `dotenv` is not bundled into client code; prefer secret manager for CI/prod.
