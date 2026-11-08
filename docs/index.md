---
layout: home

hero:
  name: gha-commit
  text: Reusable commit workflows
  tagline: Validate Conventional Commit messages and create semantic-version Git tags.
  actions:
    - theme: brand
      text: Get started
      link: /validation
    - theme: alt
      text: Conventional Commits
      link: https://www.conventionalcommits.org/en/v1.0.0/

features:
  - title: Validate commit messages
    details: Check a message header against the Conventional Commits format.
  - title: Create semantic version tags
    details: Increment major, minor, or patch versions based on the commit type and breaking-change marker.
  - title: Reuse independently
    details: Call either workflow from a separate repository.
---

`gha-commit` provides reusable GitHub Actions workflows for projects that want
to validate commit messages and create Git version tags.

Explore the guides for [commit validation](validation.md),
[version tagging](tagging.md), and the [allowed prefix reference](prefixes.md).
