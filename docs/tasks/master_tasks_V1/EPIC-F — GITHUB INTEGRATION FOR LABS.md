# EPIC-F — GITHUB INTEGRATION FOR LABS

> Scope: **GitHub App, repositories, webhooks, push tracking, and enforcement for labs**.
> No verification logic, no preview rendering.
> This epic is **parallel-safe** with EPIC-A, EPIC-B, EPIC-C, EPIC-H.

---

## EPIC METADATA

- Epic ID: EPIC-F
- Parallel Group: GITHUB
- File Ownership:
  - services/github/\*\*
  - services/webhooks/\*\*

- Lock Policy: SOFT LOCK (policies stable, ops configurable)
- Blast Radius: ZONE

---

## FEATURE F1 — GitHub App Setup

1. Create Forgea GitHub App
2. Generate GitHub App private key
3. Store GitHub App ID securely
4. Configure webhook secret
5. Install GitHub App on Forgea organization
6. Restrict GitHub App permissions (repo, contents, webhooks)
7. Disable all unnecessary permissions

---

## FEATURE F2 — Repository Lifecycle Management

8. Design lab repository naming convention
9. Create private repository via GitHub App
10. Set Forgea organization as repository owner
11. Prevent public repository creation
12. Roll back repository creation on failure

---

## FEATURE F3 — Lab Template Injection

13. Copy broken lab source code into repository
14. Inject README.md with lab instructions
15. Inject locked test files
16. Inject `forgea.config.json`
17. Inject internal `.forgea/` metadata directory
18. Validate template integrity after injection

---

## FEATURE F4 — User Access Control

19. Add user as GitHub collaborator
20. Assign push-only permissions to user
21. Prevent admin-level permissions for users
22. Verify collaborator access successfully

---

## FEATURE F5 — Branch & Repository Protection

23. Protect default branch
24. Disable force push
25. Disable branch deletion
26. Prevent history rewrite
27. Lock protected file paths
28. Prevent editing of test directories
29. Prevent modification of `forgea.config.json`

---

## FEATURE F6 — Lab Session Binding

30. Create LabSession record in database
31. Link LabSession to user ID
32. Link LabSession to lab ID
33. Store GitHub repository URL
34. Set LabSession status to IN_PROGRESS

---

## FEATURE F7 — Webhook Handling

35. Create webhook endpoint in backend
36. Verify webhook signature (HMAC)
37. Handle push events only
38. Reject unsupported webhook event types
39. Extract commit SHA from webhook
40. Extract branch name
41. Extract author identity
42. Extract list of changed files

---

## FEATURE F8 — Push Tracking & Audit

43. Create LabAttempt record per push
44. Link LabAttempt to LabSession
45. Store commit SHA per attempt
46. Store changed file list
47. Store push timestamp
48. Store GitHub delivery ID
49. Write push event to AuditLog

---

## FEATURE F9 — Forbidden Change Detection

50. Detect modifications to locked paths
51. Detect deletion of test files
52. Detect modification of `forgea.config.json`
53. Detect force-push attempts
54. Fail lab session immediately on violation
55. Record violation reason

---

## FEATURE F10 — Step-Based Lab Support

56. Load step definitions from `.forgea/steps.json`
57. Map changed files to active lab step
58. Block progress if incorrect step is modified
59. Mark step as completed on valid push
60. Persist step completion state

---

## FEATURE F11 — Error Handling & Recovery

61. Handle GitHub API rate limits
62. Retry repository creation safely
63. Clean up repository on partial failure
64. Handle webhook delivery retries
65. Gracefully handle missing repositories

---

## FEATURE F12 — Internal Documentation

66. Document GitHub App permissions
67. Document repository lifecycle flow
68. Document webhook event flow
69. Document failure rollback scenarios

---

## EPIC-F COMPLETION CRITERIA

- GitHub App operational
- Repositories created and protected correctly
- Push events reliably tracked
- Forbidden changes blocked deterministically

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-F is marked DONE, the following are **SOFT LOCKED**:

- GitHub App permission set
- Webhook handling logic
- Repo protection policies

Breaking changes require explicit approval and regression testing.

---

# END OF EPIC-F
