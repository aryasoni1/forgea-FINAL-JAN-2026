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
FeaturesWorkspace
Version: 10.x
Workspace
pnpm has built-in support for monorepositories (AKA multi-package repositories, multi-project repositories, or monolithic repositories). You can create a workspace to unite multiple projects inside a single repository.

A workspace must have a pnpm-workspace.yaml file in its root.

tip
If you are looking into monorepo management, you might also want to look into Bit. Bit uses pnpm under the hood but automates a lot of the things that are currently done manually in a traditional workspace managed by pnpm/npm/Yarn. There's an article about bit install that talks about it: Painless Monorepo Dependency Management with Bit.

Workspace protocol (workspace:)
If linkWorkspacePackages is set to true, pnpm will link packages from the workspace if the available packages match the declared ranges. For instance, foo@1.0.0 is linked into bar if bar has "foo": "^1.0.0" in its dependencies and foo@1.0.0 is in the workspace. However, if bar has "foo": "2.0.0" in dependencies and foo@2.0.0 is not in the workspace, foo@2.0.0 will be installed from the registry. This behavior introduces some uncertainty.

Luckily, pnpm supports the workspace: protocol. When this protocol is used, pnpm will refuse to resolve to anything other than a local workspace package. So, if you set "foo": "workspace:2.0.0", this time installation will fail because "foo@2.0.0" isn't present in the workspace.

This protocol is especially useful when the linkWorkspacePackages option is set to false. In that case, pnpm will only link packages from the workspace if the workspace: protocol is used.

Referencing workspace packages through aliases
Let's say you have a package in the workspace named foo. Usually, you would reference it as "foo": "workspace:\*".

If you want to use a different alias, the following syntax will work too: "bar": "workspace:foo@\*".

Before publish, aliases are converted to regular aliased dependencies. The above example will become: "bar": "npm:foo@1.0.0".

Referencing workspace packages through their relative path
In a workspace with 2 packages:

- packages
  - foo
  - bar

bar may have foo in its dependencies declared as "foo": "workspace:../foo". Before publishing, these specs are converted to regular version specs supported by all package managers.

