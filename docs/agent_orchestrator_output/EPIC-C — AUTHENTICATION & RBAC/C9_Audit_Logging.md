### FEATURE ANALYSIS

- Feature Type: observability + immutable logging
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Find existing logging and audit pipelines (structured logs, event sinks).
- Security / Compliance — Specify retention and immutability requirements for audit logs.
- Planner / Architect — Design audit events and storage (append-only DB table, external log store).

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory logging libraries and sinks.
- Step 2: Planner / Architect — define audit event schema (login success/failure, logout, role change) and storage mechanism.
- Step 3: Security / Compliance — approve retention and immutability controls.
- Step 4: Implementer — add logging hooks to auth flows and ensure immutability.

### USER PROMPTS

- Forgea Code Scout Prompt:
  Report where logs are emitted and which services forward logs to external systems. Suggest points to hook auth audit events.

- Security / Compliance Prompt:
  Define retention periods, access controls, and immutability guarantees required for audit logs.
