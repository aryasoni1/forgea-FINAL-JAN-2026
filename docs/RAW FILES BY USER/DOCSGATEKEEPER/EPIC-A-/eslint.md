Skip to main content
Donate
Team
Blog
Docs
Store
Playground
Code Explorer
Selecting a version will take you to the chosen version of the ESLint docs.
Version

v9.39.2
Search
Results will be shown and updated as you type.
Powered by
Use ESLint in Your Project
Getting Started
Core Concepts
Glossary
Configure ESLint
Configuration Files
Configure Language Options
Configure Rules
Configure Plugins
Configure a Parser
Combine Configs
Ignore Files
Debug Your Configuration
Configuration Migration Guide
Command Line Interface Reference
Rules Reference
MCP Server Setup
Feature Flags
Formatters Reference
Bulk Suppressions
Integrations
Migrate to v9.x
Version Support
Troubleshooting
Circular fixes detected …
ESLint couldn't determine the plugin … uniquely
ESLint couldn't find the config … to extend from
ESLint couldn't find the plugin …
TypeError: context.getScope is not a function
Extend ESLint
Ways to Extend ESLint
Create Plugins
Custom Rule Tutorial
Custom Rules
Custom Processors
Languages
Migration to Flat Config
Share Configurations
Custom Formatters
Custom Parsers
Stats Data
integrate ESLint
Integrate with the Node.js API Tutorial
Node.js API Reference
Contribute to ESLint
Code of Conduct
Report Bugs
Propose a New Rule
Propose a Rule Change
Request a Change
Architecture
Set up a Development Environment
Run the Tests
Package.json Conventions
Work on Issues
Submit a Pull Request
Contribute to Core Rules
Governance
Report a Security Vulnerability
Maintain ESLint
How ESLint is Maintained
Manage Issues and Pull Requests
Review Pull Requests
Manage Releases
Working Groups
Getting Started with ESLint
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

ESLint is completely pluggable. Every single rule is a plugin and you can add more at runtime. You can also add community plugins, configurations, and parsers to extend the functionality of ESLint.

Prerequisites
To use ESLint, you must have Node.js (^18.18.0, ^20.9.0, or >=21.1.0) installed and built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

Quick start
You can install and configure ESLint using this command:

npm
yarn
pnpm
bun
npm init @eslint/config@latest

If you want to use a specific shareable config that is hosted on npm, you can use the --config option and specify the package name:

npm
yarn
pnpm
bun

# use `eslint-config-xo` shared config - npm 7+

npm init @eslint/config@latest -- --config eslint-config-xo

Note: npm init @eslint/config assumes you have a package.json file already. If you don’t, make sure to run npm init or yarn init beforehand.

After that, you can run ESLint on any file or directory like this:

npm
yarn
pnpm
bun
npx eslint yourfile.js

Configuration
Note: If you are coming from a version before 9.0.0 please see the migration guide.

When you run npm init @eslint/config, you’ll be asked a series of questions to determine how you’re using ESLint and what options should be included. After answering these questions, you’ll have an eslint.config.js (or eslint.config.mjs) file created in your directory.

For example, one of the questions is “Where does your code run?” If you select “Browser” then your configuration file will contain the definitions for global variables found in web browsers. Here’s an example:

import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
{ files: ["**/*.js"], languageOptions: { globals: globals.browser } },
{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
]);

The "js/recommended" configuration ensures all of the rules marked as recommended on the rules page will be turned on. Alternatively, you can use configurations that others have created by searching for “eslint-config” on npmjs.com. ESLint will not lint your code unless you extend from a shared configuration or explicitly turn rules on in your configuration.

You can configure rules individually by defining a new object with a rules key, as in this example:

import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
{ files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },

    {
    	rules: {
    		"no-unused-vars": "warn",
    		"no-undef": "warn",
    	},
    },

]);

The names "no-unused-vars" and "no-undef" are the names of rules in ESLint. The first value is the error level of the rule and can be one of these values:

"off" or 0 - turn the rule off
"warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
"error" or 2 - turn the rule on as an error (exit code will be 1)
The three error levels allow you fine-grained control over how ESLint applies rules (for more configuration options and details, see the configuration docs).

Global Install
It is also possible to install ESLint globally, rather than locally, using npm install eslint --global. However, this is not recommended, and any plugins or shareable configs that you use must still be installed locally even if you install ESLint globally.

