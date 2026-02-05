#

No Emit Helpers -
noEmitHelpers
Instead of importing helpers with importHelpers, you can provide implementations in the global scope for the helpers you use and completely turn off emitting of helper functions.

For example, using this async function in ES5 requires a await-like function and generator-like function to run:

const getAPI = async (url: string) => {
// Get API
return {};
};
Try
Which creates quite a lot of JavaScript:

"use strict";
var **awaiter = (this && this.**awaiter) || function (thisArg, _arguments, P, generator) {
function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, \_arguments || [])).next());
});
};
var **generator = (this && this.**generator) || function (thisArg, body) {
var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
function verb(n) { return function (v) { return step([n, v]); }; }
function step(op) {
if (f) throw new TypeError("Generator is already executing.");
while (g && (g = 0, op[0] && (_ = 0)), _) try {
if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
if (y = 0, t) op = [op[0] & 2, t.value];
switch (op[0]) {
case 0: case 1: t = op; break;
case 4: _.label++; return { value: op[1], done: false };
case 5: _.label++; y = op[1]; op = [0]; continue;
case 7: op = _.ops.pop(); _.trys.pop(); continue;
default:
if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
if (t[2]) _.ops.pop();
_.trys.pop(); continue;
}
op = body.call(thisArg, \_);
} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
}
};
var getAPI = function (url) { return **awaiter(void 0, void 0, void 0, function () {
return **generator(this, function (\_a) {
// Get API
return [2 /*return*/, {}];
});
}); };

Try
Which can be switched out with your own globals via this flag:

"use strict";
var getAPI = function (url) { return **awaiter(void 0, void 0, void 0, function () {
return **generator(this, function (\_a) {
// Get API
return [2 /*return*/, {}];
});
}); };

Try
Related:
importHelpers
Released:
1.5

#

No Emit On Error -
noEmitOnError
Do not emit compiler output files like JavaScript source code, source-maps or declarations if any errors were reported.

This defaults to false, making it easier to work with TypeScript in a watch-like environment where you may want to see results of changes to your code in another environment before making sure all errors are resolved.

Released:
1.4

#

