# Seccomp

- Category: Security
- Epics: H
- Version / Requirement: Docker Default
- Intent / Critical Decision: Hardened kernel isolation for student code execution.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Provide seccomp/BPF profiles used by the verification runner to restrict syscalls and harden sandboxed execution.
- Important points:
  - Author canonical seccomp profiles (denylist/audit) and include CI validation tests for escape attempts.
  - Pin target kernel/runtime versions and document limitations (runtime compatibility, required capabilities).
  - Combine seccomp with cgroups and LSM (AppArmor/SELinux) where available for layered isolation.
