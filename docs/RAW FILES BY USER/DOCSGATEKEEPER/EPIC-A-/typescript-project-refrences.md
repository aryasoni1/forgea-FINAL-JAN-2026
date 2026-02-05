Skip to main content
Get Started
Handbook
Reference
Modules Reference
Tutorials
What's New
Declaration Files
JavaScript
Project Configuration
What is a tsconfig.json
Compiler Options in MSBuild
TSConfig Reference
tsc CLI Options
Project References
Integrating with Build Tools
Configuring Watch
Nightly Builds
Project References
Project references allows you to structure your TypeScript programs into smaller pieces, available in TypeScript 3.0 and newer.

By doing this, you can greatly improve build times, enforce logical separation between components, and organize your code in new and better ways.

We’re also introducing a new mode for tsc, the --build flag, that works hand in hand with project references to enable faster TypeScript builds.

An Example Project
Let’s look at a fairly normal program and see how project references can help us better organize it. Imagine you have a project with two modules, converter and units, and a corresponding test file for each:

/
├── src/
│ ├── converter.ts
│ └── units.ts
├── test/
│ ├── converter-tests.ts
│ └── units-tests.ts
└── tsconfig.json
The test files import the implementation files and do some testing:

// converter-tests.ts
import \* as converter from "../src/converter";
assert.areEqual(converter.celsiusToFahrenheit(0), 32);
Previously, this structure was rather awkward to work with if you used a single tsconfig file:

It was possible for the implementation files to import the test files
It wasn’t possible to build test and src at the same time without having src appear in the output folder name, which you probably don’t want
Changing just the internals in the implementation files required typechecking the tests again, even though this wouldn’t ever cause new errors
Changing just the tests required typechecking the implementation again, even if nothing changed
You could use multiple tsconfig files to solve some of those problems, but new ones would appear:

There’s no built-in up-to-date checking, so you end up always running tsc twice
Invoking tsc twice incurs more startup time overhead
tsc -w can’t run on multiple config files at once
Project references can solve all of these problems and more.

What is a Project Reference?
tsconfig.json files have a new top-level property, references. It’s an array of objects that specifies projects to reference:

{
"compilerOptions": {
// The usual
},
"references": [
{ "path": "../src" }
]
}
The path property of each reference can point to a directory containing a tsconfig.json file, or to the config file itself (which may have any name).

When you reference a project, new things happen:

Importing modules from a referenced project will instead load its output declaration file (.d.ts)
If the referenced project produces an outFile, the output file .d.ts file’s declarations will be visible in this project
Build mode (see below) will automatically build the referenced project if needed
By separating into multiple projects, you can greatly improve the speed of typechecking and compiling, reduce memory usage when using an editor, and improve enforcement of the logical groupings of your program.

composite
Referenced projects must have the new composite setting enabled. This setting is needed to ensure TypeScript can quickly determine where to find the outputs of the referenced project. Enabling the composite flag changes a few things:

The rootDir setting, if not explicitly set, defaults to the directory containing the tsconfig file
All implementation files must be matched by an include pattern or listed in the files array. If this constraint is violated, tsc will inform you which files weren’t specified
declaration must be turned on
declarationMap
We’ve also added support for declaration source maps. If you enable declarationMap, you’ll be able to use editor features like “Go to Definition” and Rename to transparently navigate and edit code across project boundaries in supported editors.

Caveats for Project References
Project references have a few trade-offs you should be aware of.

Because dependent projects make use of .d.ts files that are built from their dependencies, you’ll either have to check in certain build outputs or build a project after cloning it before you can navigate the project in an editor without seeing spurious errors.

When using VS Code (since TS 3.7) we have a behind-the-scenes in-memory .d.ts generation process that should be able to mitigate this, but it has some perf implications. For very large composite projects you might want to disable this using disableSourceOfProjectReferenceRedirect option.

Additionally, to preserve compatibility with existing build workflows, tsc will not automatically build dependencies unless invoked with the --build switch. Let’s learn more about --build.

Build Mode for TypeScript
A long-awaited feature is smart incremental builds for TypeScript projects. In 3.0 you can use the --build flag with tsc. This is effectively a new entry point for tsc that behaves more like a build orchestrator than a simple compiler.

Running tsc --build (tsc -b for short) will do the following:

