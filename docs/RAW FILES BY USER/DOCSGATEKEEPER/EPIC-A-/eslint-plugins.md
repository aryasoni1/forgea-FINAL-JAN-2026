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
Ways to Extend ESLint
ESLint is highly pluggable and configurable. There are a variety of ways that you can extend ESLint’s functionality.

This page explains the ways to extend ESLint, and how these extensions all fit together.

Plugins
Plugins let you add your own ESLint custom rules and custom processors to a project. You can publish a plugin as an npm module.

Plugins are useful because your project may require some ESLint configuration that isn’t included in the core eslint package. For example, if you’re using a frontend JavaScript library like React or framework like Vue, these tools have some features that require custom rules outside the scope of the ESLint core rules.

Often a plugin is paired with a configuration for ESLint that applies a set of features from the plugin to a project. You can include configurations in a plugin as well.

For example, eslint-plugin-react is an ESLint plugin that includes rules specifically for React projects. The rules include things like enforcing consistent usage of React component lifecycle methods and requiring the use of key props when rendering dynamic lists.

To learn more about creating the extensions you can include in a plugin, refer to the following documentation:

Custom Rules
Custom Processors
Configs in Plugins
To learn more about bundling these extensions into a plugin, refer to Plugins.

Shareable Configs
ESLint shareable configs are pre-defined configurations for ESLint that you can use in your projects. They bundle rules and other configuration together in an npm package. Anything that you can put in a configuration file can be put in a shareable config.

You can either publish a shareable config independently or as part of a plugin.

For example, a popular shareable config is eslint-config-airbnb, which contains a variety of rules in addition to some parser options. This is a set of rules for ESLint that is designed to match the style guide used by the Airbnb JavaScript style guide. By using the eslint-config-airbnb shareable config, you can automatically enforce the Airbnb style guide in your project without having to manually configure each rule.

To learn more about creating a shareable config, refer to Share Configurations.

Custom Formatters
Custom formatters take ESLint linting results and output the results in a format that you define. Custom formatters let you display linting results in a format that best fits your needs, whether that’s in a specific file format, a certain display style, or a format optimized for a particular tool. You only need to create a custom formatter if the built-in formatters don’t serve your use case.

For example, the custom formatter eslint-formatter-gitlab can be used to display ESLint results in GitLab code quality reports.

To learn more about creating a custom formatter, refer to Custom Formatters.

Custom Parsers
ESLint custom parsers are a way to extend ESLint to support the linting of new language features or custom syntax in your code. A parser is responsible for taking your code and transforming it into an abstract syntax tree (AST) that ESLint can then analyze and lint.

ESLint ships with a built-in JavaScript parser (Espree), but custom parsers allow you to lint other languages or to extend the linting capabilities of the built-in parser.

For example, the custom parser @typescript-eslint/parser extends ESLint to lint TypeScript code.

Custom parsers can be also included in a plugin.

To learn more about creating a custom parser, refer to Custom Parsers.

Edit this page
Table of Contents
Plugins
Shareable Configs
Custom Formatters
Custom Parsers
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
Create Plugins
ESLint plugins extend ESLint with additional functionality. In most cases, you’ll extend ESLint by creating plugins that encapsulate the additional functionality you want to share across multiple projects.

Creating a plugin
A plugin is a JavaScript object that exposes certain properties to ESLint:

meta - information about the plugin.
configs - an object containing named configurations.
rules - an object containing the definitions of custom rules.
processors - an object containing named processors.
To get started, create a JavaScript file and export an object containing the properties you’d like ESLint to use. To make your plugin as easy to maintain as possible, we recommend that you format your plugin entrypoint file to look like this:

