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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
API reference
Configuring turbo.json
Learn how to configure Turborepo through `turbo.json`.

Configure the behavior of turbo by using a turbo.json file in your Workspace's root directory. You can also:

Use Package Configurations for more granular control.
Use turbo.jsonc to add comments to your configuration with IDE support.
Global options
extends
./apps/web/turbo.json

{
"extends": ["//"],
}
Extend from the root turbo.json to create specific configuration for a package using Package Configurations.

The extends array must start with ["//"] to inherit configuration from the root turbo.json.
You can also extend from other packages (e.g., ["//", "shared-config"]).
If extends is used in the root turbo.json, it will be ignored.
globalDependencies
./turbo.json

{
"globalDependencies": [".env", "tsconfig.json"],
}
A list of globs that you want to include in all task hashes. If any file matching these globs changes, all tasks will miss cache. Globs are relative to the location of turbo.json.

By default, only the root package.json and lockfile are included in the global hash and can't be ignored. Any added globalDependencies will also be included in the global hash.

Globs must be in the repository's source control root. Globs outside of the repository aren't supported.

globalEnv
./turbo.json

{
"globalEnv": ["GITHUB_TOKEN", "PACKAGE_VERSION", "NODE_ENV"],
}
A list of environment variables that you want to impact the hash of all tasks. Any change to these environment variables will cause all tasks to miss cache.

For more on wildcard and negation syntax, see the env section.

globalPassThroughEnv
./turbo.json

{
"globalPassThroughEnv": ["AWS_SECRET_KEY", "GITHUB_TOKEN"],
}
A list of environment variables that you want to make available to tasks. Using this key opts all tasks into Strict Environment Variable Mode.

Additionally, Turborepo has a built-in set of global passthrough variables for common cases, like operating system environment variables. This includes variables like HOME, PATH, APPDATA, SHELL, PWD, and more. The full list can be found in the source code.

Passthrough values do not contribute to hashes for caching

If you want changes in these variables to cause cache misses, you will need to include them in env or globalEnv.

ui
Default: "stream"

Select a terminal UI for the repository.

"tui" allows for viewing each log at once and interacting with the task. "stream" outputs logs as they come in and is not interactive.

./turbo.json

{
"ui": "tui" | "stream"
}
noUpdateNotifier
Default: false

When set to true, disables the update notification that appears when a new version of turbo is available.

./turbo.json

{
"noUpdateNotifier": true
}
concurrency
Default: "10"

Set/limit the maximum concurrency for task execution. Must be an integer greater than or equal to 1 or a percentage value like 50%.

Use 1 to force serial execution (one task at a time).
Use 100% to use all available logical processors.
This option is ignored if the --parallel flag is also passed.
./turbo.json

{
"concurrency": "1",
}
dangerouslyDisablePackageManagerCheck
Default: false

Turborepo uses your repository's lockfile to determine caching behavior, Package Graphs, and more. Because of this, we use the packageManager field to help you stabilize your Turborepo.

To help with incremental migration or in situations where you can't use the packageManager field, you may use --dangerously-disable-package-manager-check to opt out of this check and assume the risks of unstable lockfiles producing unpredictable behavior. When disabled, Turborepo will attempt a best-effort discovery of the intended package manager meant for the repository.

./turbo.json

{
"dangerouslyDisablePackageManagerCheck": true,
}
You may also opt out of this check via flag or the TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK environment variable.

cacheDir
Default: ".turbo/cache"

Specify the filesystem cache directory.

./turbo.json

{
"cacheDir": ".turbo/cache",
}
When no cacheDir is specified and you're working in a Git worktree, Turborepo automatically shares the cache with the main worktree. This allows cache hits across different branches checked out in separate worktrees. Setting an explicit cacheDir disables this behavior.

daemon
Default: true

Turborepo runs a background process to pre-calculate some expensive operations. This standalone process (daemon) is a performance optimization, and not required for proper functioning of turbo.

./turbo.json

{
"daemon": true,
}
When running in a CI environment the daemon is always disabled regardless of this setting.

envMode
Default: "strict"

Turborepo's Environment Modes allow you to control which environment variables are available to a task at runtime:

"strict": Filter environment variables to only those that are specified in the env and globalEnv keys in turbo.json.
"loose": Allow all environment variables for the process to be available.
./turbo.json

{
"envMode": "strict",
}
Read more about Environment Modes.

futureFlags
./turbo.json

{
"futureFlags": {
"errorsOnlyShowHash": true,
},
}
Enable experimental features that will become the default behavior in future versions of Turborepo.

futureFlags can only be set in the root turbo.json. An error will be thrown if set in a Package Configuration.

errorsOnlyShowHash
Default: false

When using outputLogs: "errors-only", show task hashes when tasks start and complete successfully. This provides visibility into which tasks are running without showing full output logs.

With this flag enabled, successful tasks will show messages like:

cache miss, executing <hash> (only logging errors) - when a task starts execution
cache hit, replaying logs (no errors) <hash> - when a task is restored from cache
./turbo.json

{
"futureFlags": {
"errorsOnlyShowHash": true,
},
"tasks": {
"build": {
"outputLogs": "errors-only",
},
},
}
tags Experimental
./apps/web/turbo.json

{
"tags": ["utils"],
}
Adds a tag to a package for use with Boundaries.

