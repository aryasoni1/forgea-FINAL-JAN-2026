# EPIC-C — AUTHENTICATION & RBAC

> Scope: **Identity, sessions, authorization, and access control only**.
> No lab logic, no GitHub automation, no verification engine.
> This epic is **parallel-safe** with EPIC-A (Monorepo), EPIC-B (DB), and EPIC-H (Lesson UX).

---

## EPIC METADATA

- Epic ID: EPIC-C
- Parallel Group: AUTH
- File Ownership:
  - services/auth/\*\*
  - middleware/auth.ts
  - auth configuration files

- Lock Policy: SOFT LOCK after completion (logic stable, config adjustable)
- Blast Radius: ZONE

---

## FEATURE C1 — Auth Foundation

1. Decide authentication approach (Auth.js / NextAuth)
2. Document auth decision and scope
3. Install authentication dependencies
4. Lock auth-related package versions

---

## FEATURE C2 — User & Identity Readiness

5. Verify `User` table exists
6. Ensure `User.id` is primary key
7. Ensure `User.email` is unique
8. Ensure `User.name` field exists
9. Ensure `User.image` field exists
10. Ensure `User.role` field exists
11. Ensure user timestamps exist

---

## FEATURE C3 — OAuth Providers

12. Configure GitHub OAuth app

13. Add GitHub client ID & secret to env

14. Configure GitHub provider in auth config

15. Limit GitHub OAuth scopes

16. Configure Google OAuth app

17. Add Google client ID & secret to env

18. Configure Google provider in auth config

19. Enforce verified email from Google

20. (Optional) Configure Email/Password provider

21. Securely hash passwords if enabled

22. Disable email login in UI by default

---

## FEATURE C4 — User Provisioning Logic

23. Auto-create user on first login
24. Assign default role on signup
25. Sync user name on every login
26. Sync user avatar on every login
27. Prevent role overwrite on re-login

---

## FEATURE C5 — Session Management

28. Choose DB-backed session strategy
29. Verify `Session` table exists
30. Link Session to User via FK
31. Configure secure cookies (HttpOnly)
32. Enable secure cookies in production
33. Configure SameSite policy
34. Set session idle timeout
35. Set session absolute expiry
36. Prevent infinite sessions

---

## FEATURE C6 — Authorization (RBAC)

37. Define role enum (FREE, PAID, ADMIN, RECRUITER)
38. Store role in database (not hardcoded)
39. Inject user ID into session object
40. Inject role into session object
41. Create centralized authorization helper
42. Default authorization behavior = deny

---

## FEATURE C7 — Route Protection

43. Add authentication middleware
44. Protect `/workspace/*` routes
45. Protect `/admin/*` routes
46. Allow public access to marketing pages
47. Enforce ADMIN-only access to admin routes
48. Enforce recruiter read-only access

---

## FEATURE C8 — API Security

49. Wrap protected API routes with auth check
50. Validate active session for API access
51. Validate user role in APIs
52. Enable CSRF protection on auth routes

---

## FEATURE C9 — Audit & Logging

53. Log successful login events
54. Log failed login attempts
55. Log logout events
56. Store provider info in audit logs
57. Log role change events
58. Ensure audit logs are immutable

---

## FEATURE C10 — UI (Auth Flows)

59. Create login page
60. Add GitHub login button
61. Add Google login button
62. Hide email login option by default
63. Create logout button
64. Clear session on logout
65. Redirect user after logout
66. Display friendly auth error messages

---

## FEATURE C11 — Safety & Edge Cases

67. Handle session refresh correctly
68. Prevent stale role usage
69. Handle deleted user sessions
70. Force logout for deleted users
71. Allow multiple concurrent sessions
72. Prepare for future session revocation

---

## FEATURE C12 — Testing & Verification

73. Test GitHub login flow
74. Test Google login flow
75. Test logout flow
76. Test session persistence on refresh
77. Test admin route protection
78. Test recruiter access restrictions
79. Test API authorization failures

---

## FEATURE C13 — Documentation

80. Document auth architecture
81. Document supported providers
82. Document session model
83. Document role model
84. Document auth security assumptions
85. Document known limitations

---

## EPIC-C COMPLETION CRITERIA

- All 85 tasks completed
- Auth flows work end-to-end
- RBAC enforced at UI and API layers
- Sessions cannot bypass expiry or role checks

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-C is marked DONE, the following are **SOFT LOCKED**:

- Auth provider configuration
- Session handling logic
- RBAC helpers

Breaking changes require explicit approval and regression testing.

---

# END OF EPIC-C
