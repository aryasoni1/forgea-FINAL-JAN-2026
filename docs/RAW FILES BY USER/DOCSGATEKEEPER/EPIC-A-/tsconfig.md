Skip to main content
Intro to the TSConfig Reference
A TSConfig file in a directory indicates that the directory is the root of a TypeScript or JavaScript project...
Compiler Options
Top Level
files,extends,include,exclude andreferences
"compilerOptions"
Type Checking
allowUnreachableCode,allowUnusedLabels,alwaysStrict,exactOptionalPropertyTypes,noFallthroughCasesInSwitch,noImplicitAny,noImplicitOverride,noImplicitReturns,noImplicitThis,noPropertyAccessFromIndexSignature,noUncheckedIndexedAccess,noUnusedLocals,noUnusedParameters,strict,strictBindCallApply,strictBuiltinIteratorReturn,strictFunctionTypes,strictNullChecks,strictPropertyInitialization anduseUnknownInCatchVariables
Modules
allowArbitraryExtensions,allowImportingTsExtensions,allowUmdGlobalAccess,baseUrl,customConditions,module,moduleResolution,moduleSuffixes,noResolve,noUncheckedSideEffectImports,paths,resolveJsonModule,resolvePackageJsonExports,resolvePackageJsonImports,rewriteRelativeImportExtensions,rootDir,rootDirs,typeRoots andtypes
Emit
declaration,declarationDir,declarationMap,downlevelIteration,emitBOM,emitDeclarationOnly,importHelpers,inlineSourceMap,inlineSources,mapRoot,newLine,noEmit,noEmitHelpers,noEmitOnError,outDir,outFile,preserveConstEnums,removeComments,sourceMap,sourceRoot andstripInternal
JavaScript Support
allowJs,checkJs andmaxNodeModuleJsDepth
Editor Support
disableSizeLimit andplugins
Interop Constraints
allowSyntheticDefaultImports,erasableSyntaxOnly,esModuleInterop,forceConsistentCasingInFileNames,isolatedDeclarations,isolatedModules,preserveSymlinks andverbatimModuleSyntax
Backwards Compatibility
charset,importsNotUsedAsValues,keyofStringsOnly,noImplicitUseStrict,noStrictGenericChecks,out,preserveValueImports,suppressExcessPropertyErrors andsuppressImplicitAnyIndexErrors
Language and Environment
emitDecoratorMetadata,experimentalDecorators,jsx,jsxFactory,jsxFragmentFactory,jsxImportSource,lib,libReplacement,moduleDetection,noLib,reactNamespace,target anduseDefineForClassFields
Compiler Diagnostics
diagnostics,explainFiles,extendedDiagnostics,generateCpuProfile,generateTrace,listEmittedFiles,listFiles,noCheck andtraceResolution
Projects
composite,disableReferencedProjectLoad,disableSolutionSearching,disableSourceOfProjectReferenceRedirect,incremental andtsBuildInfoFile
Output Formatting
noErrorTruncation,preserveWatchOutput andpretty
Completeness
skipDefaultLibCheck andskipLibCheck
Command Line
Watch Options
assumeChangesOnlyAffectDirectDependencies
"watchOptions"
watchOptions
watchFile,watchDirectory,fallbackPolling,synchronousWatchDirectory,excludeDirectories andexcludeFiles
"typeAcquisition"
typeAcquisition
enable,include,exclude anddisableFilenameBasedTypeAcquisition
Root Fields
Starting up are the root options in the TSConfig - these options relate to how your TypeScript or JavaScript project is set up.

#

Files -
files
Specifies an allowlist of files to include in the program. An error occurs if any of the files can’t be found.

{
"compilerOptions": {},
"files": [
"core.ts",
"sys.ts",
"types.ts",
"scanner.ts",
"parser.ts",
"utilities.ts",
"binder.ts",
"checker.ts",
"tsc.ts"
]
}
This is useful when you only have a small number of files and don’t need to use a glob to reference many files. If you need that then use include.

Default:
false
Related:
include
exclude
Released:
1.5

#

Extends -
extends
The value of extends is a string which contains a path to another configuration file to inherit from. The path may use Node.js style resolution.

The configuration from the base file are loaded first, then overridden by those in the inheriting config file. All relative paths found in the configuration file will be resolved relative to the configuration file they originated in.

It’s worth noting that files, include, and exclude from the inheriting config file overwrite those from the base config file, and that circularity between configuration files is not allowed.

Currently, the only top-level property that is excluded from inheritance is references.

Example
configs/base.json:

{
"compilerOptions": {
"noImplicitAny": true,
"strictNullChecks": true
}
}
tsconfig.json:

{
"extends": "./configs/base",
"files": ["main.ts", "supplemental.ts"]
}
tsconfig.nostrictnull.json:

{
"extends": "./tsconfig",
"compilerOptions": {
"strictNullChecks": false
}
}
Properties with relative paths found in the configuration file, which aren’t excluded from inheritance, will be resolved relative to the configuration file they originated in.

Default:
false
Released:
2.1

#

Include -
include
Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the tsconfig.json file.

{
"include": ["src/**/*", "tests/**/*"]
}
Which would include:

.
├── scripts ⨯
│ ├── lint.ts ⨯
│ ├── update_deps.ts ⨯
│ └── utils.ts ⨯
├── src ✓
│ ├── client ✓
│ │ ├── index.ts ✓
│ │ └── utils.ts ✓
│ ├── server ✓
│ │ └── index.ts ✓
├── tests ✓
│ ├── app.test.ts ✓
│ ├── utils.ts ✓
│ └── tests.d.ts ✓
├── package.json
├── tsconfig.json
└── yarn.lock
include and exclude support wildcard characters to make glob patterns:

- matches zero or more characters (excluding directory separators)
  ? matches any one character (excluding directory separators)
  \*\*/ matches any directory nested to any level
  If the last path segment in a pattern does not contain a file extension or wildcard character, then it is treated as a directory, and files with supported extensions inside that directory are included (e.g. .ts, .tsx, and .d.ts by default, with .js and .jsx if allowJs is set to true).

Default:
[] if files is specified; \*_/_ otherwise.
Related:
files
exclude
Released:
2.0

#