This key only works in Package Configurations. Using this key in a root turbo.json will result in an error.

Defining tasks
tasks
Each key in the tasks object is the name of a task that can be executed by turbo run. Turborepo will search the packages described in your Workspace's configuration for scripts in package.json with the name of the task.

Using the rest of the configuration described in the task, Turborepo will run the scripts in the described order, caching logs and file outputs in the outputs key when provided.

In the example below, we've defined three tasks under the tasks key: build, test, and dev.

./turbo.json

{
"$schema": "https://turborepo.dev/schema.json",
"tasks": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**", ".next/**", "!.next/cache/**"],
},
"test": {
"outputs": ["coverage/**"],
"dependsOn": ["build"],
},
"dev": {
"cache": false,
"persistent": true,
},
},
}
Task options
Using the options available in the tasks you define in tasks, you can describe how turbo will run your tasks.

extends (task-level)
Controls whether a task inherits configuration from the extends chain. This option is only available in Package Configurations, not in the root turbo.json.

./packages/ui/turbo.json

{
"extends": ["//"],
"tasks": {
"lint": {
"extends": false, // Exclude this task from the package
},
},
}
Value Behavior
false Task is excluded from inheritance. If no other config is provided, the task won't exist for this package. If other config is provided, creates a fresh task definition with no inheritance.
true (default) Task inherits configuration normally from the extends chain.
See Excluding tasks from inheritance for examples and more details.

description
A human- or agent-readable description of what a task does.

./turbo.json

{
"tasks": {
"build": {
"description": "Compiles the application for production deployment",
},
},
}
This field is for documentation purposes only and does not affect task execution or caching behavior.

dependsOn
A list of tasks that are required to complete before the task begins running.

There are three types of dependsOn relationships: dependency relationships, same-package relationships, and arbitrary task relationships.

Dependency relationships
Prefixing a string in dependsOn with a ^ tells turbo that the task must wait for tasks in the package's dependencies to complete first. For example, in the turbo.json below:

./turbo.json

{
"tasks": {
"build": {
"dependsOn": ["^build"],
},
},
}
turbo starts at the "bottom" of the package graph and recursively visits each package until it finds a package with no internal dependencies. It will then run the build task at the end of the dependency chain first, working its way back to the "top" until all build tasks are completed in order.

Same package relationships
Task names without the ^ prefix describe a task that depends on a different task within the same package. For example, in the turbo.json below:

./turbo.json

{
"tasks": {
"test": {
"dependsOn": ["lint", "build"],
},
},
}
The test task will only run after the lint and build tasks have completed in the same package.

Arbitrary task relationships
Specify a task dependency between specific package tasks.

./turbo.json

{
"tasks": {
"web#lint": {
"dependsOn": ["utils#build"]
}
}
}
In this turbo.json, the web#lint task will wait for the utils#build task to complete.

env
The list of environment variables a task depends on.

./turbo.json

{
"tasks": {
"build": {
"env": ["DATABASE_URL"], // Impacts hash of all build tasks
},
"web#build": {
"env": ["API_SERVICE_KEY"], // Impacts hash of web's build task
},
},
}
Turborepo automatically includes environment variables prefixed by common frameworks through Framework Inference. For example, if your package is a Next.js project, you do not need to specify any environment variables that start with NEXT*PUBLIC*.

Wildcards
Turborepo supports wildcards for environment variables so you can easily account for all environment variables with a given prefix. For example, the turbo.json below include all environment variables that start with MY*API* into the hash:

./turbo.json

{
"tasks": {
"build": {
"env": ["MY_API_*"]
}
}
}
Negation
A leading ! means that the entire pattern will be negated. For instance, the turbo.json below will ignore the MY_API_URL variable.

./turbo.json

{
"tasks": {
"build": {
"env": ["!MY_API_URL"]
}
}
}
Examples
Pattern Description
"_" Matches every environment variable.
"!_" Excludes every environment variable.
"FOO*" Matches FOO, FOOD, FOO_FIGHTERS, etc.
"FOO\*" Resolves to "FOO*" and matches FOO, FOOD, and FOO*FIGHTERS.
"FOO\\*" Matches a single environment variable named FOO\_.
"!FOO\*" Excludes all environment variables that start with FOO.
"\!FOO" Resolves to "!FOO", and excludes a single environment variable named !FOO.
"\\!FOO" Matches a single environment variable named !FOO.
"FOO!" Matches a single environment variable named FOO!.
passThroughEnv
An allowlist of environment variables that should be made available to this task's runtime, even when in Strict Environment Mode.

./turbo.json

{
"tasks": {
"build": {
// Values will be available within `build` scripts
"passThroughEnv": ["AWS_SECRET_KEY", "GITHUB_TOKEN"],
},
},
}
Values provided in passThroughEnv do not contribute to the cache key for the task. If you'd like changes to these variables to cause cache misses, you will need to include them in env or globalEnv.

outputs
A list of file glob patterns relative to the package's package.json to cache when the task is successfully completed.

See $TURBO_ROOT$ if output paths need to be relative to the repository root.

./turbo.json

{
"tasks": {
"build": {
// Cache all files emitted to the packages's `dist` directory
"outputs": ["dist/**"],
},
},
}
Omitting this key or passing an empty array tells turbo to cache nothing (except logs, which are always cached when caching is enabled).

cache
Default: true

Defines if task outputs should be cached. Setting cache to false is useful for long-running development tasks and ensuring that a task always runs when it is in the task's execution graph.

./turbo.json

{
"tasks": {
"build": {
"outputs": [".svelte-kit/**", "dist/**"], // File outputs will be cached
},
"dev": {
"cache": false, // No outputs will be cached
"persistent": true,
},
},
}
inputs
Default: [], all files in the package that are checked into source control

A list of file glob patterns relative to the package's package.json to consider when determining if a package has changed. The following files are always considered inputs, even if you try to explicitly ignore them:

package.json
turbo.json
Package manager lockfiles
Visit the file glob specification for more information on globbing syntax.

./turbo.json

{
"tasks": {
"test": {
"inputs": ["src/**/*.ts", "src/**/*.tsx", "test/**/*.ts"],
},
},
}
Using the inputs key opts you out of turbo's default behavior of considering .gitignore. You must reconstruct the globs from .gitignore as desired or use $TURBO_DEFAULT$ to build off of the default behavior.

