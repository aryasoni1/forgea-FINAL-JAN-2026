Install
First, install Prettier locally:

npm
yarn
pnpm
bun
npm install --save-dev --save-exact prettier

Then, create an empty config file to let editors and other tools know you are using Prettier:

node --eval "fs.writeFileSync('.prettierrc','{}\n')"

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

tip
Prettier will follow rules specified in .gitignore if it exists in the same directory from which it is run. You can also base your .prettierignore on .eslintignore (if you have one).

Another tip
If your project isn’t ready to format, say, HTML files yet, add \*.html.

Now, format all files with Prettier:

npm
yarn
pnpm
bun
npx prettier . --write

info
What is that npx thing? npx ships with npm and lets you run locally installed tools. We’ll leave off the npx part for brevity throughout the rest of this file!

warning
If you forget to install Prettier first, npx will temporarily download the latest version. That’s not a good idea when using Prettier, because we change how code is formatted in each release! It’s important to have a locked down version of Prettier in your package.json. And it’s faster, too.

prettier --write . is great for formatting everything, but for a big project it might take a little while. You may run prettier --write app/ to format a certain directory, or prettier --write app/components/Button.js to format a certain file. Or use a glob like prettier --write "app/\*_/_.test.js" to format all tests in a directory (see fast-glob for supported glob syntax).

If you have a CI setup, run the following as part of it to make sure that everyone runs Prettier. This avoids merge conflicts and other collaboration issues!

npx prettier . --check

--check is like --write, but only checks that files are already formatted, rather than overwriting them. prettier --write and prettier --check are the most common ways to run Prettier.

Set up your editor
Formatting from the command line is a good way to get started, but you get the most from Prettier by running it from your editor, either via a keyboard shortcut or automatically whenever you save a file. When a line has gotten so long while coding that it won’t fit your screen, just hit a key and watch it magically be wrapped into multiple lines! Or when you paste some code and the indentation gets all messed up, let Prettier fix it up for you without leaving your editor.

See Editor Integration for how to set up your editor. If your editor does not support Prettier, you can instead run Prettier with a file watcher.

note
Don’t skip the regular local install! Editor plugins will pick up your local version of Prettier, making sure you use the correct version in every project. (You wouldn’t want your editor accidentally causing lots of changes because it’s using a newer version of Prettier than your project!)

And being able to run Prettier from the command line is still a good fallback, and needed for CI setups.

ESLint (and other linters)
If you use ESLint, install eslint-config-prettier to make ESLint and Prettier play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier. There’s a similar config for Stylelint: stylelint-config-prettier

(See Prettier vs. Linters to learn more about formatting vs linting, Integrating with Linters for more in-depth information on configuring your linters, and Related projects for even more integration possibilities, if needed.)

Git hooks
In addition to running Prettier from the command line (prettier --write), checking formatting in CI, and running Prettier from your editor, many people like to run Prettier as a pre-commit hook as well. This makes sure all your commits are formatted, without having to wait for your CI build to finish.

For example, you can do the following to have Prettier run before each commit:

Install husky and lint-staged:
npm
yarn
pnpm
bun
npm install --save-dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"

Add the following to your package.json:
{
"lint-staged": {
"\*_/_": "prettier --write --ignore-unknown"
}
}

note
If you use ESLint, make sure lint-staged runs it before Prettier, not after.

See Pre-commit Hook for more information.

Summary
To summarize, we have learned to:

Install an exact version of Prettier locally in your project. This makes sure that everyone in the project gets the exact same version of Prettier. Even a patch release of Prettier can result in slightly different formatting, so you wouldn’t want different team members using different versions and formatting each other’s changes back and forth.
Add a .prettierrc to let your editor know that you are using Prettier.
Add a .prettierignore to let your editor know which files not to touch, as well as for being able to run prettier --write . to format the entire project (without mangling files you don’t want, or choking on generated files).
Run prettier --check . in CI to make sure that your project stays formatted.
Run Prettier from your editor for the best experience.
Use eslint-config-prettier to make Prettier and ESLint play nice together.
Set up a pre-commit hook to make sure that every commit is formatted.
Ignoring Code
Use .prettierignore to ignore (i.e. not reformat) certain files and folders completely.

Use “prettier-ignore” comments to ignore parts of files.

Ignoring Files: .prettierignore
To exclude files from formatting, create a .prettierignore file in the root of your project. .prettierignore uses gitignore syntax.

Example:

# Ignore artifacts:

build
coverage

# Ignore all HTML files:

\*_/_.html

It’s recommended to have a .prettierignore in your project! This way you can run prettier --write . to make sure that everything is formatted (without mangling files you don’t want, or choking on generated files). And – your editor will know which files not to format!

By default prettier ignores files in version control systems directories (".git", ".jj", ".sl", ".svn" and ".hg") and node_modules (unless the --with-node-modules CLI option is specified). Prettier will also follow rules specified in the ".gitignore" file if it exists in the same directory from which it is run.

So by default it will be

**/.git
**/.svn
**/.hg
**/node_modules

and

**/.git
**/.svn
\*\*/.hg

if --with-node-modules CLI option provided

(See also the --ignore-path CLI option.)

JavaScript
A JavaScript comment of // prettier-ignore will exclude the next node in the abstract syntax tree from formatting.

For example:

matrix(
1, 0, 0,
0, 1, 0,
0, 0, 1
)

// prettier-ignore
matrix(
1, 0, 0,
0, 1, 0,
0, 0, 1
)

will be transformed to:

matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
1, 0, 0,
0, 1, 0,
0, 0, 1
)

JSX

<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>

HTML

