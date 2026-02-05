Home Guide Reference Blog GitHub
Guide

Introduction
Features
Why Volta?
How does it work?
Getting Started
Understanding Volta
Managing your toolchain
Managing your project
Reference

Advanced

Contributing

Introduction
Welcome to Volta!

Volta is a hassle-free way to manage your JavaScript command-line tools.

Features
Speed ⚡
Seamless, per-project version switching
Cross-platform support, including Windows and all Unix shells
Support for multiple package managers
Stable tool installation—no reinstalling on every Node upgrade!
Extensibility hooks for site-specific customization
Why Volta?
Volta’s job is to get out of your way.

With Volta, you can select a Node engine once and then stop worrying about it. You can switch between projects and stop having to manually switch between Nodes. You can install npm package binaries in your toolchain without having to periodically reinstall them or figure out why they’ve stopped working.

Quickly set up and switch Node engines
Fetch and use a particular version of Node:

volta install node@22
You should notice right away how responsive the tool is. Your development time is precious! JavaScript developers deserve snappy tools. 🙂

Reproducible environments for collaborators
Volta lets you choose your Node engine and package manager for a project once with one command:

volta pin node@20
Volta saves the exact version of the Node engine in your package.json so you can commit your selection to git. From that point on, every time you run Node inside your project directory, Volta automatically switches to that same version of Node you chose. Similarly, all your collaborators can do the same by installing Volta on their development machine.

Install and forget
Volta also lets you install your favorite package binaries as command-line tools, without worrying about them interfering with your development projects. Even better, these tools get pinned to a particular Node engine at installation time and don’t change unless you explicitly tell them to. This means that once a tool works, it keeps working.

npm install -g surge
surge -h
How does it work?
Volta does not use any fancy OS features or shell-specific hooks. It’s built on the simple, proven approach of shims.

Whenever you install a tool with Volta, it adds a shim to your PATH that acts as an intelligent (and fast) router to the right version of the tool and runs it with the right Node engine.

Volta is easy to install, with no external dependencies, because it’s built in Rust as a single, fast native executable.

← Volta DocsGetting Started →

Home Guide Reference Blog GitHub
Guide

Introduction
Features
Why Volta?
How does it work?
Getting Started
Understanding Volta
Managing your toolchain
Managing your project
Reference

Advanced

Contributing

Getting Started
Install Volta
Unix Installation
On most Unix systems including macOS, you can install Volta with a single command:

curl https://get.volta.sh | bash
For bash, zsh, and fish, this installer will automatically update your console startup script. If you wish to prevent modifications to your console startup script, see Skipping Volta Setup. To manually configure your shell to use Volta, edit your console startup scripts to:

Set the VOLTA_HOME variable to $HOME/.volta
Add $VOLTA_HOME/bin to the beginning of your PATH variable
Windows Installation
For Windows, the recommended method of installing Volta is using winget:

winget install Volta.Volta
If you prefer, you can download the installer directly and run it manually to install Volta.

Windows Subsystem for Linux
If you are using Volta within the Windows Subsystem for Linux, follow the Unix installation guide above.

Select a default Node version
This is the version that Volta will use everywhere outside of projects that have a pinned version.

To select a specific version of Node, run:

volta install node@22.5.1
Or to use the latest LTS version, run:

volta install node
← IntroductionUnderstanding Volta →

Home Guide Reference Blog GitHub
Guide

Introduction
Features
Why Volta?
How does it work?
Getting Started
Understanding Volta
Managing your toolchain
Managing your project
Reference

Advanced

Contributing

Understanding Volta
Volta’s job is to manage your JavaScript command-line tools, such as node, npm, yarn, or executables shipped as part of JavaScript packages.

Similar to package managers, Volta keeps track of which project (if any) you’re working on based on your current directory. The tools in your Volta toolchain automatically detect when you’re in a project that’s using a particular version of the tools, and take care of routing to the right version of the tools for you.

Managing your toolchain
You control the tools managed by your Volta toolchain with two commands: volta install and volta uninstall.

Installing Node engines
To install a tool to your toolchain, you set the default version of that tool. Volta will always use this default, unless you’re working within a project directory that has configured Volta to use a different version. When you choose a default version, Volta will also download that version to the local cache.

For example, you can select an exact version of node to be your default version:

volta install node@22.5.1
You don’t need to specify a precise version, in which case Volta will choose a suitable version to match your request:

volta install node@22
You can also specify latest—or even leave off the version entirely, and Volta will choose the latest LTS release:

volta install node
Once you’ve run one of these commands, the node executable provided by Volta in your PATH environment (or Path in Windows) will, by default, automatically run your chosen version of Node.

Similarly, you can choose versions of the npm and Yarn package managers with volta install npm and volta install yarn, respectively. These tools will run using the default version of Node you selected.

Installing package binaries
With Volta, installing a command-line tool globally with your package manager also adds it to your toolchain. For example, the vuepress package includes an executable of the same name:

yarn global add vuepress
When you install a package to your toolchain, Volta takes your current default Node version and pins the tool to that engine (see Package Binaries for more information). Volta won’t change the tool’s pinned engine unless you update the tool, no matter what. This way, you can be confident that your installed tools don’t change behind your back.

Managing your project
Volta allows a team or community of collaborators to standardize on the development tools they use for their project.

Pinning Node engines
The volta pin command allows you to choose your Node engine and package manager versions for a project:

volta pin node@20.16
volta pin yarn@1.19
Volta stores this in your package.json so you can commit your choice of tools to version control:

"volta": {
"node": "20.16.0",
"yarn": "1.19.2"
}
This way, everyone who uses Volta to work on the project automatically gets the same version you selected.

node --version # 20.16.0
yarn --version # 1.19.2
Using project tools
The node and package manager executables aren’t the only smart tools in your toolchain: the package binaries in your toolchain are also aware of your current directory, and respect the configuration of the project you’re in.

For example, installing the Typescript package will add the compiler executable—tsc— to your toolchain:

npm install --global typescript
Depending on the project you’re in, this executable will switch to the project’s chosen version of TypeScript:

cd /path/to/project-using-typescript-4.9.5
tsc --version # 4.9.5

cd /path/to/project-using-typescript-5.5.4
tsc --version # 5.5.4
Safety and convenience
Because Volta’s toolchain always keeps track of where you are, it makes sure the tools you use always respect the settings of the project you’re working on. This means you don’t have to worry about changing the state of your installed software when switching between projects.

What’s more, Volta covers its tracks whenever it runs a tool, making sure your npm or Yarn scripts never see what’s in your toolchain.

These two features combined mean that Volta solves the problem of global packages. In other words, Volta gives you the convenience of global package installations, but without the danger.

For example, you can safely install TypeScript with npm i -g typescript—and enjoy the convenience of being able to call tsc directly from your console—without worrying that your project’s package scripts might accidentally depend on the global state of your machine.

Enjoy!

← Getting StartedVolta Commands →
