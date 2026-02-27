### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H3_Runner Isolation
- Source: Agent Orchestrator Output — docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md

### TASKS CHECKED

- Step 1: Planner-Architect produces isolation spec covering containerization, seccomp policies, filesystem and network restriction list, and resource limits.
- Step 2: Security-Sentinel evaluates spec and highlights forbidden syscalls and abuse signals to record.
- Step 3: Implementer implements the runner orchestration, sandbox provisioning, and enforcement mechanisms.
- Step 4: Integration-Checker validates orchestration API and communicates failure modes to Planner.
- Step 5: Implementer provides operational runbooks for timeouts and resource-exhaustion handling.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md — Orchestrator output describing feature analysis, required agents, execution plan, and improvement notes.
- forgea-monorepo/packages/config/eslint.config.js — references a `service-verification-runner` pattern and a `service-verification-runner` logical identity (evidence of a runner service reference).
- UI traces / build artifacts showing a `VERIFICATION_RUNNER` node/status (observed within generated app artifacts under apps/forgea-labs/.next and apps/forgea-admin/.next) — indicates runtime or UX surfaces referencing a runner.
- docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md — contains sandbox & security constraints and runner metadata expectations (requirements-level documentation present).

### WHAT IS PARTIALLY IMPLEMENTED

- Runner references: configuration and UI indicate a `verification-runner` concept exists (ESLint reference and integrity UI). Missing is a single, authoritative runner contract or isolation specification.
- Documentation: sandbox / security constraints are documented at a high level (see E6_Verification_Design_Lab-Level.md and related docs-gatekeeper pages) but these have not been turned into a concrete isolation spec, policy artifacts (e.g., seccomp profiles), or enforcement checklists.

### WHAT IS MISSING

- Not found: a formal isolation specification (Planner deliverable) that prescribes container vs VM choices, allowed syscalls, seccomp/BPF profiles, capability drops, and filesystem mounts.
- Not found: concrete seccomp/BPF policy files, AppArmor/SELinux profiles, or equivalent syscall-blocking artifacts.
- Not found: sandbox orchestration implementation (service code / orchestration glue for provisioning hardened sandboxes) located as a single authoritative service artifact.
- Not found: enforcement code for CPU/memory/time limits, cgroup setup, or runtime resource-limiting wrappers tied to the runner.
- Not found: a documented runner API / contract (queue/message schema, idempotency keys, ack semantics, failure modes) in a single authoritative file.
- Not found: operational runbooks for timeouts, resource exhaustion, and abuse handling connected to the runner implementation.
- Not found: security review artifacts (adversarial syscall analyses, threat models for filesystem/network restrictions) produced by a Security-Sentinel role.
- Not found: tests or verification harnesses that exercise sandbox escape / syscall policy enforcement for the runner.

### RISKS OR CONFLICTS

- The Orchestrator flags this feature as High risk and touching HARD LOCK; however, the repository lacks the required isolation spec and enforcement artifacts — this gap creates a risk of delivering an insecure runner or violating HARD LOCK policies.
- Multiple doc references and UI/config traces reference a verification/runner service, but no central runner contract was located — this integration ambiguity risks mismatched expectations between planner, implementer, and integrator.
- Presence of high-level sandbox/security requirements in docs without corresponding machine-readable policies (seccomp, orchestration manifests, CI checks) increases the chance of incomplete or inconsistent implementations.

### QUESTIONS FOR CLARIFICATION

- None strictly required from the repository scan; the next agent should confirm scope and authority of the HARD LOCK owner if needed.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: See this code-scout report and the Agent Orchestrator output at docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H3_Runner Isolation.md. The repository contains runner references (ESLint, UI traces) and high-level sandbox/security constraints in docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md, but **no concrete isolation spec, seccomp/profile artifacts, orchestration implementation, enforcement code, runbooks, or runner contract** were located by the code-scout.

Task: Produce an isolation specification artifact for the `verification-runner` feature that addresses exactly the missing items listed in this report. The spec must include, at minimum:
- Scope and assumptions (HARD LOCK implications and ownership must be stated).
- Target runtime choices (container vs VM) and justification.
- Required syscall restrictions (seccomp/BPF or equivalent) and an explicit list of forbidden syscalls to evaluate with Security-Sentinel.
- Filesystem layout and mount restrictions (read-only mounts, permitted writable paths, artifact upload paths).
- Network restrictions (egress/ingress rules, allowed endpoints, DNS policy) and telemetry requirements.
- Resource limits (CPU, memory, ephemeral storage, wallclock time) and enforcement mechanism references (cgroups, container runtime flags, orchestration hooks).
- Runner API contract checklist (queue/message schema pointers, idempotency key behaviour, retry/DLQ semantics) to hand to Integration-Checker.
- Required deliverables for Implementer and Security-Sentinel (policy files, example seccomp profile, runbook steps, test cases for syscall escape attempts).

Deliverable format: a machine-readable spec under `/docs/planner_specs/EPIC-H/` and a short pointer document listing exact files the Implementer must produce. Do NOT implement — produce the spec and an explicit acceptance checklist for the next Implementer and Security-Sentinel agents.

Reference: This report and the orchestrator output file mentioned above.

Handoff complete. Provide this report verbatim to the next agent.
