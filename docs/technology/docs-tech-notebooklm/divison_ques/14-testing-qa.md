This list of 50 questions is designed to help you explore the full depth of the **Playwright** and **Vitest** documentation provided. Asking these questions will guide you from basic execution to high-level architecture and performance optimization.

---

### Phase 1: Beginner (Foundations)

_Focus: Getting tests to run and understanding basic syntax._

1. How do I install Playwright and what files does it create by default?
2. What is the simplest way to write and run my first test case?
3. What are "Locators," and why are they called the "central piece" of Playwright?
4. How do I use `page.goto()` to navigate to a website?
5. How do I check if a button is visible or contains specific text using assertions?
6. What is the difference between "Headed" and "Headless" mode?
7. What is Vitest, and how is it different from other test runners like Jest?
8. How do I run tests for a specific browser, like Firefox or WebKit, from the command line?
9. What does the `expect` function do in a test?
10. How can I take a simple screenshot of a page during a test?
11. How do I run all tests in a single file?

---

### Phase 2: Junior (Configuration & Tooling)

_Focus: Workflow efficiency, basic debugging, and environment setup._

12. How do I use the Playwright VS Code extension to run and debug tests?
13. What is the purpose of the `playwright.config.ts` file?
14. How do I use `beforeEach` and `afterEach` hooks to clean up my tests?
15. What is "Auto-waiting," and how does it help prevent flaky tests?
16. How can I interact with browser dialogs like `alert()`, `confirm()`, or `prompt()`?
17. How do I use the **Playwright Inspector** to step through my code?
18. What is **UI Mode**, and how does it help with "time travel" debugging?
19. How do I mock a simple function in Vitest using `vi.fn()`?
20. What is the difference between `getByRole`, `getByLabel`, and `getByTestId`?
21. How do I group related tests together using `test.describe`?
22. How do I run only tests that match a specific title or tag using the CLI?
23. How do I use the "Pick Locator" tool to find the best selector for an element?

---

### Phase 3: Mid-Level (Patterns & Integration)

_Focus: Scaling the test suite, mocking, and advanced interactions._

24. What is the **Page Object Model (POM)**, and how does it improve test maintenance?
25. How do I intercept and mock an API request using `page.route()`?
26. What is the difference between **Parallelism** (workers) and **Sharding**?
27. How can I authenticate once and reuse that "Storage State" across all my tests?
28. How do I handle testing elements inside an `iframe` or multiple tabs?
29. How do I perform **Visual Regression Testing** (comparing screenshots to a baseline)?
30. How can I use the **Clock API** to manipulate time (e.g., testing a 2-hour timeout instantly)?
31. What are **Test Fixtures**, and how do they differ from traditional setup/teardown?
32. How do I handle file uploads and downloads in a Playwright test?
33. How does **Snapshot testing** work for accessibility trees (Aria Snapshots)?
34. How do I set up a basic GitHub Actions workflow to run my tests in CI?
35. How do I mock a standard browser API, like the Battery API, using `addInitScript`?
36. What are **Soft Assertions**, and when should I use them instead of standard ones?

---

### Phase 4: Senior (Architecture & Strategy)

_Focus: Extensibility, performance, migration, and complex environments._

37. How do I create a **Custom Fixture** to share complex logic (like a logged-in admin page)?
38. Compare using "Project Dependencies" vs. `globalSetup` for initializing a test suite.
39. How can I extend Vitest by creating **Custom Matchers** with `expect.extend`?
40. Explain the **"Out-of-Process"** architecture of Playwright and its benefits over Selenium.
41. How do I use the **Blob Reporter** and `merge-reports` to combine results from multiple CI machines?
42. How can I profile the performance of my Vitest tests to find slow imports or bottlenecks?
43. What is the strategy for mocking a module that is a dependency of another module in Vitest?
44. How do I automate and test a **Chrome Extension** using a persistent browser context?
45. What are the **Playwright Test Agents** (Planner, Generator, Healer), and how do they use AI?
46. How do I implement a **Custom Selector Engine** for proprietary DOM structures?
47. What are the key technical differences to consider when migrating from Puppeteer or Protractor?
48. How do I handle **Service Workers** when mocking network traffic to ensure requests aren't missed?
49. How can I use `test.info().annotations` to add custom metadata to my HTML reports?
50. How do I configure **Browser Mode** in Vitest to run component tests in a real browser instead of JSDOM?
    To get the most out of the **Master Tasks V1** architectural and project management files, you should ask questions that bridge the gap between the technical requirements and the product vision.

