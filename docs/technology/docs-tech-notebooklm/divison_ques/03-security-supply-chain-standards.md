This list of 50 interview questions is categorized by engineering level, drawing from the technical documentation you provided on **Elastic Common Schema (ECS)**, **Elasticsearch internals**, **APM agents**, and **Secure Software Supply Chain (SLSA/Sigstore)**.

---

## 🟢 Beginner (Foundation & Terminology)

_Focus: Definitions, basic concepts, and navigation._

1. What does **ECS** stand for in the Elastic Stack?

2. What is the primary goal of using a common schema like ECS?

3. Name three basic "Base fields" in ECS.

4. What is a **Data Stream** in the context of Elasticsearch?

5. What is the purpose of an **Elasticsearch Index**?

6. List two common field data types used in Elasticsearch mapping.

7. What does an **APM Agent** do?

8. Which programming languages have official Elastic APM agents?

9. What is **Beats** used for in the Elastic ecosystem?

10. What is a **Shard** in Elasticsearch?

11. What is the difference between a "Source" field and a "Destination" field in ECS?

12. What does **SLSA** stand for in software builds?

---

## 🟡 Junior (Implementation & Operations)

_Focus: Configuration, basic querying, and troubleshooting._

13. How do you install a plugin in Elasticsearch?

14. What are **Index Lifecycle Management (ILM)** policies used for?

15. In ECS, what is the difference between `event.kind`, `event.category`, and `event.type`?

16. How would you use a **Processor** in Packetbeat to add metadata?

17. What is the purpose of the `_source` field in an Elasticsearch document?

18. Name two "Search functions" available in the Elastic Query Language.

19. How do you configure an APM agent to communicate via SSL/TLS?

20. What is a **Circuit Breaker** setting in Elasticsearch used to prevent?

21. What is the role of a **Snapshot** in data management?

22. How does the **Metricbeat** "System" module help in monitoring?

23. What are **Environment Variables** used for in build environments?

24. Explain the basic use of the `match` query in Elasticsearch.

25. What is "Archive Metadata" (like in zip/tar files) and why does it matter for builds?

---

## 🟠 Mid-Level (Optimization & Integration)

_Focus: Performance tuning, schema mapping, and security._

26. Describe the **ECS Guidelines** for creating custom fields that don't fit the standard schema.

27. How does **Index Sorting** speed up search conjunctions?

28. Explain the difference between **Dense Vector** and **Sparse Vector** data types.

29. What are the advantages of using **API Keys** over basic authentication for Beats?

30. How would you troubleshoot a "Connection reset by peer" error in Logstash?

31. What is **Cross-Cluster Replication (CCR)** and when should it be used?

32. Describe how to map custom data to ECS using an **Ingest Pipeline**.

33. What is the impact of the `refresh_interval` setting on indexing performance?

34. How do you use **OpenTelemetry** with an Elastic APM agent?

35. What are **Build Caches** and how do you validate their contents?

36. Explain the concept of **Mapping Explosion** and how "Mapping Limits" prevent it.

37. How does a **kNN Retriever** work in modern search?

38. What is the purpose of **Sigstore** in the context of build provenance?

---

## 🔴 Senior (Architecture & Strategy)

_Focus: Design patterns, large-scale systems, and security posture._

39. Design a strategy for migrating a legacy non-ECS dataset to the **Elastic Common Schema**.

40. Compare and contrast **ES|QL** with traditional **SQL** in Elasticsearch for complex analytics.

41. How would you architect a globally distributed Elasticsearch cluster using **Cross-Cluster Search**?

42. Evaluate the trade-offs of using **Nested** vs. **Flattened** object types for high-cardinality data.

43. How do you ensure **Reproducible Builds** across different environment variations?

44. Discuss the security implications of **Audit Authorization Policy Changes** in Windows.

45. How does the **Elastic Defend** advanced settings contribute to endpoint security?

46. Explain the architecture of **APM for AWS Lambda** and its performance overhead.

47. What are the best practices for managing **Shard Allocation** in a multi-tier (Hot/Warm/Cold) data architecture?

48. How would you implement a **Zero Trust** logging architecture using ECS and Beats?

49. Analyze the role of **Provenance** in assessing build platform security (SLSA).

50. If an Elasticsearch cluster experiences high **RSS memory usage** due to MADV settings, how would you remediate it?

---

**Would you like me to provide the detailed answers to any of these specific questions?**
Based on the titles of your **Master Epics** and the security standards in your documentation (**SLSA, ECS, Sigstore, in-toto, Reproducible Builds**), here are additional questions tailored for each engineering level.

These questions bridge the gap between building your platform (the Epics) and ensuring it meets the security and schema standards described in your files.

---