$TURBO_DEFAULT$
Because specifying an inputs key immediately opts out of the default behavior, you may use the special string $TURBO_DEFAULT$ within the inputs array to restore turbo's default behavior. This allows you to tweak the default behavior for more granularity.

./turbo.json

{
"tasks": {
"check-types": {
// Consider all default inputs except the package's README
"inputs": ["$TURBO_DEFAULT$", "!README.md"],
},
},
}
$TURBO_ROOT$
Tasks might reference a file that lies outside of their directory.

Starting a file glob with $TURBO_ROOT$ will change the glob to be relative to the root of the repository instead of the package directory.

./turbo.json

{
"tasks": {
"check-types": {
// Consider all Typescript files in `src/` and the root tsconfig.json as inputs
"inputs": ["$TURBO_ROOT$/tsconfig.json", "src/**/*.ts"],
},
},
}
$TURBO_EXTENDS$
When using Package Configurations, array fields completely replace the values from the root turbo.json by default. The $TURBO_EXTENDS$ microsyntax changes this behavior to append instead of replace.

This microsyntax can be used in the following array fields:

dependsOn
env
inputs
outputs
passThroughEnv
with
For example, if your root turbo.json defines:

./turbo.json

{
"tasks": {
"build": {
"outputs": ["dist/**"],
},
},
}
A Package Configuration can add additional outputs while keeping the root outputs:

./apps/web/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
// Inherits "dist/**" from root, and adds ".next/**"
"outputs": ["$TURBO_EXTENDS$", ".next/**", "!.next/cache/**"],
},
},
}
Without $TURBO_EXTENDS$, the outputs array would be completely replaced with [".next/**", "!.next/cache/**"], dropping the "dist/\*\*" from the root configuration.

outputLogs
Default: full

Set output logging verbosity. Can be overridden by the --output-logs CLI option.

Option Description
full Displays all logs
hash-only Only show the hashes of the tasks
new-only Only show logs from cache misses
errors-only Only show logs from task failures
none Hides all task logs
./turbo.json

{
"tasks": {
"build": {
"outputLogs": "new-only",
},
},
}
When using errors-only, you can enable the errorsOnlyShowHash future flag to show task hashes when tasks complete successfully, providing visibility into running tasks without full output logs.

persistent
Default: false

Label a task as persistent to prevent other tasks from depending on long-running processes. Persistent tasks are made interactive by default.

Because a long-running process won't exit, tasks that would depend on it would never run. Once you've labeled the task as persistent, turbo will throw an error if other tasks depend on it.

This option is most useful for development servers or other "watch" tasks.

./turbo.json

{
"tasks": {
"dev": {
"persistent": true,
},
},
}
Tasks marked with persistent are also interactive by default.

interactive
Default: false (Defaults to true for tasks marked as persistent)

Label a task as interactive to make it accept inputs from stdin in the terminal UI. Must be used with persistent.

This option is most useful for scripts that can be manipulated while they are running, like Jest or Vitest.

./turbo.json

{
"tasks": {
"test:watch": {
"interactive": true,
"persistent": true,
},
},
}
interruptible
Default: false

Label a persistent task as interruptible to allow it to be restarted by turbo watch.

turbo watch watches for changes to your packages and automatically restarts tasks that are affected. However, if a task is persistent, it will not be restarted by default. To enable restarting persistent tasks, set interruptible to true.

with
A list of tasks that will be ran alongside this task. This is most useful for long-running tasks that you want to ensure always run at the same time.

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
Boundaries
The boundaries tag allows you to define rules for the boundaries command.

./turbo.json

{
"boundaries": {}
}
tags
Each key in the tags object is the name of a tag that can be checked with turbo boundaries.

In the configuration object for a tag, you can define rules for dependencies and dependents.

dependencies and dependents
Rules for a tag's dependencies and dependents.

You can add an allowlist and a denylist:

./turbo.json

{
"boundaries": {
"utils": {
"dependencies": {
// permit only packages with the `ui` tag
"allow": ["ui"],
// and ban packages with the `unsafe` tag
"deny": ["unsafe"],
},
},
},
}
Both the allowlist and the denylist can be omitted.

./turbo.json

