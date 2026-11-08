# Allowed commit prefixes

Use one of these lowercase prefixes at the start of each commit message.
These are the prefixes accepted by gha-commit's validator and supported by its
tagging workflow.

| Prefix | Purpose | Version bump |
| --- | --- | --- |
| `epic` | Large product milestone or coordinated feature set | Major |
| `major` | Explicitly mark a major release change | Major |
| `feat` | Add or extend user-visible functionality | Minor |
| `fix` | Correct a bug | Patch |
| `build` | Change build system, dependencies, or packaging | Patch |
| `chore` | Routine maintenance that does not change product behavior | Patch |
| `perf` | Improve performance | Patch |
| `refactor` | Restructure code without changing behavior | Patch |
| `revert` | Revert a previous change | Patch |
| `style` | Formatting or style-only change | Patch |
| `cicd` | Change CI/CD workflows or deployment configuration | Patch |
| `docs` | Documentation-only change | No tag |
| `test` | Add or update tests | No tag |

The tagger also skips `chore(release)` commits, which are commonly generated
by release automation. A breaking-change marker overrides the normal bump:
append `!` after the prefix or scope to request a major bump. For example,
`fix(api)!: change the error response` is a major change despite the `fix`
prefix. See [Bump version tag](tagging.md) for footer syntax and details.

## Header examples

The scope is optional, but when present it must not be empty:

```text
feat: add keyboard navigation
fix(router): preserve query parameters
build(deps)!: drop support for the old runtime
```

The third example creates a major bump because it includes `!`. A breaking
change can also be declared with a `BREAKING CHANGE:` or
`BREAKING-CHANGE:` footer; those footer forms are described in the
[version tagging guide](tagging.md).