Since these files describe a complex system (likely a technical education platform), here are 40+ specific questions categorized by their respective Epics that your notebook (NotebookLM) can answer for you:

### **Foundation & Backend (Epics A, B, C, L)**

1. **Infrastructure:** According to Epic A, what specific tooling and structure are defined for the monorepo foundation?
2. **Database Hardening:** In Epic B, what are the primary "hardening" steps required to move the database from a prototype to a production-ready core?
3. **RBAC Logic:** How is the Role-Based Access Control (RBAC) designed in Epic C? What are the specific permissions for a 'Student' vs. an 'Admin'?
4. **Integration Layer:** How does Epic L describe the communication protocol between the Frontend and Backend? Is it REST, GraphQL, or something else?
5. **State Management:** What are the requirements for handling shared state across the monorepo according to the foundation Epic?

### **Lab & Content Engine (Epics D, E, F, K)**

6. **AI Lab Generation:** How does the system handle "AI-assisted" lab creation in Epic E? What are the manual fallback steps?
7. **Monaco Editor Integration:** In Epic K, how is the Monaco Editor integrated with the "FS Abstraction" (File System)? How does the student's code get saved?
8. **GitHub Synchronization:** According to Epic F, how does the platform sync lab content with GitHub? Is it a two-way sync?
9. **Hybrid Editor:** What is the "Hybrid Editor" mentioned in Epic K, and how does it differ from a standard IDE?
10. **Lesson Flow:** What are the core components of the "Lesson Creation System" defined in Epic D?

### **Validation & Security (Epics G, H, I)**

11. **Verification Engine:** According to Epic H, how does the platform verify that a student has actually completed a lab task correctly?
12. **Anti-Cheat Mechanisms:** What specific behaviors or technical signals is the "Anti-Cheat System" (Epic I) designed to detect?
13. **Abuse Control:** How does Epic I propose to handle users who attempt to abuse the terminal or cloud resources provided in the labs?
14. **Snapshot Previews:** In Epic G, what is the "Snapshot Preview" flow? How does it help a student see their progress?
15. **Push Flow:** What technical steps occur when a student "pushes" their code for final evaluation in Epic G?

### **User & Admin Experience (Epics J, M, N, O)**

16. **Student UX:** What are the "Critical Path" UX improvements for the lesson interface mentioned in Epic J?
17. **Admin Console:** What specific "Core Console" features are defined in Epic N for monitoring active student sessions?
18. **Content Operations:** According to Epic M, how do admins manage and version-control the lessons and labs?
19. **Session Operations:** How are "Admin Session Operations" (Epic O) different from standard user session management?
20. **Accessibility:** Does Epic J mention any specific standards (like WCAG) for the lesson interface?

### **High-Level Strategy & Mapping (Master Epics Map)**

21. **Epic Dependencies:** Which Epics are "blockers" for others? (e.g., Can Lab UI be finished before the Database Core?)
22. **Product Roadmap:** Based on the Master Epics Map, what is the recommended sequence of development for a Minimum Viable Product (MVP)?
23. **Cross-Epic Integration:** How does the "Push Flow" in Epic G interact with the "Verification Engine" in Epic H?
24. **Data Privacy:** What are the system-wide requirements for student data privacy mentioned across the epics?
25. **System Scalability:** How do these epics address the issue of scaling to thousands of concurrent lab users?

### **Deep-Dive Technical Challenges (For Senior Engineers)**

26. **FS Abstraction:** What is the technical complexity of the File System abstraction in Epic K? How does it handle latency?
27. **GitHub Webhooks:** How are GitHub webhooks utilized in the integration described in Epic F?
28. **Conflict Resolution:** How does the system handle code conflicts when a student edits the same lab across different devices?
29. **Resource Cleanup:** What is the lifecycle of a lab environment, and how is it "torn down" to save costs (Epic I/H)?
30. **Error Boundaries:** How are frontend errors handled when the Monaco editor fails to load in Epic K?

### **Strategic "What If" Questions for NotebookLM**

31. "Summarize the entire student journey from login to lab completion using data from Epics C, J, K, and G."
32. "Identify the three most technically risky tasks mentioned in the entire notebook."
33. "Create a checklist for an engineer tasked with implementing Epic H (Testing & Verification)."
34. "What are the common metadata fields required for both a 'Lesson' (Epic D) and a 'Lab' (Epic E)?"
35. "How is the 'AI' portion of the platform isolated from the 'Core Logic' to prevent system failures?"
36. "List all external API integrations required across all 15 Epics."
37. "Which Epic deals with real-time collaboration if two students want to work together?"
38. "What are the success metrics (KPIs) defined for the Admin Core Console in Epic N?"
39. "Compare the 'Manual' vs 'AI' lab creation workflows—what are the pros and cons of each as listed in Epic E?"
40. "Based on Epic I, what are the limitations placed on the student's terminal access?"

