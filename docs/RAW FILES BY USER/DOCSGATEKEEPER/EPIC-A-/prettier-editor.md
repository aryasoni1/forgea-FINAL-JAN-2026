Editor Integration
To get the most out of Prettier, it’s recommended to run it from your editor.

If your editor does not support Prettier, you can instead run Prettier with a file watcher.

Note! It’s important to install Prettier locally in every project, so each project gets the correct Prettier version.

Visual Studio Code
prettier-vscode can be installed using the extension sidebar – it’s called “Prettier - Code formatter.” Check its repository for configuration and shortcuts.

If you’d like to toggle the formatter on and off, install vscode-status-bar-format-toggle.

Emacs
Check out the prettier-emacs repo, or prettier.el. The package Apheleia supports multiple code formatters, including Prettier.

Vim
vim-prettier is a Prettier-specific Vim plugin. Neoformat, ALE, and coc-prettier are multi-language Vim linter/formatter plugins that support Prettier.

For more details see the Vim setup guide.

Helix
A formatter can be specified in your Helix language configuration, which will take precedence over any language servers.

For more details see the Helix external binary formatter configuration for Prettier.

Sublime Text
Sublime Text support is available through Package Control and the JsPrettier plug-in.

JetBrains WebStorm, PHPStorm, PyCharm...
See the WebStorm setup guide.

Visual Studio
Install the JavaScript Prettier extension.

Espresso
Espresso users can install the espresso-prettier plugin.
Watching For Changes
You can have Prettier watch for changes from the command line by using onchange. For example:

npx onchange "\*_/_" -- npx prettier --write --ignore-unknown {{changed}}

Or add the following to your package.json:

{
"scripts": {
"prettier-watch": "onchange \"\*_/_\" -- prettier --write --ignore-unknown {{changed}}"
}
}
Vim Setup
Vim users can install either vim-prettier, which is Prettier specific, or Neoformat or ALE which are generalized lint/format engines with support for Prettier.

vim-prettier
See the vim-prettier readme for installation and usage instructions.

Neoformat
The best way to install Neoformat is with your favorite plugin manager for Vim, such as vim-plug:

Plug 'sbdchd/neoformat'

In order for Neoformat to use a project-local version of Prettier (i.e. to use node_modules/.bin/prettier instead of looking for prettier on $PATH), you must set the neoformat_try_node_exe option:

let g:neoformat_try_node_exe = 1

Run :Neoformat or :Neoformat prettier in a supported file to run Prettier.

To have Neoformat run Prettier on save:

autocmd BufWritePre \*.js Neoformat

You can also make Vim format your code more frequently, by setting an autocmd for other events. Here are a couple of useful ones:

TextChanged: after a change was made to the text in Normal mode
InsertLeave: when leaving Insert mode
For example, you can format on both of the above events together with BufWritePre like this:

autocmd BufWritePre,TextChanged,InsertLeave \*.js Neoformat

See :help autocmd-events in Vim for details.

It’s recommended to use a config file, but you can also add options in your .vimrc:

autocmd FileType javascript setlocal formatprg=prettier\ --single-quote\ --trailing-comma\ es5
" Use formatprg when available
let g:neoformat_try_formatprg = 1

Each space in Prettier options should be escaped with \.

ALE
ALE requires either Vim 8 or Neovim as ALE makes use of the asynchronous abilities that both Vim 8 and Neovim provide.

The best way to install ALE is with your favorite plugin manager for Vim, such as vim-plug:

Plug 'dense-analysis/ale'

You can find further instructions on the ALE repository.

ALE will try to use Prettier installed locally before looking for a global installation.

Enable the Prettier fixer for the languages you use:

let g:ale_fixers = {
\ 'javascript': ['prettier'],
\ 'css': ['prettier'],
\}

ALE supports both linters and fixers. If you don’t specify which linters to run, all available tools for all supported languages will be run, and you might get a correctly formatted file with a bunch of lint errors. To disable this behavior you can tell ALE to run only linters you've explicitly configured (more info in the FAQ):

let g:ale_linters_explicit = 1

You can then run :ALEFix in a JavaScript or CSS file to run Prettier.

To have ALE run Prettier on save:

let g:ale_fix_on_save = 1

It’s recommended to use a config file, but you can also add options in your .vimrc:

let g:ale_javascript_prettier_options = '--single-quote --trailing-comma all'

coc-prettier
Prettier extension for coc.nvim which requires neovim or vim8.1. Install coc.nvim with your favorite plugin manager, such as vim-plug:

Plug 'neoclide/coc.nvim', {'branch': 'release'}

And install coc-prettier by command:

CocInstall coc-prettier

Setup Prettier command in your init.vim or .vimrc

command! -nargs=0 Prettier :call CocAction('runCommand', 'prettier.formatFile')

Update your coc-settings.json for languages that you want format on save.

{
"coc.preferences.formatOnSaveFiletypes": ["css", "markdown"]
}

coc-prettier have same configurations of prettier-vscode, open coc-settings.json by :CocConfig to get autocompletion support.

Running manually
If you want something really bare-bones, you can create a custom key binding. In this example, gp (mnemonic: "get pretty") is used to run prettier (with options) in the currently active buffer:

nnoremap gp :silent %!prettier --stdin-filepath %<CR>

Note that if there’s a syntax error in your code, the whole buffer will be replaced with an error message. You’ll need to press u to get your code back.

Another disadvantage of this approach is that the cursor position won’t be preserved.
