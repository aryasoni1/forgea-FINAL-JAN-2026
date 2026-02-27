### FEATURE ANALYSIS

- Feature Type: security / infra
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define forbidden paths, violation semantics, and immediate-failure rules.
- Implementer — Implement file-change scanning on push, detect deletions/modifications of locked files, detect force-push attempts, and trigger LabSession failure.
- Security Sentinel — Review detection rules for correctness and minimize false positives.
- QA / Tester — Create tests that attempt to modify locked paths and verify deterministic failure handling.
- Integration Checker — Validate detection on real pushes and edge cases (rename, subtree moves).
- Documenter — Document violation rules and remediation steps.

### NOT REQUIRED AGENTS

- None.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Enumerate locked paths (tests, `forgea.config.json`, `.forgea/`), define violation severity and immediate-fail behavior.
- Step 2: Implementer — On webhook push processing, compare changed files; detect forbidden changes and mark LabSession FAILED with reason.
- Step 3: Security Sentinel — Review rules to reduce false positives and consider allowing controlled admin remediation flows.
- Step 4: QA / Tester — Create push scenarios covering modifications, deletions, force-pushes, and confirm correct outcomes.
- Step 5: Integration Checker — Confirm detection in staging with real pushes and record audit evidence.
- Step 6: Documenter — Publish violation detection rules and operational remediation steps.

### AGENT PROMPTS

- Planner:
  "Define the set of forbidden paths and the expected behavior when a violation occurs (immediate fail, audit entry, notification). Include edge-case handling like renames and force-pushes."

- Implementer:
  "Implement forbidden-change detection during webhook processing: detect deletions, modifications to locked paths, and force-push attempts. On violation, fail the LabSession and record the reason."

- Security Sentinel:
  "Review detection heuristics to avoid false positives and ensure that remediation and audit trails are robust."

- QA / Tester:
  "Simulate modifications and deletions to locked paths and force-push scenarios; verify deterministic failure and correct audit logging."

- Integration Checker:
  "Validate that forbidden-change detection triggers in staging and produces clear audit records for operators."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a "Violation Engine" agent to centralize policy checks and make rules reusable across epics.
