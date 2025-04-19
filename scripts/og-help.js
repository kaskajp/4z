console.log(`
Open Graph (OG) Image Generation Tools
=====================================

This site uses dynamically generated Open Graph images for social media sharing.

Available commands:

1. Generate OG images for ALL pages:
   npm run generate-og

2. Generate OG image for a SINGLE page:
   npm run generate-og:single -- path/to/file.md

3. Generate OG images for a specific CONTENT TYPE:
   npm run generate-og:type -- [posts|projects|pages|all]

4. Generate OG images and build the production site:
   npm run build:with-og

Examples:
---------
  npm run generate-og:single -- src/posts/my-new-post.md
  npm run generate-og:type -- projects

The generated images are stored in: src/assets/images/og/
`); 