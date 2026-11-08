# Commit message validation

The reusable
[`validate-commit-message.yml`](https://github.com/ssongin/gha-commit/blob/master/.github/workflows/validate-commit-message.yml)
workflow checks the first line of the supplied message. It requires one of the
[allowed prefixes](prefixes.md), followed by an optional scope, optional
breaking-change marker, a colon, and a non-empty description:

```text
<prefix>(<optional-scope>)<!>: <description>
```

The scope and `!` marker are optional. Examples:

```text
feat: add pagination
fix(api): handle an empty response
epic(auth)!: replace the token format
```

This workflow validates the header format and allowed prefix; it does not
validate every body or footer rule in the Conventional Commits specification.

## Call the validator

Call the reusable workflow from a job in your repository. For a `push` event,
the head commit message is commonly available as
`github.event.head_commit.message`:

```yaml
name: Validate commit

on:
  push:

jobs:
  validate:
    uses: ssongin/gha-commit/.github/workflows/validate-commit-message.yml@master
    with:
      commit_message: ${{ github.event.head_commit.message }}
```

Use a release tag or full commit SHA instead of `@master` to pin the workflow
to a reviewed version.

Examples rejected by the workflow:

```text
feature: add pagination  # "feature" is not in the allowed prefix list
feat(): add pagination   # scope cannot be empty
feat add pagination      # missing colon
feat:                    # missing description
```

For pull requests, this checks only the message you pass. Pass the PR title to
check the title, or have the caller enumerate commits if each commit needs
validation.
