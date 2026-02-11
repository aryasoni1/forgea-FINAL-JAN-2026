### FEATURE ANALYSIS

- Feature Type: infra / security
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define isolation model, allowed system calls, resource limits, and sandboxing choices (container vs VM).
- implementer — Implement sandbox orchestration, enforcement of CPU/memory/time limits, and runtime hardening.
- security-sentinel — Thorough adversarial review of filesystem/network restrictions and syscall policies.
- integration-checker — Validate runner API surface and orchestration integration points.

### NOT REQUIRED AGENTS

- qa-tester — Reason: Formal test plans are part of H14; initial implementation and security review take precedence.

### MISSING AGENT (ONLY IF NEEDED)

- Name: none

### EXECUTION PLAN

- Step 1: Planner-Architect produces isolation spec covering containerization, seccomp policies (or equivalent), filesystem and network restriction list, and resource limits.
- Step 2: Security-Sentinel evaluates spec and highlights forbidden syscalls and abuse signals to record.
- Step 3: Implementer implements the runner orchestration, sandbox provisioning, and enforcement mechanisms.
- Step 4 (parallel): Integration-Checker validates orchestration API and communicates failure modes to Planner.
- Step 5: Implementer provides operational runbooks for timeouts and resource-exhaustion handling.

(Parallel: Step 4 can run in parallel with later implementation verification steps.)

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a reusable isolation-spec template for HARD-LOCK features to reduce security-review friction.
- Consider an automated seccomp/profile generator agent in future to reduce manual policy errors.
