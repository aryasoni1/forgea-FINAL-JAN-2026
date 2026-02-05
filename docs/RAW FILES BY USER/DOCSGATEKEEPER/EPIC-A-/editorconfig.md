EditorConfig mouse head
What is EditorConfig?
Example File
File Location
File Format Details
No Plugin Necessary
Download a Plugin
Contributing
Blog
Project Page on GitHubmouse with fork
Follow Us on Twittermouse riding bird
RSS feed icon

EditorConfig
What is EditorConfig?
EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

What's an EditorConfig file look like?
(A formal specification of EditorConfig is also available.)

Example file
Below is an example .editorconfig file setting end-of-line and indentation styles for Python and JavaScript files.

# EditorConfig is awesome: https://editorconfig.org

# top-most EditorConfig file

root = true

# Unix-style newlines with a newline ending every file

[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation

# Set default charset

[*.{js,py}]
charset = utf-8

# 4 space indentation

[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)

[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory

[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml

[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
Check the Wiki for some real-world examples of projects using EditorConfig files.

Where are these files stored?
When opening a file, EditorConfig plugins look for a file named .editorconfig (all lowercase) in the directory of the opened file and in every parent directory. A search for .editorconfig files will stop if the root filepath is reached or an EditorConfig file with root=true is found.

EditorConfig files are read top to bottom and the most recent rules found take precedence. Properties from matching EditorConfig sections are applied in the order they were read, so properties in closer files take precedence.

For Windows Users: To create an .editorconfig file within Windows Explorer, you need to create a file named .editorconfig. (note the trailing dot), which Windows Explorer will automatically rename to .editorconfig for you.

File Format Details
EditorConfig files use an INI format that is compatible with the format used by Python configparser Library, but [ and ] are allowed in the section names. The section names are filepath globs (case sensitive), similar to the format accepted by gitignore. Only forward slashes (/, not backslashes) are used as path separators and octothorpes (#) or semicolons (;) are used for comments. Comments should go on their own lines. EditorConfig files should be UTF-8 encoded, with either CRLF or LF line separators. EditorConfig files are read top to bottom and the most recent rules found take precedence.

Filepath glob patterns and currently-supported EditorConfig properties are explained below.

Wildcard Patterns
Special characters recognized in section names for wildcard matching:

- Matches any string of characters, except path separators (/)
  \*\* Matches any string of characters
  ? Matches any single character
  [name] Matches any single character in name
  [!name] Matches any single character not in name
  {s1,s2,s3} Matches any of the strings given (separated by commas) (Available since EditorConfig Core 0.11.0)
  {num1..num2} Matches any integer numbers between num1 and num2, where num1 and num2 can be either positive or negative
  Special characters can be escaped with a backslash so they won't be interpreted as wildcard patterns.

Supported Properties
Note that not all properties are supported by every plugin. The wiki has a complete list of properties.

indent_style: set to tab or space to use hard tabs or soft tabs respectively.
indent_size: a whole number defining the number of columns used for each indentation level and the width of soft tabs (when supported). When set to tab, the value of tab_width (if specified) will be used.
tab_width: a whole number defining the number of columns used to represent a tab character. This defaults to the value of indent_size and doesn't usually need to be specified.
end_of_line: set to lf, cr, or crlf to control how line breaks are represented.
charset: set to latin1, utf-8, utf-8-bom, utf-16be or utf-16le to control the character set.
trim_trailing_whitespace: set to true to remove any whitespace characters preceding newline characters and false to ensure it doesn't.
insert_final_newline: set to true to ensure file ends with a newline when saving and false to ensure it doesn't.
root: special property that should be specified at the top of the file outside of any sections. Set to true to stop .editorconfig files search on current file.
Currently all properties and values are case-insensitive. They are lowercased when parsed. Generally, if a property is not specified, the editor settings will be used, i.e. EditorConfig takes no effect on that part. For any property, a value of unset is to remove the effect of that property, even if it has been set before. For example, add indent_size = unset to undefine indent_size property (and use editor default).

It is acceptable and often preferred to leave certain EditorConfig properties unspecified. For example, tab_width need not be specified unless it differs from the value of indent_size. Also, when indent_style is set to tab, it may be desirable to leave indent_size unspecified so readers may view the file using their preferred indentation width. Additionally, if a property is not standardized in your project (end_of_line for example), it may be best to leave it blank.

No Plugin Necessary
These editors come bundled with native support for EditorConfig. Everything should just work.

BBEditBBEditCode CrusaderCode CrusaderCodeLiteCodeLiteelementary Codeelementary CodeEmEditorEmEditorKangarooKangarooGNOME BuilderGNOME BuilderGiteaGiteaGitHubGitHubGitLabGitLabGitBucketGitBucketGogsGogsHelixHelixintelliJ logointelliJjdTextEdit logojdTextEditKTextEditorKTextEditorKomodoKomodoKakouneKakouneMonoDevelopMonoDevelopNeovimNovaNovaPHPStormPHPStormPyCharmPyCharmReSharperReSharperRiderRiderRubyMineRubyMinesourcehutsourcehutSourcLairSourcLairTortoiseGitTortoiseGitVimVimVisual Studio ProVisual Studio ProfessionalWebStormWebStormWorking CopyWorking CopyXcodeXcodeEmacsEmacs
Download a Plugin
Editor
To use EditorConfig with one of these editors, you will need to install a plugin.

AppCodeAppCodeAtomAtomBracketsBracketsCLionCLionCodaCodaCode::BlockCode::BlockEclipseEclipseFar ManagerFar ManagerGeanyGeanyGeditGeditjEditjEditLazarusLazarusMicroMicroNetBeansNetBeansNotepad++Notepad++PlumaPlumaSublime TextSublime TextTextadeptTextadeptTextMateTextMateVSCodiumVSCodiumVisual Studio CodeVisual Studio Code
Headless Tool
To use EditorConfig with one of these headless tools, you will need to install a plugin.

Apache AntApache AntGradleGradleMavenMaven
Contributing to EditorConfig
Give us your feedback
This project is greatly in need of feedback from other developers. We want to hear ideas about how to make this project better. Please use the mailing list to send an email to the EditorConfig team (subscribe by shooting an email to editorconfig+subscribe@googlegroups.com) and use the issue tracker to submit bugs (but please take a look at the FAQ first). Also feel free to tweet at us.

Create an editor plugin
EditorConfig editor plugins must follow the specifications. They can be developed with the help from one of the EditorConfig core libraries. The EditorConfig core libraries accept as input the file being edited, find and parse relevant .editorconfig files, and pass back the properties that should be used. Please ignore any unrecognized properties and property values in your editor plugin for future compatibility, since new properties and permitted values will be added in the future.

EditorConfig core libraries exist for many programming languages:

C library
Python library
JavaScript library
Java libraries: EditorConfig Core Java and ec4j
Lua library
.NET library
Ruby library
Go library
Rust library
If you are planning on creating a new plugin, use the mailing list to let us know so we can help out and link to your plugin once it's created. If you plan on using one of the EditorConfig cores as a library or command line interface, the C library documentation, Python library documentation or Java library documentation may be helpful.

More details can be found on the Plugin-How-To wiki page.

Main Contributors
We have many awesome contributors contributing to the specification, core library, and plugins. For an up-to-date list, please see the Board Members page and the contributor pages of the specification, core libraries, and plugins.

Most of of EditorConfig logos were drawn by Kat On and Amon Keishima. Website were mainly by Trey Hunner and Hong Xu.

The EditorConfig website is licensed under a Creative Commons Attribution 3.0 Unported License.