Find all referenced projects
Detect if they are up-to-date
Build out-of-date projects in the correct order
You can provide tsc -b with multiple config file paths (e.g. tsc -b src test). Just like tsc -p, specifying the config file name itself is unnecessary if it’s named tsconfig.json.

tsc -b
Commandline
You can specify any number of config files:

> tsc -b # Use the tsconfig.json in the current directory
> tsc -b src # Use src/tsconfig.json
> tsc -b foo/prd.tsconfig.json bar # Use foo/prd.tsconfig.json and bar/tsconfig.json
> Don’t worry about ordering the files you pass on the commandline - tsc will re-order them if needed so that dependencies are always built first.

There are also some flags specific to tsc -b:

--verbose: Prints out verbose logging to explain what’s going on (may be combined with any other flag)
--dry: Shows what would be done but doesn’t actually build anything
--clean: Deletes the outputs of the specified projects (may be combined with --dry)
--force: Act as if all projects are out of date
--watch: Watch mode (may not be combined with any flag except --verbose)
Caveats
Normally, tsc will produce outputs (.js and .d.ts) in the presence of syntax or type errors, unless noEmitOnError is on. Doing this in an incremental build system would be very bad - if one of your out-of-date dependencies had a new error, you’d only see it once because a subsequent build would skip building the now up-to-date project. For this reason, tsc -b effectively acts as if noEmitOnError is enabled for all projects.

If you check in any build outputs (.js, .d.ts, .d.ts.map, etc.), you may need to run a --force build after certain source control operations depending on whether your source control tool preserves timestamps between the local copy and the remote copy.

MSBuild
If you have an msbuild project, you can enable build mode by adding

    <TypeScriptBuildMode>true</TypeScriptBuildMode>

to your proj file. This will enable automatic incremental build as well as cleaning.

Note that as with tsconfig.json / -p, existing TypeScript project properties will not be respected - all settings should be managed using your tsconfig file.

Some teams have set up msbuild-based workflows wherein tsconfig files have the same implicit graph ordering as the managed projects they are paired with. If your solution is like this, you can continue to use msbuild with tsc -p along with project references; these are fully interoperable.

Guidance
Overall Structure
With more tsconfig.json files, you’ll usually want to use Configuration file inheritance to centralize your common compiler options. This way you can change a setting in one file rather than having to edit multiple files.

Another good practice is to have a “solution” tsconfig.json file that simply has references to all of your leaf-node projects and sets files to an empty array (otherwise the solution file will cause double compilation of files). Note that starting with 3.0, it is no longer an error to have an empty files array if you have at least one reference in a tsconfig.json file.

This presents a simple entry point; e.g. in the TypeScript repo we simply run tsc -b src to build all endpoints because we list all the subprojects in src/tsconfig.json

You can see these patterns in the TypeScript repo - see src/tsconfig-base.json, src/tsconfig.json, and src/tsc/tsconfig.json as key examples.

Structuring for relative modules
In general, not much is needed to transition a repo using relative modules. Simply place a tsconfig.json file in each subdirectory of a given parent folder, and add references to these config files to match the intended layering of the program. You will need to either set the outDir to an explicit subfolder of the output folder, or set the rootDir to the common root of all project folders.

Structuring for outFiles
Layout for compilations using outFile is more flexible because relative paths don’t matter as much. The TypeScript repo itself is a good reference here - we have some “library” projects and some “endpoint” projects; “endpoint” projects are kept as small as possible and pull in only the libraries they need.

On this page
An Example Project
What is a Project Reference?
composite
declarationMap
Caveats for Project References
Build Mode for TypeScript
tsc -b Commandline
Caveats
MSBuild
Guidance
Overall Structure
Structuring for relative modules
Structuring for outFiles
Is this page helpful?
YesNo
The TypeScript docs are an open source project. Help us improve these pages by sending a Pull Request ❤

Contributors to this page:
MHMohamed Hegazy (53)OTOrta Therox (18)RCRyan Cavanaugh (3)TTheo (1)MKMatt Kantor (1)23+
Last updated: Feb 03, 2026

This page loaded in 0.086 seconds.

Customize
Site Colours:

System
Code Font:

Cascadia
Popular Documentation Pages
Everyday Types
All of the common types in TypeScript

Creating Types from Types
Techniques to make more elegant types

More on Functions
How to provide types to functions in JavaScript

More on Objects
How to provide a type shape to JavaScript objects

Narrowing
How TypeScript infers types based on runtime behavior

