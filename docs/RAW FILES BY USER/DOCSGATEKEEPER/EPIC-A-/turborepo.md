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
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Introduction
Welcome to the Turborepo documentation!

What is Turborepo?
Turborepo is a high-performance build system for JavaScript and TypeScript codebases. It is designed for scaling monorepos and also makes workflows in single-package workspaces faster, too.

From individual developers to the largest enterprise engineering organizations in the world, Turborepo is saving years of engineering time and millions of dollars in compute costs through a lightweight approach to optimizing the tasks you need to run in your repository.

The monorepo problem
Monorepos have many advantages - but they struggle to scale. Each workspace has its own test suite, its own linting, and its own build process. A single monorepo might have thousands of tasks to execute.

A representation of a typical monorepo. The first application took 110 seconds to complete its tasks. The second application took 140 seconds to complete its tasks. The shared package between them took 90 seconds to complete its tasks.

These slowdowns can dramatically affect the way your teams build software, especially at scale. Feedback loops need to be fast so developers can deliver high-quality code quickly.

The monorepo solution
The monorepo from before using Turborepo, showing how it can hit cache to complete tasks for all three packages in 80 milliseconds.

Turborepo solves your monorepo's scaling problem. Remote Cache stores the result of all your tasks, meaning that your CI never needs to do the same work twice.

Additionally, task scheduling can be difficult in a monorepo. You may need to build, then test, then lint...

Turborepo schedules your tasks for maximum speed, parallelizing work across all available cores.

Turborepo can be adopted incrementally and you can add it to any repository in just a few minutes. It uses the package.json scripts you've already written, the dependencies you've already declared, and a single turbo.json file. You can use it with any package manager, like npm, yarn or pnpm since Turborepo leans on the conventions of the npm ecosystem.

How to use these docs
We will do our best to keep jargon to a minimum - but there are some need-to-know words that will be important to understand as you read through the docs. We've created a glossary page to help you out in case you're learning about these terms.

Join the community
If you have questions about anything related to Turborepo, you're always welcome to ask the community on GitHub Discussions, Vercel Community, and Twitter.

Getting started

Get started with Turborepo.

9,494,697

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
What is Turborepo?
The monorepo problem
The monorepo solution
How to use these docs
Join the community
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
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Getting started
Get started with Turborepo.

If you're new to Turborepo, you can follow these steps to get started.

Install Turborepo
Install turbo globally so you can conveniently run turbo commands in your terminal from anywhere in your repository.

npm
yarn
pnpm
Terminal

npm install turbo --global
To learn more about installing turbo, see the installation guide.

Choose your learning path
Use create-turbo
Start with a template

Use an example
Start with a framework-specific example

Follow the in-depth guides
From zero to monorepo

Add to an existing repository
Make your current repo fast

Introduction

Welcome to the Turborepo documentation!

Installation

Learn how to get started with Turborepo.

9,495,660

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Install Turborepo
Choose your learning path
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

Getting started
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
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Getting started
Installation
Learn how to get started with Turborepo.

Get started with Turborepo in a few moments using:

pnpm
yarn
npm
bun
Terminal

pnpm dlx create-turbo@latest
The starter repository will have:

Two deployable applications
Three shared libraries for use in the rest of the monorepo
For more details on the starter, visit the README for the basic starter on GitHub. You can also use an example that more closely fits your tooling interests.

Installing turbo
turbo can be installed both globally and in your repository. We highly recommend installing both ways so you can take advantage of fast, convenient workflows and a stable version of turbo for all developers working in your repository.

Global installation
A global install of turbo brings flexibility and speed to your local workflows.

pnpm
yarn
npm
bun
Terminal

pnpm add turbo --global
Once installed globally, you can run your scripts through turbo from your terminal, quickly running one-off commands to use within your repository. For example:

turbo build: Run build scripts following your repository's dependency graph
turbo build --filter=docs --dry: Quickly print an outline of the build task for your docs package (without running it)
turbo generate: Run Generators to add new code to your repository
cd apps/docs && turbo build: Run the build script in the docs package and its dependencies. For more, visit the Automatic Package Scoping section.
turbo is an alias for turbo run. For example, turbo build and turbo run build will both run your build task.

Avoid multiple global installations

If you've installed global turbo before, make sure you use the same package manager as your existing installation to avoid unexpected behaviors. You can quickly check which package manager you previously used with turbo bin.

Using global turbo in CI
You can also take advantage of global turbo when creating your CI pipelines. Visit the Constructing CI guide for more information.

Repository installation
When collaborating with other developers in a repository, it's a good idea to pin versions of dependencies. You can do this with turbo by adding it as a devDependency in the root of your repository:

pnpm
yarn
npm
bun
Terminal

pnpm add turbo --save-dev --ignore-workspace-root-check
You can continue to use your global installation of turbo to run commands. Global turbo will defer to the local version of your repository if it exists.

This lets you to get the best of both installations: easily run commands in your terminal while maintaining a pinned version for consistent usage for all developers in the repository.

Getting started

Get started with Turborepo.

Start with an example

Start with an example Turborepo.

9,495,324

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Installing turbo
Global installation
Using global turbo in CI
Repository installation
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

Installation
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
API reference
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Getting started
Editor integration
Making the most of Turborepo

To get the best experience with turbo, Turborepo provides a few utilities for integrating with your editor.

JSON Schema for turbo.json
Turborepo uses JSON Schema to give you auto-complete in your turbo.json files. By including the $schema key in your turbo.json, your editor is able to provide full documentation and linting for invalid configuration.

Sourcing from web
Starting with Turborepo 2.5.7, versioned schemas are available via subdomain, following the format https://v<version>.turborepo.dev/schema.json. The version uses a dash separator.

./turbo.json

{
"$schema": "https://v2-5-7.turborepo.dev/schema.json"
}
This has the advantage of not needing to run your package manager's install command to see in-editor validation, while also ensuring you're using the schema that matches your installed version of turbo.

Unversioned schema

If you're using a version of Turborepo older than 2.5.7 or prefer an unversioned schema, you can use https://turborepo.dev/schema.json instead.

Sourcing from node_modules
Starting in Turborepo 2.4, schema.json is available in node_modules once you've run your package manager's install command:

turbo.json

{
"$schema": "./node_modules/turbo/schema.json"
}
node_modules location

We recommend installing turbo at the root of your repository, so the path for the schema should point to node_modules at the root of your repository. In Package Configurations, you may need to use a path like ../../node_modules/turbo/schema.json.

Linting for environment variables
Handling environment variables is an important part of building applications in a Turborepo.

The eslint-config-turbo package extends your ESLint setup to help you make sure you've taken care of all of your environment variables.

Turborepo LSP
Enable even more auto-complete and linting than provided by JSON Schema, with in-editor hinting for invalid globs, references to non-existent tasks or packages, and extra repository visibility tools.

Visit the VSCode Extension Marketplace to install.

Not using Visual Studio Code?

The language server can be used on any editors that support the Language Server Protocol. Log a request in our issue tracker to express your interest.

Add to an existing repository

Using Turborepo with your existing repository

Crafting your repository

Design and build your Turborepo.

9,493,063

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
JSON Schema for turbo.json
Sourcing from web
Sourcing from node_modules
Linting for environment variables
Turborepo LSP
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

Editor integration
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
