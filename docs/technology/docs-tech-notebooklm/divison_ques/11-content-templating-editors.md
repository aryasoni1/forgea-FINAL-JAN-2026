These questions range from basic usage to complex architectural and security-oriented queries.

### Beginner: Fundamental Concepts & Syntax

1. **Monaco:** What is the Monaco Editor, and how does it relate to VS Code?
2. **Jinja:** What are the default delimiters used for statements vs. expressions in Jinja?
3. **MDX:** What does MDX stand for, and what is its primary purpose?
4. **Markdown:** What is the difference between CommonMark and GitHub Flavored Markdown (GFM)?
5. **YAML:** What is YAML, and how is it typically used in a "frontmatter" block?
6. **Jinja:** How do you write a comment in a Jinja template so it doesn't appear in the output?
7. **Monaco:** How do you change the theme (e.g., light vs. dark) in a Monaco Editor instance?
8. **MDX:** How do you write a standard Markdown heading inside an `.mdx` file?
9. **General:** What is the purpose of a "Syntax Tree" when processing content?
10. **Jinja:** How do you print a variable named `user_name` to the screen in a template?
11. **Monaco:** What is the purpose of the `monaco-react` package for React developers?
12. **Markdown:** How do you create a link in standard Markdown syntax?

### Junior: Integration & Basic Configuration

13. **MDX:** How do you import and use a custom React component inside an MDX file?
14. **Jinja:** How do you use a `for` loop to iterate over a list of items in a template?
15. **Monaco:** How do you configure the editor to support a specific language like TypeScript or JSON?
16. **Unified:** What is the role of `remark` vs. `rehype` in the `unified` ecosystem?
17. **Jinja:** What is the "Template Inheritance" (`{% extends %}`) feature used for?
18. **MDX:** How do you enable GFM features like tables or task lists in an MDX setup?
19. **Monaco:** What is "Tab Trapping," and why is it important for web accessibility?
20. **YAML:** How does the `gray-matter` library help in parsing files with frontmatter?
21. **Jinja:** What is a "filter" in Jinja, and how would you use one to uppercase a string?
22. **MDX:** What happens if you try to use a component in MDX without importing it or providing it via a provider?
23. **Monaco:** How do you use the `onMount` prop in `monaco-react` to get a reference to the editor instance?
24. **Markdown:** How do you create a "fenced code block" in GFM?
25. **Jinja:** How do you provide a default value for a variable using the `default` filter?

### Mid-Level: Customization, Security & Performance

26. **Jinja:** What is the `SandboxedEnvironment`, and when should it be used over a standard environment?
27. **MDX:** Explain the difference between "compile-time" and "runtime" syntax highlighting.
28. **Monaco:** What is a "Monarch" definition, and how is it used to create custom syntax highlighting?
29. **Unified:** How do you use the `vfile` object to track metadata about a processed document?
30. **Jinja:** How do you create a custom "Macro" to reuse a block of HTML across different templates?
31. **MDX:** How does the `MDXProvider` allow you to swap standard Markdown elements (like `h1`) with custom components?
32. **Monaco:** How do you programmatically set or get the value of the editor using its API?
33. **Security:** How does `MarkupSafe` help prevent Cross-Site Scripting (XSS) in Jinja templates?
34. **MDX:** What is "MDX on demand," and how do you implement it for server-side rendering (SSR)?
35. **Jinja:** How do you use the `NativeEnvironment` to return Python types (like lists or dicts) instead of strings?
36. **Monaco:** How do you implement a "Diff Editor" to show side-by-side changes between two strings?
37. **CommonMark:** Why is a formal specification like CommonMark needed instead of relying on the original `Markdown.pl`?
38. **MDX:** How do you handle math equations (LaTeX) in MDX using `remark-math` and `rehype-katex`?

### Senior: Architecture, AST & Security Hardening

39. **Monaco:** How does the editor use Web Workers to prevent language services (like IntelliSense) from blocking the UI thread?
40. **Jinja:** Describe the process of writing a custom Extension that adds a new tag to the Jinja parser.
41. **Architecture:** How would you architect a secure platform that allows users to upload and render their own untrusted MDX files?
42. **Unified:** Explain the "Content as Structured Data" philosophy and how `unist` nodes are transformed across the pipeline.
43. **Jinja Security:** How do you implement "Operator Intercepting" to disable dangerous operations like power (`**`) in a sandbox?
44. **MDX:** What are the technical challenges of "Interleaving" (mixing Markdown blocks and JSX tags) during parsing?
45. **Monaco:** How would you optimize a Monaco instance to handle extremely large files (100k+ lines) without crashing the browser?
46. **Jinja Performance:** How does Jinja's bytecode cache improve performance in high-traffic applications?
47. **MDX Architecture:** Explain how `@mdx-js/mdx` compiles MDX syntax into a JavaScript function-body for execution.
48. **YAML Spec:** What are the key differences between YAML 1.1 and YAML 1.2.2, specifically regarding JSON compatibility?
49. **Monaco ESM:** How do you properly configure a project to use the ESM version of Monaco with a bundler like Vite or esbuild?
50. **AST Manipulation:** How can you use the Jinja Meta API (`find_undeclared_variables`) to analyze a template before it is rendered?
    To complement your existing list, these questions focus specifically on the **Forgea architectural invariants**, **lock semantics**, and the technical implementation details found within the specific Epics (D, E, K, M, N) and the documentation provided in your notebook.