{
"boundaries": {
"utils": {
"dependencies": {
// only packages with the `unsafe` tag are banned, all other packages permitted
"deny": ["unsafe"],
},
},
},
}
Rules can also be added for a tag's dependents, i.e. packages that import this tag.

./turbo.json

{
"boundaries": {
"utils": {
"dependents": {
// only packages with the `web` tag can import packages with the `utils` tag
"allow": ["web"],
},
},
},
}
Remote caching
The global remoteCache option has a variety of fields for configuring remote cache usage

./turbo.json

{
"remoteCache": {},
}
enabled
Default: true

Enables remote caching.

When false, Turborepo will disable all remote cache operations, even if the repo has a valid token. If true, remote caching is enabled, but still requires the user to login and link their repo to a remote cache.

signature
Default: false

Enables signature verification for requests to the remote cache. When true, Turborepo will sign every uploaded artifact using the value of the environment variable TURBO_REMOTE_CACHE_SIGNATURE_KEY. Turborepo will reject any downloaded artifacts that have an invalid signature or are missing a signature.

preflight
Default: false

When enabled, any HTTP request will be preceded by an OPTIONS request to determine if the request is supported by the endpoint.

timeout
Default: 30

Sets a timeout for remote cache operations. Value is given in seconds and only whole values are accepted. If 0 is passed, then there is no timeout for any cache operations.

uploadTimeout
Default: 60

Sets a timeout for remote cache uploads. Value is given in seconds and only whole values are accepted. If 0 is passed, then there is no timeout for any remote cache uploads.

apiUrl
Default: "https://vercel.com"

Set endpoint for API calls to the remote cache.

loginUrl
Default: "https://vercel.com"

Set endpoint for requesting tokens during turbo login.

teamId
The ID of the Remote Cache team. Value will be passed as teamId in the querystring for all Remote Cache HTTP calls. Must start with team\_ or it will not be used.

teamSlug
The slug of the Remote Cache team. Value will be passed as slug in the querystring for all Remote Cache HTTP calls.

Turborepo API reference

Learn about Turborepo's APIs using the reference.

Package Configurations

Learn how to use Package Configurations to bring greater task flexibility to your monorepo's package.

9,496,206

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Global options
extends
globalDependencies
globalEnv
globalPassThroughEnv
ui
noUpdateNotifier
concurrency
dangerouslyDisablePackageManagerCheck
cacheDir
daemon
envMode
futureFlags
errorsOnlyShowHash
tags Experimental
Defining tasks
tasks
Task options
extends (task-level)
description
dependsOn
Dependency relationships
Same package relationships
Arbitrary task relationships
env
Wildcards
Negation
Examples
passThroughEnv
outputs
cache
inputs
$TURBO_DEFAULT$
$TURBO_ROOT$
$TURBO_EXTENDS$
outputLogs
persistent
interactive
interruptible
with
Boundaries
tags
dependencies and dependents
Remote caching
enabled
signature
preflight
timeout
uploadTimeout
apiUrl
loginUrl
teamId
teamSlug
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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
Turborepo API reference
Learn about Turborepo's APIs using the reference.

Turborepo's API reference is broken up into the following sections:

Configuration
Configuring turbo.json
Configure the behavior of `turbo`.

Package Configurations
Create configurations specific to a package.

System environment variables
Change `turbo`'s behavior using environment variables.

File glob specification
Define files for `turbo` to use.

Commands
run
Run tasks using `turbo`.

watch
Dependency-aware, single-process task watcher.

prune
Create partial monorepos for target workspaces.

boundaries
Enforce best practices in your monorepo.

ls
List packages in your monorepo.

query
Run GraphQL queries against your monorepo.

generate
Extend your Turborepo with new apps and packages.

login
Log in to your Remote Cache provider.

logout
Log out of your Remote Cache provider.

link
Link your repository to Remote Cache.

unlink
Disconnect your repository from Remote Cache.

scan
Enable the fastest defaults for your Turborepo.

bin
Get the path to the `turbo` binary.

docs
Search the Turborepo documentation.

telemetry
Manage telemetry for the machine.

Packages
create-turbo
Get started with Turborepo using an example.

eslint-config-turbo
Find environment variables not listed in `turbo.json`.

turbo-ignore
Skip work using `turbo-ignore`.

@turbo/gen
Type definitions for Turborepo generators.

Flag syntax
Options that require a value can be passed with an equals sign, using quotes when spaces are needed.

Terminal

--opt=value
--opt="value with a space"
--opt value
--opt "value with a space"
Global flags
--color
Forces the use of color, even in non-interactive terminals. This is useful for enabling color output in CI environments like GitHub Actions that have support for rendering color.

--no-color
Suppresses color in terminal output, even in interactive terminals.

--no-update-notifier
Disables the update notification. This notification will be automatically disabled when running in CI environments, but can also be disabled manually via this flag.

Alternatively, you can disable the notification using the TURBO_NO_UPDATE_NOTIFIER environment variable.

Upgrading

Learn how to upgrade `turbo` to get the latest improvements to your repository.

Configuring turbo.json

Learn how to configure Turborepo through `turbo.json`.

9,494,003

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Configuration
Commands
Packages
Flag syntax
Global flags
--color
--no-color
--no-update-notifier
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

