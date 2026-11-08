import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'gha-commit',
  description: 'Reusable workflows for Conventional Commit validation and semantic version tags.',
  lang: 'en-US',
  base: process.env.DOCS_BASE || '/',
  themeConfig: {
    siteTitle: 'gha-commit',
    nav: [
      {
        text: 'Actions',
        items: [
          { text: 'Extract last commit message', link: '/extract-last-commit-message' },
          { text: 'Validate commit message', link: '/validation' },
          { text: 'Bump version tag', link: '/tagging' },
          { text: 'Combine actions', link: '/combined-usage' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Allowed prefixes', link: '/prefixes' },
          { text: 'Useful links', link: '/useful-links' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Actions',
        items: [
          { text: 'Extract last commit message', link: '/extract-last-commit-message' },
          { text: 'Validate commit message', link: '/validation' },
          { text: 'Bump version tag', link: '/tagging' },
          { text: 'Combine actions', link: '/combined-usage' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Allowed prefixes', link: '/prefixes' },
          { text: 'Useful links', link: '/useful-links' }
        ]
      }
    ]
  }
})
