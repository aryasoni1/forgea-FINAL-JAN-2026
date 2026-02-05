Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Design and build your Turborepo.

Architecting a monorepo is a careful process. Through these guides, you'll learn how to design and build a monorepo that will make every team faster - no matter the size.

The guides in this section will take you through building a multi-package workspace, commonly referred to as a monorepo. They are meant to be read in order as they build on top of the knowledge from previous guides, but you can read them in any order or skip to the pages specific to your use case.

By the time you've read through all of this section, you should have a good understanding of how to design and build a monorepo with Turborepo.

Turborepo can also be used to speed up single-package workspaces. Visit the single-package workspace section for more information.

From zero to turbo

1. Structuring a repository
   Design the directory structure of your monorepo.

2. Managing dependencies
   Using dependencies for sharing code

3. Creating an internal package
   Make a package in your repository

4. Configuring tasks
   Design your task patterns

5. Running tasks
   Run tasks as fast as possible

6. Caching
   Never do the same work twice

7. Developing apps
   Run many apps in parallel

8. Using environment variables
   Account for variables in your environment

9. Constructing CI
   Ship your applications

10. Upgrading
    Upgrading your Turborepo version

11. Understanding your repository
    Understanding your codebase with Turborepo

More guides
We also have more guides centered around specific tools, use cases, and other topics.

Editor integration

Making the most of Turborepo

Structuring a repository

Start by creating a repository using the conventions of the ecosystem.

9,494,894

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
From zero to turbo
More guides
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Crafting your repository
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Caching
Learn about caching in Turborepo.

Turborepo uses caching to speed up builds, ensuring you never do the same work twice. When your task is cacheable, Turborepo will restore the results of your task from cache using a fingerprint from the first time the task ran.

12 tasks are being ran in 3 packages, resulting in a ">>> FULL TURBO" cache hit. The total time it takes to restore these tasks from cache is 80 milliseconds.

Turborepo's caching results in significant time savings when working locally - and is even more powerful when Remote Caching is enabled, sharing a cache among your entire team and CI.

On this page, you'll learn:

How to hit your first Turborepo cache
How to enable Remote Caching
What Turborepo uses for the inputs and outputs to a hash
How to troubleshoot caching issues
Turborepo assumes that your tasks are deterministic. If a task is able to produce different outputs given the set of inputs that Turborepo is aware of, caching may not work as expected.

Hit your first Turborepo cache
You can try out Turborepo's caching behavior in three steps:

Create a new Turborepo project
Use npx create-turbo@latest and follow the prompts to create a new Turborepo.

Terminal

npx create-turbo@latest
Run a build for the first time
If you have turbo installed globally, run turbo build in your repository.

Alternatively, you can run the build script in package.json using your package manager.

pnpm
yarn
npm
bun
Terminal

pnpm run build
This will result in a cache miss, since you've never ran turbo before with this set of inputs in this repository. The inputs are turned into a hash to check for in your local filesystem cache or in the Remote Cache.

Hit the cache
Run turbo build again. You will see a message like this:

A terminal window showing two tasks that have been ran through turbo. They successfully complete in 116 milliseconds.

Because the inputs' fingerprint is already in the cache, there's no reason to rebuild your applications from zero again. You can restore the results of the previous build from cache, saving resources and time.

Remote Caching
Turborepo stores the results of tasks in the .turbo/cache directory on your machine. However, you can make your entire organization even faster by sharing this cache with your teammates and CI.

To learn more about Remote Caching and its benefits, visit the Remote Caching page.

Enabling Remote Cache
First, authenticate with your Remote Cache provider:

Terminal

npx turbo login
Then, link the repository on your machine to Remote Cache:

Terminal

npx turbo link
Now, when you run a task, Turborepo will automatically send the outputs of the task to Remote Cache. If you run the same task on a different machine that is also authenticated to your Remote Cache, it will hit cache the first time it runs the task.

For information on how to connect your CI machines to Remote Cache, visit the Constructing CI guide.

By default, Turborepo uses Vercel Remote Cache with zero configuration. If you'd like to use a different Remote Cache, visit the Remote Caching API documentation

Git Worktree Cache Sharing
When working with Git worktrees, Turborepo automatically shares the local filesystem cache between the main worktree and any linked worktrees. This enables:

Cache hits across branches: Work done on one branch is available when you switch to another branch in a different worktree
Reduced disk usage: Avoids duplicate cache entries across worktrees
Faster iteration: Switching between feature branches benefits from existing cache
How it works
Git worktrees allow you to have multiple working directories attached to the same repository, each checked out to a different branch. When you create a linked worktree with git worktree add, Turborepo detects this configuration and automatically redirects the cache to the main worktree's .turbo/cache directory.

Terminal

# Create a linked worktree for a feature branch

git worktree add ../my-feature feature-branch

# Run turbo in the linked worktree - cache is shared with main worktree

cd ../my-feature
turbo build
When worktree cache sharing is active, you'll see a message in the output:

• Remote caching enabled, using shared worktree cache

If you set an explicit cacheDir in your turbo.json, worktree cache sharing is disabled and each worktree will use its own cache directory as specified.

With Remote Caching
Git worktree cache sharing works alongside Remote Caching. When both are enabled:

Local cache is shared between worktrees on the same machine
Remote cache is shared across all machines and CI
This means a task built in one worktree can be restored from the shared local cache in another worktree instantly, without a network request. If the local cache doesn't have the artifact, Turborepo will fall back to the Remote Cache as usual.

What gets cached?
Turborepo caches two types of outputs: Task outputs and Logs.

Task outputs
Turborepo caches the file outputs of a task that are defined in the outputs key of turbo.json. When there's a cache hit, Turborepo will restore the files from the cache.

The outputs key is optional, see the API reference for how Turborepo behaves in this case.

Providing file outputs

If you do not declare file outputs for a task, Turborepo will not cache them. This might be okay for some tasks (like linters) - but many tasks produce files that you will want to be cached.

If you're running into errors with files not being available when you hit cache, make sure that you have defined the outputs for your task.

Logs
Turborepo always captures the terminal outputs of your tasks, restoring those logs to your terminal from the first time that the task ran.

You can configure the verbosity of the replayed logs using the --output-logs flag or outputLogs configuration option.

Task inputs
Inputs are hashed by Turborepo, creating a "fingerprint" for the task run. When "fingerprints" match, running the task will hit the cache.

Under the hood, Turborepo creates two hashes: a global hash and a task hash. If either of the hashes change, the task will miss cache.

Global hash inputs
Input Example
Resolved task definition from root turbo.json and package turbo.json Changing outputs in either root turbo.json or Package Configuration
Lockfile changes that affect the Workspace root Updating dependencies in root package.json will cause all tasks to miss cache
globalDependencies file contents Changing ./.env when it is listed in globalDependencies will cause all tasks to miss cache
Values of variables listed in globalEnv Changing the value of GITHUB_TOKEN when it is listed in globalEnv
Flag values that affect task runtime Using behavior-changing flags like --cache-dir, --framework-inference, or --env-mode
Arbitrary passthrough arguments turbo build -- --arg=value will cause all tasks to miss cache when compared to either turbo build or turbo build -- --arg=diff (including dependencies of build that did not receive --arg=value)
Package hash inputs
Input Example
Package Configuration changes Changing a package's turbo.json
Lockfile changes that affect the package Updating dependencies in a package's package.json
Package's package.json changes Updating the name field in a package's package.json
File changes in source control Writing new code in src/index.ts
Troubleshooting
Using dry runs
Turborepo has a --dry flag that can be used to see what would happen if you ran a task without actually running it. This can be useful for debugging caching issues when you're not sure which tasks you're running.

For more details, visit the --dry API reference.

Using Run Summaries
Turborepo has a --summarize flag that can be used to get an overview of all of a task's inputs, outputs, and more. Comparing two summaries will show why two task's hashes are different. This can be useful for:

Debugging inputs: There are many inputs to a task in Turborepo. If a task is missing cache when you expect it to hit, you can use a Run Summary to check which inputs are different that you weren't expecting.
Debugging outputs: If cache hits aren't restoring the files you're expecting, a Run Summary can help you understand what outputs are being restored from cache.
Summaries viewer

While there is not a Turborepo-native Run Summaries UI viewer, there are several community-built tools available:

https://turbo.nullvoxpopuli.com - Web-based UI viewer for Run Summaries
turborepo-summary - Generate human-readable reports from Turborepo run summary JSON output
turborepo-summary-action - GitHub Action wrapping turborepo-summary to append them to GitHub Actions Job Summary
Turning off caching
Sometimes, you may not want to write the output of tasks to the cache. This can be set permanently for a task using "cache": false or for a whole run using the --cache <options> flag.

Overwriting a cache
If you want to force turbo to re-execute a task that has been cached, use the --force flag. Note that this disables reading the cache, not writing.

Caching a task is slower than executing the task
It's possible to create scenarios where caching ends up being slower than not caching. These cases are rare, but a few examples include:

Tasks that execute extremely fast: If a task executes faster than a network round-trip to the Remote Cache, you should consider not caching the task.
Tasks whose output assets are enormous: It's possible to create an artifact that is so big that the time to upload or download it exceeds the time to regenerate it, like a complete Docker Container. In these cases, you should consider not caching the task.
Scripts that have their own caching: Some tasks have their own internal caching behavior. In these cases, configuration can quickly become complicated to make Turborepo's cache and the application cache work together.
While these situations are rare, be sure to test the behavior of your projects to determine if disabling caching in specific places provides a performance benefit.

Next steps
Now that you've seen how Turborepo's caching makes your repository faster, let's take a look at how to develop applications and libraries in your Turborepo.

Running tasks

Learn how to run tasks in your repository through the `turbo` CLI.

Developing applications

Learn how to develop applications in your repository.

9,495,192

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Hit your first Turborepo cache
Create a new Turborepo project
Run a build for the first time
Hit the cache
Remote Caching
Enabling Remote Cache
Git Worktree Cache Sharing
How it works
With Remote Caching
What gets cached?
Task outputs
Logs
Task inputs
Global hash inputs
Package hash inputs
Troubleshooting
Using dry runs
Using Run Summaries
Turning off caching
Overwriting a cache
Caching a task is slower than executing the task
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Caching
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Developing applications
Learn how to develop applications in your repository.

Developing applications in a monorepo unlocks powerful workflows, enabling you to make atomic commits to source control with easy access to code.

Most development tasks are long-running tasks that watch for changes to your code. Turborepo enhances this experience with a powerful terminal UI and other capabilities like:

Configuration for dev tasks
Interacting with tasks
Watch Mode
Running setup scripts
Filtering tasks to run a subset of your packages
Configuring development tasks
Defining a development task in turbo.json tells Turborepo that you'll be running a long-lived task. This is useful for things like running a development server, running tests, or building your application.

To register a dev task, add it to your turbo.json with two properties:

./turbo.json

{
"tasks": {
"dev": {
"cache": false,
"persistent": true
}
}
}
"cache": false: Tells Turborepo to not attempt to cache the results of the task. Since this is a development task, you're likely to be making frequent changes to your code, so caching the results is not useful.
"persistent": true: Tells Turborepo to keep the task running until you stop it. This key serves as a signal for your terminal UI to treat the task as long-running and interactive. Additionally, it prevents you from accidentally depending on a task that will not exit.
You can now run your dev task to start your development scripts in parallel:

Terminal

turbo dev
Running setup tasks before dev
You may also want to run scripts that set up your development environment or pre-build packages. You can make sure those tasks run before the dev task with dependsOn:

./turbo.json

{
"tasks": {
"dev": {
"cache": false,
"persistent": true,
"dependsOn": ["//#dev:setup"]
},
"//#dev:setup": {
"outputs": [".codegen/**"]
}
}
}
In this example, we're using a Root Task but you can use the same idea for arbitrary tasks in packages.

Running a specific application
The --filter flag allows you to pick a subset of your Package Graph so you can run your dev task for a specific application and its dependencies:

Terminal

turbo dev --filter=web
Using the terminal UI
Turborepo's terminal UI enables a number of features that create a highly interactive experience around your tasks.

Customizing your view
You can quickly adjust the UI to your needs using keybinds.

Keybind Action
m Toggle popup listing keybinds
↑/↓ Select the next/previous task in the task list
j/k Select the next/previous task in the task list
p Toggle selection pinning for selected task
h Toggle visibility of the task list
c When logs are highlighted, copy selection to the system clipboard
u/d Scroll logs up and down
Interacting with tasks
Some of your tools may allow you to type input into them. Examples of this include Drizzle ORM's interactive migrations or Jest's filtering and re-running of test suites.

You can interact with tasks that are marked as interactive to give them input.

Keybind Action
i Begin interacting
Ctrl+z Stop interacting
Watch Mode
Many tools have a built-in watcher, like tsc --watch, that will respond to changes in your source code. However, some don't.

turbo watch adds a dependency-aware watcher to any tool. Changes to source code will follow the Task Graph that you've described in turbo.json, just like all your other tasks.

For example, using a package structure like create-turbo with the following tasks and scripts:

turbo.json
packages/ui
apps/web
turbo.json

{
"tasks": {
"dev": {
"persistent": true,
"cache": false
},
"lint": {
"dependsOn": ["^lint"]
}
}
}
When you run turbo watch dev lint, you'll see the lint scripts are re-run whenever you make source code changes, despite ESLint not having a built-in watcher. turbo watch is also aware of internal dependencies, so a code change in @repo/ui will re-run the task in both @repo/ui and web.

The Next.js development server in web and the TypeScript Compiler's built-in watcher in @repo/ui will continue to work as usual, since they are marked with persistent.

For more information, visit the turbo watch reference.

Limitations
Teardown tasks
In some cases, you may want to run a script when the dev task is stopped. Turborepo is unable to run those teardown scripts when exiting because turbo exits when your dev tasks exit.

Instead, create a turbo dev:teardown script that you run separately after you've exited your primary turbo dev task.

Next steps
Once you have a version of your application that you'd like to deploy, it's time to learn how to configure environment variables in Turborepo.

Caching

Learn about caching in Turborepo.

Using environment variables

Learn how to handle environments for your applications.

9,496,147

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Configuring development tasks
Running setup tasks before dev
Running a specific application
Using the terminal UI
Customizing your view
Interacting with tasks
Watch Mode
Limitations
Teardown tasks
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Developing applications
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Structuring a repository
Start by creating a repository using the conventions of the ecosystem.

turbo is built on top of Workspaces, a feature of package managers in the JavaScript ecosystem that allows you to group multiple packages in one repository.

Following these conventions is important because it allows you to:

Lean on those conventions for all your repo's tooling
Quickly, incrementally adopt Turborepo into an existing repository
In this guide, we'll walk through setting up a multi-package workspace (monorepo) so we can set the groundwork for turbo.

Getting started
Setting up a workspace's structure can be tedious to do by hand. If you're new to monorepos, we recommend using create-turbo to get started with a valid workspace structure right away.

pnpm
yarn
npm
bun
Terminal

pnpm dlx create-turbo@latest
You can then review the repository for the characteristics described in this guide.

Anatomy of a workspace
In JavaScript, a workspace can either be a single package or a collection of packages. In these guides, we'll be focusing on a multi-package workspace, often called a "monorepo".

Below, the structural elements of create-turbo that make it a valid workspace are highlighted.

pnpm
yarn
npm
bun
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
turbo.json
apps
docs
package.json
web
packages
Minimum requirements
Packages as described by your package manager
A package manager lockfile
Root package.json
Root turbo.json
package.json in each package
Specifying packages in a monorepo
Declaring directories for packages
First, your package manager needs to describe the locations of your packages. We recommend starting with splitting your packages into apps/ for applications and services and packages/ for everything else, like libraries and tooling.

pnpm
yarn
npm
bun
pnpm-workspace.yaml

packages:

- "apps/\*"
- "packages/\*"
  → pnpm workspace documentation
  Using this configuration, every directory with a package.json in the apps or packages directories will be considered a package.