Turborepo API reference
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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
API reference
Package Configurations
Learn how to use Package Configurations to bring greater task flexibility to your monorepo's package.

Many monorepos can declare a turbo.json in the root directory with a task description that applies to all packages. But, sometimes, a monorepo can contain packages that need to configure their tasks differently.

To accommodate this, Turborepo enables you to extend the root configuration with a turbo.json in any package. This flexibility enables a more diverse set of apps and packages to co-exist in a Workspace, and allows package owners to maintain specialized tasks and configuration without affecting other apps and packages of the monorepo.

How it works
To override the configuration for any task defined in the root turbo.json, add a turbo.json file in any package of your monorepo with a top-level extends key:

./apps/my-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
// Custom configuration for the build task in this package
},
"special-task": {}, // New task specific to this package
},
}
The extends array must start with ["//"]. // is a special name used to identify the root directory of the monorepo. You can also extend from other packages by adding them after // (e.g., ["//", "shared-config"]).

Inheritance behavior
When a Package Configuration extends the root turbo.json, task properties are inherited differently depending on their type.

Scalar fields are inherited
Scalar fields like outputLogs, cache, persistent, and interactive are inherited from the root configuration. You only need to specify them in a Package Configuration if you want to override them.

For example, if your root turbo.json sets "outputLogs": "hash-only" for a task, all packages inherit that setting automatically.

Array fields replace by default
Array fields like outputs, env, inputs, dependsOn, and passThroughEnv completely replace the root configuration's values by default.

./turbo.json

{
"tasks": {
"build": {
"outputs": ["dist/**"],
"env": ["NODE_ENV"],
},
},
}
./apps/my-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
// This REPLACES the root outputs - "dist/**" is NOT included
"outputs": [".next/**"],
},
},
}
Extending arrays with $TURBO_EXTENDS$
To add to inherited array values instead of replacing them, use the $TURBO_EXTENDS$ microsyntax:

./apps/my-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
// Inherits "dist/**" from root AND adds ".next/**"
"outputs": ["$TURBO_EXTENDS$", ".next/**"],
},
},
}
The $TURBO_EXTENDS$ marker must be the first element in the array. It works with outputs, env, inputs, dependsOn, passThroughEnv, and with.

Extending from other packages
Package Configurations can extend from other packages' turbo.json files, not just the root. This enables composing shared task configurations across packages.

Extend from any package by using its name from package.json in your extends array. For example, if you have a Next.js app at ./apps/web with "name": "web" in its package.json:

./apps/web/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
"outputs": [".next/**", "!.next/cache/**"],
},
"dev": {
"cache": false,
"persistent": true,
},
},
}
Another Next.js app can extend from it to share the same configuration:

./apps/docs/turbo.json

{
"extends": ["//", "web"],
"tasks": {
"build": {
// Additional customization specific to this package
"env": ["NEXT_PUBLIC_DOCS_URL"],
},
},
}
When extending from multiple configurations, the root ("//") must always be listed first in the extends array.

Inheritance order
When extending from multiple configurations, task definitions are merged in the order they appear in the extends array:

Root turbo.json ("//") is applied first
Each additional package configuration is applied in order
The current package's configuration is applied last
Later configurations override earlier ones for scalar fields. For array fields, see Extending arrays with $TURBO_EXTENDS$ to append instead of replace.

Patterns for sharing configuration
Extend from an existing package: If you already have a package with the configuration you want to share, other packages can extend from it directly. This works well when one package serves as the "canonical" example for similar packages (e.g., your main Next.js app that other Next.js apps can extend from).

Create a dedicated configuration package: For larger monorepos, you may want to create packages specifically for sharing configuration. This keeps configuration separate from application code and makes it clear that other packages depend on these settings. These packages typically only contain a package.json and turbo.json.

shared-config/package.json
shared-config/turbo.json
apps/web/turbo.json
./packages/shared-config/package.json

{
"name": "shared-config",
"private": true
}
Excluding tasks from inheritance
When extending from the root or other packages, your package inherits all their task definitions by default. You can use the task-level extends field to opt out of specific tasks.

Excluding a task entirely
To completely exclude an inherited task from your package, set extends: false with no other configuration:

./turbo.json

{
"tasks": {
"build": {},
"lint": {},
"test": {},
},
}
./packages/ui/turbo.json

{
"extends": ["//"],
"tasks": {
"lint": {
"extends": false, // This package does not have a lint task
},
},
}
When you run turbo run lint, the ui package will be skipped entirely for the lint task.

Creating a fresh task definition
To create a new task definition that doesn't inherit any configuration from the extends chain, use extends: false along with other task configuration:

./packages/special-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
"extends": false, // Don't inherit from root
"outputs": ["out/**"],
"env": ["SPECIAL_VAR"],
},
},
}
This is useful when you need completely different task configuration that shouldn't merge with inherited values.

Exclusions propagate through the chain
When a package excludes a task, that exclusion propagates to packages that extend from it:

./packages/base-config/turbo.json

{
"extends": ["//"],
"tasks": {
"lint": {
"extends": false, // Exclude lint from this config
},
},
}
./apps/web/turbo.json

{
"extends": ["//", "base-config"],
"tasks": {
// web does not inherit lint from root because base-config excluded it
},
}
Task-level extends is only available in Package Configurations. Using extends on a task in the root turbo.json will result in a validation error.