Publishing workspace packages
When a workspace package is packed into an archive (whether it's through pnpm pack or one of the publish commands like pnpm publish), we dynamically replace any workspace: dependency by:

The corresponding version in the target workspace (if you use workspace:\*, workspace:~, or workspace:^)
The associated semver range (for any other range type)
So for example, if we have foo, bar, qar, zoo in the workspace and they all are at version 1.5.0, the following:

{
"dependencies": {
"foo": "workspace:\*",
"bar": "workspace:~",
"qar": "workspace:^",
"zoo": "workspace:^1.5.0"
}
}

Will be transformed into:

{
"dependencies": {
"foo": "1.5.0",
"bar": "~1.5.0",
"qar": "^1.5.0",
"zoo": "^1.5.0"
}
}

This feature allows you to depend on your local workspace packages while still being able to publish the resulting packages to the remote registry without needing intermediary publish steps - your consumers will be able to use your published workspaces as any other package, still benefitting from the guarantees semver offers.

Release workflow
Versioning packages inside a workspace is a complex task and pnpm currently does not provide a built-in solution for it. However, there are 2 well tested tools that handle versioning and support pnpm:

changesets
Rush
For how to set up a repository using Rush, read this page.

For using Changesets with pnpm, read this guide.

Troubleshooting
pnpm cannot guarantee that scripts will be run in topological order if there are cycles between workspace dependencies. If pnpm detects cyclic dependencies during installation, it will produce a warning. If pnpm is able to find out which dependencies are causing the cycles, it will display them too.

If you see the message There are cyclic workspace dependencies, please inspect workspace dependencies declared in dependencies, optionalDependencies and devDependencies.

Usage examples
Here are a few of the most popular open source projects that use the workspace feature of pnpm:

Project Stars Migration date Migration commit
Next.js 2022-05-29 f7b81316aea4fc9962e5e54981a6d559004231aa
n8n 2022-11-09 736777385c54d5b20174c9c1fda38bb31fbf14b4
Material UI 2024-01-03 a1263e3e5ef8d840252b4857f85b33caa99f471d
Vite 2021-09-26 3e1cce01d01493d33e50966d0d0fd39a86d229f9
Nuxt 2022-10-17 74a90c566c936164018c086030c7de65b26a5cb6
Vue 2021-10-09 61c5fbd3e35152f5f32e95bf04d3ee083414cecb
Astro 2022-03-08 240d88aefe66c7d73b9c713c5da42ae789c011ce
Prisma 2021-09-21 c4c83e788aa16d61bae7a6d00adc8a58b3789a06
Novu 2021-12-23 f2ea61f7d7ac7e12db4c9e70767082841ed98b2b
Slidev 2021-04-12 d6783323eb1ab1fc612577eb63579c8f7bc99c3a
Turborepo 2022-03-02 fd171519ec02a69c9afafc1bc5d9d1b481fba721
Quasar Framework 2024-03-13 7f8e550bb7b6ab639ce423d02008e7f5e61cbf55
Element Plus 2021-09-23 f9e192535ff74d1443f1d9e0c5394fad10428629
NextAuth.js 2022-05-03 4f29d39521451e859dbdb83179756b372e3dd7aa
Ember.js 2023-10-18 b6b05da662497183434136fb0148e1dec544db04
Qwik 2022-11-14 021b12f58cca657e0a008119bc711405513e1ee9
VueUse 2021-09-25 826351ba1d9c514e34426c85f3d69fb9875c7dd9
SvelteKit 2021-09-26 b164420ab26fa04fd0fbe0ac05431f36a89ef193
Verdaccio 2021-09-21 9dbf73e955fcb70b0a623c5ab89649b95146c744
Vercel 2023-01-12 9c768b98b71cfc72e8638bf5172be88c39e8fa69
Vitest 2021-12-13 d6ff0ccb819716713f5eab5c046861f4d8e4f988
Cycle.js 2021-09-21 f2187ab6688368edb904b649bd371a658f6a8637
Milkdown 2021-09-26 4b2e1dd6125bc2198fd1b851c4f00eda70e9b913
Nhost 2022-02-07 10a1799a1fef2f558f737de3bb6cadda2b50e58f
Logto 2021-07-29 0b002e07850c8e6d09b35d22fab56d3e99d77043
Rollup plugins 2021-09-21 53fb18c0c2852598200c547a0b1d745d15b5b487
icestark 2021-12-16 4862326a8de53d02f617e7b1986774fd7540fccd
ByteMD 2021-02-18 36ef25f1ea1cd0b08752df5f8c832302017bb7fb
Stimulus Components 2024-10-26 8e100d5b2c02ad5bf0b965822880a60f543f5ec3
Serenity/JS 2025-01-01 43dbe6f440d8dd81811da303e542381a17d06b4d
kysely 2025-07-29 5ac19105ddb17af310c67e004c11fa3345454b66
Configuration
linkWorkspacePackages
Default: false
Type: true, false, deep
If this is enabled, locally available packages are linked to node_modules instead of being downloaded from the registry. This is very convenient in a monorepo. If you need local packages to also be linked to subdependencies, you can use the deep setting.

Else, packages are downloaded and installed from the registry. However, workspace packages can still be linked by using the workspace: range protocol.

Packages are only linked if their versions satisfy the dependency ranges.

injectWorkspacePackages
Default: false
Type: Boolean
Enables hard-linking of all local workspace dependencies instead of symlinking them. Alternatively, this can be achieved using dependenciesMeta[].injected, which allows to selectively enable hard-linking for specific dependencies.

note
Even if this setting is enabled, pnpm will prefer to deduplicate injected dependencies using symlinks—unless multiple dependency graphs are required due to mismatched peer dependencies. This behaviour is controlled by the dedupeInjectedDeps setting.

dedupeInjectedDeps
Default: true
Type: Boolean
When this setting is enabled, dependencies that are injected will be symlinked from the workspace whenever possible. If the dependent project and the injected dependency reference the same peer dependencies, then it is not necessary to physically copy the injected dependency into the dependent's node_modules; a symlink is sufficient.

syncInjectedDepsAfterScripts
Added in: v10.5.0

Default: undefined
Type: String[]
Injected workspace dependencies are collections of hardlinks, which don't add or remove the files when their sources change. This causes problems in packages that need to be built (such as in TypeScript projects).

This setting is a list of script names. When any of these scripts are executed in a workspace package, the injected dependencies inside node_modules will also be synchronized.

preferWorkspacePackages
Default: false
Type: Boolean
If this is enabled, local packages from the workspace are preferred over packages from the registry, even if there is a newer version of the package in the registry.

This setting is only useful if the workspace doesn't use saveWorkspaceProtocol.

sharedWorkspaceLockfile
Default: true
Type: Boolean
If this is enabled, pnpm creates a single pnpm-lock.yaml file in the root of the workspace. This also means that all dependencies of workspace packages will be in a single node_modules (and get symlinked to their package node_modules folder for Node's module resolution).

Advantages of this option:

every dependency is a singleton
faster installations in a monorepo
fewer changes in code reviews as they are all in one file
note
Even though all the dependencies will be hard linked into the root node_modules, packages will have access only to those dependencies that are declared in their package.json, so pnpm's strictness is preserved. This is a result of the aforementioned symbolic linking.

saveWorkspaceProtocol
Default: rolling
Type: true, false, rolling
This setting controls how dependencies that are linked from the workspace are added to package.json.

If foo@1.0.0 is in the workspace and you run pnpm add foo in another project of the workspace, below is how foo will be added to the dependencies field. The savePrefix setting also influences how the spec is created.

saveWorkspaceProtocol savePrefix spec
false '' 1.0.0
false '~' ~1.0.0
false '^' ^1.0.0
true '' workspace:1.0.0
true '~' workspace:~1.0.0
true '^' workspace:^1.0.0
rolling '' workspace:\*
rolling '~' workspace:~
rolling '^' workspace:^
includeWorkspaceRoot
Default: false
Type: Boolean
When executing commands recursively in a workspace, execute them on the root workspace project as well.

ignoreWorkspaceCycles
Default: false
Type: Boolean
When set to true, no workspace cycle warnings will be printed.

disallowWorkspaceCycles
Default: false
Type: Boolean
When set to true, installation will fail if the workspace has cycles.

failIfNoMatch
Default: false
Type: Boolean
When set to true, the CLI will exit with a non-zero code if no packages match the provided filters.

For example, the following command will exit with a non-zero code because bad-pkg-name is not present in the workspace:

pnpm --filter=bad-pkg-name test

Edit this page
Previous
Supported package sources
Next
Catalogs
Workspace protocol (workspace:)
Referencing workspace packages through aliases
Referencing workspace packages through their relative path
Publishing workspace packages
Release workflow
Troubleshooting
Usage examples
Configuration
linkWorkspacePackages
injectWorkspacePackages
dedupeInjectedDeps
syncInjectedDepsAfterScripts
preferWorkspacePackages
sharedWorkspaceLockfile
saveWorkspaceProtocol
includeWorkspaceRoot
ignoreWorkspaceCycles
disallowWorkspaceCycles
failIfNoMatch
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
