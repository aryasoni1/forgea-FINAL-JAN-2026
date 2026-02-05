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
Usagepnpm CLI
Version: 10.x
pnpm CLI
Differences vs npm
Unlike npm, pnpm validates all options. For example, pnpm install --target_arch x64 will fail as --target_arch is not a valid option for pnpm install.

However, some dependencies may use the npm*config* environment variable, which is populated from the CLI options. In this case, you have the following options:

explicitly set the env variable: npm_config_target_arch=x64 pnpm install
force the unknown option with --config.: pnpm install --config.target_arch=x64
Options
-C <path>, --dir <path>
Run as if pnpm was started in <path> instead of the current working directory.

-w, --workspace-root
Run as if pnpm was started in the root of the workspace instead of the current working directory.

Commands
For more information, see the documentation for individual CLI commands. Here is a list of handy npm equivalents to get you started:

npm command pnpm equivalent
npm install pnpm install
npm i <pkg> pnpm add <pkg>
npm run <cmd> pnpm <cmd>
When an unknown command is used, pnpm will search for a script with the given name, so pnpm run lint is the same as pnpm lint. If there is no script with the specified name, then pnpm will execute the command as a shell script, so you can do things like pnpm eslint (see pnpm exec).

Environment variables
Some environment variables that are not pnpm related might change the behaviour of pnpm:

CI
These environment variables may influence what directories pnpm will use for storing global information:

XDG_CACHE_HOME
XDG_CONFIG_HOME
XDG_DATA_HOME
XDG_STATE_HOME
You can search the docs to find the settings that leverage these environment variables.

Edit this page
Previous
Installation
Next
Configuring
Differences vs npm
Options
-C <path>, --dir <path>
-w, --workspace-root
Commands
Environment variables
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
UsageConfiguring
Version: 10.x
Configuring
pnpm uses npm's configuration formats. Hence, you should set configuration the same way you would for npm. For example,

pnpm config set store-dir /path/to/.pnpm-store

If no store is configured, then pnpm will automatically create a store on the same drive. If you need pnpm to work across multiple hard drives or filesystems, please read the FAQ.

Furthermore, pnpm uses the same configuration that npm uses for doing installations. If you have a private registry and npm is configured to work with it, pnpm should be able to authorize requests as well, with no additional configuration.

In addition to those options, pnpm also allows you to use all parameters that are flags (for example --filter or --workspace-concurrency) as options:

workspace-concurrency = 1
filter = @my-scope/\*

See the config command for more information.

Edit this page
Previous
pnpm CLI
Next
Filtering
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
UsageFiltering
Version: 10.x
Filtering
Filtering allows you to restrict commands to specific subsets of packages.

pnpm supports a rich selector syntax for picking packages by name or by relation.

Selectors may be specified via the --filter (or -F) flag:

pnpm --filter <package_selector> <command>

Matching
--filter <package_name>
To select an exact package, just specify its name (@scope/pkg) or use a pattern to select a set of packages (@scope/\*).

Examples:

pnpm --filter "@babel/core" test
pnpm --filter "@babel/*" test
pnpm --filter "*core" test

Specifying the scope of the package is optional, so --filter=core will pick @babel/core if core is not found. However, if the workspace has multiple packages with the same name (for instance, @babel/core and @types/core), then filtering without scope will pick nothing.

--filter <package_name>...
To select a package and its dependencies (direct and non-direct), suffix the package name with an ellipsis: <package_name>.... For instance, the next command will run tests of foo and all of its dependencies:

pnpm --filter foo... test

You may use a pattern to select a set of root packages:

pnpm --filter "@babel/preset-\*..." test

--filter <package_name>^...
To ONLY select the dependencies of a package (both direct and non-direct), suffix the name with the aforementioned ellipsis preceded by a chevron. For instance, the next command will run tests for all of foo's dependencies:

pnpm --filter "foo^..." test