**Pro Tip:** If you are using NotebookLM, try asking it to **"Create a master project timeline based on the dependencies found in these Markdown files."** It is very good at extracting the logical order of operations.
To help you bridge the gap between your project’s architectural **Epics** and the **Playwright/Vitest** documentation, here are additional high-level questions focused on the specific systems and requirements mentioned in your project files.

---

### **Strategy & Architecture (EPIC-A: Monorepo & Tooling)**

1. **Monorepo Scalability**: How can I use the `projects` configuration in `playwright.config.ts` to manage separate test suites for different packages (e.g., `apps/web` vs. `packages/ui`) within the same repository?
2. **Resource Management**: How do I use the `workers` option and `test.describe.configure` to ensure that heavy tests (like the AI Lab system) don't consume all system resources during parallel execution?
3. **Environment Sync**: How can I use `webServer` in the config to automatically launch the backend services (EPIC-L) before running the frontend end-to-end tests?

### **Security & Access (EPIC-C: Auth & RBAC)**

4. **Multi-Role Testing**: How can I use multiple **Browser Contexts** within a single test to simulate a scenario where an "Admin" (EPIC-N) and a "Student" (EPIC-J) interact in real-time?
5. **State Isolation**: In a system with complex RBAC, how do I use `test.use({ storageState: ... })` to ensure one test's session data doesn't leak into another user's role-based permissions check?
6. **Permission Hardening**: How do I test that a user _cannot_ access a specific API endpoint using `APIRequestContext` to verify server-side RBAC enforcement?

### **User Experience & UI (EPIC-J/K: Lesson UX & Lab UI)**

7. **Monaco Editor Interaction**: For a code editor (EPIC-K), how do I use `locator.pressSequentially` or `locator.evaluate` to interact with complex components that don't behave like standard HTML textareas?
8. **Infinite List Stability**: How do I use `page.clock.runFor` or `waitForFunction` to reliably test "infinite scroll" or lazy-loaded lesson content (EPIC-J) without introducing flaky "sleep" timers?
9. **Visual Consistency**: How can I use `expect(page).toHaveScreenshot()` with a `maxDiffPixelRatio` to allow for minor rendering differences in the Monaco editor across different CI environments?

### **Integration & Verification (EPIC-H/L: Testing Engine & Integration)**

10. **Backend Verification**: After a student submits code in the Lab UI, how can I use `request.post` to verify that the **Verification Engine** (EPIC-H) correctly updated the database state?
11. **Network Resilience**: How do I use `page.route()` to simulate a 500 error from the backend (EPIC-L) and verify that the frontend displays the correct error message to the student?
12. **Asynchronous Polling**: If the Lab Verification engine (EPIC-H) takes several seconds to process code, how do I use `expect.poll` to wait for a specific success message without hitting a global timeout?

### **Advanced Controls (EPIC-I: Anti-Cheat & Abuse)**

13. **Detection Evasion**: How can I use `page.addInitScript()` to mock browser signals (like `navigator.webdriver`) or override global functions to test how the **Anti-Cheat system** (EPIC-I) reacts to potential bot activity?
14. **Time Manipulation**: For time-limited labs, how can I use the **Clock API** to "fast-forward" the browser's time to verify that a student is correctly kicked out of a session when their time expires?
15. **Event Interception**: How do I listen for `page.on('dialog')` to ensure that a student is properly warned before navigating away and losing their unsaved lab progress?

### **Data & Content Ops (EPIC-B/F/M: Database, GitHub, & Admin)**

16. **Database Seeding**: How do I use a **Global Setup** project to seed the database (EPIC-B) with a specific set of lessons before any tests begin, ensuring a clean slate for every run?
17. **GitHub Mocking**: How can I use `HAR files` to record and replay GitHub API responses (EPIC-F), allowing me to test the integration without hitting GitHub's rate limits or needing real OAuth tokens in CI?
18. **Admin Bulk Actions**: How can I use the **Test Generator (Codegen)** to quickly script the administrative "Bulk Delete" or "User Import" flows (EPIC-M) for faster test coverage?