Manual Set Up
You can also manually set up ESLint in your project.

Important
If you are using pnpm, be sure to create a .npmrc file with at least the following settings:

auto-install-peers=true
node-linker=hoisted

This ensures that pnpm installs dependencies in a way that is more compatible with npm and is less likely to produce errors.

Before you begin, you must already have a package.json file. If you don’t, make sure to run npm init or yarn init to create the file beforehand.

Install the ESLint packages in your project:
npm
yarn
pnpm
bun
npm install --save-dev eslint@latest @eslint/js@latest

Add an eslint.config.js file:

# Create JavaScript configuration file

touch eslint.config.js

Add configuration to the eslint.config.js file. Refer to the Configure ESLint documentation to learn how to add rules, custom configurations, plugins, and more.

import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
{
files: ["**/*.js"],
plugins: {
js,
},
extends: ["js/recommended"],
rules: {
"no-unused-vars": "warn",
"no-undef": "warn",
},
},
]);

Lint code using the ESLint CLI:

npm
yarn
pnpm
bun
npx eslint project-dir/ file.js

For more information on the available CLI options, refer to Command Line Interface.

Next Steps
Learn about advanced configuration of ESLint.
Get familiar with the command line options.
Explore ESLint integrations into other tools like editors, build systems, and more.
Can’t find just the right rule? Make your own custom rule.
Make ESLint even better by contributing.
Edit this page
Table of Contents
Prerequisites
Quick start
Configuration
Global Install
Manual Set Up
Next Steps
© OpenJS Foundation and ESLint contributors, www.openjsf.org. Content licensed under MIT License.
Theme Switcher

Light

System

Dark
Selecting a language will take you to the ESLint website in that language.
Language

🇺🇸 English (US) (Latest)
Skip to main content
Donate
Team
Blog
Docs
Store
Playground
Code Explorer
Selecting a version will take you to the chosen version of the ESLint docs.
Version

v9.39.2
Search
Results will be shown and updated as you type.
Powered by
Use ESLint in Your Project
Getting Started
Core Concepts
Glossary
Configure ESLint
Configuration Files
Configure Language Options
Configure Rules
Configure Plugins
Configure a Parser
Combine Configs
Ignore Files
Debug Your Configuration
Configuration Migration Guide
Command Line Interface Reference
Rules Reference
MCP Server Setup
Feature Flags
Formatters Reference
Bulk Suppressions
Integrations
Migrate to v9.x
Version Support
Troubleshooting
Circular fixes detected …
ESLint couldn't determine the plugin … uniquely
ESLint couldn't find the config … to extend from
ESLint couldn't find the plugin …
TypeError: context.getScope is not a function
Extend ESLint
Ways to Extend ESLint
Create Plugins
Custom Rule Tutorial
Custom Rules
Custom Processors
Languages
Migration to Flat Config
Share Configurations
Custom Formatters
Custom Parsers
Stats Data
integrate ESLint
Integrate with the Node.js API Tutorial
Node.js API Reference
Contribute to ESLint
Code of Conduct
Report Bugs
Propose a New Rule
Propose a Rule Change
Request a Change
Architecture
Set up a Development Environment
Run the Tests
Package.json Conventions
Work on Issues
Submit a Pull Request
Contribute to Core Rules
Governance
Report a Security Vulnerability
Maintain ESLint
How ESLint is Maintained
Manage Issues and Pull Requests
Review Pull Requests
Manage Releases
Working Groups
Core Concepts
This page contains a high-level overview of some of the core concepts of ESLint.

What is ESLint?
ESLint is a configurable JavaScript linter. It helps you find and fix problems in your JavaScript code. Problems can be anything from potential runtime bugs, to not following best practices, to styling issues.

Rules
Rules are the core building block of ESLint. A rule validates if your code meets a certain expectation, and what to do if it does not meet that expectation. Rules can also contain additional configuration options specific to that rule.

For example, the semi rule lets you specify whether or not JavaScript statements should end with a semicolon (;). You can set the rule to either always require semicolons or require that a statement never ends with a semicolon.

ESLint contains hundreds of built-in rules that you can use. You can also create custom rules or use rules that others have created with plugins.

For more information, refer to Rules.