Variable Declarations
How to create and type JavaScript variables

TypeScript in 5 minutes
An overview of building a TypeScript web app

TSConfig Options
All the configuration options for a project

Classes
How to provide types to JavaScript ES6 classes

Made with ♥ in Redmond, Boston, SF & Dublin

Microsoft Logo
© 2012-2026 Microsoft
PrivacyTerms of Use

Using TypeScript
Get Started
Download
Community
Playground
TSConfig Ref
Code Samples
Why TypeScript
Design
Community
Get Help
Blog
GitHub Repo
Community Chat
@TypeScript
Mastodon
Stack Overflow
Web Repo
Skip to main content
Get Started
Handbook
Reference
Modules Reference
Tutorials
What's New
Declaration Files
JavaScript
Project Configuration
What is a tsconfig.json
Compiler Options in MSBuild
TSConfig Reference
tsc CLI Options
Project References
Integrating with Build Tools
Configuring Watch
Nightly Builds
What is a tsconfig.json
Overview
The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.

JavaScript projects can use a jsconfig.json file instead, which acts almost the same but has some JavaScript-related compiler flags enabled by default.

A project is compiled in one of the following ways:

Using
tsconfig.json
or
jsconfig.json
By invoking tsc with no input files, in which case the compiler searches for the tsconfig.json file starting in the current directory and continuing up the parent directory chain.
By invoking tsc with no input files and a --project (or just -p) command line option that specifies the path of a directory containing a tsconfig.json file, or a path to a valid .json file containing the configurations.
When input files are specified on the command line, tsconfig.json files are ignored.

Examples
Example tsconfig.json files:

Using the files property

{
"compilerOptions": {
"module": "commonjs",
"noImplicitAny": true,
"removeComments": true,
"preserveConstEnums": true,
"sourceMap": true
},
"files": [
"core.ts",
"sys.ts",
"types.ts",
"scanner.ts",
"parser.ts",
"utilities.ts",
"binder.ts",
"checker.ts",
"emitter.ts",
"program.ts",
"commandLineParser.ts",
"tsc.ts",
"diagnosticInformationMap.generated.ts"
]
}
Using the include and exclude properties

{
"compilerOptions": {
"module": "system",
"noImplicitAny": true,
"removeComments": true,
"preserveConstEnums": true,
"outFile": "../../built/local/tsc.js",
"sourceMap": true
},
"include": ["src/**/*"],
"exclude": ["**/*.spec.ts"]
}
TSConfig Bases
Depending on the JavaScript runtime environment which you intend to run your code in, there may be a base configuration which you can use at github.com/tsconfig/bases. These are tsconfig.json files which your project extends from which simplifies your tsconfig.json by handling the runtime support.

For example, if you were writing a project which uses Node.js version 12 and above, then you could use the npm module @tsconfig/node12:

{
"extends": "@tsconfig/node12/tsconfig.json",
"compilerOptions": {
"preserveConstEnums": true
},
"include": ["src/**/*"],
"exclude": ["**/*.spec.ts"]
}
This lets your tsconfig.json focus on the unique choices for your project, and not all of the runtime mechanics. There are a few tsconfig bases already, and we’re hoping the community can add more for different environments.

Details
The "compilerOptions" property can be omitted, in which case the compiler’s defaults are used. See our full list of supported Compiler Options.

TSConfig Reference
To learn more about the hundreds of configuration options in the TSConfig Reference.

Schema
The tsconfig.json Schema can be found at the JSON Schema Store.

On this page
Overview
Using tsconfig.json or jsconfig.json
Examples
TSConfig Bases
Details
TSConfig Reference
Schema
Is this page helpful?
YesNo
The TypeScript docs are an open source project. Help us improve these pages by sending a Pull Request ❤

Contributors to this page:
OTOrta Therox (19)LGLucas Garron (1)JBJake Bailey (1)L☺Loren ☺️ (1)AGAnton Gilgur (1)4+
Last updated: Feb 03, 2026

This page loaded in 0.086 seconds.

Customize
Site Colours:

System
Code Font:

Cascadia
Popular Documentation Pages
Everyday Types
All of the common types in TypeScript

Creating Types from Types
Techniques to make more elegant types

More on Functions
How to provide types to functions in JavaScript

More on Objects
How to provide a type shape to JavaScript objects

Narrowing
How TypeScript infers types based on runtime behavior

