# EPIC-B — DATABASE CORE & HARDENING

> Scope: **Data foundation, integrity, and trust enforcement only**.
> No UI, no GitHub, no labs execution logic.
> This epic is **parallel-safe** with Monorepo, Auth, and Lesson UX.

---

## EPIC METADATA

- Epic ID: EPIC-B
- Parallel Group: DB_CORE
- File Ownership:
  - prisma/\*\*
  - services/db/\*\*
  - packages/audit/\*\*

- Lock Policy: HARD LOCK after completion (schema + triggers)
- Blast Radius: SYSTEM during execution, NONE after lock

---

## FEATURE B1 — Database Setup

1. Choose PostgreSQL as primary database
2. Set database timezone to UTC
3. Enable UUID extension in PostgreSQL
4. Create separate databases for dev and prod
5. Verify database connectivity locally

---

## FEATURE B2 — Prisma Setup & Migrations

6. Initialize Prisma in repo
7. Configure Prisma to connect to PostgreSQL
8. Generate Prisma client
9. Set up migration workflow (migrate dev)
10. Verify Prisma client works with database

---

## FEATURE B3 — Identity & Authentication Tables

11. Create `User` table

12. Add unique constraint on user email

13. Add `role` enum (ADMIN, USER, RECRUITER)

14. Add `authProvider` enum (EMAIL, GOOGLE, GITHUB)

15. Add timestamps to User table

16. Create `AuthSession` table

17. Link AuthSession to User via foreign key

18. Add session expiry logic

19. Create `AuthIdentity` table

20. Link AuthIdentity to User

21. Support multiple auth providers per user

22. Enforce provider + providerUserId uniqueness

---

## FEATURE B4 — Lesson System Tables

23. Create `Lesson` table

24. Add unique `slug` to Lesson

25. Add difficulty enum to Lesson

26. Add status enum (DRAFT, PUBLISHED)

27. Add JSON `content` column for lesson body

28. Add timestamps to Lesson

29. Create `LessonVersion` table

30. Store immutable content snapshot in JSON

31. Link LessonVersion to Lesson

32. Enforce version ordering

---

## FEATURE B5 — Lab System Tables

33. Create `Lab` table

34. Add unique `slug` to Lab

35. Add difficulty field

36. Add estimated time field

37. Add JSON `config` column for lab definition

38. Add timestamps to Lab

39. Create `LabVersion` table

40. Store immutable lab config snapshot

41. Add version number to LabVersion

42. Link LabVersion to Lab

---

## FEATURE B6 — User Execution & Attempts

43. Create `LabSession` table

44. Link LabSession to User

45. Link LabSession to LabVersion

46. Add status enum (IN_PROGRESS, VERIFIED_PASS, FAILED)

47. Add start and completion timestamps

48. Create `VerificationAttempt` table

49. Link VerificationAttempt to LabSession

50. Store commit SHA for each attempt

51. Store verification result (PASS, FAIL)

52. Store logs as JSON

53. Add created timestamp

---

## FEATURE B7 — Proof & Evidence Storage

54. Create `ProofArtifact` table
55. Link ProofArtifact to VerificationAttempt
56. Add artifact type enum (LOG, DIFF, SCREENSHOT)
57. Store artifact location (path or URL)
58. Add created timestamp

---

## FEATURE B8 — GitHub Mapping Tables

59. Create `GitHubAccount` table

60. Link GitHubAccount to User

61. Store GitHub user ID and username

62. Create `GitHubRepoMapping` table

63. Link repo mapping to LabSession

64. Store repo URL and default branch

---

## FEATURE B9 — Admin & Control Tables

65. Create `AuditLog` table

66. Store actor ID, action, entity, metadata

67. Add created timestamp to AuditLog

68. Create `FeatureFlag` table

69. Add unique key for feature flag

70. Add enabled / disabled state

---

## FEATURE B10 — Billing (Minimal MVP)

71. Create `Subscription` table
72. Link Subscription to User
73. Add plan enum (FREE, PAID)
74. Add subscription status
75. Add created timestamp

---

# 🔒 DB HARDENING — TRUST & SAFETY

## FEATURE B11 — Immutability Enforcement (CRITICAL)

76. Design PostgreSQL trigger logic for immutability
77. Write trigger to block UPDATE on AuditLog
78. Write trigger to block DELETE on AuditLog
79. Write trigger to block UPDATE on ProofArtifact
80. Write trigger to block DELETE on ProofArtifact
81. Write trigger to block UPDATE on VerificationAttempt
82. Write trigger to block DELETE on VerificationAttempt

---

## FEATURE B12 — Audit Infrastructure

83. Create shared audit logging utility (`packages/audit`)
84. Standardize audit event format (actor, action, context)
85. Ensure all critical actions write to AuditLog

---

## FEATURE B13 — Environment Safety

86. Separate dev and prod database credentials
87. Ensure prod DB credentials are restricted
88. Add env config validation for DATABASE_URL

---

## FEATURE B14 — Retention & Cost Controls

89. Design retention rules for old audit data
90. Implement cold storage move for old proof artifacts
91. Preserve proof hash in main DB after archival
92. Add cost tracking column to LabSession
93. Add trigger to calculate compute cost per session
94. Store cost metadata for monitoring

---

## FEATURE B15 — Testing & Verification

95. Test immutability triggers manually via SQL
96. Verify UPDATE fails on immutable tables
97. Verify DELETE fails on immutable tables
98. Test normal INSERT operations still work
99. Add monitoring / logging for trigger failures
100.  Document trigger patterns and rules

---

## EPIC-B COMPLETION CRITERIA

- All 100 tasks completed
- Schema and triggers locked
- Immutable tables cannot be mutated by any path
- Prisma migrations reflect final schema

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-B is marked DONE, the following are **LOCKED**:

- `prisma/schema.prisma`
- All DB triggers
- AuditLog, ProofArtifact, VerificationAttempt tables

Any modification requires explicit lock override approval.

---

# END OF EPIC-B