Rule Fixes
Rules may optionally provide fixes for violations that they find. Fixes safely correct the violation without changing application logic.

Fixes may be applied automatically with the --fix command line option and via editor extensions.

Rules that may provide fixes are marked with 🔧 in Rules.

Rule Suggestions
Rules may optionally provide suggestions in addition to or instead of providing fixes. Suggestions differ from fixes in two ways:

Suggestions may change application logic and so cannot be automatically applied.
Suggestions cannot be applied through the ESLint CLI and are only available through editor integrations.
Rules that may provide suggestions are marked with 💡 in Rules.

Configuration Files
An ESLint configuration file is a place where you put the configuration for ESLint in your project. You can include built-in rules, how you want them enforced, plugins with custom rules, shareable configurations, which files you want rules to apply to, and more.

For more information, refer to Configuration Files.

Shareable Configurations
Shareable configurations are ESLint configurations that are shared via npm.

Often shareable configurations are used to enforce style guides using ESLint’s built-in rules. For example the shareable configuration eslint-config-airbnb-base implements the popular Airbnb JavaScript style guide.

For more information, refer to Using a Shareable Configuration Package.

Plugins
An ESLint plugin is an npm module that can contain a set of ESLint rules, configurations, processors, and languages. Often plugins include custom rules. Plugins can be used to enforce a style guide and support JavaScript extensions (like TypeScript), libraries (like React), and frameworks (like Angular).

A popular use case for plugins is to enforce best practices for a framework. For example, @angular-eslint/eslint-plugin contains best practices for using the Angular framework.

For more information, refer to Configure Plugins.

Parsers
An ESLint parser converts code into an abstract syntax tree that ESLint can evaluate. By default, ESLint uses the built-in Espree parser, which is compatible with standard JavaScript runtimes and versions.

Custom parsers let ESLint parse non-standard JavaScript syntax. Often custom parsers are included as part of shareable configurations or plugins, so you don’t have to use them directly.

For example, @typescript-eslint/parser is a custom parser included in the typescript-eslint project that lets ESLint parse TypeScript code.

Custom Processors
An ESLint processor extracts JavaScript code from other kinds of files, then lets ESLint lint the JavaScript code. Alternatively, you can use a processor to manipulate JavaScript code before parsing it with ESLint.

For example, @eslint/markdown contains a custom processor that lets you lint JavaScript code inside of Markdown code blocks.

Formatters
An ESLint formatter controls the appearance of the linting results in the CLI.

For more information, refer to Formatters.

Integrations
One of the things that makes ESLint such a useful tool is the ecosystem of integrations that surrounds it. For example, many code editors have ESLint extensions that show you the ESLint results of your code in the file as you work so that you don’t need to use the ESLint CLI to see linting results.

For more information, refer to Integrations.

CLI & Node.js API
The ESLint CLI is a command line interface that lets you execute linting from the terminal. The CLI has a variety of options that you can pass to its commands.

The ESLint Node.js API lets you use ESLint programmatically from Node.js code. The API is useful when developing plugins, integrations, and other tools related to ESLint.

Unless you are extending ESLint in some way, you should use the CLI.

For more information, refer to Command Line Interface and Node.js API.

Edit this page
Table of Contents
What is ESLint?
Rules
Rule Fixes
Rule Suggestions
Configuration Files
Shareable Configurations
Plugins
Parsers
Custom Processors
Formatters
Integrations
CLI & Node.js API
© OpenJS Foundation and ESLint contributors, www.openjsf.org. Content licensed under MIT License.
Theme Switcher

Light

System

Dark
Selecting a language will take you to the ESLint website in that language.
Language

🇺🇸 English (US) (Latest)
Skip to main content
Donate
Team
Blog
Docs
Store
Playground
Code Explorer
Selecting a version will take you to the chosen version of the ESLint docs.
Version

