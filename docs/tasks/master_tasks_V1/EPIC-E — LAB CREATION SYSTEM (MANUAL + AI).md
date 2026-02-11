# EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)

> Scope: **Designing, generating, validating, versioning labs**.
> No GitHub ops, no verification runner internals, no preview hosting.
> This epic is **parallel-safe** with EPIC-A, EPIC-B, EPIC-C, EPIC-H.

---

## EPIC METADATA

- Epic ID: EPIC-E
- Parallel Group: LAB_CORE
- File Ownership:
  - packages/labs/\*\*
  - packages/lab-templates/\*\*
  - packages/lab-schema/\*\*

- Lock Policy: HARD LOCK (schema + published labs)
- Blast Radius: ZONE

---

## FEATURE E1 — Base SaaS & Template Setup

1. Build single base SaaS template (production-grade)
2. Freeze base SaaS structure as lab source
3. Identify safe editable code surfaces
4. Identify non-editable core IP surfaces
5. Create lab template cloning mechanism

---

## FEATURE E2 — Canonical Lab Definition (Manual)

6. Define canonical Lab schema (v1)
7. Assign unique lab ID
8. Assign lab version
9. Define lab difficulty
10. Define estimated completion time
11. Enforce single primary concept per lab
12. Define expected failure symptom
13. Define success criteria
14. Define allowed file paths
15. Define forbidden file paths

---

## FEATURE E3 — Failure Design & Constraints

16. Define allowed failure types
17. Define forbidden failure types
18. Map failure type to expected symptom
19. Ensure deterministic failure reproduction
20. Ensure failure surface is observable
21. Prevent multi-root-cause failures

---

## FEATURE E4 — Repo & Code Surface Rules

22. Define base lab repository source
23. Validate lab repo template integrity
24. Prevent exposure of core IP files
25. Enforce editable vs locked paths
26. Enforce forbidden paths

---

## FEATURE E5 — Step-Based Lab Design (Optional)

27. Define step structure
28. Define step order and dependencies
29. Map steps to allowed file paths
30. Enforce step order progression
31. Prevent future-step file edits
32. Validate step completion deterministically

---

## FEATURE E6 — Verification Design (Lab-Level)

33. Define verification strategy (tests / runtime / diff)
34. Define verification entry command
35. Define pass criteria
36. Define fail criteria
37. Define forbidden solution patterns
38. Ensure verification determinism
39. Ensure verification cannot be bypassed
40. Bind verification to commit SHA

---

## FEATURE E7 — Snapshot & Preview Planning (Lab-Side)

41. Define broken snapshot behavior
42. Define fixed snapshot behavior
43. Ensure snapshot reflects user code changes
44. Ensure snapshot determinism
45. Ensure preview does not expose secrets or backend

---

## FEATURE E8 — AI-Assisted Lab Generation

46. Define AI-allowed lab fields
47. Define AI-forbidden lab fields
48. Generate broken code via AI (scoped)
49. Validate AI output against lab schema
50. Reject AI output on schema violation
51. Reject AI output on difficulty drift
52. Reject AI output on failure-type drift
53. Prevent AI from modifying tests or config
54. Require human review for AI-generated labs

---

## FEATURE E9 — forgea.config.json Management

55. Generate forgea.config.json per lab
56. Validate config before lab activation
57. Lock forgea.config.json after publish
58. Reject lab execution on config mismatch

---

## FEATURE E10 — Versioning & Immutability

59. Assign lab version on publish
60. Freeze published lab definition
61. Prevent mutation of published labs
62. Allow new lab versions via duplication only
63. Preserve old lab attempts and proofs

---

## FEATURE E11 — Quality & Review

64. Add manual review checkpoint before publish
65. Validate lab solvable within estimated time
66. Validate lab difficulty matches target level
67. Validate clarity (symptom → fix path)
68. Validate lab does not require external knowledge

---

## FEATURE E12 — Storage & Organization

69. Store lab metadata in database
70. Store lab definition JSON separately
71. Link lab to concept spine
72. Link lab to lesson context
73. Track lab usage metrics

---

## FEATURE E13 — Regression Safety

74. Re-run verification on lab edits
75. Rebuild snapshots on lab updates
76. Ensure old lab attempts remain valid
77. Prevent breaking active user sessions

---

## EPIC-E COMPLETION CRITERIA

- All lab schemas frozen
- Labs reproducible and deterministic
- Published labs immutable
- AI-generated labs fully constrained

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-E is marked DONE, the following are **HARD LOCKED**:

- Lab schema v1
- Published lab definitions
- forgea.config.json rules

Changes require explicit override approval and regression checks.

---

# END OF EPIC-E
