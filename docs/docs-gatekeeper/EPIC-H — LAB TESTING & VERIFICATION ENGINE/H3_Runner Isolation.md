### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H3_Runner Isolation
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable implementation the following authoritative references must be obtained and pinned before any implementation work.

- Technology: Linux Seccomp / BPF
  - Concept: Syscall filtering and seccomp-bpf profiles
  - Official source: https://www.kernel.org/doc/html/latest/userspace-api/seccomp_filter.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines kernel-level mechanism to block/allow syscalls; informs forbidden syscall list and enforcement format.
  - Decision it informs: Whether seccomp is usable for the chosen runtime and which syscalls can be reliably blocked.
  - What breaks without it: Incorrect syscall lists, ineffective filters, or reliance on unsupported seccomp features.

- Technology: cgroups v2 (resource control)
  - Concept: CPU, memory, IO and ephemeral storage limits enforcement
  - Official source: https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Authoritative behavior for resource accounting and enforcement; maps planner limits to runtime knobs.
  - Decision it informs: Concrete CPU/memory/ephemeral-storage enforcement mechanism selection (cgroup v2 vs legacy).
  - What breaks without it: Misconfigured limits, userspace drift, or unportable enforcement logic.

- Technology: OCI Runtime Specification (runtimes/container runtimes)
  - Concept: Runtime flags for readonly mounts, capabilities, seccomp integration, and process isolation
  - Official source: https://github.com/opencontainers/runtime-spec
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Standardizes runtime config shape (capabilities, mounts, seccomp profile placement) across runtimes.
  - Decision it informs: How to represent isolation in machine-readable runtime manifests and orchestration APIs.
  - What breaks without it: Ambiguous runtime config, incompatibility between runtime implementations.

- Technology: Container runtime security docs (containerd / runc)
  - Concept: How container runtimes implement seccomp/cgroups/capability drops in practice
  - Official source: containerd / runc project docs (pick runtime used in infra)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Runtime-specific flags and known limitations (e.g., seccomp support on given kernel/containerd pairing).
  - Decision it informs: Implementation details, required orchestration hooks, and known workarounds.
  - What breaks without it: Misapplied runtime flags or failing security controls in production.

- Technology: AppArmor / SELinux (as applicable)
  - Concept: LSM-based filesystem and operation confinement
  - Official sources: https://gitlab.com/apparmor/apparmor/-/wikis/Home and https://selinuxproject.org/page/Main_Page
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Alternative or complementary enforcement to seccomp for filesystem and capability restrictions.
  - Decision it informs: Whether to require AppArmor/SELinux profiles and how to author them for supported hosts.
  - What breaks without it: Missing or incompatible LSM profiles leading to insufficient isolation.

- Technology: KVM / QEMU (if VM isolation chosen)
  - Concept: Hypervisor-based isolation and device passthrough guidance
  - Official source: https://www.kernel.org/doc/html/latest/virt/index.html and QEMU docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: If VM-based isolation is selected the hypervisor behavior and virtio device policies determine feasibility.
  - Decision it informs: Whether VM vs container is mandated for HARD LOCK safety boundaries.
  - What breaks without it: Misjudged threat model and ineffective isolation.

- Technology: JSON Schema (for runner API/message schema)
  - Concept: Machine-readable job / message contract
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12
  - Why required: Unambiguous API contract for Integration-Checker to validate message payloads and idempotency keys.
  - Decision it informs: Message fields, required/enforced types, and consumer/producer validation.
  - What breaks without it: Incompatible producers/consumers, loss of idempotency, or invalid job records.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level execution plan present, but no concrete syscall list, no policy artifacts, and no enforcement checklist.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing artifacts and risks but does not provide isolation spec or required deliverables in machine-readable form.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains sandbox/security constraints at a lab-level but lacks runner-level contract, syscall lists, and enforcement manifests.

---

### DOCUMENTATION COVERAGE DECISION

- ❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

Required new docs (minimum):

- /docs/planner_specs/EPIC-H/H3_verification_runner_isolation_spec.md — authoritative isolation specification (machine readable + human summary).
- /docs/official-docs/EPIC-H/runner_api_contract.jsonschema — JSON Schema for runner messages and intake HTTP contract.
- /docs/official-docs/EPIC-H/seccomp_profiles/ — directory with canonical seccomp/BPF profiles (example denylist and audit profile).
- /docs/official-docs/EPIC-H/lsm_profiles.md — AppArmor/SELinux profiles or guidance for supported hosts.
- /docs/official-docs/EPIC-H/runbooks/runner_operational_runbook.md — timeouts, resource exhaustion, and abuse handling.
- /docs/official-docs/EPIC-H/testing/seccomp_escape_tests.md — adversarial tests and CI harness references.

