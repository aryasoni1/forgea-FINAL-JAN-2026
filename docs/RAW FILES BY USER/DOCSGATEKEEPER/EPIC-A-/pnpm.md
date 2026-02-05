Skip to main content
Learn how to Mitigate supply chain attacks with pnpm

pnpm
Docs
Blog
FAQ
Benchmarks
Community
10.x
English
🧡 Sponsor Us

Introduction
Motivation
Feature Comparison
Installation
Usage
pnpm CLI
Configuring
Filtering
Scripts
CLI commands
Manage dependencies
Patch dependencies
Review dependencies
Run scripts
Manage environments
Inspect the store
Manage cache
Misc.
Configuration
package.json
Settings (pnpm-workspace.yaml)
pnpm-workspace.yaml
.pnpmfile.cjs
Features
Supported package sources
Workspace
Catalogs
Config Dependencies
Aliases
Command line tab-completion
Git Branch Lockfiles
Finders
Recipes
Using Changesets with pnpm
Continuous Integration
Mitigating supply chain attacks
Working with TypeScript
Working with Git
Working with Docker
Working with Podman
Advanced
Error Codes
Logos
Limitations
Symlinked `node_modules` structure
How peers are resolved
Uninstalling pnpm
pnpm vs npm
IntroductionMotivation
Version: 10.x
Motivation
Saving disk space
An illustration of the pnpm content-addressable store. On the illustration there are two projects with node_modules. The files in the node_modules directories are hard links to the same files in the content-addressable store.

When using npm, if you have 100 projects using a dependency, you will have 100 copies of that dependency saved on disk. With pnpm, the dependency will be stored in a content-addressable store, so:

If you depend on different versions of the dependency, only the files that differ are added to the store. For instance, if it has 100 files, and a new version has a change in only one of those files, pnpm update will only add 1 new file to the store, instead of cloning the entire dependency just for the singular change.
All the files are saved in a single place on the disk. When packages are installed, their files are hard-linked from that single place, consuming no additional disk space. This allows you to share dependencies of the same version across projects.
As a result, you save a lot of space on your disk proportional to the number of projects and dependencies, and you have a lot faster installations!

Boosting installation speed
pnpm performs installation in three stages:

Dependency resolution. All required dependencies are identified and fetched to the store.
Directory structure calculation. The node_modules directory structure is calculated based on the dependencies.
Linking dependencies. All remaining dependencies are fetched and hard linked from the store to node_modules.
An illustration of the pnpm install process. Packages are resolved, fetched, and hard linked as soon as possible.

This approach is significantly faster than the traditional three-stage installation process of resolving, fetching, and writing all dependencies to node_modules.

An illustration of how package managers like Yarn Classic or npm install dependencies.

Creating a non-flat node_modules directory
When installing dependencies with npm or Yarn Classic, all packages are hoisted to the root of the modules directory. As a result, source code has access to dependencies that are not added as dependencies to the project.

By default, pnpm uses symlinks to add only the direct dependencies of the project into the root of the modules directory.

An illustration of a node_modules directory created by pnpm. Packages in the root node_modules are symlinks to directories inside the node_modules/.pnpm directory

If you'd like more details about the unique node_modules structure that pnpm creates and why it works fine with the Node.js ecosystem, read:

Flat node_modules is not the only way
Symlinked node_modules structure
tip
If your tooling doesn't work well with symlinks, you may still use pnpm and set the nodeLinker setting to hoisted. This will instruct pnpm to create a node_modules directory that is similar to those created by npm and Yarn Classic.

Edit this page
Next
Feature Comparison
Saving disk space
Boosting installation speed
Creating a non-flat node_modules directory
Docs
Getting Started
pnpm CLI
Workspace
Settings (pnpm-workspace.yaml)
Community
X (Twitter)
YouTube
Reddit
Bluesky
Contributing
GitHub
Help Us Translate

Copyright © 2015-2026 contributors of pnpm
Skip to main content
Learn how to Mitigate supply chain attacks with pnpm

pnpm
Docs
Blog
FAQ
Benchmarks
Community
10.x
English
🧡 Sponsor Us

Introduction
Motivation
Feature Comparison
Installation
Usage
pnpm CLI
Configuring
Filtering
Scripts
CLI commands
Manage dependencies
Patch dependencies
Review dependencies
Run scripts
Manage environments
Inspect the store
Manage cache
Misc.
Configuration
package.json
Settings (pnpm-workspace.yaml)
pnpm-workspace.yaml
.pnpmfile.cjs
Features
Supported package sources
Workspace
Catalogs
Config Dependencies
Aliases
Command line tab-completion
Git Branch Lockfiles
Finders
Recipes
Using Changesets with pnpm
Continuous Integration
Mitigating supply chain attacks
Working with TypeScript
Working with Git
Working with Docker
Working with Podman
Advanced
Error Codes
Logos
Limitations
Symlinked `node_modules` structure
How peers are resolved
Uninstalling pnpm
pnpm vs npm
IntroductionFeature Comparison
Version: 10.x
Feature Comparison
Feature pnpm Yarn npm Notes
Workspace support ✅ ✅ ✅
Isolated node_modules ✅ ✅ ✅ Default in pnpm.
Hoisted node_modules ✅ ✅ ✅ Default in npm.
Plug'n'Play ✅ ✅ ❌ Default in Yarn.
Autoinstalling peers ✅ ❌ ✅
Zero-Installs ❌ ✅ ❌
Patching dependencies ✅ ✅ ❌
Managing Node.js versions ✅ ❌ ❌
Managing versions of itself ✅ ✅ ❌
Has a lockfile ✅ ✅ ✅ pnpm-lock.yaml, yarn.lock, package-lock.json.
Overrides support ✅ ✅ ✅ Known as "resolutions" in Yarn.
Content-addressable storage ✅ ✅ ❌ Yarn uses a CAS when nodeLinker is set to pnpm.
Dynamic package execution ✅ ✅ ✅ pnpm dlx, yarn dlx, npx.
Side-effects cache ✅ ❌ ❌
Catalogs ✅ ❌ ❌
Config dependencies ✅ ❌ ❌
JSR registry support ✅ ✅ ❌
Auto-install before script run ✅ ❌ ❌ In Yarn, Plug'n'Play ensures dependencies are always up to date.
Hooks ✅ ✅ ❌
Listing licenses ✅ ✅ ❌ pnpm supports it via pnpm licenses list. Yarn has a plugin for it.
Note: To keep the comparison concise, we include only features likely to be used frequently.

Edit this page
Previous
Motivation
Next
Installation
Docs
Getting Started
pnpm CLI
Workspace
Settings (pnpm-workspace.yaml)
Community
X (Twitter)
YouTube
Reddit
Bluesky
Contributing
GitHub
Help Us Translate

Copyright © 2015-2026 contributors of pnpm