Examples
Different frameworks in one Workspace
Let's say your monorepo has multiple Next.js apps, and one SvelteKit app. Both frameworks create their build output with a build script in their respective package.json. You could configure Turborepo to run these tasks with a single turbo.json at the root like this:

./turbo.json

{
"tasks": {
"build": {
"outputs": [".next/**", "!.next/cache/**", ".svelte-kit/**"],
},
},
}
Notice that both .next/** and .svelte-kit/** need to be specified as outputs, even though Next.js apps do not generate a .svelte-kit directory, and vice versa.

With Package Configurations, you can instead add custom configuration in the SvelteKit package in apps/my-svelte-kit-app/turbo.json:

./apps/my-svelte-kit-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
"outputs": [".svelte-kit/**"],
},
},
}
and remove the SvelteKit-specific outputs from the root configuration:

./turbo.json

{
"tasks": {
"build": {

-      "outputs": [".next/**", "!.next/cache/**", ".svelte-kit/**"]

*      "outputs": [".next/**", "!.next/cache/**"]
      }
  }
  }
  This not only makes each configuration easier to read, it puts the configuration closer to where it is used.

Specialized tasks
In another example, say that the build task in one package dependsOn a compile task. You could universally declare it as dependsOn: ["compile"]. This means that your root turbo.json has to have an empty compile task entry:

./turbo.json

{
"tasks": {
"build": {
"dependsOn": ["compile"]
},
"compile": {}
}
}
With Package Configurations, you can move that compile task into the apps/my-custom-app/turbo.json,

./apps/my-app/turbo.json

{
"extends": ["//"],
"tasks": {
"build": {
"dependsOn": ["compile"]
},
"compile": {}
}
}
and remove it from the root:

./turbo.json

{
"tasks": {

- "build": {}

* "build": {
*      "dependsOn": ["compile"]
* },
* "compile": {}
  }
  }
  Now, the owners of my-app, can have full ownership over their build task, but continue to inherit any other tasks defined at the root.

Comparison to package-specific tasks
The package#task syntax in the root turbo.json completely overwrites all task configuration—nothing is inherited.

With Package Configurations, scalar fields are inherited and only the fields you specify are overridden. This means less duplication when you only need to change one or two properties.

Although there are no plans to remove package-specific task configurations, we expect that Package Configurations can be used for most use cases instead.

Boundaries Tags Experimental
Package Configurations are also used to declare Tags for Boundaries. To do so, add a tags field to your turbo.json:

./apps/my-app/turbo.json

{

- "tags": ["my-tag"],
  "extends": ["//"],
  "tasks": {
  "build": {
  "dependsOn": ["compile"]
  },
  "compile": {}
  }
  }
  From there, you can define rules for which dependencies or dependents a tag can have. Check out the Boundaries documentation for more details.

Limitations
Although the general idea is the same as the root turbo.json, Package Configurations come with a set of guardrails that can prevent packages from creating potentially confusing situations.

Package Configurations cannot use the workspace#task syntax as task entries
The package is inferred based on the location of the configuration, and it is not possible to change configuration for another package. For example, in a Package Configuration for my-nextjs-app:

./apps/my-nextjs-app/turbo.json

{
"tasks": {
"my-nextjs-app#build": {
// This is not allowed. Even though it's
// referencing the correct package, "my-nextjs-app"
// is inferred, and we don't need to specify it again.
// This syntax also has different behavior, so we do not want to allow it.
// (see "Comparison to package-specific tasks" section)
},
"my-sveltekit-app#build": {
// Changing configuration for the "my-sveltekit-app" package
// from Package Configuration in "my-nextjs-app" is not allowed.
},
"build": {
// Just use the task name!
},
},
}
Note that the build task can still depend on a package-specific task:

./apps/my-nextjs-app/turbo.json

{
"tasks": {
"build": {
"dependsOn": ["some-pkg#compile"], // [!code highlight]
},
},
}
Package Configurations can only override values in the tasks key
It is not possible to override global configuration like globalEnv or globalDependencies in a Package Configuration. Configuration that would need to be altered in a Package Configuration is not truly global and should be configured differently.

Root turbo.json cannot use the extends key
To avoid creating circular dependencies on packages, the root turbo.json cannot extend from anything. The extends key will be ignored.

Troubleshooting
In large monorepos, it can sometimes be difficult to understand how Turborepo is interpreting your configuration. To help, we've added a resolvedTaskDefinition to the Dry Run output. If you run turbo run build --dry-run, for example, the output will include the combination of all turbo.json configurations that were considered before running the build task.

Configuring turbo.json

Learn how to configure Turborepo through `turbo.json`.

System environment variables

Learn about system variables used by Turborepo.

9,496,005

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
How it works
Inheritance behavior
Scalar fields are inherited
Array fields replace by default
Extending arrays with $TURBO_EXTENDS$
Extending from other packages
Inheritance order
Patterns for sharing configuration
Excluding tasks from inheritance
Excluding a task entirely
Creating a fresh task definition
Exclusions propagate through the chain
Examples
Different frameworks in one Workspace
Specialized tasks
Comparison to package-specific tasks
Boundaries Tags Experimental
Limitations
Package Configurations cannot use the workspace#task syntax as task entries
Package Configurations can only override values in the tasks key
Root turbo.json cannot use the extends key
Troubleshooting
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

Package Configurations
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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
API reference
System environment variables
Learn about system variables used by Turborepo.

By setting certain environment variables, you can change Turborepo's behavior. This can be useful for creating specific configurations for different environments and machines.

System environment variables are always overridden by flag values provided directly to your turbo commands.

Variable Description
FORCE_COLOR Forces color to be shown in terminal logs
TURBO_API
Set the base URL for Remote Cache.

TURBO_BINARY_PATH
Manually set the path to the turbo binary. By default, turbo will automatically discover the binary so you should only use this in rare circumstances.

TURBO_CACHE
Control reading and writing for cache sources. Uses the same syntax as --cache.

TURBO_CACHE_DIR Sets the cache directory, similar to using --cache-dir flag.
TURBO_CI_VENDOR_ENV_KEY
Set a prefix for environment variables that you want excluded from Framework Inference.

NOTE: This does not need to be set by the user and should be configured automatically by supported platforms.

TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK
Disable checking the packageManager field in package.json.

You may run into errors and unexpected caching behavior when disabling this check. Use true or 1 to disable.

TURBO_DOWNLOAD_LOCAL_ENABLED
Enables global turbo to install the correct local version if one is not found.

TURBO_FORCE
Set to true to force all tasks to run in full, opting out of all caching.

TURBO_GLOBAL_WARNING_DISABLED
Disable warning when global turbo cannot find a local version to use.

TURBO_PRINT_VERSION_DISABLED
Disable printing the version of turbo that is being executed.

TURBO_LOG_ORDER Set the log order. Allowed values aregroupedand default.
TURBO_LOGIN
Set the URL used to log in to Remote Cache.

Only needed for self-hosted Remote Caches that implement an endpoint that dynamically creates tokens.

TURBO_NO_UPDATE_NOTIFIER
Remove the update notifier that appears when a new version of turbois available.

You can also use NO_UPDATE_NOTIFIER per ecosystem convention.

TURBO_PLATFORM_ENV
A CSV of environment variable keys that are configured in a supported CI environment (Vercel).

NOTE: This variable is meant for platforms looking to implement zero-configuration environment variables. You are not meant to use this variable as an end user.

TURBO_PLATFORM_ENV_DISABLED Disable checking environment variables configured in your turbo.json against those set on your supported platform
TURBO_PREFLIGHT
Enables sending a preflight request before every cache artifact and analytics request. The follow-up upload and download will follow redirects. Only applicable when Remote Caching is configured.

TURBO_REMOTE_CACHE_READ_ONLY
Prevent writing to the Remote Cache - but still allow reading.

TURBO_REMOTE_CACHE_SIGNATURE_KEY
Sign artifacts with a secret key. For more information, visit the Artifact Integrity section.

TURBO_REMOTE_CACHE_TIMEOUT
Set a timeout in seconds for turbo to get artifacts from Remote Cache.

TURBO_REMOTE_CACHE_UPLOAD_TIMEOUT
Set a timeout in seconds for turbo to upload artifacts to Remote Cache.

TURBO_REMOTE_ONLY Always ignore the local filesystem cache for all tasks.
TURBO_RUN_SUMMARY
Generate a Run Summary when you run tasks.

TURBO_SCM_BASE
Base used by --affected when calculating what has changed from base...head

TURBO_SCM_HEAD
Head used by --affected when calculating what has changed from base...head

TURBO_TEAM
The account name associated with your repository. When using Vercel Remote Cache, this is your team's slug.

TURBO_TEAMID
The account identifier associated with your repository. When using Vercel Remote Cache, this is your team's ID.

TURBO_TELEMETRY_MESSAGE_DISABLED
Disable the message notifying you that Telemetry is enabled.

TURBO_TOKEN
The Bearer token for authentication to access Remote Cache.

TURBO_UI
Enables TUI when passed true or 1, disables when passed false or 0.

TURBO_CONCURRENCY
Controls concurrency settings in run or watch mode.

TURBO_SSO_LOGIN_CALLBACK_PORT
Override the default port (9789) used for the SSO login callback server during authentication.

Environment variables in tasks
Turborepo will make the following environment variables available within your tasks while they are executing:

Variable Description
TURBO_HASH The hash of the currently running task.
TURBO_IS_TUI When using the TUI, this variable is set to true.
TURBO_IS_MFE When using the microfrontends, this variable is set to the port defined in microfrontends.json for the application.
Package Configurations

Learn how to use Package Configurations to bring greater task flexibility to your monorepo's package.

File glob specification

Learn about the file glob specification used by `turbo`.

9,495,576

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Environment variables in tasks
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

System environment variables
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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
API reference
File glob specification
Learn about the file glob specification used by `turbo`.

File globs are used throughout Turborepo for configuring which files to include or exclude in various contexts, allowing you to specifically define the files you want turbo to use.

Glob patterns
Pattern Description

- Match all files in the directory
  ** Recursively match all files and sub-directories
  some-dir/ Match the some-dir directory and its contents
  some-dir Match a file named some-dir or a some-dir directory and its contents
  some-dir* Match files and directories that start with some-dir, including contents when matching a directory
  *.js Match all .js files in the directory
  ! Negate the whole glob (automatically applies /** to the end of the defined glob)
  Examples
  Pattern Description
  dist/** Match all files in the dist directory, its contents, and all sub-directories
  dist/ Match the dist directory and its contents
  dist Match a file named dist or a dist directory, its contents, and all sub-directories
  dist/some-dir/** Match all files in the dist/some-dir directory and all sub-directories in the current directory
  !dist Ignore the dist directory and all of its contents
  dist* Match files and directories that start with dist
  dist/*.js Match all .js files in the dist directory
  !dist/_.js Ignore all .js files in the dist directory
  dist/\*\*/_.js Recursively match all .js files in the dist directory and its sub-directories
  ../scripts/\*\* Up one directory, match all files and sub-directories in the scripts directory
  System environment variables

