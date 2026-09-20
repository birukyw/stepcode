const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const gutterStyles = `
/* ─── Split Gutters ───────────────────────────────────────────── */
.gutter {
  background-color: var(--border);
  background-repeat: no-repeat;
  background-position: 50%;
  transition: background-color 0.2s ease;
  z-index: 10;
}
.gutter:hover {
  background-color: var(--cyan);
}
.gutter.gutter-horizontal {
  cursor: col-resize;
}
.gutter.gutter-vertical {
  cursor: row-resize;
}

/* Adjust lesson layout for react-split */
.lesson-layout {
  display: flex;
  height: 100%;
  gap: 0 !important;
}
`;

css += gutterStyles;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Gutter styles added.');