### Beginner: Forgea Project Structure & Standards

1. **Master Map:** According to the "Master Epics Map," what is the difference between a **HARD** lock and a **SOFT** lock on an epic?
2. **Monaco UI:** In the `monaco-react` package used for the Lab UI, what is the difference between the `beforeMount` and `onMount` props?
3. **Jinja Basics:** In Jinja templates, how do you escape the default delimiters (like `{{`) if you want them to appear as literal text?
4. **Epic D:** What are the two types of editable fields defined in the Lesson schema (D2)?
5. **MDX Syntax:** How do you write a thematic break (horizontal rule) in MDX, and what is its standard HTML equivalent?
6. **Master Map:** Which parallel group is responsible for "Repo root" and "Tooling configs," and can it run in parallel with other epics?
7. **Jinja Filters:** What does the `striptags` filter do to a string?

### Junior: Implementation & Feature Logic

8. **Epic K (Virtual FS):** What are the three specific "path markings" applied to the virtual repo tree before it is served to the Lab UI?
9. **Epic E (Labs):** What is the "single primary concept" rule in Feature E2, and why is it enforced?
10. **MDX Troubleshooting:** What causes the MDX error "Unexpected closing slash / in tag, expected an open tag first"?
11. **Epic D (RAG):** Which specific Vector Database was chosen for Forgea’s lesson generation, and what is the purpose of "content chunking" there?
12. **Monaco Accessibility:** How does a user navigate through "suggestions" in Monaco without losing focus in a screen reader?
13. **Epic M (Admin):** What are the three states a lesson can have in the Admin Content Operations workflow?
14. **Jinja Inheritance:** Why does a child template's content before an `{% extends %}` tag sometimes lead to "surprising behavior"?
15. **Epic K (Monaco):** Which specific features of the Monaco Editor must be **disabled** to maintain the integrity of the lab environment?

### Mid-Level: Security, Integration & State

16. **Epic E (Failure Design):** What is the difference between "allowed" and "forbidden" failure types in Feature E3, and why must failures be deterministic?
17. **Jinja Security:** In a `SandboxedEnvironment`, which specific mutable sequence methods (like `clear` or `pop`) are explicitly disallowed to prevent template abuse?
18. **Epic D (Generation):** What is the "review status" lifecycle for a generated lesson (D6)?
19. **MDX Components:** How do you use the `components` prop in MDX to swap a standard `h1` with a custom `FancyLink`?
20. **Epic N (Oversight):** Which "anti-cheat signals" are listed as visible to an admin in the Core Console?
21. **CommonMark vs GFM:** Which spec adds support for "Task list items" and "Tables," and how are they enabled in MDX?
22. **Epic K (Permissions):** At what point does the Lab UI validate "path on save" to prevent unauthorized file writes?
23. **Jinja Context:** How do you use a "Cycler" in Jinja to alternate CSS classes in a table row?

### Senior: Architecture, Invariants & System Integrity

24. **Global Rule:** In Forgea, what is the "Execution Truth," and can an Admin modify the outcome of a session?
25. **Epic E (Locking):** Why is `forgea.config.json` considered **HARD LOCKED** after a lab is published?
26. **Jinja AST:** How can the `find_referenced_templates` Meta API be used to audit a complex template inheritance tree?
27. **MDX Interleaving:** Explain the rule regarding "markdown blocks" vs "markdown inlines" when placing text inside a JSX `<div>`.
28. **Epic K (Virtual FS):** How does the system prevent "path traversal attempts" and "symlink resolution" in the browser-based editor?
29. **Epic D (Validation):** What is the "source grounding" requirement in the section-level prompt templates (D5)?
30. **Jinja Sandboxing:** Describe how to implement "Operator Intercepting" to disable the power (`**`) operator in a custom environment.
31. **MDX Architecture:** What is the `function-body` output format, and why is it used for "MDX on demand"?
32. **Epic I (Integrity):** According to the Master Map, what is the core philosophy of the "Anti-Cheat & Abuse Control" regarding user punishment?
33. **Monaco ESM:** Why is it necessary to configure a `getWorkerUrl` when integrating the ESM version of Monaco into a custom bundler?
