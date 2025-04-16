# Minimalist 11ty Website

A minimalist static website built with 11ty. Features a home page, blog with markdown support, and about page.

## Features

- Dark theme with minimal styling
- Markdown blog posts
- Fast, static site generation
- GitHub Pages compatible (builds to `/docs` folder)

## Development

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run serve
```

### Build for Production

```bash
npm run build
```

## Deployment

The site is configured to build to the `/docs` folder for GitHub Pages deployment. After building, commit and push changes to deploy.

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to Pages
3. Set the source to "Deploy from a branch"
4. Select your main branch and `/docs` folder
5. Save changes

## Adding Content

### Blog Posts

Add new blog posts as markdown files in the `src/posts/` directory with filenames following this pattern:

```
YYYY-MM-DD-post-title.md
```

For example: `2023-08-15-my-new-post.md`

Include the following frontmatter:

```md
---
title: Post Title
date: YYYY-MM-DD
---

Post content here...
```

This naming convention ensures posts are sorted chronologically in the file system, while the URLs will still be clean without the date prefix.

A template is available at `src/posts/post-template.md` that you can copy as a starting point.

### Projects

Add project pages as markdown files in the `src/projects/` directory. Include the following frontmatter:

```md
---
title: Project Title
description: Short description of the project
repo: https://github.com/username/repo-name  # optional
demo: https://example.com/demo  # optional
status: Completed | In Progress | On Hold  # optional
---

Project content here...
```

A template is available at `src/projects/project-template.md` that you can copy as a starting point.

### Changelog

The site includes a changelog page at `/changelog/` to track notable changes and updates. When making significant changes to the site, add an entry to the changelog in the following format:

```md
## <span class="changelog-date">YYYY-MM-DD</span>

### <span class="changelog-category added">Added</span>
- **Feature Name**: Description of what was added

### <span class="changelog-category changed">Changed</span>
- **Component Name**: Description of what was changed

### <span class="changelog-category fixed">Fixed</span>
- **Issue Name**: Description of what was fixed
```

The categories use CSS classes for color-coding and can include:
- `added`, `new`, `feature` (green)
- `changed`, `updated`, `improved` (orange)
- `fixed`, `bugfix`, `removed` (red)
- `security`, `performance`, `optimization` (purple)

### Draft Posts

You can mark a post as a draft by adding `draft: true` to the frontmatter:

```md
---
title: Work in Progress Post
date: 2023-08-20
draft: true
---
```

Draft posts will be included in development but excluded from production builds.

To build the site without draft posts, use:

```bash
npm run build:prod
```
