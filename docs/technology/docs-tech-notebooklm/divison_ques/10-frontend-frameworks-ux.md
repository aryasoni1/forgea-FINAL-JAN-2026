Based on the comprehensive documentation you provided—covering **Astro, Next.js (App Router), Tailwind CSS v4, shadcn/ui, Radix Themes, and MDX**—here is a structured list of 50 questions.

These are designed to test knowledge ranging from basic syntax to high-level architectural decision-making.

---

### Phase 1: Beginner Engineer (The Fundamentals)

_Focus: Basic syntax, project setup, and core concepts._

1. **Astro:** What is the "Islands Architecture" and how does it differ from traditional Single Page Applications (SPAs)?
2. **Next.js:** What is the purpose of the `app` directory in the Next.js App Router?
3. **Tailwind CSS:** How do you apply a style only when a user hovers over an element using Tailwind utility classes?
4. **shadcn/ui:** Is shadcn/ui a component library you install as a dependency (like MUI) or something else? Explain.
5. **Astro:** How do you create a new page in an Astro project?
6. **Next.js:** What is the difference between a Server Component and a Client Component by default?
7. **Tailwind CSS:** What does the `flex-col` utility do to a container?
8. **Radix Themes:** How do you wrap your application to ensure all Radix components share a consistent theme?
9. **MDX:** What is MDX, and how does it allow you to use React components inside Markdown?
10. **General CSS:** In Tailwind, what is the difference between `inline`, `block`, and `hidden`?

---

### Phase 2: Junior Engineer (Implementation & Interaction)

_Focus: Handling data, routing, and standard UI patterns._

11. **Next.js:** How do you navigate between pages in Next.js to ensure the transition remains a client-side navigation?
12. **Astro:** How do you pass variables from an Astro component's frontmatter (the `---` script) to a client-side `<script>` tag?
13. **Tailwind CSS:** How does Tailwind v4 handle responsive design (e.g., applying styles only for mobile vs. desktop)?
14. **shadcn/ui:** How do you add a new component (like a `Button` or `Dialog`) to your project using the shadcn CLI?
15. **Next.js:** What is the purpose of the `loading.tsx` file in a route segment?
16. **Astro:** Explain the use of the `slot` element within Astro components.
17. **Tailwind CSS:** What is the "Important Modifier" in Tailwind v4, and where should the `!` be placed in the class name?
18. **MDX:** How do you handle YAML frontmatter in an MDX file according to the documentation?
19. **Next.js:** How do you fetch data in a Server Component using the native `fetch` API?
20. **shadcn/ui:** How do you implement form validation using shadcn components and `react-hook-form`?
21. **Astro:** What are "Content Collections," and why should you use them instead of just importing Markdown files directly?
22. **Tailwind CSS:** How do you use "Arbitrary Values" (e.g., a specific pixel width) in a Tailwind class?
23. **Next.js:** What is a "Route Handler" (`route.ts`), and when would you use one?
24. **Radix Themes:** What are "Layout Primitives" like `Box`, `Flex`, and `Grid`, and how do they help with spacing?
25. **Accessibility:** What is the role of WAI-ARIA labels in making custom UI components accessible to screen readers?

---

### Phase 3: Mid-Level Engineer (Optimization & Logic)

_Focus: Performance, state management, and advanced features._

26. **Astro:** How do you use the `client:load` directive vs. `client:visible`? Which is better for performance?
27. **Next.js:** Explain the "Data Cache" vs. "Full Route Cache" in Next.js. How do they interact?
28. **Tailwind CSS:** How do you define custom design tokens (like a specific brand color) in Tailwind CSS v4 using the `@theme` directive?
29. **shadcn/ui:** How does shadcn/ui support Right-to-Left (RTL) languages, and what CLI configuration is required?
30. **Astro:** How can you use "Middleware" in Astro to intercept requests (e.g., for basic authentication)?
31. **Next.js:** What is the `use cache` directive (Experimental), and how does it differ from standard fetch caching?
32. **MDX:** How do you "inject" custom components to replace standard HTML elements (like `<h1>`) globally in MDX?
33. **Astro:** Explain how to add "Last Modified Time" to Markdown posts using a Remark plugin.
34. **Next.js:** How do you use `revalidatePath` or `revalidateTag` to update stale data after a Server Action?
35. **Tailwind CSS:** What are "Container Queries" in Tailwind, and how do they differ from standard Media Queries?
36. **Astro:** How do you share state between two different framework islands (e.g., a React component and a Svelte component) in the same Astro page?
37. **Next.js:** How do you implement "Parallel Routes" using slots (`@folder`)?
38. **shadcn/ui:** What is a "Registry Namespace," and how does it help in large-scale projects?
39. **Astro DB:** How do you define a database schema and seed data using Astro DB?
40. **General UX:** How do you implement "Prefetching" in Astro to make page transitions feel instantaneous?

