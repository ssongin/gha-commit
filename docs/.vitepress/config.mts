import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'gha-commit',
  description: 'Reusable workflows for Conventional Commit validation and semantic version tags.',
  lang: 'en-US',
  base: process.env.DOCS_BASE || '/',
  themeConfig: {
    siteTitle: 'gha-commit',
    nav: [{ text: 'Guides', link: '/validation' }],
    sidebar: [
      {
        text: 'gha-commit',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Commit validation', link: '/validation' },
          { text: 'Version tagging', link: '/tagging' },
          { text: 'Allowed prefixes', link: '/prefixes' }
        ]
      }
    ]
  }
})