v9.39.2
Search
Results will be shown and updated as you type.
Powered by
Use ESLint in Your Project
Getting Started
Core Concepts
Glossary
Configure ESLint
Configuration Files
Configure Language Options
Configure Rules
Configure Plugins
Configure a Parser
Combine Configs
Ignore Files
Debug Your Configuration
Configuration Migration Guide
Command Line Interface Reference
Rules Reference
MCP Server Setup
Feature Flags
Formatters Reference
Bulk Suppressions
Integrations
Migrate to v9.x
Version Support
Troubleshooting
Circular fixes detected …
ESLint couldn't determine the plugin … uniquely
ESLint couldn't find the config … to extend from
ESLint couldn't find the plugin …
TypeError: context.getScope is not a function
Extend ESLint
Ways to Extend ESLint
Create Plugins
Custom Rule Tutorial
Custom Rules
Custom Processors
Languages
Migration to Flat Config
Share Configurations
Custom Formatters
Custom Parsers
Stats Data
integrate ESLint
Integrate with the Node.js API Tutorial
Node.js API Reference
Contribute to ESLint
Code of Conduct
Report Bugs
Propose a New Rule
Propose a Rule Change
Request a Change
Architecture
Set up a Development Environment
Run the Tests
Package.json Conventions
Work on Issues
Submit a Pull Request
Contribute to Core Rules
Governance
Report a Security Vulnerability
Maintain ESLint
How ESLint is Maintained
Manage Issues and Pull Requests
Review Pull Requests
Manage Releases
Working Groups
Glossary
This page serves as a reference for common terms associated with ESLint.

A
Abstract Syntax Tree (AST)
A structured representation of code syntax.

Each section of source code in an AST is referred to as a node. Each node may have any number of properties, including properties that store child nodes.

The AST format used by ESLint is the ESTree format.

ESLint rules are given an AST and may produce violations on parts of the AST when they detect a violation.

C
Config File (Configuration File)
A file containing preferences for how ESLint should parse files and run rules.

ESLint config files are named like eslint.config.(c|m)js. Each config file exports a config array containing config objects.

For example, this eslint.config.js file enables the prefer-const rule at the error severity:

import { defineConfig } from "eslint/config";

export default defineConfig([
{
rules: {
"prefer-const": "error",
},
},
]);

See Configuration Files for more details.

Config Array
An array of config objects within a config file.

Each config file exports an array of config objects. The objects in the array are evaluated in order: later objects may override settings specified in earlier objects.

See Configuration Files for more details.

Config Object
A config file entry specifying all of the information ESLint needs to execute on a set of files.

Each configuration object may include properties describing which files to run on, how to handle different file types, which plugins to include, and how to run rules.

See Configuration Files > Configuration Objects for more details.

E
ESQuery
The library used by ESLint to parse selector syntax for querying nodes in an AST.

ESQuery interprets CSS syntax for AST node properties. Examples of ESQuery selectors include:

BinaryExpression: selects all nodes of type BinaryExpression
BinaryExpression[operator='+']: selects all BinaryExpression nodes whose operator is +
BinaryExpression > Literal[value=1]: selects all Literal nodes with value 1 whose direct parent is a BinaryExpression
See github.com/estools/esquery for more information on the ESQuery format.

ESTree
The format used by ESLint for how to represent JavaScript syntax as an AST.

For example, the ESTree representation of the code 1 + 2; would be an object roughly like:

{
"type": "ExpressionStatement",
"expression": {
"type": "BinaryExpression",
"left": {
"type": "Literal",
"value": 1,
"raw": "1"
},
"operator": "+",
"right": {
"type": "Literal",
"value": 2,
"raw": "2"
}
}
}

Static analysis tools such as ESLint typically operate by converting syntax into an AST in the ESTree format.

See github.com/estree/estree for more information on the ESTree specification.

F
Fix
An optional augmentation to a rule violation that describes how to automatically correct the violation.

Fixes are generally “safe” to apply automatically: they shouldn’t cause code behavior changes. ESLint attempts to apply as many fixes as possible in a report when run with the --fix flag, though there is no guarantee that all fixes will be applied. Fixes may also be applied by common editor extensions.

Rule violations may also include file changes that are unsafe and not automatically applied in the form of suggestions.

Flat Config
The current configuration file format for ESLint.

Flat config files are named in the format eslint.config.(c|m)?js. “Flat” config files are named as such because all nesting must be done in one configuration file. In contrast, the “Legacy” config format allowed nesting configuration files in sub-directories within a project.

You can read more about the motivations behind flat configurations in ESLint’s new config system, Part 2: Introduction to flat config.

Formatter (Linting)
A package that presents the report generated by ESLint.

ESLint ships with several built-in reporters, including stylish (default), json, and html.

For more information, see Formatters.

Formatter (Tool)
A static analysis tool that quickly reformats code without changing its logic or names.

