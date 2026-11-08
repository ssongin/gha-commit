# Extract last commit message

## Purpose

The
[`extract-last-commit-message`](https://github.com/ssongin/gha-commit/tree/master/.github/actions/extract-last-commit-message)
composite action checks out a commit and exposes its full message as the
`message` step output. By default, it selects the head commit for a `push`
event or the latest commit on the pull request head for a `pull_request`
event. Use it in custom workflows that need to read a commit message
themselves; the validation and tagging reusable workflows already extract
messages automatically when their `commit_message` input is omitted.

The action checks out the selected commit into the runner workspace, so use
it before steps that need the repository files in that workspace.

## Permissions

The calling job needs permission to read repository contents:

| Permission | Required access | Why |
| --- | --- | --- |
| `contents` | `read` | `actions/checkout` checks out the selected commit. |

## Inputs and outputs

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `ref` | `string` | No | Event's push commit or pull request head | Commit, branch, or tag to check out and read instead of the event-selected commit. |
| `message` | `string` output | — | — | Full commit message, including the subject and body. |

## Examples

Extract the latest pull request commit message and use it in a later step:

```yaml
permissions:
  contents: read

jobs:
  inspect:
    runs-on: ubuntu-latest
    steps:
      - id: commit
        uses: ssongin/gha-commit/.github/actions/extract-last-commit-message@master
      - name: Print commit message
        env:
          COMMIT_MESSAGE: ${{ steps.commit.outputs.message }}
        run: printf '%s\n' "$COMMIT_MESSAGE"
```

To select a particular ref, provide `ref`:

```yaml
- id: commit
  uses: ssongin/gha-commit/.github/actions/extract-last-commit-message@master
  with:
    ref: ${{ github.sha }}
```

Pin the action to a reviewed release tag or full commit SHA instead of
`@master` for production use.
