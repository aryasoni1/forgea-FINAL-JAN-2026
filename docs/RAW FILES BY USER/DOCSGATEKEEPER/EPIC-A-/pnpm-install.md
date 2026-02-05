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
CLI commands
Manage dependencies
pnpm add <pkg>
pnpm install
pnpm update
pnpm remove
pnpm link
pnpm unlink
pnpm import
pnpm rebuild
pnpm prune
pnpm fetch
pnpm install-test
pnpm dedupe
Patch dependencies
Review dependencies
Run scripts
Manage environments
Inspect the store
Manage cache
Misc.
Configuration
Features
Recipes
Advanced
CLI commandsManage dependenciespnpm install
Version: 10.x
pnpm install
Aliases: i

pnpm install is used to install all dependencies for a project.

In a CI environment, installation fails if a lockfile is present but needs an update.

Inside a workspace, pnpm install installs all dependencies in all the projects. If you want to disable this behavior, set the recursive-install setting to false.

TL;DR
Command Meaning
pnpm i --offline Install offline from the store only
pnpm i --frozen-lockfile pnpm-lock.yaml is not updated
pnpm i --lockfile-only Only pnpm-lock.yaml is updated
Options for filtering dependencies
Without a lockfile, pnpm has to create one, and it must be consistent regardless of dependencies filtering, so running pnpm install --prod on a directory without a lockfile would still resolve the dev dependencies, and it would error if the resolution is unsuccessful. The only exception for this rule are link: dependencies.

Without --frozen-lockfile, pnpm will check for outdated information from file: dependencies, so running pnpm install --prod without --frozen-lockfile on an environment where the target of file: has been removed would error.

--prod, -P
Default: false
Type: Boolean
If true, pnpm will not install any package listed in devDependencies and will remove those insofar they were already installed. If false, pnpm will install all packages listed in devDependencies and dependencies.

--dev, -D
Only devDependencies are installed and dependencies are removed insofar they were already installed.

--no-optional
optionalDependencies are not installed.

Options
--force
Force reinstall dependencies: refetch packages modified in store, recreate a lockfile and/or modules directory created by a non-compatible version of pnpm. Install all optionalDependencies even they don't satisfy the current environment(cpu, os, arch).

--offline
Default: false
Type: Boolean
If true, pnpm will use only packages already available in the store. If a package won't be found locally, the installation will fail.

--prefer-offline
Default: false
Type: Boolean
If true, staleness checks for cached data will be bypassed, but missing data will be requested from the server. To force full offline mode, use --offline.

--no-lockfile
Don't read or generate a pnpm-lock.yaml file.

--lockfile-only
Default: false
Type: Boolean
When used, only updates pnpm-lock.yaml and package.json. Nothing gets written to the node_modules directory.

--fix-lockfile
Fix broken lockfile entries automatically.

--frozen-lockfile
Default:
For non-CI: false
For CI: true, if a lockfile is present
Type: Boolean
If true, pnpm doesn't generate a lockfile and fails to install if the lockfile is out of sync with the manifest / an update is needed or no lockfile is present.

This setting is true by default in CI environments. The following code is used to detect CI environments:

https://github.com/watson/ci-info/blob/44e98cebcdf4403f162195fbcf90b1f69fc6e047/index.js#L54-L61
exports.isCI = !!(
env.CI || // Travis CI, CircleCI, Cirrus CI, GitLab CI, Appveyor, CodeShip, dsari
env.CONTINUOUS_INTEGRATION || // Travis CI, Cirrus CI
env.BUILD_NUMBER || // Jenkins, TeamCity
env.RUN_ID || // TaskCluster, dsari
exports.name ||
false
)

--merge-git-branch-lockfiles
Merge all git branch lockfiles. Read more about git branch lockfiles.

--reporter=<name>
Default:
For TTY stdout: default
For non-TTY stdout: append-only
Type: default, append-only, ndjson, silent
Allows you to choose the reporter that will log debug info to the terminal about the installation progress.

