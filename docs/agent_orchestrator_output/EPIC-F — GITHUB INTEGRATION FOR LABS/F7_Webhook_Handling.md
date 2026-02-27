### FEATURE ANALYSIS

- Feature Type: integration / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Specify webhook payload handling, required events, and security checks (HMAC verification).
- Implementer — Implement webhook endpoint, verify signatures, parse push events, and reject unsupported events.
- Security Sentinel — Validate HMAC verification implementation and replay protection.
- QA / Tester — Simulate deliveries and retries to ensure idempotent handling.
- Integration Checker — Validate real webhook deliveries from GitHub to staging endpoint.
- Documenter — Document webhook contract and verification steps.

### NOT REQUIRED AGENTS

- Documenter — (handled above) — included.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define webhook events to accept (push only), signature verification method, and error handling for unsupported events.
- Step 2: Implementer — Implement endpoint with HMAC verification, extract commit SHA, branch, author, and changed files; reject non-push events with 4xx.
- Step 3: Security Sentinel — Review signature verification, timestamp/replay protections, and rate-limiting considerations.
- Step 4: QA / Tester — Send signed and unsigned payloads, test retries, and verify idempotency.
- Step 5: Integration Checker — Confirm GitHub can deliver to the endpoint and observe expected parsed outputs.
- Step 6: Documenter — Publish webhook contract, expected response codes, and sample verification code.

### AGENT PROMPTS

- Planner:
  "Define the webhook contract: only accept `push` events, required payload fields to extract (SHA, ref/branch, author, changed files), and HMAC signature verification approach."

- Implementer:
  "Implement webhook endpoint that validates HMAC signature, rejects unsupported events, extracts commit SHA, branch name, author identity, and list of changed files, and persists the minimal audit record for downstream processing."

- Security Sentinel:
  "Review HMAC verification, replay protection, and timestamp checks. Provide mitigation for webhook secret leakage and suggestions for rotation."

- QA / Tester:
  "Simulate GitHub webhook deliveries including retries, unsigned payloads, and unsupported events. Verify correct responses and idempotent processing."

- Integration Checker:
  "Install app in staging org, trigger real push events, and verify endpoint receives and correctly parses the push payloads."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider an agent specifically for webhook resilience (retries, dead-letter queue) if multiple epics rely on external webhooks.