Variable Declarations
How to create and type JavaScript variables

TypeScript in 5 minutes
An overview of building a TypeScript web app

TSConfig Options
All the configuration options for a project

Classes
How to provide types to JavaScript ES6 classes

Made with ♥ in Redmond, Boston, SF & Dublin

Microsoft Logo
© 2012-2026 Microsoft
PrivacyTerms of Use

Using TypeScript
Get Started
Download
Community
Playground
TSConfig Ref
Code Samples
Why TypeScript
Design
Community
Get Help
Blog
GitHub Repo
Community Chat
@TypeScript
Mastodon
Stack Overflow
Web Repo
Navigated to What is a tsconfig.json
Skip to main content
Get Started
Handbook
Reference
Modules Reference
Tutorials
What's New
Declaration Files
JavaScript
Project Configuration
What is a tsconfig.json
Compiler Options in MSBuild
TSConfig Reference
tsc CLI Options
Project References
Integrating with Build Tools
Configuring Watch
Nightly Builds
Compiler Options in MSBuild
Overview
When you have an MSBuild based project which utilizes TypeScript such as an ASP.NET Core project, you can configure TypeScript in two ways. Either via a tsconfig.json or via the project settings.

Using a
tsconfig.json
We recommend using a tsconfig.json for your project when possible. To add one to an existing project, add a new item to your project which is called a “TypeScript JSON Configuration File” in modern versions of Visual Studio.

The new tsconfig.json will then be used as the source of truth for TypeScript-specific build information like files and configuration. You can learn about how TSConfigs works here and there is a comprehensive reference here.

Using Project Settings
You can also define the configuration for TypeScript inside you project’s settings. This is done by editing the XML in your .csproj to define PropertyGroups which describe how the build can work:

<PropertyGroup>
  <TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>
  <TypeScriptNoImplicitReturns>true</TypeScriptNoImplicitReturns>
</PropertyGroup>
There is a series of mappings for common TypeScript settings, these are settings which map directly to TypeScript cli options and are used to help you write a more understandable project file. You can use the TSConfig reference to get more information on what values and defaults are for each mapping.

CLI Mappings
MSBuild Config Name TSC Flag
<TypeScriptAllowJS> --allowJs
Allow JavaScript files to be a part of your program. Use the checkJS option to get errors from these files.

<TypeScriptRemoveComments> --removeComments
Disable emitting comments.

<TypeScriptNoImplicitAny> --noImplicitAny
Enable error reporting for expressions and declarations with an implied any type..

<TypeScriptGeneratesDeclarations> --declaration
Generate .d.ts files from TypeScript and JavaScript files in your project.

<TypeScriptModuleKind> --module
Specify what module code is generated.

<TypeScriptJSXEmit> --jsx
Specify what JSX code is generated.

<TypeScriptOutDir> --outDir
Specify an output folder for all emitted files.

<TypeScriptSourceMap> --sourcemap
Create source map files for emitted JavaScript files.

<TypeScriptTarget> --target
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.

<TypeScriptNoResolve> --noResolve
Disallow imports, requires or <reference>s from expanding the number of files TypeScript should add to a project.

<TypeScriptMapRoot> --mapRoot
Specify the location where debugger should locate map files instead of generated locations.

<TypeScriptSourceRoot> --sourceRoot
Specify the root path for debuggers to find the reference source code.

<TypeScriptCharset> --charset
No longer supported. In early versions, manually set the text encoding for reading files.

<TypeScriptEmitBOM> --emitBOM
Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.

<TypeScriptNoLib> --noLib
Disable including any library files, including the default lib.d.ts.

<TypeScriptPreserveConstEnums> --preserveConstEnums
Disable erasing const enum declarations in generated code.

<TypeScriptSuppressImplicitAnyIndexErrors> --suppressImplicitAnyIndexErrors
Suppress noImplicitAny errors when indexing objects that lack index signatures.

<TypeScriptNoEmitHelpers> --noEmitHelpers
Disable generating custom helper functions like \_\_extends in compiled output.

<TypeScriptInlineSourceMap> --inlineSourceMap
Include sourcemap files inside the emitted JavaScript.

<TypeScriptInlineSources> --inlineSources
Include source code in the sourcemaps inside the emitted JavaScript.

<TypeScriptNewLine> --newLine
Set the newline character for emitting files.

