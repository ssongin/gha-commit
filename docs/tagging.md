# Bump version tag

## Purpose

The reusable
[`bump-version-tag.yml`](https://github.com/ssongin/gha-commit/blob/master/.github/workflows/bump-version-tag.yml)
workflow validates a commit header, determines a semantic-version increment
from its prefix, then creates and pushes an annotated tag pointing at the
caller's `github.sha`. If `commit_message` is omitted, it automatically reads
the pushed commit message.

| Prefix or marker | Result |
| --- | --- |
| `epic`, `major` | Major |
| `feat` | Minor |
| `fix`, `build`, `chore`, `perf`, `refactor`, `revert`, `style`, `cicd` | Patch |
| `docs`, `test` | No tag |
| `chore(release)` | No tag |
| `!` after the type/scope, or a `BREAKING CHANGE:` / `BREAKING-CHANGE:` line | Major |

A breaking change takes precedence over the prefix's normal bump.
`docs!:` and `test!:` create major tags; without a breaking marker, `docs` and
`test` do not create tags. `chore(release)` is skipped to avoid tagging
release-automation commits.

The workflow uses the highest existing tag matching the prefix and
`MAJOR.MINOR.PATCH` format. Tags use `v` by default. If no matching tag
exists, the default baseline is `0.0.0`; therefore the first `feat` produces
`v0.1.0`, and the first `fix` produces `v0.0.1`.

## Permissions

The calling workflow and repository settings must allow the tagger to push
the new tag:

| Permission or setting | Required access | Why |
| --- | --- | --- |
| `contents` | `write` | Pushes the annotated version tag to the repository. |
| Actions settings: `GITHUB_TOKEN` repository permissions | Allow contents write | Allows the workflow token to create the tag. |

## Inputs and outputs

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `commit_message` | `string` | No | Automatically extracted | Message used to validate the header and choose the version increment. |
| `tag_prefix` | `string` | No | `v` | Prefix used to find and create version tags. |
| `initial_version` | `string` | No | `0.0.0` | Baseline semantic version if no matching tag exists; do not include the prefix. |
| `tag` output | `string` | — | Empty if no tag was created | Version tag created by this workflow. |

## Examples

Call the tagger on pushes to your release branch. The caller must grant
`contents: write`:

```yaml
name: Tag release

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  tag:
    uses: ssongin/gha-commit/.github/workflows/bump-version-tag.yml@master
```

Override the tag prefix and starting version when needed:

```yaml
jobs:
  tag:
    permissions:
      contents: write
    uses: ssongin/gha-commit/.github/workflows/bump-version-tag.yml@master
    with:
      tag_prefix: release-
      initial_version: 1.0.0
```

For a major bump, append `!` immediately before the colon:

```text
feat(api)!: remove the legacy endpoint
```

Or add a breaking-change footer after the header and body:

```text
feat(api): revise the response format

BREAKING CHANGE: clients must now read the result field
```

The workflows can be called independently. When using validation and tagging
together, call them in separate jobs with event-appropriate conditions.
Pin reusable workflows to a reviewed release tag or full commit SHA instead
of `@master` for production use.

Use the `tag` output in downstream jobs when they need the newly created tag:

```yaml
  publish-tagged-docs:
    needs: bump-version-tag
    if: needs.bump-version-tag.outputs.tag != ''
    uses: ./.github/workflows/publish-docs.yml
    with:
      deployment_path: versions/${{ needs.bump-version-tag.outputs.tag }}
```