---

### Phase 4: Senior Engineer (Architecture & Strategy)

_Focus: Scalability, security, and system design._

41. **Next.js:** Describe a strategy for "Self-Hosting" a Next.js application. Why is a reverse proxy (like Nginx) recommended?
42. **Astro:** How would you analyze and reduce the bundle size of a production Astro site?
43. **shadcn/ui:** How do you architect a "Monorepo" setup using shadcn/ui where UI components are shared across multiple apps (e.g., a `web` app and a `docs` app)?
44. **Next.js:** Discuss the security implications of using `Astro.request` or `NextRequest` headers. How do you prevent sensitive data leaks?
45. **Tailwind CSS:** How do you manage "Variant Stacking Order" changes in Tailwind v4 compared to v3?
46. **Next.js:** How does the "Model Context Protocol" (MCP) server integration in Next.js 16+ assist AI coding agents?
47. **Astro:** Explain the process of customizing file names in the build output (e.g., putting all JS in a `/js/` folder) using Vite configuration.
48. **Architecture:** When would you choose "On-demand Rendering" (SSR) over "Static Site Generation" (SSG) in a project that uses both Astro and Next.js?
49. **Accessibility:** How do you ensure a complex `Dialog` or `Popover` meets WAI-ARIA standards for focus management and keyboard navigation?
50. **MDX:** What are the security risks of allowing untrusted users to provide MDX content, and how would you sandbox the execution?
    To help you map your project requirements (the **EPICs**) to the technical capabilities of the documentation you provided (**Astro, Next.js, Tailwind, Radix, shadcn/ui**), I have generated 50 targeted questions.

These questions focus on the **Frontend Engineering decisions** required to build the specific systems mentioned in your task files.

---

### EPIC A: Monorepo & Developer Tooling

_Relates to: Project Structure, shadcn/ui Monorepo, and Editor Setup._

1. **Beginner:** How does the `src/` folder convention in both Astro and Next.js help organize the codebase for a new contributor?
2. **Junior:** In a monorepo setup using shadcn/ui, how do you specify the `baseUrl` in `tsconfig.json` to allow clean imports like `@/components/ui/button`?
3. **Mid-Level:** Explain the benefit of using `@workspace/ui` in a monorepo versus installing component libraries as standard npm packages.
4. **Senior:** How would you architect the shared styles in a monorepo so that both an Astro-based landing page and a Next.js-based dashboard use the same Tailwind v4 theme variables?
5. **Senior:** What are the implications of setting `transpilePackages` in `next.config.js` for local packages within your developer tooling foundation?

---

### EPIC B & L: Database & API Integration

_Relates to: Astro DB, Data Fetching, Server Actions, and Route Handlers._

6. **Beginner:** What is the difference between fetching data in a `.astro` component script versus a standard client-side `fetch()` call?
7. **Junior:** How do you define a table schema in Astro DB and use the `db.select()` method to display data on a frontend page?
8. **Junior:** In Next.js, how do you use the `formData` object within a Server Action to handle simple form submissions?
9. **Mid-Level:** How can you use `Astro.callAction` to trigger server-side logic from an Astro page without creating a separate API endpoint?
10. **Mid-Level:** Explain how to use `revalidatePath` to ensure the frontend reflects a database change immediately after an "Admin Update" operation.
11. **Senior:** Discuss the trade-offs of using "Server Islands" for dynamic database content vs. standard SSR for a high-traffic lesson platform.

---

### EPIC C & I: Auth, RBAC & Anti-Cheat

_Relates to: Middleware, Unauthorized functions, and Sessions._

12. **Beginner:** What is the role of `middleware.ts` in protecting private routes from unauthenticated users?
13. **Junior:** How do you use the `unauthorized()` function in Next.js to trigger a 401 error page when a student tries to access an Admin Epic?
14. **Junior:** How do you read user session data (like an `auth_token`) from headers using the `Astro.request.headers` API?
15. **Mid-Level:** How would you implement a "Gate" in middleware to prevent students from accessing API Route Handlers during an active lab?
16. **Mid-Level:** Explain how to define TypeScript types for `App.SessionData` to ensure type safety when checking user roles (Student vs. Admin).
17. **Senior:** How would you implement an anti-abuse system at the Edge using Next.js Middleware to rate-limit students during lab creation?

---

### EPIC D, E & K: Content & Lab UI (Monaco/MDX)

_Relates to: MDX, Syntax Highlighting, Monaco Editor, and Content Collections._

