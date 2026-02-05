Skip to main content

Prettier
stable
Playground
Docs
Blog
Donate

About
What is Prettier?
Why Prettier?
Prettier vs. Linters
Option Philosophy
Rationale
Usage
Install
Ignoring Code
Integrating with Linters
Pre-commit Hook
Plugins
CLI
API
Browser
Run Prettier on CI
Configuring Prettier
Options
Configuration File
Sharing configurations
Editors
Editor Integration
WebStorm Setup
Vim Setup
Watching For Changes
Misc
Technical Details
Related Projects
For Enterprise
What is Prettier?
Prettier is an opinionated code formatter with support for:

JavaScript (including experimental features)
JSX
Angular
Vue
Flow
TypeScript
CSS, Less, and SCSS
HTML
Ember/Handlebars
JSON
GraphQL
Markdown, including GFM and MDX v1
YAML
It removes all original styling\* and ensures that all outputted code conforms to a consistent style. (See this blog post)

Prettier takes your code and reprints it from scratch by taking the line length into account.

For example, take the following code:

foo(arg1, arg2, arg3, arg4);

It fits in a single line so it’s going to stay as is. However, we've all run into this situation:

foo(reallyLongArg(), omgSoManyParameters(), IShouldRefactorThis(), isThereSeriouslyAnotherOne());

Suddenly our previous format for calling function breaks down because this is too long. Prettier is going to do the painstaking work of reprinting it like that for you:

foo(
reallyLongArg(),
omgSoManyParameters(),
IShouldRefactorThis(),
isThereSeriouslyAnotherOne(),
);

Prettier enforces a consistent code style (i.e. code formatting that won’t affect the AST) across your entire codebase because it disregards the original styling\* by parsing it away and re-printing the parsed AST with its own rules that take the maximum line length into account, wrapping code when necessary.

If you want to learn more, these two conference talks are great introductions:

A Prettier Printer by James Long on React Conf 2017

JavaScript Code Formatting by Christopher Chedeau on React London 2017

Footnotes

- Well actually, some original styling is preserved when practical—see empty lines and multi-line objects.

Edit this page
Next
Why Prettier?
Docs
About
Usage
Deploys by Netlify
Community
User Showcase
Stack Overflow
@PrettierCode on X
More
Blog
GitHub
Issues
Star this project on GitHub
Skip to main content

Prettier
stable
Playground
Docs
Blog
Donate

About
What is Prettier?
Why Prettier?
Prettier vs. Linters
Option Philosophy
Rationale
Usage
Install
Ignoring Code
Integrating with Linters
Pre-commit Hook
Plugins
CLI
API
Browser
Run Prettier on CI
Configuring Prettier
Options
Configuration File
Sharing configurations
Editors
Editor Integration
WebStorm Setup
Vim Setup
Watching For Changes
Misc
Technical Details
Related Projects
For Enterprise
Why Prettier?
Building and enforcing a style guide
By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles. It is generally accepted that having a common style guide is valuable for a project and team but getting there is a very painful and unrewarding process. People get very emotional around particular ways of writing code and nobody likes spending time writing and receiving nits.

So why choose the “Prettier style guide” over any other random style guide? Because Prettier is the only “style guide” that is fully automatic. Even if Prettier does not format all code 100% the way you’d like, it’s worth the “sacrifice” given the unique benefits of Prettier, don’t you think?

“We want to free mental threads and end discussions around style. While sometimes fruitful, these discussions are for the most part wasteful.”
“Literally had an engineer go through a huge effort of cleaning up all of our code because we were debating ternary style for the longest time and were inconsistent about it. It was dumb, but it was a weird on-going “great debate” that wasted lots of little back and forth bits. It’s far easier for us all to agree now: just run Prettier, and go with that style.”
“Getting tired telling people how to style their product code.”
“Our top reason was to stop wasting our time debating style nits.”
“Having a githook set up has reduced the amount of style issues in PRs that result in broken builds due to ESLint rules or things I have to nit-pick or clean up later.”
“I don’t want anybody to nitpick any other person ever again.”
“It reminds me of how Steve Jobs used to wear the same clothes every day because he has a million decisions to make and he didn’t want to be bothered to make trivial ones like picking out clothes. I think Prettier is like that.”
Helping Newcomers
Prettier is usually introduced by people with experience in the current codebase and JavaScript but the people that disproportionally benefit from it are newcomers to the codebase. One may think that it’s only useful for people with very limited programming experience, but we've seen it quicken the ramp up time from experienced engineers joining the company, as they likely used a different coding style before, and developers coming from a different programming language.

