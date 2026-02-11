### FEATURE ANALYSIS

- Feature Type: Audit / Immutable ledger (read-only view)
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify ledger schema, immutability guarantees, retention policy, and read-only append-only access patterns.
- security-sentinel — Review ledger guarantees, signing, tamper-evidence, and storage integrity.
- implementer — Implement append-only storage, ledger read model, and audit log writes as specified.
- qa-tester — Attempt to detect ledger tampering, verify immutability, and validate timestamps/commit SHA mapping.
- integration-checker — Validate correlations between attempts and verification job records (cross-service references).
- documenter-historian — Produce preservation guidance, access patterns, and manual-check artifacts.

### NOT REQUIRED AGENTS

- forgea-code-scout — Not required for orchestrator planning purposes.

### MISSING AGENT (ONLY IF NEEDED)

- audit-keeper (advisory): Responsibility: specialist agent to verify cryptographic signing, append-only storage, and retention policy. Why needed: existing agents cover security review but no agent explicitly enforces cryptographic immutability patterns.

### EXECUTION PLAN

- Step 1: Planner defines ledger schema, append-only constraints, required audit fields (timestamp, commit SHA, verification result, duration), retention and export rules.
- Step 2: Security Sentinel reviews for tamper-resistance, recommends signing or write-once storage. (Sequential)
- Step 3: Implementer implements ledger storage and read-only view, and emits immutable audit logs. (Sequential)
- Step 4: Integration Checker validates correlations between attempts and verification jobs across services. (Parallel with QA)
- Step 5: QA performs tampering simulations and verifies immutability claims. (Sequential)
- Step 6: Documenter produces preservation guidance and manual checks. (Parallel with final QA)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Produce a task document for O4 — Attempt Ledger. Define append-only schema fields: timestamp, commit SHA, verification result, verification duration, attempt metadata. State retention policy, export/ingest formats, and read-only API contracts. Specify whether cryptographic signing or write-once storage is required."

- security-sentinel:
"Review the Planner's O4 task doc for ledger tamper risks and recommend specific mitigations (signing, KMS usage, WORM storage). Block if any modifiable path to ledger entries exists."

- implementer:
"Implement O4 exactly per the approved task doc. Deliver ledger storage code, read-only API, and create `/docs/manual-checks/task-O4-manual-checks.md` and `/docs/guides/task-O4-how-to.md`."

- integration-checker:
"Validate that attempt ledger entries reliably correlate to verification job records (IDs, timestamps, outcomes) across services and report any gaps."

- qa-tester:
"Execute tamper-resistance validation and negative tests against the implemented ledger, verifying immutability and correct metadata."

- documenter-historian:
"Document ledger preservation, access procedures, and forensic usage. Ensure admin guidance for reading and exporting ledger data."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a dedicated `audit-keeper` agent for features requiring cryptographic or WORM storage patterns.
- Require Planner to specify whether ledger entries are stored in the primary DB or external immutable store.