Formatters generally only modify the “trivia” of code, such as semicolons, spacing, newlines, and whitespace in general. Trivia changes generally don’t modify the AST of code.

Common formatters in the ecosystem include Prettier and dprint.

Note that although ESLint is a linter rather than a formatter, ESLint rules can also apply formatting changes to source code. See Formatting (Rule) for more information on formatting rules.

Formatting (Rule)
A rule that solely targets formatting concerns, such as semicolons and whitespace. These rules don’t change application logic and are a subset of Stylistic rules.

ESLint no longer recommends formatting rules and previously deprecated its built-in formatting rules. ESLint recommends instead using a dedicated formatter such as Prettier or dprint. Alternately, the ESLint Stylistic project provides formatting-related lint rules.

For more information, see Deprecation of formatting rules.

G
Global Declaration
A description to ESLint of a JavaScript global variable that should exist at runtime.

Global declarations inform lint rules that check for proper uses of global variables. For example, the no-undef rule will create a violation for references to global variables not defined in the configured list of globals.

Config files have globals defined as JavaScript objects.

For information about configuring globals, see Configure Language Options > Specifying Globals.

Global Variable
A runtime variable that exists in the global scope, meaning all modules and scripts have access to it.

Global variables in JavaScript are declared on the globalThis object (generally aliased as global in Node.js and window in browsers).

You can let ESLint know which global variables your code uses with global declarations.

I
Inline Config (Configuration Comment)
A source code comment that configures a rule to a different severity and/or set of options.

Inline configs use similar syntax as config files to specify any number of rules by name, their new severity, and optionally new options for the rules. For example, the following inline config comment simultaneously disables the eqeqeq rule and sets the curly rule to "error":

/_ eslint eqeqeq: "off", curly: "error" _/

For documentation on inline config comments, see Rules > Using configuration comments.

L
Legacy Config
The previous configuration file format for ESLint, now superseded by “Flat” config.

Legacy ESLint configurations are named in the format .eslintrc.\* and allowed to be nested across files within sub-directories in a project.

You can read more about the lifetime of legacy configurations in ESLint’s new config system, Part 1: Background.

Linter
A static analysis tool that can report the results from running a set of rules on source code. Each rule may report any number of violations in the source code.

ESLint is a commonly used linter for JavaScript and other web technologies.

Note that a linter is separate from formatters and type checkers.

Logical Rule
A rule that inspects how code operates to find problems.

Many logical rules look for likely crashes (e.g. no-undef), unintended behavior (e.g. no-sparse-arrays), and unused code (e.g no-unused-vars).

You can see the full list of logical rules that ship with ESLint under Rules > Possible Problems

N
Node
A section of code within an AST.

Each node represents a type of syntax found in source code. For example, the 1 + 2 in the AST for 1 + 2; is a BinaryExpression.

See #esquery for the library ESLint uses to parse selectors that allow rules to search for nodes.

O
Override
When a config object or inline config sets a new severity and/or rule options that supersede previously set severity and/or options.

The following config file overrides no-unused-expressions from "error" to "off" in \*.test.js files:

import { defineConfig } from "eslint/config";

export default defineConfig([
{
rules: {
"no-unused-expressions": "error",
},
},
{
files: ["*.test.js"],
rules: {
"no-unused-expressions": "off",
},
},
]);

The following inline config sets no-unused-expressions to "error":

/_ eslint no-unused-expressions: "error" _/

For more information on overrides in legacy configs, see Configuration Files (Deprecated) > How do overrides work?.

P
Parser
An object containing a method that reads in a string and converts it to a standardized format.

ESLint uses parsers to convert source code strings into an AST shape. By default, ESLint uses the Espree parser, which generates an AST compatible with standard JavaScript runtimes and versions.

Custom parsers let ESLint parse non-standard JavaScript syntax. Often custom parsers are included as part of shareable configurations or plugins, so you don’t have to use them directly. For example, @typescript-eslint/parser is a custom parser included in the typescript-eslint project that lets ESLint parse TypeScript code.

For more information on using parsers with ESLint, see Configure a Parser.

Plugin
A package that can contain a set of configurations, processors, and/or rules.

A popular use case for plugins is to enforce best practices for a framework. For example, @angular-eslint/eslint-plugin contains best practices for using the Angular framework.