Exclude -
exclude
Specifies an array of filenames or patterns that should be skipped when resolving include.

Important: exclude only changes which files are included as a result of the include setting. A file specified by exclude can still become part of your codebase due to an import statement in your code, a types inclusion, a /// <reference directive, or being specified in the files list.

It is not a mechanism that prevents a file from being included in the codebase - it simply changes what the include setting finds.

Default:
node_modules bower_components jspm_packages outDir
Related:
include
files
Released:
2.0

#

References -
references
Project references are a way to structure your TypeScript programs into smaller pieces. Using Project References can greatly improve build and editor interaction times, enforce logical separation between components, and organize your code in new and improved ways.

You can read more about how references works in the Project References section of the handbook

Default:
false
Released:
3.0
Compiler Options
These options make up the bulk of TypeScript’s configuration and it covers how the language should work.

Type Checking
Modules
Emit
JavaScript Support
Editor Support
Interop Constraints
Backwards Compatibility
Language and Environment
Compiler Diagnostics
Projects
Output Formatting
Completeness
Command Line
Watch Options

#

Type Checking

#

Allow Unreachable Code -
allowUnreachableCode
When:

undefined (default) provide suggestions as warnings to editors
true unreachable code is ignored
false raises compiler errors about unreachable code
These warnings are only about code which is provably unreachable due to the use of JavaScript syntax, for example:

function fn(n: number) {
if (n > 5) {
return true;
} else {
return false;
}
return true;
}
With "allowUnreachableCode": false:

function fn(n: number) {
if (n > 5) {
return true;
} else {
return false;
}
return true;
Unreachable code detected.
}
Try
This does not affect errors on the basis of code which appears to be unreachable due to type analysis.

Released:
1.8

#

Allow Unused Labels -
allowUnusedLabels
When:

undefined (default) provide suggestions as warnings to editors
true unused labels are ignored
false raises compiler errors about unused labels
Labels are very rare in JavaScript and typically indicate an attempt to write an object literal:

function verifyAge(age: number) {
// Forgot 'return' statement
if (age > 18) {
verified: true;
Unused label.
}
}
Try
Released:
1.8

#

Always Strict -
alwaysStrict
Ensures that your files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.

ECMAScript strict mode was introduced in ES5 and provides behavior tweaks to the runtime of the JavaScript engine to improve performance, and makes a set of errors throw instead of silently ignoring them.

Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
2.1

#

Exact Optional Property Types -
exactOptionalPropertyTypes
With exactOptionalPropertyTypes enabled, TypeScript applies stricter rules around how it handles properties on type or interfaces which have a ? prefix.

For example, this interface declares that there is a property which can be one of two strings: ‘dark’ or ‘light’ or it should not be in the object.

interface UserDefaults {
// The absence of a value represents 'system'
colorThemeOverride?: "dark" | "light";
}
Without this flag enabled, there are three values which you can set colorThemeOverride to be: “dark”, “light” and undefined.

Setting the value to undefined will allow most JavaScript runtime checks for the existence to fail, which is effectively falsy. However, this isn’t quite accurate; colorThemeOverride: undefined is not the same as colorThemeOverride not being defined. For example, "colorThemeOverride" in settings would have different behavior with undefined as the key compared to not being defined.

exactOptionalPropertyTypes makes TypeScript truly enforce the definition provided as an optional property:

const settings = getUserSettings();
settings.colorThemeOverride = "dark";
settings.colorThemeOverride = "light";

// But not:
settings.colorThemeOverride = undefined;
Type 'undefined' is not assignable to type '"dark" | "light"' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
Try
Recommended
Released:
4.4

#

No Fallthrough Cases In Switch -
noFallthroughCasesInSwitch
Report errors for fallthrough cases in switch statements. Ensures that any non-empty case inside a switch statement includes either break, return, or throw. This means you won’t accidentally ship a case fallthrough bug.

const a: number = 6;

switch (a) {
case 0:
Fallthrough case in switch.
console.log("even");
case 1:
console.log("odd");
break;
}
Try
Released:
1.8

#

No Implicit Any -
noImplicitAny
In some cases where no type annotations are present, TypeScript will fall back to a type of any for a variable when it cannot infer the type.

This can cause some errors to be missed, for example:

function fn(s) {
// No error?
console.log(s.subtr(3));
}
fn(42);
Try
Turning on noImplicitAny however TypeScript will issue an error whenever it would have inferred any:

function fn(s) {
Parameter 's' implicitly has an 'any' type.
console.log(s.subtr(3));
}
Try
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
1.0

#

No Implicit Override -
noImplicitOverride
When working with classes which use inheritance, it’s possible for a sub-class to get “out of sync” with the functions it overloads when they are renamed in the base class.

For example, imagine you are modeling a music album syncing system:

class Album {
download() {
// Default behavior
}
}

class SharedAlbum extends Album {
download() {
// Override to get info from many sources
}
}
Try
Then when you add support for machine-learning generated playlists, you refactor the Album class to have a ‘setup’ function instead:

class Album {
setup() {
// Default behavior
}
}

class MLAlbum extends Album {
setup() {
// Override to get info from algorithm
}
}

class SharedAlbum extends Album {
download() {
// Override to get info from many sources
}
}
Try
In this case, TypeScript has provided no warning that download on SharedAlbum expected to override a function in the base class.

Using noImplicitOverride you can ensure that the sub-classes never go out of sync, by ensuring that functions which override include the keyword override.

The following example has noImplicitOverride enabled, and you can see the error received when override is missing:

class Album {
setup() {}
}

class MLAlbum extends Album {
override setup() {}
}

class SharedAlbum extends Album {
setup() {}
This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
}
Try
Released:
4.3

#

No Implicit Returns -
noImplicitReturns
When enabled, TypeScript will check all code paths in a function to ensure they return a value.

function lookupHeadphonesManufacturer(color: "blue" | "black"): string {
Function lacks ending return statement and return type does not include 'undefined'.
if (color === "blue") {
return "beats";
} else {
("bose");
}
}
Try
Released:
1.8

#

No Implicit This -
noImplicitThis
Raise error on ‘this’ expressions with an implied ‘any’ type.

For example, the class below returns a function which tries to access this.width and this.height – but the context for this inside the function inside getAreaFunction is not the instance of the Rectangle.

