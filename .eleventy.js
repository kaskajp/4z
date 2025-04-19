const markdownIt = require("markdown-it");
const prism = require("prismjs");
const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Copy static assets directly to output folder
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Copy CNAME file for GitHub Pages
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  
  // Add a custom ISO date filter
  eleventyConfig.addFilter("isodate", function(date) {
    return new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD
  });
  
  // Add a filter to strip date prefix from slugs
  eleventyConfig.addFilter("stripDatePrefix", function(slug) {
    return slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  });
  
  // Add a filter to generate OG image filename
  eleventyConfig.addFilter("ogImagePath", function(title) {
    const slug = slugify(title, { lower: true, strict: true });
    return `/assets/images/og/${slug}.png`;
  });
  
  // Filter out draft posts in production
  eleventyConfig.addCollection("posts", function(collectionApi) {
    if (process.env.ELEVENTY_ENV === 'production') {
      return collectionApi.getFilteredByTag("posts").filter(post => !post.data.draft);
    }
    return collectionApi.getFilteredByTag("posts");
  });
  
  // Configure Markdown options with syntax highlighting
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    highlight: function(str, lang) {
      if (lang && prism.languages[lang]) {
        try {
          return `<pre class="language-${lang}"><code class="language-${lang}">${prism.highlight(str, prism.languages[lang], lang)}</code></pre>`;
        } catch (e) {
          console.error("Syntax highlighting error:", e);
        }
      }
      return `<pre class="language-text"><code class="language-text">${md.utils.escapeHtml(str)}</code></pre>`;
    }
  });
  
  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 