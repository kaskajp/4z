const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Copy static assets directly to output folder
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Copy CNAME file for GitHub Pages
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // Configure Markdown options with syntax highlighting
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  
  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "docs",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 