const plugin = {
meta: {},
configs: {},
rules: {},
processors: {},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

If you plan to distribute your plugin as an npm package, make sure that the module that exports the plugin object is the default export of your package. This will enable ESLint to import the plugin when it is specified in the command line in the --plugin option.

Meta Data in Plugins
For easier debugging and more effective caching of plugins, it’s recommended to provide a name, version, and namespace in a meta object at the root of your plugin, like this:

const plugin = {
// preferred location of name and version
meta: {
name: "eslint-plugin-example",
version: "1.2.3",
namespace: "example",
},
rules: {
// add rules here
},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

The meta.name property should match the npm package name for your plugin and the meta.version property should match the npm package version for your plugin. The meta.namespace property should match the prefix you’d like users to use for accessing the plugin’s rules, processors, languages, and configs. The namespace is typically what comes after eslint-plugin- in your package name, which is why this example uses "example". Providing a namespace allows the defineConfig() function to find your plugin even when a user assigns a different namespace in their config file.

The easiest way to add the name and version is by reading this information from your package.json, as in this example:

import fs from "fs";

const pkg = JSON.parse(
fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const plugin = {
// preferred location of name and version
meta: {
name: pkg.name,
version: pkg.version,
namespace: "example",
},
rules: {
// add rules here
},
};

export default plugin;

Tip
While there are no restrictions on plugin names, it helps others to find your plugin on npm when you follow these naming conventions:

Unscoped: If your npm package name won’t be scoped (doesn’t begin with @), then the plugin name should begin with eslint-plugin-, such as eslint-plugin-example.
Scoped: If your npm package name will be scoped, then the plugin name should be in the format of @<scope>/eslint-plugin-<plugin-name> such as @jquery/eslint-plugin-jquery or even @<scope>/eslint-plugin such as @jquery/eslint-plugin.
As an alternative, you can also expose name and version properties at the root of your plugin, such as:

const plugin = {
// alternate location of name and version
name: "eslint-plugin-example",
version: "1.2.3",
rules: {
// add rules here
},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

Important
While the meta object is the preferred way to provide the plugin name and version, this format is also acceptable and is provided for backward compatibility.

Rules in Plugins
Plugins can expose custom rules for use in ESLint. To do so, the plugin must export a rules object containing a key-value mapping of rule ID to rule. The rule ID does not have to follow any naming convention except that it should not contain a / character (so it can just be dollar-sign but not foo/dollar-sign, for instance). To learn more about creating custom rules in plugins, refer to Custom Rules.

const plugin = {
meta: {
name: "eslint-plugin-example",
version: "1.2.3",
},
rules: {
"dollar-sign": {
create(context) {
// rule implementation ...
},
},
},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

In order to use a rule from a plugin in a configuration file, import the plugin and include it in the plugins key, specifying a namespace. Then, use that namespace to reference the rule in the rules configuration, like this:

// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
{
files: ["**/*.js"], // any patterns you want to apply the config to
plugins: {
example,
},
rules: {
"example/dollar-sign": "error",
},
},
]);

Warning
Namespaces that don’t begin with @ may not contain a /; namespaces that begin with @ may contain a /. For example, eslint/plugin is not a valid namespace but @eslint/plugin is valid. This restriction is for backwards compatibility with eslintrc plugin naming restrictions.

Processors in Plugins
Plugins can expose processors for use in configuration file by providing a processors object. Similar to rules, each key in the processors object is the name of a processor and each value is the processor object itself. Here’s an example:

const plugin = {
meta: {
name: "eslint-plugin-example",
version: "1.2.3",
},
processors: {
"processor-name": {
preprocess(text, filename) {
/_ ... _/
},
postprocess(messages, filename) {
/_ ... _/
},
},
},
};

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

In order to use a processor from a plugin in a configuration file, import the plugin and include it in the plugins key, specifying a namespace. Then, use that namespace to reference the processor in the processor configuration, like this:

// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
{
files: ["**/*.txt"],
plugins: {
example,
},
processor: "example/processor-name",
},
]);

Configs in Plugins
You can bundle configurations inside a plugin by specifying them under the configs key. This can be useful when you want to bundle a set of custom rules with a configuration that enables the recommended options. Multiple configurations are supported per plugin.

You can include individual rules from a plugin in a config that’s also included in the plugin. In the config, you must specify your plugin name in the plugins object as well as any rules you want to enable that are part of the plugin. Any plugin rules must be prefixed with the plugin namespace. Here’s an example:

const plugin = {
meta: {
name: "eslint-plugin-example",
version: "1.2.3",
},
configs: {},
rules: {
"dollar-sign": {
create(context) {
// rule implementation ...
},
},
},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
recommended: [
{
plugins: {
example: plugin,
},
rules: {
"example/dollar-sign": "error",
},
languageOptions: {
globals: {
myGlobal: "readonly",
},
parserOptions: {
ecmaFeatures: {
jsx: true,
},
},
},
},
],
});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