<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
  (mousedown)="       onStart    (    )         "
  (mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
  (mousedown)="onStart()"
  (mouseup)="         onEnd      (    )         "
></div>

CSS
/_ prettier-ignore _/
.my ugly rule
{

}

Markdown

<!-- prettier-ignore -->
Do   not    format   this

Range Ignore
available in v1.12.0+

This type of ignore is only allowed to be used in top-level and aimed to disable formatting for auto-generated content, e.g. all-contributors, markdown-toc, etc.

<!-- prettier-ignore-start -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - START -->

| MY | AWESOME | AUTO-GENERATED | TABLE |
|-|-|-|-|
| a | b | c | d |

<!-- SOMETHING AUTO-GENERATED BY TOOLS - END -->
<!-- prettier-ignore-end -->

Important: You must have a blank line before <!-- prettier-ignore-start --> and <!-- prettier-ignore-end --> for Prettier to recognize the comments.

YAML
To ignore a part of a YAML file, # prettier-ignore should be placed on the line immediately above the ignored node:

# prettier-ignore

key : value
hello: world

GraphQL
{

# prettier-ignore

addReaction(input:{superLongInputFieldName:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
reaction {content}
}
}

Handlebars
{{! prettier-ignore }}

<div>
  "hello! my parent was ignored"
  {{#my-crazy-component     "shall"     be="preserved"}}
    <This
      is  =  "also preserved as is"
    />
  {{/my-crazy-component}}
</div>

Command Line File Patterns
For one-off commands, when you want to exclude some files without adding them to .prettierignore, negative patterns can come in handy:

prettier . "!\*_/_.{js,jsx,vue}" --write

See fast-glob to learn more about advanced glob syntax.
Integrating with Linters
Linters usually contain not only code quality rules, but also stylistic rules. Most stylistic rules are unnecessary when using Prettier, but worse – they might conflict with Prettier! Use Prettier for code formatting concerns, and linters for code-quality concerns, as outlined in Prettier vs. Linters.

Luckily it’s easy to turn off rules that conflict or are unnecessary with Prettier, by using these pre-made configs:

eslint-config-prettier
Check out the above links for instructions on how to install and set things up.

Notes
When searching for both Prettier and your linter on the Internet you’ll probably find more related projects. These are generally not recommended, but can be useful in certain circumstances.

First, we have plugins that let you run Prettier as if it was a linter rule:

eslint-plugin-prettier
stylelint-prettier
These plugins were especially useful when Prettier was new. By running Prettier inside your linters, you didn’t have to set up any new infrastructure and you could re-use your editor integrations for the linters. But these days you can run prettier --check . and most editors have Prettier support.

The downsides of those plugins are:

You end up with a lot of red squiggly lines in your editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in your face about it!
They are slower than running Prettier directly.
They’re yet one layer of indirection where things may break.
Finally, we have tools that run prettier and then immediately lint files by running, for example, eslint --fix on them.

prettier-eslint
prettier-stylelint
Those are useful if some aspect of Prettier’s output makes Prettier completely unusable to you. Then you can have for example eslint --fix fix that up for you. The downside is that these tools are much slower than just running Prettier.
Pre-commit Hook
You can use Prettier with a pre-commit tool. This can re-format your files that are marked as “staged” via git add before you commit.

Option 1. lint-staged
Use Case: Useful for when you want to use other code quality tools along with Prettier (e.g. ESLint, Stylelint, etc.) or if you need support for partially staged files (git add --patch).

Make sure Prettier is installed and is in your devDependencies before you proceed.

npx mrm@2 lint-staged

This will install husky and lint-staged, then add a configuration to the project’s package.json that will automatically format supported files in a pre-commit hook.

Read more at the lint-staged repo.

Option 2. pretty-quick
Use Case: Great for when you want an entire file formatting on your changed/staged files.

Install it along with simple-git-hooks:

npm
yarn
pnpm
bun
npm install --save-dev simple-git-hooks pretty-quick
echo '{\n "pre-commit": "npx pretty-quick --staged"\n}\n' > .simple-git-hooks.json
npx simple-git-hooks

Read more at the pretty-quick repo.

Option 3. Husky.Net
Use Case: A dotnet solution to use Prettier along with other code quality tools (e.g. dotnet-format, ESLint, Stylelint, etc.). It supports multiple file states (staged - last-commit, git-files etc.)

dotnet new tool-manifest
dotnet tool install husky
dotnet husky install
dotnet husky add pre-commit

after installation you can add prettier task to the task-runner.json.

{
"command": "npx",
"args": ["prettier", "--ignore-unknown", "--write", "${staged}"],
"pathMode": "absolute"
}

Option 4. git-format-staged
Use Case: Great for when you want to format partially-staged files, and other options do not provide a good fit for your project.

Git-format-staged is used to run any formatter that can accept file content via stdin. It operates differently than other tools that format partially-staged files: it applies the formatter directly to objects in the git object database, and merges changes back to the working tree. This procedure provides several guarantees:

Changes in commits are always formatted.
Unstaged changes are never, under any circumstances staged during the formatting process.
If there are conflicts between formatted, staged changes and unstaged changes then your working tree files are left untouched - your work won’t be overwritten, and there are no stashes to clean up.
Unstaged changes are not formatted.
Git-format-staged requires Python v3 or v2.7. Python is usually pre-installed on Linux and macOS, but not on Windows. Use git-format-staged with husky:

npm
yarn
pnpm
bun
npx husky init
npm install --save-dev git-format-staged
node --eval "fs.writeFileSync('.husky/pre-commit', 'git-format-staged -f \'prettier --ignore-unknown --stdin --stdin-filepath \"{}\"\' .\n')"

Add or remove file extensions to suit your project. Note that regardless of which extensions you list formatting will respect any .prettierignore files in your project.

To read about how git-format-staged works see Automatic Code Formatting for Partially-Staged Files.

Option 5. Shell script
Alternately you can save this script as .git/hooks/pre-commit and give it execute permission:

#!/bin/sh
FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

# Prettify all selected files

echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write

# Add back the modified/prettified files to staging

echo "$FILES" | xargs git add

exit 0

If git is reporting that your prettified files are still modified after committing, you may need to add a post-commit script to update git’s index.

Add something like the following to .git/hooks/post-commit:

#!/bin/sh
git update-index -g
Plugins
Plugins are ways of adding new languages or formatting rules to Prettier. Prettier’s own implementations of all languages are expressed using the plugin API. The core prettier package contains JavaScript and other web-focused languages built in. For additional languages you’ll need to install a plugin.

Using Plugins
You can load plugins with:

The CLI, via --plugin:

prettier --write main.foo --plugin=prettier-plugin-foo

tip
You can set --plugin options multiple times.

The API, via the plugins options:

await prettier.format("code", {
parser: "foo",
plugins: ["prettier-plugin-foo"],
});

The Configuration File:

{
"plugins": ["prettier-plugin-foo"]
}

Strings provided to plugins are ultimately passed to import() expression, so you can provide a module/package name, a path, or anything else import() takes.

Official Plugins
@prettier/plugin-php
@prettier/plugin-pug by @Shinigami92
@prettier/plugin-ruby
@prettier/plugin-xml
Community Plugins
prettier-plugin-apex by @dangmai
prettier-plugin-astro by @withastro contributors
prettier-plugin-bigcommerce-stencil by @phoenix128
prettier-plugin-elm by @giCentre
prettier-plugin-erb by @adamzapasnik
prettier-plugin-gherkin by @mapado
prettier-plugin-glsl by @NaridaL
prettier-plugin-go-template by @NiklasPor
prettier-plugin-hugo-post by @metcalfc
prettier-plugin-java by @JHipster
prettier-plugin-jinja-template by @davidodenwald
prettier-plugin-jsonata by @Stedi
prettier-plugin-kotlin by @Angry-Potato
prettier-plugin-marko by @marko-js
prettier-plugin-motoko by @dfinity
prettier-plugin-nginx by @joedeandev
prettier-plugin-prisma by @umidbekk
prettier-plugin-properties by @eemeli
prettier-plugin-rust by @jinxdash
prettier-plugin-sh by @JounQin
prettier-plugin-sql by @JounQin
prettier-plugin-sql-cst by @nene
prettier-plugin-solidity by @mattiaerre
prettier-plugin-svelte by @sveltejs
prettier-plugin-toml by @JounQin and @so1ve
prettier-plugin-xquery by @DrRataplan
Developing Plugins
Prettier plugins are regular JavaScript modules with the following five exports or default export with the following properties:

languages
parsers
printers
options
defaultOptions
languages
Languages is an array of language definitions that your plugin will contribute to Prettier. It can include all of the fields specified in prettier.getSupportInfo().

It must include name and parsers.

export const languages = [
{
// The language name
name: "InterpretedDanceScript",
// Parsers that can parse this language.
// This can be built-in parsers, or parsers you have contributed via this plugin.
parsers: ["dance-parse"],
},
];

parsers
Parsers convert code as a string into an AST.

The key must match the name in the parsers array from languages. The value contains a parse function, an AST format name, and two location extraction functions (locStart and locEnd).

export const parsers = {
"dance-parse": {
parse,
// The name of the AST that the parser produces.
astFormat: "dance-ast",
hasPragma,
hasIgnorePragma,
locStart,
locEnd,
preprocess,
},
};

The signature of the parse function is:

function parse(text: string, options: object): Promise<AST> | AST;

The location extraction functions (locStart and locEnd) return the starting and ending locations of a given AST node:

function locStart(node: object): number;

(Optional) The pragma detection function (hasPragma) should return if the text contains the pragma comment.

function hasPragma(text: string): boolean;

(Optional) The "ignore pragma" detection function (hasIgnorePragma) should return if the text contains a pragma indicating the text should not be formatted.

function hasIgnorePragma(text: string): boolean;

(Optional) The preprocess function can process the input text before passing into parse function.

function preprocess(text: string, options: object): string | Promise<string>;

Support for async preprocess first added in v3.7.0

printers
Printers convert ASTs into a Prettier intermediate representation, also known as a Doc.

The key must match the astFormat that the parser produces. The value contains an object with a print function. All other properties (embed, preprocess, etc.) are optional.

export const printers = {
"dance-ast": {
print,
embed,
preprocess,
getVisitorKeys,
insertPragma,
canAttachComment,
isBlockComment,
printComment,
getCommentChildNodes,
hasPrettierIgnore,
printPrettierIgnored,
handleComments: {
ownLine,
endOfLine,
remaining,
},
},
};

The printing process
Prettier uses an intermediate representation, called a Doc, which Prettier then turns into a string (based on options like printWidth). A printer's job is to take the AST generated by parsers[<parser name>].parse and return a Doc. A Doc is constructed using builder commands:

import \* as prettier from "prettier";

const { join, line, ifBreak, group } = prettier.doc.builders;

The printing process consists of the following steps:

AST preprocessing (optional). See preprocess.
Comment attachment (optional). See Handling comments in a printer.
Processing embedded languages (optional). The embed method, if defined, is called for each node, depth-first. While, for performance reasons, the recursion itself is synchronous, embed may return asynchronous functions that can call other parsers and printers to compose docs for embedded syntaxes like CSS-in-JS. These returned functions are queued up and sequentially executed before the next step.
Recursive printing. A doc is recursively constructed from the AST. Starting from the root node:
If, from the step 3, there is an embedded language doc associated with the current node, this doc is used.
Otherwise, the print(path, options, print): Doc method is called. It composes a doc for the current node, often by printing child nodes using the print callback.
print
Most of the work of a plugin's printer will take place in its print function, whose signature is:

function print(
// Path to the AST node to print
path: AstPath,
options: object,
// Recursively print a child node
print: (selector?: string | number | Array<string | number> | AstPath) => Doc,
): Doc;

The print function is passed the following parameters:

path: An object, which can be used to access nodes in the AST. It’s a stack-like data structure that maintains the current state of the recursion. It is called “path” because it represents the path to the current node from the root of the AST. The current node is returned by path.node.
options: A persistent object, which contains global options and which a plugin may mutate to store contextual data.
print: A callback for printing sub-nodes. This function contains the core printing logic that consists of steps whose implementation is provided by plugins. In particular, it calls the printer’s print function and passes itself to it. Thus, the two print functions – the one from the core and the one from the plugin – call each other while descending down the AST recursively.
Here’s a simplified example to give an idea of what a typical implementation of print looks like:

import \* as prettier from "prettier";

const { group, indent, join, line, softline } = prettier.doc.builders;

function print(path, options, print) {
const node = path.node;

switch (node.type) {
case "list":
return group([
"(",
indent([softline, join(line, path.map(print, "elements"))]),
softline,
")",
]);

    case "pair":
      return group([
        "(",
        indent([softline, print("left"), line, ". ", print("right")]),
        softline,
        ")",
      ]);

    case "symbol":
      return node.name;

}

throw new Error(`Unknown node type: ${node.type}`);
}

Check out prettier-python's printer for some examples of what is possible.

(optional) embed
A printer can have the embed method to print one language inside another. Examples of this are printing CSS-in-JS or fenced code blocks in Markdown. The signature is:

function embed(
// Path to the current AST node
path: AstPath,
// Current options
options: Options,
):
| ((
// Parses and prints the passed text using a different parser.
// You should set `options.parser` to specify which parser to use.
textToDoc: (text: string, options: Options) => Promise<Doc>,
// Prints the current node or its descendant node with the current printer
print: (
selector?: string | number | Array<string | number> | AstPath,
) => Doc,
// The following two arguments are passed for convenience.
// They're the same `path` and `options` that are passed to `embed`.
path: AstPath,
options: Options,
) => Promise<Doc | undefined> | Doc | undefined)
| Doc
| undefined;

The embed method is similar to the print method in that it maps AST nodes to docs, but unlike print, it has power to do async work by returning an async function. That function's first parameter, the textToDoc async function, can be used to render a doc using a different plugin.

If a function returned from embed returns a doc or a promise that resolves to a doc, that doc will be used in printing, and the print method won’t be called for this node. It's also possible and, in rare situations, might be convenient to return a doc synchronously directly from embed, however textToDoc and the print callback aren’t available at that case. Return a function to get them.

If embed returns undefined, or if a function it returned returns undefined or a promise that resolves to undefined, the node will be printed normally with the print method. Same will happen if a returned function throws an error or returns a promise that rejects (e.g., if a parsing error has happened). Set the PRETTIER_DEBUG environment variable to a non-empty value if you want Prettier to rethrow these errors.

For example, a plugin that has nodes with embedded JavaScript might have the following embed method:

function embed(path, options) {
const node = path.node;
if (node.type === "javascript") {
return async (textToDoc) => {
return [
"<script>",
hardline,
await textToDoc(node.javaScriptCode, { parser: "babel" }),
hardline,
"</script>",
];
};
}
}

If the --embedded-language-formatting option is set to off, the embedding step is entirely skipped, embed isn’t called, and all nodes are printed with the print method.

(optional) preprocess
The preprocess method can process the AST from the parser before passing it into the print method.

function preprocess(ast: AST, options: Options): AST | Promise<AST>;

(optional) getVisitorKeys
This property might come in handy if the plugin uses comment attachment or embedded languages. These features traverse the AST iterating through all the own enumerable properties of each node starting from the root. If the AST has cycles, such a traverse ends up in an infinite loop. Also, nodes might contain non-node objects (e.g., location data), iterating through which is a waste of resources. To solve these issues, the printer can define a function to return property names that should be traversed.

Its signature is:

function getVisitorKeys(node, nonTraversableKeys: Set<string>): string[];

The default getVisitorKeys:

function getVisitorKeys(node, nonTraversableKeys) {
return Object.keys(node).filter((key) => !nonTraversableKeys.has(key));
}

The second argument nonTraversableKeys is a set of common keys and keys that prettier used internal.

If you have full list of visitor keys

const visitorKeys = {
Program: ["body"],
Identifier: [],
// ...
};

function getVisitorKeys(node /_ , nonTraversableKeys_/) {
// Return `[]` for unknown node to prevent Prettier fallback to use `Object.keys()`
return visitorKeys[node.type] ?? [];
}

If you only need exclude a small set of keys

const ignoredKeys = new Set(["prev", "next", "range"]);

function getVisitorKeys(node, nonTraversableKeys) {
return Object.keys(node).filter(
(key) => !nonTraversableKeys.has(key) && !ignoredKeys.has(key),
);
}

(optional) insertPragma
A plugin can implement how a pragma comment is inserted in the resulting code when the --insert-pragma option is used, in the insertPragma function. Its signature is:

function insertPragma(text: string): string;

Handling comments in a printer
Comments are often not part of a language's AST and present a challenge for pretty printers. A Prettier plugin can either print comments itself in its print function or rely on Prettier's comment algorithm.

By default, if the AST has a top-level comments property, Prettier assumes that comments stores an array of comment nodes. Prettier will then use the provided parsers[<plugin>].locStart/locEnd functions to search for the AST node that each comment "belongs" to. Comments are then attached to these nodes mutating the AST in the process, and the comments property is deleted from the AST root. The \*Comment functions are used to adjust Prettier's algorithm. Once the comments are attached to the AST, Prettier will automatically call the printComment(path, options): Doc function and insert the returned doc into the (hopefully) correct place.

(optional) getCommentChildNodes
By default, Prettier searches all object properties (except for a few predefined ones) of each node recursively. This function can be provided to override that behavior. It has the signature:

function getCommentChildNodes(
// The node whose children should be returned.
node: AST,
// Current options
options: object,
): AST[] | undefined;

Return [] if the node has no children or undefined to fall back on the default behavior.

(optional) hasPrettierIgnore
function hasPrettierIgnore(path: AstPath): boolean;

Returns whether or not the AST node is prettier-ignored.

(optional) printPrettierIgnored
If the AST node is prettier-ignored, Prettier will slice for the text for parsing without calling print function by default, however plugin can also handle the prettier-ignored node print by adding this property.

This property have the same signature as the print property.

First available in v3.7.0

(optional) printComment
Called whenever a comment node needs to be printed. It has the signature:

function printComment(
// Path to the current comment node
commentPath: AstPath,
// Current options
options: object,
): Doc;

(optional) canAttachComment
function canAttachComment(node: AST, ancestors: T[]): boolean;

This function is used for deciding whether a comment can be attached to a particular AST node. By default, all AST properties are traversed searching for nodes that comments can be attached to. This function is used to prevent comments from being attached to a particular node. A typical implementation looks like

function canAttachComment(node, [parent]) {
return !(
node.type === "comment" ||
(parent?.type === "shorthand-property" &&
parent.key === node &&
parent.key !== parent.value)
);
}

The second parameter ancestors first added in v3.7.0.

(optional) isBlockComment
function isBlockComment(node: AST): boolean;

Returns whether or not the AST node is a block comment.

(optional) handleComments
The handleComments object contains three optional functions, each with signature

(
// The AST node corresponding to the comment
comment: AST,
// The full source code text
text: string,
// The global options object
options: object,
// The AST
ast: AST,
// Whether this comment is the last comment
isLastComment: boolean,
) => boolean;

These functions are used to override Prettier's default comment attachment algorithm. ownLine/endOfLine/remaining is expected to either manually attach a comment to a node and return true, or return false and let Prettier attach the comment.

Based on the text surrounding a comment node, Prettier dispatches:

ownLine if a comment has only whitespace preceding it and a newline afterwards,
endOfLine if a comment has a newline afterwards but some non-whitespace preceding it,
remaining in all other cases.
At the time of dispatching, Prettier will have annotated each AST comment node (i.e., created new properties) with at least one of enclosingNode, precedingNode, or followingNode. These can be used to aid a plugin's decision process (of course the entire AST and original text is also passed in for making more complicated decisions).

Manually attaching a comment
The prettier.util.addTrailingComment/addLeadingComment/addDanglingComment functions can be used to manually attach a comment to an AST node. An example ownLine function that ensures a comment does not follow a "punctuation" node (made up for demonstration purposes) might look like:

import \* as prettier from "prettier";

function ownLine(comment, text, options, ast, isLastComment) {
const { precedingNode } = comment;
if (precedingNode && precedingNode.type === "punctuation") {
prettier.util.addTrailingComment(precedingNode, comment);
return true;
}
return false;
}

Nodes with comments are expected to have a comments property containing an array of comments. Each comment is expected to have the following properties: leading, trailing, printed.

The example above uses prettier.util.addTrailingComment, which automatically sets comment.leading/trailing/printed to appropriate values and adds the comment to the AST node's comments array.

The --debug-print-comments CLI flag can help with debugging comment attachment issues. It prints a detailed list of comments, which includes information on how every comment was classified (ownLine/endOfLine/remaining, leading/trailing/dangling) and to which node it was attached. For Prettier’s built-in languages, this information is also available on the Playground (the 'show comments' checkbox in the Debug section).

options
options is an object containing the custom options your plugin supports.

Example:

export default {
// ... plugin implementation
options: {
openingBraceNewLine: {
type: "boolean",
category: "Global",
default: true,
description: "Move open brace for code blocks onto new line.",
},
},
};

defaultOptions
If your plugin requires different default values for some of Prettier’s core options, you can specify them in defaultOptions:

export default {
// ... plugin implementation
defaultOptions: {
tabWidth: 4,
},
};

Utility functions
prettier.util provides the following limited set of utility functions for plugins:

type Quote = '"' | "'";
type SkipOptions = { backwards?: boolean };

function getMaxContinuousCount(text: string, searchString: string): number;

function getStringWidth(text: string): number;

function getAlignmentSize(
text: string,
tabWidth: number,
startIndex?: number,
): number;

function getIndentSize(value: string, tabWidth: number): number;

function skip(
characters: string | RegExp,
): (
text: string,
startIndex: number | false,
options?: SkipOptions,
) => number | false;

function skipWhitespace(
text: string,
startIndex: number | false,
options?: SkipOptions,
): number | false;

function skipSpaces(
text: string,
startIndex: number | false,
options?: SkipOptions,
): number | false;

function skipToLineEnd(
text: string,
startIndex: number | false,
options?: SkipOptions,
): number | false;

function skipEverythingButNewLine(
text: string,
startIndex: number | false,
options?: SkipOptions,
): number | false;

function skipInlineComment(
text: string,
startIndex: number | false,
): number | false;

function skipTrailingComment(
text: string,
startIndex: number | false,
): number | false;

function skipNewline(
text: string,
startIndex: number | false,
options?: SkipOptions,
): number | false;

function hasNewline(
text: string,
startIndex: number,
options?: SkipOptions,
): boolean;

function hasNewlineInRange(
text: string,
startIndex: number,
startIndex: number,
): boolean;

function hasSpaces(
text: string,
startIndex: number,
options?: SkipOptions,
): boolean;

function getPreferredQuote(
text: string,
preferredQuoteOrPreferSingleQuote: Quote | boolean,
): Quote;

function makeString(
rawText: string,
enclosingQuote: Quote,
unescapeUnnecessaryEscapes?: boolean,
): string;

function getNextNonSpaceNonCommentCharacter(
text: string,
startIndex: number,
): string;

function getNextNonSpaceNonCommentCharacterIndex(
text: string,
startIndex: number,
): number | false;

function isNextLineEmpty(text: string, startIndex: number): boolean;

function isPreviousLineEmpty(text: string, startIndex: number): boolean;

Tutorials
How to write a plugin for Prettier: Teaches you how to write a very basic Prettier plugin for TOML.
Testing Plugins
Since plugins can be resolved using relative paths, when working on one you can do:

import \* as prettier from "prettier";

const code = "(add 1 2)";
await prettier.format(code, {
parser: "lisp",
plugins: ["./index.js"],
});

This will resolve a plugin relative to the current working directory.
CLI
Use the prettier command to run Prettier from the command line.

prettier [options] [file/dir/glob ...]

note
To run your locally installed version of Prettier, prefix the command with npx, yarn exec, pnpm exec, or bunx, i.e. npx prettier --help, yarn exec prettier --help, pnpm exec prettier --help, or bunx prettier --help.

To format a file in-place, use --write. (Note: This overwrites your files!)

In practice, this may look something like:

prettier . --write

This command formats all files supported by Prettier in the current directory and its subdirectories.

It’s recommended to always make sure that prettier --write . only formats what you want in your project. Use a .prettierignore file to ignore things that should not be formatted.

A more complicated example:

prettier docs package.json "{app,**{tests,mocks}**}/\*_/_.js" --write --single-quote --trailing-comma all

warning
Don’t forget the quotes around the globs! The quotes make sure that Prettier CLI expands the globs rather than your shell, which is important for cross-platform usage.

note
It’s better to use a configuration file for formatting options like --single-quote and --trailing-comma instead of passing them as CLI flags. This way the Prettier CLI, editor integrations, and other tooling can all know what options you use.

File patterns
Given a list of paths/patterns, the Prettier CLI first treats every entry in it as a literal path.

If the path points to an existing file, Prettier CLI proceeds with that file and doesn’t resolve the path as a glob pattern.

If the path points to an existing directory, Prettier CLI recursively finds supported files in that directory. This resolution process is based on file extensions and well-known file names that Prettier and its plugins associate with supported languages.

Otherwise, the entry is resolved as a glob pattern using the glob syntax from the fast-glob module.

Prettier CLI will ignore files located in node_modules directory. To opt out from this behavior, use --with-node-modules flag.

Prettier CLI will not follow symbolic links when expanding arguments.

To escape special characters in globs, one of the two escaping syntaxes can be used: prettier "\[my-dir]/_.js" or prettier "[[]my-dir]/_.js". Both match all JS files in a directory named [my-dir], however the latter syntax is preferable as the former doesn’t work on Windows, where backslashes are treated as path separators.

--check
When you want to check if your files are formatted, you can run Prettier with the --check flag (or -c). This will output a human-friendly message and a list of unformatted files, if any.

prettier . --check

Console output if all files are formatted:

Checking formatting...
All matched files use Prettier code style!

Console output if some of the files require re-formatting:

Checking formatting...
[warn] src/fileA.js
[warn] src/fileB.js
[warn] Code style issues found in 2 files. Run Prettier with --write to fix.

The command will return exit code 1 in the second case, which is helpful inside the CI pipelines. Human-friendly status messages help project contributors react on possible problems. To minimise the number of times prettier --check finds unformatted files, you may be interested in configuring a pre-commit hook in your repo. Applying this practice will minimise the number of times the CI fails because of code formatting problems.

If you need to pipe the list of unformatted files to another command, you can use --list-different flag instead of --check.

Exit codes
Code Information
0 Everything formatted properly
1 Something wasn’t formatted properly
2 Something’s wrong with Prettier
--debug-check
If you're worried that Prettier will change the correctness of your code, add --debug-check to the command. This will cause Prettier to print an error message if it detects that code correctness might have changed. Note that --write cannot be used with --debug-check.

--find-config-path and --config
If you are repeatedly formatting individual files with prettier, you will incur a small performance cost when Prettier attempts to look up a configuration file. In order to skip this, you may ask Prettier to find the config file once, and re-use it later on.

$ prettier --find-config-path path/to/file.js
path/to/.prettierrc

This will provide you with a path to the configuration file, which you can pass to --config:

prettier path/to/file.js --write --config path/to/.prettierrc

You can also use --config if your configuration file lives somewhere where Prettier cannot find it, such as a config/ directory.

If you don’t have a configuration file, or want to ignore it if it does exist, you can pass --no-config instead.

--ignore-path
Path to a file containing patterns that describe files to ignore. By default, Prettier looks for ./.gitignore and ./.prettierignore.
Multiple values are accepted.

--list-different
Another useful flag is --list-different (or -l) which prints the filenames of files that are different from Prettier formatting. If there are differences the script errors out, which is useful in a CI scenario.

prettier . --single-quote --list-different

You can also use --check flag, which works the same way as --list-different, but also prints a human-friendly summary message to stdout.

--no-config
Do not look for a configuration file. The default settings will be used.

--config-precedence
Defines how config file should be evaluated in combination of CLI options.

cli-override (default)

CLI options take precedence over config file

file-override

Config file take precedence over CLI options

prefer-file

If a config file is found will evaluate it and ignore other CLI options. If no config file is found, CLI options will evaluate as normal.

This option adds support to editor integrations where users define their default configuration but want to respect project specific configuration.

--no-editorconfig
Don’t take .editorconfig into account when parsing configuration. See the prettier.resolveConfig docs for details.

--with-node-modules
Prettier CLI will ignore files located in node_modules directory. To opt out from this behavior, use --with-node-modules flag.

--write
This rewrites all processed files in place. This is comparable to the eslint --fix workflow. You can also use -w alias.

--log-level
Change the level of logging for the CLI. Valid options are:

error
warn
log (default)
debug
silent
--stdin-filepath
A path to the file that the Prettier CLI will treat like stdin. For example:

abc.css

.name {
display: none;
}

shell

$ cat abc.css | prettier --stdin-filepath abc.css
.name {
display: none;
}

--ignore-unknown
With --ignore-unknown (or -u), prettier will ignore unknown files matched by patterns.

prettier "\*_/_" --write --ignore-unknown

--no-error-on-unmatched-pattern
Prevent errors when pattern is unmatched.

--cache
If this option is enabled, the following values are used as cache keys and the file is formatted only if one of them is changed.

Prettier version
Options
Node.js version
(if --cache-strategy is metadata) file metadata, such as timestamps
(if --cache-strategy is content) content of the file
prettier . --write --cache

Running Prettier without --cache will delete the cache.

Also, since the cache file is stored in ./node_modules/.cache/prettier/.prettier-cache, so you can use rm ./node_modules/.cache/prettier/.prettier-cache to remove it manually.

warning
Plugins version and implementation are not used as cache keys. We recommend that you delete the cache when updating plugins.

--cache-location
Path to the cache file location used by --cache flag. If you don't explicit --cache-location, Prettier saves cache file at ./node_modules/.cache/prettier/.prettier-cache.

If a file path is passed, that file is used as the cache file.

prettier . --write --cache --cache-location=path/to/cache-file

--cache-strategy
Strategy for the cache to use for detecting changed files. Can be either metadata or content.

In general, metadata is faster. However, content is useful for updating the timestamp without changing the file content. This can happen, for example, during git operations such as git clone, because it does not track file modification times.

If no strategy is specified, content will be used.

prettier . --write --cache --cache-strategy metadata

Edit this page
API
If you want to run Prettier programmatically, check this page out.

import \* as prettier from "prettier";

Our public APIs are all asynchronous, if you must use synchronous version for some reason, you can try @prettier/sync.

prettier.format(source, options)
format is used to format text using Prettier. options.parser must be set according to the language you are formatting (see the list of available parsers). Alternatively, options.filepath can be specified for Prettier to infer the parser from the file extension. Other options may be provided to override the defaults.

await prettier.format("foo ( );", { semi: false, parser: "babel" });
// -> 'foo()\n'

prettier.check(source [, options])
check checks to see if the file has been formatted with Prettier given those options and returns a Promise<boolean>. This is similar to the --check or --list-different parameter in the CLI and is useful for running Prettier in CI scenarios.

prettier.formatWithCursor(source [, options])
formatWithCursor both formats the code, and translates a cursor position from unformatted code to formatted code. This is useful for editor integrations, to prevent the cursor from moving when code is formatted.

The cursorOffset option should be provided, to specify where the cursor is.

await prettier.formatWithCursor(" 1", { cursorOffset: 2, parser: "babel" });
// -> { formatted: '1;\n', cursorOffset: 1 }

prettier.resolveConfig(fileUrlOrPath [, options])
resolveConfig can be used to resolve configuration for a given source file, passing its path or url as the first argument. The config search will start at the directory of the file location and continue to search up the directory. Or you can pass directly the path of the config file as options.config if you don’t wish to search for it. A promise is returned which will resolve to:

An options object, providing a config file was found.
null, if no file was found.
The promise will be rejected if there was an error parsing the configuration file.

If options.useCache is false, all caching will be bypassed.

const text = await fs.readFile(filePath, "utf8");
const options = await prettier.resolveConfig(filePath);
const formatted = await prettier.format(text, {
...options,
filepath: filePath,
});

If options.editorconfig is true and an .editorconfig file is in your project, Prettier will parse it and convert its properties to the corresponding Prettier configuration. This configuration will be overridden by .prettierrc, etc. Currently, the following EditorConfig properties are supported:

end_of_line
indent_style
indent_size/tab_width
max_line_length
prettier.resolveConfigFile([fileUrlOrPath])
resolveConfigFile can be used to find the path of the Prettier configuration file that will be used when resolving the config (i.e. when calling resolveConfig). A promise is returned which will resolve to:

The path of the configuration file.
null, if no file was found.
The promise will be rejected if there was an error parsing the configuration file.

The search starts at process.cwd(), or at the directory of fileUrlOrPath if provided.

const configFile = await prettier.resolveConfigFile(filePath);
// you got the path of the configuration file

prettier.clearConfigCache()
When Prettier loads configuration files and plugins, the file system structure is cached for performance. This function will clear the cache. Generally this is only needed for editor integrations that know that the file system has changed since the last format took place.

prettier.getFileInfo(fileUrlOrPath [, options])
getFileInfo can be used by editor extensions to decide if a particular file needs to be formatted. This method returns a promise, which resolves to an object with the following properties:

{
ignored: boolean;
inferredParser: string | null;
}

The promise will be rejected if the type of fileUrlOrPath is not string or URL.

Setting options.ignorePath (string | URL | (string | URL)[]) and options.withNodeModules (boolean) influence the value of ignored (false by default).

If the given fileUrlOrPath is ignored, the inferredParser is always null.

Providing plugin paths in options.plugins ((string | URL | Plugin)[]) helps extract inferredParser for files that are not supported by Prettier core.

When setting options.resolveConfig (boolean, default true) to false, Prettier will not search for configuration file. This can be useful if this function is only used to check if file is ignored.

prettier.getSupportInfo()
Returns a promise which resolves to an object representing the options, parsers, languages and file types Prettier supports.

The support information looks like this:

{
languages: Array<{
name: string;
parsers: string[];
group?: string;
tmScope?: string;
aceMode?: string;
codemirrorMode?: string;
codemirrorMimeType?: string;
aliases?: string[];
extensions?: string[];
filenames?: string[];
linguistLanguageId?: number;
vscodeLanguageIds?: string[];
isSupported?(options: { filepath: string }): boolean;
}>;
}

note
Prettier can not ensure that filepath exists on disk.
When using from APIs(eg: prettier.format()), Prettier can not ensure it's a valid path either.

Custom Parser API (removed)
Removed in v3.0.0 (superseded by the Plugin API)

Before plugins were a thing, Prettier had a similar but more limited feature called custom parsers. It’s been removed in v3.0.0 as its functionality was a subset of what the Plugin API did. If you used it, please check the example below on how to migrate.

❌ Custom parser API (removed):

import { format } from "prettier";

format("lodash ( )", {
parser(text, { babel }) {
const ast = babel(text);
ast.program.body[0].expression.callee.name = "_";
return ast;
},
});
// -> "_();\n"

✔️ Plugin API:

import { format } from "prettier";
import \* as prettierPluginBabel from "prettier/plugins/babel";

const myCustomPlugin = {
parsers: {
"my-custom-parser": {
async parse(text) {
const ast = await prettierPluginBabel.parsers.babel.parse(text);
ast.program.body[0].expression.callee.name = "\_";
return ast;
},
astFormat: "estree",
},
},
};

await format("lodash ( )", {
parser: "my-custom-parser",
plugins: [myCustomPlugin],
});
// -> "\_();\n"

note
Overall, doing codemods this way isn’t recommended. Prettier uses the location data of AST nodes for many things like preserving blank lines and attaching comments. When the AST is modified after the parsing, the location data often gets out of sync, which may lead to unpredictable results. Consider using jscodeshift if you need codemods.

As part of the removed Custom parser API, it was previously possible to pass a path to a module exporting a parse function via the --parser option. Use the --plugin CLI option or the plugins API option instead to load plugins.
Browser
Run Prettier in the browser using its standalone version. This version doesn’t depend on Node.js. It only formats the code and has no support for config files, ignore files, CLI usage, or automatic loading of plugins.

The standalone version comes as:

ES modules: standalone.mjs, starting in version 3.0 (In version 2, esm/standalone.mjs.)
UMD: standalone.js, starting in version 1.13
The browser field in Prettier’s package.json points to standalone.js. That’s why you can just import or require the prettier module to access Prettier’s API, and your code can stay compatible with both Node and the browser as long as webpack or another bundler that supports the browser field is used. This is especially convenient for plugins.

prettier.format(code, options)
Required options:

parser (or filepath): One of these options has to be specified for Prettier to know which parser to use.

plugins: Unlike the format function from the Node.js-based API, this function doesn’t load plugins automatically. The plugins option is required because all the parsers included in the Prettier package come as plugins (for reasons of file size). These plugins are files in https://unpkg.com/browse/prettier@3.8.1/plugins. Note that estree plugin should be loaded when printing JavaScript, TypeScript, Flow, or JSON.

You need to load the ones that you’re going to use and pass them to prettier.format using the plugins option.

See below for examples.

Usage
Global

<script src="https://unpkg.com/prettier@3.8.1/standalone.js"></script>
<script src="https://unpkg.com/prettier@3.8.1/plugins/graphql.js"></script>
<script>
  (async () => {
    const formatted = await prettier.format("type Query { hello: String }", {
      parser: "graphql",
      plugins: prettierPlugins,
    });
  })();
</script>

Note that the unpkg field in Prettier’s package.json points to standalone.js, that’s why https://unpkg.com/prettier can also be used instead of https://unpkg.com/prettier/standalone.js.

ES Modules

<script type="module">
  import * as prettier from "https://unpkg.com/prettier@3.8.1/standalone.mjs";
  import * as prettierPluginGraphql from "https://unpkg.com/prettier@3.8.1/plugins/graphql.mjs";

  const formatted = await prettier.format("type Query { hello: String }", {
    parser: "graphql",
    plugins: [prettierPluginGraphql],
  });
</script>

AMD
define([
"https://unpkg.com/prettier@3.8.1/standalone.js",
"https://unpkg.com/prettier@3.8.1/plugins/graphql.js",
], async (prettier, ...plugins) => {
const formatted = await prettier.format("type Query { hello: String }", {
parser: "graphql",
plugins,
});
});

CommonJS
const prettier = require("prettier/standalone");
const plugins = [require("prettier/plugins/graphql")];

(async () => {
const formatted = await prettier.format("type Query { hello: String }", {
parser: "graphql",
plugins,
});
})();

This syntax doesn’t necessarily work in the browser, but it can be used when bundling the code with browserify, Rollup, webpack, or another bundler.

Worker
Module worker
Classic worker
import _ as prettier from "https://unpkg.com/prettier@3.8.1/standalone.mjs";
import _ as prettierPluginGraphql from "https://unpkg.com/prettier@3.8.11/plugins/graphql.mjs";

const formatted = await prettier.format("type Query { hello: String }", {
parser: "graphql",
plugins: [prettierPluginGraphql],
});

Parser plugins for embedded code
If you want to format embedded code, you need to load related plugins too. For example:

<script type="module">
  import * as prettier from "https://unpkg.com/prettier@3.8.1/standalone.mjs";
  import * as prettierPluginBabel from "https://unpkg.com/prettier@3.8.1/plugins/babel.mjs";
  import * as prettierPluginEstree from "https://unpkg.com/prettier@3.8.1/plugins/estree.mjs";

  console.log(
    await prettier.format("const html=/* HTML */ `<DIV> </DIV>`", {
      parser: "babel",
      plugins: [prettierPluginBabel, prettierPluginEstree],
    }),
  );
  // Output: const html = /* HTML */ `<DIV> </DIV>`;
</script>

The HTML code embedded in JavaScript stays unformatted because the html parser hasn’t been loaded. Correct usage:

<script type="module">
  import * as prettier from "https://unpkg.com/prettier@3.8.1/standalone.mjs";
  import * as prettierPluginBabel from "https://unpkg.com/prettier@3.8.1/plugins/babel.mjs";
  import * as prettierPluginEstree from "https://unpkg.com/prettier@3.8.1/plugins/estree.mjs";
  import * as prettierPluginHtml from "https://unpkg.com/prettier@3.8.1/plugins/html.mjs";

  console.log(
    await prettier.format("const html=/* HTML */ `<DIV> </DIV>`", {
      parser: "babel",
      plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
    }),
  );
  // Output: const html = /* HTML */ `<div></div>`;
</script>

Run Prettier on CI
GitHub Actions
To apply autofix for Prettier from GitHub Actions, do the following:

Install the autofix.ci GitHub App.

Make sure you have a pinned version of Prettier installed in your repository.

Create .github/workflows/prettier.yml with following content:

.github/workflows/prettier.yml
name: autofix.ci
on:
pull_request:
push:
permissions: {}
jobs:
prettier:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4 - run: |
yarn
yarn prettier . --write - uses: autofix-ci/action@v1
with:
commit-message: "Apply Prettier format"

For more information see autofix.ci website.
