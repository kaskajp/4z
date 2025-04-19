const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');
const slugify = require('slugify');

// Load site data
const siteData = require('../src/_data/site.json');

// Read the OG image template
const template = fs.readFileSync('./src/_includes/og-template.html', 'utf8');

// Helper function to determine content type based on file path
function getContentType(filePath) {
  if (filePath.includes('/posts/')) return 'Blog Post';
  if (filePath.includes('/projects/')) return 'Project';
  if (filePath.includes('/about')) return 'About';
  if (filePath.includes('/changelog')) return 'Changelog';
  return 'Page';
}

async function generateSingleOGImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  const outputDir = './src/assets/images/og';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract frontmatter/title from the file
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/title: ["']?(.*?)["']?[\r\n]/);
  
  if (!titleMatch && !filePath.endsWith('.njk')) {
    console.error(`No title found in ${filePath}`);
    process.exit(1);
  }
  
  // For .njk files without a title, use the filename
  let title;
  if (!titleMatch && filePath.endsWith('.njk')) {
    title = path.basename(filePath, '.njk').charAt(0).toUpperCase() + path.basename(filePath, '.njk').slice(1);
  } else {
    title = titleMatch[1];
  }
  
  const slug = slugify(title, { lower: true, strict: true });
  const outputPath = path.join(outputDir, `${slug}.png`);
  const type = getContentType(filePath);
  
  console.log(`Generating OG image for "${title}" (${type})`);
  
  await nodeHtmlToImage({
    output: outputPath,
    html: template,
    content: {
      title,
      siteTitle: siteData.title,
      type
    },
    puppeteerArgs: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });
  
  console.log(`OG image generated: ${outputPath}`);
}

// Get the file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path');
  console.error('Usage: node generate-og-image.js <path-to-file>');
  process.exit(1);
}

generateSingleOGImage(filePath).catch(err => {
  console.error('Error generating OG image:', err);
  process.exit(1);
}); 