silent - no output is logged to the console, not even fatal errors
default - the default reporter when the stdout is TTY
append-only - the output is always appended to the end. No cursor manipulations are performed
ndjson - the most verbose reporter. Prints all logs in ndjson format
If you want to change what type of information is printed, use the loglevel setting.

--use-store-server
Default: false
Type: Boolean
danger
Deprecated feature

Starts a store server in the background. The store server will keep running after installation is done. To stop the store server, run pnpm server stop

--shamefully-hoist
Default: false
Type: Boolean
Creates a flat node_modules structure, similar to that of npm or yarn. WARNING: This is highly discouraged.

--ignore-scripts
Default: false
Type: Boolean
Do not execute any scripts defined in the project package.json and its dependencies.

--filter <package_selector>
Read more about filtering.

--resolution-only
Re-runs resolution: useful for printing out peer dependency issues.

--cpu=<name>
Added in: v10.14.0

Override CPU architecture of native modules to install. Acceptable values are same as cpu field of package.json, which comes from process.arch.

--os=<name>
Added in: v10.14.0

Override OS of native modules to install. Acceptable values are same as os field of package.json, which comes from process.platform.

--libc=<name>
Added in: v10.14.0

Override libc of native modules to install. Acceptable values are same as libc field of package.json.

Edit this page
Previous
pnpm add <pkg>
Next
pnpm update
TL;DR
Options for filtering dependencies
--prod, -P
--dev, -D
--no-optional
Options
--force
--offline
--prefer-offline
--no-lockfile
--lockfile-only
--fix-lockfile
--frozen-lockfile
--merge-git-branch-lockfiles
--reporter=<name>
--use-store-server
--shamefully-hoist
--ignore-scripts
--filter <package_selector>
--resolution-only
--cpu=<name>
--os=<name>
--libc=<name>
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
IntroductionInstallation
Version: 10.x
Installation
Prerequisites
If you don't use the standalone script or @pnpm/exe to install pnpm, then you need to have Node.js (at least v18.12) to be installed on your system.

Using a standalone script
You may install pnpm even if you don't have Node.js installed, using the following scripts.

On Windows
warning
Sometimes, Windows Defender may block our executable if you install pnpm this way.

Due to this issue, we currently recommend installing pnpm using npm or Corepack on Windows.

Using PowerShell:

Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression

On Windows, Microsoft Defender can significantly slow down installation of packages. You can add pnpm to Microsoft Defender's list of excluded folders in a PowerShell window with administrator rights by executing:

Add-MpPreference -ExclusionPath $(pnpm store path)

On POSIX systems
curl -fsSL https://get.pnpm.io/install.sh | sh -

If you don't have curl installed, you would like to use wget:

wget -qO- https://get.pnpm.io/install.sh | sh -

tip
You may use the pnpm env command then to install Node.js.

In a Docker container

# bash

wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

# sh

wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

# dash

wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.dashrc" SHELL="$(which dash)" dash -

Installing a specific version
Prior to running the install script, you may optionally set an env variable PNPM_VERSION to install a specific version of pnpm:

curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION=<version> sh -

Using Corepack
Due to an issue with outdated signatures in Corepack, Corepack should be updated to its latest version first:

npm install --global corepack@latest

Since v16.13, Node.js is shipping Corepack for managing package managers. This is an experimental feature, so you need to enable it by running:

info
If you have installed Node.js with pnpm env Corepack won't be installed on your system, you will need to install it separately. See #4029.

corepack enable pnpm

This will automatically install pnpm on your system.

You can pin the version of pnpm used on your project using the following command:

corepack use pnpm@latest-10

This will add a "packageManager" field in your local package.json which will instruct Corepack to always use a specific version on that project. This can be useful if you want reproducability, as all developers who are using Corepack will use the same version as you. When a new version of pnpm is released, you can re-run the above command.

