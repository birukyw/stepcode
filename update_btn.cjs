const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Update .btn for pixelated look
css = css.replace(/\.btn \{[\s\S]*?transition: all var\(--transition\);\s*\n\}/, 
`.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-pixel);
  font-size: 11px;
  padding: 8px 18px;
  border-radius: 0;
  border: 2px solid var(--border);
  box-shadow: 2px 2px 0px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: all 0.1s ease;
}
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px rgba(0,0,0,0.5);
}`);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Button styling updated.');
