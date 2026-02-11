### FEATURE ANALYSIS

- Feature Type: infra / integration
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- implementer — Configure chosen vector DB (Chroma), implement chunking, embedding generation, and storage.
- integration-checker — Validate retrieval constraints, indexing correctness, and downstream RAG interfaces.
- security-sentinel — Evaluate data access controls, metadata leakage, and query-surface risks.
- qa-tester — Validate chunking rules, embedding correctness, and RAG constraints.
- documenter-historian — Record design choices, chunking rules, embedding model versions, and storage locations.
- planner-architect — Specify retrieval constraints and acceptable embedding model versions.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Reason: Registry updates likely minimal; use only if external docs are referenced.

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner prescribes chunking rules, embedding model and metadata schema. (Sequential)
- Step 2: Implementer configures Chroma storage, embedding generator, and metadata indexing. (Sequential)
- Step 3: QA and Security run parallel validations (chunking correctness, leakage, query-time constraints). (Parallel)
- Step 4: Integration Checker verifies RAG retrieval constraints and end-to-end behavior. (Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a small standardized manifest format for embedding metadata to make Integration Checker work predictable.

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Define chunking rules, acceptable embedding model versions, embedding metadata schema, and RAG retrieval constraints for EPIC-D FEATURE H4. Reference `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`. Deliver a planner task doc capturing locked decisions."

- implementer:

"Implement Chroma-backed embedding storage and RAG connectors per planner spec. Deliver code under `services/lessons/embeddings/`, include metadata schema, and add CI validation steps. Provide manual-checks and a how-to guide."

- integration-checker:

"Run E2E checks: ingestion → chunking → embedding → Chroma store → RAG retrieval. Produce an integration report and decision to APPROVE or BLOCK."

- security-sentinel:

"Assess data-at-rest and query-time risks: metadata leakage, PII embedding, and vector similarity attacks. Provide required fixes and acceptable risks."

- qa-tester:

"Create tests verifying chunking invariants, embedding model versioning, retrieval constraints, and guardrails against over-long contexts."