---

### STUDY GUIDE FOR HUMAN (KEY CONCEPTS)

- Seccomp / BPF
  - Why: Blocks dangerous syscalls at kernel boundary with minimal perf cost.
  - Alternatives: LSM (AppArmor/SELinux) or hypervisor-level sandboxing (VMs). Use seccomp when kernel support and runtime integration are available.
  - When NOT to use: Host kernels lacking required seccomp features or when syscall coverage is insufficient for HARD LOCK threat model.
  - Common mistakes: Overly permissive allow-lists, relying on seccomp for filesystem ACLs, forgetting to test on target kernel/runtime versions.

- cgroups v2
  - Why: Enforce hard CPU/memory/disk limits and OOM handling deterministically.
  - Alternatives: Container runtime flags alone (not sufficient) or VM-level resource enforcement.
  - When NOT to use: Legacy systems constrained to cgroups v1 without migration plan.
  - Common mistakes: Not enabling swap accounting, setting limits without OOM policy, ambiguous ephemeral-storage accounting.

- OCI Runtime & containerd/runc
  - Why: Provides standard representation for mounts, capabilities, seccomp; ensures reproducible runtime config.
  - Alternatives: Custom process wrappers or non-OCI runtimes (increases maintenance burden).
  - Common mistakes: Assuming all runtimes expose same seccomp features; not pinning runtime versions.

- AppArmor / SELinux
  - Why: Stronger filesystem/action confinement complementary to seccomp.
  - When NOT to use: Non-Linux hosts or when runtime cannot enforce LSM profiles.
  - Common mistakes: Profiles too permissive or environment-specific policies that break CI.

- VM vs Container decision
  - Why: VMs provide stronger isolation (hardware boundary) at higher cost; containers are lighter-weight and sufficient for many threat models.
  - Alternatives: MicroVMs (Firecracker) for middle ground.
  - When to choose VM: Untrusted code with high escalation risk or when hardened kernel features are insufficient.
  - Common mistakes: Choosing containers for high-risk workloads without compensating controls (e.g., additional LSM+seccomp+minimal host attack surface).

---

### INTERNAL DOCS TO ADD OR EXTEND (detailed)

- Canonical planner spec (required path): /docs/planner_specs/EPIC-H/H3_verification_runner_isolation_spec.md
  - Purpose: Authoritative machine-readable isolation spec for the `verification-runner`.
  - Exact knowledge to add: Scope & HARD LOCK owner, runtime choice (container vs VM) with justification, canonical seccomp denylist + example allowlist, OCI runtime manifest templates, cgroup limit mappings, filesystem mount table, network egress/ingress allowlist, telemetry/audit sample events, acceptance criteria.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Runner API contract (required path): /docs/official-docs/EPIC-H/runner_api_contract.jsonschema
  - Purpose: JSON Schema for queue/message payloads and intake HTTP contract.
  - Exact knowledge to add: Required fields, idempotency key spec, retry semantics, DLQ triggers, sample messages, and versioning strategy.
  - Required version pin: JSON Schema 2020-12

- Seccomp profiles (required path): /docs/official-docs/EPIC-H/seccomp_profiles/README.md and example profiles
  - Purpose: Machine-readable seccomp profiles (deny-lists & audit profiles) and derivation notes.
  - Exact knowledge to add: Explicit forbidden syscall list, profile application instructions, CI validation tests, and Security-Sentinel checklist.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

- Runbooks & Tests (required path): /docs/official-docs/EPIC-H/runbooks/runner_operational_runbook.md and /docs/official-docs/EPIC-H/testing/seccomp_escape_tests.md
  - Purpose: Operational guidance for timeouts, OOM, CPU throttling, artifact upload, and tests for sandbox escape attempts.
  - Exact knowledge to add: Failure-mode tables, alert thresholds, rollback steps, and reproducible test cases for syscall escape.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- HARD LOCK owner: Who is the canonical HARD LOCK owner for runner isolation approvals? (Planner must confirm before gating implementation.)
- Target host OS/kernel matrix: Which kernel versions and container runtimes will be supported in production? Pinning required to finalise seccomp/cgroup profiles.
- Runtime choice authority: Is VM-only isolation required for all verification jobs, or is a risk-tiering model acceptable?

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H3 — Runner Isolation
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md
- Status: ADDED
- Reason: Planner brief enumerating required official docs, machine-readable planner-spec artifacts and missing security deliverables for `verification-runner` isolation.

---

End of brief.