“My motivations for using Prettier are: appearing that I know how to write JavaScript well.”
“I always put spaces in the wrong place, now I don’t have to worry about it anymore.”
“When you're a beginner you're making a lot of mistakes caused by the syntax. Thanks to Prettier, you can reduce these mistakes and save a lot of time to focus on what really matters.”
“As a teacher, I will also tell to my students to install Prettier to help them to learn the JS syntax and have readable files.”
Writing code
What usually happens once people are using Prettier is that they realize that they actually spend a lot of time and mental energy formatting their code. With Prettier editor integration, you can just press that magic key binding and poof, the code is formatted. This is an eye opening experience if anything else.

“I want to write code. Not spend cycles on formatting.”
“It removed 5% that sucks in our daily life - aka formatting”
“We're in 2017 and it’s still painful to break a call into multiple lines when you happen to add an argument that makes it go over the 80 columns limit :(“
Easy to adopt
We've worked very hard to use the least controversial coding styles, went through many rounds of fixing all the edge cases and polished the getting started experience. When you're ready to push Prettier into your codebase, not only should it be painless for you to do it technically but the newly formatted codebase should not generate major controversy and be accepted painlessly by your co-workers.

“It’s low overhead. We were able to throw Prettier at very different kinds of repos without much work.”
“It’s been mostly bug free. Had there been major styling issues during the course of implementation we would have been wary about throwing this at our JS codebase. I’m happy to say that’s not the case.”
“Everyone runs it as part of their pre commit scripts, a couple of us use the editor on save extensions as well.”
“It’s fast, against one of our larger JS codebases we were able to run Prettier in under 13 seconds.”
“The biggest benefit for Prettier for us was being able to format the entire code base at once.”
Clean up an existing codebase
Since coming up with a coding style and enforcing it is a big undertaking, it often slips through the cracks and you are left working on inconsistent codebases. Running Prettier in this case is a quick win, the codebase is now uniform and easier to read without spending hardly any time.

“Take a look at the code :) I just need to restore sanity.”
“We inherited a ~2000 module ES6 code base, developed by 20 different developers over 18 months, in a global team. Felt like such a win without much research.”
Ride the hype train
Purely technical aspects of the projects aren’t the only thing people look into when choosing to adopt Prettier. Who built and uses it and how quickly it spreads through the community has a non-trivial impact.

“The amazing thing, for me, is: 1) Announced 2 months ago. 2) Already adopted by, it seems, every major JS project. 3) 7000 stars, 100,000 npm downloads/mo”
“Was built by the same people as React & React Native.”
“I like to be part of the hot new things.”
“Because soon enough people are gonna ask for it.”
Edit this page
Previous
What is Prettier?
Next
Prettier vs. Linters
Building and enforcing a style guide
Helping Newcomers
Writing code
Easy to adopt
Clean up an existing codebase
Ride the hype train
Docs
About
Usage
Deploys by Netlify
Community
User Showcase
Stack Overflow
@PrettierCode on X
More
Blog
GitHub
Issues
Star this project on GitHub
Prettier vs. Linters
How does it compare to ESLint/TSLint/stylelint, etc.?
Linters have two categories of rules:

Formatting rules: eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…

Prettier alleviates the need for this whole category of rules! Prettier is going to reprint the entire program from scratch in a consistent way, so it’s not possible for the programmer to make a mistake there anymore :)

Code-quality rules: eg no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…

Prettier does nothing to help with those kind of rules. They are also the most important ones provided by linters as they are likely to catch real bugs with your code!

In other words, use Prettier for formatting and linters for catching bugs!
Option Philosophy
info
Prettier has a few options because of history. But we won’t add more of them.

Read on to learn more.

Prettier is not a kitchen-sink code formatter that attempts to print your code in any way you wish. It is opinionated. Quoting the Why Prettier? page:

By far the biggest reason for adopting Prettier is to stop all the ongoing debates over styles.

Yet the more options Prettier has, the further from the above goal it gets. The debates over styles just turn into debates over which Prettier options to use. Formatting wars break out with renewed vigour: “Which option values are better? Why? Did we make the right choices?”

And it’s not the only cost options have. To learn more about their downsides, see the issue about resisting adding configuration, which has more 👍s than any option request issue.

So why are there any options at all?

A few were added during Prettier’s infancy to make it take off at all. 🚀
A couple were added after “great demand.” 🤔
Some were added for compatibility reasons. 👍
Options that are easier to motivate include:

--trailing-comma es5 lets you use trailing commas in most environments without having to transpile (trailing function commas were added in ES2017).
--prose-wrap is important to support all quirky Markdown renderers in the wild.
--html-whitespace-sensitivity is needed due to the unfortunate whitespace rules of HTML.
--end-of-line makes it easier for teams to keep CRLFs out of their git repositories.
--quote-props is important for advanced usage of the Google Closure Compiler.
But other options are harder to motivate in hindsight: --arrow-parens, --jsx-single-quote, --bracket-same-line and --no-bracket-spacing are not the type of options we’re happy to have. They cause a lot of bike-shedding in teams, and we’re sorry for that. Difficult to remove now, these options exist as a historical artifact and should not motivate adding more options (“If those options exist, why can’t this one?”).

For a long time, we left option requests open in order to let discussions play out and collect feedback. What we’ve learned during those years is that it’s really hard to measure demand. Prettier has grown a lot in usage. What was “great demand” back in the day is not as much today. GitHub reactions and Twitter polls became unrepresentative. What about all silent users? It looked easy to add “just one more” option. But where should we have stopped? When is one too many? Even after adding “that one final option”, there would always be a “top issue” in the issue tracker.

However, the time to stop has come. Now that Prettier is mature enough and we see it adopted by so many organizations and projects, the research phase is over. We have enough confidence to conclude that Prettier reached a point where the set of options should be “frozen”. Option requests aren’t accepted anymore. We’re thankful to everyone who participated in this difficult journey.

Please note that as option requests are out of scope for Prettier, they will be closed without discussion. The same applies to requests to preserve elements of input formatting (e.g. line breaks) since that’s nothing else but an option in disguise with all the downsides of “real” options. There may be situations where adding an option can’t be avoided because of technical necessity (e.g. compatibility), but for formatting-related options, this is final.
Rationale
Prettier is an opinionated code formatter. This document explains some of its choices.

What Prettier is concerned about
Correctness
The first requirement of Prettier is to output valid code that has the exact same behavior as before formatting. Please report any code where Prettier fails to follow these correctness rules — that’s a bug which needs to be fixed!

Strings
Double or single quotes? Prettier chooses the one which results in the fewest number of escapes. "It's gettin' better!", not 'It\'s gettin\' better!'. In case of a tie or the string not containing any quotes, Prettier defaults to double quotes (but that can be changed via the singleQuote option).

JSX has its own option for quotes: jsxSingleQuote. JSX takes its roots from HTML, where the dominant use of quotes for attributes is double quotes. Browser developer tools also follow this convention by always displaying HTML with double quotes, even if the source code uses single quotes. A separate option allows using single quotes for JS and double quotes for "HTML" (JSX).

Prettier maintains the way your string is escaped. For example, "🙂" won’t be formatted into "\uD83D\uDE42" and vice versa.

Empty lines
It turns out that empty lines are very hard to automatically generate. The approach that Prettier takes is to preserve empty lines the way they were in the original source code. There are two additional rules:

Prettier collapses multiple blank lines into a single blank line.
Empty lines at the start and end of blocks (and whole files) are removed. (Files always end with a single newline, though.)
Multi-line objects
By default, Prettier’s printing algorithm prints expressions on a single line if they fit. Objects are used for a lot of different things in JavaScript, though, and sometimes it really helps readability if they stay multiline. See object lists, nested configs, stylesheets and keyed methods, for example. We haven’t been able to find a good rule for all those cases, so by default Prettier keeps objects multi-line if there’s a newline between the { and the first key in the original source code. Consequently, long single-line objects are automatically expanded, but short multi-line objects are never collapsed.

You can disable this conditional behavior with the objectWrap option.

Tip: If you have a multi-line object that you’d like to join up into a single line:

const user = {
name: "John Doe",
age: 30,
};

…all you need to do is remove the newline after {:

const user = { name: "John Doe",
age: 30
};

…and then run Prettier:

const user = { name: "John Doe", age: 30 };

And if you’d like to go multi-line again, add in a newline after {:

const user = {
name: "John Doe", age: 30 };

…and run Prettier:

const user = {
name: "John Doe",
age: 30,
};

A note on formatting reversibility
The semi-manual formatting for object literals is in fact a workaround, not a feature. It was implemented only because at the time a good heuristic wasn’t found and an urgent fix was needed. However, as a general strategy, Prettier avoids non-reversible formatting like that, so the team is still looking for heuristics that would allow either to remove this behavior completely or at least to reduce the number of situations where it’s applied.

What does reversible mean? Once an object literal becomes multiline, Prettier won’t collapse it back. If in Prettier-formatted code, we add a property to an object literal, run Prettier, then change our mind, remove the added property, and then run Prettier again, we might end up with a formatting not identical to the initial one. This useless change might even get included in a commit, which is exactly the kind of situation Prettier was created to prevent.

Decorators
Just like with objects, decorators are used for a lot of different things. Sometimes it makes sense to write decorators above the line they're decorating, sometimes it’s nicer if they're on the same line. We haven’t been able to find a good rule for this, so Prettier keeps your decorator positioned like you wrote them (if they fit on the line). This isn’t ideal, but a pragmatic solution to a difficult problem.

@Component({
selector: "hero-button",
template: `<button>{{ label }}</button>`,
})
class HeroButtonComponent {
// These decorators were written inline and fit on the line so they stay
// inline.
@Output() change = new EventEmitter();
@Input() label: string;

// These were written multiline, so they stay multiline.
@readonly
@nonenumerable
NODE_TYPE: 2;
}

There’s one exception: classes. We don’t think it ever makes sense to inline the decorators for them, so they are always moved to their own line.

// Before running Prettier:
@observer class OrderLine {
@observable price: number = 0;
}

// After running Prettier:
@observer
class OrderLine {
@observable price: number = 0;
}

Note: Prettier 1.14.x and older tried to automatically move your decorators, so if you've run an older Prettier version on your code you might need to manually join up some decorators here and there to avoid inconsistencies:

@observer
class OrderLine {
@observable price: number = 0;
@observable
amount: number = 0;
}

Template literals
Template literals can contain interpolations. Deciding whether it's appropriate to insert a linebreak within an interpolation unfortunately depends on the semantic content of the template - for example, introducing a linebreak in the middle of a natural-language sentence is usually undesirable. Since Prettier doesn't have enough information to make this decision itself, it uses a heuristic similar to that used for objects: it will only split an interpolation expression across multiple lines if there was already a linebreak within that interpolation.

This means that a literal like the following will not be broken onto multiple lines, even if it exceeds the print width:

`this is a long message which contains an interpolation: ${format(data)} <- like this`;

If you want Prettier to split up an interpolation, you'll need to ensure there's a linebreak somewhere within the ${...}. Otherwise it will keep everything on a single line, no matter how long it is.

The team would prefer not to depend on the original formatting in this way, but it's the best heuristic we have at the moment.

Semicolons
This is about using the noSemi option.

Consider this piece of code:

if (shouldAddLines) {
[-1, 1].forEach(delta => addLine(delta \* 20))
}

While the above code works just fine without semicolons, Prettier actually turns it into:

if (shouldAddLines) {
;[-1, 1].forEach(delta => addLine(delta \* 20))
}

This is to help you avoid mistakes. Imagine Prettier not inserting that semicolon and adding this line:

if (shouldAddLines) {

- console.log('Do we even get here??')
  [-1, 1].forEach(delta => addLine(delta \* 20))
  }

Oops! The above actually means:

if (shouldAddLines) {
console.log('Do we even get here??')[-1, 1].forEach(delta => addLine(delta \* 20))
}

With a semicolon in front of that [ such issues never happen. It makes the line independent of other lines so you can move and add lines without having to think about ASI rules.

This practice is also common in standard which uses a semicolon-free style.

Note that if your program currently has a semicolon-related bug in it, Prettier will not auto-fix the bug for you. Remember, Prettier only reformats code, it does not change the behavior of the code. Take this buggy piece of code as an example, where the developer forgot to place a semicolon before the (:

console.log('Running a background task')
(async () => {
await doBackgroundWork()
})()

If you feed this into Prettier, it will not alter the behavior of this code, instead, it will reformat it in a way that shows how this code will actually behave when ran.

console.log("Running a background task")(async () => {
await doBackgroundWork();
})();

Print width
The printWidth option is more of a guideline to Prettier than a hard rule. It is not the upper allowed line length limit. It is a way to say to Prettier roughly how long you’d like lines to be. Prettier will make both shorter and longer lines, but generally strive to meet the specified print width.

There are some edge cases, such as really long string literals, regexps, comments and variable names, which cannot be broken across lines (without using code transforms which Prettier doesn’t do). Or if you nest your code 50 levels deep your lines are of course going to be mostly indentation :)

Apart from that, there are a few cases where Prettier intentionally exceeds the print width.

Imports
Prettier can break long import statements across several lines:

import {
CollectionDashboard,
DashboardPlaceholder,
} from "../components/collections/collection-dashboard/main";

The following example doesn’t fit within the print width, but Prettier prints it in a single line anyway:

import { CollectionDashboard } from "../components/collections/collection-dashboard/main";

This might be unexpected by some, but we do it this way since it was a common request to keep imports with single elements in a single line. The same applies for require calls.

Testing functions
Another common request was to keep lengthy test descriptions in one line, even if it gets too long. In such cases, wrapping the arguments to new lines doesn’t help much.

describe("NodeRegistry", () => {
it("makes no request if there are no nodes to prefetch, even if the cache is stale", async () => {
// The above line exceeds the print width but stayed on one line anyway.
});
});

Prettier has special cases for common testing framework functions such as describe, it and test.

JSX
Prettier prints things a little differently compared to other JS when JSX is involved:

function greet(user) {
return user
? `Welcome back, ${user.name}!`
: "Greetings, traveler! Sign up today!";
}

function Greet({ user }) {
return (
<div>
{user ? (
<p>Welcome back, {user.name}!</p>
) : (
<p>Greetings, traveler! Sign up today!</p>
)}
</div>
);
}

There are two reasons.

First off, lots of people already wrapped their JSX in parentheses, especially in return statements. Prettier follows this common style.

Secondly, the alternate formatting makes it easier to edit the JSX. It is easy to leave a semicolon behind. As opposed to normal JS, a leftover semicolon in JSX can end up as plain text showing on your page.

<div>
  <p>Greetings, traveler! Sign up today!</p>; {/* <-- Oops! */}
</div>

Comments
When it comes to the content of comments, Prettier can’t do much really. Comments can contain everything from prose to commented out code and ASCII diagrams. Since they can contain anything, Prettier can’t know how to format or wrap them. So they are left as-is. The only exception to this are JSDoc-style comments (block comments where every line starts with a \*), which Prettier can fix the indentation of.

Then there’s the question of where to put the comments. Turns out this is a really difficult problem. Prettier tries its best to keep your comments roughly where they were, but it’s no easy task because comments can be placed almost anywhere.

Generally, you get the best results when placing comments on their own lines, instead of at the end of lines. Prefer // eslint-disable-next-line over // eslint-disable-line.

Note that “magic comments” such as eslint-disable-next-line and $FlowFixMe might sometimes need to be manually moved due to Prettier breaking an expression into multiple lines.

Imagine this piece of code:

// eslint-disable-next-line no-eval
const result = safeToEval ? eval(input) : fallback(input);

Then you need to add another condition:

// eslint-disable-next-line no-eval
const result = safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);

Prettier will turn the above into:

// eslint-disable-next-line no-eval
const result =
safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);

Which means that the eslint-disable-next-line comment is no longer effective. In this case you need to move the comment:

const result =
// eslint-disable-next-line no-eval
safeToEval && settings.allowNativeEval ? eval(input) : fallback(input);

If possible, prefer comments that operate on line ranges (e.g. eslint-disable and eslint-enable) or on the statement level (e.g. /_ istanbul ignore next _/), they are even safer. It’s possible to disallow using eslint-disable-line and eslint-disable-next-line comments using eslint-plugin-eslint-comments.

Disclaimer about non-standard syntax
Prettier is often able to recognize and format non-standard syntax such as ECMAScript early-stage proposals and Markdown syntax extensions not defined by any specification. The support for such syntax is considered best-effort and experimental. Incompatibilities may be introduced in any release and should not be viewed as breaking changes.

Disclaimer about machine-generated files
Some files, like package.json or composer.lock, are machine-generated and regularly updated by the package manager. If Prettier were to use the same JSON formatting rules as with other files, it would regularly conflict with these other tools. To avoid this inconvenience, Prettier will use a formatter based on JSON.stringify on such files instead. You may notice these differences, such as the removal of vertical whitespace, but this is an intended behavior.

What Prettier is not concerned about
Prettier only prints code. It does not transform it. This is to limit the scope of Prettier. Let’s focus on the printing and do it really well!

Here are a few examples of things that are out of scope for Prettier:

Turning single- or double-quoted strings into template literals or vice versa.
Using + to break long string literals into parts that fit the print width.
Adding/removing {} and return where they are optional.
Turning ?: into if-else statements.
Sorting/moving imports, object keys, class members, JSX keys, CSS properties or anything else. Apart from being a transform rather than just printing (as mentioned above), sorting is potentially unsafe because of side effects (for imports, as an example) and makes it difficult to verify the most important correctness goal.
Edit this page
