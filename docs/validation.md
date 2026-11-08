# Validate commit message

## Purpose

The reusable
[`validate-commit-message.yml`](https://github.com/ssongin/gha-commit/blob/master/.github/workflows/validate-commit-message.yml)
workflow checks the first line of a commit message. It requires one of the
[allowed prefixes](prefixes.md), followed by an optional scope, optional
breaking-change marker, a colon, and a non-empty description:

```text
<prefix>(<optional-scope>)<!>: <description>
```

For example, `feat: add pagination`, `fix(api): handle an empty response`,
and `epic(auth)!: replace the token format` are valid headers. The validator
does not check every body or footer rule in the Conventional Commits
specification.

If `commit_message` is omitted, the workflow extracts the pushed commit for a
`push` event or the latest commit on the pull request head for a
`pull_request` event. On a pull request, it checks only that latest commit.

## Permissions

The calling workflow must allow read access to repository contents:

| Permission | Required access | Why |
| --- | --- | --- |
| `contents` | `read` | The workflow checks out the commit when `commit_message` is omitted. |

## Inputs and outputs

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `commit_message` | `string` | No | Automatically extracted | Message to validate. Pass a value to validate a specific message, such as a PR title. |

This reusable workflow has no outputs.

## Examples

Call the validator without inputs to validate the latest commit in a pull
request:

```yaml
name: Validate commit

on:
  pull_request:

jobs:
  validate:
    uses: ssongin/gha-commit/.github/workflows/validate-commit-message.yml@master
```

The same workflow can run on pushes and extracts the pushed commit message.
To validate a custom message instead, pass it explicitly:

```yaml
jobs:
  validate-title:
    uses: ssongin/gha-commit/.github/workflows/validate-commit-message.yml@master
    with:
      commit_message: ${{ github.event.pull_request.title }}
```

Use a release tag or full commit SHA instead of `@master` to pin the workflow
to a reviewed version. To validate every commit in a pull request, the caller
must enumerate those commits and invoke validation for each one.