Out Dir -
outDir
If specified, .js (as well as .d.ts, .js.map, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved; see rootDir if the computed root is not what you intended.

If not specified, .js files will be emitted in the same directory as the .ts files they were generated from:

$ tsc
example
├── index.js
└── index.ts
With a tsconfig.json like this:

{
"compilerOptions": {
"outDir": "dist"
}
}
Running tsc with these settings moves the files into the specified dist folder:

$ tsc
example
├── dist
│ └── index.js
├── index.ts
└── tsconfig.json
Related:
out
outFile
Released:
1.0

#

Out File -
outFile
If specified, all global (non-module) files will be concatenated into the single output file specified.

If module is system or amd, all module files will also be concatenated into this file after all global content.

Note: outFile cannot be used unless module is None, System, or AMD. This option cannot be used to bundle CommonJS or ES6 modules.

Related:
out
outDir
Released:
1.6

#

Preserve Const Enums -
preserveConstEnums
Do not erase const enum declarations in generated code. const enums provide a way to reduce the overall memory footprint of your application at runtime by emitting the enum value instead of a reference.

For example with this TypeScript:

const enum Album {
JimmyEatWorldFutures = 1,
TubRingZooHypothesis = 2,
DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures;
if (selectedAlbum === Album.JimmyEatWorldFutures) {
console.log("That is a great choice.");
}
Try
The default const enum behavior is to convert any Album.Something to the corresponding number literal, and to remove a reference to the enum from the JavaScript completely.

"use strict";
const selectedAlbum = 1 /_ Album.JimmyEatWorldFutures _/;
if (selectedAlbum === 1 /_ Album.JimmyEatWorldFutures _/) {
console.log("That is a great choice.");
}

Try
With preserveConstEnums set to true, the enum exists at runtime and the numbers are still emitted.

"use strict";
var Album;
(function (Album) {
Album[Album["JimmyEatWorldFutures"] = 1] = "JimmyEatWorldFutures";
Album[Album["TubRingZooHypothesis"] = 2] = "TubRingZooHypothesis";
Album[Album["DogFashionDiscoAdultery"] = 3] = "DogFashionDiscoAdultery";
})(Album || (Album = {}));
const selectedAlbum = 1 /_ Album.JimmyEatWorldFutures _/;
if (selectedAlbum === 1 /_ Album.JimmyEatWorldFutures _/) {
console.log("That is a great choice.");
}

Try
This essentially makes such const enums a source-code feature only, with no runtime traces.

Default:
true if isolatedModules; false otherwise.
Released:
1.4

#

Remove Comments -
removeComments
Strips all comments from TypeScript files when converting into JavaScript. Defaults to false.

For example, this is a TypeScript file which has a JSDoc comment:

/\*_ The translation of 'Hello world' into Portuguese _/
export const helloWorldPTBR = "Olá Mundo";
When removeComments is set to true:

export const helloWorldPTBR = "Olá Mundo";

Try
Without setting removeComments or having it as false:

/\*_ The translation of 'Hello world' into Portuguese _/
export const helloWorldPTBR = "Olá Mundo";

Try
This means that your comments will show up in the JavaScript code.

Released:
1.0

#

Source Map -
sourceMap
Enables the generation of sourcemap files. These files allow debuggers and other tools to display the original TypeScript source code when actually working with the emitted JavaScript files. Source map files are emitted as .js.map (or .jsx.map) files next to the corresponding .js output file.

The .js files will in turn contain a sourcemap comment to indicate where the files are to external tools, for example:

// helloWorld.ts
export declare const helloWorld = "hi";
Compiling with sourceMap set to true creates the following JavaScript file:

// helloWorld.js
"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
exports.helloWorld = "hi";
//# sourceMappingURL=// helloWorld.js.map
And this also generates this json map:

// helloWorld.js.map
{
"version": 3,
"file": "ex.js",
"sourceRoot": "",
"sources": ["../ex.ts"],
"names": [],
"mappings": ";;AAAa,QAAA,UAAU,GAAG,IAAI,CAAA"
}
Released:
1.0

#

Source Root -
sourceRoot
Specify the location where a debugger should locate TypeScript files instead of relative source locations. This string is treated verbatim inside the source-map where you can use a path or a URL:

{
"compilerOptions": {
"sourceMap": true,
"sourceRoot": "https://my-website.com/debug/source/"
}
}
Would declare that index.js will have a source file at https://my-website.com/debug/source/index.ts.

Released:
1.0

#

Strip Internal -
stripInternal
Do not emit declarations for code that has an @internal annotation in its JSDoc comment. This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid. If you are searching for a tool to handle additional levels of visibility within your d.ts files, look at api-extractor.

/\*\*

- Days available in a week
- @internal
  \*/
  export const daysInAWeek = 7;

/\*_ Calculate how much someone earns in a week _/
export function weeklySalary(dayRate: number) {
return daysInAWeek \* dayRate;
}
Try
With the flag set to false (default):

/\*\*

- Days available in a week
- @internal
  _/
  export declare const daysInAWeek = 7;
  /\*\* Calculate how much someone earns in a week _/
  export declare function weeklySalary(dayRate: number): number;

Try
With stripInternal set to true the d.ts emitted will be redacted.

/\*_ Calculate how much someone earns in a week _/
export declare function weeklySalary(dayRate: number): number;

Try
The JavaScript output is still the same.

Internal
Released:
1.5

#

JavaScript Support

#

Allow JS -
allowJs
Allow JavaScript files to be imported inside your project, instead of just .ts and .tsx files. For example, this JS file:

// @filename: card.js
export const defaultCardDeck = "Heart";
Try
When imported into a TypeScript file will raise an error:

// @filename: index.ts
import { defaultCardDeck } from "./card";

console.log(defaultCardDeck);
Try
Imports fine with allowJs enabled:

// @filename: index.ts
import { defaultCardDeck } from "./card";

console.log(defaultCardDeck);
Try
This flag can be used as a way to incrementally add TypeScript files into JS projects by allowing the .ts and .tsx files to live along-side existing JavaScript files.

It can also be used along-side declaration and emitDeclarationOnly to create declarations for JS files.

Related:
checkJs
emitDeclarationOnly
Released:
1.8

#

Check JS -
checkJs
Works in tandem with allowJs. When checkJs is enabled then errors are reported in JavaScript files. This is the equivalent of including // @ts-check at the top of all JavaScript files which are included in your project.

For example, this is incorrect JavaScript according to the parseFloat type definition which comes with TypeScript:

// parseFloat only takes a string
module.exports.pi = parseFloat(3.142);
When imported into a TypeScript module:

// @filename: constants.js
module.exports.pi = parseFloat(3.142);

// @filename: index.ts
import { pi } from "./constants";
console.log(pi);
Try
You will not get any errors. However, if you turn on checkJs then you will get error messages from the JavaScript file.

// @filename: constants.js
module.exports.pi = parseFloat(3.142);
Argument of type 'number' is not assignable to parameter of type 'string'.

// @filename: index.ts
import { pi } from "./constants";
console.log(pi);
Try
Related:
allowJs
emitDeclarationOnly
Released:
2.3

#

Max Node Module JS Depth -
maxNodeModuleJsDepth
The maximum dependency depth to search under node_modules and load JavaScript files.

This flag can only be used when allowJs is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your node_modules.

Ideally this should stay at 0 (the default), and d.ts files should be used to explicitly define the shape of modules. However, there are cases where you may want to turn this on at the expense of speed and potential accuracy.

Released:
2.0

#

Editor Support

#

Disable Size Limit -
disableSizeLimit
To avoid a possible memory bloat issues when working with very large JavaScript projects, there is an upper limit to the amount of memory TypeScript will allocate. Turning this flag on will remove the limit.

Released:
2.0

#

Plugins -
plugins
List of language service plugins to run inside the editor.

Language service plugins are a way to provide additional information to a user based on existing TypeScript files. They can enhance existing messages between TypeScript and an editor, or to provide their own error messages.

For example:

ts-sql-plugin — Adds SQL linting with a template strings SQL builder.
typescript-styled-plugin — Provides CSS linting inside template strings .
typescript-eslint-language-service — Provides eslint error messaging and fix-its inside the compiler’s output.
ts-graphql-plugin — Provides validation and auto-completion inside GraphQL query template strings.
VS Code has the ability for a extension to automatically include language service plugins, and so you may have some running in your editor without needing to define them in your tsconfig.json.

Released:
2.2

#

Interop Constraints

#

Allow Synthetic Default Imports -
allowSyntheticDefaultImports
When set to true, allowSyntheticDefaultImports allows you to write an import like:

import React from "react";
instead of:

import \* as React from "react";
When the module does not explicitly specify a default export.

For example, without allowSyntheticDefaultImports as true:

// @filename: utilFunctions.js
const getStringLength = (str) => str.length;

module.exports = {
getStringLength,
};

// @filename: index.ts
import utils from "./utilFunctions";
Module '"/home/runner/work/TypeScript-Website/TypeScript-Website/packages/typescriptlang-org/utilFunctions"' has no default export.

const count = utils.getStringLength("Check JS");
Try
This code raises an error because there isn’t a default object which you can import. Even though it feels like it should. For convenience, transpilers like Babel will automatically create a default if one isn’t created. Making the module look a bit more like:

// @filename: utilFunctions.js
const getStringLength = (str) => str.length;
const allFunctions = {
getStringLength,
};
module.exports = allFunctions;
module.exports.default = allFunctions;
This flag does not affect the JavaScript emitted by TypeScript, it’s only for the type checking. This option brings the behavior of TypeScript in-line with Babel, where extra code is emitted to make using a default export of a module more ergonomic.

Default:
true if esModuleInterop is enabled, module is system, or moduleResolution is bundler; false otherwise.
Related:
esModuleInterop
Released:
1.8

#

Erasable Syntax Only -
erasableSyntaxOnly
Node.js supports running TypeScript files directly as of v23.6; however, only TypeScript-specific syntax that does not have runtime semantics are supported under this mode. In other words, it must be possible to easily erase any TypeScript-specific syntax from a file, leaving behind a valid JavaScript file.

That means the following constructs are not supported:

enum declarations
namespaces and modules with runtime code
parameter properties in classes
Non-ECMAScript import = and export = assignments
<prefix>-style type assertions
// ❌ error: An `import ... = require(...)` alias
import foo = require("foo");
// ❌ error: A namespace with runtime code.
namespace container {
foo.method();
export type Bar = string;
}
// ❌ error: An `import =` alias
import Bar = container.Bar;
class Point {
// ❌ error: Parameter properties
constructor(public x: number, public y: number) {}
}
// ❌ error: An `export =` assignment.
export = Point;
// ❌ error: An enum declaration.
enum Direction {
Up,
Down,
Left,
Right,
}
// ❌ error: <prefix>-style type assertion.
const num = <number>1;
Similar tools like ts-blank-space or Amaro (the underlying library for type-stripping in Node.js) have the same limitations. These tools will provide helpful error messages if they encounter code that doesn’t meet these requirements, but you still won’t find out your code doesn’t work until you actually try to run it.

The --erasableSyntaxOnly flag will cause TypeScript to error on most TypeScript-specific constructs that have runtime behavior.

class C {
constructor(public x: number) { }
// ~~~~~~~~~~~~~~~~
// error! This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
}
}
Typically, you will want to combine this flag with the --verbatimModuleSyntax, which ensures that a module contains the appropriate import syntax, and that import elision does not take place.

#

ES Module Interop -
esModuleInterop
By default (with esModuleInterop false or not set) TypeScript treats CommonJS/AMD/UMD modules similar to ES6 modules. In doing this, there are two parts in particular which turned out to be flawed assumptions:

a namespace import like import \* as moment from "moment" acts the same as const moment = require("moment")

a default import like import moment from "moment" acts the same as const moment = require("moment").default

This mis-match causes these two issues:

the ES6 modules spec states that a namespace import (import \* as x) can only be an object, by having TypeScript treating it the same as = require("x") then TypeScript allowed for the import to be treated as a function and be callable. That’s not valid according to the spec.

while accurate to the ES6 modules spec, most libraries with CommonJS/AMD/UMD modules didn’t conform as strictly as TypeScript’s implementation.

Turning on esModuleInterop will fix both of these problems in the code transpiled by TypeScript. The first changes the behavior in the compiler, the second is fixed by two new helper functions which provide a shim to ensure compatibility in the emitted JavaScript:

import \* as fs from "fs";
import _ from "lodash";
fs.readFileSync("file.txt", "utf8");
_.chunk(["a", "b", "c", "d"], 2);
With esModuleInterop disabled:

"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
const fs = require("fs");
const lodash_1 = require("lodash");
fs.readFileSync("file.txt", "utf8");
lodash_1.default.chunk(["a", "b", "c", "d"], 2);

Try
With esModuleInterop set to true:

"use strict";
var **createBinding = (this && this.**createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.**esModule : desc.writable || desc.configurable)) {
desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var **setModuleDefault = (this && this.**setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var **importStar = (this && this.**importStar) || (function () {
var ownKeys = function(o) {
ownKeys = Object.getOwnPropertyNames || function (o) {
var ar = [];
for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
return ar;
};
return ownKeys(o);
};
return function (mod) {
if (mod && mod.**esModule) return mod;
var result = {};
if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") **createBinding(result, mod, k[i]);
**setModuleDefault(result, mod);
return result;
};
})();
var **importDefault = (this && this.**importDefault) || function (mod) {
return (mod && mod.**esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "**esModule", { value: true });
const fs = **importStar(require("fs"));
const lodash_1 = **importDefault(require("lodash"));
fs.readFileSync("file.txt", "utf8");
lodash_1.default.chunk(["a", "b", "c", "d"], 2);

Try
Note: The namespace import import \* as fs from "fs" only accounts for properties which are owned (basically properties set on the object and not via the prototype chain) on the imported object. If the module you’re importing defines its API using inherited properties, you need to use the default import form (import fs from "fs"), or disable esModuleInterop.

Note: You can make JS emit terser by enabling importHelpers:

"use strict";
Object.defineProperty(exports, "**esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.**importStar(require("fs"));
const lodash_1 = tslib_1.\_\_importDefault(require("lodash"));
fs.readFileSync("file.txt", "utf8");
lodash_1.default.chunk(["a", "b", "c", "d"], 2);

Try
Enabling esModuleInterop will also enable allowSyntheticDefaultImports.

Recommended
Default:
true if module is node16, nodenext, or preserve; false otherwise.
Related:
allowSyntheticDefaultImports
Released:
2.7

#

Force Consistent Casing In File Names -
forceConsistentCasingInFileNames
TypeScript follows the case sensitivity rules of the file system it’s running on. This can be problematic if some developers are working in a case-sensitive file system and others aren’t. If a file attempts to import fileManager.ts by specifying ./FileManager.ts the file will be found in a case-insensitive file system, but not on a case-sensitive file system.

When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.

Recommended
Default:
true
Released:
1.8

#

isolatedDeclarations -
isolatedDeclarations
Require sufficient annotation on exports so other tools can trivially generate declaration files.
For more information, see the 5.5 release notes

Released:
5.5

#

Isolated Modules -
isolatedModules
While you can use TypeScript to produce JavaScript code from TypeScript code, it’s also common to use other transpilers such as Babel to do this. However, other transpilers only operate on a single file at a time, which means they can’t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript’s ts.transpileModule API which is used by some build tools.

These limitations can cause runtime problems with some TypeScript features like const enums and namespaces. Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can’t be correctly interpreted by a single-file transpilation process.

It does not change the behavior of your code, or otherwise change the behavior of TypeScript’s checking and emitting process.

Some examples of code which does not work when isolatedModules is enabled.

Exports of Non-Value Identifiers
In TypeScript, you can import a type and then subsequently export it:

import { someType, someFunction } from "someModule";

someFunction();

export { someType, someFunction };
Try
Because there’s no value for someType, the emitted export will not try to export it (this would be a runtime error in JavaScript):

export { someFunction };
Single-file transpilers don’t know whether someType produces a value or not, so it’s an error to export a name that only refers to a type.

Non-Module Files
If isolatedModules is set, namespaces are only allowed in modules (which means it has some form of import/export). An error occurs if a namespace is found in a non-module file:

namespace Instantiated {
Namespaces are not allowed in global script files when 'isolatedModules' is enabled. If this file is not intended to be a global script, set 'moduleDetection' to 'force' or add an empty 'export {}' statement.
export const x = 1;
}
Try
This restriction doesn’t apply to .d.ts files.

References to const enum members
In TypeScript, when you reference a const enum member, the reference is replaced by its actual value in the emitted JavaScript. Changing this TypeScript:

declare const enum Numbers {
Zero = 0,
One = 1,
}
console.log(Numbers.Zero + Numbers.One);
Try
To this JavaScript:

"use strict";
console.log(0 + 1);

Try
Without knowledge of the values of these members, other transpilers can’t replace the references to Numbers, which would be a runtime error if left alone (since there are no Numbers object at runtime). Because of this, when isolatedModules is set, it is an error to reference an ambient const enum member.

Default:
true if verbatimModuleSyntax; false otherwise.
Released:
1.5

#

Preserve Symlinks -
preserveSymlinks
This is to reflect the same flag in Node.js; which does not resolve the real path of symlinks.

This flag also exhibits the opposite behavior to Webpack’s resolve.symlinks option (i.e. setting TypeScript’s preserveSymlinks to true parallels setting Webpack’s resolve.symlinks to false, and vice-versa).

With this enabled, references to modules and packages (e.g. imports and /// <reference type="..." /> directives) are all resolved relative to the location of the symbolic link file, rather than relative to the path that the symbolic link resolves to.

Released:
2.5

#

Verbatim Module Syntax -
verbatimModuleSyntax
By default, TypeScript does something called import elision. Basically, if you write something like

import { Car } from "./car";
export function drive(car: Car) {
// ...
}
TypeScript detects that you’re only using an import for types and drops the import entirely. Your output JavaScript might look something like this:

export function drive(car) {
// ...
}
Most of the time this is good, because if Car isn’t a value that’s exported from ./car, we’ll get a runtime error.

But it does add a layer of complexity for certain edge cases. For example, notice there’s no statement like import "./car"; - the import was dropped entirely. That actually makes a difference for modules that have side-effects or not.

TypeScript’s emit strategy for JavaScript also has another few layers of complexity - import elision isn’t always just driven by how an import is used - it often consults how a value is declared as well. So it’s not always clear whether code like the following

export { Car } from "./car";
should be preserved or dropped. If Car is declared with something like a class, then it can be preserved in the resulting JavaScript file. But if Car is only declared as a type alias or interface, then the JavaScript file shouldn’t export Car at all.

While TypeScript might be able to make these emit decisions based on information from across files, not every compiler can.

The type modifier on imports and exports helps with these situations a bit. We can make it explicit whether an import or export is only being used for type analysis, and can be dropped entirely in JavaScript files by using the type modifier.

// This statement can be dropped entirely in JS output
import type \* as car from "./car";
// The named import/export 'Car' can be dropped in JS output
import { type Car } from "./car";
export { type Car } from "./car";
type modifiers are not quite useful on their own - by default, module elision will still drop imports, and nothing forces you to make the distinction between type and plain imports and exports. So TypeScript has the flag --importsNotUsedAsValues to make sure you use the type modifier, --preserveValueImports to prevent some module elision behavior, and --isolatedModules to make sure that your TypeScript code works across different compilers. Unfortunately, understanding the fine details of those 3 flags is hard, and there are still some edge cases with unexpected behavior.

TypeScript 5.0 introduces a new option called --verbatimModuleSyntax to simplify the situation. The rules are much simpler - any imports or exports without a type modifier are left around. Anything that uses the type modifier is dropped entirely.

// Erased away entirely.
import type { A } from "a";
// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";
// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
With this new option, what you see is what you get.

That does have some implications when it comes to module interop though. Under this flag, ECMAScript imports and exports won’t be rewritten to require calls when your settings or file extension implied a different module system. Instead, you’ll get an error. If you need to emit code that uses require and module.exports, you’ll have to use TypeScript’s module syntax that predates ES2015:

Input TypeScript Output JavaScript
import foo = require("foo");
const foo = require("foo");
function foo() {}
function bar() {}
function baz() {}
export = {
foo,
bar,
baz,
};
function foo() {}
function bar() {}
function baz() {}
module.exports = {
foo,
bar,
baz,
};
While this is a limitation, it does help make some issues more obvious. For example, it’s very common to forget to set the type field in package.json under --module node16. As a result, developers would start writing CommonJS modules instead of ES modules without realizing it, giving surprising lookup rules and JavaScript output. This new flag ensures that you’re intentional about the file type you’re using because the syntax is intentionally different.

Because --verbatimModuleSyntax provides a more consistent story than --importsNotUsedAsValues and --preserveValueImports, those two existing flags are being deprecated in its favor.

For more details, read up on the original pull request and its proposal issue.

Released:
5.0

#

Backwards Compatibility

#

Charset -
charset
In prior versions of TypeScript, this controlled what encoding was used when reading text files from disk. Today, TypeScript assumes UTF-8 encoding, but will correctly detect UTF-16 (BE and LE) or UTF-8 BOMs.

Deprecated
Default:
utf8
Released:
1.0

#

Imports Not Used As Values -
importsNotUsedAsValues
Deprecated in favor of verbatimModuleSyntax.

This flag controls how import works, there are 3 different options:

remove: The default behavior of dropping import statements which only reference types.

preserve: Preserves all import statements whose values or types are never used. This can cause imports/side-effects to be preserved.

error: This preserves all imports (the same as the preserve option), but will error when a value import is only used as a type. This might be useful if you want to ensure no values are being accidentally imported, but still make side-effect imports explicit.

This flag works because you can use import type to explicitly create an import statement which should never be emitted into JavaScript.

Default:
remove
Allowed:
remove
preserve
error
Related:
preserveValueImports
verbatimModuleSyntax
Released:
3.8

#

Keyof Strings Only -
keyofStringsOnly
This flag changes the keyof type operator to return string instead of string | number when applied to a type with a string index signature.

This flag is used to help people keep this behavior from before TypeScript 2.9’s release.

Deprecated
Released:
2.9

#

No Implicit Use Strict -
noImplicitUseStrict
You shouldn’t need this. By default, when emitting a module file to a non-ES6 target, TypeScript emits a "use strict"; prologue at the top of the file. This setting disables the prologue.

Released:
1.8

#

No Strict Generic Checks -
noStrictGenericChecks
TypeScript will unify type parameters when comparing two generic functions.

type A = <T, U>(x: T, y: U) => [T, U];
type B = <S>(x: S, y: S) => [S, S];

function f(a: A, b: B) {
b = a; // Ok
a = b; // Error
Type 'B' is not assignable to type 'A'.
Types of parameters 'y' and 'y' are incompatible.
Type 'U' is not assignable to type 'T'.
'T' could be instantiated with an arbitrary type which could be unrelated to 'U'.
}
Try
This flag can be used to remove that check.

Released:
2.5

#

Out -
out
Use outFile instead.

The out option computes the final file location in a way that is not predictable or consistent. This option is retained for backward compatibility only and is deprecated.

Deprecated
Related:
outDir
outFile
Released:
1.0

#

Preserve Value Imports -
preserveValueImports
Deprecated in favor of verbatimModuleSyntax.

There are some cases where TypeScript can’t detect that you’re using an import. For example, take the following code:

import { Animal } from "./animal.js";
eval("console.log(new Animal().isDangerous())");
or code using ‘Compiles to HTML’ languages like Svelte or Vue. preserveValueImports will prevent TypeScript from removing the import, even if it appears unused.

When combined with isolatedModules: imported types must be marked as type-only because compilers that process single files at a time have no way of knowing whether imports are values that appear unused, or a type that must be removed in order to avoid a runtime crash.

Related:
isolatedModules
importsNotUsedAsValues
verbatimModuleSyntax
Released:
4.5

#

Suppress Excess Property Errors -
suppressExcessPropertyErrors
This disables reporting of excess property errors, such as the one shown in the following example:

type Point = { x: number; y: number };
const p: Point = { x: 1, y: 3, m: 10 };
Object literal may only specify known properties, and 'm' does not exist in type 'Point'.
Try
This flag was added to help people migrate to the stricter checking of new object literals in TypeScript 1.6.

We don’t recommend using this flag in a modern codebase, you can suppress one-off cases where you need it using // @ts-ignore.

Released:
1.6

#

Suppress Implicit Any Index Errors -
suppressImplicitAnyIndexErrors
Turning suppressImplicitAnyIndexErrors on suppresses reporting the error about implicit anys when indexing into objects, as shown in the following example:

const obj = { x: 10 };
console.log(obj["foo"]);
Element implicitly has an 'any' type because expression of type '"foo"' can't be used to index type '{ x: number; }'.
Property 'foo' does not exist on type '{ x: number; }'.
Try
Using suppressImplicitAnyIndexErrors is quite a drastic approach. It is recommended to use a @ts-ignore comment instead:

const obj = { x: 10 };
// @ts-ignore
console.log(obj["foo"]);
Try
Related:
noImplicitAny
Released:
1.4

#

Language and Environment

#

Emit Decorator Metadata -
emitDecoratorMetadata
Enables experimental support for emitting type metadata for decorators which works with the module reflect-metadata.

For example, here is the TypeScript

function LogMethod(
target: any,
propertyKey: string | symbol,
descriptor: PropertyDescriptor
) {
console.log(target);
console.log(propertyKey);
console.log(descriptor);
}

class Demo {
@LogMethod
public foo(bar: number) {
// do nothing
}
}

const demo = new Demo();
Try
With emitDecoratorMetadata not set to true (default) the emitted JavaScript is:

"use strict";
var **decorate = (this && this.**decorate) || function (decorators, target, key, desc) {
var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogMethod(target, propertyKey, descriptor) {
console.log(target);
console.log(propertyKey);
console.log(descriptor);
}
class Demo {
foo(bar) {
// do nothing
}
}
\_\_decorate([
LogMethod
], Demo.prototype, "foo", null);
const demo = new Demo();

Try
With emitDecoratorMetadata set to true the emitted JavaScript is:

"use strict";
var **decorate = (this && this.**decorate) || function (decorators, target, key, desc) {
var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var **metadata = (this && this.**metadata) || function (k, v) {
if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function LogMethod(target, propertyKey, descriptor) {
console.log(target);
console.log(propertyKey);
console.log(descriptor);
}
class Demo {
foo(bar) {
// do nothing
}
}
**decorate([
LogMethod,
**metadata("design:type", Function),
**metadata("design:paramtypes", [Number]),
**metadata("design:returntype", void 0)
], Demo.prototype, "foo", null);
const demo = new Demo();

Try
Related:
experimentalDecorators
Released:
1.5

#

Experimental Decorators -
experimentalDecorators
Enables experimental support for decorators, which is a version of decorators that predates the TC39 standardization process.

Decorators are a language feature which hasn’t yet been fully ratified into the JavaScript specification. This means that the implementation version in TypeScript may differ from the implementation in JavaScript when it is decided by TC39.

You can find out more about decorator support in TypeScript in the handbook.

Related:
emitDecoratorMetadata
Released:
1.5

#

JSX -
jsx
Controls how JSX constructs are emitted in JavaScript files. This only affects output of JS files that started in .tsx files.

react-jsx: Emit .js files with the JSX changed to \_jsx calls optimized for production
react-jsxdev: Emit .js files with the JSX changed to \_jsx calls for development only
preserve: Emit .jsx files with the JSX unchanged
react-native: Emit .js files with the JSX unchanged
react: Emit .js files with JSX changed to the equivalent React.createElement calls
For example
This sample code:

export const HelloWorld = () => <h1>Hello world</h1>;
React: "react-jsx"[1]

import { jsx as \_jsx } from "react/jsx-runtime";
export const HelloWorld = () => \_jsx("h1", { children: "Hello world" });

Try
React dev transform: "react-jsxdev"[1]

import { jsxDEV as \_jsxDEV } from "react/jsx-dev-runtime";
const \_jsxFileName = "/home/runner/work/TypeScript-Website/TypeScript-Website/packages/typescriptlang-org/index.tsx";
export const HelloWorld = () => \_jsxDEV("h1", { children: "Hello world" }, void 0, false, { fileName: \_jsxFileName, lineNumber: 9, columnNumber: 32 }, this);

Try
Preserve: "preserve"

import React from 'react';
export const HelloWorld = () => <h1>Hello world</h1>;

Try
React Native: "react-native"

import React from 'react';
export const HelloWorld = () => <h1>Hello world</h1>;

Try
Legacy React runtime: "react"

import React from 'react';
export const HelloWorld = () => React.createElement("h1", null, "Hello world");

Try
This option can be used on a per-file basis too using an @jsxRuntime comment.

Always use the classic runtime ("react") for this file:

/_ @jsxRuntime classic _/
export const HelloWorld = () => <h1>Hello world</h1>;
Always use the automatic runtime ("react-jsx") for this file:

/_ @jsxRuntime automatic _/
export const HelloWorld = () => <h1>Hello world</h1>;
Allowed:
preserve
react
react-native
react-jsx
react-jsxdev
Related:
jsxFactory
jsxFragmentFactory
jsxImportSource
Released:
1.6

#

JSX Factory -
jsxFactory
Changes the function called in .js files when compiling JSX Elements using the classic JSX runtime. The most common change is to use "h" or "preact.h" instead of the default "React.createElement" if using preact.

For example, this TSX file:

import { h } from "preact";
const HelloWorld = () => <div>Hello</div>;
With jsxFactory: "h" looks like:

const preact_1 = require("preact");
const HelloWorld = () => (0, preact_1.h)("div", null, "Hello");

Try
This option can be used on a per-file basis too similar to Babel’s /\*_ @jsx h _/ directive.

/\*_ @jsx h _/
import { h } from "preact";
Cannot find module 'preact' or its corresponding type declarations.

const HelloWorld = () => <div>Hello</div>;
Try
The factory chosen will also affect where the JSX namespace is looked up (for type checking information) before falling back to the global one.

If the factory is defined as React.createElement (the default), the compiler will check for React.JSX before checking for a global JSX. If the factory is defined as h, it will check for h.JSX before a global JSX.

Default:
React.createElement
Allowed:
Any identifier or dotted identifier.
Related:
jsx
jsxFragmentFactory
jsxImportSource
Released:
2.2

#

JSX Fragment Factory -
jsxFragmentFactory
Specify the JSX fragment factory function to use when targeting react JSX emit with jsxFactory compiler option is specified, e.g. Fragment.

For example with this TSConfig:

{
"compilerOptions": {
"target": "esnext",
"module": "commonjs",
"jsx": "react",
"jsxFactory": "h",
"jsxFragmentFactory": "Fragment"
}
}
This TSX file:

import { h, Fragment } from "preact";
const HelloWorld = () => (
<>

<div>Hello</div>
</>
);
Would look like:

const preact_1 = require("preact");
const HelloWorld = () => ((0, preact_1.h)(preact_1.Fragment, null,
(0, preact_1.h)("div", null, "Hello")));

Try
This option can be used on a per-file basis too similar to Babel’s /_ @jsxFrag h _/ directive.

For example:

/** @jsx h \*/
/** @jsxFrag Fragment \*/

import { h, Fragment } from "preact";
Cannot find module 'preact' or its corresponding type declarations.

const HelloWorld = () => (
<>

<div>Hello</div>
</>
);
Try
Default:
React.Fragment
Related:
jsx
jsxFactory
jsxImportSource
Released:
4.0

#

JSX Import Source -
jsxImportSource
Declares the module specifier to be used for importing the jsx and jsxs factory functions when using jsx as "react-jsx" or "react-jsxdev" which were introduced in TypeScript 4.1.

With React 17 the library supports a new form of JSX transformation via a separate import.

For example with this code:

import React from "react";
function App() {
return <h1>Hello World</h1>;
}
Using this TSConfig:

{
"compilerOptions": {
"target": "esnext",
"module": "commonjs",
"jsx": "react-jsx"
}
}
The emitted JavaScript from TypeScript is:

"use strict";
Object.defineProperty(exports, "\_\_esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function App() {
return (0, jsx_runtime_1.jsx)("h1", { children: "Hello World" });
}

Try
For example if you wanted to use "jsxImportSource": "preact", you need a tsconfig like:

{
"compilerOptions": {
"target": "esnext",
"module": "commonjs",
"jsx": "react-jsx",
"jsxImportSource": "preact",
"types": ["preact"]
}
}
Which generates code like:

function App() {
return (0, jsx_runtime_1.jsx)("h1", { children: "Hello World" });
}

Try
Alternatively, you can use a per-file pragma to set this option, for example:

/\*_ @jsxImportSource preact _/
export function App() {
return <h1>Hello World</h1>;
}
Would add preact/jsx-runtime as an import for the \_jsx factory.

Note: In order for this to work like you would expect, your tsx file must include an export or import so that it is considered a module.

Default:
react
Related:
jsx
jsxFactory
Released:
4.1

#

Lib -
lib
TypeScript includes a default set of type definitions for built-in JS APIs (like Math), as well as type definitions for things found in browser environments (like document). TypeScript also includes APIs for newer JS features matching the target you specify; for example the definition for Map is available if target is ES6 or newer.

You may want to change these for a few reasons:

Your program doesn’t run in a browser, so you don’t want the "dom" type definitions
Your runtime platform provides certain JavaScript API objects (maybe through polyfills), but doesn’t yet support the full syntax of a given ECMAScript version
You have polyfills or native implementations for some, but not all, of a higher level ECMAScript version
In TypeScript 4.5, lib files can be overridden by npm modules, find out more in the blog.

High Level libraries
Name Contents
ES5 Core definitions for all ES5 functionality
ES2015 Additional APIs available in ES2015 (also known as ES6) - array.find, Promise, Proxy, Symbol, Map, Set, Reflect, etc.
ES6 Alias for “ES2015”
ES2016 Additional APIs available in ES2016 - array.include, etc.
ES7 Alias for “ES2016”
ES2017 Additional APIs available in ES2017 - Object.entries, Object.values, Atomics, SharedArrayBuffer, date.formatToParts, typed arrays, etc.
ES2018 Additional APIs available in ES2018 - async iterables, promise.finally, Intl.PluralRules, regexp.groups, etc.
ES2019 Additional APIs available in ES2019 - array.flat, array.flatMap, Object.fromEntries, string.trimStart, string.trimEnd, etc.
ES2020 Additional APIs available in ES2020 - string.matchAll, etc.
ES2021 Additional APIs available in ES2021 - promise.any, string.replaceAll etc.
ES2022 Additional APIs available in ES2022 - array.at, RegExp.hasIndices, etc.
ES2023 Additional APIs available in ES2023 - array.with, array.findLast, array.findLastIndex, array.toSorted, array.toReversed, etc.
ESNext Additional APIs available in ESNext - This changes as the JavaScript specification evolves
DOM DOM definitions - window, document, etc.
WebWorker APIs available in WebWorker contexts
ScriptHost APIs for the Windows Script Hosting System
Individual library components
Name
DOM.Iterable
ES2015.Core
ES2015.Collection
ES2015.Generator
ES2015.Iterable
ES2015.Promise
ES2015.Proxy
ES2015.Reflect
ES2015.Symbol
ES2015.Symbol.WellKnown
ES2016.Array.Include
ES2017.object
ES2017.Intl
ES2017.SharedMemory
ES2017.String
ES2017.TypedArrays
ES2018.Intl
ES2018.Promise
ES2018.RegExp
ES2019.Array
ES2019.Object
ES2019.String
ES2019.Symbol
ES2020.String
ES2020.Symbol.wellknown
ES2021.Promise
ES2021.String
ES2021.WeakRef
ESNext.AsyncIterable
ESNext.Array
ESNext.Intl
ESNext.Symbol
This list may be out of date, you can see the full list in the TypeScript source code.

Related:
noLib
Released:
2.0

#

Lib Replacement -
libReplacement
TypeScript 4.5 introduced the possibility of substituting the default lib files with custom ones. All built-in library files would first try to be resolved from packages named @typescript/lib-\*. For example, you could lock your dom libraries onto a specific version of the @types/web package with the following package.json:

{
"devDependencies": {
"@typescript/lib-dom": "npm:@types/web@0.0.199"
}
}
When installed, a package called @typescript/lib-dom should exist, and TypeScript would always look there when searching for lib.dom.d.ts.

The --libReplacement flag allows you to disable this behavior. If you’re not using any @typescript/lib-\* packages, you can now disable those package lookups with --libReplacement false. In the future, --libReplacement false may become the default, so if you currently rely on the behavior you should consider explicitly enabling it with --libReplacement true.

Default:
true

#

Module Detection -
moduleDetection
This setting controls how TypeScript determines whether a file is a script or a module.

There are three choices:

"auto" (default) - TypeScript will not only look for import and export statements, but it will also check whether the "type" field in a package.json is set to "module" when running with module: nodenext or node16, and check whether the current file is a JSX file when running under jsx: react-jsx.

"legacy" - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.

"force" - Ensures that every non-declaration file is treated as a module.

Default:
"auto": Treat files with imports, exports, import.meta, jsx (with jsx: react-jsx), or esm format (with module: node16+) as modules.
Allowed:
legacy
auto
force
Released:
4.7

#

No Lib -
noLib
Disables the automatic inclusion of any library files. If this option is set, lib is ignored.

TypeScript cannot compile anything without a set of interfaces for key primitives like: Array, Boolean, Function, IArguments, Number, Object, RegExp, and String. It is expected that if you use noLib you will be including your own type definitions for these.

Related:
lib
Released:
1.0

#

React Namespace -
reactNamespace
Use jsxFactory instead. Specify the object invoked for createElement when targeting react for TSX files.

Default:
React
Released:
1.8

#

Target -
target
Modern browsers support all ES6 features, so ES6 is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.

The target setting changes which JS features are downleveled and which are left intact. For example, an arrow function () => this will be turned into an equivalent function expression if target is ES5 or lower.

Changing target also changes the default value of lib. You may “mix and match” target and lib settings as desired, but you could just set target for convenience.

For developer platforms like Node there are baselines for the target, depending on the type of platform and its version. You can find a set of community organized TSConfigs at tsconfig/bases, which has configurations for common platforms and their versions.

The special ESNext value refers to the highest version your version of TypeScript supports. This setting should be used with caution, since it doesn’t mean the same thing between different TypeScript versions and can make upgrades less predictable.

Default:
es2023 if module is node20; esnext if module is nodenext; ES5 otherwise.
Allowed:
es3
es5
es6/es2015
es2016
es2017
es2018
es2019
es2020
es2021
es2022
es2023
es2024
esnext
Released:
1.0

#

Use Define For Class Fields -
useDefineForClassFields
This flag is used as part of migrating to the upcoming standard version of class fields. TypeScript introduced class fields many years before it was ratified in TC39. The latest version of the upcoming specification has a different runtime behavior to TypeScript’s implementation but the same syntax.

This flag switches to the upcoming ECMA runtime behavior.

You can read more about the transition in the 3.7 release notes.

Default:
true if target is ES2022 or higher, including ESNext; false otherwise.
Released:
3.7

#

Compiler Diagnostics

#

Diagnostics -
diagnostics
Used to output diagnostic information for debugging. This command is a subset of extendedDiagnostics which are more user-facing results, and easier to interpret.

If you have been asked by a TypeScript compiler engineer to give the results using this flag in a compile, in which there is no harm in using extendedDiagnostics instead.

Deprecated
Related:
extendedDiagnostics
Released:
1.0

#

Explain Files -
explainFiles
Print names of files which TypeScript sees as a part of your project and the reason they are part of the compilation.

For example, with this project of just a single index.ts file

example
├── index.ts
├── package.json
└── tsconfig.json
Using a tsconfig.json which has explainFiles set to true:

{
"compilerOptions": {
"target": "es5",
"module": "commonjs",
"explainFiles": true
}
}
Running TypeScript against this folder would have output like this:

❯ tsc
node*modules/typescript/lib/lib.d.ts
Default library for target 'es5'
node_modules/typescript/lib/lib.es5.d.ts
Library referenced via 'es5' from file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.dom.d.ts
Library referenced via 'dom' from file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.webworker.importscripts.d.ts
Library referenced via 'webworker.importscripts' from
file 'node_modules/typescript/lib/lib.d.ts'
node_modules/typescript/lib/lib.scripthost.d.ts
Library referenced via 'scripthost'
from file 'node_modules/typescript/lib/lib.d.ts'
index.ts
Matched by include pattern '\**/\_' in 'tsconfig.json'
The output above show:

The initial lib.d.ts lookup based on target, and the chain of .d.ts files which are referenced
The index.ts file located via the default pattern of include
This option is intended for debugging how a file has become a part of your compile.

Released:
4.2

#

Extended Diagnostics -
extendedDiagnostics
You can use this flag to discover where TypeScript is spending its time when compiling. This is a tool used for understanding the performance characteristics of your codebase overall.

You can learn more about how to measure and understand the output in the performance section of the wiki.

Related:
diagnostics
Released:
2.0

#

Generate CPU Profile -
generateCpuProfile
This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile can provide insight into why your builds may be slow.

This option can only be used from the CLI via: --generateCpuProfile tsc-output.cpuprofile.

npm run tsc --generateCpuProfile tsc-output.cpuprofile
This file can be opened in a chromium based browser like Chrome or Edge Developer in the CPU profiler section. You can learn more about understanding the compilers performance in the TypeScript wiki section on performance.

Default:
profile.cpuprofile
Released:
3.7

#

generateTrace -
generateTrace
Generates an event trace and a list of types.
Released:
4.1

#

List Emitted Files -
listEmittedFiles
Print names of generated files part of the compilation to the terminal.

This flag is useful in two cases:

You want to transpile TypeScript as a part of a build chain in the terminal where the filenames are processed in the next command.
You are not sure that TypeScript has included a file you expected, as a part of debugging the file inclusion settings.
For example:

example
├── index.ts
├── package.json
└── tsconfig.json
With:

{
"compilerOptions": {
"declaration": true,
"listEmittedFiles": true
}
}
Would echo paths like:

$ npm run tsc
path/to/example/index.js
path/to/example/index.d.ts
Normally, TypeScript would return silently on success.

Released:
2.0

#

List Files -
listFiles
Print names of files part of the compilation. This is useful when you are not sure that TypeScript has included a file you expected.

For example:

example
├── index.ts
├── package.json
└── tsconfig.json
With:

{
"compilerOptions": {
"listFiles": true
}
}
Would echo paths like:

$ npm run tsc
path/to/example/node_modules/typescript/lib/lib.d.ts
path/to/example/node_modules/typescript/lib/lib.es5.d.ts
path/to/example/node_modules/typescript/lib/lib.dom.d.ts
path/to/example/node_modules/typescript/lib/lib.webworker.importscripts.d.ts
path/to/example/node_modules/typescript/lib/lib.scripthost.d.ts
path/to/example/index.ts
Note if using TypeScript 4.2, prefer explainFiles which offers an explanation of why a file was added too.

Related:
explainFiles
Released:
1.5

#

noCheck -
noCheck
Disable full type checking (only critical parse and emit errors will be reported).
Released:
5.6

#

Trace Resolution -
traceResolution
When you are trying to debug why a module isn’t being included. You can set traceResolution to true to have TypeScript print information about its resolution process for each processed file.

Released:
2.0

#

Projects

#

Composite -
composite
The composite option enforces certain constraints which make it possible for build tools (including TypeScript itself, under --build mode) to quickly determine if a project has been built yet.

When this setting is on:

The rootDir setting, if not explicitly set, defaults to the directory containing the tsconfig.json file.

All implementation files must be matched by an include pattern or listed in the files array. If this constraint is violated, tsc will inform you which files weren’t specified.

declaration defaults to true

You can find documentation on TypeScript projects in the handbook.

Related:
incremental
tsBuildInfoFile
Released:
3.0

#

Disable Referenced Project Load -
disableReferencedProjectLoad
In multi-project TypeScript programs, TypeScript will load all of the available projects into memory in order to provide accurate results for editor responses which require a full knowledge graph like ‘Find All References’.

If your project is large, you can use the flag disableReferencedProjectLoad to disable the automatic loading of all projects. Instead, projects are loaded dynamically as you open files through your editor.

Released:
4.0

#

Disable Solution Searching -
disableSolutionSearching
When working with composite TypeScript projects, this option provides a way to declare that you do not want a project to be included when using features like find all references or jump to definition in an editor.

This flag is something you can use to increase responsiveness in large composite projects.

Released:
3.8

#

Disable Source Project Reference Redirect -
disableSourceOfProjectReferenceRedirect
When working with composite TypeScript projects, this option provides a way to go back to the pre-3.7 behavior where d.ts files were used to as the boundaries between modules. In 3.7 the source of truth is now your TypeScript files.

Released:
3.7

#

Incremental -
incremental
Tells TypeScript to save information about the project graph from the last compilation to files stored on disk. This creates a series of .tsbuildinfo files in the same folder as your compilation output. They are not used by your JavaScript at runtime and can be safely deleted. You can read more about the flag in the 3.4 release notes.

To control which folders you want to the files to be built to, use the config option tsBuildInfoFile.

Default:
true if composite; false otherwise.
Related:
composite
tsBuildInfoFile
Released:
3.4

#

TS Build Info File -
tsBuildInfoFile
This setting lets you specify a file for storing incremental compilation information as a part of composite projects which enables faster building of larger TypeScript codebases. You can read more about composite projects in the handbook.

The default depends on a combination of other settings:

If outFile is set, the default is <outFile>.tsbuildinfo.
If rootDir and outDir are set, then the file is <outDir>/<relative path to config from rootDir>/<config name>.tsbuildinfo For example, if rootDir is src, outDir is dest, and the config is ./tsconfig.json, then the default is ./tsconfig.tsbuildinfo as the relative path from src/ to ./tsconfig.json is ../.
If outDir is set, then the default is <outDir>/<config name>.tsbuildInfo
Otherwise, the default is <config name>.tsbuildInfo
Default:
.tsbuildinfo
Related:
incremental
composite
Released:
3.4

#

Output Formatting

#

No Error Truncation -
noErrorTruncation
Do not truncate error messages.

With false, the default.

var x: {
propertyWithAnExceedinglyLongName1: string;
propertyWithAnExceedinglyLongName2: string;
propertyWithAnExceedinglyLongName3: string;
propertyWithAnExceedinglyLongName4: string;
propertyWithAnExceedinglyLongName5: string;
propertyWithAnExceedinglyLongName6: string;
propertyWithAnExceedinglyLongName7: string;
propertyWithAnExceedinglyLongName8: string;
};

// String representation of type of 'x' should be truncated in error message
var s: string = x;
Type '{ propertyWithAnExceedinglyLongName1: string; propertyWithAnExceedinglyLongName2: string; propertyWithAnExceedinglyLongName3: string; propertyWithAnExceedinglyLongName4: string; propertyWithAnExceedinglyLongName5: string; propertyWithAnExceedinglyLongName6: string; propertyWithAnExceedinglyLongName7: string; propert...' is not assignable to type 'string'.
Variable 'x' is used before being assigned.
Try
With true

var x: {
propertyWithAnExceedinglyLongName1: string;
propertyWithAnExceedinglyLongName2: string;
propertyWithAnExceedinglyLongName3: string;
propertyWithAnExceedinglyLongName4: string;
propertyWithAnExceedinglyLongName5: string;
propertyWithAnExceedinglyLongName6: string;
propertyWithAnExceedinglyLongName7: string;
propertyWithAnExceedinglyLongName8: string;
};

// String representation of type of 'x' should be truncated in error message
var s: string = x;
Type '{ propertyWithAnExceedinglyLongName1: string; propertyWithAnExceedinglyLongName2: string; propertyWithAnExceedinglyLongName3: string; propertyWithAnExceedinglyLongName4: string; propertyWithAnExceedinglyLongName5: string; propertyWithAnExceedinglyLongName6: string; propertyWithAnExceedinglyLongName7: string; propertyWithAnExceedinglyLongName8: string; }' is not assignable to type 'string'.
Variable 'x' is used before being assigned.
Try
Released:
1.0

#

Preserve Watch Output -
preserveWatchOutput
Whether to keep outdated console output in watch mode instead of clearing the screen every time a change happened.

Internal
Released:
2.8

#

Pretty -
pretty
Stylize errors and messages using color and context, this is on by default — offers you a chance to have less terse, single colored messages from the compiler.

Default:
true
Released:
1.8

#

Completeness

#

Skip Default Lib Check -
skipDefaultLibCheck
Use skipLibCheck instead. Skip type checking of default library declaration files.

Released:
1.6

#

Skip Lib Check -
skipLibCheck
Skip type checking of declaration files.

This can save time during compilation at the expense of type-system accuracy. For example, two libraries could define two copies of the same type in an inconsistent way. Rather than doing a full check of all d.ts files, TypeScript will type check the code you specifically refer to in your app’s source code.

A common case where you might think to use skipLibCheck is when there are two copies of a library’s types in your node_modules. In these cases, you should consider using a feature like yarn’s resolutions to ensure there is only one copy of that dependency in your tree or investigate how to ensure there is only one copy by understanding the dependency resolution to fix the issue without additional tooling.

Another possibility is when you are migrating between TypeScript releases and the changes cause breakages in node_modules and the JS standard libraries which you do not want to deal with during the TypeScript update.

Note, that if these issues come from the TypeScript standard library you can replace the library using TypeScript 4.5’s lib replacement technique.

Recommended
Released:
2.0

#

Command Line

#

Watch Options
TypeScript 3.8 shipped a new strategy for watching directories, which is crucial for efficiently picking up changes to node_modules.

On operating systems like Linux, TypeScript installs directory watchers (as opposed to file watchers) on node_modules and many of its subdirectories to detect changes in dependencies. This is because the number of available file watchers is often eclipsed by the number of files in node_modules, whereas there are way fewer directories to track.

Because every project might work better under different strategies, and this new approach might not work well for your workflows, TypeScript 3.8 introduces a new watchOptions field which allows users to tell the compiler/language service which watching strategies should be used to keep track of files and directories.

#

Assume Changes Only Affect Direct Dependencies -
assumeChangesOnlyAffectDirectDependencies
When this option is enabled, TypeScript will avoid rechecking/rebuilding all truly possibly-affected files, and only recheck/rebuild files that have changed as well as files that directly import them.

This can be considered a ‘fast & loose’ implementation of the watching algorithm, which can drastically reduce incremental rebuild times at the expense of having to run the full build occasionally to get all compiler error messages.

Released:
3.8
Watch Options
You can configure the how TypeScript --watch works. This section is mainly for handling case where fs.watch and fs.watchFile have additional constraints like on Linux. You can read more at Configuring Watch.

#

Watch File -
watchFile
The strategy for how individual files are watched.

fixedPollingInterval: Check every file for changes several times a second at a fixed interval.
priorityPollingInterval: Check every file for changes several times a second, but use heuristics to check certain types of files less frequently than others.
dynamicPriorityPolling: Use a dynamic queue where less-frequently modified files will be checked less often.
useFsEvents (the default): Attempt to use the operating system/file system’s native events for file changes.
useFsEventsOnParentDirectory: Attempt to use the operating system/file system’s native events to listen for changes on a file’s parent directory
Allowed:
fixedpollinginterval
prioritypollinginterval
dynamicprioritypolling
fixedchunksizepolling
usefsevents
usefseventsonparentdirectory
Released:
3.8

#

Watch Directory -
watchDirectory
The strategy for how entire directory trees are watched under systems that lack recursive file-watching functionality.

fixedPollingInterval: Check every directory for changes several times a second at a fixed interval.
dynamicPriorityPolling: Use a dynamic queue where less-frequently modified directories will be checked less often.
useFsEvents (the default): Attempt to use the operating system/file system’s native events for directory changes.
Allowed:
usefsevents
fixedpollinginterval
dynamicprioritypolling
fixedchunksizepolling
Released:
3.8

#

Fallback Polling -
fallbackPolling
When using file system events, this option specifies the polling strategy that gets used when the system runs out of native file watchers and/or doesn’t support native file watchers.

fixedPollingInterval: Check every file for changes several times a second at a fixed interval.
priorityPollingInterval: Check every file for changes several times a second, but use heuristics to check certain types of files less frequently than others.
dynamicPriorityPolling: Use a dynamic queue where less-frequently modified files will be checked less often.
synchronousWatchDirectory: Disable deferred watching on directories. Deferred watching is useful when lots of file changes might occur at once (e.g. a change in node_modules from running npm install), but you might want to disable it with this flag for some less-common setups.
Allowed:
fixedinterval
priorityinterval
dynamicpriority
fixedchunksize
Released:
3.8

#

Synchronous Watch Directory -
synchronousWatchDirectory
Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively. Instead of giving a small timeout to allow for potentially multiple edits to occur on a file.

{
"watchOptions": {
"synchronousWatchDirectory": true
}
}
Released:
3.8

#

Exclude Directories -
excludeDirectories
You can use excludeFiles to drastically reduce the number of files which are watched during --watch. This can be a useful way to reduce the number of open file which TypeScript tracks on Linux.

{
"watchOptions": {
"excludeDirectories": ["**/node_modules", "_build", "temp/*"]
}
}
Released:
4.2

#

Exclude Files -
excludeFiles
You can use excludeFiles to remove a set of specific files from the files which are watched.

{
"watchOptions": {
"excludeFiles": ["temp/file.ts"]
}
}
Released:
4.2
Type Acquisition
Type Acquisition is only important for JavaScript projects. In TypeScript projects you need to include the types in your projects explicitly. However, for JavaScript projects, the TypeScript tooling will download types for your modules in the background and outside of your node_modules folder.

#

Enable -
enable
Disables automatic type acquisition in JavaScript projects:

{
"typeAcquisition": {
"enable": false
}
}

#

Include -
include
If you have a JavaScript project where TypeScript needs additional guidance to understand global dependencies, or have disabled the built-in inference via disableFilenameBasedTypeAcquisition.

You can use include to specify which types should be used from DefinitelyTyped:

{
"typeAcquisition": {
"include": ["jquery"]
}
}

#

Exclude -
exclude
Offers a config for disabling the type-acquisition for a certain module in JavaScript projects. This can be useful for projects which include other libraries in testing infrastructure which aren’t needed in the main application.

{
"typeAcquisition": {
"exclude": ["jest", "mocha"]
}
}

#

Disable Filename Based Type Acquisition -
disableFilenameBasedTypeAcquisition
TypeScript’s type acquisition can infer what types should be added based on filenames in a project. This means that having a file like jquery.js in your project would automatically download the types for JQuery from DefinitelyTyped.

You can disable this via disableFilenameBasedTypeAcquisition.

{
"typeAcquisition": {
"disableFilenameBasedTypeAcquisition": true
}
}
Released:
4.1
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