For more information, refer to Configure Plugins.

Processor
A part of a plugin that extracts JavaScript code from other kinds of files, then lets ESLint lint the JavaScript code.

For example, @eslint/markdown includes a processor that converts the text of ``` code blocks in Markdown files into code that can be linted.

For more information on configuring processor, see Plugins > Specify a Processor.

R
Report
A collection of violations from a single ESLint run.

When ESLint runs on source files, it will pass an AST for each source file to each configured rule. The collection of violations from each of the rules will be packaged together and passed to a formatter to be presented to the user.

Rule
Code that checks an AST for expected patterns. When a rule’s expectation is not met, it creates a violation.

ESLint provides a large collection of rules that check for common JavaScript code issues. Many more rules may be loaded in by plugins.

For an overview of rules provided, see Core Concepts > Rules.

S
Selector
Syntax describing how to search for nodes within an AST.

ESLint rules use ESQuery selectors to find nodes that should be checked.

Severity
What level of reporting a rule is configured to run, if at all.

ESLint supports three levels of severity:

"off" (0): Do not run the rule.
"warn" (1): Run the rule, but don’t exit with a non-zero status code based on its violations (excluding the --max-warnings flag)
"error" (2): Run the rule, and exit with a non-zero status code if it produces any violations
For documentation on configuring rules, see Configure Rules.

Shareable Config (Configuration)
A module that provides a predefined config file configurations.

Shareable configs can configure all the same information from config files, including plugins and rules.

Shareable configs are often provided alongside plugins. Many plugins provide configs with names like “recommended” that enable their suggested starting set of rules. For example, eslint-plugin-solid provides a shareable recommended config:

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";

export default defineConfig([js.configs.recommended, solid]);

For information on shareable configs, see Share Configurations.

Static Analysis
The process of analyzing source code without building or running it.

Linters such as ESLint, formatters, and type checkers are examples of static analysis tools.

Static analysis is different from dynamic analysis, which is the process of evaluating source code after it is built and executed. Unit, integration, and end-to-end tests are common examples of dynamic analysis.

Stylistic (Rule)
A rule that enforces a preference rather than a logical issue. Stylistic areas include Formatting rules, naming conventions, and consistent choices between equivalent syntaxes.

ESLint’s built-in stylistic rules are feature frozen: except for supporting new ECMAScript versions, they won’t receive new features.

For more information, see Changes to our rules policies and Deprecation of formatting rules.

Suggestion
An optional augmentation to a rule violation that describes how one may manually adjust the code to address the violation.

Suggestions are not generally safe to apply automatically because they cause code behavior changes. ESLint does not apply suggestions directly but does provide suggestion to integrations that may choose to apply suggestions (such as an editor extension).

Rule violations may also include file changes that are safe and may be automatically applied in the form of fixes.

T
Type Checker
A static analysis tool that builds a full understanding of a project’s code constructs and data shapes.

Type checkers are generally slower and more comprehensive than linters. Whereas linters traditionally operate only on a single file’s or snippet’s AST at a time, type checkers understand cross-file dependencies and types.

TypeScript is the most common type checker for JavaScript. The typescript-eslint project provides integrations that allow using type checker in lint rules.

V
Violation
An indication from a rule that an area of code doesn’t meet the expectation of the rule.

Rule violations indicate a range in source code and error message explaining the violation. Violations may also optionally include a fix and/or suggestions that indicate how to improve the violating code.

Edit this page
Table of Contents
A
Abstract Syntax Tree (AST)
C
Config File (Configuration File)
Config Array
Config Object
E
ESQuery
ESTree
F
Fix
Flat Config
Formatter (Linting)
Formatter (Tool)
Formatting (Rule)
G
Global Declaration
Global Variable
I
Inline Config (Configuration Comment)
L
Legacy Config
Linter
Logical Rule
N
Node
O
Override
P
Parser
Plugin
Processor
R
Report
Rule
S
Selector
Severity
Shareable Config (Configuration)
Static Analysis
Stylistic (Rule)
Suggestion
T
Type Checker
V
Violation
© OpenJS Foundation and ESLint contributors, www.openjsf.org. Content licensed under MIT License.
Theme Switcher

Light

System

Dark
Selecting a language will take you to the ESLint website in that language.
Language

🇺🇸 English (US) (Latest)
