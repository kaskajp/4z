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

// Map content type to directory pattern
const typePatterns = {
  'posts': './src/posts/**/*.md',
  'projects': './src/projects/**/*.md',
  'pages': './src/*.md',
  'all': './src/**/*.{md,njk}'
};

async function generateOGImagesByType(type) {
  const pattern = typePatterns[type.toLowerCase()];
  
  if (!pattern) {
    console.error(`Invalid type: ${type}`);
    console.error('Available types: posts, projects, pages, all');
    process.exit(1);
  }
  
  // Create output directory if it doesn't exist
  const outputDir = './src/assets/images/og';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Find all relevant files
  const files = glob.sync(pattern, {
    ignore: ['./src/_includes/**', './src/_layouts/**', './src/assets/**']
  });
  
  if (files.length === 0) {
    console.warn(`No files found for type: ${type}`);
    process.exit(0);
  }
  
  console.log(`Generating OG images for ${files.length} ${type} files...`);
  
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
    const contentType = getContentType(file);
    
    console.log(`Generating OG image for "${title}" (${contentType})`);
    
    await nodeHtmlToImage({
      output: outputPath,
      html: template,
      content: {
        title,
        siteTitle: siteData.title,
        type: contentType
      },
      puppeteerArgs: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });
  }
  
  console.log(`OG image generation complete for ${type}!`);
}

// Get the content type from command line arguments
const contentType = process.argv[2];

if (!contentType) {
  console.error('Please provide a content type');
  console.error('Usage: node generate-og-by-type.js <content-type>');
  console.error('Available types: posts, projects, pages, all');
  process.exit(1);
}

generateOGImagesByType(contentType).catch(err => {
  console.error('Error generating OG images:', err);
  process.exit(1);
}); 