This site uses tracking technologies. You may opt in or opt out of the use of these technologies.

Deny

Accept all

Consent Settings
Skip to content
Showcase
Docs
Blog
Templates
Enterprise
Search documentation...
⌘K

Using App Router

Features available in /app

Latest Version

16.1.6

Getting Started
Installation
Project Structure
Layouts and Pages
Linking and Navigating
Server and Client Components
Cache Components
Fetching Data
Updating Data
Caching and Revalidating
Error Handling
CSS
Image Optimization
Font Optimization
Metadata and OG images
Route Handlers
Proxy
Deploying
Upgrading
Guides
Analytics
Authentication
Backend for Frontend
Caching
CI Build Caching
Content Security Policy
CSS-in-JS
Custom Server
Data Security
Debugging
Draft Mode
Environment Variables
Forms
ISR
Instrumentation
Internationalization
JSON-LD
Lazy Loading
Development Environment
Next.js MCP Server
MDX
Memory Usage
Migrating
Multi-tenant
Multi-zones
OpenTelemetry
Package Bundling
Prefetching
Production
PWAs
Public pages
Redirecting
Sass
Scripts
Self-Hosting
SPAs
Static Exports
Tailwind CSS v3
Testing
Third Party Libraries
Upgrading
Videos
API Reference
Directives
use cache
use cache: private
use cache: remote
use client
use server
Components
Font
Form Component
Image Component
Link Component
Script Component
File-system conventions
default.js
Dynamic Segments
error.js
forbidden.js
instrumentation.js
instrumentation-client.js
Intercepting Routes
layout.js
loading.js
mdx-components.js
not-found.js
page.js
Parallel Routes
proxy.js
public
route.js
Route Groups
Route Segment Config
src
template.js
unauthorized.js
Metadata Files
Functions
after
cacheLife
cacheTag
connection
cookies
draftMode
fetch
forbidden
generateImageMetadata
generateMetadata
generateSitemaps
generateStaticParams
generateViewport
headers
ImageResponse
NextRequest
NextResponse
notFound
permanentRedirect
redirect
refresh
revalidatePath
revalidateTag
unauthorized
unstable_cache
unstable_noStore
unstable_rethrow
updateTag
useLinkStatus
useParams
usePathname
useReportWebVitals
useRouter
useSearchParams
useSelectedLayoutSegment
useSelectedLayoutSegments
userAgent
Configuration
next.config.js
TypeScript
ESLint
CLI
create-next-app
next CLI
Edge Runtime
Turbopack
Glossary
Architecture
Accessibility
Fast Refresh
Next.js Compiler
Supported Browsers
Community
Contribution Guide
Rspack
On this page
Loading Environment Variables
Loading Environment Variables with @next/env
Referencing Other Variables
Bundling Environment Variables for the Browser
Runtime Environment Variables
Test Environment Variables
Environment Variable Load Order
Good to know
Version History
Edit this page on GitHub
Scroll to top
App Router
Guides
Environment Variables
How to use environment variables in Next.js
Last updated October 8, 2025
Next.js comes with built-in support for environment variables, which allows you to do the following:

Use .env to load environment variables
Bundle environment variables for the browser by prefixing with NEXT*PUBLIC*
Warning: The default create-next-app template ensures all .env files are added to your .gitignore. You almost never want to commit these files to your repository.

Loading Environment Variables
Next.js has built-in support for loading environment variables from .env\* files into process.env.

.env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
Note: Next.js also supports multiline variables inside of your .env\* files:

# .env

# you can write with line breaks

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END DSA PRIVATE KEY-----"

# or with `\n` inside double quotes

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END DSA PRIVATE KEY-----\n"
Note: If you are using a /src folder, please note that Next.js will load the .env files only from the parent folder and not from the /src folder. This loads process.env.DB_HOST, process.env.DB_USER, and process.env.DB_PASS into the Node.js environment automatically allowing you to use them in Route Handlers.

For example:

app/api/route.js
export async function GET() {
const db = await myDB.connect({
host: process.env.DB_HOST,
username: process.env.DB_USER,
password: process.env.DB_PASS,
})
// ...
}
Loading Environment Variables with @next/env
If you need to load environment variables outside of the Next.js runtime, such as in a root config file for an ORM or test runner, you can use the @next/env package.

This package is used internally by Next.js to load environment variables from .env\* files.

To use it, install the package and use the loadEnvConfig function to load the environment variables:

npm install @next/env
envConfig.ts
TypeScript

TypeScript
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
Then, you can import the configuration where needed. For example:

orm.config.ts
TypeScript

TypeScript
import './envConfig.ts'

export default defineConfig({
dbCredentials: {
connectionString: process.env.DATABASE_URL!,
},
})
Referencing Other Variables
Next.js will automatically expand variables that use $ to reference other variables e.g. $VARIABLE inside of your .env\* files. This allows you to reference other secrets. For example:

.env
TWITTER_USER=nextjs
TWITTER_URL=https://x.com/$TWITTER_USER
In the above example, process.env.TWITTER_URL would be set to https://x.com/nextjs.