This plugin exports a recommended config that is an array with one config object. When there is just one config object, you can also export just the object without an enclosing array.

In order to use a config from a plugin in a configuration file, import the plugin and use the extends key to reference the name of the config, like this:

// eslint.config.js
import { defineConfig } from "eslint/config";
import example from "eslint-plugin-example";

export default defineConfig([
{
files: ["**/*.js"], // any patterns you want to apply the config to
plugins: {
example,
},
extends: ["example/recommended"],
},
]);

Important
Plugins cannot force a specific configuration to be used. Users must manually include a plugin’s configurations in their configuration file.

Backwards Compatibility for Legacy Configs
If your plugin needs to export configs that work both with the current (flat config) system and the old (eslintrc) system, you can export both config types from the configs key. When exporting legacy configs, we recommend prefixing the name with "legacy-" (for example, "legacy-recommended") to make it clear how the config should be used.

If you’re working on a plugin that has existed prior to ESLint v9.0.0, then you may already have legacy configs with names such as "recommended". If you don’t want to update the config name, you can also create an additional entry in the configs object prefixed with "flat/" (for example, "flat/recommended"). Here’s an example:

const plugin = {
meta: {
name: "eslint-plugin-example",
version: "1.2.3",
},
configs: {},
rules: {
"dollar-sign": {
create(context) {
// rule implementation ...
},
},
},
};

// assign configs here so we can reference `plugin`
Object.assign(plugin.configs, {
// flat config format
"flat/recommended": [
{
plugins: {
example: plugin,
},
rules: {
"example/dollar-sign": "error",
},
languageOptions: {
globals: {
myGlobal: "readonly",
},
parserOptions: {
ecmaFeatures: {
jsx: true,
},
},
},
},
],

    // eslintrc format
    recommended: {
    	plugins: ["example"],
    	rules: {
    		"example/dollar-sign": "error",
    	},
    	globals: {
    		myGlobal: "readonly",
    	},
    	parserOptions: {
    		ecmaFeatures: {
    			jsx: true,
    		},
    	},
    },

});

// for ESM
export default plugin;

// OR for CommonJS
module.exports = plugin;

With this approach, both configuration systems recognize "recommended". The old config system uses the recommended key while the current config system uses the flat/recommended key. The defineConfig() helper first looks at the recommended key, and if that is not in the correct format, it looks for the flat/recommended key. This allows you an upgrade path if you’d later like to rename flat/recommended to recommended when you no longer need to support the old config system.

Testing a Plugin
ESLint provides the RuleTester utility to make it easy to test the rules of your plugin.

Linting a Plugin
ESLint plugins should be linted too! It’s suggested to lint your plugin with the recommended configurations of:

eslint
eslint-plugin-eslint-plugin
eslint-plugin-n
Share Plugins
In order to make your plugin available publicly, you have to publish it on npm. When doing so, please be sure to:

List ESLint as a peer dependency. Because plugins are intended for use with ESLint, it’s important to add the eslint package as a peer dependency. To do so, manually edit your package.json file to include a peerDependencies block, like this:

{
"peerDependencies": {
"eslint": ">=9.0.0"
}
}

Specify keywords. ESLint plugins should specify eslint, eslintplugin and eslint-plugin as keywords in your package.json file.

Edit this page
Table of Contents
Creating a plugin
Meta Data in Plugins
Rules in Plugins
Processors in Plugins
Configs in Plugins
Backwards Compatibility for Legacy Configs
Testing a Plugin
Linting a Plugin
Share Plugins
© OpenJS Foundation and ESLint contributors, www.openjsf.org. Content licensed under MIT License.
Theme Switcher

Light

System

Dark
Selecting a language will take you to the ESLint website in that language.
Language

🇺🇸 English (US) (Latest)
