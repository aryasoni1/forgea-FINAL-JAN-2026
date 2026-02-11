# EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)

> Scope: **In-browser lab editing experience with strict filesystem abstraction, step-aware editing, and verification/preview feedback**.
> No GitHub operations, no verification execution.
> This epic is **parallel-safe** with all core epics.

---

## EPIC METADATA

- Epic ID: EPIC-K
- Parallel Group: LAB_UI
- File Ownership:
  - apps/lab-ui/\*\*
  - packages/virtual-fs/\*\*

- Lock Policy: SOFT LOCK (UX evolves, rules enforced)
- Blast Radius: ZONE

---

## FEATURE K1 — Session & Context Initialization

1. Load LabSession by sessionId
2. Validate session status = IN_PROGRESS
3. Fetch lab metadata
4. Fetch step definitions
5. Fetch `forgea.config.json`
6. Lock UI if session invalid or ended

---

## FEATURE K2 — Virtual File System (FS Abstraction)

7. Fetch full repo tree via backend
8. Apply hiddenPaths filtering
9. Apply readOnlyPaths marking
10. Apply editablePaths marking
11. Build virtual file tree structure
12. Cache virtual tree per session
13. Reject path traversal attempts
14. Block symlink resolution
15. Enforce file count limits
16. Enforce file size limits

---

## FEATURE K3 — File Tree UI

17. Render virtual file tree
18. Hide forbidden files completely
19. Visually mark read-only files
20. Disable selection of hidden paths
21. Highlight step-relevant files
22. Prevent rename into forbidden paths

---

## FEATURE K4 — Monaco Editor Integration

23. Initialize Monaco Editor
24. Configure language mode per file
25. Load file content on selection
26. Enable syntax highlighting
27. Disable terminal access
28. Disable extensions
29. Disable arbitrary filesystem writes
30. Enforce read-only mode for protected files

---

## FEATURE K5 — Edit Permission Enforcement

31. Validate edit permission on file open
32. Block edits on read-only files
33. Block edits on hidden paths
34. Validate path on save
35. Validate step-scoped file access on save
36. Show explicit error messages on violations

---

## FEATURE K6 — Step-Based Editing Rules

37. Load current active step
38. Restrict editable files to current step scope
39. Lock files belonging to future steps
40. Visually indicate locked future-step files
41. Update UI when step changes

---

## FEATURE K7 — Instructions & Step Panel

42. Render step instructions panel
43. Display step objective
44. Display step constraints
45. Display “do not modify” rules
46. Sync instructions with active step

---

## FEATURE K8 — Local Change Tracking

47. Track dirty files locally
48. Indicate unsaved changes
49. Warn before navigating away
50. Reset dirty state on reload

---

## FEATURE K9 — Commit & Push Guidance (UI Only)

51. Display commit & push guidance text
52. Explain expected changes for step
53. Disable in-browser Git actions
54. Prevent browser-based commits

---

## FEATURE K10 — Verification & Preview Status

55. Poll verification job status
56. Display verification state (pending/running/failed/passed)
57. Display verification summary/errors
58. Lock step progression on failure
59. Unlock next step on pass
60. Enable preview link only after pass

---

## FEATURE K11 — UI-Level Security & Anti-Cheat

61. Disable bulk file download
62. Disable hidden file search
63. Prevent copying protected file contents
64. Throttle file save operations
65. Obfuscate internal repo paths in UI

---

## FEATURE K12 — Audit & Error Handling

66. Log forbidden file access attempts
67. Log blocked edit attempts
68. Log step rule violations
69. Surface non-leaking error messages to user

---

## EPIC-K COMPLETION CRITERIA

- Lab UI enforces filesystem and step rules deterministically
- Users can edit only allowed files
- Verification and preview states reflected accurately

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-K is marked DONE, the following are **SOFT LOCKED**:

- FS abstraction rules
- Step-based edit enforcement
- Editor capability restrictions

UI refinements allowed without weakening constraints.

---

# END OF EPIC-K