Learn about system variables used by Turborepo.

Options overview

Flags, configurations, and System Environment Variables for Turborepo

9,494,121

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Glob patterns
Examples
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

File glob specification
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
Configuration

Configuring turbo.json
Package Configurations
System environment variables
File glob specification
Options overview
Commands

run
watch
prune
boundaries
ls
query
devtools
docs
generate
scan
login
logout
link
unlink
bin
info
telemetry
Packages

create-turbo
eslint-config-turbo
eslint-plugin-turbo
turbo-ignore
@turbo/codemod
@turbo/gen
Core concepts
Guides
Community
Support policy
Glossary
Changelog
API reference
Options overview
Flags, configurations, and System Environment Variables for Turborepo

There are three ways to manage the behavior of a turbo invocation:

Configuration in turbo.json
System Environment Variables
Flags passed to the CLI invocation
The three strategies listed above are in order of precedence. Where a flag value is provided, for the same System Environment Variable or turbo.json configuration, the value for the flag will be used. Because of this, we recommend using:

turbo.json configuration for defaults
System Environment Variables for per-environment overrides
Flags for per-invocation overrides
Options table
Caching
Behavior Flags Environment Variables turbo.json
Force tasks to run --force TURBO_FORCE cache
Remote Cache timeout --remote-cache-timeout TURBO_REMOTE_CACHE_TIMEOUT remoteCache.timeout
Remote Cache upload timeout - TURBO_REMOTE_CACHE_UPLOAD_TIMEOUT remoteCache.uploadTimeout
Cache signature key - TURBO_REMOTE_CACHE_SIGNATURE_KEY signature
Preflight request --preflight TURBO_PREFLIGHT remoteCache.preflight
Remote Cache base URL - TURBO_API remoteCache.apiUrl
Cache sources --cache TURBO_CACHE -
Local cache directory --cache-dir TURBO_CACHE_DIR cacheDir
Messages
Behavior Flags Environment Variables turbo.json
Disable version print - TURBO_PRINT_VERSION_DISABLED -
Disable telemetry message - TURBO_TELEMETRY_MESSAGE_DISABLED -
Disable global turbo warning - TURBO_GLOBAL_WARNING_DISABLED -
No update notifier - TURBO_NO_UPDATE_NOTIFIER noUpdateNotifier
Task running and logs
Behavior Flags Environment Variables turbo.json
Terminal UI --ui TURBO_UI ui
Run affected tasks --affected - -
Disable package manager check --dangerously-disable-package-manager-check TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK dangerouslyDisablePackageManagerCheck
Affected base ref - TURBO_SCM_BASE -
Affected head ref - TURBO_SCM_HEAD -
Only run directly specified tasks --only - -
Task concurrency --concurrency TURBO_CONCURRENCY -
Task log order --log-order TURBO_LOG_ORDER -
Current working directory --cwd - -
Streamed logs prefix --log-prefix - -
Task logs output level --output-logs-option - outputLogs
Global inputs --global-deps - globalDependencies
Terminal colors --color FORCE_COLOR -
Environment variables
Behavior Flags Environment Variables turbo.json
Environment variable mode --env-mode - envMode
Vendor environment variables - TURBO_CI_VENDOR_ENV_KEY -
Framework variable exceptions --framework-inference - -
Debugging outputs
Behavior Flags Environment Variables turbo.json
Run Summaries --summarize TURBO_RUN_SUMMARY -
Graph visualization --graph - -
Dry run --dry - -
Authentication
Behavior Flags Environment Variables turbo.json
Login URL - TURBO_LOGIN remoteCache.loginUrl
Team name (for multi-team Remote Cache) --team TURBO_TEAM -
Team ID (for multi-team Remote Cache) - TURBO_TEAMID -
Authentication token --token TURBO_TOKEN -
Other
Behavior Flags Environment Variables turbo.json
Binary path - TURBO_BINARY_PATH -
Download local turbo - TURBO_DOWNLOAD_LOCAL_ENABLED -
Daemon --daemon / --no-daemon - daemon
File glob specification

Learn about the file glob specification used by `turbo`.

run

API reference for the `turbo run` command

9,488,953

hours

Total Compute Saved
Get started with
Remote Caching →
On this page
Options table
Caching
Messages
Task running and logs
Environment variables
Debugging outputs
Authentication
Other
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

Options overview
Chat

What is Turborepo?
How do I set up a monorepo with Turborepo?
What is Remote Caching?
How do I configure tasks in turbo.json?
Tip: You can open and close chat with
