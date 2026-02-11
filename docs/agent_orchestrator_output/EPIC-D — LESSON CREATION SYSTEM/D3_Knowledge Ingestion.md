### FEATURE ANALYSIS

- Feature Type: integration / data
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- implementer — Build constrained documentation scraper, normalization pipeline, and raw reference storage.
- security-sentinel — Assess trust model, source validation, and potential exfiltration or malicious content risks.
- integration-checker — Ensure ingestion pipeline integrates safely with storage and downstream RAG systems.
- qa-tester — Validate normalization correctness and edge-cases for scraped content.
- documenter-historian — Record ingestion provenance and storage decisions.
- planner-architect — Provide ingestion scope, source whitelist criteria, and constraints.

### NOT REQUIRED AGENTS

- docs-gatekeeper — Reason: Useful for registry items but not strictly required to build ingestion; planner will include docs references.

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner defines trusted source list and ingestion constraints (seeding rules, frequency, allowed domains). (Sequential)
- Step 2: Implementer builds scraper + normalizer, stores raw references separately, attaches metadata and provenance. (Sequential)
- Step 3: Security and QA run parallel threat and correctness checks on sample ingests. (Parallel)
- Step 4: Integration Checker validates end-to-end handoff to embedding generator and vector DB. (Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a "Trusted Sources" registry under `/docs/official-docs/` to centralize allowed sources and version pins.

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Define ingestion scope for EPIC-D FEATURE H3 — Knowledge Ingestion. Input: `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`. Deliver: trusted source whitelist, scraping constraints, normalization rules, metadata schema to attach, storage locations for raw references, and preconditions for implementation."

- implementer:

"Implement a constrained documentation scraper per planner brief. Deliver: scraper code under `services/lessons/ingestion/`, normalization pipeline, raw reference storage path, and metadata attachments. Include manual-checks and a beginner how-to guide."

- security-sentinel:

"Perform a threat analysis for the ingestion pipeline: validate domain whitelist, sanitize inputs, scanning for malicious payloads, provenance guarantees, and required mitigations."

- integration-checker:

"Verify E2E ingestion → normalization → embedding preparation handoff. Produce an Integration Report describing interfaces, invariants, and any required adapters."

- qa-tester:

"Create validation scenarios for scraped content normalization and metadata accuracy; include malformed HTML, duplicated content, changed source structure, and missing metadata cases."
