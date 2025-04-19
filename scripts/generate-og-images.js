const fs = require('fs');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image');
const slugify = require('slugify');
const glob = require('glob');

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

// Create output directory if it doesn't exist
const outputDir = './src/assets/images/og';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Find all markdown files in the src directory
const files = glob.sync('./src/**/*.{md,njk}', {
  ignore: ['./src/_includes/**', './src/_layouts/**', './src/assets/**']
});

// Process each file and generate an OG image
async function generateOGImages() {
  console.log(`Generating OG images for ${files.length} files...`);
  
  for (const file of files) {
    // Extract frontmatter/title from the file
    const content = fs.readFileSync(file, 'utf8');
    const titleMatch = content.match(/title: ["']?(.*?)["']?[\r\n]/);
    
    if (!titleMatch && !file.endsWith('.njk')) {
      console.warn(`No title found in ${file}, skipping`);
      continue;
    }
    
    // For .njk files without a title, use the filename
    let title;
    if (!titleMatch && file.endsWith('.njk')) {
      title = path.basename(file, '.njk').charAt(0).toUpperCase() + path.basename(file, '.njk').slice(1);
    } else {
      title = titleMatch[1];
    }
    
    const slug = slugify(title, { lower: true, strict: true });
    const outputPath = path.join(outputDir, `${slug}.png`);
    const type = getContentType(file);
    
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
  }
  
  console.log('OG image generation complete!');
}

generateOGImages().catch(console.error); 