<TypeScriptIsolatedModules> --isolatedModules
Ensure that each file can be safely transpiled without relying on other imports.

<TypeScriptEmitDecoratorMetadata> --emitDecoratorMetadata
Emit design-type metadata for decorated declarations in source files.

<TypeScriptRootDir> --rootDir
Specify the root folder within your source files.

<TypeScriptExperimentalDecorators> --experimentalDecorators
Enable experimental support for TC39 stage 2 draft decorators.

<TypeScriptModuleResolution> --moduleResolution
Specify how TypeScript looks up a file from a given module specifier.

<TypeScriptSuppressExcessPropertyErrors> --suppressExcessPropertyErrors
Disable reporting of excess property errors during the creation of object literals.

<TypeScriptReactNamespace> --reactNamespace
Specify the object invoked for createElement. This only applies when targeting react JSX emit.

<TypeScriptSkipDefaultLibCheck> --skipDefaultLibCheck
Skip type checking .d.ts files that are included with TypeScript.

<TypeScriptAllowUnusedLabels> --allowUnusedLabels
Disable error reporting for unused labels.

<TypeScriptNoImplicitReturns> --noImplicitReturns
Enable error reporting for codepaths that do not explicitly return in a function.

<TypeScriptNoFallthroughCasesInSwitch> --noFallthroughCasesInSwitch
Enable error reporting for fallthrough cases in switch statements.

<TypeScriptAllowUnreachableCode> --allowUnreachableCode
Disable error reporting for unreachable code.

<TypeScriptForceConsistentCasingInFileNames> --forceConsistentCasingInFileNames
Ensure that casing is correct in imports.

<TypeScriptAllowSyntheticDefaultImports> --allowSyntheticDefaultImports
Allow 'import x from y' when a module doesn't have a default export.

<TypeScriptNoImplicitUseStrict> --noImplicitUseStrict
Disable adding 'use strict' directives in emitted JavaScript files.

<TypeScriptLib> --lib
Specify a set of bundled library declaration files that describe the target runtime environment.

<TypeScriptBaseUrl> --baseUrl
Specify the base directory to resolve bare specifier module names.

<TypeScriptDeclarationDir> --declarationDir
Specify the output directory for generated declaration files.

<TypeScriptNoImplicitThis> --noImplicitThis
Enable error reporting when this is given the type any.

<TypeScriptSkipLibCheck> --skipLibCheck
Skip type checking all .d.ts files.

<TypeScriptStrictNullChecks> --strictNullChecks
When type checking, take into account null and undefined.

<TypeScriptNoUnusedLocals> --noUnusedLocals
Enable error reporting when a local variables aren't read.

<TypeScriptNoUnusedParameters> --noUnusedParameters
Raise an error when a function parameter isn't read

<TypeScriptAlwaysStrict> --alwaysStrict
Ensure 'use strict' is always emitted.

<TypeScriptImportHelpers> --importHelpers
Allow importing helper functions from tslib once per project, instead of including them per-file.

<TypeScriptJSXFactory> --jsxFactory
Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'

<TypeScriptStripInternal> --stripInternal
Disable emitting declarations that have @internal in their JSDoc comments.

<TypeScriptCheckJs> --checkJs
Enable error reporting in type-checked JavaScript files.

<TypeScriptDownlevelIteration> --downlevelIteration
Emit more compliant, but verbose and less performant JavaScript for iteration.

<TypeScriptStrict> --strict
Enable all strict type checking options.

<TypeScriptNoStrictGenericChecks> --noStrictGenericChecks
Disable strict checking of generic signatures in function types.

<TypeScriptPreserveSymlinks> --preserveSymlinks
Disable resolving symlinks to their realpath. This correlates to the same flag in node.

<TypeScriptStrictFunctionTypes> --strictFunctionTypes
When assigning functions, check to ensure parameters and the return values are subtype-compatible.

<TypeScriptStrictPropertyInitialization> --strictPropertyInitialization
Check for class properties that are declared but not set in the constructor.

<TypeScriptESModuleInterop> --esModuleInterop
Emit additional JavaScript to ease support for importing CommonJS modules. This enables allowSyntheticDefaultImports for type compatibility.

<TypeScriptEmitDeclarationOnly> --emitDeclarationOnly
Only output d.ts files and not JavaScript files.

<TypeScriptKeyofStringsOnly> --keyofStringsOnly
Make keyof only return strings instead of string, numbers or symbols. Legacy option.

