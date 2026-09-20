const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove width: 50% from .lesson-panel-left and .lesson-panel-right
css = css.replace(/\.lesson-panel-left\s*\{[\s\S]*?width:\s*50%;/g, match => match.replace('width: 50%;', ''));
css = css.replace(/\.lesson-panel-right\s*\{[\s\S]*?width:\s*50%;/g, match => match.replace('width: 50%;', ''));

// 2. Remove the trailing .lesson-layout override I added earlier
css = css.replace(/\/\* Adjust lesson layout for react-split \*\/[\s\S]*?\.lesson-layout\s*\{[\s\S]*?\}/g, '');

// 3. Update the .gutter styles to be thicker and clear
css = css.replace(/\/\* ─── Split Gutters ───────────────────────────────────────────── \*\/[\s\S]*?(?=\.lesson-layout|\z|$)/g, ''); // Remove old if exists

const thickGutters = `
/* ─── Split Gutters ───────────────────────────────────────────── */
.gutter {
  background-color: var(--border);
  background-repeat: no-repeat;
  background-position: 50%;
  transition: background-color 0.2s ease;
  z-index: 10;
  position: relative;
}
.gutter:hover {
  background-color: var(--cyan);
}
.gutter.gutter-horizontal {
  cursor: col-resize;
  width: 12px !important;
}
.gutter.gutter-horizontal::after {
  content: "⋮";
  color: var(--text-dim);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  line-height: 1;
}
.gutter.gutter-vertical {
  cursor: row-resize;
  height: 12px !important;
}
.gutter.gutter-vertical::after {
  content: "⋯";
  color: var(--text-dim);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  line-height: 1;
}
`;

css += thickGutters;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('index.css updated');

// Update gutterSize to 12 in the JSX files
const exPath = path.join(__dirname, 'src', 'pages', 'ExercisePage.jsx');
let exContent = fs.readFileSync(exPath, 'utf8');
exContent = exContent.replace(/gutterSize=\{8\}/g, 'gutterSize={12}');
fs.writeFileSync(exPath, exContent, 'utf8');

const lessPath = path.join(__dirname, 'src', 'pages', 'LessonPage.jsx');
let lessContent = fs.readFileSync(lessPath, 'utf8');
lessContent = lessContent.replace(/gutterSize=\{8\}/g, 'gutterSize={12}');
fs.writeFileSync(lessPath, lessContent, 'utf8');

console.log('JSX gutterSizes updated');
