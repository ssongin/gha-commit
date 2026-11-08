# gha-commit

`gha-commit` provides reusable GitHub Actions for extracting and validating
commit messages and creating semantic-version tags. See the
[documentation site](https://ssongin.github.io/gha-commit/) for setup,
examples, and detailed behavior.

## Actions

| Action | Purpose |
| --- | --- |
| [Extract last commit message](.github/actions/extract-last-commit-message/action.yml) | Extract the full message from the current push commit or pull request head. |
| [Validate commit message](.github/workflows/validate-commit-message.yml) | Validate a Conventional Commit header. |
| [Bump version tag](.github/workflows/bump-version-tag.yml) | Choose a semantic-version increment and create an annotated Git tag. |

Reusable workflows can extract the commit message automatically when no
message is supplied. The extraction action is available when a custom workflow
needs to pass the same message to multiple jobs.

## Build and run the documentation locally

Requirements: Node.js 22 and npm.

Install the documentation dependencies:

```sh
npm ci --prefix docs
```

Start the local VitePress development server:

```sh
npm run docs:dev --prefix docs
```

Build the static documentation site:

```sh
npm run docs:build --prefix docs
```

The generated site is written to `docs/.vitepress/dist`. To preview that
production build locally, run:

```sh
npm run docs:preview --prefix docs
```

The VS Code launch configurations include documentation build and development
server commands.
