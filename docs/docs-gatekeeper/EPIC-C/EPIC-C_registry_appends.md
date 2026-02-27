This file contains the exact registry entries that should be appended to the two registries.

1. Master Docs Registry append (already applied):

```
- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C2 — User Identity Readiness
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C2_User_Identity_Readiness.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for user identity schema and session model.
```

2. Official Docs Registry entries to append (please append these to `/docs/official-docs-registry.md` under a sensible section):

```
## 🔐 EPIC-C — Authentication & RBAC (Internal docs required)

- **Internal doc:** /docs/official-docs/EPIC-C/nextauth_official.md
  - **Technology:** next-auth / Auth.js adapter guidance
  - **Exact version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - **Official source:** https://next-auth.js.org/ and https://authjs.dev/
  - **Feature usage:** `EPIC-C / C2_User_Identity_Readiness` — guides adapter-table mapping and session model choices
  - **Status:** REQUIRED

- **Internal doc:** /docs/official-docs/EPIC-C/user-data-model-policy.md
  - **Technology:** Data-model policy (Prisma + PostgreSQL)
  - **Exact version:** references Prisma 7.3.0 and PostgreSQL 18.1 in header
  - **Official source:** https://www.prisma.io/docs and https://www.postgresql.org/docs/
  - **Feature usage:** `EPIC-C / C2_User_Identity_Readiness` — defines required/optional user fields, NULL/NOT NULL, UNIQUE, length limits, and recommended CHECK constraints
  - **Status:** REQUIRED
```

Notes:

- I attempted to update `/docs/official-docs-registry.md` programmatically, but the edit failed; please append the above block to the registry. The master registry append for EPIC-C was applied.
