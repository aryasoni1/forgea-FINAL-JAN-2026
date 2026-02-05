---
doc_id: editorconfig-policy
tool: EditorConfig
version_pinned: false
change_sensitivity: LOW
lifecycle: ACTIVE
---

# EditorConfig — Style Standardization Policy

## Purpose

Helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs by defining styles in a readable file format.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: `.editorconfig` file format, file location logic, property definitions, and editor plugin behavior.
- Does NOT apply to: Editor-specific settings when EditorConfig properties are unspecified or set to `unset`.

## Official Sources (Binding)

- editorconfig.md

## Evidence Coverage Matrix

| Policy Area          | Source URL      | Version Covered        | Status  |
| -------------------- | --------------- | ---------------------- | ------- |
| File Format & Syntax | editorconfig.md | Undefined              | COVERED |
| Property Definitions | editorconfig.md | Undefined              | COVERED |
| Glob Patterns        | editorconfig.md | Core 0.11.0+ (partial) | COVERED |
| Tooling Support      | editorconfig.md | Undefined              | COVERED |

## Version & Compatibility

- Tool version: BLOCKED – VERSION NOT SPECIFIED (Source mentions "EditorConfig Core 0.11.0" for specific glob features, but no global version pin).
- Related tooling compatibility:
  - **Native Support:** BBEdit, IntelliJ family (IDEA, PyCharm, WebStorm, etc.), Visual Studio (Pro), GitHub, GitLab, etc..
  - **Plugin Required:** VS Code, Sublime Text, Atom, Notepad++, Eclipse, etc..
  - **Headless Tools:** Apache Ant, Gradle, Maven.

## Canonical Rules (Non-Negotiable)

- **Root Declaration:** A search for `.editorconfig` files MUST stop if a file with `root = true` is found.
- **File Encoding:** Files MUST be UTF-8 encoded, with either CRLF or LF line separators.
- **Path Separators:** Only forward slashes (`/`) are permitted as path separators in section names.
- **Precedence Logic:**
  - Rules are read top to bottom; the most recent rule found takes precedence.
  - Properties in files closer to the open file take precedence over those in parent directories.
- **Case Sensitivity:**
  - Section names (filepath globs) are case-sensitive.
  - Properties and values are case-insensitive (lowercased when parsed).
- **Glob Syntax:**
  - `*` matches any string except path separators.
  - `**` matches any string including path separators.
  - Braces `{}` allow string lists or number ranges.

## Prohibited Configurations

- ❌ **Backslashes in Section Names:** Backslashes MUST NOT be used as path separators.
- ❌ **Comments on Property Lines:** Comments (`#` or `;`) MUST go on their own lines.

## Enforcement

- **Editor/IDE Behavior:**
  - **Native:** Editors with bundled support automatically apply settings.
  - **Plugin:** Editors without native support require an installed plugin to read the format.
- **Parsing Logic:**
  - Plugins look for `.editorconfig` in the directory of the opened file and every parent directory until root is reached or `root = true` is found.
  - Unrecognized properties and values MUST be ignored by plugins.
- **Property Reset:**
  - Setting a property value to `unset` removes the effect of that property (reverting to editor default).

## Failure Modes

- **Unspecified Properties:** If a property is not specified (or is `unset`), the editor uses its own default settings; EditorConfig takes no effect.
- **Missing Root Declaration:** Without `root = true`, the search continues up the directory tree to the filesystem root.

## Cross-Doc Dependencies

- Depends on: NONE
- Conflicts with: NONE

## Planner Extraction Hints (Non-Human)

- If `root = true` is NOT present in the top-level config, verify strict isolation of the repo is not required.
- Treat `indent_size = unset` as a valid configuration state (fallback to editor default).
- If Target Tool is "Visual Studio Code" or "Sublime Text", a plugin is MANDATORY.
- If Target Tool is "IntelliJ" or "Visual Studio", support is NATIVE.

## Verification Checklist

- [ ] `.editorconfig` file exists in the project root.
- [ ] `root = true` is defined in the top-most file.
- [ ] File matches UTF-8 encoding.
- [ ] Section headers use forward slashes only.

## Non-Decisions

- This document does not mandate specific indentation styles (tabs vs. spaces) or sizes.
- This document does not select a specific IDE or editor.

## Notes

- To create `.editorconfig` in Windows Explorer, name the file `.editorconfig.` (with trailing dot) to bypass validation.
- `tab_width` defaults to the value of `indent_size` if not explicitly specified.
- `{s1,s2,s3}` brace expansion is available since EditorConfig Core 0.11.0.
