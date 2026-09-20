const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove font stretching
css = css.replace(/transform:\s*scaleY\(1\.3\)\s*scaleX\(0\.85\);\s*\n\s*display:\s*inline-block;\s*\n\s*transform-origin:\s*left\s*center;/g, '');

// 2. Remove color gradients for text
css = css.replace(/\/\* 2\. Text Gradients for themes[\s\S]*?(?=\/\* 3\. Borders - increase rounding)/, '');

// 3. Borders: radius 0
css = css.replace(/--radius:\s*14px;/, "--radius: 0px;");
css = css.replace(/--radius-lg:\s*20px;/, "--radius-lg: 0px;");

// Update buttons to be 'pixelated' boxed
// We will give them a 2px solid border or a box-shadow to look pixelated, but 0px radius.
// We'll set border-radius 0px globally in root for --radius and --radius-lg, which covers buttons if they use var(--radius).

// 4. Headings: import VT323 and set h2
if (!css.includes('VT323')) {
  css = css.replace(/family=Press\+Start\+2P/, "family=Press+Start+2P&family=VT323");
}
// Add styling for h1 and h2 in lesson-content
css = css.replace(/\.lesson-content h1 \{([^}]+)\}/, ".lesson-content h1 { font-family: var(--font-pixel); font-size: 16px; margin-bottom: 24px; color: var(--cyan); }");
css = css.replace(/\.lesson-content h2 \{([^}]+)\}/, ".lesson-content h2 { font-family: 'VT323', monospace; font-size: 28px; margin-top: 32px; margin-bottom: 16px; color: var(--yellow); }");

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS fixes applied.');