Turborepo does not support nested packages like apps/** or packages/** due to ambiguous behavior among package managers in the JavaScript ecosystem. Using a structure that would put a package at apps/a and another at apps/a/b will result in an error.

If you'd like to group packages by directory, you can do this using globs like packages/_ and packages/group/_ and not creating a packages/group/package.json file.

package.json in each package
In the directory of the package, there must be a package.json to make the package discoverable to your package manager and turbo. The requirements for the package.json of a package are below.

Root package.json
The root package.json is the base for your workspace. Below is a common example of what you would find in a root package.json:

pnpm
yarn
npm
bun
./package.json

{
"private": true,
"scripts": {
"build": "turbo run build",
"dev": "turbo run dev",
"lint": "turbo run lint"
},
"devDependencies": {
"turbo": "latest"
},
"packageManager": "pnpm@9.0.0"
}
Root turbo.json
turbo.json is used to configure the behavior of turbo. To learn more about how to configure your tasks, visit the Configuring tasks page.

Package manager lockfile
A lockfile is key to reproducible behavior for both your package manager and turbo. Additionally, Turborepo uses the lockfile to understand the dependencies between your Internal Packages within your Workspace.

If you do not have a lockfile present when you run turbo, you may see unpredictable behavior.

Anatomy of a package
It's often best to start thinking about designing a package as its own unit within the Workspace. At a high-level, each package is almost like its own small "project", with its own package.json, tooling configuration, and source code. There are limits to this idea—but its a good mental model to start from.

Additionally, a package has specific entrypoints that other packages in your Workspace can use to access the package, specified by exports.

package.json for a package
name
The name field is used to identify the package. It should be unique within your workspace.

It's best practice to use a namespace prefix for your Internal Packages to avoid conflicts with other packages on the npm registry. For example, if your organization is named acme, you might name your packages @acme/package-name.

We use @repo in our docs and examples because it is an unused, unclaimable namespace on the npm registry. You can choose to keep it or use your own prefix.

scripts
The scripts field is used to define scripts that can be run in the package's context. Turborepo will use the name of these scripts to identify what scripts to run (if any) in a package. We talk more about these scripts on the Running Tasks page.

exports
The exports field is used to specify the entrypoints for other packages that want to use the package. When you want to use code from one package in another package, you'll import from that entrypoint.

For example, if you had a @repo/math package, you might have the following exports field:

./packages/math/package.json

{
"exports": {
".": "./src/constants.ts",
"./add": "./src/add.ts",
"./subtract": "./src/subtract.ts"
}
}
Note that this example uses the Just-in-Time Package pattern for simplicity. It exports TypeScript directly, but you might choose to use the Compiled Package pattern instead.

The exports field in this example requires modern versions of Node.js and TypeScript.

This would allow you to import add and subtract functions from the @repo/math package like so:

./apps/my-app/src/index.ts

import { GRAVITATIONAL_CONSTANT, SPEED_OF_LIGHT } from "@repo/math";
import { add } from "@repo/math/add";
import { subtract } from "@repo/math/subtract";
Using exports this way provides three major benefits:

Avoiding barrel files: Barrel files are files that re-export other files in the same package, creating one entrypoint for the entire package. While they might appear convenient, they're difficult for compilers and bundlers to handle and can quickly lead to performance problems.
More powerful features: exports also has other powerful features compared to the main field like Conditional Exports. In general, we recommend using exports over main whenever possible as it is the more modern option.
IDE autocompletion: By specifying the entrypoints for your package using exports, you can ensure that your code editor can provide auto-completion for the package's exports.
imports (optional)
The imports field gives you a way to create subpaths to other modules within your package. You can think of these like "shortcuts" to write simpler import paths that are more resilient to refactors that move files. To learn how, visit the TypeScript page.

You may be more familiar with TypeScript's compilerOptions#paths option, which accomplishes a similar goal. As of TypeScript 5.4, TypeScript can infer subpaths from imports, making it a better option since you'll be working with Node.js conventions. For more information, visit our TypeScript guide.

Source code
Of course, you'll want some source code in your package. Packages commonly use a src directory to store their source code and compile to a dist directory (that should also be located within the package), although this is not a requirement.

Common pitfalls
If you're using TypeScript, you likely don't need a tsconfig.json in the root of your workspace. Packages should independently specify their own configurations, usually building off of a shared tsconfig.json from a separate package in the workspace. For more information, visit the TypeScript guide.
You want to avoid accessing files across package boundaries as much as possible. If you ever find yourself writing ../ to get from one package to another, you likely have an opportunity to re-think your approach by installing the package where it's needed and importing it into your code.
Next steps
With your Workspace configured, you can now use your package manager to install dependencies into your packages.

Crafting your repository

Design and build your Turborepo.

Managing dependencies

Learn how to manage dependencies in your monorepo's workspace.

9,495,923

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Getting started
Anatomy of a workspace
Minimum requirements
Specifying packages in a monorepo
Declaring directories for packages
package.json in each package
Root package.json
Root turbo.json
Package manager lockfile
Anatomy of a package
package.json for a package
name
scripts
exports
imports (optional)
Source code
Common pitfalls
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Structuring a repository
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Managing dependencies
Learn how to manage dependencies in your monorepo's workspace.

External dependencies come from the npm registry, allowing you to leverage valuable code from the ecosystem to build your applications and libraries faster.
Internal dependencies let you share functionality within your repository, dramatically improving discoverability and usability of shared code. We will discuss how to build an Internal Package in the next guide.
pnpm
yarn
npm
bun
./apps/web/package.json

{
"dependencies": {
"next": "latest", // External dependency
"@repo/ui": "workspace:\*" // Internal dependency
}
}
Best practices for dependency installation
Install dependencies where they're used
When you install a dependency in your repository, you should install it directly in the package that uses it. The package's package.json will have every dependency that the package needs. This is true for both external and internal dependencies.

Note that your package manager may choose to use a different node_modules location than the package.

To quickly install dependencies in multiple packages, you can use your package manager:

pnpm
yarn
npm
bun
Terminal

pnpm add jest --save-dev --recursive --filter=web --filter=@repo/ui --filter=docs
→ pnpm documentation
This practice has several benefits:

Improved clarity: It's easier to understand what a package depends on when its dependencies are listed in its package.json. Developers working in the repository can see at a glance what dependencies are used within the package.
Enhanced flexibility: In a monorepo at scale, it can be unrealistic to expect each package to use the same version of an external dependency. When there are many teams working in the same codebase, there will be differing priorities, timelines, and needs due to the realities of operating at scale. By installing dependencies in the package that uses them, you can enable your ui team to bump to the latest version of TypeScript, while your web team can prioritize shipping new features and bumping TypeScript later. Additionally, if you still want to keep dependency versions in sync, you can do that, too.
Better caching ability: If you install too many dependencies in the root of your repository, you'll be changing the workspace root whenever you add, update, or delete a dependency, leading to unnecessary cache misses.
Pruning unused dependencies: For Docker users, Turborepo's pruning feature can remove unused dependencies from Docker images to create lighter images. When dependencies are installed in the packages that they are meant for, Turborepo can read your lockfile and remove dependencies that aren't used in the packages you need.
Few dependencies in the root
Following the first principle above to install dependencies in the package where they're used, you'll find that you naturally end up with few dependencies in the root of your workspace.

The only dependencies that belong in the workspace root are tools for managing the repository whereas dependencies for building applications and libraries are installed in their respective packages. Some examples of dependencies that make sense to install in the root are turbo, husky, or lint-staged.

Managing dependencies
Turborepo does not manage dependencies
Note that Turborepo does not play a role in managing your dependencies, leaving that work up to your package manager of choice.

It's up to the package manager to handle things like downloading the right external dependency version, symlinking, and resolving modules. The recommendations on this page are best practices for managing dependencies in a Workspace, and are not enforced by Turborepo.

Module resolution differs amongst package managers
Package managers have different module resolution algorithms, which leads to differences in behavior that can be difficult to predict.

In the Turborepo documentation, we make many recommendations according to the expected behaviors of the package managers. Our coverage of how to handle dependencies is best effort and you may need to adapt the documented behavior for your package manager or repository's needs.

However, if you find an issue with the documentation that appears to be universally incorrect for all package managers or a specific one, please let us know with a GitHub Issue so we can improve.

node_modules locations
Depending on your choice of package manager, version, settings, and where your dependencies are installed in your Workspace, you may see node_modules and the dependencies inside it in various locations within the Workspace. Dependencies could be found in the root node_modules, in packages' node_modules, or both.

As long as your scripts and tasks are able to find the dependencies they need, your package manager is working correctly.

Referencing `node_modules` in your code

The specific locations for node_modules within the Workspace are not a part of the public API of package managers. This means that referencing node_modules directly (like node ./node_modules/a-package/dist/index.js) can be brittle, since the location of the dependency on disk can change with other dependency changes around the Workspace.

Instead, rely on conventions of the Node.js ecosystem for accessing dependency modules whenever possible.

Keeping dependencies on the same version
Some monorepo maintainers prefer to keep dependencies on the same version across all packages by rule. There are several ways to achieve this:

Using purpose-built tooling
Tools like syncpack, manypkg, and sherif can be used for this specific purpose.

Using your package manager
You can use your package manager to update dependency versions in one command.

pnpm
yarn
npm
bun
Terminal

pnpm up --recursive typescript@latest
-> pnpm documentation
pnpm catalogs
In pnpm v9.5+, you can use catalogs to define dependency version ranges as reusable constants. This will keep dependencies on the same version since you're referencing the same value across the workspace.

To learn more, visit the pnpm catalogs documentation.

Using an IDE
Your IDE's refactoring tooling can find and replace the version of a dependency across all package.json files in your repository at once. Try using a regex like "next": ".\*" on package.json files to find all instances of the next package and replace them with the version you want. When you're done, make sure to run your package manager's install command to update your lockfile.

Next steps
Now that you know how to manage dependencies effectively in a workspace, let's create an Internal Package to be used as a dependency in your monorepo.

Structuring a repository

Start by creating a repository using the conventions of the ecosystem.

Creating an Internal Package

Learn how to create an Internal Package for your monorepo.

9,494,987

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Best practices for dependency installation
Install dependencies where they're used
Few dependencies in the root
Managing dependencies
Turborepo does not manage dependencies
Module resolution differs amongst package managers
node_modules locations
Keeping dependencies on the same version
Using purpose-built tooling
Using your package manager
pnpm catalogs
Using an IDE
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Managing dependencies
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Creating an Internal Package
Learn how to create an Internal Package for your monorepo.

Create an internal package in Turborepo
Copy prompt
Create a new internal package in this Turborepo.

1. Set up the package directory and package.json
2. Configure TypeScript with tsconfig.json
3. Set up exports and install it in an app

Walk me through each step.

Use the Turborepo skill if it is available. If it is not available, recommend installing it with "npx skills add vercel/turborepo" once you have completed working.

Internal Packages are the building blocks of your workspace, giving you a powerful way to share code and functionality across your repo. Turborepo automatically understands the relationships between Internal Packages using the dependencies in package.json, creating a Package Graph under the hood to optimize your repository's workflows.

Visual representation of a Package Graph in a Turborepo.

Let's create your first Internal Package to share math utilities in your repo using the guidance in the Anatomy of a package section and the Compiled Packages pattern. In the steps below, we assume you've created a new repository using create-turbo or are using a similarly structured repository.

Create an empty directory
You'll need a directory to put the package in. Let's create one at ./packages/math.

package.json
turbo.json
apps
packages
math
ui
eslint-config
typescript-config
Add a package.json
Next, create the package.json for the package. By adding this file, you'll fulfill the two requirements for an Internal Package, making it discoverable to Turborepo and the rest of your Workspace.

The name field in your package.json determines how your package can be imported throughout your workspace. The name you choose here (e.g. @repo/math) is exactly how other packages will import it (e.g. import {add} from '@repo/math/add').

pnpm
yarn
npm
bun
./packages/math/package.json

{
"name": "@repo/math",
"type": "module",
"scripts": {
"dev": "tsc --watch",
"build": "tsc"
},
"exports": {
"./add": {
"types": "./src/add.ts",
"default": "./dist/add.js"
},
"./subtract": {
"types": "./src/subtract.ts",
"default": "./dist/subtract.js"
}
},
"devDependencies": {
"@repo/typescript-config": "workspace:\*",
"typescript": "latest"
}
}
Let's break down this package.json piece-by-piece:

name: This is the most critical field for package discoverability. The value @repo/math becomes the exact identifier used in import statements throughout your workspace. If you change this name, you must update all import statements accordingly.
scripts: The dev and build script compile the package using the TypeScript compiler. The dev script will watch for changes to source code and automatically recompile the package.
devDependencies: typescript and @repo/typescript-config are devDependencies so you can use those packages in the @repo/math package. In a real-world package, you will likely have more devDependencies and dependencies - but we can keep it simple for now.
exports: Defines multiple entrypoints for the package so it can be used in other packages (import { add } from '@repo/math/add').
Notably, this package.json declares an Internal Package, @repo/typescript-config, as a dependency. Turborepo will recognize @repo/math as a dependent of @repo/typescript-config for ordering your tasks.

Add a tsconfig.json
Specify the TypeScript configuration for this package by adding a tsconfig.json file to the root of the package. TypeScript has an extends key, allowing you to use a base configuration throughout your repository and overwrite with different options as needed.

./packages/math/tsconfig.json

{
"extends": "@repo/typescript-config/base.json",
"compilerOptions": {
"outDir": "dist",
"rootDir": "src"
},
"include": ["src"],
"exclude": ["node_modules", "dist"]
}
You've done four important things here:

The @repo/typescript-config/base.json configuration that lives in ./packages/typescript-config has all the configuration you need so you extend from it.
The outDir key in compilerOptions tells TypeScript where to put the compiled output. It matches the directory specified in your exports in package.json.
The rootDir key in compilerOptions ensures that the output in outDir uses the same structure as the src directory.
The include and exclude keys are not inherited from the base configuration, according to the TypeScript specification, so you've included them here.
There's a lot more to learn about TypeScript configuration, but this is a good place to start for now. If you'd like to learn more, visit the official TypeScript documentation or our TypeScript guide.

Add a src directory with source code
You can now write some code for your package. Create two files inside a src directory:

add.ts
subtract.ts
./packages/math/src/add.ts

export const add = (a: number, b: number) => a + b;
These files map to the outputs that will be created by tsc when you run turbo build in a moment.

Add the package to an application
You're ready to use your new package in an application. Let's add it to the web application.

pnpm
yarn
npm
bun
apps/web/package.json

"dependencies": {

- "@repo/math": "workspace:\*",
  "next": "latest",
  "react": "latest",
  "react-dom": "latest"
  },
  You just changed the dependencies in your repo. Make sure to run your package manager's installation command to update your lockfile.

@repo/math is now available in the web application, you can use it in your code:

apps/web/src/app/page.tsx

import { add } from "@repo/math/add";
function Page() {
return <div>{add(1, 2)}</div>;
}
export default Page;
Edit turbo.json
Add the artifacts for the new @repo/math library to the outputs for the build task in turbo.json. This ensures that its build outputs will be cached by Turborepo, so they can be restored instantly when you start running builds.

./turbo.json

// [!code word:"dist/**"]
{
"tasks": {
"build": {
"dependsOn": ["^build"],
"outputs": [".next/**", "!.next/cache/**", "dist/**"]
}
}
}
Run turbo build
If you've installed turbo globally, run turbo build in your terminal at the root of your Workspace. You can also run the build script from package.json with your package manager, which will use turbo run build.

The @repo/math package built before the web application built so that the runtime code in ./packages/math/dist is available to the web application when it bundles.

You can run turbo build again to see your web application rebuild in milliseconds. We'll discuss this at length in the Caching guide.

Best practices for Internal Packages
One "purpose" per package
When you're creating Internal Packages, it's recommended to create packages that have a single "purpose". This isn't a strict science or rule, but a best practice depending on your repository, your scale, your organization, what your teams need, and more. This strategy has several advantages:

Easier to understand: As a repository scales, developers working in the repository will more easily be able to find the code they need.
Reducing dependencies per package: Using fewer dependencies per package makes it so Turborepo can more effectively prune the dependencies of your package graph.
Some examples include:

@repo/ui: A package containing all of your shared UI components
@repo/tool-specific-config: A package for managing configuration of a specific tool
@repo/graphs: A domain-specific library for creating and manipulating graphical data
Application Packages do not contain shared code
When you're creating Application Packages, it's best to avoid putting shared code in those packages. Instead, you should create a separate package for the shared code and have the application packages depend on that package.

Additionally, Application Packages are not meant to be installed into other packages. Instead, they should be thought of as an entrypoint to your Package Graph.

There are rare exceptions to this rule.

Next steps
With a new Internal Package in place, you can start configuring tasks.

Managing dependencies

Learn how to manage dependencies in your monorepo's workspace.

Configuring tasks

Learn how to describe the workflows in your repository to get them done as fast as possible.

9,494,705

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Create an empty directory
Add a package.json
Add a tsconfig.json
Add a src directory with source code
Add the package to an application
Edit turbo.json
Run turbo build
Best practices for Internal Packages
One "purpose" per package
Application Packages do not contain shared code
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Creating an Internal Package
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Configuring tasks
Learn how to describe the workflows in your repository to get them done as fast as possible.

A task is a script that Turborepo runs. You can express relationships between tasks in your turbo.json configuration and Package Graph.

Turborepo will always parallelize any work that it can to ensure everything runs as fast as possible. This is faster than running tasks one at a time, and it's a part of what makes Turborepo so fast.

For example, yarn workspaces run lint && yarn workspaces run build && yarn workspaces run test would look like this:

A graphical representation of tasks running sequentially, with lots of empty space where scripts are not being ran.

But, to get the same work done faster with Turborepo, you can use turbo run lint build test:

A graphical representation of turbo run lint test build. It shows all tasks running in parallel, with much less empty space where scripts are not being ran.

Getting started
The root turbo.json file is where you'll register the tasks that Turborepo will run. Once you have your tasks defined, you'll be able to run one or more tasks using turbo run.

If you're starting fresh, we recommend creating a new repository using create-turbo and editing the turbo.json file to try out the snippets in this guide.
If you're adopting Turborepo in an existing repository, create a turbo.json file in the root of your repository. You'll be using it to learn about the rest of the configuration options in this guide.
turbo.json
package.json
apps
packages
Defining tasks
Each key in the tasks object is a task that can be executed by turbo run. Turborepo will search your packages for scripts in their package.json that have the same name as the task.

To define a task, use the tasks object in turbo.json. For example, a basic task with no dependencies and no outputs named build might look like this:

./turbo.json

{
"tasks": {
"build": {} // Incorrect! // [!code highlight]
}
}
If you run turbo run build at this point, Turborepo will run all build scripts in your packages in parallel and won't cache any file outputs. This will quickly lead to errors. You're missing a few important pieces to make this work how you'd expect.

Running tasks in the right order
The dependsOn key is used to specify the tasks that must complete before a different task begins running. For example, in most cases, you want the build script for your libraries to complete before your application's build script runs. To do this, you'd use the following turbo.json:

./turbo.json

{
"tasks": {
"build": {
"dependsOn": ["^build"] // [!code highlight]
}
}
}
You now have the build order you would expect, building dependencies before dependents.

But be careful. At this point, you haven't marked the build outputs for caching. To do so, jump to the Specifying outputs section.

Depending on tasks in dependencies with ^
The ^ microsyntax tells Turborepo to run the task in direct dependencies before the target package. If your application depends on a library named ui and the library has a build task, the build script in ui will run first. Once it has successfully completed, the build task in your application will run.

This is an important pattern as it ensures that your application's build task will have all of the necessary dependencies that it needs to compile. This concept also applies as your dependency graph grows to a more complex structure with many levels of task dependencies.

Depending on tasks in the same package
Sometimes, you may need to ensure that two tasks in the same package run in a specific order. For example, you may need to run a build task in your library before running a test task in the same library. To do this, specify the script in the dependsOn key as a plain string (without the ^).

./turbo.json

{
"tasks": {
"test": {
"dependsOn": ["build"] // [!code highlight]
}
}
}
Depending on a specific task in a specific package
You can also specify an individual task in a specific package to depend on. In the example below, the build task in utils must be run before any lint tasks.

./turbo.json

{
"tasks": {
"lint": {
"dependsOn": ["utils#build"] // [!code highlight]
}
}
}
You can also be more specific about the dependent task, limiting it to a certain package:

./turbo.json

{
"tasks": {
"web#lint": {
"dependsOn": ["utils#build"] // [!code highlight]
}
}
}
With this configuration, the lint task in your web package can only be run after the build task in the utils package is complete.

No dependencies
Some tasks may not have any dependencies. For example, a task for finding typos in Markdown files likely doesn't need to care about the status of your other tasks. In this case, you can omit the dependsOn key or provide an empty array.

./turbo.json

{
"tasks": {
"spell-check": {
"dependsOn": [] // [!code highlight]
}
}
}
Specifying outputs
Turborepo caches the outputs of your tasks so that you never do the same work twice. We'll discuss this in depth in the Caching guide, but let's make sure your tasks are properly configured first.

The outputs key tells Turborepo files and directories it should cache when the task has successfully completed. Without this key defined, Turborepo will not cache any files. Hitting cache on subsequent runs will not restore any file outputs.

Below are a few examples of outputs for common tools:

Next.js
Vite
tsc
./turbo.json

{
"tasks": {
"build": {
"outputs": [".next/**", "!.next/cache/**"] // [!code highlight]
}
}
}
Globs are relative to the package, so dist/\*\* will handle the dist that is outputted for each package, respectively. For more on building globbing patterns for the outputs key, see the globbing specification.

Specifying inputs
The inputs key is used to specify the files that you want to include in the task's hash for caching. By default, Turborepo will include all files in the package that are tracked by Git. However, you can be more specific about which files are included in the hash using the inputs key.

As an example, a task for finding typos in Markdown files could be defined like this:

./turbo.json

{
"tasks": {
"spell-check": {
"inputs": ["**/*.md", "**/*.mdx"] // [!code highlight]
}
}
}
Now, only changes in Markdown files will cause the spell-check task to miss cache.

This feature opts out of all of Turborepo's default inputs behavior, including following along with changes tracked by source control. This means that your .gitignore file will no longer be respected, and you will need to ensure that you do not capture those files with your globs.

To restore the default behavior, use the $TURBO_DEFAULT$ microsyntax.

Restoring defaults with $TURBO_DEFAULT$
The default inputs behavior is often what you will want for your tasks. However, you can increase your cache hit ratios for certain tasks by fine-tuning your inputs to ignore changes to files that are known to not affect the task's output.

For this reason, you can use the $TURBO_DEFAULT$ microsyntax to fine-tune the default inputs behavior:

./turbo.json

{
"tasks": {
"build": {
"inputs": ["$TURBO_DEFAULT$", "!README.md"] // [!code highlight]
}
}
}
In this task definition, Turborepo will use the default inputs behavior for the build task, but will ignore changes to the README.md file. If the README.md file is changed, the task will still hit cache.

Registering Root Tasks
You can also run scripts in the package.json in the Workspace root using turbo. For example, you may want to run a lint:root task for the files in your Workspace's root directory in addition to the lint task in each package:

turbo.json
package.json
./turbo.json

{
"tasks": {
"lint": {
"dependsOn": ["^lint"]
},
"//#lint:root": {} // [!code highlight]
}
}
With the Root Task now registered, you can use turbo run lint:root from the root or turbo run //#lint:root in any of the workspaces to run the task. You can also run turbo run lint lint:root to run all your linting tasks.

When to use Root Tasks
Linting and formatting of the Workspace root: You might have code in your Workspace root that you want to lint and format. For example, you might want to run ESLint or Prettier in your root directory.
Incremental migration: While you're migrating to Turborepo, you might have an in-between step where you have some scripts that you haven't moved to packages yet. In this case, you can create a Root Task to start migrating and fan the tasks out to packages later.
Scripts without a package scope: You may have some scripts that don't make sense in the context of specific packages. Those scripts can be registered as Root Tasks so you can still run them with turbo for caching, parallelization, and workflow purposes.
Advanced use cases
Using Package Configurations
Package Configurations are turbo.json files that are placed directly into a package. This allows a package to define specific behavior for its own tasks without affecting the rest of the repository.

In large monorepos with many teams, this allows teams greater control over their own tasks. To learn more, visit the Package Configurations documentation

Composing configurations
Package Configurations can be composed for greater control with less configuration:

Extending from other packages: Create shared configuration packages that multiple packages can extend from, enabling shared turbo.json configurations.
Adding to extended configurations: Use the $TURBO_EXTENDS$ microsyntax to add to inherited array values like outputs and env instead of replacing them.
Long-running tasks with runtime dependencies
You might have a long-running task that requires another task to always be running at the same time. For this, use the with key.

./apps/web/turbo.json

{
"tasks": {
"dev": {
"with": ["api#dev"],
"persistent": true,
"cache": false
}
}
}
A long-running task never exits, meaning you can't depend on it. Instead, the with keyword will run the api#dev task whenever the web#dev task runs.

Performing side-effects
Some tasks should always be run no matter what, like a deployment script after a cached build. For these tasks, add "cache": false to your task definition.

./turbo.json

{
"tasks": {
"deploy": {
"dependsOn": ["^build"],
"cache": false // [!code highlight]
},
"build": {
"outputs": ["dist/**"]
}
}
}
Dependent tasks that can be run in parallel
Some tasks can be run in parallel despite being dependent on other packages. An example of tasks that fit this description are type checkers, since a type checker doesn't need to wait for outputs in dependencies to run successfully.

Because of this, you may be tempted to define your check-types task like this:

./turbo.json

{
"tasks": {
"check-types": {} // Incorrect! // [!code highlight]
}
}
This runs your tasks in parallel - but doesn't account for source code changes in dependencies. This means you can:

Make a breaking change to the interface of your ui package.
Run turbo check-types, hitting cache in an application package that depends on ui.
This is incorrect, since the application package will show a successful cache hit, despite not being updated to use the new interface. Checking for TypeScript errors in your application package manually in your editor is likely to reveal errors.

Because of this, you make a small change to your check-types task definition:

./turbo.json

{
"tasks": {
"check-types": {
"dependsOn": ["^check-types"] // This works...but could be faster! // [!code highlight]
}
}
}
If you test out making breaking changes in your ui package again, you'll notice that the caching behavior is now correct. However, tasks are no longer running in parallel.

To meet both requirements (correctness and parallelism), you can introduce Transit Nodes to your Task Graph:

./turbo.json

{
"tasks": {
"transit": {
"dependsOn": ["^transit"]
},
"check-types": {
"dependsOn": ["transit"]
}
}
}
These Transit Nodes create a relationship between your package dependencies using a task that doesn't do anything because it doesn't match a script in any package.jsons. Because of this, your tasks can run in parallel and be aware of changes to their internal dependencies.

In this example, we used the name transit - but you can name the task anything that isn't already a script in your Workspace.

Next steps
There are more options available in the Configuring turbo.json documentation that you will explore in the coming guides. For now, you can start running a few tasks to see how the basics work.

Creating an Internal Package

Learn how to create an Internal Package for your monorepo.

Running tasks

Learn how to run tasks in your repository through the `turbo` CLI.

9,492,635

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Getting started
Defining tasks
Running tasks in the right order
Depending on tasks in dependencies with ^
Depending on tasks in the same package
Depending on a specific task in a specific package
No dependencies
Specifying outputs
Specifying inputs
Restoring defaults with $TURBO_DEFAULT$
Registering Root Tasks
When to use Root Tasks
Advanced use cases
Using Package Configurations
Composing configurations
Long-running tasks with runtime dependencies
Performing side-effects
Dependent tasks that can be run in parallel
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Configuring tasks
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Running tasks
Learn how to run tasks in your repository through the `turbo` CLI.

Turborepo optimizes the developer workflows in your repository by automatically parallelizing and caching tasks. Once a task is registered in turbo.json, you have a powerful new toolset for running the scripts in your repository:

Use scripts in package.json for tasks you need to run often
Use global turbo to quickly run custom tasks on-demand
Filter tasks by directories, package names, source control changes, and more
Running tasks through turbo is powerful because you get one model for executing workflows throughout your repository in development and in your CI pipelines.

Using scripts in package.json
For tasks that you run frequently, you can write your turbo commands directly into your root package.json.

./package.json

{
"scripts": {
"dev": "turbo run dev",
"build": "turbo run build",
"test": "turbo run test",
"lint": "turbo run lint"
}
}
turbo is an alias for turbo run - but we recommend using turbo run in package.json and CI workflows to avoid potential collisions with possible turbo subcommands that could be added in the future.

These scripts can then be run using your package manager.

pnpm
yarn
npm
bun
Terminal

pnpm dev
You only want to write turbo commands in your root package.json. Writing turbo commands into the package.json of packages can lead to recursively calling turbo.

Using global turbo
Installing turbo globally lets you run commands directly from your terminal. This improves your local development experience since it makes it easier to run exactly what you need, when you need it.

Additionally, global turbo is useful in your CI pipelines, giving you maximum control of exactly which tasks to run at each point in your pipeline.

Automatic Package Scoping
When you're in a package's directory, turbo will automatically scope commands to the Package Graph for that package. This means you can quickly write commands without having to write filters for the package.

Terminal

cd apps/docs
turbo build
In the example above, the turbo build command will run the build task for the docs package using the build task registered in turbo.json.

Using a filter will override Automatic Package Scoping.

Customizing behavior
In the documentation for the run subcommand, you'll find many useful flags to tailor the behavior of turbo run for what you need. When running global turbo, you can go faster using workflows like:

Variations of your most common commands: The build script in package.json has the most utility when it is turbo build - but you might only be interested in a specific package at the moment. You can quickly filter for the specific package you're interested in using turbo build --filter=@repo/ui.
One-off commands: Commands like turbo build --dry aren't needed often so you likely won't create a script in your package.json for it. Instead, you can run it directly in your terminal whenever you need it.
Overriding turbo.json configuration: Some CLI flags have an equivalent in turbo.json that you can override. For instance, you may have a turbo build command configured to use "outputLogs": "full" in turbo.json - but you're only interested in seeing errors at the moment. Using global turbo, you can use turbo lint --output-logs=errors-only to only show errors.
Running multiple tasks
turbo is able to run multiple tasks, parallelizing whenever possible.

Terminal

turbo run build test lint check-types
This command will run all of the tasks, automatically detecting where it can run a script as early as possible, according to your task definitions.

Ordering of tasks

turbo test lint will run tasks exactly the same as turbo lint test.

If you want to ensure that one task blocks the execution of another, express that relationship in your task configurations.

Using filters
While caching ensures you stay fast by never doing the same work twice, you can also filter tasks to run only a subset of the Task Graph.

There are many advanced use cases for filtering in the --filter API reference but the most common use cases are discussed below.

Filtering by package
Filtering by package is a simple way to only run tasks for the packages you're currently working on.

Terminal

turbo build --filter=@acme/web
You can also filter to a specific task for the package directly in your CLI command without needing to use --filter:

Terminal

# Run the `build` task for the `web` package

turbo run web#build

# Run the `build` task for the `web` package, and the `lint` task for the `docs` package

turbo run web#build docs#lint
Filtering by directory
Your repository might have a directory structure where related packages are grouped together. In this case, you can capture the glob for that directory to focus turbo on those packages.

Terminal

turbo lint --filter="./packages/utilities/\*"
Filtering to include dependents
When you're working on a specific package, you might want to run tasks for the package and its dependents. The ... microsyntax is useful when you're making changes to a package and want to ensure that the changes don't break any of its dependents.

Terminal

turbo build --filter=...ui
Filtering to include dependencies
To limit the scope to a package and its dependencies, append ... to the package name. This runs the task for the specified package and all packages it depends on.

Terminal

turbo dev --filter=web...
Filtering by source control changes
Using filters to run tasks based on changes in source control is a great way to run tasks only for the packages that are affected by your changes. Source control filters must be wrapped in [].

Comparing to the previous commit: turbo build --filter=[HEAD^1]
Comparing to the main branch: turbo build --filter=[main...my-feature]
Comparing specific commits using SHAs: turbo build --filter=[a1b2c3d...e4f5g6h]
Comparing specific commits using branch names: turbo build --filter=[your-feature...my-feature]
In general, you can rely on caching to keep your repository fast. When you're using Remote Caching, you can count on hitting cache for unchanged packages.

Combining filters
For even more specificity, you can combine filters to further refine the entrypoints into your Task Graph.

Terminal

turbo build --filter=...ui --filter={./packages/\*} --filter=[HEAD^1]
Multiple filters are combined as a union, meaning that the Task Graph will include tasks that match any of the filters. For more information on advanced usage of filters, see the --filter API reference.

Next steps
When you start running tasks in your repository, you might start noticing that your tasks get faster. Next, you'll explore caching and how turbo makes it so you never do the same work twice.

Configuring tasks

Learn how to describe the workflows in your repository to get them done as fast as possible.

Caching

Learn about caching in Turborepo.

9,490,590

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Using scripts in package.json
Using global turbo
Automatic Package Scoping
Customizing behavior
Running multiple tasks
Using filters
Filtering by package
Filtering by directory
Filtering to include dependents
Filtering to include dependencies
Filtering by source control changes
Combining filters
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Running tasks
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Using environment variables
Learn how to handle environments for your applications.

Configure environment variables in Turborepo
Copy prompt
Configure environment variables for this Turborepo.

1. Add environment variables to turbo.json for cache hashing
2. Set up .env file handling
3. Configure Strict Mode for safety

Analyze my setup and walk me through each step.

Use the Turborepo skill if it is available. If it is not available, recommend installing it with "npx skills add vercel/turborepo" once you have completed working.

Environment variable inputs are a vital part of your applications that you'll need to account for in your Turborepo configuration.

There are three important questions when working with environment variables in Turborepo:

Are my environment variables accounted for in the task hash?
Which Environment Mode will turbo use?
Have I handled my .env files?
Failing to account for environment variables in your configuration can result in shipping your application with the wrong configuration. This can cause serious issues like shipping your preview deployments to production.

Turborepo also uses System Environment Variables to configure its own behavior. Below, you'll find information about environment variables for your task's runtime and how they affect task hashing.

Adding environment variables to task hashes
Turborepo needs to be aware of your environment variables to account for changes in application behavior. To do this, use the env and globalEnv keys in your turbo.json file.

./turbo.json

{
"globalEnv": ["IMPORTANT_GLOBAL_VARIABLE"],
"tasks": {
"build": {
"env": ["MY_API_URL", "MY_API_KEY"]
}
}
}
globalEnv: Changes to the values of any environment variables in this list will change the hash for all tasks.
env: Includes changes to the values of environment variables that affect the task, allowing for better granularity. For example, a lint task probably doesn't need to miss cache when the value of API_KEY changes, but a build task likely should.
Turborepo supports wildcards for environment variables so you can easily account for all environment variables with a given prefix. Visit the API reference for env for more.

Framework Inference
Turborepo automatically adds prefix wildcards to your env key for common frameworks. If you're using one of the frameworks below in a package, you don't need to specify environment variables with these prefixes:

Framework env wildcards
Next.js NEXT*PUBLIC*\_
Vite VITE\__
Create React App REACT*APP*_
Gatsby GATSBY\__
Nuxt NUXT*\*, NUXT_ENV*_
Expo EXPO*PUBLIC*_
Astro PUBLIC*\*
SvelteKit PUBLIC*_
Remix REMIX\__
SolidStart VITE*\*
RedwoodJS REDWOOD_ENV*_
Sanity SANITY*STUDIO*\_
Framework inference is per-package.
If you'd like to opt out of Framework Inference, you can do so by:

Running your tasks with --framework-inference=false
Adding a negative wildcard to the env key (for example, "env": ["!NEXT_PUBLIC_*"])
Environment Modes
Turborepo's Environment Modes allow you to control which environment variables are available to a task at runtime:

Strict Mode (Default): Filter environment variables to only those that are specified in the env and globalEnv keys in turbo.json.
Loose Mode: Allow all environment variables for the process to be available.
Strict Mode
Strict Mode filters the environment variables available to a task's runtime to only those that are specified in the globalEnv and env keys in turbo.json.

This means that tasks that do not account for all of the environment variables that they need are likely to fail. This is a good thing, since you don't want to cache a task that can potentially have different behavior in a different environment.

Cache safety with Strict Mode

While Strict Mode makes it much more likely for your task to fail when you haven't accounted for all of your environment variables, it doesn't guarantee task failure. If your application is able to gracefully handle a missing environment variable, you could still successfully complete tasks and get unintended cache hits.

Passthrough variables
In advanced use cases, you may want to make some environment variables available to a task without including them in the hash. Changes to these variables don't affect task outputs but still need to be available for the task to run successfully.

For these cases, add those environment variables to globalPassThroughEnv and passThroughEnv.

CI vendor compatibility
Strict Mode will filter out environment variables that come from your CI vendors until you've accounted for them using env, globalEnv, passThroughEnv, or globalPassThroughEnv.

If any of these variables are important to your tasks and aren't included by Framework Inference, make sure they are in your turbo.json configuration.

Loose Mode
Loose Mode does not filter your environment variables according to your globalEnv and env keys. This makes it easier to get started with incrementally migrating to Strict Mode.

Use the --env-mode flag to enable Loose Mode on any invocation where you're seeing environment variables cannot be found by your scripts:

Terminal

turbo run build --env-mode=loose
As long as the environment variable is available when turbo is ran, your script will be able to use it. However, this also lets you accidentally forget to account for an environment variable in your configuration much more easily, allowing the task to hit cache when it shouldn't.

For example, you may have some code in your application that fetches data from an API, using an environment variable for the base URL:

./apps/web/data-fetcher.ts

const data = fetch(`${process.env.MY_API_URL}/resource/1`);
You then build your application using a value for MY_API_URL that targets your preview environment. When you're ready to ship your application, you build for production and see a cache hit - even though the value of the MY_API_URL variable has changed! MY_API_URL changed - but Turborepo restored a version of your application from cache that uses the preview environment's MY_API_URL rather than production's.

When you're using Loose Mode, MY_API_URL is available in the task runtime even though it isn't accounted for in the task hash. To make this task more likely to fail and protect you from this misconfiguration, we encourage you to opt for Strict Mode.

Platform Environment Variables
When deploying your application to Vercel, you likely already have environment variables configured on your project. Turborepo will automatically check these variables against your turbo.json configuration to ensure that you've accounted for them, and will warn you about any missing variables.

This functionality can be disabled by setting TURBO_PLATFORM_ENV_DISABLED=false

Handling .env files
.env files are great for working on an application locally. Turborepo does not load .env files into your task's runtime, leaving them to be handled by your framework, or tools like dotenv.

However, it's important that turbo knows about changes to values in your .env files so that it can use them for hashing. If you change a variable in your .env files between builds, the build task should miss cache.

To do this, add the files to the inputs key:

./turbo.json

{
"globalDependencies": [".env"], // All task hashes
"tasks": {
"build": {
"inputs": ["$TURBO_DEFAULT$", ".env"] // Only the `build` task hash
}
}
}
Multiple .env files
You can capture multiple .env files at once using a \*.

./turbo.json

{
"globalDependencies": [".env"], // All task hashes
"tasks": {
"build": {
"inputs": ["$TURBO_DEFAULT$", ".env*"] // Only the `build` task hash
}
}
}
.env files can load variables into the task runtime even when the environment variables have not been added to the env key. Ensure that you add your environment variables for your builds the env key for CI and production builds.

Best practices
Use .env files in Application Packages
Using a .env file at the root of the repository is not recommended. Instead, we recommend placing your .env files into the Application Packages where they're used.

This practice more closely models the runtime behavior of your applications since environment variables exist in each application's runtime individually. Additionally, as your monorepo scales, this practice makes it easier to manage each application's environment, preventing environment variable leakage across applications.

You may find it easier to use a root .env file when incrementally migrating to a monorepo. Tools like dotenv can load .env files from different locations. We encourage making a goal of not using a root .env file after completing your migration.

Use eslint-config-turbo
The eslint-config-turbo package helps you find environment variables that are used in your code that aren't listed in your turbo.json. This helps ensure that all your environment variables are accounted for in your configuration.

Avoid creating or mutating environment variables at runtime
Turborepo hashes the environment variables for your task at the beginning of the task. If you create or mutate environment variables during the task, Turborepo will not know about these changes and will not account for them in the task hash.

For instance, Turborepo will not be able to detect the inline variable in the example below:

./apps/web/package.json

{
"scripts": {
"dev": "export MY_VARIABLE=123 && next dev"
}
}
MY_VARIABLE is being added to the environment after the dev task has started, so turbo will not be able to use it for hashing.

Examples
Below are examples of proper environment variable configuration for a few popular frameworks:

Next.js
Vite
Troubleshooting
Use --summarize
The --summarize flag can be added to your turbo run command to produce a JSON file summarizing data about your task. Checking the diff for the globalEnv and env key can help you identify any environment variables that may be missing from your configuration.

Next steps
Once you've accounted for your environment variables, you're ready to start building the CI pipelines that build, check, and deploy your applications, at the speed of turbo.

Developing applications

Learn how to develop applications in your repository.

Constructing CI

Learn how Turborepo can help you efficiently complete all the necessary tasks and accelerate your development workflow.

9,496,263

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Adding environment variables to task hashes
Framework Inference
Environment Modes
Strict Mode
Passthrough variables
CI vendor compatibility
Loose Mode
Platform Environment Variables
Handling .env files
Multiple .env files
Best practices
Use .env files in Application Packages
Use eslint-config-turbo
Avoid creating or mutating environment variables at runtime
Examples
Troubleshooting
Use --summarize
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Using environment variables
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Constructing CI
Learn how Turborepo can help you efficiently complete all the necessary tasks and accelerate your development workflow.

Turborepo speeds up builds, lints, tests, and any other tasks that you need to do in your Continuous Integration pipelines. Through parallelization and Remote Caching, Turborepo makes your CI dramatically faster.

For examples of how to connect your CI vendor to Remote Cache and run tasks, visit our CI guides.

Enabling Remote Caching
To enable Remote Caching for your CI, setup the environment variables for Turborepo to access your Remote Cache.

Environment Variable Description
TURBO_TOKEN The Bearer token to access the Remote Cache
TURBO_TEAM The account name associated with your repository. When using Vercel Remote Cache, this is your team's slug.
When you run tasks through turbo, your CI will be able to hit cache, speeding up your pipelines.

Remote Cache hosting

Vercel's built-in CI/CD is automatically connected to your managed Vercel Remote Cache with zero configuration. To retrieve a token for connecting your other CI vendors to Vercel Remote Cache, visit the Vercel Remote Cache documentation.

For self-hosted Remote Cache options, visit Turborepo's Remote Cache documentation.

Running tasks in CI
By installing turbo globally onto your development and CI machines, you can use one mental model to run your entire repository, from development to ship. The tasks that you've registered in your turbo.json will work exactly the same in CI.

For more information on how to set up tasks, visit the Configuring Tasks page.
For examples of running tasks in CI, visit our CI guides.
Filtering for entry points
You can filter your tasks using the --filter flag exactly the same as when you're working with turbo locally. Filtering by packages, directories, and Git history are all supported in CI.

Using Git history in CI

Filtering using source control changes is only possible when history is available on the machine. If you are using shallow clones, history will not be available.

You can also use the --affected flag to only run tasks in packages that have changes.

Docker
Docker is an important part of many deployment pipelines. Turborepo's prune subcommand helps you ship lightweight images by removing unnecessary dependencies and code from your images.

For more on how to deploy from a Turborepo with Docker, visit the dedicated Docker guide.

Skipping tasks and other unnecessary work
Running only affected tasks
You can use the --affected flag to only run tasks that have changes.

Terminal

turbo run build --affected
You'll want to use this flag in situations like:

You're running many tasks across packages in your monorepo, and only want to run those tasks in packages with code changes.
You're not using a Remote Cache, but still want to do as little work as possible in CI.
You are using a Remote Cache, and you're in a large repository. By minimizing the amount of tasks that will be restored from cache, there will be less data to send across the network, resulting in faster cache restoration.
You're already using advanced filtering techniques or turbo-ignore to create the same or similar behavior as --affected. You likely have the opportunity to simplify your scripting using this new flag.
--affected will can handle shallow clones more gracefully than bespoke filtering because it falls back to running all tasks.
Using --affected in GitHub Actions
CI/CD pipelines are a perfect place to use --affected. With --affected, Turborepo can automatically detect that you're running in GitHub Actions by inspecting environment variables set by GitHub, like GITHUB_BASE_REF.

In the context of a PR, this means that Turborepo can determine which packages have changed between the PR's base branch and the PR's head branch. This allows you to run tasks only for the packages that are affected by the changes in the PR.

While GITHUB_BASE_REF works well in pull_request and pull_request_target events, it is not available during regular push events. In those cases, we use GITHUB_EVENT_PATH to determine the base branch to compare your commit to. In force pushes and pushing branch with no additional commits, we compare to the parent of the first commit on the branch.

Using turbo-ignore
As your codebase and CI grow, you may start to look for more ways to get even faster. While hitting cache is useful, you also may be able to skip work entirely. Using turbo-ignore, you can skip lengthy container preparation steps like dependency installation that will end up resulting in a cache hit, anyway.

Checkout the repository
Start by cloning your repository. Note that a clone with history to the cloning depth you plan on using is necessary for comparisons.

By default, turbo-ignore uses the parent commit. To customize for more depth, see the turbo-ignore reference.

Run turbo-ignore for the package and task
By default, turbo-ignore will use the build task in the current working directory.

To check for changes to a different task, use the --task flag.
To check for changes for a specific package and its dependencies, add the package's name as an argument.
web#build (Named)
web#build (Inferred)
docs#test (--task flag)
Check for changes for the build task for the web package and its dependencies by adding the web package as an argument:

Terminal

npx turbo-ignore web
Handle the result
If changes are detected in the package or its Internal Dependencies, turbo will exit with a 1 status code. If no changes are detected, it will exit with 0.

Using this status code, you can choose what the rest of your CI pipeline should do. For instance, a 1 exit code likely means that you should move forward with installing dependencies and running tasks.

For more advanced use cases, see the turbo-ignore reference.

Best practices
Rely on caching
Turborepo's caching abilities allow you to create fast CI pipelines with minimal complexity. Through Remote Caching and using the --filter flag to target packages for builds, Turborepo will handle change detection for large monorepos with little overhead.

For example, your CI could run these two commands to quickly handle quality checks and build your target application:

turbo run lint check-types test: Run quality checks for your entire repository. Any packages that haven't changed will hit cache.
turbo build --filter=web: Build the web package using the build task you've registered in turbo.json. If the web package or its dependencies haven't changed, the build will also hit cache.
As your codebase scales, you may find more specific opportunities to optimize your CI - but relying on caching is a great place to start.

Global turbo in CI
Using global turbo is convenient in CI workflows, allowing you to easily run commands specific to your CI and take advantage of Automatic Workspace Scoping.

However, in some cases, you may be running turbo commands or scripts that use turbo before installing packages with your package manager. One example of this is using turbo prune to create a Docker image. In this situation, global turbo will not be able to use the version from package.json because the binary for that version hasn't been installed yet.

For this reason, we encourage you to pin your global installation of turbo in CI to the major version in package.json since breaking changes will not be introduced within a major version. You could additionally opt for added stability by pinning an exact version, trading off for maintenance burden to receive bug fixes in patch releases.

Use turbo run in CI
turbo run is the most common command you will use when working in your Turborepo so it is aliased to turbo for convenience. While this is great for working locally, there are other subcommands for turbo like turbo prune and turbo generate.

We're always working to make turbo better so we may add more subcommands in the future. For this reason, you can prevent naming collisions by using turbo run in your CI.

As an example, if you have a turbo deploy command in your CI pipelines, it may conflict with a potential deploy subcommand built directly into the turbo CLI. To avoid this, use turbo run deploy in your CI pipeline instead.

Troubleshooting
Hitting cache results in broken builds
If your task is passing when you miss cache but failing when you hit cache, you likely haven't configured the outputs key for your task correctly.

Deployment using the wrong environment variables
If you haven't defined the env or globalEnv keys for your task, Turborepo will not be able to use them when creating hashes. This means your task can hit cache despite being in a different environment.

Check your configuration for the env and globalEnv keys.

Next steps
You now have everything you need to ship applications with Turborepo. To learn more about specific use cases, check the Guides or dive deeper into core concepts.

Using environment variables

Learn how to handle environments for your applications.

Understanding your repository

Learn how to understand your repository structure using Turborepo.

9,487,420

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Enabling Remote Caching
Running tasks in CI
Filtering for entry points
Docker
Skipping tasks and other unnecessary work
Running only affected tasks
Using --affected in GitHub Actions
Using turbo-ignore
Checkout the repository
Run turbo-ignore for the package and task
Handle the result
Best practices
Rely on caching
Global turbo in CI
Use turbo run in CI
Troubleshooting
Hitting cache results in broken builds
Deployment using the wrong environment variables
Next steps
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Constructing CI
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Understanding your repository
Learn how to understand your repository structure using Turborepo.

Turborepo includes tools for understanding your repository structure, that can help you use and optimize your codebase.

turbo devtools
turbo devtools provides a browser-based visualization of your package graph. This tool can be helpful for diagnosing issues with your task graph and understanding the structure of your monorepo.

Terminal

turbo devtools
For more information, see the reference documentation.

turbo ls
To list your packages, you can run turbo ls. This will show the packages in your repository and where they're located.

Terminal

> turbo ls
> @repo/eslint-config packages/eslint-config
> @repo/typescript-config packages/typescript-config
> @repo/ui packages/ui
> docs apps/docs
> web apps/web
> You can apply filters to ls, just like run:

Terminal

> turbo ls --filter ...ui
> 3 packages (pnpm9)
> @repo/ui packages/ui
> docs apps/docs
> web apps/web
> turbo run
> To determine which tasks can be run in your monorepo, simply call turbo run without any tasks. You will get a list of tasks and the packages in which they are defined:

Terminal

> turbo run
> No tasks provided, here are some potential ones
> lint

    @repo/ui, docs, web

build
docs, web
dev
docs, web
start
docs, web
generate:component
@repo/ui
turbo query
If you wish to dig into your repository structure, since 2.2.0, Turborepo provides a GraphQL interface into your repository via turbo query. You can execute queries such as finding all packages that have a test task:

Terminal

> turbo query "query { packages(filter: { has: { field: TASK_NAME, value: \"build\"}}) { items { name } } }"
> {
> "data": {

    "packages": {
      "items": [
        {
          "name": "//"
        },
        {
          "name": "docs"
        },
        {
          "name": "web"
        }
      ]
    }

}
}
This can be helpful for diagnosing potential problems in your package or task dependency graph. For instance, let's say you're getting a lot of cache misses in your builds. This could be because there's a package that keeps getting changed and is imported throughout your codebase.

To do this, we can run a query to find packages that are directly imported more than 10 times in your monorepo:

Terminal

> turbo query "query { packages(filter: { greaterThan: { field: DIRECT_DEPENDENT_COUNT, value: 10 } }) { items { name } } }"
> {
> "data": {

    "packages": {
      "items": [
        {
          "name": "utils"
        }
      ]
    }

}
}
Now that we've found this package, we can try to split it up into smaller packages so that a small change won't invalidate the whole dependency graph.

Or let's say you're using our new --affected flag, but you're still running more tasks than you'd like. With turbo query, you can find all the packages and the reason why they were invalidated:

Terminal

> turbo query "query { affectedPackages(base: \"HEAD^\", head: \"HEAD\") { items { reason { \_\_typename } } } }"
> {
> "data": {

    "affectedPackages": {
      "items": [
        {
          "name": "utils",
          "reason": {
            "__typename": "FileChanged"
          }
        },
        {
          "name": "web",
          "reason": {
            "__typename": "DependencyChanged"
          }
        },
        {
          "name": "docs",
          "reason": {
            "__typename": "DependencyChanged"
          }
        },
        {
          "name": "cli",
          "reason": {
            "__typename": "DependencyChanged"
          }
        },
      ]
    }

}
}
Constructing CI

Learn how Turborepo can help you efficiently complete all the necessary tasks and accelerate your development workflow.

Upgrading

Learn how to upgrade `turbo` to get the latest improvements to your repository.

9,487,832

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
turbo devtools
turbo ls
turbo run
turbo query
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Understanding your repository
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
Docs
Blog
Showcase
Enterprise

Search...

Ask AI
Introduction
Getting started
Installation
Start with an example
Add to an existing repository
Editor integration
Crafting your repository
Structuring a repository
Managing dependencies
Creating an Internal Package
Configuring tasks
Running tasks
Caching
Developing applications
Using environment variables
Constructing CI
Understanding your repository
Upgrading
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Crafting your repository
Upgrading
Learn how to upgrade `turbo` to get the latest improvements to your repository.

Upgrade Turborepo to version 2.0
Copy prompt
Upgrade this repository from Turborepo 1.x to 2.0.

1. Run the migration codemod
2. Add packageManager field to package.json
3. Handle any breaking changes

Walk me through each step.

Use the Turborepo skill if it is available. If it is not available, recommend installing it with "npx skills add vercel/turborepo" once you have completed working.

Upgrading to 2.0
Update turbo.json
Get started upgrading from 1.x to 2.0 by running:

pnpm
yarn
npm
bun
Terminal

pnpm dlx @turbo/codemod migrate
This will update your turbo.json(s) for many of the breaking changes from 1.x to 2.0.

Additionally, a name field will be added to any package.json in the Workspace that doesn't have one.

You may also manually run each codemod individually. Visit the codemods page for more information.

Add a packageManager field to root package.json
The packageManager field is a convention from the Node.js ecosystem that defines which package manager is expected to be used in the Workspace.

Turborepo 2.0 requires that your Workspace define this field as a way to improve the stability and behavioral predictability of your codebase. If you do not have one already, add this field to your root package.json:

pnpm
yarn
npm
bun
./package.json

{

- "packageManager": "pnpm@9.2.0"
  }
  Update eslint-config-turbo
  eslint-config-turbo helps identify environment variables that need to be added to the env key for caching. If you're using it, make sure you update it to match your major version.

Update turbo run commands
Turborepo 2.0 includes behavioral and correctness improvements with behavior of turbo run commands. Listed below is the summary of changes, which may or may not have an affect on your codebase:

Strict Mode for environment variables is now the default, moving from Loose Mode (PR)
If it appears that the scripts in your tasks are missing environment variables, you can opt back out of this behavior using the --env-mode option on a per-command basis to incrementally migrate. We encourage you to update the env key in your task to account for all of its environment variables so you can drop the --env-mode option as soon as possible.
If you'd like to set the default for the repository back to Loose Mode, you can do so using the envMode configuration.
Workspace root directory is now an implicit dependency of all packages (PR)
The repository should have as little code in the root as possible, since changes to the root can affect all tasks in your repository. Additionally, if you're using Internal Packages in the Workspace root, changes to those dependencies will also cause cache misses for all tasks. In both cases, consider moving the code out of the root and into a package.
--ignore removed in favor of --filter and graph correctness changes below (PR)
Removed --scope flag (deprecated since 1.2) (PR)
engines field in root package.json is now used in hashing (PR)
--filter no longer infers namespaces for package names (PR)
--filter now errors when no package names or directories are matched (PR)
--only restricts task dependencies instead of package dependencies (PR)
Understanding your repository

Learn how to understand your repository structure using Turborepo.

Turborepo API reference

Learn about Turborepo's APIs using the reference.

9,488,622

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Upgrading to 2.0
Update turbo.json
Add a packageManager field to root package.json
Update eslint-config-turbo
Update turbo run commands
Edit this page on GitHub

Scroll to top

Give feedback

Copy page

Ask AI about this page
Open in chat
Resources
Blog
Releases
Docs
Community
GitHub
Community
Bluesky
X
Vercel
About
Open source
Legal
Privacy
Terms
Governance
Telemetry
Cookie Preferences

Upgrading
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
