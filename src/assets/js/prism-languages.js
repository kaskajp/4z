// This file loads additional Prism language definitions

// Load common languages
if (typeof window !== 'undefined' && window.Prism) {
  // Check for languages needed for our syntax highlighting
  if (!window.Prism.languages.javascript) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js');
  }
  if (!window.Prism.languages.css) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-css.min.js');
  }
  if (!window.Prism.languages.html) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markup.min.js');
  }
  if (!window.Prism.languages.python) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js');
  }
  if (!window.Prism.languages.json) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-json.min.js');
  }
  if (!window.Prism.languages.bash) {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js');
  }
}

// Helper function to load scripts dynamically
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
} 