--filter ...<package_name>
To select a package and its dependent packages (direct and non-direct), prefix the package name with an ellipsis: ...<package_name>. For instance, this will run the tests of foo and all packages dependent on it:

pnpm --filter ...foo test

--filter "...^<package_name>"
To ONLY select a package's dependents (both direct and non-direct), prefix the package name with an ellipsis followed by a chevron. For instance, this will run tests for all packages dependent on foo:

pnpm --filter "...^foo" test

--filter ./<glob>, --filter {<glob>}
A glob pattern relative to the current working directory matching projects.

pnpm --filter "./packages/\*\*" <cmd>

Includes all projects that are under the specified directory.

It may be used with the ellipsis and chevron operators to select dependents/dependencies as well:

pnpm --filter ...{<directory>} <cmd>
pnpm --filter {<directory>}... <cmd>
pnpm --filter ...{<directory>}... <cmd>

It may also be combined with [<since>]. For instance, to select all changed projects inside a directory:

pnpm --filter "{packages/**}[origin/master]" <cmd>
pnpm --filter "...{packages/**}[origin/master]" <cmd>
pnpm --filter "{packages/**}[origin/master]..." <cmd>
pnpm --filter "...{packages/**}[origin/master]..." <cmd>

Or you may select all packages from a directory with names matching the given pattern:

pnpm --filter "@babel/_{components/\*\*}" <cmd>
pnpm --filter "@babel/_{components/**}[origin/master]" <cmd>
pnpm --filter "...@babel/\*{components/**}[origin/master]" <cmd>

--filter "[<since>]"
Selects all the packages changed since the specified commit/branch. May be suffixed or prefixed with ... to include dependencies/dependents.

For example, the next command will run tests in all changed packages since master and on any dependent packages:

pnpm --filter "...[origin/master]" test

--fail-if-no-match
Use this flag if you want the CLI to fail if no packages have matched the filters.

You may also set this permanently with a failIfNoMatch setting.

Excluding
Any of the filter selectors may work as exclusion operators when they have a leading "!". In zsh (and possibly other shells), "!" should be escaped: \!.

For instance, this will run a command in all projects except for foo:

pnpm --filter=!foo <cmd>

And this will run a command in all projects that are not under the lib directory:

pnpm --filter=!./lib <cmd>

Multiplicity
When packages are filtered, every package is taken that matches at least one of the selectors. You can use as many filters as you want:

pnpm --filter ...foo --filter bar --filter baz... test

--filter-prod <filtering_pattern>
Acts the same a --filter but omits devDependencies when selecting dependency projects from the workspace.

--test-pattern <glob>
test-pattern allows detecting whether the modified files are related to tests. If they are, the dependent packages of such modified packages are not included.

This option is useful with the "changed since" filter. For instance, the next command will run tests in all changed packages, and if the changes are in the source code of the package, tests will run in the dependent packages as well:

pnpm --filter="...[origin/master]" --test-pattern="test/\*" test

--changed-files-ignore-pattern <glob>
Allows to ignore changed files by glob patterns when filtering for changed projects since the specified commit/branch.

Usage example:

pnpm --filter="...[origin/master]" --changed-files-ignore-pattern="\*\*/README.md" run build

Edit this page
Previous
Configuring
Next
Scripts
Matching
--filter <package_name>
--filter <package_name>...
--filter <package_name>^...
--filter ...<package_name>
--filter "...^<package_name>"
--filter ./<glob>, --filter {<glob>}
--filter "[<since>]"
--fail-if-no-match
Excluding
Multiplicity
--filter-prod <filtering_pattern>
--test-pattern <glob>
--changed-files-ignore-pattern <glob>
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
UsageScripts
Version: 10.x
Scripts
How pnpm handles the scripts field of package.json.

Lifecycle Scripts
pnpm:devPreinstall
Runs only on local pnpm install.

Runs before any dependency is installed.

This script is executed only when set in the root project's package.json.

Edit this page
Previous
Filtering
Next
pnpm add <pkg>
Lifecycle Scripts
pnpm:devPreinstall
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