class Rectangle {
width: number;
height: number;

constructor(width: number, height: number) {
this.width = width;
this.height = height;
}

getAreaFunction() {
return function () {
return this.width \* this.height;
'this' implicitly has type 'any' because it does not have a type annotation.
'this' implicitly has type 'any' because it does not have a type annotation.
};
}
}
Try
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
2.0

#

No Property Access From Index Signature -
noPropertyAccessFromIndexSignature
This setting ensures consistency between accessing a field via the “dot” (obj.key) syntax, and “indexed” (obj["key"]) and the way which the property is declared in the type.

Without this flag, TypeScript will allow you to use the dot syntax to access fields which are not defined:

interface GameSettings {
// Known up-front properties
speed: "fast" | "medium" | "slow";
quality: "high" | "low";

// Assume anything unknown to the interface
// is a string.
[key: string]: string;
}

const settings = getSettings();
settings.speed;

(property) GameSettings.speed: "fast" | "medium" | "slow"
settings.quality;

(property) GameSettings.quality: "high" | "low"

// Unknown key accessors are allowed on
// this object, and are `string`
settings.username;

(index) GameSettings[string]: string
Try
Turning the flag on will raise an error because the unknown field uses dot syntax instead of indexed syntax.

const settings = getSettings();
settings.speed;
settings.quality;

// This would need to be settings["username"];
settings.username;
Property 'username' comes from an index signature, so it must be accessed with ['username'].

(index) GameSettings[string]: string
Try
The goal of this flag is to signal intent in your calling syntax about how certain you are this property exists.

Released:
4.2

#

No Unchecked Indexed Access -
noUncheckedIndexedAccess
TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures.

interface EnvironmentVars {
NAME: string;
OS: string;

// Unknown properties are covered by this index signature.
[propName: string]: string;
}

declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;

const os: string

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV;

const nodeEnv: string
Try
Turning on noUncheckedIndexedAccess will add undefined to any un-declared field in the type.

declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;

const os: string

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV;

const nodeEnv: string | undefined
Try
Released:
4.1

#

No Unused Locals -
noUnusedLocals
Report errors on unused local variables.

const createKeyboard = (modelID: number) => {
const defaultModelID = 23;
'defaultModelID' is declared but its value is never read.
return { type: "keyboard", modelID };
};
Try
Released:
2.0

#

No Unused Parameters -
noUnusedParameters
Report errors on unused parameters in functions.

const createDefaultKeyboard = (modelID: number) => {
'modelID' is declared but its value is never read.
const defaultModelID = 23;
return { type: "keyboard", modelID: defaultModelID };
};
Try
Parameters declaration with names starting with an underscore (\_) are exempt from the unused parameter checking. e.g.:

const createDefaultKeyboard = (\_modelID: number) => {
return { type: "keyboard" };
};
Try
Released:
2.0

#

Strict -
strict
The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. Turning this on is equivalent to enabling all of the strict mode family options, which are outlined below. You can then turn off individual strict mode family checks as needed.

Future versions of TypeScript may introduce additional stricter checking under this flag, so upgrades of TypeScript might result in new type errors in your program. When appropriate and possible, a corresponding flag will be added to disable that behavior.

Recommended
Related:
alwaysStrict
strictNullChecks
strictBindCallApply
strictBuiltinIteratorReturn
strictFunctionTypes
strictPropertyInitialization
noImplicitAny
noImplicitThis
useUnknownInCatchVariables
Released:
2.3

#

Strict Bind Call Apply -
strictBindCallApply
When set, TypeScript will check that the built-in methods of functions call, bind, and apply are invoked with correct argument for the underlying function:

// With strictBindCallApply on
function fn(x: string) {
return parseInt(x);
}

const n1 = fn.call(undefined, "10");

const n2 = fn.call(undefined, false);
Argument of type 'boolean' is not assignable to parameter of type 'string'.
Try
Otherwise, these functions accept any arguments and will return any:

// With strictBindCallApply off
function fn(x: string) {
return parseInt(x);
}

// Note: No error; return type is 'any'
const n = fn.call(undefined, false);
Try
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
3.2

#

strictBuiltinIteratorReturn -
strictBuiltinIteratorReturn
Built-in iterators are instantiated with a `TReturn` type of undefined instead of `any`.
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
5.6

#

Strict Function Types -
strictFunctionTypes
When enabled, this flag causes functions parameters to be checked more correctly.

Here’s a basic example with strictFunctionTypes off:

function fn(x: string) {
console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment
let func: StringOrNumberFunc = fn;
// Unsafe call - will crash
func(10);
Try
With strictFunctionTypes on, the error is correctly detected:

function fn(x: string) {
console.log("Hello, " + x.toLowerCase());
}

type StringOrNumberFunc = (ns: string | number) => void;

// Unsafe assignment is prevented
let func: StringOrNumberFunc = fn;
Type '(x: string) => void' is not assignable to type 'StringOrNumberFunc'.
Types of parameters 'x' and 'ns' are incompatible.
Type 'string | number' is not assignable to type 'string'.
Type 'number' is not assignable to type 'string'.
Try
During development of this feature, we discovered a large number of inherently unsafe class hierarchies, including some in the DOM. Because of this, the setting only applies to functions written in function syntax, not to those in method syntax:

type Methodish = {
func(x: string | number): void;
};

function fn(x: string) {
console.log("Hello, " + x.toLowerCase());
}

// Ultimately an unsafe assignment, but not detected
const m: Methodish = {
func: fn,
};
m.func(10);
Try
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
2.6

#

Strict Null Checks -
strictNullChecks
When strictNullChecks is false, null and undefined are effectively ignored by the language. This can lead to unexpected errors at runtime.

When strictNullChecks is true, null and undefined have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.

For example with this TypeScript code, users.find has no guarantee that it will actually find a user, but you can write code as though it will:

declare const loggedInUsername: string;

const users = [
{ name: "Oby", age: 12 },
{ name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
Try
Setting strictNullChecks to true will raise an error that you have not made a guarantee that the loggedInUser exists before trying to use it.

declare const loggedInUsername: string;

const users = [
{ name: "Oby", age: 12 },
{ name: "Heera", age: 32 },
];

const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);
'loggedInUser' is possibly 'undefined'.
Try
The second example failed because the array’s find function looks a bit like this simplification:

// When strictNullChecks: true
type Array = {
find(predicate: (value: any, index: number) => boolean): S | undefined;
};
// When strictNullChecks: false the undefined is removed from the type system,
// allowing you to write code which assumes it always found a result
type Array = {
find(predicate: (value: any, index: number) => boolean): S;
};
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
2.0

#

Strict Property Initialization -
strictPropertyInitialization
When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.

class UserAccount {
name: string;
accountType = "user";

email: string;
Property 'email' has no initializer and is not definitely assigned in the constructor.
address: string | undefined;

constructor(name: string) {
this.name = name;
// Note that this.email is not set
}
}
Try
In the above case:

this.name is set specifically.
this.accountType is set by default.
this.email is not set and raises an error.
this.address is declared as potentially undefined which means it does not have to be set.
Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
2.7

#

Use Unknown In Catch Variables -
useUnknownInCatchVariables
In TypeScript 4.0, support was added to allow changing the type of the variable in a catch clause from any to unknown. Allowing for code like:

try {
// ...
} catch (err: unknown) {
// We have to verify err is an
// error before using it as one.
if (err instanceof Error) {
console.log(err.message);
}
}
Try
This pattern ensures that error handling code becomes more comprehensive because you cannot guarantee that the object being thrown is a Error subclass ahead of time. With the flag useUnknownInCatchVariables enabled, then you do not need the additional syntax (: unknown) nor a linter rule to try enforce this behavior.

Recommended
Default:
true if strict; false otherwise.
Related:
strict
Released:
4.4

#

Modules

#

Allow Arbitrary Extensions -
allowArbitraryExtensions
In TypeScript 5.0, when an import path ends in an extension that isn’t a known JavaScript or TypeScript file extension, the compiler will look for a declaration file for that path in the form of {file basename}.d.{extension}.ts. For example, if you are using a CSS loader in a bundler project, you might want to write (or generate) declaration files for those stylesheets:

/_ app.css _/
.cookie-banner {
display: none;
}
// app.d.css.ts
declare const css: {
cookieBanner: string;
};
export default css;
// App.tsx
import styles from "./app.css";
styles.cookieBanner; // string
By default, this import will raise an error to let you know that TypeScript doesn’t understand this file type and your runtime might not support importing it. But if you’ve configured your runtime or bundler to handle it, you can suppress the error with the new --allowArbitraryExtensions compiler option.

Note that historically, a similar effect has often been achievable by adding a declaration file named app.css.d.ts instead of app.d.css.ts - however, this just worked through Node’s require resolution rules for CommonJS. Strictly speaking, the former is interpreted as a declaration file for a JavaScript file named app.css.js. Because relative files imports need to include extensions in Node’s ESM support, TypeScript would error on our example in an ESM file under --moduleResolution node16 or nodenext.

For more information, read up the proposal for this feature and its corresponding pull request.

Released:
5.0

#

Allow Importing TS Extensions -
allowImportingTsExtensions
--allowImportingTsExtensions allows TypeScript files to import each other with a TypeScript-specific extension like .ts, .mts, or .tsx.

This flag is only allowed when --noEmit or --emitDeclarationOnly is enabled, since these import paths would not be resolvable at runtime in JavaScript output files. The expectation here is that your resolver (e.g. your bundler, a runtime, or some other tool) is going to make these imports between .ts files work.

Default:
true if rewriteRelativeImportExtensions; false otherwise.
Released:
5.0

#

Allow Umd Global Access -
allowUmdGlobalAccess
When set to true, allowUmdGlobalAccess lets you access UMD exports as globals from inside module files. A module file is a file that has imports and/or exports. Without this flag, using an export from a UMD module requires an import declaration.

An example use case for this flag would be a web project where you know the particular library (like jQuery or Lodash) will always be available at runtime, but you can’t access it with an import.

Released:
3.5

#

Base URL -
baseUrl
Sets a base directory from which to resolve bare specifier module names. For example, in the directory structure:

project
├── ex.ts
├── hello
│ └── world.ts
└── tsconfig.json
With "baseUrl": "./", TypeScript will look for files starting at the same folder as the tsconfig.json:

import { helloWorld } from "hello/world";
console.log(helloWorld);
This resolution has higher priority than lookups from node_modules.

This feature was designed for use in conjunction with AMD module loaders in the browser, and is not recommended in any other context. As of TypeScript 4.1, baseUrl is no longer required to be set when using paths.

Released:
2.0

#

Custom Conditions -
customConditions
--customConditions takes a list of additional conditions that should succeed when TypeScript resolves from an exports or imports field of a package.json. These conditions are added to whatever existing conditions a resolver will use by default.

For example, when this field is set in a tsconfig.json as so:

{
"compilerOptions": {
"target": "es2022",
"moduleResolution": "bundler",
"customConditions": ["my-condition"]
}
}
Any time an exports or imports field is referenced in package.json, TypeScript will consider conditions called my-condition.

So when importing from a package with the following package.json

{
// ...
"exports": {
".": {
"my-condition": "./foo.mjs",
"node": "./bar.mjs",
"import": "./baz.mjs",
"require": "./biz.mjs"
}
}
}
TypeScript will try to look for files corresponding to foo.mjs.

This field is only valid under the node16, nodenext, and bundler options for --moduleResolution.

Related:
moduleResolution
resolvePackageJsonExports
resolvePackageJsonImports
Released:
5.0

#

Module -
module
Sets the module system for the program. See the theory behind TypeScript’s module option and its reference page for more information. You very likely want "nodenext" for modern Node.js projects and preserve or esnext for code that will be bundled.

Changing module affects moduleResolution which also has a reference page.

Here’s some example output for this file:

// @filename: index.ts
import { valueOfPi } from "./constants";

export const twoPi = valueOfPi _ 2;
Try
CommonJS
"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
exports.twoPi = void 0;
const constants_1 = require("./constants");
exports.twoPi = constants_1.valueOfPi _ 2;

Try
UMD
(function (factory) {
if (typeof module === "object" && typeof module.exports === "object") {
var v = factory(require, exports);
if (v !== undefined) module.exports = v;
}
else if (typeof define === "function" && define.amd) {
define(["require", "exports", "./constants"], factory);
}
})(function (require, exports) {
"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
exports.twoPi = void 0;
const constants_1 = require("./constants");
exports.twoPi = constants_1.valueOfPi \* 2;
});

Try
AMD
define(["require", "exports", "./constants"], function (require, exports, constants_1) {
"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
exports.twoPi = void 0;
exports.twoPi = constants_1.valueOfPi \* 2;
});

Try
System
System.register(["./constants"], function (exports_1, context_1) {
"use strict";
var constants_1, twoPi;
var \_\_moduleName = context_1 && context_1.id;
return {
setters: [
function (constants_1_1) {
constants_1 = constants_1_1;
}
],
execute: function () {
exports_1("twoPi", twoPi = constants_1.valueOfPi \* 2);
}
};
});

Try
ESNext
import { valueOfPi } from "./constants";
export const twoPi = valueOfPi \* 2;

Try
ES2015/ES6/ES2020/ES2022
import { valueOfPi } from "./constants";
export const twoPi = valueOfPi \* 2;

Try
In addition to the base functionality of ES2015/ES6, ES2020 adds support for dynamic imports, and import.meta while ES2022 further adds support for top level await.

node16/node18/node20/nodenext
The node16, node18, node20, and nodenext modes integrate with Node’s native ECMAScript Module support. The emitted JavaScript uses either CommonJS or ES2020 output depending on the file extension and the value of the type setting in the nearest package.json. Module resolution also works differently. You can learn more in the handbook and Modules Reference.

node16 is available from TypeScript 4.7
node18 is available from TypeScript 5.8 as a replacement for node16, with added support for import attributes.
node20 adds support for require(ESM).
nodenext is available from TypeScript 4.7, but its behavior changes with the latest stable versions of Node.js. --module nodenext implies the floating --target esnext.
preserve
In --module preserve (added in TypeScript 5.4), ECMAScript imports and exports written in input files are preserved in the output, and CommonJS-style import x = require("...") and export = ... statements are emitted as CommonJS require and module.exports. In other words, the format of each individual import or export statement is preserved, rather than being coerced into a single format for the whole compilation (or even a whole file).

import { valueOfPi } from "./constants";
const constants = require("./constants");
export const piSquared = valueOfPi \* constants.valueOfPi;

Try
While it’s rare to need to mix imports and require calls in the same file, this module mode best reflects the capabilities of most modern bundlers, as well as the Bun runtime.

Why care about TypeScript’s module emit with a bundler or with Bun, where you’re likely also setting noEmit? TypeScript’s type checking and module resolution behavior are affected by the module format that it would emit. Setting module gives TypeScript information about how your bundler or runtime will process imports and exports, which ensures that the types you see on imported values accurately reflect what will happen at runtime or after bundling.

None
"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
exports.twoPi = void 0;
const constants_1 = require("./constants");
exports.twoPi = constants_1.valueOfPi \* 2;

Try
Default:
CommonJS if target is ES5; ES6/ES2015 otherwise.
Allowed:
none
commonjs
amd
umd
system
es6/es2015
es2020
es2022
esnext
node16
node18
node20
nodenext
preserve
Related:
moduleResolution
esModuleInterop
allowImportingTsExtensions
allowArbitraryExtensions
resolveJsonModule
Released:
1.0

#

Module Resolution -
moduleResolution
Specify the module resolution strategy:

'node16' or 'nodenext' for modern versions of Node.js. Node.js v12 and later supports both ECMAScript imports and CommonJS require, which resolve using different algorithms. These moduleResolution values, when combined with the corresponding module values, picks the right algorithm for each resolution based on whether Node.js will see an import or require in the output JavaScript code.
'node10' (previously called 'node') for Node.js versions older than v10, which only support CommonJS require. You probably won’t need to use node10 in modern code.
'bundler' for use with bundlers. Like node16 and nodenext, this mode supports package.json "imports" and "exports", but unlike the Node.js resolution modes, bundler never requires file extensions on relative paths in imports.
'classic' was used in TypeScript before the release of 1.6. classic should not be used.
There are reference pages explaining the theory behind TypeScript’s module resolution and the details of each option.

Default:
Node10 if module is CommonJS; Node16 if module is Node16, Node18, or Node20; NodeNext if module is NodeNext; Bundler if module is Preserve; Classic otherwise.
Allowed:
classic
node10/node
node16
nodenext
bundler
Related:
module
paths
baseUrl
rootDirs
moduleSuffixes
customConditions
resolvePackageJsonExports
resolvePackageJsonImports
Released:
1.6

#

Module Suffixes -
moduleSuffixes
Provides a way to override the default list of file name suffixes to search when resolving a module.

{
"compilerOptions": {
"moduleSuffixes": [".ios", ".native", ""]
}
}
Given the above configuration, an import like the following:

import \* as foo from "./foo";
TypeScript will look for the relative files ./foo.ios.ts, ./foo.native.ts, and finally ./foo.ts.

Note the empty string "" in moduleSuffixes which is necessary for TypeScript to also look-up ./foo.ts.

This feature can be useful for React Native projects where each target platform can use a separate tsconfig.json with differing moduleSuffixes.

Released:
4.7

#

No Resolve -
noResolve
By default, TypeScript will examine the initial set of files for import and <reference directives and add these resolved files to your program.

If noResolve is set, this process doesn’t happen. However, import statements are still checked to see if they resolve to a valid module, so you’ll need to make sure this is satisfied by some other means.

Released:
1.0

#

noUncheckedSideEffectImports -
noUncheckedSideEffectImports
In JavaScript it’s possible to import a module without actually importing any values from it.

import "some-module";
These imports are often called side effect imports because the only useful behavior they can provide is by executing some side effect (like registering a global variable, or adding a polyfill to a prototype).

By default, TypeScript will not check these imports for validity. If the import resolves to a valid source file, TypeScript will load and check the file. If no source file is found, TypeScript will silently ignore the import.

This is surprising behavior, but it partially stems from modeling patterns in the JavaScript ecosystem. For example, this syntax has also been used with special loaders in bundlers to load CSS or other assets. Your bundler might be configured in such a way where you can include specific .css files by writing something like the following:

import "./button-component.css";
export function Button() {
// ...
}
Still, this masks potential typos on side effect imports.

When --noUncheckedSideEffectImports is enabled, TypeScript will error if it can’t find a source file for a side effect import.

import "oops-this-module-does-not-exist";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// error: Cannot find module 'oops-this-module-does-not-exist' or its corresponding
// type declarations.
When enabling this option, some working code may now receive an error, like in the CSS example above. To work around this, users who want to just write side effect imports for assets might be better served by writing what’s called an ambient module declaration with a wildcard specifier. It would go in a global file and look something like the following:

// ./src/globals.d.ts
// Recognize all CSS files as module imports.
declare module "\*.css" {}
In fact, you might already have a file like this in your project! For example, running something like vite init might create a similar vite-env.d.ts.

Released:
5.6

#

Paths -
paths
A series of entries which re-map imports to lookup locations relative to the baseUrl if set, or to the tsconfig file itself otherwise. There is a larger coverage of paths in the moduleResolution reference page.

paths lets you declare how TypeScript should resolve an import in your require/imports.

{
"compilerOptions": {
"paths": {
"jquery": ["./vendor/jquery/dist/jquery"]
}
}
}
This would allow you to be able to write import "jquery", and get all of the correct typing locally.

{
"compilerOptions": {
"paths": {
"app/_": ["./src/app/_"],
"config/_": ["./src/app/\_config/_"],
"environment/_": ["./src/environments/_"],
"shared/_": ["./src/app/\_shared/_"],
"helpers/_": ["./src/helpers/_"],
"tests/_": ["./src/tests/_"]
}
}
}
In this case, you can tell the TypeScript file resolver to support a number of custom prefixes to find code.

Note that this feature does not change how import paths are emitted by tsc, so paths should only be used to inform TypeScript that another tool has this mapping and will use it at runtime or when bundling.

Released:
2.0

#

Resolve JSON Module -
resolveJsonModule
Allows importing modules with a .json extension, which is a common practice in node projects. This includes generating a type for the import based on the static JSON shape.

TypeScript does not support resolving JSON files by default:

// @filename: settings.json
{
"repo": "TypeScript",
"dry": false,
"debug": false
}
// @filename: index.ts
import settings from "./settings.json";
Cannot find module './settings.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.

settings.debug === true;
settings.dry === 2;
Try
Enabling the option allows importing JSON, and validating the types in that JSON file.

// @filename: settings.json
{
"repo": "TypeScript",
"dry": false,
"debug": false
}
// @filename: index.ts
import settings from "./settings.json";

settings.debug === true;
settings.dry === 2;
This comparison appears to be unintentional because the types 'boolean' and 'number' have no overlap.
Try
Released:
2.9

#

Resolve package.json Exports -
resolvePackageJsonExports
--resolvePackageJsonExports forces TypeScript to consult the exports field of package.json files if it ever reads from a package in node_modules.

This option defaults to true under the node16, nodenext, and bundler options for --moduleResolution.

Default:
true when moduleResolution is node16, nodenext, or bundler; otherwise false
Related:
moduleResolution
customConditions
resolvePackageJsonImports
Released:
5.0

#

Resolve package.json Imports -
resolvePackageJsonImports
--resolvePackageJsonImports forces TypeScript to consult the imports field of package.json files when performing a lookup that starts with # from a file whose ancestor directory contains a package.json.

This option defaults to true under the node16, nodenext, and bundler options for --moduleResolution.

Default:
true when moduleResolution is node16, nodenext, or bundler; otherwise false
Related:
moduleResolution
customConditions
resolvePackageJsonExports
Released:
5.0

#

rewriteRelativeImportExtensions -
rewriteRelativeImportExtensions
Rewrite .ts, .tsx, .mts, and .cts file extensions in relative import paths to their JavaScript equivalent in output files.

For more information, see the TypeScript 5.7 release notes.

Released:
5.7

#

Root Dir -
rootDir
Default: The longest common path of all non-declaration input files. If composite is set, the default is instead the directory containing the tsconfig.json file.

When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory.

For example, let’s say you have some input files:

MyProj
├── tsconfig.json
├── core
│ ├── a.ts
│ ├── b.ts
│ ├── sub
│ │ ├── c.ts
├── types.d.ts
The inferred value for rootDir is the longest common path of all non-declaration input files, which in this case is core/.

If your outDir was dist, TypeScript would write this tree:

MyProj
├── dist
│ ├── a.js
│ ├── b.js
│ ├── sub
│ │ ├── c.js
However, you may have intended for core to be part of the output directory structure. By setting rootDir: "." in tsconfig.json, TypeScript would write this tree:

MyProj
├── dist
│ ├── core
│ │ ├── a.js
│ │ ├── b.js
│ │ ├── sub
│ │ │ ├── c.js
Importantly, rootDir does not affect which files become part of the compilation. It has no interaction with the include, exclude, or files tsconfig.json settings.

Note that TypeScript will never write an output file to a directory outside of outDir, and will never skip emitting a file. For this reason, rootDir also enforces that all files which need to be emitted are underneath the rootDir path.

For example, let’s say you had this tree:

MyProj
├── tsconfig.json
├── core
│ ├── a.ts
│ ├── b.ts
├── helpers.ts
It would be an error to specify rootDir as core and include as \* because it creates a file (helpers.ts) that would need to be emitted outside the outDir (i.e. ../helpers.js).

Default:
Computed from the list of input files.
Released:
1.5

#

Root Dirs -
rootDirs
Using rootDirs, you can inform the compiler that there are many “virtual” directories acting as a single root. This allows the compiler to resolve relative module imports within these “virtual” directories, as if they were merged in to one directory.

For example:

src
└── views
└── view1.ts (can import "./template1", "./view2`)
     └── view2.ts (can import "./template1", "./view1`)
generated
└── templates
└── views
└── template1.ts (can import "./view1", "./view2")
{
"compilerOptions": {
"rootDirs": ["src/views", "generated/templates/views"]
}
}
This does not affect how TypeScript emits JavaScript, it only emulates the assumption that they will be able to work via those relative paths at runtime.

rootDirs can be used to provide a separate “type layer” to files that are not TypeScript or JavaScript by providing a home for generated .d.ts files in another folder. This technique is useful for bundled applications where you use import of files that aren’t necessarily code:

src
└── index.ts
└── css
└── main.css
└── navigation.css
generated
└── css
└── main.css.d.ts
└── navigation.css.d.ts
{
"compilerOptions": {
"rootDirs": ["src", "generated"]
}
}
This technique lets you generate types ahead of time for the non-code source files. Imports then work naturally based off the source file’s location. For example ./src/index.ts can import the file ./src/css/main.css and TypeScript will be aware of the bundler’s behavior for that filetype via the corresponding generated declaration file.

// @filename: index.ts
import { appClass } from "./main.css";
Try
Default:
Computed from the list of input files.
Released:
2.0

#

Type Roots -
typeRoots
By default all visible ”@types” packages are included in your compilation. Packages in node_modules/@types of any enclosing folder are considered visible. For example, that means packages within ./node_modules/@types/, ../node_modules/@types/, ../../node_modules/@types/, and so on.

If typeRoots is specified, only packages under typeRoots will be included. For example:

{
"compilerOptions": {
"typeRoots": ["./typings", "./vendor/types"]
}
}
This config file will include all packages under ./typings and ./vendor/types, and no packages from ./node_modules/@types. All paths are relative to the tsconfig.json.

Related:
types
Released:
2.0

#

Types -
types
By default all visible ”@types” packages are included in your compilation. Packages in node_modules/@types of any enclosing folder are considered visible. For example, that means packages within ./node_modules/@types/, ../node_modules/@types/, ../../node_modules/@types/, and so on.

If types is specified, only packages listed will be included in the global scope. For instance:

{
"compilerOptions": {
"types": ["node", "jest", "express"]
}
}
This tsconfig.json file will only include ./node_modules/@types/node, ./node_modules/@types/jest and ./node_modules/@types/express. Other packages under node_modules/@types/\* will not be included.

What does this affect?
This option does not affect how @types/\* are included in your application code, for example if you had the above compilerOptions example with code like:

import \* as moment from "moment";
moment().format("MMMM Do YYYY, h:mm:ss a");
The moment import would be fully typed.

When you have this option set, by not including a module in the types array it:

Will not add globals to your project (e.g process in node, or expect in Jest)
Will not have exports appear as auto-import recommendations
This feature differs from typeRoots in that it is about specifying only the exact types you want included, whereas typeRoots supports saying you want particular folders.

Related:
typeRoots
Released:
2.0

#

Emit

#

Declaration -
declaration
Generate .d.ts files for every TypeScript or JavaScript file inside your project. These .d.ts files are type definition files which describe the external API of your module. With .d.ts files, tools like TypeScript can provide intellisense and accurate types for un-typed code.

When declaration is set to true, running the compiler with this TypeScript code:

export let helloWorld = "hi";
Try
Will generate an index.js file like this:

export let helloWorld = "hi";

Try
With a corresponding helloWorld.d.ts:

export declare let helloWorld: string;

Try
When working with .d.ts files for JavaScript files you may want to use emitDeclarationOnly or use outDir to ensure that the JavaScript files are not overwritten.

Default:
true if composite; false otherwise.
Related:
declarationDir
emitDeclarationOnly
Released:
1.0

#

Declaration Dir -
declarationDir
Offers a way to configure the root directory for where declaration files are emitted.

example
├── index.ts
├── package.json
└── tsconfig.json
with this tsconfig.json:

{
"compilerOptions": {
"declaration": true,
"declarationDir": "./types"
}
}
Would place the d.ts for the index.ts in a types folder:

example
├── index.js
├── index.ts
├── package.json
├── tsconfig.json
└── types
└── index.d.ts
Related:
declaration
Released:
2.0

#

Declaration Map -
declarationMap
Generates a source map for .d.ts files which map back to the original .ts source file. This will allow editors such as VS Code to go to the original .ts file when using features like Go to Definition.

You should strongly consider turning this on if you’re using project references.

Released:
2.9

#

Downlevel Iteration -
downlevelIteration
Downleveling is TypeScript’s term for transpiling to an older version of JavaScript. This flag is to enable support for a more accurate implementation of how modern JavaScript iterates through new concepts in older JavaScript runtimes.

ECMAScript 6 added several new iteration primitives: the for / of loop (for (el of arr)), Array spread ([a, ...b]), argument spread (fn(...args)), and Symbol.iterator. downlevelIteration allows for these iteration primitives to be used more accurately in ES5 environments if a Symbol.iterator implementation is present.

Example: Effects on for / of
With this TypeScript code:

const str = "Hello!";
for (const s of str) {
console.log(s);
}
Try
Without downlevelIteration enabled, a for / of loop on any object is downleveled to a traditional for loop:

"use strict";
var str = "Hello!";
for (var \_i = 0, str_1 = str; \_i < str_1.length; \_i++) {
var s = str_1[_i];
console.log(s);
}

Try
This is often what people expect, but it’s not 100% compliant with ECMAScript iteration protocol. Certain strings, such as emoji (😜), have a .length of 2 (or even more!), but should iterate as 1 unit in a for-of loop. See this blog post by Jonathan New for a longer explanation.

When downlevelIteration is enabled, TypeScript will use a helper function that checks for a Symbol.iterator implementation (either native or polyfill). If this implementation is missing, you’ll fall back to index-based iteration.

"use strict";
var **values = (this && this.**values) || function(o) {
var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
if (m) return m.call(o);
if (o && typeof o.length === "number") return {
next: function () {
if (o && i >= o.length) o = void 0;
return { value: o && o[i++], done: !o };
}
};
throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, \_a;
var str = "Hello!";
try {
for (var str_1 = \_\_values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
var s = str_1_1.value;
console.log(s);
}
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
try {
if (str_1_1 && !str_1_1.done && (\_a = str_1.return)) \_a.call(str_1);
}
finally { if (e_1) throw e_1.error; }
}

Try
You can use tslib via importHelpers to reduce the amount of inline JavaScript too:

"use strict";
var **values = (this && this.**values) || function(o) {
var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
if (m) return m.call(o);
if (o && typeof o.length === "number") return {
next: function () {
if (o && i >= o.length) o = void 0;
return { value: o && o[i++], done: !o };
}
};
throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, \_a;
var str = "Hello!";
try {
for (var str_1 = \_\_values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
var s = str_1_1.value;
console.log(s);
}
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
try {
if (str_1_1 && !str_1_1.done && (\_a = str_1.return)) \_a.call(str_1);
}
finally { if (e_1) throw e_1.error; }
}

Try
Note: enabling downlevelIteration does not improve compliance if Symbol.iterator is not present in the runtime.

Example: Effects on Array Spreads
This is an array spread:

// Make a new array whose elements are 1 followed by the elements of arr2
const arr = [1, ...arr2];
Based on the description, it sounds easy to downlevel to ES5:

// The same, right?
const arr = [1].concat(arr2);
However, this is observably different in certain rare cases.

For example, if a source array is missing one or more items (contains a hole), the spread syntax will replace each empty item with undefined, whereas .concat will leave them intact.

// Make an array where the element at index 1 is missing
let arrayWithHole = ["a", , "c"];
let spread = [...arrayWithHole];
let concatenated = [].concat(arrayWithHole);
console.log(arrayWithHole);
// [ 'a', <1 empty item>, 'c' ]
console.log(spread);
// [ 'a', undefined, 'c' ]
console.log(concatenated);
// [ 'a', <1 empty item>, 'c' ]
Just as with for / of, downlevelIteration will use Symbol.iterator (if present) to more accurately emulate ES 6 behavior.

Related:
importHelpers
Released:
2.3

#

Emit BOM -
emitBOM
Controls whether TypeScript will emit a byte order mark (BOM) when writing output files. Some runtime environments require a BOM to correctly interpret a JavaScript files; others require that it is not present. The default value of false is generally best unless you have a reason to change it.

Released:
1.0

#

Emit Declaration Only -
emitDeclarationOnly
Only emit .d.ts files; do not emit .js files.

This setting is useful in two cases:

You are using a transpiler other than TypeScript to generate your JavaScript.
You are using TypeScript to only generate d.ts files for your consumers.
Related:
declaration
Released:
2.8

#

Import Helpers -
importHelpers
For certain downleveling operations, TypeScript uses some helper code for operations like extending class, spreading arrays or objects, and async operations. By default, these helpers are inserted into files which use them. This can result in code duplication if the same helper is used in many different modules.

If the importHelpers flag is on, these helper functions are instead imported from the tslib module. You will need to ensure that the tslib module is able to be imported at runtime. This only affects modules; global script files will not attempt to import modules.

For example, with this TypeScript:

export function fn(arr: number[]) {
const arr2 = [1, ...arr];
}
Turning on downlevelIteration and importHelpers is still false:

var **read = (this && this.**read) || function (o, n) {
var m = typeof Symbol === "function" && o[Symbol.iterator];
if (!m) return o;
var i = m.call(o), r, ar = [], e;
try {
while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
}
catch (error) { e = { error: error }; }
finally {
try {
if (r && !r.done && (m = i["return"])) m.call(i);
}
finally { if (e) throw e.error; }
}
return ar;
};
var **spreadArray = (this && this.**spreadArray) || function (to, from, pack) {
if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
if (ar || !(i in from)) {
if (!ar) ar = Array.prototype.slice.call(from, 0, i);
ar[i] = from[i];
}
}
return to.concat(ar || Array.prototype.slice.call(from));
};
export function fn(arr) {
var arr2 = **spreadArray([1], **read(arr), false);
}

Try
Then turning on both downlevelIteration and importHelpers:

import { **read, **spreadArray } from "tslib";
export function fn(arr) {
var arr2 = **spreadArray([1], **read(arr), false);
}

Try
You can use noEmitHelpers when you provide your own implementations of these functions.

Related:
noEmitHelpers
downlevelIteration
Released:
2.1

#

Inline Source Map -
inlineSourceMap
When set, instead of writing out a .js.map file to provide source maps, TypeScript will embed the source map content in the .js files. Although this results in larger JS files, it can be convenient in some scenarios. For example, you might want to debug JS files on a webserver that doesn’t allow .map files to be served.

Mutually exclusive with sourceMap.

For example, with this TypeScript:

const helloWorld = "hi";
console.log(helloWorld);
Converts to this JavaScript:

"use strict";
const helloWorld = "hi";
console.log(helloWorld);

Try
Then enable building it with inlineSourceMap enabled there is a comment at the bottom of the file which includes a source-map for the file.

"use strict";
const helloWorld = "hi";
console.log(helloWorld);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMifQ==
Try
Released:
1.5

#

Inline Sources -
inlineSources
When set, TypeScript will include the original content of the .ts file as an embedded string in the source map (using the source map’s sourcesContent property). This is often useful in the same cases as inlineSourceMap.

Requires either sourceMap or inlineSourceMap to be set.

For example, with this TypeScript:

const helloWorld = "hi";
console.log(helloWorld);
Try
By default converts to this JavaScript:

"use strict";
const helloWorld = "hi";
console.log(helloWorld);

Try
Then enable building it with inlineSources and inlineSourceMap enabled there is a comment at the bottom of the file which includes a source-map for the file. Note that the end is different from the example in inlineSourceMap because the source-map now contains the original source code also.

"use strict";
const helloWorld = "hi";
console.log(helloWorld);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoZWxsb1dvcmxkID0gXCJoaVwiO1xuY29uc29sZS5sb2coaGVsbG9Xb3JsZCk7Il19
Try
Released:
1.5

#

Map Root -
mapRoot
Specify the location where debugger should locate map files instead of generated locations. This string is treated verbatim inside the source-map, for example:

{
"compilerOptions": {
"sourceMap": true,
"mapRoot": "https://my-website.com/debug/sourcemaps/"
}
}
Would declare that index.js will have sourcemaps at https://my-website.com/debug/sourcemaps/index.js.map.

Released:
1.0

#

New Line -
newLine
Specify the end of line sequence to be used when emitting files: ‘CRLF’ (dos) or ‘LF’ (unix).

Default:
lf
Allowed:
crlf
lf
Released:
1.5

#

No Emit -
noEmit
Do not emit compiler output files like JavaScript source code, source-maps or declarations.

This makes room for another tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment.

You can then use TypeScript as a tool for providing editor integration, and as a source code type-checker.

Released:
1.5
