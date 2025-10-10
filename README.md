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

```bash
npm run build:prod
```