Using other package managers
Using npm
We provide two packages of pnpm CLI, pnpm and @pnpm/exe.

pnpm is an ordinary version of pnpm, which needs Node.js to run.
@pnpm/exe is packaged with Node.js into an executable, so it may be used on a system with no Node.js installed.
npx pnpm@latest-10 dlx @pnpm/exe@latest-10 setup

or

npm install -g pnpm@latest-10

Using Homebrew
If you have the package manager installed, you can install pnpm using the following command:

brew install pnpm

Using winget
If you have winget installed, you can install pnpm using the following command:

winget install -e --id pnpm.pnpm

Using Scoop
If you have Scoop installed, you can install pnpm using the following command:

scoop install nodejs-lts pnpm

Using Choco
If you have Chocolatey installed, you can install pnpm using the following command:

choco install pnpm

Using Volta
If you have Volta installed, you can install pnpm using the following command:

volta install pnpm

tip
Do you wanna use pnpm on CI servers? See: Continuous Integration.

Compatibility
Here is a list of past pnpm versions with respective Node.js version support.

Node.js pnpm 8 pnpm 9 pnpm 10
Node.js 14 ❌ ❌ ❌
Node.js 16 ✔️ ❌ ❌
Node.js 18 ✔️ ✔️ ✔️
Node.js 20 ✔️ ✔️ ✔️
Node.js 22 ✔️ ✔️ ✔️
Node.js 24 ✔️ ✔️ ✔️
Troubleshooting
If pnpm is broken and you cannot fix it by reinstalling, you might need to remove it manually from the PATH.

Let's assume you have the following error when running pnpm install:

C:\src>pnpm install
internal/modules/cjs/loader.js:883
throw err;
^

Error: Cannot find module 'C:\Users\Bence\AppData\Roaming\npm\pnpm-global\4\node_modules\pnpm\bin\pnpm.js'
←[90m at Function.Module.\_resolveFilename (internal/modules/cjs/loader.js:880:15)←[39m
←[90m at Function.Module.\_load (internal/modules/cjs/loader.js:725:27)←[39m
←[90m at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)←[39m
←[90m at internal/main/run_main_module.js:17:47←[39m {
code: ←[32m'MODULE_NOT_FOUND'←[39m,
requireStack: []
}

First, try to find the location of pnpm by running: which pnpm. If you're on Windows, run where.exe pnpm.\*. You'll get the location of the pnpm command, for instance:

$ which pnpm
/c/Program Files/nodejs/pnpm

Now that you know where the pnpm CLI is, open that directory and remove any pnpm-related files (pnpm.cmd, pnpx.cmd, pnpm, etc). Once done, install pnpm again and it should work as expected.

Using a shorter alias
pnpm might be hard to type, so you may use a shorter alias like pn instead.

Adding a permanent alias on POSIX systems
Just put the following line to your .bashrc, .zshrc, or config.fish:

alias pn=pnpm

Adding a permanent alias in Powershell (Windows):
In a Powershell window with admin rights, execute:

notepad $profile.AllUsersAllHosts

In the profile.ps1 file that opens, put:

set-alias -name pn -value pnpm

Save the file and close the window. You may need to close any open Powershell window in order for the alias to take effect.

Updating pnpm
To update pnpm, run the self-update command:

pnpm self-update

Uninstalling pnpm
If you need to remove the pnpm CLI from your system and any files it has written to your disk, see Uninstalling pnpm.

Edit this page
Previous
Feature Comparison
Next
pnpm CLI
Prerequisites
Using a standalone script
On Windows
On POSIX systems
In a Docker container
Installing a specific version
Using Corepack
Using other package managers
Using npm
Using Homebrew
Using winget
Using Scoop
Using Choco
Using Volta
Compatibility
Troubleshooting
Using a shorter alias
Updating pnpm
Uninstalling pnpm
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
