FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G11 — Preview Hosting
- Source: Agent Orchestrator Output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md


TASKS CHECKED

(Listing only tasks from the EPIC file that belong to this feature)

- 59. Publish snapshot to preview domain
- 60. Generate stable preview URL
- 61. Disable cookies and auth headers
- 62. Block non-GET HTTP methods
- 63. Apply strict CSP headers
- 64. Disable indexing via robots headers


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md — Orchestrator output for this feature detailing required agents and an execution plan.
- docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md — Epic task list that includes Feature G11 tasks (59–64) and references `services/preview/**` as owned files.
- docs/tasks/master_tasks_V1/MASTER EPICS MAP.MD — Mentions `services/preview/**` as part of EPIC-G ownership.


WHAT IS PARTIALLY IMPLEMENTED

- References to `services/preview/**` appear in epic/task metadata (ownership declared). These are documentation-level artifacts indicating where implementation should live; actual service code presence was not confirmed in this scan.


WHAT IS MISSING

- No concrete preview hosting service implementation located in repository docs or code search results during this scan (no matching `services/preview` source files discovered by quick grep).
- No CDN/DNS configuration files, Terraform modules, or infra manifests tied explicitly to preview hosting were found in this scan.
- No explicit CSP header configuration, robots metadata, or preview URL generation conventions found in repository artifacts.
- No tests or integration checks verifying GET-only enforcement, cookie suppression, or CSP/robots header behavior were found.
- No operational checklist (DNS, TLS, caching, origin ACLs) located beyond the orchestrator's improvement note recommending one.


RISKS OR CONFLICTS

- Exposure risk: Without enforced cookie suppression or header hygiene, previews could leak auth/session information if implemented incorrectly.
- Indexing risk: Absent robots or meta directives, previews might be indexed by search engines, exposing in-progress content.
- Inconsistent hosting: Without a documented URL scheme and CDN contract, preview links may be brittle and break across environments.
- Missing infra: Lack of infra manifests increases deployment ambiguity and raises integration risk for release/preview flows.


QUESTIONS FOR CLARIFICATION

- None strictly required for the `planner-architect` to define the hosting contract; the planner may request legal/ops retention or domain naming constraints if needed.


NEXT AGENT HANDOFF PROMPT (FOR `planner-architect`) — COPY-PASTE READY

You are the `planner-architect` assigned by the orchestrator. Use this report (docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md) and the orchestrator output at docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md as authoritative context.

Your scope (no implementation):
- Define a precise preview hosting contract covering: preview URL format, stable preview ID semantics, canonical URL generation rules, and domain/subdomain patterns across environments.
- Specify required security headers and policies: strict CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` (if applicable), `Cache-Control` for immutable snapshots, and explicit `Set-Cookie` suppression policies.
- Define HTTP method restrictions (enforce GET-only for preview origin) and the desired server/edge behavior on non-GET requests.
- Specify robots and indexing guidance and exact robots header/meta content to prevent indexing.
- Enumerate CDN, DNS, TLS, and origin configuration items the `integration-checker` and implementer will need (DNS zones, TLS cert sources, CDN caching rules, origin ACLs, signed URLs if applicable).
- Provide a minimal operations checklist (DNS, TLS, CDN purge, origin ACLs, logging endpoints) as a starting point for `integration-checker` and `implementer` to validate.
- Provide a concise list of acceptance tests for `integration-checker` and `security-sentinel`: URL stability, correct headers, GET-only enforcement, no cookies set, robots blocking, CSP verification, and caching behavior.
- Reference expected implementation locations (`services/preview/**`) and where infra manifests should be placed, and call out any dependencies on snapshot artifact generation (EPIC-G tasks G9/G10).

Deliver a concise, deterministic artifact (YAML/MD) containing the hosting contract, required headers and exact values, method handling rules, robots/CSP content, CDN/TLS checklist, and the acceptance test list. Do NOT implement code; stop at the contract and validation requirements. Reference this report in your outputs.


Handoff complete. Provide this report verbatim to the next agent.