18. **Beginner:** How do you add a custom syntax highlighting theme to an Astro project using Shiki?
19. **Junior:** How do you use the `Content` component returned by Astro's `render()` function to display a Markdown-based lesson?
20. **Junior:** In MDX, how can you "inject" a custom React component to replace all standard `<a>` tags with specialized "Lab Links"?
21. **Mid-Level:** How would you use Nano Stores to sync the state between a Monaco-based editor island and a terminal preview island in the Lab UI?
22. **Mid-Level:** Explain the process of using `import.meta.glob` to dynamically import image assets for an AI-generated lab preview.
23. **Senior:** How would you design a "Hybrid Editor" using MDX where some parts are static Markdown and others are interactive shadcn/ui components?
24. **Senior:** What is the security risk of using the `evaluate` function in MDX for user-generated lab content, and how would you mitigate it?

---

### EPIC J & G: User Experience & Performance

_Relates to: View Transitions, Streaming, Prefetch, and Image Optimization._

25. **Beginner:** How do you add a "reading time" property to your Markdown files using a Remark plugin?
26. **Junior:** How does the `next/image` component prevent layout shift (CLS) during the "Snapshot Preview" loading phase?
27. **Junior:** How do you implement a "Loading Skeleton" in Next.js using a `loading.tsx` file for a route segment?
28. **Mid-Level:** How can you use "HTML Streaming" in Astro to show the lesson text while the heavy "Lab Environment" is still loading?
29. **Mid-Level:** Explain the difference between `data-astro-prefetch="viewport"` and `data-astro-prefetch="hover"` for optimizing navigation between lessons.
30. **Mid-Level:** How do you use the `transition:persist` directive in Astro to keep a video player or terminal state active across page navigations?
31. **Senior:** How would you use the `Analyze bundle size` tools to identify if a large editor library (like Monaco) is bloating your initial page load?
32. **Senior:** Architect a solution for "Art Direction" where lab screenshots appear differently on mobile vs. desktop using the `<picture>` tag and Astro's `getImage`.

---

### EPIC N & O: Admin Core & Session Ops

_Relates to: Tables, Dialogs, Forms, and Tabbed Interfaces._

33. **Beginner:** How do you use the shadcn/ui `Table` component to list all active student sessions?
34. **Junior:** How do you implement a "Destructive Alert" in shadcn/ui to confirm when an admin wants to terminate a student session?
35. **Junior:** How do you use the `Tabs` component to switch between "Live Sessions" and "Past Logs" in the Admin Console?
36. **Mid-Level:** How would you build a complex form for "Lab Creation" using `react-hook-form` and shadcn/ui `FormField` components?
37. **Mid-Level:** Explain how to use the `Popover` component to show student-specific metadata without navigating away from the main session table.
38. **Senior:** How would you optimize a data table with 1,000+ session rows using `@tanstack/react-table` inside a shadcn-styled wrapper?

---

### Cross-Cutting Documentation Questions

_Relates to: AI Tools, RTL Support, and Edge Runtime._

39. **Beginner:** How can you use the "Dev Toolbar" in Astro to audit your project for accessibility issues?
40. **Junior:** How do you configure a project for Right-to-Left (RTL) support using the shadcn CLI?
41. **Junior:** What is the `AGENTS.md` file used for in Next.js, and how does it help AI coding tools understand your project structure?
42. **Mid-Level:** How do you use environment variables to keep your API keys secret from the client-side bundle in an Astro project?
43. **Mid-Level:** How does the "Next.js MCP Server" integration allow an AI agent to see build errors in real-time?
44. **Senior:** What are the limitations of the "Edge Runtime" in Next.js when trying to use Node.js-specific libraries for lab verification?
45. **Senior:** How do you customize hashed filenames in the build output to improve long-term caching for static lab assets?

---

### Critical Thinking / Scenario Questions

46. **Junior:** A student claims a lesson page is blank. How would you use the Astro "Inspect" app in the Dev Toolbar to see if the content island hydrated correctly?
47. **Mid-Level:** You need to implement a "Code Preview" that updates as the user types. Would you use a Server Action or a Client-side state (Nano Stores)? Explain based on the documentation.
48. **Mid-Level:** If you are self-hosting your Next.js application, why is it recommended to use a reverse proxy like Nginx in front of it?
49. **Senior:** You are building a "Lesson Timeline." How would you combine Tailwind’s `z-index` utilities and `sticky` positioning to ensure the header stays visible while scrolling through long MDX content?
50. **Senior:** Based on the "Why Astro?" document, if your lab platform needs high interactivity but the documentation is 90% text, how would you structure your framework choice?