Good to know: If you need to use variable with a $ in the actual value, it needs to be escaped e.g. \$.

Bundling Environment Variables for the Browser
Non-NEXT*PUBLIC* environment variables are only available in the Node.js environment, meaning they aren't accessible to the browser (the client runs in a different environment).

In order to make the value of an environment variable accessible in the browser, Next.js can "inline" a value, at build time, into the js bundle that is delivered to the client, replacing all references to process.env.[variable] with a hard-coded value. To tell it to do this, you just have to prefix the variable with NEXT*PUBLIC*. For example:

Terminal
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
This will tell Next.js to replace all references to process.env.NEXT_PUBLIC_ANALYTICS_ID in the Node.js environment with the value from the environment in which you run next build, allowing you to use it anywhere in your code. It will be inlined into any JavaScript sent to the browser.

Note: After being built, your app will no longer respond to changes to these environment variables. For instance, if you use a Heroku pipeline to promote slugs built in one environment to another environment, or if you build and deploy a single Docker image to multiple environments, all NEXT*PUBLIC* variables will be frozen with the value evaluated at build time, so these values need to be set appropriately when the project is built. If you need access to runtime environment values, you'll have to setup your own API to provide them to the client (either on demand or during initialization).

pages/index.js
import setupAnalyticsService from '../lib/my-analytics-service'

// 'NEXT*PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC*'.
// It will be transformed at build time to `setupAnalyticsService('abcdefghijk')`.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
return <h1>Hello World</h1>
}

export default HomePage
Note that dynamic lookups will not be inlined, such as:

// This will NOT be inlined, because it uses a variable
const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
setupAnalyticsService(process.env[varName])

// This will NOT be inlined, because it uses a variable
const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)
Runtime Environment Variables
Next.js can support both build time and runtime environment variables.

By default, environment variables are only available on the server. To expose an environment variable to the browser, it must be prefixed with NEXT*PUBLIC*. However, these public environment variables will be inlined into the JavaScript bundle during next build.

You can safely read environment variables on the server during dynamic rendering:

app/page.ts
TypeScript

TypeScript
import { connection } from 'next/server'

export default async function Component() {
await connection()
// cookies, headers, and other Dynamic APIs
// will also opt into dynamic rendering, meaning
// this env variable is evaluated at runtime
const value = process.env.MY_VALUE
// ...
}
This allows you to use a singular Docker image that can be promoted through multiple environments with different values.

Good to know:

You can run code on server startup using the register function.
Test Environment Variables
Apart from development and production environments, there is a 3rd option available: test. In the same way you can set defaults for development or production environments, you can do the same with a .env.test file for the testing environment (though this one is not as common as the previous two). Next.js will not load environment variables from .env.development or .env.production in the testing environment.

This one is useful when running tests with tools like jest or cypress where you need to set specific environment vars only for testing purposes. Test default values will be loaded if NODE_ENV is set to test, though you usually don't need to do this manually as testing tools will address it for you.

There is a small difference between test environment, and both development and production that you need to bear in mind: .env.local won't be loaded, as you expect tests to produce the same results for everyone. This way every test execution will use the same env defaults across different executions by ignoring your .env.local (which is intended to override the default set).

Good to know: similar to Default Environment Variables, .env.test file should be included in your repository, but .env.test.local shouldn't, as .env\*.local are intended to be ignored through .gitignore.

While running unit tests you can make sure to load your environment variables the same way Next.js does by leveraging the loadEnvConfig function from the @next/env package.

// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from '@next/env'

export default async () => {
const projectDir = process.cwd()
loadEnvConfig(projectDir)
}
Environment Variable Load Order
Environment variables are looked up in the following places, in order, stopping once the variable is found.

process.env
.env.$(NODE_ENV).local
.env.local (Not checked when NODE_ENV is test.)
.env.$(NODE_ENV)
.env
For example, if NODE_ENV is development and you define a variable in both .env.development.local and .env, the value in .env.development.local will be used.

Good to know: The allowed values for NODE_ENV are production, development and test.

Good to know
If you are using a /src directory, .env.\* files should remain in the root of your project.
If the environment variable NODE*ENV is unassigned, Next.js automatically assigns development when running the next dev command, or production for all other commands.
Version History
Version Changes
v9.4.0 Support .env and NEXT_PUBLIC* introduced.
Previous
Draft Mode
Next
Forms
Was this helpful?

Your feedback...
supported.
Resources
Docs
Support Policy
Learn
Showcase
Blog
Team
Analytics
Next.js Conf
Previews
Evals
More
Next.js Commerce
Contact Sales
Community
GitHub
Releases
Telemetry
Governance
About Vercel
Next.js + Vercel
Open Source Software
GitHub
Bluesky
X
Legal
Privacy Policy
Cookie Preferences
Subscribe to our newsletter
Stay updated on new releases and features, guides, and case studies.

you@domain.com
Subscribe
© 2026 Vercel, Inc.

Guides: Environment Variables | Next.js
