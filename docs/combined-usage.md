# Combine the actions

## Purpose

This example extracts the commit message once in the caller workflow and
passes it to the reusable validator or tagger. GitHub reusable workflows are
called as jobs, so the extracted message is exposed as a job output and passed
through each job's `needs` context.

Validation usually runs for pull requests; tagging usually runs when changes
are pushed to the release branch. The example uses the same extraction job
for either event, but calls the relevant reusable workflow conditionally.

## Permissions

The caller grants read access by default and gives only the tagging job write
access:

| Job | Permission | Why |
| --- | --- | --- |
| `extract` | `contents: read` | Checks out the event's commit and reads its message. |
| `validate` | `contents: read` | Allows the reusable workflow to check out a commit if needed. |
| `bump-version` | `contents: write` | Allows the reusable workflow to push a version tag. |

Repository Actions settings must also allow the `GITHUB_TOKEN` to write
repository contents for tagging.

## Example

```yaml
name: Validate and tag commits

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read

jobs:
  extract:
    if: github.event_name == 'pull_request' || (github.event_name == 'push' && github.ref == 'refs/heads/main')
    runs-on: ubuntu-latest
    outputs:
      commit_message: ${{ steps.commit.outputs.message }}
    steps:
      - id: commit
        uses: ssongin/gha-commit/.github/actions/extract-last-commit-message@master

  validate:
    if: github.event_name == 'pull_request'
    needs: extract
    permissions:
      contents: read
    uses: ssongin/gha-commit/.github/workflows/validate-commit-message.yml@master
    with:
      commit_message: ${{ needs.extract.outputs.commit_message }}

  bump-version:
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    needs: extract
    permissions:
      contents: write
    uses: ssongin/gha-commit/.github/workflows/bump-version-tag.yml@master
    with:
      commit_message: ${{ needs.extract.outputs.commit_message }}
```

When the message is passed explicitly, the reusable workflows skip their own
extraction. If a repository uses only validation or only tagging, it can call
that reusable workflow without `commit_message` and let it extract the
message automatically. Pin the action and workflows to a reviewed release
tag or full commit SHA instead of `@master` for production use.