<TypeScriptUseDefineForClassFields> --useDefineForClassFields
Emit ECMAScript-standard-compliant class fields.

<TypeScriptDeclarationMap> --declarationMap
Create sourcemaps for d.ts files.

<TypeScriptResolveJsonModule> --resolveJsonModule
Enable importing .json files

<TypeScriptStrictBindCallApply> --strictBindCallApply
Check that the arguments for bind, call, and apply methods match the original function.

<TypeScriptNoEmitOnError> --noEmitOnError
Disable emitting files if any type checking errors are reported.

Additional Flags
Because the MSBuild system passes arguments directly to the TypeScript CLI, you can use the option TypeScriptAdditionalFlags to provide specific flags which don’t have a mapping above.

For example, this would turn on noPropertyAccessFromIndexSignature:

<TypeScriptAdditionalFlags> $(TypeScriptAdditionalFlags) --noPropertyAccessFromIndexSignature</TypeScriptAdditionalFlags>
Debug and Release Builds
You can use PropertyGroup conditions to define different sets of configurations. For example, a common task is stripping comments and sourcemaps in production. In this example, we define a debug and release property group which have different TypeScript configurations:

<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
  <TypeScriptRemoveComments>false</TypeScriptRemoveComments>
  <TypeScriptSourceMap>true</TypeScriptSourceMap>
</PropertyGroup>
<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <TypeScriptRemoveComments>true</TypeScriptRemoveComments>
  <TypeScriptSourceMap>false</TypeScriptSourceMap>
</PropertyGroup>
<Import
    Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets"
    Condition="Exists('$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets')" />
ToolsVersion
The value of <TypeScriptToolsVersion>1.7</TypeScriptToolsVersion> property in the project file identifies the compiler version to use to build (1.7 in this example). This allows a project to build against the same versions of the compiler on different machines.

If TypeScriptToolsVersion is not specified, the latest compiler version installed on the machine will be used to build.

Users using newer versions of TS, will see a prompt to upgrade their project on first load.

TypeScriptCompileBlocked
If you are using a different build tool to build your project (e.g. gulp, grunt , etc.) and VS for the development and debugging experience, set <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked> in your project. This should give you all the editing support, but not the build when you hit F5.

TypeScriptEnableIncrementalMSBuild (TypeScript 4.2 Beta and later)
By default, MSBuild will attempt to only run the TypeScript compiler when the project’s source files have been updated since the last compilation. However, if this behavior is causing issues, such as when TypeScript’s incremental option is enabled, set <TypeScriptEnableIncrementalMSBuild>false</TypeScriptEnableIncrementalMSBuild> to ensure the TypeScript compiler is invoked with every run of MSBuild.

On this page
Overview
Using a tsconfig.json
Using Project Settings
Additional Flags
Debug and Release Builds
ToolsVersion
TypeScriptCompileBlocked
TypeScriptEnableIncrementalMSBuild (TypeScript 4.2 Beta and later)
Is this page helpful?
YesNo
The TypeScript docs are an open source project. Help us improve these pages by sending a Pull Request ❤

Contributors to this page:
MHMohamed Hegazy (62)OTOrta Therox (18)YYui (4)DRDaniel Rosenwasser (4)BLBen Lichtman (2)13+
Last updated: Feb 03, 2026

This page loaded in 0.086 seconds.

Customize
Site Colours:

System
Code Font:

Cascadia
Popular Documentation Pages
Everyday Types
All of the common types in TypeScript

Creating Types from Types
Techniques to make more elegant types

More on Functions
How to provide types to functions in JavaScript

More on Objects
How to provide a type shape to JavaScript objects

Narrowing
How TypeScript infers types based on runtime behavior

Variable Declarations
How to create and type JavaScript variables

TypeScript in 5 minutes
An overview of building a TypeScript web app

TSConfig Options
All the configuration options for a project

Classes
How to provide types to JavaScript ES6 classes

Made with ♥ in Redmond, Boston, SF & Dublin

Microsoft Logo
© 2012-2026 Microsoft
PrivacyTerms of Use

Using TypeScript
Get Started
Download
Community
Playground
TSConfig Ref
Code Samples
Why TypeScript
Design
Community
Get Help
Blog
GitHub Repo
Community Chat
@TypeScript
Mastodon
Stack Overflow
Web Repo
Navigated to Compiler Options in MSBuild