### 🟢 Beginner (Focus on Definitions & Basic Standards)

_Relates to: Monorepo (Epic A), Database (Epic B), and Authentication (Epic C)._

1. **ECS & Logging (Epic A):** Why is it important to use the `user.id` and `user.name` fields consistently when logging login attempts across the monorepo?
2. **SLSA Basics (Epic B):** In the context of our database hardening, what does SLSA mean by "managing cryptographic secrets" in secure storage?
3. **Authentication (Epic C):** What is the role of an **OIDC (OpenID Connect)** provider when using Sigstore for identity verification?
4. **Database Fields (Epic B):** Which ECS field set would you use to store a user's IP address when they connect to the database?
5. **GitHub Workflow (Epic F):** What is a "Provenance" attestation in simple terms when talking about a lab's build process?

---

### 🟡 Junior (Operations & Implementation)

_Relates to: GitHub (Epic F), Lab Engine (Epic H), and UX/UI (Epic J, K)._

6. **GitHub Integration (Epic F):** How do we verify that a GitHub Action workflow has not been tampered with using SLSA’s "Source" track prompts?
7. **Lab Verification (Epic H):** How can **in-toto metadata** (Materials and Products) be used to track if a student successfully modified a file in a lab?
8. **Logging Errors (Epic L):** When the frontend fails to talk to the backend, which ECS `error` and `http` fields should be populated to help us debug?
9. **Reproducible Builds (Epic G):** Why should we avoid using the "current time" inside a build script if we want a **reproducible preview** of a lab?
10. **Anti-Cheat (Epic I):** If we detect a student running a suspicious process, which ECS `process` fields are essential for logging that activity?
11. **Admin Logs (Epic M):** Which `event.category` would you use for an admin deleting a lesson, and why?

---

### 🟠 Mid-Level (Integration & Security Compliance)

_Relates to: Hardening (Epic B), Lab UI (Epic K), and Anti-Cheat (Epic I)._

12. **Database Hardening (Epic B):** How would you implement **TLS 1.3** for database connections to meet the latest RFC 8446 standards?
13. **Lab UI Abstraction (Epic K):** If the Lab UI uses a File System (FS) abstraction, how do we log "File Creation" events so they are compatible with ECS `file` fields?
14. **Anti-Cheat Logic (Epic I):** How can we use the `threat` field set in ECS to store indicators of compromise (IOCs) detected during a lab session?
15. **Supply Chain (Epic A):** How would you configure a **Rekor transparency log** to store the signatures of our internal CLI tools?
16. **Session Ops (Epic O):** Describe how to map a student's session ID to the `service.node.name` in ECS to track their activity across a cluster.
17. **GitHub Security (Epic F):** How do we prevent "Project maintainers from tampering with controls" in our GitHub settings, per SLSA Source L4?

---

### 🔴 Senior (Architecture & Policy Design)

_Relates to: Monorepo Foundation (Epic A), Verification Engine (Epic H), and Content Ops (Epic M)._

18. **Verification Engine Architecture (Epic H):** Design an **in-toto Layout** that ensures a lab artifact was fetched, modified, and tested by three different automated steps before being "Published."
19. **Content Integrity (Epic M):** How can we use **Fulcio's temporary certificates** to allow lesson creators to sign their content without managing long-lived GPG keys?
20. **Monorepo Strategy (Epic A):** How would you architect the build system to achieve **SLSA Build Level 3**, specifically regarding "isolated build environments"?
21. **Zero-Trust Lab Access (Epic C):** How does the **Sigstore Threat Model** inform our decision on whether to permit public verification keys for our identity providers?
22. **Reproducibility Audit (Epic G):** If our "Snapshot Preview" build is not identical to the student's "Final Submission," which of the "16 environment variations" would you investigate first?
23. **Cross-Epic Security (Epic I & O):** How would you build a global dashboard that uses **ECS categorization fields** to compare "threat" events across all active student sessions in real-time?
24. **Supply Chain Compliance:** How do the **PCI Secure Software** standards influence how we handle the "Creation and destruction" of our build environments?
25. **Cryptographic Policy:** Based on SLSA guidelines, what is our plan for **remediating a compromise** of the private keys used by our Lab Verification Engine?

25. **Cryptographic Policy:** Based on SLSA guidelines, what is our plan for **remediating a compromise** of the private keys used by our Lab Verification Engine?

### EPIC-A Additions

- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what supply-chain policy references must be included in the architecture doc (SLSA, artifact attestations)?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what artifact attestation checks should be referenced in the architecture doc and CI to support SLSA goals?
- Based on the provided documentation in `03-security-supply-chain-standards.md`: Based on the provided documentation, what mandatory audit log fields and retention policies must be recorded when LOCKed architecture files are changed?
